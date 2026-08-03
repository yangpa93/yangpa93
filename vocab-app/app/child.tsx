import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { fetchPushToken, isValidPushToken, sendLinkBackToChild } from '../src/features/push';
import { childLimitMessage } from '../src/features/children';
import { colors, spacing } from '../src/theme';

/**
 * 아이 폰이 띄운 QR(`gomtangivoca://child?token=…&name=…`)을 앱이 직접 받는 자리.
 *
 * ── 왜 이 화면이 없어서 사고가 났나 ─────────────────────────
 *
 * 아이 QR 은 **앱 안의 카메라로 찍는 것**을 전제하고 만들었다. 그런데 폰의
 * 기본 카메라 앱으로 찍고 `링크 열기` 를 누르는 것이 훨씬 자연스러운 동작이다.
 * 실제로 그렇게 하셨고, 앱은 이렇게 답했다.
 *
 *     Unmatched Route — Page could not be found.
 *     gomtangivoca://child?token=…
 *
 * QR 도 멀쩡했고 카메라도 멀쩡히 읽었는데, **받을 자리가 없었다.** 부모 QR
 * (`://link`)은 link.tsx 가 받고 있었는데 아이 QR 쪽만 빠져 있었던 것이다.
 * 방향을 뒤집으면서(부모가 찍는 길로) 앱 안 카메라만 생각했다.
 *
 * ── 왜 바로 등록하지 않나 ───────────────────────────────────
 *
 * link.tsx 와 같은 이유다. 링크 하나로 아이가 등록되면, 잘못 눌렀을 때
 * 되돌리는 길을 모르는 채로 목록에 낯선 이름이 생긴다. 무엇이 일어날지
 * 먼저 보여 주고 누르게 한다.
 *
 * ── 시험용 QR ───────────────────────────────────────────────
 *
 * `npm run check-link` 이 만드는 시험지에는 `test=1` 이 붙어 있다. 그것까지
 * 진짜로 등록하면 아이 목록에 있지도 않은 아이가 생긴다. 시험용은 시험용
 * 이라고 말하고 아무것도 안 한다 — 그러면 **깔고 나서 여기까지가 되는지**를
 * 아무 뒤탈 없이 확인할 수 있다.
 */
