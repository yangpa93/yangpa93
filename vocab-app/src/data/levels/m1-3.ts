/**
 * 중학교 1학년 레벨 3 — 수록 54 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_3 = defineLevel('m1-3', [
  { w: 'energy', p: 'n.', s: [
    { m: '에너지, 기운', syn: ['power'], ex: [
      ['We should save energy at home.', '우리는 집에서 에너지를 아껴야 한다.'],
      ['She has a lot of energy.', '그녀는 기운이 넘친다.'],
      ['Solar energy is clean.', '태양 에너지는 깨끗하다.'],
    ]},
  ]},
  { w: 'enjoy', p: 'v.', s: [
    { m: '즐기다', syn: ['have fun with', 'like'], ex: [
      ['I enjoy playing soccer.', '나는 축구하는 것을 즐긴다.'],
      ['Did you enjoy the concert?', '콘서트는 즐거웠니?'],
      ['We enjoyed our time at the beach.', '우리는 해변에서의 시간을 즐겼다.'],
    ]},
  ]},
  { w: 'enough', p: 'adj., adv.', s: [
    { m: '충분한, 충분히', syn: ['plenty of'], ex: [
      ['We have enough time.', '우리는 충분한 시간이 있다.'],
      ['He is old enough to travel alone.', '그는 혼자 여행할 만큼 나이가 들었다.'],
      ['There is not enough water.', '물이 충분하지 않다.'],
    ]},
  ]},
  { w: 'enter', p: 'v.', s: [
    { m: '들어가다', syn: ['go into'], ex: [
      ['Please knock before you enter.', '들어오기 전에 노크해 주세요.'],
      ['He entered the room quietly.', '그는 조용히 방에 들어갔다.'],
    ]},
    { m: '참가하다, 입학하다', syn: ['join'], ex: [
      ['She entered the contest last year.', '그녀는 작년에 그 대회에 참가했다.'],
      ['He will enter middle school in March.', '그는 3월에 중학교에 입학한다.'],
    ]},
  ]},
  { w: 'environment', p: 'n.', s: [
    { m: '(자연) 환경', syn: ['nature'], ex: [
      ['We must protect the environment.', '우리는 환경을 보호해야 한다.'],
      ['Plastic harms the environment.', '플라스틱은 환경을 해친다.'],
    ]},
    { m: '(주변) 환경, 분위기', syn: ['surroundings'], ex: [
      ['A quiet environment helps me study.', '조용한 환경은 내가 공부하는 데 도움이 된다.'],
      ['Children need a safe environment.', '아이들은 안전한 환경이 필요하다.'],
    ]},
  ]},
  { w: 'especially', p: 'adv.', s: [
    { m: '특히', syn: ['particularly', 'above all'], ex: [
      ['I like fruit, especially apples.', '나는 과일, 특히 사과를 좋아한다.'],
      ['It is cold, especially at night.', '춥다, 특히 밤에는.'],
      ['This rule is important, especially for beginners.', '이 규칙은 특히 초보자에게 중요하다.'],
    ]},
  ]},
  { w: 'everyone', p: 'pron.', s: [
    { m: '모든 사람, 모두', syn: ['everybody'], ex: [
      ['Everyone likes her.', '모두가 그녀를 좋아한다.'],
      ['Everyone was ready to go.', '모두 갈 준비가 되어 있었다.'],
      ['Say hello to everyone.', '모두에게 인사해라.'],
    ]},
  ]},
  { w: 'excited', p: 'adj.', s: [
    { m: '신이 난, 들뜬', syn: ['thrilled'], ex: [
      ['I am excited about the trip.', '나는 그 여행이 기대돼 신이 난다.'],
      ['The children were excited to see snow.', '아이들은 눈을 보고 신이 났다.'],
      ['She looked excited before the game.', '그녀는 경기 전에 들떠 보였다.'],
    ]},
  ]},
  { w: 'exercise', p: 'n., v.', s: [
    { m: '운동; 운동하다', syn: ['work out'], ex: [
      ['She exercises every morning.', '그녀는 매일 아침 운동한다.'],
      ['Exercise makes you healthy.', '운동은 너를 건강하게 만든다.'],
    ]},
    { m: '연습 문제', syn: ['practice'], ex: [
      ['Do the exercises on page ten.', '10쪽의 연습 문제를 풀어라.'],
      ['This exercise is about past tense.', '이 연습 문제는 과거 시제에 관한 것이다.'],
    ]},
  ]},
  { w: 'expensive', p: 'adj.', s: [
    { m: '비싼', syn: ['costly', 'pricey'], ex: [
      ['That bag is too expensive.', '저 가방은 너무 비싸다.'],
      ['Concert tickets are getting expensive.', '콘서트 표가 비싸지고 있다.'],
      ['We found a less expensive hotel.', '우리는 덜 비싼 호텔을 찾았다.'],
    ]},
  ]},
  { w: 'fact', p: 'n.', s: [
    { m: '사실', syn: ['truth'], ex: [
      ['That is an interesting fact.', '그것은 흥미로운 사실이다.'],
      ['Tell me the facts, not your opinion.', '의견 말고 사실을 말해 줘.'],
      ['In fact, he was right.', '사실 그가 옳았다.'],
    ]},
  ]},
  { w: 'fail', p: 'v.', s: [
    { m: '실패하다', syn: ['not succeed'], ex: [
      ["Don't be afraid to fail.", '실패하는 것을 두려워하지 마라.'],
      ['The plan failed because of rain.', '그 계획은 비 때문에 실패했다.'],
      ['He failed the test but tried again.', '그는 시험에 떨어졌지만 다시 도전했다.'],
    ]},
  ]},
  { w: 'fall', p: 'v., n.', s: [
    { m: '떨어지다, 넘어지다', syn: ['drop'], ex: [
      ['Leaves fall from the trees.', '나뭇잎이 나무에서 떨어진다.'],
      ['He fell down on the ice.', '그는 얼음 위에서 넘어졌다.'],
    ]},
    { m: '가을', syn: ['autumn'], ex: [
      ['We go hiking every fall.', '우리는 매년 가을에 등산을 간다.'],
      ['The weather is nice in fall.', '가을에는 날씨가 좋다.'],
    ]},
  ]},
  { w: 'famous', p: 'adj.', s: [
    { m: '유명한', syn: ['well-known'], ex: [
      ['He is a famous singer.', '그는 유명한 가수이다.'],
      ['This city is famous for its beaches.', '이 도시는 해변으로 유명하다.'],
      ['She became famous after the movie.', '그녀는 그 영화 이후 유명해졌다.'],
    ]},
  ]},
  { w: 'farm', p: 'n.', s: [
    { m: '농장', syn: [], ex: [
      ['My uncle works on a farm.', '우리 삼촌은 농장에서 일하신다.'],
      ['We visited a farm last spring.', '우리는 지난봄에 농장을 방문했다.'],
      ['The farm has many animals.', '그 농장에는 동물이 많다.'],
    ]},
  ]},
  { w: 'fast', p: 'adj., adv.', s: [
    { m: '빠른, 빨리', syn: ['quick', 'rapid'], ex: [
      ['He is a fast runner.', '그는 빠른 주자다.'],
      ['Do not eat too fast.', '너무 빨리 먹지 마라.'],
      ['This train is very fast.', '이 기차는 아주 빠르다.'],
    ]},
  ]},
  { w: 'favorite', p: 'adj.', s: [
    { m: '가장 좋아하는', syn: ['best-loved'], ex: [
      ['Blue is my favorite color.', '파란색은 내가 가장 좋아하는 색이다.'],
      ['What is your favorite subject?', '네가 가장 좋아하는 과목은 무엇이니?'],
      ['This is my favorite song these days.', '이것이 요즘 내가 가장 좋아하는 노래이다.'],
    ]},
  ]},
  { w: 'feel', p: 'v.', s: [
    { m: '느끼다, ~한 기분이 들다', syn: ['sense'], ex: [
      ['I feel tired today.', '나는 오늘 피곤하다.'],
      ['She felt happy after the test.', '그녀는 시험 후에 행복했다.'],
      ['He is feeling much better now.', '그는 지금 훨씬 나아지고 있다.'],
    ]},
  ]},
  { w: 'festival', p: 'n.', s: [
    { m: '축제', syn: [], ex: [
      ['The school festival is in October.', '학교 축제는 10월에 있다.'],
      ['We enjoyed the music festival.', '우리는 음악 축제를 즐겼다.'],
      ['Many people came to the festival.', '많은 사람이 축제에 왔다.'],
    ]},
  ]},
  { w: 'field', p: 'n.', s: [
    { m: '들판, 밭', syn: ['land'], ex: [
      ['Cows are eating grass in the field.', '소들이 들판에서 풀을 뜯고 있다.'],
      ['We played baseball in the field.', '우리는 들판에서 야구를 했다.'],
    ]},
    { m: '분야', syn: ['area'], ex: [
      ['She is famous in her field.', '그녀는 자기 분야에서 유명하다.'],
      ['This is a new field of study.', '이것은 새로운 연구 분야다.'],
    ]},
  ]},
  { w: 'fill', p: 'v.', s: [
    { m: '채우다', syn: ['make full'], ex: [
      ['Fill the bottle with water.', '병을 물로 채워라.'],
      ['She filled the box with books.', '그녀는 상자를 책으로 채웠다.'],
      ['The room is filling with people.', '방이 사람들로 차고 있다.'],
    ]},
  ]},
  { w: 'find', p: 'v.', s: [
    { m: '찾다, 발견하다', syn: ['discover'], ex: [
      ['I cannot find my key.', '나는 열쇠를 찾을 수 없다.'],
      ['She found a coin on the street.', '그녀는 길에서 동전을 발견했다.'],
      ['He is finding it hard to sleep.', '그는 잠들기 어려워하고 있다.'],
    ]},
  ]},
  { w: 'find out', p: 'phr.', s: [
    { m: '알아내다, 알게 되다', syn: ['discover', 'learn'], ex: [
      ['I found out the truth.', '나는 진실을 알아냈다.'],
      ['Let’s find out who won.', '누가 이겼는지 알아보자.'],
      ['She found out about the party too late.', '그녀는 파티에 대해 너무 늦게 알았다.'],
    ]},
  ]},
  { w: 'finish', p: 'v.', s: [
    { m: '끝내다, 끝나다', syn: ['complete', 'end'], ex: [
      ['I finished my homework.', '나는 숙제를 끝냈다.'],
      ['The class finishes at three.', '수업은 3시에 끝난다.'],
      ['Finish your food before you play.', '놀기 전에 밥을 다 먹어라.'],
    ]},
  ]},
  { w: 'fix', p: 'v.', s: [
    { m: '고치다, 수리하다', syn: ['repair', 'mend'], ex: [
      ['My dad fixed my bike.', '아빠가 내 자전거를 고쳐 주셨다.'],
      ['Can you fix this computer?', '이 컴퓨터를 고칠 수 있니?'],
    ]},
    { m: '(날짜·장소를) 정하다', syn: ['set', 'arrange'], ex: [
      ['We fixed the meeting for Friday.', '우리는 회의를 금요일로 정했다.'],
      ['The price is fixed.', '가격은 정해져 있다.'],
    ]},
  ]},
  { w: 'floor', p: 'n.', s: [
    { m: '바닥', syn: ['ground'], ex: [
      ['The floor is wet.', '바닥이 젖어 있다.'],
      ['He sat on the floor.', '그는 바닥에 앉았다.'],
    ]},
    { m: '층', syn: ['story'], ex: [
      ['Our classroom is on the third floor.', '우리 교실은 3층에 있다.'],
      ['She lives on the top floor.', '그녀는 꼭대기 층에 산다.'],
    ]},
  ]},
  { w: 'fly', p: 'v.', s: [
    { m: '날다, 비행하다', syn: [], ex: [
      ['Birds fly to warm places in winter.', '새들은 겨울에 따뜻한 곳으로 날아간다.'],
      ['We flew to Jeju last summer.', '우리는 지난여름에 제주로 비행기를 타고 갔다.'],
      ['A plane is flying over our house.', '비행기가 우리 집 위를 날고 있다.'],
    ]},
  ]},
  { w: 'focus', p: 'v., n.', s: [
    { m: '집중하다; 초점', syn: ['concentrate', 'pay attention'], ex: [
      ['Focus on your work.', '네 일에 집중해라.'],
      ['It is hard to focus when I am tired.', '피곤할 때는 집중하기 어렵다.'],
      ['The focus of the class was grammar.', '그 수업의 초점은 문법이었다.'],
    ]},
  ]},
  { w: 'for example', p: 'phr.', s: [
    { m: '예를 들어', syn: ['for instance'], ex: [
      ['Some animals sleep in winter, for example bears.', '어떤 동물들은 겨울에 잠을 잔다, 예를 들어 곰이 그렇다.'],
      ['For example, you can start with easy words.', '예를 들어, 쉬운 단어부터 시작할 수 있다.'],
      ['She likes fruit, for example apples and pears.', '그녀는 과일을 좋아한다, 예를 들면 사과와 배 같은 것이다.'],
    ]},
  ]},
  { w: 'forest', p: 'n.', s: [
    { m: '숲', syn: ['woods'], ex: [
      ['We walked through the forest.', '우리는 숲을 지나 걸었다.'],
      ['Many animals live in the forest.', '많은 동물이 숲에 산다.'],
      ['The forest is quiet in the morning.', '숲은 아침에 조용하다.'],
    ]},
  ]},
  { w: 'forget', p: 'v.', s: [
    { m: '잊다, 잊어버리다', syn: ['leave behind'], ex: [
      ["Don't forget your umbrella.", '우산을 잊지 마라.'],
      ['I forgot her phone number.', '나는 그녀의 전화번호를 잊어버렸다.'],
      ['He forgot to lock the door.', '그는 문 잠그는 것을 잊었다.'],
    ]},
  ]},
  { w: 'free', p: 'adj.', s: [
    { m: '무료의, 공짜의', syn: ['at no cost'], ex: [
      ['The concert is free for students.', '그 콘서트는 학생에게 무료다.'],
      ['They gave us free drinks.', '그들은 우리에게 무료 음료를 주었다.'],
    ]},
    { m: '자유로운, 한가한', syn: ['not busy'], ex: [
      ['Are you free this afternoon?', '오늘 오후에 시간 있니?'],
      ['Everyone should be free to choose.', '누구나 선택할 자유가 있어야 한다.'],
    ]},
  ]},
  { w: 'fresh', p: 'adj.', s: [
    { m: '신선한, 상쾌한', syn: ['new'], ex: [
      ['These vegetables are fresh.', '이 채소들은 신선하다.'],
      ['Let us get some fresh air.', '신선한 공기를 좀 쐬자.'],
      ['She bought fresh fish at the market.', '그녀는 시장에서 신선한 생선을 샀다.'],
    ]},
  ]},
  { w: 'friendly', p: 'adj.', s: [
    { m: '친절한, 다정한', syn: ['kind', 'nice'], ex: [
      ['Our new teacher is friendly.', '우리 새 선생님은 다정하시다.'],
      ['The people there were very friendly.', '그곳 사람들은 매우 친절했다.'],
      ['He gave me a friendly smile.', '그는 나에게 다정한 미소를 지었다.'],
    ]},
  ]},
  { w: 'front', p: 'n.', s: [
    { m: '앞, 앞면', syn: [], ex: [
      ['Please sit in the front.', '앞쪽에 앉아 주세요.'],
      ['Write your name on the front of the paper.', '종이 앞면에 이름을 쓰세요.'],
      ['A car stopped at the front of the building.', '차 한 대가 건물 앞에 섰다.'],
    ]},
  ]},
  { w: 'fun', p: 'n., adj.', s: [
    { m: '재미, 재미있는', syn: ['enjoyment'], ex: [
      ['We had a lot of fun yesterday.', '우리는 어제 아주 재미있게 놀았다.'],
      ['Learning English can be fun.', '영어를 배우는 것은 재미있을 수 있다.'],
      ['The party was really fun.', '그 파티는 정말 재미있었다.'],
    ]},
  ]},
  { w: 'future', p: 'n.', s: [
    { m: '미래, 장래', syn: ['years ahead'], ex: [
      ['What will you do in the future?', '너는 미래에 무엇을 할 거니?'],
      ['She is thinking about her future job.', '그녀는 장래 직업에 대해 생각하고 있다.'],
      ['Robots will help us in the future.', '미래에는 로봇이 우리를 도울 것이다.'],
    ]},
  ]},
  { w: 'garden', p: 'n.', s: [
    { m: '정원, 텃밭', syn: [], ex: [
      ['My mother grows flowers in the garden.', '어머니는 정원에서 꽃을 기르신다.'],
      ['The garden looks beautiful in spring.', '정원은 봄에 아름다워 보인다.'],
      ['We had lunch in the garden.', '우리는 정원에서 점심을 먹었다.'],
    ]},
  ]},
  { w: 'get along with', p: 'phr.', s: [
    { m: '~와 잘 지내다', syn: ['be friendly with'], ex: [
      ['He gets along with everyone.', '그는 모두와 잘 지낸다.'],
      ['Do you get along with your brother?', '너는 형과 잘 지내니?'],
      ['She got along with her new classmates.', '그녀는 새 반 친구들과 잘 지냈다.'],
    ]},
  ]},
  { w: 'get up', p: 'phr.', s: [
    { m: '일어나다, 기상하다', syn: ['wake up', 'rise'], ex: [
      ['I get up at six every day.', '나는 매일 6시에 일어난다.'],
      ['He got up late this morning.', '그는 오늘 아침 늦게 일어났다.'],
      ['What time do you get up on Sundays?', '일요일에는 몇 시에 일어나니?'],
    ]},
  ]},
  { w: 'give up', p: 'phr.', s: [
    { m: '포기하다', syn: ['quit', 'stop trying'], ex: [
      ['Never give up your dream.', '결코 꿈을 포기하지 마라.'],
      ['He gave up after three tries.', '그는 세 번 시도한 후 포기했다.'],
      ['Do not give up so easily.', '그렇게 쉽게 포기하지 마라.'],
    ]},
  ]},
  { w: 'glad', p: 'adj.', s: [
    { m: '기쁜, 반가운', syn: ['pleased'], ex: [
      ['I am glad to meet you.', '만나서 반갑습니다.'],
      ['She was glad about the news.', '그녀는 그 소식을 기뻐했다.'],
      ['We are glad that you came.', '네가 와서 우리는 기쁘다.'],
    ]},
  ]},
  { w: 'glass', p: 'n.', s: [
    { m: '유리', syn: [], ex: [
      ['The door is made of glass.', '그 문은 유리로 만들어졌다.'],
      ['Be careful with the broken glass.', '깨진 유리를 조심해라.'],
    ]},
    { m: '유리잔, 한 잔', syn: ['cup'], ex: [
      ['She drank a glass of milk.', '그녀는 우유 한 잔을 마셨다.'],
      ['Please bring two glasses.', '유리잔 두 개를 가져다 주세요.'],
    ]},
  ]},
  { w: 'go to bed', p: 'phr.', s: [
    { m: '자러 가다', syn: ['turn in'], ex: [
      ['He goes to bed at ten.', '그는 10시에 자러 간다.'],
      ['Go to bed early before the exam.', '시험 전에는 일찍 자라.'],
      ['I went to bed after midnight.', '나는 자정이 지나서 잤다.'],
    ]},
  ]},
  { w: 'goal', p: 'n.', s: [
    { m: '목표', syn: ['aim'], ex: [
      ['My goal is to read fifty books.', '내 목표는 책 쉰 권을 읽는 것이다.'],
      ['She reached her goal at last.', '그녀는 마침내 목표를 이루었다.'],
    ]},
    { m: '골, 득점', syn: ['point'], ex: [
      ['He scored the winning goal.', '그가 결승 골을 넣었다.'],
      ['Our team got three goals.', '우리 팀은 세 골을 넣었다.'],
    ]},
  ]},
  { w: 'grow', p: 'v.', s: [
    { m: '자라다, 성장하다', syn: ['get bigger', 'develop'], ex: [
      ['These plants grow fast.', '이 식물들은 빨리 자란다.'],
      ['He grew ten centimeters last year.', '그는 작년에 10센티미터 자랐다.'],
    ]},
    { m: '기르다, 재배하다', syn: ['raise', 'cultivate'], ex: [
      ['My grandmother grows vegetables.', '할머니는 채소를 기르신다.'],
      ['They grow rice in this area.', '이 지역에서는 쌀을 재배한다.'],
    ]},
  ]},
  { w: 'grow up', p: 'phr.', s: [
    { m: '자라다, 성장하다', syn: ['become an adult'], ex: [
      ['I grew up in a small town.', '나는 작은 마을에서 자랐다.'],
      ['What do you want to be when you grow up?', '커서 무엇이 되고 싶니?'],
      ['Children grow up so fast.', '아이들은 참 빨리 자란다.'],
    ]},
  ]},
  { w: 'guess', p: 'v.', s: [
    { m: '추측하다, 짐작하다', syn: ['suppose'], ex: [
      ['Can you guess my age?', '내 나이를 맞혀 볼래?'],
      ['She guessed the answer correctly.', '그녀는 답을 정확히 맞혔다.'],
      ['I guess he is not coming.', '그는 안 올 것 같다.'],
    ]},
  ]},
  { w: 'habit', p: 'n.', s: [
    { m: '습관', syn: ['routine', 'practice'], ex: [
      ['Reading is a good habit.', '독서는 좋은 습관이다.'],
      ['He has a habit of biting his nails.', '그는 손톱을 물어뜯는 습관이 있다.'],
      ['It takes time to change a habit.', '습관을 바꾸는 데는 시간이 걸린다.'],
    ]},
  ]},
  { w: 'hate', p: 'v.', s: [
    { m: '싫어하다, 미워하다', syn: ['dislike'], ex: [
      ['I hate rainy days.', '나는 비 오는 날이 싫다.'],
      ['She hates waiting in line.', '그녀는 줄 서서 기다리는 것을 싫어한다.'],
      ['He hated the taste of the medicine.', '그는 그 약 맛을 싫어했다.'],
    ]},
  ]},
  { w: 'have to', p: 'phr.', s: [
    { m: '~해야 한다', syn: ['must', 'need to'], ex: [
      ['You have to wash your hands.', '너는 손을 씻어야 한다.'],
      ['I have to finish this today.', '나는 오늘 이것을 끝내야 한다.'],
      ['We had to wait for an hour.', '우리는 한 시간을 기다려야 했다.'],
    ]},
  ]},
  { w: 'heavy', p: 'adj.', s: [
    { m: '무거운', syn: [], ex: [
      ['This bag is too heavy for me.', '이 가방은 나에게 너무 무겁다.'],
      ['He lifted the heavy box alone.', '그는 무거운 상자를 혼자 들었다.'],
    ]},
    { m: '심한, (양이) 많은', syn: ['strong'], ex: [
      ['We had heavy rain yesterday.', '어제 비가 많이 왔다.'],
      ['The traffic was heavy this morning.', '오늘 아침 차가 많이 막혔다.'],
    ]},
  ]},
  { w: 'help', p: 'v., n.', s: [
    { m: '돕다, 도움', syn: ['aid', 'assist'], ex: [
      ['Can you help me with my homework?', '내 숙제를 도와줄 수 있니?'],
      ['She helped an old man cross the street.', '그녀는 노인이 길을 건너는 것을 도왔다.'],
      ['Thank you for your help.', '도와주셔서 감사합니다.'],
    ]},
  ]},
  { w: 'hill', p: 'n.', s: [
    { m: '언덕', syn: [], ex: [
      ['There is a small hill behind my house.', '우리 집 뒤에 작은 언덕이 있다.'],
      ['We ran up the hill together.', '우리는 함께 언덕을 뛰어 올라갔다.'],
      ['The hills are green in spring.', '봄에는 언덕이 푸르다.'],
    ]},
  ]},
], 'curriculum');
