/**
 * 아이의 하루치가 켠 갈래를 그대로 따르는지.
 *
 * ── 여기서 지키려는 것 ──────────────────────────────────────
 *
 * 아이가 자기 폰에서 과목을 켜고 끌 수 있게 됐다. 그러면서 여태 없던 상태들이
 * 생긴다 — 영어를 끈 아이, 일상 문장만 켠 아이. 예전에는 그런 아이가 홈에
 * 들어가면 **영어 낱말 수가 '오늘 N개' 로 떠 있었다.** 세는 곳과 내는 곳이
 * 서로 다른 규칙이었기 때문이다. 그 둘이 같은 것을 보는지 여기서 못박는다.
 */

import { buildChildQueue, childPlannedCount, childPool, pickChildToday } from '../src/srs/childSession';
import { DAILY_ENTRIES } from '../src/data/daily';
import { entriesOf } from '../src/data';
import { CardState, Profile, Subject, SUBJECT_ORDER, toggleSubject } from '../src/types';

function child(subjects: Subject[]): Profile {
  return {
    id: 'c1',
    name: '서준',
    kind: 'child',
    avatar: '🦊',
    level: 'm1-1',
    koLevel: 'm1-1',
    settings: {
      subjects,
      firstSubject: 'en',
      newPerDay: 10,
      reviewPerDay: 10,
      rounds: 3,
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 1,
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
    parentStudy: { tracks: [], dailyTheme: 'w', perTrack: { daily: 5, enWord: 5, ko: 5 } },
  };
}

const NO_CARDS: Record<string, CardState> = {};
const args = (subjects: Subject[]) => ({
  profile: child(subjects),
  cards: NO_CARDS,
  today: '2026-08-03',
  rand: () => 0.5,
});

const DAILY_IDS = new Set(DAILY_ENTRIES.map((e) => e.id));
const EN_IDS = new Set(entriesOf('m1-1').map((e) => e.id));

describe('켠 갈래만 나온다', () => {
  it('영어만 켜면 영어만 나온다', () => {
    const picked = pickChildToday(args(['en']));
    expect(picked.length).toBeGreaterThan(0);
    expect(picked.every((i) => i.subject === 'en')).toBe(true);
  });

  it('국어만 켜면 국어만 나온다', () => {
    const picked = pickChildToday(args(['ko']));
    expect(picked.length).toBeGreaterThan(0);
    expect(picked.every((i) => i.subject === 'ko')).toBe(true);
  });

  /*
   * 이 갈래가 이번에 새로 생겼다. 여태 아이에게는 없던 것이라, 켜도 아무것도
   * 안 나오는 채로 지나갈 수 있었다.
   */
  it('일상 문장만 켜면 일상 문장만 나온다', () => {
    const picked = pickChildToday(args(['daily']));
    expect(picked.length).toBeGreaterThan(0);
    expect(picked.every((i) => i.subject === 'daily')).toBe(true);
    expect(picked.every((i) => DAILY_IDS.has(i.entryId))).toBe(true);
  });

  it('셋을 다 켜면 셋이 다 나온다', () => {
    const kinds = new Set(pickChildToday(args(['en', 'ko', 'daily'])).map((i) => i.subject));
    expect([...kinds].sort()).toEqual(['daily', 'en', 'ko']);
  });

  /* 영어와 일상 문장이 서로 섞여 들어오지 않는지. 둘 다 영어 문항이라 같은
   * 그릇을 쓴다 — 거르개가 헐거우면 조용히 섞인다. */
  it('영어만 켠 아이에게 일상 문장이 섞이지 않는다', () => {
    const ids = pickChildToday(args(['en'])).map((i) => i.entryId);
    expect(ids.some((id) => DAILY_IDS.has(id))).toBe(false);
    expect(ids.every((id) => EN_IDS.has(id))).toBe(true);
  });
});

describe('세는 쪽과 내는 쪽이 같은 것을 본다', () => {
  /*
   * 홈은 pickChildToday 로 세고 학습 화면은 buildChildQueue 로 낸다. 둘이
   * 어긋나면 "오늘 20개" 라고 해 놓고 5개만 나온다. 실제로 그랬다.
   */
  it.each([['en'], ['ko'], ['daily'], ['en', 'ko'], ['en', 'ko', 'daily']] as Subject[][])(
    '%s — 센 개수와 실제로 나온 낱말 수가 같다',
    (...subjects) => {
      const a = args(subjects as Subject[]);
      const inQueue = new Set(buildChildQueue(a).map((i) => i.entry.id));
      expect(childPlannedCount(a)).toBe(inQueue.size);
    },
  );
});

describe('푸는 순서', () => {
  it('영어 먼저로 두면 국어가 뒤에 온다', () => {
    const q = buildChildQueue(args(['en', 'ko']));
    const firstKo = q.findIndex((i) => i.subject === 'ko');
    const lastEn = q.map((i) => i.subject).lastIndexOf('en');
    expect(firstKo).toBeGreaterThan(lastEn);
  });

  it('국어 먼저로 두면 국어가 앞에 온다', () => {
    const a = args(['en', 'ko']);
    a.profile.settings.firstSubject = 'ko';
    const q = buildChildQueue(a);
    expect(q[0].subject).toBe('ko');
  });

  /* 일상 문장은 영어 낱말 옆에 붙는다. 같은 영어라 머리를 옮길 일이 적다. */
  it('일상 문장은 영어 낱말 바로 뒤에 붙는다', () => {
    const q = buildChildQueue(args(['en', 'ko', 'daily']));
    const firstKo = q.findIndex((i) => i.subject === 'ko');
    const lastDaily = q.map((i) => DAILY_IDS.has(i.entry.id)).lastIndexOf(true);
    expect(lastDaily).toBeGreaterThanOrEqual(0);
    expect(lastDaily).toBeLessThan(firstKo);
  });
});

describe('오답 보기 후보', () => {
  /*
   * 일상 문장을 켠 아이에게는 그 문장들도 후보여야 한다. 아이들 낱말에서만
   * 뽑으면 'on the same page' 자리에 'delicious' 가 서고, 문장을 읽지 않아도
   * 답이 보인다. 부모 쪽에서 이미 겪은 일이다.
   */
  it('일상 문장을 켜면 후보에 들어온다', () => {
    const ids = new Set(childPool(child(['en', 'daily'])).map((e) => e.id));
    expect(DAILY_ENTRIES.every((e) => ids.has(e.id))).toBe(true);
  });

  it('안 켜면 안 들어온다', () => {
    const ids = new Set(childPool(child(['en'])).map((e) => e.id));
    expect(DAILY_ENTRIES.some((e) => ids.has(e.id))).toBe(false);
  });
});

describe('toggleSubject', () => {
  it('꺼진 것을 켠다', () => {
    expect(toggleSubject(['en'], 'ko')).toEqual(['en', 'ko']);
  });

  it('켜진 것을 끈다', () => {
    expect(toggleSubject(['en', 'ko'], 'en')).toEqual(['ko']);
  });

  /* 하나도 안 켜면 낼 문제가 없어져 아이 화면이 빈 채로 뜬다. */
  it('마지막 하나는 못 끈다', () => {
    expect(toggleSubject(['ko'], 'ko')).toBeNull();
    expect(toggleSubject(['daily'], 'daily')).toBeNull();
  });

  it('저장 순서는 늘 같다', () => {
    expect(toggleSubject(['daily'], 'en')).toEqual(['en', 'daily']);
    expect(toggleSubject(['daily', 'ko'], 'en')).toEqual(SUBJECT_ORDER);
  });
});
