/**
 * 부모님의 하루치를 구성한다.
 *
 * 아이와 무엇이 같고 무엇이 다른가.
 *
 * **같다** — 문제 유형, 라운드, 복습 간격(SM-2), 오늘 뽑는 규칙. 사용자가
 * "학습 방법도 아이들 학습 방법과 동일하게" 하기를 바랐고, 실제로 어른이라고
 * 다른 방식이 더 나을 이유도 없다. 그래서 여기서는 아이 쪽 `buildSession` ·
 * `buildRounds` · `buildKoSession` 을 그대로 부른다.
 *
 * **다르다** — 무엇을 공부할지 스스로 고른다. 아이는 학년이 정해져 있어
 * 레벨 하나면 되지만, 부모는 세 갈래(일상 문장 · 아이들과 같은 영어 단어 ·
 * 국어 어휘)를 켜고 끄고 각각 어디를 볼지 따로 정한다.
 *
 * 화면(react-native)을 끌어오지 않는다. 큐가 어떤 순서로 어떻게 채워지는지는
 * 기기 없이 확인할 수 있어야 한다.
 */

import { CardState, ParentStudy, ParentTrack, Profile } from '../types';
import { KO_ENTRIES } from '../data/korean/levels';
import { entriesOf } from '../data';
import { DAILY_LEVEL, dailyTheme } from '../data/daily';
import { buildKoRounds, buildKoSession, KoSessionItem } from './koSession';
import { buildRounds, buildSession, SessionItem } from './session';

/** 한 문항. study 화면이 영어와 국어를 한 줄에 섞어 두는 것과 같은 모양이다. */
export type ParentQueueItem =
  | ({ track: 'daily' | 'enWord' } & SessionItem)
  | ({ track: 'ko' } & KoSessionItem);

export const isParentKo = (
  item: ParentQueueItem,
): item is { track: 'ko' } & KoSessionItem => item.track === 'ko';

export interface BuildParentQueueArgs {
  profile: Profile;
  cards: Record<string, CardState>;
  /** 한 항목을 몇 번 만날지. 아이 설정과 같은 값을 쓴다. */
  rounds?: number;
  today?: string;
  rand?: () => number;
}

/**
 * 복습 상한은 새로 배우는 개수와 같게 둔다.
 *
 * 아이는 새 단어와 복습을 따로 정하지만, 부모에게 칸을 둘로 늘리면 고를 것이
 * 넷이 된다(갈래 · 주제 · 레벨 · 개수 두 가지). 고를 것이 많으면 고르다가
 * 안 한다. 하루 5개면 복습 5개까지, 10개면 10개까지 — 하루 분량이 두 배를
 * 넘지 않아 어른의 저녁 시간에 들어간다.
 */
export function reviewCapOf(study: ParentStudy): number {
  return study.newPerDay;
}

/**
 * 갈래 하나에 하루 몇 개를 줄지.
 *
 * 켠 갈래끼리 나눠 갖는다. 셋을 다 켰는데 갈래마다 10개씩 내면 하루 30개가
 * 되어 아무도 못 한다. 나머지는 앞 갈래부터 하나씩 준다 — 순서는 부모가
 * 화면에서 본 순서(일상 → 영어 단어 → 국어)와 같다.
 */
export function splitPerTrack(study: ParentStudy): Record<ParentTrack, number> {
  const out: Record<ParentTrack, number> = { daily: 0, enWord: 0, ko: 0 };
  const on = TRACK_ORDER.filter((t) => study.tracks.includes(t));
  if (on.length === 0) return out;

  const base = Math.floor(study.newPerDay / on.length);
  let left = study.newPerDay - base * on.length;
  for (const t of on) {
    out[t] = base + (left > 0 ? 1 : 0);
    if (left > 0) left--;
  }
  return out;
}

/** 화면에 늘어놓는 순서. 큐에 담기는 순서이기도 하다. */
export const TRACK_ORDER: ParentTrack[] = ['daily', 'enWord', 'ko'];

/**
 * 오늘 풀 문항 전부.
 *
 * 갈래를 섞지 않고 이어 붙인다. 아이 화면에서 영어와 국어를 섞지 않은 것과
 * 같은 이유다 — 머리를 갈래 사이에서 오가게 하면 셋 다 힘들다.
 */
export function buildParentQueue({
  profile,
  cards,
  rounds = 3,
  today,
  rand = Math.random,
}: BuildParentQueueArgs): ParentQueueItem[] {
  const study = profile.parentStudy;
  const per = splitPerTrack(study);
  const cap = reviewCapOf(study);
  const out: ParentQueueItem[] = [];

  for (const track of TRACK_ORDER) {
    if (!study.tracks.includes(track) || per[track] <= 0) continue;

    if (track === 'ko') {
      const picked = buildKoSession({
        entries: KO_ENTRIES,
        cards,
        level: profile.koLevel,
        newPerDay: per.ko,
        reviewPerDay: cap,
        today,
        rand,
      });
      for (const i of buildKoRounds(picked, rounds, KO_ENTRIES, rand)) {
        out.push({ track: 'ko', ...i });
      }
      continue;
    }

    const entries = track === 'daily' ? dailyTheme(study.dailyTheme).entries : entriesOf(profile.level);
    const picked = buildSession({
      entries,
      cards,
      // 일상 문장은 레벨을 쓰지 않는다. 주제로 이미 걸러 넘겼으므로
      // 자리만 맞춰 준다.
      level: track === 'daily' ? DAILY_LEVEL : profile.level,
      newPerDay: per[track],
      reviewPerDay: cap,
      today,
      rand,
    });
    for (const i of buildRounds(picked, rounds, rand)) out.push({ track, ...i });
  }

  return out;
}

/** 오늘 다룰 항목 수(중복 제외). 하루 목표로 쓴다. */
export function parentPlannedCount(args: BuildParentQueueArgs): number {
  return new Set(buildParentQueue(args).map((i) => i.entry.id)).size;
}

/** 그 갈래를 얼마나 익혔는지. 부모 학습 기록 화면에 쓴다. */
export function parentTrackProgress(
  profile: Profile,
  cards: Record<string, CardState>,
  track: ParentTrack,
): { total: number; seen: number } {
  const ids =
    track === 'daily'
      ? dailyTheme(profile.parentStudy.dailyTheme).entries.map((e) => e.id)
      : track === 'enWord'
        ? entriesOf(profile.level).map((e) => e.id)
        : KO_ENTRIES.filter((e) => e.level === profile.koLevel).map((e) => e.id);

  return { total: ids.length, seen: ids.filter((id) => cards[id] != null).length };
}
