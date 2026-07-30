import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import { useApp } from '../src/store/AppProvider';
import { colors } from '../src/theme';

/** 저장된 상태를 불러온 뒤 첫 화면을 정한다. */
export default function Boot() {
  const { ready, state } = useApp();

  useEffect(() => {
    if (!ready) return;
    // 부모님 전용 기기는 학습 화면을 거치지 않고 바로 리포트로 간다.
    if (state.role === 'parent') {
      router.replace('/parent-dashboard');
      return;
    }
    /*
     * 아이가 없어도 홈으로 보낸다.
     *
     * 예전에는 곧바로 프로필 만들기로 끌고 갔다. 그런데 이 앱을 처음 여는
     * 사람은 대개 부모님이라, 아이 이름을 정하기 전에 보상 금액이나 알림을
     * 먼저 맞춰 보고 싶을 수 있다. 그러려면 없는 아이를 일단 하나 만들어야
     * 했다. 홈에서 '공부 시작하기'를 눌렀을 때 만들게 한다.
     */
    if (state.profiles.length === 0) {
      router.replace('/home');
    } else if (!state.activeProfileId) {
      router.replace('/profiles');
    } else {
      router.replace('/home');
    }
  }, [ready, state.role, state.profiles.length, state.activeProfileId]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}
