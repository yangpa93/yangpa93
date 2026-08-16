/**
 * 지금 돌고 있는 빌드가 무엇인지.
 *
 * 베타를 아이 기기에 넣어 두고 "이게 이상해요"라는 말을 들으면, 먼저
 * **어느 빌드에서 그랬는지**를 알아야 한다. 고쳐서 새로 올렸는데 아이가
 * 아직 예전 빌드를 쓰고 있는 경우가 흔하기 때문이다. 그래서 판과 빌드
 * 번호를 화면에 적어 둔다.
 */

import * as Application from 'expo-application';
import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { Platform } from 'react-native';
import { APP_NAME } from './app-name';
import { APP_VERSION } from './changelog';
import { stampOf } from '../lib/date';

// 예전부터 여기서 가져다 쓰던 자리가 있어 그대로 내보낸다.
export { APP_NAME };

export interface BuildInfo {
  /** 앱 판 (0.9.0) */
  version: string;
  /** 스토어에 올라가는 빌드 번호. Expo Go에서는 없다. */
  build: string;
  /** 배포 채널 (beta / preview / production). 알 수 없으면 빈 문자열 */
  channel: string;
  /** 베타 빌드인지 */
  isBeta: boolean;
  /** Expo Go로 돌고 있는지. 그러면 푸시·알림이 동작하지 않는다. */
  isExpoGo: boolean;
  platform: string;
  /**
   * 무선 업데이트(EAS Update)로 받은 판이면 그 표시.
   *
   * 무선 업데이트는 앱을 다시 깔지 않고 **JS만** 갈아 끼운다. 그래서 빌드
   * 번호는 그대로인데 안의 내용은 다를 수 있다. 그것까지 안 적으면
   * "베타 0.9.0 (1)"이라는 말이 서로 다른 두 앱을 가리키게 된다.
   *
   * 빌드에 들어 있던 그대로면 빈 문자열.
   */
  update: string;
  /**
   * 이 판이 **만들어진 때** (`2026.08.15.20.05`). 못 읽으면 빈 문자열.
   *
   * ── 왜 번호만으로는 모자라나 ────────────────────────────────
   *
   * 빌드 번호는 EAS 가 하나씩 올려 주는 값이라 「16」 이 언제 만들어진 것인지
   * 알 수 없다. 하루에 두어 번 빌드하는 날에는 아이 폰에 든 것이 아침 것인지
   * 저녁 것인지 번호만 보고는 못 가린다. 시각이 적혀 있으면 그 자리에서 끝난다.
   *
   * `Updates.createdAt` 은 **지금 돌고 있는 판이 만들어진 때**다. 무선
   * 업데이트로 갈아 끼웠으면 그 업데이트가 만들어진 때가 된다 — 그것이 맞다.
   * 지금 도는 것이 언제 것인지가 알고 싶은 값이기 때문이다.
   *
   * 개발 모드와 노트북 미리보기에서는 null 이라 빈 문자열이 된다. 없는 시각을
   * 지어내지 않는다.
   */
  builtAt: string;
}

/*
 * 시각을 글로 바꾸는 규칙은 `lib/date` 에 있다. 이 파일은 expo-application 을
 * 끌어와서 기기 없이 못 부르는데, 그 규칙은 시험으로 못박아 두고 싶었다.
 */
export { stampOf } from '../lib/date';

