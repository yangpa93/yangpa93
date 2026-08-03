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
  | 'csat' // 수능·모평 기출 빈출
  | 'daily'; // 부모님용 일상·업무 문장 (korean/english_365_dataset.json)

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
/* 국어 어휘                                                            */
/* ------------------------------------------------------------------ */

/**
 * 국어 어휘의 갈래.
 *
 * 갈래마다 성격이 달라서 문제 유형도 달라진다. 사자성어는 한자를 묻고,
 * 고전은 현대어 풀이를 묻는다. 개념어·수능 어휘는 문장 속 쓰임을 묻는다.
 */
export type KoCategory =
  | 'idiom' // 사자성어
  | 'concept' // 개념어 (문학·비문학)
  | 'classic' // 고전 문학 어휘
  | 'csat'; // 수능 필수 어휘

export const KO_CATEGORY_LABEL: Record<KoCategory, string> = {
  idiom: '사자성어',
  concept: '개념어',
  classic: '고전',
  csat: '수능 어휘',
};

/** 갈래 순서. 하루치를 뽑을 때와 화면에 늘어놓을 때 이 순서를 쓴다. */
export const KO_CATEGORY_ORDER: KoCategory[] = ['idiom', 'concept', 'classic', 'csat'];

export interface KoExample {
  /** 예문 한 줄, 또는 고전이면 원문 단락 */
  text: string;
  /**
   * 현대어 풀이. 고전 어휘에만 있다.
   *
   * 원문만 보여주면 아이가 읽지 못한다. 그렇다고 풀이를 늘 붙여 두면
   * 원문을 읽으려 하지 않으므로, 영어 예문의 해석과 똑같이 처음에는
   * 숨겨 두고 '풀이 보기'를 눌러야 나온다.
   */
  gloss?: string;
  /**
   * 어디서 가져온 문장인지. 예: '정철, 관동별곡'
   *
   * **비어 있으면 원전에서 가져온 문장이 아니라는 뜻이다.** 지어낸 예문과
   * 원문 인용을 화면에서 구별해 보여주려고 둔다. 고전 어휘는 반드시
   * 채운다 — 출처 없는 옛말 문장은 아이에게 가르칠 수 없다.
   */
  source?: string;
}

/**
 * 국어 어휘 하나.
 *
 * 영어의 `VocabEntry`와 따로 두는 이유: 국어는 다의어를 뜻마다 나누지 않고
 * (엑셀 원본이 뜻 하나로 정리돼 있다), 대신 한자·갈래·출처가 필요하다.
 * 한 타입에 다 밀어 넣으면 어느 쪽에도 안 맞는 빈 칸이 잔뜩 생긴다.
 */
