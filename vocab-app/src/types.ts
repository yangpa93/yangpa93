/**
 * 앱 전체에서 쓰는 도메인 타입.
 *
 * 저장소(AsyncStorage)에 그대로 직렬화되므로 필드를 지우거나 이름을 바꿀 때는
 * src/store/migrations.ts 에 마이그레이션을 추가해야 한다.
 */

/** 학년 레벨. 순서가 곧 레벨업 순서다. */
export type LevelId = 'm1' | 'm2' | 'm3' | 'h1' | 'h2' | 'h3';

export const LEVEL_ORDER: LevelId[] = ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'];

export const LEVEL_LABEL: Record<LevelId, string> = {
  m1: '중학교 1학년',
  m2: '중학교 2학년',
  m3: '중학교 3학년',
  h1: '고등학교 1학년',
  h2: '고등학교 2학년',
  h3: '고등학교 3학년',
};

export const LEVEL_SHORT: Record<LevelId, string> = {
  m1: '중1',
  m2: '중2',
  m3: '중3',
  h1: '고1',
  h2: '고2',
  h3: '고3',
};

/** 단어인지 숙어(구동사·관용구)인지. 숙어는 스펠링 게임에서 제외한다. */
export type EntryKind = 'word' | 'idiom';

/** 어휘 선정 근거. 데이터를 늘릴 때 출처를 추적하려고 남긴다. */
export type EntrySource =
  | 'curriculum' // 교육부 기본 어휘 목록
  | 'textbook' // 중·고 검정 교과서 공통 출현
  | 'csat'; // 수능·모평 기출 빈출

export interface Example {
  /** 영어 예문 */
  en: string;
  /** 예문 해석 */
  ko: string;
}

/**
 * 한 단어의 뜻 하나.
 *
 * 다의어는 뜻마다 Sense를 따로 두고 예문도 그 뜻으로만 채운다.
 * 같은 단어를 여러 날에 걸쳐 만나도 매번 다른 뜻·다른 문장이 나오게 하려는 것.
 */
export interface Sense {
  /** 한국어 뜻 */
  meaning: string;
  /** 이 뜻으로 바꿔 쓸 수 있는 영어 표현 */
  synonyms: string[];
  /** 이 뜻으로 쓰인 예문들 (3~4개) */
  examples: Example[];
}

export interface VocabEntry {
  /** `m1-001` 형태. 레벨이 바뀌어도 id는 바꾸지 않는다. */
  id: string;
  level: LevelId;
  kind: EntryKind;
  /** 표제어. 숙어는 소문자 구(句)로 적는다. */
  word: string;
  /** 품사. 숙어는 'phr.' */
  pos: string;
  /** 뜻 목록. 최소 1개. 자주 쓰이는 뜻부터 앞에 둔다. */
  senses: Sense[];
  source: EntrySource;
}

/* ------------------------------------------------------------------ */
/* 학습 기록                                                            */
/* ------------------------------------------------------------------ */

/** 한 단어에 대한 학습 상태 (SM-2 변형). */
export interface CardState {
  entryId: string;
  /** 난이도 계수. 낮을수록 어려운 단어. */
  ease: number;
  /** 다음 복습까지의 간격(일). 0이면 아직 오늘 안에 다시 봐야 한다. */
  intervalDays: number;
  /** 연속 정답 횟수. 틀리면 0으로 돌아간다. */
  streak: number;
  /** 누적 정답 / 오답 */
  correct: number;
  wrong: number;
  /** 연속 오답이 누적된 '골칫덩이' 표시 */
  lapses: number;
  /** 다음 복습 예정일 (yyyy-mm-dd) */
  due: string;
  /** 마지막으로 본 시각 (epoch ms) */
  lastSeen: number;
  /** 처음 본 시각 (epoch ms). 아직 안 봤으면 카드 자체가 없다. */
  firstSeen: number;
}

/** 세션 한 문제의 채점 결과. */
export interface AnswerLog {
  entryId: string;
  game: GameId;
  correct: boolean;
  /** 응답 시간(ms) */
  ms: number;
  at: number;
}

/**
 * 문제 유형.
 *
 * 아래로 갈수록 어렵다. 4지선다(재인)는 보기 중에 답이 있어서 쉽고,
 * 직접 타이핑(인출)은 스스로 떠올려야 해서 어렵다. 한 세션에서
 * 같은 단어를 재인 → 문맥 → 인출 순으로 올려 가며 세 번 만난다.
 */
export type GameId =
  // 1단계 · 재인
  | 'meaning' // 영어 → 뜻 4지선다
  | 'word' // 뜻 → 영어 4지선다
  | 'listening' // 듣고 고르기
  // 2단계 · 문맥
  | 'context' // 예문 속 표제어의 뜻 고르기
  | 'polysemy' // 다의어: 이 문장에서 쓰인 뜻 고르기
  | 'cloze' // 예문 빈칸 채우기
  | 'synonym' // 문맥에 맞는 동의어 고르기
  // 3단계 · 인출
  | 'spelling' // 첫 글자 힌트를 보고 철자 쓰기
  | 'recall'; // 힌트 없이 뜻만 보고 영어로 쓰기

export const GAME_LABEL: Record<GameId, string> = {
  meaning: '뜻 맞히기',
  word: '단어 맞히기',
  listening: '듣고 맞히기',
  context: '문맥 속 뜻',
  polysemy: '여러 뜻 구별',
  cloze: '빈칸 채우기',
  synonym: '같은 뜻 찾기',
  spelling: '철자 쓰기',
  recall: '직접 쓰기',
};

/** 한 세션에서 단어를 만나는 단계. 라운드가 올라갈수록 어려워진다. */
export type Stage = 'learn' | 'apply' | 'recall';

