/**
 * 단어 카드. **문제를 푼 직후**에 뜬다. 정답이든 오답이든 매번.
 *
 * 한 단어는 두 단계로 만난다. ① 문제를 푼다 → ② 이 카드로 확인한다.
 * 카드를 문제보다 먼저 보여주면 방금 읽은 것을 그대로 되묻는 꼴이라,
 * 아이는 스스로 떠올려 볼 기회 없이 베껴 답하게 된다. 그래서 처음 만나는
 * 단어라도 먼저 풀어 보게 하고, 답을 낸 뒤에 이 카드에서 배우게 한다.
 *
 * **모든 뜻과 모든 예문을 처음부터 펼쳐 놓는다.** 접어 두고 버튼을 눌러야
 * 보이면 아이는 대부분 누르지 않는다. 오늘 다루는 뜻만 강조하고
 * 나머지 뜻도 바로 아래에 이어 붙여, 한 화면에서 다의어를 함께 보게 한다.
 *
 * 오늘의 예문은 한 글자씩 타이핑되며 표제어에 형광펜이 그어지고,
 * 다 찍히면 소리로 읽어 준다.
 */

import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { VocabEntry } from '../types';
import { Exposure, posLabel, SYNONYM_LABEL, synonymLine, videoUrl } from '../data/entry';
import { variantOf } from '../data/spelling';
import { speak, stopSpeaking } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { Button, Chip, Muted, Row } from './ui';
import { HighlightedSentence } from './HighlightedSentence';

const TYPE_MS = 26;

