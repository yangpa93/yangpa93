import { router } from 'expo-router';
import { Button, Card, H3, Muted, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { AvatarPicker, labelOf } from '../src/components/AvatarPicker';
import { ConnectParentCard } from '../src/components/ConnectParentCard';
import { FeedbackCard } from '../src/components/FeedbackCard';
import { spacing } from '../src/theme';

/**
 * ⚙️ 설정 — 공부 말고 나머지.
 *
 * ⚙️ 설정 → 설정. 여기 있는 것들의 공통점은 **공부 내용과 상관이 없다**는
 * 것이다. 캐릭터는 취향이고, 연결과 백업과 문의는 앱을 쓰는 일이다. 무엇을
 * 하루 몇 개 볼지와 섞어 두면 "국어를 켜려는데 백업이 나온다" 가 된다.
 */
export default function ChildSettingsMe() {
  const { profile, updateProfile } = useApp();

  if (!profile) return null;

  return (
    <Screen>
      <Card style={{ marginTop: spacing.md }}>
        <H3>내 캐릭터 설정</H3>
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
        불러 PIN 을 받아야 했다. 정작 QR 을 띄우는 쪽은 아이 폰이다.

        무엇이 나가는지 아이에게 그대로 적어 둔다. 자기 기록이 어디로 가는지
        모르는 채 켜지는 것은, 상대가 부모라도 옳지 않다.
      */}
      <ConnectParentCard />

      {/*
        백업도 아이 설정에 둔다.

        기록은 이 폰 안에만 있다. 폰을 바꾸거나 앱을 지우면 통째로 사라지는데,
        그때 부모를 불러 PIN 을 받아야 한다면 대부분 그냥 잃어버린다.
        아이가 둘이면 각자 자기 폰에서 자기 기록을 빼 두어야 한다.

        되돌리기는 되돌릴 수 없다. 그래서 화면 안에서 **파일에 무엇이 들어
        있는지 먼저 보여주고** 확인을 한 번 더 받는다. 그 장치는 이미 있다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>💾 공부 기록 백업 및 복구</H3>
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
        이상한 것을 처음 만나는 사람은 아이다. 부모 PIN 뒤에만 두면 아이는
        부모를 부를 때까지 기다려야 하고, 그 사이에 무엇이 어떻게 이상했는지를
        잊는다. 대부분은 말하지 않고 넘어간다.
      */}
      <FeedbackCard />

      <Button
        title="돌아가기"
        variant="secondary"
        onPress={() => router.back()}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}
