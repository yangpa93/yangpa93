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
export function toPayload(report: DailyReport, weekly?: WeeklySummary): PushPayload {
  return {
    childName: report.profileName,
    date: report.date,
    headline: reportHeadline(report),
    detail: reportText(report, weekly),
    completed: report.completed,
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
