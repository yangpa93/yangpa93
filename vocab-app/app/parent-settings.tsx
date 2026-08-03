import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Chip, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { englishVoiceName, prepareVoice } from '../src/lib/feedback';
import { soundSummary } from '../src/lib/voice';
import { PARENT_TRACK_SHORT } from '../src/types';
import { perTrackCount, TRACK_ORDER } from '../src/srs/parentSession';
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

  /*
   * 목소리 이름은 기기 음성 목록을 다 읽어야 나온다. 앱이 뜰 때 한 번
   * 정해지지만 이 화면에 먼저 닿았을 수 있어 한 번 더 부른다(이미 정해졌으면
   * 그냥 돌아온다). 목록에 이름을 적으려면 여기서도 알아야 한다.
   */
  const [voiceName, setVoiceName] = useState(englishVoiceName() ?? '');
  useEffect(() => {
    let cancelled = false;
    void prepareVoice().then(() => {
      if (!cancelled) setVoiceName(englishVoiceName() ?? '');
    });
    return () => {
      cancelled = true;
    };
  }, [profile?.settings.voiceId]);

  const childProfiles = state.profiles.filter((p) => p.kind === 'child');
  const remoteNames = (state.knownChildren ?? []).map((c) => c.name);
  const childCount = new Set([...childProfiles.map((p) => p.name), ...remoteNames]).size;

  /*
   * 지금 무엇을 하루 몇 개씩 하기로 해 두었는지 한 줄로. 눌러 보지 않아도
   * 알 수 있게 한다. 개수를 갈래마다 붙이는 이유는 홈 카드와 같다 —
   * 숫자 하나만 떼어 두면 그것이 어느 갈래의 것인지 알 수 없다.
   */
  const per = profile ? perTrackCount(profile.parentStudy) : null;
  const tracks = per
    ? TRACK_ORDER.filter((t) => per[t] > 0).map((t) => `${PARENT_TRACK_SHORT[t]} ${per[t]}개`)
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
            : tracks.join(' · ')
        }
        onPress={() => router.push('/parent-plan')}
      />

      {/*
        소리는 세 번째 갈래로 둔다.

        "부모 설정에는 목소리를 확인하고 읽어보는 부분이 없다" — 맞는 말이었다.
        목소리 고르기는 아이 설정 화면 안에만 있었는데 부모는 거기 못 들어간다.
        부모도 일상 문장·영어 단어를 소리로 듣는데 바꿀 자리가 없었던 것이다.

        '내 공부 설정' 안에 넣을까 하다가 따로 뒀다. 그쪽은 **무엇을 몇 개**
        볼지이고 이쪽은 **어떻게 들릴지**라, 섞으면 다시 "어디 있더라"가 된다.

        지금 무엇으로 읽는지는 눌러 보지 않아도 여기 적혀 있다. 자리를 만들어
        놓고도 들어가 봐야 알 수 있으면 없는 것과 크게 다르지 않다.
      */}
      <Tile
        icon="🔊"
        title="소리와 목소리"
        hint={soundSummary({
          ttsEnabled: profile?.settings.ttsEnabled ?? true,
          voiceName: voiceName,
          speechRate: profile?.settings.speechRate,
        })}
        onPress={() => router.push('/parent-sound')}
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
