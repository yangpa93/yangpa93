/**
 * 페어링과 전송 메시지의 순수 로직.
 *
 * 네이티브 모듈(expo-notifications 등)을 쓰지 않는다. 기기 없이 테스트할 수
 * 있어야 하고, 전송 규격이 어긋나면 부모님이 리포트를 못 받는데 그건
 * 실기기에서야 알아차리게 되기 때문이다. 실제 전송·수신은 `push.ts`가 한다.
 */

import { DailyReport, reportHeadline, reportText, WeeklySummary } from './report';

/** 딥링크 스킴. app.json의 `scheme`과 같아야 한다. */
export const LINK_SCHEME = 'urivocab';

export const EXPO_PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export interface PushPayload {
  childName: string;
  date: string;
  headline: string;
  detail: string;
  completed: boolean;
  /**
   * 보낸 아이 기기의 푸시 주소.
   *
   * 부모가 "공부하자"고 되보내려면 아이 기기 주소를 알아야 한다. 리포트에
   * 실어 보내면 부모가 따로 물어볼 일이 없다. 아이 기기가 주소를 못 받은
   * 경우(권한 거부 등)에는 없을 수 있다.
   */
  childToken?: string;
}

/**
 * 아이 기기가 연결하면서 자기 주소를 알리는 인사.
 *
 * 리포트로 대신할 수는 없다. 부모가 부르고 싶은 때가 바로 리포트가 안 온
 * 날이기 때문이다. 연결하는 순간에 한 번 보내 둔다.
 */
export interface HelloPayload {
  childName: string;
  childToken: string;
}

/** 부모가 아이에게 보내는 알림. 리포트와 반대 방향이다. */
export interface NudgePayload {
  /** 보낸 사람 표시. '엄마 폰' 처럼 */
  from: string;
  message: string;
}

/** 페어링용 딥링크. 부모 기기가 만들어 카톡 등으로 아이 기기에 보낸다. */
export function buildLinkUrl(token: string, label: string): string {
  return `${LINK_SCHEME}://link?token=${encodeURIComponent(token)}&label=${encodeURIComponent(label)}`;
}

/**
 * 붙여넣은 값이 푸시 토큰처럼 생겼는지 본다.
 *
 * 카카오톡에서 복사하면 앞뒤 공백이 딸려 오기 쉬워서 먼저 다듬는다.
 * 진짜 유효한지는 보내 봐야 알 수 있고, 여기서는 오타를 거르는 정도만 한다.
 */
export function isValidPushToken(token: string): boolean {
  const t = token.trim();
  if (/^Expo(nent)?PushToken\[[^\]]+\]$/.test(t)) return true;
  // 다른 형식으로 바뀌더라도 막지 않도록 최소 길이만 확인한다.
  return /^[A-Za-z0-9_-]{20,}$/.test(t);
}

/** 리포트를 전송용 페이로드로 만든다. */
export function toPayload(
  report: DailyReport,
  weekly?: WeeklySummary,
  childToken?: string | null,
): PushPayload {
  return {
    childName: report.profileName,
    date: report.date,
    headline: reportHeadline(report),
    detail: reportText(report, weekly),
    completed: report.completed,
    ...(childToken ? { childToken } : {}),
  };
}

/** 받은 푸시에서 리포트를 꺼낸다. 우리 형식이 아니면 null. */
export function parseIncoming(data: unknown): PushPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'daily-report') return null;
  if (typeof d.childName !== 'string' || typeof d.date !== 'string') return null;
  return {
    childName: d.childName,
    date: d.date,
    ...(typeof d.childToken === 'string' ? { childToken: d.childToken } : {}),
    headline: typeof d.headline === 'string' ? d.headline : '',
    detail: typeof d.detail === 'string' ? d.detail : '',
    completed: d.completed === true,
  };
}

/** Expo 푸시 서버에 보낼 요청 본문. */
export function buildPushBody(token: string, payload: PushPayload) {
  return {
    to: token,
    title: `📚 ${payload.childName} 학습 리포트`,
    body: payload.headline,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'parent-report',
    // 부모 앱이 화면에 쌓아 두려고 원본을 같이 싣는다.
    data: { kind: 'daily-report', ...payload },
  };
}

