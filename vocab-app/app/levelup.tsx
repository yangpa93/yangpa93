import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { levelProgress, nextLevel } from '../src/srs/progress';
import { notifyNow } from '../src/features/notifications';
import { LEVEL_LABEL, LEVEL_SHORT } from '../src/types';
import { colors, radius, spacing } from '../src/theme';

/**
 * 레벨업 축하 + 보상 요청.
 *
 * 두 단계다.
 *  1) 레벨업 조건을 채웠으면 축하하고 다음 학년으로 올린다.
 *  2) 올라간 뒤에는 갖고 싶은 것을 적어 부모님께 보낸다.
 */
export default function LevelUp() {
  const { profile, data, requestReward } = useApp();

  const progress = useMemo(
    () => (profile ? levelProgress(ALL_ENTRIES, data.cards, profile.level) : null),
    [profile, data.cards],
  );

  const lastExam = data.exams.find((e) => e.level === profile?.level) ?? null;

  const [wish, setWish] = useState('');
  const [note, setNote] = useState('');
  const [sent, setSent] = useState(false);

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

  const canRequest = profile.pendingLevelUps.length > 0;
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

  // 2단계: 보상 요청서 작성
  if (canRequest && !sent) {
    const earnedFrom = profile.pendingLevelUps[0];
    return (
      <Screen>
        <View style={{ paddingTop: spacing.xl }}>
          <Text style={{ fontSize: 52 }}>🎁</Text>
          <H1 style={{ marginTop: spacing.md }}>보상 요청하기</H1>
          <Muted style={{ marginTop: spacing.sm }}>
            {LEVEL_SHORT[earnedFrom]} 단어를 모두 익힌 상으로, 갖고 싶은 것을 부모님께 말해 보세요.
          </Muted>
        </View>

        <Card style={{ marginTop: spacing.xl }}>
          <H3>갖고 싶은 것</H3>
          <TextInput
            value={wish}
            onChangeText={setWish}
            placeholder="예) 레고 세트, 친구랑 영화 보기"
            placeholderTextColor={colors.muted}
            style={s.input}
            maxLength={40}
          />

          <H3 style={{ marginTop: spacing.lg }}>하고 싶은 말 (선택)</H3>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="예) 두 달 동안 하루도 안 빠지고 했어요!"
            placeholderTextColor={colors.muted}
            style={[s.input, { height: 92, textAlignVertical: 'top' }]}
            multiline
            maxLength={200}
          />
        </Card>

        <Button
          title="부모님께 보내기"
          onPress={async () => {
            requestReward(wish, note);
            setSent(true);
            await notifyNow(
              '🎁 보상 요청이 도착했어요',
              `${profile.name} · ${LEVEL_SHORT[earnedFrom]} 완료 — "${wish.trim()}"`,
            ).catch(() => {});
          }}
          disabled={wish.trim().length === 0}
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
        <Button title="홈으로" onPress={() => router.replace('/home')} style={{ marginTop: spacing.xl, width: '100%' }} />
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  emoji: { fontSize: 64 },
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
