/**
 * 오늘 배운 낱말을 갈래 가리지 않고 세우기.
 *
 * 부모는 일상 문장 · 영어 단어 · 국어를 섞어 공부한다. 갈래를 잘못 붙이면
 * 국어 어휘를 영어 카드로 그리다가 화면이 죽는다 — 생김새가 다르기 때문이다.
 */

import {
  countByKind,
  dayBySubject,
  troubleAll,
  sessionMissed,
  studiedWords,
  WORD_KIND_LABEL,
  wrongOnes,
} from '../src/features/studiedWords';
import type { DailyRecord, KoEntry, VocabEntry } from '../src/types';

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

describe('sessionMissed — 방금 판에서 틀린 것', () => {
  it('국어를 찾아낸다', () => {
    /*
     * 결과 화면이 영어와 일상 문장 목록에서만 찾고 있었다. 그래서 국어를
     * 공부하고 틀려도 「오늘 틀린 단어」 에 아무것도 안 떴다.
     */
    const got = sessionMissed(['ko-0001'], SRC);
    expect(got.map((w) => w.kind)).toEqual(['ko']);
    expect(got[0].entry.word).toBe('고진감래');
  });

  it('넘겨받은 것만 본다 — 하루 기록을 뒤지지 않는다', () => {
    /*
     * 갈래를 따로 들어가 풀게 한 뒤로 하루에 판이 둘 이상이다. 아침 영어
     * 판에서 틀린 w1 이 저녁 국어 판 결과에 끼면 안 된다.
     */
    const got = sessionMissed(['ko-0001'], SRC);
    expect(got.map((w) => w.id)).toEqual(['ko-0001']);
  });

  it('같은 낱말을 두 번 틀리면 한 줄로 묶고 횟수를 센다', () => {
    const got = sessionMissed(['w1', 'ko-0001', 'w1'], SRC);
    expect(got.map((w) => w.id)).toEqual(['w1', 'ko-0001']);
    expect(got[0].wrong).toBe(2);
  });

  it('처음 틀린 순서를 지킨다', () => {
    const got = sessionMissed(['ko-0001', 'daily-1', 'w1'], SRC);
    expect(got.map((w) => w.id)).toEqual(['ko-0001', 'daily-1', 'w1']);
  });

  it('여섯 개까지만 적는다', () => {
    // 결과 화면은 스크롤 없이 한눈에 들어와야 하는 자리다.
    const ids = Array.from({ length: 9 }, (_, i) => `many-${i}`);
    const src = { en: Object.fromEntries(ids.map((id) => [id, { id, word: id }])), daily: {}, ko: {} };
    expect(sessionMissed(ids, src as never)).toHaveLength(6);
  });

  it('다 맞혔으면 비어 있다', () => {
    expect(sessionMissed([], SRC)).toEqual([]);
  });
});

describe('갈래 이름', () => {
  it('부모 홈의 칩과 같은 말을 쓴다', () => {
    expect(WORD_KIND_LABEL.daily).toBe('일상 문장');
    expect(WORD_KIND_LABEL.en).toBe('영어 단어');
    expect(WORD_KIND_LABEL.ko).toBe('국어');
  });
});

