import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Card, Chip, H3, Muted, Row, Screen, SettingsTile } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { awardRates } from '../src/features/awards';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 아이들 기본 설정.
 *
 * ── 왜 이 화면을 새로 만들었나 ──────────────────────────────
 *
 * 설정이 여기저기 흩어져 있었다. 「아이들 폰 설정」 한 장에 매일 리포트 알림과
 * 아이 폰 연결과 기본 금액과 백업과 PIN 이 다 쌓여 있었고, 「아이별 설정」 은
 * 또 따로 있었다. 무엇을 고치려면 어디로 가야 하는지 이름만 보고는 알 수 없어
 * "설정이 여기저기 흩어져 있으니 너무 복잡합니다" 라는 말을 들었다.
 *
 * 그래서 **아이에 대한 설정만** 여기 모으고, 그것을 다시 둘로 갈랐다.
 *
 *   아이들 공통   — 셋에게 똑같이 걸리는 것 (알림 · 기본 금액)
 *   아이 개별     — 아이마다 다른 것 (무엇을 공부할지)
 *
 * 연결·백업·PIN 은 아이 설정이 아니라 **기기 설정**이라 옆 칸으로 뺐다.
 */
export default function ParentChildBasics() {
  const { state, updateParent } = useApp();
  const rates = awardRates(state.parent.awards);

  /**
   * 이 폰의 아이와 다른 폰의 아이를 한 줄로 세운다.
   *
   * 부모 입장에서 그 둘은 그냥 자기 아이다. 기록이 어디 있는지는 앱 사정이라
   * 화면을 둘로 나눌 이유가 없다. 다만 눌렀을 때 가는 곳이 다르다 — 이 폰의
   * 아이는 레벨까지 다 고칠 수 있고, 다른 폰의 아이는 과목만 바꿀 수 있다.
   */
  const local = state.profiles.filter((p) => p.kind === 'child');
  const remote = (state.knownChildren ?? []).filter(
    (c) => !local.some((p) => p.name === c.name),
  );

  return (
    <Screen>
      {/* ─────────────── 아이들 공통 ─────────────── */}

      <H3 style={{ paddingTop: spacing.md }}>아이들 공통 설정</H3>
      <Muted style={{ marginTop: spacing.xs }}>아이 셋 모두에게 똑같이 걸립니다.</Muted>

      <Card style={{ marginTop: spacing.md }}>
        <H3>🔔 매일 리포트 알림</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          정해진 시각에 아이의 학습 결과를 이 폰의 알림으로 받습니다.
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
              accessibilityState={{ selected: state.parent.notifyHour === h }}
            >
              <Text style={[s.chipText, state.parent.notifyHour === h && s.chipTextOn]}>
                오후 {h - 12}시
              </Text>
            </Pressable>
          ))}
        </Row>
      </Card>

      {/*
        금액은 여기서 **어디로 가는지만** 고른다. 표가 다섯 칸이라 이 화면에
        펼쳐 두면 아래 아이 목록이 통째로 밀린다.
      */}
      {/* 금액을 하나하나 적지 않는다 — 줄이 길어지고, 어차피 눌러서 보는 표다. */}
      <SettingsTile
        icon="🎟️"
        title="동기 부여 요청권"
        onPress={() => router.push('/parent-awards-rates')}
      />

      {/* ─────────────── 아이 개별 설정 ─────────────── */}

      <H3 style={{ marginTop: spacing.xl }}>아이 개별 설정</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        아이를 누르면 그 아이가 공부할 것을 정합니다.
      </Muted>

      {local.length === 0 && remote.length === 0 ? (
        <Muted style={{ marginTop: spacing.md }}>
          아직 연결된 아이가 없어요. ⚙️ 설정 → 📱 아이들 폰 연결 에서 QR 을 찍어 주세요.
        </Muted>
      ) : null}

      {/*
        이 폰에 프로필이 있는 아이. 레벨·하루 분량·과목·그 아이만의 금액까지
        다 고칠 수 있고, 프로필을 지우는 자리도 그 화면뿐이다.
      */}
      {local.map((p) => (
        <SettingsTile
          key={p.id}
          icon={p.avatar}
          title={`${p.name} 설정`}
          hint="학년·레벨 · 하루 분량 · 과목 · 이 아이만의 금액"
          onPress={() => router.push({ pathname: '/child-report', params: { profileId: p.id } })}
        />
      ))}

      {/*
        다른 폰의 아이. **과목만 바꿀 수 있다** — 레벨과 분량은 그 아이 폰
        안에 있고, 여기서 고쳐 봐야 갈 곳이 없다. 무엇을 할 수 있는지 미리
        적어 두지 않으면 눌러 보고 나서 "왜 레벨이 없나" 를 묻게 된다.
      */}
      {remote.map((c) => (
        <SettingsTile
          key={c.token}
          icon="📲"
          title={`${c.name} 설정`}
          hint="영어·국어 레벨 · 이 아이만의 요청권 금액"
          onPress={() => router.push({ pathname: '/parent-child-one', params: { name: c.name } })}
        />
      ))}

      {/*
        프로필을 지우는 길은 여기 안 둔다. 아이 하나를 골라 들어간 뒤에야
        나오게 해서, 목록을 훑다가 잘못 누르는 일이 없게 한다.
      */}
      {local.length > 0 ? (
        <Muted style={{ marginTop: spacing.lg }}>
          프로필을 지우시려면 그 아이를 누르고 화면 아래에서 하세요.
        </Muted>
      ) : null}
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
