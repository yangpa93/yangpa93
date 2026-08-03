/**
 * 다른 앱이 넘긴 파일 주소 가려내기.
 *
 * 여기서 잘못 가르면 두 가지가 망가진다.
 *  · 우리 딥링크를 파일로 오해하면 — QR 로 부모 폰을 연결할 때마다 백업
 *    화면이 튀어나온다.
 *  · 파일을 딥링크로 오해하면 — 카톡에서 '다른 앱으로 열기' 를 눌러도
 *    아무 일도 안 일어난다. 그러면 대화방에 갇힌 백업을 꺼낼 길이 없다.
 */

import { fileNameFromUrl, isOpenedFileUrl } from '../src/features/openedFile';

describe('isOpenedFileUrl', () => {
  it('다른 앱이 넘긴 파일이면 참', () => {
    expect(isOpenedFileUrl('content://com.kakao.talk/files/backup.json')).toBe(true);
    expect(isOpenedFileUrl('file:///storage/emulated/0/Download/backup.json')).toBe(true);
  });

  it('앞머리가 대문자여도 알아본다', () => {
    // 기기에 따라 스킴을 대문자로 넘기기도 한다.
    expect(isOpenedFileUrl('CONTENT://x/y')).toBe(true);
  });

  it('우리 딥링크는 거짓', () => {
    /*
     * 이걸 참으로 보면 QR 로 연결할 때마다 백업 화면이 뜬다. 부모 폰을
     * 연결하려던 사람이 영문도 모르고 되돌리기 화면을 만난다.
     */
    expect(isOpenedFileUrl('gomtangivoca://link?token=abc')).toBe(false);
    expect(isOpenedFileUrl('gomtangivoca://child?token=abc')).toBe(false);
  });

  it('웹 주소도 거짓', () => {
    expect(isOpenedFileUrl('https://example.com/backup.json')).toBe(false);
  });

  it('주소가 아니면 거짓', () => {
    expect(isOpenedFileUrl(null)).toBe(false);
    expect(isOpenedFileUrl(undefined)).toBe(false);
    expect(isOpenedFileUrl('')).toBe(false);
    expect(isOpenedFileUrl(42)).toBe(false);
  });
});

describe('fileNameFromUrl', () => {
  it('마지막 조각을 이름으로 본다', () => {
    expect(fileNameFromUrl('file:///storage/Download/gomtangivoca-2026-08-02.json')).toBe(
      'gomtangivoca-2026-08-02.json',
    );
  });

  it('%20 같은 것을 풀어 준다', () => {
    expect(fileNameFromUrl('content://x/%EB%B0%B1%EC%97%85.json')).toBe('백업.json');
  });

  it('물음표 뒤는 버린다', () => {
    expect(fileNameFromUrl('content://x/backup.json?take=1')).toBe('backup.json');
  });

  it('숫자만 있으면 이름이 아니다', () => {
    /*
     * content:// 주소는 이름이 아예 없고 내부 번호만 있는 경우가 흔하다.
     * 그 번호를 파일 이름이라고 화면에 적으면 엉뚱한 말이 남는다.
     */
    expect(fileNameFromUrl('content://media/external/downloads/1234')).toBe('');
  });

  it('망가진 주소여도 죽지 않는다', () => {
    expect(fileNameFromUrl('content://x/%E0%A4%A')).toBe('');
    expect(fileNameFromUrl('')).toBe('');
  });
});
