/**
 * 중학교 2학년 레벨 3 — 수록 35 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장), 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_3 = defineLevel('m2-3', [
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
  { w: 'accept', p: 'v.', s: [
    { m: '받아들이다, 수락하다', syn: ['take', 'agree to'], ex: [
      ['He accepted my apology.', '그는 내 사과를 받아들였다.'],
      ['She accepted the job offer.', '그녀는 그 일자리 제안을 수락했다.'],
      ['We must accept the result.', '우리는 그 결과를 받아들여야 한다.'],
    ]},
  ]},
  { w: 'according to', p: 'phr.', s: [
    { m: '~에 따르면', syn: ['as stated by', 'based on'], ex: [
      ['According to the report, sales rose.', '그 보고서에 따르면 매출이 올랐다.'],
      ['According to her, the test was easy.', '그녀에 따르면 그 시험은 쉬웠다.'],
      ['We acted according to the plan.', '우리는 계획에 따라 행동했다.'],
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
  { w: 'advantage', p: 'n.', s: [
    { m: '이점, 장점', syn: ['benefit', 'strength'], ex: [
      ['Small size is an advantage here.', '작은 크기가 여기서는 장점이다.'],
      ['Speaking two languages is a big advantage.', '두 언어를 하는 것은 큰 이점이다.'],
      ['Each method has its advantages.', '각 방법에는 나름의 장점이 있다.'],
    ]},
  ]},
  { w: 'adventure', p: 'n.', s: [
    { m: '모험', syn: ['journey'], ex: [
      ['The trip was a great adventure.', '그 여행은 멋진 모험이었다.'],
      ['He loves adventure stories.', '그는 모험 이야기를 좋아한다.'],
      ['We had an adventure in the forest.', '우리는 숲에서 모험을 했다.'],
    ]},
  ]},
  { w: 'advice', p: 'n.', s: [
    { m: '조언, 충고', syn: ['tip', 'guidance'], ex: [
      ['Thank you for your advice.', '조언해 주셔서 감사합니다.'],
      ['He gave me good advice about studying.', '그는 공부에 대해 좋은 조언을 해 주었다.'],
      ['I need some advice from a teacher.', '나는 선생님의 조언이 필요하다.'],
    ]},
  ]},
  { w: 'affect', p: 'v.', s: [
    { m: '영향을 미치다', syn: ['influence', 'have an effect on'], ex: [
      ['Sleep affects your mood.', '잠은 기분에 영향을 미친다.'],
      ['The weather affected our plans.', '날씨가 우리 계획에 영향을 미쳤다.'],
      ['Noise affects how well we study.', '소음은 우리가 얼마나 잘 공부하는지에 영향을 준다.'],
    ]},
  ]},
  { w: 'airport', p: 'n.', s: [
    { m: '공항', syn: [], ex: [
      ['My father works at the airport.', '우리 아버지는 공항에서 일하신다.'],
      ['We arrived at the airport early.', '우리는 공항에 일찍 도착했다.'],
      ['The airport was full of people.', '공항은 사람들로 가득했다.'],
    ]},
  ]},
  { w: 'allow', p: 'v.', s: [
    { m: '허락하다', syn: ['let', 'permit'], ex: [
      ['My parents allow me to play outside.', '부모님은 내가 밖에서 노는 것을 허락하신다.'],
      ['Pets are not allowed in this park.', '이 공원에는 반려동물이 허용되지 않는다.'],
      ['Allow me to explain.', '설명하게 해 주세요.'],
    ]},
  ]},
  { w: 'alter', p: 'v.', s: [
    { m: '바꾸다, 변경하다', syn: ['change', 'modify'], ex: [
      ['We altered the schedule slightly.', '우리는 일정을 약간 변경했다.'],
      ['Nothing can alter the past.', '어떤 것도 과거를 바꿀 수 없다.'],
      ['The dress was altered to fit her.', '그 옷은 그녀에게 맞게 수선되었다.'],
    ]},
  ]},
  { w: 'amount', p: 'n.', s: [
    { m: '양, 액수', syn: ['quantity', 'sum'], ex: [
      ['A large amount of data was lost.', '많은 양의 데이터가 사라졌다.'],
      ['Reduce the amount of salt you eat.', '먹는 소금의 양을 줄여라.'],
      ['The amount of homework doubled.', '숙제의 양이 두 배가 되었다.'],
    ]},
  ]},
  { w: 'announce', p: 'v.', s: [
    { m: '발표하다, 알리다', syn: ['declare', 'make known'], ex: [
      ['They announced the winner.', '그들은 우승자를 발표했다.'],
      ['The school announced a new schedule.', '학교는 새 일정을 발표했다.'],
      ['She announced her decision to everyone.', '그녀는 모두에게 자신의 결정을 알렸다.'],
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
    { m: '돌다, 돌리다', syn: ['rotate'], ex: [
      ['Turn right at the corner.', '모퉁이에서 오른쪽으로 도세요.'],
      ['She turned the key slowly.', '그녀는 열쇠를 천천히 돌렸다.'],
    ]},
    { m: '차례', syn: ['chance'], ex: [
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
  { w: 'twice', p: 'adv.', s: [
    { m: '두 번, 두 배로', syn: ['two times'], ex: [
      ['I read the letter twice.', '나는 그 편지를 두 번 읽었다.'],
      ['She goes to the gym twice a week.', '그녀는 일주일에 두 번 체육관에 간다.'],
      ['This box is twice as heavy.', '이 상자는 두 배 무겁다.'],
    ]},
  ]},
  { w: 'ugly', p: 'adj.', s: [
    { m: '못생긴, 보기 흉한', syn: [], ex: [
      ['The old building looks ugly.', '그 낡은 건물은 보기 흉하다.'],
      ['She thought the hat was ugly.', '그녀는 그 모자가 못생겼다고 생각했다.'],
      ['Do not call anyone ugly.', '누구에게도 못생겼다고 하지 마라.'],
    ]},
  ]},
  { w: 'understand', p: 'v.', s: [
    { m: '이해하다', syn: ['get', 'follow'], ex: [
      ["I don't understand this word.", '나는 이 단어를 이해하지 못하겠다.'],
      ['Do you understand the question?', '질문을 이해했니?'],
      ['She understands how I feel.', '그녀는 내 기분을 이해한다.'],
    ]},
  ]},
  { w: 'used to', p: 'phr.', s: [
    { m: '~하곤 했다', syn: ['would often'], ex: [
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
  { w: 'visit', p: 'v., n.', s: [
    { m: '방문하다; 방문', syn: ['call on', 'go to see'], ex: [
      ['We visit our grandparents often.', '우리는 조부모님을 자주 방문한다.'],
      ['They visited the museum last Sunday.', '그들은 지난 일요일에 박물관을 방문했다.'],
      ['Thank you for your visit.', '방문해 주셔서 감사합니다.'],
    ]},
  ]},
  { w: 'wait', p: 'v.', s: [
    { m: '기다리다', syn: ['hold on', 'stay'], ex: [
      ['Please wait a minute.', '잠시만 기다려 주세요.'],
      ['We waited for the bus in the rain.', '우리는 빗속에서 버스를 기다렸다.'],
      ['I can’t wait to see you.', '너를 빨리 보고 싶어.'],
    ]},
  ]},
  { w: 'wait for', p: 'phr.', s: [
    { m: '~을 기다리다', syn: ['await'], ex: [
      ['I waited for the bus for ten minutes.', '나는 10분 동안 버스를 기다렸다.'],
      ['She is waiting for her friend.', '그녀는 친구를 기다리고 있다.'],
      ['Please wait for me at the gate.', '정문에서 나를 기다려 줘.'],
    ]},
  ]},
  { w: 'wake up', p: 'phr.', s: [
    { m: '깨다, 깨우다', syn: ['get up', 'awaken'], ex: [
      ['I woke up late this morning.', '나는 오늘 아침 늦게 깼다.'],
      ['Please wake me up at seven.', '7시에 나를 깨워 줘.'],
      ['The noise woke up the baby.', '그 소음이 아기를 깨웠다.'],
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
    { m: '날씨', syn: ['climate'], ex: [
      ['The weather is nice today.', '오늘은 날씨가 좋다.'],
      ['We changed our plan because of the weather.', '우리는 날씨 때문에 계획을 바꿨다.'],
      ['What is the weather like in Jeju?', '제주도의 날씨는 어떠니?'],
    ]},
  ]},
  { w: 'weight', p: 'n.', s: [
    { m: '무게, 체중', syn: ['heaviness'], ex: [
      ['He lost some weight.', '그는 체중을 조금 줄였다.'],
      ['What is the weight of this box?', '이 상자의 무게는 얼마니?'],
      ['The bridge can hold a lot of weight.', '그 다리는 큰 무게를 견딜 수 있다.'],
    ]},
  ]},
  { w: 'worry', p: 'v.', s: [
    { m: '걱정하다', syn: ['be anxious', 'fret'], ex: [
      ["Don't worry about the test.", '시험에 대해 걱정하지 마라.'],
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
], 'curriculum');
