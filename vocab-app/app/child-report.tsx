import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, Share, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Body,
  Button,
  Card,
  Chip,
  H3,
  Muted,
  ProgressBar,
  Row,
  Screen,
} from '../src/components/ui';
import { askConfirm } from '../src/lib/confirm';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { loadProfileData } from '../src/store/storage';
import {
  buildDailyReport,
  buildWeeklySummary,
  DailyReport,
  reportText,
  WeeklySummary,
} from '../src/features/report';
import { buildMonthlyReport } from '../src/features/monthly';
import { monthOf } from '../src/features/calendar';
import { MonthlyCard } from '../src/components/MonthlyCard';
import { LevelPicker } from '../src/components/LevelPicker';
import { AwardRatesEditor } from '../src/components/AwardRatesEditor';
import { levelProgress } from '../src/srs/progress';
import { canTakeKoExam } from '../src/srs/koExam';
import { Award, availableAwards, formatWon, ratesOf } from '../src/features/awards';
import { sendSettingsToChild } from '../src/features/push';
import { formatKo, todayKey } from '../src/lib/date';
import {
  AwardRates,
  LEVEL_LABEL,
  LEVEL_SHORT,
  LevelId,
  Profile,
  ProfileData,
  Subject,
  SUBJECT_LABEL,
  SUBJECT_ORDER,
  toggleSubject,
} from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';
import { primaryParent } from '../src/features/parentLinks';

const NEW_PER_DAY = [5, 8, 10, 15, 20];
const REVIEW_PER_DAY = [5, 10, 15, 20, 30];
const ROUNDS = [
  { value: 2, label: '2회 (가볍게)' },
  { value: 3, label: '3회 (표준)' },
  { value: 4, label: '4회 (집중)' },
];

/**
 * 아이 하나의 학습 보고서와 설정.
 *
 * **아이마다 한 화면**이다. 예전에는 부모 대시보드 한 장에 모든 아이의
 * 리포트가 이어 붙어 화면이 끝없이 길었고, 설정은 또 다른 화면에 기기 전체로
 * 하나뿐이었다. 그런데 큰딸과 작은딸은 학년도 속도도 다르다 — 하루 분량도,
 * 과목도, 동기 부여 요청권 금액도 같을 이유가 없다.
 *
 * 그래서 "이 아이에 대한 모든 것"을 여기 모은다. 보고 나서 바로 고칠 수 있어야
 * 하기 때문이다. 리포트를 보고 설정을 바꾸려고 다른 화면을 찾아 나가면
 * 대부분 그냥 넘어간다.
 */
