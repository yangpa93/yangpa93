/** 소리(TTS·효과음)와 진동. 설정에서 끌 수 있고, 실패해도 학습을 막지 않는다. */

import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { Platform } from 'react-native';

/* ---------- 맞았을 때 딩동댕, 틀렸을 때 땡 ---------- */

/**
 * 효과음은 한 번만 만들어 두고 되감아 쓴다.
 *
 * 문제를 풀 때마다 새로 만들면 답을 누르는 순간 소리가 늦게 나온다. 아이는
 * 그 사이에 다음 것을 누르고, 소리가 한 박자씩 밀린 채 따라온다.
 *
 * 진동과 같은 스위치(hapticsEnabled)에 묶지 않는다. 진동은 조용히 해야 하는
 * 자리에서 끄고 싶고 소리는 그 반대라, 한 스위치로 묶으면 둘 중 하나를
 * 포기해야 한다. 소리는 ttsEnabled 를 따른다.
 */
let correctSound: AudioPlayer | null = null;
let wrongSound: AudioPlayer | null = null;

function player(which: 'correct' | 'wrong'): AudioPlayer | null {
  try {
    if (which === 'correct') {
      correctSound ??= createAudioPlayer(require('../../assets/sounds/correct.wav'));
      return correctSound;
    }
    wrongSound ??= createAudioPlayer(require('../../assets/sounds/wrong.wav'));
    return wrongSound;
  } catch {
    // 오디오를 못 여는 기기가 있다. 소리가 없다고 학습을 막을 이유는 없다.
    return null;
  }
}

/**
 * 앱이 뜰 때 한 번 부른다.
 *
 * 무음 스위치를 켠 아이폰에서도 효과음이 나게 하고, 다른 앱의 음악을 끊지
 * 않게 한다. 단어를 들으며 음악을 틀어 두는 아이가 있다.
 */
export async function prepareSounds(): Promise<void> {
  try {
    await setAudioModeAsync({ playsInSilentMode: true, interruptionMode: 'mixWithOthers' });
    player('correct');
    player('wrong');
  } catch {
    /* noop */
  }
}

function play(which: 'correct' | 'wrong', enabled: boolean): void {
  if (!enabled) return;
  const p = player(which);
  if (!p) return;
  try {
    p.seekTo(0);
    p.play();
  } catch {
    /* noop */
  }
}

/** 맞았을 때 — 딩동댕 */
export function soundCorrect(enabled: boolean): void {
  play('correct', enabled);
}

/** 틀렸을 때 — 땡 */
export function soundWrong(enabled: boolean): void {
  play('wrong', enabled);
}

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
