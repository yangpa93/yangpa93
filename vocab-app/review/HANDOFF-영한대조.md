# 다음 할 일

이 문서는 새 세션에 넘기는 인수인계다. 지금까지 무엇을 했고, 무엇이
남았고, 무엇을 건드리면 안 되는지 적어 둔다.

할 일은 두 가지다.

- **A. 영한 사전으로 '뜻' 대조** — 데이터를 고치는 일. 오래 걸린다.
- **B. 품사·유의어 표시 고치기** — 화면만 고치는 일. 작다.

B 부터 하고 A 로 넘어가면 된다. B 는 데이터를 건드리지 않아서 A 와 부딪히지
않고, 먼저 끝내 두면 A 를 하는 동안 아이들이 바로 쓴다.

---

# A. 영한 사전으로 '뜻' 대조

## 목표

**한국어 뜻(`m`)이 그 단어의 뜻이 맞는지**를 영한 사전으로 대조한다.
3,286개 표제어 · 3,463개 뜻이 대상이다.

지금까지 기계로 검증한 것은 **철자 · 문장 형식 · 품사 · 유의어 · 반대말**이고,
**한국어 뜻만 검증하지 못했다.** 영영 사전(WordNet)에는 한국어가 없고,
위키낱말사전의 한국어 워드넷은 우리 어휘의 20%만 덮는 데다 우리가 가르치는
뜻과 다른 뜻이 붙는 경우가 많아(plane→대패, pot→화분) 쓰지 않았다.

## 맨 먼저 — 네트워크가 열렸는지 확인

새 환경에서 아래가 전부 200이어야 한다. 하나라도 000/403이면 **그 자리에서
멈추고 사람에게 알린다.** 우회하지 않는다.

```bash
for u in \
  https://api.dictionaryapi.dev/api/v2/entries/en/solid \
  https://en.wiktionary.org/w/api.php?action=query\&titles=solid\&format=json \
  https://kaikki.org/dictionary/English/meaning/s/so/solid.json ; do
  printf '%-70s ' "$u"; curl -s -o /dev/null -w '%{http_code}\n' --max-time 15 "$u"
done
```

막혀 있으면 `curl -sS "$HTTPS_PROXY/__agentproxy/status"` 의
`recentRelayFailures` 에 이유가 남는다.

## 어떻게 대조할 것인가

한 낱말씩 API를 두드리면 3,286번이라 오래 걸리고 실패도 잦다. **덤프를 한 번
받아 오프라인으로 도는 쪽**을 먼저 시도한다.

1. **kaikki.org** — 위키낱말사전을 파싱해 둔 JSONL. 영어 표제어마다
   품사·뜻풀이·번역(한국어 포함)이 들어 있다. 통째로 받아 우리 어휘
   3,286개만 걸러 쓰면 재현 가능한 검사가 된다.
2. 안 되면 **en.wiktionary API** 로 표제어별 조회 (배치 + 캐시 필수).
3. **api.dictionaryapi.dev** 는 영영 뜻풀이·품사만 준다. 한국어가 없으니
   보조로만.

받은 것은 저장소에 넣지 말고(용량·라이선스) 스크래치패드에 두고,
받는 명령을 스크립트 맨 위 주석에 적는다 — `audit.mjs`, `verify-relations.mjs`
가 그렇게 되어 있다.

### 스크립트는 이렇게

`scripts/verify-meaning.mjs` 를 새로 만든다. 기존 두 스크립트와 같은 모양으로.

- 레벨 파일을 **import 하지 말고 글자로 읽는다**(순수 node 로 돌아야 한다).
  정규식은 `scripts/audit.mjs` 의 것을 그대로 쓴다.
- 출력은 세 갈래로 나눈다.
  - `❌` 확실한 오류 — 사전의 어느 뜻과도 겹치지 않음
  - `?` 확인 필요 — 자료가 애매하거나 부분만 겹침
  - 자료 없음 — 조용히 센다
- **자동으로 고치지 않는다.** 판단은 사람이 한다.
- `LIMIT=2000` 처럼 출력 개수를 환경변수로 조절할 수 있게 한다.
- `package.json` 에 `"verify:meaning"` 으로 건다.

한국어 비교는 표기 흔들림을 견뎌야 한다. `단단하다`/`단단한`, `구하다`/`구함`
처럼 어미가 다르고, 우리 뜻은 `'단단한, 확실한'` 처럼 쉼표로 여럿을 적는다.
쉼표로 쪼개고 괄호 주석을 떼고 `하다/한/함/의/이다` 어미를 벗긴 뒤 견준다.

