/**
 * 학습 달력.
 *
 * `ProfileData.days` 에 쌓인 하루 기록을 달력 한 판으로 바꾼다.
 * 화면과 분리된 순수 함수라 테스트가 쉽고, 부모 화면과 아이 화면이 같은
 * 계산을 쓴다.
 */

import { DailyRecord } from '../types';
import { todayKey } from '../lib/date';

export const WEEKDAY_LABEL = ['일', '월', '화', '수', '목', '금', '토'] as const;

/** 달력 칸 하나. 이번 달에 실제로 존재하는 날짜만 만든다. */
export interface DayCell {
  /** yyyy-mm-dd */
  date: string;
  /** 1~31 */
  day: number;
  /** 그날 공부한 단어 수 */
  studied: number;
  goal: number;
  correct: number;
  wrong: number;
  minutes: number;
  completed: boolean;
  /** 0~1. 푼 문제가 없으면 0 */
  accuracy: number;
  /** 색 농도. 0=안 함, 1=조금, 2=절반 이상, 3=목표 달성 */
  level: 0 | 1 | 2 | 3;
  isToday: boolean;
  /** 오늘보다 뒤 = 아직 오지 않은 날 */
  isFuture: boolean;
}

export interface MonthSummary {
  /** yyyy-mm */
  month: string;
  /** '2026년 7월' */
  label: string;
  /** 일요일 시작. 앞뒤 빈칸은 null */
  weeks: (DayCell | null)[][];
  /** 하루라도 공부한 날 수 */
  studiedDays: number;
  /** 목표를 채운 날 수 */
  completedDays: number;
  /** 이번 달에 공부한 단어 수 합계 */
  totalWords: number;
  totalMinutes: number;
  /** 공부한 날들의 평균 정답률 (0~1) */
  averageAccuracy: number;
  /** 가장 많이 공부한 날 */
  best: DayCell | null;
  /** 이번 달에서 이미 지나간(오늘 포함) 날 수 */
  elapsedDays: number;
  /** 이 달 안에서 이어서 공부한 최장 일수 */
  longestStreak: number;
}

/** 'yyyy-mm-dd' → 'yyyy-mm' */
export function monthOf(dateKey: string): string {
  return dateKey.slice(0, 7);
}

export function addMonths(month: string, n: number): string {
  const [y, m] = month.split('-').map(Number);
  const d = new Date(y, m - 1 + n, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function formatMonth(month: string): string {
  const [y, m] = month.split('-').map(Number);
  return `${y}년 ${m}월`;
}

export function daysInMonth(month: string): number {
  const [y, m] = month.split('-').map(Number);
  // 다음 달 0일 = 이번 달 마지막 날
  return new Date(y, m, 0).getDate();
}

/** 그 달 1일의 요일 (0=일) */
export function firstWeekday(month: string): number {
  const [y, m] = month.split('-').map(Number);
  return new Date(y, m - 1, 1).getDay();
}

/**
 * 칸 색 농도.
 *
 * 목표를 채웠으면 무조건 가장 진하게. 아이 입장에서 '달성'이 제일 중요한
 * 신호라서 단어 수보다 우선한다.
 */
export function studyLevel(studied: number, goal: number, completed: boolean): 0 | 1 | 2 | 3 {
  if (studied <= 0) return 0;
  if (completed) return 3;
  const base = goal > 0 ? goal : 1;
  return studied / base >= 0.5 ? 2 : 1;
}

/** 기록이 있는 가장 이른 달. 없으면 null. */
export function earliestMonth(days: Record<string, DailyRecord>): string | null {
  let min: string | null = null;
  for (const key of Object.keys(days)) {
    if (min === null || key < min) min = key;
  }
  return min === null ? null : monthOf(min);
}

export function buildMonth(
  days: Record<string, DailyRecord>,
  month: string,
  today: string = todayKey(),
): MonthSummary {
  const count = daysInMonth(month);
  const lead = firstWeekday(month);

  const cells: DayCell[] = [];
  for (let d = 1; d <= count; d++) {
    const date = `${month}-${String(d).padStart(2, '0')}`;
    const rec = days[date];
    const answered = (rec?.correct ?? 0) + (rec?.wrong ?? 0);
    const studied = rec?.studied ?? 0;
    const goal = rec?.goal ?? 0;
    const completed = rec?.completed ?? false;

    cells.push({
      date,
      day: d,
      studied,
      goal,
      correct: rec?.correct ?? 0,
      wrong: rec?.wrong ?? 0,
      minutes: Math.round((rec?.seconds ?? 0) / 60),
      completed,
      accuracy: answered === 0 ? 0 : (rec?.correct ?? 0) / answered,
      level: studyLevel(studied, goal, completed),
      isToday: date === today,
      isFuture: date > today,
    });
  }

  // 일요일부터 시작하는 주 단위로 자른다.
  const slots: (DayCell | null)[] = [...Array<null>(lead).fill(null), ...cells];
  while (slots.length % 7 !== 0) slots.push(null);
  const weeks: (DayCell | null)[][] = [];
  for (let i = 0; i < slots.length; i += 7) weeks.push(slots.slice(i, i + 7));

  const studiedCells = cells.filter((c) => c.studied > 0);
  const withAnswers = cells.filter((c) => c.correct + c.wrong > 0);

  let longest = 0;
  let run = 0;
  for (const c of cells) {
    run = c.studied > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }

  const best = studiedCells.reduce<DayCell | null>(
    (acc, c) => (acc === null || c.studied > acc.studied ? c : acc),
    null,
  );

  return {
    month,
    label: formatMonth(month),
    weeks,
    studiedDays: studiedCells.length,
    completedDays: cells.filter((c) => c.completed).length,
    totalWords: cells.reduce((sum, c) => sum + c.studied, 0),
    totalMinutes: cells.reduce((sum, c) => sum + c.minutes, 0),
    averageAccuracy:
      withAnswers.length === 0
        ? 0
        : withAnswers.reduce((sum, c) => sum + c.accuracy, 0) / withAnswers.length,
    best,
    elapsedDays: cells.filter((c) => !c.isFuture).length,
    longestStreak: longest,
  };
}
