import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Card, Chip, CONTENT_MAX_WIDTH, H1, H3, Muted, ProgressBar, Row } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { DAILY_ENTRIES } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { meaningLine } from '../src/data/entry';
import { sessionMissed } from '../src/features/studiedWords';
import { levelProgress } from '../src/srs/progress';
import { todayKey } from '../src/lib/date';
import { colors, radius, spacing } from '../src/theme';

/* 찾아보기 표는 앱이 뜰 때 한 번만 만든다. 오답 몇 개를 찾자고 5,400여 개를
 * 매번 훑으면 판을 끝낼 때마다 멈칫한다. 오답 노트도 같은 방식이다. */
const EN_BY_ID = new Map(ALL_ENTRIES.map((e) => [e.id, e]));
const DAILY_BY_ID = new Map(DAILY_ENTRIES.map((e) => [e.id, e]));
const KO_BY_ID = new Map(KO_ENTRIES.map((e) => [e.id, e]));

export default function Result() {
  const { profile, data } = useApp();
  const params = useLocalSearchParams<{
    correct?: string;
    wrong?: string;
    studied?: string;
    seconds?: string;
    wrongIds?: string;
  }>();

  const correct = Number(params.correct ?? 0);
  const wrong = Number(params.wrong ?? 0);
  const studied = Number(params.studied ?? 0);
  const seconds = Number(params.seconds ?? 0);
  const total = correct + wrong;
  const accuracy = total === 0 ? 0 : correct / total;

  const scale = useRef(new Animated.Value(0.6)).current;
  useEffect(() => {
    Animated.spring(scale, { toValue: 1, friction: 5, tension: 90, useNativeDriver: true }).start();
  }, [scale]);

  const day = data.days[todayKey()];
  /**
   * 레벨 진도는 아이에게만 뜻이 있다.
   *
   * 부모는 학년을 올라가는 것이 아니라 고른 갈래를 도는 것이라, 아이들
   * 어휘 3,285개에 대고 재면 늘 0에 가깝게 나와 아무 말도 안 해 준다.
   */
  const progress = useMemo(
    () =>
      profile && profile.kind === 'child'
        ? levelProgress(ALL_ENTRIES, data.cards, profile.level)
        : null,
    [profile, data.cards],
  );

  /**
   * 방금 판에서 틀린 것. **study 가 넘겨준 id 만 본다.**
   *
   * 두 가지가 어긋나 있었다. 하나는 하루 기록(`day.wrongEntryIds`)을 보던 것 —
   * 갈래를 따로 들어가 풀게 한 뒤로 하루에 판이 둘 이상이라, 국어를 끝냈는데
   * 아침에 영어에서 틀린 것이 올라왔다. 다른 하나는 **국어를 아예 안 찾던
   * 것** — 영어와 일상 문장 목록에서만 찾아서 국어 오답은 뜰 자리가 없었다.
   *
   * 찾는 규칙은 오답 노트와 같은 것(`sessionMissed` → `studiedWords`)을 쓴다.
   * 두 곳에 따로 적으면 한쪽만 고치게 되어 서로 다른 말을 하게 된다.
   */
  const missed = useMemo(
    () =>
      sessionMissed((params.wrongIds ?? '').split(',').filter(Boolean), {
        en: EN_BY_ID,
        daily: DAILY_BY_ID,
        ko: KO_BY_ID,
      }),
    [params.wrongIds],
  );

  if (!profile) return null;
  const homePath = profile.kind === 'parent' ? '/parent-home' : '/home';

  const goalMet = day?.completed ?? false;

  return (
    <SafeAreaView style={s.screen}>
      <View style={s.inner}>
        <Animated.View style={{ alignItems: 'center', transform: [{ scale }] }}>
          <Text style={s.emoji}>{goalMet ? '🎉' : '👏'}</Text>
          <H1 style={{ marginTop: spacing.md, textAlign: 'center' }}>
            {goalMet ? '오늘 목표 완료!' : '수고했어요!'}
          </H1>
          <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
            {goalMet
              ? `${profile.streak}일 연속으로 공부하고 있어요 🔥`
              : `오늘 ${day?.studied ?? 0} / ${day?.goal ?? profile.settings.newPerDay}개 학습했어요.`}
          </Muted>
        </Animated.View>

        <Card style={{ marginTop: spacing.xl }}>
          <Row style={{ justifyContent: 'space-around' }}>
            <Stat label="맞은 개수" value={String(correct)} color={colors.correct} />
            <Stat label="틀린 개수" value={String(wrong)} color={colors.wrong} />
            <Stat label="정답률" value={`${Math.round(accuracy * 100)}%`} color={colors.primary} />
          </Row>
          <Muted style={{ textAlign: 'center', marginTop: spacing.lg }}>
            단어 {studied}개 · {Math.max(1, Math.round(seconds / 60))}분 학습
          </Muted>
        </Card>

        {progress ? (
          <Card style={{ marginTop: spacing.md }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>레벨 진도</H3>
              <Muted>
                {progress.mastered} / {progress.total}
              </Muted>
            </Row>
            <View style={{ marginTop: spacing.md }}>
              <ProgressBar value={progress.ratio} color={colors.accent} />
            </View>
          </Card>
        ) : null}

        {missed.length > 0 ? (
          <Card style={{ marginTop: spacing.md }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>오늘 틀린 단어</H3>
              <Chip label="내일 또 나와요" tone="wrong" />
            </Row>
            {missed.map((w) => (
              <Row key={w.id} style={{ marginTop: spacing.md, alignItems: 'flex-start' }}>
                {/* e2e 가 여기 오른 낱말을 집어 본다 — 갈래가 섞이지 않았는지 센다. */}
                <Body testID="missed-word" style={{ fontWeight: '700', width: 120 }}>
                  {w.entry.word}
                </Body>
                {/* 국어는 뜻이 한 줄이고 영어는 뜻이 여럿이라 줄을 지어야 한다. */}
                <Muted style={{ flex: 1 }}>
                  {w.kind === 'ko' ? w.entry.meaning : meaningLine(w.entry)}
                </Muted>
              </Row>
            ))}
          </Card>
        ) : null}

        <View style={{ flex: 1 }} />

        <Button title="홈으로" onPress={() => router.replace(homePath)} style={{ marginTop: spacing.lg }} />
        {progress?.canTakeExam ? (
          <Button
            title="🏆 레벨 시험 보기"
            variant="secondary"
            onPress={() => router.replace('/levelup')}
            style={{ marginTop: spacing.sm }}
          />
        ) : null}
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={[s.statValue, { color }]}>{value}</Text>
      <Muted style={{ marginTop: spacing.xs }}>{label}</Muted>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  emoji: { fontSize: 64 },
  statValue: { fontSize: 30, fontWeight: '800' },
});
