/**
 * 빈칸 채우기.
 *
 * 그날 노출 중인 예문에서 표제어만 빈칸으로 만들고 4지선다로 고르게 한다.
 * 뜻만 외우는 게 아니라 "문장 안에서 어떻게 쓰이는지"를 같이 익히게 하려는 것.
 */

import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { clozeSentence } from '../data/entry';
import { buildChoices } from '../srs/session';
import { GameProps } from './ChoiceGame';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';

export function ClozeGame({ entry, exp, pool, onAnswer }: GameProps) {
  const [picked, setPicked] = useState<string | null>(null);

  const cloze = useMemo(
    () => clozeSentence(entry, exp.example.en),
    [entry.id, exp.example.en],
  );

  const choices = useMemo(() => {
    const answer = { key: entry.id, label: cloze?.answer ?? entry.word };
    const distractors = pool
      .filter((e) => e.id !== entry.id)
      .map((e) => ({ key: e.id, label: e.word }));
    return buildChoices(answer, distractors, (c) => c.label).map((c) => ({
      ...c,
      correct: c.key === entry.id,
    }));
  }, [entry.id, cloze?.answer, pool]);

  // 표제어를 예문에서 못 찾으면 이 게임을 낼 수 없다.
  // pickGame이 걸러 주지만, 데이터가 바뀌었을 때를 대비한 안전장치.
  if (!cloze) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Muted style={{ textAlign: 'center' }}>이 문장은 문제로 낼 수 없어요.</Muted>
        <Pressable style={s.skip} onPress={() => onAnswer(true)} accessibilityRole="button">
          <Text style={s.skipText}>넘어가기</Text>
        </Pressable>
      </View>
    );
  }

  function choose(c: { key: string; correct: boolean }) {
    if (picked) return;
    setPicked(c.key);
    onAnswer(c.correct);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>빈칸에 알맞은 말을 고르세요</Muted>

      <View style={s.sentenceBox}>
        <Text style={s.sentence}>{cloze.text}</Text>
        {picked ? <Text style={s.sentenceKo}>{exp.example.ko}</Text> : null}
      </View>

      <View style={{ gap: spacing.md }}>
        {choices.map((c) => {
          const answered = picked !== null;
          const isPicked = picked === c.key;
          return (
            <Pressable
              key={c.key}
              onPress={() => choose(c)}
              disabled={answered}
              accessibilityRole="button"
              style={({ pressed }) => [
                s.choice,
                pressed && !answered && { opacity: 0.85 },
                answered && c.correct && s.correct,
                isPicked && !c.correct && s.wrong,
                answered && !isPicked && !c.correct && { opacity: 0.45 },
              ]}
            >
              <Text
                style={[
                  s.choiceText,
                  answered && c.correct && { color: colors.correct },
                  isPicked && !c.correct && { color: colors.wrong },
                ]}
              >
                {c.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  sentenceBox: {
    minHeight: 130,
    justifyContent: 'center',
    marginVertical: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sentence: { fontSize: 20, lineHeight: 30, color: colors.text, fontWeight: '600' },
  sentenceKo: { fontSize: font.small, color: colors.subtext, marginTop: spacing.md },
  choice: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  choiceText: { fontSize: font.h3, fontWeight: '600', color: colors.text },
  correct: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  wrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
  skip: { marginTop: spacing.lg, alignSelf: 'center', padding: spacing.md },
  skipText: { color: colors.primary, fontWeight: '700' },
});
