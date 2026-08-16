#!/usr/bin/env node
/**
 * 부모 폰 화면을 **순서대로 눌러 가며** 찍고, 같은 화면에 두 길로 닿는지 본다.
 *
 *   node scripts/walk.mjs
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * "자꾸 중복되는 화면이 여기 저기 흩어져 있습니다" 라는 말을 들었다. 실제로
 * 「아이 보고서와 설정」 이 보고서와 설정을 겸했고, 「아이별 설정」 이 또 따로
 * 있었다. 화면을 하나씩 찍어 보는 것만으로는 이런 겹침이 안 보인다 — 각각은
 * 멀쩡하고, 겹친다는 것은 **길을 밟아 봐야** 드러난다.
 *
 * 그래서 홈에서 시작해 실제로 눌러 들어간다. 도착한 화면의 제목을 적어 두고,
 * 같은 제목에 두 길로 닿으면 그 자리를 짚어 준다.
 */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = process.env.E2E_BASE ?? 'http://localhost:8089';
const OUT = process.env.SHOT_DIR ?? 'review/walk';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({});
const ctx = await browser.newContext({ viewport: { width: 412, height: 870 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();

const errors = [];
page.on('pageerror', (e) => errors.push(e.message.split('\n')[0]));

/**
 * 밟아 온 화면들. **길이 아니라 도착지(URL)로 센다.**
 *
 * 처음에는 화면 제목으로 셌는데 경고가 죄다 헛짚었다 — expo-router 는 화면을
 * 옮긴 뒤에도 머리글을 한 박자 늦게 갈아서, 새 화면에서 앞 화면 제목이
 * 읽힌다. 겹치는지 아닌지는 **어디에 닿았나**로 가려야 한다.
 */
const seen = new Map();
let step = 0;

/** 화면을 알아볼 첫 줄. 머리글이 없는 화면도 있어 본문에서 읽는다. */
async function firstLine() {
  const body = await page.locator('body').innerText();
  const line = body
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l.length > 1);
  return line ?? '(빈 화면)';
}

async function shot(label, how) {
  step += 1;
  const n = String(step).padStart(2, '0');
  await how();
  await page.waitForTimeout(900);

  const url = new URL(page.url()).pathname + new URL(page.url()).search;
  const line = await firstLine();

  const before = seen.get(url);
  if (before) {
    console.log(`   ⚠ 같은 화면에 두 길로 닿습니다 — ${before} / ${label}   (${url})`);
  } else {
    seen.set(url, label);
  }

  await page.screenshot({ path: `${OUT}/${n}-${label}.png` });
  console.log(`  ${n}. ${label.padEnd(20)} ${url.padEnd(36)} ${line.slice(0, 22)}`);
}

/** 글자를 눌러 들어간다. 못 찾으면 그 자리를 알린다. */
async function tap(text) {
  const el = page.getByText(text, { exact: false }).first();
  const ok = await el.isVisible({ timeout: 3000 }).catch(() => false);
  if (!ok) {
    console.log(`   ✖ 「${text}」 를 못 찾았습니다`);
    return false;
  }
  await el.click().catch(() => {});
  return true;
}

async function backTo(path) {
  await page.goto(`${BASE}${path}`);
  await page.waitForTimeout(1200);
}

/* 회원님 구성 — 아이 셋이 각자 폰을 쓴다. */
await page.goto(`${BASE}/demo/`);
await page.getByText('아이 셋이 각자 폰을 쓰는 상태', { exact: false }).first().click();
await page.waitForTimeout(1600);

console.log('\n부모 폰 — 홈에서 시작해 눌러 갑니다\n');

await shot('홈', () => backTo('/parent-home'));

console.log('\n  ⚙️ 설정 갈래 다섯');
await shot('설정', async () => { await tap('설정'); });
await shot('설정-아이들기본', async () => { await tap('아이들 기본 설정'); });
await shot('설정-아이하나', async () => { await tap('수빈 설정'); });
await shot('설정-요청권금액', async () => {
  await backTo('/parent-child-basics');
  await tap('동기 부여 요청권');
});
await shot('설정-내공부', async () => { await backTo('/parent-settings'); await tap('내 공부 설정'); });
await shot('설정-소리', async () => { await backTo('/parent-settings'); await tap('소리와 목소리'); });
await shot('설정-폰연결', async () => { await backTo('/parent-settings'); await tap('아이들 폰 연결'); });
await shot('설정-백업PIN', async () => { await backTo('/parent-settings'); await tap('백업 및 PIN 설정'); });

console.log('\n  👧 홈 → 학습 보고서');
await shot('보고서-아이고르기', async () => { await backTo('/parent-home'); await tap('아이들 학습 보고서'); });
await shot('보고서-달력', async () => { await tap('수빈 학습 보고서 보기'); });

console.log('\n  🎁 홈 → 보상 요청');
await shot('보상승인', () => backTo('/parent-rewards'));

await browser.close();

console.log('');
if (errors.length) {
  console.log('!! 화면이 낸 오류');
  for (const e of errors.slice(0, 6)) console.log('   ' + e);
  process.exitCode = 1;
} else {
  console.log('화면이 낸 오류 없음.');
}
console.log(`${OUT} 에 넣었습니다.`);