export const STAGE_LABEL: Record<Stage, string> = {
  learn: '익히기',
  apply: '활용하기',
  recall: '떠올리기',
};

/** 하루치 학습 기록. 날짜별로 하나. */
export interface DailyRecord {
  /** yyyy-mm-dd (기기 로컬 기준) */
  date: string;
  /** 목표 문항 수 */
  goal: number;
  /** 실제로 학습한 단어 수 (중복 제외) */
  studied: number;
  correct: number;
  wrong: number;
  /** 학습에 쓴 시간(초) */
  seconds: number;
  /** 목표를 채웠는지 */
  completed: boolean;
  /** 그날 틀린 단어 id (중복 포함 — 두 번 틀리면 두 번 들어간다) */
  wrongEntryIds: string[];
}

/* ------------------------------------------------------------------ */
/* 보상                                                                */
/* ------------------------------------------------------------------ */

export type RewardStatus = 'pending' | 'approved' | 'rejected' | 'fulfilled';

export interface RewardRequest {
  id: string;
  profileId: string;
  /** 어떤 레벨을 끝내서 생긴 요청인지 */
  earnedFrom: LevelId;
  /** 아이가 적은 갖고 싶은 것 */
  wish: string;
  note: string;
  status: RewardStatus;
  createdAt: number;
  decidedAt: number | null;
  /** 부모가 남긴 한마디 */
  parentNote: string;
}

/* ------------------------------------------------------------------ */
/* 프로필                                                              */
/* ------------------------------------------------------------------ */

export interface ProfileSettings {
  /** 하루 목표 단어 수 (10~20) */
  dailyGoal: number;
  /**
   * 한 단어를 한 세션에서 몇 번 만날지 (2~4).
   *
   * 3이면 재인 → 문맥 → 인출 세 단계를 모두 거친다. 20단어 × 3라운드 =
   * 60문제로 대략 10분 분량이 된다.
   */
  rounds: number;
  /** 복습 비중(%). 세션에서 복습 단어가 차지하는 비율 상한. */
  reviewRatio: number;
  /** 소리 읽어주기 */
  ttsEnabled: boolean;
  /** 진동 피드백 */
  hapticsEnabled: boolean;
}

export interface Profile {
  id: string;
  name: string;
  /** 이모지 아바타 */
  avatar: string;
  level: LevelId;
  settings: ProfileSettings;
  createdAt: number;
  /** 현재 연속 학습 일수 */
  streak: number;
  /** 최고 연속 학습 일수 */
  bestStreak: number;
  /** 마지막으로 목표를 채운 날 (yyyy-mm-dd) */
  lastCompletedDate: string | null;
  /** 레벨업으로 아직 보상을 요청하지 않은 레벨들 */
  pendingLevelUps: LevelId[];
  /** 이미 마스터한 레벨 */
  clearedLevels: LevelId[];
}

/** 프로필 하나에 딸린 학습 데이터. 프로필별로 따로 저장된다. */
export interface ProfileData {
  cards: Record<string, CardState>;
  days: Record<string, DailyRecord>;
  /** 최근 답안 로그. 오래된 건 잘라낸다. */
  answers: AnswerLog[];
}

/**
 * 이 기기의 역할.
 *
 *  child  — 아이가 공부하는 기기. 학습이 끝나면 부모 기기로 리포트를 쏜다.
 *  parent — 부모님 전용 기기. 학습 기능을 쓰지 않고 리포트만 받는다.
 *
 * 처음에는 child다. 부모님 폰에 깔았을 때만 parent로 바꾼다.
 */
export type DeviceRole = 'child' | 'parent';

/** 아이 기기가 들고 있는 '부모님 폰' 정보. */
export interface ParentLink {
  /** 부모 기기의 Expo 푸시 토큰 */
  token: string;
  /** 부모님이 정한 이름 (예: 엄마 폰) */
  label: string;
  linkedAt: number;
  /** 마지막으로 리포트를 보낸 날 (yyyy-mm-dd) */
  lastSentDate: string | null;
}

/** 부모 기기가 아이 기기에서 받아 쌓아 둔 리포트. */
export interface ReceivedReport {
  id: string;
  /** 보낸 아이 이름 */
  childName: string;
  /** 보낸 기기가 붙인 날짜 (yyyy-mm-dd) */
  date: string;
  /** 알림에 뜬 한 줄 요약 */
  headline: string;
  /** 자세한 내용 (틀린 단어 등) */
  detail: string;
  completed: boolean;
  receivedAt: number;
}

/** 부모 모드 설정. 기기 전체에 하나. */
export interface ParentSettings {
  /** 4자리 PIN. null이면 아직 설정 안 함. */
  pin: string | null;
  /** 매일 리포트 알림 시각 */
  notifyHour: number;
  notifyMinute: number;
  notifyEnabled: boolean;
  /** 아이가 목표를 못 채웠을 때만 알릴지 */
  notifyOnlyWhenMissed: boolean;
  /** 학습이 끝나면 부모님 폰으로 리포트를 보낼지 (아이 기기에서만 의미 있음) */
  pushToParent: boolean;
}

/** 저장소 루트. */
export interface AppState {
  version: number;
  profiles: Profile[];
  activeProfileId: string | null;
  parent: ParentSettings;
  rewards: RewardRequest[];

  /** 이 기기의 역할 */
  role: DeviceRole;
  /** child일 때: 연결된 부모 기기 */
  parentLink: ParentLink | null;
  /** parent일 때: 이 기기가 남에게 보여줄 자기 푸시 토큰 */
  myPushToken: string | null;
  /** parent일 때: 받아 둔 리포트 (최신순) */
  receivedReports: ReceivedReport[];
}
