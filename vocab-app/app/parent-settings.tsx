import { useState } from 'react';
import { Alert, Pressable, Share, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { AwardRates, LEVEL_SHORT, LevelId } from '../src/types';
import { awardRates, formatWon } from '../src/features/awards';
import { buildInfo, buildLabel, feedbackHeader } from '../src/features/build-info';
import { LevelPicker } from '../src/components/LevelPicker';
import { AvatarPicker, labelOf } from '../src/components/AvatarPicker';
import { colors, font, radius, spacing } from '../src/theme';

const NEW_PER_DAY = [5, 8, 10, 15, 20];
const REVIEW_PER_DAY = [5, 10, 15, 20, 30];
const ROUNDS = [
  { value: 2, label: '2회 (가볍게)' },
  { value: 3, label: '3회 (표준)' },
  { value: 4, label: '4회 (집중)' },
];

/** 요구권 금액 항목. 값은 원 단위. */
const AWARD_FIELDS: {
  key: keyof AwardRates;
  label: string;
  hint: string;
  options: number[];
}[] = [
  {
    key: 'middleLevel',
    label: '중학교 레벨 하나를 끝냈을 때',
    hint: '중1-1부터 중3-4까지 12개 레벨',
    options: [0, 5_000, 10_000, 20_000, 30_000, 50_000],
  },
  {
    key: 'highLevel',
    label: '고등학교 레벨 하나를 끝냈을 때',
    hint: '고1-1부터 고3-4까지 12개 레벨. 단어가 어려워 보통 더 높게 둡니다.',
    options: [0, 10_000, 20_000, 30_000, 50_000, 100_000],
  },
  {
    key: 'perfectMonth',
    label: '한 달 개근',
    hint: '그달을 하루도 빠짐없이 학습했을 때. 목표를 채웠는지가 아니라 그날 했는지로 봅니다.',
    options: [0, 5_000, 10_000, 20_000, 30_000, 50_000],
  },
  {
    key: 'bonus',
    label: '아이가 더 요구할 수 있는 금액',
    hint: '“이번엔 정말 잘했어요”라며 한 칸 올려 요구할 수 있습니다. 승인할 때 기본 금액만 주는 것도 됩니다.',
    options: [0, 5_000, 10_000, 20_000],
  },
];

export default function ParentSettings() {
  const { state, updateParent, updateSettings, updateProfile, deleteProfile } = useApp();
  const [selectedId, setSelectedId] = useState(state.activeProfileId ?? state.profiles[0]?.id ?? null);

  const profile = state.profiles.find((p) => p.id === selectedId) ?? null;
  const rates = awardRates(state.parent.awards);
  const build = buildInfo();

  function confirmDelete() {
    if (!profile) return;
    Alert.alert(
      `${profile.name} 프로필을 지울까요?`,
      '학습 기록과 오답 노트가 모두 사라지고 되돌릴 수 없어요.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            await deleteProfile(profile.id);
            router.replace('/');
          },
        },
      ],
    );
  }

  return (
    <Screen>
      {/* 알림 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>매일 리포트 알림</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          정해진 시각에 아이의 학습 결과와 자주 틀린 단어를 이 기기의 알림으로 받습니다.
        </Muted>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <Text style={s.label}>알림 받기</Text>
          <Switch
            value={state.parent.notifyEnabled}
            onValueChange={(v) => updateParent({ notifyEnabled: v })}
            trackColor={{ true: colors.parent }}
          />
        </Row>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.md }}>
          <Text style={s.label}>목표를 못 채웠을 때만</Text>
          <Switch
            value={state.parent.notifyOnlyWhenMissed}
            onValueChange={(v) => updateParent({ notifyOnlyWhenMissed: v })}
            trackColor={{ true: colors.parent }}
          />
        </Row>

        <Text style={[s.label, { marginTop: spacing.lg }]}>알림 시각</Text>
        <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
          {[18, 19, 20, 21, 22].map((h) => (
            <Pressable
              key={h}
              onPress={() => updateParent({ notifyHour: h, notifyMinute: 0 })}
              style={[s.chip, state.parent.notifyHour === h && s.chipOn]}
              accessibilityRole="button"
            >
              <Text style={[s.chipText, state.parent.notifyHour === h && s.chipTextOn]}>
                오후 {h - 12}시
              </Text>
            </Pressable>
          ))}
        </Row>
      </Card>

      {/* 요구권 금액 — 기기 전체에 하나. 아이별로 다르게 두지 않는다. */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>요구권 금액</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아이가 레벨 시험에 통과하거나 한 달을 개근하면 금액이 정해진 요구권이
          생깁니다. 매번 흥정하지 않도록 조건별 금액을 미리 정해 두는 것입니다.
          {'\n'}0원으로 두면 그 요구권은 아예 생기지 않습니다.
        </Muted>

        {AWARD_FIELDS.map((f) => (
          <View key={f.key} style={{ marginTop: spacing.lg }}>
            <Text style={s.label}>{f.label}</Text>
            <Muted style={{ marginTop: 2 }}>{f.hint}</Muted>
            <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
              {f.options.map((won) => (
                <Pressable
                  key={won}
                  onPress={() => updateParent({ awards: { ...rates, [f.key]: won } })}
                  style={[s.chip, rates[f.key] === won && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, rates[f.key] === won && s.chipTextOn]}>
                    {won === 0 ? '안 함' : formatWon(won)}
                  </Text>
                </Pressable>
              ))}
            </Row>
          </View>
        ))}

        <View style={s.awardSummary}>
          <Muted>
            24개 레벨을 다 끝내면 레벨업 보상만 합계{' '}
            <Text style={{ fontWeight: '800', color: colors.text }}>
              {formatWon(rates.middleLevel * 12 + rates.highLevel * 12)}
            </Text>
            입니다. 여기에 개근 보상이 달마다 최대 {formatWon(rates.perfectMonth)} 더해집니다.
          </Muted>
        </View>
      </Card>

      {/*
        부모님 폰 연결.
        예전에는 이 카드가 '아이가 있을 때만' 그려지는 블록 안에 있었다.
        그런데 부모님 전용으로 쓸 폰에는 아이가 없다 — 그래서 정작 필요한
        기기에서 연결 버튼이 아예 안 보였다. 아이 수와 무관하게 내놓는다.
      */}
        <Card style={{ marginTop: spacing.md }}>
          <H3>부모님 폰으로 알림 받기</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {state.parentLink
              ? `${state.parentLink.label}에 연결돼 있습니다. 학습이 끝나면 바로 전송됩니다.`
              : '아직 연결된 부모님 폰이 없습니다. 지금은 이 기기에만 알림이 뜹니다.'}
          </Muted>
          {state.parentLink ? (
            <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
              <Text style={s.label}>학습 후 자동 전송</Text>
              <Switch
                value={state.parent.pushToParent}
                onValueChange={(v) => updateParent({ pushToParent: v })}
                trackColor={{ true: colors.parent }}
              />
            </Row>
          ) : null}
          <Button
            title={state.parentLink ? '연결 관리' : '부모님 폰 연결하기'}
            variant="parent"
            onPress={() => router.push('/parent-link')}
            style={{ marginTop: spacing.md }}
          />
        </Card>

      {/* 아이 선택 */}
      {state.profiles.length > 1 ? (
        <Row style={{ gap: spacing.sm, marginTop: spacing.lg, flexWrap: 'wrap' }}>
          {state.profiles.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => setSelectedId(p.id)}
              style={[s.chip, selectedId === p.id && s.chipOn]}
              accessibilityRole="button"
            >
              <Text style={[s.chipText, selectedId === p.id && s.chipTextOn]}>
                {p.avatar} {p.name}
              </Text>
            </Pressable>
          ))}
        </Row>
      ) : null}

      {profile ? (
        <>
          <Card style={{ marginTop: spacing.md }}>
            <H3>{profile.name} 학습 설정</H3>

            <Text style={[s.label, { marginTop: spacing.lg }]}>하루 새 단어 수</Text>
            <Muted style={{ marginTop: spacing.xs }}>
              진도를 정하는 값입니다. 하루 {profile.settings.newPerDay}개면 전체 3,286개를
              도는 데 약 {Math.round(3286 / profile.settings.newPerDay / 30)}개월 걸립니다.
            </Muted>
            <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
              {NEW_PER_DAY.map((g) => (
                <Pressable
                  key={g}
                  onPress={() => updateSettings(profile.id, { newPerDay: g })}
                  style={[s.chip, profile.settings.newPerDay === g && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, profile.settings.newPerDay === g && s.chipTextOn]}>
                    {g}개
                  </Text>
                </Pressable>
              ))}
            </Row>

            <Text style={[s.label, { marginTop: spacing.lg }]}>학습 강도</Text>
            <Muted style={{ marginTop: spacing.xs }}>
              한 단어를 한 번에 몇 번 만날지 정합니다. 3회면 문장 속에서 알아보기 →
              뜻 구별하기 → 직접 쓰기를 모두 거칩니다. 하루{' '}
              {profile.settings.newPerDay + profile.settings.reviewPerDay}단어 ×{' '}
              {profile.settings.rounds}회 ={' '}
              {(profile.settings.newPerDay + profile.settings.reviewPerDay) * profile.settings.rounds}문제,
              약{' '}
              {Math.round(
                ((profile.settings.newPerDay + profile.settings.reviewPerDay) *
                  profile.settings.rounds *
                  10) /
                  60,
              )}
              분 걸립니다.
            </Muted>
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

            <Text style={[s.label, { marginTop: spacing.lg }]}>하루 복습 단어 수</Text>
            <Muted style={{ marginTop: spacing.xs }}>
              새 단어 위에 얹히는 복습의 상한입니다. 복습이 밀리면 오래 밀린 것과
              많이 틀린 것부터 채웁니다. 늘리면 덜 잊지만 하루가 길어집니다.
            </Muted>
            <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
              {REVIEW_PER_DAY.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => updateSettings(profile.id, { reviewPerDay: r })}
                  style={[s.chip, profile.settings.reviewPerDay === r && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, profile.settings.reviewPerDay === r && s.chipTextOn]}>
                    {r}개
                  </Text>
                </Pressable>
              ))}
            </Row>

            <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
              <View style={{ flex: 1, paddingRight: spacing.md }}>
                <Text style={s.label}>‘해석 보기’ 버튼</Text>
                <Muted style={{ marginTop: 2 }}>
                  빈칸 문제에서 아이가 막힐 때 눌러서 한국어 해석을 볼 수 있게 합니다.
                  처음부터 보여주지는 않습니다 — 해석이 먼저 보이면 영어 문장을 읽지
                  않고 답을 고르기 때문입니다. 끄면 문제를 푼 뒤에만 해석이 나옵니다.
                </Muted>
              </View>
              <Switch
                value={profile.settings.showTranslation}
                onValueChange={(v) => updateSettings(profile.id, { showTranslation: v })}
                trackColor={{ true: colors.parent }}
              />
            </Row>

            <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
              <Text style={s.label}>소리로 읽어주기</Text>
              <Switch
                value={profile.settings.ttsEnabled}
                onValueChange={(v) => updateSettings(profile.id, { ttsEnabled: v })}
                trackColor={{ true: colors.parent }}
              />
            </Row>

            <Row style={{ justifyContent: 'space-between', marginTop: spacing.md }}>
              <Text style={s.label}>진동 피드백</Text>
              <Switch
                value={profile.settings.hapticsEnabled}
                onValueChange={(v) => updateSettings(profile.id, { hapticsEnabled: v })}
                trackColor={{ true: colors.parent }}
              />
            </Row>
          </Card>

          {/*
            이미 만든 프로필의 캐릭터를 바꾸는 곳.
            이게 없으면 캐릭터를 바꾸려고 프로필을 지웠다 다시 만들어야 하고,
            그러면 그동안의 학습 기록이 통째로 사라진다.
          */}
          <Card style={{ marginTop: spacing.md }}>
            <H3>{profile.name} 캐릭터</H3>
            <Muted style={{ marginTop: spacing.xs }}>
              지금은 {profile.avatar} {labelOf(profile.avatar)}입니다. 바꿔도 학습 기록은 그대로입니다.
            </Muted>
            <AvatarPicker
              value={profile.avatar}
              onChange={(emoji) => updateProfile(profile.id, { avatar: emoji })}
              tone="parent"
            />
          </Card>

          <Card style={{ marginTop: spacing.md }}>
            <H3>학년·레벨 조정</H3>
            <Muted style={{ marginTop: spacing.xs }}>
              보통은 레벨 시험에 통과하면 자동으로 올라갑니다. 수동으로 바꾸면 그 레벨 단어부터 다시 시작해요.
            </Muted>
            <View style={{ marginTop: spacing.md }}>
              <LevelPicker
                value={profile.level}
                onChange={(l: LevelId) => updateProfile(profile.id, { level: l })}
                tone="parent"
              />
            </View>
            {profile.clearedLevels.length > 0 ? (
              <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
                <Muted>완료: </Muted>
                {profile.clearedLevels.map((l) => (
                  <Chip key={l} label={LEVEL_SHORT[l]} tone="correct" />
                ))}
              </Row>
            ) : null}
          </Card>


          <Card style={{ marginTop: spacing.md }}>
            <H3>학습 기록 백업</H3>
            <Muted style={{ marginTop: spacing.xs }}>
              기록은 이 기기 안에만 있습니다. 폰을 바꾸거나 앱을 지우면 사라지니
              한 달에 한 번쯤 파일로 빼 두세요. 새 폰에서 그대로 되살릴 수 있습니다.
            </Muted>
            <Button
              title="내보내기 · 가져오기"
              variant="parent"
              onPress={() => router.push('/parent-backup')}
              style={{ marginTop: spacing.md }}
            />
          </Card>

          <Card style={{ marginTop: spacing.md }}>
            <H3>PIN</H3>
            <Button
              title="PIN 다시 설정하기"
              variant="secondary"
              onPress={() => {
                updateParent({ pin: null });
                router.replace('/parent');
              }}
              style={{ marginTop: spacing.md }}
            />
          </Card>

          {/*
            베타 동안만 보이는 카드. 아이가 "이게 이상해요"라고 할 때
            어느 빌드에서 그랬는지가 없으면 재현할 수가 없다.
          */}
          {build.isBeta ? (
            <Card style={{ marginTop: spacing.md, borderColor: colors.accent }}>
              <H3>🧪 베타 의견 보내기</H3>
              <Muted style={{ marginTop: spacing.xs }}>
                이상한 점이나 불편한 점을 적어 보내 주세요. 어느 빌드에서 그랬는지가
                자동으로 붙습니다.
              </Muted>
              <Button
                title="의견 적어 보내기"
                variant="secondary"
                onPress={() => {
                  Share.share({
                    message: `[가가_Voca 베타 의견]\n\n무엇이 이상했나요?\n\n\n어떻게 하면 다시 나타나나요?\n\n\n${feedbackHeader(build)}`,
                  }).catch(() => {});
                }}
                style={{ marginTop: spacing.md }}
              />
            </Card>
          ) : null}

          <Button
            title={`${profile.name} 프로필 삭제`}
            variant="danger"
            onPress={confirmDelete}
            style={{ marginTop: spacing.lg }}
          />

          <Muted style={{ marginTop: spacing.xl, textAlign: 'center' }}>
            {buildLabel(build)}
          </Muted>
        </>
      ) : null}
    </Screen>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  awardSummary: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
