/**
 * 기기 간 리포트 전송.
 *
 * 서버를 두지 않고 Expo 푸시 서비스를 중계로 쓴다.
 *   아이 기기 ──(HTTPS POST)──▶ Expo 푸시 서버 ──▶ 부모님 폰
 *
 * Expo 푸시 API는 기본 설정에서 별도 인증 없이 '푸시 토큰'만 알면 보낼 수
 * 있다. 그래서 부모님 폰이 자기 토큰을 한 번 알려 주면(페어링) 그 뒤로는
 * 아이 기기가 직접 쏠 수 있다.
 *
 * 알아 둘 점
 *  - 리포트 내용이 Expo 서버를 한 번 지나간다. 앱에서 유일한 외부 통신이다.
 *  - Expo Go에서는 동작하지 않는다. EAS로 빌드한 앱이어야 토큰이 나온다.
 *  - 아이가 앱을 열어 학습을 마쳐야 전송된다. 기기가 꺼져 있으면 못 보낸다.
 *    그래서 부모 기기 쪽에서 "밤까지 리포트가 안 오면" 따로 알림을 띄운다.
 */

import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import {
  buildHelloBody,
  buildNudgeBody,
  buildPushBody,
  buildSettingsBody,
  EXPO_PUSH_ENDPOINT,
  type NudgePayload,
  pushFailureReason,
  type SettingsPayload,
  PushPayload,
} from './pairing';

// 순수 로직은 pairing.ts에 있다. 호출부가 한 곳만 보면 되도록 다시 내보낸다.
export {
  buildLinkUrl,
  buildNudgeBody,
  isValidPushToken,
  toShortCode,
  fromShortCode,
  shortCodeError,
  NUDGE_PRESETS,
  parseHello,
  parseNudge,
  parseSettings,
  pushFailureReason,
  LINK_SCHEME,
  parseIncoming,
  toPayload,
} from './pairing';
export type { HelloPayload, NudgePayload, PushPayload, SettingsPayload } from './pairing';

/**
 * 이 기기의 Expo 푸시 토큰을 발급받는다. 부모 기기에서만 쓴다.
 *
 * 실패하면 null과 함께 **왜 실패했는지**를 돌려준다. 예전에는 어떤 오류가
 * 나든 "Expo Go에서는 받을 수 없습니다"라고만 했다. EAS로 제대로 빌드한
 * 앱에서도 그 말이 나와서, 무엇이 잘못됐는지 알 길이 없었다. 실제로 그렇게
 * 한나절을 잃었다.
 *
 * 안드로이드에서 가장 흔한 원인은 **FCM 설정이 없는 것**이다. 구글이 안드로이드
 * 푸시를 FCM으로만 받게 해 두어서, 파이어베이스 설정 파일(google-services.json)
 * 과 EAS에 올린 열쇠가 둘 다 있어야 토큰이 나온다. 그 경우 원래 오류에
 * 'FCM' 또는 'FirebaseApp' 이 들어 있다.
 */
export async function fetchPushToken(): Promise<{ token: string | null; reason?: string }> {
  const perm = await Notifications.getPermissionsAsync();
  if (!perm.granted) {
    const asked = await Notifications.requestPermissionsAsync();
    if (!asked.granted) return { token: null, reason: '알림 권한이 필요합니다.' };
  }

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId ?? undefined;

  if (!projectId) {
    return {
      token: null,
      reason: '프로젝트 ID가 없습니다. 컴퓨터에서 `eas init`을 먼저 실행하고 앱을 다시 빌드해 주세요.',
    };
  }

  try {
    const res = await Notifications.getExpoPushTokenAsync({ projectId });
    return { token: res.data };
  } catch (e) {
    return { token: null, reason: pushFailureReason(e, Constants.appOwnership === 'expo') };
  }
}

export interface SendResult {
  ok: boolean;
  error?: string;
}

/**
 * 부모 기기로 리포트를 보낸다.
 *
 * 실패해도 학습 흐름을 막지 않는다. 아이 화면에 오류를 띄우지 않고
 * 결과만 돌려주며, 부모 모드에서 마지막 전송 상태를 확인할 수 있게 한다.
 */
