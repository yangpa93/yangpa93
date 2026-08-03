#!/usr/bin/env node
/**
 * 낱말을 더한 뒤 **어휘 판을 올린다.**
 *
 *   npm run bump-data -- "수능 빈출 어휘 120개를 더했습니다"
 *
 * ── 왜 손으로 안 적나 ───────────────────────────────────────
 *
 * 판을 올리는 일은 낱말을 더할 때마다 생긴다. 자주 하는 일을 손으로 적게 두면
 * 반드시 어긋난다 — 개수를 잘못 세거나, 더해 놓고 판 올리는 것을 잊는다.
 * 잊으면 사용자에게 "새 낱말이 왔다" 는 말이 영영 안 가고, 만들어 넣고 아무도
 * 모르면 안 넣은 것과 같다.
 *
 * 그래서 **파일에서 직접 세어** 지난 판과 견주고, 늘어난 만큼을 적어 넣는다.
 * 사람이 적는 것은 "무엇을 더했는지" 한 줄뿐이다.
 *
 * 안 늘었으면 아무것도 안 한다. 판만 올라가고 내용이 없는 줄은 나중에 목록을
 * 읽을 때 잡음이 된다.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';

const FILE = 'src/data/dataVersion.ts';

/* ── 지금 파일에 몇 개가 있나 ─────────────────────────────── */

function countEn(dir) {
  let n = 0;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
    const src = readFileSync(`${dir}/${f}`, 'utf8');
    n += [...src.matchAll(/^ {2}\{ w: '((?:[^'\\]|\\.)*)', p: '((?:[^'\\]|\\.)*)'/gm)].length;
  }
  return n;
}

/** 국어는 파일 모양이 달라 세는 규칙을 따로 둔다. whats-in.mjs 와 같은 규칙. */
function countKo(dir) {
  if (!existsSync(dir)) return 0;
  let n = 0;
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts') && x !== 'index.ts')) {
    n += (readFileSync(`${dir}/${f}`, 'utf8').match(/^ {2}\{ w: '/gm) ?? []).length;
  }
  return n;
}

const now = {
  en: countEn('src/data/levels'),
  ko: countKo('src/data/korean/levels'),
  daily: existsSync('src/data/daily/phrases.ts')
    ? (readFileSync('src/data/daily/phrases.ts', 'utf8').match(/"id": "daily-/g) ?? []).length
    : 0,
};

/* ── 지난 판은 몇 개였나 ──────────────────────────────────── */

const src = readFileSync(FILE, 'utf8');
const prev = {
  en: Number(src.match(/totalEn:\s*(\d+)/)?.[1] ?? 0),
  ko: Number(src.match(/totalKo:\s*(\d+)/)?.[1] ?? 0),
  daily: Number(src.match(/totalDaily:\s*(\d+)/)?.[1] ?? 0),
};

const added = { en: now.en - prev.en, ko: now.ko - prev.ko, daily: now.daily - prev.daily };
const grew = added.en > 0 || added.ko > 0 || added.daily > 0;

console.log('');
console.log('  어휘 판 올리기 ' + '─'.repeat(43));
console.log('');
console.log(`  지난 판   영어 ${prev.en}  국어 ${prev.ko}  일상 ${prev.daily}`);
console.log(`  지금      영어 ${now.en}  국어 ${now.ko}  일상 ${now.daily}`);
console.log('');

/*
 * 줄어든 것도 말해 준다. 뜻을 못 확인해 뺀 것이면 맞는 일이고, 실수로 파일이
 * 날아간 것이면 큰일이다. 어느 쪽인지는 사람만 알 수 있으니 판단은 넘긴다.
 */
if (added.en < 0 || added.ko < 0 || added.daily < 0) {
  console.log('  ⚠️  개수가 줄었습니다.');
  console.log(`      영어 ${added.en}  국어 ${added.ko}  일상 ${added.daily}`);
  console.log('      일부러 뺀 것이면 dataVersion.ts 를 손으로 고쳐 주세요.');
  console.log('      아니라면 git status 로 무엇이 지워졌는지 먼저 보세요.');
  console.log('');
  process.exit(1);
}

if (!grew) {
  console.log('  늘어난 낱말이 없습니다. 판을 올리지 않았어요.');
  console.log('  (낱말을 더한 뒤에 부르시면 됩니다)');
  console.log('');
  process.exit(0);
}

const note = process.argv.slice(2).join(' ').trim();
if (!note) {
  console.log('  ❌ 무엇을 더했는지 한 줄로 적어 주세요. 그 줄이 사용자 화면에 그대로 나갑니다.');
  console.log('');
  console.log('      npm run bump-data -- "수능 빈출 어휘 120개를 더했습니다"');
  console.log('');
  process.exit(1);
}

/* ── 오늘 날짜로 판을 만든다 ──────────────────────────────── */

const today = new Date();
const ymd = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, '0'),
  String(today.getDate()).padStart(2, '0'),
];
let version = ymd.join('.');
/* 같은 날 두 번째면 뒤에 붙인다. 날짜만 쓰면 같은 판이 둘 생겨 견줄 수 없다. */
if (src.includes(`version: '${version}'`)) {
  let n = 2;
  while (src.includes(`version: '${version}-${n}'`)) n++;
  version = `${version}-${n}`;
}

const entry = `  {
    version: '${version}',
    date: '${ymd.join('-')}',
    en: ${added.en},
    ko: ${added.ko},
    daily: ${added.daily},
    note: ${JSON.stringify(note)},
    totalEn: ${now.en},
    totalKo: ${now.ko},
    totalDaily: ${now.daily},
  },
`;

let out = src.replace(
  /export const DATA_VERSION = '[^']*';/,
  `export const DATA_VERSION = '${version}';`,
);
out = out.replace(
  'export const DATA_RELEASES: DataRelease[] = [\n',
  `export const DATA_RELEASES: DataRelease[] = [\n${entry}`,
);
writeFileSync(FILE, out, 'utf8');

console.log(`  ✅ 어휘 판 ${version} 을 만들었습니다.`);
console.log('');
const parts = [];
if (added.en > 0) parts.push(`영어 ${added.en}개`);
if (added.ko > 0) parts.push(`국어 ${added.ko}개`);
if (added.daily > 0) parts.push(`일상 문장 ${added.daily}개`);
console.log(`     늘어난 것 — ${parts.join(' · ')}`);
console.log(`     화면에 나갈 말 — ${note}`);
console.log('');
console.log('  ▶ 이제 이렇게 내보내세요');
console.log('');
console.log('     npm test                    (개수가 맞는지 확인)');
console.log('     npx eas-cli@latest update --branch beta --message "어휘 ' + version + '"');
console.log('');
console.log('     APK 를 다시 만들 필요 없습니다. 아이·부모 폰에서 앱을 껐다 켜면');
console.log('     새 낱말이 들어오고, 홈 맨 위에 "새 낱말이 N개 들어왔어요" 가 뜹니다.');
console.log('');
