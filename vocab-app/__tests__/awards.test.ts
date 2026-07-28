import {
  Award,
  availableAwards,
  awardRates,
  BONUS_AWARD,
  buildRewardRequest,
  claimAward,
  formatWon,
  HIGH_LEVEL_AWARD,
  isPerfectMonth,
  levelUpAmount,
  MIDDLE_LEVEL_AWARD,
  PERFECT_MONTH_AWARD,
  perfectMonthProgress,
  perfectMonths,
} from '../src/features/awards';
import { DailyRecord, LevelId, Profile, ProfileData } from '../src/types';

function makeProfile(over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '서준',
    avatar: '🦊',
    level: 'm1-1',
    settings: {
      newPerDay: 10,
      reviewPerDay: 10,
      rounds: 3,
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 0,
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    pendingLevelUps: [],
    clearedLevels: [],
    claimedMonths: [],
    ...over,
  };
}

function makeData(days: Record<string, DailyRecord> = {}): ProfileData {
  return { cards: {}, days, answers: [], exams: [] };
}

/** 그 달 1일부터 `upto`일까지 학습한 것으로 채운다. */
function studiedDays(month: string, upto: number, skip: number[] = []) {
  const days: Record<string, DailyRecord> = {};
  for (let d = 1; d <= upto; d++) {
    if (skip.includes(d)) continue;
    const date = `${month}-${String(d).padStart(2, '0')}`;
    days[date] = {
      date,
      goal: 20,
      studied: 20,
      correct: 18,
      wrong: 2,
      seconds: 600,
      completed: true,
      wrongEntryIds: [],
    };
  }
  return days;
}

describe('levelUpAmount', () => {
  it('중학교는 2만원, 고등학교는 3만원', () => {
    expect(levelUpAmount('m1-1')).toBe(MIDDLE_LEVEL_AWARD);
    expect(levelUpAmount('m3-4')).toBe(MIDDLE_LEVEL_AWARD);
    expect(levelUpAmount('h1-1')).toBe(HIGH_LEVEL_AWARD);
    expect(levelUpAmount('h3-4')).toBe(HIGH_LEVEL_AWARD);
  });
});

describe('formatWon', () => {
  it('만 단위로 딱 떨어지면 만원으로 적는다', () => {
    expect(formatWon(20_000)).toBe('2만원');
    expect(formatWon(30_000)).toBe('3만원');
    expect(formatWon(50_000)).toBe('5만원');
  });

  it('떨어지지 않으면 그대로 적는다', () => {
    expect(formatWon(15_000)).toBe('15,000원');
  });
});

describe('isPerfectMonth', () => {
  it('그 달 모든 날에 학습이 있어야 개근이다', () => {
    // 2026년 6월은 30일까지
    expect(isPerfectMonth(studiedDays('2026-06', 30), '2026-06')).toBe(true);
    expect(isPerfectMonth(studiedDays('2026-06', 29), '2026-06')).toBe(false);
  });

  it('중간에 하루라도 빠지면 개근이 아니다', () => {
    expect(isPerfectMonth(studiedDays('2026-06', 30, [14]), '2026-06')).toBe(false);
  });

  it('윤년 2월도 맞게 센다', () => {
    expect(isPerfectMonth(studiedDays('2028-02', 29), '2028-02')).toBe(true);
    expect(isPerfectMonth(studiedDays('2028-02', 28), '2028-02')).toBe(false);
  });

  it('목표를 못 채운 날도 학습만 했으면 인정한다', () => {
    // 아픈 날 하루에 한 달이 통째로 날아가면 아이가 포기해 버린다.
    const days = studiedDays('2026-06', 30);
    days['2026-06-14'] = { ...days['2026-06-14'], studied: 3, completed: false };
    expect(isPerfectMonth(days, '2026-06')).toBe(true);
  });
});

describe('perfectMonths', () => {
  it('끝난 달만 센다', () => {
    const days = { ...studiedDays('2026-06', 30), ...studiedDays('2026-07', 27) };
    // 7월 27일 기준 — 7월은 아직 안 끝났다.
    expect(perfectMonths(days, '2026-07-27')).toEqual(['2026-06']);
  });

  it('그 달 마지막 날이 되면 이번 달도 센다', () => {
    const days = studiedDays('2026-07', 31);
    expect(perfectMonths(days, '2026-07-31')).toEqual(['2026-07']);
  });

  it('기록이 없으면 빈 목록', () => {
    expect(perfectMonths({}, '2026-07-27')).toEqual([]);
  });
});

