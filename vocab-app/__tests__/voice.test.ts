/**
 * 영어를 읽어 줄 목소리 고르기.
 *
 * 여기서 틀리면 아이가 **틀린 발음을 배운다.** 한국어 목소리로 영어를 읽으면
 * 'beautiful' 이 '베아우티풀' 로 나오는데, 오류도 안 나고 소리는 나오니
 * 고장인 줄도 모른다. 기기 없이 확인할 수 있어야 하는 자리다.
 */

import {
  isEnglish,
  isEnhanced,
  isNetworkVoice,
  pickEnglishVoice,
  rankEnglishVoices,
  SENTENCE_RATE,
  voiceLabel,
  WORD_RATE,
  VoiceLike,
} from '../src/lib/voice';

const v = (o: Partial<VoiceLike> & { identifier: string }): VoiceLike => ({
  name: o.identifier,
  language: 'en-US',
  ...o,
});

describe('isEnglish', () => {
  it('en 으로 시작하는 것만 영어로 본다', () => {
    expect(isEnglish(v({ identifier: 'a', language: 'en-US' }))).toBe(true);
    expect(isEnglish(v({ identifier: 'b', language: 'en-GB' }))).toBe(true);
    expect(isEnglish(v({ identifier: 'c', language: 'en' }))).toBe(true);
    // 안드로이드는 en_US 처럼 밑줄을 쓰기도 한다.
    expect(isEnglish(v({ identifier: 'd', language: 'en_AU' }))).toBe(true);
  });

  it('한국어와 다른 언어는 아니다', () => {
    expect(isEnglish(v({ identifier: 'k', language: 'ko-KR' }))).toBe(false);
    expect(isEnglish(v({ identifier: 'j', language: 'ja-JP' }))).toBe(false);
    // 'eng' 로 시작한다고 영어가 아니다.
    expect(isEnglish(v({ identifier: 'x', language: 'engala' }))).toBe(false);
  });
});

describe('pickEnglishVoice', () => {
  it('영어 목소리가 없으면 null', () => {
    // 한국에서 산 폰은 한국어 음성만 깔려 나오는 일이 흔하다.
    // 이때 null 을 돌려줘야 앱이 아예 안 읽는다.
    const got = pickEnglishVoice([
      v({ identifier: 'ko1', language: 'ko-KR' }),
      v({ identifier: 'ko2', language: 'ko-KR' }),
    ]);
    expect(got).toBeNull();
  });

  it('목록이 비어도 죽지 않는다', () => {
    expect(pickEnglishVoice([])).toBeNull();
  });

  it('미국 영어를 영국 영어보다 먼저 고른다', () => {
    // 우리 예문과 아이들이 학교에서 듣는 것이 미국 영어다.
    const got = pickEnglishVoice([
      v({ identifier: 'gb', language: 'en-GB' }),
      v({ identifier: 'us', language: 'en-US' }),
    ]);
    expect(got?.identifier).toBe('us');
  });

  it('같은 미국 영어면 고품질을 먼저 고른다', () => {
    const got = pickEnglishVoice([
      v({ identifier: 'plain', language: 'en-US' }),
      v({ identifier: 'enh', language: 'en-US', quality: 'Enhanced' }),
    ]);
    expect(got?.identifier).toBe('enh');
  });

  it('인터넷을 쓰는 목소리를 **먼저** 고른다', () => {
    /*
     * 처음에는 반대였다 — 지하철에서 조용해지는 것이 걱정돼 network 를 뒤로
     * 미뤘다. 그런데 폰에서 발음이 어색하다는 말을 들었고, 이유가 바로 이
     * 규칙이었다. 안드로이드에서 자연스러운 것은 구글의 `-network` 음성이고
     * 기기에 기본으로 깔린 `-local` 은 낱말을 이어 붙인 듯한 소리가 난다.
     * 발음을 배우는 앱에서 어색한 소리는 없는 것만 못하다.
     */
    const got = pickEnglishVoice([
      v({ identifier: 'en-us-x-sfg-local', name: 'English', language: 'en-US' }),
      v({ identifier: 'en-us-x-tpd-network', name: 'English', language: 'en-US' }),
    ]);
    expect(got?.identifier).toBe('en-us-x-tpd-network');
  });

  it('고품질이 인터넷보다도 먼저다', () => {
    // 기기에 받아 둔 고품질 음성이 가장 자연스럽고 인터넷도 안 쓴다.
    const got = pickEnglishVoice([
      v({ identifier: 'net', name: 'English network', language: 'en-US' }),
      v({ identifier: 'enh', name: 'English', language: 'en-US', quality: 'Enhanced' }),
    ]);
    expect(got?.identifier).toBe('enh');
  });

  it('compact 는 뒤로 미룬다', () => {
    // 이름에 그대로 적혀 있는 저용량 음성이다. 소리가 눌린 듯 들린다.
    const got = pickEnglishVoice([
      v({ identifier: 'a-compact', name: 'English compact', language: 'en-US' }),
      v({ identifier: 'z-plain', name: 'English', language: 'en-US' }),
    ]);
    expect(got?.identifier).toBe('z-plain');
  });

  it('고를 이유가 같으면 늘 같은 것을 고른다', () => {
    // 폰마다 다른 것이 걸리면 "발음이 이상하다"가 어디서 나온 말인지
    // 가릴 수가 없다. identifier 순으로 못박는다.
    const voices = [
      v({ identifier: 'zz', language: 'en-US' }),
      v({ identifier: 'aa', language: 'en-US' }),
      v({ identifier: 'mm', language: 'en-US' }),
    ];
    expect(pickEnglishVoice(voices)?.identifier).toBe('aa');
    expect(pickEnglishVoice([...voices].reverse())?.identifier).toBe('aa');
  });

  it('한국어가 섞여 있어도 영어만 고른다', () => {
    const got = pickEnglishVoice([
      v({ identifier: 'ko', language: 'ko-KR', quality: 'Enhanced' }),
      v({ identifier: 'en', language: 'en-US' }),
    ]);
    expect(got?.identifier).toBe('en');
  });
});

