/**
 * 고등학교 2학년 레벨 2 — 수록 38 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H2_2 = defineLevel('h2-2', [
  { w: 'cognitive', p: 'adj.', s: [
    { m: '인지의, 인식의', syn: ['mental', 'intellectual'], ex: [
      ['Sleep affects cognitive ability.', '잠은 인지 능력에 영향을 미친다.'],
      ['Reading supports cognitive development.', '독서는 인지 발달을 돕는다.'],
      ['Aging brings cognitive changes.', '노화는 인지적 변화를 가져온다.'],
    ]},
  ]},
  { w: 'coherent', p: 'adj.', s: [
    { m: '일관된, 논리적인', syn: ['logical', 'consistent'], ex: [
      ['Write a coherent paragraph.', '일관된 문단을 써라.'],
      ['His argument was not coherent.', '그의 주장은 논리적이지 않았다.'],
      ['We need a coherent policy.', '우리는 일관된 정책이 필요하다.'],
    ]},
  ]},
  { w: 'coincide', p: 'v.', s: [
    { m: '동시에 일어나다, 일치하다', syn: ['happen together', 'match'], ex: [
      ['The two events coincided exactly.', '두 사건이 정확히 겹쳤다.'],
      ['Our views coincide on this issue.', '이 문제에 대한 우리 견해는 일치한다.'],
      ['The festival coincides with the holiday.', '그 축제는 휴일과 겹친다.'],
    ]},
  ]},
  { w: 'collapse', p: 'v., n.', s: [
    { m: '붕괴하다, 무너지다', syn: ['fall down', 'break down'], ex: [
      ['The old bridge collapsed.', '그 낡은 다리가 무너졌다.'],
      ['The company collapsed last year.', '그 회사는 작년에 무너졌다.'],
      ['The roof collapsed under the snow.', '지붕이 눈의 무게로 무너졌다.'],
    ]},
  ]},
  { w: 'commit', p: 'v.', s: [
    { m: '(죄를) 저지르다', syn: ['carry out'], ex: [
      ['He was accused of committing a crime.', '그는 범죄를 저질렀다는 혐의를 받았다.'],
      ['She committed a serious error.', '그녀는 심각한 잘못을 저질렀다.'],
    ]},
    { m: '전념하다, 헌신하다', syn: ['devote', 'dedicate'], ex: [
      ['She committed herself to the project.', '그녀는 그 프로젝트에 전념했다.'],
      ['He is committed to helping others.', '그는 남을 돕는 데 헌신하고 있다.'],
    ]},
  ]},
  { w: 'compelling', p: 'adj.', s: [
    { m: '설득력 있는, 강력한', syn: ['convincing', 'persuasive'], ex: [
      ['She made a compelling argument.', '그녀는 설득력 있는 주장을 폈다.'],
      ['There is compelling evidence for this.', '이에 대한 강력한 증거가 있다.'],
      ['The story was compelling from page one.', '그 이야기는 첫 쪽부터 흡인력이 있었다.'],
    ]},
  ]},
  { w: 'compensate', p: 'v.', s: [
    { m: '보상하다, 벌충하다', syn: ['make up for', 'repay'], ex: [
      ['The company compensated the victims.', '그 회사는 피해자들에게 보상했다.'],
      ['Extra practice compensated for his late start.', '추가 연습이 그의 늦은 출발을 벌충했다.'],
      ['Nothing can compensate for lost time.', '어떤 것도 잃어버린 시간을 보상할 수 없다.'],
    ]},
  ]},
  { w: 'competent', p: 'adj.', s: [
    { m: '유능한, 능력 있는', syn: ['capable', 'skilled'], ex: [
      ['He is a competent teacher.', '그는 유능한 교사이다.'],
      ['She is competent in three languages.', '그녀는 세 개 언어에 능숙하다.'],
      ['We need competent staff.', '우리는 유능한 직원이 필요하다.'],
    ]},
  ]},
  { w: 'compile', p: 'v.', s: [
    { m: '편집하다, 모아 정리하다', syn: ['gather', 'assemble'], ex: [
      ['They compiled a list of sources.', '그들은 출처 목록을 정리했다.'],
      ['She compiled the data over two years.', '그녀는 2년에 걸쳐 자료를 모았다.'],
      ['The team compiled a detailed report.', '그 팀은 상세한 보고서를 작성했다.'],
    ]},
  ]},
  { w: 'comply', p: 'v.', s: [
    { m: '따르다, 준수하다', syn: ['obey', 'follow'], ex: [
      ['All drivers must comply with the law.', '모든 운전자는 법을 준수해야 한다.'],
      ['The factory failed to comply with safety rules.', '그 공장은 안전 규정을 지키지 않았다.'],
      ['She complied with our request.', '그녀는 우리 요청에 응했다.'],
    ]},
  ]},
  { w: 'component', p: 'n.', s: [
    { m: '구성 요소, 부품', syn: ['part', 'element'], ex: [
      ['Each component must be tested.', '각 부품은 검사되어야 한다.'],
      ['Trust is a key component of teamwork.', '신뢰는 협동의 핵심 요소이다.'],
      ['The engine has many small components.', '그 엔진은 작은 부품이 많다.'],
    ]},
  ]},
  { w: 'comprehend', p: 'v.', s: [
    { m: '이해하다, 파악하다', syn: ['understand', 'grasp'], ex: [
      ['He could not comprehend the question.', '그는 그 질문을 이해하지 못했다.'],
      ['It is hard to comprehend such numbers.', '그런 숫자를 파악하기는 어렵다.'],
      ['Children comprehend stories before words.', '아이들은 단어보다 이야기를 먼저 이해한다.'],
    ]},
  ]},
  { w: 'comprehensive', p: 'adj.', s: [
    { m: '포괄적인, 종합적인', syn: ['thorough', 'complete'], ex: [
      ['We need a comprehensive plan.', '우리는 포괄적인 계획이 필요하다.'],
      ['The report is comprehensive and clear.', '그 보고서는 포괄적이고 명확하다.'],
      ['She did a comprehensive review.', '그녀는 종합적인 검토를 했다.'],
    ]},
  ]},
  { w: 'conceal', p: 'v.', s: [
    { m: '숨기다, 감추다', syn: ['hide', 'cover up'], ex: [
      ['She could not conceal her joy.', '그녀는 기쁨을 감추지 못했다.'],
      ['The report concealed important facts.', '그 보고서는 중요한 사실을 숨겼다.'],
      ['He concealed the letter in a drawer.', '그는 편지를 서랍에 숨겼다.'],
    ]},
  ]},
  { w: 'conceive', p: 'v.', s: [
    { m: '생각해 내다, 상상하다', syn: ['imagine', 'think up'], ex: [
      ['He conceived the idea while walking.', '그는 걷다가 그 아이디어를 떠올렸다.'],
      ['I cannot conceive of such cruelty.', '나는 그런 잔인함을 상상할 수 없다.'],
      ['The project was conceived in 2010.', '그 프로젝트는 2010년에 구상되었다.'],
    ]},
  ]},
  { w: 'conclude', p: 'v.', s: [
    { m: '결론짓다', syn: ['decide', 'infer'], ex: [
      ['The study concluded that sleep matters.', '그 연구는 잠이 중요하다고 결론지었다.'],
      ['What can we conclude from this graph?', '이 그래프에서 무엇을 결론지을 수 있니?'],
    ]},
    { m: '끝내다, 마치다', syn: ['end', 'finish'], ex: [
      ['He concluded his speech with a joke.', '그는 농담으로 연설을 마쳤다.'],
      ['The meeting concluded at noon.', '회의는 정오에 끝났다.'],
    ]},
  ]},
  { w: 'confine', p: 'v.', s: [
    { m: '국한하다, 가두다', syn: ['limit', 'restrict'], ex: [
      ['Please confine your answer to one page.', '답을 한 쪽으로 제한해 주세요.'],
      ['The illness confined him to bed.', '그 병은 그를 침대에 가두었다.'],
      ['The problem is not confined to our city.', '그 문제는 우리 도시에만 국한되지 않는다.'],
    ]},
  ]},
  { w: 'conform', p: 'v.', s: [
    { m: '따르다, 순응하다', syn: ['fit in', 'go along with'], ex: [
      ['Teens often conform to their group.', '십 대는 종종 또래 집단에 순응한다.'],
      ['The product conforms to safety standards.', '그 제품은 안전 기준에 부합한다.'],
      ['He refused to conform to tradition.', '그는 전통에 따르기를 거부했다.'],
    ]},
  ]},
  { w: 'confront', p: 'v.', s: [
    { m: '직면하다, 맞서다', syn: ['face', 'stand up to'], ex: [
      ['We must confront the truth.', '우리는 진실에 맞서야 한다.'],
      ['She confronted him about the lie.', '그녀는 그 거짓말에 대해 그와 맞섰다.'],
      ['The country confronts an aging population.', '그 나라는 고령화에 직면해 있다.'],
    ]},
  ]},
  { w: 'consensus', p: 'n.', s: [
    { m: '합의, 의견 일치', syn: ['agreement', 'accord'], ex: [
      ['The group reached a consensus.', '그 모임은 합의에 이르렀다.'],
      ['There is no scientific consensus yet.', '아직 과학적 합의는 없다.'],
      ['We built consensus through discussion.', '우리는 토론을 통해 합의를 이뤘다.'],
    ]},
  ]},
  { w: 'consistent', p: 'adj.', s: [
    { m: '일관된, 한결같은', syn: ['steady', 'uniform'], ex: [
      ['Her grades have been consistent.', '그녀의 성적은 한결같았다.'],
      ['Be consistent in your practice.', '연습을 꾸준히 해라.'],
    ]},
    { m: '일치하는', syn: ['in agreement with'], ex: [
      ['His story is consistent with the facts.', '그의 이야기는 사실과 일치한다.'],
      ['The results are consistent with the theory.', '그 결과는 이론과 일치한다.'],
    ]},
  ]},
  { w: 'constrain', p: 'v.', s: [
    { m: '제약하다, 억제하다', syn: ['limit', 'restrict'], ex: [
      ['Budget constrains our choices.', '예산이 우리 선택을 제약한다.'],
      ['She felt constrained by the rules.', '그녀는 규칙에 얽매인다고 느꼈다.'],
      ['Time constraints forced us to hurry.', '시간 제약이 우리를 서두르게 했다.'],
    ]},
  ]},
  { w: 'contemplate', p: 'v.', s: [
    { m: '숙고하다, 고려하다', syn: ['consider', 'ponder'], ex: [
      ['He contemplated changing careers.', '그는 직업을 바꿀까 숙고했다.'],
      ['She sat quietly and contemplated.', '그녀는 조용히 앉아 사색했다.'],
      ['We must contemplate the consequences.', '우리는 그 결과를 숙고해야 한다.'],
    ]},
  ]},
  { w: 'contradict', p: 'v.', s: [
    { m: '모순되다, 반박하다', syn: ['oppose', 'go against'], ex: [
      ['The two reports contradict each other.', '두 보고서는 서로 모순된다.'],
      ['His actions contradict his words.', '그의 행동은 말과 모순된다.'],
      ['She politely contradicted the speaker.', '그녀는 정중히 발표자에게 반박했다.'],
    ]},
  ]},
  { w: 'contrast', p: 'n., v.', s: [
    { m: '대조, 차이; 대조하다', syn: ['difference', 'compare'], ex: [
      ['There is a sharp contrast between them.', '그 둘 사이에는 뚜렷한 대조가 있다.'],
      ['In contrast, the second plan is cheaper.', '반면에 두 번째 계획은 더 싸다.'],
      ['Contrast the two characters in the story.', '이야기 속 두 인물을 대조해 보아라.'],
    ]},
  ]},
  { w: 'conventional', p: 'adj.', s: [
    { m: '전통적인, 관습적인', syn: ['traditional', 'standard'], ex: [
      ['He prefers conventional methods.', '그는 전통적인 방법을 선호한다.'],
      ['Conventional wisdom is not always right.', '통념이 늘 옳은 것은 아니다.'],
      ['The design breaks conventional rules.', '그 디자인은 관습적 규칙을 깬다.'],
    ]},
  ]},
  { w: 'convey', p: 'v.', s: [
    { m: '전달하다, 표현하다', syn: ['express', 'communicate'], ex: [
      ['Words cannot convey my thanks.', '말로는 내 감사를 전할 수 없다.'],
      ['The painting conveys deep sadness.', '그 그림은 깊은 슬픔을 전한다.'],
      ['Please convey my regards to her.', '그녀에게 내 안부를 전해 주세요.'],
    ]},
  ]},
  { w: 'correlate', p: 'v.', s: [
    { m: '상관관계가 있다', syn: ['be related', 'link'], ex: [
      ['Income correlates with education.', '소득은 교육 수준과 상관관계가 있다.'],
      ['These two factors do not correlate.', '이 두 요인은 상관관계가 없다.'],
      ['Sleep correlates strongly with mood.', '수면은 기분과 강한 상관관계가 있다.'],
    ]},
  ]},
  { w: 'correspond', p: 'v.', s: [
    { m: '일치하다, 상응하다', syn: ['match', 'agree'], ex: [
      ['The results correspond to our prediction.', '그 결과는 우리 예측과 일치한다.'],
      ['Each number corresponds to a color.', '각 숫자는 하나의 색에 대응한다.'],
      ['His actions do not correspond with his words.', '그의 행동은 말과 맞지 않는다.'],
    ]},
  ]},
  { w: 'counterpart', p: 'n.', s: [
    { m: '상대방, 대응물', syn: ['equivalent', 'match'], ex: [
      ['She met her Japanese counterpart.', '그녀는 일본 측 상대방을 만났다.'],
      ['Rural schools differ from their urban counterparts.', '시골 학교는 도시의 그것과 다르다.'],
      ['This word has no counterpart in Korean.', '이 단어는 한국어에 대응어가 없다.'],
    ]},
  ]},
  { w: 'criteria', p: 'n.', s: [
    { m: '기준 (criterion의 복수)', syn: ['standards', 'measures'], ex: [
      ['What are the criteria for selection?', '선발 기준은 무엇입니까?'],
      ['The essay meets all the criteria.', '그 글은 모든 기준을 충족한다.'],
      ['They set strict criteria for the award.', '그들은 그 상에 엄격한 기준을 세웠다.'],
    ]},
  ]},
  { w: 'crucial', p: 'adj.', s: [
    { m: '결정적인, 매우 중요한', syn: ['critical', 'vital'], ex: [
      ['Timing is crucial in this game.', '이 경기에서는 타이밍이 결정적이다.'],
      ['Water is crucial for survival.', '물은 생존에 매우 중요하다.'],
      ['This is a crucial moment for the team.', '지금은 그 팀에게 결정적인 순간이다.'],
    ]},
  ]},
  { w: 'cultivate', p: 'v.', s: [
    { m: '재배하다, 경작하다', syn: ['grow', 'farm'], ex: [
      ['Farmers cultivate rice here.', '농부들이 이곳에서 쌀을 재배한다.'],
      ['This land is hard to cultivate.', '이 땅은 경작하기 어렵다.'],
    ]},
    { m: '기르다, 함양하다', syn: ['develop', 'foster'], ex: [
      ['Cultivate the habit of reading.', '독서 습관을 길러라.'],
      ['She cultivated friendships carefully.', '그녀는 우정을 정성껏 가꾸었다.'],
    ]},
  ]},
  { w: 'deceive', p: 'v.', s: [
    { m: '속이다', syn: ['trick', 'mislead'], ex: [
      ['He deceived his own family.', '그는 자기 가족을 속였다.'],
      ['Appearances can deceive you.', '겉모습은 너를 속일 수 있다.'],
      ['Do not deceive yourself.', '자신을 속이지 마라.'],
    ]},
  ]},
  { w: 'decline', p: 'v., n.', s: [
    { m: '감소하다, 쇠퇴하다', syn: ['decrease', 'drop'], ex: [
      ['Sales declined last year.', '작년에 매출이 감소했다.'],
      ['The bird population is declining.', '그 새의 개체 수가 줄고 있다.'],
    ]},
    { m: '거절하다', syn: ['refuse', 'turn down'], ex: [
      ['She politely declined the offer.', '그녀는 정중히 제안을 거절했다.'],
      ['He declined to comment.', '그는 논평을 거절했다.'],
    ]},
  ]},
  { w: 'decrease', p: 'v., n.', s: [
    { m: '감소하다, 줄다', syn: ['fall', 'go down'], ex: [
      ['The population decreased slowly.', '인구가 서서히 감소했다.'],
      ['Sales decreased by ten percent.', '매출이 10퍼센트 감소했다.'],
      ['There was a decrease in accidents.', '사고가 줄어들었다.'],
    ]},
  ]},
  { w: 'deliberate', p: 'adj.', s: [
    { m: '고의적인, 의도적인', syn: ['intentional', 'planned'], ex: [
      ['It was a deliberate act.', '그것은 고의적인 행동이었다.'],
      ['The mistake was not deliberate.', '그 실수는 고의가 아니었다.'],
    ]},
    { m: '신중한', syn: ['careful', 'cautious'], ex: [
      ['She spoke in a slow, deliberate voice.', '그녀는 느리고 신중한 목소리로 말했다.'],
      ['He made a deliberate choice.', '그는 신중한 선택을 했다.'],
    ]},
  ]},
  { w: 'depict', p: 'v.', s: [
    { m: '묘사하다, 그리다', syn: ['portray', 'describe'], ex: [
      ['The novel depicts rural life.', '그 소설은 농촌 생활을 그린다.'],
      ['The painting depicts a winter scene.', '그 그림은 겨울 풍경을 묘사한다.'],
      ['Media often depict teens unfairly.', '언론은 종종 십 대를 부당하게 묘사한다.'],
    ]},
  ]},
], 'csat');
