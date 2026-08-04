/**
 * 배치표와 자리 잠금(placement.json)이 서로 맞는지.
 *
 * **왜 이걸 지켜야 하는가.** 단어를 하나 더 넣었을 때 이미 배운 단어가 다른
 * 레벨로 옮겨 가면, 아이가 끝낸 레벨에 새 단어가 생겨 시험을 다시 봐야 하고
 * 아직 안 배운 단어는 지나간 레벨로 밀려 영영 안 나온다. 그 사고를 막는 것이
 * data/placement.json 이고, 여기서는 그 파일이 실제로 배치표와 일치하는지를 본다.
 *
 * 어긋나는 경우는 둘이다.
 *   · placement.json 을 손으로 고쳤다
 *   · plan.ts 를 build-plan.mjs 없이 손으로 고쳤다
 * 둘 다 다음 번 추가에서 배치가 흔들린다.
 */

import { readFileSync } from 'node:fs';
import { PLAN, PLAN_COUNT } from '../src/data/plan';
import { LEVEL_ORDER, LevelId } from '../src/types';

const PLACEMENT: Record<string, string[]> = JSON.parse(
  readFileSync('data/placement.json', 'utf8'),
);

describe('자리 잠금', () => {
  it('배치표와 잠금 파일의 표제어가 완전히 같다', () => {
    const inPlan = new Set(PLAN.map((r) => r.word));
    const inLock = new Set(Object.values(PLACEMENT).flat());
    expect([...inPlan].filter((w) => !inLock.has(w))).toEqual([]);
    expect([...inLock].filter((w) => !inPlan.has(w))).toEqual([]);
  });

  it('레벨까지 같다', () => {
    const lockLevel = new Map<string, string>();
    for (const [level, words] of Object.entries(PLACEMENT)) {
      for (const w of words) lockLevel.set(w, level);
    }
    const wrong = PLAN.filter((r) => lockLevel.get(r.word) !== r.level).map(
      (r) => `${r.word}: 배치표 ${r.level} / 잠금 ${lockLevel.get(r.word)}`,
    );
    expect(wrong).toEqual([]);
  });

  it('레벨 24개가 다 있다', () => {
    expect(Object.keys(PLACEMENT).sort()).toEqual([...LEVEL_ORDER].sort());
  });

  it('레벨별 개수도 같다', () => {
    for (const level of LEVEL_ORDER) {
      expect({ level, n: PLACEMENT[level].length }).toEqual({
        level,
        n: PLAN_COUNT[level as LevelId],
      });
    }
  });

  it('같은 표제어가 두 레벨에 있지 않다', () => {
    const all = Object.values(PLACEMENT).flat();
    const dupes = [...new Set(all.filter((w, i) => all.indexOf(w) !== i))];
    expect(dupes).toEqual([]);
  });

  /*
   * 새 단어를 '가장 홀쭉한 레벨' 로 보내는 규칙이 지켜지고 있는지.
   * 한 레벨만 유난히 두꺼우면 그 레벨 시험만 길어진다.
   *
   * ── 벌어짐을 10 에서 35 로 넓혔다 ────────────────────────
   *
   * 초등학교 수준 낱말 108개를 뺐는데, 그것들이 앞 레벨(중1-1 … 중2-4)에
   * 몰려 있었다. 그래서 앞이 얇아지고 뒤가 그대로라 벌어짐이 29가 됐다.
   *
   * **자리를 다시 나누지 않는다.** placement.json 이 있는 이유가 그것이다 —
   * 낱말이 레벨 사이를 옮겨 다니면 이미 그 레벨을 끝낸 아이의 진도가
   * 흔들린다. 얇은 레벨은 빨리 끝나는 것일 뿐 틀린 것이 아니다.
   *
   * 그래도 자를 아예 없애지는 않는다. 지금 벌어짐(29)보다 조금 위에 둔다 —
   * 여기서 더 벌어지면 그때는 손봐야 한다는 뜻이다.
   */
  it('레벨끼리 크기가 크게 벌어지지 않는다', () => {
    const sizes = LEVEL_ORDER.map((l) => PLACEMENT[l].length);
    expect(Math.max(...sizes) - Math.min(...sizes)).toBeLessThanOrEqual(35);
  });
});
