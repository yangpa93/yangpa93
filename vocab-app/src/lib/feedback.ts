/** 소리(TTS)와 진동. 설정에서 끌 수 있고, 실패해도 학습을 막지 않는다. */

import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

export function speak(text: string, enabled: boolean, rate = 0.9): void {
  if (!enabled || !text) return;
  try {
    Speech.stop();
    Speech.speak(text, { language: 'en-US', rate });
  } catch {
    // 기기에 TTS 엔진이 없을 수 있다. 조용히 넘어간다.
  }
}

export function stopSpeaking(): void {
  try {
    Speech.stop();
  } catch {
    /* noop */
  }
}

export function tapCorrect(enabled: boolean): void {
  if (!enabled || Platform.OS === 'web') return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
}

export function tapWrong(enabled: boolean): void {
  if (!enabled || Platform.OS === 'web') return;
  void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
}

export function tapLight(enabled: boolean): void {
  if (!enabled || Platform.OS === 'web') return;
  void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}
