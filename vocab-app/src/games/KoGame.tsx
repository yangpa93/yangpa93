/**
 * 국어 문제 화면. 유형별로 나누지 않고 한 파일에 모았다.
 *
 *   cloze      예문 빈칸에 알맞은 어휘 고르기
 *   clozeType  빈칸에 직접 쓰기
 *   context    이 낱말이 무슨 뜻인지 (고전은 옛말 → 요즘 말)
 *   scramble   어절을 순서대로 놓아 문장 만들기
 *   hanja      사자성어 한자 고르기 (HanjaGame 에 따로 있다)
 *
 * 영어 쪽은 유형마다 파일이 따로인데, 국어는 지문이 전부 '예문 한 줄'로
 * 같아서 나눌 이유가 없다. 나누면 같은 코드가 다섯 벌 생긴다.
 *
 * **원전에서 가져온 문장에는 출처를 밝힌다.** 사전 용례인지 우리가 만든
 * 문장인지 아이가 알 수 있어야 한다.
 */

import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { GameId, KoEntry } from '../types';
import { koCloze, koExample } from '../data/korean/entry';
import { buildChoices } from '../srs/session';
import { tokenize } from './scramble';
import { HanjaGame } from './HanjaGame';
import { Ask, ExampleInBox, ChoiceButton, Choices, DontKnow, QuestionBox } from './quiz-ui';
import { KoSentence } from '../components/KoSentence';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';

export interface KoGameProps {
  game: GameId;
  entry: KoEntry;
  /** 오답 보기를 뽑아 올 어휘들. 같은 레벨이면 된다. */
  pool: KoEntry[];
  exposureIndex: number;
  onAnswer: (correct: boolean) => void;
}

const DONT_KNOW = '__dontknow__';

export function KoGame(props: KoGameProps) {
  const { game, entry, pool, exposureIndex, onAnswer } = props;

  if (game === 'hanja') {
    return (
      <HanjaGame
        entry={entry}
        pool={pool}
        exampleIndex={exposureIndex}
        onAnswer={onAnswer}
      />
    );
  }
  if (game === 'scramble') return <KoScramble {...props} />;
  if (game === 'clozeType') return <KoType {...props} />;
  if (game === 'context') return <KoContext {...props} />;
  return <KoChoiceCloze {...props} />;
}

/* ------------------------------------------------------------------ */
/* 예문 상자 — 모든 유형이 같이 쓴다                                      */
/* ------------------------------------------------------------------ */