/**
 * 부모 → 아이 알림.
 *
 * 리포트가 안 왔을 때 부모가 부를 수 있어야 한다. 문자를 따로 보내는 것보다
 * 앱 알림이 낫다 — 누르면 바로 공부 화면으로 들어간다.
 */
export function buildNudgeBody(token: string, payload: NudgePayload) {
  return {
    to: token,
    title: `📚 ${payload.from}`,
    body: payload.message,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'child-nudge',
    data: { kind: 'nudge', ...payload },
  };
}

/** 받은 푸시에서 부모의 알림을 꺼낸다. 우리 형식이 아니면 null. */
export function parseNudge(data: unknown): NudgePayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'nudge') return null;
  if (typeof d.message !== 'string' || d.message.length === 0) return null;
  return { from: typeof d.from === 'string' ? d.from : '부모님', message: d.message };
}

export function buildHelloBody(parentToken: string, payload: HelloPayload) {
  return {
    to: parentToken,
    title: '🔗 연결됐어요',
    body: `${payload.childName}의 기기가 연결됐어요.`,
    sound: 'default' as const,
    priority: 'normal' as const,
    channelId: 'parent-report',
    data: { kind: 'hello', ...payload },
  };
}

/** 받은 푸시에서 연결 인사를 꺼낸다. 우리 형식이 아니면 null. */
export function parseHello(data: unknown): HelloPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'hello') return null;
  if (typeof d.childName !== 'string' || typeof d.childToken !== 'string') return null;
  if (d.childName.length === 0 || d.childToken.length === 0) return null;
  return { childName: d.childName, childToken: d.childToken };
}

/** 부모가 고를 수 있는 문구. 직접 쓰는 것보다 누르기 쉽다. */
export const NUDGE_PRESETS = [
  '오늘 공부 시작할 시간이에요! 📚',
  '10분만 해 볼까요? 😊',
  '오늘 아직 안 했네요. 같이 해요!',
  '조금만 더 하면 레벨업이에요! 🎉',
] as const;


/**
 * 푸시 토큰 발급이 실패한 까닭을 사람이 읽을 수 있는 말로.
 *
 * 예전에는 어떤 오류가 나든 "Expo Go에서는 받을 수 없습니다"라고만 했다.
 * EAS로 제대로 빌드한 앱에서도 그 말이 나와서, 무엇이 잘못됐는지 알 길이
 * 없었다. 실제로 그렇게 한나절을 잃었다.
 *
 * 짐작되는 원인을 앞에 적고 **원래 오류도 함께** 남긴다. 짐작이 틀렸을 때
 * 원래 오류가 없으면 더 볼 것이 없어진다.
 *
 * 안드로이드에서 가장 흔한 원인은 FCM 설정이 없는 것이다. 구글이 안드로이드
 * 푸시를 FCM으로만 받게 해 두어서, 파이어베이스 설정 파일과 EAS에 올린 열쇠가
 * 둘 다 있어야 토큰이 나온다.
 *
 * @param isExpoGo Expo Go로 돌고 있는지. 네이티브 모듈을 여기서 읽지 않으려고
 *                 밖에서 받는다 — 이 파일은 기기 없이 테스트할 수 있어야 한다.
 */
export function pushFailureReason(e: unknown, isExpoGo = false): string {
  const raw = e instanceof Error ? e.message : String(e);

  if (isExpoGo) {
    return 'Expo Go에서는 푸시 토큰을 받을 수 없습니다. EAS로 빌드한 앱에서 다시 시도해 주세요.';
  }

  if (/FCM|FirebaseApp|google-services/i.test(raw)) {
    return (
      '안드로이드 푸시(FCM) 설정이 없습니다. 컴퓨터에서 파이어베이스 설정을 마치고 ' +
      `앱을 다시 빌드해 주세요.\n\n원래 오류: ${raw}`
    );
  }

  if (/network|timeout|ENOTFOUND|fetch/i.test(raw)) {
    return `인터넷 연결을 확인해 주세요.\n\n원래 오류: ${raw}`;
  }

  return `푸시 토큰을 받지 못했습니다.\n\n원래 오류: ${raw}`;
}
