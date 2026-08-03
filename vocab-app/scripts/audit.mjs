#!/usr/bin/env node
/**
 * 어휘 데이터 전수 검사.
 *
 *   node scripts/audit.mjs <영어 단어 목록 파일>
 *
 * 예문 10,047개를 사람이 다시 읽을 수는 없다. 게다가 **아이는 그 단어가
 * 맞다고 믿기 때문에** 오타를 만나도 그냥 외워 버린다. 그래서 기계가
 * 걸러낼 수 있는 것은 전부 기계에 맡긴다.
 *
 * 단어 목록은 저장소에 넣지 않는다(37만 개, 라이선스도 제각각). 내려받아
 * 경로를 넘긴다.
 *
 *   curl -sLO https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt
 *   node scripts/audit.mjs words_alpha.txt
 *
 * 사전에 없다고 다 오타는 아니다(고유명사, 굴절형). 그래서 **의심스러운
 * 것을 모아 보여줄 뿐** 자동으로 고치지 않는다. 판단은 사람이 한다.
 */

import { readFileSync, existsSync } from 'node:fs';
import { readEntries } from './lib/levels.mjs';

const dictPath = process.argv[2];
if (!dictPath || !existsSync(dictPath)) {
  console.error('사용법: node scripts/audit.mjs <영어 단어 목록 파일>');
  console.error('  curl -sLO https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt');
  process.exit(1);
}

/* ---------- 사전 ---------- */

const DICT = new Set(
  readFileSync(dictPath, 'utf8')
    .split('\n')
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean),
);

/** 사전에 없지만 우리 예문에서 정당하게 쓰는 말. 늘릴 때는 근거를 적는다. */
const ALLOW = new Set([
  // 고유명사 — 예문에 나라·도시·인명이 들어간다.
  'korea', 'korean', 'seoul', 'busan', 'gyeongju', 'japan', 'china', 'india',
  'america', 'american', 'england', 'english', 'britain', 'british', 'london',
  'paris', 'rome', 'greek', 'greece', 'latin', 'spanish', 'spain', 'french',
  'france', 'german', 'germany', 'italy', 'italian', 'europe', 'european',
  'africa', 'asia', 'canada', 'australia', 'mexico', 'egypt', 'rome',
  'beethoven', 'bach', 'mozart', 'edison', 'newton', 'einstein', 'shakespeare',
  'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
  'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
  'september', 'october', 'november', 'december',
  'christmas', 'easter', 'halloween', 'thanksgiving',
  'smith', 'tom', 'jane', 'mary', 'john', 'sam', 'ann', 'anna', 'amy', 'ben',
  'minsu', 'jimin', 'jisu', 'sujin', 'hana', 'yuna', 'jiho', 'seojun',
  // 사전에 없지만 표준인 현대어
  // 우리 예문에 나오는 한국 고유명사
  'jeju', 'daegu', 'incheon', 'gwangju', 'daejeon', 'ulsan', 'suwon',
  'hanbok', 'hangul', 'kimchi', 'bibimbap', 'taekwondo', 'seolnal', 'chuseok',
  'han', 'jeonju', 'sokcho', 'gangneung',
  'online', 'offline', 'website', 'email', 'smartphone', 'internet', 'app',
  'apps', 'laptop', 'podcast', 'blog', 'wifi', 'tv', 'barcode',
]);

/* ---------- 레벨 데이터 읽기 ---------- */

const entries = readEntries();

/* ---------- 우리 어휘 자체도 사전에 더한다 ---------- */

const OURS = new Set();
for (const e of entries) {
  for (const part of e.word.toLowerCase().split(/\s+/)) OURS.add(part);
  for (const s of e.senses) {
    for (const syn of s.synonyms) {
      for (const part of syn.toLowerCase().split(/\s+/)) OURS.add(part);
    }
  }
}

/** 규칙 변화형까지 인정한다. saves/saved/saving 은 사전에 없을 수 있다. */
function known(word) {
  const w = word.toLowerCase();
  if (DICT.has(w) || ALLOW.has(w) || OURS.has(w)) return true;

  // 굴절형을 되돌려 본다.
  const stems = [];
  if (w.endsWith('s')) stems.push(w.slice(0, -1));
  if (w.endsWith('es')) stems.push(w.slice(0, -2));
  if (w.endsWith('ies')) stems.push(`${w.slice(0, -3)}y`);
  if (w.endsWith('ed')) stems.push(w.slice(0, -2), w.slice(0, -1));
  if (w.endsWith('ied')) stems.push(`${w.slice(0, -3)}y`);
  if (w.endsWith('ing')) stems.push(w.slice(0, -3), `${w.slice(0, -3)}e`);
  if (/([bcdfgklmnprstvz])\1(ed|ing)$/.test(w)) {
    stems.push(w.replace(/([bcdfgklmnprstvz])\1(ed|ing)$/, '$1'));
  }
  if (w.endsWith('er') || w.endsWith('est')) {
    stems.push(w.replace(/(er|est)$/, ''), w.replace(/(er|est)$/, 'e'));
  }
  if (w.endsWith('ly')) stems.push(w.slice(0, -2), `${w.slice(0, -2)}e`);
  if (w.endsWith('ily')) stems.push(`${w.slice(0, -3)}y`);

  return stems.some((s) => s.length > 1 && (DICT.has(s) || OURS.has(s)));
}

/** 한자·중국어 문자. 리터럴로 적지 않는다 — 어떤 글자를 쳤는지에 따라
 *  범위가 통째로 달라져서, 한글을 전부 한자로 잡는 사고가 실제로 났다. */
const HAN = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;

