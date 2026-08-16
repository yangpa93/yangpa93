import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { DAILY_ENTRIES } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { allSynonyms, posLabel, videoUrl } from '../src/data/entry';
import { SynonymLine } from '../src/components/SynonymLine';
import { TodayWordsList } from '../src/components/TodayWordsList';
import { troubleAll } from '../src/features/studiedWords';
import { speak, speakWord } from '../src/lib/feedback';
import { colors, font, radius, spacing } from '../src/theme';

/* 찾아보기 표는 앱이 뜰 때 한 번만 만든다. 오답 몇 개를 찾자고 5,400여 개를
 * 매번 훑으면 화면이 열릴 때마다 멈칫한다. */
const EN_BY_ID = new Map(ALL_ENTRIES.map((e) => [e.id, e]));
const DAILY_BY_ID = new Map(DAILY_ENTRIES.map((e) => [e.id, e]));
const KO_BY_ID = new Map(KO_ENTRIES.map((e) => [e.id, e]));

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
 * ── 국어가 아예 안 나왔다 ★ ────────────────────────────────
 *
 * '많이 틀린 단어' 는 `troubleWords(ALL_ENTRIES, …)` 를 썼다. 영어 어휘만
 * 넘기는 함수라, **국어를 아무리 틀려도 이 목록에 안 올라왔다.** 국어를 넣은
 * 지 한참 뒤에도 그대로였고, 아이 눈에는 "국어는 틀려도 안 적히는" 것으로
 * 보인다. "국어 자주 틀린 단어가 보이지 않습니다" 라는 말을 들었다.
 *
 * 이제 갈래를 가리는 규칙(studiedWords)으로 셋을 다 찾는다. 다만 **그리는
 * 법은 갈린다** — 영어는 뜻이 여럿이고 예문·유의어·영상이 붙지만, 국어는
 * 뜻이 한 줄이다. 같은 카드에 억지로 넣으면 국어 쪽이 빈 칸투성이가 된다.
 */
export default function Mistakes() {
  const { profile, data } = useApp();
  const [openId, setOpenId] = useState<string | null>(null);

  const list = useMemo(
    () => troubleAll(data.cards, { en: EN_BY_ID, daily: DAILY_BY_ID, ko: KO_BY_ID }, 50),
    [data.cards],
  );

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
        많이 틀린 순서예요. 이 낱말들이 매일 학습에 우선해서 다시 나옵니다.
      </Muted>

      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        {list.map((word) => {
          const card = data.cards[word.id];
          const open = openId === word.id;
          const total = (card?.correct ?? 0) + (card?.wrong ?? 0);
          const rate = total === 0 ? 0 : Math.round(((card?.correct ?? 0) / total) * 100);

          /*
           * **국어는 따로 그린다.** 뜻이 한 줄이고 예문·유의어·영상이 없다.
           * 영어 카드에 억지로 넣으면 빈 칸만 늘어선다.
           */
          if (word.kind === 'ko') {
            return (
              <Card key={word.id}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}>
                    <Row style={{ gap: spacing.sm, alignItems: 'center' }}>
                      <H3>{word.entry.word}</H3>
                      {word.entry.hanja ? <Muted>{word.entry.hanja}</Muted> : null}
                    </Row>
                    <Muted style={{ marginTop: 2 }}>{word.entry.meaning}</Muted>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <Chip label={`${word.wrong}번 틀림`} tone="wrong" />
                    <Muted style={{ marginTop: spacing.xs }}>정답률 {rate}%</Muted>
                  </View>
                </Row>
              </Card>
            );
          }

          const entry = word.entry;
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
                    <Chip label={`${word.wrong}번 틀림`} tone="wrong" />
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
