/**
 * 어휘 데이터 무결성 검사. `npm run data:validate`가 이 파일만 돌린다.
 *
 * 단어를 대량으로 추가할 때 여기서 걸러지면 앱을 켜기 전에 알 수 있다.
 */

import { ALL_ENTRIES, ENTRIES_BY_LEVEL } from '../src/data';
import { clozeSentence, exposure, meaningLine, wordForms } from '../src/data/entry';
import { ANTONYMS, antonymsOf, hasAntonym } from '../src/data/antonyms';
import { PLAN, PLAN_COUNT } from '../src/data/plan';
import { LEVEL_ORDER } from '../src/types';

describe('어휘 데이터', () => {
  it('레벨마다 단어가 들어 있다', () => {
    for (const level of LEVEL_ORDER) {
      expect({ level, empty: ENTRIES_BY_LEVEL[level].length === 0 }).toEqual({
        level,
        empty: false,
      });
    }
  });

  it('한 레벨이 시험을 볼 수 있는 분량을 넘지 않는다', () => {
    // 레벨 시험은 그 레벨 단어 전부를 다의어까지 출제한다. 문항이 200개를
    // 넘어가면 한자리에서 끝낼 수 없어 시험이 무의미해진다.
    for (const level of LEVEL_ORDER) {
      const items = ENTRIES_BY_LEVEL[level].reduce((n, e) => n + e.senses.length, 0);
      expect({ level, tooLong: items > 200 }).toEqual({ level, tooLong: false });
    }
  });

  it('표제어가 전체에서 한 번만 나온다', () => {
    // id를 표제어로만 만들기 때문에 같은 단어가 두 레벨에 있으면 id가 겹친다.
    const words = ALL_ENTRIES.map((e) => e.word.toLowerCase());
    const dupes = [...new Set(words.filter((w, i) => words.indexOf(w) !== i))];
    expect(dupes).toEqual([]);
  });

  it('id가 중복되지 않는다', () => {
    const ids = ALL_ENTRIES.map((e) => e.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
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
    // 빈칸 채우기가 모든 문제의 중심이라 적용률이 곧 출제 가능 범위다.
    // 불규칙 변화표를 넣어 대부분을 잡는다. 남는 것은 표제어가 문장에
    // 흩어져 있는 경우(wake me up)로, 그때는 다른 유형으로 돌아간다.
    const totalExamples = ALL_ENTRIES.reduce(
      (n, e) => n + e.senses.reduce((m, s) => m + s.examples.length, 0),
      0,
    );
    expect(misses.length / totalExamples).toBeLessThan(0.02);
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

describe('배치표(plan.ts)', () => {
  it('배치표에 같은 단어가 두 번 나오지 않는다', () => {
    const words = PLAN.map((r) => r.word);
    const dupes = [...new Set(words.filter((w, i) => words.indexOf(w) !== i))];
    expect(dupes).toEqual([]);
  });

  it('레벨당 계획 단어 수가 시험을 볼 수 있는 범위다', () => {
    // 계획대로 다 채웠을 때 시험이 길어지지 않아야 한다.
    for (const level of LEVEL_ORDER) {
      expect({ level, ok: PLAN_COUNT[level] > 0 && PLAN_COUNT[level] <= 150 }).toEqual({
        level,
        ok: true,
      });
    }
  });

  it('수록한 단어는 모두 배치표에 있고, 배치표가 정한 레벨에 놓여 있다', () => {
    const planned = new Map(PLAN.map((r) => [r.word, r.level]));
    const misplaced: string[] = [];
    for (const e of ALL_ENTRIES) {
      const want = planned.get(e.word);
      if (want === undefined) misplaced.push(`${e.word}: 배치표에 없음`);
      else if (want !== e.level) misplaced.push(`${e.word}: ${e.level} → ${want} 여야 함`);
    }
    expect(misplaced).toEqual([]);
  });

  it('앞 레벨부터 순서대로 채워 나간다', () => {
    // 뒤 레벨을 먼저 채우면 아이가 진도를 나가다 빈 레벨을 만난다.
    // 수록률이 한 번 떨어진 뒤 다시 올라가면 그 순서가 깨진 것이다.
    const rates = LEVEL_ORDER.map((l) => ENTRIES_BY_LEVEL[l].length / PLAN_COUNT[l]);
    const complete = rates.filter((r) => r >= 1).length;
    // 완성된 레벨은 반드시 앞쪽에 몰려 있어야 한다.
    expect(rates.slice(0, complete).every((r) => r >= 1)).toBe(true);
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

  it('숙어는 첫 낱말만 바꾼다', () => {
    const forms = wordForms('take part in');
    expect(forms).toContain('take part in');
    // 문장에는 'took part in'으로 나오므로 이것도 잡아야 한다.
    expect(forms).toContain('took part in');
    // 뒷부분은 그대로 둔다.
    expect(forms.every((f) => f.endsWith(' part in'))).toBe(true);
  });

  it('불규칙 동사의 과거형을 찾아낸다', () => {
    expect(wordForms('bring')).toContain('brought');
    expect(wordForms('catch')).toContain('caught');
    expect(wordForms('leave')).toContain('left');
  });
});

describe('meaningLine', () => {
  it('다의어는 뜻을 모두 이어 붙인다', () => {
    const multi = ALL_ENTRIES.find((e) => e.senses.length >= 2)!;
    expect(meaningLine(multi)).toContain(' ; ');
  });
});

describe('반대말 표(antonyms.ts)', () => {
  const words = new Set(ALL_ENTRIES.map((e) => e.word.toLowerCase()));

  it('표제어가 모두 우리 어휘 안에 있다', () => {
    const strays = Object.keys(ANTONYMS).filter((w) => !words.has(w));
    expect(strays).toEqual([]);
  });

  it('반대말도 모두 우리 어휘 안에 있다', () => {
    // 아이가 배우지 않을 단어를 정답으로 내면 찍는 문제가 되어 버린다.
    const strays = new Set<string>();
    for (const list of Object.values(ANTONYMS)) {
      for (const a of list) if (!words.has(a.toLowerCase())) strays.add(a);
    }
    expect([...strays]).toEqual([]);
  });

  it('자기 자신을 반대말로 두지 않는다', () => {
    const bad = Object.entries(ANTONYMS).filter(([w, list]) =>
      list.some((a) => a.toLowerCase() === w),
    );
    expect(bad.map(([w]) => w)).toEqual([]);
  });

  it('짝이 양방향으로 들어 있다', () => {
    // increase의 반대가 decrease면 decrease의 반대에도 increase가 있어야
    // 어느 쪽을 배우든 문제가 나온다.
    const missing: string[] = [];
    for (const [w, list] of Object.entries(ANTONYMS)) {
      for (const a of list) {
        if (!antonymsOf(a).includes(w)) missing.push(`${w} → ${a}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('동의어와 반대말이 겹치지 않는다', () => {
    // 같은 표현이 '바꿔 쓸 수 있는 말'이자 '반대말'이면 둘 다 틀린 문제가 된다.
    const clashes: string[] = [];
    for (const e of ALL_ENTRIES) {
      const ants = new Set(antonymsOf(e.word).map((a) => a.toLowerCase()));
      if (ants.size === 0) continue;
      for (const sense of e.senses) {
        for (const syn of sense.synonyms) {
          if (ants.has(syn.toLowerCase())) clashes.push(`${e.word}: ${syn}`);
        }
      }
    }
    expect(clashes).toEqual([]);
  });

  it('반대말 문제를 낼 수 있는 단어가 충분히 있다', () => {
    const covered = ALL_ENTRIES.filter((e) => hasAntonym(e.word));
    expect(covered.length).toBeGreaterThanOrEqual(400);
  });
});
