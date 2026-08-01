#!/usr/bin/env node
/**
 * 어휘 배치표 생성기.
 *
 *   node scripts/build-plan.mjs > src/data/plan.ts
 *
 * data/official-basic-vocabulary.txt (교육부 기본 어휘 목록) 와
 * data/extra-vocabulary.txt (교과서 빈출 파생어·구동사) 를 읽어
 * **어떤 단어가 어느 레벨에 들어가는지**를 정한다.
 *
 * 배치 규칙
 *  1. 난이도 층으로 먼저 나눈다.  초등 권장(*) → 중학 권장(**) → 고등(무표시)
 *  2. 같은 층 안에서는 알파벳 순. 같은 층의 단어끼리는 난이도 차가 크지 않으므로
 *     순서를 임의로 흔들기보다 원본 문서 순서를 그대로 따르는 편이 검증하기 쉽다.
 *  3. 전체를 레벨 24개(학년 6 × 단계 4)로 고르게 자른다.
 *
 * 레벨당 약 137개가 되고, 하루 새 단어 10개면 한 레벨에 2주 남짓,
 * 24레벨을 다 돌면 대략 1년이 된다.
 *
 * ── 숙어는 따로 잘라 덧붙인다 ─────────────────────────────────
 *
 * data/idiom-vocabulary.txt 는 위 두 파일과 **합치지 않고** 따로 24등분해
 * 레벨마다 뒤에 붙인다. 한 통에 부어 다시 자르면 이미 자리를 잡은 3,285개가
 * 레벨 사이를 옮겨 다닌다. 아이가 끝낸 레벨의 단어가 다음 레벨로 밀려나면
 * 진도가 뒤로 가고, levels/*.ts 파일 사이로 표제어를 물리적으로 옮겨야 한다.
 * 따로 자르면 기존 배치가 한 칸도 움직이지 않는다.
 *
 * 이 파일이 정하는 것은 '어떤 단어를 언제 배우는가'뿐이다.
 * 뜻과 예문은 src/data/levels/*.ts 에 따로 적는다.
 */

import { readFileSync } from 'node:fs';

const GRADES = ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'];
const STEPS = [1, 2, 3, 4];
const LEVELS = GRADES.flatMap((g) => STEPS.map((s) => `${g}-${s}`));

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
 *
 * **자르고 난 뒤에 뺀다.** 자르기 전에 빼면 24등분 경계가 한 칸씩 밀려
 * 단어 17개가 다른 레벨로 옮겨 간다. 그 단어들의 뜻과 예문은 이미
 * levels/*.ts 의 제자리에 적혀 있고, 아이 진도도 그 배치를 기준으로 세어
 * 두었다. 오타 하나 때문에 그걸 다 흔들 이유가 없다.
 */
const DROP = new Set(['okey']);

const official = readList('data/official-basic-vocabulary.txt');
const extra = readList('data/extra-vocabulary.txt');

// 같은 단어가 두 파일에 있으면 교육부 목록 쪽을 남긴다.
const seen = new Set(official.map((x) => x.word));
const all = [...official];
for (const x of extra) {
  if (seen.has(x.word)) continue;
  seen.add(x.word);
  all.push({ ...x, extra: true });
}

// 층 순서: 기초(1) → 중급(2) → 고급(0)
const TIER_ORDER = { 1: 0, 2: 1, 0: 2 };
all.sort((a, b) => {
  const t = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
  return t !== 0 ? t : a.word.localeCompare(b.word);
});

// 24레벨로 고르게 자른다. 나머지는 앞 레벨부터 하나씩 더 가져간다.
const base = Math.floor(all.length / LEVELS.length);
const extraCount = all.length % LEVELS.length;

const rows = [];
let at = 0;
LEVELS.forEach((level, i) => {
  const size = base + (i < extraCount ? 1 : 0);
  for (const item of all.slice(at, at + size)) rows.push({ ...item, level });
  at += size;
});

/* ---------- 숙어를 레벨마다 덧붙인다 ---------- */

/**
 * 숙어는 위 목록과 따로 자른다.
 *
 * 층 순서와 자르는 규칙은 같다 — 기초 숙어가 앞 레벨, 수능 숙어가 뒤 레벨로
 * 간다. 다만 자르는 대상이 숙어뿐이라, 단어가 몇 개 늘거나 줄어도 숙어
 * 배치가 흔들리지 않고 그 반대도 마찬가지다.
 *
 * 같은 표제어가 위 목록에도 있으면 여기서 뺀다. 두 레벨에 같은 단어가
 * 들어가면 add-entries 가 어느 쪽에 넣을지 알 수 없다.
 */
const idioms = readList('data/idiom-vocabulary.txt').filter((x) => !seen.has(x.word));
idioms.sort((a, b) => {
  const t = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
  return t !== 0 ? t : a.word.localeCompare(b.word);
});

const idiomBase = Math.floor(idioms.length / LEVELS.length);
const idiomExtra = idioms.length % LEVELS.length;

let idiomAt = 0;
LEVELS.forEach((level, i) => {
  const size = idiomBase + (i < idiomExtra ? 1 : 0);
  for (const item of idioms.slice(idiomAt, idiomAt + size)) {
    rows.push({ ...item, level, extra: true });
  }
  idiomAt += size;
});

// 가르치지 않는 표제어를 뺀다. 자리를 다 잡은 뒤라야 경계가 안 밀린다.
const kept = rows.filter((r) => !DROP.has(r.word));

const byLevel = new Map();
for (const r of kept) byLevel.set(r.level, (byLevel.get(r.level) ?? 0) + 1);

const out = [];
out.push('/**');
out.push(' * 어휘 배치표 — 어떤 단어를 어느 레벨에서 배우는지.');
out.push(' *');
out.push(' * scripts/build-plan.mjs 가 data/*.txt 에서 생성한다. 직접 고치지 말 것.');
out.push(' * 뜻과 예문은 levels/ 아래에 따로 적는다. 여기는 "무엇을 언제"만 정한다.');
out.push(' *');
out.push(
  ` * 총 ${kept.length}개 (단어 ${all.length - DROP.size} + 숙어 ${idioms.length}) · 레벨 ${LEVELS.length}개`,
);
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
for (const [level] of byLevel) {
  out.push(`  '${level}': [`);
  for (const r of kept.filter((x) => x.level === level)) {
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
process.stderr.write(
  `총 ${kept.length}개를 ${LEVELS.length}레벨에 배치했습니다.\n` +
    `  단어 ${all.length} (기초 ${all.filter((x) => x.tier === 1).length} · 중급 ${all.filter((x) => x.tier === 2).length} · 고급 ${all.filter((x) => x.tier === 0).length})\n` +
    `  숙어 ${idioms.length} (기초 ${idioms.filter((x) => x.tier === 1).length} · 중급 ${idioms.filter((x) => x.tier === 2).length} · 고급 ${idioms.filter((x) => x.tier === 0).length})` +
    ` · 레벨당 ${idiomBase}~${idiomBase + (idiomExtra ? 1 : 0)}개씩 덧붙임\n`,
);
