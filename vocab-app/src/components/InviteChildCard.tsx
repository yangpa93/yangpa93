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
import { Platform, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, Card, H3, Muted } from './ui';
import { useApp } from '../store/AppProvider';
import { APP_NAME } from '../features/app-name';
import { buildLinkUrl, fetchPushToken, toShortCode } from '../features/push';
import { colors, font, radius, spacing } from '../theme';

export function InviteChildCard() {
  const { state, setMyPushToken, setReceivesReports } = useApp();
  const [label, setLabel] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  /** 코드를 만들기만 하고 아무 데도 안 보내는 길 */
  const [showingCode, setShowingCode] = useState(false);

  /** 이 폰의 주소를 만든다. 코드 보기와 링크 보내기가 함께 쓴다. */
  async function ensureToken(): Promise<string | null> {
    if (state.myPushToken) return state.myPushToken;
    setBusy(true);
    const got = await fetchPushToken();
    setBusy(false);
    if (!got.token) {
      setError(got.reason ?? '이 폰의 주소를 만들지 못했습니다.');
      return null;
    }
    setMyPushToken(got.token);
    return got.token;
  }

  /**
   * 코드만 띄운다. 아무 데도 보내지 않는다.
   *
   * 아이에게 새 태블릿을 사 주고 이 앱만 깔았다면 그 기기에는 카톡도 메일도
   * 없다. 링크를 보낼 곳이 없어 연결 자체가 막힌다. 두 기기를 나란히 놓고
   * 화면을 보고 옮겨 적는 길을 둔다.
   */
  async function showCode() {
    setError('');
    const token = await ensureToken();
    if (!token) return;
    // 코드를 보여 주는 것도 "나에게 보내 달라"는 뜻이다.
    setReceivesReports(true);
    setShowingCode(true);
  }

  async function invite() {
    setError('');
    const token = await ensureToken();
    if (!token) return;
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
        <Text style={s.step}>· 아이 기기에 카톡·메일이 있으면 — 링크를 보내면 한 번 눌러 끝납니다</Text>
        <Text style={s.step}>· 아무것도 안 깔린 태블릿이면 — 연결 코드를 띄워 보고 옮겨 적습니다</Text>
        <Text style={s.step}>· 아이가 여럿이면 기기마다 한 번씩. 같은 링크·코드를 그대로 쓰면 됩니다</Text>
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

      <Button
        title="연결 코드 보기 (카톡 없이)"
        variant="ghost"
        loading={busy}
        onPress={showCode}
        style={{ marginTop: spacing.sm }}
      />

      {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

      {/*
        코드는 눌렀을 때만 띄운다. 늘 보여 두면 아이가 부모 폰을 집어
        자기 기기를 마음대로 연결할 수 있다.
      */}
      {showingCode && state.myPushToken ? (
        <View style={s.codeBox}>
          <Muted style={{ fontSize: 11 }}>연결 코드</Muted>
          <Text style={s.code} selectable>
            {toShortCode(state.myPushToken)}
          </Text>
          <Muted style={{ fontSize: 11, marginTop: spacing.sm, lineHeight: 18 }}>
            아이 기기 → ⚙️ 설정 → 부모님 폰에 알려주기 → 이 코드를 그대로 입력{'\n'}
            대문자와 소문자를 구별해서 적어야 합니다. 띄어쓰기는 없어도 됩니다.
          </Muted>
        </View>
      ) : null}

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
  codeBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.parent,
    backgroundColor: colors.bg,
  },
  /*
   * 코드는 크고 고정폭이라야 한다. 아이가 화면을 보고 옮겨 적는데,
   * 글자 폭이 들쭉날쭉하면 어디까지 쳤는지 자꾸 놓친다.
   */
  code: {
    marginTop: spacing.xs,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    letterSpacing: 1,
    lineHeight: 30,
  },
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
