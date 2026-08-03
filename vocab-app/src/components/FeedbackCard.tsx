/**
 * 이상한 점 알려주기.
 *
 * **아이 설정과 부모님 설정 양쪽에 놓는다.** 이상한 것을 처음 만나는 사람은
 * 아이다. 부모 PIN 뒤에만 두면 아이는 부모를 부를 때까지 기다려야 하고,
 * 그 사이에 무엇이 어떻게 이상했는지를 잊는다. 대부분은 말하지 않고 넘어간다.
 *
 * 어느 빌드에서 그랬는지가 자동으로 붙는다. 그것이 없으면 재현할 수가 없다 —
 * 고쳐서 새로 올렸는데 아직 옛 앱을 쓰고 있는 경우가 흔하다.
 *
 * '베타'라는 말은 쓰지 않는다. 아이가 모르는 말이고, 안다고 해도 "아직 덜
 * 만든 것"으로 들려 이상한 것을 말하기 어려워진다.
 */

import { Share } from 'react-native';
import { Button, Card, H3, Muted } from './ui';
import { APP_NAME, buildInfo, feedbackHeader } from '../features/build-info';
import { colors, spacing } from '../theme';

export function FeedbackCard({ style }: { style?: object }) {
  const build = buildInfo();

  return (
    <Card style={[{ marginTop: spacing.md, borderColor: colors.accent }, style]}>
      <H3>💬 이상한 점 알려주기</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        이상하거나 불편한 곳이 있으면 적어 보내 주세요. 어디가 어떻게 이상했는지
        적어 주시면 고치는 데 큰 도움이 돼요.
      </Muted>
      <Button
        title="알려주기"
        variant="secondary"
        onPress={() => {
          Share.share({
            message:
              `[${APP_NAME}] 이상한 점 알려주기\n\n` +
              `어느 화면에서 그랬나요?\n\n\n` +
              `무엇을 눌렀나요?\n\n\n` +
              `어떻게 되기를 바랐나요?\n\n\n` +
              `${feedbackHeader(build)}`,
          }).catch(() => {});
        }}
        style={{ marginTop: spacing.md }}
      />
    </Card>
  );
}
