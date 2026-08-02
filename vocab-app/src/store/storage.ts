/**
 * AsyncStorage 래퍼.
 *
 * 루트 상태(프로필 목록·부모 설정·보상)와 프로필별 학습 데이터를 나눠 저장한다.
 * 아이가 여럿이어도 한 아이 학습 중에 다른 아이 데이터를 읽고 쓰지 않게 하려는 것.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  AppState,
  AwardRates,
  DEFAULT_PARENT_PER_DAY,
  LevelId,
  ParentStudy,
  ParentTrack,
  ProfileData,
  ProfileKind,
  RewardRequest,
  Subject,
} from '../types';
import { awardRates, DEFAULT_AWARD_RATES, levelUpAmount, MIDDLE_LEVEL_AWARD } from '../features/awards';
import { DAILY_THEME_LIST, DEFAULT_DAILY_THEME } from '../data/daily';
import { LEGACY_ID_WORD } from './legacy-ids';

const ROOT_KEY = 'urivocab:root:v1';
const DATA_KEY = (profileId: string) => `urivocab:data:v1:${profileId}`;

/**
 * 저장 포맷 판.
 *  1 → 2  학년을 레벨 3개로 쪼개고 단어 id를 표제어 기반으로 바꿈
 *  2 → 3  교육부 기본 어휘 목록 기준으로 24레벨 재편, id에서 레벨을 뗌,
 *         하루 목표를 '새 단어 / 복습' 두 값으로 분리
 *  3 → 4  보상을 '갖고 싶은 것 적어 보내기'에서 '정해진 금액 동기 부여 요청권'으로
 *  4 → 5  동기 부여 요청권 금액을 부모님이 정할 수 있게(ParentSettings.awards),
 *         아이가 1만원 더 요구할 수 있게(RewardRequest.bonus)
 *  5 → 6  프로필에 아이/부모 갈래를 두고(Profile.kind) 부모도 공부하게,
 *         동기 부여 요청권 금액을 아이마다 따로 둘 수 있게(Profile.awards)
 *  6 → 7  부모의 하루 분량을 전체 합계 하나(newPerDay)에서 갈래별
 *         (ParentStudy.perTrack)로. '하루에 10개'가 일상 문장 10개인지
 *         셋을 합쳐 10개인지 화면만 보고는 알 수 없었다.
 */
export const STATE_VERSION = 7;

/** 하루에 새로 만날 단어 수 기본값. 10개면 3,286개를 약 1년에 돈다. */
export const DEFAULT_NEW_PER_DAY = 10;
/** 하루 복습 상한 기본값. 새 단어 10 + 복습 10 = 3라운드 기준 13분쯤. */
export const DEFAULT_REVIEW_PER_DAY = 10;

export function emptyState(): AppState {
  return {
    version: STATE_VERSION,
    profiles: [],
    activeProfileId: null,
    parent: {
      pin: null,
      awards: { ...DEFAULT_AWARD_RATES },
      // 밤 10시. 그때까지 소식이 없으면 오늘은 안 한 것으로 본다.
      notifyHour: 22,
      notifyMinute: 0,
      notifyEnabled: true,
      notifyOnlyWhenMissed: false,
      pushToParent: true,
    },
    rewards: [],
    role: 'child',
    parentLink: null,
    myPushToken: null,
    receivesReports: false,
    receivedReports: [],
    knownChildren: [],
  };
}

/**
 * 과목 목록을 온전하게 만든다.
 *
 * 저장된 값이 깨졌거나 비었으면 영어로 되돌린다. 하나도 안 고른 상태로
 * 두면 낼 문제가 없어 학습 화면이 빈 채로 뜬다.
 */
/** 부모가 아무것도 안 고른 상태. 학습 정하기 화면에서 채운다. */
export function emptyParentStudy(): ParentStudy {
  return {
    tracks: ['daily'],
    dailyTheme: DEFAULT_DAILY_THEME,
    perTrack: { daily: DEFAULT_PARENT_PER_DAY, enWord: DEFAULT_PARENT_PER_DAY, ko: DEFAULT_PARENT_PER_DAY },
  };
}

/** 고를 수 있는 값(5·10) 중 하나로 맞춘다. 그 밖의 값은 가까운 쪽으로. */
export function snapPerDay(n: unknown): number {
  const v = typeof n === 'number' && Number.isFinite(n) ? n : DEFAULT_PARENT_PER_DAY;
  // 5 와 10 의 한가운데(7.5)를 기준으로 가른다.
  return v >= 7.5 ? 10 : DEFAULT_PARENT_PER_DAY;
}

