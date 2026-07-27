/**
 * AsyncStorage 래퍼.
 *
 * 루트 상태(프로필 목록·부모 설정·보상)와 프로필별 학습 데이터를 나눠 저장한다.
 * 아이가 여럿이어도 한 아이 학습 중에 다른 아이 데이터를 읽고 쓰지 않게 하려는 것.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, ProfileData } from '../types';

const ROOT_KEY = 'urivocab:root:v1';
const DATA_KEY = (profileId: string) => `urivocab:data:v1:${profileId}`;

export const STATE_VERSION = 1;

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
  return { cards: {}, days: {}, answers: [] };
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
    return {
      cards: parsed.cards ?? {},
      days: parsed.days ?? {},
      answers: parsed.answers ?? [],
    };
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
      settings: { ...p.settings, rounds: p.settings?.rounds ?? 3 },
    })),
    rewards: state.rewards ?? [],
    role: state.role ?? 'child',
    parentLink: state.parentLink ?? null,
    myPushToken: state.myPushToken ?? null,
    // 받은 리포트는 최근 60건만 남긴다.
    receivedReports: (state.receivedReports ?? []).slice(0, 60),
  };
}
