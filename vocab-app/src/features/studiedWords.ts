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

import type { DailyRecord, KoEntry, Subject, VocabEntry } from '../types';
import { SUBJECT_ORDER } from '../types';

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

/**
 * **방금 끝낸 한 판**에서 틀린 낱말. 결과 화면이 쓴다.
 *
 * ── 왜 하루 기록을 보면 안 되나 ─────────────────────────────
 *
 * 결과 화면은 `day.wrongEntryIds` 를 보고 있었다. 그건 **그날 틀린 것 전부**다.
 * 갈래를 따로 들어가 풀게 한 뒤로 하루에 판이 둘 이상이라, 아침에 영어에서
 * 틀린 것이 저녁에 국어를 끝냈을 때도 그대로 올라왔다. 국어를 공부하고 나서
 * 영어 오답을 받아 보게 되는 것이다.
 *
 * 그래서 판을 끝낸 쪽이 **자기가 틀린 id 를 넘겨준다.** 하루 기록으로는 어느
 * 판에서 틀린 것인지 가릴 수가 없다 — 시각도 갈래도 안 적혀 있다.
 *
 * 같은 낱말을 두 번 틀렸으면 한 줄로 묶는다. 결과 화면은 몇 번 틀렸는지가
 * 아니라 무엇을 틀렸는지 보는 자리다. 순서는 처음 틀린 순서 그대로.
 */
export function sessionMissed(ids: string[], src: WordSources, limit = 6): StudiedWord[] {
  const counts = new Map<string, number>();
  for (const id of ids) counts.set(id, (counts.get(id) ?? 0) + 1);
  return studiedWords(
    [...counts].map(([id, wrong]) => ({ id, wrong })),
    src,
  ).slice(0, limit);
}

/** 하루를 한 갈래만큼 잘라 본 것. 부모가 날짜를 눌렀을 때 한 칸씩 그린다. */
export interface SubjectDay {
  subject: Subject;
  /** 만난 낱말 가짓수 */
  studied: number;
  correct: number;
  wrong: number;
  /**
   * 정답률 0~1. **푼 문제가 없으면 null.**
   *
   * 0 으로 두지 않는다. 0% 는 "다 틀렸다" 는 뜻이라, 안 푼 것과 같은 칸에
   * 적으면 부모가 아이를 오해한다.
   */
  accuracy: number | null;
  /** 자주 틀린 낱말. 많이 틀린 것부터. */
  missed: StudiedWord[];
}

/**
 * 하루 기록을 **갈래별로 갈라** 놓는다. 날짜별 학습 보고서가 쓴다.
 *
 * ── 왜 갈래로 갈라 보나 ─────────────────────────────────────
 *
 * 달력에서 날짜를 누르면 「학습 단어 16/15 · 정답률 88%」 한 줄만 나왔다.
 * 그 88% 가 영어에서 나온 것인지 국어에서 나온 것인지 알 수가 없다. 아이가
 * 영어는 잘하는데 국어가 처지고 있어도 합쳐 놓은 숫자로는 안 보인다.
 *
 * ── 못 세는 날이 있다 ───────────────────────────────────────
 *
 * `bySubject` 는 나중에 생긴 칸이라 그 전에 저장된 날에는 없다. 그때는
 * **null 을 돌려준다** — 화면이 "갈래별로 나눠 적기 전이에요" 라고 밝히게 하려는
 * 것이다. 하루 합계를 낱말 수 비율로 나눠 채울 수도 있지만, 그러면 아이가
 * 받은 적 없는 정답률이 부모 화면에 숫자로 뜬다.
 *
 * 안 푼 갈래는 아예 빼고 돌려준다. 국어를 안 하는 아이 화면에 '국어 0개' 가
 * 뜨면 안 한 일이 남아 있는 것처럼 보인다(`countByKind` 와 같은 이유다).
 */
export function dayBySubject(
  day: DailyRecord,
  src: WordSources,
  limit = 5,
): SubjectDay[] | null {
  if (!day.bySubject) return null;

  /*
   * 오답 낱말을 찾는 규칙은 결과 화면·오답 노트와 같은 것을 쓴다. 갈래를
   * 가리는 규칙이 세 군데로 흩어지면 국어를 빠뜨린 자리가 또 생긴다 —
   * 결과 화면이 실제로 그랬다.
   */
  const counts = new Map<string, number>();
  for (const id of day.wrongEntryIds) counts.set(id, (counts.get(id) ?? 0) + 1);
  const missed = studiedWords(
    [...counts].map(([id, wrong]) => ({ id, wrong })),
    src,
  );

  return SUBJECT_ORDER.flatMap((subject) => {
    const tally = day.bySubject?.[subject];
    if (!tally || tally.studied === 0) return [];
    const asked = tally.correct + tally.wrong;
    return [
      {
        subject,
        studied: tally.studied,
        correct: tally.correct,
        wrong: tally.wrong,
        accuracy: asked > 0 ? tally.correct / asked : null,
        // StudiedWord 의 kind 와 Subject 는 같은 말을 쓴다(en·ko·daily).
        missed: missed
          .filter((w) => w.kind === subject)
          .sort((a, b) => b.wrong - a.wrong)
          .slice(0, limit),
      },
    ];
  });
}
