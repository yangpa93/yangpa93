#!/usr/bin/env node
/**
 * 유의어·반대말·품사를 WordNet으로 대조한다.
 *
 *   node scripts/verify-relations.mjs <wordnet 폴더>
 *
 * 앞서 만든 audit.mjs 는 **철자만** 봤다. 낱말이 사전에 있는지는 확인해도
 * "이 둘이 정말 반대말인가"는 보지 못한다. 실제로 그 구멍으로
 * `employ ↔ hire`(둘은 유의어다)가 반대말 표에 들어가 있었고,
 * 우연히 다른 검사에 걸려서 잡혔다.
 *
 * 아이는 그 뜻이 맞다고 믿기 때문에 틀린 것을 그대로 외운다. 그래서
 * 관계는 사람의 기억이 아니라 **사전으로** 확인해야 한다.
 *
 *   반대말 — WordNet에 antonym 관계가 명시돼 있다
 *   유의어 — 같은 synset(동의어 집합)에 들어 있는지 본다
 *   품사   — 우리가 적은 품사가 WordNet에 있는 품사와 맞는지 본다
 *
 * WordNet은 저장소에 넣지 않는다. 받아서 경로를 넘긴다.
 *
 *   curl -sLO https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/corpora/wordnet.zip
 *   unzip -q wordnet.zip
 *   node scripts/verify-relations.mjs wordnet
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';

const dir = process.argv[2];
if (!dir || !existsSync(`${dir}/data.noun`)) {
  console.error('사용법: node scripts/verify-relations.mjs <wordnet 폴더>');
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* WordNet 읽기                                                        */
/* ------------------------------------------------------------------ */

const POS = { n: 'noun', v: 'verb', a: 'adj', r: 'adv', s: 'adj' };

/** synset offset+pos → 그 집합에 든 낱말들 */
const synsetWords = new Map();
/** 낱말 → 그 낱말이 든 synset 키 목록 */
const wordSynsets = new Map();
/** synset 키 → 반대말로 이어진 (낱말 → 상대 낱말들) */
const antonymPairs = new Map();
/** synset 키 → 뜻이 가까운 synset들 */
const nearPairs = new Map();

for (const pos of ['noun', 'verb', 'adj', 'adv']) {
  const lines = readFileSync(`${dir}/data.${pos}`, 'utf8').split('\n');
  for (const line of lines) {
    if (line.startsWith('  ') || !line.trim()) continue;
    const [head, gloss] = line.split(' | ');
    const t = head.split(' ');
    const offset = t[0];
    const ss = t[2]; // synset 종류 (n v a s r)
    const key = `${offset}${ss}`;

    const wCount = parseInt(t[3], 16);
    const words = [];
    // WordNet 형용사는 `alive(p)` 처럼 **위치 표시**가 붙는다. 안 떼면
    // 'alive' 로 찾을 때 이 synset이 통째로 안 잡혀서, 사전에 있는 관계도
    // '없음'으로 보고된다. 실제로 이 버그로 245건이 잘못 나왔다.
    for (let i = 0; i < wCount; i++) {
      words.push(
        t[4 + i * 2].toLowerCase().replace(/_/g, ' ').replace(/\([a-z]+\)$/, ''),
      );
    }

    synsetWords.set(key, words);
    for (const w of words) {
      if (!wordSynsets.has(w)) wordSynsets.set(w, []);
      wordSynsets.get(w).push({ key, pos: POS[ss], gloss: (gloss ?? '').trim() });
    }

    // 관계 목록
    const pIdx = 4 + wCount * 2;
    const pCount = parseInt(t[pIdx], 10);
    for (let i = 0; i < pCount; i++) {
      const b = pIdx + 1 + i * 4;
      const sym = t[b];
      const targetKey = `${t[b + 1]}${t[b + 2]}`;
      const st = t[b + 3]; // 낱말 번호 (src<<8|tgt), 0000이면 synset 전체
      const srcNo = parseInt(st.slice(0, 2), 16);
      const tgtNo = parseInt(st.slice(2), 16);

      if (sym === '!') {
        if (!antonymPairs.has(key)) antonymPairs.set(key, []);
        antonymPairs.get(key).push({ targetKey, srcNo, tgtNo });
        continue;
      }
      // 뜻이 가까운 관계들. WordNet의 synset은 아주 잘게 쪼개져 있어서
      // 'obvious' 와 'clear' 도 따로 들어간다. 이것까지 '다른 뜻'이라고
      // 하면 멀쩡한 유의어가 무더기로 의심 목록에 올라 진짜가 묻힌다.
      //   &  비슷한 뜻(형용사)   ^  함께 보기   $  같은 동사 무리
      //   @  상위어             ~  하위어
      if ('&^$@~'.includes(sym)) {
        if (!nearPairs.has(key)) nearPairs.set(key, []);
        nearPairs.get(key).push({ sym, targetKey });
      }
    }
  }
}

