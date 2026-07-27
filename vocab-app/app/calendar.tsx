import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Body, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { meaningLine } from '../src/data/entry';
import { loadProfileData } from '../src/store/storage';
import {
  addMonths,
  buildMonth,
  DayCell,
  earliestMonth,
  monthOf,
  WEEKDAY_LABEL,
} from '../src/features/calendar';
import { formatKo, todayKey } from '../src/lib/date';
import { ProfileData } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 학습 달력.
 *
 * 하루에 몇 개를 공부했는지 한 달을 한눈에 본다. 칸을 누르면 그날의
 * 자세한 기록(정답률·시간·틀린 단어)이 아래에 열린다.
 *
 * `?profileId=` 를 주면 그 아이의 달력을 본다. 부모 대시보드에서 넘어올 때 쓴다.
 */
export default function Calendar() {
  const { state, data } = useApp();
  const params = useLocalSearchParams<{ profileId?: string }>();

  const profileId = params.profileId ?? state.activeProfileId ?? state.profiles[0]?.id ?? null;
  const profile = state.profiles.find((p) => p.id === profileId) ?? null;

  // 다른 아이의 달력이면 그 아이 저장소를 따로 읽는다.
  const [loaded, setLoaded] = useState<ProfileData | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!profileId || profileId === state.activeProfileId) {
      setLoaded(null);
      return;
    }
    loadProfileData(profileId).then((d) => {
      if (!cancelled) setLoaded(d);
    });
    return () => {
      cancelled = true;
    };
  }, [profileId, state.activeProfileId]);

  const pdata = profileId === state.activeProfileId ? data : loaded;

  const today = todayKey();
  const [month, setMonth] = useState(() => monthOf(today));
  const [picked, setPicked] = useState<string | null>(today);

  const summary = useMemo(
    () => buildMonth(pdata?.days ?? {}, month, today),
    [pdata, month, today],
  );

  const first = useMemo(() => earliestMonth(pdata?.days ?? {}), [pdata]);

  // 기록이 시작된 달보다 더 뒤로는 갈 이유가 없다.
  const canPrev = first === null ? false : month > first;
  const canNext = month < monthOf(today);

  const selected = useMemo(() => {
    if (picked === null) return null;
    for (const week of summary.weeks) {
      for (const cell of week) {
        if (cell && cell.date === picked) return cell;
      }
    }
    return null;
  }, [picked, summary]);

  const wrongWords = useMemo(() => {
    if (!selected || !pdata) return [];
    const rec = pdata.days[selected.date];
    if (!rec) return [];
    const counts = new Map<string, number>();
    for (const id of rec.wrongEntryIds) counts.set(id, (counts.get(id) ?? 0) + 1);
    const byId = new Map(ALL_ENTRIES.map((e) => [e.id, e]));
    return [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .flatMap(([id, count]) => {
        const e = byId.get(id);
        return e ? [{ word: e.word, meaning: meaningLine(e), count }] : [];
      });
  }, [selected, pdata]);

  function move(n: number) {
    const next = addMonths(month, n);
    setMonth(next);
    setPicked(next === monthOf(today) ? today : null);
  }

  if (!profile) {
    return (
      <Screen>
        <Muted style={{ paddingTop: spacing.lg }}>등록된 아이가 없습니다.</Muted>
      </Screen>
    );
  }

  return (
    <Screen>
      <Row style={{ justifyContent: 'space-between', paddingTop: spacing.md }}>
        <Row style={{ gap: spacing.sm }}>
          <Text style={{ fontSize: 22 }}>{profile.avatar}</Text>
          <H3>{profile.name}의 학습 달력</H3>
        </Row>
      </Row>

      <Card style={{ marginTop: spacing.md }}>
        {/* 달 이동 */}
        <Row style={{ justifyContent: 'space-between' }}>
          <Pressable
            onPress={() => canPrev && move(-1)}
            disabled={!canPrev}
            style={[s.nav, !canPrev && s.navOff]}
            accessibilityRole="button"
            accessibilityLabel="지난달"
            hitSlop={8}
          >
            <Text style={[s.navText, !canPrev && s.navTextOff]}>‹</Text>
          </Pressable>

          <Text style={s.monthLabel}>{summary.label}</Text>

          <Pressable
            onPress={() => canNext && move(1)}
            disabled={!canNext}
            style={[s.nav, !canNext && s.navOff]}
            accessibilityRole="button"
            accessibilityLabel="다음달"
            hitSlop={8}
          >
            <Text style={[s.navText, !canNext && s.navTextOff]}>›</Text>
          </Pressable>
        </Row>

        {/* 요일 머리글 */}
        <Row style={{ marginTop: spacing.lg }}>
          {WEEKDAY_LABEL.map((w, i) => (
            <Text
              key={w}
              style={[
                s.weekday,
                i === 0 && { color: colors.wrong },
                i === 6 && { color: colors.primary },
              ]}
            >
              {w}
            </Text>
          ))}
        </Row>

        {/* 날짜 격자 */}
        {summary.weeks.map((week, wi) => (
          <Row key={wi} style={{ marginTop: spacing.sm }}>
            {week.map((cell, ci) =>
              cell === null ? (
                <View key={`blank-${ci}`} style={s.cellWrap} />
              ) : (
                <DayBox
                  key={cell.date}
                  cell={cell}
                  selected={cell.date === picked}
                  onPress={() => setPicked(cell.date === picked ? null : cell.date)}
                />
              ),
            )}
          </Row>
        ))}

        {/* 범례 */}
        <Row style={{ marginTop: spacing.lg, gap: spacing.md, flexWrap: 'wrap' }}>
          <Legend level={0} label="안 함" />
          <Legend level={1} label="조금" />
          <Legend level={2} label="절반 이상" />
          <Legend level={3} label="목표 달성" />
        </Row>
      </Card>

      {/* 이 달 요약 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>{summary.label} 요약</H3>
        <Row style={{ justifyContent: 'space-around', marginTop: spacing.lg }}>
          <Stat label="공부한 날" value={`${summary.studiedDays}일`} />
          <Stat label="목표 달성" value={`${summary.completedDays}일`} />
          <Stat label="공부한 단어" value={`${summary.totalWords}개`} />
          <Stat label="학습 시간" value={`${summary.totalMinutes}분`} />
        </Row>
        {summary.studiedDays > 0 ? (
          <Muted style={{ marginTop: spacing.lg }}>
            평균 정답률 {Math.round(summary.averageAccuracy * 100)}% · 최장 {summary.longestStreak}일 연속
            {summary.best ? ` · 가장 많이 한 날 ${summary.best.day}일 (${summary.best.studied}개)` : ''}
          </Muted>
        ) : (
          <Muted style={{ marginTop: spacing.lg }}>이 달에는 아직 학습 기록이 없어요.</Muted>
        )}
      </Card>

      {/* 고른 날의 자세한 기록 */}
      {selected ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>{formatKo(selected.date)}</H3>
            {selected.isFuture ? (
              <Chip label="아직 오지 않은 날" tone="default" />
            ) : (
              <Chip
                label={selected.completed ? '목표 달성' : selected.studied > 0 ? '목표 미달' : '미학습'}
                tone={selected.completed ? 'correct' : selected.studied > 0 ? 'accent' : 'wrong'}
              />
            )}
          </Row>

          {selected.studied > 0 ? (
            <>
              <Row style={{ justifyContent: 'space-around', marginTop: spacing.lg }}>
                <Stat label="학습 단어" value={`${selected.studied}/${selected.goal}`} />
                <Stat label="정답률" value={`${Math.round(selected.accuracy * 100)}%`} />
                <Stat label="맞음/틀림" value={`${selected.correct}/${selected.wrong}`} />
                <Stat label="시간" value={`${selected.minutes}분`} />
              </Row>

              {wrongWords.length > 0 ? (
                <>
                  <Muted style={{ marginTop: spacing.lg }}>이 날 틀린 단어</Muted>
                  {wrongWords.slice(0, 8).map((m) => (
                    <Row key={m.word} style={{ marginTop: spacing.md, alignItems: 'flex-start' }}>
                      <Body style={{ fontWeight: '700', width: 120 }}>{m.word}</Body>
                      <Muted style={{ flex: 1 }}>{m.meaning}</Muted>
                      {m.count > 1 ? <Chip label={`${m.count}번`} tone="wrong" /> : null}
                    </Row>
                  ))}
                </>
              ) : (
                <Muted style={{ marginTop: spacing.lg }}>틀린 단어가 없어요. 완벽해요! 🎉</Muted>
              )}
            </>
          ) : (
            <Muted style={{ marginTop: spacing.md }}>
              {selected.isFuture ? '아직 오지 않은 날이에요.' : '이 날은 학습 기록이 없어요.'}
            </Muted>
          )}
        </Card>
      ) : null}

      {first === null ? (
        <EmptyState
          icon="🗓️"
          title="아직 기록이 없어요"
          hint="오늘 공부를 마치면 달력에 표시돼요."
        />
      ) : null}
    </Screen>
  );
}

