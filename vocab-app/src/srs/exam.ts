/**
 * 레벨 시험.
 *
 * 다음 학년으로 올라가려면 그 레벨의 단어를 **하나도 빠짐없이** 맞혀야 한다.
 * 중1이 100단어면 100문항(다의어는 뜻마다 한 문항)을 전부 통과해야 중2가 된다.
 *
 * 떨어뜨리는 게 목적이 아니라 빠진 단어를 없애는 게 목적이라,
 * 틀린 문항은 시험이 끝난 뒤 다시 나온다. 전부 맞히면 통과다.
 * 대신 **처음 시도에서 몇 개를 맞혔는지**를 따로 기록해 부모 리포트에 남긴다.
 * 다시 풀어 통과했다는 사실이 가려지지 않게 하려는 것.
 */

import { CardState, GameId, LevelId, VocabEntry } from '../types';
import { clozeSentence, senseExposure } from '../data/entry';
import { isMastered } from './scheduler';
import { shuffle } from './session';

/** 시험을 볼 수 있는 최소 진도. 이만큼은 외워야 응시 자격이 생긴다. */
export const EXAM_UNLOCK_RATIO = 0.9;

export interface ExamItem {
  entry: VocabEntry;
  /** 다의어는 뜻마다 한 문항 */
  senseIndex: number;
  game: GameId;
  /** 이 문항을 다시 푸는 중인지 */
  isRetry: boolean;
}

/**
 * 레벨 시험 문항을 만든다.
 *
 * 그 레벨의 **모든 단어**를 다룬다. 다의어는 뜻마다 문항이 생기므로
 * 100단어라도 문항은 그보다 많을 수 있다.
 *
 * 유형은 빈칸 채우기가 기본이다. 빈칸을 만들 수 없는 예문이면
 * 문맥 속 뜻 고르기로 돌린다.
 */
export function buildExam(
  entries: VocabEntry[],
  level: LevelId,
  rand: () => number = Math.random,
): ExamItem[] {
  const pool = entries.filter((e) => e.level === level);
  const items: ExamItem[] = [];

  for (const entry of pool) {
    for (let senseIndex = 0; senseIndex < entry.senses.length; senseIndex++) {
      const exp = senseExposure(entry, senseIndex, 0);
      const canCloze = clozeSentence(entry, exp.example.en) != null;

      // 다의어는 뜻을 구별하는지가 핵심이라 그 유형을 우선한다.
      const game: GameId =
        entry.senses.length >= 2 && !canCloze
          ? 'polysemy'
          : canCloze
            ? 'cloze'
            : 'context';

      items.push({ entry, senseIndex, game, isRetry: false });
    }
  }

  return shuffle(items, rand);
}

/** 시험 진행 상태. 화면이 이걸 들고 다닌다. */
export interface ExamProgress {
  /** 전체 문항 수 */
  total: number;
  /** 처음 시도에서 맞힌 개수 */
  firstTryCorrect: number;
  /** 아직 못 맞힌 문항 (다시 풀어야 함) */
  remaining: ExamItem[];
  /** 다시 풀기를 몇 번 돌았는지 */
  retries: number;
}

/** 아직 못 맞힌 문항만 모아 다음 판을 만든다. */
export function nextRetryRound(wrong: ExamItem[], rand: () => number = Math.random): ExamItem[] {
  return shuffle(
    wrong.map((it) => ({ ...it, isRetry: true })),
    rand,
  );
}

/** 시험을 볼 수 있는지. 아직 진도가 안 되면 응시할 수 없다. */
export function canTakeExam(
  entries: VocabEntry[],
  cards: Record<string, CardState>,
  level: LevelId,
): { allowed: boolean; mastered: number; total: number; need: number } {
  const pool = entries.filter((e) => e.level === level);
  const mastered = pool.filter((e) => {
    const c = cards[e.id];
    return c != null && isMastered(c);
  }).length;
  const need = Math.ceil(pool.length * EXAM_UNLOCK_RATIO);

  return {
    allowed: pool.length > 0 && mastered >= need,
    mastered,
    total: pool.length,
    need,
  };
}

/** 시험 문항을 한 번이라도 틀린 단어 id (부모 리포트용). */
export function examWeakWords(wrong: ExamItem[]): string[] {
  return [...new Set(wrong.map((it) => it.entry.id))];
}
