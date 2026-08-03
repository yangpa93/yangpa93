/**
 * korean/english_365_dataset.json → src/data/daily/phrases.ts
 *
 * **원본 파일은 365일치가 아니다.** 8개 주제 × 10문장 = 80문장을 45~46번씩
 * 되풀이해 365일을 채워 놓은 것이다. 실제로 서로 다른 문장은 80개뿐이라,
 * 여기서 중복을 걷어내고 주제 8개로 정리한다. 없는 문장을 지어내지 않는다 —
 * 부모님이 매일 새 문장을 만난다고 적어 두었다가 여드레 만에 동나는 편이
 * 처음부터 80개라고 말하는 것보다 나쁘다.
 *
 * 빈칸 문제를 내려면 **문장 어디를 지울지**를 알아야 한다. 원본의
 * `key_expression` 은 'get back to someone' 처럼 사전 표제어 꼴이라 문장에
 * 그대로 들어 있지 않은 것이 80개 중 16개다. 그래서 표제어를 규칙으로 늘려
 * 문장 안에서 실제로 쓰인 자리를 찾고, **찾은 그 자리를 표제어로 쓴다.**
 * 못 찾으면 원본 표제어를 그대로 두고 빈칸 문제는 내지 않는다(문맥 문제로 간다).
 *
 *   node scripts/build-daily.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, '..');

/**
 * 주제 이름표.
 *
 * 원본의 `theme` 은 영어고 `theme_ko` 는 '업무 및 협업 (Day 1)' 처럼 날짜가
 * 붙어 있다. 날짜를 떼고, 화면에 쓸 짧은 이름과 한 줄 설명을 여기서 정한다.
 * 순서가 곧 화면에 늘어놓는 순서다.
 */
const THEMES = [
  ['w', 'Workplace & Collaboration', '업무와 협업', '회의·협업에서 매일 오가는 말'],
  ['it', 'IT & Software Engineering', 'IT와 개발', '배포·리뷰·장애를 말할 때'],
  ['ai', 'Data Science & AI', '데이터와 인공지능', '모델·데이터 이야기'],
  ['pm', 'Project Management & Operations', '프로젝트 관리', '일정·자원·위험을 다룰 때'],
  ['ld', 'Leadership & Executive Communication', '리더십과 경영진 소통', '방향을 말하고 사람을 움직일 때'],
  ['et', 'Daily Business & Professional Etiquette', '비즈니스 예절', '메일과 인사에 쓰는 정중한 말'],
  ['ng', 'Negotiation & Problem Solving', '협상과 문제 해결', '이견을 좁히고 원인을 찾을 때'],
  ['st', 'Small Talk & Socializing', '가벼운 대화', '일 이야기가 아닌 자리에서'],
];

/**
 * 문장 안에서 표제어가 실제로 쓰인 자리를 찾는다.
 *
 * 세 단계로 넓혀 가며 찾고, 처음 걸리는 것을 쓴다. 넓은 것부터 찾으면
 * 엉뚱한 자리를 잡는다.
 *   1) 표제어가 그대로 들어 있는가
 *   2) 자리표시말(someone·something)을 뺀 꼴이 그대로 들어 있는가
 *   3) 낱말마다 어미가 바뀌고 사이에 다른 낱말이 두 개까지 끼었는가
 */
function findSpan(expression, sentence) {
  const exact = matchRe(sentence, `\\b${esc(expression)}\\b`);
  if (exact) return exact;

  const words = expression
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 0 && !PLACEHOLDERS.has(w));
  if (words.length === 0) return null;

  const plain = matchRe(sentence, `\\b${words.map(esc).join('\\s+')}\\b`);
  if (plain) return plain;

  const loose = words.map((w) => `(?:${stems(w).map(esc).join('|')})\\w*`).join('(?:\\s+\\w+){0,2}\\s+');
  return matchRe(sentence, `\\b${loose}\\b`);
}

/** 'get back to someone' 의 someone 처럼 자리만 잡아 둔 낱말. */
const PLACEHOLDERS = new Set(['someone', 'somebody', 'something', "one's", 'sth', 'sb']);

/**
 * 낱말이 문장에서 어떤 꼴로 나타날지 몰라 앞부분만 남긴다.
 *
 * 'streamline' 은 문장에 'streamlining' 으로, 'risks' 는 'risk' 로 들어 있다.
 * 어미를 떼고 앞부분만 두면 둘 다 걸린다. 불규칙 변화는 규칙으로 못 만들어
 * 따로 적어 둔다 — 지금 필요한 것은 catch 하나지만, 빠뜨리면 그 문장만
 * 조용히 빈칸 문제에서 빠진다.
 */
