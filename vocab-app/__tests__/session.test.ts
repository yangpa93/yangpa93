import {
  buildSession,
  buildChoices,
  buildRounds,
  meaningKeys,
  pickGame,
  SessionItem,
} from '../src/srs/session';
import { createCard, grade } from '../src/srs/scheduler';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { CardState, GameId, Stage, VocabEntry } from '../src/types';
import { senseExposure } from '../src/data/entry';
import { hasAntonym } from '../src/data/antonyms';

const TODAY = '2026-07-27';
const POOL = entriesOf('m1-1');

/** 테스트에서 난수를 고정한다. */
const fixedRand = () => 0.5;

function cardsFor(ids: string[], mutate: (c: CardState) => CardState): Record<string, CardState> {
  const out: Record<string, CardState> = {};
  for (const id of ids) out[id] = mutate(createCard(id));
  return out;
}

describe('buildSession', () => {
  it('처음 시작하면 새 단어로만 채운다', () => {
    const session = buildSession({
      entries: POOL,
      cards: {},
      level: 'm1-1',
      newPerDay: 15,
      reviewPerDay: 10,
      today: TODAY,
      rand: fixedRand,
    });

    expect(new Set(session.map((i) => i.entry.id)).size).toBe(15);
    expect(session.every((i) => i.mode === 'new')).toBe(true);
  });

  it('복습은 상한까지만 들어가고, 새 단어는 그 위에 얹힌다', () => {
    // 20개를 전부 틀린 상태로 만든다.
    const wrongIds = POOL.slice(0, 20).map((e) => e.id);
    const cards = cardsFor(wrongIds, (c) => grade(c, false, TODAY));

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1-1',
      newPerDay: 15,
      reviewPerDay: 10,
      today: TODAY,
      rand: fixedRand,
    });

    const reviewWords = new Set(session.filter((i) => i.mode === 'review').map((i) => i.entry.id));
    const newWords = new Set(session.filter((i) => i.mode === 'new').map((i) => i.entry.id));

    // 복습은 상한(10)까지, 새 단어는 정해진 개수(15)만큼.
    // 복습이 밀렸다고 새 단어가 줄지 않는다 — 진도가 멈추면 안 되기 때문.
    expect(reviewWords.size).toBe(10);
    expect(newWords.size).toBe(15);
  });

  it('새 단어를 0으로 두면 복습만 나온다', () => {
    // 진도를 잠시 멈추고 밀린 것만 정리하고 싶을 때.
    const wrongIds = POOL.slice(0, 30).map((e) => e.id);
    const cards = cardsFor(wrongIds, (c) => grade(c, false, TODAY));

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1-1',
      newPerDay: 0,
      reviewPerDay: 15,
      today: TODAY,
      rand: fixedRand,
    });

    expect(session.length).toBeGreaterThan(0);
    expect(session.every((i) => i.mode === 'review')).toBe(true);
  });

  it('많이 틀린 단어를 앞쪽에 배치한다', () => {
    const cards: Record<string, CardState> = {};
    // 첫 단어는 4번 틀리고, 나머지는 한 번씩만 틀린다.
    let worst = createCard(POOL[0].id);
    for (let i = 0; i < 4; i++) worst = grade(worst, false, TODAY);
    cards[POOL[0].id] = worst;

    for (const e of POOL.slice(1, 10)) {
      cards[e.id] = grade(createCard(e.id), false, TODAY);
    }

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1-1',
      newPerDay: 15,
      reviewPerDay: 10,
      today: TODAY,
      rand: fixedRand,
    });

    expect(session[0].entry.id).toBe(POOL[0].id);
  });

  it('아직 복습할 때가 아닌 단어는 세션에 넣지 않는다', () => {
    // 전부 정답 처리해서 예정일을 미래로 밀어 둔다.
    const cards = cardsFor(
      POOL.map((e) => e.id),
      (c) => grade(c, true, TODAY),
    );

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1-1',
      newPerDay: 15,
      reviewPerDay: 10,
      today: TODAY,
      rand: fixedRand,
    });

    // 새 단어도 복습 대상도 없으니 아직 안 외운 단어를 당겨온다.
    // 하루치(새 15 + 복습 10)를 넘기지는 않는다.
    expect(new Set(session.map((i) => i.entry.id)).size).toBeLessThanOrEqual(25);
    expect(session.every((i) => i.mode === 'review')).toBe(true);
  });

  it('다른 레벨 단어는 섞이지 않는다', () => {
    const session = buildSession({
      entries: [...entriesOf('m1-1'), ...entriesOf('m2-1')],
      cards: {},
      level: 'm1-1',
      newPerDay: 20,
      reviewPerDay: 14,
      today: TODAY,
      rand: fixedRand,
    });

    expect(session.every((i) => i.entry.level === 'm1-1')).toBe(true);
  });

  it('같은 단어가 한 세션에 두 번 나오지 않는다', () => {
    const cards = cardsFor(
      POOL.slice(0, 5).map((e) => e.id),
      (c) => grade(c, false, TODAY),
    );

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1-1',
      newPerDay: 20,
      reviewPerDay: 14,
      today: TODAY,
      rand: fixedRand,
    });

    // 같은 단어라도 뜻이 다르면 문항이 따로 생긴다. (단어,뜻) 짝이 유일해야 한다.
    const keys = session.map((i) => `${i.entry.id}#${i.senseIndex}`);
    expect(new Set(keys).size).toBe(keys.length);
  });
});

