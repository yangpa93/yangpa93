/**
 * 아이에게 "공부하세요" 라고 부르는 카드.
 *
 * 리포트가 안 오는 날 부모가 할 수 있는 일이 없었다. 문자를 따로 보내는
 * 방법뿐이었는데, 앱 알림이면 아이가 누르는 순간 바로 공부 화면으로 들어간다.
 *
 * ── 아이마다 따로 보낸다 ────────────────────────────────────
 *
 * 예전에는 문구를 **하나 고르면 그것이 모두에게** 갔다. 아이 셋의 사정이 같을
 * 리가 없는데, 오늘 이미 다 한 아이와 아직 손도 안 댄 아이에게 같은 말이
 * 나갔다. "각각 아이들마다 메세지를 보낼 수 있게 해주세요" 라는 말을 들었다.
 *
 * 이제 아이를 누르면 그 아이 칸이 열리고, 거기서 고르거나 직접 써서 보낸다.
 * 처음부터 셋을 다 펼쳐 두지는 않는다 — 한 화면에 안 들어가고, 부를 아이는
 * 보통 하나다.
 *
 * 부를 수 있는 아이는 **연결할 때 자기 주소를 알려 온 기기**뿐이다. 아직
 * 하나도 없으면 무엇을 해야 하는지 적어 준다 — 빈 화면만 보이면 고장으로
 * 여긴다.
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, Card, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { NUDGE_PRESETS, sendNudgeToChild } from '../features/push';
import { colors, font, radius, spacing } from '../theme';
import { primaryParent } from '../features/parentLinks';

export function NudgeCard({
  only,
  openAlways,
}: { only?: string; openAlways?: boolean } = {}) {
  const { state } = useApp();
  /* `only` 를 주면 그 아이만. 아이 하나를 골라 들어간 화면에서 쓴다. */
  const children = (state.knownChildren ?? []).filter((c) => (only ? c.name === only : true));

  /**
   * 지금 펼쳐 둔 아이. 하나만 연다 — 셋을 다 펼치면 화면 밖으로 넘어간다.
   *
   * `openAlways` 면 처음부터 펼쳐 둔다. 이미 그 아이 화면에 들어와 있는데
   * 이름을 한 번 더 눌러야 열리면 같은 일을 두 번 시키는 것이다.
   */
  const [open, setOpen] = useState<string | null>(
    openAlways && only ? only : null,
  );
  /** 아이마다 고른 말. 아이 이름을 열쇠로 따로 들고 있는다. */
  const [picked, setPicked] = useState<Record<string, string>>({});
  /** 손으로 쓴 말. 비어 있으면 위에서 고른 것을 보낸다. */
  const [typed, setTyped] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<Record<string, string>>({});

  function messageFor(name: string): string {
    const own = (typed[name] ?? '').trim();
    return own !== '' ? own : (picked[name] ?? NUDGE_PRESETS[0]);
  }

  async function nudge(name: string, token: string) {
    setBusy(name);
    setResult((r) => ({ ...r, [name]: '' }));
    const from = primaryParent(state.parentLinks)?.label ?? '부모님';
    const res = await sendNudgeToChild(token, { from, message: messageFor(name) });
    setBusy(null);
    setResult((r) => ({
      ...r,
      [name]: res.ok ? '보냈어요.' : `보내지 못했어요. ${res.error ?? ''}`.trim(),
    }));
  }

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
      <H3>🔔 공부하세요!!!</H3>

      {children.length === 0 ? (
        <Muted style={{ marginTop: spacing.xs }}>
          아직 부를 수 있는 기기가 없어요. 아이 기기에서 연결 링크를 한 번
          누르면 여기에 나타납니다.
        </Muted>
      ) : (
        <>
          <Muted style={{ marginTop: spacing.xs }}>
            {openAlways
              ? '아이 폰에 알림이 뜨고, 누르면 바로 공부 화면이 열립니다.'
              : '아이를 누르면 보낼 말을 고를 수 있어요. 아이 폰에 알림이 뜨고, 누르면 바로 공부 화면이 열립니다.'}
          </Muted>

          {children.map((c) => {
            const isOpen = openAlways ? true : open === c.name;
            return (
              <View key={c.token} style={s.childBox}>
                {openAlways ? null : (
                  <Pressable
                    onPress={() => setOpen(isOpen ? null : c.name)}
                    accessibilityRole="button"
                    accessibilityState={{ expanded: isOpen }}
                  >
                    <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                      <Body style={{ fontWeight: '800' }}>{c.name}</Body>
                      <Text style={s.chev}>{isOpen ? '⌃' : '⌄'}</Text>
                    </Row>
                  </Pressable>
                )}

                {isOpen ? (
                  <>
                    <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
                      {NUDGE_PRESETS.map((m) => {
                        const on = (picked[c.name] ?? NUDGE_PRESETS[0]) === m;
                        return (
                          <Pressable
                            key={m}
                            onPress={() => {
                              setPicked((p) => ({ ...p, [c.name]: m }));
                              // 고르면 손으로 쓴 것은 비운다. 둘 중 무엇이 갈지 헷갈리면 안 된다.
                              setTyped((t) => ({ ...t, [c.name]: '' }));
                            }}
                            style={[s.preset, on && s.presetOn]}
                            accessibilityRole="radio"
                            accessibilityState={{ selected: on }}
                          >
                            <Text style={[s.presetText, on && s.presetTextOn]}>{m}</Text>
                          </Pressable>
                        );
                      })}
                    </View>

                    {/*
                      직접 쓰는 칸. 고른 말만으로는 그날 하고 싶은 말을 다 담을
                      수 없다 — "어제 국어 잘했더라" 같은 것은 목록에 없다.
                      쓰면 그것이 고른 말보다 앞선다.
                    */}
                    <TextInput
                      value={typed[c.name] ?? ''}
                      onChangeText={(v) => setTyped((t) => ({ ...t, [c.name]: v }))}
                      placeholder="직접 쓰기 (선택)"
                      placeholderTextColor={colors.muted}
                      style={s.input}
                      maxLength={80}
                    />

                    <Button
                      title={`${c.name}에게 보내기`}
                      variant="parent"
                      loading={busy === c.name}
                      onPress={() => nudge(c.name, c.token)}
                      style={{ marginTop: spacing.md }}
                    />

                    {result[c.name] ? (
                      <Body
                        style={{
                          marginTop: spacing.sm,
                          color: result[c.name].includes('못') ? colors.wrong : colors.correct,
                        }}
                      >
                        {result[c.name]}
                      </Body>
                    ) : null}
                  </>
                ) : null}
              </View>
            );
          })}
        </>
      )}
    </Card>
  );
}

const s = StyleSheet.create({
  /* 아이마다 한 칸. 위에 선을 그어 서로 갈라 놓는다. */
  childBox: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  chev: { fontSize: font.body, color: colors.muted, fontWeight: '800' },
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
  input: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: font.body,
    color: colors.text,
    backgroundColor: colors.bg,
  },
});
