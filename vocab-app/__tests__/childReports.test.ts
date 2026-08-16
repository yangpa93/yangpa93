/**
 * 다른 폰의 아이가 보내 온 리포트를 달력이 읽을 모양으로 세우기.
 *
 * 이 앱에서 가장 크게 어긋났던 자리다. 아이가 제 폰을 쓰면 부모 폰에는 하루
 * 한 줄짜리 글만 있었는데, 그것을 모른 채 「부모 폰에서 달력을 볼 수 있다」 고
 * 말했다. 실제 회원님 화면에는 그 버튼조차 없었다.
 */

import { daysFromReports, hasReports, isDetailed } from '../src/features/childReports';
import type { ReceivedReport } from '../src/types';

function report(over: Partial<ReceivedReport> = {}): ReceivedReport {
  return {
    id: 'rr1',
    childName: '수빈',
    date: '2026-08-15',
    headline: '오늘 목표 완료! 8개 · 정답률 86%',
    detail: '',
    completed: true,
    receivedAt: 1000,
    studied: 8,
    goal: 15,
    bySubject: {
      en: { studied: 5, correct: 13, wrong: 2 },
      ko: { studied: 3, correct: 6, wrong: 1 },
    },
    wrongIds: ['abandon', 'ko-구사일생', 'ko-구사일생'],
    ...over,
  };
}

describe('daysFromReports', () => {
  it('보내 온 것을 날짜별 기록으로 세운다', () => {
    const days = daysFromReports([report()], '수빈');
    expect(Object.keys(days)).toEqual(['2026-08-15']);
    expect(days['2026-08-15'].studied).toBe(8);
    expect(days['2026-08-15'].goal).toBe(15);
    expect(days['2026-08-15'].completed).toBe(true);
  });

  it('맞은 수와 틀린 수는 갈래별 합으로 낸다', () => {
    /*
     * 합계는 따로 안 보낸다. 갈래별로 보내면 합은 언제든 다시 셀 수 있으니
     * 두 번 실어 보낼 이유가 없다 — 알림 한 통에 담을 양에는 한계가 있다.
     */
    const days = daysFromReports([report()], '수빈');
    expect(days['2026-08-15'].correct).toBe(19);
    expect(days['2026-08-15'].wrong).toBe(3);
  });

  it('틀린 낱말 id 를 그대로 옮긴다', () => {
    // 이름과 뜻은 안 온다. 부모 폰의 어휘에서 id 로 찾는다.
    const days = daysFromReports([report()], '수빈');
    expect(days['2026-08-15'].wrongEntryIds).toEqual(['abandon', 'ko-구사일생', 'ko-구사일생']);
  });

  it('다른 아이 것은 안 섞는다', () => {
    const days = daysFromReports([report(), report({ childName: '시윤', date: '2026-08-14' })], '수빈');
    expect(Object.keys(days)).toEqual(['2026-08-15']);
  });

  it('같은 날짜가 여럿이면 나중에 받은 것을 쓴다', () => {
    /*
     * 아이가 하루에 영어와 국어를 따로 끝내면 리포트가 두 번 온다. 뒤엣것이
     * 그날 전체를 담고 있으므로 그것을 쓴다.
     */
    const days = daysFromReports(
      [
        report({ id: 'a', receivedAt: 100, studied: 5 }),
        report({ id: 'b', receivedAt: 200, studied: 8 }),
      ],
      '수빈',
    );
    expect(days['2026-08-15'].studied).toBe(8);
  });

  it('갈래별 성적이 안 온 날도 죽지 않는다', () => {
    /*
     * 아이 폰이 아직 옛 판이면 안 온다. 그런 날은 합계가 0 이 되고 화면이
     * 「나눠 적기 전」 으로 뜬다 — 어림잡아 채우지 않는다.
     */
    const days = daysFromReports([report({ bySubject: undefined, wrongIds: undefined })], '수빈');
    expect(days['2026-08-15'].correct).toBe(0);
    expect(days['2026-08-15'].wrongEntryIds).toEqual([]);
    expect(isDetailed(days['2026-08-15'])).toBe(false);
  });

  it('갈래별 성적이 온 날은 자세히 볼 수 있다고 본다', () => {
    const days = daysFromReports([report()], '수빈');
    expect(isDetailed(days['2026-08-15'])).toBe(true);
  });

  it('받은 것이 없으면 빈 목록', () => {
    expect(daysFromReports([], '수빈')).toEqual({});
    expect(hasReports([], '수빈')).toBe(false);
  });

  it('그 아이 것이 하나라도 있는지 가린다', () => {
    // 하나도 없으면 달력을 열어 봐야 빈 화면이라 단추를 꺼 둔다.
    expect(hasReports([report()], '수빈')).toBe(true);
    expect(hasReports([report()], '서준')).toBe(false);
  });
});
