import { useMemo, useState } from 'react';
import { Linking, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Card, Chip, EmptyState, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { entriesOf } from '../src/data';
import { PLAN_COUNT } from '../src/data/plan';
import { meaningLine, posLabel, videoUrl } from '../src/data/entry';
import { isMastered } from '../src/srs/scheduler';
import { LevelPicker } from '../src/components/LevelPicker';
import { TodayWordsList } from '../src/components/TodayWordsList';
import { SynonymLine } from '../src/components/SynonymLine';
import { speak } from '../src/lib/feedback';
import { LEVEL_SHORT, LevelId } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 단어장. **오늘 배운 것과 전체 목록을 갈라 둔다.**
 *
 * ── 왜 갈랐나 ───────────────────────────────────────────────
 *
 * 여기는 레벨의 전체 목록만 있었다. 중1-1 이면 150여 개가 통째로 늘어선다.
 * 그런데 "오늘 뭘 배웠더라" 를 되짚고 싶을 때 그 안에서 오늘 것을 골라낼
 * 방법이 없었다 — 정작 제일 자주 보고 싶은 쪽이 안 보이는 목록이었던 것이다.
 *
 * 전체 목록을 없애지는 않았다. 어제 본 단어를 다시 찾거나 다음 레벨을 미리
 * 훑는 데는 그쪽이 맞다. 다만 **먼저 보이는 쪽을 오늘로 바꿨다.**
 *
 * 오늘 목록은 일상 문장 · 영어 단어 · 국어를 섞어 보여 준다. 부모는 셋을
 * 함께 공부하는데, 영어만 늘어놓으면 오늘 한 것의 3분의 1만 보인다.
 * 전체 목록은 영어 레벨 기준 그대로다 — 국어와 일상 문장은 레벨로 훑는
 * 물건이 아니라서 여기 억지로 얹지 않았다.
 */
export default function Wordbook() {
  const { profile, data } = useApp();
  /** '오늘 배운 것' 이 먼저다. 여기 오는 대부분은 오늘 것을 보러 온다. */
  const [tab, setTab] = useState<'today' | 'all'>('today');
  const [level, setLevel] = useState<LevelId>(profile?.level ?? 'm1-1');
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
      {/* 두 갈래. 고른 쪽만 아래에 펼친다. */}
      <Row style={{ gap: spacing.sm, paddingTop: spacing.md }}>
        {(
          [
            { key: 'today', label: '오늘 배운 것' },
            { key: 'all', label: '전체 목록' },
          ] as const
        ).map((t) => (
          <Pressable
            key={t.key}
            onPress={() => setTab(t.key)}
            style={[s.tab, tab === t.key && s.tabOn]}
            accessibilityRole="radio"
            accessibilityState={{ selected: tab === t.key }}
          >
            <Text style={[s.tabText, tab === t.key && s.tabTextOn]}>{t.label}</Text>
          </Pressable>
        ))}
      </Row>

      {tab === 'today' ? <TodayWordsList /> : null}

      {tab === 'all' ? (
      <>
      <View style={{ paddingTop: spacing.md }}>
        <LevelPicker value={level} onChange={setLevel} showCounts={false} />
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
        {entries.length < PLAN_COUNT[level] ? (
          <Muted style={{ marginTop: spacing.sm }}>
            이 레벨은 교육부 기본 어휘 목록 기준 {PLAN_COUNT[level]}개가 배정돼 있고, 그중{' '}
            {entries.length}개가 뜻·예문까지 준비돼 있어요. 나머지는 준비되는 대로 채워집니다.
          </Muted>
        ) : null}
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
                        <Muted>{posLabel(e.pos)}</Muted>
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
                        </Body>
                        {/*
                          유의어는 뜻 줄에 괄호로 붙이지 않고 아래 줄로 내린다.
                          문구가 뜻을 직접 부르므로, 같은 줄에 두면 '단단한'이
                          한 줄에 두 번 나온다.
                        */}
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
      </>
      ) : null}
    </Screen>
  );
}

const s = StyleSheet.create({
  /*
   * 두 갈래를 큼직한 단추로 둔다. 작은 글자 링크로 두면 '전체 목록' 이 어디
   * 갔는지 물어보게 된다 — 없앤 것이 아니라 옆으로 옮긴 것이다.
   */
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  tabOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontSize: font.body, fontWeight: '800', color: colors.subtext },
  tabTextOn: { color: '#fff' },
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
