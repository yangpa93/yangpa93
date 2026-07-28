/**
 * 레벨 고르기.
 *
 * 레벨이 18개(학년 6 × 단계 3)라 한 줄에 늘어놓으면 무엇을 고르는지 알 수
 * 없다. 학년을 먼저 고르고 그 안에서 단계를 고르는 두 단계로 나눈다.
 */

import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Muted, Row } from './ui';
import { entriesOf } from '../data';
import {
  GRADE_ORDER,
  GRADE_SHORT,
  GradeId,
  LevelId,
  STEPS,
  gradeOf,
  stepOf,
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

      <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
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
            >
              <Text style={[s.stepText, active && s.chipTextOn]}>레벨 {step}</Text>
              {showCounts ? (
                <Text style={[s.stepCount, active && s.chipTextOn]}>{count}개</Text>
              ) : null}
            </Pressable>
          );
        })}
      </Row>

      {showCounts ? (
        <Muted style={{ marginTop: spacing.sm }}>
          {GRADE_SHORT[grade]}은 레벨 {STEPS.length}개로 나뉘어 있어요. 지금 고른 것은{' '}
          {GRADE_SHORT[gradeOf(value)]} 레벨 {stepOf(value)}입니다.
        </Muted>
      ) : null}
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
  step: {
    flex: 1,
    minWidth: 90,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  stepText: { fontSize: font.body, fontWeight: '800', color: colors.text },
  stepCount: { fontSize: font.tiny, fontWeight: '600', color: colors.muted, marginTop: 2 },
});
