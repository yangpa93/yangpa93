/**
 * 영어를 읽어 줄 목소리를 고른다.
 *
 * ── 왜 필요한가 ──────────────────────────────────────────────
 *
 * `Speech.speak(text, { language: 'en-US' })` 만으로는 부족하다. 안드로이드는
 * **그 언어의 음성이 깔려 있을 때만** 그 언어로 읽는다. 한국에서 산 폰은
 * 한국어 음성만 깔려 나오는 경우가 많고, 그러면 영어 글자를 한국어 엔진이
 * 읽는다. `beautiful` 이 '베아우티풀' 로 나오는 것이 그래서다.
 *
 * 더 나쁜 것은 **조용히** 그렇게 된다는 점이다. 오류도 안 나고 소리는 나오니
 * 앱이 고장 났다고 생각하지 않고, 아이는 그 발음을 그대로 배운다.
 *
 * 그래서 기기에 깔린 목소리를 직접 훑어 **진짜 영어 목소리**를 고르고, 그
 * 목소리를 지정해서 읽힌다. 하나도 없으면 **아예 안 읽는다** — 틀린 발음을
 * 들려주느니 조용한 편이 낫다. 대신 설정 화면에서 왜 소리가 안 나는지
 * 알려 주고 음성을 받는 길을 안내한다.
 *
 * 화면(react-native)을 안 끌어온다. 고르는 규칙은 기기 없이 확인할 수 있어야 한다.
 */

/** expo-speech 의 Voice 에서 우리가 쓰는 칸만. 테스트에서 만들기 쉽게 좁혔다. */
export interface VoiceLike {
  identifier: string;
  name: string;
  language: string;
  /** 'Enhanced' 면 기기에 받아 둔 고품질 음성이다. */
  quality?: string;
}

/** 그 목소리가 영어인지. `en-US` · `en_GB` · `en` 을 모두 받는다. */
export function isEnglish(v: VoiceLike): boolean {
  const lang = (v.language ?? '').replace('_', '-').toLowerCase();
  return lang === 'en' || lang.startsWith('en-');
}

/**
 * 영어 목소리 하나를 고른다. 없으면 null.
 *
 * 고르는 순서에 이유가 있다.
 *
 *  1. **미국 영어를 먼저.** 우리 예문과 아이들이 학교에서 듣는 것이 미국
 *     영어다. 영국 영어로 읽으면 같은 낱말이 다르게 들려 아이가 헷갈린다.
 *  2. **고품질(Enhanced)을 먼저.** 기기에 따로 받아 둔 음성이라 훨씬 자연스럽다.
 *  3. 그다음은 이름 순. 어느 것을 골라도 상관없을 때 **기기마다 다른 것이
 *     걸리지 않게** 못박아 둔다 — 같은 문장이 폰마다 다르게 들리면
 *     "발음이 이상하다"는 말이 어디서 나온 것인지 가릴 수가 없다.
 *
 * 이름에 'network' 가 든 것은 뒤로 미룬다. 인터넷이 있어야 소리가 나서,
 * 지하철에서 앱을 켜면 조용해진다.
 */
export function pickEnglishVoice(voices: VoiceLike[]): VoiceLike | null {
  const english = (voices ?? []).filter(isEnglish);
  if (english.length === 0) return null;

  const score = (v: VoiceLike): number => {
    const lang = (v.language ?? '').replace('_', '-').toLowerCase();
    let n = 0;
    if (lang.startsWith('en-us')) n += 8;
    else if (lang.startsWith('en-gb')) n += 4;
    if ((v.quality ?? '') === 'Enhanced') n += 2;
    if (/network/i.test(v.name ?? '')) n -= 1;
    return n;
  };

  return [...english].sort((a, b) => {
    const d = score(b) - score(a);
    return d !== 0 ? d : (a.identifier ?? '').localeCompare(b.identifier ?? '');
  })[0];
}

/**
 * 읽는 속도.
 *
 * 기본값 1.0 은 어른에게 맞춘 속도다. 아이가 처음 듣는 문장을 따라가려면
 * 조금 느려야 하는데, 너무 늦추면 낱말 사이가 벌어져 오히려 안 들린다.
 * 0.9 정도가 문장의 억양을 살리면서 따라갈 수 있는 선이다.
 *
 * 낱말 하나를 읽을 때는 더 늦춘다. 문장과 달리 앞뒤가 없어서 한 번에
 * 알아듣기 어렵고, 아이가 따라 말해 보는 자리이기 때문이다.
 */
export const SENTENCE_RATE = 0.9;
export const WORD_RATE = 0.75;
