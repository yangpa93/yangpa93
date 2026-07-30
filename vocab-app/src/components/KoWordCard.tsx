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
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';

export function KoWordCard({
  entry,
  exposureIndex,
  correct,
  firstTime,
  ttsEnabled,
  onNext,
  nextLabel,
}: {
  entry: KoEntry;
  exposureIndex: number;
  correct: boolean;
  firstTime: boolean;
  ttsEnabled: boolean;
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

        <Pressable
          style={s.card}
          onPress={() => speak(entry.word, ttsEnabled, 'ko-KR')}
          accessibilityRole="button"
          accessibilityLabel="낱말 듣기"
        >
          <Text style={s.tag}>{KO_CATEGORY_LABEL[entry.category]}</Text>
          <Text style={s.word}>{entry.word}</Text>
          {entry.hanja ? <Text style={s.hanja}>{entry.hanja}</Text> : null}
          <Text style={s.meaning}>{entry.meaning}</Text>
          {entry.field ? <Text style={s.field}>{entry.field}</Text> : null}
        </Pressable>

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
            {entry.examples.map((ex, i) => (
              <Pressable
                key={`${ex.text}-${i}`}
                onPress={() => speak(ex.text, ttsEnabled, 'ko-KR')}
                style={[s.example, shown?.text === ex.text && s.exampleShown]}
                accessibilityRole="button"
              >
                <Text style={s.exampleText}>{ex.text}</Text>
                {ex.gloss ? <Text style={s.exampleGloss}>{ex.gloss}</Text> : null}
                {/* 출처가 있으면 원전에서 가져온 문장이다. */}
                {ex.source ? <Text style={s.exampleSource}>— {ex.source}</Text> : null}
              </Pressable>
            ))}
          </View>
        ) : null}
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
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tag: { fontSize: font.tiny, fontWeight: '800', color: colors.muted, marginBottom: spacing.xs },
  word: { fontSize: font.h1, fontWeight: '800', color: colors.text, textAlign: 'center' },
  hanja: { fontSize: font.h3, color: colors.subtext, letterSpacing: 4, marginTop: 2 },
  meaning: { fontSize: font.h3, color: colors.text, textAlign: 'center', marginTop: spacing.md },
  field: { fontSize: font.tiny, color: colors.muted, marginTop: spacing.sm },
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
  example: {
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.border,
  },
  exampleShown: { borderLeftColor: colors.primary },
  exampleText: { fontSize: font.body, color: colors.text, lineHeight: 24 },
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
