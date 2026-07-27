/**
 * 고등학교 1학년 레벨 3 — 수록 37 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H1_3 = defineLevel('h1-3', [
  { w: 'shine', p: 'v.', s: [
    { m: '빛나다, 비추다', syn: ['glow'], ex: [
      ['The sun is shining brightly.', '해가 밝게 빛나고 있다.'],
      ['Her eyes shone with joy.', '그녀의 눈이 기쁨으로 빛났다.'],
      ['Stars shine at night.', '별은 밤에 빛난다.'],
    ]},
  ]},
  { w: 'shout', p: 'v.', s: [
    { m: '소리치다, 외치다', syn: ['yell', 'cry out'], ex: [
      ['Do not shout in the classroom.', '교실에서 소리치지 마라.'],
      ['He shouted for help.', '그는 도와달라고 소리쳤다.'],
      ['She is shouting at the players.', '그녀는 선수들에게 외치고 있다.'],
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
  { w: 'significant', p: 'adj.', s: [
    { m: '중요한, 상당한', syn: ['important', 'considerable'], ex: [
      ['There was a significant difference.', '상당한 차이가 있었다.'],
      ['This is a significant discovery.', '이것은 중요한 발견이다.'],
      ['Sales rose by a significant amount.', '매출이 상당한 액수만큼 올랐다.'],
    ]},
  ]},
  { w: 'similar', p: 'adj.', s: [
    { m: '비슷한, 유사한', syn: ['alike', 'like'], ex: [
      ['Our ideas are similar.', '우리 생각은 비슷하다.'],
      ['The twins look very similar.', '그 쌍둥이는 매우 닮았다.'],
      ['This is similar to what we saw before.', '이것은 우리가 전에 본 것과 비슷하다.'],
    ]},
  ]},
  { w: 'simple', p: 'adj.', s: [
    { m: '간단한, 단순한', syn: ['easy', 'plain'], ex: [
      ['The rule is very simple.', '그 규칙은 아주 간단하다.'],
      ['She lives a simple life.', '그녀는 단순한 삶을 산다.'],
      ['Here is a simple way to solve it.', '그것을 푸는 간단한 방법이 있다.'],
    ]},
  ]},
  { w: 'skill', p: 'n.', s: [
    { m: '기술, 능력', syn: ['ability', 'technique'], ex: [
      ['Cooking is a useful skill.', '요리는 유용한 기술이다.'],
      ['He has great computer skills.', '그는 뛰어난 컴퓨터 기술을 가지고 있다.'],
      ['Listening is an important language skill.', '듣기는 중요한 언어 기술이다.'],
    ]},
  ]},
  { w: 'smart', p: 'adj.', s: [
    { m: '똑똑한, 영리한', syn: ['clever', 'bright'], ex: [
      ['She is a smart student.', '그녀는 똑똑한 학생이다.'],
      ['That was a smart choice.', '그것은 현명한 선택이었다.'],
      ['Dogs are smart animals.', '개는 영리한 동물이다.'],
    ]},
  ]},
  { w: 'society', p: 'n.', s: [
    { m: '사회', syn: ['community', 'the public'], ex: [
      ['Technology changes society.', '기술은 사회를 변화시킨다.'],
      ['Every member of society has a role.', '사회의 모든 구성원은 역할이 있다.'],
      ['Modern society moves very fast.', '현대 사회는 매우 빠르게 움직인다.'],
    ]},
  ]},
  { w: 'solve', p: 'v.', s: [
    { m: '풀다, 해결하다', syn: ['work out', 'figure out'], ex: [
      ['Can you solve this puzzle?', '이 퍼즐을 풀 수 있니?'],
      ['We solved the problem in ten minutes.', '우리는 10분 만에 그 문제를 풀었다.'],
      ['Talking can solve many problems.', '대화는 많은 문제를 해결할 수 있다.'],
    ]},
  ]},
  { w: 'source', p: 'n.', s: [
    { m: '원천, 근원', syn: ['origin', 'root'], ex: [
      ['The sun is a source of energy.', '태양은 에너지의 원천이다.'],
      ['Stress is a source of many illnesses.', '스트레스는 많은 질병의 근원이다.'],
    ]},
    { m: '출처, 정보원', syn: ['reference'], ex: [
      ['Always check your sources.', '항상 출처를 확인해라.'],
      ['The news came from a reliable source.', '그 소식은 믿을 만한 출처에서 왔다.'],
    ]},
  ]},
  { w: 'specific', p: 'adj.', s: [
    { m: '구체적인', syn: ['detailed', 'precise'], ex: [
      ['Give me a specific example.', '구체적인 예를 들어 줘.'],
      ['Can you be more specific?', '좀 더 구체적으로 말해 줄 수 있니?'],
    ]},
    { m: '특정한', syn: ['particular'], ex: [
      ['This medicine treats a specific disease.', '이 약은 특정 질병을 치료한다.'],
      ['Each student has a specific role.', '각 학생은 특정한 역할이 있다.'],
    ]},
  ]},
  { w: 'speech', p: 'n.', s: [
    { m: '연설, 말', syn: ['talk'], ex: [
      ['She gave a speech at the festival.', '그녀는 축제에서 연설했다.'],
      ['His speech was short but powerful.', '그의 연설은 짧지만 강력했다.'],
      ['I am nervous about my speech.', '나는 연설이 걱정된다.'],
    ]},
  ]},
  { w: 'spell', p: 'v.', s: [
    { m: '철자를 쓰다', syn: [], ex: [
      ['How do you spell your name?', '이름 철자가 어떻게 되나요?'],
      ['She spelled the word correctly.', '그녀는 그 단어의 철자를 바르게 썼다.'],
      ['I always spell this word wrong.', '나는 늘 이 단어의 철자를 틀린다.'],
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
  { w: 'spread', p: 'v.', s: [
    { m: '퍼지다, 확산되다', syn: ['expand', 'scatter'], ex: [
      ['The news spread quickly.', '그 소식은 빠르게 퍼졌다.'],
      ['The fire spread to nearby houses.', '불이 근처 집들로 번졌다.'],
    ]},
    { m: '펼치다, 바르다', syn: ['open out', 'apply'], ex: [
      ['She spread a map on the table.', '그녀는 탁자 위에 지도를 펼쳤다.'],
      ['Spread butter on the bread.', '빵에 버터를 발라라.'],
    ]},
  ]},
  { w: 'stable', p: 'adj.', s: [
    { m: '안정된', syn: ['steady', 'secure'], ex: [
      ['Prices have been stable this year.', '올해 물가는 안정적이었다.'],
      ['He is in stable condition.', '그는 상태가 안정적이다.'],
      ['We need a stable internet connection.', '우리는 안정적인 인터넷 연결이 필요하다.'],
    ]},
  ]},
  { w: 'station', p: 'n.', s: [
    { m: '역, 정거장', syn: [], ex: [
      ['Meet me at the subway station.', '지하철역에서 만나자.'],
      ['The station is crowded in the morning.', '역은 아침에 붐빈다.'],
      ['We got off at the next station.', '우리는 다음 역에서 내렸다.'],
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
  { w: 'storm', p: 'n.', s: [
    { m: '폭풍, 폭풍우', syn: [], ex: [
      ['The storm broke many trees.', '폭풍이 많은 나무를 쓰러뜨렸다.'],
      ['We stayed inside during the storm.', '우리는 폭풍이 부는 동안 안에 있었다.'],
      ['A big storm is coming tonight.', '오늘 밤 큰 폭풍이 온다.'],
    ]},
  ]},
  { w: 'straight', p: 'adj., adv.', s: [
    { m: '곧은, 곧장', syn: ['direct'], ex: [
      ['Go straight and turn left.', '곧장 가다가 왼쪽으로 도세요.'],
      ['Draw a straight line here.', '여기에 직선을 그으세요.'],
      ['He went straight home after school.', '그는 방과 후 곧장 집에 갔다.'],
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
  { w: 'strategy', p: 'n.', s: [
    { m: '전략', syn: ['plan', 'approach'], ex: [
      ['We need a better strategy.', '우리는 더 나은 전략이 필요하다.'],
      ['Her study strategy really works.', '그녀의 공부 전략은 정말 효과가 있다.'],
      ['The team changed its strategy at halftime.', '그 팀은 하프타임에 전략을 바꿨다.'],
    ]},
  ]},
  { w: 'stress', p: 'n.', s: [
    { m: '스트레스, 압박', syn: ['pressure'], ex: [
      ['Exercise helps reduce stress.', '운동은 스트레스를 줄이는 데 도움이 된다.'],
      ['She is under a lot of stress.', '그녀는 스트레스를 많이 받고 있다.'],
      ['Too much stress is bad for health.', '스트레스가 너무 많으면 건강에 나쁘다.'],
    ]},
  ]},
  { w: 'struggle', p: 'v., n.', s: [
    { m: '애쓰다, 고군분투하다', syn: ['strive', 'have trouble'], ex: [
      ['He struggled to finish the race.', '그는 경주를 마치려고 애썼다.'],
      ['She struggles with math.', '그녀는 수학을 힘들어한다.'],
      ['Life was a struggle for them.', '그들에게 삶은 투쟁이었다.'],
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
  { w: 'succeed', p: 'v.', s: [
    { m: '성공하다', syn: ['do well', 'make it'], ex: [
      ['She succeeded after many tries.', '그녀는 여러 번 시도한 끝에 성공했다.'],
      ['You will succeed if you keep trying.', '계속 노력하면 성공할 것이다.'],
      ['The plan succeeded beyond our hopes.', '그 계획은 기대 이상으로 성공했다.'],
    ]},
  ]},
  { w: 'sudden', p: 'adj.', s: [
    { m: '갑작스러운', syn: ['abrupt', 'unexpected'], ex: [
      ['There was a sudden noise.', '갑작스러운 소음이 났다.'],
      ['His sudden change surprised us.', '그의 갑작스러운 변화가 우리를 놀라게 했다.'],
      ['All of a sudden, it began to rain.', '갑자기 비가 오기 시작했다.'],
    ]},
  ]},
  { w: 'sufficient', p: 'adj.', s: [
    { m: '충분한', syn: ['enough', 'adequate'], ex: [
      ['We have sufficient supplies.', '우리는 충분한 물자를 가지고 있다.'],
      ['Is one hour sufficient?', '한 시간이면 충분하니?'],
      ['There was not sufficient evidence.', '충분한 증거가 없었다.'],
    ]},
  ]},
  { w: 'suggest', p: 'v.', s: [
    { m: '제안하다', syn: ['propose', 'recommend'], ex: [
      ['I suggest starting early.', '나는 일찍 시작할 것을 제안한다.'],
      ['She suggested a different plan.', '그녀는 다른 계획을 제안했다.'],
      ['May I suggest something?', '한 가지 제안해도 될까요?'],
    ]},
  ]},
  { w: 'support', p: 'v., n.', s: [
    { m: '지지하다, 응원하다', syn: ['back up', 'encourage'], ex: [
      ['My family supports my dream.', '가족은 내 꿈을 지지한다.'],
      ['Thank you for your support.', '응원해 주셔서 감사합니다.'],
    ]},
    { m: '떠받치다', syn: ['hold up'], ex: [
      ['These pillars support the roof.', '이 기둥들이 지붕을 떠받친다.'],
      ['The bridge is supported by steel.', '그 다리는 강철로 지탱된다.'],
    ]},
  ]},
  { w: 'surface', p: 'n.', s: [
    { m: '표면', syn: ['outside', 'top'], ex: [
      ['The surface of the lake was calm.', '호수의 표면은 잔잔했다.'],
      ['Clean the surface before painting.', '칠하기 전에 표면을 닦아라.'],
      ['Most of the earth’s surface is water.', '지구 표면의 대부분은 물이다.'],
    ]},
  ]},
  { w: 'sweet', p: 'adj.', s: [
    { m: '달콤한', syn: ['sugary'], ex: [
      ['This apple is very sweet.', '이 사과는 아주 달다.'],
      ['I do not like sweet drinks.', '나는 단 음료를 좋아하지 않는다.'],
      ['The cake tastes sweet.', '그 케이크는 단맛이 난다.'],
    ]},
  ]},
  { w: 'take place', p: 'phr.', s: [
    { m: '일어나다, 개최되다', syn: ['happen', 'be held'], ex: [
      ['The festival takes place in May.', '그 축제는 5월에 열린다.'],
      ['The meeting took place last Friday.', '그 회의는 지난 금요일에 열렸다.'],
      ['Great changes took place after the war.', '전쟁 후에 큰 변화가 일어났다.'],
    ]},
  ]},
  { w: 'temperature', p: 'n.', s: [
    { m: '온도, 기온, 체온', syn: [], ex: [
      ['The temperature is below zero today.', '오늘 기온은 영하다.'],
      ['The nurse checked my temperature.', '간호사가 내 체온을 쟀다.'],
      ['Water boils at a high temperature.', '물은 높은 온도에서 끓는다.'],
    ]},
  ]},
  { w: 'tend', p: 'v.', s: [
    { m: '~하는 경향이 있다', syn: ['be likely to', 'have a tendency to'], ex: [
      ['Kids tend to copy adults.', '아이들은 어른을 따라 하는 경향이 있다.'],
      ['Prices tend to rise in winter.', '겨울에는 물가가 오르는 경향이 있다.'],
      ['She tends to speak too fast.', '그녀는 너무 빨리 말하는 경향이 있다.'],
    ]},
  ]},
], 'curriculum');
