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

/**
 * 표제어를 id로 쓸 수 있는 형태로 바꾼다. `look for` → `look-for`
 *
 * id에 레벨을 넣지 않는다. 배치표(plan.ts)를 손보면 단어가 레벨 사이를
 * 옮겨 다니는데, id에 레벨이 박혀 있으면 그때마다 학습 기록이 끊긴다.
 * 표제어만으로 만들면 레벨을 어떻게 재배치해도 기록이 따라온다.
 *
 * 배열 순서로 만들지 않는 이유도 같다. 순서 기반(`m1-042`)이면 중간에
 * 한 단어만 끼워 넣어도 뒤쪽 id가 전부 밀린다.
 */
export function slug(word: string): string {
  return word
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function defineLevel(
  level: LevelId,
  rows: Row[],
  defaultSource: EntrySource = 'curriculum',
): VocabEntry[] {
  return rows.map((row) => ({
    id: slug(row.w),
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
