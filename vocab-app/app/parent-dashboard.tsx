import { useEffect, useMemo, useState } from 'react';
import { Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, EmptyState, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { loadProfileData } from '../src/store/storage';
import { buildDailyReport, buildWeeklySummary, DailyReport, reportText, WeeklySummary } from '../src/features/report';
import { levelProgress } from '../src/srs/progress';
import { formatKo, todayKey } from '../src/lib/date';
import { LEVEL_LABEL, ProfileData } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/** 부모용 대시보드. 아이별 일일 리포트와 주간 요약을 보여준다. */
export default function ParentDashboard() {
  const { state, data } = useApp();
  const [selectedId, setSelectedId] = useState(state.activeProfileId ?? state.profiles[0]?.id ?? null);
  const [dataById, setDataById] = useState<Record<string, ProfileData>>({});

  const today = todayKey();

  // 아이마다 저장소가 따로라 전부 읽어 온다.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const out: Record<string, ProfileData> = {};
      for (const p of state.profiles) {
        out[p.id] = p.id === state.activeProfileId ? data : await loadProfileData(p.id);
      }
      if (!cancelled) setDataById(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [state.profiles, state.activeProfileId, data]);

  const profile = state.profiles.find((p) => p.id === selectedId) ?? null;
  const pdata = profile ? dataById[profile.id] : undefined;

  const report: DailyReport | null = useMemo(
    () => (profile && pdata ? buildDailyReport(profile, pdata, ALL_ENTRIES, today) : null),
    [profile, pdata, today],
  );

  const weekly: WeeklySummary | null = useMemo(
    () => (pdata ? buildWeeklySummary(pdata, today) : null),
    [pdata, today],
  );

  const progress = useMemo(
    () => (profile && pdata ? levelProgress(ALL_ENTRIES, pdata.cards, profile.level) : null),
    [profile, pdata],
  );

  const pendingRewards = state.rewards.filter((r) => r.status === 'pending');

  // 부모님 전용 기기는 자기 학습 데이터가 없다. 아이 기기들이 보내 온
  // 리포트만 쌓여 있으므로 그것을 보여준다.
  if (state.role === 'parent') {
    return <ReceivedInbox />;
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
      {/* 아이 선택 */}
      {state.profiles.length > 1 ? (
        <Row style={{ gap: spacing.sm, paddingTop: spacing.md, flexWrap: 'wrap' }}>
          {state.profiles.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => setSelectedId(p.id)}
              style={[s.tab, selectedId === p.id && s.tabOn]}
              accessibilityRole="button"
            >
              <Text style={[s.tabText, selectedId === p.id && s.tabTextOn]}>
                {p.avatar} {p.name}
              </Text>
            </Pressable>
          ))}
        </Row>
      ) : null}

      {pendingRewards.length > 0 ? (
        <Pressable onPress={() => router.push('/parent-rewards')} accessibilityRole="button">
          <Card style={{ marginTop: spacing.md, backgroundColor: colors.accentSoft, borderColor: colors.accent }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <H3>🎁 새 보상 요청 {pendingRewards.length}건</H3>
              <Text style={{ color: '#B45309', fontWeight: '800' }}>확인 →</Text>
            </Row>
          </Card>
        </Pressable>
      ) : null}

      {/* 오늘 */}
      {report ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>{formatKo(today)}</H3>
            <Chip
              label={report.completed ? '목표 달성' : report.studied > 0 ? '진행 중' : '미학습'}
              tone={report.completed ? 'correct' : report.studied > 0 ? 'accent' : 'wrong'}
            />
          </Row>

          <Row style={{ justifyContent: 'space-around', marginTop: spacing.lg }}>
            <Stat label="학습 단어" value={`${report.studied}/${report.goal}`} />
            <Stat label="정답률" value={`${Math.round(report.accuracy * 100)}%`} />
            <Stat label="학습 시간" value={`${report.minutes}분`} />
            <Stat label="연속" value={`${report.streak}일`} />
          </Row>
        </Card>
      ) : null}

      {/* 주간 */}
      {weekly ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>최근 7일</H3>
            <Muted>{weekly.completedCount}일 달성</Muted>
          </Row>
          <Row style={{ marginTop: spacing.lg, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            {weekly.days.map((d) => {
              const height = Math.max(6, Math.min(56, d.studied * 3));
              return (
                <View key={d.date} style={{ alignItems: 'center', flex: 1 }}>
                  <View
                    style={[
                      s.bar,
                      { height, backgroundColor: d.completed ? colors.primary : colors.border },
                    ]}
                  />
                  <Muted style={{ fontSize: 10, marginTop: spacing.xs }}>{d.date.slice(8)}</Muted>
                </View>
              );
            })}
          </Row>
          <Muted style={{ marginTop: spacing.md }}>
            총 {weekly.totalStudied}개 학습 · 평균 정답률 {Math.round(weekly.averageAccuracy * 100)}%
          </Muted>
        </Card>
      ) : null}

      {/* 레벨 */}
      {progress ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>{LEVEL_LABEL[profile.level]}</H3>
            <Muted>
              {progress.mastered} / {progress.total}개
            </Muted>
          </Row>
          <View style={{ marginTop: spacing.md }}>
            <ProgressBar value={progress.ratio} color={colors.accent} />
          </View>
          <Muted style={{ marginTop: spacing.sm }}>
            {progress.canTakeExam
              ? '레벨 시험을 볼 수 있습니다. 그 학년 단어를 모두 맞혀야 통과합니다.'
              : `${progress.remaining}개 더 외우면 레벨 시험을 볼 수 있습니다.`}
          </Muted>
        </Card>
      ) : null}

      {/* 오늘 틀린 단어 */}
      {report && report.todayMistakes.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>오늘 틀린 단어</H3>
          {report.todayMistakes.map((m) => (
            <Row key={m.word} style={{ marginTop: spacing.md, alignItems: 'flex-start' }}>
              <Body style={{ fontWeight: '700', width: 120 }}>{m.word}</Body>
              <Muted style={{ flex: 1 }}>{m.meaning}</Muted>
              {m.count > 1 ? <Chip label={`${m.count}번`} tone="wrong" /> : null}
            </Row>
          ))}
        </Card>
      ) : null}

      {/* 자주 틀리는 단어 */}
      {report && report.chronicMistakes.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>자주 틀리는 단어</H3>
          <Muted style={{ marginTop: spacing.xs }}>이 단어들은 매일 우선해서 다시 출제됩니다.</Muted>
          {report.chronicMistakes.map((m) => (
            <Row key={m.word} style={{ marginTop: spacing.md, alignItems: 'flex-start' }}>
              <Body style={{ fontWeight: '700', width: 120 }}>{m.word}</Body>
              <Muted style={{ flex: 1 }}>{m.meaning}</Muted>
              <Chip label={`누적 ${m.wrong}회`} tone="wrong" />
            </Row>
          ))}
        </Card>
      ) : null}

      <Button
        title="리포트 공유하기"
        variant="secondary"
        onPress={() => {
          if (!report) return;
          Share.share({ message: reportText(report, weekly ?? undefined) }).catch(() => {});
        }}
        style={{ marginTop: spacing.lg }}
      />
      <Button
        title="보상 요청 관리"
        variant="parent"
        onPress={() => router.push('/parent-rewards')}
        style={{ marginTop: spacing.sm }}
      />
      <Button
        title="설정"
        variant="ghost"
        onPress={() => router.push('/parent-settings')}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
  );
}

