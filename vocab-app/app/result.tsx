import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Card, Chip, CONTENT_MAX_WIDTH, H1, H3, Muted, ProgressBar, Row } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { meaningLine } from '../src/data/entry';
import { levelProgress } from '../src/srs/progress';
import { todayKey } from '../src/lib/date';
import { colors, radius, spacing } from '../src/theme';

export default function Result() {
  const { profile, data } = useApp();
  const params = useLocalSearchParams<{
    correct?: string;
    wrong?: string;
    studied?: string;
    seconds?: string;
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
  const progress = useMemo(
    () => (profile ? levelProgress(ALL_ENTRIES, data.cards, profile.level) : null),
    [profile, data.cards],
  );

  // 방금 세션에서 틀린 단어를 보여준다.
  const missed = useMemo(() => {
    const ids = new Set(day?.wrongEntryIds ?? []);
    return ALL_ENTRIES.filter((e) => ids.has(e.id)).slice(0, 6);
  }, [day?.wrongEntryIds]);

  if (!profile || !progress) return null;

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
              : `오늘 ${day?.studied ?? 0} / ${day?.goal ?? profile.settings.dailyGoal}개 학습했어요.`}
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

        {missed.length > 0 ? (
          <Card style={{ marginTop: spacing.md }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>오늘 틀린 단어</H3>
              <Chip label="내일 또 나와요" tone="wrong" />
            </Row>
            {missed.map((e) => (
              <Row key={e.id} style={{ marginTop: spacing.md, alignItems: 'flex-start' }}>
                <Body style={{ fontWeight: '700', width: 120 }}>{e.word}</Body>
                <Muted style={{ flex: 1 }}>{meaningLine(e)}</Muted>
              </Row>
            ))}
          </Card>
        ) : null}

        <View style={{ flex: 1 }} />

        <Button title="홈으로" onPress={() => router.replace('/home')} style={{ marginTop: spacing.lg }} />
        {progress.canTakeExam ? (
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
