/**
 * 어휘 데이터 무결성 검사. `npm run data:validate`가 이 파일만 돌린다.
 *
 * 단어를 대량으로 추가할 때 여기서 걸러지면 앱을 켜기 전에 알 수 있다.
 */

import { ALL_ENTRIES, ENTRIES_BY_LEVEL } from '../src/data';
import { clozeSentence, exposure, meaningLine, wordForms } from '../src/data/entry';
import { LEVEL_ORDER } from '../src/types';

describe('어휘 데이터', () => {
  it('레벨마다 최소 100개가 있다', () => {
    for (const level of LEVEL_ORDER) {
      expect(ENTRIES_BY_LEVEL[level].length).toBeGreaterThanOrEqual(100);
    }
  });

  it('id가 중복되지 않는다', () => {
    const ids = ALL_ENTRIES.map((e) => e.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
  });

  it('같은 레벨 안에 같은 표제어가 두 번 들어가지 않는다', () => {
    for (const level of LEVEL_ORDER) {
      const words = ENTRIES_BY_LEVEL[level].map((e) => e.word.toLowerCase());
      const dupes = words.filter((w, i) => words.indexOf(w) !== i);
      expect({ level, dupes }).toEqual({ level, dupes: [] });
    }
  });

  it('필수 필드가 비어 있지 않다', () => {
    for (const e of ALL_ENTRIES) {
      expect(e.word.trim()).not.toBe('');
      expect(e.pos.trim()).not.toBe('');
      expect(e.senses.length).toBeGreaterThan(0);

      for (const sense of e.senses) {
        expect({ id: e.id, meaning: sense.meaning.trim() }).not.toEqual({
          id: e.id,
          meaning: '',
        });
        // 요구사항: 단어마다 뜻별로 예문이 여러 개 있어야 한다.
        expect({ id: e.id, examples: sense.examples.length }).toEqual({
          id: e.id,
          examples: sense.examples.length,
        });
        expect(sense.examples.length).toBeGreaterThanOrEqual(2);

        for (const ex of sense.examples) {
          expect(ex.en.trim()).not.toBe('');
          expect(ex.ko.trim()).not.toBe('');
        }
      }
    }
  });

  it('단어마다 예문이 최소 3개다 (뜻을 모두 합쳐서)', () => {
    for (const e of ALL_ENTRIES) {
      const total = e.senses.reduce((n, s) => n + s.examples.length, 0);
      expect({ id: e.id, word: e.word, total: total >= 3 }).toEqual({
        id: e.id,
        word: e.word,
        total: true,
      });
    }
  });

  it('띄어쓰기가 있는 표제어는 숙어로 분류된다', () => {
    for (const e of ALL_ENTRIES) {
      const expected = e.word.includes(' ') ? 'idiom' : 'word';
      expect({ id: e.id, kind: e.kind }).toEqual({ id: e.id, kind: expected });
    }
  });

  it('예문에 표제어가 실제로 들어 있다', () => {
    // 굴절형까지 찾아본다. 하나도 못 찾으면 예문이 표제어와 무관한 것이다.
    const misses: string[] = [];
    for (const e of ALL_ENTRIES) {
      for (const sense of e.senses) {
        for (const ex of sense.examples) {
          if (!clozeSentence(e, ex.en)) {
            misses.push(`${e.id} ${e.word} :: ${ex.en}`);
          }
        }
      }
    }
    // 불규칙 변화(go/went, buy/bought 등)는 어쩔 수 없이 놓친다.
    // 전체의 12%를 넘으면 데이터가 잘못됐다고 본다.
    const totalExamples = ALL_ENTRIES.reduce(
      (n, e) => n + e.senses.reduce((m, s) => m + s.examples.length, 0),
      0,
    );
    expect(misses.length / totalExamples).toBeLessThan(0.12);
  });

  it('동의어에 표제어 자신이 들어가지 않는다', () => {
    for (const e of ALL_ENTRIES) {
      for (const sense of e.senses) {
        for (const syn of sense.synonyms) {
          expect({ id: e.id, syn: syn.toLowerCase() === e.word.toLowerCase() }).toEqual({
            id: e.id,
            syn: false,
          });
        }
      }
    }
  });
});

describe('exposure', () => {
  it('노출 횟수가 늘면 다른 뜻·다른 예문이 나온다', () => {
    const multi = ALL_ENTRIES.find((e) => e.senses.length >= 2)!;

    const first = exposure(multi, 0);
    const second = exposure(multi, 1);

    expect(second.senseIndex).not.toBe(first.senseIndex);
  });

  it('예문이 여러 개면 다시 만날 때 다른 문장이 나온다', () => {
    const single = ALL_ENTRIES.find(
      (e) => e.senses.length === 1 && e.senses[0].examples.length >= 3,
    )!;

    const a = exposure(single, 0).example.en;
    const b = exposure(single, 1).example.en;
    const c = exposure(single, 2).example.en;

    expect(new Set([a, b, c]).size).toBe(3);
  });

  it('한 바퀴 돌면 처음 문장으로 되돌아온다', () => {
    const e = ALL_ENTRIES.find((x) => x.senses.length === 1 && x.senses[0].examples.length === 3)!;
    expect(exposure(e, 3).example.en).toBe(exposure(e, 0).example.en);
  });

  it('노출 횟수가 아무리 커도 항상 유효한 예문을 돌려준다', () => {
    for (const e of ALL_ENTRIES.slice(0, 50)) {
      for (let n = 0; n < 25; n++) {
        const exp = exposure(e, n);
        expect(exp.example.en.length).toBeGreaterThan(0);
        expect(exp.sense.meaning.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('clozeSentence', () => {
  it('표제어를 빈칸으로 바꾼다', () => {
    const entry = ALL_ENTRIES.find((e) => e.word === 'save')!;
    const result = clozeSentence(entry, 'We should save water.');
    expect(result?.text).toBe('We should _____ water.');
    expect(result?.answer).toBe('save');
  });

  it('굴절형도 찾아낸다', () => {
    const entry = ALL_ENTRIES.find((e) => e.word === 'save')!;
    const result = clozeSentence(entry, 'The doctor saved his life.');
    expect(result?.text).toBe('The doctor _____ his life.');
  });

  it('단어 일부만 겹치는 경우는 잡지 않는다', () => {
    const entry = ALL_ENTRIES.find((e) => e.word === 'save')!;
    // saves 안의 sav-를 잘못 잡으면 안 된다.
    const result = clozeSentence(entry, 'He has savings in the bank.');
    expect(result).toBeNull();
  });

  it('표제어가 없으면 null을 돌려준다', () => {
    const entry = ALL_ENTRIES[0];
    expect(clozeSentence(entry, 'Totally unrelated sentence here.')).toBeNull();
  });
});

describe('wordForms', () => {
  it('긴 형태를 먼저 시도한다', () => {
    const forms = wordForms('save');
    const savedIdx = forms.indexOf('saved');
    const saveIdx = forms.indexOf('save');
    expect(savedIdx).toBeLessThan(saveIdx);
  });

  it('숙어는 원형만 쓴다', () => {
    expect(wordForms('take part in')).toEqual(['take part in']);
  });
});

describe('meaningLine', () => {
  it('다의어는 뜻을 모두 이어 붙인다', () => {
    const multi = ALL_ENTRIES.find((e) => e.senses.length >= 2)!;
    expect(meaningLine(multi)).toContain(' ; ');
  });
});
