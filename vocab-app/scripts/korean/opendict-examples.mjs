/**
 * 우리말샘에서 용례를 받아 온다. 표준국어대사전에 용례가 없는 어휘용이다.
 *
 *     node scripts/korean/opendict-examples.mjs
 *
 * **동음이의어가 있는 낱말은 건드리지 않는다.**
 *
 * 우리말샘 용례 검색은 '그 글자가 들어간 문장'을 돌려준다. 어느 뜻으로
 * 쓰인 문장인지는 알려 주지 않는다. 그래서 양도(讓渡 / 良刀 / 量度 …
 * 12가지)처럼 동음이의어가 많은 낱말은 엉뚱한 뜻의 문장을 가져올 수 있다.
 * '전자'를 물어 電子가 아니라 前者 문장을 받아 오면, 과학 어휘를 배우려던
 * 아이가 글쓰기 표현을 외우게 된다.
 *
 * 표준국어대사전에 한자가 하나뿐인 낱말만 받는다. 그런 낱말은 그 글자가
 * 나오는 문장이 곧 그 뜻이라 어긋날 여지가 없다. 나머지는 손대지 않고
 * 남겨 둔다 — 자동으로 채우느니 비어 있는 편이 낫다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

// Node 의 fetch 는 HTTPS_PROXY 를 스스로 보지 않는다. 사정은
// stdict-lookup.mjs 위쪽 주석에 적어 뒀다.
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const r = spawnSync(process.execPath, [...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const SENSES = 'korean/stdict.json';
const EXTRA = 'korean/csat-extra.json';
const OUT = 'korean/opendict-examples.json';

/** 용례 탭. dicType=4 가 용례다. */
const BASE = 'https://opendict.korean.go.kr/search/searchResult';

const DELAY_MS = 250;
const MAX_PER_WORD = 6;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 용례 목록에서 문장만 뽑는다.
 *
 * 화면에는 문장 뒤에 `(어휘: 귀납-식 「001」 )` 처럼 어느 표제어의 용례인지가
 * 붙어 나온다. 우리에게는 문장만 필요하므로 떼어 낸다.
 */
function parseExamples(html, word) {
  const out = [];

  // 용례 한 줄은 이렇게 생겼다.
  //   <span class="word_dis">법은 <strong>관습법</strong> 중심에서 …
  //   왔다.(어휘: <span>성문-법</span><span>「001」</span>)</span>
  // 태그를 지울 때 공백을 끼워 넣지 않는다. '연역<strong>적</strong>' 을
  // '연역 적' 으로 만들면 문장이 망가진다.
  for (const [, block] of html.matchAll(/<span class="word_dis">([\s\S]*?)<\/span>\s*<\/a>/g)) {
    const text = block
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/[ \t]+/g, ' ')
      .trim();

    // '(어휘: 성문-법 「001」)' 꼬리표를 뗀다. 어느 표제어의 용례인지
    // 알려 주는 표시라 문장에는 필요 없다.
    const sentence = text.replace(/\(\s*어휘:[\s\S]*$/, '').trim();
    if (!sentence || !sentence.includes(word)) continue;

    // 문장이라야 빈칸을 뚫을 수 있다.
    if (!/[.!?]$/.test(sentence)) continue;
    if (sentence.split(/\s+/).length < 4) continue;
    // 너무 길면 아이가 읽다 지친다. 사전 용례에는 한 문단짜리도 섞여 있다.
    if (sentence.length > 100) continue;
    // 우리말샘은 고유 명사를 'O' 로 가려 놓는다('O 당선인'). 가린 자리가
    // 있으면 문장이 읽히지 않으므로 버린다.
    if (/(?:^|\s)O+(?=\s|[가-힣])/.test(sentence)) continue;

    out.push(sentence);
  }

  /*
   * 같은 문장이 한자만 붙은 채로 또 들어오는 일이 있다.
   *   '인식론(認識論)에서 경험이라고 하면 …'
   *   '인식론에서 경험이라고 하면 …'
   * 괄호와 공백을 지우고 견주면 같은 문장으로 묶인다.
   */
  const seen = new Set();
  const uniq = [];
  for (const e of out) {
    const key = e.replace(/\([^)]*\)/g, '').replace(/\s+/g, '');
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(e);
  }

  // 짧은 문장을 앞에 둔다. 아이가 먼저 만나는 예문이 읽기 쉬워야 한다.
  uniq.sort((a, b) => a.length - b.length);
  return uniq.slice(0, MAX_PER_WORD);
}

async function lookup(word) {
  const url = `${BASE}?query=${encodeURIComponent(word)}&dicType=4&wordMatch=N&infoType=confirm`;
  const res = await fetch(url, { headers: { 'user-agent': 'gomtangivoca-vocab-builder/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return parseExamples(await res.text(), word);
}

async function main() {
  const senses = JSON.parse(readFileSync(SENSES, 'utf8'));
  const extra = JSON.parse(readFileSync(EXTRA, 'utf8'));
  const cache = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

  const needed = extra.filter((r) => r.examples.length === 0).map((r) => r.word);

  const safe = [];
  const skipped = [];
  for (const w of needed) {
    const e = senses[w];
    const forms = e ? new Set(e.senses.map((s) => s.hanja).filter(Boolean)) : new Set();
    if (forms.size <= 1) safe.push(w);
    else skipped.push(`${w}(${forms.size})`);
  }

  console.log(`  예문 없는 어휘 ${needed.length}개`);
  console.log(`    동음이의어 없음 → 받는다   ${safe.length}개`);
  console.log(`    동음이의어 있음 → 보류     ${skipped.length}개`);
  console.log();

  const todo = safe.filter((w) => !(w in cache));
  let hit = 0;
  for (const [i, word] of todo.entries()) {
    try {
      const ex = await lookup(word);
      cache[word] = ex;
      if (ex.length) hit++;
    } catch (e) {
      console.log(`\n  ! ${word} — ${e.message}`);
    }
    if ((i + 1) % 10 === 0 || i === todo.length - 1) {
      writeFileSync(OUT, JSON.stringify(cache, null, 1) + '\n', 'utf8');
      process.stdout.write(`\r  ${i + 1}/${todo.length}  찾음 ${hit}   `);
    }
    await sleep(DELAY_MS);
  }
  writeFileSync(OUT, JSON.stringify(cache, null, 1) + '\n', 'utf8');

  const got = Object.values(cache).filter((v) => v.length).length;
  const none = Object.values(cache).filter((v) => !v.length).length;
  console.log(`\n  → ${OUT}`);
  console.log(`     용례를 받은 어휘 ${got}개 (문장 ${Object.values(cache).flat().length}개)`);
  console.log(`     우리말샘에도 없는 어휘 ${none}개`);
  if (skipped.length) {
    console.log();
    console.log('  보류한 어휘 (동음이의어가 있어 뜻이 어긋날 수 있음)');
    console.log(`    ${skipped.join(' ')}`);
  }
}

main();
