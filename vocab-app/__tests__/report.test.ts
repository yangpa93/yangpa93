import { buildDailyReport, buildWeeklySummary, reportHeadline, reportText } from '../src/features/report';
import { levelProgress, nextLevel, troubleWords } from '../src/srs/progress';
import { createCard, grade } from '../src/srs/scheduler';
import { entriesOf, ALL_ENTRIES } from '../src/data';
import { CardState, Profile, ProfileData } from '../src/types';

const TODAY = '2026-07-27';

function makeProfile(over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '서준',
    avatar: '🦊',
    level: 'm1-1',
    settings: {
      dailyGoal: 15,
      rounds: 3,
      reviewRatio: 70,
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 0,
    streak: 3,
    bestStreak: 5,
    lastCompletedDate: '2026-07-26',
    pendingLevelUps: [],
    clearedLevels: [],
    ...over,
  };
}

function makeData(over: Partial<ProfileData> = {}): ProfileData {
  return { cards: {}, days: {}, answers: [], exams: [], ...over };
}

describe('buildDailyReport', () => {
  it('학습을 안 한 날은 0으로 채워진다', () => {
    const r = buildDailyReport(makeProfile(), makeData(), ALL_ENTRIES, TODAY);

    expect(r.studied).toBe(0);
    expect(r.completed).toBe(false);
    expect(r.accuracy).toBe(0);
    expect(r.todayMistakes).toEqual([]);
  });

  it('오늘 틀린 단어를 많이 틀린 순으로 보여준다', () => {
    const pool = entriesOf('m1-1');
    const data = makeData({
      days: {
        [TODAY]: {
          date: TODAY,
          goal: 15,
          studied: 15,
          correct: 10,
          wrong: 5,
          seconds: 600,
          completed: true,
          // 첫 단어를 3번, 두 번째를 2번 틀렸다.
          wrongEntryIds: [pool[0].id, pool[0].id, pool[0].id, pool[1].id, pool[1].id],
        },
      },
    });

    const r = buildDailyReport(makeProfile(), data, ALL_ENTRIES, TODAY);

    expect(r.todayMistakes[0].word).toBe(pool[0].word);
    expect(r.todayMistakes[0].count).toBe(3);
    expect(r.todayMistakes[1].count).toBe(2);
    expect(r.accuracy).toBeCloseTo(10 / 15);
  });

  it('누적으로 자주 틀린 단어도 함께 담는다', () => {
    const pool = entriesOf('m1-1');
    const cards: Record<string, CardState> = {};
    let bad = createCard(pool[3].id);
    for (let i = 0; i < 5; i++) bad = grade(bad, false, TODAY);
    cards[pool[3].id] = bad;

    const r = buildDailyReport(makeProfile(), makeData({ cards }), ALL_ENTRIES, TODAY);

    expect(r.chronicMistakes[0].word).toBe(pool[3].word);
    expect(r.chronicMistakes[0].wrong).toBe(5);
  });
});

describe('reportHeadline', () => {
  it('미학습 / 목표 미달 / 달성이 각각 다르게 나온다', () => {
    const base = buildDailyReport(makeProfile(), makeData(), ALL_ENTRIES, TODAY);
    expect(reportHeadline(base)).toContain('아직');

    const partial = { ...base, studied: 5, completed: false, accuracy: 0.6 };
    expect(reportHeadline(partial)).toContain('목표 미달');

    const done = { ...base, studied: 15, completed: true, accuracy: 0.9, streak: 4 };
    expect(reportHeadline(done)).toContain('목표 완료');
  });
});

describe('reportText', () => {
  it('공유용 텍스트에 핵심 항목이 모두 들어간다', () => {
    const pool = entriesOf('m1-1');
    const data = makeData({
      days: {
        [TODAY]: {
          date: TODAY,
          goal: 15,
          studied: 15,
          correct: 12,
          wrong: 3,
          seconds: 540,
          completed: true,
          wrongEntryIds: [pool[0].id],
        },
      },
    });

    const r = buildDailyReport(makeProfile(), data, ALL_ENTRIES, TODAY);
    const text = reportText(r, buildWeeklySummary(data, TODAY));

    expect(text).toContain('서준');
    expect(text).toContain('목표 달성');
    expect(text).toContain('오늘 틀린 단어');
    expect(text).toContain(pool[0].word);
    expect(text).toContain('최근 7일');
  });
});

