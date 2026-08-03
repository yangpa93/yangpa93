/**
 * 미리보기용 가짜 푸시 주소가 **실제 폰으로 새어 나가지 않는지.**
 *
 * 노트북에서 연결을 끝까지 시험하려고 웹에서만 가짜 주소를 만든다. 그 대가로
 * 새로 생긴 위험이 하나 있다 — 가짜 주소가 실기기에서 만들어지면 리포트가
 * 안 가는데 화면에는 "연결됨" 이라고 뜬다. 조용한 실패라 아무도 모른다.
 *
 * 그래서 판단을 순수 함수 하나(previewPushToken)에 몰아 두고, 여기서 못박는다.
 * 이 파일이 통과하는 한 android·ios 에서는 가짜 주소가 만들어지지 않는다.
 */

import {
  fromShortCode,
  isPreviewToken,
  isValidPushToken,
  previewPushToken,
  toShortCodeLines,
} from '../src/features/pairing';

describe('previewPushToken', () => {
  it('웹에서는 만들어 준다', () => {
    expect(previewPushToken('web')).not.toBeNull();
  });

  /*
   * 이 시험이 이 파일의 존재 이유다. 실제 폰의 Platform.OS 는 늘 둘 중
   * 하나이고, 그 두 곳에서 이 문이 열리면 안 된다.
   */
  it.each(['android', 'ios', 'windows', 'macos', '', 'WEB', 'Web'])(
    '%s 에서는 절대 안 만든다',
    (platform) => {
      expect(previewPushToken(platform)).toBeNull();
    },
  );

  it('진짜 주소와 같은 모양이라 앱의 검사를 그대로 지난다', () => {
    const t = previewPushToken('web')!;
    expect(isValidPushToken(t)).toBe(true);
  });

  /* 화면에 뜬 그대로(줄로 끊어) 옮겨 적은 셈 친다. */
  it('짧은 코드로 바꿨다가 되돌려도 그대로다', () => {
    const t = previewPushToken('web')!;
    expect(fromShortCode(toShortCodeLines(t).join('\n'))).toBe(t);
  });

  /*
   * 창마다 달라야 한다. 같으면 부모 창이 아이 주소를 "이 폰의 주소예요" 로
   * 되돌려 보내서 연결 시험이 첫걸음에서 막힌다.
   */
  it('부를 때마다 다른 값이 나온다', () => {
    const many = new Set(Array.from({ length: 50 }, () => previewPushToken('web')));
    expect(many.size).toBeGreaterThan(45);
  });

  it('넘긴 난수를 그대로 쓴다 — 값이 어디서 오는지 고정된다', () => {
    const zero = previewPushToken('web', () => 0);
    expect(zero).toBe('ExponentPushToken[Preview-AAAAAAAAAAAAAAAA]');
  });
});

describe('isPreviewToken', () => {
  it('우리가 만든 가짜 주소를 알아본다', () => {
    expect(isPreviewToken(previewPushToken('web')!)).toBe(true);
  });

  it('진짜처럼 생긴 주소는 가짜라고 하지 않는다', () => {
    expect(isPreviewToken('ExponentPushToken[AbCdEfGhIjKlMnOpQrStUv]')).toBe(false);
    expect(isPreviewToken('ExponentPushToken[Preview]')).toBe(false);
    expect(isPreviewToken('')).toBe(false);
  });

  it('앞뒤 공백이 붙어 와도 알아본다 — 붙여넣으면 딸려 온다', () => {
    expect(isPreviewToken(`  ${previewPushToken('web')!}  `)).toBe(true);
  });
});
