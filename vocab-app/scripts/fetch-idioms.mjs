#!/usr/bin/env node
/**
 * 숙어 뜻을 영어 위키낱말사전에서 받아 온다.
 *
 *   node scripts/fetch-idioms.mjs idioms-ref.json
 *
 * **왜 fetch-reference.mjs 를 안 쓰는가.** 그쪽은 이미 levels/*.ts 에 적혀
 * 있는 표제어만 찾는다. 아직 데이터를 안 적은 숙어는 그 목록에 없어서
 * 닭이 먼저냐 달걀이 먼저냐가 된다. 여기서는 data/idiom-vocabulary.txt 를
 * 직접 읽는다.
 *
 * **왜 낱말마다 묻지 않는가.** 처음에는 REST API 로 하나씩 물었다. 405번을
 * 두드리니 위키미디어가 429(요청 제한)로 막았고, 그때 지나간 것들이 전부
 * "사전에 없음"으로 적혔다. 멀쩡한 숙어 347개가 조용히 빠질 뻔했다.
 * 지금은 action API 로 묶어 받고, 받은 문서를 디스크에 쌓아 이어받는다.
 * 그래도 한참 받다 보면 막히는데, 그때는 쌓아 둔 것 다음부터 다시 시작한다.
 *
 * 받는 것은 원문 위키텍스트다. 뜻풀이는 `#` 로 시작하는 줄, 용례는 `#:` 의
 * `{{ux|en|...}}` 다. 겉모습(HTML)보다 원문이 오히려 다루기 쉽다.
 *
 * 결과물은 저장소에 넣지 않는다(위키낱말사전은 CC BY-SA). 뜻을 적을 때
 * 옆에 놓고 보는 용도다.
 *
 * 어떻게 확인했는지는 `via` 에 남는다. `phrase` 는 구 자체가 사전 표제어인 것,
 * `head` 는 사전이 구로 싣지 않아 핵심 낱말의 뜻으로 되짚은 것이다.
 * 둘 다 아니면 `found: false` — **그런 숙어는 데이터에 넣지 않는다.**
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const OUT = process.argv[2] ?? 'idioms-ref.json';
const API = 'https://en.wiktionary.org/w/api.php';

/** 표제어 목록. 층 표시(*)는 떼고 읽는다. */
const words = readFileSync('data/idiom-vocabulary.txt', 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => l.replace(/\*+$/, ''));

console.error(`찾을 숙어 ${words.length}개`);

/**
 * 'be aware of' 처럼 be동사가 앞에 붙은 것은 사전 표제어가 아니다.
 * 사전은 'aware of' 로 싣는다. 못 찾으면 be를 떼고 한 번 더 찾는다.
 */
