#!/usr/bin/env node
/**
 * 노트북 브라우저로 앱을 띄운다. 폰에 깔지 않고 화면을 확인하려는 것이다.
 *
 *   npm run preview           웹으로 굽고 띄운다
 *   npm run preview -- --fast 이미 구운 것이 있으면 굽는 단계를 건너뛴다
 *
 * **왜 필요한가.** APK 를 만들어 폰에 옮겨 까는 데 20분이 걸린다. 화면 글귀
 * 하나를 고쳤는지 보려고 그걸 매번 하는 것은 못 할 일이다. 웹으로 띄우면
 * 20초 만에 같은 화면을 눌러 볼 수 있다.
 *
 * ── 상태를 심어 주는 이유 ─────────────────────────────────────
 *
 * 그냥 띄우면 프로필도 학습 기록도 없는 첫 화면만 보인다. 부모 화면을 보려면
 * 부모 프로필을 만들고, 아이 보고서를 보려면 아이도 만들고 며칠 공부까지
 * 해야 한다. 확인할 때마다 그걸 다시 하는 것은 현실적이지 않다.
 *
 * 그래서 `/demo.html` 을 같이 굽는다. 버튼 하나로 원하는 상황을 심고 앱으로
 * 넘어간다. 이 파일은 **dist 에만 생기고 APK 에는 안 들어간다** — 굽는
 * 폴더는 매번 새로 만들어지고, 앱 소스(app/, src/)에는 손대지 않는다.
 *
 * ── 웹에서 안 되는 것 ────────────────────────────────────────
 *
 * 푸시 알림과 카메라는 브라우저에서 안 된다(또는 폰과 다르게 동작한다).
 * 그래서 '부모가 아이 QR 을 찍어 연결' 은 웹으로 끝까지 확인할 수 없다.
 * 대신 **이미 연결된 상태**를 심어 두어, 연결된 뒤의 화면은 다 볼 수 있게 했다.
 * 무엇이 확인되고 무엇이 안 되는지는 demo.html 화면에도 적어 둔다.
 */

