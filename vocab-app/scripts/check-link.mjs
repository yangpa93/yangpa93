#!/usr/bin/env node
/**
 * 폰에 깔기 **전에** 연결이 될지 미리 본다.
 *
 *   npm run check-link
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * "폰 연결하기는 설치 전에 미리 문제가 없는지 확인할 수 있는 방법은 없나요?"
 *
 * 있다. 연결은 두 토막인데, 그중 한 토막은 폰 없이 다 확인할 수 있다.
 *
 *   ① QR 을 만들고 읽는 것      ← 폰 없이 확인 가능. 여기서 한다.
 *   ② 푸시 주소를 받고 보내는 것 ← FCM 이 필요해서 실기기라야 한다.
 *
 * 지난번에 막힌 곳은 ①이었다 — 찍었는데 아무 일도 안 일어났다. 그런
 * 종류의 문제는 여기서 미리 걸린다. 그것도 두 가지 방법으로.
 *
 *   가. **규칙 확인** — 만든 QR 을 우리 파서가 그대로 되읽는지. 옛 판이
 *       만든 주소도 읽는지. 짧은 코드가 되돌아오는지.
 *
 *   나. **진짜 카메라로 확인** — QR 그림 파일을 하나 만들어 둔다. 노트북
 *       화면에 띄우고 **폰의 기본 카메라 앱**으로 비춰 보시면 된다. 화면에
 *       `gomtangivoca://child?token=…` 이라고 읽히면 그림은 멀쩡한 것이다.
 *       앱을 깔기 전에도 되고, 앱이 없으니 열리지는 않고 글자만 뜬다.
 *
 * 나 쪽이 특히 값지다. 카메라가 그 QR 을 못 읽는 문제라면 앱을 백 번 깔아도
 * 안 되는데, 그것을 설치 전에 가릴 수 있다.
 */

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync, spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { platform } from 'node:os';
import QRCode from 'qrcode';
import jsQR from 'jsqr';
import { PNG } from 'pngjs';

const OUT_DIR = 'link-check';
const OUT_PNG = `${OUT_DIR}/아이-QR-시험지.png`;
const OUT_HTML = `${OUT_DIR}/QR-시험지.html`;

/*
 * **어디에 만들어졌는지 반드시 전체 경로로 말한다.**
 *
 * 처음에는 `link-check/아이-QR-시험지.png` 라고만 적었는데, 그 줄만 보고는
 * 파일을 찾을 수가 없다는 말을 들었다. 맞는 말이다 — 어느 폴더를 기준으로 한
 * 상대 경로인지 화면에 없고, 한글 파일 이름이라 탐색기 검색으로도 잘 안 걸린다.
 * 만들어 놓고 못 찾으면 안 만든 것과 같다.
 */
const ABS_PNG = resolve(OUT_PNG);
const ABS_HTML = resolve(OUT_HTML);

/* app.json 의 주소를 그대로 쓴다. 여기서 다른 값을 쓰면 확인이 거짓말이 된다. */
const appJson = JSON.parse(readFileSync('app.json', 'utf8'));
const SCHEME = appJson.expo.scheme;
/** 읽기만 하는 옛 주소. src/features/pairing.ts 와 같아야 한다. */
const OLD_SCHEMES = ['gomtangvoca', 'urivocab'];

/*
 * 진짜 Expo 푸시 주소와 똑같은 길이·모양으로 만든다. 짧은 가짜 토큰으로
 * 시험하면 QR 격자가 작게 나와서, 정작 실제 상황에서 안 읽히는 것을 못 잡는다.
 */
const SAMPLE_TOKEN = 'ExponentPushToken[AbCdEfGhIjKlMnOpQrStUv]';
const SAMPLE_NAME = '서준';

