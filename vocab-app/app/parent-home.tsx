import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H2, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ParentRecordCards } from '../src/components/ParentRecordCards';
import { buildParentQueue, TRACK_ORDER } from '../src/srs/parentSession';
import { dailyTheme } from '../src/data/daily';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { LEVEL_SHORT, PARENT_TRACK_LABEL } from '../src/types';
import { todayKey } from '../src/lib/date';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 부모님 홈.
 *
 * 아이 홈과 통째로 갈라 둔다. 부모가 여기서 하는 일은 셋이다.
 *
 *   ① 오늘 공부하기
 *   ② 내 학습 기록 보기      ← 타일이 아니라 **그대로 펼쳐 둔다**
 *   ③ 아이들 학습 보고서
 *
 * 설정은 맨 위 오른쪽 ⚙️ 하나로 모았다. 예전에는 맨 아래에 '부모 설정'
 * 타일이 또 있어서 같은 곳으로 가는 문이 둘이었다.
 *
 * 기록을 타일 뒤에 두지 않는 이유: 부모가 홈에서 제일 먼저 보고 싶은 것이
 * 그것이다. 한 번 더 눌러야 보이면 대부분 안 누르고, 안 누르면 자기 진도를
 * 모른 채 며칠이 지나 그만두게 된다.
 *
 * 예전에는 부모님 모드가 곧 리포트 화면이었다. 부모가 자기 공부를 한다는
 * 생각이 없었기 때문인데, 그러면 부모는 앱을 아이 감시용으로만 열게 된다.
 * 자기 공부가 먼저 오는 것이 그래서 중요하다.
 */
