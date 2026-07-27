/**
 * 중학교 1학년 레벨 3 어휘 156개.
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
  { w: 'record', p: 'v., n.', s: [
    { m: '기록하다, 녹음하다', syn: ['write down'], ex: [
      ['She recorded the song on her phone.', '그녀는 휴대폰으로 그 노래를 녹음했다.'],
      ['Please record the results here.', '여기에 결과를 기록해 주세요.'],
    ]},
    { m: '기록, 최고 기록', syn: ['best score'], ex: [
      ['He broke the school record.', '그는 학교 기록을 깼다.'],
      ['The teacher keeps a record of our grades.', '선생님은 우리 성적 기록을 보관하신다.'],
    ]},
  ]},
  { w: 'relax', p: 'v.', s: [
    { m: '쉬다, 긴장을 풀다', syn: ['rest'], ex: [
      ['I relax by listening to music.', '나는 음악을 들으며 쉰다.'],
      ['She relaxed on the sofa after work.', '그녀는 일 후에 소파에서 쉬었다.'],
      ['Relax, everything will be fine.', '긴장 풀어, 다 잘될 거야.'],
    ]},
  ]},
  { w: 'repair', p: 'v.', s: [
    { m: '수리하다, 고치다', syn: ['fix', 'mend'], ex: [
      ['He repaired my bicycle.', '그는 내 자전거를 고쳐 주었다.'],
      ['The roof needs to be repaired.', '지붕을 수리해야 한다.'],
      ['She is repairing the old chair.', '그녀는 낡은 의자를 고치고 있다.'],
    ]},
  ]},
  { w: 'reply', p: 'v., n.', s: [
    { m: '대답하다, 답장하다', syn: ['answer', 'respond'], ex: [
      ['She replied to my email quickly.', '그녀는 내 이메일에 빠르게 답장했다.'],
      ['He did not reply to my question.', '그는 내 질문에 답하지 않았다.'],
      ['I am waiting for her reply.', '나는 그녀의 답장을 기다리고 있다.'],
    ]},
  ]},
  { w: 'report', p: 'n., v.', s: [
    { m: '보고서, 보고하다', syn: ['tell'], ex: [
      ['I have to write a report about animals.', '나는 동물에 관한 보고서를 써야 한다.'],
      ['She reported the accident to the police.', '그녀는 사고를 경찰에 신고했다.'],
      ['The report was five pages long.', '그 보고서는 다섯 쪽 분량이었다.'],
    ]},
  ]},
  { w: 'rest', p: 'n., v.', s: [
    { m: '휴식, 쉬다', syn: ['break'], ex: [
      ['You need some rest.', '너는 휴식이 좀 필요하다.'],
      ['Let us rest for ten minutes.', '10분만 쉬자.'],
    ]},
    { m: '나머지', syn: ['remainder'], ex: [
      ['I will do the rest tomorrow.', '나머지는 내일 할게.'],
      ['The rest of the students went home.', '나머지 학생들은 집에 갔다.'],
    ]},
  ]},
  { w: 'rich', p: 'adj.', s: [
    { m: '부유한, 부자인', syn: ['wealthy'], ex: [
      ['He became rich after many years.', '그는 여러 해 뒤에 부자가 되었다.'],
      ['Rich or poor, everyone needs friends.', '부자든 가난하든 누구나 친구가 필요하다.'],
    ]},
    { m: '풍부한', syn: ['full of'], ex: [
      ['Milk is rich in calcium.', '우유는 칼슘이 풍부하다.'],
      ['This country is rich in culture.', '이 나라는 문화가 풍부하다.'],
    ]},
  ]},
  { w: 'ride', p: 'v.', s: [
    { m: '타다', syn: [], ex: [
      ['I ride the bus to school.', '나는 버스를 타고 학교에 간다.'],
      ['She rode a horse for the first time.', '그녀는 처음으로 말을 탔다.'],
      ['He is riding his bicycle in the park.', '그는 공원에서 자전거를 타고 있다.'],
    ]},
  ]},
  { w: 'ring', p: 'v., n.', s: [
    { m: '(종·전화가) 울리다', syn: ['sound'], ex: [
      ['The bell rings at nine.', '종이 9시에 울린다.'],
      ['My phone rang during the class.', '수업 중에 내 전화가 울렸다.'],
    ]},
    { m: '반지', syn: [], ex: [
      ['She wears a silver ring.', '그녀는 은반지를 낀다.'],
      ['He gave her a ring as a gift.', '그는 그녀에게 반지를 선물로 주었다.'],
    ]},
  ]},
  { w: 'river', p: 'n.', s: [
    { m: '강', syn: [], ex: [
      ['The river runs through the city.', '그 강은 도시를 가로질러 흐른다.'],
      ['We swam in the river last summer.', '우리는 지난여름에 강에서 수영했다.'],
      ['This river is very clean.', '이 강은 아주 깨끗하다.'],
    ]},
  ]},
  { w: 'road', p: 'n.', s: [
    { m: '길, 도로', syn: ['street'], ex: [
      ['Be careful when you cross the road.', '길을 건널 때 조심해라.'],
      ['This road leads to the beach.', '이 길은 해변으로 이어진다.'],
      ['The road was wet after the rain.', '비가 온 뒤 도로가 젖어 있었다.'],
    ]},
  ]},
  { w: 'rock', p: 'n.', s: [
    { m: '바위, 돌', syn: ['stone'], ex: [
      ['He sat on a large rock.', '그는 큰 바위에 앉았다.'],
      ['The children threw rocks into the water.', '아이들이 물에 돌을 던졌다.'],
      ['A rock fell from the mountain.', '산에서 바위가 떨어졌다.'],
    ]},
  ]},
  { w: 'roof', p: 'n.', s: [
    { m: '지붕', syn: [], ex: [
      ['The roof of our house is red.', '우리 집 지붕은 빨갛다.'],
      ['Snow covered the roof.', '눈이 지붕을 덮었다.'],
      ['A bird sat on the roof.', '새 한 마리가 지붕에 앉았다.'],
    ]},
  ]},
  { w: 'round', p: 'adj.', s: [
    { m: '둥근', syn: ['circular'], ex: [
      ['The table is round.', '그 탁자는 둥글다.'],
      ['The earth is round.', '지구는 둥글다.'],
      ['She wore round glasses.', '그녀는 둥근 안경을 썼다.'],
    ]},
  ]},
  { w: 'run', p: 'v.', s: [
    { m: '달리다, 뛰다', syn: ['dash'], ex: [
      ['He runs every morning.', '그는 매일 아침 달린다.'],
      ['She ran to catch the bus.', '그녀는 버스를 타려고 뛰었다.'],
    ]},
    { m: '운영하다', syn: ['manage'], ex: [
      ['My uncle runs a small shop.', '우리 삼촌은 작은 가게를 운영한다.'],
      ['They run a cooking class on Sundays.', '그들은 일요일에 요리 교실을 운영한다.'],
    ]},
  ]},
  { w: 'sad', p: 'adj.', s: [
    { m: '슬픈', syn: ['unhappy'], ex: [
      ['The movie made me sad.', '그 영화는 나를 슬프게 했다.'],
      ['She looked sad this morning.', '그녀는 오늘 아침 슬퍼 보였다.'],
      ['It is a sad story.', '그것은 슬픈 이야기다.'],
    ]},
  ]},
  { w: 'salt', p: 'n.', s: [
    { m: '소금', syn: [], ex: [
      ['Add a little salt to the soup.', '국에 소금을 조금 넣어라.'],
      ['Too much salt is bad for health.', '소금을 너무 많이 먹으면 건강에 나쁘다.'],
      ['Sea water contains salt.', '바닷물에는 소금이 들어 있다.'],
    ]},
  ]},
  { w: 'sand', p: 'n.', s: [
    { m: '모래', syn: [], ex: [
      ['The children played in the sand.', '아이들이 모래에서 놀았다.'],
      ['The sand was hot under my feet.', '모래가 발밑에서 뜨거웠다.'],
      ['We built a castle out of sand.', '우리는 모래로 성을 만들었다.'],
    ]},
  ]},
  { w: 'science', p: 'n.', s: [
    { m: '과학', syn: [], ex: [
      ['Science is my favorite subject.', '과학은 내가 제일 좋아하는 과목이다.'],
      ['She wants to study science in college.', '그녀는 대학에서 과학을 공부하고 싶어 한다.'],
      ['Science helps us understand nature.', '과학은 우리가 자연을 이해하도록 돕는다.'],
    ]},
  ]},
  { w: 'score', p: 'n., v.', s: [
    { m: '점수, 득점하다', syn: ['point'], ex: [
      ['My score on the test was high.', '내 시험 점수는 높았다.'],
      ['He scored two goals in the game.', '그는 경기에서 두 골을 넣었다.'],
      ['The final score was three to one.', '최종 점수는 3 대 1이었다.'],
    ]},
  ]},
  { w: 'season', p: 'n.', s: [
    { m: '계절, 철', syn: [], ex: [
      ['Spring is my favorite season.', '봄은 내가 제일 좋아하는 계절이다.'],
      ['Korea has four seasons.', '한국에는 사계절이 있다.'],
      ['This fruit is in season now.', '이 과일은 지금이 제철이다.'],
    ]},
  ]},
  { w: 'seat', p: 'n.', s: [
    { m: '자리, 좌석', syn: ['place to sit'], ex: [
      ['Please take a seat.', '자리에 앉으세요.'],
      ['There are no seats left.', '남은 자리가 없다.'],
      ['She gave her seat to an old man.', '그녀는 노인에게 자리를 양보했다.'],
    ]},
  ]},
  { w: 'secret', p: 'n., adj.', s: [
    { m: '비밀, 비밀의', syn: ['hidden'], ex: [
      ['Can you keep a secret?', '비밀을 지킬 수 있니?'],
      ['She told me her secret.', '그녀는 나에게 비밀을 말해 주었다.'],
      ['They met in a secret place.', '그들은 비밀 장소에서 만났다.'],
    ]},
  ]},
  { w: 'seem', p: 'v.', s: [
    { m: '~인 것 같다, ~해 보이다', syn: ['appear'], ex: [
      ['She seems tired today.', '그녀는 오늘 피곤해 보인다.'],
      ['It seems like a good idea.', '그것은 좋은 생각인 것 같다.'],
      ['He seemed surprised at the news.', '그는 그 소식에 놀란 것 같았다.'],
    ]},
  ]},
  { w: 'sell', p: 'v.', s: [
    { m: '팔다', syn: [], ex: [
      ['They sell fresh bread here.', '그들은 여기서 신선한 빵을 판다.'],
      ['He sold his old bicycle.', '그는 낡은 자전거를 팔았다.'],
      ['The shop is selling winter clothes.', '그 가게는 겨울옷을 팔고 있다.'],
    ]},
  ]},
  { w: 'send', p: 'v.', s: [
    { m: '보내다', syn: ['mail'], ex: [
      ['I will send you a message tonight.', '오늘 밤에 메시지를 보낼게.'],
      ['She sent a card to her teacher.', '그녀는 선생님께 카드를 보냈다.'],
      ['He is sending the package now.', '그는 지금 소포를 보내고 있다.'],
    ]},
  ]},
  { w: 'sentence', p: 'n.', s: [
    { m: '문장', syn: [], ex: [
      ['Write a sentence with this word.', '이 단어로 문장을 하나 쓰세요.'],
      ['The sentence is too long.', '그 문장은 너무 길다.'],
      ['She read the first sentence aloud.', '그녀는 첫 문장을 소리 내어 읽었다.'],
    ]},
  ]},
  { w: 'serve', p: 'v.', s: [
    { m: '(음식을) 내다, 제공하다', syn: ['provide'], ex: [
      ['They serve breakfast until ten.', '그들은 10시까지 아침을 제공한다.'],
      ['She served tea to the guests.', '그녀는 손님들에게 차를 내었다.'],
      ['This restaurant serves Korean food.', '이 식당은 한식을 낸다.'],
    ]},
  ]},
  { w: 'set', p: 'v.', s: [
    { m: '놓다, 차리다, 정하다', syn: ['put'], ex: [
      ['Please set the table for dinner.', '저녁 식탁을 차려 주세요.'],
      ['She set the box on the floor.', '그녀는 상자를 바닥에 놓았다.'],
      ['We set a date for the meeting.', '우리는 회의 날짜를 정했다.'],
    ]},
  ]},
  { w: 'shape', p: 'n.', s: [
    { m: '모양, 형태', syn: ['form'], ex: [
      ['The cloud has a strange shape.', '그 구름은 이상한 모양이다.'],
      ['Draw a shape on the paper.', '종이에 도형을 하나 그려라.'],
      ['The cookies are in the shape of stars.', '쿠키가 별 모양이다.'],
    ]},
  ]},
  { w: 'sharp', p: 'adj.', s: [
    { m: '날카로운', syn: [], ex: [
      ['Be careful, the knife is sharp.', '조심해, 칼이 날카로워.'],
      ['She cut the paper with a sharp blade.', '그녀는 날카로운 칼날로 종이를 잘랐다.'],
      ['He has sharp eyes.', '그는 눈이 예리하다.'],
    ]},
  ]},
  { w: 'shine', p: 'v.', s: [
    { m: '빛나다, 비추다', syn: ['glow'], ex: [
      ['The sun is shining brightly.', '해가 밝게 빛나고 있다.'],
      ['Her eyes shone with joy.', '그녀의 눈이 기쁨으로 빛났다.'],
      ['Stars shine at night.', '별은 밤에 빛난다.'],
    ]},
  ]},
  { w: 'ship', p: 'n.', s: [
    { m: '배, 선박', syn: ['boat'], ex: [
      ['The ship left the port at dawn.', '배는 새벽에 항구를 떠났다.'],
      ['We traveled by ship.', '우리는 배로 여행했다.'],
      ['That ship carries cars.', '저 배는 자동차를 실어 나른다.'],
    ]},
  ]},
  { w: 'shop', p: 'n., v.', s: [
    { m: '가게, 쇼핑하다', syn: ['store'], ex: [
      ['There is a flower shop near here.', '이 근처에 꽃 가게가 있다.'],
      ['She shops online every weekend.', '그녀는 주말마다 온라인에서 쇼핑한다.'],
      ['The shop opens at nine.', '그 가게는 9시에 문을 연다.'],
    ]},
  ]},
  { w: 'short', p: 'adj.', s: [
    { m: '짧은', syn: ['brief'], ex: [
      ['She has short hair.', '그녀는 머리가 짧다.'],
      ['We took a short break.', '우리는 짧게 쉬었다.'],
      ['The meeting was short.', '회의는 짧았다.'],
    ]},
  ]},
  { w: 'shout', p: 'v.', s: [
    { m: '소리치다, 외치다', syn: ['yell', 'cry out'], ex: [
      ['Do not shout in the classroom.', '교실에서 소리치지 마라.'],
      ['He shouted for help.', '그는 도와달라고 소리쳤다.'],
      ['She is shouting at the players.', '그녀는 선수들에게 외치고 있다.'],
    ]},
  ]},
  { w: 'show', p: 'v., n.', s: [
    { m: '보여 주다', syn: ['display'], ex: [
      ['Show me your notebook.', '네 공책을 보여 줘.'],
      ['He showed us the way to the station.', '그는 우리에게 역으로 가는 길을 알려 주었다.'],
    ]},
    { m: '공연, 프로그램', syn: ['program'], ex: [
      ['The show starts at seven.', '공연은 7시에 시작한다.'],
      ['We watched a magic show.', '우리는 마술 공연을 보았다.'],
    ]},
  ]},
  { w: 'shy', p: 'adj.', s: [
    { m: '수줍은, 부끄러워하는', syn: ['timid'], ex: [
      ['He is too shy to speak in class.', '그는 너무 수줍어서 수업에서 말을 못 한다.'],
      ['She was shy at first.', '그녀는 처음에는 수줍어했다.'],
      ['The shy boy stood behind his mother.', '수줍은 소년은 어머니 뒤에 서 있었다.'],
    ]},
  ]},
  { w: 'sign', p: 'n., v.', s: [
    { m: '표지판, 표시', syn: ['mark'], ex: [
      ['The sign says the road is closed.', '표지판에 길이 막혔다고 쓰여 있다.'],
      ['Follow the signs to the exit.', '출구 표지를 따라가라.'],
    ]},
    { m: '서명하다', syn: [], ex: [
      ['Please sign your name here.', '여기에 서명해 주세요.'],
      ['He signed the letter and sent it.', '그는 편지에 서명하고 부쳤다.'],
    ]},
  ]},
  { w: 'silent', p: 'adj.', s: [
    { m: '조용한, 침묵하는', syn: ['quiet'], ex: [
      ['The class became silent.', '교실이 조용해졌다.'],
      ['He stayed silent for a long time.', '그는 오랫동안 침묵했다.'],
      ['The night was silent and dark.', '밤은 고요하고 어두웠다.'],
    ]},
  ]},
  { w: 'simple', p: 'adj.', s: [
    { m: '간단한, 단순한', syn: ['easy', 'plain'], ex: [
      ['The rule is very simple.', '그 규칙은 아주 간단하다.'],
      ['She lives a simple life.', '그녀는 단순한 삶을 산다.'],
      ['Here is a simple way to solve it.', '그것을 푸는 간단한 방법이 있다.'],
    ]},
  ]},
  { w: 'sing', p: 'v.', s: [
    { m: '노래하다', syn: [], ex: [
      ['She sings very well.', '그녀는 노래를 아주 잘한다.'],
      ['We sang a song together.', '우리는 함께 노래를 불렀다.'],
      ['Birds are singing in the tree.', '새들이 나무에서 노래하고 있다.'],
    ]},
  ]},
  { w: 'sit', p: 'v.', s: [
    { m: '앉다', syn: ['take a seat'], ex: [
      ['Please sit next to me.', '내 옆에 앉아 주세요.'],
      ['He sat quietly in the corner.', '그는 구석에 조용히 앉아 있었다.'],
      ['She is sitting on the bench.', '그녀는 벤치에 앉아 있다.'],
    ]},
  ]},
  { w: 'size', p: 'n.', s: [
    { m: '크기, 치수', syn: [], ex: [
      ['What size do you wear?', '어떤 치수를 입으시나요?'],
      ['The two rooms are the same size.', '두 방은 크기가 같다.'],
      ['This shirt is the wrong size.', '이 셔츠는 치수가 안 맞는다.'],
    ]},
  ]},
  { w: 'sky', p: 'n.', s: [
    { m: '하늘', syn: [], ex: [
      ['The sky is clear today.', '오늘 하늘이 맑다.'],
      ['Birds flew across the sky.', '새들이 하늘을 가로질러 날았다.'],
      ['The sky turned dark before the storm.', '폭풍 전에 하늘이 어두워졌다.'],
    ]},
  ]},
  { w: 'sleep', p: 'v., n.', s: [
    { m: '자다, 잠', syn: ['rest'], ex: [
      ['I sleep eight hours every night.', '나는 매일 밤 여덟 시간 잔다.'],
      ['He slept well last night.', '그는 어젯밤에 잘 잤다.'],
      ['The baby is sleeping now.', '아기가 지금 자고 있다.'],
    ]},
  ]},
  { w: 'slow', p: 'adj.', s: [
    { m: '느린', syn: [], ex: [
      ['This computer is very slow.', '이 컴퓨터는 아주 느리다.'],
      ['He is a slow reader.', '그는 읽는 속도가 느리다.'],
      ['The bus was slow because of traffic.', '차가 막혀서 버스가 느렸다.'],
    ]},
  ]},
  { w: 'smart', p: 'adj.', s: [
    { m: '똑똑한, 영리한', syn: ['clever', 'bright'], ex: [
      ['She is a smart student.', '그녀는 똑똑한 학생이다.'],
      ['That was a smart choice.', '그것은 현명한 선택이었다.'],
      ['Dogs are smart animals.', '개는 영리한 동물이다.'],
    ]},
  ]},
  { w: 'smell', p: 'v., n.', s: [
    { m: '냄새가 나다, 냄새', syn: ['scent'], ex: [
      ['The flowers smell sweet.', '그 꽃들은 향기롭다.'],
      ['I smell something burning.', '뭔가 타는 냄새가 난다.'],
      ['The smell of bread filled the kitchen.', '빵 냄새가 부엌에 가득했다.'],
    ]},
  ]},
  { w: 'smile', p: 'v., n.', s: [
    { m: '미소 짓다, 미소', syn: [], ex: [
      ['She smiled at me kindly.', '그녀는 나에게 상냥하게 미소 지었다.'],
      ['He has a warm smile.', '그는 따뜻한 미소를 가졌다.'],
      ['The baby is smiling.', '아기가 미소 짓고 있다.'],
    ]},
  ]},
  { w: 'snow', p: 'n., v.', s: [
    { m: '눈, 눈이 오다', syn: [], ex: [
      ['The snow covered the whole town.', '눈이 온 마을을 덮었다.'],
      ['It snowed heavily last night.', '어젯밤에 눈이 많이 왔다.'],
      ['Children love playing in the snow.', '아이들은 눈에서 노는 것을 좋아한다.'],
    ]},
  ]},
  { w: 'soft', p: 'adj.', s: [
    { m: '부드러운', syn: ['gentle'], ex: [
      ['This pillow is very soft.', '이 베개는 아주 부드럽다.'],
      ['She spoke in a soft voice.', '그녀는 부드러운 목소리로 말했다.'],
      ['The cat has soft fur.', '그 고양이는 부드러운 털을 가졌다.'],
    ]},
  ]},
  { w: 'sound', p: 'n., v.', s: [
    { m: '소리', syn: ['noise'], ex: [
      ['I heard a strange sound.', '나는 이상한 소리를 들었다.'],
      ['The sound of rain is nice.', '빗소리는 좋다.'],
    ]},
    { m: '~처럼 들리다', syn: ['seem'], ex: [
      ['That sounds like a good plan.', '그것은 좋은 계획처럼 들린다.'],
      ['She sounded tired on the phone.', '그녀는 전화로 피곤한 목소리였다.'],
    ]},
  ]},
  { w: 'south', p: 'n., adj.', s: [
    { m: '남쪽', syn: [], ex: [
      ['Birds fly south in winter.', '새들은 겨울에 남쪽으로 날아간다.'],
      ['The town is in the south of the country.', '그 마을은 나라의 남쪽에 있다.'],
      ['My window faces south.', '내 창문은 남쪽을 향해 있다.'],
    ]},
  ]},
  { w: 'space', p: 'n.', s: [
    { m: '공간, 자리', syn: ['room'], ex: [
      ['There is not enough space in this box.', '이 상자에는 공간이 충분하지 않다.'],
      ['We need more space for the desks.', '책상을 놓을 자리가 더 필요하다.'],
    ]},
    { m: '우주', syn: ['the universe'], ex: [
      ['He dreams of traveling in space.', '그는 우주 여행을 꿈꾼다.'],
      ['There is no air in space.', '우주에는 공기가 없다.'],
    ]},
  ]},
  { w: 'speak', p: 'v.', s: [
    { m: '말하다', syn: ['talk'], ex: [
      ['She speaks three languages.', '그녀는 세 개 언어를 한다.'],
      ['He spoke slowly and clearly.', '그는 천천히 또렷하게 말했다.'],
      ['Please speak louder.', '더 크게 말해 주세요.'],
    ]},
  ]},
  { w: 'speech', p: 'n.', s: [
    { m: '연설, 말', syn: ['talk'], ex: [
      ['She gave a speech at the festival.', '그녀는 축제에서 연설했다.'],
      ['His speech was short but powerful.', '그의 연설은 짧지만 강력했다.'],
      ['I am nervous about my speech.', '나는 연설이 걱정된다.'],
    ]},
  ]},
  { w: 'speed', p: 'n.', s: [
    { m: '속도', syn: ['rate'], ex: [
      ['The car increased its speed.', '차가 속도를 높였다.'],
      ['Please reduce your speed here.', '여기서는 속도를 줄여 주세요.'],
      ['He ran at full speed.', '그는 전속력으로 달렸다.'],
    ]},
  ]},
  { w: 'spell', p: 'v.', s: [
    { m: '철자를 쓰다', syn: [], ex: [
      ['How do you spell your name?', '이름 철자가 어떻게 되나요?'],
      ['She spelled the word correctly.', '그녀는 그 단어의 철자를 바르게 썼다.'],
      ['I always spell this word wrong.', '나는 늘 이 단어의 철자를 틀린다.'],
    ]},
  ]},
  { w: 'spring', p: 'n.', s: [
    { m: '봄', syn: [], ex: [
      ['Flowers bloom in spring.', '봄에 꽃이 핀다.'],
      ['We plant trees every spring.', '우리는 매년 봄에 나무를 심는다.'],
      ['Spring is warm and bright.', '봄은 따뜻하고 밝다.'],
    ]},
  ]},
  { w: 'stand', p: 'v.', s: [
    { m: '서다, 서 있다', syn: ['get up'], ex: [
      ['Please stand up.', '일어서 주세요.'],
      ['He stood by the window.', '그는 창가에 서 있었다.'],
      ['She is standing in line.', '그녀는 줄을 서 있다.'],
    ]},
  ]},
  { w: 'star', p: 'n.', s: [
    { m: '별', syn: [], ex: [
      ['We counted the stars last night.', '우리는 어젯밤 별을 세었다.'],
      ['The star is very far away.', '그 별은 아주 멀리 있다.'],
      ['Stars are hard to see in the city.', '도시에서는 별을 보기 어렵다.'],
    ]},
  ]},
  { w: 'start', p: 'v.', s: [
    { m: '시작하다', syn: ['begin'], ex: [
      ['The class starts at nine.', '수업은 9시에 시작한다.'],
      ['She started learning Chinese.', '그녀는 중국어를 배우기 시작했다.'],
      ['It is starting to rain.', '비가 오기 시작하고 있다.'],
    ]},
  ]},
  { w: 'station', p: 'n.', s: [
    { m: '역, 정거장', syn: [], ex: [
      ['Meet me at the subway station.', '지하철역에서 만나자.'],
      ['The station is crowded in the morning.', '역은 아침에 붐빈다.'],
      ['We got off at the next station.', '우리는 다음 역에서 내렸다.'],
    ]},
  ]},
  { w: 'stay', p: 'v.', s: [
    { m: '머무르다, 있다', syn: ['remain'], ex: [
      ['We stayed at a hotel near the beach.', '우리는 해변 근처 호텔에 묵었다.'],
      ['Please stay here until I come back.', '내가 돌아올 때까지 여기 있어 줘.'],
      ['He is staying with his grandmother.', '그는 할머니 댁에 머물고 있다.'],
    ]},
  ]},
  { w: 'steal', p: 'v.', s: [
    { m: '훔치다', syn: ['take without permission'], ex: [
      ['Someone stole my umbrella.', '누군가 내 우산을 훔쳐 갔다.'],
      ['Do not steal other peoples things.', '남의 물건을 훔치지 마라.'],
      ['The thief was stealing from the shop.', '도둑이 가게에서 물건을 훔치고 있었다.'],
    ]},
  ]},
  { w: 'step', p: 'n.', s: [
    { m: '걸음, 단계', syn: ['stage'], ex: [
      ['Take one step forward.', '한 걸음 앞으로 나오세요.'],
      ['The first step is the hardest.', '첫 단계가 가장 어렵다.'],
      ['Follow these steps carefully.', '이 단계들을 주의 깊게 따라 하세요.'],
    ]},
  ]},
  { w: 'stone', p: 'n.', s: [
    { m: '돌', syn: ['rock'], ex: [
      ['The wall is made of stone.', '그 벽은 돌로 만들어졌다.'],
      ['He threw a stone into the river.', '그는 강에 돌을 던졌다.'],
      ['There are small stones on the path.', '길에 작은 돌들이 있다.'],
    ]},
  ]},
  { w: 'stop', p: 'v.', s: [
    { m: '멈추다, 그만두다', syn: ['halt', 'quit'], ex: [
      ['The bus stopped in front of the school.', '버스가 학교 앞에 멈췄다.'],
      ['Please stop talking.', '그만 이야기해 주세요.'],
      ['The rain is stopping now.', '비가 지금 그치고 있다.'],
    ]},
  ]},
  { w: 'store', p: 'n., v.', s: [
    { m: '가게, 상점', syn: ['shop'], ex: [
      ['I bought milk at the store.', '나는 가게에서 우유를 샀다.'],
      ['The store closes at ten.', '그 가게는 10시에 문을 닫는다.'],
    ]},
    { m: '보관하다, 저장하다', syn: ['keep'], ex: [
      ['We store rice in this room.', '우리는 이 방에 쌀을 보관한다.'],
      ['She stored the photos on her computer.', '그녀는 사진을 컴퓨터에 저장했다.'],
    ]},
  ]},
  { w: 'storm', p: 'n.', s: [
    { m: '폭풍, 폭풍우', syn: [], ex: [
      ['The storm broke many trees.', '폭풍이 많은 나무를 쓰러뜨렸다.'],
      ['We stayed inside during the storm.', '우리는 폭풍이 부는 동안 안에 있었다.'],
      ['A big storm is coming tonight.', '오늘 밤 큰 폭풍이 온다.'],
    ]},
  ]},
  { w: 'story', p: 'n.', s: [
    { m: '이야기', syn: ['tale'], ex: [
      ['Grandmother told us a story.', '할머니가 우리에게 이야기를 들려주셨다.'],
      ['This story is about a brave girl.', '이 이야기는 용감한 소녀에 관한 것이다.'],
      ['I read three stories last night.', '나는 어젯밤에 이야기 세 편을 읽었다.'],
    ]},
  ]},
  { w: 'straight', p: 'adj., adv.', s: [
    { m: '곧은, 곧장', syn: ['direct'], ex: [
      ['Go straight and turn left.', '곧장 가다가 왼쪽으로 도세요.'],
      ['Draw a straight line here.', '여기에 직선을 그으세요.'],
      ['He went straight home after school.', '그는 방과 후 곧장 집에 갔다.'],
    ]},
  ]},
  { w: 'street', p: 'n.', s: [
    { m: '거리, 길', syn: ['road'], ex: [
      ['The street was full of people.', '거리가 사람들로 가득했다.'],
      ['Do not play in the street.', '길에서 놀지 마라.'],
      ['She lives on this street.', '그녀는 이 거리에 산다.'],
    ]},
  ]},
  { w: 'stress', p: 'n.', s: [
    { m: '스트레스, 압박', syn: ['pressure'], ex: [
      ['Exercise helps reduce stress.', '운동은 스트레스를 줄이는 데 도움이 된다.'],
      ['She is under a lot of stress.', '그녀는 스트레스를 많이 받고 있다.'],
      ['Too much stress is bad for health.', '스트레스가 너무 많으면 건강에 나쁘다.'],
    ]},
  ]},
  { w: 'subject', p: 'n.', s: [
    { m: '과목', syn: ['course'], ex: [
      ['English is my favorite subject.', '영어는 내가 제일 좋아하는 과목이다.'],
      ['We study six subjects this year.', '우리는 올해 여섯 과목을 배운다.'],
    ]},
    { m: '주제, 화제', syn: ['topic'], ex: [
      ['Let us change the subject.', '주제를 바꾸자.'],
      ['The subject of the talk was health.', '그 강연의 주제는 건강이었다.'],
    ]},
  ]},
  { w: 'sugar', p: 'n.', s: [
    { m: '설탕', syn: [], ex: [
      ['Do not put too much sugar in the tea.', '차에 설탕을 너무 많이 넣지 마라.'],
      ['This cake has a lot of sugar.', '이 케이크에는 설탕이 많이 들어 있다.'],
      ['She drinks coffee without sugar.', '그녀는 설탕 없이 커피를 마신다.'],
    ]},
  ]},
  { w: 'summer', p: 'n.', s: [
    { m: '여름', syn: [], ex: [
      ['We swim in the sea every summer.', '우리는 매년 여름 바다에서 수영한다.'],
      ['Summer in Korea is hot and wet.', '한국의 여름은 덥고 습하다.'],
      ['She visited Europe last summer.', '그녀는 지난여름 유럽을 방문했다.'],
    ]},
  ]},
  { w: 'sunny', p: 'adj.', s: [
    { m: '화창한, 햇볕이 잘 드는', syn: [], ex: [
      ['It is sunny and warm today.', '오늘은 화창하고 따뜻하다.'],
      ['We had a sunny day at the beach.', '우리는 해변에서 화창한 하루를 보냈다.'],
      ['Her room is bright and sunny.', '그녀의 방은 밝고 햇볕이 잘 든다.'],
    ]},
  ]},
  { w: 'sweet', p: 'adj.', s: [
    { m: '달콤한', syn: ['sugary'], ex: [
      ['This apple is very sweet.', '이 사과는 아주 달다.'],
      ['I do not like sweet drinks.', '나는 단 음료를 좋아하지 않는다.'],
      ['The cake tastes sweet.', '그 케이크는 단맛이 난다.'],
    ]},
  ]},
  { w: 'swim', p: 'v.', s: [
    { m: '수영하다, 헤엄치다', syn: [], ex: [
      ['I swim twice a week.', '나는 일주일에 두 번 수영한다.'],
      ['She swam across the river.', '그녀는 강을 헤엄쳐 건넜다.'],
      ['Fish are swimming in the pond.', '물고기들이 연못에서 헤엄치고 있다.'],
    ]},
  ]},
  { w: 'talent', p: 'n.', s: [
    { m: '재능', syn: ['gift', 'ability'], ex: [
      ['She has a talent for music.', '그녀는 음악에 재능이 있다.'],
      ['His talent surprised everyone.', '그의 재능은 모두를 놀라게 했다.'],
      ['Every child has a special talent.', '모든 아이는 특별한 재능이 있다.'],
    ]},
  ]},
  { w: 'talk', p: 'v.', s: [
    { m: '말하다, 이야기하다', syn: ['speak', 'chat'], ex: [
      ['Let us talk about it later.', '나중에 그것에 대해 이야기하자.'],
      ['They talked for two hours.', '그들은 두 시간 동안 이야기했다.'],
      ['She is talking with her friend.', '그녀는 친구와 이야기하고 있다.'],
    ]},
  ]},
  { w: 'taste', p: 'v., n.', s: [
    { m: '맛이 나다, 맛', syn: ['flavor'], ex: [
      ['This soup tastes salty.', '이 국은 짠맛이 난다.'],
      ['Would you like to taste it?', '맛을 보시겠어요?'],
      ['The taste of this fruit is new to me.', '이 과일의 맛은 나에게 낯설다.'],
    ]},
  ]},
  { w: 'team', p: 'n.', s: [
    { m: '팀, 단체', syn: ['group'], ex: [
      ['Our team won the game.', '우리 팀이 경기에서 이겼다.'],
      ['She joined the swimming team.', '그녀는 수영팀에 들어갔다.'],
      ['The team practices every day.', '그 팀은 매일 연습한다.'],
    ]},
  ]},
  { w: 'temperature', p: 'n.', s: [
    { m: '온도, 기온, 체온', syn: [], ex: [
      ['The temperature is below zero today.', '오늘 기온은 영하다.'],
      ['The nurse checked my temperature.', '간호사가 내 체온을 쟀다.'],
      ['Water boils at a high temperature.', '물은 높은 온도에서 끓는다.'],
    ]},
  ]},
  { w: 'terrible', p: 'adj.', s: [
    { m: '끔찍한, 심한', syn: ['awful'], ex: [
      ['The weather was terrible yesterday.', '어제 날씨는 끔찍했다.'],
      ['I had a terrible headache.', '나는 심한 두통이 있었다.'],
      ['That was a terrible mistake.', '그것은 끔찍한 실수였다.'],
    ]},
  ]},
  { w: 'test', p: 'n., v.', s: [
    { m: '시험, 검사하다', syn: ['exam'], ex: [
      ['We have a math test tomorrow.', '우리는 내일 수학 시험이 있다.'],
      ['She passed the test easily.', '그녀는 시험에 쉽게 합격했다.'],
      ['They tested the new machine.', '그들은 새 기계를 시험했다.'],
    ]},
  ]},
  { w: 'thick', p: 'adj.', s: [
    { m: '두꺼운, 굵은', syn: [], ex: [
      ['He read a thick book.', '그는 두꺼운 책을 읽었다.'],
      ['Wear a thick coat today.', '오늘은 두꺼운 코트를 입어라.'],
      ['The ice is thick enough to walk on.', '얼음이 걸어도 될 만큼 두껍다.'],
    ]},
  ]},
  { w: 'thin', p: 'adj.', s: [
    { m: '얇은, 마른', syn: ['slim'], ex: [
      ['The paper is very thin.', '그 종이는 아주 얇다.'],
      ['He is tall and thin.', '그는 키가 크고 말랐다.'],
      ['Cut the bread into thin slices.', '빵을 얇게 잘라라.'],
    ]},
  ]},
  { w: 'throw', p: 'v.', s: [
    { m: '던지다', syn: ['toss'], ex: [
      ['Do not throw trash on the street.', '길에 쓰레기를 던지지 마라.'],
      ['He threw the ball to me.', '그는 나에게 공을 던졌다.'],
      ['She is throwing bread to the birds.', '그녀는 새들에게 빵을 던져 주고 있다.'],
    ]},
  ]},
  { w: 'tired', p: 'adj.', s: [
    { m: '피곤한, 지친', syn: ['exhausted'], ex: [
      ['I am too tired to study.', '나는 너무 피곤해서 공부할 수 없다.'],
      ['She looked tired after the trip.', '그녀는 여행 후에 지쳐 보였다.'],
      ['He gets tired easily these days.', '그는 요즘 쉽게 피곤해진다.'],
    ]},
  ]},
  { w: 'title', p: 'n.', s: [
    { m: '제목', syn: ['name'], ex: [
      ['What is the title of the book?', '그 책의 제목이 무엇이니?'],
      ['She wrote the title at the top.', '그녀는 맨 위에 제목을 썼다.'],
      ['The title of the song is beautiful.', '그 노래의 제목은 아름답다.'],
    ]},
  ]},
  { w: 'together', p: 'adv.', s: [
    { m: '함께, 같이', syn: [], ex: [
      ['We studied together last night.', '우리는 어젯밤에 함께 공부했다.'],
      ['Let us go to the museum together.', '함께 박물관에 가자.'],
      ['They worked together on the project.', '그들은 과제를 함께 했다.'],
    ]},
  ]},
  { w: 'tool', p: 'n.', s: [
    { m: '도구, 연장', syn: ['instrument'], ex: [
      ['A hammer is a useful tool.', '망치는 유용한 도구다.'],
      ['He put the tools back in the box.', '그는 연장을 상자에 다시 넣었다.'],
      ['The internet is a powerful tool for learning.', '인터넷은 배움에 강력한 도구다.'],
    ]},
  ]},
  { w: 'touch', p: 'v.', s: [
    { m: '만지다, 닿다', syn: ['feel'], ex: [
      ['Do not touch the hot pot.', '뜨거운 냄비를 만지지 마라.'],
      ['She touched the soft blanket.', '그녀는 부드러운 담요를 만졌다.'],
      ['His hand touched mine.', '그의 손이 내 손에 닿았다.'],
    ]},
  ]},
  { w: 'town', p: 'n.', s: [
    { m: '마을, 도시', syn: ['village'], ex: [
      ['I grew up in a small town.', '나는 작은 마을에서 자랐다.'],
      ['The town has only one school.', '그 마을에는 학교가 하나뿐이다.'],
      ['Many people left the town.', '많은 사람이 그 마을을 떠났다.'],
    ]},
  ]},
  { w: 'train', p: 'n., v.', s: [
    { m: '기차, 열차', syn: [], ex: [
      ['We took the train to Busan.', '우리는 부산행 기차를 탔다.'],
      ['The train leaves at eight.', '기차는 8시에 떠난다.'],
    ]},
    { m: '훈련하다, 훈련시키다', syn: ['practice'], ex: [
      ['He trains every day for the race.', '그는 경주를 위해 매일 훈련한다.'],
      ['She trained her dog well.', '그녀는 개를 잘 훈련시켰다.'],
    ]},
  ]},
  { w: 'trash', p: 'n.', s: [
    { m: '쓰레기', syn: ['garbage'], ex: [
      ['Please put the trash in the bin.', '쓰레기는 통에 넣어 주세요.'],
      ['Do not leave trash on the beach.', '해변에 쓰레기를 버리지 마라.'],
      ['We take out the trash every Monday.', '우리는 매주 월요일에 쓰레기를 내놓는다.'],
    ]},
  ]},
  { w: 'tree', p: 'n.', s: [
    { m: '나무', syn: [], ex: [
      ['We planted a tree in the garden.', '우리는 정원에 나무를 심었다.'],
      ['Birds are singing in the tree.', '새들이 나무에서 노래하고 있다.'],
      ['The old tree fell in the storm.', '그 오래된 나무가 폭풍에 쓰러졌다.'],
    ]},
  ]},
  { w: 'trip', p: 'n.', s: [
    { m: '여행', syn: ['journey'], ex: [
      ['We went on a school trip last week.', '우리는 지난주에 수학여행을 갔다.'],
      ['The trip to Jeju was wonderful.', '제주 여행은 훌륭했다.'],
      ['She is planning a trip to Europe.', '그녀는 유럽 여행을 계획하고 있다.'],
    ]},
  ]},
  { w: 'trouble', p: 'n.', s: [
    { m: '곤란, 문제, 어려움', syn: ['problem'], ex: [
      ['He is in trouble again.', '그는 또 곤경에 빠졌다.'],
      ['I had trouble finding your house.', '나는 네 집을 찾는 데 어려움이 있었다.'],
      ['Sorry for the trouble.', '번거롭게 해서 죄송합니다.'],
    ]},
  ]},
  { w: 'true', p: 'adj.', s: [
    { m: '사실인, 진짜의', syn: ['real'], ex: [
      ['Is that story true?', '그 이야기가 사실이니?'],
      ['A true friend helps you in bad times.', '진정한 친구는 힘들 때 도와준다.'],
      ['His dream came true.', '그의 꿈이 이루어졌다.'],
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
  { w: 'a few', p: 'phr.', s: [
    { m: '조금, 약간의 (몇 개의)', syn: ['some'], ex: [
      ['I have a few questions.', '나는 질문이 몇 개 있다.'],
      ['A few students were absent today.', '오늘 몇몇 학생이 결석했다.'],
      ['We stayed there for a few days.', '우리는 그곳에 며칠 머물렀다.'],
    ]},
  ]},
  { w: 'as soon as', p: 'phr.', s: [
    { m: '~하자마자', syn: ['immediately after'], ex: [
      ['Call me as soon as you arrive.', '도착하자마자 전화해.'],
      ['As soon as it stopped raining, we went out.', '비가 그치자마자 우리는 나갔다.'],
      ['She left as soon as the class ended.', '그녀는 수업이 끝나자마자 떠났다.'],
    ]},
  ]},
  { w: 'be afraid of', p: 'phr.', s: [
    { m: '~을 두려워하다', syn: ['be scared of'], ex: [
      ['I am afraid of high places.', '나는 높은 곳을 무서워한다.'],
      ['She is afraid of dogs.', '그녀는 개를 무서워한다.'],
      ['Do not be afraid of making mistakes.', '실수하는 것을 두려워하지 마라.'],
    ]},
  ]},
  { w: 'come from', p: 'phr.', s: [
    { m: '~ 출신이다, ~에서 오다', syn: ['be from'], ex: [
      ['She comes from Canada.', '그녀는 캐나다 출신이다.'],
      ['This tea comes from India.', '이 차는 인도에서 온 것이다.'],
      ['Where do you come from?', '어디에서 오셨나요?'],
    ]},
  ]},
  { w: 'for example', p: 'phr.', s: [
    { m: '예를 들어', syn: ['for instance'], ex: [
      ['Some animals sleep in winter, for example bears.', '어떤 동물들은 겨울에 잠을 잔다, 예를 들어 곰이 그렇다.'],
      ['For example, you can start with easy words.', '예를 들어, 쉬운 단어부터 시작할 수 있다.'],
      ['She likes fruit, for example apples and pears.', '그녀는 과일을 좋아한다, 예를 들면 사과와 배 같은 것이다.'],
    ]},
  ]},
  { w: 'get along with', p: 'phr.', s: [
    { m: '~와 잘 지내다', syn: ['be friendly with'], ex: [
      ['He gets along with everyone.', '그는 모두와 잘 지낸다.'],
      ['Do you get along with your brother?', '너는 형과 잘 지내니?'],
      ['She got along with her new classmates.', '그녀는 새 반 친구들과 잘 지냈다.'],
    ]},
  ]},
  { w: 'grow up', p: 'phr.', s: [
    { m: '자라다, 성장하다', syn: ['become an adult'], ex: [
      ['I grew up in a small town.', '나는 작은 마을에서 자랐다.'],
      ['What do you want to be when you grow up?', '커서 무엇이 되고 싶니?'],
      ['Children grow up so fast.', '아이들은 참 빨리 자란다.'],
    ]},
  ]},
  { w: 'in front of', p: 'phr.', s: [
    { m: '~ 앞에', syn: ['before'], ex: [
      ['A car stopped in front of the house.', '차 한 대가 집 앞에 멈췄다.'],
      ['She stood in front of the class.', '그녀는 반 앞에 섰다.'],
      ['We waited in front of the theater.', '우리는 극장 앞에서 기다렸다.'],
    ]},
  ]},
  { w: 'make friends with', p: 'phr.', s: [
    { m: '~와 친해지다', syn: ['become friends with'], ex: [
      ['He made friends with the new student.', '그는 새로 온 학생과 친해졌다.'],
      ['It is easy to make friends with her.', '그녀와 친해지기는 쉽다.'],
      ['She wants to make friends with everyone.', '그녀는 모두와 친해지고 싶어 한다.'],
    ]},
  ]},
  { w: 'put on', p: 'phr.', s: [
    { m: '~을 입다, 착용하다', syn: ['wear'], ex: [
      ['Put on your coat before going out.', '나가기 전에 코트를 입어라.'],
      ['She put on her shoes quickly.', '그녀는 신발을 빨리 신었다.'],
      ['He is putting on his glasses.', '그는 안경을 쓰고 있다.'],
    ]},
  ]},
  { w: 'run away', p: 'phr.', s: [
    { m: '달아나다, 도망치다', syn: ['escape'], ex: [
      ['The dog ran away from the house.', '개가 집에서 달아났다.'],
      ['Do not run away from your problems.', '문제로부터 도망치지 마라.'],
      ['The thief ran away quickly.', '도둑이 빠르게 도망쳤다.'],
    ]},
  ]},
  { w: 'take off', p: 'phr.', s: [
    { m: '(옷을) 벗다', syn: ['remove'], ex: [
      ['Take off your shoes at the door.', '문에서 신발을 벗어라.'],
      ['He took off his hat politely.', '그는 정중히 모자를 벗었다.'],
    ]},
    { m: '이륙하다', syn: ['leave the ground'], ex: [
      ['The plane took off on time.', '비행기는 정시에 이륙했다.'],
      ['Our plane takes off at noon.', '우리 비행기는 정오에 이륙한다.'],
    ]},
  ]},
  { w: 'think of', p: 'phr.', s: [
    { m: '~을 생각하다, 떠올리다', syn: ['think about'], ex: [
      ['I cannot think of his name.', '나는 그의 이름이 떠오르지 않는다.'],
      ['What do you think of this plan?', '이 계획을 어떻게 생각하니?'],
      ['She often thinks of her old school.', '그녀는 종종 옛 학교를 생각한다.'],
    ]},
  ]},
  { w: 'turn on', p: 'phr.', s: [
    { m: '(전원을) 켜다', syn: ['switch on'], ex: [
      ['Please turn on the light.', '불 좀 켜 주세요.'],
      ['She turned on the computer.', '그녀는 컴퓨터를 켰다.'],
      ['He is turning on the radio.', '그는 라디오를 켜고 있다.'],
    ]},
  ]},
  { w: 'wait for', p: 'phr.', s: [
    { m: '~을 기다리다', syn: ['await'], ex: [
      ['I waited for the bus for ten minutes.', '나는 10분 동안 버스를 기다렸다.'],
      ['She is waiting for her friend.', '그녀는 친구를 기다리고 있다.'],
      ['Please wait for me at the gate.', '정문에서 나를 기다려 줘.'],
    ]},
  ]},
  { w: 'worry about', p: 'phr.', s: [
    { m: '~에 대해 걱정하다', syn: ['be anxious about'], ex: [
      ['Do not worry about the test.', '시험에 대해 걱정하지 마라.'],
      ['She worries about her health.', '그녀는 자기 건강을 걱정한다.'],
      ['He worried about his little brother.', '그는 남동생을 걱정했다.'],
    ]},
  ]},
], 'curriculum');
