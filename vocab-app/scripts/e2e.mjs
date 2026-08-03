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
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

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
ok('오늘 틀린 것부터 라고 적혀 있다', await has(page, '오늘 틀린 것부터'));

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

/*
 * **연결하는 길이 하나뿐인지.**
 *
 * 두 방향을 다 지원하던 것을 하나로 줄였다. 없앤 쪽의 입구가 어딘가 남아
 * 있으면 눌러 보고 멈추게 되므로, 남아 있지 않은 것까지 함께 본다.
 */
await go(page, '/parent-child-devices');
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

await go(page, '/settings-me');
ok('내 캐릭터 설정이 있다', await has(page, '내 캐릭터 설정'));
ok('부모님과 연결하기가 여기로 왔다', await has(page, '내 QR 띄우기'));
ok('백업 및 복구가 여기로 왔다', await has(page, '공부 기록 백업 및 복구'));
ok('문의하기가 여기로 왔다', await has(page, '이상한 점 알려주기'));
ok('아이 설정에 코드로 연결하기는 없다', !(await has(page, 'QR 말고 코드로 연결하기', 1500)));

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

await go(page, '/parent-child-devices');
ok('기본 동기 부여 요청권 금액 설정', await has(page, '기본 동기 부여 요청권 금액 설정'));
ok('금액을 직접 적는 기타 칸이 있다', await has(page, '기타'));
ok('84만원 합계 문구는 없앴다', !(await has(page, '84만원', 1500)));
ok('요구권 이라는 옛말이 안 남아 있다', !(await has(page, '요구권', 1500)));

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
ok('낱말 개수가 함께 나온다', await has(page, '영어 3690개'));

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

const childPage = await browser.newPage({ viewport: { width: 420, height: 900 } });
const parentPage = await browser.newPage({ viewport: { width: 420, height: 900 } });
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

const chunks = await childPage.getByTestId('link-code-chunk').allTextContents();
ok('코드가 넉 자씩 끊겨 나온다', chunks.length >= 5, `${chunks.length}줄`);
ok(
  '마지막 줄 빼고 모두 넉 자다',
  chunks.length > 1 && chunks.slice(0, -1).every((c) => c.length === 4),
  chunks.join('|'),
);
/*
 * **"빈칸도 넣어야 하나" 를 없앤 줄이 화면에 있는지.**
 *
 * 실제로 이 말을 들었다 — "빈칸도 구분해서 넣어야 하는 건지 헷갈립니다".
 * 넣어야 하나 말아야 하나를 고민하는 순간 이미 틀릴 준비가 된 것이다.
 */
ok('네모 안의 글자만 적으면 된다고 말해 준다', await has(childPage, '네모 안의 글자만'));
ok('띄어쓰기는 신경 안 써도 된다고 말해 준다', await has(childPage, '띄어쓰기는 신경 쓰지'));
/* 토막마다 네모가 쳐져 있는지. 끊는 자리를 테두리가 맡아야 빈칸이 사라진다. */
ok(
  '토막마다 네모가 쳐져 있다',
  await looksPressable(childPage, chunks[0]),
  '테두리가 없으면 어디까지가 한 토막인지 다시 헷갈린다',
);

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
  innerOfQr.length > 0 && chunks.join('').slice(0, -1) === innerOfQr,
  `QR=${innerOfQr} 코드=${chunks.join('').slice(0, -1)}`,
);

/* ── 부모 창 : 그 코드를 옮겨 적는다 ────────────────────── */

await seed(parentPage, '아이가 아직 하나도 없는 상태');
await go(parentPage, '/parent-children');
ok('처음에는 아이가 없다', !(await has(parentPage, '서준', 2000)));

await go(parentPage, '/link-child-code');
/*
 * 사람이 화면을 보고 옮겨 적는 그대로. 줄로 끊긴 것을 줄바꿈째 넣는다 —
 * 되돌리는 쪽이 공백 종류를 안 가리는지도 여기서 함께 확인된다.
 */
await parentPage.getByPlaceholder('아이 폰에 뜬 연결 코드').fill(chunks.join('\n'));
await parentPage.getByPlaceholder('아이 이름').fill('서준');
await parentPage.getByText('연결하기', { exact: true }).first().click();
await parentPage.waitForTimeout(2000);

ok('부모 폰이 아이를 등록했다고 말한다', await has(parentPage, '서준 등록했어요'));
ok('되보내기도 됐다고 말한다', await has(parentPage, '아이 폰에도 알림이 갔습니다', 2500));

await go(parentPage, '/parent-children');
ok('아이 목록에 서준이 나타난다', await has(parentPage, '서준'));

/*
 * 창 둘이 저장소를 정말 따로 쓰는지. 같이 쓰면 부모 창도 아이가 되어 위
 * 확인이 통째로 거짓말이 된다.
 */
await go(childPage, '/parent-children');
ok(
  '아이 창은 부모 창의 아이 목록을 갖지 않는다',
  !(await has(childPage, '아이별 설정', 2000)),
  '두 창이 저장소를 같이 쓰고 있다',
);

await childPage.close();
await parentPage.close();

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
