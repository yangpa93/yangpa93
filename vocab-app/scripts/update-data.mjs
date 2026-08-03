#!/usr/bin/env node
/**
 * 단어·숙어를 더 넣은 뒤 한 번만 부르면 되는 명령.
 *
 *   npm run data:update
 *
 * 이 하나가 아래를 순서대로 다 한다.
 *
 *   1. 배치표를 다시 만든다            data/*.txt      → src/data/plan.ts
 *   2. 배치 파일을 전부 수록한다        data/batch-*.txt → src/data/levels/*.ts
 *   3. 무엇이 아직 비었는지 알려 준다
 *   4. 데이터 검사를 돌린다
 *
 * **왜 명령을 하나로 묶는가.** 예전에는 세 단계를 손으로 순서 맞춰 쳐야 했다.
 * 배치표를 안 만들고 수록부터 하면 "배치표에 없는 단어"라며 조용히 건너뛰고,
 * 검사를 빼먹으면 예문에 표제어가 안 들어간 항목이 그대로 앱까지 간다.
 * 순서를 기억하는 일을 사람에게 맡기면 언젠가 반드시 어긋난다.
 *
 * **여러 번 돌려도 안전하다.** 이미 수록된 표제어는 건너뛰고, 자리가 정해진
 * 단어는 자리를 안 바꾼다. 중간에 멈췄으면 그냥 다시 부르면 된다.
 *
 * 윈도우 PowerShell 에서도 그대로 된다 — 파일 목록을 셸이 아니라 이 스크립트가
 * 펼치기 때문이다(`data/batch-*.txt` 를 PowerShell 은 펼쳐 주지 않는다).
 */

import { readdirSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

/** 하위 명령 하나. 실패하면 거기서 멈춘다 — 다음 단계가 앞 단계를 믿기 때문이다. */
function run(label, args, { capture = false } = {}) {
  console.log(`\n── ${label} ${'─'.repeat(Math.max(0, 56 - label.length))}`);
  const r = spawnSync(process.execPath, args, {
    stdio: capture ? ['inherit', 'pipe', 'inherit'] : 'inherit',
    encoding: 'utf8',
  });
  if (r.status !== 0) {
    console.error(`\n✖ ${label} 에서 멈췄습니다.`);
    process.exit(r.status ?? 1);
  }
  return r.stdout;
}

/* 1. 배치표 */
const plan = run('배치표 만들기 (data/*.txt → src/data/plan.ts)', ['scripts/build-plan.mjs'], {
  capture: true,
});
writeFileSync('src/data/plan.ts', plan, 'utf8');

/* 2. 수록 */
const batches = readdirSync('data')
  .filter((f) => f.startsWith('batch-') && f.endsWith('.txt'))
  .sort()
  .map((f) => `data/${f}`);

if (batches.length === 0) {
  console.log('\n── 수록할 배치 파일 없음 ─────────────────────────────────');
  console.log('  data/batch-이름.txt 로 두면 여기서 자동으로 읽습니다.');
} else {
  run(`뜻·예문 수록 (배치 파일 ${batches.length}장)`, ['scripts/add-entries.mjs', ...batches]);
}

/* 3. 남은 것 */
run('아직 비어 있는 자리', ['scripts/missing.mjs']);

/* 4. 검사 */
console.log('\n── 데이터 검사 ───────────────────────────────────────────');
/*
 * jest 도 npx 를 거치지 않고 노드로 직접 부른다. 윈도우에서 `npx` 는 배치
 * 파일이고, 노드는 `shell: true` 없이 배치 파일을 못 띄운다(CVE-2024-27980).
 * 그러면 아무 것도 안 찍힌 채 실패만 남아 원인을 못 찾는다.
 */
const jest = spawnSync(
  process.execPath,
  ['node_modules/jest/bin/jest.js', '__tests__/data.test.ts', '__tests__/idioms.test.ts'],
  { stdio: 'inherit' },
);
if (jest.error) {
  console.error(`\n✖ 검사를 띄우지 못했습니다: ${jest.error.message}`);
  console.error('  npm install 을 한 번 돌린 뒤 다시 불러 보세요.');
  process.exit(1);
}
if (jest.status !== 0) {
  console.error('\n✖ 데이터 검사에서 걸렸습니다. 위에 적힌 항목을 고치고 다시 부르세요.');
  process.exit(jest.status ?? 1);
}

console.log('\n다 됐습니다. 이제 npx tsc --noEmit 과 npx jest 를 돌려 보세요.');
