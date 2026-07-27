/**
 * 고등학교 2학년 레벨 1 어휘 34개.
 *
 * 선정 기준: 고2 모의고사·수능 기출에서 반복되는 어휘와 독해 지문의 핵심 추상 어휘.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H2_1 = defineLevel('h2-1', [
  { w: 'accumulate', p: 'v.', s: [
    { m: '축적하다, 모으다', syn: ['build up', 'pile up'], ex: [
      ['Dust accumulated on the shelf.', '선반에 먼지가 쌓였다.'],
      ['He accumulated wealth over decades.', '그는 수십 년에 걸쳐 부를 축적했다.'],
      ['Evidence has accumulated against the theory.', '그 이론에 반하는 증거가 쌓였다.'],
    ]},
  ]},
  { w: 'adequate', p: 'adj.', s: [
    { m: '적절한, 충분한', syn: ['sufficient', 'enough'], ex: [
      ['The room has adequate light.', '그 방은 충분한 빛이 든다.'],
      ['His answer was adequate but not impressive.', '그의 대답은 무난했지만 인상적이지는 않았다.'],
      ['We lack adequate funding.', '우리는 충분한 자금이 부족하다.'],
    ]},
  ]},
  { w: 'advocate', p: 'v., n.', s: [
    { m: '옹호하다, 지지하다', syn: ['support', 'promote'], ex: [
      ['She advocates free education.', '그녀는 무상 교육을 옹호한다.'],
      ['Many scientists advocate stronger action.', '많은 과학자가 더 강한 조치를 지지한다.'],
      ['He is an advocate for animal rights.', '그는 동물권 옹호자이다.'],
    ]},
  ]},
  { w: 'alternative', p: 'n., adj.', s: [
    { m: '대안; 대체의', syn: ['option', 'substitute'], ex: [
      ['We had no alternative but to wait.', '우리는 기다리는 것 말고는 대안이 없었다.'],
      ['Solar power is an alternative energy source.', '태양광은 대체 에너지원이다.'],
      ['Is there an alternative route?', '다른 경로가 있나요?'],
    ]},
  ]},
  { w: 'ambiguous', p: 'adj.', s: [
    { m: '모호한, 애매한', syn: ['unclear', 'vague'], ex: [
      ['His answer was ambiguous.', '그의 대답은 모호했다.'],
      ['The wording of the rule is ambiguous.', '그 규칙의 표현은 애매하다.'],
      ['Avoid ambiguous sentences in your essay.', '글에서 모호한 문장을 피해라.'],
    ]},
  ]},
  { w: 'anticipate', p: 'v.', s: [
    { m: '예상하다, 기대하다', syn: ['expect', 'foresee'], ex: [
      ['We anticipate heavy traffic tonight.', '우리는 오늘 밤 극심한 교통 체증을 예상한다.'],
      ['She anticipated the question and prepared.', '그녀는 그 질문을 예상하고 준비했다.'],
      ['Nobody anticipated such a result.', '아무도 그런 결과를 예상하지 못했다.'],
    ]},
  ]},
  { w: 'apply', p: 'v.', s: [
    { m: '적용하다, 응용하다', syn: ['use', 'put into practice'], ex: [
      ['Apply this rule to every case.', '이 규칙을 모든 경우에 적용해라.'],
      ['The theory applies to real life too.', '그 이론은 실생활에도 적용된다.'],
    ]},
    { m: '지원하다, 신청하다', syn: ['request', 'put in for'], ex: [
      ['She applied for a scholarship.', '그녀는 장학금을 신청했다.'],
      ['He applied to three universities.', '그는 세 대학에 지원했다.'],
    ]},
  ]},
  { w: 'assess', p: 'v.', s: [
    { m: '평가하다, 판단하다', syn: ['evaluate', 'judge'], ex: [
      ['Teachers assess students in many ways.', '교사들은 여러 방법으로 학생을 평가한다.'],
      ['We need to assess the risk first.', '우리는 먼저 위험을 평가해야 한다.'],
      ['It is hard to assess the damage.', '피해를 가늠하기 어렵다.'],
    ]},
  ]},
  { w: 'assign', p: 'v.', s: [
    { m: '배정하다, (과제를) 내주다', syn: ['allocate', 'give out'], ex: [
      ['The teacher assigned three chapters.', '선생님이 세 단원을 과제로 내주셨다.'],
      ['Each student was assigned a partner.', '각 학생에게 짝이 배정되었다.'],
      ['They assigned him to the night shift.', '그들은 그를 야간 근무에 배정했다.'],
    ]},
  ]},
  { w: 'attain', p: 'v.', s: [
    { m: '달성하다, 이르다', syn: ['achieve', 'reach'], ex: [
      ['She attained her goal at last.', '그녀는 마침내 목표를 달성했다.'],
      ['Few runners attain that speed.', '그 속도에 이르는 주자는 드물다.'],
      ['He attained a high position young.', '그는 젊은 나이에 높은 지위에 올랐다.'],
    ]},
  ]},
  { w: 'attribute', p: 'v., n.', s: [
    { m: '~의 탓으로 돌리다', syn: ['credit to', 'ascribe'], ex: [
      ['She attributes her success to luck.', '그녀는 자신의 성공을 운 덕분이라고 말한다.'],
      ['The delay was attributed to bad weather.', '그 지연은 악천후 탓으로 여겨졌다.'],
    ]},
    { m: '속성, 자질', syn: ['quality', 'characteristic'], ex: [
      ['Patience is a valuable attribute.', '인내는 귀중한 자질이다.'],
      ['Each material has its own attributes.', '각 재료는 고유한 속성을 가진다.'],
    ]},
  ]},
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
  { w: 'comply', p: 'v.', s: [
    { m: '따르다, 준수하다', syn: ['obey', 'follow'], ex: [
      ['All drivers must comply with the law.', '모든 운전자는 법을 준수해야 한다.'],
      ['The factory failed to comply with safety rules.', '그 공장은 안전 규정을 지키지 않았다.'],
      ['She complied with our request.', '그녀는 우리 요청에 응했다.'],
    ]},
  ]},
  { w: 'comprehend', p: 'v.', s: [
    { m: '이해하다, 파악하다', syn: ['understand', 'grasp'], ex: [
      ['He could not comprehend the question.', '그는 그 질문을 이해하지 못했다.'],
      ['It is hard to comprehend such numbers.', '그런 숫자를 파악하기는 어렵다.'],
      ['Children comprehend stories before words.', '아이들은 단어보다 이야기를 먼저 이해한다.'],
    ]},
  ]},
  { w: 'conceal', p: 'v.', s: [
    { m: '숨기다, 감추다', syn: ['hide', 'cover up'], ex: [
      ['She could not conceal her joy.', '그녀는 기쁨을 감추지 못했다.'],
      ['The report concealed important facts.', '그 보고서는 중요한 사실을 숨겼다.'],
      ['He concealed the letter in a drawer.', '그는 편지를 서랍에 숨겼다.'],
    ]},
  ]},
  { w: 'conform', p: 'v.', s: [
    { m: '따르다, 순응하다', syn: ['fit in', 'go along with'], ex: [
      ['Teens often conform to their group.', '십 대는 종종 또래 집단에 순응한다.'],
      ['The product conforms to safety standards.', '그 제품은 안전 기준에 부합한다.'],
      ['He refused to conform to tradition.', '그는 전통에 따르기를 거부했다.'],
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
  { w: 'convey', p: 'v.', s: [
    { m: '전달하다, 표현하다', syn: ['express', 'communicate'], ex: [
      ['Words cannot convey my thanks.', '말로는 내 감사를 전할 수 없다.'],
      ['The painting conveys deep sadness.', '그 그림은 깊은 슬픔을 전한다.'],
      ['Please convey my regards to her.', '그녀에게 내 안부를 전해 주세요.'],
    ]},
  ]},
  { w: 'correspond', p: 'v.', s: [
    { m: '일치하다, 상응하다', syn: ['match', 'agree'], ex: [
      ['The results correspond to our prediction.', '그 결과는 우리 예측과 일치한다.'],
      ['Each number corresponds to a color.', '각 숫자는 하나의 색에 대응한다.'],
      ['His actions do not correspond with his words.', '그의 행동은 말과 맞지 않는다.'],
    ]},
  ]},
  { w: 'criteria', p: 'n.', s: [
    { m: '기준 (criterion의 복수)', syn: ['standards', 'measures'], ex: [
      ['What are the criteria for selection?', '선발 기준은 무엇입니까?'],
      ['The essay meets all the criteria.', '그 글은 모든 기준을 충족한다.'],
      ['They set strict criteria for the award.', '그들은 그 상에 엄격한 기준을 세웠다.'],
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
  { w: 'derive', p: 'v.', s: [
    { m: '얻다, 유래하다', syn: ['obtain', 'come from'], ex: [
      ['We derive energy from food.', '우리는 음식에서 에너지를 얻는다.'],
      ['The word derives from Latin.', '그 단어는 라틴어에서 유래한다.'],
      ['She derives pleasure from teaching.', '그녀는 가르치는 데서 기쁨을 얻는다.'],
    ]},
  ]},
  { w: 'distinguish', p: 'v.', s: [
    { m: '구별하다, 식별하다', syn: ['tell apart', 'differentiate'], ex: [
      ['Can you distinguish the two twins?', '그 쌍둥이를 구별할 수 있니?'],
      ['It is hard to distinguish fact from opinion.', '사실과 의견을 구별하기 어렵다.'],
      ['Color helps us distinguish objects.', '색은 우리가 사물을 구별하도록 돕는다.'],
    ]},
  ]},
  { w: 'distribute', p: 'v.', s: [
    { m: '분배하다, 배포하다', syn: ['hand out', 'spread'], ex: [
      ['They distributed food to the villagers.', '그들은 마을 사람들에게 음식을 나눠 주었다.'],
      ['Wealth is not distributed equally.', '부는 균등하게 분배되지 않는다.'],
      ['The teacher distributed the handouts.', '선생님이 유인물을 나눠 주셨다.'],
    ]},
  ]},
  { w: 'diminish', p: 'v.', s: [
    { m: '줄어들다, 약해지다', syn: ['decrease', 'lessen'], ex: [
      ['His interest gradually diminished.', '그의 관심은 점차 줄어들었다.'],
      ['The pain diminished after a week.', '통증은 일주일 후 약해졌다.'],
      ['Nothing can diminish her achievement.', '어떤 것도 그녀의 업적을 깎아내릴 수 없다.'],
    ]},
  ]},
  { w: 'elaborate', p: 'adj., v.', s: [
    { m: '정교한, 공들인', syn: ['detailed', 'complicated'], ex: [
      ['They made an elaborate plan.', '그들은 정교한 계획을 세웠다.'],
      ['The costume was very elaborate.', '그 의상은 매우 공들여 만든 것이었다.'],
    ]},
    { m: '자세히 설명하다', syn: ['expand on', 'explain further'], ex: [
      ['Could you elaborate on that point?', '그 점을 자세히 설명해 주시겠어요?'],
      ['He refused to elaborate.', '그는 더 설명하기를 거부했다.'],
    ]},
  ]},
  { w: 'embrace', p: 'v.', s: [
    { m: '받아들이다, 수용하다', syn: ['accept', 'welcome'], ex: [
      ['We should embrace new ideas.', '우리는 새로운 생각을 받아들여야 한다.'],
      ['The company embraced digital tools.', '그 회사는 디지털 도구를 적극 수용했다.'],
      ['She embraced the challenge happily.', '그녀는 그 도전을 기꺼이 받아들였다.'],
    ]},
  ]},
  { w: 'endure', p: 'v.', s: [
    { m: '견디다, 참다', syn: ['bear', 'put up with'], ex: [
      ['They endured great hardship.', '그들은 큰 고난을 견뎠다.'],
      ['I cannot endure this noise.', '나는 이 소음을 참을 수 없다.'],
    ]},
    { m: '지속되다, 오래가다', syn: ['last', 'survive'], ex: [
      ['Their friendship endured for decades.', '그들의 우정은 수십 년간 지속되었다.'],
      ['Few buildings endure that long.', '그렇게 오래 남는 건물은 드물다.'],
    ]},
  ]},
], 'csat');
