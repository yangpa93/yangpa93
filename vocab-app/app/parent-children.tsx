import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, EmptyState, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { levelProgress } from '../src/srs/progress';
import { loadProfileData } from '../src/store/storage';
import { NudgeCard } from '../src/components/NudgeCard';
import { SubjectPicker } from '../src/components/SubjectPicker';
import { formatKo, todayKey } from '../src/lib/date';
import { LEVEL_SHORT, ProfileData } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 아이 목록.
 *
 * **한 화면에 모든 아이의 리포트를 늘어놓지 않는다.** 예전에는 그랬는데,
 * 아이가 둘만 되어도 화면이 끝없이 길어져서 정작 보고 싶은 아이의 숫자를
 * 찾으려면 한참 굴려야 했다. 여기서는 누가 오늘 했는지만 한 줄로 보이고,
 * 자세한 것은 그 아이를 눌러야 나온다.
 *
 * 아이는 두 곳에서 온다.
 *  · 이 폰에 있는 아이 프로필 — 같은 기기를 나눠 쓰는 집
 *  · QR 로 연결해 리포트를 보내 오는 다른 폰의 아이 — 각자 폰이 있는 집
 * 둘을 한 목록에 놓는다. 부모 입장에서는 똑같이 '내 아이'다.
 */
export default function ParentChildren() {
  const { state, data } = useApp();
  const today = todayKey();
  const [dataById, setDataById] = useState<Record<string, ProfileData>>({});

  const childProfiles = state.profiles.filter((p) => p.kind === 'child');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const out: Record<string, ProfileData> = {};
      for (const p of childProfiles) {
        out[p.id] = p.id === state.activeProfileId ? data : await loadProfileData(p.id);
      }
      if (!cancelled) setDataById(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [state.profiles, state.activeProfileId, data]);

  // 이 폰에 프로필이 있는 아이는 그쪽이 더 자세하다. 이름이 겹치면 뺀다.
  const localNames = new Set(childProfiles.map((p) => p.name));
  const remote = (state.knownChildren ?? []).filter((c) => !localNames.has(c.name));

  const pending = state.rewards.filter((r) => r.status === 'pending');

  if (childProfiles.length === 0 && remote.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="👧"
          title="아직 연결된 아이가 없어요"
          hint="아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 를 눌러 QR 을 띄우고, 이 폰으로 그 QR 을 찍어 주세요."
        />
        <Button
          title="📷 아이 QR 찍기"
          variant="parent"
          onPress={() => router.push({ pathname: '/scan', params: { as: 'parent' } })}
          style={{ marginTop: spacing.lg }}
        />
        <Button
          title="이 폰에 아이 프로필 만들기"
          variant="secondary"
          onPress={() => router.push('/onboarding')}
          style={{ marginTop: spacing.sm }}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      {pending.length > 0 ? (
        <Pressable onPress={() => router.push('/parent-rewards')} accessibilityRole="button">
          <Card
            style={{
              marginTop: spacing.md,
              backgroundColor: colors.accentSoft,
              borderColor: colors.accent,
            }}
          >
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>🎁 새 동기 부여 요청권 신청 {pending.length}건</H3>
              <Text style={{ color: '#B45309', fontWeight: '800' }}>확인 →</Text>
            </Row>
          </Card>
        </Pressable>
      ) : null}

      <Muted style={{ marginTop: spacing.md }}>
        아이를 누르면 그 아이의 학습 기록과 설정이 나옵니다. 하루 분량 · 과목 ·
        동기 부여 요청권 금액을 아이마다 다르게 정할 수 있어요.
      </Muted>

      {childProfiles.map((p) => {
        const pdata = dataById[p.id];
        const progress = pdata ? levelProgress(ALL_ENTRIES, pdata.cards, p.level) : null;
        const day = pdata?.days[today];
        return (
          <Pressable
            key={p.id}
            onPress={() => router.push({ pathname: '/child-report', params: { profileId: p.id } })}
            accessibilityRole="button"
          >
            <Card style={{ marginTop: spacing.md }}>
              <Row style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 34 }}>{p.avatar}</Text>
                <View style={{ marginLeft: spacing.md, flex: 1 }}>
                  <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={s.name}>{p.name}</Text>
                    <Chip
                      label={
                        day?.completed ? '오늘 다 했어요' : (day?.studied ?? 0) > 0 ? '오늘 하는 중' : '오늘 아직'
                      }
                      tone={day?.completed ? 'correct' : (day?.studied ?? 0) > 0 ? 'primary' : 'default'}
                    />
                  </Row>
                  <Muted>
                    {LEVEL_SHORT[p.level]} · 🔥 {p.streak}일 연속 ·{' '}
                    {day ? `오늘 ${day.studied}/${day.goal}개` : '오늘 기록 없음'}
                  </Muted>
                  {progress ? (
                    <View style={{ marginTop: spacing.sm }}>
                      <ProgressBar value={progress.ratio} height={6} color={colors.accent} />
                    </View>
                  ) : null}
                </View>
                <Text style={s.chev}>›</Text>
              </Row>
            </Card>
          </Pressable>
        );
      })}

      {/*
        다른 폰의 아이. 설정을 바꿀 수는 없다 — 그 아이의 기록은 그 폰 안에
        있고, 여기 있는 것은 보내 온 요약뿐이다. 무엇을 볼 수 있는지 적어 둔다.
      */}
      {remote.length > 0 ? (
        <View style={{ marginTop: spacing.xl }}>
          <H3>📲 다른 폰의 아이</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            보내 온 리포트만 볼 수 있어요. 설정은 그 아이 폰에서 바꿉니다.
          </Muted>
          {remote.map((c) => {
            const todayReport = state.receivedReports.find(
              (r) => r.childName === c.name && r.date === today,
            );
            const latest = state.receivedReports.find((r) => r.childName === c.name);
            return (
              <Card key={c.token} style={{ marginTop: spacing.md }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Body style={{ fontWeight: '800' }}>{c.name}</Body>
                  <Chip
                    label={todayReport ? (todayReport.completed ? '오늘 달성' : '오늘 하는 중') : '오늘 아직'}
                    tone={todayReport?.completed ? 'correct' : todayReport ? 'primary' : 'default'}
                  />
                </Row>
                <Muted style={{ marginTop: spacing.xs }}>
                  {todayReport
                    ? todayReport.headline
                    : latest
                      ? `마지막 소식: ${formatKo(latest.date)} · ${latest.headline}`
                      : '아직 받은 리포트가 없어요.'}
                </Muted>
              </Card>
            );
          })}
        </View>
      ) : null}

      {/* 다른 폰의 아이는 과목만 이쪽에서 바꿀 수 있다. */}
      <SubjectPicker />

      {/* 오늘 안 한 아이를 부르는 자리. 다른 폰의 아이에게만 보낼 수 있다. */}
      {remote.length > 0 ? <NudgeCard /> : null}

      <Button
        title="📷 아이 QR 더 찍기"
        variant="parent"
        onPress={() => router.push({ pathname: '/scan', params: { as: 'parent' } })}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  name: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  chev: { fontSize: 24, color: colors.muted, marginLeft: spacing.sm },
});