/**
 * 부모님 전용 기기 화면.
 *
 * 아이 기기가 보내 온 리포트를 날짜별로 모아 보여준다. 알림을 지워 버려도
 * 여기 남아 있어서 며칠 치를 훑어볼 수 있다.
 */
function ReceivedInbox() {
  const { state } = useApp();
  const today = todayKey();

  const byDate = useMemo(() => {
    const groups = new Map<string, typeof state.receivedReports>();
    for (const r of state.receivedReports) {
      const list = groups.get(r.date) ?? [];
      list.push(r);
      groups.set(r.date, list);
    }
    return [...groups.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [state.receivedReports]);

  const todayReports = state.receivedReports.filter((r) => r.date === today);

  return (
    <Screen>
      <Card
        style={{
          marginTop: spacing.md,
          backgroundColor: todayReports.length > 0 ? colors.correctSoft : colors.bg,
          borderColor: todayReports.length > 0 ? colors.correct : colors.border,
        }}
      >
        <H3>{formatKo(today)}</H3>
        {todayReports.length === 0 ? (
          <Muted style={{ marginTop: spacing.sm }}>
            아직 오늘 리포트가 오지 않았습니다. 아이가 학습을 마치면 알림이 옵니다.
          </Muted>
        ) : (
          todayReports.map((r) => (
            <View key={r.id} style={{ marginTop: spacing.md }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Body style={{ fontWeight: '800', flex: 1 }}>{r.childName}</Body>
                <Chip label={r.completed ? '목표 달성' : '목표 미달'} tone={r.completed ? 'correct' : 'wrong'} />
              </Row>
              <Muted style={{ marginTop: spacing.xs }}>{r.headline}</Muted>
            </View>
          ))
        )}
      </Card>

      {byDate.length === 0 ? (
        <EmptyState
          icon="📭"
          title="받은 리포트가 없어요"
          hint="아이 기기에서 부모님 폰 연결을 마쳤는지 확인해 주세요."
        />
      ) : (
        byDate.map(([date, list]) => (
          <Card key={date} style={{ marginTop: spacing.md }}>
            <H3>{formatKo(date)}</H3>
            {list.map((r) => (
              <View key={r.id} style={{ marginTop: spacing.md }}>
                <Row style={{ justifyContent: 'space-between' }}>
                  <Body style={{ fontWeight: '700', flex: 1 }}>{r.childName}</Body>
                  <Chip
                    label={r.completed ? '달성' : '미달'}
                    tone={r.completed ? 'correct' : 'wrong'}
                  />
                </Row>
                <Text style={s.detail}>{r.detail}</Text>
              </View>
            ))}
          </Card>
        ))
      )}

      <Button
        title="연결 관리"
        variant="parent"
        onPress={() => router.push('/parent-link')}
        style={{ marginTop: spacing.lg }}
      />
      <Button
        title="알림 시각 설정"
        variant="ghost"
        onPress={() => router.push('/parent-settings')}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
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

const s = StyleSheet.create({
  tab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  tabText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  tabTextOn: { color: '#fff' },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  detail: { fontSize: font.small, color: colors.subtext, lineHeight: 20, marginTop: spacing.sm },
  bar: { width: 18, borderRadius: 4 },
});
