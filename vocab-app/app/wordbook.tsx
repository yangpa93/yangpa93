import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Card, Chip, EmptyState, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { entriesOf } from '../src/data';
import { meaningLine, videoUrl } from '../src/data/entry';
import { isMastered } from '../src/srs/scheduler';
import { speak } from '../src/lib/feedback';
import { LEVEL_ORDER, LEVEL_SHORT, LevelId } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/** 레벨별 전체 단어 목록. 검색과 '안 외운 것만 보기'를 지원한다. */
export default function Wordbook() {
  const { profile, data } = useApp();
  const [level, setLevel] = useState<LevelId>(profile?.level ?? 'm1');
  const [query, setQuery] = useState('');
  const [onlyUnlearned, setOnlyUnlearned] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  const entries = useMemo(() => entriesOf(level), [level]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (onlyUnlearned) {
        const c = data.cards[e.id];
        if (c && isMastered(c)) return false;
      }
      if (!q) return true;
      return e.word.toLowerCase().includes(q) || meaningLine(e).includes(q);
    });
  }, [entries, query, onlyUnlearned, data.cards]);

  const masteredCount = entries.filter((e) => {
    const c = data.cards[e.id];
    return c != null && isMastered(c);
  }).length;

  if (!profile) return null;

  return (
    <Screen>
      <View style={s.levelRow}>
        {LEVEL_ORDER.map((l) => (
          <Pressable
            key={l}
            onPress={() => setLevel(l)}
            style={[s.levelChip, level === l && s.levelChipOn]}
            accessibilityRole="button"
          >
            <Text style={[s.levelText, level === l && s.levelTextOn]}>{LEVEL_SHORT[l]}</Text>
          </Pressable>
        ))}
      </View>

      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>{LEVEL_SHORT[level]} 단어</H3>
          <Muted>
            {masteredCount} / {entries.length}개 완전 암기
          </Muted>
        </Row>
        <View style={{ marginTop: spacing.md }}>
          <ProgressBar value={entries.length ? masteredCount / entries.length : 0} color={colors.accent} />
        </View>
      </Card>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="단어나 뜻으로 검색"
        placeholderTextColor={colors.muted}
        style={s.search}
        autoCapitalize="none"
      />

      <Pressable
        onPress={() => setOnlyUnlearned((v) => !v)}
        style={s.toggle}
        accessibilityRole="switch"
        accessibilityState={{ checked: onlyUnlearned }}
      >
        <Text style={[s.toggleText, onlyUnlearned && { color: colors.primary }]}>
          {onlyUnlearned ? '☑' : '☐'} 아직 다 못 외운 단어만 보기
        </Text>
      </Pressable>

      {filtered.length === 0 ? (
        <EmptyState icon="🔍" title="결과가 없어요" />
      ) : (
        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {filtered.map((e) => {
            const card = data.cards[e.id];
            const open = openId === e.id;
            return (
              <Card key={e.id}>
                <Pressable onPress={() => setOpenId(open ? null : e.id)} accessibilityRole="button">
                  <Row style={{ justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      <Row style={{ gap: spacing.sm }}>
                        <H3>{e.word}</H3>
                        <Muted>{e.pos}</Muted>
                      </Row>
                      <Muted style={{ marginTop: 2 }}>{meaningLine(e)}</Muted>
                    </View>
                    {card && isMastered(card) ? (
                      <Chip label="암기 완료" tone="correct" />
                    ) : card ? (
                      <Chip label={`${card.streak}연속`} tone="primary" />
                    ) : (
                      <Chip label="아직" tone="default" />
                    )}
                  </Row>
                </Pressable>

                {open ? (
                  <View style={{ marginTop: spacing.md }}>
                    {e.senses.map((sense, i) => (
                      <View key={i} style={{ marginBottom: spacing.md }}>
                        <Body style={{ fontWeight: '700' }}>
                          {i + 1}. {sense.meaning}
                          {sense.synonyms.length > 0 ? `  (= ${sense.synonyms.join(', ')})` : ''}
                        </Body>
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
                    <Pressable
                      style={s.videoBtn}
                      onPress={() => Linking.openURL(videoUrl(e)).catch(() => {})}
                      accessibilityRole="button"
                    >
                      <Text style={s.videoText}>🎬 실제로 쓰이는 영상 보기</Text>
                    </Pressable>
                  </View>
                ) : null}
              </Card>
            );
          })}
        </View>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  levelRow: { flexDirection: 'row', gap: spacing.sm, paddingTop: spacing.md, flexWrap: 'wrap' },
  levelChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelChipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  levelText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  levelTextOn: { color: '#fff' },
  search: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  toggle: { paddingVertical: spacing.md },
  toggleText: { fontSize: font.small, color: colors.subtext, fontWeight: '600' },
  exEn: { fontSize: font.body, color: colors.text, lineHeight: 22 },
  exKo: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },
  videoBtn: {
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
  },
  videoText: { color: '#B45309', fontWeight: '700', fontSize: font.small },
});
