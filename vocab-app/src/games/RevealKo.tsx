/**
 * '해석 보기' 버튼.
 *
 * 문장 문제는 해석을 처음부터 띄우지 않는다. 해석이 먼저 보이면 아이가 영어
 * 문장을 읽지 않고 해석만 보고 답을 고른다 — 문장으로 만나게 하려고 만든
 * 문제인데 그 목적이 사라진다.
 *
 * 대신 막혔을 때 스스로 열 수 있게 한다. 아예 안 보여주면 못 읽는 아이는
 * 찍는 수밖에 없고, 찍기 시작하면 그 세션은 학습이 아니라 운이 된다.
 *
 * 빈칸 채우기와 바꿔 쓰기·반대말이 같은 버튼을 쓴다. 한 화면에서 같은
 * 구실을 하는 것이 두 모양이면 아이가 다른 기능으로 여긴다.
 */

import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

export function RevealKo({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" style={s.reveal} hitSlop={8}>
      <Text style={s.revealText}>해석 보기</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  reveal: {
    alignSelf: 'center',
    marginTop: -spacing.md,
    marginBottom: spacing.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  revealText: { fontSize: font.small, fontWeight: '700', color: colors.primary },
});
