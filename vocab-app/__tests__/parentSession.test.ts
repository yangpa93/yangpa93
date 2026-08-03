/**
 * 부모님 하루치가 어떻게 채워지는지.
 *
 * 여기서 지키려는 것은 셋이다.
 *  · 켠 갈래만 나온다 (안 고른 것을 공부하게 되면 안 된다)
 *  · 하루 분량을 갈래끼리 나눠 갖는다 (셋을 켜도 하루가 세 배가 되면 안 된다)
 *  · 갈래를 섞지 않는다 (머리를 갈래 사이에서 오가게 하지 않는다)
 */

import {
  buildParentQueue,
  parentPlannedCount,
  parentTrackProgress,
  reviewCapOf,
  perTrackCount,
  parentDailyTotal,
  TRACK_ORDER,
} from '../src/srs/parentSession';
import { DAILY_THEME_LIST } from '../src/data/daily';
import { CardState, ParentStudy, Profile, ParentTrack } from '../src/types';

/** 난수를 없앤다. 같은 입력이면 같은 큐가 나와야 확인할 수 있다. */
const fixedRand = () => 0;

function profile(study: Partial<ParentStudy> = {}, over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '엄마',
    kind: 'parent',
    avatar: '👩‍💼',
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
    parentStudy: {
      tracks: ['daily'],
      dailyTheme: DAILY_THEME_LIST[0].id,
      perTrack: { daily: 5, enWord: 5, ko: 5 },
      ...study,
    },
    ...over,
  };
}

const noCards: Record<string, CardState> = {};

describe('perTrackCount', () => {
  it('켠 갈래는 고른 값 그대로, 안 켠 것은 0', () => {
    /*
     * 여기가 이번 판에서 뜻이 통째로 바뀐 자리다. 예전에는 전체 합계 하나를
     * 켠 갈래끼리 나눠 가졌고(셋이면 4/3/3), 그래서 '하루에 10개'가 일상
     * 문장 10개인지 셋을 합쳐 10개인지 화면만 보고는 알 수 없었다.
     * 지금은 고른 숫자가 곧 그 갈래의 개수다.
     */
    const got = perTrackCount(
      profile({ tracks: ['daily'], perTrack: { daily: 10, enWord: 5, ko: 5 } }).parentStudy,
    );
    expect(got).toEqual({ daily: 10, enWord: 0, ko: 0 });
  });

  it('셋을 켜면 셋 다 자기 값을 가져간다 — 나누지 않는다', () => {
    const got = perTrackCount(
      profile({
        tracks: ['daily', 'enWord', 'ko'],
        perTrack: { daily: 10, enWord: 5, ko: 5 },
      }).parentStudy,
    );
    expect(got).toEqual({ daily: 10, enWord: 5, ko: 5 });
    // 합계는 20이다. 예전이라면 10을 셋이 나눠 4/3/3 이었다.
    expect(got.daily + got.enWord + got.ko).toBe(20);
  });

  it('하나도 안 켜면 아무 갈래도 몫이 없다', () => {
    expect(perTrackCount(profile({ tracks: [] }).parentStudy)).toEqual({
      daily: 0,
      enWord: 0,
      ko: 0,
    });
  });

  it('안 켠 갈래의 저장값은 무시한다', () => {
    // 껐다 다시 켰을 때 예전에 고른 값이 살아 있게 하려고 지우지 않는다.
    // 그래서 세는 쪽에서 걸러야 한다.
    const got = perTrackCount(
      profile({ tracks: ['ko'], perTrack: { daily: 10, enWord: 10, ko: 5 } }).parentStudy,
    );
    expect(got).toEqual({ daily: 0, enWord: 0, ko: 5 });
  });

  it('저장값이 깨져 있어도 0으로 떨어진다', () => {
    const got = perTrackCount(
      profile({ tracks: ['daily'], perTrack: { daily: NaN, enWord: 5, ko: 5 } }).parentStudy,
    );
    expect(got.daily).toBe(0);
  });
});

describe('parentDailyTotal', () => {
  it('켠 갈래의 개수를 다 더한다', () => {
    const total = parentDailyTotal(
      profile({
        tracks: ['daily', 'ko'],
        perTrack: { daily: 10, enWord: 10, ko: 5 },
      }).parentStudy,
    );
    // enWord 는 안 켰으므로 빠진다.
    expect(total).toBe(15);
  });
});

