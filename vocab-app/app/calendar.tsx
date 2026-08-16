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
import { DailyRecord, ProfileData, SUBJECT_LABEL } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';
import { MonthlyCard } from '../src/components/MonthlyCard';
import { buildMonthlyReport } from '../src/features/monthly';
import { ALL_ENTRIES } from '../src/data';
import { DAILY_ENTRIES } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { dayBySubject, studiedWords } from '../src/features/studiedWords';
import { daysFromReports } from '../src/features/childReports';

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
 *
 * `?name=` 을 주면 **다른 폰의 아이**를 본다. 그 아이는 이 폰에 프로필도 기록도
 * 없다 — 공부를 마칠 때마다 보내 온 리포트만 있다. 그것을 하루 기록과 같은
 * 모양으로 세워(`daysFromReports`) 같은 달력에 그린다. 화면을 두 벌 만들면
 * 한쪽만 고치게 되는데, 이 앱에서 이미 그렇게 어긋난 적이 있다.
 */
export default function Calendar() {
  const { state, data } = useApp();
  const params = useLocalSearchParams<{ profileId?: string; name?: string }>();

  /** 다른 폰의 아이 이름. 없으면 이 폰의 아이를 보는 것이다. */
  const remoteName = typeof params.name === 'string' && params.name ? params.name : null;

  const profileId = remoteName
    ? null
    : (params.profileId ?? state.activeProfileId ?? state.profiles[0]?.id ?? null);
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

  /**
   * 달력이 읽을 날짜별 기록.
   *
   * 이 폰의 아이면 저장소에서 그대로 오고, 다른 폰의 아이면 **보내 온 리포트를
   * 같은 모양으로 세워** 온다. 아래 화면은 어느 쪽인지 모른 채 그린다 — 알
   * 필요가 없고, 알게 하면 갈래가 둘로 갈려 한쪽만 고치게 된다.
   */
  const days = useMemo(
    () => (remoteName ? daysFromReports(state.receivedReports, remoteName) : (pdata?.days ?? {})),
    [remoteName, state.receivedReports, pdata],
  );

  const summary = useMemo(() => buildMonth(days, month, today), [days, month, today]);

  // 개근·새 단어·레벨은 달력 요약이 안 담는다. 따로 셈한다.
  const monthly = useMemo(
    () =>
      buildMonthlyReport(
        month,
        days,
        pdata?.cards ?? {},
        pdata?.exams ?? [],
        ALL_ENTRIES,
        today,
      ),
    [pdata, month, today],
  );

  const first = useMemo(() => earliestMonth(days), [days]);

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
    if (!selected) return null;
    const rec = days[selected.date];
    if (!rec) return null;
    /*
     * 갈래마다 **세 개까지만.** 「자주 틀린 낱말」 을 보는 자리지 그날 오답을
     * 다 세는 자리가 아니다. 다섯씩 두 갈래면 열 줄이라 화면 밖으로 밀린다.
     */
    return dayBySubject(rec, { en: EN_BY_ID, daily: DAILY_BY_ID, ko: KO_BY_ID }, 3);
  }, [selected, days]);

  function move(n: number) {
    const next = addMonths(month, n);
    setMonth(next);
    setPicked(next === monthOf(today) ? today : null);
  }

  if (!profile && !remoteName) {
    return (
      <Screen>
        <Muted style={{ paddingTop: spacing.lg }}>등록된 아이가 없습니다.</Muted>
      </Screen>
    );
  }

  const who = profile?.name ?? remoteName ?? '';

  return (
    <Screen>
      {/*
        머리글은 한 줄로 줄였다. 화면 위에 이미 「학습 달력」 이 적혀 있어서
        「〇〇의 학습 달력」 은 같은 말을 두 번 하는 셈이고, 그 두 줄만큼
        아래 칸이 밀린다.

        다른 폰의 아이는 **보내 온 날만** 보인다는 것을 여기 붙인다. 안 적으면
        부모는 빈 칸을 「안 한 날」 로 읽는데, 아이 폰이 꺼져 있었거나 알림이
        못 온 날일 수도 있다 — 그 차이가 아이에게는 억울한 자리다.
      */}
      <Row style={{ gap: spacing.sm, paddingTop: spacing.md, alignItems: 'center' }}>
        <Text style={{ fontSize: 20 }}>{profile?.avatar ?? '📲'}</Text>
        <H3>{who}</H3>
        {remoteName ? <Muted>· 보내 온 날만 보여요</Muted> : null}
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
        <Row style={{ marginTop: spacing.md }}>
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

        {/* 날짜 격자. 줄 사이도 좁혔다 — 여섯 줄이면 그 간격이 쌓여 한 칸만큼 된다. */}
        {summary.weeks.map((week, wi) => (
          <Row key={wi} style={{ marginTop: spacing.xs }}>
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

        {/*
          범례.

          **한 줄로 눕히고 여백을 줄였다.** 날짜를 누르면 그 결과가 아래에
          열리는데, 범례가 크면 그것이 화면 밖으로 밀린다. 눌러 놓고 스크롤을
          내려야 보이는 것은 안 보이는 것과 같다.
        */}
        <Row style={{ marginTop: spacing.md, gap: spacing.sm, flexWrap: 'wrap' }}>
          <Legend level={0} label="안 함" />
          <Legend level={1} label="조금" />
          <Legend level={2} label="절반 이상" />
          <Legend level={3} label="목표 달성" />
        </Row>
      </Card>

      {/*
        고른 날의 자세한 기록. **달력 바로 아래에 둔다.**

        예전에는 이 카드가 「이 달 요약」 과 「한 달 성적표」 뒤에 있었다. 날짜를
        눌러도 결과가 두 카드 아래라 화면에 안 보였고, 누른 사람 눈에는 아무
        일도 안 일어난 것으로 보였다. "달력이 너무 큽니다" 라는 말이 이것이었다.
      */}
      {selected ? (
        <DayDetail selected={selected} bySubject={bySubject} day={days[selected.date]} />
      ) : null}

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

      {/*
        한 달 성적표 — 개근·새 단어·레벨.

        **다른 폰의 아이에게는 안 그린다.** 「새로 배운 낱말」 과 「완전히 외운
        낱말」 은 그 아이의 낱말 카드를 세어야 나오는데, 그 카드는 아이 폰
        안에만 있다. 여기서 그리면 전부 0 으로 뜨고, 부모는 아이가 한 달 내내
        아무것도 못 외운 것으로 읽는다.
      */}
      {profile ? <MonthlyCard report={monthly} name={profile.name} /> : null}

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

/**
 * 고른 날 하나. **달력 바로 아래에 붙는다.**
 *
 * 따로 뺀 것은 자리를 옮기려는 것이다. 예전에는 「이 달 요약」 과 「한 달
 * 성적표」 뒤에 있어서, 날짜를 눌러도 결과가 화면 밖이었다.
 */
function DayDetail({
  selected,
  bySubject,
  day,
}: {
  selected: DayCell;
  bySubject: ReturnType<typeof dayBySubject>;
  /** 그날 원본. 배운 낱말 목록이 여기 있다. 다른 폰의 아이에게는 없다. */
  day: DailyRecord | undefined;
}) {
  /**
   * 그날 배운 낱말. **눌러야 펼쳐진다.**
   *
   * 오답 노트와 단어장이 「오늘 것」 만 보여 줘서, 어제 뭘 배웠는지 되짚을
   * 길이 없었다. 그것을 달력으로 옮겨 왔다 — 날짜를 고르면 그날 것이 나온다.
   *
   * 처음부터 펼쳐 두지는 않는다. 하루 서른 개가 넘는 날이 있어 그것만으로
   * 화면이 가득 차고, 정작 위의 갈래별 성적이 밀려난다.
   */
  const [openWords, setOpenWords] = useState(false);

  const learned = useMemo(() => {
    const ids = day?.studiedEntryIds ?? [];
    if (ids.length === 0) return [];
    return studiedWords(
      ids.map((id) => ({ id, wrong: 0 })),
      { en: EN_BY_ID, daily: DAILY_BY_ID, ko: KO_BY_ID },
    );
  }, [day]);

  return (
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
          {/*
            합계는 두 칸으로 줄였다. 갈래별로 아래에 다시 나오는데 위에 넷을
            늘어놓으면 같은 숫자를 두 번 읽게 되고, 그만큼 갈래 칸이 화면
            밖으로 밀린다.
          */}
          <Row style={{ justifyContent: 'space-around', marginTop: spacing.md }}>
            <Stat label="학습 단어" value={`${selected.studied}/${selected.goal}`} />
            <Stat label="정답률" value={`${Math.round(selected.accuracy * 100)}%`} />
          </Row>

          {/* 갈래마다 한 칸씩. 합쳐 놓은 숫자로는 어느 과목이 처지는지 안 보인다. */}
          {bySubject === null ? (
            /*
             * 갈래별로 나눠 적기 전에 공부한 날이거나, 아이 폰이 아직 옛 판이라
             * 갈래별 성적이 안 온 날이다. 어림잡아 채우지 않고 그렇다고 말한다 —
             * 없는 숫자를 지어내면 부모가 그것을 아이의 성적으로 읽는다.
             */
            <Muted style={{ marginTop: spacing.md }}>
              이 날은 국어·영어를 나눠 적기 전이라 합계만 있어요.
            </Muted>
          ) : (
            bySubject.map((sub) => (
              <View key={sub.subject} style={s.subjectBox}>
                {/*
                  **분모를 같이 적는다.** 예전에는 「5개 · 정답률 93%」 였는데,
                  5 는 낱말 수고 93% 는 문제 기준이라 "다섯 개 중 93%" 로
                  읽혔다. 낱말 하나를 세 바퀴 돌려 묻고 뜻이 여럿이면 뜻마다
                  묻기 때문에 낱말 다섯이 열다섯 문제가 된다.
                  「다 맞혔는데 왜 93% 인가」 라는 물음이 여기서 나왔다.
                */}
                <Row style={{ justifyContent: 'space-between' }}>
                  <Body style={{ fontWeight: '700' }}>{SUBJECT_LABEL[sub.subject]}</Body>
                  <Muted>
                    {sub.accuracy !== null ? `정답률 ${Math.round(sub.accuracy * 100)}%` : ''}
                  </Muted>
                </Row>
                <Muted style={{ marginTop: 2 }}>
                  낱말 {sub.studied}개
                  {sub.asked > 0 ? ` · ${sub.correct}/${sub.asked}문제` : ''}
                </Muted>

                {/*
                  **무슨 목록인지 적는다.** 낱말만 죽 늘어놓았더니 「여기서 영어와
                  국어는 오답 노트인가요」 라는 물음을 받았다. 맞는데, 화면이
                  그렇다고 말한 적이 없었다. 배운 낱말 목록과 생김새가 같아서
                  더 그렇다.
                */}
                {sub.missed.length > 0 ? (
                  <Muted style={{ marginTop: spacing.md, fontWeight: '700' }}>자주 틀린 낱말</Muted>
                ) : null}
                {sub.missed.length > 0 ? (
                  sub.missed.map((w) => (
                    <Row key={w.id} style={{ marginTop: spacing.sm, alignItems: 'center' }}>
                      <Body style={{ fontWeight: '700', width: 100 }}>{w.entry.word}</Body>
                      {/*
                        뜻은 **한 줄로 자른다.** 국어 뜻풀이는 두세 줄이 예사라,
                        그대로 두면 낱말 셋에 여섯 줄이 되어 다음 갈래가 화면
                        밖으로 밀린다. 여기는 "무엇을 틀렸나" 를 훑는 자리고,
                        뜻을 온전히 보는 자리는 아이 폰 오답 노트다.
                      */}
                      <Muted style={{ flex: 1 }} numberOfLines={1}>
                        {w.kind === 'ko' ? w.entry.meaning : meaningLine(w.entry)}
                      </Muted>
                      {w.wrong > 1 ? <Chip label={`${w.wrong}번`} tone="wrong" /> : null}
                    </Row>
                  ))
                ) : sub.wrong === 0 ? (
                  <Muted style={{ marginTop: spacing.sm }}>다 맞혔어요 🎉</Muted>
                ) : (
                  /*
                   * **틀린 것은 있는데 낱말을 못 찾았다.**
                   *
                   * 예전에는 이 자리에도 「다 맞혔어요 🎉」 가 떴다. 정답률은
                   * 75% 인데 바로 아래에 다 맞혔다고 적힌 화면이 나왔고,
                   * 「다 맞혔는데 왜 75% 인가」 라는 말을 들었다. 틀렸는데
                   * 다 맞혔다고 적는 것은 가장 나쁜 거짓말이다.
                   *
                   * 왜 못 찾나 — 어휘 파일에서 빠진 낱말이거나(뜻을 못 확인해
                   * 뺀 것), 다른 폰의 아이라면 스무 개를 넘겨 잘린 뒤쪽이다.
                   */
                  <Muted style={{ marginTop: spacing.sm }}>
                    {sub.wrong}문제 틀렸어요 (어떤 낱말인지는 못 찾았어요)
                  </Muted>
                )}
              </View>
            ))
          )}

          {/*
            이 날 배운 낱말 — 단어장을 달력으로 옮겨 온 자리다.

            **다른 폰의 아이에게는 안 나온다.** 배운 낱말은 부모 폰으로 안
            보낸다(오답만 보낸다). 하루 서른 개가 넘는 날이 있어 알림 한 통에
            안 들어가고, 단어장은 아이가 제 폰에서 보면 되는 것이다.
          */}
          {learned.length > 0 ? (
            <View style={s.subjectBox}>
              <Pressable
                onPress={() => setOpenWords((v) => !v)}
                accessibilityRole="button"
                accessibilityState={{ expanded: openWords }}
              >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Body style={{ fontWeight: '700' }}>📗 이 날 배운 낱말 {learned.length}개</Body>
                  <Text style={s.chev}>{openWords ? '⌃' : '⌄'}</Text>
                </Row>
              </Pressable>

              {openWords
                ? learned.map((w) => (
                    <Row key={w.id} style={{ marginTop: spacing.sm, alignItems: 'center' }}>
                      <Body style={{ fontWeight: '700', width: 100 }}>{w.entry.word}</Body>
                      <Muted style={{ flex: 1 }} numberOfLines={1}>
                        {w.kind === 'ko' ? w.entry.meaning : meaningLine(w.entry)}
                      </Muted>
                    </Row>
                  ))
                : null}
            </View>
          ) : null}
        </>
      ) : (
        <Muted style={{ marginTop: spacing.md }}>
          {selected.isFuture ? '아직 오지 않은 날이에요.' : '이 날은 학습 기록이 없어요.'}
        </Muted>
      )}
    </Card>
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
  /*
   * **정사각형을 그만뒀다.** 예전에는 aspectRatio 1 이라 여섯 줄이면 300픽셀을
   * 넘었고, 날짜를 눌러도 그 결과(국어·영어 칸)가 화면 밖으로 밀렸다. "달력이
   * 너무 큽니다" 라는 말이 그것이었다.
   *
   * 높이를 40 으로 못박으면 여섯 줄이 240 으로 줄어 갈래 둘이 같은 화면에
   * 들어온다. 날짜와 개수 두 줄은 그 안에 그대로 들어간다.
   */
  cell: {
    height: 40,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cellToday: { borderColor: colors.accent },
  cellSelected: { borderColor: colors.text },
  cellFuture: { opacity: 0.45 },
  cellDay: { fontSize: 12, fontWeight: '700' },
  cellCount: { fontSize: 10, fontWeight: '800' },
  cellDot: { fontSize: 10, color: colors.muted },

  swatch: { width: 14, height: 14, borderRadius: 4, borderWidth: 1, borderColor: colors.border },
  statValue: { fontSize: 18, fontWeight: '800', color: colors.text },

  /* 날짜를 눌렀을 때 갈래마다 한 칸. 위에 선을 그어 국어와 영어를 갈라 놓는다. */
  chev: { fontSize: font.body, color: colors.muted, fontWeight: '800' },
  subjectBox: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
