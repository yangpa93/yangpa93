import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { isValidPushToken } from '../src/features/push';
import { colors, spacing } from '../src/theme';

/**
 * 부모님 폰이 보낸 연결 링크(`urivocab://link?token=...`)를 처리한다.
 *
 * 바로 연결해 버리지 않고 한 번 확인을 받는다. 부모님이 자기 폰에서
 * 실수로 링크를 누르면 자기 자신과 연결되어 버리기 때문이다.
 */
export default function LinkScreen() {
  const { state, linkParent, setRole } = useApp();
  const params = useLocalSearchParams<{ token?: string; label?: string }>();
  const [done, setDone] = useState(false);

  const token = (params.token ?? '').trim();
  const label = (params.label ?? '부모님 폰').trim();

  const valid = isValidPushToken(token);
  const isSelf = state.myPushToken != null && state.myPushToken === token;

  function confirm() {
    linkParent({ token, label, linkedAt: Date.now(), lastSentDate: null });
    // 링크를 받은 기기는 아이 기기다.
    if (state.role !== 'child') setRole('child');
    setDone(true);
  }

  if (done) {
    return (
      <Screen scroll={false}>
        <View style={s.center}>
          <Text style={s.emoji}>✅</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>연결됐어요!</H1>
          <Body style={{ marginTop: spacing.md, textAlign: 'center', color: colors.subtext }}>
            이제 학습을 마칠 때마다{'\n'}
            <Text style={{ fontWeight: '700' }}>{label}</Text>으로 결과가 바로 갑니다.
          </Body>
          <Button
            title="홈으로"
            onPress={() => router.replace('/home')}
            style={{ marginTop: spacing.xl, width: '100%' }}
          />
        </View>
      </Screen>
    );
  }

  if (!valid) {
    return (
      <Screen scroll={false}>
        <View style={s.center}>
          <Text style={s.emoji}>⚠️</Text>
          <H1 style={{ marginTop: spacing.lg, textAlign: 'center' }}>연결할 수 없어요</H1>
          <Body style={{ marginTop: spacing.md, textAlign: 'center', color: colors.subtext }}>
            링크가 깨졌거나 오래된 것 같습니다.{'\n'}부모님 폰에서 링크를 다시 보내 주세요.
          </Body>
          <Button
            title="홈으로"
            onPress={() => router.replace('/home')}
            style={{ marginTop: spacing.xl, width: '100%' }}
          />
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      <View style={{ paddingTop: spacing.xl }}>
        <Text style={s.emoji}>🔗</Text>
        <H1 style={{ marginTop: spacing.md }}>부모님 폰과 연결할까요?</H1>
        <Muted style={{ marginTop: spacing.sm }}>
          이 기기에서 학습을 마칠 때마다 아래 폰으로 결과가 전송됩니다.
        </Muted>
      </View>

      <Card style={{ marginTop: spacing.xl }}>
        <H3>{label}</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          지금 이 기기는 <Text style={{ fontWeight: '700' }}>아이가 공부하는 기기</Text>로 설정됩니다.
        </Muted>
      </Card>

      {isSelf ? (
        <Card style={{ marginTop: spacing.md, borderColor: colors.wrong }}>
          <H3 style={{ color: colors.wrong }}>잠깐요</H3>
          <Muted style={{ marginTop: spacing.sm }}>
            이 링크는 <Text style={{ fontWeight: '700' }}>이 기기가 직접 만든 것</Text>입니다.
            부모님 폰에서 누르신 것 같아요. 링크는 아이 기기에서 눌러야 합니다.
          </Muted>
        </Card>
      ) : null}

      <Button
        title="네, 연결할게요"
        onPress={confirm}
        variant={isSelf ? 'secondary' : 'primary'}
        style={{ marginTop: spacing.xl }}
      />
      <Button
        title="아니요"
        variant="ghost"
        onPress={() => router.replace('/home')}
        style={{ marginTop: spacing.sm }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  emoji: { fontSize: 52 },
});
