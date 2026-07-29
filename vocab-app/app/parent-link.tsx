import { useCallback, useState } from 'react';
import {Alert, Share, StyleSheet, Text, TextInput, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Body, Button, Card, Chip, H1, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { buildLinkUrl, fetchPushToken, isValidPushToken } from '../src/features/push';
import { formatKo } from '../src/lib/date';
import { colors, radius, spacing } from '../src/theme';
import { APP_NAME } from '../src/features/build-info';

/**
 * 부모님 폰과 아이 기기를 연결하는 화면.
 *
 * 기기 역할에 따라 보이는 내용이 다르다.
 *  - 부모님 폰: 자기 푸시 주소를 만들어 아이 기기로 보낸다.
 *  - 아이 기기: 받은 주소를 붙여넣어 연결한다.
 *
 * QR 스캔 대신 '링크 보내기'와 '붙여넣기'를 쓴다. 카메라 권한을 요구하지
 * 않기 위해서다. 링크는 카카오톡으로 아이 기기에 보내고 한 번 누르면 된다.
 */
export default function ParentLinkScreen() {
  const { state, setRole, setMyPushToken, unlinkParent, linkParent, pushReportNow } = useApp();
  const isParentDevice = state.role === 'parent';

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [pasted, setPasted] = useState('');
  const [label, setLabel] = useState('');
  const [sendResult, setSendResult] = useState('');

  // 부모 기기면 화면에 들어올 때마다 토큰이 살아 있는지 확인한다.
  useFocusEffect(
    useCallback(() => {
      if (!isParentDevice || state.myPushToken) return;
      let cancelled = false;
      (async () => {
        const { token, reason } = await fetchPushToken();
        if (cancelled) return;
        if (token) setMyPushToken(token);
        else setError(reason ?? '');
      })();
      return () => {
        cancelled = true;
      };
    }, [isParentDevice, state.myPushToken, setMyPushToken]),
  );

  /**
   * 이 기기를 부모님 전용으로 바꾼다.
   *
   * **아이가 쓰던 기기에서 이걸 누르면 그 기기의 학습 화면이 통째로
   * 사라진다.** 부모님은 설정을 만지려고 아이 폰에서도 부모님 모드에
   * 들어오기 때문에, 아무 확인 없이 두면 실수로 누르기 딱 좋다.
   * 기록이 지워지지는 않지만, 되돌리는 길을 모르면 앱이 고장 난 줄 안다.
   *
   * 그래서 아이가 등록된 기기에서는 무엇이 일어나는지 이름까지 대며
   * 한 번 더 묻는다.
   */
  async function becomeParentDevice() {
    const kids = state.profiles.map((p) => p.name).join(', ');

    if (state.profiles.length > 0) {
      const ok = await new Promise<boolean>((resolve) => {
        Alert.alert(
          '이 기기는 아이가 쓰던 기기예요',
          `${kids}의 학습 화면이 이 기기에서 사라지고, 앱을 켜면 리포트만 보입니다.\n\n` +
            '학습 기록은 지워지지 않고, 나중에 되돌릴 수 있어요. ' +
            '그래도 아이가 쓰는 기기라면 여기서 누르면 안 됩니다.\n\n' +
            '부모님이 따로 쓰시는 폰에서 눌러 주세요.',
          [
            { text: '취소', style: 'cancel', onPress: () => resolve(false) },
            { text: '그래도 바꾸기', style: 'destructive', onPress: () => resolve(true) },
          ],
        );
      });
      if (!ok) return;
    }

    setBusy(true);
    setError('');
    const { token, reason } = await fetchPushToken();
    setBusy(false);
    if (!token) {
      setError(reason ?? '푸시 주소를 만들지 못했습니다.');
      return;
    }
    setMyPushToken(token);
    setRole('parent');
  }

  async function shareLink() {
    if (!state.myPushToken) return;
    const name = label.trim() || '부모님 폰';
    const url = buildLinkUrl(state.myPushToken, name);
    await Share.share({
      message:
        `[${APP_NAME}] ${name} 연결하기\n\n` +
        `아이 기기에서 아래 링크를 눌러 주세요.\n${url}\n\n` +
        `링크가 안 열리면 아래 주소를 복사해서\n아이 기기 → 부모님 모드 → 부모님 폰 연결 → 붙여넣기 하세요.\n\n${state.myPushToken}`,
    }).catch(() => {});
  }

  function linkByPaste() {
    const token = pasted.trim();
    setError('');
    if (!isValidPushToken(token)) {
      setError('주소 형식이 올바르지 않습니다. 부모님 폰에서 보낸 주소를 그대로 붙여넣어 주세요.');
      return;
    }
    linkParent({
      token,
      label: label.trim() || '부모님 폰',
      linkedAt: Date.now(),
      lastSentDate: null,
    });
    setPasted('');
  }

  async function testSend() {
    setBusy(true);
    setSendResult('');
    const res = await pushReportNow();
    setBusy(false);
    setSendResult(res.ok ? '보냈습니다! 부모님 폰을 확인해 보세요.' : (res.error ?? '실패했습니다.'));
  }

  /* ---------------- 부모님 폰 ---------------- */

  if (isParentDevice) {
    return (
      <Screen>
        <View style={{ paddingTop: spacing.lg }}>
          <Text style={{ fontSize: 44 }}>📲</Text>
          <H1 style={{ marginTop: spacing.md }}>부모님 폰</H1>
          <Muted style={{ marginTop: spacing.sm }}>
            이 기기는 리포트를 받기만 합니다. 아이 기기에서 학습이 끝나면 알림이 옵니다.
          </Muted>
        </View>

        <Card style={{ marginTop: spacing.lg }}>
          <H3>이 폰의 이름</H3>
          <Muted style={{ marginTop: spacing.xs }}>아이 기기에 이 이름으로 표시됩니다.</Muted>
          <TextInput
            value={label}
            onChangeText={setLabel}
            placeholder="예) 엄마 폰"
            placeholderTextColor={colors.muted}
            style={s.input}
            maxLength={20}
          />
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <H3>아이 기기에 연결하기</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            아이가 여럿이면 기기마다 한 번씩 연결해 주세요. 같은 링크를 그대로 쓰면 됩니다.
          </Muted>

          {state.myPushToken ? (
            <>
              <Button
                title="연결 링크 보내기"
                variant="parent"
                onPress={shareLink}
                style={{ marginTop: spacing.lg }}
              />
              <Muted style={{ marginTop: spacing.md }}>
                카카오톡으로 아이 기기에 보낸 뒤, 아이 기기에서 링크를 한 번 누르면 연결됩니다.
              </Muted>
              <View style={s.tokenBox}>
                <Muted style={{ fontSize: 11 }}>내 푸시 주소</Muted>
                <Text style={s.token} selectable>
                  {state.myPushToken}
                </Text>
              </View>
            </>
          ) : (
            <View style={{ marginTop: spacing.lg }}>
              {error ? <Body style={{ color: colors.wrong }}>{error}</Body> : <Muted>주소를 만드는 중…</Muted>}
            </View>
          )}
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <H3>받은 리포트</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {state.receivedReports.length === 0
              ? '아직 받은 리포트가 없습니다.'
              : `${state.receivedReports.length}건 보관 중`}
          </Muted>
          <Button
            title="리포트 보러 가기"
            variant="secondary"
            onPress={() => router.replace('/parent-dashboard')}
            style={{ marginTop: spacing.md }}
          />
        </Card>

        <Button
          title="이 기기를 다시 학습용으로 되돌리기"
          variant="ghost"
          onPress={() => setRole('child')}
          style={{ marginTop: spacing.lg }}
        />
      </Screen>
    );
  }

  /* ---------------- 아이 기기 ---------------- */

  const link = state.parentLink;

  return (
    <Screen>
      <View style={{ paddingTop: spacing.lg }}>
        <Text style={{ fontSize: 44 }}>🔗</Text>
        <H1 style={{ marginTop: spacing.md }}>부모님 폰 연결</H1>
        <Muted style={{ marginTop: spacing.sm }}>
          연결해 두면 아이가 학습을 마칠 때마다 부모님 폰으로 결과가 바로 갑니다.
        </Muted>
      </View>

      {link ? (
        <Card style={{ marginTop: spacing.lg, borderColor: colors.parent }}>
          <Row style={{ justifyContent: 'space-between' }}>
            <H3>{link.label}</H3>
            <Chip label="연결됨" tone="correct" />
          </Row>
          <Muted style={{ marginTop: spacing.sm }}>
            {link.lastSentDate
              ? `마지막 전송: ${formatKo(link.lastSentDate)}`
              : '아직 보낸 적이 없습니다.'}
          </Muted>

          <Button
            title="지금 한 번 보내보기"
            variant="parent"
            onPress={testSend}
            loading={busy}
            style={{ marginTop: spacing.lg }}
          />
          {sendResult ? (
            <Body
              style={{
                marginTop: spacing.md,
                color: sendResult.startsWith('보냈') ? colors.correct : colors.wrong,
              }}
            >
              {sendResult}
            </Body>
          ) : null}

          <Button
            title="연결 끊기"
            variant="ghost"
            onPress={() => {
              unlinkParent();
              setSendResult('');
            }}
            style={{ marginTop: spacing.sm }}
          />
        </Card>
      ) : (
        <>
          <Card style={{ marginTop: spacing.lg }}>
            <H3>1. 부모님 폰에서 준비하기</H3>
            <Muted style={{ marginTop: spacing.sm }}>
              부모님 폰에도 이 앱을 설치하고, 부모님 모드 → 부모님 폰 연결에서{'\n'}
              <Text style={{ fontWeight: '700' }}>이 폰을 부모님 전용으로 쓰기</Text>를 누른 뒤{'\n'}
              <Text style={{ fontWeight: '700' }}>연결 링크 보내기</Text>로 이 기기에 보내 주세요.
            </Muted>
          </Card>

          <Card style={{ marginTop: spacing.md }}>
            <H3>2. 이 기기에서 연결하기</H3>
            <Muted style={{ marginTop: spacing.sm }}>
              카카오톡으로 받은 링크를 누르면 자동으로 연결됩니다.{'\n'}
              링크가 안 열리면 주소를 복사해 아래에 붙여넣으세요.
            </Muted>

            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder="부모님 폰 이름 (예: 엄마 폰)"
              placeholderTextColor={colors.muted}
              style={s.input}
              maxLength={20}
            />
            <TextInput
              value={pasted}
              onChangeText={setPasted}
              placeholder="ExponentPushToken[...] 붙여넣기"
              placeholderTextColor={colors.muted}
              style={[s.input, { height: 84, textAlignVertical: 'top' }]}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
            />
            {error ? <Body style={{ color: colors.wrong, marginTop: spacing.sm }}>{error}</Body> : null}

            <Button
              title="연결하기"
              onPress={linkByPaste}
              disabled={pasted.trim().length === 0}
              style={{ marginTop: spacing.md }}
            />
          </Card>
        </>
      )}

      <Card style={{ marginTop: spacing.md }}>
        <H3>이 기기를 부모님 폰으로 쓰려면</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          학습 기능을 끄고 리포트만 받는 기기가 됩니다.
          {state.profiles.length > 0
            ? `\n\n⚠️ 지금 이 기기에는 ${state.profiles.map((p) => p.name).join(', ')}의 학습 기록이 있습니다. 여기서 누르면 그 아이의 학습 화면이 사라집니다. 부모님이 따로 쓰시는 폰에서 눌러 주세요.`
            : '\n\n부모님 폰에서만 눌러 주세요.'}
        </Muted>
        <Button
          title="이 폰을 부모님 전용으로 쓰기"
          variant="secondary"
          onPress={becomeParentDevice}
          loading={busy}
          style={{ marginTop: spacing.md }}
        />
        {error && !link ? (
          <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body>
        ) : null}
      </Card>

      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <H3>알아 두세요</H3>
        <Muted style={{ marginTop: spacing.sm }}>
          · 리포트는 Expo 푸시 서비스를 한 번 거쳐 전달됩니다. 앱에서 유일하게 밖으로 나가는 통신입니다.{'\n'}
          · Expo Go에서는 동작하지 않습니다. APK로 설치한 앱이어야 합니다.{'\n'}
          · 아이 기기가 꺼져 있으면 전송되지 않습니다. 그럴 때는 부모님 폰이 정해진 시각에 “리포트가 오지 않았어요”라고 알려 줍니다.
        </Muted>
      </Card>
    </Screen>
  );
}

const s = StyleSheet.create({
  input: {
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.bg,
  },
  tokenBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.bg,
    borderRadius: radius.md,
  },
  token: { fontSize: 12, color: colors.subtext, marginTop: 2 },
});