function item(entry: VocabEntry, over: Partial<SessionItem> = {}): SessionItem {
  return {
    entry,
    card: null,
    senseIndex: 0,
    mode: 'new',
    game: 'cloze',
    stage: 'learn',
    round: 0,
    exposureIndex: 0,
    firstMeeting: false,
    ...over,
  };
}

describe('buildRounds', () => {
  // 뜻이 하나인 단어만 골라 문항 수를 단어 수와 같게 맞춘다.
  const words = POOL.filter((e) => e.senses.length === 1).slice(0, 20).map((e) => item(e));

  it('단어 수 × 라운드 수만큼 문제를 만든다', () => {
    const q = buildRounds(words, 3, fixedRand);
    expect(q).toHaveLength(60);
  });

  it('라운드마다 익히기 → 활용하기 → 떠올리기 순으로 올라간다', () => {
    const q = buildRounds(words, 3, fixedRand);
    const stages: Stage[] = [];
    for (let r = 0; r < 3; r++) {
      const round = q.filter((x) => x.round === r);
      expect(new Set(round.map((x) => x.stage)).size).toBe(1);
      stages.push(round[0].stage);
    }
    expect(stages).toEqual(['learn', 'apply', 'recall']);
  });

  it('모든 단어가 매 라운드에 한 번씩 나온다', () => {
    const q = buildRounds(words, 3, fixedRand);
    for (let r = 0; r < 3; r++) {
      const ids = q.filter((x) => x.round === r).map((x) => x.entry.id);
      expect(new Set(ids).size).toBe(20);
    }
  });

  it('한 단어를 연달아 묻지 않는다', () => {
    // 바로 다시 물으면 단기 기억에 남아 있어서 시험이 되지 않는다.
    const q = buildRounds(words, 3, () => 0.37);
    let backToBack = 0;
    for (let i = 1; i < q.length; i++) {
      if (q[i].entry.id === q[i - 1].entry.id) backToBack++;
    }
    expect(backToBack).toBe(0);
  });

  it("새 단어는 첫 라운드의 첫 문항에만 '처음 만남' 표시가 붙는다", () => {
    const q = buildRounds(words, 3, fixedRand);
    const firstRound = q.filter((x) => x.round === 0);
    // 뜻이 여러 개여도 표시는 그 단어의 첫 문항 하나에만 붙는다.
    const marked = firstRound.filter((x) => x.firstMeeting).map((x) => x.entry.id);
    expect(new Set(marked).size).toBe(marked.length);
    expect(marked.length).toBe(20);
    // 2라운드부터는 이미 만난 단어다.
    expect(q.filter((x) => x.round > 0).every((x) => !x.firstMeeting)).toBe(true);
  });

  it('복습 단어에는 처음 만남 표시가 붙지 않는다', () => {
    const review = POOL.slice(0, 5).map((e) => item(e, { mode: 'review' }));
    const q = buildRounds(review, 3, fixedRand);
    expect(q.every((x) => !x.firstMeeting)).toBe(true);
  });

  it('라운드가 3을 넘으면 마지막 단계를 반복한다', () => {
    const q = buildRounds(words, 4, fixedRand);
    expect(q.filter((x) => x.round === 3).every((x) => x.stage === 'recall')).toBe(true);
  });

  it('20단어 3라운드는 대략 10분 분량이다', () => {
    // 한 문제에 10초로 잡는다.
    const q = buildRounds(words, 3, fixedRand);
    const minutes = (q.length * 10) / 60;
    expect(minutes).toBeGreaterThanOrEqual(9);
    expect(minutes).toBeLessThanOrEqual(11);
  });
});

