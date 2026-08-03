import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H2, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { NewWordsCard } from '../src/components/NewWordsCard';
import { VersionButton } from '../src/components/VersionButton';
import { ParentRecordCards } from '../src/components/ParentRecordCards';
import { buildParentQueue, perTrackCount, TRACK_ORDER } from '../src/srs/parentSession';
import { buildInfo, buildLabel } from '../src/features/build-info';
import { PARENT_TRACK_SHORT as TRACK_SHORT } from '../src/types';
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
  // 갈래마다 오늘 몇 개인지. 안 켠 갈래는 0 이라 화면에서 걸러진다.
  const per = perTrackCount(study);

  // 아이들은 두 곳에서 온다 — 이 폰에 있는 아이 프로필과, QR 로 연결해
  // 리포트를 보내 오는 다른 폰의 아이들. 둘을 합쳐서 세야 실제 수가 맞는다.
  const childProfiles = state.profiles.filter((p) => p.kind === 'child');
  const remoteNames = (state.knownChildren ?? []).map((c) => c.name);
  const childCount = new Set([...childProfiles.map((p) => p.name), ...remoteNames]).size;
  const pendingRewards = state.rewards.filter((r) => r.status === 'pending').length;

  return (
    <Screen>
      {/* 새 낱말이 왔으면 맨 위에서 한 번 말해 준다. 부모도 같은 낱말을 쓴다. */}
      <NewWordsCard />

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
              **갈래마다 개수를 붙여 한 칩에 담는다.**

              이 카드는 여러 번 고쳤다. `국어 · 중1-1` 처럼 갈래와 레벨을
              붙였다가, 갈래마다 한 줄씩 두고 오른쪽에 레벨을 적었다가,
              레벨을 빼고 '하루에 10개' 한 줄과 갈래 이름만 남겼다.

              마지막 것도 물음을 받았다 — "하루에 10개가 일상 문장 10개인가?"
              아니었다. 그때는 셋이 나눠 갖는 합계였고(4/3/3), 화면만 보고는
              가릴 방법이 없었다. 그래서 설정 자체를 갈래별로 바꿨다
              (ParentStudy.perTrack). 이제 숫자가 자기 뜻을 스스로 말한다.

                [일상 문장 5개] [영어 단어 5개] [국어 5개]

              레벨과 주제는 여기 안 적는다. 고르는 자리(⚙️ 설정 → 내 공부 설정)와
              진도를 보는 자리('무엇을 얼마나 익혔나')에 그대로 있고, 거기서는
              갈래 이름이 길게 다 적혀 있어 무엇의 레벨인지 헷갈리지 않는다.
            */}
            <Row style={{ marginTop: spacing.md, gap: spacing.sm, flexWrap: 'wrap' }}>
              {TRACK_ORDER.filter((t) => per[t] > 0).map((t) => (
                <Chip key={t} label={`${TRACK_SHORT[t]} ${per[t]}개`} tone="primary" />
              ))}
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
          </Card>

          {/*
            ② 내 학습 기록. **타일이 아니라 그대로 편다.**

            부모가 홈에서 제일 먼저 보고 싶은 것이 이것이다. 한 번 더 눌러야
            보이면 대부분 안 누른다. 공부를 안 하기로 한 부모에게는 기록도
            뜻이 없으므로 공부 카드와 함께 사라진다.
          */}
          <H3 style={{ marginTop: spacing.xl }}>📈 내 학습 기록</H3>
          <ParentRecordCards />

          {/*
            ③ 오답 노트와 단어장. **부모 화면에는 아예 없었다.**

            아이 홈에는 처음부터 있었는데 부모 홈에는 빠져 있었다. 부모도 똑같이
            문제를 풀고 똑같이 틀리는데 되짚어 볼 자리가 없었던 것이다. 공부를
            안 하기로 한 부모에게는 뜻이 없으므로 공부 카드와 함께 사라진다.
          */}
          <Row style={{ marginTop: spacing.lg, gap: spacing.sm }}>
            <Pressable
              style={s.half}
              onPress={() => router.push('/mistakes')}
              accessibilityRole="button"
            >
              <Text style={s.halfIcon}>📕</Text>
              <Text style={s.halfTitle}>오답 노트</Text>
              <Text style={s.halfHint}>오늘 틀린 것부터</Text>
            </Pressable>
            <Pressable
              style={s.half}
              onPress={() => router.push('/wordbook')}
              accessibilityRole="button"
            >
              <Text style={s.halfIcon}>📗</Text>
              <Text style={s.halfTitle}>단어장</Text>
              <Text style={s.halfHint}>오늘 배운 것부터</Text>
            </Pressable>
          </Row>
        </>
      )}

      {/* ④ 아이들 */}
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

      {/* 판 번호는 맨 아래에 작게. 늘 보여야 하지만 제일 중요한 것은 아니다. */}
      <VersionButton tone="parent" style={{ marginTop: spacing.xl }} />
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
  /*
   * 오답 노트 · 단어장은 나란히 둘로. 아이 홈과 같은 모양이라 부모가 아이
   * 폰을 봐 줄 때 같은 곳을 찾는다.
   */
  half: {
    flex: 1,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  halfIcon: { fontSize: 24 },
  halfTitle: { fontSize: font.body, fontWeight: '800', color: colors.text, marginTop: spacing.xs },
  halfHint: { fontSize: font.tiny, color: colors.subtext, marginTop: 2 },
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
