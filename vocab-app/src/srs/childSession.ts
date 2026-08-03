/**
 * 아이의 하루치를 구성한다.
 *
 * ── 왜 떼어 냈나 ────────────────────────────────────────────
 *
 * 지금까지 아이 큐는 `app/study.tsx` 안에서 만들었고, 홈(`app/home.tsx`)은
 * **영어만** 따로 한 번 더 뽑아 개수를 셌다. 두 곳이 서로 다른 규칙으로 세고
 * 있었던 셈이다. 영어만 켠 아이에게는 우연히 맞았지만, 국어만 켠 아이에게는
 * 홈에 뜨는 '오늘 N개' 가 실제로 풀 것과 아무 상관이 없었다.
 *
 * 그 어긋남이 이번에 문제가 된다. 아이가 자기 폰에서 과목을 켜고 끌 수 있게
 * 되면서 '영어를 끈 아이' 가 흔해지기 때문이다. 세는 곳을 한 군데로 모은다.
 *
 * 부모 쪽(`parentSession.ts`)과 같은 모양이다. 화면(react-native)을 끌어오지
 * 않아 기기 없이 확인할 수 있다.
 *
 * ── 세 갈래를 왜 한 큐에 담나 ───────────────────────────────
 *
 * 아이 입장에서 '오늘 공부' 는 하나다. 영어를 끝내고 국어 버튼을 다시 눌러야
 * 하면 두 번째는 잘 안 누른다. 진도 막대도 두 번 0부터 차오르면 끝이 안 보인다.
 *
 * 다만 **섞지는 않는다.** 갈래를 오가게 하면 셋 다 힘들다. 이어 붙이기만 한다.
 */

import { CardState, Profile, Subject } from '../types';
import { entriesOf } from '../data';
import { KO_ENTRIES } from '../data/korean/levels';
import { DAILY_ENTRIES, DAILY_LEVEL } from '../data/daily';
import { buildKoRounds, buildKoSession, KoSessionItem } from './koSession';
import { buildRounds, buildSession, SessionItem } from './session';

/**
 * 한 문항.
 *
 * `subject` 는 **화면이 무엇으로 그릴지**만 가린다. 일상 문장은 영어 문장이라
 * 영어 문항과 똑같이 그려지므로 여기서는 `'en'` 이다. 무엇을 켰는지는
 * `profile.settings.subjects` 가 알고 있고, 화면은 그것을 알 필요가 없다.
 */
export type ChildQueueItem =
  | ({ subject: 'en' } & SessionItem)
  | ({ subject: 'ko' } & KoSessionItem);

export const isChildKo = (i: ChildQueueItem): i is { subject: 'ko' } & KoSessionItem =>
  i.subject === 'ko';

/**
 * 국어 하루치. 영어의 newPerDay 와 따로 둔다.
 *
 * 국어 어휘는 1,287개뿐이라 영어(3,690개)와 같은 속도로 내면 절반 시점에
 * 동난다. 하루 6개면 24레벨을 도는 데 약 7개월이다.
 */
export const KO_PER_DAY = 6;

/**
 * 일상 생활 문장 하루치.
 *
 * 문장이 80개뿐이라 적게 낸다. 다 만나고 나면 그다음부터는 복습으로만 돈다 —
 * 그게 맞다. 이 갈래는 새것을 계속 대는 것이 아니라 **몇 안 되는 문장을 몸에
 * 붙이는** 것이 목적이다.
 */
export const DAILY_PER_DAY = 4;

export interface BuildChildQueueArgs {
  profile: Profile;
  cards: Record<string, CardState>;
  today?: string;
  rand?: () => number;
}

/** 오늘 뽑힌 항목 하나. 개수를 셀 때만 쓴다. */
export interface PickedItem {
  entryId: string;
  mode: 'review' | 'new';
  subject: Subject;
}

/**
 * 갈래별로 오늘 뽑는다. **라운드로 부풀리기 전이다.**
 *
 * 큐를 만드는 쪽과 개수를 세는 쪽이 같은 것을 보도록 여기 한 번만 적는다.
 */