/** 그 낱말의 반대말 전부 (WordNet 기준) */
function wnAntonyms(word) {
  const w = word.toLowerCase();
  const out = new Set();
  for (const { key } of wordSynsets.get(w) ?? []) {
    for (const rel of antonymPairs.get(key) ?? []) {
      const srcWords = synsetWords.get(key) ?? [];
      const tgtWords = synsetWords.get(rel.targetKey) ?? [];
      // 낱말 단위 관계면 그 낱말이 우리 낱말일 때만 센다.
      if (rel.srcNo > 0 && srcWords[rel.srcNo - 1] !== w) continue;
      if (rel.tgtNo > 0) {
        if (tgtWords[rel.tgtNo - 1]) out.add(tgtWords[rel.tgtNo - 1]);
      } else {
        for (const t of tgtWords) out.add(t);
      }
    }
  }
  return out;
}

/**
 * 한 다리 건넌 반대말.
 *
 * WordNet의 반대말은 **낱말 하나하나에** 걸려 있어서 성글다. `arrive` 의
 * 반대말로는 `leave` 만 적혀 있고 `depart` 는 없는데, `depart` 는 `leave` 와
 * 같은 뜻이다. 이런 것까지 '사전에 없다'고 하면 멀쩡한 짝이 무더기로
 * 의심 목록에 올라와 진짜 문제가 묻힌다.
 *
 *   a 의 반대말들 ∪ (그 반대말들의 유의어)
 */
function wnAntonymsWide(word) {
  const out = new Set();
  for (const direct of wnAntonyms(word)) {
    out.add(direct);
    for (const near of wnSynonyms(direct)) out.add(near);
  }
  // 반대의 반대도 본다. b 쪽에서 a 가 잡히면 같은 관계다.
  return out;
}

/** 그 낱말과 같은 synset에 든 낱말 전부 = WordNet이 보는 유의어 */
function wnSynonyms(word) {
  const w = word.toLowerCase();
  const out = new Set();
  for (const { key } of wordSynsets.get(w) ?? []) {
    for (const x of synsetWords.get(key) ?? []) if (x !== w) out.add(x);
  }
  return out;
}

/**
 * 넓게 본 유의어.
 *
 * 같은 synset + 뜻이 가까운 synset + **형제 관계**(같은 상위어를 가진
 * 것들, pan/pot 처럼)까지. 교과서가 '바꿔 쓸 수 있다'고 가르치는 범위는
 * WordNet의 synset보다 늘 넓다.
 */
function wnSynonymsWide(word) {
  const w = word.toLowerCase();
  const out = new Set(wnSynonyms(w));
  const keys = (wordSynsets.get(w) ?? []).map((x) => x.key);

  for (const key of keys) {
    for (const rel of nearPairs.get(key) ?? []) {
      // 상위·하위 자체는 유의어가 아니다(apple/fruit). 형제만 인정한다.
      if (rel.sym === '@') {
        for (const sib of nearPairs.get(rel.targetKey) ?? []) {
          if (sib.sym !== '~') continue;
          for (const x of synsetWords.get(sib.targetKey) ?? []) out.add(x);
        }
        continue;
      }
      if (rel.sym === '~') continue;
      for (const x of synsetWords.get(rel.targetKey) ?? []) out.add(x);
    }
  }
  out.delete(w);
  return out;
}

/**
 * B가 A의 **상위·하위 개념**인지.
 *
 * `apple = fruit` 는 유의어가 아니라 '사과는 과일의 한 가지'다. 바꿔 쓰기
 * 문제에서 이것을 유의어라고 내면, 아이는 apple 자리에 fruit를 넣어도
 * 된다고 배운다. `cat = kitten`(새끼 고양이)은 아예 다른 말이다.
 */
