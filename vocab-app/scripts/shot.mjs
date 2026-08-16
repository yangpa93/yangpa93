#!/usr/bin/env node
/**
 * 화면을 폰 크기 그대로 찍는다. 승인받기 전에 눈으로 보여 드리려는 것이다.
 *
 *   node scripts/shot.mjs
 *
 * **스크롤 없이 보이는 만큼만 찍는다**(fullPage 를 안 쓴다). 한 화면에
 * 들어오는지가 이 그림으로 가려져야 하기 때문이다. 전체를 이어 붙여 찍으면
 * 길어도 다 보여서, 정작 폰에서 안 보이는 것을 못 잡는다.
 *
 * 부모 폰과 아이 폰을 따로 찍는다. 이 둘은 심는 상태가 달라서, 한쪽만 보고
 * 「된다」 고 말하면 다른 쪽에서 어긋난다 — 실제로 그렇게 틀린 적이 있다.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.E2E_BASE ?? 'http://localhost:8089';
const OUT = process.env.SHOT_DIR ?? 'review/shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({});

/** 갤럭시쯤 되는 크기. 회원님 폰과 같은 비율로 본다. */
const VIEWPORT = { width: 412, height: 870 };

const errors = [];

async function shot(name, seedLabel, steps) {
  const ctx = await browser.newContext({ viewport: VIEWPORT, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message.split('\n')[0]}`));

  await page.goto(`${BASE}/demo/`);
  await page.getByText(seedLabel, { exact: false }).first().click();
  await page.waitForTimeout(1600);

  await steps(page);
  await page.waitForTimeout(700);

  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(`  ${name}.png`);
  await ctx.close();
}

/** 회원님 구성 — 아이 셋이 각자 폰을 쓰고 이 폰에는 프로필이 없다. */
const REMOTE = '아이 셋이 각자 폰을 쓰는 상태';
/** 아이 폰 — 오늘치를 다 마친 상태 */
const CHILD_DONE = '오늘치를 다 마친 상태';

console.log('\n부모 폰');

await shot('p1-home', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-home`);
  await p.waitForTimeout(1200);
});

await shot('p2-reports', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-reports`);
  await p.waitForTimeout(1200);
});

await shot('p3-calendar', REMOTE, async (p) => {
  await p.goto(`${BASE}/calendar?name=${encodeURIComponent('수빈')}`);
  await p.waitForTimeout(1600);
});

await shot('p4-reward', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-rewards`);
  await p.waitForTimeout(1200);
});

/*
 * 「공부하세요」 는 이제 **아이 개별 설정 안에** 있다.
 *
 * 예전에는 아이를 다시 골라야 하는 제 화면(/parent-children)이 따로 있었다.
 * 수빈 설정에 들어와 놓고 거기서 또 수빈을 눌러야 했으니 한 번 더 고르는
 * 셈이었다. 그 화면은 지웠고, 여기서는 그 자리까지 내려서 찍는다.
 */
await shot('p5-nudge', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-child-one?name=${encodeURIComponent('수빈')}`);
  await p.waitForTimeout(1500);
  await p.getByText('공부하세요', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
  await p.waitForTimeout(400);
});

await shot('p6-settings', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-settings`);
  await p.waitForTimeout(1200);
});

/* 금액을 정하는 자리. 「하루치를 다 마쳤을 때」 가 매일 쌓이는 500원이다. */
await shot('p7-rates', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-awards-rates`);
  await p.waitForTimeout(1400);
});

await shot('p8-rates-daily', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-awards-rates`);
  await p.waitForTimeout(1400);
  // 첫 칸(하루치)이 화면에 들어오게 맞춰 둔다.
  await p.getByText('하루치를 다 마쳤을 때', { exact: false }).first()
    .scrollIntoViewIfNeeded().catch(() => {});
});

/* 아이들 기본 설정 — 공통(알림·금액)과 아이 개별로 가른 자리. */
await shot('p9-basics', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-child-basics`);
  await p.waitForTimeout(1400);
});

/* 아이 하나를 골라 들어간 화면. 과목과 「공부하세요」 만 있다. */
await shot('p10-child-one', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-child-one?name=${encodeURIComponent('수빈')}`);
  await p.waitForTimeout(1400);
});

