/**
 * 고전 어휘를 원문에서 찾아 예문과 출처를 붙인다.
 *
 *     node scripts/korean/match-classics.mjs
 *
 * korean/classics.json 에 받아 둔 원문을 뒤져, 그 어휘가 실제로 쓰인 행을
 * 찾는다. 찾으면 **원문 그대로** 예문에 넣고 출처를 단다. 못 찾으면
 * 손대지 않는다 — 어느 작품에 나온다고 어림잡아 적으면 그것이 곧 지어낸
 * 출처다.
 *
 * 옛말은 표기가 흔들린다. '괴다'는 '괴시던 · 괴여 · 괴오시니'로, 'ᄒᆞ다'는
 * 'ᄒᆞ고 · ᄒᆞ니'로 나온다. 그래서 어간으로 찾는다. 다만 어간이 한 글자면
 * 아무 데나 걸리므로 두 글자 아래로는 줄이지 않는다.
 */

import { readFileSync, writeFileSync } from 'node:fs';

const CLASSICS = 'korean/classics.json';
const SRC = 'korean/source.json';
const OUT = 'korean/classic-examples.json';

/** 한 어휘에 붙일 원문 최대 개수. */
const MAX_PER_WORD = 4;

/**
 * 기계가 찾았지만 뜻이 어긋나 손으로 걸러낸 것들.
 *
 * 옛말은 형태가 겹친다. '기다(지다·떨어지다)'의 어간이 '기다리다'에 그대로
 * 들어 있고, '오라다(오래되다)'는 '오다'의 명령형 '오라'와 같은 글자다.
 * 어절 첫머리 검사로도 이런 것은 못 걸러진다 — 사람이 뜻을 봐야 안다.
 *
 * 찾은 인용을 한 줄씩 읽고 어긋난 것만 여기 적었다. 낱말과 그 줄의 앞부분을
 * 함께 적어, 나중에 원문이 바뀌어도 엉뚱한 것이 걸리지 않게 한다.
 */
const REJECTS = [
  // '기다'로 걸린 것은 모두 '기다리다'였다. 이 낱말은 통째로 뺀다.
  { word: '디다 / 기다', starts: '', why: "'기다'가 '기다리다'에만 걸린다" },
  { word: '어이 / 어찌', starts: '날더러 어찌', why: '가시리 원문이 아니라 현대어 풀이 줄이다' },
  { word: '오래다 / 오라다', starts: '無心', why: "'오라 ᄒᆞ며'는 오다의 명령형이다" },
];

function rejected(word, line) {
  return REJECTS.some((r) => r.word === word && line.startsWith(r.starts));
}

/**
 * 원문에서 찾아볼 형태들.
 *
 * 표제어가 '혜다 / 혜이다' 처럼 슬래시로 여럿 적힌 것이 있어 갈라서 본다.
 */
export function searchForms(word) {
  const forms = new Set();

  for (const raw of word.split('/').map((w) => w.trim()).filter(Boolean)) {
    forms.add(raw);
    // 용언은 '-다'를 떼어 어간으로 찾는다. '어엿쁘다' → '어엿쁘'
    if (raw.length >= 3 && raw.endsWith('다')) forms.add(raw.slice(0, -1));
  }

  // 한 글자짜리는 아무 데나 걸린다. 뺀다.
  return [...forms].filter((f) => f.length >= 2).sort((a, b) => b.length - a.length);
}

/**
 * 원문 한 행이 예문으로 쓸 만한지.
 *
 * 후렴('얄리얄리 얄랑셩')과 한 낱말짜리 행은 뜻을 보여주지 못한다.
 */
