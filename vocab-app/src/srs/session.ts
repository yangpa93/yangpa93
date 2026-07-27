/**
 * 오늘의 학습 세션을 구성한다.
 *
 * 두 가지를 한다.
 *  1) `buildSession` — 오늘 다룰 단어를 고른다. 매일 새 단어를 쏟아붓지 않고,
 *     목표 개수 안에서 틀렸던 단어·복습할 때가 된 단어를 먼저 채운 뒤
 *     남는 자리에만 새 단어를 넣는다. 오답이 쌓여 있으면 그날은 새 단어가
 *     아예 안 나올 수도 있다.
 *  2) `buildRounds` — 고른 단어를 여러 라운드로 펼친다. 같은 단어를
 *     재인(4지선다) → 문맥 → 인출(직접 쓰기) 순으로 다시 만나게 한다.
 *
 * 2번이 핵심이다. 4지선다는 보기 중에 답이 있어서 "아는 것 같은 착각"을
 * 만들기 쉽다. 한 세션 안에서 반드시 직접 써 보는 단계까지 올라가야
 * 실제로 외운 것인지 드러난다.
 */

import { CardState, GameId, LevelId, Stage, VocabEntry } from '../types';
import { isDue, todayKey } from '../lib/date';
import { clozeSentence, exposure, exposureCount } from '../data/entry';
import { isMastered, priority } from './scheduler';

export interface SessionItem {
  entry: VocabEntry;
  card: CardState | null;
  /** 복습인지 새 단어인지 */
  mode: 'review' | 'new';
  game: GameId;
  /** 이 문항이 속한 단계 */
  stage: Stage;
  /**
   * 이 단어를 이번 세션에서 몇 번째로 만나는지 (0부터).
   * 노출 회전에 더해져서 라운드마다 다른 예문이 나오게 한다.
   */
  round: number;
  /** 처음 보는 단어를 문제로 내기 전에 단어 카드를 먼저 보여줄지 */
  showIntro: boolean;
}

export interface BuildSessionArgs {
  entries: VocabEntry[];
  cards: Record<string, CardState>;
  level: LevelId;
  /** 하루 목표 단어 수 (10~20) */
  goal: number;
  /** 복습이 차지할 수 있는 최대 비율(0~100). 나머지는 새 단어 몫. */
  reviewRatio: number;
  today?: string;
  /** 게임 종류를 섞을 때 쓰는 난수. 테스트에서 고정한다. */
  rand?: () => number;
}

/** 세션에 쓸 단어 목록을 고른다. 라운드로 펼치기 전의 원본이다. */
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

  const make = (e: VocabEntry, mode: 'review' | 'new'): SessionItem => ({
    entry: e,
    card: cards[e.id] ?? null,
    mode,
    game: 'meaning',
    stage: 'learn',
    round: 0,
    showIntro: false,
  });

  for (const e of reviewable) {
    if (picked.length >= maxReview) break;
    picked.push(make(e, 'review'));
  }

  for (const e of fresh) {
    if (picked.length >= goal) break;
    picked.push(make(e, 'new'));
  }

  // 새 단어가 동나면(레벨 끝까지 봤으면) 복습으로 남은 자리를 채운다.
  if (picked.length < goal) {
    const already = new Set(picked.map((p) => p.entry.id));
    for (const e of reviewable) {
      if (picked.length >= goal) break;
      if (already.has(e.id)) continue;
      picked.push(make(e, 'review'));
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
      picked.push(make(e, 'review'));
    }
  }

  return picked.map((item) => ({ ...item, game: pickGame(item, rand) }));
}

/**
 * 고른 단어를 라운드로 펼친다.
 *
 * 20단어 × 3라운드 = 60문제. 한 문제에 10초쯤 걸리니 약 10분 분량이다.
 *
 * 라운드 안에서는 단어 순서를 섞는다. 1번 단어를 연달아 세 번 묻지 않고
 * 다른 단어를 푸는 사이에 잊었다가 다시 떠올리게 하려는 것 —
 * 바로 다시 물으면 단기 기억에 남아 있어서 시험이 되지 않는다.
 */
export function buildRounds(
  items: SessionItem[],
  rounds: number,
  rand: () => number = Math.random,
): SessionItem[] {
  const stages: Stage[] = ['learn', 'apply', 'recall'];
  const out: SessionItem[] = [];

  for (let r = 0; r < rounds; r++) {
    // 라운드가 3을 넘으면 마지막 단계(인출)를 반복한다.
    const stage = stages[Math.min(r, stages.length - 1)];
    const shuffled = shuffle(items, rand);

    for (const item of shuffled) {
      const staged: SessionItem = {
        ...item,
        stage,
        round: r,
        // 처음 보는 단어는 첫 라운드에서 단어 카드를 먼저 펼쳐 준다.
        // 본 적 없는 단어를 4지선다로 물으면 찍기밖에 안 된다.
        showIntro: r === 0 && item.mode === 'new',
        game: 'meaning',
      };
      out.push({ ...staged, game: pickGame(staged, rand) });
    }
  }

  return out;
}

/**
 * 문항의 단계와 단어 특성에 맞는 문제 유형을 고른다.
 *
 * 낼 수 없는 유형은 후보에서 빠진다.
 *  - 다의어 구별: 뜻이 2개 이상이어야 한다
 *  - 빈칸 채우기: 예문에서 표제어를 찾을 수 있어야 한다
 *  - 동의어: 그 뜻에 바꿔 쓸 표현이 있어야 한다
 *  - 철자·직접 쓰기: 숙어는 제외 (구(句) 철자를 외우게 하는 건 의미가 적다)
 */
export function pickGame(item: SessionItem, rand: () => number = Math.random): GameId {
  const exp = exposure(item.entry, exposureCount(item.card) + item.round);
  const isWord = item.entry.kind === 'word';
  const candidates: GameId[] = [];

  if (item.stage === 'learn') {
    // 처음 만나는 라운드. 뜻을 먼저 붙인다.
    candidates.push('meaning', 'meaning', 'word');
    // 새 단어를 듣기로 물으면 찍기밖에 안 되므로 복습 단어만.
    if (item.mode === 'review') candidates.push('listening');
  } else if (item.stage === 'apply') {
    // 문장 안에서 어떻게 쓰이는지 묻는다.
    candidates.push('context');
    if (clozeSentence(item.entry, exp.example.en)) candidates.push('cloze');
    if (exp.hasSynonym) candidates.push('synonym');
    if (item.entry.senses.length >= 2) {
      // 다의어는 이 유형이 가장 값지다. 두 번 넣어 확률을 높인다.
      candidates.push('polysemy', 'polysemy');
    }
  } else {
    // 스스로 떠올려 쓰는 단계.
    if (isWord) {
      candidates.push('recall', 'recall', 'spelling');
    } else {
      // 숙어는 쓰게 하지 않고, 대신 문맥으로 확인한다.
      candidates.push('cloze', 'context');
      if (exp.hasSynonym) candidates.push('synonym');
    }
  }

  if (candidates.length === 0) return 'meaning';
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
