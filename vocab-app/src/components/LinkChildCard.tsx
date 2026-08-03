/**
 * 아이 기기와 연결하기. **길은 하나뿐이다.**
 *
 * ── 왜 하나로 줄였나 ────────────────────────────────────────
 *
 * 이 카드는 두 번 줄었다.
 *
 * 처음에는 '🔗 아이 기기와 연결하기' 카드가 **두 장** 나란히 있었다. 제목이
 * 똑같아 무엇이 다른지 알 수 없어서 한 장으로 합치고, 안에서 두 갈래로 갈랐다.
 *
 *   ① 아이 폰에서 만든 QR 을 내 폰으로 찍기
 *   ② 내 폰에서 만든 QR 을 아이 폰으로 찍게 하기
 *
 * 그런데 합쳐 놓고도 **여전히 헷갈린다**는 말을 들었다. 맞는 말이다. 두 갈래는
 * 결국 "누구 폰이 QR 을 만들고 누구 폰이 찍는가" 인데, 연결이라는 한 가지 일을
 * 하려고 그걸 매번 정해야 한다. 고를 것이 있으면 고민이 생기고, 고민이 생기면
 * 거기서 멈춘다. **선택지가 도움이 되지 않는 자리였다.**
 *
 * 그래서 ①만 남겼다.
 *
 *   아이 폰이 QR 을 띄운다 → 부모 폰이 찍는다 → 끝
 *
 * ①이 남을 쪽인 이유는 분명하다. 찍는 쪽이 부모라 아이를 부를 필요가 없고,
 * 찍는 순간 아이가 등록되면서 이 폰 주소가 아이에게 되돌아가 아이는 더 누를
 * 것이 없다. 아이 이름도 QR 에 실려 오므로 따로 물어보지 않아도 된다.
 *
 * ② 는 "아이 폰 카메라가 안 될 때" 를 위한 것이었는데, 그 걱정은 **찍는 쪽이
 * 부모로 바뀌면서 사라졌다** — 이제 아이 폰 카메라는 아예 안 쓴다.
 *
 * 남은 걱정은 하나, **부모 폰 카메라가 안 될 때**다. 그건 방향을 뒤집는 것으로
 * 풀지 않는다. 아이 QR 아래 짧은 코드를 손으로 옮겨 적으면 된다
 * (link-child-code). 같은 방향, 카메라만 뺀 길이라 새로 배울 것이 없다.
 */

import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, Chip, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { MAX_CHILDREN, childLimitMessage, childNames } from '../features/children';
import { colors, font, radius, spacing } from '../theme';

export function LinkChildCard() {
  const { state } = useApp();

  /*
   * 아이는 이 폰 안의 프로필과 QR 로 이어진 아이 양쪽에서 온다. 이름으로
   * 합쳐 세야 실제 수가 맞는다 — 프로필도 만들어 주고 연결도 한 아이를 둘로
   * 세면 아이 둘인 집이 넷으로 잡힌다.
   */
  const names = childNames(state.profiles, state.knownChildren ?? []);
  const full = names.length >= MAX_CHILDREN;

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
      <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <H3>🔗 아이 기기와 연결하기</H3>
        <Chip label={`${names.length} / ${MAX_CHILDREN}명`} tone={full ? 'accent' : 'default'} />
      </Row>
      <Muted style={{ marginTop: spacing.xs }}>
        연결하면 아이가 공부를 마칠 때마다 이 폰으로 결과가 옵니다. 이 폰의 학습 화면은
        그대로 남아요.
      </Muted>

      {names.length > 0 ? (
        <Muted style={{ marginTop: spacing.sm }}>지금 연결된 아이 — {names.join(' · ')}</Muted>
      ) : null}

      {/*
        꽉 찼으면 버튼을 잠그고 왜 안 되는지 여기서 말해 준다. 버튼만 살려
        두면 눌러서 QR 을 찍고 나서야 안 된다는 것을 알게 되는데, 그때는
        아이를 이미 불러다 세워 둔 뒤다.
      */}
      {full ? (
        <View style={s.fullBox}>
          <Text style={s.fullTitle}>자리가 다 찼어요</Text>
          <Muted style={{ marginTop: spacing.xs }}>{childLimitMessage()}</Muted>
        </View>
      ) : null}

      {/*
        세 걸음으로 적는다. 갈래를 없앤 대신 **한 갈래를 아주 또렷하게** 적어
        둔다 — 고를 것이 없어졌으니 읽고 그대로 따라 하기만 하면 된다.
      */}
      <View style={s.way}>
        <Text style={s.step}>
          <Text style={s.stepNo}>1 </Text>
          <Text style={s.strong}>아이 폰</Text>에서 ⚙️ 설정 →{' '}
          <Text style={s.strong}>부모님과 연결하기</Text> →{' '}
          <Text style={s.strong}>📱 내 QR 띄우기</Text>
        </Text>
        <Text style={s.step}>
          <Text style={s.stepNo}>2 </Text>
          <Text style={s.strong}>이 폰</Text>에서 아래 단추를 눌러 그 QR 을 찍으세요
        </Text>
        <Text style={s.step}>
          <Text style={s.stepNo}>3 </Text>
          끝입니다. 아이는 더 누를 것이 없어요
        </Text>

        <Button
          title="📷 아이 QR 찍기"
          variant="parent"
          onPress={() => router.push('/scan')}
          disabled={full}
          style={{ marginTop: spacing.lg }}
        />

        {/*
          카메라가 안 될 때. **방향을 뒤집는 것으로 풀지 않는다** — 아이 QR
          아래에 짧은 코드가 늘 같이 떠 있으니 그것을 옮겨 적으면 된다.
        */}
        <Button
          title="📵 카메라가 안 되면 — 코드로 연결하기"
          variant="ghost"
          onPress={() => router.push('/link-child-code')}
          disabled={full}
          style={{ marginTop: spacing.sm }}
        />
      </View>

      <Muted style={{ marginTop: spacing.md, fontSize: font.tiny }}>
        아이가 여럿이면 아이 폰마다 한 번씩 찍어 주세요. 아이는 {MAX_CHILDREN}명까지 됩니다.
      </Muted>

      {names.length > 0 ? (
        <Button
          title="아이별 설정 보기"
          variant="secondary"
          onPress={() => router.push('/parent-children')}
          style={{ marginTop: spacing.lg }}
        />
      ) : null}
    </Card>
  );
}

const s = StyleSheet.create({
  strong: { fontWeight: '800', color: colors.text },
  fullBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  fullTitle: { fontSize: font.body, fontWeight: '800', color: '#B45309' },
  way: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  step: { fontSize: font.small, color: colors.subtext, lineHeight: 24, marginTop: spacing.xs },
  stepNo: { fontWeight: '800', color: colors.parent },
});
