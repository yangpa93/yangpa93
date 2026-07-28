#!/usr/bin/env node
/**
 * 아직 뜻·예문이 없는 단어를 레벨 순서대로 뽑는다.
 *
 *   node scripts/missing.mjs            레벨별 수록 현황
 *   node scripts/missing.mjs m1-1       그 레벨에서 빠진 단어 목록
 */
import { readFileSync, existsSync } from 'node:fs';

const planSrc = readFileSync('src/data/plan.ts', 'utf8');
const plan = new Map();
{
  let level = null;
  for (const line of planSrc.split('\n')) {
    const head = line.match(/^ {2}'([a-z0-9-]+)': \[$/);
    if (head) { level = head[1]; plan.set(level, []); continue; }
    const row = line.match(/^ {4}\["((?:[^"\\]|\\.)*)", \d/);
    if (row && level) plan.get(level).push(JSON.parse(`"${row[1]}"`));
  }
}

function have(level) {
  const f = `src/data/levels/${level}.ts`;
  if (!existsSync(f)) return new Set();
  return new Set(
    [...readFileSync(f, 'utf8').matchAll(/\{ w: '((?:[^'\\]|\\.)*)'/g)].map((m) =>
      m[1].replace(/\\'/g, "'"),
    ),
  );
}

const want = process.argv[2];
if (want) {
  const words = plan.get(want) ?? [];
  const has = have(want);
  const missing = words.filter((w) => !has.has(w));
  console.error(`${want}: 계획 ${words.length} · 수록 ${has.size} · 남음 ${missing.length}`);
  console.log(missing.join('\n'));
} else {
  let doneAll = 0, planAll = 0;
  for (const [level, words] of plan) {
    const n = have(level).size;
    doneAll += n; planAll += words.length;
    const bar = '█'.repeat(Math.round((n / words.length) * 20)).padEnd(20, '·');
    console.log(`${level}  ${bar} ${String(n).padStart(3)}/${words.length}`);
  }
  console.log(`\n합계 ${doneAll}/${planAll}  (남음 ${planAll - doneAll})`);
}
