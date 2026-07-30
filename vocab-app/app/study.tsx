import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChoiceGame, ChoiceGameId } from '../src/games/ChoiceGame';
import { ClozeGame } from '../src/games/ClozeGame';
import { ScrambleGame } from '../src/games/ScrambleGame';
import { KoGame } from '../src/games/KoGame';
import { WordStoryCard } from '../src/components/WordStoryCard';
import { KoWordCard } from '../src/components/KoWordCard';
import { CONTENT_MAX_WIDTH, ProgressBar, Row } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { senseExposure } from '../src/data/entry';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { buildRounds, buildSession, SessionItem } from '../src/srs/session';
import { buildKoRounds, buildKoSession, KoSessionItem } from '../src/srs/koSession';
import { soundCorrect, soundWrong, tapCorrect, tapWrong, stopSpeaking } from '../src/lib/feedback';
import { GAME_LABEL, STAGE_LABEL } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 큐에 들어가는 문항. 영어와 국어를 한 줄에 섞어 두었다.
 *
 * 화면을 둘로 나누지 않은 이유: 아이 입장에서 '오늘 공부'는 하나다. 영어를
 * 끝내고 다시 국어 버튼을 눌러야 하면 두 번째는 잘 안 누른다. 진도 막대도
 * 두 번 0부터 차오르면 끝이 안 보인다.
 *
 * 영어 문항이 앞, 국어 문항이 뒤에 온다. 섞지 않는다 — 머리를 영어와 국어
 * 사이에서 오가게 하면 둘 다 힘들다.
 */
type QueueItem =
  | ({ subject: 'en' } & SessionItem)
  | ({ subject: 'ko' } & KoSessionItem);

const isKo = (item: QueueItem): item is { subject: 'ko' } & KoSessionItem => item.subject === 'ko';

/**
 * 국어 하루치. 영어의 newPerDay 와 따로 둔다.
 *
 * 국어 어휘는 1,244개뿐이라 영어(3,285개)와 같은 속도로 내면 절반 시점에
 * 동난다. 하루 6개면 24레벨을 도는 데 약 7개월이다.
 */
const KO_NEW_PER_DAY = 6;
const KO_REVIEW_PER_DAY = 6;

/** 한 문제를 푼 뒤 보여줄 상태 */
interface Feedback {
  item: QueueItem;
  correct: boolean;
}

