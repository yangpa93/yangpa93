/**
 * 중학교 1학년 레벨 3 어휘 33개.
 *
 * 선정 기준: 교육부 「기본 어휘 목록」 중 중학교 1학년 검정 교과서(동아·천재·YBM·미래엔·비상)에
 * 공통으로 등장하는 기초 어휘와, 중1 수준에서 반복 출제되는 기본 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M1_3 = defineLevel('m1-3', [
  { w: 'scared', p: 'adj.', s: [
    { m: '겁먹은, 무서워하는', syn: ['afraid', 'frightened'], ex: [
      ['The child looked scared.', '그 아이는 겁먹은 것처럼 보였다.'],
      ['I am scared of high places.', '나는 높은 곳을 무서워한다.'],
      ['She was scared by the loud noise.', '그녀는 큰 소리에 놀랐다.'],
    ]},
  ]},
  { w: 'share', p: 'v.', s: [
    { m: '나누다, 함께 쓰다', syn: ['split', 'divide'], ex: [
      ['I share a room with my brother.', '나는 형과 방을 함께 쓴다.'],
      ['Let’s share the pizza.', '피자를 나눠 먹자.'],
    ]},
    { m: '(생각을) 공유하다', syn: ['tell', 'pass on'], ex: [
      ['She shared her idea with the class.', '그녀는 자기 생각을 반 친구들과 나눴다.'],
      ['He shared the photo online.', '그는 그 사진을 온라인에 공유했다.'],
    ]},
  ]},
  { w: 'sick', p: 'adj.', s: [
    { m: '아픈, 병든', syn: ['ill', 'unwell'], ex: [
      ['He was sick yesterday.', '그는 어제 아팠다.'],
      ['She stayed home because she was sick.', '그녀는 아파서 집에 있었다.'],
      ['My dog got sick last week.', '내 개가 지난주에 아팠다.'],
    ]},
  ]},
  { w: 'solve', p: 'v.', s: [
    { m: '풀다, 해결하다', syn: ['work out', 'figure out'], ex: [
      ['Can you solve this puzzle?', '이 퍼즐을 풀 수 있니?'],
      ['We solved the problem in ten minutes.', '우리는 10분 만에 그 문제를 풀었다.'],
      ['Talking can solve many problems.', '대화는 많은 문제를 해결할 수 있다.'],
    ]},
  ]},
  { w: 'sometimes', p: 'adv.', s: [
    { m: '가끔, 때때로', syn: ['occasionally', 'at times'], ex: [
      ['Sometimes I walk to school.', '나는 가끔 학교에 걸어간다.'],
      ['She sometimes helps in the kitchen.', '그녀는 가끔 부엌일을 돕는다.'],
      ['Sometimes it snows in April.', '가끔 4월에 눈이 온다.'],
    ]},
  ]},
  { w: 'special', p: 'adj.', s: [
    { m: '특별한', syn: ['unusual', 'unique'], ex: [
      ['Today is a special day.', '오늘은 특별한 날이다.'],
      ['She has a special talent for music.', '그녀는 음악에 특별한 재능이 있다.'],
      ['We ate something special for dinner.', '우리는 저녁으로 특별한 것을 먹었다.'],
    ]},
  ]},
  { w: 'spend', p: 'v.', s: [
    { m: '(시간을) 보내다', syn: ['pass'], ex: [
      ['I spend two hours studying.', '나는 공부하는 데 두 시간을 쓴다.'],
      ['We spent the weekend at home.', '우리는 주말을 집에서 보냈다.'],
    ]},
    { m: '(돈을) 쓰다', syn: ['pay out'], ex: [
      ['He spent all his money on books.', '그는 돈을 전부 책에 썼다.'],
      ['Don’t spend too much on snacks.', '간식에 너무 많이 쓰지 마라.'],
    ]},
  ]},
  { w: 'strange', p: 'adj.', s: [
    { m: '이상한', syn: ['odd', 'weird'], ex: [
      ['I heard a strange sound.', '나는 이상한 소리를 들었다.'],
      ['It is strange that he did not come.', '그가 오지 않은 것은 이상하다.'],
    ]},
    { m: '낯선', syn: ['unfamiliar'], ex: [
      ['Everything looked strange in the new city.', '새 도시에서는 모든 것이 낯설어 보였다.'],
      ['Do not talk to strange people.', '낯선 사람과 이야기하지 마라.'],
    ]},
  ]},
  { w: 'strong', p: 'adj.', s: [
    { m: '강한, 튼튼한', syn: ['powerful', 'tough'], ex: [
      ['He has strong arms.', '그는 팔이 튼튼하다.'],
      ['A strong wind blew all night.', '강한 바람이 밤새 불었다.'],
      ['She has a strong will.', '그녀는 강한 의지를 가지고 있다.'],
    ]},
  ]},
  { w: 'surprised', p: 'adj.', s: [
    { m: '놀란', syn: ['amazed', 'shocked'], ex: [
      ['I was surprised at the news.', '나는 그 소식에 놀랐다.'],
      ['She looked surprised to see me.', '그녀는 나를 보고 놀란 듯했다.'],
      ['We were surprised by his answer.', '우리는 그의 대답에 놀랐다.'],
    ]},
  ]},
  { w: 'teach', p: 'v.', s: [
    { m: '가르치다', syn: ['show', 'instruct'], ex: [
      ['She teaches math.', '그녀는 수학을 가르친다.'],
      ['My father taught me to ride a bike.', '아버지가 나에게 자전거 타는 법을 가르쳐 주셨다.'],
      ['This story teaches an important lesson.', '이 이야기는 중요한 교훈을 가르쳐 준다.'],
    ]},
  ]},
  { w: 'thirsty', p: 'adj.', s: [
    { m: '목마른', syn: ['dry'], ex: [
      ["I'm thirsty. May I have water?", '목이 말라요. 물 좀 주시겠어요?'],
      ['Running makes me thirsty.', '달리면 목이 마르다.'],
      ['The plants look thirsty.', '식물들이 물이 필요해 보인다.'],
    ]},
  ]},
  { w: 'travel', p: 'v., n.', s: [
    { m: '여행하다; 여행', syn: ['journey', 'trip'], ex: [
      ['They travel every summer.', '그들은 여름마다 여행한다.'],
      ['I want to travel around the world.', '나는 세계 일주를 하고 싶다.'],
      ['Air travel is fast but expensive.', '항공 여행은 빠르지만 비싸다.'],
    ]},
  ]},
  { w: 'understand', p: 'v.', s: [
    { m: '이해하다', syn: ['get', 'follow'], ex: [
      ["I don't understand this word.", '나는 이 단어를 이해하지 못하겠다.'],
      ['Do you understand the question?', '질문을 이해했니?'],
      ['She understands how I feel.', '그녀는 내 기분을 이해한다.'],
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
  { w: 'weather', p: 'n.', s: [
    { m: '날씨', syn: ['climate'], ex: [
      ['The weather is nice today.', '오늘은 날씨가 좋다.'],
      ['We changed our plan because of the weather.', '우리는 날씨 때문에 계획을 바꿨다.'],
      ['What is the weather like in Jeju?', '제주도의 날씨는 어떠니?'],
    ]},
  ]},
  { w: 'wear', p: 'v.', s: [
    { m: '입다, 착용하다', syn: ['put on', 'have on'], ex: [
      ['You should wear a helmet.', '너는 헬멧을 써야 한다.'],
      ['She wore a blue dress to the party.', '그녀는 파티에 파란 원피스를 입었다.'],
      ['I wear glasses when I read.', '나는 책을 읽을 때 안경을 쓴다.'],
    ]},
  ]},
  { w: 'worry', p: 'v.', s: [
    { m: '걱정하다', syn: ['be anxious', 'fret'], ex: [
      ["Don't worry about the test.", '시험에 대해 걱정하지 마라.'],
      ['My mother worries about me too much.', '어머니는 나를 너무 걱정하신다.'],
      ['There is nothing to worry about.', '걱정할 것이 없다.'],
    ]},
  ]},
  { w: 'a lot of', p: 'phr.', s: [
    { m: '많은', syn: ['many', 'much', 'lots of'], ex: [
      ['There are a lot of books here.', '여기에 책이 많이 있다.'],
      ['She has a lot of homework today.', '그녀는 오늘 숙제가 많다.'],
      ['A lot of people came to the festival.', '많은 사람들이 축제에 왔다.'],
    ]},
  ]},
  { w: 'be good at', p: 'phr.', s: [
    { m: '~을 잘하다', syn: ['do well in'], ex: [
      ['She is good at singing.', '그녀는 노래를 잘한다.'],
      ['He is good at math but not at English.', '그는 수학은 잘하지만 영어는 못한다.'],
      ['You will be good at it with practice.', '연습하면 잘하게 될 것이다.'],
    ]},
  ]},
  { w: 'be interested in', p: 'phr.', s: [
    { m: '~에 관심이 있다', syn: ['care about'], ex: [
      ["I'm interested in science.", '나는 과학에 관심이 있다.'],
      ['She is interested in learning Spanish.', '그녀는 스페인어 배우는 데 관심이 있다.'],
      ['Are you interested in joining our club?', '우리 동아리에 들어올 생각 있니?'],
    ]},
  ]},
  { w: 'get up', p: 'phr.', s: [
    { m: '일어나다, 기상하다', syn: ['wake up', 'rise'], ex: [
      ['I get up at six every day.', '나는 매일 6시에 일어난다.'],
      ['He got up late this morning.', '그는 오늘 아침 늦게 일어났다.'],
      ['What time do you get up on Sundays?', '일요일에는 몇 시에 일어나니?'],
    ]},
  ]},
  { w: 'go to bed', p: 'phr.', s: [
    { m: '자러 가다', syn: ['turn in'], ex: [
      ['He goes to bed at ten.', '그는 10시에 자러 간다.'],
      ['Go to bed early before the exam.', '시험 전에는 일찍 자라.'],
      ['I went to bed after midnight.', '나는 자정이 지나서 잤다.'],
    ]},
  ]},
  { w: 'have to', p: 'phr.', s: [
    { m: '~해야 한다', syn: ['must', 'need to'], ex: [
      ['You have to wash your hands.', '너는 손을 씻어야 한다.'],
      ['I have to finish this today.', '나는 오늘 이것을 끝내야 한다.'],
      ['We had to wait for an hour.', '우리는 한 시간을 기다려야 했다.'],
    ]},
  ]},
  { w: 'look for', p: 'phr.', s: [
    { m: '~을 찾다', syn: ['search for', 'seek'], ex: [
      ["I'm looking for my keys.", '나는 열쇠를 찾고 있다.'],
      ['She is looking for a part-time job.', '그녀는 아르바이트를 찾고 있다.'],
      ['We looked for the cat all evening.', '우리는 저녁 내내 고양이를 찾았다.'],
    ]},
  ]},
  { w: 'take care of', p: 'phr.', s: [
    { m: '~을 돌보다', syn: ['look after', 'care for'], ex: [
      ['She takes care of her cat.', '그녀는 고양이를 돌본다.'],
      ['Please take care of yourself.', '몸 조심하세요.'],
      ['He took care of his sister all day.', '그는 하루 종일 여동생을 돌봤다.'],
    ]},
  ]},
  { w: 'take a walk', p: 'phr.', s: [
    { m: '산책하다', syn: ['go for a walk'], ex: [
      ['We take a walk after dinner.', '우리는 저녁 후에 산책한다.'],
      ['Let’s take a walk in the park.', '공원에서 산책하자.'],
      ['She took a walk to clear her mind.', '그녀는 머리를 식히려고 산책했다.'],
    ]},
  ]},
  { w: 'turn off', p: 'phr.', s: [
    { m: '(전원을) 끄다', syn: ['switch off', 'shut off'], ex: [
      ['Turn off the lights, please.', '불을 꺼 주세요.'],
      ['He turned off his phone during class.', '그는 수업 중에 휴대폰을 껐다.'],
      ['Remember to turn off the TV.', 'TV 끄는 것을 잊지 마라.'],
    ]},
  ]},
  { w: 'wake up', p: 'phr.', s: [
    { m: '깨다, 깨우다', syn: ['get up', 'awaken'], ex: [
      ['I woke up late this morning.', '나는 오늘 아침 늦게 깼다.'],
      ['Please wake me up at seven.', '7시에 나를 깨워 줘.'],
      ['The noise woke up the baby.', '그 소음이 아기를 깨웠다.'],
    ]},
  ]},
  { w: 'would like to', p: 'phr.', s: [
    { m: '~하고 싶다', syn: ['want to', 'wish to'], ex: [
      ['I would like to order pizza.', '피자를 주문하고 싶어요.'],
      ['She would like to join the trip.', '그녀는 그 여행에 함께 가고 싶어 한다.'],
      ['Would you like to come with us?', '우리와 함께 가시겠어요?'],
    ]},
  ]},
  { w: 'carry', p: 'v.', s: [
    { m: '나르다, 들고 가다', syn: ['bring', 'take'], ex: [
      ['He carried the heavy box.', '그는 무거운 상자를 날랐다.'],
      ['She carries an umbrella every day.', '그녀는 매일 우산을 들고 다닌다.'],
      ['Can you carry this bag for me?', '이 가방 좀 들어 줄 수 있니?'],
    ]},
  ]},
  { w: 'return', p: 'v.', s: [
    { m: '돌아오다, 돌아가다', syn: ['come back', 'go back'], ex: [
      ['They returned home late.', '그들은 늦게 집에 돌아왔다.'],
      ['She returned to Korea last month.', '그녀는 지난달 한국으로 돌아왔다.'],
    ]},
    { m: '돌려주다, 반납하다', syn: ['give back'], ex: [
      ['Please return the book by Friday.', '금요일까지 책을 반납해 주세요.'],
      ['He returned my pencil this morning.', '그는 오늘 아침 내 연필을 돌려주었다.'],
    ]},
  ]},
], 'curriculum');
