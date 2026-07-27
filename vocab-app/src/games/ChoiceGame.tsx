/**
 * 4지선다 게임.
 *
 * 여섯 유형이 같은 구조라 문제 지문과 보기만 갈아 끼워 하나로 처리한다.
 *   meaning   영어 → 뜻
 *   word      뜻 → 영어
 *   listening 소리 → 영어
 *   context   예문 속 표제어의 뜻          (문맥 단서로 풀어야 한다)
 *   polysemy  다의어: 이 문장에서 쓰인 뜻   (보기가 전부 그 단어의 뜻이라 가장 어렵다)
 *   synonym   문맥에 맞는 동의어
 *
 * 모든 문항에 "모르겠어요" 보기를 둔다. 찍어서 맞히면 학습 데이터가
 * 오염되기 때문이다. 누르면 오답으로 기록하되 정답을 바로 보여 준다.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { GameId, VocabEntry } from '../types';
import { Exposure, exposure, primaryMeaning } from '../data/entry';
import { buildChoices, shuffle } from '../srs/session';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { H2, Muted } from '../components/ui';
import { HighlightedSentence } from '../components/HighlightedSentence';

export type ChoiceGameId = Extract<
  GameId,
  'meaning' | 'word' | 'listening' | 'context' | 'polysemy' | 'synonym'
>;

export interface GameProps {
  entry: VocabEntry;
  exp: Exposure;
  /** 오답 보기를 뽑아올 같은 레벨 단어들 */
  pool: VocabEntry[];
  ttsEnabled: boolean;
  onAnswer: (correct: boolean) => void;
}

interface Choice {
  key: string;
  label: string;
  correct: boolean;
}

const DONT_KNOW = '__dontknow__';

export function ChoiceGame({
  game,
  entry,
  exp,
  pool,
  ttsEnabled,
  onAnswer,
}: GameProps & { game: ChoiceGameId }) {
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

  function choose(key: string, correct: boolean) {
    if (picked) return;
    setPicked(key);
    onAnswer(correct);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>{PROMPT[game]}</Muted>

      <View style={s.stem}>
        <Stem game={game} entry={entry} exp={exp} ttsEnabled={ttsEnabled} answered={picked !== null} />
      </View>

      <View style={{ gap: spacing.sm }}>
        {choices.map((c) => (
          <ChoiceButton key={c.key} choice={c} picked={picked} onPress={() => choose(c.key, c.correct)} />
        ))}

        <Pressable
          onPress={() => choose(DONT_KNOW, false)}
          disabled={picked !== null}
          accessibilityRole="button"
          style={[s.dontKnow, picked === DONT_KNOW && s.dontKnowPicked, picked !== null && { opacity: 0.6 }]}
        >
          <Text style={s.dontKnowText}>모르겠어요</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Stem({
  game,
  entry,
  exp,
  ttsEnabled,
  answered,
}: {
  game: ChoiceGameId;
  entry: VocabEntry;
  exp: Exposure;
  ttsEnabled: boolean;
  answered: boolean;
}) {
  if (game === 'listening') {
    return (
      <Pressable
        onPress={() => speak(entry.word, ttsEnabled)}
        style={{ alignItems: 'center' }}
        accessibilityRole="button"
        accessibilityLabel="다시 듣기"
      >
        <Text style={{ fontSize: 44 }}>🔊</Text>
        <Muted style={{ marginTop: spacing.sm }}>다시 듣기</Muted>
      </Pressable>
    );
  }

  if (game === 'word') {
    return <H2 style={{ textAlign: 'center' }}>{exp.sense.meaning}</H2>;
  }

  // context / polysemy / synonym 은 모두 예문을 보여준다.
  if (game === 'context' || game === 'polysemy' || game === 'synonym') {
    return (
      <View style={s.sentenceBox}>
        <HighlightedSentence text={exp.example.en} word={entry.word} />
        {answered ? <Text style={s.sentenceKo}>{exp.example.ko}</Text> : null}
      </View>
    );
  }

  // meaning
  return (
    <Pressable onPress={() => speak(entry.word, ttsEnabled)} accessibilityRole="button">
      <Text style={s.word}>{entry.word}</Text>
      <Muted style={{ textAlign: 'center', marginTop: spacing.xs }}>{entry.pos}</Muted>
    </Pressable>
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

const PROMPT: Record<ChoiceGameId, string> = {
  meaning: '이 단어의 뜻은?',
  word: '이 뜻을 가진 단어는?',
  listening: '잘 듣고 알맞은 단어를 고르세요',
  context: '색칠한 단어는 여기서 무슨 뜻일까요?',
  polysemy: '이 단어는 뜻이 여러 개예요. 이 문장에서는?',
  synonym: '색칠한 단어를 바꿔 쓸 수 있는 표현은?',
};

function buildOptions(
  game: ChoiceGameId,
  entry: VocabEntry,
  exp: Exposure,
  pool: VocabEntry[],
): Choice[] {
  const others = pool.filter((e) => e.id !== entry.id);

  // 다의어 구별: 보기가 전부 '이 단어'의 뜻이다.
  // 문장을 제대로 읽지 않으면 고를 수 없어서 가장 어렵다.
  if (game === 'polysemy') {
    const own = entry.senses.map((sense, i) => ({
      key: `s${i}`,
      label: sense.meaning,
      correct: i === exp.senseIndex,
    }));
    // 뜻이 2개뿐이면 다른 단어의 뜻을 섞어 보기를 4개로 채운다.
    if (own.length < 4) {
      const fillers = others
        .slice(0, 40)
        .map((e) => ({ key: e.id, label: primaryMeaning(e), correct: false }))
        .filter((c) => !own.some((o) => o.label === c.label));
      return shuffle([...own, ...fillers.slice(0, 4 - own.length)]);
    }
    return shuffle(own).slice(0, 4);
  }

  if (game === 'meaning' || game === 'context') {
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

  // synonym: 정답은 이 뜻의 동의어, 오답은 다른 단어들의 동의어
  const answer = exp.sense.synonyms[0] ?? entry.word;
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
    minHeight: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.md,
  },
  word: { fontSize: 38, fontWeight: '800', color: colors.text, textAlign: 'center' },
  sentenceBox: {
    width: '100%',
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sentenceKo: { fontSize: font.small, color: colors.subtext, marginTop: spacing.md },
  choice: {
    minHeight: 56,
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
  dontKnow: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  dontKnowPicked: { backgroundColor: colors.bg },
  dontKnowText: { fontSize: font.small, fontWeight: '600', color: colors.muted },
});
