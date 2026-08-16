import { useCallback, useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { router, useFocusEffect } from 'expo-router';
import { Body, Button, Card, Chip, H1, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { fetchPushToken } from '../src/features/push';
import { formatKo } from '../src/lib/date';
import { colors, spacing } from '../src/theme';
import { primaryParent } from '../src/features/parentLinks';

/**
 * 연결 상태를 보는 화면.
 *
 * ── 이 화면이 하던 일의 절반이 사라졌다 ─────────────────────
 *
 * 예전에는 여기가 **연결을 만드는** 자리이기도 했다. 부모 폰이 자기 주소로
 * 링크를 만들어 카톡으로 보내고, 아이가 그 링크를 누르거나 코드를 옮겨 적었다.
 *
 * 그 길을 없앴다. 연결하는 방법이 둘이면 "누가 만들고 누가 찍는가" 를 매번
 * 정해야 하는데, 그건 도움이 안 되는 선택이다 — 고를 것이 있으면 고민이
 * 생기고, 고민이 생기면 거기서 멈춘다. 이제 길은 하나다.
 *
 *   아이 폰이 QR 을 띄운다 → 부모 폰이 찍는다
 *
 * 그래서 이 화면에는 **이미 이어진 것을 보고 만지는 일**만 남았다.
 *
 *   아이 기기   연결된 부모 폰 · 지금 한 번 보내보기 · 연결 끊기
 *   부모 기기   받은 리포트 · 아이 QR 찍으러 가는 길
 *
 * 딥링크(`gomtangivoca://link`)를 받는 link.tsx 는 그대로 둔다. 새로 만들지는
 * 않지만 카톡 대화방에 남아 있는 옛 링크가 눌렸을 때 죽으면 안 된다.
 */
export default function ParentLinkScreen() {
  const {
    state,
    profile,
    setRole,
    setMyPushToken,
    setReceivesReports,
    unlinkParent,
    pushReportNow,
  } = useApp();
  const isParentDevice = state.role === 'parent';

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
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

        {/*
          **여기에도 '연결 링크 보내기' 가 있었다.**

          이 폰 주소를 카톡으로 보내고 아이가 그 링크를 누르는 길이었는데,
          그건 반대 방향이다. 연결하는 길을 하나로 줄이면서 함께 없앴다.

          없애고 나니 이 폰 이름을 물어볼 이유도 사라졌다 — 이름은 아이 폰에
          표시하려던 것인데, 이제 부모가 아이 QR 을 찍는 순간 프로필 이름이
          그대로 실려 간다. 물어보는 칸이 하나 줄었다.
        */}
        <Card style={{ marginTop: spacing.lg, borderColor: colors.parent }}>
          <H3>아이를 등록하려면</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기 를 누르게 하고,
            이 폰으로 그 QR 을 찍으세요. 아이가 여럿이면 아이 폰마다 한 번씩.
          </Muted>
          <Button
            title="📷 아이 QR 찍기"
            variant="parent"
            onPress={() => router.push('/scan')}
            style={{ marginTop: spacing.md }}
          />
          <Button
            title="📵 카메라가 안 되면 — 코드로 연결하기"
            variant="ghost"
            onPress={() => router.push('/link-child-code')}
            style={{ marginTop: spacing.sm }}
          />
          {error ? (
            <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body>
          ) : null}
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

  /* ---------------- 부모 프로필로 들어왔을 때 ---------------- */

  /*
   * **이 화면은 아이 쪽 화면이다.** 그런데 부모가 여기 닿는 길이 있었다 —
   * 부모 폰에서 '아이 QR 찍기' → 'QR 말고 코드로 연결하기' 를 누르면 여기로
   * 왔다. 그러면 부모 폰에 "부모님이 보낸 요청 승인하기" 가 뜬다. 부모에게
   * 부모와 연결하라는 말이 되니 무엇을 하라는 것인지 알 수가 없다.
   *
   * `state.role` 로 갈랐던 것이 화근이었다. 부모님도 이 앱으로 공부하시면
   * 역할은 'child' 로 남고 프로필만 부모다. 그러면 부모인데 아이 화면을 본다.
   * 지금 켜져 있는 프로필로 갈라야 맞다.
   *
   * 부르는 쪽(scan.tsx · LinkChildCard)도 이제 부모를 여기로 안 보낸다.
   * 그래도 이 확인은 남긴다 — 길을 하나 막았다고 다른 길이 안 생긴다는 보장은
   * 없고, 잘못 닿았을 때 **길을 알려 주는 편**이 아무 말 없는 것보다 낫다.
   */
  if (profile?.kind === 'parent') {
    return (
      <Screen>
        <View style={{ paddingTop: spacing.lg }}>
          <Text style={{ fontSize: 44 }}>🔗</Text>
          {/*
            「여기는 아이 폰에서 쓰는 화면이에요」 라고 적혀 있었다. 부모가
            ⚙️ 설정 → 아이들 폰 연결 을 눌러 들어온 자리인데, 도착하자마자
            잘못 왔다는 말을 듣는 셈이었다. 실제로는 여기서 아이를 등록한다.
          */}
          <H1 style={{ marginTop: spacing.md }}>아이를 등록합니다</H1>
          <Muted style={{ marginTop: spacing.sm }}>
            아이들 폰에서 QR 을 생성하고 이 폰에서 QR 을 찍어 등록하면 아이가 등록됩니다.
          </Muted>
        </View>

        <Card style={{ marginTop: spacing.lg, borderColor: colors.parent }}>
          <H3>아이를 등록하려면</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기 를 누르게 하고, 이 폰으로
            그 QR 을 찍으세요.
          </Muted>
          <Button
            title="📷 아이 QR 찍기"
            variant="parent"
            onPress={() => router.replace('/scan')}
            style={{ marginTop: spacing.md }}
          />
          <Button
            title="📵 카메라가 안 되면 — 코드로 연결하기"
            variant="ghost"
            onPress={() => router.replace('/link-child-code')}
            style={{ marginTop: spacing.sm }}
          />
        </Card>

        <Button
          title="아이 목록 보기"
          variant="secondary"
          onPress={() => router.replace('/parent-child-basics')}
          style={{ marginTop: spacing.lg }}
        />
      </Screen>
    );
  }

  /* ---------------- 아이 기기 ---------------- */

  const link = primaryParent(state.parentLinks);

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
              unlinkParent(link.token);
              setSendResult('');
            }}
            style={{ marginTop: spacing.sm }}
          />
        </Card>
      ) : (
        <>
          {/*
            **아직 연결 안 된 아이에게는 할 일 하나만 적는다.**

            여기에는 '부모님이 보낸 요청 승인하기' 라는 칸이 있었다. 부모 폰이
            만든 코드를 아이가 옮겨 적는 자리였는데, 그건 **반대 방향**이다.

            연결하는 길을 하나로 줄이면서 그 방향을 통째로 없앴다 — 아이가 QR 을
            띄우고 부모가 찍는다, 그것뿐이다. 없앤 길의 입구를 남겨 두면 눌러
            보고 "여기서 뭘 적으라는 거지" 하다가 멈춘다. 길이 하나면 안내도
            하나여야 한다.
          */}
          <Card style={{ marginTop: spacing.lg }}>
            <H3>아직 연결 안 됐어요</H3>
            <Muted style={{ marginTop: spacing.sm }}>
              연결은 <Text style={{ fontWeight: '700' }}>내 QR 을 부모님이 찍는</Text> 것
              하나예요. 아래로 가서 QR 을 띄우면 됩니다.
            </Muted>
            <Button
              title="📱 내 QR 띄우러 가기"
              onPress={() => router.replace('/settings')}
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

/*
 * 따로 둘 모양이 없다. 코드 칸도 주소 상자도 전부 반대 방향(부모가 코드를
 * 만들고 아이가 옮겨 적는 길)에 딸린 것이었고, 그 길을 없애면서 함께 사라졌다.
 */
