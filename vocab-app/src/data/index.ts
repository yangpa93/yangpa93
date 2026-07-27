/**
 * 어휘 데이터 진입점.
 *
 * 학년마다 레벨 파일이 3개씩, 모두 18개다. 단어를 늘릴 때는 levels/ 아래
 * 파일만 손보면 된다. 형식이 맞는지는 `npm run data:validate`로 확인한다.
 *
 * 단어를 파일 중간에 끼워 넣어도 안전하다. id를 표제어에서 뽑기 때문이다.
 * 다만 **표제어의 철자를 고치면 id가 바뀌어 그 단어의 학습 기록이 끊긴다.**
 * 오타를 고칠 때는 그 점을 알고 고쳐야 한다.
 */

import { GradeId, LevelId, VocabEntry } from '../types';
import { M1_1 } from './levels/m1-1';
import { M1_2 } from './levels/m1-2';
import { M1_3 } from './levels/m1-3';
import { M2_1 } from './levels/m2-1';
import { M2_2 } from './levels/m2-2';
import { M2_3 } from './levels/m2-3';
import { M3_1 } from './levels/m3-1';
import { M3_2 } from './levels/m3-2';
import { M3_3 } from './levels/m3-3';
import { H1_1 } from './levels/h1-1';
import { H1_2 } from './levels/h1-2';
import { H1_3 } from './levels/h1-3';
import { H2_1 } from './levels/h2-1';
import { H2_2 } from './levels/h2-2';
import { H2_3 } from './levels/h2-3';
import { H3_1 } from './levels/h3-1';
import { H3_2 } from './levels/h3-2';
import { H3_3 } from './levels/h3-3';

export const ENTRIES_BY_LEVEL: Record<LevelId, VocabEntry[]> = {
  'm1-1': M1_1,
  'm1-2': M1_2,
  'm1-3': M1_3,
  'm2-1': M2_1,
  'm2-2': M2_2,
  'm2-3': M2_3,
  'm3-1': M3_1,
  'm3-2': M3_2,
  'm3-3': M3_3,
  'h1-1': H1_1,
  'h1-2': H1_2,
  'h1-3': H1_3,
  'h2-1': H2_1,
  'h2-2': H2_2,
  'h2-3': H2_3,
  'h3-1': H3_1,
  'h3-2': H3_2,
  'h3-3': H3_3,
};

export const ALL_ENTRIES: VocabEntry[] = Object.values(ENTRIES_BY_LEVEL).flat();

const BY_ID = new Map(ALL_ENTRIES.map((e) => [e.id, e]));

export function entryById(id: string): VocabEntry | undefined {
  return BY_ID.get(id);
}

export function entriesOf(level: LevelId): VocabEntry[] {
  return ENTRIES_BY_LEVEL[level] ?? [];
}

/** 한 학년의 세 레벨을 합친 것. 학년 단위로 진도를 보여줄 때 쓴다. */
export function entriesOfGrade(grade: GradeId): VocabEntry[] {
  return ALL_ENTRIES.filter((e) => e.level.startsWith(grade));
}

/** 표제어로 찾는다. 같은 단어가 여러 학년에 있으면 앞 학년 것이 나온다. */
export function entryByWord(word: string): VocabEntry | undefined {
  const key = word.toLowerCase();
  return ALL_ENTRIES.find((e) => e.word.toLowerCase() === key);
}
