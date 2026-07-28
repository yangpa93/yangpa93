/**
 * 앱 전체에서 쓰는 도메인 타입.
 *
 * 저장소(AsyncStorage)에 그대로 직렬화되므로 필드를 지우거나 이름을 바꿀 때는
 * src/store/migrations.ts 에 마이그레이션을 추가해야 한다.
 */

/** 학년. */
export type GradeId = 'm1' | 'm2' | 'm3' | 'h1' | 'h2' | 'h3';

export const GRADE_ORDER: GradeId[] = ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'];

export const GRADE_LABEL: Record<GradeId, string> = {
  m1: '중학교 1학년',
  m2: '중학교 2학년',
  m3: '중학교 3학년',
  h1: '고등학교 1학년',
  h2: '고등학교 2학년',
  h3: '고등학교 3학년',
};

export const GRADE_SHORT: Record<GradeId, string> = {
  m1: '중1',
  m2: '중2',
  m3: '중3',
  h1: '고1',
  h2: '고2',
  h3: '고3',
};

/** 한 학년을 몇 단계로 쪼갤지. */
export const STEPS = [1, 2, 3, 4] as const;
export type Step = (typeof STEPS)[number];

/**
 * 레벨. 순서가 곧 레벨업 순서다.
 *
 * 학년 하나를 통째로 한 레벨로 두면, 단어를 늘릴수록 레벨 시험이 감당할 수
 * 없이 길어진다(시험은 그 레벨 단어를 하나도 빠짐없이 맞혀야 통과한다).
 * 그래서 학년을 4단계로 쪼갠다.
 *
 * 교육부 기본 어휘 목록 3,043개에 교과서 빈출 어휘를 더한 3,286개를 24레벨로
 * 나누면 레벨당 137개. 하루 새 단어 10개면 한 레벨에 2주 남짓이고, 24레벨을
 * 다 돌면 대략 1년이 된다. 레벨 시험은 160문항 안팎으로 30분 선을 지킨다.
 */
export type LevelId = `${GradeId}-${Step}`;

export const LEVEL_ORDER: LevelId[] = GRADE_ORDER.flatMap((g) =>
  STEPS.map((s) => `${g}-${s}` as LevelId),
);

export function gradeOf(level: LevelId): GradeId {
  return level.slice(0, 2) as GradeId;
}

export function stepOf(level: LevelId): Step {
  return Number(level.slice(3)) as Step;
}

/** 그 학년의 레벨 3개를 순서대로. */
export function levelsOfGrade(grade: GradeId): LevelId[] {
  return STEPS.map((s) => `${grade}-${s}` as LevelId);
}

/** '중학교 1학년 레벨 1' */
export const LEVEL_LABEL: Record<LevelId, string> = Object.fromEntries(
  LEVEL_ORDER.map((l) => [l, `${GRADE_LABEL[gradeOf(l)]} 레벨 ${stepOf(l)}`]),
) as Record<LevelId, string>;

/** '중1-1' */
export const LEVEL_SHORT: Record<LevelId, string> = Object.fromEntries(
  LEVEL_ORDER.map((l) => [l, `${GRADE_SHORT[gradeOf(l)]}-${stepOf(l)}`]),
) as Record<LevelId, string>;

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
 * **모든 문제가 문장으로 나온다.** 단어와 뜻만 짝지어 외우면 시험에서
 * 문장 안에 들어간 그 단어를 못 알아본다. 그래서 뜻만 보여주고 고르게
 * 하는 유형은 두지 않았다.
 *
 * 중심은 빈칸 채우기다. 문장에서 그 단어만 지우고, 거기에 무엇이
 * 들어가야 하는지 묻는다.
 */
export type GameId =
  | 'cloze' // 문장 빈칸에 알맞은 단어 고르기        (기본)
  | 'clozeType' // 문장 빈칸에 알맞은 단어 직접 쓰기   (가장 어려움)
  | 'listening' // 문장을 듣고 빈칸에 알맞은 단어 고르기
  | 'context' // 문장 속 그 단어가 여기서 무슨 뜻인지
  | 'polysemy' // 다의어: 여러 뜻 중 이 문장에서 쓰인 뜻
  | 'synonym' // 문맥에 맞게 바꿔 쓸 수 있는 표현
  | 'antonym'; // 문장 속 그 단어와 뜻이 반대인 표현

