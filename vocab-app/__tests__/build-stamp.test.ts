/**
 * 빌드가 만들어진 때를 적는 규칙.
 *
 * 빌드 번호만으로는 그것이 언제 것인지 알 수 없다. 하루에 두어 번 빌드한
 * 날에는 아이 폰에 든 것이 아침 것인지 저녁 것인지 번호로 못 가린다.
 */

import { stampOf } from '../src/lib/date';

describe('stampOf', () => {
  it('판 번호와 나란히 읽히게 점으로 잇는다', () => {
    // 「0.23.0.16 · 2026.08.15.20.05」 처럼 한 덩어리로 읽힌다.
    expect(stampOf(new Date(2026, 7, 15, 20, 5))).toBe('2026.08.15.20.05');
  });

  it('한 자리 수는 0 을 채운다', () => {
    // 자릿수가 들쭉날쭉하면 두 판을 견줄 때 눈이 어긋난다.
    expect(stampOf(new Date(2026, 0, 3, 9, 7))).toBe('2026.01.03.09.07');
  });

  it('자정도 제대로 적는다', () => {
    expect(stampOf(new Date(2026, 11, 31, 0, 0))).toBe('2026.12.31.00.00');
  });

  it('구울 때 박아 둔 글자도 같은 모양으로 바꾼다', () => {
    /*
     * app.config.js 는 시각을 ISO 글자로 넣는다. 그것을 날짜로 바꿔 넘기면
     * 무선 업데이트에서 온 것과 똑같이 읽힌다 — 두 자리가 다르게 보이면
     * 어느 쪽이 진짜인지 묻게 된다.
     */
    expect(stampOf(new Date(new Date(2026, 7, 16, 13, 45).toISOString()))).toBe(
      '2026.08.16.13.45',
    );
  });

  it('못 읽으면 빈 문자열', () => {
    /*
     * 개발 모드와 노트북 미리보기에서는 만든 때를 알 수 없다(null). 없는 시각을
     * 지어내면 그것이 진짜 빌드 시각인 줄 알고 폰과 견주게 된다.
     */
    expect(stampOf(null)).toBe('');
    expect(stampOf(undefined)).toBe('');
    expect(stampOf(new Date('그런 날 없음'))).toBe('');
  });
});

/**
 * 굽는 쪽. **app.config.js 가 시각을 박아 넣는가.**
 *
 * 이 검사가 없으면 그 파일을 잘못 고쳐도 아무도 모른다 — 노트북에서는 원래
 * 시각이 안 보이는 자리라서, 다음 APK 를 아이 폰에 깔고 나서야 없어진 것을
 * 안다. 지난번이 그랬다.
 */
describe('app.config.js', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const withStamp = require('../app.config.js') as (a: { config: unknown }) => {
    extra: { builtAt?: string; eas?: { projectId?: string } };
    android?: { package?: string };
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const appJson = require('../app.json') as { expo: Record<string, unknown> };

  it('구울 때의 시각을 넣는다', () => {
    const out = withStamp({ config: appJson.expo });
    expect(typeof out.extra.builtAt).toBe('string');
    expect(Number.isNaN(Date.parse(out.extra.builtAt as string))).toBe(false);
  });

  it('app.json 에 적어 둔 것을 잃지 않는다', () => {
    /*
     * 설정을 통째로 새로 쓰면 패키지 이름이나 EAS 프로젝트 번호가 날아간다.
     * 그러면 굽기는 되는데 엉뚱한 앱이 나오거나 아예 안 올라간다.
     */
    const out = withStamp({ config: appJson.expo });
    const src = appJson.expo as {
      android: { package: string };
      extra: { eas: { projectId: string } };
    };
    expect(out.android?.package).toBe(src.android.package);
    expect(out.extra.eas?.projectId).toBe(src.extra.eas.projectId);
  });
});
