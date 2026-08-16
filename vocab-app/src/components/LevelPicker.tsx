/**
 * 레벨 고르기.
 *
 * 레벨이 18개(학년 6 × 단계 3)라 한 줄에 늘어놓으면 무엇을 고르는지 알 수
 * 없다. 학년을 먼저 고르고 그 안에서 단계를 고르는 두 단계로 나눈다.
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Row } from './ui';
import { entriesOf } from '../data';
import {
  GRADE_ORDER,
  GRADE_SHORT,
  GradeId,
  LevelId,
  STEPS,
  gradeOf,
} from '../types';
import { colors, font, radius, spacing } from '../theme';

export function LevelPicker({
  value,
  onChange,
  tone = 'primary',
  showCounts = true,
}: {
  value: LevelId;
  onChange: (level: LevelId) => void;
  /** 부모 화면에서는 청록색을 쓴다. */
  tone?: 'primary' | 'parent';
  showCounts?: boolean;
}) {
  // 고른 레벨과 별개로 '지금 펼쳐 보고 있는 학년'을 따로 둔다.
  // 다른 학년을 훑어보다가 아무것도 안 고르고 나갈 수 있어야 한다.
  const [grade, setGrade] = useState<GradeId>(gradeOf(value));
  const on = tone === 'parent' ? colors.parent : colors.primary;

  return (
    <View>
      <Row style={{ gap: spacing.sm, flexWrap: 'wrap' }}>
        {GRADE_ORDER.map((g) => {
          const active = grade === g;
          return (
            <Pressable
              key={g}
              onPress={() => setGrade(g)}
              style={[s.chip, active && { backgroundColor: on, borderColor: on }]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
            >
              <Text style={[s.chipText, active && s.chipTextOn]}>{GRADE_SHORT[g]}</Text>
            </Pressable>
          );
        })}
      </Row>

      {/*
        **넷이 반드시 한 줄에 선다.** 줄바꿈(flexWrap)을 안 쓰고 칸마다
        `flex: 1` 로 폭을 똑같이 나눈다.

        「레벨 1 (156개)」 를 한 줄로 적었더니 글자 길이만큼 칸 폭이 제각각이
        되어 셋 + 하나로 접혔다. 접힌 줄은 그 아래 설정을 통째로 밀어낸다.
        그래서 글자를 위아래로 나눈다 — 이름은 크게, 개수는 그 밑에 작게.
        칸이 세로로 조금 길어지는 대신 넷이 나란히 서고 폭도 고르게 된다.
      */}
      <Row style={{ gap: spacing.xs, marginTop: spacing.sm }}>
        {STEPS.map((step) => {
          const level = `${grade}-${step}` as LevelId;
          const active = value === level;
          const count = entriesOf(level).length;
          return (
            <Pressable
              key={level}
              onPress={() => onChange(level)}
              style={[s.step, active && { backgroundColor: on, borderColor: on }]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={`레벨 ${step}${showCounts ? ` ${count}개` : ''}`}
            >
              <Text style={[s.stepText, active && s.chipTextOn]}>레벨 {step}</Text>
              {showCounts ? (
                <Text style={[s.stepCount, active && s.stepCountOn]}>{count}개</Text>
              ) : null}
            </Pressable>
          );
        })}
      </Row>

      {/*
        「중1은 레벨 4개로 나뉘어 있어요」 라고 적던 줄을 없앴다. 칸이 넷 있는
        것은 보면 아는 것이고, 무엇을 골랐는지도 칸 색이 말한다. 설명이 쌓이면
        정작 고를 칸이 화면 밖으로 밀린다.
      */}
    </View>
  );
}

const s = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
  /*
   * 세로로 조금 긴 네모. **넷이 폭을 똑같이 나눠 갖는다.**
   *
   * `flex: 1` 이 그 일을 한다. `minWidth: 0` 은 안에 든 글자가 칸을 억지로
   * 넓히지 못하게 막는 것으로, 이게 없으면 개수가 세 자리인 칸만 넓어져
   * 줄이 다시 접힌다.
   */
  step: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  stepText: { fontSize: font.small, fontWeight: '700', color: colors.text },
  /* 개수는 딸린 정보다. 작게, 흐리게 — 고르는 것은 레벨이지 개수가 아니다. */
  stepCount: { fontSize: font.tiny, color: colors.subtext, marginTop: 1 },
  stepCountOn: { color: 'rgba(255,255,255,0.85)' },
});
