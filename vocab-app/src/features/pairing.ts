/**
 * 페어링과 전송 메시지의 순수 로직.
 *
 * 네이티브 모듈(expo-notifications 등)을 쓰지 않는다. 기기 없이 테스트할 수
 * 있어야 하고, 전송 규격이 어긋나면 부모님이 리포트를 못 받는데 그건
 * 실기기에서야 알아차리게 되기 때문이다. 실제 전송·수신은 `push.ts`가 한다.
 */

import { DailyReport, reportHeadline, reportText, WeeklySummary } from './report';
import { DailyRecord, Subject, SubjectTally, SUBJECT_LABEL } from '../types';
import appJson from '../../app.json';

/**
 * 딥링크 스킴.
 *
 * `app.json` 의 `scheme` 을 **직접 읽는다.** 두 곳에 따로 적어 두면 한쪽만
 * 바꿨을 때 링크가 조용히 안 열린다 — 앱은 멀쩡히 뜨고 아무 일도 안 일어나서
 * 무엇이 잘못됐는지 알기 어렵다. 한 곳만 보게 해서 어긋날 자리를 없앤다.
 */
export const LINK_SCHEME: string = appJson.expo.scheme;

export const EXPO_PUSH_ENDPOINT = 'https://exp.host/--/api/v2/push/send';

export interface PushPayload {
  childName: string;
  date: string;
  headline: string;
  detail: string;
  completed: boolean;
  /**
   * 보낸 아이 기기의 푸시 주소.
   *
   * 부모가 "공부하자"고 되보내려면 아이 기기 주소를 알아야 한다. 리포트에
   * 실어 보내면 부모가 따로 물어볼 일이 없다. 아이 기기가 주소를 못 받은
   * 경우(권한 거부 등)에는 없을 수 있다.
   */
  childToken?: string;
  /**
   * ── 아래 셋은 **부모 폰이 날짜별 보고서를 그리려고** 받는 것이다 ──────
   *
   * 예전에는 `headline` 한 줄만 보냈다. "오늘 목표 완료! 35개 · 정답률 83%"
   * 같은 **글**이라, 부모 폰에서 그것을 도로 숫자로 뜯어낼 수가 없었다.
   * 그래서 다른 폰의 아이는 달력도 갈래별 성적도 그릴 수 없었다.
   *
   * 아이가 이 폰에 프로필로 있으면 기록이 여기 있으니 문제가 없었는데,
   * 아이가 제 폰을 쓰면 부모 폰에는 저 한 줄 말고 아무것도 없다.
   */
  /** 갈래별 성적(en·ko·daily). 날짜별 보고서의 국어·영어 칸이 이것으로 그려진다. */
  bySubject?: Partial<Record<Subject, SubjectTally>>;
  /**
   * 그날 틀린 낱말 **id**. 중복을 그대로 둔다 — 두 번 틀리면 두 번 들어간다.
   *
   * **이름과 뜻은 안 보낸다.** 부모 폰에도 같은 어휘 파일이 들어 있어서 id 만
   * 있으면 찾을 수 있다. 글자를 실어 보내면 알림 한 통에 안 들어간다.
   *
   * 배운 낱말(단어장)은 안 보낸다. 하루 서른 개가 넘는 날이 있어 알림이
   * 잘리는데, 단어장은 아이 폰 달력에서 보면 된다.
   */
  wrongIds?: string[];
  /** 그날 만난 낱말 수와 목표. 달력 칸의 진하기를 정한다. */
  studied?: number;
  goal?: number;
}

/**
 * 아이 기기가 연결하면서 자기 주소를 알리는 인사.
 *
 * 리포트로 대신할 수는 없다. 부모가 부르고 싶은 때가 바로 리포트가 안 온
 * 날이기 때문이다. 연결하는 순간에 한 번 보내 둔다.
 */
export interface HelloPayload {
  childName: string;
  childToken: string;
}

/** 부모가 아이에게 보내는 알림. 리포트와 반대 방향이다. */
export interface NudgePayload {
  /** 보낸 사람 표시. '엄마 폰' 처럼 */
  from: string;
  message: string;
}

/** 페어링용 딥링크. 부모 기기가 만들어 카톡 등으로 아이 기기에 보낸다. */
export function buildLinkUrl(token: string, label: string): string {
  return `${LINK_SCHEME}://link?token=${encodeURIComponent(token)}&label=${encodeURIComponent(label)}`;
}

/**
 * 딥링크에서 토큰과 이름을 꺼낸다.
 *
 * 링크를 눌러 들어올 때는 expo-router 가 값을 갈라서 넘겨 주지만, **QR 을
 * 찍었을 때는 문자열 하나가 통째로 들어온다.** 카메라가 읽어 온 그 문자열을
 * 여기서 읽는다.
 *
 * 우리 링크가 아니면 null 이다. 아이가 아무 QR 이나 찍어 볼 수 있으므로
 * (과자 봉지, 버스 정류장) 우리 것인지 먼저 가린다.
 *
 * **길(`://link`)까지 본다.** 아이가 띄우는 QR 은 `://child` 인데 거기에도
 * `token` 이 실려 있어서, 스킴만 보면 아이 QR 을 부모 QR 로 읽어 버린다.
 * 그러면 아이가 다른 아이의 QR 을 찍었을 때 그 아이를 부모로 등록한다.
 */
export function parseLinkUrl(url: string): { token: string; label: string } | null {
  const params = queryOf(url, 'link');
  if (!params) return null;

  const token = (params.get('token') ?? '').trim();
  if (!isValidPushToken(token)) return null;

  return { token, label: (params.get('label') ?? '').trim() || '부모님 폰' };
}

/* ------------------------------------------------------------------ */
/* 아이가 QR 을 만들고 부모가 찍는 길                                     */
/* ------------------------------------------------------------------ */

/**
 * **왜 방향을 뒤집었는가.**
 *
 * 지금까지는 부모가 QR 을 띄우고 아이가 찍었다. 그런데 부모님 모드에 들어가
 * 보면 "이 기기에 등록된 아이가 없습니다"만 뜨고, 아이를 등록하려면 QR 이
 * 있어야 하는데 그 QR 을 만들 자리가 없었다. 부모 폰에서 시작하는 길이
 * 스스로 막혀 있었던 것이다.
 *
 * 이제는 **아이가 자기 QR 을 만들고 부모가 찍는다.** 순서가 자연스럽다 —
 * 아이는 자기 이름과 주소를 이미 갖고 있고, 부모는 아이 폰을 들여다보며
 * 찍기만 하면 된다. 부모 폰에는 그 순간 아이가 등록된다.
 *
 * 부모 폰의 주소는 찍은 뒤에 부모가 아이에게 되보낸다(`link-back`).
 * 아이 주소를 방금 알았으니 보낼 수 있고, 아이는 아무것도 더 하지 않아도
 * 연결이 마무리된다.
 */