await shot('p12-backup-pin', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-backup-pin`);
  await p.waitForTimeout(1200);
});

/*
 * 부모 소리 설정. 고치는 자리가 맨 위에 오고 가이드가 아래로 내려갔는지,
 * 「들어보기」 단추가 있는지 보는 자리다.
 */
await shot('p13-sound', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-sound`);
  await p.waitForTimeout(1400);
});

/*
 * 레벨 고르기.
 *
 * **국어 레벨을 짚어 내린다.** 「레벨」 첫 번째로 가면 영어 레벨 제목이
 * 화면 맨 아래에 걸려서, 정작 봐야 할 칸(레벨 1~4 와 그 밑의 개수)이
 * 잘려 나간다.
 */
await shot('p14-level', REMOTE, async (p) => {
  await p.goto(`${BASE}/parent-child-one?name=${encodeURIComponent('수빈')}`);
  await p.waitForTimeout(1500);
  await p.getByText('국어 레벨', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
  await p.waitForTimeout(400);
});

/*
 * 아이별 금액표는 **이 폰에 프로필이 있는 아이**에게만 있다. 다른 폰의 아이는
 * 부모 폰에 프로필이 없어 그 자리가 없다. 그래서 여기만 다른 상황을 심는다.
 */
await shot('p11-child-rates', '아이 둘이 등록된 상태', async (p) => {
  await p.goto(`${BASE}/child-report?profileId=p_demo_a`);
  await p.waitForTimeout(1600);
  // 아이별 금액표는 화면 아래쪽이다. 그 자리까지 내려서 찍는다.
  await p.getByText('의 동기 부여 요청권 금액', { exact: false }).first()
    .scrollIntoViewIfNeeded().catch(() => {});
  await p.waitForTimeout(500);
});

console.log('\n아이 폰');

await shot('c1-home', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/home`);
  await p.waitForTimeout(1400);
  // 저금통과 받을 것은 아래쪽이라 그 자리까지 내려서 찍는다.
  await p.getByText('이번 달 저금통', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
});

await shot('c2-calendar', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/calendar`);
  await p.waitForTimeout(1600);
});

await shot('c3-calendar-words', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/calendar`);
  await p.waitForTimeout(1600);
  await p.getByText('이 날 배운 낱말', { exact: false }).first().click({ timeout: 3000 }).catch(() => {});
  await p.waitForTimeout(600);
  await p.getByText('이 날 배운 낱말', { exact: false }).first().scrollIntoViewIfNeeded().catch(() => {});
});

/* 아이 폰 설정 — 지운 것이 없는지, 문구가 맞는지 보는 자리. */
await shot('c4-settings', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/settings`);
  await p.waitForTimeout(1400);
});

/* 아이 폰 소리 설정. 목소리·속도는 아이마다 따로다. */
await shot('c5-sound', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/settings-sound`);
  await p.waitForTimeout(1400);
});

/*
 * 아이 폰 학습 기록 — **국어** 자주 틀린 낱말이 나오는지.
 *
 * 「자주 틀린 낱말」 첫 번째는 영어 것이다. 국어는 그 아래에 있어서, 국어
 * 칸을 짚어 내려야 회원님이 물으신 자리가 화면에 든다.
 */
await shot('c6-report', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/calendar`);
  await p.waitForTimeout(1600);
  await p.getByText('국어', { exact: false }).last()
    .scrollIntoViewIfNeeded().catch(() => {});
  await p.waitForTimeout(400);
});

/* 판 정보 — 빌드 시각이 판 번호 뒤에 붙는 자리. */
await shot('c7-version', CHILD_DONE, async (p) => {
  await p.goto(`${BASE}/whats-new`);
  await p.waitForTimeout(1400);
});

await browser.close();

console.log(`\n${OUT} 에 넣었습니다.`);
if (errors.length) {
  console.log('\n!! 화면이 낸 오류');
  for (const e of errors.slice(0, 8)) console.log('   ' + e);
  process.exitCode = 1;
}
