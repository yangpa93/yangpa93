/**
 * 월간 리포트.
 *
 * 여기 숫자가 틀리면 아이가 받을 보상이 달라진다. 개근 판정과 '지난 날'을
 * 세는 방법을 특히 못박아 둔다.
 */

import { buildMonthlyReport, monthlyHeadline } from '../src/features/monthly';
import { createCard, grade } from '../src/srs/scheduler';
import { CardState, DailyRecord, ExamResult, LevelId, VocabEntry } from '../src/types';

const ENTRIES: VocabEntry[] = ['a', 'b', 'c'].map((id) => ({
  id,
  level: 'm1-1' as LevelId,
  kind: 'word' as const,
  word: id,
  pos: 'n.',
  senses: [{ meaning: '뜻', synonyms: [], examples: [{ en: 'A b.', ko: '가.' }] }],
  source: 'curriculum' as const,
}));

function day(date: string, over: Partial<DailyRecord> = {}): DailyRecord {
  return {
    date,
    goal: 10,
    studied: 10,
    correct: 8,
    wrong: 2,
    seconds: 600,
    completed: true,
    wrongEntryIds: [],
    ...over,
  };
}

function daysOf(month: string, count: number, over: Partial<DailyRecord> = {}) {
  const out: Record<string, DailyRecord> = {};
  for (let i = 1; i <= count; i++) {
    const k = `${month}-${String(i).padStart(2, '0')}`;
    out[k] = day(k, over);
  }
  return out;
}

/** 그 달 안의 epoch ms */
function at(month: string, d: number): number {
  const [y, m] = month.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0).getTime();
}

