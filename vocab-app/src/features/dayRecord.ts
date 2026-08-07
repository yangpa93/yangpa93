/**
 * 하루치 기록을 다루는 규칙. 화면과 저장소에서 떼어 낸 순수 로직이다.
 *
 * ── 왜 떼어 냈나 ────────────────────────────────────────────
 *
 * "부모 공부에서 중도에 그만 두었는데도 다 학습한 것처럼 나온다" 는 말을
 * 들었다. 맞았고, 원인은 **다 했는지를 세는 방법**에 있었다.
 *
 *   목표(goal)   = 오늘 다룰 낱말의 가짓수
 *   한 것(studied) = 오늘 만난 낱말의 가짓수
 *
 * 그런데 한 낱말은 하루에 **세 바퀴**(rounds) 나온다. 첫 바퀴만 돌면 이미
 * 모든 낱말을 한 번씩 만난 것이라 `studied === goal` 이 되고, 거기서 그만둬도
 * 다 한 것으로 적혔다. 세 바퀴를 돌게 해 놓고 한 바퀴에 도장을 찍어 준 셈이다.
 *
 * 고치는 방법은 하나다 — **끝까지 갔는지를 함께 본다.** 개수만으로는 알 수
 * 없는 것이라 개수를 아무리 손봐도 안 된다.
 *
 * 이 규칙이 화면 안에 있으면 기기 없이 확인할 수가 없어서 여기로 옮겼다.
 */

import type { DailyRecord, Subject } from '../types';

/** 그날 처음 문제를 풀 때 만드는 빈 기록. */
export function emptyDay(date: string, goal: number): DailyRecord {
  return {
    date,
    goal,
    studied: 0,
    correct: 0,
    wrong: 0,
    seconds: 0,
    completed: false,
    wrongEntryIds: [],
    studiedEntryIds: [],
  };
}

/**
 * 옛 기록에 없던 칸을 채워 준다.
 *
 * `studiedEntryIds` 는 나중에 생긴 칸이라 예전에 저장된 날에는 없다. 읽는
 * 자리마다 `?? []` 를 흩뿌리면 한 군데를 빠뜨리는 순간 화면이 죽으므로,
 * 들어오는 길목에서 한 번 채운다.
 */
export function withDefaults(day: DailyRecord): DailyRecord & { studiedEntryIds: string[] } {
  return day.studiedEntryIds ? (day as DailyRecord & { studiedEntryIds: string[] }) : { ...day, studiedEntryIds: [] };
}

/**
 * 문제 하나를 푼 결과를 얹는다.
 *
 * `wrongEntryIds` 는 **중복을 그대로 둔다** — 두 번 틀리면 두 번 들어간다.
 * 몇 번 틀렸는지가 뜻을 갖기 때문이다. `studiedEntryIds` 는 반대로 가짓수를
 * 세는 것이라 한 번만 담는다.
 */
export function addAnswer(day: DailyRecord, entryId: string, correct: boolean): DailyRecord {
  const base = withDefaults(day);
  return {
    ...base,
    correct: base.correct + (correct ? 1 : 0),
    wrong: base.wrong + (correct ? 0 : 1),
    wrongEntryIds: correct ? base.wrongEntryIds : [...base.wrongEntryIds, entryId],
    studiedEntryIds: base.studiedEntryIds.includes(entryId)
      ? base.studiedEntryIds
      : [...base.studiedEntryIds, entryId],
  };
}

/**
 * 오늘 다 했다고 볼 수 있는지.
 *
 * **켠 갈래를 전부 끝까지 풀어야 한다.**
 *
 * 예전에는 켠 갈래를 한 줄로 이어 붙여 한 판에 다 풀게 했고, 그래서 "끝까지
 * 갔는지" 하나만 보면 됐다. 그런데 영어와 국어를 둘 다 켜면 한 번에 78문제가
 * 되어 앉은자리에서 다 해야 했고, 영어를 끝내고 쉬면 국어는 시작도 못 한 채
 * 하루가 갔다.
 *
 * 지금은 갈래마다 따로 들어가 푼다. 그래서 "오늘 다 했는지" 도 갈래마다 세고
 * **전부 모여야** 완료로 친다.
 *
 * 이미 다 한 날은 그대로 둔다 — 다 하고 한 번 더 하다 그만둔 것이 취소되면
 * 안 된다.
 */
export function isDayComplete(args: {
  wasCompleted: boolean;
  doneSubjects: Subject[];
  /** 오늘 켜 둔 갈래 전부. 비어 있으면 오늘 할 것이 없었다는 뜻이다. */
  required: Subject[];
}): boolean {
  if (args.wasCompleted) return true;
  if (args.required.length === 0) return false;
  return args.required.every((s) => args.doneSubjects.includes(s));
}

/**
 * 한 판이 끝났을 때 하루 기록을 닫는다.
 *
 * `subject` 는 이번에 푼 갈래, `required` 는 오늘 켜 둔 갈래 전부다.
 * 끝까지 갔으면 그 갈래를 다 한 것으로 적고, 켠 갈래가 다 모였는지 본다.
 */
export function closeSession(
  day: DailyRecord,
  args: {
    studied: number;
    seconds: number;
    reachedEnd: boolean;
    subject: Subject;
    required: Subject[];
  },
): DailyRecord {
  const base = withDefaults(day);
  const done = base.doneSubjects ?? [];
  const doneSubjects =
    args.reachedEnd && !done.includes(args.subject) ? [...done, args.subject] : done;

  return {
    ...base,
    studied: base.studied + args.studied,
    seconds: base.seconds + args.seconds,
    doneSubjects,
    completed: isDayComplete({
      wasCompleted: base.completed,
      doneSubjects,
      required: args.required,
    }),
  };
}

/**
 * 오늘 만난 낱말과 그중 몇 번 틀렸는지.
 *
 * 단어장에서 '오늘 배운 것' 을 보여줄 때 쓴다. 순서는 만난 순서 그대로 —
 * 다시 줄 세우면 "방금 본 그 단어" 를 찾기 어려워진다.
 */
export function studiedToday(day: DailyRecord | undefined): { id: string; wrong: number }[] {
  if (!day) return [];
  const base = withDefaults(day);
  const wrongCount = new Map<string, number>();
  for (const id of base.wrongEntryIds) wrongCount.set(id, (wrongCount.get(id) ?? 0) + 1);
  return base.studiedEntryIds.map((id) => ({ id, wrong: wrongCount.get(id) ?? 0 }));
}
