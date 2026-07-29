/**
 * 아이 기기에 연결 요청 보내기. **부모님 설정에만** 둔다.
 *
 * 예전에는 아이 화면에 '1. 부모님 폰에서 준비하기' 안내가 있었다. 아이는
 * 그 단계를 할 수 없고, 읽어도 자기가 뭘 해야 하는지 알 수 없다. 아이 쪽에는
 * '승인하기'만 남기고 준비하는 이야기는 전부 이리로 옮겼다.
 *
 * 누르면 세 가지가 한 번에 된다 — 이 폰의 주소를 만들고, 리포트를 받도록
 * 켜고, 아이에게 보낼 링크를 띄운다. 예전에는 '이 폰에서도 리포트 받기'를
 * 따로 눌러야 했는데, 연결 요청을 보내는 것 자체가 "나에게 보내 달라"는
 * 뜻이므로 나눌 이유가 없었다.
 */

import { useState } from 'react';
import { Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, Card, H3, Muted } from './ui';
import { useApp } from '../store/AppProvider';
import { APP_NAME } from '../features/app-name';
import { buildLinkUrl, fetchPushToken } from '../features/push';
import { colors, font, radius, spacing } from '../theme';

export function InviteChildCard() {
  const { state, setMyPushToken, setReceivesReports } = useApp();
  const [label, setLabel] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function invite() {
    setError('');
    let token = state.myPushToken;

    if (!token) {
      setBusy(true);
      const got = await fetchPushToken();
      setBusy(false);
      if (!got.token) {
        setError(got.reason ?? '이 폰의 주소를 만들지 못했습니다.');
        return;
      }
      token = got.token;
      setMyPushToken(token);
    }
    // 연결 요청을 보내는 것 자체가 "나에게 보내 달라"는 뜻이다.
    setReceivesReports(true);

    const name = label.trim() || '부모님 폰';
    const url = buildLinkUrl(token, name);
    await Share.share({
      message:
        `[${APP_NAME}] ${name} 연결 요청\n\n` +
        `아이 폰에서 아래 링크를 눌러 주세요. 그러면 바로 연결됩니다.\n${url}\n\n` +
        `링크가 안 열리면 아래 주소를 복사해서\n` +
        `아이 폰 → ⚙️ 설정 → 부모님 폰에 알려주기 → 붙여넣고 승인하기\n\n${token}`,
    }).catch(() => {});
  }

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
      <H3>🔗 아이 기기와 연결하기</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        연결하면 아이가 공부를 마칠 때마다 이 폰으로 결과가 옵니다.
        이 폰의 학습 화면은 그대로 남아요.
      </Muted>

      <View style={s.steps}>
        <Text style={s.step}>1. 아래 버튼으로 아이에게 링크를 보냅니다 (카카오톡 등)</Text>
        <Text style={s.step}>2. 아이 폰에서 그 링크를 한 번 누르면 끝입니다</Text>
        <Text style={s.step}>3. 아이가 여럿이면 기기마다 한 번씩. 같은 링크를 그대로 쓰면 됩니다</Text>
      </View>

      <TextInput
        value={label}
        onChangeText={setLabel}
        placeholder="이 폰 이름 (예: 엄마 폰)"
        placeholderTextColor={colors.muted}
        style={s.input}
        maxLength={20}
      />

      <Button
        title="아이에게 연결 요청 보내기"
        variant="parent"
        loading={busy}
        onPress={invite}
        style={{ marginTop: spacing.md }}
      />

      {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

      {state.myPushToken ? (
        <View style={s.tokenBox}>
          <Muted style={{ fontSize: 11 }}>이 폰의 주소 (링크가 안 열릴 때 복사해서 쓰세요)</Muted>
          <Text style={s.token} selectable>
            {state.myPushToken}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

const s = StyleSheet.create({
  steps: { marginTop: spacing.md, gap: spacing.xs },
  step: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },
  input: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.card,
  },
  tokenBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
  token: { fontSize: 11, color: colors.subtext, marginTop: 4 },
});
