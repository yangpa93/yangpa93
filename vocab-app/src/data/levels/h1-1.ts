/**
 * 고등학교 1학년 레벨 1 어휘 34개.
 *
 * 선정 기준: 고1 전국연합학력평가 지문에 반복 출현하는 어휘를 중심으로, 교육부 「기본 어휘 목록」
 * 고등 구간과 겹치는 항목을 우선 배치했다.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H1_1 = defineLevel('h1-1', [
  { w: 'abandon', p: 'v.', s: [
    { m: '버리다, 포기하다', syn: ['give up', 'desert'], ex: [
      ['They abandoned the old plan.', '그들은 옛 계획을 포기했다.'],
      ['The building was abandoned years ago.', '그 건물은 몇 년 전에 버려졌다.'],
      ['He abandoned his dream of acting.', '그는 연기의 꿈을 포기했다.'],
    ]},
  ]},
  { w: 'absolute', p: 'adj.', s: [
    { m: '절대적인, 완전한', syn: ['complete', 'total'], ex: [
      ['There is no absolute answer.', '절대적인 답은 없다.'],
      ['She has absolute trust in him.', '그녀는 그를 절대적으로 신뢰한다.'],
      ['The room was in absolute silence.', '그 방은 완전한 침묵에 잠겨 있었다.'],
    ]},
  ]},
  { w: 'academic', p: 'adj.', s: [
    { m: '학문적인, 학업의', syn: ['scholarly', 'educational'], ex: [
      ['She has a strong academic record.', '그녀는 뛰어난 학업 성적을 가지고 있다.'],
      ['The academic year starts in March.', '학년도는 3월에 시작한다.'],
      ['He published an academic paper.', '그는 학술 논문을 발표했다.'],
    ]},
  ]},
  { w: 'accurate', p: 'adj.', s: [
    { m: '정확한', syn: ['exact', 'precise'], ex: [
      ['We need accurate data.', '우리는 정확한 자료가 필요하다.'],
      ['His description was surprisingly accurate.', '그의 묘사는 놀라울 만큼 정확했다.'],
      ['The clock is not accurate.', '그 시계는 정확하지 않다.'],
    ]},
  ]},
  { w: 'acquire', p: 'v.', s: [
    { m: '얻다, 습득하다', syn: ['gain', 'obtain'], ex: [
      ['Children acquire language naturally.', '아이들은 언어를 자연스럽게 습득한다.'],
      ['He acquired new skills at work.', '그는 직장에서 새로운 기술을 습득했다.'],
      ['The museum acquired a rare painting.', '그 박물관은 희귀한 그림을 입수했다.'],
    ]},
  ]},
  { w: 'adjust', p: 'v.', s: [
    { m: '조정하다, 맞추다', syn: ['modify', 'set'], ex: [
      ['He adjusted the seat height.', '그는 좌석 높이를 조정했다.'],
      ['Adjust the volume, please.', '음량을 조절해 주세요.'],
    ]},
    { m: '적응하다', syn: ['adapt', 'get used to'], ex: [
      ['It takes time to adjust to a new school.', '새 학교에 적응하는 데는 시간이 걸린다.'],
      ['Your eyes adjust to the dark slowly.', '눈은 어둠에 서서히 적응한다.'],
    ]},
  ]},
  { w: 'alter', p: 'v.', s: [
    { m: '바꾸다, 변경하다', syn: ['change', 'modify'], ex: [
      ['We altered the schedule slightly.', '우리는 일정을 약간 변경했다.'],
      ['Nothing can alter the past.', '어떤 것도 과거를 바꿀 수 없다.'],
      ['The dress was altered to fit her.', '그 옷은 그녀에게 맞게 수선되었다.'],
    ]},
  ]},
  { w: 'analyze', p: 'v.', s: [
    { m: '분석하다', syn: ['examine', 'study'], ex: [
      ['Scientists analyzed the samples.', '과학자들이 표본을 분석했다.'],
      ['Let us analyze the data together.', '자료를 함께 분석해 보자.'],
      ['She analyzed the poem line by line.', '그녀는 그 시를 한 행씩 분석했다.'],
    ]},
  ]},
  { w: 'anxiety', p: 'n.', s: [
    { m: '불안, 걱정', syn: ['worry', 'nervousness'], ex: [
      ['Exams often cause anxiety.', '시험은 종종 불안을 유발한다.'],
      ['She felt anxiety before the interview.', '그녀는 면접 전에 불안을 느꼈다.'],
      ['Deep breathing can reduce anxiety.', '심호흡은 불안을 줄일 수 있다.'],
    ]},
  ]},
  { w: 'apparent', p: 'adj.', s: [
    { m: '분명한, 명백한', syn: ['obvious', 'evident'], ex: [
      ['It became apparent that he lied.', '그가 거짓말했다는 것이 분명해졌다.'],
      ['The reason was apparent to everyone.', '그 이유는 모두에게 분명했다.'],
      ['There was no apparent damage.', '눈에 띄는 손상은 없었다.'],
    ]},
  ]},
  { w: 'appropriate', p: 'adj.', s: [
    { m: '적절한, 알맞은', syn: ['suitable', 'proper'], ex: [
      ['Choose appropriate clothes.', '적절한 옷을 골라라.'],
      ['That comment was not appropriate.', '그 말은 적절하지 않았다.'],
      ['Use language appropriate for the audience.', '청중에게 알맞은 표현을 써라.'],
    ]},
  ]},
  { w: 'aspect', p: 'n.', s: [
    { m: '측면, 양상', syn: ['side', 'feature'], ex: [
      ['Consider every aspect of the issue.', '그 문제의 모든 측면을 고려해라.'],
      ['The best aspect of the job is the people.', '그 일의 가장 좋은 면은 사람들이다.'],
      ['We studied economic aspects of the war.', '우리는 전쟁의 경제적 측면을 공부했다.'],
    ]},
  ]},
  { w: 'assume', p: 'v.', s: [
    { m: '가정하다, 추정하다', syn: ['suppose', 'presume'], ex: [
      ["Let's assume the story is true.", '그 이야기가 사실이라고 가정해 보자.'],
      ['I assumed you already knew.', '나는 네가 이미 아는 줄 알았다.'],
      ['Never assume without evidence.', '증거 없이 추정하지 마라.'],
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
  { w: 'barrier', p: 'n.', s: [
    { m: '장벽, 장애물', syn: ['obstacle', 'block'], ex: [
      ['Language can be a barrier.', '언어는 장벽이 될 수 있다.'],
      ['They removed the barrier from the road.', '그들은 도로에서 장애물을 치웠다.'],
      ['Cost is the biggest barrier for students.', '비용은 학생들에게 가장 큰 장벽이다.'],
    ]},
  ]},
  { w: 'beneficial', p: 'adj.', s: [
    { m: '이로운, 유익한', syn: ['helpful', 'useful'], ex: [
      ['Walking is beneficial to health.', '걷기는 건강에 유익하다.'],
      ['The change proved beneficial.', '그 변화는 이로운 것으로 드러났다.'],
      ['Bees are beneficial insects.', '벌은 이로운 곤충이다.'],
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
  { w: 'circumstance', p: 'n.', s: [
    { m: '상황, 환경', syn: ['situation', 'condition'], ex: [
      ['He did well under hard circumstances.', '그는 어려운 상황에서도 잘 해냈다.'],
      ['Under no circumstances should you go alone.', '어떤 경우에도 혼자 가서는 안 된다.'],
      ['The circumstances have changed.', '상황이 바뀌었다.'],
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
  { w: 'competition', p: 'n.', s: [
    { m: '경쟁', syn: ['rivalry'], ex: [
      ['Competition can raise quality.', '경쟁은 질을 높일 수 있다.'],
      ['There is fierce competition for jobs.', '일자리를 두고 치열한 경쟁이 있다.'],
    ]},
    { m: '대회, 시합', syn: ['contest', 'tournament'], ex: [
      ['She won the singing competition.', '그녀는 노래 대회에서 우승했다.'],
      ['The competition is held every spring.', '그 대회는 매년 봄에 열린다.'],
    ]},
  ]},
  { w: 'complex', p: 'adj.', s: [
    { m: '복잡한', syn: ['complicated', 'intricate'], ex: [
      ['The problem is more complex than it looks.', '그 문제는 보이는 것보다 복잡하다.'],
      ['The human brain is highly complex.', '인간의 뇌는 매우 복잡하다.'],
      ['She gave a complex explanation.', '그녀는 복잡한 설명을 했다.'],
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
  { w: 'conflict', p: 'n., v.', s: [
    { m: '갈등, 충돌', syn: ['dispute', 'clash'], ex: [
      ['They solved the conflict by talking.', '그들은 대화로 갈등을 해결했다.'],
      ['There is a conflict between the two rules.', '두 규칙 사이에 충돌이 있다.'],
      ['The war caused years of conflict.', '그 전쟁은 수년간의 갈등을 낳았다.'],
    ]},
  ]},
  { w: 'consequence', p: 'n.', s: [
    { m: '결과, 영향', syn: ['result', 'outcome'], ex: [
      ['Every choice has consequences.', '모든 선택에는 결과가 따른다.'],
      ['He faced the consequences of his actions.', '그는 자기 행동의 결과를 감당했다.'],
      ['As a consequence, prices rose.', '그 결과로 가격이 올랐다.'],
    ]},
  ]},
  { w: 'contribute', p: 'v.', s: [
    { m: '기여하다, 도움이 되다', syn: ['add to', 'help'], ex: [
      ['Exercise contributes to good health.', '운동은 건강에 기여한다.'],
      ['Everyone contributed to the success.', '모두가 성공에 기여했다.'],
    ]},
    { m: '기부하다', syn: ['donate', 'give'], ex: [
      ['They contributed money to the school.', '그들은 학교에 돈을 기부했다.'],
      ['She contributed her time to charity.', '그녀는 자선 활동에 시간을 내주었다.'],
    ]},
  ]},
  { w: 'convince', p: 'v.', s: [
    { m: '설득하다, 확신시키다', syn: ['persuade', 'assure'], ex: [
      ['He convinced me to join.', '그는 내가 참여하도록 설득했다.'],
      ['She convinced them that it was safe.', '그녀는 그것이 안전하다고 그들을 납득시켰다.'],
      ['I am not convinced by his argument.', '나는 그의 주장에 설득되지 않는다.'],
    ]},
  ]},
  { w: 'crucial', p: 'adj.', s: [
    { m: '결정적인, 매우 중요한', syn: ['critical', 'vital'], ex: [
      ['Timing is crucial in this game.', '이 경기에서는 타이밍이 결정적이다.'],
      ['Water is crucial for survival.', '물은 생존에 매우 중요하다.'],
      ['This is a crucial moment for the team.', '지금은 그 팀에게 결정적인 순간이다.'],
    ]},
  ]},
  { w: 'debate', p: 'n., v.', s: [
    { m: '토론; 토론하다', syn: ['discussion', 'argue'], ex: [
      ['We had a debate about school rules.', '우리는 교칙에 대해 토론했다.'],
      ['The debate lasted two hours.', '그 토론은 두 시간 동안 이어졌다.'],
      ['They debated the new policy.', '그들은 새 정책을 놓고 토론했다.'],
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
  { w: 'define', p: 'v.', s: [
    { m: '정의하다, 규정하다', syn: ['explain', 'specify'], ex: [
      ['Please define the term clearly.', '그 용어를 명확히 정의해 주세요.'],
      ['How do you define success?', '너는 성공을 어떻게 정의하니?'],
      ['The law defines who may vote.', '그 법은 누가 투표할 수 있는지 규정한다.'],
    ]},
  ]},
  { w: 'demonstrate', p: 'v.', s: [
    { m: '보여 주다, 입증하다', syn: ['show', 'prove'], ex: [
      ['The data demonstrate a clear trend.', '그 자료는 뚜렷한 경향을 보여 준다.'],
      ['He demonstrated how to use the tool.', '그는 그 도구 사용법을 보여 주었다.'],
      ['Her work demonstrates real talent.', '그녀의 작품은 진짜 재능을 입증한다.'],
    ]},
  ]},
  { w: 'diverse', p: 'adj.', s: [
    { m: '다양한', syn: ['varied', 'different'], ex: [
      ['Our class has diverse interests.', '우리 반은 다양한 관심사를 가지고 있다.'],
      ['The city has a diverse population.', '그 도시는 다양한 인구를 가지고 있다.'],
      ['We read texts from diverse cultures.', '우리는 다양한 문화의 글을 읽는다.'],
    ]},
  ]},
  { w: 'dominate', p: 'v.', s: [
    { m: '지배하다, 우세하다', syn: ['control', 'rule'], ex: [
      ['One team dominated the match.', '한 팀이 경기를 지배했다.'],
      ['Tall buildings dominate the skyline.', '높은 건물들이 도시 경관을 압도한다.'],
      ['A few companies dominate the market.', '몇몇 회사가 시장을 지배한다.'],
    ]},
  ]},
], 'csat');
