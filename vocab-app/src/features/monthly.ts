/**
 * 한 달 학습 요약.
 *
 * 하루 리포트는 "오늘 했나"를 본다. 한 달을 놓고 보면 다른 것이 보인다 —
 * 며칠을 빠짐없이 했는지, 새 단어를 몇 개나 만났는지, 레벨이 올라갔는지.
 * 아이에게는 "이만큼 했다"는 증거가 되고, 부모에게는 보상을 줄 근거가 된다.
 *
 * 네이티브 모듈을 쓰지 않는다. 숫자가 틀리면 아이가 받을 보상이 달라지는데,
 * 그건 실기기에서야 알아차리게 된다.
 */

import { CardState, DailyRecord, ExamResult, LevelId, VocabEntry } from '../types';
import { daysInMonth, monthOf } from './calendar';
import { isMastered } from '../srs/scheduler';

export interface MonthlyReport {
  /** yyyy-mm */
  month: string;
  /** 그 달의 날 수 */
  totalDays: number;
  /**
   * 오늘까지 지난 날 수.
   *
   * 이번 달은 아직 안 끝났다. 31일을 기준으로 "9일 했다"고 하면 못한 것처럼
   * 보이는데, 실은 9일 중 9일을 다 한 것일 수 있다.
   */
  elapsedDays: number;
  /** 하루라도 공부한 날 수 */
  studiedDays: number;
  /** 목표까지 채운 날 수 */
  completedDays: number;
  /** 개근했는지. 그 달이 끝나고 하루도 안 빠졌을 때만 참. */
  perfect: boolean;
  /** 아직 개근을 노릴 수 있는지 (지난 날을 하나도 안 빠뜨림) */
  perfectAlive: boolean;
  /** 그 달에 **처음 만난** 단어 수 */
  newWords: number;
  /** 그 달에 다룬 문항 수 (중복 포함) */
  answered: number;
  correct: number;
  /** 정답률 0~1. 푼 것이 없으면 0 */
  accuracy: number;
  /** 그 달에 '외운 단어'가 된 수 (21일 간격을 넘긴 것) */
  mastered: number;
  /** 그 달에 통과한 레벨들 */
  levelsPassed: LevelId[];
  /** 공부한 시간(분) */
  minutes: number;
  /** 가장 오래 이어서 공부한 날 수 */
  bestStreak: number;
}

function dayKeys(month: string): string[] {
  const n = daysInMonth(month);
  return Array.from({ length: n }, (_, i) => `${month}-${String(i + 1).padStart(2, '0')}`);
}

/**
 * 그 달의 학습을 한 장으로 요약한다.
 *
 * @param today 기준 날짜. 이번 달이면 여기까지만 '지난 날'로 센다.
 */
export function buildMonthlyReport(
  month: string,
  days: Record<string, DailyRecord>,
  cards: Record<string, CardState>,
  exams: ExamResult[],
  entries: VocabEntry[],
  today: string,
): MonthlyReport {
  const keys = dayKeys(month);
  const thisMonth = monthOf(today);

  // 이번 달이면 오늘까지만, 지난달이면 그 달 전체가 '지난 날'이다.
  const elapsed =
    month > thisMonth ? 0 : month < thisMonth ? keys.length : Number(today.slice(8, 10));

  let studiedDays = 0;
  let completedDays = 0;
  let answered = 0;
  let correct = 0;
  let seconds = 0;
  let streak = 0;
  let bestStreak = 0;

  for (const [i, key] of keys.entries()) {
    const d = days[key];
    const did = (d?.studied ?? 0) > 0;

    if (did) {
      studiedDays++;
      streak++;
      if (streak > bestStreak) bestStreak = streak;
    } else if (i < elapsed) {
      // 아직 오지 않은 날은 연속을 끊지 않는다.
      streak = 0;
    }

    if (d?.completed) completedDays++;
    answered += (d?.correct ?? 0) + (d?.wrong ?? 0);
    correct += d?.correct ?? 0;
    seconds += d?.seconds ?? 0;
  }

  // 그 달에 처음 만난 단어. 카드의 firstSeen 이 그 달 안에 있으면 센다.
  const known = new Set(entries.map((e) => e.id));
  let newWords = 0;
  let mastered = 0;
  for (const [id, c] of Object.entries(cards)) {
    if (!known.has(id)) continue;
    const seen = c.firstSeen;
    if (typeof seen === 'number' && Number.isFinite(seen) && monthOf(dateOf(seen)) === month) {
      newWords++;
    }
    // '외운 단어'는 지금 상태로만 알 수 있다. 언제 그렇게 됐는지는 남기지
    // 않으므로, 마지막으로 본 때가 그 달이면 그 달에 된 것으로 본다.
    if (isMastered(c) && monthOf(dateOf(c.lastSeen)) === month) mastered++;
  }

  const levelsPassed = exams
    .filter((e) => e.passed && monthOf(dateOf(e.at)) === month)
    .map((e) => e.level);

  return {
    month,
    totalDays: keys.length,
    elapsedDays: elapsed,
    studiedDays,
    completedDays,
    // 개근은 그 달이 다 지나야 확정된다. 남은 날에 빠질 수 있다.
    perfect: elapsed >= keys.length && studiedDays === keys.length,
    perfectAlive: studiedDays >= elapsed,
    newWords,
    answered,
    correct,
    accuracy: answered === 0 ? 0 : correct / answered,
    mastered,
    levelsPassed: [...new Set(levelsPassed)],
    minutes: Math.round(seconds / 60),
    bestStreak,
  };
}

/** epoch ms → yyyy-mm-dd (기기 로컬 기준) */
function dateOf(ms: number): string {
  const d = new Date(ms);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 부모님께 보낼 한 줄. */
export function monthlyHeadline(r: MonthlyReport, name: string): string {
  const parts = [`${r.studiedDays}일 공부`, `새 단어 ${r.newWords}개`];
  if (r.levelsPassed.length > 0) parts.push(`레벨 ${r.levelsPassed.length}개 통과`);
  if (r.perfect) parts.unshift('개근');
  return `${name} · ${parts.join(' · ')}`;
}
