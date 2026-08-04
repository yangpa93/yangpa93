/**
 * 어휘 판.
 *
 * 여기서 틀리면 **낱말을 더해 놓고 아무도 모른다.** 무선 업데이트로 조용히
 * 들어오는 것이라 화면이 하나도 안 바뀌고, 그래서 "늘었다" 고 말해 주지
 * 않으면 만들어 넣은 것이 없는 것과 같아진다.
 *
 * 반대 실수도 막는다 — 안 늘었는데 늘었다고 하는 것. 그건 거짓말이다.
 */

import {
  addedLine,
  addedSince,
  compareDataVersions,
  DATA_RELEASES,
  DATA_VERSION,
  latestDataRelease,
} from '../src/data/dataVersion';
import { ALL_ENTRIES } from '../src/data';
import { DAILY_ENTRIES } from '../src/data/daily';
import { KO_ENTRIES } from '../src/data/korean/levels';

describe('적어 둔 개수가 실제 파일과 맞는가', () => {
  /*
   * 이게 이 파일에서 제일 중요한 확인이다. 낱말을 더하고 판 올리는 것을
   * 잊으면 여기서 걸린다 — `npm run bump-data` 를 부르라는 신호다.
   */
  it('맨 앞 판의 전체 개수가 실제와 같다', () => {
    const latest = latestDataRelease();
    expect(latest.totalEn).toBe(ALL_ENTRIES.length);
    expect(latest.totalKo).toBe(KO_ENTRIES.length);
    expect(latest.totalDaily).toBe(DAILY_ENTRIES.length);
  });

  it('DATA_VERSION 이 맨 앞 판과 같다', () => {
    expect(DATA_VERSION).toBe(DATA_RELEASES[0].version);
  });

  it('더해진 개수의 합이 전체와 맞아떨어진다', () => {
    // 첫 판의 전체에서 시작해 그 뒤로 더해진 것을 쌓으면 지금 전체가 나와야 한다.
    const first = DATA_RELEASES[DATA_RELEASES.length - 1];
    const after = DATA_RELEASES.slice(0, -1);
    const en = after.reduce((n, r) => n + r.en, first.totalEn);
    const ko = after.reduce((n, r) => n + r.ko, first.totalKo);
    const daily = after.reduce((n, r) => n + r.daily, first.totalDaily);
    expect(en).toBe(latestDataRelease().totalEn);
    expect(ko).toBe(latestDataRelease().totalKo);
    expect(daily).toBe(latestDataRelease().totalDaily);
  });
});

describe('목록 자체가 온전한가', () => {
  it('새 판이 맨 앞이다', () => {
    for (let i = 1; i < DATA_RELEASES.length; i++) {
      expect(compareDataVersions(DATA_RELEASES[i - 1].version, DATA_RELEASES[i].version)).toBe(1);
    }
  });

  it('같은 판이 두 번 없다', () => {
    const seen = new Set(DATA_RELEASES.map((r) => r.version));
    expect(seen.size).toBe(DATA_RELEASES.length);
  });

  it('날짜 꼴이 yyyy-mm-dd 다', () => {
    for (const r of DATA_RELEASES) expect(r.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('무엇이 늘었는지 한 줄이 비어 있지 않다', () => {
    // 화면에 그대로 나가는 말이다. 비면 빈 카드가 뜬다.
    for (const r of DATA_RELEASES) expect(r.note.trim().length).toBeGreaterThan(0);
  });

  it('전체 개수는 음수가 아니다', () => {
    for (const r of DATA_RELEASES) {
      expect(r.totalEn).toBeGreaterThanOrEqual(0);
      expect(r.totalKo).toBeGreaterThanOrEqual(0);
      expect(r.totalDaily).toBeGreaterThanOrEqual(0);
    }
  });

  /*
   * **늘고 준 것이 전체 개수와 맞아떨어지는가.**
   *
   * 예전에는 "더해진 개수는 음수가 아니다" 만 봤다. 그런데 낱말은 줄기도
   * 한다 — 잘 안 쓰는 사자성어를 빼는 일이 실제로 있었다. 음수를 막아 두면
   * 그때 0 으로 적게 되고, 그러면 판에 아무 표시도 안 남는다.
   *
   * 부호를 막는 대신 **앞뒤가 맞는지**를 본다. 이쪽이 훨씬 센 자다 —
   * 낱말을 더하거나 빼고 개수 적는 것을 잊으면 여기서 걸린다.
   */
  it('늘고 준 개수가 앞 판의 전체와 맞아떨어진다', () => {
    // 맨 앞이 새 판이므로 뒤에서 앞으로 훑는다.
    for (let i = DATA_RELEASES.length - 2; i >= 0; i--) {
      const prev = DATA_RELEASES[i + 1];
      const cur = DATA_RELEASES[i];
      const got = { en: cur.totalEn, ko: cur.totalKo, daily: cur.totalDaily };
      const want = {
        en: prev.totalEn + cur.en,
        ko: prev.totalKo + cur.ko,
        daily: prev.totalDaily + cur.daily,
      };
      // 어느 판이 어긋났는지 바로 보이게 판 번호를 함께 견준다.
      expect({ 판: cur.version, ...got }).toEqual({ 판: cur.version, ...want });
    }
  });
});

describe('addedSince', () => {
  it('모르면 아무것도 안 센다', () => {
    /*
     * 이 칸이 생기기 전에 쓰던 사람은 값이 비어 있다. 그때 "처음부터 다 새것"
     * 으로 세면 3,690개가 추가됐다는 거짓말을 하게 된다 — 이미 다 갖고 있다.
     */
    expect(addedSince(null).total).toBe(0);
    expect(addedSince(undefined).total).toBe(0);
    expect(addedSince('').total).toBe(0);
  });

  it('지금 판을 본 사람에게는 늘어난 것이 없다', () => {
    expect(addedSince(DATA_VERSION).total).toBe(0);
  });

  it('아주 옛 판을 본 사람에게는 그 뒤 전부를 센다', () => {
    const got = addedSince('2000.01.01');
    expect(got.releases.length).toBe(DATA_RELEASES.length);
    expect(got.en).toBe(DATA_RELEASES.reduce((n, r) => n + r.en, 0));
    expect(got.total).toBe(got.en + got.ko + got.daily);
  });
});

describe('compareDataVersions', () => {
  it('날짜 순서가 그대로 판 순서다', () => {
    expect(compareDataVersions('2026.08.04', '2026.08.03')).toBe(1);
    expect(compareDataVersions('2026.08.03', '2026.09.01')).toBe(-1);
    expect(compareDataVersions('2026.08.03', '2026.08.03')).toBe(0);
  });

  it('같은 날 두 번째 판이 뒤에 온다', () => {
    // '2026.08.03' < '2026.08.03-2' — 글자 순서가 그대로 맞다.
    expect(compareDataVersions('2026.08.03-2', '2026.08.03')).toBe(1);
  });
});

describe('addedLine', () => {
  it('갈래마다 나눠 적는다', () => {
    expect(addedLine({ en: 120, ko: 30, daily: 0 })).toBe('영어 120개 · 국어 30개');
  });

  it('0 인 갈래는 아예 안 적는다', () => {
    // 국어를 안 하는 아이 화면에 '국어 0개' 가 뜨면 자기와 상관없는 숫자가 보인다.
    expect(addedLine({ en: 10, ko: 0, daily: 0 })).toBe('영어 10개');
    expect(addedLine({ en: 0, ko: 0, daily: 5 })).toBe('일상 문장 5개');
    expect(addedLine({ en: 0, ko: 0, daily: 0 })).toBe('');
  });
});
