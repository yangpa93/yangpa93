#!/usr/bin/env node
/**
 * 낱말을 **다른 레벨로 옮긴다.**
 *
 *     node scripts/move-level.mjs realm=m3 wetland=m3 attachment=m2
 *     node scripts/move-level.mjs realm=m3-2            (레벨을 콕 집어서)
 *
 * ── 왜 도구가 필요한가 ──────────────────────────────────────
 *
 * 낱말 하나가 **세 곳**에 걸쳐 있다.
 *
 *   data/placement.json   자리를 못박아 둔 곳. 여기가 진짜 주인이다.
 *   src/data/plan.ts      placement 에서 만들어진다.
 *   src/data/levels/*.ts  뜻과 예문. 레벨마다 파일이 다르다.
 *
 * placement 만 고치면 뜻이 옛 레벨 파일에 남아 시험이 잡는다. 레벨 파일만
 * 옮기면 배치표가 딴 데를 가리킨다. 손으로 하면 반드시 한 곳을 빠뜨린다.
 *
 * ── 학년만 적으면 그 학년에서 가장 홀쭉한 레벨로 ─────────────
 *
 * `realm=m3` 처럼 학년만 주면 m3-1 … m3-4 중 가장 홀쭉한 곳으로 보낸다.
 * build-plan.mjs 가 새 낱말을 놓는 규칙과 같다 — 레벨끼리 크기가 벌어지지
 * 않게 하려는 것이다.
 *
 * ── 진도가 한 번 흔들린다 ───────────────────────────────────
 *
 * 옮긴 낱말은 **아이가 이미 끝낸 레벨에서 사라지거나, 안 배운 레벨에 새로
 * 생긴다.** 그래서 아무 때나 할 일은 아니다. 넣은 지 얼마 안 된 낱말을
 * 제자리로 돌려놓는 정도가 알맞다.
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';

const PLACEMENT = 'data/placement.json';
const LEVEL_DIR = 'src/data/levels';
const WRITE = process.argv.includes('--write');

const lines = (s) => s.split(/\r?\n/);
const unq = (s) => s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');

const asks = process.argv.slice(2).filter((a) => !a.startsWith('--'));
if (asks.length === 0) {
  console.log('');
  console.log('  사용법 : node scripts/move-level.mjs <낱말>=<레벨 또는 학년> …');
  console.log('           node scripts/move-level.mjs realm=m3 attachment=m2');
  console.log('');
  process.exit(1);
}

const place = JSON.parse(readFileSync(PLACEMENT, 'utf8'));
const levels = Object.keys(place);

/** 낱말이 지금 어느 레벨에 있나. */
const now = new Map();
for (const [level, words] of Object.entries(place)) {
  for (const w of words) now.set(w, level);
}

/** 그 학년에서 가장 홀쭉한 레벨. 같으면 앞엣것. */
function thinnest(grade) {
  const same = levels.filter((l) => l.startsWith(`${grade}-`));
  if (same.length === 0) return null;
  return same.reduce((a, b) => (place[b].length < place[a].length ? b : a));
}

/* ── 어디로 갈지 정한다 ───────────────────────────────────── */

const moves = [];
for (const ask of asks) {
  const [word, want] = ask.split('=');
  if (!word || !want) {
    console.log(`  ✖ '${ask}' 를 못 읽었습니다. <낱말>=<레벨> 꼴로 적어 주세요.`);
    process.exit(1);
  }
  const from = now.get(word);
  if (!from) {
    console.log(`  ✖ '${word}' 가 배치표에 없습니다.`);
    process.exit(1);
  }
  const to = want.includes('-') ? want : thinnest(want);
  if (!to || !levels.includes(to)) {
    console.log(`  ✖ '${want}' 라는 레벨이 없습니다.`);
    process.exit(1);
  }
  if (from === to) {
    console.log(`  · ${word} 는 이미 ${to} 에 있습니다. 건너뜁니다.`);
    continue;
  }
  moves.push({ word, from, to });
  // 다음 낱말이 같은 학년으로 갈 때 이 자리를 셈에 넣도록 미리 옮겨 둔다.
  place[from] = place[from].filter((w) => w !== word);
  place[to].push(word);
  now.set(word, to);
}

if (moves.length === 0) {
  console.log('  옮길 것이 없습니다.');
  process.exit(0);
}

