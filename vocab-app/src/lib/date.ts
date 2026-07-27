/** 날짜 유틸. 앱 전체가 기기 로컬 시간 기준 `yyyy-mm-dd` 문자열을 쓴다. */

export function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function todayKey(now: Date = new Date()): string {
  return toKey(now);
}

export function fromKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function addDays(key: string, days: number): string {
  const d = fromKey(key);
  d.setDate(d.getDate() + days);
  return toKey(d);
}

/** a - b 를 일수로. a가 미래면 양수. */
export function diffDays(a: string, b: string): number {
  const ms = fromKey(a).getTime() - fromKey(b).getTime();
  return Math.round(ms / 86_400_000);
}

/** key 가 today 이거나 그보다 과거면 true (= 복습할 때가 됐다). */
export function isDue(key: string, today: string): boolean {
  return diffDays(key, today) <= 0;
}

/** 최근 n일의 날짜 키를 과거→현재 순으로. */
export function lastNDays(n: number, today: string = todayKey()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) out.push(addDays(today, -i));
  return out;
}

export function formatKo(key: string): string {
  const d = fromKey(key);
  const week = ['일', '월', '화', '수', '목', '금', '토'][d.getDay()];
  return `${d.getMonth() + 1}월 ${d.getDate()}일 (${week})`;
}
