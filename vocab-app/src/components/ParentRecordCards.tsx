/**
 * 부모님 자신의 학습 기록. **부모 홈에 그대로 펼쳐 둔다.**
 *
 * ── 왜 화면이 아니라 부품인가 ────────────────────────────────
 *
 * 예전에는 `/parent-record` 라는 화면이었고 홈에는 '내 학습 기록' 타일 하나만
 * 있었다. 그런데 부모가 홈에서 제일 먼저 보고 싶은 것이 바로 그것이다 —
 * 며칠째 하고 있는지, 무엇을 얼마나 익혔는지. 한 번 더 눌러야 보이면 대부분
 * 안 누르고, 안 누르면 자기 진도를 모른 채 며칠이 지나 그만두게 된다.
 *
 * 그래서 홈에 그대로 편다. 화면 하나가 줄고, 부모가 앱을 열자마자 자기
 * 숫자를 본다.
 *
 * **‘오늘’ 카드는 여기 없다.** 홈 맨 위 '오늘의 공부'에 이미 같은 숫자가
 * 크게 적혀 있어서, 한 화면에 같은 값이 두 번 나오면 어느 쪽이 맞는지
 * 헷갈린다.
 */

import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H3, Muted, ProgressBar, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { ALL_ENTRIES } from '../data';
import { DAILY_ENTRIES, dailyTheme } from '../data/daily';
import { KO_ENTRIES } from '../data/korean/levels';
import { meaningLine } from '../data/entry';
import { parentTrackProgress, TRACK_ORDER } from '../srs/parentSession';
import { buildWeeklySummary } from '../features/report';
import { buildMonth, monthOf } from '../features/calendar';
import { LEVEL_SHORT, PARENT_TRACK_LABEL } from '../types';
import { lastNDays, todayKey } from '../lib/date';
import { colors, spacing } from '../theme';

export function ParentRecordCards() {
  const { profile, data } = useApp();
  const today = todayKey();

  const weekly = useMemo(() => buildWeeklySummary(data, today), [data, today]);
  const calendar = useMemo(() => buildMonth(data.days, monthOf(today), today), [data.days, today]);

  const recent = useMemo(
    () =>
      lastNDays(14, today).map((date) => ({
        date,
        studied: data.days[date]?.studied ?? 0,
        completed: data.days[date]?.completed ?? false,
      })),
    [data.days, today],
  );

  // 오늘 틀린 것. 부모가 푸는 것은 일상 문장·아이들 단어·국어 셋이라
  // 세 자료를 다 뒤져야 이름이 나온다.
  const missed = useMemo(() => {
    const ids = new Set(data.days[today]?.wrongEntryIds ?? []);
    const en = [...ALL_ENTRIES, ...DAILY_ENTRIES]
      .filter((e) => ids.has(e.id))
      .map((e) => ({ word: e.word, meaning: meaningLine(e) }));
    const ko = KO_ENTRIES.filter((e) => ids.has(e.id)).map((e) => ({
      word: e.word,
      meaning: e.meaning,
    }));
    return [...en, ...ko].slice(0, 8);
  }, [data.days, today]);

  if (!profile) return null;

  const study = profile.parentStudy;

  return (
    <View>
      {/* 최근 7일 */}
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>최근 7일</H3>
          <Muted>
            {weekly.completedCount}일 달성 · 최고 {profile.bestStreak}일 연속
          </Muted>
        </Row>
        <Row style={{ marginTop: spacing.lg, justifyContent: 'space-between', alignItems: 'flex-end' }}>
          {weekly.days.map((d) => (
            <View key={d.date} style={{ alignItems: 'center', flex: 1 }}>
              <View
                style={[
                  s.bar,
                  {
                    height: Math.max(6, Math.min(56, d.studied * 4)),
                    backgroundColor: d.completed ? colors.parent : colors.border,
                  },
                ]}
              />
              <Muted style={{ fontSize: 10, marginTop: spacing.xs }}>{d.date.slice(8)}</Muted>
            </View>
          ))}
        </Row>
        <Muted style={{ marginTop: spacing.md }}>
          총 {weekly.totalStudied}개 · 평균 정답률 {Math.round(weekly.averageAccuracy * 100)}%
        </Muted>
      </Card>

      {/* 갈래별 진도 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>무엇을 얼마나 익혔나</H3>
        {study.tracks.length === 0 ? (
          <Muted style={{ marginTop: spacing.sm }}>
            아직 공부할 것을 안 골랐어요. ⚙️ 설정 → 내 공부 설정 에서 정하시면 오늘치가
            만들어집니다.
          </Muted>
        ) : (
          TRACK_ORDER.filter((t) => study.tracks.includes(t)).map((t) => {
            const p = parentTrackProgress(profile, data.cards, t);
            const where =
              t === 'daily'
                ? dailyTheme(study.dailyTheme).label
                : t === 'enWord'
                  ? LEVEL_SHORT[profile.level]
                  : LEVEL_SHORT[profile.koLevel];
            return (
              <View key={t} style={{ marginTop: spacing.lg }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Body style={{ fontWeight: '700', flex: 1 }}>
                    {PARENT_TRACK_LABEL[t]} · {where}
                  </Body>
                  <Muted>
                    {p.seen} / {p.total}
                  </Muted>
                </Row>
                <View style={{ marginTop: spacing.sm }}>
                  <ProgressBar
                    value={p.total === 0 ? 0 : p.seen / p.total}
                    color={colors.parent}
                    height={6}
                  />
                </View>
              </View>
            );
          })
        )}
      </Card>

      {/* 이번 달 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>🗓️ {calendar.label}</H3>
        <Muted style={{ marginTop: spacing.sm }}>
          {calendar.studiedDays > 0
            ? `${calendar.studiedDays}일 공부했고 ${calendar.totalWords}개를 봤어요.`
            : '이번 달은 아직 기록이 없어요.'}
        </Muted>
        <Row style={{ marginTop: spacing.md, gap: 4 }}>
          {recent.map((d) => (
            <View
              key={d.date}
              style={[
                s.spark,
                {
                  backgroundColor:
                    d.studied === 0 ? colors.border : d.completed ? colors.parent : colors.primarySoft,
                },
              ]}
            />
          ))}
        </Row>
        <Button
          title="🗓️ 달력으로 보기"
          variant="secondary"
          onPress={() => router.push('/calendar')}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      {missed.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>오늘 틀린 것</H3>
          <Muted style={{ marginTop: spacing.xs }}>내일 우선해서 다시 나옵니다.</Muted>
          {missed.map((m, i) => (
            <Row key={`${m.word}-${i}`} style={{ marginTop: spacing.md, alignItems: 'flex-start' }}>
              <Body style={{ fontWeight: '700', width: 140 }}>{m.word}</Body>
              <Muted style={{ flex: 1 }}>{m.meaning}</Muted>
            </Row>
          ))}
        </Card>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  bar: { width: 18, borderRadius: 4 },
  spark: { flex: 1, height: 10, borderRadius: 3 },
});