function kindRelation(a, b) {
  const A = a.toLowerCase();
  const B = b.toLowerCase();

  // 상위어는 여러 단계 위에 있을 수 있다. apple → edible fruit → fruit.
  const climb = (start, sym, depth) => {
    let frontier = start;
    const seen = new Set(frontier);
    for (let d = 0; d < depth; d++) {
      const next = [];
      for (const key of frontier) {
        for (const rel of nearPairs.get(key) ?? []) {
          if (rel.sym !== sym || seen.has(rel.targetKey)) continue;
          seen.add(rel.targetKey);
          next.push(rel.targetKey);
          if ((synsetWords.get(rel.targetKey) ?? []).includes(B)) return d + 1;
        }
      }
      frontier = next;
    }
    return 0;
  };

  const keys = (wordSynsets.get(A) ?? []).map((x) => x.key);
  // 한 단계 위/아래는 유의어로 봐 준다. WordNet은 near-synonym 도 상하
  // 관계로 모형화해서, 'pain/ache' 나 'rely/depend' 같은 멀쩡한 짝이
  // 여기 걸린다. **두 단계 이상 떨어지면** 유의어가 아니라 '무엇의 한
  // 종류'다 — pear/fruit, pork/meat 처럼.
  const up = climb(keys, '@', 3);
  if (up >= 2) return `${up}단계 위 상위 개념`;
  const down = climb(keys, '~', 3);
  if (down >= 2) return `${down}단계 아래 하위 개념`;
  return null;
}

/** 그 낱말이 WordNet에서 가질 수 있는 품사들 */
function wnPos(word) {
  return new Set((wordSynsets.get(word.toLowerCase()) ?? []).map((s) => s.pos));
}

function inWordNet(word) {
  return wordSynsets.has(word.toLowerCase());
}

/* ------------------------------------------------------------------ */
/* 검사기 자가 점검                                                     */
/* ------------------------------------------------------------------ */

/**
 * 사전을 잘못 읽으면 **모든 관계가 '없음'으로 나와** 검사가 통과한 것처럼
 * 보인다. 그러면 틀린 데이터를 옳다고 넘기게 된다. 그래서 누구나 아는
 * 짝 몇 개로 검사기가 살아 있는지 먼저 확인한다.
 */
const SELF_TEST = [
  ['alive', 'dead'],
  ['hot', 'cold'],
  ['big', 'small'],
  ['increase', 'decrease'],
  ['buy', 'sell'],
];

const broken = SELF_TEST.filter(([a, b]) => !wnAntonyms(a).has(b));
if (broken.length > 0) {
  console.error('\n검사기가 고장났습니다. WordNet을 제대로 못 읽고 있습니다.');
  for (const [a, b] of broken) console.error(`  ${a} <-> ${b} 를 못 찾음`);
  console.error('이 상태의 결과는 믿을 수 없으니 그대로 멈춥니다.\n');
  process.exit(2);
}

/* ------------------------------------------------------------------ */
/* 우리 데이터 읽기                                                     */
/* ------------------------------------------------------------------ */

