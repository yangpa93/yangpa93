import { useCallback, useMemo, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KoGame } from '../src/games/KoGame';
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
import { KO_ENTRIES } from '../src/data/korean/levels';
import { buildKoExam, KoExamItem, nextKoRetryRound } from '../src/srs/koExam';
import { soundCorrect, soundWrong, tapCorrect, tapWrong, stopSpeaking } from '../src/lib/feedback';
import { GAME_LABEL, LEVEL_SHORT } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 국어 레벨 시험.
 *
 * 영어 시험(app/exam.tsx)과 규칙이 같다 — 그 레벨 어휘를 하나도 빠짐없이
 * 맞혀야 통과하고, 틀린 문항은 마지막에 다시 나온다.
 *
 * 영어와 화면을 합치지 않은 이유: 문항 타입이 다르고(KoExamItem), 통과했을
 * 때 올릴 레벨도 다르다(koLevel). 한 화면에서 갈래를 타면 조건문이 화면
 * 전체에 흩어져 어느 쪽이 무엇을 하는지 읽히지 않는다.
 */
export default function KoExam() {
  const { profile, koLevelUp, recordAnswer, recordExam } = useApp();
  const level = profile?.koLevel ?? 'm1-1';

  const startedAt = useRef(Date.now());
  const [queue, setQueue] = useState<KoExamItem[]>(() => buildKoExam(KO_ENTRIES, level));
  const [index, setIndex] = useState(0);
  const [wrongThisRound, setWrongThisRound] = useState<KoExamItem[]>([]);
  const [firstTryCorrect, setFirstTryCorrect] = useState(0);
  const [retries, setRetries] = useState(0);
  const [phase, setPhase] = useState<'quiz' | 'roundDone' | 'passed'>('quiz');
  /** 전체 문항 수 (첫 판 기준) */
  const total = useRef(0);
  if (total.current === 0 && queue.length > 0) total.current = queue.length;

  const pool = useMemo(() => KO_ENTRIES.filter((e) => e.level === level), [level]);
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
        // 딩동댕은 소리 스위치를, 진동은 진동 스위치를 따른다.
        soundCorrect(profile.settings.ttsEnabled);
        tapCorrect(profile.settings.hapticsEnabled);
        if (!current.isRetry) setFirstTryCorrect((n) => n + 1);
      } else {
        soundWrong(profile.settings.ttsEnabled);
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
    setQueue(nextKoRetryRound(wrongThisRound, pool));
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
국어 {LEVEL_SHORT[level]} 시험 통과!
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
          title="다음 국어 레벨로 올라가기"
          onPress={() => {
            koLevelUp();
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
          <H3>다시 풀 낱말</H3>
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

  // 문항 하나를 가리키는 값. 다시 풀기 판이 바뀌어도 달라져야 한다.
  const questionKey = `${retries}-${index}-${current.entry.id}`;

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
                {retries > 0 ? `다시 풀기 ${retries}` : `국어 ${LEVEL_SHORT[level]} 시험`}
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
          <Muted style={{ marginTop: spacing.sm }}>
            틀린 문제 {wrongThisRound.length}개 — 끝나고 다시 나와요
          </Muted>
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
          <KoGame
            key={questionKey}
            game={current.game}
            entry={current.entry}
            pool={pool}
            exposureIndex={current.exposureIndex}
            onAnswer={onAnswer}
          />
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
