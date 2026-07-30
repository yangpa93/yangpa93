/**
 * 국어 문제 화면의 뼈대. 문제와 보기를 눈으로 갈라 놓는다.
 *
 * **왜 만들었나.** 사자성어 문제에서 '고진감래 / 고생 끝에 즐거움이 찾아옴 /
 * 오랜 고진감래 끝에…' 세 줄이 나란히 뜨고 그 아래에 보기 넷이 이어졌다.
 * 예문 줄이 보기 중 하나처럼 보여서, 무엇이 문제이고 무엇이 고를 것인지
 * 구별이 안 됐다.
 *
 * 그래서 문제는 **테두리가 굵고 바탕색이 다른 한 상자**에 통째로 넣고,
 * 보기는 '아래에서 하나를 고르세요' 라는 말과 번호를 붙여 따로 세운다.
 * 상자 안은 전부 읽을 것, 상자 밖 번호가 붙은 것은 전부 누를 것이다.
 */

import { ReactNode, useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

/** 문제 상자. 안에 든 것은 전부 '읽을 것'이다. */
export function QuestionBox({ children }: { children: ReactNode }) {
  return (
    <View style={s.box}>
      <Text style={s.boxTag}>문제</Text>
      {children}
    </View>
  );
}

/** 보기 묶음. 문제 상자와 확실히 떨어뜨린다. */
export function Choices({ children }: { children: ReactNode }) {
  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text style={s.choicesTag}>아래에서 하나를 고르세요</Text>
      <View style={{ gap: spacing.sm, marginTop: spacing.sm }}>{children}</View>
    </View>
  );
}

/** 번호가 붙은 보기 하나. */
export function ChoiceButton({
  index,
  label,
  correct,
  picked,
  self,
  onPress,
  big,
}: {
  /** 0부터. 화면에는 ①②③④ 로 보인다. */
  index: number;
  label: string;
  correct: boolean;
  picked: string | null;
  self: string;
  onPress: () => void;
  /** 한자처럼 획이 많아 크게 보여야 하는 것 */
  big?: boolean;
}) {
  const answered = picked !== null;
  const isPicked = picked === self;

  const shake = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isPicked && !correct) {
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 50, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
    }
  }, [isPicked, correct, shake]);

  return (
    <Animated.View
      style={{
        transform: [{ translateX: shake.interpolate({ inputRange: [-1, 1], outputRange: [-8, 8] }) }],
      }}
    >
      <Pressable
        onPress={onPress}
        disabled={answered}
        accessibilityRole="button"
        style={({ pressed }) => [
          s.choice,
          pressed && !answered && { opacity: 0.7 },
          // 틀렸을 때도 정답을 같이 밝혀 준다. 뭐가 맞는지 모르고 넘어가면
          // 학습이 안 된다.
          answered && correct && s.choiceCorrect,
          answered && isPicked && !correct && s.choiceWrong,
        ]}
      >
        <Text style={s.num}>{NUMS[index] ?? '·'}</Text>
        <Text style={[s.choiceText, big && s.choiceTextBig]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

export function DontKnow({ picked, onPress }: { picked: string | null; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={picked !== null}
      accessibilityRole="button"
      style={[s.dontKnow, picked !== null && { opacity: 0.6 }]}
    >
      <Text style={s.dontKnowText}>모르겠어요</Text>
    </Pressable>
  );
}

const NUMS = ['①', '②', '③', '④', '⑤'];

const s = StyleSheet.create({
  box: {
    marginTop: spacing.md,
    padding: spacing.lg,
    paddingTop: spacing.xl,
    borderRadius: radius.lg,
    // 보기 버튼(테두리 2)보다 굵게. 두께로도 구별되게 한다.
    borderWidth: 3,
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  boxTag: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.lg,
    fontSize: font.tiny,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 2,
  },
  choicesTag: {
    fontSize: font.small,
    fontWeight: '700',
    color: colors.subtext,
    textAlign: 'center',
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: 60,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  choiceCorrect: { borderColor: colors.correct, backgroundColor: colors.correctSoft },
  choiceWrong: { borderColor: colors.wrong, backgroundColor: colors.wrongSoft },
  num: { fontSize: font.h3, color: colors.muted, fontWeight: '700' },
  choiceText: { flex: 1, fontSize: font.h3, fontWeight: '600', color: colors.text },
  // 한자는 획이 많아 작으면 안 보인다. 글자 사이도 벌려 낱자로 읽히게 한다.
  choiceTextBig: { fontSize: 30, letterSpacing: 4, textAlign: 'center' },
  dontKnow: {
    minHeight: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xs,
  },
  dontKnowText: { fontSize: font.small, fontWeight: '600', color: colors.muted },
});
