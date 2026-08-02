/**
 * 아이 기기와 연결하기. **부모님 설정에 이 카드 하나만 둔다.**
 *
 * ── 왜 합쳤는가 ─────────────────────────────────────────────
 *
 * 예전에는 '🔗 아이 기기와 연결하기' 라는 카드가 **두 장** 나란히 있었다.
 * 하나는 아이 QR 을 찍는 길, 다른 하나(InviteChildCard)는 내 QR 을 띄우는
 * 길이었는데, 제목이 똑같아서 무엇이 다른지 알 수 없었다. 둘 중 무엇을 눌러야
 * 하는지 모르면 대부분 아무것도 안 누르고 연결을 미룬다.
 *
 * 그래서 카드는 한 장으로 두고, 안에서 **누가 QR 을 만들고 누가 찍는지**로
 * 두 갈래를 갈랐다. 번호를 붙인 것은 순서를 뜻해서가 아니라 "둘 중 하나를
 * 고르는 것"임을 눈에 보이게 하려는 것이다.
 *
 *   ① 아이 폰에서 만든 QR 을 **내 폰으로 찍기**   ← 보통은 이쪽
 *   ② 내 폰에서 만든 QR 을 **아이 폰으로 찍게 하기**
 *
 * ①이 먼저인 이유: 찍는 쪽이 부모라 아이를 부를 필요가 없고, 찍는 순간
 * 아이가 등록되면서 이 폰 주소가 아이에게 되돌아가 아이는 더 누를 것이 없다.
 * ②는 아이 폰 카메라가 안 되거나 아이가 QR 화면까지 못 찾을 때 쓴다.
 */