const entries = [];
for (const file of readdirSync('src/data/levels').filter((f) => f.endsWith('.ts')).sort()) {
  const src = readFileSync(`src/data/levels/${file}`, 'utf8');
  const level = file.replace(/\.ts$/, '');
  let cur = null;
  src.split('\n').forEach((line, i) => {
    const w = line.match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)', p: '((?:[^'\\]|\\.)*)'/);
    if (w) {
      cur = { level, line: i + 1, word: unq(w[1]), pos: unq(w[2]), senses: [] };
      entries.push(cur);
      return;
    }
    const m = line.match(/^ {4}\{ m: '((?:[^'\\]|\\.)*)', syn: \[(.*)\], ex:/);
    if (m && cur) {
      cur.senses.push({
        line: i + 1,
        meaning: unq(m[1]),
        synonyms: [...m[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => unq(x[1])),
      });
    }
  });
}
function unq(s) {
  return s.replace(/\\'/g, "'");
}

const ANT_SRC = readFileSync('src/data/antonyms.ts', 'utf8');
const OUR_ANTONYMS = [];
for (const m of ANT_SRC.matchAll(/^ {2}'([^']+)': \[([^\]]*)\],$/gm)) {
  for (const t of m[2].matchAll(/'([^']+)'/g)) OUR_ANTONYMS.push([m[1], t[1]]);
}

/* ------------------------------------------------------------------ */
/* 대조                                                                */
/* ------------------------------------------------------------------ */

const POS_MAP = { 'n.': 'noun', 'v.': 'verb', 'adj.': 'adj', 'adv.': 'adv' };

const bad = { antonym: [], synonym: [], pos: [] };

/* ① 반대말 — WordNet에 반대 관계가 있는가 */
const checkedPairs = new Set();
for (const [a, b] of OUR_ANTONYMS) {
  const k = [a, b].sort().join('|');
  if (checkedPairs.has(k)) continue;
  checkedPairs.add(k);
  if (!inWordNet(a) || !inWordNet(b)) continue; // 사전에 없으면 판정 불가

  const A = a.toLowerCase();
  const B = b.toLowerCase();
  // 어느 쪽에서 봐도 되고, 한 다리 건너도 인정한다.
  if (wnAntonymsWide(A).has(B) || wnAntonymsWide(B).has(A)) continue;

  // 반대말은 아닌데 **유의어**로 이어져 있으면 확실한 오류다.
  if (wnSynonyms(A).has(B)) {
    bad.antonym.push(`❌ ${a} ↔ ${b} — WordNet은 이 둘을 **유의어**로 본다`);
  } else {
    bad.antonym.push(`?  ${a} ↔ ${b} — WordNet에 반대 관계가 없음`);
  }
}

/* ② 유의어 — WordNet이 같은 뜻으로 묶는가 */
for (const e of entries) {
  for (const s of e.senses) {
    for (const syn of s.synonyms) {
      const a = e.word.toLowerCase();
      const b = syn.toLowerCase();
      if (!inWordNet(a) || !inWordNet(b)) continue;
      if (wnSynonymsWide(a).has(b) || wnSynonymsWide(b).has(a)) continue;

      if (wnAntonyms(a).has(b)) {
        bad.synonym.push(`❌ ${e.level}:${s.line} ${e.word} = ${syn} — WordNet은 이 둘을 **반대말**로 본다`);
        continue;
      }
      const kind = kindRelation(a, b);
      if (kind) {
        bad.synonym.push(`❌ ${e.level}:${s.line} ${e.word} = ${syn} — ${syn}은(는) ${e.word}의 **${kind}**`);
      } else {
        bad.synonym.push(`?  ${e.level}:${s.line} ${e.word} = ${syn} — 같은 뜻으로 묶이지 않음`);
      }
    }
  }
}

/* ③ 품사 — 우리가 적은 품사가 WordNet에 있는가 */
for (const e of entries) {
  if (e.word.includes(' ')) continue; // 숙어는 WordNet에 없는 게 많다
  if (!inWordNet(e.word)) continue;
  const ours = e.pos.split(',').map((p) => POS_MAP[p.trim()]).filter(Boolean);
  if (ours.length === 0) continue;
  const theirs = wnPos(e.word);
  if (!ours.some((p) => theirs.has(p))) {
    bad.pos.push(`${e.level}:${e.line} ${e.word} — 우리 '${e.pos}' / WordNet '${[...theirs].join(', ')}'`);
  }
}

/* ------------------------------------------------------------------ */

const show = (title, list, limit = Number(process.env.LIMIT ?? 60)) => {
  const hard = list.filter((x) => x.startsWith('❌'));
  const soft = list.filter((x) => !x.startsWith('❌'));
  console.log(`\n${hard.length === 0 ? '✅' : '❌'} ${title} — 확실한 오류 ${hard.length}건, 확인 필요 ${soft.length}건`);
  for (const l of hard) console.log(`   ${l}`);
  for (const l of soft.slice(0, limit)) console.log(`   ${l}`);
  if (soft.length > limit) console.log(`   … 그 밖에 ${soft.length - limit}건`);
};

console.log(`\nWordNet 대조 — 표제어 ${entries.length} · 반대말 짝 ${checkedPairs.size}`);
show('반대말', bad.antonym);
show('유의어', bad.synonym);
show('품사', bad.pos.map((x) => `?  ${x}`));

const hardTotal = [...bad.antonym, ...bad.synonym].filter((x) => x.startsWith('❌')).length;
console.log(
  `\n확실한 오류 ${hardTotal}건.` +
    ' WordNet에 관계가 없다고 다 틀린 것은 아니다 — 사전이 모든 짝을 담고 있지는 않다.',
);
process.exit(hardTotal === 0 ? 0 : 1);
