import {
  addMonths,
  buildMonth,
  daysInMonth,
  earliestMonth,
  firstWeekday,
  formatMonth,
  monthOf,
  studyLevel,
} from '../src/features/calendar';
import { DailyRecord } from '../src/types';

const TODAY = '2026-07-27';

function day(date: string, over: Partial<DailyRecord> = {}): DailyRecord {
  return {
    date,
    goal: 15,
    studied: 15,
    correct: 12,
    wrong: 3,
    seconds: 600,
    completed: true,
    wrongEntryIds: [],
    ...over,
  };
}

function days(...records: DailyRecord[]): Record<string, DailyRecord> {
  return Object.fromEntries(records.map((r) => [r.date, r]));
}

describe('monthOf / addMonths / formatMonth', () => {
  it('날짜에서 달을 뽑는다', () => {
    expect(monthOf('2026-07-27')).toBe('2026-07');
  });

  it('연말을 넘어가도 맞게 계산한다', () => {
    expect(addMonths('2026-12', 1)).toBe('2027-01');
    expect(addMonths('2026-01', -1)).toBe('2025-12');
    expect(addMonths('2026-07', 0)).toBe('2026-07');
  });

  it('한글로 표시한다', () => {
    expect(formatMonth('2026-07')).toBe('2026년 7월');
  });
});

describe('daysInMonth / firstWeekday', () => {
  it('달마다 날짜 수가 다르다', () => {
    expect(daysInMonth('2026-07')).toBe(31);
    expect(daysInMonth('2026-06')).toBe(30);
    expect(daysInMonth('2026-02')).toBe(28);
    // 윤년
    expect(daysInMonth('2028-02')).toBe(29);
  });

  it('1일의 요일을 돌려준다', () => {
    // 2026-07-01 은 수요일
    expect(firstWeekday('2026-07')).toBe(3);
  });
});

describe('studyLevel', () => {
  it('안 한 날은 0, 목표를 채우면 3', () => {
    expect(studyLevel(0, 15, false)).toBe(0);
    expect(studyLevel(15, 15, true)).toBe(3);
  });

  it('목표에 못 미치면 절반을 기준으로 나뉜다', () => {
    expect(studyLevel(3, 15, false)).toBe(1);
    expect(studyLevel(8, 15, false)).toBe(2);
  });

  it('목표가 0이어도 터지지 않는다', () => {
    expect(studyLevel(5, 0, false)).toBe(2);
  });
});

describe('earliestMonth', () => {
  it('기록이 없으면 null', () => {
    expect(earliestMonth({})).toBeNull();
  });

  it('가장 이른 기록의 달을 준다', () => {
    expect(earliestMonth(days(day('2026-07-01'), day('2026-05-30'), day('2026-06-02')))).toBe(
      '2026-05',
    );
  });
});

describe('buildMonth', () => {
  it('한 달을 주 단위 격자로 만든다', () => {
    const m = buildMonth({}, '2026-07', TODAY);

    // 1일이 수요일이라 앞에 빈칸 3개
    expect(m.weeks[0].slice(0, 3)).toEqual([null, null, null]);
    expect(m.weeks[0][3]?.day).toBe(1);

    // 모든 주가 7칸
    for (const w of m.weeks) expect(w).toHaveLength(7);

    // 31일이 마지막 날짜 칸
    const flat = m.weeks.flat().filter(Boolean);
    expect(flat).toHaveLength(31);
    expect(flat[30]?.date).toBe('2026-07-31');
  });

  it('기록이 없는 달은 0으로 채워진다', () => {
    const m = buildMonth({}, '2026-07', TODAY);
    expect(m.studiedDays).toBe(0);
    expect(m.totalWords).toBe(0);
    expect(m.completedDays).toBe(0);
    expect(m.averageAccuracy).toBe(0);
    expect(m.best).toBeNull();
    expect(m.longestStreak).toBe(0);
  });

  it('하루에 몇 개를 했는지 칸마다 담는다', () => {
    const m = buildMonth(
      days(day('2026-07-25', { studied: 20, correct: 18, wrong: 2, seconds: 660 })),
      '2026-07',
      TODAY,
    );
    const cell = m.weeks.flat().find((c) => c?.date === '2026-07-25')!;

    expect(cell.studied).toBe(20);
    expect(cell.minutes).toBe(11);
    expect(cell.accuracy).toBeCloseTo(18 / 20);
    expect(cell.level).toBe(3);
  });

  it('오늘과 미래를 구분한다', () => {
    const m = buildMonth({}, '2026-07', TODAY);
    const flat = m.weeks.flat().filter(Boolean);

    expect(flat.find((c) => c!.date === TODAY)!.isToday).toBe(true);
    expect(flat.find((c) => c!.date === '2026-07-26')!.isFuture).toBe(false);
    expect(flat.find((c) => c!.date === '2026-07-28')!.isFuture).toBe(true);
    // 27일까지가 지나간 날
    expect(m.elapsedDays).toBe(27);
  });

  it('이 달 합계와 최고 기록을 낸다', () => {
    const m = buildMonth(
      days(
        day('2026-07-20', { studied: 10, correct: 8, wrong: 2, completed: false, seconds: 300 }),
        day('2026-07-21', { studied: 25, correct: 25, wrong: 0, seconds: 900 }),
        day('2026-07-24', { studied: 15, correct: 12, wrong: 3, seconds: 600 }),
      ),
      '2026-07',
      TODAY,
    );

    expect(m.studiedDays).toBe(3);
    expect(m.completedDays).toBe(2);
    expect(m.totalWords).toBe(50);
    expect(m.totalMinutes).toBe(5 + 15 + 10);
    expect(m.best?.date).toBe('2026-07-21');
    // 공부한 날들만 평균에 넣는다
    expect(m.averageAccuracy).toBeCloseTo((0.8 + 1 + 0.8) / 3);
  });

  it('이어서 공부한 최장 일수를 센다', () => {
    const m = buildMonth(
      days(
        day('2026-07-06'),
        day('2026-07-07'),
        day('2026-07-08'),
        // 하루 쉬고
        day('2026-07-10'),
      ),
      '2026-07',
      TODAY,
    );
    expect(m.longestStreak).toBe(3);
  });

  it('다른 달의 기록은 섞이지 않는다', () => {
    const m = buildMonth(days(day('2026-06-30'), day('2026-08-01')), '2026-07', TODAY);
    expect(m.totalWords).toBe(0);
  });

  it('지난달을 보면 모든 날이 과거다', () => {
    const m = buildMonth({}, '2026-06', TODAY);
    expect(m.elapsedDays).toBe(30);
    expect(m.weeks.flat().filter(Boolean).every((c) => !c!.isFuture)).toBe(true);
  });
});