describe('pickGame', () => {
  /** 난수를 훑어서 그 문항에 나올 수 있는 유형을 전부 모은다. */
  function possibleGames(it: SessionItem): Set<GameId> {
    const out = new Set<GameId>();
    for (let i = 0; i < 40; i++) out.add(pickGame(it, () => i / 40));
    return out;
  }

  it('모든 유형이 문장을 지문으로 쓴다', () => {
    // 단어와 뜻만 짝지어 묻는 유형은 없어야 한다.
    const sentenceBased: GameId[] = [
      'cloze',
      'clozeType',
      'listening',
      'context',
      'polysemy',
      'synonym',
      'antonym',
    ];
    for (const entry of POOL) {
      for (const stage of ['learn', 'apply', 'recall'] as Stage[]) {
        for (const g of possibleGames(item(entry, { stage, mode: 'review' }))) {
          expect(sentenceBased).toContain(g);
        }
      }
    }
  });

  it('마지막 단계는 직접 쓰게 한다', () => {
    const e = POOL.find((x) => x.senses.length === 1)!;
    const games = possibleGames(item(e, { stage: 'recall', mode: 'review' }));
    expect(games.has('clozeType')).toBe(true);
  });

  it('뜻이 하나뿐인 단어에는 다의어 구별 문제를 내지 않는다', () => {
    const single = POOL.find((e) => e.senses.length === 1)!;
    for (const stage of ['learn', 'apply', 'recall'] as Stage[]) {
      expect(possibleGames(item(single, { stage, mode: 'review' })).has('polysemy')).toBe(false);
    }
  });

  it('다의어에는 다의어 구별 문제가 나온다', () => {
    const multi = POOL.find((e) => e.senses.length >= 2)!;
    const games = possibleGames(item(multi, { stage: 'apply', mode: 'review', senseIndex: 0 }));
    expect(games.has('polysemy')).toBe(true);
  });

  it('어떤 단어·단계에서도 반드시 유형이 정해진다', () => {
    for (const entry of POOL) {
      for (let si = 0; si < entry.senses.length; si++) {
        for (const stage of ['learn', 'apply', 'recall'] as Stage[]) {
          const g = pickGame(item(entry, { stage, senseIndex: si }), fixedRand);
          expect(typeof g).toBe('string');
          expect(g.length).toBeGreaterThan(0);
        }
      }
    }
  });
});

