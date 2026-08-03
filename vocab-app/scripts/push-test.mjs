#!/usr/bin/env node
/**
 * Expo 푸시 서버에 **직접 물어본다.**
 *
 *   npm run push-test -- "ExponentPushToken[...]"
 *
 * ── 왜 이게 필요한가 ────────────────────────────────────────
 *
 * 지금 증상은 이렇다. 아이 폰에서 QR 은 **만들어진다**. 그런데 부모 폰에서
 * 찍으면 "연결이 안 되었다"고 나온다. 코드를 손으로 옮겨 적어도 안 된다.
 *
 * 이 둘은 서로 다른 일이다.
 *
 *   QR 이 만들어졌다 = 이 기기가 **푸시 주소를 받는 데는 성공했다**
 *   전송이 안 된다   = 그 주소로 **보내는 데서 막힌다**
 *
 * 주소를 받는 것과 그 주소로 보내는 것은 통과해야 하는 관문이 다르다. 앞의
 * 것은 앱과 구글 플레이 서비스만 있으면 되고, 뒤의 것은 **EAS 에 올려 둔 FCM
 * 열쇠**가 지금 앱의 패키지 이름과 맞아야 한다. 패키지를
 * `com.yangpa93.gomtangvoca` → `com.yangpa93.gomtangivoca` 로 바꾼 적이 있으니
 * 여기가 어긋나 있을 만하다. 그러면 **토큰은 나오는데 전송만 실패한다** —
 * 지금 증상과 정확히 맞는다.
 *
 * 앱 코드를 아무리 읽어도 이건 안 보인다. 서버에 물어봐야 안다.
 *
 * ── 무엇을 하는가 ──────────────────────────────────────────
 *
 *   ① 보낸다      POST https://exp.host/--/api/v2/push/send
 *   ② 영수증을 본다 POST https://exp.host/--/api/v2/push/getReceipts
 *
 * ②가 특히 중요하다. ①은 "Expo 가 받아 두었다"까지만 말한다. FCM 열쇠가
 * 어긋난 것 같은 진짜 원인은 **영수증에서야 나온다** — Expo 가 구글에 넘겨
 * 보고 나서 알게 되는 일이기 때문이다. ①만 보고 "ok 니까 됐다"고 넘기면
 * 아무것도 못 가린다.
 *
 * 답은 전부 한국어로 풀어 적는다. 무엇이 문제고 무엇을 하면 되는지까지.
 */

import { readFileSync } from 'node:fs';

const SEND = 'https://exp.host/--/api/v2/push/send';
const RECEIPTS = 'https://exp.host/--/api/v2/push/getReceipts';

/** 영수증이 준비될 때까지 기다리는 시간. Expo 문서가 15분까지 걸릴 수 있다고 하지만
 *  실제로는 몇 초 안에 나온다. 안 나오면 "아직 안 나왔다"고 말하고 끝낸다 —
 *  기다리는 척하며 매달려 있는 것보다 낫다. */
const WAIT_MS = 6000;

const token = (process.argv[2] ?? '').trim();

console.log('');
console.log('  Expo 푸시 서버에 직접 물어보기 ' + '─'.repeat(27));
console.log('');

/* ── 무엇으로 물어보는지 먼저 적는다 ───────────────────────── */

let app;
try {
  app = JSON.parse(readFileSync('app.json', 'utf8')).expo;
} catch {
  console.log('  ✖ app.json 을 못 읽었습니다. vocab-app 폴더에서 부르셔야 합니다.');
  process.exit(1);
}

console.log(`  이 소스의 패키지 이름   ${app.android?.package ?? '(없음)'}`);
console.log(`  이 소스의 EAS 프로젝트  ${app.extra?.eas?.projectId ?? '(없음)'}`);
console.log('');
console.log('  ※ 폰에 깔린 앱이 이 패키지 이름으로 빌드된 것이라야 아래 결과가 뜻이 있습니다.');
console.log('');

if (!token) {
  usage();
  process.exit(1);
}

