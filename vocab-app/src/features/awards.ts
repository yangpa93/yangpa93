/**
 * 동기 부여 요청권.
 *
 * 아이가 무엇을 갖고 싶은지 적어 보내는 방식이 아니라, **정해진 금액을
 * 요구할 권리**를 얻는 방식이다. 조건과 금액이 미리 정해져 있어서 아이는
 * "얼마짜리가 걸려 있는지"를 알고 공부하고, 부모는 매번 협상하지 않아도 된다.
 *
 *   중학교 레벨업   2만원
 *   고등학교 레벨업 3만원
 *   한 달 개근      2만원
 *
 * 이 금액은 **부모님 모드에서 바꿀 수 있다**(AwardRates). 집집마다 사정이
 * 달라서 숫자를 코드에 박아 두면 쓸 수 없기 때문이다. 0원으로 두면 그
 * 동기 부여 요청권은 아예 생기지 않는다.
 *
 * 여기에 더해 아이가 "이번엔 정말 잘했어요"라며 **정해진 금액만큼 더**
 * 요구할 수 있다(기본 1만원). 얼마든 부르는 방식이 아니라 한 칸만 올릴 수
 * 있게 한 것은, 매번 금액을 흥정하지 않게 하려는 동기 부여 요청권의 취지를 지키면서도
 * 아이가 스스로 잘했다고 말할 자리를 주기 위해서다.
 *
 * 화면과 분리된 순수 함수라 테스트가 쉽다.
 */

import {
  AwardRates,
  CardState,
  DailyRecord,
  LevelId,
  Profile,
  ProfileData,
  RewardOrigin,
  RewardRequest,
  gradeOf,
} from '../types';
import { daysInMonth, monthOf } from './calendar';
import { diffDays, toKey, todayKey } from '../lib/date';

/** 중학교 레벨 하나를 끝냈을 때 (기본값) */
export const MIDDLE_LEVEL_AWARD = 20_000;
/** 고등학교 레벨 하나를 끝냈을 때 (기본값) */
export const HIGH_LEVEL_AWARD = 30_000;
/**
 * 국어 레벨 하나를 끝냈을 때 (기본값).
 *
 * 영어와 따로 센다. 국어는 한 레벨이 60개(영어는 137개)라 분량이 절반이 안
 * 되고, 같은 금액을 주면 영어 쪽이 손해로 느껴진다.
 */
export const KOREAN_LEVEL_AWARD = 10_000;

/** 한 달을 하루도 빠짐없이 학습했을 때 (기본값) */
export const PERFECT_MONTH_AWARD = 20_000;
/**
 * 아이가 "정말 잘했어요" 라며 더 요구할 수 있는 금액.
 *
 * **지금은 0 이다 — 이 기능을 껐다.** 부모가 금액을 정하는 칸을 없앴고
 * (AwardRatesEditor), 아이 화면의 「더 요구할래요」 도 이 값이 0 이면 안 뜬다.
 *
 * 값 자체는 남겨 둔다. 이미 신청해 둔 요청권에 그때 얹은 금액이 적혀 있어서,
 * 칸을 통째로 지우면 지난 기록을 읽을 수 없게 된다.
 */
export const BONUS_AWARD = 0;

/** 부모님이 아무것도 안 바꿨을 때 쓰는 금액표. */
export const DEFAULT_AWARD_RATES: AwardRates = {
  middleLevel: MIDDLE_LEVEL_AWARD,
  highLevel: HIGH_LEVEL_AWARD,
  koreanLevel: KOREAN_LEVEL_AWARD,
  perfectMonth: PERFECT_MONTH_AWARD,
  bonus: BONUS_AWARD,
};

