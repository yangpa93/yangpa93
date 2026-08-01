#!/usr/bin/env node
/**
 * 숙어 뜻이 사전과 맞는지 사람이 보게 늘어놓는다.
 *
 *   node scripts/fetch-idioms.mjs idioms-ref.json   # 먼저 사전을 받아 두고
 *   node scripts/verify-idioms.mjs idioms-ref.json  # 대조표를 뽑는다
 *
 * verify-meaning.mjs 는 **유의어**가 겹치는지로 판단한다. 숙어는 사전에
 * 유의어가 거의 안 달려 있어서 그 방법이 통하지 않는다. 그래서 여기서는
 * 자동으로 판정하지 않고 **우리 뜻과 사전 뜻을 나란히 찍어** 사람이 보게 한다.
 *
 * 다만 하나는 자동으로 걸러야 한다 — **사전에서 확인하지 못한 표제어**다.
 * 뜻을 확인할 길이 없는 것이 데이터에 들어가 있으면 안 되므로 오류로 세운다.
 *
 * 예문에서 빈칸을 만들 수 있는지는 여기서 보지 않는다. 앱이 쓰는 규칙
 * (clozeSentence)을 그대로 써야 하는데 그건 TS라 이 스크립트에서 못 부른다.
 * 규칙을 두 벌로 두면 반드시 어긋나므로 __tests__/idioms.test.ts 로 옮겼다.
 */

import { existsSync, readFileSync } from 'node:fs';
import { readEntries } from './lib/levels.mjs';

const refPath = process.argv[2];
if (!refPath || !existsSync(refPath)) {
  console.error('사용법: node scripts/verify-idioms.mjs <사전자료.json>');
  console.error('  먼저: node scripts/fetch-idioms.mjs 사전자료.json');
  process.exit(1);
}

const REF = JSON.parse(readFileSync(refPath, 'utf8'));

/** 이 목록에 있는 표제어만 본다. 낱개 단어는 verify-meaning.mjs 가 맡는다. */
const IDIOMS = new Set(
  readFileSync('data/idiom-vocabulary.txt', 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => l.replace(/\*+$/, '')),
);

const entries = readEntries().filter((e) => IDIOMS.has(e.word));

const noDict = [];
const table = [];

for (const e of entries) {
  const ref = REF[e.word];
  if (!ref || !ref.found) {
    noDict.push(e);
    continue;
  }

  const dictLines = ref.blocks.map((b) => `${b.pos}: ${b.text}`).slice(0, 3);

  table.push({
    word: e.word,
    ours: e.senses.map((s) => s.meaning).join(' ; '),
    // 구 자체가 사전 표제어인지, 핵심 낱말로 되짚은 것인지. 근거의 무게가 다르다.
    via: ref.via,
    dict: dictLines,
  });
}

console.log(`숙어 ${entries.length}개를 봤습니다.\n`);

for (const row of table) {
  console.log(`■ ${row.word}${row.via === 'head' ? '  (핵심 낱말로 확인)' : ''}`);
  console.log(`   우리: ${row.ours}`);
  for (const d of row.dict) console.log(`   사전: ${d}`);
  console.log('');
}

let bad = 0;
if (noDict.length > 0) {
  bad += noDict.length;
  console.log(`\n--- 사전에 없는 표제어 ${noDict.length}개 (데이터에서 빼야 합니다) ---`);
  for (const e of noDict) console.log(`  · ${e.word}  (${e.file}:${e.line})`);
}
if (bad > 0) process.exitCode = 1;
else console.log('사전에서 확인 못 한 표제어는 없습니다.');
