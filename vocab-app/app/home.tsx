import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Redirect, router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Body, Button, Card, Chip, H1, H2, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { WelcomeHome } from '../src/components/WelcomeHome';
import { useApp } from '../src/store/AppProvider';
import { NewWordsCard } from '../src/components/NewWordsCard';
import { VersionButton } from '../src/components/VersionButton';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { canTakeKoExam } from '../src/srs/koExam';
import { pickChildToday } from '../src/srs/childSession';
import { levelProgress } from '../src/srs/progress';
import { buildDailyReport } from '../src/features/report';
import { buildMonth, monthOf } from '../src/features/calendar';
import {
  availableAwards,
  formatWon,
  levelUpAmount,
  perfectMonthProgress,
  ratesOf,
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

  /**
   * 국어 진도. 국어를 켠 아이에게만 보여준다.
   *
   * 영어와 따로 센다 — 레벨도 따로 올라가고 시험도 따로 본다.
   */
  const koProgress = useMemo(() => {
    if (!profile || !profile.settings.subjects.includes('ko')) return null;
    return canTakeKoExam(KO_ENTRIES, data.cards, profile.koLevel);
  }, [profile, data.cards]);

  /**
   * 오늘 뽑힌 것들. **켠 갈래를 전부 센다.**
   *
   * 예전에는 여기서 영어만 따로 한 번 더 뽑아 셌다. 영어만 켠 아이에게는
   * 우연히 맞았지만, 국어만 켠 아이에게는 '오늘 N개' 가 실제로 풀 것과 아무
   * 상관이 없었다. 아이가 자기 폰에서 과목을 끌 수 있게 되면서 그 어긋남이
   * 흔해진다. 세는 규칙을 학습 화면과 같은 곳(srs/childSession.ts)에서 읽는다.
   */
  const session = useMemo(
    () => (profile ? pickChildToday({ profile, cards: data.cards }) : []),
    [profile, data.cards],
  );

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
  const reviewCount = new Set(session.filter((i) => i.mode === 'review').map((i) => i.entryId)).size;
  const newCount = new Set(session.filter((i) => i.mode === 'new').map((i) => i.entryId)).size;

  const doneToday = day?.studied ?? 0;
  // 오늘 뽑힌 단어 수가 곧 오늘의 목표다.
  const plannedWords = new Set(session.map((i) => i.entryId)).size;
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

  // 아이가 아직 없으면 시작 화면을 띄운다. 부모님 설정은 거기서도 들어간다.
  if (!profile) return <WelcomeHome />;
  // 부모 프로필로 여기 들어오면(뒤로 가기 등) 자기 것이 아닌 화면을 보게 된다.
  if (profile.kind === 'parent') return <Redirect href="/parent-home" />;
  if (!progress) return null;

  const myRewards = state.rewards.filter((r) => r.profileId === profile.id);
  // 금액표는 아이마다 다를 수 있다. 안 정한 아이는 기기 기본값을 쓴다.
  const rates = ratesOf(profile, state.parent.awards);
  const build = buildInfo();
  const awards = availableAwards(profile, data, today, rates);
  const perfect = perfectMonthProgress(data.days, today);
  // 지금 레벨을 끝내면 얼마인지. 중학교와 고등학교 금액이 다르다.
  const levelAward = levelUpAmount(profile.level, rates);
  const decided = myRewards.filter((r) => r.status !== 'pending');

  return (
    <Screen>
      {/* 새 낱말이 왔으면 맨 위에서 한 번 말해 준다. 안 왔으면 아무것도 안 그린다. */}
      <NewWordsCard />

      <Row style={{ justifyContent: 'space-between', paddingTop: spacing.lg }}>
        <Pressable style={s.who} onPress={() => router.push('/profiles')} accessibilityRole="button">
          <Text style={{ fontSize: 30 }}>{profile.avatar}</Text>
          <View style={{ marginLeft: spacing.sm }}>
            <H3>{profile.name}</H3>
            <Muted>{LEVEL_LABEL[profile.level]} · 바꾸기</Muted>
          </View>
        </Pressable>
        {/*
          **아이 폰에는 부모님 버튼을 안 둔다.**

          예전에는 여기에 '👨‍👩‍👧 부모님' 이 나란히 있었다. 그런데 아이가 쓰는
          폰은 부모님 모드로 쓸 일이 없다. 쓰지도 않을 버튼이 홈 맨 위에 있으면
          아이는 그것을 눌러도 되는 것인지 매번 헷갈리고, 잘못 눌렀다가 PIN
          화면을 만나면 자기가 뭘 잘못했다고 여긴다.

          부모님 모드로 들어가는 길은 ⚙️ 설정 맨 아래로 옮겼다. 아주 없애면
          이 폰에 부모 프로필을 만들어 둔 집이 자기 화면으로 돌아갈 수 없다.

          남는 버튼 하나에는 **아이 이름을 적는다.** 그냥 '설정'이면 무엇에
          대한 설정인지 알 수 없고, 아이가 여럿인 집에서는 지금 누구 것을
          만지는지도 흐려진다.
        */}
        <Pressable
          onPress={() => router.push('/settings')}
          style={s.iconBtn}
          accessibilityRole="button"
          accessibilityLabel={`${profile.name} 설정`}
        >
          <Text style={s.iconBtnText}>⚙️ {profile.name} 설정</Text>
        </Pressable>
      </Row>

      {/*
        빌드 칩은 늘 띄운다. 예전에는 베타일 때만 띄웠는데, 판이 올라가도
        "고친 게 안 보여요"는 그대로 생긴다. 그때 이 줄이 없으면 아이가
        어느 앱을 쓰는지 가릴 수가 없다.

        **누르면 이 판에서 무엇이 바뀌었는지 나온다.** 번호만 적혀 있으면
        그것이 새 것인지 옛 것인지 아이는 알 수 없다.
      */}
      <Row style={{ marginTop: spacing.lg, gap: spacing.sm, flexWrap: 'wrap' }}>
        {profile.streak > 0 ? <Chip label={`🔥 ${profile.streak}일 연속`} tone="accent" /> : null}
        {profile.bestStreak > profile.streak ? (
          <Chip label={`최고 ${profile.bestStreak}일`} tone="default" />
        ) : null}
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

      {/* 국어 진도. 국어를 켠 아이에게만 보인다. */}
      {koProgress ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>국어 {LEVEL_SHORT[profile.koLevel]} 진도</H3>
            <Muted>
              {koProgress.mastered} / {koProgress.total}개 완전 암기
            </Muted>
          </Row>
          <View style={{ marginTop: spacing.md }}>
            <ProgressBar
              value={koProgress.total === 0 ? 0 : koProgress.mastered / koProgress.total}
              color={colors.accent}
            />
          </View>
          <Muted style={{ marginTop: spacing.sm }}>
            {koProgress.allowed
              ? '국어 레벨 시험을 볼 수 있어요!'
              : `${Math.max(0, koProgress.need - koProgress.mastered)}개 더 외우면 국어 레벨 시험을 볼 수 있어요.`}
          </Muted>

          {koProgress.allowed ? (
            <>
              <Button
                title={`🏆 국어 ${LEVEL_SHORT[profile.koLevel]} 시험 보기`}
                variant="secondary"
                onPress={() => router.push('/ko-exam')}
                style={{ marginTop: spacing.lg }}
              />
              <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
                {koProgress.total}개 낱말을 모두 맞혀야 다음 국어 레벨로 올라가요.
              </Muted>
            </>
          ) : null}
        </Card>
      ) : null}

      {/*
        아직 부모님과 안 이어졌으면 홈에서 한 번 짚어 준다.

        설정 안에만 두었더니 아이가 그 화면까지 들어가지 않아 연결이 미뤄졌다.
        부모님이 안 쓰기로 한 집에서는(linkWaived) 뜨지 않는다 — 못 한 일이
        남아 있는 것처럼 보이면 안 된다.
      */}
      {state.parentLinks.length === 0 && !profile.linkWaived ? (
        <Pressable onPress={() => router.push('/settings')} accessibilityRole="button">
          <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>👨‍👩‍👧 부모님과 연결하기</H3>
              <Text style={s.more}>보기 →</Text>
            </Row>
            <Muted style={{ marginTop: spacing.sm }}>
              내 QR 을 띄우고 부모님이 찍으면 끝이에요. 공부를 마칠 때마다 오늘 기록이
              부모님 폰으로 갑니다.
            </Muted>
          </Card>
        </Pressable>
      ) : null}

      {/*
        바로가기.

        **밑줄 설명을 고쳤다.** 두 화면 다 이제 '오늘' 부터 보여 주는데
        여기에는 '자주 틀린 단어' · '레벨별 전체 목록' 이라고 옛 설명이 그대로
        남아 있었다. 그래서 눌러 보지 않으면 오늘 것이 있는 줄을 모른다 —
        실제로 "아이 단어장에는 오늘 배운 것 버튼이 없다" 는 말을 들었다.
        화면은 이미 부모와 같은 것을 쓰고 있었고, 안내만 어긋나 있었다.
      */}
      <Row style={{ marginTop: spacing.md, gap: spacing.md }}>
        <Pressable style={s.tile} onPress={() => router.push('/mistakes')} accessibilityRole="button">
          <Text style={s.tileIcon}>📕</Text>
          <H3>오답 노트</H3>
          <Muted>오늘 틀린 것부터</Muted>
        </Pressable>
        <Pressable style={s.tile} onPress={() => router.push('/wordbook')} accessibilityRole="button">
          <Text style={s.tileIcon}>📗</Text>
          <H3>단어장</H3>
          <Muted>오늘 배운 것부터</Muted>
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
              ? `한 달을 하루도 빠짐없이 하면 ${formatWon(rates.perfectMonth)} 동기 부여 요청권이 생겨요. ${perfect.total - perfect.elapsed}일 남았어요!`
              : `이번 달 개근까지 ${perfect.total - perfect.elapsed}일 남았어요!`}
        </Muted>
      </Card>

      {/* 보상 결과 알림 */}
      {decided.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>🎟️ 동기 부여 요청권 소식</H3>
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
        동기 부여 요청권 자리는 **늘 보여준다.**

        예전에는 받을 것이 하나도 없으면 이 자리가 통째로 사라졌다. 그러면
        아이는 동기 부여 요청권이라는 것이 있는 줄도 모른 채 공부한다. 보상은 받을 때가
        아니라 **바라볼 때** 힘이 된다. 0장이어도 어떻게 하면 한 장이 생기는지,
        얼마인지를 적어 둔다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>🎟️ 내 동기 부여 요청권</H3>

        {awards.length > 0 ? (
          <>
            <Muted style={{ marginTop: spacing.sm }}>
              {awards.length}장이 생겼어요. 신청하면 부모님이 확인하세요.
            </Muted>
            <Button
              title={`🎟️ 동기 부여 요청권 ${awards.length}장 신청하기 (${formatWon(
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
              아직 받을 동기 부여 요청권이 없어요. 이렇게 하면 한 장씩 생겨요.
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

      {/*
        판 번호는 **맨 아래에 작게** 둔다.

        늘 보여야 하지만 화면에서 제일 중요한 것은 아니다. 위쪽 칩 줄에 두었을
        때는 `🔥 3일 연속` 과 나란히 서서 크기도 무게도 같아 보였는데, 그건
        장식이고 이건 눌러 들어가는 것이라 같은 자리에 있을 것이 아니었다.
      */}
      <VersionButton tone="primary" style={{ marginTop: spacing.xl }} />
    </Screen>
  );
}

const s = StyleSheet.create({
  who: { flexDirection: 'row', alignItems: 'center', flex: 1 },
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
