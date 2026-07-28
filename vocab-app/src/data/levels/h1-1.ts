/**
 * 고등학교 1학년 레벨 1 — 수록 137 / 계획 137개.
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
  { w: 'observe', p: 'v.', s: [
    { m: '관찰하다, 지키다', syn: ['watch'], ex: [
      ['Scientists observe the stars.', '과학자들은 별을 관찰한다.'],
      ['She observed the birds quietly.', '그녀는 새들을 조용히 관찰했다.'],
      ['We must observe the rules.', '우리는 규칙을 지켜야 한다.'],
    ]},
  ]},
  { w: 'obvious', p: 'adj.', s: [
    { m: '분명한, 명백한', syn: ['clear', 'plain'], ex: [
      ['The answer is obvious.', '그 답은 명백하다.'],
      ['It was obvious that he was lying.', '그가 거짓말하고 있는 것이 분명했다.'],
      ['There is an obvious difference.', '뚜렷한 차이가 있다.'],
    ]},
  ]},
  { w: 'occasion', p: 'n.', s: [
    { m: '경우, 행사', syn: ['event'], ex: [
      ['We meet on special occasions.', '우리는 특별한 경우에 만난다.'],
      ['The wedding was a happy occasion.', '그 결혼식은 기쁜 행사였다.'],
      ['On one occasion, he was late.', '한번은 그가 늦었다.'],
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
  { w: 'odd', p: 'adj.', s: [
    { m: '이상한, 홀수의', syn: ['strange'], ex: [
      ['That is an odd question.', '그것은 이상한 질문이다.'],
      ['One, three, and five are odd numbers.', '1, 3, 5는 홀수다.'],
      ['She wore odd socks.', '그녀는 짝짝이 양말을 신었다.'],
    ]},
  ]},
  { w: 'offer', p: 'v., n.', s: [
    { m: '제안하다, 권하다', syn: ['propose', 'give'], ex: [
      ['He offered me a seat.', '그는 나에게 자리를 권했다.'],
      ['She offered to help with the dishes.', '그녀는 설거지를 돕겠다고 했다.'],
      ['They made a good offer.', '그들은 좋은 제안을 했다.'],
    ]},
  ]},
  { w: 'officer', p: 'n.', s: [
    { m: '장교, 공무원', syn: ['official'], ex: [
      ['A police officer helped us.', '경찰관이 우리를 도왔다.'],
      ['The officer checked our papers.', '공무원이 우리 서류를 확인했다.'],
      ['He became an officer last year.', '그는 작년에 장교가 되었다.'],
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
  { w: 'opera', p: 'n.', s: [
    { m: '오페라', syn: ['musical drama'], ex: [
      ['We watched an opera last night.', '우리는 어젯밤 오페라를 봤다.'],
      ['The opera lasted three hours.', '그 오페라는 세 시간 동안 이어졌다.'],
      ['She sings in an opera.', '그녀는 오페라에서 노래한다.'],
    ]},
  ]},
  { w: 'operate', p: 'v.', s: [
    { m: '작동하다, 운영하다, 수술하다', syn: ['run'], ex: [
      ['Do you know how to operate it?', '그것을 작동시킬 줄 아니?'],
      ['They operate three shops.', '그들은 가게 세 곳을 운영한다.'],
      ['Doctors operated on him yesterday.', '의사들이 어제 그를 수술했다.'],
    ]},
  ]},
  { w: 'opinion', p: 'n.', s: [
    { m: '의견, 견해', syn: ['view', 'thought'], ex: [
      ['In my opinion, this is better.', '내 생각에는 이것이 더 낫다.'],
      ['Everyone has a different opinion.', '모두 의견이 다르다.'],
      ['What is your opinion about the plan?', '그 계획에 대한 네 의견은 무엇이니?'],
    ]},
  ]},
  { w: 'oppose', p: 'v.', s: [
    { m: '반대하다', syn: ['resist'], ex: [
      ['Many people oppose the plan.', '많은 사람이 그 계획에 반대한다.'],
      ['She opposed the new rule.', '그녀는 새 규칙에 반대했다.'],
      ['They are opposing the decision.', '그들은 그 결정에 반대하고 있다.'],
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
  { w: 'ordinary', p: 'adj.', s: [
    { m: '평범한, 보통의', syn: ['common'], ex: [
      ['It was an ordinary day.', '평범한 하루였다.'],
      ['He is an ordinary student.', '그는 보통 학생이다.'],
      ['Ordinary people can do great things.', '평범한 사람도 위대한 일을 할 수 있다.'],
    ]},
  ]},
  { w: 'other', p: 'adj.', s: [
    { m: '다른', syn: ['different'], ex: [
      ['Show me the other book.', '다른 책을 보여 줘.'],
      ['Other students had the same problem.', '다른 학생들도 같은 문제를 겪었다.'],
      ['The shop is on the other side.', '그 가게는 반대편에 있다.'],
    ]},
  ]},
  { w: 'otherwise', p: 'adv.', s: [
    { m: '그렇지 않으면', syn: ['or else'], ex: [
      ['Hurry, otherwise you will be late.', '서둘러, 그렇지 않으면 늦을 거야.'],
      ['She was tired; otherwise she is fine.', '그녀는 피곤했다, 그 밖에는 괜찮다.'],
      ['Study now, otherwise you will regret it.', '지금 공부해, 안 그러면 후회할 거야.'],
    ]},
  ]},
  { w: 'ought', p: 'v.', s: [
    { m: '~해야 한다', syn: ['should'], ex: [
      ['You ought to rest.', '너는 쉬어야 한다.'],
      ['We ought to help them.', '우리는 그들을 도와야 한다.'],
      ['She ought to know better.', '그녀는 더 잘 알아야 한다.'],
    ]},
  ]},
  { w: 'oven', p: 'n.', s: [
    { m: '오븐', syn: [], ex: [
      ['Put the cake in the oven.', '케이크를 오븐에 넣어라.'],
      ['The oven is very hot.', '오븐이 아주 뜨겁다.'],
      ['She cleaned the oven yesterday.', '그녀는 어제 오븐을 청소했다.'],
    ]},
  ]},
  { w: 'overall', p: 'adj.', s: [
    { m: '전반적인', syn: ['general'], ex: [
      ['The overall result was good.', '전반적인 결과는 좋았다.'],
      ['Her overall score improved.', '그녀의 종합 점수가 올랐다.'],
      ['The overall plan makes sense.', '전반적인 계획은 말이 된다.'],
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
  { w: 'pain', p: 'n.', s: [
    { m: '고통, 아픔', syn: ['ache'], ex: [
      ['She felt pain in her leg.', '그녀는 다리에 통증을 느꼈다.'],
      ['The medicine stopped the pain.', '그 약이 통증을 멈췄다.'],
      ['No pain lasts forever.', '영원한 고통은 없다.'],
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
  { w: 'pan', p: 'n.', s: [
    { m: '팬, 냄비', syn: ['pot'], ex: [
      ['Heat the pan first.', '먼저 팬을 달궈라.'],
      ['She fried an egg in the pan.', '그녀는 팬에 달걀을 부쳤다.'],
      ['The pan is too small.', '그 팬은 너무 작다.'],
    ]},
  ]},
  { w: 'panic', p: 'n.', s: [
    { m: '공황, 극심한 공포', syn: ['alarm'], ex: [
      ['Panic spread through the crowd.', '공포가 군중에 퍼졌다.'],
      ['Do not panic in an emergency.', '비상시에 당황하지 마라.'],
      ['Her panic slowly faded.', '그녀의 공포가 천천히 가라앉았다.'],
    ]},
  ]},
  { w: 'parade', p: 'n.', s: [
    { m: '행진, 퍼레이드', syn: ['procession'], ex: [
      ['We watched the parade downtown.', '우리는 시내에서 퍼레이드를 봤다.'],
      ['The parade started at noon.', '행진은 정오에 시작했다.'],
      ['Children joined the parade.', '아이들이 행진에 참여했다.'],
    ]},
  ]},
  { w: 'paragraph', p: 'n.', s: [
    { m: '문단', syn: ['passage'], ex: [
      ['Read the first paragraph.', '첫 문단을 읽어라.'],
      ['Each paragraph has one idea.', '각 문단에는 하나의 생각이 담긴다.'],
      ['She wrote a short paragraph.', '그녀는 짧은 문단을 썼다.'],
    ]},
  ]},
  { w: 'pardon', p: 'n.', s: [
    { m: '용서', syn: ['forgiveness'], ex: [
      ['I beg your pardon.', '죄송합니다, 다시 말씀해 주세요.'],
      ['He asked for pardon.', '그는 용서를 구했다.'],
      ['Pardon is not always easy.', '용서가 늘 쉬운 것은 아니다.'],
    ]},
  ]},
  { w: 'particular', p: 'adj.', s: [
    { m: '특정한, 까다로운', syn: ['specific'], ex: [
      ['Is there a particular reason?', '특별한 이유가 있니?'],
      ['She is particular about food.', '그녀는 음식에 까다롭다.'],
      ['This particular case is different.', '이 특정한 경우는 다르다.'],
    ]},
  ]},
  { w: 'past', p: 'n., adj.', s: [
    { m: '과거, 지난', syn: [], ex: [
      ['We cannot change the past.', '우리는 과거를 바꿀 수 없다.'],
      ['In the past, people wrote letters.', '과거에는 사람들이 편지를 썼다.'],
      ['She has been busy for the past week.', '그녀는 지난 한 주 동안 바빴다.'],
    ]},
  ]},
  { w: 'path', p: 'n.', s: [
    { m: '길, 오솔길', syn: ['trail'], ex: [
      ['We followed a narrow path.', '우리는 좁은 길을 따라갔다.'],
      ['The path leads to the lake.', '그 길은 호수로 이어진다.'],
      ['She chose a different path in life.', '그녀는 인생에서 다른 길을 택했다.'],
    ]},
  ]},
  { w: 'patient', p: 'n.', s: [
    { m: '환자', syn: [], ex: [
      ['The patient is getting better.', '그 환자는 나아지고 있다.'],
      ['Doctors care for many patients.', '의사들은 많은 환자를 돌본다.'],
      ['A patient waited in the hall.', '환자 한 명이 복도에서 기다렸다.'],
    ]},
  ]},
  { w: 'pattern', p: 'n.', s: [
    { m: '무늬, 양식', syn: ['design'], ex: [
      ['The cloth has a flower pattern.', '그 천에는 꽃무늬가 있다.'],
      ['Her sleep pattern changed.', '그녀의 수면 패턴이 바뀌었다.'],
      ['Look for a pattern in the numbers.', '숫자에서 규칙을 찾아라.'],
    ]},
  ]},
  { w: 'pause', p: 'v.', s: [
    { m: '잠시 멈추다', syn: ['halt'], ex: [
      ['She paused before answering.', '그녀는 답하기 전에 잠시 멈췄다.'],
      ['Pause the video, please.', '영상을 잠시 멈춰 주세요.'],
      ['He paused at the door.', '그는 문 앞에서 멈칫했다.'],
    ]},
  ]},
  { w: 'peace', p: 'n.', s: [
    { m: '평화', syn: [], ex: [
      ['Everyone wants peace.', '모두가 평화를 원한다.'],
      ['The country has lived in peace for years.', '그 나라는 여러 해 동안 평화롭게 지냈다.'],
      ['She found peace in the quiet forest.', '그녀는 조용한 숲에서 평화를 찾았다.'],
    ]},
  ]},
  { w: 'pear', p: 'n.', s: [
    { m: '배', syn: [], ex: [
      ['This pear is very juicy.', '이 배는 즙이 많다.'],
      ['She peeled a pear.', '그녀는 배 껍질을 벗겼다.'],
      ['Pears grow well here.', '배는 여기서 잘 자란다.'],
    ]},
  ]},
  { w: 'pepper', p: 'n.', s: [
    { m: '후추, 고추', syn: ['spice'], ex: [
      ['Add salt and pepper.', '소금과 후추를 넣어라.'],
      ['This pepper is too hot.', '이 고추는 너무 맵다.'],
      ['She grows pepper in the garden.', '그녀는 정원에서 고추를 기른다.'],
    ]},
  ]},
  { w: 'per', p: 'prep.', s: [
    { m: '~당, ~마다', syn: ['for each'], ex: [
      ['The price is ten dollars per person.', '가격은 1인당 10달러다.'],
      ['He runs five kilometers per day.', '그는 하루에 5킬로미터를 달린다.'],
      ['The rate is fifty won per minute.', '요금은 분당 50원이다.'],
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
  { w: 'perhaps', p: 'adv.', s: [
    { m: '아마도', syn: ['maybe'], ex: [
      ['Perhaps she is right.', '아마 그녀가 옳을 것이다.'],
      ['Perhaps we should wait.', '아마 우리는 기다려야 할 것이다.'],
      ['Perhaps it will snow tonight.', '아마 오늘 밤 눈이 올 것이다.'],
    ]},
  ]},
  { w: 'period', p: 'n.', s: [
    { m: '기간, 시기', syn: ['span'], ex: [
      ['The rainy period lasted a month.', '장마 기간이 한 달 이어졌다.'],
      ['This period of history is hard.', '역사의 이 시기는 어렵다.'],
      ['We rest for a short period.', '우리는 짧은 시간 쉰다.'],
    ]},
  ]},
  { w: 'person', p: 'n.', s: [
    { m: '사람', syn: ['individual'], ex: [
      ['She is a kind person.', '그녀는 친절한 사람이다.'],
      ['Only one person came.', '한 사람만 왔다.'],
      ['Each person has a role.', '각 사람에게 역할이 있다.'],
    ]},
  ]},
  { w: 'personality', p: 'n.', s: [
    { m: '성격, 인성', syn: ['character', 'nature'], ex: [
      ['He has a cheerful personality.', '그는 쾌활한 성격이다.'],
      ['Their personalities are completely different.', '그들의 성격은 완전히 다르다.'],
      ['Personality matters more than looks.', '성격이 외모보다 중요하다.'],
    ]},
  ]},
  { w: 'pet', p: 'n.', s: [
    { m: '반려동물', syn: ['companion animal'], ex: [
      ['My pet is a small dog.', '내 반려동물은 작은 개다.'],
      ['She takes care of her pet.', '그녀는 반려동물을 돌본다.'],
      ['Pets need love and time.', '반려동물은 사랑과 시간이 필요하다.'],
    ]},
  ]},
  { w: 'photo', p: 'n.', s: [
    { m: '사진', syn: ['picture'], ex: [
      ['Let us take a photo.', '사진을 찍자.'],
      ['The photo is a little dark.', '그 사진은 조금 어둡다.'],
      ['She showed me an old photo.', '그녀는 나에게 옛 사진을 보여 주었다.'],
    ]},
  ]},
  { w: 'photograph', p: 'n.', s: [
    { m: '사진', syn: ['photo'], ex: [
      ['He framed the photograph.', '그는 그 사진을 액자에 넣었다.'],
      ['This photograph won a prize.', '이 사진은 상을 받았다.'],
      ['She took a photograph of the sea.', '그녀는 바다 사진을 찍었다.'],
    ]},
  ]},
  { w: 'physical', p: 'adj.', s: [
    { m: '신체의, 물리적인', syn: ['bodily'], ex: [
      ['Physical exercise is important.', '신체 운동은 중요하다.'],
      ['He had a physical check-up.', '그는 건강 검진을 받았다.'],
      ['There is no physical damage.', '물리적 손상은 없다.'],
    ]},
  ]},
  { w: 'picnic', p: 'n.', s: [
    { m: '소풍', syn: ['outing'], ex: [
      ['We went on a picnic.', '우리는 소풍을 갔다.'],
      ['The picnic was rained out.', '소풍이 비로 취소되었다.'],
      ['She packed food for the picnic.', '그녀는 소풍용 음식을 쌌다.'],
    ]},
  ]},
  { w: 'pie', p: 'n.', s: [
    { m: '파이', syn: ['pastry'], ex: [
      ['She baked an apple pie.', '그녀는 사과 파이를 구웠다.'],
      ['The pie smells wonderful.', '파이 냄새가 아주 좋다.'],
      ['We cut the pie into six.', '우리는 파이를 여섯으로 잘랐다.'],
    ]},
  ]},
  { w: 'piece', p: 'n.', s: [
    { m: '조각, 한 부분', syn: ['bit'], ex: [
      ['Give me a piece of cake.', '케이크 한 조각 주세요.'],
      ['He broke the plate into pieces.', '그는 접시를 산산조각 냈다.'],
      ['She wrote it on a piece of paper.', '그녀는 종이 한 장에 그것을 적었다.'],
    ]},
  ]},
  { w: 'pile', p: 'n.', s: [
    { m: '더미, 쌓아 올린 것', syn: ['heap'], ex: [
      ['A pile of books sat on the desk.', '책 더미가 책상에 있었다.'],
      ['He made a pile of leaves.', '그는 낙엽 더미를 만들었다.'],
      ['The pile grew taller.', '그 더미가 더 높아졌다.'],
    ]},
  ]},
  { w: 'pin', p: 'n.', s: [
    { m: '핀', syn: [], ex: [
      ['She fixed it with a pin.', '그녀는 핀으로 그것을 고정했다.'],
      ['The pin is very sharp.', '그 핀은 아주 날카롭다.'],
      ['He lost a pin from his badge.', '그는 배지의 핀을 잃어버렸다.'],
    ]},
  ]},
  { w: 'pine', p: 'n.', s: [
    { m: '소나무', syn: [], ex: [
      ['A tall pine stands there.', '큰 소나무가 거기 서 있다.'],
      ['Pine grows in cold places.', '소나무는 추운 곳에서 자란다.'],
      ['The pine smells fresh.', '소나무 향이 상쾌하다.'],
    ]},
  ]},
  { w: 'pipe', p: 'n.', s: [
    { m: '관, 파이프', syn: ['tube'], ex: [
      ['Water flows through the pipe.', '물이 관을 통해 흐른다.'],
      ['The pipe froze last night.', '그 관이 어젯밤에 얼었다.'],
      ['He fixed a broken pipe.', '그는 터진 관을 고쳤다.'],
    ]},
  ]},
  { w: 'pitch', p: 'n.', s: [
    { m: '음높이, 경기장', syn: ['tone'], ex: [
      ['Her voice has a high pitch.', '그녀의 목소리는 음이 높다.'],
      ['The players ran onto the pitch.', '선수들이 경기장으로 달려 나갔다.'],
      ['He could not match the pitch.', '그는 그 음을 맞추지 못했다.'],
    ]},
  ]},
  { w: 'pity', p: 'n.', s: [
    { m: '연민, 안타까움', syn: ['sympathy'], ex: [
      ['It is a pity you cannot come.', '네가 못 온다니 안타깝다.'],
      ['She felt pity for the dog.', '그녀는 그 개를 안쓰러워했다.'],
      ['Pity is not the same as help.', '연민은 도움과 다르다.'],
    ]},
  ]},
  { w: 'plain', p: 'adj.', s: [
    { m: '평범한, 분명한', syn: ['simple'], ex: [
      ['She wore a plain dress.', '그녀는 수수한 옷을 입었다.'],
      ['The answer is plain to see.', '답은 분명히 보인다.'],
      ['He likes plain food.', '그는 담백한 음식을 좋아한다.'],
    ]},
  ]},
  { w: 'plane', p: 'n.', s: [
    { m: '비행기', syn: ['airplane'], ex: [
      ['The plane took off on time.', '비행기는 정시에 이륙했다.'],
      ['We flew by plane.', '우리는 비행기로 갔다.'],
      ['A small plane landed here.', '작은 비행기가 여기 착륙했다.'],
    ]},
  ]},
  { w: 'planet', p: 'n.', s: [
    { m: '행성', syn: [], ex: [
      ['Earth is our planet.', '지구는 우리 행성이다.'],
      ['The planet moves around the sun.', '그 행성은 태양 주위를 돈다.'],
      ['Life may exist on another planet.', '다른 행성에 생명이 있을지도 모른다.'],
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
  { w: 'plenty', p: 'n.', s: [
    { m: '풍부, 많음', syn: ['abundance'], ex: [
      ['We have plenty of time.', '우리는 시간이 충분하다.'],
      ['There is plenty to eat.', '먹을 것이 많다.'],
      ['Plenty of students joined.', '많은 학생이 참여했다.'],
    ]},
  ]},
  { w: 'plus', p: 'prep.', s: [
    { m: '더하기, 게다가', syn: ['and'], ex: [
      ['Two plus three is five.', '2 더하기 3은 5다.'],
      ['The room is small, plus it is dark.', '방이 작고 게다가 어둡다.'],
      ['The price plus tax is high.', '가격에 세금까지 더하면 비싸다.'],
    ]},
  ]},
  { w: 'pocket', p: 'n.', s: [
    { m: '주머니', syn: [], ex: [
      ['He put the coin in his pocket.', '그는 동전을 주머니에 넣었다.'],
      ['My pocket has a hole.', '내 주머니에 구멍이 났다.'],
      ['She found the key in her pocket.', '그녀는 주머니에서 열쇠를 찾았다.'],
    ]},
  ]},
  { w: 'poem', p: 'n.', s: [
    { m: '시', syn: ['verse'], ex: [
      ['She wrote a short poem.', '그녀는 짧은 시를 썼다.'],
      ['The poem is about the sea.', '그 시는 바다에 관한 것이다.'],
      ['He read a poem aloud.', '그는 시를 소리 내어 읽었다.'],
    ]},
  ]},
  { w: 'poet', p: 'n.', s: [
    { m: '시인', syn: ['writer of verse'], ex: [
      ['He became a famous poet.', '그는 유명한 시인이 되었다.'],
      ['The poet lived alone.', '그 시인은 혼자 살았다.'],
      ['A poet sees the world differently.', '시인은 세상을 다르게 본다.'],
    ]},
  ]},
  { w: 'poison', p: 'n.', s: [
    { m: '독', syn: ['toxin'], ex: [
      ['That plant contains poison.', '그 식물에는 독이 있다.'],
      ['Poison can kill quickly.', '독은 빠르게 죽일 수 있다.'],
      ['They tested for poison.', '그들은 독이 있는지 검사했다.'],
    ]},
  ]},
  { w: 'pole', p: 'n.', s: [
    { m: '막대, 극', syn: ['rod'], ex: [
      ['The flag hangs on a pole.', '깃발이 장대에 걸려 있다.'],
      ['The North Pole is very cold.', '북극은 아주 춥다.'],
      ['He held a long pole.', '그는 긴 막대를 들었다.'],
    ]},
  ]},
  { w: 'policy', p: 'n.', s: [
    { m: '정책, 방침', syn: ['rule'], ex: [
      ['The school changed its policy.', '학교가 방침을 바꿨다.'],
      ['This policy helps students.', '이 정책은 학생들을 돕는다.'],
      ['Honesty is the best policy.', '정직이 최선의 방책이다.'],
    ]},
  ]},
  { w: 'polite', p: 'adj.', s: [
    { m: '예의 바른, 공손한', syn: ['well-mannered'], ex: [
      ['He is always polite to older people.', '그는 어른들에게 늘 예의 바르다.'],
      ['Please use polite words.', '공손한 말을 써 주세요.'],
      ['She gave a polite answer.', '그녀는 공손한 대답을 했다.'],
    ]},
  ]},
  { w: 'politics', p: 'n.', s: [
    { m: '정치', syn: ['government affairs'], ex: [
      ['He is interested in politics.', '그는 정치에 관심이 있다.'],
      ['Politics changes slowly.', '정치는 천천히 바뀐다.'],
      ['She studies politics at college.', '그녀는 대학에서 정치를 공부한다.'],
    ]},
  ]},
  { w: 'pollute', p: 'v.', s: [
    { m: '오염시키다', syn: ['contaminate'], ex: [
      ['Factories pollute the river.', '공장들이 강을 오염시킨다.'],
      ['Cars pollute the air.', '자동차는 공기를 오염시킨다.'],
      ['We must not pollute the sea.', '우리는 바다를 오염시키면 안 된다.'],
    ]},
  ]},
  { w: 'pool', p: 'n.', s: [
    { m: '수영장, 웅덩이', syn: ['basin'], ex: [
      ['We swim in the pool.', '우리는 수영장에서 수영한다.'],
      ['The pool is closed today.', '수영장은 오늘 닫혔다.'],
      ['A pool of water formed outside.', '밖에 물웅덩이가 생겼다.'],
    ]},
  ]},
  { w: 'pop', p: 'n.', s: [
    { m: '대중음악, 펑 소리', syn: ['popular music'], ex: [
      ['She loves pop music.', '그녀는 대중음악을 좋아한다.'],
      ['The balloon burst with a pop.', '풍선이 펑 하고 터졌다.'],
      ['Pop songs are easy to sing.', '대중가요는 부르기 쉽다.'],
    ]},
  ]},
  { w: 'popular', p: 'adj.', s: [
    { m: '인기 있는', syn: ['well-liked', 'favorite'], ex: [
      ['This song is popular with teens.', '이 노래는 십 대들에게 인기 있다.'],
      ['Soccer is popular around the world.', '축구는 전 세계에서 인기가 있다.'],
      ['She is popular in our class.', '그녀는 우리 반에서 인기가 많다.'],
    ]},
  ]},
  { w: 'pork', p: 'n.', s: [
    { m: '돼지고기', syn: [], ex: [
      ['We had pork for dinner.', '우리는 저녁으로 돼지고기를 먹었다.'],
      ['This pork is well cooked.', '이 돼지고기는 잘 익었다.'],
      ['She does not eat pork.', '그녀는 돼지고기를 먹지 않는다.'],
    ]},
  ]},
  { w: 'port', p: 'n.', s: [
    { m: '항구', syn: ['harbor'], ex: [
      ['The ship left the port.', '배가 항구를 떠났다.'],
      ['This port is very busy.', '이 항구는 아주 붐빈다.'],
      ['Many boats rest in the port.', '많은 배가 항구에 정박해 있다.'],
    ]},
  ]},
  { w: 'positive', p: 'adj.', s: [
    { m: '긍정적인', syn: ['hopeful', 'optimistic'], ex: [
      ['Keep a positive mind.', '긍정적인 마음을 유지해라.'],
      ['She got positive feedback.', '그녀는 긍정적인 평가를 받았다.'],
      ['A positive attitude changes everything.', '긍정적인 태도가 모든 것을 바꾼다.'],
    ]},
  ]},
  { w: 'possess', p: 'v.', s: [
    { m: '소유하다, 지니다', syn: ['own'], ex: [
      ['She possesses great talent.', '그녀는 뛰어난 재능을 지녔다.'],
      ['He possesses two houses.', '그는 집 두 채를 소유하고 있다.'],
      ['They possess very little.', '그들은 가진 것이 거의 없다.'],
    ]},
  ]},
  { w: 'possible', p: 'adj.', s: [
    { m: '가능한', syn: ['feasible'], ex: [
      ['Is it possible to change it?', '그것을 바꾸는 것이 가능한가요?'],
      ['Come as early as possible.', '가능한 한 일찍 와라.'],
      ['Anything is possible with effort.', '노력하면 무엇이든 가능하다.'],
    ]},
  ]},
  { w: 'post', p: 'v., n.', s: [
    { m: '올리다, 게시하다', syn: ['put up'], ex: [
      ['She posted a photo online.', '그녀는 온라인에 사진을 올렸다.'],
      ['They posted the notice on the wall.', '그들은 벽에 공지를 붙였다.'],
      ['I am posting the results today.', '나는 오늘 결과를 게시한다.'],
    ]},
  ]},
  { w: 'pot', p: 'n.', s: [
    { m: '냄비, 항아리', syn: ['vessel'], ex: [
      ['Boil water in the pot.', '냄비에 물을 끓여라.'],
      ['The pot is too heavy.', '그 냄비는 너무 무겁다.'],
      ['She planted a flower in a pot.', '그녀는 화분에 꽃을 심었다.'],
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
  { w: 'powder', p: 'n.', s: [
    { m: '가루, 분말', syn: ['dust'], ex: [
      ['Add the powder to the water.', '물에 가루를 넣어라.'],
      ['The powder is white and fine.', '그 가루는 희고 곱다.'],
      ['She spilled the powder.', '그녀는 가루를 쏟았다.'],
    ]},
  ]},
  { w: 'practical', p: 'adj.', s: [
    { m: '실용적인, 현실적인', syn: ['useful'], ex: [
      ['That is a practical idea.', '그것은 현실적인 생각이다.'],
      ['She gave practical advice.', '그녀는 실용적인 조언을 했다.'],
      ['We need a practical plan.', '우리는 실용적인 계획이 필요하다.'],
    ]},
  ]},
  { w: 'practice', p: 'v., n.', s: [
    { m: '연습하다; 연습', syn: ['train', 'rehearse'], ex: [
      ['She practices the piano daily.', '그녀는 매일 피아노를 연습한다.'],
      ['Practice makes perfect.', '연습이 완벽을 만든다.'],
      ['We have soccer practice after school.', '우리는 방과 후에 축구 연습이 있다.'],
    ]},
  ]},
  { w: 'practise', p: 'v.', s: [
    { m: '연습하다 (영국식)', syn: ['practice'], ex: [
      ['She practises the piano daily.', '그녀는 매일 피아노를 연습한다.'],
      ['We practised for two hours.', '우리는 두 시간 연습했다.'],
      ['Practise makes progress.', '연습이 발전을 만든다.'],
    ]},
  ]},
  { w: 'pray', p: 'v.', s: [
    { m: '기도하다', syn: ['worship'], ex: [
      ['They pray every morning.', '그들은 매일 아침 기도한다.'],
      ['She prayed for her family.', '그녀는 가족을 위해 기도했다.'],
      ['He is praying quietly.', '그는 조용히 기도하고 있다.'],
    ]},
  ]},
  { w: 'prefer', p: 'v.', s: [
    { m: '더 좋아하다, 선호하다', syn: ['like better', 'favor'], ex: [
      ['I prefer tea to coffee.', '나는 커피보다 차를 더 좋아한다.'],
      ['She prefers reading to watching TV.', '그녀는 TV 보기보다 독서를 선호한다.'],
      ['Which one do you prefer?', '어느 것을 더 좋아하니?'],
    ]},
  ]},
  { w: 'pregnant', p: 'adj.', s: [
    { m: '임신한', syn: ['expecting'], ex: [
      ['She is pregnant with her first child.', '그녀는 첫아이를 임신했다.'],
      ['A pregnant woman needs rest.', '임신한 여성은 휴식이 필요하다.'],
      ['My sister was pregnant last year.', '내 언니는 작년에 임신했었다.'],
    ]},
  ]},
  { w: 'prepare', p: 'v.', s: [
    { m: '준비하다', syn: ['get ready'], ex: [
      ['We prepared for the concert.', '우리는 콘서트를 준비했다.'],
      ['My mom prepared a big meal.', '엄마가 푸짐한 식사를 준비하셨다.'],
      ['Prepare well before the exam.', '시험 전에 잘 준비해라.'],
    ]},
  ]},
  { w: 'presence', p: 'n.', s: [
    { m: '존재, 참석', syn: ['attendance'], ex: [
      ['Her presence made us calm.', '그녀의 존재가 우리를 진정시켰다.'],
      ['Your presence is required.', '당신의 참석이 필요합니다.'],
      ['He felt a strange presence.', '그는 이상한 기척을 느꼈다.'],
    ]},
  ]},
  { w: 'press', p: 'v.', s: [
    { m: '누르다, 압박하다', syn: ['push'], ex: [
      ['Press this button to start.', '시작하려면 이 버튼을 눌러라.'],
      ['She pressed the shirt with an iron.', '그녀는 셔츠를 다림질했다.'],
      ['Do not press her for an answer.', '그녀에게 답을 재촉하지 마라.'],
    ]},
  ]},
  { w: 'pretend', p: 'v.', s: [
    { m: '~인 척하다', syn: ['feign'], ex: [
      ['Do not pretend to be sick.', '아픈 척하지 마라.'],
      ['She pretended not to hear.', '그녀는 못 들은 척했다.'],
      ['Children pretend to be adults.', '아이들은 어른인 척한다.'],
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
  { w: 'pride', p: 'n.', s: [
    { m: '자부심, 자랑', syn: ['self-respect'], ex: [
      ['She takes pride in her work.', '그녀는 자기 일에 자부심을 느낀다.'],
      ['His pride was hurt.', '그의 자존심이 상했다.'],
      ['Pride comes before a fall.', '교만은 넘어짐에 앞선다.'],
    ]},
  ]},
  { w: 'prime', p: 'adj.', s: [
    { m: '주요한, 최고의', syn: ['chief'], ex: [
      ['That is the prime reason.', '그것이 주된 이유다.'],
      ['She is in her prime years.', '그녀는 전성기에 있다.'],
      ['Prime seats cost more.', '좋은 자리는 값이 더 비싸다.'],
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
  { w: 'prison', p: 'n.', s: [
    { m: '감옥, 교도소', syn: ['jail'], ex: [
      ['He spent two years in prison.', '그는 감옥에서 2년을 보냈다.'],
      ['The prison is outside the city.', '그 교도소는 도시 밖에 있다.'],
      ['Prison changed his life.', '감옥이 그의 삶을 바꿨다.'],
    ]},
  ]},
  { w: 'privacy', p: 'n.', s: [
    { m: '사생활', syn: ['seclusion'], ex: [
      ['Everyone needs privacy.', '누구나 사생활이 필요하다.'],
      ['She values her privacy.', '그녀는 사생활을 소중히 여긴다.'],
      ['The wall gives us privacy.', '그 담이 우리에게 사생활을 준다.'],
    ]},
  ]},
  { w: 'private', p: 'adj.', s: [
    { m: '사적인, 개인의', syn: ['personal'], ex: [
      ['This is a private letter.', '이것은 사적인 편지다.'],
      ['He has a private room.', '그는 개인 방이 있다.'],
      ['Keep this matter private.', '이 일은 비밀로 해라.'],
    ]},
  ]},
  { w: 'prize', p: 'n.', s: [
    { m: '상, 상품', syn: ['award'], ex: [
      ['She won first prize.', '그녀는 1등 상을 받았다.'],
      ['The prize was a new bicycle.', '상품은 새 자전거였다.'],
      ['He hopes to get a prize this year.', '그는 올해 상을 받기를 바란다.'],
    ]},
  ]},
  { w: 'probable', p: 'adj.', s: [
    { m: '일어날 것 같은', syn: ['likely'], ex: [
      ['Rain is probable today.', '오늘 비가 올 것 같다.'],
      ['That is the most probable answer.', '그것이 가장 그럴듯한 답이다.'],
      ['A change seems probable.', '변화가 있을 듯하다.'],
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
  { w: 'produce', p: 'v.', s: [
    { m: '생산하다, 만들다', syn: ['make'], ex: [
      ['This farm produces rice.', '이 농장은 쌀을 생산한다.'],
      ['The factory produced cars.', '그 공장은 자동차를 생산했다.'],
      ['Trees produce oxygen.', '나무는 산소를 만든다.'],
    ]},
  ]},
  { w: 'profession', p: 'n.', s: [
    { m: '직업, 전문직', syn: ['occupation'], ex: [
      ['Teaching is a noble profession.', '가르치는 일은 훌륭한 직업이다.'],
      ['She chose the medical profession.', '그녀는 의료직을 택했다.'],
      ['His profession requires study.', '그의 직업은 공부가 필요하다.'],
    ]},
  ]},
  { w: 'profit', p: 'n.', s: [
    { m: '이익, 수익', syn: ['gain'], ex: [
      ['The shop made a small profit.', '그 가게는 적은 이익을 냈다.'],
      ['Profit is not everything.', '이익이 전부는 아니다.'],
      ['They shared the profit equally.', '그들은 이익을 똑같이 나눴다.'],
    ]},
  ]},
  { w: 'progress', p: 'n.', s: [
    { m: '진전, 발전', syn: ['advance'], ex: [
      ['She made good progress.', '그녀는 좋은 진전을 보였다.'],
      ['Progress takes time.', '발전에는 시간이 걸린다.'],
      ['The work is in progress.', '그 작업은 진행 중이다.'],
    ]},
  ]},
  { w: 'promise', p: 'v., n.', s: [
    { m: '약속하다, 약속', syn: ['give ones word'], ex: [
      ['I promise to be on time.', '나는 시간을 지키겠다고 약속한다.'],
      ['She kept her promise.', '그녀는 약속을 지켰다.'],
      ['He promised not to tell anyone.', '그는 아무에게도 말하지 않겠다고 약속했다.'],
    ]},
  ]},
  { w: 'promote', p: 'v.', s: [
    { m: '승진시키다, 촉진하다', syn: ['advance'], ex: [
      ['They promoted her to manager.', '그들은 그녀를 관리자로 승진시켰다.'],
      ['Exercise promotes health.', '운동은 건강을 촉진한다.'],
      ['The school promotes reading.', '그 학교는 독서를 장려한다.'],
    ]},
  ]},
  { w: 'pronounce', p: 'v.', s: [
    { m: '발음하다', syn: ['articulate'], ex: [
      ['How do you pronounce this word?', '이 단어를 어떻게 발음하니?'],
      ['She pronounced it clearly.', '그녀는 그것을 또렷하게 발음했다.'],
      ['He is pronouncing the name wrong.', '그는 그 이름을 잘못 발음하고 있다.'],
    ]},
  ]},
  { w: 'proper', p: 'adj.', s: [
    { m: '적절한, 올바른', syn: ['suitable', 'right'], ex: [
      ['Wear proper shoes for hiking.', '등산에 적절한 신발을 신어라.'],
      ['Use the proper tool for the job.', '그 일에 알맞은 도구를 써라.'],
      ['He did not receive proper training.', '그는 제대로 된 훈련을 받지 못했다.'],
    ]},
  ]},
  { w: 'property', p: 'n.', s: [
    { m: '재산, 속성', syn: ['possession'], ex: [
      ['This land is his property.', '이 땅은 그의 재산이다.'],
      ['Water has special properties.', '물은 특별한 성질이 있다.'],
      ['Do not damage school property.', '학교 재산을 훼손하지 마라.'],
    ]},
  ]},
  { w: 'propose', p: 'v.', s: [
    { m: '제안하다', syn: ['suggest'], ex: [
      ['She proposed a new plan.', '그녀는 새 계획을 제안했다.'],
      ['I propose we start now.', '지금 시작할 것을 제안한다.'],
      ['He proposed a different way.', '그는 다른 방법을 제안했다.'],
    ]},
  ]},
  { w: 'protect', p: 'v.', s: [
    { m: '보호하다, 지키다', syn: ['guard', 'keep safe'], ex: [
      ['Sunglasses protect your eyes.', '선글라스는 눈을 보호한다.'],
      ['We should protect wild animals.', '우리는 야생 동물을 보호해야 한다.'],
      ['A helmet protects your head.', '헬멧은 머리를 보호한다.'],
    ]},
  ]},
  { w: 'protest', p: 'v.', s: [
    { m: '항의하다', syn: ['object'], ex: [
      ['Students protested the decision.', '학생들이 그 결정에 항의했다.'],
      ['She protested loudly.', '그녀는 크게 항의했다.'],
      ['They are protesting outside.', '그들은 밖에서 항의하고 있다.'],
    ]},
  ]},
  { w: 'proud', p: 'adj.', s: [
    { m: '자랑스러운', syn: [], ex: [
      ['I am proud of my sister.', '나는 내 여동생이 자랑스럽다.'],
      ['His parents looked proud.', '그의 부모님은 자랑스러워 보였다.'],
      ['She was proud of her work.', '그녀는 자기 일을 자랑스러워했다.'],
    ]},
  ]},
  { w: 'prove', p: 'v.', s: [
    { m: '증명하다', syn: ['demonstrate'], ex: [
      ['Prove that you are right.', '네가 옳다는 것을 증명해라.'],
      ['The test proved our idea.', '그 실험이 우리 생각을 증명했다.'],
      ['She proved herself quickly.', '그녀는 빠르게 자기 능력을 증명했다.'],
    ]},
  ]},
  { w: 'provide', p: 'v.', s: [
    { m: '제공하다', syn: ['supply', 'give'], ex: [
      ['The school provides free lunch.', '학교는 무료 급식을 제공한다.'],
      ['They provided us with blankets.', '그들은 우리에게 담요를 제공했다.'],
      ['This app provides useful information.', '이 앱은 유용한 정보를 제공한다.'],
    ]},
  ]},
  { w: 'pub', p: 'n.', s: [
    { m: '술집, 선술집', syn: ['bar'], ex: [
      ['They met at a small pub.', '그들은 작은 술집에서 만났다.'],
      ['The pub closes at eleven.', '그 술집은 11시에 문을 닫는다.'],
      ['A pub stands on the corner.', '선술집이 모퉁이에 있다.'],
    ]},
  ]},
  { w: 'public', p: 'adj.', s: [
    { m: '공공의, 대중의', syn: ['common'], ex: [
      ['This is a public park.', '이곳은 공공 공원이다.'],
      ['Public transport is cheap here.', '여기 대중교통은 싸다.'],
      ['The library is open to the public.', '그 도서관은 대중에게 열려 있다.'],
    ]},
  ]},
  { w: 'pull', p: 'v.', s: [
    { m: '당기다, 끌다', syn: ['drag'], ex: [
      ['Pull the door, do not push it.', '문을 밀지 말고 당기세요.'],
      ['He pulled the rope hard.', '그는 밧줄을 세게 당겼다.'],
      ['The horse is pulling a cart.', '말이 수레를 끌고 있다.'],
    ]},
  ]},
  { w: 'pump', p: 'n.', s: [
    { m: '펌프', syn: [], ex: [
      ['The pump moves water.', '그 펌프는 물을 옮긴다.'],
      ['He fixed the broken pump.', '그는 고장 난 펌프를 고쳤다.'],
      ['Use a pump for the tire.', '타이어에는 펌프를 써라.'],
    ]},
  ]},
  { w: 'punch', p: 'v.', s: [
    { m: '주먹으로 치다', syn: ['hit'], ex: [
      ['Do not punch your friend.', '친구를 때리지 마라.'],
      ['He punched the wall in anger.', '그는 화가 나서 벽을 쳤다.'],
      ['She punched a hole in the paper.', '그녀는 종이에 구멍을 뚫었다.'],
    ]},
  ]},
  { w: 'punish', p: 'v.', s: [
    { m: '벌하다', syn: ['penalize'], ex: [
      ['Do not punish the child harshly.', '아이를 심하게 벌하지 마라.'],
      ['The law punishes theft.', '법은 절도를 처벌한다.'],
      ['He was punished for lying.', '그는 거짓말로 벌을 받았다.'],
    ]},
  ]},
  { w: 'purchase', p: 'v.', s: [
    { m: '구입하다', syn: ['buy'], ex: [
      ['She purchased a new coat.', '그녀는 새 코트를 구입했다.'],
      ['We purchase supplies monthly.', '우리는 매달 물품을 구입한다.'],
      ['He purchased the ticket online.', '그는 온라인으로 표를 구입했다.'],
    ]},
  ]},
  { w: 'pure', p: 'adj.', s: [
    { m: '순수한, 깨끗한', syn: ['clean'], ex: [
      ['The water here is pure.', '여기 물은 깨끗하다.'],
      ['This is pure gold.', '이것은 순금이다.'],
      ['It was pure luck.', '그것은 순전히 운이었다.'],
    ]},
  ]},
  { w: 'purple', p: 'adj.', s: [
    { m: '보라색의', syn: ['violet'], ex: [
      ['She wore a purple scarf.', '그녀는 보라색 스카프를 했다.'],
      ['The flowers are purple.', '그 꽃들은 보라색이다.'],
      ['He painted the door purple.', '그는 문을 보라색으로 칠했다.'],
    ]},
  ]},
], 'curriculum');
