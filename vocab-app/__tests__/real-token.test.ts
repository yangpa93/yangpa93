/**
 * 실제로 아이 폰에 떴던 주소 하나를 그대로 못박는다.
 *
 * ── 왜 진짜 값을 넣어 두나 ──────────────────────────────────
 *
 * 지어낸 값으로만 시험하면 지어낸 만큼만 확인된다. 이 주소는 2026-08-03 에
 * 아이 폰에서 실제로 나온 것이고, 화면 사진으로 코드까지 남아 있다. 그
 * 사진에 찍힌 글자와 우리 코드가 만드는 글자가 같은지를 여기서 본다.
 *
 * 이 주소로 이미 하나를 알아냈다 — 넷째 토막이 `-PbJ` 로 시작한다는 것.
 * 빈칸 바로 뒤에 하이픈이 오면 사람은 그것이 글자인지 줄표인지 가릴 수 없다.
 * 지어낸 값으로는 그 자리가 잘 안 나온다.
 *
 * 주소 자체는 비밀이 아니다. 이 값으로 할 수 있는 일은 그 폰에 알림을
 * 보내는 것뿐이고, 그나마 앱을 다시 깔면 바뀐다.
 */

import { fromShortCode, isValidPushToken, toShortCodeLines } from '../src/features/pairing';
import { buildChildLinkUrl, parseChildLinkUrl, parseScanned } from '../src/features/pairing';

/** 2026-08-03 아이 폰(0.22.1)에서 나온 주소. */
const REAL = 'ExponentPushToken[WLDvRDLXNikW-PbJkPm1vY]';

/** 그때 화면에 떴던 코드. 사진에 찍힌 그대로. */
const ON_SCREEN = ['WLDv', 'RDLX', 'NikW', '-PbJ', 'kPm1', 'vYF'];

describe('실제로 아이 폰에 떴던 주소', () => {
  it('우리 검사를 지난다', () => {
    expect(isValidPushToken(REAL)).toBe(true);
  });

  it('화면에 떴던 코드와 똑같이 만들어진다', () => {
    expect(toShortCodeLines(REAL)).toEqual(ON_SCREEN);
  });

  it('그 코드를 되돌리면 같은 주소가 나온다', () => {
    expect(fromShortCode(ON_SCREEN.join('\n'))).toBe(REAL);
  });

  /*
   * 옮겨 적는 사람이 할 만한 짓들. 되돌리는 쪽은 공백 종류를 안 가리므로
   * 전부 같은 값이 되어야 한다. 이걸 화면에도 적어 두었다.
   */
  it.each([
    ['줄로 끊어 적기', ON_SCREEN.join('\n')],
    ['빈칸으로 끊어 적기 (옛 판 모양)', ON_SCREEN.join(' ')],
    ['통째로 붙여 적기', ON_SCREEN.join('')],
    ['앞뒤에 공백이 딸려 옴', `  ${ON_SCREEN.join(' ')}  `],
    ['줄과 빈칸이 섞임', ON_SCREEN.join(' \n ')],
  ])('%s — 같은 주소가 나온다', (_label, typed) => {
    expect(fromShortCode(typed)).toBe(REAL);
  });

  /*
   * **하이픈을 빠뜨린 경우.** 화면에서 `NikW -PbJ` 를 보고 그 하이픈을 끊는
   * 표시로 읽으면 이렇게 된다. 이것이 이번에 고친 문제의 실제 모양이다.
   *
   * 검사 문자가 그 자리에서 잡아 준다 — 조용히 엉뚱한 주소가 되는 것보다
   * 훨씬 낫다. 그래도 애초에 헷갈리지 않게 하는 것이 먼저라 화면을 고쳤다.
   */
  it('하이픈을 줄표로 읽고 빠뜨리면 그 자리에서 걸린다', () => {
    const wrong = 'WLDv RDLX NikW PbJ kPm1 vYF';
    expect(fromShortCode(wrong)).toBeNull();
  });

  it('아이 QR 주소를 만들고 되읽으면 그대로다', () => {
    const url = buildChildLinkUrl(REAL, '서준');
    expect(parseChildLinkUrl(url)).toEqual({ token: REAL, name: '서준' });
    expect(parseScanned(url)).toEqual({ kind: 'child', token: REAL, name: '서준' });
  });

  /*
   * 폰 기본 카메라로 찍었을 때 나온 글자 그대로. 사용자가 보내 준 값이다.
   * 우리가 만드는 주소와 한 글자도 안 틀리는지 본다.
   */
  it('폰 카메라에 뜬 글자와 우리가 만드는 주소가 같다', () => {
    const fromCamera =
      'gomtangivoca://child?token=ExponentPushToken%5BWLDvRDLXNikW-PbJkPm1vY%5D&name=%EC%84%9C%EC%A4%80';
    expect(buildChildLinkUrl(REAL, '서준')).toBe(fromCamera);
  });
});
