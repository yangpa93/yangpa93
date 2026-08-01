/**
 * 위키문헌에서 고전 원문을 받아 korean/classics.json 으로 저장한다.
 *
 *     node scripts/korean/fetch-classics.mjs
 *
 * **왜 원문을 통째로 받는가.** 고전 어휘 145개를 낱말마다 검색하면 145번을
 * 물어야 하고, 검색이 돌려주는 것은 요약이지 원문이 아니다. 출처를 정확히
 * 달려면 원문을 직접 읽어야 한다 — '관동별곡에 나온다'고 어림잡아 적으면
 * 그것이 곧 지어낸 출처다.
 *
 * 작품 스무남은 편을 한 번씩 받아 두면 145개 어휘 대부분이 그 안에 있다.
 * 고전 어휘라는 게 원래 이 작품들에서 뽑은 것이기 때문이다.
 *
 * 위키문헌 본문은 CC BY-SA 다. 원문 자체는 저작권이 끝난 옛 글이다.
 */

import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

if (!process.env.NODE_USE_ENV_PROXY && (process.env.HTTPS_PROXY || process.env.https_proxy)) {
  const r = spawnSync(process.execPath, [...process.argv.slice(1)], {
    stdio: 'inherit',
    env: { ...process.env, NODE_USE_ENV_PROXY: '1' },
  });
  process.exit(r.status ?? 1);
}

const API = 'https://ko.wikisource.org/w/api.php';
const OUT = 'korean/classics.json';
/**
 * 요청 사이 간격.
 *
 * 위키문헌은 빠르게 연달아 부르면 429(요청 과다)를 돌려준다. 스무남은 편을
 * 한 번 받고 마는 일이라 느긋하게 간다.
 */
const DELAY_MS = 1200;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * 받아 올 작품들. `title` 은 위키문헌 문서 이름, `source` 는 아이에게
 * 보여줄 출처 표기다.
 *
 * 고전 어휘가 가장 많이 나오는 갈래부터 담았다.
 *   향가      — 서동요·헌화가·제망매가·찬기파랑가·처용가
 *   고려가요  — 청산별곡·가시리·동동·서경별곡·정석가·정과정·이상곡
 *   가사      — 정철 5편, 상춘곡, 면앙정가, 규원가, 누항사, 만분가
 *   시조·악장 — 어부사시사, 산중신곡, 도산십이곡, 용비어천가
 *
 * ── 제목을 적을 때 걸려 넘어진 곳 ─────────────────────────────
 *
 * 위키문헌 문서 이름은 **현대 표기가 아닌 것이 있다.** 속미인곡은
 * `송강가사/쇽미인곡`, 성산별곡은 `송강가사/셩산별곡` 이다. 현대 표기로
 * 적어 두었더니 다섯 편이 조용히 안 받아졌고, 그게 "위키문헌에 본문이
 * 없다"고 잘못 적히는 바람에 한동안 그런 줄 알았다. 문서는 처음부터 있었다.
 *
 * 오우가는 그 자체로 문서가 없고 `산중신곡` 안에 들어 있다. 넘겨주기가
 * 걸려 있어 받아지기는 하는데, 그러면 만흥 같은 다른 편의 행까지 '오우가'
 * 출처로 붙는다. 그래서 출처를 산중신곡으로 적는다 — 인용은 정확해야 한다.
 */
const WORKS = [
  // 향가
  { title: '서동요', source: '서동요' },
  { title: '헌화가', source: '헌화가' },
  { title: '제망매가', source: '월명사, 제망매가' },
  { title: '찬기파랑가', source: '충담사, 찬기파랑가' },
  { title: '처용가', source: '처용가' },
  // 고려가요
  { title: '청산별곡', source: '청산별곡' },
  { title: '가시리', source: '가시리' },
  { title: '동동', source: '동동' },
  { title: '서경별곡', source: '서경별곡' },
  { title: '정석가', source: '정석가' },
  { title: '쌍화점', source: '쌍화점' },
  { title: '만전춘별사', source: '만전춘별사' },
  { title: '정과정', source: '정서, 정과정' },
  { title: '이상곡', source: '이상곡' },
  { title: '한림별곡', source: '한림별곡' },
  // 가사
  { title: '송강가사/관동별곡', source: '정철, 관동별곡' },
  { title: '송강가사/사미인곡', source: '정철, 사미인곡' },
  { title: '송강가사/쇽미인곡', source: '정철, 속미인곡' },
  { title: '송강가사/셩산별곡', source: '정철, 성산별곡' },
  { title: '송강가사/훈민가', source: '정철, 훈민가' },
  { title: '상춘곡', source: '정극인, 상춘곡' },
  { title: '면앙정가', source: '송순, 면앙정가' },
  { title: '규원가', source: '허난설헌, 규원가' },
  { title: '누항사', source: '박인로, 누항사' },
  { title: '만분가', source: '조위, 만분가' },
  // 시조·악장
  { title: '어부사시사', source: '윤선도, 어부사시사' },
  { title: '산중신곡', source: '윤선도, 산중신곡' },
  { title: '도산십이곡', source: '이황, 도산십이곡' },
  { title: '용비어천가', source: '용비어천가' },
];

