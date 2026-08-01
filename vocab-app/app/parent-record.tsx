import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { DAILY_ENTRIES, dailyTheme } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { meaningLine } from '../src/data/entry';
import { parentTrackProgress, TRACK_ORDER } from '../src/srs/parentSession';
import { buildWeeklySummary } from '../src/features/report';
import { buildMonth, monthOf } from '../src/features/calendar';
import { LEVEL_SHORT, PARENT_TRACK_LABEL } from '../src/types';
import { lastNDays, todayKey } from '../src/lib/date';
import { colors, font, spacing } from '../src/theme';

/**
 * 부모님 자신의 학습 기록.
 *
 * 아이 리포트와 따로 둔다. 같은 화면에 두면 "내가 얼마나 했나"가 아이들
 * 기록에 묻힌다. 부모도 자기 공부를 이어 가려면 자기 숫자를 봐야 한다.
 *
 * 아이 화면과 달리 레벨 시험도 요구권도 없다. 어른에게 필요한 것은
 * **얼마나 꾸준했는가**와 **무엇을 얼마나 익혔는가** 둘이다.
 */
export default function ParentRecord() {
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
  const day = data.days[today];

  return (
    <Screen>
      <Row style={{ paddingTop: spacing.lg, alignItems: 'center' }}>
        <Text style={{ fontSize: 34 }}>{profile.avatar}</Text>
        <View style={{ marginLeft: spacing.md, flex: 1 }}>
          <Text style={s.who}>{profile.name}</Text>
          <Muted>부모님 학습 기록</Muted>
        </View>
        {profile.streak > 0 ? <Chip label={`🔥 ${profile.streak}일 연속`} tone="accent" /> : null}
      </Row>

      {/* 오늘 */}
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>오늘</H3>
          <Chip
            label={day?.completed ? '목표 달성' : (day?.studied ?? 0) > 0 ? '진행 중' : '아직'}
            tone={day?.completed ? 'correct' : (day?.studied ?? 0) > 0 ? 'accent' : 'default'}
          />
        </Row>
        <Row style={{ justifyContent: 'space-around', marginTop: spacing.lg }}>
          <Stat label="푼 개수" value={`${day?.studied ?? 0}/${day?.goal ?? 0}`} />
          <Stat
            label="정답률"
            value={`${pct((day?.correct ?? 0), (day?.correct ?? 0) + (day?.wrong ?? 0))}%`}
          />
          <Stat label="시간" value={`${Math.round((day?.seconds ?? 0) / 60)}분`} />
          <Stat label="최고 연속" value={`${profile.bestStreak}일`} />
        </Row>
      </Card>

      {/* 최근 7일 */}
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>최근 7일</H3>
          <Muted>{weekly.completedCount}일 달성</Muted>
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
            아직 공부할 것을 안 골랐어요. 홈에서 정할 수 있습니다.
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

      {/* 최근 2주 */}
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

      <Button
        title="🗓️ 달력으로 보기"
        variant="secondary"
        onPress={() => router.push('/calendar')}
        style={{ marginTop: spacing.lg }}
      />
      <Button
        title="돌아가기"
        variant="ghost"
        onPress={() => router.back()}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
  );
}

function pct(part: number, total: number): number {
  return total === 0 ? 0 : Math.round((part / total) * 100);
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={s.statValue}>{value}</Text>
      <Muted style={{ fontSize: 11, marginTop: 2 }}>{label}</Muted>
    </View>
  );
}

const s = StyleSheet.create({
  who: { fontSize: font.h2, fontWeight: '800', color: colors.text },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  bar: { width: 18, borderRadius: 4 },
  spark: { flex: 1, height: 10, borderRadius: 3 },
});