## 고칠 때 지켜야 할 것

- **표제어(`w`)의 철자를 바꾸면 그 단어의 학습 기록이 끊긴다.** id 가
  표제어에서 나오기 때문이다. 철자를 고쳐야 하면 **먼저 사람에게 말하고**
  동의를 받는다.
- 수정은 스크래치패드에 `.mjs` 스크립트를 써서 넣는다. 바꿀 문자열이 파일에
  정확히 한 번 나오는지 확인하고, 아니면 멈춘다. (앞선 세션들이 그렇게 했다)
- 한 레벨씩 끝내고 커밋·푸시하고 사람에게 표로 보고한다.
  표는 `단어 / 고치기 전 / 고친 뒤 / 이유` 네 칸.
- 고칠 게 없는 레벨도 "몇 개를 봤고 문제가 없었다"고 보고한다.
- 코드 주석·커밋 메시지·대화는 한국어로.

## 매번 통과시켜야 하는 검사

```bash
npx tsc --noEmit
npx jest                        # 218개
npm run audit words_alpha.txt   # 철자·문장·해석·뜻·동의어 전부 0건이어야 한다
```

`words_alpha.txt` 는 저장소에 있다. WordNet 재대조가 필요하면:

```bash
curl -sLO https://raw.githubusercontent.com/nltk/nltk_data/gh-pages/packages/corpora/wordnet.zip
unzip -q wordnet.zip && npm run verify wordnet
```

## 지금까지 한 일 (다시 하지 말 것)

### 1차 — 전 레벨 육안 검토 (24개 레벨, 1,483건)

뜻풀이를 유의어 칸에 넣은 것, 상하위 개념, 문법이 깨지는 유의어(he=him,
would=will), 뜻에 없는 쓰임을 보여 주던 예문, 영국식 표기, 한국어 오타 등.
반대말이 대표 뜻과 어긋나던 것들은 뜻을 둘로 나눠 고쳤다(hard, last, right,
old, pass, present, cool, rough, solid).

### 2차 — WordNet 대조

- 유의어: 지적 64건 중 41건 제거
- 품사: 조동사 9개를 `v.` → `aux.`, either 를 `adj., adv.` 로
- 반대말: 줄 30개 삭제 + 39개 수정 (fall→spring, defeat→victory 등)

### 일부러 남긴 것 — 다시 지적하지 말 것

WordNet 이 "상위·하위 개념"이라 하지만 학교에서 그대로 짝지어 가르치는 말이라
남겼다. 사람이 "이것도 빼라"고 하기 전에는 건드리지 않는다.

```
chaos=disorder      highlight=emphasize   incentive=motivation
inhibit=hold back   motive=reason         perceive=notice
posit=assume        regulate=control      suppress=hold back
therapy=treatment   trigger=cause         dialog(ue)=conversation
road=street         street=road           attention=focus
bother=disturb      disturb=bother        consider=think about
emphasize=highlight fee=charge            increase=go up
master=expert
```

반대말 `learn ↔ teach`, `play ↔ work` 도 WordNet 은 유의어로 보지만
한국 교과서의 표준 짝이라 남겼다.

## 데이터 구조 요약

```
src/data/levels/*.ts     24개 레벨. { w, p, s: [{ m, syn, ex: [[en, ko], …] }] }
src/data/antonyms.ts     반대말 표 448개. 짝은 양방향이어야 한다(테스트가 본다)
src/data/plan.ts         어떤 단어가 어느 레벨인지
```

문제 유형이 데이터를 어떻게 쓰는지 — 고칠 때 영향을 안다:

- 유의어 문제의 정답은 `sense.synonyms[0]` (`src/games/ChoiceGame.tsx`)
- 반대말 문제의 정답은 `antonymsOf(word)[0]` — **표에 적힌 순서 그대로 첫 번째**
- 반대말 문제는 **대표 뜻(첫 번째 뜻)에만** 나온다 (`src/srs/session.ts`)
  → 뜻이 여럿인 단어는 첫 번째 뜻과 반대말이 맞아야 한다
- `syn: []` 로 비우면 그 뜻에 유의어 문제가 안 나올 뿐 아무 문제 없다

## 사람이 직접 보는 파일

```bash
npm run export      # review/vocab.csv (엑셀용) · review/vocab.html (폰용)
```

단어를 고친 뒤에는 다시 만들어 준다.

---

# B. 품사·유의어 표시 고치기

