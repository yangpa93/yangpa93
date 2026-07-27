/**
 * 4지선다 게임.
 *
 * 뜻 맞히기 / 단어 맞히기 / 같은 뜻 찾기 / 듣고 맞히기가 모두 같은 구조라
 * 문제 지문과 보기 라벨만 갈아 끼워 하나로 처리한다.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { GameId, VocabEntry } from '../types';
import { Exposure, exposure, primaryMeaning } from '../data/entry';
import { buildChoices } from '../srs/session';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { H2, Muted } from '../components/ui';

export interface GameProps {
  entry: VocabEntry;
  exp: Exposure;
  /** 오답 보기를 뽑아올 같은 레벨 단어들 */
  pool: VocabEntry[];
  ttsEnabled: boolean;
  /** 문제를 푼 결과. `chosen`은 결과 화면에 보여줄 아이가 고른 답. */
  onAnswer: (correct: boolean) => void;
}

interface Choice {
  key: string;
  label: string;
  correct: boolean;
}

export function ChoiceGame({
  game,
  entry,
  exp,
  pool,
  ttsEnabled,
  onAnswer,
}: GameProps & { game: Extract<GameId, 'meaning' | 'word' | 'synonym' | 'listening'> }) {
  const [picked, setPicked] = useState<string | null>(null);

  const choices = useMemo(
    () => buildOptions(game, entry, exp, pool),
    // 문항이 바뀔 때만 보기를 다시 뽑는다. 오답을 눌렀다고 보기가 섞이면 안 된다.
    [game, entry.id, exp.senseIndex, exp.exampleIndex, pool],
  );

  // 듣기 문제는 화면에 답이 없으니 들어오자마자 읽어 준다.
  useEffect(() => {
    if (game === 'listening') speak(entry.word, ttsEnabled);
  }, [game, entry.id, ttsEnabled]);

  function choose(c: Choice) {
    if (picked) return;
    setPicked(c.key);
    onAnswer(c.correct);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>{PROMPT[game]}</Muted>

      <View style={s.stem}>
        {game === 'listening' ? (
          <Pressable
            onPress={() => speak(entry.word, ttsEnabled)}
            style={s.speaker}
            accessibilityRole="button"
            accessibilityLabel="다시 듣기"
          >
            <Text style={{ fontSize: 44 }}>🔊</Text>
            <Muted style={{ marginTop: spacing.sm }}>다시 듣기</Muted>
          </Pressable>
        ) : game === 'word' ? (
          <H2 style={{ textAlign: 'center' }}>{exp.sense.meaning}</H2>
        ) : game === 'synonym' ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={s.word}>{entry.word}</Text>
            <Muted style={{ marginTop: spacing.sm }}>{exp.sense.meaning}</Muted>
          </View>
        ) : (
          <Pressable onPress={() => speak(entry.word, ttsEnabled)} accessibilityRole="button">
            <Text style={s.word}>{entry.word}</Text>
            <Muted style={{ textAlign: 'center', marginTop: spacing.xs }}>{entry.pos}</Muted>
          </Pressable>
        )}
      </View>

      <View style={{ gap: spacing.md }}>
        {choices.map((c) => (
          <ChoiceButton
            key={c.key}
            choice={c}
            picked={picked}
            onPress={() => choose(c)}
          />
        ))}
      </View>
    </View>
  );
}

function ChoiceButton({
  choice,
  picked,
  onPress,
}: {
  choice: Choice;
  picked: string | null;
  onPress: () => void;
}) {
  const answered = picked !== null;
  const isPicked = picked === choice.key;
  // 틀렸을 때는 정답도 같이 밝혀 준다. 뭐가 맞는지 모르고 넘어가면 학습이 안 된다.
  const revealCorrect = answered && choice.correct;

  const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isPicked && !choice.correct) {
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [isPicked, choice.correct, shake]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }) }],
      }}
    >
      <Pressable
        onPress={onPress}
        disabled={answered}
        accessibilityRole="button"
        style={({ pressed }) => [
          s.choice,
          pressed && !answered && { opacity: 0.85 },
          revealCorrect && s.choiceCorrect,
          isPicked && !choice.correct && s.choiceWrong,
          answered && !isPicked && !choice.correct && { opacity: 0.45 },
        ]}
      >
        <Text
          style={[
            s.choiceText,
            revealCorrect && { color: colors.correct },
            isPicked && !choice.correct && { color: colors.wrong },
          ]}
        >
          {choice.label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const PROMPT: Record<'meaning' | 'word' | 'synonym' | 'listening', string> = {
  meaning: '이 단어의 뜻은?',
  word: '이 뜻을 가진 단어는?',
  synonym: '바꿔 쓸 수 있는 표현은?',
  listening: '잘 듣고 알맞은 단어를 고르세요',
};

function buildOptions(
  game: 'meaning' | 'word' | 'synonym' | 'listening',
  entry: VocabEntry,
  exp: Exposure,
  pool: VocabEntry[],
): Choice[] {
  const others = pool.filter((e) => e.id !== entry.id);

  if (game === 'meaning') {
    // 정답은 지금 노출 중인 뜻. 다의어라도 그날 배운 뜻을 묻는다.
    const picked = buildChoices(
      { key: entry.id, label: exp.sense.meaning },
      others.map((e) => ({ key: e.id, label: primaryMeaning(e) })),
      (c) => c.label,
    );
    return picked.map((c) => ({ ...c, correct: c.key === entry.id }));
  }

  if (game === 'word' || game === 'listening') {
    const picked = buildChoices(
      { key: entry.id, label: entry.word },
      others.map((e) => ({ key: e.id, label: e.word })),
      (c) => c.label,
    );
    return picked.map((c) => ({ ...c, correct: c.key === entry.id }));
  }

  // synonym: 정답은 이 뜻의 동의어, 오답은 다른 단어들의 동의어(없으면 표제어)
  const answer = exp.sense.synonyms[0];
  const distractors = others
    .map((e) => {
      const otherExp = exposure(e, 0);
      return { key: e.id, label: otherExp.sense.synonyms[0] ?? e.word };
    })
    .filter((c) => c.label.toLowerCase() !== answer.toLowerCase());

  const picked = buildChoices({ key: entry.id, label: answer }, distractors, (c) => c.label);
  return picked.map((c) => ({ ...c, correct: c.key === entry.id }));
}

const s = StyleSheet.create({
  stem: {
    minHeight: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  word: { fontSize: 38, fontWeight: '800', color: colors.text, textAlign: 'center' },
  speaker: { alignItems: 'center' },
  choice: {
    minHeight: 60,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  choiceCorrect: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  choiceWrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
  choiceText: { fontSize: font.h3, fontWeight: '600', color: colors.text, textAlign: 'center' },
});
