import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { hasReports } from '../src/features/childReports';
import { formatKo, todayKey } from '../src/lib/date';
import { spacing } from '../src/theme';

/**
 * 아이들 학습 보고서 — **아이를 고르는 자리.**
 *
 * ── 왜 새로 만들었나 ────────────────────────────────────────
 *
 * 부모 홈의 「아이들 학습 보고서」 를 누르면 「아이별 설정」 화면이 나왔다.
 * 이름은 보고서인데 도착한 곳은 설정이고, 거기에는 학년·하루 분량·금액이
 * 늘어서 있었다. "학습 보고서에 들어가면 아이별 설정으로 들어갑니다" 라는
 * 말을 그대로 들었다.
 *
 * 보는 일과 고치는 일은 다른 일이다. 부모가 여기 들어오는 까닭은 대개
 * "어제 뭘 했나" 를 보려는 것이지 레벨을 바꾸려는 것이 아니다.
 *
 * ── 이 폰의 아이와 다른 폰의 아이를 함께 세운다 ─────────────
 *
 * 부모 입장에서 그 둘은 그냥 자기 아이다. 기록이 어디 있는지는 앱 사정이다.
 * 다만 다른 폰의 아이는 **보내 온 날만** 볼 수 있어서, 아직 아무것도 안 온
 * 아이는 그렇다고 적어 준다.
 */
export default function ParentReports() {
  const { state } = useApp();
  const today = todayKey();

  /** 이 폰에 프로필이 있는 아이. 기록이 이 폰 안에 있어 다 볼 수 있다. */
  const local = useMemo(
    () => state.profiles.filter((p) => p.kind === 'child'),
    [state.profiles],
  );

  /**
   * 다른 폰의 아이. 이 폰에 프로필이 없고 보내 온 리포트만 있다.
   *
   * 이름이 이 폰의 아이와 겹치면 뺀다 — 같은 아이를 두 줄로 세우면 어느
   * 쪽을 눌러야 할지 알 수 없다.
   */
  const remote = useMemo(
    () =>
      (state.knownChildren ?? []).filter((c) => !local.some((p) => p.name === c.name)),
    [state.knownChildren, local],
  );

  if (local.length === 0 && remote.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="👧"
          title="아직 연결된 아이가 없어요"
          hint="아이 폰의 QR 을 찍으면 여기에 나타납니다."
        />
        <Button
          title="📷 아이 QR 찍기"
          variant="parent"
          onPress={() => router.push('/scan')}
          style={{ marginTop: spacing.lg }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.lg }}>
        아이를 누르면 달력이 열립니다. 날짜를 누르면 그날 국어와 영어를 갈라
        보여 줘요 — 몇 개를 했는지, 정답률은 얼마인지, 무엇을 자주 틀렸는지.
      </Muted>

      {local.map((p) => {
        const day = state.receivedReports.find((r) => r.childName === p.name && r.date === today);
        return (
          <Button
            key={p.id}
            title={`${p.avatar} ${p.name} 학습 보고서 보기`}
            variant="secondary"
            style={{ marginTop: spacing.md }}
            onPress={() =>
              router.push({ pathname: '/calendar', params: { profileId: p.id } })
            }
          />
        );
      })}

      {remote.map((c) => {
        const latest = state.receivedReports.find((r) => r.childName === c.name);
        const todayReport = state.receivedReports.find(
          (r) => r.childName === c.name && r.date === today,
        );
        const any = hasReports(state.receivedReports, c.name);
        return (
          <Card key={c.token} style={{ marginTop: spacing.md }}>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <H3>{c.name}</H3>
              <Chip
                label={
                  todayReport
                    ? todayReport.completed
                      ? '오늘 다 했어요'
                      : '오늘 하는 중'
                    : '오늘 아직'
                }
                tone={todayReport?.completed ? 'correct' : todayReport ? 'primary' : 'default'}
              />
            </Row>

            <Muted style={{ marginTop: spacing.xs }}>
              {latest
                ? `마지막 소식 ${formatKo(latest.date)}`
                : '아직 받은 리포트가 없어요. 아이가 공부를 마치면 옵니다.'}
            </Muted>

            <Button
              title={`📅 ${c.name} 학습 보고서 보기`}
              variant="secondary"
              disabled={!any}
              style={{ marginTop: spacing.md }}
              onPress={() =>
                router.push({ pathname: '/calendar', params: { name: c.name } })
              }
            />
          </Card>
        );
      })}

      {/*
        **여기에는 부르기도 설정도 없다.**

        아이를 고르는 자리다. 부르기와 상 주기는 아이 하나를 고라 들어간
        보고서 안에 있다 — 셋을 한 화면에 달아 두면 누구에게 보내는지 매번
        다시 고르게 되고, 상은 그 아이 기록을 보면서 정하는 것이 맞다.

        설정으로 가는 길도 뻐다. ⚙️ 설정 → 아이들 기본 설정 하나면 된다.
      */}
    </Screen>
  );
}
