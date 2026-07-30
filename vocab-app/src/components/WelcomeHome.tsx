/**
 * 아이 프로필이 아직 없을 때의 홈 화면.
 *
 * 예전에는 앱을 깔면 곧바로 프로필 만들기로 끌고 갔다. 그런데 이 앱을 처음
 * 여는 사람은 대개 부모님이다. 아이 이름과 학년을 정하기 전에 보상 금액을
 * 보거나 알림을 맞춰 두고 싶을 수 있는데, 그러려면 없는 아이를 일단 하나
 * 만들어야 했다.
 *
 * 그래서 **부모님 설정은 프로필 없이도 들어갈 수 있게** 하고, 프로필은
 * '공부 시작하기'를 눌렀을 때 만들게 한다. 아이가 없으면 학습할 대상이
 * 없으니 그때는 만들 수밖에 없다.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Screen } from './ui';
import { APP_NAME } from '../features/app-name';
import { colors, font, radius, spacing } from '../theme';

export function WelcomeHome() {
  return (
    <Screen>
      <View style={{ alignItems: 'center', paddingTop: spacing.xxl }}>
        <Text style={{ fontSize: 64 }}>🐻</Text>
        <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>{APP_NAME}</H1>
        <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
          영어와 국어 어휘를 하루 조금씩.
        </Muted>
      </View>

      <Card style={{ marginTop: spacing.xxl }}>
        <H3>공부를 시작하려면</H3>
        <Body style={{ marginTop: spacing.sm, color: colors.subtext }}>
          누가 공부할지 먼저 알려 주세요. 이름과 학년만 정하면 됩니다.
          아이가 여러 명이면 나중에 더 추가할 수 있어요.
        </Body>
        <Button
          title="공부 시작하기"
          onPress={() => router.push('/onboarding')}
          style={{ marginTop: spacing.lg }}
        />
      </Card>

      {/*
        부모님이 먼저 둘러볼 수 있는 길. 아이를 만들지 않아도 들어간다.
        보상 금액·알림 시각·과목을 미리 맞춰 두고 아이를 부를 수 있다.
      */}
      <Pressable
        style={s.parent}
        onPress={() => router.push('/parent')}
        accessibilityRole="button"
      >
        <Text style={s.parentIcon}>🔒</Text>
        <View style={{ flex: 1 }}>
          <Text style={s.parentTitle}>부모님 모드</Text>
          <Text style={s.parentSub}>보상 금액·알림·과목을 먼저 정해 두실 수 있어요</Text>
        </View>
        <Text style={s.chev}>›</Text>
      </Pressable>
    </Screen>
  );
}

const s = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  parentIcon: { fontSize: 22 },
  parentTitle: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  parentSub: { fontSize: font.small, color: colors.subtext, marginTop: 2 },
  chev: { fontSize: 24, color: colors.muted },
});
