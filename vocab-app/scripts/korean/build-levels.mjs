/**
 * korean/source.json 을 읽어 src/data/korean/levels/*.ts 24개를 만든다.
 *
 *     node scripts/korean/build-levels.mjs
 *
 * 하는 일은 셋이다.
 *
 * **1. 중복 정리.** 원본 1,450행에는 겹치는 표제어가 42개 있다.
 *   - 개념어 ∩ 수능 32개 — 개념어 쪽 뜻풀이가 더 자세해서 개념어를 남긴다.
 *   - 수능 안에서 5개 (상징·은유·역설·풍자·해학) — 앞의 것을 남긴다.
 *   - 고전 안에서 5개 (가람·갓·고니·미쁘다·벼리) — 뜻이 같고 예문만 다르다.
 *     하나로 합치고 **예문을 둘 다 살린다**. 옛말은 쓰인 자리를 여럿 봐야
 *     익는다.
 *
 * **2. 난이도 순 정렬.** 갈래마다 기준이 다르다.
 *   - 수능: 엑셀 순번 그대로. 원본이 이미 인문·철학 → 사회·법률 → 경제 →
 *     과학 → 예술 → 논리 → 문학 → 고급·기출 순으로 짜여 있어서, 순번이
 *     곧 난이도 오름차순이다.
 *   - 개념어: 엑셀 순번 그대로. 문학 100개가 앞, 비문학 100개가 뒤다.
 *   - 고전: 엑셀 순번 그대로.
 *   - 사자성어: 엑셀은 가나다순이라 난이도와 아무 상관이 없다. 레벨 1에
 *     가담항설·각주구검이 들어가면 안 된다. korean/difficulty.json 에
 *     적어 둔 순위를 쓰고, 거기 없는 것은 뒤로 보낸다.
 *
 * **3. 24레벨 배분.** 갈래마다 제 개수를 24등분한다. 갈래별로 나누지 않고
 * 전체를 한 줄로 세워 자르면, 한 레벨이 통째로 사자성어만 나오는 일이
 * 생긴다. 갈래를 고루 섞어야 하루치(사자성어 1~2 · 개념어 1 · 고전 0~1 ·
 * 수능 3)가 맞는다. 네 갈래가 동시에 끝나는 것도 이 방식이라야 된다.
 */

import { mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { LEVEL_ORDER } from './level-order.mjs';

const SRC = 'korean/source.json';
const EXTRA = 'korean/csat-extra.json';
const DIFF = 'korean/difficulty.json';
const CORR = 'korean/corrections.json';
const CLASSIC_EX = 'korean/classic-examples.json';
const OUT_DIR = 'src/data/korean/levels';

/** 갈래별 상수 이름 앞머리. m1-1 → M1_1 */
const constName = (level) => level.toUpperCase().replace('-', '_');

/* ------------------------------------------------------------------ */
/* 1. 중복 정리                                                         */
/* ------------------------------------------------------------------ */

/**
 * 자리표시 행인지.
 *
 * 수능 시트 800행 중 491행이 실제 어휘가 아니라 `사회법률어휘_31` 같은
 * 빈 껍데기다. 뜻풀이도 "사회학 및 법학 지문에서 출제되는 핵심 개념어
 * (31번)" 식으로 일괄 생성돼 있다. 이런 행이 레벨에 섞이면 아이가
 * 존재하지 않는 낱말을 외우게 되므로 반드시 걸러 낸다.
 */
function isPlaceholder(r) {
  return /_\d+$/.test(r.word) || /\(\d+번\)$|\(\d+번째\)$/.test(r.meaning);
}

/**
 * korean/corrections.json 을 적용한다.
 *
 * 엑셀은 원본 그대로 두고 교정은 따로 적어 둔다. 그래야 무엇이 원본이고
 * 무엇이 우리가 고친 것인지 diff 로 보인다. 근거는 전부 표준국어대사전이다.
 *
 * 사자성어 300개를 오픈 API 로 조회해 대조한 결과 한자가 20개 어긋났고
 * 표제어가 4개 깨져 있었다. 한자 고르기 문제를 낼 것이므로 한 글자만
 * 달라도 아이에게 틀린 답을 가르치게 된다.
 */
function applyCorrections(src, corrections, notes) {
  const c = corrections?.idiom;
  if (!c) return src;

  // 사전에 표제어가 없어 한자를 확인하지 못한 성어들
  const unverified = new Set(c.unverified?.['목록'] ?? []);

  const kept = [];
  for (const r of src.idiom) {
    if (c.drop?.[r.word]) {
      notes.push(`사자성어 '${r.word}' 뺌 — ${c.drop[r.word]}`);
      continue;
    }

    const row = { ...r };
    const ren = c.rename?.[r.word];
    if (ren && ren.word) {
      notes.push(`사자성어 '${r.word}' → '${ren.word}' — ${ren.why}`);
      row.word = ren.word;
      if (ren.hanja) row.hanja = ren.hanja;
    }

    const fixed = c.hanja?.[row.word];
    if (fixed && fixed !== row.hanja) {
      notes.push(`사자성어 '${row.word}' 한자 ${row.hanja} → ${fixed} (표준국어대사전)`);
      row.hanja = fixed;
    }

    if (unverified.has(row.word)) row.hanjaVerified = false;

    kept.push(row);
  }

  return { ...src, idiom: kept };
}

/**
 * 표제어가 겹칠 때 어느 갈래를 남길지.
 *
 * 앞에 적힌 갈래가 이긴다.
 *   사자성어 — 주객전도·천편일률처럼 개념어/수능에도 실린 것이 있는데,
 *              사자성어로 배우는 편이 한자까지 같이 익혀 남는 게 많다.
 *   개념어   — 수능 시트와 34개가 겹친다. 개념어 쪽 뜻풀이가 더 자세하다.
 *   고전     — 다른 갈래와 겹치지 않는다.
 *   수능     — 마지막.
 */
const PRIORITY = ['idiom', 'concept', 'classic', 'csat'];

const LABEL = { idiom: '사자성어', concept: '개념어', classic: '고전', csat: '수능' };

function dedupe(src) {
  const notes = [];
  const out = { idiom: [], concept: [], classic: [], csat: [] };

  /** 이미 자리를 차지한 표제어 → 어느 갈래가 가져갔는지 */
  const owner = new Map();
  /** 같은 갈래 안에서 다시 나온 표제어를 합칠 수 있게 */
  const byWord = new Map();

  let dropped = 0;

  for (const category of PRIORITY) {
    for (const r of src[category]) {
      if (category === 'csat' && isPlaceholder(r)) {
        dropped++;
        continue;
      }

      // 원본 엑셀은 예문을 문자열 하나(`example`)로, 사전에서 받아 온 것은
      // 출처가 붙은 목록(`examples`)으로 준다. 안에서는 한 가지로 다룬다.
      const incoming = r.examples ?? (r.example ? [{ t: r.example }] : []);

      const held = owner.get(r.word);
      if (held === category) {
        // 같은 갈래 안에서 또 나왔다 — 예문만 가져다 붙인다.
        // 고전의 가람·갓·고니·미쁘다·벼리가 여기에 해당한다. 옛말은
        // 쓰인 자리를 여럿 봐야 익으므로 문장을 버리지 않는다.
        const prev = byWord.get(r.word);
        const seen = new Set(prev.examples.map((e) => e.t));
        const fresh = incoming.filter((e) => !seen.has(e.t));
        if (fresh.length) {
          prev.examples.push(...fresh);
          notes.push(`${LABEL[category]} '${r.word}' 합침 (예문 ${prev.examples.length}개)`);
        } else {
          notes.push(`${LABEL[category]} '${r.word}' 중복 제거`);
        }
        continue;
      }
      if (held) {
        notes.push(`${LABEL[category]} '${r.word}' → ${LABEL[held]}에 있어서 뺌`);
        continue;
      }

      const rec = { ...r, examples: incoming };
      owner.set(r.word, category);
      byWord.set(r.word, rec);
      out[category].push(rec);
    }
  }

  if (dropped) notes.push(`수능 자리표시 ${dropped}행 걸러냄 (실제 어휘가 아님)`);

  return { ...out, notes };
}

/* ------------------------------------------------------------------ */
/* 2. 난이도 순 정렬                                                     */
/* ------------------------------------------------------------------ */

function sortByDifficulty(data, difficulty) {
  // 사자성어만 따로 순위를 매긴다. 나머지는 엑셀 순번이 곧 난이도다.
  const rank = new Map(difficulty.idiom.map((w, i) => [w, i]));
  const missing = data.idiom.filter((r) => !rank.has(r.word)).map((r) => r.word);

  data.idiom.sort((a, b) => {
    const ra = rank.has(a.word) ? rank.get(a.word) : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b.word) ? rank.get(b.word) : Number.MAX_SAFE_INTEGER;
    // 순위가 같으면(둘 다 미등재) 엑셀 순번으로 갈라 순서를 고정한다.
    return ra - rb || a.no - b.no;
  });

  for (const key of ['concept', 'classic', 'csat']) {
    data[key].sort((a, b) => a.no - b.no);
  }

  return missing;
}

/* ------------------------------------------------------------------ */
/* 3. 24레벨 배분                                                       */
/* ------------------------------------------------------------------ */

/**
 * 배열을 n조각으로 최대한 고르게 자른다.
 *
 * 나머지는 **앞쪽 레벨에** 얹는다. 뒤로 갈수록 어휘가 어려워지므로,
 * 같은 개수라면 쉬운 쪽에 하나 더 넣는 편이 낫다.
 */
