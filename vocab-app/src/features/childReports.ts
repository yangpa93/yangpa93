/**
 * 다른 폰의 아이가 보내 온 리포트를 **달력이 읽을 수 있는 모양**으로 바꾼다.
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * 아이가 제 폰을 쓰면 그 아이의 학습 기록은 **아이 폰 안에만** 있다. 부모 폰이
 * 가진 것은 공부를 마칠 때마다 날아온 리포트뿐이다. 그래서 부모 화면에서는
 * 「마지막 소식: 8월 14일 · 오늘 목표 완료! 35개」 한 줄이 전부였고, 달력도
 * 날짜별 성적도 그릴 수가 없었다.
 *
 * 이제 리포트에 갈래별 성적과 틀린 낱말 id 가 실려 온다. 그것을 하루 기록
 * (`DailyRecord`)과 **같은 모양**으로 세워 두면, 이 폰의 아이에게 쓰던 달력과
 * 날짜별 요약을 그대로 쓸 수 있다. 화면을 두 벌 만들 이유가 없다.
 *
 * ── 안 오는 것도 있다 ───────────────────────────────────────
 *
 * 아이 폰이 아직 옛 판이면 갈래별 성적이 안 온다. 그런 날은 `bySubject` 가
 * 비어서 화면이 「나눠 적기 전」 으로 뜬다. **어림잡아 채우지 않는다** — 아이가
 * 받은 적 없는 정답률을 부모 화면에 숫자로 띄우게 된다.
 */

import type { DailyRecord, ReceivedReport } from '../types';

/**
 * 그 아이가 보내 온 것만 골라 날짜별 기록으로 세운다.
 *
 * 이름으로 고른다. 다른 폰의 아이에게는 이 폰에 프로필이 없어서 id 가 없다.
 * 같은 이름을 둘 두는 집은 없다고 본다 — QR 을 찍을 때 이름이 겹치면 부모가
 * 알아본다.
 */
export function daysFromReports(
  reports: ReceivedReport[],
  childName: string,
): Record<string, DailyRecord> {
  const out: Record<string, DailyRecord> = {};
  for (const r of reports) {
    if (r.childName !== childName) continue;
    // 같은 날짜가 여럿이면 나중에 받은 것을 쓴다(앞의 것을 덮는다).
    const before = out[r.date];
    if (before && (before as { receivedAt?: number }).receivedAt! > r.receivedAt) continue;

    const tally = r.bySubject ?? {};
    const correct = sumOf(tally, 'correct');
    const wrong = sumOf(tally, 'wrong');

    out[r.date] = {
      date: r.date,
      goal: r.goal ?? 0,
      studied: r.studied ?? 0,
      /*
       * 맞은 수와 틀린 수는 갈래별 합에서 낸다. 리포트에 따로 안 실려 오기
       * 때문이다 — 갈래별로 보내면 합은 언제든 다시 셀 수 있으니 두 번
       * 보내지 않는다.
       */
      correct,
      wrong,
      // 걸린 시간은 안 보낸다. 부모 화면에서 쓰지 않아 실을 이유가 없었다.
      seconds: 0,
      completed: r.completed,
      wrongEntryIds: r.wrongIds ?? [],
      ...(r.bySubject ? { bySubject: r.bySubject } : {}),
      // 받은 시각을 함께 얹어 둔다. 같은 날짜가 여럿일 때 어느 것이 최신인지 가린다.
      ...({ receivedAt: r.receivedAt } as object),
    };
  }
  return out;
}

function sumOf(
  tally: NonNullable<DailyRecord['bySubject']>,
  key: 'correct' | 'wrong',
): number {
  let n = 0;
  for (const t of Object.values(tally)) n += t?.[key] ?? 0;
  return n;
}

/** 이 아이가 보내 온 리포트가 하나라도 있는지. 없으면 달력을 열 것이 없다. */
export function hasReports(reports: ReceivedReport[], childName: string): boolean {
  return reports.some((r) => r.childName === childName);
}

/**
 * 그날 리포트가 **갈래별로 적혀 왔는지.**
 *
 * 안 왔으면 화면이 「아이 폰을 새로 깔면 자세히 볼 수 있어요」 라고 밝힌다.
 * 그냥 비워 두면 부모는 아이가 공부를 안 한 것으로 읽는다.
 */
export function isDetailed(day: DailyRecord | undefined): boolean {
  return Boolean(day?.bySubject && Object.keys(day.bySubject).length > 0);
}
