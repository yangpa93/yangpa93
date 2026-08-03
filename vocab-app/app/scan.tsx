/**
 * QR 을 찍어 아이를 등록하는 화면. **부모 폰이 쓴다.**
 *
 * ── 방향은 하나다 ───────────────────────────────────────────
 *
 * 예전에는 두 방향을 다 받았다 — 부모가 아이 QR 을 찍는 길과, 아이가 부모 QR
 * 을 찍는 길. 그런데 연결 한 번을 하려고 "누가 만들고 누가 찍는가" 를 매번
 * 정해야 했고, 그게 헷갈린다는 말을 들었다. 맞는 말이라 하나만 남겼다.
 *
 *   아이 폰이 QR 을 띄운다 → 부모 폰이 찍는다 → 끝
 *
 * 이쪽이 남은 이유. 찍는 쪽이 부모라 아이를 부를 필요가 없고, 찍는 순간
 * 아이가 등록되면서 이 폰 주소가 아이에게 되돌아간다. 아이 이름도 QR 에
 * 실려 오므로 따로 묻지 않아도 된다. 아이는 더 누를 것이 없다.
 *
 * 부모 QR 을 읽는 코드는 남겨 둔다. 새로 만들지는 않지만 예전 판이 만든
 * QR 이 어딘가 남아 있을 수 있고, 그때 **왜 안 되는지 말해 주려면** 그것이
 * 무엇인지 알아볼 수는 있어야 한다.
 *
 * **왜 QR 인가.** 코드를 옮겨 적으려면 스물몇 글자를 대소문자까지 맞춰 쳐야
 * 한다. QR 은 두 기기를 마주 보게 하기만 하면 된다.
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
import {
  fetchPushToken,
  parseScanned,
  scannedError,
  sendLinkBackToChild,
} from '../src/features/push';
import { childLimitMessage } from '../src/features/children';
import { colors, font, radius, spacing } from '../src/theme';

export default function Scan() {
  const { state, profile, setMyPushToken, setReceivesReports, rememberChild } = useApp();
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  /*
   * `as=parent` 를 받던 자리는 없앴다. 방향이 하나뿐이라 누가 찍고 있는지
   * 갈릴 일이 없다 — 이 화면은 늘 **아이 QR 을 찍는 부모 폰**의 것이다.
   * 부르는 쪽이 아직 그 값을 넘겨도 그냥 무시되므로 깨지지 않는다.
   */

  /**
   * 이미 한 번 읽었는지.
   *
   * 카메라는 같은 QR 을 1초에 여러 번 읽어 준다. 막지 않으면 연결이 수십 번
   * 일어나고 화면도 그만큼 넘어간다. state 로 두면 갱신이 늦어 그 사이에
   * 또 들어오므로 ref 를 쓴다.
   */
  const handled = useRef(false);
  /**
   * 우리 것이 아닌 QR 을 한 번 알려 줬는지.
   *
   * 같은 QR 이 1초에 여러 번 들어오는데 그때마다 말을 갈아치우면 글자가
   * 떨린다. 한 번만 적고 만다.
   */
  const told = useRef('');

  const onScan = useCallback(
    async ({ data }: { data: string }) => {
      if (handled.current) return;

      const got = parseScanned(data);
      /*
       * 우리 것이 아니면 **무엇을 읽었는지 말해 준다.**
       *
       * 예전에는 조용히 넘겼다. 아무 QR 이나 찍어 볼 수 있으니 시끄럽지 않게
       * 한다는 뜻이었는데, 대가가 너무 컸다 — 아이 QR 을 제대로 찍었는데 판이
       * 달라 안 읽히는 때에도 화면이 똑같이 아무 말이 없다. 실제로 "찍었는데
       * 아무런 action 이 없다" 는 말을 들었고, 그 상태로는 무엇이 잘못됐는지
       * 알아낼 방법이 없다. 조용한 실패가 시끄러운 실패보다 나쁘다.
       */
      if (!got) {
        if (told.current !== data) {
          told.current = data;
          setError(scannedError(data));
        }
        return;
      }

      // 자기 주소를 찍으면 자기에게 보내게 된다.
      if (state.myPushToken != null && state.myPushToken === got.token) {
        setError('이 기기의 QR 이에요. 상대 폰 화면을 찍어야 합니다.');
        return;
      }

      /*
       * 주소만 있고 누구인지 모르는 QR. 이름 없이 등록하면 아이 목록에 '아이'
       * 만 늘어서 누가 누구인지 알 수 없다. 이름을 받는 자리로 데려간다.
       */
      if (got.kind === 'token') {
        handled.current = true;
        router.replace({ pathname: '/link-child-code', params: { token: got.token } });
        return;
      }

      /*
       * 부모 폰 QR 을 찍었다. **이제 이 방향은 안 쓴다.**
       *
       * 예전 판이 만든 QR 이 종이나 대화방에 남아 있을 수 있다. 조용히 넘기면
       * "찍었는데 아무 일도 없다" 가 되고, 몰래 예전 방식으로 이어 버리면 길이
       * 다시 둘이 된다. 무엇을 찍었고 무엇을 찍어야 하는지 말해 준다.
       */
      if (got.kind === 'parent') {
        setError(
          '이건 부모님 폰 QR 이에요. 지금은 안 씁니다.\n' +
            '아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기 로 띄운\n' +
            'QR 을 찍어 주세요.',
        );
        return;
      }

      handled.current = true;
      setBusy(true);

      /*
       * 여기서부터는 무엇이든 터질 수 있다 — 알림 권한 창, 네트워크, 푸시
       * 서버. 예전에는 감싸지 않아서, 한 번 터지면 busy 가 true 로 굳고
       * onBarcodeScanned 가 떨어져 나가 **카메라가 조용히 죽었다.** 화면은
       * 그대로 켜져 있으니 계속 대 보다가 앱이 고장 났다고 여긴다.
       */
      try {
        // 어느 쪽을 찍든 이 폰의 주소가 필요하다. 되보내거나 알려야 하기 때문이다.
        const mine = state.myPushToken ?? (await fetchPushToken()).token;
        if (mine) setMyPushToken(mine);

        if (got.kind === 'child') {
          /* 부모가 아이 QR 을 찍은 경우 */
          if (!rememberChild(got.name, got.token)) {
            /*
             * 자리가 없다. handled 를 되돌려 다시 찍을 수 있게 둔다 — 아이
             * 하나를 지우고 오면 그 자리에서 바로 이어진다.
             */
            setError(childLimitMessage());
            handled.current = false;
            setBusy(false);
            return;
          }
          // QR 을 찍은 것 자체가 "나에게 보내 달라"는 뜻이다.
          setReceivesReports(true);
          if (mine) {
            // 아이는 이 주소를 받아야 리포트를 보낼 수 있다. 실패해도 아이는
            // 이미 등록돼 있으므로 화면을 막지 않는다 — 부모가 다시 찍으면 된다.
            await sendLinkBackToChild(got.token, mine, parentLabelOf(profile?.name)).catch(() => {});
          }
          setBusy(false);
          router.replace('/parent-children');
          return;
        }

        /*
         * 여기 오면 안 된다. 위에서 child 는 처리하고 parent 와 token 은
         * 되돌려 보냈으므로 남는 갈래가 없다. 그래도 조용히 빠지지는 않는다.
         */
        setBusy(false);
        handled.current = false;
        setError('이 QR 은 지금 쓰지 않는 것이에요. 아이 폰의 QR 을 찍어 주세요.');
      } catch (e) {
        // 다시 찍을 수 있게 되돌린다. 무엇이 터졌는지도 적는다.
        handled.current = false;
        setBusy(false);
        setError(
          `연결하다 막혔어요. 다시 찍어 주세요.\n${e instanceof Error ? e.message : String(e)}`,
        );
      }
    },
    [
      state.myPushToken,
      setMyPushToken,
      setReceivesReports,
      rememberChild,
      profile?.name,
    ],
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
            아이 폰 화면에 뜬 QR 코드를 찍어 연결하는 데에만 씁니다.
            사진을 찍거나 저장하지 않고, 어디로도 보내지 않아요.
          </Body>
          <Button
            title="카메라 켜기"
            onPress={() => void requestPermission()}
            style={{ marginTop: spacing.lg }}
          />
        </Card>

        {/*
          카메라 권한을 안 준 사람에게는 이것이 **남은 유일한 길**이다.
          ghost 로 두었더니 테두리도 바탕도 없어 눌러 볼 것으로 안 보였다.
        */}
        <Button
          title="📵 코드로 아이 연결하기"
          variant="secondary"
          onPress={() => router.replace('/link-child-code')}
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
        <Text style={s.title}>아이 QR 찍기</Text>
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
          <Text style={{ fontWeight: '800' }}>아이 폰</Text>에서 ⚙️ 설정 → 부모님과 연결하기 →
          📱 내 QR 띄우기 로 띄운 QR 을 네모 안에 맞춰 주세요.
        </Text>
        <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
          찍으면 바로 연결됩니다. 아무것도 누르지 않아도 돼요.
        </Muted>
        {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

        <Button
          title="📵 코드로 아이 연결하기"
          variant="secondary"
          onPress={() => router.replace('/link-child-code')}
          style={{ marginTop: spacing.md }}
        />
      </View>
    </SafeAreaView>
  );
}

/**
 * 아이 폰에 표시될 부모 폰의 이름.
 *
 * 부모 프로필 이름을 그대로 쓴다. '엄마' 라고 지었으면 아이 화면에도 '엄마 폰'
 * 이라고 뜬다. 이름을 또 물어보지 않으려는 것 — 연결하는 자리에서 칸이 하나
 * 늘 때마다 거기서 멈추는 사람이 생긴다.
 */
function parentLabelOf(name?: string): string {
  const trimmed = (name ?? '').trim();
  return trimmed ? `${trimmed} 폰` : '부모님 폰';
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