export interface ChildLink {
  token: string;
  name: string;
}

/** 아이 기기가 띄우는 QR. 부모 기기가 찍는다. */
export function buildChildLinkUrl(token: string, name: string): string {
  return `${LINK_SCHEME}://child?token=${encodeURIComponent(token)}&name=${encodeURIComponent(name)}`;
}

/**
 * 아이 QR 을 읽는다. 우리 것이 아니면 null.
 *
 * 부모가 아무 QR 이나 찍어 볼 수 있으므로(과자 봉지, 명함) 우리 것인지
 * 먼저 가린다. 부모 QR(`://link`)과도 구별해야 한다 — 부모 폰에서 부모 QR 을
 * 찍으면 자기 자신을 아이로 등록하게 된다.
 */
export function parseChildLinkUrl(url: string): ChildLink | null {
  const params = queryOf(url, 'child');
  if (!params) return null;

  const token = (params.get('token') ?? '').trim();
  if (!isValidPushToken(token)) return null;

  return { token, name: (params.get('name') ?? '').trim() || '아이' };
}

/**
 * 부모가 아이에게 자기 주소를 되보내는 인사.
 *
 * 아이 화면에서는 아무 일도 시키지 않는다. 알림을 누르지 않아도 적용된다 —
 * 아이가 알림을 지나쳐 버리면 연결이 반만 된 채로 남고, 그러면 리포트가
 * 영영 안 간다.
 */
export interface LinkBackPayload {
  parentToken: string;
  parentLabel: string;
}

export function buildLinkBackBody(childToken: string, payload: LinkBackPayload) {
  return {
    to: childToken,
    title: '🔗 부모님 폰과 연결됐어요',
    body: `${payload.parentLabel}에 오늘 기록이 갑니다.`,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'child-nudge',
    data: { kind: 'link-back', ...payload },
  };
}

export function parseLinkBack(data: unknown): LinkBackPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'link-back') return null;
  if (typeof d.parentToken !== 'string' || !isValidPushToken(d.parentToken)) return null;
  return {
    parentToken: d.parentToken,
    parentLabel:
      typeof d.parentLabel === 'string' && d.parentLabel.trim() ? d.parentLabel.trim() : '부모님 폰',
  };
}

/**
 * 부모가 연결을 끊었다고 아이에게 알린다.
 *
 * ── 왜 아이에게도 알려야 하나 ───────────────────────────────
 *
 * 연결은 양쪽에 하나씩 있다. 부모 폰에는 '아이 주소', 아이 폰에는 '부모 주소'.
 * 부모 쪽만 지우면 **아이는 계속 보낸다.** 그리고 리포트가 도착하면 부모 앱이
 * 그 아이를 다시 목록에 넣는다(PushBridge). 지운 아이가 며칠 뒤 되살아나는
 * 셈이라, 지운 사람 눈에는 앱이 고장 난 것으로 보인다.
 *
 * 그래서 끊는 것도 양쪽에서 한다. 아이 폰은 이 알림을 받아 그 부모만
 * 목록에서 뺀다 — 엄마 폰을 끊어도 아빠 폰은 그대로 남는다.
 *
 * 알림을 **누르지 않아도** 적용된다. 아이가 지나쳐 버리면 계속 보내게 되고,
 * 그러면 끊은 것이 끊은 것이 아니다.
 */
export interface UnlinkPayload {
  /** 끊는 부모 폰의 주소. 아이는 이것으로 누구를 뺄지 가린다. */
  parentToken: string;
  /** 화면에 적을 이름. '엄마 폰' */
  parentLabel: string;
}

export function buildUnlinkBody(childToken: string, payload: UnlinkPayload) {
  return {
    to: childToken,
    title: '🔌 부모님 폰 연결이 끊겼어요',
    body: `${payload.parentLabel}으로는 이제 기록이 가지 않아요.`,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'child-nudge',
    data: { kind: 'unlink', ...payload },
  };
}

export function parseUnlink(data: unknown): UnlinkPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'unlink') return null;
  if (typeof d.parentToken !== 'string' || !isValidPushToken(d.parentToken)) return null;
  return {
    parentToken: d.parentToken,
    parentLabel:
      typeof d.parentLabel === 'string' && d.parentLabel.trim() ? d.parentLabel.trim() : '부모님 폰',
  };
}

/**
 * 이름을 바꾸기 전에 쓰던 스킴들. **읽을 때만 받는다.**
 *
 * 앱 주소는 `urivocab` → `gomtangvoca` → `gomtangivoca` 로 두 번 바뀌었다.
 * 그런데 **두 폰의 판이 같으리라는 보장이 없다.** 아이 폰에 지난달 APK 가
 * 깔려 있으면 그 폰이 띄우는 QR 은 옛 주소로 만들어진다. 부모 폰이 그것을
 * "우리 것이 아니다" 하고 조용히 넘기면, 찍어도 찍어도 아무 일이 안 일어난다.
 * 무엇이 잘못됐는지 알 길이 없는 가장 나쁜 모양이다.
 *
 * 그래서 **옛 주소를 전부 읽는다.** 새로 만드는 것은 늘 지금 주소다.
 */
const OLD_LINK_SCHEMES = ['gomtangvoca', 'urivocab'];

/**
 * 우리 딥링크에서 물음표 뒤를 읽는다.
 *
 * URL 클래스는 낯선 스킴의 검색 문자열을 기기마다 다르게 다룬다. 직접 읽는
 * 편이 어디서나 똑같이 동작한다. 길(`link` / `child`)이 다르면 null 이다.
 */
function queryOf(url: string, path: string): Map<string, string> | null {
  const raw = url.trim();
  const mine =
    raw.startsWith(`${LINK_SCHEME}://${path}?`) ||
    OLD_LINK_SCHEMES.some((s) => raw.startsWith(`${s}://${path}?`));
  if (!mine) return null;

  const params = new Map<string, string>();
  for (const pair of raw.slice(raw.indexOf('?') + 1).split('&')) {
    const eq = pair.indexOf('=');
    if (eq < 0) continue;
    try {
      params.set(decodeURIComponent(pair.slice(0, eq)), decodeURIComponent(pair.slice(eq + 1)));
    } catch {
      // 망가진 링크. 그 값만 건너뛴다.
    }
  }
  return params;
}

