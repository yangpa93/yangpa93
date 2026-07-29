#!/usr/bin/env node
/**
 * 사전 대조용 참고 자료를 만든다.
 *
 *   node scripts/fetch-reference.mjs [출력경로]
 *
 * kaikki.org 의 영어 위키낱말사전 덤프(JSONL, 3GB 남짓)를 **내려받아 두지 않고
 * 흘려보내면서** 우리 어휘 3,286개에 해당하는 줄만 골라낸다. 통째로 저장하면
 * 디스크도 저장소도 감당이 안 되고, 어차피 쓰는 것은 0.1% 도 안 된다.
 *
 * 골라낸 것도 필요한 것만 남긴다 — 품사와 뜻풀이. 발음·어원·번역은 버린다.
 *
 * 결과물은 저장소에 넣지 않는다(라이선스는 CC BY-SA, 용량도 크다).
 * 검사할 때마다 다시 만들거나, 만들어 둔 파일 경로를 넘긴다.
 *
 * 거르는 조건을 손볼 때는 덤프를 한 번 받아 두고 `VOCAB_DUMP` 로 읽는다.
 * 조건이 틀리면 3GB를 다시 받게 되는데, 실제로 한 번 그랬다.
 *
 *   VOCAB_DUMP=/어딘가/english.jsonl node scripts/fetch-reference.mjs ref.json
 */

import { createWriteStream, createReadStream, existsSync } from 'node:fs';
import { createInterface } from 'node:readline';
import { spawn, execFileSync } from 'node:child_process';
import { PassThrough } from 'node:stream';
import { readEntries } from './lib/levels.mjs';

const OUT = process.argv[2] ?? 'reference.json';
const URL = 'https://kaikki.org/dictionary/English/kaikki.org-dictionary-English.jsonl';

/* ---------- 찾을 낱말 ---------- */

/**
 * 숙어는 표제어 그대로("give up"), 단어도 표제어 그대로 찾는다.
 * 덤프의 `word` 는 소문자 표제어이므로 소문자로 맞춘다.
 */
const WANT = new Set(readEntries().map((e) => e.word.toLowerCase()));
console.error(`찾을 낱말 ${WANT.size}개`);

/** kaikki 의 유의어는 `[{word: 'firm', ...}]` 꼴이다. 낱말만 뽑는다. */
function names(list) {
  return (list ?? []).map((x) => x?.word).filter((w) => typeof w === 'string');
}

/** 한국어 번역만 골라 낱말을 뽑는다. 한글이 아닌 것(로마자 표기)은 버린다. */
function korean(list) {
  return (list ?? [])
    .filter((t) => t?.lang_code === 'ko' && typeof t.word === 'string')
    .map((t) => t.word)
    .filter((w) => /[가-힣]/.test(w));
}

const KEY = '"word": "';

/** 줄 안에 우리가 찾는 낱말이 하나라도 보이는가. */
function maybeWanted(line) {
  for (let i = line.indexOf(KEY); i >= 0; i = line.indexOf(KEY, i + KEY.length)) {
    const from = i + KEY.length;
    const to = line.indexOf('"', from);
    if (to < 0) break;
    if (WANT.has(line.slice(from, to).toLowerCase())) return true;
  }
  return false;
}

/* ---------- 내려받기 ---------- */

const CHUNK = 100 * 1024 * 1024;

/**
 * 통째로 한 번에 받으면 중간 프록시가 3GB 응답을 다 버퍼에 담으려다 멈춰 선다.
 * (재 보면 전체 요청은 2분에 1MB, 범위 요청은 6MB/s 였다.)
 * 그래서 100MB씩 끊어 이어 붙인다. 이어 붙인 결과는 원본과 바이트가 같으므로
 * 줄 경계는 저절로 맞는다.
 */
function ranges(total) {
  const stream = new PassThrough();

  (async () => {
    for (let from = 0; from < total; from += CHUNK) {
      const to = Math.min(from + CHUNK, total) - 1;
      for (let attempt = 0; ; attempt++) {
        try {
          await pump(`${from}-${to}`, stream);
          break;
        } catch (err) {
          if (attempt >= 4) throw err;
          await new Promise((r) => setTimeout(r, 2000 * 2 ** attempt));
          console.error(`  ${from}-${to} 다시 받는 중 (${attempt + 1}번째)`);
        }
      }
      console.error(`  받음 ${Math.round((to + 1) / 1e6)}MB / ${Math.round(total / 1e6)}MB`);
    }
    stream.end();
  })().catch((err) => stream.destroy(err));

  return stream;
}

