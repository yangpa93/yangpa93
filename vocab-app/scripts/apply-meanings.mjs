#!/usr/bin/env node
/**
 * 손봐 주신 표의 **뜻을 앱에 갈아 끼운다.**
 *
 *     node scripts/apply-meanings.mjs review/빈도4.csv            보여만 준다
 *     node scripts/apply-meanings.mjs review/빈도4.csv --write     실제로 바꾼다
 *
 * ── apply-english 와 무엇이 다른가 ──────────────────────────
 *
 * `apply-english` 는 **지우기**만 한다. 지우는 것은 git 으로 되돌릴 수 있지만
 * 뜻을 갈아 끼우는 것은 옳은 값을 알아야 하는 일이라 따로 뒀다.
 *
 * ── 넣기 전에 먼저 훑는다 ───────────────────────────────────
 *
 * 엑셀에서 옮겨 온 뜻에는 줄바꿈 자국이 남는다('습득하 다' · '식 별하다').
 * 그대로 넣으면 아이 화면에 그 모양으로 뜬다. 그래서 **표에 자국이 하나라도
 * 남아 있으면 아무것도 안 하고 멈춘다.** 지나칠 수 있게 두면 언젠가 지나친다.
 *
 *     node scripts/check-meanings.mjs review/빈도4.csv   무엇이 걸리는지만 본다
 *
 * ── 뜻이 여럿인 낱말은 손대지 않는다 ────────────────────────
 *
 * **예문은 뜻에 딸려 있다.** 뜻만 갈아 끼우면 예문과 어긋날 수 있다.
 *
 *   objective   앱 '목표 ; 객관적인'      표 '객관적인; 목적, 목표'   순서가 반대
 *   demand      앱 '수요 ; 요구하다'      표 '요구하다; 수요, 요구 사항'  반대
 *   subject     앱 '과목 ; 주제, 화제'    표 '연구 대상자, …, 신하'   '과목'이 아예 없다
 *
 * 갈래 수가 같아도 순서가 같다는 보장이 없다. 기계가 짝지으면 '과목' 예문 밑에
 * '신하' 라고 적히는 일이 생긴다. 그래서 **뜻이 하나인 낱말만** 자동으로
 * 바꾸고, 나머지는 화면에 적어 사람이 보게 한다.
 *
 * 표 쪽 뜻에 `;` 갈래가 있는 것도 같은 까닭으로 넘긴다 — 한 뜻 자리에 갈래
 * 둘을 밀어 넣을 수는 없다.
 *
 * ── 긴 뜻은 앞 몇 개만 남긴다 ───────────────────────────────
 *
 * 표에는 뜻이 열 개까지 늘어선 낱말이 있다.
 *
 *     identify  파악하다, 확인하다, 식별하다, 알아내다, 인식하다, 발견하다,
 *               분간하다, 밝히다, 동일시하다, 규명하다
 *
 * 뜻 하나를 그대로 4지선다 보기로 쓰는 자리가 있어서(entry.ts 의
 * primaryMeaning), 이대로 넣으면 보기 한 줄이 화면을 넘긴다. 그래서 기본으로
 * **앞 다섯 개만** 남긴다. `--keep=N` 으로 바꿀 수 있고, `--keep=0` 이면
 * 자르지 않는다.
 *
 * **잘라 낸 뜻은 표에 그대로 있다.** 앱은 아이가 읽는 곳이라 짧아야 하고,
 * 표는 회원님이 보시는 곳이라 다 남아 있는 편이 낫다.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { suspects } from './check-meanings.mjs';

const LEVEL_DIR = 'src/data/levels';
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const CSV = args[0] ?? 'review/빈도4.csv';
const WRITE = process.argv.includes('--write');
/** 뜻을 몇 개까지 남길지. 0 이면 안 자른다. */
const KEEP = Number(process.argv.find((a) => a.startsWith('--keep='))?.slice('--keep='.length) ?? 5);

const lines = (s) => s.split(/\r?\n/);
const unq = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
/** 레벨 파일에 적을 수 있게 따옴표를 감싼다. add-entries.mjs 와 같은 규칙. */
const q = (s) => String(s).trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");

/** 쉼표와 따옴표를 지키며 한 줄을 자른다. apply-english.mjs 와 같은 것. */
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

/* ------------------------------------------------------------------ */
/* 손봐 주신 표                                                         */
/* ------------------------------------------------------------------ */

