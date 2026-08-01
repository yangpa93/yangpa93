#!/usr/bin/env node
/**
 * 어휘 배치표 생성기.
 *
 *   node scripts/build-plan.mjs > src/data/plan.ts
 *   (보통은 `npm run data:update` 가 알아서 부른다)
 *
 * data/ 아래의 낱말 목록을 읽어 **어떤 단어가 어느 레벨에 들어가는지**를 정한다.
 *
 *   official-basic-vocabulary.txt   교육부 「기본 어휘 목록」
 *   extra-vocabulary.txt            교과서 빈출 파생어·구동사
 *   idiom-vocabulary.txt            중·고 필수 숙어
 *
 * ── 한 번 정한 자리는 다시 안 바꾼다 ─────────────────────────
 *
 * **이게 이 파일에서 가장 중요한 규칙이다.**
 *
 * 예전에는 목록 전체를 그때그때 24등분했다. 그래서 단어를 하나만 더 넣어도
 * 경계가 밀려 수십 개가 다른 레벨로 옮겨 갔다. 그러면
 *
 *   · 아이가 이미 끝낸 레벨에 새 단어가 생기고,
 *   · 아직 안 배운 단어가 지나간 레벨로 밀려 영영 안 나오고,
 *   · levels/*.ts 파일 사이로 표제어를 손으로 옮겨야 하고,
 *   · 레벨 시험 문항 수가 통째로 달라진다.
 *
 * 그래서 자리를 **data/placement.json 에 못박아** 둔다. 거기 적힌 단어는
 * 무슨 일이 있어도 그 레벨에 남는다. 새로 들어온 단어만 자리를 찾는다.
 *
 * 새 단어는 난이도 층이 맡은 레벨 구간 안에서, **그 구간에서 가장 홀쭉한
 * 레벨**로 간다. 레벨끼리 크기가 벌어지지 않게 하려는 것이다.
 *
 *   기초(초등 권장)   중1-1 … 중2-4
 *   중급(중학 권장)   중3-1 … 고1-4
 *   고급(고등)        고2-1 … 고3-4
 *
 * 배치표를 새로 만들면 placement.json 도 같이 갱신된다. 두 파일 모두
 * 저장소에 올린다 — 자리가 언제 어떻게 정해졌는지가 이력에 남아야 한다.
 *
 * 이 파일이 정하는 것은 '어떤 단어를 언제 배우는가'뿐이다.
 * 뜻과 예문은 src/data/levels/*.ts 에 따로 적는다.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const GRADES = ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'];
const STEPS = [1, 2, 3, 4];
const LEVELS = GRADES.flatMap((g) => STEPS.map((s) => `${g}-${s}`));

const PLACEMENT = 'data/placement.json';

/** 파일 한 장을 읽어 `{ word, tier }` 목록으로. tier: 1 기초 · 2 중급 · 0 고급 */
function readList(path) {
  return readFileSync(path, 'utf8')
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith('#'))
    .map((l) => {
      if (l.endsWith('**')) return { word: l.slice(0, -2), tier: 2 };
      if (l.endsWith('*')) return { word: l.slice(0, -1), tier: 1 };
      return { word: l, tier: 0 };
    });
}

/**
 * 원본 목록에 있지만 가르치지 않는 표제어.
 *
 * `okey` 는 바로 윗줄 `okay` 를 옮겨 적다 난 오타다. 원본 파일은 교육부 별표를
 * 그대로 옮긴 것이라 손대지 않고, 배치할 때만 뺀다.
 */
const DROP = new Set(['okey']);

/** 난이도 층이 맡는 레벨 구간. [시작, 끝) — LEVELS 의 자리 번호다. */
const TIER_RANGE = {
  1: [0, 8], //  기초 → 중1-1 … 중2-4
  2: [8, 16], // 중급 → 중3-1 … 고1-4
  0: [16, 24], // 고급 → 고2-1 … 고3-4
};

/* ---------- 낱말 모으기 ---------- */

const official = readList('data/official-basic-vocabulary.txt');
const extra = readList('data/extra-vocabulary.txt');
const idioms = existsSync('data/idiom-vocabulary.txt')
  ? readList('data/idiom-vocabulary.txt')
  : [];

// 같은 단어가 여러 파일에 있으면 교육부 목록 쪽을 남긴다.
const seen = new Set();
const all = [];
for (const [list, isExtra] of [
  [official, false],
  [extra, true],
  [idioms, true],
]) {
  for (const x of list) {
    if (seen.has(x.word) || DROP.has(x.word)) continue;
    seen.add(x.word);
    all.push({ ...x, ...(isExtra ? { extra: true } : {}) });
  }
}

/* ---------- 이미 정해진 자리 ---------- */

const locked = new Map(); // word → level
if (existsSync(PLACEMENT)) {
  const saved = JSON.parse(readFileSync(PLACEMENT, 'utf8'));
  for (const [level, words] of Object.entries(saved)) {
    for (const w of words) locked.set(w, level);
  }
}

/** 레벨별 배치 결과. 못박힌 순서를 그대로 지킨다. */
const byLevel = new Map(LEVELS.map((l) => [l, []]));
const wordTier = new Map(all.map((x) => [x.word, x]));

