/**
 * 어휘 데이터 진입점.
 *
 * 레벨을 추가하거나 단어를 대량으로 늘릴 때는 levels/ 아래 파일만 손보면 된다.
 * 형식이 맞는지는 `npm run data:validate`로 확인한다.
 */

import { LevelId, VocabEntry } from '../types';
import { M1 } from './levels/m1';
import { M2 } from './levels/m2';
import { M3 } from './levels/m3';
import { H1 } from './levels/h1';
import { H2 } from './levels/h2';
import { H3 } from './levels/h3';

export const ENTRIES_BY_LEVEL: Record<LevelId, VocabEntry[]> = {
  m1: M1,
  m2: M2,
  m3: M3,
  h1: H1,
  h2: H2,
  h3: H3,
};

export const ALL_ENTRIES: VocabEntry[] = [...M1, ...M2, ...M3, ...H1, ...H2, ...H3];

const BY_ID = new Map(ALL_ENTRIES.map((e) => [e.id, e]));

export function entryById(id: string): VocabEntry | undefined {
  return BY_ID.get(id);
}

export function entriesOf(level: LevelId): VocabEntry[] {
  return ENTRIES_BY_LEVEL[level] ?? [];
}
