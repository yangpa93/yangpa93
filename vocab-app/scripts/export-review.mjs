#!/usr/bin/env node
/**
 * 어휘 데이터를 사람이 읽을 수 있는 파일로 뽑는다.
 *
 *   node scripts/export-review.mjs [내보낼 폴더]
 *
 * 데이터는 src/data/levels/*.ts 에 코드로 들어 있어서, 부모가 "우리 애가
 * 뭘 외우고 있나" 확인하려면 타입스크립트 파일을 열어야 한다. 그건 확인이
 * 아니다. 표로 뽑아 두면 훑어보다가 이상한 것을 짚을 수 있다.
 *
 * 두 가지를 만든다.
 *   vocab.csv   — 엑셀·구글시트에서 열어 정렬하고 걸러 보는 용도.
 *                 예문 한 줄이 한 행이다.
 *   vocab.html  — 폰에서 그냥 열어 보는 용도. 검색과 레벨 고르기가 된다.
 *                 파일 하나로 끝나서 인터넷 없이도 열린다.
 *
 * 레벨 파일을 import 하지 않고 글자로 읽는 이유: 이 스크립트는 순수
 * node 로 돌아야 한다(엑스포 없이). audit.mjs 도 같은 방식이다.
 */

import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';

const OUT_DIR = process.argv[2] ?? 'review';
const LEVEL_DIR = 'src/data/levels';

/* ------------------------------------------------------------------ */
/* 읽기                                                                */
/* ------------------------------------------------------------------ */

function unq(s) {
  return s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}

/** 학년 순서. 파일 이름순으로 두면 고1이 중1보다 앞에 온다. */
const LEVEL_ORDER = ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'].flatMap((g) =>
  [1, 2, 3, 4].map((n) => `${g}-${n}`),
);

const entries = [];

const files = readdirSync(LEVEL_DIR)
  .filter((f) => f.endsWith('.ts'))
  .sort((a, b) => LEVEL_ORDER.indexOf(a.replace(/\.ts$/, '')) - LEVEL_ORDER.indexOf(b.replace(/\.ts$/, '')));

for (const file of files) {
  const src = readFileSync(`${LEVEL_DIR}/${file}`, 'utf8');
  const level = file.replace(/\.ts$/, '');

  let cur = null;
  let sense = null;

  for (const [i, line] of src.split('\n').entries()) {
    const w = line.match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)', p: '((?:[^'\\]|\\.)*)'/);
    if (w) {
      cur = { level, line: i + 1, word: unq(w[1]), pos: unq(w[2]), senses: [] };
      entries.push(cur);
      continue;
    }
    const m = line.match(/^ {4}\{ m: '((?:[^'\\]|\\.)*)', syn: \[(.*)\], ex: \[/);
    if (m && cur) {
      sense = {
        meaning: unq(m[1]),
        synonyms: [...m[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => unq(x[1])),
        examples: [],
      };
      cur.senses.push(sense);
      continue;
    }
    const ex = line.match(/^ {6}\['((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'\],$/);
    if (ex && sense) sense.examples.push({ en: unq(ex[1]), ko: unq(ex[2]) });
  }
}

/** 반대말 표. 짝은 양방향이라 양쪽에 채운다. */
const antonyms = {};
{
  const src = readFileSync('src/data/antonyms.ts', 'utf8');
  for (const line of src.split('\n')) {
    const m = line.match(/^ {2}'([^']+)': \[(.*)\],\s*$/);
    if (!m) continue;
    const word = m[1];
    const list = [...m[2].matchAll(/'([^']*)'/g)].map((x) => x[1]);
    for (const other of list) {
      (antonyms[word] ??= []).push(other);
      if (!(antonyms[other] ??= []).includes(word)) antonyms[other].push(word);
    }
  }
}

const LEVEL_LABEL = {};
for (const g of ['m1', 'm2', 'm3', 'h1', 'h2', 'h3']) {
  const [school, grade] = g[0] === 'm' ? ['중', g[1]] : ['고', g[1]];
  for (let n = 1; n <= 4; n++) LEVEL_LABEL[`${g}-${n}`] = `${school}${grade}-${n}`;
}

const totals = {
  words: entries.length,
  senses: entries.reduce((n, e) => n + e.senses.length, 0),
  examples: entries.reduce(
    (n, e) => n + e.senses.reduce((k, s) => k + s.examples.length, 0),
    0,
  ),
};

mkdirSync(OUT_DIR, { recursive: true });

