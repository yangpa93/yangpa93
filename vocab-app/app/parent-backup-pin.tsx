import { StyleSheet, Switch, Text } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { FeedbackCard } from '../src/components/FeedbackCard';
import { VersionButton } from '../src/components/VersionButton';
import { parentLabels } from '../src/features/parentLinks';
import { colors, font, spacing } from '../src/theme';

/**
 * 백업 및 PIN 설정.
 *
 * ── 왜 따로 뺐나 ────────────────────────────────────────────
 *
 * 「아이들 폰 설정」 한 장에 알림·연결·금액·백업·PIN 이 다 쌓여 있었다. 그런데
 * 백업과 PIN 은 **아이에 대한 설정이 아니라 이 기기에 대한 설정**이다. 아이
 * 금액을 고치러 들어갔다가 PIN 을 만나면 무엇을 하러 왔는지 흐려진다.
 *
 * 둘을 한 화면에 둔 것은 성격이 같아서다 — 둘 다 **기록을 잃지 않으려는 것**
 * 이다. 하나는 폰이 망가졌을 때를 대비하고, 하나는 아이가 몰래 고치는 것을
 * 막는다.
 */
export default function ParentBackupPin() {
  const { state, updateParent } = useApp();

  return (
    <Screen>
      <Card style={{ marginTop: spacing.md }}>
        <H3>💾 학습 기록 백업</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          기록은 이 폰 안에만 있습니다. 폰을 바꾸거나 앱을 지우면 사라지니 한 달에
          한 번쯤 파일로 빼 두세요. 새 폰에서 그대로 되살릴 수 있습니다.
        </Muted>
        <Button
          title="내보내기 · 가져오기"
          variant="parent"
          onPress={() => router.push('/backup')}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>🔒 부모님 모드 PIN</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아이가 제 레벨이나 금액을 몰래 고치지 못하게 막습니다.
        </Muted>
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

      {/*
        이 폰이 **아이 폰이기도 할 때**만 뜻이 있는 스위치다. 부모 프로필과 아이
        프로필을 한 폰에 두고 쓰는 집이 있어서, 그 경우 자기 기록을 다른 폰으로
        보낼지 여기서 끈다. 연결된 폰이 없으면 아무 뜻이 없으므로 안 그린다.
      */}
      {state.parentLinks.length > 0 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>📤 부모님 폰으로 자동 전송</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {parentLabels(state.parentLinks)}에 연결돼 있습니다. 이 폰에서 공부를 마치면
            바로 보냅니다.
          </Muted>
          <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
            <Text style={s.label}>학습 후 자동 전송</Text>
            <Switch
              value={state.parent.pushToParent}
              onValueChange={(v) => updateParent({ pushToParent: v })}
              trackColor={{ true: colors.parent }}
            />
          </Row>
        </Card>
      ) : null}

      <FeedbackCard />

      <VersionButton tone="parent" style={{ marginTop: spacing.xl, alignSelf: 'center' }} />
    </Screen>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
});