function pump(range, out) {
  return new Promise((resolve, reject) => {
    const c = spawn('curl', ['-sS', '--fail', '-r', range, URL], {
      stdio: ['ignore', 'pipe', 'inherit'],
    });
    c.stdout.pipe(out, { end: false });
    c.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`curl ${range} → ${code}`))));
    c.on('error', reject);
  });
}

/**
 * 덤프를 미리 받아 둔 파일이 있으면 그걸 읽는다.
 *
 *   VOCAB_DUMP=/어딘가/english.jsonl node scripts/fetch-reference.mjs ref.json
 *
 * 거르는 조건을 손볼 때마다 3GB를 다시 받을 수는 없다.
 */
const DUMP = process.env.VOCAB_DUMP;
if (DUMP) {
  if (!existsSync(DUMP)) {
    console.error(`VOCAB_DUMP 파일이 없습니다: ${DUMP}`);
    process.exit(1);
  }
  console.error(`받아 둔 덤프를 읽습니다: ${DUMP}`);
}

const total = DUMP ? 0 : Number(
  execFileSync('curl', ['-sSI', URL], { encoding: 'utf8' })
    .split('\n')
    .find((l) => /^content-length:/i.test(l))
    ?.split(':')[1]
    ?.trim(),
);
if (!DUMP && (!Number.isFinite(total) || total <= 0)) {
  console.error('덤프 크기를 알 수 없습니다.');
  process.exit(1);
}
if (!DUMP) console.error(`덤프 ${Math.round(total / 1e6)}MB`);

/* ---------- 흘려보내며 거르기 ---------- */

const rl = createInterface({
  input: DUMP ? createReadStream(DUMP) : ranges(total),
  crlfDelay: Infinity,
});

/** 낱말 → 그 낱말의 품사별 항목들 */
const found = new Map();
let lines = 0;
let kept = 0;

for await (const line of rl) {
  lines++;
  if (lines % 1_000_000 === 0) {
    console.error(`  ${(lines / 1e6).toFixed(0)}M줄 / 찾은 낱말 ${found.size}개`);
  }
  if (!line) continue;

  // JSON.parse 는 비싸다(3GB · 148만 줄). 줄 안에 우리 낱말이 하나도 없으면
  // 먼저 걸러낸다. 표제어 말고 descendants 안에도 "word" 가 들어 있으므로
  // 나오는 것을 다 훑어보고, 하나라도 걸리면 그때 parse 해서 확인한다.
  if (!maybeWanted(line)) continue;

  let o;
  try {
    o = JSON.parse(line);
  } catch {
    continue;
  }
  if (o.lang_code !== 'en') continue;
  const word = String(o.word ?? '').toLowerCase();
  if (!WANT.has(word)) continue;

  const senses = (o.senses ?? [])
    .filter((s) => !s.tags?.includes('no-gloss'))
    .map((s) => ({
      gloss: (s.glosses ?? s.raw_glosses ?? []).join(' '),
      tags: s.tags ?? [],
      topics: s.topics ?? [],
      syn: names(s.synonyms),
      // 뜻마다 붙은 한국어 번역. 우리 뜻과 곧바로 맞대 볼 수 있는 유일한 것이다.
      ko: korean(s.translations),
    }))
    .filter((s) => s.gloss);

  // 뜻이 아니라 낱말 전체에 붙은 것도 있다. 둘 다 모은다.
  const wordSyn = names(o.synonyms);
  const wordKo = korean(o.translations);
  if (senses.length === 0) continue;

  if (!found.has(word)) found.set(word, []);
  found.get(word).push({
    pos: o.pos,
    senses,
    syn: wordSyn,
    ko: wordKo,
    forms: (o.forms ?? []).map((f) => f.form).filter(Boolean).slice(0, 12),
  });
  kept++;
}

console.error(`읽은 줄 ${lines.toLocaleString()} / 담은 항목 ${kept} / 낱말 ${found.size}`);

const missing = [...WANT].filter((w) => !found.has(w));
console.error(`덤프에 없는 낱말 ${missing.length}개`);

const out = createWriteStream(OUT);
out.write(JSON.stringify({ source: URL, words: Object.fromEntries(found), missing }));
out.end();
await new Promise((res) => out.on('close', res));
console.error(`→ ${OUT}`);