export default function ChildLinkScreen() {
  const { state, profile, rememberChild, setMyPushToken, setReceivesReports } = useApp();
  const params = useLocalSearchParams<{ token?: string; name?: string; test?: string }>();

  const [done, setDone] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const token = (params.token ?? '').trim();
  const name = (params.name ?? '').trim() || '아이';
  const isTest = params.test === '1';
  const valid = isValidPushToken(token);
  const isSelf = state.myPushToken != null && state.myPushToken === token;

  async function connect() {
    setError('');
    if (!rememberChild(name, token)) {
      setError(childLimitMessage());
      return;
    }
    // QR 을 찍은 것 자체가 "나에게 보내 달라"는 뜻이다.
    setReceivesReports(true);
    setBusy(true);

    /*
     * 이 폰 주소를 아이에게 되보낸다. 없으면 연결이 반만 된다 — 부모는 아이를
     * 알지만 아이는 리포트를 어디로 보낼지 모른다. 실패해도 막지 않되
     * **못 보냈다는 말은 한다.** 조용히 넘기면 리포트가 안 오는 까닭을 아무도
     * 모른다.
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
        ? `${name} 등록했어요. 아이 폰에도 알림이 갔습니다.`
        : `${name} 등록했어요. 다만 아이 폰에 이 폰 주소를 알리지 못했습니다 — ` +
            `잠시 뒤 아이 QR 을 한 번 더 찍어 주세요. 그때 다시 보냅니다.`,
    );
  }

  /* ---------------- 시험용 QR ---------------- */

  if (isTest) {
    return (
      <Screen scroll={false}>
        <View style={s.center}>
          <Text style={s.emoji}>✅</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>시험용 QR 이 잘 읽혔어요</H1>
          <Body style={{ marginTop: spacing.md, textAlign: 'center', color: colors.subtext }}>
            카메라도, QR 도, 앱으로 넘어오는 길도 다 멀쩡합니다.{'\n'}
            이건 <Text style={{ fontWeight: '700' }}>시험용</Text>이라 아무것도 등록하지 않았어요.
            {'\n\n'}
            진짜 연결은 아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 →{'\n'}
            📱 내 QR 띄우기 로 띄운 QR 로 하세요.
          </Body>
          <Button
            title="홈으로"
            onPress={() => router.replace('/')}
            style={{ marginTop: spacing.xl, width: '100%' }}
          />
        </View>
      </Screen>
    );
  }

  /* ---------------- 끝났을 때 ---------------- */

  if (done) {
    return (
      <Screen scroll={false}>
        <View style={s.center}>
          <Text style={s.emoji}>✅</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>연결됐어요!</H1>
          <Body style={{ marginTop: spacing.md, textAlign: 'center', color: colors.subtext }}>
            {done}
          </Body>
          <Button
            title="아이 목록 보기"
            onPress={() => router.replace('/parent-children')}
            style={{ marginTop: spacing.xl, width: '100%' }}
          />
        </View>
      </Screen>
    );
  }

  /* ---------------- 읽을 수 없는 QR ---------------- */

  if (!valid) {
    return (
      <Screen scroll={false}>
        <View style={s.center}>
          <Text style={s.emoji}>⚠️</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>연결할 수 없어요</H1>
          <Body style={{ marginTop: spacing.md, textAlign: 'center', color: colors.subtext }}>
            QR 이 깨졌거나 오래된 것 같습니다.{'\n'}
            아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 →{'\n'}📱 내 QR 띄우기 로 다시 띄워 주세요.
          </Body>
          <Button
            title="홈으로"
            onPress={() => router.replace('/')}
            style={{ marginTop: spacing.xl, width: '100%' }}
          />
        </View>
      </Screen>
    );
  }

  /* ---------------- 물어보고 등록 ---------------- */

  return (
    <Screen>
      <View style={{ paddingTop: spacing.xl }}>
        <Text style={s.emoji}>👧</Text>
        <H1 style={{ marginTop: spacing.md }}>이 아이를 등록할까요?</H1>
        <Muted style={{ marginTop: spacing.sm }}>
          등록하면 아이가 공부를 마칠 때마다 이 폰으로 결과가 옵니다.
        </Muted>
      </View>

      <Card style={{ marginTop: spacing.xl }}>
        <H3>{name}</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아이 폰에서 띄운 QR 을 읽었습니다. 이 폰이{' '}
          <Text style={{ fontWeight: '700' }}>리포트를 받는 폰</Text>이 됩니다.
        </Muted>
      </Card>

      {/*
        자기 QR 을 자기가 열면 자기에게 보내게 된다. 아이 폰에서 QR 을 띄워
        놓고 그 폰으로 눌러 볼 수 있어 생기는 자리다.
      */}
      {isSelf ? (
        <Card style={{ marginTop: spacing.md, borderColor: colors.wrong }}>
          <H3 style={{ color: colors.wrong }}>잠깐요</H3>
          <Muted style={{ marginTop: spacing.sm }}>
            이 QR 은 <Text style={{ fontWeight: '700' }}>이 폰이 직접 만든 것</Text>입니다.
            아이 폰 화면의 QR 을 <Text style={{ fontWeight: '700' }}>부모님 폰</Text>으로 찍어야
            합니다.
          </Muted>
        </Card>
      ) : null}

      {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

      <Button
        title="네, 등록할게요"
        onPress={() => void connect()}
        loading={busy}
        variant={isSelf ? 'secondary' : 'parent'}
        style={{ marginTop: spacing.xl }}
      />
      <Button
        title="아니요"
        variant="ghost"
        onPress={() => router.replace('/')}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
  );
}

/** 아이 폰에 표시될 이 폰의 이름. scan.tsx · link-child-code.tsx 와 같은 규칙. */
function parentLabelOf(name?: string): string {
  const trimmed = (name ?? '').trim();
  return trimmed ? `${trimmed} 폰` : '부모님 폰';
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  emoji: { fontSize: 52 },
});
