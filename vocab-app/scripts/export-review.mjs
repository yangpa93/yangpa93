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
 * 만드는 것.
 *   영어-단어.csv   — 표제어 · 품사 · 뜻 · 유의어 · 반대말 · 예문 · 해석
 *   국어-어휘.csv   — 표제어 · 한자 · 한자확인 · 갈래 · 분류 · 뜻 · 예문 · 출처
 *   일상-문장.csv   — 주제 · 표현 · 문장 · 해석 · 언제 쓰는 말인지
 *   vocab.csv       — 영어-단어.csv 와 같은 것. 예전 이름이라 같이 둔다.
 *   vocab.html      — 폰에서 그냥 열어 보는 용도(영어). 검색과 레벨 고르기.
 *
 * 레벨 파일을 import 하지 않고 글자로 읽는 이유: 이 스크립트는 순수
 * node 로 돌아야 한다(엑스포 없이). audit.mjs 도 같은 방식이다.
 *
 * ── 글자로 읽는 것의 대가, 그리고 그 대가를 갚는 법 ─────────
 *
 * 글자로 읽으면 데이터 모양이 조금만 바뀌어도 **조용히** 안 읽힌다. 실제로
 * 그렇게 당했다 — 윈도우에서 이 스크립트를 돌리면 예문이 **하나도** 안 나왔다.
 * 파일이 CRLF 라 줄 끝에 `\r` 이 붙는데 예문 규칙만 줄 끝(`$`)을 물고 있어서
 * 전부 흘렀다. 그런데 화면에는 "예문 0" 이라고만 적혀서, 예문이 원래 없는
 * 것인지 못 읽은 것인지 알 수가 없었다. 확인하려고 만든 도구가 거짓말을 한
 * 것이다.
 *
 * 그래서 **뽑고 나서 스스로 따져 본다**(맨 아래). 예문이 없는 표제어가 있으면
 * 몇 개인지 적고 0 이 아닌 값으로 끝낸다. 뽑히지 않은 것을 뽑힌 것처럼
 * 내놓느니 시끄럽게 실패하는 편이 낫다.
 */

import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';

const OUT_DIR = process.argv[2] ?? 'review';
const LEVEL_DIR = 'src/data/levels';
const KO_DIR = 'src/data/korean/levels';
const DAILY_FILE = 'src/data/daily/phrases.ts';

/**
 * 줄로 자른다. **`\r` 을 반드시 떼어 낸다.**
 *
 * 저장소 파일은 윈도우에서 CRLF 로 받아진다. `split('\n')` 만 하면 줄 끝에
 * `\r` 이 남고, 줄 끝을 물고 있는 규칙은 전부 빗나간다. 리눅스에서는 잘 돌고
 * 윈도우에서만 조용히 비는 — 가장 찾기 어려운 모양의 고장이다.
 */
const lines = (src) => src.split(/\r?\n/);

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

  for (const [i, line] of lines(src).entries()) {
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

/* ------------------------------------------------------------------ */
/* 국어 어휘                                                            */
/* ------------------------------------------------------------------ */

/** 화면에 쓰는 갈래 이름. 파일 안에서는 영어 낱말로 적혀 있다. */
const KO_CATEGORY = {
  idiom: '사자성어',
  concept: '개념어',
  classic: '고전',
  csat: '수능 어휘',
};

const koEntries = [];

for (const file of readdirSync(KO_DIR)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts')
  .sort((a, b) => LEVEL_ORDER.indexOf(a.replace(/\.ts$/, '')) - LEVEL_ORDER.indexOf(b.replace(/\.ts$/, '')))) {
  const src = readFileSync(`${KO_DIR}/${file}`, 'utf8');
  const level = file.replace(/\.ts$/, '');

  let category = '';
  let cur = null;

  for (const [i, line] of lines(src).entries()) {
    // 갈래가 바뀌는 자리. defineKoLevel('m1-1', 'idiom', [
    const cat = line.match(/defineKoLevel\('[^']+', '([a-z]+)'/);
    if (cat) {
      category = KO_CATEGORY[cat[1]] ?? cat[1];
      continue;
    }

    /*
     * 표제어 한 줄. 값들이 모두 여는 줄에 있다.
     *   { w: '고진감래', h: '苦盡甘來', m: '고생 끝에…', e: [
     *   { w: '감정이입', f: '문학', m: '화자의 감정을…', e: [
     * h(한자) · v(한자 확인됨) · f(분류) 는 있을 수도 없을 수도 있다.
     */
    const w = line.match(/^\s*\{ w: '((?:[^'\\]|\\.)*)',(.*), e: \[/);
    if (w) {
      const rest = w[2];
      const field = (name) => {
        const m = rest.match(new RegExp(`${name}: '((?:[^'\\\\]|\\\\.)*)'`));
        return m ? unq(m[1]) : '';
      };
      cur = {
        level,
        line: i + 1,
        category,
        word: unq(w[1]),
        hanja: field('h'),
        // v: false 는 '사전에서 한자를 확인하지 못했다'는 뜻이다. 안 적혀
        // 있으면 확인된 것으로 본다 — 예외만 표시하는 편이 눈에 띈다.
        hanjaChecked: /\bv: false\b/.test(rest) ? '못 함' : field('h') ? '확인' : '',
        field: field('f'),
        meaning: field('m'),
        examples: [],
      };
      koEntries.push(cur);
      continue;
    }

    // 예문 한 줄. { t: '…' } · 고전이면 g(현대어 풀이)·s(출처)가 붙는다.
    const ex = line.match(/^\s*\{ t: '((?:[^'\\]|\\.)*)'(.*)\},?\s*$/);
    if (ex && cur) {
      const rest = ex[2];
      const sub = (name) => {
        const m = rest.match(new RegExp(`${name}: '((?:[^'\\\\]|\\\\.)*)'`));
        return m ? unq(m[1]) : '';
      };
      cur.examples.push({ text: unq(ex[1]), gloss: sub('g'), source: sub('s') });
    }
  }
}

