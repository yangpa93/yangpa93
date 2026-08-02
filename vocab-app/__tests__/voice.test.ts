/**
 * 영어를 읽어 줄 목소리 고르기.
 *
 * 여기서 틀리면 아이가 **틀린 발음을 배운다.** 한국어 목소리로 영어를 읽으면
 * 'beautiful' 이 '베아우티풀' 로 나오는데, 오류도 안 나고 소리는 나오니
 * 고장인 줄도 모른다. 기기 없이 확인할 수 있어야 하는 자리다.
 */

import { isEnglish, pickEnglishVoice, SENTENCE_RATE, WORD_RATE, VoiceLike } from '../src/lib/voice';

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

  it('인터넷이 있어야 되는 목소리는 뒤로 미룬다', () => {
    // 지하철에서 앱을 켜면 소리가 안 나는 일을 막는다.
    const got = pickEnglishVoice([
      v({ identifier: 'net', name: 'English (Network)', language: 'en-US' }),
      v({ identifier: 'local', name: 'English', language: 'en-US' }),
    ]);
    expect(got?.identifier).toBe('local');
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
