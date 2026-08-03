/**
 * 문장을 보여주고 보기에서 고르는 문제들.
 *
 *   context   이 문장에서 그 단어가 무슨 뜻인지
 *   polysemy  다의어: 여러 뜻 중 이 문장에서 쓰인 뜻 (보기가 전부 그 단어의 뜻이라 가장 어렵다)
 *   synonym   문맥에 맞게 바꿔 쓸 수 있는 표현
 *   antonym   그 단어와 뜻이 반대인 표현
 *
 * 넷 다 지문이 문장이다. 단어만 덩그러니 보여주는 문제는 두지 않았다.
 * 빈칸 채우기는 ClozeGame에 따로 있다.
 *
 * **오답 보기는 이미 배운 단어에서 먼저 뽑는다.** 처음 보는 단어가 보기에
 * 섞이면 아이는 뜻을 견주는 대신 "아는 단어 하나"를 찍게 된다. 배운 단어끼리
 * 겨루게 해야 유의어·반대말이 실제로 시험된다. 배운 단어가 아직 적으면
 * 그 레벨 단어로 채운다.
 *
 * 모든 문항에 "모르겠어요" 보기를 둔다. 찍어서 맞히면 학습 데이터가
 * 오염되기 때문이다. 누르면 오답으로 기록하되 정답을 바로 보여 준다.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { GameId, VocabEntry } from '../types';
import { exposure, Exposure, primaryMeaning } from '../data/entry';
import { antonymsOf } from '../data/antonyms';
import type { GameProps } from './ClozeGame';
import { buildChoices, meaningKeys, shuffle } from '../srs/session';
import { Ask, ChoiceButton, Choices, DontKnow, QuestionBox } from './quiz-ui';
import { speak } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { Muted } from '../components/ui';
import { HighlightedSentence } from '../components/HighlightedSentence';
import { RevealKo } from './RevealKo';

export type ChoiceGameId = Extract<GameId, 'context' | 'polysemy' | 'synonym' | 'antonym'>;

export type { GameProps } from './ClozeGame';

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
  learned,
  ttsEnabled,
  showTranslation,
  onAnswer,
}: GameProps & { game: ChoiceGameId }) {
  const [picked, setPicked] = useState<string | null>(null);
  /** 아이가 '해석 보기'를 눌렀는지. 한 번 열면 그 문제 동안 계속 보인다. */
  const [revealed, setRevealed] = useState(false);

  const choices = useMemo(
    () => buildOptions(game, entry, exp, pool, learned ?? []),
    // 문항이 바뀔 때만 보기를 다시 뽑는다. 오답을 눌렀다고 보기가 섞이면 안 된다.
    [game, entry.id, exp.senseIndex, exp.exampleIndex, pool, learned],
  );

  /** 해석에 정답이 들어 있는 유형은 열어 줄 수 없다. */
  const canReveal = game === 'synonym' || game === 'antonym';

  function choose(key: string, correct: boolean) {
    if (picked) return;
    setPicked(key);
    onAnswer(correct);
  }

  return (
    <View style={{ flex: 1 }}>
      <Ask>{PROMPT[game]}</Ask>

      <QuestionBox>
        <Stem entry={entry} exp={exp} ttsEnabled={ttsEnabled} showKo={picked !== null || revealed} />
      </QuestionBox>

      {/*
        '문맥 속 뜻'은 보기가 곧 한국어 뜻이라 해석을 보여주면 답이 그대로
        드러난다("I have a few questions."의 해석에 '몇 개'가 들어 있다).
        그래서 이 유형만 버튼을 내주지 않는다.

        '바꿔 쓰기'와 '반대말'은 정답이 영어 표현이라 해석을 봐도 답이
        드러나지 않는다. 예전에는 이 둘의 해석을 **처음부터 띄우고** 있었는데,
        그러면 아이가 영어 문장을 읽지 않는다. 빈칸 채우기와 똑같이
        눌렀을 때만 보여준다.
      */}
      {canReveal && showTranslation && !revealed && picked === null ? (
        <RevealKo onPress={() => setRevealed(true)} />
      ) : null}

      <Choices>
        {choices.map((c, i) => (
          <ChoiceButton
            key={c.key}
            index={i}
            label={c.label}
            correct={c.correct}
            picked={picked}
            self={c.key}
            onPress={() => choose(c.key, c.correct)}
          />
        ))}
        <DontKnow picked={picked} onPress={() => choose(DONT_KNOW, false)} />
      </Choices>
    </View>
  );
}

/** 세 유형 모두 예문을 지문으로 쓴다. */
function Stem({
  entry,
  exp,
  ttsEnabled,
  showKo,
}: {
  entry: VocabEntry;
  exp: Exposure;
  ttsEnabled: boolean;
  showKo: boolean;
}) {
  return (
    <Pressable
      style={s.sentenceBox}
      onPress={() => speak(exp.example.en, ttsEnabled)}
      accessibilityRole="button"
      accessibilityLabel="문장 듣기"
    >
      <HighlightedSentence text={exp.example.en} word={entry.word} />
      {showKo ? <Text style={s.sentenceKo}>{exp.example.ko}</Text> : null}
    </Pressable>
  );
}

const PROMPT: Record<ChoiceGameId, string> = {
  context: '색칠한 단어는 여기서 무슨 뜻일까요?',
  polysemy: '이 단어는 뜻이 여러 개예요. 이 문장에서는?',
  synonym: '색칠한 단어를 바꿔 쓸 수 있는 표현은?',
  antonym: '색칠한 단어와 뜻이 반대인 것은?',
};

