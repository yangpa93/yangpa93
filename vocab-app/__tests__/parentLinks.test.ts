/**
 * 아이 폰이 기억하는 부모 폰들.
 *
 * 여기서 틀리면 **끊긴 줄도 모르는 연결**이 생긴다. 예전 판이 그랬다 —
 * 아빠가 아이 QR 을 찍는 순간 엄마 폰이 조용히 밀려났고, 엄마 폰에는 아이가
 * 그대로 보이는데 리포트만 안 왔다. 오류도 안 나서 "요즘 공부를 안 하나 보다"로
 * 읽혔다. 그런 일이 다시 생기지 않게 규칙을 여기서 못박는다.
 */

import {
  MAX_PARENTS,
  addParentLink,
  hasRoomForParent,
  normalizeParentLinks,
  parentLabels,
  primaryParent,
  removeParentLink,
  setPrimaryParent,
} from '../src/features/parentLinks';
import { ParentLink } from '../src/types';

const link = (token: string, label = token, over: Partial<ParentLink> = {}): ParentLink => ({
  token,
  label,
  linkedAt: 1,
  lastSentDate: null,
  isPrimary: false,
  ...over,
});

describe('addParentLink', () => {
  it('엄마 다음에 아빠를 넣어도 엄마가 안 밀린다', () => {
    // 이 검사 하나가 이번 판의 이유다.
    const got = addParentLink(addParentLink([], link('엄마')), link('아빠'));
    expect(got.map((l) => l.token)).toEqual(['엄마', '아빠']);
  });

  it('처음 연결한 폰이 주 부모가 된다', () => {
    const got = addParentLink([], link('엄마'));
    expect(got[0].isPrimary).toBe(true);
  });

  it('나중에 들어온 폰은 주 부모가 아니다', () => {
    const got = addParentLink(addParentLink([], link('엄마')), link('아빠'));
    expect(primaryParent(got)?.token).toBe('엄마');
    expect(got.filter((l) => l.isPrimary)).toHaveLength(1);
  });

  it('같은 폰을 다시 찍으면 이름만 새로 고친다', () => {
    // 폰 이름을 바꿔 다시 연결하는 경우다. 두 개로 늘면 알림이 두 번 간다.
    const first = addParentLink([], link('엄마', '엄마 폰'));
    const again = addParentLink(first, link('엄마', '엄마 새 폰', { linkedAt: 99 }));
    expect(again).toHaveLength(1);
    expect(again[0].label).toBe('엄마 새 폰');
    expect(again[0].linkedAt).toBe(99);
  });

  it('같은 폰을 다시 찍어도 주 부모 표시는 그대로다', () => {
    let list = addParentLink(addParentLink([], link('엄마')), link('아빠'));
    list = setPrimaryParent(list, '아빠');
    const again = addParentLink(list, link('아빠', '아빠 새 폰'));
    expect(primaryParent(again)?.token).toBe('아빠');
  });

  it('자리가 꽉 차면 새 폰은 안 들어간다', () => {
    /*
     * 조용히 남의 것을 밀어내면 어느 폰이 빠졌는지 아무도 모른다.
     * 안 넣고 그대로 돌려주면 화면에서 "자리가 없다"고 말할 수 있다.
     */
    let list: ParentLink[] = [];
    for (let i = 0; i < MAX_PARENTS; i++) list = addParentLink(list, link(`p${i}`));
    const full = addParentLink(list, link('새폰'));
    expect(full).toHaveLength(MAX_PARENTS);
    expect(full.map((l) => l.token)).not.toContain('새폰');
  });

  it('꽉 찼어도 이미 아는 폰은 갱신된다', () => {
    let list: ParentLink[] = [];
    for (let i = 0; i < MAX_PARENTS; i++) list = addParentLink(list, link(`p${i}`));
    const got = addParentLink(list, link('p1', '이름 바꿈'));
    expect(got).toHaveLength(MAX_PARENTS);
    expect(got.find((l) => l.token === 'p1')?.label).toBe('이름 바꿈');
  });

  it('빈 주소는 안 넣는다', () => {
    expect(addParentLink([], link(''))).toHaveLength(0);
    expect(addParentLink([], link('   '))).toHaveLength(0);
  });
});