describe('buildWeeklySummary', () => {
  it('7일치를 과거에서 현재 순으로 돌려준다', () => {
    const w = buildWeeklySummary(makeData(), TODAY);
    expect(w.days).toHaveLength(7);
    expect(w.days[6].date).toBe(TODAY);
    expect(w.completedCount).toBe(0);
  });

  it('학습한 날만 평균 정답률에 넣는다', () => {
    const data = makeData({
      days: {
        [TODAY]: {
          date: TODAY,
          goal: 15,
          studied: 15,
          correct: 15,
          wrong: 0,
          seconds: 300,
          completed: true,
          wrongEntryIds: [],
        },
      },
    });

    const w = buildWeeklySummary(data, TODAY);
    expect(w.averageAccuracy).toBe(1);
    expect(w.completedCount).toBe(1);
  });
});

describe('levelProgress / nextLevel', () => {
  it('아무것도 안 했으면 진도가 0이다', () => {
    const p = levelProgress(ALL_ENTRIES, {}, 'm1-1');
    expect(p.mastered).toBe(0);
    expect(p.ratio).toBe(0);
    expect(p.canTakeExam).toBe(false);
  });

  it('90% 이상 외우면 레벨 시험을 볼 수 있다', () => {
    const pool = entriesOf('m1-1');
    const cards: Record<string, CardState> = {};
    const need = Math.ceil(pool.length * 0.9);

    for (const e of pool.slice(0, need)) {
      let c = createCard(e.id);
      // 간격이 21일을 넘을 때까지 계속 맞힌다.
      while (c.intervalDays < 21) c = grade(c, true, TODAY);
      cards[e.id] = c;
    }

    const p = levelProgress(ALL_ENTRIES, cards, 'm1-1');
    expect(p.canTakeExam).toBe(true);
    expect(p.remaining).toBe(0);
  });

  it('한 학년 안에서 레벨 1 → 2 → 3 으로 올라간다', () => {
    expect(nextLevel('m1-1')).toBe('m1-2');
    expect(nextLevel('m1-2')).toBe('m1-3');
  });

  it('학년의 마지막 레벨을 끝내면 다음 학년으로 넘어간다', () => {
    expect(nextLevel('m1-3')).toBe('m2-1');
    expect(nextLevel('m3-3')).toBe('h1-1');
  });

  it('고3 마지막 레벨이 끝이다', () => {
    expect(nextLevel('h3-3')).toBeNull();
  });
});

describe('troubleWords', () => {
  it('맞기만 한 단어는 오답 노트에 넣지 않는다', () => {
    const pool = entriesOf('m1-1');
    const cards: Record<string, CardState> = {
      [pool[0].id]: grade(createCard(pool[0].id), true, TODAY),
    };
    expect(troubleWords(ALL_ENTRIES, cards)).toEqual([]);
  });

  it('틀린 횟수가 같으면 정답률이 낮은 쪽이 앞에 온다', () => {
    const pool = entriesOf('m1-1');
    // a: 2번 틀리고 0번 맞음 / b: 2번 틀리고 5번 맞음
    let a = createCard(pool[0].id);
    a = grade(a, false, TODAY);
    a = grade(a, false, TODAY);

    let b = createCard(pool[1].id);
    for (let i = 0; i < 5; i++) b = grade(b, true, TODAY);
    b = grade(b, false, TODAY);
    b = grade(b, false, TODAY);

    const list = troubleWords(ALL_ENTRIES, { [a.entryId]: a, [b.entryId]: b });
    expect(list[0].entry.id).toBe(pool[0].id);
  });
});
