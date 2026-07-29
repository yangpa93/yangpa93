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
 */

import { createWriteStream } from 'node:fs';
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

const total = Number(
  execFileSync('curl', ['-sSI', URL], { encoding: 'utf8' })
    .split('\n')
    .find((l) => /^content-length:/i.test(l))
    ?.split(':')[1]
    ?.trim(),
);
if (!Number.isFinite(total) || total <= 0) {
  console.error('덤프 크기를 알 수 없습니다.');
  process.exit(1);
}
console.error(`덤프 ${Math.round(total / 1e6)}MB`);

/* ---------- 흘려보내며 거르기 ---------- */

const rl = createInterface({ input: ranges(total), crlfDelay: Infinity });

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

  // JSON.parse 는 비싸다. 줄 안에 표제어가 없으면 먼저 걸러낸다.
  const q = line.indexOf('"word":"');
  if (q < 0) continue;
  const end = line.indexOf('"', q + 8);
  if (end < 0) continue;
  const word = line.slice(q + 8, end).toLowerCase();
  if (!WANT.has(word)) continue;

  let o;
  try {
    o = JSON.parse(line);
  } catch {
    continue;
  }
  if (o.lang_code !== 'en') continue;

  const senses = (o.senses ?? [])
    .filter((s) => !s.tags?.includes('no-gloss'))
    .map((s) => ({
      gloss: (s.glosses ?? s.raw_glosses ?? []).join(' '),
      tags: s.tags ?? [],
      topics: s.topics ?? [],
      // 뜻마다 붙은 유의어. 우리 데이터의 syn 과 맞대 볼 유일한 기계 신호다.
      syn: names(s.synonyms),
    }))
    .filter((s) => s.gloss);

  // 뜻이 아니라 낱말 전체에 붙은 유의어도 있다. 둘 다 모은다.
  const wordSyn = names(o.synonyms);
  if (senses.length === 0) continue;

  if (!found.has(word)) found.set(word, []);
  found.get(word).push({
    pos: o.pos,
    senses,
    syn: wordSyn,
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
