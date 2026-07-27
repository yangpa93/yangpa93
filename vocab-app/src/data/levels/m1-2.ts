/**
 * 중학교 1학년 레벨 2 어휘 33개.
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
], 'curriculum');
