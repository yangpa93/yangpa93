/**
 * 국어 어휘를 화면에 쓰기 좋은 모양으로 바꾸는 헬퍼.
 *
 * 영어의 `data/entry.ts` 와 같은 자리다. 다만 하는 일은 꽤 다르다 —
 * 한국어는 낱말 뒤에 조사가 붙고 용언은 활용해서, 예문에서 표제어를
 * 찾아내는 것부터 쉽지 않다.
 */

import { KoEntry, KoExample } from '../../types';

/** 빈칸에 쓸 글자. 글자 수만큼 늘려 몇 자짜리 말인지 알려 준다. */
const BLANK_CHAR = '○';

/**
 * 예문에서 이 어휘가 어디 있는지 찾는다.
 *
 * 세 가지를 차례로 본다.
 *
 * **1. 그대로 있는 경우.** '기회비용을 고려해야 한다' 처럼 명사 뒤에 조사만
 * 붙는 것이 대부분이다. 조사는 남기고 낱말만 지운다.
 *
 * **2. 용언의 활용.** 고전 어휘 '괴다'는 '괴시던 님'으로 나온다. '-다'를
 * 떼어 낸 어간으로 다시 찾는다.
 *
 * **3. '-하다' 형.** '성찰'이 '성찰하다'로 쓰인 예문이 많다. 이건 1에서
 * 이미 잡히지만, 반대로 표제어가 '성찰하다'인데 예문에 '성찰'만 있는
 * 경우를 위해 어간을 한 번 더 본다.
 *
 * 못 찾으면 null 이다. 그 예문으로는 빈칸 문제를 낼 수 없다.
 */
export function findWord(sentence: string, word: string): { at: number; text: string } | null {
  for (const form of wordForms(word)) {
    const at = sentence.indexOf(form);
    if (at >= 0) return { at, text: form };
  }
  return null;
}

/**
 * 예문에서 찾아볼 형태들. 긴 것부터 본다.
 *
 * 짧은 어간부터 찾으면 엉뚱한 자리가 잡힌다. '사유'의 어간을 '사'로 줄여
 * 찾으면 '사회'의 '사'가 먼저 걸린다. 그래서 두 글자 아래로는 줄이지 않는다.
 */
export function wordForms(word: string): string[] {
  const forms = [word];

  // 용언: '괴다' → '괴', '어엿브다' → '어엿브'
  if (word.length >= 3 && word.endsWith('다')) forms.push(word.slice(0, -1));

  // '성찰하다' → '성찰'
  if (word.length >= 4 && word.endsWith('하다')) forms.push(word.slice(0, -2));

  // 두 글자짜리 용언('괴다')은 어간이 한 글자라 아무 데나 걸린다. 빼 둔다.
  return forms.filter((f) => f.length >= 2).sort((a, b) => b.length - a.length);
}

/**
 * 예문에 빈칸을 뚫는다.
 *
 * 조사는 남긴다. '가담항설에' 를 통째로 지우면 '에' 가 사라져 문장이
 * 어색해지고, 아이가 빈칸에 무엇이 들어갈지 가늠할 단서도 없어진다.
 *
 * 빈칸은 글자 수만큼 ○ 를 늘린다. 넉 자 성어인지 두 자 낱말인지가 보여야
 * 아이가 후보를 좁힐 수 있다. 어차피 보기에서 고르는 문제라 답이 새지는
 * 않는다.
 */
export function koCloze(sentence: string, word: string): { text: string; answer: string } | null {
  const hit = findWord(sentence, word);
  if (!hit) return null;
  return {
    text:
      sentence.slice(0, hit.at) +
      BLANK_CHAR.repeat(hit.text.length) +
      sentence.slice(at2(hit)),
    answer: hit.text,
  };
}

const at2 = (hit: { at: number; text: string }) => hit.at + hit.text.length;

/**
 * 이 어휘에 쓸 예문 하나를 고른다.
 *
 * 영어와 같은 방식이다. 만난 횟수를 예문 개수로 나눈 나머지를 쓰므로,
 * 같은 낱말을 여러 날 만나도 매번 다른 문장이 나온다.
 */
export function koExample(entry: KoEntry, exposureIndex: number): KoExample | null {
  if (entry.examples.length === 0) return null;
  const i = ((exposureIndex % entry.examples.length) + entry.examples.length) % entry.examples.length;
  return entry.examples[i];
}

/** 원전에서 가져온 문장인지. 지어낸 예문과 화면에서 구별해 보여준다. */
export function isQuoted(example: KoExample): boolean {
  return Boolean(example.source);
}

/**
 * 화면에 쓸 표제어 표기. 사자성어는 한자를 곁들인다.
 *
 * '고진감래 (苦盡甘來)' 처럼 보여야 음과 한자가 한눈에 묶인다.
 */
export function koHeadword(entry: KoEntry): string {
  return entry.hanja ? `${entry.word} (${entry.hanja})` : entry.word;
}
