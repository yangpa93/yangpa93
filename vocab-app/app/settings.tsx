import { Pressable, Switch, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { SUBJECT_LABEL } from '../src/types';
import { AvatarPicker, labelOf } from '../src/components/AvatarPicker';
import { FeedbackCard } from '../src/components/FeedbackCard';
import { APP_NAME, buildInfo, buildLabel } from '../src/features/build-info';
import { speak, tapCorrect } from '../src/lib/feedback';
import { colors, font, radius, spacing } from '../src/theme';

/** 하루에 새로 만날 단어 수. 아이가 고른다. */
const NEW_PER_DAY = [5, 8, 10, 12, 15, 20];

/**
 * 아이가 직접 바꾸는 설정.
 *
 * 소리·진동·캐릭터는 아이 취향이고, 잘못 눌러도 학습에 아무 영향이 없다.
 * 이걸 부모님 PIN 뒤에 두면 소리를 끄고 싶을 때마다 부모를 불러야 해서
 * 아이가 그냥 참고 쓴다. 반대로 하루 학습량·복습량·보상 금액·레벨은
 * 진도와 돈이 걸려 있어 부모님 모드에 그대로 둔다.
 */
export default function ChildSettings() {
  const { state, profile, updateSettings, updateProfile } = useApp();

  if (!profile) return null;

  const { ttsEnabled, hapticsEnabled, newPerDay, reviewPerDay, rounds, subjects, firstSubject } =
    profile.settings;
  // 두 과목을 다 켠 아이에게만 순서를 묻는다. 하나뿐이면 고를 것이 없다.
  const bothSubjects = subjects.includes('en') && subjects.includes('ko');
  const linkedParent = state.parentLink;
  const build = buildInfo();

  // 오늘 몇 문제를 풀게 되는지. 개수만 보면 감이 안 와서 시간까지 적는다.
  const questions = (newPerDay + reviewPerDay) * rounds;
  const minutes = Math.max(1, Math.round((questions * 10) / 60));

  return (
    <Screen>
      {/*
        하루 분량을 아이가 고른다.
        스스로 정한 속도라야 "계획보다 빨리 끝냈다"는 말이 자기 말이 된다.
        부모가 정해 준 숫자를 앞당긴 것과는 기분이 다르다.
      */}
      {/*
        무엇을 먼저 풀지 아이가 고른다.

        머리가 맑을 때 어려운 쪽을 먼저 하고 싶은 아이가 있고, 쉬운 쪽으로
        몸을 풀고 싶은 아이가 있다. 어느 쪽이 어려운지는 아이마다 달라서
        어른이 정해 줄 일이 아니다.
      */}
      {bothSubjects ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>무엇부터 풀까요</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            고른 쪽을 먼저 다 풀고 나머지로 넘어가요.
          </Muted>
          <Row style={{ gap: spacing.sm, marginTop: spacing.md }}>
            {(['en', 'ko'] as const).map((sub) => (
              <Pressable
                key={sub}
                onPress={() => updateSettings(profile.id, { firstSubject: sub })}
                style={[s.chip, firstSubject === sub && s.chipOn]}
                accessibilityRole="radio"
                accessibilityState={{ selected: firstSubject === sub }}
              >
                <Text style={[s.chipText, firstSubject === sub && s.chipTextOn]}>
                  {SUBJECT_LABEL[sub]} 먼저
                </Text>
              </Pressable>
            ))}
          </Row>
        </Card>
      ) : null}

      <Card style={{ marginTop: spacing.md }}>
        <H3>하루에 새로 배울 단어</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          5개부터 20개까지 고를 수 있어요. 많이 고르면 빨리 끝나지만 하루가 길어져요.
        </Muted>
        <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
          {NEW_PER_DAY.map((n) => (
            <Pressable
              key={n}
              onPress={() => updateSettings(profile.id, { newPerDay: n })}
              style={[s.chip, newPerDay === n && s.chipOn]}
              accessibilityRole="button"
              accessibilityState={{ selected: newPerDay === n }}
            >
              <Text style={[s.chipText, newPerDay === n && s.chipTextOn]}>{n}개</Text>
            </Pressable>
          ))}
        </Row>
        <View style={s.estimate}>
          <Muted>
            새 단어 {newPerDay}개 + 복습 {reviewPerDay}개를 {rounds}번씩 —{' '}
            <Text style={{ fontWeight: '800', color: colors.text }}>
              오늘 {questions}문제, 약 {minutes}분
            </Text>
          </Muted>
        </View>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>{profile.name} 설정</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          여기 있는 것은 마음대로 바꿔도 괜찮아요. 공부한 기록은 그대로예요.
        </Muted>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.label}>🔊 소리로 읽어주기</Text>
            <Muted style={{ marginTop: 2 }}>영어 문장을 소리로 들려줘요.</Muted>
          </View>
          <Switch
            value={ttsEnabled}
            onValueChange={(v) => {
              updateSettings(profile.id, { ttsEnabled: v });
              // 켠 순간 한 번 읽어 준다. 켜졌는지 확인하러 공부를
              // 시작해 볼 필요가 없다.
              if (v) speak('Hello!', true);
            }}
          />
        </Row>

        <Row style={{ justifyContent: 'space-between', marginTop: spacing.lg }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.label}>📳 진동 피드백</Text>
            <Muted style={{ marginTop: 2 }}>맞히거나 틀렸을 때 살짝 떨려요.</Muted>
          </View>
          <Switch
            value={hapticsEnabled}
            onValueChange={(v) => {
              updateSettings(profile.id, { hapticsEnabled: v });
              if (v) tapCorrect(true);
            }}
          />
        </Row>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>내 캐릭터</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          지금은 {profile.avatar} {labelOf(profile.avatar)}예요. 바꿔도 공부한 기록은 그대로예요.
        </Muted>
        <AvatarPicker
          value={profile.avatar}
          onChange={(emoji) => updateProfile(profile.id, { avatar: emoji })}
        />
      </Card>

      {/*
        부모 폰 연결을 아이 설정에 둔다.

        지금까지는 부모님 PIN 뒤에만 있어서, 아이 폰에서 연결하려면 부모를
        불러 PIN 을 받아야 했다. 정작 링크를 붙여넣는 쪽은 아이 폰이다.

        무엇이 나가는지 아이에게 그대로 적어 둔다. 자기 기록이 어디로 가는지
        모르는 채 켜지는 것은, 상대가 부모라도 옳지 않다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>👨‍👩‍👧 부모님 폰에 알려주기</H3>
        {linkedParent ? (
          <>
            <Muted style={{ marginTop: spacing.xs }}>
              지금 <Text style={{ fontWeight: '700' }}>{linkedParent.label}</Text>에 연결돼 있어요.
              공부를 마치면 오늘 기록이 자동으로 갑니다.
            </Muted>
            <Muted style={{ marginTop: spacing.sm }}>
              가는 것 — {profile.name} · 날짜 · 오늘 푼 개수 · 정답률 · 오늘 틀린 단어 ·
              지금 레벨 진도. 그 밖에는 아무것도 보내지 않아요.
            </Muted>
          </>
        ) : (
          <Muted style={{ marginTop: spacing.xs }}>
            연결하면 공부를 마칠 때마다 {profile.name}의 오늘 기록(푼 개수 · 정답률 ·
            틀린 단어 · 레벨 진도)이 부모님 폰으로 갑니다. 부모님 폰에서 받은 연결
            링크를 여기서 붙여넣으면 돼요.
          </Muted>
        )}
        <Button
          title={linkedParent ? '연결 상태 보기' : '부모님 폰 연결하기'}
          variant="secondary"
          onPress={() => router.push('/parent-link')}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      {/*
        백업도 아이 설정에 둔다.

        기록은 이 폰 안에만 있다. 폰을 바꾸거나 앱을 지우면 통째로 사라지는데,
        그때 부모를 불러 PIN 을 받아야 한다면 대부분 그냥 잃어버린다.
        아이가 둘이면 각자 자기 폰에서 자기 기록을 빼 두어야 한다.

        되돌리기는 되돌릴 수 없다. 그래서 화면 안에서 **파일에 무엇이 들어
        있는지 먼저 보여주고** 확인을 한 번 더 받는다. 그 장치는 이미 있다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>💾 공부 기록 지키기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          공부한 기록은 이 폰 안에만 있어요. 폰을 바꾸거나 앱을 지우면 사라지니,
          가끔 파일로 빼 두면 안심이에요. 새 폰에서는 그 파일로 되돌릴 수 있어요.
        </Muted>
        <Button
          title="백업 · 되돌리기"
          variant="secondary"
          onPress={() => router.push('/backup')}
          style={{ marginTop: spacing.md }}
        />
      </Card>

      {/*
        이상한 것을 처음 만나는 사람은 아이다. 부모 PIN 뒤에만 두면
        아이는 부모를 부를 때까지 기다려야 하고, 그 사이에 무엇이 어떻게
        이상했는지를 잊는다. 대부분은 말하지 않고 넘어간다.
      */}
      <FeedbackCard />

      {/*
        지금 어느 앱을 쓰고 있는지 아이 스스로 말할 수 있어야 한다.
        고쳐서 새로 올렸는데 아직 옛 앱을 쓰고 있는 경우가 흔한데,
        그때 이 줄을 읽어 주면 바로 가려진다. 부모님 모드 안에만 있으면
        아이에게 물어볼 때마다 부모를 거쳐야 한다.
      */}
      <Muted style={{ marginTop: spacing.lg, textAlign: 'center' }}>
        {APP_NAME} {buildLabel(build)}
      </Muted>

      <Muted style={{ marginTop: spacing.sm, textAlign: 'center' }}>
        복습 개수와 학년·레벨은 부모님이 정해요.
      </Muted>

      <Button
        title="돌아가기"
        variant="secondary"
        onPress={() => router.back()}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
  estimate: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
});