if (!/^Expo(nent)?PushToken\[[^\]]+\]$/.test(token)) {
  console.log(`  ✖ 푸시 주소처럼 생기지 않았습니다 — ${token}`);
  console.log('');
  console.log('    ExponentPushToken[ 으로 시작하고 ] 로 끝나야 합니다.');
  console.log('    아이 폰 QR 아래 **짧은 코드**를 넣으신 것이라면, 그건 이 도구가 아니라');
  console.log('    부모 폰의 코드 칸에 넣는 것입니다.');
  console.log('');
  usage();
  process.exit(1);
}

console.log(`  물어볼 주소  ${token}`);
console.log('');

/* ── ① 보낸다 ─────────────────────────────────────────────── */

console.log('  ① 보내는 중…');

const body = [
  {
    to: token,
    title: '🔧 곰탱이보카 — 전송 시험',
    body: '이 알림이 폰에 떴다면 푸시가 살아 있는 것입니다.',
    sound: 'default',
    priority: 'high',
    channelId: 'parent-report',
    data: { kind: 'push-test' },
  },
];

let sendJson;
try {
  const res = await fetch(SEND, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  try {
    sendJson = JSON.parse(text);
  } catch {
    console.log(`  ✖ 서버가 JSON 이 아닌 것을 돌려줬습니다 (HTTP ${res.status})`);
    console.log(`    ${text.slice(0, 300)}`);
    process.exit(1);
  }
  if (!res.ok && !sendJson.errors && !sendJson.data) {
    console.log(`  ✖ HTTP ${res.status}`);
    console.log(`    ${text.slice(0, 300)}`);
    process.exit(1);
  }
} catch (e) {
  console.log(`  ✖ 서버에 닿지 못했습니다 — ${e instanceof Error ? e.message : String(e)}`);
  console.log('    인터넷 연결이나 회사 방화벽을 확인해 주세요.');
  process.exit(1);
}

/* 요청 자체가 거절된 경우. 티켓이 아예 안 나온다. */
if (Array.isArray(sendJson.errors) && sendJson.errors.length > 0) {
  console.log('');
  console.log('  ✖ 요청이 통째로 거절됐습니다.');
  for (const e of sendJson.errors) {
    console.log('');
    explain(e.details?.error ?? e.code, e.message, 'ticket');
  }
  process.exit(1);
}

const ticket = Array.isArray(sendJson.data) ? sendJson.data[0] : sendJson.data;
if (!ticket) {
  console.log('  ✖ 서버 답에 티켓이 없습니다.');
  console.log(`    ${JSON.stringify(sendJson).slice(0, 300)}`);
  process.exit(1);
}

console.log(`     → status = ${ticket.status}`);

if (ticket.status === 'error') {
  console.log('');
  console.log('  ✖ 여기서 이미 막혔습니다. Expo 가 받아 주지도 않았습니다.');
  console.log('');
  explain(ticket.details?.error, ticket.message, 'ticket');
  process.exit(1);
}

console.log('     Expo 가 받아 두었습니다. 다만 아직 아무것도 확정되지 않았습니다.');
console.log('');

/* ── ② 영수증 ─────────────────────────────────────────────── */

console.log(`  ② 영수증을 기다리는 중… (${WAIT_MS / 1000}초)`);
await new Promise((r) => setTimeout(r, WAIT_MS));

let receipt;
try {
  const res = await fetch(RECEIPTS, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ ids: [ticket.id] }),
  });
  const json = await res.json();
  receipt = json?.data?.[ticket.id];
  if (Array.isArray(json?.errors) && json.errors.length > 0) {
    console.log('');
    console.log('  ✖ 영수증을 물어보는 것 자체가 거절됐습니다.');
    for (const e of json.errors) explain(e.details?.error ?? e.code, e.message, 'receipt');
    process.exit(1);
  }
} catch (e) {
  console.log(`  ✖ 영수증을 못 받았습니다 — ${e instanceof Error ? e.message : String(e)}`);
  process.exit(1);
}

console.log('');
console.log('  ' + '─'.repeat(58));
console.log('');

