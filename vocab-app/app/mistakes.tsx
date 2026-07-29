import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { allSynonyms, posLabel, synonymSentence, videoUrl } from '../src/data/entry';
import { troubleWords } from '../src/srs/progress';
import { speak } from '../src/lib/feedback';
import { colors, font, radius, spacing } from '../src/theme';

/** 자주 틀린 단어를 모아 보는 오답 노트. 뜻·동의어·예문을 펼쳐 볼 수 있다. */
export default function Mistakes() {
  const { profile, data } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(() => troubleWords(ALL_ENTRIES, data.cards, 50), [data.cards]);

  if (!profile) return null;

  if (list.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="🌟"
          title="아직 틀린 단어가 없어요"
          hint="공부를 시작하면 틀린 단어가 여기에 모여요."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>
        많이 틀린 순서예요. 이 단어들이 매일 학습에 우선해서 다시 나옵니다.
      </Muted>

      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        {list.map(({ entry, card }) => {
          const open = openId === entry.id;
          const total = card.correct + card.wrong;
          const rate = total === 0 ? 0 : Math.round((card.correct / total) * 100);

          return (
            <Card key={entry.id}>
              <Pressable
                onPress={() => setOpenId(open ? null : entry.id)}
                accessibilityRole="button"
              >
                <Row style={{ justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}>
                    <Row style={{ gap: spacing.sm }}>
                      <H3>{entry.word}</H3>
                      <Muted>{posLabel(entry.pos)}</Muted>
                    </Row>
                    <Muted style={{ marginTop: 2 }}>{entry.senses[0].meaning}</Muted>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Chip label={`${card.wrong}번 틀림`} tone="wrong" />
                    <Muted style={{ marginTop: spacing.xs }}>정답률 {rate}%</Muted>
                  </View>
                </Row>
              </Pressable>

              {open ? (
                <View style={{ marginTop: spacing.md }}>
                  {entry.senses.map((sense, i) => (
                    <View key={i} style={{ marginBottom: spacing.md }}>
                      <Body style={{ fontWeight: '700' }}>
                        {i + 1}. {sense.meaning}
                      </Body>
                      {sense.synonyms.length > 0 ? (
                        <Muted style={{ marginTop: 2 }}>{synonymSentence(sense.meaning, sense.synonyms)}</Muted>
                      ) : null}
                      {sense.examples.map((ex, j) => (
                        <Pressable
                          key={j}
                          onPress={() => speak(ex.en, profile.settings.ttsEnabled)}
                          style={{ marginTop: spacing.sm }}
                          accessibilityRole="button"
                        >
                          <Text style={s.exEn}>· {ex.en}</Text>
                          <Text style={s.exKo}>  {ex.ko}</Text>
                        </Pressable>
                      ))}
                    </View>
                  ))}

                  <Row style={{ gap: spacing.sm }}>
                    <Pressable
                      style={s.btn}
                      onPress={() => speak(entry.word, profile.settings.ttsEnabled)}
                      accessibilityRole="button"
                    >
                      <Text style={s.btnText}>🔊 발음 듣기</Text>
                    </Pressable>
                    <Pressable
                      style={[s.btn, { backgroundColor: colors.accentSoft }]}
                      onPress={() => Linking.openURL(videoUrl(entry)).catch(() => {})}
                      accessibilityRole="button"
                    >
                      <Text style={[s.btnText, { color: '#B45309' }]}>🎬 영상으로 보기</Text>
                    </Pressable>
                  </Row>

                  {allSynonyms(entry).length > 0 ? (
                    <Muted style={{ marginTop: spacing.md }}>
                      함께 외우기: {allSynonyms(entry).join(' · ')}
                    </Muted>
                  ) : null}
                </View>
              ) : null}
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  exEn: { fontSize: font.body, color: colors.text, lineHeight: 22 },
  exKo: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },
  btn: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
  },
  btnText: { fontWeight: '700', color: colors.primary, fontSize: font.small },
});
