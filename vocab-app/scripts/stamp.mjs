#!/usr/bin/env node
/**
 * 굽는 순간의 시각을 **소스 파일에 적는다.**
 *
 * ── 왜 이렇게까지 하나 ──────────────────────────────────────
 *
 * 판 정보에 만든 때를 적는 일이 세 번 어긋났다.
 *
 *   ① `Updates.createdAt` 만 읽었다 → APK 를 갓 깔면 비어 있다
 *   ② `app.config.js` 의 `extra.builtAt` 을 더했다 → **번들에 안 실린다.**
 *      웹으로 구운 것을 뜯어 보니 시각 문자열이 아예 없었다.
 *
 * 둘 다 "값이 어딘가에 있을 것이다" 를 믿은 것이 화근이다. 여기서는 믿지
 * 않는다 — 굽기 전에 **글자로 박아 넣는다.** 번들러는 소스에 적힌 문자열을
 * 빼먹지 않는다.
 *
 * ── 언제 도는가 ─────────────────────────────────────────────
 *
 *   · npm run preview / e2e  → 그 명령 안에서 먼저 돈다
 *   · eas build              → `eas-build-pre-install` 로 EAS 서버에서 돈다
 *
 * 만든 파일은 git 에 그대로 둔다. 훅이 안 돌아도 앱이 뜨기는 해야 하고,
 * 그때는 마지막으로 구운 시각이 적혀 있는 편이 아무것도 없는 것보다 낫다.
 */
import { writeFileSync } from 'node:fs';

const at = new Date().toISOString();
const out = 'src/features/built-at.ts';

writeFileSync(
  out,
  `/**
 * 이 판을 구운 때. **scripts/stamp.mjs 가 구울 때마다 다시 씁니다.**
 *
 * 손으로 고치지 마세요 — 다음 빌드에서 덮어 쓰입니다.
 */
export const BUILT_AT = '${at}';
`,
  'utf8',
);

console.log(`${out} ← ${at}`);
