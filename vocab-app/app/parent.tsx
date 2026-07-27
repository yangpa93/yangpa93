import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { colors, radius, spacing } from '../src/theme';

/**
 * 부모 모드 진입 게이트.
 *
 * PIN은 아이가 리포트를 지우거나 보상을 스스로 승인하지 못하게 막는 용도다.
 * 기기에 평문으로 저장되므로 보안 장치가 아니라 '실수 방지' 수준이다.
 */
export default function ParentGate() {
  const { state, updateParent } = useApp();
  const [pin, setPin] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const isSetup = state.parent.pin === null;

  function press(d: string) {
    setError('');
    if (isSetup && pin.length === 4) {
      const nextConfirm = (confirm + d).slice(0, 4);
      setConfirm(nextConfirm);
      if (nextConfirm.length === 4) {
        if (nextConfirm === pin) {
          updateParent({ pin });
          router.replace('/parent-dashboard');
        } else {
          setError('PIN이 서로 달라요. 다시 입력해 주세요.');
          setPin('');
          setConfirm('');
        }
      }
      return;
    }

    const next = (pin + d).slice(0, 4);
    setPin(next);

    if (next.length === 4 && !isSetup) {
      if (next === state.parent.pin) {
        router.replace('/parent-dashboard');
      } else {
        setError('PIN이 맞지 않아요.');
        setPin('');
      }
    }
  }

  function back() {
    setError('');
    if (isSetup && pin.length === 4 && confirm.length > 0) {
      setConfirm(confirm.slice(0, -1));
    } else if (isSetup && pin.length === 4) {
      setPin(pin.slice(0, -1));
    } else {
      setPin(pin.slice(0, -1));
    }
  }

  const showing = isSetup && pin.length === 4 ? confirm : pin;
  const title = isSetup
    ? pin.length === 4
      ? 'PIN을 한 번 더 입력하세요'
      : '부모님 PIN 4자리를 정하세요'
    : 'PIN을 입력하세요';

  return (
    <Screen scroll={false}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 48 }}>🔒</Text>
          <H1 style={{ marginTop: spacing.md, textAlign: 'center' }}>부모님 모드</H1>
          <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>{title}</Muted>

          <View style={s.dots}>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={[s.dot, i < showing.length && s.dotOn]} />
            ))}
          </View>

          {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}
        </View>

        <View style={s.pad}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'].map((k, i) => (
            <Pressable
              key={i}
              style={[s.key, k === '' && { opacity: 0 }]}
              disabled={k === ''}
              onPress={() => (k === '⌫' ? back() : press(k))}
              accessibilityRole="button"
              accessibilityLabel={k === '⌫' ? '지우기' : k}
            >
              <Text style={s.keyText}>{k}</Text>
            </Pressable>
          ))}
        </View>

        {isSetup ? (
          <Card style={{ marginTop: spacing.lg }}>
            <H3>이 PIN은 무엇에 쓰나요?</H3>
            <Muted style={{ marginTop: spacing.sm }}>
              학습 리포트를 보고, 아이의 보상 요청을 승인하고, 알림 시간을 정할 때 필요해요.
              아이가 임의로 바꾸지 못하게 하려는 것이라 간단한 4자리면 충분합니다.
            </Muted>
          </Card>
        ) : null}

        <Button title="돌아가기" variant="ghost" onPress={() => router.back()} style={{ marginTop: spacing.md }} />
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  dots: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl },
  dot: { width: 16, height: 16, borderRadius: 8, backgroundColor: colors.border },
  dotOn: { backgroundColor: colors.parent },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  key: {
    width: 76,
    height: 62,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: { fontSize: 24, fontWeight: '700', color: colors.text },
});
