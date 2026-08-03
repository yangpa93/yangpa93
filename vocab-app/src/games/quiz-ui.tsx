/**
 * 문제 화면의 뼈대. 문제와 보기를 눈으로 갈라 놓는다. 영어·국어가 같이 쓴다.
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
import { Animated, Pressable, StyleSheet, Text, TextStyle, View } from 'react-native';
import { colors, font, radius, spacing } from '../theme';

/**
 * 빈칸이 든 문장. **빈칸을 눈에 띄게 칠한다.**
 *
 * 예전에는 빈칸이 본문과 똑같은 회색 밑줄이라 어디가 빈칸인지 한눈에 안
 * 들어왔다. 문제의 핵심이 그 자리인데 가장 안 보였다. 빈칸만 색을 주고
 * 바탕을 깔아, 문장을 훑기만 해도 물어보는 자리가 먼저 보이게 한다.
 *
 * 영어는 `_____`, 국어는 `○○○○` 로 뚫는다. 둘 다 잡는다.
 */
export function StemText({ text, style }: { text: string; style?: TextStyle }) {
  const parts = text.split(/(_{2,}|○+)/);
  return (
    <Text style={[s.stem, style]}>
      {parts.map((part, i) =>
        /^(_{2,}|○+)$/.test(part) ? (
          <Text key={i} style={s.blank}>
            {part}
          </Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

/**
 * 무엇을 하라는 말. 화면 맨 위에 둔다.
 *
 * 예전에는 흐린 회색 작은 글씨였다. 정작 아이가 제일 먼저 읽어야 하는
 * 한 줄인데 가장 안 보였다.
 */
export function Ask({ children }: { children: ReactNode }) {
  return <Text style={s.ask}>{children}</Text>;
}

/** 문제 상자. 안에 든 것은 전부 '읽을 것'이다. */
export function QuestionBox({ children }: { children: ReactNode }) {
  return (
    <View style={s.box}>
      <Text style={s.boxTag}>문제</Text>
      {children}
    </View>
  );
}

/**
 * 문제 상자 안의 예문.
 *
 * 상자 안에서 한 칸 더 들여 '이렇게 써요'를 붙인다. 이걸 안 하면 예문이
 * 보기 중 하나처럼 보인다 — 실제로 그렇게 보인다는 말을 들었다.
 */
export function ExampleInBox({ children }: { children: ReactNode }) {
  return (
    <View style={s.exampleBox}>
      <Text style={s.exampleTag}>이렇게 써요</Text>
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
  ask: {
    fontSize: font.h3,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.sm,
    lineHeight: 26,
  },
  stem: { fontSize: font.h2, color: colors.text, lineHeight: 36 },
  exampleBox: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  exampleTag: {
    fontSize: font.tiny,
    fontWeight: '800',
    color: colors.muted,
    marginBottom: spacing.xs,
    letterSpacing: 1,
  },
  /* 물어보는 자리. 색과 바탕을 함께 줘 색을 잘 못 보는 아이도 찾게 한다. */
  blank: {
    color: colors.primary,
    fontWeight: '800',
    backgroundColor: colors.primarySoft,
  },
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
  /* 상자 왼쪽 위에 걸치는 '문제' 딱지. 바탕을 깔아 테두리 위로 올라앉는다. */
  boxTag: {
    position: 'absolute',
    top: -9,
    left: spacing.lg,
    paddingHorizontal: spacing.sm,
    fontSize: font.tiny,
    fontWeight: '800',
    color: '#fff',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    overflow: 'hidden',
    letterSpacing: 2,
    lineHeight: 18,
  },
  choicesTag: {
    fontSize: font.small,
    fontWeight: '800',
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
