import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { awardRates } from '../src/features/awards';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { FeedbackCard } from '../src/components/FeedbackCard';
import { AwardRatesEditor } from '../src/components/AwardRatesEditor';
import { LinkChildCard } from '../src/components/LinkChildCard';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 아이들 폰 설정.
 *
 * ⚙️ 설정 → 아이들 폰 설정. 여기 있는 것은 전부 **아이 쪽을 향한 것**이다 —
 * 아이 기록을 언제 알림으로 받을지, 아이 폰과 어떻게 잇는지, 아이가 얼마를
 * 요청할 수 있는지, 아이 기록을 어떻게 지킬지, 그리고 그것들을 아이가 못
 * 만지게 막는 PIN.
 *
 * 부모 자신의 공부 설정은 여기 없다. 옆 칸 '내 공부 설정'(parent-plan)에 있다.
 * 예전에는 이 둘이 '부모 설정' 한 칸에 섞여 있었는데, 무엇을 여는 것인지
 * 이름만 보고는 알 수 없었다.
 *
 * **아이별 설정도 여기 없다.** 하루 분량 · 과목 · 레벨 · 동기 부여 요청권 금액은
 * 그 아이의 보고서 화면으로 옮겼다. 리포트를 보고 나서 바로 고칠 수 있어야
 * 하는 것들이고, 아이마다 다를 수 있는데 여기 두면 기기에 하나뿐인 값처럼
 * 보인다. 여기 있는 금액은 **아무것도 안 정한 아이에게 쓰는 기본값**이다.
 */
export default function ParentChildDevices() {
  const { state, updateParent } = useApp();
  const rates = awardRates(state.parent.awards);
  const build = buildInfo();

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

      {/*
        아이 기기 연결. 예전에는 카드가 **두 장**이었다 — 아이 QR 을 찍는 길과
        내 QR 을 띄우는 길. 제목이 똑같아 무엇이 다른지 알 수 없다는 말을
        들어서, 한 장 안에서 두 갈래로 갈랐다.
      */}
      <LinkChildCard />

      {/* 기본 동기 부여 요청권 금액 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>기본 동기 부여 요청권 금액 설정</H3>
        {/*
          설명은 두 문장으로 줄였다. 예전에는 다섯 줄이 붙어 있었는데, 설정
          화면에서 다섯 줄짜리 설명은 아무도 안 읽는다. 0원의 뜻은 금액 표에
          '안 함' 이라고 그대로 적혀 있으니 여기서 또 말할 필요가 없다.
        */}
        <Muted style={{ marginTop: spacing.xs }}>
          아이가 레벨 시험에 통과하거나 한 달을 개근하면 아래 금액을 부모에게 요청할 수
          있도록 기본 금액을 설정합니다.
          {'\n'}아이마다 금액을 달리 하려면 연결된 아이의 프로필 설정창에서 설정해 주세요.
        </Muted>

        <AwardRatesEditor rates={rates} onChange={(next) => updateParent({ awards: next })} />
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

      {/* 판을 누르면 이번 판에 무엇이 들어 있는지 나온다. */}
      <Pressable
        onPress={() => router.push('/whats-new')}
        accessibilityRole="button"
        accessibilityLabel="이번 판에서 바뀐 것 보기"
        style={{ marginTop: spacing.xl }}
      >
        <Muted style={{ textAlign: 'center' }}>{buildLabel(build)} ›</Muted>
        <Muted style={{ textAlign: 'center', marginTop: 2, color: colors.parent }}>
          이번 판에서 바뀐 것 보기
        </Muted>
      </Pressable>
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
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