describe('reviewCapOf', () => {
  it('복습 상한은 그 갈래의 새 개수와 같다', () => {
    const p = profile({
      tracks: ['daily', 'ko'],
      perTrack: { daily: 10, enWord: 10, ko: 5 },
    }).parentStudy;
    expect(reviewCapOf(p, 'daily')).toBe(10);
    expect(reviewCapOf(p, 'ko')).toBe(5);
  });

  it('안 켠 갈래는 복습도 없다', () => {
    const p = profile({ tracks: ['daily'], perTrack: { daily: 5, enWord: 10, ko: 10 } }).parentStudy;
    expect(reviewCapOf(p, 'enWord')).toBe(0);
  });
});

describe('buildParentQueue', () => {
  it('하나도 안 고르면 낼 문제가 없다', () => {
    expect(buildParentQueue({ profile: profile({ tracks: [] }), cards: noCards })).toHaveLength(0);
  });

  it('켠 갈래의 문항만 나온다', () => {
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily'], perTrack: { daily: 5, enWord: 5, ko: 5 } }),
      cards: noCards,
      rand: fixedRand,
    });
    expect(q.length).toBeGreaterThan(0);
    for (const item of q) {
      expect(item.track).toBe('daily');
      expect(item.entry.id.startsWith('daily-')).toBe(true);
    }
  });

  it('일상 문장은 고른 주제 안에서만 나온다', () => {
    const theme = DAILY_THEME_LIST[2];
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily'], dailyTheme: theme.id, perTrack: { daily: 5, enWord: 5, ko: 5 } }),
      cards: noCards,
      rand: fixedRand,
    });
    const allowed = new Set(theme.entries.map((e) => e.id));
    for (const item of q) expect(allowed.has(item.entry.id)).toBe(true);
  });

  it('하루 분량만큼만 새로 만난다', () => {
    const count = parentPlannedCount({
      profile: profile({ tracks: ['daily'], perTrack: { daily: 5, enWord: 5, ko: 5 } }),
      cards: noCards,
      rand: fixedRand,
    });
    expect(count).toBe(5);
  });

  it('갈래를 섞지 않고 화면 순서대로 이어 붙인다', () => {
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily', 'enWord', 'ko'], perTrack: { daily: 9, enWord: 9, ko: 9 } }),
      cards: noCards,
      rand: fixedRand,
    });
    // 큐에 나타나는 순서대로 갈래를 적으면, 같은 갈래가 한 덩어리여야 한다.
    const blocks: ParentTrack[] = [];
    for (const item of q) {
      if (blocks[blocks.length - 1] !== item.track) blocks.push(item.track);
    }
    expect(blocks).toEqual(blocks.filter((t, i) => blocks.indexOf(t) === i));
    for (const t of blocks) expect(TRACK_ORDER).toContain(t);
    // 순서는 TRACK_ORDER 를 따른다.
    expect(blocks).toEqual(TRACK_ORDER.filter((t) => blocks.includes(t)));
  });

  it('라운드 수만큼 되풀이해 만난다', () => {
    const one = buildParentQueue({
      profile: profile({ tracks: ['daily'], perTrack: { daily: 5, enWord: 5, ko: 5 } }),
      cards: noCards,
      rounds: 1,
      rand: fixedRand,
    });
    const three = buildParentQueue({
      profile: profile({ tracks: ['daily'], perTrack: { daily: 5, enWord: 5, ko: 5 } }),
      cards: noCards,
      rounds: 3,
      rand: fixedRand,
    });
    expect(three.length).toBe(one.length * 3);
  });

  it('모든 문항이 문장을 갖고 있다', () => {
    // "모든 문제는 문장으로 낸다". 예문이 없으면 뜻만 묻는 문제가 된다.
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily', 'enWord'], perTrack: { daily: 10, enWord: 10, ko: 10 } }),
      cards: noCards,
      rand: fixedRand,
    });
    for (const item of q) {
      if (item.track === 'ko') continue;
      expect(item.entry.senses[item.senseIndex].examples.length).toBeGreaterThan(0);
    }
  });
});

describe('parentTrackProgress', () => {
  it('아직 아무것도 안 봤으면 0', () => {
    const p = profile({ tracks: ['daily'] });
    const got = parentTrackProgress(p, noCards, 'daily');
    expect(got.seen).toBe(0);
    expect(got.total).toBe(DAILY_THEME_LIST[0].entries.length);
  });

  it('본 것만 센다', () => {
    const p = profile({ tracks: ['daily'] });
    const first = DAILY_THEME_LIST[0].entries[0];
    const cards = { [first.id]: { entryId: first.id } as CardState };
    expect(parentTrackProgress(p, cards, 'daily').seen).toBe(1);
  });
});