/**
 * 문서를 **펼쳐진 상태로** 받는다.
 *
 * 원본 위키 문법을 그대로 받으면 안 되는 문서가 있다. 송강가사는 본문이
 * 문서 안에 없고 `<pages index="Songganggasa.djvu" from=3 to=16 />` 로
 * 스캔 페이지를 끌어다 쓴다. 위키 문법만 걷어내면 그 자리에 아무것도 안
 * 남아 관동별곡이 두 줄로 나왔다.
 *
 * action=parse 는 틀과 페이지 전재를 서버에서 펼쳐 HTML 로 준다. 나중에
 * 틀 구조가 바뀌어도 여기가 따라 깨지지 않는다.
 */
async function fetchWiki(title) {
  const url =
    `${API}?action=parse&prop=text&formatversion=2&redirects=1` +
    `&format=json&page=${encodeURIComponent(title)}`;

  // 429(요청 과다)는 잠깐 기다렸다 다시 물으면 대개 풀린다.
  for (let attempt = 0; attempt < 4; attempt++) {
    const res = await fetch(url, { headers: { 'user-agent': 'gomtangvoca-vocab-builder/1.0' } });
    if (res.status === 429) {
      await sleep(3000 * (attempt + 1));
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.error) return null; // 없는 문서
    return data.parse?.text ?? null;
  }
  throw new Error('429 가 계속됩니다');
}

/**
 * 위키 문법을 걷어내고 본문 줄만 남긴다.
 *
 * 원문을 고치지는 않는다 — 옛 글자와 띄어쓰기를 그대로 둬야 아이가 보는
 * 것이 진짜 원문이 된다. 표·틀·주석처럼 본문이 아닌 것만 지운다.
 */
export function stripWiki(html) {
  let s = html;

  // 본문이 아닌 덩어리부터 통째로 지운다.
  s = s.replace(/<style[\s\S]*?<\/style>/g, '');
  s = s.replace(/<script[\s\S]*?<\/script>/g, '');
  s = s.replace(/<table[\s\S]*?<\/table>/g, '');
  s = s.replace(/<sup[\s\S]*?<\/sup>/g, '');
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  // 각주·목차·안내 상자
  s = s.replace(/<div class="(?:reflist|toc|noprint|mw-references)[\s\S]*?<\/div>/g, '');

  // 줄바꿈 태그를 진짜 줄바꿈으로. 시는 한 줄이 한 행이라 이게 중요하다.
  s = s.replace(/<br\s*\/?>/gi, '\n');
  s = s.replace(/<\/(p|div|li|dd|h\d)>/gi, '\n');

  s = s.replace(/<[^>]+>/g, '');
  s = s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

  return s
    .split('\n')
    .map((line) => line.replace(/^[*:;#]+\s*/, '').replace(/[ \t]+/g, ' ').trim())
    .filter((line) => line.length >= 2)
    // 위키 안내문·분류·편집 링크는 본문이 아니다.
    .filter((line) => !/^(분류|위키|이 문서|원본 주소|편집|출처|참고|둘러보기)/.test(line))
    .filter((line) => !/^\d+px/.test(line));
}

async function main() {
  const out = existsSync(OUT) ? JSON.parse(readFileSync(OUT, 'utf8')) : {};

  let ok = 0;
  const missing = [];

  for (const work of WORKS) {
    if (out[work.source]) {
      ok++;
      continue;
    }
    try {
      const raw = await fetchWiki(work.title);
      if (!raw) {
        missing.push(work.title);
      } else {
        const lines = stripWiki(raw);
        out[work.source] = { title: work.title, lines };
        ok++;
        console.log(`  ${work.source.padEnd(18)} ${String(lines.length).padStart(4)}줄`);
      }
    } catch (e) {
      console.log(`  ! ${work.title} — ${e.message}`);
    }
    await sleep(DELAY_MS);
  }

  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');
  console.log();
  console.log(`  작품 ${ok}편  →  ${OUT}`);
  if (missing.length) console.log(`  위키문헌에 없는 작품: ${missing.join(', ')}`);
}

main();
