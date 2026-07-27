/**
 * 앱 전역 상태.
 *
 * 화면 수가 많지 않아서 Context + useReducer로 충분하다.
 * 상태가 바뀔 때마다 AsyncStorage에 비동기로 흘려보낸다(write-behind).
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import {
  AnswerLog,
  AppState,
  CardState,
  DailyRecord,
  LevelId,
  Profile,
  ProfileData,
  ProfileSettings,
  ParentSettings,
  RewardRequest,
  RewardStatus,
} from '../types';
import {
  emptyProfileData,
  emptyState,
  loadProfileData,
  loadState,
  removeProfileData,
  saveProfileData,
  saveState,
} from './storage';
import { addDays, todayKey } from '../lib/date';
import { createCard, grade } from '../srs/scheduler';
import { nextLevel } from '../srs/progress';

interface Ctx {
  ready: boolean;
  state: AppState;
  /** 현재 선택된 프로필 */
  profile: Profile | null;
  /** 현재 프로필의 학습 데이터 */
  data: ProfileData;

  addProfile(name: string, avatar: string, level: LevelId): Promise<Profile>;
  selectProfile(id: string): Promise<void>;
  updateProfile(id: string, patch: Partial<Profile>): void;
  updateSettings(id: string, patch: Partial<ProfileSettings>): void;
  deleteProfile(id: string): Promise<void>;

  /** 채점 결과 한 건을 반영한다. */
  recordAnswer(log: AnswerLog): void;
  /** 세션이 끝났을 때 하루 기록을 갱신한다. */
  finishSession(args: { studied: number; seconds: number }): void;

  /** 레벨업 확정. 다음 학년으로 올리고 보상 요청 자격을 준다. */
  levelUp(): void;

  requestReward(wish: string, note: string): void;
  decideReward(id: string, status: RewardStatus, parentNote: string): void;

  updateParent(patch: Partial<ParentSettings>): void;
}

const AppContext = createContext<Ctx | null>(null);

type Action =
  | { type: 'hydrate'; state: AppState; data: ProfileData }
  | { type: 'setState'; state: AppState }
  | { type: 'setData'; data: ProfileData }
  | { type: 'both'; state: AppState; data: ProfileData };

interface Store {
  ready: boolean;
  state: AppState;
  data: ProfileData;
}

