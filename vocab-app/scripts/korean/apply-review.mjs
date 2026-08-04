#!/usr/bin/env node
/**
 * 손봐 주신 `review/국어-어휘.csv` 를 소스에 되돌려 넣는다.
 *
 *     npm run apply-korean            무엇이 바뀌는지 보여만 준다
 *     npm run apply-korean -- --write  실제로 적는다
 *
 * ── 왜 이 도구가 필요한가 ───────────────────────────────────
 *
 * 어휘를 확인하는 길은 이미 있었다 — `npm run export` 로 표를 뽑아 엑셀에서
 * 본다. 그런데 **보고 고친 것을 되돌려 넣을 길이 없었다.** 표에 아무리
 * 정성껏 적어도 그 표는 만들어진 것이라, 다음에 `npm run export` 를 부르면
 * 통째로 덮어써진다. 고친 것이 사라진다.
 *
 * 레벨 파일(src/data/korean/levels/*.ts)에 직접 적는 것도 안 된다. 그것도
 * `build-levels.mjs` 가 만드는 것이라 다음 빌드에 날아간다.
 *
 * 그래서 고친 것을 **korean/corrections.json** 에 적는다. 엑셀 원본은 그대로
 * 두고 교정만 따로 쌓는 자리다. 무엇이 원본이고 무엇이 우리가 고친 것인지
 * diff 로 보이고, 빌드를 몇 번 다시 해도 살아남는다.
 *
 * ── 무엇을 받아 적나 ────────────────────────────────────────
 *
 *   한자      다르면 corrections.idiom.hanja 에
 *   뜻        다르면 corrections.idiom.meaning 에
 *   예문      다르면 corrections.idiom.example 에
 *   한자 확인 '확인' 으로 바뀌었으면 unverified 목록에서 뺀다
 *   없어진 것 corrections.idiom.drop 에
 *
 * **새로 생긴 표제어는 자동으로 안 넣는다.** 표에 없던 말이 생겼다는 것은
 * 갈아 끼운 것일 수도(파안미소 → 파안대소) 더한 것일 수도 있는데, 어느
 * 쪽인지는 사람만 안다. 짐작해서 넣으면 엉뚱한 말을 지운다. 화면에 적어
 * 두고 사람이 rename 에 한 줄 적게 한다.
 *
 * 사자성어만 다룬다. 개념어·고전·수능은 사전에서 받아 온 것이라 표에서
 * 고칠 일이 거의 없고, 고친다면 그쪽은 원본 자체를 손봐야 한다.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const CSV = 'review/국어-어휘.csv';
const CORR = 'korean/corrections.json';
const KO_DIR = 'src/data/korean/levels';
const WRITE = process.argv.includes('--write');

/* ------------------------------------------------------------------ */
/* 지금 앱에 들어 있는 것                                               */
/* ------------------------------------------------------------------ */

const lines = (s) => s.split(/\r?\n/);
const unq = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');

