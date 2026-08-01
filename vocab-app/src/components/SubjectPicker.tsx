/**
 * 다른 폰에 있는 아이의 공부할 과목을 정한다.
 *
 * 이 폰에 프로필이 있는 아이는 그 아이의 보고서 화면에서 정한다 — 리포트를
 * 보고 나서 바로 고칠 수 있어야 하기 때문이다. 여기 남은 것은 **프로필이
 * 여기 없는 아이**뿐이다. 그 아이의 기록은 그 폰 안에 있어서 이쪽에서
 * 고칠 것이 과목밖에 없다.
 *
 * 아이 폰을 손에 들지 않고도 정할 수 있어야 한다 — 아이가 둘이고 폰이
 * 각자에게 있으면, 바꿀 때마다 폰을 걷어 오는 것은 현실적이지 않다.
 *
 * 하나도 안 고른 상태는 보내지 않는다. 낼 문제가 없어져 아이 학습 화면이
 * 빈 채로 뜬다.
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { sendSettingsToChild } from '../features/push';
import { Subject } from '../types';
import { colors, font, radius, spacing } from '../theme';

/** 보낼 수 있는 조합. 낱개로 켜고 끄면 '둘 다 끔'을 만들 수 있다. */
const PRESETS: { label: string; subjects: Subject[] }[] = [
  { label: '영어만', subjects: ['en'] },
  { label: '국어만', subjects: ['ko'] },
  { label: '영어 · 국어', subjects: ['en', 'ko'] },
];

export function SubjectPicker() {
  const { state } = useApp();
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState('');

  const localNames = new Set(state.profiles.map((p) => p.name));
  const remote = (state.knownChildren ?? []).filter((c) => !localNames.has(c.name));

  if (remote.length === 0) return null;

  async function send(name: string, token: string, subjects: Subject[]) {
    setBusy(name);
    setResult('');
    const res = await sendSettingsToChild(token, {
      from: state.parentLink?.label ?? '부모님',
      subjects,
    });
    setBusy(null);
    setResult(
      res.ok
        ? `${name} 폰으로 보냈어요. 그 폰이 켜지면 바로 바뀝니다.`
        : `${name}에게 보내지 못했어요. ${res.error ?? ''}`.trim(),
    );
  }

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
      <H3>📚 다른 폰의 아이가 공부할 과목</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        고르면 그 폰으로 알림이 갑니다. 아이가 알림을 누르지 않아도 적용돼요.
      </Muted>

      {remote.map((c) => (
        <View key={c.token} style={s.row}>
          <Body style={{ fontWeight: '800' }}>{c.name}</Body>
          <Row style={{ marginTop: spacing.sm, gap: spacing.sm, flexWrap: 'wrap' }}>
            {PRESETS.map((p) => (
              <Pressable
                key={p.label}
                onPress={() => send(c.name, c.token, p.subjects)}
                style={s.chip}
                disabled={busy === c.name}
                accessibilityRole="button"
              >
                <Text style={s.chipText}>{p.label}</Text>
              </Pressable>
            ))}
          </Row>
        </View>
      ))}

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
    </Card>
  );
}

const s = StyleSheet.create({
  row: { marginTop: spacing.lg },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
});
