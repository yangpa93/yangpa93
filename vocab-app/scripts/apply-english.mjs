#!/usr/bin/env node
/**
 * 손봐 주신 `review/영어-단어.csv` 에서 **빼신 낱말을 앱에서도 뺀다.**
 *
 *     npm run apply-english            무엇이 빠지는지 보여만 준다
 *     npm run apply-english -- --write  실제로 지운다
 *
 * ── 국어와 무엇이 다른가 ────────────────────────────────────
 *
 * 국어는 엑셀 원본이 따로 있고 레벨 파일이 거기서 만들어진다. 그래서 고친
 * 것을 corrections.json 에 쌓아 두어야 다음 빌드에 안 날아간다.
 *
 * 영어는 다르다. `src/data/levels/*.ts` 가 **원본 그 자체**다. 아무도 그
 * 파일을 만들어 내지 않으므로 여기서 지우면 그대로 남는다. 그래서 교정
 * 목록 없이 파일을 바로 손댄다.
 *
 * ── 지우는 것만 한다 ────────────────────────────────────────
 *
 * 뜻을 바꾸거나 낱말을 더하는 것은 여기서 안 한다. **지우는 것은 되돌릴
 * 수 있지만(git), 뜻을 갈아 끼우는 것은 옳은 값을 알아야 하는 일이다.**
 * 표에서 옮겨 온 뜻에 줄바꿈 자국이 남아 있는 것을 실제로 봤다
 * ('습득하 다', '식 별하다'). 그런 것을 기계가 알아서 넣으면 아이 화면에
 * 그대로 뜬다.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const CSV = 'review/영어-단어.csv';
const LEVEL_DIR = 'src/data/levels';
const WRITE = process.argv.includes('--write');

const lines = (s) => s.split(/\r?\n/);
const unq = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');

/** 쉼표와 따옴표를 지키며 한 줄을 자른다. */
function csvRow(line) {
  const cells = [];
  let cur = '';
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else cur += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') {
      cells.push(cur);
      cur = '';
    } else cur += ch;
  }
  cells.push(cur);
  return cells;
}

/** 표에 남아 있는 낱말들. 여기 없는 것이 빼신 것이다. */
function keptWords() {
  const raw = readFileSync(CSV, 'utf8').replace(/^﻿/, '');
  const all = lines(raw).filter((l) => l.trim().length > 0);
  const head = csvRow(all[0]);
  const wi = head.indexOf('단어');
  if (wi < 0) throw new Error(`${CSV} 에 '단어' 칸이 없습니다`);

  const out = new Set();
  let buf = '';
  for (const line of all.slice(1)) {
    buf = buf ? `${buf}\n${line}` : line;
    const cells = csvRow(buf);
    if (cells.length < head.length) continue;
    const w = cells[wi].trim();
    if (w) out.add(w);
    buf = '';
  }
  return out;
}

/**
 * 레벨 파일에서 낱말 하나의 덩어리를 통째로 지운다.
 *
 * 덩어리는 `  { w: '낱말', ...` 로 시작해 같은 깊이의 `  ]},` 로 끝난다.
 * 중괄호를 세어 끝을 찾는다 — 예문 안에 대괄호가 들어 있을 수 있어서
 * 줄 모양만 보고 자르면 엉뚱한 데서 끊긴다.
 */
function removeEntries(src, words) {
  const ls = lines(src);
  const out = [];
  const removed = [];

  for (let i = 0; i < ls.length; i++) {
    const m = ls[i].match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)',/);
    if (!m || !words.has(unq(m[1]))) {
      out.push(ls[i]);
      continue;
    }

    // 이 덩어리가 끝나는 줄까지 건너뛴다.
    let depth = 0;
    let j = i;
    for (; j < ls.length; j++) {
      for (const ch of ls[j]) {
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
      }
      if (depth <= 0) break;
    }
    removed.push(unq(m[1]));
    i = j;
  }

  return { text: out.join('\n'), removed };
}

/* ------------------------------------------------------------------ */

const kept = keptWords();
if (kept.size === 0) {
  console.log('');
  console.log(`  ✖ ${CSV} 에서 낱말을 하나도 못 읽었습니다.`);
  console.log('');
  process.exit(1);
}

