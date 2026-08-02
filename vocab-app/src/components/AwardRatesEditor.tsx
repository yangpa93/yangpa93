/**
 * 동기 부여 요청권 금액을 고르는 부분.
 *
 * 기기 기본값(부모 설정)과 아이별 값(아이 보고서) 두 곳에서 똑같이 쓴다.
 * 예전에는 같은 표가 두 파일에 복사돼 있어서, 한쪽 금액 칸을 고치면 다른
 * 쪽은 그대로 남았다. 돈이 걸린 자리라 그런 어긋남이 제일 나쁘다.
 *
 * ── 고를 수 있는 금액을 왜 잘랐는가 ──────────────────────────
 *
 * 중학교 레벨은 3만원, 고등학교 레벨은 5만원까지만 고를 수 있게 두었다.
 * 영어 24레벨 · 국어 24레벨을 다 끝내는 것이 목표라 한 칸의 금액이 그대로
 * 스물네 배가 된다. 눌러서 고르는 자리에 큰 금액이 있으면 그 곱이 얼마가
 * 되는지 가늠하지 못한 채 눌리기 쉽다.
 *
 * 대신 **'기타' 칸에 직접 적으면 그 위도 된다.** 집집마다 사정이 다르고,
 * 위에서 정한 상한은 '권하는 선'이지 규칙이 아니다. 다만 넘겼을 때는
 * 조용히 저장하지 않고 한 줄로 알려 준다.
 */

import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Muted, Row } from './ui';
import { AwardRates } from '../types';
import { formatWon, parseWon } from '../features/awards';
import { colors, font, radius, spacing } from '../theme';

interface Field {
  key: keyof AwardRates;
  label: string;
  hint: string;
  /** 눌러서 고를 수 있는 금액들 */
  options: number[];
  /** 권하는 상한. 이보다 크게 적으면 한 줄 알려 준다. 없으면 안 따진다. */
  suggestMax?: number;
}

const FIELDS: Field[] = [
  {
    key: 'middleLevel',
    label: '중학교 영어 레벨 하나',
    hint: '중1-1부터 중3-4까지 12개 레벨',
    options: [0, 5_000, 10_000, 20_000, 30_000],
    suggestMax: 30_000,
  },
  {
    key: 'highLevel',
    label: '고등학교 영어 레벨 하나',
    hint: '고1-1부터 고3-4까지 12개 레벨. 단어가 어려워 보통 더 높게 둡니다.',
    options: [0, 10_000, 20_000, 30_000, 50_000],
    suggestMax: 50_000,
  },
  {
    key: 'koreanLevel',
    label: '국어 레벨 하나',
    hint: '한 레벨이 60개로 영어(137개)의 절반이 안 됩니다.',
    options: [0, 5_000, 10_000, 20_000, 30_000],
    suggestMax: 30_000,
  },
  {
    key: 'perfectMonth',
    label: '한 달 개근',
    hint: '목표를 채웠는지가 아니라 그날 했는지로 봅니다.',
    options: [0, 5_000, 10_000, 20_000, 30_000],
  },
  {
    key: 'bonus',
    label: '아이가 더 요구할 수 있는 금액',
    hint: '“이번엔 정말 잘했어요”라며 한 칸 올려 요구할 수 있습니다.',
    options: [0, 5_000, 10_000, 20_000],
  },
];

export function AwardRatesEditor({
  rates,
  onChange,
}: {
  rates: AwardRates;
  onChange: (next: AwardRates) => void;
}) {
  return (
    <View>
      {FIELDS.map((f) => (
        <AwardField
          key={f.key}
          field={f}
          value={rates[f.key]}
          onChange={(won) => onChange({ ...rates, [f.key]: won })}
        />
      ))}
    </View>
  );
}

function AwardField({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: number;
  onChange: (won: number) => void;
}) {
  // 고를 수 있는 금액에 없는 값이면 직접 적은 것이다.
  const custom = !field.options.includes(value);
  const [open, setOpen] = useState(custom);
  const [text, setText] = useState(custom ? String(value) : '');

  /*
   * 밖에서 값이 바뀌면(아이별 금액을 '기기 기본값으로 되돌리기' 같은 자리)
   * 칸도 따라가야 한다. 안 그러면 화면에는 예전에 적은 숫자가 남아 있고
   * 실제 저장된 값은 다른, 서로 다른 두 금액이 보이게 된다.
   */
  useEffect(() => {
    if (!field.options.includes(value)) {
      setOpen(true);
      setText(String(value));
    }
  }, [value, field.options]);

  const over = field.suggestMax != null && value > field.suggestMax;

  return (
    <View style={{ marginTop: spacing.lg }}>
      <Text style={s.label}>{field.label}</Text>
      <Muted style={{ marginTop: 2 }}>{field.hint}</Muted>

      <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
        {field.options.map((won) => (
          <Pressable
            key={won}
            onPress={() => {
              onChange(won);
              setOpen(false);
              setText('');
            }}
            style={[s.chip, !custom && value === won && s.chipOn]}
            accessibilityRole="button"
            accessibilityState={{ selected: !custom && value === won }}
          >
            <Text style={[s.chipText, !custom && value === won && s.chipTextOn]}>
              {won === 0 ? '안 함' : formatWon(won)}
            </Text>
          </Pressable>
        ))}

        {/* 직접 적는 길. 눌러야 칸이 나온다 — 늘 열어 두면 표가 어수선하다. */}
        <Pressable
          onPress={() => setOpen((v) => !v)}
          style={[s.chip, custom && s.chipOn]}
          accessibilityRole="button"
          accessibilityState={{ selected: custom }}
        >
          <Text style={[s.chipText, custom && s.chipTextOn]}>
            기타{custom ? ` · ${formatWon(value)}` : ''}
          </Text>
        </Pressable>
      </Row>

      {open ? (
        <View style={{ marginTop: spacing.sm }}>
          <Row style={{ gap: spacing.sm, alignItems: 'center' }}>
            <TextInput
              value={text}
              onChangeText={(v) => {
                setText(v);
                const won = parseWon(v);
                // 빈 칸은 지우는 중일 수 있으니 저장하지 않는다. 0 을 넣으려면
                // 위의 '안 함' 을 누르면 된다.
                if (won !== null) onChange(won);
              }}
              placeholder="직접 적기 (예: 40000)"
              placeholderTextColor={colors.muted}
              keyboardType="number-pad"
              style={s.input}
              maxLength={9}
            />
            <Text style={s.won}>원</Text>
          </Row>
          {over ? (
            <Muted style={{ marginTop: spacing.xs, color: '#B45309' }}>
              {field.label}은 {formatWon(field.suggestMax ?? 0)}까지를 권합니다. 레벨이 24개라
              한 칸의 금액이 그대로 스물네 배가 돼요.
            </Muted>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  won: { fontSize: font.body, fontWeight: '700', color: colors.subtext },
});
