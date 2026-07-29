/**
 * 빈칸 채우기. 이 앱의 중심 문제 유형이다.
 *
 * 문장에서 그 단어만 지우고 무엇이 들어가야 하는지 묻는다.
 * 단어와 뜻만 짝지어 외우면 문장 안에 든 그 단어를 못 알아보기 때문에,
 * 처음부터 문장으로 만나게 한다.
 *
 * 두 가지 방식이 있다.
 *   cloze     — 보기 4개 중에서 고른다
 *   clozeType — 보기 없이 직접 타이핑한다 (마지막 라운드·시험용)
 */

import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { VocabEntry } from '../types';
import { clozeSentence, Exposure, primaryMeaning } from '../data/entry';
import { buildChoices, meaningKeys } from '../srs/session';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';
import { RevealKo } from './RevealKo';

export interface GameProps {
  entry: VocabEntry;
  exp: Exposure;
  /** 오답 보기를 뽑아올 같은 레벨 단어들 */
  pool: VocabEntry[];
  /**
   * 이미 배운 단어들. 오답 보기를 여기서 먼저 뽑는다.
   *
   * 유의어·반대말 문제는 "아는 단어끼리 견주기"라야 시험이 된다. 처음 보는
   * 단어가 보기에 섞이면 뜻을 비교하는 대신 아는 것을 찍게 된다.
   */
  learned?: VocabEntry[];
  ttsEnabled: boolean;
  /**
   * 문제를 풀기 전에 '해석 보기'를 내줄지.
   *
   * 예전에는 이 값이 켜져 있으면 해석을 처음부터 띄웠다. 그러면 아이가
   * 영어 문장을 읽지 않고 해석만 보고 답을 고른다 — 문장으로 만나게 하려고
   * 만든 문제 유형인데 그 목적이 사라진다. 지금은 켜져 있어도 처음에는
   * 감추고, 아이가 '해석 보기'를 눌렀을 때만 보여준다.
   * 꺼 두면 풀기 전에는 해석을 아예 볼 수 없다.
   */
  showTranslation: boolean;
  onAnswer: (correct: boolean) => void;
}

export function ClozeGame({
  entry,
  exp,
  pool,
  ttsEnabled,
  showTranslation,
  onAnswer,
  mode = 'choice',
  /** 듣기 모드: 문장을 먼저 읽어 준다 */
  listen = false,
}: GameProps & { mode?: 'choice' | 'type'; listen?: boolean }) {
  const cloze = useMemo(() => clozeSentence(entry, exp.example.en), [entry.id, exp.example.en]);

  if (!cloze) {
    // pickGame이 걸러 주지만, 데이터가 바뀌었을 때를 위한 안전장치.
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Muted style={{ textAlign: 'center' }}>이 문장은 빈칸으로 낼 수 없어요.</Muted>
        <Pressable style={s.skip} onPress={() => onAnswer(true)} accessibilityRole="button">
          <Text style={s.skipText}>넘어가기</Text>
        </Pressable>
      </View>
    );
  }

  return mode === 'type' ? (
    <TypeCloze
      entry={entry}
      exp={exp}
      cloze={cloze}
      ttsEnabled={ttsEnabled}
      showTranslation={showTranslation}
      onAnswer={onAnswer}
    />
  ) : (
    <ChoiceCloze
      entry={entry}
      exp={exp}
      cloze={cloze}
      pool={pool}
      ttsEnabled={ttsEnabled}
      showTranslation={showTranslation}
      listen={listen}
      onAnswer={onAnswer}
    />
  );
}

interface Cloze {
  text: string;
  answer: string;
}

/* ------------------------------------------------------------------ */
/* 보기에서 고르기                                                      */
/* ------------------------------------------------------------------ */

