import { useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import {
  fetchPushToken,
  fromShortCode,
  sendLinkBackToChild,
  shortCodeError,
} from '../src/features/push';
import { childLimitMessage } from '../src/features/children';
import { colors, radius, spacing } from '../src/theme';

/**
 * 부모 폰에서 **아이의 연결 코드**를 받아 적는 화면.
 *
 * ── 왜 이 화면이 없어서 막혔나 ───────────────────────────────
 *
 * 아이 폰 QR 아래에는 늘 짧은 코드가 같이 떠 있었다 — "카메라가 안 되면 이
 * 코드를 불러 주세요". 그런데 **부모 폰에는 그 코드를 적어 넣을 칸이 어디에도
 * 없었다.** 카메라가 안 될 때 쓰라고 만든 길이 반만 뚫려 있었던 것이다.
 *
 * 더 나빴던 것은 그 자리에 있던 '📵 QR 말고 코드로 연결하기' 버튼이다.
 * 그것은 `/parent-link` 로 갔는데, 그 화면은 **아이 쪽** 화면이라 부모 폰에
 * "부모님이 보낸 요청 승인하기" 가 떴다. 부모가 부모에게 연결하라는 말이 되니
 * 무엇을 하라는 것인지 알 수가 없다.
 *
 * ── 왜 이름을 함께 묻나 ──────────────────────────────────────
 *
 * QR 에는 아이 이름이 실려 있지만 짧은 코드에는 주소뿐이다. 이름 없이 등록하면
 * 아이 목록에 '아이' 만 둘 셋 늘어서 누가 누구인지 알 수 없다. 아이가 넷까지
 * 붙는 앱이라 여기서 한 칸을 더 받는 편이 낫다.
 */
export default function LinkChildCode() {
  const { state, profile, rememberChild, setMyPushToken, setReceivesReports } = useApp();
  /* 카메라 화면에서 '주소만 있는 QR' 을 읽었으면 그 값을 들고 온다. */
  const params = useLocalSearchParams<{ token?: string }>();

  const [code, setCode] = useState(params.token ?? '');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState('');

  async function connect() {
    setError('');
    setDone('');

    const token = fromShortCode(code);
    if (!token) {
      setError(shortCodeError(code) || '코드를 다시 확인해 주세요.');
      return;
    }
    // 자기 주소를 적으면 자기에게 보내게 된다. QR 쪽에는 있던 확인이
    // 코드 쪽에는 없어서 같은 자리에 둔다.
    if (state.myPushToken != null && state.myPushToken === token) {
      setError('이 폰의 주소예요. 아이 폰 화면에 뜬 코드를 적어야 합니다.');
      return;
    }

    const who = name.trim();
    if (!who) {
      setError('아이 이름을 적어 주세요. 목록에서 누구인지 가려야 합니다.');
      return;
    }

    if (!rememberChild(who, token)) {
      setError(childLimitMessage());
      return;
    }

    // 코드를 적은 것 자체가 "나에게 보내 달라"는 뜻이다.
    setReceivesReports(true);
    setBusy(true);

    /*
     * 이 폰 주소를 아이에게 되보낸다. 이게 없으면 연결이 반만 된다 — 부모는
     * 아이를 알지만 아이는 리포트를 어디로 보낼지 모른다.
     *
     * 실패해도 막지 않는다. 아이는 이미 등록됐다. 다만 **되보내지 못했다는
     * 말은 한다** — 조용히 넘기면 리포트가 영영 안 오는 이유를 아무도 모른다.
     *
     * 고치는 길은 **같은 길을 한 번 더 가는 것**이다. 다시 찍으면 되보내기가
     * 다시 일어난다. 예전에는 여기서 "아이 폰에서 부모 QR 을 찍으세요" 라고
     * 반대 방향을 안내했는데, 그 길을 없앴으니 그 말도 없앤다. 있지도 않은
     * 길을 알려 주는 것이 아무 말 안 하는 것보다 나쁘다.
     */
    const mine = state.myPushToken ?? (await fetchPushToken().catch(() => ({ token: null }))).token;
    if (mine) setMyPushToken(mine);

    let sent = false;
    if (mine) {
      const res = await sendLinkBackToChild(token, mine, parentLabelOf(profile?.name)).catch(() => ({
        ok: false,
      }));
      sent = res.ok === true;
    }
    setBusy(false);

    setDone(
      sent
        ? `${who} 등록했어요. 아이 폰에도 알림이 갔습니다.`
        : `${who} 등록했어요. 다만 아이 폰에 이 폰 주소를 알리지 못했습니다 — ` +
            `잠시 뒤 아이 QR 을 한 번 더 찍어 주세요. 그때 다시 보냅니다.`,
    );
    setCode('');
    setName('');
  }

  return (
    <Screen>
      <View style={{ paddingTop: spacing.lg }}>
        <Text style={{ fontSize: 44 }}>🔢</Text>
        <H1 style={{ marginTop: spacing.md }}>코드로 아이 연결하기</H1>
        <Muted style={{ marginTop: spacing.sm }}>
          카메라가 안 될 때 씁니다. 아이 폰 QR 아래에 적힌 코드를 그대로 옮겨 적으세요.
        </Muted>
      </View>

      <Card style={{ marginTop: spacing.lg, borderColor: colors.parent }}>
        <H3>아이 폰에서 코드 띄우기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아이 폰 → <Text style={s.strong}>⚙️ 설정</Text> →{' '}
          <Text style={s.strong}>부모님과 연결하기</Text> →{' '}
          <Text style={s.strong}>📱 내 QR 띄우기</Text>
          {'\n'}QR 아래 <Text style={s.strong}>‘카메라가 안 되면 이 코드를 불러 주세요’</Text> 밑의
          글자입니다. 대문자와 소문자를 구별해야 해요.
        </Muted>

        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="아이 폰에 뜬 연결 코드"
          placeholderTextColor={colors.muted}
          style={[s.input, s.codeInput]}
          multiline
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          spellCheck={false}
        />
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="아이 이름 (예: 서준)"
          placeholderTextColor={colors.muted}
          style={s.input}
          maxLength={20}
        />

        {error ? <Body style={{ color: colors.wrong, marginTop: spacing.sm }}>{error}</Body> : null}
        {done ? <Body style={{ color: colors.correct, marginTop: spacing.sm }}>{done}</Body> : null}

        <Button
          title="연결하기"
          variant="parent"
          loading={busy}
          disabled={code.trim().length === 0}
          onPress={() => void connect()}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <H3>QR 로 하는 편이 빠릅니다</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          코드는 스물몇 글자를 대소문자까지 맞춰 쳐야 합니다. 카메라가 되면 QR 을 찍으세요.
        </Muted>
        <Button
          title="📷 아이 QR 찍기"
          variant="secondary"
          onPress={() => router.replace('/scan')}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      <Button
        title="아이 목록 보기"
        variant="ghost"
        onPress={() => router.replace('/parent-children')}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}

/** 아이 폰에 표시될 이 폰의 이름. scan.tsx 와 같은 규칙을 쓴다. */
function parentLabelOf(name?: string): string {
  const trimmed = (name ?? '').trim();
  return trimmed ? `${trimmed} 폰` : '부모님 폰';
}

const s = StyleSheet.create({
  strong: { fontWeight: '800', color: colors.text },
  /*
   * 코드 칸은 고정폭에 글자를 키운다. 아이 폰 화면을 보고 옮겨 적는데,
   * 글자 폭이 들쭉날쭉하면 어디까지 쳤는지 자꾸 놓친다.
   */
  codeInput: {
    height: 84,
    textAlignVertical: 'top',
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    fontSize: 18,
    letterSpacing: 1,
  },
  input: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.bg,
  },
});
