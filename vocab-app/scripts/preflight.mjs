#!/usr/bin/env node
/**
 * 빌드 전 점검.
 *
 *   node scripts/preflight.mjs
 *   node scripts/preflight.mjs android
 *
 * EAS 빌드는 한 번에 10~20분이 걸리고 무료 계정은 월 횟수가 정해져 있다.
 * 설정 한 줄이 빠져서 빌드를 날리는 일을 막으려고, **빌드를 걸기 전에**
 * 몇 초 만에 확인되는 것들을 여기서 먼저 본다.
 *
 * 실제로 여기 걸렸던 것: 안드로이드 13부터 POST_NOTIFICATIONS 권한이
 * 없으면 알림이 하나도 안 뜬다. 앱은 멀쩡히 설치되고 학습도 되는데
 * 부모 리포트만 조용히 안 온다 — 빌드해서 깔아 보기 전에는 모른다.
 */

import { readFileSync, existsSync } from 'node:fs';

const target = (process.argv[2] ?? 'all').toLowerCase();
const wantAndroid = target === 'all' || target === 'android';
const wantIos = target === 'all' || target === 'ios';

const problems = [];
const warnings = [];
const notes = [];

const ok = (m) => notes.push(m);
const bad = (m) => problems.push(m);
const warn = (m) => warnings.push(m);

/* ---------- app.json ---------- */

const app = JSON.parse(readFileSync('app.json', 'utf8')).expo;

if (!app.version) bad('app.json에 version이 없습니다.');
else ok(`판 ${app.version}${/^0\./.test(app.version) ? ' (베타)' : ''}`);

for (const key of ['icon', 'android.adaptiveIcon.foregroundImage', 'android.adaptiveIcon.backgroundImage']) {
  const path = key.split('.').reduce((o, k) => o?.[k], app);
  if (!path) continue;
  if (!existsSync(path.replace(/^\.\//, ''))) bad(`${key}가 가리키는 파일이 없습니다: ${path}`);
}

/* ---------- 알림 ---------- */

const plugins = app.plugins ?? [];
const notif = plugins.find((p) => (Array.isArray(p) ? p[0] : p) === 'expo-notifications');

if (!notif) {
  warn('expo-notifications 플러그인이 app.json에 없습니다. 알림 아이콘이 기본값이 됩니다.');
} else {
  const opts = Array.isArray(notif) ? (notif[1] ?? {}) : {};
  if (!opts.icon) {
    warn(
      '알림 아이콘(plugins → expo-notifications → icon)이 없습니다. ' +
        '안드로이드가 앱 아이콘을 흰 실루엣으로 뭉개서 알아볼 수 없게 됩니다.',
    );
  } else if (!existsSync(String(opts.icon).replace(/^\.\//, ''))) {
    bad(`알림 아이콘 파일이 없습니다: ${opts.icon}`);
  } else {
    ok('알림 아이콘 있음');
  }
}

if (wantAndroid) {
  const perms = app.android?.permissions ?? [];
  const hasPost = perms.some((p) => String(p).endsWith('POST_NOTIFICATIONS'));
  if (!hasPost) {
    bad(
      'android.permissions에 POST_NOTIFICATIONS가 없습니다. ' +
        '안드로이드 13 이상에서 알림이 하나도 뜨지 않습니다 ' +
        '(매일 리포트도, 부모님 폰 전송도). 앱은 멀쩡히 돌아가서 눈치채기 어렵습니다.',
    );
  } else {
    ok('POST_NOTIFICATIONS 권한 있음 (안드로이드 13+ 알림)');
  }

  const blocked = app.android?.blockedPermissions ?? [];
  if (blocked.length > 0) ok(`불필요한 권한 ${blocked.length}개 차단됨`);

  if (!app.android?.package) bad('android.package가 없습니다.');
  else ok(`패키지 ${app.android.package}`);
}

if (wantIos) {
  if (!app.ios?.bundleIdentifier) bad('ios.bundleIdentifier가 없습니다.');
  else ok(`번들 ID ${app.ios.bundleIdentifier}`);
}

/* ---------- EAS ---------- */

if (!existsSync('eas.json')) {
  bad('eas.json이 없습니다. eas init을 먼저 하세요.');
} else {
  const eas = JSON.parse(readFileSync('eas.json', 'utf8'));
  const profiles = Object.keys(eas.build ?? {});

  if (wantAndroid && !profiles.includes('beta-android')) {
    warn("eas.json에 'beta-android' 프로필이 없습니다.");
  }
  if (wantIos && !profiles.includes('beta-ios')) {
    warn("eas.json에 'beta-ios' 프로필이 없습니다.");
  }

  if (wantAndroid && eas.build?.['beta-android']?.android?.buildType !== 'apk') {
    warn("beta-android가 apk를 만들지 않습니다. 폰에 직접 넣으려면 buildType이 'apk'여야 합니다.");
  }
  if (wantAndroid && eas.build?.['beta-android']?.distribution !== 'internal') {
    warn("beta-android의 distribution이 'internal'이 아닙니다. 사이드로딩용 APK가 안 나옵니다.");
  }

  if (eas.cli?.appVersionSource === 'remote') {
    ok('빌드 번호는 EAS가 자동으로 올립니다 (appVersionSource: remote)');
  }
}

/* ---------- 프로젝트 연결 ---------- */

const projectId = app.extra?.eas?.projectId;
if (!projectId) {
  bad(
    'app.json에 EAS 프로젝트 ID가 없습니다. `eas init`을 먼저 하세요. ' +
      '이대로 빌드하면 앱은 설치되지만 **부모님 폰으로 전송이 동작하지 않습니다** (푸시 토큰이 안 나옵니다).',
  );
} else {
  ok(`EAS 프로젝트 ${projectId}`);
}

/* ---------- 어휘 데이터 ---------- */

try {
  const plan = readFileSync('src/data/plan.ts', 'utf8');
  const planned = (plan.match(/^ {4}\["/gm) ?? []).length;
  let loaded = 0;
  for (const f of ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'].flatMap((g) => [1, 2, 3, 4].map((s) => `${g}-${s}`))) {
    const p = `src/data/levels/${f}.ts`;
    if (existsSync(p)) loaded += (readFileSync(p, 'utf8').match(/^ {2}\{ w: /gm) ?? []).length;
  }
  if (loaded < planned) warn(`어휘가 아직 덜 찼습니다: ${loaded}/${planned}`);
  else ok(`어휘 ${loaded}개 전부 수록`);
} catch {
  warn('어휘 데이터를 확인하지 못했습니다.');
}

/* ---------- 결과 ---------- */

console.log(`\n빌드 전 점검 — ${target === 'all' ? '안드로이드 + 아이폰' : target}\n`);
for (const n of notes) console.log(`  ✅ ${n}`);
for (const w of warnings) console.log(`\n  ⚠️  ${w}`);
for (const p of problems) console.log(`\n  ❌ ${p}`);

if (problems.length === 0) {
  console.log(
    `\n막는 문제 없음${warnings.length ? ` (경고 ${warnings.length}개)` : ''}. ` +
      '이제 npm test 와 npm run typecheck 까지 통과하면 빌드하세요.\n',
  );
} else {
  console.log(`\n먼저 고쳐야 할 것 ${problems.length}개가 있습니다. 지금 빌드하면 시간만 버립니다.\n`);
  process.exit(1);
}
