/**
 * 부모님용 일상 문장 자료가 온전한지.
 *
 * 이 자료는 손으로 쓰지 않고 scripts/build-daily.mjs 가 만든다. 그래서
 * 검사할 것은 "빠진 칸이 없는가"가 아니라 **문제를 낼 수 있는 모양인가**다.
 * 빈칸을 못 만드는 문장이 늘어나면 부모님 화면에 문맥 문제만 나오게 되는데,
 * 그건 자료를 다시 만들 때까지 아무도 모른다.
 */

import { DAILY_ENTRIES, DAILY_THEME_LIST, dailyTheme, DEFAULT_DAILY_THEME } from '../src/data/daily';
import { DAILY_THEMES } from '../src/data/daily/phrases';
import { clozeSentence } from '../src/data/entry';

describe('일상 문장 자료', () => {
  it('주제 8개에 문장 80개', () => {
    expect(DAILY_THEME_LIST).toHaveLength(8);
    expect(DAILY_ENTRIES).toHaveLength(80);
  });

  it('원본의 되풀이를 걷어냈다', () => {
    // korean/english_365_dataset.json 은 같은 문장을 45~46번씩 싣고 있다.
    const sentences = DAILY_ENTRIES.map((e) => e.senses[0].examples[0].en);
    expect(new Set(sentences).size).toBe(sentences.length);
  });

  it('id 가 겹치지 않고 아이들 단어와도 안 섞인다', () => {
    const ids = DAILY_ENTRIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id.startsWith('daily-')).toBe(true);
  });

  it('빈칸을 만들지 못하는 문장은 둘을 넘지 않는다', () => {
    // 'take the time to' 와 'travel trip' 둘은 원본 표제어가 문장에 그대로
    // 들어 있지 않아 자리를 못 잡았다. 셋으로 늘면 자료가 바뀐 것이다.
    const cannot = DAILY_ENTRIES.filter(
      (e) => clozeSentence(e, e.senses[0].examples[0].en) === null,
    );
    expect(cannot.length).toBeLessThanOrEqual(2);
  });

  it('모든 문장에 한국어 해석과 쓰임 설명이 있다', () => {
    for (const e of DAILY_ENTRIES) {
      expect(e.senses[0].examples[0].ko.trim().length).toBeGreaterThan(0);
      expect(e.senses[0].meaning.trim().length).toBeGreaterThan(0);
    }
  });

  it('한 주제 안에서 뜻풀이가 겹치지 않는다', () => {
    // 뜻풀이가 그대로 보기로 나가므로, 겹치면 정답이 둘이 된다.
    for (const t of DAILY_THEME_LIST) {
      const meanings = t.entries.map((e) => e.senses[0].meaning);
      expect(new Set(meanings).size).toBe(meanings.length);
    }
  });

  it('표제어는 문장 안에서 실제로 쓰인 자리다', () => {
    for (const t of DAILY_THEMES) {
      for (const p of t.phrases) {
        // 자리를 못 잡은 것은 원본 표제어를 그대로 둔다.
        if (p.word === p.keyExpression) continue;
        expect(p.en.toLowerCase()).toContain(p.word.toLowerCase());
      }
    }
  });

  it('모르는 주제를 물으면 첫 주제로 되돌린다', () => {
    expect(dailyTheme('없는주제').id).toBe(DAILY_THEME_LIST[0].id);
    expect(dailyTheme(DEFAULT_DAILY_THEME).id).toBe(DEFAULT_DAILY_THEME);
  });
});