/* ------------------------------------------------------------------ */
/* 찍은 것 하나를 가린다                                                  */
/* ------------------------------------------------------------------ */

/**
 * 카메라가 읽어 온 문자열이 무엇인지.
 *
 * `token` 은 주소만 있고 **누구인지 모르는** 경우다. 짧은 코드나 토큰을
 * 그대로 QR 로 만든 것이 여기 걸린다.
 */
export type Scanned =
  | { kind: 'child'; token: string; name: string }
  | { kind: 'parent'; token: string; label: string }
  | { kind: 'token'; token: string };

/**
 * 찍은 문자열 하나를 가린다. 우리 것이 아니면 null.
 *
 * ── 왜 한 자리로 모았나 ──────────────────────────────────────
 *
 * 예전에는 화면(scan.tsx)에서 `parseChildLinkUrl` 과 `parseLinkUrl` 을 차례로
 * 부르고, 둘 다 null 이면 **조용히 넘겼다.** 아무 QR 이나 찍어 볼 수 있으니
 * 시끄럽지 않게 한다는 뜻이었는데, 대가가 컸다 — 제대로 된 QR 을 찍었는데
 * 안 될 때에도 화면이 똑같이 아무 말이 없다. 그러면 몇 번을 더 찍어 보다가
 * 앱이 고장 났다고 여긴다. 실제로 그런 말을 들었다.
 *
 * 이제 가리는 일은 여기서 다 하고, 화면은 **무엇이 나왔는지 말할 수 있게**
 * 된다. 순수 함수라 기기 없이 확인한다.
 *
 * 주소만 있는 QR(`token`)도 받는다. 우리가 만드는 QR 은 아니지만, 부모가
 * 아이 폰의 짧은 코드를 다른 방법으로 QR 로 만들어 오는 일이 있고, 읽을 수
 * 있는 것을 굳이 막을 이유가 없다.
 */
export function parseScanned(text: string): Scanned | null {
  const child = parseChildLinkUrl(text);
  if (child) return { kind: 'child', token: child.token, name: child.name };

  const parent = parseLinkUrl(text);
  if (parent) return { kind: 'parent', token: parent.token, label: parent.label };

  const bare = fromShortCode(text);
  if (bare) return { kind: 'token', token: bare };

  return null;
}

/**
 * 우리 것이 아닌 QR 을 찍었을 때 화면에 적을 말.
 *
 * 읽어 온 것을 앞부분만 함께 보여 준다. "QR 이 아니에요" 한 줄만 두면 카메라가
 * 읽기는 한 것인지조차 알 수 없어서, 폰을 더 가까이 대야 하는지 다른 QR 을
 * 띄워야 하는지 판단할 수가 없다.
 */
export function scannedError(text: string): string {
  const shown = text.trim().slice(0, 40);
  return (
    `이 QR 은 곰탱이보카 것이 아니에요.\n읽은 내용 — ${shown}${text.trim().length > 40 ? '…' : ''}` +
    `\n\n아이 폰에서 ⚙️ 설정 → 부모님과 연결하기 → 📱 내 QR 띄우기 로 띄운 QR 을 찍어 주세요.`
  );
}

/* ------------------------------------------------------------------ */
/* 연결 코드 — 아무것도 안 깔린 기기를 위한 길                            */
/* ------------------------------------------------------------------ */

/**
 * 부모 폰 화면에 띄우는 짧은 코드.
 *
 * **왜 필요한가.** 지금까지는 부모가 링크를 만들어 카카오톡으로 보내야
 * 했다. 그런데 아이에게 새 태블릿을 사 주고 이 앱만 깔았다면 그 기기에는
 * 카톡도 메일도 없다. 링크를 보낼 곳이 없어 연결 자체가 막힌다.
 *
 * 그래서 부모 폰 화면에 코드를 띄우고 아이가 보고 입력하게 한다. 인터넷도
 * 다른 앱도 필요 없고, 두 기기가 나란히 있기만 하면 된다.
 *
 * 푸시 토큰은 `ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]` 형태다. 껍데기는
 * 늘 같으니 안쪽만 보여 주고, 넉 자씩 끊어 눈이 자리를 잃지 않게 한다.
 * 끝에 검사 문자 하나를 붙여, 한 글자만 잘못 쳐도 그 자리에서 알려 준다.
 * 안 그러면 '보내기'를 눌러 실패할 때까지 무엇이 틀렸는지 알 수 없다.
 *
 * **끊는 자리는 공백으로 표시한다.** 처음에는 하이픈을 썼는데, 푸시 토큰은
 * base64url 이라 `-` 와 `_` 를 글자로 쓴다. 하이픈으로 끊으면 토큰이 원래
 * 갖고 있던 하이픈과 구별되지 않아, 되돌릴 때 그 글자까지 지워 버린다.
 *
 * ── 끊어 적는 것을 그만뒀다 ─────────────────────────────────
 *
 * 처음에는 빈칸으로 넉 자씩 끊었다. 눈이 자리를 잃지 말라고 넣은 것인데,
 * 푸시 토큰은 base64url 이라 `-` 와 `_` 를 **글자로** 쓴다. 그래서 실제로
 * 이런 것이 떴다.
 *
 *     WLDv RDLX NikW -PbJ kPm1 vYF
 *
 * 넷째 토막이 하이픈으로 시작한다. 빈칸 바로 뒤에 하이픈이 오면 그것이
 * 글자인지 끊는 표시인지 사람은 가릴 수 없고, 그래서 "빈칸도 넣어야 하는
 * 건지 헷갈립니다" 라는 말을 들었다.
 *
 * 넉 자씩 네모에 넣어 봤더니 헷갈림은 없어졌는데 **옮겨 적을 것이 일곱 줄**이
 * 됐다. 스물세 글자를 대소문자까지 맞춰 손으로 치는 일 자체가 남아 있었다.
 *
 * 그래서 **끊지 않는다.** 한 덩어리로 두고 복사해 쓰게 한다. 옮겨 적지 않는
 * 것이 가장 좋다 — 손으로 치는 일이 없어지면 틀릴 일도 없다.
 *
 * 되돌리는 쪽은 예나 지금이나 공백을 종류 가리지 않고 다 걷어내므로,
 * **빈칸으로 끊어 적은 옛 코드도 그대로 읽힌다.**
 */
