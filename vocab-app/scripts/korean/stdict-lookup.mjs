/**
 * 표준국어대사전에서 표제어를 찾아 뜻·한자·전문 분야를 받아 온다.
 *
 *     node scripts/korean/stdict-lookup.mjs korean/csat-candidates.json
 *
 * **왜 사전에서 받아 오는가.** 수능 어휘를 보충하면서 뜻풀이까지 내가 쓰면
 * 원본 엑셀이 틀렸던 것과 똑같은 일이 반복된다. 그래서 이 스크립트는
 * 표제어 목록만 받고, 한자·품사·전문 분야·뜻풀이는 전부 국립국어원
 * 표준국어대사전이 준 것을 그대로 쓴다. 사전에 없는 낱말은 버린다.
 *
 * 결과는 korean/stdict.json 에 쌓인다. 이미 찾아 둔 것은 다시 묻지 않으므로
 * 중간에 끊겨도 그냥 다시 돌리면 이어서 받는다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

/*
 * Node 의 fetch 는 HTTPS_PROXY 를 스스로 보지 않는다. 회사·학교처럼 프록시를
 * 거쳐야 하는 망에서는 NODE_USE_ENV_PROXY=1 이 없으면 요청이 전부 403 으로
 * 떨어진다. 그런데 이 값은 fetch 가 처음 불리기 전, 런타임이 뜨는 시점에
 * 정해진다. 스크립트 안에서 process.env 에 넣어 봐야 이미 늦다.
 *
 * 그래서 값이 없으면 그 값을 얹어 자기 자신을 한 번 다시 띄운다. 쓰는 쪽에서
 * 리눅스냐 파워셸이냐에 따라 환경 변수 지정법을 달리 외우지 않아도 된다.
 */
