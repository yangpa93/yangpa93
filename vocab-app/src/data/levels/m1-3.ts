/**
 * 중학교 1학년 레벨 3 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_3 = defineLevel('m1-3', [
  { w: 'eat', p: 'v.', s: [
    { m: '먹다', syn: ['have'], ex: [
      ['We eat lunch at noon.', '우리는 정오에 점심을 먹는다.'],
      ['She ate two apples.', '그녀는 사과 두 개를 먹었다.'],
      ['He is eating breakfast now.', '그는 지금 아침을 먹고 있다.'],
    ]},
  ]},
  { w: 'egg', p: 'n.', s: [
    { m: '달걀, 알', syn: ['ovum'], ex: [
      ['I boiled two eggs.', '나는 달걀 두 개를 삶았다.'],
      ['The bird laid an egg.', '새가 알을 낳았다.'],
      ['This egg is still warm.', '이 달걀은 아직 따뜻하다.'],
    ]},
  ]},
  { w: 'eight', p: 'num.', s: [
    { m: '여덟, 8', syn: ['8'], ex: [
      ['There are eight students here.', '여기에 학생이 여덟 명 있다.'],
      ['The class starts at eight.', '수업은 8시에 시작한다.'],
      ['She read eight books this month.', '그녀는 이번 달에 책 여덟 권을 읽었다.'],
    ]},
  ]},
  { w: 'elephant', p: 'n.', s: [
    { m: '코끼리', syn: ['animal'], ex: [
      ['The elephant has a long nose.', '코끼리는 코가 길다.'],
      ['We saw elephants at the zoo.', '우리는 동물원에서 코끼리를 보았다.'],
      ['An elephant eats a lot of grass.', '코끼리는 풀을 아주 많이 먹는다.'],
    ]},
  ]},
  { w: 'eleven', p: 'num.', s: [
    { m: '열하나, 11', syn: ['11'], ex: [
      ['Eleven players are on the field.', '열한 명의 선수가 경기장에 있다.'],
      ['He is eleven years old.', '그는 열한 살이다.'],
      ['The bus leaves at eleven.', '버스는 11시에 떠난다.'],
    ]},
  ]},
  { w: 'end', p: 'n.', s: [
    { m: '끝', syn: ['finish'], ex: [
      ['We waited until the end.', '우리는 끝까지 기다렸다.'],
      ['The end of the story was sad.', '이야기의 끝은 슬펐다.'],
      ['Write your name at the end.', '끝에 이름을 쓰세요.'],
    ]},
  ]},
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
  { w: 'evening', p: 'n.', s: [
    { m: '저녁', syn: ['nightfall'], ex: [
      ['I read in the evening.', '나는 저녁에 책을 읽는다.'],
      ['The evening air was cool.', '저녁 공기가 시원했다.'],
      ['See you tomorrow evening.', '내일 저녁에 보자.'],
    ]},
  ]},
  { w: 'every', p: 'adj.', s: [
    { m: '모든, 매 ~', syn: ['each'], ex: [
      ['Every student has a book.', '모든 학생이 책을 가지고 있다.'],
      ['She runs every morning.', '그녀는 매일 아침 달린다.'],
      ['We meet every Friday.', '우리는 매주 금요일에 만난다.'],
    ]},
  ]},
  { w: 'everyone', p: 'pron.', s: [
    { m: '모든 사람, 모두', syn: ['everybody'], ex: [
      ['Everyone likes her.', '모두가 그녀를 좋아한다.'],
      ['Everyone was ready to go.', '모두 갈 준비가 되어 있었다.'],
      ['Say hello to everyone.', '모두에게 인사해라.'],
    ]},
  ]},
  { w: 'example', p: 'n.', s: [
    { m: '예, 보기', syn: ['instance'], ex: [
      ['Give me an example, please.', '예를 하나 들어 주세요.'],
      ['This is a good example.', '이것은 좋은 예다.'],
      ['She set a good example for us.', '그녀는 우리에게 좋은 본보기가 되었다.'],
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
  { w: 'eye', p: 'n.', s: [
    { m: '눈', syn: ['sight organ'], ex: [
      ['She has big brown eyes.', '그녀는 크고 갈색인 눈을 가졌다.'],
      ['Close your eyes for a moment.', '잠시 눈을 감아라.'],
      ['Something got in my eye.', '눈에 뭔가 들어갔다.'],
    ]},
  ]},
  { w: 'face', p: 'n.', s: [
    { m: '얼굴', syn: ['visage'], ex: [
      ['Wash your face in the morning.', '아침에 얼굴을 씻어라.'],
      ['Her face turned red.', '그녀의 얼굴이 빨개졌다.'],
      ['He has a kind face.', '그는 인상이 좋다.'],
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
  { w: 'family', p: 'n.', s: [
    { m: '가족', syn: ['household'], ex: [
      ['My family has four people.', '우리 가족은 네 명이다.'],
      ['We eat dinner as a family.', '우리는 가족이 함께 저녁을 먹는다.'],
      ['Her family lives in Busan.', '그녀의 가족은 부산에 산다.'],
    ]},
  ]},
  { w: 'famous', p: 'adj.', s: [
    { m: '유명한', syn: ['well-known'], ex: [
      ['He is a famous singer.', '그는 유명한 가수이다.'],
      ['This city is famous for its beaches.', '이 도시는 해변으로 유명하다.'],
      ['She became famous after the movie.', '그녀는 그 영화 이후 유명해졌다.'],
    ]},
  ]},
  { w: 'fan', p: 'n.', s: [
    { m: '선풍기, 팬', syn: ['admirer'], ex: [
      ['Turn on the fan, it is hot.', '더우니 선풍기를 켜라.'],
      ['He is a big fan of that singer.', '그는 그 가수의 열혈 팬이다.'],
      ['The fan makes a strange noise.', '선풍기가 이상한 소리를 낸다.'],
    ]},
  ]},
  { w: 'far', p: 'adv.', s: [
    { m: '멀리, 먼', syn: ['distant'], ex: [
      ['The school is not far from here.', '학교는 여기서 멀지 않다.'],
      ['How far is the station?', '역은 얼마나 먼가요?'],
      ['He walked far into the forest.', '그는 숲 속으로 멀리 걸어갔다.'],
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
  { w: 'fat', p: 'adj.', s: [
    { m: '뚱뚱한, 살찐', syn: ['heavy'], ex: [
      ['The cat is getting fat.', '고양이가 살이 찌고 있다.'],
      ['Too much sugar makes you fat.', '설탕을 너무 먹으면 살이 찐다.'],
      ['He read a fat book.', '그는 두꺼운 책을 읽었다.'],
    ]},
  ]},
  { w: 'father', p: 'n.', s: [
    { m: '아버지', syn: ['dad'], ex: [
      ['My father works at a bank.', '우리 아버지는 은행에서 일하신다.'],
      ['Her father cooks very well.', '그녀의 아버지는 요리를 아주 잘하신다.'],
      ['He became a father last year.', '그는 작년에 아버지가 되었다.'],
    ]},
  ]},
  { w: 'favorite', p: 'adj.', s: [
    { m: '가장 좋아하는', syn: ['best-loved'], ex: [
      ['Blue is my favorite color.', '파란색은 내가 가장 좋아하는 색이다.'],
      ['What is your favorite subject?', '네가 가장 좋아하는 과목은 무엇이니?'],
      ['This is my favorite song these days.', '이것이 요즘 내가 가장 좋아하는 노래이다.'],
    ]},
  ]},
  { w: 'favourite', p: 'adj.', s: [
    { m: '가장 좋아하는 (영국식)', syn: ['favorite'], ex: [
      ['Blue is my favourite colour.', '파랑은 내가 가장 좋아하는 색이다.'],
      ['This is her favourite song.', '이것은 그녀가 가장 좋아하는 노래다.'],
      ['What is your favourite food?', '가장 좋아하는 음식이 뭐니?'],
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
  { w: 'fight', p: 'v.', s: [
    { m: '싸우다', syn: ['battle'], ex: [
      ['Do not fight with your brother.', '동생과 싸우지 마라.'],
      ['They fought over a small thing.', '그들은 사소한 일로 싸웠다.'],
      ['The two teams are fighting hard.', '두 팀이 치열하게 겨루고 있다.'],
    ]},
  ]},
  { w: 'file', p: 'n.', s: [
    { m: '파일, 서류철', syn: ['folder'], ex: [
      ['Save the file on your computer.', '파일을 컴퓨터에 저장해라.'],
      ['She opened the file to read it.', '그녀는 읽으려고 파일을 열었다.'],
      ['This file is too large to send.', '이 파일은 너무 커서 보낼 수 없다.'],
    ]},
  ]},
  { w: 'fill', p: 'v.', s: [
    { m: '채우다', syn: ['make full'], ex: [
      ['Fill the bottle with water.', '병을 물로 채워라.'],
      ['She filled the box with books.', '그녀는 상자를 책으로 채웠다.'],
      ['The room is filling with people.', '방이 사람들로 차고 있다.'],
    ]},
  ]},
  { w: 'film', p: 'n.', s: [
    { m: '영화', syn: ['movie'], ex: [
      ['We watched a film last night.', '우리는 어젯밤에 영화를 봤다.'],
      ['The film was two hours long.', '그 영화는 두 시간짜리였다.'],
      ['She likes old films.', '그녀는 옛날 영화를 좋아한다.'],
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
  { w: 'fine', p: 'adj.', s: [
    { m: '좋은, 괜찮은', syn: ['good'], ex: [
      ['The weather is fine today.', '오늘 날씨가 좋다.'],
      ['I am fine, thank you.', '저는 괜찮아요, 고맙습니다.'],
      ['That is a fine idea.', '그거 좋은 생각이다.'],
    ]},
  ]},
  { w: 'finger', p: 'n.', s: [
    { m: '손가락', syn: ['digit'], ex: [
      ['She cut her finger on the glass.', '그녀는 유리에 손가락을 베었다.'],
      ['He pointed with his finger.', '그는 손가락으로 가리켰다.'],
      ['We have five fingers on each hand.', '한 손에 손가락이 다섯 개 있다.'],
    ]},
  ]},
  { w: 'finish', p: 'v.', s: [
    { m: '끝내다, 끝나다', syn: ['complete', 'end'], ex: [
      ['I finished my homework.', '나는 숙제를 끝냈다.'],
      ['The class finishes at three.', '수업은 3시에 끝난다.'],
      ['Finish your food before you play.', '놀기 전에 밥을 다 먹어라.'],
    ]},
  ]},
  { w: 'fire', p: 'n.', s: [
    { m: '불, 화재', syn: ['flame'], ex: [
      ['The fire kept us warm.', '불이 우리를 따뜻하게 해 주었다.'],
      ['A fire broke out in the building.', '건물에 불이 났다.'],
      ['Do not play with fire.', '불장난하지 마라.'],
    ]},
  ]},
  { w: 'first', p: 'adj.', s: [
    { m: '첫 번째의', syn: ['initial'], ex: [
      ['She was the first to arrive.', '그녀가 가장 먼저 도착했다.'],
      ['This is my first day here.', '오늘이 여기서 첫날이다.'],
      ['Read the first sentence again.', '첫 문장을 다시 읽어라.'],
    ]},
  ]},
  { w: 'fish', p: 'n.', s: [
    { m: '물고기, 생선', syn: ['seafood'], ex: [
      ['We caught three fish today.', '우리는 오늘 물고기 세 마리를 잡았다.'],
      ['Fish live in water.', '물고기는 물에서 산다.'],
      ['She cooked fish for dinner.', '그녀는 저녁으로 생선을 요리했다.'],
    ]},
  ]},
  { w: 'five', p: 'num.', s: [
    { m: '다섯, 5', syn: ['5'], ex: [
      ['I have five pencils.', '나는 연필 다섯 자루가 있다.'],
      ['The movie starts at five.', '영화는 5시에 시작한다.'],
      ['Five students were absent.', '학생 다섯 명이 결석했다.'],
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
  { w: 'flower', p: 'n.', s: [
    { m: '꽃', syn: ['blossom'], ex: [
      ['The flowers bloom in spring.', '꽃은 봄에 핀다.'],
      ['She gave me a red flower.', '그녀는 나에게 빨간 꽃을 주었다.'],
      ['This flower smells sweet.', '이 꽃은 향기가 좋다.'],
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
  { w: 'food', p: 'n.', s: [
    { m: '음식', syn: [], ex: [
      ['Korean food is delicious.', '한국 음식은 맛있다.'],
      ['We bought food at the market.', '우리는 시장에서 음식을 샀다.'],
      ['Do not waste food.', '음식을 낭비하지 마라.'],
    ]},
  ]},
  { w: 'fool', p: 'n.', s: [
    { m: '바보', syn: ['idiot'], ex: [
      ['Do not be a fool.', '바보처럼 굴지 마라.'],
      ['He felt like a fool.', '그는 바보가 된 기분이었다.'],
      ['Only a fool would believe that.', '바보만이 그것을 믿을 것이다.'],
    ]},
  ]},
  { w: 'foot', p: 'n.', s: [
    { m: '발', syn: ['feet'], ex: [
      ['My foot hurts after the walk.', '걷고 나니 발이 아프다.'],
      ['He kicked the ball with his foot.', '그는 발로 공을 찼다.'],
      ['We went there on foot.', '우리는 걸어서 그곳에 갔다.'],
    ]},
  ]},
  { w: 'football', p: 'n.', s: [
    { m: '축구, 미식축구', syn: ['soccer'], ex: [
      ['They play football every Saturday.', '그들은 토요일마다 축구를 한다.'],
      ['Football is popular around the world.', '축구는 전 세계에서 인기가 있다.'],
      ['He joined the football team.', '그는 축구팀에 들어갔다.'],
    ]},
  ]},
  { w: 'for', p: 'prep.', s: [
    { m: '~을 위해, ~ 동안', syn: ['to'], ex: [
      ['This gift is for you.', '이 선물은 너를 위한 것이다.'],
      ['We waited for an hour.', '우리는 한 시간 동안 기다렸다.'],
      ['She works for a big company.', '그녀는 큰 회사에서 일한다.'],
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
  { w: 'fork', p: 'n.', s: [
    { m: '포크', syn: ['utensil'], ex: [
      ['Eat the cake with a fork.', '포크로 케이크를 먹어라.'],
      ['The fork fell off the table.', '포크가 탁자에서 떨어졌다.'],
      ['Put the fork next to the plate.', '포크를 접시 옆에 놓아라.'],
    ]},
  ]},
  { w: 'form', p: 'n.', s: [
    { m: '형태, 양식', syn: ['shape'], ex: [
      ['Fill in this form, please.', '이 양식을 작성해 주세요.'],
      ['Water can take any form.', '물은 어떤 형태든 될 수 있다.'],
      ['Ice is a form of water.', '얼음은 물의 한 형태다.'],
    ]},
  ]},
  { w: 'four', p: 'num.', s: [
    { m: '넷, 4', syn: ['4'], ex: [
      ['There are four seasons in Korea.', '한국에는 사계절이 있다.'],
      ['She has four brothers.', '그녀는 남자 형제가 넷이다.'],
      ['We meet at four every day.', '우리는 매일 4시에 만난다.'],
    ]},
  ]},
  { w: 'fox', p: 'n.', s: [
    { m: '여우', syn: ['animal'], ex: [
      ['A fox ran across the field.', '여우 한 마리가 들판을 가로질러 달렸다.'],
      ['Foxes are clever animals.', '여우는 영리한 동물이다.'],
      ['We saw a fox in the forest.', '우리는 숲에서 여우를 보았다.'],
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
  { w: 'friend', p: 'n.', s: [
    { m: '친구', syn: ['pal'], ex: [
      ['She is my best friend.', '그녀는 내 가장 친한 친구다.'],
      ['I made new friends at school.', '나는 학교에서 새 친구를 사귀었다.'],
      ['A friend helped me with my bag.', '친구가 내 가방을 들어 주었다.'],
    ]},
  ]},
  { w: 'friendly', p: 'adj.', s: [
    { m: '친절한, 다정한', syn: ['kind', 'nice'], ex: [
      ['Our new teacher is friendly.', '우리 새 선생님은 다정하시다.'],
      ['The people there were very friendly.', '그곳 사람들은 매우 친절했다.'],
      ['He gave me a friendly smile.', '그는 나에게 다정한 미소를 지었다.'],
    ]},
  ]},
  { w: 'from', p: 'prep.', s: [
    { m: '~에서, ~로부터', syn: ['out of'], ex: [
      ['She comes from Canada.', '그녀는 캐나다에서 왔다.'],
      ['I got a letter from my aunt.', '나는 이모에게서 편지를 받았다.'],
      ['The store is far from here.', '그 가게는 여기서 멀다.'],
    ]},
  ]},
  { w: 'front', p: 'n.', s: [
    { m: '앞, 앞면', syn: [], ex: [
      ['Please sit in the front.', '앞쪽에 앉아 주세요.'],
      ['Write your name on the front of the paper.', '종이 앞면에 이름을 쓰세요.'],
      ['A car stopped at the front of the building.', '차 한 대가 건물 앞에 섰다.'],
    ]},
  ]},
  { w: 'fruit', p: 'n.', s: [
    { m: '과일', syn: ['produce'], ex: [
      ['Fruit is good for your health.', '과일은 건강에 좋다.'],
      ['She bought fresh fruit.', '그녀는 신선한 과일을 샀다.'],
      ['Apples are my favorite fruit.', '사과는 내가 제일 좋아하는 과일이다.'],
    ]},
  ]},
  { w: 'full', p: 'adj.', s: [
    { m: '가득 찬, 배부른', syn: ['filled'], ex: [
      ['The box is full of books.', '상자가 책으로 가득하다.'],
      ['I am full, thank you.', '배불러요, 고맙습니다.'],
      ['The bus was full this morning.', '오늘 아침 버스가 만원이었다.'],
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
  { w: 'game', p: 'n.', s: [
    { m: '경기, 게임', syn: ['match'], ex: [
      ['We won the game yesterday.', '우리는 어제 경기에서 이겼다.'],
      ['This game is easy to learn.', '이 게임은 배우기 쉽다.'],
      ['The game starts at three.', '경기는 3시에 시작한다.'],
    ]},
  ]},
  { w: 'garden', p: 'n.', s: [
    { m: '정원, 텃밭', syn: [], ex: [
      ['My mother grows flowers in the garden.', '어머니는 정원에서 꽃을 기르신다.'],
      ['The garden looks beautiful in spring.', '정원은 봄에 아름다워 보인다.'],
      ['We had lunch in the garden.', '우리는 정원에서 점심을 먹었다.'],
    ]},
  ]},
  { w: 'gas', p: 'n.', s: [
    { m: '가스, 기체', syn: ['fuel'], ex: [
      ['Turn off the gas after cooking.', '요리 후에 가스를 잠가라.'],
      ['Air is a kind of gas.', '공기는 기체의 한 종류다.'],
      ['The gas smells strange.', '가스에서 이상한 냄새가 난다.'],
    ]},
  ]},
  { w: 'gentleman', p: 'n.', s: [
    { m: '신사', syn: ['man'], ex: [
      ['He is a true gentleman.', '그는 진정한 신사다.'],
      ['A gentleman opened the door for us.', '한 신사가 우리를 위해 문을 열어 주었다.'],
      ['Ladies and gentlemen, welcome.', '신사 숙녀 여러분, 환영합니다.'],
    ]},
  ]},
  { w: 'get', p: 'v.', s: [
    { m: '받다, 얻다', syn: ['receive'], ex: [
      ['I got a letter today.', '나는 오늘 편지를 받았다.'],
      ['She gets up at six.', '그녀는 6시에 일어난다.'],
      ['He is getting better now.', '그는 지금 나아지고 있다.'],
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
  { w: 'girl', p: 'n.', s: [
    { m: '소녀, 여자아이', syn: ['lass'], ex: [
      ['The girl is reading a book.', '여자아이가 책을 읽고 있다.'],
      ['Two girls came to the party.', '두 소녀가 파티에 왔다.'],
      ['That girl is my sister.', '저 소녀는 내 여동생이다.'],
    ]},
  ]},
  { w: 'give', p: 'v.', s: [
    { m: '주다', syn: ['hand'], ex: [
      ['Please give me a pen.', '펜을 하나 주세요.'],
      ['She gave him a gift.', '그녀는 그에게 선물을 주었다.'],
      ['He is giving away his old books.', '그는 헌 책을 나눠 주고 있다.'],
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
  { w: 'go', p: 'v.', s: [
    { m: '가다', syn: ['move'], ex: [
      ['Let us go to the park.', '공원에 가자.'],
      ['She went home early.', '그녀는 일찍 집에 갔다.'],
      ['The bus is going to the station.', '버스가 역으로 가고 있다.'],
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
  { w: 'god', p: 'n.', s: [
    { m: '신', syn: ['deity'], ex: [
      ['People prayed to their god.', '사람들이 그들의 신에게 기도했다.'],
      ['The old story is about a god.', '그 옛이야기는 어느 신에 관한 것이다.'],
      ['He believes in one god.', '그는 한 신을 믿는다.'],
    ]},
  ]},
  { w: 'gold', p: 'n.', s: [
    { m: '금', syn: ['precious metal'], ex: [
      ['The ring is made of gold.', '그 반지는 금으로 만들어졌다.'],
      ['Gold is very expensive.', '금은 아주 비싸다.'],
      ['She won a gold medal.', '그녀는 금메달을 땄다.'],
    ]},
  ]},
  { w: 'good', p: 'adj.', s: [
    { m: '좋은, 착한', syn: ['nice'], ex: [
      ['That is a good idea.', '그거 좋은 생각이다.'],
      ['She is good at math.', '그녀는 수학을 잘한다.'],
      ['He is a good boy.', '그는 착한 아이다.'],
    ]},
  ]},
  { w: 'goodbye', p: 'int.', s: [
    { m: '안녕히 가세요, 작별 인사', syn: ['farewell'], ex: [
      ['She said goodbye and left.', '그녀는 작별 인사를 하고 떠났다.'],
      ['We waved goodbye at the gate.', '우리는 정문에서 손을 흔들며 작별했다.'],
      ['It is hard to say goodbye.', '작별 인사를 하기는 어렵다.'],
    ]},
  ]},
  { w: 'grandfather', p: 'n.', s: [
    { m: '할아버지', syn: ['grandpa'], ex: [
      ['My grandfather is eighty years old.', '우리 할아버지는 여든 살이시다.'],
      ['Her grandfather told us a story.', '그녀의 할아버지가 우리에게 이야기를 들려주셨다.'],
      ['I visit my grandfather every month.', '나는 매달 할아버지를 찾아뵌다.'],
    ]},
  ]},
  { w: 'grape', p: 'n.', s: [
    { m: '포도', syn: [], ex: [
      ['These grapes are sweet.', '이 포도는 달다.'],
      ['She washed the grapes.', '그녀는 포도를 씻었다.'],
      ['We picked grapes on the farm.', '우리는 농장에서 포도를 땄다.'],
    ]},
  ]},
  { w: 'grass', p: 'n.', s: [
    { m: '풀, 잔디', syn: ['lawn'], ex: [
      ['Cows eat grass.', '소는 풀을 먹는다.'],
      ['Do not walk on the grass.', '잔디를 밟지 마세요.'],
      ['The grass is green in spring.', '봄에는 잔디가 푸르다.'],
    ]},
  ]},
  { w: 'gray', p: 'adj.', s: [
    { m: '회색의', syn: ['grey'], ex: [
      ['The sky is gray today.', '오늘 하늘이 잿빛이다.'],
      ['He wore a gray jacket.', '그는 회색 재킷을 입었다.'],
      ['Her hair turned gray.', '그녀의 머리가 세었다.'],
    ]},
  ]},
  { w: 'great', p: 'adj.', s: [
    { m: '훌륭한, 큰', syn: ['excellent'], ex: [
      ['That was a great game.', '그것은 훌륭한 경기였다.'],
      ['She is a great teacher.', '그녀는 훌륭한 선생님이다.'],
      ['We had a great time.', '우리는 아주 즐거운 시간을 보냈다.'],
    ]},
  ]},
  { w: 'green', p: 'adj.', s: [
    { m: '초록의', syn: ['verdant'], ex: [
      ['The leaves are green in summer.', '여름에는 잎이 초록이다.'],
      ['She painted the door green.', '그녀는 문을 초록으로 칠했다.'],
      ['Eat more green vegetables.', '초록 채소를 더 먹어라.'],
    ]},
  ]},
  { w: 'grey', p: 'adj.', s: [
    { m: '회색의 (영국식)', syn: ['gray'], ex: [
      ['A grey cat sat on the wall.', '회색 고양이가 담 위에 앉아 있었다.'],
      ['The clouds are grey and heavy.', '구름이 잿빛으로 무겁다.'],
      ['He bought a grey coat.', '그는 회색 코트를 샀다.'],
    ]},
  ]},
  { w: 'ground', p: 'n.', s: [
    { m: '땅, 지면', syn: ['earth'], ex: [
      ['The ball fell on the ground.', '공이 땅에 떨어졌다.'],
      ['Snow covered the ground.', '눈이 땅을 덮었다.'],
      ['Sit on the ground and rest.', '땅에 앉아 쉬어라.'],
    ]},
  ]},
  { w: 'group', p: 'n.', s: [
    { m: '무리, 집단', syn: ['team'], ex: [
      ['A group of students came.', '학생 한 무리가 왔다.'],
      ['We worked in small groups.', '우리는 소그룹으로 활동했다.'],
      ['The group meets every week.', '그 모임은 매주 만난다.'],
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
  { w: 'guitar', p: 'n.', s: [
    { m: '기타', syn: [], ex: [
      ['He plays the guitar well.', '그는 기타를 잘 친다.'],
      ['She bought a new guitar.', '그녀는 새 기타를 샀다.'],
      ['The guitar has six strings.', '기타는 줄이 여섯 개다.'],
    ]},
  ]},
  { w: 'gum', p: 'n.', s: [
    { m: '껌', syn: ['chewing gum'], ex: [
      ['Do not chew gum in class.', '수업 중에 껌을 씹지 마라.'],
      ['She gave me a piece of gum.', '그녀는 나에게 껌 한 개를 주었다.'],
      ['This gum tastes like mint.', '이 껌은 박하 맛이 난다.'],
    ]},
  ]},
  { w: 'guy', p: 'n.', s: [
    { m: '남자, 사람', syn: ['man'], ex: [
      ['That guy is my neighbor.', '저 남자는 내 이웃이다.'],
      ['He is a nice guy.', '그는 좋은 사람이다.'],
      ['Some guys were playing soccer.', '몇몇 남자들이 축구를 하고 있었다.'],
    ]},
  ]},
  { w: 'habit', p: 'n.', s: [
    { m: '습관', syn: ['routine', 'practice'], ex: [
      ['Reading is a good habit.', '독서는 좋은 습관이다.'],
      ['He has a habit of biting his nails.', '그는 손톱을 물어뜯는 습관이 있다.'],
      ['It takes time to change a habit.', '습관을 바꾸는 데는 시간이 걸린다.'],
    ]},
  ]},
  { w: 'hair', p: 'n.', s: [
    { m: '머리카락, 털', syn: ['locks'], ex: [
      ['She has long black hair.', '그녀는 길고 검은 머리를 가졌다.'],
      ['He cut his hair yesterday.', '그는 어제 머리를 잘랐다.'],
      ['The dog has soft hair.', '그 개는 부드러운 털을 가졌다.'],
    ]},
  ]},
  { w: 'hamburger', p: 'n.', s: [
    { m: '햄버거', syn: ['burger'], ex: [
      ['He ate a hamburger for lunch.', '그는 점심으로 햄버거를 먹었다.'],
      ['This hamburger is too big.', '이 햄버거는 너무 크다.'],
      ['She made a hamburger at home.', '그녀는 집에서 햄버거를 만들었다.'],
    ]},
  ]},
  { w: 'hand', p: 'n.', s: [
    { m: '손', syn: ['palm'], ex: [
      ['Wash your hands before eating.', '먹기 전에 손을 씻어라.'],
      ['He raised his hand to answer.', '그는 답하려고 손을 들었다.'],
      ['She held my hand tightly.', '그녀는 내 손을 꽉 잡았다.'],
    ]},
  ]},
  { w: 'hang', p: 'v.', s: [
    { m: '걸다, 매달다', syn: ['suspend'], ex: [
      ['Hang your coat on the hook.', '코트를 고리에 걸어라.'],
      ['She hung a picture on the wall.', '그녀는 벽에 그림을 걸었다.'],
      ['The clothes are hanging outside.', '옷이 밖에 널려 있다.'],
    ]},
  ]},
  { w: 'happy', p: 'adj.', s: [
    { m: '행복한', syn: ['glad'], ex: [
      ['She looks happy today.', '그녀는 오늘 행복해 보인다.'],
      ['We had a happy childhood.', '우리는 행복한 어린 시절을 보냈다.'],
      ['The news made him happy.', '그 소식이 그를 행복하게 했다.'],
    ]},
  ]},
  { w: 'hard', p: 'adj.', s: [
    { m: '어려운, 단단한', syn: ['difficult'], ex: [
      ['This question is too hard.', '이 문제는 너무 어렵다.'],
      ['The bread became hard.', '빵이 딱딱해졌다.'],
      ['He works hard every day.', '그는 매일 열심히 일한다.'],
    ]},
  ]},
  { w: 'hat', p: 'n.', s: [
    { m: '모자', syn: ['cap'], ex: [
      ['She wore a big hat.', '그녀는 큰 모자를 썼다.'],
      ['Take off your hat inside.', '실내에서는 모자를 벗어라.'],
      ['The wind blew my hat away.', '바람에 내 모자가 날아갔다.'],
    ]},
  ]},
  { w: 'hate', p: 'v.', s: [
    { m: '싫어하다, 미워하다', syn: ['dislike'], ex: [
      ['I hate rainy days.', '나는 비 오는 날이 싫다.'],
      ['She hates waiting in line.', '그녀는 줄 서서 기다리는 것을 싫어한다.'],
      ['He hated the taste of the medicine.', '그는 그 약 맛을 싫어했다.'],
    ]},
  ]},
  { w: 'have', p: 'v.', s: [
    { m: '가지다, 있다', syn: ['own'], ex: [
      ['I have two brothers.', '나는 남자 형제가 둘 있다.'],
      ['She had a good idea.', '그녀에게 좋은 생각이 있었다.'],
      ['We are having lunch now.', '우리는 지금 점심을 먹고 있다.'],
    ]},
  ]},
  { w: 'have to', p: 'phr.', s: [
    { m: '~해야 한다', syn: ['must', 'need to'], ex: [
      ['You have to wash your hands.', '너는 손을 씻어야 한다.'],
      ['I have to finish this today.', '나는 오늘 이것을 끝내야 한다.'],
      ['We had to wait for an hour.', '우리는 한 시간을 기다려야 했다.'],
    ]},
  ]},
  { w: 'he', p: 'pron.', s: [
    { m: '그, 그 남자', syn: ['him'], ex: [
      ['He is my classmate.', '그는 내 반 친구다.'],
      ['He runs faster than me.', '그는 나보다 빨리 달린다.'],
      ['He said nothing at all.', '그는 아무 말도 하지 않았다.'],
    ]},
  ]},
  { w: 'head', p: 'n.', s: [
    { m: '머리', syn: ['skull'], ex: [
      ['My head hurts a little.', '머리가 조금 아프다.'],
      ['She shook her head slowly.', '그녀는 천천히 고개를 저었다.'],
      ['He put a hat on his head.', '그는 머리에 모자를 썼다.'],
    ]},
  ]},
  { w: 'heart', p: 'n.', s: [
    { m: '심장, 마음', syn: ['core'], ex: [
      ['My heart beats fast.', '내 심장이 빨리 뛴다.'],
      ['She has a warm heart.', '그녀는 마음이 따뜻하다.'],
      ['Exercise is good for the heart.', '운동은 심장에 좋다.'],
    ]},
  ]},
  { w: 'heat', p: 'n.', s: [
    { m: '열, 더위', syn: ['warmth'], ex: [
      ['The heat of the sun was strong.', '햇볕의 열기가 강했다.'],
      ['We could not sleep in the heat.', '우리는 더위에 잠들 수 없었다.'],
      ['Turn down the heat a little.', '불을 조금 줄여라.'],
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
  { w: 'hello', p: 'int.', s: [
    { m: '안녕하세요', syn: ['hi'], ex: [
      ['She said hello with a smile.', '그녀는 미소로 인사했다.'],
      ['Say hello to your parents.', '부모님께 안부 전해 줘.'],
      ['He answered the phone with a hello.', '그는 여보세요 하며 전화를 받았다.'],
    ]},
  ]},
  { w: 'helmet', p: 'n.', s: [
    { m: '헬멧', syn: ['head guard'], ex: [
      ['Wear a helmet when you ride.', '탈 때는 헬멧을 써라.'],
      ['His helmet saved his life.', '헬멧이 그의 목숨을 구했다.'],
      ['The helmet is too tight.', '헬멧이 너무 조인다.'],
    ]},
  ]},
  { w: 'help', p: 'v., n.', s: [
    { m: '돕다, 도움', syn: ['aid', 'assist'], ex: [
      ['Can you help me with my homework?', '내 숙제를 도와줄 수 있니?'],
      ['She helped an old man cross the street.', '그녀는 노인이 길을 건너는 것을 도왔다.'],
      ['Thank you for your help.', '도와주셔서 감사합니다.'],
    ]},
  ]},
  { w: 'here', p: 'adv.', s: [
    { m: '여기에', syn: ['at this place'], ex: [
      ['Please wait here.', '여기서 기다려 주세요.'],
      ['She lives here now.', '그녀는 지금 여기 산다.'],
      ['Put your bag here.', '가방을 여기 놓아라.'],
    ]},
  ]},
  { w: 'hero', p: 'n.', s: [
    { m: '영웅', syn: ['champion'], ex: [
      ['He became a hero that day.', '그는 그날 영웅이 되었다.'],
      ['The story is about a young hero.', '그 이야기는 어린 영웅에 관한 것이다.'],
      ['My father is my hero.', '우리 아버지는 나의 영웅이다.'],
    ]},
  ]},
  { w: 'hey', p: 'int.', s: [
    { m: '이봐, 야', syn: ['hi'], ex: [
      ['Hey, wait for me!', '야, 나 좀 기다려!'],
      ['Hey, that is my seat.', '이봐, 거기 내 자리야.'],
      ['He shouted hey across the road.', '그는 길 건너에서 이봐 하고 소리쳤다.'],
    ]},
  ]},
  { w: 'hi', p: 'int.', s: [
    { m: '안녕', syn: ['hello'], ex: [
      ['Hi, how are you?', '안녕, 잘 지내니?'],
      ['She waved and said hi.', '그녀는 손을 흔들며 안녕이라고 했다.'],
      ['Say hi to your sister.', '네 동생에게 안부 전해 줘.'],
    ]},
  ]},
  { w: 'high', p: 'adj.', s: [
    { m: '높은', syn: ['tall'], ex: [
      ['The wall is very high.', '그 담은 아주 높다.'],
      ['Prices are high this year.', '올해 물가가 높다.'],
      ['She has a high fever.', '그녀는 열이 높다.'],
    ]},
  ]},
  { w: 'hike', p: 'v.', s: [
    { m: '등산하다, 하이킹하다', syn: ['trek'], ex: [
      ['We hike every weekend.', '우리는 주말마다 등산한다.'],
      ['They hiked up the mountain.', '그들은 산을 걸어 올랐다.'],
      ['She is hiking with her friends.', '그녀는 친구들과 하이킹하고 있다.'],
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
