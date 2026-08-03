/**
 * 한자 고르기 문제의 순수 로직. 화면과 분리해 둔다.
 *
 * `session.ts` 가 "이 어휘로 한자 문제를 낼 수 있는가"를 물어야 하는데,
 * 화면 컴포넌트(.tsx)에 두면 세션 로직이 react-native 를 끌고 들어온다.
 * 테스트도 그것 때문에 못 돈다. scramble.ts 와 같은 이유다.
 */

import { KoEntry } from '../types';

/**
 * 이 어휘로 한자 고르기 문제를 낼 수 있는지.
 *
 * 두 가지를 본다.
 *
 * **한자가 있어야 한다.** 고유어(가락·판소리)와 외래어(이온·인플레이션)는
 * 한자가 없다.
 *
 * **사전에서 확인한 한자여야 한다.** 사자성어 300개를 표준국어대사전과
 * 대조했더니 20개는 한자가 어긋났고 19개는 사전에 표제어조차 없었다.
 * 사전에 없는 것들(정저지와·진인사대천명 등)은 실재하는 말이지만 한자를
 * 확인할 길이 없다. 확인 못 한 한자를 정답이라고 채점하면, 아이가 맞게
 * 알고 있어도 틀렸다는 말을 듣게 된다.
 */
export function canHanja(entry: KoEntry): boolean {
  return entry.hanja.length > 0 && entry.hanjaVerified;
}

/** 한자 문자열을 낱 글자로 쪼갠다. */
export function chars(hanja: string): string[] {
  return [...hanja];
}

/** 두 한자가 글자를 하나라도 같이 쓰는지. */
export function sharesChar(a: string, b: string): boolean {
  const set = new Set(chars(a));
  return chars(b).some((c) => set.has(c));
}

/**
 * 오답 보기를 고른다.
 *
 * **글자가 겹치는 것을 먼저 넣는다.** 넉 자가 통째로 다른 보기만 늘어놓으면
 * 아이가 글자 하나만 알아보고 찍는다. 苦盡甘來 가 정답인데 보기가
 * 一石二鳥·大器晩成·靑出於藍 이면 '苦' 하나로 끝난다. 한 글자라도 겹치면
 * 넉 자를 다 읽어야 하고, 그래야 한자를 낱자로 익힌다.
 *
 * 겹치는 것이 모자라면 나머지에서 채운다. 보기가 넷이 안 되느니 쉬운 문제라도
 * 내는 편이 낫다.
 *
 * 한자가 똑같은 것은 넣지 않는다 — 정답이 둘이 되어 버린다.
 */
export function pickHanjaDistractors(
  answer: KoEntry,
  pool: KoEntry[],
  count = 3,
  rand: () => number = Math.random,
): KoEntry[] {
  const taken = new Set([answer.hanja]);

  const usable = pool.filter((e) => {
    if (e.id === answer.id) return false;
    if (!canHanja(e)) return false;
    // 같은 글자 수라야 헷갈린다. 넉 자 성어 사이에 석 자가 끼면 그것만
    // 눈에 띄어 답이 아니라는 것이 바로 보인다.
    if (chars(e.hanja).length !== chars(answer.hanja).length) return false;
    if (taken.has(e.hanja)) return false;
    taken.add(e.hanja);
    return true;
  });

  const shared = shuffle(
    usable.filter((e) => sharesChar(answer.hanja, e.hanja)),
    rand,
  );
  const rest = shuffle(
    usable.filter((e) => !sharesChar(answer.hanja, e.hanja)),
    rand,
  );

  return [...shared, ...rest].slice(0, count);
}

/** 정답을 섞어 넣은 보기 넷. 못 만들면 빈 배열. */
export function buildHanjaChoices(
  answer: KoEntry,
  pool: KoEntry[],
  rand: () => number = Math.random,
): KoEntry[] {
  if (!canHanja(answer)) return [];
  const others = pickHanjaDistractors(answer, pool, 3, rand);
  // 보기가 둘뿐이면 반반 찍기가 된다. 그럴 바에는 문제를 내지 않는다.
  if (others.length < 2) return [];
  return shuffle([answer, ...others], rand);
}

function shuffle<T>(list: T[], rand: () => number): T[] {
  const out = [...list];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
