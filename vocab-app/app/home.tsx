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
import { DAILY_ENTRIES, DAILY_LEVEL } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { canTakeKoExam } from '../src/srs/koExam';
import { buildChildQueue, pickChildToday } from '../src/srs/childSession';
import { levelProgress } from '../src/srs/progress';
import { buildDailyReport } from '../src/features/report';
import { buildMonth, monthOf } from '../src/features/calendar';
import {
  availableAwards,
  completedDays,
  EFFORT_DAYS,
  formatWon,
  levelUpAmount,
  purseOf,
  ratesOf,
} from '../src/features/awards';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { scheduleDailyReport } from '../src/features/notifications';
import { loadProfileData } from '../src/store/storage';
import {
  LEVEL_LABEL,
  LEVEL_SHORT,
  orderedSubjects,
  Subject,
  SUBJECT_LABEL,
  SUBJECT_ORDER,
} from '../src/types';
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
   * 일상 문장 진도. **여태 없던 카드다.**
   *
   * 영어와 국어에는 진도가 있는데 일상 문장에는 없었다. 세 갈래를 켠 아이가
   * 홈을 열면 진도가 둘만 보여서, 켠 것과 보이는 것이 어긋났다. 레벨이
   * 없는 갈래라 80문장 전체를 하나로 놓고 센다.
   */
  const dailyProgress = useMemo(() => {
    if (!profile || !profile.settings.subjects.includes('daily')) return null;
    return levelProgress(DAILY_ENTRIES, data.cards, DAILY_LEVEL);
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

  /**
   * 갈래마다 오늘 몇 개인지. 단추에 그대로 적는다.
   *
   * "영어 단어 학습하기 시작하기 (20개)" 처럼 보이려면 갈래별 수가 필요하다.
   * 합계만 보이면 어느 쪽이 얼마나 남았는지 알 수 없어서, 국어를 켠 아이는
   * 영어를 끝내고도 몇 개가 남았는지 모른 채 단추를 누르게 된다.
   */
  const perSubject = useMemo(() => {
    const out: Partial<Record<Subject, number>> = {};
    for (const sub of SUBJECT_ORDER) {
      out[sub] = new Set(session.filter((i) => i.subject === sub).map((i) => i.entryId)).size;
    }
    return out;
  }, [session]);

  /**
   * 갈래마다 **실제로 풀 문제 수.** 단추에 적는 숫자다.
   *
   * ── 왜 낱말 수가 아니라 문제 수인가 ─────────────────────────
   *
   * "영어 공부 시작하기에 18개로 나오는데 막상 시작하면 1/57 로 나옵니다"
   * 라는 말을 들었다. 둘 다 맞는 숫자였는데 **서로 다른 것을 세고 있었다** —
   * 단추는 낱말 18개(새 8 + 복습 10), 학습 화면은 문항 57개.
   *
   * 예고한 수와 들어가서 보는 수가 다르면 어느 쪽도 못 믿는다. 단추를 학습
   * 화면과 같은 단위로 맞춘다. 낱말 수는 바로 아래 진도 카드가 말한다.
   *
   * 세는 곳을 학습 화면과 **같은 함수**로 둔다(srs/childSession.ts). 따로
   * 세면 또 어긋난다 — 이미 한 번 그렇게 어긋났던 자리다.
   */
  const perSubjectQuestions = useMemo(() => {
    const out: Partial<Record<Subject, number>> = {};
    if (!profile) return out;
    const queue = buildChildQueue({ profile, cards: data.cards });
    for (const sub of SUBJECT_ORDER) {
      out[sub] = queue.filter((i) => i.track === sub).length;
    }
    return out;
  }, [profile, data.cards]);

  /**
   * 갈래마다 **새로 배울 것과 복습할 것을 갈라 센다.**
   *
   * "하루 10개로 해 뒀는데 60개가 나온다" 는 말을 들었다. 실제로는 낱말
   * 10개에 복습이 얹히고, 낱말 하나가 세 문항(재인·문맥·인출)으로 갈려
   * 문항이 그만큼 나온 것이었다. 그 셋이 화면에서 구분이 안 되니 고른 값과
   * 보이는 값이 아무 관계 없는 것처럼 읽힌다.
   *
   * 그래서 진도 카드마다 「새 5개 · 복습 7개」 로 갈라 적는다. 낱말 수다.
   */
  const perSubjectSplit = useMemo(() => {
    const uniq = (sub: Subject, mode: 'new' | 'review') =>
      new Set(
        session.filter((i) => i.subject === sub && i.mode === mode).map((i) => i.entryId),
      ).size;
    const out: Partial<Record<Subject, { fresh: number; review: number }>> = {};
    for (const sub of SUBJECT_ORDER) {
      out[sub] = { fresh: uniq(sub, 'new'), review: uniq(sub, 'review') };
    }
    return out;
  }, [session]);

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
  // 지난 신청 기록을 함께 넘긴다 — 하루치와 달 정산이 이것으로 중복을 가린다.
  const awards = availableAwards(profile, data, today, rates, myRewards);
  /*
   * 이번 달에 지금까지 모은 것. **아직 못 받는다** — 달이 바뀌어야 청구할 수
   * 있다. 그래도 적어 준다. 얼마가 쌓이고 있는지 안 보이면 매일 누르는 500원이
   * 어디로 가는지 알 수 없고, 그러면 누를 이유도 옅어진다.
   */
  const thisMonth = today.slice(0, 7);
  const thisMonthPurse = purseOf(myRewards, profile.id, thisMonth);
  const thisMonthDone = completedDays(data.days, thisMonth);
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

        {/*
          **무엇이 남았는지 적는다.**

          "아이들 폰에서 다 했는데도 완료로 뜨지를 않네요" 라는 말을 들었다.
          규칙은 맞게 돌고 있었다 — 켠 갈래를 **전부** 끝내야 하루가 끝난 것으로
          치는데, 셋을 켜 놓고 둘만 한 상태였다.
          그런데 화면이 그 사정을 말해 주지 않았다. 아래에 단추가 하나 남아
          있는 것이 유일한 단서였고, 그건 눈에 안 들어온다.
        */}
        {(() => {
          const left = orderedSubjects(profile.settings).filter(
            (sub) => !(day?.doneSubjects ?? []).includes(sub),
          );
          if (left.length === 0) {
            return (
              <Muted style={{ marginTop: spacing.md, color: colors.correct }}>
                오늘 할 것을 다 마쳤어요! 🎉
              </Muted>
            );
          }
          return (
            <Muted style={{ marginTop: spacing.md }}>
              {left.map((sub) => SUBJECT_LABEL[sub]).join(' · ')}
              {left.length === orderedSubjects(profile.settings).length
                ? ' 이 남았어요.'
                : ' 만 남았어요.'}
              {reviewCount > 0 ? ` 틀렸던 낱말 ${reviewCount}개를 먼저 다시 봅니다.` : ''}
            </Muted>
          );
        })()}

        {session.length === 0 ? (
          <Body style={{ marginTop: spacing.lg, color: colors.correct }}>
            이 레벨의 단어를 모두 익혔어요! 🎉
          </Body>
        ) : (
          /*
           * **갈래마다 단추를 따로 둔다.**
           *
           * 예전에는 「공부 시작하기」 하나로 켠 갈래를 전부 이어서 풀게 했다.
           * 영어와 국어를 둘 다 켜면 한 판이 78문제가 되어 앉은자리에서 다
           * 해야 했고, 영어를 끝내고 쉬면 국어는 시작도 못 한 채 하루가 갔다.
           *
           * 이제 하나씩 들어가 푼다. 대신 **켠 갈래를 다 해야** 오늘 공부가
           * 끝난 것으로 친다(features/dayRecord.ts 의 isDayComplete).
           */
          <View style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            {orderedSubjects(profile.settings).map((sub) => {
              const left = perSubject[sub] ?? 0;
              const questions = perSubjectQuestions[sub] ?? 0;
              const done = (day?.doneSubjects ?? []).includes(sub);
              if (left === 0 && !done) return null;
              return (
                <Button
                  key={sub}
                  title={
                    done
                      ? `✅ ${SUBJECT_LABEL[sub]} 끝냈어요 — 한 번 더`
                      : `${SUBJECT_LABEL[sub]} 공부 시작하기 (${questions}문제)`
                  }
                  onPress={() => router.push({ pathname: '/study', params: { track: sub } })}
                  variant={done ? 'secondary' : 'primary'}
                />
              );
            })}
          </View>
        )}
      </Card>

      {/*
        영어 진도. **켠 아이에게만 보인다.**

        예전에는 영어를 꺼도 이 카드가 남아 있었고, 제목도 「중1-1 진도」 라
        무엇의 진도인지 적혀 있지 않았다. 국어 카드에는 「국어」 가 붙어
        있어서 더 헷갈렸다 — 갈래 이름 없는 쪽이 영어라는 것을 알아야 읽혔다.
      */}
      {profile.settings.subjects.includes('en') ? (
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>영어 {LEVEL_SHORT[profile.level]} 진도</H3>
          <Muted>
            {progress.mastered} / {progress.total}개 완전 암기
          </Muted>
        </Row>
        <View style={{ marginTop: spacing.md }}>
          <ProgressBar value={progress.ratio} color={colors.accent} />
        </View>
        <TodaySplit split={perSubjectSplit.en} seen={progress.seen} />
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
      ) : null}

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
          <TodaySplit split={perSubjectSplit.ko} seen={koProgress.seen} />
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
        일상 문장 진도. **레벨도 시험도 없는 갈래다.**

        영어·국어와 달리 학년이 없다. 자주 쓰는 문장 여든 개를 하나로 놓고,
        그중 몇 개를 외웠는지만 센다. 시험이 없으니 「몇 개 더 외우면」 도
        적을 것이 없어, 대신 남은 개수를 적는다.
      */}
      {dailyProgress ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>일상 문장 진도</H3>
            <Muted>
              {dailyProgress.mastered} / {dailyProgress.total}개 완전 암기
            </Muted>
          </Row>
          <View style={{ marginTop: spacing.md }}>
            <ProgressBar value={dailyProgress.ratio} color={colors.accent} />
          </View>
          <TodaySplit split={perSubjectSplit.daily} seen={dailyProgress.seen} />
          <Muted style={{ marginTop: spacing.sm }}>
            {dailyProgress.mastered >= dailyProgress.total
              ? '문장을 모두 외웠어요! 🎉'
              : `${dailyProgress.total - dailyProgress.mastered}개가 남았어요. 레벨 시험은 없어요.`}
          </Muted>
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
          <Muted>지난 날은 달력에서</Muted>
        </Pressable>
        <Pressable style={s.tile} onPress={() => router.push('/wordbook')} accessibilityRole="button">
          <Text style={s.tileIcon}>📗</Text>
          <H3>단어장</H3>
          <Muted>지난 날은 달력에서</Muted>
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

      {/*
        이번 달 저금통.

        **개근 진도를 걷어 낸 자리다.** 「9 / 15일」 옆에 「빠진 날이 있어요.
        다음 달에 다시 도전해요」 라고 적혀 있었는데, 그 말은 남은 보름을
        해 봐야 소용없다는 뜻으로 읽힌다. 실제로 그렇기도 했다 — 하루라도
        빠지면 그달 보상이 통째로 없었다.

        이제는 하루를 마칠 때마다 쌓이므로, 며칠을 빠졌든 오늘 하면 오늘치가
        늘어난다. 그래서 「남은 날」 이 아니라 **모인 것**을 적는다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>🐷 이번 달 저금통</H3>
          <Muted>{thisMonthDone}일 완료</Muted>
        </Row>
        <Text style={s.purse}>{formatWon(thisMonthPurse)}</Text>
        <Muted style={{ marginTop: spacing.sm }}>
          {thisMonthDone >= EFFORT_DAYS
            ? `이번 달 ${thisMonthDone}일이나 했어요! 스무닷새를 넘겼으니 부모님이 더 얹어 주실 수 있어요.`
            : `하루치를 마칠 때마다 ${formatWon(rates.dailyDone)}씩 쌓여요. ` +
              `${EFFORT_DAYS}일을 넘기면 부모님이 더 얹어 주실 수 있어요 (${EFFORT_DAYS - thisMonthDone}일 남음).`}
        </Muted>
        <Muted style={{ marginTop: spacing.xs }}>다음 달이 되면 모아서 받을 수 있어요.</Muted>
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

        {/*
          ── 받을 수 있는 것을 **늘 넷 다 보여준다** ─────────────────

          예전에는 받을 것이 있으면 단추 하나가 뜨고, 없으면 글 세 줄이 떴다.
          그래서 「개근과 레벨업 단추가 없다」 는 말을 들었다 — 그것은 글로만
          적혀 있었고, 눌러 볼 것으로 보이지 않았다.

          이제 넷을 늘 단추로 세운다. 조건을 채운 것은 켜지고, 아직인 것은
          **꺼진 채로 남아 무엇을 더 해야 하는지** 아래에 적는다. 보상은 받을
          때가 아니라 바라볼 때 힘이 된다.
        */}
        <View style={{ marginTop: spacing.md, gap: spacing.md }}>
          {/*
            **지난달치는 있을 때만, 그리고 맨 위에.**

            받을 것 중 가장 큰 금액이고, 달이 바뀌어야 한 번 생기는 것이라
            놓치면 한 달을 통째로 못 받는다. 다른 넷은 늘 자리에 있지만 이것은
            받을 것이 있을 때만 나타나므로, 나타난 날 눈에 먼저 들어와야 한다.

            (넷을 단추로 세우면서 이 자리를 통째로 빠뜨린 적이 있다. 화면만
            보면 멀쩡했고, e2e 가 「달이 바뀌면 모아 받는 단추가 뜬다」 에서
            잡았다.)
          */}
          {awards
            .filter((a) => a.kind === 'monthlyPurse')
            .map((a) => (
              <RewardRow
                key={a.month ?? 'purse'}
                title={`🗓️ ${Number((a.month ?? '').slice(5))}월에 모은 ${formatWon(a.amount)} 받기`}
                ready
                hint={
                  (a.effortSuggestion ?? 0) > 0
                    ? `${EFFORT_DAYS}일을 넘긴 달이에요! 부모님이 더 얹어 주실 수 있어요`
                    : '눌러서 부모님께 보내세요'
                }
              />
            ))}

          <RewardRow
            title={`📗 오늘 공부 다 했어요 — ${formatWon(rates.dailyDone)}`}
            ready={awards.some((a) => a.kind === 'dailyDone')}
            hint={
              awards.some((a) => a.kind === 'dailyDone')
                ? '눌러서 부모님께 보내세요'
                : finished
                  ? '오늘 것은 이미 받았어요'
                  : '켠 갈래를 다 풀면 받을 수 있어요'
            }
          />

          {/*
            25일 — 회원님이 「개근」 이라 부르신 자리다. 하루도 안 빠져야 하는
            옛 개근이 아니라, 스무닷새를 넘기면 부모님이 얹어 주실 수 있다는
            뜻이다. 한 번 빠졌다고 그달이 통째로 날아가지 않는다.
          */}
          <RewardRow
            title={`🗓️ 이번 달 ${EFFORT_DAYS}일 채우기`}
            ready={thisMonthDone >= EFFORT_DAYS}
            hint={
              thisMonthDone >= EFFORT_DAYS
                ? `${thisMonthDone}일 했어요! 다음 달에 모은 것을 받을 때 부모님이 얹어 주세요`
                : `${EFFORT_DAYS}일을 넘기면 부모님이 얹어 주실 수 있어요 · ${EFFORT_DAYS - thisMonthDone}일 남음`
            }
          />

          <RewardRow
            title={`🏅 영어 레벨 시험 — ${formatWon(levelAward)}`}
            ready={awards.some((a) => a.kind === 'levelup')}
            hint={
              awards.some((a) => a.kind === 'levelup')
                ? '통과했어요! 눌러서 부모님께 보내세요'
                : progress.canTakeExam
                  ? '지금 시험을 볼 수 있어요'
                  : `${progress.remaining}개 더 외우면 시험을 볼 수 있어요`
            }
          />

          {/* 국어를 안 켠 아이에게는 안 보인다. 할 수 없는 것을 걸어 두면 안 된다. */}
          {koProgress ? (
            <RewardRow
              title={`🏅 국어 레벨 시험 — ${formatWon(rates.koreanLevel)}`}
              ready={awards.some((a) => a.kind === 'koLevelup')}
              hint={
                awards.some((a) => a.kind === 'koLevelup')
                  ? '통과했어요! 눌러서 부모님께 보내세요'
                  : koProgress.allowed
                    ? '지금 시험을 볼 수 있어요'
                    : `${Math.max(0, koProgress.need - koProgress.mastered)}개 더 외우면 시험을 볼 수 있어요`
              }
            />
          ) : null}
        </View>
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

/**
 * 받을 수 있는 것 한 줄. **조건을 아직 못 채웠어도 보인다.**
 *
 * 채운 것만 보여 주면 아이는 무엇을 더 해야 받는지 모른 채 공부한다. 꺼진
 * 단추와 그 아래 한 줄이 「이만큼 더 하면 된다」 를 말해 준다 — 보상은 받을
 * 때가 아니라 바라볼 때 힘이 된다.
 */
/**
 * 진도 카드에 붙는 **오늘 몫** 한 줄.
 *
 * ── 왜 필요했나 ─────────────────────────────────────────────
 *
 * "공부 완료했는데 진도에 반영이 안 됩니다" 는 말을 들었다. 국어를 끝냈는데
 * 진도가 `0 / 66` 이었다.
 *
 * 진도 막대가 세는 것은 **완전 암기**다. 한 번 풀었다고 외운 것으로 치지
 * 않는다 — 그렇게 세면 하루 만에 진도가 다 차고 복습이 무의미해진다. 그래서
 * 오늘 푼 것은 그 숫자를 거의 안 움직인다. 규칙으로는 맞는데, 화면에 그
 * 사정이 하나도 안 적혀 있으니 **한 일이 사라진 것처럼 보인다.**
 *
 * 그래서 두 가지를 함께 적는다.
 *
 *   · 오늘 새로 5개 · 복습 7개   ← 오늘 할 몫. 고른 값과 이어진다
 *   · 만난 낱말 19개              ← 여태 한 번이라도 본 것. 완전 암기 전 단계
 *
 * 「10개로 해 뒀는데 60개」 라는 물음에도 이 줄이 답한다. 60은 문항 수이고
 * 여기 적히는 것은 낱말 수다.
 */
function TodaySplit({
  split,
  seen,
}: {
  split?: { fresh: number; review: number };
  /** 여태 한 번이라도 만난 낱말. 국어는 세는 곳이 달라 안 넘긴다. */
  seen?: number;
}) {
  if (!split) return null;
  const today =
    split.fresh + split.review === 0
      ? '오늘 몫은 다 했어요'
      : `오늘 새로 ${split.fresh}개 · 복습 ${split.review}개`;
  return (
    <Muted style={{ marginTop: spacing.sm }}>
      {today}
      {seen !== undefined ? ` · 여태 만난 낱말 ${seen}개` : ''}
    </Muted>
  );
}

function RewardRow({ title, hint, ready }: { title: string; hint: string; ready: boolean }) {
  return (
    <View>
      <Button
        title={title}
        variant={ready ? 'secondary' : 'ghost'}
        disabled={!ready}
        onPress={() => router.push('/levelup')}
      />
      <Muted style={{ marginTop: spacing.xs, textAlign: 'center' }}>{hint}</Muted>
    </View>
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
  /* 이번 달 저금통에 쌓인 금액. 아이가 한눈에 보라고 크게 적는다. */
  purse: { fontSize: 30, fontWeight: '800', color: colors.text, marginTop: spacing.md },
});
