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

import { CardState, GameId, LevelId, Stage, STAGE_ORDER, VocabEntry } from '../types';
import { isDue, todayKey } from '../lib/date';
import { clozeSentence, exposureCount, senseExposure } from '../data/entry';
import { hasAntonym } from '../data/antonyms';
import { canScramble } from '../games/scramble';
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
  /**
   * 이 문항에 쓸 예문을 고르는 인덱스.
   *
   * **세션을 만들 때 한 번 정하고 그 뒤로 바뀌지 않는다.** 예전에는 화면이
   * 그때그때 `카드의 누적 노출 수 + 라운드`로 계산했는데, 카드는 문제를 풀
   * 때마다 갱신되므로 라운드가 올라갈 때 인덱스가 2씩 뛰었다. 뜻마다 예문이
   * 2개인 다의어는 2씩 뛰면 나머지가 늘 같아서 **세 라운드 내내 똑같은
   * 문장**이 나왔다. 여기서 미리 못박아 라운드마다 1씩만 올라가게 한다.
   */
  exposureIndex: number;
  /**
   * 이번 세션에서 이 단어를 처음 만나는 문항인지.
   *
   * 문제를 풀고 난 뒤 뜨는 단어 카드에 '처음 만나는 단어'라고 표시하는 데 쓴다.
   * 카드를 문제보다 **먼저** 보여주지는 않는다 — 먼저 보여주면 방금 읽은 것을
   * 그대로 되묻는 꼴이라 스스로 떠올려 볼 기회가 사라진다.
   */
  firstMeeting: boolean;
}

export interface BuildSessionArgs {
  entries: VocabEntry[];
  cards: Record<string, CardState>;
  level: LevelId;
  /** 하루에 새로 만날 단어 수. 진도를 정하는 값이다. */
  newPerDay: number;
  /** 하루 복습 단어 수 상한. 복습이 밀리면 급한 것부터 채운다. */
  reviewPerDay: number;
  today?: string;
  rand?: () => number;
}

/**
 * 오늘 계획된 **단어** 수.
 *
 * 하루 목표를 설정값(새 단어 + 복습)으로 잡으면, 복습이 없는 첫날에는
 * 아무리 해도 목표를 못 채운다. 실제로 뽑힌 단어 수를 그날의 목표로 쓴다.
 */
export function plannedWordCount(args: BuildSessionArgs): number {
  return new Set(buildSession(args).map((i) => i.entry.id)).size;
}

