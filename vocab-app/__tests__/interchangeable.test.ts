/**
 * **바꿔 써도 되는 표현이 오답 보기로 나오지 않는지.**
 *
 * ── 실제로 나온 말 ──────────────────────────────────────────
 *
 * "예문 중에 a lot of 와 a number of 가 있던데 두 예문이 맞나요? 두 개가
 *  혼용해서 사용할 수 있는 문장에 답이 둘 중 하나만 되어 있어서요."
 *
 * 맞는 지적이었다. 그리고 예문이 틀린 것이 아니라 **오답 보기를 뽑는 규칙**에
 * 구멍이 있었다.
 *
 *     a lot of      많은          ← many · much · lots of
 *     a number of   다수의, 여러   ← several · many
 *
 * 여태 거르는 자는 낱말 글자와 한국어 뜻만 봤다. 이 둘은 뜻 글자가 하나도 안
 * 겹쳐서 그대로 통과했다. 그런데 "___ people came to the festival." 에는
 * 둘 다 들어간다. 아이는 맞는 문장을 만들어 놓고 틀렸다는 말을 듣는다.
 *
 * 이어져 있다는 표는 뜻이 아니라 **바꿔 쓸 표현 목록**에 있었다 — 둘 다
 * `many` 를 갖고 있다. 이제 그것까지 본다(expressionKeys).
 *
 * ── 이 파일이 하는 일 ───────────────────────────────────────
 *
 *   ① 말이 나온 그 짝을 그대로 못박는다
 *   ② 어휘 **전체**를 훑어 같은 모양이 더 있는지 센다
 *
 * ②가 이 파일의 값이다. 하나를 고쳐 놓고 나머지를 모르는 채로 두면, 다음에
 * 또 같은 말을 듣고 또 하나만 고치게 된다.
 */

import { ALL_ENTRIES } from '../src/data';
import { primaryMeaning } from '../src/data/entry';
import { buildChoices, expressionKeys, meaningKeys } from '../src/srs/session';
import { VocabEntry } from '../src/types';

const byWord = (w: string): VocabEntry => {
  const e = ALL_ENTRIES.find((x) => x.word === w);
  if (!e) throw new Error(`어휘에 '${w}' 가 없습니다`);
  return e;
};

/** 화면이 오답 보기를 거를 때 쓰는 것과 같은 자. */
const keysOf = (e: VocabEntry) =>
  expressionKeys({
    word: e.word,
    meaning: primaryMeaning(e),
    synonyms: e.senses.flatMap((s) => s.synonyms),
  });

const norm = (s: string) => s.trim().toLowerCase().replace(/^~+|~+$/g, '').replace(/\s+/g, ' ');

/** 둘이 같은 자리를 차지하는가 — 한쪽이 다른 쪽의 오답이 될 수 없는가. */
function collides(a: VocabEntry, b: VocabEntry): boolean {
  const A = new Set(keysOf(a).map(norm));
  return keysOf(b).map(norm).some((k) => A.has(k));
}

describe('말이 나온 그 짝', () => {
  it('a lot of 와 a number of 는 서로 오답이 될 수 없다', () => {
    expect(collides(byWord('a lot of'), byWord('a number of'))).toBe(true);
  });

  /* 뜻만 보던 옛 자로는 못 잡았다는 것을 함께 남긴다. 왜 자를 바꿨는지가
   * 코드에만 있으면, 다음에 누가 되돌려 놓아도 이유를 알 수 없다. */
  it('뜻만 보던 옛 자로는 못 잡혔다', () => {
    const a = new Set(meaningKeys(primaryMeaning(byWord('a lot of'))).map(norm));
    const b = meaningKeys(primaryMeaning(byWord('a number of'))).map(norm);
    expect(b.some((k) => a.has(k))).toBe(false);
  });

  /*
   * 규칙만 맞는지가 아니라 **실제로 보기를 뽑아 본다.** 정답이 a lot of 일 때
   * a number of 가 보기에 서면 안 된다. 뽑는 데 무작위가 끼어 있으므로 여러 번.
   */
  it('보기를 200번 뽑아도 둘이 같이 서지 않는다', () => {
    const answerEntry = byWord('a lot of');
    const pool = ALL_ENTRIES.filter((e) => e.level === answerEntry.level && e.id !== answerEntry.id);
    const toChoice = (e: VocabEntry) => ({
      key: e.id,
      label: e.word,
      meaning: primaryMeaning(e),
      syn: e.senses.flatMap((s) => s.synonyms),
    });
    const answer = {
      key: answerEntry.id,
      label: answerEntry.word,
      meaning: primaryMeaning(answerEntry),
      syn: [...answerEntry.senses.flatMap((s) => s.synonyms), answerEntry.word],
    };

    for (let i = 0; i < 200; i++) {
      const picked = buildChoices(answer, pool.map(toChoice), (c) => c.label, 4, Math.random, (c) =>
        expressionKeys({ word: c.label, meaning: c.meaning, synonyms: c.syn }),
      );
      expect(picked.map((c) => c.label)).not.toContain('a number of');
    }
  });
});

describe('어휘 전체에 같은 모양이 더 있는지', () => {
  /*
   * 같은 레벨 안에서만 본다. 오답 보기는 그 레벨(과 일상 문장) 안에서 뽑히므로,
   * 레벨이 다른 짝은 한 문제에 같이 설 일이 없다.
   */
  const pairs: { level: string; a: string; b: string; shared: string[] }[] = [];

  const byLevel = new Map<string, VocabEntry[]>();
  for (const e of ALL_ENTRIES) {
    const list = byLevel.get(e.level) ?? [];
    list.push(e);
    byLevel.set(e.level, list);
  }

  for (const [level, list] of byLevel) {
    for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        const A = new Set(keysOf(list[i]).map(norm));
        const shared = keysOf(list[j]).map(norm).filter((k) => A.has(k));
        if (shared.length > 0) pairs.push({ level, a: list[i].word, b: list[j].word, shared });
      }
    }
  }

  /*
   * 이 시험은 **개수를 세는 것이지 0을 요구하는 것이 아니다.** 겹치는 짝이
   * 있는 것 자체는 정상이다 — 같은 뜻의 낱말은 원래 있다. 중요한 것은 그
   * 짝들이 전부 거르개에 걸린다는 것이고, 그건 위에서 확인했다.
   *
   * 여기서 지키는 것은 다른 것이다. 나중에 누가 거르는 자를 되돌려 놓으면
   * 이 수가 뚝 떨어진다. 그때 알아차리려고 세어 둔다.
   */
  it('바꿔 쓸 수 있는 짝이 실제로 잡히고 있다', () => {
    expect(pairs.length).toBeGreaterThan(100);
  });

  /* 뜻만 보던 옛 자로는 못 잡던 짝이 실제로 얼마나 있었는지. */
  it('뜻만으로는 못 잡던 짝이 이제 잡힌다', () => {
    const onlyBySynonym = pairs.filter((p) => {
      const A = new Set(meaningKeys(primaryMeaning(byWord(p.a))).map(norm));
      return !meaningKeys(primaryMeaning(byWord(p.b))).map(norm).some((k) => A.has(k));
    });
    // 이 수가 0 이 되면 자가 뜻만 보게 되돌아갔다는 뜻이다.
    expect(onlyBySynonym.length).toBeGreaterThan(0);
  });
});
