import { Switch, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { AvatarPicker, labelOf } from '../src/components/AvatarPicker';
import { speak, tapCorrect } from '../src/lib/feedback';
import { colors, font, spacing } from '../src/theme';

/**
 * 아이가 직접 바꾸는 설정.
 *
 * 소리·진동·캐릭터는 아이 취향이고, 잘못 눌러도 학습에 아무 영향이 없다.
 * 이걸 부모님 PIN 뒤에 두면 소리를 끄고 싶을 때마다 부모를 불러야 해서
 * 아이가 그냥 참고 쓴다. 반대로 하루 학습량·복습량·보상 금액·레벨은
 * 진도와 돈이 걸려 있어 부모님 모드에 그대로 둔다.
 */
export default function ChildSettings() {
  const { profile, updateSettings, updateProfile } = useApp();

  if (!profile) return null;

  const { ttsEnabled, hapticsEnabled } = profile.settings;

  return (
    <Screen>
      <Card style={{ marginTop: spacing.md }}>
        <H3>{profile.name} 설정</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          여기 있는 것은 마음대로 바꿔도 괜찮아요. 공부한 기록은 그대로예요.
        </Muted>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.label}>🔊 소리로 읽어주기</Text>
            <Muted style={{ marginTop: 2 }}>영어 문장을 소리로 들려줘요.</Muted>
          </View>
          <Switch
            value={ttsEnabled}
            onValueChange={(v) => {
              updateSettings(profile.id, { ttsEnabled: v });
              // 켠 순간 한 번 읽어 준다. 켜졌는지 확인하러 공부를
              // 시작해 볼 필요가 없다.
              if (v) speak('Hello!', true);
            }}
          />
        </Row>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.label}>📳 진동 피드백</Text>
            <Muted style={{ marginTop: 2 }}>맞히거나 틀렸을 때 살짝 떨려요.</Muted>
          </View>
          <Switch
            value={hapticsEnabled}
            onValueChange={(v) => {
              updateSettings(profile.id, { hapticsEnabled: v });
              if (v) tapCorrect(true);
            }}
          />
        </Row>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>내 캐릭터</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          지금은 {profile.avatar} {labelOf(profile.avatar)}예요. 바꿔도 공부한 기록은 그대로예요.
        </Muted>
        <AvatarPicker
          value={profile.avatar}
          onChange={(emoji) => updateProfile(profile.id, { avatar: emoji })}
        />
      </Card>

      <Muted style={{ marginTop: spacing.lg, textAlign: 'center' }}>
        하루 학습량이나 레벨은 부모님이 정해요.
      </Muted>

      <Button
        title="돌아가기"
        variant="secondary"
        onPress={() => router.back()}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
});
