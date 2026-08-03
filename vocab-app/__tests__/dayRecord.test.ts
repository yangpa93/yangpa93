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
import type { DailyRecord } from '../src/types';

const day = (patch: Partial<DailyRecord> = {}): DailyRecord => ({
  ...emptyDay('2026-08-02', 10),
  ...patch,
});

describe('isDayComplete', () => {
  it('끝까지 갔고 목표를 채웠으면 다 한 것', () => {
    expect(isDayComplete({ wasCompleted: false, studiedTotal: 10, goal: 10, reachedEnd: true })).toBe(true);
  });

  it('중간에 그만두면 개수가 차도 아니다', () => {
    /*
     * 이게 이번에 고친 것이다. 한 낱말이 하루에 세 바퀴 나오므로 첫 바퀴만
     * 돌아도 '만난 낱말의 가짓수' 는 이미 목표와 같아진다. 개수만 보면
     * 세 바퀴를 돌게 해 놓고 한 바퀴에 도장을 찍어 주게 된다.
     */
    expect(isDayComplete({ wasCompleted: false, studiedTotal: 10, goal: 10, reachedEnd: false })).toBe(false);
    expect(isDayComplete({ wasCompleted: false, studiedTotal: 99, goal: 10, reachedEnd: false })).toBe(false);
  });

  it('끝까지 갔어도 목표에 모자라면 아니다', () => {
    expect(isDayComplete({ wasCompleted: false, studiedTotal: 4, goal: 10, reachedEnd: true })).toBe(false);
  });

  it('이미 다 한 날은 그대로 둔다', () => {
    // 다 하고 한 번 더 하다 그만둔 것이 취소되면 안 된다.
    expect(isDayComplete({ wasCompleted: true, studiedTotal: 0, goal: 10, reachedEnd: false })).toBe(true);
  });

  it('오늘 할 것이 없었으면 다 했다고 하지 않는다', () => {
    expect(isDayComplete({ wasCompleted: false, studiedTotal: 0, goal: 0, reachedEnd: true })).toBe(false);
  });
});

describe('closeSession', () => {
  it('그만두면 푼 것은 남기고 완료는 안 찍는다', () => {
    const got = closeSession(day({ goal: 10 }), { studied: 10, seconds: 60, reachedEnd: false });
    expect(got.studied).toBe(10);
    expect(got.seconds).toBe(60);
    expect(got.completed).toBe(false);
  });

  it('두 판에 나눠 해도 마지막에 끝까지 가면 완료', () => {
    const first = closeSession(day({ goal: 10 }), { studied: 6, seconds: 40, reachedEnd: false });
    expect(first.completed).toBe(false);
    const second = closeSession(first, { studied: 4, seconds: 30, reachedEnd: true });
    expect(second.studied).toBe(10);
    expect(second.seconds).toBe(70);
    expect(second.completed).toBe(true);
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
