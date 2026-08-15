import { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Body, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
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
import { ProfileData, SUBJECT_LABEL } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';
import { MonthlyCard } from '../src/components/MonthlyCard';
import { buildMonthlyReport } from '../src/features/monthly';
import { ALL_ENTRIES } from '../src/data';
import { DAILY_ENTRIES } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { dayBySubject } from '../src/features/studiedWords';

/* 찾아보기 표는 앱이 뜰 때 한 번만 만든다. 날짜를 누를 때마다 5,400여 개를
 * 훑으면 달력이 눌릴 때마다 멈칫한다. 결과 화면도 같은 방식이다. */
const EN_BY_ID = new Map(ALL_ENTRIES.map((e) => [e.id, e]));
const DAILY_BY_ID = new Map(DAILY_ENTRIES.map((e) => [e.id, e]));
const KO_BY_ID = new Map(KO_ENTRIES.map((e) => [e.id, e]));

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

  // 개근·새 단어·레벨은 달력 요약이 안 담는다. 따로 셈한다.
  const monthly = useMemo(
    () =>
      buildMonthlyReport(
        month,
        pdata?.days ?? {},
        pdata?.cards ?? {},
        pdata?.exams ?? [],
        ALL_ENTRIES,
        today,
      ),
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

  /**
   * 고른 날을 **갈래별로 갈라** 놓은 것. null 이면 갈래별로 나눠 적기 전의 날.
   *
   * 예전에는 「학습 단어 16/15 · 정답률 88%」 한 줄이었다. 그 88% 가 영어에서
   * 나온 것인지 국어에서 나온 것인지 알 수가 없어서, 아이가 국어만 처지고
   * 있어도 부모 눈에는 안 보였다.
   *
   * 틀린 낱말을 찾을 때 **영어 목록만 뒤지던 것도 여기서 고쳐진다.** 국어를
   * 틀린 날에도 「이 날 틀린 단어」 가 비어 있었다.
   */
  const bySubject = useMemo(() => {
    if (!selected || !pdata) return null;
    const rec = pdata.days[selected.date];
    if (!rec) return null;
    return dayBySubject(rec, { en: EN_BY_ID, daily: DAILY_BY_ID, ko: KO_BY_ID });
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

      {/* 한 달 성적표 — 개근·새 단어·레벨 */}
      <MonthlyCard report={monthly} name={profile.name} />

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

              {/*
                * 갈래마다 한 칸씩. 합쳐 놓은 숫자로는 어느 과목이 처지는지
                * 안 보인다.
                */}
              {bySubject === null ? (
                /*
                 * 갈래별로 나눠 적기 전(2026-08-15 이전)에 공부한 날이다.
                 * 어림잡아 채우지 않고 그렇다고 말한다 — 없는 숫자를 지어내면
                 * 부모가 그것을 아이의 성적으로 읽는다.
                 */
                <Muted style={{ marginTop: spacing.lg }}>
                  이 날은 국어·영어를 나눠 적기 전이라 합계만 있어요.
                </Muted>
              ) : (
                bySubject.map((sub) => (
                  <View key={sub.subject} style={s.subjectBox}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <Body style={{ fontWeight: '700' }}>{SUBJECT_LABEL[sub.subject]}</Body>
                      <Muted>
                        {sub.studied}개
                        {sub.accuracy !== null ? ` · 정답률 ${Math.round(sub.accuracy * 100)}%` : ''}
                      </Muted>
                    </Row>

                    {sub.missed.length > 0 ? (
                      sub.missed.map((w) => (
                        <Row key={w.id} style={{ marginTop: spacing.sm, alignItems: 'flex-start' }}>
                          <Body style={{ fontWeight: '700', width: 110 }}>{w.entry.word}</Body>
                          {/* 국어는 뜻이 한 줄이고 영어는 뜻이 여럿이라 줄을 지어야 한다. */}
                          <Muted style={{ flex: 1 }}>
                            {w.kind === 'ko' ? w.entry.meaning : meaningLine(w.entry)}
                          </Muted>
                          {w.wrong > 1 ? <Chip label={`${w.wrong}번`} tone="wrong" /> : null}
                        </Row>
                      ))
                    ) : (
                      <Muted style={{ marginTop: spacing.sm }}>다 맞혔어요 🎉</Muted>
                    )}
                  </View>
                ))
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
        /* 날짜 칸마다 이름을 붙인다. 시험이 '15' 라는 글자로 칸을 찾으면 월간
         * 요약의 '15일' 같은 것에 먼저 걸린다. */
        testID={`day-${cell.date}`}
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

  /* 날짜를 눌렀을 때 갈래마다 한 칸. 위에 선을 그어 국어와 영어를 갈라 놓는다. */
  subjectBox: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