export interface KoEntry {
  /** `ko-0001` 형태. 레벨이 바뀌어도 id는 바꾸지 않는다. */
  id: string;
  level: LevelId;
  category: KoCategory;
  /** 표제어. 사자성어는 음(한글)을 쓴다. */
  word: string;
  /** 한자 또는 외래어 원어. 없으면 빈 문자열. */
  hanja: string;
  /**
   * 이 한자를 표준국어대사전에서 확인했는지.
   *
   * 사자성어 300개를 사전과 대조했더니 20개가 어긋났고 19개는 사전에
   * 표제어조차 없었다. 사전에 없는 것은 실재하는 말이지만 한자를 확인할
   * 길이 없다. **확인 못 한 한자로는 한자 고르기 문제를 내지 않는다** —
   * 틀릴지도 모르는 답을 정답이라고 채점할 수는 없다.
   */
  hanjaVerified: boolean;
  /** 영역·분류. 예: '인문', '문학', '감정/태도' */
  field: string;
  /** 뜻풀이 */
  meaning: string;
  /** 예문. 최소 1개. */
  examples: KoExample[];
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
  | 'antonym' // 문장 속 그 단어와 뜻이 반대인 표현
  | 'scramble' // 뒤섞인 낱말을 순서대로 놓아 문장 만들기
  | 'hanja'; // 사자성어: 뜻을 보고 알맞은 한자 고르기 (국어 전용)

export const GAME_LABEL: Record<GameId, string> = {
  cloze: '빈칸 채우기',
  clozeType: '빈칸에 직접 쓰기',
  listening: '듣고 빈칸 채우기',
  context: '문맥 속 뜻',
  polysemy: '여러 뜻 구별',
  synonym: '바꿔 쓰기',
  antonym: '반대말 찾기',
  scramble: '문장 배열',
  hanja: '한자 고르기',
};

/** 한 세션에서 단어를 만나는 단계. 라운드가 올라갈수록 어려워진다. */
/**
 * 문항의 단계. 뒤로 갈수록 스스로 꺼내야 한다.
 *
 * `build` 는 낱말을 순서대로 놓아 문장을 만드는 단계다. 뜻을 고르는 것과
 * 철자를 쓰는 것 사이에 있다 — 낱말은 다 주어지지만 어디에 놓을지는
 * 스스로 정해야 한다.
 */
export type Stage = 'learn' | 'apply' | 'build' | 'recall';

/** 쉬운 것부터. 이 순서가 곧 난이도다. */
export const STAGE_ORDER: Stage[] = ['learn', 'apply', 'build', 'recall'];

export const STAGE_LABEL: Record<Stage, string> = {
  learn: '익히기',
  apply: '활용하기',
  build: '문장 만들기',
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
  /**
   * 그날 만난 단어 id (중복 없음, 만난 순서).
   *
   * **왜 따로 두나.** 단어장에 '오늘 배운 것' 을 보여 주려면 무엇을 만났는지
   * 알아야 하는데, 지금까지는 개수(studied)만 남기고 무엇이었는지는 버렸다.
   * 카드(cards)에는 마지막으로 본 날짜만 있어서 "오늘 본 것" 을 되짚을 수가
   * 없다. 틀린 것은 이미 남기고 있었으니(wrongEntryIds), 맞힌 것도 남긴다.
   *
   * **없을 수 있다.** 이 칸이 생기기 전에 저장된 날에는 들어 있지 않다.
   * 옛 기록을 통째로 고쳐 쓰는 대신 읽는 길목에서 채운다(dayRecord.ts 의
   * withDefaults) — 되돌리기로 들어오는 남의 백업까지 다 손볼 수는 없다.
   */
  studiedEntryIds?: string[];
}

/* ------------------------------------------------------------------ */
/* 보상                                                                */
/* ------------------------------------------------------------------ */

export type RewardStatus = 'pending' | 'approved' | 'rejected' | 'fulfilled';

/**
 * 이 동기 부여 요청권을 누가 만들었는지.
 *
 *   child  — 아이가 신청했고 부모가 판단을 기다린다
 *   parent — 부모가 먼저 주기로 하고 바로 만들었다 (승인된 상태로 태어난다)
 *
 * 나중에 목록에서 둘을 구별해 보여주려면 기록에 남아 있어야 한다.
 * 아이가 신청한 것과 부모가 먼저 준 것은 성격이 다르다.
 */
export type RewardOrigin = 'child' | 'parent';

/**
 * 동기 부여 요청권 신청.
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

/**
 * 무엇을 공부하는가.
 *
 * `daily`(일상 생활 문장)는 나중에 들어왔다. 부모에게만 있던 갈래인데,
 * **아이도 켤 수 있어야 한다**는 말을 들었다. 맞는 말이다 — 문장 80개는
 * 어른 것이라기보다 그냥 자주 쓰는 말이고, 아이가 배워서 나쁠 것이 없다.
 *
 * 부모 쪽 갈래(`ParentTrack`)와 이름이 다른 것은 뜻이 있다. 부모는 갈래마다
 * 하루 개수와 주제까지 따로 정하지만(`ParentStudy`), 아이는 켜고 끄기만 한다.
 * 한 타입으로 묶으면 아이 화면에 쓰지 않는 칸이 잔뜩 생긴다.
 */
export type Subject = 'en' | 'ko' | 'daily';

/** 좁은 자리에 쓰는 짧은 이름. */
export const SUBJECT_LABEL: Record<Subject, string> = {
  en: '영어',
  ko: '국어',
  daily: '일상 문장',
};

/**
 * 고르는 자리에 쓰는 긴 이름.
 *
 * 부모 쪽 갈래 이름(`PARENT_TRACK_LABEL`)과 짝을 맞춘다. 같은 것을 고르는데
 * 부모 폰에는 '국어 어휘 학습하기', 아이 폰에는 '국어' 라고 적혀 있으면
 * 서로 다른 것을 말하는 줄 안다.
 */
export const SUBJECT_LONG: Record<Subject, string> = {
  en: '영어 단어 학습하기',
  ko: '국어 어휘 학습하기',
  daily: '일상 생활 문장 학습하기',
};

/** 화면에 늘어놓는 순서. 큐에 담기는 순서와 같다. */
export const SUBJECT_ORDER: Subject[] = ['en', 'ko', 'daily'];

/**
 * 갈래 하나를 켜거나 끈다. **마지막 하나는 못 끈다** — 그때는 null.
 *
 * 하나도 안 켜면 낼 문제가 없어져 학습 화면이 빈 채로 뜬다. 아이 눈에는 앱이
 * 고장 난 것으로 보인다. 그래서 끄는 것 자체를 막고, 화면은 null 을 받아
 * **왜 안 되는지 말해 준다.** 조용히 아무 일도 안 일어나면 몇 번 더 눌러 보다
 * 고장이라고 여긴다.
 *
 * 순수 함수로 둔 이유는 이 규칙이 아이 화면과 부모 화면 두 곳에서 쓰이기
 * 때문이다. 두 곳에 따로 적으면 한쪽만 고치는 날이 온다.
 */
export function toggleSubject(subjects: Subject[], one: Subject): Subject[] | null {
  const on = subjects.includes(one);
  if (on && subjects.length <= 1) return null;
  const next = on ? subjects.filter((s) => s !== one) : [...subjects, one];
  // 저장 순서를 늘 같게 둔다. 화면마다 순서가 달라 보이면 다른 값인 줄 안다.
  return SUBJECT_ORDER.filter((s) => next.includes(s));
}

export interface ProfileSettings {
  /**
   * 공부할 과목. 빈 배열이 되지 않게 지킨다 — 하나도 안 고르면 낼 문제가 없다.
   *
   * 부모님 폰에서 정하면 아이 폰으로 자동으로 넘어간다. 아이마다 다르게
   * 둘 수 있다 — 큰딸은 영어만, 작은딸은 둘 다 같은 식으로.
   */
  subjects: Subject[];
  /**
   * 영어와 국어 중 무엇을 먼저 풀지.
   *
   * 한 과목만 켜 두었으면 아무 뜻이 없다. 둘 다 켠 아이에게만 보인다.
   *
   * 순서를 정하게 두는 이유: 머리가 맑을 때 어려운 쪽을 먼저 하고 싶은
   * 아이가 있고, 쉬운 쪽으로 몸을 풀고 싶은 아이가 있다. 어느 쪽이 어려운지는
   * 아이마다 다르므로 어른이 정해 줄 일이 아니다.
   */
  firstSubject: Subject;
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
  /**
   * 영어를 읽어 줄 목소리의 identifier. 없으면 앱이 알아서 고른다.
   *
   * 기기마다 깔린 음성이 달라서 자동으로 고른 것이 늘 제일 자연스럽지는
   * 않다. 무엇보다 **들어 봐야 아는 일**이라, ⚙️ 설정에서 하나씩 들어 보고
   * 고를 수 있게 두고 그 고른 값을 여기 적어 둔다.
   */
  voiceId?: string | null;
  /**
   * 영어를 읽는 속도. 없으면 보통(0.9).
   *
   * 폰 설정에도 '말하는 속도' 가 있지만 우리 앱에는 안 먹는다 — 앱이 읽을
   * 때마다 속도를 직접 지정해서 시스템 값이 덮이기 때문이다. 그래서 고르는
   * 자리를 앱 안에 둔다.
   */
  speechRate?: number;
  /** 진동 피드백 */
  hapticsEnabled: boolean;
}

/**
 * 프로필의 갈래. 이 앱을 쓰는 사람이 아이인지 부모인지.
 *
 * `DeviceRole` 과 다르다. 역할은 **기기** 하나에 하나뿐이고 학습 화면을
 * 감출지를 정했다. 그런데 한 기기에 부모와 아이가 함께 있을 수 있고
 * (집에 태블릿 하나), 부모도 자기 공부를 한다. 그래서 사람 단위로 나눈다.
 *
 * 화면이 통째로 갈린다 — 아이는 오늘의 학습·동기 부여 요청권·달력을, 부모는 자기 공부와
 * 아이들 보고서를 본다.
 */
export type ProfileKind = 'child' | 'parent';

/** 부모가 고를 수 있는 학습 갈래. 여러 개를 함께 켤 수 있다. */
export type ParentTrack =
  | 'daily' // 일상·업무 영어 문장 (주제를 고른다)
  | 'enWord' // 아이들과 똑같은 영어 단어 (레벨을 고른다)
  | 'ko'; // 아이들과 똑같은 국어 어휘 (레벨을 고른다)

export const PARENT_TRACK_LABEL: Record<ParentTrack, string> = {
  daily: '일상 생활 문장 학습하기',
  enWord: '아이들과 같은 영어 단어 학습하기',
  ko: '국어 어휘 학습하기',
};

/**
 * 좁은 자리에 쓰는 짧은 이름.
 *
 * 홈의 '오늘의 공부' 처럼 이름과 레벨을 나란히 놓는 자리에서는 위의 긴 이름이
 * 두 줄로 접힌다. 접히면 옆에 붙은 레벨이 어느 줄에 걸린 것인지 흐려져서,
 * 무엇이 켜져 있는지 한눈에 안 들어온다.
 */
export const PARENT_TRACK_SHORT: Record<ParentTrack, string> = {
  daily: '일상 문장',
  enWord: '영어 단어',
  ko: '국어',
};

/**
 * 부모가 무엇을 어떻게 공부할지.
 *
 * 아이 설정(`ProfileSettings`)과 따로 두는 이유: 아이는 학년이 정해져 있어
 * 레벨 하나만 있으면 되지만, 부모는 세 갈래를 골라 켜고 각각 어디를 볼지
 * 따로 정한다. 한 벌에 밀어 넣으면 아이 화면에도 쓰지 않는 칸이 잔뜩 생긴다.
 *
 * 영어 레벨과 국어 레벨은 `Profile.level` · `Profile.koLevel` 을 그대로 쓴다.
 * 아이와 같은 자료를 같은 방식으로 도는 것이라 따로 둘 이유가 없다.
 */
export interface ParentStudy {
  /** 켜 둔 갈래. 비면 공부할 것이 없다. */
  tracks: ParentTrack[];
  /** 일상 문장의 주제 id. src/data/daily 의 주제 중 하나. */
  dailyTheme: string;
  /**
   * **갈래마다** 하루에 새로 만날 개수. 갈래별로 5 또는 10.
   *
   * 예전에는 `newPerDay` 하나로 전체 합계를 정하고 켠 갈래끼리 나눠 갖게
   * 했다. 그런데 화면에 '하루에 10개'라고만 적히니 그것이 일상 문장 10개인지
   * 셋을 합쳐 10개인지 알 수가 없었다. 실제로 그 질문을 받았고, 답은 후자였다
   * (셋을 켜면 4/3/3으로 갈렸다). 숫자 하나가 자기 뜻을 스스로 말하지 못하면
   * 그 숫자는 없는 편이 낫다.
   *
   * 그래서 갈래마다 따로 정한다. '일상 문장 5개'는 일상 문장 5개다. 고를 것이
   * 갈래당 둘뿐이라 늘어난 부담도 크지 않고, 무엇보다 자기가 고른 숫자가 그대로
   * 나온다.
   *
   * 안 켠 갈래의 값은 무시한다 — 껐다 켜도 예전에 고른 값이 그대로 살아 있게
   * 하려고 지우지 않는다.
   */
  perTrack: Record<ParentTrack, number>;
}

/** 부모가 갈래마다 고를 수 있는 하루 분량. */
export const PARENT_NEW_PER_DAY = [5, 10] as const;

/** 아무것도 안 고른 갈래의 기본값. 둘 중 작은 쪽에서 시작한다. */
export const DEFAULT_PARENT_PER_DAY = 5;

export interface Profile {
  id: string;
  name: string;
  /** 아이인지 부모인지 */
  kind: ProfileKind;
  /** 이모지 아바타 */
  avatar: string;
  /** 영어 레벨 */
  level: LevelId;
  /**
   * 국어 레벨. 영어와 따로 올라간다.
   *
   * 레벨 이름(m1-1 … h3-4)은 영어와 같은 24개를 쓰지만 진도는 별개다.
   * 국어는 1,406단어를 하루 6개씩 약 8개월, 영어는 3,285단어를 하루
   * 10개씩 약 11개월이라 국어가 먼저 끝난다. 보상도 따로 받는다.
   */
  koLevel: LevelId;
  settings: ProfileSettings;
  createdAt: number;
  /** 현재 연속 학습 일수 */
  streak: number;
  /** 최고 연속 학습 일수 */
  bestStreak: number;
  /** 마지막으로 목표를 채운 날 (yyyy-mm-dd) */
  lastCompletedDate: string | null;
  /** 레벨업으로 아직 동기 부여 요청권을 신청하지 않은 레벨들 (영어) */
  pendingLevelUps: LevelId[];
  /** 레벨업으로 아직 동기 부여 요청권을 신청하지 않은 레벨들 (국어) */
  koPendingLevelUps: LevelId[];
  /** 이미 마스터한 레벨 (영어) */
  clearedLevels: LevelId[];
  /** 이미 마스터한 레벨 (국어) */
  koClearedLevels: LevelId[];
  /** 개근 동기 부여 요청권을 이미 신청한 달들 (yyyy-mm) */
  claimedMonths: string[];
  /**
   * 이 아이만의 동기 부여 요청권 금액표. null 이면 기기 기본값(ParentSettings.awards).
   *
   * 예전에는 금액이 기기에 하나뿐이었다. 그런데 중학생과 고등학생을 같은
   * 금액으로 두면 한쪽은 늘 손해라고 느낀다. 아이마다 사정이 달라서
   * 아이별 보고서 화면에서 따로 정할 수 있게 했다. 안 정했으면 기기 기본값을
   * 그대로 쓴다 — 아이가 하나뿐인 집에서 같은 값을 두 번 정하게 하지 않는다.
   */
  awards: AwardRates | null;
  /**
   * 부모님 폰과 연결하지 않기로 정했는지 (아이 프로필).
   *
   * 부모님이 이 앱을 안 쓰는 집도 있다. 그런 아이에게 '부모와 연결하기'를
   * 계속 띄우면 못 한 일이 남아 있는 것처럼 보인다. 다만 아이가 스스로 끄면
   * 감시를 피하는 길이 되므로, **부모가 PIN 을 눌러 승인**해야 꺼진다.
   */
  linkWaived: boolean;
  /** 부모 프로필의 학습 설정. 아이 프로필에서는 쓰지 않는다. */
  parentStudy: ParentStudy;
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
/** 부모가 알림을 보낼 수 있는 아이 기기 하나. */
export interface KnownChild {
  /** 아이 이름. 같은 이름이 둘이면 나중 것이 앞의 것을 덮는다. */
  name: string;
  /** 그 기기의 푸시 주소 */
  token: string;
  /** 마지막으로 소식을 들은 때 (epoch ms) */
  lastSeen: number;
}

export interface ParentLink {
  /** 부모 기기의 Expo 푸시 토큰 */
  token: string;
  /** 부모님이 정한 이름 (예: 엄마 폰) */
  label: string;
  linkedAt: number;
  /** 마지막으로 리포트를 보낸 날 (yyyy-mm-dd) */
  lastSentDate: string | null;
  /**
   * 주 부모인가. 연결된 폰이 있으면 **정확히 하나**가 true 다.
   *
   * 리포트는 연결된 폰 전부가 받지만 **정하는 일**은 한 사람이 해야 한다.
   * 동기 부여 요청권을 엄마와 아빠가 각각 승인하면 같은 것을 두 번 주게 된다.
   * 그래서 요청권 알림은 이 폰에만 간다.
   *
   * 이 규칙은 features/parentLinks.ts 가 지킨다. 화면에서 지키게 두면
   * 언젠가 0개나 2개가 된다.
   */
  isPrimary: boolean;
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
 * 동기 부여 요청권 금액표. 부모님 모드에서 정한다.
 *
 * 기본값은 중학 2만 · 고등 3만 · 개근 2만 · 추가 요구 1만이지만, 집집마다
 * 사정이 달라서 화면에서 바꿀 수 있게 해 두었다. 0원으로 두면 그 동기 부여 요청권은
 * 생기지 않는다 — 돈 대신 다른 약속으로 대신하고 싶을 때 쓴다.
 */
export interface AwardRates {
  /** 국어 레벨 하나를 끝냈을 때 */
  koreanLevel: number;
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
  /** 동기 부여 요청권 금액표 */
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
  /**
   * child일 때: 연결된 부모 기기들. 공부가 끝나면 **전부에게** 리포트를 보낸다.
   *
   * 예전에는 `parentLink` 하나였다. 엄마가 찍고 나서 아빠가 찍으면 엄마 폰이
   * 조용히 밀려났고, 엄마 폰에는 아이가 그대로 보이는데 리포트만 안 왔다.
   * 끊긴 줄도 모르는 연결이 제일 위험하다.
   */
  parentLinks: ParentLink[];
  /** 이 기기가 남에게 보여줄 자기 푸시 토큰. 아이 기기도 갖는다(부모가 알림을 보낼 수 있도록). */
  myPushToken: string | null;
  /**
   * 이 기기가 아이들 리포트를 받는가.
   *
   * 주소를 가졌는지로 판단하면 안 된다. 아이 기기도 자기 주소를 갖는다 —
   * 부모가 "공부하자"고 보낼 수 있어야 하기 때문이다. 받는 것은 사람이
   * 켠 것이므로 따로 적어 둔다.
   */
  receivesReports: boolean;
  /** 받아 둔 리포트 (최신순) */
  receivedReports: ReceivedReport[];
  /**
   * 알림을 보낼 수 있는 아이 기기들.
   *
   * 아이 기기가 부모와 연결할 때 자기 주소를 한 번 보내 온다. 그것을 여기
   * 모아 두어야 부모가 "공부하자"고 되보낼 수 있다. 리포트가 오기를
   * 기다릴 수는 없다 — 리포트가 안 왔을 때 부르고 싶은 것이기 때문이다.
   */
  knownChildren: KnownChild[];
  /**
   * 이 폰이 마지막으로 본 어휘 판.
   *
   * **왜 저장하나.** 낱말은 무선 업데이트로 조용히 들어온다 — 화면이 하나도
   * 안 바뀌므로, 말해 주지 않으면 늘어난 줄을 아무도 모른다. 마지막에 본
   * 판을 적어 두어야 "그 뒤로 몇 개가 왔는지" 를 셀 수 있다.
   *
   * **없을 수 있다.** 이 칸이 생기기 전에 저장된 상태에는 없다. 그때는
   * 0개로 본다 — 이미 다 갖고 있는 사람에게 "3,690개가 추가됐다" 고 하면
   * 거짓말이다. migrate 가 지금 판을 적어 넣어 그 자리를 메운다.
   */
  seenDataVersion?: string | null;
}
