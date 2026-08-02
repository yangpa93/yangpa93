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
import { existsSync } from 'node:fs';

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
ok('오늘 틀린 것부터 라고 적혀 있다', await has(page, '오늘 틀린 것부터'));

/* ================================================================= */
console.log('');
console.log('  ② 중간에 그만두면 다 한 것으로 안 적히는가');
/* ================================================================= */

await go(page, '/parent-home');
await page.getByText('공부 시작하기', { exact: false }).first().click();
await page.waitForTimeout(2000);
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
ok('아이들 폰 설정이 있다', await has(page, '아이들 폰 설정'));
ok('내 공부 설정이 있다', await has(page, '내 공부 설정'));
ok('소리와 목소리가 있다', await has(page, '소리와 목소리'));

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
ok('대신 길을 알려 준다', await has(page, '여기는 아이 폰에서 쓰는 화면이에요'));

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

await go(page, '/parent-child-devices');
ok('연결 카드에 코드 길이 있다', await has(page, '카메라가 안 되면 — 코드로 연결하기'));

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
ok('아직 연결 안 한 아이는 승인하기 화면', await has(page, '부모님이 보낸 요청 승인하기'));
ok('아이 쪽 코드 칸은 그대로', await hasField(page, '연결 코드 또는 주소'));

await go(page, '/settings');
ok('아이 설정에 소리가 있다', await has(page, '소리로 읽어주기'));
ok('아이 설정에 읽는 속도가 있다', await has(page, '읽는 속도'));

/*
 * 아이 화면도 부모와 **같은 단어장**을 쓴다. 그런데 아이 홈 타일의 밑줄이
 * '레벨별 전체 목록' 이라고 옛 설명을 그대로 달고 있어서, 눌러 보지 않으면
 * 오늘 것이 있는 줄을 몰랐다. 타일 글자까지 함께 본다.
 */
await go(page, '/home');
ok('아이 홈 타일이 오늘 배운 것부터라고 말한다', await has(page, '오늘 배운 것부터'));
ok('아이 홈 오답 노트도 오늘부터', await has(page, '오늘 틀린 것부터'));

await go(page, '/wordbook');
ok('아이 단어장에 오늘 배운 것 칸이 있다', await has(page, '오늘 배운 것'));
ok('아이 단어장에 전체 목록 칸이 있다', await has(page, '전체 목록'));

await page.getByText('전체 목록', { exact: false }).first().click();
await page.waitForTimeout(1200);
ok('아이도 전체 목록으로 넘어간다', await hasField(page, '단어나 뜻으로 검색'));

await go(page, '/mistakes');
ok('아이 오답 노트도 오늘 틀린 것이 맨 위', await has(page, '오늘 틀린 것'));

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
