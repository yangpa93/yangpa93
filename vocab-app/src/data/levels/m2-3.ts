/**
 * 중학교 2학년 레벨 3 — 수록 154 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장), 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_3 = defineLevel('m2-3', [
  { w: 'able', p: 'adj.', s: [
    { m: '~할 수 있는', syn: ['capable'], ex: [
      ['She is able to swim well.', '그녀는 수영을 잘할 수 있다.'],
      ['Were you able to finish it?', '그것을 끝낼 수 있었니?'],
      ['An able student learns fast.', '유능한 학생은 빨리 배운다.'],
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
  { w: 'accent', p: 'n.', s: [
    { m: '말투, 억양', syn: [], ex: [
      ['She speaks with a soft accent.', '그녀는 부드러운 억양으로 말한다.'],
      ['His accent shows where he grew up.', '그의 말투가 어디서 자랐는지 보여 준다.'],
      ['I like the accent of this region.', '나는 이 지역의 억양이 좋다.'],
    ]},
  ]},
  { w: 'accept', p: 'v.', s: [
    { m: '받아들이다, 수락하다', syn: ['take', 'agree to'], ex: [
      ['He accepted my apology.', '그는 내 사과를 받아들였다.'],
      ['She accepted the job offer.', '그녀는 그 일자리 제안을 수락했다.'],
      ['We must accept the result.', '우리는 그 결과를 받아들여야 한다.'],
    ]},
  ]},
  { w: 'access', p: 'n.', s: [
    { m: '접근, 이용', syn: [], ex: [
      ['Students have access to the library.', '학생들은 도서관을 이용할 수 있다.'],
      ['The room has no access from outside.', '그 방은 밖에서 들어갈 수 없다.'],
      ['We need access to the internet.', '우리는 인터넷 접속이 필요하다.'],
    ]},
  ]},
  { w: 'accident', p: 'n.', s: [
    { m: '사고', syn: [], ex: [
      ['The accident happened last night.', '그 사고는 어젯밤에 일어났다.'],
      ['Nobody was hurt in the accident.', '그 사고로 다친 사람은 없었다.'],
      ['Car accidents are common here.', '여기서는 자동차 사고가 흔하다.'],
    ]},
  ]},
  { w: 'according to', p: 'phr.', s: [
    { m: '~에 따르면', syn: ['as stated by', 'based on'], ex: [
      ['According to the report, sales rose.', '그 보고서에 따르면 매출이 올랐다.'],
      ['According to her, the test was easy.', '그녀에 따르면 그 시험은 쉬웠다.'],
      ['We acted according to the plan.', '우리는 계획에 따라 행동했다.'],
    ]},
  ]},
  { w: 'account', p: 'n.', s: [
    { m: '계좌, 설명', syn: [], ex: [
      ['She opened a bank account.', '그녀는 은행 계좌를 열었다.'],
      ['Give me an account of what happened.', '무슨 일이 있었는지 설명해 줘.'],
      ['Check your account balance.', '계좌 잔액을 확인해라.'],
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
  { w: 'accuse', p: 'v.', s: [
    { m: '비난하다, 고발하다', syn: ['blame'], ex: [
      ['Do not accuse him without proof.', '증거 없이 그를 비난하지 마라.'],
      ['She accused me of lying.', '그녀는 내가 거짓말한다고 비난했다.'],
      ['They accused the man of theft.', '그들은 그 남자를 절도로 고발했다.'],
    ]},
  ]},
  { w: 'achieve', p: 'v.', s: [
    { m: '성취하다, 이루다', syn: ['accomplish', 'reach'], ex: [
      ['She achieved her goal.', '그녀는 목표를 이루었다.'],
      ['You can achieve anything with effort.', '노력하면 무엇이든 이룰 수 있다.'],
      ['The team achieved great results.', '그 팀은 훌륭한 성과를 거두었다.'],
    ]},
  ]},
  { w: 'adapt', p: 'v.', s: [
    { m: '적응하다', syn: ['adjust', 'get used to'], ex: [
      ['Animals adapt to their environment.', '동물은 환경에 적응한다.'],
      ['It took him a month to adapt to the new school.', '그가 새 학교에 적응하는 데 한 달이 걸렸다.'],
    ]},
    { m: '각색하다, 고쳐 쓰다', syn: ['modify', 'rewrite'], ex: [
      ['The novel was adapted into a film.', '그 소설은 영화로 각색되었다.'],
      ['We adapted the recipe for children.', '우리는 아이들에 맞게 조리법을 고쳤다.'],
    ]},
  ]},
  { w: 'admire', p: 'v.', s: [
    { m: '존경하다, 감탄하다', syn: ['respect'], ex: [
      ['I admire her courage.', '나는 그녀의 용기를 존경한다.'],
      ['We admired the beautiful view.', '우리는 아름다운 경치에 감탄했다.'],
      ['He admires his older brother.', '그는 형을 존경한다.'],
    ]},
  ]},
  { w: 'admit', p: 'v.', s: [
    { m: '인정하다', syn: ['confess'], ex: [
      ['He admitted his mistake.', '그는 자기 실수를 인정했다.'],
      ['She admits that she was wrong.', '그녀는 자기가 틀렸다고 인정한다.'],
      ['I must admit it was hard.', '힘들었다고 인정해야겠다.'],
    ]},
  ]},
  { w: 'adopt', p: 'v.', s: [
    { m: '채택하다, 입양하다', syn: ['take up'], ex: [
      ['The school adopted a new rule.', '학교는 새 규칙을 채택했다.'],
      ['They adopted a child last year.', '그들은 작년에 아이를 입양했다.'],
      ['We should adopt this method.', '우리는 이 방법을 받아들여야 한다.'],
    ]},
  ]},
  { w: 'advance', p: 'v.', s: [
    { m: '나아가다, 발전하다', syn: ['progress'], ex: [
      ['The army advanced slowly.', '군대가 천천히 나아갔다.'],
      ['Science has advanced quickly.', '과학은 빠르게 발전했다.'],
      ['She advanced to the next round.', '그녀는 다음 라운드로 진출했다.'],
    ]},
  ]},
  { w: 'advantage', p: 'n.', s: [
    { m: '이점, 장점', syn: ['benefit'], ex: [
      ['Small size is an advantage here.', '작은 크기가 여기서는 장점이다.'],
      ['Speaking two languages is a big advantage.', '두 언어를 하는 것은 큰 이점이다.'],
      ['Each method has its advantages.', '각 방법에는 나름의 장점이 있다.'],
    ]},
  ]},
  { w: 'adventure', p: 'n.', s: [
    { m: '모험', syn: [], ex: [
      ['The trip was a great adventure.', '그 여행은 멋진 모험이었다.'],
      ['He loves adventure stories.', '그는 모험 이야기를 좋아한다.'],
      ['We had an adventure in the forest.', '우리는 숲에서 모험을 했다.'],
    ]},
  ]},
  { w: 'advertise', p: 'v.', s: [
    { m: '광고하다', syn: ['promote'], ex: [
      ['They advertise on television.', '그들은 텔레비전에 광고한다.'],
      ['The shop advertised a big sale.', '그 가게는 큰 할인을 광고했다.'],
      ['We are advertising our concert.', '우리는 우리 콘서트를 광고하고 있다.'],
    ]},
  ]},
  { w: 'advertize', p: 'v.', s: [
    { m: '광고하다 (advertise 의 다른 철자)', syn: ['advertise'], ex: [
      ['They advertize new products online.', '그들은 온라인에서 신제품을 광고한다.'],
      ['The company advertized its service.', '그 회사는 서비스를 광고했다.'],
      ['Small shops rarely advertize.', '작은 가게는 좀처럼 광고하지 않는다.'],
    ]},
  ]},
  { w: 'advice', p: 'n.', s: [
    { m: '조언, 충고', syn: ['tip', 'guidance'], ex: [
      ['Thank you for your advice.', '조언해 주셔서 감사합니다.'],
      ['He gave me good advice about studying.', '그는 공부에 대해 좋은 조언을 해 주었다.'],
      ['I need some advice from a teacher.', '나는 선생님의 조언이 필요하다.'],
    ]},
  ]},
  { w: 'advise', p: 'v.', s: [
    { m: '조언하다', syn: ['counsel'], ex: [
      ['The doctor advised more rest.', '의사는 휴식을 더 취하라고 조언했다.'],
      ['She advised me to study harder.', '그녀는 나에게 더 열심히 공부하라고 조언했다.'],
      ['I advise you to leave early.', '일찍 떠나라고 권하고 싶다.'],
    ]},
  ]},
  { w: 'affair', p: 'n.', s: [
    { m: '일, 사건', syn: ['matter'], ex: [
      ['That is a private affair.', '그것은 사적인 일이다.'],
      ['The affair ended peacefully.', '그 사건은 평화롭게 끝났다.'],
      ['She handled the affair well.', '그녀는 그 일을 잘 처리했다.'],
    ]},
  ]},
  { w: 'affect', p: 'v.', s: [
    { m: '영향을 미치다', syn: ['influence', 'have an effect on'], ex: [
      ['Sleep affects your mood.', '잠은 기분에 영향을 미친다.'],
      ['The weather affected our plans.', '날씨가 우리 계획에 영향을 미쳤다.'],
      ['Noise affects how well we study.', '소음은 우리가 얼마나 잘 공부하는지에 영향을 준다.'],
    ]},
  ]},
  { w: 'afford', p: 'v.', s: [
    { m: '여유가 되다', syn: [], ex: [
      ['We cannot afford a new car.', '우리는 새 차를 살 여유가 없다.'],
      ['She could not afford the ticket.', '그녀는 표를 살 형편이 못 되었다.'],
      ['Can you afford to wait?', '기다릴 여유가 있니?'],
    ]},
  ]},
  { w: 'agent', p: 'n.', s: [
    { m: '대리인, 요원', syn: ['representative'], ex: [
      ['A travel agent booked our trip.', '여행사 직원이 우리 여행을 예약해 주었다.'],
      ['The agent answered our questions.', '대리인이 우리 질문에 답했다.'],
      ['She works as a sales agent.', '그녀는 영업 사원으로 일한다.'],
    ]},
  ]},
  { w: 'aid', p: 'n.', s: [
    { m: '도움, 원조', syn: ['help'], ex: [
      ['They sent aid to the village.', '그들은 그 마을에 원조를 보냈다.'],
      ['She came to my aid quickly.', '그녀는 빨리 나를 도우러 왔다.'],
      ['First aid saved his life.', '응급 처치가 그의 목숨을 구했다.'],
    ]},
  ]},
  { w: 'aim', p: 'n.', s: [
    { m: '목표', syn: ['goal'], ex: [
      ['Our aim is to win.', '우리의 목표는 이기는 것이다.'],
      ['She has a clear aim in life.', '그녀는 인생의 목표가 뚜렷하다.'],
      ['The aim of this class is simple.', '이 수업의 목표는 단순하다.'],
    ]},
  ]},
  { w: 'airline', p: 'n.', s: [
    { m: '항공사', syn: [], ex: [
      ['The airline lost my bag.', '항공사가 내 가방을 잃어버렸다.'],
      ['This airline flies to Paris.', '이 항공사는 파리로 간다.'],
      ['She works for a big airline.', '그녀는 큰 항공사에서 일한다.'],
    ]},
  ]},
  { w: 'airport', p: 'n.', s: [
    { m: '공항', syn: [], ex: [
      ['My father works at the airport.', '우리 아버지는 공항에서 일하신다.'],
      ['We arrived at the airport early.', '우리는 공항에 일찍 도착했다.'],
      ['The airport was full of people.', '공항은 사람들로 가득했다.'],
    ]},
  ]},
  { w: 'alarm', p: 'n.', s: [
    { m: '알람, 경보', syn: [], ex: [
      ['My alarm rings at six.', '내 알람은 6시에 울린다.'],
      ['The fire alarm went off.', '화재 경보가 울렸다.'],
      ['Set an alarm for tomorrow.', '내일 알람을 맞춰라.'],
    ]},
  ]},
  { w: 'alcohol', p: 'n.', s: [
    { m: '술, 알코올', syn: ['liquor'], ex: [
      ['Alcohol is bad for young people.', '술은 젊은 사람에게 나쁘다.'],
      ['He never drinks alcohol.', '그는 술을 전혀 마시지 않는다.'],
      ['This drink has no alcohol.', '이 음료에는 알코올이 없다.'],
    ]},
  ]},
  { w: 'alive', p: 'adj.', s: [
    { m: '살아 있는', syn: ['living'], ex: [
      ['The old tree is still alive.', '그 늙은 나무는 아직 살아 있다.'],
      ['Keep the fish alive in water.', '물고기를 물에 살려 두어라.'],
      ['He was found alive after two days.', '그는 이틀 만에 살아서 발견되었다.'],
    ]},
  ]},
  { w: 'allow', p: 'v.', s: [
    { m: '허락하다', syn: ['let', 'permit'], ex: [
      ['My parents allow me to play outside.', '부모님은 내가 밖에서 노는 것을 허락하신다.'],
      ['Pets are not allowed in this park.', '이 공원에는 반려동물이 허용되지 않는다.'],
      ['Allow me to explain.', '설명하게 해 주세요.'],
    ]},
  ]},
  { w: 'aloud', p: 'adv.', s: [
    { m: '소리 내어', syn: ['out loud'], ex: [
      ['Read the sentence aloud.', '문장을 소리 내어 읽어라.'],
      ['She laughed aloud.', '그녀는 소리 내어 웃었다.'],
      ['He thought aloud without noticing.', '그는 자기도 모르게 생각을 소리 내어 말했다.'],
    ]},
  ]},
  { w: 'alter', p: 'v.', s: [
    { m: '바꾸다, 변경하다', syn: ['change', 'modify'], ex: [
      ['We altered the schedule slightly.', '우리는 일정을 약간 변경했다.'],
      ['Nothing can alter the past.', '어떤 것도 과거를 바꿀 수 없다.'],
      ['The dress was altered to fit her.', '그 옷은 그녀에게 맞게 수선되었다.'],
    ]},
  ]},
  { w: 'although', p: 'conj.', s: [
    { m: '비록 ~일지라도', syn: ['even though'], ex: [
      ['Although it rained, we went out.', '비가 왔지만 우리는 나갔다.'],
      ['She smiled although she was tired.', '그녀는 피곤했지만 미소 지었다.'],
      ['Although he is young, he is wise.', '그는 어리지만 지혜롭다.'],
    ]},
  ]},
  { w: 'altogether', p: 'adv.', s: [
    { m: '모두 합쳐, 전적으로', syn: ['in total'], ex: [
      ['Altogether there were ten people.', '모두 합쳐 열 명이 있었다.'],
      ['The trip cost fifty dollars altogether.', '여행은 총 50달러가 들었다.'],
      ['That is altogether wrong.', '그것은 완전히 틀렸다.'],
    ]},
  ]},
  { w: 'amaze', p: 'v.', s: [
    { m: '놀라게 하다', syn: ['astonish'], ex: [
      ['Her talent amazed everyone.', '그녀의 재능은 모두를 놀라게 했다.'],
      ['The magic show amazed the children.', '마술 쇼가 아이들을 놀라게 했다.'],
      ['It amazes me how fast he learns.', '그가 얼마나 빨리 배우는지 놀랍다.'],
    ]},
  ]},
  { w: 'ambulance', p: 'n.', s: [
    { m: '구급차', syn: [], ex: [
      ['Call an ambulance right away.', '당장 구급차를 불러라.'],
      ['The ambulance arrived in five minutes.', '구급차가 5분 만에 도착했다.'],
      ['An ambulance passed with a loud siren.', '구급차가 큰 사이렌을 울리며 지나갔다.'],
    ]},
  ]},
  { w: 'among', p: 'prep.', s: [
    { m: '~ 사이에, ~ 중에', syn: [], ex: [
      ['She is popular among students.', '그녀는 학생들 사이에서 인기가 있다.'],
      ['A house stood among the trees.', '집 한 채가 나무들 사이에 서 있었다.'],
      ['Choose one among these books.', '이 책들 중에서 하나를 골라라.'],
    ]},
  ]},
  { w: 'amount', p: 'n.', s: [
    { m: '양, 액수', syn: ['quantity', 'sum'], ex: [
      ['A large amount of data was lost.', '많은 양의 데이터가 사라졌다.'],
      ['Reduce the amount of salt you eat.', '먹는 소금의 양을 줄여라.'],
      ['The amount of homework doubled.', '숙제의 양이 두 배가 되었다.'],
    ]},
  ]},
  { w: 'amuse', p: 'v.', s: [
    { m: '즐겁게 하다', syn: ['entertain'], ex: [
      ['The clown amused the children.', '광대가 아이들을 즐겁게 했다.'],
      ['His story amused us all.', '그의 이야기가 우리 모두를 즐겁게 했다.'],
      ['She amused herself with a book.', '그녀는 책으로 시간을 즐겁게 보냈다.'],
    ]},
  ]},
  { w: 'analysis', p: 'n.', s: [
    { m: '분석', syn: ['examination'], ex: [
      ['The analysis took two weeks.', '그 분석은 2주가 걸렸다.'],
      ['Her analysis was very clear.', '그녀의 분석은 아주 명확했다.'],
      ['We need a careful analysis.', '우리는 신중한 분석이 필요하다.'],
    ]},
  ]},
  { w: 'angel', p: 'n.', s: [
    { m: '천사', syn: [], ex: [
      ['She sings like an angel.', '그녀는 천사처럼 노래한다.'],
      ['The child drew an angel.', '그 아이는 천사를 그렸다.'],
      ['He was an angel to us that day.', '그날 그는 우리에게 천사 같았다.'],
    ]},
  ]},
  { w: 'anger', p: 'n.', s: [
    { m: '분노, 화', syn: ['rage'], ex: [
      ['He could not hide his anger.', '그는 분노를 감출 수 없었다.'],
      ['Anger never solves a problem.', '화는 결코 문제를 해결하지 않는다.'],
      ['Her anger slowly cooled down.', '그녀의 화가 천천히 가라앉았다.'],
    ]},
  ]},
  { w: 'announce', p: 'v.', s: [
    { m: '발표하다, 알리다', syn: ['declare', 'make known'], ex: [
      ['They announced the winner.', '그들은 우승자를 발표했다.'],
      ['The school announced a new schedule.', '학교는 새 일정을 발표했다.'],
      ['She announced her decision to everyone.', '그녀는 모두에게 자신의 결정을 알렸다.'],
    ]},
  ]},
  { w: 'annoy', p: 'v.', s: [
    { m: '짜증나게 하다', syn: ['irritate'], ex: [
      ['The noise annoyed everyone.', '그 소음이 모두를 짜증나게 했다.'],
      ['Do not annoy your sister.', '누나를 귀찮게 하지 마라.'],
      ['It annoys me when people are late.', '사람들이 늦으면 나는 짜증이 난다.'],
    ]},
  ]},
  { w: 'annual', p: 'adj.', s: [
    { m: '연례의, 해마다의', syn: ['yearly'], ex: [
      ['The annual festival is in May.', '연례 축제는 5월에 있다.'],
      ['We hold an annual meeting.', '우리는 해마다 회의를 연다.'],
      ['This is our annual report.', '이것이 우리의 연례 보고서다.'],
    ]},
  ]},
  { w: 'in the past', p: 'phr.', s: [
    { m: '과거에, 예전에', syn: [], ex: [
      ['In the past people wrote letters.', '예전에는 사람들이 편지를 썼다.'],
      ['He was a teacher in the past.', '그는 예전에 교사였다.'],
      ['In the past this river was clean.', '과거에 이 강은 깨끗했다.'],
    ]},
  ]},
  { w: 'in time', p: 'phr.', s: [
    { m: '시간 안에, 늦지 않게', syn: [], ex: [
      ['We arrived in time for the show.', '우리는 공연에 늦지 않게 도착했다.'],
      ['She finished the work in time.', '그녀는 시간 안에 일을 끝냈다.'],
      ['He got there just in time.', '그는 아슬아슬하게 도착했다.'],
    ]},
  ]},
  { w: 'in trouble', p: 'phr.', s: [
    { m: '곤경에 처한', syn: [], ex: [
      ['He is in trouble with his teacher.', '그는 선생님께 혼나는 처지다.'],
      ['The company is in trouble.', '그 회사는 곤경에 처해 있다.'],
      ['She knew she was in trouble.', '그녀는 자기가 곤란해졌음을 알았다.'],
    ]},
  ]},
  { w: 'keep a diary', p: 'phr.', s: [
    { m: '일기를 쓰다', syn: [], ex: [
      ['She keeps a diary every night.', '그녀는 매일 밤 일기를 쓴다.'],
      ['He kept a diary for ten years.', '그는 10년 동안 일기를 썼다.'],
      ['Keeping a diary helps you remember.', '일기를 쓰면 기억하는 데 도움이 된다.'],
    ]},
  ]},
  { w: 'keep in touch', p: 'phr.', s: [
    { m: '연락을 유지하다', syn: [], ex: [
      ['Let\'s keep in touch after graduation.', '졸업 후에도 연락하고 지내자.'],
      ['They kept in touch by email.', '그들은 이메일로 연락을 유지했다.'],
      ['We keep in touch every month.', '우리는 매달 연락한다.'],
    ]},
  ]},
  { w: 'keep on', p: 'phr.', s: [
    { m: '계속하다', syn: ['continue'], ex: [
      ['She kept on running despite the rain.', '그녀는 비가 오는데도 계속 달렸다.'],
      ['He kept on asking the same question.', '그는 같은 질문을 계속했다.'],
      ['Keep on trying and you will succeed.', '계속 시도하면 성공할 것이다.'],
    ]},
  ]},
  { w: 'laugh at', p: 'phr.', s: [
    { m: '~을 비웃다, 보고 웃다', syn: [], ex: [
      ['Do not laugh at other people.', '남을 비웃지 마라.'],
      ['We laughed at his funny hat.', '우리는 그의 우스운 모자를 보고 웃었다.'],
      ['She laughed at herself.', '그녀는 자기 자신을 보고 웃었다.'],
    ]},
  ]},
  { w: 'leave for', p: 'phr.', s: [
    { m: '~로 떠나다', syn: [], ex: [
      ['They leave for Busan tomorrow.', '그들은 내일 부산으로 떠난다.'],
      ['She left for work at seven.', '그녀는 일곱 시에 출근했다.'],
      ['He left for the airport early.', '그는 일찍 공항으로 떠났다.'],
    ]},
  ]},
  { w: 'listen to', p: 'phr.', s: [
    { m: '~을 듣다', syn: [], ex: [
      ['I listen to music while studying.', '나는 공부하면서 음악을 듣는다.'],
      ['Listen to what she is saying.', '그녀가 하는 말을 들어라.'],
      ['He listens to the radio every morning.', '그는 매일 아침 라디오를 듣는다.'],
    ]},
  ]},
  { w: 'look around', p: 'phr.', s: [
    { m: '둘러보다', syn: [], ex: [
      ['We looked around the museum.', '우리는 박물관을 둘러보았다.'],
      ['She looked around but saw no one.', '그녀는 둘러보았지만 아무도 보지 못했다.'],
      ['Feel free to look around the shop.', '가게를 편하게 둘러보세요.'],
    ]},
  ]},
  { w: 'look at', p: 'phr.', s: [
    { m: '~을 보다', syn: [], ex: [
      ['Look at that beautiful sunset.', '저 아름다운 노을을 봐.'],
      ['He looked at the map carefully.', '그는 지도를 주의 깊게 보았다.'],
      ['She looked at me and smiled.', '그녀는 나를 보고 미소 지었다.'],
    ]},
  ]},
  { w: 'look forward to', p: 'phr.', s: [
    { m: '~을 기대하다, 고대하다', syn: [], ex: [
      ['I look forward to seeing you again.', '당신을 다시 만나기를 고대합니다.'],
      ['She is looking forward to the trip.', '그녀는 그 여행을 기대하고 있다.'],
      ['We look forward to your reply.', '답장을 기다리겠습니다.'],
    ]},
  ]},
  { w: 'look into', p: 'phr.', s: [
    { m: '조사하다, 살펴보다', syn: ['investigate'], ex: [
      ['The police will look into the case.', '경찰이 그 사건을 조사할 것이다.'],
      ['We are looking into the problem.', '우리는 그 문제를 살펴보고 있다.'],
      ['She promised to look into it.', '그녀는 그것을 알아보겠다고 약속했다.'],
    ]},
  ]},
  { w: 'look like', p: 'phr.', s: [
    { m: '~처럼 보이다, 닮다', syn: [], ex: [
      ['She looks like her mother.', '그녀는 어머니를 닮았다.'],
      ['It looks like rain.', '비가 올 것 같다.'],
      ['That cloud looks like a rabbit.', '저 구름은 토끼처럼 보인다.'],
    ]},
  ]},
  { w: 'look out', p: 'phr.', s: [
    { m: '조심하다', syn: ['watch out'], ex: [
      ['Look out, there is a car coming.', '조심해, 차가 온다.'],
      ['Look out for the wet floor.', '바닥이 젖었으니 조심하세요.'],
      ['He shouted at her to look out.', '그는 그녀에게 조심하라고 소리쳤다.'],
    ]},
  ]},
  { w: 'look up', p: 'phr.', s: [
    { m: '(사전에서) 찾아보다; 올려다보다', syn: [], ex: [
      ['Look up the word in the dictionary.', '그 낱말을 사전에서 찾아봐라.'],
      ['She looked up at the stars.', '그녀는 별을 올려다보았다.'],
      ['I looked up his number online.', '나는 인터넷에서 그의 번호를 찾았다.'],
    ]},
  ]},
  { w: 'make a decision', p: 'phr.', s: [
    { m: '결정을 내리다', syn: ['decide'], ex: [
      ['We must make a decision today.', '우리는 오늘 결정을 내려야 한다.'],
      ['She made a difficult decision.', '그녀는 어려운 결정을 내렸다.'],
      ['He made a decision to move abroad.', '그는 외국으로 이주하기로 결정했다.'],
    ]},
  ]},
  { w: 'try', p: 'v.', s: [
    { m: '해 보다, 노력하다', syn: ['attempt'], ex: [
      ['Try again tomorrow.', '내일 다시 해 봐라.'],
      ['She tried her best on the test.', '그녀는 시험에서 최선을 다했다.'],
      ['He is trying to fix the computer.', '그는 컴퓨터를 고치려 하고 있다.'],
    ]},
  ]},
  { w: 'turn', p: 'v., n.', s: [
    { m: '돌다, 돌리다', syn: [], ex: [
      ['Turn right at the corner.', '모퉁이에서 오른쪽으로 도세요.'],
      ['She turned the key slowly.', '그녀는 열쇠를 천천히 돌렸다.'],
    ]},
    { m: '차례', syn: [], ex: [
      ['It is your turn now.', '이제 네 차례다.'],
      ['We take turns cleaning the room.', '우리는 번갈아 가며 방을 청소한다.'],
    ]},
  ]},
  { w: 'turn off', p: 'phr.', s: [
    { m: '(전원을) 끄다', syn: ['switch off', 'shut off'], ex: [
      ['Turn off the lights, please.', '불을 꺼 주세요.'],
      ['He turned off his phone during class.', '그는 수업 중에 휴대폰을 껐다.'],
      ['Remember to turn off the TV.', 'TV 끄는 것을 잊지 마라.'],
    ]},
  ]},
  { w: 'turn on', p: 'phr.', s: [
    { m: '(전원을) 켜다', syn: ['switch on'], ex: [
      ['Please turn on the light.', '불 좀 켜 주세요.'],
      ['She turned on the computer.', '그녀는 컴퓨터를 켰다.'],
      ['He is turning on the radio.', '그는 라디오를 켜고 있다.'],
    ]},
  ]},
  { w: 'twelve', p: 'num.', s: [
    { m: '열둘, 12', syn: [], ex: [
      ['There are twelve months in a year.', '1년에는 열두 달이 있다.'],
      ['She is twelve years old.', '그녀는 열두 살이다.'],
      ['Twelve people joined the club.', '열두 명이 동아리에 들어왔다.'],
    ]},
  ]},
  { w: 'twenty', p: 'num.', s: [
    { m: '스물, 20', syn: [], ex: [
      ['The class has twenty students.', '그 반은 학생이 스무 명이다.'],
      ['He waited twenty minutes.', '그는 20분을 기다렸다.'],
      ['She read twenty books this year.', '그녀는 올해 책 스무 권을 읽었다.'],
    ]},
  ]},
  { w: 'twenty-first', p: 'adj.', s: [
    { m: '스물한 번째의', syn: [], ex: [
      ['We live in the twenty-first century.', '우리는 21세기에 산다.'],
      ['Her twenty-first birthday is today.', '오늘이 그녀의 스물한 번째 생일이다.'],
      ['He finished twenty-first in the race.', '그는 경주에서 21등으로 들어왔다.'],
    ]},
  ]},
  { w: 'twenty-second', p: 'adj.', s: [
    { m: '스물두 번째의', syn: [], ex: [
      ['The meeting is on the twenty-second day.', '회의는 22일에 있다.'],
      ['She sat in the twenty-second row.', '그녀는 22번째 줄에 앉았다.'],
      ['This is our twenty-second lesson.', '이것이 우리의 22번째 수업이다.'],
    ]},
  ]},
  { w: 'twenty-third', p: 'adj.', s: [
    { m: '스물세 번째의', syn: [], ex: [
      ['His birthday is the twenty-third of May.', '그의 생일은 5월 23일이다.'],
      ['We are on the twenty-third page.', '우리는 23쪽에 있다.'],
      ['She came twenty-third in the contest.', '그녀는 대회에서 23등을 했다.'],
    ]},
  ]},
  { w: 'twice', p: 'adv.', s: [
    { m: '두 번, 두 배로', syn: ['two times'], ex: [
      ['I read the letter twice.', '나는 그 편지를 두 번 읽었다.'],
      ['She goes to the gym twice a week.', '그녀는 일주일에 두 번 체육관에 간다.'],
      ['This box is twice as heavy.', '이 상자는 두 배 무겁다.'],
    ]},
  ]},
  { w: 'two', p: 'num.', s: [
    { m: '둘, 2', syn: [], ex: [
      ['I have two brothers.', '나는 남자 형제가 둘이다.'],
      ['The movie is two hours long.', '그 영화는 두 시간짜리다.'],
      ['She bought two apples.', '그녀는 사과 두 개를 샀다.'],
    ]},
  ]},
  { w: 'type', p: 'n.', s: [
    { m: '종류, 유형', syn: ['kind'], ex: [
      ['What type of music do you like?', '어떤 종류의 음악을 좋아하니?'],
      ['This type of tree grows fast.', '이런 종류의 나무는 빨리 자란다.'],
      ['There are two types of answers.', '답에는 두 가지 유형이 있다.'],
    ]},
  ]},
  { w: 'ugly', p: 'adj.', s: [
    { m: '못생긴, 보기 흉한', syn: [], ex: [
      ['The old building looks ugly.', '그 낡은 건물은 보기 흉하다.'],
      ['She thought the hat was ugly.', '그녀는 그 모자가 못생겼다고 생각했다.'],
      ['Do not call anyone ugly.', '누구에게도 못생겼다고 하지 마라.'],
    ]},
  ]},
  { w: 'umbrella', p: 'n.', s: [
    { m: '우산', syn: [], ex: [
      ['Take an umbrella, it is raining.', '비가 오니 우산을 가져가라.'],
      ['She lost her umbrella on the bus.', '그녀는 버스에서 우산을 잃어버렸다.'],
      ['This umbrella is broken.', '이 우산은 망가졌다.'],
    ]},
  ]},
  { w: 'uncle', p: 'n.', s: [
    { m: '삼촌, 외삼촌', syn: [], ex: [
      ['My uncle lives in Busan.', '우리 삼촌은 부산에 사신다.'],
      ['Her uncle is a doctor.', '그녀의 삼촌은 의사다.'],
      ['We visited my uncle last week.', '우리는 지난주에 삼촌을 찾아뵈었다.'],
    ]},
  ]},
  { w: 'under', p: 'prep.', s: [
    { m: '~ 아래에', syn: ['below'], ex: [
      ['The cat is under the table.', '고양이가 탁자 아래에 있다.'],
      ['She hid the box under the bed.', '그녀는 상자를 침대 밑에 숨겼다.'],
      ['We sat under a big tree.', '우리는 큰 나무 아래 앉았다.'],
    ]},
  ]},
  { w: 'understand', p: 'v.', s: [
    { m: '이해하다', syn: ['get', 'follow'], ex: [
      ['I do not understand this word.', '나는 이 단어를 이해하지 못하겠다.'],
      ['Do you understand the question?', '질문을 이해했니?'],
      ['She understands how I feel.', '그녀는 내 기분을 이해한다.'],
    ]},
  ]},
  { w: 'up', p: 'adv.', s: [
    { m: '위로', syn: [], ex: [
      ['Stand up, please.', '일어서 주세요.'],
      ['The balloon went up.', '풍선이 위로 올라갔다.'],
      ['Prices went up this year.', '올해 물가가 올랐다.'],
    ]},
  ]},
  { w: 'use', p: 'v.', s: [
    { m: '사용하다', syn: [], ex: [
      ['Use a pencil for this test.', '이 시험에는 연필을 써라.'],
      ['She used my phone.', '그녀는 내 휴대폰을 썼다.'],
      ['He is using the computer now.', '그는 지금 컴퓨터를 쓰고 있다.'],
    ]},
  ]},
  { w: 'used to', p: 'phr.', s: [
    { m: '~하곤 했다', syn: [], ex: [
      ['I used to play the violin.', '나는 바이올린을 켜곤 했다.'],
      ['There used to be a park here.', '여기에 공원이 있었다.'],
      ['She used to live in Daegu.', '그녀는 대구에 살았었다.'],
    ]},
  ]},
  { w: 'useful', p: 'adj.', s: [
    { m: '유용한, 쓸모 있는', syn: ['helpful', 'handy'], ex: [
      ['This app is very useful.', '이 앱은 매우 유용하다.'],
      ['She gave me useful advice.', '그녀는 나에게 유용한 조언을 해 주었다.'],
      ['A dictionary is useful when reading.', '사전은 읽을 때 유용하다.'],
    ]},
  ]},
  { w: 'vegetable', p: 'n.', s: [
    { m: '채소', syn: [], ex: [
      ['Eat more vegetables.', '채소를 더 먹어라.'],
      ['This vegetable grows in winter.', '이 채소는 겨울에 자란다.'],
      ['She washed the vegetables.', '그녀는 채소를 씻었다.'],
    ]},
  ]},
  { w: 'very', p: 'adv.', s: [
    { m: '매우, 아주', syn: ['extremely'], ex: [
      ['The soup is very hot.', '국이 아주 뜨겁다.'],
      ['She runs very fast.', '그녀는 아주 빨리 달린다.'],
      ['It was a very long day.', '아주 긴 하루였다.'],
    ]},
  ]},
  { w: 'video', p: 'n.', s: [
    { m: '영상, 동영상', syn: [], ex: [
      ['We watched a video in class.', '우리는 수업에서 영상을 봤다.'],
      ['She made a short video.', '그녀는 짧은 동영상을 만들었다.'],
      ['The video is only two minutes.', '그 영상은 2분밖에 안 된다.'],
    ]},
  ]},
  { w: 'violin', p: 'n.', s: [
    { m: '바이올린', syn: [], ex: [
      ['She plays the violin well.', '그녀는 바이올린을 잘 켠다.'],
      ['The violin has four strings.', '바이올린은 줄이 네 개다.'],
      ['He learned the violin at six.', '그는 여섯 살에 바이올린을 배웠다.'],
    ]},
  ]},
  { w: 'visit', p: 'v., n.', s: [
    { m: '방문하다; 방문', syn: ['call on', 'go to see'], ex: [
      ['We visit our grandparents often.', '우리는 조부모님을 자주 방문한다.'],
      ['They visited the museum last Sunday.', '그들은 지난 일요일에 박물관을 방문했다.'],
      ['Thank you for your visit.', '방문해 주셔서 감사합니다.'],
    ]},
  ]},
  { w: 'voice', p: 'n.', s: [
    { m: '목소리', syn: [], ex: [
      ['She has a beautiful voice.', '그녀는 아름다운 목소리를 가졌다.'],
      ['Please lower your voice.', '목소리를 낮춰 주세요.'],
      ['His voice sounded tired.', '그의 목소리는 피곤하게 들렸다.'],
    ]},
  ]},
  { w: 'wait', p: 'v.', s: [
    { m: '기다리다', syn: [], ex: [
      ['Please wait a minute.', '잠시만 기다려 주세요.'],
      ['We waited for the bus in the rain.', '우리는 빗속에서 버스를 기다렸다.'],
      ['I cannot wait to see you.', '너를 빨리 보고 싶어.'],
    ]},
  ]},
  { w: 'wait for', p: 'phr.', s: [
    { m: '~을 기다리다', syn: ['await'], ex: [
      ['I waited for the bus for ten minutes.', '나는 10분 동안 버스를 기다렸다.'],
      ['She is waiting for her friend.', '그녀는 친구를 기다리고 있다.'],
      ['Please wait for me at the gate.', '정문에서 나를 기다려 줘.'],
    ]},
  ]},
  { w: 'wake', p: 'v.', s: [
    { m: '깨다, 깨우다', syn: ['awaken'], ex: [
      ['I wake at six every day.', '나는 매일 6시에 깬다.'],
      ['The noise woke the baby.', '소음이 아기를 깨웠다.'],
      ['She is waking up now.', '그녀는 지금 깨고 있다.'],
    ]},
  ]},
  { w: 'wake up', p: 'phr.', s: [
    { m: '깨다, 깨우다', syn: ['get up', 'awaken'], ex: [
      ['I woke up late this morning.', '나는 오늘 아침 늦게 깼다.'],
      ['Please wake me up at seven.', '7시에 나를 깨워 줘.'],
      ['The noise woke up the baby.', '그 소음이 아기를 깨웠다.'],
    ]},
  ]},
  { w: 'walk', p: 'v.', s: [
    { m: '걷다', syn: ['stroll'], ex: [
      ['We walk to school every day.', '우리는 매일 학교까지 걷는다.'],
      ['She walked along the river.', '그녀는 강을 따라 걸었다.'],
      ['He is walking his dog.', '그는 개를 산책시키고 있다.'],
    ]},
  ]},
  { w: 'wall', p: 'n.', s: [
    { m: '벽, 담', syn: [], ex: [
      ['The picture hangs on the wall.', '그림이 벽에 걸려 있다.'],
      ['They built a stone wall.', '그들은 돌담을 쌓았다.'],
      ['The wall is painted white.', '벽이 흰색으로 칠해져 있다.'],
    ]},
  ]},
  { w: 'want', p: 'v.', s: [
    { m: '원하다', syn: ['desire'], ex: [
      ['I want a glass of water.', '나는 물 한 잔을 원한다.'],
      ['She wants to be a doctor.', '그녀는 의사가 되고 싶어 한다.'],
      ['What do you want for dinner?', '저녁으로 무엇을 원하니?'],
    ]},
  ]},
  { w: 'war', p: 'n.', s: [
    { m: '전쟁', syn: ['conflict'], ex: [
      ['The war lasted four years.', '그 전쟁은 4년 동안 계속되었다.'],
      ['Many people suffered in the war.', '많은 사람이 전쟁으로 고통받았다.'],
      ['We must stop the war.', '우리는 전쟁을 멈춰야 한다.'],
    ]},
  ]},
  { w: 'warm', p: 'adj.', s: [
    { m: '따뜻한', syn: [], ex: [
      ['The room is warm and bright.', '방이 따뜻하고 밝다.'],
      ['Wear warm clothes today.', '오늘은 따뜻한 옷을 입어라.'],
      ['She gave me a warm smile.', '그녀는 나에게 따뜻한 미소를 지었다.'],
    ]},
  ]},
  { w: 'wash', p: 'v.', s: [
    { m: '씻다, 빨다', syn: ['clean'], ex: [
      ['Wash your hands before eating.', '먹기 전에 손을 씻어라.'],
      ['She washed the dishes.', '그녀는 설거지를 했다.'],
      ['He is washing his car.', '그는 세차를 하고 있다.'],
    ]},
  ]},
  { w: 'watch', p: 'v.', s: [
    { m: '보다, 지켜보다', syn: ['observe'], ex: [
      ['We watch a movie every Friday.', '우리는 금요일마다 영화를 본다.'],
      ['She watched the children play.', '그녀는 아이들이 노는 것을 지켜봤다.'],
      ['He is watching the news.', '그는 뉴스를 보고 있다.'],
    ]},
  ]},
  { w: 'water', p: 'n.', s: [
    { m: '물', syn: [], ex: [
      ['Drink more water every day.', '매일 물을 더 마셔라.'],
      ['The water is very cold.', '물이 아주 차갑다.'],
      ['Plants need water to grow.', '식물은 자라려면 물이 필요하다.'],
    ]},
  ]},
  { w: 'watermelon', p: 'n.', s: [
    { m: '수박', syn: [], ex: [
      ['We ate watermelon in summer.', '우리는 여름에 수박을 먹었다.'],
      ['This watermelon is very sweet.', '이 수박은 아주 달다.'],
      ['She cut the watermelon into pieces.', '그녀는 수박을 조각으로 잘랐다.'],
    ]},
  ]},
  { w: 'way', p: 'n.', s: [
    { m: '길, 방법', syn: [], ex: [
      ['Show me the way to the station.', '역으로 가는 길을 알려 주세요.'],
      ['This is a better way to study.', '이것이 더 나은 공부 방법이다.'],
      ['We lost our way in the forest.', '우리는 숲에서 길을 잃었다.'],
    ]},
  ]},
  { w: 'we', p: 'pron.', s: [
    { m: '우리', syn: [], ex: [
      ['We are classmates.', '우리는 반 친구다.'],
      ['We went to the park.', '우리는 공원에 갔다.'],
      ['We will finish it today.', '우리는 오늘 그것을 끝낼 것이다.'],
    ]},
  ]},
  { w: 'wear', p: 'v.', s: [
    { m: '입다, 착용하다', syn: ['put on', 'have on'], ex: [
      ['You should wear a helmet.', '너는 헬멧을 써야 한다.'],
      ['She wore a blue dress to the party.', '그녀는 파티에 파란 원피스를 입었다.'],
      ['I wear glasses when I read.', '나는 책을 읽을 때 안경을 쓴다.'],
    ]},
  ]},
  { w: 'weather', p: 'n.', s: [
    { m: '날씨', syn: [], ex: [
      ['The weather is nice today.', '오늘은 날씨가 좋다.'],
      ['We changed our plan because of the weather.', '우리는 날씨 때문에 계획을 바꿨다.'],
      ['What is the weather like in Jeju?', '제주도의 날씨는 어떠니?'],
    ]},
  ]},
  { w: 'website', p: 'n.', s: [
    { m: '웹사이트', syn: ['site'], ex: [
      ['Visit our school website.', '우리 학교 웹사이트를 방문해라.'],
      ['The website has useful information.', '그 웹사이트에는 유용한 정보가 있다.'],
      ['She built a simple website.', '그녀는 간단한 웹사이트를 만들었다.'],
    ]},
  ]},
  { w: 'wedding', p: 'n.', s: [
    { m: '결혼식', syn: [], ex: [
      ['We went to their wedding.', '우리는 그들의 결혼식에 갔다.'],
      ['The wedding was in May.', '결혼식은 5월에 있었다.'],
      ['She wore a white dress at the wedding.', '그녀는 결혼식에서 흰 드레스를 입었다.'],
    ]},
  ]},
  { w: 'week', p: 'n.', s: [
    { m: '주, 일주일', syn: [], ex: [
      ['We meet once a week.', '우리는 일주일에 한 번 만난다.'],
      ['She was sick for a week.', '그녀는 일주일 동안 아팠다.'],
      ['The test is next week.', '시험은 다음 주다.'],
    ]},
  ]},
  { w: 'weekend', p: 'n.', s: [
    { m: '주말', syn: [], ex: [
      ['We go hiking on the weekend.', '우리는 주말에 등산을 간다.'],
      ['The weekend passed quickly.', '주말이 빨리 지나갔다.'],
      ['She works even on weekends.', '그녀는 주말에도 일한다.'],
    ]},
  ]},
  { w: 'weight', p: 'n.', s: [
    { m: '무게, 체중', syn: [], ex: [
      ['He lost some weight.', '그는 체중을 조금 줄였다.'],
      ['What is the weight of this box?', '이 상자의 무게는 얼마니?'],
      ['The bridge can hold a lot of weight.', '그 다리는 큰 무게를 견딜 수 있다.'],
    ]},
  ]},
  { w: 'welcome', p: 'v.', s: [
    { m: '환영하다', syn: ['greet'], ex: [
      ['We welcome new students.', '우리는 새 학생들을 환영한다.'],
      ['She welcomed us warmly.', '그녀는 우리를 따뜻하게 맞이했다.'],
      ['Welcome to our school!', '우리 학교에 온 것을 환영합니다!'],
    ]},
  ]},
  { w: 'well', p: 'adv.', s: [
    { m: '잘', syn: [], ex: [
      ['She sings very well.', '그녀는 노래를 아주 잘한다.'],
      ['He did well on the test.', '그는 시험을 잘 봤다.'],
      ['Sleep well tonight.', '오늘 밤 잘 자.'],
    ]},
  ]},
  { w: 'west', p: 'n.', s: [
    { m: '서쪽', syn: [], ex: [
      ['The sun sets in the west.', '해는 서쪽으로 진다.'],
      ['They traveled to the west.', '그들은 서쪽으로 여행했다.'],
      ['My window faces west.', '내 창문은 서쪽을 향한다.'],
    ]},
  ]},
  { w: 'wet', p: 'adj.', s: [
    { m: '젖은', syn: ['damp'], ex: [
      ['The floor is wet.', '바닥이 젖어 있다.'],
      ['My shoes got wet in the rain.', '비에 신발이 젖었다.'],
      ['Do not sit on the wet bench.', '젖은 벤치에 앉지 마라.'],
    ]},
  ]},
  { w: 'what', p: 'pron.', s: [
    { m: '무엇', syn: [], ex: [
      ['What is your name?', '이름이 뭐니?'],
      ['I do not know what to do.', '나는 무엇을 해야 할지 모르겠다.'],
      ['What did she say?', '그녀가 뭐라고 했니?'],
    ]},
  ]},
  { w: 'when', p: 'adv.', s: [
    { m: '언제', syn: [], ex: [
      ['When does the class start?', '수업이 언제 시작하니?'],
      ['Call me when you arrive.', '도착하면 전화해.'],
      ['I was happy when I saw her.', '그녀를 봤을 때 나는 행복했다.'],
    ]},
  ]},
  { w: 'where', p: 'adv.', s: [
    { m: '어디에', syn: [], ex: [
      ['Where do you live?', '어디에 사니?'],
      ['This is where we first met.', '여기가 우리가 처음 만난 곳이다.'],
      ['Where did you put my bag?', '내 가방을 어디에 두었니?'],
    ]},
  ]},
  { w: 'white', p: 'adj.', s: [
    { m: '흰', syn: [], ex: [
      ['She wore a white shirt.', '그녀는 흰 셔츠를 입었다.'],
      ['Snow is white and cold.', '눈은 희고 차갑다.'],
      ['The clouds were big and white.', '구름은 크고 하얬다.'],
    ]},
  ]},
  { w: 'who', p: 'pron.', s: [
    { m: '누구', syn: [], ex: [
      ['Who is that girl?', '저 소녀는 누구니?'],
      ['I know who broke the window.', '나는 누가 창문을 깼는지 안다.'],
      ['Who wants to go first?', '누가 먼저 하고 싶니?'],
    ]},
  ]},
  { w: 'why', p: 'adv.', s: [
    { m: '왜', syn: [], ex: [
      ['Why are you late?', '너는 왜 늦었니?'],
      ['I do not know why she left.', '나는 그녀가 왜 떠났는지 모른다.'],
      ['Why do birds fly south?', '새들은 왜 남쪽으로 날아가니?'],
    ]},
  ]},
  { w: 'wife', p: 'n.', s: [
    { m: '아내', syn: [], ex: [
      ['His wife is a teacher.', '그의 아내는 교사다.'],
      ['She became his wife last year.', '그녀는 작년에 그의 아내가 되었다.'],
      ['He cooks for his wife.', '그는 아내를 위해 요리한다.'],
    ]},
  ]},
  { w: 'will', p: 'aux.', s: [
    { m: '~할 것이다', syn: [], ex: [
      ['I will call you tonight.', '오늘 밤에 전화할게.'],
      ['She will come tomorrow.', '그녀는 내일 올 것이다.'],
      ['It will rain this afternoon.', '오후에 비가 올 것이다.'],
    ]},
  ]},
  { w: 'win', p: 'v.', s: [
    { m: '이기다, 따다', syn: [], ex: [
      ['Our team will win.', '우리 팀이 이길 것이다.'],
      ['She won first prize.', '그녀는 1등 상을 탔다.'],
      ['They are winning the game.', '그들이 경기에서 이기고 있다.'],
    ]},
  ]},
  { w: 'wind', p: 'n.', s: [
    { m: '바람', syn: [], ex: [
      ['The wind is strong today.', '오늘 바람이 세다.'],
      ['A cold wind blew all night.', '찬 바람이 밤새 불었다.'],
      ['The wind blew my hat away.', '바람에 내 모자가 날아갔다.'],
    ]},
  ]},
  { w: 'window', p: 'n.', s: [
    { m: '창문', syn: [], ex: [
      ['Please open the window.', '창문을 열어 주세요.'],
      ['The window faces the garden.', '그 창문은 정원을 향한다.'],
      ['She looked out of the window.', '그녀는 창밖을 내다보았다.'],
    ]},
  ]},
  { w: 'wine', p: 'n.', s: [
    { m: '포도주, 와인', syn: [], ex: [
      ['They drank wine at dinner.', '그들은 저녁에 와인을 마셨다.'],
      ['This wine is from France.', '이 와인은 프랑스산이다.'],
      ['He does not drink wine.', '그는 와인을 마시지 않는다.'],
    ]},
  ]},
  { w: 'winter', p: 'n.', s: [
    { m: '겨울', syn: [], ex: [
      ['It snows a lot in winter.', '겨울에는 눈이 많이 온다.'],
      ['Winter is my favorite season.', '겨울은 내가 제일 좋아하는 계절이다.'],
      ['We wear thick coats in winter.', '우리는 겨울에 두꺼운 코트를 입는다.'],
    ]},
  ]},
  { w: 'wish', p: 'v.', s: [
    { m: '바라다, 소망하다', syn: ['hope'], ex: [
      ['I wish you good luck.', '행운을 빈다.'],
      ['She wished for a new bike.', '그녀는 새 자전거를 바랐다.'],
      ['We wish the rain would stop.', '우리는 비가 그치기를 바란다.'],
    ]},
  ]},
  { w: 'with', p: 'prep.', s: [
    { m: '~와 함께, ~로', syn: ['along with'], ex: [
      ['She went with her friend.', '그녀는 친구와 함께 갔다.'],
      ['Cut it with a knife.', '칼로 그것을 잘라라.'],
      ['He lives with his parents.', '그는 부모님과 함께 산다.'],
    ]},
  ]},
  { w: 'woman', p: 'n.', s: [
    { m: '여자, 여성', syn: ['lady'], ex: [
      ['A woman is waiting outside.', '한 여성이 밖에서 기다린다.'],
      ['That woman is my teacher.', '저 여성은 내 선생님이다.'],
      ['Many women joined the class.', '많은 여성이 그 수업에 참여했다.'],
    ]},
  ]},
  { w: 'wood', p: 'n.', s: [
    { m: '나무, 목재', syn: ['timber'], ex: [
      ['The table is made of wood.', '그 탁자는 나무로 만들어졌다.'],
      ['We collected wood for the fire.', '우리는 불을 피우려고 나무를 모았다.'],
      ['This wood is very hard.', '이 목재는 아주 단단하다.'],
    ]},
  ]},
  { w: 'word', p: 'n.', s: [
    { m: '단어, 말', syn: ['term'], ex: [
      ['Write ten new words.', '새 단어 열 개를 써라.'],
      ['I did not understand a word.', '나는 한마디도 이해하지 못했다.'],
      ['Keep your word.', '약속을 지켜라.'],
    ]},
  ]},
  { w: 'work', p: 'v.', s: [
    { m: '일하다', syn: [], ex: [
      ['She works at a hospital.', '그녀는 병원에서 일한다.'],
      ['He worked all night.', '그는 밤새 일했다.'],
      ['The machine is not working.', '그 기계는 작동하지 않는다.'],
    ]},
  ]},
  { w: 'world', p: 'n.', s: [
    { m: '세계, 세상', syn: ['globe'], ex: [
      ['English is used all over the world.', '영어는 전 세계에서 쓰인다.'],
      ['She wants to travel the world.', '그녀는 세계를 여행하고 싶어 한다.'],
      ['The world is changing fast.', '세상이 빠르게 변하고 있다.'],
    ]},
  ]},
  { w: 'worry', p: 'v.', s: [
    { m: '걱정하다', syn: ['be anxious', 'fret'], ex: [
      ['Do not worry, everything will be all right.', '걱정 마, 다 잘될 거야.'],
      ['My mother worries about me too much.', '어머니는 나를 너무 걱정하신다.'],
      ['There is nothing to worry about.', '걱정할 것이 없다.'],
    ]},
  ]},
  { w: 'worry about', p: 'phr.', s: [
    { m: '~에 대해 걱정하다', syn: ['be anxious about'], ex: [
      ['Do not worry about the test.', '시험에 대해 걱정하지 마라.'],
      ['She worries about her health.', '그녀는 자기 건강을 걱정한다.'],
      ['He worried about his little brother.', '그는 남동생을 걱정했다.'],
    ]},
  ]},
  { w: 'would like to', p: 'phr.', s: [
    { m: '~하고 싶다', syn: ['want to', 'wish to'], ex: [
      ['I would like to order pizza.', '피자를 주문하고 싶어요.'],
      ['She would like to join the trip.', '그녀는 그 여행에 함께 가고 싶어 한다.'],
      ['Would you like to come with us?', '우리와 함께 가시겠어요?'],
    ]},
  ]},
  { w: 'write', p: 'v.', s: [
    { m: '쓰다', syn: [], ex: [
      ['Write your name here.', '여기에 이름을 쓰세요.'],
      ['She wrote a letter to me.', '그녀는 나에게 편지를 썼다.'],
      ['He is writing in his notebook.', '그는 공책에 쓰고 있다.'],
    ]},
  ]},
  { w: 'wrong', p: 'adj.', s: [
    { m: '틀린, 잘못된', syn: ['incorrect'], ex: [
      ['Your answer is wrong.', '네 답은 틀렸다.'],
      ['She took the wrong bus.', '그녀는 버스를 잘못 탔다.'],
      ['Something is wrong with my phone.', '내 휴대폰에 뭔가 문제가 있다.'],
    ]},
  ]},
  { w: 'yeah', p: 'int.', s: [
    { m: '응, 그래 (구어)', syn: ['yes'], ex: [
      ['Yeah, I agree with you.', '응, 네 말에 동의해.'],
      ['She said yeah and smiled.', '그녀는 그래 하며 미소 지었다.'],
      ['Yeah, that sounds good.', '응, 그거 좋겠다.'],
    ]},
  ]},
  { w: 'year', p: 'n.', s: [
    { m: '해, 년', syn: [], ex: [
      ['We moved here last year.', '우리는 작년에 여기로 이사했다.'],
      ['A year has twelve months.', '1년은 열두 달이다.'],
      ['She is ten years old.', '그녀는 열 살이다.'],
    ]},
  ]},
  { w: 'yellow', p: 'adj.', s: [
    { m: '노란', syn: [], ex: [
      ['The banana is yellow.', '바나나는 노랗다.'],
      ['She wore a yellow dress.', '그녀는 노란 원피스를 입었다.'],
      ['The leaves turned yellow.', '잎이 노랗게 변했다.'],
    ]},
  ]},
  { w: 'yep', p: 'int.', s: [
    { m: '응, 그래 (구어)', syn: ['yes'], ex: [
      ['Yep, that is right.', '응, 맞아.'],
      ['He answered yep without looking.', '그는 보지도 않고 응이라고 답했다.'],
      ['Yep, I will be there.', '응, 나 갈게.'],
    ]},
  ]},
  { w: 'yes', p: 'int.', s: [
    { m: '네, 그렇다', syn: ['yeah'], ex: [
      ['Yes, I understand.', '네, 이해합니다.'],
      ['She said yes to the plan.', '그녀는 그 계획에 찬성했다.'],
      ['Yes, that is my bag.', '네, 그것이 제 가방입니다.'],
    ]},
  ]},
  { w: 'yesterday', p: 'n.', s: [
    { m: '어제', syn: [], ex: [
      ['It rained yesterday.', '어제 비가 왔다.'],
      ['I met her yesterday.', '나는 어제 그녀를 만났다.'],
      ['Yesterday was very busy.', '어제는 아주 바빴다.'],
    ]},
  ]},
  { w: 'you', p: 'pron.', s: [
    { m: '너, 당신', syn: [], ex: [
      ['You are my best friend.', '너는 내 가장 친한 친구다.'],
      ['Can you help me?', '나를 도와줄 수 있니?'],
      ['You should sleep early.', '너는 일찍 자야 한다.'],
    ]},
  ]},
  { w: 'young', p: 'adj.', s: [
    { m: '어린, 젊은', syn: [], ex: [
      ['She is too young to drive.', '그녀는 운전하기에 너무 어리다.'],
      ['Young people learn quickly.', '젊은 사람들은 빨리 배운다.'],
      ['He looks young for his age.', '그는 나이에 비해 젊어 보인다.'],
    ]},
  ]},
  { w: 'zoo', p: 'n.', s: [
    { m: '동물원', syn: [], ex: [
      ['We saw lions at the zoo.', '우리는 동물원에서 사자를 보았다.'],
      ['The zoo opens at nine.', '동물원은 9시에 문을 연다.'],
      ['She works at a zoo.', '그녀는 동물원에서 일한다.'],
    ]},
  ]},
], 'curriculum');
