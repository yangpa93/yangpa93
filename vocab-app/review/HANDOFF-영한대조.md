# 다음 할 일 — 영한 사전으로 '뜻' 대조

이 문서는 새 세션에 넘기는 인수인계다. 지금까지 무엇을 했고, 무엇이
남았고, 무엇을 건드리면 안 되는지 적어 둔다.

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
