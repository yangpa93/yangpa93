/**
 * 아이 화면의 '부모님과 연결하기'.
 *
 * **방향을 뒤집었다.** 예전에는 부모가 QR 을 띄우고 아이가 찍었다. 그런데
 * 부모님 모드에 들어가 보면 "이 기기에 등록된 아이가 없습니다"만 뜨고,
 * 아이를 등록할 QR 을 만들 자리가 없어 길이 스스로 막혀 있었다.
 *
 * 이제는 아이가 자기 QR 을 띄우고 부모가 찍는다. 아이는 자기 이름과 주소를
 * 이미 갖고 있으니 누르는 순간 바로 뜨고, 부모는 아이 폰을 보며 찍기만 하면
 * 된다. 부모 폰 주소는 찍은 뒤 부모가 되보내므로 아이가 더 할 일은 없다.
 *
 * 부모님이 이 앱을 안 쓰는 집도 있다. 그때 이 카드를 계속 띄우면 못 한 일이
 * 남아 있는 것처럼 보인다. '연결 안 할래요'로 끌 수 있게 하되 **부모가 PIN 을
 * 눌러 승인**해야 꺼진다 — 아이가 스스로 끄면 감시를 피하는 길이 된다.
 */

import { useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { buildChildLinkUrl, fetchPushToken, toShortCode } from '../features/push';
import { QrCode } from './QrCode';
import { colors, font, radius, spacing } from '../theme';

export function ConnectParentCard() {
  const { state, profile, setMyPushToken } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showing, setShowing] = useState(false);

  if (!profile) return null;

  const link = state.parentLink;

  /* ---------------- 이미 연결됨 ---------------- */

  if (link) {
    return (
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>👨‍👩‍👧 부모님과 연결됨</H3>
          <Chip label={link.label} tone="correct" />
        </Row>
        <Muted style={{ marginTop: spacing.xs }}>
          공부를 마치면 오늘 기록이 자동으로 갑니다. 가는 것 — {profile.name} · 날짜 ·
          오늘 푼 개수 · 정답률 · 오늘 틀린 단어 · 지금 레벨 진도. 그 밖에는 아무것도
          보내지 않아요.
        </Muted>
        <Button
          title="연결 상태 보기"
          variant="secondary"
          onPress={() => router.push('/parent-link')}
          style={{ marginTop: spacing.md }}
        />
      </Card>
    );
  }

  /* ---------------- 연결 안 하기로 승인됨 ---------------- */

  if (profile.linkWaived) {
    return (
      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <H3>🔕 부모님 연결 없이 쓰는 중</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          기록은 이 폰 안에만 있어요. 나중에 연결하고 싶으면 부모님께 말씀드리면 됩니다.
        </Muted>
      </Card>
    );
  }

  /* ---------------- 아직 안 함 ---------------- */

  async function showQr() {
    setError('');
    if (state.myPushToken) {
      setShowing(true);
      return;
    }
    setBusy(true);
    const got = await fetchPushToken();
    setBusy(false);
    if (!got.token) {
      setError(got.reason ?? '이 폰의 주소를 만들지 못했습니다.');
      return;
    }
    setMyPushToken(got.token);
    setShowing(true);
  }

  return (
    <Card style={{ marginTop: spacing.md }}>
      <H3>👨‍👩‍👧 부모님과 연결하기</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        연결하면 공부를 마칠 때마다 {profile.name}의 오늘 기록(푼 개수 · 정답률 ·
        틀린 단어 · 레벨 진도)이 부모님 폰으로 갑니다. 그 밖에는 아무것도 보내지 않아요.
      </Muted>

      <View style={s.steps}>
        <Text style={s.step}>1. 아래 버튼을 누르면 내 QR 이 뜹니다</Text>
        <Text style={s.step}>2. 부모님 폰에서 아이들 학습 보고서 → 아이 QR 찍기</Text>
        <Text style={s.step}>3. 찍히면 끝이에요. 더 누를 것 없어요</Text>
      </View>

      <Button
        title={showing ? 'QR 숨기기' : '📱 내 QR 띄우기'}
        loading={busy}
        onPress={() => (showing ? setShowing(false) : void showQr())}
        style={{ marginTop: spacing.md }}
      />

      {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

      {showing && state.myPushToken ? (
        <View style={s.codeBox}>
          <QrCode value={buildChildLinkUrl(state.myPushToken, profile.name)} size={230} />
          <Text style={s.qrHint}>부모님 폰으로 이 QR 을 찍어 주세요</Text>

          {/* 부모님 폰에 카메라가 없거나 안 될 때를 위해 코드도 같이 둔다. */}
          <View style={s.codeFallback}>
            <Muted style={{ fontSize: 11 }}>카메라가 안 되면 이 코드를 불러 주세요</Muted>
            <Text style={s.code} selectable>
              {toShortCode(state.myPushToken)}
            </Text>
          </View>
        </View>
      ) : null}

      {/*
        연결이 필요 없는 집을 위한 길. 아이가 혼자 끄지 못하게 부모 PIN 뒤에 둔다.
      */}
      <Button
        title="부모님과 연결하지 않을래요"
        variant="ghost"
        onPress={() =>
          router.push({ pathname: '/parent', params: { intent: 'waive', profileId: profile.id } })
        }
        style={{ marginTop: spacing.sm }}
      />
      <Muted style={{ marginTop: spacing.xs, textAlign: 'center' }}>
        부모님이 PIN 을 눌러 확인해 주셔야 꺼집니다.
      </Muted>
    </Card>
  );
}

const s = StyleSheet.create({
  steps: { marginTop: spacing.md, gap: spacing.xs },
  step: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },
  codeBox: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
  qrHint: {
    marginTop: spacing.md,
    fontSize: font.body,
    fontWeight: '700',
    color: colors.primary,
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
   * 코드는 크고 고정폭이라야 한다. 부모가 화면을 보고 옮겨 적는데,
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
});
