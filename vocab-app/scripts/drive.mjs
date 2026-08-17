#!/usr/bin/env node
/**
 * 부모 폰을 **실제로 눌러 가며** 동작을 확인한다.
 *
 *   node scripts/drive.mjs
 *
 * ── walk.mjs 와 무엇이 다른가 ───────────────────────────────
 *
 * `walk.mjs` 는 화면을 밟아 **거기 있는지**만 본다. 그것으로는 「상 주기 단추를
 * 눌렀을 때 실제로 상이 나가는가」 를 알 수 없다. 회원님 말: "각각 클릭해서
 * 어떻게 동작하는지까지 시뮬레이션 합니다."
 *
 * 그래서 여기서는 누른다. 누르고 **화면이 어떻게 달라졌는지**를 본다 —
 * 요청이 목록에서 사라졌는지, 보냈다는 말이 떴는지.
 *
 * 회원님 구성(아이 셋이 각자 폰, 부모 폰에는 프로필 없음)으로 심는다. 데모에
 * 수빈이 오늘치 500원을 올려 둔 상태가 들어 있어 승인까지 눌러 볼 수 있다.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.E2E_BASE ?? 'http://localhost:8088';
const OUT = process.env.SHOT_DIR ?? 'review/drive';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({});
const ctx = await browser.newContext({ viewport: { width: 412, height: 870 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]));

let pass = 0;
let fail = 0;
function ok(what, good, detail = '') {
  if (good) {
    pass += 1;
    console.log(`  ✅ ${what}`);
  } else {
    fail += 1;
    console.log(`  ❌ ${what}${detail ? '  ' + detail : ''}`);
  }
}

const has = async (text, ms = 4000) =>
  page.getByText(text, { exact: false }).first().isVisible({ timeout: ms }).catch(() => false);

/** 글자를 눌러 들어간다. 못 찾으면 false. */
async function tap(text, ms = 4000) {
  const el = page.getByText(text, { exact: false }).first();
  if (!(await el.isVisible({ timeout: ms }).catch(() => false))) return false;
  await el.click().catch(() => {});
  await page.waitForTimeout(900);
  return true;
}

/**
 * 화면을 찍는다. **스크롤 아래까지 통째로** 담는다(`fullPage`).
 *
 * 폰 한 화면(870)만 찍었더니 그 아래가 잘려 나갔다 — 상 승인 카드를 보려고
 * 찍은 장에서 정작 공부하세요가 반쯤 잘리는 식이었다. "화면이 짤립니다,
 * 화면이 다 보이도록 해주세요" 라는 말을 들은 자리다.
 *
 * 세로로 길어지지만 그것이 맞다. 폰에서도 손가락으로 내려 보는 화면이다.
 */
async function shot(name) {
  await page.screenshot({ path: `${OUT}/${name}.png`, fullPage: true });
}

/* 회원님 구성으로 심는다. */
await page.goto(`${BASE}/demo/`);
await page.getByText('아이 셋이 각자 폰을 쓰는 상태', { exact: false }).first().click();
await page.waitForTimeout(1800);

console.log('\n부모 폰 — 눌러 가며 확인합니다\n');

/* ── ① 홈에서 아이들 학습 보고서로 ───────────────────────────── */
await page.goto(`${BASE}/parent-home`);
await page.waitForTimeout(1400);
ok('홈에 아이들 학습 보고서가 있다', await has('아이들 학습 보고서'));
ok('올라온 요청 건수가 홈에 적힌다', await has('동기 부여 요청권'));
await shot('01-home');

ok('눌러서 아이 고르는 화면으로 간다', await tap('아이들 학습 보고서'));

/* ── ② 아이 고르는 화면에는 부르기도 설정도 없어야 한다 ─────── */
ok('아이 셋이 나온다', (await has('수빈')) && (await has('시윤')) && (await has('서준')));
ok('여기에 공부하세요가 없다', !(await has('공부하세요', 1500)), '아직 남아 있다');
ok('여기에 아이별 설정 링크가 없다', !(await has('아이별 설정 하기', 1500)), '아직 남아 있다');
await shot('02-reports');

