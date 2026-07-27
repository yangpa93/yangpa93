/**
 * 간격 반복(spaced repetition) 스케줄러.
 *
 * SM-2를 아이들 학습에 맞게 손봤다.
 *  - 간격을 짧게 잡는다. 어른 대상 SM-2는 첫 성공에 1일 → 6일로 뛰지만,
 *    시험 대비라서 1 → 3 → 7 → 14 → 30일로 완만하게 올린다.
 *  - 틀리면 간격을 0으로 되돌린다. 그날 세션 안에서 다시 나온다.
 *  - 반복해서 틀리는 단어(lapses)는 ease를 더 깎아서 오래 붙잡아 둔다.
 */

import { CardState } from '../types';
import { addDays, todayKey } from '../lib/date';

/** 성공 시 사용할 간격 사다리(일). streak가 이 배열의 인덱스가 된다. */
export const INTERVAL_LADDER = [1, 3, 7, 14, 30, 60];

export const MIN_EASE = 1.3;
export const MAX_EASE = 2.8;
export const DEFAULT_EASE = 2.3;

/** 이 간격 이상 살아남으면 '외운 단어'로 본다. */
export const MASTERED_INTERVAL = 21;

/** 이만큼 넘게 틀리면 '자주 틀리는 단어'로 따로 표시한다. */
export const LEECH_THRESHOLD = 4;

export function createCard(entryId: string, now: number = Date.now()): CardState {
  return {
    entryId,
    ease: DEFAULT_EASE,
    intervalDays: 0,
    streak: 0,
    correct: 0,
    wrong: 0,
    lapses: 0,
    due: todayKey(new Date(now)),
    lastSeen: now,
    firstSeen: now,
  };
}

/**
 * 채점 결과를 카드에 반영한다. 원본을 바꾸지 않고 새 카드를 돌려준다.
 *
 * @param correct 맞혔는지
 * @param today   기준 날짜 (yyyy-mm-dd). 테스트에서 고정하려고 주입받는다.
 */
export function grade(
  card: CardState,
  correct: boolean,
  today: string = todayKey(),
  now: number = Date.now(),
): CardState {
  const next: CardState = { ...card, lastSeen: now };

  if (correct) {
    next.correct = card.correct + 1;
    next.streak = card.streak + 1;
    next.ease = clampEase(card.ease + 0.1);

    const idx = Math.min(next.streak - 1, INTERVAL_LADDER.length - 1);
    const base = INTERVAL_LADDER[idx];
    // ease가 낮은(=자주 틀린) 단어는 같은 단계라도 더 자주 보게 한다.
    const scaled = Math.max(1, Math.round((base * next.ease) / DEFAULT_EASE));
    next.intervalDays = scaled;
    next.due = addDays(today, scaled);
  } else {
    next.wrong = card.wrong + 1;
    next.lapses = card.lapses + 1;
    next.streak = 0;
    next.ease = clampEase(card.ease - 0.25);
    next.intervalDays = 0;
    // 오늘 세션 안에서 다시 물어본다.
    next.due = today;
  }

  return next;
}

function clampEase(v: number): number {
  return Math.min(MAX_EASE, Math.max(MIN_EASE, Math.round(v * 100) / 100));
}

export function isMastered(card: CardState): boolean {
  return card.intervalDays >= MASTERED_INTERVAL;
}

export function isLeech(card: CardState): boolean {
  return card.lapses >= LEECH_THRESHOLD;
}

/**
 * 오늘 세션에서 이 카드를 얼마나 먼저 보여줄지. 클수록 먼저.
 *
 * 우선순위: 자주 틀리는 단어 > 오래 밀린 복습 > 최근에 틀린 단어 > 나머지.
 */
export function priority(card: CardState, today: string = todayKey()): number {
  let score = 0;

  // 예정일이 지날수록 가산 (최대 30일치까지만 반영)
  const overdue = Math.min(30, daysOverdue(card.due, today));
  score += overdue * 4;

  // 틀린 횟수가 많을수록 가산
  score += card.lapses * 12;

  // 정답률이 낮을수록 가산
  const seen = card.correct + card.wrong;
  if (seen > 0) {
    const wrongRate = card.wrong / seen;
    score += wrongRate * 25;
  }

  // 아직 한 번도 못 맞힌 단어는 확실히 앞으로
  if (card.correct === 0 && card.wrong > 0) score += 20;

  // 이미 외운 단어는 뒤로
  if (isMastered(card)) score -= 40;

  return score;
}

function daysOverdue(due: string, today: string): number {
  const [dy, dm, dd] = due.split('-').map(Number);
  const [ty, tm, td] = today.split('-').map(Number);
  const ms = new Date(ty, tm - 1, td).getTime() - new Date(dy, dm - 1, dd).getTime();
  return Math.max(0, Math.round(ms / 86_400_000));
}
