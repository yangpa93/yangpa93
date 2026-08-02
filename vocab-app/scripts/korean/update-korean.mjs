#!/usr/bin/env node
/**
 * 국어 어휘를 다시 굽는 명령. 한 번만 부르면 된다.
 *
 *   npm run data:korean
 *
 * 인증키가 있으면 사전에서 용례까지 받아 온다.
 *
 *   $env:STDICT_KEY = "발급받은 키"   # PowerShell
 *   npm run data:korean
 *
 * 순서대로 이렇게 한다.
 *
 *   1. 표준국어대사전 용례 받기        (키 필요)
 *   2. 우리말샘 용례 받기 — 화면       (키 필요)
 *   3. 우리말샘 용례 받기 — API·뜻 단위 (키 필요)
 *   4. 위키문헌 원문 받기              (키 없이 됨)
 *   5. 고전 어휘를 원문과 맞추기       (키 없이 됨)
 *   6. 후보와 용례를 합치기            (키 없이 됨)
 *   7. 레벨 파일로 굽기                (키 없이 됨)
 *
 * **키가 없어도 멈추지 않는다.** 1·2를 건너뛰고 나머지를 한다. 이미 받아 둔
 * 용례가 korean/*-examples.json 에 남아 있어서, 자료를 다시 굽는 것만으로도
 * 뜻·난이도·교정 파일의 수정이 앱에 반영된다. 다만 **용례가 없어 레벨에 못
 * 들어간 어휘는 키가 있어야 채워진다.** 끝에 몇 개가 남았는지 적어 준다.
 *
 * 영어 쪽 `npm run data:update` 와 짝이다. 왜 한 줄로 묶었는지는 그쪽
 * 주석에 적어 두었다 — 순서를 사람이 기억하게 두면 언젠가 어긋난다.
 */

import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

const KEY = process.env.STDICT_KEY;

function run(label, script, { skip = false, why = '' } = {}) {
  if (skip) {
    console.log(`\n── ${label} — 건너뜀`);
    console.log(`   ${why}`);
    return;
  }
  console.log(`\n── ${label} ${'─'.repeat(Math.max(0, 52 - label.length))}`);
  const r = spawnSync(process.execPath, [script], { stdio: 'inherit' });
  if (r.status !== 0) {
    console.error(`\n✖ ${label} 에서 멈췄습니다.`);
    process.exit(r.status ?? 1);
  }
}

const noKey = !KEY;
const why =
  'STDICT_KEY 가 없습니다. 이미 받아 둔 용례로 진행합니다.\n' +
  '   키는 https://stdict.korean.go.kr/openapi/openApiInfo.do 에서 무료로 받습니다.';

run('표준국어대사전 용례', 'scripts/korean/stdict-examples.mjs', { skip: noKey, why });
run('우리말샘 용례 (화면)', 'scripts/korean/opendict-examples.mjs', { skip: noKey, why });
run('우리말샘 용례 (API·뜻 단위)', 'scripts/korean/opendict-api.mjs', { skip: noKey, why });
run('위키문헌 고전 원문', 'scripts/korean/fetch-classics.mjs');
run('고전 어휘 원문 맞추기', 'scripts/korean/match-classics.mjs');
run('후보와 용례 합치기', 'scripts/korean/merge-csat.mjs');
run('레벨 파일로 굽기', 'scripts/korean/build-levels.mjs');

/* ---------- 아직 못 들어간 것 ---------- */

const candidates = JSON.parse(readFileSync('korean/csat-extra.json', 'utf8'));
const noExample = candidates.filter((c) => !c.examples || c.examples.length === 0);

console.log('\n── 남은 것 ───────────────────────────────────────────');
if (noExample.length === 0) {
  console.log('  용례가 없어 못 들어간 어휘는 없습니다.');
} else {
  console.log(`  용례가 없어 레벨에 못 들어간 어휘 ${noExample.length}개`);
  console.log(`    ${noExample.map((c) => c.word).join(', ')}`);
  console.log(
    noKey
      ? '\n  STDICT_KEY 를 넣고 다시 부르면 사전에 용례가 있는 것은 채워집니다.'
      : '\n  키를 넣고 돌렸는데도 남은 것은 사전에 용례가 없는 낱말입니다.\n' +
          '  표준국어대사전과 우리말샘 둘 다에서 그 뜻으로 확인했습니다.\n' +
          '  대부분 연역·반어·직유 같은 개념어라 사전이 뜻만 싣고 용례를 안 답니다.\n' +
          '  지어내지 말고 그대로 두세요.',
  );
}

if (existsSync('korean/classic-examples.json')) {
  const quotes = JSON.parse(readFileSync('korean/classic-examples.json', 'utf8'));
  console.log(`\n  고전 어휘 중 원문 인용이 붙은 것 ${Object.keys(quotes).length}개`);
}

console.log('\n다 됐습니다. 이제 npx tsc --noEmit 과 npx jest 를 돌려 보세요.');
