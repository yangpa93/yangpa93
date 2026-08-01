/**
 * 부모님용 일상·업무 영어 문장을 아이들 어휘와 같은 모양으로 감싼다.
 *
 * **왜 VocabEntry 로 바꾸는가.** 문제 화면(빈칸 채우기·문맥 속 뜻·문장 배열),
 * 세션 구성, 복습 간격 계산이 전부 VocabEntry 를 받도록 되어 있다. 부모용으로
 * 따로 만들면 같은 것이 두 벌이 되고, 한쪽만 고치는 날이 반드시 온다.
 * 사용자도 "학습 방법을 아이들과 동일하게" 하기를 바랐으므로 그릇을 맞춘다.
 *
 * 어긋나는 자리가 둘 있어 여기서 메운다.
 *
 *  · 품사 — 이 문장들의 표현은 품사로 나뉘지 않는다('on the same page' 는
 *    명사도 동사도 아니다). 그래서 `expr.`(표현)로 통일한다.
 *  · 레벨 — 아이들 레벨(중1-1 … 고3-4)과 성격이 다르다. 부모는 학년이 아니라
 *    주제를 고른다. 갈래는 주제로 나누고, `level` 칸에는 자리만 채운다.
 *    화면에도 레벨 이름을 쓰지 않는다.
 */

import { LevelId, VocabEntry } from '../../types';
import { DAILY_THEMES, DailyPhrase } from './phrases';

/**
 * `VocabEntry.level` 자리를 채우는 값.
 *
 * 뜻이 없는 값이다. 일상 문장은 주제로 나누고 레벨을 쓰지 않는데,
 * VocabEntry 에는 레벨 칸이 있어서 비워 둘 수가 없다. 세션을 만들 때
 * `entries` 를 이미 주제로 걸러 넘기므로 레벨 거르개는 아무 일도 하지 않는다.
 */
export const DAILY_LEVEL: LevelId = 'm1-1';

export interface DailyThemeInfo {
  id: string;
  /** 화면에 쓰는 이름. '업무와 협업' */
  label: string;
  /** 한 줄 설명 */
  hint: string;
  entries: VocabEntry[];
}

function toEntry(p: DailyPhrase): VocabEntry {
  return {
    id: p.id,
    level: DAILY_LEVEL,
    // 여러 낱말로 된 표현이 절반이 넘는다. 스펠링을 통째로 쓰게 하지 않으려고
    // 아이들 숙어와 같은 갈래로 둔다.
    kind: 'idiom',
    word: p.word,
    pos: 'expr.',
    senses: [
      {
        // 원본이 주는 것은 '뜻'이 아니라 '언제 쓰는 말인지'다. 그대로 쓴다 —
        // 사전 뜻을 지어내 붙이면 확인할 길이 없는 문장이 하나 더 늘어난다.
        meaning: p.note,
        synonyms: [],
        examples: [{ en: p.en, ko: p.ko }],
      },
    ],
    source: 'daily',
  };
}

export const DAILY_THEME_LIST: DailyThemeInfo[] = DAILY_THEMES.map((t) => ({
  id: t.id,
  label: t.label,
  hint: t.hint,
  entries: t.phrases.map(toEntry),
}));

export const DAILY_ENTRIES: VocabEntry[] = DAILY_THEME_LIST.flatMap((t) => t.entries);

/** 주제 하나. 모르는 id 면 첫 주제로 되돌린다 — 빈 화면보다는 낫다. */
export function dailyTheme(id: string): DailyThemeInfo {
  return DAILY_THEME_LIST.find((t) => t.id === id) ?? DAILY_THEME_LIST[0];
}

/** 저장된 주제 id 가 깨졌을 때 쓸 기본값. */
export const DEFAULT_DAILY_THEME = DAILY_THEME_LIST[0].id;

/** 원본 표제어. 문장에서 쓰인 자리(`word`)와 다를 때 카드에 함께 적어 준다. */
export const DAILY_KEY_EXPRESSION: Record<string, string> = Object.fromEntries(
  DAILY_THEMES.flatMap((t) => t.phrases.map((p) => [p.id, p.keyExpression])),
);
