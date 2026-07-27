import {
  createCard,
  grade,
  isLeech,
  isMastered,
  priority,
  DEFAULT_EASE,
  MASTERED_INTERVAL,
} from '../src/srs/scheduler';

const TODAY = '2026-07-27';

describe('grade', () => {
  it('맞히면 간격이 늘고 연속 정답이 올라간다', () => {
    let card = createCard('m1-001');
    card = grade(card, true, TODAY);

    expect(card.streak).toBe(1);
    expect(card.correct).toBe(1);
    expect(card.intervalDays).toBeGreaterThanOrEqual(1);
    expect(card.due).not.toBe(TODAY);
  });

  it('맞힐수록 간격이 계속 벌어진다', () => {
    let card = createCard('m1-001');
    const intervals: number[] = [];
    for (let i = 0; i < 5; i++) {
      card = grade(card, true, TODAY);
      intervals.push(card.intervalDays);
    }
    for (let i = 1; i < intervals.length; i++) {
      expect(intervals[i]).toBeGreaterThan(intervals[i - 1]);
    }
  });

  it('틀리면 오늘로 되돌아와 세션 안에서 다시 나온다', () => {
    let card = createCard('m1-001');
    card = grade(card, true, TODAY);
    card = grade(card, true, TODAY);
    expect(card.intervalDays).toBeGreaterThan(1);

    card = grade(card, false, TODAY);

    expect(card.due).toBe(TODAY);
    expect(card.intervalDays).toBe(0);
    expect(card.streak).toBe(0);
    expect(card.lapses).toBe(1);
  });

  it('틀릴 때마다 ease가 깎여 같은 단계라도 더 자주 나온다', () => {
    let easy = createCard('a');
    let hard = createCard('b');

    for (let i = 0; i < 3; i++) hard = grade(hard, false, TODAY);
    expect(hard.ease).toBeLessThan(DEFAULT_EASE);

    // 같은 횟수만큼 맞혔을 때 어려운 단어의 간격이 더 짧아야 한다.
    for (let i = 0; i < 3; i++) {
      easy = grade(easy, true, TODAY);
      hard = grade(hard, true, TODAY);
    }
    expect(hard.intervalDays).toBeLessThanOrEqual(easy.intervalDays);
  });

  it('ease는 하한선 아래로 내려가지 않는다', () => {
    let card = createCard('m1-001');
    for (let i = 0; i < 50; i++) card = grade(card, false, TODAY);
    expect(card.ease).toBeGreaterThanOrEqual(1.3);
  });

  it('원본 카드를 바꾸지 않는다', () => {
    const card = createCard('m1-001');
    const before = { ...card };
    grade(card, true, TODAY);
    expect(card).toEqual(before);
  });
});

describe('isMastered', () => {
  it('간격이 기준일 이상이어야 암기 완료로 본다', () => {
    let card = createCard('m1-001');
    expect(isMastered(card)).toBe(false);

    while (card.intervalDays < MASTERED_INTERVAL) {
      card = grade(card, true, TODAY);
    }
    expect(isMastered(card)).toBe(true);
  });
});

describe('priority', () => {
  it('많이 틀린 단어가 먼저 나온다', () => {
    let often = createCard('a');
    for (let i = 0; i < 4; i++) often = grade(often, false, TODAY);

    const fresh = createCard('b');

    expect(priority(often, TODAY)).toBeGreaterThan(priority(fresh, TODAY));
  });

  it('예정일이 오래 지난 단어일수록 먼저 나온다', () => {
    const old = { ...createCard('a'), due: '2026-07-01' };
    const recent = { ...createCard('b'), due: '2026-07-26' };

    expect(priority(old, TODAY)).toBeGreaterThan(priority(recent, TODAY));
  });

  it('이미 외운 단어는 뒤로 밀린다', () => {
    let mastered = createCard('a');
    while (!isMastered(mastered)) mastered = grade(mastered, true, TODAY);

    const normal = createCard('b');
    expect(priority(mastered, TODAY)).toBeLessThan(priority(normal, TODAY));
  });
});

describe('isLeech', () => {
  it('반복해서 틀리면 골칫덩이로 표시된다', () => {
    let card = createCard('m1-001');
    expect(isLeech(card)).toBe(false);
    for (let i = 0; i < 4; i++) card = grade(card, false, TODAY);
    expect(isLeech(card)).toBe(true);
  });
});
