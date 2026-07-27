/**
 * 고등학교 1학년 레벨 2 어휘 33개.
 *
 * 선정 기준: 고1 전국연합학력평가 지문에 반복 출현하는 어휘를 중심으로, 교육부 「기본 어휘 목록」
 * 고등 구간과 겹치는 항목을 우선 배치했다.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H1_2 = defineLevel('h1-2', [
  { w: 'efficient', p: 'adj.', s: [
    { m: '효율적인', syn: ['effective', 'productive'], ex: [
      ['This engine is more efficient.', '이 엔진이 더 효율적이다.'],
      ['She is an efficient worker.', '그녀는 효율적으로 일하는 사람이다.'],
      ['We need a more efficient system.', '우리는 더 효율적인 체계가 필요하다.'],
    ]},
  ]},
  { w: 'eliminate', p: 'v.', s: [
    { m: '제거하다, 없애다', syn: ['remove', 'get rid of'], ex: [
      ['We must eliminate careless errors.', '우리는 부주의한 실수를 없애야 한다.'],
      ['The new rule eliminated confusion.', '새 규칙이 혼란을 없앴다.'],
      ['They were eliminated in the first round.', '그들은 1회전에서 탈락했다.'],
    ]},
  ]},
  { w: 'emerge', p: 'v.', s: [
    { m: '나타나다, 드러나다', syn: ['appear', 'come out'], ex: [
      ['A new problem emerged.', '새로운 문제가 나타났다.'],
      ['The sun emerged from behind the clouds.', '해가 구름 뒤에서 나왔다.'],
      ['New facts emerged during the trial.', '재판 중에 새로운 사실이 드러났다.'],
    ]},
  ]},
  { w: 'emphasize', p: 'v.', s: [
    { m: '강조하다', syn: ['stress', 'highlight'], ex: [
      ['She emphasized the deadline.', '그녀는 마감일을 강조했다.'],
      ['The teacher emphasized reading daily.', '선생님은 매일 읽기를 강조하셨다.'],
      ['He emphasized that safety comes first.', '그는 안전이 우선이라고 강조했다.'],
    ]},
  ]},
  { w: 'enormous', p: 'adj.', s: [
    { m: '거대한, 막대한', syn: ['huge', 'immense'], ex: [
      ['They spent an enormous amount.', '그들은 막대한 금액을 썼다.'],
      ['The stadium is enormous.', '그 경기장은 거대하다.'],
      ['She showed enormous patience.', '그녀는 엄청난 인내심을 보였다.'],
    ]},
  ]},
  { w: 'essential', p: 'adj.', s: [
    { m: '필수적인, 본질적인', syn: ['necessary', 'vital'], ex: [
      ['Water is essential to life.', '물은 생명에 필수적이다.'],
      ['Practice is essential for progress.', '연습은 발전에 필수적이다.'],
      ['It is essential to arrive on time.', '제시간에 도착하는 것이 필수적이다.'],
    ]},
  ]},
  { w: 'establish', p: 'v.', s: [
    { m: '설립하다', syn: ['found', 'set up'], ex: [
      ['The school was established in 1950.', '그 학교는 1950년에 설립되었다.'],
      ['They established a new company.', '그들은 새 회사를 설립했다.'],
    ]},
    { m: '확립하다, 밝히다', syn: ['prove', 'confirm'], ex: [
      ['She established a good reputation.', '그녀는 좋은 평판을 쌓았다.'],
      ['Police established the cause of the fire.', '경찰이 화재 원인을 밝혀냈다.'],
    ]},
  ]},
  { w: 'evaluate', p: 'v.', s: [
    { m: '평가하다', syn: ['assess', 'judge'], ex: [
      ['Teachers evaluate our progress.', '교사들이 우리의 진전을 평가한다.'],
      ['We need to evaluate the results.', '우리는 결과를 평가해야 한다.'],
      ['The program was evaluated as successful.', '그 프로그램은 성공적이라고 평가되었다.'],
    ]},
  ]},
  { w: 'evidence', p: 'n.', s: [
    { m: '증거', syn: ['proof', 'sign'], ex: [
      ['There is no evidence for that claim.', '그 주장에 대한 증거가 없다.'],
      ['New evidence changed the case.', '새 증거가 사건을 바꿔 놓았다.'],
      ['The evidence strongly supports the theory.', '그 증거는 이 이론을 강하게 뒷받침한다.'],
    ]},
  ]},
  { w: 'expand', p: 'v.', s: [
    { m: '확장하다, 넓히다', syn: ['grow', 'extend'], ex: [
      ['The company expanded overseas.', '그 회사는 해외로 확장했다.'],
      ['Metal expands when heated.', '금속은 가열하면 팽창한다.'],
      ['Reading expands your vocabulary.', '독서는 어휘를 넓혀 준다.'],
    ]},
  ]},
  { w: 'external', p: 'adj.', s: [
    { m: '외부의, 외적인', syn: ['outside', 'outer'], ex: [
      ['External factors affected the result.', '외부 요인이 결과에 영향을 미쳤다.'],
      ['The external walls need painting.', '외벽은 페인트칠이 필요하다.'],
      ['We hired an external expert.', '우리는 외부 전문가를 고용했다.'],
    ]},
  ]},
  { w: 'facility', p: 'n.', s: [
    { m: '시설', syn: ['building', 'amenity'], ex: [
      ['The school has good sports facilities.', '그 학교는 좋은 체육 시설을 갖추고 있다.'],
      ['The facility opens at seven.', '그 시설은 7시에 문을 연다.'],
      ['Medical facilities are limited here.', '이곳은 의료 시설이 부족하다.'],
    ]},
  ]},
  { w: 'factor', p: 'n.', s: [
    { m: '요인, 요소', syn: ['element', 'cause'], ex: [
      ['Price is an important factor.', '가격은 중요한 요인이다.'],
      ['Several factors caused the delay.', '여러 요인이 지연을 초래했다.'],
      ['Weather was a key factor in the accident.', '날씨가 그 사고의 핵심 요인이었다.'],
    ]},
  ]},
  { w: 'fundamental', p: 'adj.', s: [
    { m: '근본적인, 기본적인', syn: ['basic', 'essential'], ex: [
      ['This is a fundamental rule.', '이것은 근본적인 규칙이다.'],
      ['There is a fundamental difference between them.', '그 둘 사이에는 근본적인 차이가 있다.'],
      ['Reading is a fundamental skill.', '읽기는 기본적인 기술이다.'],
    ]},
  ]},
  { w: 'generate', p: 'v.', s: [
    { m: '만들어 내다, 발생시키다', syn: ['produce', 'create'], ex: [
      ['Wind turbines generate power.', '풍력 발전기는 전기를 만들어 낸다.'],
      ['The film generated a lot of interest.', '그 영화는 많은 관심을 불러일으켰다.'],
      ['Solar panels generate clean energy.', '태양광 패널은 청정 에너지를 만든다.'],
    ]},
  ]},
  { w: 'genetic', p: 'adj.', s: [
    { m: '유전의, 유전학의', syn: ['inherited'], ex: [
      ['Eye color is genetic.', '눈 색깔은 유전이다.'],
      ['The disease has a genetic cause.', '그 병은 유전적 원인이 있다.'],
      ['Genetic research has advanced quickly.', '유전 연구는 빠르게 발전했다.'],
    ]},
  ]},
  { w: 'guarantee', p: 'v., n.', s: [
    { m: '보장하다; 보장', syn: ['promise', 'ensure'], ex: [
      ['Hard work does not guarantee success.', '노력이 성공을 보장하지는 않는다.'],
      ['The product comes with a two-year guarantee.', '그 제품은 2년 보증이 따른다.'],
      ['I guarantee you will enjoy it.', '네가 즐길 것이라고 장담한다.'],
    ]},
  ]},
  { w: 'identify', p: 'v.', s: [
    { m: '확인하다, 알아보다', syn: ['recognize', 'spot'], ex: [
      ['Can you identify the problem?', '문제를 파악할 수 있니?'],
      ['She identified the bird by its song.', '그녀는 새를 울음소리로 알아봤다.'],
      ['Police identified the driver.', '경찰이 운전자의 신원을 확인했다.'],
    ]},
  ]},
  { w: 'implement', p: 'v.', s: [
    { m: '시행하다, 실행하다', syn: ['carry out', 'put into practice'], ex: [
      ['The city implemented a new policy.', '시는 새 정책을 시행했다.'],
      ['We will implement the plan next month.', '우리는 다음 달에 그 계획을 실행할 것이다.'],
      ['The rules were implemented immediately.', '그 규칙은 즉시 시행되었다.'],
    ]},
  ]},
  { w: 'imply', p: 'v.', s: [
    { m: '암시하다, 함축하다', syn: ['suggest', 'hint'], ex: [
      ['His silence implied disagreement.', '그의 침묵은 반대를 암시했다.'],
      ['What does this sentence imply?', '이 문장은 무엇을 암시하니?'],
      ['She implied that she might leave.', '그녀는 떠날지도 모른다고 암시했다.'],
    ]},
  ]},
  { w: 'individual', p: 'n., adj.', s: [
    { m: '개인; 개별의', syn: ['person', 'single'], ex: [
      ['Each individual has a role.', '각 개인은 역할이 있다.'],
      ['We respect individual differences.', '우리는 개인차를 존중한다.'],
      ['Every student gets individual attention.', '모든 학생이 개별적인 관심을 받는다.'],
    ]},
  ]},
  { w: 'inevitable', p: 'adj.', s: [
    { m: '불가피한, 피할 수 없는', syn: ['unavoidable', 'certain'], ex: [
      ['Change is inevitable.', '변화는 불가피하다.'],
      ['An accident was inevitable at that speed.', '그 속도에서는 사고가 불가피했다.'],
      ['Aging is an inevitable part of life.', '노화는 삶의 피할 수 없는 부분이다.'],
    ]},
  ]},
  { w: 'innovation', p: 'n.', s: [
    { m: '혁신', syn: ['new idea', 'breakthrough'], ex: [
      ['Innovation drives the economy.', '혁신이 경제를 이끈다.'],
      ['The company is known for innovation.', '그 회사는 혁신으로 유명하다.'],
      ['This invention was a great innovation.', '이 발명은 대단한 혁신이었다.'],
    ]},
  ]},
  { w: 'institution', p: 'n.', s: [
    { m: '기관, 단체', syn: ['organization', 'establishment'], ex: [
      ['Schools are social institutions.', '학교는 사회적 기관이다.'],
      ['He works at a research institution.', '그는 연구 기관에서 일한다.'],
      ['Financial institutions lend money.', '금융 기관은 돈을 빌려준다.'],
    ]},
  ]},
  { w: 'intense', p: 'adj.', s: [
    { m: '강렬한, 극심한', syn: ['extreme', 'strong'], ex: [
      ['The heat was intense.', '더위가 극심했다.'],
      ['She felt intense pressure before the final.', '그녀는 결승 전에 극심한 압박을 느꼈다.'],
      ['The competition was intense.', '경쟁이 치열했다.'],
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
  { w: 'investigate', p: 'v.', s: [
    { m: '조사하다, 수사하다', syn: ['examine', 'look into'], ex: [
      ['Police investigated the case.', '경찰이 그 사건을 조사했다.'],
      ['Scientists are investigating the cause.', '과학자들이 원인을 조사하고 있다.'],
      ['We should investigate this further.', '우리는 이것을 더 조사해야 한다.'],
    ]},
  ]},
  { w: 'isolate', p: 'v.', s: [
    { m: '고립시키다, 분리하다', syn: ['separate', 'cut off'], ex: [
      ['The village was isolated by snow.', '그 마을은 눈으로 고립되었다.'],
      ['Sick patients were isolated.', '아픈 환자들은 격리되었다.'],
      ['He felt isolated from his classmates.', '그는 반 친구들에게서 고립감을 느꼈다.'],
    ]},
  ]},
  { w: 'justify', p: 'v.', s: [
    { m: '정당화하다', syn: ['defend', 'excuse'], ex: [
      ['Nothing can justify cheating.', '어떤 것도 부정행위를 정당화할 수 없다.'],
      ['How do you justify this cost?', '이 비용을 어떻게 정당화하겠니?'],
      ['The results justified our effort.', '결과가 우리 노력을 정당화해 주었다.'],
    ]},
  ]},
  { w: 'mechanism', p: 'n.', s: [
    { m: '기제, 작동 원리', syn: ['system', 'process'], ex: [
      ['Scientists studied the mechanism.', '과학자들이 그 작동 원리를 연구했다.'],
      ['The body has a defense mechanism.', '몸에는 방어 기제가 있다.'],
      ['We need a mechanism for feedback.', '우리는 피드백을 위한 장치가 필요하다.'],
    ]},
  ]},
  { w: 'modify', p: 'v.', s: [
    { m: '수정하다, 변경하다', syn: ['change', 'adjust'], ex: [
      ['We modified the design.', '우리는 디자인을 수정했다.'],
      ['The rules were slightly modified.', '규칙이 약간 수정되었다.'],
      ['You may modify the recipe as you like.', '원하는 대로 조리법을 바꿔도 된다.'],
    ]},
  ]},
  { w: 'motivate', p: 'v.', s: [
    { m: '동기를 부여하다', syn: ['inspire', 'encourage'], ex: [
      ['Praise motivates students.', '칭찬은 학생들에게 동기를 부여한다.'],
      ['What motivated you to start?', '무엇이 너를 시작하게 만들었니?'],
      ['A good coach motivates the team.', '좋은 코치는 팀에 동기를 부여한다.'],
    ]},
  ]},
  { w: 'neglect', p: 'v.', s: [
    { m: '소홀히 하다, 방치하다', syn: ['ignore', 'overlook'], ex: [
      ["Don't neglect your health.", '건강을 소홀히 하지 마라.'],
      ['The garden had been neglected for years.', '그 정원은 수년간 방치되어 있었다.'],
      ['He neglected to mention one detail.', '그는 한 가지 세부 사항을 언급하지 않았다.'],
    ]},
  ]},
], 'csat');
