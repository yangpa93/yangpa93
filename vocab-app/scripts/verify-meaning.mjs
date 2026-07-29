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
  // 위키낱말사전은 yes·nope 를 particle 로 가른다. 학교문법에서는 감탄사다.
  'int.': ['intj', 'particle'],
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
 * 받침을 뗀다. '어둡' → '어두', '파랗' → '파라'.
 *
 * 한국어의 ㅂ·ㅎ 불규칙 때문이다. 우리는 '어두운·파란' 으로 적고 사전은
 * '어둡다·파랗다' 로 적는데, 어간의 받침이 활용에서 사라진다. 받침을 떼고
 * 견주면 '어두'와 '어두', '파라'와 '파라'로 같아진다.
 */
function bare(s) {
  let out = '';
  for (const ch of s) {
    const c = ch.codePointAt(0);
    if (c >= 0xac00 && c <= 0xd7a3) out += String.fromCodePoint(c - ((c - 0xac00) % 28));
    else out += ch;
  }
  return out;
}

/**
 * 두 뜻이 같은 말인가.
 *
 * 한쪽이 다른 쪽을 품으면 같은 말로 본다 ('되' ⊂ '이 되'). 그것도 아니면
 * 받침을 떼고 앞 두 음절을 견준다 — '어두운'과 '어둡다'는 어미만 다르고
 * 어간은 같다. 한 음절짜리는 우연히 겹치기 쉬우므로 이 규칙에서 뺀다.
 */
function koSame(a, b) {
  if (!a || !b) return false;
  if (a === b || a.includes(b) || b.includes(a)) return true;
  const ha = bare(a).replace(/[^가-힣]/g, '');
  const hb = bare(b).replace(/[^가-힣]/g, '');
  if (ha.length < 2 || hb.length < 2) return false;
  return ha.slice(0, 2) === hb.slice(0, 2);
}

/* ---------- 검사 ---------- */

const entries = readEntries().filter((e) => !onlyLevel || e.level === onlyLevel);
if (entries.length === 0) {
  console.error(`레벨 '${onlyLevel}' 에 표제어가 없습니다.`);
  process.exit(1);
}

/**
 * 확신도로 나눈다. 검사 종류로 나누면 무엇부터 봐야 할지 알 수 없다.
 *
 *   sure  ❌ 사전의 어느 뜻과도 겹치지 않는다. 먼저 본다.
 *   maybe ?  자료가 애매하거나 일부만 겹친다.
 *   none     대조할 자료가 없다. 조용히 센다 — 우리 잘못이 아니다.
 */
const found = { sure: [], maybe: [] };
const none = { word: 0, ko: 0 };

