/**
 * 어휘 판(버전). **앱 판과 따로 센다.**
 *
 * ── 왜 따로 세나 ────────────────────────────────────────────
 *
 * 앱을 고치는 일과 낱말을 더하는 일은 성격이 다르다.
 *
 *   앱 판(0.21.0)    화면이 바뀌고 버그가 고쳐진다. 무엇이 달라졌는지
 *                    눌러 보면 안다.
 *   어휘 판(2026.08.03)  낱말이 늘어난다. **화면은 그대로다.** 늘어난 것을
 *                    말해 주지 않으면 아무도 모른다.
 *
 * 한 숫자로 합치면 둘 다 흐려진다. "0.22.0 에서 뭐가 바뀌었지" 에 화면 얘기와
 * 낱말 얘기가 섞이고, 낱말만 더한 판에도 앱 판이 올라가 "앱이 바뀌었나" 하게
 * 된다. 그래서 두 줄로 센다.
 *
 * ── 어휘 판은 왜 날짜인가 ───────────────────────────────────
 *
 * 낱말은 앞으로 자주, 조금씩 는다. 0.1.0 · 0.1.1 처럼 매기면 금방 의미가
 * 사라진다("0.3.7 이 뭐였더라"). **언제 받은 것인가**가 유일하게 궁금한
 * 것이라 날짜를 그대로 쓴다. 하루에 두 번 올리면 뒤에 -2 를 붙인다.
 *
 * ── 어떻게 사용자에게 가나 ──────────────────────────────────
 *
 * 낱말은 자바스크립트 묶음 안에 들어 있고, 그건 **무선 업데이트(EAS Update)로
 * 나간다.** APK 를 다시 깔 필요가 없다 — 앱을 껐다 켜면 새 묶음을 받고,
 * 다음에 켤 때 새 낱말이 들어와 있다. 그때 이 파일이 "몇 개가 늘었는지" 를
 * 말해 준다.
 *
 * 다만 **native 를 건드리는 변경은 무선으로 못 간다** (권한, 패키지 이름,
 * expo SDK). 그건 app.json 의 runtimeVersion 으로 갈린다.
 */

/** 지금 이 묶음에 들어 있는 어휘 판. 맨 앞 항목의 version 과 같아야 한다. */
export const DATA_VERSION = '2026.08.06';

export interface DataRelease {
  /** `yyyy.mm.dd` — 하루에 두 번이면 `yyyy.mm.dd-2` */
  version: string;
  date: string;
  /**
   * 이 판에서 **더해진** 개수. 줄었으면 음수다.
   *
   * 줄어드는 일도 있다 — 잘 안 쓰는 사자성어를 빼거나, 확인 못 한 것을
   * 덜어 낸다. 그때 0 으로 적으면 표가 "는 것만 말하고 주는 것은 말 안 하는"
   * 물건이 되어 믿을 수가 없다. 화면에는 는 것만 적히지만(addedLine),
   * 아래 total 과 맞는지는 시험이 대조한다.
   */
  en: number;
  ko: number;
  daily: number;
  /** 무엇이 늘었는지 한 줄. 화면에 그대로 나간다. */
  note: string;
  /**
   * 이 판 시점의 **전체** 개수.
   *
   * 더해진 개수만 적어 두면 어딘가에서 하나 어긋났을 때 아무도 모른다.
   * 전체를 함께 적어 두고 **테스트가 실제 파일과 대조한다** — 낱말을 더하고
   * 판 올리는 것을 잊으면 거기서 걸린다.
   */
  totalEn: number;
  totalKo: number;
  totalDaily: number;
}