import {
  createReadStream,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { spawnSync } from 'node:child_process';

const fast = process.argv.includes('--fast');
const PORT = process.env.PORT ?? '8088';

/**
 * expo 를 부를 때 npx 를 거치지 않는다.
 *
 * 윈도우에서 `npx` 는 `npx.cmd` 라는 배치 파일이고, 노드는 보안 때문에
 * (CVE-2024-27980) `shell: true` 없이는 배치 파일을 못 띄운다. 그때 spawnSync 는
 * 예외 대신 `error` 만 담아 조용히 돌아오고 `status` 는 null 이라, 아무 것도
 * 안 찍힌 채 "실패했습니다" 한 줄만 남는다 — 무엇이 잘못됐는지 알 길이 없다.
 *
 * `shell: true` 로 여는 길도 있지만, 여기 있는 CLI 들은 전부 그냥 노드
 * 스크립트다. 노드로 직접 부르면 셸도 배치 파일도 끼어들지 않아 윈도우·맥·
 * 리눅스가 똑같이 돈다.
 */
const EXPO_CLI = 'node_modules/expo/bin/cli';

/**
 * 판이 바뀌었으면 metro 캐시를 비우고 굽는다.
 *
 * **왜 이게 필요한가.** 화면에 적히는 판 번호는 app.json 에서 오는데, 그 값은
 * 빌드할 때 번들 안에 통째로 박힌다. metro 는 그 조각을 캐시에 넣어 두고
 * 다음 빌드에서 그대로 재사용한다. 그래서 app.json 의 판을 0.9.0 에서
 * 0.10.0 으로 올리고 다시 구워도 **화면에는 0.9.0 이 그대로 나온다.**
 *
 * 실제로 그렇게 당했다. 판을 올려 놓고 미리보기를 띄웠는데 옛 번호가 떠서,
 * 소스가 안 받아진 줄 알고 한참 엉뚱한 데를 뒤졌다. 판 번호는 "내가 무엇을
 * 쓰고 있나"를 가리는 유일한 표시인데 그것이 거짓말을 하면 아무것도 못
 * 가린다.
 *
 * 그래서 **판이 바뀐 때만** 캐시를 비운다. 늘 비우면 매번 1~2분이 더 걸리고,
 * 안 비우면 판을 올린 날 반드시 이 함정을 다시 밟는다. 지난번에 무슨 판으로
 * 구웠는지는 캐시 옆에 적어 둔다 — 지켜야 할 그 캐시와 같이 사라져야
 * 앞뒤가 맞기 때문이다.
 */
const STAMP = 'node_modules/.cache/gomtangvoca-preview-version';

function versionChanged() {
  try {
    const now = JSON.parse(readFileSync('app.json', 'utf8')).expo.version;
    const before = existsSync(STAMP) ? readFileSync(STAMP, 'utf8').trim() : '';
    return { changed: before !== now, now, before };
  } catch {
    // app.json 을 못 읽으면 판단할 수 없다. 비우는 쪽이 안전하다.
    return { changed: true, now: '', before: '' };
  }
}

if (!fast || !existsSync('dist/index.html')) {
  if (!existsSync(EXPO_CLI)) {
    console.error('✖ expo 가 아직 안 깔려 있습니다. 먼저 npm install 을 한 번 돌려 주세요.');
    process.exit(1);
  }

  const v = versionChanged();
  if (v.changed && v.before) {
    console.log(`판이 ${v.before} → ${v.now} 로 바뀌었습니다. 캐시를 비우고 굽습니다.`);
  }
  console.log('웹으로 굽는 중… (처음에는 1~2분 걸립니다)\n');

  const args = [EXPO_CLI, 'export', '--platform', 'web'];
  if (v.changed) args.push('--clear');
  const r = spawnSync(process.execPath, args, { stdio: 'inherit' });
  // 못 띄운 것과 띄웠는데 실패한 것은 다르다. 앞의 경우는 위에 아무 것도 안 찍힌다.
  if (r.error) {
    console.error(`\n✖ expo 를 띄우지 못했습니다: ${r.error.message}`);
    console.error('  npm install 을 한 번 돌린 뒤 다시 불러 보세요.');
    process.exit(1);
  }
  if (r.status !== 0) {
    console.error('\n✖ 굽기에 실패했습니다. 위 오류를 보고 고친 뒤 다시 부르세요.');
    process.exit(r.status ?? 1);
  }

  // 잘 구워졌을 때만 적는다. 실패한 판을 적어 두면 다음에 캐시를 안 비운다.
  try {
    mkdirSync('node_modules/.cache', { recursive: true });
    writeFileSync(STAMP, v.now, 'utf8');
  } catch {
    // 못 적어도 다음번에 한 번 더 비울 뿐이라 학습을 막지 않는다.
  }
} else {
  console.log('이미 구운 것을 씁니다 (--fast).\n');
}

/*
 * 폴더로 둔다(`dist/demo/index.html`).
 *
 * `dist/demo.html` 로 두었더니 serve 가 주소에서 `.html` 을 떼고 /demo 로
 * 되돌려 보냈고, `-s`(SPA) 규칙에 걸려 앱 첫 화면이 떴다. 상황을 고르는
 * 페이지가 안 나오고 앱만 계속 열려서 한참 헤맸다. 폴더면 그 일이 없다.
 */
mkdirSync('dist/demo', { recursive: true });
writeFileSync('dist/demo/index.html', demoPage(), 'utf8');

console.log('─'.repeat(60));
console.log(`  준비됐습니다. 브라우저에서 아래 주소를 여세요.`);
console.log('');
console.log(`      http://localhost:${PORT}/demo/`);
console.log('');
console.log('  거기서 보고 싶은 상황을 고르면 앱으로 넘어갑니다.');
console.log('  끝내려면 이 창에서 Ctrl+C 를 누르세요.');
console.log('─'.repeat(60));
console.log('');

/**
 * 파일을 그냥 내주는 작은 서버.
 *
 * `npx serve -s` 를 쓰다 그만뒀다. `-s` 는 **있는 파일까지** 전부 앱 첫
 * 화면으로 되돌려서, 상황 고르는 페이지가 영영 안 나왔다. 규칙을 우리가
 * 쥐고 있는 편이 낫고, 설명서에서 남의 도구를 하나 지울 수도 있다.
 *
 * 규칙은 둘뿐이다.
 *   · 파일이 있으면 그 파일을 준다 (/demo/ 는 그 안의 index.html)
 *   · 없으면 앱 첫 화면을 준다 (새로 고쳐도 /home 이 안 깨지도록)
 */
const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.ttf': 'font/ttf',
  '.woff2': 'font/woff2',
};

