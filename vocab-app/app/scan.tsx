/**
 * 부모님 폰의 QR 을 찍어 연결하는 화면. 아이 기기에서 연다.
 *
 * **왜 QR 인가.** 카톡으로 링크를 보내려면 아이 기기에 카톡이 있어야 하고,
 * 코드를 옮겨 적으려면 스물몇 글자를 대소문자까지 맞춰 쳐야 한다. 아이에게
 * 새 태블릿을 사 주고 이 앱만 깔았다면 둘 다 어렵다. QR 은 두 기기를 마주
 * 보게 하기만 하면 된다.
 *
 * 카메라 권한은 이 화면에 들어올 때만 묻는다. 앱을 켤 때 미리 물으면 왜
 * 필요한지 알 수 없어 대부분 거절한다.
 */

import { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { fetchPushToken, parseLinkUrl, sendHelloToParent } from '../src/features/push';
import { colors, font, radius, spacing } from '../src/theme';

export default function Scan() {
  const { state, profile, linkParent, setMyPushToken } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  /**
   * 이미 한 번 읽었는지.
   *
   * 카메라는 같은 QR 을 1초에 여러 번 읽어 준다. 막지 않으면 연결이 수십 번
   * 일어나고 화면도 그만큼 넘어간다. state 로 두면 갱신이 늦어 그 사이에
   * 또 들어오므로 ref 를 쓴다.
   */
  const handled = useRef(false);

  const onScan = useCallback(
    async ({ data }: { data: string }) => {
      if (handled.current) return;

      const link = parseLinkUrl(data);
      // 아이가 아무 QR 이나 찍어 볼 수 있다(과자 봉지, 버스 정류장).
      // 우리 것이 아니면 조용히 넘긴다 — 잘못 찍을 때마다 오류를 띄우면
      // 화면이 시끄럽다.
      if (!link) return;

      handled.current = true;
      setBusy(true);

      // 자기 주소를 찍으면 자기에게 보내게 된다.
      if (state.myPushToken != null && state.myPushToken === link.token) {
        setError('이 기기의 QR 이에요. 부모님 폰 화면을 찍어야 합니다.');
        setBusy(false);
        handled.current = false;
        return;
      }

      linkParent({ token: link.token, label: link.label, linkedAt: Date.now(), lastSentDate: null });

      /*
       * 이 기기의 주소를 부모님께 알려 둔다.
       *
       * 리포트로 대신할 수 없다. 부모가 아이를 부르고 싶은 때가 바로 리포트가
       * 안 온 날이기 때문이다. 연결하는 지금 한 번 보내 둔다.
       */
      const mine = state.myPushToken ?? (await fetchPushToken()).token;
      if (mine) {
        setMyPushToken(mine);
        await sendHelloToParent(link.token, profile?.name ?? '아이', mine).catch(() => {});
      }

      setBusy(false);
      router.replace('/parent-link');
    },
    [state.myPushToken, linkParent, setMyPushToken, profile?.name],
  );

  /* ---------------- 권한을 아직 안 물었을 때 ---------------- */

  if (!permission) {
    return (
      <Screen>
        <Muted style={{ marginTop: spacing.xxl, textAlign: 'center' }}>카메라를 준비하고 있어요…</Muted>
      </Screen>
    );
  }

  if (!permission.granted) {
    return (
      <Screen>
        <View style={{ alignItems: 'center', paddingTop: spacing.xxl }}>
          <Text style={{ fontSize: 52 }}>📷</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>카메라가 필요해요</H1>
        </View>

        <Card style={{ marginTop: spacing.xl }}>
          <H3>왜 필요한가요?</H3>
          <Body style={{ marginTop: spacing.sm, color: colors.subtext }}>
            부모님 폰 화면에 뜬 QR 코드를 찍어 연결하는 데에만 씁니다.
            사진을 찍거나 저장하지 않고, 어디로도 보내지 않아요.
          </Body>
          <Button
            title="카메라 켜기"
            onPress={() => void requestPermission()}
            style={{ marginTop: spacing.lg }}
          />
        </Card>

        <Button
          title="QR 말고 코드로 연결하기"
          variant="ghost"
          onPress={() => router.replace('/parent-link')}
          style={{ marginTop: spacing.md }}
        />
      </Screen>
    );
  }

  /* ---------------- 찍기 ---------------- */

  return (
    <SafeAreaView style={s.screen} edges={['top', 'left', 'right']}>
      <View style={s.head}>
        <Pressable onPress={() => router.back()} accessibilityRole="button" hitSlop={12}>
          <Text style={s.close}>✕</Text>
        </Pressable>
        <Text style={s.title}>부모님 폰 QR 찍기</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={s.cameraWrap}>
        <CameraView
          style={StyleSheet.absoluteFill}
          facing="back"
          // 우리가 쓰는 것은 QR 하나뿐이다. 바코드까지 읽게 두면 엉뚱한 것에
          // 자꾸 반응한다.
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={busy ? undefined : onScan}
        />
        {/* 어디에 맞춰야 하는지 네모로 짚어 준다. */}
        <View pointerEvents="none" style={s.frame} />
      </View>

      <View style={s.bottom}>
        <Text style={s.guide}>
          부모님 폰의 <Text style={{ fontWeight: '800' }}>QR 코드</Text>를 네모 안에 맞춰 주세요.
        </Text>
        <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
          찍으면 바로 연결됩니다. 아무것도 누르지 않아도 돼요.
        </Muted>
        {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

        <Button
          title="QR 말고 코드로 연결하기"
          variant="ghost"
          onPress={() => router.replace('/parent-link')}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#000' },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  close: { fontSize: 22, color: '#fff', width: 40 },
  title: { fontSize: font.h3, fontWeight: '800', color: '#fff' },
  cameraWrap: { flex: 1, overflow: 'hidden' },
  frame: {
    position: 'absolute',
    top: '15%',
    left: '12%',
    right: '12%',
    bottom: '15%',
    borderWidth: 3,
    borderColor: '#FFFFFFAA',
    borderRadius: radius.xl,
  },
  bottom: {
    padding: spacing.xl,
    backgroundColor: colors.bg,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  guide: { fontSize: font.h3, color: colors.text, textAlign: 'center', lineHeight: 28 },
});
