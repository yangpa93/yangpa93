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
  'adj.': ['adj'],
  'adv.': ['adv'],
  'prep.': ['prep', 'postp'],
  'conj.': ['conj'],
  'pron.': ['pron'],
  'art.': ['article', 'det'],
  'num.': ['num'],
  'int.': ['intj'],
  'aux.': ['verb'],
  'phr.': ['phrase', 'prep_phrase', 'adv_phrase', 'verb', 'noun', 'adj', 'adv', 'intj', 'proverb'],
};

function ourPosParts(pos) {
  return pos.split(',').map((p) => p.trim()).filter(Boolean);
}

/* ---------- 낱말 다듬기 ---------- */

function norm(s) {
  return s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
}

/** 유의어 하나를 비교용 열쇠로. 'give up' 의 to 같은 군더더기를 뗀다. */
function synKey(s) {
  return norm(s).replace(/^(to|be|a|an|the)\s+/, '');
}

/* ---------- 검사 ---------- */

const entries = readEntries().filter((e) => !onlyLevel || e.level === onlyLevel);
if (entries.length === 0) {
  console.error(`레벨 '${onlyLevel}' 에 표제어가 없습니다.`);
  process.exit(1);
}

const found = { unknown: [], pos: [], syn: [], exWord: [] };

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
    if (!want) continue; // 모르는 약어는 audit.mjs 가 잡는다
    if (!want.some((w) => refPos.has(w))) {
      found.pos.push(`${at} — '${p}' 인데 사전에는 [${[...refPos].join(', ')}] 뿐`);
    }
  }

  /* 사전 쪽 유의어를 한 자루에 모은다 (품사·뜻 구분 없이) */
  const refSyn = new Set();
  const refGloss = [];
  for (const r of ref) {
    for (const s of r.syn) refSyn.add(synKey(s));
    for (const sn of r.senses) {
      refGloss.push(sn.gloss.toLowerCase());
      for (const s of sn.syn) refSyn.add(synKey(s));
    }
  }

  /* 3. 우리 유의어가 사전 유의어와도, 뜻풀이와도 한 군데도 안 겹침 */
  if (refSyn.size > 0) {
    for (const s of e.senses) {
      if (s.synonyms.length === 0) continue;
      const hit = s.synonyms.some((syn) => {
        const k = synKey(syn);
        if (!k) return false;
        if (refSyn.has(k)) return true;
        // 뜻풀이 본문에 그대로 나오면 인정한다.
        return refGloss.some((g) => new RegExp(`\\b${k.replace(/\s+/g, '\\s+')}\\b`).test(g));
      });
      if (!hit) {
        found.syn.push(
          `${e.level}:${s.line} ${e.word} — '${s.meaning}' 의 유의어 [${s.synonyms.join(', ')}] 가 사전과 안 겹침`,
        );
      }
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
  ['뜻과 유의어', found.syn],
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
