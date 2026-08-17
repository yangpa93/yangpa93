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

import {
  buildChildQueue,
  childPlannedCount,
  childPool,
  DAILY_PER_DAY,
  KO_PER_DAY,
  pickChildToday,
} from '../src/srs/childSession';
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

  /*
   * **셋을 각자 줄 세울 수 있다.**
   *
   * 예전에는 일상 문장이 영어에 딸려 붙어서 자기 자리를 못 가졌다. 갈래가
   * 셋이 되면서 "1. 영어 2. 국어 3. 일상생활 문장" 처럼 정할 수 있어야 한다는
   * 말을 들었고, 그러려면 셋이 각자 서야 한다.
   */
  it('정한 차례대로 나온다 — 국어 · 일상 문장 · 영어', () => {
    const a = args(['en', 'ko', 'daily']);
    a.profile.settings.subjectOrder = ['ko', 'daily', 'en'];
    const q = buildChildQueue(a);

    const firstKo = q.findIndex((i) => i.subject === 'ko');
    const firstDaily = q.findIndex((i) => DAILY_IDS.has(i.entry.id));
    const firstEn = q.findIndex((i) => EN_IDS.has(i.entry.id));

    expect(firstKo).toBe(0);
    expect(firstKo).toBeLessThan(firstDaily);
    expect(firstDaily).toBeLessThan(firstEn);
  });

  it('차례를 바꾸면 큐도 따라 바뀐다', () => {
    const a = args(['en', 'daily']);
    a.profile.settings.subjectOrder = ['daily', 'en'];
    const q = buildChildQueue(a);
    expect(DAILY_IDS.has(q[0].entry.id)).toBe(true);
  });

  /*
   * 옛 저장본에는 `subjectOrder` 가 없고 `firstSubject` 만 있다. 아이가
   * 예전에 고른 것이 그대로 지켜져야 한다 — 판을 올렸다고 순서가 저 혼자
   * 바뀌면 아이는 무엇이 어떻게 된 것인지 모른다.
   */
  it('차례를 정한 적이 없으면 예전에 고른 것을 따른다', () => {
    const a = args(['en', 'ko', 'daily']);
    a.profile.settings.subjectOrder = undefined;
    a.profile.settings.firstSubject = 'ko';
    expect(buildChildQueue(a)[0].subject).toBe('ko');
  });

  /*
   * 안 켠 갈래가 차례에 남아 있어도 큐에는 안 들어간다. 껐다 다시 켰을 때
   * 제자리로 돌아가야 해서 순서 자체는 지우지 않는다.
   */
  it('안 켠 갈래는 차례에 남아 있어도 안 나온다', () => {
    const a = args(['en']);
    a.profile.settings.subjectOrder = ['ko', 'daily', 'en'];
    const q = buildChildQueue(a);
    expect(q.length).toBeGreaterThan(0);
    expect(q.every((i) => EN_IDS.has(i.entry.id))).toBe(true);
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

/**
 * 하루치가 **고른 값을 그대로 따르는가.**
 *
 * ── 왜 이 검사가 필요했나 ───────────────────────────────────
 *
 * "하루 공부 설정을 10개 했는데 60개나 나타난다" 는 말을 들었다. 파고 보니
 * 두 가지가 겹쳐 있었다.
 *
 *   ① 일상 문장만 앱이 4개로 못박고 있었다. 영어를 5개로 줄여도 그대로였다.
 *   ② 낱말 하나가 라운드 수만큼 문항으로 갈린다. 낱말 15개가 문항 45개다.
 *
 * ②는 규칙대로지만 ①은 어긋난 것이다. 화면 문구로만 고치면 다음에 또 어긋나므로
 * 여기서 숫자로 못박는다.
 */
describe('하루치가 고른 값을 따른다', () => {
  const all: Subject[] = ['en', 'ko', 'daily'];
  const words = (a: Parameters<typeof pickChildToday>[0], sub: Subject) =>
    new Set(pickChildToday(a).filter((i) => i.subject === sub).map((i) => i.entryId)).size;

  it('영어는 고른 개수만큼 새로 나온다', () => {
    for (const n of [5, 10, 20]) {
      const p = child(all);
      p.settings.newPerDay = n;
      expect(words({ profile: p, cards: NO_CARDS, today: '2026-08-16', rand: () => 0.5 }, 'en')).toBe(n);
    }
  });

  it('국어도 고른 개수만큼 나온다', () => {
    for (const n of [3, 6, 10]) {
      const p = child(all);
      p.settings.koNewPerDay = n;
      expect(words({ profile: p, cards: NO_CARDS, today: '2026-08-16', rand: () => 0.5 }, 'ko')).toBe(n);
    }
  });

  it('일상 문장도 고른 개수만큼 나온다', () => {
    /* 이것만 4개로 못박혀 있었다. 고른 값이 무시되던 자리다. */
    for (const n of [2, 6, 10]) {
      const p = child(all);
      p.settings.dailyNewPerDay = n;
      expect(words({ profile: p, cards: NO_CARDS, today: '2026-08-16', rand: () => 0.5 }, 'daily')).toBe(n);
    }
  });

  it('안 고른 아이는 예전 값 그대로다', () => {
    const p = child(all);
    const a = { profile: p, cards: NO_CARDS, today: '2026-08-16', rand: () => 0.5 };
    expect(words(a, 'daily')).toBe(DAILY_PER_DAY);
    expect(words(a, 'ko')).toBe(KO_PER_DAY);
  });

  it('낱말 하나가 라운드 수만큼 문항으로 갈린다', () => {
    /*
     * "10개 했는데 60개" 의 나머지 절반이 이것이다. 낱말 수와 문항 수는
     * 다른 값이고, 화면에서 그 둘을 갈라 적어야 한다.
     */
    const p = child(['en']);
    p.settings.newPerDay = 10;
    p.settings.rounds = 3;
    const a = { profile: p, cards: NO_CARDS, today: '2026-08-16', rand: () => 0.5 };
    expect(words(a, 'en')).toBe(10);
    expect(buildChildQueue(a).length).toBeGreaterThan(10);
  });
});

/**
 * **복습은 한 판에서 한 번만 나온다.**
 *
 * 예전에는 새 낱말과 복습을 가리지 않고 셋 다 라운드 수만큼 돌렸다. 새 8개 +
 * 복습 10개면 24 + 30 = 54문제가 되어 복습이 절반을 넘었다. "너무 많아지는데요"
 * 라는 말을 들었다.
 *
 * 복습은 이미 자리를 잡은 낱말이라 한 번 꺼내 보면 그날 몫이 끝난다. 같은 날
 * 세 번 몰아 보면 간격 반복인데 간격이 없는 셈이 된다. 못 외운 것은 틀렸을 때
 * 다시 나오는 장치가 따로 받는다.
 */
describe('복습은 한 번, 새 낱말은 세 번', () => {
  /** 복습거리를 만든다 — 기한이 지난 카드. */
  function due(ids: string[]): Record<string, CardState> {
    const cards: Record<string, CardState> = {};
    for (const id of ids) {
      cards[id] = { entryId: id, ease: 2.5, intervalDays: 1, streak: 1, correct: 1, wrong: 0,
        lapses: 0, due: '2020-01-01', lastSeen: 1577836800000, firstSeen: 1577836800000 };
    }
    return cards;
  }

  const cards = due(entriesOf('m1-1').slice(0, 10).map((e) => e.id));
  const args = { profile: child(['en']), cards, today: '2026-08-16', rand: () => 0.5 };

  it('복습 낱말은 라운드마다 되풀이되지 않는다', () => {
    const q = buildChildQueue(args);
    for (const id of new Set(q.filter((i) => i.mode === 'review').map((i) => i.entry.id))) {
      const rounds = new Set(q.filter((i) => i.mode === 'review' && i.entry.id === id).map((i) => i.round));
      // 뜻이 여럿이면 한 라운드 안에서 문항이 여럿일 수는 있다. 라운드가 여럿이면 안 된다.
      expect([...rounds]).toEqual([0]);
    }
  });

  it('새 낱말은 라운드를 다 거친다', () => {
    const q = buildChildQueue(args);
    const fresh = q.filter((i) => i.mode === 'new');
    expect(new Set(fresh.map((i) => i.round)).size).toBe(child(['en']).settings.rounds);
  });

  it('그래서 한 판이 눈에 띄게 짧아진다', () => {
    /*
     * 복습을 세 번 돌리던 때와 견준다. 같은 낱말 수인데 문항이 줄어야 한다 —
     * 줄어드는 것은 이미 아는 낱말을 세 번 묻던 몫뿐이다.
     */
    const q = buildChildQueue(args);
    const reviewQ = q.filter((i) => i.mode === 'review').length;
    const reviewWords = new Set(
      pickChildToday(args).filter((i) => i.mode === 'review').map((i) => i.entryId),
    ).size;
    expect(reviewWords).toBeGreaterThan(0);
    // 낱말 하나에 문항 하나가 원칙(다의어는 조금 더). 세 배가 되면 안 된다.
    expect(reviewQ).toBeLessThan(reviewWords * 2);
  });
});