/* ── ③ 수빈 보고서로 들어간다 ───────────────────────────────── */
ok('수빈 보고서로 들어간다', await tap('수빈 학습 보고서 보기'));
await page.waitForTimeout(1200);
await shot('03-subin');

/* 갈래별 성적 — 영어와 국어가 **둘 다** 나와야 한다. */
const subjects = await page.getByText(/^낱말 \d+개 · \d+\/\d+문제$/).allTextContents().catch(() => []);
ok('그날 갈래별 성적이 둘 이상 나온다', subjects.length >= 2, subjects.join(' / ') || '(없음)');
/*
 * **글자가 있는지는 `count` 로 센다.**
 *
 * `isVisible` 로 봤더니 둘 다 실패했는데, 화면을 찍어 보면 영어·국어가 멀쩡히
 * 있었다 — 스크롤 아래에 있어서 안 보이는 것으로 읽힌 것이다. 화면 밖이라고
 * 없는 것은 아니다. 없는 것을 확인할 때(`!has(...)`)는 지금처럼 눈에 보이는지
 * 보는 편이 맞지만, **있는지**는 세는 편이 맞다.
 */
const near = async (text) => (await page.getByText(text, { exact: false }).count()) > 0;
ok('영어 칸이 있다', await near('영어'));
ok('국어 칸이 있다', await near('국어'));

