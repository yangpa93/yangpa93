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

async function ensureChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('parent-report', {
    name: '학습 리포트',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 200],
  });
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
  await ensureChannel();

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
  await ensureChannel();
  await Notifications.scheduleNotificationAsync({
    content: { title, body, data: { route: '/parent/rewards' } },
    trigger: null,
  });
}
