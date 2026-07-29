/**
 * 앱 이름. `app.json` 의 `expo.name` 하나만 보고 온다.
 *
 * 화면·백업 오류·연결 문자·의견 보내기 네 군데에 이름이 박혀 있었다.
 * 이름을 바꿀 때 한 군데라도 빠뜨리면 아이 화면에 옛 이름이 남는다.
 *
 * `expo-constants` 로 읽는 쪽이 더 자연스러워 보이지만 그러면 백업 같은
 * 순수 로직이 네이티브 모듈을 끌고 들어온다. jest 는 그것을 못 읽는다
 * (jest.config.js — "순수 로직만 테스트한다"). app.json 을 그대로 읽으면
 * 앱에서도 테스트에서도 같은 값이 나온다.
 */

import appJson from '../../app.json';

export const APP_NAME: string = appJson.expo.name;
