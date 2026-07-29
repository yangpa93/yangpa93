/**
 * 아이에게 "공부하자"고 부르는 카드.
 *
 * 리포트가 안 오는 날 부모가 할 수 있는 일이 없었다. 문자를 따로 보내는
 * 방법뿐이었는데, 앱 알림이면 아이가 누르는 순간 바로 공부 화면으로 들어간다.
 *
 * 부를 수 있는 아이는 **연결할 때 자기 주소를 알려 온 기기**뿐이다. 아직
 * 하나도 없으면 무엇을 해야 하는지 적어 준다 — 빈 화면만 보이면 고장으로
 * 여긴다.
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Button, Card, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { NUDGE_PRESETS, sendNudgeToChild } from '../features/push';
import { colors, font, radius, spacing } from '../theme';

export function NudgeCard() {
  const { state } = useApp();
  const children = state.knownChildren ?? [];

  const [picked, setPicked] = useState<string>(NUDGE_PRESETS[0]);
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState('');

  async function nudge(name: string, token: string) {
    setBusy(name);
    setResult('');
    const from = state.parentLink?.label ?? '부모님';
    const res = await sendNudgeToChild(token, { from, message: picked });
    setBusy(null);
    setResult(
      res.ok
        ? `${name}에게 보냈어요.`
        : `${name}에게 보내지 못했어요. ${res.error ?? ''}`.trim(),
    );
  }

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
      <H3>🔔 공부하자고 부르기</H3>

      {children.length === 0 ? (
        <Muted style={{ marginTop: spacing.xs }}>
          아직 부를 수 있는 기기가 없어요. 아이 기기에서 연결 링크를 한 번
          누르면 여기에 나타납니다.
        </Muted>
      ) : (
        <>
          <Muted style={{ marginTop: spacing.xs }}>
            보낼 말을 고르고 아이를 누르세요. 아이 폰에 알림이 뜨고, 누르면 바로
            공부 화면이 열립니다.
          </Muted>

          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            {NUDGE_PRESETS.map((m) => (
              <Pressable
                key={m}
                onPress={() => setPicked(m)}
                style={[s.preset, picked === m && s.presetOn]}
                accessibilityRole="radio"
                accessibilityState={{ selected: picked === m }}
              >
                <Text style={[s.presetText, picked === m && s.presetTextOn]}>{m}</Text>
              </Pressable>
            ))}
          </View>

          <Row style={{ marginTop: spacing.lg, gap: spacing.sm, flexWrap: 'wrap' }}>
            {children.map((c) => (
              <Button
                key={c.token}
                title={`${c.name}에게 보내기`}
                variant="parent"
                loading={busy === c.name}
                onPress={() => nudge(c.name, c.token)}
              />
            ))}
          </Row>

          {result ? (
            <Body
              style={{
                marginTop: spacing.md,
                color: result.includes('못') ? colors.wrong : colors.correct,
              }}
            >
              {result}
            </Body>
          ) : null}
        </>
      )}
    </Card>
  );
}

const s = StyleSheet.create({
  preset: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  presetOn: { borderColor: colors.parent, backgroundColor: colors.card },
  presetText: { fontSize: font.small, color: colors.subtext, fontWeight: '600' },
  presetTextOn: { color: colors.text, fontWeight: '800' },
});
