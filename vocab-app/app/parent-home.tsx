import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import {
  Body,
  Button,
  Card,
  Chip,
  H2,
  H3,
  Muted,
  ProgressBar,
  Row,
  Screen,
} from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ParentRecordCards } from '../src/components/ParentRecordCards';
import { buildParentQueue, TRACK_ORDER } from '../src/srs/parentSession';
import { dailyTheme } from '../src/data/daily';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { LEVEL_SHORT, PARENT_TRACK_SHORT as TRACK_SHORT } from '../src/types';
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

      {/*
        ① 공부하기. **아무것도 안 골랐으면 이 카드를 아예 안 띄운다.**

        예전에는 "아직 무엇을 공부할지 안 골랐어요" 라는 빈 카드와 진도 막대
        0/0 이 떠 있었다. 그런데 부모가 자기 공부를 안 하기로 한 것은 잘못이
        아니라 하나의 선택이다. 안 하기로 한 사람에게 매일 빈 카드를 보이면
        못 한 일이 남아 있는 것처럼 보이고, 정작 보러 온 아이들 보고서는
        그 아래로 밀린다.

        그래서 안 고른 부모의 홈에는 **아이들 학습 보고서만** 남는다. 나중에
        마음이 바뀌면 ⚙️ 설정 → 내 공부 설정 에서 켜면 된다 — 그 길은 카드
        아래 한 줄로만 적어 둔다.
      */}
      {study.tracks.length === 0 ? null : (
        <>
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

            {/*
              무엇을 공부하는지 **한 줄에 하나씩** 적는다.

              예전에는 `국어 · 중1-1` 처럼 갈래와 레벨을 가운뎃점으로 붙여
              칩 하나에 담았다. 그러면 '국어'와 '중1-1'이 한 덩어리로 보여,
              레벨이 갈래 이름의 일부인지 따로 고른 것인지 알 수 없다.
              갈래는 저마다 켜고 끌 수 있는 것이라 각자 한 줄을 갖는 편이 맞다.

              **국어에는 레벨을 안 적는다.** 국어 레벨 이름이 영어와 똑같아서
              (중1-1 … 고3-4) `국어  중1-1` 이라고 적으면 그 중1-1 이 영어
              것인지 국어 것인지 읽는 사람이 가릴 수가 없다. 실제로 '국어와
              하루에가 바뀐 것 같다'는 말을 들었다. 레벨이 뜻을 갖는 것은
              **아이들과 같은 영어 단어** 한 갈래뿐이다 — 아이가 지금 보는
              그 레벨을 맞춰 두는 것이라 숫자가 곧 의미가 된다.
              국어 레벨은 ⚙️ 설정 → 내 공부 설정 에서 그대로 고른다.
            */}
            <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
              {TRACK_ORDER.filter((t) => study.tracks.includes(t)).map((t) => {
                const where =
                  t === 'daily'
                    ? dailyTheme(study.dailyTheme).label
                    : t === 'enWord'
                      ? LEVEL_SHORT[profile.level]
                      : null;
                return (
                  <Row key={t} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <Body style={{ fontWeight: '700' }}>{TRACK_SHORT[t]}</Body>
                    {where ? <Chip label={where} tone="primary" /> : null}
                  </Row>
                );
              })}
              <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Body style={{ fontWeight: '700' }}>하루에</Body>
                <Chip label={`${study.newPerDay}개`} tone="accent" />
              </Row>
            </View>

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
          </Card>

          {/*
            ② 내 학습 기록. **타일이 아니라 그대로 편다.**

            부모가 홈에서 제일 먼저 보고 싶은 것이 이것이다. 한 번 더 눌러야
            보이면 대부분 안 누른다. 공부를 안 하기로 한 부모에게는 기록도
            뜻이 없으므로 공부 카드와 함께 사라진다.
          */}
          <H3 style={{ marginTop: spacing.xl }}>📈 내 학습 기록</H3>
          <ParentRecordCards />
        </>
      )}

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

      {/*
        공부를 안 고른 부모에게 남기는 한 줄. 카드가 아니라 한 줄인 이유는
        위에 적었다 — 안 하기로 한 것은 잘못이 아니라서 매일 권하지 않는다.
        다만 길이 아예 없으면 마음이 바뀌었을 때 찾지 못한다.
      */}
      {study.tracks.length === 0 ? (
        <Muted style={{ marginTop: spacing.xl, textAlign: 'center' }}>
          부모님도 공부하고 싶으시면 ⚙️ 설정 → 내 공부 설정 에서 켜실 수 있어요.
        </Muted>
      ) : null}
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
