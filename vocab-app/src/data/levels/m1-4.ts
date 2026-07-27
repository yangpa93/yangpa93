/**
 * 중학교 1학년 레벨 4 — 수록 64 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_4 = defineLevel('m1-4', [
  { w: 'hobby', p: 'n.', s: [
    { m: '취미', syn: ['pastime'], ex: [
      ['My hobby is drawing.', '내 취미는 그림 그리기이다.'],
      ['What are your hobbies?', '너의 취미는 무엇이니?'],
      ['Cooking became my new hobby.', '요리가 나의 새 취미가 되었다.'],
    ]},
  ]},
  { w: 'hold', p: 'v.', s: [
    { m: '잡다, 들다', syn: ['grab'], ex: [
      ['Hold my hand and cross the street.', '내 손을 잡고 길을 건너라.'],
      ['She held the baby carefully.', '그녀는 아기를 조심스럽게 안았다.'],
    ]},
    { m: '열다, 개최하다', syn: ['have'], ex: [
      ['Our school holds a festival every fall.', '우리 학교는 매년 가을에 축제를 연다.'],
      ['They held a meeting yesterday.', '그들은 어제 회의를 열었다.'],
    ]},
  ]},
  { w: 'holiday', p: 'n.', s: [
    { m: '휴일, 공휴일', syn: ['day off'], ex: [
      ['Tomorrow is a national holiday.', '내일은 공휴일이다.'],
      ['We visited grandmother during the holiday.', '우리는 휴일 동안 할머니를 찾아뵈었다.'],
      ['The holidays start next week.', '휴일은 다음 주에 시작한다.'],
    ]},
  ]},
  { w: 'homework', p: 'n.', s: [
    { m: '숙제', syn: ['assignment'], ex: [
      ['I finished my homework early.', '나는 숙제를 일찍 끝냈다.'],
      ['Do your homework before dinner.', '저녁 전에 숙제를 해라.'],
      ['The homework was harder than usual.', '숙제가 평소보다 어려웠다.'],
    ]},
  ]},
  { w: 'honest', p: 'adj.', s: [
    { m: '정직한, 솔직한', syn: ['truthful', 'sincere'], ex: [
      ['Be honest with your parents.', '부모님께 정직해라.'],
      ['To be honest, I did not like it.', '솔직히 말하면 나는 그것이 마음에 들지 않았다.'],
      ['He gave an honest answer.', '그는 솔직한 대답을 했다.'],
    ]},
  ]},
  { w: 'hope', p: 'v., n.', s: [
    { m: '바라다, 희망하다', syn: ['wish'], ex: [
      ['I hope you feel better soon.', '네가 곧 낫기를 바라.'],
      ['We hope to see you again.', '우리는 너를 다시 보기를 바란다.'],
      ['She hopes for good weather tomorrow.', '그녀는 내일 좋은 날씨이기를 바란다.'],
    ]},
  ]},
  { w: 'hungry', p: 'adj.', s: [
    { m: '배고픈', syn: [], ex: [
      ['I am so hungry right now.', '나는 지금 너무 배고프다.'],
      ['The hungry children ate quickly.', '배고픈 아이들이 빨리 먹었다.'],
      ['He gets hungry after exercise.', '그는 운동 후에 배가 고파진다.'],
    ]},
  ]},
  { w: 'hurry', p: 'v.', s: [
    { m: '서두르다', syn: ['rush', 'be quick'], ex: [
      ['Hurry, or we will be late.', '서둘러, 안 그러면 늦을 거야.'],
      ['She hurried to the bus stop.', '그녀는 버스 정류장으로 서둘러 갔다.'],
      ['There is no need to hurry.', '서두를 필요 없다.'],
    ]},
  ]},
  { w: 'husband', p: 'n.', s: [
    { m: '남편', syn: [], ex: [
      ['Her husband is a firefighter.', '그녀의 남편은 소방관이다.'],
      ['She met her husband in college.', '그녀는 대학에서 남편을 만났다.'],
      ['My aunt and her husband came to visit.', '이모와 이모부가 놀러 오셨다.'],
    ]},
  ]},
  { w: 'idea', p: 'n.', s: [
    { m: '생각, 발상', syn: ['thought'], ex: [
      ['That is a great idea!', '그거 좋은 생각이다!'],
      ['She had no idea about the plan.', '그녀는 그 계획을 전혀 몰랐다.'],
      ['We shared our ideas in class.', '우리는 수업에서 생각을 나누었다.'],
    ]},
  ]},
  { w: 'important', p: 'adj.', s: [
    { m: '중요한', syn: ['major', 'key'], ex: [
      ['Sleep is important for students.', '잠은 학생에게 중요하다.'],
      ['This is an important message.', '이것은 중요한 메시지이다.'],
      ['It is important to keep promises.', '약속을 지키는 것은 중요하다.'],
    ]},
  ]},
  { w: 'in front of', p: 'phr.', s: [
    { m: '~ 앞에', syn: ['before'], ex: [
      ['A car stopped in front of the house.', '차 한 대가 집 앞에 멈췄다.'],
      ['She stood in front of the class.', '그녀는 반 앞에 섰다.'],
      ['We waited in front of the theater.', '우리는 극장 앞에서 기다렸다.'],
    ]},
  ]},
  { w: 'in order to', p: 'phr.', s: [
    { m: '~하기 위하여', syn: ['so as to', 'to'], ex: [
      ['He studies hard in order to pass.', '그는 합격하기 위해 열심히 공부한다.'],
      ['She woke up early in order to catch the train.', '그녀는 기차를 타려고 일찍 일어났다.'],
      ['We saved money in order to travel.', '우리는 여행하려고 돈을 모았다.'],
    ]},
  ]},
  { w: 'information', p: 'n.', s: [
    { m: '정보', syn: ['data', 'facts'], ex: [
      ['I found useful information online.', '나는 온라인에서 유용한 정보를 찾았다.'],
      ['Please give me more information.', '더 많은 정보를 주세요.'],
      ['Not all information on the internet is true.', '인터넷의 모든 정보가 사실은 아니다.'],
    ]},
  ]},
  { w: 'instead of', p: 'phr.', s: [
    { m: '~ 대신에', syn: ['rather than', 'in place of'], ex: [
      ['I drank water instead of soda.', '나는 탄산음료 대신 물을 마셨다.'],
      ['Walk instead of taking the bus.', '버스를 타는 대신 걸어라.'],
      ['She sent an email instead of calling.', '그녀는 전화 대신 이메일을 보냈다.'],
    ]},
  ]},
  { w: 'interesting', p: 'adj.', s: [
    { m: '흥미로운, 재미있는', syn: ['fascinating'], ex: [
      ['The story was interesting.', '그 이야기는 흥미로웠다.'],
      ['I read an interesting article today.', '나는 오늘 흥미로운 기사를 읽었다.'],
      ['History is more interesting than I thought.', '역사는 내가 생각한 것보다 흥미롭다.'],
    ]},
  ]},
  { w: 'introduce', p: 'v.', s: [
    { m: '소개하다', syn: ['present'], ex: [
      ['Let me introduce my friend.', '내 친구를 소개할게.'],
      ['She introduced herself to the class.', '그녀는 반에 자기소개를 했다.'],
    ]},
    { m: '도입하다, 처음 들여오다', syn: ['bring in'], ex: [
      ['The school introduced a new rule.', '학교는 새 규칙을 도입했다.'],
      ['Potatoes were introduced from America.', '감자는 아메리카에서 들어왔다.'],
    ]},
  ]},
  { w: 'invite', p: 'v.', s: [
    { m: '초대하다', syn: ['ask over'], ex: [
      ['I will invite my friends.', '나는 친구들을 초대할 것이다.'],
      ['They invited us to dinner.', '그들은 우리를 저녁 식사에 초대했다.'],
      ['She was invited to the party.', '그녀는 파티에 초대받았다.'],
    ]},
  ]},
  { w: 'job', p: 'n.', s: [
    { m: '직업, 일', syn: ['work'], ex: [
      ['My father has a new job.', '아버지는 새 직업을 얻으셨다.'],
      ['She is looking for a part-time job.', '그녀는 아르바이트를 찾고 있다.'],
      ['You did a good job today.', '오늘 일을 잘했다.'],
    ]},
  ]},
  { w: 'join', p: 'v.', s: [
    { m: '가입하다, 함께하다', syn: ['take part in'], ex: [
      ['I want to join the music club.', '나는 음악 동아리에 가입하고 싶다.'],
      ['She joined us for lunch.', '그녀는 우리와 함께 점심을 먹었다.'],
      ['More students are joining the team.', '더 많은 학생이 팀에 들어오고 있다.'],
    ]},
  ]},
  { w: 'keep', p: 'v.', s: [
    { m: '유지하다, 계속하다', syn: ['continue'], ex: [
      ['Keep quiet in the library.', '도서관에서는 조용히 해라.'],
      ['He kept running to the end.', '그는 끝까지 계속 달렸다.'],
    ]},
    { m: '보관하다, 간직하다', syn: ['store'], ex: [
      ['I keep my books in this box.', '나는 책을 이 상자에 보관한다.'],
      ['She kept his letter for years.', '그녀는 그의 편지를 여러 해 간직했다.'],
    ]},
  ]},
  { w: 'key', p: 'n.', s: [
    { m: '열쇠', syn: [], ex: [
      ['I lost my house key.', '나는 집 열쇠를 잃어버렸다.'],
      ['The key is under the mat.', '열쇠는 매트 밑에 있다.'],
    ]},
    { m: '비결, 핵심', syn: ['secret'], ex: [
      ['Practice is the key to success.', '연습이 성공의 비결이다.'],
      ['Sleep is a key to good health.', '잠은 건강의 핵심이다.'],
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
  { w: 'kitchen', p: 'n.', s: [
    { m: '부엌, 주방', syn: [], ex: [
      ['Mother is cooking in the kitchen.', '어머니가 부엌에서 요리하고 계신다.'],
      ['Our kitchen is small but clean.', '우리 부엌은 작지만 깨끗하다.'],
      ['He washed the dishes in the kitchen.', '그는 부엌에서 설거지를 했다.'],
    ]},
  ]},
  { w: 'lake', p: 'n.', s: [
    { m: '호수', syn: [], ex: [
      ['We swam in the lake.', '우리는 호수에서 수영했다.'],
      ['The lake is frozen in winter.', '그 호수는 겨울에 얼어붙는다.'],
      ['There are many fish in this lake.', '이 호수에는 물고기가 많다.'],
    ]},
  ]},
  { w: 'land', p: 'n., v.', s: [
    { m: '땅, 육지', syn: ['ground'], ex: [
      ['This land belongs to my family.', '이 땅은 우리 가족의 것이다.'],
      ['They bought land near the sea.', '그들은 바다 근처에 땅을 샀다.'],
    ]},
    { m: '착륙하다', syn: ['come down'], ex: [
      ['The plane landed safely.', '비행기가 안전하게 착륙했다.'],
      ['A bird landed on the roof.', '새 한 마리가 지붕에 내려앉았다.'],
    ]},
  ]},
  { w: 'large', p: 'adj.', s: [
    { m: '큰, 넓은', syn: ['big', 'huge'], ex: [
      ['They live in a large house.', '그들은 큰 집에 산다.'],
      ['A large crowd came to the concert.', '많은 관중이 콘서트에 왔다.'],
      ['This shirt is too large for me.', '이 셔츠는 나에게 너무 크다.'],
    ]},
  ]},
  { w: 'last', p: 'adj., v.', s: [
    { m: '마지막의, 지난', syn: ['final'], ex: [
      ['This is the last question.', '이것이 마지막 문제다.'],
      ['I saw her last Friday.', '나는 지난 금요일에 그녀를 봤다.'],
    ]},
    { m: '지속되다, 계속되다', syn: ['continue'], ex: [
      ['The rain lasted all day.', '비가 하루 종일 계속되었다.'],
      ['The movie lasts two hours.', '그 영화는 두 시간 동안 상영된다.'],
    ]},
  ]},
  { w: 'late', p: 'adj., adv.', s: [
    { m: '늦은, 늦게', syn: [], ex: [
      ['Do not be late for school.', '학교에 늦지 마라.'],
      ['He came home late last night.', '그는 어젯밤 늦게 집에 왔다.'],
      ['We had a late lunch.', '우리는 늦은 점심을 먹었다.'],
    ]},
  ]},
  { w: 'lazy', p: 'adj.', s: [
    { m: '게으른', syn: [], ex: [
      ['Do not be lazy on weekends.', '주말에 게으름 피우지 마라.'],
      ['He is too lazy to clean his room.', '그는 너무 게을러서 방을 치우지 않는다.'],
      ['It was a lazy Sunday afternoon.', '한가로운 일요일 오후였다.'],
    ]},
  ]},
  { w: 'learn', p: 'v.', s: [
    { m: '배우다', syn: ['study', 'pick up'], ex: [
      ['I want to learn Chinese.', '나는 중국어를 배우고 싶다.'],
      ['We learned about plants in science class.', '우리는 과학 시간에 식물에 대해 배웠다.'],
      ['You learn a lot from mistakes.', '실수에서 많은 것을 배운다.'],
    ]},
  ]},
  { w: 'letter', p: 'n.', s: [
    { m: '편지', syn: ['mail'], ex: [
      ['I wrote a letter to my friend.', '나는 친구에게 편지를 썼다.'],
      ['She received a letter from her aunt.', '그녀는 이모에게서 편지를 받았다.'],
    ]},
    { m: '글자, 문자', syn: ['character'], ex: [
      ['The word has five letters.', '그 단어는 글자가 다섯 개다.'],
      ['Write the letter A on the board.', '칠판에 글자 A를 쓰세요.'],
    ]},
  ]},
  { w: 'library', p: 'n.', s: [
    { m: '도서관', syn: [], ex: [
      ['I study at the library after school.', '나는 방과 후에 도서관에서 공부한다.'],
      ['The library closes at six.', '도서관은 6시에 문을 닫는다.'],
      ['She borrowed three books from the library.', '그녀는 도서관에서 책 세 권을 빌렸다.'],
    ]},
  ]},
  { w: 'life', p: 'n.', s: [
    { m: '삶, 생활', syn: ['living'], ex: [
      ['City life is busy.', '도시 생활은 바쁘다.'],
      ['She had a happy life.', '그녀는 행복한 삶을 살았다.'],
    ]},
    { m: '목숨, 생명', syn: [], ex: [
      ['The doctor saved his life.', '의사가 그의 목숨을 구했다.'],
      ['There is no life on that planet.', '그 행성에는 생명체가 없다.'],
    ]},
  ]},
  { w: 'light', p: 'n., adj.', s: [
    { m: '빛, 불빛', syn: ['lamp'], ex: [
      ['Please turn on the light.', '불 좀 켜 주세요.'],
      ['The light from the window is bright.', '창문에서 들어오는 빛이 밝다.'],
    ]},
    { m: '가벼운', syn: [], ex: [
      ['This bag is very light.', '이 가방은 아주 가볍다.'],
      ['We had a light breakfast.', '우리는 가벼운 아침을 먹었다.'],
    ]},
  ]},
  { w: 'line', p: 'n.', s: [
    { m: '선, 줄', syn: ['row'], ex: [
      ['Draw a straight line here.', '여기에 직선을 그어라.'],
      ['Please stand in line.', '줄을 서 주세요.'],
      ['There was a long line at the store.', '가게에 긴 줄이 있었다.'],
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
  { w: 'look after', p: 'phr.', s: [
    { m: '~을 돌보다', syn: ['take care of', 'care for'], ex: [
      ['She looks after her sister.', '그녀는 여동생을 돌본다.'],
      ['Who looks after your dog?', '누가 네 개를 돌보니?'],
      ['He looked after the plants while we were away.', '그는 우리가 없는 동안 식물을 돌봤다.'],
    ]},
  ]},
  { w: 'look for', p: 'phr.', s: [
    { m: '~을 찾다', syn: ['search for', 'seek'], ex: [
      ["I'm looking for my keys.", '나는 열쇠를 찾고 있다.'],
      ['She is looking for a part-time job.', '그녀는 아르바이트를 찾고 있다.'],
      ['We looked for the cat all evening.', '우리는 저녁 내내 고양이를 찾았다.'],
    ]},
  ]},
  { w: 'low', p: 'adj.', s: [
    { m: '낮은', syn: [], ex: [
      ['The chair is too low for me.', '그 의자는 나에게 너무 낮다.'],
      ['Prices are low this month.', '이번 달에는 가격이 낮다.'],
      ['He spoke in a low voice.', '그는 낮은 목소리로 말했다.'],
    ]},
  ]},
  { w: 'lucky', p: 'adj.', s: [
    { m: '운이 좋은', syn: ['fortunate'], ex: [
      ['You are lucky to have such friends.', '그런 친구들이 있다니 너는 운이 좋다.'],
      ['Seven is my lucky number.', '7은 내 행운의 숫자다.'],
      ['We were lucky with the weather.', '우리는 날씨 운이 좋았다.'],
    ]},
  ]},
  { w: 'mail', p: 'n., v.', s: [
    { m: '우편, 우편물, 부치다', syn: ['post'], ex: [
      ['The mail comes at noon.', '우편물은 정오에 온다.'],
      ['She mailed the letter yesterday.', '그녀는 어제 편지를 부쳤다.'],
      ['I checked my mail this morning.', '나는 오늘 아침 우편물을 확인했다.'],
    ]},
  ]},
  { w: 'make', p: 'v.', s: [
    { m: '만들다', syn: ['create'], ex: [
      ['She makes bread every morning.', '그녀는 매일 아침 빵을 만든다.'],
      ['He made a paper airplane.', '그는 종이비행기를 만들었다.'],
    ]},
    { m: '~하게 하다', syn: ['cause'], ex: [
      ['The song makes me happy.', '그 노래는 나를 행복하게 한다.'],
      ['Her words made him angry.', '그녀의 말이 그를 화나게 했다.'],
    ]},
  ]},
  { w: 'make friends with', p: 'phr.', s: [
    { m: '~와 친해지다', syn: ['become friends with'], ex: [
      ['He made friends with the new student.', '그는 새로 온 학생과 친해졌다.'],
      ['It is easy to make friends with her.', '그녀와 친해지기는 쉽다.'],
      ['She wants to make friends with everyone.', '그녀는 모두와 친해지고 싶어 한다.'],
    ]},
  ]},
  { w: 'map', p: 'n.', s: [
    { m: '지도', syn: [], ex: [
      ['Look at the map on the wall.', '벽에 있는 지도를 봐라.'],
      ['We used a map to find the museum.', '우리는 지도를 써서 박물관을 찾았다.'],
      ['This map is very old.', '이 지도는 아주 오래되었다.'],
    ]},
  ]},
  { w: 'market', p: 'n.', s: [
    { m: '시장', syn: [], ex: [
      ['My mother goes to the market on Fridays.', '어머니는 금요일에 시장에 가신다.'],
      ['The market opens early in the morning.', '시장은 아침 일찍 문을 연다.'],
      ['We bought fresh fruit at the market.', '우리는 시장에서 신선한 과일을 샀다.'],
    ]},
  ]},
  { w: 'marry', p: 'v.', s: [
    { m: '결혼하다', syn: ['wed'], ex: [
      ['They married last spring.', '그들은 지난봄에 결혼했다.'],
      ['She wants to marry him.', '그녀는 그와 결혼하고 싶어 한다.'],
      ['My sister is getting married in May.', '내 언니는 5월에 결혼한다.'],
    ]},
  ]},
  { w: 'meet', p: 'v.', s: [
    { m: '만나다', syn: ['see', 'get together'], ex: [
      ["Let's meet at the library.", '도서관에서 만나자.'],
      ['I met my old friend yesterday.', '나는 어제 옛 친구를 만났다.'],
      ['Nice to meet you.', '만나서 반가워요.'],
    ]},
  ]},
  { w: 'member', p: 'n.', s: [
    { m: '회원, 구성원', syn: [], ex: [
      ['She is a member of the drama club.', '그녀는 연극 동아리 회원이다.'],
      ['All members must attend the meeting.', '모든 회원은 회의에 참석해야 한다.'],
      ['Our family has five members.', '우리 가족은 다섯 명이다.'],
    ]},
  ]},
  { w: 'memory', p: 'n.', s: [
    { m: '기억(력)', syn: ['recall'], ex: [
      ['He has a good memory for names.', '그는 이름을 잘 기억한다.'],
      ['Sleep helps memory.', '잠은 기억력에 도움이 된다.'],
    ]},
    { m: '추억', syn: ['remembrance'], ex: [
      ['I have a happy memory of that day.', '나는 그날의 행복한 추억이 있다.'],
      ['These photos bring back memories.', '이 사진들은 추억을 떠올리게 한다.'],
    ]},
  ]},
  { w: 'middle', p: 'n., adj.', s: [
    { m: '중간, 가운데', syn: ['center'], ex: [
      ['He stood in the middle of the room.', '그는 방 한가운데 서 있었다.'],
      ['I woke up in the middle of the night.', '나는 한밤중에 깼다.'],
      ['She goes to middle school.', '그녀는 중학교에 다닌다.'],
    ]},
  ]},
  { w: 'mind', p: 'n., v.', s: [
    { m: '마음, 생각', syn: ['thought'], ex: [
      ['I changed my mind.', '나는 마음을 바꿨다.'],
      ['Keep it in mind.', '그것을 명심해라.'],
    ]},
    { m: '꺼리다, 신경 쓰다', syn: ['care'], ex: [
      ['Do you mind if I open the window?', '창문을 열어도 될까요?'],
      ['She does not mind the cold.', '그녀는 추위를 신경 쓰지 않는다.'],
    ]},
  ]},
  { w: 'miss', p: 'v.', s: [
    { m: '놓치다', syn: ['fail to catch'], ex: [
      ['Hurry, or you will miss the train.', '서둘러, 안 그러면 기차를 놓칠 거야.'],
      ['I missed the first ten minutes of the movie.', '나는 영화 첫 10분을 놓쳤다.'],
    ]},
    { m: '그리워하다', syn: ['long for'], ex: [
      ['I miss my old friends.', '나는 옛 친구들이 그립다.'],
      ['She misses her hometown.', '그녀는 고향을 그리워한다.'],
    ]},
  ]},
  { w: 'mistake', p: 'n.', s: [
    { m: '실수, 잘못', syn: ['error'], ex: [
      ['Everyone makes mistakes.', '누구나 실수를 한다.'],
      ['I made a small mistake in the test.', '나는 시험에서 작은 실수를 했다.'],
      ['Learn from your mistakes.', '실수에서 배워라.'],
    ]},
  ]},
  { w: 'money', p: 'n.', s: [
    { m: '돈', syn: ['cash'], ex: [
      ['I do not have enough money.', '나는 돈이 충분하지 않다.'],
      ['She saves money every month.', '그녀는 매달 돈을 모은다.'],
      ['He spent all his money on books.', '그는 책에 돈을 다 썼다.'],
    ]},
  ]},
  { w: 'month', p: 'n.', s: [
    { m: '달, 개월', syn: [], ex: [
      ['We moved here last month.', '우리는 지난달에 여기로 이사했다.'],
      ['There are twelve months in a year.', '1년에는 열두 달이 있다.'],
      ['She will stay for three months.', '그녀는 세 달 동안 머물 것이다.'],
    ]},
  ]},
  { w: 'moon', p: 'n.', s: [
    { m: '달', syn: [], ex: [
      ['The moon is bright tonight.', '오늘 밤 달이 밝다.'],
      ['People first walked on the moon in 1969.', '사람들은 1969년에 처음 달을 걸었다.'],
      ['We watched the full moon together.', '우리는 함께 보름달을 보았다.'],
    ]},
  ]},
  { w: 'morning', p: 'n.', s: [
    { m: '아침, 오전', syn: [], ex: [
      ['I run every morning.', '나는 매일 아침 달린다.'],
      ['The morning air was cold.', '아침 공기가 차가웠다.'],
      ['See you tomorrow morning.', '내일 아침에 보자.'],
    ]},
  ]},
  { w: 'mountain', p: 'n.', s: [
    { m: '산', syn: [], ex: [
      ['We climbed the mountain last Sunday.', '우리는 지난 일요일에 산을 올랐다.'],
      ['That mountain is covered with snow.', '저 산은 눈으로 덮여 있다.'],
      ['There are many mountains in Korea.', '한국에는 산이 많다.'],
    ]},
  ]},
  { w: 'move', p: 'v.', s: [
    { m: '움직이다, 옮기다', syn: ['shift'], ex: [
      ['Do not move the table.', '탁자를 옮기지 마라.'],
      ['The car moved slowly.', '차가 천천히 움직였다.'],
    ]},
    { m: '이사하다', syn: ['relocate'], ex: [
      ['We moved to a new house.', '우리는 새집으로 이사했다.'],
      ['They are moving to Busan next month.', '그들은 다음 달에 부산으로 이사한다.'],
    ]},
  ]},
  { w: 'movie', p: 'n.', s: [
    { m: '영화', syn: ['film'], ex: [
      ['Let us watch a movie tonight.', '오늘 밤 영화를 보자.'],
      ['The movie was really exciting.', '그 영화는 정말 흥미진진했다.'],
      ['She saw that movie twice.', '그녀는 그 영화를 두 번 봤다.'],
    ]},
  ]},
  { w: 'music', p: 'n.', s: [
    { m: '음악', syn: [], ex: [
      ['I listen to music before bed.', '나는 자기 전에 음악을 듣는다.'],
      ['She studies music at school.', '그녀는 학교에서 음악을 공부한다.'],
      ['The music was too loud.', '음악이 너무 컸다.'],
    ]},
  ]},
  { w: 'nature', p: 'n.', s: [
    { m: '자연', syn: ['the natural world'], ex: [
      ['We enjoyed the beauty of nature.', '우리는 자연의 아름다움을 즐겼다.'],
      ['Nature gives us clean air and water.', '자연은 우리에게 깨끗한 공기와 물을 준다.'],
    ]},
    { m: '본성, 성질', syn: ['character'], ex: [
      ['It is human nature to make mistakes.', '실수하는 것은 인간의 본성이다.'],
      ['She has a gentle nature.', '그녀는 온화한 성품을 지녔다.'],
    ]},
  ]},
], 'curriculum');
