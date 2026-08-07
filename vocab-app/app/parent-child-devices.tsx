import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen, SettingsTile } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { awardRates } from '../src/features/awards';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { FeedbackCard } from '../src/components/FeedbackCard';
import { VersionButton } from '../src/components/VersionButton';
import { colors, font, radius, spacing } from '../src/theme';
import { parentLabels } from '../src/features/parentLinks';

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
  const build = buildInfo();
  const childNames = state.profiles.filter((p) => p.kind === 'child').map((p) => p.name);

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
      {/*
        **갈 곳을 고르는 세 단추.**

        예전에는 이 화면 한 장에 연결하기와 아이별 설정과 금액이 모두 쌓여
        있었다. 「아이별 설정 보기」 가 연결 카드 안에 딸려 있어서, 어느 것을
        누르면 무엇이 나오는지 알기 어려웠다 — "아이별 설정을 눌렀는데 학습
        보고서가 나온다" 는 말을 들었다. 이제 갈 곳만 고르고, 실제 설정은
        저마다 제 화면에서 한다.
      */}
      <SettingsTile
        icon="🔗"
        title="아이 기기와 연결하기"
        hint={
          childNames.length === 0
            ? '아이 폰의 QR 을 찍어 연결합니다'
            : `지금 연결된 아이 — ${childNames.join(' · ')}`
        }
        onPress={() => router.push('/parent-link')}
      />

      <SettingsTile
        icon="🧒"
        title="아이별 설정 하기"
        hint="학년·레벨 · 하루 공부할 양 · 과목 · 프로필 지우기"
        onPress={() => router.push('/parent-children')}
      />

      <SettingsTile
        icon="🎟️"
        title="동기 부여 요청권"
        hint="레벨 시험 통과 · 한 달 개근에 줄 기본 금액"
        onPress={() => router.push('/parent-awards-rates')}
      />

      {/* 아이 폰일 때만 뜻이 있는 스위치 */}
      {state.parentLinks.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>부모님 폰으로 알림 받기</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {parentLabels(state.parentLinks)}에 연결돼 있습니다. 학습이 끝나면 바로 전송됩니다.
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

      {/* 흐린 글자 두 줄로는 누를 것인지 알 수 없다. 눌리는 것은 눌리게 생겨야 한다. */}
      <VersionButton tone="parent" style={{ marginTop: spacing.xl, alignSelf: 'center' }} />
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
