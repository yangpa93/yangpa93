/**
 * 지금 쓰는 판. **눌러서 들어가는 것으로 보여야 한다.**
 *
 * ── 왜 부품으로 만들었나 ────────────────────────────────────
 *
 * "버전 정보도 누르면 다른 창이 나온다는 걸 알 수 있게 해 주세요. 이게
 *  버튼인지 아니면 그냥 정보성인지 확인이 안 됩니다."
 *
 * 맞는 말이었고, 같은 것이 다섯 군데에 흩어져 있었다. 그중 아이 홈이 제일
 * 나빴다 — 판이 `🔥 3일 연속` 같은 **장식용 칩과 똑같이** 생겨서, 옆의 것들이
 * 안 눌리는데 이것만 눌린다는 것을 알 방법이 없었다. 누를 수 있다는 표가
 * 화살표(`›`) 하나뿐이었는데 그것은 장식으로도 읽힌다.
 *
 * 그래서 다섯 곳이 같은 것을 쓰게 부품으로 뺐다. 다섯 곳에 따로 적어 두면
 * 한쪽만 고치는 날이 반드시 오고, 그러면 또 어디는 되고 어디는 안 되는
 * 화면이 된다.
 *
 * ── 무엇으로 '누를 것' 임을 알리나 ──────────────────────────
 *
 * 색깔 하나로는 무리다. 셋을 겹쳐 쓴다.
 *
 *   · **테두리와 바탕** — 옆의 장식용 칩에는 없는 것
 *   · **글자 색** — 이 앱에서 눌리는 것에 쓰는 색
 *   · **할 일을 적은 말** — '보기' 처럼 동작으로 끝맺는다
 *
 * 셋 중 둘이 사라져도 나머지 하나가 남는다.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { buildInfo, buildLabel } from '../features/build-info';
import { colors, font, radius, spacing } from '../theme';

export function VersionButton({
  tone = 'primary',
  style,
}: {
  /** 아이 화면은 primary, 부모 화면은 parent. 그 화면에서 눌리는 것의 색이다. */
  tone?: 'primary' | 'parent';
  style?: object;
}) {
  const build = buildInfo();
  const color = tone === 'parent' ? colors.parent : colors.primary;

  return (
    <Pressable
      onPress={() => router.push('/whats-new')}
      accessibilityRole="button"
      accessibilityLabel={`지금 쓰는 판 ${buildLabel(build)} — 눌러서 판 정보 보기`}
      style={({ pressed }) => [s.box, { borderColor: color }, pressed && s.pressed, style]}
    >
      <Text style={[s.label, { color }]}>📱 {buildLabel(build)}</Text>
      {/*
        **'보기' 라고 적는다.** 번호만 있으면 그것이 무엇을 하는 것인지 알 수
        없다. 동작으로 끝맺는 말이 하나 붙으면 누를 것이라는 뜻이 된다.
      */}
      <View style={[s.divider, { backgroundColor: color }]} />
      <Text style={[s.action, { color }]}>판 정보 보기 ›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    backgroundColor: colors.card,
  },
  pressed: { opacity: 0.7 },
  label: { fontSize: font.tiny, fontWeight: '800' },
  /* 판 번호와 할 일을 갈라 준다. 붙여 두면 한 덩어리로 읽혀 둘 다 흐려진다. */
  divider: { width: 1, height: 12, opacity: 0.4 },
  action: { fontSize: font.tiny, fontWeight: '700' },
});
