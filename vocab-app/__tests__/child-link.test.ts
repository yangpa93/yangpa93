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
    expect(parseChildLinkUrl('gomtangivoca://child?name=서준')).toBeNull();
  });

  it('이름이 없으면 기본 이름을 준다', () => {
    const got = parseChildLinkUrl(`gomtangivoca://child?token=${encodeURIComponent(CHILD)}`);
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
    const got = normalizeParentStudy({
      tracks: ['daily'],
      dailyTheme: '없는주제',
      perTrack: { daily: 10, enWord: 5, ko: 5 },
    });
    expect(got.dailyTheme).not.toBe('없는주제');
    expect(got.perTrack.daily).toBe(10);
  });

  it('하루 분량은 갈래마다 5 아니면 10이다', () => {
    const got = normalizeParentStudy({ perTrack: { daily: 7, enWord: 10, ko: 999 } as never });
    // 7 은 5 쪽에 가깝고, 999 는 10 으로 맞춘다. 저장본이 깨져도 화면에
    // 고를 수 없는 값이 뜨면 안 된다.
    expect(got.perTrack.daily).toBe(5);
    expect(got.perTrack.enWord).toBe(10);
    expect(got.perTrack.ko).toBe(10);
  });

  it('예전 저장본(newPerDay 합계)을 갈래별로 옮긴다', () => {
    /*
     * 예전에는 합계를 켠 갈래끼리 나눠 가졌다. 셋을 켜고 10이면 4/3/3 이었다.
     * 그때 실제로 돌던 개수(≈3.3)를 고를 수 있는 값으로 맞추면 5가 된다.
     * 합계를 그대로 각 갈래에 넣으면(10·10·10) 하루 분량이 세 배가 되어,
     * 앱을 새로 받은 다음 날 갑자기 못 끝내게 된다.
     */
    const three = normalizeParentStudy({
      tracks: ['daily', 'enWord', 'ko'],
      newPerDay: 10,
    } as never);
    expect(three.perTrack).toEqual({ daily: 5, enWord: 5, ko: 5 });

    // 하나만 켜 두었으면 그 값이 그대로 그 갈래의 개수였다.
    const one = normalizeParentStudy({ tracks: ['daily'], newPerDay: 10 } as never);
    expect(one.perTrack.daily).toBe(10);
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