/* 지금 앱에 들어 있는 낱말 */
const files = readdirSync(LEVEL_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
const inApp = new Map(); // 낱말 -> 파일
for (const f of files) {
  for (const line of lines(readFileSync(`${LEVEL_DIR}/${f}`, 'utf8'))) {
    const m = line.match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)',/);
    if (m) inApp.set(unq(m[1]), f);
  }
}

const toRemove = new Set([...inApp.keys()].filter((w) => !kept.has(w)));
const onlyInCsv = [...kept].filter((w) => !inApp.has(w));

console.log('');
console.log('  손봐 주신 표에서 빼신 낱말을 앱에서도 뺍니다 ' + '─'.repeat(14));
console.log('');
console.log(`  표에 남아 있는 낱말  ${kept.size}개`);
console.log(`  앱에 들어 있는 낱말  ${inApp.size}개`);
console.log(`  빼실 것              ${toRemove.size}개`);
console.log('');

if (toRemove.size > 0) {
  const byFile = new Map();
  for (const w of toRemove) {
    const f = inApp.get(w).replace(/\.ts$/, '');
    byFile.set(f, [...(byFile.get(f) ?? []), w]);
  }
  for (const [f, ws] of [...byFile].sort()) {
    console.log(`  ${f}  ${ws.length}개`);
    console.log(`      ${ws.sort().join(', ')}`);
  }
  console.log('');
}

/*
 * 표에는 있는데 앱에 없는 낱말. **더하는 일은 여기서 안 한다.**
 * 뜻만 있고 예문이 없으면 문제를 낼 수가 없어서, 예문까지 갖춘 뒤에 넣어야 한다.
 */
if (onlyInCsv.length > 0) {
  console.log(`  ℹ️  표에는 있는데 앱에 없는 낱말 ${onlyInCsv.length}개 — 여기서는 안 더합니다`);
  console.log(`      ${onlyInCsv.slice(0, 12).join(', ')}${onlyInCsv.length > 12 ? ' …' : ''}`);
  console.log('      뜻만 있고 예문이 없으면 문제를 낼 수 없어서, 예문까지 갖춘 뒤에 넣습니다.');
  console.log('');
}

if (!WRITE) {
  console.log('  ' + '─'.repeat(58));
  console.log('  아직 아무것도 안 지웠습니다. 위가 맞으면 이렇게 부르세요 :');
  console.log('');
  console.log('      npm run apply-english -- --write');
  console.log('');
  process.exit(0);
}

let total = 0;
for (const f of files) {
  const path = `${LEVEL_DIR}/${f}`;
  const { text, removed } = removeEntries(readFileSync(path, 'utf8'), toRemove);
  if (removed.length === 0) continue;
  writeFileSync(path, text, 'utf8');
  total += removed.length;
}

/* ------------------------------------------------------------------ */
/* 딸린 표들도 같이 맞춘다                                              */
/* ------------------------------------------------------------------ */

/*
 * **낱말 하나가 네 곳에 걸쳐 있다.**
 *
 *   levels/*.ts   뜻과 예문
 *   plan.ts       어느 레벨에서 배우는지 (data/*.txt 에서 만들어진다)
 *   antonyms.ts   반대말 짝
 *   spelling.ts   영국식·미국식 짝
 *
 * 레벨 파일에서만 지우면 나머지 셋이 없는 낱말을 가리킨다. 시험이 그것을
 * 잡아 주지만(data.test.ts), 잡히고 나서 손으로 치우는 것은 일이 된다.
 * 지우는 도구가 끝까지 치우는 편이 맞다 — **반쯤 지운 상태로 두지 않는다.**
 */

/*
 * **교육부 원본 목록(data/*.txt)은 손대지 않는다.**
 *
 * 그 파일은 교육부 「기본 어휘 목록」을 별표까지 그대로 옮긴 것이다. 거기서
 * 지우면 나중에 "이 낱말이 원래 목록에 있었나" 를 확인할 길이 없어진다.
 *
 * 대신 **가르치지 않을 것**을 따로 적어 둔다. 배치표를 만들 때 그 목록을
 * 빼고 만든다(scripts/build-plan.mjs 의 DROP). 국어 쪽 corrections.json 과
 * 같은 생각이다 — 원본은 그대로, 우리가 고친 것만 따로.
 */
