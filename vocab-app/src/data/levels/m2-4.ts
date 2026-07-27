/**
 * 중학교 2학년 레벨 4 — 수록 34 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_4 = defineLevel('m2-4', [
  { w: 'appear', p: 'v.', s: [
    { m: '나타나다', syn: ['show up', 'come out'], ex: [
      ['A rainbow appeared in the sky.', '하늘에 무지개가 나타났다.'],
      ['The actor appeared on stage.', '그 배우가 무대에 나타났다.'],
    ]},
    { m: '~처럼 보이다', syn: ['seem', 'look'], ex: [
      ['He appears tired today.', '그는 오늘 피곤해 보인다.'],
      ['It appears that she forgot.', '그녀가 잊은 것 같다.'],
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
  { w: 'appreciate', p: 'v.', s: [
    { m: '감사하다', syn: ['be grateful for', 'thank'], ex: [
      ['I appreciate your help.', '당신의 도움에 감사합니다.'],
      ['We appreciate everything you did.', '해 주신 모든 것에 감사드립니다.'],
    ]},
    { m: '진가를 알아보다, 감상하다', syn: ['value', 'enjoy'], ex: [
      ['You will appreciate this music later.', '너는 나중에 이 음악의 진가를 알게 될 것이다.'],
      ['He appreciates good art.', '그는 좋은 예술 작품을 감상할 줄 안다.'],
    ]},
  ]},
  { w: 'approach', p: 'v., n.', s: [
    { m: '다가가다, 접근하다', syn: ['come near', 'get close to'], ex: [
      ['A dog approached us slowly.', '개 한 마리가 천천히 우리에게 다가왔다.'],
      ['Winter is approaching.', '겨울이 다가오고 있다.'],
    ]},
    { m: '접근법, 방식', syn: ['method', 'way'], ex: [
      ['We tried a new approach.', '우리는 새로운 접근법을 시도했다.'],
      ['His approach to learning is unusual.', '학습에 대한 그의 방식은 특이하다.'],
    ]},
  ]},
  { w: 'appropriate', p: 'adj.', s: [
    { m: '적절한, 알맞은', syn: ['suitable', 'proper'], ex: [
      ['Choose appropriate clothes.', '적절한 옷을 골라라.'],
      ['That comment was not appropriate.', '그 말은 적절하지 않았다.'],
      ['Use language appropriate for the audience.', '청중에게 알맞은 표현을 써라.'],
    ]},
  ]},
  { w: 'argue', p: 'v.', s: [
    { m: '다투다, 언쟁하다', syn: ['quarrel', 'fight'], ex: [
      ['They argued about the rules.', '그들은 규칙에 대해 다투었다.'],
      ['Stop arguing with your brother.', '동생과 그만 다퉈라.'],
    ]},
    { m: '주장하다', syn: ['claim', 'insist'], ex: [
      ['She argued that the test was unfair.', '그녀는 그 시험이 불공평하다고 주장했다.'],
      ['Some argue that homework is useless.', '어떤 이들은 숙제가 쓸모없다고 주장한다.'],
    ]},
  ]},
  { w: 'as well as', p: 'phr.', s: [
    { m: '~뿐만 아니라', syn: ['in addition to', 'besides'], ex: [
      ['He speaks French as well as English.', '그는 영어뿐만 아니라 프랑스어도 한다.'],
      ['She is kind as well as smart.', '그녀는 똑똑할 뿐만 아니라 친절하다.'],
      ['We need food as well as water.', '우리는 물뿐만 아니라 음식도 필요하다.'],
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
  { w: 'assist', p: 'v.', s: [
    { m: '돕다, 보조하다', syn: ['help', 'aid'], ex: [
      ['She assisted him with the project.', '그녀는 그 과제를 그에게 도와주었다.'],
      ['Volunteers assisted the elderly.', '자원봉사자들이 노인들을 도왔다.'],
      ['This app assists students in studying.', '이 앱은 학생들의 학습을 돕는다.'],
    ]},
  ]},
  { w: 'assume', p: 'v.', s: [
    { m: '가정하다, 추정하다', syn: ['suppose', 'presume'], ex: [
      ["Let's assume the story is true.", '그 이야기가 사실이라고 가정해 보자.'],
      ['I assumed you already knew.', '나는 네가 이미 아는 줄 알았다.'],
      ['Never assume without evidence.', '증거 없이 추정하지 마라.'],
    ]},
  ]},
  { w: 'assumption', p: 'n.', s: [
    { m: '가정, 추정', syn: ['belief', 'supposition'], ex: [
      ['The plan rests on a false assumption.', '그 계획은 잘못된 가정에 기대고 있다.'],
      ['We made the assumption that costs would fall.', '우리는 비용이 내릴 것이라고 가정했다.'],
      ['Question your own assumptions.', '자신의 가정을 의심해 보아라.'],
    ]},
  ]},
  { w: 'attend', p: 'v.', s: [
    { m: '참석하다, 다니다', syn: ['go to', 'be present at'], ex: [
      ['She attends a middle school nearby.', '그녀는 근처 중학교에 다닌다.'],
      ['Many parents attended the meeting.', '많은 학부모가 그 모임에 참석했다.'],
      ['He could not attend the ceremony.', '그는 그 행사에 참석하지 못했다.'],
    ]},
  ]},
  { w: 'attention', p: 'n.', s: [
    { m: '주의, 관심', syn: ['notice', 'focus'], ex: [
      ['Pay attention to the sign.', '표지판에 주의를 기울여라.'],
      ['The movie got a lot of attention.', '그 영화는 많은 관심을 받았다.'],
      ['May I have your attention, please?', '주목해 주시겠습니까?'],
    ]},
  ]},
  { w: 'attitude', p: 'n.', s: [
    { m: '태도, 자세', syn: ['manner', 'outlook'], ex: [
      ['A positive attitude helps a lot.', '긍정적인 태도는 큰 도움이 된다.'],
      ['His attitude toward study changed.', '공부에 대한 그의 태도가 바뀌었다.'],
      ['I like her cheerful attitude.', '나는 그녀의 밝은 태도가 좋다.'],
    ]},
  ]},
  { w: 'attract', p: 'v.', s: [
    { m: '끌어당기다, 매혹하다', syn: ['draw', 'appeal to'], ex: [
      ['The show attracted many people.', '그 공연은 많은 사람을 끌어들였다.'],
      ['Flowers attract bees.', '꽃은 벌을 끌어들인다.'],
      ['The city attracts tourists all year.', '그 도시는 일 년 내내 관광객을 끌어들인다.'],
    ]},
  ]},
  { w: 'authority', p: 'n.', s: [
    { m: '권위, 권한', syn: ['power', 'control'], ex: [
      ['He has the authority to decide.', '그는 결정할 권한이 있다.'],
      ['She spoke with authority.', '그녀는 권위 있게 말했다.'],
    ]},
    { m: '당국, 기관', syn: ['officials'], ex: [
      ['The authority approved the plan.', '당국이 그 계획을 승인했다.'],
      ['Local authorities closed the road.', '지방 당국이 도로를 폐쇄했다.'],
    ]},
  ]},
  { w: 'avoid', p: 'v.', s: [
    { m: '피하다', syn: ['stay away from', 'keep away from'], ex: [
      ['Try to avoid junk food.', '정크푸드를 피하려고 노력해라.'],
      ['We left early to avoid traffic.', '우리는 교통 체증을 피하려고 일찍 떠났다.'],
      ['He avoided answering my question.', '그는 내 질문에 답하기를 피했다.'],
    ]},
  ]},
  { w: 'aware', p: 'adj.', s: [
    { m: '알고 있는, 인식하는', syn: ['conscious', 'mindful'], ex: [
      ['Be aware of the danger.', '위험을 인식하고 있어라.'],
      ['I was not aware of the change.', '나는 그 변화를 알지 못했다.'],
      ['Are you aware that the shop is closed?', '그 가게가 문을 닫은 것을 알고 있니?'],
    ]},
  ]},
  { w: 'balance', p: 'n., v.', s: [
    { m: '균형; 균형을 잡다', syn: ['stability'], ex: [
      ['Keep a balance between study and rest.', '공부와 휴식 사이에 균형을 유지해라.'],
      ['She lost her balance and fell.', '그녀는 균형을 잃고 넘어졌다.'],
      ['It is hard to balance work and family.', '일과 가정의 균형을 맞추기는 어렵다.'],
    ]},
  ]},
  { w: 'be based on', p: 'phr.', s: [
    { m: '~에 근거하다', syn: ['rest on', 'come from'], ex: [
      ['The film is based on a true story.', '그 영화는 실화에 근거한다.'],
      ['His theory is based on long research.', '그의 이론은 오랜 연구에 근거한다.'],
      ['The decision was based on the data.', '그 결정은 자료에 근거했다.'],
    ]},
  ]},
  { w: 'be likely to', p: 'phr.', s: [
    { m: '~할 것 같다', syn: ['tend to', 'be expected to'], ex: [
      ['It is likely to rain tonight.', '오늘 밤 비가 올 것 같다.'],
      ['He is likely to be late again.', '그는 또 늦을 것 같다.'],
      ['Prices are likely to fall next year.', '내년에 가격이 내릴 것 같다.'],
    ]},
  ]},
  { w: 'beneficial', p: 'adj.', s: [
    { m: '이로운, 유익한', syn: ['helpful', 'useful'], ex: [
      ['Walking is beneficial to health.', '걷기는 건강에 유익하다.'],
      ['The change proved beneficial.', '그 변화는 이로운 것으로 드러났다.'],
      ['Bees are beneficial insects.', '벌은 이로운 곤충이다.'],
    ]},
  ]},
  { w: 'benefit', p: 'n., v.', s: [
    { m: '이익, 혜택', syn: ['advantage', 'gain'], ex: [
      ['Exercise has many benefits.', '운동은 많은 이점이 있다.'],
      ['The main benefit is saving time.', '주된 이점은 시간을 아끼는 것이다.'],
      ['Everyone benefits from clean air.', '깨끗한 공기는 모두에게 이롭다.'],
    ]},
  ]},
  { w: 'blame', p: 'v.', s: [
    { m: '비난하다, ~의 탓으로 돌리다', syn: ['accuse', 'fault'], ex: [
      ["Don't blame others for your mistake.", '네 실수를 남 탓하지 마라.'],
      ['She blamed the weather for the delay.', '그녀는 지연을 날씨 탓으로 돌렸다.'],
      ['Nobody blamed him for the loss.', '아무도 그를 패배의 탓으로 비난하지 않았다.'],
    ]},
  ]},
  { w: 'blanket', p: 'n.', s: [
    { m: '담요', syn: [], ex: [
      ['Please bring me a blanket.', '담요 좀 가져다 주세요.'],
      ['She covered the baby with a blanket.', '그녀는 아기를 담요로 덮었다.'],
      ['This blanket is very warm.', '이 담요는 아주 따뜻하다.'],
    ]},
  ]},
  { w: 'boil', p: 'v.', s: [
    { m: '끓이다, 끓다', syn: ['heat'], ex: [
      ['Boil the water for five minutes.', '물을 5분 동안 끓이세요.'],
      ['The soup is boiling now.', '국이 지금 끓고 있다.'],
      ['She boiled two eggs for breakfast.', '그녀는 아침으로 달걀 두 개를 삶았다.'],
    ]},
  ]},
  { w: 'bring about', p: 'phr.', s: [
    { m: '초래하다, 일으키다', syn: ['cause', 'lead to'], ex: [
      ['The law brought about big changes.', '그 법은 큰 변화를 가져왔다.'],
      ['Technology brought about a new lifestyle.', '기술은 새로운 생활 방식을 가져왔다.'],
      ['What brought about this decision?', '무엇이 이 결정을 가져왔니?'],
    ]},
  ]},
  { w: 'calendar', p: 'n.', s: [
    { m: '달력', syn: [], ex: [
      ['The calendar is on the wall.', '달력이 벽에 걸려 있다.'],
      ['Check the calendar for the date.', '날짜는 달력을 확인해라.'],
      ['I marked my birthday on the calendar.', '나는 달력에 생일을 표시했다.'],
    ]},
  ]},
  { w: 'capable', p: 'adj.', s: [
    { m: '~할 수 있는, 유능한', syn: ['able', 'competent'], ex: [
      ['She is capable of solving it.', '그녀는 그것을 해결할 수 있다.'],
      ['He is a capable leader.', '그는 유능한 지도자이다.'],
      ['This machine is capable of great speed.', '이 기계는 대단한 속도를 낼 수 있다.'],
    ]},
  ]},
  { w: 'capacity', p: 'n.', s: [
    { m: '용량, 수용력', syn: ['volume', 'space'], ex: [
      ['The hall has a capacity of 500.', '그 홀은 500명 수용 능력이 있다.'],
      ['The tank has a large capacity.', '그 탱크는 용량이 크다.'],
    ]},
    { m: '능력', syn: ['ability'], ex: [
      ['Humans have a great capacity to learn.', '인간은 배우는 능력이 뛰어나다.'],
      ['He has the capacity for hard work.', '그는 열심히 일할 능력이 있다.'],
    ]},
  ]},
  { w: 'capital', p: 'n.', s: [
    { m: '수도', syn: ['main city'], ex: [
      ['Seoul is the capital of Korea.', '서울은 한국의 수도이다.'],
      ['We visited the capital last summer.', '우리는 지난여름에 수도를 방문했다.'],
    ]},
    { m: '대문자', syn: ['big letter'], ex: [
      ['Write your name in capital letters.', '이름을 대문자로 쓰세요.'],
      ['Names begin with a capital letter.', '이름은 대문자로 시작한다.'],
    ]},
  ]},
  { w: 'carry out', p: 'phr.', s: [
    { m: '수행하다, 실행하다', syn: ['perform', 'conduct'], ex: [
      ['They carried out the experiment.', '그들은 그 실험을 수행했다.'],
      ['We must carry out the plan carefully.', '우리는 그 계획을 신중히 실행해야 한다.'],
      ['The survey was carried out last month.', '그 조사는 지난달에 실시되었다.'],
    ]},
  ]},
  { w: 'cause', p: 'v., n.', s: [
    { m: '초래하다, 일으키다', syn: ['bring about', 'lead to'], ex: [
      ['Smoking causes many diseases.', '흡연은 많은 질병을 유발한다.'],
      ['The heavy rain caused a flood.', '폭우가 홍수를 일으켰다.'],
    ]},
    { m: '원인, 이유', syn: ['reason', 'source'], ex: [
      ['We do not know the cause of the fire.', '우리는 화재의 원인을 모른다.'],
      ['Stress is a common cause of headaches.', '스트레스는 두통의 흔한 원인이다.'],
    ]},
  ]},
], 'curriculum');
