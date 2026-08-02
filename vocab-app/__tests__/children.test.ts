/**
 * 아이 수 제한.
 *
 * 여기서 틀리면 두 가지가 조용히 망가진다 — 남의 아이가 들어와도 모르거나,
 * 반대로 우리 아이가 폰을 바꾼 뒤로 리포트를 못 보내게 된다. 둘 다 화면에는
 * 아무 오류도 안 뜬다.
 */

import {
  MAX_CHILDREN,
  canAcceptChild,
  childCount,
  childLimitMessage,
  childNames,
  hasRoomForChild,
} from '../src/features/children';

const child = (name: string) => ({ kind: 'child' as const, name });
const parent = (name: string) => ({ kind: 'parent' as const, name });
const known = (name: string) => ({ name });

describe('childNames', () => {
  it('아이 프로필만 센다 — 부모는 아이가 아니다', () => {
    expect(childNames([parent('엄마'), child('서준')], [])).toEqual(['서준']);
  });

  it('QR 로 이어진 아이도 같이 센다', () => {
    expect(childNames([child('서준')], [known('지호')])).toEqual(['서준', '지호']);
  });

  it('양쪽에 다 있는 아이는 한 번만 센다', () => {
    /*
     * 부모 폰에서 프로필을 만들어 주고 아이 폰과 연결까지 하면 같은 아이가
     * 양쪽에 남는다. 따로 세면 아이 둘인 집이 넷으로 잡혀 더 못 넣게 된다.
     */
    expect(childNames([child('서준'), child('지호')], [known('서준'), known('지호')])).toEqual([
      '서준',
      '지호',
    ]);
  });

  it('앞뒤 공백은 같은 이름으로 본다', () => {
    // 공백 하나 때문에 같은 아이가 둘이 되면 자리만 잡아먹는다.
    expect(childNames([child('서준')], [known(' 서준 ')])).toEqual(['서준']);
  });

  it('빈 이름은 안 센다', () => {
    expect(childNames([child('')], [known('   ')])).toEqual([]);
  });

  it('넣은 순서를 지킨다', () => {
    // 화면에 그대로 늘어놓기 때문에 순서가 흔들리면 안 된다.
    expect(childNames([child('다'), child('가')], [known('나')])).toEqual(['다', '가', '나']);
  });

  it('목록이 비어도 죽지 않는다', () => {
    expect(childNames([], [])).toEqual([]);
  });
});

describe('childCount / hasRoomForChild', () => {
  it('네 명까지 자리가 있다', () => {
    const four = [child('가'), child('나'), child('다'), child('라')];
    expect(childCount(four, [])).toBe(4);
    expect(hasRoomForChild(four.slice(0, 3), [])).toBe(true);
    expect(hasRoomForChild(four, [])).toBe(false);
  });

  it('제한은 4명이다', () => {
    expect(MAX_CHILDREN).toBe(4);
  });
});

describe('canAcceptChild', () => {
  const four = [child('가'), child('나'), child('다'), child('라')];

  it('자리가 있으면 새 아이를 받는다', () => {
    expect(canAcceptChild(four.slice(0, 3), [], '라')).toBe(true);
  });

  it('꽉 차면 새 아이는 못 받는다', () => {
    expect(canAcceptChild(four, [], '마')).toBe(false);
  });

  it('꽉 찼어도 **이미 아는 아이**는 받는다', () => {
    /*
     * 이건 새 아이가 아니라 같은 아이의 주소 갱신이다. 앱을 다시 깔면 주소가
     * 바뀌는데 여기서 막으면 넷째 아이는 폰을 바꾼 뒤로 영영 리포트를
     * 못 보낸다.
     */
    expect(canAcceptChild(four, [], '라')).toBe(true);
    expect(canAcceptChild(four, [], ' 라 ')).toBe(true);
  });

  it('빈 이름은 안 받는다', () => {
    expect(canAcceptChild([], [], '')).toBe(false);
    expect(canAcceptChild([], [], '   ')).toBe(false);
  });

  it('부모 프로필은 자리를 차지하지 않는다', () => {
    // 부모가 둘인 집에서 아이를 둘밖에 못 넣으면 곤란하다.
    const withParents = [parent('엄마'), parent('아빠'), child('가'), child('나')];
    expect(canAcceptChild(withParents, [], '다')).toBe(true);
    expect(childCount(withParents, [])).toBe(2);
  });
});

describe('childLimitMessage', () => {
  it('숫자를 문장에 그대로 담는다', () => {
    // 제한을 올렸는데 안내 문구가 '4명'으로 남아 있으면 거짓말이 된다.
    expect(childLimitMessage()).toContain(`${MAX_CHILDREN}명`);
  });
});