/** 레벨 파일에서 사자성어만 읽는다. export-review.mjs 와 같은 방식이다. */
function currentIdioms() {
  const out = new Map();
  for (const file of readdirSync(KO_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts')) {
    const src = readFileSync(`${KO_DIR}/${file}`, 'utf8');
    let category = '';
    let cur = null;
    for (const line of lines(src)) {
      const cat = line.match(/defineKoLevel\('[^']+', '([a-z]+)'/);
      if (cat) {
        category = cat[1];
        cur = null;
        continue;
      }
      const w = line.match(/^\s*\{ w: '((?:[^'\\]|\\.)*)',(.*), e: \[/);
      if (w) {
        if (category !== 'idiom') {
          cur = null;
          continue;
        }
        const rest = w[2];
        const f = (name) => {
          const m = rest.match(new RegExp(`${name}: '((?:[^'\\\\]|\\\\.)*)'`));
          return m ? unq(m[1]) : '';
        };
        cur = {
          word: unq(w[1]),
          hanja: f('h'),
          verified: !/\bv: false\b/.test(rest),
          meaning: f('m'),
          examples: [],
        };
        out.set(cur.word, cur);
        continue;
      }
      const ex = line.match(/^\s*\{ t: '((?:[^'\\]|\\.)*)'/);
      if (ex && cur) cur.examples.push(unq(ex[1]));
    }
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* 손봐 주신 표                                                         */
/* ------------------------------------------------------------------ */

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

function reviewedIdioms() {
  const raw = readFileSync(CSV, 'utf8').replace(/^﻿/, '');
  const all = lines(raw).filter((l) => l.trim().length > 0);
  const head = csvRow(all[0]);
  const at = (name) => head.indexOf(name);

  /*
   * 여러 줄로 이어진 칸을 다시 붙인다. 예문에 줄바꿈이 들어 있으면 엑셀이
   * 따옴표로 묶어 여러 줄에 걸쳐 적는다. 칸 수가 모자라면 다음 줄을 붙인다.
   */
  const rows = [];
  let buf = '';
  for (const line of all.slice(1)) {
    buf = buf ? `${buf}\n${line}` : line;
    const cells = csvRow(buf);
    if (cells.length >= head.length) {
      rows.push(cells);
      buf = '';
    }
  }

  const out = new Map();
  for (const cells of rows) {
    if (cells[at('갈래')] !== '사자성어') continue;
    const word = cells[at('표제어')].trim();
    if (!word) continue;
    const got = out.get(word) ?? {
      word,
      hanja: cells[at('한자')].trim(),
      verified: cells[at('한자 확인')].trim() === '확인',
      meaning: cells[at('뜻')].trim(),
      examples: [],
    };
    const ex = cells[at('예문')].trim();
    if (ex) got.examples.push(ex);
    out.set(word, got);
  }
  return out;
}

/* ------------------------------------------------------------------ */

const now = currentIdioms();
const want = reviewedIdioms();

if (want.size === 0) {
  console.log('');
  console.log(`  ✖ ${CSV} 에서 사자성어를 하나도 못 읽었습니다.`);
  console.log('    먼저 npm run export 로 표를 뽑으신 뒤 고쳐 주세요.');
  console.log('');
  process.exit(1);
}

const corr = JSON.parse(readFileSync(CORR, 'utf8'));
const idiom = corr.idiom;
idiom.meaning ??= { _설명: 'review/국어-어휘.csv 에서 다듬은 뜻풀이' };
idiom.example ??= { _설명: 'review/국어-어휘.csv 에서 바꾼 예문' };
idiom.drop ??= { _설명: '빼는 것' };

const changes = { hanja: [], meaning: [], example: [], verified: [], drop: [] };
const added = [];
/** 표에는 있는데 앱이 담을 자리가 없는 예문. 조용히 버리지 않으려고 모은다. */
const extraExamples = [];

for (const [word, a] of want) {
  const b = now.get(word);
  if (!b) {
    added.push(a);
    continue;
  }
  if (a.hanja && a.hanja !== b.hanja) {
    idiom.hanja[word] = a.hanja;
    changes.hanja.push(`${word} ${b.hanja} → ${a.hanja}`);
  }
  if (a.meaning && a.meaning !== b.meaning) {
    idiom.meaning[word] = a.meaning;
    changes.meaning.push(word);
  }
  // 예문은 첫 줄만 본다. 원본이 사자성어마다 예문 하나씩만 갖고 있다.
  if (a.examples[0] && b.examples[0] && a.examples[0] !== b.examples[0]) {
    idiom.example[word] = a.examples[0];
    changes.example.push(word);
  }
  /*
   * 표에 예문이 더 있으면 **말은 한다.** 지금은 사자성어마다 하나만 담을 수
   * 있어 자동으로 못 받는데, 조용히 넘기면 정성껏 적어 주신 것이 사라진다.
   */
  if (a.examples.length > b.examples.length) {
    extraExamples.push({ word, extra: a.examples.slice(b.examples.length) });
  }
  if (a.verified && !b.verified) changes.verified.push(word);
}

/* 표에서 사라진 것 = 빼기로 하신 것 */
for (const [word] of now) {
  if (want.has(word)) continue;
  /*
   * **갈아 끼우기로 적어 둔 말은 빼지 않는다.**
   *
   * build-levels 는 drop 을 rename 보다 먼저 본다. 둘 다 적혀 있으면 바꿔
   * 끼우기 전에 지워 버려서, 새 말이 영영 안 들어온다. 실제로 파안미소 →
   * 파안대소 에서 그럴 뻔했다.
   */
  if (idiom.rename?.[word]) continue;
  if (!idiom.drop[word]) {
    idiom.drop[word] = 'review/국어-어휘.csv 에서 빼기로 하셨습니다 (잘 안 쓰는 말)';
  }
  changes.drop.push(word);
}

/*
 * **갈아 끼운 말은 새 이름으로 받아 적는다.**
 *
 * 파안미소 → 파안대소 처럼 이름이 바뀌면, 표에는 새 이름만 있고 옛 이름은
 * 없다. 그래서 위 짝짓기에 안 걸린다. build-levels 는 이름을 바꾼 **뒤에**
 * 뜻과 예문을 보므로 새 이름으로 적어 두어야 먹는다. 옛 이름은 한자를
 * 확인 못 한 목록에서도 빠져야 한다 — 확인한 것은 새 이름 쪽이다.
 */
const renamedVerified = [];
for (const [oldWord, ren] of Object.entries(idiom.rename ?? {})) {
  if (oldWord.startsWith('_')) continue;
  const a = want.get(ren.word);
  if (!a) continue;
  if (a.meaning) idiom.meaning[ren.word] = a.meaning;
  if (a.examples[0]) idiom.example[ren.word] = a.examples[0];
  if (a.verified) renamedVerified.push(oldWord);
  added.splice(
    added.findIndex((x) => x.word === ren.word),
    1,
  );
  changes.meaning.push(`${oldWord} → ${ren.word}`);
}

/* 확인된 것은 unverified 목록에서 뺀다 */
const before = idiom.unverified?.['목록'] ?? [];
const stillUnverified = before.filter(
  (w) =>
    !changes.verified.includes(w) && !changes.drop.includes(w) && !renamedVerified.includes(w),
);
if (idiom.unverified) idiom.unverified['목록'] = stillUnverified;

/* ------------------------------------------------------------------ */

console.log('');
console.log('  손봐 주신 것을 소스에 되돌려 넣습니다 ' + '─'.repeat(22));
console.log('');
console.log(`  표에서 읽은 사자성어  ${want.size}개`);
console.log(`  앱에 들어 있는 것     ${now.size}개`);
console.log('');

const show = (label, list) => {
  if (list.length === 0) return;
  console.log(`  ${label} ${list.length}개`);
  for (const x of list) console.log(`      ${x}`);
  console.log('');
};
show('한자 고침', changes.hanja);
show('뜻 다듬음', changes.meaning);
show('예문 바꿈', changes.example);
show('한자 확인됨 (한자 문제를 낼 수 있게 됨)', changes.verified);
show('뺌', changes.drop);

console.log(`  아직 한자를 확인 못 한 것  ${stillUnverified.length}개`);
if (stillUnverified.length > 0) console.log(`      ${stillUnverified.join(', ')}`);
console.log('');

/*
 * **새로 생긴 표제어는 자동으로 안 넣는다.**
 *
 * 갈아 끼운 것인지 더한 것인지는 사람만 안다. 짐작해서 넣으면 엉뚱한 말을
 * 지우게 된다. 무엇을 적어야 하는지까지 화면에 찍어 두고 손으로 한 줄 넣게 한다.
 */
if (extraExamples.length > 0) {
  console.log('  ⚠️  표에 예문이 더 적혀 있는 말 — 지금은 하나만 담을 수 있습니다');
  console.log('');
  for (const e of extraExamples) {
    console.log(`      ${e.word}`);
    for (const x of e.extra) console.log(`        ${x}`);
  }
  console.log('');
  console.log('      같은 말이 두 레벨에 겹쳐 있어서 그럴 수 있습니다.');
  console.log('      그 예문을 살리시려면 알려 주세요.');
  console.log('');
}

if (added.length > 0) {
  console.log('  ⚠️  표에는 있는데 앱에는 없는 말 ' + added.length + '개 — 손으로 넣으셔야 합니다');
  console.log('');
  for (const a of added) {
    console.log(`      ${a.word} ${a.hanja}`);
    console.log(`        뜻   ${a.meaning}`);
    console.log(`        예문 ${a.examples[0] ?? ''}`);
    console.log('');
    console.log(`      갈아 끼운 것이면 korean/corrections.json 의 idiom.rename 에 :`);
    console.log(`        "빼려는말": { "word": "${a.word}", "hanja": "${a.hanja}", "why": "…" }`);
    console.log('');
  }
}

if (!WRITE) {
  console.log('  ' + '─'.repeat(58));
  console.log('  아직 아무것도 안 적었습니다. 위가 맞으면 이렇게 부르세요 :');
  console.log('');
  console.log('      npm run apply-korean -- --write');
  console.log('');
  process.exit(0);
}

writeFileSync(CORR, JSON.stringify(corr, null, 2) + '\n', 'utf8');
console.log('  ' + '─'.repeat(58));
console.log(`  ${CORR} 에 적었습니다.`);
console.log('');
console.log('  이제 레벨 파일을 다시 만드세요 :');
console.log('');
console.log('      node scripts/korean/build-levels.mjs');
console.log('      npm run export        (표가 손보신 것과 같아지는지 확인)');
console.log('');