describe('setPrimaryParent / primaryParent', () => {
  const two = addParentLink(addParentLink([], link('엄마')), link('아빠'));

  it('주 부모를 바꾸면 하나만 남는다', () => {
    const got = setPrimaryParent(two, '아빠');
    expect(got.filter((l) => l.isPrimary)).toHaveLength(1);
    expect(primaryParent(got)?.token).toBe('아빠');
  });

  it('모르는 주소면 아무것도 안 바뀐다', () => {
    expect(setPrimaryParent(two, '할머니')).toEqual(two);
  });

  it('목록이 비면 주 부모도 없다', () => {
    expect(primaryParent([])).toBeNull();
  });
});

describe('removeParentLink', () => {
  it('한 대만 뺀다', () => {
    const two = addParentLink(addParentLink([], link('엄마')), link('아빠'));
    const got = removeParentLink(two, '엄마');
    expect(got.map((l) => l.token)).toEqual(['아빠']);
  });

  it('주 부모를 빼면 남은 것 중 맨 앞이 주 부모가 된다', () => {
    /*
     * 여기서 주 부모를 비워 두면 요청권이 아무 데도 안 간다. 다시 고르라고
     * 물어도 대부분 안 고르고 그대로 둔다.
     */
    const two = addParentLink(addParentLink([], link('엄마')), link('아빠'));
    const got = removeParentLink(two, '엄마');
    expect(primaryParent(got)?.token).toBe('아빠');
    expect(got[0].isPrimary).toBe(true);
  });

  it('모르는 주소를 빼도 죽지 않는다', () => {
    const one = addParentLink([], link('엄마'));
    expect(removeParentLink(one, '할머니')).toHaveLength(1);
  });

  it('마지막 하나를 빼면 빈 목록', () => {
    const one = addParentLink([], link('엄마'));
    expect(removeParentLink(one, '엄마')).toEqual([]);
  });
});

describe('normalizeParentLinks', () => {
  it('배열이 아니면 빈 목록', () => {
    expect(normalizeParentLinks(null)).toEqual([]);
    expect(normalizeParentLinks({ token: '엄마' })).toEqual([]);
    expect(normalizeParentLinks(undefined)).toEqual([]);
  });

  it('같은 주소는 하나로 줄인다', () => {
    const got = normalizeParentLinks([link('엄마'), link('엄마', '또 엄마')]);
    expect(got).toHaveLength(1);
  });

  it('주 부모가 하나도 없으면 맨 앞이 된다', () => {
    // 저장본이 깨져도 요청권이 갈 곳은 있어야 한다.
    const got = normalizeParentLinks([link('엄마'), link('아빠')]);
    expect(got[0].isPrimary).toBe(true);
    expect(got.filter((l) => l.isPrimary)).toHaveLength(1);
  });

  it('주 부모가 여럿이면 앞의 하나만 남는다', () => {
    const got = normalizeParentLinks([
      link('엄마', '엄마', { isPrimary: true }),
      link('아빠', '아빠', { isPrimary: true }),
    ]);
    expect(got.filter((l) => l.isPrimary)).toHaveLength(1);
    expect(primaryParent(got)?.token).toBe('엄마');
  });

  it('상한을 넘겨 저장돼 있어도 잘라 낸다', () => {
    const many = Array.from({ length: MAX_PARENTS + 3 }, (_, i) => link(`p${i}`));
    expect(normalizeParentLinks(many)).toHaveLength(MAX_PARENTS);
  });

  it('망가진 줄은 건너뛴다', () => {
    const got = normalizeParentLinks([null, { label: '주소 없음' }, link('엄마'), 3]);
    expect(got.map((l) => l.token)).toEqual(['엄마']);
  });

  it('이름이 비면 기본 이름을 준다', () => {
    const got = normalizeParentLinks([link('엄마', '   ')]);
    expect(got[0].label).toBe('부모님 폰');
  });
});

describe('hasRoomForParent / parentLabels', () => {
  it('자리가 남았는지 알려 준다', () => {
    let list: ParentLink[] = [];
    expect(hasRoomForParent(list)).toBe(true);
    for (let i = 0; i < MAX_PARENTS; i++) list = addParentLink(list, link(`p${i}`));
    expect(hasRoomForParent(list)).toBe(false);
  });

  it('이름을 한 줄로 잇는다', () => {
    const two = addParentLink(addParentLink([], link('엄마', '엄마 폰')), link('아빠', '아빠 폰'));
    expect(parentLabels(two)).toBe('엄마 폰 · 아빠 폰');
  });
});