/** 저장된 값이 비었거나 깨져 있어도 항상 온전한 금액표를 돌려준다. */
export function awardRates(rates?: Partial<AwardRates> | null): AwardRates {
  const r = { ...DEFAULT_AWARD_RATES, ...(rates ?? {}) };
  const clean = (n: unknown, fallback: number) =>
    typeof n === 'number' && Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback;
  return {
    middleLevel: clean(r.middleLevel, MIDDLE_LEVEL_AWARD),
    highLevel: clean(r.highLevel, HIGH_LEVEL_AWARD),
    koreanLevel: clean(r.koreanLevel, KOREAN_LEVEL_AWARD),
    perfectMonth: clean(r.perfectMonth, PERFECT_MONTH_AWARD),
    /*
     * **늘 0 이다.** 「더 요구하기」 를 껐다. 예전에 10,000 으로 저장해 둔
     * 프로필이 있어서, 저장값을 그대로 쓰면 그 아이에게만 단추가 남는다.
     * 정하는 칸을 없앴으니 되돌릴 길도 없다 — 여기서 눌러 둔다.
     */
    bonus: 0,
  };
}

/**
 * 이 아이에게 적용할 금액표.
 *
 * 아이가 자기 금액표를 갖고 있으면 그것을, 없으면 기기 기본값을 쓴다.
 * 아이마다 다르게 두고 싶은 집(중학생과 고등학생을 같은 금액으로 두면
 * 한쪽은 늘 손해로 느낀다)과, 하나로 충분한 집을 둘 다 받으려는 것이다.
 */
export function ratesOf(
  profile: { awards?: AwardRates | null } | null | undefined,
  deviceRates?: Partial<AwardRates> | null,
): AwardRates {
  return awardRates(profile?.awards ?? deviceRates);
}

/**
 * 동기 부여 요청권의 종류.
 *
 * 영어 레벨업과 국어 레벨업을 따로 둔다. 금액이 다르고(영어 중학교 2만·
 * 고등학교 3만 / 국어 1만), 아이가 목록에서 무엇으로 받는 것인지 알아야
 * 하기 때문이다.
 */
export type AwardKind = 'levelup' | 'koLevelup' | 'perfectMonth';

export const AWARD_LABEL: Record<AwardKind, string> = {
  levelup: '영어 레벨업',
  koLevelup: '국어 레벨업',
  perfectMonth: '한 달 개근',
};

/** 레벨 하나를 끝냈을 때 받는 금액. 중학교와 고등학교 금액이 다르다. */
export function levelUpAmount(level: LevelId, rates?: Partial<AwardRates> | null): number {
  const r = awardRates(rates);
  return gradeOf(level).startsWith('m') ? r.middleLevel : r.highLevel;
}

/** 아직 요청하지 않은 동기 부여 요청권 하나. */
export interface Award {
  kind: AwardKind;
  amount: number;
  /** levelup이면 어떤 레벨을 끝냈는지 */
  earnedFrom: LevelId | null;
  /** perfectMonth면 어느 달인지 (yyyy-mm) */
  month: string | null;
  /** 화면에 그대로 쓰는 한 줄 */
  reason: string;
}

export function formatWon(amount: number): string {
  // 20000 → '2만원'. 만 단위로 딱 떨어지지 않으면 그대로 적는다.
  if (amount % 10_000 === 0) return `${amount / 10_000}만원`;
  return `${amount.toLocaleString('ko-KR')}원`;
}

/**
 * 부모가 손으로 적은 금액을 읽는다. 못 읽으면 null.
 *
 * **왜 숫자만 남기는가.** 금액 칸에 '3만', '30,000', '30000원' 이 다 들어온다.
 * 셋 다 같은 뜻인데 하나만 받으면 나머지를 적은 부모는 "안 먹힌다"고 여기고
 * 그냥 기본값으로 둔다. 쉼표와 '원' 은 떼고 숫자만 본다.
 *
 * 다만 **'만' 은 안 풀어 준다.** '3만' 을 30,000 으로 읽는 규칙을 넣으면
 * '3만5천' 같은 것을 어떻게 읽을지가 애매해지고, 잘못 읽으면 돈이 걸린
 * 자리에서 열 배 틀린 값이 조용히 저장된다. 숫자만 받는 편이 안전하다.
 *
 * 상한(1,000만원)은 손이 미끄러져 0 을 더 친 것을 막으려는 것이다.
 */
