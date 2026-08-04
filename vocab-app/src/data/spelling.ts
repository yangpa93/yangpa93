/**
 * 영국식 · 미국식 짝.
 *
 * 교육부 기본 어휘 목록에는 `airplane`과 `aeroplane`이 **둘 다** 들어 있다.
 * 목록을 그대로 옮겼으니 우리 어휘에도 둘 다 있고, 그러면 아이는 이 둘을
 * **서로 다른 단어로** 배우게 된다. 실제로 베타에서 딸이 `aeroplane`을 보고
 * "오타 아니냐"고 물었다.
 *
 * 그래서 단어 카드에서 짝을 알려 준다. 따로 외울 것이 하나 줄고,
 * `colour/color`처럼 시험에 나올 수 있는 관계도 자연스럽게 익힌다.
 *
 * **우리나라 교과서와 수능은 미국식이 기준이다.** 그래서 영국식 단어를
 * 만났을 때 "미국식은 이것"이라고 짚어 주는 쪽이 더 중요하다.
 *
 * 여기 실린 단어는 모두 우리 어휘 3,286개 안에 있다 —
 * __tests__/data.test.ts 가 그것을 강제한다.
 */

export type VariantKind =
  /** 철자만 다르고 뜻은 같다. colour = color */
  | 'spelling'
  /** 같은 것을 가리키지만 쓰는 낱말이 다르다. petrol / gasoline */
  | 'usage'
  /** 영국식에서만 품사에 따라 갈린다. practise(동사) / practice(명사) */
  | 'partOfSpeech';

export interface Variant {
  /** 영국식 */
  br: string;
  /** 미국식 */
  us: string;
  kind: VariantKind;
}

export const VARIANTS: Variant[] = [
  // -our / -or
  { br: 'flavour', us: 'flavor', kind: 'spelling' },
  { br: 'harbour', us: 'harbor', kind: 'spelling' },
  { br: 'honour', us: 'honor', kind: 'spelling' },
  { br: 'humour', us: 'humor', kind: 'spelling' },
  { br: 'labour', us: 'labor', kind: 'spelling' },
  { br: 'neighbour', us: 'neighbor', kind: 'spelling' },
  { br: 'rumour', us: 'rumor', kind: 'spelling' },
  // -re / -er
  { br: 'fibre', us: 'fiber', kind: 'spelling' },
  { br: 'theatre', us: 'theater', kind: 'spelling' },
  // -ise / -ize
  { br: 'utilise', us: 'utilize', kind: 'spelling' },
  // -ce / -se
  { br: 'defence', us: 'defense', kind: 'spelling' },
  // 그 밖의 철자

  // 낱말 자체가 다른 것
  { br: 'petrol', us: 'gasoline', kind: 'usage' },
  { br: 'cheque', us: 'check', kind: 'usage' },

  // 영국식에서만 품사로 갈리는 것
  { br: 'practise', us: 'practice', kind: 'partOfSpeech' },
  { br: 'licence', us: 'license', kind: 'partOfSpeech' },
];

export interface VariantNote {
  /** 짝이 되는 단어 */
  other: string;
  /** 이 단어가 영국식인지 미국식인지 */
  side: 'br' | 'us';
  kind: VariantKind;
  /** 카드에 그대로 적을 한 줄 */
  text: string;
}

const BY_WORD = new Map<string, VariantNote>();
for (const v of VARIANTS) {
  BY_WORD.set(v.br, { other: v.us, side: 'br', kind: v.kind, text: noteText(v, 'br') });
  BY_WORD.set(v.us, { other: v.br, side: 'us', kind: v.kind, text: noteText(v, 'us') });
}

function noteText(v: Variant, side: 'br' | 'us'): string {
  if (v.kind === 'usage') {
    return side === 'br'
      ? `영국에서 쓰는 말이에요. 미국·우리나라 교과서에서는 ${v.us}라고 해요.`
      : `미국에서 쓰는 말이에요. 영국에서는 ${v.br}라고 해요.`;
  }
  if (v.kind === 'partOfSpeech') {
    return side === 'br'
      ? `영국식 철자예요. 미국식은 ${v.us} 하나로 씁니다.`
      : `미국식은 이 하나로 쓰고, 영국식은 ${v.br}로 나눠 씁니다.`;
  }
  // 철자만 다른 경우 — 아이에게 가장 중요한 것은 "따로 외울 필요 없다"는 것.
  return side === 'br'
    ? `${v.us}의 영국식 철자예요. 뜻은 같고, 우리나라 시험에는 보통 ${v.us}가 나와요.`
    : `${v.br}의 미국식 철자예요. 뜻은 같고, 우리나라 시험에는 보통 이 철자가 나와요.`;
}

/** 그 단어의 영국식·미국식 짝. 없으면 null. */
export function variantOf(word: string): VariantNote | null {
  return BY_WORD.get(word.toLowerCase()) ?? null;
}

/** 짝이 있는 모든 단어 (검사용) */
export function variantWords(): string[] {
  return [...BY_WORD.keys()];
}
