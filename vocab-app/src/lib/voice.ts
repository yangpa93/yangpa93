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

/** 인터넷이 있어야 소리가 나는 목소리인지. 안드로이드 구글 음성이 이렇게 나뉜다. */
export function isNetworkVoice(v: VoiceLike): boolean {
  return /network/i.test(`${v.identifier ?? ''} ${v.name ?? ''}`);
}

/** 기기에 받아 둔 고품질 음성인지. */
export function isEnhanced(v: VoiceLike): boolean {
  return (v.quality ?? '') === 'Enhanced';
}

/**
 * 영어 목소리를 **좋은 것부터** 줄 세운다.
 *
 * ── 왜 순서를 바꿨는가 ───────────────────────────────────────
 *
 * 처음에는 이름에 'network' 가 든 목소리를 **뒤로 미뤘다.** 인터넷이 있어야
 * 소리가 나서 지하철에서 조용해지는 것이 걱정이었다.
 *
 * 그런데 폰에서 발음이 어색하다는 말을 들었다. 노트북(윈도우)에서는 자연스러웠
 * 는데 폰만 그랬다. 이유가 바로 그 규칙이었다 — 안드로이드에서 자연스러운
 * 것은 구글의 `-network` 음성이고, 기기에 기본으로 깔린 `-local` 은 낱말을
 * 이어 붙인 듯한 소리가 난다. 자연스러운 쪽을 일부러 피하고 있었던 것이다.
 *
 * 그래서 **자연스러움을 먼저** 본다. 발음을 배우는 앱에서 소리가 어색하면
 * 그 소리는 없는 것만 못하다. 인터넷이 없을 때를 걱정하기보다, 화면에서
 * 목소리를 직접 고를 수 있게 하고 어느 것이 인터넷을 쓰는지 적어 두는 편이
 * 낫다 — 그러면 지하철에서 쓰는 집은 스스로 바꿀 수 있다.
 *
 * 점수 매기는 차례:
 *
 *  1. **고품질(Enhanced)** — 기기에 따로 받아 둔 음성. 가장 자연스럽다.
 *  2. **network** — 구글 서버가 읽어 준다. local 보다 확실히 낫다.
 *  3. **미국 영어** — 우리 예문과 아이들이 학교에서 듣는 것이 미국 영어다.
 *  4. compact 는 뒤로 — 이름에 그대로 적혀 있는 저용량 음성이다.
 *  5. 그래도 같으면 identifier 순. 폰마다 다른 것이 걸리면 "발음이 이상하다"가
 *     어디서 나온 말인지 가릴 수가 없다.
 */
export function rankEnglishVoices(voices: VoiceLike[]): VoiceLike[] {
  const english = (voices ?? []).filter(isEnglish);

  const score = (v: VoiceLike): number => {
    const lang = (v.language ?? '').replace('_', '-').toLowerCase();
    let n = 0;
    if (isEnhanced(v)) n += 12;
    if (isNetworkVoice(v)) n += 8;
    if (lang.startsWith('en-us')) n += 4;
    else if (lang.startsWith('en-gb')) n += 2;
    if (/compact/i.test(`${v.identifier ?? ''} ${v.name ?? ''}`)) n -= 6;
    return n;
  };

  return [...english].sort((a, b) => {
    const d = score(b) - score(a);
    return d !== 0 ? d : (a.identifier ?? '').localeCompare(b.identifier ?? '');
  });
}

/** 가장 자연스러운 영어 목소리 하나. 없으면 null. */
export function pickEnglishVoice(voices: VoiceLike[]): VoiceLike | null {
  return rankEnglishVoices(voices)[0] ?? null;
}

/**
 * 화면에 쓸 이름.
 *
 * 안드로이드 목소리 이름은 `en-us-x-tpd-network` 처럼 사람이 읽으라고 만든
 * 것이 아니다. 그대로 늘어놓으면 무엇을 골라야 할지 알 수 없어서, 아는 만큼
 * 풀어 적는다. 그래도 모르겠으면 **들어 보고 고르면 된다** — 그래서 목록마다
 * 들어보기 버튼을 둔다.
 */
export function voiceLabel(v: VoiceLike): string {
  const lang = (v.language ?? '').replace('_', '-').toLowerCase();
  const where = lang.startsWith('en-us')
    ? '미국'
    : lang.startsWith('en-gb')
      ? '영국'
      : lang.startsWith('en-au')
        ? '호주'
        : lang.startsWith('en-in')
          ? '인도'
          : '영어';
  const marks: string[] = [];
  if (isEnhanced(v)) marks.push('고품질');
  if (isNetworkVoice(v)) marks.push('인터넷 필요');
  return marks.length > 0 ? `${where} · ${marks.join(' · ')}` : where;
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

/**
 * 아이가 고를 수 있는 읽는 속도.
 *
 * **왜 앱 안에 두는가.** 안드로이드 설정에도 '말하는 속도' 가 있지만 그것은
 * 우리 앱에 안 먹는다 — 앱이 speak 할 때마다 속도를 직접 지정하고 있어서,
 * 시스템 값은 그 순간 덮인다(expo-speech 의 setSpeechRate). 폰 설정에서
 * 슬라이더를 아무리 움직여도 앱에서는 그대로인데, 미리듣기에서는 바뀌니
 * "됐는 줄 알았는데 안 되는" 가장 나쁜 모양이 된다.
 *
 * 그래서 고르는 자리를 앱 안에 둔다. 값은 셋뿐이다 — 슬라이더로 두면 아이가
 * 0.01 단위를 만지작거리다 알아들을 수 없는 속도에 두고 만다.
 */
export const SPEECH_RATES = [
  { label: '느리게', value: 0.7 },
  { label: '보통', value: SENTENCE_RATE },
  { label: '빠르게', value: 1.05 },
] as const;

/** 낱말은 문장보다 이만큼 더 늦춘다. 앞뒤가 없어 한 번에 알아듣기 어렵다. */
export const WORD_RATE_SCALE = WORD_RATE / SENTENCE_RATE;

/** 고를 수 있는 값 중 하나로 맞춘다. 저장본이 깨져도 이상한 속도가 안 나오게. */
export function snapRate(n: unknown): number {
  if (typeof n !== 'number' || !Number.isFinite(n)) return SENTENCE_RATE;
  let best = SPEECH_RATES[0].value as number;
  for (const r of SPEECH_RATES) {
    if (Math.abs(r.value - n) < Math.abs(best - n)) best = r.value;
  }
  return best;
}
