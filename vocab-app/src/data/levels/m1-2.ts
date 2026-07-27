/**
 * 중학교 1학년 레벨 2 — 수록 53 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_2 = defineLevel('m1-2', [
  { w: 'camp', p: 'n., v.', s: [
    { m: '캠프, 야영하다', syn: ['stay in a tent'], ex: [
      ['We went to a summer camp.', '우리는 여름 캠프에 갔다.'],
      ['They camped near the river.', '그들은 강 근처에서 야영했다.'],
      ['The camp starts on Monday.', '캠프는 월요일에 시작한다.'],
    ]},
  ]},
  { w: 'candle', p: 'n.', s: [
    { m: '초, 양초', syn: [], ex: [
      ['She lit a candle in the dark.', '그녀는 어둠 속에서 초에 불을 붙였다.'],
      ['There are ten candles on the cake.', '케이크 위에 초가 열 개 있다.'],
      ['The candle went out.', '초가 꺼졌다.'],
    ]},
  ]},
  { w: 'careful', p: 'adj.', s: [
    { m: '조심하는, 주의 깊은', syn: ['cautious'], ex: [
      ['Be careful on the stairs.', '계단에서 조심해라.'],
      ['She is careful with her words.', '그녀는 말을 조심한다.'],
      ['A careful driver never hurries.', '조심하는 운전자는 결코 서두르지 않는다.'],
    ]},
  ]},
  { w: 'carry', p: 'v.', s: [
    { m: '나르다, 들고 가다', syn: ['bring', 'take'], ex: [
      ['He carried the heavy box.', '그는 무거운 상자를 날랐다.'],
      ['She carries an umbrella every day.', '그녀는 매일 우산을 들고 다닌다.'],
      ['Can you carry this bag for me?', '이 가방 좀 들어 줄 수 있니?'],
    ]},
  ]},
  { w: 'cartoon', p: 'n.', s: [
    { m: '만화, 만화 영화', syn: ['comic'], ex: [
      ['My brother watches cartoons every morning.', '내 남동생은 매일 아침 만화를 본다.'],
      ['This cartoon is really funny.', '이 만화는 정말 재미있다.'],
      ['She drew a cartoon of her teacher.', '그녀는 선생님의 만화를 그렸다.'],
    ]},
  ]},
  { w: 'catch', p: 'v.', s: [
    { m: '잡다, 붙잡다', syn: ['grab', 'take hold of'], ex: [
      ['He caught the ball with one hand.', '그는 한 손으로 공을 잡았다.'],
      ['The cat caught a mouse.', '고양이가 쥐를 잡았다.'],
    ]},
    { m: '(교통편을) 타다', syn: ['take'], ex: [
      ['I ran to catch the bus.', '나는 버스를 타려고 뛰었다.'],
      ['We need to catch the 7 o’clock train.', '우리는 7시 기차를 타야 한다.'],
    ]},
  ]},
  { w: 'certain', p: 'adj.', s: [
    { m: '확실한, 확신하는', syn: ['sure', 'confident'], ex: [
      ["I'm certain he will come.", '나는 그가 올 것이라고 확신한다.'],
      ['It is certain that prices will rise.', '가격이 오를 것은 확실하다.'],
    ]},
    { m: '어떤, 특정한', syn: ['particular', 'specific'], ex: [
      ['Certain foods can cause allergies.', '어떤 음식은 알레르기를 일으킬 수 있다.'],
      ['You may enter only at certain times.', '특정 시간에만 들어갈 수 있다.'],
    ]},
  ]},
  { w: 'chance', p: 'n.', s: [
    { m: '기회', syn: ['opportunity'], ex: [
      ['Give me one more chance.', '기회를 한 번만 더 주세요.'],
      ['This is a good chance to practice.', '이것은 연습할 좋은 기회다.'],
    ]},
    { m: '가능성', syn: ['possibility'], ex: [
      ['There is a chance of rain today.', '오늘 비가 올 가능성이 있다.'],
      ['We have a good chance of winning.', '우리는 이길 가능성이 높다.'],
    ]},
  ]},
  { w: 'change', p: 'v., n.', s: [
    { m: '바꾸다, 변하다', syn: ['switch'], ex: [
      ['She changed her plan.', '그녀는 계획을 바꾸었다.'],
      ['The weather changes quickly here.', '여기는 날씨가 빨리 변한다.'],
    ]},
    { m: '거스름돈, 잔돈', syn: ['coins'], ex: [
      ['Here is your change.', '여기 거스름돈입니다.'],
      ['I have no change for the bus.', '나는 버스 탈 잔돈이 없다.'],
    ]},
  ]},
  { w: 'cheap', p: 'adj.', s: [
    { m: '값이 싼', syn: ['low-priced'], ex: [
      ['These shoes are very cheap.', '이 신발은 아주 싸다.'],
      ['We stayed at a cheap hotel.', '우리는 싼 호텔에 묵었다.'],
      ['Vegetables are cheap in summer.', '여름에는 채소가 싸다.'],
    ]},
  ]},
  { w: 'check', p: 'v.', s: [
    { m: '확인하다, 점검하다', syn: ['make sure'], ex: [
      ['Check your answers again.', '답을 다시 확인해라.'],
      ['He checked the time on his phone.', '그는 휴대폰으로 시간을 확인했다.'],
      ['She is checking the list.', '그녀는 목록을 확인하고 있다.'],
    ]},
  ]},
  { w: 'choose', p: 'v.', s: [
    { m: '고르다, 선택하다', syn: ['pick', 'select'], ex: [
      ['Choose one of these hats.', '이 모자들 중 하나를 골라라.'],
      ['She chose the red one.', '그녀는 빨간 것을 골랐다.'],
      ['You can choose your own topic.', '너는 주제를 스스로 정할 수 있다.'],
    ]},
  ]},
  { w: 'classmate', p: 'n.', s: [
    { m: '반 친구, 급우', syn: [], ex: [
      ['He is my classmate.', '그는 내 반 친구다.'],
      ['My classmates helped me a lot.', '반 친구들이 나를 많이 도와주었다.'],
      ['She made friends with her new classmates.', '그녀는 새 반 친구들과 친해졌다.'],
    ]},
  ]},
  { w: 'clean', p: 'v., adj.', s: [
    { m: '청소하다', syn: ['tidy up', 'wash'], ex: [
      ['I clean my room every Sunday.', '나는 일요일마다 방을 청소한다.'],
      ['We cleaned the classroom together.', '우리는 함께 교실을 청소했다.'],
    ]},
    { m: '깨끗한', syn: ['neat', 'spotless'], ex: [
      ['Keep your hands clean.', '손을 깨끗하게 유지해라.'],
      ['The water here is very clean.', '이곳의 물은 아주 깨끗하다.'],
    ]},
  ]},
  { w: 'climb', p: 'v.', s: [
    { m: '오르다, 등반하다', syn: ['go up'], ex: [
      ['They climbed the mountain together.', '그들은 함께 산을 올랐다.'],
      ['The cat is climbing the tree.', '고양이가 나무를 오르고 있다.'],
      ['We climb these stairs every day.', '우리는 매일 이 계단을 오른다.'],
    ]},
  ]},
  { w: 'close', p: 'v., adj.', s: [
    { m: '닫다', syn: ['shut'], ex: [
      ['Please close the window.', '창문을 닫아 주세요.'],
      ['The shop closes at nine.', '그 가게는 9시에 문을 닫는다.'],
    ]},
    { m: '가까운, 친한', syn: ['near', 'nearby'], ex: [
      ['My school is close to my house.', '내 학교는 집에서 가깝다.'],
      ['She is a close friend of mine.', '그녀는 나의 친한 친구이다.'],
    ]},
  ]},
  { w: 'cloudy', p: 'adj.', s: [
    { m: '흐린, 구름이 낀', syn: [], ex: [
      ['It is cloudy today.', '오늘은 날이 흐리다.'],
      ['The sky became cloudy in the afternoon.', '오후에 하늘이 흐려졌다.'],
      ['We cannot see the stars on cloudy nights.', '흐린 밤에는 별을 볼 수 없다.'],
    ]},
  ]},
  { w: 'collect', p: 'v.', s: [
    { m: '모으다, 수집하다', syn: ['gather', 'save up'], ex: [
      ['He collects old coins.', '그는 오래된 동전을 수집한다.'],
      ['We collected paper for recycling.', '우리는 재활용을 위해 종이를 모았다.'],
      ['She collects stickers from every country.', '그녀는 나라마다 스티커를 모은다.'],
    ]},
  ]},
  { w: 'college', p: 'n.', s: [
    { m: '대학', syn: ['university'], ex: [
      ['My sister goes to college.', '내 누나는 대학에 다닌다.'],
      ['He studied art in college.', '그는 대학에서 미술을 공부했다.'],
      ['The college is near my house.', '그 대학은 우리 집 근처에 있다.'],
    ]},
  ]},
  { w: 'come from', p: 'phr.', s: [
    { m: '~ 출신이다, ~에서 오다', syn: ['be from'], ex: [
      ['She comes from Canada.', '그녀는 캐나다 출신이다.'],
      ['This tea comes from India.', '이 차는 인도에서 온 것이다.'],
      ['Where do you come from?', '어디에서 오셨나요?'],
    ]},
  ]},
  { w: 'comfortable', p: 'adj.', s: [
    { m: '편안한', syn: ['cozy', 'relaxing'], ex: [
      ['This chair is very comfortable.', '이 의자는 아주 편안하다.'],
      ['Wear comfortable shoes for the trip.', '여행에는 편한 신발을 신어라.'],
      ['I felt comfortable with the new teacher.', '나는 새 선생님이 편하게 느껴졌다.'],
    ]},
  ]},
  { w: 'condition', p: 'n.', s: [
    { m: '상태', syn: ['state', 'shape'], ex: [
      ['The bike is in good condition.', '그 자전거는 상태가 좋다.'],
      ['The building is in poor condition.', '그 건물은 상태가 나쁘다.'],
    ]},
    { m: '조건', syn: ['requirement', 'term'], ex: [
      ['You can go on one condition.', '한 가지 조건으로 갈 수 있다.'],
      ['Working conditions have improved.', '근무 조건이 개선되었다.'],
    ]},
  ]},
  { w: 'confident', p: 'adj.', s: [
    { m: '자신 있는, 확신하는', syn: ['sure', 'certain'], ex: [
      ['She is confident about the test.', '그녀는 시험에 자신 있다.'],
      ['He spoke in a confident voice.', '그는 자신 있는 목소리로 말했다.'],
      ['I am confident that we can win.', '나는 우리가 이길 수 있다고 확신한다.'],
    ]},
  ]},
  { w: 'cook', p: 'v., n.', s: [
    { m: '요리하다, 요리사', syn: ['make food'], ex: [
      ['My father cooks dinner on Sundays.', '아버지는 일요일에 저녁을 요리하신다.'],
      ['She cooked pasta for us.', '그녀는 우리에게 파스타를 만들어 주었다.'],
      ['He is a famous cook.', '그는 유명한 요리사다.'],
    ]},
  ]},
  { w: 'corner', p: 'n.', s: [
    { m: '모퉁이, 구석', syn: [], ex: [
      ['Turn left at the corner.', '모퉁이에서 왼쪽으로 도세요.'],
      ['The bookstore is on the corner.', '서점은 모퉁이에 있다.'],
      ['She sat quietly in the corner.', '그녀는 구석에 조용히 앉아 있었다.'],
    ]},
  ]},
  { w: 'cost', p: 'v., n.', s: [
    { m: '(비용이) 들다, 비용', syn: ['price'], ex: [
      ['How much does it cost?', '그것은 얼마입니까?'],
      ['The trip cost too much money.', '그 여행은 돈이 너무 많이 들었다.'],
      ['The cost of the book is low.', '그 책의 값은 낮다.'],
    ]},
  ]},
  { w: 'country', p: 'n.', s: [
    { m: '나라, 국가', syn: ['nation'], ex: [
      ['Korea is a beautiful country.', '한국은 아름다운 나라다.'],
      ['He has visited many countries.', '그는 많은 나라를 방문했다.'],
    ]},
    { m: '시골', syn: ['countryside'], ex: [
      ['My grandparents live in the country.', '우리 조부모님은 시골에 사신다.'],
      ['Life in the country is quiet.', '시골 생활은 조용하다.'],
    ]},
  ]},
  { w: 'cousin', p: 'n.', s: [
    { m: '사촌', syn: [], ex: [
      ['My cousin is the same age as me.', '내 사촌은 나와 동갑이다.'],
      ['I met my cousins at the party.', '나는 파티에서 사촌들을 만났다.'],
      ['Her cousin lives in Canada.', '그녀의 사촌은 캐나다에 산다.'],
    ]},
  ]},
  { w: 'cover', p: 'v., n.', s: [
    { m: '덮다, 가리다', syn: ['hide'], ex: [
      ['Cover the pot with a lid.', '냄비를 뚜껑으로 덮어라.'],
      ['Snow covered the whole town.', '눈이 온 마을을 덮었다.'],
      ['She covered her face with her hands.', '그녀는 손으로 얼굴을 가렸다.'],
    ]},
  ]},
  { w: 'crowded', p: 'adj.', s: [
    { m: '붐비는, 혼잡한', syn: ['full of people'], ex: [
      ['The subway is crowded in the morning.', '아침에는 지하철이 붐빈다.'],
      ['We left because the shop was crowded.', '가게가 붐벼서 우리는 나왔다.'],
      ['It was a crowded street.', '그곳은 붐비는 거리였다.'],
    ]},
  ]},
  { w: 'cry', p: 'v.', s: [
    { m: '울다', syn: ['weep'], ex: [
      ['The baby cried all night.', '아기가 밤새 울었다.'],
      ['Do not cry over a small mistake.', '작은 실수로 울지 마라.'],
      ['She is crying because of the sad movie.', '그녀는 슬픈 영화 때문에 울고 있다.'],
    ]},
  ]},
  { w: 'culture', p: 'n.', s: [
    { m: '문화', syn: ['way of life'], ex: [
      ['I want to learn about Korean culture.', '나는 한국 문화에 대해 배우고 싶다.'],
      ['Food is an important part of culture.', '음식은 문화의 중요한 부분이다.'],
      ['We studied the culture of Japan.', '우리는 일본의 문화를 공부했다.'],
    ]},
  ]},
  { w: 'dangerous', p: 'adj.', s: [
    { m: '위험한', syn: ['unsafe', 'risky'], ex: [
      ['Swimming here is dangerous.', '여기서 수영하는 것은 위험하다.'],
      ['It is dangerous to use a phone while walking.', '걸으면서 휴대폰을 쓰는 것은 위험하다.'],
      ['The road becomes dangerous in winter.', '그 길은 겨울에 위험해진다.'],
    ]},
  ]},
  { w: 'dark', p: 'adj.', s: [
    { m: '어두운', syn: [], ex: [
      ['The room was too dark to read.', '방이 너무 어두워서 읽을 수 없었다.'],
      ['It gets dark early in winter.', '겨울에는 일찍 어두워진다.'],
      ['She is afraid of dark places.', '그녀는 어두운 곳을 무서워한다.'],
    ]},
  ]},
  { w: 'decide', p: 'v.', s: [
    { m: '결정하다', syn: ['make up one’s mind', 'choose'], ex: [
      ['We decided to go camping.', '우리는 캠핑을 가기로 결정했다.'],
      ['He decided not to join the club.', '그는 그 동아리에 들지 않기로 했다.'],
      ['Have you decided yet?', '결정했니?'],
    ]},
  ]},
  { w: 'deep', p: 'adj.', s: [
    { m: '깊은', syn: [], ex: [
      ['The river is very deep here.', '이곳의 강은 아주 깊다.'],
      ['Take a deep breath.', '숨을 깊이 들이쉬어라.'],
      ['He fell into a deep sleep.', '그는 깊은 잠에 빠졌다.'],
    ]},
  ]},
  { w: 'delicious', p: 'adj.', s: [
    { m: '맛있는', syn: ['tasty', 'yummy'], ex: [
      ['The soup was delicious.', '그 수프는 맛있었다.'],
      ['My grandmother makes delicious cookies.', '할머니는 맛있는 쿠키를 만드신다.'],
      ['Everything smelled delicious.', '모든 것에서 맛있는 냄새가 났다.'],
    ]},
  ]},
  { w: 'depend on', p: 'phr.', s: [
    { m: '~에 달려 있다', syn: ['rely on', 'be up to'], ex: [
      ['It depends on the weather.', '그것은 날씨에 달려 있다.'],
      ['Our plan depends on his answer.', '우리 계획은 그의 대답에 달려 있다.'],
    ]},
    { m: '~에 의존하다', syn: ['count on'], ex: [
      ['Children depend on their parents.', '아이들은 부모에게 의존한다.'],
      ['You can depend on me.', '나에게 의지해도 된다.'],
    ]},
  ]},
  { w: 'die', p: 'v.', s: [
    { m: '죽다', syn: ['pass away'], ex: [
      ['The old tree died last winter.', '그 늙은 나무는 지난겨울에 죽었다.'],
      ['Many fish die in dirty water.', '많은 물고기가 더러운 물에서 죽는다.'],
      ['The plant will die without water.', '그 식물은 물 없이는 죽을 것이다.'],
    ]},
  ]},
  { w: 'difference', p: 'n.', s: [
    { m: '차이', syn: ['gap', 'contrast'], ex: [
      ["What's the difference between them?", '그것들의 차이가 무엇이니?'],
      ['There is a big difference in price.', '가격에 큰 차이가 있다.'],
      ['One person can make a difference.', '한 사람이 변화를 만들 수 있다.'],
    ]},
  ]},
  { w: 'difficult', p: 'adj.', s: [
    { m: '어려운', syn: ['hard', 'tough'], ex: [
      ['This question is too difficult.', '이 문제는 너무 어렵다.'],
      ['It is difficult to wake up early.', '일찍 일어나는 것은 어렵다.'],
      ['Learning a language is difficult but fun.', '언어를 배우는 것은 어렵지만 재미있다.'],
    ]},
  ]},
  { w: 'dirty', p: 'adj.', s: [
    { m: '더러운', syn: ['unclean'], ex: [
      ['Your hands are dirty.', '네 손이 더럽다.'],
      ['The river became dirty.', '그 강은 더러워졌다.'],
      ['Do not wear dirty shoes inside.', '더러운 신발을 신고 안에 들어오지 마라.'],
    ]},
  ]},
  { w: 'discover', p: 'v.', s: [
    { m: '발견하다, 알아내다', syn: ['find', 'find out'], ex: [
      ['Scientists discovered a new planet.', '과학자들이 새 행성을 발견했다.'],
      ['I discovered that I liked cooking.', '나는 요리를 좋아한다는 것을 알게 되었다.'],
      ['The cave was discovered in 1940.', '그 동굴은 1940년에 발견되었다.'],
    ]},
  ]},
  { w: 'discuss', p: 'v.', s: [
    { m: '토론하다, 논의하다', syn: ['talk over'], ex: [
      ['We discussed the problem in class.', '우리는 수업에서 그 문제를 논의했다.'],
      ['Let us discuss it tomorrow.', '내일 그것을 논의합시다.'],
      ['They are discussing the plan now.', '그들은 지금 계획을 논의하고 있다.'],
    ]},
  ]},
  { w: 'draw', p: 'v.', s: [
    { m: '그리다', syn: ['sketch'], ex: [
      ['She can draw very well.', '그녀는 그림을 아주 잘 그린다.'],
      ['He drew a picture of his dog.', '그는 자기 개를 그렸다.'],
      ['The children are drawing flowers.', '아이들이 꽃을 그리고 있다.'],
    ]},
  ]},
  { w: 'dream', p: 'n., v.', s: [
    { m: '꿈, 장래 희망', syn: ['hope', 'goal'], ex: [
      ['My dream is to be a teacher.', '내 꿈은 선생님이 되는 것이다.'],
      ['Never give up on your dream.', '네 꿈을 절대 포기하지 마라.'],
    ]},
    { m: '(잠잘 때 꾸는) 꿈; 꿈을 꾸다', syn: [], ex: [
      ['I had a strange dream last night.', '나는 어젯밤 이상한 꿈을 꾸었다.'],
      ['She dreamed about flying.', '그녀는 나는 꿈을 꾸었다.'],
    ]},
  ]},
  { w: 'drive', p: 'v.', s: [
    { m: '운전하다', syn: [], ex: [
      ['My mother drives to work.', '어머니는 운전해서 출근하신다.'],
      ['He drove us to the airport.', '그는 우리를 공항까지 태워다 주었다.'],
      ['She is driving too fast.', '그녀는 너무 빨리 운전하고 있다.'],
    ]},
  ]},
  { w: 'drop', p: 'v.', s: [
    { m: '떨어뜨리다, 떨어지다', syn: ['let fall'], ex: [
      ['Do not drop the glass.', '유리잔을 떨어뜨리지 마라.'],
      ['He dropped his pencil on the floor.', '그는 연필을 바닥에 떨어뜨렸다.'],
      ['The temperature is dropping fast.', '기온이 빠르게 떨어지고 있다.'],
    ]},
  ]},
  { w: 'dry', p: 'adj., v.', s: [
    { m: '마른, 건조한, 말리다', syn: [], ex: [
      ['The clothes are dry now.', '옷이 이제 말랐다.'],
      ['The air is very dry in winter.', '겨울에는 공기가 매우 건조하다.'],
      ['She dried her hair with a towel.', '그녀는 수건으로 머리를 말렸다.'],
    ]},
  ]},
  { w: 'during', p: 'prep.', s: [
    { m: '~ 동안', syn: ['throughout'], ex: [
      ['I read many books during vacation.', '나는 방학 동안 책을 많이 읽었다.'],
      ['Please be quiet during the class.', '수업 중에는 조용히 해 주세요.'],
      ['It rained during the night.', '밤 동안 비가 내렸다.'],
    ]},
  ]},
  { w: 'early', p: 'adj., adv.', s: [
    { m: '이른, 일찍', syn: ['soon'], ex: [
      ['I got up early this morning.', '나는 오늘 아침 일찍 일어났다.'],
      ['She arrived early for the meeting.', '그녀는 회의에 일찍 도착했다.'],
      ['We had an early dinner.', '우리는 이른 저녁을 먹었다.'],
    ]},
  ]},
  { w: 'earth', p: 'n.', s: [
    { m: '지구', syn: ['the world'], ex: [
      ['The earth goes around the sun.', '지구는 태양 주위를 돈다.'],
      ['We must protect the earth.', '우리는 지구를 보호해야 한다.'],
      ['Water covers most of the earth.', '물이 지구의 대부분을 덮고 있다.'],
    ]},
  ]},
  { w: 'easy', p: 'adj.', s: [
    { m: '쉬운', syn: ['simple'], ex: [
      ['The test was easy.', '시험은 쉬웠다.'],
      ['This game is easy to learn.', '이 게임은 배우기 쉽다.'],
      ['It is not easy to speak English well.', '영어를 잘 말하기는 쉽지 않다.'],
    ]},
  ]},
], 'curriculum');
