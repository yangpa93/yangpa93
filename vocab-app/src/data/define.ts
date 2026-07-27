/**
 * 어휘 데이터를 짧게 적기 위한 헬퍼.
 *
 * 레벨 파일은 아래 압축 형태로 적고, id·level·kind처럼 기계적인 필드는
 * 여기서 채운다. 손으로 채우면 id가 어긋나기 쉽다.
 *
 *   { w: 'save', p: 'v.', s: [
 *       { m: '구하다', syn: ['rescue'], ex: [['...', '...'], ['...', '...']] },
 *       { m: '저축하다', syn: ['put aside'], ex: [...] },
 *   ]}
 */

import { EntryKind, EntrySource, LevelId, VocabEntry } from '../types';

/** 예문: [영어, 해석] */
export type ExRow = [en: string, ko: string];

export interface SenseRow {
  /** 한국어 뜻 */
  m: string;
  /** 같은 뜻의 영어 표현 */
  syn: string[];
  /** 이 뜻으로 쓰인 예문들 */
  ex: ExRow[];
}

export interface Row {
  /** 표제어 */
  w: string;
  /** 품사 */
  p: string;
  /** 뜻 목록 */
  s: SenseRow[];
  /** 선정 출처 (레벨 기본값과 다를 때만) */
  src?: EntrySource;
}

export function defineLevel(
  level: LevelId,
  rows: Row[],
  defaultSource: EntrySource = 'curriculum',
): VocabEntry[] {
  return rows.map((row, i) => ({
    id: `${level}-${String(i + 1).padStart(3, '0')}`,
    level,
    // 띄어쓰기가 있으면 숙어로 본다. (get up, look forward to …)
    kind: (row.w.includes(' ') ? 'idiom' : 'word') as EntryKind,
    word: row.w,
    pos: row.p,
    senses: row.s.map((sense) => ({
      meaning: sense.m,
      synonyms: sense.syn,
      examples: sense.ex.map(([en, ko]) => ({ en, ko })),
    })),
    source: row.src ?? defaultSource,
  }));
}
