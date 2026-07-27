/**
 * 요구권.
 *
 * 아이가 무엇을 갖고 싶은지 적어 보내는 방식이 아니라, **정해진 금액을
 * 요구할 권리**를 얻는 방식이다. 조건과 금액이 미리 정해져 있어서 아이는
 * "얼마짜리가 걸려 있는지"를 알고 공부하고, 부모는 매번 협상하지 않아도 된다.
 *
 *   중학교 레벨업   2만원
 *   고등학교 레벨업 3만원
 *   한 달 개근      2만원
 *
 * 화면과 분리된 순수 함수라 테스트가 쉽다.
 */

import { DailyRecord, LevelId, Profile, ProfileData, gradeOf } from '../types';
import { daysInMonth, monthOf } from './calendar';
import { todayKey } from '../lib/date';

/** 중학교 레벨 하나를 끝냈을 때 */
export const MIDDLE_LEVEL_AWARD = 20_000;
/** 고등학교 레벨 하나를 끝냈을 때 */
export const HIGH_LEVEL_AWARD = 30_000;
/** 한 달을 하루도 빠짐없이 학습했을 때 */
export const PERFECT_MONTH_AWARD = 20_000;

export type AwardKind = 'levelup' | 'perfectMonth';

export const AWARD_LABEL: Record<AwardKind, string> = {
  levelup: '레벨업',
  perfectMonth: '한 달 개근',
};

/** 레벨 하나를 끝냈을 때 받는 금액. 중학교 2만원, 고등학교 3만원. */
export function levelUpAmount(level: LevelId): number {
  return gradeOf(level).startsWith('m') ? MIDDLE_LEVEL_AWARD : HIGH_LEVEL_AWARD;
}

/** 아직 요청하지 않은 요구권 하나. */
export interface Award {
  kind: AwardKind;
  amount: number;
  /** levelup이면 어떤 레벨을 끝냈는지 */
  earnedFrom: LevelId | null;
  /** perfectMonth면 어느 달인지 (yyyy-mm) */
  month: string | null;
  /** 화면에 그대로 쓰는 한 줄 */
  reason: string;
}

export function formatWon(amount: number): string {
  // 20000 → '2만원'. 만 단위로 딱 떨어지지 않으면 그대로 적는다.
  if (amount % 10_000 === 0) return `${amount / 10_000}만원`;
  return `${amount.toLocaleString('ko-KR')}원`;
}

/**
 * 그 달을 하루도 빠짐없이 학습했는지.
 *
 * 목표를 채웠는지가 아니라 **그날 학습을 했는지**로 본다. 목표까지 요구하면
 * 몸이 아픈 날 하루에 한 달이 통째로 날아가서, 아이가 중간에 포기해 버린다.
 */
export function isPerfectMonth(days: Record<string, DailyRecord>, month: string): boolean {
  const count = daysInMonth(month);
  for (let d = 1; d <= count; d++) {
    const key = `${month}-${String(d).padStart(2, '0')}`;
    if ((days[key]?.studied ?? 0) <= 0) return false;
  }
  return true;
}

/**
 * 개근을 채운 달들. 과거→현재 순.
 *
 * **끝난 달만** 센다. 아직 진행 중인 달은 남은 날에 빠질 수 있어서,
 * 마지막 날이 지나야 확정된다.
 */
export function perfectMonths(
  days: Record<string, DailyRecord>,
  today: string = todayKey(),
): string[] {
  const months = [...new Set(Object.keys(days).map(monthOf))].sort();
  const thisMonth = monthOf(today);
  const lastDay = `${thisMonth}-${String(daysInMonth(thisMonth)).padStart(2, '0')}`;

  return months.filter((m) => {
    // 이번 달은 마지막 날이 되어야 확정된다.
    if (m > thisMonth) return false;
    if (m === thisMonth && today < lastDay) return false;
    return isPerfectMonth(days, m);
  });
}

/**
 * 지금 요청할 수 있는 요구권 목록.
 *
 * 이미 요청한 것은 빠진다. 레벨업은 `pendingLevelUps`가, 개근은
 * `claimedMonths`가 중복을 막는다.
 */
export function availableAwards(
  profile: Profile,
  data: ProfileData,
  today: string = todayKey(),
): Award[] {
  const out: Award[] = [];

  for (const level of profile.pendingLevelUps) {
    out.push({
      kind: 'levelup',
      amount: levelUpAmount(level),
      earnedFrom: level,
      month: null,
      reason: `${gradeOf(level).startsWith('m') ? '중학교' : '고등학교'} 레벨 하나를 끝냈어요`,
    });
  }

  const claimed = new Set(profile.claimedMonths ?? []);
  for (const month of perfectMonths(data.days, today)) {
    if (claimed.has(month)) continue;
    const [, m] = month.split('-');
    out.push({
      kind: 'perfectMonth',
      amount: PERFECT_MONTH_AWARD,
      earnedFrom: null,
      month,
      reason: `${Number(m)}월 한 달을 하루도 빠짐없이 공부했어요`,
    });
  }

  return out;
}

/** 이번 달 개근까지 며칠 남았는지. 화면에 진행 상황을 보여주는 데 쓴다. */
export function perfectMonthProgress(
  days: Record<string, DailyRecord>,
  today: string = todayKey(),
): { month: string; studied: number; elapsed: number; total: number; alive: boolean } {
  const month = monthOf(today);
  const total = daysInMonth(month);
  const day = Number(today.slice(8));

  let studied = 0;
  for (let d = 1; d <= day; d++) {
    const key = `${month}-${String(d).padStart(2, '0')}`;
    if ((days[key]?.studied ?? 0) > 0) studied++;
  }

  return { month, studied, elapsed: day, total, alive: studied === day };
}
