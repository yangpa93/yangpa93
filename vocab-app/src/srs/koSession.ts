/**
 * 오늘의 국어 세션을 구성한다.
 *
 * 영어의 `session.ts` 와 짜임은 같지만 **갈래 배분**이 하나 더 있다.
 * 하루 6개를 아무렇게나 뽑으면 어느 날은 사자성어만 여섯 개가 나온다.
 * 갈래를 고루 섞어야 네 갈래가 같은 속도로 끝나고, 아이도 지루하지 않다.
 *
 * 카드(학습 기록)는 영어와 같은 저장소를 쓴다. id 앞에 `ko-` 가 붙어 있어
 * 섞이지 않는다. SRS 계산도 그대로 쓴다 — 복습 간격을 국어라고 달리 둘
 * 이유가 없다.
 */

import { CardState, GameId, KoCategory, KoEntry, LevelId, Stage, STAGE_ORDER } from '../types';
import { isDue, todayKey } from '../lib/date';
import { koCloze, koExample } from '../data/korean/entry';
import { exposureCount } from '../data/entry';
import { canHanja, buildHanjaChoices } from '../games/hanja';
import { canScramble } from '../games/scramble';
import { isMastered, priority } from './scheduler';
import { ceilingOf } from './session';

export interface KoSessionItem {
  entry: KoEntry;
  card: CardState | null;
  mode: 'review' | 'new';
  game: GameId;
  stage: Stage;
  round: number;
  exposureIndex: number;
  firstMeeting: boolean;
}

/**
 * 하루치 갈래 배분.
 *
 * 사자성어 1~2 · 고유어 0~1 · 개념어 1 · 고전 0~1 · 수능 3 을 말한 것인데,
 * 소수점으로 두면 날마다 갈래가 미묘하게 달라져 오히려 자연스럽다. 정수로
 * 못 박으면 고전(145개)이 절반쯤에서 바닥나고 사자성어만 남는다.
 *
 * 값은 '섞을 때의 무게'다. 이 비율로 자리를 나눈다.
 *
 * **고유어 무게는 개수에 맞춰 정했다.** 139개로 고전(150개)과 비슷해서
 * 그쪽과 같은 0.6 을 준다. 그래야 두 갈래가 비슷한 때에 바닥난다.
 */
export const DAILY_MIX: Record<KoCategory, number> = {
  idiom: 1.3,
  native: 0.6,
  concept: 0.9,
  classic: 0.6,
  csat: 3.2,
};

/** 갈래 순서. 자리를 나눌 때 앞의 갈래가 먼저 몫을 가져간다. */
const ORDER: KoCategory[] = ['idiom', 'native', 'concept', 'classic', 'csat'];

export interface BuildKoSessionArgs {
  entries: KoEntry[];
  cards: Record<string, CardState>;
  level: LevelId;
  /** 하루에 새로 만날 어휘 수. 기본 6개. */
  newPerDay: number;
  /** 하루 복습 상한 */
  reviewPerDay: number;
  today?: string;
  rand?: () => number;
}

/**
 * 갈래별로 오늘 몇 개씩 낼지 정한다.
 *
 * 무게에 비례해 나누되, 남는 자리는 무게가 큰 갈래부터 준다. 6개면
 * 사자성어 1 · 개념어 1 · 고전 1 · 수능 3 쯤으로 떨어진다.
 */
export function splitByCategory(total: number, rand: () => number = Math.random): Record<KoCategory, number> {
  const sum = ORDER.reduce((a, c) => a + DAILY_MIX[c], 0);
  const exact = ORDER.map((c) => ({ c, want: (DAILY_MIX[c] / sum) * total }));

  const out = { idiom: 0, native: 0, concept: 0, classic: 0, csat: 0 } as Record<KoCategory, number>;
  for (const { c, want } of exact) out[c] = Math.floor(want);

  // 소수점 때문에 남은 자리. 나머지가 큰 갈래부터 하나씩 준다.
  let left = total - ORDER.reduce((a, c) => a + out[c], 0);
  const byRemainder = [...exact].sort(
    (a, b) => (b.want - Math.floor(b.want)) - (a.want - Math.floor(a.want)),
  );
  // 나머지가 똑같으면 순서가 늘 같아 한쪽만 이득을 본다. 조금 흔들어 준다.
  if (byRemainder.length > 1 && rand() < 0.5) {
    [byRemainder[0], byRemainder[1]] = [byRemainder[1], byRemainder[0]];
  }
  for (const { c } of byRemainder) {
    if (left <= 0) break;
    out[c] += 1;
    left -= 1;
  }

  return out;
}