export default function ChildReport() {
  const { state, data, updateProfile, updateSettings, deleteProfile, grantReward } = useApp();
  const params = useLocalSearchParams<{ profileId?: string }>();
  const today = todayKey();

  const profile = state.profiles.find((p) => p.id === params.profileId) ?? null;
  const [pdata, setPdata] = useState<ProfileData | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!profile) return;
      const d = profile.id === state.activeProfileId ? data : await loadProfileData(profile.id);
      if (!cancelled) setPdata(d);
    })();
    return () => {
      cancelled = true;
    };
  }, [profile?.id, state.activeProfileId, data]);

  const report: DailyReport | null = useMemo(
    () => (profile && pdata ? buildDailyReport(profile, pdata, ALL_ENTRIES, today) : null),
    [profile, pdata, today],
  );
  const weekly: WeeklySummary | null = useMemo(
    () => (pdata ? buildWeeklySummary(pdata, today) : null),
    [pdata, today],
  );
  const monthly = useMemo(
    () =>
      profile && pdata
        ? buildMonthlyReport(monthOf(today), pdata.days, pdata.cards, pdata.exams, ALL_ENTRIES, today)
        : null,
    [profile, pdata, today],
  );
  const progress = useMemo(
    () => (profile && pdata ? levelProgress(ALL_ENTRIES, pdata.cards, profile.level) : null),
    [profile, pdata],
  );
  const koProgress = useMemo(
    () => (profile && pdata ? canTakeKoExam(KO_ENTRIES, pdata.cards, profile.koLevel) : null),
    [profile, pdata],
  );

  if (!profile) {
    return (
      <Screen>
        <Muted style={{ paddingTop: spacing.lg }}>아이를 찾을 수 없습니다.</Muted>
        <Button title="돌아가기" variant="ghost" onPress={() => router.back()} style={{ marginTop: spacing.md }} />
      </Screen>
    );
  }

  const rates = ratesOf(profile, state.parent.awards);
  const usingOwn = profile.awards != null;

  function confirmDelete() {
    if (!profile) return;
    /*
     * askConfirm 을 쓴다 — `Alert.alert` 는 react-native-web 에서 조용히
     * 아무 일도 안 해서, 노트북 미리보기로는 **지우는 길이 있는지조차** 확인할
     * 수가 없었다. 폰에서는 멀쩡히 떠서 더 헷갈렸다.
     */
    askConfirm(
      `${profile.name} 프로필을 지울까요?`,
      '학습 기록과 오답 노트가 모두 사라지고 되돌릴 수 없어요.',
      () => {
        void deleteProfile(profile.id).then(() => router.replace('/parent-children'));
      },
      { confirmText: '삭제', destructive: true },
    );
  }

  /**
   * 과목을 바꾸면 아이 기기에도 알린다.
   *
   * 아이가 자기 폰을 쓰면 이 폰에서 바꾼 값이 저절로 넘어가지 않는다.
   * 아이를 불러 폰을 걷어 오는 것은 현실적이지 않으므로 알림으로 보낸다.
   */
  function setSubjects(next: Subject[]) {
    if (!profile || next.length === 0) return;
    updateSettings(profile.id, { subjects: next });
    const known = (state.knownChildren ?? []).find((c) => c.name === profile.name);
    if (known) {
      void sendSettingsToChild(known.token, {
        from: primaryParent(state.parentLinks)?.label ?? '부모님',
        subjects: next,
      }).catch(() => {});
    }
  }

  const subjects = profile.settings.subjects;
  const questions = (profile.settings.newPerDay + profile.settings.reviewPerDay) * profile.settings.rounds;

  return (
    <Screen>
      <Row style={{ paddingTop: spacing.lg, alignItems: 'center' }}>
        <Text style={{ fontSize: 34 }}>{profile.avatar}</Text>
        <View style={{ marginLeft: spacing.md, flex: 1 }}>
          <Text style={s.who}>{profile.name}</Text>
          <Muted>{LEVEL_LABEL[profile.level]}</Muted>
        </View>
        {profile.streak > 0 ? <Chip label={`🔥 ${profile.streak}일`} tone="accent" /> : null}
      </Row>

      {/* ---------------- 보고서 ---------------- */}

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

      {weekly ? (
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
                      height: Math.max(6, Math.min(56, d.studied * 3)),
                      backgroundColor: d.completed ? colors.primary : colors.border,
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
          <Button
            title="🗓️ 달력으로 보기"
            variant="secondary"
            onPress={() => router.push({ pathname: '/calendar', params: { profileId: profile.id } })}
            style={{ marginTop: spacing.lg }}
          />
        </Card>
      ) : null}

      {progress ? (
        <Card style={{ marginTop: spacing.md }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>영어 {LEVEL_SHORT[profile.level]}</H3>
            <Muted>
              {progress.mastered} / {progress.total}개
            </Muted>
          </Row>
          <View style={{ marginTop: spacing.md }}>
            <ProgressBar value={progress.ratio} color={colors.accent} />
          </View>
          <Muted style={{ marginTop: spacing.sm }}>
            {progress.canTakeExam
              ? '레벨 시험을 볼 수 있습니다.'
              : `${progress.remaining}개 더 외우면 레벨 시험을 볼 수 있습니다.`}
          </Muted>

          {koProgress && subjects.includes('ko') ? (
            <>
              <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
                <H3>국어 {LEVEL_SHORT[profile.koLevel]}</H3>
                <Muted>
                  {koProgress.mastered} / {koProgress.total}개
                </Muted>
              </Row>
              <View style={{ marginTop: spacing.md }}>
                <ProgressBar
                  value={koProgress.total === 0 ? 0 : koProgress.mastered / koProgress.total}
                  color={colors.accent}
                />
              </View>
            </>
          ) : null}
        </Card>
      ) : null}

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

      {monthly ? <MonthlyCard report={monthly} name={profile.name} /> : null}

      {pdata ? (
        <GrantCard profile={profile} pdata={pdata} today={today} rates={rates} onGive={grantReward} />
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

      {/* ---------------- 이 아이의 설정 ---------------- */}

      <View style={s.divider} />
      <H3>⚙️ {profile.name} 학습 설정</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        여기서 정한 것은 이 아이에게만 적용됩니다. 다른 아이는 그대로예요.
      </Muted>

      <Card style={{ marginTop: spacing.md }}>
        <H3>공부할 과목</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          바꾸면 아이 폰에도 알림으로 전달됩니다. 하나는 켜 두어야 해요.
        </Muted>
        {/*
          갈래가 셋이 됐다. 일상 생활 문장은 부모에게만 있던 것인데 아이도
          켤 수 있게 했다 — 문장 80개는 어른 것이라기보다 그냥 자주 쓰는 말이다.

          마지막 하나를 끄는 것은 toggleSubject 가 막는다. 하나도 안 켜면 낼
          문제가 없어져 아이 화면이 빈 채로 뜬다.
        */}
        <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
          {SUBJECT_ORDER.map((sub) => {
            const on = subjects.includes(sub);
            return (
              <Pressable
                key={sub}
                onPress={() => {
                  const next = toggleSubject(subjects, sub);
                  if (next) setSubjects(next);
                }}
                style={[s.chip, on && s.chipOn]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
              >
                <Text style={[s.chipText, on && s.chipTextOn]}>
                  {on ? '✓ ' : ''}
                  {SUBJECT_LABEL[sub]}
                </Text>
              </Pressable>
            );
          })}
        </Row>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>하루 분량</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          새 단어 {profile.settings.newPerDay}개 + 복습 {profile.settings.reviewPerDay}개를{' '}
          {profile.settings.rounds}번씩 — 오늘 {questions}문제, 약{' '}
          {Math.max(1, Math.round((questions * 10) / 60))}분.
          {'\n'}새 단어 수는 아이도 ⚙️ 설정에서 바꿉니다. 스스로 정한 속도라야
          앞당겼을 때 그것이 자기 성과가 되기 때문입니다.
        </Muted>

        <Text style={[s.label, { marginTop: spacing.lg }]}>하루 새 단어 수</Text>
        <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
          {NEW_PER_DAY.map((g) => (
            <Pressable
              key={g}
              onPress={() => updateSettings(profile.id, { newPerDay: g })}
              style={[s.chip, profile.settings.newPerDay === g && s.chipOn]}
              accessibilityRole="button"
            >
              <Text style={[s.chipText, profile.settings.newPerDay === g && s.chipTextOn]}>{g}개</Text>
            </Pressable>
          ))}
        </Row>

        <Text style={[s.label, { marginTop: spacing.lg }]}>하루 복습 단어 수</Text>
        <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
          {REVIEW_PER_DAY.map((r) => (
            <Pressable
              key={r}
              onPress={() => updateSettings(profile.id, { reviewPerDay: r })}
              style={[s.chip, profile.settings.reviewPerDay === r && s.chipOn]}
              accessibilityRole="button"
            >
              <Text style={[s.chipText, profile.settings.reviewPerDay === r && s.chipTextOn]}>{r}개</Text>
            </Pressable>
          ))}
        </Row>

        <Text style={[s.label, { marginTop: spacing.lg }]}>학습 강도</Text>
        <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
          {ROUNDS.map((r) => (
            <Pressable
              key={r.value}
              onPress={() => updateSettings(profile.id, { rounds: r.value })}
              style={[s.chip, profile.settings.rounds === r.value && s.chipOn]}
              accessibilityRole="button"
            >
              <Text style={[s.chipText, profile.settings.rounds === r.value && s.chipTextOn]}>
                {r.label}
              </Text>
            </Pressable>
          ))}
        </Row>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.label}>‘해석 보기’ 버튼</Text>
            <Muted style={{ marginTop: 2 }}>
              빈칸 문제에서 막힐 때 눌러서 한국어 해석을 볼 수 있게 합니다. 끄면
              문제를 푼 뒤에만 해석이 나옵니다.
            </Muted>
          </View>
          <Switch
            value={profile.settings.showTranslation}
            onValueChange={(v) => updateSettings(profile.id, { showTranslation: v })}
            trackColor={{ true: colors.parent }}
          />
        </Row>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>학년·레벨 조정</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          보통은 레벨 시험에 통과하면 자동으로 올라갑니다. 수동으로 바꾸면 그 레벨
          단어부터 다시 시작해요.
        </Muted>
        <Text style={[s.label, { marginTop: spacing.lg }]}>영어</Text>
        <View style={{ marginTop: spacing.sm }}>
          <LevelPicker
            value={profile.level}
            onChange={(l: LevelId) => updateProfile(profile.id, { level: l })}
            tone="parent"
          />
        </View>
        {subjects.includes('ko') ? (
          <>
            <Text style={[s.label, { marginTop: spacing.lg }]}>국어</Text>
            <View style={{ marginTop: spacing.sm }}>
              <LevelPicker
                value={profile.koLevel}
                onChange={(l: LevelId) => updateProfile(profile.id, { koLevel: l })}
                tone="parent"
                showCounts={false}
              />
            </View>
          </>
        ) : null}
        {profile.clearedLevels.length > 0 ? (
          <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
            <Muted>완료: </Muted>
            {profile.clearedLevels.map((l) => (
              <Chip key={l} label={LEVEL_SHORT[l]} tone="correct" />
            ))}
          </Row>
        ) : null}
      </Card>

      {/* 동기 부여 요청권 금액 — 아이마다 다르게 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>🎟️ {profile.name}의 동기 부여 요청권 금액</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          {usingOwn
            ? '이 아이만의 금액을 쓰고 있습니다.'
            : '지금은 기기 기본 금액을 그대로 씁니다. 아래에서 하나라도 바꾸면 이 아이만의 금액이 됩니다.'}
        </Muted>

        <AwardRatesEditor
          rates={rates}
          onChange={(next) => updateProfile(profile.id, { awards: next })}
        />

        {usingOwn ? (
          <Button
            title="기기 기본 금액으로 되돌리기"
            variant="ghost"
            onPress={() => updateProfile(profile.id, { awards: null })}
            style={{ marginTop: spacing.lg }}
          />
        ) : null}
      </Card>

      {/*
        아이가 부모와 연결하지 않기로 승인된 상태를 여기서도 되돌릴 수 있게
        한다. 승인은 아이 폰에서 PIN 을 눌러 하지만, 마음이 바뀌었을 때
        아이 폰을 다시 손에 들어야 한다면 대부분 그냥 둔다.
      */}
      {profile.linkWaived ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>🔕 연결하지 않기로 되어 있어요</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {profile.name}의 화면에 ‘부모님과 연결하기’가 안 뜹니다. 다시 뜨게 하려면
            아래를 누르세요.
          </Muted>
          <Button
            title="연결 안내 다시 띄우기"
            variant="secondary"
            onPress={() => updateProfile(profile.id, { linkWaived: false })}
            style={{ marginTop: spacing.md }}
          />
        </Card>
      ) : null}

      <Button
        title={`${profile.name} 프로필 삭제`}
        variant="danger"
        onPress={confirmDelete}
        style={{ marginTop: spacing.xl }}
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

/**
 * 아이에게 동기 부여 요청권을 먼저 주는 카드.
 *
 * 조건을 채우지도 않았는데 줄 수 있게 하면 "레벨을 끝내면 얼마"라는 규칙
 * 자체가 무너진다. 지금 줄 수 있는 것이 없으면 버튼이 꺼진다.
 */
function GrantCard({
  profile,
  pdata,
  today,
  rates,
  onGive,
}: {
  profile: Profile;
  pdata: ProfileData;
  today: string;
  rates: AwardRates;
  onGive: (profileId: string, award: Award, parentNote?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('');

  const awards = useMemo(
    () => availableAwards(profile, pdata, today, rates),
    [profile, pdata, today, rates],
  );

  return (
    <Card style={{ marginTop: spacing.md }}>
      <H3>🎟️ 보상하기</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        {awards.length > 0
          ? `${profile.name}에게 지금 줄 수 있는 동기 부여 요청권이 ${awards.length}장 있습니다.`
          : `지금 줄 수 있는 동기 부여 요청권이 없습니다. 레벨 시험에 통과하거나 한 달을 개근하면 생깁니다.`}
      </Muted>

      {open ? (
        <View style={{ marginTop: spacing.lg }}>
          {awards.map((a) => (
            <View key={`${a.kind}-${a.earnedFrom ?? a.month}`} style={s.grantRow}>
              <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Muted style={{ flex: 1, paddingRight: spacing.md }}>{a.reason}</Muted>
                <Text style={s.grantAmount}>{formatWon(a.amount)}</Text>
              </Row>
              <Button
                title={`${formatWon(a.amount)} 주기`}
                variant="parent"
                onPress={() => {
                  onGive(profile.id, a, note.trim());
                  setNote('');
                  setOpen(false);
                }}
                style={{ marginTop: spacing.md }}
              />
            </View>
          ))}

          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="아이에게 한마디 (선택)"
            placeholderTextColor={colors.muted}
            style={s.noteInput}
            maxLength={100}
          />
          <Muted style={{ marginTop: spacing.xs }}>여기 적은 말은 아이 홈 화면에 그대로 보입니다.</Muted>
          <Button title="닫기" variant="ghost" onPress={() => setOpen(false)} style={{ marginTop: spacing.sm }} />
        </View>
      ) : (
        <Button
          title={
            awards.length > 0
              ? `🎟️ 보상하기 (${formatWon(awards.reduce((n, a) => n + a.amount, 0))})`
              : '🎟️ 보상하기'
          }
          variant="parent"
          onPress={() => setOpen(true)}
          disabled={awards.length === 0}
          style={{ marginTop: spacing.lg }}
        />
      )}
    </Card>
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
  who: { fontSize: font.h2, fontWeight: '800', color: colors.text },
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
  statValue: { fontSize: 20, fontWeight: '800', color: colors.text },
  bar: { width: 18, borderRadius: 4 },
  divider: {
    marginTop: spacing.xxl,
    marginBottom: spacing.lg,
    height: 1,
    backgroundColor: colors.border,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
  grantRow: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  grantAmount: { fontSize: 20, fontWeight: '800', color: '#B45309' },
  noteInput: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.bg,
  },
});