const raw = readFileSync(CSV, 'utf8').replace(/^﻿/, '');
const rows = lines(raw).filter((l) => l.trim().length > 0).map(csvRow);
const head = rows[0];
const wi = head.indexOf('단어');
const mi = head.indexOf('뜻');
if (wi < 0 || mi < 0) {
  console.log('');
  console.log(`  ✖ ${CSV} 에 '단어' 또는 '뜻' 칸이 없습니다. 있는 칸 : ${head.join(', ')}`);
  console.log('');
  process.exit(1);
}

const want = new Map();
for (const r of rows.slice(1)) {
  const w = (r[wi] ?? '').trim();
  const m = (r[mi] ?? '').trim();
  if (w && m) want.set(w, m);
}

/* ── 관문 : 줄바꿈 자국이 남아 있으면 아무것도 안 한다 ────────── */

const dirty = [...want].filter(([, m]) => suspects(m).length > 0);
if (dirty.length > 0) {
  console.log('');
  console.log(`  ✖ ${CSV} 에 줄바꿈 자국이 남아 있습니다 — 낱말 ${dirty.length}개.`);
  console.log('');
  console.log('     이대로 넣으면 아이 화면에 「습득하 다」 처럼 뜹니다.');
  console.log('     엑셀에서 고치신 뒤 CSV 를 다시 뽑고 부르세요.');
  console.log('');
  console.log('     무엇이 걸렸는지 :');
  console.log(`         node scripts/check-meanings.mjs ${CSV}`);
  console.log('');
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* 지금 앱에 들어 있는 것                                               */
/* ------------------------------------------------------------------ */

/** 낱말 -> { file, senses: [{ line, meaning }] } */
const app = new Map();
const files = readdirSync(LEVEL_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
for (const f of files) {
  const ls = lines(readFileSync(`${LEVEL_DIR}/${f}`, 'utf8'));
  let cur = null;
  for (let i = 0; i < ls.length; i++) {
    const w = ls[i].match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)', p: '/);
    if (w) {
      cur = { word: unq(w[1]), file: f, senses: [] };
      app.set(cur.word, cur);
      continue;
    }
    const m = ls[i].match(/^ {4}\{ m: '((?:[^'\\]|\\.)*)'/);
    if (m && cur) cur.senses.push({ line: i, meaning: unq(m[1]) });
  }
}

/* ------------------------------------------------------------------ */
/* 무엇을 바꿀지 가른다                                                 */
/* ------------------------------------------------------------------ */

const change = []; // 바꿀 것
const same = []; // 이미 같은 것
const skipMulti = []; // 뜻이 여럿이라 넘긴 것
const skipSemi = []; // 표 쪽에 갈래가 있어 넘긴 것
const notInApp = []; // 앱에 없는 낱말
const trimmed = []; // 뜻이 길어 앞 몇 개만 남긴 것

/**
 * 뜻이 길면 앞 KEEP 개만 남긴다.
 *
 * 괄호 안의 쉼표는 세지 않는다 — `(가스, 수도, 전기 등의) 공익 사업` 은
 * 뜻 하나다. 괄호를 무시하고 자르면 여는 괄호만 남아 문장이 깨진다.
 */
