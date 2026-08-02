import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H1, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { LevelId, ProfileKind } from '../src/types';
import { LevelPicker } from '../src/components/LevelPicker';
import { AvatarPicker, DEFAULT_AVATAR } from '../src/components/AvatarPicker';
import { colors, font, radius, spacing } from '../src/theme';

/** 부모가 고르는 캐릭터. 아이용 이모지와 섞이지 않게 따로 둔다. */
const PARENT_AVATAR = '👩‍💼';

/**
 * 프로필 만들기.
 *
 * **누구인지를 가장 먼저 묻는다.** 예전에는 아이만 있다고 보고 이름부터
 * 물었고, 부모님은 아이 하나를 억지로 만든 뒤에야 부모님 모드에 들어갈 수
 * 있었다. 그래서 부모님 모드에는 "이 기기에 등록된 아이가 없습니다"만 뜨고,
 * 아이를 등록할 QR 을 만들 자리도 없어 길이 스스로 막혀 있었다.
 *
 * 이제 아이와 부모는 처음부터 다른 사람이다. 화면도 갈린다 — 아이는 오늘의
 * 학습과 동기 부여 요청권을, 부모는 자기 공부와 아이들 보고서를 본다.
 */
export default function Onboarding() {
  const { addProfile, state } = useApp();
  const [kind, setKind] = useState<ProfileKind | null>(null);
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR);
  const [level, setLevel] = useState<LevelId>('m1-1');
  const [saving, setSaving] = useState(false);

  const first = state.profiles.length === 0;

  async function submit() {
    const trimmed = name.trim();
    if (!trimmed || !kind || saving) return;
    setSaving(true);
    await addProfile(trimmed, avatar, level, kind);
    router.replace(kind === 'parent' ? '/parent-home' : '/home');
  }

  /* ---------------- 1단계: 누구인가 ---------------- */

  if (kind === null) {
    return (
      <Screen>
        <View style={{ paddingTop: spacing.xl }}>
          <H1>{first ? '반가워요! 👋' : '프로필 만들기'}</H1>
          <Muted style={{ marginTop: spacing.sm }}>
            {first
              ? '이 앱을 쓰는 사람이 누구인지 알려 주세요. 화면이 달라집니다.'
              : '한 명 더 등록합니다.'}
          </Muted>
        </View>

        <Pressable
          style={s.pick}
          onPress={() => {
            setKind('child');
            setAvatar(DEFAULT_AVATAR);
          }}
          accessibilityRole="button"
        >
          <Text style={s.pickIcon}>🧒</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.pickTitle}>아이예요</Text>
            <Text style={s.pickSub}>
              학년에 맞는 영어·국어 어휘를 하루 조금씩. 레벨을 끝내면 동기 부여 요청권이 생겨요.
            </Text>
          </View>
          <Text style={s.chev}>›</Text>
        </Pressable>

        <Pressable
          style={[s.pick, { borderColor: colors.parent }]}
          onPress={() => {
            setKind('parent');
            setAvatar(PARENT_AVATAR);
          }}
          accessibilityRole="button"
        >
          <Text style={s.pickIcon}>👨‍👩‍👧</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.pickTitle}>부모예요</Text>
            <Text style={s.pickSub}>
              일상·업무 영어 문장을 매일 조금씩 공부하고, 아이들 학습 보고서를 봅니다.
            </Text>
          </View>
          <Text style={s.chev}>›</Text>
        </Pressable>

        <Card style={{ marginTop: spacing.lg, backgroundColor: colors.bg }}>
          <H3>나중에 바꿀 수 있나요?</H3>
          <Muted style={{ marginTop: spacing.sm }}>
            프로필은 얼마든지 더 만들 수 있어요. 한 기기에 아이와 부모가 함께 있어도
            됩니다 — 프로필을 바꾸면 그 사람의 화면이 나와요.
          </Muted>
        </Card>

        {!first ? (
          <Button
            title="취소"
            variant="ghost"
            onPress={() => router.back()}
            style={{ marginTop: spacing.md }}
          />
        ) : null}
      </Screen>
    );
  }

  /* ---------------- 2단계: 이름과 학년 ---------------- */

  const isParent = kind === 'parent';

  return (
    <Screen>
      <View style={{ paddingTop: spacing.xl }}>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <H1>{isParent ? '부모님 프로필' : '아이 프로필'}</H1>
          <Pressable onPress={() => setKind(null)} accessibilityRole="button">
            <Text style={s.change}>바꾸기</Text>
          </Pressable>
        </Row>
        <Muted style={{ marginTop: spacing.sm }}>
          {isParent
            ? '무엇을 공부할지는 만든 다음에 고릅니다.'
            : '지금 학년보다 한 단계 낮게 시작해도 좋아요. 다 외우면 자동으로 올라갑니다.'}
        </Muted>
      </View>

      <Card style={{ marginTop: spacing.xl }}>
        <H3>이름</H3>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder={isParent ? '예) 엄마' : '예) 서준'}
          placeholderTextColor={colors.muted}
          style={s.input}
          maxLength={12}
          returnKeyType="done"
        />

        <H3 style={{ marginTop: spacing.lg }}>캐릭터</H3>
        <AvatarPicker value={avatar} onChange={setAvatar} />

        {/*
          학년은 아이에게만 묻는다. 부모의 영어 레벨은 '아이들과 같은 단어'를
          켤 때만 뜻이 있는데, 그건 학습 정하기 화면에서 고르는 것이라
          여기서 미리 묻지 않는다.
        */}
        {isParent ? null : (
          <>
            <H3 style={{ marginTop: spacing.lg }}>시작 학년</H3>
            <View style={{ marginTop: spacing.md }}>
              <LevelPicker value={level} onChange={setLevel} />
            </View>
          </>
        )}
      </Card>

      <Button
        title="시작하기"
        variant={isParent ? 'parent' : 'primary'}
        onPress={submit}
        disabled={name.trim().length === 0}
        loading={saving}
        style={{ marginTop: spacing.xl }}
      />

      {first ? (
        <Body style={{ textAlign: 'center', marginTop: spacing.lg, color: colors.subtext }}>
          {isParent
            ? '아이는 자기 폰에서 만들고, QR 로 이 폰에 연결합니다.'
            : '부모님 프로필은 나중에 더 만들 수 있어요.'}
        </Body>
      ) : (
        <Button
          title="취소"
          variant="ghost"
          onPress={() => router.back()}
          style={{ marginTop: spacing.sm }}
        />
      )}
    </Screen>
  );
}

const s = StyleSheet.create({
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
  pick: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.card,
  },
  pickIcon: { fontSize: 34 },
  pickTitle: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  pickSub: { fontSize: font.small, color: colors.subtext, marginTop: 4, lineHeight: 19 },
  chev: { fontSize: 26, color: colors.muted },
  change: { fontSize: font.small, fontWeight: '700', color: colors.primary },
});