export const MAX_AWARD_INPUT = 10_000_000;

export function parseWon(text: string): number | null {
  const digits = (text ?? '').replace(/[^0-9]/g, '');
  if (digits === '') return null;
  const n = Number(digits);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.min(n, MAX_AWARD_INPUT);
}

/**
 * 그 달을 하루도 빠짐없이 학습했는지.
 *
 * 목표를 채웠는지가 아니라 **그날 학습을 했는지**로 본다. 목표까지 요구하면
 * 몸이 아픈 날 하루에 한 달이 통째로 날아가서, 아이가 중간에 포기해 버린다.
 */
export function isPerfectMonth(days: Record<string, DailyRecord>, month: string): boolean {
  const count = daysInMonth(month);
  for (let d = 1; d <= count; d++) {
    const key = `${month}-${String(d).padStart(2, '0')}`;
    if ((days[key]?.studied ?? 0) <= 0) return false;
  }
  return true;
}

/**
 * 개근을 채운 달들. 과거→현재 순.
 *
 * **끝난 달만** 센다. 아직 진행 중인 달은 남은 날에 빠질 수 있어서,
 * 마지막 날이 지나야 확정된다.
 */
export function perfectMonths(
  days: Record<string, DailyRecord>,
  today: string = todayKey(),
): string[] {
  const months = [...new Set(Object.keys(days).map(monthOf))].sort();
  const thisMonth = monthOf(today);
  const lastDay = `${thisMonth}-${String(daysInMonth(thisMonth)).padStart(2, '0')}`;

  return months.filter((m) => {
    // 이번 달은 마지막 날이 되어야 확정된다.
    if (m > thisMonth) return false;
    if (m === thisMonth && today < lastDay) return false;
    return isPerfectMonth(days, m);
  });
}

/**
 * 지금 요청할 수 있는 동기 부여 요청권 목록.
 *
 * 이미 요청한 것은 빠진다. 레벨업은 `pendingLevelUps`가, 개근은
 * `claimedMonths`가 중복을 막는다.
 */
export function availableAwards(
  profile: Profile,
  data: ProfileData,
  today: string = todayKey(),
  rates?: Partial<AwardRates> | null,
): Award[] {
  const r = awardRates(rates);
  const out: Award[] = [];

  for (const level of profile.pendingLevelUps) {
    const amount = levelUpAmount(level, r);
    // 0원으로 꺼 둔 동기 부여 요청권은 만들지 않는다. 금액이 없는 동기 부여 요청권을 보내면
    // 아이도 부모도 무엇을 판단해야 하는지 알 수 없다.
    if (amount <= 0) continue;
    out.push({
      kind: 'levelup',
      amount,
      earnedFrom: level,
      month: null,
      reason: `영어 ${gradeOf(level).startsWith('m') ? '중학교' : '고등학교'} 레벨 하나를 끝냈어요`,
    });
  }

  // 국어는 학년에 따라 금액이 갈리지 않는다. 24레벨 모두 같은 금액이다.
  for (const level of profile.koPendingLevelUps ?? []) {
    if (r.koreanLevel <= 0) continue;
    out.push({
      kind: 'koLevelup',
      amount: r.koreanLevel,
      earnedFrom: level,
      month: null,
      reason: '국어 레벨 하나를 끝냈어요',
    });
  }

  const claimed = new Set(profile.claimedMonths ?? []);
  for (const month of perfectMonths(data.days, today)) {
    if (claimed.has(month)) continue;
    if (r.perfectMonth <= 0) continue;
    const [, m] = month.split('-');
    out.push({
      kind: 'perfectMonth',
      amount: r.perfectMonth,
      earnedFrom: null,
      month,
      reason: `${Number(m)}월 한 달을 하루도 빠짐없이 공부했어요`,
    });
  }

  return out;
}

/* ------------------------------------------------------------------ */
/* 레벨 하나를 얼마나 빨리 끝냈는지                                     */
/* ------------------------------------------------------------------ */

