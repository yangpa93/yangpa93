/**
 * **보내는 알림마다 통로(채널)가 실제로 만들어지는지.**
 *
 * ── 왜 이 시험이 생겼나 ─────────────────────────────────────
 *
 * Expo 푸시 서버가 "전송에 성공했습니다" 라고 하는데 폰에는 아무것도 안 떴다.
 * 방해 금지도 꺼져 있었다.
 *
 * 안드로이드 8부터 모든 알림은 통로 하나에 속해야 하고, **없는 통로로 온
 * 알림은 조용히 버려진다.** 오류도 안 나고 보내는 쪽 영수증은 성공이라
 * 밖에서는 알 방법이 없다. 가장 나쁜 모양의 실패다.
 *
 * 그런데 `child-nudge` 는 **아무 데서도 안 만들어지고 있었다.** 부모가
 * 아이에게 보내는 것 전부가 그 통로를 쓴다 — 연결하고 되보내는 인사,
 * 공부하자, 과목 바꾸기. 그러니 부모가 아이 QR 을 찍어도 아이 폰에서는
 * 아무 일도 안 일어났다.
 *
 * 이런 것은 눈으로 못 잡는다. 통로 이름은 보내는 쪽 코드에만 적혀 있고,
 * 만드는 쪽 코드와는 글자로만 이어져 있어서 한쪽을 지워도 아무 표가 안 난다.
 * **글자로만 이어진 자리는 시험으로 묶어 둔다.**
 *
 * 화면(react-native)을 안 쓰는 순수 로직이라 기기 없이 확인된다. 통로 목록은
 * notifications.ts 에 있지만 그 파일은 expo-notifications 를 읽으므로
 * 여기서는 **목록을 소스에서 읽어** 대조한다.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildHelloBody,
  buildLinkBackBody,
  buildNudgeBody,
  buildPushBody,
  buildRewardAskBody,
  buildSettingsBody,
} from '../src/features/pairing';

const TOKEN = 'ExponentPushToken[AbCdEfGhIjKlMnOpQrStUv]';

/** 우리가 실제로 보내는 알림 전부. 하나라도 빠뜨리면 그것만 조용히 사라진다. */
const SENT: { what: string; body: { channelId?: string } }[] = [
  {
    what: '오늘 학습 리포트',
    body: buildPushBody(TOKEN, {
      childName: '서준',
      date: '2026-08-03',
      headline: '오늘 20개 했어요',
      detail: '',
      completed: true,
    }),
  },
  {
    what: '아이가 연결하며 보내는 인사',
    body: buildHelloBody(TOKEN, { childName: '서준', childToken: TOKEN }),
  },
  {
    what: '부모가 되보내는 인사',
    body: buildLinkBackBody(TOKEN, { parentToken: TOKEN, parentLabel: '엄마 폰' }),
  },
  { what: '공부하자', body: buildNudgeBody(TOKEN, { from: '엄마 폰', message: '해 볼까요' }) },
  {
    what: '과목 바꾸기',
    body: buildSettingsBody(TOKEN, { from: '엄마 폰', subjects: ['en'] }),
  },
  {
    what: '동기 부여 요청권 신청',
    body: buildRewardAskBody(TOKEN, { childName: '서준', reason: '레벨 하나 끝', amount: 20000 }),
  },
];

/**
 * 실제로 만들어지는 통로 이름들.
 *
 * 소스에서 읽는다. 여기 옮겨 적으면 notifications.ts 가 바뀌었을 때 이 시험이
 * 조용히 거짓말을 하게 된다 — 그러면 시험이 있으나 마나 하다.
 */
function createdChannels(): string[] {
  const src = readFileSync(join(__dirname, '..', 'src', 'features', 'notifications.ts'), 'utf8');
  const list = src.slice(src.indexOf('NOTIFICATION_CHANNELS'));
  return [...list.matchAll(/id:\s*'([a-z-]+)'/g)].map((m) => m[1]);
}

describe('알림 통로', () => {
  it('만들어지는 통로가 있다', () => {
    expect(createdChannels().length).toBeGreaterThan(0);
  });

  it.each(SENT.map((s) => [s.what, s.body.channelId] as const))(
    '%s — 통로 이름이 붙어 있다',
    (_what, channelId) => {
      // 통로를 안 적으면 안드로이드가 기본 통로로 보낸다. 그러면 사용자가
      // 우리 알림을 갈래별로 끄고 켤 수가 없다.
      expect(channelId).toBeTruthy();
    },
  );

  /*
   * 이 파일의 핵심. 보내면서 부르는 통로가 만들어지는 목록에 없으면,
   * 그 알림은 **영수증이 성공이어도 폰에 안 뜬다.**
   */
  it.each(SENT.map((s) => [s.what, s.body.channelId] as const))(
    '%s — 그 통로가 실제로 만들어진다',
    (_what, channelId) => {
      expect(createdChannels()).toContain(channelId);
    },
  );

  /* 부모가 아이에게 보내는 것은 전부 이 통로다. 없어서 실제로 당했다. */
  it('child-nudge 가 만들어진다', () => {
    expect(createdChannels()).toContain('child-nudge');
  });

  it('parent-report 가 만들어진다', () => {
    expect(createdChannels()).toContain('parent-report');
  });

  /*
   * 앱이 뜰 때 무조건 만드는지. 예전에는 "리포트 알림을 켜 두었고 예약이
   * 실제로 걸릴 때만" 만들어져서, 그 조건을 안 밟은 폰에는 통로가 없었다.
   */
  it('앱이 뜰 때 만든다 — 조건을 달지 않는다', () => {
    const layout = readFileSync(join(__dirname, '..', 'app', '_layout.tsx'), 'utf8');
    expect(layout).toContain('ensureNotificationChannels()');
  });
});