export async function sendReportToParent(
  parentToken: string,
  payload: PushPayload,
): Promise<SendResult> {
  return sendPush(buildPushBody(parentToken, payload));
}

/** 아이 기기가 연결하면서 자기 주소를 부모에게 알린다. */
export async function sendHelloToParent(
  parentToken: string,
  childName: string,
  childToken: string,
): Promise<SendResult> {
  return sendPush(buildHelloBody(parentToken, { childName, childToken }));
}

/**
 * 부모가 아이 기기로 "공부하자"고 보낸다. 리포트와 반대 방향이다.
 */
export async function sendNudgeToChild(
  childToken: string,
  payload: NudgePayload,
): Promise<SendResult> {
  return sendPush(buildNudgeBody(childToken, payload));
}

/** 부모가 아이 기기의 공부할 과목을 바꾼다. */
export async function sendSettingsToChild(
  childToken: string,
  payload: SettingsPayload,
): Promise<SendResult> {
  return sendPush(buildSettingsBody(childToken, payload));
}

/** 실제 전송. 보내는 내용만 다르고 오류를 읽는 방법은 같다. */
async function sendPush(body: unknown): Promise<SendResult> {
  try {
    const res = await fetch(EXPO_PUSH_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return { ok: false, error: `전송 실패 (HTTP ${res.status})` };
    }

    const json = (await res.json()) as {
      data?: { status?: string; message?: string } | { status?: string; message?: string }[];
    };
    const ticket = Array.isArray(json.data) ? json.data[0] : json.data;

    if (ticket?.status === 'error') {
      // 부모가 앱을 지웠거나 토큰이 만료되면 여기로 온다.
      return { ok: false, error: ticket.message ?? '부모님 기기에 전달하지 못했습니다.' };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: '네트워크에 연결할 수 없습니다.' };
  }
}

/* ------------------------------------------------------------------ */
/* 부모 기기: 리포트가 안 왔을 때 알리기                                */
/* ------------------------------------------------------------------ */

const MISSING_ID = 'report-missing';

/**
 * 정해진 시각까지 리포트가 오지 않으면 뜨는 알림을 예약한다.
 *
 * 아이 기기가 꺼져 있으면 아무것도 오지 않는데, 그러면 부모님은
 * "안 한 건지, 앱이 고장 난 건지" 알 수 없다. 그래서 침묵 자체를
 * 알려 준다. 리포트가 도착하면 이 예약은 취소된다.
 */
export async function scheduleMissingReportAlert(args: {
  hour: number;
  minute: number;
  enabled: boolean;
  /** 오늘 이미 리포트를 받았으면 오늘 것은 건너뛰고 내일로 잡는다. */
  receivedToday: boolean;
  now?: Date;
}): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(MISSING_ID).catch(() => {});
  if (!args.enabled) return;

  const perm = await Notifications.getPermissionsAsync();
  if (!perm.granted) return;
  await ensureChannel();

  const now = args.now ?? new Date();
  const target = new Date(now);
  target.setHours(args.hour, args.minute, 0, 0);
  if (args.receivedToday || target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  await Notifications.scheduleNotificationAsync({
    identifier: MISSING_ID,
    content: {
      title: '📭 오늘 학습 리포트가 오지 않았어요',
      // 눌렀을 때 할 일을 적어 준다. 알림만 뜨고 끝나면 부모는 손으로
      // 앱을 열고 부모님 모드를 찾아 들어가야 한다.
      body: '여기를 눌러 아이에게 공부하자고 알려 줄 수 있어요.',
      data: { kind: 'missing-report' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: target,
      channelId: 'parent-report',
    },
  });
}

export async function cancelMissingReportAlert(): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(MISSING_ID).catch(() => {});
}

async function ensureChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('parent-report', {
    name: '학습 리포트',
    importance: Notifications.AndroidImportance.HIGH,
    vibrationPattern: [0, 200],
  });
}
