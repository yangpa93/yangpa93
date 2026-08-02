import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, H2, H3, Muted, Row, Screen } from '../src/components/ui';
import { APP_VERSION, RELEASES, releaseOf } from '../src/features/changelog';
import { APP_NAME, buildInfo, buildLabel } from '../src/features/build-info';
import { colors, font, spacing } from '../src/theme';

/**
 * 이 앱에 무엇이 들어 있는지.
 *
 * 어느 화면에서든 판 번호를 누르면 여기로 온다. "고친 게 안 보여요"라는 말을
 * 들었을 때 제일 먼저 알아야 하는 것이 **어느 판을 쓰고 있는가**인데, 그것을
 * 물어보려면 서로 화면을 봐야 한다. 폰만 보고 스스로 답할 수 있게 둔다.
 *
 * 폰에 깔린 판이 목록에 없을 수도 있다 — 옛 앱을 그대로 쓰고 있는 경우다.
 * 그때는 최신 내역을 대신 보여주지 않는다. 안 받은 것을 "들어 있습니다"라고
 * 말하는 것이 제일 나쁘다.
 */
export default function WhatsNew() {
  const build = buildInfo();
  // 폰에 실제로 깔린 판. 목록에 있으면 그 줄을 짚어 준다.
  const mine = releaseOf(build.version);
  const outdated = mine === null;

  return (
    <Screen>
      <View style={{ paddingTop: spacing.md }}>
        <H2>{APP_NAME}</H2>
        <Muted style={{ marginTop: spacing.xs }}>{buildLabel(build)}</Muted>
      </View>

      {outdated ? (
        <Card style={{ marginTop: spacing.md, borderColor: colors.accent }}>
          <H3>지금 쓰는 판은 {build.version} 입니다</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            아래 목록에 이 판이 없어요. 최신은 {APP_VERSION} 입니다. 아래 내용은{' '}
            <Text style={{ fontWeight: '800' }}>아직 안 받은 것</Text>일 수 있으니, 새로 받은 뒤에
            다시 봐 주세요.
          </Muted>
        </Card>
      ) : null}

      {RELEASES.map((r) => {
        const isMine = r.version === build.version;
        return (
          <Card
            key={r.version}
            style={[{ marginTop: spacing.md }, isMine ? { borderColor: colors.primary } : undefined]}
          >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Row style={{ gap: spacing.sm, alignItems: 'center', flex: 1 }}>
                <Text style={s.version}>{r.version}</Text>
                {isMine ? <Chip label="지금 이 판" tone="primary" /> : null}
              </Row>
              <Muted>{r.date}</Muted>
            </Row>

            <Body style={{ marginTop: spacing.sm, fontWeight: '700' }}>{r.title}</Body>

            <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
              {r.items.map((item, i) => (
                <Row key={i} style={{ alignItems: 'flex-start' }}>
                  <Text style={s.dot}>·</Text>
                  <Muted style={{ flex: 1 }}>{item}</Muted>
                </Row>
              ))}
            </View>
          </Card>
        );
      })}

      <Button
        title="돌아가기"
        variant="ghost"
        onPress={() => router.back()}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  version: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  dot: { fontSize: font.body, color: colors.muted, width: 14, lineHeight: 22 },
});
