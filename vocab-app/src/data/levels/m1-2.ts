/**
 * 중학교 1학년 레벨 2 어휘 145개.
 *
 * 선정 기준: 교육부 「기본 어휘 목록」 중 중학교 1학년 검정 교과서(동아·천재·YBM·미래엔·비상)에
 * 공통으로 등장하는 기초 어휘와, 중1 수준에서 반복 출제되는 기본 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M1_2 = defineLevel('m1-2', [
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
  { w: 'hill', p: 'n.', s: [
    { m: '언덕', syn: [], ex: [
      ['There is a small hill behind my house.', '우리 집 뒤에 작은 언덕이 있다.'],
      ['We ran up the hill together.', '우리는 함께 언덕을 뛰어 올라갔다.'],
      ['The hills are green in spring.', '봄에는 언덕이 푸르다.'],
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
  { w: 'hole', p: 'n.', s: [
    { m: '구멍', syn: [], ex: [
      ['There is a hole in my sock.', '내 양말에 구멍이 났다.'],
      ['The dog dug a hole in the garden.', '개가 정원에 구멍을 팠다.'],
      ['Water came through the hole.', '구멍으로 물이 들어왔다.'],
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
  { w: 'hungry', p: 'adj.', s: [
    { m: '배고픈', syn: [], ex: [
      ['I am so hungry right now.', '나는 지금 너무 배고프다.'],
      ['The hungry children ate quickly.', '배고픈 아이들이 빨리 먹었다.'],
      ['He gets hungry after exercise.', '그는 운동 후에 배가 고파진다.'],
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
  { w: 'ill', p: 'adj.', s: [
    { m: '아픈, 병든', syn: ['sick'], ex: [
      ['He was ill for a week.', '그는 일주일 동안 아팠다.'],
      ['She looks ill today.', '그녀는 오늘 아파 보인다.'],
      ['My grandfather became ill last winter.', '할아버지는 지난겨울에 병이 나셨다.'],
    ]},
  ]},
  { w: 'island', p: 'n.', s: [
    { m: '섬', syn: [], ex: [
      ['Jeju is a beautiful island.', '제주는 아름다운 섬이다.'],
      ['We took a boat to the island.', '우리는 배를 타고 섬에 갔다.'],
      ['Many birds live on that island.', '많은 새가 그 섬에 산다.'],
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
  { w: 'joke', p: 'n., v.', s: [
    { m: '농담, 농담하다', syn: [], ex: [
      ['He told a funny joke.', '그는 재미있는 농담을 했다.'],
      ['Do not take his jokes seriously.', '그의 농담을 진지하게 받아들이지 마라.'],
      ['She was only joking.', '그녀는 그저 농담한 것이었다.'],
    ]},
  ]},
  { w: 'journey', p: 'n.', s: [
    { m: '여행, 여정', syn: ['trip'], ex: [
      ['The journey took three days.', '그 여정은 사흘이 걸렸다.'],
      ['They began a long journey.', '그들은 긴 여행을 시작했다.'],
      ['It was a difficult journey.', '그것은 힘든 여정이었다.'],
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
  { w: 'kitchen', p: 'n.', s: [
    { m: '부엌, 주방', syn: [], ex: [
      ['Mother is cooking in the kitchen.', '어머니가 부엌에서 요리하고 계신다.'],
      ['Our kitchen is small but clean.', '우리 부엌은 작지만 깨끗하다.'],
      ['He washed the dishes in the kitchen.', '그는 부엌에서 설거지를 했다.'],
    ]},
  ]},
  { w: 'knock', p: 'v.', s: [
    { m: '두드리다, 노크하다', syn: ['tap'], ex: [
      ['Please knock before entering.', '들어오기 전에 노크해 주세요.'],
      ['Someone knocked on the door.', '누군가 문을 두드렸다.'],
      ['He is knocking loudly.', '그는 크게 문을 두드리고 있다.'],
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
  { w: 'laugh', p: 'v.', s: [
    { m: '웃다', syn: ['smile loudly'], ex: [
      ['Everyone laughed at his joke.', '모두가 그의 농담에 웃었다.'],
      ['She could not stop laughing.', '그녀는 웃음을 멈출 수 없었다.'],
      ['Do not laugh at other people.', '남을 비웃지 마라.'],
    ]},
  ]},
  { w: 'lazy', p: 'adj.', s: [
    { m: '게으른', syn: [], ex: [
      ['Do not be lazy on weekends.', '주말에 게으름 피우지 마라.'],
      ['He is too lazy to clean his room.', '그는 너무 게을러서 방을 치우지 않는다.'],
      ['It was a lazy Sunday afternoon.', '한가로운 일요일 오후였다.'],
    ]},
  ]},
  { w: 'lead', p: 'v.', s: [
    { m: '이끌다, 안내하다', syn: ['guide'], ex: [
      ['She leads the school band.', '그녀는 학교 밴드를 이끈다.'],
      ['He led us to the exit.', '그는 우리를 출구로 안내했다.'],
      ['This road leads to the beach.', '이 길은 해변으로 이어진다.'],
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
  { w: 'lose', p: 'v.', s: [
    { m: '잃다, 잃어버리다', syn: ['misplace'], ex: [
      ['Do not lose your ticket.', '표를 잃어버리지 마라.'],
      ['She lost her wallet on the bus.', '그녀는 버스에서 지갑을 잃어버렸다.'],
    ]},
    { m: '지다, 패하다', syn: ['be beaten'], ex: [
      ['Our team lost the game.', '우리 팀이 경기에서 졌다.'],
      ['He hates losing.', '그는 지는 것을 싫어한다.'],
    ]},
  ]},
  { w: 'loud', p: 'adj.', s: [
    { m: '(소리가) 큰, 시끄러운', syn: ['noisy'], ex: [
      ['The music is too loud.', '음악이 너무 크다.'],
      ['There was a loud noise outside.', '밖에서 큰 소리가 났다.'],
      ['She spoke in a loud voice.', '그녀는 큰 목소리로 말했다.'],
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
  { w: 'main', p: 'adj.', s: [
    { m: '주요한, 주된', syn: ['chief'], ex: [
      ['What is the main reason?', '주된 이유가 무엇이니?'],
      ['The main gate is closed.', '정문이 닫혀 있다.'],
      ['Rice is the main food in Korea.', '쌀은 한국의 주식이다.'],
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
  { w: 'matter', p: 'n., v.', s: [
    { m: '문제, 일', syn: ['issue'], ex: [
      ['What is the matter with you?', '무슨 일 있니?'],
      ['This is a serious matter.', '이것은 심각한 문제다.'],
    ]},
    { m: '중요하다', syn: ['be important'], ex: [
      ['Your health matters most.', '네 건강이 가장 중요하다.'],
      ['It does not matter to me.', '그것은 나에게 중요하지 않다.'],
    ]},
  ]},
  { w: 'member', p: 'n.', s: [
    { m: '회원, 구성원', syn: [], ex: [
      ['She is a member of the drama club.', '그녀는 연극 동아리 회원이다.'],
      ['All members must attend the meeting.', '모든 회원은 회의에 참석해야 한다.'],
      ['Our family has five members.', '우리 가족은 다섯 명이다.'],
    ]},
  ]},
  { w: 'message', p: 'n.', s: [
    { m: '메시지, 전언', syn: ['note'], ex: [
      ['I left a message for her.', '나는 그녀에게 메시지를 남겼다.'],
      ['He sent me a message this morning.', '그는 오늘 아침 나에게 메시지를 보냈다.'],
      ['The message was very short.', '그 메시지는 아주 짧았다.'],
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
  { w: 'modern', p: 'adj.', s: [
    { m: '현대의, 현대적인', syn: ['up-to-date'], ex: [
      ['This is a modern building.', '이것은 현대적인 건물이다.'],
      ['Modern life is very fast.', '현대 생활은 아주 빠르다.'],
      ['She likes modern art.', '그녀는 현대 미술을 좋아한다.'],
    ]},
  ]},
  { w: 'moment', p: 'n.', s: [
    { m: '순간, 잠깐', syn: ['minute'], ex: [
      ['Please wait a moment.', '잠시만 기다려 주세요.'],
      ['It was the happiest moment of my life.', '그것은 내 인생에서 가장 행복한 순간이었다.'],
      ['He arrived at that moment.', '그는 바로 그 순간에 도착했다.'],
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
  { w: 'museum', p: 'n.', s: [
    { m: '박물관, 미술관', syn: [], ex: [
      ['We visited the science museum.', '우리는 과학 박물관을 방문했다.'],
      ['The museum is free on Wednesdays.', '그 박물관은 수요일에 무료다.'],
      ['There are old coins in this museum.', '이 박물관에는 옛 동전들이 있다.'],
    ]},
  ]},
  { w: 'music', p: 'n.', s: [
    { m: '음악', syn: [], ex: [
      ['I listen to music before bed.', '나는 자기 전에 음악을 듣는다.'],
      ['She studies music at school.', '그녀는 학교에서 음악을 공부한다.'],
      ['The music was too loud.', '음악이 너무 컸다.'],
    ]},
  ]},
  { w: 'narrow', p: 'adj.', s: [
    { m: '좁은', syn: [], ex: [
      ['This road is very narrow.', '이 길은 아주 좁다.'],
      ['We walked down a narrow path.', '우리는 좁은 길을 따라 내려갔다.'],
      ['The door is too narrow for the sofa.', '그 문은 소파가 지나가기에 너무 좁다.'],
    ]},
  ]},
  { w: 'neighbor', p: 'n.', s: [
    { m: '이웃', syn: [], ex: [
      ['Our neighbor is very kind.', '우리 이웃은 아주 친절하다.'],
      ['She helped her neighbors during the storm.', '그녀는 폭풍 동안 이웃들을 도왔다.'],
      ['A new neighbor moved in yesterday.', '어제 새 이웃이 이사 왔다.'],
    ]},
  ]},
  { w: 'news', p: 'n.', s: [
    { m: '소식, 뉴스', syn: ['information'], ex: [
      ['I have good news for you.', '너에게 좋은 소식이 있어.'],
      ['She watches the news every evening.', '그녀는 매일 저녁 뉴스를 본다.'],
      ['The news surprised everyone.', '그 소식은 모두를 놀라게 했다.'],
    ]},
  ]},
  { w: 'newspaper', p: 'n.', s: [
    { m: '신문', syn: [], ex: [
      ['My father reads the newspaper every morning.', '아버지는 매일 아침 신문을 읽으신다.'],
      ['The story was in the newspaper.', '그 이야기가 신문에 났다.'],
      ['She writes for a school newspaper.', '그녀는 학교 신문에 글을 쓴다.'],
    ]},
  ]},
  { w: 'noise', p: 'n.', s: [
    { m: '소음, 시끄러운 소리', syn: ['sound'], ex: [
      ['The noise woke me up.', '소음이 나를 깨웠다.'],
      ['Please do not make noise.', '소음을 내지 마세요.'],
      ['City noise makes it hard to sleep.', '도시 소음 때문에 잠들기 어렵다.'],
    ]},
  ]},
  { w: 'north', p: 'n., adj.', s: [
    { m: '북쪽', syn: [], ex: [
      ['The wind is blowing from the north.', '바람이 북쪽에서 불고 있다.'],
      ['They traveled to the north of the country.', '그들은 그 나라의 북쪽으로 여행했다.'],
      ['My room faces north.', '내 방은 북쪽을 향해 있다.'],
    ]},
  ]},
  { w: 'note', p: 'n., v.', s: [
    { m: '메모, 쪽지, 적다', syn: ['memo'], ex: [
      ['She left a note on the desk.', '그녀는 책상 위에 쪽지를 남겼다.'],
      ['Take notes during the class.', '수업 중에 필기해라.'],
      ['He noted the time carefully.', '그는 시간을 조심스럽게 적었다.'],
    ]},
  ]},
  { w: 'nurse', p: 'n.', s: [
    { m: '간호사', syn: [], ex: [
      ['The nurse gave me some medicine.', '간호사가 나에게 약을 주었다.'],
      ['She works as a nurse at the hospital.', '그녀는 병원에서 간호사로 일한다.'],
      ['Nurses take care of sick people.', '간호사는 아픈 사람들을 돌본다.'],
    ]},
  ]},
  { w: 'ocean', p: 'n.', s: [
    { m: '바다, 대양', syn: ['sea'], ex: [
      ['The ocean is deep and blue.', '바다는 깊고 푸르다.'],
      ['Many animals live in the ocean.', '많은 동물이 바다에 산다.'],
      ['We flew across the ocean.', '우리는 바다를 건너 날아갔다.'],
    ]},
  ]},
  { w: 'office', p: 'n.', s: [
    { m: '사무실', syn: [], ex: [
      ['My mother works in an office.', '어머니는 사무실에서 일하신다.'],
      ['The teachers office is on the first floor.', '교무실은 1층에 있다.'],
      ['He left the office at six.', '그는 6시에 사무실을 나섰다.'],
    ]},
  ]},
  { w: 'once', p: 'adv.', s: [
    { m: '한 번', syn: ['one time'], ex: [
      ['I visit my grandmother once a month.', '나는 한 달에 한 번 할머니를 찾아뵌다.'],
      ['Read the sentence once more.', '그 문장을 한 번 더 읽어라.'],
    ]},
    { m: '한때, 예전에', syn: ['before'], ex: [
      ['This was once a small village.', '이곳은 한때 작은 마을이었다.'],
      ['He once lived in Japan.', '그는 예전에 일본에 살았다.'],
    ]},
  ]},
  { w: 'order', p: 'n., v.', s: [
    { m: '주문하다, 주문', syn: [], ex: [
      ['We ordered two pizzas.', '우리는 피자 두 판을 주문했다.'],
      ['May I take your order?', '주문하시겠습니까?'],
    ]},
    { m: '순서, 차례', syn: ['sequence'], ex: [
      ['Put the words in the right order.', '단어를 올바른 순서로 놓아라.'],
      ['The names are in alphabetical order.', '이름들이 알파벳 순서로 되어 있다.'],
    ]},
  ]},
  { w: 'outside', p: 'adv., prep.', s: [
    { m: '밖에, 밖으로', syn: [], ex: [
      ['The children are playing outside.', '아이들이 밖에서 놀고 있다.'],
      ['It is cold outside today.', '오늘 밖은 춥다.'],
      ['He waited outside the door.', '그는 문 밖에서 기다렸다.'],
    ]},
  ]},
  { w: 'own', p: 'adj., v.', s: [
    { m: '자기 자신의', syn: ['personal'], ex: [
      ['She has her own room.', '그녀는 자기 방이 있다.'],
      ['Bring your own lunch tomorrow.', '내일은 각자 도시락을 가져와라.'],
    ]},
    { m: '소유하다', syn: ['have'], ex: [
      ['They own a small shop.', '그들은 작은 가게를 소유하고 있다.'],
      ['He owns three bicycles.', '그는 자전거를 세 대 가지고 있다.'],
    ]},
  ]},
  { w: 'pack', p: 'v.', s: [
    { m: '(짐을) 싸다', syn: ['put in a bag'], ex: [
      ['Pack your bag before bed.', '자기 전에 가방을 싸라.'],
      ['She packed her clothes for the trip.', '그녀는 여행을 위해 옷을 챙겼다.'],
      ['He is packing for camp.', '그는 캠프 갈 짐을 싸고 있다.'],
    ]},
  ]},
  { w: 'paint', p: 'v., n.', s: [
    { m: '(그림물감으로) 그리다, 칠하다', syn: ['color'], ex: [
      ['She painted a picture of the sea.', '그녀는 바다 그림을 그렸다.'],
      ['We painted the wall white.', '우리는 벽을 하얗게 칠했다.'],
      ['The paint is still wet.', '페인트가 아직 젖어 있다.'],
    ]},
  ]},
  { w: 'pair', p: 'n.', s: [
    { m: '한 쌍, 한 켤레', syn: ['couple'], ex: [
      ['I bought a pair of shoes.', '나는 신발 한 켤레를 샀다.'],
      ['Work in pairs, please.', '두 명씩 짝지어 하세요.'],
      ['She needs a new pair of glasses.', '그녀는 새 안경이 필요하다.'],
    ]},
  ]},
  { w: 'palace', p: 'n.', s: [
    { m: '궁전', syn: [], ex: [
      ['We visited an old palace in Seoul.', '우리는 서울의 오래된 궁전을 방문했다.'],
      ['The palace is open to visitors.', '그 궁전은 방문객에게 개방되어 있다.'],
      ['A king lived in this palace.', '왕이 이 궁전에 살았다.'],
    ]},
  ]},
  { w: 'paper', p: 'n.', s: [
    { m: '종이', syn: [], ex: [
      ['Write your answer on this paper.', '이 종이에 답을 쓰세요.'],
      ['We should not waste paper.', '우리는 종이를 낭비하면 안 된다.'],
      ['She folded the paper carefully.', '그녀는 종이를 조심스럽게 접었다.'],
    ]},
  ]},
  { w: 'park', p: 'n., v.', s: [
    { m: '공원', syn: [], ex: [
      ['We walked in the park after dinner.', '우리는 저녁 후에 공원을 걸었다.'],
      ['The park is near my house.', '그 공원은 우리 집 근처에 있다.'],
    ]},
    { m: '주차하다', syn: [], ex: [
      ['Do not park here.', '여기에 주차하지 마세요.'],
      ['He parked his car in front of the store.', '그는 가게 앞에 차를 주차했다.'],
    ]},
  ]},
  { w: 'part', p: 'n.', s: [
    { m: '부분, 일부', syn: ['piece'], ex: [
      ['This part of the book is difficult.', '책의 이 부분은 어렵다.'],
      ['Breakfast is an important part of the day.', '아침 식사는 하루의 중요한 부분이다.'],
      ['She read only the first part.', '그녀는 첫 부분만 읽었다.'],
    ]},
  ]},
  { w: 'pass', p: 'v.', s: [
    { m: '지나가다, 건네주다', syn: ['go by'], ex: [
      ['We passed the school on the way.', '우리는 오는 길에 학교를 지났다.'],
      ['Please pass me the salt.', '소금 좀 건네주세요.'],
    ]},
    { m: '합격하다', syn: ['succeed in'], ex: [
      ['She passed the exam easily.', '그녀는 시험에 쉽게 합격했다.'],
      ['He hopes to pass the test.', '그는 시험에 합격하기를 바란다.'],
    ]},
  ]},
  { w: 'past', p: 'n., adj.', s: [
    { m: '과거, 지난', syn: [], ex: [
      ['We cannot change the past.', '우리는 과거를 바꿀 수 없다.'],
      ['In the past, people wrote letters.', '과거에는 사람들이 편지를 썼다.'],
      ['She has been busy for the past week.', '그녀는 지난 한 주 동안 바빴다.'],
    ]},
  ]},
  { w: 'pay', p: 'v.', s: [
    { m: '지불하다, 내다', syn: ['spend'], ex: [
      ['I will pay for lunch today.', '오늘 점심은 내가 낼게.'],
      ['She paid ten dollars for the book.', '그녀는 그 책에 10달러를 냈다.'],
      ['You should pay attention in class.', '수업에서 주의를 기울여야 한다.'],
    ]},
  ]},
  { w: 'peace', p: 'n.', s: [
    { m: '평화', syn: [], ex: [
      ['Everyone wants peace.', '모두가 평화를 원한다.'],
      ['The country has lived in peace for years.', '그 나라는 여러 해 동안 평화롭게 지냈다.'],
      ['She found peace in the quiet forest.', '그녀는 조용한 숲에서 평화를 찾았다.'],
    ]},
  ]},
  { w: 'pick', p: 'v.', s: [
    { m: '고르다, 선택하다', syn: ['choose'], ex: [
      ['Pick one card from the box.', '상자에서 카드 한 장을 고르세요.'],
      ['She picked the red one.', '그녀는 빨간 것을 골랐다.'],
    ]},
    { m: '따다, 줍다', syn: ['gather'], ex: [
      ['We picked apples on the farm.', '우리는 농장에서 사과를 땄다.'],
      ['He picked up the paper from the floor.', '그는 바닥에서 종이를 주웠다.'],
    ]},
  ]},
  { w: 'picture', p: 'n.', s: [
    { m: '그림, 사진', syn: ['photo'], ex: [
      ['She drew a picture of her family.', '그녀는 가족 그림을 그렸다.'],
      ['Let us take a picture together.', '함께 사진을 찍자.'],
      ['The picture on the wall is old.', '벽에 걸린 그림은 오래되었다.'],
    ]},
  ]},
  { w: 'piece', p: 'n.', s: [
    { m: '조각, 한 부분', syn: ['bit'], ex: [
      ['Give me a piece of cake.', '케이크 한 조각 주세요.'],
      ['He broke the plate into pieces.', '그는 접시를 산산조각 냈다.'],
      ['She wrote it on a piece of paper.', '그녀는 종이 한 장에 그것을 적었다.'],
    ]},
  ]},
  { w: 'place', p: 'n., v.', s: [
    { m: '장소, 곳', syn: ['spot'], ex: [
      ['This is a quiet place to study.', '여기는 공부하기 조용한 곳이다.'],
      ['We visited many places in Japan.', '우리는 일본에서 많은 곳을 방문했다.'],
    ]},
    { m: '놓다, 두다', syn: ['put'], ex: [
      ['Place the book on the shelf.', '책을 선반에 놓아라.'],
      ['She placed her bag under the desk.', '그녀는 가방을 책상 밑에 두었다.'],
    ]},
  ]},
  { w: 'plan', p: 'n., v.', s: [
    { m: '계획, 계획하다', syn: ['arrange'], ex: [
      ['What are your plans for the weekend?', '주말 계획이 뭐니?'],
      ['We planned the trip for a month.', '우리는 한 달 동안 여행을 계획했다.'],
      ['She is planning a party.', '그녀는 파티를 계획하고 있다.'],
    ]},
  ]},
  { w: 'plant', p: 'n., v.', s: [
    { m: '식물', syn: [], ex: [
      ['Plants need water and light.', '식물은 물과 빛이 필요하다.'],
      ['She keeps a plant on her desk.', '그녀는 책상 위에 식물을 둔다.'],
    ]},
    { m: '심다', syn: ['put in the ground'], ex: [
      ['We planted trees at school.', '우리는 학교에서 나무를 심었다.'],
      ['He plants flowers every spring.', '그는 매년 봄에 꽃을 심는다.'],
    ]},
  ]},
  { w: 'plate', p: 'n.', s: [
    { m: '접시', syn: ['dish'], ex: [
      ['Put the bread on a plate.', '빵을 접시에 놓아라.'],
      ['She washed all the plates.', '그녀는 접시를 모두 씻었다.'],
      ['This plate is too small.', '이 접시는 너무 작다.'],
    ]},
  ]},
  { w: 'please', p: 'adv., v.', s: [
    { m: '부디, 제발', syn: [], ex: [
      ['Please close the window.', '창문 좀 닫아 주세요.'],
      ['Please be quiet for a moment.', '잠시만 조용히 해 주세요.'],
    ]},
    { m: '기쁘게 하다', syn: ['satisfy'], ex: [
      ['The gift pleased her very much.', '그 선물은 그녀를 매우 기쁘게 했다.'],
      ['It is hard to please everyone.', '모두를 만족시키기는 어렵다.'],
    ]},
  ]},
  { w: 'pocket', p: 'n.', s: [
    { m: '주머니', syn: [], ex: [
      ['He put the coin in his pocket.', '그는 동전을 주머니에 넣었다.'],
      ['My pocket has a hole.', '내 주머니에 구멍이 났다.'],
      ['She found the key in her pocket.', '그녀는 주머니에서 열쇠를 찾았다.'],
    ]},
  ]},
  { w: 'point', p: 'n., v.', s: [
    { m: '요점, 점', syn: ['idea'], ex: [
      ['That is a good point.', '그것은 좋은 지적이다.'],
      ['I did not understand his point.', '나는 그의 요점을 이해하지 못했다.'],
    ]},
    { m: '가리키다', syn: ['show'], ex: [
      ['She pointed at the map.', '그녀는 지도를 가리켰다.'],
      ['Do not point at people.', '사람을 손가락질하지 마라.'],
    ]},
  ]},
  { w: 'polite', p: 'adj.', s: [
    { m: '예의 바른, 공손한', syn: ['well-mannered'], ex: [
      ['He is always polite to older people.', '그는 어른들에게 늘 예의 바르다.'],
      ['Please use polite words.', '공손한 말을 써 주세요.'],
      ['She gave a polite answer.', '그녀는 공손한 대답을 했다.'],
    ]},
  ]},
  { w: 'poor', p: 'adj.', s: [
    { m: '가난한', syn: ['needy'], ex: [
      ['They helped poor families.', '그들은 가난한 가정을 도왔다.'],
      ['He grew up in a poor village.', '그는 가난한 마을에서 자랐다.'],
    ]},
    { m: '서투른, 좋지 않은', syn: ['weak'], ex: [
      ['His health is poor these days.', '그는 요즘 건강이 좋지 않다.'],
      ['She got a poor score on the test.', '그녀는 시험에서 나쁜 점수를 받았다.'],
    ]},
  ]},
  { w: 'post', p: 'v., n.', s: [
    { m: '올리다, 게시하다', syn: ['put up'], ex: [
      ['She posted a photo online.', '그녀는 온라인에 사진을 올렸다.'],
      ['They posted the notice on the wall.', '그들은 벽에 공지를 붙였다.'],
      ['I am posting the results today.', '나는 오늘 결과를 게시한다.'],
    ]},
  ]},
  { w: 'pour', p: 'v.', s: [
    { m: '붓다, 따르다', syn: ['fill'], ex: [
      ['Pour the milk into the cup.', '컵에 우유를 따라라.'],
      ['She poured water on the plant.', '그녀는 식물에 물을 부었다.'],
      ['It is pouring rain outside.', '밖에 비가 쏟아지고 있다.'],
    ]},
  ]},
  { w: 'power', p: 'n.', s: [
    { m: '힘, 능력', syn: ['strength'], ex: [
      ['Knowledge is power.', '아는 것이 힘이다.'],
      ['She has the power to change things.', '그녀는 상황을 바꿀 힘이 있다.'],
    ]},
    { m: '전력, 전기', syn: ['electricity'], ex: [
      ['The power went out last night.', '어젯밤에 전기가 나갔다.'],
      ['This machine uses little power.', '이 기계는 전력을 적게 쓴다.'],
    ]},
  ]},
  { w: 'price', p: 'n.', s: [
    { m: '가격, 값', syn: ['cost'], ex: [
      ['The price of the ticket is high.', '표 가격이 비싸다.'],
      ['Prices went up this year.', '올해 물가가 올랐다.'],
      ['What is the price of this bag?', '이 가방 가격은 얼마인가요?'],
    ]},
  ]},
  { w: 'print', p: 'v.', s: [
    { m: '인쇄하다, 출력하다', syn: [], ex: [
      ['Please print this page.', '이 쪽을 출력해 주세요.'],
      ['She printed her report last night.', '그녀는 어젯밤에 보고서를 출력했다.'],
      ['The machine is printing now.', '기계가 지금 인쇄하고 있다.'],
    ]},
  ]},
  { w: 'prize', p: 'n.', s: [
    { m: '상, 상품', syn: ['award'], ex: [
      ['She won first prize.', '그녀는 1등 상을 받았다.'],
      ['The prize was a new bicycle.', '상품은 새 자전거였다.'],
      ['He hopes to get a prize this year.', '그는 올해 상을 받기를 바란다.'],
    ]},
  ]},
  { w: 'promise', p: 'v., n.', s: [
    { m: '약속하다, 약속', syn: ['give ones word'], ex: [
      ['I promise to be on time.', '나는 시간을 지키겠다고 약속한다.'],
      ['She kept her promise.', '그녀는 약속을 지켰다.'],
      ['He promised not to tell anyone.', '그는 아무에게도 말하지 않겠다고 약속했다.'],
    ]},
  ]},
  { w: 'proud', p: 'adj.', s: [
    { m: '자랑스러운', syn: [], ex: [
      ['I am proud of my sister.', '나는 내 여동생이 자랑스럽다.'],
      ['His parents looked proud.', '그의 부모님은 자랑스러워 보였다.'],
      ['She was proud of her work.', '그녀는 자기 일을 자랑스러워했다.'],
    ]},
  ]},
  { w: 'pull', p: 'v.', s: [
    { m: '당기다, 끌다', syn: ['drag'], ex: [
      ['Pull the door, do not push it.', '문을 밀지 말고 당기세요.'],
      ['He pulled the rope hard.', '그는 밧줄을 세게 당겼다.'],
      ['The horse is pulling a cart.', '말이 수레를 끌고 있다.'],
    ]},
  ]},
  { w: 'push', p: 'v.', s: [
    { m: '밀다, 누르다', syn: ['press'], ex: [
      ['Push this button to start.', '시작하려면 이 버튼을 누르세요.'],
      ['They pushed the car together.', '그들은 함께 차를 밀었다.'],
      ['Do not push in line.', '줄에서 밀지 마라.'],
    ]},
  ]},
  { w: 'puzzle', p: 'n.', s: [
    { m: '퍼즐, 수수께끼', syn: ['riddle'], ex: [
      ['She solved the puzzle quickly.', '그녀는 퍼즐을 빨리 풀었다.'],
      ['This puzzle has a thousand pieces.', '이 퍼즐은 천 조각짜리다.'],
      ['The question was a real puzzle.', '그 질문은 정말 수수께끼였다.'],
    ]},
  ]},
  { w: 'race', p: 'n.', s: [
    { m: '경주, 달리기 시합', syn: ['competition'], ex: [
      ['He won the race yesterday.', '그는 어제 경주에서 우승했다.'],
      ['The race starts at ten.', '경주는 10시에 시작한다.'],
      ['She ran her first race last year.', '그녀는 작년에 첫 경주를 뛰었다.'],
    ]},
  ]},
  { w: 'rain', p: 'n., v.', s: [
    { m: '비, 비가 오다', syn: [], ex: [
      ['The rain stopped in the afternoon.', '비가 오후에 그쳤다.'],
      ['It rained all night.', '밤새 비가 왔다.'],
      ['Take an umbrella; it is raining.', '우산을 가져가, 비가 오고 있어.'],
    ]},
  ]},
  { w: 'raise', p: 'v.', s: [
    { m: '올리다, 들어 올리다', syn: ['lift'], ex: [
      ['Raise your hand if you know.', '알면 손을 드세요.'],
      ['They raised the flag slowly.', '그들은 깃발을 천천히 올렸다.'],
    ]},
    { m: '기르다, 키우다', syn: ['bring up'], ex: [
      ['She raised three children alone.', '그녀는 혼자 세 아이를 키웠다.'],
      ['They raise cows on the farm.', '그들은 농장에서 소를 기른다.'],
    ]},
  ]},
  { w: 'reach', p: 'v.', s: [
    { m: '도착하다, 이르다', syn: ['arrive at'], ex: [
      ['We reached the top at noon.', '우리는 정오에 정상에 이르렀다.'],
      ['The letter reached her last week.', '편지는 지난주에 그녀에게 도착했다.'],
    ]},
    { m: '손을 뻗다', syn: ['stretch out'], ex: [
      ['He reached for the book on the shelf.', '그는 선반 위의 책에 손을 뻗었다.'],
      ['I cannot reach the top shelf.', '나는 맨 위 선반에 손이 닿지 않는다.'],
    ]},
  ]},
  { w: 'ready', p: 'adj.', s: [
    { m: '준비가 된', syn: ['prepared'], ex: [
      ['Are you ready to go?', '갈 준비 됐니?'],
      ['Dinner is ready.', '저녁이 준비되었다.'],
      ['She was ready for the test.', '그녀는 시험 준비가 되어 있었다.'],
    ]},
  ]},
  { w: 'receive', p: 'v.', s: [
    { m: '받다', syn: ['get'], ex: [
      ['I received a letter from her.', '나는 그녀에게서 편지를 받았다.'],
      ['She received a prize for her poem.', '그녀는 시로 상을 받았다.'],
      ['He is receiving many messages today.', '그는 오늘 많은 메시지를 받고 있다.'],
    ]},
  ]},
], 'curriculum');
