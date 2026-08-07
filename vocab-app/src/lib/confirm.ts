import { Alert, Platform } from 'react-native';

/**
 * "정말 하시겠어요?" 를 묻는다. **웹에서도 뜬다.**
 *
 * ── 왜 필요한가 ─────────────────────────────────────────────
 *
 * `Alert.alert` 는 react-native-web 에서 **아무 일도 하지 않는다.** 오류도
 * 안 나고 조용히 지나간다. 그래서 노트북 미리보기로 확인할 때 "프로필 삭제를
 * 눌러도 아무 반응이 없다" 가 된다 — 실제로 그 말을 들었다. 폰에서는 멀쩡히
 * 뜨기 때문에 더 헷갈린다.
 *
 * 노트북 확인(npm run preview · npm run e2e)이 이 앱의 주된 검증 수단인데,
 * 확인 대화가 거기서 안 뜨면 **지우는 길이 있는지조차 확인할 수가 없다.**
 *
 * 웹에서는 브라우저 `confirm` 을 쓴다. 생김새는 투박하지만 묻고 답을 받는다는
 * 일은 똑같이 한다.
 *
 * ── 왜 콜백인가 ─────────────────────────────────────────────
 *
 * `Alert.alert` 가 콜백이라 그 모양을 그대로 따른다. 부르는 쪽을 async 로
 * 바꾸게 하면 20군데를 한꺼번에 손봐야 한다.
 */
export function askConfirm(
  title: string,
  message: string,
  onConfirm: () => void,
  opts?: {
    /** 확인 단추에 쓸 말. 기본 '확인' */
    confirmText?: string;
    /** 되돌릴 수 없는 일이면 true. 네이티브에서 빨갛게 나온다. */
    destructive?: boolean;
  },
): void {
  const confirmText = opts?.confirmText ?? '확인';

  if (Platform.OS === 'web') {
    // 웹에는 제목 칸이 따로 없다. 한 덩어리로 붙여 보여 준다.
    const ok = typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`);
    if (ok) onConfirm();
    return;
  }

  Alert.alert(title, message, [
    { text: '취소', style: 'cancel' },
    {
      text: confirmText,
      style: opts?.destructive ? 'destructive' : 'default',
      onPress: onConfirm,
    },
  ]);
}