function candidates(word) {
  const out = [word];
  if (word.startsWith('be ')) out.push(word.slice(3));
  if (word.includes("one's")) out.push(word.replace(/one's/g, "someone's"));
  if (/\b[AB]\b/.test(word)) {
    out.push(word.replace(/\b[AB]\b/g, '').replace(/\s+/g, ' ').trim());
  }
  return out;
}

/**
 * curl 로 받는다.
 *
 * node 의 fetch 는 HTTPS_PROXY 를 보지 않아서 프록시 뒤에서는 요청이 전부
 * 조용히 실패한다. 그걸 "사전에 없음"으로 적을 뻔했다. curl 은 프록시와
 * 인증서를 이미 알고 있다.
 */
function get(url) {
  const body = execFileSync(
    'curl',
    ['-sS', '--max-time', '90', '-w', '\\n%{http_code}', '-A', 'gomtang-voca/1.0 (learning app)', url],
    { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 },
  );
  const cut = body.lastIndexOf('\n');
  const status = Number(body.slice(cut + 1).trim());
  if (status !== 200) throw new Error(`HTTP ${status}`);
  return JSON.parse(body.slice(0, cut));
}

/**
 * 끊기면 다시 묻는다.
 *
 * `make` · `pass` 같은 낱말 문서는 통째로 받으면 수 MB다. 그런 것이 한 묶음에
 * 여럿 들어가면 연결이 중간에 끊긴다(Connection reset). 한 번 끊겼다고
 * 그 묶음을 통째로 포기하면 숙어 열댓 개가 조용히 빠지므로 다시 묻는다.
 */
function getWithRetry(url) {
  let last;
  let wait = 5;
  for (let i = 0; i < 6; i++) {
    try {
      return get(url);
    } catch (e) {
      last = e;
      execFileSync('sleep', [String(wait)]);
      wait *= 2;
    }
  }
  throw last;
}

/** 위키텍스트 표시를 걷어내고 사람이 읽는 문장만 남긴다. */
function plain(s) {
  return s
    // {{l|en|endure}} · {{m|en|x}} → endure
    .replace(/\{\{(?:l|m|w)\|en\|([^|}]+)(?:\|[^}]*)?\}\}/g, '$1')
    // {{q|someone or something}} · {{qualifier|...}} → (someone or something)
    .replace(/\{\{(?:q|qualifier|gloss)\|([^|}]+)(?:\|[^}]*)?\}\}/g, '($1)')
    // {{lb|en|transitive|idiomatic}} → [transitive, idiomatic]
    .replace(/\{\{lb\|en\|([^}]*)\}\}/g, (_, x) => `[${x.split('|').filter((t) => !t.includes('=')).join(', ')}]`)
    // 남은 틀은 통째로 버린다
    .replace(/\{\{[^}]*\}\}/g, '')
    // [[target|보이는 말]] · [[낱말]]
    .replace(/\[\[(?:[^\]|]*\|)?([^\]|]+)\]\]/g, '$1')
    .replace(/'''|''/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 영어 구역만 잘라낸다. 같은 철자가 다른 언어에도 있으면 뜻이 섞인다. */
function englishSection(wikitext) {
  const at = wikitext.indexOf('==English==');
  if (at < 0) return null;
  const rest = wikitext.slice(at + 11);
  // 다음 언어 구역(또는 구분선)까지
  const end = rest.search(/\n----|\n==[^=]/);
  return end < 0 ? rest : rest.slice(0, end);
}

/** `===Verb===` 같은 품사 머리와 그 아래 뜻풀이·용례를 뽑는다. */
function parsePage(wikitext) {
  const body = englishSection(wikitext);
  if (!body) return [];

  const blocks = [];
  let pos = null;
  let current = null;

  for (const raw of body.split('\n')) {
    const head = raw.match(/^={3,5}\s*([^=]+?)\s*={3,5}$/);
    if (head) {
      pos = head[1].trim();
      continue;
    }
    if (!pos) continue;

    // 뜻풀이 — '#' 하나로 시작하고 그다음이 ':' '*' 가 아닌 줄
    if (/^#[^:*]/.test(raw) || raw === '#') {
      const text = plain(raw.slice(1));
      if (!text) continue;
      current = { text, examples: [] };
      blocks.push({ pos, ...current });
      continue;
    }
    // 용례 — {{ux|en|...}} 안의 문장
    const ux = raw.match(/^#+:\s*\{\{(?:ux|usex|uxi)\|en\|([^|}]+)/);
    if (ux && blocks.length > 0) blocks[blocks.length - 1].examples.push(plain(ux[1]));
  }

  return blocks;
}

/**
 * 한 번에 15개씩.
 *
 * API 는 50개까지 받지만, 낱말 문서가 수 MB인 것이 섞이면 응답이 커져
 * 연결이 끊긴다. 15개면 요청 수(약 40번)도 제한에 안 걸린다.
 */
function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

/**
 * 구(句)로 못 찾았을 때 되짚어 볼 핵심 낱말.
 *
 * 위키낱말사전은 **뜻이 낱말에서 그대로 읽히는 구**를 표제어로 싣지 않는다
 * (`refer to`, `adhere to`, `insist on`, `resort to` …). 우리 학교에서는
 * 숙어로 가르치지만 사전 기준으로는 `refer` + `to` 일 뿐이다.
 *
 * 그런 것을 "사전에 없으니 못 가르친다"고 빼면 실제로 시험에 나오는 숙어
 * 127개가 통째로 빠진다. 확인할 길이 없는 것과, 사전이 구로 싣지 않을 뿐인
 * 것은 다르다. 후자는 **핵심 낱말의 뜻으로 확인한다** — `adhere` 가 '들러붙다,
 * 고수하다'인 것을 확인하면 `adhere to` 의 뜻도 확인한 셈이다.
 *
 * 어느 쪽으로 확인했는지는 `via` 에 남긴다. 구로 확인한 것과 낱말로 확인한
 * 것은 근거의 무게가 다르고, 사람이 대조표를 볼 때 그 차이를 알아야 한다.
 */
function headWord(word) {
  const parts = word.split(/\s+/).filter((w) => w !== 'be');
  // 'in charge of' 처럼 전치사로 시작하면 두 번째 낱말이 알맹이다.
  const skip = new Set(['in', 'on', 'at', 'by', 'for', 'to', 'with', 'of', 'a', 'the', 'out']);
  return parts.find((p) => !skip.has(p) && /^[a-z]/.test(p)) ?? parts[0];
}

/* 찾을 제목을 모두 모은다. 표제어 하나가 후보를 여럿 낼 수 있다. */
const titles = new Set();
for (const w of words) {
  for (const c of candidates(w)) titles.add(c);
  titles.add(headWord(w));
}

/**
 * 받아 둔 문서를 디스크에 쌓는다.
 *
 * 위키미디어는 한참 받다가 429로 막는다. 그때마다 처음부터 다시 받으면 앞부분에서
 * 또 막혀 영영 끝나지 않는다. 이미 받은 문서는 건너뛰고, 뜻풀이를 뽑기 전
 * 원문 그대로를 쌓아 둔다 — 뽑는 규칙을 고칠 때 다시 받지 않아도 된다.
 */
const CACHE = `${OUT}.pages.json`;
const pages = new Map(existsSync(CACHE) ? Object.entries(JSON.parse(readFileSync(CACHE, 'utf8'))) : []);
/** 없는 문서도 기억한다. 안 그러면 없는 것을 매번 다시 묻는다. */
const NONE = ' 없음';
if (pages.size > 0) console.error(`이어받기: 이미 받아 둔 문서 ${pages.size}개`);

const todo = [...titles].filter((t) => !pages.has(t));
for (const [i, group] of chunk(todo, 15).entries()) {
  const url =
    `${API}?action=query&format=json&formatversion=2&prop=revisions&rvprop=content&rvslots=main` +
    `&titles=${encodeURIComponent(group.join('|'))}`;
  const json = getWithRetry(url);
  for (const p of json.query?.pages ?? []) {
    const content = p.missing ? NONE : (p.revisions?.[0]?.slots?.main?.content ?? NONE);
    pages.set(p.title, content);
  }
  // 물어본 것 중 응답에 안 나온 제목(정규화로 이름이 바뀐 경우)도 표시해 둔다.
  for (const t of group) if (!pages.has(t)) pages.set(t, NONE);

  writeFileSync(CACHE, JSON.stringify(Object.fromEntries(pages)), 'utf8');
  console.error(`  ${Math.min((i + 1) * 15, todo.length)}/${todo.length} …`);
  // 몰아치면 막힌다. 한 묶음 받고 한 숨 쉰다.
  execFileSync('sleep', ['1']);
}

const out = {};
for (const word of words) {
  let blocks = [];
  let matched = null;
  for (const c of candidates(word)) {
    const page = pages.get(c);
    if (!page || page === NONE) continue;
    blocks = parsePage(page);
    if (blocks.length > 0) {
      matched = c;
      break;
    }
  }
  if (blocks.length > 0) {
    out[word] = { found: true, via: 'phrase', title: matched, blocks };
    continue;
  }

  // 구로 못 찾았으면 핵심 낱말로 되짚는다.
  const head = headWord(word);
  const headPage = pages.get(head);
  const headBlocks = headPage && headPage !== NONE ? parsePage(headPage) : [];
  out[word] =
    headBlocks.length > 0
      ? { found: true, via: 'head', title: head, blocks: headBlocks.slice(0, 6) }
      : { found: false };
}

writeFileSync(OUT, JSON.stringify(out, null, 1), 'utf8');

const missing = words.filter((w) => !out[w].found);
const byPhrase = words.filter((w) => out[w].via === 'phrase');
const byHead = words.filter((w) => out[w].via === 'head');
const withExample = words.filter((w) => out[w].found && out[w].blocks.some((b) => b.examples.length > 0));
console.error(
  `\n사전에서 확인 ${words.length - missing.length}/${words.length}\n` +
    `  구 자체가 표제어인 것 ${byPhrase.length}\n` +
    `  핵심 낱말로 되짚은 것 ${byHead.length}\n` +
    `  사전 용례가 딸려 온 것 ${withExample.length}\n` +
    `못 찾은 것 ${missing.length}개:\n  ${missing.join('\n  ') || '(없음)'}\n`,
);
