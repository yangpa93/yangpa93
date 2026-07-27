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

export function Body({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.body, style]}>{children}</Text>;
}

export function Muted({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.muted, style]}>{children}</Text>;
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
  screenInner: { flex: 1, paddingHorizontal: spacing.lg },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xxl },

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
});
