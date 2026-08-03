import { Text } from 'react-native';
import { Button, Card, H3, Muted, Screen } from '../src/components/ui';
import { SoundCard } from '../src/components/SoundCard';
import { router } from 'expo-router';
import { spacing } from '../src/theme';

/**
 * 🔊 소리 설정 — 부모 자신의 것.
 *
 * ── 왜 이 화면이 생겼나 ──────────────────────────────────────
 *
 * "부모 설정에는 목소리를 확인하고 읽어보는 부분이 없다" 는 말을 들었다.
 * 맞는 지적이었다. 목소리 고르기와 읽는 속도는 아이 설정 화면 안에만
 * 있었는데, 부모는 그 화면에 들어갈 수 없다(그건 아이 프로필의 설정이다).
 *
 * 그런데 **부모도 영어를 듣는다** — 일상 문장과 영어 단어를 부모 폰에서
 * 소리로 읽어 준다. 발음이 어색해도 바꿀 자리가 없었던 셈이다.
 *
 * 목소리·속도는 프로필마다 따로 저장되므로(settings.voiceId ·
 * settings.speechRate), 여기서 고른 것은 부모 것이고 아이 폰과 섞이지 않는다.
 * 그 점을 화면에도 적어 둔다 — 안 적으면 "여기서 고치면 아이 폰도 바뀌나"
 * 를 물어볼 수밖에 없다.
 */
export default function ParentSound() {
  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>
        부모님도 일상 문장과 영어 단어를 소리로 들으니, 여기서 목소리와 속도를 정합니다.
      </Muted>

      <SoundCard title="🔊 내 소리 설정" />

      <Card style={{ marginTop: spacing.md }}>
        <H3>아이 폰은 따로예요</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          여기서 고른 목소리와 속도는 이 폰의 부모님 것입니다. 아이 폰의 목소리는
          그 폰에서 <Text style={{ fontWeight: '700' }}>내 학습 기록 및 설정</Text> 을 열어
          아이가 직접 고르게 해 주세요. 아이마다 알맞은 속도가 다릅니다.
        </Muted>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>폰 설정에서는 톤만 바꿉니다</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          폰 설정의 <Text style={{ fontWeight: '700' }}>말하는 속도</Text> 는 이 앱에 안
          먹습니다. 앱이 읽을 때마다 속도를 직접 정해서 덮어쓰기 때문이에요. 속도는 위에서
          고르시고, 목소리를 더 낮게/높게 하고 싶으면 폰 설정의{' '}
          <Text style={{ fontWeight: '700' }}>목소리 톤</Text> 을 만지세요.
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
