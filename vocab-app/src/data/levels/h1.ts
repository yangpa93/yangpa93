/**
 * 고등학교 1학년 필수 어휘 100개.
 *
 * 선정 기준: 고1 전국연합학력평가 지문에 반복 출현하는 어휘를 중심으로,
 * 교육부 「기본 어휘 목록」 고등 구간과 겹치는 항목을 우선 배치했다.
 * 기본 출처는 수능·모평 기출(csat)로 두었다.
 */

import { defineLevel } from '../define';

export const H1 = defineLevel(
  'h1',
  [
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
  ],
  'csat',
);