function Sentence({
  text,
  word,
  source,
  gloss,
  showGloss,
}: {
  text: string;
  /** 칠할 낱말. 빈칸 문제에는 넘기지 않는다 — 칠할 자리가 곧 답이다. */
  word?: string;
  source?: string;
  gloss?: string;
  showGloss?: boolean;
}) {
  return (
    <View>
      <KoSentence text={text} word={word} />
      {showGloss && gloss ? <Text style={s.gloss}>{gloss}</Text> : null}
      {/* 사전 용례인지 우리가 만든 문장인지 밝힌다. */}
      {source ? <Text style={s.source}>— {source}</Text> : null}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 빈칸 채우기 (고르기)                                                  */
/* ------------------------------------------------------------------ */

function KoChoiceCloze({ entry, pool, exposureIndex, onAnswer }: KoGameProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const ex = koExample(entry, exposureIndex);
  const blanked = ex ? koCloze(ex.text, entry.word) : null;

  const choices = useMemo(
    () =>
      buildChoices(
        entry,
        // 같은 갈래끼리 겨루게 한다. 사자성어 보기에 수능 어휘가 섞이면
        // 길이만 보고 답이 드러난다.
        pool.filter((e) => e.id !== entry.id && e.category === entry.category),
        (e) => e.word,
        4,
        Math.random,
        (e) => [e.word, e.meaning],
      ),
    [entry.id, pool],
  );

  function choose(key: string) {
    if (picked) return;
    setPicked(key);
    onAnswer(key === entry.id);
  }

  if (!ex || !blanked) return null;

  return (
    <View style={{ flex: 1 }}>
      <Ask>빈칸에 알맞은 말을 고르세요</Ask>

      <QuestionBox>
        {/* 빈칸 문제에는 낱말을 칠하지 않는다 — 칠할 자리가 곧 답이다. */}
        <Sentence text={blanked.text} source={ex.source} />
      </QuestionBox>

      <Choices>
        {choices.map((c, i) => (
          <ChoiceButton
            key={c.id}
            index={i}
            label={c.word}
            correct={c.id === entry.id}
            picked={picked}
            self={c.id}
            onPress={() => choose(c.id)}
          />
        ))}
        <DontKnow picked={picked} onPress={() => choose(DONT_KNOW)} />
      </Choices>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 뜻 고르기                                                            */
/* ------------------------------------------------------------------ */

function KoContext({ entry, pool, exposureIndex, onAnswer }: KoGameProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const ex = koExample(entry, exposureIndex);

  const choices = useMemo(
    () =>
      buildChoices(
        entry,
        pool.filter((e) => e.id !== entry.id && e.category === entry.category),
        (e) => e.meaning,
        4,
        Math.random,
        (e) => [e.meaning],
      ),
    [entry.id, pool],
  );

  function choose(key: string) {
    if (picked) return;
    setPicked(key);
    onAnswer(key === entry.id);
  }

  return (
    <View style={{ flex: 1 }}>
      <Ask>
        {entry.category === 'classic' ? '이 옛말은 요즘 말로 무슨 뜻일까요' : '이 말은 무슨 뜻일까요'}
      </Ask>

      <QuestionBox>
        <Text style={s.word}>{entry.word}</Text>
        {entry.hanja ? <Text style={s.hanja}>{entry.hanja}</Text> : null}
        {ex ? (
          <ExampleInBox>
            <Sentence text={ex.text} word={entry.word} source={ex.source} />
          </ExampleInBox>
        ) : null}
      </QuestionBox>

      <Choices>
        {choices.map((c, i) => (
          <ChoiceButton
            key={c.id}
            index={i}
            label={c.meaning}
            correct={c.id === entry.id}
            picked={picked}
            self={c.id}
            onPress={() => choose(c.id)}
          />
        ))}
        <DontKnow picked={picked} onPress={() => choose(DONT_KNOW)} />
      </Choices>
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 빈칸에 직접 쓰기                                                      */
/* ------------------------------------------------------------------ */

function KoType({ entry, exposureIndex, onAnswer }: KoGameProps) {
  const [text, setText] = useState('');
  const [done, setDone] = useState<boolean | null>(null);

  const ex = koExample(entry, exposureIndex);
  const blanked = ex ? koCloze(ex.text, entry.word) : null;

  function submit() {
    if (done !== null) return;
    // 띄어쓰기만 다른 것을 틀렸다고 하면 아이가 억울하다.
    const ok = text.replace(/\s+/g, '') === entry.word.replace(/\s+/g, '');
    setDone(ok);
    onAnswer(ok);
  }

  if (!ex || !blanked) return null;

  return (
    <View style={{ flex: 1 }}>
      <Ask>빈칸에 알맞은 말을 쓰세요</Ask>

      <QuestionBox>
        <Sentence text={blanked.text} source={ex.source} />
      </QuestionBox>

      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={submit}
        editable={done === null}
        placeholder="여기에 쓰세요"
        placeholderTextColor={colors.muted}
        style={[
          s.input,
          done === true && s.inputCorrect,
          done === false && s.inputWrong,
        ]}
        autoCorrect={false}
        accessibilityLabel="답 입력"
      />

      {done === null ? (
        <Pressable onPress={submit} style={s.submit} accessibilityRole="button">
          <Text style={s.submitText}>확인</Text>
        </Pressable>
      ) : (
        <Text style={s.answer}>{entry.word}</Text>
      )}
    </View>
  );
}

/* ------------------------------------------------------------------ */
/* 어순 배열                                                            */
/* ------------------------------------------------------------------ */

function KoScramble({ entry, exposureIndex, onAnswer }: KoGameProps) {
  const ex = koExample(entry, exposureIndex);
  const answer = useMemo(() => (ex ? tokenize(ex.text) : []), [ex?.text]);
  // 섞은 조각. 한 번 정해지면 다시 섞지 않는다.
  const [tiles] = useState(() => shuffleWords(answer));
  const [placed, setPlaced] = useState<number[]>([]);
  const [done, setDone] = useState<boolean | null>(null);

  function tap(i: number) {
    if (done !== null || placed.includes(i)) return;
    const next = [...placed, i];
    setPlaced(next);
    if (next.length === tiles.length) {
      const ok = next.map((k) => tiles[k]).join(' ') === answer.join(' ');
      setDone(ok);
      onAnswer(ok);
    }
  }

  if (!ex || answer.length === 0) return null;

  return (
    <View style={{ flex: 1 }}>
      <Ask>말을 순서대로 놓아 문장을 만드세요</Ask>

      <View style={{ marginTop: spacing.md }}>
        <View style={s.answerBox}>
          <Text style={s.sentence}>
            {placed.map((k) => tiles[k]).join(' ') || ' '}
          </Text>
        </View>
        {ex.source ? <Text style={s.source}>— {ex.source}</Text> : null}
      </View>

      <View style={s.tileRow}>
        {tiles.map((w, i) => (
          <Pressable
            key={`${w}-${i}`}
            onPress={() => tap(i)}
            disabled={placed.includes(i) || done !== null}
            style={[s.tile, placed.includes(i) && s.tileUsed]}
            accessibilityRole="button"
          >
            <Text style={s.tileText}>{w}</Text>
          </Pressable>
        ))}
      </View>

      {placed.length > 0 && done === null ? (
        <Pressable onPress={() => setPlaced([])} style={s.reset} accessibilityRole="button">
          <Text style={s.resetText}>다시 놓기</Text>
        </Pressable>
      ) : null}

      {done === false ? (
        <Pressable
          style={s.answerLine}
          accessibilityRole="button"
        >
          <Text style={s.answer}>{ex.text}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

function shuffleWords(words: string[]): string[] {
  const out = [...words];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  // 우연히 원래 순서 그대로 나오면 문제가 되지 않는다.
  return out.join(' ') === words.join(' ') && words.length > 1 ? shuffleWords(words) : out;
}

/* ------------------------------------------------------------------ */
/* 같이 쓰는 조각                                                        */
/* ------------------------------------------------------------------ */

const s = StyleSheet.create({
  /* 예문은 상자 안에서도 한 칸 더 들여 문제와 구별되게 한다. */
  exampleBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  exampleTag: {
    fontSize: font.tiny,
    fontWeight: '700',
    color: colors.muted,
    marginBottom: spacing.xs,
  },
  answerBox: {
    width: '100%',
    minHeight: 72,
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    justifyContent: 'center',
  },
  sentence: { fontSize: font.h3, color: colors.text, lineHeight: 30 },
  gloss: { fontSize: font.small, color: colors.subtext, marginTop: spacing.md },
  source: { fontSize: font.tiny, color: colors.muted, marginTop: spacing.sm, textAlign: 'right' },
  word: { fontSize: font.h1, fontWeight: '800', color: colors.text, textAlign: 'center' },
  hanja: { fontSize: font.h3, color: colors.subtext, textAlign: 'center', letterSpacing: 3 },
  choice: {
    minHeight: 56,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
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
  dontKnowText: { fontSize: font.small, fontWeight: '600', color: colors.muted },
  input: {
    minHeight: 60,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.lg,
    fontSize: font.h3,
    color: colors.text,
    textAlign: 'center',
  },
  inputCorrect: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  inputWrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
  submit: {
    marginTop: spacing.md,
    minHeight: 52,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: { color: '#fff', fontSize: font.h3, fontWeight: '800' },
  answer: {
    marginTop: spacing.md,
    fontSize: font.h3,
    fontWeight: '700',
    color: colors.correct,
    textAlign: 'center',
  },
  answerLine: { marginTop: spacing.md },
  tileRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, justifyContent: 'center' },
  tile: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
  },
  tileUsed: { opacity: 0.25 },
  tileText: { fontSize: font.h3, color: colors.text },
  reset: { marginTop: spacing.lg, alignItems: 'center', padding: spacing.sm },
  resetText: { fontSize: font.small, fontWeight: '700', color: colors.muted },
});
