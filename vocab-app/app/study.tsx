import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChoiceGame, ChoiceGameId } from '../src/games/ChoiceGame';
import { ClozeGame } from '../src/games/ClozeGame';
import { WordStoryCard } from '../src/components/WordStoryCard';
import { CONTENT_MAX_WIDTH, ProgressBar, Row } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { entriesOf } from '../src/data';
import { exposureCount, senseExposure } from '../src/data/entry';
import { buildRounds, buildSession, SessionItem } from '../src/srs/session';
import { tapCorrect, tapWrong, stopSpeaking } from '../src/lib/feedback';
import { GAME_LABEL, STAGE_LABEL } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/** 한 문제를 푼 뒤 보여줄 상태 */
interface Feedback {
  item: SessionItem;
  correct: boolean;
  exposureIndex: number;
}

export default function Study() {
  const { profile, data, recordAnswer, finishSession } = useApp();

  const startedAt = useRef(Date.now());
  const questionStartedAt = useRef(Date.now());

  // 세션은 화면에 들어온 순간 한 번만 만든다. 답을 맞힐 때마다 카드가
  // 바뀌는데 그때마다 다시 뽑으면 문제가 뒤섞인다.
  const [queue, setQueue] = useState<SessionItem[]>(() => {
    if (!profile) return [];
    const words = buildSession({
      entries: entriesOf(profile.level),
      cards: data.cards,
      level: profile.level,
      goal: profile.settings.dailyGoal,
      reviewRatio: profile.settings.reviewRatio,
    });
    return buildRounds(words, profile.settings.rounds);
  });

  const [index, setIndex] = useState(0);
  /** 문제 전에 보여주는 단어 카드를 아직 안 넘겼는지 */
  const [introShown, setIntroShown] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  /** 이번 세션에서 실제로 다룬 단어 (중복 제외) */
  const studiedIds = useRef(new Set<string>());
  /** 틀려서 뒤에 다시 넣은 단어. 무한 반복을 막으려고 한 번만 재출제한다. */
  const requeued = useRef(new Set<string>());

  const pool = useMemo(() => (profile ? entriesOf(profile.level) : []), [profile]);

  const current = queue[index];

  const onAnswer = useCallback(
    (correct: boolean) => {
      if (!current || !profile) return;

      const exposureIndex = exposureCount(data.cards[current.entry.id]) + current.round;

      recordAnswer({
        entryId: current.entry.id,
        game: current.game,
        correct,
        ms: Date.now() - questionStartedAt.current,
        at: Date.now(),
      });

      studiedIds.current.add(current.entry.id);
      setStats((prev) => ({
        correct: prev.correct + (correct ? 1 : 0),
        wrong: prev.wrong + (correct ? 0 : 1),
      }));

      if (correct) {
        tapCorrect(profile.settings.hapticsEnabled);
      } else {
        tapWrong(profile.settings.hapticsEnabled);
        // 마지막 라운드에서 틀린 단어는 세션 끝에 한 번 더 만난다.
        const isLastRound = current.round >= profile.settings.rounds - 1;
        if (isLastRound && !requeued.current.has(current.entry.id)) {
          requeued.current.add(current.entry.id);
          setQueue((q) => [
            ...q,
            { ...current, round: current.round + 1, stage: 'learn', game: 'cloze', showIntro: false },
          ]);
        }
      }

      setFeedback({ item: current, correct, exposureIndex });
    },
    [current, profile, data.cards, recordAnswer],
  );

  const next = useCallback(() => {
    stopSpeaking();
    setFeedback(null);
    setIntroShown(false);

    if (index + 1 >= queue.length) {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      finishSession({ studied: studiedIds.current.size, seconds });
      router.replace({
        pathname: '/result',
        params: {
          correct: String(stats.correct),
          wrong: String(stats.wrong),
          studied: String(studiedIds.current.size),
          seconds: String(seconds),
        },
      });
      return;
    }

    setIndex((i) => i + 1);
    questionStartedAt.current = Date.now();
  }, [index, queue.length, stats, finishSession]);

  function quit() {
    Alert.alert('학습을 그만할까요?', '지금까지 푼 문제는 저장돼요.', [
      { text: '계속하기', style: 'cancel' },
      {
        text: '그만하기',
        style: 'destructive',
        onPress: () => {
          stopSpeaking();
          finishSession({
            studied: studiedIds.current.size,
            seconds: Math.round((Date.now() - startedAt.current) / 1000),
          });
          router.replace('/home');
        },
      },
    ]);
  }

  if (!profile || queue.length === 0 || !current) {
    return (
      <SafeAreaView style={s.screen}>
        <View style={s.center}>
          <Text style={s.emptyText}>오늘 공부할 단어가 없어요.</Text>
          <Pressable onPress={() => router.replace('/home')} style={s.backBtn} accessibilityRole="button">
            <Text style={s.backText}>홈으로</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  // 피드백 카드는 문제를 풀기 직전의 노출 인덱스를 써야
  // 방금 본 문장과 같은 문장이 나온다.
  const shownExposure = feedback
    ? senseExposure(feedback.item.entry, feedback.item.senseIndex, feedback.exposureIndex)
    : senseExposure(
        current.entry,
        current.senseIndex,
        exposureCount(data.cards[current.entry.id]) + current.round,
      );

  const needsIntro = current.showIntro && !introShown && !feedback;
  const isLast = index + 1 >= queue.length;

  const gameProps = {
    entry: current.entry,
    exp: shownExposure,
    pool,
    ttsEnabled: profile.settings.ttsEnabled,
    showTranslation: profile.settings.showTranslation,
    onAnswer,
  };

  return (
    <SafeAreaView style={s.screen} edges={['top', 'left', 'right']}>
      <View style={s.inner}>
        <Row style={{ justifyContent: 'space-between', marginBottom: spacing.md }}>
          <Pressable onPress={quit} accessibilityRole="button" accessibilityLabel="그만하기" hitSlop={12}>
            <Text style={s.close}>✕</Text>
          </Pressable>

          <Row style={{ gap: spacing.sm }}>
            <View style={s.stageTag}>
              <Text style={s.stageTagText}>{STAGE_LABEL[current.stage]}</Text>
            </View>
            {!needsIntro && !feedback ? (
              <View style={s.gameTag}>
                <Text style={s.gameTagText}>{GAME_LABEL[current.game]}</Text>
              </View>
            ) : null}
          </Row>

          <Text style={s.counter}>
            {Math.min(index + 1, queue.length)}/{queue.length}
          </Text>
        </Row>

        <ProgressBar value={(index + (feedback ? 1 : 0)) / queue.length} height={6} />

        <View style={{ flex: 1, marginTop: spacing.lg }}>
          {needsIntro ? (
            // 처음 보는 단어는 문제를 내기 전에 뜻과 예문을 먼저 보여준다.
            <WordStoryCard
              variant="intro"
              entry={current.entry}
              exp={shownExposure}
              ttsEnabled={profile.settings.ttsEnabled}
              onNext={() => {
                stopSpeaking();
                setIntroShown(true);
                questionStartedAt.current = Date.now();
              }}
              nextLabel="문제 풀어보기"
            />
          ) : feedback ? (
            <WordStoryCard
              variant="feedback"
              entry={feedback.item.entry}
              exp={shownExposure}
              correct={feedback.correct}
              ttsEnabled={profile.settings.ttsEnabled}
              onNext={next}
              nextLabel={isLast ? '결과 보기' : '다음 문제'}
            />
          ) : current.game === 'cloze' || current.game === 'listening' ? (
            <ClozeGame {...gameProps} listen={current.game === 'listening'} />
          ) : current.game === 'clozeType' ? (
            <ClozeGame {...gameProps} mode="type" />
          ) : (
            <ChoiceGame {...gameProps} game={current.game as ChoiceGameId} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  inner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: font.h3, color: colors.subtext },
  backBtn: { marginTop: spacing.lg, padding: spacing.md },
  backText: { color: colors.primary, fontWeight: '700' },
  close: { fontSize: 22, color: colors.muted, width: 40 },
  counter: { fontSize: font.small, color: colors.subtext, fontWeight: '700', width: 40, textAlign: 'right' },
  stageTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  stageTagText: { fontSize: font.tiny, fontWeight: '800', color: '#B45309' },
  gameTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  gameTagText: { fontSize: font.tiny, fontWeight: '800', color: colors.primary },
});
