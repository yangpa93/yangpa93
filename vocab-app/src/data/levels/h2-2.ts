/**
 * 고등학교 2학년 레벨 2 어휘 33개.
 *
 * 선정 기준: 고2 모의고사·수능 기출에서 반복되는 어휘와 독해 지문의 핵심 추상 어휘.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H2_2 = defineLevel('h2-2', [
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
], 'csat');
