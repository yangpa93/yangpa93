/**
 * 표준국어대사전 오픈 API 에서 용례(예문)를 받아 온다.
 *
 *     STDICT_KEY=... node scripts/korean/stdict-examples.mjs
 *
 * 파워셸이면
 *     $env:STDICT_KEY = "..."
 *     node scripts/korean/stdict-examples.mjs
 *
 * **키를 파일에 적지 않는다.** 인증키는 사용자당 하나만 나오고 하루 5만 건
 * 제한이 걸려 있다. 저장소에 올라가면 누구든 쓸 수 있게 되므로 환경 변수로만
 * 받는다.
 *
 * 두 단계로 부른다.
 *   1) 뜻 목록은 이미 korean/stdict.json 에 받아 뒀다. 거기 있는 target_code 로
 *   2) view.do 를 불러 그 뜻에 달린 용례를 가져온다.
 *
 * view.do 는 req_type=json 을 무시하고 늘 XML 을 돌려준다. 그래서 XML 을 읽는다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Node 의 fetch 는 HTTPS_PROXY 를 스스로 보지 않는다. 자세한 사정은
// stdict-lookup.mjs 위쪽 주석에 적어 뒀다.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const r = spawnSync(process.execPath, [...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const KEY = process.env.STDICT_KEY;
const SENSES = 'korean/stdict.json';
const OUT = 'korean/stdict-examples.json';
const API = 'https://stdict.korean.go.kr/api/view.do';

const DELAY_MS = 180;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** CDATA 로 감싼 것과 아닌 것이 섞여 있다. 둘 다 받는다. */
const EXAMPLE_RE = /<example>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/example>/g;

/**
 * 이 뜻에 달린 용례를 뽑는다.
 *
 * 사전 용례에는 '원인 규명.' 처럼 문장이 아닌 짧은 구도 섞여 있다.
 * 빈칸 문제는 문장이라야 성립하므로 둘을 갈라 담는다.
 */
function parseExamples(xml) {
  const all = [...xml.matchAll(EXAMPLE_RE)].map((m) => m[1].trim()).filter(Boolean);
  const sentences = all.filter((e) => /[.!?…]$/.test(e) && e.split(/\s+/).length >= 3);
  const phrases = all.filter((e) => !sentences.includes(e));
  return { sentences, phrases };
}

async function fetchExamples(targetCode) {
  const url = `${API}?key=${KEY}&method=target_code&q=${targetCode}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseExamples(await res.text());
}

async function main() {
  if (!KEY) {
    console.error('STDICT_KEY 환경 변수가 없습니다.');
    console.error('  리눅스/맥 :  STDICT_KEY=... node scripts/korean/stdict-examples.mjs');
    console.error('  파워셸    :  $env:STDICT_KEY = "..."  후에 실행');
    process.exit(1);
  }

  const senses = JSON.parse(readFileSync(SENSES, 'utf8'));
  const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

  // 뜻마다 target_code 가 따로 있다. 우리가 고른 뜻 하나만 받는다 —
  // 동음이의어의 다른 뜻에 달린 용례를 가져오면 엉뚱한 문장이 된다.
  const jobs = [];
  for (const [word, entry] of Object.entries(senses)) {
    if (!entry || word in out) continue;
    const want = (entry.hanja || '').normalize('NFKC');
    const sense = want
      ? entry.senses.find((s) => (s.hanja || '').normalize('NFKC').split('/').includes(want))
      : (entry.senses.find((s) => s.field) ?? entry.senses[0]);
    if (sense) jobs.push({ word, targetCode: sense.wordNo });
  }

  console.log(`  받을 것 ${jobs.length}개`);

  let hit = 0;
  let sentTotal = 0;
  for (const [i, job] of jobs.entries()) {
    try {
      const ex = await fetchExamples(job.targetCode);
      out[job.word] = ex;
      if (ex.sentences.length) hit++;
      sentTotal += ex.sentences.length;
    } catch (e) {
      console.log(`\n  ! ${job.word} — ${e.message}`);
    }
    if ((i + 1) % 25 === 0 || i === jobs.length - 1) {
      writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');
      process.stdout.write(`\r  ${i + 1}/${jobs.length}  문장 있는 낱말 ${hit}   `);
    }
    await sleep(DELAY_MS);
  }

  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');

  const words = Object.keys(out).length;
  const withSent = Object.values(out).filter((v) => v.sentences.length).length;
  const withPhrase = Object.values(out).filter((v) => v.phrases.length).length;
  console.log(`\n  → ${OUT}`);
  console.log();
  console.log(`  낱말 ${words}개`);
  console.log(`    용례 문장이 있는 낱말  ${withSent}  (문장 ${sentTotal}개)`);
  console.log(`    짧은 구만 있는 낱말    ${withPhrase - withSent > 0 ? withPhrase - withSent : 0}`);
  console.log(`    용례가 아예 없는 낱말  ${words - withPhrase}`);
}

main();
