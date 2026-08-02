#!/usr/bin/env node
/**
 * 우리말샘 Open API 에서 **그 뜻에 달린** 용례를 받아 온다.
 *
 *   $env:STDICT_KEY = "..."          # 표준국어대사전과 같은 키가 통한다
 *   node scripts/korean/opendict-api.mjs
 *
 * ── 왜 opendict-examples.mjs 로는 안 되는가 ───────────────────
 *
 * 그쪽은 우리말샘 **화면**을 읽는다. 화면의 용례 검색은 뜻이 아니라 **글자**로
 * 찾아서, `간과(干戈, 방패와 창)` 가 쓰인 문장이 `간과(看過, 대충 보아 넘김)`
 * 의 예문으로 붙는다. 그래서 동음이의어가 있는 낱말은 아예 보류했고, 그 결과
 * 수능 어휘 62개가 통째로 빠져 있었다(그중 53개가 동음이의어).
 *
 * API 는 **뜻마다 target_code** 를 준다. 뜻을 짚어 물으면 그 뜻의 용례만
 * 온다. 동음이의어 문제가 사라진다.
 *
 * ── 어느 뜻인지 어떻게 아는가 ────────────────────────────────
 *
 * 우리 자료(csat-extra.json)에는 표준국어대사전에서 받은 **뜻풀이**가 이미
 * 들어 있다. 우리말샘은 표준국어대사전 내용을 품고 있어서 뜻풀이가 거의
 * 그대로 겹친다. 그래서 **뜻풀이가 같은 뜻**을 고른다.
 *
 * 애매하면 **버린다.** 비슷해 보이는 다른 뜻의 용례를 붙이느니 그 낱말을
 * 빼는 편이 낫다 — 아이는 그 예문이 맞다고 믿고 외운다.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const KEY = process.env.STDICT_KEY;
const EXTRA = 'korean/csat-extra.json';
const OUT = 'korean/opendict-api-examples.json';
const SEARCH = 'https://opendict.korean.go.kr/api/search';
const VIEW = 'https://opendict.korean.go.kr/api/view';

/** 한 낱말에 붙일 용례 최대 개수. */
const MAX_PER_WORD = 4;

if (!KEY) {
  console.error('STDICT_KEY 환경 변수가 없습니다.');
  console.error('  파워셸 :  $env:STDICT_KEY = "..."  후에 실행');
  process.exit(1);
}

/**
 * curl 로 받는다. node 의 fetch 는 HTTPS_PROXY 를 스스로 안 본다.
 * 프록시 뒤에서 조용히 다 실패하고, 그게 '사전에 없음' 으로 적히면
 * 멀쩡한 낱말이 빠진다.
 */
function get(url) {
  const body = execFileSync('curl', ['-sS', '--max-time', '30', url], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
  return JSON.parse(body);
}

/** 뜻풀이를 견주기 좋게 다듬는다. 공백·문장부호 차이는 같은 뜻으로 본다. */
function norm(s) {
  return (s ?? '')
    .replace(/<[^>]+>/g, '')
    .replace(/[\s.,·‘’“”'"()（）「」]/g, '')
    .trim();
}

/**
 * 우리 뜻풀이와 같은 뜻을 고른다.
 *
 * 완전히 같으면 그것, 아니면 한쪽이 다른 쪽을 통째로 품고 있는 것
 * (우리말샘이 설명을 덧붙이는 경우가 있다). 둘 다 아니면 null 이다 —
 * 어림잡아 고르지 않는다.
 */
export function pickSense(items, meaning) {
  const want = norm(meaning);
  if (!want) return null;

  const senses = items.flatMap((it) => it.sense ?? []);
  const exact = senses.find((s) => norm(s.definition) === want);
  if (exact) return exact;

  const contained = senses.filter((s) => {
    const d = norm(s.definition);
    return d.length > 0 && (d.includes(want) || want.includes(d));
  });
  // 여럿이 걸리면 어느 것인지 알 수 없다. 버린다.
  return contained.length === 1 ? contained[0] : null;
}

/**
 * 예문으로 쓸 만한 용례인지.
 *
 * 사전 용례에는 '원인 규명.' 처럼 문장이 아닌 짧은 구가 섞여 있다. 빈칸
 * 문제는 문장이라야 성립한다. 북한어 용례도 뺀다 — 아이가 배우는 말이 아니다.
 */
function usable(text) {
  const t = (text ?? '').replace(/[{}]/g, '').trim();
  if (!t) return null;
  if (!/[.!?]$/.test(t)) return null;
  if (t.split(/\s+/).length < 3) return null;
  if (t.length > 90) return null;
  // 말줄임표가 든 것은 사전이 길어서 잘라 실은 조각이다. 문장이 아니다.
  // ('…등을 꼽을 수 있으며,….' 같은 것이 하나 걸렸다)
  if (t.includes('…')) return null;
  return t;
}

const extra = JSON.parse(readFileSync(EXTRA, 'utf8'));
const need = extra.filter((r) => !r.examples || r.examples.length === 0);
const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

console.log(`예문이 없는 어휘 ${need.length}개`);

let hit = 0;
let noSense = 0;
let noExample = 0;

for (const [i, rec] of need.entries()) {
  if (rec.word in out) {
    if (out[rec.word].length) hit++;
    continue;
  }

  const url =
    `${SEARCH}?key=${KEY}&q=${encodeURIComponent(rec.word)}` +
    `&req_type=json&advanced=y&method=exact&num=30`;
  let items = [];
  try {
    items = get(url).channel?.item ?? [];
    if (!Array.isArray(items)) items = [items];
  } catch (e) {
    console.log(`  ! ${rec.word} — 검색 실패: ${e.message}`);
    continue;
  }

  const sense = pickSense(items, rec.meaning);
  if (!sense) {
    noSense++;
    out[rec.word] = [];
    continue;
  }

  let examples = [];
  try {
    const view = get(`${VIEW}?key=${KEY}&method=target_code&q=${sense.target_code}&req_type=json`);
    const info = view.channel?.item?.senseInfo?.example_info ?? [];
    examples = (Array.isArray(info) ? info : [info])
      .map((x) => usable(x?.example))
      .filter(Boolean)
      .slice(0, MAX_PER_WORD);
  } catch (e) {
    console.log(`  ! ${rec.word} — 용례 실패: ${e.message}`);
  }

  out[rec.word] = examples;
  if (examples.length) hit++;
  else noExample++;

  if ((i + 1) % 10 === 0) {
    writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');
    process.stdout.write(`\r  ${i + 1}/${need.length}  용례를 찾은 낱말 ${hit}   `);
  }
}

writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');

console.log(
  `\n\n  용례를 찾은 낱말 ${hit}개\n` +
    `  같은 뜻을 못 찾아 버린 것 ${noSense}개\n` +
    `  뜻은 찾았는데 용례가 없는 것 ${noExample}개\n` +
    `  → ${OUT}`,
);