export const GAME_LABEL: Record<GameId, string> = {
  cloze: '빈칸 채우기',
  clozeType: '빈칸에 직접 쓰기',
  listening: '듣고 빈칸 채우기',
  context: '문맥 속 뜻',
  polysemy: '여러 뜻 구별',
  synonym: '바꿔 쓰기',
  antonym: '반대말 찾기',
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
  /** 그날 계획했던 단어 수 (새 단어 + 복습) */
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

/**
 * 이 요구권을 누가 만들었는지.
 *
 *   child  — 아이가 신청했고 부모가 판단을 기다린다
 *   parent — 부모가 먼저 주기로 하고 바로 만들었다 (승인된 상태로 태어난다)
 *
 * 나중에 목록에서 둘을 구별해 보여주려면 기록에 남아 있어야 한다.
 * 아이가 신청한 것과 부모가 먼저 준 것은 성격이 다르다.
 */
export type RewardOrigin = 'child' | 'parent';

/**
 * 요구권 신청.
 *
 * 갖고 싶은 것을 적어 보내는 방식이 아니라 **정해진 금액을 요구할 권리**다.
 * 조건과 금액은 src/features/awards.ts 에 있다.
 */
export interface RewardRequest {
  id: string;
  profileId: string;
  /** 'levelup' | 'perfectMonth' */
  kind: string;
  /** 실제로 요구한 총 금액(원). 기본 금액 + 더 요구한 금액. */
  amount: number;
  /**
   * 조건에 따라 정해진 기본 금액.
   *
   * `amount`와 따로 두는 이유: 아이가 "이번엔 정말 잘했다"며 얹은 금액을
   * 부모가 구분해서 볼 수 있어야 하고, 기본 금액만 주기로 할 수도 있어서다.
   */
  baseAmount: number;
  /** 아이가 더 얹은 금액(원). 안 얹었으면 0. */
  bonus: number;
  /** 왜 더 받을 만한지 아이가 적은 이유 (bonus가 0이면 빈 문자열) */
  bonusReason: string;
  /** levelup이면 어떤 레벨을 끝냈는지 */
  earnedFrom: LevelId | null;
  /** perfectMonth면 어느 달인지 (yyyy-mm) */
  month: string | null;
  /** 왜 받는지 한 줄 */
  reason: string;
  /** 아이가 덧붙인 한마디 (선택) */
  note: string;
  status: RewardStatus;
  createdAt: number;
  decidedAt: number | null;
  /** 부모가 남긴 한마디 */
  parentNote: string;
  /** 아이가 신청한 것인지, 부모가 먼저 준 것인지 */
  origin: RewardOrigin;
}

/* ------------------------------------------------------------------ */
/* 프로필                                                              */
/* ------------------------------------------------------------------ */

export interface ProfileSettings {
  /**
   * 하루에 새로 만날 단어 수 (5~20).
   *
   * 진도를 정하는 것은 이 값이다. 10개면 3,286개를 다 도는 데 대략 1년.
   * 복습은 여기에 얹히므로 실제로 푸는 단어는 이보다 많다.
   */
  newPerDay: number;
  /**
   * 하루에 복습할 단어 수 상한 (0~30).
   *
   * 복습이 밀리면 급한 것(오래 밀린 것·많이 틀린 것)부터 채운다.
   * 새 단어 10 + 복습 10 = 하루 20단어면 3라운드 기준 13분쯤 걸린다.
   */
  reviewPerDay: number;
  /**
   * 한 단어를 한 세션에서 몇 번 만날지 (2~4).
   *
   * 3이면 재인 → 문맥 → 인출 세 단계를 모두 거친다. 20단어 × 3라운드 =
   * 60문제로 대략 10분 분량이 된다.
   */
  rounds: number;
  /**
   * 문제를 풀 때 예문 해석을 미리 보여줄지.
   *
   * 켜면 빈칸 문제에서 한국어 해석이 처음부터 보인다. 문장을 아직 못 읽는
   * 아이가 찍지 않고 판단할 수 있게 하려는 것. 실력이 붙으면 끄면 된다.
   *
   * '문맥 속 뜻'과 '여러 뜻 구별'은 이 설정과 무관하게 답한 뒤에 보여준다.
   * 해석에 정답(한국어 뜻)이 그대로 들어 있어서 미리 보여주면 문제가
   * 성립하지 않기 때문이다.
   */
  showTranslation: boolean;
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
  /** 레벨업으로 아직 요구권을 신청하지 않은 레벨들 */
  pendingLevelUps: LevelId[];
  /** 이미 마스터한 레벨 */
  clearedLevels: LevelId[];
  /** 개근 요구권을 이미 신청한 달들 (yyyy-mm) */
  claimedMonths: string[];
}

/**
 * 레벨 시험 결과.
 *
 * 다음 학년으로 올라가려면 그 레벨의 단어를 **하나도 빠짐없이** 맞혀야
 * 한다. 틀린 문제는 시험이 끝난 뒤 다시 나오고, 전부 맞히면 통과다.
 * `firstTryCorrect`는 처음에 몇 개를 맞혔는지로, 부모 리포트에 남는다.
 */
export interface ExamResult {
  level: LevelId;
  /** 전체 문항 수 (다의어는 뜻마다 한 문항) */
  total: number;
  /** 처음 시도에서 맞힌 개수 */
  firstTryCorrect: number;
  /** 다시 풀기를 몇 번 했는지 */
  retries: number;
  passed: boolean;
  seconds: number;
  at: number;
}

/** 프로필 하나에 딸린 학습 데이터. 프로필별로 따로 저장된다. */
export interface ProfileData {
  cards: Record<string, CardState>;
  days: Record<string, DailyRecord>;
  /** 최근 답안 로그. 오래된 건 잘라낸다. */
  answers: AnswerLog[];
  /** 레벨 시험 기록 (최신순) */
  exams: ExamResult[];
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

/**
 * 요구권 금액표. 부모님 모드에서 정한다.
 *
 * 기본값은 중학 2만 · 고등 3만 · 개근 2만 · 추가 요구 1만이지만, 집집마다
 * 사정이 달라서 화면에서 바꿀 수 있게 해 두었다. 0원으로 두면 그 요구권은
 * 생기지 않는다 — 돈 대신 다른 약속으로 대신하고 싶을 때 쓴다.
 */
export interface AwardRates {
  /** 중학교 레벨 하나를 끝냈을 때 */
  middleLevel: number;
  /** 고등학교 레벨 하나를 끝냈을 때 */
  highLevel: number;
  /** 한 달 개근 */
  perfectMonth: number;
  /**
   * 아이가 "이번엔 정말 잘했어요"라며 더 요구할 수 있는 금액.
   *
   * 0이면 추가 요구 버튼 자체가 안 보인다. 부모는 승인할 때
   * 기본 금액만 줄지 얹어 줄지 고를 수 있다.
   */
  bonus: number;
}

/** 부모 모드 설정. 기기 전체에 하나. */
export interface ParentSettings {
  /** 4자리 PIN. null이면 아직 설정 안 함. */
  pin: string | null;
  /** 요구권 금액표 */
  awards: AwardRates;
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
