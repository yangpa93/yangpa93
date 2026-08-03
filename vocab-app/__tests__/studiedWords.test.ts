/**
 * 오늘 배운 낱말을 갈래 가리지 않고 세우기.
 *
 * 부모는 일상 문장 · 영어 단어 · 국어를 섞어 공부한다. 갈래를 잘못 붙이면
 * 국어 어휘를 영어 카드로 그리다가 화면이 죽는다 — 생김새가 다르기 때문이다.
 */

import {
  countByKind,
  studiedWords,
  WORD_KIND_LABEL,
  wrongOnes,
} from '../src/features/studiedWords';
import type { KoEntry, VocabEntry } from '../src/types';

const en = { id: 'w1', word: 'save' } as unknown as VocabEntry;
const daily = { id: 'daily-1', word: 'How are you?' } as unknown as VocabEntry;
const ko = { id: 'ko-0001', word: '고진감래' } as unknown as KoEntry;

const SRC = {
  en: { w1: en },
  daily: { 'daily-1': daily },
  ko: { 'ko-0001': ko },
};

describe('studiedWords', () => {
  it('갈래를 가려 붙인다', () => {
    const got = studiedWords(
      [
        { id: 'daily-1', wrong: 0 },
        { id: 'w1', wrong: 2 },
        { id: 'ko-0001', wrong: 1 },
      ],
      SRC,
    );
    expect(got.map((w) => w.kind)).toEqual(['daily', 'en', 'ko']);
    expect(got[1].wrong).toBe(2);
  });

  it('만난 순서를 지킨다', () => {
    // 다시 줄 세우면 "방금 본 그 단어" 를 찾기 어려워진다.
    const got = studiedWords([{ id: 'ko-0001', wrong: 0 }, { id: 'w1', wrong: 0 }], SRC);
    expect(got.map((w) => w.id)).toEqual(['ko-0001', 'w1']);
  });

  it('없어진 낱말은 조용히 버린다', () => {
    /*
     * 어휘 파일에서 낱말이 빠지는 일이 있다(뜻을 못 확인해 뺀 경우). 그 하나
     * 때문에 오늘 목록 전체가 안 뜨면 잃는 것이 훨씬 크다.
     */
    const got = studiedWords([{ id: '없는것', wrong: 0 }, { id: 'w1', wrong: 0 }], SRC);
    expect(got).toHaveLength(1);
    expect(got[0].id).toBe('w1');
  });

  it('Map 으로도 받는다', () => {
    const got = studiedWords([{ id: 'w1', wrong: 0 }], {
      en: new Map([['w1', en]]),
      daily: new Map(),
      ko: new Map(),
    });
    expect(got[0].kind).toBe('en');
  });
});

describe('countByKind', () => {
  it('갈래마다 개수를 센다', () => {
    const words = studiedWords(
      [{ id: 'w1', wrong: 0 }, { id: 'daily-1', wrong: 0 }, { id: 'ko-0001', wrong: 0 }],
      SRC,
    );
    expect(countByKind(words)).toEqual([
      { kind: 'daily', n: 1 },
      { kind: 'en', n: 1 },
      { kind: 'ko', n: 1 },
    ]);
  });

  it('안 한 갈래는 아예 안 적는다', () => {
    // '국어 0개' 가 뜨면 안 한 일이 남아 있는 것처럼 보인다.
    const words = studiedWords([{ id: 'w1', wrong: 0 }], SRC);
    expect(countByKind(words)).toEqual([{ kind: 'en', n: 1 }]);
  });
});

describe('wrongOnes', () => {
  it('틀린 것만 많이 틀린 순서로', () => {
    const words = studiedWords(
      [{ id: 'w1', wrong: 1 }, { id: 'daily-1', wrong: 0 }, { id: 'ko-0001', wrong: 3 }],
      SRC,
    );
    expect(wrongOnes(words).map((w) => w.id)).toEqual(['ko-0001', 'w1']);
  });
});

describe('갈래 이름', () => {
  it('부모 홈의 칩과 같은 말을 쓴다', () => {
    expect(WORD_KIND_LABEL.daily).toBe('일상 문장');
    expect(WORD_KIND_LABEL.en).toBe('영어 단어');
    expect(WORD_KIND_LABEL.ko).toBe('국어');
  });
});
