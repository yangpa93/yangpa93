/**
 * 유의어 한 줄. 눌러서 들을 수 있다.
 *
 * 표제어와 예문은 소리가 나는데 유의어만 안 나면, 아이는 firm 을 읽는 법을
 * 모른 채 눈으로만 외운다. 소리로 익힌 적 없는 말은 말할 때 안 나온다.
 *
 * 줄 전체를 누르면 유의어를 이어서 읽어 준다. 낱말마다 따로 누르게 하려면
 * 칩으로 흩어 놓아야 하는데, 단어장·오답 노트는 한 줄에 여러 뜻이 늘어서는
 * 자리라 칩을 쓰면 줄이 무너진다. 단어 카드의 '오늘 배우는 뜻' 칸만
 * 칩으로 두고 낱말마다 눌러 듣게 한다.
 */

import { Pressable } from 'react-native';
import { synonymSentence } from '../data/entry';
import { speak } from '../lib/feedback';
import { Muted } from './ui';

export function SynonymLine({
  meaning,
  synonyms,
  ttsEnabled,
}: {
  meaning: string;
  synonyms: string[];
  ttsEnabled: boolean;
}) {
  if (synonyms.length === 0) return null;

  return (
    <Pressable
      onPress={() => speak(synonyms.join(', '), ttsEnabled)}
      accessibilityRole="button"
      accessibilityLabel={`${synonyms.join(', ')} 듣기`}
    >
      <Muted style={{ marginTop: 2 }}>{synonymSentence(meaning, synonyms)} 🔊</Muted>
    </Pressable>
  );
}
