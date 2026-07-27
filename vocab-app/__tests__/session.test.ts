import { buildSession, buildChoices, pickGame } from '../src/srs/session';
import { createCard, grade } from '../src/srs/scheduler';
import { entriesOf } from '../src/data';
import { CardState } from '../src/types';

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

    expect(session).toHaveLength(15);
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

    const reviews = session.filter((i) => i.mode === 'review');
    // reviewRatio 70% → 15 × 0.7 ≈ 11개까지 복습이 들어간다.
    expect(reviews).toHaveLength(11);
    expect(session).toHaveLength(15);
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
    expect(session.length).toBeLessThanOrEqual(15);
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

    const ids = session.map((i) => i.entry.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('pickGame', () => {
  it('처음 보는 단어는 뜻 맞히기로 시작한다', () => {
    const game = pickGame({ entry: POOL[0], card: null, mode: 'new', game: 'meaning' }, fixedRand);
    expect(game).toBe('meaning');
  });

  it('숙어에는 철자 게임을 내지 않는다', () => {
    const idiom = POOL.find((e) => e.kind === 'idiom')!;
    let card = createCard(idiom.id);
    for (let i = 0; i < 6; i++) card = grade(card, true, '2026-07-27');

    for (let r = 0; r < 20; r++) {
      const game = pickGame(
        { entry: idiom, card, mode: 'review', game: 'meaning' },
        () => r / 20,
      );
      expect(game).not.toBe('spelling');
    }
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
