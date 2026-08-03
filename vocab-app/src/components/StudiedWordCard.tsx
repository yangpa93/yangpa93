import { useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, Chip, H3, Muted, Row } from './ui';
import { SynonymLine } from './SynonymLine';
import { meaningLine, posLabel, videoUrl } from '../data/entry';
import { speak } from '../lib/feedback';
import { WORD_KIND_LABEL, type StudiedWord } from '../features/studiedWords';
import { colors, font, radius, spacing } from '../theme';

/**
 * 오늘 배운 낱말 한 장. **세 갈래를 한 부품으로 그린다.**
 *
 * ── 왜 하나로 묶었나 ────────────────────────────────────────
 *
 * 부모는 일상 문장 · 영어 단어 · 국어 어휘 셋을 섞어 공부한다. 그런데 오늘
 * 배운 것을 되짚는 자리에서 갈래마다 화면을 따로 두면, "오늘 뭘 배웠나" 하나를
 * 보려고 세 곳을 돌아야 한다. 오늘 한 일은 하나인데 화면이 셋일 이유가 없다.
 *
 * 국어는 생김새가 달라(한자 · 뜻풀이 · 예문) 안쪽만 갈라 그린다. 겉모양 —
 * 표제어 줄, 갈래 표, 틀린 횟수 — 은 같아서 눈이 옮겨 다니지 않는다.
 *
 * ── 틀린 횟수를 왜 앞에 두나 ────────────────────────────────
 *
 * 오늘 목록에서 제일 먼저 눈에 들어와야 할 것은 **틀린 것**이다. 다 맞힌
 * 낱말은 다시 볼 이유가 적다. 그래서 틀린 것에만 붉은 표를 붙이고, 맞힌
 * 것에는 아무 표도 안 붙인다 — 다 맞혔다는 표까지 달면 붉은 표가 묻힌다.
 */
export function StudiedWordCard({ word, ttsEnabled }: { word: StudiedWord; ttsEnabled: boolean }) {
  const [open, setOpen] = useState(false);

  const head = (
    <Row style={{ justifyContent: 'space-between' }}>
      <View style={{ flex: 1 }}>
        <Row style={{ gap: spacing.sm, alignItems: 'center', flexWrap: 'wrap' }}>
          <H3>{word.entry.word}</H3>
          {word.kind === 'ko' ? (
            word.entry.hanja ? <Muted>{word.entry.hanja}</Muted> : null
          ) : (
            <Muted>{posLabel(word.entry.pos)}</Muted>
          )}
        </Row>
        <Muted style={{ marginTop: 2 }} >
          {word.kind === 'ko' ? word.entry.meaning : meaningLine(word.entry)}
        </Muted>
      </View>
      <View style={{ alignItems: 'flex-end', gap: spacing.xs }}>
        <Chip label={WORD_KIND_LABEL[word.kind]} tone="default" />
        {word.wrong > 0 ? <Chip label={`${word.wrong}번 틀림`} tone="wrong" /> : null}
      </View>
    </Row>
  );

  return (
    <Card>
      <Pressable onPress={() => setOpen((v) => !v)} accessibilityRole="button">
        {head}
      </Pressable>

      {open ? (
        <View style={{ marginTop: spacing.md }}>
          {word.kind === 'ko' ? (
            <View>
              <Body style={{ fontWeight: '700' }}>{word.entry.meaning}</Body>
              {word.entry.examples.map((ex, i) => (
                <View key={i} style={{ marginTop: spacing.sm }}>
                  <Text style={s.exKo}>· {ex.text}</Text>
                  {ex.source ? <Text style={s.source}>  — {ex.source}</Text> : null}
                </View>
              ))}
            </View>
          ) : (
            <>
              {word.entry.senses.map((sense, i) => (
                <View key={i} style={{ marginBottom: spacing.md }}>
                  <Body style={{ fontWeight: '700' }}>
                    {i + 1}. {sense.meaning}
                  </Body>
                  <SynonymLine
                    meaning={sense.meaning}
                    synonyms={sense.synonyms}
                    ttsEnabled={ttsEnabled}
                  />
                  {sense.examples.map((ex, j) => (
                    <Pressable
                      key={j}
                      onPress={() => speak(ex.en, ttsEnabled)}
                      style={{ marginTop: spacing.sm }}
                      accessibilityRole="button"
                    >
                      <Text style={s.exEn}>· {ex.en}</Text>
                      <Text style={s.exKo}>  {ex.ko}</Text>
                    </Pressable>
                  ))}
                </View>
              ))}
              <Pressable
                style={s.videoBtn}
                onPress={() => Linking.openURL(videoUrl(word.entry)).catch(() => {})}
                accessibilityRole="button"
              >
                <Text style={s.videoText}>🎬 실제로 쓰이는 영상 보기</Text>
              </Pressable>
            </>
          )}
        </View>
      ) : null}
    </Card>
  );
}

const s = StyleSheet.create({
  exEn: { fontSize: font.small, color: colors.text, lineHeight: 21 },
  exKo: { fontSize: font.small, color: colors.subtext, lineHeight: 21 },
  source: { fontSize: font.tiny, color: colors.muted, marginTop: 2 },
  videoBtn: {
    marginTop: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    alignSelf: 'flex-start',
  },
  videoText: { fontSize: font.small, fontWeight: '700', color: colors.primary },
});