// ① 못박힌 것부터, 저장된 순서대로.
if (existsSync(PLACEMENT)) {
  const saved = JSON.parse(readFileSync(PLACEMENT, 'utf8'));
  for (const level of LEVELS) {
    for (const w of saved[level] ?? []) {
      // 목록에서 빠진 낱말은 못박힌 자리도 놓아준다. 목록이 곧 무엇을
      // 가르치는지이므로, 거기서 지웠으면 배치표에서도 사라져야 한다.
      if (!wordTier.has(w)) continue;
      byLevel.get(level).push(wordTier.get(w));
    }
  }
}

// ② 새로 들어온 것. 층이 맡은 구간에서 가장 홀쭉한 레벨로 보낸다.
const fresh = all.filter((x) => !locked.has(x.word));
fresh.sort((a, b) => {
  const t = a.tier === b.tier ? 0 : TIER_RANGE[a.tier][0] - TIER_RANGE[b.tier][0];
  return t !== 0 ? t : a.word.localeCompare(b.word);
});

for (const item of fresh) {
  const [from, to] = TIER_RANGE[item.tier];
  let best = LEVELS[from];
  for (let i = from; i < to; i++) {
    if (byLevel.get(LEVELS[i]).length < byLevel.get(best).length) best = LEVELS[i];
  }
  byLevel.get(best).push(item);
}

/* ---------- 내보내기 ---------- */

const total = LEVELS.reduce((n, l) => n + byLevel.get(l).length, 0);

const out = [];
out.push('/**');
out.push(' * 어휘 배치표 — 어떤 단어를 어느 레벨에서 배우는지.');
out.push(' *');
out.push(' * scripts/build-plan.mjs 가 data/*.txt 에서 생성한다. 직접 고치지 말 것.');
out.push(' * 자리는 data/placement.json 에 못박혀 있어서, 단어를 더 넣어도');
out.push(' * 이미 배운 단어가 다른 레벨로 옮겨 가지 않는다.');
out.push(' *');
out.push(` * 총 ${total}개 · 레벨 ${LEVELS.length}개`);
out.push(' */');
out.push('');
out.push("import { LevelId } from '../types';");
out.push('');
out.push('/** 1 기초(초등 권장) · 2 중급(중학 권장) · 0 고급(고등) */');
out.push('export type Tier = 0 | 1 | 2;');
out.push('');
out.push('export interface PlanRow {');
out.push('  word: string;');
out.push('  tier: Tier;');
out.push('  level: LevelId;');
out.push('  /** 교육부 목록에는 없고 교과서 빈출로 우리가 넣은 것 */');
out.push('  extra?: true;');
out.push('}');
out.push('');
// 레벨 문자열을 3천 번 되풀이하면 타입 검사가 감당하지 못한다(TS2590).
// 레벨로 묶고, 항목은 [표제어, 층, 교육부 목록 밖인지] 세 칸짜리 배열로 적는다.
out.push('/** [표제어, 난이도 층, 교육부 목록 밖이면 1] */');
out.push('type Row = [string, Tier] | [string, Tier, 1];');
out.push('');
out.push('const RAW: Record<LevelId, Row[]> = {');
for (const level of LEVELS) {
  out.push(`  '${level}': [`);
  for (const r of byLevel.get(level)) {
    out.push(`    [${JSON.stringify(r.word)}, ${r.tier}${r.extra ? ', 1' : ''}],`);
  }
  out.push('  ],');
}
out.push('};');
out.push('');
out.push('export const PLAN: PlanRow[] = (Object.keys(RAW) as LevelId[]).flatMap((level) =>');
out.push('  RAW[level].map(([word, tier, extra]) => ({ word, tier, level, ...(extra ? { extra } : {}) }) as PlanRow),');
out.push(');');
out.push('');
out.push('/** 레벨별 계획 단어 수 */');
out.push('export const PLAN_COUNT: Record<LevelId, number> = Object.fromEntries(');
out.push('  (Object.keys(RAW) as LevelId[]).map((l) => [l, RAW[l].length]),');
out.push(') as Record<LevelId, number>;');
out.push('');
out.push('/** 그 레벨에서 배우기로 계획된 단어들 */');
out.push('export function planOf(level: LevelId): PlanRow[] {');
out.push('  return PLAN.filter((r) => r.level === level);');
out.push('}');
out.push('');

process.stdout.write(out.join('\n'));

// 정한 자리를 못박아 둔다. 다음 번에 이 파일이 기준이 된다.
writeFileSync(
  PLACEMENT,
  JSON.stringify(
    Object.fromEntries(LEVELS.map((l) => [l, byLevel.get(l).map((r) => r.word)])),
    null,
    1,
  ) + '\n',
  'utf8',
);

const dropped = [...locked.keys()].filter((w) => !wordTier.has(w));
process.stderr.write(
  `총 ${total}개 · 레벨당 ${Math.min(...LEVELS.map((l) => byLevel.get(l).length))}~` +
    `${Math.max(...LEVELS.map((l) => byLevel.get(l).length))}개\n` +
    `  자리가 이미 정해져 있던 것 ${total - fresh.length}\n` +
    `  이번에 새로 자리를 잡은 것 ${fresh.length}` +
    (fresh.length > 0 ? `: ${fresh.slice(0, 12).map((x) => x.word).join(', ')}${fresh.length > 12 ? ' …' : ''}` : '') +
    '\n' +
    (dropped.length > 0 ? `  목록에서 빠져 배치표에서도 지운 것 ${dropped.length}: ${dropped.join(', ')}\n` : ''),
);
