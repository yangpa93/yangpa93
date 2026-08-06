#!/usr/bin/env node
/**
 * 사자성어의 **두 번째 예문**을 표준국어대사전 용례로 채운다.
 *
 *     node scripts/korean/fill-idiom-examples.mjs           무엇이 채워지는지 본다
 *     node scripts/korean/fill-idiom-examples.mjs --write   korean/idiom-examples.json 에 적는다
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * 엑셀에는 예문 칸이 둘인데, 123개는 한 칸만 차 있거나 두 칸에 같은 문장이
 * 복사돼 있다. 예문이 하나뿐이면 그 성어를 다시 만날 때마다 같은 문장만
 * 나온다(entry.ts 의 exposure 가 예문을 돌려 쓴다).
 *
 * ── 왜 지어내지 않고 사전에서 가져오나 ──────────────────────
 *
 * 수능 기출 지문을 그대로 옮겨 적을 길이 없다. 기억으로 쓰면 기출이 아닌
 * 문장을 기출인 것처럼 넣게 된다. **사전 용례는 출처가 분명하다.**
 * 이미 받아 둔 korean/stdict-examples.json 에서 가져오고, 거기 없는 것은
 * 채우지 않고 목록으로 남긴다 — 그건 사람이 적어야 한다.
 *
 * 키(STDICT_KEY)가 있으면 `npm run data:korean` 이 용례를 더 받아 온다.
 * 그 뒤에 이 도구를 다시 부르면 더 채워진다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const SRC = 'korean/source.json';
const STDICT = 'korean/stdict-examples.json';
const CORR = 'korean/corrections.json';
const OUT = 'korean/idiom-examples.json';
const WRITE = process.argv.includes('--write');

const src = JSON.parse(readFileSync(SRC, 'utf8'));
const dict = existsSync(STDICT) ? JSON.parse(readFileSync(STDICT, 'utf8')) : {};
const already = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};
const corr = existsSync(CORR) ? JSON.parse(readFileSync(CORR, 'utf8')) : {};

/**
 * **고친 뒤의 이름을 쓴다.**
 *
 * 엑셀에는 표제어가 깨진 것이 있다(`백전백胜` 의 '승'이 중국 간체, `파안미소`
 * 는 표준 표기가 아님). corrections.json 이 그것을 바로잡는데, build-levels 는
 * **바로잡은 뒤에** 예문을 붙인다. 여기서 깨진 이름으로 적어 두면 그때 짝이
 * 안 맞아 조용히 안 붙는다.
 */
const rename = corr.idiom?.rename ?? {};
const fixName = (w) => rename[w]?.word ?? w;

/** 예문이 하나뿐인 사자성어 */
const thin = src.idiom
  .filter((r) => (r.examples ?? []).length < 2)
  .map((r) => ({ ...r, word: fixName(r.word) }));

const added = {};
const still = [];

for (const r of thin) {
  const mine = already[r.word];
  if (mine?.length) continue; // 이미 손으로 적어 둔 것이 있다

  const found = dict[r.word];
  const sentences = Array.isArray(found) ? found : (found?.sentences ?? []);

  /*
   * **표제어가 문장 안에 실제로 들어 있는 것만 쓴다.**
   *
   * 사전 용례에는 그 말이 안 나오는 문장도 섞여 있다. 빈칸 채우기 문제가
   * 되려면 문장 안에 성어가 그대로 있어야 한다.
   */
  const usable = sentences
    .map((s) => (typeof s === 'string' ? s : s?.example ?? ''))
    .map((s) => String(s).trim())
    .filter((s) => s.includes(r.word))
    .filter((s) => s !== (r.examples ?? [])[0]);

  if (usable.length === 0) {
    still.push(r.word);
    continue;
  }
  added[r.word] = usable.slice(0, 2).map((t) => ({ t, s: '표준국어대사전' }));
}

console.log('');
console.log('  사자성어 두 번째 예문 채우기 ' + '─'.repeat(28));
console.log('');
console.log(`  예문이 하나뿐인 성어   ${thin.length}개`);
console.log(`  이미 적어 둔 것        ${thin.length - Object.keys(added).length - still.length}개`);
console.log(`  사전에서 채운 것       ${Object.keys(added).length}개`);
console.log(`  아직 못 채운 것        ${still.length}개  ← 사람이 적어야 합니다`);
console.log('');

if (!WRITE) {
  console.log('  ' + '─'.repeat(58));
  console.log('  아직 안 적었습니다. 맞으면 --write 를 붙이세요.');
  console.log('');
  process.exit(0);
}

const merged = { ...already, ...added };
writeFileSync(OUT, JSON.stringify(merged, null, 1) + '\n', 'utf8');
writeFileSync(
  'korean/idiom-examples-todo.txt',
  ['아직 두 번째 예문이 없는 사자성어', '', ...still].join('\n'),
  'utf8',
);
console.log(`  ${OUT} 에 ${Object.keys(merged).length}개를 적었습니다.`);
console.log('  못 채운 것은 korean/idiom-examples-todo.txt 에 적어 두었습니다.');
console.log('');
