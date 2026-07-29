#!/usr/bin/env node
/**
 * 뜻·품사가 사전과 맞는지 대조한다.
 *
 *   node scripts/fetch-reference.mjs reference.json    # 한 번 만들어 두고
 *   node scripts/verify-meaning.mjs reference.json     # 전체
 *   node scripts/verify-meaning.mjs reference.json m1-1 # 한 레벨만
 *
 * audit.mjs 는 **모양**을 본다 — 철자, 마침표, 한글 유무. 여기서는 **내용**을
 * 본다. 철자가 멀쩡한데 뜻이 틀린 단어는 audit 을 그냥 통과한다. 그게 제일
 * 위험하다. 아이는 그 뜻이 맞다고 믿고 외우기 때문이다.
 *
 * 한국어 뜻을 기계가 영어 뜻풀이와 직접 맞대 볼 수는 없다. 대신 **유의어**를
 * 지렛대로 쓴다. 우리 데이터는 뜻마다 영어 유의어를 달아 두었고, 위키낱말사전도
 * 뜻마다 유의어를 단다. 둘이 한 군데도 겹치지 않으면 둘 중 하나가 틀렸다는
 * 뜻이므로 사람이 볼 목록에 올린다.
 *
 * **자동으로 고치지 않는다.** 사전과 다르다고 다 틀린 것이 아니다 —
 * 위키낱말사전에 유의어가 아예 없는 낱말이 많고, 중학생용으로 일부러 쉬운
 * 말을 골라 둔 자리도 있다. 판단은 사람이 한다.
 */

import { readFileSync, existsSync } from 'node:fs';
import { readEntries } from './lib/levels.mjs';

const refPath = process.argv[2];
const onlyLevel = process.argv[3];

if (!refPath || !existsSync(refPath)) {
  console.error('사용법: node scripts/verify-meaning.mjs <참고자료.json> [레벨]');
  console.error('  먼저: node scripts/fetch-reference.mjs 참고자료.json');
  process.exit(1);
}

const REF = JSON.parse(readFileSync(refPath, 'utf8')).words;

/* ---------- 품사 표기 맞추기 ---------- */

/** 우리 약어 → 위키낱말사전의 품사 이름들. */
const POS_MAP = {
  'n.': ['noun', 'name'],
  'v.': ['verb'],
  // 학교문법은 this·every·both 를 형용사로 가르치고 위키낱말사전은
  // det/pron 으로 가른다. 우리 데이터는 학교문법을 따르므로 둘 다 인정한다.
  'adj.': ['adj', 'det', 'pron'],
  'adv.': ['adv', 'particle', 'postp'],
  'prep.': ['prep', 'postp'],
  'conj.': ['conj'],
  'pron.': ['pron'],
  'art.': ['article', 'det'],
  'num.': ['num'],
  'int.': ['intj'],
  'aux.': ['verb'],
  // 숙어는 위키낱말사전이 무엇으로든 부를 수 있다. 'in front of' 는 prep,
  // 'as soon as' 는 conj 다. 숙어의 품사는 우리가 'phr.' 하나로 뭉뚱그린
  // 것이므로 사전 쪽 품사로 시비를 걸 자리가 아니다.
  'phr.': null,
};

function ourPosParts(pos) {
  return pos.split(',').map((p) => p.trim()).filter(Boolean);
}

/* ---------- 낱말 다듬기 ---------- */

function norm(s) {
  return s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
}

/**
 * 한국어 뜻을 비교용 열쇠로 다듬는다.
 *
 * 같은 말을 우리와 위키낱말사전이 다르게 적는다. 우리는 뜻풀이로 적고
 * ('아름다운', '~할 수 있다') 사전은 기본형으로 적는다 ('아름답다',
 * '-을 수 있다'). 앞의 `~ - . …` 와 괄호 부연을 떼고, 뒤의 활용 어미를 뗀다.
 */