function DayBox({
  cell,
  selected,
  onPress,
}: {
  cell: DayCell;
  selected: boolean;
  onPress: () => void;
}) {
  const tone = LEVEL_TONE[cell.level];
  return (
    <View style={s.cellWrap}>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={
          cell.studied > 0
            ? `${cell.day}일, ${cell.studied}개 학습${cell.completed ? ', 목표 달성' : ''}`
            : `${cell.day}일, 학습 기록 없음`
        }
        style={[
          s.cell,
          { backgroundColor: tone.bg },
          cell.isToday && s.cellToday,
          selected && s.cellSelected,
          cell.isFuture && s.cellFuture,
        ]}
      >
        <Text style={[s.cellDay, { color: tone.text }]}>{cell.day}</Text>
        {cell.studied > 0 ? (
          <Text style={[s.cellCount, { color: tone.text }]}>{cell.studied}</Text>
        ) : (
          <Text style={s.cellDot}>·</Text>
        )}
      </Pressable>
    </View>
  );
}

function Legend({ level, label }: { level: 0 | 1 | 2 | 3; label: string }) {
  const tone = LEVEL_TONE[level];
  return (
    <Row style={{ gap: spacing.xs }}>
      <View style={[s.swatch, { backgroundColor: tone.bg }]} />
      <Muted style={{ fontSize: font.tiny }}>{label}</Muted>
    </Row>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={s.statValue}>{value}</Text>
      <Muted style={{ fontSize: 11, marginTop: 2 }}>{label}</Muted>
    </View>
  );
}

