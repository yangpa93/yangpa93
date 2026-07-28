import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChoiceGame, ChoiceGameId } from '../src/games/ChoiceGame';
import { ClozeGame } from '../src/games/ClozeGame';
import {
  Body,
  Button,
  Card,
  Chip,
  CONTENT_MAX_WIDTH,
  H1,
  H3,
  Muted,
  ProgressBar,
  Row,
  Screen,
} from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { entriesOf } from '../src/data';
import { senseExposure } from '../src/data/entry';
import { buildExam, ExamItem, nextRetryRound } from '../src/srs/exam';
import { tapCorrect, tapWrong, stopSpeaking } from '../src/lib/feedback';
import { GAME_LABEL, LEVEL_SHORT } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 레벨 시험.
 *
 * 그 레벨의 모든 단어를 하나도 빠짐없이 맞혀야 통과한다.
 * 틀린 문항은 마지막에 다시 나오고, 전부 맞히면 다음 학년으로 올라간다.
 */
export default function Exam() {
  const { profile, levelUp, recordAnswer, recordExam } = useApp();
  const level = profile?.level ?? 'm1-1';

  const startedAt = useRef(Date.now());
  const [queue, setQueue] = useState<ExamItem[]>(() => buildExam(entriesOf(level), level));
  const [index, setIndex] = useState(0);
  const [wrongThisRound, setWrongThisRound] = useState<ExamItem[]>([]);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [retries, setRetries] = useState(0);
  const [phase, setPhase] = useState<'quiz' | 'roundDone' | 'passed'>('quiz');
  /** 전체 문항 수 (첫 판 기준) */
  const total = useRef(0);
  if (total.current === 0 && queue.length > 0) total.current = queue.length;

  const pool = useMemo(() => entriesOf(level), [level]);
  const current = queue[index];

  const onAnswer = useCallback(
    (correct: boolean) => {
      if (!current || !profile) return;

      recordAnswer({
        entryId: current.entry.id,
        game: current.game,
        correct,
        ms: 0,
        at: Date.now(),
      });

      if (correct) {
        tapCorrect(profile.settings.hapticsEnabled);
        if (!current.isRetry) setFirstTryCorrect((n) => n + 1);
      } else {
        tapWrong(profile.settings.hapticsEnabled);
        setWrongThisRound((w) => [...w, current]);
      }

      // 정답을 잠깐 보여주고 넘어간다.
      setTimeout(() => {
        stopSpeaking();
        if (index + 1 >= queue.length) {
          finishRound();
        } else {
          setIndex((i) => i + 1);
        }
      }, 900);
    },
    [current, profile, index, queue.length, recordAnswer],
  );

  function finishRound() {
    if (wrongThisRound.length === 0) {
      // 전부 맞혔다 — 통과
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      recordExam({
        level,
        total: total.current,
        firstTryCorrect,
        retries,
        passed: true,
        seconds,
        at: Date.now(),
      });
      setPhase('passed');
    } else {
      setPhase('roundDone');
    }
  }

  function startRetry() {
    setQueue(nextRetryRound(wrongThisRound));
    setWrongThisRound([]);
    setIndex(0);
    setRetries((n) => n + 1);
    setPhase('quiz');
  }

  function quit() {
    Alert.alert('시험을 그만둘까요?', '지금까지 푼 것은 저장되지 않아요.', [
      { text: '계속 풀기', style: 'cancel' },
      {
        text: '그만두기',
        style: 'destructive',
        onPress: () => {
          stopSpeaking();
          router.replace('/home');
        },
      },
    ]);
  }

  if (!profile) return null;

  /* ---------------- 통과 ---------------- */

  if (phase === 'passed') {
    const rate = total.current === 0 ? 0 : firstTryCorrect / total.current;
    return (
      <Screen>
        <View style={{ alignItems: 'center', paddingTop: spacing.xxl }}>
          <Text style={{ fontSize: 64 }}>🏆</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>
            {LEVEL_SHORT[level]} 시험 통과!
          </H1>
          <Body style={{ marginTop: spacing.md, textAlign: 'center', color: colors.subtext }}>
            {total.current}문항을 하나도 빠짐없이 맞혔어요.
          </Body>
        </View>

        <Card style={{ marginTop: spacing.xl }}>
          <Row style={{ justifyContent: 'space-around' }}>
            <Stat label="전체 문항" value={String(total.current)} />
            <Stat label="한 번에 맞힘" value={`${firstTryCorrect}`} />
            <Stat label="첫 시도 정답률" value={`${Math.round(rate * 100)}%`} />
          </Row>
          {retries > 0 ? (
            <Muted style={{ textAlign: 'center', marginTop: spacing.lg }}>
              틀린 문제를 {retries}번 다시 풀어 모두 맞혔어요.
            </Muted>
          ) : (
            <Muted style={{ textAlign: 'center', marginTop: spacing.lg }}>
              한 번에 전부 맞혔어요. 대단해요! 🎉
            </Muted>
          )}
        </Card>

        <Button
          title="다음 학년으로 올라가기"
          onPress={() => {
            levelUp();
            router.replace('/levelup');
          }}
          style={{ marginTop: spacing.xl }}
        />
      </Screen>
    );
  }

  /* ---------------- 한 판 끝, 틀린 것 다시 ---------------- */

  if (phase === 'roundDone') {
    const wrongWords = [...new Set(wrongThisRound.map((w) => w.entry.word))];
    return (
      <Screen>
        <View style={{ paddingTop: spacing.xl }}>
          <Text style={{ fontSize: 52 }}>💪</Text>
          <H1 style={{ marginTop: spacing.md }}>{wrongThisRound.length}개 남았어요</H1>
          <Muted style={{ marginTop: spacing.sm }}>
            시험을 통과하려면 모두 맞혀야 해요. 틀린 것만 다시 풀어 볼까요?
          </Muted>
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <H3>다시 풀 단어</H3>
          <Row style={{ flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md }}>
            {wrongWords.map((w) => (
              <Chip key={w} label={w} tone="wrong" />
            ))}
          </Row>
        </Card>

        <Button title="다시 풀기" onPress={startRetry} style={{ marginTop: spacing.xl }} />
        <Button
          title="나중에 하기"
          variant="ghost"
          onPress={() => router.replace('/home')}
          style={{ marginTop: spacing.sm }}
        />
      </Screen>
    );
  }

  /* ---------------- 문제 풀이 ---------------- */

  if (!current) return null;

  // 다시 풀 때는 예문이 한 칸 넘어가 있다. 방금 본 문장을 그대로 다시
  // 내면 문장을 외운 것인지 단어를 안 것인지 구별되지 않는다.
  const exp = senseExposure(current.entry, current.senseIndex, current.exposureIndex);
  // 문항 하나를 가리키는 값. 다시 풀기 판이 바뀌어도 달라져야 한다.
  const questionKey = `${retries}-${index}-${current.entry.id}-${current.senseIndex}`;
  const gameProps = {
    entry: current.entry,
    exp,
    pool,
    learned: pool,
    ttsEnabled: profile.settings.ttsEnabled,
    showTranslation: profile.settings.showTranslation,
    onAnswer,
  };

  return (
    <SafeAreaView style={s.screen} edges={['top', 'left', 'right']}>
      <View style={s.inner}>
        <Row style={{ justifyContent: 'space-between', marginBottom: spacing.md }}>
          <Pressable onPress={quit} accessibilityRole="button" accessibilityLabel="그만두기" hitSlop={12}>
            <Text style={s.close}>✕</Text>
          </Pressable>
          <Row style={{ gap: spacing.sm }}>
            <View style={s.examTag}>
              <Text style={s.examTagText}>
                {retries > 0 ? `다시 풀기 ${retries}` : `${LEVEL_SHORT[level]} 레벨 시험`}
              </Text>
            </View>
            <View style={s.gameTag}>
              <Text style={s.gameTagText}>{GAME_LABEL[current.game]}</Text>
            </View>
          </Row>
          <Text style={s.counter}>
            {index + 1}/{queue.length}
          </Text>
        </Row>

        <ProgressBar value={(index + 1) / queue.length} height={6} color={colors.accent} />

        {wrongThisRound.length > 0 ? (
          <Muted style={{ marginTop: spacing.sm }}>틀린 문제 {wrongThisRound.length}개 — 끝나고 다시 나와요</Muted>
        ) : null}

        <View style={{ flex: 1, marginTop: spacing.lg }}>
          {/*
            key 를 반드시 준다. 게임 컴포넌트는 "무엇을 눌렀는지"를 자기
            안에 들고 있는데, 시험은 문항 사이에 아무 화면도 끼지 않고
            index 만 올린다. key 가 없으면 리액트가 같은 자리의 같은
            컴포넌트로 보고 그 상태를 그대로 물려줘서, 이미 답한 것으로
            남은 채 다음 문제가 뜬다 — 보기가 눌리지 않는다.
            시험 문항은 거의 전부 같은 유형(빈칸)이라 첫 문제를 푼 뒤로
            시험 전체가 멈춰 버렸다.
          */}
          {current.game === 'cloze' ? (
            <ClozeGame key={questionKey} {...gameProps} />
          ) : (
            <ChoiceGame key={questionKey} {...gameProps} game={current.game as ChoiceGameId} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={s.statValue}>{value}</Text>
      <Muted style={{ marginTop: spacing.xs }}>{label}</Muted>
    </View>
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
  close: { fontSize: 22, color: colors.muted, width: 40 },
  counter: { fontSize: font.small, color: colors.subtext, fontWeight: '700', width: 48, textAlign: 'right' },
  examTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.accentSoft,
  },
  examTagText: { fontSize: font.tiny, fontWeight: '800', color: '#B45309' },
  gameTag: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  gameTagText: { fontSize: font.tiny, fontWeight: '800', color: colors.primary },
  statValue: { fontSize: 26, fontWeight: '800', color: colors.text },
});
