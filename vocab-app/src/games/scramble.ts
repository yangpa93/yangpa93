/**
 * 어순 배열 문제의 순수 로직. 화면과 분리해 둔다.
 *
 * `session.ts`가 "이 문장으로 배열 문제를 낼 수 있는가"를 물어야 하는데,
 * 화면 컴포넌트(.tsx)에 두면 세션 로직이 react-native 를 끌고 들어온다.
 * 테스트도 그것 때문에 못 돈다.
 */

/**
 * 문장을 낱말로 자른다. 문장부호는 앞 낱말에 붙여 둔다.
 *
 * 마침표를 따로 조각으로 내면 아이가 그것까지 자리를 맞춰야 해서, 어순이
 * 아니라 부호 맞추기 문제가 된다.
 */
export function tokenize(sentence: string): string[] {
  return sentence.trim().split(/\s+/).filter(Boolean);
}

/**
 * 배열 문제로 낼 수 있는 문장인지.
 *
 * 3낱말 이하면 놓을 자리가 없어 문제가 되지 않고, 10낱말을 넘으면 조각이
 * 화면을 덮어 아이가 포기한다. 우리 예문 10,056개 중 98.6%가 이 안에 든다.
 */
export function canScramble(sentence: string): boolean {
  const n = tokenize(sentence).length;
  return n >= 4 && n <= 10;
}