describe('buildMonthlyReport', () => {
  it('지난 달은 그 달 전체를 지난 날로 센다', () => {
    const r = buildMonthlyReport('2026-06', daysOf('2026-06', 30), {}, [], ENTRIES, '2026-07-15');
    expect(r.totalDays).toBe(30);
    expect(r.elapsedDays).toBe(30);
    expect(r.studiedDays).toBe(30);
    expect(r.perfect).toBe(true);
  });

  it('이번 달은 오늘까지만 지난 날로 센다', () => {
    // 31일 중 9일만 지났는데 9일을 다 했으면, 못한 것이 아니라 다 한 것이다.
    const r = buildMonthlyReport('2026-07', daysOf('2026-07', 9), {}, [], ENTRIES, '2026-07-09');
    expect(r.elapsedDays).toBe(9);
    expect(r.studiedDays).toBe(9);
    expect(r.perfectAlive).toBe(true);
    // 아직 남은 날이 있으므로 개근은 확정이 아니다.
    expect(r.perfect).toBe(false);
  });

  it('하루라도 빠지면 개근을 노릴 수 없다', () => {
    const days = daysOf('2026-07', 9);
    delete days['2026-07-05'];
    const r = buildMonthlyReport('2026-07', days, {}, [], ENTRIES, '2026-07-09');
    expect(r.studiedDays).toBe(8);
    expect(r.perfectAlive).toBe(false);
  });

  it('그 달이 끝나야 개근이 확정된다', () => {
    // 30일까지 다 했지만 7월은 31일까지다.
    const r = buildMonthlyReport('2026-07', daysOf('2026-07', 30), {}, [], ENTRIES, '2026-07-30');
    expect(r.perfect).toBe(false);
    expect(r.perfectAlive).toBe(true);
  });

  it('그 달에 처음 만난 단어만 센다', () => {
    const cards: Record<string, CardState> = {
      a: { ...createCard('a'), firstSeen: at('2026-07', 3), lastSeen: at('2026-07', 3) },
      b: { ...createCard('b'), firstSeen: at('2026-06', 20), lastSeen: at('2026-06', 20) },
      c: { ...createCard('c'), firstSeen: at('2026-07', 28), lastSeen: at('2026-07', 28) },
    };
    const r = buildMonthlyReport('2026-07', {}, cards, [], ENTRIES, '2026-07-30');
    expect(r.newWords).toBe(2);
  });

  it('우리 어휘에 없는 카드는 세지 않는다', () => {
    // 레벨을 다시 짜면서 사라진 단어의 카드가 남아 있을 수 있다.
    const cards: Record<string, CardState> = {
      a: { ...createCard('a'), firstSeen: at('2026-07', 3), lastSeen: at('2026-07', 3) },
      없어진단어: { ...createCard('없어진단어'), firstSeen: at('2026-07', 3), lastSeen: at('2026-07', 3) },
    };
    const r = buildMonthlyReport('2026-07', {}, cards, [], ENTRIES, '2026-07-30');
    expect(r.newWords).toBe(1);
  });

  it('그 달에 통과한 레벨만 센다. 떨어진 것은 빼고', () => {
    const exams: ExamResult[] = [
      { level: 'm1-1', total: 10, firstTryCorrect: 10, retries: 0, passed: true, seconds: 60, at: at('2026-07', 5) },
      { level: 'm1-2', total: 10, firstTryCorrect: 3, retries: 2, passed: false, seconds: 60, at: at('2026-07', 9) },
      { level: 'm1-3', total: 10, firstTryCorrect: 10, retries: 0, passed: true, seconds: 60, at: at('2026-06', 9) },
    ];
    const r = buildMonthlyReport('2026-07', {}, {}, exams, ENTRIES, '2026-07-30');
    expect(r.levelsPassed).toEqual(['m1-1']);
  });

  it('같은 레벨을 두 번 통과해도 하나로 센다', () => {
    const e = (at_: number): ExamResult => ({
      level: 'm1-1', total: 10, firstTryCorrect: 10, retries: 0, passed: true, seconds: 60, at: at_,
    });
    const r = buildMonthlyReport('2026-07', {}, {}, [e(at('2026-07', 5)), e(at('2026-07', 8))], ENTRIES, '2026-07-30');
    expect(r.levelsPassed).toEqual(['m1-1']);
  });

  it('가장 오래 이어서 한 날을 센다', () => {
    const days = { ...daysOf('2026-07', 12) };
    delete days['2026-07-04'];
    delete days['2026-07-05'];
    const r = buildMonthlyReport('2026-07', days, {}, [], ENTRIES, '2026-07-12');
    // 1~3(3일), 6~12(7일)
    expect(r.bestStreak).toBe(7);
  });

  it('아직 안 온 날은 연속을 끊지 않는다', () => {
    const r = buildMonthlyReport('2026-07', daysOf('2026-07', 5), {}, [], ENTRIES, '2026-07-05');
    expect(r.bestStreak).toBe(5);
  });

  it('정답률은 그 달 전체로 센다', () => {
    const r = buildMonthlyReport('2026-07', daysOf('2026-07', 10), {}, [], ENTRIES, '2026-07-10');
    expect(r.answered).toBe(100);
    expect(r.correct).toBe(80);
    expect(r.accuracy).toBeCloseTo(0.8);
  });

  it('푼 것이 없어도 0으로 나누지 않는다', () => {
    const r = buildMonthlyReport('2026-07', {}, {}, [], ENTRIES, '2026-07-10');
    expect(r.accuracy).toBe(0);
    expect(r.minutes).toBe(0);
    expect(r.perfectAlive).toBe(false);
  });

  it('외운 단어는 그 달에 마지막으로 본 것만 센다', () => {
    let done = createCard('a');
    for (let i = 0; i < 6; i++) done = grade(done, true);
    const cards: Record<string, CardState> = {
      a: { ...done, firstSeen: at('2026-06', 1), lastSeen: at('2026-07', 20) },
      b: { ...done, entryId: 'b', firstSeen: at('2026-06', 1), lastSeen: at('2026-06', 20) },
    };
    const r = buildMonthlyReport('2026-07', {}, cards, [], ENTRIES, '2026-07-30');
    expect(r.mastered).toBe(1);
  });
});

describe('monthlyHeadline', () => {
  it('개근하면 맨 앞에 적는다', () => {
    const r = buildMonthlyReport('2026-06', daysOf('2026-06', 30), {}, [], ENTRIES, '2026-07-01');
    expect(monthlyHeadline(r, '가가')).toContain('개근');
    expect(monthlyHeadline(r, '가가')).toContain('가가');
  });

  it('개근을 못 했으면 개근이라 하지 않는다', () => {
    const r = buildMonthlyReport('2026-06', daysOf('2026-06', 20), {}, [], ENTRIES, '2026-07-01');
    expect(monthlyHeadline(r, '가가')).not.toContain('개근');
  });
});