/* ── 레벨 파일에서 덩어리를 떼어 낸다 ────────────────────────── */

/**
 * 낱말 하나의 덩어리를 통째로 잘라 낸다. apply-english.mjs 와 같은 방식으로
 * 중괄호를 세어 끝을 찾는다 — 예문 안에 대괄호가 들어 있어서, 줄 모양만
 * 보고 자르면 엉뚱한 데서 끊긴다.
 */
function cut(src, words) {
  const ls = lines(src);
  const out = [];
  const got = new Map();
  for (let i = 0; i < ls.length; i++) {
    const m = ls[i].match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)',/);
    if (!m || !words.has(unq(m[1]))) {
      out.push(ls[i]);
      continue;
    }
    let depth = 0;
    let j = i;
    for (; j < ls.length; j++) {
      for (const ch of ls[j]) {
        if (ch === '{') depth++;
        else if (ch === '}') depth--;
      }
      if (depth <= 0) break;
    }
    got.set(unq(m[1]), ls.slice(i, j + 1));
    i = j;
  }
  return { text: out.join('\n'), got };
}

/** 알파벳 자리에 끼워 넣는다. add-entries.mjs 와 같은 규칙. */
function insert(src, word, block) {
  const ls = lines(src);
  let at = -1;
  for (let i = 0; i < ls.length; i++) {
    const m = ls[i].match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)',/);
    if (m && unq(m[1]).localeCompare(word) > 0) {
      at = i;
      break;
    }
  }
  if (at < 0) {
    /*
     * 알파벳으로 맨 뒤인 낱말. 목록을 닫는 줄 **앞**에 넣는다.
     *
     * 닫는 모양이 파일마다 다르다 — `]);` 인 곳도 있고 `], 'curriculum');`
     * 인 곳도 있다. `]);` 만 찾다가 못 찾아 `at` 이 -1 로 남았고, splice(-1)
     * 이 **목록 밖**에 끼워 넣어 파일이 깨졌다. 줄 첫 칸의 `]` 로 찾는다 —
     * 항목은 `  ]},` 처럼 들여쓰기가 있어 걸리지 않는다.
     */
    for (let i = ls.length - 1; i >= 0; i--) {
      if (ls[i].startsWith(']')) {
        at = i;
        break;
      }
    }
  }
  if (at < 0) throw new Error('목록을 닫는 줄을 못 찾았습니다');
  ls.splice(at, 0, ...block);
  return ls.join('\n');
}

console.log('');
console.log('  낱말을 다른 레벨로 옮깁니다 ' + '─'.repeat(30));
console.log('');
for (const m of moves) console.log(`  ${m.word.padEnd(18)} ${m.from} → ${m.to}`);
console.log('');

if (!WRITE) {
  console.log('  ' + '─'.repeat(58));
  console.log('  아직 아무것도 안 옮겼습니다. 위가 맞으면 --write 를 붙이세요.');
  console.log('');
  process.exit(0);
}

/* 떼어 내기 */
const byWord = new Map();
const files = readdirSync(LEVEL_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
const want = new Set(moves.map((m) => m.word));
const text = new Map();
for (const f of files) {
  const { text: t, got } = cut(readFileSync(`${LEVEL_DIR}/${f}`, 'utf8'), want);
  text.set(f, t);
  for (const [w, block] of got) byWord.set(w, block);
}

/* 새 자리에 넣기 */
for (const m of moves) {
  const block = byWord.get(m.word);
  if (!block) {
    console.log(`  ⚠️  ${m.word} 의 뜻·예문을 못 찾았습니다. 배치표만 옮깁니다.`);
    continue;
  }
  const f = `${m.to}.ts`;
  text.set(f, insert(text.get(f), m.word, block));
}

for (const [f, t] of text) writeFileSync(`${LEVEL_DIR}/${f}`, t, 'utf8');

/* 자리를 다시 적는다. 레벨 안에서는 알파벳 순으로 둔다. */
for (const l of levels) place[l] = [...place[l]].sort((a, b) => a.localeCompare(b));
writeFileSync(PLACEMENT, JSON.stringify(place, null, 1) + '\n', 'utf8');

console.log('  ' + '─'.repeat(58));
console.log(`  ${moves.length}개를 옮겼습니다.`);
console.log('');
console.log('  이어서 :');
console.log('      node scripts/build-plan.mjs > src/data/plan.ts');
console.log('      npm test');
console.log('');