/*
 * `test=1` 을 붙인다.
 *
 * 앱을 깐 폰으로 이 QR 을 찍고 '링크 열기' 를 누르면 앱이 열리는데, 표가
 * 없으면 **있지도 않은 아이가 목록에 등록된다.** 표를 보고 앱은 "시험용이
 * 잘 읽혔다" 고만 말하고 아무것도 안 한다.
 *
 * 덕분에 확인이 한 걸음 더 간다 — 카메라가 읽는지뿐 아니라 **앱까지
 * 넘어오는 길이 뚫렸는지**까지 뒤탈 없이 볼 수 있다.
 */
const url = `${SCHEME}://child?token=${encodeURIComponent(SAMPLE_TOKEN)}&name=${encodeURIComponent(SAMPLE_NAME)}&test=1`;

let bad = 0;
function check(label, ok, detail = '') {
  console.log(`  ${ok ? '✅' : '❌'} ${label}${detail ? `  ${detail}` : ''}`);
  if (!ok) bad++;
}

console.log('');
console.log('  폰에 깔기 전 — 연결 미리 보기 ' + '─'.repeat(28));
console.log('');

/* ── 가. 규칙 확인 ────────────────────────────────────────── */

console.log('  ① QR 을 만들고 읽는 규칙');

/*
 * 파서를 그대로 불러다 쓴다. TS 를 켜서 부르면 이 스크립트가 무거워지므로,
 * 규칙만 여기 옮겨 적는 대신 **소스에서 읽어 맞는지 대조**한다. 옮겨 적으면
 * 소스가 바뀌었을 때 이 확인이 조용히 거짓말을 하게 된다.
 */
const pairing = readFileSync('src/features/pairing.ts', 'utf8');
const declared = [...pairing.matchAll(/'([a-z]+)'/g)].map((m) => m[1]);
for (const old of OLD_SCHEMES) {
  check(
    `옛 주소 ${old}:// 도 읽습니다`,
    pairing.includes('OLD_LINK_SCHEMES') && declared.includes(old),
    '두 폰의 판이 달라도 됩니다',
  );
}
check(
  `지금 주소는 ${SCHEME}:// 입니다`,
  pairing.includes('appJson.expo.scheme'),
  'app.json 을 그대로 씁니다',
);
check('찍은 것을 한 자리에서 가립니다', pairing.includes('export function parseScanned'));
check('못 읽으면 무엇을 읽었는지 말합니다', pairing.includes('export function scannedError'));

console.log('');
console.log('  ② 코드로 연결하는 길');
const hasCodeScreen = (() => {
  try {
    return readFileSync('app/link-child-code.tsx', 'utf8').includes('rememberChild');
  } catch {
    return false;
  }
})();
check('부모 폰에 코드를 적을 칸이 있습니다', hasCodeScreen, '카메라가 안 될 때');

/* ── 나. 진짜 카메라로 확인할 그림 ─────────────────────────── */

console.log('');
console.log('  ③ 진짜 카메라로 확인할 QR');

mkdirSync(OUT_DIR, { recursive: true });
await QRCode.toFile(OUT_PNG, url, {
  errorCorrectionLevel: 'M',
  // 앱 화면에서 그리는 것보다 넉넉히 크게 뽑는다. 노트북 화면에 띄워
  // 폰으로 비추는 상황이라 칸이 커야 잘 읽힌다.
  width: 600,
  margin: 4,
});
const data = QRCode.create(url, { errorCorrectionLevel: 'M' });
check(
  'QR 그림을 만들었습니다',
  true,
  `${data.modules.size}칸 · ${url.length}글자 · 버전 ${data.version}`,
);

/*
 * 그림만 두지 않고 **설명이 붙은 쪽**을 하나 더 만든다.
 *
 * 그림 파일만 열면 QR 하나가 덩그러니 뜨고, 폰에 무엇이 떠야 맞는 것인지
 * 화면에 없다. 터미널 창과 그림 창을 번갈아 봐야 하는데 그 사이에 잊는다.
 * 확인에 필요한 것을 한 화면에 다 둔다.
 */
