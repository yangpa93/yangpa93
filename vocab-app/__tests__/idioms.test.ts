/**
 * 숙어 데이터가 문제로 나갈 수 있는 모양인지.
 *
 * data.test.ts 는 어휘 전체의 모양(철자·예문 개수·중복)을 본다. 여기서는
 * **숙어에만 생기는 문제**를 본다. 숙어는 낱말 하나가 아니라 여러 낱말이라
 * 빈칸을 만들 때 사정이 다르다 — 목적어가 사이에 끼거나(let me down),
 * 표제어에 자리표시말이 들어 있으면(by oneself) 문장에서 그 자리를 찾을 수 없다.
 */

import { ALL_ENTRIES } from '../src/data';
import { clozeSentence } from '../src/data/entry';
import { PLAN } from '../src/data/plan';

const IDIOMS = ALL_ENTRIES.filter((e) => e.kind === 'idiom');

/**
 * 빈칸을 하나도 못 만드는 표제어.
 *
 * 전부 **표제어 자체에 자리표시말이 들어 있는 것**이다. 문장에는 `oneself` 가
 * 아니라 `himself`·`herself` 가 들어가고, `A`·`B` 는 아예 낱말이 아니며,
 * `thank for`·`remind of`·`talk into` 는 목적어가 반드시 사이에 낀다
 * (thank you for · reminds me of · talked me into). 규칙으로 풀 수 있는
 * 문제가 아니라 표제어가 원래 그런 꼴이다.
 *
 * 이런 문항은 빈칸 대신 **문맥 문제**로 나간다. 문장 안에서 묻는다는 원칙은
 * 그대로 지켜진다. 목록이 늘어나면 예문을 잘못 쓴 것이므로 여기서 잡는다.
 */
const NO_CLOZE = [
  'both A and B',
  'by oneself',
  'help oneself',
  "on one's own",
  'remind of',
  'talk into',
  'thank for',
];

describe('숙어 데이터', () => {
  it('숙어가 레벨마다 고르게 들어 있다', () => {
    // 예전에는 숙어가 71개뿐이었고 고1-1·고2-2 같은 레벨에는 하나도 없었다.
    const byLevel = new Map<string, number>();
    for (const e of IDIOMS) byLevel.set(e.level, (byLevel.get(e.level) ?? 0) + 1);
    expect(byLevel.size).toBe(24);
    for (const [level, n] of byLevel) {
      expect({ level, n: n >= 10 }).toEqual({ level, n: true });
    }
  });

  it('모든 숙어에 예문이 3개 이상 있다', () => {
    for (const e of IDIOMS) {
      const total = e.senses.reduce((n, s) => n + s.examples.length, 0);
      expect({ word: e.word, ok: total >= 3 }).toEqual({ word: e.word, ok: true });
    }
  });

  it('빈칸을 못 만드는 표제어는 알려진 것뿐이다', () => {
    const none = IDIOMS.filter(
      (e) => !e.senses.some((s) => s.examples.some((ex) => clozeSentence(e, ex.en) !== null)),
    ).map((e) => e.word);
    expect(none.sort()).toEqual([...NO_CLOZE].sort());
  });

  it('예문 대부분에서 빈칸을 만들 수 있다', () => {
    // 낱개 단어는 99.7%다. 숙어는 목적어가 끼는 자리가 많아 그만큼은 안 되지만,
    // 90% 아래로 떨어지면 예문 쓰는 방식을 다시 봐야 한다.
    let total = 0;
    let ok = 0;
    for (const e of IDIOMS) {
      for (const s of e.senses) {
        for (const ex of s.examples) {
          total++;
          if (clozeSentence(e, ex.en) !== null) ok++;
        }
      }
    }
    expect(ok / total).toBeGreaterThan(0.9);
  });

  it('숙어 표제어가 배치표에 다 들어 있다', () => {
    const planned = new Set(PLAN.map((r) => r.word));
    for (const e of IDIOMS) {
      expect({ word: e.word, planned: planned.has(e.word) }).toEqual({ word: e.word, planned: true });
    }
  });

  it('숙어 품사는 phr. 로 통일돼 있다', () => {
    for (const e of IDIOMS) {
      expect({ word: e.word, pos: e.pos }).toEqual({ word: e.word, pos: 'phr.' });
    }
  });
});
