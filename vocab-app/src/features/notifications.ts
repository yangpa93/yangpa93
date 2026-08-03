/**
 * 부모용 로컬 알림.
 *
 * 서버 없이 동작해야 해서 기기 로컬 알림을 쓴다. 매일 정해진 시각에
 * "오늘 학습했는지 / 뭘 틀렸는지"를 요약해 띄운다.
 *
 * 로컬 알림이라 알림 본문은 예약 시점의 상태로 굳는다. 그래서
 * 앱이 열릴 때마다(=상태가 바뀔 만한 시점마다) 다시 예약해 준다.
 * 나중에 진짜 부모 기기로 보내려면 이 모듈만 서버 푸시로 갈아끼우면 된다.
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { DailyReport, reportHeadline } from './report';

export const DAILY_ID_PREFIX = 'daily-report';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function ensurePermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  const asked = await Notifications.requestPermissionsAsync();
  return asked.granted;
}

/**
 * 알림 통로(채널) 목록. **안드로이드는 이것이 없으면 알림을 아예 안 띄운다.**
 *
 * ── 무엇 때문에 이 자리가 생겼나 ────────────────────────────
 *
 * Expo 푸시 서버가 "전송에 성공했습니다" 라고 하는데 폰에는 아무것도 안 떴다.
 * 방해 금지도 꺼져 있었다. 서버는 구글에 넘겼고 구글은 받았는데, **폰이
 * 받아 놓고 안 보여준 것**이다.
 *
 * 안드로이드 8부터 모든 알림은 통로 하나에 속해야 하고, **없는 통로로 온
 * 알림은 조용히 버려진다.** 오류도 안 나고 영수증도 성공이라 밖에서는 알
 * 방법이 없다. 가장 나쁜 모양의 실패다.
 *
 * 그런데 우리 통로는 이렇게 만들어지고 있었다.
 *
 *   parent-report  리포트 알림을 켜 두고 예약이 실제로 걸릴 때만
 *   child-nudge    **아무 데서도 안 만들어졌다**
 *
 * child-nudge 는 부모가 아이에게 보내는 것 전부가 쓰는 통로다 — 연결하고
 * 되보내는 인사, 공부하자, 과목 바꾸기. 그러니 부모가 아이 QR 을 찍어도
 * 아이 폰에는 아무 일도 안 일어났다. 연결이 반만 되는 또 하나의 까닭이었다.
 *
 * ── 그래서 앱이 뜰 때 무조건 다 만든다 ──────────────────────
 *
 * 통로를 만드는 것은 값이 거의 안 든다. 반면 **필요한 순간에 없으면 알림이
 * 조용히 사라진다.** 늦게 만들 이유가 하나도 없다.
 *
 * 한곳에 모아 둔 이유도 있다. 예전에는 두 파일이 같은 통로를 서로 다른
 * 중요도로 만들고 있었다(DEFAULT / HIGH). 안드로이드는 한 번 만든 통로의
 * 중요도를 코드로 못 바꾸므로, **먼저 만든 쪽이 이기고 나중 것은 조용히
 * 무시된다.** 어느 쪽이 이길지는 그날 무엇을 먼저 눌렀느냐로 갈렸다.
 */
export const NOTIFICATION_CHANNELS = [
  {
    id: 'parent-report',
    name: '학습 리포트',
    /** 아이가 공부를 마쳤다는 소식. 기다리던 것이라 위로 떠야 한다. */
    high: true,
  },
  {
    id: 'child-nudge',
    name: '부모님이 보내는 알림',
    /** 연결 인사·공부하자·과목 바꾸기. 놓치면 연결이 반만 된 채로 남는다. */
    high: true,
  },
] as const;

/** 통로를 전부 만든다. 여러 번 불러도 괜찮다 — 같은 값이면 아무 일도 안 한다. */
export async function ensureNotificationChannels(): Promise<void> {
  if (Platform.OS !== 'android') return;
  for (const c of NOTIFICATION_CHANNELS) {
    await Notifications.setNotificationChannelAsync(c.id, {
      name: c.name,
      importance: c.high
        ? Notifications.AndroidImportance.HIGH
        : Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 200],
    }).catch(() => {
      // 못 만들어도 앱을 막지 않는다. 여기서 멈추면 공부 자체를 못 한다.
    });
  }
}

/**
 * 매일 같은 시각에 뜨는 리포트 알림을 다시 예약한다.
 * 기존 예약은 지우고 새로 건다.
 */
export async function scheduleDailyReport(args: {
  hour: number;
  minute: number;
  enabled: boolean;
  onlyWhenMissed: boolean;
  reports: DailyReport[];
}): Promise<void> {
  await cancelDailyReports();
  if (!args.enabled || args.reports.length === 0) return;

  const granted = await ensurePermission();
  if (!granted) return;
  await ensureNotificationChannels();

  const shown = args.onlyWhenMissed ? args.reports.filter((r) => !r.completed) : args.reports;
  if (shown.length === 0) return;

  const body = shown.map(reportHeadline).join('\n');

  await Notifications.scheduleNotificationAsync({
    identifier: `${DAILY_ID_PREFIX}-all`,
    content: {
      title: '📚 오늘의 영단어 학습 리포트',
      body,
      data: { route: '/parent/dashboard' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: args.hour,
      minute: args.minute,
      channelId: 'parent-report',
    },
  });
}

export async function cancelDailyReports(): Promise<void> {
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  await Promise.all(
    scheduled
      .filter((n) => n.identifier.startsWith(DAILY_ID_PREFIX))
      .map((n) => Notifications.cancelScheduledNotificationAsync(n.identifier)),
  );
}

/** 보상 요청처럼 지금 바로 알려야 하는 일. */
export async function notifyNow(title: string, body: string): Promise<void> {
  const granted = await ensurePermission();
  if (!granted) return;
  await ensureNotificationChannels();
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data: { route: '/parent/rewards' } },
    trigger: null,
  });
}