function ChoiceCloze({
  entry,
  exp,
  cloze,
  pool,
  ttsEnabled,
  showTranslation,
  listen,
  onAnswer,
}: GameProps & { cloze: Cloze; listen: boolean }) {
  const [picked, setPicked] = useState<string | null>(null);
  /** 아이가 '해석 보기'를 눌렀는지. 한 번 열면 그 문제 동안 계속 보인다. */
  const [revealed, setRevealed] = useState(false);

  const choices = useMemo(() => {
    const answer = { key: entry.id, label: cloze.answer, meaning: exp.sense.meaning };
    // 오답도 같은 문장에 넣었을 때 말이 안 되는 것으로 고른다.
    // 같은 품사끼리 섞으면 난이도가 올라간다.
    const samePos = pool.filter((e) => e.id !== entry.id && e.pos === entry.pos);
    const others = (samePos.length >= 5 ? samePos : pool.filter((e) => e.id !== entry.id)).map(
      (e) => ({ key: e.id, label: e.word, meaning: primaryMeaning(e) }),
    );
    // 뜻이 같은 단어는 빈칸에 넣어도 말이 된다. 그런 것을 오답이라고
    // 내면 아이는 맞게 읽고도 틀렸다는 말을 듣는다.
    return buildChoices(
      answer,
      others,
      (c) => c.label,
      4,
      Math.random,
      (c) => [c.label.toLowerCase(), ...meaningKeys(c.meaning)],
    ).map((c) => ({
      ...c,
      correct: c.key === entry.id,
    }));
  }, [entry.id, cloze.answer, pool]);

  // 듣기 모드는 들어오자마자 문장을 읽어 준다.
  useMemo(() => {
    if (listen) speak(exp.example.en, ttsEnabled);
    return null;
  }, [listen, exp.example.en, ttsEnabled]);

  function choose(key: string, correct: boolean) {
    if (picked) return;
    setPicked(key);
    onAnswer(correct);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>{listen ? '잘 듣고 빈칸에 알맞은 말을 고르세요' : '빈칸에 알맞은 말을 고르세요'}</Muted>

      <Pressable
        style={s.sentenceBox}
        onPress={() => speak(exp.example.en, ttsEnabled)}
        accessibilityRole="button"
        accessibilityLabel="문장 듣기"
      >
        {listen && !picked ? (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 40 }}>🔊</Text>
            <Muted style={{ marginTop: spacing.sm }}>다시 듣기</Muted>
          </View>
        ) : (
          <Text style={s.sentence}>{cloze.text}</Text>
        )}
        {/* 해석은 먼저 스스로 읽어 보게 하고, 눌렀을 때만 보여준다.
            정답은 영어 단어라서 해석을 봐도 답이 그대로 노출되지는 않는다.
            답을 고른 뒤에는 맞든 틀리든 항상 보여준다. */}
        {revealed || picked ? <Text style={s.sentenceKo}>{exp.example.ko}</Text> : null}
      </Pressable>

      {showTranslation && !revealed && !picked ? <RevealKo onPress={() => setRevealed(true)} /> : null}

      <View style={{ gap: spacing.sm }}>
        {choices.map((c) => {
          const answered = picked !== null;
          const isPicked = picked === c.key;
          return (
            <Pressable
              key={c.key}
              onPress={() => choose(c.key, c.correct)}
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

        <Pressable
          onPress={() => choose('__dontknow__', false)}
          disabled={picked !== null}
          accessibilityRole="button"
          style={[s.dontKnow, picked !== null && { opacity: 0.6 }]}
        >
          <Text style={s.dontKnowText}>모르겠어요</Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 직접 쓰기                                                            */
/* ------------------------------------------------------------------ */

function TypeCloze({
  entry,
  exp,
  cloze,
  ttsEnabled,
  showTranslation,
  onAnswer,
}: Omit<GameProps, 'pool'> & { cloze: Cloze }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [hint, setHint] = useState(0);
  const [revealed, setRevealed] = useState(false);

  function submit() {
    if (result) return;
    // 원형으로 써도, 문장에 맞는 변화형으로 써도 맞는 것으로 본다.
    // 철자를 묻는 게 아니라 "여기 들어갈 단어를 아는가"를 묻기 때문이다.
    const v = normalize(value);
    const ok = v === normalize(cloze.answer) || v === normalize(entry.word);
    setResult(ok ? 'correct' : 'wrong');
    if (ok) speak(exp.example.en, ttsEnabled);
    onAnswer(ok);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>빈칸에 알맞은 말을 직접 써 보세요</Muted>

      <View style={s.sentenceBox}>
        <Text style={s.sentence}>{cloze.text}</Text>
        {revealed || result !== null ? <Text style={s.hintKo}>{exp.example.ko}</Text> : null}
        {hint > 0 ? (
          <Text style={s.hint}>
            {hint === 1
              ? `${cloze.answer.length}글자`
              : `${cloze.answer[0]}${'_'.repeat(Math.max(0, cloze.answer.length - 1))}`}
          </Text>
        ) : null}
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

      {result === 'wrong' ? <Text style={s.answer}>정답: {cloze.answer}</Text> : null}

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: spacing.lg,
            }}
          >
            {showTranslation && !revealed ? (
              <Pressable onPress={() => setRevealed(true)} accessibilityRole="button" style={s.textBtn}>
                <Text style={s.textBtnLabel}>해석 보기</Text>
              </Pressable>
            ) : null}
            {hint < 2 ? (
              <Pressable onPress={() => setHint((h) => h + 1)} accessibilityRole="button" style={s.textBtn}>
                <Text style={s.textBtnLabel}>힌트 보기</Text>
              </Pressable>
            ) : null}
            <Pressable
              onPress={() => {
                setResult('wrong');
                onAnswer(false);
              }}
              accessibilityRole="button"
              style={s.textBtn}
            >
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

const s = StyleSheet.create({
  sentenceBox: {
    minHeight: 140,
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
  hintKo: { fontSize: font.small, color: colors.subtext, marginTop: spacing.md },
  hint: { fontSize: 18, letterSpacing: 2, color: colors.primary, marginTop: spacing.md, fontWeight: '700' },

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
  choiceText: { fontSize: font.h3, fontWeight: '600', color: colors.text, textAlign: 'center' },
  correct: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  wrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },

  dontKnow: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  dontKnowText: { fontSize: font.small, fontWeight: '600', color: colors.muted },

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

  skip: { marginTop: spacing.lg, alignSelf: 'center', padding: spacing.md },
  skipText: { color: colors.primary, fontWeight: '700' },
});
