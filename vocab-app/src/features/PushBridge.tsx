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
import { router } from 'expo-router';
import { useApp } from '../store/AppProvider';
import {
  parseHello,
  parseIncoming,
  parseNudge,
  parseSettings,
  scheduleMissingReportAlert,
} from './push';
import { todayKey } from '../lib/date';

export function PushBridge() {
  const { ready, state, addReceivedReport, rememberChild, updateSettings } = useApp();

  /**
   * 리포트를 받는 기기인가.
   *
   * 예전에는 `role === 'parent'` 로 판단했다. 그런데 역할은 **학습 화면을
   * 감출지**를 정하는 값이고, 리포트를 받는 것과는 다른 이야기다. 부모님도
   * 같이 공부하면서 아이 리포트를 받고 싶을 수 있는데, 하나로 묶여 있어서
   * 둘 중 하나를 포기해야 했다.
   *
   * 이제는 **자기 푸시 주소를 가진 기기**면 받는다. 주소를 만든 것 자체가
   * "나에게 보내 달라"는 뜻이다.
   */
  // 주소를 가졌는지로 판단하면 안 된다. 아이 기기도 자기 주소를 갖는다 —
  // 부모가 "공부하자"고 보낼 수 있어야 하기 때문이다. 받는 것은 사람이 켠
  // 것이므로 따로 적어 둔 값을 본다.
  const isParentDevice = state.receivesReports;

  // 알림이 도착했을 때 (앱이 떠 있든 백그라운드든)
  useEffect(() => {
    if (!isParentDevice) return;

    const handle = (payloadData: unknown) => {
      // 연결 인사 — 아이 기기가 자기 주소를 알려 온 것이다.
      const hello = parseHello(payloadData);
      if (hello) {
        rememberChild(hello.childName, hello.childToken);
        return;
      }

      const report = parseIncoming(payloadData);
      if (!report) return;
      addReceivedReport({
        childName: report.childName,
        date: report.date,
        headline: report.headline,
        detail: report.detail,
        completed: report.completed,
      });
      // 리포트에 실려 온 아이 기기 주소를 기억한다. 나중에 "공부하자"고
      // 되보낼 때 쓴다.
      if (report.childToken) rememberChild(report.childName, report.childToken);
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
  }, [isParentDevice, addReceivedReport, rememberChild]);

  /**
   * 아이 쪽 — 부모가 보낸 설정을 받아 적용한다.
   *
   * 알림을 **누르지 않아도** 적용해야 한다. 부모가 과목을 바꿨는데 아이가
   * 알림을 지나쳐 버리면 그대로 옛 설정으로 공부하게 된다.
   *
   * 리포트를 받는 기기인지와 무관하게 건다. 이건 아이 쪽 통로다.
   */
  useEffect(() => {
    if (!ready) return;

    const apply = (data: unknown) => {
      const s = parseSettings(data);
      if (!s) return;
      const active = state.activeProfileId;
      if (!active) return;
      updateSettings(active, { subjects: s.subjects });
    };

    const received = Notifications.addNotificationReceivedListener((n) =>
      apply(n.request.content.data),
    );
    const responded = Notifications.addNotificationResponseReceivedListener((r) =>
      apply(r.notification.request.content.data),
    );
    return () => {
      received.remove();
      responded.remove();
    };
  }, [ready, state.activeProfileId, updateSettings]);

  /**
   * 아이 쪽 — 부모가 보낸 "공부하자" 알림을 눌렀을 때.
   *
   * 알림 자체는 OS가 띄운다. 여기서는 **눌렀을 때 무엇을 할지**만 맡는다.
   * 알림을 누르고도 홈 화면에 머무르면 아이가 다시 '공부 시작하기'를 찾아야
   * 하는데, 그 한 번이 아이를 돌려세운다.
   *
   * 리포트를 받는 기기인지와 무관하게 건다. 부모가 같이 공부하는 폰이면
   * 양쪽 다 해당한다.
   */
  useEffect(() => {
    if (!ready) return;

    const open = (data: unknown) => {
      // 아이 쪽 — 부모가 부른 것. 바로 공부 화면으로.
      if (parseNudge(data)) {
        router.push('/study');
        return;
      }
      // 부모 쪽 — 리포트가 안 왔다는 알림. 부르는 화면으로 데려간다.
      // 알림만 뜨고 끝나면 앱을 열고 부모님 모드를 찾아 들어가야 한다.
      const d = data as { kind?: unknown } | null;
      if (d && typeof d === 'object' && d.kind === 'missing-report') {
        router.push('/parent-dashboard');
      }
    };

    const responded = Notifications.addNotificationResponseReceivedListener((r) =>
      open(r.notification.request.content.data),
    );
    return () => responded.remove();
  }, [ready]);

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
