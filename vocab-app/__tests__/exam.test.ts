import { buildExam, canTakeExam, examWeakWords, nextRetryRound } from '../src/srs/exam';
import { createCard, grade } from '../src/srs/scheduler';
import { entriesOf } from '../src/data';
import { CardState, GameId } from '../src/types';

const TODAY = '2026-07-27';
const POOL = entriesOf('m1-1');
const fixedRand = () => 0.5;

/** 그 레벨 단어들을 '완전 암기' 상태로 만든다. */
function masteredCards(count: number): Record<string, CardState> {
  const cards: Record<string, CardState> = {};
  for (const e of POOL.slice(0, count)) {
    let c = createCard(e.id);
    while (c.intervalDays < 21) c = grade(c, true, TODAY);
    cards[e.id] = c;
  }
  return cards;
}

describe('buildExam', () => {
  const exam = buildExam(POOL, 'm1-1', fixedRand);

  it('그 레벨 단어를 하나도 빠뜨리지 않는다', () => {
    const covered = new Set(exam.map((it) => it.entry.id));
    expect(covered.size).toBe(POOL.length);
  });

  it('다의어는 뜻마다 한 문항씩 낸다', () => {
    const expected = POOL.reduce((n, e) => n + e.senses.length, 0);
    expect(exam).toHaveLength(expected);

    const multi = POOL.find((e) => e.senses.length >= 2)!;
    const its = exam.filter((it) => it.entry.id === multi.id);
    expect(its).toHaveLength(multi.senses.length);
    expect(new Set(its.map((it) => it.senseIndex)).size).toBe(multi.senses.length);
  });

  it('문항 수가 단어 수보다 많다 (다의어 때문에)', () => {
    expect(exam.length).toBeGreaterThan(POOL.length);
  });

  it('모든 문항이 문장을 지문으로 쓴다', () => {
    const allowed: GameId[] = ['cloze', 'context', 'polysemy'];
    for (const it of exam) expect(allowed).toContain(it.game);
  });

  it('빈칸 채우기가 대부분을 차지한다', () => {
    const cloze = exam.filter((it) => it.game === 'cloze').length;
    expect(cloze / exam.length).toBeGreaterThan(0.8);
  });

  it('다른 레벨 단어는 섞이지 않는다', () => {
    const mixed = buildExam([...entriesOf('m1-1'), ...entriesOf('m2-1')], 'm1-1', fixedRand);
    expect(mixed.every((it) => it.entry.level === 'm1-1')).toBe(true);
  });

  it('처음에는 모두 첫 시도로 표시된다', () => {
    expect(exam.every((it) => !it.isRetry)).toBe(true);
  });
});

describe('canTakeExam', () => {
  it('아무것도 안 외웠으면 시험을 볼 수 없다', () => {
    const r = canTakeExam(POOL, {}, 'm1-1');
    expect(r.allowed).toBe(false);
    expect(r.mastered).toBe(0);
    expect(r.total).toBe(POOL.length);
  });

  it('90%에 못 미치면 아직 볼 수 없다', () => {
    const need = Math.ceil(POOL.length * 0.9);
    const r = canTakeExam(POOL, masteredCards(need - 1), 'm1-1');
    expect(r.allowed).toBe(false);
  });

  it('90%를 채우면 볼 수 있다', () => {
    const need = Math.ceil(POOL.length * 0.9);
    const r = canTakeExam(POOL, masteredCards(need), 'm1-1');
    expect(r.allowed).toBe(true);
    expect(r.need).toBe(need);
  });

  it('한 번 맞힌 정도로는 완전 암기로 치지 않는다', () => {
    const cards: Record<string, CardState> = {};
    for (const e of POOL) cards[e.id] = grade(createCard(e.id), true, TODAY);
    expect(canTakeExam(POOL, cards, 'm1-1').allowed).toBe(false);
  });
});

describe('nextRetryRound', () => {
  const exam = buildExam(POOL, 'm1-1', fixedRand);
  const wrong = exam.slice(0, 5);

  it('틀린 문항만 다시 낸다', () => {
    const retry = nextRetryRound(wrong, fixedRand);
    expect(retry).toHaveLength(5);
    expect(new Set(retry.map((it) => `${it.entry.id}#${it.senseIndex}`))).toEqual(
      new Set(wrong.map((it) => `${it.entry.id}#${it.senseIndex}`)),
    );
  });

  it('다시 푸는 문항으로 표시한다', () => {
    // 첫 시도 정답률을 따로 세려면 이 표시가 필요하다.
    expect(nextRetryRound(wrong, fixedRand).every((it) => it.isRetry)).toBe(true);
  });

  it('하나도 안 틀렸으면 다시 풀 것이 없다', () => {
    expect(nextRetryRound([], fixedRand)).toEqual([]);
  });
});

describe('examWeakWords', () => {
  it('같은 단어를 여러 뜻에서 틀려도 한 번만 센다', () => {
    const multi = POOL.find((e) => e.senses.length >= 2)!;
    const wrong = multi.senses.map((_, senseIndex) => ({
      entry: multi,
      senseIndex,
      game: 'cloze' as GameId,
      isRetry: false,
    }));
    expect(examWeakWords(wrong)).toEqual([multi.id]);
  });
});