function reducer(prev: Store, action: Action): Store {
  switch (action.type) {
    case 'hydrate':
      return { ready: true, state: action.state, data: action.data };
    case 'setState':
      return { ...prev, state: action.state };
    case 'setData':
      return { ...prev, data: action.data };
    case 'both':
      return { ...prev, state: action.state, data: action.data };
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [store, dispatch] = useReducer(reducer, {
    ready: false,
    state: emptyState(),
    data: emptyProfileData(),
  });

  // 최신 값을 콜백에서 읽으려고 ref로 들고 있는다.
  const ref = useRef(store);
  ref.current = store;

  useEffect(() => {
    (async () => {
      const state = await loadState();
      const data = state.activeProfileId
        ? await loadProfileData(state.activeProfileId)
        : emptyProfileData();
      dispatch({ type: 'hydrate', state, data });
    })();
  }, []);

  const persistState = useCallback((state: AppState) => {
    dispatch({ type: 'setState', state });
    void saveState(state);
  }, []);

  const persistData = useCallback((data: ProfileData) => {
    const id = ref.current.state.activeProfileId;
    dispatch({ type: 'setData', data });
    if (id) void saveProfileData(id, data);
  }, []);

  const profile = useMemo(
    () => store.state.profiles.find((p) => p.id === store.state.activeProfileId) ?? null,
    [store.state.profiles, store.state.activeProfileId],
  );

  /* ---------------------------------------------------------------- */
  /* 프로필                                                            */
  /* ---------------------------------------------------------------- */

  const addProfile = useCallback(
    async (name: string, avatar: string, level: LevelId) => {
      const p: Profile = {
        id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        name,
        avatar,
        level,
        settings: {
          dailyGoal: 15,
          reviewRatio: 70,
          ttsEnabled: true,
          hapticsEnabled: true,
        },
        createdAt: Date.now(),
        streak: 0,
        bestStreak: 0,
        lastCompletedDate: null,
        pendingLevelUps: [],
        clearedLevels: [],
      };
      const state: AppState = {
        ...ref.current.state,
        profiles: [...ref.current.state.profiles, p],
        activeProfileId: p.id,
      };
      const data = emptyProfileData();
      dispatch({ type: 'both', state, data });
      await saveState(state);
      await saveProfileData(p.id, data);
      return p;
    },
    [],
  );

  const selectProfile = useCallback(async (id: string) => {
    const state: AppState = { ...ref.current.state, activeProfileId: id };
    const data = await loadProfileData(id);
    dispatch({ type: 'both', state, data });
    await saveState(state);
  }, []);

  const updateProfile = useCallback(
    (id: string, patch: Partial<Profile>) => {
      persistState({
        ...ref.current.state,
        profiles: ref.current.state.profiles.map((p) =>
          p.id === id ? { ...p, ...patch } : p,
        ),
      });
    },
    [persistState],
  );

  const updateSettings = useCallback(
    (id: string, patch: Partial<ProfileSettings>) => {
      persistState({
        ...ref.current.state,
        profiles: ref.current.state.profiles.map((p) =>
          p.id === id ? { ...p, settings: { ...p.settings, ...patch } } : p,
        ),
      });
    },
    [persistState],
  );

  const deleteProfile = useCallback(async (id: string) => {
    const rest = ref.current.state.profiles.filter((p) => p.id !== id);
    const nextActive =
      ref.current.state.activeProfileId === id ? (rest[0]?.id ?? null) : ref.current.state.activeProfileId;
    const state: AppState = {
      ...ref.current.state,
      profiles: rest,
      activeProfileId: nextActive,
      rewards: ref.current.state.rewards.filter((r) => r.profileId !== id),
    };
    const data = nextActive ? await loadProfileData(nextActive) : emptyProfileData();
    dispatch({ type: 'both', state, data });
    await saveState(state);
    await removeProfileData(id);
  }, []);

  /* ---------------------------------------------------------------- */
  /* 학습                                                              */
  /* ---------------------------------------------------------------- */

  const recordAnswer = useCallback(
    (log: AnswerLog) => {
      const { data } = ref.current;
      const today = todayKey();

      const existing: CardState = data.cards[log.entryId] ?? createCard(log.entryId, log.at);
      const graded = grade(existing, log.correct, today, log.at);

      const day: DailyRecord = data.days[today] ?? {
        date: today,
        goal: profileGoal(ref.current.state),
        studied: 0,
        correct: 0,
        wrong: 0,
        seconds: 0,
        completed: false,
        wrongEntryIds: [],
      };

      persistData({
        cards: { ...data.cards, [log.entryId]: graded },
        days: {
          ...data.days,
          [today]: {
            ...day,
            correct: day.correct + (log.correct ? 1 : 0),
            wrong: day.wrong + (log.correct ? 0 : 1),
            wrongEntryIds: log.correct ? day.wrongEntryIds : [...day.wrongEntryIds, log.entryId],
          },
        },
        answers: [...data.answers, log],
      });
    },
    [persistData],
  );

  const finishSession = useCallback(
    ({ studied, seconds }: { studied: number; seconds: number }) => {
      const { data, state } = ref.current;
      const active = state.profiles.find((p) => p.id === state.activeProfileId);
      if (!active) return;

      const today = todayKey();
      const day: DailyRecord = data.days[today] ?? {
        date: today,
        goal: active.settings.dailyGoal,
        studied: 0,
        correct: 0,
        wrong: 0,
        seconds: 0,
        completed: false,
        wrongEntryIds: [],
      };

      const totalStudied = day.studied + studied;
      const completed = totalStudied >= day.goal;
      const wasCompleted = day.completed;

      persistData({
        ...data,
        days: {
          ...data.days,
          [today]: {
            ...day,
            studied: totalStudied,
            seconds: day.seconds + seconds,
            completed,
          },
        },
      });

      // 오늘 처음으로 목표를 채운 순간에만 연속 일수를 올린다.
      if (completed && !wasCompleted) {
        const yesterday = addDays(today, -1);
        const streak = active.lastCompletedDate === yesterday ? active.streak + 1 : 1;
        persistState({
          ...ref.current.state,
          profiles: ref.current.state.profiles.map((p) =>
            p.id === active.id
              ? {
                  ...p,
                  streak,
                  bestStreak: Math.max(p.bestStreak, streak),
                  lastCompletedDate: today,
                }
              : p,
          ),
        });
      }
    },
    [persistData, persistState],
  );

  const levelUp = useCallback(() => {
    const { state } = ref.current;
    const active = state.profiles.find((p) => p.id === state.activeProfileId);
    if (!active) return;
    const next = nextLevel(active.level);
    if (!next) return;

    persistState({
      ...state,
      profiles: state.profiles.map((p) =>
        p.id === active.id
          ? {
              ...p,
              level: next,
              clearedLevels: [...p.clearedLevels, active.level],
              // 클리어한 레벨마다 보상 요청권이 하나 생긴다.
              pendingLevelUps: [...p.pendingLevelUps, active.level],
            }
          : p,
      ),
    });
  }, [persistState]);

  /* ---------------------------------------------------------------- */
  /* 보상                                                              */
  /* ---------------------------------------------------------------- */

  const requestReward = useCallback(
    (wish: string, note: string) => {
      const { state } = ref.current;
      const active = state.profiles.find((p) => p.id === state.activeProfileId);
      if (!active || active.pendingLevelUps.length === 0) return;

      const [earnedFrom, ...restPending] = active.pendingLevelUps;
      const reward: RewardRequest = {
        id: `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        profileId: active.id,
        earnedFrom,
        wish: wish.trim(),
        note: note.trim(),
        status: 'pending',
        createdAt: Date.now(),
        decidedAt: null,
        parentNote: '',
      };

      persistState({
        ...state,
        rewards: [reward, ...state.rewards],
        profiles: state.profiles.map((p) =>
          p.id === active.id ? { ...p, pendingLevelUps: restPending } : p,
        ),
      });
    },
    [persistState],
  );

  const decideReward = useCallback(
    (id: string, status: RewardStatus, parentNote: string) => {
      const { state } = ref.current;
      persistState({
        ...state,
        rewards: state.rewards.map((r) =>
          r.id === id ? { ...r, status, parentNote, decidedAt: Date.now() } : r,
        ),
      });
    },
    [persistState],
  );

  const updateParent = useCallback(
    (patch: Partial<ParentSettings>) => {
      persistState({
        ...ref.current.state,
        parent: { ...ref.current.state.parent, ...patch },
      });
    },
    [persistState],
  );

  const value: Ctx = {
    ready: store.ready,
    state: store.state,
    profile,
    data: store.data,
    addProfile,
    selectProfile,
    updateProfile,
    updateSettings,
    deleteProfile,
    recordAnswer,
    finishSession,
    levelUp,
    requestReward,
    decideReward,
    updateParent,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function profileGoal(state: AppState): number {
  return (
    state.profiles.find((p) => p.id === state.activeProfileId)?.settings.dailyGoal ?? 15
  );
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