export function toShortCode(token: string): string {
  return toShortCodeLines(token).join('');
}

/**
 * 사람이 보고 옮겨 적을 코드. **넉 자씩 잘라 줄 목록으로 돌려준다.**
 *
 * ── 왜 한 줄이면 안 되나 ────────────────────────────────────
 *
 * 한 줄로 이어 붙이면 이렇게 나온다.
 *
 *     토큰   ExponentPushToken[dK9-xY2_pQrS4tUvWz]
 *     코드   dK9- xY2_ pQrS 4tUv WzN
 *
 * 빈칸은 넉 자씩 끊어 읽으라고 넣은 것이다. 그런데 푸시 토큰은 base64url 이라
 * `-` 와 `_` 를 **글자로** 쓴다. 그러니 `dK9- xY2_` 를 보고 있으면 그 빈칸이
 * 끊는 자리인지 코드의 일부인지 알 수가 없다. 옮겨 적으면 틀릴 수밖에 없다.
 * 되돌리는 쪽(`fromShortCode`)은 빈칸을 다 걷어내므로 기계는 멀쩡한데,
 * **사람이 틀린다.**
 *
 * 줄을 바꾸면 그 헷갈림이 통째로 사라진다. 끊는 자리에는 아무 글자도 없고,
 * 줄 안에 보이는 `-` 와 `_` 는 전부 코드의 글자다. 옮겨 적을 것이 한 줄에
 * 넉 자뿐이라 눈이 자리를 잃지도 않는다.
 *
 * **옛 코드는 그대로 읽힌다.** 되돌리는 쪽은 예나 지금이나 공백 종류를 가리지
 * 않고 다 걷어낸다(`\s`). 빈칸으로 끊어 적은 옛 코드도, 줄로 끊은 새 코드도
 * 같은 토큰으로 돌아온다.
 */
export function toShortCodeLines(token: string): string[] {
  const inner = innerOf(token);
  if (!inner) return [];
  const body = inner + checksumChar(inner);
  return body.match(/.{1,4}/g) ?? [];
}

/**
 * 아이가 입력한 코드를 다시 토큰으로 되돌린다.
 *
 * 코드가 아니라 토큰을 통째로 붙여넣었으면 그대로 쓴다 — 카톡으로 받은
 * 아이는 그 길을 그대로 쓰면 되고, 어느 쪽으로 왔는지 아이가 구별할 이유가
 * 없다.
 *
 * 되돌리지 못하면 null 이다. 무엇이 잘못됐는지는 `shortCodeError` 가 말해 준다.
 */
export function fromShortCode(code: string): string | null {
  const raw = code.trim();
  if (raw === '') return null;

  // 토큰을 통째로 넣은 경우
  if (/^Expo(nent)?PushToken\[[^\]]+\]$/.test(raw)) return raw;

  // 사람이 읽기 좋으라고 넣은 공백만 걷어낸다. 하이픈은 토큰의 글자다.
  const body = raw.replace(/\s/g, '');
  if (body.length < 2) return null;

  const inner = body.slice(0, -1);
  const check = body.slice(-1);
  if (checksumChar(inner) !== check) return null;

  return `ExponentPushToken[${inner}]`;
}

/** 코드가 왜 안 되는지 한 줄로. 화면에 그대로 쓴다. */
export function shortCodeError(code: string): string {
  const raw = code.trim();
  if (raw === '') return '';
  if (fromShortCode(raw)) return '';

  const body = raw.replace(/\s/g, '');
  if (!/^[A-Za-z0-9_\-[\]]+$/.test(body)) {
    return '코드에 없는 글자가 있어요. 숫자와 영문자만 들어갑니다.';
  }
  if (body.length < 10) return '코드가 짧아요. 끝까지 다 입력했는지 확인해 주세요.';
  // 길이는 맞는데 검사 문자가 안 맞으면 어딘가 한 글자를 잘못 쳤다는 뜻이다.
  return '코드가 맞지 않아요. 대문자와 소문자를 구별해서 다시 확인해 주세요.';
}

/** `ExponentPushToken[...]` 의 안쪽. 껍데기가 없으면 통째로 본다. */
function innerOf(token: string): string {
  const m = token.trim().match(/^Expo(?:nent)?PushToken\[([^\]]+)\]$/);
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{20,}$/.test(token.trim()) ? token.trim() : '';
}

/**
 * 검사 문자 하나.
 *
 * 오타를 잡으려는 것이지 위조를 막으려는 것이 아니다. 글자 값을 자리마다
 * 다른 무게로 더해, 한 글자가 바뀌거나 두 글자가 자리를 바꿔도 값이 달라지게
 * 한다. 단순히 더하기만 하면 자리를 바꾼 오타를 못 잡는다.
 */
function checksumChar(inner: string): string {
  const ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let sum = 0;
  for (let i = 0; i < inner.length; i++) {
    sum = (sum + inner.charCodeAt(i) * (i + 1)) % ALPHABET.length;
  }
  return ALPHABET[sum];
}

/* ------------------------------------------------------------------ */
/* 미리보기용 가짜 주소 — 노트북에서 연결을 끝까지 시험하려고               */
/* ------------------------------------------------------------------ */

/**
 * 가짜 주소임을 알아보게 하는 표.
 *
 * 진짜 Expo 토큰의 안쪽은 base64url 로 아무렇게나 뽑힌 글자라, 사람이 읽을 수
 * 있는 낱말이 앞에 붙는 일이 없다. 그래서 이 표가 붙어 있으면 우리가 만든
 * 것이라고 봐도 된다.
 */
const PREVIEW_MARK = 'Preview-';

