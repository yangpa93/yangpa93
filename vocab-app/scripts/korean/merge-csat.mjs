/**
 * 표준국어대사전에서 받아 온 수능 어휘를 korean/csat-extra.json 으로 정리한다.
 *
 *     node scripts/korean/merge-csat.mjs
 *
 * 사전은 동음이의어를 전부 내려보낸다. 양도만 해도 羊島·良刀·兩刀·量度…
 * 12개가 실려 있다. 그중 어느 것을 쓸지는 csat-candidates.mjs 에 적어 둔
 * 한자로 가린다. 한자가 없는 낱말(외래어·고유어)은 전문 분야가 붙은 뜻을
 * 먼저 잡고, 그것도 없으면 첫 번째 뜻을 쓴다.
 *
 * 여기서 나온 파일은 build-levels.mjs 가 원본 엑셀의 수능 어휘 뒤에 이어
 * 붙인다.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { candidates } from '../../korean/csat-candidates.mjs';

const CACHE = 'korean/stdict.json';
const EXAMPLES = 'korean/stdict-examples.json';
const OPENDICT = 'korean/opendict-examples.json';
const OUT = 'korean/csat-extra.json';

/**
 * 한 어휘에 붙일 예문 수의 상한.
 *
 * 사자성어는 10개, 나머지는 4개로 정했다. 수능 어휘는 뜻이 하나로
 * 고정돼 있어 4개면 쓰임을 익히는 데 충분하다.
 */
const MAX_EXAMPLES = 4;

/** 한자는 变体를 슬래시로 묶어 준다(蔓延/蔓衍). 낱낱으로 펼쳐 비교한다. */
const variants = (h) =>
  (h || '')
    .normalize('NFKC')
    .split('/')
    .map((x) => x.trim())
    .filter(Boolean);

/** 여러 뜻 가운데 우리가 찾던 것 하나를 고른다. */
function pickSense(entry) {
  const want = (entry.hanja || '').normalize('NFKC');

  if (want) {
    const hit = entry.senses.find((s) => variants(s.hanja).includes(want));
    if (hit) return hit;
    return null; // 한자를 적어 놓고 못 찾았으면 내가 잘못 안 것이다. 버린다.
  }

  // 한자가 없는 낱말: 전문 분야가 달린 뜻이 학술 어휘일 확률이 높다.
  return entry.senses.find((s) => s.field) ?? entry.senses[0] ?? null;
}

function main() {
  const cache = JSON.parse(readFileSync(CACHE, 'utf8'));
  const order = candidates();

  // 용례는 따로 받아 둔다. 없으면 예문 없이 나가고, build-levels 가
  // 예문 없는 어휘를 레벨에서 붙잡아 둔다.
  let examples = {};
  try {
    examples = JSON.parse(readFileSync(EXAMPLES, 'utf8'));
  } catch {
    console.log(`  (${EXAMPLES} 없음 — 예문 없이 만듭니다)\n`);
  }

  /*
   * 표준국어대사전에 용례가 없는 어휘는 우리말샘에서 받아 둔 것을 쓴다.
   * 둘 다 국립국어원 자료라 출처를 밝히는 자리만 다르다.
   */
  let opendict = {};
  try {
    opendict = JSON.parse(readFileSync(OPENDICT, 'utf8'));
  } catch {
    // 없으면 그냥 넘어간다.
  }

  const out = [];
  const dropped = [];
  let noExample = 0;

  for (const [i, cand] of order.entries()) {
    const entry = cache[cand.word];
    if (!entry) {
      dropped.push(`${cand.word} — 사전에 없음`);
      continue;
    }
    const sense = pickSense(entry);
    if (!sense) {
      dropped.push(`${cand.word} — ${cand.hanja} 를 사전에서 못 찾음`);
      continue;
    }

    // 문장을 먼저 쓰고, 모자라면 '원인 규명.' 같은 짧은 구로 채운다.
    // 구도 빈칸을 뚫을 수는 있어서 아주 못 쓸 것은 아니다.
    const ex = examples[cand.word] ?? { sentences: [], phrases: [] };
    const fromStd = [...ex.sentences, ...ex.phrases];
    const fromOpen = opendict[cand.word] ?? [];

    // 표준국어대사전을 먼저 쓴다. 감수를 거친 자료라 우리말샘보다 앞선다.
    const picked = [
      ...fromStd.map((t) => ({ t, s: '표준국어대사전' })),
      ...fromOpen.map((t) => ({ t, s: '우리말샘' })),
    ].slice(0, MAX_EXAMPLES);
    if (picked.length === 0) noExample++;

    out.push({
      // 원본 엑셀의 순번(1~800) 뒤에 이어 붙는다. 후보 목록의 순서가
      // 곧 영역별 순서이므로 그대로 난이도 순으로 쓸 수 있다.
      no: 1000 + i,
      word: sense.word,
      hanja: variants(sense.hanja)[0] ?? '',
      // 사전이 전문 분야를 달아 줬으면 그것을 쓰고, 없으면 우리가 나눈 영역.
      field: sense.field || cand.domain,
      meaning: sense.meaning,
      // 국립국어원 용례를 그대로 쓴다. 지어낸 문장이 아니다.
      examples: picked,
    });
  }

  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');

  console.log(`  후보 ${order.length}개 → 확정 ${out.length}개  →  ${OUT}`);
  console.log(
    `  예문 있는 어휘 ${out.length - noExample}개 (예문 ${out.reduce((a, r) => a + r.examples.length, 0)}개) · 없는 어휘 ${noExample}개`,
  );
  if (dropped.length) {
    console.log(`\n  버린 것 ${dropped.length}개`);
    for (const d of dropped) console.log(`    · ${d}`);
  }

  const byField = {};
  for (const r of out) byField[r.field] = (byField[r.field] || 0) + 1;
  const top = Object.entries(byField).sort((a, b) => b[1] - a[1]);
  console.log(`\n  전문 분야 ${top.length}가지`);
  console.log(
    `    ${top
      .slice(0, 14)
      .map(([k, v]) => `${k} ${v}`)
      .join(' · ')}`,
  );
}

main();
