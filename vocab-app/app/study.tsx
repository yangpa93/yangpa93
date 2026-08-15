import { useCallback, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
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
import { SessionItem } from '../src/srs/session';
import { buildParentQueue } from '../src/srs/parentSession';
import { buildChildQueue, ChildQueueItem, childPool, isChildKo } from '../src/srs/childSession';
import { koGameFor } from '../src/srs/koExam';
import { DAILY_ENTRIES, dailyTheme } from '../src/data/daily';
import { askConfirm } from '../src/lib/confirm';
import { soundCorrect, soundWrong, tapCorrect, tapWrong, stopSpeaking } from '../src/lib/feedback';
import { GAME_LABEL, STAGE_LABEL, Subject, SUBJECT_LABEL } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 큐에 들어가는 문항. 영어와 국어를 한 줄에 섞어 두었다.
 *
 * 화면을 둘로 나누지 않은 이유: 아이 입장에서 '오늘 공부'는 하나다. 영어를
 * 끝내고 다시 국어 버튼을 눌러야 하면 두 번째는 잘 안 누른다. 진도 막대도
 * 두 번 0부터 차오르면 끝이 안 보인다.
 *
 * 어느 갈래가 앞에 오는지는 큐를 만드는 쪽이 정한다. 섞지는 않는다 — 머리를
 * 갈래 사이에서 오가게 하면 다 힘들다.
 */
type QueueItem = ChildQueueItem;

const isKo = isChildKo;

/** 한 문제를 푼 뒤 보여줄 상태 */
interface Feedback {
  item: QueueItem;
  correct: boolean;
}

export default function Study() {
  const { profile, data, recordAnswer, finishSession } = useApp();

  /**
   * 어느 갈래를 풀러 들어왔는지. 홈이 `/study?track=ko` 처럼 넘긴다.
   *
   * **없으면 켠 것 전부**다 — 부모 공부와 옛 링크가 그렇게 들어온다.
   * 아이 홈은 갈래마다 단추를 따로 두어 늘 하나만 넘긴다. 예전에는 영어와
   * 국어를 한 줄로 이어 붙여 한 판에 78문제를 다 풀게 했는데, 앉은자리에서
   * 다 해야 하는 데다 영어를 끝내고 쉬면 국어는 시작도 못 했다.
   */
  const params = useLocalSearchParams<{ track?: string }>();
  const only: Subject | null =
    params.track === 'en' || params.track === 'ko' || params.track === 'daily'
      ? params.track
      : null;

  const startedAt = useRef(Date.now());
  const questionStartedAt = useRef(Date.now());

  // 세션은 화면에 들어온 순간 한 번만 만든다. 답을 맞힐 때마다 카드가
  // 바뀌는데 그때마다 다시 뽑으면 문제가 뒤섞인다.
  const [queue, setQueue] = useState<QueueItem[]>(() => {
    if (!profile) return [];

    /*
     * 부모는 무엇을 공부할지 스스로 골라 둔다. 문제 유형·라운드·복습 간격은
     * 아이와 똑같으므로 화면은 그대로 쓰고, 큐를 만드는 곳만 갈라진다.
     * `track` 을 `subject` 로 옮겨 담는다 — 화면은 '영어 문항이냐 국어
     * 문항이냐'만 알면 되고, 일상 문장도 영어 문항이다.
     */
    if (profile.kind === 'parent') {
      return buildParentQueue({
        profile,
        cards: data.cards,
        rounds: profile.settings.rounds,
      }).map((i) =>
        i.track === 'ko'
          ? ({ subject: 'ko', ...i, track: 'ko' } as QueueItem)
          : /*
             * 부모 갈래 이름을 아이 쪽 이름으로 옮겨 담는다. 화면 위 표는
             * 하나뿐이라 둘이 같은 말을 써야 한다 — 'enWord' 는 부모 설정
             * 안에서만 쓰는 이름이다.
             */
            ({ subject: 'en', ...i, track: i.track === 'daily' ? 'daily' : 'en' } as QueueItem),
      );
    }

    /*
     * 아이 큐를 만드는 규칙은 srs/childSession.ts 에 있다. 홈이 '오늘 몇 개'
     * 를 셀 때 같은 것을 봐야 하는데, 예전에는 여기서 만들고 홈에서 따로
     * 세느라 둘이 어긋났다 — 국어만 켠 아이에게 홈의 숫자가 거짓말을 했다.
     */
    const all = buildChildQueue({ profile, cards: data.cards });
    return only ? all.filter((i) => i.track === only) : all;
  });

  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [stats, setStats] = useState({ correct: 0, wrong: 0 });
  /** 이번 세션에서 실제로 다룬 단어 (중복 제외) */
  const studiedIds = useRef(new Set<string>());
  /** 틀려서 뒤에 다시 넣은 단어. 무한 반복을 막으려고 한 번만 재출제한다. */
  const requeued = useRef(new Set<string>());
  /**
   * **이번 판에서** 틀린 단어. 틀린 순서 그대로, 두 번 틀리면 두 번 담는다.
   *
   * 결과 화면에 그대로 넘긴다. 예전에는 결과 화면이 하루 기록을 보고 있었는데,
   * 갈래를 따로 들어가 풀게 한 뒤로 하루에 판이 둘 이상이라 국어를 끝내면
   * 아침에 영어에서 틀린 것이 떴다.
   */
  const wrongIds = useRef<string[]>([]);

  /**
   * 오답 보기를 뽑을 후보.
   *
   * 부모가 일상 문장을 켜 두었으면 그 문장들도 후보에 넣는다. 빈칸에 넣을
   * 보기를 아이들 단어에서만 뽑으면 'on the same page' 자리에 'delicious'
   * 같은 것이 서고, 문장을 읽지 않아도 답이 보인다.
   */
  const pool = useMemo(() => {
    if (!profile) return [];
    // 아이도 일상 문장을 켤 수 있다. 켠 아이에게는 그 문장들도 보기 후보다.
    if (profile.kind !== 'parent') return childPool(profile);
    const study = profile.parentStudy;
    return [
      ...(study.tracks.includes('daily') ? dailyTheme(study.dailyTheme).entries : []),
      ...(study.tracks.includes('enWord') ? entriesOf(profile.level) : []),
    ];
  }, [profile]);
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
  const [learned] = useState(() =>
    [...ALL_ENTRIES, ...DAILY_ENTRIES].filter((e) => data.cards[e.id] != null),
  );

  /** 공부를 그만두거나 마쳤을 때 돌아갈 곳. 사람마다 홈이 다르다. */
  const homePath = profile?.kind === 'parent' ? '/parent-home' : '/home';

  /**
   * 이번 판이 **어느 갈래를 끝낸 것으로 세어질지.**
   *
   * 홈에서 갈래를 집어 들어왔으면 그것이고, 안 집었으면(부모 공부·옛 링크)
   * 큐 맨 앞의 갈래로 본다. 켠 갈래를 다 모아야 하루가 끝나므로 이 값이
   * 하루 기록에 그대로 적힌다.
   */
  const doneSubject: Subject = only ?? queue[0]?.track ?? 'en';

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
        // 하루 기록에 갈래별로 따로 세어 둔다. 부모가 날짜를 눌렀을 때
        // 「국어 6개 · 정답률 83%」 로 갈라 보려면 여기서 알려 줘야 한다.
        subject: current.track,
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
        wrongIds.current.push(current.entry.id);
        // 마지막 라운드에서 틀린 단어는 세션 끝에 한 번 더 만난다.
        const isLastRound = current.round >= profile.settings.rounds - 1;
        if (isLastRound && !requeued.current.has(current.entry.id)) {
          requeued.current.add(current.entry.id);
          // 방금 틀린 그 문장으로 다시 물으면 문장을 외운 것인지
          // 단어를 안 것인지 구별되지 않는다. 예문을 한 칸 넘긴다.
          const nextExposure = current.exposureIndex + 1;
          setQueue((q) => [
            ...q,
            {
              ...current,
              round: current.round + 1,
              exposureIndex: nextExposure,
              stage: 'learn',
              /*
               * **국어는 유형을 다시 고른다.** 예전에는 갈래를 안 가리고 빈칸
               * 문제로 못박았는데, 국어 예문에는 표제어가 그 모양 그대로 안
               * 들어 있는 것이 있다. 그러면 빈칸을 뚫을 자리가 없어 화면이
               * 통째로 비고, 아이는 아무것도 못 누른 채 거기서 막힌다.
               *
               * 예문을 한 칸 넘긴 참이라 더 그렇다 — 첫 예문은 빈칸이 되는데
               * 둘째는 안 되는 낱말이 실제로 있다. `koGameFor` 가 그 판단을
               * 이미 하고 있으니(빈칸을 못 뚫으면 뜻 문제로 내린다) 그것을
               * 부른다.
               */
              game: isKo(current) ? koGameFor(current.entry, koPool, nextExposure) : 'cloze',
              firstMeeting: false,
            } as QueueItem,
          ]);
        }
      }

      setFeedback({ item: current, correct });
    },
    [current, profile, recordAnswer, koPool],
  );

  const next = useCallback(() => {
    stopSpeaking();
    setFeedback(null);

    if (index + 1 >= queue.length) {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      // 큐를 끝까지 다 봤다. 이때만 '오늘 다 했다' 로 적힌다.
      finishSession({
        studied: studiedIds.current.size,
        seconds,
        reachedEnd: true,
        subject: doneSubject,
      });
      router.replace({
        pathname: '/result',
        params: {
          correct: String(stats.correct),
          wrong: String(stats.wrong),
          studied: String(studiedIds.current.size),
          seconds: String(seconds),
          /*
           * 이번 판에서 틀린 것. 결과 화면이 하루 기록을 뒤지지 않게 여기서
           * 넘긴다. id 는 영어가 `[a-z0-9-]`, 국어가 `ko-` + 표제어라 쉼표가
           * 들어갈 일이 없다(둘 다 만드는 곳이 slug 를 거친다).
           */
          wrongIds: wrongIds.current.join(','),
        },
      });
      return;
    }

    setIndex((i) => i + 1);
    questionStartedAt.current = Date.now();
  }, [index, queue.length, stats, finishSession]);

  function quit() {
    askConfirm(
      '학습을 그만할까요?',
      '지금까지 푼 문제는 저장돼요. 다만 오늘 공부는 아직 안 끝난 것으로 남습니다.',
      () => {
          stopSpeaking();
          /*
           * 중간에 그만뒀다. 푼 것은 저장하되 **다 한 것으로는 안 적는다.**
           *
           * 예전에는 개수만 보고 판단했는데, 한 낱말이 하루에 세 바퀴 나오므로
           * 첫 바퀴만 돌아도 '만난 낱말의 가짓수' 가 목표와 같아졌다. 그래서
           * 여기서 그만둬도 다 한 것으로 찍혔다.
           */
          finishSession({
            studied: studiedIds.current.size,
            seconds: Math.round((Date.now() - startedAt.current) / 1000),
            reachedEnd: false,
            subject: doneSubject,
          });
          router.replace(homePath);
      },
      { confirmText: '그만하기', destructive: true },
    );
  }

  if (!profile || queue.length === 0 || !current) {
    return (
      <SafeAreaView style={s.screen}>
        <View style={s.center}>
          <Text style={s.emptyText}>오늘 공부할 단어가 없어요.</Text>
          <Pressable onPress={() => router.replace(homePath)} style={s.backBtn} accessibilityRole="button">
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
            {/*
              **지금 어느 갈래를 푸는지.**

              영어·국어·일상 문장이 한 세션에 이어 붙어 나오는데 화면에 아무
              표시가 없었다. 아이는 국어 문제가 나올 때까지 국어가 켜져 있는지
              모르고, 확인하는 사람은 셋이 다 나왔는지 알 방법이 없다.

              갈래 이름 하나면 둘 다 풀린다. 자리도 거의 안 든다.
            */}
            <View style={s.subjectTag}>
              <Text style={s.subjectTagText} testID="subject-tag">
                {SUBJECT_LABEL[current.track]}
              </Text>
            </View>
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
  /* 지금 어느 갈래인지. 단계·유형과 색을 갈라 두어 셋이 안 섞여 보이게 한다. */
  subjectTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  subjectTagText: { fontSize: font.tiny, fontWeight: '800', color: colors.primary },
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