/**
 * 노트북 브라우저에서 쓸 **가짜 푸시 주소**를 만든다. 웹이 아니면 null.
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * 지금 `npm run preview`(웹)에서는 진짜 푸시 주소를 받을 수 없다 — 브라우저에
 * FCM 이 없다. 그래서 아이 화면에서 '📱 내 QR 띄우기' 를 눌러도 QR 이 안 뜨고,
 * **연결이라는 흐름 전체를 노트북에서 한 번도 시험해 볼 수가 없었다.** 확인할
 * 방법이 없으니 고쳤는지 안 고쳤는지도 말할 수 없었다. 그게 이번 일의 절반이다.
 *
 * 그래서 웹에서만 진짜처럼 생긴 가짜 주소를 하나 만들어 준다. 그러면 창 두
 * 개로 아이 → 부모 흐름을 끝까지 눌러 볼 수 있다.
 *
 * ── 실제 폰에서는 절대 안 만든다 ────────────────────────────
 *
 * 가짜 주소가 실기기로 새어 나가면 최악이다 — 리포트가 안 가는데 화면에는
 * "연결됨" 이라고 뜬다. 조용한 실패다.
 *
 * 그래서 판단을 **여기 순수 함수 하나로** 몰아 두고, 무엇으로 판단하는지를
 * 밖에서 넘겨받는다. 실제 폰의 `Platform.OS` 는 늘 'android' 또는 'ios' 라
 * 이 문은 그 두 곳에서 절대 열리지 않는다. 기기 없이 시험으로 못박을 수
 * 있다는 것이 이 모양의 값어치다.
 *
 * @param platform `Platform.OS` 를 그대로. 이 파일이 react-native 를 안 읽으려고 밖에서 받는다.
 */
export function previewPushToken(platform: string, rand: () => number = Math.random): string | null {
  if (platform !== 'web') return null;

  // 진짜 토큰과 같은 글자판(base64url)으로 채운다. 짧은 코드로 되돌리는 길도
  // 그대로 통해야 노트북 시험이 실제와 같은 길을 밟는다.
  const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let tail = '';
  for (let i = 0; i < 16; i++) tail += ALPHABET[Math.floor(rand() * ALPHABET.length)];
  return `ExponentPushToken[${PREVIEW_MARK}${tail}]`;
}

/**
 * 미리보기용 가짜 주소인지.
 *
 * 두 곳에서 쓴다. 화면에는 **가짜라고 적어 주려고**(안 적으면 스크린샷만 보고
 * 진짜 연결된 줄 안다), 전송할 때는 **Expo 서버에 보내지 않으려고**. 가짜
 * 주소를 진짜 서버에 보내면 반드시 실패하고, 확인하려던 흐름이 거기서 끊긴다.
 */
export function isPreviewToken(token: string): boolean {
  return new RegExp(`^Expo(nent)?PushToken\\[${PREVIEW_MARK}`).test(token.trim());
}

/**
 * 붙여넣은 값이 푸시 토큰처럼 생겼는지 본다.
 *
 * 카카오톡에서 복사하면 앞뒤 공백이 딸려 오기 쉬워서 먼저 다듬는다.
 * 진짜 유효한지는 보내 봐야 알 수 있고, 여기서는 오타를 거르는 정도만 한다.
 */
export function isValidPushToken(token: string): boolean {
  const t = token.trim();
  if (/^Expo(nent)?PushToken\[[^\]]+\]$/.test(t)) return true;
  // 다른 형식으로 바뀌더라도 막지 않도록 최소 길이만 확인한다.
  return /^[A-Za-z0-9_-]{20,}$/.test(t);
}

/** 리포트를 전송용 페이로드로 만든다. */
export function toPayload(
  report: DailyReport,
  weekly?: WeeklySummary,
  childToken?: string | null,
  /**
   * 그날 기록 원본. 갈래별 성적과 틀린 낱말 id 를 여기서 뜯어 싣는다.
   *
   * 없어도 된다 — 옛 기록을 다시 보낼 때처럼 원본이 없는 자리가 있다. 그때는
   * 예전처럼 한 줄만 가고, 부모 폰 달력에서 그날은 「나눠 적기 전」 으로 뜬다.
   */
  day?: DailyRecord | null,
): PushPayload {
  return {
    childName: report.profileName,
    date: report.date,
    headline: reportHeadline(report),
    detail: reportText(report, weekly),
    completed: report.completed,
    ...(childToken ? { childToken } : {}),
    ...(day?.bySubject ? { bySubject: day.bySubject } : {}),
    /*
     * 틀린 낱말은 **id 만** 싣는다. 부모 폰에도 같은 어휘가 있어 이름과 뜻은
     * 거기서 찾는다. 스물을 넘기면 자른다 — 알림 한 통에 담을 수 있는 양에
     * 한계가 있고, 화면에는 자주 틀린 것 몇 개만 보여 준다.
     */
    ...(day?.wrongEntryIds?.length ? { wrongIds: day.wrongEntryIds.slice(0, 20) } : {}),
    ...(day ? { studied: day.studied, goal: day.goal } : {}),
  };
}

/** 받은 푸시에서 리포트를 꺼낸다. 우리 형식이 아니면 null. */
export function parseIncoming(data: unknown): PushPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'daily-report') return null;
  if (typeof d.childName !== 'string' || typeof d.date !== 'string') return null;
  return {
    childName: d.childName,
    date: d.date,
    ...(typeof d.childToken === 'string' ? { childToken: d.childToken } : {}),
    headline: typeof d.headline === 'string' ? d.headline : '',
    detail: typeof d.detail === 'string' ? d.detail : '',
    completed: d.completed === true,
    /*
     * 아래 넷은 **옛 앱이 보낸 알림에는 없다.** 아이 폰과 부모 폰의 판이
     * 다를 수 있으니(한쪽만 먼저 깔았을 때) 없으면 없는 대로 둔다. 그날은
     * 부모 화면에서 「나눠 적기 전」 으로 뜬다.
     */
    ...(isTally(d.bySubject) ? { bySubject: d.bySubject } : {}),
    ...(isStringArray(d.wrongIds) ? { wrongIds: d.wrongIds } : {}),
    ...(typeof d.studied === 'number' ? { studied: d.studied } : {}),
    ...(typeof d.goal === 'number' ? { goal: d.goal } : {}),
  };
}

/**
 * 알림으로 온 값을 그대로 믿지 않는다.
 *
 * 남이 보낸 것이 아니라 우리 앱끼리 주고받는 것이지만, 판이 다른 앱이 보낸
 * 것일 수 있고 도중에 깨질 수도 있다. 숫자 자리에 글이 들어오면 화면이
 * 죽는데, 부모 폰에서 죽으면 왜 그런지 알 길이 없다.
 */
function isTally(v: unknown): v is Partial<Record<Subject, SubjectTally>> {
  if (!v || typeof v !== 'object' || Array.isArray(v)) return false;
  for (const val of Object.values(v as Record<string, unknown>)) {
    if (!val || typeof val !== 'object') return false;
    const t = val as Record<string, unknown>;
    if (typeof t.studied !== 'number' || typeof t.correct !== 'number' || typeof t.wrong !== 'number') {
      return false;
    }
  }
  return true;
}

