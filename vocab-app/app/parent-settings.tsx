import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { AwardRates } from '../src/types';
import { awardRates, formatWon } from '../src/features/awards';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { FeedbackCard } from '../src/components/FeedbackCard';
import { colors, font, radius, spacing } from '../src/theme';
import { InviteChildCard } from '../src/components/InviteChildCard';

/**
 * 기기 기본 요구권 금액.
 *
 * 아이마다 다르게 두는 것은 그 아이의 보고서 화면(child-report)에서 한다.
 * 여기 있는 값은 **아무것도 정하지 않은 아이에게 적용되는 기본값**이다.
 * 아이가 하나뿐인 집에서 같은 값을 두 번 정하게 하지 않으려고 남겨 두었다.
 */
const AWARD_FIELDS: {
  key: keyof AwardRates;
  label: string;
  hint: string;
  options: number[];
}[] = [
  {
    key: 'middleLevel',
    label: '중학교 영어 레벨 하나',
    hint: '중1-1부터 중3-4까지 12개 레벨',
    options: [0, 5_000, 10_000, 20_000, 30_000, 50_000],
  },
  {
    key: 'highLevel',
    label: '고등학교 영어 레벨 하나',
    hint: '고1-1부터 고3-4까지 12개 레벨. 단어가 어려워 보통 더 높게 둡니다.',
    options: [0, 10_000, 20_000, 30_000, 50_000, 100_000],
  },
  {
    key: 'koreanLevel',
    label: '국어 레벨 하나',
    hint: '한 레벨이 60개로 영어(137개)의 절반이 안 됩니다.',
    options: [0, 5_000, 10_000, 20_000, 30_000],
  },
  {
    key: 'perfectMonth',
    label: '한 달 개근',
    hint: '목표를 채웠는지가 아니라 그날 했는지로 봅니다.',
    options: [0, 5_000, 10_000, 20_000, 30_000, 50_000],
  },
  {
    key: 'bonus',
    label: '아이가 더 요구할 수 있는 금액',
    hint: '“이번엔 정말 잘했어요”라며 한 칸 올려 요구할 수 있습니다.',
    options: [0, 5_000, 10_000, 20_000],
  },
];

/**
 * 부모 설정.
 *
 * **아이별 설정은 여기 없다.** 하루 분량 · 과목 · 레벨 · 요구권 금액은 그 아이의
 * 보고서 화면으로 옮겼다. 리포트를 보고 나서 바로 고칠 수 있어야 하는 것들이고,
 * 아이마다 다를 수 있는데 여기 두면 기기에 하나뿐인 값처럼 보인다.
 *
 * 여기 남은 것은 **기기 전체에 하나뿐인 것들**이다 — 알림 시각, 아이 기기 연결,
 * PIN, 백업.
 */
