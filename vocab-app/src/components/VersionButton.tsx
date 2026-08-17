/**
 * 지금 쓰는 판. **판 번호를 적고, 그 아래에 작은 단추를 둔다.**
 *
 * ── 두 번 고쳤다 ────────────────────────────────────────────
 *
 * 처음에는 판이 그냥 글자였다. "이게 버튼인지 아니면 그냥 정보성인지 확인이
 * 안 됩니다" 는 말을 들었다 — 다섯 군데가 다 그랬고, 아이 홈에서는 옆의
 * `🔥 3일 연속` 같은 장식용 칩과 똑같이 생겨서 더 나빴다.
 *
 * 그래서 테두리를 두르고 '판 정보 보기' 라고 적었더니, 이번에는 **너무
 * 커졌다.** 판 번호는 늘 보이기는 해야 하지만 화면에서 제일 중요한 것은
 * 아니다.
 *
 * 지금 모양은 둘을 갈라 놓은 것이다.
 *
 *   현재 버전 : 0.23.0.6      ← 그냥 읽는 것. 늘 보인다
 *   [상세 버전 정보 확인하기 ›]  ← 누르는 것. 작게, 아래에
 *
 * 읽는 것과 누르는 것이 생김새로 갈리면 "이게 버튼인가" 를 물을 일이 없다.
 * 단추 쪽에만 테두리와 색이 있다.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { buildInfo, versionLabel } from '../features/build-info';
import { colors, font, radius, spacing } from '../theme';

export function VersionButton({
  tone = 'primary',
  style,
}: {
  /** 아이 화면은 primary, 부모 화면은 parent. 그 화면에서 눌리는 것의 색이다. */
  tone?: 'primary' | 'parent';
  style?: object;
}) {
  const build = buildInfo();
  const color = tone === 'parent' ? colors.parent : colors.primary;

  return (
    <View style={[s.wrap, style]}>
      {/*
        **만든 때를 여기에 적는다.**

        판 정보 화면 안쪽에만 적어 두었더니 "버전 정보에 빌드 타임이 나타나지
        않습니다" 는 말을 들었다. 사람이 판을 확인하는 자리는 이 줄이다 —
        여기 없으면 없는 것이다. 한 줄이 길어지므로 시각은 아랫줄로 내린다.
      */}
      <Text style={s.now}>
        현재 버전 : <Text style={s.version}>{versionLabel(build)}</Text>
      </Text>
      {build.builtAt ? <Text style={s.stamp}>{build.builtAt}</Text> : null}

      <Pressable
        onPress={() => router.push('/whats-new')}
        accessibilityRole="button"
        accessibilityLabel="상세 버전 정보 확인하기"
        // 작아진 만큼 누를 자리는 넓혀 둔다. 눈에 작은 것과 손에 작은 것은
        // 다른 문제다 — 손가락은 글자 크기대로 줄어들지 않는다.
        hitSlop={10}
        style={({ pressed }) => [s.btn, { borderColor: color }, pressed && s.pressed]}
      >
        <Text style={[s.btnText, { color }]}>상세 버전 정보 확인하기 ›</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  /*
   * 아래 여백을 넉넉히 둔다. **폰의 홈 단추와 겹친다**는 말을 들었다 — 이
   * 줄이 화면 맨 아래에 있어서, 안드로이드 밑줄 세 칸(뒤로·홈·최근)과 붙어
   * 눌리지도 읽히지도 않았다. 스크롤 끝에 손가락 하나 들어갈 자리를 남긴다.
   */
  wrap: { alignItems: 'center', gap: spacing.xs, marginBottom: spacing.xl },
  now: { fontSize: font.tiny, color: colors.subtext },
  /* 만든 때. 판 번호에 딸린 것이라 더 흐리게, 바로 밑에 붙인다. */
  stamp: { fontSize: font.tiny, color: colors.subtext, opacity: 0.8, marginTop: -2 },
  /* 번호만 진하게. 사람이 불러 줘야 하는 것은 이 네 자리다. */
  version: { fontWeight: '800', color: colors.text },
  btn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    backgroundColor: colors.card,
  },
  pressed: { opacity: 0.7 },
  btnText: { fontSize: font.tiny, fontWeight: '700' },
});