describe('다의어는 뜻마다 문항이 생긴다', () => {
  it('뜻이 여러 개인 단어는 뜻 수만큼 문항이 생긴다', () => {
    const multi = ALL_ENTRIES.find((e) => e.senses.length >= 3)!;
    const session = buildSession({
      entries: [multi],
      cards: {},
      level: multi.level,
      newPerDay: 20,
      reviewPerDay: 14,
      today: TODAY,
      rand: fixedRand,
    });

    expect(session).toHaveLength(multi.senses.length);
    // 뜻 번호가 겹치지 않는다.
    expect(new Set(session.map((i) => i.senseIndex)).size).toBe(multi.senses.length);
  });

  it('목표 단어 수만큼 단어를 고르되, 다의어는 문항이 늘어난다', () => {
    const session = buildSession({
      entries: POOL,
      cards: {},
      level: 'm1-1',
      newPerDay: 20,
      reviewPerDay: 14,
      today: TODAY,
      rand: fixedRand,
    });

    const words = new Set(session.map((i) => i.entry.id));
    expect(words.size).toBe(20);
    // 중1에는 다의어가 있으므로 문항 수가 단어 수보다 많다.
    expect(session.length).toBeGreaterThan(20);
  });
});

describe('buildChoices', () => {
  it('정답을 항상 포함하고 4개를 만든다', () => {
    const answer = { key: 'x', label: '정답' };
    const pool = Array.from({ length: 10 }, (_, i) => ({ key: `p${i}`, label: `보기${i}` }));

    const choices = buildChoices(answer, pool, (c) => c.label, 4, fixedRand);

    expect(choices).toHaveLength(4);
    expect(choices.some((c) => c.key === 'x')).toBe(true);
  });

  it('정답과 같은 라벨을 가진 오답은 넣지 않는다', () => {
    const answer = { key: 'x', label: '같은뜻' };
    const pool = [
      { key: 'a', label: '같은뜻' },
      { key: 'b', label: '다른뜻1' },
      { key: 'c', label: '다른뜻2' },
      { key: 'd', label: '다른뜻3' },
    ];

    const choices = buildChoices(answer, pool, (c) => c.label, 4, fixedRand);

    const labels = choices.map((c) => c.label);
    expect(labels.filter((l) => l === '같은뜻')).toHaveLength(1);
  });
});

describe('예문 회전 — 라운드마다 다른 문장', () => {
  it('라운드가 올라가면 예문 인덱스가 1씩만 올라간다', () => {
    // 예전에는 화면이 '카드 누적 노출 + 라운드'로 그때그때 계산했다.
    // 카드는 문제를 풀 때마다 갱신되므로 인덱스가 2씩 뛰었고, 뜻마다
    // 예문이 2개인 다의어는 세 라운드 내내 같은 문장이 나왔다.
    const one = POOL.filter((e) => e.senses.length === 1).slice(0, 3).map((e) => item(e));
    const q = buildRounds(one, 3, fixedRand);

    for (const entry of one.map((i) => i.entry)) {
      const mine = q.filter((i) => i.entry.id === entry.id).sort((a, b) => a.round - b.round);
      expect(mine.map((i) => i.exposureIndex)).toEqual([0, 1, 2]);
    }
  });

  it('예문이 2개인 뜻도 라운드마다 문장이 번갈아 나온다', () => {
    const twoEx = ALL_ENTRIES.find((e) => e.senses.some((s) => s.examples.length === 2))!;
    const senseIndex = twoEx.senses.findIndex((s) => s.examples.length === 2);
    const q = buildRounds([item(twoEx, { senseIndex })], 3, fixedRand);

    const sentences = q
      .sort((a, b) => a.round - b.round)
      .map((i) => senseExposure(i.entry, i.senseIndex, i.exposureIndex).example.en);

    // 2개뿐이라 세 번째에 첫 문장으로 돌아오지만, 연달아 같은 문장은 안 나온다.
    expect(sentences[0]).not.toBe(sentences[1]);
    expect(sentences[1]).not.toBe(sentences[2]);
  });

  it('다의어는 뜻마다 자기 예문을 돈다', () => {
    const multi = ALL_ENTRIES.find(
      (e) => e.senses.length >= 2 && e.senses.every((s) => s.examples.length >= 2),
    )!;
    const items = multi.senses.map((_, senseIndex) => item(multi, { senseIndex }));
    const q = buildRounds(items, 2, fixedRand);

    // (뜻, 라운드) 짝마다 문장이 하나씩 나오고, 한 라운드 안에서 뜻이
    // 다르면 문장도 달라야 한다. 같으면 뜻 구별 문제가 성립하지 않는다.
    for (const round of [0, 1]) {
      const inRound = q.filter((i) => i.round === round);
      const sentences = inRound.map(
        (i) => senseExposure(i.entry, i.senseIndex, i.exposureIndex).example.en,
      );
      expect(new Set(sentences).size).toBe(sentences.length);
    }
  });

  it('어제까지 본 횟수만큼 밀어서 시작한다', () => {
    // 오늘도 어제와 같은 문장에서 시작하면 복습이 아니라 암송이 된다.
    const target = POOL.filter((e) => e.senses.length === 1)[0];
    let card = createCard(target.id);
    card = { ...card, correct: 3, wrong: 1 };

    const session = buildSession({
      entries: [target],
      cards: { [target.id]: card },
      level: 'm1-1',
      newPerDay: 0,
      reviewPerDay: 5,
      today: TODAY,
      rand: fixedRand,
    });

    expect(session[0].exposureIndex).toBe(4);
  });
});