/**
 * 예전 저장본의 `newPerDay`(전체 합계)를 갈래별 값으로 옮긴다.
 *
 * 예전에는 합계를 켠 갈래끼리 나눠 가졌다 — 셋을 켜고 10이면 4/3/3 이었다.
 * 그래서 **그때 실제로 돌던 개수**를 갈래마다 계산한 뒤 고를 수 있는 값
 * (5·10)으로 맞춘다. 합계를 그대로 각 갈래에 넣으면(10 → 10·10·10) 하루
 * 분량이 세 배가 되어, 앱을 새로 받은 다음 날 갑자기 못 끝내게 된다.
 *
 * 4/3/3 은 셋 다 5가 된다. 조금 늘지만 줄어드는 것보다 낫다 — 줄면 어제까지
 * 하던 것이 오늘 갑자기 안 나온다.
 */
export function perTrackFromLegacy(
  tracks: ParentTrack[],
  legacyTotal: unknown,
): Record<ParentTrack, number> {
  const total = typeof legacyTotal === 'number' && Number.isFinite(legacyTotal) ? legacyTotal : 5;
  const on = tracks.length;
  const each = on > 0 ? total / on : total;
  const v = snapPerDay(each);
  return { daily: v, enWord: v, ko: v };
}

/**
 * 저장된 부모 학습 설정을 온전하게 만든다.
 *
 * 주제 id 는 자료 파일이 바뀌면 사라질 수 있다. 없는 주제를 그대로 두면
 * 공부할 문장이 하나도 없는데 화면에는 '일상 문장'이라고 적혀 있게 된다.
 */
export function normalizeParentStudy(v: unknown): ParentStudy {
  const base = emptyParentStudy();
  if (!v || typeof v !== 'object') return base;
  const raw = v as Partial<ParentStudy>;

  const all: ParentTrack[] = ['daily', 'enWord', 'ko'];
  const tracks = Array.isArray(raw.tracks) ? all.filter((t) => raw.tracks!.includes(t)) : [];

  const known = DAILY_THEME_LIST.some((t) => t.id === raw.dailyTheme);

  /*
   * 갈래별 개수. 없으면 예전 저장본이므로 `newPerDay`(전체 합계)에서 옮긴다.
   *
   * 저장 포맷을 버전으로 갈라 처리하지 않는 이유: 이 함수는 불러올 때마다
   * 무조건 지나가므로, 여기서 모양을 맞춰 두면 예전 판에서 온 것이든 깨진
   * 것이든 한 자리에서 온전해진다. STATE_VERSION 은 "언제 무엇이 바뀌었나"를
   * 남기는 표시로만 쓴다.
   */
  const legacy = (raw as { newPerDay?: unknown }).newPerDay;
  const perTrack =
    raw.perTrack && typeof raw.perTrack === 'object'
      ? {
          daily: snapPerDay((raw.perTrack as Record<string, unknown>).daily),
          enWord: snapPerDay((raw.perTrack as Record<string, unknown>).enWord),
          ko: snapPerDay((raw.perTrack as Record<string, unknown>).ko),
        }
      : perTrackFromLegacy(tracks, legacy);

  return {
    // 하나도 안 켜져 있으면 그대로 둔다. '공부할 것을 고르세요'가 맞는 화면이고,
    // 임의로 켜 주면 부모가 고르지 않은 것을 공부하게 된다.
    tracks,
    dailyTheme: known ? raw.dailyTheme! : base.dailyTheme,
    perTrack,
  };
}

/** 저장된 갈래가 깨졌으면 아이로 본다. 예전 저장본에는 아이밖에 없었다. */
export function normalizeKind(v: unknown): ProfileKind {
  return v === 'parent' ? 'parent' : 'child';
}

/** 아이별 금액표. 안 정했으면 null 이고 기기 기본값을 쓴다. */
function normalizeProfileAwards(v: unknown): AwardRates | null {
  return v == null || typeof v !== 'object' ? null : awardRates(v as Partial<AwardRates>);
}

export function normalizeSubjects(v: unknown): Subject[] {
  const all: Subject[] = ['en', 'ko'];
  if (!Array.isArray(v)) return ['en'];
  const picked = all.filter((s) => v.includes(s));
  return picked.length > 0 ? picked : ['en'];
}

export function emptyProfileData(): ProfileData {
  return { cards: {}, days: {}, answers: [], exams: [] };
}

