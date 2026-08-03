import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider } from '../src/store/AppProvider';
import { PushBridge } from '../src/features/PushBridge';
import { OpenFileBridge } from '../src/features/OpenFileBridge';
import { prepareSounds, prepareVoice } from '../src/lib/feedback';
import { colors } from '../src/theme';

export default function RootLayout() {
  // 효과음을 미리 열어 둔다. 첫 문제를 풀 때 소리가 늦게 나오지 않도록,
  // 그리고 무음 스위치를 켠 아이폰에서도 들리도록.
  //
  // 영어 목소리도 여기서 한 번 정해 둔다. 문제를 풀 때마다 기기의 음성
  // 목록을 훑으면 첫 소리가 늦게 나온다.
  useEffect(() => {
    void prepareSounds();
    void prepareVoice();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppProvider>
          <StatusBar style="dark" />
          <PushBridge />
          {/* 다른 앱이 '열기'로 넘긴 백업 파일을 받아 백업 화면으로 데려간다. */}
          <OpenFileBridge />
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
            <Stack.Screen name="calendar" options={{ title: '학습 달력' }} />
            <Stack.Screen name="settings" options={{ title: '내 설정' }} />
            <Stack.Screen name="levelup" options={{ headerShown: false }} />
            <Stack.Screen name="exam" options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="parent" options={{ title: '부모님 모드' }} />
            <Stack.Screen name="parent-home" options={{ headerShown: false }} />
            {/*
              학습 기록 화면(parent-record)은 없앴다. 부모 홈에 그대로 펼쳐 둔다.
              설정은 parent-settings 가 두 갈래로 나누는 자리이고, 실제 내용은
              parent-child-devices(아이 쪽)와 parent-plan(내 공부)에 있다.
            */}
            <Stack.Screen name="parent-plan" options={{ title: '내 공부 설정' }} />
            <Stack.Screen name="parent-child-devices" options={{ title: '아이들 폰 설정' }} />
            {/* 부모도 영어를 듣는다. 목소리·속도를 고르는 자리가 부모 쪽에도 필요했다. */}
            <Stack.Screen name="parent-sound" options={{ title: '소리와 목소리' }} />
            <Stack.Screen name="parent-children" options={{ title: '아이들 학습 보고서' }} />
            <Stack.Screen name="child-report" options={{ title: '아이 보고서와 설정' }} />
            <Stack.Screen name="parent-dashboard" options={{ title: '학습 리포트' }} />
            <Stack.Screen name="parent-rewards" options={{ title: '보상 요청' }} />
            <Stack.Screen name="parent-settings" options={{ title: '설정' }} />
            <Stack.Screen name="parent-link" options={{ title: '부모님 폰 연결' }} />
            <Stack.Screen name="scan" options={{ headerShown: false }} />
            {/* 부모가 아이 코드를 적는 자리. 부모 폰에는 이 칸이 아예 없었다. */}
            <Stack.Screen name="link-child-code" options={{ title: '코드로 아이 연결하기' }} />
            <Stack.Screen name="backup" options={{ title: '기록 백업' }} />
            <Stack.Screen name="link" options={{ title: '연결하기' }} />
            {/*
              아이 QR 을 **폰 기본 카메라로** 찍고 '링크 열기' 를 눌렀을 때
              받는 자리. 이게 없어서 Unmatched Route 가 났다 — QR 도 카메라도
              멀쩡한데 받을 문이 없었다.
            */}
            <Stack.Screen name="child" options={{ title: '아이 연결하기' }} />
            <Stack.Screen name="whats-new" options={{ title: '이번 판에서 바뀐 것' }} />
            {/*
              없는 화면으로 왔을 때. 제목을 안 정하면 머리에 `+not-found` 가
              그대로 뜬다 — 영어 기본 화면을 우리 말로 바꿔 놓고 제목만 남으면
              고친 값이 반쯤 사라진다.
            */}
            <Stack.Screen name="+not-found" options={{ title: '없는 화면' }} />
          </Stack>
        </AppProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
