/**
 * 다른 앱이 "이 파일 열어 줘"라고 넘겨 준 주소를 가려내는 규칙.
 *
 * ── 왜 필요한가 ──────────────────────────────────────────────
 *
 * 백업을 카톡으로 보냈더니 받는 쪽에서 "파일을 열 수 있는 앱이 없다"며
 * 내려받지 못했다. 카톡은 모르는 형식의 파일을 막는데 우리 백업은 json 이라
 * 거기 걸린다. 내려받기가 막히면 백업 파일이 대화방 안에 갇혀 버린다.
 *
 * 그런데 안드로이드에는 **다른 앱으로 열기**가 있다. 우리 앱이 "json 파일도
 * 열 줄 안다"고 등록해 두면 그 목록에 나타나고, 카톡은 내려받는 대신 우리
 * 앱에 파일을 그대로 넘겨 준다. 내려받기가 막혀도 길이 하나 남는 셈이다.
 *
 * ── 왜 가려내야 하는가 ───────────────────────────────────────
 *
 * 앱으로 들어오는 주소는 두 갈래다.
 *
 *   gomtangivoca://link?token=…   부모 연결 딥링크 — expo-router 가 처리한다
 *   content://…  ·  file://…      다른 앱이 넘긴 파일 — 우리가 처리한다
 *
 * 앞의 것까지 백업으로 열려고 하면 QR 로 연결할 때마다 백업 화면이 뜬다.
 * 그래서 **주소의 앞머리로 먼저 가른다.**
 *
 * 화면(react-native)을 안 쓰는 순수 함수라 폰 없이 테스트한다.
 */

/** 다른 앱이 넘긴 파일 주소인가. 우리 딥링크는 아니다. */
export function isOpenedFileUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  const u = url.trim().toLowerCase();
  return u.startsWith('content://') || u.startsWith('file://');
}

/**
 * 주소에서 파일 이름을 뽑는다. 못 뽑으면 빈 문자열.
 *
 * 화면에 "무엇을 열었는지" 적어 주려는 것뿐이다. content:// 주소는 이름이
 * 아예 없는 경우가 많아서(`content://media/external/…/1234`) 없으면 없는
 * 대로 둔다 — 억지로 지어내면 엉뚱한 이름이 화면에 남는다.
 */
export function fileNameFromUrl(url: string): string {
  try {
    const path = decodeURIComponent((url ?? '').split('?')[0]);
    const last = path.split('/').filter(Boolean).pop() ?? '';
    // 숫자만 있는 것은 이름이 아니라 내부 번호다.
    return /^\d+$/.test(last) ? '' : last;
  } catch {
    return '';
  }
}
