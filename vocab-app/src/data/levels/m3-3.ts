/**
 * 중학교 3학년 레벨 3 — 수록 41 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M3_3 = defineLevel('m3-3', [
  { w: 'follow', p: 'v.', s: [
    { m: '따라가다', syn: ['come after', 'go after'], ex: [
      ['Follow me, please.', '저를 따라오세요.'],
      ['The dog followed him home.', '개가 그를 따라 집까지 왔다.'],
    ]},
    { m: '(규칙을) 따르다, 지키다', syn: ['obey', 'keep'], ex: [
      ['We must follow the rules.', '우리는 규칙을 지켜야 한다.'],
      ['Follow the directions carefully.', '지시를 주의 깊게 따라라.'],
    ]},
  ]},
  { w: 'foreign', p: 'adj.', s: [
    { m: '외국의', syn: [], ex: [
      ['She speaks two foreign languages.', '그녀는 외국어를 두 개 한다.'],
      ['Many foreign students study here.', '많은 외국 학생이 여기서 공부한다.'],
      ['He works for a foreign company.', '그는 외국 회사에서 일한다.'],
    ]},
  ]},
  { w: 'gate', p: 'n.', s: [
    { m: '문, 출입구', syn: ['entrance'], ex: [
      ['Meet me at the school gate.', '학교 정문에서 만나자.'],
      ['The gate was already closed.', '문은 이미 닫혀 있었다.'],
      ['He opened the gate for us.', '그는 우리를 위해 문을 열어 주었다.'],
    ]},
  ]},
  { w: 'gather', p: 'v.', s: [
    { m: '모으다, 모이다', syn: ['collect', 'come together'], ex: [
      ['People gathered in the square.', '사람들이 광장에 모였다.'],
      ['We gathered leaves for the art class.', '우리는 미술 시간을 위해 나뭇잎을 모았다.'],
      ['The family gathers every New Year.', '가족은 매년 새해에 모인다.'],
    ]},
  ]},
  { w: 'generation', p: 'n.', s: [
    { m: '세대', syn: ['age group'], ex: [
      ['Each generation has its own music.', '각 세대는 자기만의 음악이 있다.'],
      ['This tradition passed down through generations.', '이 전통은 여러 세대를 거쳐 전해졌다.'],
      ['The younger generation uses new apps.', '젊은 세대는 새로운 앱을 사용한다.'],
    ]},
  ]},
  { w: 'genetic', p: 'adj.', s: [
    { m: '유전의, 유전학의', syn: ['inherited'], ex: [
      ['Eye color is genetic.', '눈 색깔은 유전이다.'],
      ['The disease has a genetic cause.', '그 병은 유전적 원인이 있다.'],
      ['Genetic research has advanced quickly.', '유전 연구는 빠르게 발전했다.'],
    ]},
  ]},
  { w: 'gift', p: 'n.', s: [
    { m: '선물', syn: ['present'], ex: [
      ['This is a gift for you.', '이것은 너를 위한 선물이야.'],
      ['She got many gifts on her birthday.', '그녀는 생일에 선물을 많이 받았다.'],
      ['I wrapped the gift in blue paper.', '나는 선물을 파란 종이로 포장했다.'],
    ]},
  ]},
  { w: 'grade', p: 'n.', s: [
    { m: '학년', syn: ['year'], ex: [
      ['I am in the first grade of middle school.', '나는 중학교 1학년이다.'],
      ['She teaches second grade students.', '그녀는 2학년 학생들을 가르친다.'],
    ]},
    { m: '성적, 점수', syn: ['score'], ex: [
      ['He got a good grade on the test.', '그는 시험에서 좋은 성적을 받았다.'],
      ['My grades are getting better.', '내 성적이 좋아지고 있다.'],
    ]},
  ]},
  { w: 'gradually', p: 'adv.', s: [
    { m: '점차, 서서히', syn: ['slowly', 'step by step'], ex: [
      ['The weather gradually got warmer.', '날씨가 점차 따뜻해졌다.'],
      ['She gradually improved her English.', '그녀는 서서히 영어 실력을 키웠다.'],
      ['The noise gradually died away.', '소음이 점차 잦아들었다.'],
    ]},
  ]},
  { w: 'guarantee', p: 'v., n.', s: [
    { m: '보장하다; 보장', syn: ['promise', 'ensure'], ex: [
      ['Hard work does not guarantee success.', '노력이 성공을 보장하지는 않는다.'],
      ['The product comes with a two-year guarantee.', '그 제품은 2년 보증이 따른다.'],
      ['I guarantee you will enjoy it.', '네가 즐길 것이라고 장담한다.'],
    ]},
  ]},
  { w: 'guest', p: 'n.', s: [
    { m: '손님', syn: ['visitor'], ex: [
      ['We have a guest tonight.', '오늘 밤 손님이 온다.'],
      ['The guests arrived at six.', '손님들이 6시에 도착했다.'],
      ['She welcomed her guests warmly.', '그녀는 손님들을 따뜻하게 맞이했다.'],
    ]},
  ]},
  { w: 'guide', p: 'n., v.', s: [
    { m: '안내자, 안내하다', syn: ['lead'], ex: [
      ['Our guide showed us the old temple.', '안내인이 우리에게 옛 절을 보여 주었다.'],
      ['She guided us through the museum.', '그녀는 우리를 박물관 안으로 안내했다.'],
      ['This book is a good guide for beginners.', '이 책은 초보자를 위한 좋은 안내서다.'],
    ]},
  ]},
  { w: 'hall', p: 'n.', s: [
    { m: '복도, 회관, 강당', syn: ['corridor'], ex: [
      ['Do not run in the hall.', '복도에서 뛰지 마라.'],
      ['The concert was held in the city hall.', '콘서트는 시민 회관에서 열렸다.'],
      ['Students gathered in the hall.', '학생들이 강당에 모였다.'],
    ]},
  ]},
  { w: 'happen', p: 'v.', s: [
    { m: '일어나다, 발생하다', syn: ['occur', 'take place'], ex: [
      ['What happened to your leg?', '다리에 무슨 일이 있었니?'],
      ['The accident happened last night.', '그 사고는 어젯밤에 일어났다.'],
      ['Strange things are happening here.', '이곳에서 이상한 일들이 일어나고 있다.'],
    ]},
  ]},
  { w: 'harmful', p: 'adj.', s: [
    { m: '해로운', syn: ['damaging', 'bad for'], ex: [
      ['Too much sugar is harmful.', '너무 많은 설탕은 해롭다.'],
      ['Smoking is harmful to your lungs.', '흡연은 폐에 해롭다.'],
      ['These chemicals are harmful to fish.', '이 화학 물질은 물고기에 해롭다.'],
    ]},
  ]},
  { w: 'health', p: 'n.', s: [
    { m: '건강', syn: ['well-being'], ex: [
      ['Exercise is good for your health.', '운동은 건강에 좋다.'],
      ['My grandfather is in good health.', '할아버지는 건강하시다.'],
      ['Too much sugar harms your health.', '설탕을 너무 많이 먹으면 건강을 해친다.'],
    ]},
  ]},
  { w: 'hide', p: 'v.', s: [
    { m: '숨다, 숨기다', syn: ['conceal'], ex: [
      ['The cat hid under the bed.', '고양이가 침대 밑에 숨었다.'],
      ['Do not hide the truth from me.', '나에게 진실을 숨기지 마라.'],
      ['He is hiding behind the tree.', '그는 나무 뒤에 숨어 있다.'],
    ]},
  ]},
  { w: 'hole', p: 'n.', s: [
    { m: '구멍', syn: [], ex: [
      ['There is a hole in my sock.', '내 양말에 구멍이 났다.'],
      ['The dog dug a hole in the garden.', '개가 정원에 구멍을 팠다.'],
      ['Water came through the hole.', '구멍으로 물이 들어왔다.'],
    ]},
  ]},
  { w: 'huge', p: 'adj.', s: [
    { m: '거대한, 엄청난', syn: ['enormous', 'massive'], ex: [
      ['They live in a huge house.', '그들은 거대한 집에 산다.'],
      ['The concert drew a huge crowd.', '그 콘서트는 엄청난 인파를 모았다.'],
      ['There is a huge difference between them.', '그 둘 사이에는 엄청난 차이가 있다.'],
    ]},
  ]},
  { w: 'hurt', p: 'v.', s: [
    { m: '아프다, 다치게 하다', syn: ['injure', 'ache'], ex: [
      ['My leg hurts a lot.', '다리가 많이 아프다.'],
      ['He hurt his hand while cooking.', '그는 요리하다가 손을 다쳤다.'],
    ]},
    { m: '(마음을) 상하게 하다', syn: ['upset', 'offend'], ex: [
      ['Your words hurt her feelings.', '네 말이 그녀의 기분을 상하게 했다.'],
      ['I did not mean to hurt anyone.', '나는 누구도 상처 주려던 것이 아니었다.'],
    ]},
  ]},
  { w: 'identify', p: 'v.', s: [
    { m: '확인하다, 알아보다', syn: ['recognize', 'spot'], ex: [
      ['Can you identify the problem?', '문제를 파악할 수 있니?'],
      ['She identified the bird by its song.', '그녀는 새를 울음소리로 알아봤다.'],
      ['Police identified the driver.', '경찰이 운전자의 신원을 확인했다.'],
    ]},
  ]},
  { w: 'ignore', p: 'v.', s: [
    { m: '무시하다', syn: ['pay no attention to', 'overlook'], ex: [
      ["Don't ignore the warning.", '그 경고를 무시하지 마라.'],
      ['She ignored my message.', '그녀는 내 메시지를 무시했다.'],
      ['We cannot ignore this problem any longer.', '우리는 더 이상 이 문제를 무시할 수 없다.'],
    ]},
  ]},
  { w: 'ill', p: 'adj.', s: [
    { m: '아픈, 병든', syn: ['sick'], ex: [
      ['He was ill for a week.', '그는 일주일 동안 아팠다.'],
      ['She looks ill today.', '그녀는 오늘 아파 보인다.'],
      ['My grandfather became ill last winter.', '할아버지는 지난겨울에 병이 나셨다.'],
    ]},
  ]},
  { w: 'illustrate', p: 'v.', s: [
    { m: '설명하다, 예시하다', syn: ['show', 'demonstrate'], ex: [
      ['This example illustrates the point.', '이 예가 그 요점을 잘 보여 준다.'],
      ['Let me illustrate with a story.', '이야기로 설명해 볼게.'],
      ['The graph illustrates the change well.', '그 그래프는 변화를 잘 보여 준다.'],
    ]},
  ]},
  { w: 'imagine', p: 'v.', s: [
    { m: '상상하다', syn: ['picture', 'suppose'], ex: [
      ['Imagine a world without cars.', '자동차 없는 세상을 상상해 보라.'],
      ['I cannot imagine living there.', '나는 그곳에 사는 것을 상상할 수 없다.'],
      ['She imagined herself on stage.', '그녀는 무대 위의 자신을 상상했다.'],
    ]},
  ]},
  { w: 'improve', p: 'v.', s: [
    { m: '향상시키다, 나아지다', syn: ['get better', 'enhance'], ex: [
      ['I want to improve my English.', '나는 영어를 향상시키고 싶다.'],
      ['His health improved after surgery.', '그의 건강은 수술 후 나아졌다.'],
      ['Practice will improve your speed.', '연습하면 속도가 좋아질 것이다.'],
    ]},
  ]},
  { w: 'in addition to', p: 'phr.', s: [
    { m: '~에 더하여, ~뿐만 아니라', syn: ['besides', 'as well as'], ex: [
      ['In addition to math, she teaches science.', '수학뿐만 아니라 그녀는 과학도 가르친다.'],
      ['In addition to the fee, there is a tax.', '수수료에 더해 세금이 있다.'],
      ['He speaks Chinese in addition to English.', '그는 영어에 더해 중국어도 한다.'],
    ]},
  ]},
  { w: 'in spite of', p: 'phr.', s: [
    { m: '~에도 불구하고', syn: ['despite', 'regardless of'], ex: [
      ['In spite of the rain, we went out.', '비에도 불구하고 우리는 나갔다.'],
      ['He passed in spite of the difficulty.', '그는 어려움에도 불구하고 합격했다.'],
      ['She smiled in spite of her pain.', '그녀는 아픔에도 불구하고 미소 지었다.'],
    ]},
  ]},
  { w: 'in terms of', p: 'phr.', s: [
    { m: '~의 관점에서, ~ 면에서', syn: ['regarding', 'with respect to'], ex: [
      ['In terms of cost, it is better.', '비용의 관점에서 그것이 더 낫다.'],
      ['In terms of size, they are similar.', '크기 면에서 그들은 비슷하다.'],
      ['Think in terms of long-term results.', '장기적인 결과의 관점에서 생각해라.'],
    ]},
  ]},
  { w: 'include', p: 'v.', s: [
    { m: '포함하다', syn: ['contain', 'cover'], ex: [
      ['The price includes breakfast.', '그 가격은 아침 식사를 포함한다.'],
      ['The list includes ten names.', '그 목록에는 열 개의 이름이 들어 있다.'],
      ['Does the tour include lunch?', '그 투어에 점심이 포함되나요?'],
    ]},
  ]},
  { w: 'increase', p: 'v., n.', s: [
    { m: '증가하다, 늘리다', syn: ['rise', 'go up'], ex: [
      ['The number of visitors increased.', '방문객 수가 증가했다.'],
      ['We need to increase our speed.', '우리는 속도를 높여야 한다.'],
      ['There was an increase in sales.', '매출에 증가가 있었다.'],
    ]},
  ]},
  { w: 'indicate', p: 'v.', s: [
    { m: '나타내다, 가리키다', syn: ['show', 'point to'], ex: [
      ['The sign indicates the exit.', '그 표지판은 출구를 가리킨다.'],
      ['The results indicate a clear trend.', '그 결과는 뚜렷한 경향을 나타낸다.'],
      ['Red usually indicates danger.', '빨간색은 보통 위험을 나타낸다.'],
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
  { w: 'influence', p: 'n., v.', s: [
    { m: '영향; 영향을 주다', syn: ['effect', 'affect'], ex: [
      ['Friends influence our choices.', '친구는 우리의 선택에 영향을 준다.'],
      ['His teacher had a great influence on him.', '그의 선생님은 그에게 큰 영향을 주었다.'],
      ['Advertising influences what we buy.', '광고는 우리가 무엇을 사는지에 영향을 미친다.'],
    ]},
  ]},
  { w: 'injure', p: 'v.', s: [
    { m: '부상을 입히다, 다치게 하다', syn: ['hurt', 'wound'], ex: [
      ['He injured his knee.', '그는 무릎을 다쳤다.'],
      ['Two people were injured in the accident.', '그 사고로 두 명이 다쳤다.'],
      ['She injured her hand while cooking.', '그녀는 요리하다가 손을 다쳤다.'],
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
  { w: 'investigate', p: 'v.', s: [
    { m: '조사하다, 수사하다', syn: ['examine', 'look into'], ex: [
      ['Police investigated the case.', '경찰이 그 사건을 조사했다.'],
      ['Scientists are investigating the cause.', '과학자들이 원인을 조사하고 있다.'],
      ['We should investigate this further.', '우리는 이것을 더 조사해야 한다.'],
    ]},
  ]},
  { w: 'island', p: 'n.', s: [
    { m: '섬', syn: [], ex: [
      ['Jeju is a beautiful island.', '제주는 아름다운 섬이다.'],
      ['We took a boat to the island.', '우리는 배를 타고 섬에 갔다.'],
      ['Many birds live on that island.', '많은 새가 그 섬에 산다.'],
    ]},
  ]},
], 'curriculum');
