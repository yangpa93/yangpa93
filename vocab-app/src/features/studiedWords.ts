/**
 * 오늘 배운 낱말을 갈래 가리지 않고 한 줄로 세운다.
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * 단어장은 지금까지 **레벨의 전체 목록**만 보여 줬다. 중1-1 이면 그 레벨의
 * 150여 개가 통째로 늘어선다. 그런데 "오늘 뭘 배웠더라" 를 되짚고 싶을 때
 * 150개 중에서 오늘 것을 골라낼 방법이 없다. 정작 자주 보고 싶은 쪽은 오늘
 * 배운 열 개인데, 그것이 안 보이는 목록이었다.
 *
 * 게다가 **부모는 세 갈래를 공부한다** — 일상 문장 · 영어 단어 · 국어 어휘.
 * 영어 단어만 늘어놓는 목록으로는 오늘 본 것의 3분의 1밖에 못 본다.
 *
 * 그래서 갈래를 섞어 한 줄로 세운다. 화면에서 가르는 것은 그다음 일이다.
 *
 * 데이터만 다루고 화면(react-native)은 안 끌어온다. 어느 낱말이 어느 갈래인지
 * 가리는 규칙은 기기 없이 확인할 수 있어야 한다.
 */

import type { KoEntry, VocabEntry } from '../types';

/** 영어 낱말(단어·숙어·일상 문장)과 국어 어휘는 생김새가 다르다. */
export type StudiedWord =
  | { kind: 'en'; id: string; entry: VocabEntry; wrong: number }
  | { kind: 'daily'; id: string; entry: VocabEntry; wrong: number }
  | { kind: 'ko'; id: string; entry: KoEntry; wrong: number };

export interface WordSources {
  en: Map<string, VocabEntry> | Record<string, VocabEntry>;
  daily: Map<string, VocabEntry> | Record<string, VocabEntry>;
  ko: Map<string, KoEntry> | Record<string, KoEntry>;
}

function look<T>(src: Map<string, T> | Record<string, T>, id: string): T | undefined {
  return src instanceof Map ? src.get(id) : src[id];
}

/**
 * id 목록을 낱말로 바꾼다. 못 찾은 id 는 조용히 버린다.
 *
 * **버려도 되는 이유.** 어휘 파일에서 낱말이 빠지는 일이 있다(뜻을 못 확인해
 * 뺀 경우). 그러면 예전 기록에만 id 가 남는데, 그 하나 때문에 오늘 목록
 * 전체가 안 뜨면 잃는 것이 훨씬 크다.
 *
 * 일상 문장을 영어보다 먼저 찾는다 — 둘 다 VocabEntry 라 id 가 겹칠 일은
 * 없지만, 겹친다면 갈래를 잘못 붙이느니 좁은 쪽을 먼저 보는 편이 안전하다.
 */
export function studiedWords(
  ids: { id: string; wrong: number }[],
  src: WordSources,
): StudiedWord[] {
  const out: StudiedWord[] = [];
  for (const { id, wrong } of ids) {
    const daily = look(src.daily, id);
    if (daily) {
      out.push({ kind: 'daily', id, entry: daily, wrong });
      continue;
    }
    const en = look(src.en, id);
    if (en) {
      out.push({ kind: 'en', id, entry: en, wrong });
      continue;
    }
    const ko = look(src.ko, id);
    if (ko) out.push({ kind: 'ko', id, entry: ko, wrong });
  }
  return out;
}

/** 화면에 적을 갈래 이름. 부모 홈의 칩과 같은 말을 쓴다. */
export const WORD_KIND_LABEL: Record<StudiedWord['kind'], string> = {
  daily: '일상 문장',
  en: '영어 단어',
  ko: '국어',
};

/**
 * 갈래별로 몇 개인지. 목록 위에 한 줄로 적는다.
 *
 * 0 인 갈래는 뺀다 — 국어를 안 하는 아이 화면에 '국어 0개' 가 뜨면 안 한
 * 일이 남아 있는 것처럼 보인다.
 */
export function countByKind(words: StudiedWord[]): { kind: StudiedWord['kind']; n: number }[] {
  const order: StudiedWord['kind'][] = ['daily', 'en', 'ko'];
  return order
    .map((kind) => ({ kind, n: words.filter((w) => w.kind === kind).length }))
    .filter((x) => x.n > 0);
}

/** 오늘 틀린 것만. 오답 노트의 '오늘' 칸에 쓴다. */
export function wrongOnes(words: StudiedWord[]): StudiedWord[] {
  return words.filter((w) => w.wrong > 0).sort((a, b) => b.wrong - a.wrong);
}