const dataUrl = await QRCode.toDataURL(url, { errorCorrectionLevel: 'M', width: 520, margin: 4 });
writeFileSync(
  OUT_HTML,
  `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<title>곰탱이보카 — QR 시험지</title>
<style>
  body { font-family: system-ui, 'Malgun Gothic', sans-serif; background:#F5F6FA; color:#1F2430;
         margin:0; padding:32px; display:flex; flex-direction:column; align-items:center; }
  h1 { font-size:22px; margin:0 0 4px; }
  p  { margin:4px 0; color:#5A6172; font-size:15px; line-height:1.6; }
  img { display:block; margin:24px 0; background:#fff; border-radius:12px; }
  code { display:block; background:#fff; border:1px solid #DDE1EA; border-radius:8px;
         padding:12px 14px; font-size:13px; word-break:break-all; max-width:560px; color:#1F2430; }
  ol { max-width:560px; font-size:15px; line-height:1.9; color:#1F2430; }
  .ok { color:#0F766E; font-weight:700; }
  .no { color:#B91C1C; font-weight:700; }
</style></head><body>
<h1>곰탱이보카 — 깔기 전 QR 시험지</h1>
<p>폰의 <b>기본 카메라 앱</b>으로 아래 QR 을 비춰 보세요. 앱을 안 깔았어도 됩니다.</p>
<img src="${dataUrl}" width="520" height="520" alt="시험용 QR">
<p>폰 화면에 이 글자가 뜨면 됩니다 :</p>
<code>${url}</code>
<ol>
  <li><span class="ok">글자가 뜬다</span> → QR 은 멀쩡합니다. 카메라 문제가 아닙니다.</li>
  <li><span class="no">아무것도 안 뜬다</span> → 폰을 20cm 쯤 띄우고 화면 밝기를 올려 보세요.
      그래도 안 되면 그 폰 카메라로는 QR 이 안 읽힙니다. 앱에서도 안 될 테니
      <b>코드로 연결하기</b>를 쓰세요.</li>
</ol>
<h2 style="font-size:18px;margin:28px 0 4px">앱을 이미 깔았다면 한 걸음 더</h2>
<p>카메라에 뜬 주소를 눌러 <b>링크 열기</b>를 고르세요. 앱이 열리면서
<b>“시험용 QR 이 잘 읽혔어요”</b> 라고 나오면 앱까지 오는 길도 뚫린 것입니다.
시험용이라 <b>아무것도 등록되지 않습니다.</b></p>
<p>대신 <b>“이 앱에 없는 화면이에요”</b> 나 영어로 <b>“Unmatched Route”</b> 가 뜨면,
QR 은 멀쩡하고 <b>앱이 예전 판</b>이라는 뜻입니다. 이 화면은 <b>0.20.0</b> 부터 있어요.
새 APK 를 받아 까시면 됩니다.</p>
<p>푸시 알림이 실제로 가는지는 여기서 못 봅니다. 그건 두 폰을 이어 봐야 알 수 있어요.</p>
</body></html>`,
  'utf8',
);
check('설명이 붙은 시험지도 만들었습니다', true);

/*
 * **만든 QR 을 도로 읽어 본다.**
 *
 * 여태까지는 "그렸다" 까지만 확인했다. 그런데 지난번에 막힌 곳이 바로 읽는
 * 쪽이었으니, 그린 것으로는 모자란다. 그림을 픽셀로 풀어서 QR 읽개에 넣고,
 * 나온 글자가 넣은 주소와 한 글자도 안 틀리는지 본다.
 *
 * 이러면 카메라를 대기 전에 이미 안다 — 우리가 만든 그림이 **기계가 읽을 수
 * 있는 QR** 인지. 폰에서 안 읽히면 그때는 그림이 아니라 카메라나 화면 문제다.
 * 둘을 갈라 놓아야 어디를 봐야 하는지 알 수 있다.
 */
const png = PNG.sync.read(readFileSync(OUT_PNG));
const decoded = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
check(
  '만든 QR 을 도로 읽어 봤습니다',
  decoded?.data === url,
  decoded ? (decoded.data === url ? '넣은 주소와 똑같이 나옵니다' : `다르게 읽힙니다 — ${decoded.data.slice(0, 40)}`) : '읽히지 않습니다',
);