/* ------------------------------------------------------------------ */
/* 일상 생활 문장                                                       */
/* ------------------------------------------------------------------ */

/**
 * 이쪽은 JSON 그대로 박혀 있다(build-daily.mjs 가 그렇게 만든다). 그래서
 * 글자로 더듬을 것 없이 통째로 읽어 파싱한다 — 읽을 수 있는 것을 굳이
 * 규칙으로 더듬으면 어긋날 자리만 는다.
 */
const dailyThemes = (() => {
  const src = readFileSync(DAILY_FILE, 'utf8');
  /*
   * 여는 대괄호를 `= [` 로 찾는다. 그냥 `[` 를 찾으면 **타입에 붙은 것**이
   * 먼저 걸린다(`DailyTheme[]`). 실제로 그것 때문에 하나도 못 읽었고,
   * 아래 자체 검사가 잡았다.
   */
  const at = src.indexOf('DAILY_THEMES');
  if (at < 0) return [];
  const open = src.indexOf('= [', at);
  const end = src.lastIndexOf('];');
  if (open < 0 || end < 0) return [];
  try {
    return JSON.parse(src.slice(open + 2, end + 1));
  } catch {
    return [];
  }
})();

/** 반대말 표. 짝은 양방향이라 양쪽에 채운다. */
const antonyms = {};
{
  const src = readFileSync('src/data/antonyms.ts', 'utf8');
  for (const line of lines(src)) {
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

/**
 * 엑셀이 한글을 안 깨뜨리게 맨 앞에 BOM 을 붙인다.
 *
 * ── 손본 표를 말없이 덮어쓰지 않는다 ────────────────────────
 *
 * 이 표들은 **사람이 그 위에 직접 고쳐 넣는 물건**이다. 사자성어 한자를
 * 사전에서 찾아 확인하고, 잘 안 쓰는 말을 지우고, 뜻을 다듬는다. 그렇게
 * 반나절을 들인 파일 위로 `npm run export` 가 아무 말 없이 새 표를 부어
 * 버리면 그 반나절이 통째로 사라진다.
 *
 * 그래서 지금 있는 것이 우리가 만들 것과 다르면 **먼저 옆에 치워 둔다.**
 * 되돌릴 수 없는 일은 하지 않는다.
 */
function writeCsv(name, table) {
  const path = `${OUT_DIR}/${name}`;
  const next = '﻿' + table.map((r) => r.map(csvCell).join(',')).join('\n') + '\n';

  try {
    const now = readFileSync(path, 'utf8');
    if (now !== next) {
      const stamp = new Date().toISOString().slice(0, 16).replace(/[-:]/g, '').replace('T', '-');
      const kept = `${OUT_DIR}/${name.replace(/\.csv$/, '')}.손본것-${stamp}.csv`;
      writeFileSync(kept, now, 'utf8');
      saved.push(kept);
    }
  } catch {
    // 아직 없는 파일. 치워 둘 것이 없다.
  }

  writeFileSync(path, next, 'utf8');
}

/** 덮어쓰기 전에 치워 둔 것들. 맨 아래에 어디 있는지 적는다. */
const saved = [];

writeCsv('영어-단어.csv', rows);
// 예전 이름. 이걸로 알고 계신 분이 있어 같이 둔다.
writeCsv('vocab.csv', rows);

/* ── 국어 어휘 ─────────────────────────────────────────────── */

const koRows = [
  ['레벨', '갈래', '표제어', '한자', '한자 확인', '분류', '뜻', '예문', '현대어 풀이', '출처'],
];
for (const e of koEntries) {
  const head = [
    LEVEL_LABEL[e.level],
    e.category,
    e.word,
    e.hanja,
    e.hanjaChecked,
    e.field,
    e.meaning,
  ];
  if (e.examples.length === 0) {
    koRows.push([...head, '', '', '']);
    continue;
  }
  for (const x of e.examples) koRows.push([...head, x.text, x.gloss, x.source]);
}
writeCsv('국어-어휘.csv', koRows);

/* ── 일상 생활 문장 ─────────────────────────────────────────── */

const dailyRows = [['주제', '표현', '원래 표제어', '문장', '해석', '언제 쓰는 말인지']];
for (const t of dailyThemes) {
  for (const p of t.phrases ?? []) {
    dailyRows.push([t.label, p.word, p.keyExpression, p.en, p.ko, p.note]);
  }
}
writeCsv('일상-문장.csv', dailyRows);

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

/* ------------------------------------------------------------------ */
/* 뽑은 것을 스스로 따져 본다                                            */
/* ------------------------------------------------------------------ */

/*
 * **확인하려고 만든 도구가 거짓말을 하면 안 된다.**
 *
 * 윈도우에서 이 스크립트는 예문을 하나도 못 뽑고 있었다(줄 끝 `\r`). 그런데
 * 화면에는 "예문 0" 이라고만 적혀서, 예문이 원래 없는 것인지 못 읽은 것인지
 * 알 수가 없었다. 글자로 읽는 도구는 데이터 모양이 조금만 바뀌어도 조용히
 * 비는데, 조용히 비는 것이 이 도구에서는 제일 나쁜 일이다.
 *
 * 그래서 뽑고 나서 따진다. 이상하면 시끄럽게 실패한다.
 */
const koExamples = koEntries.reduce((n, e) => n + e.examples.length, 0);
const dailyCount = dailyThemes.reduce((n, t) => n + (t.phrases?.length ?? 0), 0);

const complaints = [];
if (totals.words === 0) complaints.push('영어 표제어를 하나도 못 읽었습니다.');
if (totals.examples === 0) complaints.push('영어 예문을 하나도 못 읽었습니다.');
if (koEntries.length === 0) complaints.push('국어 표제어를 하나도 못 읽었습니다.');
if (koExamples === 0) complaints.push('국어 예문을 하나도 못 읽었습니다.');
if (dailyCount === 0) complaints.push('일상 문장을 하나도 못 읽었습니다.');

/* 낱낱이 비어 있는 것도 센다. 데이터 구멍일 수도, 못 읽은 것일 수도 있다. */
const enNoEx = entries.filter((e) => e.senses.every((s) => s.examples.length === 0));
const koNoEx = koEntries.filter((e) => e.examples.length === 0);

console.log('');
console.log('  뽑았습니다 ' + '─'.repeat(46));
console.log('');
console.log(`  영어      표제어 ${totals.words} · 뜻 ${totals.senses} · 예문 ${totals.examples}`);
console.log(`  국어      표제어 ${koEntries.length} · 예문 ${koExamples}`);
console.log(`  일상 문장 ${dailyCount}`);
console.log('');
console.log(`  ${OUT_DIR}/영어-단어.csv   (${rows.length - 1}행)`);
console.log(`  ${OUT_DIR}/국어-어휘.csv   (${koRows.length - 1}행)`);
console.log(`  ${OUT_DIR}/일상-문장.csv   (${dailyRows.length - 1}행)`);
console.log(`  ${OUT_DIR}/vocab.html      — 폰에서 열어 보는 용도(영어)`);
console.log('');
console.log('  엑셀로 여시면 됩니다. 한글이 안 깨지게 만들어 두었습니다.');

if (saved.length > 0) {
  console.log('');
  console.log('  ℹ️  손보신 표가 있어서 덮어쓰기 전에 옆에 치워 두었습니다');
  for (const p of saved) console.log(`      ${p}`);
  console.log('');
  console.log('     고치신 것을 앱에 넣으시려면 (국어) :');
  console.log('       npm run apply-korean            무엇이 바뀌는지 보여만 줍니다');
  console.log('       npm run apply-korean -- --write  실제로 적습니다');
}

if (enNoEx.length > 0 || koNoEx.length > 0) {
  console.log('');
  console.log('  ⚠️  예문이 하나도 없는 표제어');
  if (enNoEx.length > 0) {
    console.log(`      영어 ${enNoEx.length}개 — ${enNoEx.slice(0, 5).map((e) => e.word).join(', ')}`);
  }
  if (koNoEx.length > 0) {
    console.log(`      국어 ${koNoEx.length}개 — ${koNoEx.slice(0, 5).map((e) => e.word).join(', ')}`);
  }
}

if (complaints.length > 0) {
  console.log('');
  for (const c of complaints) console.log(`  ❌ ${c}`);
  console.log('');
  console.log('     데이터가 비었거나, 이 스크립트가 못 읽고 있는 것입니다.');
  console.log('     뽑히지 않은 것을 뽑힌 것처럼 내놓지 않으려고 여기서 멈춥니다.');
  console.log('');
  process.exitCode = 1;
} else {
  console.log('');
}
