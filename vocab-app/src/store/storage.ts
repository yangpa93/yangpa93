/**
 * AsyncStorage 래퍼.
 *
 * 루트 상태(프로필 목록·부모 설정·보상)와 프로필별 학습 데이터를 나눠 저장한다.
 * 아이가 여럿이어도 한 아이 학습 중에 다른 아이 데이터를 읽고 쓰지 않게 하려는 것.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, LevelId, ProfileData, RewardRequest } from '../types';
import { levelUpAmount, MIDDLE_LEVEL_AWARD } from '../features/awards';
import { LEGACY_ID_WORD } from './legacy-ids';

const ROOT_KEY = 'urivocab:root:v1';
const DATA_KEY = (profileId: string) => `urivocab:data:v1:${profileId}`;

/**
 * 저장 포맷 판.
 *  1 → 2  학년을 레벨 3개로 쪼개고 단어 id를 표제어 기반으로 바꿈
 *  2 → 3  교육부 기본 어휘 목록 기준으로 24레벨 재편, id에서 레벨을 뗌,
 *         하루 목표를 '새 단어 / 복습' 두 값으로 분리
 *  3 → 4  보상을 '갖고 싶은 것 적어 보내기'에서 '정해진 금액 요구권'으로
 */
export const STATE_VERSION = 4;

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
      notifyHour: 21,
      notifyMinute: 0,
      notifyEnabled: true,
      notifyOnlyWhenMissed: false,
      pushToParent: true,
    },
    rewards: [],
    role: 'child',
    parentLink: null,
    myPushToken: null,
    receivedReports: [],
  };
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
 * 예전 보상 요청(갖고 싶은 것을 적어 보내던 것)을 요구권 형식으로.
 *
 * 금액은 그 레벨의 규칙대로 매기고, 아이가 적었던 소원은 한마디로 옮겨
 * 남긴다. 이미 부모가 판단한 기록까지 지울 이유는 없다.
 */
function upgradeReward(r: RewardRequest & { wish?: string }): RewardRequest {
  if (r.kind) return r;
  const level = r.earnedFrom ? upgradeLevel(r.earnedFrom) : null;
  const wish = (r.wish ?? '').trim();
  return {
    ...r,
    kind: 'levelup',
    amount: level ? levelUpAmount(level) : MIDDLE_LEVEL_AWARD,
    earnedFrom: level,
    month: null,
    reason: wish ? `예전 요청: ${wish}` : '레벨 하나를 끝냈어요',
    note: r.note ?? '',
  };
}

/** 저장 포맷이 바뀌면 여기서 올려준다. */
function migrate(state: AppState): AppState {
  const base = emptyState();
  return {
    ...base,
    ...state,
    version: STATE_VERSION,
    parent: { ...base.parent, ...(state.parent ?? {}) },
    // rounds는 나중에 추가된 설정이라 예전에 저장된 프로필에는 없다.
    profiles: (state.profiles ?? []).map((p) => ({
      ...p,
      level: upgradeLevel(p.level),
      pendingLevelUps: (p.pendingLevelUps ?? []).map(upgradeLevel),
      clearedLevels: (p.clearedLevels ?? []).map(upgradeLevel),
      claimedMonths: p.claimedMonths ?? [],
      settings: {
        ...p.settings,
        newPerDay: p.settings?.newPerDay ?? DEFAULT_NEW_PER_DAY,
        reviewPerDay: p.settings?.reviewPerDay ?? DEFAULT_REVIEW_PER_DAY,
        rounds: p.settings?.rounds ?? 3,
        showTranslation: p.settings?.showTranslation ?? true,
      },
    })),
    rewards: (state.rewards ?? []).map(upgradeReward),
    role: state.role ?? 'child',
    parentLink: state.parentLink ?? null,
    myPushToken: state.myPushToken ?? null,
    // 받은 리포트는 최근 60건만 남긴다.
    receivedReports: (state.receivedReports ?? []).slice(0, 60),
  };
}
