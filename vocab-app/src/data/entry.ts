/**
 * VocabEntry를 화면에 뿌릴 때 쓰는 헬퍼들.
 *
 * 여기의 핵심은 `exposure()`다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 예문이 나오도록 노출 횟수를 인덱스로 돌려 쓴다.
 * 그래서 "매일 같은 문장만 본다"는 지루함이 생기지 않는다.
 */

import { CardState, Example, Sense, VocabEntry } from '../types';
import { irregularOf } from './irregular';

/**
 * 품사 약어 → 한국어 이름.
 *
 * 데이터의 `p` 값은 `n.` `aux.` 같은 약어로 두고 화면에서만 풀어 쓴다.
 * `p` 자체를 한국어로 바꾸면 표제어 파일 3,286줄을 건드리게 되고,
 * 사전 대조의 기준도 흔들린다.
 */
const POS_NAMES: Record<string, string> = {
  'n.': '명사',
  'v.': '동사',
  'adj.': '형용사',
  'adv.': '부사',
  'prep.': '전치사',
  'conj.': '접속사',
  'pron.': '대명사',
  'art.': '관사',
  'num.': '수사',
  'int.': '감탄사',
  'aux.': '조동사',
  'phr.': '숙어',
};

/**
 * 품사 표기를 아이가 읽을 수 있는 말로 바꾼다. `'v., adj.'` → `'동사 · 형용사'`
 *
 * 중학생은 `phr.` `art.` `num.` `int.` `aux.` 를 바로 알아보지 못한다.
 * 모르는 값이 하나라도 섞이면 **원래 문자열을 그대로** 돌려준다.
 * 반쯤 번역해서 내보내면 빈칸이나 뒤죽박죽이 화면에 남기 때문이다.
 */
export function posLabel(pos: string): string {
  const parts = pos
    .split(',')
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (parts.length === 0) return pos;

  const names = parts.map((p) => POS_NAMES[p]);
  if (names.some((n) => n === undefined)) return pos;

  return names.join(' · ');
}

/**
 * 유의어 앞에 붙이는 말.
 *
 * 예전에는 `= firm` 이라고 찍었다. `=` 는 "이 둘은 언제나 같다"로 읽혀서,
 * 아이가 문장을 떼고 `solid = firm` 으로 외운다. 실제로는 **그 뜻일 때만**
 * 바꿔 쓸 수 있다. 유의어는 표제어가 아니라 뜻(sense)마다 붙어 있으므로
 * 조건을 말로 드러내 준다.
 *
 * '이 뜻일 때' 라고만 하면 '이 뜻'이 어느 뜻인지 아이가 되짚어야 한다.
 * 뜻이 여러 개인 단어에서는 바로 위 줄을 다시 봐야 한다. 그래서 뜻을
 * 직접 부른다 — 한 줄만 봐도 어느 뜻에 걸리는 말인지 알 수 있다.
 *
 * 유의어를 문장 안에 넣지 않고 뒤에 붙이는 것은 조사 때문이다.
 * `firm 로` 는 틀렸다 — '펌'이라 `으로`가 맞다. `hard`는 '하드'라 `로`가
 * 맞다. 받침이 붙는지는 영어 낱말을 한글로 어떻게 읽느냐에 달렸고
 * (look→룩, put→풋), 유의어 목록 끝에 오는 낱말이 1,600가지다.
 * 규칙으로 고르면 반드시 틀린 자리가 생기고, 아이 화면에 틀린 조사가 남는다.
 */
export function synonymLead(meaning: string): string {
  return `"${meaning}"${iRaNeun(meaning)} 뜻일 때 이렇게 바꿔 쓸 수 있어요`;
}

