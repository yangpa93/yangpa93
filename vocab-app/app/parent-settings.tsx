import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Chip, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { PARENT_TRACK_LABEL } from '../src/types';
import { TRACK_ORDER } from '../src/srs/parentSession';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * ⚙️ 설정 — 두 갈래로 나누는 자리.
 *
 * ── 왜 한 겹을 더 두는가 ─────────────────────────────────────
 *
 * 예전에는 이 화면이 곧 설정 내용이었고, 알림 시각 · 아이 기기 연결 ·
 * 요청권 금액 · PIN · 백업이 한 줄로 이어져 있었다. 거기에 부모 자신의 공부
 * 설정까지 다른 화면에 따로 있어서, 무엇이 어디 있는지 이름만 보고는 알 수
 * 없었다.
 *
 * 부모가 만지는 설정은 성격이 완전히 둘로 갈린다.
 *
 *   아이들 폰 설정 — 아이 쪽을 향한 것. 알림, 연결, 요청권 금액, 백업, PIN
 *   내 공부 설정   — 나 자신에 대한 것. 무엇을 하루 몇 개씩 볼지
 *
 * 이 둘을 섞어 놓으면 "아이 금액을 고치려는데 내 국어 레벨이 나오는" 일이
 * 생긴다. 한 겹을 더 두는 대신, 어느 쪽을 만지려는 것인지 먼저 고르게 한다.
 * 고르고 나면 그 안에는 딴 것이 없다.
 */
export default function ParentSettings() {
  const { state, profile } = useApp();
  const build = buildInfo();

  const childProfiles = state.profiles.filter((p) => p.kind === 'child');
  const remoteNames = (state.knownChildren ?? []).map((c) => c.name);
  const childCount = new Set([...childProfiles.map((p) => p.name), ...remoteNames]).size;

  // 지금 무엇을 공부하기로 해 두었는지 한 줄로. 눌러 보지 않아도 알 수 있게.
  const tracks = profile
    ? TRACK_ORDER.filter((t) => profile.parentStudy.tracks.includes(t)).map(
        (t) => PARENT_TRACK_LABEL[t],
      )
    : [];

  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>
        무엇을 고치시려는지 먼저 고르세요.
      </Muted>

      <Tile
        icon="👧"
        title="아이들 폰 설정"
        hint={
          childCount === 0
            ? '아이 폰과 연결하기 · 매일 리포트 알림 · 기본 요청권 금액 · 백업 · PIN'
            : `아이 ${childCount}명 · 연결 · 매일 리포트 알림 · 기본 요청권 금액 · 백업 · PIN`
        }
        onPress={() => router.push('/parent-child-devices')}
      />

      <Tile
        icon="📚"
        title="내 공부 설정"
        hint={
          tracks.length === 0
            ? '아직 아무것도 안 골랐어요. 무엇을 하루 몇 개씩 볼지 정합니다'
            : `${tracks.join(' · ')} · 하루 ${profile?.parentStudy.newPerDay ?? 0}개`
        }
        onPress={() => router.push('/parent-plan')}
      />

      {/* 판을 누르면 이번 판에 무엇이 들어 있는지 나온다. */}
      <Pressable
        onPress={() => router.push('/whats-new')}
        accessibilityRole="button"
        accessibilityLabel="이번 판에서 바뀐 것 보기"
        style={{ marginTop: spacing.xl, alignItems: 'center' }}
      >
        <Chip label={`📱 ${buildLabel(build)} ›`} tone="default" />
        <Muted style={{ marginTop: spacing.sm, color: colors.parent }}>
          이번 판에서 바뀐 것 보기
        </Muted>
      </Pressable>
    </Screen>
  );
}

function Tile({
  icon,
  title,
  hint,
  onPress,
}: {
  icon: string;
  title: string;
  hint: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={s.tile} onPress={onPress} accessibilityRole="button">
      <Text style={s.tileIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Row style={{ gap: spacing.sm, alignItems: 'center' }}>
          <Text style={s.tileTitle}>{title}</Text>
        </Row>
        <Text style={s.tileHint}>{hint}</Text>
      </View>
      <Text style={s.chev}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  tile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  tileIcon: { fontSize: 26 },
  tileTitle: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  tileHint: { fontSize: font.small, color: colors.subtext, marginTop: 3, lineHeight: 19 },
  chev: { fontSize: 24, color: colors.muted },
});
