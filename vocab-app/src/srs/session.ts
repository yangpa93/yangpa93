/**
 * 오늘의 학습 세션을 구성한다.
 *
 *  1) `buildSession` — 오늘 다룰 단어를 고른다. 매일 새 단어를 쏟아붓지 않고,
 *     목표 개수 안에서 틀렸던 단어·복습할 때가 된 단어를 먼저 채운 뒤
 *     남는 자리에만 새 단어를 넣는다.
 *  2) `buildRounds` — 고른 단어를 여러 라운드로 펼친다. 만날 때마다
 *     어려운 유형으로 올라간다.
 *
 * 두 가지 원칙이 있다.
 *
 * **모든 문제는 문장으로 낸다.** 단어와 뜻만 짝지어 외우면 정작 시험에서
 * 문장 안에 든 그 단어를 못 알아본다. 그래서 뜻만 보여주고 고르게 하는
 * 유형은 두지 않았다.
 *
 * **다의어는 뜻마다 문항을 만든다.** `save`가 '구하다/아끼다/저축하다'
 * 세 뜻이면 한 세션에서 세 문항이 나온다. 한 뜻만 알고 넘어가면
 * 다른 뜻으로 쓰인 문장에서 막히기 때문이다.
 */

import { CardState, GameId, LevelId, Stage, VocabEntry } from '../types';
import { isDue, todayKey } from '../lib/date';
import { clozeSentence, exposureCount, senseExposure } from '../data/entry';
import { isMastered, priority } from './scheduler';

export interface SessionItem {
  entry: VocabEntry;
  card: CardState | null;
  /** 이 문항이 다루는 뜻. 다의어는 뜻마다 문항이 따로 생긴다. */
  senseIndex: number;
  /** 복습인지 새 단어인지 */
  mode: 'review' | 'new';
  game: GameId;
  stage: Stage;
  /** 이 단어를 이번 세션에서 몇 번째로 만나는지 (0부터) */
  round: number;
  /** 처음 보는 단어를 문제로 내기 전에 단어 카드를 먼저 보여줄지 */
  showIntro: boolean;
}

export interface BuildSessionArgs {
  entries: VocabEntry[];
  cards: Record<string, CardState>;
  level: LevelId;
  /** 하루 목표 **단어** 수 (10~20). 다의어는 뜻 수만큼 문항이 늘어난다. */
  goal: number;
  /** 복습이 차지할 수 있는 최대 비율(0~100) */
  reviewRatio: number;
  today?: string;
  rand?: () => number;
}

/** 세션에 쓸 문항 목록을 고른다. 라운드로 펼치기 전의 원본이다. */
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

  const reviewable = pool
    .filter((e) => {
      const c = cards[e.id];
      return c != null && isDue(c.due, today);
    })
    .sort((a, b) => priority(cards[b.id], today) - priority(cards[a.id], today));

  const fresh = pool.filter((e) => cards[e.id] == null);

  const maxReview = Math.max(1, Math.round((goal * reviewRatio) / 100));
  const picked: VocabEntry[] = [];
  const modes = new Map<string, 'review' | 'new'>();

  for (const e of reviewable) {
    if (picked.length >= maxReview) break;
    picked.push(e);
    modes.set(e.id, 'review');
  }

  for (const e of fresh) {
    if (picked.length >= goal) break;
    picked.push(e);
    modes.set(e.id, 'new');
  }

  // 새 단어가 동나면 복습으로 남은 자리를 채운다.
  if (picked.length < goal) {
    const already = new Set(picked.map((e) => e.id));
    for (const e of reviewable) {
      if (picked.length >= goal) break;
      if (already.has(e.id)) continue;
      picked.push(e);
      modes.set(e.id, 'review');
      already.add(e.id);
    }
  }

  // 그래도 모자라면 아직 안 외운 단어 중 급한 것부터 당겨온다.
  if (picked.length < goal) {
    const already = new Set(picked.map((e) => e.id));
    const rest = pool
      .filter((e) => !already.has(e.id) && cards[e.id] && !isMastered(cards[e.id]))
      .sort((a, b) => priority(cards[b.id], today) - priority(cards[a.id], today));
    for (const e of rest) {
      if (picked.length >= goal) break;
      picked.push(e);
      modes.set(e.id, 'review');
    }
  }

  return expandSenses(picked, cards, modes, rand);
}