describe('반대말 문제', () => {
  it('반대말이 있는 단어는 활용·떠올리기 단계에서 반대말 문제가 나올 수 있다', () => {
    const withAnt = POOL.find((e) => hasAntonym(e.word) && e.senses.length === 1)!;
    const games = new Set<GameId>();
    // 유형은 후보 중에서 무작위로 고르므로 여러 번 돌려 본다.
    for (let i = 0; i < 200; i++) {
      const r = () => i / 200;
      games.add(pickGame(item(withAnt, { stage: 'apply' }), r));
      games.add(pickGame(item(withAnt, { stage: 'recall' }), r));
    }
    expect(games.has('antonym')).toBe(true);
  });

  it('익히기 단계에서는 반대말 문제를 내지 않는다', () => {
    const withAnt = POOL.find((e) => hasAntonym(e.word))!;
    for (let i = 0; i < 200; i++) {
      const g = pickGame(item(withAnt, { stage: 'learn' }), () => i / 200);
      expect(g).not.toBe('antonym');
    }
  });

  it('반대말이 없는 단어에는 반대말 문제를 내지 않는다', () => {
    const noAnt = POOL.find((e) => !hasAntonym(e.word))!;
    for (let i = 0; i < 200; i++) {
      for (const stage of ['learn', 'apply', 'recall'] as Stage[]) {
        expect(pickGame(item(noAnt, { stage }), () => i / 200)).not.toBe('antonym');
      }
    }
  });

  it('다의어는 대표 뜻일 때만 반대말을 묻는다', () => {
    // 'save(저축하다)'를 놓고 'spend'의 반대라고 하면 뜻이 어긋난다.
    const multi = ALL_ENTRIES.find((e) => e.senses.length >= 2 && hasAntonym(e.word));
    if (!multi) return;
    for (let i = 0; i < 200; i++) {
      for (const stage of ['apply', 'recall'] as Stage[]) {
        expect(pickGame(item(multi, { stage, senseIndex: 1 }), () => i / 200)).not.toBe('antonym');
      }
    }
  });
});