/** 오늘 계획된 어휘 수. 실제로 뽑힌 만큼을 그날 목표로 쓴다. */
export function plannedKoCount(args: BuildKoSessionArgs): number {
  return new Set(buildKoSession(args).map((i) => i.entry.id)).size;
}

export function buildKoSession({
  entries,
  cards,
  level,
  newPerDay,
  reviewPerDay,
  today = todayKey(),
  rand = Math.random,
}: BuildKoSessionArgs): KoSessionItem[] {
  const pool = entries.filter((e) => e.level === level);

  // 복습을 먼저 채운다. 갈래를 따지지 않는다 — 잊기 직전인 것이 우선이다.
  const reviewable = pool
    .filter((e) => {
      const c = cards[e.id];
      return c != null && isDue(c.due, today);
    })
    .sort((a, b) => priority(cards[b.id], today) - priority(cards[a.id], today));

  const picked: KoEntry[] = [];
  const modes = new Map<string, 'review' | 'new'>();

  for (const e of reviewable) {
    if (picked.length >= reviewPerDay) break;
    picked.push(e);
    modes.set(e.id, 'review');
  }

  // 새 어휘는 갈래별 몫만큼.
  const quota = splitByCategory(newPerDay, rand);
  const already = new Set(picked.map((e) => e.id));

  for (const category of ORDER) {
    const fresh = pool.filter(
      (e) => e.category === category && cards[e.id] == null && !already.has(e.id),
    );
    for (const e of fresh.slice(0, quota[category])) {
      picked.push(e);
      modes.set(e.id, 'new');
      already.add(e.id);
    }
  }

  // 어느 갈래가 동나면 다른 갈래에서 당겨온다. 하루 6개를 채우는 것이
  // 갈래 비율보다 중요하다 — 고전은 145개뿐이라 뒤로 갈수록 자주 빈다.
  const newCount = [...modes.values()].filter((m) => m === 'new').length;
  if (newCount < newPerDay) {
    const fresh = pool.filter((e) => cards[e.id] == null && !already.has(e.id));
    for (const e of fresh.slice(0, newPerDay - newCount)) {
      picked.push(e);
      modes.set(e.id, 'new');
      already.add(e.id);
    }
  }

  // 새 어휘가 다 떨어졌으면 복습으로 채운다.
  const goal = newPerDay + reviewPerDay;
  if (picked.length < goal) {
    const rest = pool
      .filter((e) => !already.has(e.id) && cards[e.id] && !isMastered(cards[e.id]))
      .sort((a, b) => priority(cards[b.id], today) - priority(cards[a.id], today));
    for (const e of rest) {
      if (picked.length >= goal) break;
      picked.push(e);
      modes.set(e.id, 'review');
      already.add(e.id);
    }
  }

  return picked.map((entry) => {
    const card = cards[entry.id] ?? null;
    const item: KoSessionItem = {
      entry,
      card,
      mode: modes.get(entry.id) ?? 'new',
      game: 'cloze',
      stage: 'learn',
      round: 0,
      // 어제까지 본 횟수만큼 밀어 둬야 오늘도 어제와 다른 문장에서 시작한다.
      exposureIndex: exposureCount(card),
      firstMeeting: false,
    };
    return { ...item, game: pickKoGame(item, entries, rand) };
  });
}

/** 둘 중 쉬운 쪽 */
function easier(a: Stage, b: Stage): Stage {
  return STAGE_ORDER.indexOf(a) <= STAGE_ORDER.indexOf(b) ? a : b;
}

