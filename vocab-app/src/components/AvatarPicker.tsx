/**
 * 아이 캐릭터 고르기.
 *
 * 처음 프로필을 만들 때(onboarding)와 나중에 바꿀 때(부모님 설정)가
 * 같은 목록을 써야 해서 여기로 뺐다. 한쪽에만 새 캐릭터를 넣으면
 * "만들 때는 있었는데 바꿀 때는 없는" 일이 생긴다.
 *
 * 12간지를 앞에 둔다. 아이가 자기 띠를 고르는 것이 아무 동물이나
 * 고르는 것보다 애착이 간다.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted } from './ui';
import { colors, radius, spacing } from '../theme';

export interface AvatarOption {
  emoji: string;
  /** 화면에 읽어 줄 이름. 12간지는 '토끼띠'처럼 띠까지 붙인다. */
  label: string;
}

/** 12간지. 태어난 해 순서 그대로 — 쥐·소·호랑이·토끼·용·뱀·말·양·원숭이·닭·개·돼지 */
export const ZODIAC: AvatarOption[] = [
  { emoji: '🐭', label: '쥐띠' },
  { emoji: '🐮', label: '소띠' },
  { emoji: '🐯', label: '호랑이띠' },
  { emoji: '🐰', label: '토끼띠' },
  { emoji: '🐲', label: '용띠' },
  { emoji: '🐍', label: '뱀띠' },
  { emoji: '🐴', label: '말띠' },
  { emoji: '🐑', label: '양띠' },
  { emoji: '🐵', label: '원숭이띠' },
  { emoji: '🐔', label: '닭띠' },
  { emoji: '🐶', label: '개띠' },
  { emoji: '🐷', label: '돼지띠' },
];

/** 띠와 상관없이 고르고 싶을 때. 예전부터 있던 것들이라 빼지 않는다. */
export const OTHER_AVATARS: AvatarOption[] = [
  { emoji: '🦊', label: '여우' },
  { emoji: '🐻', label: '곰' },
  { emoji: '🐼', label: '판다' },
  { emoji: '🐨', label: '코알라' },
  { emoji: '🦁', label: '사자' },
  { emoji: '🐸', label: '개구리' },
  { emoji: '🐧', label: '펭귄' },
  { emoji: '🦄', label: '유니콘' },
  { emoji: '🐢', label: '거북이' },
  { emoji: '🦉', label: '올빼미' },
];

export const ALL_AVATARS: AvatarOption[] = [...ZODIAC, ...OTHER_AVATARS];

/** 기본 캐릭터. 아무것도 안 고르면 이것. */
export const DEFAULT_AVATAR = ZODIAC[0].emoji;

export function labelOf(emoji: string): string {
  return ALL_AVATARS.find((a) => a.emoji === emoji)?.label ?? '캐릭터';
}

export function AvatarPicker({
  value,
  onChange,
  tone = 'primary',
}: {
  value: string;
  onChange: (emoji: string) => void;
  /** 부모님 화면에서는 강조색을 부모 색으로 맞춘다. */
  tone?: 'primary' | 'parent';
}) {
  const on = tone === 'parent' ? colors.parent : colors.primary;

  return (
    <View>
      <Muted style={{ marginTop: spacing.sm }}>12간지 — 자기 띠를 골라 보세요</Muted>
      <Grid items={ZODIAC} value={value} onChange={onChange} on={on} />

      <Muted style={{ marginTop: spacing.lg }}>그 밖에</Muted>
      <Grid items={OTHER_AVATARS} value={value} onChange={onChange} on={on} />
    </View>
  );
}

function Grid({
  items,
  value,
  onChange,
  on,
}: {
  items: AvatarOption[];
  value: string;
  onChange: (emoji: string) => void;
  on: string;
}) {
  return (
    <View style={s.row}>
      {items.map((a) => {
        const picked = value === a.emoji;
        return (
          <Pressable
            key={a.emoji}
            onPress={() => onChange(a.emoji)}
            style={[s.cell, picked && { borderColor: on, backgroundColor: `${on}18` }]}
            accessibilityRole="button"
            accessibilityState={{ selected: picked }}
            accessibilityLabel={a.label}
          >
            <Text style={{ fontSize: 26 }}>{a.emoji}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  cell: {
    width: 50,
    height: 50,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