const NOT_TAUGHT = 'data/not-taught.json';
let notTaught = {
  _설명: [
    '원본 목록에는 있지만 가르치지 않는 낱말.',
    'scripts/build-plan.mjs 가 배치표를 만들 때 뺀다.',
    '',
    '교육부 목록(data/*.txt)은 손대지 않는다. 원본은 원본대로 두어야',
    '"이 낱말이 원래 목록에 있었나" 를 나중에 확인할 수 있다.',
  ],
};
try {
  notTaught = JSON.parse(readFileSync(NOT_TAUGHT, 'utf8'));
} catch {
  /* 처음이면 위 틀로 시작한다 */
}
let fromNotTaught = 0;
for (const w of toRemove) {
  if (notTaught[w]) continue;
  notTaught[w] = '표를 보시고 초등학교 수준이라 빼기로 하셨습니다';
  fromNotTaught++;
}
writeFileSync(NOT_TAUGHT, JSON.stringify(notTaught, null, 2) + '\n', 'utf8');

/**
 * 반대말 표에서 지운다. **짝의 어느 쪽이 없어져도 그 줄을 통째로 뺀다.**
 * 한쪽만 남은 반대말은 가리킬 곳이 없다.
 */
let fromAntonyms = 0;
{
  const path = 'src/data/antonyms.ts';
  const src = readFileSync(path, 'utf8');
  const out = [];
  for (const line of lines(src)) {
    const m = line.match(/^ {2}'([^']+)': \[(.*)\],\s*$/);
    if (!m) {
      out.push(line);
      continue;
    }
    if (toRemove.has(m[1])) {
      fromAntonyms++;
      continue;
    }
    const list = [...m[2].matchAll(/'([^']*)'/g)].map((x) => x[1]);
    const left = list.filter((w) => !toRemove.has(w));
    if (left.length === 0) {
      fromAntonyms++;
      continue;
    }
    if (left.length !== list.length) fromAntonyms++;
    out.push(`  '${m[1]}': [${left.map((w) => `'${w}'`).join(', ')}],`);
  }
  if (fromAntonyms > 0) writeFileSync(path, out.join('\n'), 'utf8');
}

/**
 * 영국식·미국식 짝에서 지운다. **한쪽이라도 없어지면 짝을 통째로 뺀다.**
 * 짝은 서로를 가리키는 것이 전부라, 반쪽만 남으면 뜻이 없다.
 */
let fromSpelling = 0;
{
  const path = 'src/data/spelling.ts';
  const src = readFileSync(path, 'utf8');
  const out = [];
  for (const line of lines(src)) {
    /*
     * `  { br: 'favourite', us: 'favorite', kind: 'spelling' },`
     *
     * **칸 이름으로 집는다.** 처음에는 따옴표만 세어 앞의 둘을 짝으로 봤는데,
     * 뒤에 kind 가 또 따옴표를 쓰는 바람에 엉뚱한 자리를 집었다. 그래서
     * favourite·programme 이 안 지워지고 남았다. 이름을 적어 두면 칸이
     * 하나 늘어도 안 흔들린다.
     */
    const br = line.match(/\bbr:\s*'((?:[^'\\]|\\.)*)'/);
    const us = line.match(/\bus:\s*'((?:[^'\\]|\\.)*)'/);
    if (br && us && (toRemove.has(br[1]) || toRemove.has(us[1]))) {
      fromSpelling++;
      continue;
    }
    out.push(line);
  }
  if (fromSpelling > 0) writeFileSync(path, out.join('\n'), 'utf8');
}

console.log('  ' + '─'.repeat(58));
console.log(`  낱말 ${total}개를 지웠습니다.`);
console.log('');
console.log('  딸린 표도 같이 치웠습니다');
console.log(`      안 가르칠 낱말 목록     ${fromNotTaught}개  (${NOT_TAUGHT})`);
console.log(`      반대말 표               ${fromAntonyms}줄`);
console.log(`      영국식·미국식 짝        ${fromSpelling}줄`);
console.log('');
console.log('  교육부 원본 목록(data/*.txt)은 손대지 않았습니다.');
console.log('');
console.log('  이어서 :');
console.log('      npm run data:plan > src/data/plan.ts   배치표를 다시 만듭니다');
console.log('      npm test                               규칙이 아직 맞는지');
console.log('      npm run export                         표를 다시 뽑아 확인');
console.log('');
