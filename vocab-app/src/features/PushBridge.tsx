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
  parseLinkBack,
  parseNudge,
  parseRewardAsk,
  parseRewardDecision,
  parseSettings,
  scheduleMissingReportAlert,
} from './push';
import { todayKey } from '../lib/date';

export function PushBridge() {
  const {
    ready,
    state,
    addReceivedReport,
    addChildReward,
    applyRewardDecision,
    rememberChild,
    updateSettings,
    updateProfile,
    linkParent,
  } = useApp();

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

      /*
       * 아이가 「오늘 다 했어요, 500원 주세요」 를 눌러 보낸 것.
       *
       * **예전에는 이것을 받아 두지 않았다.** 알림만 뜨고 사라져서, 부모가
       * 나중에 승인하려고 보상 화면에 들어가면 아무것도 없었다. 아이 쪽에는
       * 「부모님 확인 기다리는 중」 이라고 떠 있는데 부모 폰에는 그 요청이
       * 아예 없는, 서로 다른 말을 하는 상태였다.
       */
      const ask = parseRewardAsk(payloadData);
      if (ask) {
        addChildReward(ask);
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
        // 날짜별 보고서를 그릴 알맹이. 옛 판 아이 폰에서는 안 온다.
        ...(report.bySubject ? { bySubject: report.bySubject } : {}),
        ...(report.wrongIds ? { wrongIds: report.wrongIds } : {}),
        ...(typeof report.studied === 'number' ? { studied: report.studied } : {}),
        ...(typeof report.goal === 'number' ? { goal: report.goal } : {}),
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
  }, [isParentDevice, addReceivedReport, addChildReward, rememberChild]);

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
      /*
       * 부모가 아이 QR 을 찍고 자기 주소를 되보낸 것.
       *
       * 알림을 **누르지 않아도** 받아 둔다. 아이가 알림을 지나쳐 버리면
       * 연결이 반만 된 채로 남고, 그러면 리포트가 영영 안 간다.
       * **이미 다른 폰에 연결돼 있어도 덮지 않는다.** 엄마 폰과 아빠 폰이
       * 나란히 남고 리포트는 둘 다 받는다. 예전에는 나중 것이 앞의 것을
       * 밀어냈고, 밀려난 폰에는 아무 표시도 안 났다.
       */
      const back = parseLinkBack(data);
      if (back) {
        linkParent({
          token: back.parentToken,
          label: back.parentLabel,
          linkedAt: Date.now(),
          lastSentDate: null,
          isPrimary: false,
        });
        return;
      }

      /*
       * 부모가 승인·보류한 결과.
       *
       * **누르지 않아도 적용한다.** 아이가 알림을 지나치면 저금통에 안 쌓인
       * 채로 남고, 아이는 부모가 승인했는지 아닌지 알 길이 없다.
       */
      const decision = parseRewardDecision(data);
      if (decision) {
        applyRewardDecision(decision);
        return;
      }

      const s = parseSettings(data);
      if (!s) return;
      const active = state.activeProfileId;
      if (!active) return;
      /*
       * 갈래와 하루 분량. **보내 온 것만 바꾼다.**
       *
       * 부모가 분량을 안 건드렸으면 안 실려 오고, 그때는 아이가 제 폰에서
       * 골라 둔 숫자가 그대로 남는다. 통째로 덮으면 부모 화면에 우연히 떠
       * 있던 기본값이 아이 것을 밀어낸다.
       */
      updateSettings(active, {
        subjects: s.subjects,
        ...(s.newPerDay ? { newPerDay: s.newPerDay } : {}),
        ...(s.koNewPerDay ? { koNewPerDay: s.koNewPerDay } : {}),
      });

      /*
       * 레벨과 요청권 금액도 부모가 고쳐 보낼 수 있다.
       *
       * 이 값들은 아이 폰 안에만 있어서, 부모 폰에 그 아이 프로필이 없으면
       * (제 폰을 쓰는 아이) 고칠 길이 아예 없었다. 부모가 "중3-1 로 올려
       * 줘야겠다" 고 생각해도 아이 폰을 걷어 와야 했다.
       *
       * **보내 온 것만 바꾼다.** 부모가 안 건드린 값은 안 실려 오고, 그때는
       * 아이가 제 폰에서 골라 둔 것이 그대로 남는다.
       */
      const patch: Parameters<typeof updateProfile>[1] = {};
      if (s.level) patch.level = s.level as never;
      if (s.koLevel) patch.koLevel = s.koLevel as never;
      if (s.rates) patch.awards = s.rates as never;
      if (Object.keys(patch).length > 0) updateProfile(active, patch);
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
  }, [ready, state.activeProfileId, updateSettings, updateProfile, linkParent, applyRewardDecision]);

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