export function WordStoryCard({
  entry,
  exp,
  correct,
  firstTime,
  ttsEnabled,
  onNext,
  nextLabel,
}: {
  entry: VocabEntry;
  exp: Exposure;
  correct?: boolean;
  /** 이번 세션에서 처음 만난 단어인지. 맞고 틀리고보다 이쪽이 더 중요한 신호다. */
  firstTime?: boolean;
  ttsEnabled: boolean;
  onNext: () => void;
  nextLabel: string;
}) {
  const [typed, setTyped] = useState(0);

  const variant = variantOf(entry.word);
  const slide = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;

  const sentence = exp.example.en;

  useEffect(() => {
    slide.setValue(0);
    pop.setValue(0);
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 1,
        duration: 240,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }),
    ]).start();
  }, [entry.id, slide, pop]);

  // 오늘의 예문을 한 글자씩 흘려 보여준다.
  useEffect(() => {
    setTyped(0);
    const timer = setInterval(() => {
      setTyped((n) => {
        if (n >= sentence.length) {
          clearInterval(timer);
          return n;
        }
        return n + 1;
      });
    }, TYPE_MS);
    return () => clearInterval(timer);
  }, [sentence]);

  // 타이핑이 끝나면 문장을 읽어 준다.
  useEffect(() => {
    if (typed >= sentence.length && sentence.length > 0) speak(sentence, ttsEnabled);
  }, [typed, sentence, ttsEnabled]);

  useEffect(() => () => stopSpeaking(), []);

  async function openVideo() {
    const url = videoUrl(entry);
    const ok = await Linking.canOpenURL(url).catch(() => false);
    if (ok) await Linking.openURL(url).catch(() => {});
  }

  return (
    <Animated.View
      style={[
        s.wrap,
        {
          opacity: slide,
          transform: [{ translateY: slide.interpolate({ inputRange: [0, 1], outputRange: [20, 0] }) }],
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.lg }}>
        <Animated.View style={{ transform: [{ scale: pop }] }}>
          <Row style={{ gap: spacing.sm, flexWrap: 'wrap' }}>
            <Chip label={correct ? '✅ 정답!' : '💪 다시 만나요'} tone={correct ? 'correct' : 'wrong'} />
            {firstTime ? <Chip label="✨ 처음 만나는 단어" tone="accent" /> : null}
          </Row>
        </Animated.View>

        {firstTime && !correct ? (
          // 본 적 없는 단어를 틀린 것은 당연하다. 여기서 배우면 된다.
          <Muted style={{ marginTop: spacing.sm }}>
            처음 보는 단어라 몰라도 괜찮아요. 지금 익히고, 오늘 안에 다시 만나요.
          </Muted>
        ) : null}

        <Row style={{ marginTop: spacing.md, alignItems: 'flex-end' }}>
          <Text style={s.word}>{entry.word}</Text>
          <Pressable
            onPress={() => speak(entry.word, ttsEnabled)}
            style={s.iconBtn}
            accessibilityRole="button"
            accessibilityLabel="단어 듣기"
          >
            <Text style={{ fontSize: 22 }}>🔊</Text>
          </Pressable>
        </Row>
        <Row style={{ gap: spacing.sm }}>
          <Muted>{posLabel(entry.pos)}</Muted>
          {entry.senses.length > 1 ? (
            <Muted style={{ color: colors.accent, fontWeight: '700' }}>
              뜻이 {entry.senses.length}개예요
            </Muted>
          ) : null}
        </Row>

        {/*
          영국식·미국식 짝 알려 주기.
          교육부 목록에 airplane과 aeroplane이 둘 다 있어서 우리 어휘에도
          둘 다 있다. 짚어 주지 않으면 아이는 서로 다른 단어로 외우거나,
          오타라고 생각한다(베타에서 실제로 그랬다).
        */}
        {variant ? (
          <View style={s.variantBox}>
            <Text style={s.variantHead}>
              {variant.side === 'br' ? '🇬🇧 영국식' : '🇺🇸 미국식'} · 짝은 {variant.other}
            </Text>
            <Text style={s.variantText}>{variant.text}</Text>
          </View>
        ) : null}

        {/* 오늘 배우는 뜻 — 예문이 타이핑된다 */}
        <View style={s.todayBox}>
          <Muted style={{ color: colors.primary, fontWeight: '800' }}>오늘 배우는 뜻</Muted>
          <Text style={s.meaning}>{exp.sense.meaning}</Text>
          {exp.sense.synonyms.length > 0 ? (
            <View style={{ marginTop: spacing.sm }}>
              <Muted>{SYNONYM_LABEL}</Muted>
              <Row style={{ marginTop: spacing.xs, gap: spacing.xs, flexWrap: 'wrap' }}>
                {exp.sense.synonyms.map((syn) => (
                  <View key={syn} style={s.syn}>
                    <Text style={s.synText}>{syn}</Text>
                  </View>
                ))}
              </Row>
            </View>
          ) : null}

          <Pressable
            style={s.exampleBox}
            onPress={() => speak(sentence, ttsEnabled)}
            accessibilityRole="button"
            accessibilityLabel="예문 듣기"
          >
            <HighlightedSentence text={sentence.slice(0, typed)} word={entry.word} />
            {typed >= sentence.length ? <Text style={s.exampleKo}>{exp.example.ko}</Text> : null}
          </Pressable>
        </View>

        {/* 나머지 뜻과 예문 — 전부 펼쳐서 보여준다 */}
        <View style={{ marginTop: spacing.lg }}>
          <Muted style={{ fontWeight: '800' }}>
            {entry.senses.length > 1 ? '이 단어의 모든 뜻과 쓰임' : '다른 문장에서는'}
          </Muted>

          {entry.senses.map((sense, si) => {
            const isToday = si === exp.senseIndex;
            return (
              <View key={si} style={[s.senseBlock, isToday && s.senseBlockToday]}>
                <Row style={{ gap: spacing.sm, flexWrap: 'wrap' }}>
                  <Text style={[s.senseTitle, isToday && { color: colors.primary }]}>
                    {entry.senses.length > 1 ? `${si + 1}. ` : ''}
                    {sense.meaning}
                  </Text>
                  {isToday ? <Chip label="오늘" tone="primary" /> : null}
                </Row>

                {sense.synonyms.length > 0 ? (
                  <Muted style={{ marginTop: 2 }}>{synonymLine(sense.synonyms)}</Muted>
                ) : null}

                {sense.examples.map((ex, ei) => (
                  <Pressable
                    key={ei}
                    onPress={() => speak(ex.en, ttsEnabled)}
                    style={s.exRow}
                    accessibilityRole="button"
                    accessibilityLabel={`예문 듣기: ${ex.en}`}
                  >
                    <HighlightedSentence
                      text={ex.en}
                      word={entry.word}
                      style={s.exEn}
                      hitStyle={{ color: colors.accent, fontWeight: '800' }}
                    />
                    <Text style={s.exKo}>{ex.ko}</Text>
                  </Pressable>
                ))}
              </View>
            );
          })}
        </View>

        <Pressable style={s.videoBtn} onPress={openVideo} accessibilityRole="button">
          <Text style={s.videoText}>🎬 실제로 쓰이는 영상 보기</Text>
        </Pressable>
      </ScrollView>

      <Button title={nextLabel} onPress={onNext} style={{ marginTop: spacing.md }} />
    </Animated.View>
  );
}

const s = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  word: { fontSize: 34, fontWeight: '800', color: colors.text },
  iconBtn: { marginLeft: spacing.md, paddingBottom: spacing.xs },

  todayBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
  },
  meaning: { fontSize: font.h2, fontWeight: '800', color: colors.primary, marginTop: 2 },
  variantBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  variantHead: { fontSize: font.small, fontWeight: '800', color: colors.text },
  variantText: { fontSize: font.small, color: colors.subtext, marginTop: 2, lineHeight: 20 },
  syn: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.sm,
    backgroundColor: colors.card,
  },
  synText: { fontSize: font.small, color: colors.primary, fontWeight: '600' },

  exampleBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.md,
    minHeight: 90,
  },
  exampleKo: { fontSize: font.small, color: colors.subtext, marginTop: spacing.sm },

  senseBlock: {
    marginTop: spacing.md,
    paddingLeft: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.border,
  },
  senseBlockToday: { borderLeftColor: colors.primary },
  senseTitle: { fontSize: font.body, fontWeight: '700', color: colors.text },
  exRow: { marginTop: spacing.sm },
  exEn: { fontSize: font.body, lineHeight: 22 },
  exKo: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },

  videoBtn: {
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
  },
  videoText: { color: '#B45309', fontWeight: '700' },
});
