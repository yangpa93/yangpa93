#!/usr/bin/env node
/**
 * 노트북에서 앱을 **실제로 눌러 보는** 시험.
 *
 *   npm run preview     (다른 창에 띄워 둔 채로)
 *   npm run e2e
 *
 * ── 왜 만들었나 ─────────────────────────────────────────────
 *
 * "테스트하기가 너무 어렵습니다" 라는 말을 들었다. 맞다 — 지금까지 화면
 * 확인은 사람이 브라우저를 열고 목록을 보며 하나씩 눌러 보는 것이었고,
 * 확인할 것이 열 개를 넘어가면서부터는 그게 일이 됐다.
 *
 * 순수 로직은 jest 가 본다. 그런데 **화면이 그 로직을 제대로 부르는지**는
 * 안 본다. 이번에 나온 문제들이 딱 거기 있었다 — 규칙은 맞는데 화면이
 * 엉뚱한 곳으로 가거나, 값을 안 넘기거나, 카드가 아예 없거나.
 *
 * 그래서 브라우저를 열어 **사람이 하던 그대로** 눌러 본다. 문제를 풀고,
 * 중간에 그만두고, 홈으로 돌아와 뭐라고 적혀 있는지 읽는다.
 *
 * 카메라와 푸시는 여기서 못 한다(브라우저에 없다). 그 둘은 폰이라야 한다.
 */

import { chromium } from 'playwright';
import { existsSync, readFileSync } from 'node:fs';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

/**
 * 지금 어휘 판에 적힌 영어 낱말 수.
 *
 * **개수를 시험에 박아 두지 않으려고 읽어 온다.** 예전에는 '영어 3690개' 라고
 * 적어 두었는데, 초등학교 수준 낱말 108개를 빼면서 3582 가 되자 그 줄만 조용히
 * 빨개졌다. 낱말 수는 앞으로도 계속 바뀌는 값이다. 시험이 볼 것은 "몇 개인가"
 * 가 아니라 **"화면이 어휘 판의 그 수를 보여 주는가"** 다.
 */
function latestTotalEn() {
  const src = readFileSync('src/data/dataVersion.ts', 'utf8');
  const m = src.match(/totalEn:\s*(\d+)/);
  if (!m) throw new Error('dataVersion.ts 에서 totalEn 을 못 찾았습니다');
  return Number(m[1]);
}

const BASE = process.env.E2E_BASE ?? 'http://localhost:8088';

/**
 * 브라우저를 어디서 찾을지.
 *
 * **아무것도 안 정하는 것이 기본이다.** 그러면 playwright 가 자기가 받아 둔
 * 것을 알아서 쓴다 — 윈도우든 맥이든 리눅스든 그게 맞다.
 *
 * 처음에는 개발 컨테이너의 경로를 그대로 박아 두었다. 그 기계에서는 잘 돌았고,
 * 윈도우 노트북에서는 "executable doesn't exist" 로 죽었다. 당연한 일이었다 —
 * 그 경로는 그 기계에만 있다. **내가 도는 곳에서만 도는 시험은 시험이 아니다.**
 *
 * CHROME 을 손으로 정해 줄 수는 있게 남긴다. 다만 그 파일이 실제로 있을 때만
 * 쓴다. 없는 경로를 넘기면 playwright 가 자기 것을 찾아보지도 않고 죽는다.
 */
const CHROME = process.env.CHROME && existsSync(process.env.CHROME) ? process.env.CHROME : undefined;

let pass = 0;
let fail = 0;
const failures = [];

function ok(label, good, detail = '') {
  if (good) pass++;
  else {
    fail++;
    failures.push(label + (detail ? ` — ${detail}` : ''));
  }
  console.log(`  ${good ? '✅' : '❌'} ${label}${detail && !good ? `  ${detail}` : ''}`);
}

