#!/usr/bin/env node
/**
 * CSV → 레벨 데이터 파일 변환기.
 *
 * 레벨당 100개에서 300개 이상으로 늘릴 때, 교육부 기본 어휘 목록이나
 * 수능 기출 빈도표를 스프레드시트로 정리한 뒤 이 스크립트로 부어 넣는다.
 *
 *   node scripts/import-csv.mjs words.csv m1 > src/data/levels/m1.ts
 *
 * CSV 열 순서 (첫 줄은 헤더, 무시된다):
 *   word, pos, meaning, synonyms, ex1_en, ex1_ko, ex2_en, ex2_ko, ex3_en, ex3_ko, ex4_en, ex4_ko
 *
 *  - synonyms 는 `;` 로 구분한다.  예) rescue;save from
 *  - 같은 word 가 여러 줄에 나오면 뜻(sense)이 여러 개인 것으로 합쳐진다.
 *    다의어는 뜻마다 한 줄씩 적으면 된다.
 *  - 예문 칸은 비어 있어도 되지만, 한 단어당 최소 3개는 채우기를 권한다.
 *    (`npm run data:validate` 가 이를 검사한다)
 */

import { readFileSync } from 'node:fs';

const GRADES = ['m1', 'm2', 'm3', 'h1', 'h2', 'h3'];
const STEPS = [1, 2, 3];
const LEVELS = GRADES.flatMap((g) => STEPS.map((s) => `${g}-${s}`));
const GRADE_TITLE = {
  m1: '중학교 1학년',
  m2: '중학교 2학년',
  m3: '중학교 3학년',
  h1: '고등학교 1학년',
  h2: '고등학교 2학년',
  h3: '고등학교 3학년',
};

const [csvPath, level, sourceArg] = process.argv.slice(2);

if (!csvPath || !level) {
  console.error('사용법: node scripts/import-csv.mjs <csv 경로> <레벨> [출처]');
  console.error(`  레벨: ${LEVELS.join(' | ')}`);
  console.error('  예)  node scripts/import-csv.mjs words.csv m1-2 > src/data/levels/m1-2.ts');
  console.error('  출처: curriculum(기본) | textbook | csat');
  process.exit(1);
}

if (!LEVELS.includes(level)) {
  console.error(`알 수 없는 레벨: ${level}. ${LEVELS.join(' | ')} 중 하나여야 합니다.`);
  process.exit(1);
}

const grade = level.slice(0, 2);
const step = level.slice(3);
const defaultSource = sourceArg ?? (grade.startsWith('h') ? 'csat' : 'curriculum');

/** 따옴표와 줄바꿈을 포함한 CSV를 파싱한다. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  const src = text.replace(/^﻿/, '').replace(/\r\n?/g, '\n');

  for (let i = 0; i < src.length; i++) {
    const ch = src[i];

    if (quoted) {
      if (ch === '"') {
        if (src[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') quoted = true;
    else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else field += ch;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

/** 작은따옴표 문자열 리터럴로 감싼다. */
function q(s) {
  return `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

const rows = parseCsv(readFileSync(csvPath, 'utf8'));
if (rows.length < 2) {
  console.error('데이터 줄이 없습니다. 첫 줄은 헤더로 취급합니다.');
  process.exit(1);
}

// word → { pos, senses: [...] }
const byWord = new Map();
const problems = [];

rows.slice(1).forEach((cols, idx) => {
  const lineNo = idx + 2;
  const [word, pos, meaning, synonyms, ...rest] = cols.map((c) => (c ?? '').trim());

  if (!word) {
    problems.push(`${lineNo}줄: 표제어가 비어 있습니다.`);
    return;
  }
  if (!meaning) {
    problems.push(`${lineNo}줄: '${word}' 의 뜻이 비어 있습니다.`);
    return;
  }

  const examples = [];
  for (let i = 0; i + 1 < rest.length; i += 2) {
    const en = (rest[i] ?? '').trim();
    const ko = (rest[i + 1] ?? '').trim();
    if (en && ko) examples.push([en, ko]);
    else if (en || ko) {
      problems.push(`${lineNo}줄: '${word}' 예문의 영어/해석 중 한쪽이 비어 있습니다.`);
    }
  }

  if (!byWord.has(word)) {
    byWord.set(word, { word, pos: pos || (word.includes(' ') ? 'phr.' : 'n.'), senses: [] });
  }
  byWord.get(word).senses.push({
    meaning,
    synonyms: synonyms ? synonyms.split(';').map((s) => s.trim()).filter(Boolean) : [],
    examples,
  });
});

for (const entry of byWord.values()) {
  const total = entry.senses.reduce((n, s) => n + s.examples.length, 0);
  if (total < 3) {
    problems.push(`'${entry.word}': 예문이 ${total}개뿐입니다. 3개 이상을 권장합니다.`);
  }
}

if (problems.length > 0) {
  console.error('--- 확인이 필요한 항목 ---');
  for (const p of problems) console.error(`  · ${p}`);
  console.error(`총 ${problems.length}건. 그래도 파일은 생성합니다.\n`);
}

const lines = [];
lines.push('/**');
lines.push(` * ${GRADE_TITLE[grade]} 레벨 ${step} 어휘 ${byWord.size}개.`);
lines.push(' *');
lines.push(` * scripts/import-csv.mjs 로 ${csvPath} 에서 생성했습니다.`);
lines.push(' * 직접 고쳐도 되지만, CSV를 다시 부으면 덮어써집니다.');
lines.push(' */');
lines.push('');
lines.push("import { defineLevel } from '../define';");
lines.push('');
const varName = `${grade.toUpperCase()}_${step}`;
lines.push(`export const ${varName} = defineLevel(`);
lines.push(`  ${q(level)},`);
lines.push('  [');

for (const entry of byWord.values()) {
  lines.push(`    { w: ${q(entry.word)}, p: ${q(entry.pos)}, s: [`);
  for (const sense of entry.senses) {
    const syn = sense.synonyms.map(q).join(', ');
    lines.push(`      { m: ${q(sense.meaning)}, syn: [${syn}], ex: [`);
    for (const [en, ko] of sense.examples) {
      lines.push(`        [${q(en)}, ${q(ko)}],`);
    }
    lines.push('      ]},');
  }
  lines.push('    ]},');
}

lines.push('  ],');
lines.push(`  ${q(defaultSource)},`);
lines.push(');');
lines.push('');

process.stdout.write(lines.join('\n'));
console.error(`\n${byWord.size}개 단어를 변환했습니다. 이어서 \`npm run data:validate\` 로 검사하세요.`);