import { useState } from 'react';
import { Platform, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { APP_NAME } from '../features/app-name';
import { MAX_CHILDREN, childLimitMessage, childNames } from '../features/children';
import { buildLinkUrl, fetchPushToken, toShortCode } from '../features/push';
import { QrCode } from './QrCode';
import { colors, font, radius, spacing } from '../theme';

export function LinkChildCard() {
  const { state, setMyPushToken, setReceivesReports } = useApp();
  const [label, setLabel] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  /** ②를 펼쳤는지. 늘 띄워 두면 아이가 부모 폰을 집어 마음대로 연결할 수 있다. */
  const [showingCode, setShowingCode] = useState(false);

  /*
   * 아이는 이 폰 안의 프로필과 QR 로 이어진 아이 양쪽에서 온다. 이름으로
   * 합쳐 세야 실제 수가 맞는다 — 프로필도 만들어 주고 연결도 한 아이를 둘로
   * 세면 아이 둘인 집이 넷으로 잡힌다.
   */
  const names = childNames(state.profiles, state.knownChildren ?? []);
  const full = names.length >= MAX_CHILDREN;

  /** 이 폰의 주소를 만든다. QR 을 띄우는 것과 링크를 보내는 것이 함께 쓴다. */
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

  /** ② 내 QR 을 띄운다. 아무 데도 보내지 않는다. */
  async function showCode() {
    setError('');
    const token = await ensureToken();
    if (!token) return;
    // QR 을 보여 주는 것도 "나에게 보내 달라"는 뜻이다.
    setReceivesReports(true);
    setShowingCode(true);
  }

  /**
   * 링크를 카톡·메일로 보낸다.
   *
   * 아이에게 새 태블릿을 사 주고 이 앱만 깔았다면 그 기기에는 카톡도 메일도
   * 없다. 그때는 위 QR 이나 아래 짧은 코드를 쓴다.
   */
  async function invite() {
    setError('');
    const token = await ensureToken();
    if (!token) return;
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
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <H3>🔗 아이 기기와 연결하기</H3>
        <Chip
          label={`${names.length} / ${MAX_CHILDREN}명`}
          tone={full ? 'accent' : 'default'}
        />
      </Row>
      <Muted style={{ marginTop: spacing.xs }}>
        연결하면 아이가 공부를 마칠 때마다 이 폰으로 결과가 옵니다. 이 폰의 학습 화면은
        그대로 남아요. 아래 두 가지 중 <Text style={s.strong}>편한 쪽 하나만</Text> 하시면
        됩니다.
      </Muted>

      {names.length > 0 ? (
        <Muted style={{ marginTop: spacing.sm }}>지금 연결된 아이 — {names.join(' · ')}</Muted>
      ) : null}

      {/*
        꽉 찼으면 두 버튼을 잠그고 왜 안 되는지 여기서 말해 준다. 버튼만 살려
        두면 눌러서 QR 을 찍고 나서야 안 된다는 것을 알게 되는데, 그때는
        아이를 이미 불러다 세워 둔 뒤다.
      */}
      {full ? (
        <View style={s.fullBox}>
          <Text style={s.fullTitle}>자리가 다 찼어요</Text>
          <Muted style={{ marginTop: spacing.xs }}>{childLimitMessage()}</Muted>
        </View>
      ) : null}

      {/* ── ① 아이 QR 을 내가 찍는다 ── */}
      <View style={s.way}>
        <Text style={s.wayTitle}>1. 아이폰에서 생성한 QR를 내폰에서 찍어 연결하기</Text>
        <Text style={s.wayHint}>
          아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 내 QR 띄우기 를 누르게 하고, 이 폰으로
          그 QR 을 찍으세요. 찍는 순간 아이가 등록되고 이 폰 주소가 아이에게 되돌아갑니다.
          아이는 더 누를 것이 없어요.
        </Text>
        <Button
          title="📷 아이 QR 찍기"
          variant="parent"
          onPress={() => router.push({ pathname: '/scan', params: { as: 'parent' } })}
          disabled={full}
          style={{ marginTop: spacing.md }}
        />
        {/*
          카메라가 안 될 때. 아이 QR 아래에는 늘 짧은 코드가 같이 떠 있었는데,
          **부모 폰에는 그 코드를 적어 넣을 칸이 없었다.** 반만 뚫린 길이었다.
        */}
        <Button
          title="📵 카메라가 안 되면 — 코드로 연결하기"
          variant="ghost"
          onPress={() => router.push('/link-child-code')}
          disabled={full}
          style={{ marginTop: spacing.sm }}
        />
      </View>

      {/* ── ② 내 QR 을 아이가 찍는다 ── */}
      <View style={s.way}>
        <Text style={s.wayTitle}>2. 내 폰에서 생성한 QR을 아이폰에서 찍어 연결하기</Text>
        <Text style={s.wayHint}>
          아이 폰 카메라가 안 되거나 아이가 QR 화면을 못 찾을 때 씁니다. 이 폰에 QR 이
          뜨면 아이 폰에서 ⚙️ 설정 → 부모님 폰 연결하기 → QR 찍기 로 찍게 하세요.
          아이가 여럿이면 기기마다 한 번씩, 같은 QR 을 그대로 쓰면 됩니다.
        </Text>

        <TextInput
          value={label}
          onChangeText={setLabel}
          placeholder="이 폰 이름 (예: 엄마 폰)"
          placeholderTextColor={colors.muted}
          style={s.input}
          maxLength={20}
        />

        <Button
          title={showingCode ? 'QR 코드 숨기기' : '📱 내 QR 띄우기'}
          variant="parent"
          loading={busy}
          disabled={full}
          onPress={() => (showingCode ? setShowingCode(false) : void showCode())}
          style={{ marginTop: spacing.md }}
        />
        <Button
          title="카톡·메일로 링크 보내기"
          variant="ghost"
          loading={busy}
          disabled={full}
          onPress={invite}
          style={{ marginTop: spacing.sm }}
        />

        {showingCode && state.myPushToken ? (
          <View style={s.codeBox}>
            <QrCode value={buildLinkUrl(state.myPushToken, label.trim() || '부모님 폰')} size={230} />
            <Text style={s.qrHint}>아이 기기로 이 QR 을 찍어 주세요</Text>

            {/* 카메라가 없는 기기를 위해 짧은 코드도 같이 둔다. */}
            <View style={s.codeFallback}>
              <Muted style={{ fontSize: 11 }}>카메라가 없으면 이 코드를 그대로 입력</Muted>
              <Text style={s.code} selectable>
                {toShortCode(state.myPushToken)}
              </Text>
            </View>
          </View>
        ) : null}
      </View>

      {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

      {names.length > 0 ? (
        <Button
          title="아이별 설정 보기"
          variant="secondary"
          onPress={() => router.push('/parent-children')}
          style={{ marginTop: spacing.lg }}
        />
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
  strong: { fontWeight: '800', color: colors.text },
  fullBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  fullTitle: { fontSize: font.body, fontWeight: '800', color: '#B45309' },
  /*
   * 두 갈래를 상자로 갈라 둔다. 줄만 띄우면 스크롤 중에 어디까지가 1번이고
   * 어디부터가 2번인지 흐려져서, 합치기 전과 똑같이 헷갈린다.
   */
  way: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  wayTitle: { fontSize: font.body, fontWeight: '800', color: colors.text, lineHeight: 22 },
  wayHint: { fontSize: font.small, color: colors.subtext, marginTop: spacing.xs, lineHeight: 20 },
  codeBox: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.parent,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  qrHint: {
    marginTop: spacing.md,
    fontSize: font.body,
    fontWeight: '700',
    color: colors.parent,
    textAlign: 'center',
  },
  codeFallback: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
    alignItems: 'center',
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
