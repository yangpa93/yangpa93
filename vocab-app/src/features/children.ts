/**
 * 한 부모 폰이 관리하는 아이들.
 *
 * ── 왜 수를 막는가 ───────────────────────────────────────────
 *
 * 아이는 **4명까지**다. 숫자를 안 막으면 두 가지가 조용히 망가진다.
 *
 *   - 부모 홈의 아이 목록이 끝없이 길어져 정작 볼 아이를 못 찾는다.
 *   - QR 을 잘못 찍어 남의 아이가 들어와도 아무도 눈치채지 못한다.
 *     (같은 아이가 앱을 다시 깔면 주소가 바뀌는데, 이름이 같으면 갱신으로
 *      처리되어 늘지 않는다. 그러니 수가 늘었다는 것은 정말 새 사람이라는
 *      뜻이고, 그때 한 번 멈춰 서는 것이 맞다.)
 *
 * 4로 잡은 것은 형제자매가 넷을 넘는 집이 드물기 때문이다. 더 필요하면
 * MAX_CHILDREN 만 올리면 된다 — 이 숫자를 쓰는 곳은 전부 여기를 본다.
 *
 * ── 아이는 두 곳에서 온다 ────────────────────────────────────
 *
 *   이 폰 안의 아이 프로필(profiles 중 kind === 'child')
 *   QR 로 이어져 리포트를 보내 오는 다른 폰의 아이(knownChildren)
 *
 * 한 아이가 양쪽에 다 있을 수 있다 — 부모 폰에서 프로필을 만들어 주고 아이
 * 폰과 연결까지 한 경우다. 그래서 **이름으로 합쳐서** 센다. 따로 세면
 * 아이 둘인 집이 넷으로 잡혀 더 못 넣게 된다.
 *
 * 화면(react-native)을 안 쓰는 순수 함수라 폰 없이 테스트한다.
 */

/** 한 부모 폰이 관리할 수 있는 아이 수 */
export const MAX_CHILDREN = 4;

/** 이 파일이 아이를 알아보는 데 필요한 것만. 실제 타입은 이보다 크다. */
export interface ChildProfileLike {
  kind: 'child' | 'parent';
  name: string;
}

export interface KnownChildLike {
  name: string;
}

/** 이름을 견주기 전에 다듬는다. 앞뒤 공백 하나 때문에 같은 아이가 둘이 된다. */
function key(name: string): string {
  return (name ?? '').trim();
}

/**
 * 이 폰이 관리하는 아이 이름들. 프로필과 QR 로 이어진 아이를 합쳐 중복을 없앤다.
 *
 * 들어온 순서를 지킨다 — 화면에 그대로 늘어놓을 수 있어야 한다.
 */
export function childNames(
  profiles: readonly ChildProfileLike[],
  known: readonly KnownChildLike[],
): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (raw: string) => {
    const k = key(raw);
    if (!k || seen.has(k)) return;
    seen.add(k);
    out.push(k);
  };
  for (const p of profiles ?? []) if (p.kind === 'child') push(p.name);
  for (const c of known ?? []) push(c.name);
  return out;
}

/** 지금 몇 명인지 */
export function childCount(
  profiles: readonly ChildProfileLike[],
  known: readonly KnownChildLike[],
): number {
  return childNames(profiles, known).length;
}

/** 한 명 더 넣을 자리가 있는지 */
export function hasRoomForChild(
  profiles: readonly ChildProfileLike[],
  known: readonly KnownChildLike[],
): boolean {
  return childCount(profiles, known) < MAX_CHILDREN;
}

/**
 * 이 이름을 받아들일 수 있는지.
 *
 * **이미 아는 이름이면 꽉 찼어도 받는다.** 그건 새 아이가 아니라 같은 아이의
 * 주소 갱신이기 때문이다. 앱을 다시 깔면 주소가 바뀌는데, 여기서 막으면
 * 넷째 아이는 폰을 바꾼 뒤로 영영 리포트를 못 보낸다.
 */
export function canAcceptChild(
  profiles: readonly ChildProfileLike[],
  known: readonly KnownChildLike[],
  name: string,
): boolean {
  const k = key(name);
  if (!k) return false;
  if (childNames(profiles, known).includes(k)) return true;
  return hasRoomForChild(profiles, known);
}

/** 화면에 그대로 쓰는 한 줄. 꽉 찼을 때 왜 안 되는지 말해 준다. */
export function childLimitMessage(): string {
  return `아이는 ${MAX_CHILDREN}명까지 연결할 수 있어요. 한 명을 지우면 새로 연결할 수 있습니다.`;
}
