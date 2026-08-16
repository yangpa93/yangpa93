/** 화면들이 공유하는 작은 UI 조각들. */

import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, font, radius, spacing } from '../theme';

/** 태블릿에서 본문이 너무 넓어지지 않게 하는 상한. */
export const CONTENT_MAX_WIDTH = 640;

export function Screen({
  children,
  scroll = true,
  style,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const inner = <View style={[s.screenInner, style]}>{children}</View>;
  return (
    <SafeAreaView style={s.screen} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={s.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {inner}
        </ScrollView>
      ) : (
        inner
      )}
    </SafeAreaView>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function H1({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.h1, style]}>{children}</Text>;
}

export function H2({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.h2, style]}>{children}</Text>;
}

export function H3({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.h3, style]}>{children}</Text>;
}

/*
 * testID 는 Body 만 받는다. e2e 가 화면에서 값을 집어 볼 자리가 여기라서다 —
 * 제목이나 흐린 글씨는 집어 볼 것이 없다. 필요해지면 그때 늘린다.
 */
export function Body({
  children,
  style,
  testID,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  testID?: string;
}) {
  return (
    <Text style={[s.body, style]} testID={testID}>
      {children}
    </Text>
  );
}

/*
 * `numberOfLines` 는 흐린 글씨만 받는다. 긴 뜻풀이를 한 줄로 자르는 자리가
 * 여기라서다 — 좁은 칸에 두세 줄짜리 뜻이 들어오면 그 아래가 통째로 밀린다.
 */
export function Muted({
  children,
  style,
  numberOfLines,
}: {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  return (
    <Text style={[s.muted, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  );
}

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'parent';

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  style,
}: {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled }}
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        s.btn,
        btnVariant[variant],
        pressed && !isDisabled && s.btnPressed,
        isDisabled && s.btnDisabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'secondary' || variant === 'ghost' ? colors.primary : '#fff'} />
      ) : (
        <Text style={[s.btnText, btnTextVariant[variant]]}>{title}</Text>
      )}
    </Pressable>
  );
}

export function ProgressBar({
  value,
  color = colors.primary,
  height = 10,
}: {
  /** 0~1 */
  value: number;
  color?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(1, value));
  return (
    <View style={[s.track, { height, borderRadius: height / 2 }]}>
      <View
        style={{
          width: `${pct * 100}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: height / 2,
        }}
      />
    </View>
  );
}

export function Chip({
  label,
  tone = 'default',
}: {
  label: string;
  tone?: 'default' | 'primary' | 'accent' | 'correct' | 'wrong' | 'parent';
}) {
  return (
    <View style={[s.chip, chipTone[tone].box]}>
      <Text style={[s.chipText, chipTone[tone].text]}>{label}</Text>
    </View>
  );
}

export function Row({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[s.row, style]}>{children}</View>;
}

export function Divider() {
  return <View style={s.divider} />;
}

/**
 * ⚙️ 설정 화면에서 갈래 하나를 가리키는 줄.
 *
 * ── 왜 부품으로 뺐나 ────────────────────────────────────────
 *
 * 부모 설정(parent-settings)에만 있던 것을 아이 설정에서도 쓴다. "부모 설정과
 * 같은 모양으로" 나눠 달라는 말을 들었는데, 같은 모양을 두 곳에 따로 적어 두면
 * 한쪽만 고치는 날이 반드시 온다. 그러면 같은 앱 안에서 부모 화면과 아이
 * 화면이 서로 다르게 생기고, 아이에게 길을 알려 주기가 어려워진다.
 *
 * `hint` 에는 **그 안에 무엇이 있는지**를 적는다. 들어가 봐야 아는 자리를
 * 만들면 한 겹을 더 둔 값을 잃는다 — 고르라고 만든 화면인데 무엇을 고르는지
 * 모르면 아무 데나 눌러 보게 된다.
 */
export function SettingsTile({
  icon,
  title,
  hint,
  onPress,
}: {
  icon: string;
  title: string;
  /** 이름 아래 한 줄. 이름만으로 통하는 자리에서는 안 준다. */
  hint?: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={s.tile} onPress={onPress} accessibilityRole="button">
      <Text style={s.tileIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Text style={s.tileTitle}>{title}</Text>
        {/* 설명이 없으면 그 줄을 아예 안 그린다. 빈 줄이 남으면 칸이 벌어진다. */}
        {hint ? <Text style={s.tileHint}>{hint}</Text> : null}
      </View>
      <Text style={s.tileChev}>›</Text>
    </Pressable>
  );
}

export function EmptyState({ icon, title, hint }: { icon: string; title: string; hint?: string }) {
  return (
    <View style={s.empty}>
      <Text style={s.emptyIcon}>{icon}</Text>
      <H3 style={{ textAlign: 'center' }}>{title}</H3>
      {hint ? <Muted style={{ textAlign: 'center', marginTop: spacing.sm }}>{hint}</Muted> : null}
    </View>
  );
}

const btnVariant: Record<ButtonVariant, ViewStyle> = {
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.primarySoft },
  ghost: { backgroundColor: 'transparent' },
  danger: { backgroundColor: colors.wrong },
  parent: { backgroundColor: colors.parent },
};

const btnTextVariant: Record<ButtonVariant, TextStyle> = {
  primary: { color: '#fff' },
  secondary: { color: colors.primary },
  ghost: { color: colors.subtext },
  danger: { color: '#fff' },
  parent: { color: '#fff' },
};

const chipTone = {
  default: { box: { backgroundColor: colors.bg }, text: { color: colors.subtext } },
  primary: { box: { backgroundColor: colors.primarySoft }, text: { color: colors.primary } },
  accent: { box: { backgroundColor: colors.accentSoft }, text: { color: '#B45309' } },
  correct: { box: { backgroundColor: colors.correctSoft }, text: { color: colors.correct } },
  wrong: { box: { backgroundColor: colors.wrongSoft }, text: { color: colors.wrong } },
  parent: { box: { backgroundColor: colors.parentSoft }, text: { color: colors.parent } },
} as const;

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  // 태블릿처럼 넓은 화면에서 글줄이 끝까지 늘어나면 읽기 힘들다.
  // 본문 폭을 제한하고 가운데로 모은다.
  screenInner: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    width: '100%',
    maxWidth: CONTENT_MAX_WIDTH,
    alignSelf: 'center',
  },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xxl, alignItems: 'stretch' },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  h1: { fontSize: font.h1, fontWeight: '800', color: colors.text },
  h2: { fontSize: font.h2, fontWeight: '700', color: colors.text },
  h3: { fontSize: font.h3, fontWeight: '700', color: colors.text },
  body: { fontSize: font.body, color: colors.text, lineHeight: 22 },
  muted: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },

  btn: {
    minHeight: 52,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  btnPressed: { opacity: 0.8 },
  btnDisabled: { opacity: 0.4 },
  btnText: { fontSize: 16, fontWeight: '700' },

  track: { width: '100%', backgroundColor: colors.border, overflow: 'hidden' },

  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  chipText: { fontSize: font.tiny, fontWeight: '700' },

  row: { flexDirection: 'row', alignItems: 'center' },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },

  empty: { alignItems: 'center', paddingVertical: spacing.xxl },
  emptyIcon: { fontSize: 44, marginBottom: spacing.md },

  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  tileIcon: { fontSize: 26 },
  tileTitle: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  tileHint: { fontSize: font.small, color: colors.subtext, marginTop: 3, lineHeight: 19 },
  tileChev: { fontSize: 24, color: colors.muted },
});
