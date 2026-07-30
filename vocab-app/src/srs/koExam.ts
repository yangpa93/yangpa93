/**
 * 국어 레벨 시험.
 *
 * 영어의 `exam.ts` 와 규칙이 같다 — 그 레벨 어휘를 **하나도 빠짐없이**
 * 맞혀야 통과하고, 틀린 문항은 끝에 다시 나온다. 떨어뜨리는 게 목적이
 * 아니라 빠진 어휘를 없애는 게 목적이다.
 *
 * 다른 점은 유형이다. 사자성어는 한자를 묻는 것이 이 갈래의 핵심이라
 * 시험에서도 한자를 낸다. 한자를 확인 못 한 성어는 뜻으로 돌린다.
 */

import { CardState, GameId, KoEntry, LevelId } from '../types';
import { koCloze, koExample } from '../data/korean/entry';
import { buildHanjaChoices, canHanja } from '../games/hanja';
import { isMastered } from './scheduler';
import { shuffle } from './session';

/** 시험을 볼 수 있는 최소 진도. 영어와 같은 기준을 쓴다. */
export const KO_EXAM_UNLOCK_RATIO = 0.9;

export interface KoExamItem {
  entry: KoEntry;
  game: GameId;
  isRetry: boolean;
  /**
   * 예문 인덱스. 다시 풀 때마다 한 칸씩 넘어간다.
   *
   * 틀린 문항을 똑같은 문장으로 다시 내면, 아이가 낱말을 알게 된 것인지
   * 방금 본 문장을 외운 것인지 구별되지 않는다.
   */
  exposureIndex: number;
}

/**
 * 그 어휘에 낼 수 있는 시험 유형.
 *
 * 사자성어는 한자를 먼저 묻는다. 한자를 확인 못 했거나(사전에 없는 19개)
 * 같은 길이 짝이 모자라 보기를 못 만들면 빈칸으로, 빈칸도 못 뚫으면
 * 뜻으로 내려간다.
 */
export function koGameFor(entry: KoEntry, pool: KoEntry[], exposureIndex: number): GameId {
  if (entry.category === 'idiom' && canHanja(entry)) {
    if (buildHanjaChoices(entry, pool).length === 4) return 'hanja';
  }
  const ex = koExample(entry, exposureIndex);
  if (ex && koCloze(ex.text, entry.word)) return 'cloze';
  return 'context';
}

export function buildKoExam(
  entries: KoEntry[],
  level: LevelId,
  rand: () => number = Math.random,
): KoExamItem[] {
  const pool = entries.filter((e) => e.level === level);
  const items = pool.map((entry) => ({
    entry,
    game: koGameFor(entry, pool, 0),
    isRetry: false,
    exposureIndex: 0,
  }));
  return shuffle(items, rand);
}

/** 아직 못 맞힌 문항만 모아 다음 판을 만든다. */
export function nextKoRetryRound(
  wrong: KoExamItem[],
  pool: KoEntry[],
  rand: () => number = Math.random,
): KoExamItem[] {
  return shuffle(
    wrong.map((it) => {
      const exposureIndex = it.exposureIndex + 1;
      return {
        ...it,
        isRetry: true,
        exposureIndex,
        game: koGameFor(it.entry, pool, exposureIndex),
      };
    }),
    rand,
  );
}

/** 시험을 볼 수 있는지. 아직 진도가 안 되면 응시할 수 없다. */
export function canTakeKoExam(
  entries: KoEntry[],
  cards: Record<string, CardState>,
  level: LevelId,
): { allowed: boolean; mastered: number; total: number; need: number } {
  const pool = entries.filter((e) => e.level === level);
  const mastered = pool.filter((e) => {
    const c = cards[e.id];
    return c != null && isMastered(c);
  }).length;
  const need = Math.ceil(pool.length * KO_EXAM_UNLOCK_RATIO);

  return { allowed: pool.length > 0 && mastered >= need, mastered, total: pool.length, need };
}

/** 시험 문항을 한 번이라도 틀린 어휘 id (부모 리포트용). */
export function koExamWeakWords(wrong: KoExamItem[]): string[] {
  return [...new Set(wrong.map((it) => it.entry.id))];
}
