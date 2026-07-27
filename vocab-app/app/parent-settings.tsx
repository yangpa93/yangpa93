import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { LEVEL_SHORT, LevelId } from '../src/types';
import { LevelPicker } from '../src/components/LevelPicker';
import { colors, font, radius, spacing } from '../src/theme';

const NEW_PER_DAY = [5, 8, 10, 15, 20];
const REVIEW_PER_DAY = [5, 10, 15, 20, 30];
const ROUNDS = [
  { value: 2, label: '2회 (가볍게)' },
  { value: 3, label: '3회 (표준)' },
  { value: 4, label: '4회 (집중)' },
];

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
                <Text style={s.label}>해석 미리 보여주기</Text>
                <Muted style={{ marginTop: 2 }}>
                  빈칸 문제에서 한국어 해석을 처음부터 보여줍니다. 아직 문장을 읽기
                  어려우면 켜 두세요. 실력이 붙으면 끄면 난이도가 올라갑니다.
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