function isStringArray(v: unknown): v is string[] {
  return Array.isArray(v) && v.every((x) => typeof x === 'string');
}

/** Expo 푸시 서버에 보낼 요청 본문. */
export function buildPushBody(token: string, payload: PushPayload) {
  return {
    to: token,
    title: `📚 ${payload.childName} 학습 리포트`,
    body: payload.headline,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'parent-report',
    // 부모 앱이 화면에 쌓아 두려고 원본을 같이 싣는다.
    data: { kind: 'daily-report', ...payload },
  };
}

/**
 * 부모 → 아이 알림.
 *
 * 리포트가 안 왔을 때 부모가 부를 수 있어야 한다. 문자를 따로 보내는 것보다
 * 앱 알림이 낫다 — 누르면 바로 공부 화면으로 들어간다.
 */
export function buildNudgeBody(token: string, payload: NudgePayload) {
  return {
    to: token,
    title: `📚 ${payload.from}`,
    body: payload.message,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'child-nudge',
    data: { kind: 'nudge', ...payload },
  };
}

/** 받은 푸시에서 부모의 알림을 꺼낸다. 우리 형식이 아니면 null. */
export function parseNudge(data: unknown): NudgePayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'nudge') return null;
  if (typeof d.message !== 'string' || d.message.length === 0) return null;
  return { from: typeof d.from === 'string' ? d.from : '부모님', message: d.message };
}

export function buildHelloBody(parentToken: string, payload: HelloPayload) {
  return {
    to: parentToken,
    title: '🔗 연결됐어요',
    body: `${payload.childName}의 기기가 연결됐어요.`,
    sound: 'default' as const,
    priority: 'normal' as const,
    channelId: 'parent-report',
    data: { kind: 'hello', ...payload },
  };
}

/**
 * 아이가 동기 부여 요청권을 신청했을 때 **주 부모에게만** 보내는 알림.
 *
 * 리포트는 연결된 폰 전부가 받지만 이것은 하나에만 간다. 엄마와 아빠가
 * 각각 승인하면 같은 것을 두 번 주게 되기 때문이다. 누가 받을지는 아이가
 * 자기 ⚙️ 설정에서 고른다.
 *
 * 알림 하나로 끝난다 — 부모가 여기서 바로 승인하지는 못한다. 승인은 부모
 * 폰에 그 아이 프로필이 있어야 하는 일이라, 지금은 "요청이 왔다"는 것만
 * 알린다. 그것만으로도 부모가 아이에게 말을 걸 수 있고, 몰라서 못 주는
 * 일은 없어진다.
 */
export interface RewardAskPayload {
  childName: string;
  /** 화면에 그대로 쓰는 한 줄. 예: '영어 중학교 레벨 하나를 끝냈어요' */
  reason: string;
  /** 신청 금액(원) */
  amount: number;
  /**
   * ── 아래는 **부모가 그 자리에서 승인할 수 있게** 하려고 싣는 것이다 ──────
   *
   * 예전에는 위 셋만 보내고 알림 하나로 끝냈다. 부모는 "요청이 왔다"는 것만
   * 알 뿐, 승인하려면 아이 폰이 필요했다. 그래서 아이 화면에는 「부모님 확인
   * 기다리는 중」 이라고 떠 있는데 부모 폰에는 그 요청이 아예 없었다.
   */
  /** 아이 폰이 붙인 고유 번호. 같은 알림이 두 번 와도 한 번만 쌓으려고 쓴다. */
  askId?: string;
  /** dailyDone · monthlyPurse · levelup … 무엇으로 받는 것인지 */
  askKind?: string;
  /** dailyDone 이면 어느 날 (yyyy-mm-dd) */
  date?: string;
  /** monthlyPurse 면 어느 달 (yyyy-mm) */
  month?: string;
  /** 부모가 얹어 줄 수 있는 금액의 제안값. 0이면 얹는 칸을 안 낸다. */
  effortSuggestion?: number;
  /** 아이가 덧붙인 한마디 */
  note?: string;
  /** 아이 기기 주소. 부모가 승인 결과를 되보내려면 필요하다. */
  childToken?: string;
}

/**
 * 부모가 판단한 결과를 아이에게 되보낸다.
 *
 * **이게 없으면 반쪽이다.** 부모가 승인해도 아이 폰은 그대로 「기다리는 중」
 * 이고, 저금통에도 안 쌓인다. 아이 입장에서는 눌러 봐야 아무 일도 안 일어나는
 * 단추가 된다.
 *
 * 부모가 적은 한마디도 같이 간다. 돈만 오가면 심부름값이 되는데, 이 한 줄이
 * 있으면 "오늘 잘했다" 는 말이 아이 화면에 남는다.
 */
export interface RewardDecisionPayload {
  /** 아이 폰이 붙였던 번호. 어느 신청에 대한 답인지 가린다. */
  askId: string;
  approved: boolean;
  /** 실제로 주기로 한 금액(원). 부모가 공로금을 얹었으면 그만큼 늘어 있다. */
  amount: number;
  /** 부모가 남긴 한마디 */
  parentNote: string;
  /** 누가 판단했는지. 아이 화면에 「엄마 폰」 처럼 적는다. */
  from: string;
}

export function buildRewardDecisionBody(childToken: string, payload: RewardDecisionPayload) {
  const won = payload.amount.toLocaleString('ko-KR');
  return {
    to: childToken,
    title: payload.approved ? '🎉 승인됐어요!' : '🎟️ 부모님이 답하셨어요',
    body: payload.approved
      ? `${won}원을 주기로 하셨어요.${payload.parentNote ? ` "${payload.parentNote}"` : ''}`
      : `이번엔 다음 기회에.${payload.parentNote ? ` "${payload.parentNote}"` : ''}`,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'child-nudge',
    data: { kind: 'reward-decision', ...payload },
  };
}

/** 받은 푸시에서 부모의 판단을 꺼낸다. 우리 형식이 아니면 null. */
export function parseRewardDecision(data: unknown): RewardDecisionPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'reward-decision') return null;
  if (typeof d.askId !== 'string' || d.askId === '') return null;
  return {
    askId: d.askId,
    approved: d.approved === true,
    amount: typeof d.amount === 'number' ? d.amount : 0,
    parentNote: typeof d.parentNote === 'string' ? d.parentNote : '',
    from: typeof d.from === 'string' ? d.from : '부모님',
  };
}

