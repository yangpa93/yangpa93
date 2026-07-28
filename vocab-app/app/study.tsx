import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChoiceGame, ChoiceGameId } from '../src/games/ChoiceGame';
import { ClozeGame } from '../src/games/ClozeGame';
import { WordStoryCard } from '../src/components/WordStoryCard';
import { CONTENT_MAX_WIDTH, ProgressBar, Row } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { senseExposure } from '../src/data/entry';
import { buildRounds, buildSession, SessionItem } from '../src/srs/session';
import { tapCorrect, tapWrong, stopSpeaking } from '../src/lib/feedback';
import { GAME_LABEL, STAGE_LABEL } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/** 한 문제를 푼 뒤 보여줄 상태 */
interface Feedback {
  item: SessionItem;
  correct: boolean;
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
      newPerDay: profile.settings.newPerDay,
      reviewPerDay: profile.settings.reviewPerDay,
    });
    return buildRounds(words, profile.settings.rounds);
  });

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  /** 이번 세션에서 실제로 다룬 단어 (중복 제외) */
  const studiedIds = useRef(new Set<string>());
  /** 틀려서 뒤에 다시 넣은 단어. 무한 반복을 막으려고 한 번만 재출제한다. */
  const requeued = useRef(new Set<string>());

  const pool = useMemo(() => (profile ? entriesOf(profile.level) : []), [profile]);

  /**
   * 이미 배운 단어들. 유의어·반대말 문제의 오답 보기를 여기서 먼저 뽑는다.
   *
   * 세션을 시작한 순간으로 굳힌다. 카드는 문제를 풀 때마다 갱신되는데,
   * 그때마다 다시 계산하면 보기 후보가 문항 중간에 바뀐다.
   */
  const [learned] = useState(() => ALL_ENTRIES.filter((e) => data.cards[e.id] != null));

  const current = queue[index];

  const onAnswer = useCallback(
    (correct: boolean) => {
      if (!current || !profile) return;

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
            {
              ...current,
              round: current.round + 1,
              // 방금 틀린 그 문장으로 다시 물으면 문장을 외운 것인지
              // 단어를 안 것인지 구별되지 않는다. 예문을 한 칸 넘긴다.
              exposureIndex: current.exposureIndex + 1,
              stage: 'learn',
              game: 'cloze',
              firstMeeting: false,
            },
          ]);
        }
      }

      setFeedback({ item: current, correct });
    },
    [current, profile, recordAnswer],
  );

  const next = useCallback(() => {
    stopSpeaking();
    setFeedback(null);

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

  // 예문 인덱스는 세션을 만들 때 문항에 못박아 두었다. 화면에서 다시
  // 계산하면 카드가 갱신될 때마다 값이 튀어서, 라운드가 올라가도 같은
  // 문장이 나오는 일이 생긴다.
  const shown = feedback ? feedback.item : current;
  const shownExposure = senseExposure(shown.entry, shown.senseIndex, shown.exposureIndex);

  const isLast = index + 1 >= queue.length;
  const questionKey = `${index}-${current.entry.id}-${current.senseIndex}-${current.round}`;

  const gameProps = {
    entry: current.entry,
    exp: shownExposure,
    pool,
    learned,
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
            {!feedback ? (
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
          {feedback ? (
            // 2단계 중 두 번째 — 풀어 본 다음에 단어를 펼쳐 보여준다.
            <WordStoryCard
              entry={feedback.item.entry}
              exp={shownExposure}
              correct={feedback.correct}
              firstTime={feedback.item.firstMeeting}
              ttsEnabled={profile.settings.ttsEnabled}
              onNext={next}
              nextLabel={isLast ? '결과 보기' : '다음 문제'}
            />
          ) : current.game === 'cloze' || current.game === 'listening' ? (
            // key 로 문항마다 새로 만든다. 게임 컴포넌트는 "무엇을 눌렀는지"를
            // 자기 안에 들고 있어서, 같은 자리에 같은 컴포넌트가 남으면 그
            // 상태가 다음 문제로 딸려 온다. 지금은 문제 사이에 단어 카드가
            // 끼어 있어 저절로 새로 만들어지지만, 그 화면에 기대지 않는다.
            <ClozeGame key={questionKey} {...gameProps} listen={current.game === 'listening'} />
          ) : current.game === 'clozeType' ? (
            <ClozeGame key={questionKey} {...gameProps} mode="type" />
          ) : (
            <ChoiceGame key={questionKey} {...gameProps} game={current.game as ChoiceGameId} />
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
