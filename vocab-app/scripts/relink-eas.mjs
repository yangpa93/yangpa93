#!/usr/bin/env node
/**
 * `app.json` 에 EAS 연결 정보를 되살린다.
 *
 *   node scripts/relink-eas.mjs            # app.json.bak 에서 가져온다
 *   node scripts/relink-eas.mjs 어떤파일.json
 *
 * `eas init` 과 `eas update:configure` 는 **그 컴퓨터에만 있는 값**을
 * app.json 에 적는다 — 프로젝트 id와 업데이트 주소다. 저장소에는 그 값이
 * 없으니(다른 사람 프로젝트를 가리키면 안 되므로) `git pull` 을 할 때마다
 * app.json 이 충돌한다.
 *
 * 그때 이렇게 푼다.
 *
 *   Copy-Item app.json app.json.bak
 *   git checkout -- app.json package.json package-lock.json
 *   git pull origin <브랜치>
 *   node scripts/relink-eas.mjs
 *   npm install
 *
 * 새 app.json(권한·아이콘·이름 같은 최신 설정)에 **연결 정보만** 다시
 * 얹는 것이라, 손으로 json 을 고치다 깨뜨릴 일이 없다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const from = process.argv[2] ?? 'app.json.bak';

if (!existsSync(from)) {
  console.error(`\n${from} 이 없습니다.`);
  console.error('먼저 예전 app.json 을 복사해 두세요:  Copy-Item app.json app.json.bak\n');
  process.exit(1);
}

const old = JSON.parse(readFileSync(from, 'utf8')).expo ?? {};
const doc = JSON.parse(readFileSync('app.json', 'utf8'));
const cur = doc.expo;

const restored = [];

// 프로젝트 id — 이게 없으면 푸시 토큰이 안 나와서 부모님 폰 전송이 죽는다.
const projectId = old.extra?.eas?.projectId;
if (projectId) {
  cur.extra = { ...cur.extra, eas: { ...cur.extra?.eas, projectId } };
  restored.push(`프로젝트 id  ${projectId}`);
}

// 무선 업데이트 주소 — 없으면 eas update 로 보낸 것이 폰에 안 닿는다.
if (old.updates?.url) {
  cur.updates = { ...cur.updates, ...old.updates };
  restored.push(`업데이트 주소 ${old.updates.url}`);
}

// 계정 이름을 적어 두었다면 그것도 지킨다.
if (old.owner && !cur.owner) {
  cur.owner = old.owner;
  restored.push(`계정 ${old.owner}`);
}

if (restored.length === 0) {
  console.log(`\n${from} 에 되살릴 연결 정보가 없습니다.`);
  console.log('아직 eas init 을 안 하셨다면 지금 하시면 됩니다:  npx eas-cli@latest init\n');
  process.exit(0);
}

writeFileSync('app.json', `${JSON.stringify(doc, null, 2)}\n`);

console.log('\napp.json 에 연결 정보를 되살렸습니다.\n');
for (const r of restored) console.log(`  ✅ ${r}`);
console.log(`\n앱 이름은 지금 "${cur.name}" 입니다.`);
console.log('이어서 `npm run preflight android` 로 확인하세요.\n');