export function buildRewardAskBody(parentToken: string, payload: RewardAskPayload) {
  return {
    to: parentToken,
    title: '🎟️ 동기 부여 요청권 신청',
    body: `${payload.childName} — ${payload.reason} (${payload.amount.toLocaleString('ko-KR')}원)`,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'parent-report',
    data: { kind: 'reward-ask', ...payload },
  };
}

/**
 * 아이가 **제 공부 설정을 바꿨을 때** 주 부모에게 보내는 알림.
 *
 * 아이가 자기 레벨과 과목을 고를 수 있게 되면서 생겼다. 부모가 정한 것이
 * 기본값이고 아이는 거기서 옮겨 가는 것인데, 부모가 그것을 모르면 리포트만
 * 갑자기 달라진 것으로 보인다. **막지 않고 알리기만 한다** — 스스로 정하게
 * 두는 것이 이 앱의 방식이고, 부모는 알고 나서 이야기하면 된다.
 *
 * 요청권 신청과 같이 **주 부모에게만** 간다. 엄마와 아빠가 같은 알림을 각각
 * 받으면 둘 다 아이에게 물어보게 된다.
 */
export interface SettingsChangedPayload {
  childName: string;
  /** 화면에 그대로 쓰는 한 줄. 예: '영어 레벨을 중1-2 로 바꿨어요' */
  what: string;
}

export function buildSettingsChangedBody(parentToken: string, payload: SettingsChangedPayload) {
  return {
    to: parentToken,
    title: '⚙️ 아이가 공부 설정을 바꿨어요',
    body: `${payload.childName} — ${payload.what}`,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'parent-report',
    data: { kind: 'settings-changed', ...payload },
  };
}

/** 받은 푸시에서 설정 변경 알림을 꺼낸다. 우리 형식이 아니면 null. */
export function parseSettingsChanged(data: unknown): SettingsChangedPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'settings-changed') return null;
  if (typeof d.childName !== 'string' || !d.childName.trim()) return null;
  if (typeof d.what !== 'string' || !d.what.trim()) return null;
  return { childName: d.childName, what: d.what };
}

/** 받은 푸시에서 요청권 신청을 꺼낸다. 우리 형식이 아니면 null. */
export function parseRewardAsk(data: unknown): RewardAskPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'reward-ask') return null;
  if (typeof d.childName !== 'string' || !d.childName.trim()) return null;
  if (typeof d.reason !== 'string') return null;
  if (typeof d.amount !== 'number' || !Number.isFinite(d.amount)) return null;
  const str = (v: unknown) => (typeof v === 'string' && v !== '' ? v : undefined);
  return {
    childName: d.childName,
    reason: d.reason,
    amount: Math.round(d.amount),
    /*
     * 아래는 옛 판 아이 폰에서는 안 온다. 그때는 부모 화면에 요청이 뜨긴 하되
     * 「아이 폰을 새로 깔면 여기서 승인할 수 있어요」 로 안내한다 — 승인해도
     * 아이 폰에 돌려줄 번호(askId)가 없어 아이 쪽이 그대로 멈춰 있게 된다.
     */
    ...(str(d.askId) ? { askId: d.askId as string } : {}),
    ...(str(d.askKind) ? { askKind: d.askKind as string } : {}),
    ...(str(d.date) ? { date: d.date as string } : {}),
    ...(str(d.month) ? { month: d.month as string } : {}),
    ...(typeof d.effortSuggestion === 'number' ? { effortSuggestion: d.effortSuggestion } : {}),
    ...(str(d.note) ? { note: d.note as string } : {}),
    ...(str(d.childToken) ? { childToken: d.childToken as string } : {}),
  };
}

/** 받은 푸시에서 연결 인사를 꺼낸다. 우리 형식이 아니면 null. */
export function parseHello(data: unknown): HelloPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'hello') return null;
  if (typeof d.childName !== 'string' || typeof d.childToken !== 'string') return null;
  if (d.childName.length === 0 || d.childToken.length === 0) return null;
  return { childName: d.childName, childToken: d.childToken };
}

/**
 * 부모가 아이 기기의 설정을 바꾼다.
 *
 * 아이 폰을 손에 들지 않고도 과목을 정할 수 있어야 한다. 아이가 둘이고
 * 폰이 각자에게 있으면, 바꿀 때마다 폰을 걷어 오는 것은 현실적이지 않다.
 *
 * 지금은 과목만 보낸다. 하루 분량 같은 것도 같은 통로로 보낼 수 있지만,
 * 아이가 스스로 정하게 둔 값이라 부모가 덮어쓰지 않는다.
 */
export interface SettingsPayload {
  from: string;
  subjects: Subject[];
  /**
   * ── 아래 셋은 **아이 폰에만 있던 값**을 부모가 고쳐 보내는 것이다 ────
   *
   * 레벨과 요청권 금액은 아이 폰 안에 있다. 부모 폰에는 그 아이 프로필이
   * 없어서(제 폰을 쓰는 아이라면) 고칠 길이 아예 없었다 — 부모가 "우리 애는
   * 중3-1 로 올려 줘야겠다" 고 생각해도 아이 폰을 걷어 와야 했다.
   *
   * 보내는 것은 **부모가 실제로 고친 것만** 이다. 안 고친 값은 안 실어
   * 보낸다. 통째로 보내면 부모 화면에 우연히 떠 있던 기본값이 아이가 제
   * 폰에서 골라 둔 것을 덮어쓴다.
   */
  level?: string;
  koLevel?: string;
  /** 이 아이만의 요청권 금액. 공통(기기 기본값)보다 앞선다. */
  rates?: Record<string, number>;
  /**
   * 하루에 새로 배울 개수. 영어와 국어를 따로 정한다.
   *
   * 갈래(`subjects`)는 처음부터 실려 갔는데 **분량은 아이 폰에만** 있었다.
   * 갈래만 켜 주고 몇 개를 할지는 못 정하니 반쪽이었던 셈이다.
   */
  newPerDay?: number;
  koNewPerDay?: number;
  dailyNewPerDay?: number;
}