function pick({ profile, cards, today, rand }: BuildChildQueueArgs) {
  const { subjects, newPerDay, reviewPerDay } = profile.settings;

  const en = subjects.includes('en')
    ? buildSession({
        entries: entriesOf(profile.level),
        cards,
        level: profile.level,
        newPerDay,
        reviewPerDay,
        today,
        rand,
      })
    : [];

  /*
   * 일상 문장은 레벨을 쓰지 않는다. 갈래가 주제로 나뉘어 있고 아이는 주제를
   * 고르지 않으므로 80문장을 통째로 넘긴다. `level` 칸은 자리만 채운다 —
   * 넘긴 것이 이미 그 값으로만 되어 있어 거르개가 아무 일도 하지 않는다.
   */
  const daily = subjects.includes('daily')
    ? buildSession({
        entries: DAILY_ENTRIES,
        cards,
        level: DAILY_LEVEL,
        newPerDay: DAILY_PER_DAY,
        reviewPerDay: DAILY_PER_DAY,
        today,
        rand,
      })
    : [];

  const ko = subjects.includes('ko')
    ? buildKoSession({
        entries: KO_ENTRIES,
        cards,
        level: profile.koLevel,
        newPerDay: KO_PER_DAY,
        reviewPerDay: KO_PER_DAY,
        today,
        rand,
      })
    : [];

  return { en, daily, ko };
}

/**
 * 오늘 풀 문항 전부.
 *
 * 아이가 고른 순서대로 이어 붙인다. 머리가 맑을 때 어려운 쪽을 먼저 하고 싶은
 * 아이가 있고, 쉬운 쪽으로 몸을 풀고 싶은 아이가 있다.
 *
 * 일상 문장은 영어 낱말 옆에 붙인다 — 같은 영어라 머리를 옮길 일이 적다.
 */
export function buildChildQueue(args: BuildChildQueueArgs): ChildQueueItem[] {
  const { profile, rand } = args;
  const rounds = profile.settings.rounds;
  const { en, daily, ko } = pick(args);

  const enQ: ChildQueueItem[] = [
    ...buildRounds(en, rounds, rand).map((i) => ({ subject: 'en' as const, ...i })),
    ...buildRounds(daily, rounds, rand).map((i) => ({ subject: 'en' as const, ...i })),
  ];
  const koQ: ChildQueueItem[] = buildKoRounds(ko, rounds, KO_ENTRIES, rand).map((i) => ({
    subject: 'ko' as const,
    ...i,
  }));

  return profile.settings.firstSubject === 'ko' ? [...koQ, ...enQ] : [...enQ, ...koQ];
}

/**
 * 오늘 뽑힌 것들. 홈에 '오늘 몇 개' 를 적을 때 쓴다.
 *
 * 라운드로 부풀리기 전이라 낱말 수와 바로 이어진다. 같은 낱말이 뜻마다 여러
 * 문항으로 갈리므로 세는 쪽에서 id 로 묶어야 한다.
 */
export function pickChildToday(args: BuildChildQueueArgs): PickedItem[] {
  const { en, daily, ko } = pick(args);
  return [
    ...en.map((i) => ({ entryId: i.entry.id, mode: i.mode, subject: 'en' as Subject })),
    ...daily.map((i) => ({ entryId: i.entry.id, mode: i.mode, subject: 'daily' as Subject })),
    ...ko.map((i) => ({ entryId: i.entry.id, mode: i.mode, subject: 'ko' as Subject })),
  ];
}

/** 오늘 다룰 낱말 수(중복 제외). 하루 목표로 쓴다. */
export function childPlannedCount(args: BuildChildQueueArgs): number {
  return new Set(pickChildToday(args).map((i) => i.entryId)).size;
}

/**
 * 오늘 문제를 낼 후보 전부. 빈칸 문제의 **오답 보기**를 여기서 뽑는다.
 *
 * 일상 문장을 켠 아이에게는 그 문장들도 넣어야 한다. 보기를 아이들 낱말에서만
 * 뽑으면 'on the same page' 자리에 'delicious' 같은 것이 서고, 문장을 읽지
 * 않아도 답이 보인다. 부모 쪽에서 이미 겪은 일이다.
 */
export function childPool(profile: Profile) {
  return [
    ...entriesOf(profile.level),
    ...(profile.settings.subjects.includes('daily') ? DAILY_ENTRIES : []),
  ];
}