/* ------------------------------------------------------------------ */
/* CSV — 예문 한 줄이 한 행                                            */
/* ------------------------------------------------------------------ */

function csvCell(v) {
  const s = String(v ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

const rows = [
  ['레벨', '단어', '품사', '뜻', '유의어', '반대말', '예문', '해석'],
];

for (const e of entries) {
  const ant = (antonyms[e.word] ?? []).join(', ');
  for (const s of e.senses) {
    const syn = s.synonyms.join(', ');
    if (s.examples.length === 0) {
      rows.push([LEVEL_LABEL[e.level], e.word, e.pos, s.meaning, syn, ant, '', '']);
      continue;
    }
    for (const ex of s.examples) {
      rows.push([LEVEL_LABEL[e.level], e.word, e.pos, s.meaning, syn, ant, ex.en, ex.ko]);
    }
  }
}

// 맨 앞의 BOM은 엑셀이 한글을 깨뜨리지 않게 하려고 붙인다.
writeFileSync(
  `${OUT_DIR}/vocab.csv`,
  '﻿' + rows.map((r) => r.map(csvCell).join(',')).join('\n') + '\n',
  'utf8',
);

/* ------------------------------------------------------------------ */
/* HTML — 폰에서 그냥 열어 보는 용도                                    */
/* ------------------------------------------------------------------ */

const data = entries.map((e) => ({
  l: LEVEL_LABEL[e.level],
  w: e.word,
  p: e.pos,
  a: antonyms[e.word] ?? [],
  s: e.senses.map((s) => ({
    m: s.meaning,
    y: s.synonyms,
    e: s.examples.map((x) => [x.en, x.ko]),
  })),
}));

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>가가_Voca 단어 확인</title>
<style>
  :root {
    --bg:#f7f7f8; --card:#fff; --text:#1c1c1e; --sub:#5b5b60; --muted:#9a9aa0;
    --line:#e5e5ea; --accent:#3b6ef5; --warm:#b45309;
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --bg:#131316; --card:#1c1c20; --text:#f2f2f4; --sub:#b6b6bd; --muted:#7c7c85;
      --line:#2c2c32; --accent:#7ea0ff; --warm:#f0b45e;
    }
  }
  * { box-sizing:border-box; }
  body {
    margin:0; background:var(--bg); color:var(--text);
    font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Noto Sans KR',sans-serif;
    line-height:1.6; -webkit-text-size-adjust:100%;
  }
  header {
    position:sticky; top:0; z-index:10; background:var(--bg);
    border-bottom:1px solid var(--line); padding:12px 16px 10px;
  }
  h1 { margin:0 0 2px; font-size:17px; }
  .count { color:var(--muted); font-size:12px; }
  input[type=search] {
    width:100%; margin-top:10px; padding:11px 13px; font-size:16px;
    border:1px solid var(--line); border-radius:10px;
    background:var(--card); color:var(--text);
  }
  .levels { display:flex; gap:6px; overflow-x:auto; margin-top:10px; padding-bottom:2px; }
  .levels button {
    flex:0 0 auto; padding:6px 11px; font-size:13px; font-weight:700;
    border:1px solid var(--line); border-radius:999px;
    background:var(--card); color:var(--sub); cursor:pointer;
  }
  .levels button[aria-pressed=true] { background:var(--accent); border-color:var(--accent); color:#fff; }
  main { padding:12px 16px 60px; }
  .word { background:var(--card); border:1px solid var(--line); border-radius:12px;
          padding:14px 15px; margin-bottom:10px; }
  .head { display:flex; align-items:baseline; gap:8px; flex-wrap:wrap; }
  .w { font-size:19px; font-weight:800; }
  .pos { color:var(--muted); font-size:12px; }
  .lv { margin-left:auto; color:var(--muted); font-size:12px; }
  .sense { margin-top:10px; padding-top:10px; border-top:1px dashed var(--line); }
  .sense:first-of-type { border-top:0; padding-top:2px; }
  .m { font-weight:700; }
  .tags { margin-top:4px; font-size:12.5px; color:var(--sub); }
  .tag { color:var(--warm); }
  ol { margin:8px 0 0; padding-left:20px; }
  li { margin-bottom:6px; }
  .en { }
  .ko { color:var(--sub); font-size:13.5px; }
  mark { background:#ffe58a; color:#1c1c1e; border-radius:3px; padding:0 2px; }
  .empty { color:var(--muted); text-align:center; padding:40px 0; }
  .more { display:block; width:100%; margin:8px 0 0; padding:12px;
          font-size:15px; font-weight:700; border:1px solid var(--line);
          border-radius:10px; background:var(--card); color:var(--accent); cursor:pointer; }
</style>
</head>
<body>
<header>
  <h1>가가_Voca 단어 확인</h1>
  <div class="count">표제어 ${totals.words}개 · 뜻 ${totals.senses}개 · 예문 ${totals.examples}개</div>
  <input type="search" id="q" placeholder="단어나 뜻으로 찾기 (예: save, 구하다, 사과)" autocomplete="off">
  <div class="levels" id="levels"></div>
</header>
<main id="list"></main>

<script>
const DATA = ${JSON.stringify(data)};
const LEVELS = [...new Set(DATA.map(d => d.l))];
const PAGE = 60;

let level = '전체';
let query = '';
let shown = PAGE;

const $q = document.getElementById('q');
const $list = document.getElementById('list');
const $levels = document.getElementById('levels');

for (const l of ['전체', ...LEVELS]) {
  const b = document.createElement('button');
  b.textContent = l;
  b.setAttribute('aria-pressed', String(l === level));
  b.onclick = () => {
    level = l; shown = PAGE;
    [...$levels.children].forEach(c => c.setAttribute('aria-pressed', String(c.textContent === l)));
    render();
  };
  $levels.appendChild(b);
}

$q.addEventListener('input', () => { query = $q.value.trim().toLowerCase(); shown = PAGE; render(); });

function matches(d) {
  if (level !== '전체' && d.l !== level) return false;
  if (!query) return true;
  if (d.w.toLowerCase().includes(query)) return true;
  for (const s of d.s) {
    if (s.m.toLowerCase().includes(query)) return true;
    if (s.y.some(y => y.toLowerCase().includes(query))) return true;
    for (const [en, ko] of s.e) {
      if (en.toLowerCase().includes(query) || ko.includes(query)) return true;
    }
  }
  return d.a.some(a => a.toLowerCase().includes(query));
}

const esc = s => s.replace(/[&<>]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));

function hi(s) {
  const t = esc(s);
  if (!query) return t;
  const i = t.toLowerCase().indexOf(query);
  if (i < 0) return t;
  return t.slice(0, i) + '<mark>' + t.slice(i, i + query.length) + '</mark>' + t.slice(i + query.length);
}

function card(d) {
  let h = '<div class="word"><div class="head">';
  h += '<span class="w">' + hi(d.w) + '</span><span class="pos">' + esc(d.p) + '</span>';
  h += '<span class="lv">' + d.l + '</span></div>';
  for (const s of d.s) {
    h += '<div class="sense"><div class="m">' + hi(s.m) + '</div>';
    const bits = [];
    if (s.y.length) bits.push('바꿔 쓰기 <span class="tag">' + s.y.map(hi).join(', ') + '</span>');
    if (d.a.length) bits.push('반대말 <span class="tag">' + d.a.map(hi).join(', ') + '</span>');
    if (bits.length) h += '<div class="tags">' + bits.join(' · ') + '</div>';
    h += '<ol>';
    for (const [en, ko] of s.e) {
      h += '<li><div class="en">' + hi(en) + '</div><div class="ko">' + hi(ko) + '</div></li>';
    }
    h += '</ol></div>';
  }
  return h + '</div>';
}

function render() {
  const hits = DATA.filter(matches);
  if (hits.length === 0) {
    $list.innerHTML = '<p class="empty">찾는 단어가 없어요.</p>';
    return;
  }
  let h = hits.slice(0, shown).map(card).join('');
  if (hits.length > shown) {
    h += '<button class="more" id="more">더 보기 (' + (hits.length - shown) + '개 남음)</button>';
  }
  $list.innerHTML = h;
  const $more = document.getElementById('more');
  if ($more) $more.onclick = () => { shown += PAGE; render(); };
}

render();
</script>
</body>
</html>
`;

writeFileSync(`${OUT_DIR}/vocab.html`, html, 'utf8');

console.log(`표제어 ${totals.words} · 뜻 ${totals.senses} · 예문 ${totals.examples}`);
console.log(`  ${OUT_DIR}/vocab.csv   — 엑셀·구글시트용 (${rows.length - 1}행)`);
console.log(`  ${OUT_DIR}/vocab.html  — 폰에서 열어 보는 용도`);
