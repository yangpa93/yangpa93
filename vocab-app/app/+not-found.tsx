import { StyleSheet, Text, View } from 'react-native';
import { router, useGlobalSearchParams, usePathname } from 'expo-router';
import { Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { APP_VERSION } from '../src/features/changelog';
import { buildInfo } from '../src/features/build-info';
import { colors, font, spacing } from '../src/theme';

/**
 * 없는 화면으로 왔을 때. **expo-router 의 영어 기본 화면을 대신한다.**
 *
 * ── 왜 만들었나 ─────────────────────────────────────────────
 *
 * 기본 화면은 이렇게 말한다.
 *
 *     Unmatched Route
 *     Page could not be found.
 *     gomtangivoca://child?token=…
 *
 * 이 화면을 실제로 만난 사람에게서 "이게 맞나요" 라는 물음을 받았다. 맞는
 * 물음이다 — **저 글자로는 무엇이 잘못됐는지도, 무엇을 해야 하는지도 알 수
 * 없다.** 영어이고, 원인을 안 말하고, 갈 곳을 안 알려 준다.
 *
 * 실제 원인은 거의 언제나 하나다. **폰에 깔린 앱이 그 화면이 생기기 전 판**
 * 이라는 것. QR 도 카메라도 딥링크도 다 멀쩡한데 받을 자리만 없다. 그걸
 * 말해 주면 할 일이 분명해진다 — 새 APK 를 받는 것.
 *
 * ── 무엇을 읽었는지 그대로 보여 준다 ────────────────────────
 *
 * scan.tsx 에서 배운 것과 같다. "없습니다" 한 줄만 두면 무엇 때문에 여기
 * 왔는지조차 알 수 없어서, 물어보려 해도 화면을 찍어 보내야 한다. 주소를
 * 그대로 적어 두면 그 한 줄로 이야기가 끝난다.
 */
export default function NotFound() {
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const build = buildInfo();

  /*
   * 아이 QR 로 들어온 것인지 가린다. 이 경우가 압도적으로 많고, 그때는
   * "옛 앱이라 그렇다" 는 답이 거의 확실하다. 다른 경우까지 그렇게 단정하지는
   * 않는다 — 모르는 것을 아는 척하면 엉뚱한 데를 고치게 만든다.
   */
  const looksLikeChildQr = pathname.includes('child') && typeof params.token === 'string';

  /**
   * 무엇을 읽고 여기 왔는지. 물음표 뒤까지 붙여 그대로 보여 준다.
   *
   * `not-found` 는 expo-router 가 스스로 붙이는 값이라 뺀다. 우리가 읽은
   * 것이 아닌데 섞여 있으면, 이 줄을 그대로 읽어 주실 때 없는 것을 있다고
   * 말하게 된다.
   */
  const query = Object.entries(params)
    .filter(([k]) => k !== 'not-found')
    .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(',') : String(v)}`)
    .join('&');
  const came = `${pathname}${query ? `?${query}` : ''}`;

  return (
    <Screen>
      <View style={{ paddingTop: spacing.xl, alignItems: 'center' }}>
        <Text style={s.emoji}>🧭</Text>
        <H1 style={{ marginTop: spacing.md, textAlign: 'center' }}>
          이 앱에 없는 화면이에요
        </H1>
      </View>

      {looksLikeChildQr ? (
        <Card style={{ marginTop: spacing.xl, borderColor: colors.accent }}>
          <H3>아이 QR 은 잘 읽혔어요</H3>
          <Muted style={{ marginTop: spacing.sm }}>
            카메라도, QR 도, 앱으로 넘어오는 길도 다 멀쩡합니다.{'\n'}
            다만 <Text style={s.strong}>이 앱이 그 QR 을 받는 화면이 생기기 전 판</Text>이에요.
            {'\n\n'}
            아이 QR 을 받는 화면은 <Text style={s.strong}>0.20.0</Text> 부터 있습니다.{'\n'}
            지금 이 앱은 <Text style={s.strong}>{build.version}</Text> 이고, 나와 있는 최신은{' '}
            <Text style={s.strong}>{APP_VERSION}</Text> 입니다.
          </Muted>
        </Card>
      ) : (
        <Card style={{ marginTop: spacing.xl }}>
          <H3>왜 이런가요?</H3>
          <Muted style={{ marginTop: spacing.sm }}>
            주소는 맞게 들어왔는데 이 앱에 그 화면이 없습니다. 대개{' '}
            <Text style={s.strong}>앱이 예전 판</Text>이라 그렇습니다.{'\n\n'}
            지금 이 앱은 <Text style={s.strong}>{build.version}</Text>, 나와 있는 최신은{' '}
            <Text style={s.strong}>{APP_VERSION}</Text> 입니다.
          </Muted>
        </Card>
      )}

      {/*
        읽은 주소를 그대로. 물어보실 때 이 한 줄만 알려 주시면 됩니다.
      */}
      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <Muted style={{ fontSize: font.tiny }}>들어온 주소</Muted>
        <Text style={s.came} selectable>
          {came}
        </Text>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>무엇을 하면 되나요?</H3>
        <Muted style={{ marginTop: spacing.sm }}>
          1. 새 APK 를 받아 까세요. 그러면 이 화면이 안 나옵니다.{'\n'}
          2. 급하면 코드로 연결할 수 있어요 — 부모님 폰 ⚙️ 설정 → 아이들 폰 설정 →{'\n'}
          {'   '}🔗 아이 기기와 연결하기 → 📵 코드로 연결하기
        </Muted>
      </Card>

      <Button
        title="홈으로"
        onPress={() => router.replace('/')}
        style={{ marginTop: spacing.xl }}
      />
      <Button
        title="이번 판에 무엇이 들어 있는지 보기"
        variant="ghost"
        onPress={() => router.replace('/whats-new')}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  emoji: { fontSize: 52 },
  strong: { fontWeight: '800', color: colors.text },
  came: {
    marginTop: spacing.xs,
    fontSize: font.small,
    color: colors.subtext,
    lineHeight: 20,
  },
});