/**
 * 그 레벨 단어를 처음 만난 시각(epoch ms). 아직 하나도 안 봤으면 null.
 *
 * 레벨을 언제 시작했는지는 따로 적어 두지 않는다. 대신 그 레벨 단어 중
 * 가장 먼저 본 것의 시각이 곧 시작한 날이다.
 */
export function levelStartedAt(
  entryIds: string[],
  cards: Record<string, CardState>,
): number | null {
  let earliest: number | null = null;
  for (const id of entryIds) {
    const seen = cards[id]?.firstSeen;
    if (typeof seen !== 'number' || !Number.isFinite(seen) || seen <= 0) continue;
    if (earliest === null || seen < earliest) earliest = seen;
  }
  return earliest;
}

export interface LevelPace {
  /** 그 레벨을 시작한 날. 기록이 없으면 null */
  startedOn: string | null;
  /** 시험에 통과한 날. 아직이면 null */
  clearedOn: string | null;
  /** 실제로 걸린 날수. 시작한 날과 통과한 날을 모두 센다. */
  actualDays: number | null;
  /** 하루 새 단어 수로 계산한 계획 날수 */
  plannedDays: number;
  /** 계획보다 빨리 끝냈는지 */
  faster: boolean;
  /** 며칠 빨랐는지. 빠르지 않았으면 0 */
  daysAhead: number;
}

/**
 * 레벨 하나를 계획보다 빨리 끝냈는지.
 *
 * 계획은 단순하다 — 그 레벨 단어를 하루 정한 개수씩 만나면 며칠이 걸리는가.
 * 실제로 그보다 짧게 걸렸으면 앞당긴 것이다.
 *
 * 이 숫자를 쓰는 곳은 아이가 "만원 더 주세요"라고 말할 근거다. 그래서
 * 넉넉하게 잡지 않는다 — 계획대로 했으면 앞당긴 것이 아니다(같은 날수는
 * faster가 아니다). 기록이 모자라 계산할 수 없으면 앞당기지 않은 것으로 본다.
 */
export function levelPace(args: {
  /** 그 레벨의 표제어 수 */
  totalWords: number;
  /** 하루에 새로 만나기로 한 단어 수 */
  newPerDay: number;
  /** 레벨을 시작한 시각 (epoch ms) */
  startedAt: number | null;
  /** 시험에 통과한 시각 (epoch ms) */
  clearedAt: number | null;
}): LevelPace {
  const perDay = Math.max(1, Math.round(args.newPerDay));
  const plannedDays = Math.max(1, Math.ceil(Math.max(0, args.totalWords) / perDay));

  const startedOn = args.startedAt != null ? toKey(new Date(args.startedAt)) : null;
  const clearedOn = args.clearedAt != null ? toKey(new Date(args.clearedAt)) : null;

  if (startedOn === null || clearedOn === null) {
    return { startedOn, clearedOn, actualDays: null, plannedDays, faster: false, daysAhead: 0 };
  }

  // 시작한 날과 통과한 날을 모두 센다. 하루 만에 끝냈으면 1일이다.
  const actualDays = Math.max(1, diffDays(clearedOn, startedOn) + 1);
  const faster = actualDays < plannedDays;

  return {
    startedOn,
    clearedOn,
    actualDays,
    plannedDays,
    faster,
    daysAhead: faster ? plannedDays - actualDays : 0,
  };
}

/* ------------------------------------------------------------------ */
/* 동기 부여 요청권 하나를 기록으로 만들기                                        */
/* ------------------------------------------------------------------ */

/**
 * 동기 부여 요청권 기록 하나를 만드는 데 필요한 것 전부.
 *
 * id와 시각을 밖에서 받는 이유: 이 함수를 순수하게 두려고. 안에서
 * Date.now()나 난수를 부르면 테스트에서 결과를 못 박을 수 없다.
 */
