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

/**
 * **한국 시간으로, 사람이 읽는 모양 그대로 박는다.**
 *
 * 처음에는 ISO(UTC)로 박고 앱에서 폰 시간대로 바꿔 보여 줬다. 그러니 "10시
 * 52분에 보냈습니다" 라고 말한 것과 화면에 뜨는 숫자가 아홉 시간 어긋났다 —
 * 어느 판이 폰에 들어갔는지 대조할 방법이 없어진다. 대조하려고 적는 값인데
 * 대조가 안 되면 적을 뜻이 없다.
 *
 * 그래서 여기서 한 번 정해 글자로 굳힌다. 굽는 사람과 폰이 같은 숫자를 본다.
 */
const now = new Date();
const kst = new Date(now.getTime() + 9 * 3600 * 1000);
const p = (n) => String(n).padStart(2, '0');
const at =
  `${kst.getUTCFullYear()}.${p(kst.getUTCMonth() + 1)}.${p(kst.getUTCDate())}` +
  `.${p(kst.getUTCHours())}.${p(kst.getUTCMinutes())}`;
const out = 'src/features/built-at.ts';

writeFileSync(
  out,
  `/**
 * 이 판을 구운 때 (한국 시간). **scripts/stamp.mjs 가 구울 때마다 다시 씁니다.**
 *
 * 화면에 그대로 적히는 글자다 — 바꿔 계산하지 않는다. 손으로 고치지 마세요,
 * 다음 빌드에서 덮어 쓰입니다.
 */
export const BUILT_AT = '${at}';
`,
  'utf8',
);

console.log(`${out} ← ${at} (한국 시간)`);
