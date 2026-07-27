/**
 * 문제를 푼 직후 뜨는 '단어 스토리' 카드.
 *
 * 정답/오답과 상관없이 매번 띄운다. 문제를 맞혔는지보다 그 단어를
 * 한 번 더, 다른 문장으로 만나게 하는 게 목적이다.
 *
 *  - 예문이 한 글자씩 타이핑되면서 표제어에 형광펜이 그어진다.
 *  - 🔊 를 누르면 문장을 읽어 준다.
 *  - '영상으로 보기'는 그 단어가 실제로 발화되는 유튜브 구간(YouGlish)으로 보낸다.
 *  - 다른 뜻·다른 예문도 접어서 같이 보여 준다.
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
import { Exposure, videoUrl, wordForms } from '../data/entry';
import { speak, stopSpeaking } from '../lib/feedback';
import { colors, font, radius, spacing } from '../theme';
import { Button, Chip, Muted, Row } from './ui';

const TYPE_MS = 28;

export function WordStoryCard({
  entry,
  exp,
  correct,
  ttsEnabled,
  onNext,
  isLast,
}: {
  entry: VocabEntry;
  exp: Exposure;
  correct: boolean;
  ttsEnabled: boolean;
  onNext: () => void;
  isLast: boolean;
}) {
  const [typed, setTyped] = useState(0);
  const [showMore, setShowMore] = useState(false);

  const slide = useRef(new Animated.Value(0)).current;
  const pop = useRef(new Animated.Value(0)).current;

  const sentence = exp.example.en;

  useEffect(() => {
    slide.setValue(0);
    pop.setValue(0);
    Animated.parallel([
      Animated.timing(slide, {
        toValue: 1,
        duration: 260,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(pop, { toValue: 1, friction: 5, tension: 120, useNativeDriver: true }),
    ]).start();
  }, [entry.id, slide, pop]);

  // 예문을 한 글자씩 흘려 보여준다.
  useEffect(() => {
    setTyped(0);
    setShowMore(false);
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
    if (typed >= sentence.length && sentence.length > 0) {
      speak(sentence, ttsEnabled);
    }
  }, [typed, sentence, ttsEnabled]);

  useEffect(() => () => stopSpeaking(), []);

  async function openVideo() {
    const url = videoUrl(entry);
    const ok = await Linking.canOpenURL(url).catch(() => false);
    if (ok) await Linking.openURL(url).catch(() => {});
  }

  const otherExamples = entry.senses
    .flatMap((sense, si) =>
      sense.examples.map((ex, ei) => ({ sense, ex, si, ei })),
    )
    .filter((x) => !(x.si === exp.senseIndex && x.ei === exp.exampleIndex));

  return (
    <Animated.View
      style={[
        s.wrap,
        {
          opacity: slide,
          transform: [{ translateY: slide.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) }],
        },
      ]}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.lg }}>
        <Animated.View style={{ transform: [{ scale: pop }] }}>
          <Chip label={correct ? '✅ 정답!' : '💪 다시 만나요'} tone={correct ? 'correct' : 'wrong'} />
        </Animated.View>

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
        <Muted>{entry.pos}</Muted>

        {/* 오늘 배우는 뜻 */}
        <View style={s.senseBox}>
          <Text style={s.meaning}>{exp.sense.meaning}</Text>
          {exp.sense.synonyms.length > 0 ? (
            <Row style={{ marginTop: spacing.sm, gap: spacing.xs, flexWrap: 'wrap' }}>
              <Muted>같은 뜻: </Muted>
              {exp.sense.synonyms.map((syn) => (
                <View key={syn} style={s.syn}>
                  <Text style={s.synText}>{syn}</Text>
                </View>
              ))}
            </Row>
          ) : null}
        </View>

        {/* 타이핑되는 예문 */}
        <Pressable
          style={s.exampleBox}
          onPress={() => speak(sentence, ttsEnabled)}
          accessibilityRole="button"
          accessibilityLabel="예문 듣기"
        >
          <Highlighted text={sentence.slice(0, typed)} word={entry.word} />
          {typed >= sentence.length ? <Text style={s.exampleKo}>{exp.example.ko}</Text> : null}
        </Pressable>

        <Row style={{ gap: spacing.sm, marginTop: spacing.md }}>
          <Pressable style={s.videoBtn} onPress={openVideo} accessibilityRole="button">
            <Text style={s.videoText}>🎬 영상으로 보기</Text>
          </Pressable>
          {otherExamples.length > 0 ? (
            <Pressable
              style={s.moreBtn}
              onPress={() => setShowMore((v) => !v)}
              accessibilityRole="button"
            >
              <Text style={s.moreText}>
                {showMore ? '접기' : `다른 예문 ${otherExamples.length}개`}
              </Text>
            </Pressable>
          ) : null}
        </Row>

        {showMore ? (
          <View style={s.moreBox}>
            {entry.senses.map((sense, si) => (
              <View key={si} style={{ marginBottom: spacing.md }}>
                <Text style={s.moreSense}>
                  {si + 1}. {sense.meaning}
                  {sense.synonyms.length > 0 ? `  (= ${sense.synonyms.join(', ')})` : ''}
                </Text>
                {sense.examples.map((ex, ei) => (
                  <Pressable
                    key={ei}
                    onPress={() => speak(ex.en, ttsEnabled)}
                    style={s.moreEx}
                    accessibilityRole="button"
                  >
                    <Text style={s.moreExEn}>· {ex.en}</Text>
                    <Text style={s.moreExKo}>  {ex.ko}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <Button title={isLast ? '결과 보기' : '다음 문제'} onPress={onNext} style={{ marginTop: spacing.md }} />
    </Animated.View>
  );
}

/** 예문 안의 표제어(굴절형 포함)에 형광펜을 긋는다. */
function Highlighted({ text, word }: { text: string; word: string }) {
  const forms = wordForms(word);
  const pattern = forms.map(escapeRegExp).join('|');
  const parts = pattern ? text.split(new RegExp(`\\b(${pattern})\\b`, 'gi')) : [text];

  return (
    <Text style={s.example}>
      {parts.map((part, i) => {
        const hit = forms.some((f) => f.toLowerCase() === part.toLowerCase());
        return hit ? (
          <Text key={i} style={s.exampleHit}>
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        );
      })}
    </Text>
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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

  senseBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.md,
  },
  meaning: { fontSize: font.h3, fontWeight: '700', color: colors.primary },
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
    backgroundColor: colors.bg,
    borderRadius: radius.md,
    minHeight: 96,
  },
  example: { fontSize: 18, lineHeight: 28, color: colors.text },
  exampleHit: { color: colors.accent, fontWeight: '800' },
  exampleKo: { fontSize: font.small, color: colors.subtext, marginTop: spacing.sm },

  videoBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
  },
  videoText: { color: '#B45309', fontWeight: '700' },
  moreBtn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
  moreText: { color: colors.subtext, fontWeight: '700' },

  moreBox: { marginTop: spacing.md },
  moreSense: { fontSize: font.body, fontWeight: '700', color: colors.text, marginBottom: spacing.sm },
  moreEx: { marginBottom: spacing.sm },
  moreExEn: { fontSize: font.body, color: colors.text, lineHeight: 22 },
  moreExKo: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },
});