describe('읽는 속도', () => {
  it('낱말은 문장보다 느리게 읽는다', () => {
    // 낱말은 앞뒤가 없어 한 번에 알아듣기 어렵고, 따라 말해 보는 자리다.
    expect(WORD_RATE).toBeLessThan(SENTENCE_RATE);
  });

  it('알아들을 수 없을 만큼 늦추지는 않는다', () => {
    expect(WORD_RATE).toBeGreaterThanOrEqual(0.5);
    expect(SENTENCE_RATE).toBeLessThanOrEqual(1);
  });
});

describe('rankEnglishVoices', () => {
  it('좋은 것부터 줄 세운다', () => {
    const got = rankEnglishVoices([
      v({ identifier: 'compact', name: 'English compact', language: 'en-US' }),
      v({ identifier: 'plain', name: 'English', language: 'en-US' }),
      v({ identifier: 'net', name: 'English network', language: 'en-US' }),
      v({ identifier: 'enh', name: 'English', language: 'en-US', quality: 'Enhanced' }),
      v({ identifier: 'ko', name: '한국어', language: 'ko-KR' }),
    ]);
    // 한국어는 아예 빠지고, 나머지는 고품질 → 인터넷 → 보통 → compact 순.
    expect(got.map((x) => x.identifier)).toEqual(['enh', 'net', 'plain', 'compact']);
  });

  it('영어가 없으면 빈 목록', () => {
    expect(rankEnglishVoices([v({ identifier: 'ko', language: 'ko-KR' })])).toEqual([]);
  });

  it('맨 앞이 곧 자동으로 고르는 것', () => {
    // 두 함수가 어긋나면 설정 화면에 켜진 줄과 실제로 읽는 목소리가 달라진다.
    const list = [
      v({ identifier: 'b', language: 'en-GB' }),
      v({ identifier: 'a', language: 'en-US' }),
    ];
    expect(pickEnglishVoice(list)?.identifier).toBe(rankEnglishVoices(list)[0].identifier);
  });
});

describe('voiceLabel', () => {
  it('어느 나라 영어인지 적는다', () => {
    expect(voiceLabel(v({ identifier: 'a', language: 'en-US' }))).toContain('미국');
    expect(voiceLabel(v({ identifier: 'b', language: 'en-GB' }))).toContain('영국');
    expect(voiceLabel(v({ identifier: 'c', language: 'en-AU' }))).toContain('호주');
  });

  it('인터넷이 필요하면 그렇게 적는다', () => {
    // 지하철에서 왜 조용한지 알 수 있어야 스스로 바꾼다.
    const label = voiceLabel(v({ identifier: 'x', name: 'English network', language: 'en-US' }));
    expect(label).toContain('인터넷 필요');
  });

  it('고품질이면 그렇게 적는다', () => {
    const label = voiceLabel(v({ identifier: 'x', language: 'en-US', quality: 'Enhanced' }));
    expect(label).toContain('고품질');
  });
});

describe('isNetworkVoice / isEnhanced', () => {
  it('identifier 에만 적혀 있어도 알아본다', () => {
    // 안드로이드는 이름은 그냥 'English' 인데 identifier 에 -network 가 붙는다.
    expect(isNetworkVoice(v({ identifier: 'en-us-x-tpd-network', name: 'English' }))).toBe(true);
    expect(isNetworkVoice(v({ identifier: 'en-us-x-tpd-local', name: 'English' }))).toBe(false);
  });

  it('Enhanced 만 고품질로 본다', () => {
    expect(isEnhanced(v({ identifier: 'a', quality: 'Enhanced' }))).toBe(true);
    expect(isEnhanced(v({ identifier: 'b', quality: 'Default' }))).toBe(false);
    expect(isEnhanced(v({ identifier: 'c' }))).toBe(false);
  });
});