describe('dayBySubject — 하루를 갈래별로 가르기', () => {
  /** 날짜별 보고서가 읽어 갈 하루 기록 하나. */
  const day = (over: Partial<DailyRecord> = {}): DailyRecord => ({
    date: '2026-08-15',
    goal: 15,
    studied: 3,
    correct: 8,
    wrong: 3,
    seconds: 300,
    completed: true,
    wrongEntryIds: [],
    studiedEntryIds: [],
    ...over,
  });

  it('영어와 국어를 갈라 센다', () => {
    const got = dayBySubject(
      day({
        bySubject: {
          en: { studied: 1, correct: 4, wrong: 1 },
          ko: { studied: 1, correct: 3, wrong: 2 },
        },
      }),
      SRC,
    );
    expect(got?.map((s) => s.subject)).toEqual(['en', 'ko']);
    expect(got?.[0].correct).toBe(4);
    expect(got?.[1].wrong).toBe(2);
  });

  it('정답률을 갈래마다 따로 낸다', () => {
    /*
     * 합쳐 놓으면 8/11 로 73% 한 줄인데, 갈라 보면 영어 80% · 국어 60% 다.
     * 어느 쪽이 처지는지는 갈라야만 보인다.
     */
    const got = dayBySubject(
      day({
        bySubject: {
          en: { studied: 1, correct: 4, wrong: 1 },
          ko: { studied: 1, correct: 3, wrong: 2 },
        },
      }),
      SRC,
    );
    expect(got?.[0].accuracy).toBeCloseTo(0.8);
    expect(got?.[1].accuracy).toBeCloseTo(0.6);
  });

  it('갈래별로 나눠 적기 전의 날은 null 이다', () => {
    /*
     * 어림잡아 채우지 않는다. 그러면 아이가 받은 적 없는 정답률이 부모 화면에
     * 숫자로 뜬다. 화면이 "나눠 적기 전이에요" 라고 밝히게 null 을 준다.
     */
    expect(dayBySubject(day(), SRC)).toBeNull();
  });

  it('안 푼 갈래는 빼고 준다', () => {
    // '국어 0개' 가 뜨면 안 한 일이 남아 있는 것처럼 보인다.
    const got = dayBySubject(
      day({ bySubject: { en: { studied: 1, correct: 4, wrong: 1 }, ko: { studied: 0, correct: 0, wrong: 0 } } }),
      SRC,
    );
    expect(got?.map((s) => s.subject)).toEqual(['en']);
  });

  it('틀린 낱말을 갈래에 맞춰 나눠 담는다', () => {
    /*
     * 달력이 영어 목록에서만 찾고 있어서 국어를 틀린 날에도 「이 날 틀린 단어」
     * 가 비어 있었다. 결과 화면과 똑같은 자리에서 똑같이 틀렸다.
     */
    const got = dayBySubject(
      day({
        wrongEntryIds: ['w1', 'ko-0001', 'ko-0001'],
        bySubject: {
          en: { studied: 1, correct: 4, wrong: 1 },
          ko: { studied: 1, correct: 3, wrong: 2 },
        },
      }),
      SRC,
    );
    expect(got?.[0].missed.map((w) => w.entry.word)).toEqual(['save']);
    expect(got?.[1].missed.map((w) => w.entry.word)).toEqual(['고진감래']);
    // 두 번 틀린 것은 두 번으로 센다.
    expect(got?.[1].missed[0].wrong).toBe(2);
  });

  it('많이 틀린 것부터 적고, 다섯 개까지만 준다', () => {
    const ids = Array.from({ length: 8 }, (_, i) => `many-${i}`);
    const src = {
      en: Object.fromEntries(ids.map((id) => [id, { id, word: id }])),
      daily: {},
      ko: {},
    };
    const got = dayBySubject(
      day({
        // many-0 을 세 번, many-1 을 두 번, 나머지는 한 번씩 틀렸다.
        wrongEntryIds: [...ids, 'many-0', 'many-0', 'many-1'],
        bySubject: { en: { studied: 8, correct: 1, wrong: 11 } },
      }),
      src as never,
    );
    expect(got?.[0].missed).toHaveLength(5);
    expect(got?.[0].missed[0].entry.word).toBe('many-0');
    expect(got?.[0].missed[1].entry.word).toBe('many-1');
  });

  it('한 문제도 안 물은 갈래의 정답률은 null 이다', () => {
    // 0% 는 '다 틀렸다' 는 뜻이라 안 푼 것과 같은 칸에 적으면 안 된다.
    const got = dayBySubject(
      day({ bySubject: { en: { studied: 2, correct: 0, wrong: 0 } } }),
      SRC,
    );
    expect(got?.[0].accuracy).toBeNull();
  });
});


describe('troubleAll — 많이 틀린 낱말', () => {
  /** 오답 노트가 읽는 낱말 카드. 누적 통계가 여기 있다. */
  const card = (entryId: string, wrong: number, correct = 0) => ({ entryId, wrong, correct });

  it('국어도 찾는다 ★', () => {
    /*
     * 여기가 통째로 빠져 있었다. 오답 노트는 영어 어휘만 넘겨 받는 함수를
     * 써서, 국어를 아무리 틀려도 「많이 틀린 단어」 에 안 올라왔다.
     */
    const got = troubleAll({ a: card('ko-0001', 3) }, SRC);
    expect(got.map((w) => w.kind)).toEqual(['ko']);
    expect(got[0].entry.word).toBe('고진감래');
  });

  it('많이 틀린 것부터 줄 세운다', () => {
    const got = troubleAll(
      { a: card('w1', 1), b: card('ko-0001', 5), c: card('daily-1', 3) },
      SRC,
    );
    expect(got.map((w) => w.id)).toEqual(['ko-0001', 'daily-1', 'w1']);
  });

  it('틀린 횟수가 같으면 정답률이 낮은 쪽을 먼저', () => {
    const got = troubleAll({ a: card('w1', 2, 8), b: card('ko-0001', 2, 1) }, SRC);
    expect(got[0].id).toBe('ko-0001');
  });

  it('한 번도 안 틀린 것은 안 담는다', () => {
    expect(troubleAll({ a: card('w1', 0, 5) }, SRC)).toEqual([]);
  });

  it('없어진 낱말을 버린 만큼 목록이 짧아지지 않는다', () => {
    /*
     * 자르는 것은 **찾은 뒤에** 한다. 먼저 잘라 두면 어휘에서 빠진 낱말이
     * 자리를 차지한 채 버려져, 화면에 보이는 개수가 들쭉날쭉해진다.
     */
    const got = troubleAll(
      { a: card('없는것', 9), b: card('w1', 5), c: card('ko-0001', 4) },
      SRC,
      2,
    );
    expect(got).toHaveLength(2);
    expect(got.map((w) => w.id)).toEqual(['w1', 'ko-0001']);
  });
});
