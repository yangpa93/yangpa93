/** 소리(TTS·효과음)와 진동. 설정에서 끌 수 있고, 실패해도 학습을 막지 않는다. */

import * as Speech from 'expo-speech';
import * as Haptics from 'expo-haptics';
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { Platform } from 'react-native';
import {
  pickEnglishVoice,
  rankEnglishVoices,
  SENTENCE_RATE,
  WORD_RATE,
  type VoiceLike,
} from './voice';

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

/* ---------- 영어를 읽어 줄 목소리 ---------- */

/**
 * 기기에서 고른 영어 목소리.
 *
 *   undefined — 아직 안 찾아봤다
 *   null      — 찾아봤는데 영어 목소리가 하나도 없다
 *   Voice     — 이걸로 읽는다
 *
 * **왜 목소리를 짚어 주는가.** `language: 'en-US'` 만으로는 부족하다.
 * 안드로이드는 그 언어의 음성이 깔려 있을 때만 그 언어로 읽고, 없으면
 * 기본 엔진(대개 한국어)이 영어 글자를 그대로 읽는다. `beautiful` 이
 * '베아우티풀' 로 나오는 것이 그래서다. 오류도 안 나고 소리는 나오니
 * 고장인 줄도 모르고, 아이는 그 발음을 배운다.
 */
let englishVoice: VoiceLike | null | undefined;

/**
 * 기기에 깔린 목소리를 한 번 훑어 영어 목소리를 정해 둔다.
 *
 * 앱이 뜰 때 부른다. 문제를 풀 때마다 훑으면 첫 소리가 늦게 나온다.
 */
/**
 * 기기에 깔린 영어 목소리 전부. 좋은 것부터.
 *
 * ⚙️ 설정에서 아이가 직접 골라 들어 보게 하려고 들고 있는다. 자동으로 고른
 * 것이 늘 제일 나은 것은 아니고, 무엇보다 **들어 봐야 아는 일**이다.
 */
let englishChoices: VoiceLike[] = [];

/** 아이가 골라 둔 목소리. 없으면 자동으로 고른 것을 쓴다. */
let chosenId: string | null = null;

export function englishVoiceChoices(): VoiceLike[] {
  return englishChoices;
}

/**
 * 아이가 고른 목소리를 적용한다. null 이면 자동으로 되돌린다.
 *
 * 이름을 `use` 로 시작하지 않는다 — 훅이 아니라 그냥 함수인데, 그렇게 지으면
 * 리액트 규칙 검사가 훅으로 오해해서 부를 수 있는 자리를 잘못 제한한다.
 *
 * 모르는 identifier 면 무시한다 — 폰을 바꾸거나 음성을 지우면 저장해 둔
 * 값이 그 기기에 없을 수 있는데, 그때 조용히 안 읽히면 고장으로 보인다.
 */
export function setEnglishVoice(identifier: string | null): void {
  chosenId = identifier && englishChoices.some((v) => v.identifier === identifier)
    ? identifier
    : null;
}

/** 지금 실제로 읽는 목소리. */
function currentVoice(): VoiceLike | null | undefined {
  if (chosenId) return englishChoices.find((v) => v.identifier === chosenId) ?? englishVoice;
  return englishVoice;
}

export async function prepareVoice(): Promise<void> {
  if (englishVoice !== undefined) return;
  try {
    const voices = (await Speech.getAvailableVoicesAsync()) as VoiceLike[];
    /*
     * **목록이 비어 있는 것과 영어가 없는 것은 다르다.**
     *
     * 브라우저는 음성 목록을 늦게 채운다 — 처음 물으면 빈 배열이 오고 잠시
     * 뒤에 채워진다. 그 빈 배열을 '영어 없음'으로 굳히면 웹에서는 영영
     * 조용해진다. 비어 있으면 아직 모르는 것으로 두고 다음에 다시 묻는다.
     */
    if (!voices || voices.length === 0) return;
    englishChoices = rankEnglishVoices(voices);
    englishVoice = pickEnglishVoice(voices);
  } catch {
    // 목록을 못 받는 기기가 있다. 그때는 언어만 지정해 읽어 본다(예전 방식).
  }
}

/**
 * 영어를 읽어 줄 수 있는 상태인지. 설정 화면에서 안내를 띄우는 데 쓴다.
 *
 *   'ready'   — 영어 목소리를 찾았다
 *   'missing' — 기기에 영어 목소리가 없다
 *   'unknown' — 아직 안 찾아봤거나 목록을 못 받았다
 */
export function englishVoiceStatus(): 'ready' | 'missing' | 'unknown' {
  if (englishVoice === undefined) return 'unknown';
  return englishVoice ? 'ready' : 'missing';
}

/** 지금 고른 목소리 이름. 설정 화면에 무엇으로 읽는지 보여준다. */
export function englishVoiceName(): string | null {
  return currentVoice()?.name ?? null;
}

/** 지금 읽는 목소리의 identifier. 설정 화면에서 어느 줄이 켜졌는지 표시하는 데 쓴다. */
export function englishVoiceId(): string | null {
  return currentVoice()?.identifier ?? null;
}

/**
 * 목소리 하나를 그 자리에서 들려준다. 설정 화면의 '들어보기'.
 *
 * 고르기 **전에** 들어 볼 수 있어야 한다. 골라 놓고 공부를 시작해 봐야
 * 아는 것이라면 아무도 안 바꾼다.
 */
export function tryVoice(identifier: string, text = 'Hello! Nice to meet you.'): void {
  try {
    Speech.stop();
    Speech.speak(text, { language: 'en-US', rate: SENTENCE_RATE, voice: identifier });
  } catch {
    /* noop */
  }
}

/**
 * 읽어 준다.
 *
 * `lang` 은 국어 어휘 때문에 있다. 한국어 문장을 en-US 로 읽히면 글자를
 * 하나씩 영어 발음으로 더듬어 알아들을 수 없는 소리가 난다.
 *
 * **영어인데 영어 목소리가 없으면 안 읽는다.** 한국어 엔진이 읽은 영어를
 * 들려주느니 조용한 편이 낫다 — 아이가 그 발음을 그대로 외우기 때문이다.
 * 왜 조용한지는 ⚙️ 설정에서 알려 주고 음성 받는 길을 안내한다.
 */
export function speak(
  text: string,
  enabled: boolean,
  lang = 'en-US',
  rate = SENTENCE_RATE,
): void {
  if (!enabled || !text) return;

  const isEn = lang.toLowerCase().startsWith('en');
  const voice = currentVoice();
  if (isEn && voice === null) return;

  try {
    Speech.stop();
    Speech.speak(text, {
      language: lang,
      rate,
      // 목소리를 못 찾았으면(undefined) 언어만 주고 기기에 맡긴다.
      ...(isEn && voice ? { voice: voice.identifier } : {}),
    });
  } catch {
    // 기기에 TTS 엔진이 없을 수 있다. 조용히 넘어간다.
  }
}

/** 낱말 하나를 읽는다. 문장보다 늦춘다 — 앞뒤가 없어 한 번에 알아듣기 어렵다. */
export function speakWord(text: string, enabled: boolean): void {
  speak(text, enabled, 'en-US', WORD_RATE);
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