describe('보기에 정답이 둘이 되지 않게', () => {
  // 검사에서 실제로 나온 것들: 같은 레벨 안에 뜻이 겹치는 단어가 89쌍,
  // 대표 동의어가 같은 단어가 73쌍 있었다. 글자가 똑같은 것만 걸러서는
  // 이것들이 나란히 보기에 올라온다. 아이는 맞게 이해하고도 틀렸다는
  // 말을 듣고, 앱은 그 단어를 '모르는 단어'로 기록해 계속 다시 낸다.

  it('뜻이 한 조각이라도 겹치면 보기에 함께 올리지 않는다', () => {
    const answer = { key: 'a', label: '목표' };
    const pool = [
      { key: 'b', label: '목표, 목적' }, // 겹친다 — 빠져야 한다
      { key: 'c', label: '기술, 능력' },
      { key: 'd', label: '냄비, 항아리' },
      { key: 'e', label: '항구' },
    ];
    const picked = buildChoices(answer, pool, (c) => c.label, 4, fixedRand, (c) =>
      meaningKeys(c.label),
    );
    expect(picked.map((c) => c.key)).not.toContain('b');
    expect(picked).toHaveLength(4);
  });

  it('글자가 똑같은 뜻도 여전히 걸러진다', () => {
    const answer = { key: 'a', label: '분명한, 명백한' };
    const pool = [
      { key: 'b', label: '분명한, 명백한' },
      { key: 'c', label: '기술' },
      { key: 'd', label: '항구' },
      { key: 'e', label: '냄비' },
    ];
    const picked = buildChoices(answer, pool, (c) => c.label, 4, fixedRand, (c) =>
      meaningKeys(c.label),
    );
    expect(picked.map((c) => c.key)).not.toContain('b');
  });

  it('오답끼리도 뜻이 겹치지 않는다', () => {
    // 오답 둘이 같은 뜻이면 보기가 사실상 셋이 되어 찍기 쉬워진다.
    const answer = { key: 'a', label: '항구' };
    const pool = [
      { key: 'b', label: '기술, 능력' },
      { key: 'c', label: '기법, 기술' }, // b와 겹친다
      { key: 'd', label: '냄비' },
      { key: 'e', label: '무대' },
    ];
    const picked = buildChoices(answer, pool, (c) => c.label, 4, fixedRand, (c) =>
      meaningKeys(c.label),
    );
    const labels = picked.map((c) => c.label);
    expect(labels).not.toEqual(expect.arrayContaining(['기술, 능력', '기법, 기술']));
  });

  it('물결표와 대소문자 차이는 같은 뜻으로 본다', () => {
    const answer = { key: 'a', label: '~해야 한다' };
    const pool = [
      { key: 'b', label: '해야 한다' },
      { key: 'c', label: '항구' },
      { key: 'd', label: '냄비' },
      { key: 'e', label: '무대' },
    ];
    const picked = buildChoices(answer, pool, (c) => c.label, 4, fixedRand, (c) =>
      meaningKeys(c.label),
    );
    expect(picked.map((c) => c.key)).not.toContain('b');
  });

  it('키를 안 넘기면 예전처럼 보기 글자로만 거른다', () => {
    const answer = { key: 'a', label: '목표' };
    const pool = [
      { key: 'b', label: '목표, 목적' },
      { key: 'c', label: '기술' },
      { key: 'd', label: '항구' },
    ];
    const picked = buildChoices(answer, pool, (c) => c.label, 4, fixedRand);
    expect(picked.map((c) => c.key)).toContain('b');
  });
});

describe('meaningKeys', () => {
  it('쉼표와 가운뎃점으로 뜻을 쪼갠다', () => {
    expect(meaningKeys('기술, 능력')).toEqual(['기술, 능력', '기술', '능력']);
  });

  it('쪼갤 것이 없으면 통째로 하나다', () => {
    expect(meaningKeys('항구')).toEqual(['항구']);
  });

  it('같은 조각이 두 번 나와도 한 번만 센다', () => {
    expect(meaningKeys('기술, 기술')).toEqual(['기술, 기술', '기술']);
  });
});
