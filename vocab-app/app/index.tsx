import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../src/store/AppProvider';
import { colors } from '../src/theme';

/** 저장된 상태를 불러온 뒤 첫 화면을 정한다. */
export default function Boot() {
  const { ready, state, profile } = useApp();

  useEffect(() => {
    if (!ready) return;

    /*
     * 프로필이 하나도 없으면 만들기부터 한다.
     *
     * 한동안은 프로필 없이도 홈에 들어가게 두었다. 부모님이 아이 이름을
     * 정하기 전에 보상 금액을 먼저 맞춰 보고 싶을 것이라 여겼기 때문이다.
     * 그런데 그 길로 들어간 부모님 모드는 "이 기기에 등록된 아이가 없습니다"만
     * 뜨고 아이를 등록할 방법이 없었다. 이제 첫 화면에서 **아이인지 부모인지**를
     * 고르므로, 부모님도 자기 프로필을 만들고 곧바로 자기 화면으로 들어간다.
     */
    if (state.profiles.length === 0) {
      router.replace('/onboarding');
      return;
    }
    if (!state.activeProfileId || !profile) {
      router.replace('/profiles');
      return;
    }
    // 부모 전용 기기(role)는 예전 판에서 넘어온 설정이다. 프로필 갈래가
    // 생긴 뒤로는 사람 단위로 갈리므로 프로필을 먼저 본다.
    if (profile.kind === 'parent') {
      router.replace('/parent-home');
      return;
    }
    if (state.role === 'parent') {
      router.replace('/parent-dashboard');
      return;
    }
    router.replace('/home');
  }, [ready, state.role, state.profiles.length, state.activeProfileId, profile]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