for (const e of entries) {
  const at = `${e.level}:${e.line} ${e.word}`;
  const ref = REF[e.word.toLowerCase()];

  /* 1. 사전에 아예 없는 표제어 — 자료가 없는 것이지 틀린 것이 아니다 */
  if (!ref) {
    none.word++;
    continue;
  }

  const refPos = new Set(ref.map((r) => r.pos));

  /* 2. 우리가 적은 품사가 사전에 없음 */
  for (const p of ourPosParts(e.pos)) {
    const want = POS_MAP[p];
    if (want === undefined) continue; // 모르는 약어는 audit.mjs 가 잡는다
    if (want === null) continue; // 사전과 견줄 수 없는 품사
    if (!want.some((w) => refPos.has(w))) {
      // 사전이 그 낱말을 알면서 그 품사를 안 준 것이다. 신호가 세다.
      found.sure.push(`품사 · ${at} — '${p}' 인데 사전에는 [${[...refPos].join(', ')}] 뿐`);
    }
  }

  /* 3. 우리 뜻이 사전의 한국어 번역과 한 군데도 안 맞음 */

  /**
   * 사전 쪽 한국어 번역을 모은다. **우리가 실은 품사에 해당하는 것만** 본다.
   *
   * brush 를 우리는 동사로 실었는데(솔로 닦다) 사전의 명사 번역(솔, 브러시)과
   * 맞대면 어긋난 것처럼 보인다. 품사가 다르면 뜻이 다른 게 당연하다.
   * 해당 품사에 번역이 하나도 없으면 할 말이 없으니 넘어간다.
   */
  const want = new Set(ourPosParts(e.pos).flatMap((p) => POS_MAP[p] ?? []));
  const refKo = new Set();
  for (const r of ref) {
    if (want.size > 0 && !want.has(r.pos)) continue;
    for (const k of r.ko) refKo.add(k);
    for (const sn of r.senses) for (const k of sn.ko) refKo.add(k);
  }

  if (refKo.size === 0) none.ko++;
  if (refKo.size > 0) {
    const stems = [...refKo].map(koStem).filter(Boolean);
    const ours = e.senses.flatMap((s) =>
      s.meaning.split(/[,;·]/).map(koStem).filter(Boolean),
    );

    // 뜻 하나하나가 아니라 낱말 단위로 본다. 위키낱말사전은 번역을 뜻마다
    // 고르게 달아 두지 않는다 — pool 에는 '포켓볼' 만 있는 식이다. 뜻 단위로
    // 따지면 멀쩡한 자리가 무더기로 걸린다. 하나도 안 맞을 때만 올린다.
    if (ours.length > 0 && !ours.some((o) => stems.some((r) => koSame(o, r)))) {
      // 위키낱말사전은 번역을 뜻마다 고르게 달지 않는다. 안 겹친다고
      // 틀린 것이 아니라 사전이 그 뜻을 안 담았을 뿐인 경우가 훨씬 많다.
      found.maybe.push(
        `뜻 · ${at} — 우리 [${e.senses.map((s) => s.meaning).join(' / ')}] / 사전 [${[...refKo].slice(0, 8).join(', ')}]`,
      );
    }
  }

  /* 4. 예문에 표제어가 안 나옴 */

  const forms = new Set([e.word.toLowerCase(), ...ref.flatMap((r) => r.forms)]);
  for (const s of e.senses) {
    for (const ex of s.examples) {
      if (!usesWord(ex.en, forms)) {
        found.sure.push(`예문 · ${e.level}:${ex.line} ${e.word} — 표제어가 안 보임: "${ex.en}"`);
      }
    }
  }
}

/**
 * 예문이 표제어를 쓰고 있는가.
 *
 * 숙어는 붙어 있지 않다. 'take into account' 는 "Take the weather into
 * account." 로 갈라지고 'wake up' 은 "wake me up" 이 된다. 그러니 통째로
 * 찾으면 안 되고, 낱말이 **순서대로** 나오는지를 본다.
 */
function usesWord(sentence, forms) {
  const words = norm(sentence).split(/\s+/).filter(Boolean);
  for (const form of forms) {
    const want = norm(form).split(/\s+/).filter(Boolean);
    if (want.length === 0) continue;
    let i = 0;
    for (const w of words) if (w === want[i] && ++i === want.length) break;
    if (i === want.length) return true;
  }
  return false;
}

/* ---------- 보고 ---------- */

/**
 * 화면에 다 쏟으면 읽을 수가 없다. 갈래마다 이만큼만 찍는다.
 * 파일로 받아 훑을 때는 `LIMIT=2000 npm run verify:meaning …` 처럼 늘린다.
 */
const LIMIT = Number(process.env.LIMIT ?? 60);

const scope = onlyLevel ? `레벨 ${onlyLevel}` : '전체';
console.log(`\n뜻·품사 사전 대조 — ${scope} · 표제어 ${entries.length}\n`);

const sections = [
  ['❌', '확실한 오류 — 사전이 그 낱말을 아는데 우리와 어긋난다', found.sure],
  ['?', '확인 필요 — 사전 쪽 자료가 성길 수 있다', found.maybe],
];

let total = 0;
for (const [mark, title, list] of sections) {
  const uniq = [...new Set(list)];
  total += uniq.length;
  console.log(`${uniq.length === 0 ? '✅' : mark} ${title}: ${uniq.length}건`);
  for (const line of uniq.slice(0, LIMIT)) console.log(`     ${line}`);
  if (uniq.length > LIMIT) {
    console.log(`     … 그 밖에 ${uniq.length - LIMIT}건 (LIMIT=2000 으로 다 봅니다)`);
  }
  console.log('');
}

console.log(
  `대조할 자료가 없어 넘어간 것 — 표제어가 사전에 없음 ${none.word}개 · ` +
    `그 품사에 한국어 번역이 없음 ${none.ko}개`,
);
console.log(`\n합계 ${total}건. 자동으로 고치지 않았습니다 — 판단은 사람이 합니다.`);