export interface NewReward {
  id: string;
  profileId: string;
  award: Award;
  origin: RewardOrigin;
  now: number;
  /** 아이가 "정말 잘했어요"라며 얹은 금액. 부모가 먼저 줄 때는 0. */
  bonus?: number;
  /** 왜 더 받을 만한지 아이가 적은 이유 */
  bonusReason?: string;
  /** 아이가 덧붙인 한마디 */
  note?: string;
  /** 부모가 남긴 한마디 */
  parentNote?: string;
  /** 얹을 수 있는 상한(원). 부모님이 정한 한 칸. */
  bonusCap: number;
}

/**
 * 동기 부여 요청권 기록을 만든다.
 *
 * 아이가 신청하든 부모가 먼저 주든 남는 기록의 모양은 같아야 한다.
 * 그래야 나중에 "언제 얼마를 왜 줬는지"를 한 줄로 훑을 수 있다.
 * 다른 점은 두 가지뿐이다.
 *   - origin — 누가 만들었는지
 *   - status — 아이 신청은 부모 판단을 기다리고(pending),
 *              부모가 먼저 준 것은 이미 정해진 것이다(approved).
 *
 * 얹는 금액은 부모님이 정한 한 칸을 넘지 못한다. 얼마든 부르는 방식이
 * 아니라 "한 칸만 올릴 수 있다"가 동기 부여 요청권의 취지다.
 */
export function buildRewardRequest(input: NewReward): RewardRequest {
  const { id, profileId, award, origin, now } = input;

  // 부모가 먼저 주는 자리에는 아이가 얹을 기회 자체가 없었다.
  const cap = Math.max(0, Math.round(input.bonusCap));
  const extra =
    origin === 'parent' ? 0 : Math.max(0, Math.min(Math.round(input.bonus ?? 0), cap));

  return {
    id,
    profileId,
    kind: award.kind,
    amount: award.amount + extra,
    baseAmount: award.amount,
    bonus: extra,
    bonusReason: extra > 0 ? (input.bonusReason ?? '').trim() : '',
    earnedFrom: award.earnedFrom,
    month: award.month,
    reason: award.reason,
    note: (input.note ?? '').trim(),
    status: origin === 'parent' ? 'approved' : 'pending',
    createdAt: now,
    // 부모가 먼저 준 것은 만든 순간이 곧 정해진 순간이다.
    decidedAt: origin === 'parent' ? now : null,
    parentNote: (input.parentNote ?? '').trim(),
    origin,
  };
}

/**
 * 동기 부여 요청권 하나를 쓴 뒤의 프로필.
 *
 * 같은 동기 부여 요청권을 두 번 받지 못하도록 원장에서 지운다. 레벨업은
 * `pendingLevelUps`에서 빼고, 개근은 `claimedMonths`에 적어 둔다.
 * 아이가 신청했든 부모가 먼저 줬든 똑같이 한 번만 쓸 수 있어야 한다.
 */
export function claimAward(profile: Profile, award: Award): Profile {
  if (award.kind === 'levelup') {
    return {
      ...profile,
      pendingLevelUps: profile.pendingLevelUps.filter((l) => l !== award.earnedFrom),
    };
  }
  if (award.kind === 'koLevelup') {
    return {
      ...profile,
      koPendingLevelUps: (profile.koPendingLevelUps ?? []).filter((l) => l !== award.earnedFrom),
    };
  }
  if (award.month && !profile.claimedMonths.includes(award.month)) {
    return { ...profile, claimedMonths: [...profile.claimedMonths, award.month] };
  }
  return profile;
}

/** 이번 달 개근까지 며칠 남았는지. 화면에 진행 상황을 보여주는 데 쓴다. */
export function perfectMonthProgress(
  days: Record<string, DailyRecord>,
  today: string = todayKey(),
): { month: string; studied: number; elapsed: number; total: number; alive: boolean } {
  const month = monthOf(today);
  const total = daysInMonth(month);
  const day = Number(today.slice(8));

  let studied = 0;
  for (let d = 1; d <= day; d++) {
    const key = `${month}-${String(d).padStart(2, '0')}`;
    if ((days[key]?.studied ?? 0) > 0) studied++;
  }

  return { month, studied, elapsed: day, total, alive: studied === day };
}