describe('availableAwards', () => {
  it('레벨업 요구권은 학년에 따라 금액이 다르다', () => {
    const middle = availableAwards(
      makeProfile({ pendingLevelUps: ['m2-3' as LevelId] }),
      makeData(),
      '2026-07-27',
    );
    expect(middle).toHaveLength(1);
    expect(middle[0].amount).toBe(20_000);

    const high = availableAwards(
      makeProfile({ pendingLevelUps: ['h1-2' as LevelId] }),
      makeData(),
      '2026-07-27',
    );
    expect(high[0].amount).toBe(30_000);
  });

  it('개근한 달마다 요구권이 하나씩 생긴다', () => {
    const days = { ...studiedDays('2026-05', 31), ...studiedDays('2026-06', 30) };
    const awards = availableAwards(makeProfile(), makeData(days), '2026-07-27');

    expect(awards).toHaveLength(2);
    expect(awards.every((a) => a.amount === PERFECT_MONTH_AWARD)).toBe(true);
    expect(awards.map((a) => a.month)).toEqual(['2026-05', '2026-06']);
  });

  it('이미 신청한 달은 다시 나오지 않는다', () => {
    const days = studiedDays('2026-06', 30);
    const awards = availableAwards(
      makeProfile({ claimedMonths: ['2026-06'] }),
      makeData(days),
      '2026-07-27',
    );
    expect(awards).toEqual([]);
  });

  it('레벨업과 개근이 겹치면 둘 다 나온다', () => {
    const days = studiedDays('2026-06', 30);
    const awards = availableAwards(
      makeProfile({ pendingLevelUps: ['h3-1' as LevelId] }),
      makeData(days),
      '2026-07-27',
    );
    expect(awards.map((a) => a.amount)).toEqual([30_000, 20_000]);
  });
});

describe('perfectMonthProgress', () => {
  it('오늘까지 며칠 했는지 센다', () => {
    const p = perfectMonthProgress(studiedDays('2026-07', 27), '2026-07-27');
    expect(p).toEqual({ month: '2026-07', studied: 27, elapsed: 27, total: 31, alive: true });
  });

  it('하루라도 빠지면 이번 달 개근은 끝난다', () => {
    const p = perfectMonthProgress(studiedDays('2026-07', 27, [3]), '2026-07-27');
    expect(p.studied).toBe(26);
    expect(p.alive).toBe(false);
  });
});

describe('부모님이 정하는 금액표', () => {
  it('금액을 바꾸면 요구권 금액도 따라 바뀐다', () => {
    const rates = { middleLevel: 5_000, highLevel: 50_000, perfectMonth: 0, bonus: 20_000 };
    expect(levelUpAmount('m2-3', rates)).toBe(5_000);
    expect(levelUpAmount('h1-1', rates)).toBe(50_000);
  });

  it('아무것도 안 정했으면 기본값을 쓴다', () => {
    expect(awardRates(null)).toEqual({
      middleLevel: MIDDLE_LEVEL_AWARD,
      highLevel: HIGH_LEVEL_AWARD,
      perfectMonth: PERFECT_MONTH_AWARD,
      bonus: BONUS_AWARD,
    });
  });

  it('저장된 값이 깨져 있어도 기본값으로 메운다', () => {
    // 예전 저장본에는 이 설정이 아예 없고, 손으로 고친 파일은 깨질 수 있다.
    const r = awardRates({ middleLevel: -1, highLevel: NaN, perfectMonth: 15_000 } as never);
    expect(r.middleLevel).toBe(MIDDLE_LEVEL_AWARD);
    expect(r.highLevel).toBe(HIGH_LEVEL_AWARD);
    expect(r.perfectMonth).toBe(15_000);
    expect(r.bonus).toBe(BONUS_AWARD);
  });

  it('0원으로 꺼 둔 요구권은 생기지 않는다', () => {
    // 돈 대신 다른 약속으로 대신하고 싶은 집을 위한 것.
    const profile = makeProfile({ pendingLevelUps: ['m1-1'] });
    const data = makeData(studiedDays('2026-06', 30));

    const off = availableAwards(profile, data, '2026-07-01', {
      middleLevel: 0,
      highLevel: 0,
      perfectMonth: 0,
      bonus: 0,
    });
    expect(off).toEqual([]);

    // 개근만 켜 두면 개근 요구권만 생긴다.
    const onlyMonth = availableAwards(profile, data, '2026-07-01', {
      middleLevel: 0,
      highLevel: 0,
      perfectMonth: 30_000,
      bonus: 0,
    });
    expect(onlyMonth.map((a) => a.kind)).toEqual(['perfectMonth']);
    expect(onlyMonth[0].amount).toBe(30_000);
  });
});

/* ------------------------------------------------------------------ */
/* 요구권 기록 만들기                                                   */
/* ------------------------------------------------------------------ */

const LEVELUP: Award = {
  kind: 'levelup',
  amount: 20_000,
  earnedFrom: 'm1-1',
  month: null,
  reason: '중학교 레벨 하나를 끝냈어요',
};

const MONTH: Award = {
  kind: 'perfectMonth',
  amount: 20_000,
  earnedFrom: null,
  month: '2026-06',
  reason: '6월 한 달을 하루도 빠짐없이 공부했어요',
};

