/**
 * 고등학교 3학년 레벨 1 — 수록 21 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H3_1 = defineLevel('h3-1', [
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
  { w: 'interpret', p: 'v.', s: [
    { m: '해석하다', syn: ['understand', 'read'], ex: [
      ['We interpreted the graph together.', '우리는 함께 그래프를 해석했다.'],
      ['People interpret the poem differently.', '사람들은 그 시를 다르게 해석한다.'],
    ]},
    { m: '통역하다', syn: ['translate'], ex: [
      ['She interpreted for the visitors.', '그녀는 방문객들을 위해 통역했다.'],
      ['He interprets from Korean into English.', '그는 한국어를 영어로 통역한다.'],
    ]},
  ]},
  { w: 'intricate', p: 'adj.', s: [
    { m: '복잡한, 정교한', syn: ['complex', 'elaborate'], ex: [
      ['The clock has an intricate design.', '그 시계는 정교한 디자인을 갖고 있다.'],
      ['They studied the intricate relationship.', '그들은 복잡한 관계를 연구했다.'],
      ['She wove an intricate pattern.', '그녀는 정교한 무늬를 짰다.'],
    ]},
  ]},
  { w: 'intrinsic', p: 'adj.', s: [
    { m: '본질적인, 내재적인', syn: ['inherent', 'built-in'], ex: [
      ['Learning has intrinsic value.', '배움은 본질적 가치가 있다.'],
      ['Intrinsic motivation lasts longer.', '내재적 동기가 더 오래간다.'],
      ['Curiosity is intrinsic to science.', '호기심은 과학에 본질적인 것이다.'],
    ]},
  ]},
  { w: 'intuition', p: 'n.', s: [
    { m: '직관, 직감', syn: ['instinct', 'gut feeling'], ex: [
      ['Trust your intuition sometimes.', '가끔은 직감을 믿어라.'],
      ['Her intuition told her something was wrong.', '그녀의 직감은 뭔가 잘못됐다고 말했다.'],
      ['Intuition is not always reliable.', '직관이 항상 믿을 만한 것은 아니다.'],
    ]},
  ]},
  { w: 'irrelevant', p: 'adj.', s: [
    { m: '무관한, 관련 없는', syn: ['unrelated', 'beside the point'], ex: [
      ['That fact is irrelevant here.', '그 사실은 여기서 무관하다.'],
      ['He raised an irrelevant issue.', '그는 관련 없는 문제를 꺼냈다.'],
      ['Age is irrelevant to this job.', '나이는 이 일과 관련이 없다.'],
    ]},
  ]},
  { w: 'isolate', p: 'v.', s: [
    { m: '고립시키다, 분리하다', syn: ['separate', 'cut off'], ex: [
      ['The village was isolated by snow.', '그 마을은 눈으로 고립되었다.'],
      ['Sick patients were isolated.', '아픈 환자들은 격리되었다.'],
      ['He felt isolated from his classmates.', '그는 반 친구들에게서 고립감을 느꼈다.'],
    ]},
  ]},
  { w: 'legacy', p: 'n.', s: [
    { m: '유산', syn: ['heritage', 'inheritance'], ex: [
      ['She left a lasting legacy.', '그녀는 오래 남을 유산을 남겼다.'],
      ['The war left a painful legacy.', '전쟁은 고통스러운 유산을 남겼다.'],
      ['His legacy still shapes the field.', '그의 유산은 여전히 그 분야를 형성한다.'],
    ]},
  ]},
  { w: 'legitimate', p: 'adj.', s: [
    { m: '정당한, 합법적인', syn: ['valid', 'lawful'], ex: [
      ['That is a legitimate concern.', '그것은 정당한 우려이다.'],
      ['He has a legitimate reason to be late.', '그는 늦은 정당한 이유가 있다.'],
      ['The company runs a legitimate business.', '그 회사는 합법적인 사업을 운영한다.'],
    ]},
  ]},
  { w: 'magnitude', p: 'n.', s: [
    { m: '규모, 크기', syn: ['scale', 'size'], ex: [
      ['We underestimated the magnitude of the task.', '우리는 그 일의 규모를 과소평가했다.'],
      ['The earthquake had a magnitude of 6.5.', '그 지진은 규모 6.5였다.'],
      ['The magnitude of the change surprised us.', '변화의 규모가 우리를 놀라게 했다.'],
    ]},
  ]},
  { w: 'manipulate', p: 'v.', s: [
    { m: '조작하다, 교묘히 다루다', syn: ['control', 'influence'], ex: [
      ['They manipulated the data.', '그들은 자료를 조작했다.'],
      ['Advertisements manipulate our desires.', '광고는 우리의 욕구를 조종한다.'],
      ['He manipulated the machine skillfully.', '그는 능숙하게 기계를 조작했다.'],
    ]},
  ]},
  { w: 'mechanism', p: 'n.', s: [
    { m: '기제, 작동 원리', syn: ['system', 'process'], ex: [
      ['Scientists studied the mechanism.', '과학자들이 그 작동 원리를 연구했다.'],
      ['The body has a defense mechanism.', '몸에는 방어 기제가 있다.'],
      ['We need a mechanism for feedback.', '우리는 피드백을 위한 장치가 필요하다.'],
    ]},
  ]},
  { w: 'mitigate', p: 'v.', s: [
    { m: '완화하다, 줄이다', syn: ['reduce', 'ease'], ex: [
      ['Trees mitigate the heat in cities.', '나무는 도시의 열기를 완화한다.'],
      ['We took steps to mitigate the damage.', '우리는 피해를 줄이기 위한 조치를 취했다.'],
      ['Nothing could mitigate her sorrow.', '어떤 것도 그녀의 슬픔을 덜어 주지 못했다.'],
    ]},
  ]},
  { w: 'modify', p: 'v.', s: [
    { m: '수정하다, 변경하다', syn: ['change', 'adjust'], ex: [
      ['We modified the design.', '우리는 디자인을 수정했다.'],
      ['The rules were slightly modified.', '규칙이 약간 수정되었다.'],
      ['You may modify the recipe as you like.', '원하는 대로 조리법을 바꿔도 된다.'],
    ]},
  ]},
  { w: 'mutual', p: 'adj.', s: [
    { m: '상호간의, 서로의', syn: ['shared', 'reciprocal'], ex: [
      ['They have mutual respect.', '그들은 서로를 존중한다.'],
      ['We reached a mutual agreement.', '우리는 상호 합의에 도달했다.'],
      ['They share a mutual friend.', '그들은 공통의 친구가 있다.'],
    ]},
  ]},
  { w: 'neglect', p: 'v.', s: [
    { m: '소홀히 하다, 방치하다', syn: ['ignore', 'overlook'], ex: [
      ["Don't neglect your health.", '건강을 소홀히 하지 마라.'],
      ['The garden had been neglected for years.', '그 정원은 수년간 방치되어 있었다.'],
      ['He neglected to mention one detail.', '그는 한 가지 세부 사항을 언급하지 않았다.'],
    ]},
  ]},
  { w: 'norm', p: 'n.', s: [
    { m: '규범, 표준', syn: ['standard', 'convention'], ex: [
      ['Social norms differ by culture.', '사회 규범은 문화마다 다르다.'],
      ['Working from home became the norm.', '재택근무가 표준이 되었다.'],
      ['He broke the norms of his time.', '그는 그 시대의 규범을 깼다.'],
    ]},
  ]},
  { w: 'notion', p: 'n.', s: [
    { m: '개념, 생각', syn: ['idea', 'concept'], ex: [
      ['He rejected the notion entirely.', '그는 그 생각을 완전히 거부했다.'],
      ['The notion of fairness varies.', '공정함의 개념은 저마다 다르다.'],
      ['She had no notion of the danger.', '그녀는 그 위험을 전혀 몰랐다.'],
    ]},
  ]},
  { w: 'nurture', p: 'v.', s: [
    { m: '양육하다, 기르다', syn: ['raise', 'foster'], ex: [
      ['Parents nurture their children.', '부모는 자녀를 양육한다.'],
      ['We should nurture young talent.', '우리는 젊은 인재를 길러야 한다.'],
      ['She nurtured the idea for years.', '그녀는 그 생각을 여러 해 키워 왔다.'],
    ]},
  ]},
  { w: 'obscure', p: 'adj., v.', s: [
    { m: '잘 알려지지 않은, 모호한', syn: ['unclear', 'little-known'], ex: [
      ['He quoted an obscure poet.', '그는 잘 알려지지 않은 시인을 인용했다.'],
      ['The meaning remains obscure.', '그 의미는 여전히 모호하다.'],
    ]},
    { m: '가리다, 흐리게 하다', syn: ['hide', 'block'], ex: [
      ['Clouds obscured the moon.', '구름이 달을 가렸다.'],
      ['Jargon obscures the real message.', '전문 용어가 진짜 메시지를 가린다.'],
    ]},
  ]},
], 'csat');