/* ── ④ 상 주기 — 눌러서 실제로 나가는지 ─────────────────────── */
ok('올라온 상이 이 화면에 보인다', await has('올린 상'));
ok('금액이 적혀 있다', await has('500원'));
await page.getByText('올린 상', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(400);
await shot('04-reward');

const gave = await tap('주기로 하기');
ok('「주기로 하기」 를 누를 수 있다', gave);
if (gave) {
  await page.waitForTimeout(1200);
  /* 준 뒤에는 그 요청이 목록에서 사라져야 한다. 남아 있으면 안 나간 것이다. */
  ok('주고 나면 목록에서 사라진다', !(await has('올린 상', 2000)), '아직 남아 있다');
  await shot('05-after-reward');
}

/* ── ⑤ 공부하세요 — 눌러서 보내지는지 ───────────────────────── */
ok('같은 화면에 공부하세요가 있다', await has('공부하세요'));
await page.getByText('공부하세요', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(400);
ok('이 아이에게만 보내는 단추다', await has('수빈에게 보내기'));
await shot('06-nudge');

/* 문구를 하나 골라 보낸다. 보낸 뒤 결과 한 줄이 떠야 한다. */
await tap('오늘 공부 시작할 시간이에요');
const sent = await tap('수빈에게 보내기');
ok('「수빈에게 보내기」 를 누를 수 있다', sent);
if (sent) {
  await page.waitForTimeout(1600);
  /*
   * 노트북에서는 실제로 알림이 안 간다(푸시는 폰이라야 한다). 여기서 보려는
   * 것은 **눌렀을 때 앱이 무엇이든 대답하는가** 다 — 조용히 아무 일도 안
   * 일어나면 눌린 것인지 알 수 없다.
   */
  const replied = (await has('보냈', 3000)) || (await has('못', 3000)) || (await has('실패', 3000));
  ok('누르면 결과를 말해 준다', replied, '아무 대답이 없다');
  await shot('07-after-nudge');
}

/* ── ⑥ 아이 개별 설정에는 부르기가 없어야 한다 ──────────────── */
await page.goto(`${BASE}/parent-child-one?name=${encodeURIComponent('수빈')}`);
await page.waitForTimeout(1400);
ok('아이 개별 설정이 열린다', await has('무엇을 공부할까요'));
ok('여기에는 공부하세요가 없다', !(await has('공부하세요', 1500)), '아직 남아 있다');
await shot('08-child-one');

/* ── ⑦ 판 번호가 폰 단추에 안 붙는지 ───────────────────────── */
await page.goto(`${BASE}/parent-settings`);
await page.waitForTimeout(1200);
const stamp = page.getByText(/^20\d\d\.\d\d\.\d\d\.\d\d\.\d\d$/).first();
if (await stamp.isVisible({ timeout: 3000 }).catch(() => false)) {
  const box = await stamp.boundingBox();
  const room = box ? 870 - (box.y + box.height) : 0;
  ok('판 시각 아래에 여백이 있다', room > 24 || box.y < 600, `아래 여백 ${Math.round(room)}px`);
} else {
  ok('판 시각 아래에 여백이 있다', false, '시각을 못 찾음');
}
await shot('09-settings');

/* ══════════════════════════════════════════════════════════════
   아이 폰 — 갈래별 단추와 공부 화면
   ══════════════════════════════════════════════════════════════ */
console.log('\n아이 폰 — 갈래별 단추와 공부 화면\n');

/*
 * 셋을 다 켠 아이로, **아직 아무것도 안 한 상태**로 심는다. 오늘치를 다 마친
 * 씨앗으로는 단추가 「끝냈어요 — 한 번 더」 로 바뀌어서, 정작 「영어 공부
 * 시작하기 (N문제)」 를 볼 수가 없다.
 */
await page.goto(`${BASE}/demo/`);
await page
  .getByText('영어 · 국어 · 일상 문장을 다 켠 상태', { exact: false })
  .first()
  .click({ noWaitAfter: true })
  .catch(() => {});
await page.waitForTimeout(2500);

await page.goto(`${BASE}/home`);
await page.waitForTimeout(1600);
await shot('10-child-home');

/* 켠 갈래마다 단추가 하나씩 서야 한다. */
const buttons = await page.getByText(/공부 시작하기 \(\d+문제\)/).allTextContents().catch(() => []);
ok('갈래마다 공부 단추가 있다', buttons.length >= 2, buttons.join(' / ') || '(없음)');
ok('단추에 문제 수가 적혀 있다', buttons.every((b) => /\(\d+문제\)/.test(b)), buttons.join(' / '));

/* 갈래별 진도가 켠 대로 셋 다 서야 한다. */
const progress = await page.getByText(/진도$/).allTextContents().catch(() => []);
ok('진도가 갈래마다 있다', progress.length >= 2, progress.join(' / ') || '(없음)');
await page.getByText('진도', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
await page.waitForTimeout(400);
await shot('11-child-progress');

/*
 * ── 공부 화면으로 들어간다 ──────────────────────────────────
 *
 * "몇개의 단어를 공부하는지 확인해 봐야 합니다." 단추에 적힌 수와 들어가서
 * 보는 `1/N` 이 **같아야** 한다. 예전에는 단추가 낱말을, 화면이 문항을 세서
 * 18 과 57 로 갈렸다.
 */
const first = buttons[0] ?? '';
const promised2 = Number(first.match(/\((\d+)문제\)/)?.[1] ?? 0);
ok('첫 단추의 문제 수를 읽었다', promised2 > 0, first || '(못 읽음)');

if (promised2 > 0) {
  await page.getByText(/공부 시작하기 \(\d+문제\)/).first().click().catch(() => {});
  await page.waitForTimeout(2600);
  await shot('12-study');

  const counter = await page.getByText(/^\d+\/\d+$/).first().textContent().catch(() => null);
  const total = counter ? Number(counter.split('/')[1]) : 0;
  ok('단추에 적힌 수와 공부 화면의 총계가 같다', total === promised2, `단추 ${promised2} · 화면 ${total}`);
  ok('무슨 갈래인지 화면에 적혀 있다', (await page.getByTestId('subject-tag').count()) > 0);
}

await browser.close();

console.log('');
if (errors.length) {
  console.log('!! 화면이 낸 오류');
  for (const e of errors.slice(0, 6)) console.log('   ' + e);
}
console.log(`  ${pass}개 통과, ${fail}개 실패`);
console.log(`  ${OUT} 에 눌러 가며 찍은 것을 넣었습니다.`);
if (fail > 0 || errors.length) process.exitCode = 1;
