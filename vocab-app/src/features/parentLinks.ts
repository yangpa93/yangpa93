/**
 * 아이 폰이 기억하는 부모 폰들.
 *
 * ── 왜 하나가 아니라 목록인가 ────────────────────────────────
 *
 * 예전에는 아이 폰이 부모 폰 주소를 **딱 하나만** 들고 있었다(`parentLink`).
 * 엄마가 아이 QR 을 찍으면 엄마 폰이 들어가고, 그다음 아빠가 찍으면 아빠 폰이
 * 그 자리를 덮었다. 그러면 엄마 폰에는 그날부터 리포트가 안 온다.
 *
 * 제일 나쁜 것은 **엄마 폰에 아무 표시도 안 난다**는 점이었다. 아이 목록에
 * 아이는 그대로 보이는데 리포트만 조용히 끊긴다. 엄마는 "요즘 공부를 안 하나
 * 보다"로 읽게 된다. 끊긴 줄도 모르는 연결이 제일 위험하다.
 *
 * 그래서 목록으로 바꾸고, 공부가 끝나면 **연결된 폰 전부에게** 보낸다.
 *
 * ── 주 부모는 왜 필요한가 ────────────────────────────────────
 *
 * 리포트는 여럿이 봐도 되지만 **정하는 일**은 한 사람이 해야 한다. 동기 부여
 * 요청권을 엄마와 아빠가 각각 승인하면 같은 것을 두 번 주게 된다. 그래서
 * 목록 중 한 대를 주 부모로 정하고, 아이가 요청권을 신청하면 그 폰에만 알린다.
 *
 * 목록이 비어 있지 않으면 **주 부모는 반드시 정확히 하나**다. 여기 함수들이
 * 그 규칙을 지킨다 — 화면에서 지키게 두면 언젠가 0개나 2개가 된다.
 *
 * 화면(react-native)을 안 쓰는 순수 함수라 폰 없이 테스트한다.
 */

import { ParentLink } from '../types';

/**
 * 아이 폰 하나가 기억할 수 있는 부모 폰 수.
 *
 * 엄마·아빠에 조부모 한 분까지를 생각해 셋으로 잡았다. 공부가 끝날 때마다
 * 이 수만큼 알림을 보내므로 무작정 늘릴 값은 아니다. 늘리려면 이 숫자만
 * 고치면 된다 — 쓰는 곳은 전부 여기를 본다.
 */
export const MAX_PARENTS = 3;

/** 주소를 견주기 전에 다듬는다. 앞뒤 공백 하나로 같은 폰이 둘이 된다. */
function key(token: string): string {
  return (token ?? '').trim();
}

/** 저장된 값이 깨져 있어도 쓸 수 있는 목록으로 만든다. */
export function normalizeParentLinks(v: unknown): ParentLink[] {
  if (!Array.isArray(v)) return [];

  const out: ParentLink[] = [];
  const seen = new Set<string>();

  for (const raw of v) {
    if (!raw || typeof raw !== 'object') continue;
    const r = raw as Partial<ParentLink>;
    const token = key(typeof r.token === 'string' ? r.token : '');
    if (!token || seen.has(token)) continue;
    seen.add(token);
    out.push({
      token,
      label: typeof r.label === 'string' && r.label.trim() ? r.label.trim() : '부모님 폰',
      linkedAt: typeof r.linkedAt === 'number' && Number.isFinite(r.linkedAt) ? r.linkedAt : 0,
      lastSentDate: typeof r.lastSentDate === 'string' ? r.lastSentDate : null,
      isPrimary: r.isPrimary === true,
    });
    if (out.length >= MAX_PARENTS) break;
  }

  return fixPrimary(out);
}

/**
 * 주 부모가 정확히 하나가 되게 맞춘다.
 *
 * 하나도 없으면 **맨 앞**을 주 부모로 삼는다. 처음 연결한 폰이 대개 주로 쓰는
 * 폰이고, 무엇보다 "주 부모가 없어서 요청권이 아무 데도 안 가는" 상태를
 * 만들지 않는 것이 중요하다. 여럿이면 앞의 하나만 남긴다.
 */
function fixPrimary(list: ParentLink[]): ParentLink[] {
  if (list.length === 0) return list;
  const first = list.findIndex((l) => l.isPrimary);
  const primary = first >= 0 ? first : 0;
  return list.map((l, i) => ({ ...l, isPrimary: i === primary }));
}

/**
 * 부모 폰 하나를 목록에 넣는다. **덮어쓰지 않는다.**
 *
 * 같은 주소가 이미 있으면 이름과 시각만 새로 고친다 — 폰 이름을 바꿔 다시
 * 연결하는 경우다. 그때 주 부모 표시는 그대로 둔다.
 *
 * 자리가 꽉 찼는데 새 폰이면 넣지 않고 그대로 돌려준다. 조용히 남의 것을
 * 밀어내면 어느 폰이 빠졌는지 아무도 모른다.
 */
export function addParentLink(list: ParentLink[], link: ParentLink): ParentLink[] {
  const token = key(link.token);
  if (!token) return list;

  const at = list.findIndex((l) => l.token === token);
  if (at >= 0) {
    const next = [...list];
    next[at] = { ...next[at], label: link.label, linkedAt: link.linkedAt };
    return fixPrimary(next);
  }

  if (list.length >= MAX_PARENTS) return list;
  return fixPrimary([...list, { ...link, token, isPrimary: list.length === 0 }]);
}

/** 자리가 있는지. 화면에서 미리 알려 주는 데 쓴다. */
export function hasRoomForParent(list: ParentLink[]): boolean {
  return list.length < MAX_PARENTS;
}

/**
 * 부모 폰 하나를 뺀다.
 *
 * 주 부모를 빼면 남은 것 중 맨 앞이 주 부모가 된다(fixPrimary). 아이가
 * 주 부모를 지우고 나서 "이제 요청권은 누구에게 가나"를 다시 고르게 하면
 * 대부분 안 고르고 그대로 둔다.
 */
export function removeParentLink(list: ParentLink[], token: string): ParentLink[] {
  return fixPrimary(list.filter((l) => l.token !== key(token)));
}

/** 주 부모를 바꾼다. 모르는 주소면 아무것도 안 바꾼다. */
export function setPrimaryParent(list: ParentLink[], token: string): ParentLink[] {
  const t = key(token);
  if (!list.some((l) => l.token === t)) return list;
  return list.map((l) => ({ ...l, isPrimary: l.token === t }));
}

/** 지금 주 부모. 목록이 비었으면 null. */
export function primaryParent(list: ParentLink[]): ParentLink | null {
  return list.find((l) => l.isPrimary) ?? list[0] ?? null;
}

/** 화면에 한 줄로. '엄마 폰 · 아빠 폰' */
export function parentLabels(list: ParentLink[]): string {
  return list.map((l) => l.label).join(' · ');
}
