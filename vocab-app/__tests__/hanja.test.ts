import {
  buildHanjaChoices,
  canHanja,
  chars,
  pickHanjaDistractors,
  sharesChar,
} from '../src/games/hanja';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { KoEntry } from '../src/types';

function entry(over: Partial<KoEntry> = {}): KoEntry {
  return {
    id: 'ko-테스트',
    level: 'm1-1',
    category: 'idiom',
    word: '테스트',
    hanja: '一二三四',
    hanjaVerified: true,
    field: '',
    meaning: '뜻',
    examples: [{ text: '예문이다.' }],
    ...over,
  };
}

/** 섞기를 고정해 결과를 재현할 수 있게 한다. */
const noShuffle = () => 0;

describe('canHanja', () => {
  it('한자가 있고 사전에서 확인했으면 문제를 낼 수 있다', () => {
    expect(canHanja(entry())).toBe(true);
  });

  it('한자가 없으면 못 낸다 — 고유어·외래어', () => {
    expect(canHanja(entry({ hanja: '', hanjaVerified: false }))).toBe(false);
  });

  it('사전에서 확인 못 한 한자로는 안 낸다', () => {
    // 정저지와·진인사대천명처럼 실재하지만 사전에 표제어가 없는 것들.
    // 틀릴지도 모르는 답을 정답이라고 채점할 수 없다.
    expect(canHanja(entry({ hanjaVerified: false }))).toBe(false);
  });
});

describe('sharesChar', () => {
  it('글자가 겹치면 참', () => {
    expect(sharesChar('苦盡甘來', '興盡悲來')).toBe(true);
  });

  it('하나도 안 겹치면 거짓', () => {
    expect(sharesChar('一石二鳥', '大器晩成')).toBe(false);
  });
});

describe('pickHanjaDistractors', () => {
  const answer = entry({ id: 'ko-답', hanja: '苦盡甘來' });

  it('글자가 겹치는 것을 먼저 넣는다', () => {
    const pool = [
      entry({ id: 'a', hanja: '一石二鳥' }), // 안 겹침
      entry({ id: 'b', hanja: '興盡悲來' }), // 盡·來 겹침
      entry({ id: 'c', hanja: '大器晩成' }), // 안 겹침
      entry({ id: 'd', hanja: '苦肉之計' }), // 苦 겹침
    ];
    const got = pickHanjaDistractors(answer, pool, 2, noShuffle);
    expect(got.map((e) => e.hanja).sort()).toEqual(['興盡悲來', '苦肉之計'].sort());
  });

  it('겹치는 것이 모자라면 나머지로 채운다', () => {
    const pool = [
      entry({ id: 'a', hanja: '一石二鳥' }),
      entry({ id: 'b', hanja: '大器晩成' }),
      entry({ id: 'c', hanja: '興盡悲來' }),
    ];
    expect(pickHanjaDistractors(answer, pool, 3, noShuffle)).toHaveLength(3);
  });

  it('자기 자신은 보기에 넣지 않는다', () => {
    const got = pickHanjaDistractors(answer, [answer, entry({ id: 'x', hanja: '興盡悲來' })], 3, noShuffle);
    expect(got.every((e) => e.id !== answer.id)).toBe(true);
  });

  it('한자가 똑같은 것은 넣지 않는다 — 정답이 둘이 된다', () => {
    const twin = entry({ id: 'twin', word: '다른말', hanja: '苦盡甘來' });
    const got = pickHanjaDistractors(answer, [twin], 3, noShuffle);
    expect(got).toHaveLength(0);
  });

  it('글자 수가 다른 것은 넣지 않는다', () => {
    // 넉 자 사이에 석 자가 끼면 그것만 눈에 띄어 답이 아님이 바로 보인다.
    const got = pickHanjaDistractors(answer, [entry({ id: 'x', hanja: '登龍門' })], 3, noShuffle);
    expect(got).toHaveLength(0);
  });

  it('확인 못 한 한자는 오답 보기로도 안 쓴다', () => {
    // 틀렸을지 모르는 한자를 보기로 보여 주면 그 모양을 눈으로 익히게 된다.
    const bad = entry({ id: 'x', hanja: '興盡悲來', hanjaVerified: false });
    expect(pickHanjaDistractors(answer, [bad], 3, noShuffle)).toHaveLength(0);
  });
});

