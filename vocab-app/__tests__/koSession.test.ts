import {
  buildKoRounds,
  buildKoSession,
  pickKoGame,
  plannedKoCount,
  splitByCategory,
} from '../src/srs/koSession';
import { koCloze, koExample, wordForms } from '../src/data/korean/entry';
import { KO_ENTRIES } from '../src/data/korean/levels';
import { CardState, KoCategory, KoEntry } from '../src/types';

function entry(over: Partial<KoEntry> = {}): KoEntry {
  return {
    id: `ko-${over.word ?? '보기'}`,
    level: 'm1-1',
    category: 'csat',
    word: '보기',
    hanja: '',
    hanjaVerified: false,
    field: '',
    meaning: '뜻',
    examples: [{ text: '보기를 들어 설명한다.' }],
    ...over,
  };
}

function card(over: Partial<CardState> = {}): CardState {
  return {
    entryId: 'x',
    ease: 2.5,
    intervalIndex: 0,
    due: '2026-01-01',
    streak: 0,
    correct: 0,
    wrong: 0,
    lapses: 0,
    lastSeen: '2026-01-01',
    ...over,
  } as CardState;
}

/* ------------------------------------------------------------------ */

describe('wordForms', () => {
  it('용언은 어간까지 본다', () => {
    expect(wordForms('어엿브다')).toContain('어엿브');
  });

  it("'-하다'는 어근까지 본다", () => {
    expect(wordForms('성찰하다')).toContain('성찰');
  });

  it('한 글자 어간은 만들지 않는다 — 아무 데나 걸린다', () => {
    // '괴다'의 어간 '괴'로 찾으면 엉뚱한 자리가 잡힌다.
    expect(wordForms('괴다')).toEqual(['괴다']);
  });
});

describe('koCloze', () => {
  it('조사는 남기고 낱말만 지운다', () => {
    const got = koCloze('가담항설에 휘둘리지 않아야 한다.', '가담항설');
    expect(got).not.toBeNull();
    expect(got!.text).toBe('○○○○에 휘둘리지 않아야 한다.');
    expect(got!.answer).toBe('가담항설');
  });

  it('빈칸을 글자 수만큼 늘린다', () => {
    const got = koCloze('규범을 따르다.', '규범');
    expect(got!.text).toBe('○○을 따르다.');
  });

  it('예문에 표제어가 없으면 못 만든다', () => {
    expect(koCloze('전혀 다른 문장이다.', '기회비용')).toBeNull();
  });

  it('활용형도 잡는다', () => {
    const got = koCloze('언행이 미쁘다.', '미쁘다');
    expect(got).not.toBeNull();
  });
});

describe('koExample', () => {
  it('만난 횟수만큼 예문이 넘어간다', () => {
    const e = entry({ examples: [{ text: '첫째' }, { text: '둘째' }] });
    expect(koExample(e, 0)!.text).toBe('첫째');
    expect(koExample(e, 1)!.text).toBe('둘째');
    expect(koExample(e, 2)!.text).toBe('첫째');
  });

  it('예문이 없으면 null', () => {
    expect(koExample(entry({ examples: [] }), 0)).toBeNull();
  });
});

/* ------------------------------------------------------------------ */

describe('splitByCategory', () => {
  it('6개를 갈래별로 나눈다', () => {
    const got = splitByCategory(6, () => 0.9);
    const total = Object.values(got).reduce((a, b) => a + b, 0);
    expect(total).toBe(6);
    // 수능이 가장 많아야 한다 — 어휘 수가 압도적이다.
    expect(got.csat).toBeGreaterThanOrEqual(3);
  });

  it('몇 개를 넣어도 합이 맞는다', () => {
    for (const n of [1, 3, 6, 10, 20]) {
      const got = splitByCategory(n, () => 0.9);
      expect(Object.values(got).reduce((a, b) => a + b, 0)).toBe(n);
    }
  });

  it('0을 넣으면 다 0', () => {
    expect(splitByCategory(0, () => 0.9)).toEqual({ idiom: 0, concept: 0, classic: 0, csat: 0 });
  });
});

