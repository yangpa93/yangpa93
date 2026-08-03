import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { allSynonyms, posLabel, videoUrl } from '../src/data/entry';
import { SynonymLine } from '../src/components/SynonymLine';
import { TodayWordsList } from '../src/components/TodayWordsList';
import { troubleWords } from '../src/srs/progress';
import { speak, speakWord } from '../src/lib/feedback';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 오답 노트. **오늘 틀린 것이 먼저, 많이 틀린 것이 그다음.**
 *
 * ── 왜 오늘을 앞에 두나 ─────────────────────────────────────
 *
 * 여기는 '많이 틀린 순서' 하나뿐이었다. 그건 오래 쌓인 목록이라 오늘 방금
 * 틀린 낱말이 위에 올라오지 않는다 — 한 번 틀린 것은 열 번 틀린 것 뒤로
 * 밀린다. 그런데 공부를 막 마치고 여기 오는 사람이 보고 싶은 것은 **방금
 * 틀린 그것**이다.
 *
 * 오늘 칸은 일상 문장 · 영어 단어 · 국어를 다 담는다. 아래 '많이 틀린 단어'
 * 는 영어만인데, 그 줄 세우기가 영어 카드(cards)의 누적 통계에 기대고 있어서
 * 갈래를 섞으면 뜻이 흐려진다. 오늘 것만이라도 다 보이면 목적은 이룬다.
 */
export default function Mistakes() {
  const { profile, data } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(() => troubleWords(ALL_ENTRIES, data.cards, 50), [data.cards]);

  if (!profile) return null;

  return (
    <Screen>
      <H3 style={{ paddingTop: spacing.md }}>오늘 틀린 것</H3>
      <TodayWordsList wrongOnly />

      {list.length === 0 ? (
        <Muted style={{ marginTop: spacing.xl, textAlign: 'center' }}>
          여태 틀린 단어가 없어요. 잘하고 있어요!
        </Muted>
      ) : (
      <>
      <H3 style={{ marginTop: spacing.xl }}>많이 틀린 단어</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        영어 단어를 많이 틀린 순서예요. 이 단어들이 매일 학습에 우선해서 다시 나옵니다.
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
                      <SynonymLine
                        meaning={sense.meaning}
                        synonyms={sense.synonyms}
                        ttsEnabled={profile.settings.ttsEnabled}
                      />
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
                      onPress={() => speakWord(entry.word, profile.settings.ttsEnabled)}
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
      </>
      )}
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
