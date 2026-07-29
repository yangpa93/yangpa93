/**
 * 레벨 데이터(src/data/levels/*.ts)를 읽어 온다.
 *
 * 표제어 파일은 `{ w: 'solid', p: 'adj.' }` 처럼 한 줄에 하나씩 적은
 * 손으로 쓰는 파일이다. TS를 컴파일해서 불러오면 스크립트마다 빌드가
 * 필요해지므로, 줄 단위로 읽는다. 대신 **줄 번호를 같이 돌려준다** —
 * 검사 결과를 사람이 열어 볼 때 파일:줄 로 바로 찾아가야 하기 때문이다.
 */

import { readFileSync, readdirSync } from 'node:fs';

export const LEVEL_DIR = 'src/data/levels';

function unq(s) {
  return s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}

/** 모든 레벨의 표제어. 파일 이름(= 레벨 id) 순서대로. */
export function readEntries(dir = LEVEL_DIR) {
  const entries = [];

  for (const file of readdirSync(dir).filter((f) => f.endsWith('.ts')).sort()) {
    const src = readFileSync(`${dir}/${file}`, 'utf8');
    const level = file.replace(/\.ts$/, '');

    let cur = null;
    let sense = null;

    for (const [i, line] of src.split('\n').entries()) {
      const w = line.match(/^ {2}\{ w: '((?:[^'\\]|\\.)*)', p: '((?:[^'\\]|\\.)*)'/);
      if (w) {
        cur = { level, file, line: i + 1, word: unq(w[1]), pos: unq(w[2]), senses: [] };
        entries.push(cur);
        continue;
      }
      const m = line.match(/^ {4}\{ m: '((?:[^'\\]|\\.)*)', syn: \[(.*)\], ex: \[/);
      if (m && cur) {
        sense = {
          line: i + 1,
          meaning: unq(m[1]),
          synonyms: [...m[2].matchAll(/'((?:[^'\\]|\\.)*)'/g)].map((x) => unq(x[1])),
          examples: [],
        };
        cur.senses.push(sense);
        continue;
      }
      const ex = line.match(/^ {6}\['((?:[^'\\]|\\.)*)', '((?:[^'\\]|\\.)*)'\],$/);
      if (ex && sense) sense.examples.push({ line: i + 1, en: unq(ex[1]), ko: unq(ex[2]) });
    }
  }

  return entries;
}