function chunk(list, n) {
  const base = Math.floor(list.length / n);
  const extra = list.length % n;
  const out = [];
  let i = 0;
  for (let k = 0; k < n; k++) {
    const size = base + (k < extra ? 1 : 0);
    out.push(list.slice(i, i + size));
    i += size;
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 파일로 쓰기                                                          */
/* ------------------------------------------------------------------ */

const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

function renderRow(r, category) {
  const parts = [`w: ${q(r.word)}`];
  if (r.hanja) parts.push(`h: ${q(r.hanja)}`);
  // 사전에서 확인 못 한 한자는 표시해 둔다. 한자 고르기 문제에서 뺀다.
  if (r.hanja && r.hanjaVerified === false) parts.push('v: false');
  if (r.field) parts.push(`f: ${q(r.field)}`);
  parts.push(`m: ${q(r.meaning)}`);

  const ex = r.examples
    .filter((e) => e && e.t)
    .map((e) => {
      const fields = [`t: ${q(e.t)}`];
      if (e.g) fields.push(`g: ${q(e.g)}`);
      // 출처가 있으면 원전에서 가져온 문장이라는 뜻이다. 화면에서 지어낸
      // 예문과 구별해 보여주려고 남긴다.
      if (e.s) fields.push(`s: ${q(e.s)}`);
      return `      { ${fields.join(', ')} },`;
    })
    .join('\n');

  return `  { ${parts.join(', ')}, e: [\n${ex}\n  ]},`;
}

const CATEGORY_COMMENT = {
  idiom: '사자성어',
  concept: '개념어',
  classic: '고전',
  csat: '수능 어휘',
};

function renderLevel(level, buckets) {
  const total = Object.values(buckets).reduce((a, b) => a + b.length, 0);
  const summary = Object.entries(buckets)
    .filter(([, v]) => v.length)
    .map(([k, v]) => `${CATEGORY_COMMENT[k]} ${v.length}`)
    .join(' · ');

  const blocks = Object.entries(buckets)
    .filter(([, v]) => v.length)
    .map(([cat, rows]) => {
      const body = rows.map((r) => renderRow(r, cat)).join('\n');
      return `const ${cat.toUpperCase()} = defineKoLevel('${level}', '${cat}', [\n${body}\n]);`;
    })
    .join('\n\n');

  const names = Object.entries(buckets)
    .filter(([, v]) => v.length)
    .map(([cat]) => cat.toUpperCase())
    .join(', ...');

  return `/**
 * 국어 ${level} — ${total}개 (${summary}).
 *
 * 이 파일은 scripts/korean/build-levels.mjs 가 만든다. 직접 고치지 말고
 * korean/source.json 이나 korean/difficulty.json 을 고친 뒤 다시 돌린다.
 */

import { defineKoLevel } from '../define';

${blocks}

export const KO_${constName(level)} = [...${names}];
`;
}

/* ------------------------------------------------------------------ */

function main() {
  const src = JSON.parse(readFileSync(SRC, 'utf8'));

  // 표준국어대사전에서 보충한 수능 어휘를 엑셀 뒤에 이어 붙인다.
  // 원본 엑셀의 껍데기 491행을 메우려고 따로 받아 온 것이다.
  try {
    const extra = JSON.parse(readFileSync(EXTRA, 'utf8'));
    src.csat = [...src.csat, ...extra];
    console.log(`  ${EXTRA} 에서 ${extra.length}개 보충\n`);
  } catch {
    console.log(`  (${EXTRA} 없음 — 엑셀에 있는 수능 어휘만 씁니다)\n`);
  }

  // 난이도 순위는 아직 없을 수 있다. 없으면 엑셀 순번대로 간다.
  let difficulty = { idiom: [] };
  try {
    difficulty = JSON.parse(readFileSync(DIFF, 'utf8'));
  } catch {
    console.log(`  (${DIFF} 없음 — 사자성어를 엑셀 순번대로 둡니다)\n`);
  }

  let corrections = null;
  try {
    corrections = JSON.parse(readFileSync(CORR, 'utf8'));
  } catch {
    console.log(`  (${CORR} 없음 — 엑셀을 그대로 씁니다)\n`);
  }

  const fixNotes = [];
  const corrected = applyCorrections(src, corrections, fixNotes);

  /*
   * 고전 어휘에 원문 인용을 얹는다.
   *
   * 엑셀 예문('나를 괴시던 님')은 짧은 토막이라 어디서 온 말인지 알 수 없다.
   * 위키문헌에서 받은 원문에서 그 낱말이 실제로 쓰인 행을 찾아 뒤에 붙이고
   * 출처를 단다. 찾은 것만 붙인다 — 어느 작품에 나온다고 어림잡아 적으면
   * 그것이 곧 지어낸 출처다.
   */
  try {
    const quotes = JSON.parse(readFileSync(CLASSIC_EX, 'utf8'));
    let n = 0;
    for (const r of corrected.classic) {
      const found = quotes[r.word];
      if (!found?.length) continue;
      r.examples = [{ t: r.example }, ...found];
      n += found.length;
    }
    if (n) console.log(`  고전 원문 인용 ${n}개를 ${Object.keys(quotes).length}개 어휘에 붙였습니다\n`);
  } catch {
    // 없으면 엑셀 예문만 쓴다.
  }

  const data = dedupe(corrected);
  data.notes = [...fixNotes, ...data.notes];

  /*
   * 예문이 하나도 없는 어휘는 레벨에 넣지 않는다.
   *
   * 이 앱의 문제는 전부 문장으로 나온다. 예문이 없으면 빈칸을 뚫을 자리가
   * 없어 문항 자체가 만들어지지 않고, 학습 화면이 빈 채로 뜬다. 사전에서
   * 갓 받아 온 어휘가 여기 걸린다 — 뜻과 한자는 있지만 예문이 아직 없다.
   * 조용히 빼면 왜 안 나오는지 알 수 없으므로 개수를 찍어 둔다.
   */
  const held = {};
  for (const c of ['idiom', 'concept', 'classic', 'csat']) {
    const before = data[c].length;
    data[c] = data[c].filter((r) => r.examples.length > 0);
    if (before !== data[c].length) held[c] = before - data[c].length;
  }
  const missing = sortByDifficulty(data, difficulty);

  const categories = ['idiom', 'concept', 'classic', 'csat'];
  const chunks = Object.fromEntries(
    categories.map((c) => [c, chunk(data[c], LEVEL_ORDER.length)]),
  );

  // id가 겹치면 학습 기록이 서로 섞인다. 쓰기 전에 막는다.
  const ids = new Set();
  for (const c of categories) {
    for (const r of data[c]) {
      const id = `ko-${r.word.replace(/\s+/g, '-')}`;
      if (ids.has(id)) throw new Error(`id 충돌: ${id}`);
      ids.add(id);
    }
  }

  mkdirSync(OUT_DIR, { recursive: true });
  for (const f of readdirSync(OUT_DIR).filter((f) => f.endsWith('.ts'))) {
    rmSync(`${OUT_DIR}/${f}`);
  }

  const index = [];
  LEVEL_ORDER.forEach((level, i) => {
    const buckets = Object.fromEntries(categories.map((c) => [c, chunks[c][i]]));
    writeFileSync(`${OUT_DIR}/${level}.ts`, renderLevel(level, buckets), 'utf8');
    index.push({ level, buckets });
  });

  writeFileSync(
    `${OUT_DIR}/index.ts`,
    `/**
 * 국어 레벨 24개를 한데 모은다.
 *
 * 이 파일은 scripts/korean/build-levels.mjs 가 만든다. 직접 고치지 않는다.
 */

import { KoEntry } from '../../../types';
${LEVEL_ORDER.map((l) => `import { KO_${constName(l)} } from './${l}';`).join('\n')}

export const KO_ENTRIES: KoEntry[] = [
${LEVEL_ORDER.map((l) => `  ...KO_${constName(l)},`).join('\n')}
];
`,
    'utf8',
  );

  /* 보고 */
  for (const n of data.notes) console.log(`  · ${n}`);
  console.log();
  console.log('  갈래별 개수');
  for (const c of categories) {
    console.log(`    ${CATEGORY_COMMENT[c].padEnd(6)} ${String(data[c].length).padStart(4)}`);
  }
  const total = categories.reduce((a, c) => a + data[c].length, 0);
  console.log(`    ${'합계'.padEnd(6)} ${String(total).padStart(4)}`);
  console.log();
  console.log('  레벨별 배분');
  for (const { level, buckets } of index) {
    const n = categories.map((c) => String(buckets[c].length).padStart(3)).join('');
    const sum = categories.reduce((a, c) => a + buckets[c].length, 0);
    console.log(`    ${level.padEnd(6)}${n}   = ${sum}`);
  }
  if (missing.length) {
    console.log();
    console.log(`  ⚠ 난이도 순위에 없는 사자성어 ${missing.length}개 — 뒤쪽 레벨로 밀림`);
    console.log(`    ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? ' …' : ''}`);
  }
  const heldTotal = Object.values(held).reduce((a, b) => a + b, 0);
  if (heldTotal) {
    console.log();
    console.log(`  ⚠ 예문이 없어 아직 넣지 않은 어휘 ${heldTotal}개`);
    for (const [c, n] of Object.entries(held)) {
      console.log(`    ${CATEGORY_COMMENT[c]} ${n}개`);
    }
  }
}

main();
