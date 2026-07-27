/**
 * 고등학교 1학년 레벨 1 — 수록 44 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H1_1 = defineLevel('h1-1', [
  { w: 'objective', p: 'n., adj.', s: [
    { m: '목표', syn: ['goal', 'aim'], ex: [
      ['Our main objective is safety.', '우리의 주요 목표는 안전이다.'],
      ['She achieved all her objectives.', '그녀는 모든 목표를 달성했다.'],
    ]},
    { m: '객관적인', syn: ['unbiased', 'neutral'], ex: [
      ['Try to stay objective.', '객관적인 태도를 유지하려고 해라.'],
      ['We need an objective opinion.', '우리는 객관적인 의견이 필요하다.'],
    ]},
  ]},
  { w: 'obvious', p: 'adj.', s: [
    { m: '분명한, 명백한', syn: ['clear', 'plain'], ex: [
      ['The answer is obvious.', '그 답은 명백하다.'],
      ['It was obvious that he was lying.', '그가 거짓말하고 있는 것이 분명했다.'],
      ['There is an obvious difference.', '뚜렷한 차이가 있다.'],
    ]},
  ]},
  { w: 'occur', p: 'v.', s: [
    { m: '일어나다, 발생하다', syn: ['happen', 'take place'], ex: [
      ['The accident occurred at night.', '그 사고는 밤에 일어났다.'],
      ['Earthquakes occur often in that region.', '그 지역에서는 지진이 자주 발생한다.'],
      ['It never occurred to me to ask.', '물어볼 생각이 전혀 나지 않았다.'],
    ]},
  ]},
  { w: 'ocean', p: 'n.', s: [
    { m: '바다, 대양', syn: ['sea'], ex: [
      ['The ocean is deep and blue.', '바다는 깊고 푸르다.'],
      ['Many animals live in the ocean.', '많은 동물이 바다에 산다.'],
      ['We flew across the ocean.', '우리는 바다를 건너 날아갔다.'],
    ]},
  ]},
  { w: 'offer', p: 'v., n.', s: [
    { m: '제안하다, 권하다', syn: ['propose', 'give'], ex: [
      ['He offered me a seat.', '그는 나에게 자리를 권했다.'],
      ['She offered to help with the dishes.', '그녀는 설거지를 돕겠다고 했다.'],
      ['They made a good offer.', '그들은 좋은 제안을 했다.'],
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
  { w: 'opinion', p: 'n.', s: [
    { m: '의견, 견해', syn: ['view', 'thought'], ex: [
      ['In my opinion, this is better.', '내 생각에는 이것이 더 낫다.'],
      ['Everyone has a different opinion.', '모두 의견이 다르다.'],
      ['What is your opinion about the plan?', '그 계획에 대한 네 의견은 무엇이니?'],
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
  { w: 'past', p: 'n., adj.', s: [
    { m: '과거, 지난', syn: [], ex: [
      ['We cannot change the past.', '우리는 과거를 바꿀 수 없다.'],
      ['In the past, people wrote letters.', '과거에는 사람들이 편지를 썼다.'],
      ['She has been busy for the past week.', '그녀는 지난 한 주 동안 바빴다.'],
    ]},
  ]},
  { w: 'peace', p: 'n.', s: [
    { m: '평화', syn: [], ex: [
      ['Everyone wants peace.', '모두가 평화를 원한다.'],
      ['The country has lived in peace for years.', '그 나라는 여러 해 동안 평화롭게 지냈다.'],
      ['She found peace in the quiet forest.', '그녀는 조용한 숲에서 평화를 찾았다.'],
    ]},
  ]},
  { w: 'perfect', p: 'adj.', s: [
    { m: '완벽한', syn: ['flawless', 'ideal'], ex: [
      ['Your answer is perfect.', '네 대답은 완벽하다.'],
      ['It was a perfect day for a picnic.', '소풍하기에 완벽한 날이었다.'],
      ['Nobody is perfect.', '완벽한 사람은 없다.'],
    ]},
  ]},
  { w: 'perform', p: 'v.', s: [
    { m: '공연하다', syn: ['play', 'act'], ex: [
      ['The band performed on stage.', '그 밴드는 무대에서 공연했다.'],
      ['She performed in front of 500 people.', '그녀는 500명 앞에서 공연했다.'],
    ]},
    { m: '수행하다, 해내다', syn: ['carry out', 'do'], ex: [
      ['The doctor performed the operation.', '의사가 수술을 집도했다.'],
      ['Our team performed well this year.', '우리 팀은 올해 잘 해냈다.'],
    ]},
  ]},
  { w: 'personality', p: 'n.', s: [
    { m: '성격, 인성', syn: ['character', 'nature'], ex: [
      ['He has a cheerful personality.', '그는 쾌활한 성격이다.'],
      ['Their personalities are completely different.', '그들의 성격은 완전히 다르다.'],
      ['Personality matters more than looks.', '성격이 외모보다 중요하다.'],
    ]},
  ]},
  { w: 'piece', p: 'n.', s: [
    { m: '조각, 한 부분', syn: ['bit'], ex: [
      ['Give me a piece of cake.', '케이크 한 조각 주세요.'],
      ['He broke the plate into pieces.', '그는 접시를 산산조각 냈다.'],
      ['She wrote it on a piece of paper.', '그녀는 종이 한 장에 그것을 적었다.'],
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
  { w: 'pocket', p: 'n.', s: [
    { m: '주머니', syn: [], ex: [
      ['He put the coin in his pocket.', '그는 동전을 주머니에 넣었다.'],
      ['My pocket has a hole.', '내 주머니에 구멍이 났다.'],
      ['She found the key in her pocket.', '그녀는 주머니에서 열쇠를 찾았다.'],
    ]},
  ]},
  { w: 'polite', p: 'adj.', s: [
    { m: '예의 바른, 공손한', syn: ['well-mannered'], ex: [
      ['He is always polite to older people.', '그는 어른들에게 늘 예의 바르다.'],
      ['Please use polite words.', '공손한 말을 써 주세요.'],
      ['She gave a polite answer.', '그녀는 공손한 대답을 했다.'],
    ]},
  ]},
  { w: 'popular', p: 'adj.', s: [
    { m: '인기 있는', syn: ['well-liked', 'favorite'], ex: [
      ['This song is popular with teens.', '이 노래는 십 대들에게 인기 있다.'],
      ['Soccer is popular around the world.', '축구는 전 세계에서 인기가 있다.'],
      ['She is popular in our class.', '그녀는 우리 반에서 인기가 많다.'],
    ]},
  ]},
  { w: 'positive', p: 'adj.', s: [
    { m: '긍정적인', syn: ['hopeful', 'optimistic'], ex: [
      ['Keep a positive mind.', '긍정적인 마음을 유지해라.'],
      ['She got positive feedback.', '그녀는 긍정적인 평가를 받았다.'],
      ['A positive attitude changes everything.', '긍정적인 태도가 모든 것을 바꾼다.'],
    ]},
  ]},
  { w: 'post', p: 'v., n.', s: [
    { m: '올리다, 게시하다', syn: ['put up'], ex: [
      ['She posted a photo online.', '그녀는 온라인에 사진을 올렸다.'],
      ['They posted the notice on the wall.', '그들은 벽에 공지를 붙였다.'],
      ['I am posting the results today.', '나는 오늘 결과를 게시한다.'],
    ]},
  ]},
  { w: 'potential', p: 'n., adj.', s: [
    { m: '잠재력', syn: ['promise', 'capability'], ex: [
      ['She has great potential.', '그녀는 큰 잠재력을 가지고 있다.'],
      ['The plan has potential for growth.', '그 계획은 성장 잠재력이 있다.'],
    ]},
    { m: '잠재적인, 가능성 있는', syn: ['possible', 'likely'], ex: [
      ['We identified potential risks.', '우리는 잠재적 위험을 확인했다.'],
      ['He is a potential leader.', '그는 잠재적 지도자이다.'],
    ]},
  ]},
  { w: 'pour', p: 'v.', s: [
    { m: '붓다, 따르다', syn: ['fill'], ex: [
      ['Pour the milk into the cup.', '컵에 우유를 따라라.'],
      ['She poured water on the plant.', '그녀는 식물에 물을 부었다.'],
      ['It is pouring rain outside.', '밖에 비가 쏟아지고 있다.'],
    ]},
  ]},
  { w: 'practice', p: 'v., n.', s: [
    { m: '연습하다; 연습', syn: ['train', 'rehearse'], ex: [
      ['She practices the piano daily.', '그녀는 매일 피아노를 연습한다.'],
      ['Practice makes perfect.', '연습이 완벽을 만든다.'],
      ['We have soccer practice after school.', '우리는 방과 후에 축구 연습이 있다.'],
    ]},
  ]},
  { w: 'prefer', p: 'v.', s: [
    { m: '더 좋아하다, 선호하다', syn: ['like better', 'favor'], ex: [
      ['I prefer tea to coffee.', '나는 커피보다 차를 더 좋아한다.'],
      ['She prefers reading to watching TV.', '그녀는 TV 보기보다 독서를 선호한다.'],
      ['Which one do you prefer?', '어느 것을 더 좋아하니?'],
    ]},
  ]},
  { w: 'prepare', p: 'v.', s: [
    { m: '준비하다', syn: ['get ready'], ex: [
      ['We prepared for the concert.', '우리는 콘서트를 준비했다.'],
      ['My mom prepared a big meal.', '엄마가 푸짐한 식사를 준비하셨다.'],
      ['Prepare well before the exam.', '시험 전에 잘 준비해라.'],
    ]},
  ]},
  { w: 'prevent', p: 'v.', s: [
    { m: '막다, 예방하다', syn: ['stop', 'keep from'], ex: [
      ['Washing hands prevents illness.', '손 씻기는 질병을 예방한다.'],
      ['Rain prevented us from going out.', '비 때문에 우리는 나가지 못했다.'],
      ['Seat belts prevent serious injury.', '안전벨트는 심각한 부상을 막는다.'],
    ]},
  ]},
  { w: 'previous', p: 'adj.', s: [
    { m: '이전의, 앞의', syn: ['earlier', 'former'], ex: [
      ['Check the previous chapter.', '이전 장을 확인해라.'],
      ['She has no previous experience.', '그녀는 이전 경력이 없다.'],
      ['The previous owner painted the walls.', '이전 주인이 벽을 칠했다.'],
    ]},
  ]},
  { w: 'price', p: 'n.', s: [
    { m: '가격, 값', syn: ['cost'], ex: [
      ['The price of the ticket is high.', '표 가격이 비싸다.'],
      ['Prices went up this year.', '올해 물가가 올랐다.'],
      ['What is the price of this bag?', '이 가방 가격은 얼마인가요?'],
    ]},
  ]},
  { w: 'principle', p: 'n.', s: [
    { m: '원칙, 신념', syn: ['belief', 'standard'], ex: [
      ['He never breaks his principles.', '그는 결코 자신의 원칙을 어기지 않는다.'],
      ['She refused on principle.', '그녀는 원칙에 따라 거절했다.'],
    ]},
    { m: '원리, 법칙', syn: ['rule', 'law'], ex: [
      ['This machine works on a simple principle.', '이 기계는 간단한 원리로 작동한다.'],
      ['We learned the principles of physics.', '우리는 물리학의 원리를 배웠다.'],
    ]},
  ]},
  { w: 'priority', p: 'n.', s: [
    { m: '우선순위, 우선 사항', syn: ['first concern'], ex: [
      ['Safety is our top priority.', '안전이 우리의 최우선 과제이다.'],
      ['You need to set your priorities.', '너는 우선순위를 정해야 한다.'],
      ['Health takes priority over work.', '건강이 일보다 우선이다.'],
    ]},
  ]},
  { w: 'prize', p: 'n.', s: [
    { m: '상, 상품', syn: ['award'], ex: [
      ['She won first prize.', '그녀는 1등 상을 받았다.'],
      ['The prize was a new bicycle.', '상품은 새 자전거였다.'],
      ['He hopes to get a prize this year.', '그는 올해 상을 받기를 바란다.'],
    ]},
  ]},
  { w: 'proceed', p: 'v.', s: [
    { m: '진행하다, 계속하다', syn: ['continue', 'go ahead'], ex: [
      ['Please proceed with your presentation.', '발표를 계속해 주세요.'],
      ['The work proceeded without delay.', '작업은 지체 없이 진행되었다.'],
      ['We proceeded to the next question.', '우리는 다음 질문으로 넘어갔다.'],
    ]},
  ]},
  { w: 'process', p: 'n.', s: [
    { m: '과정, 절차', syn: ['procedure', 'steps'], ex: [
      ['Learning is a slow process.', '배움은 느린 과정이다.'],
      ['The application process takes a week.', '지원 절차는 일주일이 걸린다.'],
      ['Explain the process step by step.', '그 과정을 단계별로 설명해라.'],
    ]},
  ]},
  { w: 'promise', p: 'v., n.', s: [
    { m: '약속하다, 약속', syn: ['give ones word'], ex: [
      ['I promise to be on time.', '나는 시간을 지키겠다고 약속한다.'],
      ['She kept her promise.', '그녀는 약속을 지켰다.'],
      ['He promised not to tell anyone.', '그는 아무에게도 말하지 않겠다고 약속했다.'],
    ]},
  ]},
  { w: 'proper', p: 'adj.', s: [
    { m: '적절한, 올바른', syn: ['suitable', 'right'], ex: [
      ['Wear proper shoes for hiking.', '등산에 적절한 신발을 신어라.'],
      ['Use the proper tool for the job.', '그 일에 알맞은 도구를 써라.'],
      ['He did not receive proper training.', '그는 제대로 된 훈련을 받지 못했다.'],
    ]},
  ]},
  { w: 'protect', p: 'v.', s: [
    { m: '보호하다, 지키다', syn: ['guard', 'keep safe'], ex: [
      ['Sunglasses protect your eyes.', '선글라스는 눈을 보호한다.'],
      ['We should protect wild animals.', '우리는 야생 동물을 보호해야 한다.'],
      ['A helmet protects your head.', '헬멧은 머리를 보호한다.'],
    ]},
  ]},
  { w: 'proud', p: 'adj.', s: [
    { m: '자랑스러운', syn: [], ex: [
      ['I am proud of my sister.', '나는 내 여동생이 자랑스럽다.'],
      ['His parents looked proud.', '그의 부모님은 자랑스러워 보였다.'],
      ['She was proud of her work.', '그녀는 자기 일을 자랑스러워했다.'],
    ]},
  ]},
  { w: 'provide', p: 'v.', s: [
    { m: '제공하다', syn: ['supply', 'give'], ex: [
      ['The school provides free lunch.', '학교는 무료 급식을 제공한다.'],
      ['They provided us with blankets.', '그들은 우리에게 담요를 제공했다.'],
      ['This app provides useful information.', '이 앱은 유용한 정보를 제공한다.'],
    ]},
  ]},
  { w: 'pull', p: 'v.', s: [
    { m: '당기다, 끌다', syn: ['drag'], ex: [
      ['Pull the door, do not push it.', '문을 밀지 말고 당기세요.'],
      ['He pulled the rope hard.', '그는 밧줄을 세게 당겼다.'],
      ['The horse is pulling a cart.', '말이 수레를 끌고 있다.'],
    ]},
  ]},
], 'curriculum');
