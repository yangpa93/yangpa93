import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Card, Chip, H1, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { levelProgress, nextLevel } from '../src/srs/progress';
import { notifyNow } from '../src/features/notifications';
import {
  Award,
  availableAwards,
  awardRates,
  formatWon,
  levelPace,
  levelStartedAt,
} from '../src/features/awards';
import { LEVEL_LABEL, LEVEL_SHORT } from '../src/types';
import { colors, radius, spacing } from '../src/theme';

/**
 * 레벨업 축하 + 동기 부여 요청권 신청.
 *
 * 두 단계다.
 *  1) 레벨업 조건을 채웠으면 축하하고 시험으로 보낸다.
 *  2) 통과한 뒤에는 얻은 동기 부여 요청권을 부모님께 신청한다.
 *
 * 갖고 싶은 것을 적어 보내는 방식이 아니라 **금액이 정해진 동기 부여 요청권**이다.
 * 조건과 금액이 미리 정해져 있어서 아이는 얼마가 걸려 있는지 알고 공부하고,
 * 부모는 매번 협상하지 않아도 된다.
 */
export default function LevelUp() {
  const { state, profile, data, requestReward } = useApp();

  const progress = useMemo(
    () => (profile ? levelProgress(ALL_ENTRIES, data.cards, profile.level) : null),
    [profile, data.cards],
  );

  const lastExam = data.exams.find((e) => e.level === profile?.level) ?? null;

  /*
    null 이면 "아이가 아직 손대지 않았다"는 뜻이고, 그때는 아래에서 만든
    추천 문장을 그대로 쓴다. 빈 문자열('')과 구별해야 한다 — 아이가 일부러
    지운 것을 추천 문장으로 되돌리면 안 되기 때문이다.
  */
  const [note, setNote] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  /** 추가 요구를 켰는지. null이면 아직 안 건드림 */
  const [askBonus, setAskBonus] = useState<boolean | null>(null);
  const [bonusReason, setBonusReason] = useState<string | null>(null);

  const rates = awardRates(state.parent.awards);

  // 지난 신청 기록을 함께 넘긴다 — 하루치와 달 정산이 이것으로 중복을 가린다.
  const myRewards = useMemo(
    () => (profile ? state.rewards.filter((r) => r.profileId === profile.id) : []),
    [state.rewards, profile],
  );
  const awards = useMemo(
    () => (profile ? availableAwards(profile, data, undefined, rates, myRewards) : []),
    [profile, data, myRewards, rates.middleLevel, rates.highLevel, rates.dailyDone],
  );

  /** 방금 통과한 시험 기록. 아이가 부모님께 알릴 성적이 여기 있다. */
  const passedExam = useMemo(() => {
    const level = awards[0]?.earnedFrom;
    if (!level) return null;
    return data.exams.find((e) => e.level === level && e.passed) ?? null;
  }, [awards, data.exams]);

  /**
   * 계획보다 며칠 빨리 끝냈는지.
   *
   * 하루 새 단어 수는 아이가 고른 값이다. 스스로 정한 속도보다 앞당겼을
   * 때만 "빨리 했다"고 말할 수 있다.
   */
  const pace = useMemo(() => {
    const level = awards[0]?.earnedFrom;
    if (!level || !profile) return null;
    const ids = entriesOf(level).map((e) => e.id);
    return levelPace({
      totalWords: ids.length,
      newPerDay: profile.settings.newPerDay,
      startedAt: levelStartedAt(ids, data.cards),
      clearedAt: passedExam?.at ?? null,
    });
  }, [awards, profile, data.cards, passedExam]);

  const bounce = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 600, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 600, easing: Easing.in(Easing.quad), useNativeDriver: true }),
      ]),
    ).start();
  }, [bounce]);

  if (!profile || !progress) return null;

  const canRequest = awards.length > 0;
  const upcoming = nextLevel(profile.level);

  // 1단계: 시험을 볼 수 있게 됐지만 아직 안 본 상태
  if (progress.canTakeExam && upcoming) {
    return (
      <SafeAreaView style={s.screen}>
        <View style={s.center}>
          <Animated.Text
            style={[
              s.emoji,
              { transform: [{ translateY: bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -14] }) }] },
            ]}
          >
            🎊
          </Animated.Text>
          <H1 style={{ textAlign: 'center', marginTop: spacing.lg }}>
            {LEVEL_SHORT[profile.level]} 레벨 시험
          </H1>
          <Body style={{ textAlign: 'center', marginTop: spacing.md, color: colors.subtext }}>
            {progress.mastered}개 단어를 완전히 외웠어요.{'\n'}이제 마지막 시험만 통과하면 {LEVEL_LABEL[upcoming]}이에요.
          </Body>

          <Card style={{ marginTop: spacing.xl, width: '100%', backgroundColor: colors.accentSoft, borderColor: colors.accent }}>
            <H3 style={{ textAlign: 'center' }}>🏆 통과 조건</H3>
            <Muted style={{ textAlign: 'center', marginTop: spacing.sm }}>
              {LEVEL_SHORT[profile.level]} 단어 <Text style={{ fontWeight: '800' }}>{progress.total}개를 하나도 빠짐없이</Text> 맞혀야 해요.
              {'\n'}뜻이 여러 개인 단어는 뜻마다 한 문제씩 나와요.
              {'\n\n'}틀려도 괜찮아요. 틀린 문제는 끝나고 다시 나오고,
              전부 맞히면 통과예요.
            </Muted>
          </Card>

          {lastExam ? (
            <Muted style={{ marginTop: spacing.lg, textAlign: 'center' }}>
              지난 시험: {lastExam.firstTryCorrect}/{lastExam.total} 한 번에 맞힘
            </Muted>
          ) : null}

          <Button
            title="시험 시작하기"
            onPress={() => router.replace('/exam')}
            style={{ marginTop: spacing.xl, width: '100%' }}
          />
          <Button
            title="조금 더 복습할래요"
            variant="ghost"
            onPress={() => router.replace('/home')}
            style={{ marginTop: spacing.sm, width: '100%' }}
          />
        </View>
      </SafeAreaView>
    );
  }

  // 2단계: 얻은 동기 부여 요청권을 부모님께 신청
  if (canRequest && !sent) {
    const award: Award = awards[0];
    const bonusAmount = rates.bonus;
    const isLevelUp = award.kind === 'levelup';

    /*
      계획보다 앞당겼으면 추가 요구를 미리 켜 두고 이유까지 채워 둔다.
      아이가 스스로 근거를 만들어 낼 필요가 없다 — 앱이 이미 아는 사실이고,
      그대로 두면 아이가 자기 성과를 말할 기회를 놓친다. 물론 고쳐 쓰거나
      끌 수 있다.
    */
    const wentFaster = pace?.faster ?? false;
    const wantBonus = askBonus ?? wentFaster;
    const bonus = wantBonus ? bonusAmount : 0;
    const total = award.amount + bonus;

    // 아이가 부모님께 보낼 말. 통과한 성적을 그대로 적어 둔다.
    const suggestedNote = isLevelUp
      ? passedExam
        ? `${LEVEL_SHORT[award.earnedFrom!]} 시험에 통과했어요! ${passedExam.total}문제를 다 맞혔어요.`
        : `${LEVEL_SHORT[award.earnedFrom!]} 시험에 통과했어요!`
      : award.kind === 'dailyDone'
        ? '오늘 공부를 다 마쳤어요!'
        : award.kind === 'monthlyPurse'
          ? `${Number((award.month ?? '').slice(5))}월에 모은 것을 받고 싶어요.`
          : `${Number((award.month ?? '').slice(5))}월 한 달 동안 하루도 안 빠지고 공부했어요!`;

    const suggestedBonusReason =
      wentFaster && pace
        ? `계획보다 ${pace.daysAhead}일 빨리 끝냈어요. ` +
          `하루 ${profile.settings.newPerDay}개씩 ${pace.plannedDays}일 걸릴 걸 ${pace.actualDays}일에 했어요.`
        : '';

    const shownNote = note ?? suggestedNote;
    const shownBonusReason = bonusReason ?? suggestedBonusReason;

    return (
      <Screen>
        <View style={{ paddingTop: spacing.xl }}>
          <Text style={{ fontSize: 52 }}>
            {isLevelUp ? '🏆' : award.kind === 'dailyDone' ? '📗' : award.kind === 'monthlyPurse' ? '🗓️' : '🎟️'}
          </Text>
          <H1 style={{ marginTop: spacing.md }}>
            {isLevelUp
              ? '시험에 통과했어요!'
              : award.kind === 'dailyDone'
                ? '오늘 공부를 다 했어요!'
                : award.kind === 'monthlyPurse'
                  ? '한 달치가 모였어요!'
                  : '동기 부여 요청권을 얻었어요!'}
          </H1>
          <Muted style={{ marginTop: spacing.sm }}>{award.reason}</Muted>
        </View>

        {/* 방금 낸 성적. 부모님께 보낼 말에 그대로 들어간다. */}
        {isLevelUp && passedExam ? (
          <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
            <Chip label={`${passedExam.total}문제 전부 정답`} tone="correct" />
            {passedExam.retries === 0 ? (
              <Chip label="한 번에 다 맞힘" tone="accent" />
            ) : (
              <Chip label={`한 번에 ${passedExam.firstTryCorrect}개`} tone="default" />
            )}
            {pace?.actualDays != null ? (
              <Chip label={`${pace.actualDays}일 걸림`} tone="default" />
            ) : null}
          </Row>
        ) : null}

        <Card
          style={{
            marginTop: spacing.xl,
            backgroundColor: colors.accentSoft,
            borderColor: colors.accent,
            alignItems: 'center',
          }}
        >
          <Chip
            label={
              award.kind === 'levelup'
                ? `${LEVEL_SHORT[award.earnedFrom!]} 완료`
                : award.kind === 'dailyDone'
                  ? '오늘 공부 끝'
                  : award.kind === 'monthlyPurse'
                    ? `${Number((award.month ?? '').slice(5))}월치 모아 받기`
                    : '한 달 개근'
            }
            tone="accent"
          />
          <Text style={s.amount}>{formatWon(total)}</Text>
          <Muted>
            {bonus > 0 ? `기본 ${formatWon(award.amount)} + 더 요구 ${formatWon(bonus)}` : '동기 부여 요청권'}
          </Muted>
        </Card>

        {awards.length > 1 ? (
          <Muted style={{ marginTop: spacing.md, textAlign: 'center' }}>
            신청할 수 있는 동기 부여 요청권이 {awards.length}장 있어요. 하나씩 보내면 돼요.
          </Muted>
        ) : null}

        {/*
          '정말 잘했어요' 추가 요구.
          얼마든 부르는 방식이 아니라 부모님이 정한 한 칸만 올릴 수 있다.
          매번 금액을 흥정하지 않게 하려는 동기 부여 요청권의 취지를 지키면서도,
          아이가 스스로 잘했다고 말할 자리를 만들어 주는 것.
        */}
        {bonusAmount > 0 ? (
          <Pressable
            onPress={() => setAskBonus(!wantBonus)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: wantBonus }}
            style={[s.bonusBox, wantBonus && s.bonusBoxOn]}
          >
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1, paddingRight: spacing.md }}>
                <Text style={s.bonusTitle}>
                  {wantBonus ? '⭐️' : '☆'}{' '}
                  {wentFaster ? `계획보다 ${pace!.daysAhead}일 빨리 끝냈어요` : '이번엔 정말 잘했어요'}
                </Text>
                <Muted style={{ marginTop: 2 }}>
                  {formatWon(bonusAmount)}을 더 요구할래요. 부모님이 보고 정해요.
                </Muted>
              </View>
              <Text style={[s.bonusPlus, wantBonus && { color: '#B45309' }]}>
                +{formatWon(bonusAmount)}
              </Text>
            </Row>
          </Pressable>
        ) : null}

        {wantBonus ? (
          <Card style={{ marginTop: spacing.md, borderColor: colors.accent }}>
            <H3>왜 더 받을 만한지 알려 주세요</H3>
            <Muted style={{ marginTop: spacing.xs }}>
              부모님이 이 글을 보고 정합니다. 안 적으면 그냥 기본 금액으로 가요.
            </Muted>
            <TextInput
              value={shownBonusReason}
              onChangeText={setBonusReason}
              placeholder="예) 시험을 한 번에 다 맞혔고, 이번 달은 하루도 안 빠졌어요."
              placeholderTextColor={colors.muted}
              style={[s.input, { height: 92, textAlignVertical: 'top' }]}
              multiline
              maxLength={200}
            />
          </Card>
        ) : null}

        {/*
          아이가 자기 입으로 알리는 자리. 통과한 성적으로 미리 채워 둔다.
          빈칸으로 두면 대부분 그냥 보내 버려서, 정작 기분 좋은 소식이
          부모에게는 금액만 적힌 알림으로 도착한다.
        */}
        <Card style={{ marginTop: spacing.lg }}>
          <H3>부모님께 하고 싶은 말</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            미리 적어 뒀어요. 고쳐 써도 되고 더 붙여도 돼요.
          </Muted>
          <TextInput
            value={shownNote}
            onChangeText={setNote}
            placeholder="예) 두 달 동안 하루도 안 빠지고 했어요!"
            placeholderTextColor={colors.muted}
            style={[s.input, { height: 92, textAlignVertical: 'top' }]}
            multiline
            maxLength={200}
          />
        </Card>

        <Button
          title={`${formatWon(total)} 요구하기`}
          onPress={async () => {
            requestReward(award, shownNote, bonus, shownBonusReason);
            setSent(true);
            await notifyNow(
              isLevelUp ? '🏆 시험에 통과했어요!' : '🎟️ 동기 부여 요청권 신청이 도착했어요',
              `${profile.name} · ${shownNote.trim() || award.reason} — ${formatWon(total)}` +
                (bonus > 0 ? ` (기본 ${formatWon(award.amount)} + 더 요구 ${formatWon(bonus)})` : ''),
            ).catch(() => {});
          }}
          style={{ marginTop: spacing.xl }}
        />
        <Button title="나중에 하기" variant="ghost" onPress={() => router.replace('/home')} style={{ marginTop: spacing.sm }} />
      </Screen>
    );
  }

  // 보냈거나, 요청할 게 없는 경우
  return (
    <SafeAreaView style={s.screen}>
      <View style={s.center}>
        <Text style={s.emoji}>{sent ? '📬' : '📘'}</Text>
        <H1 style={{ textAlign: 'center', marginTop: spacing.lg }}>
          {sent ? '부모님께 보냈어요!' : '조금만 더 힘내요'}
        </H1>
        <Body style={{ textAlign: 'center', marginTop: spacing.md, color: colors.subtext }}>
          {sent
            ? '부모님이 확인하면 홈 화면에서 결과를 볼 수 있어요.'
            : `${LEVEL_SHORT[profile.level]} 단어를 ${progress.remaining}개 더 외우면 레벨 시험을 볼 수 있어요.`}
        </Body>
        {sent && awards.length > 1 ? (
          <Button
            title="다음 동기 부여 요청권도 신청하기"
            variant="secondary"
            onPress={() => {
              // null 로 되돌려야 다음 동기 부여 요청권에 맞는 추천 문장이 다시 채워진다.
              setNote(null);
              setBonusReason(null);
              setAskBonus(null);
              setSent(false);
            }}
            style={{ marginTop: spacing.lg, width: '100%' }}
          />
        ) : null}
        <Button title="홈으로" onPress={() => router.replace('/home')} style={{ marginTop: spacing.xl, width: '100%' }} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  emoji: { fontSize: 64 },
  amount: { fontSize: 44, fontWeight: '800', color: '#B45309', marginTop: spacing.sm },
  bonusBox: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  bonusBoxOn: { borderColor: colors.accent, backgroundColor: colors.accentSoft },
  bonusTitle: { fontSize: 16, fontWeight: '800', color: colors.text },
  bonusPlus: { fontSize: 20, fontWeight: '800', color: colors.muted },
  input: {
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.bg,
  },
});