describe('buildKoSession', () => {
  const cats: KoCategory[] = ['idiom', 'concept', 'classic', 'csat'];
  const entries = cats.flatMap((category) =>
    Array.from({ length: 10 }, (_, i) =>
      entry({ category, word: `${category}${i}`, examples: [{ text: `${category}${i}을 쓴다.` }] }),
    ),
  );

  it('하루치만큼 뽑는다', () => {
    const got = buildKoSession({ entries, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    expect(new Set(got.map((i) => i.entry.id)).size).toBe(6);
  });

  it('갈래를 섞는다 — 한 갈래로 쏠리지 않는다', () => {
    const got = buildKoSession({ entries, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    expect(new Set(got.map((i) => i.entry.category)).size).toBeGreaterThanOrEqual(3);
  });

  it('복습할 것을 새 어휘보다 먼저 넣는다', () => {
    const due = entries[0];
    const cards = { [due.id]: card({ entryId: due.id, due: '2020-01-01' }) };
    const got = buildKoSession({
      entries,
      cards,
      level: 'm1-1',
      newPerDay: 6,
      reviewPerDay: 3,
      today: '2026-06-01',
    });
    const found = got.find((i) => i.entry.id === due.id);
    expect(found?.mode).toBe('review');
  });

  it('다른 레벨은 안 건드린다', () => {
    const mixed = [...entries, entry({ level: 'h3-4', word: '딴레벨' })];
    const got = buildKoSession({ entries: mixed, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    expect(got.every((i) => i.entry.level === 'm1-1')).toBe(true);
  });

  it('한 갈래가 동나면 다른 갈래로 채운다', () => {
    // 고전이 하나뿐이라도 하루 6개는 채워야 한다.
    const thin = [
      ...Array.from({ length: 20 }, (_, i) => entry({ category: 'csat', word: `수능${i}` })),
      entry({ category: 'classic', word: '괴다' }),
    ];
    const got = buildKoSession({ entries: thin, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    expect(new Set(got.map((i) => i.entry.id)).size).toBe(6);
  });

  it('plannedKoCount 가 실제로 뽑힌 수와 같다', () => {
    const args = { entries, cards: {}, level: 'm1-1' as const, newPerDay: 6, reviewPerDay: 0, rand: () => 0.5 };
    expect(plannedKoCount(args)).toBe(new Set(buildKoSession(args).map((i) => i.entry.id)).size);
  });
});

describe('buildKoRounds', () => {
  const entries = Array.from({ length: 6 }, (_, i) =>
    entry({ word: `낱말${i}`, examples: [{ text: `낱말${i}을 쓴다.` }] }),
  );

  it('라운드 수만큼 늘어난다', () => {
    const items = buildKoSession({ entries, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    expect(buildKoRounds(items, 3, entries)).toHaveLength(items.length * 3);
  });

  it('처음 만나는 어휘는 첫 라운드에 한 번만 표시된다', () => {
    const items = buildKoSession({ entries, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    const rounds = buildKoRounds(items, 3, entries);
    const firsts = rounds.filter((i) => i.firstMeeting);
    expect(firsts).toHaveLength(6);
    expect(firsts.every((i) => i.round === 0)).toBe(true);
  });

  it('라운드가 올라가면 예문이 넘어간다', () => {
    const items = buildKoSession({ entries, cards: {}, level: 'm1-1', newPerDay: 1, reviewPerDay: 0 });
    const rounds = buildKoRounds(items, 3, entries);
    const one = rounds.filter((i) => i.entry.id === items[0].entry.id);
    expect(one.map((i) => i.exposureIndex)).toEqual([0, 1, 2]);
  });

  it('처음 만난 어휘는 어려운 유형으로 안 간다', () => {
    // 연속 정답이 0이면 '익히기'에서 멈춘다.
    const items = buildKoSession({ entries, cards: {}, level: 'm1-1', newPerDay: 6, reviewPerDay: 0 });
    const rounds = buildKoRounds(items, 3, entries);
    expect(rounds.every((i) => i.stage === 'learn')).toBe(true);
  });
});

describe('pickKoGame', () => {
  const idioms = KO_ENTRIES.filter((e) => e.category === 'idiom' && e.level === 'm1-1');

  it('사자성어는 한자 문제가 나올 수 있다', () => {
    const target = idioms.find((e) => e.hanjaVerified)!;
    const games = new Set<string>();
    for (let i = 0; i < 60; i++) {
      games.add(
        pickKoGame(
          { entry: target, card: null, mode: 'new', game: 'cloze', stage: 'apply', round: 1, exposureIndex: 0, firstMeeting: false },
          idioms,
          () => i / 60,
        ),
      );
    }
    expect(games.has('hanja')).toBe(true);
  });

  /*
   * **지어낸 성어로 시험한다.**
   *
   * 예전에는 실제 데이터에서 확인 못 한 것을 골라 썼는데, 사자성어 한자를
   * 전부 사전에서 확인하면서 그런 것이 하나도 안 남았고 이 시험이 터졌다.
   *
   * 지키려는 것은 데이터가 아니라 **규칙**이다 — 확인 못 한 한자로는 문제를
   * 안 낸다. 새 성어를 더하다 확인 못 한 것이 다시 생길 수 있고, 그때 이
   * 규칙이 살아 있어야 한다. 데이터가 좋아졌다고 규칙을 지키는 자가 없어지면
   * 안 된다.
   */
  it('한자를 확인 못 한 성어에는 한자 문제를 안 낸다', () => {
    const sure = KO_ENTRIES.find(
      (e) => e.category === 'idiom' && e.hanjaVerified && [...e.hanja].length === 4,
    )!;
    const unsure = { ...sure, id: 'ko-확인못함', hanjaVerified: false };
    const pool = KO_ENTRIES.filter((e) => e.category === 'idiom');
    for (let i = 0; i < 40; i++) {
      const g = pickKoGame(
        { entry: unsure, card: null, mode: 'new', game: 'cloze', stage: 'apply', round: 1, exposureIndex: 0, firstMeeting: false },
        pool,
        () => i / 40,
      );
      expect(g).not.toBe('hanja');
    }
  });

  it('빈칸을 못 뚫는 예문에는 빈칸 문제를 안 낸다', () => {
    const e = entry({ word: '기회비용', examples: [{ text: '전혀 다른 문장이다.' }] });
    for (let i = 0; i < 20; i++) {
      const g = pickKoGame(
        { entry: e, card: null, mode: 'new', game: 'cloze', stage: 'learn', round: 0, exposureIndex: 0, firstMeeting: false },
        [e],
        () => i / 20,
      );
      expect(['cloze', 'clozeType']).not.toContain(g);
    }
  });
});

describe('실제 데이터로 세션을 만든다', () => {
  it('레벨마다 하루치를 만들 수 있다', () => {
    for (const level of ['m1-1', 'm2-3', 'h1-1', 'h3-4'] as const) {
      const items = buildKoSession({
        entries: KO_ENTRIES,
        cards: {},
        level,
        newPerDay: 6,
        reviewPerDay: 4,
        rand: () => 0.5,
      });
      expect(new Set(items.map((i) => i.entry.id)).size).toBe(6);

      const rounds = buildKoRounds(items, 3, KO_ENTRIES, () => 0.5);
      expect(rounds).toHaveLength(items.length * 3);
      // 모든 문항에 낼 수 있는 유형이 붙어야 한다.
      expect(rounds.every((i) => i.game.length > 0)).toBe(true);
    }
  });

  it('모든 어휘에 예문이 하나씩은 있다', () => {
    expect(KO_ENTRIES.every((e) => e.examples.length > 0)).toBe(true);
  });

  it('id가 겹치지 않는다 — 겹치면 학습 기록이 섞인다', () => {
    expect(new Set(KO_ENTRIES.map((e) => e.id)).size).toBe(KO_ENTRIES.length);
  });

  it('영어 id와 섞이지 않는다', () => {
    expect(KO_ENTRIES.every((e) => e.id.startsWith('ko-'))).toBe(true);
  });
});