/**
 * 문장을 검사할 낱말로 쪼갠다.
 *
 * `part-time` 은 두 낱말로, `dog's` 는 `dog` 로 본다. 안 그러면 멀쩡한
 * 합성어와 소유격이 전부 '사전에 없음'으로 쏟아져서 진짜 오타가 묻힌다.
 */
function tokens(sentence) {
  const out = [];
  for (const raw of sentence.split(/[^A-Za-z'-]+/)) {
    for (const piece of raw.split('-')) {
      const clean = piece.replace(/'s$/i, '').replace(/^['-]+|['-]+$/g, '');
      if (clean.length >= 2) out.push(clean);
    }
  }
  return out;
}

/* ---------- 검사 ---------- */

const found = { spell: [], form: [], korean: [], dup: [], meaning: [], syn: [] };
const seenSentence = new Map();

for (const e of entries) {
  const at = `${e.level}:${e.line} ${e.word}`;

  // 표제어 자체
  if (!known(e.word.split(/\s+/)[0])) found.spell.push(`${at} — 표제어가 사전에 없음`);

  // 품사 표기
  if (!/^[a-z]+\.(,\s*[a-z]+\.)*$/.test(e.pos)) {
    found.form.push(`${at} — 품사 표기가 이상함: '${e.pos}'`);
  }

  for (const s of e.senses) {
    // 뜻에 영어가 새어 들어갔는지
    if (/[A-Za-z]{3,}/.test(s.meaning.replace(/\([^)]*\)/g, ''))) {
      found.meaning.push(`${at} — 뜻에 영어가 섞임: '${s.meaning}'`);
    }
    if (!/[가-힣]/.test(s.meaning)) {
      found.meaning.push(`${at} — 뜻에 한글이 없음: '${s.meaning}'`);
    }

    // 동의어
    for (const syn of s.synonyms) {
      if (syn.toLowerCase() === e.word.toLowerCase()) {
        found.syn.push(`${at} — 동의어가 표제어와 같음: '${syn}'`);
      }
      for (const part of syn.split(/\s+/)) {
        if (!known(part)) found.syn.push(`${at} — 동의어가 사전에 없음: '${syn}'`);
      }
    }

    for (const ex of s.examples) {
      const where = `${e.level}:${ex.line} ${e.word}`;

      /* 영어 문장 */
      if (!/^[A-Z"']/.test(ex.en)) found.form.push(`${where} — 대문자로 시작하지 않음: "${ex.en}"`);
      if (!/[.!?]"?$/.test(ex.en)) found.form.push(`${where} — 마침표가 없음: "${ex.en}"`);
      if (/\s{2,}/.test(ex.en)) found.form.push(`${where} — 공백이 두 칸: "${ex.en}"`);
      if (/\s[.,!?]/.test(ex.en)) found.form.push(`${where} — 문장부호 앞에 공백: "${ex.en}"`);
      // 소유격 dog's 는 축약형이 아니다. n't·'re·'ve·'ll·'d·'m 과
      // it's 류만 잡는다. 빈칸 문제에서 걸리는 것은 이쪽뿐이다.
      if (/\b\w+n't\b|\w'(re|ve|ll|d|m)\b|\b(it|that|there|here|what|who|let|he|she)'s\b/i.test(ex.en)) {
        found.form.push(`${where} — 축약형이 있음(풀어써야 함): "${ex.en}"`);
      }
      if (/[가-힣]/.test(ex.en)) found.form.push(`${where} — 영어 예문에 한글: "${ex.en}"`);

      for (const token of tokens(ex.en)) {
        if (!known(token)) found.spell.push(`${where} — '${token}' :: "${ex.en}"`);
      }

      /* 한국어 해석 */
      if (!/[가-힣]/.test(ex.ko)) found.korean.push(`${where} — 해석에 한글이 없음: "${ex.ko}"`);
      if (HAN.test(ex.ko)) found.korean.push(`${where} — 해석에 한자: "${ex.ko}"`);
      if (/\s{2,}/.test(ex.ko)) found.korean.push(`${where} — 해석에 공백이 두 칸: "${ex.ko}"`);
      if (!/[.!?"']$/.test(ex.ko)) found.korean.push(`${where} — 해석에 마침표가 없음: "${ex.ko}"`);

      /* 같은 문장을 두 단어에서 쓰고 있는지 */
      const key = ex.en.toLowerCase();
      if (seenSentence.has(key)) {
        found.dup.push(`${where} ↔ ${seenSentence.get(key)} — 같은 예문: "${ex.en}"`);
      } else {
        seenSentence.set(key, where);
      }
    }
  }
}

/* ---------- 보고 ---------- */

const totalEx = entries.reduce((n, e) => n + e.senses.reduce((m, s) => m + s.examples.length, 0), 0);

console.log(`\n어휘 전수 검사 — 표제어 ${entries.length} · 예문 ${totalEx}\n`);

const sections = [
  ['철자 (사전에 없는 낱말)', found.spell],
  ['문장 형식', found.form],
  ['한국어 해석', found.korean],
  ['뜻', found.meaning],
  ['동의어', found.syn],
  ['중복 예문', found.dup],
];

let total = 0;
for (const [title, list] of sections) {
  const uniq = [...new Set(list)];
  total += uniq.length;
  console.log(`${uniq.length === 0 ? '✅' : '⚠️ '} ${title}: ${uniq.length}건`);
  for (const line of uniq.slice(0, 40)) console.log(`     ${line}`);
  if (uniq.length > 40) console.log(`     … 그 밖에 ${uniq.length - 40}건`);
}

console.log(`\n합계 ${total}건. 사전에 없다고 다 오타는 아닙니다 — 고유명사와 드문 굴절형이 섞입니다.`);
process.exit(total === 0 ? 0 : 1);
