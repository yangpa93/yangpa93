/**
 * 앱 담당자에게 문의하기. **메일로 간다.**
 *
 * **아이 설정과 부모님 설정 양쪽에 놓는다.** 이상한 것을 처음 만나는 사람은
 * 아이다. 부모 PIN 뒤에만 두면 아이는 부모를 부를 때까지 기다려야 하고,
 * 그 사이에 무엇이 어떻게 이상했는지를 잊는다. 대부분은 말하지 않고 넘어간다.
 *
 * ── 예전에는 어디로 갔나 ────────────────────────────────────
 *
 * `Share.share()` 를 썼다. 폰의 '공유' 창이 뜨고 거기서 카톡이든 메일이든
 * 고르는 방식이다. 그런데 **어디로 보낼지를 보내는 사람이 정해야 했다.**
 * 받는 주소가 어디에도 없으니 눌러도 어디로 보내야 하는지 모른다. 실제로
 * "이상한 점 알려주기는 어디로 알람이 가나요?" 라는 말을 들었다 —
 * 아무 데도 안 갔다는 것이 답이다.
 *
 * 이제 받는 주소를 박아 두고 메일 앱을 연다. 누르면 받는 사람과 제목과 틀이
 * 다 채워진 채로 뜨고, 쓸 것은 무엇이 이상했는지 하나뿐이다.
 *
 * 메일 앱이 없는 기기(아이 태블릿)에서는 예전처럼 공유 창을 연다. 길이
 * 막히는 것보다 낫고, 주소가 글 안에 적혀 있어 어디로 보낼지는 안다.
 *
 * 어느 빌드에서 그랬는지가 자동으로 붙는다. 그것이 없으면 재현할 수가 없다 —
 * 고쳐서 새로 올렸는데 아직 옛 앱을 쓰고 있는 경우가 흔하다.
 *
 * '베타'라는 말은 쓰지 않는다. 아이가 모르는 말이고, 안다고 해도 "아직 덜
 * 만든 것"으로 들려 이상한 것을 말하기 어려워진다.
 */

import { Linking, Share } from 'react-native';
import { Button, Card, H3, Muted } from './ui';
import { APP_NAME, buildInfo, feedbackHeader, versionLabel } from '../features/build-info';
import { colors, spacing } from '../theme';

/** 받는 사람. 여기 한 곳에만 적는다. */
export const FEEDBACK_EMAIL = 'yangpa93@gmail.com';

export function FeedbackCard({ style }: { style?: object }) {
  const build = buildInfo();

  const subject = `[${APP_NAME}] 이상한 점 알려주기 (${versionLabel(build)})`;
  const body =
    `어느 화면에서 그랬나요?\n\n\n` +
    `무엇을 눌렀나요?\n\n\n` +
    `어떻게 되기를 바랐나요?\n\n\n` +
    `${feedbackHeader(build)}`;

  async function send() {
    /*
     * mailto 는 받는 사람·제목·본문을 한 번에 채워 준다. 주소를 손으로 옮겨
     * 적게 하면 거기서 대부분 그만둔다.
     */
    const url = `mailto:${FEEDBACK_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    try {
      await Linking.openURL(url);
      return;
    } catch {
      // 메일 앱이 없는 기기다. 아래 길로 넘어간다.
    }
    await Share.share({
      message: `받는 사람: ${FEEDBACK_EMAIL}\n\n${subject}\n\n${body}`,
    }).catch(() => {});
  }

  return (
    <Card style={[{ marginTop: spacing.md, borderColor: colors.accent }, style]}>
      <H3>💬 앱 담당자에게 문의하기</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        이상하거나 불편한 곳이 있으면 적어 보내 주세요. 어디가 어떻게 이상했는지
        적어 주시면 고치는 데 큰 도움이 돼요.
        {'\n'}
        누르면 메일 앱이 열리고 받는 사람과 틀이 다 채워져 있어요.
      </Muted>
      <Button
        title="✉️ 메일로 문의하기"
        variant="secondary"
        onPress={() => void send()}
        style={{ marginTop: spacing.md }}
      />
      <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>{FEEDBACK_EMAIL}</Muted>
    </Card>
  );
}
