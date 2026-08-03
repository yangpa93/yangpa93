/**
 * 판 번호와 업데이트 내역.
 *
 * 여기서 지키려는 것은 하나다 — **화면에 적힌 판 번호와 그 판의 내역이 같은
 * 것을 가리킬 것.** 판을 올리면서 app.json 만 고치고 목록을 안 적거나, 목록만
 * 적고 app.json 을 잊으면, 폰에서 판을 눌렀을 때 남의 판 내역이 나온다.
 * 사람이 기억해서 지킬 수 있는 규칙이 아니라 검사로 못박는다.
 */

import {
  APP_VERSION,
  RELEASES,
  compareVersions,
  latestRelease,
  releaseOf,
} from '../src/features/changelog';
import appJson from '../app.json';

describe('판 번호', () => {
  it('app.json 과 changelog 의 판이 같다', () => {
    // 어긋나면 폰에는 새 번호가, 내역 화면에는 옛 내용이 뜬다.
    expect(appJson.expo.version).toBe(APP_VERSION);
  });

  it('맨 앞이 지금 판이다', () => {
    expect(latestRelease()?.version).toBe(APP_VERSION);
  });

  it('같은 판을 두 번 적지 않았다', () => {
    const seen = RELEASES.map((r) => r.version);
    expect(new Set(seen).size).toBe(seen.length);
  });

  it('새 판이 앞에 온다', () => {
    for (let i = 1; i < RELEASES.length; i++) {
      expect(compareVersions(RELEASES[i - 1].version, RELEASES[i].version)).toBeGreaterThan(0);
    }
  });
});

describe('내역 내용', () => {
  it('판마다 적어도 한 줄은 있다', () => {
    // 빈 판을 올리면 화면에 제목만 뜨고 무엇이 바뀌었는지 알 수 없다.
    for (const r of RELEASES) {
      expect(r.items.length).toBeGreaterThan(0);
      expect(r.title.trim().length).toBeGreaterThan(0);
    }
  });

  it('날짜가 yyyy-mm-dd 꼴이다', () => {
    for (const r of RELEASES) {
      expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('한 줄이 너무 길지 않다', () => {
    // 폰 화면에서 네 줄이 넘어가면 안 읽는다.
    for (const r of RELEASES) {
      for (const item of r.items) {
        expect(item.length).toBeLessThanOrEqual(120);
      }
    }
  });
});

describe('compareVersions', () => {
  it('자리마다 숫자로 본다', () => {
    // 글자로 비교하면 '0.10.0' < '0.9.0' 이 되어 새 판이 옛 판보다 앞에 선다.
    expect(compareVersions('0.10.0', '0.9.0')).toBeGreaterThan(0);
    expect(compareVersions('0.9.0', '0.10.0')).toBeLessThan(0);
    expect(compareVersions('1.0.0', '0.99.99')).toBeGreaterThan(0);
  });

  it('같으면 0', () => {
    expect(compareVersions('0.10.0', '0.10.0')).toBe(0);
  });

  it('자리 수가 달라도 된다', () => {
    expect(compareVersions('1.0', '1.0.0')).toBe(0);
    expect(compareVersions('1.0.1', '1.0')).toBeGreaterThan(0);
  });
});

describe('releaseOf', () => {
  it('그 판의 내역을 돌려준다', () => {
    expect(releaseOf(APP_VERSION)?.version).toBe(APP_VERSION);
  });

  it('모르는 판이면 null — 남의 판 내역을 보여주지 않는다', () => {
    // 옛 앱을 그대로 쓰는 폰에 "이게 들어 있습니다"라고 말하면 안 된다.
    expect(releaseOf('0.1.0')).toBeNull();
    expect(releaseOf('')).toBeNull();
  });
});
