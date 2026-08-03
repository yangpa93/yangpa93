import {
  Award,
  availableAwards,
  awardRates,
  BONUS_AWARD,
  buildRewardRequest,
  levelPace,
  levelStartedAt,
  claimAward,
  formatWon,
  HIGH_LEVEL_AWARD,
  KOREAN_LEVEL_AWARD,
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
    kind: 'child',
    avatar: '🦊',
    level: 'm1-1',
    koLevel: 'm1-1',
    settings: {
      newPerDay: 10,
      reviewPerDay: 10,
      rounds: 3,
      subjects: ['en'],
      firstSubject: 'en',
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 0,
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    pendingLevelUps: [],
    koPendingLevelUps: [],
    clearedLevels: [],
    koClearedLevels: [],
    claimedMonths: [],
    awards: null,
    linkWaived: false,
    parentStudy: { tracks: ['daily'], dailyTheme: 'w', perTrack: { daily: 5, enWord: 5, ko: 5 } },
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
  it('레벨업 동기 부여 요청권은 학년에 따라 금액이 다르다', () => {
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

  it('개근한 달마다 동기 부여 요청권이 하나씩 생긴다', () => {
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

  it('레벨 시험 하나를 통과하면 동기 부여 요청권이 딱 한 장 생긴다', () => {
    // 아이 화면의 '🎟️ 동기 부여 요청권 N장 신청하기'가 이 규칙으로 셈된다.
    const one = availableAwards(
      makeProfile({ pendingLevelUps: ['m1-1' as LevelId] }),
      makeData(),
      '2026-07-27',
    );
    expect(one).toHaveLength(1);
    expect(one[0].kind).toBe('levelup');

    // 두 레벨을 끝냈으면 두 장. 레벨 하나에 한 장이다.
    const two = availableAwards(
      makeProfile({ pendingLevelUps: ['m1-1' as LevelId, 'm1-2' as LevelId] }),
      makeData(),
      '2026-07-27',
    );
    expect(two).toHaveLength(2);
    expect(two.every((a) => a.kind === 'levelup')).toBe(true);
  });

  it('한 달 개근하면 동기 부여 요청권이 딱 한 장 생긴다', () => {
    const one = availableAwards(makeProfile(), makeData(studiedDays('2026-06', 30)), '2026-07-27');
    expect(one).toHaveLength(1);
    expect(one[0].kind).toBe('perfectMonth');
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
  it('금액을 바꾸면 동기 부여 요청권 금액도 따라 바뀐다', () => {
    const rates = { middleLevel: 5_000, highLevel: 50_000, perfectMonth: 0, bonus: 20_000 };
    expect(levelUpAmount('m2-3', rates)).toBe(5_000);
    expect(levelUpAmount('h1-1', rates)).toBe(50_000);
  });

  it('아무것도 안 정했으면 기본값을 쓴다', () => {
    expect(awardRates(null)).toEqual({
      middleLevel: MIDDLE_LEVEL_AWARD,
      highLevel: HIGH_LEVEL_AWARD,
      koreanLevel: KOREAN_LEVEL_AWARD,
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

  it('0원으로 꺼 둔 동기 부여 요청권은 생기지 않는다', () => {
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

    // 개근만 켜 두면 개근 동기 부여 요청권만 생긴다.
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
/* 동기 부여 요청권 기록 만들기                                                   */
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

  test('같은 동기 부여 요청권을 두 번 써도 두 번 적히지 않는다', () => {
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

/* ------------------------------------------------------------------ */
/* 레벨을 얼마나 빨리 끝냈는지                                          */
/* ------------------------------------------------------------------ */

/** yyyy-mm-dd 를 그날 정오의 epoch ms 로. 시간대 경계에 걸리지 않게 정오를 쓴다. */
function at(day: string): number {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d, 12, 0, 0).getTime();
}

function makeCard(entryId: string, firstSeen: number) {
  return {
    entryId,
    ease: 2.5,
    intervalDays: 1,
    streak: 0,
    correct: 0,
    wrong: 0,
    lapses: 0,
    due: '2026-07-01',
    lastSeen: firstSeen,
    firstSeen,
  };
}

describe('levelStartedAt', () => {
  test('그 레벨 단어 중 가장 먼저 본 시각', () => {
    const cards = {
      a: makeCard('a', at('2026-06-10')),
      b: makeCard('b', at('2026-06-03')),
      c: makeCard('c', at('2026-06-20')),
    };
    expect(levelStartedAt(['a', 'b', 'c'], cards)).toBe(at('2026-06-03'));
  });

  test('아직 안 본 단어는 세지 않는다', () => {
    const cards = { a: makeCard('a', at('2026-06-10')) };
    // b, c 는 카드 자체가 없다 — 아직 만나지 않은 단어다.
    expect(levelStartedAt(['a', 'b', 'c'], cards)).toBe(at('2026-06-10'));
  });

  test('하나도 안 봤으면 null', () => {
    expect(levelStartedAt(['a', 'b'], {})).toBeNull();
  });

  test('firstSeen 이 깨져 있으면 무시한다', () => {
    // 예전 저장본이나 손으로 고친 파일에서 0이나 NaN 이 들어올 수 있다.
    const cards = {
      a: makeCard('a', 0),
      b: makeCard('b', NaN),
      c: makeCard('c', at('2026-06-15')),
    };
    expect(levelStartedAt(['a', 'b', 'c'], cards)).toBe(at('2026-06-15'));
  });
});

describe('levelPace', () => {
  test('계획보다 짧게 걸렸으면 앞당긴 것', () => {
    // 100단어를 하루 10개씩이면 10일 계획. 7일에 끝냈다.
    const p = levelPace({
      totalWords: 100,
      newPerDay: 10,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-07'),
    });
    expect(p.plannedDays).toBe(10);
    expect(p.actualDays).toBe(7);
    expect(p.faster).toBe(true);
    expect(p.daysAhead).toBe(3);
  });

  test('계획대로면 앞당긴 것이 아니다', () => {
    // 근거로 쓰는 숫자라 넉넉하게 잡지 않는다.
    const p = levelPace({
      totalWords: 100,
      newPerDay: 10,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-10'),
    });
    expect(p.actualDays).toBe(10);
    expect(p.faster).toBe(false);
    expect(p.daysAhead).toBe(0);
  });

  test('계획보다 오래 걸려도 음수가 나오지 않는다', () => {
    const p = levelPace({
      totalWords: 100,
      newPerDay: 10,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-30'),
    });
    expect(p.faster).toBe(false);
    expect(p.daysAhead).toBe(0);
  });

  test('시작한 날과 끝낸 날을 모두 센다', () => {
    const p = levelPace({
      totalWords: 20,
      newPerDay: 5,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-01'),
    });
    expect(p.actualDays).toBe(1);
    expect(p.plannedDays).toBe(4);
    expect(p.daysAhead).toBe(3);
  });

  test('하루 분량이 많으면 계획 날수가 줄어 앞당기기 어렵다', () => {
    // 아이가 스스로 고른 속도라 유리하게만 굴러가지 않는다.
    const slow = levelPace({
      totalWords: 100,
      newPerDay: 5,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-15'),
    });
    expect(slow.plannedDays).toBe(20);
    expect(slow.faster).toBe(true);

    const fast = levelPace({
      totalWords: 100,
      newPerDay: 20,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-15'),
    });
    expect(fast.plannedDays).toBe(5);
    expect(fast.faster).toBe(false);
  });

  test('기록이 모자라면 앞당기지 않은 것으로 본다', () => {
    const noStart = levelPace({
      totalWords: 100,
      newPerDay: 10,
      startedAt: null,
      clearedAt: at('2026-06-07'),
    });
    expect(noStart.actualDays).toBeNull();
    expect(noStart.faster).toBe(false);

    const noClear = levelPace({
      totalWords: 100,
      newPerDay: 10,
      startedAt: at('2026-06-01'),
      clearedAt: null,
    });
    expect(noClear.actualDays).toBeNull();
    expect(noClear.faster).toBe(false);
  });

  test('값이 깨져 있어도 0으로 나누지 않는다', () => {
    const p = levelPace({
      totalWords: 0,
      newPerDay: 0,
      startedAt: at('2026-06-01'),
      clearedAt: at('2026-06-02'),
    });
    expect(p.plannedDays).toBe(1);
    expect(Number.isFinite(p.daysAhead)).toBe(true);
  });
});
