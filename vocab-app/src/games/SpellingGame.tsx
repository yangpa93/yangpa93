/**
 * 철자 쓰기.
 *
 * 뜻과 예문(표제어는 빈칸)을 보여주고 단어를 직접 타이핑하게 한다.
 * 세 번 이상 맞힌 단어에만 낸다. 첫 글자는 힌트로 준다.
 */

import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { clozeSentence } from '../data/entry';
import { GameProps } from './ChoiceGame';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { H2, Muted } from '../components/ui';

export function SpellingGame({ entry, exp, ttsEnabled, onAnswer }: GameProps) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [hintShown, setHintShown] = useState(false);

  const cloze = useMemo(() => clozeSentence(entry, exp.example.en), [entry.id, exp.example.en]);

  function submit() {
    if (result) return;
    const ok = normalize(value) === normalize(entry.word);
    setResult(ok ? 'correct' : 'wrong');
    if (ok) speak(entry.word, ttsEnabled);
    onAnswer(ok);
  }

  const hint = buildHint(entry.word, hintShown);

  return (
    <View style={{ flex: 1 }}>
      <Muted>뜻을 보고 단어를 직접 써 보세요</Muted>

      <View style={s.stem}>
        <H2 style={{ textAlign: 'center' }}>{exp.sense.meaning}</H2>
        {cloze ? <Text style={s.sentence}>{cloze.text}</Text> : null}
        <Text style={s.hint}>{hint}</Text>
      </View>

      <TextInput
        value={value}
        onChangeText={setValue}
        editable={result === null}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        placeholder="영어로 입력"
        placeholderTextColor={colors.muted}
        onSubmitEditing={submit}
        returnKeyType="done"
        style={[
          s.input,
          result === 'correct' && { borderColor: colors.correct, backgroundColor: colors.correctSoft },
          result === 'wrong' && { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
        ]}
      />

      {result === 'wrong' ? (
        <Text style={s.answer}>정답: {entry.word}</Text>
      ) : null}

      {result === null ? (
        <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
          <Pressable
            onPress={submit}
            disabled={value.trim().length === 0}
            accessibilityRole="button"
            style={[s.submit, value.trim().length === 0 && { opacity: 0.4 }]}
          >
            <Text style={s.submitText}>확인</Text>
          </Pressable>
          {!hintShown ? (
            <Pressable onPress={() => setHintShown(true)} accessibilityRole="button" style={s.hintBtn}>
              <Text style={s.hintBtnText}>힌트 보기</Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** 첫 글자만 주고 나머지는 밑줄. 힌트를 누르면 절반을 열어 준다. */
function buildHint(word: string, more: boolean): string {
  const reveal = more ? Math.ceil(word.length / 2) : 1;
  return word
    .split('')
    .map((ch, i) => (ch === ' ' ? '  ' : i < reveal ? ch : '_'))
    .join(' ');
}

const s = StyleSheet.create({
  stem: { minHeight: 140, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.lg },
  sentence: {
    fontSize: font.body,
    color: colors.subtext,
    marginTop: spacing.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  hint: { fontSize: 24, letterSpacing: 2, color: colors.primary, marginTop: spacing.lg, fontWeight: '700' },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 22,
    textAlign: 'center',
    color: colors.text,
    backgroundColor: colors.card,
  },
  answer: {
    marginTop: spacing.md,
    textAlign: 'center',
    fontSize: font.h3,
    fontWeight: '700',
    color: colors.correct,
  },
  submit: {
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  hintBtn: { alignSelf: 'center', padding: spacing.sm },
  hintBtnText: { color: colors.subtext, fontWeight: '600' },
});
