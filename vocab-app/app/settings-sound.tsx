import { Switch, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { SoundCard } from '../src/components/SoundCard';
import { tapCorrect } from '../src/lib/feedback';
import { colors, font, spacing } from '../src/theme';

/**
 * 🔊 목소리 설정 — 아이 자신의 것.
 *
 * 부모 쪽(parent-sound)과 짝을 이룬다. 값은 프로필마다 따로 저장되므로
 * (settings.voiceId · settings.speechRate) 여기서 고른 것은 이 아이 것이고
 * 부모 폰과 섞이지 않는다.
 *
 * **진동도 여기 둔다.** 소리와 진동은 둘 다 '맞았을 때 · 틀렸을 때 몸에 오는
 * 것'이라 같은 자리에서 켜고 끄는 편이 자연스럽다. 공부할 내용과는 아무
 * 상관이 없어서 📚 쪽에 두면 거기서 겉돈다.
 */
export default function ChildSettingsSound() {
  const { profile, updateSettings } = useApp();

  if (!profile) return null;

  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>
        여기 있는 것은 마음대로 바꿔도 괜찮아요. 공부한 기록은 그대로예요.
      </Muted>

      {/*
        소리 묶음은 부품으로 떼어 뒀다(SoundCard). 부모 설정에도 똑같은 것이
        필요해서다 — 부모도 일상 문장과 영어 단어를 소리로 듣는다.
      */}
      <SoundCard title={`${profile.name} 목소리 설정`} />

      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.label}>📳 진동 피드백</Text>
            <Muted style={{ marginTop: 2 }}>맞히거나 틀렸을 때 살짝 떨려요.</Muted>
          </View>
          <Switch
            value={profile.settings.hapticsEnabled}
            onValueChange={(v) => {
              updateSettings(profile.id, { hapticsEnabled: v });
              if (v) tapCorrect(true);
            }}
          />
        </Row>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>폰 설정에서는 톤만 바꿉니다</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          폰 설정의 <Text style={{ fontWeight: '700' }}>말하는 속도</Text> 는 이 앱에 안
          먹어요. 앱이 읽을 때마다 속도를 직접 정해서 덮어쓰기 때문이에요. 속도는 위에서
          고르고, 목소리를 더 낮게/높게 하고 싶으면 폰 설정의{' '}
          <Text style={{ fontWeight: '700' }}>목소리 톤</Text> 을 만지면 돼요.
        </Muted>
      </Card>

      <Button
        title="돌아가기"
        variant="secondary"
        onPress={() => router.back()}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
});
