/**
 * 무엇을 공부할지 고른다. 부모님 화면에만 둔다.
 *
 * 아이마다 다르게 둘 수 있다 — 큰딸은 영어만, 작은딸은 둘 다 같은 식으로.
 *
 * **이 폰에 있는 아이**는 바로 바뀐다. **다른 폰에 있는 아이**는 알림으로
 * 보낸다. 아이 폰을 손에 들지 않고도 정할 수 있어야 한다 — 아이가 둘이고
 * 폰이 각자에게 있으면, 바꿀 때마다 폰을 걷어 오는 것은 현실적이지 않다.
 *
 * 하나도 안 고른 상태는 만들 수 없다. 낼 문제가 없어져 학습 화면이 빈 채로
 * 뜬다. 마지막 하나를 끄려 하면 그냥 무시한다.
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { sendSettingsToChild } from '../features/push';
import { Subject, SUBJECT_LABEL } from '../types';
import { colors, font, radius, spacing } from '../theme';

const ALL: Subject[] = ['en', 'ko'];

export function SubjectPicker() {
  const { state, updateSettings } = useApp();
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState('');

  /** 이 폰에 있는 아이는 바로 바꾼다. */
  function toggleLocal(profileId: string, current: Subject[], s: Subject) {
    const next = current.includes(s) ? current.filter((x) => x !== s) : [...current, s];
    if (next.length === 0) return; // 마지막 하나는 못 끈다
    updateSettings(profileId, { subjects: next });
  }

  /** 다른 폰에 있는 아이는 알림으로 보낸다. */
  async function sendRemote(name: string, token: string, subjects: Subject[]) {
    setBusy(name);
    setResult('');
    const from = '부모님';
    const res = await sendSettingsToChild(token, { from, subjects });
    setBusy(null);
    setResult(
      res.ok
        ? `${name} 폰으로 보냈어요. 그 폰이 켜지면 바로 바뀝니다.`
        : `${name}에게 보내지 못했어요. ${res.error ?? ''}`.trim(),
    );
  }

  // 이 폰에 없고 연결만 돼 있는 아이들
  const localNames = new Set(state.profiles.map((p) => p.name));
  const remote = (state.knownChildren ?? []).filter((c) => !localNames.has(c.name));

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
      <H3>📚 무엇을 공부할까요</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        아이마다 따로 정할 수 있어요. 다른 폰에 있는 아이는 알림으로 보내면
        그 폰에 바로 반영됩니다.
      </Muted>

      {state.profiles.map((p) => (
        <View key={p.id} style={s.row}>
          <Body style={{ fontWeight: '800' }}>
            {p.avatar} {p.name}
          </Body>
          <Row style={{ marginTop: spacing.sm, gap: spacing.sm }}>
            {ALL.map((sub) => {
              const on = p.settings.subjects.includes(sub);
              return (
                <Pressable
                  key={sub}
                  onPress={() => toggleLocal(p.id, p.settings.subjects, sub)}
                  style={[s.chip, on && s.chipOn]}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: on }}
                >
                  <Text style={[s.chipText, on && s.chipTextOn]}>
                    {on ? '✓ ' : ''}
                    {SUBJECT_LABEL[sub]}
                  </Text>
                </Pressable>
              );
            })}
          </Row>
        </View>
      ))}

      {remote.map((c) => (
        <View key={c.token} style={s.row}>
          <Body style={{ fontWeight: '800' }}>{c.name} (다른 폰)</Body>
          <Row style={{ marginTop: spacing.sm, gap: spacing.sm, flexWrap: 'wrap' }}>
            <Pressable
              onPress={() => sendRemote(c.name, c.token, ['en'])}
              style={s.chip}
              disabled={busy === c.name}
              accessibilityRole="button"
            >
              <Text style={s.chipText}>영어만</Text>
            </Pressable>
            <Pressable
              onPress={() => sendRemote(c.name, c.token, ['ko'])}
              style={s.chip}
              disabled={busy === c.name}
              accessibilityRole="button"
            >
              <Text style={s.chipText}>국어만</Text>
            </Pressable>
            <Pressable
              onPress={() => sendRemote(c.name, c.token, ['en', 'ko'])}
              style={s.chip}
              disabled={busy === c.name}
              accessibilityRole="button"
            >
              <Text style={s.chipText}>영어 · 국어</Text>
            </Pressable>
          </Row>
        </View>
      ))}

      {state.profiles.length === 0 && remote.length === 0 ? (
        <Muted style={{ marginTop: spacing.md }}>아직 아이가 없어요.</Muted>
      ) : null}

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
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