function fileFor(urlPath) {
  // '..' 로 dist 밖을 못 나가게 한다.
  const clean = normalize(decodeURIComponent(urlPath.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  let p = join('dist', clean);
  try {
    if (statSync(p).isDirectory()) p = join(p, 'index.html');
    if (statSync(p).isFile()) return p;
  } catch {
    /* 없는 파일 */
  }
  return 'dist/index.html';
}

const server = createServer((req, res) => {
  const file = fileFor(req.url ?? '/');
  res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

server.listen(Number(PORT));
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});

/* ------------------------------------------------------------------ */

/**
 * 심어 줄 상태들.
 *
 * 저장 포맷(AppState)을 그대로 만든다. `src/types.ts` 가 바뀌면 여기도 맞춰야
 * 하는데, 안 맞으면 storage.ts 의 마이그레이션이 빈 칸을 메워 주므로
 * 화면이 깨지지는 않는다.
 */
function demoPage() {
  return `<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>곰탱이보카 — 노트북에서 확인하기</title>
<style>
  body { font-family: system-ui, -apple-system, "Malgun Gothic", sans-serif;
         max-width: 760px; margin: 0 auto; padding: 24px; color: #1F2937;
         background: #F6F7FB; line-height: 1.6; }
  h1 { font-size: 22px; margin-bottom: 4px; }
  h2 { font-size: 16px; margin-top: 28px; }
  p.sub { color: #6B7280; margin-top: 0; font-size: 14px; }
  button { display: block; width: 100%; text-align: left; margin: 8px 0;
           padding: 14px 16px; border-radius: 12px; border: 1px solid #E5E7EB;
           background: #fff; cursor: pointer; font-size: 15px; font-family: inherit; }
  button:hover { border-color: #4F46E5; }
  button b { display: block; font-size: 16px; }
  button span { color: #6B7280; font-size: 13px; }
  .warn { background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 12px;
          padding: 14px 16px; font-size: 14px; }
  .reset { background: #FEE2E2; border-color: #FCA5A5; }
  code { background: #EEF2FF; padding: 1px 5px; border-radius: 4px; font-size: 13px; }
</style>
</head>
<body>
<h1>곰탱이보카 — 노트북에서 확인하기</h1>
<p class="sub">보고 싶은 상황을 누르면 그 상태로 앱이 열립니다. 폰에 안 깔아도 됩니다.</p>

<h2>1. 처음 설치한 그대로</h2>
<button onclick="wipe()">
  <b>🆕 아무것도 없는 상태</b>
  <span>첫 화면에서 아이인지 부모인지 고르는 것부터 확인합니다</span>
</button>

<h2>2. 아이 화면</h2>
<button onclick="seed('child')">
  <b>🦊 아이 — 부모님과 아직 연결 안 됨</b>
  <span>홈에 '부모님과 연결하기'가 뜹니다. ⚙️ 설정에서 내 QR 을 띄워 보세요</span>
</button>
<button onclick="seed('childLinked')">
  <b>🦊 아이 — 부모님과 연결됨</b>
  <span>연결 안내가 사라진 기존 그대로의 아이 홈입니다</span>
</button>
<button onclick="seed('childReview')">
  <b>🦊 아이 — 숙어가 복습으로 나오는 상태</b>
  <span>'공부 시작하기'를 누르면 첫 문제부터 숙어가 나옵니다</span>
</button>

<h2>3. 부모 화면</h2>
<button onclick="seed('parent')">
  <b>👩‍💼 부모 — 아이 둘이 등록된 상태</b>
  <span>네 갈래 홈. 아이들 보고서 → 아이를 눌러 그 아이 설정까지 봅니다</span>
</button>
<button onclick="seed('parentFresh')">
  <b>👩‍💼 부모 — 무엇을 공부할지 아직 안 고른 상태</b>
  <span>'무엇을 공부할지 정하기'부터 시작합니다</span>
</button>

<h2>4. 영어 소리 들어보기</h2>
<p class="sub" style="margin-bottom:8px">
  앱이 어느 목소리로 읽는지 여기서 바로 들으실 수 있습니다.
  <b>노트북 스피커를 켜 주세요.</b>
</p>
<div id="voicebox" class="warn" style="background:#EEF2FF;border-color:#C7D2FE">
  목소리를 찾는 중…
</div>

<div class="warn" style="margin-top:28px">
  <b>브라우저에서 확인할 수 없는 것</b><br>
  · <b>QR 찍기</b> — 카메라가 폰과 다르게 동작합니다<br>
  · <b>푸시 알림</b> — 부모↔아이 사이 실제 전송은 폰에서만 됩니다<br>
  · <b>소리·진동</b> — 브라우저에 따라 다릅니다<br>
  그래서 위 3번의 '아이 둘이 등록된 상태'는 <b>이미 연결된 뒤</b>를 심어 둔 것입니다.
  연결 그 자체는 폰 두 대로 한 번 확인해 주세요.
</div>

<script>
const PARENT='p_demo_parent', A='p_demo_a', B='p_demo_b';
const settings = (o={}) => ({ newPerDay:10, reviewPerDay:10, rounds:3,
  subjects:['en'], firstSubject:'en', showTranslation:true, ttsEnabled:true, hapticsEnabled:true, ...o });
const base = (o={}) => ({ koLevel:'m1-1', settings:settings(), createdAt:1, streak:0, bestStreak:0,
  lastCompletedDate:null, pendingLevelUps:[], koPendingLevelUps:[], clearedLevels:[], koClearedLevels:[],
  claimedMonths:[], awards:null, linkWaived:false,
  parentStudy:{ tracks:['daily'], dailyTheme:'w', perTrack:{ daily:5, enWord:5, ko:5 } }, ...o });

const kids = [
  base({ id:A, name:'서준', kind:'child', avatar:'🦊', level:'m1-1', streak:3, bestStreak:5 }),
  base({ id:B, name:'지호', kind:'child', avatar:'🐻', level:'m2-2', streak:0, bestStreak:9,
         settings:settings({ subjects:['en','ko'], newPerDay:5 }) }),
];
/*
 * 부모는 세 갈래를 다 켜 둔다. 예전에는 일상 문장과 국어 둘만 켜 두었는데,
 * 그러면 '아이들과 같은 영어 단어' 줄이 화면에 안 나와서 그 줄이 레벨을
 * 제대로 보여주는지 확인할 방법이 없었다. 확인하려고 띄우는 화면이라
 * 있는 것은 다 보이는 편이 낫다. level 은 아이(서준)와 같은 m1-1 이다.
 */
const parent = base({ id:PARENT, name:'엄마', kind:'parent', avatar:'👩‍💼', level:'m1-1',
  streak:4, bestStreak:7,
  parentStudy:{ tracks:['daily','enWord','ko'], dailyTheme:'w',
    perTrack:{ daily:10, enWord:5, ko:5 } } });

function root(profiles, activeId, extra={}) {
  return { version:6, profiles, activeProfileId:activeId,
    parent:{ pin:'1234', awards:{ middleLevel:20000, highLevel:30000, koreanLevel:10000,
      perfectMonth:20000, bonus:10000 }, notifyHour:22, notifyMinute:0, notifyEnabled:true,
      notifyOnlyWhenMissed:false, pushToParent:true },
    rewards:[], role:'child', parentLinks:[],
    myPushToken:'ExponentPushToken[Demo1234_-abcdEFGHij]',
    receivesReports:false, receivedReports:[], knownChildren:[], ...extra };
}
const empty = { cards:{}, days:{}, answers:[], exams:[] };

/** 며칠치 학습 기록. 보고서와 달력이 비어 보이지 않게 한다. */
function history(days) {
  const out = { cards:{}, days:{}, answers:[], exams:[] };
  const today = new Date();
  for (let i=0; i<days; i++) {
    const d = new Date(today); d.setDate(d.getDate()-i);
    const key = d.toISOString().slice(0,10);
    const studied = 12 + ((i*7)%9);
    out.days[key] = { date:key, goal:20, studied, correct:studied*3-4, wrong:4,
      seconds:600+i*20, completed: studied>=20 ? true : i%3!==0, wrongEntryIds:[] };
  }
  return out;
}

/** 그 레벨 앞쪽 단어들을 '오늘 복습할 것'으로 심는다. */
function reviewCards(ids) {
  const cards = {};
  for (const id of ids) cards[id] = { entryId:id, ease:2.5, intervalDays:1, streak:1,
    correct:1, wrong:0, lapses:0, due:'2020-01-01', lastSeen:1577836800000, firstSeen:1577836800000 };
  return { cards, days:{}, answers:[], exams:[] };
}

function put(state, data) {
  localStorage.clear();
  localStorage.setItem('gomtangivoca:root:v1', JSON.stringify(state));
  for (const [id, d] of Object.entries(data)) {
    localStorage.setItem('gomtangivoca:data:v1:'+id, JSON.stringify(d));
  }
  location.href = '/';
}

function wipe() { localStorage.clear(); location.href = '/'; }

/* ---------------- 영어 소리 ---------------- */

/**
 * 앱과 **같은 규칙**으로 영어 목소리를 고른다.
 * 규칙 자체는 src/lib/voice.ts 에 있고 거기가 원본이다. 이 페이지는 굽는
 * 폴더에만 생기는 확인용이라 규칙을 따로 적었다 — 바뀌면 양쪽을 맞춰야 한다.
 */
function pickEnglish(voices) {
  const en = voices.filter(v => {
    const l = (v.lang||'').replace('_','-').toLowerCase();
    return l === 'en' || l.startsWith('en-');
  });
  if (!en.length) return null;
  const score = v => {
    const l = (v.lang||'').replace('_','-').toLowerCase();
    let n = 0;
    if (l.startsWith('en-us')) n += 8; else if (l.startsWith('en-gb')) n += 4;
    if (/network/i.test(v.name||'')) n -= 1;
    return n;
  };
  return [...en].sort((a,b) => (score(b)-score(a)) || (a.voiceURI||'').localeCompare(b.voiceURI||''))[0];
}

const SAMPLE = "Let's make sure we're all on the same page.";

function say(text, voice, rate) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  if (voice) { u.voice = voice; u.lang = voice.lang; }
  u.rate = rate ?? 0.9;
  speechSynthesis.speak(u);
}

function showVoices() {
  const box = document.getElementById('voicebox');
  const voices = speechSynthesis.getVoices();
  if (!voices.length) { box.textContent = '목소리를 찾는 중…'; return; }

  const en = pickEnglish(voices);
  const ko = voices.find(v => (v.lang||'').toLowerCase().startsWith('ko'));

  if (!en) {
    box.innerHTML = '<b>이 브라우저에 영어 목소리가 없습니다.</b><br>' +
      '앱은 이럴 때 <b>아무 소리도 안 냅니다</b> — 한국어 목소리로 영어를 읽으면 ' +
      "'beautiful' 이 '베아우티풀' 로 나와서, 그런 발음을 들려주느니 조용한 편이 낫습니다. " +
      '폰에서는 설정 → 접근성 → 텍스트 음성 변환에서 English 음성을 받으시면 됩니다.';
    return;
  }

  box.innerHTML =
    '<b>앱이 고른 목소리 : ' + en.name + ' (' + en.lang + ')</b><br>' +
    '<span style="color:#6B7280;font-size:13px">미국 영어 → 고품질 → 인터넷 없이 되는 것 순으로 고릅니다.</span>' +
    '<div style="margin-top:10px"></div>';

  const mk = (label, fn) => {
    const b = document.createElement('button');
    b.textContent = label; b.style.marginTop = '6px';
    b.onclick = fn; box.appendChild(b); return b;
  };
  mk('🔊 문장 듣기  “' + SAMPLE + '”', () => say(SAMPLE, en, 0.9));
  mk('🔊 낱말 듣기  “beautiful” (더 느리게)', () => say('beautiful', en, 0.75));
  if (ko) {
    mk('⚠️ 한국어 목소리로 읽으면 (예전에 이랬습니다)', () => say(SAMPLE, ko, 0.9));
  }
}

speechSynthesis.onvoiceschanged = showVoices;
showVoices();

function seed(which) {
  if (which === 'child') {
    put(root([kids[0]], A), { [A]: history(9) });
  } else if (which === 'childLinked') {
    /*
     * 부모 폰 **두 대**를 심는다. 아이 폰이 여러 대를 기억하고 주 부모를
     * 고르는 것을 노트북에서 확인하려면 하나로는 볼 수가 없다.
     */
    put(root([kids[0]], A, { parentLinks:[
      { token:'ExponentPushToken[Parent_-demo9876]', label:'엄마 폰',
        linkedAt:Date.now(), lastSentDate:null, isPrimary:true },
      { token:'ExponentPushToken[Parent_-demo5432]', label:'아빠 폰',
        linkedAt:Date.now(), lastSentDate:null, isPrimary:false },
    ] }), { [A]: history(9) });
  } else if (which === 'childReview') {
    put(root([kids[0]], A, { parentLinks:[] }),
        { [A]: reviewCards(['a-couple-of','a-kind-of','a-number-of','a-pair-of','a-piece-of',
                            'after-all','agree-with','all-day-long','all-kinds-of']) });
  } else if (which === 'parent') {
    put(root([parent, ...kids], PARENT, { receivesReports:true }),
        { [PARENT]: history(6), [A]: history(12), [B]: history(4) });
  } else if (which === 'parentFresh') {
    const p = { ...parent, parentStudy:{ tracks:[], dailyTheme:'w', perTrack:{ daily:5, enWord:5, ko:5 } } };
    put(root([p], PARENT), { [PARENT]: empty });
  }
}
</script>
</body>
</html>
`;
}
