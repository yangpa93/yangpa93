/**
 * 푸시 수신 처리.
 *
 * 부모 기기에서만 의미가 있다. 아이 기기가 보낸 리포트 알림이 도착하면
 * 화면에 띄우는 것과 별개로 앱 안에도 쌓아 둔다. 알림을 지워 버려도
 * 부모 대시보드에서 지난 리포트를 볼 수 있어야 하기 때문이다.
 *
 * 리포트가 도착하면 "오늘 리포트가 오지 않았어요" 예약을 취소하고
 * 다음 날로 다시 잡는다.
 */

import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useApp } from '../store/AppProvider';
import { parseIncoming, scheduleMissingReportAlert } from './push';
import { todayKey } from '../lib/date';

export function PushBridge() {
  const { ready, state, addReceivedReport } = useApp();
  const isParentDevice = state.role === 'parent';

  // 알림이 도착했을 때 (앱이 떠 있든 백그라운드든)
  useEffect(() => {
    if (!isParentDevice) return;

    const handle = (payloadData: unknown) => {
      const report = parseIncoming(payloadData);
      if (!report) return;
      addReceivedReport({
        childName: report.childName,
        date: report.date,
        headline: report.headline,
        detail: report.detail,
        completed: report.completed,
      });
    };

    const received = Notifications.addNotificationReceivedListener((n) =>
      handle(n.request.content.data),
    );
    // 알림을 눌러서 앱이 열린 경우
    const responded = Notifications.addNotificationResponseReceivedListener((r) =>
      handle(r.notification.request.content.data),
    );

    return () => {
      received.remove();
      responded.remove();
    };
  }, [isParentDevice, addReceivedReport]);

  // 리포트가 안 왔을 때 알려 주는 예약을 최신 상태로 유지한다.
  useEffect(() => {
    if (!ready || !isParentDevice) return;
    const today = todayKey();
    const receivedToday = state.receivedReports.some((r) => r.date === today);

    void scheduleMissingReportAlert({
      hour: state.parent.notifyHour,
      minute: state.parent.notifyMinute,
      enabled: state.parent.notifyEnabled,
      receivedToday,
    }).catch(() => {
      // 권한이 없으면 조용히 넘어간다.
    });
  }, [
    ready,
    isParentDevice,
    state.receivedReports,
    state.parent.notifyHour,
    state.parent.notifyMinute,
    state.parent.notifyEnabled,
  ]);

  return null;
}