function trim(mean) {
  if (KEEP <= 0) return mean;
  const pieces = [];
  let depth = 0;
  let cur = '';
  for (const ch of mean) {
    if (ch === '(' || ch === '[') depth++;
    else if (ch === ')' || ch === ']') depth--;
    if (ch === ',' && depth === 0) {
      pieces.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) pieces.push(cur.trim());
  return pieces.length <= KEEP ? mean : pieces.slice(0, KEEP).join(', ');
}

for (const [word, raw] of want) {
  const a = app.get(word);
  if (!a) {
    notInApp.push(word);
    continue;
  }
  if (a.senses.length !== 1) {
    skipMulti.push({ word, from: a.senses.map((s) => s.meaning).join(' ; '), to: raw });
    continue;
  }
  if (raw.includes(';')) {
    skipSemi.push({ word, from: a.senses[0].meaning, to: raw });
    continue;
  }
  const mean = trim(raw);
  if (a.senses[0].meaning === mean) {
    same.push(word);
    continue;
  }
  const row = { word, file: a.file, line: a.senses[0].line, from: a.senses[0].meaning, to: mean };
  change.push(row);
  if (mean !== raw) trimmed.push({ ...row, raw });
}

/* ------------------------------------------------------------------ */

console.log('');
console.log('  표의 뜻을 앱에 갈아 끼웁니다 ' + '─'.repeat(28));
console.log('');
console.log(`  표에서 읽은 낱말     ${want.size}개`);
console.log(`  앱에 있는 낱말       ${want.size - notInApp.length}개`);
console.log('');
console.log(`  바꿀 것              ${change.length}개`);
console.log(`  이미 같은 것         ${same.length}개`);
console.log(`  뜻이 여럿이라 넘김   ${skipMulti.length}개`);
console.log(`  표에 갈래가 있어 넘김 ${skipSemi.length}개`);
console.log(`  앱에 없는 낱말       ${notInApp.length}개  (여기서는 안 더합니다)`);
console.log('');

for (const r of change) {
  console.log(`  ${r.word}  [${r.file.replace(/\.ts$/, '')}]`);
  console.log(`      ${r.from}`);
  console.log(`      → ${r.to}`);
}
console.log('');

if (trimmed.length > 0) {
  console.log(`  ✂️  뜻이 길어 앞 ${KEEP}개만 남긴 것 ${trimmed.length}개`);
  console.log('      뜻 하나를 그대로 4지선다 보기로 쓰는 자리가 있어서입니다.');
  console.log('      잘라 낸 뜻은 표에 그대로 있습니다. 안 자르시려면 --keep=0');
  console.log('');
  for (const r of trimmed) {
    console.log(`      ${r.word}`);
    console.log(`          표    ${r.raw}`);
    console.log(`          넣을 것 ${r.to}`);
  }
  console.log('');
}

if (skipMulti.length > 0) {
  console.log(`  ℹ️  뜻이 여럿인 낱말 ${skipMulti.length}개 — 손으로 정하셔야 합니다`);
  console.log('      예문이 뜻에 딸려 있어, 기계가 짝지으면 예문과 어긋납니다.');
  for (const r of skipMulti) {
    console.log(`      ${r.word}`);
    console.log(`          앱  ${r.from}`);
    console.log(`          표  ${r.to}`);
  }
  console.log('');
}

if (skipSemi.length > 0) {
  console.log(`  ℹ️  표 쪽 뜻이 ';' 로 갈린 낱말 ${skipSemi.length}개 — 손으로 정하셔야 합니다`);
  for (const r of skipSemi) {
    console.log(`      ${r.word}`);
    console.log(`          앱  ${r.from}`);
    console.log(`          표  ${r.to}`);
  }
  console.log('');
}

if (!WRITE) {
  console.log('  ' + '─'.repeat(58));
  console.log('  아직 아무것도 안 바꿨습니다. 위가 맞으면 이렇게 부르세요 :');
  console.log('');
  console.log(`      node scripts/apply-meanings.mjs ${CSV} --write`);
  console.log('');
  process.exit(0);
}

/* ── 실제로 바꾼다 ────────────────────────────────────────── */

const byFile = new Map();
for (const r of change) byFile.set(r.file, [...(byFile.get(r.file) ?? []), r]);

let done = 0;
for (const [f, rowsInFile] of byFile) {
  const path = `${LEVEL_DIR}/${f}`;
  const src = readFileSync(path, 'utf8');
  const eol = src.includes('\r\n') ? '\r\n' : '\n';
  const ls = lines(src);
  for (const r of rowsInFile) {
    // 줄 번호로 집되, 그 줄이 정말 그 뜻인지 다시 본다. 파일이 그 사이에
    // 바뀌었으면 엉뚱한 줄을 고치게 된다.
    const cur = ls[r.line].match(/^ {4}\{ m: '((?:[^'\\]|\\.)*)'/);
    if (!cur || unq(cur[1]) !== r.from) {
      console.log(`  ⚠️  ${r.word} — 줄이 달라졌습니다. 건너뜁니다.`);
      continue;
    }
    ls[r.line] = ls[r.line].replace(/^( {4}\{ m: ')(?:[^'\\]|\\.)*(')/, `$1${q(r.to)}$2`);
    done++;
  }
  writeFileSync(path, ls.join(eol), 'utf8');
}

console.log('  ' + '─'.repeat(58));
console.log(`  뜻 ${done}개를 바꿨습니다.`);
console.log('');
console.log('  이어서 :');
console.log('      npm test                  규칙이 아직 맞는지');
console.log('      npm run export            표를 다시 뽑아 확인');
console.log('');