/** 농도별 색. 진해질수록 그날 많이 했다는 뜻. */
const LEVEL_TONE: Record<0 | 1 | 2 | 3, { bg: string; text: string }> = {
  0: { bg: colors.bg, text: colors.muted },
  1: { bg: '#DDE1FA', text: colors.primary },
  2: { bg: '#A5B0F5', text: '#1E1B4B' },
  3: { bg: colors.primary, text: '#FFFFFF' },
};

const s = StyleSheet.create({
  nav: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navOff: { backgroundColor: colors.bg },
  navText: { fontSize: 24, fontWeight: '800', color: colors.primary, lineHeight: 28 },
  navTextOff: { color: colors.border },
  monthLabel: { fontSize: font.h3, fontWeight: '800', color: colors.text },

  weekday: { flex: 1, textAlign: 'center', fontSize: font.tiny, fontWeight: '700', color: colors.subtext },

  cellWrap: { flex: 1, paddingHorizontal: 2 },
  cell: {
    aspectRatio: 1,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cellToday: { borderColor: colors.accent },
  cellSelected: { borderColor: colors.text },
  cellFuture: { opacity: 0.45 },
  cellDay: { fontSize: 13, fontWeight: '700' },
  cellCount: { fontSize: 11, fontWeight: '800', marginTop: 1 },
  cellDot: { fontSize: 11, color: colors.muted, marginTop: 1 },

  swatch: { width: 14, height: 14, borderRadius: 4, borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: 18, fontWeight: '800', color: colors.text },
});
