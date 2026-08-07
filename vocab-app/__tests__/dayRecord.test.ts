/**
 * 하루 기록 — 다 했는지 세는 규칙.
 *
 * 여기서 틀리면 **중간에 그만뒀는데도 다 한 것으로 적힌다.** 그러면 연속
 * 일수도 개근 보상도 실제로 안 한 날 위에 쌓인다. 실기기에서 한 판을 다
 * 풀어 봐야 드러나는 자리라 규칙을 여기서 못박는다.
 */

import {
  addAnswer,
  closeSession,
  emptyDay,
  isDayComplete,
  studiedToday,
  withDefaults,
} from '../src/features/dayRecord';
import type { DailyRecord, Subject } from '../src/types';

const day = (patch: Partial<DailyRecord> = {}): DailyRecord => ({
  ...emptyDay('2026-08-02', 10),
  ...patch,
});

describe('isDayComplete', () => {
  it('켠 갈래를 다 끝냈으면 다 한 것', () => {
    expect(
      isDayComplete({ wasCompleted: false, doneSubjects: ['en', 'ko'], required: ['en', 'ko'] }),
    ).toBe(true);
  });

  it('영어만 끝내고 국어가 남았으면 아직 아니다', () => {
    /*
     * 이게 이번에 고친 것이다. 갈래마다 따로 들어가 풀게 되면서, 영어만
     * 끝내고 하루를 마치는 일이 생겼다. 한 갈래를 끝냈다고 도장을 찍어 주면
     * 국어는 영영 안 하게 된다.
     */
    expect(isDayComplete({ wasCompleted: false, doneSubjects: ['en'], required: ['en', 'ko'] })).toBe(
      false,
    );
  });

  it('안 켠 갈래는 안 따진다', () => {
    // 영어만 켠 아이는 영어만 끝내면 하루가 끝난다.
    expect(isDayComplete({ wasCompleted: false, doneSubjects: ['en'], required: ['en'] })).toBe(true);
  });

  it('이미 다 한 날은 그대로 둔다', () => {
    // 다 하고 한 번 더 하다 그만둔 것이 취소되면 안 된다.
    expect(isDayComplete({ wasCompleted: true, doneSubjects: [], required: ['en', 'ko'] })).toBe(true);
  });

  it('오늘 할 것이 없었으면 다 했다고 하지 않는다', () => {
    expect(isDayComplete({ wasCompleted: false, doneSubjects: [], required: [] })).toBe(false);
  });
});

describe('closeSession', () => {
  const both: Subject[] = ['en', 'ko'];

  it('그만두면 푼 것은 남기고 완료는 안 찍는다', () => {
    const got = closeSession(day({ goal: 10 }), {
      studied: 10,
      seconds: 60,
      reachedEnd: false,
      subject: 'en',
      required: both,
    });
    expect(got.studied).toBe(10);
    expect(got.seconds).toBe(60);
    expect(got.completed).toBe(false);
    expect(got.doneSubjects).toEqual([]);
  });

  it('영어를 끝내도 국어가 남았으면 완료가 아니다', () => {
    const first = closeSession(day({ goal: 10 }), {
      studied: 6,
      seconds: 40,
      reachedEnd: true,
      subject: 'en',
      required: both,
    });
    expect(first.doneSubjects).toEqual(['en']);
    expect(first.completed).toBe(false);

    const second = closeSession(first, {
      studied: 4,
      seconds: 30,
      reachedEnd: true,
      subject: 'ko',
      required: both,
    });
    expect(second.studied).toBe(10);
    expect(second.seconds).toBe(70);
    expect(second.doneSubjects).toEqual(['en', 'ko']);
    expect(second.completed).toBe(true);
  });

  it('같은 갈래를 두 번 끝내도 한 번만 센다', () => {
    const first = closeSession(day({ goal: 10 }), {
      studied: 6,
      seconds: 40,
      reachedEnd: true,
      subject: 'en',
      required: both,
    });
    const again = closeSession(first, {
      studied: 2,
      seconds: 10,
      reachedEnd: true,
      subject: 'en',
      required: both,
    });
    expect(again.doneSubjects).toEqual(['en']);
    expect(again.completed).toBe(false);
  });
});

describe('addAnswer', () => {
  it('맞힌 것도 만난 낱말로 남긴다', () => {
    // 예전에는 개수만 남기고 무엇이었는지는 버렸다. 그래서 '오늘 배운 것' 을
    // 되짚을 수가 없었다.
    const got = addAnswer(day(), 'w1', true);
    expect(got.studiedEntryIds).toEqual(['w1']);
    expect(got.correct).toBe(1);
    expect(got.wrongEntryIds).toEqual([]);
  });

  it('같은 낱말을 여러 번 만나도 한 번만 센다', () => {
    let d = day();
    for (let i = 0; i < 3; i++) d = addAnswer(d, 'w1', true);
    expect(d.studiedEntryIds).toEqual(['w1']);
    expect(d.correct).toBe(3);
  });

  it('틀린 것은 틀린 횟수만큼 쌓는다', () => {
    // 몇 번 틀렸는지가 뜻을 갖는다.
    let d = addAnswer(day(), 'w1', false);
    d = addAnswer(d, 'w1', false);
    expect(d.wrongEntryIds).toEqual(['w1', 'w1']);
    expect(d.studiedEntryIds).toEqual(['w1']);
    expect(d.wrong).toBe(2);
  });

  it('만난 순서를 지킨다', () => {
    let d = addAnswer(day(), 'b', true);
    d = addAnswer(d, 'a', true);
    d = addAnswer(d, 'b', true);
    expect(d.studiedEntryIds).toEqual(['b', 'a']);
  });
});

describe('옛 기록', () => {
  it('칸이 없어도 죽지 않는다', () => {
    // 이 칸이 생기기 전에 저장된 날, 그리고 되돌리기로 들어오는 남의 백업.
    const old = { ...day(), studiedEntryIds: undefined } as DailyRecord;
    expect(withDefaults(old).studiedEntryIds).toEqual([]);
    expect(studiedToday(old)).toEqual([]);
    expect(addAnswer(old, 'w1', true).studiedEntryIds).toEqual(['w1']);
  });
});

describe('studiedToday', () => {
  it('만난 낱말마다 오늘 몇 번 틀렸는지 붙인다', () => {
    let d = addAnswer(day(), 'a', true);
    d = addAnswer(d, 'b', false);
    d = addAnswer(d, 'b', false);
    expect(studiedToday(d)).toEqual([
      { id: 'a', wrong: 0 },
      { id: 'b', wrong: 2 },
    ]);
  });

  it('아직 안 한 날은 빈 목록', () => {
    expect(studiedToday(undefined)).toEqual([]);
  });
});
