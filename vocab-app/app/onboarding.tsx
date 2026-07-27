import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { LevelId } from '../src/types';
import { LevelPicker } from '../src/components/LevelPicker';
import { colors, radius, spacing } from '../src/theme';

const AVATARS = ['🦊', '🐻', '🐼', '🐨', '🦁', '🐯', '🐸', '🐧', '🦄', '🐢'];

export default function Onboarding() {
  const { addProfile, state } = useApp();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [level, setLevel] = useState<LevelId>('m1-1');
  const [saving, setSaving] = useState(false);

  const first = state.profiles.length === 0;

  async function submit() {
    const trimmed = name.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    await addProfile(trimmed, avatar, level);
    router.replace('/home');
  }

  return (
    <Screen>
      <View style={{ paddingTop: spacing.xl }}>
        <H1>{first ? '반가워요! 👋' : '새 프로필 만들기'}</H1>
        <Muted style={{ marginTop: spacing.sm }}>
          {first
            ? '누가 공부할지 알려 주세요. 아이가 여러 명이면 나중에 더 추가할 수 있어요.'
            : '아이를 한 명 더 등록합니다.'}
        </Muted>
      </View>

      <Card style={{ marginTop: spacing.xl }}>
        <H3>이름</H3>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="예) 서준"
          placeholderTextColor={colors.muted}
          style={s.input}
          maxLength={12}
          returnKeyType="done"
        />

        <H3 style={{ marginTop: spacing.lg }}>캐릭터</H3>
        <View style={s.avatarRow}>
          {AVATARS.map((a) => (
            <Pressable
              key={a}
              onPress={() => setAvatar(a)}
              style={[s.avatar, avatar === a && s.avatarOn]}
              accessibilityRole="button"
              accessibilityLabel={`캐릭터 ${a}`}
            >
              <Text style={{ fontSize: 26 }}>{a}</Text>
            </Pressable>
          ))}
        </View>

        <H3 style={{ marginTop: spacing.lg }}>시작 학년</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          지금 학년보다 한 단계 낮게 시작해도 좋아요. 다 외우면 자동으로 올라갑니다.
        </Muted>
        <View style={{ marginTop: spacing.md }}>
          <LevelPicker value={level} onChange={setLevel} />
        </View>
      </Card>

      <Button
        title="시작하기"
        onPress={submit}
        disabled={name.trim().length === 0}
        loading={saving}
        style={{ marginTop: spacing.xl }}
      />

      {!first ? (
        <Button title="취소" variant="ghost" onPress={() => router.back()} style={{ marginTop: spacing.sm }} />
      ) : (
        <Body style={{ textAlign: 'center', marginTop: spacing.lg, color: colors.subtext }}>
          부모님 모드는 나중에 홈 화면에서 설정할 수 있어요.
        </Body>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  input: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.bg,
  },
  avatarRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOn: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  levelWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  levelChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  levelChipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  levelText: { fontSize: 13, fontWeight: '600', color: colors.subtext },
  levelTextOn: { color: '#fff' },
});
