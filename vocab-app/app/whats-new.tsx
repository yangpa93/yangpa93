import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, H2, H3, Muted, Row, Screen } from '../src/components/ui';
import { APP_VERSION, RELEASES, releaseOf, SHOW_RELEASE_NOTES } from '../src/features/changelog';
import { APP_NAME, buildInfo, buildLabel } from '../src/features/build-info';
import { useApp } from '../src/store/AppProvider';
import { addedLine, DATA_RELEASES, DATA_VERSION, latestDataRelease } from '../src/data/dataVersion';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 이 앱에 무엇이 들어 있는지. **두 줄로 센다.**
 *
 * ── 왜 갈래가 둘인가 ────────────────────────────────────────
 *
 * 앱을 고치는 일과 낱말을 더하는 일은 성격이 다르다. 앱은 화면이 바뀌니
 * 눌러 보면 알지만, **낱말은 화면이 그대로다** — 300개가 늘어도 어제와
 * 똑같은 앱처럼 보인다. 한 목록에 섞어 두면 "0.22.0 에서 뭐가 바뀌었지" 에
 * 화면 얘기와 낱말 얘기가 뒤엉킨다.
 *
 *   📱 앱      화면이 바뀐 것 · 버그가 고쳐진 것
 *   📚 낱말    영어 · 국어 · 일상 문장이 늘어난 것
 *
 * 낱말은 무선 업데이트로 들어오므로 APK 를 다시 안 깔아도 는다. 그래서 두
 * 판이 서로 다른 속도로 움직이고, 한 숫자로는 못 적는다.
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
  const { state } = useApp();
  const build = buildInfo();
  // 폰에 실제로 깔린 판. 목록에 있으면 그 줄을 짚어 준다.
  const mine = releaseOf(build.version);
  const outdated = mine === null;
  const latestData = latestDataRelease();

  /** 앱 쪽을 먼저 보인다. 판 칩을 눌러 오는 사람은 대개 앱 얘기를 찾는다. */
  const [tab, setTab] = useState<'app' | 'data'>('app');

  return (
    <Screen>
      <View style={{ paddingTop: spacing.md }}>
        <H2>{APP_NAME}</H2>
        {/*
          두 판을 나란히 적는다. 하나만 적으면 "낱말이 몇 개짜리 묶음을 쓰고
          있는지" 를 물어볼 방법이 없다.
        */}
        <Muted style={{ marginTop: spacing.xs }}>📱 앱 {buildLabel(build)}</Muted>
        <Muted style={{ marginTop: 2 }}>
          📚 낱말 {DATA_VERSION} · 영어 {latestData.totalEn}개 · 국어 {latestData.totalKo}개 ·
          일상 문장 {latestData.totalDaily}개
        </Muted>
      </View>

      <Row style={{ gap: spacing.sm, marginTop: spacing.md }}>
        {(
          [
            { key: 'app', label: '📱 앱' },
            { key: 'data', label: '📚 낱말' },
          ] as const
        ).map((t) => (
          <Pressable
            key={t.key}
            onPress={() => setTab(t.key)}
            style={[s.tab, tab === t.key && s.tabOn]}
            accessibilityRole="radio"
            accessibilityState={{ selected: tab === t.key }}
          >
            <Text style={[s.tabText, tab === t.key && s.tabTextOn]}>{t.label}</Text>
          </Pressable>
        ))}
      </Row>

      {tab === 'data' ? (
        <>
          <Muted style={{ marginTop: spacing.md }}>
            낱말은 앱을 다시 깔지 않아도 늘어요. 앱을 껐다 켜면 새 낱말이 들어옵니다.
          </Muted>
          {DATA_RELEASES.map((r) => {
            const isMine = r.version === (state.seenDataVersion ?? DATA_VERSION);
            const added = addedLine(r);
            return (
              <Card
                key={r.version}
                style={[
                  { marginTop: spacing.md },
                  isMine ? { borderColor: colors.accent } : undefined,
                ]}
              >
                <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Row style={{ gap: spacing.sm, alignItems: 'center', flex: 1 }}>
                    <Text style={s.version}>{r.version}</Text>
                    {isMine ? <Chip label="지금 이 판" tone="accent" /> : null}
                  </Row>
                  <Muted>{r.date}</Muted>
                </Row>

                {added ? (
                  <Body style={{ marginTop: spacing.sm, fontWeight: '700' }}>{added} 늘었어요</Body>
                ) : null}
                <Muted style={{ marginTop: spacing.xs }}>{r.note}</Muted>

                {/* 그 판 시점의 전체 개수. "지금 몇 개짜리인가" 가 늘 궁금하다. */}
                <Muted style={{ marginTop: spacing.sm, fontSize: font.tiny }}>
                  이때까지 모두 — 영어 {r.totalEn}개 · 국어 {r.totalKo}개 · 일상 문장{' '}
                  {r.totalDaily}개
                </Muted>
              </Card>
            );
          })}

          <Button
            title="돌아가기"
            variant="ghost"
            onPress={() => router.back()}
            style={{ marginTop: spacing.lg }}
          />
        </>
      ) : (
        <>

      {/*
        목록을 안 보여줄 때는 이 카드도 안 띄운다. "아래 목록에 이 판이
        없어요" 라고 하는데 아래에 목록이 없으면 무슨 말인지 알 수 없다.
      */}
      {outdated && SHOW_RELEASE_NOTES ? (
        <Card style={{ marginTop: spacing.md, borderColor: colors.accent }}>
          <H3>지금 쓰는 판은 {build.version} 입니다</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            아래 목록에 이 판이 없어요. 최신은 {APP_VERSION} 입니다. 아래 내용은{' '}
            <Text style={{ fontWeight: '800' }}>아직 안 받은 것</Text>일 수 있으니, 새로 받은 뒤에
            다시 봐 주세요.
          </Muted>
        </Card>
      ) : null}

      {/*
        정식으로 열기 전에는 바뀐 것을 안 적는다.

        아직 다듬는 중인 것을 판마다 늘어놓으면 읽는 쪽에는 고쳤다 안 고쳤다
        하는 소리로만 들린다. 대신 **지금 쓰는 판이 무엇인지**는 그대로 보인다 —
        그게 이 화면의 원래 쓸모이고, "고친 게 안 보여요" 를 가리는 유일한
        표시다. 목록은 SHOW_RELEASE_NOTES 를 켜면 그때부터 나온다.
      */}
      {!SHOW_RELEASE_NOTES ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>지금 쓰는 판은 {build.version} 입니다</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            아직 다듬는 중이라 무엇이 바뀌었는지는 여기 적지 않고 있어요.
            정식으로 열고 나면 판마다 무엇이 좋아졌는지 적어 드릴게요.
          </Muted>
          <Muted style={{ marginTop: spacing.sm }}>
            낱말이 얼마나 늘었는지는 위 📚 낱말 에서 볼 수 있어요.
          </Muted>
        </Card>
      ) : null}

      {(SHOW_RELEASE_NOTES ? RELEASES : []).map((r) => {
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
        </>
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
  version: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  dot: { fontSize: font.body, color: colors.muted, width: 14, lineHeight: 22 },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
  },
  tabOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  tabText: { fontSize: font.body, fontWeight: '800', color: colors.subtext },
  tabTextOn: { color: '#fff' },
});
