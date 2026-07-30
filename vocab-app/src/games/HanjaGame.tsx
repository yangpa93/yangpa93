/**
 * 사자성어의 한자를 고르는 문제.
 *
 * 뜻과 용례를 보여주고 넉 자 한자 넷 중에서 고르게 한다. 국어 전용이라
 * 영어 문제들과 파일을 따로 둔다.
 *
 * **오답 보기는 글자가 겹치는 것을 먼저 쓴다.** 苦盡甘來 가 정답인데 보기가
 * 一石二鳥·大器晩成·靑出於藍 이면 '苦' 하나 알아보고 끝난다. 興盡悲來·
 * 苦肉之計 처럼 한 글자라도 겹쳐야 넉 자를 다 읽고, 그래야 한자를 낱자로
 * 익힌다. 고르는 규칙은 games/hanja.ts 에 있다.
 *
 * **틀리면 낱자 풀이를 보여준다.** 어느 글자가 달랐는지 짚어 주지 않으면
 * 다음에도 같은 자리에서 틀린다.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { KoEntry } from '../types';
import { buildHanjaChoices, chars } from './hanja';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';

export interface HanjaGameProps {
  entry: KoEntry;
  /** 오답 보기를 뽑아 올 어휘들. 같은 레벨의 사자성어면 된다. */
  pool: KoEntry[];
  /** 몇 번째 예문을 지문으로 쓸지 */
  exampleIndex: number;
  ttsEnabled: boolean;
  onAnswer: (correct: boolean) => void;
}

const DONT_KNOW = '__dontknow__';

export function HanjaGame({ entry, pool, exampleIndex, ttsEnabled, onAnswer }: HanjaGameProps) {
  const [picked, setPicked] = useState<string | null>(null);

  const choices = useMemo(
    () => buildHanjaChoices(entry, pool),
    // 문항이 바뀔 때만 다시 뽑는다. 오답을 눌렀다고 보기가 섞이면 안 된다.
    [entry.id, pool],
  );

  const example = entry.examples.length
    ? entry.examples[exampleIndex % entry.examples.length]
    : null;

  function choose(key: string) {
    if (picked) return;
    setPicked(key);
    onAnswer(key === entry.id);
  }

  // 보기를 못 만들면(같은 길이 성어가 모자라거나 한자를 확인 못 했으면)
  // 세션이 이 유형을 고르지 않는다. 그래도 혹시 몰라 막아 둔다.
  if (choices.length === 0) return null;

  return (
    <View style={{ flex: 1 }}>
      <Muted>뜻에 맞는 한자를 고르세요</Muted>

      <Pressable
        style={s.stem}
        onPress={() => speak(entry.word, ttsEnabled, 'ko-KR')}
        accessibilityRole="button"
        accessibilityLabel="사자성어 듣기"
      >
        <Text style={s.word}>{entry.word}</Text>
        <Text style={s.meaning}>{entry.meaning}</Text>
        {example ? <Text style={s.example}>{example.text}</Text> : null}
      </Pressable>

      <View style={{ gap: spacing.sm }}>
        {choices.map((c) => (
          <HanjaButton
            key={c.id}
            hanja={c.hanja}
            correct={c.id === entry.id}
            picked={picked}
            self={c.id}
            onPress={() => choose(c.id)}
          />
        ))}

        <Pressable
          onPress={() => choose(DONT_KNOW)}
          disabled={picked !== null}
          accessibilityRole="button"
          style={[s.dontKnow, picked !== null && { opacity: 0.6 }]}
        >
          <Text style={s.dontKnowText}>모르겠어요</Text>
        </Pressable>
      </View>

      {picked !== null ? <Breakdown entry={entry} /> : null}
    </View>
  );
}

/**
 * 답을 고른 뒤 뜨는 낱자 풀이.
 *
 * 넉 자를 한 덩어리로만 외우면 다른 성어에서 같은 글자를 만나도 못 알아본다.
 * 苦(쓸 고)를 알면 苦肉之計·苦心慘憺에서도 보인다.
 */
function Breakdown({ entry }: { entry: KoEntry }) {
  return (
    <View style={s.breakdown}>
      <View style={s.charRow}>
        {chars(entry.hanja).map((c, i) => (
          <View key={`${c}-${i}`} style={s.charBox}>
            <Text style={s.char}>{c}</Text>
            <Text style={s.charSound}>{[...entry.word][i] ?? ''}</Text>
          </View>
        ))}
      </View>
      <Text style={s.breakdownMeaning}>{entry.meaning}</Text>
    </View>
  );
}

function HanjaButton({
  hanja,
  correct,
  picked,
  self,
  onPress,
}: {
  hanja: string;
  correct: boolean;
  picked: string | null;
  self: string;
  onPress: () => void;
}) {
  const answered = picked !== null;
  const isPicked = picked === self;

  const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isPicked && !correct) {
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [isPicked, correct, shake]);

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
          pressed && !answered && { opacity: 0.7 },
          // 틀렸을 때도 정답을 같이 밝혀 준다. 뭐가 맞는지 모르고 넘어가면
          // 학습이 안 된다.
          answered && correct && s.choiceCorrect,
          answered && isPicked && !correct && s.choiceWrong,
        ]}
      >
        <Text style={s.choiceText}>{hanja}</Text>
      </Pressable>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  stem: {
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  word: { fontSize: font.h2, fontWeight: '800', color: colors.text, textAlign: 'center' },
  meaning: {
    fontSize: font.h3,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  example: {
    fontSize: font.small,
    color: colors.subtext,
    textAlign: 'center',
    marginTop: spacing.md,
  },
  choice: {
    minHeight: 64,
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
  // 한자는 획이 많아 작으면 안 보인다. 글자 사이도 벌려 낱자로 읽히게 한다.
  choiceText: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 4,
  },
  dontKnow: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  dontKnowText: { fontSize: font.small, fontWeight: '600', color: colors.muted },
  breakdown: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  charRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.sm },
  charBox: { alignItems: 'center', minWidth: 48 },
  char: { fontSize: 30, color: colors.text },
  charSound: { fontSize: font.small, color: colors.subtext, marginTop: 2 },
  breakdownMeaning: {
    fontSize: font.small,
    color: colors.subtext,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
