import { buildSession, buildChoices, buildRounds, pickGame, SessionItem } from '../src/srs/session';
import { createCard, grade } from '../src/srs/scheduler';
import { entriesOf } from '../src/data';
import { CardState, GameId, Stage, VocabEntry } from '../src/types';

const TODAY = '2026-07-27';
const POOL = entriesOf('m1');

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
      level: 'm1',
      goal: 15,
      reviewRatio: 70,
      today: TODAY,
      rand: fixedRand,
    });

    expect(new Set(session.map((i) => i.entry.id)).size).toBe(15);
    expect(session.every((i) => i.mode === 'new')).toBe(true);
  });

  it('틀린 단어가 쌓이면 복습이 새 단어보다 먼저 자리를 차지한다', () => {
    // 20개를 전부 틀린 상태로 만든다.
    const wrongIds = POOL.slice(0, 20).map((e) => e.id);
    const cards = cardsFor(wrongIds, (c) => grade(c, false, TODAY));

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1',
      goal: 15,
      reviewRatio: 70,
      today: TODAY,
      rand: fixedRand,
    });

    const reviewWords = new Set(session.filter((i) => i.mode === 'review').map((i) => i.entry.id));
    // reviewRatio 70% → 15 × 0.7 ≈ 11개까지 복습이 들어간다.
    expect(reviewWords.size).toBe(11);
    expect(new Set(session.map((i) => i.entry.id)).size).toBe(15);
  });

  it('복습 비중을 100으로 두면 새 단어 없이 복습만 나온다', () => {
    const wrongIds = POOL.slice(0, 30).map((e) => e.id);
    const cards = cardsFor(wrongIds, (c) => grade(c, false, TODAY));

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1',
      goal: 15,
      reviewRatio: 100,
      today: TODAY,
      rand: fixedRand,
    });

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
      level: 'm1',
      goal: 15,
      reviewRatio: 70,
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
      level: 'm1',
      goal: 15,
      reviewRatio: 70,
      today: TODAY,
      rand: fixedRand,
    });

    // 새 단어도 복습 대상도 없으니 아직 안 외운 단어를 당겨온다.
    expect(new Set(session.map((i) => i.entry.id)).size).toBeLessThanOrEqual(15);
    expect(session.every((i) => i.mode === 'review')).toBe(true);
  });

  it('다른 레벨 단어는 섞이지 않는다', () => {
    const session = buildSession({
      entries: [...entriesOf('m1'), ...entriesOf('m2')],
      cards: {},
      level: 'm1',
      goal: 20,
      reviewRatio: 70,
      today: TODAY,
      rand: fixedRand,
    });

    expect(session.every((i) => i.entry.level === 'm1')).toBe(true);
  });

  it('같은 단어가 한 세션에 두 번 나오지 않는다', () => {
    const cards = cardsFor(
      POOL.slice(0, 5).map((e) => e.id),
      (c) => grade(c, false, TODAY),
    );

    const session = buildSession({
      entries: POOL,
      cards,
      level: 'm1',
      goal: 20,
      reviewRatio: 70,
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
    showIntro: false,
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

  it('처음 보는 단어는 첫 라운드에서 단어 카드를 먼저 보여준다', () => {
    const q = buildRounds(words, 3, fixedRand);
    const firstRound = q.filter((x) => x.round === 0);
    // 뜻이 여러 개여도 카드는 그 단어의 첫 문항에서만 뜬다.
    const introWords = firstRound.filter((x) => x.showIntro).map((x) => x.entry.id);
    expect(new Set(introWords).size).toBe(introWords.length);
    expect(introWords.length).toBe(20);
    // 2라운드부터는 이미 본 단어이므로 카드를 다시 띄우지 않는다.
    expect(q.filter((x) => x.round > 0).every((x) => !x.showIntro)).toBe(true);
  });

  it('복습 단어는 카드를 먼저 보여주지 않는다', () => {
    const review = POOL.slice(0, 5).map((e) => item(e, { mode: 'review' }));
    const q = buildRounds(review, 3, fixedRand);
    expect(q.every((x) => !x.showIntro)).toBe(true);
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
  it('뜻이 3개인 단어는 문항도 3개', () => {
    const multi = POOL.find((e) => e.senses.length >= 3)!;
    const session = buildSession({
      entries: [multi],
      cards: {},
      level: 'm1',
      goal: 20,
      reviewRatio: 70,
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
      level: 'm1',
      goal: 20,
      reviewRatio: 70,
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
