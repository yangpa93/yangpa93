import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H2, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { buildParentQueue, TRACK_ORDER } from '../src/srs/parentSession';
import { dailyTheme } from '../src/data/daily';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { LEVEL_SHORT, PARENT_TRACK_LABEL } from '../src/types';
import { todayKey } from '../src/lib/date';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 부모님 홈.
 *
 * 아이 홈과 통째로 갈라 둔다. 부모가 여기서 하는 일은 넷이고, 그 넷이
 * 그대로 화면이 된다.
 *
 *   공부하기 · 내 학습 기록 · 아이들 보고서와 설정 · 부모 설정
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
        <Chip label={`📱 ${buildLabel(build)}`} tone="default" />
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
            <Button
              title="무엇을 공부할지 바꾸기"
              variant="ghost"
              onPress={() => router.push('/parent-plan')}
              style={{ marginTop: spacing.sm }}
            />
          </>
        )}
      </Card>

      {/* ②③④ 나머지 셋 */}
      <Tile
        icon="📈"
        title="내 학습 기록"
        hint="며칠 연속으로 했는지, 무엇을 얼마나 익혔는지"
        onPress={() => router.push('/parent-record')}
      />
      <Tile
        icon="👧"
        title="아이들 학습 보고서"
        hint={
          childCount === 0
            ? '아직 연결된 아이가 없어요. 아이 폰의 QR 을 찍어 주세요'
            : `${childCount}명 · 아이를 누르면 그 아이의 기록과 설정이 나옵니다`
        }
        badge={pendingRewards > 0 ? `요구권 ${pendingRewards}건` : undefined}
        onPress={() => router.push('/parent-children')}
      />
      <Tile
        icon="⚙️"
        title="부모 설정"
        hint="알림 시각 · 아이 기기 연결 · PIN · 백업"
        onPress={() => router.push('/parent-settings')}
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
