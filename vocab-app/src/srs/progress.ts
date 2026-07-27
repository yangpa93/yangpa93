/** 레벨 진도 계산과 레벨업 판정. */

import { CardState, LEVEL_ORDER, LevelId, VocabEntry } from '../types';
import { isMastered } from './scheduler';

/**
 * 이 비율 이상 외우면 **레벨 시험을 볼 수 있다.**
 * 실제 레벨업은 시험에서 그 레벨 단어를 전부 맞혀야 이뤄진다.
 */
export const LEVEL_UP_RATIO = 0.9;

export interface LevelProgress {
  level: LevelId;
  total: number;
  /** 한 번이라도 학습한 단어 수 */
  seen: number;
  /** 21일 이상 간격까지 살아남은 단어 수 */
  mastered: number;
  /** 0~1 */
  ratio: number;
  /** 레벨 시험을 볼 수 있는지 */
  canTakeExam: boolean;
  /** 시험 응시까지 남은 단어 수 */
  remaining: number;
}

export function levelProgress(
  entries: VocabEntry[],
  cards: Record<string, CardState>,
  level: LevelId,
): LevelProgress {
  const pool = entries.filter((e) => e.level === level);
  const total = pool.length;

  let seen = 0;
  let mastered = 0;
  for (const e of pool) {
    const c = cards[e.id];
    if (!c) continue;
    seen++;
    if (isMastered(c)) mastered++;
  }

  const ratio = total === 0 ? 0 : mastered / total;
  const need = Math.ceil(total * LEVEL_UP_RATIO);

  return {
    level,
    total,
    seen,
    mastered,
    ratio,
    canTakeExam: total > 0 && mastered >= need,
    remaining: Math.max(0, need - mastered),
  };
}

export function nextLevel(level: LevelId): LevelId | null {
  const i = LEVEL_ORDER.indexOf(level);
  if (i < 0 || i === LEVEL_ORDER.length - 1) return null;
  return LEVEL_ORDER[i + 1];
}

/** 자주 틀린 단어를 많이 틀린 순으로. 부모 리포트와 오답노트가 같이 쓴다. */
export function troubleWords(
  entries: VocabEntry[],
  cards: Record<string, CardState>,
  limit = 10,
): { entry: VocabEntry; card: CardState }[] {
  const byId = new Map(entries.map((e) => [e.id, e]));
  return Object.values(cards)
    .filter((c) => c.wrong > 0 && byId.has(c.entryId))
    .sort((a, b) => {
      if (b.wrong !== a.wrong) return b.wrong - a.wrong;
      // 틀린 횟수가 같으면 정답률이 낮은 쪽을 먼저
      const ra = a.correct / (a.correct + a.wrong);
      const rb = b.correct / (b.correct + b.wrong);
      return ra - rb;
    })
    .slice(0, limit)
    .map((c) => ({ entry: byId.get(c.entryId)!, card: c }));
}
