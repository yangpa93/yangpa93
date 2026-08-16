import {
  Award,
  availableAwards,
  awardRates,
  BONUS_AWARD,
  buildRewardRequest,
  completedDays,
  DAILY_DONE_AWARD,
  dailyDoneAward,
  levelPace,
  levelStartedAt,
  claimAward,
  formatWon,
  HIGH_LEVEL_AWARD,
  KOREAN_LEVEL_AWARD,
  isPerfectMonth,
  levelUpAmount,
  MIDDLE_LEVEL_AWARD,
  MONTHLY_EFFORT_AWARD,
  monthlyPurseAwards,
  PERFECT_MONTH_AWARD,
  perfectMonthProgress,
  perfectMonths,
  purseOf,
} from '../src/features/awards';
import { DailyRecord, LevelId, Profile, ProfileData, RewardRequest } from '../src/types';

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

  it('0 은 「0만원」 이 아니라 「0원」', () => {
    /*
     * 0 도 만으로 나누어떨어져서 예전에는 「0만원」 이라고 적혔다. 저금통이 빈
     * 첫날 아이 화면에 그 말이 큼직하게 떴다.
     */
    expect(formatWon(0)).toBe('0원');
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

  it('개근으로는 이제 요청권이 안 생긴다', () => {
    /*
     * 하루도 안 빠져야 받는 방식을 껐다. 중순에 한 번 빠지면 남은 보름을
     * 버틸 이유가 사라지기 때문이다. 매일 쌓는 쪽(dailyDone)과 달 말
     * 공로금으로 갈음했다.
     *
     * 두 달을 내리 개근해도 안 나와야 한다.
     */
    const days = { ...studiedDays('2026-05', 31), ...studiedDays('2026-06', 30) };
    const awards = availableAwards(makeProfile(), makeData(days), '2026-07-27');
    expect(awards.filter((a) => a.kind === 'perfectMonth')).toEqual([]);
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

  it('한 달을 다 채워도 레벨업 말고는 안 나온다', () => {
    const days = studiedDays('2026-06', 30);
    const awards = availableAwards(
      makeProfile({ pendingLevelUps: ['h3-1' as LevelId] }),
      makeData(days),
      '2026-07-27',
    );
    expect(awards.map((a) => a.kind)).toEqual(['levelup']);
    expect(awards[0].amount).toBe(30_000);
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
      dailyDone: DAILY_DONE_AWARD,
      monthlyEffort: MONTHLY_EFFORT_AWARD,
      bonus: BONUS_AWARD,
    });
  });

  it('저장된 값이 깨져 있어도 기본값으로 메운다', () => {
    // 예전 저장본에는 이 설정이 아예 없고, 손으로 고친 파일은 깨질 수 있다.
    const r = awardRates({ middleLevel: -1, highLevel: NaN, dailyDone: 300 } as never);
    expect(r.middleLevel).toBe(MIDDLE_LEVEL_AWARD);
    expect(r.highLevel).toBe(HIGH_LEVEL_AWARD);
    expect(r.dailyDone).toBe(300);
    expect(r.bonus).toBe(BONUS_AWARD);
  });

  it('예전에 개근 금액을 저장해 둔 프로필도 0 으로 눌러 둔다', () => {
    /*
     * 개근 방식을 껐는데 저장값을 그대로 쓰면 그 아이에게만 요청권이 남는다.
     * 정하는 칸을 없앴으니 부모가 되돌릴 길도 없다.
     */
    expect(awardRates({ perfectMonth: 20_000 } as never).perfectMonth).toBe(0);
  });

  it('0원으로 꺼 둔 동기 부여 요청권은 생기지 않는다', () => {
    // 돈 대신 다른 약속으로 대신하고 싶은 집을 위한 것.
    const profile = makeProfile({ pendingLevelUps: ['m1-1'] });
    const data = makeData(studiedDays('2026-06', 30));

    const off = availableAwards(profile, data, '2026-07-01', {
      middleLevel: 0,
      highLevel: 0,
      dailyDone: 0,
      bonus: 0,
    });
    expect(off).toEqual([]);

    // 레벨업만 켜 두면 레벨업 요청권만 생긴다.
    const onlyLevel = availableAwards(profile, data, '2026-07-01', {
      middleLevel: 30_000,
      highLevel: 0,
      dailyDone: 0,
      bonus: 0,
    });
    expect(onlyLevel.map((a) => a.kind)).toEqual(['levelup']);
    expect(onlyLevel[0].amount).toBe(30_000);
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

/* ------------------------------------------------------------------ */
/* 매일 쌓고 달 말에 모아 받기                                          */
/* ------------------------------------------------------------------ */

/** 하루치 적립 신청 하나. 승인 여부를 골라 만든다. */
function dailyReq(date: string, status: RewardRequest['status'], amount = DAILY_DONE_AWARD): RewardRequest {
  return {
    id: `r-${date}`,
    profileId: 'p1',
    kind: 'dailyDone',
    amount,
    baseAmount: amount,
    bonus: 0,
    bonusReason: '',
    earnedFrom: null,
    month: null,
    date,
    reason: '오늘 공부를 다 마쳤어요',
    note: '',
    status,
    createdAt: 0,
    decidedAt: null,
    parentNote: '',
    origin: 'child',
  };
}

describe('dailyDoneAward', () => {
  const done = { '2026-08-15': { ...studiedDays('2026-08', 15)['2026-08-15'] } };

  it('오늘치를 다 마쳤으면 청구할 수 있다', () => {
    const got = dailyDoneAward(makeProfile(), makeData(done), [], '2026-08-15');
    expect(got?.kind).toBe('dailyDone');
    expect(got?.amount).toBe(DAILY_DONE_AWARD);
    expect(got?.date).toBe('2026-08-15');
  });

  it('아직 다 안 했으면 안 준다', () => {
    /*
     * 켠 갈래를 다 풀어야 하루가 끝난 것이다. 영어만 하고 그만둔 날에
     * 하루치가 나오면, 국어를 안 해도 받는 것이 되어 버린다.
     */
    const half = { '2026-08-15': { ...done['2026-08-15'], completed: false } };
    expect(dailyDoneAward(makeProfile(), makeData(half), [], '2026-08-15')).toBeNull();
  });

  it('기록이 아예 없는 날도 안 준다', () => {
    expect(dailyDoneAward(makeProfile(), makeData({}), [], '2026-08-15')).toBeNull();
  });

  it('하루에 한 번만 — 이미 냈으면 또 안 나온다', () => {
    const already = [dailyReq('2026-08-15', 'pending')];
    expect(dailyDoneAward(makeProfile(), makeData(done), already, '2026-08-15')).toBeNull();
  });

  it('거절당한 날도 다시 안 나온다', () => {
    // 다시 누를 수 있게 두면 될 때까지 누르는 단추가 된다.
    const rejected = [dailyReq('2026-08-15', 'rejected')];
    expect(dailyDoneAward(makeProfile(), makeData(done), rejected, '2026-08-15')).toBeNull();
  });

  it('어제 낸 것은 오늘을 막지 않는다', () => {
    const yesterday = [dailyReq('2026-08-14', 'approved')];
    expect(dailyDoneAward(makeProfile(), makeData(done), yesterday, '2026-08-15')).not.toBeNull();
  });

  it('0원으로 꺼 두면 안 생긴다', () => {
    const off = dailyDoneAward(makeProfile(), makeData(done), [], '2026-08-15', { dailyDone: 0 });
    expect(off).toBeNull();
  });
});

describe('purseOf — 그달에 쌓인 금액', () => {
  it('승인된 것만 더한다', () => {
    /*
     * 아이 화면에 "12,500원 모였어요" 라고 적혔는데 그중 얼마가 아직 승인
     * 안 된 것이면, 청구할 때 금액이 줄어 보인다. 승인된 것만 세면 늘 같다.
     */
    const rewards = [
      dailyReq('2026-08-01', 'approved'),
      dailyReq('2026-08-02', 'pending'),
      dailyReq('2026-08-03', 'rejected'),
      dailyReq('2026-08-04', 'fulfilled'),
    ];
    expect(purseOf(rewards, 'p1', '2026-08')).toBe(DAILY_DONE_AWARD * 2);
  });

  it('다른 달 것은 안 섞는다', () => {
    const rewards = [dailyReq('2026-07-31', 'approved'), dailyReq('2026-08-01', 'approved')];
    expect(purseOf(rewards, 'p1', '2026-08')).toBe(DAILY_DONE_AWARD);
  });

  it('다른 아이 것은 안 센다', () => {
    const other = { ...dailyReq('2026-08-01', 'approved'), profileId: 'p2' };
    expect(purseOf([other], 'p1', '2026-08')).toBe(0);
  });
});

describe('monthlyPurseAwards — 달이 바뀌면 모아 받기', () => {
  /** 8월에 `n`일치가 승인되어 쌓인 상태. */
  const approvedIn = (month: string, n: number) =>
    Array.from({ length: n }, (_, i) => dailyReq(`${month}-${String(i + 1).padStart(2, '0')}`, 'approved'));

  it('지난달 쌓인 것을 청구할 수 있다', () => {
    const rewards = approvedIn('2026-08', 25);
    const got = monthlyPurseAwards(
      makeProfile(),
      makeData(studiedDays('2026-08', 25)),
      rewards,
      '2026-09-01',
    );
    expect(got).toHaveLength(1);
    expect(got[0].month).toBe('2026-08');
    expect(got[0].amount).toBe(DAILY_DONE_AWARD * 25);
  });

  it('이번 달은 아직 안 준다', () => {
    // 쌓이는 중에 받아 가면 남은 날의 몫을 어떻게 셀지가 엉킨다.
    const rewards = approvedIn('2026-09', 10);
    const got = monthlyPurseAwards(makeProfile(), makeData({}), rewards, '2026-09-20');
    expect(got).toEqual([]);
  });

  it('1일이 지나도 받을 수 있다', () => {
    /*
     * "매월 1일에 청구" 라고 해서 1일에만 되면, 그날 앱을 안 열면 한 달치가
     * 통째로 사라진다. 달이 바뀌면 언제든 받을 수 있어야 한다.
     */
    const rewards = approvedIn('2026-08', 25);
    const got = monthlyPurseAwards(makeProfile(), makeData({}), rewards, '2026-09-17');
    expect(got).toHaveLength(1);
  });

  it('놓친 달도 그대로 남는다', () => {
    // 받을 것이 조용히 사라지면 아이는 사라진 줄도 모른다.
    const rewards = [...approvedIn('2026-07', 20), ...approvedIn('2026-08', 25)];
    const got = monthlyPurseAwards(makeProfile(), makeData({}), rewards, '2026-09-05');
    expect(got.map((a) => a.month)).toEqual(['2026-07', '2026-08']);
  });

  it('이미 청구한 달은 다시 안 나온다', () => {
    const rewards = [
      ...approvedIn('2026-08', 25),
      { ...dailyReq('2026-08-01', 'approved'), kind: 'monthlyPurse', month: '2026-08', date: null },
    ] as RewardRequest[];
    expect(monthlyPurseAwards(makeProfile(), makeData({}), rewards, '2026-09-01')).toEqual([]);
  });

  it('스무닷새를 넘겼으면 부모가 얹을 금액을 제안한다', () => {
    const got = monthlyPurseAwards(
      makeProfile(),
      makeData(studiedDays('2026-08', 25)),
      approvedIn('2026-08', 25),
      '2026-09-01',
    );
    expect(got[0].effortSuggestion).toBe(MONTHLY_EFFORT_AWARD);
    expect(got[0].reason).toContain('25일');
  });

  it('스무닷새에 못 미치면 얹는 칸을 안 낸다', () => {
    // 늘 내면 그것이 정가가 되어, 안 얹는 달에 아이가 깎였다고 느낀다.
    const got = monthlyPurseAwards(
      makeProfile(),
      makeData(studiedDays('2026-08', 24)),
      approvedIn('2026-08', 24),
      '2026-09-01',
    );
    expect(got[0].effortSuggestion).toBe(0);
  });

  it('쌓인 것이 없으면 안 나온다', () => {
    // 하루치를 냈지만 부모가 다 거절한 달.
    const rejected = [dailyReq('2026-08-01', 'rejected'), dailyReq('2026-08-02', 'rejected')];
    expect(monthlyPurseAwards(makeProfile(), makeData({}), rejected, '2026-09-01')).toEqual([]);
  });
});

describe('completedDays', () => {
  it('그달에 목표를 채운 날을 센다', () => {
    expect(completedDays(studiedDays('2026-08', 25), '2026-08')).toBe(25);
  });

  it('다른 달은 안 센다', () => {
    const days = { ...studiedDays('2026-07', 31), ...studiedDays('2026-08', 10) };
    expect(completedDays(days, '2026-08')).toBe(10);
  });

  it('목표를 못 채운 날은 빼고 센다', () => {
    /*
     * 공부를 시작만 한 날은 안 센다. 공로금은 "끝까지 한 날" 을 세는 것이지
     * "앱을 켠 날" 을 세는 것이 아니다.
     */
    const days = studiedDays('2026-08', 10);
    days['2026-08-05'] = { ...days['2026-08-05'], completed: false };
    expect(completedDays(days, '2026-08')).toBe(9);
  });
});