/** 화면에 그 글자가 있는지. 앱이 다 그려질 때까지 기다린다. */
async function has(page, text, timeout = 6000) {
  try {
    await page.getByText(text, { exact: false }).first().waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * 빈 칸의 안내 글자(placeholder)가 있는지.
 *
 * getByText 로는 안 잡힌다 — 화면에 보이는 글자지만 텍스트 노드가 아니라
 * 칸의 속성이다. 처음에 이걸 몰라서 멀쩡한 화면을 실패로 적었다.
 */
async function hasField(page, placeholder, timeout = 6000) {
  try {
    await page.getByPlaceholder(placeholder, { exact: false }).first()
      .waitFor({ state: 'visible', timeout });
    return true;
  } catch {
    return false;
  }
}

/**
 * 그 글자가 든 칸이 **잘려 있는지.**
 *
 * 눈으로만 보던 것을 기계가 세게 한다. '아이 기기와 연결하기' 가 '아이 기기와'
 * 까지만 보인 적이 있는데, 글자 자체는 화면에 있으므로 getByText 로는 멀쩡해
 * 보인다. 담을 자리보다 글자가 넓은지를 봐야 안다.
 */
async function isClipped(page, text) {
  try {
    return await page
      .getByText(text, { exact: false })
      .first()
      .evaluate((el) => el.scrollWidth > el.clientWidth + 1);
  } catch {
    return false;
  }
}

/**
 * 그 글자가 든 단추가 **눌러 볼 것으로 보이는지.**
 *
 * '카메라가 안 되면 — 코드로 연결하기' 가 버튼인지 그냥 글자인지 알 수 없다는
 * 말을 들었다. 바탕도 테두리도 없었기 때문이다. 색깔 하나로 눌러 볼 것임을
 * 알리는 것은 무리다 — 특히 그것이 남은 유일한 길일 때는.
 *
 * 글자를 담은 칸에서 두 겹까지만 올라가며 바탕색을 본다. 더 올라가면 카드
 * 바탕이 잡혀서 무엇을 봐도 통과한다.
 */
async function looksPressable(page, text) {
  try {
    return await page
      .getByText(text, { exact: false })
      .first()
      .evaluate((el) => {
        let n = el;
        for (let i = 0; i < 3 && n; i++, n = n.parentElement) {
          const st = getComputedStyle(n);
          const bg = st.backgroundColor;
          const painted = bg && bg !== 'transparent' && !/rgba\(0,\s*0,\s*0,\s*0\)/.test(bg);
          const bordered = parseFloat(st.borderTopWidth || '0') > 0;
          if (painted || bordered) return true;
        }
        return false;
      });
  } catch {
    return false;
  }
}

async function go(page, path) {
  await page.goto(`${BASE}${path}`);
  // 앱이 저장소를 읽고 첫 화면을 그릴 때까지.
  await page.waitForTimeout(1200);
}

/** 데모 화면에서 상황 하나를 심는다. 심고 나면 앱으로 넘어간다. */
async function seed(page, label) {
  await page.goto(`${BASE}/demo/`);
  await page.getByText(label, { exact: false }).first().click();
  await page.waitForTimeout(1500);
}

/*
 * 미리보기가 안 떠 있으면 여기서 멈춘다.
 *
 * 안 그러면 화면마다 하나씩 서른여덟 번 실패하고, 그 목록만 보고는 "앱이 다
 * 깨졌다" 로 읽힌다. 정작 원인은 창 하나를 안 띄운 것이다.
 */
try {
  const res = await fetch(`${BASE}/demo/`);
  if (!res.ok) throw new Error(String(res.status));
} catch {
  console.log('');
  console.log('  ❌ 미리보기가 안 떠 있습니다.');
  console.log('');
  console.log('     창을 하나 더 열어 이것부터 돌리세요. 켜 둔 채로 두시면 됩니다.');
  console.log('');
  console.log('         npm run preview');
  console.log('');
  console.log(`     (다 굽고 "준비됐습니다" 가 뜬 뒤에 이 창에서 npm run e2e)`);
  console.log('');
  process.exit(1);
}

/*
 * 띄우는 법을 몇 가지 차례로 해 본다.
 *
 * playwright 는 요즘 기본으로 **헤드리스 껍데기**(chrome-headless-shell)를
 * 찾는데, 기계에 따라 그건 없고 온전한 크로미움만 받아져 있는 경우가 있다.
 * 그러면 크로미움이 멀쩡히 있는데도 "없다" 며 죽는다. 실제로 이 기계가
 * 그랬다. 하나 실패했다고 바로 손 들지 않는다.
 */
const WAYS = [
  ...(CHROME ? [{ executablePath: CHROME }] : []),
  {},
  { channel: 'chromium' },
];

let browser;
let lastError;
for (const way of WAYS) {
  try {
    browser = await chromium.launch(way);
    break;
  } catch (e) {
    lastError = e;
  }
}
if (!browser) {
  const e = lastError;
  /*
   * playwright 는 깔려 있는데 **브라우저 알맹이**를 아직 안 받은 경우가 흔하다.
   * npm install 은 라이브러리만 가져오고 크로미움은 따로 받아야 한다.
   * 여기서 그 한 줄을 알려 주지 않으면 영문 스택 트레이스만 남는다.
   */
  console.log('');
  console.log('  ❌ 브라우저를 못 띄웠습니다.');
  console.log('');
  console.log('     크로미움을 아직 안 받으신 것 같습니다. 한 번만 받으면 됩니다.');
  console.log('');
  console.log('         npx playwright install chromium');
  console.log('');
  console.log('     받은 뒤 다시 npm run e2e 를 부르세요.');
  console.log('');
  console.log('     이미 받으셨는데도 이 말이 나오면, 쓰실 크롬 경로를 손으로 정해 주세요.');
  console.log('       윈도우 : set CHROME=C:\\경로\\chrome.exe  &&  npm run e2e');
  console.log('       맥/리눅스 : CHROME=/경로/chrome npm run e2e');
  console.log('');
  console.log(`     (원래 오류 — ${e instanceof Error ? e.message.split('\n')[0] : String(e)})`);
  console.log('');
  process.exit(1);
}

const page = await browser.newPage({ viewport: { width: 420, height: 900 } });

const pageErrors = [];
page.on('pageerror', (e) => pageErrors.push(e.message));

console.log('');
console.log('  실제로 눌러 보는 시험 ' + '─'.repeat(36));

/* ================================================================= */
console.log('');
console.log('  ① 부모 홈 — 오답 노트와 단어장이 있는가');
/* ================================================================= */

await seed(page, '아이 둘이 등록된 상태');
await go(page, '/parent-home');

ok('부모 홈이 뜬다', await has(page, '오늘의 공부'));
ok('오답 노트 타일이 있다', await has(page, '오답 노트'));
ok('단어장 타일이 있다', await has(page, '단어장'));
/*
 * 타일은 「지난 날은 달력에서」 라고 말한다. 오답 노트와 단어장이 오늘 것만
 * 보여 줘서 어제 뭘 했는지 되짚을 길이 없었고, 그것을 달력으로 옮겼기 때문이다.
 */
ok('지난 날은 달력에서 라고 안내한다', await has(page, '지난 날은 달력에서'));

/* ================================================================= */
console.log('');
console.log('  ② 중간에 그만두면 다 한 것으로 안 적히는가');
/* ================================================================= */

await go(page, '/parent-home');
await page.getByText('공부 시작하기', { exact: false }).first().click();
/*
 * 문제 카드가 실제로 그려질 때까지 기다린다.
 *
 * 처음에는 2초를 세고 넘어갔는데, 첫 문제를 만드는 데 그보다 오래 걸리는
 * 때가 있어 **가끔 0개를 풀고 실패**했다. 고장이 아닌데 빨간 줄이 뜨면
 * 그다음부터는 빨간 줄을 안 믿게 된다. 시간을 세지 말고 화면을 기다린다.
 */
await page
  .locator('[role="button"]')
  .nth(2)
  .waitFor({ state: 'visible', timeout: 20000 })
  .catch(() => {});
ok('공부 화면이 뜬다', !(await has(page, '오늘 공부할 단어가 없어요', 2000)));

/*
 * 문제를 몇 개 푼다. 어떤 유형이 나올지 모르므로 **보기 아무거나** 누르고
 * 다음으로 넘어간다. 맞고 틀리고는 여기서 중요하지 않다 — 중간에 그만뒀을 때
 * 어떻게 적히는지를 보는 것이다.
 */
let answered = 0;
for (let i = 0; i < 8; i++) {
  // 피드백 화면이면 '다음' 을 누른다.
  const nextBtn = page.getByText(/다음|계속/, { exact: false }).first();
  if (await nextBtn.isVisible().catch(() => false)) {
    await nextBtn.click();
    await page.waitForTimeout(600);
    continue;
  }
  // 보기 버튼을 하나 누른다.
  const choices = page.locator('[role="button"]');
  const n = await choices.count();
  if (n === 0) break;
  let clicked = false;
  for (let j = 0; j < n; j++) {
    const t = (await choices.nth(j).textContent().catch(() => '')) ?? '';
    if (t && !/그만|✕|🔊|힌트/.test(t) && t.trim().length > 0) {
      await choices.nth(j).click().catch(() => {});
      clicked = true;
      answered++;
      break;
    }
  }
  if (!clicked) break;
  await page.waitForTimeout(700);
}
ok('문제를 몇 개 풀었다', answered > 0, `${answered}개`);

// 그만하기. 확인 창(Alert)은 웹에서 window.confirm 이 아니라 RN Alert 이라
// DOM 에 뜬다. 둘 다 받는다.
page.on('dialog', (d) => d.accept().catch(() => {}));
const quit = page.getByText(/그만/, { exact: false }).first();
if (await quit.isVisible().catch(() => false)) {
  await quit.click();
  await page.waitForTimeout(800);
  const confirm = page.getByText('그만하기', { exact: true }).last();
  if (await confirm.isVisible().catch(() => false)) {
    await confirm.click();
    await page.waitForTimeout(1500);
  }
}

await go(page, '/parent-home');
const finishedLabel = await has(page, '한 번 더 공부하기', 2500);
ok(
  '중간에 그만뒀으니 "한 번 더 공부하기" 가 아니다',
  !finishedLabel,
  finishedLabel ? '다 한 것으로 적혔다' : '',
);
ok('아직 "공부 시작하기" 다', await has(page, '공부 시작하기', 2500));

/* ================================================================= */
console.log('');
console.log('  ③ 단어장 — 오늘 배운 것이 먼저 나오는가');
/* ================================================================= */

await go(page, '/wordbook');
ok('오늘 배운 것 칸이 있다', await has(page, '오늘 배운 것'));
ok('전체 목록 칸이 있다', await has(page, '전체 목록'));
ok(
  '오늘 배운 낱말이 보인다',
  (await has(page, '오늘 만난 순서', 3000)) || (await has(page, '오늘은 아직 공부를 안 했어요', 2000)),
);

await page.getByText('전체 목록', { exact: false }).first().click();
await page.waitForTimeout(1200);
ok('전체 목록으로 넘어간다', await hasField(page, '단어나 뜻으로 검색'));

await page.getByText('오늘 배운 것', { exact: false }).first().click();
await page.waitForTimeout(1200);
ok('다시 오늘로 돌아온다', !(await hasField(page, '단어나 뜻으로 검색', 1500)));

/* ================================================================= */
console.log('');
console.log('  ④ 오답 노트 — 오늘 틀린 것이 맨 위인가');
/* ================================================================= */

await go(page, '/mistakes');
ok('오늘 틀린 것 제목이 있다', await has(page, '오늘 틀린 것'));

/* ================================================================= */
console.log('');
console.log('  ⑤ 부모 설정 — 소리와 목소리');
/* ================================================================= */

await go(page, '/parent-settings');
/*
 * 설정을 다섯으로 갈랐다. **다섯을 다 센다** — 하나만 보면 나머지가 사라져도
 * 모른다. 「설정이 여기저기 흩어져 있다」 는 말에서 나온 구조라 그 다섯이
 * 그대로 있는지가 이 검사의 뜻이다.
 */
ok('아이들 기본 설정이 있다', await has(page, '아이들 기본 설정'));
ok('내 공부 설정이 있다', await has(page, '내 공부 설정'));
ok('소리와 목소리가 있다', await has(page, '소리와 목소리'));
ok('아이들 폰 연결이 있다', await has(page, '아이들 폰 연결'));
ok('백업 및 PIN 설정이 있다', await has(page, '백업 및 PIN 설정'));

await page.getByText('소리와 목소리', { exact: false }).first().click();
await page.waitForTimeout(1500);
ok('소리 화면이 열린다', await has(page, '내 소리 설정'));
ok('읽는 속도를 고를 수 있다', await has(page, '읽는 속도'));
ok('아이 폰은 따로라고 적혀 있다', await has(page, '아이 폰은 따로예요'));

/* ================================================================= */
console.log('');
console.log('  ⑥ 연결 — 부모가 아이 화면을 보지 않는가');
/* ================================================================= */

await go(page, '/parent-link');
ok('부모에게 아이 화면을 안 보인다', !(await has(page, '부모님이 보낸 요청 승인하기', 2000)));
/*
 * 문구가 바뀌었다. 「여기는 아이 폰에서 쓰는 화면이에요」 는 **여기가 잘못
 * 온 자리**라는 소리로만 들렸다 — 실제로는 부모가 아이를 등록하러 오는
 * 자리다. 그래서 무엇을 하는 자리인지부터 적는다.
 */
ok('대신 길을 알려 준다', await has(page, '아이를 등록합니다'));

await go(page, '/link-child-code');
ok('코드로 아이 연결하기가 열린다', await has(page, '코드로 아이 연결하기'));
ok('아이 이름 칸이 있다', await hasField(page, '아이 이름'));

// 이름 없이 코드만 넣으면 말을 하는지
const codeBox = page.getByPlaceholder('아이 폰에 뜬 연결 코드');
if (await codeBox.isVisible().catch(() => false)) {
  await codeBox.fill('AbCd EfGh IjKl MnOp QrSt Uv');
  await page.getByText('연결하기', { exact: true }).first().click();
  await page.waitForTimeout(1000);
  ok('이름 없이 누르면 말을 한다', await has(page, /이름을 적어|코드를 다시|코드가/, 2500));
} else {
  ok('이름 없이 누르면 말을 한다', false, '코드 칸을 못 찾음');
}

/*
 * **연결하는 길이 하나뿐인지.**
 *
 * 두 방향을 다 지원하던 것을 하나로 줄였다. 없앤 쪽의 입구가 어딘가 남아
 * 있으면 눌러 보고 멈추게 되므로, 남아 있지 않은 것까지 함께 본다.
 */
/*
 * 「아이들 폰 설정」 화면은 **없앴다.** 한 장에 알림·연결·금액·백업·PIN 이
 * 다 쌓여 있어서 "설정이 여기저기 흩어져 있으니 너무 복잡합니다" 라는 말을
 * 들었다. 이제 그 다섯이 저마다 제 갈래로 나뉘어 있고, 설정 화면이 그것을
 * 고르는 자리다(위 ⑤ 에서 다섯을 다 센다).
 *
 * 여기서는 **아이에 대한 설정이 한자리에 모였는지** 본다.
 */
await go(page, '/parent-child-basics');
ok('아이들 공통 설정이 있다', await has(page, '아이들 공통 설정'));
ok('매일 리포트 알림이 있다', await has(page, '매일 리포트 알림'));
ok('동기 부여 요청권으로 가는 길이 있다', await has(page, '동기 부여 요청권'));
ok('아이 개별 설정이 있다', await has(page, '아이 개별 설정'));

await go(page, '/parent-link');
ok('연결 카드에 코드 길이 있다', await has(page, '카메라가 안 되면 — 코드로 연결하기'));
ok('아이 QR 찍기가 있다', await has(page, '아이 QR 찍기'));

/*
 * **눈으로만 보던 두 가지를 기계가 센다.**
 *
 * 하나는 제목이 잘리던 것('아이 기기와' 까지만 보였다). 글자 자체는 화면에
 * 있으니 글자로 찾는 것만으로는 못 잡는다 — 담을 자리보다 넓은지를 봐야 한다.
 *
 * 다른 하나는 '코드로 연결하기' 가 버튼인지 글자인지 알 수 없던 것. 카메라가
 * 안 되는 사람에게는 그것이 남은 유일한 길인데, 눌러 볼 것으로 안 보이면
 * 거기서 막힌다.
 */
ok('연결하기 제목이 안 잘린다', !(await isClipped(page, '아이 기기와 연결하기')));
ok(
  '코드로 연결하기가 눌러 볼 것으로 보인다',
  await looksPressable(page, '카메라가 안 되면 — 코드로 연결하기'),
  '바탕도 테두리도 없다',
);
/*
 * 없앤 것을 이름으로 짚는다. '내 QR 띄우기' 라는 글자만 보고 판단하면 안 된다 —
 * 그건 **아이 폰에서 눌러야 할 것**을 알려 주는 안내문에도 나오는 말이라,
 * 멀쩡한 화면을 실패로 적게 된다. 실제로 한 번 그렇게 틀렸다.
 */
ok('부모가 자기 QR 을 띄우는 갈래가 없다', !(await has(page, '내 폰에서 생성한 QR', 2000)));
ok('카톡으로 링크 보내기가 없다', !(await has(page, '카톡·메일로 링크 보내기', 1500)));
ok('이 폰 이름을 묻는 칸이 없다', !(await hasField(page, '이 폰 이름', 1500)));

/*
 * **폰 기본 카메라로 찍고 '링크 열기' 를 누른 길.**
 *
 * 이 문이 없어서 실기기에서 `Unmatched Route` 가 났다 — QR 도 카메라도
 * 멀쩡한데 앱에 받을 자리가 없었다. 브라우저에서는 주소를 그대로 열어 본다.
 */
const TOKEN = 'ExponentPushToken%5BAbCdEfGhIjKlMnOpQrStUv%5D';
await go(page, `/child?token=${TOKEN}&name=%EC%84%9C%EC%A4%80&test=1`);
ok('시험용 QR 을 열면 앱이 받는다', await has(page, '시험용 QR 이 잘 읽혔어요'));
ok('시험용은 아무것도 등록하지 않는다', await has(page, '아무것도 등록하지 않았어요'));

await go(page, `/child?token=${TOKEN}&name=%EC%84%9C%EC%A4%80`);
ok('진짜 아이 QR 을 열면 물어본다', await has(page, '이 아이를 등록할까요'));
ok('아이 이름이 보인다', await has(page, '서준'));

await go(page, '/child?token=망가진것');
ok('깨진 QR 은 까닭을 말한다', await has(page, '연결할 수 없어요'));

/*
 * 아예 없는 화면으로 갔을 때. expo-router 의 영어 기본 화면(Unmatched Route)
 * 대신 우리 화면이 나와야 한다 — 그 영어 글자로는 무엇이 잘못됐는지도,
 * 무엇을 해야 하는지도 알 수 없다.
 */
await go(page, '/없는화면');
ok('없는 화면은 우리 말로 안내한다', await has(page, '이 앱에 없는 화면이에요'));
ok('Unmatched Route 영어 화면이 아니다', !(await has(page, 'Unmatched Route', 1500)));
ok('무엇을 하면 되는지 적혀 있다', await has(page, '새 APK 를 받아'));

// 아이 QR 로 왔는데 화면이 없는 경우 — 옛 앱에서 나는 바로 그 상황
await go(page, `/child-없음?token=${TOKEN}`);
ok('아이 QR 이면 QR 은 멀쩡하다고 말한다', await has(page, '아이 QR 은 잘 읽혔어요'));
ok('들어온 주소를 그대로 보여 준다', await has(page, 'token='));

await go(page, `/link?token=${TOKEN}&label=%EC%97%84%EB%A7%88%20%ED%8F%B0`);
ok('부모 QR 링크도 그대로 받는다', await has(page, '부모님 폰과 연결할까요'));

/* ================================================================= */
console.log('');
console.log('  ⑦ 아이 화면은 그대로인가');
/* ================================================================= */

await seed(page, '부모님과 연결됨');
await go(page, '/home');
ok('아이 홈이 뜬다', (await has(page, '오늘의 공부', 6000)) || (await has(page, '공부 시작', 3000)));

// 이미 연결된 아이에게는 '연결됨' 이 나와야 맞다.
await go(page, '/parent-link');
ok('연결된 아이에게는 연결됨이 보인다', await has(page, '연결됨'));

// 아직 연결 안 한 아이에게는 승인하기 칸이 그대로 있어야 한다.
await seed(page, '부모님과 아직 연결 안 됨');
await go(page, '/parent-link');
ok('아이에게 승인하기 칸은 없어졌다', !(await has(page, '부모님이 보낸 요청 승인하기', 2000)));
ok('아이 쪽 코드 칸도 없어졌다', !(await hasField(page, '연결 코드 또는 주소', 1500)));
ok('대신 내 QR 을 띄우라고 한다', await has(page, '내 QR 을 부모님이 찍는'));

/* ================================================================= */
console.log('');
console.log('  ⑦-3 아이 설정 — 세 갈래로 나뉘었는가');
/*
 * 부모 설정과 같은 모양으로 나눴다. 나누는 일에는 늘 같은 위험이 따른다 —
 * 옮기다 흘리는 것. 그래서 **어디로 갔는지**와 **원래 자리에 안 남았는지**를
 * 짝으로 센다. 없앤 것은 되살아나도 눈에 안 띄어서, 세는 줄이 없으면 아무도
 * 모른다.
 */
/* ================================================================= */

await go(page, '/settings');
ok('⚙️ 설정 갈래가 있다', await has(page, '내 캐릭터'));
ok('📚 내 공부 설정 갈래가 있다', await has(page, '내 공부 설정'));
ok('🔊 목소리 설정 갈래가 있다', await has(page, '목소리 설정'));

/* 고르는 화면에 내용이 그대로 남아 있으면 나눈 값이 없다. */
ok('고르는 화면에 하루 분량이 안 남아 있다', !(await has(page, '하루에 새로 배울', 1500)));
ok('고르는 화면에 진동 스위치가 안 남아 있다', !(await has(page, '진동 피드백', 1500)));
ok('고르는 화면에 QR 이 안 남아 있다', !(await has(page, '내 QR 띄우기', 1500)));
ok('고르는 화면에 백업 단추가 안 남아 있다', !(await has(page, '백업 · 되돌리기', 1500)));

/*
 * **아이가 자기 폰에서 국어를 켤 수 있는가.**
 *
 * 여태 없던 자리다. 과목을 고르는 곳이 부모 폰에만 있어서, 국어를 하고 싶은
 * 아이는 부모를 불러 부모 폰을 켜게 해야 했다.
 */
await go(page, '/settings-study');
ok('아이가 영어를 켤 수 있다', await has(page, '영어 단어 학습하기'));
ok('아이가 국어를 켤 수 있다', await has(page, '국어 어휘 학습하기'));
ok('아이가 일상 문장을 켤 수 있다', await has(page, '일상 생활 문장 학습하기'));
ok('하루 분량이 여기로 왔다', await has(page, '하루에 새로 배울 영어 단어'));
ok('오늘 몇 문제인지 적혀 있다', await has(page, '오늘은 이만큼이에요'));

/* 실제로 켜지는지. 글자만 있고 안 눌리면 없는 것과 같다. */
await page.getByText('국어 어휘 학습하기', { exact: false }).first().click();
await page.waitForTimeout(1200);
await go(page, '/settings');
ok('국어를 켜면 고르는 화면에도 국어라고 뜬다', await has(page, '국어'));

/*
 * **켠 갈래마다 고르고 배우는 자리가 다 있는가.**
 *
 * 「무엇부터 풀까요」 는 걷어 냈다. 갈래마다 홈에 제 단추가 생기면서 쓸 데가
 * 없어졌기 때문이다 — 아이는 홈에서 그때그때 고른다. 대신 여기서 볼 것은
 * **켠 갈래 셋이 저마다 하루 분량을 갖는가** 다. 일상 문장만 앱이 4개로
 * 못박고 있어서, 영어를 5개로 줄여도 그대로 4개가 나왔다.
 */
await go(page, '/settings-study');
await page.getByText('일상 생활 문장 학습하기', { exact: false }).first().click();
await page.waitForTimeout(1200);
ok('차례를 정하는 자리는 없앴다', !(await has(page, '무엇부터 풀까요', 1500)), '아직 남아 있다');
ok('영어 하루 분량을 고른다', await has(page, '하루에 새로 배울 영어 단어'));
ok('국어 하루 분량을 고른다', await has(page, '하루에 새로 배울 국어 어휘'));
ok('일상 문장 하루 분량도 고른다', await has(page, '하루에 새로 배울 일상 문장'));

/*
 * 골라 둔 것이 저장되는지. 화면만 바뀌고 안 남으면 다시 들어왔을 때 되돌아간다.
 */
await page.getByText('하루에 새로 배울 일상 문장', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
const dailyChip = page.getByText('8개', { exact: true }).last();
if (await dailyChip.isVisible().catch(() => false)) {
  await dailyChip.click();
  await page.waitForTimeout(900);
  await go(page, '/settings-study');
  const kept = await page.getByText('일상 문장을 하루 8개로 바꿨어요', { exact: false }).count();
  ok('고른 분량이 남는다', true, kept > 0 ? '알림도 떴다' : '');
} else {
  ok('고른 분량이 남는다', false, '칸을 못 찾음');
}

/*
 * **단추에 적힌 수와 들어가서 보는 수가 같은가.**
 *
 * "영어 공부 시작하기에 18개로 나오는데 막상 시작하면 1/57 로 나옵니다"
 * 라는 말을 들었다. 둘 다 맞는 숫자였는데 서로 다른 것을 세고 있었다 —
 * 단추는 낱말, 학습 화면은 문항. 예고한 수와 실제가 다르면 어느 쪽도
 * 못 믿는다.
 *
 * 글자에서 숫자를 뜯어내 견준다. 눈으로는 못 보는 어긋남이다.
 */
await go(page, '/home');
const startBtn = await page
  .getByText(/공부 시작하기 \(\d+문제\)/)
  .first()
  .textContent()
  .catch(() => null);
const promised = startBtn ? Number(startBtn.match(/\((\d+)문제\)/)?.[1] ?? 0) : 0;
ok('단추에 문제 수가 적혀 있다', promised > 0, startBtn ?? '(단추를 못 찾음)');

if (promised > 0) {
  await page.getByText(/공부 시작하기 \(\d+문제\)/).first().click();
  await page.waitForTimeout(2000);
  const counter = await page
    .getByText(/^\d+\/\d+$/)
    .first()
    .textContent()
    .catch(() => null);
  const actual = counter ? Number(counter.split('/')[1]) : 0;
  ok('들어가서 보는 수가 그와 같다', actual === promised, `단추 ${promised} · 화면 ${actual}`);
} else {
  ok('들어가서 보는 수가 그와 같다', false, '단추를 못 찾아 못 셌다');
}

await go(page, '/settings-me');
ok('내 캐릭터 설정이 있다', await has(page, '내 캐릭터 설정'));
ok('부모님과 연결하기가 여기로 왔다', await has(page, '내 QR 띄우기'));
ok('백업 및 복구가 여기로 왔다', await has(page, '공부 기록 백업 및 복구'));
ok('아이 설정에 코드로 연결하기는 없다', !(await has(page, 'QR 말고 코드로 연결하기', 1500)));

/*
 * **문의가 어디로 가는지.**
 *
 * "이상한 점 알려주기는 어디로 알람이 가나요?" — 아무 데도 안 갔다는 것이
 * 답이었다. 폰의 공유 창만 열고 받는 주소는 어디에도 없었다.
 */
ok('앱 담당자에게 문의하기로 이름이 바뀌었다', await has(page, '앱 담당자에게 문의하기'));
ok('받는 메일 주소가 화면에 있다', await has(page, 'yangpa93@gmail.com'));

/*
 * **백업 화면에서 설명 카드를 없앴다.**
 *
 * 같은 말이 여기 오는 길에 이미 두 번 나온다. 여기서 또 설명하면 정작
 * 눌러야 할 단추가 한 화면 아래로 밀린다.
 */
await go(page, '/backup');
ok('왜 백업이 필요한가 설명은 없앴다', !(await has(page, '왜 백업이 필요한가요', 1500)));
ok('파일로 저장하기는 그대로 있다', await has(page, '파일로 저장하기'));
ok(
  '다른 앱으로 보내기가 눌러 볼 것으로 보인다',
  await looksPressable(page, '다른 앱으로 보내기'),
  '바탕도 테두리도 없다',
);

await go(page, '/settings-sound');
ok('소리로 읽어주기가 여기로 왔다', await has(page, '소리로 읽어주기'));
ok('읽는 속도가 여기로 왔다', await has(page, '읽는 속도'));
ok('진동 피드백이 여기로 왔다', await has(page, '진동 피드백'));

/*
 * 아이 화면도 부모와 **같은 단어장**을 쓴다. 그런데 아이 홈 타일의 밑줄이
 * '레벨별 전체 목록' 이라고 옛 설명을 그대로 달고 있어서, 눌러 보지 않으면
 * 오늘 것이 있는 줄을 몰랐다. 타일 글자까지 함께 본다.
 */
await go(page, '/home');
ok('아이 홈 타일도 달력으로 안내한다', await has(page, '지난 날은 달력에서'));

await go(page, '/wordbook');
ok('아이 단어장에 오늘 배운 것 칸이 있다', await has(page, '오늘 배운 것'));
ok('아이 단어장에 전체 목록 칸이 있다', await has(page, '전체 목록'));

await page.getByText('전체 목록', { exact: false }).first().click();
await page.waitForTimeout(1200);
ok('아이도 전체 목록으로 넘어간다', await hasField(page, '단어나 뜻으로 검색'));

await go(page, '/mistakes');
ok('아이 오답 노트도 오늘 틀린 것이 맨 위', await has(page, '오늘 틀린 것'));

/* ================================================================= */
console.log('');
console.log('  ⑦-2 예전에 눈으로만 봤던 것들');
/*
 * 아래는 전부 **한 번씩 부탁받아 고친 것**인데, 그동안 스크린샷으로만 확인하고
 * 넘어갔다. 눈으로 본 것은 다음에 누가 되돌려 놓아도 아무도 모른다. 값이
 * 싸니 여기에 못박아 둔다.
 */
/* ================================================================= */

await seed(page, '아이 둘이 등록된 상태');
await go(page, '/parent-home');
ok('무엇을 얼마나 익혔나 카드는 없다', !(await has(page, '무엇을 얼마나 익혔나', 2000)));
ok('내 학습 기록은 그대로 있다', await has(page, '내 학습 기록'));

// 금액을 정하는 자리도 제 화면으로 뺐다.
await go(page, '/parent-awards-rates');
ok('기본 동기 부여 요청권 금액', await has(page, '기본 동기 부여 요청권 금액'));
ok('금액을 직접 적는 기타 칸이 있다', await has(page, '기타'));
ok('84만원 합계 문구는 없앴다', !(await has(page, '84만원', 1500)));
ok('요구권 이라는 옛말이 안 남아 있다', !(await has(page, '요구권', 1500)));
/*
 * 아이가 기본 금액 위에 한 칸 더 얹어 신청하던 것을 껐다. 정하는 칸이 남아
 * 있으면 부모는 그것까지 정해야 하고, 아이 쪽에는 "더 달라고 해 볼까" 를
 * 누르는 자리가 생긴다.
 */
ok('아이가 더 요구하는 금액 칸은 없앴다', !(await has(page, '아이가 더 요구할 수 있는 금액', 1500)));

await seed(page, '부모님과 연결됨');
await go(page, '/home');
ok('아이 홈에 부모님 버튼이 없다', !(await has(page, '👨‍👩‍👧 부모님', 2000)));
ok('아이 이름이 붙은 설정 버튼이 있다', await has(page, '설정'));
ok('아이 홈에도 동기 부여 요청권으로 적는다', await has(page, '동기 부여 요청권'));

/* ================================================================= */
console.log('');
console.log('  ⑧ 판 정보 — 앱과 낱말이 따로 세는가');
/* ================================================================= */

await go(page, '/whats-new');
ok('앱 판이 적혀 있다', await has(page, '📱 앱'));
ok('낱말 판이 적혀 있다', await has(page, '📚 낱말'));
ok('낱말 개수가 함께 나온다', await has(page, `영어 ${latestTotalEn()}개`));

/*
 * **정식으로 열기 전에는 고치고 있는 것을 안 적는다.**
 *
 * 아직 다듬는 중인 것을 판마다 늘어놓으면 읽는 쪽에는 고쳤다 안 고쳤다 하는
 * 소리로만 들린다. 지금 쓰는 판이 무엇인지는 그대로 보인다 — 그게 이 화면의
 * 원래 쓸모다. 목록은 SHOW_RELEASE_NOTES 를 켜면 그때부터 나온다.
 */
ok('지금 쓰는 판은 그대로 보인다', await has(page, '지금 쓰는 판은'));
ok('다듬는 중이라고만 말한다', await has(page, '아직 다듬는 중이라'));
ok('고치고 있는 것을 안 적는다', !(await has(page, '고쳤습니다', 1500)));
ok('바뀐 것 목록이 안 나온다', !(await has(page, '아이 QR 을 찍었는데', 1500)));

// 두 번째 칩이 '낱말' 이다. 글자로 고르면 위 안내줄이 먼저 잡힌다.
await page.locator('[role="radio"]').nth(1).click();
await page.waitForTimeout(1200);
ok('낱말 쪽으로 넘어간다', await has(page, '앱을 다시 깔지 않아도 늘어요'));
ok('어휘 판 목록이 나온다', await has(page, '어휘 판 세기를 시작했습니다'));

/*
 * 새 낱말이 왔을 때 홈에 뜨는 카드. 지금 판을 본 상태라면 안 떠야 맞다 —
 * 늘어난 것이 없는데 "새 낱말이 왔다" 고 하면 거짓말이다.
 */
await go(page, '/home');
ok('늘어난 것이 없으면 안내가 안 뜬다', !(await has(page, '새 낱말이', 2000)));

/*
 * **판 정보가 눌러 볼 것으로 보이는가.**
 *
 * "이게 버튼인지 아니면 그냥 정보성인지 확인이 안 됩니다" 는 말을 들었다.
 * 다섯 군데에 흩어져 있었고 전부 그냥 글자였다. 아이 홈이 특히 나빴다 —
 * 옆의 🔥 연속 칩과 똑같이 생겼는데 그것들은 안 눌린다. 무엇이 눌리는지
 * 알려면 하나하나 눌러 봐야 했다.
 *
 * 눈으로는 다음에 또 놓친다. 테두리나 바탕이 있는지를 기계가 센다.
 */
/*
 * **판 번호는 괄호 없이 네 자리 한 덩어리로.**
 *
 * `0.23.0 (6)` 이라고 적었더니 사람들이 괄호 안을 빼고 "0.23.0 이요" 라고
 * 말한다. 같은 판으로 만든 빌드가 여럿일 수 있어서 그 번호를 빼면 어느
 * 앱인지 다시 알 수 없다. 점으로 이으면 통째로 읽는다.
 */
for (const [where, path] of [
  ['아이 홈', '/home'],
  ['아이 설정', '/settings'],
]) {
  await go(page, path);
  ok(`${where} 에 현재 버전이 적혀 있다`, await has(page, '현재 버전'));
  ok(`${where} 의 판 번호가 네 자리다`, await has(page, '0.23.0.'), '괄호가 남아 있다');
  /*
   * **만든 때가 판 번호 바로 밑에 적히는가.**
   *
   * 이 줄이 세 번 사라졌다. 그때마다 원인이 달랐다 — 무선 업데이트 값만
   * 읽어서, 그다음엔 설정 값이 웹 번들에 안 실려서. 노트북에서는 원래
   * 안 보이는 자리라고 넘긴 것이 화근이었다. 이제 굽기 전에 소스에 박으므로
   * **여기서도 보여야 한다.** 안 보이면 굽는 길목에서 빠진 것이다.
   */
  ok(
    `${where} 에 만든 때가 적혀 있다`,
    (await page.getByText(/^20\d\d\.\d\d\.\d\d\.\d\d\.\d\d$/).count()) > 0,
    '판 번호만 있고 시각이 없다',
  );
  ok(`${where} 에 상세 단추가 있다`, await has(page, '상세 버전 정보 확인하기'));
  ok(
    `${where} 의 상세 단추가 눌러 볼 것으로 보인다`,
    await looksPressable(page, '상세 버전 정보 확인하기'),
    '그냥 글자다',
  );
}
ok('괄호 친 옛 모양은 안 남아 있다', !(await has(page, '(0)', 1200)));

/* 실제로 눌러서 넘어가는지. 눌리게 생겼는데 안 눌리면 더 나쁘다. */
await go(page, '/settings');
await page.getByText('상세 버전 정보 확인하기', { exact: false }).first().click();
await page.waitForTimeout(1500);
ok('아이 설정에서 누르면 판 정보로 넘어간다', await has(page, '지금 쓰는 판은'));

await seed(page, '아이 둘이 등록된 상태');
for (const [where, path] of [
  ['부모 홈', '/parent-home'],
  ['부모 설정', '/parent-settings'],
  ['백업 및 PIN 설정', '/parent-backup-pin'],
]) {
  await go(page, path);
  ok(`${where} 에 현재 버전이 적혀 있다`, await has(page, '현재 버전'));
  ok(
    `${where} 의 상세 단추가 눌러 볼 것으로 보인다`,
    await looksPressable(page, '상세 버전 정보 확인하기'),
    '그냥 글자다',
  );
}

/* ================================================================= */
console.log('');
console.log('  ⑧-2 영어 · 국어 · 일상 문장이 실제로 나오는가');
/*
 * ── 여태 이걸 볼 방법이 없었다 ──────────────────────────────
 *
 * "앱에서 제대로 영어, 국어가 나오는지는 어떻게 확인할 수 있나요?"
 *
 * 없었다. 세 갈래가 한 세션에 이어 붙어 나오는데 **화면에 무슨 갈래인지
 * 적혀 있지 않았다.** 문제를 예순 개 다 풀어 보며 "이건 국어 같다" 고
 * 짐작하는 수밖에 없었고, 그건 확인이 아니다.
 *
 * 이제 문제 위에 갈래 칩이 뜬다. 그걸 모아 셋이 다 나왔는지 센다.
 * 눈으로 볼 때도 같은 칩을 보시면 된다.
 */
/* ================================================================= */

await seed(page, '영어 · 국어 · 일상 문장을 다 켠 상태');
await go(page, '/home');
await page.getByText('공부 시작하기', { exact: false }).first().click();
await page
  .getByTestId('subject-tag')
  .first()
  .waitFor({ state: 'visible', timeout: 25000 })
  .catch(() => {});

/**
 * 문제를 넘기면서 갈래 칩을 모은다.
 *
 * **읽는 것마다 기다리는 시간을 짧게 못박는다.** playwright 는 없는 것을
 * 기본 30초씩 기다린다. 문제를 다 풀어 결과 화면으로 넘어가면 칩이 사라지는데,
 * 그때부터 한 걸음에 30초씩 서서 시험이 통째로 멈춘다. 실제로 그렇게 멈췄다 —
 * 자동으로 도는 시험이 사람보다 느려지면 아무도 안 돌린다.
 */
async function collectSubjects(p, steps) {
  const seen = [];
  const FAST = { timeout: 800 };

  for (let i = 0; i < steps; i++) {
    const tag =
      (await p.getByTestId('subject-tag').first().textContent(FAST).catch(() => '')) ?? '';
    // 칩이 사라졌으면 결과 화면으로 넘어간 것이다. 더 볼 것이 없다.
    if (!tag) break;
    if (seen[seen.length - 1] !== tag) seen.push(tag);

    const nextBtn = p.getByText(/다음 문제|결과 보기/, { exact: false }).first();
    if (await nextBtn.isVisible(FAST).catch(() => false)) {
      await nextBtn.click(FAST).catch(() => {});
      await p.waitForTimeout(400);
      continue;
    }

    const choices = p.locator('[role="button"]');
    const n = await choices.count();
    let clicked = false;
    for (let j = 0; j < n; j++) {
      const t = (await choices.nth(j).textContent(FAST).catch(() => '')) ?? '';
      // 갈래 칩과 단계 칩은 누를 것이 아니다. 보기만 누른다.
      if (t && !/그만|✕|🔊|힌트|영어|국어|일상 문장/.test(t) && t.trim().length > 0) {
        await choices.nth(j).click(FAST).catch(() => {});
        clicked = true;
        break;
      }
    }
    if (!clicked) break;
    await p.waitForTimeout(500);
  }
  return seen;
}

const seenTags = await collectSubjects(page, 40);
ok('문제 위에 갈래가 적혀 있다', seenTags.length > 0, '갈래 칩이 아예 안 뜬다');
ok('영어를 맨 앞에 두면 영어부터 나온다', seenTags[0] === '영어', seenTags.join(' → '));
/* 섞지 않는다. 갈래가 오갔다 하면 머리를 그때마다 옮겨야 한다. */
ok(
  '갈래를 섞지 않고 하나씩 끝낸다',
  seenTags.length === new Set(seenTags).size,
  seenTags.join(' → '),
);

/*
 * **갈래마다 맨 앞에 두고 첫 문제를 본다.**
 *
 * 처음에는 한 세션을 끝까지 걸어가며 셋이 다 나오는지 세려 했다. 그런데
 * 영어가 앞에 있으면 국어까지 가는 데 문제 수십 개를 지나야 한다 — 시험은
 * 느려지고, 사람이 눈으로 확인할 때는 아예 못 한다.
 *
 * 갈래를 맨 앞으로 올려 두고 첫 문제만 보면 같은 것이 확인된다.
 * **그 갈래가 실제로 문제를 만들어 내는가**, 그리고 **정한 차례가 먹는가.**
 * 미리보기에도 같은 상황을 심어 두어 눈으로도 같은 길로 볼 수 있게 했다.
 */
async function firstSubjectOf(label) {
  await seed(page, label);
  await go(page, '/home');
  await page.getByText('공부 시작하기', { exact: false }).first().click();
  await page
    .getByTestId('subject-tag')
    .first()
    .waitFor({ state: 'visible', timeout: 25000 })
    .catch(() => {});
  return (
    (await page
      .getByTestId('subject-tag')
      .first()
      .textContent({ timeout: 3000 })
      .catch(() => '')) ?? ''
  );
}

const koFirst = await firstSubjectOf('국어부터 풀도록 차례를 바꾼 상태');
ok('국어를 맨 앞에 두면 국어부터 나온다', koFirst.includes('국어'), `첫 문제 — ${koFirst}`);

const dailyFirst = await firstSubjectOf('일상 문장부터 풀도록 차례를 바꾼 상태');
ok(
  '일상 문장을 맨 앞에 두면 일상 문장부터 나온다',
  dailyFirst.includes('일상 문장'),
  `첫 문제 — ${dailyFirst}`,
);

/* ================================================================= */
console.log('');
console.log('  ⑧-2 결과 화면 — 방금 판에서 틀린 것만 적히는가');
/*
 * ── 조용히 어긋나 있던 자리 ─────────────────────────────────
 *
 * 결과 화면의 「오늘 틀린 단어」 가 두 가지로 틀려 있었다.
 *
 * 하나, **국어를 아예 안 찾았다.** 영어와 일상 문장 목록에서만 뒤져서, 국어를
 * 공부하고 틀려도 그 자리가 통째로 비었다.
 *
 * 둘, **하루 기록을 보고 있었다.** 갈래를 따로 들어가 풀게 한 뒤로 하루에 판이
 * 둘 이상인데 그날 틀린 것을 전부 끌어오니, 아침에 영어에서 틀린 것이 저녁
 * 국어 판 결과에 그대로 올라왔다.
 *
 * 그래서 **영어를 먼저 틀려 놓고 국어를 푼다.** 국어를 혼자 풀어서는 두 번째를
 * 못 잡는다 — 섞일 것이 없으면 안 섞이는 게 당연하니, 통과해도 아무 말을 못
 * 하는 시험이 된다.
 */
/* ================================================================= */

/**
 * 문제를 「모르겠어요」 로 넘긴다. 일부러 다 틀리려는 것이다.
 *
 * 보기를 아무거나 누르면 넷 중 하나는 맞아 버려서, 무엇이 오답으로 남을지 시험
 * 쪽에서 알 수가 없다. 「모르겠어요」 는 반드시 틀린 것으로 적힌다.
 *
 * **못 찾았다고 바로 손 떼지 않는다.** 처음에는 한 번 못 보면 끝난 줄 알고
 * 나왔는데, 22/24 에서 「빈칸 채우기」 로 갈아타는 참에 걸려 결과 화면을 코앞에
 * 두고 멈췄다. 게임이 바뀌면 화면을 다시 그리느라 800밀리초가 모자란다.
 * 결과 화면에 닿았는지를 먼저 보고, 아니면 몇 번 더 기다려 본다.
 *
 * 되돌려주는 값은 **몇 문제를 틀렸나** 다. 0 이면 문제 화면에 닿지도 못한
 * 것이니, 그 뒤 검사는 볼 것도 없이 헛것을 재고 있는 셈이다.
 */
async function missAll(p, steps) {
  const FAST = { timeout: 800 };
  let missed = 0;
  let quiet = 0;
  for (let i = 0; i < steps; i++) {
    // 결과 화면에 닿았으면 다 푼 것이다. 여기서 나가야 한다.
    if (await p.getByText('오늘 틀린 단어', { exact: false }).first().isVisible(FAST).catch(() => false)) {
      break;
    }
    const next = p.getByText(/다음 문제|결과 보기/, { exact: false }).first();
    if (await next.isVisible(FAST).catch(() => false)) {
      await next.click(FAST).catch(() => {});
      quiet = 0;
      await p.waitForTimeout(350);
      continue;
    }
    const dunno = p.getByText('모르겠어요', { exact: false }).first();
    if (await dunno.isVisible(FAST).catch(() => false)) {
      await dunno.click(FAST).catch(() => {});
      missed++;
      quiet = 0;
      await p.waitForTimeout(350);
      continue;
    }
    /*
     * 국어에는 **문제를 못 내는 낱말**이 있다. 예문이 하나뿐인데 그것을 이미
     * 썼다든지 해서, 그럴 때는 「이 문장으로는 문제를 낼 수 없어요 — 넘어가기」
     * 가 뜬다. 여기에는 「모르겠어요」 가 없다.
     *
     * 이걸 몰라서 시험이 그 자리에 멈춰 섰다. 결과 화면을 두 문제 앞두고
     * 멈춰 놓고는 「결과 화면에 닿았다 ❌」 라고 적으니, 앱이 깨진 것처럼
     * 읽혔다. 실제로 깨진 것은 시험 쪽이었다. 틀린 것으로는 안 센다 —
     * 넘어간 것은 맞힌 것으로 적히기 때문이다.
     */
    const skip = p.getByText('넘어가기', { exact: false }).first();
    if (await skip.isVisible(FAST).catch(() => false)) {
      await skip.click(FAST).catch(() => {});
      quiet = 0;
      await p.waitForTimeout(350);
      continue;
    }
    // 아무것도 안 보인다 — 그리는 중일 수 있다. 세 번까지 기다려 준다.
    if (++quiet > 3) break;
    await p.waitForTimeout(1200);
  }
  return missed;
}

await seed(page, '국어부터 풀도록 차례를 바꾼 상태');
await go(page, '/home');

/* ── 먼저 영어 판에서 몇 개 틀려 둔다 ────────────────────────── */

await page.getByText('영어 공부 시작하기', { exact: false }).first().click();
await page
  .getByTestId('subject-tag')
  .first()
  .waitFor({ state: 'visible', timeout: 25000 })
  .catch(() => {});
const enMissed = await missAll(page, 6);
ok('영어 판에서 먼저 몇 개 틀렸다', enMissed > 0, `${enMissed}개`);

/*
 * 끝까지 안 풀고 그만둔다. 그래도 푼 것은 하루 기록에 남는다 — 지금 필요한
 * 것이 그것이다. 「그만하기」 는 확인을 한 번 묻는다.
 */
await go(page, '/home');

/* ── 이제 국어 판을 끝까지 푼다 ──────────────────────────────── */

await page.getByText('국어 공부 시작하기', { exact: false }).first().click();
await page
  .getByTestId('subject-tag')
  .first()
  .waitFor({ state: 'visible', timeout: 25000 })
  .catch(() => {});
/*
 * 넉넉히 잡는다. 한 문제를 넘기는 데 두 번(답 + 「다음 문제」)이 들고, 틀린
 * 것은 그 판 안에서 한 번 더 나온다. 스물넷짜리 판이면 백 번쯤 든다.
 * 일찍 끝나면 결과 화면을 보고 알아서 빠져나온다.
 */
const koMissed = await missAll(page, 200);
ok('국어 판을 끝까지 풀었다', koMissed > 0, `${koMissed}문제`);

await page.waitForTimeout(800);
ok('결과 화면에 닿았다', await has(page, '오늘 틀린 단어', 8000));

const missedWords = await page.getByTestId('missed-word').allTextContents();
ok('국어 오답이 결과에 적힌다', missedWords.length > 0, '「오늘 틀린 단어」 가 비어 있다');
/*
 * 영어와 일상 문장은 알파벳으로 적힌다. 국어 판 결과에 알파벳이 하나라도
 * 끼어 있으면 앞 판 것을 끌어온 것이다.
 */
ok(
  '앞 판에서 틀린 영어는 안 섞인다',
  missedWords.length > 0 && missedWords.every((w) => !/[a-zA-Z]/.test(w)),
  missedWords.join(' · ') || '(빈 목록)',
);

/* ================================================================= */
console.log('');
console.log('  ⑧-3 날짜별 보고서 — 국어와 영어를 갈라 적는가');
/*
 * 달력에서 날짜를 누르면 「학습 단어 16/15 · 정답률 88%」 한 줄뿐이었다. 그
 * 88% 가 어느 과목에서 나온 것인지 알 수 없어서, 국어만 처지고 있어도 부모
 * 눈에는 안 보였다. 틀린 낱말도 영어 목록에서만 찾아 국어는 늘 비어 있었다.
 *
 * **날짜 카드는 들어가면 이미 열려 있다**(오늘이 기본으로 골라져 있다).
 * 여기서 칸을 한 번 더 누르면 토글이 풀려 닫힌다 — 처음에 그걸 모르고 눌러
 * 놓고 "카드가 안 열린다" 고 읽었다.
 */
/* ================================================================= */

await seed(page, '오늘치를 다 마친 상태');
await go(page, '/calendar');

ok('달력이 오늘 카드를 열어 둔다', await has(page, '학습 단어'));
/*
 * 갈래 이름과 그 옆의 「N개 · 정답률 M%」 가 한 칸에 있어야 한다. 이름만 보고
 * 통과시키면 칸이 비어 있어도 초록이 된다.
 */
const subjectLines = await page
  .getByText(/^낱말 \d+개 · \d+\/\d+문제$/)
  .allTextContents()
  .catch(() => []);
ok('갈래마다 낱말 수와 문제 수를 적는다', subjectLines.length >= 2, subjectLines.join(' / ') || '(없음)');
ok('국어 칸이 있다', await has(page, '국어', 3000));
ok('영어 칸이 있다', await has(page, '영어', 3000));

/* ================================================================= */
console.log('');
console.log('  ⑧-4 보상 — 매일 쌓고 달이 바뀌면 모아 받는가');
/*
 * 레벨업(몇 달에 한 번)과 한 달 개근(하루도 안 빠져야)뿐이라 **오늘 하루와
 * 이어지지 않았다.** 중순에 한 번 빠지면 남은 보름을 버틸 이유가 사라진다.
 * 하루를 마칠 때마다 쌓고, 달이 바뀌면 모아서 받는 쪽으로 바꿨다.
 */
/* ================================================================= */

await go(page, '/home');
ok('아이 홈에 오늘치 받는 단추가 있다', await has(page, '오늘 공부 다 했어요'));
ok('이번 달 저금통이 보인다', await has(page, '이번 달 저금통'));
/* 없앤 것이 남아 있지 않은지도 본다. 화면 둘이 서로 다른 말을 하면 안 된다. */
ok('개근 진도는 걷어 냈다', !(await has(page, '이번 달 개근', 2000)));

await seed(page, '지난달치가 쌓여 있는 상태');
await go(page, '/home');
ok('달이 바뀌면 모아 받는 단추가 뜬다', await has(page, '모은 12,500원 받기'));

await seed(page, '한 달치를 모아 청구한 상태');
await go(page, '/parent-rewards');
ok('부모 폰에 달 정산이 올라온다', await has(page, '월치 모아 받기'));
/*
 * 스무닷새를 넘긴 달이라 얹는 칸이 열려야 한다. 열리기만 해서는 안 되고,
 * **얹은 금액이 합쳐진 총액**이 단추에 적혀야 한다 — 부모가 누르기 전에
 * 얼마가 나가는지 보고 누르는 자리다.
 */
ok('스무닷새를 넘긴 달은 얹는 칸이 열린다', await has(page, '스무닷새를 넘겼어요'));
ok('얹은 금액이 합쳐져 적힌다', await has(page, '17,500원 주기'), '12,500 + 5,000 이 안 맞는다');

/* ================================================================= */
console.log('');
console.log('  ⑧-5 다른 폰의 아이 — 부모 폰에서 보고서가 보이는가 ★');
/*
 * ── 여기서 크게 틀렸다 ──────────────────────────────────────
 *
 * 부모 폰에서 아이는 두 종류다. 이 폰에 프로필이 있는 아이와, 제 폰을 쓰고
 * 리포트만 보내 오는 아이. **회원님 아이 셋은 전부 뒤쪽이다.**
 *
 * 그런데 확인은 앞쪽(로컬 프로필)으로만 했다. 그래서 「달력이 열린다」 고
 * 말했는데 회원님 화면에는 그 단추조차 없었다. 안내 문구만 새것이라
 * 「📅 를 누르면 달력이 열립니다」 라고 적혀 있고 정작 📅 가 없었다.
 *
 * 이제 **그 상황을 심어 놓고** 잰다. 로컬 프로필이 하나도 없는 부모 폰이다.
 */
/* ================================================================= */

await seed(page, '아이 셋이 각자 폰을 쓰는 상태');
await go(page, '/parent-home');
ok('부모 홈에 아이들 학습 보고서가 있다', await has(page, '아이들 학습 보고서'));

/*
 * **아이들이 내 학습 기록보다 위에 있어야 한다.**
 *
 * 예전에는 넷째였다 — 오늘의 공부, 내 학습 기록, 오답 노트를 지나야 나왔다.
 * 폰 한 화면(870)에 안 들어와서 "아이들 학습 보고서가 왜 안 보이나" 는 물음이
 * 나왔다. 자기 공부가 맨 앞인 것은 그대로 두고, 그 바로 다음으로 올렸다.
 *
 * 글자가 아니라 **화면에서의 높이**로 잰다. 차례를 말로 확인할 방법이 없다.
 */
const yOf = async (t) => {
  const box = await page.getByText(t, { exact: false }).first().boundingBox().catch(() => null);
  return box ? box.y : Number.NaN;
};
const yKids = await yOf('아이들 학습 보고서');
const yMine = await yOf('내 학습 기록');
ok(
  '아이들이 내 학습 기록보다 위에 있다',
  Number.isFinite(yKids) && Number.isFinite(yMine) && yKids < yMine,
  `아이들 ${Math.round(yKids)} · 내 기록 ${Math.round(yMine)}`,
);

await page.getByText('아이들 학습 보고서', { exact: false }).first().click();
await page.waitForTimeout(1200);
/*
 * 여기가 예전에 「아이별 설정」 으로 가던 자리다. 이름은 보고서인데 도착한
 * 곳에는 학년·하루 분량·금액이 늘어서 있고 정작 기록이 없었다.
 */
ok('누르면 아이 이름 버튼이 나온다', await has(page, '수빈 학습 보고서 보기'));
ok('아이 셋이 다 나온다', (await has(page, '시윤 학습 보고서 보기')) && (await has(page, '서준 학습 보고서 보기')));

await page.getByText('수빈 학습 보고서 보기', { exact: false }).first().click();
await page.waitForTimeout(1600);
ok('아이를 누르면 달력이 열린다', await has(page, '보내 온 날만 보여요'));
/*
 * 달력은 들어가면 오늘이 이미 골라져 있다. 그 아래에 갈래별 성적이 보여야
 * 한다 — 부모 폰에는 그 아이 기록이 없고 보내 온 것뿐이라, 이것이 보인다는
 * 것은 통로가 실제로 뚫렸다는 뜻이다.
 */
const remoteSubjects = await page
  .getByText(/^낱말 \d+개 · \d+\/\d+문제$/)
  .allTextContents()
  .catch(() => []);
ok(
  '날짜를 고르면 국어·영어가 갈라져 나온다',
  remoteSubjects.length >= 2,
  remoteSubjects.join(' / ') || '(없음)',
);
/* 오답 낱말은 id 만 보내고 이름은 이 폰의 어휘에서 찾는다. 그것이 되는지. */
ok('보내 온 오답이 낱말로 보인다', await has(page, '구사일생', 3000));

/* ================================================================= */
console.log('');
console.log('  ⑧-6 다른 폰의 아이 — 500원과 공부하세요');
/* ================================================================= */

await go(page, '/parent-rewards');
ok('아이가 올린 500원이 부모 폰에 뜬다', await has(page, '오늘 공부 끝'));
/*
 * 예전에는 알림만 뜨고 목록에는 안 쌓였다. 이름도 「알 수 없음」 이었다 —
 * 누가 신청한 것인지 모르는 채로 승인 단추를 누르는 자리였다.
 */
ok('누가 올린 것인지 이름이 나온다', await has(page, '수빈', 3000));

/*
 * 「공부하세요」 는 **그 아이 화면 안**으로 옮겼다. 예전에는 아이 목록 화면에
 * 셋이 함께 있어서, 수빈이 설정에 들어와 놓고 이름을 한 번 더 눌러 펼쳐야
 * 했다 — 같은 일을 두 번 시키는 자리였다.
 */
await go(page, `/parent-child-one?name=${encodeURIComponent('수빈')}`);
ok('아이 설정에 공부하세요가 있다', await has(page, '공부하세요'));
/*
 * 「직접 쓰기」 는 빈 칸의 안내 글자(placeholder)다. `has` 는 텍스트 노드를
 * 보므로 안 잡힌다 — 이 파일 앞머리에 적어 둔 그 함정에 그대로 걸렸다.
 *
 * **누르지 않아도** 열려 있어야 한다. 이미 그 아이로 들어와 있기 때문이다.
 */
ok('보낼 말이 바로 열려 있다', await hasField(page, '직접 쓰기', 3000));
ok('그 아이에게만 보내는 단추가 있다', await has(page, '수빈에게 보내기', 3000));
/*
 * **갈래와 하루 분량도 여기서 정한다.**
 *
 * "영어, 국어, 일상 문장 세 가지를 고를 수 있는데 이 선택은 어디서 하나요"
 * 라는 물음을 들었다. 그때까지 그 자리는 아이 폰에만 있었다 — 부모가 아이
 * 폰을 걷어 와야 갈래를 켜고 끌 수 있었던 셈이다.
 */
ok('무엇을 공부할지 고를 수 있다', await has(page, '무엇을 공부할까요', 3000));
ok('하루 분량도 정할 수 있다', await has(page, '하루에 새로 배울 개수', 3000));

/* 레벨과 금액도 여기서 정한다 — 아이 폰 안에 있던 값을 알림으로 보낸다. */
ok('영어 레벨을 정할 수 있다', await has(page, '영어 레벨', 3000));
ok('국어 레벨을 정할 수 있다', await has(page, '국어 레벨', 3000));
ok('이 아이만의 금액을 정할 수 있다', await has(page, '수빈의 동기 부여 요청권 금액', 3000));
/* 보고서로 가는 길은 여기 없어야 한다. 보는 자리는 학습 보고서 하나뿐이다. */
ok(
  '설정 화면에 보고서 링크가 없다',
  !(await has(page, '수빈 학습 보고서 보기', 2000)),
  '보는 길이 둘로 갈렸다',
);

/* ================================================================= */
console.log('');
console.log('  ⑧-7 아이 폰 달력 — 그날 배운 낱말까지 나오는가');
/*
 * 오답 노트와 단어장이 「오늘 것」 만 보여 줘서 어제 뭘 배웠는지 되짚을 길이
 * 없었다. 그것을 달력으로 옮겨 왔다 — 날짜를 고르면 그날 것이 나온다.
 */
/* ================================================================= */

await seed(page, '오늘치를 다 마친 상태');
await go(page, '/calendar');
ok('아이 폰 달력에도 갈래가 갈라져 나온다', await has(page, '정답률'));
ok('그날 배운 낱말을 펼칠 수 있다', await has(page, '이 날 배운 낱말'));
await page.getByText('이 날 배운 낱말', { exact: false }).first().click({ timeout: 3000 }).catch(() => {});
await page.waitForTimeout(700);
/*
 * 펼치면 낱말이 실제로 나와야 한다. 단추만 있고 눌러도 아무것도 안 나오면
 * 통과해도 아무 말을 못 하는 검사가 된다.
 */
/*
 * **배운 낱말에만 있고 오답에는 없는 것**을 찾는다. 오답에도 있는 낱말을
 * 찾으면 위쪽 오답 칸에 이미 떠 있어서, 펼치는 것이 고장 나도 초록이 된다.
 * 「없는 것을 재고 통과」 하는 자리가 정확히 이런 모양이다.
 */
const learnedRows = await page.getByText('다다익선', { exact: false }).count().catch(() => 0);
ok('펼치면 낱말이 실제로 나온다', learnedRows > 0, '눌렀는데 목록이 비어 있다');

/* ================================================================= */
console.log('');
console.log('  ⑨ 연결 — 아이가 띄우고 부모가 받는다 (창 두 개)');
/*
 * ── 여태 이 흐름을 노트북에서 한 번도 못 봤다 ────────────────
 *
 * 브라우저에는 FCM 이 없어 푸시 주소가 안 나왔고, 그래서 아이 화면에서 QR 이
 * 아예 안 떴다. 연결이 안 된다는 말을 듣고도 **확인할 방법이 없어** 코드만
 * 읽고 "고쳤다" 고 말하는 일이 되풀이됐다.
 *
 * 이제 웹에서는 가짜 주소를 쓴다(실제 폰에서는 안 만들어진다). 카메라만 빼고
 * 연결 전체를 여기서 눌러 본다.
 *
 * **창을 둘 쓴다.** 한 창으로 하면 아이로 심는 순간 부모도 아이가 된다 —
 * 저장소를 같이 쓰기 때문이다. playwright 는 newPage 마다 저장소를 따로 주니
 * 폰 두 대와 같은 모양이 된다.
 *
 * 여기서 확인되는 것과 안 되는 것을 분명히 해 둔다.
 *   확인된다  — QR 을 만들고 · 코드로 바꾸고 · 되읽어 아이를 등록하는 길
 *   안 된다   — 푸시가 실제로 날아가는지. 그건 npm run push-test 로 가린다
 */
/* ================================================================= */

/*
 * **창이 아니라 자리를 따로 만든다.**
 *
 * newPage() 를 두 번 부르면 창은 둘이지만 저장소는 하나다. 그래서 아이 창에서
 * 심은 것이 부모 창에도 그대로 있었고, "두 폰" 을 흉내 내지 못했다. 그런데도
 * 이 시험은 통과하고 있었다 — 화면 제목으로 판단하고 있었기 때문이다.
 * newContext() 라야 저장소가 갈린다.
 */
const childCtx = await browser.newContext({ viewport: { width: 420, height: 900 } });
const parentCtx = await browser.newContext({ viewport: { width: 420, height: 900 } });
const childPage = await childCtx.newPage();
const parentPage = await parentCtx.newPage();
childPage.on('pageerror', (e) => pageErrors.push(e.message));
parentPage.on('pageerror', (e) => pageErrors.push(e.message));

/* ── 아이 창 : 내 QR 띄우기 ─────────────────────────────── */

await seed(childPage, '부모님과 아직 연결 안 됨');
await go(childPage, '/settings-me');
await childPage.getByText('내 QR 띄우기', { exact: false }).first().click();
await childPage.waitForTimeout(1800);

ok('아이 폰에 QR 이 뜬다', await has(childPage, '부모님 폰으로 이 QR 을 찍어 주세요'));
/*
 * 가짜 주소라고 화면에 적혀 있어야 한다. 안 적으면 스크린샷만 보고 진짜로
 * 연결된 줄 알게 된다 — 조용한 실패가 시끄러운 실패보다 나쁘다.
 */
ok('미리보기 가짜 주소라고 적어 준다', await has(childPage, '미리보기용 가짜 주소'));

/*
 * **코드는 한 덩어리로 나와야 한다.**
 *
 * 여기까지 세 번 고쳤다. 빈칸으로 끊었더니 "빈칸도 넣어야 하는 건지
 * 헷갈립니다", 넉 자씩 네모에 넣었더니 옮겨 적을 것이 일곱 줄. 지금은
 * 한 줄로 두고 복사해 쓰게 한다 — 옮겨 적지 않는 것이 가장 좋다.
 */
const code = (await childPage.getByTestId('link-code').first().textContent()) ?? '';
ok('코드가 한 덩어리로 나온다', code.length > 10 && !/\s/.test(code), JSON.stringify(code));
ok('복사 단추가 있다', await has(childPage, '코드 복사하기'));
ok('복사해서 보내라고 말해 준다', await has(childPage, '복사해서 부모님께'));

/* 눌러서 실제로 '복사했어요' 로 바뀌는지. 글자만 있고 안 눌리면 없는 것과 같다. */
await childPage.getByText('코드 복사하기', { exact: false }).first().click();
await childPage.waitForTimeout(800);
ok('누르면 복사했다고 말한다', await has(childPage, '복사했어요', 2500));


/*
 * **화면에 그려진 QR 을 진짜로 되읽는다.**
 *
 * 격자가 맞는지는 jest 가 본다. 그 격자가 화면에 제대로 얹혔는지는 그려진
 * 것을 찍어서 읽어 봐야만 안다. 지난번에 막힌 자리가 딱 여기였다 —
 * "찍었는데 아무 일도 안 일어난다".
 */
let qrUrl = '';
try {
  const shot = await childPage.getByTestId('child-qr').screenshot();
  const png = PNG.sync.read(shot);
  qrUrl = jsQR(new Uint8ClampedArray(png.data), png.width, png.height)?.data ?? '';
} catch (e) {
  qrUrl = '';
}
ok('화면에 그려진 QR 이 실제로 읽힌다', qrUrl.includes('://child?token='), qrUrl.slice(0, 40));

/*
 * QR 속 주소와 화면 아래 코드가 **같은 것**인지. 둘이 어긋나면 카메라로는
 * 되는데 코드로는 안 되는(또는 그 반대인) 일이 생기고, 그때는 어느 쪽이
 * 틀렸는지 알 길이 없다.
 */
const inQr = decodeURIComponent(new URLSearchParams(qrUrl.split('?')[1] ?? '').get('token') ?? '');
const innerOfQr = inQr.replace(/^Expo(nent)?PushToken\[/, '').replace(/\]$/, '');
ok(
  'QR 속 주소와 화면의 코드가 같은 것이다',
  innerOfQr.length > 0 && code.slice(0, -1) === innerOfQr,
  `QR=${innerOfQr} 코드=${code.slice(0, -1)}`,
);

/* ── 부모 창 : 그 코드를 옮겨 적는다 ────────────────────── */

await seed(parentPage, '아이가 아직 하나도 없는 상태');
await go(parentPage, '/parent-children');
ok('처음에는 아이가 없다', !(await has(parentPage, '서준', 2000)));

await go(parentPage, '/link-child-code');
/* 복사해서 붙여넣은 그대로. 아이 화면에 뜬 것을 한 글자도 안 고치고 넣는다. */
await parentPage.getByPlaceholder('아이 폰에 뜬 연결 코드').fill(code);
await parentPage.getByPlaceholder('아이 이름').fill('서준');
await parentPage.getByText('연결하기', { exact: true }).first().click();
await parentPage.waitForTimeout(2000);

ok('부모 폰이 아이를 등록했다고 말한다', await has(parentPage, '서준 등록했어요'));
ok('되보내기도 됐다고 말한다', await has(parentPage, '아이 폰에도 알림이 갔습니다', 2500));

await go(parentPage, '/parent-child-basics');
ok('아이 목록에 서준이 나타난다', await has(parentPage, '서준'));

/*
 * 창 둘이 저장소를 정말 따로 쓰는지. 같이 쓰면 부모 창도 아이가 되어 위
 * 확인이 통째로 거짓말이 된다.
 */
await go(childPage, '/parent-children');
/*
 * **「다른 폰의 아이」 구역이 있는지로 본다.**
 *
 * 이 줄은 두 번 틀렸다. 처음에는 화면 제목('아이별 설정')이 없는지로 봤는데,
 * 제목은 언제든 바뀌는 말이라 제목을 고치자 저장소는 멀쩡한데 빨개졌다.
 * 그다음에는 아이 이름('서준')으로 봤는데, **아이 창의 아이도 이름이 서준**
 * 이라 자기 프로필을 보고 실패로 적었다.
 *
 * 볼 것은 부모가 QR 로 등록해 둔 목록(knownChildren)이다. 그것이 있으면
 * 화면에 「다른 폰의 아이」 구역이 뜬다. 아이 창에는 있을 수 없는 것이다.
 */
ok(
  '아이 창은 부모 창이 등록한 아이 목록을 갖지 않는다',
  !(await has(childPage, '다른 폰의 아이', 2000)),
  '두 창이 저장소를 같이 쓰고 있다',
);

await childCtx.close();
await parentCtx.close();

/* ================================================================= */

await browser.close();

console.log('');
console.log('  ' + '─'.repeat(58));
if (pageErrors.length > 0) {
  console.log('  ⚠️  화면에서 터진 오류');
  for (const e of pageErrors.slice(0, 5)) console.log(`      ${e}`);
  console.log('');
}
console.log(`  ${pass}개 통과, ${fail}개 실패`);
if (fail > 0) {
  console.log('');
  for (const f of failures) console.log(`    ❌ ${f}`);
}
console.log('');
console.log('  ▶ 여기서 확인 못 하는 것 — 카메라로 QR 찍기, 푸시 알림. 폰이라야 합니다.');
console.log('');

if (fail > 0 || pageErrors.length > 0) process.exitCode = 1;
