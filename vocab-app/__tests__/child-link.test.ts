/**
 * 아이가 QR 을 만들고 부모가 찍는 연결.
 *
 * 여기서 틀리면 부모님 폰에 아이가 등록되지 않거나, 등록은 됐는데 아이 쪽이
 * 부모 주소를 몰라 리포트가 영영 안 간다. 둘 다 실기기에서야 드러나므로
 * 규격을 여기서 못박는다.
 */

import {
  buildChildLinkUrl,
  buildLinkBackBody,
  buildLinkUrl,
  parseChildLinkUrl,
  parseLinkBack,
  parseLinkUrl,
} from '../src/features/pairing';
import { normalizeParentStudy, normalizeKind } from '../src/store/storage';
import { ratesOf } from '../src/features/awards';
import { DEFAULT_AWARD_RATES } from '../src/features/awards';

const CHILD = 'ExponentPushToken[Child1234_-abcdEFGH]';
const PARENT = 'ExponentPushToken[Parent98765_-zyxwVU]';

describe('아이 QR', () => {
  it('만든 것을 그대로 되읽는다', () => {
    const got = parseChildLinkUrl(buildChildLinkUrl(CHILD, '서준'));
    expect(got).toEqual({ token: CHILD, name: '서준' });
  });

  it('이름에 공백이나 물음표가 있어도 살아남는다', () => {
    const got = parseChildLinkUrl(buildChildLinkUrl(CHILD, '큰 딸?'));
    expect(got?.name).toBe('큰 딸?');
  });

  it('우리 것이 아니면 안 받는다', () => {
    expect(parseChildLinkUrl('https://example.com')).toBeNull();
    expect(parseChildLinkUrl('그냥 글자')).toBeNull();
    expect(parseChildLinkUrl('')).toBeNull();
  });

  it('토큰이 없으면 안 받는다', () => {
    expect(parseChildLinkUrl('gomtangvoca://child?name=서준')).toBeNull();
  });

  it('이름이 없으면 기본 이름을 준다', () => {
    const got = parseChildLinkUrl(`gomtangvoca://child?token=${encodeURIComponent(CHILD)}`);
    expect(got?.name).toBe('아이');
  });

  /*
   * 부모 QR 과 아이 QR 은 둘 다 token 을 싣는다. 길(://link · ://child)로
   * 가르지 않으면 아이가 다른 아이의 QR 을 찍었을 때 그 아이를 부모로
   * 등록하게 된다.
   */
  it('부모 QR 과 서로 섞이지 않는다', () => {
    const childUrl = buildChildLinkUrl(CHILD, '서준');
    const parentUrl = buildLinkUrl(PARENT, '엄마 폰');

    expect(parseLinkUrl(childUrl)).toBeNull();
    expect(parseChildLinkUrl(parentUrl)).toBeNull();

    expect(parseChildLinkUrl(childUrl)?.token).toBe(CHILD);
    expect(parseLinkUrl(parentUrl)?.token).toBe(PARENT);
  });
});

describe('부모가 되보내는 인사', () => {
  it('아이 주소로 가고 부모 주소를 싣는다', () => {
    const body = buildLinkBackBody(CHILD, { parentToken: PARENT, parentLabel: '엄마 폰' });
    expect(body.to).toBe(CHILD);
    const got = parseLinkBack(body.data);
    expect(got).toEqual({ parentToken: PARENT, parentLabel: '엄마 폰' });
  });

  it('다른 종류의 알림은 안 받는다', () => {
    expect(parseLinkBack({ kind: 'nudge', message: '공부하자' })).toBeNull();
    expect(parseLinkBack(null)).toBeNull();
    expect(parseLinkBack('link-back')).toBeNull();
  });

  it('주소가 망가졌으면 안 받는다', () => {
    // 주소가 없는 인사를 받아들이면 '연결됨'이라고 뜨는데 아무 데도 못 보낸다.
    expect(parseLinkBack({ kind: 'link-back', parentToken: 'xx', parentLabel: '엄마' })).toBeNull();
  });

  it('이름이 비었으면 기본 이름을 준다', () => {
    const got = parseLinkBack({ kind: 'link-back', parentToken: PARENT, parentLabel: '   ' });
    expect(got?.parentLabel).toBe('부모님 폰');
  });
});

describe('저장된 값 다듬기', () => {
  it('갈래가 없으면 아이로 본다', () => {
    expect(normalizeKind(undefined)).toBe('child');
    expect(normalizeKind('아무거나')).toBe('child');
    expect(normalizeKind('parent')).toBe('parent');
  });

  it('없는 주제를 골라 두었으면 기본 주제로 되돌린다', () => {
    const got = normalizeParentStudy({ tracks: ['daily'], dailyTheme: '없는주제', newPerDay: 10 });
    expect(got.dailyTheme).not.toBe('없는주제');
    expect(got.newPerDay).toBe(10);
  });

  it('하루 분량은 5 아니면 10이다', () => {
    expect(normalizeParentStudy({ newPerDay: 7 }).newPerDay).toBe(5);
    expect(normalizeParentStudy({ newPerDay: 10 }).newPerDay).toBe(10);
  });

  it('모르는 갈래는 버린다', () => {
    const got = normalizeParentStudy({ tracks: ['daily', '주식투자'] as never });
    expect(got.tracks).toEqual(['daily']);
  });

  it('안 고른 상태를 임의로 켜 주지 않는다', () => {
    // 부모가 고르지 않은 것을 공부하게 되면 안 된다.
    expect(normalizeParentStudy({ tracks: [] }).tracks).toEqual([]);
  });
});

describe('아이별 동기 부여 요청권 금액', () => {
  it('아이가 자기 금액표를 가지면 그것을 쓴다', () => {
    const own = { ...DEFAULT_AWARD_RATES, middleLevel: 5_000 };
    expect(ratesOf({ awards: own }, { middleLevel: 50_000 }).middleLevel).toBe(5_000);
  });

  it('안 정했으면 기기 기본값을 쓴다', () => {
    expect(ratesOf({ awards: null }, { middleLevel: 50_000 }).middleLevel).toBe(50_000);
    expect(ratesOf(null, { middleLevel: 50_000 }).middleLevel).toBe(50_000);
  });

  it('둘 다 없으면 기본 금액표', () => {
    expect(ratesOf(null, null)).toEqual(DEFAULT_AWARD_RATES);
  });
});
