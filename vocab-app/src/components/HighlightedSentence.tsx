/** 예문 안의 표제어(굴절형 포함)에 형광펜을 긋는다. 여러 화면이 공유한다. */

import { StyleProp, StyleSheet, Text, TextStyle } from 'react-native';
import { wordForms } from '../data/entry';
import { colors } from '../theme';

export function HighlightedSentence({
  text,
  word,
  style,
  hitStyle,
}: {
  text: string;
  word: string;
  style?: StyleProp<TextStyle>;
  hitStyle?: StyleProp<TextStyle>;
}) {
  const forms = wordForms(word);
  const pattern = forms.map(escapeRegExp).join('|');
  const parts = pattern ? text.split(new RegExp(`\\b(${pattern})\\b`, 'gi')) : [text];

  return (
    <Text style={[s.base, style]}>
      {parts.map((part, i) => {
        const hit = forms.some((f) => f.toLowerCase() === part.toLowerCase());
        return hit ? (
          <Text key={i} style={[s.hit, hitStyle]}>
            {part}
          </Text>
        ) : (
          <Text key={i}>{part}</Text>
        );
      })}
    </Text>
  );
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const s = StyleSheet.create({
  base: { fontSize: 18, lineHeight: 28, color: colors.text },
  hit: { color: colors.accent, fontWeight: '800' },
});
