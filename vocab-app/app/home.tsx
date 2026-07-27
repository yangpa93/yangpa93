import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Body, Button, Card, Chip, H1, H2, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { buildSession } from '../src/srs/session';
import { levelProgress } from '../src/srs/progress';
import { buildDailyReport } from '../src/features/report';
import { scheduleDailyReport } from '../src/features/notifications';
import { loadProfileData } from '../src/store/storage';
import { LEVEL_LABEL, LEVEL_SHORT } from '../src/types';
import { todayKey } from '../src/lib/date';
import { colors, radius, spacing } from '../src/theme';

export default function Home() {
  const { state, profile, data } = useApp();

  const today = todayKey();
  const day = data.days[today];

  const progress = useMemo(
    () => (profile ? levelProgress(ALL_ENTRIES, data.cards, profile.level) : null),
    [profile, data.cards],
  );

  const session = useMemo(() => {
    if (!profile) return [];
    return buildSession({
      entries: entriesOf(profile.level),
      cards: data.cards,
      level: profile.level,
      goal: profile.settings.dailyGoal,
      reviewRatio: profile.settings.reviewRatio,
    });
  }, [profile, data.cards]);

  const reviewCount = session.filter((i) => i.mode === 'review').length;
  const newCount = session.filter((i) => i.mode === 'new').length;

  const doneToday = day?.studied ?? 0;
  const goal = profile?.settings.dailyGoal ?? 15;
  const finished = day?.completed ?? false;

  // 화면에 돌아올 때마다 부모 알림을 최신 상태로 다시 예약한다.
  // 로컬 알림이라 본문이 예약 시점에 굳기 때문.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      (async () => {
        const reports = await Promise.all(
          state.profiles.map(async (p) => {
            const d = p.id === state.activeProfileId ? data : await loadProfileData(p.id);
            return buildDailyReport(p, d, ALL_ENTRIES, today);
          }),
        );
        if (cancelled) return;
        await scheduleDailyReport({
          hour: state.parent.notifyHour,
          minute: state.parent.notifyMinute,
          enabled: state.parent.notifyEnabled,
          onlyWhenMissed: state.parent.notifyOnlyWhenMissed,
          reports,
        }).catch(() => {
          // 알림 권한이 없으면 조용히 넘어간다. 학습 자체를 막을 이유는 없다.
        });
      })();
      return () => {
        cancelled = true;
      };
    }, [state.profiles, state.parent, state.activeProfileId, data, today]),
  );

  // 레벨 시험 자격이 생기면 알려 준다. 시험은 아이가 눌러서 시작한다.
  // 자동으로 끌고 들어가면 준비 안 된 채로 보게 된다.

  if (!profile || !progress) return null;

  const myRewards = state.rewards.filter((r) => r.profileId === profile.id);
  const decided = myRewards.filter((r) => r.status === 'approved' || r.status === 'rejected');

  return (
    <Screen>
      <Row style={{ justifyContent: 'space-between', paddingTop: spacing.lg }}>
        <Pressable style={s.who} onPress={() => router.push('/profiles')} accessibilityRole="button">
          <Text style={{ fontSize: 30 }}>{profile.avatar}</Text>
          <View style={{ marginLeft: spacing.sm }}>
            <H3>{profile.name}</H3>
            <Muted>{LEVEL_LABEL[profile.level]} · 바꾸기</Muted>
          </View>
        </Pressable>
        <Pressable
          onPress={() => router.push('/parent')}
          style={s.parentBtn}
          accessibilityRole="button"
          accessibilityLabel="부모님 모드"
        >
          <Text style={s.parentBtnText}>👨‍👩‍👧 부모님</Text>
        </Pressable>
      </Row>

      {profile.streak > 0 ? (
        <Row style={{ marginTop: spacing.lg, gap: spacing.sm }}>
          <Chip label={`🔥 ${profile.streak}일 연속`} tone="accent" />
          {profile.bestStreak > profile.streak ? (
            <Chip label={`최고 ${profile.bestStreak}일`} tone="default" />
          ) : null}
        </Row>
      ) : null}

      {/* 오늘의 학습 */}
      <Card style={{ marginTop: spacing.lg }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H2>오늘의 학습</H2>
          <Text style={s.count}>
            {doneToday}
            <Text style={s.countTotal}> / {goal}</Text>
          </Text>
        </Row>

        <View style={{ marginTop: spacing.md }}>
          <ProgressBar value={goal === 0 ? 0 : doneToday / goal} />
        </View>

        <Row style={{ marginTop: spacing.md, gap: spacing.sm }}>
          <Chip label={`복습 ${reviewCount}개`} tone="primary" />
          <Chip label={`새 단어 ${newCount}개`} tone="accent" />
        </Row>

        <Muted style={{ marginTop: spacing.md }}>
          {reviewCount > 0
            ? `틀렸던 단어 ${reviewCount}개를 먼저 다시 봅니다.`
            : '오늘은 복습할 단어가 없어요. 새 단어로 시작해요!'}
        </Muted>

        {session.length === 0 ? (
          <Body style={{ marginTop: spacing.lg, color: colors.correct }}>
            이 레벨의 단어를 모두 익혔어요! 🎉
          </Body>
        ) : (
          <Button
            title={finished ? '한 번 더 공부하기' : '공부 시작하기'}
            onPress={() => router.push('/study')}
            variant={finished ? 'secondary' : 'primary'}
            style={{ marginTop: spacing.lg }}
          />
        )}
      </Card>

      {/* 레벨 진도 */}
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>{LEVEL_SHORT[profile.level]} 진도</H3>
          <Muted>
            {progress.mastered} / {progress.total}개 완전 암기
          </Muted>
        </Row>
        <View style={{ marginTop: spacing.md }}>
          <ProgressBar value={progress.ratio} color={colors.accent} />
        </View>
        <Muted style={{ marginTop: spacing.sm }}>
          {progress.canTakeExam
            ? '레벨 시험을 볼 수 있어요!'
            : `${progress.remaining}개 더 외우면 레벨 시험을 볼 수 있어요.`}
        </Muted>

        {progress.canTakeExam ? (
          <>
            <Button
              title={`🏆 ${LEVEL_SHORT[profile.level]} 레벨 시험 보기`}
              variant="secondary"
              onPress={() => router.push('/levelup')}
              style={{ marginTop: spacing.lg }}
            />
            <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
              {progress.total}개 단어를 모두 맞혀야 다음 학년으로 올라가요.
            </Muted>
          </>
        ) : null}
      </Card>

      {/* 바로가기 */}
      <Row style={{ marginTop: spacing.md, gap: spacing.md }}>
        <Pressable style={s.tile} onPress={() => router.push('/mistakes')} accessibilityRole="button">
          <Text style={s.tileIcon}>📕</Text>
          <H3>오답 노트</H3>
          <Muted>자주 틀린 단어</Muted>
        </Pressable>
        <Pressable style={s.tile} onPress={() => router.push('/wordbook')} accessibilityRole="button">
          <Text style={s.tileIcon}>📗</Text>
          <H3>단어장</H3>
          <Muted>레벨별 전체 목록</Muted>
        </Pressable>
      </Row>

      {/* 보상 결과 알림 */}
      {decided.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>🎁 보상 소식</H3>
          {decided.slice(0, 3).map((r) => (
            <View key={r.id} style={{ marginTop: spacing.md }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Body style={{ flex: 1, fontWeight: '700' }}>{r.wish}</Body>
                <Chip
                  label={r.status === 'approved' ? '승인됨' : '다음 기회에'}
                  tone={r.status === 'approved' ? 'correct' : 'wrong'}
                />
              </Row>
              {r.parentNote ? <Muted style={{ marginTop: spacing.xs }}>“{r.parentNote}”</Muted> : null}
            </View>
          ))}
        </Card>
      ) : null}

      {profile.pendingLevelUps.length > 0 ? (
        <Button
          title="🎁 보상 요청하러 가기"
          variant="secondary"
          onPress={() => router.push('/levelup')}
          style={{ marginTop: spacing.md }}
        />
      ) : null}
    </Screen>
  );
}

const s = StyleSheet.create({
  who: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  parentBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.parentSoft,
  },
  parentBtnText: { fontSize: 13, fontWeight: '700', color: colors.parent },
  count: { fontSize: 26, fontWeight: '800', color: colors.primary },
  countTotal: { fontSize: 16, fontWeight: '600', color: colors.muted },
  tile: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  tileIcon: { fontSize: 26, marginBottom: spacing.sm },
});