export function buildKoRounds(
  items: KoSessionItem[],
  rounds: number,
  pool: KoEntry[],
  rand: () => number = Math.random,
): KoSessionItem[] {
  const wanted: Stage[] = ['learn', 'apply', 'recall'];
  const out: KoSessionItem[] = [];

  for (let r = 0; r < rounds; r++) {
    const want = wanted[Math.min(r, wanted.length - 1)];
    const metOnce = new Set<string>();

    for (const item of shuffle(items, rand)) {
      const firstMeeting = r === 0 && item.mode === 'new' && !metOnce.has(item.entry.id);
      if (firstMeeting) metOnce.add(item.entry.id);

      const staged: KoSessionItem = {
        ...item,
        stage: easier(want, ceilingOf(item.card)),
        round: r,
        exposureIndex: item.exposureIndex + r,
        firstMeeting,
        game: 'cloze',
      };
      out.push({ ...staged, game: pickKoGame(staged, pool, rand) });
    }
  }

  return out;
}

/**
 * 문항에 맞는 유형을 고른다.
 *
 * 갈래마다 무엇을 물어야 하는지가 다르다.
 *
 *   사자성어  한자를 묻는다. 넉 자 한자를 익히는 것이 이 갈래의 핵심이다.
 *   고전      옛말이 요즘 말로 무슨 뜻인지 묻는다.
 *   개념어    문장 속 쓰임을 묻는다. 정의를 외우는 것만으로는 지문에서 못 쓴다.
 *   수능      마찬가지로 문장 속 쓰임.
 *
 * 빈칸을 못 뚫는 예문(표제어가 활용형으로 흩어져 있거나 예문에 표제어가
 * 아예 안 나오는 경우)에는 빈칸 유형을 내지 않고 뜻 유형으로 돌린다.
 */
export function pickKoGame(
  item: KoSessionItem,
  pool: KoEntry[],
  rand: () => number = Math.random,
): GameId {
  const { entry, stage } = item;
  const ex = koExample(entry, item.exposureIndex);
  const canCloze = ex != null && koCloze(ex.text, entry.word) != null;
  // 한자 문제는 보기 넷을 만들 수 있을 때만. 사전에서 확인 못 한 한자와
  // 같은 길이 짝이 모자란 성어는 여기서 걸러진다.
  const canPickHanja =
    entry.category === 'idiom' && canHanja(entry) && buildHanjaChoices(entry, pool, rand).length === 4;

  const candidates: GameId[] = [];

  if (stage === 'learn') {
    /*
     * 사자성어는 첫 만남부터 한자를 묻는다.
     *
     * 예전에는 '활용하기' 단계부터 냈다. 그런데 새 어휘는 연속 정답이 0이라
     * 늘 '익히기'에 머물고, 그래서 처음 며칠 동안 한자 문제가 한 번도 안
     * 나왔다. 사자성어를 배우는데 한자를 안 보는 셈이었다.
     *
     * 어렵지도 않다 — 뜻을 보고 넷 중에서 고르는 것이라 빈칸 채우기와
     * 난이도가 비슷하다. 오히려 이것이 사자성어의 핵심이다.
     */
    if (canPickHanja) candidates.push('hanja', 'hanja');
    if (canCloze) candidates.push('cloze', 'cloze');
    candidates.push('context');
  } else if (stage === 'apply') {
    if (canPickHanja) candidates.push('hanja', 'hanja');
    if (canCloze) candidates.push('cloze');
    candidates.push('context');
  } else if (stage === 'build') {
    if (ex && canScramble(ex.text)) candidates.push('scramble', 'scramble');
    if (canPickHanja) candidates.push('hanja');
    if (canCloze) candidates.push('cloze');
    if (candidates.length === 0) candidates.push('context');
  } else {
    // 스스로 떠올려 쓰는 단계. 사자성어는 한자를 고르는 것이 더 어렵다.
    if (canPickHanja) candidates.push('hanja', 'hanja');
    if (canCloze) candidates.push('clozeType', 'clozeType');
    if (candidates.length === 0) candidates.push('context');
  }

  const i = Math.floor(rand() * candidates.length);
  return candidates[Math.min(i, candidates.length - 1)];
}

export function shuffle<T>(list: T[], rand: () => number = Math.random): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
