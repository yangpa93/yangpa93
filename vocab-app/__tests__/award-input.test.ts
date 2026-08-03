/**
 * 부모가 손으로 적은 요청권 금액 읽기.
 *
 * 돈이 걸린 자리다. 잘못 읽으면 아이가 요청하는 금액이 조용히 달라지는데,
 * 화면에는 아무 오류도 안 뜨기 때문에 부모도 아이도 모른 채 지나간다.
 */

import { MAX_AWARD_INPUT, formatWon, parseWon } from '../src/features/awards';

describe('parseWon', () => {
  it('숫자만 있으면 그대로 읽는다', () => {
    expect(parseWon('30000')).toBe(30_000);
    expect(parseWon('0')).toBe(0);
  });

  it('쉼표와 원 은 떼고 읽는다', () => {
    // 같은 뜻인데 한 가지만 받으면 나머지를 적은 부모는 "안 먹힌다"고 여긴다.
    expect(parseWon('30,000')).toBe(30_000);
    expect(parseWon('30000원')).toBe(30_000);
    expect(parseWon(' 45,000 원 ')).toBe(45_000);
  });

  it('빈 칸이면 null — 지우는 중일 수 있다', () => {
    // 여기서 0 을 돌려주면 부모가 숫자를 고치려고 지운 순간 0원이 저장된다.
    expect(parseWon('')).toBeNull();
    expect(parseWon('   ')).toBeNull();
    expect(parseWon('원')).toBeNull();
  });

  it("'만' 은 안 풀어 준다", () => {
    /*
     * '3만' 을 30,000 으로 읽는 규칙을 넣으면 '3만5천' 을 어떻게 읽을지가
     * 애매해진다. 잘못 읽으면 열 배 틀린 값이 조용히 저장되므로, 숫자만
     * 보는 편이 안전하다. '3만' 은 숫자 3 만 남아 3원이 되고, 부모는 화면에
     * 3원이라고 적힌 것을 보고 바로 고칠 수 있다.
     */
    expect(parseWon('3만')).toBe(3);
  });

  it('0 을 더 쳐도 상한에서 멈춘다', () => {
    // 손이 미끄러져 자리를 더 치는 일을 막는다.
    expect(parseWon('999999999')).toBe(MAX_AWARD_INPUT);
    expect(parseWon('10000001')).toBe(MAX_AWARD_INPUT);
  });

  it('음수 기호는 숫자가 아니라 떨어져 나간다', () => {
    // 마이너스 금액이 저장되면 동기 부여 요청권이 어떻게 되어야 하는지 정의가 없다.
    expect(parseWon('-5000')).toBe(5_000);
  });
});

describe('formatWon 과 짝이 맞는다', () => {
  it('만 단위로 떨어지면 만원으로 적는다', () => {
    expect(formatWon(30_000)).toBe('3만원');
    expect(formatWon(50_000)).toBe('5만원');
  });

  it('떨어지지 않으면 그대로 적는다', () => {
    // 직접 적은 금액이 여기로 들어온다. 4만5천을 '4.5만원' 이라고 쓰면
    // 부모가 자기가 적은 숫자를 못 알아본다.
    expect(formatWon(45_000)).toBe('45,000원');
    expect(formatWon(123_456)).toBe('123,456원');
  });
});