/**
 * 앞말에 맞는 `이라는` / `라는`.
 *
 * 받침이 있으면 `이라는`, 없으면 `라는`이다. '단단한'은 받침 ㄴ이 있어
 * `"단단한"이라는`, '~에 대하여'는 없어서 `"~에 대하여"라는`.
 * 3,462개 뜻 중 2,018개가 받침이 없어서, 한쪽으로 박아 두면 절반 넘게 틀린다.
 *
 * 뒤에 괄호 주석이 붙는 뜻이 많으므로(`'조금, 약간의 (몇 개의)'`)
 * **마지막 한글 글자**를 찾아 본다. 한글이 하나도 없으면 `라는`으로 둔다 —
 * 영어나 숫자 뒤에는 무엇을 붙여도 어색하고, 그런 뜻은 audit 이 따로 잡는다.
 */
export function iRaNeun(word: string): string {
  const hangul = word.replace(/[^가-힣]/g, '');
  if (hangul.length === 0) return '라는';
  const code = hangul.charCodeAt(hangul.length - 1) - 0xac00;
  return code % 28 === 0 ? '라는' : '이라는';
}

/** 유의어까지 한 줄로. `'"단단한" 이라는 뜻일 때 이렇게 바꿔 쓸 수 있어요 : firm, hard'` */
export function synonymSentence(meaning: string, synonyms: string[]): string {
  return `${synonymLead(meaning)} : ${synonyms.join(', ')}`;
}

/** 화면에 한 줄로 보여줄 뜻. 다의어는 `;`로 이어 붙인다. */
export function meaningLine(entry: VocabEntry): string {
  return entry.senses.map((s) => s.meaning).join(' ; ');
}

/** 대표 뜻 하나. 4지선다 보기처럼 짧아야 하는 곳에서 쓴다. */
export function primaryMeaning(entry: VocabEntry): string {
  return entry.senses[0].meaning;
}

/** 모든 동의어를 한 줄로. */
export function allSynonyms(entry: VocabEntry): string[] {
  return [...new Set(entry.senses.flatMap((s) => s.synonyms))];
}

export function allExamples(entry: VocabEntry): Example[] {
  return entry.senses.flatMap((s) => s.examples);
}

/** 지금까지 이 단어를 몇 번 봤는지. 카드가 없으면 0. */
export function exposureCount(card: CardState | null | undefined): number {
  if (!card) return 0;
  return card.correct + card.wrong;
}

export interface Exposure {
  sense: Sense;
  senseIndex: number;
  example: Example;
  exampleIndex: number;
  /** 이 뜻에 동의어가 있는지 (동의어 게임을 낼 수 있는지) */
  hasSynonym: boolean;
}

/**
 * n번째 노출에서 보여줄 뜻과 예문을 고른다.
 *
 * 뜻을 바깥 루프, 예문을 안쪽 루프로 돌린다. 뜻이 2개고 예문이 각 3개면
 * 0→뜻1/예문1, 1→뜻2/예문1, 2→뜻1/예문2 … 처럼 뜻을 번갈아 보여 준다.
 * 한 뜻만 계속 나오다가 뒤늦게 다른 뜻이 튀어나오는 것보다 낫다.
 */
export function exposure(entry: VocabEntry, n: number): Exposure {
  const senseCount = entry.senses.length;
  const i = Math.max(0, Math.floor(n));

  const senseIndex = i % senseCount;
  const sense = entry.senses[senseIndex];

  // 이 뜻이 몇 번째로 선택됐는지 → 그만큼 예문도 넘긴다.
  const round = Math.floor(i / senseCount);
  const exampleIndex = sense.examples.length === 0 ? 0 : round % sense.examples.length;

  return {
    sense,
    senseIndex,
    example: sense.examples[exampleIndex] ?? { en: entry.word, ko: sense.meaning },
    exampleIndex,
    hasSynonym: sense.synonyms.length > 0,
  };
}

