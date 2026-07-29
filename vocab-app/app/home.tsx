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
import { buildMonth, monthOf } from '../src/features/calendar';
import {
  availableAwards,
  awardRates,
  formatWon,
  levelUpAmount,
  perfectMonthProgress,
} from '../src/features/awards';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { scheduleDailyReport } from '../src/features/notifications';
import { loadProfileData } from '../src/store/storage';
import { LEVEL_LABEL, LEVEL_SHORT } from '../src/types';
import { lastNDays, todayKey } from '../src/lib/date';
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
      newPerDay: profile.settings.newPerDay,
      reviewPerDay: profile.settings.reviewPerDay,
    });
  }, [profile, data.cards]);

  const calendar = useMemo(() => buildMonth(data.days, monthOf(today), today), [data.days, today]);

  // 달력 카드에 붙는 최근 2주 미리 보기.
  const recent = useMemo(
    () =>
      lastNDays(14, today).map((date) => ({
        date,
        studied: data.days[date]?.studied ?? 0,
        completed: data.days[date]?.completed ?? false,
      })),
    [data.days, today],
  );

  // 다의어는 문항이 여럿이라 단어 수로 센다.
  const reviewCount = new Set(session.filter((i) => i.mode === 'review').map((i) => i.entry.id)).size;
  const newCount = new Set(session.filter((i) => i.mode === 'new').map((i) => i.entry.id)).size;

  const doneToday = day?.studied ?? 0;
  // 오늘 뽑힌 단어 수가 곧 오늘의 목표다.
  const plannedWords = new Set(session.map((i) => i.entry.id)).size;
  const goal = day?.goal ?? plannedWords;
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
  const rates = awardRates(state.parent.awards);
  const build = buildInfo();
  const awards = availableAwards(profile, data, today, rates);
  const perfect = perfectMonthProgress(data.days, today);
  // 지금 레벨을 끝내면 얼마인지. 중학교와 고등학교 금액이 다르다.
  const levelAward = levelUpAmount(profile.level, rates);
  const decided = myRewards.filter((r) => r.status !== 'pending');

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
        <Row style={{ gap: spacing.sm }}>
          {/*
            소리·진동·캐릭터는 아이가 직접 바꾸는 것이라 홈에 둔다.
            부모님 PIN 뒤에 있으면 소리를 끄고 싶을 때마다 부모를 불러야 해서
            아이가 그냥 참고 쓴다.
          */}
          <Pressable
            onPress={() => router.push('/settings')}
            style={s.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="내 설정"
          >
            <Text style={s.iconBtnText}>⚙️ 설정</Text>
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
      </Row>

      {/*
        빌드 칩은 늘 띄운다. 예전에는 베타일 때만 띄웠는데, 판이 올라가도
        "고친 게 안 보여요"는 그대로 생긴다. 그때 이 줄이 없으면 아이가
        어느 앱을 쓰는지 가릴 수가 없다.
      */}
      <Row style={{ marginTop: spacing.lg, gap: spacing.sm, flexWrap: 'wrap' }}>
        {profile.streak > 0 ? <Chip label={`🔥 ${profile.streak}일 연속`} tone="accent" /> : null}
        {profile.bestStreak > profile.streak ? (
          <Chip label={`최고 ${profile.bestStreak}일`} tone="default" />
        ) : null}
        <Chip label={`📱 ${buildLabel(build)}`} tone="default" />
      </Row>

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

      {/* 학습 달력 */}
      <Pressable onPress={() => router.push('/calendar')} accessibilityRole="button">
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <Row style={{ gap: spacing.sm }}>
              <Text style={{ fontSize: 22 }}>🗓️</Text>
              <H3>학습 달력</H3>
            </Row>
            <Text style={s.more}>보기 →</Text>
          </Row>
          <Muted style={{ marginTop: spacing.sm }}>
            {calendar.studiedDays > 0
              ? `${calendar.label}에 ${calendar.studiedDays}일 공부했고 단어 ${calendar.totalWords}개를 봤어요.`
              : `${calendar.label}은 아직 기록이 없어요. 오늘 공부하면 달력에 표시돼요.`}
          </Muted>

          {/* 최근 2주 미리 보기 */}
          <Row style={{ marginTop: spacing.md, gap: 4 }}>
            {recent.map((d) => (
              <View
                key={d.date}
                style={[
                  s.spark,
                  {
                    backgroundColor:
                      d.studied === 0
                        ? colors.border
                        : d.completed
                          ? colors.primary
                          : colors.primarySoft,
                  },
                ]}
              />
            ))}
          </Row>
        </Card>
      </Pressable>

      {/* 이번 달 개근 */}
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>🗓️ 이번 달 개근</H3>
          <Muted>
            {perfect.studied} / {perfect.elapsed}일
          </Muted>
        </Row>
        <View style={{ marginTop: spacing.md }}>
          <ProgressBar
            value={perfect.total === 0 ? 0 : perfect.studied / perfect.total}
            color={perfect.alive ? colors.correct : colors.border}
          />
        </View>
        <Muted style={{ marginTop: spacing.sm }}>
          {!perfect.alive
            ? '이번 달은 빠진 날이 있어요. 다음 달에 다시 도전해요!'
            : rates.perfectMonth > 0
              ? `한 달을 하루도 빠짐없이 하면 ${formatWon(rates.perfectMonth)} 요구권이 생겨요. ${perfect.total - perfect.elapsed}일 남았어요!`
              : `이번 달 개근까지 ${perfect.total - perfect.elapsed}일 남았어요!`}
        </Muted>
      </Card>

      {/* 보상 결과 알림 */}
      {decided.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>🎟️ 요구권 소식</H3>
          {decided.slice(0, 3).map((r) => (
            <View key={r.id} style={{ marginTop: spacing.md }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Body style={{ flex: 1, fontWeight: '800' }}>{formatWon(r.amount)}</Body>
                <Chip
                  label={
                    r.status === 'approved'
                      ? // 부모가 먼저 준 것은 아이가 신청한 적이 없다.
                        // '주기로 하셨어요'라고 하면 뭘 신청했는지 아이가 헷갈린다.
                        r.origin === 'parent'
                        ? '주셨어요'
                        : '주기로 하셨어요'
                      : r.status === 'fulfilled'
                        ? '받았어요'
                        : '다음 기회에'
                  }
                  tone={r.status === 'rejected' ? 'wrong' : 'correct'}
                />
              </Row>
              <Muted style={{ marginTop: 2 }}>{r.reason}</Muted>
              {r.parentNote ? <Muted style={{ marginTop: spacing.xs }}>“{r.parentNote}”</Muted> : null}
            </View>
          ))}
        </Card>
      ) : null}

      {/*
        요구권 자리는 **늘 보여준다.**

        예전에는 받을 것이 하나도 없으면 이 자리가 통째로 사라졌다. 그러면
        아이는 요구권이라는 것이 있는 줄도 모른 채 공부한다. 보상은 받을 때가
        아니라 **바라볼 때** 힘이 된다. 0장이어도 어떻게 하면 한 장이 생기는지,
        얼마인지를 적어 둔다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>🎟️ 내 요구권</H3>

        {awards.length > 0 ? (
          <>
            <Muted style={{ marginTop: spacing.sm }}>
              {awards.length}장이 생겼어요. 신청하면 부모님이 확인하세요.
            </Muted>
            <Button
              title={`🎟️ 요구권 ${awards.length}장 신청하기 (${formatWon(
                awards.reduce((n, a) => n + a.amount, 0),
              )})`}
              variant="secondary"
              onPress={() => router.push('/levelup')}
              style={{ marginTop: spacing.md }}
            />
          </>
        ) : (
          <>
            <Muted style={{ marginTop: spacing.sm }}>
              아직 받을 요구권이 없어요. 이렇게 하면 한 장씩 생겨요.
            </Muted>
            <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Body style={{ flex: 1 }}>
                  🏅 레벨 시험 통과 —{' '}
                  {progress.canTakeExam
                    ? '지금 볼 수 있어요!'
                    : `${progress.remaining}개 더 외우면 볼 수 있어요`}
                </Body>
                <Body style={{ fontWeight: '800' }}>{formatWon(levelAward)}</Body>
              </Row>
              <Row style={{ justifyContent: 'space-between' }}>
                <Body style={{ flex: 1 }}>
                  🗓️ 한 달 개근 —{' '}
                  {!perfect.alive
                    ? '다음 달에 다시 도전해요'
                    : `${perfect.total - perfect.elapsed}일 남았어요`}
                </Body>
                <Body style={{ fontWeight: '800' }}>{formatWon(rates.perfectMonth)}</Body>
              </Row>
            </View>
          </>
        )}
      </Card>
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
  iconBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  iconBtnText: { fontSize: 13, fontWeight: '700', color: colors.primary },
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
  more: { fontSize: 13, fontWeight: '700', color: colors.primary },
  spark: { flex: 1, height: 10, borderRadius: 3 },
});
