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
}

export function buildInfo(): BuildInfo {
  const cfg = Constants.expoConfig;

  // 빌드 번호는 **실제 설치된 앱**에서 읽는다. eas.json이
  // appVersionSource를 'remote'로 두고 있어서, 번호를 정하는 것은 EAS이고
  // app.json에는 안 적힌다. 여기서 expoConfig를 읽으면 늘 비어 있다.
  const version = Application.nativeApplicationVersion ?? cfg?.version ?? '0.0.0';
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
  };
}

/** `베타 0.9.0 (12) · android` — 화면 아래에 한 줄로 적는다. */
export function buildLabel(info: BuildInfo = buildInfo()): string {
  const head = info.isBeta ? `베타 ${info.version}` : `v${info.version}`;
  const parts = [`${head} (${info.build})`, info.platform];
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
    `앱: 우리 영단어 ${buildLabel(info)}`,
    `보낸 때: ${new Date().toLocaleString('ko-KR')}`,
  ].join('\n');
}