if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const r = spawnSync(process.execPath, [...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const CACHE = 'korean/stdict.json';
const BASE = 'https://stdict.korean.go.kr/search/searchResult.do';

/** 사전 서버에 부담을 주지 않도록 한 번에 하나씩, 조금 쉬어 가며 */
const DELAY_MS = 350;

/** 사전이 한 쪽에 내려보내는 개수. pageSize 를 키워도 이 값은 안 바뀐다. */
const PAGE_SIZE = 10;

/**
 * 한 낱말에 넘길 쪽의 최대치.
 *
 * 동음이의어가 수십 개인 낱말이 있는데, 그런 낱말은 어차피 우리가 찾는
 * 뜻이 앞쪽에 있다. 무한정 넘기면 사전 서버만 괴롭힌다.
 */
const MAX_PAGES = 6;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** `<li>` 하나에서 한 뜻을 뽑는다. */
function parseEntries(html, want) {
  const out = [];
  const liRe = /<li>\s*<dl>\s*<dt>([\s\S]*?)<\/dt>/g;

  for (const [, block] of html.matchAll(liRe)) {
    const head = block.match(
      /<a href="\/search\/searchView\.do\?word_no=(\d+)[^"]*"[^>]*>([\s\S]*?)<\/a>/,
    );
    if (!head) continue;

    const [, wordNo, rawWord] = head;
    // 동음이의어에는 어깨번호가 <sup>2</sup>로 붙는다(연역1 煙役 / 연역2 演繹).
    // 태그를 걷어내고 번호와 사이시옷 표시(귀^납)까지 지워야 표제어가 남는다.
    const word = rawWord
      .replace(/<[^>]+>/g, '')
      .replace(/\d+$/, '')
      .replace(/[\^\-]/g, '')
      .trim();
    if (word !== want) continue;

    // 사전은 한자를 호환용 코드로 내려보내는 일이 있다(滑稽). 정규화하지
    // 않으면 눈으로는 같은 글자인데 문자열 비교에서 어긋난다.
    const hanja = (block.match(/class="t_gray hanja_font">\(([^)]*)\)/) || [, ''])[1]
      .normalize('NFKC')
      .trim();
    const pos = (block.match(/「([^」]+)」/) || [, ''])[1].trim();

    const data = block.match(/<font class="dataLine">([\s\S]*?)<\/font>/);
    if (!data) continue;
    let text = data[1]
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim();

    // 『철학』처럼 앞에 붙는 전문 분야를 떼어 따로 담는다.
    const field = (text.match(/^『([^』]+)』/) || [, ''])[1].trim();
    text = text.replace(/^『[^』]+』\s*/, '');
    // 끝에 붙는 유의어 표시(≒귀납 추리.)는 뜻풀이가 아니다.
    const synonyms = (text.match(/≒([^.]*)\.?\s*$/) || [, ''])[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    text = text.replace(/≒[^.]*\.?\s*$/, '').trim();

    out.push({ wordNo, word, hanja, pos, field, meaning: text, synonyms });
  }

  return out;
}

/** 한 쪽을 받아 온다. */
async function fetchPage(word, page) {
  const url = `${BASE}?pageIndex=${page}&searchKeyword=${encodeURIComponent(word)}`;
  const res = await fetch(url, {
    headers: { 'user-agent': 'gomtangivoca-vocab-builder/1.0' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

/**
 * 동음이의어를 한 개도 빠뜨리지 않고 받는다.
 *
 * 사전은 한 쪽에 10개씩만 내려보낸다(pageSize 를 키워도 무시한다).
 * 양도는 12개가 실려 있는데 우리가 찾는 讓渡 가 하필 둘째 쪽에 있었다.
 * 첫 쪽에서 총 개수를 읽어 필요한 만큼 더 넘긴다.
 */
async function lookup(word) {
  const first = await fetchPage(word, 1);
  const out = parseEntries(first, word);

  const total = Number(
    (first.replace(/<[^>]+>/g, ' ').match(/찾기 결과 \(총\s*([\d,]+)\s*개\)/) || [, '0'])[1]
      .replace(/,/g, ''),
  );
  const pages = Math.min(Math.ceil(total / PAGE_SIZE), MAX_PAGES);

  for (let p = 2; p <= pages; p++) {
    await sleep(DELAY_MS);
    out.push(...parseEntries(await fetchPage(word, p), word));
  }
  return out;
}

async function main() {
  const listPath = process.argv[2];
  if (!listPath) {
    console.error('사용법: node scripts/korean/stdict-lookup.mjs <표제어 목록.json>');
    process.exit(1);
  }

  const wanted = JSON.parse(readFileSync(listPath, 'utf8'));
  const cache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};

  const todo = wanted.filter((w) => !(w.word in cache));
  console.log(`  받을 것 ${todo.length}개 (이미 있는 것 ${wanted.length - todo.length}개)`);

  let ok = 0;
  let miss = 0;
  for (const [i, item] of todo.entries()) {
    try {
      const senses = await lookup(item.word);
      if (senses.length === 0) {
        cache[item.word] = null;
        miss++;
      } else {
        cache[item.word] = { ...item, senses };
        ok++;
      }
    } catch (e) {
      console.log(`  ! ${item.word} — ${e.message}`);
      // 실패는 캐시에 남기지 않는다. 다시 돌리면 재시도한다.
    }

    if ((i + 1) % 25 === 0 || i === todo.length - 1) {
      writeFileSync(CACHE, JSON.stringify(cache, null, 1) + '\n', 'utf8');
      process.stdout.write(`\r  ${i + 1}/${todo.length}  찾음 ${ok} · 없음 ${miss}   `);
    }
    await sleep(DELAY_MS);
  }

  writeFileSync(CACHE, JSON.stringify(cache, null, 1) + '\n', 'utf8');
  console.log(`\n  → ${CACHE}`);

  const missing = Object.entries(cache)
    .filter(([, v]) => v === null)
    .map(([k]) => k);
  if (missing.length) {
    console.log(`\n  사전에 없는 낱말 ${missing.length}개 (버립니다)`);
    console.log(`    ${missing.slice(0, 20).join(', ')}${missing.length > 20 ? ' …' : ''}`);
  }
}

main();
