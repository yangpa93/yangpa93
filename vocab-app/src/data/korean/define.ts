/**
 * 국어 어휘 데이터를 짧게 적기 위한 헬퍼.
 *
 * 영어의 `data/define.ts` 와 같은 역할이다. 레벨 파일은 아래 압축 형태로
 * 적고, id·level 같은 기계적인 필드는 여기서 채운다.
 *
 *   { w: '각주구검', h: '刻舟求劍', f: '고사', m: '융통성 없이 고집을 부림', e: [
 *       { t: '변화하는 상황을 고려하지 않는 각주구검의 태도.' },
 *       { t: '刻舟求劍', g: '배에 새겨 칼을 찾다', s: '여씨춘추 찰금편' },
 *   ]}
 */

import { KoCategory, KoEntry, KoExample, LevelId } from '../../types';

export interface KoExRow {
  /** 예문, 또는 고전이면 원문 단락 */
  t: string;
  /** 현대어 풀이 (고전 전용) */
  g?: string;
  /** 출처. 비어 있으면 원전 인용이 아니라 만든 예문이다. */
  s?: string;
}

export interface KoRow {
  /** 표제어. 사자성어는 음(한글). */
  w: string;
  /** 한자 또는 외래어 원어 */
  h?: string;
  /**
   * 한자를 사전에서 확인하지 못했으면 false 를 적는다. 안 적으면 확인된
   * 것으로 본다 — 대부분은 확인됐고, 예외만 표시하는 편이 눈에 띈다.
   */
  v?: boolean;
  /** 영역·분류 */
  f?: string;
  /** 뜻풀이 */
  m: string;
  /** 예문 */
  e: KoExRow[];
}

/**
 * 표제어를 id로 바꾼다.
 *
 * 영어와 마찬가지로 **레벨을 id에 넣지 않는다.** 레벨 배분을 손보면 어휘가
 * 레벨 사이를 옮겨 다니는데, id에 레벨이 박혀 있으면 그때마다 학습 기록이
 * 끊긴다. 한글은 그대로 두고 앞에 `ko-`만 붙여 영어 id와 섞이지 않게 한다.
 */
export function koSlug(word: string): string {
  return `ko-${word.replace(/\s+/g, '-')}`;
}

export function defineKoLevel(
  level: LevelId,
  category: KoCategory,
  rows: KoRow[],
): KoEntry[] {
  return rows.map((row) => ({
    id: koSlug(row.w),
    level,
    category,
    word: row.w,
    hanja: row.h ?? '',
    hanjaVerified: row.h ? (row.v ?? true) : false,
    field: row.f ?? '',
    meaning: row.m,
    examples: row.e.map(
      (ex): KoExample => ({
        text: ex.t,
        ...(ex.g ? { gloss: ex.g } : {}),
        ...(ex.s ? { source: ex.s } : {}),
      }),
    ),
  }));
}