export function buildSettingsBody(token: string, payload: SettingsPayload) {
  const names = payload.subjects.map((s) => SUBJECT_LABEL[s]).join(' · ');
  /* 무엇이 바뀌었는지 알림 본문에 적는다. 과목만 바뀐 것이 아닐 수 있다. */
  const extra = [
    payload.level ? '영어 레벨' : '',
    payload.koLevel ? '국어 레벨' : '',
    payload.rates ? '요청권 금액' : '',
    payload.newPerDay || payload.koNewPerDay || payload.dailyNewPerDay ? '하루 분량' : '',
  ].filter(Boolean);
  return {
    to: token,
    title: '⚙️ 부모님이 설정을 바꾸셨어요',
    body: extra.length
      ? `${payload.from}이(가) ${names} · ${extra.join(' · ')}을(를) 바꿨어요.`
      : `${payload.from}이(가) ${names}(으)로 정했어요.`,
    sound: 'default' as const,
    priority: 'high' as const,
    channelId: 'child-nudge',
    data: {
      kind: 'settings',
      from: payload.from,
      subjects: payload.subjects,
      ...(payload.level ? { level: payload.level } : {}),
      ...(payload.koLevel ? { koLevel: payload.koLevel } : {}),
      ...(payload.rates ? { rates: payload.rates } : {}),
      ...(payload.newPerDay ? { newPerDay: payload.newPerDay } : {}),
      ...(payload.koNewPerDay ? { koNewPerDay: payload.koNewPerDay } : {}),
      ...(payload.dailyNewPerDay ? { dailyNewPerDay: payload.dailyNewPerDay } : {}),
    },
  };
}

/**
 * 받은 푸시에서 설정을 꺼낸다.
 *
 * 과목이 하나도 없거나 모르는 값만 오면 **받아들이지 않는다.** 빈 과목으로
 * 덮어쓰면 아이 화면에 낼 문제가 없어져 앱이 고장 난 것처럼 보인다.
 */
export function parseSettings(data: unknown): SettingsPayload | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;
  if (d.kind !== 'settings') return null;
  if (!Array.isArray(d.subjects)) return null;
  const all: Subject[] = ['en', 'ko', 'daily'];
  const subjects = all.filter((x) => (d.subjects as unknown[]).includes(x));
  if (subjects.length === 0) return null;
  /* 금액은 숫자만 받는다. 글자가 들어오면 아이 폰에서 계산이 NaN 이 된다. */
  const rates =
    d.rates && typeof d.rates === 'object' && !Array.isArray(d.rates)
      ? Object.fromEntries(
          Object.entries(d.rates as Record<string, unknown>).filter(
            ([, v]) => typeof v === 'number' && Number.isFinite(v) && v >= 0,
          ),
        ) as Record<string, number>
      : undefined;
  /*
   * 하루 분량은 **말이 되는 값만** 받는다.
   *
   * 0 이나 음수가 꽂히면 아이 화면에 낼 문제가 없어지고, 터무니없이 큰 수가
   * 오면 한 판이 끝나지 않는다. 둘 다 앱이 고장 난 것처럼 보인다. 위쪽은
   * 넉넉히 열어 두되(부모가 시험 앞두고 많이 시킬 수 있다) 한도는 둔다.
   */
  const count = (v: unknown) =>
    typeof v === 'number' && Number.isInteger(v) && v >= 1 && v <= 100 ? v : undefined;
  const newPerDay = count(d.newPerDay);
  const koNewPerDay = count(d.koNewPerDay);
  const dailyNewPerDay = count(d.dailyNewPerDay);

  return {
    from: typeof d.from === 'string' ? d.from : '부모님',
    subjects,
    ...(typeof d.level === 'string' && d.level ? { level: d.level } : {}),
    ...(typeof d.koLevel === 'string' && d.koLevel ? { koLevel: d.koLevel } : {}),
    ...(rates && Object.keys(rates).length > 0 ? { rates } : {}),
    ...(newPerDay ? { newPerDay } : {}),
    ...(koNewPerDay ? { koNewPerDay } : {}),
    ...(dailyNewPerDay ? { dailyNewPerDay } : {}),
  };
}

/** 부모가 고를 수 있는 문구. 직접 쓰는 것보다 누르기 쉽다. */
export const NUDGE_PRESETS = [
  '오늘 공부 시작할 시간이에요! 📚',
  '10분만 해 볼까요? 😊',
  '오늘 아직 안 했네요. 같이 해요!',
  '조금만 더 하면 레벨업이에요! 🎉',
] as const;


/**
 * 푸시 토큰 발급이 실패한 까닭을 사람이 읽을 수 있는 말로.
 *
 * 예전에는 어떤 오류가 나든 "Expo Go에서는 받을 수 없습니다"라고만 했다.
 * EAS로 제대로 빌드한 앱에서도 그 말이 나와서, 무엇이 잘못됐는지 알 길이
 * 없었다. 실제로 그렇게 한나절을 잃었다.
 *
 * 짐작되는 원인을 앞에 적고 **원래 오류도 함께** 남긴다. 짐작이 틀렸을 때
 * 원래 오류가 없으면 더 볼 것이 없어진다.
 *
 * 안드로이드에서 가장 흔한 원인은 FCM 설정이 없는 것이다. 구글이 안드로이드
 * 푸시를 FCM으로만 받게 해 두어서, 파이어베이스 설정 파일과 EAS에 올린 열쇠가
 * 둘 다 있어야 토큰이 나온다.
 *
 * @param isExpoGo Expo Go로 돌고 있는지. 네이티브 모듈을 여기서 읽지 않으려고
 *                 밖에서 받는다 — 이 파일은 기기 없이 테스트할 수 있어야 한다.
 */
export function pushFailureReason(e: unknown, isExpoGo = false): string {
  const raw = e instanceof Error ? e.message : String(e);

  if (isExpoGo) {
    return 'Expo Go에서는 푸시 토큰을 받을 수 없습니다. EAS로 빌드한 앱에서 다시 시도해 주세요.';
  }

  if (/FCM|FirebaseApp|google-services/i.test(raw)) {
    return (
      '안드로이드 푸시(FCM) 설정이 없습니다. 컴퓨터에서 파이어베이스 설정을 마치고 ' +
      `앱을 다시 빌드해 주세요.\n\n원래 오류: ${raw}`
    );
  }

  if (/network|timeout|ENOTFOUND|fetch/i.test(raw)) {
    return `인터넷 연결을 확인해 주세요.\n\n원래 오류: ${raw}`;
  }

  return `푸시 토큰을 받지 못했습니다.\n\n원래 오류: ${raw}`;
}
