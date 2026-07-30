/**
 * 과목 순서와 첫 실행 흐름에 관한 규칙.
 *
 * 화면(.tsx)은 react-native 를 끌고 들어와 이 테스트 환경에서 못 돈다.
 * 그래서 화면이 기대는 **저장 규칙**을 여기서 지킨다 — 예전 저장본을 열었을
 * 때 값이 비어 학습 화면이 멎지 않도록.
 */

import { normalizeSubjects } from '../src/store/storage';
import { Subject } from '../src/types';

/** app/study.tsx 가 큐를 잇는 규칙과 같다. */
function order<T>(firstSubject: Subject, en: T[], ko: T[]): T[] {
  return firstSubject === 'ko' ? [...ko, ...en] : [...en, ...ko];
}

describe('과목 순서', () => {
  it('영어 먼저면 영어가 앞에 온다', () => {
    expect(order('en', ['영어1', '영어2'], ['국어1'])).toEqual(['영어1', '영어2', '국어1']);
  });

  it('국어 먼저면 국어가 앞에 온다', () => {
    expect(order('ko', ['영어1', '영어2'], ['국어1'])).toEqual(['국어1', '영어1', '영어2']);
  });

  it('섞지 않는다 — 과목 안의 순서는 그대로다', () => {
    const en = ['a', 'b', 'c'];
    const got = order('ko', en, ['x']);
    expect(got.filter((v) => en.includes(v))).toEqual(en);
  });

  it('한 과목만 켰으면 순서를 골라도 결과가 같다', () => {
    expect(order('ko', ['영어1'], [])).toEqual(order('en', ['영어1'], []));
  });
});

describe('과목 목록 이관', () => {
  it('예전 저장본에는 과목이 없다 — 영어로 채운다', () => {
    expect(normalizeSubjects(undefined)).toEqual(['en']);
  });

  it('빈 배열은 만들 수 없다 — 낼 문제가 없어진다', () => {
    expect(normalizeSubjects([])).toEqual(['en']);
  });

  it('값이 깨져 있어도 영어로 되돌린다', () => {
    expect(normalizeSubjects('영어' as unknown)).toEqual(['en']);
    expect(normalizeSubjects(['수학'] as unknown)).toEqual(['en']);
  });

  it('둘 다 고른 것은 그대로 둔다', () => {
    expect(normalizeSubjects(['ko', 'en'])).toEqual(['en', 'ko']);
  });
});