/** 세션에 쓸 문항 목록을 고른다. 라운드로 펼치기 전의 원본이다. */
export function buildSession({
  entries,
  cards,
  level,
  newPerDay,
  reviewPerDay,
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

  // 복습을 먼저 채우고 새 단어를 얹는다. 잊지 않게 하는 것이 우선이다.
  const goal = newPerDay + reviewPerDay;
  const maxReview = reviewPerDay;
  const picked: VocabEntry[] = [];
  const modes = new Map<string, 'review' | 'new'>();

  for (const e of reviewable) {
    if (picked.length >= maxReview) break;
    picked.push(e);
    modes.set(e.id, 'review');
  }

  // 새 단어는 정해진 개수만. 복습이 적은 날이라고 새 단어를 몰아 넣으면
  // 며칠 뒤 복습이 한꺼번에 몰려 감당이 안 된다.
  let newCount = 0;
  for (const e of fresh) {
    if (newCount >= newPerDay) break;
    picked.push(e);
    modes.set(e.id, 'new');
    newCount++;
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
    const card = cards[entry.id] ?? null;
    // 세션이 시작하는 시점의 누적 노출 수를 기준점으로 굳힌다. 어제까지
    // 본 횟수만큼 밀어 두면 오늘도 어제와 다른 문장에서 시작한다.
    const base = exposureCount(card);
    for (let senseIndex = 0; senseIndex < entry.senses.length; senseIndex++) {
      const item: SessionItem = {
        entry,
        card,
        senseIndex,
        mode: modes.get(entry.id) ?? 'new',
        game: 'cloze',
        stage: 'learn',
        round: 0,
        exposureIndex: base,
        firstMeeting: false,
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
 *
 * **라운드마다 예문이 한 칸씩 넘어간다.** 예문이 3개면 세 라운드가 모두
 * 다른 문장이고, 2개면 첫 문장으로 되돌아온다. 같은 뜻이라도 문장이 바뀌어야
 * "그 문장을 통째로 외운 것"과 "단어를 아는 것"이 구별된다.
 */
/**
 * 그 단어에 지금까지 몇 번 연달아 성공했는지로 **열리는 최고 난이도**가 정해진다.
 *
 * 예전에는 라운드만 보고 단계를 올렸다. 그래서 처음 만난 단어도 그날 세 번째
 * 라운드에서 곧바로 철자를 쳐야 했다. 오늘 처음 본 단어를 외워서 쓰라는 것은
 * 시험이 아니라 벌이다.
 *
 * 이제 만날수록 어려운 유형이 열린다.
 *
 *   연속 정답 0회   익히기        빈칸 채우기 · 문맥 속 뜻
 *   1~2회          + 활용하기     뜻 구별 · 바꿔 쓰기 · 반대말 · 듣고 빈칸
 *   3~4회          + 문장 만들기   어순 배열
 *   5회 이상        + 떠올리기     빈칸에 직접 쓰기
 *
 * **틀리면 연속 정답이 0으로 돌아가므로 난이도도 함께 내려온다.** 못 외운
 * 단어를 계속 어려운 유형으로 물으면 아이는 찍기 시작하고, 찍기 시작하면
 * 그 세션은 학습이 아니라 운이 된다.
 *
 * 세션을 만들 때 한 번 정하고 그 세션 동안 바뀌지 않는다. 문제를 푸는 대로
 * 카드가 갱신되므로, 그때그때 계산하면 한 세션 안에서 난이도가 올라간다.
 */
export function ceilingOf(card: CardState | null): Stage {
  const streak = card?.streak ?? 0;
  if (streak <= 0) return 'learn';
  if (streak <= 2) return 'apply';
  if (streak <= 4) return 'build';
  return 'recall';
}

/** 둘 중 쉬운 쪽. 라운드가 원하는 단계와 그 단어에 열린 단계를 견준다. */
function easier(a: Stage, b: Stage): Stage {
  return STAGE_ORDER.indexOf(a) <= STAGE_ORDER.indexOf(b) ? a : b;
}

export function buildRounds(
  items: SessionItem[],
  rounds: number,
  rand: () => number = Math.random,
): SessionItem[] {
  // 라운드가 바라는 단계. '문장 만들기'는 라운드가 아니라 숙련도로만 열린다.
  const wanted: Stage[] = ['learn', 'apply', 'recall'];
  const out: SessionItem[] = [];

  for (let r = 0; r < rounds; r++) {
    const want = wanted[Math.min(r, wanted.length - 1)];
    // 처음 보는 단어는 첫 라운드에서 단어 카드를 먼저 펼쳐 준다.
    // 뜻이 여러 개여도 '처음 만남'은 첫 문항 하나에만 붙인다.
    const metOnce = new Set<string>();

    /*
     * ── 복습은 **한 번만** 나온다 ─────────────────────────────
     *
     * 예전에는 새 낱말과 복습을 가리지 않고 셋 다 라운드 수만큼 돌렸다.
     * 새 8개 + 복습 10개면 24 + 30 = 54문제가 되어, **복습이 절반을
     * 넘었다.** "너무 많아지는데요" 라는 말을 들은 자리가 여기다.
     *
     * 복습은 이미 한 번 자리를 잡은 낱말이다. 핵심은 **꺼내 보는 것**이고,
     * 한 번 제대로 꺼내면 그날 몫은 끝난다. 같은 날 세 번 몰아 보면 간격을
     * 두고 다시 만난다는 뜻 자체가 옅어진다 — 간격 반복인데 간격이 없다.
     *
     * 못 외운 것이 한 번에 지나가지 않을까. 그렇지 않다. **틀리면 그 자리에서
     * 다시 나오는 장치가 따로 있다**(app/study.tsx 의 requeue). 그러니 줄어드는
     * 것은 이미 아는 낱말을 세 번 묻던 몫뿐이다.
     *
     * 새 낱말은 그대로 셋을 다 거친다. 처음 만나는 것이라 뜻 → 문맥 → 인출을
     * 한 번씩 밟아야 자리를 잡는다.
     */
    const forThisRound = r === 0 ? items : items.filter((i) => i.mode !== 'review');

    for (const item of shuffle(forThisRound, rand)) {
      const firstMeeting = r === 0 && item.mode === 'new' && !metOnce.has(item.entry.id);
      if (firstMeeting) metOnce.add(item.entry.id);

      const staged: SessionItem = {
        ...item,
        stage: easier(want, ceilingOf(item.card)),
        round: r,
        // 라운드가 올라가면 예문도 한 칸 넘어간다.
        exposureIndex: item.exposureIndex + r,
        firstMeeting,
        game: 'cloze',
      };
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
  const exp = senseExposure(item.entry, item.senseIndex, item.exposureIndex);
  const canCloze = clozeSentence(item.entry, exp.example.en) != null;
  const isPolysemous = item.entry.senses.length >= 2;
  // 반대말은 표제어 단위라, 다의어면 대표 뜻(첫 뜻)을 다룰 때만 낸다.
  // 'save(저축하다)'를 놓고 'spend'의 반대라고 하면 뜻이 어긋난다.
  const canAntonym = hasAntonym(item.entry.word) && item.senseIndex === 0;

  const candidates: GameId[] = [];

  if (item.stage === 'learn') {
    // 문장 안에서 그 단어를 알아보는 단계.
    if (canCloze) candidates.push('cloze', 'cloze');
    candidates.push('context');
  } else if (item.stage === 'apply') {
    // 뜻을 구별하고, 바꿔 쓰고, 반대말과 견주는 단계.
    if (isPolysemous) candidates.push('polysemy', 'polysemy');
    if (exp.hasSynonym) candidates.push('synonym');
    if (canAntonym) candidates.push('antonym');
    if (canCloze) candidates.push('cloze', 'listening');
    candidates.push('context');
  } else if (item.stage === 'build') {
    // 낱말을 순서대로 놓아 문장을 만드는 단계.
    // 문장이 너무 짧거나 길면 배열 문제가 되지 않으므로 앞 단계로 돌린다.
    if (canScramble(exp.example.en)) candidates.push('scramble', 'scramble', 'scramble');
    if (isPolysemous) candidates.push('polysemy');
    if (exp.hasSynonym) candidates.push('synonym');
    if (canCloze) candidates.push('cloze');
    if (candidates.length === 0) candidates.push('context');
  } else {
    // 스스로 떠올려 쓰는 단계.
    if (canCloze) candidates.push('clozeType', 'clozeType', 'clozeType');
    if (canScramble(exp.example.en)) candidates.push('scramble');
    if (isPolysemous) candidates.push('polysemy');
    if (exp.hasSynonym) candidates.push('synonym');
    if (canAntonym) candidates.push('antonym');
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
  /**
   * 그 보기가 '어떤 뜻을 차지하는지'. 하나라도 겹치면 정답이 둘이 된다.
   *
   * 글자가 똑같은 것만 걸러서는 부족하다. `목표`와 `목표, 목적`은 다른
   * 문자열이지만 둘 다 정답이다. 아이는 맞게 이해하고도 틀렸다는 말을
   * 듣고, 앱은 그 단어를 '모르는 단어'로 기록해 계속 다시 낸다.
   * 기본값은 보기 글자 자체라, 안 넘기면 예전과 똑같이 동작한다.
   */
  keysOf: (item: T) => string[] = (item) => [label(item)],
): T[] {
  const taken = new Set(keysOf(answer).map(norm));
  const others: T[] = [];

  for (const item of shuffle(pool, rand)) {
    if (others.length >= count - 1) break;
    const keys = keysOf(item).map(norm);
    if (keys.some((k) => taken.has(k))) continue;
    for (const k of keys) taken.add(k);
    others.push(item);
  }

  return shuffle([answer, ...others], rand);
}

/** 비교할 때 눈에 안 보이는 차이(대소문자·공백·물결표)를 지운다. */
function norm(s: string): string {
  return s.trim().toLowerCase().replace(/^~+|~+$/g, '').replace(/\s+/g, ' ');
}

/**
 * 한국어 뜻을 '차지하는 뜻' 목록으로 쪼갠다.
 *
 * `기술, 능력` 과 `기법, 기술` 은 겹친다. 쉼표로 나눠 보면 그것이 보인다.
 * 전체 문자열도 함께 넣어, 쪼갤 것이 없는 뜻도 서로 비교된다.
 */
/**
 * 그 표현이 **빈칸에서 차지하는 자리.**
 *
 * ── 왜 뜻만으로는 모자란가 ──────────────────────────────────
 *
 * 여태 오답 보기를 거를 때 본 것은 낱말 글자와 **한국어 뜻**뿐이었다. 뜻이
 * 겹치면 빈칸에 넣어도 말이 되니 오답이 될 수 없다는 생각이었고, 거기까지는
 * 맞다. 그런데 뜻을 **다르게 적어 둔** 짝은 그 그물을 그대로 빠져나간다.
 *
 *     a lot of      많은          ← many · much · lots of
 *     a number of   다수의, 여러   ← several · many
 *
 * 뜻 글자가 하나도 안 겹친다. 그래서 서로 오답 보기가 됐다. 하지만
 * "___ people came to the festival." 에는 **둘 다 들어간다.** 아이는 맞는
 * 문장을 만들어 놓고 틀렸다는 말을 듣고, 앱은 그 표현을 '모르는 것' 으로
 * 적어 계속 다시 낸다. 실제로 그 말을 들었다.
 *
 * 둘이 이어져 있다는 표는 뜻이 아니라 **바꿔 쓸 표현 목록**에 있었다. 둘 다
 * `many` 를 갖고 있다. 하나라도 같은 것을 갖고 있으면 어느 문장에서는 서로
 * 바꿔 쓸 수 있다는 뜻이므로, 그 짝은 갈라 놓는다.
 *
 * ── 너무 많이 거르는 것 아닌가 ──────────────────────────────
 *
 * 조금 그렇다. 그리고 그래도 된다. 보기가 하나 덜 어려워지는 것과, 맞게 푼
 * 아이에게 틀렸다고 하는 것은 값이 다르다. 뽑을 후보는 수백 개라 넉 자리를
 * 채우는 데는 지장이 없다.
 */
export function expressionKeys(args: {
  word: string;
  meaning: string;
  synonyms: string[];
}): string[] {
  return [args.word, ...args.synonyms, ...meaningKeys(args.meaning)];
}

export function meaningKeys(meaning: string): string[] {
  const parts = meaning
    .split(/[,·/]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  return [...new Set([meaning.trim(), ...parts])];
}

export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
