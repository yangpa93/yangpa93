import {
  buildKoExam,
  canTakeKoExam,
  koExamWeakWords,
  koGameFor,
  nextKoRetryRound,
} from '../src/srs/koExam';
import { availableAwards, claimAward, KOREAN_LEVEL_AWARD } from '../src/features/awards';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { CardState, KoEntry, Profile, ProfileData } from '../src/types';

function card(over: Partial<CardState> = {}): CardState {
  return {
    entryId: 'x',
    ease: 2.5,
    // isMastered 는 intervalDays 를 본다. MASTERED_INTERVAL(21) 이상이라야
    // 완전 암기로 친다.
    intervalDays: 30,
    due: '2030-01-01',
    streak: 6,
    correct: 6,
    wrong: 0,
    lapses: 0,
    lastSeen: '2026-01-01',
    ...over,
  } as CardState;
}

function profile(over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '아이',
    kind: 'child',
    avatar: '🐻',
    level: 'm1-1',
    koLevel: 'm1-2',
    settings: {
      subjects: ['en', 'ko'],
      firstSubject: 'en',
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

const emptyData: ProfileData = { cards: {}, days: {}, logs: [], exams: [] } as unknown as ProfileData;

describe('buildKoExam', () => {
  it('그 레벨 어휘를 하나도 빠뜨리지 않는다', () => {
    const pool = KO_ENTRIES.filter((e) => e.level === 'm1-1');
    const items = buildKoExam(KO_ENTRIES, 'm1-1', () => 0.5);
    expect(items).toHaveLength(pool.length);
    expect(new Set(items.map((i) => i.entry.id))).toEqual(new Set(pool.map((e) => e.id)));
  });

  it('다른 레벨은 안 넣는다', () => {
    const items = buildKoExam(KO_ENTRIES, 'h2-1', () => 0.5);
    expect(items.every((i) => i.entry.level === 'h2-1')).toBe(true);
  });

  it('모든 문항에 유형이 붙는다', () => {
    const items = buildKoExam(KO_ENTRIES, 'm2-2', () => 0.5);
    expect(items.every((i) => i.game.length > 0)).toBe(true);
  });
});

describe('koGameFor', () => {
  const idioms = KO_ENTRIES.filter((e) => e.category === 'idiom' && e.level === 'm1-1');

  it('확인된 사자성어는 한자를 묻는다', () => {
    const target = idioms.find((e) => e.hanjaVerified && [...e.hanja].length === 4)!;
    expect(koGameFor(target, idioms, 0)).toBe('hanja');
  });

  it('확인 못 한 사자성어는 한자를 안 묻는다', () => {
    const unsure = KO_ENTRIES.find((e) => e.category === 'idiom' && !e.hanjaVerified)!;
    const pool = KO_ENTRIES.filter((e) => e.level === unsure.level);
    expect(koGameFor(unsure, pool, 0)).not.toBe('hanja');
  });

  it('빈칸을 못 뚫으면 뜻으로 내려간다', () => {
    const e: KoEntry = {
      id: 'ko-x',
      level: 'm1-1',
      category: 'csat',
      word: '기회비용',
      hanja: '機會費用',
      hanjaVerified: true,
      field: '경제',
      meaning: '포기한 대안의 가치',
      examples: [{ text: '전혀 다른 문장이다.' }],
    };
    expect(koGameFor(e, [e], 0)).toBe('context');
  });
});

describe('nextKoRetryRound', () => {
  it('예문을 한 칸 넘긴다 — 같은 문장으로 다시 묻지 않는다', () => {
    const items = buildKoExam(KO_ENTRIES, 'm1-1', () => 0.5).slice(0, 3);
    const pool = KO_ENTRIES.filter((e) => e.level === 'm1-1');
    const retry = nextKoRetryRound(items, pool, () => 0.5);
    expect(retry.every((i) => i.isRetry)).toBe(true);
    for (const r of retry) {
      const before = items.find((i) => i.entry.id === r.entry.id)!;
      expect(r.exposureIndex).toBe(before.exposureIndex + 1);
    }
  });
});

describe('canTakeKoExam', () => {
  const pool = KO_ENTRIES.filter((e) => e.level === 'm1-1');

  it('아무것도 안 외웠으면 못 본다', () => {
    expect(canTakeKoExam(KO_ENTRIES, {}, 'm1-1').allowed).toBe(false);
  });

  it('90%를 외우면 볼 수 있다', () => {
    const cards: Record<string, CardState> = {};
    for (const e of pool) cards[e.id] = card({ entryId: e.id });
    const got = canTakeKoExam(KO_ENTRIES, cards, 'm1-1');
    expect(got.allowed).toBe(true);
    expect(got.total).toBe(pool.length);
  });
});

describe('koExamWeakWords', () => {
  it('틀린 어휘를 중복 없이 모은다', () => {
    const items = buildKoExam(KO_ENTRIES, 'm1-1', () => 0.5).slice(0, 2);
    expect(koExamWeakWords([...items, items[0]])).toHaveLength(2);
  });
});

describe('국어 레벨업 동기 부여 요청권', () => {
  it('국어 레벨을 끝내면 1만원 동기 부여 요청권이 생긴다', () => {
    const p = profile({ koPendingLevelUps: ['m1-1'] });
    const awards = availableAwards(p, emptyData, '2026-07-30');
    const ko = awards.filter((a) => a.kind === 'koLevelup');
    expect(ko).toHaveLength(1);
    expect(ko[0].amount).toBe(KOREAN_LEVEL_AWARD);
    expect(ko[0].earnedFrom).toBe('m1-1');
  });

  it('영어와 국어 동기 부여 요청권이 따로 생긴다', () => {
    const p = profile({ pendingLevelUps: ['m1-1'], koPendingLevelUps: ['m1-1'] });
    const awards = availableAwards(p, emptyData, '2026-07-30');
    expect(awards.filter((a) => a.kind === 'levelup')).toHaveLength(1);
    expect(awards.filter((a) => a.kind === 'koLevelup')).toHaveLength(1);
    // 금액이 달라야 한다 — 영어 중학교 2만 / 국어 1만
    const en = awards.find((a) => a.kind === 'levelup')!;
    const ko = awards.find((a) => a.kind === 'koLevelup')!;
    expect(en.amount).not.toBe(ko.amount);
  });

  it('한 번 쓴 국어 동기 부여 요청권은 다시 안 생긴다', () => {
    const p = profile({ koPendingLevelUps: ['m1-1', 'm1-2'] });
    const award = availableAwards(p, emptyData, '2026-07-30').find((a) => a.kind === 'koLevelup')!;
    const after = claimAward(p, award);
    expect(after.koPendingLevelUps).toEqual(['m1-2']);
    // 영어 쪽은 건드리지 않는다.
    expect(after.pendingLevelUps).toEqual(p.pendingLevelUps);
  });

  it('국어 보상을 0원으로 꺼 두면 동기 부여 요청권이 안 생긴다', () => {
    const p = profile({ koPendingLevelUps: ['m1-1'] });
    const awards = availableAwards(p, emptyData, '2026-07-30', { koreanLevel: 0 });
    expect(awards.filter((a) => a.kind === 'koLevelup')).toHaveLength(0);
  });
});