export default function ParentHome() {
  const { state, profile, data } = useApp();

  const today = todayKey();
  const day = data.days[today];

  const queue = useMemo(
    () => (profile ? buildParentQueue({ profile, cards: data.cards, rounds: profile.settings.rounds }) : []),
    [profile, data.cards],
  );

  if (!profile) return null;

  const study = profile.parentStudy;
  const planned = new Set(queue.map((i) => i.entry.id)).size;
  const done = day?.studied ?? 0;
  const goal = day?.goal ?? planned;
  const finished = day?.completed ?? false;
  const build = buildInfo();

  // 아이들은 두 곳에서 온다 — 이 폰에 있는 아이 프로필과, QR 로 연결해
  // 리포트를 보내 오는 다른 폰의 아이들. 둘을 합쳐서 세야 실제 수가 맞는다.
  const childProfiles = state.profiles.filter((p) => p.kind === 'child');
  const remoteNames = (state.knownChildren ?? []).map((c) => c.name);
  const childCount = new Set([...childProfiles.map((p) => p.name), ...remoteNames]).size;
  const pendingRewards = state.rewards.filter((r) => r.status === 'pending').length;

  return (
    <Screen>
      <Row style={{ justifyContent: 'space-between', paddingTop: spacing.lg, alignItems: 'center' }}>
        <Pressable style={s.who} onPress={() => router.push('/profiles')} accessibilityRole="button">
          <Text style={{ fontSize: 30 }}>{profile.avatar}</Text>
          <View style={{ marginLeft: spacing.sm }}>
            <H3>{profile.name}</H3>
            <Muted>부모님 · 바꾸기</Muted>
          </View>
        </Pressable>
        {/*
          설정으로 가는 문은 **이 하나뿐**이다. 맨 아래에 '부모 설정' 타일이
          또 있었는데, 같은 곳으로 가는 문이 둘이면 서로 다른 것처럼 보인다.

          이름은 그냥 '설정'이다. 누르면 '아이들 폰 설정'과 '내 공부 설정'
          두 갈래가 나오고, 거기서 고른다. 부모가 만지는 설정은 성격이 완전히
          둘로 갈리는데(아이 쪽 / 나 자신), 한 화면에 섞으면 아이 금액을
          고치려다 내 국어 레벨을 만나게 된다.
        */}
        <Pressable
          onPress={() => router.push('/parent-settings')}
          style={s.iconBtn}
          accessibilityRole="button"
          accessibilityLabel="설정"
        >
          <Text style={s.iconBtnText}>⚙️ 설정</Text>
        </Pressable>
      </Row>

      {/* 판을 누르면 이번 판에 무엇이 들어 있는지 나온다. */}
      <Row style={{ marginTop: spacing.md }}>
        <Pressable
          onPress={() => router.push('/whats-new')}
          accessibilityRole="button"
          accessibilityLabel="이번 판에서 바뀐 것 보기"
        >
          <Chip label={`📱 ${buildLabel(build)} ›`} tone="default" />
        </Pressable>
      </Row>

      {/* ① 공부하기 */}
      <Card style={{ marginTop: spacing.lg }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H2>오늘의 공부</H2>
          <Text style={s.count}>
            {done}
            <Text style={s.countTotal}> / {goal}</Text>
          </Text>
        </Row>

        <View style={{ marginTop: spacing.md }}>
          <ProgressBar value={goal === 0 ? 0 : done / goal} />
        </View>

        {study.tracks.length === 0 ? (
          <>
            <Muted style={{ marginTop: spacing.md }}>
              아직 무엇을 공부할지 안 골랐어요. 일상 문장 · 아이들과 같은 영어 단어 ·
              국어 어휘 중에서 고르면 오늘치가 만들어집니다.
            </Muted>
            <Button
              title="무엇을 공부할지 정하기"
              variant="parent"
              onPress={() => router.push('/parent-plan')}
              style={{ marginTop: spacing.lg }}
            />
          </>
        ) : (
          <>
            <Row style={{ marginTop: spacing.md, gap: spacing.sm, flexWrap: 'wrap' }}>
              {TRACK_ORDER.filter((t) => study.tracks.includes(t)).map((t) => (
                <Chip
                  key={t}
                  label={
                    t === 'daily'
                      ? `일상 문장 · ${dailyTheme(study.dailyTheme).label}`
                      : t === 'enWord'
                        ? `영어 단어 · ${LEVEL_SHORT[profile.level]}`
                        : `국어 · ${LEVEL_SHORT[profile.koLevel]}`
                  }
                  tone="primary"
                />
              ))}
              <Chip label={`하루 ${study.newPerDay}개`} tone="accent" />
            </Row>

            {planned === 0 ? (
              <Muted style={{ marginTop: spacing.md, color: colors.correct }}>
                고른 것을 모두 익혔어요! 다른 주제나 레벨로 넘어가 보세요.
              </Muted>
            ) : null}

            <Button
              title={finished ? '한 번 더 공부하기' : '공부 시작하기'}
              variant={finished ? 'secondary' : 'parent'}
              onPress={() => router.push('/study')}
              disabled={planned === 0}
              style={{ marginTop: spacing.lg }}
            />
            {/*
              여기 '무엇을 공부할지 바꾸기' 라는 흐린 버튼이 따로 있었다.
              바로 아래 '내 학습 기록' 타일과 무엇이 다른지 알 수 없다는 말을
              들어서 없앴다. 부모가 자기 공부에 대해 하는 일은 **보는 것과
              고치는 것 둘뿐**이라 한 화면에 있으면 되고, 그 화면으로 가는
              문은 바로 아래 타일 하나면 충분하다. 같은 곳으로 가는 버튼을
              두 개 두면 서로 다른 것처럼 보여 오히려 더 헷갈린다.
            */}
          </>
        )}
      </Card>

      {/*
        ② 내 학습 기록. **타일이 아니라 그대로 편다.**

        예전에는 '내 학습 기록 및 설정' 타일 하나였는데, 부모가 홈에서 제일
        먼저 보고 싶은 것이 바로 이것이다. 한 번 더 눌러야 보이면 대부분 안
        누른다.
      */}
      <H3 style={{ marginTop: spacing.xl }}>📈 내 학습 기록</H3>
      <ParentRecordCards />

      {/* ③ 아이들 */}
      <Tile
        icon="👧"
        title="아이들 학습 보고서"
        hint={
          childCount === 0
            ? '아직 연결된 아이가 없어요. 아이 폰의 QR 을 찍어 주세요'
            : `${childCount}명 · 아이를 누르면 그 아이의 기록과 설정이 나옵니다`
        }
        badge={pendingRewards > 0 ? `동기 부여 요청권 ${pendingRewards}건` : undefined}
        onPress={() => router.push('/parent-children')}
      />
    </Screen>
  );
}

function Tile({
  icon,
  title,
  hint,
  badge,
  onPress,
}: {
  icon: string;
  title: string;
  hint: string;
  badge?: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={s.tile} onPress={onPress} accessibilityRole="button">
      <Text style={s.tileIcon}>{icon}</Text>
      <View style={{ flex: 1 }}>
        <Row style={{ gap: spacing.sm, alignItems: 'center' }}>
          <Text style={s.tileTitle}>{title}</Text>
          {badge ? <Chip label={badge} tone="accent" /> : null}
        </Row>
        <Text style={s.tileHint}>{hint}</Text>
      </View>
      <Text style={s.chev}>›</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  who: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  iconBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.parentSoft,
  },
  iconBtnText: { fontSize: 13, fontWeight: '700', color: colors.parent },
  count: { fontSize: 26, fontWeight: '800', color: colors.parent },
  countTotal: { fontSize: 16, fontWeight: '600', color: colors.muted },
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
