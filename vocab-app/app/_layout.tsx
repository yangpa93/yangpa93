import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../src/store/AppProvider';
import { PushBridge } from '../src/features/PushBridge';
import { colors } from '../src/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="dark" />
          <PushBridge />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.bg },
              headerTitleStyle: { fontWeight: '700', color: colors.text },
              headerShadowVisible: false,
              headerTintColor: colors.primary,
              contentStyle: { backgroundColor: colors.bg },
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="profiles" options={{ title: '누가 공부할까요?' }} />
            <Stack.Screen name="study" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="result" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="wordbook" options={{ title: '단어장' }} />
            <Stack.Screen name="mistakes" options={{ title: '오답 노트' }} />
            <Stack.Screen name="levelup" options={{ headerShown: false }} />
            <Stack.Screen name="exam" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="parent" options={{ title: '부모님 모드' }} />
            <Stack.Screen name="parent-dashboard" options={{ title: '학습 리포트' }} />
            <Stack.Screen name="parent-rewards" options={{ title: '보상 요청' }} />
            <Stack.Screen name="parent-settings" options={{ title: '설정' }} />
            <Stack.Screen name="parent-link" options={{ title: '부모님 폰 연결' }} />
            <Stack.Screen name="link" options={{ title: '연결하기' }} />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