describe('buildRewardRequest', () => {
  test('아이가 신청하면 부모 판단을 기다린다', () => {
    const r = buildRewardRequest({
      id: 'r1',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'child',
      now: 1000,
      bonusCap: BONUS_AWARD,
      note: '  두 달 동안 하루도 안 빠졌어요  ',
    });

    expect(r.status).toBe('pending');
    expect(r.decidedAt).toBeNull();
    expect(r.origin).toBe('child');
    expect(r.amount).toBe(20_000);
    expect(r.baseAmount).toBe(20_000);
    expect(r.bonus).toBe(0);
    // 앞뒤 공백은 저장 전에 턴다.
    expect(r.note).toBe('두 달 동안 하루도 안 빠졌어요');
    expect(r.reason).toBe(LEVELUP.reason);
  });

  test('아이가 얹은 금액은 기본 금액과 따로 남는다', () => {
    const r = buildRewardRequest({
      id: 'r1',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'child',
      now: 1000,
      bonusCap: 10_000,
      bonus: 10_000,
      bonusReason: '시험을 한 번에 다 맞혔어요',
    });

    expect(r.baseAmount).toBe(20_000);
    expect(r.bonus).toBe(10_000);
    expect(r.amount).toBe(30_000);
    expect(r.bonusReason).toBe('시험을 한 번에 다 맞혔어요');
  });

  test('얹는 금액은 부모님이 정한 한 칸을 넘지 못한다', () => {
    const over = buildRewardRequest({
      id: 'r1',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'child',
      now: 1000,
      bonusCap: 10_000,
      bonus: 999_999,
    });
    expect(over.bonus).toBe(10_000);
    expect(over.amount).toBe(30_000);

    // 음수를 넣어도 깎이지 않는다.
    const negative = buildRewardRequest({
      id: 'r1',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'child',
      now: 1000,
      bonusCap: 10_000,
      bonus: -5_000,
    });
    expect(negative.bonus).toBe(0);
    expect(negative.amount).toBe(20_000);

    // 부모님이 추가 요구를 0으로 꺼 두면 얹을 수 없다.
    const off = buildRewardRequest({
      id: 'r1',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'child',
      now: 1000,
      bonusCap: 0,
      bonus: 10_000,
    });
    expect(off.bonus).toBe(0);
  });

  test('얹지 않았으면 이유는 남기지 않는다', () => {
    const r = buildRewardRequest({
      id: 'r1',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'child',
      now: 1000,
      bonusCap: 10_000,
      bonus: 0,
      bonusReason: '적다 만 글',
    });
    expect(r.bonusReason).toBe('');
  });

  test('부모가 먼저 주면 승인된 상태로 태어난다', () => {
    const r = buildRewardRequest({
      id: 'r2',
      profileId: 'p1',
      award: MONTH,
      origin: 'parent',
      now: 2000,
      bonusCap: BONUS_AWARD,
      parentNote: '  이번 달 정말 잘했어  ',
    });

    expect(r.status).toBe('approved');
    expect(r.decidedAt).toBe(2000);
    expect(r.origin).toBe('parent');
    expect(r.parentNote).toBe('이번 달 정말 잘했어');
    expect(r.month).toBe('2026-06');
    expect(r.amount).toBe(20_000);
  });

  test('부모가 먼저 줄 때는 얹은 금액이 붙지 않는다', () => {
    // 아이가 신청한 적이 없으니 "더 요구했다"는 것이 있을 수 없다.
    const r = buildRewardRequest({
      id: 'r2',
      profileId: 'p1',
      award: LEVELUP,
      origin: 'parent',
      now: 2000,
      bonusCap: 10_000,
      bonus: 10_000,
      bonusReason: '이건 들어가면 안 된다',
    });
    expect(r.bonus).toBe(0);
    expect(r.bonusReason).toBe('');
    expect(r.amount).toBe(20_000);
  });
});

describe('claimAward', () => {
  test('레벨업을 쓰면 그 레벨만 원장에서 빠진다', () => {
    const profile = makeProfile({ pendingLevelUps: ['m1-1', 'm1-2'] });
    const after = claimAward(profile, LEVELUP);
    expect(after.pendingLevelUps).toEqual(['m1-2']);
    expect(after.claimedMonths).toEqual([]);
    // 원본은 건드리지 않는다.
    expect(profile.pendingLevelUps).toEqual(['m1-1', 'm1-2']);
  });

  test('개근을 쓰면 그 달이 원장에 적힌다', () => {
    const profile = makeProfile();
    const after = claimAward(profile, MONTH);
    expect(after.claimedMonths).toEqual(['2026-06']);
  });

  test('같은 요구권을 두 번 써도 두 번 적히지 않는다', () => {
    const once = claimAward(makeProfile(), MONTH);
    const twice = claimAward(once, MONTH);
    expect(twice.claimedMonths).toEqual(['2026-06']);
  });

  test('쓰고 나면 다시 줄 수 있는 목록에서 사라진다', () => {
    // 부모가 먼저 주든 아이가 신청하든 한 번만 받을 수 있어야 한다.
    const profile = makeProfile({ pendingLevelUps: ['m1-1'] });
    const data = makeData();
    expect(availableAwards(profile, data, '2026-07-15')).toHaveLength(1);
    expect(availableAwards(claimAward(profile, LEVELUP), data, '2026-07-15')).toEqual([]);
  });
});