/**
 * 특정 뜻에 대한 노출을 만든다.
 *
 * `exposure()`는 뜻을 번갈아 고르지만, 이쪽은 뜻이 이미 정해져 있고
 * 그 안에서 예문만 돌린다. 다의어의 모든 뜻을 한 세션에서 다루려면
 * 뜻을 밖에서 정해 줘야 하기 때문이다.
 */
export function senseExposure(entry: VocabEntry, senseIndex: number, n: number): Exposure {
  const si = Math.min(Math.max(0, senseIndex), entry.senses.length - 1);
  const sense = entry.senses[si];
  const i = Math.max(0, Math.floor(n));
  const exampleIndex = sense.examples.length === 0 ? 0 : i % sense.examples.length;

  return {
    sense,
    senseIndex: si,
    example: sense.examples[exampleIndex] ?? { en: entry.word, ko: sense.meaning },
    exampleIndex,
    hasSynonym: sense.synonyms.length > 0,
  };
}

/**
 * 예문에서 표제어를 빈칸으로 바꾼다. 빈칸 채우기 게임에 쓴다.
 *
 * 표제어가 변형된 형태(saved, saving, is saving …)로 들어 있는 경우가 많아서
 * 원형·굴절형을 함께 찾는다. 못 찾으면 null을 돌려주고, 호출부는
 * 다른 게임으로 넘어간다.
 */
export function clozeSentence(entry: VocabEntry, sentence: string): { text: string; answer: string } | null {
  for (const form of wordForms(entry.word)) {
    // 단어 경계로 감싸서 부분 일치(save가 saved 안에서 잡히는 것)를 막는다.
    const re = new RegExp(`\\b${escapeRegExp(form)}\\b`, 'i');
    const m = sentence.match(re);
    if (m) {
      return {
        text: sentence.replace(re, '_____'),
        answer: m[0],
      };
    }
  }
  return null;
}

/**
 * 표제어에서 파생될 법한 형태들. 긴 것부터 시도해야
 * `save`가 `saves`보다 먼저 잡혀서 어색하게 잘리는 일이 없다.
 */
export function wordForms(word: string): string[] {
  const w = word.toLowerCase();

  // 숙어는 첫 낱말만 변한다. (take part in → took part in)
  if (w.includes(' ')) {
    const [head, ...rest] = w.split(' ');
    const tail = rest.join(' ');
    const heads = new Set<string>([head, ...irregularOf(head), ...regularForms(head)]);
    return [...heads].map((h) => `${h} ${tail}`).sort((a, b) => b.length - a.length);
  }

  const forms = new Set<string>([w, ...regularForms(w), ...irregularOf(w)]);
  return [...forms].sort((a, b) => b.length - a.length);
}

/** 규칙 변화형. -s / -ed / -ing 와 철자 규칙. */
function regularForms(w: string): string[] {
  const out = new Set<string>([`${w}s`, `${w}ed`, `${w}ing`]);

  if (w.endsWith('e')) {
    const stem = w.slice(0, -1);
    out.add(`${stem}ed`);
    out.add(`${stem}ing`);
  }
  if (w.endsWith('y') && !/[aeiou]y$/.test(w)) {
    const stem = w.slice(0, -1);
    out.add(`${stem}ies`);
    out.add(`${stem}ied`);
  }
  // stop → stopped / stopping (단모음 + 단자음으로 끝날 때)
  if (/[^aeiou][aeiou][^aeiouwxy]$/.test(w)) {
    const last = w[w.length - 1];
    out.add(`${w}${last}ed`);
    out.add(`${w}${last}ing`);
  }
  if (/(s|x|z|ch|sh)$/.test(w)) {
    out.add(`${w}es`);
  }
  return [...out];
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 실제 원어민 발음·용례 영상으로 보내는 링크. */
export function videoUrl(entry: VocabEntry): string {
  // YouGlish는 유튜브 영상에서 그 표현이 실제로 발화되는 구간만 이어서 보여준다.
  return `https://youglish.com/pronounce/${encodeURIComponent(entry.word)}/english`;
}