export default function Study() {
  const { profile, data, recordAnswer, finishSession } = useApp();

  const startedAt = useRef(Date.now());
  const questionStartedAt = useRef(Date.now());

  // 세션은 화면에 들어온 순간 한 번만 만든다. 답을 맞힐 때마다 카드가
  // 바뀌는데 그때마다 다시 뽑으면 문제가 뒤섞인다.
  const [queue, setQueue] = useState<QueueItem[]>(() => {
    if (!profile) return [];
    const { subjects, firstSubject, newPerDay, reviewPerDay, rounds } = profile.settings;

    const en: QueueItem[] = [];
    if (subjects.includes('en')) {
      const words = buildSession({
        entries: entriesOf(profile.level),
        cards: data.cards,
        level: profile.level,
        newPerDay,
        reviewPerDay,
      });
      for (const i of buildRounds(words, rounds)) en.push({ subject: 'en', ...i });
    }

    const ko: QueueItem[] = [];
    if (subjects.includes('ko')) {
      const words = buildKoSession({
        entries: KO_ENTRIES,
        cards: data.cards,
        level: profile.koLevel,
        // 국어는 하루 6개로 정해 두었다. 영어 개수와 따로 간다 —
        // 어휘가 1,286개뿐이라 영어와 같은 속도로 내면 금세 동난다.
        newPerDay: KO_NEW_PER_DAY,
        reviewPerDay: KO_REVIEW_PER_DAY,
      });
      for (const i of buildKoRounds(words, rounds, KO_ENTRIES)) ko.push({ subject: 'ko', ...i });
    }

    // 아이가 고른 순서대로. 머리가 맑을 때 어려운 쪽을 먼저 하고 싶은
    // 아이가 있고, 쉬운 쪽으로 몸을 풀고 싶은 아이가 있다.
    return firstSubject === 'ko' ? [...ko, ...en] : [...en, ...ko];
  });

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  /** 이번 세션에서 실제로 다룬 단어 (중복 제외) */
  const studiedIds = useRef(new Set<string>());
  /** 틀려서 뒤에 다시 넣은 단어. 무한 반복을 막으려고 한 번만 재출제한다. */
  const requeued = useRef(new Set<string>());

  const pool = useMemo(() => (profile ? entriesOf(profile.level) : []), [profile]);
  const koPool = useMemo(
    () => (profile ? KO_ENTRIES.filter((e) => e.level === profile.koLevel) : []),
    [profile],
  );

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
        // 딩동댕은 소리 스위치를, 진동은 진동 스위치를 따른다.
        soundCorrect(profile.settings.ttsEnabled);
        tapCorrect(profile.settings.hapticsEnabled);
      } else {
        soundWrong(profile.settings.ttsEnabled);
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
            } as QueueItem,
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
  const isLast = index + 1 >= queue.length;
  const questionKey = `${index}-${current.entry.id}-${current.round}`;

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
            // 2단계 중 두 번째 — 풀어 본 다음에 낱말을 펼쳐 보여준다.
            isKo(feedback.item) ? (
              <KoWordCard
                entry={feedback.item.entry}
                exposureIndex={feedback.item.exposureIndex}
                correct={feedback.correct}
                firstTime={feedback.item.firstMeeting}
                ttsEnabled={profile.settings.ttsEnabled}
                onNext={next}
                nextLabel={isLast ? '결과 보기' : '다음 문제'}
              />
            ) : (
              <WordStoryCard
                entry={feedback.item.entry}
                exp={senseExposure(feedback.item.entry, feedback.item.senseIndex, feedback.item.exposureIndex)}
                correct={feedback.correct}
                firstTime={feedback.item.firstMeeting}
                ttsEnabled={profile.settings.ttsEnabled}
                onNext={next}
                nextLabel={isLast ? '결과 보기' : '다음 문제'}
              />
            )
          ) : isKo(current) ? (
            <KoGame
              key={questionKey}
              game={current.game}
              entry={current.entry}
              pool={koPool}
              exposureIndex={current.exposureIndex}
              ttsEnabled={profile.settings.ttsEnabled}
              onAnswer={onAnswer}
            />
          ) : (
            <EnGame
              // key 로 문항마다 새로 만든다. 게임 컴포넌트는 "무엇을 눌렀는지"를
              // 자기 안에 들고 있어서, 같은 자리에 같은 컴포넌트가 남으면 그
              // 상태가 다음 문제로 딸려 온다.
              key={questionKey}
              item={current}
              pool={pool}
              learned={learned}
              ttsEnabled={profile.settings.ttsEnabled}
              showTranslation={profile.settings.showTranslation}
              onAnswer={onAnswer}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

/** 영어 문항의 유형별 갈래. study 본문이 길어져 따로 뺐다. */
function EnGame({
  item,
  pool,
  learned,
  ttsEnabled,
  showTranslation,
  onAnswer,
}: {
  item: SessionItem;
  pool: SessionItem['entry'][];
  learned: SessionItem['entry'][];
  ttsEnabled: boolean;
  showTranslation: boolean;
  onAnswer: (correct: boolean) => void;
}) {
  const props = {
    entry: item.entry,
    exp: senseExposure(item.entry, item.senseIndex, item.exposureIndex),
    pool,
    learned,
    ttsEnabled,
    showTranslation,
    onAnswer,
  };

  if (item.game === 'cloze' || item.game === 'listening') {
    return <ClozeGame {...props} listen={item.game === 'listening'} />;
  }
  if (item.game === 'clozeType') return <ClozeGame {...props} mode="type" />;
  if (item.game === 'scramble') return <ScrambleGame {...props} />;
  return <ChoiceGame {...props} game={item.game as ChoiceGameId} />;
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
