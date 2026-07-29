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
  const {
    state,
    setRole,
    setMyPushToken,
    setReceivesReports,
    unlinkParent,
    linkParent,
    pushReportNow,
  } = useApp();
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
    setReceivesReports(true);
    setRole('parent');
  }

  /**
   * 역할은 그대로 두고 **리포트 받는 기능만** 켠다.
   *
   * 부모님도 같이 공부하면서 아이 리포트를 받고 싶을 수 있다. 예전에는
   * '부모님 전용'으로 바꾸는 길밖에 없어서 학습 화면을 포기해야 했다.
   * 리포트를 받는 것과 학습 화면을 감추는 것은 원래 다른 이야기다.
   */
  async function alsoReceiveReports() {
    setBusy(true);
    setError('');
    const { token, reason } = await fetchPushToken();
    setBusy(false);
    if (!token) {
      setError(reason ?? '푸시 주소를 만들지 못했습니다.');
      return;
    }
    setMyPushToken(token);
    setReceivesReports(true);
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
    // 자기 주소를 붙여넣으면 자기에게 보내게 된다. 이 폰이 리포트를 받기도
    // 하게 되면서 생긴 자리다 — 링크로 들어올 때는 link.tsx 가 막고 있었는데
    // 붙여넣기에는 그 확인이 없었다.
    if (state.myPushToken != null && state.myPushToken === token) {
      setError('이 폰의 주소예요. 아이 기기에 붙여넣어야 합니다.');
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
          {/*
            아이 화면에는 **아이가 할 일만** 적는다.

            예전에는 '부모님 폰에서 준비하기' 안내가 여기 있었다. 아이는 그
            단계를 할 수 없고, 읽어도 자기가 뭘 해야 하는지 알 수 없다.
            그 안내는 부모님 설정으로 옮겼다.
          */}
          <Card style={{ marginTop: spacing.lg }}>
            <H3>부모님이 보낸 요청 승인하기</H3>
            <Muted style={{ marginTop: spacing.sm }}>
              부모님이 보내 주신 링크를 누르면 바로 연결돼요.{'\n'}
              링크가 안 열리면, 함께 온 주소를 복사해 아래에 붙여넣으세요.
            </Muted>

            <TextInput
              value={pasted}
              onChangeText={setPasted}
              placeholder="부모님이 보낸 주소 붙여넣기"
              placeholderTextColor={colors.muted}
              style={[s.input, { height: 84, textAlignVertical: 'top' }]}
              multiline
              autoCapitalize="none"
              autoCorrect={false}
            />
            <TextInput
              value={label}
              onChangeText={setLabel}
              placeholder="누구 폰인가요? (예: 엄마 폰)"
              placeholderTextColor={colors.muted}
              style={s.input}
              maxLength={20}
            />
            {error ? <Body style={{ color: colors.wrong, marginTop: spacing.sm }}>{error}</Body> : null}

            <Button
              title="승인하기"
              onPress={linkByPaste}
              disabled={pasted.trim().length === 0}
              style={{ marginTop: spacing.md }}
            />
          </Card>
        </>
      )}

      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <H3>무엇이 가나요?</H3>
        <Muted style={{ marginTop: spacing.sm }}>
          연결하면 공부를 마칠 때마다 <Text style={{ fontWeight: '700' }}>이름 · 날짜 · 오늘 푼 개수 ·
          정답률 · 오늘 틀린 단어 · 레벨 진도</Text>가 부모님 폰으로 갑니다.
          그 밖에는 아무것도 보내지 않아요.
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
