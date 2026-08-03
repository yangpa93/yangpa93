/**
 * 아이 화면의 '부모님과 연결하기'.
 *
 * **방향을 뒤집었다.** 예전에는 부모가 QR 을 띄우고 아이가 찍었다. 그런데
 * 부모님 모드에 들어가 보면 "이 기기에 등록된 아이가 없습니다"만 뜨고,
 * 아이를 등록할 QR 을 만들 자리가 없어 길이 스스로 막혀 있었다.
 *
 * 이제는 아이가 자기 QR 을 띄우고 부모가 찍는다. 아이는 자기 이름과 주소를
 * 이미 갖고 있으니 누르는 순간 바로 뜨고, 부모는 아이 폰을 보며 찍기만 하면
 * 된다. 부모 폰 주소는 찍은 뒤 부모가 되보내므로 아이가 더 할 일은 없다.
 *
 * 부모님이 이 앱을 안 쓰는 집도 있다. 그때 이 카드를 계속 띄우면 못 한 일이
 * 남아 있는 것처럼 보인다. '연결 안 할래요'로 끌 수 있게 하되 **부모가 PIN 을
 * 눌러 승인**해야 꺼진다 — 아이가 스스로 끄면 감시를 피하는 길이 된다.
 */

import { useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, Chip, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { buildChildLinkUrl, fetchPushToken, isPreviewToken, toShortCodeLines } from '../features/push';
import { QrCode } from './QrCode';
import { colors, font, radius, spacing } from '../theme';

export function ConnectParentCard() {
  const { state, profile, setMyPushToken, setPrimaryParent } = useApp();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [showing, setShowing] = useState(false);

  if (!profile) return null;

  const links = state.parentLinks;

  /* ---------------- 이미 연결됨 ---------------- */

  if (links.length > 0) {
    return (
      <Card style={{ marginTop: spacing.md }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <H3>👨‍👩‍👧 부모님과 연결됨</H3>
          <Chip label={`${links.length}대`} tone="correct" />
        </Row>
        <Muted style={{ marginTop: spacing.xs }}>
          공부를 마치면 오늘 기록이 연결된 폰 전부에 자동으로 갑니다. 가는 것 —{' '}
          {profile.name} · 날짜 · 오늘 푼 개수 · 정답률 · 오늘 틀린 단어 · 지금 레벨 진도.
          그 밖에는 아무것도 보내지 않아요.
        </Muted>

        {/*
          누구누구에게 가는지 이름으로 적는다. '연결됨' 한 줄만 두면 아이도
          부모도 몇 대에 가고 있는지 알 수 없다.

          주 부모는 여기서 바꾼다. **아이가 고르게 두는 이유**: 요청권을
          신청하는 쪽이 아이라서, 자기가 누구에게 말하는지는 알아야 한다.
          잘못 골라도 리포트는 어차피 전부에게 가므로 잃는 것이 없다.
        */}
        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {links.map((l) => (
            <Pressable
              key={l.token}
              onPress={() => setPrimaryParent(l.token)}
              accessibilityRole="radio"
              accessibilityState={{ selected: l.isPrimary }}
              style={[s.who, l.isPrimary && s.whoOn]}
            >
              <View style={{ flex: 1 }}>
                <Text style={s.whoName}>{l.label}</Text>
                <Text style={s.whoWhen}>
                  {l.lastSentDate ? `마지막 전송 ${l.lastSentDate}` : '아직 보낸 적 없어요'}
                </Text>
              </View>
              {l.isPrimary ? <Chip label="🎟️ 요청권 받는 분" tone="accent" /> : null}
            </Pressable>
          ))}
        </View>

        <Muted style={{ marginTop: spacing.sm }}>
          동기 부여 요청권은 한 분에게만 갑니다. 눌러서 바꿀 수 있어요.
        </Muted>

        <Button
          title="연결 상태 보기"
          variant="secondary"
          onPress={() => router.push('/parent-link')}
          style={{ marginTop: spacing.md }}
        />
      </Card>
    );
  }

  /* ---------------- 연결 안 하기로 승인됨 ---------------- */

  if (profile.linkWaived) {
    return (
      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <H3>🔕 부모님 연결 없이 쓰는 중</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          기록은 이 폰 안에만 있어요. 나중에 연결하고 싶으면 부모님께 말씀드리면 됩니다.
        </Muted>
      </Card>
    );
  }

  /* ---------------- 아직 안 함 ---------------- */

  async function showQr() {
    setError('');
    if (state.myPushToken) {
      setShowing(true);
      return;
    }
    setBusy(true);
    const got = await fetchPushToken();
    setBusy(false);
    if (!got.token) {
      setError(got.reason ?? '이 폰의 주소를 만들지 못했습니다.');
      return;
    }
    setMyPushToken(got.token);
    setShowing(true);
  }

  return (
    <Card style={{ marginTop: spacing.md }}>
      <H3>👨‍👩‍👧 부모님과 연결하기</H3>
      <Muted style={{ marginTop: spacing.xs }}>
        연결하면 공부를 마칠 때마다 {profile.name}의 오늘 기록(푼 개수 · 정답률 ·
        틀린 단어 · 레벨 진도)이 부모님 폰으로 갑니다. 그 밖에는 아무것도 보내지 않아요.
      </Muted>

      {/*
        **길이 하나뿐이라 걸음만 적으면 된다.**

        예전에는 부모 QR 을 아이가 찍는 길도 있어서, 아이 화면에도 '찍기' 가
        같이 있었다. 그 길을 없앴으니 아이가 할 일은 QR 을 띄우는 것 하나다.
        고를 것이 없으면 설명이 짧아지고, 짧으면 읽는다.
      */}
      <View style={s.steps}>
        <Text style={s.step}>1. 아래 버튼을 누르면 내 QR 이 떠요</Text>
        <Text style={s.step}>2. 부모님이 그 QR 을 부모님 폰으로 찍어요</Text>
        <Text style={s.step}>3. 끝이에요. 더 누를 것 없어요</Text>
      </View>

      <Button
        title={showing ? 'QR 숨기기' : '📱 내 QR 띄우기'}
        loading={busy}
        onPress={() => (showing ? setShowing(false) : void showQr())}
        style={{ marginTop: spacing.md }}
      />

      {error ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{error}</Body> : null}

      {showing && state.myPushToken ? (
        <View style={s.codeBox}>
          <QrCode
            value={buildChildLinkUrl(state.myPushToken, profile.name)}
            size={230}
            testID="child-qr"
          />
          <Text style={s.qrHint}>부모님 폰으로 이 QR 을 찍어 주세요</Text>

          {/*
            노트북 미리보기에서는 가짜 주소를 쓴다. **그 사실을 화면에 적는다.**
            안 적으면 화면만 보고 진짜로 연결된 줄 알게 되는데, 조용한 실패가
            시끄러운 실패보다 나쁘다. 실제 폰에서는 이 줄이 나올 수 없다.
          */}
          {isPreviewToken(state.myPushToken) ? (
            <Text style={s.previewWarn}>
              🧪 이것은 노트북 미리보기용 가짜 주소예요. 진짜 폰에서는 진짜 주소가 뜹니다.
            </Text>
          ) : null}

          {/*
            부모님 폰에 카메라가 없거나 안 될 때를 위해 코드도 같이 둔다.

            **넉 자씩 줄을 바꿔 번호를 붙인다.** 예전에는 한 줄에 빈칸으로
            끊어 적었는데, 토큰에 `-` 와 `_` 가 글자로 들어 있어서 그 빈칸이
            끊는 자리인지 코드의 일부인지 알 수가 없었다. 줄을 바꾸면 끊는
            자리에 아무 글자도 없어 헷갈릴 것이 없고, 번호가 있으니 어디까지
            불렀는지 놓치지 않는다.
          */}
          <View style={s.codeFallback}>
            <Muted style={{ fontSize: 11 }}>카메라가 안 되면 이 코드를 불러 주세요</Muted>
            {/*
              **"빈칸도 넣어야 하나" 를 없애는 것이 이 줄의 전부다.**

              실제로 이 말을 들었다 — "코드도 4칸 4칸 이렇게 있어야 되는데
              빈칸도 구분해서 넣어야 하는 건지 헷갈립니다". 넣어야 하나 말아야
              하나를 고민하는 순간 이미 틀릴 준비가 된 것이다. 되돌리는 쪽은
              공백을 다 걷어내니 어느 쪽이든 되는데, 그 사실을 모르면 소용이
              없다. 되는 것을 말해 주는 것이 규칙을 하나 더 만드는 것보다 낫다.
            */}
            <Muted style={{ fontSize: 11, marginTop: 2, textAlign: 'center' }}>
              네모 안의 글자만 1번부터 차례대로 적으면 돼요.{'\n'}
              띄어쓰기는 신경 쓰지 않아도 되고, 대문자와 소문자만 맞춰 주세요.{'\n'}
              <Text style={s.mark}>-</Text> 와 <Text style={s.mark}>_</Text> 도 코드의 글자예요.
              빠뜨리지 마세요.
            </Muted>
            <View style={s.codeLines}>
              {toShortCodeLines(state.myPushToken).map((chunk, i) => (
                <View key={i} style={s.codeLine}>
                  <Text style={s.codeNo}>{i + 1}</Text>
                  {/*
                    **네모로 감싼다.** 예전에는 한 줄에 빈칸으로 끊어 적었는데,
                    푸시 토큰은 base64url 이라 `-` 와 `_` 를 글자로 쓴다. 그래서
                    실제로 이런 것이 떴다 —

                        WLDv RDLX NikW -PbJ kPm1 vYF

                    넷째 토막이 하이픈으로 시작한다. 빈칸 바로 뒤에 하이픈이
                    오면 그것이 글자인지 끊는 표시인지 사람은 가릴 수 없다.

                    네모 안에 넣으면 그 물음이 통째로 사라진다. 테두리가 끊는
                    자리를 맡으므로 안에 보이는 것은 전부 코드의 글자다.

                    testID 는 노트북 확인(e2e)에서 이 토막들을 모아 부모 창에
                    옮겨 적으려는 것이다. 코드가 매번 달라 글자로는 못 찾는다.
                  */}
                  <View style={s.codeBoxOne}>
                    <Text style={s.code} selectable testID="link-code-chunk">
                      {/*
                        **`-` 와 `_` 만 색을 달리 칠한다.**

                        네모로 감쌌더니 새 함정이 하나 남았다 — 토막 끝에 하이픈이
                        오면(`iew-`) 그것이 "다음 줄로 이어진다" 는 표시로 읽힌다.
                        책에서 줄 끝에 하이픈을 넣는 그 규칙 때문이다. 그러면
                        옮겨 적는 사람이 하이픈을 빼 버린다.

                        색을 칠하면 그 물음이 끝난다. 글자로 보이는 것과 다른
                        색이면 "이건 장식이 아니라 내용" 이라는 뜻이 된다.
                        위 안내줄에도 같은 색으로 한 번 더 짚어 둔다.
                      */}
                      {chunk.split('').map((ch, j) =>
                        ch === '-' || ch === '_' ? (
                          <Text key={j} style={s.mark}>
                            {ch}
                          </Text>
                        ) : (
                          ch
                        ),
                      )}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      ) : null}

      {/*
        연결이 필요 없는 집을 위한 길. 아이가 혼자 끄지 못하게 부모 PIN 뒤에 둔다.
      */}
      <Button
        title="부모님과 연결하지 않을래요"
        variant="ghost"
        onPress={() =>
          router.push({ pathname: '/parent', params: { intent: 'waive', profileId: profile.id } })
        }
        style={{ marginTop: spacing.sm }}
      />
      <Muted style={{ marginTop: spacing.xs, textAlign: 'center' }}>
        부모님이 PIN 을 눌러 확인해 주셔야 꺼집니다.
      </Muted>
    </Card>
  );
}

const s = StyleSheet.create({
  who: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  whoOn: { borderColor: colors.accent, borderWidth: 2 },
  whoName: { fontSize: font.body, fontWeight: '800', color: colors.text },
  whoWhen: { fontSize: font.tiny, color: colors.subtext, marginTop: 2 },
  steps: { marginTop: spacing.md, gap: spacing.xs },
  step: { fontSize: font.small, color: colors.subtext, lineHeight: 20 },
  codeBox: {
    marginTop: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
  qrHint: {
    marginTop: spacing.md,
    fontSize: font.body,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
  },
  codeFallback: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    width: '100%',
    alignItems: 'center',
  },
  previewWarn: {
    marginTop: spacing.sm,
    fontSize: font.small,
    fontWeight: '700',
    color: '#B45309',
    textAlign: 'center',
    lineHeight: 20,
  },
  /*
   * `-` 와 `_` 만 다른 색으로. 이 둘은 코드의 글자인데 장식으로 읽히기 쉽다 —
   * 토막 끝에 오면 줄이 이어진다는 표시로, 토막 앞에 오면 목록의 줄표로.
   * 색이 다르면 그 물음이 생기지 않는다.
   */
  mark: { color: '#B45309', fontWeight: '800' },
  codeLines: { marginTop: spacing.md, gap: spacing.xs },
  codeLine: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  /*
   * 토막 하나를 담는 네모.
   *
   * 끊는 자리를 **테두리가 맡는다.** 그래야 안에 보이는 것이 전부 코드의
   * 글자가 된다 — 빈칸으로 끊으면 그 빈칸이 글자인지 아닌지를 사람이 판단해야
   * 하는데, 코드에 `-` 와 `_` 가 들어 있어서 판단할 수가 없다.
   */
  codeBoxOne: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: '#fff',
    minWidth: 118,
    alignItems: 'center',
  },
  /* 몇 번째 줄인지. 어디까지 불렀는지 놓치지 않게 하는 것이 전부다. */
  codeNo: {
    width: 20,
    textAlign: 'right',
    fontSize: font.tiny,
    fontWeight: '700',
    color: colors.muted,
  },
  /*
   * 코드는 크고 고정폭이라야 한다. 부모가 화면을 보고 옮겨 적는데,
   * 글자 폭이 들쭉날쭉하면 어디까지 쳤는지 자꾸 놓친다.
   *
   * 자간을 넉넉히 준다. 넉 자뿐이라 자리를 넓게 써도 되고, `-` 와 `_` 가
   * 옆 글자에 붙어 보이면 그것대로 잘못 읽는다.
   */
  code: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    fontFamily: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
    letterSpacing: 3,
    lineHeight: 32,
  },
});