export default function ParentSettings() {
  const { state, updateParent } = useApp();
  const rates = awardRates(state.parent.awards);
  const build = buildInfo();
  const childCount = state.profiles.filter((p) => p.kind === 'child').length;

  return (
    <Screen>
      {/* 알림 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>매일 리포트 알림</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          정해진 시각에 아이의 학습 결과와 자주 틀린 단어를 이 기기의 알림으로 받습니다.
        </Muted>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <Text style={s.label}>알림 받기</Text>
          <Switch
            value={state.parent.notifyEnabled}
            onValueChange={(v) => updateParent({ notifyEnabled: v })}
            trackColor={{ true: colors.parent }}
          />
        </Row>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.md }}>
          <Text style={s.label}>목표를 못 채웠을 때만</Text>
          <Switch
            value={state.parent.notifyOnlyWhenMissed}
            onValueChange={(v) => updateParent({ notifyOnlyWhenMissed: v })}
            trackColor={{ true: colors.parent }}
          />
        </Row>

        <Text style={[s.label, { marginTop: spacing.lg }]}>알림 시각</Text>
        <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
          {[18, 19, 20, 21, 22].map((h) => (
            <Pressable
              key={h}
              onPress={() => updateParent({ notifyHour: h, notifyMinute: 0 })}
              style={[s.chip, state.parent.notifyHour === h && s.chipOn]}
              accessibilityRole="button"
            >
              <Text style={[s.chipText, state.parent.notifyHour === h && s.chipTextOn]}>
                오후 {h - 12}시
              </Text>
            </Pressable>
          ))}
        </Row>
      </Card>

      {/* 아이 기기 연결 — 이제 아이가 QR 을 띄우고 부모가 찍는다 */}
      <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
        <H3>🔗 아이 기기와 연결하기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 내 QR 띄우기 를 누르게 하고,
          이 폰으로 그 QR 을 찍으세요. 찍는 순간 아이가 등록되고, 이 폰 주소가
          아이에게 되돌아갑니다. 아이는 더 누를 것이 없어요.
        </Muted>
        <Button
          title="📷 아이 QR 찍기"
          variant="parent"
          onPress={() => router.push('/scan')}
          style={{ marginTop: spacing.md }}
        />
        {childCount > 0 ? (
          <Button
            title="아이별 설정 보기"
            variant="secondary"
            onPress={() => router.push('/parent-children')}
            style={{ marginTop: spacing.sm }}
          />
        ) : null}
      </Card>

      {/*
        예전 길. 부모가 QR 을 띄우고 아이가 찍는다.
        아이 폰 카메라가 안 되는 경우가 있어 남겨 둔다.
      */}
      <InviteChildCard />

      {/* 기본 요구권 금액 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>기본 요구권 금액</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아이가 레벨 시험에 통과하거나 한 달을 개근하면 금액이 정해진 요구권이
          생깁니다. 매번 흥정하지 않도록 조건별 금액을 미리 정해 두는 것입니다.
          {'\n'}여기 값은 아이별로 따로 정하지 않은 아이에게 적용됩니다.
          아이마다 다르게 두려면 그 아이의 보고서 화면에서 정하세요.
          {'\n'}0원으로 두면 그 요구권은 아예 생기지 않습니다.
        </Muted>

        {AWARD_FIELDS.map((f) => (
          <View key={f.key} style={{ marginTop: spacing.lg }}>
            <Text style={s.label}>{f.label}</Text>
            <Muted style={{ marginTop: 2 }}>{f.hint}</Muted>
            <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
              {f.options.map((won) => (
                <Pressable
                  key={won}
                  onPress={() => updateParent({ awards: { ...rates, [f.key]: won } })}
                  style={[s.chip, rates[f.key] === won && s.chipOn]}
                  accessibilityRole="button"
                >
                  <Text style={[s.chipText, rates[f.key] === won && s.chipTextOn]}>
                    {won === 0 ? '안 함' : formatWon(won)}
                  </Text>
                </Pressable>
              ))}
            </Row>
          </View>
        ))}

        <View style={s.awardSummary}>
          <Muted>
            영어 24개 · 국어 24개 레벨을 다 끝내면 레벨업 보상만 합계{' '}
            <Text style={{ fontWeight: '800', color: colors.text }}>
              {formatWon(rates.middleLevel * 12 + rates.highLevel * 12 + rates.koreanLevel * 24)}
            </Text>
            입니다. 여기에 개근 보상이 달마다 최대 {formatWon(rates.perfectMonth)} 더해집니다.
          </Muted>
        </View>
      </Card>

      {/* 아이 폰일 때만 뜻이 있는 스위치 */}
      {state.parentLink ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>부모님 폰으로 알림 받기</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {state.parentLink.label}에 연결돼 있습니다. 학습이 끝나면 바로 전송됩니다.
          </Muted>
          <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
            <Text style={s.label}>학습 후 자동 전송</Text>
            <Switch
              value={state.parent.pushToParent}
              onValueChange={(v) => updateParent({ pushToParent: v })}
              trackColor={{ true: colors.parent }}
            />
          </Row>
          <Button
            title="연결 관리"
            variant="parent"
            onPress={() => router.push('/parent-link')}
            style={{ marginTop: spacing.md }}
          />
        </Card>
      ) : null}

      <Card style={{ marginTop: spacing.md }}>
        <H3>학습 기록 백업</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          기록은 이 기기 안에만 있습니다. 폰을 바꾸거나 앱을 지우면 사라지니
          한 달에 한 번쯤 파일로 빼 두세요. 새 폰에서 그대로 되살릴 수 있습니다.
        </Muted>
        <Button
          title="내보내기 · 가져오기"
          variant="parent"
          onPress={() => router.push('/backup')}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>PIN</H3>
        <Button
          title="PIN 다시 설정하기"
          variant="secondary"
          onPress={() => {
            updateParent({ pin: null });
            router.replace('/parent');
          }}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      <FeedbackCard />

      <Muted style={{ marginTop: spacing.xl, textAlign: 'center' }}>{buildLabel(build)}</Muted>
    </Screen>
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
  awardSummary: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
