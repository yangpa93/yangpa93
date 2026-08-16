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
  DeviceRole,
  ExamResult,
  LevelId,
  ParentLink,
  ParentStudy,
  Profile,
  ProfileData,
  ProfileKind,
  ProfileSettings,
  KnownChild,
  ParentSettings,
  ReceivedReport,
  RewardRequest,
  RewardStatus,
  Subject,
} from '../types';
import { ALL_ENTRIES, entriesOf } from '../data';
import { DATA_VERSION } from '../data/dataVersion';
import { Award, buildRewardRequest, claimAward, ratesOf } from '../features/awards';
import { MAX_CHILDREN, canAcceptChild } from '../features/children';
import { addAnswer, closeSession, emptyDay } from '../features/dayRecord';
import {
  addParentLink,
  primaryParent,
  removeParentLink,
  setPrimaryParent as setPrimary,
} from '../features/parentLinks';
import { plannedWordCount } from '../srs/session';
import { parentPlannedCount } from '../srs/parentSession';
import { buildDailyReport, buildWeeklySummary } from '../features/report';
import {
  SendResult,
  sendReportToParent,
  sendRewardAskToParent,
  sendRewardDecisionToChild,
  toPayload,
} from '../features/push';
import type { RewardAskPayload, RewardDecisionPayload } from '../features/pairing';
import {
  DEFAULT_NEW_PER_DAY,
  DEFAULT_REVIEW_PER_DAY,
  emptyParentStudy,
  emptyProfileData,
  emptyState,
  loadProfileData,
  loadState,
  removeProfileData,
  saveProfileData,
  saveState,
} from './storage';
import { prepareVoice, setEnglishVoice, setSpeechRate } from '../lib/feedback';
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

  /**
   * 프로필 하나를 만든다.
   *
   * `kind` 로 아이와 부모가 갈린다. 부모 프로필은 학년이 뜻이 없지만
   * 레벨 칸은 그대로 둔다 — 부모가 '아이들과 같은 단어'를 고르면 그때
   * 이 값을 쓴다.
   */
  addProfile(name: string, avatar: string, level: LevelId, kind?: ProfileKind): Promise<Profile>;
  /** 부모 프로필의 학습 설정을 바꾼다. */
  updateParentStudy(id: string, patch: Partial<ParentStudy>): void;
  selectProfile(id: string): Promise<void>;
  updateProfile(id: string, patch: Partial<Profile>): void;
  updateSettings(id: string, patch: Partial<ProfileSettings>): void;
  deleteProfile(id: string): Promise<void>;

  /** 채점 결과 한 건을 반영한다. */
  recordAnswer(log: AnswerLog): void;
  /** 세션이 끝났을 때 하루 기록을 갱신한다. */
  finishSession(args: {
    studied: number;
    seconds: number;
    reachedEnd: boolean;
    /** 이번에 푼 갈래. 켠 갈래가 다 모여야 하루가 끝난다. */
    subject: Subject;
  }): void;

  /** 영어 레벨업 확정. 다음 학년으로 올리고 보상 요청 자격을 준다. */
  levelUp(): void;
  /** 국어 레벨업 확정. 영어와 따로 올라간다. */
  koLevelUp(): void;
  /** 레벨 시험 결과를 남긴다. */
  recordExam(result: ExamResult): void;

  /**
   * 동기 부여 요청권 하나를 부모님께 신청한다.
   *
   * `bonus`는 아이가 "이번엔 정말 잘했어요"라며 얹은 금액(원). 0이면 안 얹은 것.
   */
  requestReward(award: Award, note: string, bonus?: number, bonusReason?: string): void;
  /**
   * 부모님이 아이에게 동기 부여 요청권을 먼저 준다.
   *
   * 아이가 신청하기를 기다리지 않고 부모가 바로 주는 길. 아이가 신청하는
   * 길(requestReward)은 그대로 둔다 — 스스로 "이만큼 했어요"라고 말하는
   * 자리를 없애지 않으려는 것.
   *
   * 승인된 상태로 바로 만들어진다. 부모가 먼저 주기로 한 것을 다시
   * 부모가 승인할 이유가 없다.
   */
  grantReward(profileId: string, award: Award, parentNote?: string): void;
  /**
   * 부모님의 판단.
   *
   * `amount`를 주면 그 금액으로 확정한다. 아이가 얹은 금액은 빼고 기본
   * 금액만 주기로 할 때 쓴다.
   */
  decideReward(id: string, status: RewardStatus, parentNote: string, amount?: number): void;

  updateParent(patch: Partial<ParentSettings>): void;

  /* 백업 */
  /** 모든 아이의 학습 데이터를 읽어 온다. 내보내기에 쓴다. */
  readAllProfileData(): Promise<Record<string, ProfileData>>;
  /**
   * 상태와 모든 아이의 학습 데이터를 통째로 바꾼다. 가져오기에 쓴다.
   *
   * 되돌리기는 한 번에 전부 성공하거나 전부 실패해야 한다. 절반만 쓰이면
   * 프로필은 있는데 기록이 없는 상태가 되어 되돌릴 방법도 없어진다.
   */
  replaceAll(state: AppState, data: Record<string, ProfileData>): Promise<void>;

  /* 기기 역할과 페어링 */
  setRole(role: DeviceRole): void;
  setMyPushToken(token: string | null): void;
  /** 부모 기기를 목록에 더한다. 이미 있으면 이름만 새로 고친다. */
  linkParent(link: ParentLink): void;
  /** 주소를 주면 그 폰만, 안 주면 전부 끊는다. */
  unlinkParent(token?: string): void;
  /** 주 부모를 정한다. 동기 부여 요청권 알림이 이 폰으로 간다. */
  setPrimaryParent(token: string): void;
  /** 이 기기가 아이들 리포트를 받을지 켜고 끈다. */
  setReceivesReports(on: boolean): void;
  /** 새로 온 낱말 안내를 봤다고 적는다. 사람이 확인을 누를 때만 부른다. */
  markDataSeen(): void;
  /** 부모 기기가 받은 리포트를 쌓는다. 같은 아이·같은 날짜는 최신 것으로 덮는다. */
  addReceivedReport(report: Omit<ReceivedReport, 'id' | 'receivedAt'>): void;
  /**
   * **다른 폰의 아이**가 보낸 요청권 신청을 부모 폰 목록에 넣는다.
   *
   * 이 폰에 그 아이 프로필이 없으므로 `profileId` 대신 이름으로 가린다.
   * 같은 신청이 두 번 와도(알림을 받고 또 눌렀을 때) 한 번만 쌓는다.
   */
  addChildReward(ask: RewardAskPayload): void;
  /**
   * **아이 폰**이 부모의 판단을 받아 제 신청에 반영한다.
   *
   * 이게 없으면 부모가 승인해도 아이 화면은 「기다리는 중」 그대로다.
   */
  applyRewardDecision(decision: RewardDecisionPayload): void;
  /**
   * 알림을 보낼 수 있는 아이 기기를 기억한다. 같은 이름이면 주소를 갱신한다.
   * 아이가 이미 MAX_CHILDREN 명이면 **받지 않고 false** 를 돌려준다.
   */
  rememberChild(name: string, token: string): boolean;
  /** 다른 폰의 아이에게 보낸 설정(레벨·금액)을 부모 폰에 적어 둔다. */
  rememberChildSettings(
    name: string,
    patch: Partial<
      Pick<
        KnownChild,
        | 'sentLevel'
        | 'sentKoLevel'
        | 'rates'
        | 'sentSubjects'
        | 'sentNewPerDay'
        | 'sentKoNewPerDay'
        | 'sentDailyNewPerDay'
      >
    >,
  ): void;
  /** 지금 리포트를 부모 기기로 보낸다. 결과를 돌려준다. */
  pushReportNow(profileId?: string): Promise<SendResult>;
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

  /**
   * 상태를 갈아 끼우고 저장한다.
   *
   * ── 왜 ref 를 여기서 손으로 앞당기나 ────────────────────────
   *
   * `ref.current = store` 는 **다시 그려질 때** 갱신된다. 그런데 여기 있는
   * 설정 함수들은 전부 `ref.current.state` 를 읽어다 고쳐 쓴다. 그러니 한
   * 틱 안에서 둘을 이어 부르면 **뒤엣것이 앞엣것을 지운다** — 뒤엣것이
   * 읽은 것은 아직 갱신되지 않은 옛 상태이기 때문이다.
   *
   * 이것 때문에 **아이 연결이 안 됐다.** 부모 폰이 아이 QR 을 찍으면
   * `rememberChild()` 로 아이를 넣고 바로 다음 줄에서 `setReceivesReports(true)`
   * 를 부르는데, 그 한 줄이 방금 넣은 아이를 통째로 되돌려 놓았다. 화면은
   * 아이 목록으로 넘어가고 거기에는 아무도 없다. 찍은 사람 눈에는 "찍었는데
   * 연결이 안 됐다" 로 보인다. 정확히 그 말을 들었다.
   *
   * 부르는 쪽마다 순서를 조심하는 것으로는 못 고친다 — 고쳐야 할 자리가
   * 스무 곳이고, 새로 하나 늘 때마다 같은 함정이 다시 생긴다. 값이 갱신되는
   * 자리를 한 곳으로 모아 **저장하는 순간 ref 도 같이 앞당긴다.**
   *
   * 저장은 여전히 dispatch 로 흘러가므로 화면은 평소대로 다시 그려진다.
   */
  const persistState = useCallback((state: AppState) => {
    ref.current = { ...ref.current, state };
    dispatch({ type: 'setState', state });
    void saveState(state);
  }, []);

  const persistData = useCallback((data: ProfileData) => {
    const id = ref.current.state.activeProfileId;
    ref.current = { ...ref.current, data };
    dispatch({ type: 'setData', data });
    if (id) void saveProfileData(id, data);
  }, []);

  const profile = useMemo(
    () => store.state.profiles.find((p) => p.id === store.state.activeProfileId) ?? null,
    [store.state.profiles, store.state.activeProfileId],
  );

  /*
   * 아이가 골라 둔 영어 목소리를 소리 쪽에 알려 준다.
   *
   * feedback.ts 는 화면을 모르는 모듈이라 프로필을 직접 읽을 수 없다. 프로필이
   * 바뀔 때마다(다른 아이로 바꾸거나 설정에서 고르거나) 여기서 한 번 넘겨 준다.
   * 안 넘기면 골라 놓고 앱을 껐다 켰을 때 예전 목소리로 되돌아간다.
   */
  useEffect(() => {
    const id = profile?.settings.voiceId ?? null;
    setSpeechRate(profile?.settings.speechRate ?? null);
    void prepareVoice().then(() => setEnglishVoice(id));
  }, [profile?.id, profile?.settings.voiceId, profile?.settings.speechRate]);

  /* ---------------------------------------------------------------- */
  /* 프로필                                                            */
  /* ---------------------------------------------------------------- */

  const addProfile = useCallback(
    async (name: string, avatar: string, level: LevelId, kind: ProfileKind = 'child') => {
      const p: Profile = {
        id: `p_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        name,
        kind,
        avatar,
        level,
        // 국어는 늘 처음부터. 영어 레벨을 중2로 잡아도 국어는 별개다.
        koLevel: 'm1-1',
        settings: {
          newPerDay: DEFAULT_NEW_PER_DAY,
          reviewPerDay: DEFAULT_REVIEW_PER_DAY,
          rounds: 3,
          // 처음 만들 때는 영어만. 국어를 하려면 부모님이 켜 준다.
          subjects: ['en'],
          firstSubject: 'en',
          showTranslation: true,
          ttsEnabled: true,
          hapticsEnabled: true,
        },
        createdAt: Date.now(),
        streak: 0,
        bestStreak: 0,
        lastCompletedDate: null,
        pendingLevelUps: [],
        koPendingLevelUps: [],
        clearedLevels: [],
        koClearedLevels: [],
        claimedMonths: [],
        // 금액표는 기기 기본값을 그대로 쓴다. 아이별로 다르게 두고 싶을 때만
        // 아이별 보고서 화면에서 채운다.
        awards: null,
        linkWaived: false,
        parentStudy: emptyParentStudy(),
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

  const updateParentStudy = useCallback(
    (id: string, patch: Partial<ParentStudy>) => {
      persistState({
        ...ref.current.state,
        profiles: ref.current.state.profiles.map((p) =>
          p.id === id ? { ...p, parentStudy: { ...p.parentStudy, ...patch } } : p,
        ),
      });
    },
    [persistState],
  );

  /* ---------------------------------------------------------------- */
  /* 백업                                                              */
  /* ---------------------------------------------------------------- */

  const readAllProfileData = useCallback(async () => {
    const out: Record<string, ProfileData> = {};
    for (const p of ref.current.state.profiles) {
      // 지금 보고 있는 아이는 메모리 쪽이 최신이다. 방금 푼 문제가
      // 아직 저장 중일 수 있어서 저장소에서 읽으면 한 세션이 빠진다.
      out[p.id] =
        p.id === ref.current.state.activeProfileId
          ? ref.current.data
          : await loadProfileData(p.id);
    }
    return out;
  }, []);

  const replaceAll = useCallback(async (state: AppState, data: Record<string, ProfileData>) => {
    // 아이별 데이터를 먼저 다 쓰고 마지막에 상태를 쓴다. 중간에 죽어도
    // 예전 상태가 남아 있어 '프로필은 있는데 기록이 없는' 꼴은 안 된다.
    for (const [id, d] of Object.entries(data)) {
      await saveProfileData(id, d);
    }
    await saveState(state);

    const activeId = state.activeProfileId;
    const active = activeId ? (data[activeId] ?? (await loadProfileData(activeId))) : emptyProfileData();
    dispatch({ type: 'both', state, data: active });
  }, []);

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

      const day = data.days[today] ?? emptyDay(today, profileGoal(ref.current.state, data));

      persistData({
        ...data,
        cards: { ...data.cards, [log.entryId]: graded },
        days: {
          ...data.days,
          [today]: addAnswer(day, log.entryId, log.correct, log.subject),
        },
        answers: [...data.answers, log],
      });
    },
    [persistData],
  );

  const finishSession = useCallback(
    ({
      studied,
      seconds,
      reachedEnd,
      subject,
    }: {
      studied: number;
      seconds: number;
      /**
       * 오늘 낼 문제를 끝까지 다 봤는지.
       *
       * 개수만으로는 못 가린다 — 한 낱말이 하루에 세 바퀴 나오므로 첫 바퀴만
       * 돌아도 '만난 낱말의 가짓수' 는 이미 목표와 같아진다. 그래서 중간에
       * 그만둬도 다 한 것으로 적혔다. 부른 쪽이 알고 있는 값을 받는다.
       */
      reachedEnd: boolean;
      /**
       * 이번에 푼 갈래.
       *
       * 갈래마다 따로 들어가 풀게 되면서 필요해졌다. **켠 갈래가 다 모여야**
       * 하루가 끝나므로, 어느 갈래를 끝냈는지 적어 두어야 한다.
       */
      subject: Subject;
    }) => {
      const { data, state } = ref.current;
      const active = state.profiles.find((p) => p.id === state.activeProfileId);
      if (!active) return;

      const today = todayKey();
      const day = data.days[today] ?? emptyDay(today, profileGoal(state, data));
      const wasCompleted = day.completed;

      const closed = closeSession(day, {
        studied,
        seconds,
        reachedEnd,
        subject,
        required: active.settings.subjects,
      });
      const completed = closed.completed;

      const nextData: ProfileData = {
        ...data,
        days: { ...data.days, [today]: closed },
      };
      persistData(nextData);

      // 오늘 처음으로 목표를 채운 순간에만 연속 일수를 올린다.
      let updated = active;
      if (completed && !wasCompleted) {
        const yesterday = addDays(today, -1);
        const streak = active.lastCompletedDate === yesterday ? active.streak + 1 : 1;
        updated = {
          ...active,
          streak,
          bestStreak: Math.max(active.bestStreak, streak),
          lastCompletedDate: today,
        };
        persistState({
          ...ref.current.state,
          profiles: ref.current.state.profiles.map((p) => (p.id === active.id ? updated : p)),
        });
      }

      // 부모님 폰이 연결돼 있으면 방금 끝낸 결과를 바로 쏜다.
      // 실패해도 아이 화면을 막지 않는다 — 조용히 넘어가고
      // 부모 모드의 '마지막 전송' 표시로만 드러난다.
      // 부모 자신의 공부는 보내지 않는다. 리포트는 "아이가 오늘 했는가"를
      // 알리는 것인데, 부모가 자기 폰으로 자기 기록을 받아 봐야 소용이 없다.
      const links = ref.current.state.parentLinks;
      if (links.length > 0 && state.parent.pushToParent && active.kind === 'child') {
        const report = buildDailyReport(updated, nextData, ALL_ENTRIES, today);
        // 아이 기기 주소를 같이 싣는다. 부모가 "공부하자"고 되보내려면 필요하다.
        const payload = toPayload(
          report,
          buildWeeklySummary(nextData, today),
          ref.current.state.myPushToken,
          // 그날 기록 원본. 갈래별 성적과 틀린 낱말 id 가 여기서 실린다 —
          // 부모 폰이 달력과 날짜별 보고서를 그릴 알맹이다.
          nextData.days[today],
        );
        /*
         * **연결된 폰 전부에게 보낸다.** 한쪽이 실패해도 다른 쪽은 간다 —
         * 엄마 폰이 꺼져 있다고 아빠 폰까지 못 받을 이유가 없다.
         * 보낸 표시(lastSentDate)도 성공한 폰에만 찍는다. 그래야 부모 화면의
         * '마지막 전송'이 그 폰의 진짜 상태를 말한다.
         */
        for (const link of links) {
          void sendReportToParent(link.token, payload)
            .then((res) => {
              if (!res.ok) return;
              persistState({
                ...ref.current.state,
                parentLinks: ref.current.state.parentLinks.map((l) =>
                  l.token === link.token ? { ...l, lastSentDate: today } : l,
                ),
              });
            })
            .catch(() => {});
        }
      }
    },
    [persistData, persistState],
  );

  const recordExam = useCallback(
    (result: ExamResult) => {
      const { data } = ref.current;
      persistData({ ...data, exams: [result, ...data.exams].slice(0, 30) });
    },
    [persistData],
  );

  /**
   * 국어 레벨을 올린다.
   *
   * 영어와 완전히 따로 간다. 국어 어휘가 1,244개라 영어(3,285개)보다 빨리
   * 끝나므로, 한쪽이 다른 쪽을 기다리게 하면 진도가 막힌다.
   */
  const koLevelUp = useCallback(() => {
    const { state } = ref.current;
    const active = state.profiles.find((p) => p.id === state.activeProfileId);
    if (!active) return;
    const next = nextLevel(active.koLevel);
    if (!next) return;

    // 영어와 같은 규칙 — 한 레벨에 요청권은 한 번뿐이다. levelUp 주석 참고.
    const already = (active.koClearedLevels ?? []).includes(active.koLevel);

    persistState({
      ...state,
      profiles: state.profiles.map((p) =>
        p.id === active.id
          ? {
              ...p,
              koLevel: next,
              koClearedLevels: already
                ? (p.koClearedLevels ?? [])
                : [...(p.koClearedLevels ?? []), active.koLevel],
              koPendingLevelUps: already
                ? (p.koPendingLevelUps ?? [])
                : [...(p.koPendingLevelUps ?? []), active.koLevel],
            }
          : p,
      ),
    });
  }, [persistState]);

  const levelUp = useCallback(() => {
    const { state } = ref.current;
    const active = state.profiles.find((p) => p.id === state.activeProfileId);
    if (!active) return;
    const next = nextLevel(active.level);
    if (!next) return;

    /*
     * **한 레벨에 요청권은 한 번뿐이다.**
     *
     * 아이가 자기 레벨을 고를 수 있게 되면서 생긴 규칙이다. 이미 끝낸 레벨로
     * 되돌아가 시험을 다시 보면 요청권이 또 생겼는데, 그러면 쉬운 레벨을
     * 오가며 돈을 계속 받을 수 있다. 되돌아가 복습하는 것 자체는 좋은 일이라
     * 막지 않고, **돈만 한 번으로 묶는다.**
     */
    const already = active.clearedLevels.includes(active.level);

    persistState({
      ...state,
      profiles: state.profiles.map((p) =>
        p.id === active.id
          ? {
              ...p,
              level: next,
              clearedLevels: already ? p.clearedLevels : [...p.clearedLevels, active.level],
              pendingLevelUps: already
                ? p.pendingLevelUps
                : [...p.pendingLevelUps, active.level],
            }
          : p,
      ),
    });
  }, [persistState]);

  /* ---------------------------------------------------------------- */
  /* 보상                                                              */
  /* ---------------------------------------------------------------- */

  const requestReward = useCallback(
    (award: Award, note: string, bonus = 0, bonusReason = '') => {
      const { state } = ref.current;
      const active = state.profiles.find((p) => p.id === state.activeProfileId);
      if (!active) return;
      addReward(state, active, award, {
        origin: 'child',
        bonus,
        bonusReason,
        note,
      });

      /*
       * **주 부모에게만** 알린다.
       *
       * 리포트는 연결된 폰 전부가 받지만 이것은 하나에만 간다. 엄마와 아빠가
       * 각각 승인하면 같은 것을 두 번 주게 된다. 누가 받을지는 아이가 자기
       * ⚙️ 설정에서 고른다.
       *
       * 실패해도 신청은 아이 폰에 그대로 남는다. 알림이 못 갔다고 신청을
       * 무르면 아이는 자기가 뭘 잘못했는지 모른 채 다시 눌러야 한다.
       */
      const primary = primaryParent(state.parentLinks);
      if (primary && active.kind === 'child') {
        void sendRewardAskToParent(primary.token, {
          childName: active.name,
          reason: award.reason,
          amount: award.amount + Math.max(0, bonus),
          /*
           * **방금 만든 신청의 번호를 같이 보낸다.** 부모가 승인하면 이 번호를
           * 되돌려 주고, 아이 폰은 그것으로 제 신청을 찾아 상태를 바꾼다.
           * 없으면 부모가 승인해도 아이 화면은 「기다리는 중」 그대로다.
           *
           * `addReward` 가 방금 목록 맨 앞에 넣은 것이 그것이다.
           */
          askId: ref.current.state.rewards[0]?.id,
          askKind: award.kind,
          ...(award.date ? { date: award.date } : {}),
          ...(award.month ? { month: award.month } : {}),
          ...(award.effortSuggestion ? { effortSuggestion: award.effortSuggestion } : {}),
          ...(note ? { note } : {}),
          // 되보낼 주소. 아이 폰이 제 주소를 모르면 부모가 답을 보낼 길이 없다.
          ...(state.myPushToken ? { childToken: state.myPushToken } : {}),
        }).catch(() => {});
      }
    },
    // addReward 는 persistState 만 붙잡는다.
    [persistState],
  );

  const grantReward = useCallback(
    (profileId: string, award: Award, parentNote = '') => {
      const { state } = ref.current;
      const target = state.profiles.find((p) => p.id === profileId);
      if (!target) return;
      addReward(state, target, award, { origin: 'parent', parentNote });
    },
    [persistState],
  );

  /**
   * 동기 부여 요청권 기록을 하나 남기고, 그 동기 부여 요청권을 원장에서 지운다.
   *
   * 아이 신청과 부모 지급이 같은 길을 타야 기록의 모양이 어긋나지 않는다.
   * 실제 판단은 전부 features/awards.ts 의 순수 함수들이 한다.
   */
  function addReward(
    state: AppState,
    target: Profile,
    award: Award,
    opts: {
      origin: 'child' | 'parent';
      bonus?: number;
      bonusReason?: string;
      note?: string;
      parentNote?: string;
    },
  ) {
    const reward = buildRewardRequest({
      id: `r_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
      profileId: target.id,
      award,
      now: Date.now(),
      // 얹을 수 있는 한 칸도 아이마다 다를 수 있다.
      bonusCap: ratesOf(target, state.parent.awards).bonus,
      ...opts,
    });

    persistState({
      ...state,
      rewards: [reward, ...state.rewards],
      profiles: state.profiles.map((p) => (p.id === target.id ? claimAward(p, award) : p)),
    });
  }

  const decideReward = useCallback(
    (id: string, status: RewardStatus, parentNote: string, amount?: number) => {
      const { state } = ref.current;
      const target = state.rewards.find((r) => r.id === id);
      persistState({
        ...state,
        rewards: state.rewards.map((r) =>
          r.id === id
            ? {
                ...r,
                status,
                parentNote,
                decidedAt: Date.now(),
                // 금액을 줄여 승인하면 얹었던 금액도 그만큼 줄어든다.
                ...(amount != null
                  ? { amount, bonus: Math.max(0, amount - r.baseAmount) }
                  : {}),
              }
            : r,
        ),
      });

      /*
       * **다른 폰의 아이면 결과를 되보낸다.**
       *
       * 이 폰에 프로필이 있는 아이는 여기서 끝난다 — 같은 저장소를 보므로
       * 화면이 곧바로 바뀐다. 그런데 아이가 제 폰을 쓰면 여기서 승인해도
       * 아이 폰은 아무것도 모른다. 아이 화면에는 「기다리는 중」 이 그대로
       * 남고, 저금통에도 안 쌓인다.
       *
       * 실패해도 이 폰의 판단은 그대로 둔다. 못 갔다고 되돌리면 부모가 같은
       * 것을 또 판단해야 한다. 아이 폰은 다음 리포트를 보낼 때까지 모른 채
       * 있게 되지만, 판단이 사라지는 것보다는 낫다.
       */
      if (target?.childToken && target.askId) {
        void sendRewardDecisionToChild(target.childToken, {
          askId: target.askId,
          approved: status === 'approved',
          amount: amount ?? target.amount,
          parentNote,
          from: primaryParent(state.parentLinks)?.label ?? '부모님',
        }).catch(() => {});
      }
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

  /* ---------------------------------------------------------------- */
  /* 기기 역할과 페어링                                                 */
  /* ---------------------------------------------------------------- */

  const setRole = useCallback(
    (role: DeviceRole) => persistState({ ...ref.current.state, role }),
    [persistState],
  );

  const setMyPushToken = useCallback(
    (myPushToken: string | null) => persistState({ ...ref.current.state, myPushToken }),
    [persistState],
  );

  const setReceivesReports = useCallback(
    (receivesReports: boolean) => persistState({ ...ref.current.state, receivesReports }),
    [persistState],
  );

  /**
   * 새로 온 낱말 안내를 봤다고 적는다.
   *
   * **자동으로 적지 않는다.** 앱이 뜨자마자 표시해 버리면, 알림을 보기도 전에
   * 잠깐 다른 화면에 갔다 오는 사이에 사라진다. 사람이 '확인' 을 누른 뒤에만
   * 적는다 — 놓쳐서 영영 못 보는 것보다 한 번 더 보이는 편이 낫다.
   */
  const markDataSeen = useCallback(
    () => persistState({ ...ref.current.state, seenDataVersion: DATA_VERSION }),
    [persistState],
  );

  /**
   * QR 로 이어진 아이를 기억한다. **자리가 없으면 false 를 돌려준다.**
   *
   * 조용히 무시하지 않는 이유: 부모는 QR 을 찍었고 화면은 아무 말이 없는데
   * 아이 목록에는 안 생긴다. 그러면 몇 번을 더 찍어 보다가 앱이 고장 났다고
   * 여긴다. 못 받았으면 못 받았다고 말해 줘야 한다.
   */
  const rememberChild = useCallback(
    (name: string, token: string, byHand = false): boolean => {
      const { state } = ref.current;
      const forgotten = state.forgottenChildren ?? [];

      /*
       * **손으로 끊은 아이는 저절로 돌아오지 않는다.**
       *
       * 리포트가 도착할 때마다 보낸 아이를 자동으로 넣는데(PushBridge), 그건
       * 원래 좋은 것이다 — 아이가 앱을 다시 깔아 주소가 바뀌어도 알아서
       * 이어진다. 다만 사람이 끊은 것까지 되돌리면 안 된다. 그러면 지운 아이가
       * 며칠 뒤 되살아나고, 지운 사람 눈에는 앱이 고장 난 것으로 보인다.
       *
       * 부모가 그 아이 QR 을 다시 찍은 것(byHand)은 다르다. 손으로 끊은 것을
       * 손으로 다시 이은 것이니 빗장을 푼다.
       */
      if (!byHand && forgotten.includes(token)) return false;

      if (!canAcceptChild(state.profiles, state.knownChildren ?? [], name)) return false;
      const rest = (state.knownChildren ?? []).filter((c) => c.name !== name);
      persistState({
        ...state,
        // 같은 이름이 이미 있으면 주소를 갱신한다. 앱을 다시 깔면 주소가
        // 바뀌는데, 옛 주소로 보내면 조용히 사라진다.
        /*
         * **예전에 보내 둔 설정을 지키다.** 같은 이름이 이미 있으면 그 아이에게
         * 보냈던 레벨·금액을 그대로 옮겨 온다. 안 그러면 아이가 앱을 다시
         * 깔아 주소가 바뀔 때마다 부모가 정해 둔 것이 화면에서 사라진다.
         */
        knownChildren: [
          { ...(state.knownChildren ?? []).find((c) => c.name === name), name, token, lastSeen: Date.now() },
          ...rest,
        ].slice(0, MAX_CHILDREN),
        forgottenChildren: byHand ? forgotten.filter((t) => t !== token) : forgotten,
      });
      return true;
    },
    [persistState],
  );

  /**
   * 다른 폰의 아이에게 **보낸 설정을 적어 둔다.**
   *
   * 진짜 값은 아이 폰 안에 있다. 여기 적는 것은 부모가 마지막으로 보낸 것이고,
   * 화면이 무엇을 골라 두었는지 보여 주는 데 쓴다. 안 적어 두면 부모가 레벨을
   * 바꿔 보낸 뒤 다시 들어왔을 때 화면이 빈 채로 돌아가, 안 간 줄 알고 또
   * 보내게 된다.
   */
  const rememberChildSettings = useCallback(
    (name: string, patch: Partial<
      Pick<
        KnownChild,
        | 'sentLevel'
        | 'sentKoLevel'
        | 'rates'
        | 'sentSubjects'
        | 'sentNewPerDay'
        | 'sentKoNewPerDay'
        | 'sentDailyNewPerDay'
      >
    >) => {
      const { state } = ref.current;
      persistState({
        ...state,
        knownChildren: (state.knownChildren ?? []).map((c) =>
          c.name === name ? { ...c, ...patch } : c,
        ),
      });
    },
    [persistState],
  );

  /**
   * 아이 하나를 목록에서 뺀다. **되살아나지 않게 빗장도 건다.**
   *
   * 자리가 넷뿐이라 뺄 자리가 없으면 새 아이를 못 넣는다. 그런데 여태 이
   * 함수가 없었다 — 화면에는 "한 명을 지우면 새로 연결할 수 있습니다" 라고
   * 적혀 있는데 지울 자리가 어디에도 없었다. 있지도 않은 길을 알려 주는 것이
   * 아무 말 안 하는 것보다 나쁘다.
   *
   * 아이 폰에도 알려야 완전히 끊긴다(sendUnlinkToChild). 그건 부르는 화면이
   * 한다 — 여기는 네트워크를 안 쓴다.
   */
  const forgetChild = useCallback(
    (token: string) => {
      const { state } = ref.current;
      const forgotten = state.forgottenChildren ?? [];
      persistState({
        ...state,
        knownChildren: (state.knownChildren ?? []).filter((c) => c.token !== token),
        // 같은 주소를 두 번 적지 않는다. 목록이 길어질 이유가 없다.
        forgottenChildren: forgotten.includes(token) ? forgotten : [...forgotten, token],
      });
    },
    [persistState],
  );

  /**
   * 부모 폰 하나를 목록에 넣는다. **덮어쓰지 않는다.**
   *
   * 예전에는 여기서 통째로 바꿔치웠다. 그래서 아빠가 아이 QR 을 찍는 순간
   * 엄마 폰이 조용히 밀려났다. 자리가 꽉 찼으면 안 넣고 그대로 둔다 —
   * 규칙은 features/parentLinks.ts 가 지킨다.
   */
  const linkParent = useCallback(
    (link: ParentLink) =>
      persistState({
        ...ref.current.state,
        parentLinks: addParentLink(ref.current.state.parentLinks, link),
      }),
    [persistState],
  );

  /** 주소를 주면 그 폰만, 안 주면 전부 끊는다. */
  const unlinkParent = useCallback(
    (token?: string) =>
      persistState({
        ...ref.current.state,
        parentLinks:
          token == null ? [] : removeParentLink(ref.current.state.parentLinks, token),
      }),
    [persistState],
  );

  /** 주 부모를 바꾼다. 동기 부여 요청권 알림이 이 폰으로 간다. */
  const setPrimaryParent = useCallback(
    (token: string) =>
      persistState({
        ...ref.current.state,
        parentLinks: setPrimary(ref.current.state.parentLinks, token),
      }),
    [persistState],
  );

  /**
   * 다른 폰의 아이가 올린 요청권 신청을 부모 폰에 쌓는다.
   *
   * `profileId` 에 `remote:이름` 을 넣는다. 이 폰의 아이와 섞이지 않게 하려는
   * 것이다 — 화면들이 `profileId` 로 걸러 보고 있어서, 빈 값을 넣으면 엉뚱한
   * 아이 목록에 끼어든다.
   */
  const addChildReward = useCallback(
    (ask: RewardAskPayload) => {
      const { state } = ref.current;
      // 알림이 두 번 들어오는 일이 있다(받았을 때 한 번, 눌렀을 때 한 번).
      if (ask.askId && state.rewards.some((r) => r.askId === ask.askId)) return;
      const reward: RewardRequest = {
        id: `rq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        profileId: `remote:${ask.childName}`,
        childName: ask.childName,
        ...(ask.askId ? { askId: ask.askId } : {}),
        ...(ask.childToken ? { childToken: ask.childToken } : {}),
        kind: ask.askKind ?? 'dailyDone',
        amount: ask.amount,
        baseAmount: ask.amount,
        bonus: 0,
        bonusReason: '',
        earnedFrom: null,
        month: ask.month ?? null,
        date: ask.date ?? null,
        reason: ask.reason,
        note: ask.note ?? '',
        effortSuggestion: ask.effortSuggestion ?? 0,
        status: 'pending',
        createdAt: Date.now(),
        decidedAt: null,
        parentNote: '',
        origin: 'child',
      };
      persistState({ ...state, rewards: [reward, ...state.rewards] });
    },
    [persistState],
  );

  /**
   * 아이 폰이 부모의 판단을 제 신청에 반영한다.
   *
   * 부모가 공로금을 얹었으면 금액이 늘어 와 있다. 그것을 그대로 적어야
   * 아이 저금통과 부모가 준 액수가 같아진다.
   */
  const applyRewardDecision = useCallback(
    (d: RewardDecisionPayload) => {
      const { state } = ref.current;
      if (!state.rewards.some((r) => r.id === d.askId)) return;
      persistState({
        ...state,
        rewards: state.rewards.map((r) =>
          r.id === d.askId
            ? {
                ...r,
                status: d.approved ? ('approved' as const) : ('rejected' as const),
                amount: d.approved ? d.amount : r.amount,
                parentNote: d.parentNote,
                decidedAt: Date.now(),
              }
            : r,
        ),
      });
    },
    [persistState],
  );

  const addReceivedReport = useCallback(
    (r: Omit<ReceivedReport, 'id' | 'receivedAt'>) => {
      const { state } = ref.current;
      // 같은 아이가 같은 날 여러 번 보내면 마지막 것만 남긴다.
      const rest = state.receivedReports.filter(
        (x) => !(x.childName === r.childName && x.date === r.date),
      );
      persistState({
        ...state,
        receivedReports: [
          {
            ...r,
            id: `rr_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
            receivedAt: Date.now(),
          },
          ...rest,
        ].slice(0, 60),
      });
    },
    [persistState],
  );

  /**
   * 부모 기기로 리포트를 전송한다.
   *
   * 학습이 끝날 때 자동으로 불리고, 부모 모드에서 손으로도 부를 수 있다.
   * 실패해도 아이 화면을 막지 않는다 — 결과만 돌려준다.
   */
  const pushReportNow = useCallback(async (profileId?: string): Promise<SendResult> => {
    const { state, data } = ref.current;
    const links = state.parentLinks;
    if (links.length === 0) return { ok: false, error: '연결된 부모님 기기가 없습니다.' };

    const target = profileId ?? state.activeProfileId;
    const p = state.profiles.find((x) => x.id === target);
    if (!p) return { ok: false, error: '아이 프로필을 찾을 수 없습니다.' };

    const pdata = p.id === state.activeProfileId ? data : await loadProfileData(p.id);
    const today = todayKey();
    const report = buildDailyReport(p, pdata, ALL_ENTRIES, today);

    const payload = toPayload(
      report,
      buildWeeklySummary(pdata, today),
      state.myPushToken,
      pdata.days[today],
    );

    /*
     * 연결된 폰 전부에 보내고, 하나라도 성공하면 성공으로 본다. 셋 중 하나가
     * 꺼져 있다고 "보내지 못했습니다"가 뜨면 아이는 자기가 뭘 잘못한 줄 안다.
     */
    const results = await Promise.all(links.map((l) => sendReportToParent(l.token, payload)));
    const sent = links.filter((_, i) => results[i].ok).map((l) => l.token);

    if (sent.length > 0) {
      persistState({
        ...ref.current.state,
        parentLinks: ref.current.state.parentLinks.map((l) =>
          sent.includes(l.token) ? { ...l, lastSentDate: today } : l,
        ),
      });
      return { ok: true };
    }
    return results[0] ?? { ok: false, error: '보내지 못했습니다.' };
  }, [persistState]);

  const value: Ctx = {
    ready: store.ready,
    state: store.state,
    profile,
    data: store.data,
    addProfile,
    selectProfile,
    updateProfile,
    updateSettings,
    updateParentStudy,
    deleteProfile,
    recordAnswer,
    finishSession,
    levelUp,
    koLevelUp,
    recordExam,
    requestReward,
    grantReward,
    decideReward,
    updateParent,
    readAllProfileData,
    replaceAll,
    setRole,
    setMyPushToken,
    setReceivesReports,
    markDataSeen,
    rememberChild,
    rememberChildSettings,
    linkParent,
    unlinkParent,
    setPrimaryParent,
    addReceivedReport,
    addChildReward,
    applyRewardDecision,
    pushReportNow,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * 오늘 이 아이가 몇 단어를 하기로 했는지.
 *
 * 설정값(새 단어 + 복습)을 그대로 쓰면 복습이 없는 첫날에 목표를 못 채운다.
 * 실제로 뽑히는 단어 수를 그날의 목표로 삼는다.
 */
function profileGoal(state: AppState, data: ProfileData): number {
  const p = state.profiles.find((x) => x.id === state.activeProfileId);
  if (!p) return DEFAULT_NEW_PER_DAY + DEFAULT_REVIEW_PER_DAY;
  // 부모는 갈래를 골라 공부하므로 세는 법이 다르다.
  if (p.kind === 'parent') return parentPlannedCount({ profile: p, cards: data.cards });
  return plannedWordCount({
    entries: entriesOf(p.level),
    cards: data.cards,
    level: p.level,
    newPerDay: p.settings.newPerDay,
    reviewPerDay: p.settings.reviewPerDay,
  });
}

export function useApp(): Ctx {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
