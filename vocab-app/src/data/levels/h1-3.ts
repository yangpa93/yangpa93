/**
 * 고등학교 1학년 레벨 3 어휘 33개.
 *
 * 선정 기준: 고1 전국연합학력평가 지문에 반복 출현하는 어휘를 중심으로, 교육부 「기본 어휘 목록」
 * 고등 구간과 겹치는 항목을 우선 배치했다.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H1_3 = defineLevel('h1-3', [
  { w: 'objective', p: 'n., adj.', s: [
    { m: '목표', syn: ['goal', 'aim'], ex: [
      ['Our main objective is safety.', '우리의 주요 목표는 안전이다.'],
      ['She achieved all her objectives.', '그녀는 모든 목표를 달성했다.'],
    ]},
    { m: '객관적인', syn: ['unbiased', 'neutral'], ex: [
      ['Try to stay objective.', '객관적인 태도를 유지하려고 해라.'],
      ['We need an objective opinion.', '우리는 객관적인 의견이 필요하다.'],
    ]},
  ]},
  { w: 'obtain', p: 'v.', s: [
    { m: '얻다, 획득하다', syn: ['get', 'acquire'], ex: [
      ['She obtained a scholarship.', '그녀는 장학금을 받았다.'],
      ['You must obtain permission first.', '먼저 허가를 받아야 한다.'],
      ['The data were obtained from a survey.', '그 자료는 설문 조사에서 얻었다.'],
    ]},
  ]},
  { w: 'participate', p: 'v.', s: [
    { m: '참여하다', syn: ['take part', 'join in'], ex: [
      ['All students participated actively.', '모든 학생이 적극적으로 참여했다.'],
      ['She participated in the debate.', '그녀는 그 토론에 참여했다.'],
      ['Everyone is welcome to participate.', '누구나 참여할 수 있다.'],
    ]},
  ]},
  { w: 'perceive', p: 'v.', s: [
    { m: '인식하다, 지각하다', syn: ['notice', 'see'], ex: [
      ['People perceive colors differently.', '사람들은 색을 다르게 인식한다.'],
      ['He perceived a change in her voice.', '그는 그녀의 목소리 변화를 알아챘다.'],
      ['Risk is often perceived as larger than it is.', '위험은 종종 실제보다 크게 인식된다.'],
    ]},
  ]},
  { w: 'phenomenon', p: 'n.', s: [
    { m: '현상', syn: ['occurrence', 'event'], ex: [
      ['This is a common phenomenon.', '이것은 흔한 현상이다.'],
      ['Scientists cannot explain the phenomenon.', '과학자들은 그 현상을 설명하지 못한다.'],
      ['Social media is a global phenomenon.', '소셜 미디어는 세계적인 현상이다.'],
    ]},
  ]},
  { w: 'potential', p: 'n., adj.', s: [
    { m: '잠재력', syn: ['promise', 'capability'], ex: [
      ['She has great potential.', '그녀는 큰 잠재력을 가지고 있다.'],
      ['The plan has potential for growth.', '그 계획은 성장 잠재력이 있다.'],
    ]},
    { m: '잠재적인, 가능성 있는', syn: ['possible', 'likely'], ex: [
      ['We identified potential risks.', '우리는 잠재적 위험을 확인했다.'],
      ['He is a potential leader.', '그는 잠재적 지도자이다.'],
    ]},
  ]},
  { w: 'previous', p: 'adj.', s: [
    { m: '이전의, 앞의', syn: ['earlier', 'former'], ex: [
      ['Check the previous chapter.', '이전 장을 확인해라.'],
      ['She has no previous experience.', '그녀는 이전 경력이 없다.'],
      ['The previous owner painted the walls.', '이전 주인이 벽을 칠했다.'],
    ]},
  ]},
  { w: 'principle', p: 'n.', s: [
    { m: '원칙, 신념', syn: ['belief', 'standard'], ex: [
      ['He never breaks his principles.', '그는 결코 자신의 원칙을 어기지 않는다.'],
      ['She refused on principle.', '그녀는 원칙에 따라 거절했다.'],
    ]},
    { m: '원리, 법칙', syn: ['rule', 'law'], ex: [
      ['This machine works on a simple principle.', '이 기계는 간단한 원리로 작동한다.'],
      ['We learned the principles of physics.', '우리는 물리학의 원리를 배웠다.'],
    ]},
  ]},
  { w: 'priority', p: 'n.', s: [
    { m: '우선순위, 우선 사항', syn: ['first concern'], ex: [
      ['Safety is our top priority.', '안전이 우리의 최우선 과제이다.'],
      ['You need to set your priorities.', '너는 우선순위를 정해야 한다.'],
      ['Health takes priority over work.', '건강이 일보다 우선이다.'],
    ]},
  ]},
  { w: 'pursue', p: 'v.', s: [
    { m: '추구하다', syn: ['seek', 'go after'], ex: [
      ['She decided to pursue medicine.', '그녀는 의학을 공부하기로 했다.'],
      ['He pursued his dream for ten years.', '그는 10년 동안 꿈을 좇았다.'],
    ]},
    { m: '뒤쫓다', syn: ['chase', 'follow'], ex: [
      ['The police pursued the car.', '경찰이 그 차를 뒤쫓았다.'],
      ['The dog pursued the rabbit.', '개가 토끼를 쫓았다.'],
    ]},
  ]},
  { w: 'reject', p: 'v.', s: [
    { m: '거부하다, 거절하다', syn: ['refuse', 'turn down'], ex: [
      ['They rejected the offer.', '그들은 그 제안을 거절했다.'],
      ['His application was rejected.', '그의 지원서는 거절되었다.'],
      ['She rejected the idea completely.', '그녀는 그 생각을 완전히 거부했다.'],
    ]},
  ]},
  { w: 'relevant', p: 'adj.', s: [
    { m: '관련 있는, 적절한', syn: ['related', 'applicable'], ex: [
      ['Give only relevant examples.', '관련 있는 예만 들어라.'],
      ['That fact is not relevant here.', '그 사실은 여기서 관련이 없다.'],
      ['Please attach all relevant documents.', '관련 서류를 모두 첨부해 주세요.'],
    ]},
  ]},
  { w: 'reluctant', p: 'adj.', s: [
    { m: '꺼리는, 마지못한', syn: ['unwilling', 'hesitant'], ex: [
      ['He was reluctant to speak.', '그는 말하기를 꺼렸다.'],
      ['She gave a reluctant nod.', '그녀는 마지못해 고개를 끄덕였다.'],
      ['They were reluctant to change the plan.', '그들은 계획을 바꾸기를 꺼렸다.'],
    ]},
  ]},
  { w: 'represent', p: 'v.', s: [
    { m: '나타내다, 상징하다', syn: ['symbolize', 'stand for'], ex: [
      ['This chart represents monthly sales.', '이 도표는 월별 매출을 나타낸다.'],
      ['The dove represents peace.', '비둘기는 평화를 상징한다.'],
    ]},
    { m: '대표하다', syn: ['speak for'], ex: [
      ['She represented our school at the contest.', '그녀는 대회에서 우리 학교를 대표했다.'],
      ['He represents the workers.', '그는 노동자들을 대표한다.'],
    ]},
  ]},
  { w: 'resource', p: 'n.', s: [
    { m: '자원', syn: ['supply', 'asset'], ex: [
      ['Water is a limited resource.', '물은 한정된 자원이다.'],
      ['The country is rich in natural resources.', '그 나라는 천연자원이 풍부하다.'],
      ['Time is our most valuable resource.', '시간은 우리의 가장 귀한 자원이다.'],
    ]},
  ]},
  { w: 'restrict', p: 'v.', s: [
    { m: '제한하다', syn: ['limit', 'control'], ex: [
      ['The rule restricts phone use.', '그 규칙은 휴대폰 사용을 제한한다.'],
      ['Access is restricted to members.', '출입은 회원으로 제한된다.'],
      ['They restricted the number of visitors.', '그들은 방문객 수를 제한했다.'],
    ]},
  ]},
  { w: 'reveal', p: 'v.', s: [
    { m: '드러내다, 밝히다', syn: ['show', 'disclose'], ex: [
      ['The study revealed a surprising fact.', '그 연구는 놀라운 사실을 밝혔다.'],
      ['She refused to reveal her source.', '그녀는 출처 밝히기를 거부했다.'],
      ['The curtain opened to reveal the stage.', '커튼이 열리며 무대가 드러났다.'],
    ]},
  ]},
  { w: 'significant', p: 'adj.', s: [
    { m: '중요한, 상당한', syn: ['important', 'considerable'], ex: [
      ['There was a significant difference.', '상당한 차이가 있었다.'],
      ['This is a significant discovery.', '이것은 중요한 발견이다.'],
      ['Sales rose by a significant amount.', '매출이 상당한 액수만큼 올랐다.'],
    ]},
  ]},
  { w: 'strategy', p: 'n.', s: [
    { m: '전략', syn: ['plan', 'approach'], ex: [
      ['We need a better strategy.', '우리는 더 나은 전략이 필요하다.'],
      ['Her study strategy really works.', '그녀의 공부 전략은 정말 효과가 있다.'],
      ['The team changed its strategy at halftime.', '그 팀은 하프타임에 전략을 바꿨다.'],
    ]},
  ]},
  { w: 'sufficient', p: 'adj.', s: [
    { m: '충분한', syn: ['enough', 'adequate'], ex: [
      ['We have sufficient supplies.', '우리는 충분한 물자를 가지고 있다.'],
      ['Is one hour sufficient?', '한 시간이면 충분하니?'],
      ['There was not sufficient evidence.', '충분한 증거가 없었다.'],
    ]},
  ]},
  { w: 'tolerate', p: 'v.', s: [
    { m: '참다, 용인하다', syn: ['put up with', 'endure'], ex: [
      ['I cannot tolerate rudeness.', '나는 무례함을 참을 수 없다.'],
      ['The school does not tolerate bullying.', '학교는 괴롭힘을 용인하지 않는다.'],
      ['These plants tolerate cold weather.', '이 식물들은 추운 날씨를 견딘다.'],
    ]},
  ]},
  { w: 'transform', p: 'v.', s: [
    { m: '완전히 바꾸다, 변형시키다', syn: ['change', 'convert'], ex: [
      ['The internet transformed learning.', '인터넷은 학습을 완전히 바꿔 놓았다.'],
      ['The old factory was transformed into a museum.', '그 낡은 공장은 박물관으로 바뀌었다.'],
      ['Exercise transformed his health.', '운동이 그의 건강을 바꿔 놓았다.'],
    ]},
  ]},
  { w: 'account for', p: 'phr.', s: [
    { m: '설명하다', syn: ['explain'], ex: [
      ['How do you account for the delay?', '그 지연을 어떻게 설명하겠니?'],
      ['He could not account for the missing money.', '그는 사라진 돈을 설명하지 못했다.'],
    ]},
    { m: '차지하다', syn: ['make up'], ex: [
      ['Rice accounts for half the crop.', '쌀이 수확량의 절반을 차지한다.'],
      ['Teens account for most of the users.', '십 대가 사용자의 대부분을 차지한다.'],
    ]},
  ]},
  { w: 'be based on', p: 'phr.', s: [
    { m: '~에 근거하다', syn: ['rest on', 'come from'], ex: [
      ['The film is based on a true story.', '그 영화는 실화에 근거한다.'],
      ['His theory is based on long research.', '그의 이론은 오랜 연구에 근거한다.'],
      ['The decision was based on the data.', '그 결정은 자료에 근거했다.'],
    ]},
  ]},
  { w: 'carry out', p: 'phr.', s: [
    { m: '수행하다, 실행하다', syn: ['perform', 'conduct'], ex: [
      ['They carried out the experiment.', '그들은 그 실험을 수행했다.'],
      ['We must carry out the plan carefully.', '우리는 그 계획을 신중히 실행해야 한다.'],
      ['The survey was carried out last month.', '그 조사는 지난달에 실시되었다.'],
    ]},
  ]},
  { w: 'in terms of', p: 'phr.', s: [
    { m: '~의 관점에서, ~ 면에서', syn: ['regarding', 'with respect to'], ex: [
      ['In terms of cost, it is better.', '비용의 관점에서 그것이 더 낫다.'],
      ['In terms of size, they are similar.', '크기 면에서 그들은 비슷하다.'],
      ['Think in terms of long-term results.', '장기적인 결과의 관점에서 생각해라.'],
    ]},
  ]},
  { w: 'lead to', p: 'phr.', s: [
    { m: '~로 이어지다, 초래하다', syn: ['result in', 'cause'], ex: [
      ['Small habits lead to big changes.', '작은 습관이 큰 변화로 이어진다.'],
      ['Poor sleep can lead to health problems.', '수면 부족은 건강 문제로 이어질 수 있다.'],
      ['This road leads to the beach.', '이 길은 해변으로 이어진다.'],
    ]},
  ]},
  { w: 'rely on', p: 'phr.', s: [
    { m: '~에 의존하다, 믿다', syn: ['depend on', 'count on'], ex: [
      ['We rely on public transport.', '우리는 대중교통에 의존한다.'],
      ['You can rely on her to be honest.', '그녀가 정직할 것이라고 믿어도 된다.'],
      ['Many farmers rely on rain.', '많은 농부가 비에 의존한다.'],
    ]},
  ]},
  { w: 'assumption', p: 'n.', s: [
    { m: '가정, 추정', syn: ['belief', 'supposition'], ex: [
      ['The plan rests on a false assumption.', '그 계획은 잘못된 가정에 기대고 있다.'],
      ['We made the assumption that costs would fall.', '우리는 비용이 내릴 것이라고 가정했다.'],
      ['Question your own assumptions.', '자신의 가정을 의심해 보아라.'],
    ]},
  ]},
  { w: 'compensation', p: 'n.', s: [
    { m: '보상, 배상', syn: ['payment', 'repayment'], ex: [
      ['They received compensation for the damage.', '그들은 피해에 대한 보상을 받았다.'],
      ['She asked for fair compensation.', '그녀는 정당한 보상을 요구했다.'],
      ['No compensation was offered.', '어떤 보상도 제시되지 않았다.'],
    ]},
  ]},
  { w: 'engage', p: 'v.', s: [
    { m: '참여하다, 관여하다', syn: ['take part', 'involve'], ex: [
      ['Students engage in group discussion.', '학생들이 모둠 토론에 참여한다.'],
      ['He rarely engages with strangers.', '그는 낯선 사람과 잘 어울리지 않는다.'],
    ]},
    { m: '(관심을) 사로잡다', syn: ['attract', 'hold'], ex: [
      ['The story engaged my attention.', '그 이야기가 내 주의를 사로잡았다.'],
      ['Good teachers engage their students.', '좋은 교사는 학생들의 흥미를 끈다.'],
    ]},
  ]},
  { w: 'quantity', p: 'n.', s: [
    { m: '양, 수량', syn: ['amount', 'number'], ex: [
      ['A small quantity of salt is enough.', '적은 양의 소금이면 충분하다.'],
      ['Quality matters more than quantity.', '양보다 질이 중요하다.'],
      ['They bought a large quantity of paper.', '그들은 많은 양의 종이를 샀다.'],
    ]},
  ]},
  { w: 'in addition to', p: 'phr.', s: [
    { m: '~에 더하여, ~뿐만 아니라', syn: ['besides', 'as well as'], ex: [
      ['In addition to math, she teaches science.', '수학뿐만 아니라 그녀는 과학도 가르친다.'],
      ['In addition to the fee, there is a tax.', '수수료에 더해 세금이 있다.'],
      ['He speaks Chinese in addition to English.', '그는 영어에 더해 중국어도 한다.'],
    ]},
  ]},
], 'csat');