if (!receipt) {
  console.log('  ⚠️  영수증이 아직 안 나왔습니다.');
  console.log('');
  console.log('     Expo 가 구글에 넘기는 중일 수 있습니다. 잠시 뒤 한 번 더 불러 보세요.');
  console.log('     여러 번 불러도 계속 안 나오면 그것 자체가 이상한 것이니 알려 주세요.');
  console.log('');
  process.exit(0);
}

if (receipt.status === 'ok') {
  console.log('  ✅ 전송에 성공했습니다.');
  console.log('');
  console.log('     구글(FCM)이 알림을 받아 갔습니다. **푸시 쪽은 멀쩡합니다.**');
  console.log('     이 주소의 폰에 "🔧 곰탱이보카 — 전송 시험" 알림이 떴는지 보세요.');
  console.log('');
  console.log('     · 알림이 떴다  → 연결이 안 되는 원인은 **앱 코드 쪽**입니다.');
  console.log('       그 폰의 판(📱 0.??.?)을 알려 주세요. 거기서부터 찾겠습니다.');
  console.log('     · 알림이 안 떴다 → 그 폰의 알림 권한이나 방해 금지 모드를 확인해 주세요.');
  console.log('');
  process.exit(0);
}

console.log('  ✖ 전송에 실패했습니다. 여기가 지금 막혀 있는 자리입니다.');
console.log('');
explain(receipt.details?.error, receipt.message, 'receipt');
process.exitCode = 1;

/* ------------------------------------------------------------------ */

/**
 * 서버가 준 오류 이름을 사람 말로 푼다.
 *
 * 원래 메시지도 늘 함께 남긴다. 짐작이 틀렸을 때 원래 메시지가 없으면
 * 더 볼 것이 없어진다 — 실제로 그렇게 한나절을 잃은 적이 있다.
 *
 * @param stage 'ticket' 이면 보내기 단계, 'receipt' 면 영수증 단계.
 *              같은 이름이라도 어느 단계에서 났느냐에 따라 뜻이 다르다.
 *              특히 DeviceNotRegistered 가 그렇다 — 보내기 단계의 것은
 *              "Expo 가 그 주소를 아예 모른다"이고, 영수증 단계의 것은
 *              "구글이 그 기기를 더는 모른다"이다. 앞의 경우에는 FCM 열쇠가
 *              멀쩡한지 아직 아무것도 확인되지 않았다.
 */