export async function loadState(): Promise<AppState> {
  try {
    const raw = await AsyncStorage.getItem(ROOT_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as AppState;
    return migrate(parsed);
  } catch {
    // 저장된 데이터가 깨졌으면 초기화한다. 학습 기록보다 앱이 뜨는 게 우선.
    return emptyState();
  }
}

export async function saveState(state: AppState): Promise<void> {
  await AsyncStorage.setItem(ROOT_KEY, JSON.stringify(state));
}

export async function loadProfileData(profileId: string): Promise<ProfileData> {
  try {
    const raw = await AsyncStorage.getItem(DATA_KEY(profileId));
    if (!raw) return emptyProfileData();
    const parsed = JSON.parse(raw) as ProfileData;
    return migrateData({
      cards: parsed.cards ?? {},
      days: parsed.days ?? {},
      answers: parsed.answers ?? [],
      exams: parsed.exams ?? [],
    });
  } catch {
    return emptyProfileData();
  }
}

export async function saveProfileData(profileId: string, data: ProfileData): Promise<void> {
  // 답안 로그는 통계용이라 무한정 쌓을 필요가 없다. 최근 2000개만 남긴다.
  const trimmed: ProfileData = {
    ...data,
    answers: data.answers.slice(-2000),
  };
  await AsyncStorage.setItem(DATA_KEY(profileId), JSON.stringify(trimmed));
}

export async function removeProfileData(profileId: string): Promise<void> {
  await AsyncStorage.removeItem(DATA_KEY(profileId));
}

/* ------------------------------------------------------------------ */
/* v1 → v2 : 레벨 쪼개기와 단어 id 교체                                 */
/* ------------------------------------------------------------------ */

/**
 * 예전 레벨(`m1`)을 새 레벨(`m1-1`)로.
 *
 * 학년만 알고 어디까지 했는지는 모르므로 그 학년의 첫 레벨로 보낸다.
 * 아래로 내려 잡는 쪽이 안전하다 — 이미 아는 단어는 카드 상태가 남아 있어서
 * 금방 통과하지만, 위로 올려 잡으면 못 본 단어를 건너뛰게 된다.
 */
function upgradeLevel(level: string): LevelId {
  if (/^[mh][123]-[1-4]$/.test(level)) return level as LevelId;
  if (/^[mh][123]$/.test(level)) return `${level}-1` as LevelId;
  return 'm1-1';
}

function slugOf(word: string): string {
  return word.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/**
 * 예전 단어 id를 지금 형식(표제어 슬러그)으로 바꾼다.
 *
 *   `m1-042`      배열 순서로 만들던 시절 → 표제어 표를 거쳐 변환
 *   `m1-1-save`   레벨이 붙어 있던 시절   → 레벨만 떼면 된다
 *   `save`        지금 형식               → 그대로
 *
 * 바꿀 수 없으면 null이고 그 기록은 버린다. 남겨 두면 존재하지 않는 단어의
 * 카드가 복습 대기열에 떠서 오늘의 학습이 채워지지 않는다.
 */
export function upgradeEntryId(id: string): string | null {
  if (/^[mh][123]-\d{3}$/.test(id)) {
    const word = LEGACY_ID_WORD[id];
    return word ? slugOf(word) : null;
  }
  const withLevel = id.match(/^[mh][123]-[1-4]-(.+)$/);
  if (withLevel) return withLevel[1];
  return id.trim() === '' ? null : id;
}

/** 학습 데이터 안의 단어 id를 새 형식으로 옮긴다. */
export function migrateData(data: ProfileData): ProfileData {
  const cards: ProfileData['cards'] = {};
  for (const [oldId, card] of Object.entries(data.cards)) {
    const id = upgradeEntryId(oldId);
    if (!id) continue;
    // 같은 단어로 합쳐지는 경우는 없지만, 있어도 먼저 온 기록을 지키지 않는다.
    cards[id] = { ...card, entryId: id };
  }

  const days: ProfileData['days'] = {};
  for (const [date, rec] of Object.entries(data.days)) {
    days[date] = {
      ...rec,
      wrongEntryIds: rec.wrongEntryIds
        .map(upgradeEntryId)
        .filter((x): x is string => x !== null),
    };
  }

  return {
    cards,
    days,
    answers: data.answers.flatMap((a) => {
      const id = upgradeEntryId(a.entryId);
      return id ? [{ ...a, entryId: id }] : [];
    }),
    exams: data.exams.map((e) => ({ ...e, level: upgradeLevel(e.level) })),
  };
}

/**
 * 예전 보상 요청(갖고 싶은 것을 적어 보내던 것)을 동기 부여 요청권 형식으로.
 *
 * 금액은 그 레벨의 규칙대로 매기고, 아이가 적었던 소원은 한마디로 옮겨
 * 남긴다. 이미 부모가 판단한 기록까지 지울 이유는 없다.
 */
function upgradeReward(r: RewardRequest & { wish?: string }): RewardRequest {
  // 추가 요구 금액은 나중에 생긴 필드라, 예전 요청은 전부 '기본 금액만'으로 본다.
  // origin도 나중에 생겼다. 그전에는 아이가 신청하는 길밖에 없었으므로 child.
  const withBonus = (x: RewardRequest): RewardRequest => ({
    ...x,
    baseAmount: x.baseAmount ?? x.amount,
    bonus: x.bonus ?? 0,
    bonusReason: x.bonusReason ?? '',
    origin: x.origin ?? 'child',
  });

  if (r.kind) return withBonus(r);

  const level = r.earnedFrom ? upgradeLevel(r.earnedFrom) : null;
  const wish = (r.wish ?? '').trim();
  const amount = level ? levelUpAmount(level) : MIDDLE_LEVEL_AWARD;
  return withBonus({
    ...r,
    kind: 'levelup',
    amount,
    baseAmount: amount,
    bonus: 0,
    bonusReason: '',
    earnedFrom: level,
    month: null,
    reason: wish ? `예전 요청: ${wish}` : '레벨 하나를 끝냈어요',
    note: r.note ?? '',
  });
}

/** 저장 포맷이 바뀌면 여기서 올려준다. */
function migrate(state: AppState): AppState {
  const base = emptyState();
  return {
    ...base,
    ...state,
    version: STATE_VERSION,
    parent: {
      ...base.parent,
      ...(state.parent ?? {}),
      // 금액표는 나중에 생긴 설정이라 예전 저장본에는 없다. 값이 깨져
      // 있어도(숫자가 아니거나 음수) 기본값으로 메운다.
      awards: awardRates(state.parent?.awards),
    },
    // rounds는 나중에 추가된 설정이라 예전에 저장된 프로필에는 없다.
    profiles: (state.profiles ?? []).map((p) => ({
      ...p,
      // 갈래는 나중에 생겼다. 그전에 만든 프로필은 전부 아이다.
      kind: normalizeKind(p.kind),
      awards: normalizeProfileAwards(p.awards),
      linkWaived: p.linkWaived === true,
      parentStudy: normalizeParentStudy(p.parentStudy),
      level: upgradeLevel(p.level),
      pendingLevelUps: (p.pendingLevelUps ?? []).map(upgradeLevel),
      clearedLevels: (p.clearedLevels ?? []).map(upgradeLevel),
      // 국어는 나중에 생겼다. 예전 저장본은 국어를 한 적이 없으므로
      // 맨 처음 레벨에서 시작한다.
      koLevel: upgradeLevel(p.koLevel ?? 'm1-1'),
      koPendingLevelUps: (p.koPendingLevelUps ?? []).map(upgradeLevel),
      koClearedLevels: (p.koClearedLevels ?? []).map(upgradeLevel),
      claimedMonths: p.claimedMonths ?? [],
      settings: {
        ...p.settings,
        newPerDay: p.settings?.newPerDay ?? DEFAULT_NEW_PER_DAY,
        reviewPerDay: p.settings?.reviewPerDay ?? DEFAULT_REVIEW_PER_DAY,
        rounds: p.settings?.rounds ?? 3,
        // 예전 판에는 없던 값이다. 그때는 영어뿐이었으므로 영어로 채운다.
        subjects: normalizeSubjects(p.settings?.subjects),
        // 순서를 고를 수 있게 된 것은 나중이다. 예전 저장본은 영어부터.
        firstSubject: p.settings?.firstSubject === 'ko' ? 'ko' : 'en',
        showTranslation: p.settings?.showTranslation ?? true,
      },
    })),
    rewards: (state.rewards ?? []).map(upgradeReward),
    role: state.role ?? 'child',
    parentLink: state.parentLink ?? null,
    myPushToken: state.myPushToken ?? null,
    // 예전 판에는 이 값이 없다. 부모 전용 기기였다면 받고 있었던 것이므로
    // 역할로 미루어 채운다.
    receivesReports: state.receivesReports ?? state.role === 'parent',
    // 받은 리포트는 최근 60건만 남긴다.
    receivedReports: (state.receivedReports ?? []).slice(0, 60),
    knownChildren: state.knownChildren ?? [],
  };
}