/** 새 판이 맨 앞. 화면도 이 순서 그대로 보여준다. */
export const DATA_RELEASES: DataRelease[] = [
  {
    version: '2026.08.06',
    date: '2026-08-06',
    en: 0,
    ko: 241,
    daily: 0,
    note: "사자성어 104개와 고유어 138개를 더하고, 사자성어 뜻과 예문을 다듬었습니다",
    totalEn: 3806,
    totalKo: 1523,
    totalDaily: 80,
  },
  {
    version: '2026.08.05',
    date: '2026-08-05',
    en: 224,
    ko: 0,
    daily: 0,
    note: "2027 수능 빈출 어휘(빈도4) 에서 224개를 더했습니다",
    totalEn: 3806,
    totalKo: 1282,
    totalDaily: 80,
  },
  {
    version: '2026.08.04-2',
    date: '2026-08-04',
    // 초등학교 수준 낱말 108개를 뺐다. 아이들이 이미 아는 것을 다시 묻느라
    // 하루치가 채워지면 정작 배울 것을 못 만난다.
    en: -108,
    ko: 0,
    daily: 0,
    note: '초등학교 때 배우는 쉬운 영어 낱말 108개를 뺐어요. 중학교 낱말부터 만납니다.',
    totalEn: 3582,
    totalKo: 1282,
    totalDaily: 80,
  },
  {
    version: '2026.08.04',
    date: '2026-08-04',
    en: 0,
    /*
     * **다섯이 줄었다.** 늘어난 것을 세는 칸인데 음수로 적는다.
     *
     * 0 으로 적으면 화면에 아무 말도 안 나가고, 그러면 낱말이 없어진 것을
     * 아무도 모른 채 지나간다. 는 것만 말하고 주는 것은 말 안 하는 표는
     * 믿을 수가 없다.
     */
    ko: -5,
    daily: 0,
    note: '사자성어 한자를 사전에서 다 확인했어요. 잘 안 쓰는 다섯 개는 뺐습니다.',
    totalEn: 3690,
    totalKo: 1282,
    totalDaily: 80,
  },
  {
    version: '2026.08.03',
    date: '2026-08-03',
    en: 0,
    ko: 0,
    daily: 0,
    note: '어휘 판 세기를 시작했습니다. 지금까지 모은 것이 아래 개수입니다.',
    totalEn: 3690,
    totalKo: 1287,
    totalDaily: 80,
  },
];

/** 맨 앞(가장 새) 판. */
export function latestDataRelease(): DataRelease {
  return DATA_RELEASES[0];
}

/**
 * 어휘 판을 견준다. 날짜라 글자 그대로 견주면 맞다.
 *
 * `2026.08.03` 과 `2026.08.03-2` 처럼 뒤에 붙는 것도 글자 순서가 그대로
 * 시간 순서라 따로 다룰 것이 없다. 자리마다 숫자로 쪼개던 앱 판과 다른 점이다.
 */
export function compareDataVersions(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * 마지막으로 본 판 이후로 무엇이 늘었나.
 *
 * ── `seen` 이 없으면 아무것도 안 센다 ───────────────────────
 *
 * 이 칸이 생기기 전에 앱을 쓰던 사람은 값이 비어 있다. 그때 "처음부터
 * 다 새것" 으로 세면 **3,690개가 추가됐다**는 거짓말을 하게 된다. 그 사람은
 * 이미 다 갖고 있다.
 *
 * 그래서 모르면 0 이다. 저장할 때 지금 판을 적어 두는 쪽에서 맞춘다
 * (storage 의 migrate, 그리고 새로 만드는 상태).
 */
export function addedSince(seen: string | null | undefined): {
  en: number;
  ko: number;
  daily: number;
  total: number;
  releases: DataRelease[];
} {
  const none = { en: 0, ko: 0, daily: 0, total: 0, releases: [] as DataRelease[] };
  if (!seen) return none;

  const fresh = DATA_RELEASES.filter((r) => compareDataVersions(r.version, seen) > 0);
  if (fresh.length === 0) return none;

  const en = fresh.reduce((n, r) => n + r.en, 0);
  const ko = fresh.reduce((n, r) => n + r.ko, 0);
  const daily = fresh.reduce((n, r) => n + r.daily, 0);
  return { en, ko, daily, total: en + ko + daily, releases: fresh };
}

/**
 * "새 낱말이 몇 개 왔는지" 한 줄로.
 *
 * 갈래마다 나눠 적는다 — 국어를 안 하는 아이에게 합계만 보이면 자기와
 * 상관없는 숫자가 커 보인다. 0 인 갈래는 아예 안 적는다.
 */
export function addedLine(added: { en: number; ko: number; daily: number }): string {
  const parts: string[] = [];
  if (added.en > 0) parts.push(`영어 ${added.en}개`);
  if (added.ko > 0) parts.push(`국어 ${added.ko}개`);
  if (added.daily > 0) parts.push(`일상 문장 ${added.daily}개`);
  return parts.join(' · ');
}
