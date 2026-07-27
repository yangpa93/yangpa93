/**
 * 중학교 1학년 필수 어휘 100개.
 *
 * 선정 기준: 교육부 「기본 어휘 목록」 중 중학교 1학년 검정 교과서
 * (동아·천재·YBM·미래엔·비상)에 공통으로 등장하는 기초 어휘와,
 * 중1 수준에서 반복 출제되는 기본 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를
 * 다시 만날 때마다 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M1 = defineLevel('m1', [
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
  { w: 'friendly', p: 'adj.', s: [
    { m: '친절한, 다정한', syn: ['kind', 'nice'], ex: [
      ['Our new teacher is friendly.', '우리 새 선생님은 다정하시다.'],
      ['The people there were very friendly.', '그곳 사람들은 매우 친절했다.'],
      ['He gave me a friendly smile.', '그는 나에게 다정한 미소를 지었다.'],
    ]},
  ]},
  { w: 'future', p: 'n.', s: [
    { m: '미래, 장래', syn: ['years ahead'], ex: [
      ['What will you do in the future?', '너는 미래에 무엇을 할 거니?'],
      ['She is thinking about her future job.', '그녀는 장래 직업에 대해 생각하고 있다.'],
      ['Robots will help us in the future.', '미래에는 로봇이 우리를 도울 것이다.'],
    ]},
  ]},
  { w: 'health', p: 'n.', s: [
    { m: '건강', syn: ['well-being'], ex: [
      ['Exercise is good for your health.', '운동은 건강에 좋다.'],
      ['My grandfather is in good health.', '할아버지는 건강하시다.'],
      ['Too much sugar harms your health.', '설탕을 너무 많이 먹으면 건강을 해친다.'],
    ]},
  ]},
  { w: 'hobby', p: 'n.', s: [
    { m: '취미', syn: ['pastime'], ex: [
      ['My hobby is drawing.', '내 취미는 그림 그리기이다.'],
      ['What are your hobbies?', '너의 취미는 무엇이니?'],
      ['Cooking became my new hobby.', '요리가 나의 새 취미가 되었다.'],
    ]},
  ]},
  { w: 'hope', p: 'v., n.', s: [
    { m: '바라다, 희망하다', syn: ['wish'], ex: [
      ['I hope you feel better soon.', '네가 곧 낫기를 바라.'],
      ['We hope to see you again.', '우리는 너를 다시 보기를 바란다.'],
      ['She hopes for good weather tomorrow.', '그녀는 내일 좋은 날씨이기를 바란다.'],
    ]},
  ]},
  { w: 'hurry', p: 'v.', s: [
    { m: '서두르다', syn: ['rush', 'be quick'], ex: [
      ['Hurry, or we will be late.', '서둘러, 안 그러면 늦을 거야.'],
      ['She hurried to the bus stop.', '그녀는 버스 정류장으로 서둘러 갔다.'],
      ['There is no need to hurry.', '서두를 필요 없다.'],
    ]},
  ]},
  { w: 'important', p: 'adj.', s: [
    { m: '중요한', syn: ['major', 'key'], ex: [
      ['Sleep is important for students.', '잠은 학생에게 중요하다.'],
      ['This is an important message.', '이것은 중요한 메시지이다.'],
      ['It is important to keep promises.', '약속을 지키는 것은 중요하다.'],
    ]},
  ]},
  { w: 'interesting', p: 'adj.', s: [
    { m: '흥미로운, 재미있는', syn: ['fascinating'], ex: [
      ['The story was interesting.', '그 이야기는 흥미로웠다.'],
      ['I read an interesting article today.', '나는 오늘 흥미로운 기사를 읽었다.'],
      ['History is more interesting than I thought.', '역사는 내가 생각한 것보다 흥미롭다.'],
    ]},
  ]},
  { w: 'invite', p: 'v.', s: [
    { m: '초대하다', syn: ['ask over'], ex: [
      ['I will invite my friends.', '나는 친구들을 초대할 것이다.'],
      ['They invited us to dinner.', '그들은 우리를 저녁 식사에 초대했다.'],
      ['She was invited to the party.', '그녀는 파티에 초대받았다.'],
    ]},
  ]},
  { w: 'kind', p: 'adj., n.', s: [
    { m: '친절한', syn: ['nice', 'friendly'], ex: [
      ['She is kind to everyone.', '그녀는 모두에게 친절하다.'],
      ['Thank you for being so kind.', '친절하게 대해 주셔서 감사합니다.'],
    ]},
    { m: '종류', syn: ['type', 'sort'], ex: [
      ['What kind of music do you like?', '너는 어떤 종류의 음악을 좋아하니?'],
      ['They sell many kinds of bread.', '그들은 여러 종류의 빵을 판다.'],
    ]},
  ]},
  { w: 'learn', p: 'v.', s: [
    { m: '배우다', syn: ['study', 'pick up'], ex: [
      ['I want to learn Chinese.', '나는 중국어를 배우고 싶다.'],
      ['We learned about plants in science class.', '우리는 과학 시간에 식물에 대해 배웠다.'],
      ['You learn a lot from mistakes.', '실수에서 많은 것을 배운다.'],
    ]},
  ]},
  { w: 'leave', p: 'v.', s: [
    { m: '떠나다, 출발하다', syn: ['depart', 'go away'], ex: [
      ['The train leaves at seven.', '기차는 7시에 떠난다.'],
      ['They left for Busan this morning.', '그들은 오늘 아침 부산으로 떠났다.'],
    ]},
    { m: '두고 오다, 남기다', syn: ['forget', 'put'], ex: [
      ['I left my bag in the classroom.', '나는 교실에 가방을 두고 왔다.'],
      ['She left a note on the table.', '그녀는 탁자 위에 쪽지를 남겼다.'],
    ]},
  ]},
  { w: 'lend', p: 'v.', s: [
    { m: '빌려주다', syn: ['loan'], ex: [
      ['Can you lend me your book?', '네 책을 빌려줄 수 있니?'],
      ['He lent me his bike for a day.', '그는 나에게 하루 동안 자전거를 빌려주었다.'],
      ['I never lend money to friends.', '나는 친구에게 돈을 빌려주지 않는다.'],
    ]},
  ]},
  { w: 'listen', p: 'v.', s: [
    { m: '듣다, 귀 기울이다', syn: ['pay attention to'], ex: [
      ['Listen to the teacher carefully.', '선생님 말씀을 주의 깊게 들어라.'],
      ['I listen to music before bed.', '나는 자기 전에 음악을 듣는다.'],
      ['Nobody listened to my idea.', '아무도 내 생각을 들어 주지 않았다.'],
    ]},
  ]},
  { w: 'lonely', p: 'adj.', s: [
    { m: '외로운', syn: ['alone', 'lonesome'], ex: [
      ['He felt lonely in the new school.', '그는 새 학교에서 외로움을 느꼈다.'],
      ['Living alone can be lonely.', '혼자 사는 것은 외로울 수 있다.'],
      ['She looked lonely at the party.', '그녀는 파티에서 외로워 보였다.'],
    ]},
  ]},
  { w: 'machine', p: 'n.', s: [
    { m: '기계', syn: ['device'], ex: [
      ['This machine washes clothes.', '이 기계는 옷을 세탁한다.'],
      ['The machine stopped working suddenly.', '그 기계가 갑자기 멈췄다.'],
      ['A robot is a kind of machine.', '로봇은 일종의 기계이다.'],
    ]},
  ]},
  { w: 'meet', p: 'v.', s: [
    { m: '만나다', syn: ['see', 'get together'], ex: [
      ["Let's meet at the library.", '도서관에서 만나자.'],
      ['I met my old friend yesterday.', '나는 어제 옛 친구를 만났다.'],
      ['Nice to meet you.', '만나서 반가워요.'],
    ]},
  ]},
  { w: 'mistake', p: 'n.', s: [
    { m: '실수, 잘못', syn: ['error'], ex: [
      ['Everyone makes mistakes.', '누구나 실수를 한다.'],
      ['I made a small mistake in the test.', '나는 시험에서 작은 실수를 했다.'],
      ['Learn from your mistakes.', '실수에서 배워라.'],
    ]},
  ]},
  { w: 'nervous', p: 'adj.', s: [
    { m: '긴장한, 초조한', syn: ['anxious', 'tense'], ex: [
      ['I was nervous before the test.', '나는 시험 전에 긴장했다.'],
      ['She gets nervous when she speaks in front of people.', '그녀는 사람들 앞에서 말할 때 긴장한다.'],
      ['Try not to be nervous.', '긴장하지 않으려고 해 봐.'],
    ]},
  ]},
  { w: 'often', p: 'adv.', s: [
    { m: '자주, 종종', syn: ['frequently'], ex: [
      ['We often play badminton.', '우리는 자주 배드민턴을 친다.'],
      ['He is often late for school.', '그는 종종 학교에 늦는다.'],
      ['How often do you exercise?', '너는 얼마나 자주 운동하니?'],
    ]},
  ]},
  { w: 'perfect', p: 'adj.', s: [
    { m: '완벽한', syn: ['flawless', 'ideal'], ex: [
      ['Your answer is perfect.', '네 대답은 완벽하다.'],
      ['It was a perfect day for a picnic.', '소풍하기에 완벽한 날이었다.'],
      ['Nobody is perfect.', '완벽한 사람은 없다.'],
    ]},
  ]},
  { w: 'popular', p: 'adj.', s: [
    { m: '인기 있는', syn: ['well-liked', 'favorite'], ex: [
      ['This song is popular with teens.', '이 노래는 십 대들에게 인기 있다.'],
      ['Soccer is popular around the world.', '축구는 전 세계에서 인기가 있다.'],
      ['She is popular in our class.', '그녀는 우리 반에서 인기가 많다.'],
    ]},
  ]},
  { w: 'practice', p: 'v., n.', s: [
    { m: '연습하다; 연습', syn: ['train', 'rehearse'], ex: [
      ['She practices the piano daily.', '그녀는 매일 피아노를 연습한다.'],
      ['Practice makes perfect.', '연습이 완벽을 만든다.'],
      ['We have soccer practice after school.', '우리는 방과 후에 축구 연습이 있다.'],
    ]},
  ]},
  { w: 'prepare', p: 'v.', s: [
    { m: '준비하다', syn: ['get ready'], ex: [
      ['We prepared for the concert.', '우리는 콘서트를 준비했다.'],
      ['My mom prepared a big meal.', '엄마가 푸짐한 식사를 준비하셨다.'],
      ['Prepare well before the exam.', '시험 전에 잘 준비해라.'],
    ]},
  ]},
  { w: 'present', p: 'n., adj.', s: [
    { m: '선물', syn: ['gift'], ex: [
      ['I got a present from my aunt.', '나는 이모에게서 선물을 받았다.'],
      ['What present do you want?', '어떤 선물을 원하니?'],
    ]},
    { m: '현재의; 참석한', syn: ['current'], ex: [
      ['At the present time, we have no plan.', '현재로서는 계획이 없다.'],
      ['All students were present today.', '오늘은 모든 학생이 출석했다.'],
    ]},
  ]},
  { w: 'problem', p: 'n.', s: [
    { m: '문제, 어려움', syn: ['trouble', 'issue'], ex: [
      ["That's not a big problem.", '그건 큰 문제가 아니다.'],
      ['We solved the problem together.', '우리는 함께 그 문제를 해결했다.'],
      ['There is a problem with my computer.', '내 컴퓨터에 문제가 있다.'],
    ]},
  ]},
  { w: 'quiet', p: 'adj.', s: [
    { m: '조용한', syn: ['silent', 'calm'], ex: [
      ['Please be quiet in the library.', '도서관에서는 조용히 해 주세요.'],
      ['We live on a quiet street.', '우리는 조용한 거리에 산다.'],
      ['He is a quiet boy.', '그는 조용한 소년이다.'],
    ]},
  ]},
  { w: 'reason', p: 'n.', s: [
    { m: '이유, 까닭', syn: ['cause'], ex: [
      ['Tell me the reason.', '이유를 말해 줘.'],
      ['There is no reason to worry.', '걱정할 이유가 없다.'],
      ['That is the reason I was late.', '그것이 내가 늦은 이유이다.'],
    ]},
  ]},
  { w: 'remember', p: 'v.', s: [
    { m: '기억하다', syn: ['recall', 'keep in mind'], ex: [
      ['I remember her name.', '나는 그녀의 이름을 기억한다.'],
      ['Remember to bring your ticket.', '표를 가져오는 것을 기억해라.'],
      ['I still remember that day.', '나는 아직도 그날을 기억한다.'],
    ]},
  ]},
  { w: 'restaurant', p: 'n.', s: [
    { m: '식당, 음식점', syn: ['eatery'], ex: [
      ['We ate at a Korean restaurant.', '우리는 한식당에서 먹었다.'],
      ['This restaurant is always full.', '이 식당은 항상 만석이다.'],
      ['My uncle runs a small restaurant.', '삼촌은 작은 식당을 운영하신다.'],
    ]},
  ]},
  { w: 'rule', p: 'n.', s: [
    { m: '규칙', syn: ['law', 'regulation'], ex: [
      ['We must follow the school rules.', '우리는 학교 규칙을 지켜야 한다.'],
      ['What are the rules of this game?', '이 게임의 규칙은 무엇이니?'],
      ['Breaking the rule is not allowed.', '규칙을 어기는 것은 허용되지 않는다.'],
    ]},
  ]},
  { w: 'safe', p: 'adj.', s: [
    { m: '안전한', syn: ['secure', 'out of danger'], ex: [
      ['This place is safe for children.', '이곳은 아이들에게 안전하다.'],
      ['Is it safe to swim here?', '여기서 수영해도 안전한가요?'],
      ['Everyone came back safe.', '모두 무사히 돌아왔다.'],
    ]},
  ]},
  { w: 'save', p: 'v.', s: [
    { m: '구하다', syn: ['rescue'], ex: [
      ['The doctor saved his life.', '의사가 그의 목숨을 구했다.'],
      ['He saved a puppy from the river.', '그는 강에서 강아지를 구했다.'],
    ]},
    { m: '아끼다, 절약하다', syn: ['conserve'], ex: [
      ['We should save water.', '우리는 물을 아껴야 한다.'],
      ['Turn off the light to save energy.', '에너지를 아끼려면 불을 꺼라.'],
    ]},
    { m: '저축하다, 모으다', syn: ['put aside'], ex: [
      ['I am saving money for a bike.', '나는 자전거를 사려고 돈을 모으고 있다.'],
      ['She saves ten dollars every week.', '그녀는 매주 10달러를 저축한다.'],
    ]},
  ]},
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
]);