function distractorPool(pool: VocabEntry[], learned: VocabEntry[], exclude: string): VocabEntry[] {
  const seen = new Set([exclude]);
  const out: VocabEntry[] = [];
  for (const e of [...learned, ...pool]) {
    if (seen.has(e.id)) continue;
    seen.add(e.id);
    out.push(e);
  }
  return out;
}

function buildOptions(
  game: ChoiceGameId,
  entry: VocabEntry,
  exp: Exposure,
  pool: VocabEntry[],
  learned: VocabEntry[],
): Choice[] {
  const others = distractorPool(pool, learned, entry.id);

  // 다의어 구별: 보기가 전부 '이 단어'의 뜻이다.
  // 문장을 제대로 읽지 않으면 고를 수 없어서 가장 어렵다.
  if (game === 'polysemy') {
    const own = entry.senses.map((sense, i) => ({
      key: `s${i}`,
      label: sense.meaning,
      correct: i === exp.senseIndex,
    }));
    // 뜻이 2개뿐이면 다른 단어의 뜻을 섞어 보기를 4개로 채운다.
    // 채우는 뜻이 이 단어의 어떤 뜻과도 겹치면 안 된다 — 겹치면 그것도 정답이다.
    if (own.length < 4) {
      const ownKeys = new Set(own.flatMap((o) => meaningKeys(o.label)).map((k) => k.toLowerCase()));
      const fillers = others
        .slice(0, 80)
        .map((e) => ({ key: e.id, label: primaryMeaning(e), correct: false }))
        .filter((c) => !meaningKeys(c.label).some((k) => ownKeys.has(k.toLowerCase())));
      return shuffle([...own, ...fillers.slice(0, 4 - own.length)]);
    }
    return shuffle(own).slice(0, 4);
  }

  if (game === 'context') {
    // 정답은 지금 노출 중인 뜻. 다의어라도 그날 배운 뜻을 묻는다.
    // 뜻이 한 조각이라도 겹치는 단어는 보기에서 뺀다. '목표'와
    // '목표, 목적'이 나란히 있으면 아이가 무엇을 골라도 맞다.
    const picked = buildChoices(
      { key: entry.id, label: exp.sense.meaning },
      others.map((e) => ({ key: e.id, label: primaryMeaning(e) })),
      (c) => c.label,
      4,
      Math.random,
      (c) => meaningKeys(c.label),
    );
    return picked.map((c) => ({ ...c, correct: c.key === entry.id }));
  }

  if (game === 'antonym') {
    // 정답은 이 단어의 반대말. 반대말 표에 실린 것은 모두 우리 어휘 안의
    // 단어라, 아이가 배웠거나 앞으로 배울 단어끼리 겨루게 된다.
    const answer = antonymsOf(entry.word)[0] ?? entry.word;
    // 오답에 이 단어의 다른 반대말이나 동의어가 섞이면 정답이 둘이 된다.
    const banned = new Set(
      [entry.word, ...antonymsOf(entry.word), ...entry.senses.flatMap((s) => s.synonyms)].map((w) =>
        w.toLowerCase(),
      ),
    );
    // 반대말의 뜻 — 이것과 같은 뜻의 단어가 오답에 있으면 정답이 둘이 된다.
    const answerEntry = others.find((e) => e.word.toLowerCase() === answer.toLowerCase());
    const answerMeaning = answerEntry ? primaryMeaning(answerEntry) : '';

    const distractors = others
      .map((e) => ({ key: e.id, label: e.word, meaning: primaryMeaning(e) }))
      .filter((c) => !banned.has(c.label.toLowerCase()));

    const picked = buildChoices(
      { key: entry.id, label: answer, meaning: answerMeaning },
      distractors,
      (c) => c.label,
      4,
      Math.random,
      // 낱말이 겹치는 것은 물론, 반대말과 **뜻이 같은** 단어도 뺀다.
      (c) => [c.label.toLowerCase(), ...meaningKeys(c.meaning)],
    );
    return picked.map((c) => ({ ...c, correct: c.key === entry.id }));
  }

  // synonym: 정답은 이 뜻의 동의어, 오답은 다른 단어들의 동의어
  const answer = exp.sense.synonyms[0] ?? entry.word;
  // 이 단어의 반대말이 보기에 있으면 안 된다. 바꿔 쓸 표현을 묻는데
  // 정반대 뜻이 섞여 있으면 문제가 아니라 함정이 된다.
  const banned = new Set(
    [answer, entry.word, ...antonymsOf(entry.word)].map((w) => w.toLowerCase()),
  );
  const distractors = others
    .map((e) => {
      const otherExp = exposure(e, 0);
      return {
        key: e.id,
        label: otherExp.sense.synonyms[0] ?? e.word,
        meaning: otherExp.sense.meaning,
      };
    })
    .filter((c) => !banned.has(c.label.toLowerCase()));

  // 뜻이 겹치는 표현은 바꿔 써도 말이 되므로 오답이 될 수 없다.
  const picked = buildChoices(
    { key: entry.id, label: answer, meaning: exp.sense.meaning },
    distractors,
    (c) => c.label,
    4,
    Math.random,
    (c) => [c.label.toLowerCase(), ...meaningKeys(c.meaning)],
  );
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
