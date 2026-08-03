/**
 * 국어 어휘 카드. **문제를 푼 직후**에 뜬다. 맞았든 틀렸든 매번.
 *
 * 영어의 WordStoryCard 와 같은 자리다. 문제보다 먼저 보여주지 않는 이유도
 * 같다 — 먼저 보여주면 방금 읽은 것을 그대로 되묻는 꼴이라 스스로 떠올려
 * 볼 기회가 사라진다.
 *
 * 사자성어는 낱자 풀이를 같이 보여준다. 넉 자를 한 덩어리로만 외우면 다른
 * 성어에서 같은 글자를 만나도 못 알아본다.
 */

import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { KoEntry, KO_CATEGORY_LABEL } from '../types';
import { koExample } from '../data/korean/entry';
import { chars } from '../games/hanja';
import { KoSentence } from './KoSentence';
import { colors, font, radius, spacing } from '../theme';

export function KoWordCard({
  entry,
  exposureIndex,
  correct,
  firstTime,
  onNext,
  nextLabel,
}: {
  entry: KoEntry;
  exposureIndex: number;
  correct: boolean;
  firstTime: boolean;
  onNext: () => void;
  nextLabel: string;
}) {
  const shown = koExample(entry, exposureIndex);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.lg }}>
        <Text style={[s.verdict, { color: correct ? colors.correct : colors.wrong }]}>
          {correct ? '맞았어요!' : '아쉬워요'}
        </Text>

        {firstTime ? <Text style={s.firstTime}>처음 만나는 말이에요</Text> : null}

        {/*
          낱말·뜻·예문을 한 상자에 담는다.

          예전에는 셋이 따로 떨어져 있고 예문만 작은 회색 글씨였다. 정작
          그 말을 어떻게 쓰는지 보여주는 것이 예문인데 가장 안 읽히는
          자리에 있었다. 한 상자에 넣고 예문도 본문 크기로 키운다.
        */}
        <View style={s.card}>
          <Text style={s.tag}>{KO_CATEGORY_LABEL[entry.category]}</Text>
          <Text style={s.word}>{entry.word}</Text>
          {entry.hanja ? <Text style={s.hanja}>{entry.hanja}</Text> : null}
          <Text style={s.meaning}>{entry.meaning}</Text>
          {entry.field ? <Text style={s.field}>{entry.field}</Text> : null}

          {/* 사자성어 낱자 풀이 — 확인된 한자에만 붙인다. */}
          {entry.category === 'idiom' && entry.hanjaVerified && entry.hanja ? (
            <View style={s.charRow}>
              {chars(entry.hanja).map((c, i) => (
                <View key={`${c}-${i}`} style={s.charBox}>
                  <Text style={s.char}>{c}</Text>
                  <Text style={s.charSound}>{[...entry.word][i] ?? ''}</Text>
                </View>
              ))}
            </View>
          ) : null}

          {entry.examples.length > 0 ? (
            <View style={s.examples}>
              <Text style={s.examplesTag}>이렇게 써요</Text>
              {entry.examples.map((ex, i) => (
                <View
                  key={`${ex.text}-${i}`}
                  style={[s.example, shown?.text === ex.text && s.exampleShown]}
                >
                  {/* 배우는 낱말을 굵고 빨갛게. 어느 말을 익히는 중인지 보이게 한다. */}
                  <KoSentence text={ex.text} word={entry.word} style={s.exampleText} />
                  {ex.gloss ? <Text style={s.exampleGloss}>{ex.gloss}</Text> : null}
                  {ex.source ? <Text style={s.exampleSource}>— {ex.source}</Text> : null}
                </View>
              ))}
            </View>
          ) : null}
        </View>
      </ScrollView>

      <Pressable onPress={onNext} style={s.next} accessibilityRole="button">
        <Text style={s.nextText}>{nextLabel}</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  verdict: { fontSize: font.h2, fontWeight: '800', textAlign: 'center', marginBottom: spacing.sm },
  firstTime: {
    fontSize: font.small,
    color: colors.primary,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  card: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
  },
  tag: { fontSize: font.tiny, fontWeight: '800', color: colors.muted, marginBottom: spacing.xs, textAlign: 'center' },
  word: { fontSize: font.h1, fontWeight: '800', color: colors.text, textAlign: 'center' },
  hanja: { fontSize: font.h3, color: colors.subtext, letterSpacing: 4, marginTop: 2, textAlign: 'center' },
  meaning: {
    fontSize: font.h2,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 34,
  },
  field: { fontSize: font.tiny, color: colors.muted, marginTop: spacing.sm, textAlign: 'center' },
  charRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  charBox: {
    alignItems: 'center',
    minWidth: 48,
    paddingVertical: spacing.sm,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  char: { fontSize: 28, color: colors.text },
  charSound: { fontSize: font.tiny, color: colors.subtext, marginTop: 2 },
  examples: { marginTop: spacing.lg, gap: spacing.sm },
  examplesTag: { fontSize: font.tiny, fontWeight: '700', color: colors.muted },
  example: {
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.border,
  },
  exampleShown: { borderLeftColor: colors.primary },
  /* 예문이 이 카드의 알맹이다. 작은 회색 글씨로 두면 아무도 안 읽는다. */
  exampleText: { fontSize: font.h3, color: colors.text, lineHeight: 30 },
  exampleGloss: { fontSize: font.small, color: colors.subtext, marginTop: spacing.xs },
  exampleSource: { fontSize: font.tiny, color: colors.muted, marginTop: spacing.xs, textAlign: 'right' },
  next: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  nextText: { color: '#fff', fontSize: font.h3, fontWeight: '800' },
});