export function buildInfo(): BuildInfo {
  const cfg = Constants.expoConfig;

  // 빌드 번호는 **실제 설치된 앱**에서 읽는다. eas.json이
  // appVersionSource를 'remote'로 두고 있어서, 번호를 정하는 것은 EAS이고
  // app.json에는 안 적힌다. 여기서 expoConfig를 읽으면 늘 비어 있다.
  // 둘 다 못 읽는 자리(웹 미리보기 등)에서는 소스에 적힌 판을 쓴다. 예전에는
  // '0.0.0' 을 썼는데, 그러면 업데이트 내역 화면이 "이 판은 목록에 없다"고
  // 잘못 경고한다. 없는 번호를 지어내느니 소스의 판을 그대로 적는 편이 맞다.
  const version = Application.nativeApplicationVersion ?? cfg?.version ?? APP_VERSION;
  const build = Application.nativeBuildVersion ?? '';

  const channel = Updates.channel ?? '';
  const isExpoGo = Constants.appOwnership === 'expo';
  const isBeta = channel === 'beta' || /^0\./.test(version);

  // 빌드에 들어 있던 그대로면 적을 것이 없다. 무선 업데이트로 갈아 끼운
  // 경우에만 그 id 앞자리를 적어 서로 구별되게 한다.
  const update =
    !Updates.isEmbeddedLaunch && Updates.updateId ? Updates.updateId.slice(0, 6) : '';

  return {
    version,
    build: build || '-',
    channel,
    isBeta,
    isExpoGo,
    platform: Platform.OS,
    update,
    /*
     * 노트북 미리보기와 개발 모드에서는 null 이다. 그때는 빈 문자열이 되고
     * 화면에서도 그 자리가 통째로 빠진다 — 없는 시각을 지어내지 않는다.
     */
    builtAt: stampOf(Updates.createdAt),
  };
}

/**
 * `0.23.0.6` — 사람에게 보여 주는 판 번호. **네 자리 한 덩어리다.**
 *
 * ── 왜 괄호를 없앴나 ────────────────────────────────────────
 *
 * 예전에는 `0.23.0 (6) · android` 라고 적었다. 빌드 번호를 괄호에 넣은 것인데,
 * 괄호는 "덧붙인 말" 로 읽힌다 — 그래서 사람들이 판을 말할 때 괄호 안을
 * 빼고 "0.23.0 이요" 라고 한다. 그런데 같은 0.23.0 으로 만든 빌드가 여럿일
 * 수 있어서, 그 번호를 빼면 어느 앱인지 다시 알 수 없어진다.
 *
 * 점으로 이어 붙이면 네 자리가 **한 번호**가 된다. 그러면 통째로 읽는다.
 *
 * 빌드 번호를 못 읽는 자리(노트북 미리보기)에서는 0 으로 둔다. 없는 번호를
 * 지어내지 않으면서 자릿수는 지키는 값이다.
 */
export function versionLabel(info: BuildInfo = buildInfo()): string {
  const build = /^\d+$/.test(info.build) ? info.build : '0';
  return `${info.version}.${build}`;
}

/**
 * `0.23.0.6 · android` — 자세히 적어야 하는 자리에 쓴다.
 *
 * '베타'라고 적지 않는다. 아이가 모르는 말이고, 안다고 해도 "아직 덜 만든 것"
 * 으로 들려 이상한 것을 말하기 어려워진다.
 */
export function buildLabel(info: BuildInfo = buildInfo()): string {
  /*
   * 만든 때를 판 번호 **바로 뒤에** 붙인다. 「0.23.0.16 · 2026.08.15.20.05」.
   *
   * 번호만으로는 그것이 언제 것인지 알 수 없다 — 하루에 두어 번 빌드한 날에는
   * 아이 폰에 든 것이 아침 것인지 저녁 것인지 못 가린다. 못 읽는 자리(노트북
   * 미리보기)에서는 이 칸이 통째로 빠진다.
   */
  const parts = [versionLabel(info), ...(info.builtAt ? [info.builtAt] : []), info.platform];
  // 무선 업데이트로 받은 판이면 그것까지 적어야 같은 빌드 번호끼리도 구별된다.
  if (info.update) parts.push(`업데이트 ${info.update}`);
  if (info.isExpoGo) parts.push('Expo Go');
  return parts.join(' · ');
}

/**
 * 의견을 보낼 때 같이 붙일 한 줄.
 *
 * 어느 빌드에서 무엇이 이상했는지가 없으면 재현할 수가 없다.
 */
export function feedbackHeader(info: BuildInfo = buildInfo()): string {
  return [
    '── 아래는 지우지 말아 주세요 ──',
    `앱: ${APP_NAME} ${buildLabel(info)}`,
    `보낸 때: ${new Date().toLocaleString('ko-KR')}`,
  ].join('\n');
}
