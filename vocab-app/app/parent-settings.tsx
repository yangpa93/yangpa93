import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { LEVEL_ORDER, LEVEL_SHORT, LevelId } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

const GOALS = [10, 12, 15, 18, 20];
const RATIOS = [50, 60, 70, 80];

export default function ParentSettings() {
  const { state, updateParent, updateSettings, updateProfile, deleteProfile } = useApp();
  const [selectedId, setSelectedId] = useState(state.activeProfileId ?? state.profiles[0]?.id ?? null);

  const profile = state.profiles.find((p) => p.id === selectedId) ?? null;

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

            <Text style={[s.label, { marginTop: spacing.lg }]}>하루 목표 단어 수</Text>
            <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
              {GOALS.map((g) => (
                <Pressable
                  key={g}
                  onPress={() => updateSettings(profile.id, { dailyGoal: g })}
                  style={[s.chip, profile.settings.dailyGoal === g && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, profile.settings.dailyGoal === g && s.chipTextOn]}>
                    {g}개
                  </Text>
                </Pressable>
              ))}
            </Row>

            <Text style={[s.label, { marginTop: spacing.lg }]}>복습 비중</Text>
            <Muted style={{ marginTop: spacing.xs }}>
              높을수록 틀렸던 단어를 더 많이 반복하고, 새 단어는 천천히 나갑니다.
            </Muted>
            <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
              {RATIOS.map((r) => (
                <Pressable
                  key={r}
                  onPress={() => updateSettings(profile.id, { reviewRatio: r })}
                  style={[s.chip, profile.settings.reviewRatio === r && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, profile.settings.reviewRatio === r && s.chipTextOn]}>
                    {r}%
                  </Text>
                </Pressable>
              ))}
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

          <Card style={{ marginTop: spacing.md }}>
            <H3>학년 조정</H3>
            <Muted style={{ marginTop: spacing.xs }}>
              보통은 단어를 다 외우면 자동으로 올라갑니다. 수동으로 바꾸면 그 학년 단어부터 다시 시작해요.
            </Muted>
            <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
              {LEVEL_ORDER.map((l: LevelId) => (
                <Pressable
                  key={l}
                  onPress={() => updateProfile(profile.id, { level: l })}
                  style={[s.chip, profile.level === l && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, profile.level === l && s.chipTextOn]}>{LEVEL_SHORT[l]}</Text>
                </Pressable>
              ))}
            </Row>
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

          <Button
            title={`${profile.name} 프로필 삭제`}
            variant="danger"
            onPress={confirmDelete}
            style={{ marginTop: spacing.lg }}
          />
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
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
