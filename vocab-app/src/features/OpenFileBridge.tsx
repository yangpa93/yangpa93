/**
 * 다른 앱이 넘긴 파일을 받아 백업 화면으로 데려간다.
 *
 * 카톡에서 백업 파일을 **다른 앱으로 열기 → 곰탱이보카** 로 열면 여기로
 * 들어온다. 카톡이 내려받기를 막아도 파일 자체는 넘어오므로, 대화방 안에
 * 갇힌 백업을 꺼낼 길이 하나 생긴다.
 *
 * expo-router 가 처리하는 우리 딥링크(`gomtangivoca://link`)와 섞이지 않게
 * `content://` · `file://` 만 집어 간다. 가르는 규칙은 openedFile.ts 에 있다.
 *
 * **앱이 꺼져 있을 때 연 경우와 켜져 있을 때 연 경우가 다르다.** 꺼져 있었으면
 * 첫 주소가 `getInitialURL` 로 한 번 오고, 켜져 있었으면 이벤트로 온다.
 * 둘 다 받아야 한다 — 하나만 받으면 "어떤 때는 되고 어떤 때는 안 되는" 것이
 * 되어 원인을 못 찾는다.
 */

import { useEffect, useRef } from 'react';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import { isOpenedFileUrl } from './openedFile';

export function OpenFileBridge() {
  /**
   * 이미 데려간 주소.
   *
   * 같은 주소로 두 번(초기 주소 + 이벤트) 들어오는 기기가 있다. 막지 않으면
   * 백업 화면이 두 번 쌓여 뒤로 가기를 두 번 눌러야 한다.
   */
  const handled = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const open = (url: string | null) => {
      if (cancelled || !isOpenedFileUrl(url) || url === handled.current) return;
      handled.current = url;
      /*
       * push 가 아니라 navigate 를 쓴다. 앱이 꺼진 채로 파일을 열면 첫 화면이
       * 잠깐 뜨는데, push 면 그 위에 쌓여서 뒤로 가기가 어색해진다.
       */
      router.navigate({ pathname: '/backup', params: { src: url as string } });
    };

    // 앱이 꺼져 있을 때 파일로 열린 경우
    void Linking.getInitialURL().then(open).catch(() => {});

    // 앱이 켜져 있을 때 파일로 열린 경우
    const sub = Linking.addEventListener('url', (e) => open(e.url));

    return () => {
      cancelled = true;
      sub.remove();
    };
  }, []);

  return null;
}
