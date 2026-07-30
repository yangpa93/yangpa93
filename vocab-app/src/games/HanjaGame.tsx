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

import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { KoEntry } from '../types';
import { buildHanjaChoices, chars } from './hanja';
import { ChoiceButton, Choices, DontKnow, QuestionBox } from './ko-ui';
import { KoSentence } from '../components/KoSentence';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';

export interface HanjaGameProps {
  entry: KoEntry;
  /** 오답 보기를 뽑아 올 어휘들. 같은 레벨의 사자성어면 된다. */
  pool: KoEntry[];
  /** 몇 번째 예문을 지문으로 쓸지 */
  exampleIndex: number;
  onAnswer: (correct: boolean) => void;
}

const DONT_KNOW = '__dontknow__';

export function HanjaGame({ entry, pool, exampleIndex, onAnswer }: HanjaGameProps) {
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

      {/* 표제어·뜻·예문을 한 상자에 담는다. 예문이 밖에 있으면 보기처럼 보인다. */}
      <QuestionBox>
        <Text style={s.word}>{entry.word}</Text>
        <Text style={s.meaning}>{entry.meaning}</Text>
        {example ? (
          <View style={s.exampleBox}>
            <Text style={s.exampleTag}>이렇게 써요</Text>
            <KoSentence text={example.text} word={entry.word} style={s.exampleText} />
            {example.source ? <Text style={s.source}>— {example.source}</Text> : null}
          </View>
        ) : null}
      </QuestionBox>

      <Choices>
        {choices.map((c, i) => (
          <ChoiceButton
            key={c.id}
            index={i}
            label={c.hanja}
            correct={c.id === entry.id}
            picked={picked}
            self={c.id}
            onPress={() => choose(c.id)}
            big
          />
        ))}
        <DontKnow picked={picked} onPress={() => choose(DONT_KNOW)} />
      </Choices>

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

const s = StyleSheet.create({
  word: { fontSize: font.h1, fontWeight: '800', color: colors.text, textAlign: 'center' },
  meaning: {
    fontSize: font.h3,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 30,
  },
  /* 예문은 상자 안에서도 한 칸 더 들여 문제와 구별되게 한다. */
  exampleBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  exampleTag: { fontSize: font.tiny, fontWeight: '700', color: colors.muted, marginBottom: spacing.xs },
  exampleText: { fontSize: font.body, lineHeight: 26 },
  source: { fontSize: font.tiny, color: colors.muted, marginTop: spacing.xs, textAlign: 'right' },
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
