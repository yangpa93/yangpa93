/**
 * 국어 예문 한 줄. 표제어를 눈에 띄게 칠한다.
 *
 * 예문을 그냥 늘어놓으면 아이가 **어느 낱말을 배우는 중인지** 못 찾는다.
 * '주체가 행위나 상태의 임자라면 객체는 행위나 상태의 수혜자일 것이다.'
 * 에서 배우는 말이 '객체'인지 '주체'인지 문장만 봐서는 알 수 없다.
 *
 * 그래서 배우는 낱말만 굵고 빨갛게 칠한다. 활용형('미쁘게')도 잡아야 해서
 * 어간까지 찾아 주는 `findWord` 를 쓴다.
 */

import { StyleSheet, Text, TextStyle } from 'react-native';
import { findWord } from '../data/korean/entry';
import { colors, font } from '../theme';

export function KoSentence({
  text,
  word,
  style,
}: {
  text: string;
  /** 칠할 낱말. 비어 있으면 그냥 문장만 보여준다. */
  word?: string;
  style?: TextStyle;
}) {
  const hit = word ? findWord(text, word) : null;

  if (!hit) return <Text style={[s.text, style]}>{text}</Text>;

  return (
    <Text style={[s.text, style]}>
      {text.slice(0, hit.at)}
      <Text style={s.mark}>{hit.text}</Text>
      {text.slice(hit.at + hit.text.length)}
    </Text>
  );
}

const s = StyleSheet.create({
  text: { fontSize: font.h3, color: colors.text, lineHeight: 32 },
  /**
   * 배우는 낱말.
   *
   * 색만으로 구별하면 색을 잘 못 보는 아이가 놓친다. 굵기도 같이 준다.
   */
  mark: { color: colors.wrong, fontWeight: '800' },
});
