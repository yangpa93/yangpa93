#!/usr/bin/env node
/**
 * 지금 이 폴더에 무엇이 들어 있는지 한눈에.
 *
 *   npm run whats-in
 *
 * **왜 필요한가.** `git pull` 을 했는데 정말 최신이 받아진 것인지, 방금 고친
 * 것이 여기 들어 있는 것인지를 확인할 방법이 없었다. 앱을 빌드해서 깔아 봐야
 * 알 수 있다면 그건 확인이 아니다.
 *
 * 그래서 **파일에서 직접 세어** 보여준다. 커밋 한 줄, 어휘 개수, 화면 목록.
 * 기대한 숫자와 다르면 아직 안 받아진 것이다.
 *
 * 앱을 켜지도, 빌드하지도 않는다. 몇 초면 끝난다.
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim();
  } catch {
    return '(git 정보를 읽지 못했습니다)';
  }
}

/** levels/*.ts 에서 표제어를 센다. TS 를 컴파일하지 않고 줄로 읽는다. */
function countEntries(dir) {
  let words = 0;
  let idioms = 0;
  let examples = 0;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
    const src = readFileSync(`${dir}/${f}`, 'utf8');
    for (const m of src.matchAll(/^ {2}\{ w: '((?:[^'\\]|\\.)*)', p: '((?:[^'\\]|\\.)*)'/gm)) {
      words++;
      if (m[2] === 'phr.') idioms++;
    }
    examples += (src.match(/^ {6}\['/gm) ?? []).length;
  }
  return { words, idioms, examples };
}

/**
 * 국어는 파일 모양이 영어와 다르다.
 *
 * 영어는 `{ w: 'save', p: 'v.', s: [` 이고 국어는 `{ w: '고진감래', h: '苦盡甘來',`
 * 다. 영어 규칙을 그대로 썼다가 0개로 나와서, 세는 규칙을 따로 둔다.
 */
function countKorean(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
    n += (readFileSync(`${dir}/${f}`, 'utf8').match(/^ {2}\{ w: '/gm) ?? []).length;
  }
  return n;
}

const en = countEntries('src/data/levels');
const ko = countKorean('src/data/korean/levels');
const daily = existsSync('src/data/daily/phrases.ts')
  ? (readFileSync('src/data/daily/phrases.ts', 'utf8').match(/"id": "daily-/g) ?? []).length
  : 0;
const screens = readdirSync('app')
  .filter((f) => f.endsWith('.tsx') && f !== '_layout.tsx')
  .map((f) => f.replace(/\.tsx$/, ''))
  .sort();

console.log('');
console.log('  지금 이 폴더 ' + '─'.repeat(44));
console.log(`  줄기(브랜치)   ${git(['rev-parse', '--abbrev-ref', 'HEAD'])}`);
console.log(`  마지막 저장     ${git(['log', '-1', '--format=%h  %ad  %s', '--date=short'])}`);
console.log(`  안 올린 변경    ${git(['status', '--porcelain']).split('\n').filter(Boolean).length}개 파일`);
console.log('');
console.log('  어휘 ' + '─'.repeat(52));
console.log(`  영어           ${en.words}개  (단어 ${en.words - en.idioms} · 숙어 ${en.idioms})`);
console.log(`  영어 예문      ${en.examples}개`);
console.log(`  국어           ${ko}개`);
console.log(`  부모 일상 문장 ${daily}개`);
console.log('');
console.log('  화면 ' + '─'.repeat(52));
console.log(`  ${screens.length}개`);
for (let i = 0; i < screens.length; i += 4) {
  console.log('    ' + screens.slice(i, i + 4).map((s) => s.padEnd(18)).join(''));
}
console.log('');

/*
 * 이번 판에서 새로 생긴 것들. 이 줄이 다 ✅ 여야 최신을 받은 것이다.
 * 판이 올라가면 여기에 새 항목을 더한다.
 */
const MARKS = [
  ['첫 화면에서 아이/부모 고르기', 'app/onboarding.tsx', '부모예요'],
  ['아이가 QR 을 띄운다', 'src/components/ConnectParentCard.tsx', 'buildChildLinkUrl'],
  ['부모가 아이 QR 을 찍는다', 'app/scan.tsx', 'parseChildLinkUrl'],
  ['연결 안 함을 부모 PIN 으로 승인', 'app/parent.tsx', 'linkWaived'],
  ['부모 홈 세 갈래', 'app/parent-home.tsx', '아이들 학습 보고서'],
  ['부모가 무엇을 공부할지 고르기', 'src/components/ParentStudyPlan.tsx', 'PARENT_NEW_PER_DAY'],
  ['부모 학습 기록', 'src/components/ParentRecordCards.tsx', '무엇을 얼마나 익혔나'],
  ['아이 목록', 'app/parent-children.tsx', '아이를 누르면'],
  ['아이별 보고서와 설정', 'app/child-report.tsx', '동기 부여 요청권 금액'],
  ['숙어 목록', 'data/idiom-vocabulary.txt', 'put up with'],
  ['자리 잠금', 'data/placement.json', 'm1-1'],
  ['영어 발음 목소리 고르기', 'src/lib/voice.ts', 'pickEnglishVoice'],
  ['판 누르면 바뀐 것 보기', 'app/whats-new.tsx', 'RELEASES'],
  ['아이 홈에 부모님 버튼 없음', 'app/home.tsx', '부모님 버튼을 안 둔다'],
  ['연결 카드 한 장으로', 'src/components/LinkChildCard.tsx', '내폰에서 찍어 연결하기'],
  ['요청권 금액 직접 적기', 'src/components/AwardRatesEditor.tsx', 'parseWon'],
  ['부모 홈에 학습 기록 바로 보이기', 'app/parent-home.tsx', 'ParentRecordCards'],
  ['설정이 두 갈래로', 'app/parent-settings.tsx', '아이들 폰 설정'],
  ['내 공부 설정 따로', 'app/parent-plan.tsx', 'ParentStudyPlan'],
  ['말을 동기 부여 요청권으로 통일', 'app/home.tsx', '내 동기 부여 요청권'],
  ['오늘의 공부를 한 줄에 하나씩', 'app/parent-home.tsx', 'TRACK_SHORT'],
  ['공부 안 고르면 보고서만', 'app/parent-home.tsx', '아이들 학습 보고서만'],
  ['아이는 4명까지', 'src/features/children.ts', 'MAX_CHILDREN = 4'],
  ['부모 폰 여러 대가 리포트 받기', 'src/features/parentLinks.ts', 'MAX_PARENTS'],
  ['주 부모 고르기', 'src/components/ConnectParentCard.tsx', 'setPrimaryParent'],
  ['요청권은 주 부모에게만', 'src/store/AppProvider.tsx', 'sendRewardAskToParent'],
  ['백업을 폴더에 저장', 'app/backup.tsx', 'pickDirectoryAsync'],
  ['영어 목소리 골라 듣기', 'app/settings.tsx', 'tryVoice'],
  ['자연스러운 목소리 먼저', 'src/lib/voice.ts', 'rankEnglishVoices'],
  ['다른 앱으로 열기로 백업 받기', 'src/features/OpenFileBridge.tsx', 'isOpenedFileUrl'],
  ['읽는 속도 앱에서 고르기', 'src/lib/voice.ts', 'SPEECH_RATES'],
  ['폰에 깔고 소리 맞추는 법', '폰에 깔고 소리 맞추는 법.md', '무시하고 설치'],
];

/* 판 번호도 같이 적는다. "몇 판을 받았나"가 제일 먼저 궁금한 것이다. */
const appJson = JSON.parse(readFileSync('app.json', 'utf8'));
console.log(`  판(버전)       ${appJson.expo.version}`);
console.log('');

console.log('  이번 판에 들어 있어야 할 것 ' + '─'.repeat(29));
let missing = 0;
for (const [label, file, needle] of MARKS) {
  const ok = existsSync(file) && readFileSync(file, 'utf8').includes(needle);
  if (!ok) missing++;
  console.log(`  ${ok ? '✅' : '❌'}  ${label}`);
}
console.log('');
console.log(
  missing === 0
    ? '  다 들어 있습니다. 최신을 받으셨어요.'
    : `  ${missing}개가 없습니다. git pull 이 제대로 됐는지 확인해 주세요.`,
);
console.log('');
if (missing > 0) process.exitCode = 1;