function koStem(s) {
  return s
    .replace(/\([^)]*\)/g, '')
    .replace(/[~\-.…\[\]{}"'’]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/(하다|되다|시키다|스럽다|롭다|같다|없다|있다|지다|다)$/, '')
    .replace(/(하는|되는|하여|해서|한|인|운|는|은|을|를|이|가|의|에|로|와|과)$/, '')
    .trim();
}

/**
 * 두 뜻이 같은 말인가.
 *
 * 한쪽이 다른 쪽을 품으면 같은 말로 본다 ('되' ⊂ '이 되'). 그것도 아니면
 * 앞 두 음절이 같은지 본다 — '아름다운'과 '아름답다'는 어미만 다르고
 * 앞은 같다. 한 음절짜리는 우연히 겹치기 쉬우므로 이 규칙에서 뺀다.
 */
function koSame(a, b) {
  if (!a || !b) return false;
  if (a === b || a.includes(b) || b.includes(a)) return true;
  const ha = a.replace(/[^가-힣]/g, '');
  const hb = b.replace(/[^가-힣]/g, '');
  return ha.length >= 2 && hb.length >= 2 && ha.slice(0, 2) === hb.slice(0, 2);
}

/* ---------- 검사 ---------- */

const entries = readEntries().filter((e) => !onlyLevel || e.level === onlyLevel);
if (entries.length === 0) {
  console.error(`레벨 '${onlyLevel}' 에 표제어가 없습니다.`);
  process.exit(1);
}

const found = { unknown: [], pos: [], meaning: [], exWord: [] };

for (const e of entries) {
  const at = `${e.level}:${e.line} ${e.word}`;
  const ref = REF[e.word.toLowerCase()];

  /* 1. 사전에 아예 없는 표제어 */
  if (!ref) {
    found.unknown.push(`${at} — 위키낱말사전에 표제어가 없음 (품사 '${e.pos}')`);
    continue;
  }

  const refPos = new Set(ref.map((r) => r.pos));

  /* 2. 우리가 적은 품사가 사전에 없음 */
  for (const p of ourPosParts(e.pos)) {
    const want = POS_MAP[p];
    if (want === undefined) continue; // 모르는 약어는 audit.mjs 가 잡는다
    if (want === null) continue; // 사전과 견줄 수 없는 품사
    if (!want.some((w) => refPos.has(w))) {
      found.pos.push(`${at} — '${p}' 인데 사전에는 [${[...refPos].join(', ')}] 뿐`);
    }
  }

  /* 3. 우리 뜻이 사전의 한국어 번역과 한 군데도 안 맞음 */

  const refKo = new Set();
  for (const r of ref) {
    for (const k of r.ko) refKo.add(k);
    for (const sn of r.senses) for (const k of sn.ko) refKo.add(k);
  }

  // 번역이 아예 없는 낱말이 많다. 없으면 할 말이 없으니 넘어간다.
  if (refKo.size > 0) {
    const stems = [...refKo].map(koStem).filter(Boolean);
    const ours = e.senses.flatMap((s) =>
      s.meaning.split(/[,;·]/).map(koStem).filter(Boolean),
    );

    // 뜻 하나하나가 아니라 낱말 단위로 본다. 위키낱말사전은 번역을 뜻마다
    // 고르게 달아 두지 않는다 — pool 에는 '포켓볼' 만, overall 에는 '멜빵바지'
    // 만 있는 식이다. 그래서 뜻 단위로 따지면 멀쩡한 자리가 무더기로 걸린다.
    // 하나도 안 맞을 때만, 즉 낱말을 통째로 잘못 봤을 때만 올린다.
    if (ours.length > 0 && !ours.some((o) => stems.some((r) => koSame(o, r)))) {
      found.meaning.push(
        `${at} — 우리 뜻 [${e.senses.map((s) => s.meaning).join(' / ')}] / 사전은 [${[...refKo].slice(0, 8).join(', ')}]`,
      );
    }
  }

  /* 4. 예문에 표제어가 안 나옴 */
  const forms = new Set([e.word.toLowerCase(), ...ref.flatMap((r) => r.forms).map((f) => f.toLowerCase())]);
  for (const s of e.senses) {
    for (const ex of s.examples) {
      const hay = ` ${norm(ex.en)} `;
      const hit = [...forms].some((f) => {
        const k = norm(f);
        return k && hay.includes(` ${k} `);
      });
      if (!hit) {
        found.exWord.push(`${e.level}:${ex.line} ${e.word} — 예문에 표제어가 안 보임: "${ex.en}"`);
      }
    }
  }
}

/* ---------- 보고 ---------- */

const scope = onlyLevel ? `레벨 ${onlyLevel}` : '전체';
console.log(`\n뜻·품사 사전 대조 — ${scope} · 표제어 ${entries.length}\n`);

const sections = [
  ['사전에 없는 표제어', found.unknown],
  ['품사', found.pos],
  ['뜻', found.meaning],
  ['예문에 표제어 없음', found.exWord],
];

let total = 0;
for (const [title, list] of sections) {
  const uniq = [...new Set(list)];
  total += uniq.length;
  console.log(`${uniq.length === 0 ? '✅' : '⚠️ '} ${title}: ${uniq.length}건`);
  for (const line of uniq.slice(0, 60)) console.log(`     ${line}`);
  if (uniq.length > 60) console.log(`     … 그 밖에 ${uniq.length - 60}건`);
  console.log('');
}

console.log(`합계 ${total}건 — 전부 '사람이 봐야 할 것'이지 '틀린 것'이 아닙니다.`);
