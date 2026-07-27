/**
 * 중학교 1학년 레벨 1 어휘 34개.
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
], 'curriculum');
