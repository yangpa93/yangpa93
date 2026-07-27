/**
 * 중학교 1학년 레벨 1 어휘 149개.
 *
 * 선정 기준: 교육부 「기본 어휘 목록」 중 중학교 1학년 검정 교과서(동아·천재·YBM·미래엔·비상)에
 * 공통으로 등장하는 기초 어휘와, 중1 수준에서 반복 출제되는 기본 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M1_1 = defineLevel('m1-1', [
  { w: 'about', p: 'prep., adv.', s: [
    { m: '~에 대하여', syn: ['on', 'regarding'], ex: [
      ['We talked about the movie.', '우리는 그 영화에 대해 이야기했다.'],
      ['This book is about space.', '이 책은 우주에 대한 것이다.'],
      ['Tell me about your family.', '너의 가족에 대해 말해 줘.'],
    ]},
    { m: '약, 대략', syn: ['around', 'roughly'], ex: [
      ['It takes about ten minutes.', '그것은 약 10분 걸린다.'],
      ['There were about thirty students.', '학생이 서른 명쯤 있었다.'],
    ]},
  ]},
  { w: 'afraid', p: 'adj.', s: [
    { m: '두려워하는, 무서워하는', syn: ['scared', 'frightened'], ex: [
      ['She is afraid of dogs.', '그녀는 개를 무서워한다.'],
      ["Don't be afraid to ask questions.", '질문하기를 두려워하지 마라.'],
      ['I was afraid of the dark as a child.', '나는 어릴 때 어둠을 무서워했다.'],
    ]},
  ]},
  { w: 'agree', p: 'v.', s: [
    { m: '동의하다', syn: ['accept'], ex: [
      ['I agree with your idea.', '나는 네 생각에 동의한다.'],
      ['Everyone agreed to the new plan.', '모두가 새 계획에 동의했다.'],
      ['My parents did not agree at first.', '부모님은 처음에는 동의하지 않으셨다.'],
    ]},
  ]},
  { w: 'already', p: 'adv.', s: [
    { m: '이미, 벌써', syn: ['by now'], ex: [
      ['The bus has already left.', '버스는 이미 떠났다.'],
      ['I already finished my homework.', '나는 벌써 숙제를 끝냈다.'],
      ['It is already dark outside.', '밖은 벌써 어둡다.'],
    ]},
  ]},
  { w: 'angry', p: 'adj.', s: [
    { m: '화난', syn: ['mad', 'upset'], ex: [
      ['My father was angry at me.', '아버지는 나에게 화가 나셨다.'],
      ['She looked angry after the game.', '그녀는 경기 후에 화나 보였다.'],
      ['He gets angry very easily.', '그는 아주 쉽게 화를 낸다.'],
    ]},
  ]},
  { w: 'answer', p: 'n., v.', s: [
    { m: '대답; 대답하다', syn: ['reply', 'respond'], ex: [
      ['Please answer my question.', '내 질문에 대답해 주세요.'],
      ['Nobody answered the phone.', '아무도 전화를 받지 않았다.'],
    ]},
    { m: '(문제의) 답', syn: ['solution'], ex: [
      ['The answer to number five is B.', '5번의 답은 B이다.'],
      ['I wrote the wrong answer.', '나는 틀린 답을 썼다.'],
    ]},
  ]},
  { w: 'arrive', p: 'v.', s: [
    { m: '도착하다', syn: ['get to', 'reach'], ex: [
      ['We arrived at school early.', '우리는 학교에 일찍 도착했다.'],
      ['The train arrives at six.', '기차는 6시에 도착한다.'],
      ['They arrived in Seoul last night.', '그들은 어젯밤 서울에 도착했다.'],
    ]},
  ]},
  { w: 'believe', p: 'v.', s: [
    { m: '믿다', syn: ['trust'], ex: [
      ['I believe you are right.', '나는 네가 옳다고 믿는다.'],
      ['She believed his story.', '그녀는 그의 이야기를 믿었다.'],
      ['Believe in yourself.', '너 자신을 믿어라.'],
    ]},
  ]},
  { w: 'borrow', p: 'v.', s: [
    { m: '빌리다', syn: ['take out'], ex: [
      ['Can I borrow your pencil?', '네 연필을 빌려도 될까?'],
      ['I borrowed two books from the library.', '나는 도서관에서 책 두 권을 빌렸다.'],
      ['He borrowed money from his brother.', '그는 형에게서 돈을 빌렸다.'],
    ]},
  ]},
  { w: 'bring', p: 'v.', s: [
    { m: '가져오다, 데려오다', syn: ['carry', 'take along'], ex: [
      ['Bring your book tomorrow.', '내일 책을 가져와라.'],
      ['She brought her little sister.', '그녀는 여동생을 데려왔다.'],
      ['Can you bring me some water?', '물 좀 가져다줄 수 있니?'],
    ]},
  ]},
  { w: 'build', p: 'v.', s: [
    { m: '짓다, 세우다', syn: ['construct', 'put up'], ex: [
      ['They will build a new library.', '그들은 새 도서관을 지을 것이다.'],
      ['The bridge was built in 1998.', '그 다리는 1998년에 지어졌다.'],
      ['We built a snowman together.', '우리는 함께 눈사람을 만들었다.'],
    ]},
  ]},
  { w: 'busy', p: 'adj.', s: [
    { m: '바쁜', syn: ['occupied'], ex: [
      ['My mother is busy these days.', '어머니는 요즘 바쁘시다.'],
      ['I was busy studying for the test.', '나는 시험 공부하느라 바빴다.'],
    ]},
    { m: '(장소가) 붐비는', syn: ['crowded'], ex: [
      ['The street is busy on weekends.', '그 거리는 주말에 붐빈다.'],
      ['It was a busy morning at the station.', '역은 붐비는 아침이었다.'],
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
  { w: 'choose', p: 'v.', s: [
    { m: '고르다, 선택하다', syn: ['pick', 'select'], ex: [
      ['Choose one of these hats.', '이 모자들 중 하나를 골라라.'],
      ['She chose the red one.', '그녀는 빨간 것을 골랐다.'],
      ['You can choose your own topic.', '너는 주제를 스스로 정할 수 있다.'],
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
  { w: 'collect', p: 'v.', s: [
    { m: '모으다, 수집하다', syn: ['gather', 'save up'], ex: [
      ['He collects old coins.', '그는 오래된 동전을 수집한다.'],
      ['We collected paper for recycling.', '우리는 재활용을 위해 종이를 모았다.'],
      ['She collects stickers from every country.', '그녀는 나라마다 스티커를 모은다.'],
    ]},
  ]},
  { w: 'comfortable', p: 'adj.', s: [
    { m: '편안한', syn: ['cozy', 'relaxing'], ex: [
      ['This chair is very comfortable.', '이 의자는 아주 편안하다.'],
      ['Wear comfortable shoes for the trip.', '여행에는 편한 신발을 신어라.'],
      ['I felt comfortable with the new teacher.', '나는 새 선생님이 편하게 느껴졌다.'],
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
  { w: 'decide', p: 'v.', s: [
    { m: '결정하다', syn: ['make up one’s mind', 'choose'], ex: [
      ['We decided to go camping.', '우리는 캠핑을 가기로 결정했다.'],
      ['He decided not to join the club.', '그는 그 동아리에 들지 않기로 했다.'],
      ['Have you decided yet?', '결정했니?'],
    ]},
  ]},
  { w: 'delicious', p: 'adj.', s: [
    { m: '맛있는', syn: ['tasty', 'yummy'], ex: [
      ['The soup was delicious.', '그 수프는 맛있었다.'],
      ['My grandmother makes delicious cookies.', '할머니는 맛있는 쿠키를 만드신다.'],
      ['Everything smelled delicious.', '모든 것에서 맛있는 냄새가 났다.'],
    ]},
  ]},
  { w: 'difficult', p: 'adj.', s: [
    { m: '어려운', syn: ['hard', 'tough'], ex: [
      ['This question is too difficult.', '이 문제는 너무 어렵다.'],
      ['It is difficult to wake up early.', '일찍 일어나는 것은 어렵다.'],
      ['Learning a language is difficult but fun.', '언어를 배우는 것은 어렵지만 재미있다.'],
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
  { w: 'during', p: 'prep.', s: [
    { m: '~ 동안', syn: ['throughout'], ex: [
      ['I read many books during vacation.', '나는 방학 동안 책을 많이 읽었다.'],
      ['Please be quiet during the class.', '수업 중에는 조용히 해 주세요.'],
      ['It rained during the night.', '밤 동안 비가 내렸다.'],
    ]},
  ]},
  { w: 'enough', p: 'adj., adv.', s: [
    { m: '충분한, 충분히', syn: ['plenty of'], ex: [
      ['We have enough time.', '우리는 충분한 시간이 있다.'],
      ['He is old enough to travel alone.', '그는 혼자 여행할 만큼 나이가 들었다.'],
      ['There is not enough water.', '물이 충분하지 않다.'],
    ]},
  ]},
  { w: 'enjoy', p: 'v.', s: [
    { m: '즐기다', syn: ['have fun with', 'like'], ex: [
      ['I enjoy playing soccer.', '나는 축구하는 것을 즐긴다.'],
      ['Did you enjoy the concert?', '콘서트는 즐거웠니?'],
      ['We enjoyed our time at the beach.', '우리는 해변에서의 시간을 즐겼다.'],
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
  { w: 'famous', p: 'adj.', s: [
    { m: '유명한', syn: ['well-known'], ex: [
      ['He is a famous singer.', '그는 유명한 가수이다.'],
      ['This city is famous for its beaches.', '이 도시는 해변으로 유명하다.'],
      ['She became famous after the movie.', '그녀는 그 영화 이후 유명해졌다.'],
    ]},
  ]},
  { w: 'favorite', p: 'adj.', s: [
    { m: '가장 좋아하는', syn: ['best-loved'], ex: [
      ['Blue is my favorite color.', '파란색은 내가 가장 좋아하는 색이다.'],
      ['What is your favorite subject?', '네가 가장 좋아하는 과목은 무엇이니?'],
      ['This is my favorite song these days.', '이것이 요즘 내가 가장 좋아하는 노래이다.'],
    ]},
  ]},
  { w: 'finish', p: 'v.', s: [
    { m: '끝내다, 끝나다', syn: ['complete', 'end'], ex: [
      ['I finished my homework.', '나는 숙제를 끝냈다.'],
      ['The class finishes at three.', '수업은 3시에 끝난다.'],
      ['Finish your food before you play.', '놀기 전에 밥을 다 먹어라.'],
    ]},
  ]},
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
  { w: 'forget', p: 'v.', s: [
    { m: '잊다, 잊어버리다', syn: ['leave behind'], ex: [
      ["Don't forget your umbrella.", '우산을 잊지 마라.'],
      ['I forgot her phone number.', '나는 그녀의 전화번호를 잊어버렸다.'],
      ['He forgot to lock the door.', '그는 문 잠그는 것을 잊었다.'],
    ]},
  ]},
  { w: 'add', p: 'v.', s: [
    { m: '더하다, 추가하다', syn: ['put in'], ex: [
      ['Please add some sugar to the tea.', '차에 설탕을 조금 넣어 주세요.'],
      ['He added his name to the list.', '그는 명단에 자기 이름을 추가했다.'],
      ['She is adding water to the soup.', '그녀는 국에 물을 더하고 있다.'],
    ]},
  ]},
  { w: 'address', p: 'n.', s: [
    { m: '주소', syn: ['location'], ex: [
      ['Write your address here.', '여기에 주소를 쓰세요.'],
      ['I forgot her email address.', '나는 그녀의 이메일 주소를 잊어버렸다.'],
      ['This address is wrong.', '이 주소는 틀렸다.'],
    ]},
  ]},
  { w: 'adventure', p: 'n.', s: [
    { m: '모험', syn: ['journey'], ex: [
      ['The trip was a great adventure.', '그 여행은 멋진 모험이었다.'],
      ['He loves adventure stories.', '그는 모험 이야기를 좋아한다.'],
      ['We had an adventure in the forest.', '우리는 숲에서 모험을 했다.'],
    ]},
  ]},
  { w: 'afternoon', p: 'n.', s: [
    { m: '오후', syn: [], ex: [
      ['I have a class this afternoon.', '나는 오늘 오후에 수업이 있다.'],
      ['We played soccer in the afternoon.', '우리는 오후에 축구를 했다.'],
      ['The store closes on Sunday afternoon.', '그 가게는 일요일 오후에 문을 닫는다.'],
    ]},
  ]},
  { w: 'airport', p: 'n.', s: [
    { m: '공항', syn: [], ex: [
      ['My father works at the airport.', '우리 아버지는 공항에서 일하신다.'],
      ['We arrived at the airport early.', '우리는 공항에 일찍 도착했다.'],
      ['The airport was full of people.', '공항은 사람들로 가득했다.'],
    ]},
  ]},
  { w: 'almost', p: 'adv.', s: [
    { m: '거의', syn: ['nearly'], ex: [
      ['I almost missed the bus.', '나는 버스를 놓칠 뻔했다.'],
      ['The work is almost done.', '그 일은 거의 끝났다.'],
      ['Almost every student came.', '거의 모든 학생이 왔다.'],
    ]},
  ]},
  { w: 'alone', p: 'adj., adv.', s: [
    { m: '혼자, 홀로', syn: ['by oneself'], ex: [
      ['She lives alone in Seoul.', '그녀는 서울에서 혼자 산다.'],
      ['I do not like eating alone.', '나는 혼자 먹는 것을 좋아하지 않는다.'],
      ['He walked home alone.', '그는 혼자 집으로 걸어갔다.'],
    ]},
  ]},
  { w: 'artist', p: 'n.', s: [
    { m: '예술가, 화가', syn: ['painter'], ex: [
      ['My sister wants to be an artist.', '내 여동생은 화가가 되고 싶어 한다.'],
      ['The artist painted the sea.', '그 화가는 바다를 그렸다.'],
      ['Many artists live in this town.', '많은 예술가가 이 마을에 산다.'],
    ]},
  ]},
  { w: 'ask', p: 'v.', s: [
    { m: '묻다, 질문하다', syn: ['question'], ex: [
      ['May I ask you something?', '뭐 좀 물어봐도 될까요?'],
      ['She asked me about my family.', '그녀는 내 가족에 대해 물었다.'],
    ]},
    { m: '부탁하다, 요청하다', syn: ['request'], ex: [
      ['He asked me for help.', '그는 나에게 도움을 청했다.'],
      ['I will ask her to come early.', '나는 그녀에게 일찍 오라고 부탁할 것이다.'],
    ]},
  ]},
  { w: 'aunt', p: 'n.', s: [
    { m: '이모, 고모, 숙모', syn: [], ex: [
      ['My aunt lives in Busan.', '우리 이모는 부산에 사신다.'],
      ['I visited my aunt last weekend.', '나는 지난 주말에 이모를 찾아뵈었다.'],
      ['Her aunt is a doctor.', '그녀의 고모는 의사다.'],
    ]},
  ]},
  { w: 'bake', p: 'v.', s: [
    { m: '굽다', syn: ['cook in an oven'], ex: [
      ['Let us bake a cake for her.', '그녀를 위해 케이크를 굽자.'],
      ['My mother baked bread this morning.', '어머니는 오늘 아침에 빵을 구우셨다.'],
      ['She is baking cookies now.', '그녀는 지금 쿠키를 굽고 있다.'],
    ]},
  ]},
  { w: 'beach', p: 'n.', s: [
    { m: '해변, 바닷가', syn: ['shore'], ex: [
      ['We walked along the beach.', '우리는 해변을 따라 걸었다.'],
      ['The beach was very crowded.', '해변은 몹시 붐볐다.'],
      ['They played on the beach all day.', '그들은 하루 종일 바닷가에서 놀았다.'],
    ]},
  ]},
  { w: 'beautiful', p: 'adj.', s: [
    { m: '아름다운', syn: ['lovely', 'pretty'], ex: [
      ['What a beautiful garden!', '정말 아름다운 정원이구나!'],
      ['She has a beautiful voice.', '그녀는 아름다운 목소리를 가졌다.'],
      ['The sunset was beautiful.', '노을이 아름다웠다.'],
    ]},
  ]},
  { w: 'become', p: 'v.', s: [
    { m: '~이 되다', syn: ['turn into'], ex: [
      ['He wants to become a pilot.', '그는 조종사가 되고 싶어 한다.'],
      ['She became a teacher last year.', '그녀는 작년에 교사가 되었다.'],
      ['The weather became cold suddenly.', '날씨가 갑자기 추워졌다.'],
    ]},
  ]},
  { w: 'begin', p: 'v.', s: [
    { m: '시작하다', syn: ['start'], ex: [
      ['The class begins at nine.', '수업은 9시에 시작한다.'],
      ['We began the game without him.', '우리는 그 없이 경기를 시작했다.'],
      ['It is beginning to rain.', '비가 오기 시작하고 있다.'],
    ]},
  ]},
  { w: 'behind', p: 'prep.', s: [
    { m: '~ 뒤에', syn: ['in back of'], ex: [
      ['The cat is behind the door.', '고양이가 문 뒤에 있다.'],
      ['He sat behind me in class.', '그는 수업에서 내 뒤에 앉았다.'],
      ['There is a park behind our school.', '우리 학교 뒤에 공원이 있다.'],
    ]},
  ]},
  { w: 'below', p: 'prep., adv.', s: [
    { m: '~ 아래에', syn: ['under'], ex: [
      ['The temperature is below zero.', '기온이 영하다.'],
      ['Write your name below the line.', '선 아래에 이름을 쓰세요.'],
      ['We saw the town below.', '우리는 아래에 있는 마을을 보았다.'],
    ]},
  ]},
  { w: 'beside', p: 'prep.', s: [
    { m: '~ 옆에', syn: ['next to'], ex: [
      ['She sat beside her mother.', '그녀는 어머니 옆에 앉았다.'],
      ['The bank is beside the post office.', '은행은 우체국 옆에 있다.'],
      ['Put the box beside the table.', '상자를 탁자 옆에 두세요.'],
    ]},
  ]},
  { w: 'between', p: 'prep.', s: [
    { m: '~ 사이에', syn: ['among'], ex: [
      ['The store is between the bank and the park.', '그 가게는 은행과 공원 사이에 있다.'],
      ['There is a big difference between them.', '그들 사이에는 큰 차이가 있다.'],
      ['I sat between my parents.', '나는 부모님 사이에 앉았다.'],
    ]},
  ]},
  { w: 'bicycle', p: 'n.', s: [
    { m: '자전거', syn: ['bike'], ex: [
      ['He rides a bicycle to school.', '그는 자전거를 타고 학교에 간다.'],
      ['My bicycle is broken.', '내 자전거가 고장 났다.'],
      ['She bought a new bicycle.', '그녀는 새 자전거를 샀다.'],
    ]},
  ]},
  { w: 'birthday', p: 'n.', s: [
    { m: '생일', syn: [], ex: [
      ['Today is my birthday.', '오늘은 내 생일이다.'],
      ['We had a birthday party for her.', '우리는 그녀를 위해 생일 파티를 열었다.'],
      ['What do you want for your birthday?', '생일 선물로 무엇을 원하니?'],
    ]},
  ]},
  { w: 'blanket', p: 'n.', s: [
    { m: '담요', syn: [], ex: [
      ['Please bring me a blanket.', '담요 좀 가져다 주세요.'],
      ['She covered the baby with a blanket.', '그녀는 아기를 담요로 덮었다.'],
      ['This blanket is very warm.', '이 담요는 아주 따뜻하다.'],
    ]},
  ]},
  { w: 'boil', p: 'v.', s: [
    { m: '끓이다, 끓다', syn: ['heat'], ex: [
      ['Boil the water for five minutes.', '물을 5분 동안 끓이세요.'],
      ['The soup is boiling now.', '국이 지금 끓고 있다.'],
      ['She boiled two eggs for breakfast.', '그녀는 아침으로 달걀 두 개를 삶았다.'],
    ]},
  ]},
  { w: 'bored', p: 'adj.', s: [
    { m: '지루해하는, 심심한', syn: ['tired of'], ex: [
      ['I am bored with this game.', '나는 이 게임이 지겹다.'],
      ['The children looked bored.', '아이들은 지루해 보였다.'],
      ['He gets bored easily.', '그는 쉽게 지루해한다.'],
    ]},
  ]},
  { w: 'bottle', p: 'n.', s: [
    { m: '병', syn: [], ex: [
      ['Please pass me the bottle.', '그 병 좀 건네 주세요.'],
      ['She drank a bottle of water.', '그녀는 물 한 병을 마셨다.'],
      ['Put the empty bottles here.', '빈 병들을 여기에 두세요.'],
    ]},
  ]},
  { w: 'break', p: 'v., n.', s: [
    { m: '깨뜨리다, 부수다', syn: ['damage'], ex: [
      ['Do not break the window.', '창문을 깨지 마라.'],
      ['He broke his arm last week.', '그는 지난주에 팔이 부러졌다.'],
    ]},
    { m: '쉬는 시간, 휴식', syn: ['rest'], ex: [
      ['Let us take a short break.', '잠깐 쉬자.'],
      ['We talked during the break.', '우리는 쉬는 시간에 이야기했다.'],
    ]},
  ]},
  { w: 'breakfast', p: 'n.', s: [
    { m: '아침 식사', syn: [], ex: [
      ['I eat breakfast at seven.', '나는 7시에 아침을 먹는다.'],
      ['She made breakfast for her family.', '그녀는 가족을 위해 아침을 차렸다.'],
      ['Do not skip breakfast.', '아침을 거르지 마라.'],
    ]},
  ]},
  { w: 'bridge', p: 'n.', s: [
    { m: '다리, 교량', syn: [], ex: [
      ['We crossed the bridge slowly.', '우리는 다리를 천천히 건넜다.'],
      ['The bridge is very long.', '그 다리는 아주 길다.'],
      ['They built a new bridge here.', '그들은 여기에 새 다리를 놓았다.'],
    ]},
  ]},
  { w: 'bright', p: 'adj.', s: [
    { m: '밝은, 빛나는', syn: ['shining'], ex: [
      ['The room is very bright.', '그 방은 아주 밝다.'],
      ['The stars were bright last night.', '어젯밤 별들이 밝았다.'],
    ]},
    { m: '똑똑한, 영리한', syn: ['clever'], ex: [
      ['She is a bright student.', '그녀는 똑똑한 학생이다.'],
      ['That is a bright idea.', '그것은 좋은 생각이다.'],
    ]},
  ]},
  { w: 'brush', p: 'v., n.', s: [
    { m: '(솔로) 닦다, 빗질하다', syn: ['clean with a brush'], ex: [
      ['Brush your teeth before bed.', '자기 전에 이를 닦아라.'],
      ['She brushed her hair quickly.', '그녀는 머리를 빠르게 빗었다.'],
      ['He is brushing his shoes.', '그는 신발을 솔질하고 있다.'],
    ]},
  ]},
  { w: 'buy', p: 'v.', s: [
    { m: '사다, 구입하다', syn: ['purchase'], ex: [
      ['I want to buy a new bag.', '나는 새 가방을 사고 싶다.'],
      ['She bought some fruit at the market.', '그녀는 시장에서 과일을 좀 샀다.'],
      ['He is buying tickets now.', '그는 지금 표를 사고 있다.'],
    ]},
  ]},
  { w: 'calendar', p: 'n.', s: [
    { m: '달력', syn: [], ex: [
      ['The calendar is on the wall.', '달력이 벽에 걸려 있다.'],
      ['Check the calendar for the date.', '날짜는 달력을 확인해라.'],
      ['I marked my birthday on the calendar.', '나는 달력에 생일을 표시했다.'],
    ]},
  ]},
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
  { w: 'capital', p: 'n.', s: [
    { m: '수도', syn: ['main city'], ex: [
      ['Seoul is the capital of Korea.', '서울은 한국의 수도이다.'],
      ['We visited the capital last summer.', '우리는 지난여름에 수도를 방문했다.'],
    ]},
    { m: '대문자', syn: ['big letter'], ex: [
      ['Write your name in capital letters.', '이름을 대문자로 쓰세요.'],
      ['Names begin with a capital letter.', '이름은 대문자로 시작한다.'],
    ]},
  ]},
  { w: 'careful', p: 'adj.', s: [
    { m: '조심하는, 주의 깊은', syn: ['cautious'], ex: [
      ['Be careful on the stairs.', '계단에서 조심해라.'],
      ['She is careful with her words.', '그녀는 말을 조심한다.'],
      ['A careful driver never hurries.', '조심하는 운전자는 결코 서두르지 않는다.'],
    ]},
  ]},
  { w: 'cartoon', p: 'n.', s: [
    { m: '만화, 만화 영화', syn: ['comic'], ex: [
      ['My brother watches cartoons every morning.', '내 남동생은 매일 아침 만화를 본다.'],
      ['This cartoon is really funny.', '이 만화는 정말 재미있다.'],
      ['She drew a cartoon of her teacher.', '그녀는 선생님의 만화를 그렸다.'],
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
  { w: 'cheer', p: 'v.', s: [
    { m: '응원하다, 환호하다', syn: ['support'], ex: [
      ['We cheered for our team.', '우리는 우리 팀을 응원했다.'],
      ['The crowd cheered loudly.', '관중이 크게 환호했다.'],
      ['Let us cheer him up.', '그를 기운 나게 해 주자.'],
    ]},
  ]},
  { w: 'classmate', p: 'n.', s: [
    { m: '반 친구, 급우', syn: [], ex: [
      ['He is my classmate.', '그는 내 반 친구다.'],
      ['My classmates helped me a lot.', '반 친구들이 나를 많이 도와주었다.'],
      ['She made friends with her new classmates.', '그녀는 새 반 친구들과 친해졌다.'],
    ]},
  ]},
  { w: 'climb', p: 'v.', s: [
    { m: '오르다, 등반하다', syn: ['go up'], ex: [
      ['They climbed the mountain together.', '그들은 함께 산을 올랐다.'],
      ['The cat is climbing the tree.', '고양이가 나무를 오르고 있다.'],
      ['We climb these stairs every day.', '우리는 매일 이 계단을 오른다.'],
    ]},
  ]},
  { w: 'cloudy', p: 'adj.', s: [
    { m: '흐린, 구름이 낀', syn: [], ex: [
      ['It is cloudy today.', '오늘은 날이 흐리다.'],
      ['The sky became cloudy in the afternoon.', '오후에 하늘이 흐려졌다.'],
      ['We cannot see the stars on cloudy nights.', '흐린 밤에는 별을 볼 수 없다.'],
    ]},
  ]},
  { w: 'coach', p: 'n.', s: [
    { m: '코치, 감독', syn: ['trainer'], ex: [
      ['Our coach is very kind.', '우리 코치님은 아주 친절하시다.'],
      ['The coach taught us a new skill.', '코치가 우리에게 새 기술을 가르쳐 주었다.'],
      ['She wants to be a soccer coach.', '그녀는 축구 코치가 되고 싶어 한다.'],
    ]},
  ]},
  { w: 'college', p: 'n.', s: [
    { m: '대학', syn: ['university'], ex: [
      ['My sister goes to college.', '내 누나는 대학에 다닌다.'],
      ['He studied art in college.', '그는 대학에서 미술을 공부했다.'],
      ['The college is near my house.', '그 대학은 우리 집 근처에 있다.'],
    ]},
  ]},
  { w: 'contest', p: 'n.', s: [
    { m: '대회, 시합', syn: ['competition'], ex: [
      ['She won the singing contest.', '그녀는 노래 대회에서 우승했다.'],
      ['I entered a writing contest.', '나는 글쓰기 대회에 참가했다.'],
      ['The contest will be held next week.', '그 대회는 다음 주에 열릴 것이다.'],
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
  { w: 'count', p: 'v.', s: [
    { m: '세다, 계산하다', syn: ['add up'], ex: [
      ['Count the students in the room.', '방 안의 학생 수를 세어라.'],
      ['She counted her money twice.', '그녀는 돈을 두 번 세었다.'],
      ['He is counting the days until vacation.', '그는 방학까지 날을 세고 있다.'],
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
  { w: 'cute', p: 'adj.', s: [
    { m: '귀여운', syn: ['lovely'], ex: [
      ['What a cute puppy!', '정말 귀여운 강아지구나!'],
      ['She wore a cute hat.', '그녀는 귀여운 모자를 썼다.'],
      ['The baby looks cute in that photo.', '그 사진 속 아기는 귀여워 보인다.'],
    ]},
  ]},
  { w: 'dark', p: 'adj.', s: [
    { m: '어두운', syn: [], ex: [
      ['The room was too dark to read.', '방이 너무 어두워서 읽을 수 없었다.'],
      ['It gets dark early in winter.', '겨울에는 일찍 어두워진다.'],
      ['She is afraid of dark places.', '그녀는 어두운 곳을 무서워한다.'],
    ]},
  ]},
  { w: 'deep', p: 'adj.', s: [
    { m: '깊은', syn: [], ex: [
      ['The river is very deep here.', '이곳의 강은 아주 깊다.'],
      ['Take a deep breath.', '숨을 깊이 들이쉬어라.'],
      ['He fell into a deep sleep.', '그는 깊은 잠에 빠졌다.'],
    ]},
  ]},
  { w: 'dentist', p: 'n.', s: [
    { m: '치과 의사', syn: [], ex: [
      ['I went to the dentist yesterday.', '나는 어제 치과에 갔다.'],
      ['The dentist checked my teeth.', '치과 의사가 내 이를 살펴보았다.'],
      ['She wants to become a dentist.', '그녀는 치과 의사가 되고 싶어 한다.'],
    ]},
  ]},
  { w: 'desert', p: 'n.', s: [
    { m: '사막', syn: [], ex: [
      ['Very little rain falls in the desert.', '사막에는 비가 거의 내리지 않는다.'],
      ['They crossed the desert on camels.', '그들은 낙타를 타고 사막을 건넜다.'],
      ['The desert is hot during the day.', '사막은 낮에 덥다.'],
    ]},
  ]},
  { w: 'dictionary', p: 'n.', s: [
    { m: '사전', syn: [], ex: [
      ['Look it up in the dictionary.', '그것을 사전에서 찾아봐라.'],
      ['This dictionary is easy to use.', '이 사전은 사용하기 쉽다.'],
      ['She bought an English dictionary.', '그녀는 영어 사전을 샀다.'],
    ]},
  ]},
  { w: 'die', p: 'v.', s: [
    { m: '죽다', syn: ['pass away'], ex: [
      ['The old tree died last winter.', '그 늙은 나무는 지난겨울에 죽었다.'],
      ['Many fish die in dirty water.', '많은 물고기가 더러운 물에서 죽는다.'],
      ['The plant will die without water.', '그 식물은 물 없이는 죽을 것이다.'],
    ]},
  ]},
  { w: 'dirty', p: 'adj.', s: [
    { m: '더러운', syn: ['unclean'], ex: [
      ['Your hands are dirty.', '네 손이 더럽다.'],
      ['The river became dirty.', '그 강은 더러워졌다.'],
      ['Do not wear dirty shoes inside.', '더러운 신발을 신고 안에 들어오지 마라.'],
    ]},
  ]},
  { w: 'discuss', p: 'v.', s: [
    { m: '토론하다, 논의하다', syn: ['talk over'], ex: [
      ['We discussed the problem in class.', '우리는 수업에서 그 문제를 논의했다.'],
      ['Let us discuss it tomorrow.', '내일 그것을 논의합시다.'],
      ['They are discussing the plan now.', '그들은 지금 계획을 논의하고 있다.'],
    ]},
  ]},
  { w: 'dish', p: 'n.', s: [
    { m: '접시', syn: ['plate'], ex: [
      ['Please wash the dishes.', '설거지 좀 해 주세요.'],
      ['She broke a dish this morning.', '그녀는 오늘 아침에 접시를 깼다.'],
    ]},
    { m: '요리, 음식', syn: ['food'], ex: [
      ['This dish is my favorite.', '이 요리는 내가 제일 좋아하는 것이다.'],
      ['He cooked three dishes for dinner.', '그는 저녁으로 요리 세 가지를 만들었다.'],
    ]},
  ]},
  { w: 'draw', p: 'v.', s: [
    { m: '그리다', syn: ['sketch'], ex: [
      ['She can draw very well.', '그녀는 그림을 아주 잘 그린다.'],
      ['He drew a picture of his dog.', '그는 자기 개를 그렸다.'],
      ['The children are drawing flowers.', '아이들이 꽃을 그리고 있다.'],
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
  { w: 'empty', p: 'adj.', s: [
    { m: '비어 있는', syn: ['vacant'], ex: [
      ['The box is empty.', '그 상자는 비어 있다.'],
      ['There were many empty seats.', '빈자리가 많았다.'],
      ['He drank the glass empty.', '그는 잔을 비웠다.'],
    ]},
  ]},
  { w: 'energy', p: 'n.', s: [
    { m: '에너지, 기운', syn: ['power'], ex: [
      ['We should save energy at home.', '우리는 집에서 에너지를 아껴야 한다.'],
      ['She has a lot of energy.', '그녀는 기운이 넘친다.'],
      ['Solar energy is clean.', '태양 에너지는 깨끗하다.'],
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
  { w: 'even', p: 'adv.', s: [
    { m: '~조차, 심지어', syn: ['also'], ex: [
      ['Even a child can do this.', '어린아이조차 이것을 할 수 있다.'],
      ['He did not even say hello.', '그는 인사조차 하지 않았다.'],
      ['She works even on Sundays.', '그녀는 일요일에도 일한다.'],
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
  { w: 'fact', p: 'n.', s: [
    { m: '사실', syn: ['truth'], ex: [
      ['That is an interesting fact.', '그것은 흥미로운 사실이다.'],
      ['Tell me the facts, not your opinion.', '의견 말고 사실을 말해 줘.'],
      ['In fact, he was right.', '사실 그가 옳았다.'],
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
  { w: 'fever', p: 'n.', s: [
    { m: '열', syn: [], ex: [
      ['She has a high fever.', '그녀는 고열이 있다.'],
      ['The fever went down after the medicine.', '약을 먹은 후 열이 내렸다.'],
      ['He stayed home because of a fever.', '그는 열 때문에 집에 있었다.'],
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
  { w: 'flat', p: 'adj.', s: [
    { m: '평평한', syn: ['level'], ex: [
      ['The land here is flat.', '이곳의 땅은 평평하다.'],
      ['Put the paper on a flat surface.', '종이를 평평한 곳에 놓아라.'],
      ['My bicycle has a flat tire.', '내 자전거는 타이어에 바람이 빠졌다.'],
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
  { w: 'foreign', p: 'adj.', s: [
    { m: '외국의', syn: [], ex: [
      ['She speaks two foreign languages.', '그녀는 외국어를 두 개 한다.'],
      ['Many foreign students study here.', '많은 외국 학생이 여기서 공부한다.'],
      ['He works for a foreign company.', '그는 외국 회사에서 일한다.'],
    ]},
  ]},
  { w: 'forest', p: 'n.', s: [
    { m: '숲', syn: ['woods'], ex: [
      ['We walked through the forest.', '우리는 숲을 지나 걸었다.'],
      ['Many animals live in the forest.', '많은 동물이 숲에 산다.'],
      ['The forest is quiet in the morning.', '숲은 아침에 조용하다.'],
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
  { w: 'garden', p: 'n.', s: [
    { m: '정원, 텃밭', syn: [], ex: [
      ['My mother grows flowers in the garden.', '어머니는 정원에서 꽃을 기르신다.'],
      ['The garden looks beautiful in spring.', '정원은 봄에 아름다워 보인다.'],
      ['We had lunch in the garden.', '우리는 정원에서 점심을 먹었다.'],
    ]},
  ]},
  { w: 'gate', p: 'n.', s: [
    { m: '문, 출입구', syn: ['entrance'], ex: [
      ['Meet me at the school gate.', '학교 정문에서 만나자.'],
      ['The gate was already closed.', '문은 이미 닫혀 있었다.'],
      ['He opened the gate for us.', '그는 우리를 위해 문을 열어 주었다.'],
    ]},
  ]},
  { w: 'gift', p: 'n.', s: [
    { m: '선물', syn: ['present'], ex: [
      ['This is a gift for you.', '이것은 너를 위한 선물이야.'],
      ['She got many gifts on her birthday.', '그녀는 생일에 선물을 많이 받았다.'],
      ['I wrapped the gift in blue paper.', '나는 선물을 파란 종이로 포장했다.'],
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
  { w: 'guess', p: 'v.', s: [
    { m: '추측하다, 짐작하다', syn: ['suppose'], ex: [
      ['Can you guess my age?', '내 나이를 맞혀 볼래?'],
      ['She guessed the answer correctly.', '그녀는 답을 정확히 맞혔다.'],
      ['I guess he is not coming.', '그는 안 올 것 같다.'],
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
  { w: 'hate', p: 'v.', s: [
    { m: '싫어하다, 미워하다', syn: ['dislike'], ex: [
      ['I hate rainy days.', '나는 비 오는 날이 싫다.'],
      ['She hates waiting in line.', '그녀는 줄 서서 기다리는 것을 싫어한다.'],
      ['He hated the taste of the medicine.', '그는 그 약 맛을 싫어했다.'],
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
  { w: 'hide', p: 'v.', s: [
    { m: '숨다, 숨기다', syn: ['conceal'], ex: [
      ['The cat hid under the bed.', '고양이가 침대 밑에 숨었다.'],
      ['Do not hide the truth from me.', '나에게 진실을 숨기지 마라.'],
      ['He is hiding behind the tree.', '그는 나무 뒤에 숨어 있다.'],
    ]},
  ]},
], 'curriculum');