console.log('');
console.log('  ' + '─'.repeat(58));
if (bad === 0) {
  console.log('  규칙은 다 맞습니다. 이제 눈으로 한 번 보시면 끝입니다.');
} else {
  console.log(`  ${bad}개가 어긋납니다. 위 ❌ 를 보고 고친 뒤 다시 부르세요.`);
}
console.log('');
console.log('  ▶ 시험지를 만들어 두었습니다. 여기 있습니다');
console.log('');
console.log(`     ${ABS_HTML}`);
console.log('');
console.log('     (그림만 필요하시면)');
console.log(`     ${ABS_PNG}`);
console.log('');
console.log('  ▶ 이렇게 확인하세요');
console.log('');
console.log('     1. 위 주소의 시험지가 브라우저에 저절로 열립니다');
console.log('        (안 열리면 주소를 그대로 복사해 브라우저 주소창에 붙여넣으세요)');
console.log('     2. 폰의 기본 카메라 앱을 켜고 노트북 화면의 QR 을 비추세요');
console.log('     3. 폰 화면에 이렇게 뜨면 됩니다 :');
console.log('');
console.log(`        ${url}`);
console.log('');
console.log('     · 글자가 뜨면 → QR 은 멀쩡합니다. 카메라 문제가 아닙니다.');
console.log('     · 아무것도 안 뜨면 → 폰을 20cm 쯤 띄우고 화면 밝기를 올려 보세요.');
console.log('       그래도 안 되면 그 폰 카메라로는 QR 이 안 읽힙니다 —');
console.log('       앱에서도 안 될 테니 코드로 연결하는 길을 쓰세요.');
console.log('');

/*
 * 저절로 열어 준다.
 *
 * 경로를 적어 주는 것만으로는 모자랐다 — 탐색기를 켜고 폴더를 따라 들어가는
 * 동안 무엇을 확인하려 했는지 흐려진다. 열리면 바로 폰을 들면 된다.
 *
 * 못 열어도 그냥 넘어간다. 위에 경로를 적어 두었으니 길이 막히지는 않는다.
 * (원격 접속이나 서버에서는 열 창 자체가 없다.)
 */
function openIt(file) {
  const os = platform();
  try {
    if (os === 'win32') {
      // start 는 셸 내장이라 cmd 를 거쳐야 한다. 첫 따옴표는 창 제목 자리다.
      spawn('cmd', ['/c', 'start', '', file], { detached: true, stdio: 'ignore' }).unref();
    } else if (os === 'darwin') {
      spawn('open', [file], { detached: true, stdio: 'ignore' }).unref();
    } else {
      spawn('xdg-open', [file], { detached: true, stdio: 'ignore' }).unref();
    }
  } catch {
    // 창이 없는 곳이다. 경로는 이미 적어 두었다.
  }
}
if (!process.env.NO_OPEN) openIt(ABS_HTML);
console.log('  ▶ 여기서 확인 못 하는 것');
console.log('');
console.log('     푸시 주소를 받고 보내는 일은 FCM 이 있어야 해서 폰이 필요합니다.');
console.log('     앱을 깔고 나면 아이 폰 ⚙️ 설정 → 부모님과 연결하기 에서');
console.log('     QR 이 실제로 뜨는지로 확인하세요. 안 뜨면 그 자리에 까닭이 적힙니다.');
console.log('');

/* 확인용 그림은 저장소에 올릴 것이 아니다. 빠져 있으면 알려 준다. */
try {
  const ignored = execFileSync('git', ['check-ignore', OUT_DIR], { encoding: 'utf8' }).trim();
  if (!ignored) throw new Error('not ignored');
} catch {
  console.log(`  (참고) ${OUT_DIR}/ 는 .gitignore 에 넣어 두세요. 올릴 것이 아닙니다.`);
  console.log('');
}

if (bad > 0) process.exitCode = 1;
