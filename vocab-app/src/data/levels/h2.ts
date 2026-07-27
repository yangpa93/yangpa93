/**
 * 고등학교 2학년 필수 어휘 100개.
 *
 * 선정 기준: 고2 전국연합학력평가와 EBS 연계 교재 지문에서 반복 출현하는
 * 어휘. 고1 구간보다 추상도가 높고, 논설·과학 지문에서 논지를 끌고 가는
 * 동사와 명사가 중심이다.
 */

import { defineLevel } from '../define';

export const H2 = defineLevel(
  'h2',
  [
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
    { w: 'enhance', p: 'v.', s: [
      { m: '향상시키다, 높이다', syn: ['improve', 'boost'], ex: [
        ['Music can enhance your mood.', '음악은 기분을 좋게 할 수 있다.'],
        ['The new lens enhances image quality.', '새 렌즈는 화질을 향상시킨다.'],
        ['Training enhanced their performance.', '훈련이 그들의 성과를 높였다.'],
      ]},
    ]},
    { w: 'ensure', p: 'v.', s: [
      { m: '확실하게 하다, 보장하다', syn: ['make sure', 'guarantee'], ex: [
        ['Please ensure the door is locked.', '문이 잠겼는지 확인해 주세요.'],
        ['These rules ensure fair play.', '이 규칙들은 공정한 경기를 보장한다.'],
        ['We must ensure everyone is safe.', '우리는 모두가 안전한지 확실히 해야 한다.'],
      ]},
    ]},
    { w: 'evolve', p: 'v.', s: [
      { m: '진화하다, 발전하다', syn: ['develop', 'progress'], ex: [
        ['Birds evolved from dinosaurs.', '새는 공룡으로부터 진화했다.'],
        ['The language has evolved over time.', '그 언어는 시간이 지나며 변화해 왔다.'],
        ['Our plan evolved into something bigger.', '우리 계획은 더 큰 것으로 발전했다.'],
      ]},
    ]},
    { w: 'exaggerate', p: 'v.', s: [
      { m: '과장하다', syn: ['overstate', 'blow up'], ex: [
        ['He tends to exaggerate his stories.', '그는 이야기를 과장하는 경향이 있다.'],
        ['The danger was exaggerated by the media.', '그 위험은 언론에 의해 과장되었다.'],
        ['I am not exaggerating at all.', '나는 전혀 과장하고 있지 않다.'],
      ]},
    ]},
    { w: 'exceed', p: 'v.', s: [
      { m: '초과하다, 넘어서다', syn: ['go beyond', 'surpass'], ex: [
        ['Do not exceed the speed limit.', '제한 속도를 초과하지 마라.'],
        ['The results exceeded our expectations.', '결과는 우리 기대를 넘어섰다.'],
        ['Costs exceeded the budget.', '비용이 예산을 초과했다.'],
      ]},
    ]},
    { w: 'exclude', p: 'v.', s: [
      { m: '제외하다, 배제하다', syn: ['leave out', 'rule out'], ex: [
        ['The price excludes tax.', '그 가격은 세금을 제외한 것이다.'],
        ['They excluded him from the group.', '그들은 그를 그룹에서 배제했다.'],
        ['We cannot exclude that possibility.', '우리는 그 가능성을 배제할 수 없다.'],
      ]},
    ]},
    { w: 'exploit', p: 'v.', s: [
      { m: '이용하다, 활용하다', syn: ['make use of', 'utilize'], ex: [
        ['We should exploit renewable energy.', '우리는 재생 에너지를 활용해야 한다.'],
        ['He exploited every opportunity.', '그는 모든 기회를 활용했다.'],
      ]},
      { m: '착취하다', syn: ['take advantage of'], ex: [
        ['Some companies exploit their workers.', '어떤 회사들은 노동자를 착취한다.'],
        ['Children were exploited in factories.', '아이들이 공장에서 착취당했다.'],
      ]},
    ]},
    { w: 'facilitate', p: 'v.', s: [
      { m: '촉진하다, 쉽게 하다', syn: ['ease', 'help'], ex: [
        ['Technology facilitates communication.', '기술은 의사소통을 쉽게 만든다.'],
        ['The teacher facilitated the discussion.', '선생님이 토론을 이끌어 주셨다.'],
        ['Good roads facilitate trade.', '좋은 도로는 교역을 촉진한다.'],
      ]},
    ]},
    { w: 'foster', p: 'v.', s: [
      { m: '조성하다, 기르다', syn: ['encourage', 'nurture'], ex: [
        ['Schools should foster creativity.', '학교는 창의성을 길러야 한다.'],
        ['The program fosters teamwork.', '그 프로그램은 협동심을 기른다.'],
        ['They fostered a sense of belonging.', '그들은 소속감을 길러 주었다.'],
      ]},
    ]},
    { w: 'framework', p: 'n.', s: [
      { m: '틀, 체계', syn: ['structure', 'system'], ex: [
        ['We need a legal framework.', '우리는 법적 틀이 필요하다.'],
        ['The theory provides a useful framework.', '그 이론은 유용한 틀을 제공한다.'],
        ['This framework guides our research.', '이 체계가 우리 연구를 이끈다.'],
      ]},
    ]},
    { w: 'hypothesis', p: 'n.', s: [
      { m: '가설', syn: ['theory', 'assumption'], ex: [
        ['The hypothesis was tested twice.', '그 가설은 두 번 검증되었다.'],
        ['Scientists formed a new hypothesis.', '과학자들이 새로운 가설을 세웠다.'],
        ['The data did not support the hypothesis.', '자료는 그 가설을 뒷받침하지 않았다.'],
      ]},
    ]},
    { w: 'illustrate', p: 'v.', s: [
      { m: '설명하다, 예시하다', syn: ['show', 'demonstrate'], ex: [
        ['This example illustrates the point.', '이 예가 그 요점을 잘 보여 준다.'],
        ['Let me illustrate with a story.', '이야기로 설명해 볼게.'],
        ['The graph illustrates the change well.', '그 그래프는 변화를 잘 보여 준다.'],
      ]},
    ]},
    { w: 'impose', p: 'v.', s: [
      { m: '부과하다, 강요하다', syn: ['force', 'place on'], ex: [
        ['The city imposed a new tax.', '시는 새 세금을 부과했다.'],
        ['Do not impose your views on others.', '네 견해를 남에게 강요하지 마라.'],
        ['Strict limits were imposed on visitors.', '방문객에게 엄격한 제한이 부과되었다.'],
      ]},
    ]},
    { w: 'inherent', p: 'adj.', s: [
      { m: '내재하는, 본질적인', syn: ['built-in', 'natural'], ex: [
        ['There are inherent risks in the sport.', '그 스포츠에는 내재된 위험이 있다.'],
        ['Curiosity is inherent in children.', '호기심은 아이들에게 본래 있는 것이다.'],
        ['The problem is inherent in the design.', '그 문제는 설계 자체에 내재해 있다.'],
      ]},
    ]},
    { w: 'initiate', p: 'v.', s: [
      { m: '시작하다, 착수하다', syn: ['begin', 'launch'], ex: [
        ['They initiated a new program.', '그들은 새 프로그램을 시작했다.'],
        ['She initiated the conversation.', '그녀가 대화를 먼저 시작했다.'],
        ['The government initiated reforms.', '정부가 개혁에 착수했다.'],
      ]},
    ]},
    { w: 'integrate', p: 'v.', s: [
      { m: '통합하다, 융합하다', syn: ['combine', 'merge'], ex: [
        ['We integrated the two systems.', '우리는 두 시스템을 통합했다.'],
        ['The school integrates art into science.', '그 학교는 과학에 예술을 결합한다.'],
        ['New students integrated quickly.', '새 학생들은 빠르게 어울렸다.'],
      ]},
    ]},
    { w: 'interfere', p: 'v.', s: [
      { m: '방해하다, 간섭하다', syn: ['meddle', 'get in the way'], ex: [
        ['Noise interferes with concentration.', '소음은 집중을 방해한다.'],
        ['Do not interfere in their argument.', '그들의 다툼에 끼어들지 마라.'],
        ['Work should not interfere with rest.', '일이 휴식을 방해해서는 안 된다.'],
      ]},
    ]},
    { w: 'intuition', p: 'n.', s: [
      { m: '직관, 직감', syn: ['instinct', 'gut feeling'], ex: [
        ['Trust your intuition sometimes.', '가끔은 직감을 믿어라.'],
        ['Her intuition told her something was wrong.', '그녀의 직감은 뭔가 잘못됐다고 말했다.'],
        ['Intuition is not always reliable.', '직관이 항상 믿을 만한 것은 아니다.'],
      ]},
    ]},
    { w: 'legitimate', p: 'adj.', s: [
      { m: '정당한, 합법적인', syn: ['valid', 'lawful'], ex: [
        ['That is a legitimate concern.', '그것은 정당한 우려이다.'],
        ['He has a legitimate reason to be late.', '그는 늦은 정당한 이유가 있다.'],
        ['The company runs a legitimate business.', '그 회사는 합법적인 사업을 운영한다.'],
      ]},
    ]},
    { w: 'manipulate', p: 'v.', s: [
      { m: '조작하다, 교묘히 다루다', syn: ['control', 'influence'], ex: [
        ['They manipulated the data.', '그들은 자료를 조작했다.'],
        ['Advertisements manipulate our desires.', '광고는 우리의 욕구를 조종한다.'],
        ['He manipulated the machine skillfully.', '그는 능숙하게 기계를 조작했다.'],
      ]},
    ]},
    { w: 'mutual', p: 'adj.', s: [
      { m: '상호간의, 서로의', syn: ['shared', 'reciprocal'], ex: [
        ['They have mutual respect.', '그들은 서로를 존중한다.'],
        ['We reached a mutual agreement.', '우리는 상호 합의에 도달했다.'],
        ['They share a mutual friend.', '그들은 공통의 친구가 있다.'],
      ]},
    ]},
    { w: 'norm', p: 'n.', s: [
      { m: '규범, 표준', syn: ['standard', 'convention'], ex: [
        ['Social norms differ by culture.', '사회 규범은 문화마다 다르다.'],
        ['Working from home became the norm.', '재택근무가 표준이 되었다.'],
        ['He broke the norms of his time.', '그는 그 시대의 규범을 깼다.'],
      ]},
    ]},
    { w: 'obstacle', p: 'n.', s: [
      { m: '장애물, 방해물', syn: ['barrier', 'hurdle'], ex: [
        ['Fear is the biggest obstacle.', '두려움이 가장 큰 장애물이다.'],
        ['They overcame many obstacles.', '그들은 많은 장애물을 극복했다.'],
        ['An obstacle blocked the road.', '장애물이 도로를 막았다.'],
      ]},
    ]},
    { w: 'optimistic', p: 'adj.', s: [
      { m: '낙관적인', syn: ['hopeful', 'positive'], ex: [
        ['She is optimistic about the future.', '그녀는 미래에 대해 낙관적이다.'],
        ['We remain optimistic despite the loss.', '패배에도 우리는 낙관적이다.'],
        ['His optimistic view encouraged us.', '그의 낙관적인 시각이 우리를 북돋았다.'],
      ]},
    ]},
    { w: 'overcome', p: 'v.', s: [
      { m: '극복하다, 이겨 내다', syn: ['get over', 'conquer'], ex: [
        ['She overcame her fear of water.', '그녀는 물에 대한 두려움을 극복했다.'],
        ['They overcame many difficulties.', '그들은 많은 어려움을 이겨 냈다.'],
        ['Hard work can overcome bad luck.', '노력은 불운을 이겨 낼 수 있다.'],
      ]},
    ]},
    { w: 'persist', p: 'v.', s: [
      { m: '계속되다, 지속하다', syn: ['continue', 'keep on'], ex: [
        ['The problem persists despite repairs.', '수리에도 그 문제는 계속된다.'],
        ['She persisted until she succeeded.', '그녀는 성공할 때까지 계속했다.'],
        ['The rain persisted all week.', '비가 일주일 내내 계속되었다.'],
      ]},
    ]},
    { w: 'perspective', p: 'n.', s: [
      { m: '관점, 시각', syn: ['viewpoint', 'point of view'], ex: [
        ['Try to see it from her perspective.', '그것을 그녀의 관점에서 보려고 해라.'],
        ['Travel gives you a new perspective.', '여행은 새로운 시각을 준다.'],
        ['From a historical perspective, this is normal.', '역사적 관점에서 이것은 정상이다.'],
      ]},
    ]},
    { w: 'precise', p: 'adj.', s: [
      { m: '정확한, 정밀한', syn: ['exact', 'accurate'], ex: [
        ['Give me the precise figure.', '정확한 수치를 알려 줘.'],
        ['The instrument makes precise measurements.', '그 기구는 정밀한 측정을 한다.'],
        ['To be precise, it took 42 minutes.', '정확히 말하면 42분 걸렸다.'],
      ]},
    ]},
    { w: 'predict', p: 'v.', s: [
      { m: '예측하다', syn: ['forecast', 'foretell'], ex: [
        ['No one can predict the future.', '아무도 미래를 예측할 수 없다.'],
        ['Experts predict a cold winter.', '전문가들은 추운 겨울을 예측한다.'],
        ['The model predicted the result well.', '그 모형은 결과를 잘 예측했다.'],
      ]},
    ]},
    { w: 'preserve', p: 'v.', s: [
      { m: '보존하다, 지키다', syn: ['protect', 'conserve'], ex: [
        ['We must preserve our forests.', '우리는 숲을 보존해야 한다.'],
        ['Salt was used to preserve food.', '소금은 음식을 보존하는 데 쓰였다.'],
        ['They preserved the old temple.', '그들은 그 오래된 사찰을 보존했다.'],
      ]},
    ]},
    { w: 'prohibit', p: 'v.', s: [
      { m: '금지하다', syn: ['ban', 'forbid'], ex: [
        ['Smoking is prohibited in the building.', '건물 내 흡연은 금지되어 있다.'],
        ['The law prohibits such advertising.', '법은 그런 광고를 금지한다.'],
        ['Parents prohibited late-night gaming.', '부모님은 밤늦은 게임을 금지하셨다.'],
      ]},
    ]},
    { w: 'prominent', p: 'adj.', s: [
      { m: '두드러진, 저명한', syn: ['notable', 'well-known'], ex: [
        ['She is a prominent scientist.', '그녀는 저명한 과학자이다.'],
        ['The tower is a prominent landmark.', '그 탑은 눈에 띄는 랜드마크이다.'],
        ['He played a prominent role in the project.', '그는 그 프로젝트에서 두드러진 역할을 했다.'],
      ]},
    ]},
    { w: 'reinforce', p: 'v.', s: [
      { m: '강화하다, 보강하다', syn: ['strengthen', 'support'], ex: [
        ['Repetition reinforces memory.', '반복은 기억을 강화한다.'],
        ['The wall was reinforced with steel.', '그 벽은 강철로 보강되었다.'],
        ['Praise reinforces good behavior.', '칭찬은 바람직한 행동을 강화한다.'],
      ]},
    ]},
    { w: 'resemble', p: 'v.', s: [
      { m: '닮다, 비슷하다', syn: ['look like', 'be similar to'], ex: [
        ['She resembles her mother.', '그녀는 어머니를 닮았다.'],
        ['This fruit resembles an apple.', '이 과일은 사과와 비슷하다.'],
        ['The copy closely resembles the original.', '그 복제품은 원본과 매우 비슷하다.'],
      ]},
    ]},
    { w: 'retain', p: 'v.', s: [
      { m: '유지하다, 간직하다', syn: ['keep', 'hold on to'], ex: [
        ['We retain what we practice.', '우리는 연습한 것을 기억에 남긴다.'],
        ['The soil retains water well.', '그 흙은 물을 잘 머금는다.'],
        ['She retained her calm throughout.', '그녀는 내내 침착함을 유지했다.'],
      ]},
    ]},
    { w: 'reverse', p: 'v., adj.', s: [
      { m: '뒤집다, 반대로 하다', syn: ['turn around', 'undo'], ex: [
        ['The court reversed the decision.', '법원은 그 결정을 뒤집었다.'],
        ['We cannot reverse what happened.', '우리는 일어난 일을 되돌릴 수 없다.'],
        ['Read the list in reverse order.', '목록을 역순으로 읽어라.'],
      ]},
    ]},
    { w: 'rigid', p: 'adj.', s: [
      { m: '엄격한, 융통성 없는', syn: ['strict', 'inflexible'], ex: [
        ['The school has rigid rules.', '그 학교는 엄격한 규칙이 있다.'],
        ['His thinking is too rigid.', '그의 사고는 너무 경직되어 있다.'],
      ]},
      { m: '딱딱한, 뻣뻣한', syn: ['stiff', 'hard'], ex: [
        ['The frame is made of rigid plastic.', '그 틀은 단단한 플라스틱으로 만들어졌다.'],
        ['His body went rigid with fear.', '그의 몸은 두려움으로 굳어졌다.'],
      ]},
    ]},
    { w: 'sacrifice', p: 'v., n.', s: [
      { m: '희생하다; 희생', syn: ['give up', 'surrender'], ex: [
        ['She sacrificed sleep to study.', '그녀는 공부하려고 잠을 희생했다.'],
        ['Their sacrifice will be remembered.', '그들의 희생은 기억될 것이다.'],
        ['He sacrificed his weekend for the team.', '그는 팀을 위해 주말을 희생했다.'],
      ]},
    ]},
    { w: 'scarce', p: 'adj.', s: [
      { m: '부족한, 드문', syn: ['rare', 'in short supply'], ex: [
        ['Water is scarce in this region.', '이 지역은 물이 부족하다.'],
        ['Jobs were scarce that year.', '그해에는 일자리가 드물었다.'],
        ['Good teachers are scarce here.', '이곳에는 좋은 교사가 드물다.'],
      ]},
    ]},
    { w: 'sequence', p: 'n.', s: [
      { m: '순서, 연속', syn: ['order', 'series'], ex: [
        ['Put the pictures in the right sequence.', '그림을 올바른 순서로 놓아라.'],
        ['The sequence of events is unclear.', '사건의 순서가 분명하지 않다.'],
        ['He described a sequence of steps.', '그는 일련의 단계를 설명했다.'],
      ]},
    ]},
    { w: 'simultaneously', p: 'adv.', s: [
      { m: '동시에', syn: ['at the same time'], ex: [
        ['Both events happened simultaneously.', '두 사건이 동시에 일어났다.'],
        ['She can read and listen simultaneously.', '그녀는 읽기와 듣기를 동시에 할 수 있다.'],
        ['The lights went out simultaneously.', '조명이 동시에 꺼졌다.'],
      ]},
    ]},
    { w: 'stable', p: 'adj.', s: [
      { m: '안정된', syn: ['steady', 'secure'], ex: [
        ['Prices have been stable this year.', '올해 물가는 안정적이었다.'],
        ['He is in stable condition.', '그는 상태가 안정적이다.'],
        ['We need a stable internet connection.', '우리는 안정적인 인터넷 연결이 필요하다.'],
      ]},
    ]},
    { w: 'subsequent', p: 'adj.', s: [
      { m: '그 이후의, 다음의', syn: ['following', 'later'], ex: [
        ['Subsequent tests confirmed the result.', '이후의 검사가 그 결과를 확인해 주었다.'],
        ['In subsequent years, sales grew.', '이후 몇 년간 매출이 늘었다.'],
        ['The subsequent chapter explains why.', '다음 장이 그 이유를 설명한다.'],
      ]},
    ]},
    { w: 'substantial', p: 'adj.', s: [
      { m: '상당한, 실질적인', syn: ['considerable', 'large'], ex: [
        ['They made a substantial profit.', '그들은 상당한 이익을 냈다.'],
        ['There is substantial evidence for it.', '그것에 대한 상당한 증거가 있다.'],
        ['She made substantial progress.', '그녀는 상당한 진전을 이뤘다.'],
      ]},
    ]},
    { w: 'sustain', p: 'v.', s: [
      { m: '지속하다, 유지하다', syn: ['maintain', 'keep up'], ex: [
        ['He could not sustain the pace.', '그는 그 속도를 유지할 수 없었다.'],
        ['The forest sustains many species.', '그 숲은 많은 종을 지탱한다.'],
        ['Can we sustain this growth?', '우리가 이 성장을 지속할 수 있을까?'],
      ]},
    ]},
    { w: 'thrive', p: 'v.', s: [
      { m: '번영하다, 잘 자라다', syn: ['flourish', 'prosper'], ex: [
        ['These plants thrive in sunlight.', '이 식물들은 햇빛에서 잘 자란다.'],
        ['The business thrived for ten years.', '그 사업은 10년간 번창했다.'],
        ['Some children thrive under pressure.', '어떤 아이들은 압박 속에서 더 잘한다.'],
      ]},
    ]},
    { w: 'trigger', p: 'v., n.', s: [
      { m: '촉발하다, 유발하다', syn: ['set off', 'cause'], ex: [
        ['The news triggered a debate.', '그 소식은 논쟁을 촉발했다.'],
        ['Dust can trigger allergies.', '먼지는 알레르기를 유발할 수 있다.'],
        ['What triggered the argument?', '무엇이 그 말다툼을 촉발했니?'],
      ]},
    ]},
    { w: 'undergo', p: 'v.', s: [
      { m: '겪다, 받다', syn: ['go through', 'experience'], ex: [
        ['The city underwent great change.', '그 도시는 큰 변화를 겪었다.'],
        ['He underwent surgery last week.', '그는 지난주에 수술을 받았다.'],
        ['Materials undergo testing before sale.', '재료는 판매 전에 시험을 거친다.'],
      ]},
    ]},
    { w: 'undermine', p: 'v.', s: [
      { m: '약화시키다, 훼손하다', syn: ['weaken', 'damage'], ex: [
        ['Constant criticism undermines confidence.', '끊임없는 비판은 자신감을 약화시킨다.'],
        ['The scandal undermined public trust.', '그 추문은 대중의 신뢰를 훼손했다.'],
        ['Lack of sleep undermines your health.', '수면 부족은 건강을 해친다.'],
      ]},
    ]},
    { w: 'utilize', p: 'v.', s: [
      { m: '활용하다, 이용하다', syn: ['use', 'make use of'], ex: [
        ['We should utilize every resource.', '우리는 모든 자원을 활용해야 한다.'],
        ['The app utilizes your location.', '그 앱은 너의 위치 정보를 이용한다.'],
        ['Farmers utilize modern machines.', '농부들은 현대적 기계를 활용한다.'],
      ]},
    ]},
    { w: 'valid', p: 'adj.', s: [
      { m: '타당한, 유효한', syn: ['sound', 'legitimate'], ex: [
        ['That is a valid point.', '그것은 타당한 지적이다.'],
        ['The ticket is valid for one month.', '그 표는 한 달간 유효하다.'],
        ['His excuse was not valid.', '그의 변명은 타당하지 않았다.'],
      ]},
    ]},
    { w: 'vary', p: 'v.', s: [
      { m: '다르다, 다양하다', syn: ['differ', 'change'], ex: [
        ['Prices vary from shop to shop.', '가격은 가게마다 다르다.'],
        ['Opinions vary widely on this issue.', '이 문제에 대한 의견은 매우 다양하다.'],
        ['The weather varies by season.', '날씨는 계절에 따라 다르다.'],
      ]},
    ]},
    { w: 'vital', p: 'adj.', s: [
      { m: '필수적인, 매우 중요한', syn: ['essential', 'crucial'], ex: [
        ['Sleep is vital for health.', '잠은 건강에 필수적이다.'],
        ['She played a vital role in the team.', '그녀는 팀에서 매우 중요한 역할을 했다.'],
        ['Clean water is vital to survival.', '깨끗한 물은 생존에 필수적이다.'],
      ]},
    ]},
    { w: 'widespread', p: 'adj.', s: [
      { m: '널리 퍼진, 광범위한', syn: ['common', 'extensive'], ex: [
        ['The belief is widespread.', '그 믿음은 널리 퍼져 있다.'],
        ['There was widespread damage after the storm.', '폭풍 후 광범위한 피해가 있었다.'],
        ['Smartphone use is widespread among teens.', '스마트폰 사용은 십 대 사이에 널리 퍼져 있다.'],
      ]},
    ]},
    { w: 'be attributed to', p: 'phr.', s: [
      { m: '~의 탓으로 여겨지다', syn: ['be caused by'], ex: [
        ['The growth is attributed to new policy.', '그 성장은 새 정책 덕분으로 여겨진다.'],
        ['The delay was attributed to heavy snow.', '그 지연은 폭설 탓으로 여겨졌다.'],
        ['His success is attributed to persistence.', '그의 성공은 끈기 덕분으로 여겨진다.'],
      ]},
    ]},
    { w: 'be exposed to', p: 'phr.', s: [
      { m: '~에 노출되다', syn: ['come into contact with'], ex: [
        ['Children are exposed to too many ads.', '아이들은 너무 많은 광고에 노출된다.'],
        ['Workers were exposed to loud noise.', '노동자들은 큰 소음에 노출되었다.'],
        ['Being exposed to English daily helps a lot.', '매일 영어에 노출되는 것은 큰 도움이 된다.'],
      ]},
    ]},
    { w: 'give rise to', p: 'phr.', s: [
      { m: '~을 일으키다, 낳다', syn: ['cause', 'produce'], ex: [
        ['The policy gave rise to protests.', '그 정책은 시위를 일으켰다.'],
        ['New technology gave rise to new jobs.', '새 기술이 새로운 일자리를 낳았다.'],
        ['His remark gave rise to confusion.', '그의 발언은 혼란을 낳았다.'],
      ]},
    ]},
    { w: 'in the long run', p: 'phr.', s: [
      { m: '장기적으로 보면', syn: ['eventually', 'over time'], ex: [
        ['In the long run, honesty pays.', '장기적으로 보면 정직이 이득이다.'],
        ['This costs more in the long run.', '장기적으로는 이것이 더 비싸다.'],
        ['Exercise helps in the long run.', '운동은 장기적으로 도움이 된다.'],
      ]},
    ]},
    { w: 'take into account', p: 'phr.', s: [
      { m: '고려하다, 참작하다', syn: ['consider', 'allow for'], ex: [
        ['Take the weather into account.', '날씨를 고려해라.'],
        ['We took her age into account.', '우리는 그녀의 나이를 참작했다.'],
        ['You must take costs into account.', '너는 비용을 고려해야 한다.'],
      ]},
    ]},
    { w: 'to some extent', p: 'phr.', s: [
      { m: '어느 정도는', syn: ['partly', 'in part'], ex: [
        ['To some extent, I agree with you.', '어느 정도는 네 말에 동의한다.'],
        ['The rumor is true to some extent.', '그 소문은 어느 정도 사실이다.'],
        ['Success depends on luck to some extent.', '성공은 어느 정도 운에 달려 있다.'],
      ]},
    ]},
    { w: 'abstract', p: 'adj.', s: [
      { m: '추상적인', syn: ['theoretical', 'conceptual'], ex: [
        ['Justice is an abstract idea.', '정의는 추상적인 개념이다.'],
        ['Young children struggle with abstract terms.', '어린아이들은 추상적인 용어를 어려워한다.'],
        ['His painting is completely abstract.', '그의 그림은 완전히 추상적이다.'],
      ]},
    ]},
    { w: 'accommodate', p: 'v.', s: [
      { m: '수용하다, 공간을 제공하다', syn: ['hold', 'house'], ex: [
        ['The hall accommodates 300 people.', '그 홀은 300명을 수용한다.'],
        ['The hotel accommodated us for a night.', '그 호텔은 우리를 하룻밤 재워 주었다.'],
      ]},
      { m: '맞추다, 편의를 봐주다', syn: ['adapt to', 'allow for'], ex: [
        ['We accommodated her schedule.', '우리는 그녀의 일정에 맞춰 주었다.'],
        ['The system accommodates different needs.', '그 체계는 다양한 요구를 수용한다.'],
      ]},
    ]},
    { w: 'component', p: 'n.', s: [
      { m: '구성 요소, 부품', syn: ['part', 'element'], ex: [
        ['Each component must be tested.', '각 부품은 검사되어야 한다.'],
        ['Trust is a key component of teamwork.', '신뢰는 협동의 핵심 요소이다.'],
        ['The engine has many small components.', '그 엔진은 작은 부품이 많다.'],
      ]},
    ]},
    { w: 'implication', p: 'n.', s: [
      { m: '함의, 영향', syn: ['consequence', 'significance'], ex: [
        ['The findings have serious implications.', '그 발견은 심각한 함의를 지닌다.'],
        ['Consider the implications before deciding.', '결정하기 전에 그 영향을 생각해 보아라.'],
        ['He understood the implication of her silence.', '그는 그녀의 침묵이 뜻하는 바를 이해했다.'],
      ]},
    ]},
    { w: 'proceed', p: 'v.', s: [
      { m: '진행하다, 계속하다', syn: ['continue', 'go ahead'], ex: [
        ['Please proceed with your presentation.', '발표를 계속해 주세요.'],
        ['The work proceeded without delay.', '작업은 지체 없이 진행되었다.'],
        ['We proceeded to the next question.', '우리는 다음 질문으로 넘어갔다.'],
      ]},
    ]},
    { w: 'regardless of', p: 'phr.', s: [
      { m: '~과 관계없이', syn: ['no matter', 'in spite of'], ex: [
        ['Everyone is welcome regardless of age.', '나이와 관계없이 누구나 환영이다.'],
        ['We will go regardless of the weather.', '날씨와 상관없이 우리는 갈 것이다.'],
        ['She spoke up regardless of the risk.', '그녀는 위험과 관계없이 목소리를 냈다.'],
      ]},
    ]},
  ],
  'csat',
);
