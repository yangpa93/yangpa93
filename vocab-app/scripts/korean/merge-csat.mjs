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
const OUT = 'korean/csat-extra.json';

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

  const out = [];
  const dropped = [];

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

    out.push({
      // 원본 엑셀의 순번(1~800) 뒤에 이어 붙는다. 후보 목록의 순서가
      // 곧 영역별 순서이므로 그대로 난이도 순으로 쓸 수 있다.
      no: 1000 + i,
      word: sense.word,
      hanja: variants(sense.hanja)[0] ?? '',
      // 사전이 전문 분야를 달아 줬으면 그것을 쓰고, 없으면 우리가 나눈 영역.
      field: sense.field || cand.domain,
      meaning: sense.meaning,
      // 예문은 아직 없다. 표준국어대사전 목록 화면은 용례를 주지 않는다.
      example: '',
      source: '표준국어대사전',
    });
  }

  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');

  console.log(`  후보 ${order.length}개 → 확정 ${out.length}개  →  ${OUT}`);
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