**데이터(`src/data/levels/*.ts`)는 건드리지 않는다. 화면에 어떻게 보여줄지만
바꾼다.** 사람이 이렇게 물어서 나온 일이다 — "단어 설명시 품사도 알려 주는
건가요? 유의어 종류가 많지만 상황에 따라 다르게 사용되는 유의어도 많아서요."

## B-1. 품사를 한국어로 풀어서 보여준다

지금은 `n.` `v.` `aux.` 같은 약어가 회색 작은 글씨로 그대로 나온다. 중학생이
`phr.` `art.` `num.` `int.` `aux.` 를 바로 알아보지 못한다.

데이터의 `p` 값은 그대로 두고 **화면에서만** 한국어로 바꾼다. `p` 를 고치면
표제어 파일 3,286줄을 건드리게 되고, 나중에 사전 대조할 때 기준이 흔들린다.

`src/data/entry.ts` 같은 곳에 순수 함수를 하나 만들고 테스트를 붙인다.

```ts
/** 'v., adj.' → '동사 · 형용사' */
export function posLabel(pos: string): string
```

쓰이는 값은 아래가 전부다(2026-07 기준). 쉼표로 여럿이 오는 것도 있다.

```
n. 명사        v. 동사        adj. 형용사     adv. 부사
prep. 전치사   conj. 접속사   pron. 대명사    art. 관사
num. 수사      int. 감탄사    aux. 조동사     phr. 숙어
```

모르는 값이 들어오면 원래 문자열을 그대로 돌려준다(빈칸이 되면 안 된다).

고칠 자리 세 군데 — 전부 `{entry.pos}` 를 그대로 찍고 있다.

```
src/components/WordStoryCard.tsx   문제를 푼 직후 뜨는 단어 카드
app/wordbook.tsx                   단어장 목록
app/mistakes.tsx                   오답 노트
```

회색 작은 글씨(`Muted`)라 눈에 잘 안 들어온다. 칩(`Chip`)으로 바꿀지는
만들어 보고 사람에게 물어본다.

## B-2. 유의어의 '=' 를 바꾼다

지금은 이렇게 나온다.

```
단단한, 확실한
= firm
```

`=` 가 "이 둘은 같다"고 말한다. 실제로는 **그 뜻일 때만** 바꿔 쓸 수 있다.
아이는 문장을 떼고 `solid = firm` 으로 외운다.

구조는 이미 맞게 되어 있다 — 유의어는 표제어가 아니라 **뜻(sense)마다** 붙어
있고, 문제도 그 뜻의 예문과 함께 나온다(`색칠한 단어를 바꿔 쓸 수 있는 표현은?`).
그러니 **표시만** 고치면 된다.

`=` 대신 조건이 드러나는 말로 바꾼다. 예를 들어

```
이 뜻일 때 바꿔 쓸 수 있어요 :  firm
```

문구는 정해 놓지 않았다. 짧게 만들어 보고 사람에게 물어본다. 단어 카드는
자리가 넓고 단어장·오답 노트는 한 줄이라, 자리에 따라 길이를 달리해도 된다.

고칠 자리 네 군데.

```
src/components/WordStoryCard.tsx   '오늘 배우는 뜻' 칸의 '= ' 와
                                   아래 뜻 목록의 '= a, b'
app/wordbook.tsx                   '(= a, b)'
app/mistakes.tsx                   '= a, b'
```

## 하지 않기로 한 것

**유의어마다 조건을 다는 것**(예: `thin = slim (사람에게만)`)은 하지 않는다.
사람과 이렇게 정리했다 — 조건을 다느니 애매한 것은 빼는 쪽이 낫다. 실제로
1·2차 검토에서 그렇게 약 900건을 뺐다.

```
thin = slim         사람에겐 되지만 종이엔 안 된다
tough = hard        문제엔 되지만 질긴 고기엔 안 된다
appreciate = thank  thank 는 사람을, appreciate 는 일을 받는다
efficient = effective  효율적 ≠ 효과적
```

지금 뜻 3,463개 중 2,028개에 유의어가 있고 1,435개는 비어 있다. 애매한 것은
이미 비운 상태다.

## B 를 끝낼 때

`npx tsc --noEmit` · `npx jest` · `npx expo export --platform android` 를
통과시키고, 화면이 실제로 어떻게 바뀌었는지 사람에게 보여준다(문구를 정해야
하므로). 데이터를 안 건드렸으니 `npm run audit` 은 그대로 통과한다.