/** 고른 단어를 뜻 단위 문항으로 펼친다. 다의어는 뜻 수만큼 문항이 생긴다. */
function expandSenses(
  entries: VocabEntry[],
  cards: Record<string, CardState>,
  modes: Map<string, 'review' | 'new'>,
  rand: () => number,
): SessionItem[] {
  const out: SessionItem[] = [];
  for (const entry of entries) {
    for (let senseIndex = 0; senseIndex < entry.senses.length; senseIndex++) {
      const item: SessionItem = {
        entry,
        card: cards[entry.id] ?? null,
        senseIndex,
        mode: modes.get(entry.id) ?? 'new',
        game: 'cloze',
        stage: 'learn',
        round: 0,
        showIntro: false,
      };
      out.push({ ...item, game: pickGame(item, rand) });
    }
  }
  return out;
}

/**
 * 문항을 라운드로 펼친다.
 *
 * 라운드 안에서는 순서를 섞는다. 같은 단어를 연달아 묻지 않고 다른 문제를
 * 푸는 사이에 잊었다가 다시 떠올리게 하려는 것 — 바로 다시 물으면
 * 단기 기억에 남아 있어서 시험이 되지 않는다.
 */
export function buildRounds(
  items: SessionItem[],
  rounds: number,
  rand: () => number = Math.random,
): SessionItem[] {
  const stages: Stage[] = ['learn', 'apply', 'recall'];
  const out: SessionItem[] = [];

  for (let r = 0; r < rounds; r++) {
    const stage = stages[Math.min(r, stages.length - 1)];
    // 처음 보는 단어는 첫 라운드에서 단어 카드를 먼저 펼쳐 준다.
    // 그때는 뜻이 여러 개여도 첫 문항에서만 카드를 띄운다.
    const introDone = new Set<string>();

    for (const item of shuffle(items, rand)) {
      const showIntro = r === 0 && item.mode === 'new' && !introDone.has(item.entry.id);
      if (showIntro) introDone.add(item.entry.id);

      const staged: SessionItem = { ...item, stage, round: r, showIntro, game: 'cloze' };
      out.push({ ...staged, game: pickGame(staged, rand) });
    }
  }

  return out;
}

/**
 * 문항의 단계와 단어 특성에 맞는 유형을 고른다.
 *
 * 빈칸을 만들지 못하는 예문(불규칙 변화를 못 잡거나 표제어가 문장에
 * 흩어져 있는 경우)에는 빈칸 유형을 내지 않고 뜻·동의어 유형으로 돌린다.
 */
export function pickGame(item: SessionItem, rand: () => number = Math.random): GameId {
  const exp = senseExposure(item.entry, item.senseIndex, exposureCount(item.card) + item.round);
  const canCloze = clozeSentence(item.entry, exp.example.en) != null;
  const isPolysemous = item.entry.senses.length >= 2;

  const candidates: GameId[] = [];

  if (item.stage === 'learn') {
    // 문장 안에서 그 단어를 알아보는 단계.
    if (canCloze) candidates.push('cloze', 'cloze');
    candidates.push('context');
  } else if (item.stage === 'apply') {
    // 뜻을 구별하고 바꿔 쓰는 단계.
    if (isPolysemous) candidates.push('polysemy', 'polysemy');
    if (exp.hasSynonym) candidates.push('synonym');
    if (canCloze) candidates.push('cloze', 'listening');
    candidates.push('context');
  } else {
    // 스스로 떠올려 쓰는 단계.
    if (canCloze) candidates.push('clozeType', 'clozeType', 'clozeType');
    if (isPolysemous) candidates.push('polysemy');
    if (exp.hasSynonym) candidates.push('synonym');
    if (candidates.length === 0) candidates.push('context');
  }

  if (candidates.length === 0) return 'context';
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
