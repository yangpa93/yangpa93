#!/usr/bin/env node
/**
 * 뜻·예문 채워 넣기.
 *
 *   node scripts/add-entries.mjs batch.txt
 *
 * 한 줄에 뜻 하나를 적으면, **배치표(plan.ts)가 정한 레벨 파일**을 찾아
 * 알파벳 자리에 끼워 넣는다. 3천 개를 손으로 옮겨 적을 수 없어서 만든 도구다.
 *
 * 줄 형식 (칸 구분 `|`, 예문은 영어와 해석을 `::` 로)
 *
 *   word|pos|meaning|syn1;syn2|en1::ko1|en2::ko2|en3::ko3
 *
 *  - 다의어는 **같은 단어를 여러 줄**에 적는다. 적은 순서대로 뜻이 쌓인다.
 *  - 동의어가 없으면 그 칸을 비워 둔다.  `word|n.|뜻||en::ko|en::ko|en::ko`
 *  - `#` 로 시작하는 줄과 빈 줄은 무시한다.
 *  - 이미 수록된 단어는 건너뛴다. 같은 배치를 두 번 돌려도 안전하다.
 *
 * 넣고 나면 반드시 `npm run data:validate` 로 확인한다. 특히
 * "예문에 표제어가 실제로 들어 있는지"가 빈칸 문제를 낼 수 있는지를 가른다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const path = process.argv[2];
if (!path) {
  console.error('사용법: node scripts/add-entries.mjs <배치 파일>');
  process.exit(1);
}

/* ---------- 배치표에서 단어 → 레벨 ---------- */

const planSrc = readFileSync('src/data/plan.ts', 'utf8');
const levelOf = new Map();
{
  let level = null;
  for (const line of planSrc.split('\n')) {
    const head = line.match(/^ {2}'([a-z0-9-]+)': \[$/);
    if (head) {
      level = head[1];
      continue;
    }
    const row = line.match(/^ {4}\["((?:[^"\\]|\\.)*)", \d/);
    if (row && level) levelOf.set(JSON.parse(`"${row[1]}"`), level);
  }
}

/* ---------- 이미 수록된 단어 ---------- */

const levelFile = (level) => `src/data/levels/${level}.ts`;
const fileCache = new Map();

function load(level) {
  if (!fileCache.has(level)) fileCache.set(level, readFileSync(levelFile(level), 'utf8'));
  return fileCache.get(level);
}

const already = new Set();
for (const level of new Set(levelOf.values())) {
  if (!existsSync(levelFile(level))) continue;
  for (const m of load(level).matchAll(/\{ w: '((?:[^'\\]|\\.)*)'/g)) {
    already.add(m[1].replace(/\\'/g, "'"));
  }
}

/* ---------- 배치 파일 읽기 ---------- */

function q(s) {
  return `'${String(s).trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

const problems = [];
const byWord = new Map();
const order = [];

readFileSync(path, 'utf8')
  .split('\n')
  .forEach((raw, i) => {
    const line = raw.trim();
    if (!line || line.startsWith('#')) return;

    const [word, pos, meaning, syn, ...exs] = line.split('|').map((c) => c.trim());
    const no = i + 1;

    if (!word) return;
    if (!pos || !meaning) {
      problems.push(`${no}줄 '${word}': 품사나 뜻이 비었습니다.`);
      return;
    }

    const examples = [];
    for (const ex of exs) {
      if (!ex) continue;
      const [en, ko] = ex.split('::').map((c) => (c ?? '').trim());
      if (!en || !ko) {
        problems.push(`${no}줄 '${word}': 예문의 영어/해석 중 한쪽이 비었습니다.`);
        continue;
      }
      examples.push([en, ko]);
    }
    if (examples.length < 2) {
      problems.push(`${no}줄 '${word}': 뜻 하나에 예문이 2개 이상 있어야 합니다.`);
    }

    if (!byWord.has(word)) {
      byWord.set(word, { word, pos, senses: [] });
      order.push(word);
    }
    byWord.get(word).senses.push({
      meaning,
      synonyms: syn ? syn.split(';').map((s) => s.trim()).filter(Boolean) : [],
      examples,
    });
  });

/* ---------- 항목 블록 만들기 ---------- */

function block(entry) {
  const out = [`  { w: ${q(entry.word)}, p: ${q(entry.pos)}, s: [`];
  for (const sense of entry.senses) {
    out.push(`    { m: ${q(sense.meaning)}, syn: [${sense.synonyms.map(q).join(', ')}], ex: [`);
    for (const [en, ko] of sense.examples) out.push(`      [${q(en)}, ${q(ko)}],`);
    out.push('    ]},');
  }
  out.push('  ]},');
  return out.join('\n');
}

/* ---------- 레벨 파일에 알파벳 자리로 끼워 넣기 ---------- */

const added = new Map();
const skipped = [];
const unplanned = [];

for (const word of order) {
  const entry = byWord.get(word);

  if (already.has(word)) {
    skipped.push(word);
    continue;
  }
  const level = levelOf.get(word);
  if (!level) {
    unplanned.push(word);
    continue;
  }

  const total = entry.senses.reduce((n, s) => n + s.examples.length, 0);
  if (total < 3) problems.push(`'${word}': 예문이 ${total}개뿐입니다. 3개 이상이어야 합니다.`);

  const src = load(level);
  const lines = src.split('\n');

  // 최상위 항목이 시작하는 줄들을 찾아 알파벳 자리를 정한다.
  const starts = [];
  lines.forEach((ln, i) => {
    const m = ln.match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)'/);
    if (m) starts.push({ i, w: m[1].replace(/\\'/g, "'") });
  });

  let at = lines.findIndex((ln) => /^\], '[a-z]+'\);/.test(ln));
  for (const s of starts) {
    if (s.w.localeCompare(word) > 0) {
      at = s.i;
      break;
    }
  }

  lines.splice(at, 0, block(entry));
  fileCache.set(level, lines.join('\n'));
  already.add(word);
  added.set(level, (added.get(level) ?? 0) + 1);
}

/* ---------- 저장 ---------- */

for (const [level, src] of fileCache) {
  const n = (src.match(/^ {2}\{ w: /gm) ?? []).length;
  writeFileSync(levelFile(level), src.replace(/수록 \d+ \//, `수록 ${n} /`));
}

const total = [...added.values()].reduce((a, b) => a + b, 0);
console.log(`${total}개 추가`);
for (const [level, n] of [...added].sort()) console.log(`  ${level}  +${n}`);
if (skipped.length) console.log(`이미 있어 건너뜀 ${skipped.length}개: ${skipped.slice(0, 10).join(', ')}`);
if (unplanned.length) {
  console.log(`\n배치표에 없는 단어 ${unplanned.length}개 — data/extra-vocabulary.txt 에 넣고`);
  console.log(`build-plan.mjs 를 다시 돌려야 합니다: ${unplanned.join(', ')}`);
}
if (problems.length) {
  console.log('\n--- 확인 필요 ---');
  for (const p of problems) console.log(`  · ${p}`);
}