function usable(line) {
  if (line.length < 6 || line.length > 80) return false;

  /*
   * 띄어쓰기가 없는 줄은 쓸 수 없다.
   *
   * 송강가사(관동별곡·사미인곡)는 목판본 그대로라 원문에 띄어쓰기가 아예
   * 없다. '江강湖호에病병이깁퍼竹듁林님의누엇더니…' 가 한 줄이다. 이런
   * 줄을 예문으로 내면 아이가 어디서 끊어 읽어야 할지 알 수 없다.
   * 어절이 다섯 개는 돼야 문장으로 읽힌다.
   *
   * 말뭉치를 19편에서 29편으로 늘려 본 뒤에 안 것: 이건 송강가사만의 일이
   * 아니다. 윤선도(어부사시사·산중신곡)도 마찬가지라 '구룸빗치조타ᄒᆞ나
   * 검기ᄅᆞᆯᄌᆞ로ᄒᆞᆫ다' 처럼 통째로 붙어 있다. 그래서 작품을 더 받아도
   * 인용이 그만큼 늘지는 않는다. 늘리려면 띄어 읽은 판본을 구해야 한다.
   */
  const words = line.split(/\s+/);
  if (words.length < 3) return false;
  // 한 어절이 지나치게 길면 붙어 있는 것이다.
  if (words.some((w) => w.length > 20)) return false;

  // 서지 정보·해설·각주 줄
  if (/^(저자|이 판|자매|출처|원문|해설|↑|\d)/.test(line)) return false;
  if (/저자:|위키|프로젝트|서지 정보|자료가 있습니다/.test(line)) return false;
  return true;
}

/**
 * 그 형태가 이 줄에 **낱말로서** 들어 있는지.
 *
 * 그냥 includes 로 보면 '니다'가 '있습니다'에 걸리고 '기다'가 '기다리니'에
 * 걸린다. 해설 문장에 잘못 들린 것을 원문 인용이라고 내보내는 셈이다.
 * 어절 첫머리에 오는 것만 인정한다 — 옛말은 어간이 앞에 오고 어미가 뒤에
 * 붙으므로 이것으로 충분하다.
 */
function hasWord(line, form) {
  for (const w of line.split(/\s+/)) {
    // 여는 괄호·따옴표는 떼고 본다.
    const bare = w.replace(/^[「『"'(\[《〈]+/, '');
    if (bare.startsWith(form)) return true;
  }
  return false;
}

function main() {
  const classics = JSON.parse(readFileSync(CLASSICS, 'utf8'));
  const words = JSON.parse(readFileSync(SRC, 'utf8')).classic;

  // 표제어가 두 번 나오는 것이 있다(가람·갓·고니·미쁘다·벼리). 한 번만 본다.
  const seen = new Set();
  const uniq = words.filter((r) => (seen.has(r.word) ? false : (seen.add(r.word), true)));

  const out = {};
  let hit = 0;

  for (const rec of uniq) {
    const forms = searchForms(rec.word);
    const found = [];

    for (const [source, work] of Object.entries(classics)) {
      for (const line of work.lines) {
        if (!usable(line)) continue;
        if (!forms.some((f) => hasWord(line, f))) continue;
        if (rejected(rec.word, line)) continue;
        found.push({ t: line, s: source });
        if (found.length >= MAX_PER_WORD) break;
      }
      if (found.length >= MAX_PER_WORD) break;
    }

    if (found.length) {
      out[rec.word] = found;
      hit++;
    }
  }

  writeFileSync(OUT, JSON.stringify(out, null, 1) + '\n', 'utf8');

  console.log(`  고전 어휘 ${uniq.length}개`);
  console.log(`    원문에서 찾음   ${hit}개 (인용 ${Object.values(out).flat().length}개)`);
  console.log(`    못 찾음         ${uniq.length - hit}개 — 손대지 않는다`);
  console.log(`  → ${OUT}`);

  const byWork = {};
  for (const list of Object.values(out)) for (const e of list) byWork[e.s] = (byWork[e.s] || 0) + 1;
  console.log();
  console.log('  작품별 인용 수');
  for (const [k, v] of Object.entries(byWork).sort((a, b) => b[1] - a[1])) {
    console.log(`    ${k.padEnd(20)} ${v}`);
  }
}

main();
