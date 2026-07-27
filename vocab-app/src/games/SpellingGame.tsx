/**
 * 직접 쓰기.
 *
 * 두 가지 난이도가 있다.
 *   spelling — 첫 글자를 힌트로 준다. 아직 손에 익지 않은 단어용.
 *   recall   — 힌트가 전혀 없다. 뜻만 보고 스스로 떠올려 써야 한다.
 *
 * 4지선다와 달리 보기 중에 답이 없어서, 실제로 외웠는지가 여기서 드러난다.
 * 한 세션의 마지막 라운드는 이 유형으로 끝난다.
 */

import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { clozeSentence } from '../data/entry';
import { GameProps } from './ChoiceGame';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { H2, Muted } from '../components/ui';

export function SpellingGame({
  entry,
  exp,
  ttsEnabled,
  onAnswer,
  mode = 'spelling',
}: GameProps & { mode?: 'spelling' | 'recall' }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  /** 0 = 힌트 없음, 1 = 첫 글자, 2 = 절반 */
  const [hintLevel, setHintLevel] = useState(mode === 'spelling' ? 1 : 0);

  const cloze = useMemo(() => clozeSentence(entry, exp.example.en), [entry.id, exp.example.en]);

  function submit() {
    if (result) return;
    const ok = normalize(value) === normalize(entry.word);
    setResult(ok ? 'correct' : 'wrong');
    if (ok) speak(entry.word, ttsEnabled);
    onAnswer(ok);
  }

  function giveUp() {
    if (result) return;
    setResult('wrong');
    onAnswer(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>
        {mode === 'recall' ? '뜻을 보고 영어로 써 보세요 (힌트 없음)' : '뜻을 보고 단어를 직접 써 보세요'}
      </Muted>

      <View style={s.stem}>
        <H2 style={{ textAlign: 'center' }}>{exp.sense.meaning}</H2>
        {cloze ? <Text style={s.sentence}>{cloze.text}</Text> : null}
        {hintLevel > 0 ? <Text style={s.hint}>{buildHint(entry.word, hintLevel)}</Text> : null}
        {hintLevel === 0 ? <Text style={s.letterCount}>{entry.word.length}글자</Text> : null}
      </View>

      <TextInput
        value={value}
        onChangeText={setValue}
        editable={result === null}
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        autoComplete="off"
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

      {result === 'wrong' ? <Text style={s.answer}>정답: {entry.word}</Text> : null}

      {result === null ? (
        <View style={{ gap: spacing.sm, marginTop: spacing.lg }}>
          <Pressable
            onPress={submit}
            disabled={value.trim().length === 0}
            accessibilityRole="button"
            style={[s.submit, value.trim().length === 0 && { opacity: 0.4 }]}
          >
            <Text style={s.submitText}>확인</Text>
          </Pressable>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: spacing.lg }}>
            {hintLevel < 2 ? (
              <Pressable onPress={() => setHintLevel((h) => h + 1)} accessibilityRole="button" style={s.textBtn}>
                <Text style={s.textBtnLabel}>힌트 보기</Text>
              </Pressable>
            ) : null}
            <Pressable onPress={giveUp} accessibilityRole="button" style={s.textBtn}>
              <Text style={s.textBtnLabel}>모르겠어요</Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

function normalize(str: string): string {
  return str.trim().toLowerCase().replace(/\s+/g, ' ');
}

/** 1 = 첫 글자만, 2 = 앞 절반. 나머지는 밑줄. */
function buildHint(word: string, level: number): string {
  const reveal = level >= 2 ? Math.ceil(word.length / 2) : 1;
  return word
    .split('')
    .map((ch, i) => (ch === ' ' ? '  ' : i < reveal ? ch : '_'))
    .join(' ');
}

const s = StyleSheet.create({
  stem: { minHeight: 150, alignItems: 'center', justifyContent: 'center', marginVertical: spacing.md },
  sentence: {
    fontSize: font.body,
    color: colors.subtext,
    marginTop: spacing.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  hint: { fontSize: 24, letterSpacing: 2, color: colors.primary, marginTop: spacing.lg, fontWeight: '700' },
  letterCount: { fontSize: font.small, color: colors.muted, marginTop: spacing.lg, fontWeight: '600' },
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
  textBtn: { padding: spacing.sm },
  textBtnLabel: { color: colors.muted, fontWeight: '600', fontSize: font.small },
});