const IRREGULAR = { catch: ['caught'], take: ['took', 'taken'], get: ['got', 'gotten'] };

function stems(word) {
  const out = new Set([word, ...(IRREGULAR[word] ?? [])]);
  // 어미를 떼는 것은 낱말이 충분히 길 때만. 'on' 에서 'n' 을 떼면 아무거나 걸린다.
  if (word.length >= 6) {
    for (const suffix of ['ly', 'ing', 'ed', 'es', 's', 'e']) {
      if (word.endsWith(suffix) && word.length - suffix.length >= 4) {
        out.add(word.slice(0, -suffix.length));
        break;
      }
    }
  } else if (word.length >= 5 && word.endsWith('e')) {
    out.add(word.slice(0, -1));
  } else if (word.length >= 4 && word.endsWith('s')) {
    out.add(word.slice(0, -1));
  }
  return [...out].sort((a, b) => b.length - a.length);
}

function matchRe(sentence, pattern) {
  const m = sentence.match(new RegExp(pattern, 'i'));
  return m ? m[0] : null;
}

function esc(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/* ------------------------------------------------------------------ */

const raw = JSON.parse(readFileSync(join(root, 'korean', 'english_365_dataset.json'), 'utf8'));

// 같은 주제의 하루치는 어느 날을 집어도 문장이 똑같다. 처음 만난 것만 쓴다.
const firstOf = new Map();
for (const day of raw) {
  const theme = day.theme.replace(/\s*-\s*Part \d+$/, '');
  if (!firstOf.has(theme)) firstOf.set(theme, day.sentences);
}

let missing = 0;
const themes = THEMES.map(([id, theme, label, hint]) => {
  const sentences = firstOf.get(theme);
  if (!sentences) throw new Error(`원본에 없는 주제: ${theme}`);

  const phrases = sentences.map((s, i) => {
    const span = findSpan(s.key_expression, s.en);
    if (!span) missing++;
    return {
      id: `daily-${id}-${String(i + 1).padStart(2, '0')}`,
      word: span ?? s.key_expression,
      /** 원본 표제어. 문장에서 찾은 자리와 다를 수 있어 함께 남긴다. */
      keyExpression: s.key_expression,
      en: s.en,
      ko: s.ko,
      note: s.note,
    };
  });

  return { id, label, hint, phrases };
});

const total = themes.reduce((n, t) => n + t.phrases.length, 0);

const out = `/**
 * 부모님이 배우는 일상·업무 영어 문장.
 *
 * **이 파일은 scripts/build-daily.mjs 가 만든다. 손으로 고치지 않는다.**
 * 원본은 korean/english_365_dataset.json 이고, 거기 실린 365일치는 8개 주제
 * × 10문장을 되풀이한 것이라 실제로 서로 다른 문장은 ${total}개다.
 *
 * \`word\` 는 문장에서 그 표현이 실제로 쓰인 자리다. 원본 표제어
 * (\`keyExpression\`)가 'get back to someone' 처럼 사전 꼴이라 문장에 그대로
 * 들어 있지 않은 경우가 있어서, 빈칸을 만들 수 있도록 쓰인 자리를 따로 잡아
 * 두었다. 자리를 못 잡은 둘은 표제어를 그대로 두었고, 빈칸을 만들 수 있는지는
 * 앱이 clozeSentence 로 그때 판단한다 — 여기에 또 적어 두면 두 곳이 어긋난다.
 */

export interface DailyPhrase {
  id: string;
  /** 문장에서 이 표현이 실제로 쓰인 자리. 빈칸으로 지울 부분이다. */
  word: string;
  /** 원본 표제어. 사전 꼴이라 문장과 다를 수 있다. */
  keyExpression: string;
  en: string;
  ko: string;
  /** 언제 쓰는 표현인지 한 줄 */
  note: string;
}

export interface DailyTheme {
  id: string;
  /** 화면에 쓰는 이름 */
  label: string;
  /** 한 줄 설명 */
  hint: string;
  phrases: DailyPhrase[];
}

export const DAILY_THEMES: DailyTheme[] = ${JSON.stringify(themes, null, 2)};
`;

mkdirSync(join(root, 'src', 'data', 'daily'), { recursive: true });
writeFileSync(join(root, 'src', 'data', 'daily', 'phrases.ts'), out, 'utf8');

console.log(`주제 ${themes.length}개 · 문장 ${total}개 · 쓰인 자리를 못 찾은 것 ${missing}개`);
