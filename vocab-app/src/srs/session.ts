/**
 * 오늘의 학습 세션을 구성한다.
 *
 * 핵심 규칙: 매일 새 단어를 쏟아붓지 않는다. 목표 개수 안에서
 *   1) 틀렸던 단어 / 복습할 때가 된 단어를 먼저 채우고,
 *   2) 남는 자리에만 새 단어를 넣는다.
 * 그래서 오답이 쌓여 있으면 그날은 새 단어가 아예 안 나올 수도 있다 —
 * 잊어버리지 않게 하는 게 우선이라는 요구사항을 그대로 옮긴 것이다.
 */

import { CardState, GameId, LevelId, VocabEntry } from '../types';
import { isDue, todayKey } from '../lib/date';
import { clozeSentence, exposure, exposureCount } from '../data/entry';
import { isMastered, priority } from './scheduler';

export interface SessionItem {
  entry: VocabEntry;
  card: CardState | null;
  /** 복습인지 새 단어인지 */
  mode: 'review' | 'new';
  game: GameId;
}

export interface BuildSessionArgs {
  entries: VocabEntry[];
  cards: Record<string, CardState>;
  level: LevelId;
  /** 하루 목표 문항 수 (10~20) */
  goal: number;
  /** 복습이 차지할 수 있는 최대 비율(0~100). 나머지는 새 단어 몫. */
  reviewRatio: number;
  today?: string;
  /** 게임 종류를 섞을 때 쓰는 난수. 테스트에서 고정한다. */
  rand?: () => number;
}

/** 세션에 쓸 단어 목록을 고른다. 게임 종류까지 배정해서 돌려준다. */
export function buildSession({
  entries,
  cards,
  level,
  goal,
  reviewRatio,
  today = todayKey(),
  rand = Math.random,
}: BuildSessionArgs): SessionItem[] {
  const pool = entries.filter((e) => e.level === level);

  // 1) 복습 후보: 카드가 있고, 예정일이 됐거나 지난 것
  const reviewable = pool
    .filter((e) => {
      const c = cards[e.id];
      return c != null && isDue(c.due, today);
    })
    .sort((a, b) => priority(cards[b.id], today) - priority(cards[a.id], today));

  // 2) 새 단어 후보: 아직 카드가 없는 것 (데이터 순서 = 난이도 순서라고 본다)
  const fresh = pool.filter((e) => cards[e.id] == null);

  const maxReview = Math.max(1, Math.round((goal * reviewRatio) / 100));
  const picked: SessionItem[] = [];

  for (const e of reviewable) {
    if (picked.length >= maxReview) break;
    picked.push({ entry: e, card: cards[e.id], mode: 'review', game: 'meaning' });
  }

  for (const e of fresh) {
    if (picked.length >= goal) break;
    picked.push({ entry: e, card: null, mode: 'new', game: 'meaning' });
  }

  // 새 단어가 동나면(레벨 끝까지 봤으면) 복습으로 남은 자리를 채운다.
  if (picked.length < goal) {
    const already = new Set(picked.map((p) => p.entry.id));
    for (const e of reviewable) {
      if (picked.length >= goal) break;
      if (already.has(e.id)) continue;
      picked.push({ entry: e, card: cards[e.id], mode: 'review', game: 'meaning' });
      already.add(e.id);
    }
  }

  // 그래도 모자라면 아직 안 외운 단어 중 급한 것부터 당겨온다.
  if (picked.length < goal) {
    const already = new Set(picked.map((p) => p.entry.id));
    const rest = pool
      .filter((e) => !already.has(e.id) && cards[e.id] && !isMastered(cards[e.id]))
      .sort((a, b) => priority(cards[b.id], today) - priority(cards[a.id], today));
    for (const e of rest) {
      if (picked.length >= goal) break;
      picked.push({ entry: e, card: cards[e.id], mode: 'review', game: 'meaning' });
    }
  }

  return picked.map((item) => ({ ...item, game: pickGame(item, rand) }));
}

/**
 * 문항마다 게임 종류를 배정한다.
 *
 * 처음 보는 단어는 뜻부터 익혀야 하니 4지선다로 시작하고,
 * 익숙해질수록 빈칸·동의어·철자·듣기처럼 어려운 방식으로 옮겨간다.
 * 그 단어에 낼 수 없는 게임(동의어가 없다든지)은 후보에서 빠진다.
 */
export function pickGame(item: SessionItem, rand: () => number = Math.random): GameId {
  const streak = item.card?.streak ?? 0;
  if (item.mode === 'new' || streak === 0) return 'meaning';

  const exp = exposure(item.entry, exposureCount(item.card));

  const candidates: GameId[] = ['meaning', 'word'];

  // 빈칸 채우기는 예문에서 표제어를 실제로 찾아낼 수 있을 때만.
  if (clozeSentence(item.entry, exp.example.en)) candidates.push('cloze');

  // 동의어 게임은 그 뜻에 바꿔 쓸 표현이 있을 때만.
  if (streak >= 2 && exp.hasSynonym) candidates.push('synonym');

  if (streak >= 2) candidates.push('listening');

  // 숙어는 철자를 외우게 하는 게 의미가 적어서 뺀다.
  if (streak >= 3 && item.entry.kind === 'word') candidates.push('spelling');

  const i = Math.floor(rand() * candidates.length);
  return candidates[Math.min(i, candidates.length - 1)];
}

/**
 * 4지선다 보기를 고른다.
 *
 * `label`로 뽑은 문자열이 정답과 같은 항목은 오답 보기에서 뺀다.
 * (뜻이 똑같은 단어가 보기로 나오면 정답이 두 개가 되어 버린다.)
 */
export function buildChoices<T>(
  answer: T,
  pool: T[],
  label: (item: T) => string,
  count = 4,
  rand: () => number = Math.random,
): T[] {
  const answerLabel = label(answer);
  const seen = new Set([answerLabel]);
  const others: T[] = [];

  for (const item of shuffle(pool, rand)) {
    if (others.length >= count - 1) break;
    const l = label(item);
    if (seen.has(l)) continue;
    seen.add(l);
    others.push(item);
  }

  return shuffle([answer, ...others], rand);
}

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
