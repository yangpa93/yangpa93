/**
 * 어순 배열 — 뒤섞인 낱말을 눌러 문장을 만든다.
 *
 * 다른 유형은 전부 "이 단어의 뜻이 무엇인가"를 묻는다. 뜻을 다 알아도
 * 문장을 못 쓰는 아이가 있다. 낱말을 어디에 놓아야 하는지는 따로 익혀야
 * 하고, 시험에도 배열 문제로 그대로 나온다.
 *
 * 한국어 해석을 **처음부터 보여준다.** 다른 유형에서는 감추지만 여기서는
 * 해석이 답이 아니라 문제다 — 무슨 뜻의 문장을 만들어야 하는지 모르면
 * 손댈 수가 없다. 교과서의 배열 문제도 우리말을 먼저 준다.
 */

import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GameProps } from './ClozeGame';
import { shuffle } from '../srs/session';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';
import { tokenize } from './scramble';

export function ScrambleGame({ entry, exp, ttsEnabled, onAnswer }: GameProps) {
  const answer = useMemo(() => tokenize(exp.example.en), [exp.example.en]);

  /**
   * 뒤섞은 조각들. 같은 낱말이 두 번 나올 수 있어(`the`) 자리마다 열쇠를 붙인다.
   * 열쇠가 없으면 같은 낱말을 눌렀을 때 어느 조각인지 가릴 수 없다.
   */
  const pieces = useMemo(() => {
    const numbered = answer.map((word, i) => ({ key: `${i}-${word}`, word }));
    // 우연히 정답 순서 그대로 섞이면 문제가 되지 않는다. 몇 번 다시 섞는다.
    for (let t = 0; t < 8; t++) {
      const mixed = shuffle(numbered);
      if (mixed.some((p, i) => p.word !== answer[i])) return mixed;
    }
    return shuffle(numbered);
  }, [answer]);

  const [placed, setPlaced] = useState<{ key: string; word: string }[]>([]);
  const [result, setResult] = useState<'right' | 'wrong' | null>(null);

  const left = pieces.filter((p) => !placed.some((q) => q.key === p.key));
  const done = placed.length === answer.length;

  function place(p: { key: string; word: string }) {
    if (result) return;
    setPlaced((cur) => [...cur, p]);
  }

  function take(i: number) {
    if (result) return;
    setPlaced((cur) => cur.filter((_, j) => j !== i));
  }

  function check() {
    if (result || !done) return;
    const made = placed.map((p) => p.word).join(' ');
    const ok = made === answer.join(' ');
    setResult(ok ? 'right' : 'wrong');
    if (ok) speak(exp.example.en, ttsEnabled);
    onAnswer(ok);
  }

  return (
    <View style={{ flex: 1 }}>
      <Muted>낱말을 눌러 문장을 만들어 보세요</Muted>

      {/* 무슨 뜻의 문장을 만들지 알려 준다. 이건 답이 아니라 문제다. */}
      <View style={s.koBox}>
        <Text style={s.ko}>{exp.example.ko}</Text>
      </View>

      {/* 만들고 있는 문장 */}
      <View style={[s.line, result === 'right' && s.lineRight, result === 'wrong' && s.lineWrong]}>
        {placed.length === 0 ? (
          <Muted>여기에 낱말이 놓여요</Muted>
        ) : (
          placed.map((p, i) => (
            <Pressable
              key={p.key}
              onPress={() => take(i)}
              accessibilityRole="button"
              accessibilityLabel={`${p.word} 빼기`}
              style={s.placed}
            >
              <Text style={s.placedText}>{p.word}</Text>
            </Pressable>
          ))
        )}
      </View>

      {/* 남은 낱말 */}
      <View style={s.pool}>
        {left.map((p) => (
          <Pressable
            key={p.key}
            onPress={() => place(p)}
            accessibilityRole="button"
            accessibilityLabel={`${p.word} 놓기`}
            style={s.piece}
          >
            <Text style={s.pieceText}>{p.word}</Text>
          </Pressable>
        ))}
      </View>

      {result === null ? (
        <Pressable
          onPress={check}
          disabled={!done}
          accessibilityRole="button"
          style={[s.submit, !done && { opacity: 0.4 }]}
        >
          <Text style={s.submitText}>확인</Text>
        </Pressable>
      ) : (
        <View style={s.answerBox}>
          <Text style={result === 'right' ? s.right : s.wrong}>
            {result === 'right' ? '맞았어요! 🎉' : '이렇게 놓아요'}
          </Text>
          {/* 틀렸을 때만 정답을 보여준다. 맞았으면 이미 화면에 있다. */}
          {result === 'wrong' ? <Text style={s.answerText}>{exp.example.en}</Text> : null}
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  koBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
  },
  ko: { fontSize: font.body, color: colors.text, lineHeight: 24, fontWeight: '600' },

  line: {
    marginTop: spacing.lg,
    minHeight: 76,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.xs,
  },
  lineRight: { borderColor: colors.correct, borderStyle: 'solid' },
  lineWrong: { borderColor: colors.wrong, borderStyle: 'solid' },
  placed: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    backgroundColor: colors.primarySoft,
  },
  placedText: { fontSize: font.body, fontWeight: '700', color: colors.primary },

  pool: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  piece: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pieceText: { fontSize: font.body, fontWeight: '700', color: colors.text },

  submit: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  submitText: { color: '#fff', fontWeight: '800', fontSize: font.body },

  answerBox: { marginTop: spacing.lg, alignItems: 'center' },
  right: { fontSize: font.body, fontWeight: '800', color: colors.correct },
  wrong: { fontSize: font.body, fontWeight: '800', color: colors.wrong },
  answerText: { marginTop: spacing.sm, fontSize: font.body, color: colors.text, textAlign: 'center' },
});
