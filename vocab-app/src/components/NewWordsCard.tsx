import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted } from './ui';
import { useApp } from '../store/AppProvider';
import { addedLine, addedSince } from '../data/dataVersion';
import { colors, font, radius, spacing } from '../theme';

/**
 * "새 낱말이 왔어요" 안내.
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * 낱말은 무선 업데이트로 조용히 들어온다. APK 를 다시 깔 필요가 없는 대신,
 * **화면이 하나도 안 바뀐다.** 어제와 똑같은 앱을 켜는 것처럼 보이고, 그
 * 안에 300개가 늘어 있어도 아무도 모른다. 만들어 넣고 아무도 모르면 안 넣은
 * 것과 같다.
 *
 * 그래서 늘어난 판이 처음 뜨는 날 한 번 말해 준다.
 *
 * ── 왜 알림창(Alert)이 아닌가 ───────────────────────────────
 *
 * 앱을 켜자마자 창이 뜨면 공부하러 온 아이가 그걸 먼저 치워야 한다. 좋은
 * 소식인데 방해가 되는 모양이다. 홈 맨 위 카드로 두면 눈에는 들어오되
 * 길을 막지는 않는다.
 *
 * ── 왜 저절로 안 사라지나 ───────────────────────────────────
 *
 * 본 것으로 적는 일은 **'확인' 을 눌렀을 때만** 한다. 화면에 뜨자마자 적어
 * 버리면, 잠깐 다른 데 갔다 오는 사이에 사라져서 영영 못 본다. 한 번 더
 * 보이는 쪽이 낫다.
 */
export function NewWordsCard() {
  const { state, markDataSeen } = useApp();
  const added = addedSince(state.seenDataVersion);

  if (added.total === 0) return null;

  return (
    <Card style={s.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
        <Text style={{ fontSize: 26 }}>✨</Text>
        <H3 style={{ flex: 1 }}>새 낱말이 {added.total}개 들어왔어요</H3>
      </View>

      <Muted style={{ marginTop: spacing.xs }}>{addedLine(added)}</Muted>

      {/*
        무엇이 늘었는지 한 줄씩. 판이 여러 번 밀려 있으면(오래 안 켠 폰) 여러
        줄이 되는데, 그편이 "3주치가 한꺼번에 왔다" 는 것을 그대로 보여 준다.
      */}
      <View style={{ marginTop: spacing.md, gap: spacing.xs }}>
        {added.releases.slice(0, 3).map((r) => (
          <Text key={r.version} style={s.line}>
            · {r.note}
          </Text>
        ))}
        {added.releases.length > 3 ? (
          <Text style={s.line}>· 그 밖에 {added.releases.length - 3}번 더 늘었어요</Text>
        ) : null}
      </View>

      <Button
        title="확인"
        onPress={markDataSeen}
        style={{ marginTop: spacing.md }}
      />
      <Button
        title="어떤 낱말이 늘었는지 보기"
        variant="ghost"
        onPress={() => router.push('/whats-new')}
        style={{ marginTop: spacing.xs }}
      />
    </Card>
  );
}

const s = StyleSheet.create({
  /*
   * 좋은 소식이라 눈에 띄게 둔다. 다만 붉은 경고색은 안 쓴다 — 고칠 것이
   * 있다는 뜻으로 읽힌다.
   */
  card: {
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.accentSoft,
    borderRadius: radius.lg,
  },
  line: { fontSize: font.small, color: colors.subtext, lineHeight: 21 },
});
