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
    if (state.profiles.length === 0) {
      router.replace('/onboarding');
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