describe('buildHanjaChoices', () => {
  const answer = entry({ id: 'ko-답', hanja: '苦盡甘來' });

  it('정답을 넣어 넷을 만든다', () => {
    const pool = [
      entry({ id: 'a', hanja: '興盡悲來' }),
      entry({ id: 'b', hanja: '一石二鳥' }),
      entry({ id: 'c', hanja: '大器晩成' }),
    ];
    const got = buildHanjaChoices(answer, pool, noShuffle);
    expect(got).toHaveLength(4);
    expect(got.map((e) => e.id)).toContain('ko-답');
  });

  it('오답이 둘도 안 되면 문제를 내지 않는다 — 반반 찍기가 된다', () => {
    expect(buildHanjaChoices(answer, [entry({ id: 'a', hanja: '興盡悲來' })], noShuffle)).toEqual([]);
  });

  it('확인 못 한 한자면 아예 안 낸다', () => {
    const unsure = entry({ id: 'u', hanja: '井底之蛙', hanjaVerified: false });
    const pool = [
      entry({ id: 'a', hanja: '興盡悲來' }),
      entry({ id: 'b', hanja: '一石二鳥' }),
      entry({ id: 'c', hanja: '大器晩成' }),
    ];
    expect(buildHanjaChoices(unsure, pool, noShuffle)).toEqual([]);
  });
});

describe('실제 데이터', () => {
  const idioms = KO_ENTRIES.filter((e) => e.category === 'idiom');

  it('사자성어가 실려 있다', () => {
    expect(idioms.length).toBeGreaterThan(250);
  });

  it('확인된 넉 자 성어는 모두 문제를 낼 수 있다', () => {
    const ok = idioms.filter(canHanja);
    // 사전에 없는 19개를 빼면 나머지는 전부 확인된 것이어야 한다.
    expect(ok.length).toBeGreaterThan(idioms.length - 25);

    const four = ok.filter((e) => chars(e.hanja).length === 4);
    expect(four.length).toBeGreaterThan(250);

    for (const e of four) {
      const choices = buildHanjaChoices(e, idioms, () => 0.5);
      expect(choices).toHaveLength(4);
      // 보기 안에 같은 한자가 두 번 나오면 정답이 둘이 된다.
      expect(new Set(choices.map((c) => c.hanja)).size).toBe(4);
      // 글자 수가 섞이면 그것만 눈에 띄어 답이 아님이 바로 보인다.
      expect(choices.every((c) => chars(c.hanja).length === 4)).toBe(true);
    }
  });

  it('같은 길이 짝이 모자란 성어에는 문제를 내지 않는다', () => {
    // 석 자(미봉책·등용문)와 다섯 자(가정맹어호·빙탄불상용)는 각각 둘뿐이라
    // 오답 셋을 채울 수 없다. 억지로 넉 자를 섞느니 다른 유형으로 낸다.
    const odd = idioms.filter((e) => canHanja(e) && chars(e.hanja).length !== 4);
    expect(odd.length).toBeGreaterThan(0);
    for (const e of odd) {
      expect(buildHanjaChoices(e, idioms, () => 0.5)).toEqual([]);
    }
  });

  it('확인 못 한 사자성어에는 문제를 내지 않는다', () => {
    const unsure = idioms.filter((e) => !e.hanjaVerified);
    expect(unsure.length).toBeGreaterThan(0);
    for (const e of unsure) {
      expect(buildHanjaChoices(e, idioms, () => 0.5)).toEqual([]);
    }
  });
});