function explain(code, message, stage) {
  const known = {
    MismatchSenderId: {
      what:
        'EAS 에 올려 둔 FCM 열쇠가 지금 폰에 깔린 앱의 패키지와 다릅니다.\n' +
        '     구글은 "누가 보내는가"를 발신자 번호로 가리는데, 그 번호가 안 맞습니다.',
      why:
        `패키지 이름을 바꾼 적이 있으면 여기가 어긋납니다. 지금 소스는\n` +
        `     ${app.android?.package} 인데, EAS 에 올라간 열쇠는 예전\n` +
        `     파이어베이스 프로젝트 것일 수 있습니다.\n\n` +
        '     이 경우 토큰은 멀쩡히 나옵니다. 그래서 QR 은 만들어지는데\n' +
        '     보내는 것만 실패합니다 — 지금 증상과 정확히 맞습니다.',
      fix: [
        'npx eas-cli@latest credentials',
        '  → Android → production(또는 지금 쓰는 프로필)',
        '  → Google Service Account Key → Manage → 지금 열쇠가 어느',
        '    파이어베이스 프로젝트 것인지 확인',
        '',
        '파이어베이스 콘솔에서 안드로이드 앱이',
        `  ${app.android?.package} 로 등록돼 있는지 보세요.`,
        '없으면 그 패키지로 앱을 추가하고 google-services.json 을 새로 받아',
        'vocab-app/google-services.json 을 덮어쓴 뒤,',
        '서비스 계정 열쇠(.json)를 EAS 에 다시 올리고 **APK 를 다시 만드세요.**',
      ],
    },
    InvalidCredentials: {
      what: 'EAS 에 FCM 열쇠가 아예 없습니다.',
      why:
        '안드로이드 푸시는 구글 FCM 으로만 갑니다. Expo 가 우리 대신 구글에\n' +
        '     넣어 주는데, 그러려면 우리 파이어베이스 프로젝트의 열쇠를 EAS 에\n' +
        '     올려 두어야 합니다. 그 열쇠가 없습니다.\n\n' +
        '     토큰은 멀쩡합니다. 주소를 못 찾은 것이 아니라 그 주소로 보낼\n' +
        '     방법이 없는 것입니다. 그래서 QR 은 만들어지는데 전송만 실패합니다 —\n' +
        '     지금 증상과 정확히 맞습니다.',
      fix: [
        '① 파이어베이스 콘솔에서 열쇠 파일을 받습니다',
        '     console.firebase.google.com → 우리 프로젝트',
        '     → ⚙️ 프로젝트 설정 → 서비스 계정 탭',
        '     → [새 비공개 키 생성] → .json 파일이 받아집니다',
        '',
        '② 같은 프로젝트에서 FCM API 가 켜져 있는지 봅니다',
        '     프로젝트 설정 → 클라우드 메시징 탭',
        '     → Firebase Cloud Messaging API (V1) 가 "사용 설정됨" 이라야 합니다',
        '',
        '③ 그 .json 을 EAS 에 올립니다',
        '     npx eas-cli@latest credentials',
        '     → Android → production',
        '     → Google Service Account',
        '     → ...Key for Push Notifications (FCM V1)',
        '     → Set up a Google Service Account Key → 받은 .json 을 고릅니다',
        '',
        '④ 이 명령을 한 번 더 돌려 확인합니다',
        '     npm run push-test -- "같은 주소"',
        '',
        '─ APK 를 다시 안 만드셔도 될 가능성이 높습니다 ─',
        '',
        '이 열쇠는 Expo 서버가 쓰는 것이지 앱 안에 들어가는 것이 아닙니다.',
        '앱 쪽에 필요한 google-services.json 은 이미 들어 있습니다 — 없었으면',
        '애초에 QR 이 안 떴을 것입니다. ④ 가 ✅ 로 바뀌면 지금 깔린 앱',
        '그대로 알림이 갑니다.',
        '',
        '다만 그것과 별개로, 부모 폰에 아이가 등록되지 않던 버그는 앱 쪽에',
        '있었고 0.23.0 에서 고쳤습니다. 깔린 앱이 그보다 아래라면 푸시가',
        '살아난 뒤에도 아이 목록이 비어 보일 수 있습니다.',
      ],
    },
    DeviceNotRegistered:
      stage === 'ticket'
        ? {
            what: 'Expo 가 그 주소를 아예 모릅니다.',
            why:
              '보내기 단계에서 이 말이 나온 것입니다. 뜻은 둘 중 하나입니다.\n\n' +
              '     · 주소를 옮겨 적다가 한 글자가 틀렸다\n' +
              '     · 앱을 지웠다 다시 깔아서 그 주소가 이미 버려졌다\n\n' +
              '     이 단계에서는 FCM 열쇠가 맞는지 아직 아무것도 확인되지 않았습니다.\n' +
              '     구글까지 가 보지도 못하고 Expo 문턱에서 돌아온 것이기 때문입니다.',
            fix: [
              '아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기 로',
              'QR 을 다시 띄우고, 그 QR 을 폰 기본 카메라로 찍어 나온 주소를',
              '한 글자도 빼지 말고 그대로 넣어 다시 불러 주세요.',
              '',
              '살아 있는 주소로 다시 불렀는데도 같은 말이 나오면 알려 주세요.',
            ],
          }
        : {
            what: '구글이 그 기기를 더는 모릅니다. 죽은 주소입니다.',
            why:
              '앱을 지웠다 다시 깔았거나, 앱 데이터를 지웠거나, 주소가 만료됐을 때\n' +
              '     이렇게 됩니다. 앱을 다시 깔면 주소가 새로 바뀌는데, 부모 폰에는\n' +
              '     예전 주소가 남아 있으면 계속 여기로 옵니다.',
            fix: [
              '아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기 로',
              'QR 을 다시 띄우고, 부모 폰에서 그것을 다시 찍으세요.',
              '',
              '영수증 단계까지 왔다는 것은 Expo 가 구글에 넘기는 데까지는 갔다는',
              '뜻이라, FCM 열쇠 자체는 붙어 있습니다.',
            ],
          },
    MessageTooBig: {
      what: '보낸 내용이 너무 큽니다(4KB 넘음).',
      why: '리포트 글이 길어지면 여기 걸립니다. 시험용 알림은 짧으니 이건 잘 안 납니다.',
      fix: ['리포트에 싣는 글을 줄여야 합니다. 이 말이 나오면 알려 주세요.'],
    },
    MessageRateExceeded: {
      what: '너무 자주 보냈습니다.',
      why: 'Expo 가 한 기기에 보내는 횟수를 제한합니다.',
      fix: ['몇 분 뒤에 다시 불러 보세요.'],
    },
    ExpoError: {
      what: 'Expo 쪽에서 난 오류입니다.',
      why: '아래 원래 메시지를 봐야 합니다.',
      fix: ['원래 메시지를 그대로 알려 주세요.'],
    },
    ProviderError: {
      what: '구글(FCM) 쪽에서 난 오류입니다.',
      why: '아래 원래 메시지를 봐야 합니다.',
      fix: ['잠시 뒤 다시 불러 보세요. 계속 나면 원래 메시지를 알려 주세요.'],
    },
  };

  const k = known[code];
  console.log(`     오류 이름 — ${code ?? '(없음)'}`);
  console.log('');

  /*
   * 이 자리에서 **아니라고 밝혀진 것**도 적는다.
   *
   * 오류 하나를 받으면 그것만 보게 되는데, 그러면 "그럼 패키지 이름 바꾼 건
   * 괜찮은 건가" 같은 것이 계속 남는다. 남은 걱정은 다음에 또 뒤지게 만든다.
   */
  if (code === 'InvalidCredentials' || code === 'MismatchSenderId') {
    console.log('     이건 아닙니다 — 이번 답으로 걸러진 것');
    console.log('       · 주소가 죽은 것이 아닙니다. Expo 가 그 주소는 알고 있습니다.');
    console.log('       · 옮겨 적다 틀린 것도 아닙니다. 같은 이유입니다.');
    if (code === 'InvalidCredentials') {
      console.log('       · 패키지 이름을 바꾼 것 때문도 아닙니다. 그거라면');
      console.log('         MismatchSenderId 가 나옵니다.');
    }
    console.log('');
  }

  if (!k) {
    console.log('     처음 보는 오류입니다. 원래 메시지를 그대로 알려 주세요.');
    console.log('');
    console.log(`     원래 메시지 — ${message ?? '(없음)'}`);
    console.log('');
    return;
  }

  console.log(`     무엇이 문제인가`);
  console.log(`     ${k.what}`);
  console.log('');
  console.log(`     왜 이렇게 되나`);
  console.log(`     ${k.why}`);
  console.log('');
  console.log(`     무엇을 하면 되나`);
  for (const line of k.fix) console.log(line ? `       ${line}` : '');
  console.log('');
  console.log(`     원래 메시지 — ${message ?? '(없음)'}`);
  console.log('');
}

function usage() {
  console.log('  이렇게 쓰세요');
  console.log('');
  console.log('      npm run push-test -- "ExponentPushToken[여기에 주소]"');
  console.log('');
  console.log('  주소는 어디서 얻나');
  console.log('');
  console.log('    아이 폰 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기');
  console.log('    거기 뜬 QR 을 폰 기본 카메라로 찍으면 주소 글자가 그대로 보입니다.');
  console.log('    gomtangivoca://child?token=ExponentPushToken%5B...%5D&name=...');
  console.log('    그중 token= 뒤의 것이고, %5B 는 [ · %5D 는 ] 입니다.');
  console.log('');
  console.log('    부모 폰 주소가 필요하면 부모 폰에서 같은 방법으로 얻으시면 됩니다.');
  console.log('');
}
