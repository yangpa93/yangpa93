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
  splitPerTrack,
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
      newPerDay: 5,
      ...study,
    },
    ...over,
  };
}

const noCards: Record<string, CardState> = {};

describe('splitPerTrack', () => {
  it('하나만 켜면 다 가져간다', () => {
    const got = splitPerTrack(profile({ tracks: ['daily'], newPerDay: 10 }).parentStudy);
    expect(got).toEqual({ daily: 10, enWord: 0, ko: 0 });
  });

  it('셋을 켜면 나눠 갖는다. 나머지는 앞 갈래부터', () => {
    const got = splitPerTrack(
      profile({ tracks: ['daily', 'enWord', 'ko'], newPerDay: 10 }).parentStudy,
    );
    // 10을 셋으로 나누면 4·3·3. 합은 그대로 10이라야 한다.
    expect(got.daily + got.enWord + got.ko).toBe(10);
    expect(got.daily).toBe(4);
    expect(got.enWord).toBe(3);
    expect(got.ko).toBe(3);
  });

  it('하나도 안 켜면 아무 갈래도 몫이 없다', () => {
    expect(splitPerTrack(profile({ tracks: [] }).parentStudy)).toEqual({
      daily: 0,
      enWord: 0,
      ko: 0,
    });
  });

  it('갈래가 하루 분량보다 많아도 합이 넘치지 않는다', () => {
    const got = splitPerTrack(
      profile({ tracks: ['daily', 'enWord', 'ko'], newPerDay: 5 }).parentStudy,
    );
    expect(got.daily + got.enWord + got.ko).toBe(5);
  });
});

describe('reviewCapOf', () => {
  it('복습 상한은 새로 배우는 개수와 같다', () => {
    expect(reviewCapOf(profile({ newPerDay: 5 }).parentStudy)).toBe(5);
    expect(reviewCapOf(profile({ newPerDay: 10 }).parentStudy)).toBe(10);
  });
});

describe('buildParentQueue', () => {
  it('하나도 안 고르면 낼 문제가 없다', () => {
    expect(buildParentQueue({ profile: profile({ tracks: [] }), cards: noCards })).toHaveLength(0);
  });

  it('켠 갈래의 문항만 나온다', () => {
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily'], newPerDay: 5 }),
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
      profile: profile({ tracks: ['daily'], dailyTheme: theme.id, newPerDay: 5 }),
      cards: noCards,
      rand: fixedRand,
    });
    const allowed = new Set(theme.entries.map((e) => e.id));
    for (const item of q) expect(allowed.has(item.entry.id)).toBe(true);
  });

  it('하루 분량만큼만 새로 만난다', () => {
    const count = parentPlannedCount({
      profile: profile({ tracks: ['daily'], newPerDay: 5 }),
      cards: noCards,
      rand: fixedRand,
    });
    expect(count).toBe(5);
  });

  it('갈래를 섞지 않고 화면 순서대로 이어 붙인다', () => {
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily', 'enWord', 'ko'], newPerDay: 9 }),
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
      profile: profile({ tracks: ['daily'], newPerDay: 5 }),
      cards: noCards,
      rounds: 1,
      rand: fixedRand,
    });
    const three = buildParentQueue({
      profile: profile({ tracks: ['daily'], newPerDay: 5 }),
      cards: noCards,
      rounds: 3,
      rand: fixedRand,
    });
    expect(three.length).toBe(one.length * 3);
  });

  it('모든 문항이 문장을 갖고 있다', () => {
    // "모든 문제는 문장으로 낸다". 예문이 없으면 뜻만 묻는 문제가 된다.
    const q = buildParentQueue({
      profile: profile({ tracks: ['daily', 'enWord'], newPerDay: 10 }),
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
