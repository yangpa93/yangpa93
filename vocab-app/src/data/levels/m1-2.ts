/**
 * 중학교 1학년 레벨 2 — 수록 154 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_2 = defineLevel('m1-2', [
  { w: 'at least', p: 'phr.', s: [
    { m: '적어도, 최소한', syn: [], ex: [
      ['It will take at least an hour.', '적어도 한 시간은 걸릴 것이다.'],
      ['At least twenty people came.', '적어도 스무 명이 왔다.'],
      ['You should at least say thank you.', '최소한 고맙다는 말은 해야지.'],
    ]},
  ]},
  { w: 'at night', p: 'phr.', s: [
    { m: '밤에', syn: [], ex: [
      ['Owls hunt at night.', '올빼미는 밤에 사냥한다.'],
      ['She reads at night before sleeping.', '그녀는 자기 전 밤에 책을 읽는다.'],
      ['The streets are quiet at night.', '밤에는 거리가 조용하다.'],
    ]},
  ]},
  { w: 'at once', p: 'phr.', s: [
    { m: '즉시, 당장', syn: ['immediately', 'right away'], ex: [
      ['Come here at once.', '당장 이리 오너라.'],
      ['The doctor came at once.', '의사가 즉시 왔다.'],
      ['She recognized him at once.', '그녀는 그를 곧바로 알아보았다.'],
    ]},
  ]},
  { w: 'at the same time', p: 'phr.', s: [
    { m: '동시에', syn: ['simultaneously'], ex: [
      ['They both spoke at the same time.', '그 둘은 동시에 말했다.'],
      ['You cannot do two things at the same time.', '두 가지를 동시에 할 수는 없다.'],
      ['The lights went out at the same time.', '불이 동시에 꺼졌다.'],
    ]},
  ]},
  { w: 'be about to', p: 'phr.', s: [
    { m: '막 ~하려던 참이다', syn: [], ex: [
      ['I was about to call you.', '막 너에게 전화하려던 참이었다.'],
      ['The train is about to leave.', '기차가 막 떠나려 한다.'],
      ['She was about to cry when he arrived.', '그가 도착했을 때 그녀는 막 울려던 참이었다.'],
    ]},
  ]},
  { w: 'be angry with', p: 'phr.', s: [
    { m: '~에게 화가 나다', syn: [], ex: [
      ['He was angry with his brother.', '그는 형에게 화가 나 있었다.'],
      ['Do not be angry with me.', '나에게 화내지 마.'],
      ['She is still angry with them.', '그녀는 아직도 그들에게 화가 나 있다.'],
    ]},
  ]},
  { w: 'be busy with', p: 'phr.', s: [
    { m: '~로 바쁘다', syn: [], ex: [
      ['She is busy with her homework.', '그녀는 숙제로 바쁘다.'],
      ['He was busy with preparations all day.', '그는 하루 종일 준비로 바빴다.'],
      ['They are busy with the new project.', '그들은 새 프로젝트로 바쁘다.'],
    ]},
  ]},
  { w: 'be covered with', p: 'phr.', s: [
    { m: '~로 덮여 있다', syn: [], ex: [
      ['The field was covered with snow.', '들판이 눈으로 덮여 있었다.'],
      ['His shoes were covered with mud.', '그의 신발은 진흙으로 덮여 있었다.'],
      ['The table is covered with books.', '탁자가 책으로 덮여 있다.'],
    ]},
  ]},
  { w: 'be different from', p: 'phr.', s: [
    { m: '~와 다르다', syn: [], ex: [
      ['My opinion is different from yours.', '내 의견은 네 의견과 다르다.'],
      ['This city is different from what I imagined.', '이 도시는 내가 상상한 것과 다르다.'],
      ['Her style is different from his.', '그녀의 방식은 그의 것과 다르다.'],
    ]},
  ]},
  { w: 'be famous for', p: 'phr.', s: [
    { m: '~로 유명하다', syn: ['be known for'], ex: [
      ['The town is famous for its bridge.', '그 마을은 다리로 유명하다.'],
      ['She is famous for her paintings.', '그녀는 그림으로 유명하다.'],
      ['Korea is famous for its food.', '한국은 음식으로 유명하다.'],
    ]},
  ]},
  { w: 'be filled with', p: 'phr.', s: [
    { m: '~로 가득 차다', syn: ['be full of'], ex: [
      ['The room was filled with laughter.', '방은 웃음으로 가득 찼다.'],
      ['His eyes were filled with tears.', '그의 눈은 눈물로 가득했다.'],
      ['The box was filled with old photos.', '그 상자는 오래된 사진으로 가득했다.'],
    ]},
  ]},
  { w: 'be good for', p: 'phr.', s: [
    { m: '~에 좋다, 이롭다', syn: [], ex: [
      ['Walking is good for your health.', '걷기는 건강에 좋다.'],
      ['This medicine is good for a cough.', '이 약은 기침에 좋다.'],
      ['Sleep is good for the brain.', '잠은 뇌에 좋다.'],
    ]},
  ]},
  { w: 'be kind to', p: 'phr.', s: [
    { m: '~에게 친절하다', syn: [], ex: [
      ['Please be kind to your classmates.', '반 친구들에게 친절하게 대하렴.'],
      ['She was kind to everyone she met.', '그녀는 만나는 모든 사람에게 친절했다.'],
      ['He is always kind to animals.', '그는 늘 동물에게 친절하다.'],
    ]},
  ]},
  { w: 'be late for', p: 'phr.', s: [
    { m: '~에 늦다', syn: [], ex: [
      ['I was late for school again.', '나는 또 학교에 지각했다.'],
      ['Do not be late for the meeting.', '회의에 늦지 마라.'],
      ['She was late for her own party.', '그녀는 자기 파티에 늦었다.'],
    ]},
  ]},
  { w: 'be made of', p: 'phr.', s: [
    { m: '~로 만들어지다 (재료가 그대로 보일 때)', syn: [], ex: [
      ['The chair is made of wood.', '그 의자는 나무로 만들어졌다.'],
      ['This ring is made of gold.', '이 반지는 금으로 만들어졌다.'],
      ['The walls are made of stone.', '그 벽은 돌로 만들어졌다.'],
    ]},
  ]},
  { w: 'be proud of', p: 'phr.', s: [
    { m: '~을 자랑스러워하다', syn: [], ex: [
      ['I am proud of my sister.', '나는 내 여동생이 자랑스럽다.'],
      ['She was proud of her work.', '그녀는 자신의 일을 자랑스러워했다.'],
      ['They are proud of what they built.', '그들은 자신들이 만든 것을 자랑스러워한다.'],
    ]},
  ]},
  { w: 'be ready for', p: 'phr.', s: [
    { m: '~할 준비가 되다', syn: [], ex: [
      ['Are you ready for the test?', '시험 볼 준비가 되었니?'],
      ['We are ready for winter.', '우리는 겨울을 맞을 준비가 되었다.'],
      ['He was not ready for the question.', '그는 그 질문에 준비되어 있지 않았다.'],
    ]},
  ]},
  { w: 'by', p: 'prep.', s: [
    { m: '~ 옆에, ~로, ~까지', syn: [], ex: [
      ['She sat by the window.', '그녀는 창가에 앉았다.'],
      ['We go to school by bus.', '우리는 버스로 학교에 간다.'],
      ['Finish it by Friday.', '금요일까지 그것을 끝내라.'],
    ]},
  ]},
  { w: 'cake', p: 'n.', s: [
    { m: '케이크', syn: [], ex: [
      ['She baked a cake for me.', '그녀는 나를 위해 케이크를 구웠다.'],
      ['The cake tastes very sweet.', '그 케이크는 아주 달다.'],
      ['We cut the cake into eight pieces.', '우리는 케이크를 여덟 조각으로 잘랐다.'],
    ]},
  ]},
  { w: 'call', p: 'v.', s: [
    { m: '부르다, 전화하다', syn: ['phone'], ex: [
      ['Please call me tonight.', '오늘 밤에 전화해 주세요.'],
      ['She called my name loudly.', '그녀는 내 이름을 크게 불렀다.'],
      ['He is calling his mother now.', '그는 지금 어머니께 전화하고 있다.'],
    ]},
  ]},
  { w: 'camera', p: 'n.', s: [
    { m: '카메라', syn: [], ex: [
      ['He bought a new camera.', '그는 새 카메라를 샀다.'],
      ['This camera takes clear pictures.', '이 카메라는 선명한 사진을 찍는다.'],
      ['She left her camera at home.', '그녀는 카메라를 집에 두고 왔다.'],
    ]},
  ]},
  { w: 'camp', p: 'n., v.', s: [
    { m: '캠프, 야영하다', syn: [], ex: [
      ['We went to a summer camp.', '우리는 여름 캠프에 갔다.'],
      ['They camped near the river.', '그들은 강 근처에서 야영했다.'],
      ['The camp starts on Monday.', '캠프는 월요일에 시작한다.'],
    ]},
  ]},
  { w: 'campaign', p: 'n.', s: [
    { m: '캠페인, 운동', syn: [], ex: [
      ['We started a clean-up campaign.', '우리는 청소 캠페인을 시작했다.'],
      ['The campaign helped many children.', '그 운동은 많은 아이를 도왔다.'],
      ['She joined a campaign to save water.', '그녀는 물 절약 캠페인에 참여했다.'],
    ]},
  ]},
  { w: 'can', p: 'aux.', s: [
    { m: '~할 수 있다', syn: ['be able to'], ex: [
      ['I can swim very well.', '나는 수영을 아주 잘할 수 있다.'],
      ['Can you help me?', '나를 도와줄 수 있니?'],
      ['She can speak three languages.', '그녀는 세 개 언어를 할 수 있다.'],
    ]},
  ]},
  { w: 'candle', p: 'n.', s: [
    { m: '초, 양초', syn: [], ex: [
      ['She lit a candle in the dark.', '그녀는 어둠 속에서 초에 불을 붙였다.'],
      ['There are ten candles on the cake.', '케이크 위에 초가 열 개 있다.'],
      ['The candle went out.', '초가 꺼졌다.'],
    ]},
  ]},
  { w: 'candy', p: 'n.', s: [
    { m: '사탕', syn: [], ex: [
      ['Children love candy.', '아이들은 사탕을 아주 좋아한다.'],
      ['He gave me a candy.', '그는 나에게 사탕을 하나 주었다.'],
      ['Too much candy is bad for teeth.', '사탕을 너무 많이 먹으면 이에 나쁘다.'],
    ]},
  ]},
  { w: 'cap', p: 'n.', s: [
    { m: '모자', syn: [], ex: [
      ['He wore a blue cap.', '그는 파란 모자를 썼다.'],
      ['Take off your cap indoors.', '실내에서는 모자를 벗어라.'],
      ['My cap flew away in the wind.', '내 모자가 바람에 날아갔다.'],
    ]},
  ]},
  { w: 'car', p: 'n.', s: [
    { m: '자동차', syn: ['automobile'], ex: [
      ['My father washes the car on Sunday.', '아버지는 일요일에 세차를 하신다.'],
      ['The car stopped at the light.', '차가 신호에서 멈췄다.'],
      ['We went there by car.', '우리는 차로 그곳에 갔다.'],
    ]},
  ]},
  { w: 'card', p: 'n.', s: [
    { m: '카드', syn: [], ex: [
      ['She sent me a birthday card.', '그녀는 나에게 생일 카드를 보냈다.'],
      ['He paid with a card.', '그는 카드로 계산했다.'],
      ['Pick one card from the box.', '상자에서 카드 한 장을 골라라.'],
    ]},
  ]},
  { w: 'care', p: 'n.', s: [
    { m: '돌봄, 주의', syn: [], ex: [
      ['Handle the glass with care.', '유리를 조심해서 다뤄라.'],
      ['The baby needs constant care.', '아기는 계속 돌봄이 필요하다.'],
      ['She takes care of her little brother.', '그녀는 남동생을 돌본다.'],
    ]},
  ]},
  { w: 'careful', p: 'adj.', s: [
    { m: '조심하는, 주의 깊은', syn: ['cautious'], ex: [
      ['Be careful on the stairs.', '계단에서 조심해라.'],
      ['She is careful with her words.', '그녀는 말을 조심한다.'],
      ['A careful driver never hurries.', '조심하는 운전자는 결코 서두르지 않는다.'],
    ]},
  ]},
  { w: 'carrot', p: 'n.', s: [
    { m: '당근', syn: [], ex: [
      ['Rabbits like carrots.', '토끼는 당근을 좋아한다.'],
      ['Cut the carrot into small pieces.', '당근을 작게 잘라라.'],
      ['This carrot is fresh and sweet.', '이 당근은 신선하고 달다.'],
    ]},
  ]},
  { w: 'carry', p: 'v.', s: [
    { m: '나르다, 들고 가다', syn: [], ex: [
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
  { w: 'case', p: 'n.', s: [
    { m: '경우; 상자, 케이스', syn: ['situation'], ex: [
      ['In that case, we should wait.', '그런 경우에는 기다려야 한다.'],
      ['Put the glasses in the case.', '안경을 케이스에 넣어라.'],
      ['This is a special case.', '이것은 특별한 경우다.'],
    ]},
  ]},
  { w: 'cash', p: 'n.', s: [
    { m: '현금', syn: [], ex: [
      ['He paid in cash.', '그는 현금으로 냈다.'],
      ['I have no cash with me.', '나는 현금이 없다.'],
      ['The shop takes only cash.', '그 가게는 현금만 받는다.'],
    ]},
  ]},
  { w: 'cat', p: 'n.', s: [
    { m: '고양이', syn: [], ex: [
      ['The cat is sleeping on the sofa.', '고양이가 소파에서 자고 있다.'],
      ['My cat catches mice.', '내 고양이는 쥐를 잡는다.'],
      ['Cats do not like water.', '고양이는 물을 좋아하지 않는다.'],
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
  { w: 'center', p: 'n.', s: [
    { m: '중심, 센터', syn: ['middle'], ex: [
      ['The table is in the center of the room.', '탁자가 방 중앙에 있다.'],
      ['We met at the shopping center.', '우리는 쇼핑센터에서 만났다.'],
      ['Draw a dot in the center.', '중앙에 점을 하나 찍어라.'],
    ]},
  ]},
  { w: 'certain', p: 'adj.', s: [
    { m: '확실한, 확신하는', syn: ['sure', 'confident'], ex: [
      ['I am certain he will come.', '나는 그가 올 것이라고 확신한다.'],
      ['It is certain that prices will rise.', '가격이 오를 것은 확실하다.'],
    ]},
    { m: '어떤, 특정한', syn: ['particular', 'specific'], ex: [
      ['Certain foods can cause allergies.', '어떤 음식은 알레르기를 일으킬 수 있다.'],
      ['You may enter only at certain times.', '특정 시간에만 들어갈 수 있다.'],
    ]},
  ]},
  { w: 'chair', p: 'n.', s: [
    { m: '의자', syn: ['seat'], ex: [
      ['Please sit on this chair.', '이 의자에 앉으세요.'],
      ['The chair is too low for me.', '그 의자는 나에게 너무 낮다.'],
      ['He pushed his chair back.', '그는 의자를 뒤로 밀었다.'],
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
    { m: '바꾸다, 변하다', syn: [], ex: [
      ['She changed her plan.', '그녀는 계획을 바꾸었다.'],
      ['The weather changes quickly here.', '여기는 날씨가 빨리 변한다.'],
    ]},
    { m: '거스름돈, 잔돈', syn: [], ex: [
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
    { m: '확인하다, 점검하다', syn: [], ex: [
      ['Check your answers again.', '답을 다시 확인해라.'],
      ['He checked the time on his phone.', '그는 휴대폰으로 시간을 확인했다.'],
      ['She is checking the list.', '그녀는 목록을 확인하고 있다.'],
    ]},
  ]},
  { w: 'cheese', p: 'n.', s: [
    { m: '치즈', syn: [], ex: [
      ['I like cheese on my bread.', '나는 빵에 치즈를 얹어 먹는 것을 좋아한다.'],
      ['This cheese smells strong.', '이 치즈는 냄새가 강하다.'],
      ['She bought milk and cheese.', '그녀는 우유와 치즈를 샀다.'],
    ]},
  ]},
  { w: 'cheque', p: 'n.', s: [
    { m: '수표', syn: ['check'], ex: [
      ['He paid by cheque.', '그는 수표로 지불했다.'],
      ['The cheque arrived yesterday.', '수표가 어제 도착했다.'],
      ['Write your name on the cheque.', '수표에 이름을 쓰세요.'],
    ]},
  ]},
  { w: 'chicken', p: 'n.', s: [
    { m: '닭, 닭고기', syn: [], ex: [
      ['We had chicken for dinner.', '우리는 저녁으로 닭고기를 먹었다.'],
      ['The chicken laid an egg.', '닭이 알을 낳았다.'],
      ['She fried the chicken.', '그녀는 닭을 튀겼다.'],
    ]},
  ]},
  { w: 'child', p: 'n.', s: [
    { m: '아이, 어린이', syn: ['kid'], ex: [
      ['Every child needs love.', '모든 아이는 사랑이 필요하다.'],
      ['The child is playing alone.', '그 아이는 혼자 놀고 있다.'],
      ['She has one child.', '그녀는 아이가 하나 있다.'],
    ]},
  ]},
  { w: 'chocolate', p: 'n.', s: [
    { m: '초콜릿', syn: [], ex: [
      ['She gave me a box of chocolate.', '그녀는 나에게 초콜릿 한 상자를 주었다.'],
      ['This chocolate is not too sweet.', '이 초콜릿은 그리 달지 않다.'],
      ['He eats chocolate every day.', '그는 매일 초콜릿을 먹는다.'],
    ]},
  ]},
  { w: 'choose', p: 'v.', s: [
    { m: '고르다, 선택하다', syn: ['pick', 'select'], ex: [
      ['Choose one of these hats.', '이 모자들 중 하나를 골라라.'],
      ['She chose the red one.', '그녀는 빨간 것을 골랐다.'],
      ['You can choose your own topic.', '너는 주제를 스스로 정할 수 있다.'],
    ]},
  ]},
  { w: 'church', p: 'n.', s: [
    { m: '교회', syn: [], ex: [
      ['They go to church on Sunday.', '그들은 일요일에 교회에 간다.'],
      ['The church is very old.', '그 교회는 아주 오래되었다.'],
      ['We heard a church bell.', '우리는 교회 종소리를 들었다.'],
    ]},
  ]},
  { w: 'circle', p: 'n.', s: [
    { m: '원, 동그라미', syn: ['ring'], ex: [
      ['Draw a circle on the paper.', '종이에 원을 하나 그려라.'],
      ['The children sat in a circle.', '아이들이 둥글게 앉았다.'],
      ['A circle has no corners.', '원에는 모서리가 없다.'],
    ]},
  ]},
  { w: 'city', p: 'n.', s: [
    { m: '도시', syn: [], ex: [
      ['Seoul is a big city.', '서울은 큰 도시다.'],
      ['Many people move to the city.', '많은 사람이 도시로 이사한다.'],
      ['The city is busy at night.', '그 도시는 밤에 붐빈다.'],
    ]},
  ]},
  { w: 'class', p: 'n.', s: [
    { m: '수업, 학급', syn: ['lesson'], ex: [
      ['Our class starts at nine.', '우리 수업은 9시에 시작한다.'],
      ['She is the tallest in our class.', '그녀는 우리 반에서 키가 가장 크다.'],
      ['I have four classes today.', '나는 오늘 수업이 네 개다.'],
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
    { m: '청소하다', syn: ['tidy up'], ex: [
      ['I clean my room every Sunday.', '나는 일요일마다 방을 청소한다.'],
      ['We cleaned the classroom together.', '우리는 함께 교실을 청소했다.'],
    ]},
    { m: '깨끗한', syn: ['spotless'], ex: [
      ['Keep your hands clean.', '손을 깨끗하게 유지해라.'],
      ['The water here is very clean.', '이곳의 물은 아주 깨끗하다.'],
    ]},
  ]},
  { w: 'clear', p: 'adj.', s: [
    { m: '맑은, 분명한', syn: [], ex: [
      ['The water is clear and cold.', '물이 맑고 차갑다.'],
      ['Her voice was clear and loud.', '그녀의 목소리는 또렷하고 컸다.'],
      ['Make your answer clear.', '답을 분명하게 하라.'],
    ]},
  ]},
  { w: 'clever', p: 'adj.', s: [
    { m: '영리한, 똑똑한', syn: ['smart'], ex: [
      ['She is a clever student.', '그녀는 영리한 학생이다.'],
      ['That was a clever idea.', '그것은 기발한 생각이었다.'],
      ['Dogs are clever animals.', '개는 영리한 동물이다.'],
    ]},
  ]},
  { w: 'climb', p: 'v.', s: [
    { m: '오르다, 등반하다', syn: ['go up'], ex: [
      ['They climbed the mountain together.', '그들은 함께 산을 올랐다.'],
      ['The cat is climbing the tree.', '고양이가 나무를 오르고 있다.'],
      ['We climb these stairs every day.', '우리는 매일 이 계단을 오른다.'],
    ]},
  ]},
  { w: 'clock', p: 'n.', s: [
    { m: '시계', syn: [], ex: [
      ['The clock on the wall stopped.', '벽시계가 멈췄다.'],
      ['Look at the clock, it is noon.', '시계를 봐, 정오야.'],
      ['My clock wakes me at six.', '내 시계는 6시에 나를 깨운다.'],
    ]},
  ]},
  { w: 'close', p: 'v., adj.', s: [
    { m: '닫다', syn: ['shut'], ex: [
      ['Please close the window.', '창문을 닫아 주세요.'],
      ['The shop closes at nine.', '그 가게는 9시에 문을 닫는다.'],
    ]},
    { m: '가까운, 친한', syn: ['near'], ex: [
      ['My school is close to my house.', '내 학교는 집에서 가깝다.'],
      ['She is a close friend of mine.', '그녀는 나의 친한 친구이다.'],
    ]},
  ]},
  { w: 'clothes', p: 'n.', s: [
    { m: '옷', syn: ['clothing'], ex: [
      ['She washed her clothes.', '그녀는 옷을 빨았다.'],
      ['Wear warm clothes today.', '오늘은 따뜻한 옷을 입어라.'],
      ['These clothes are too small.', '이 옷은 너무 작다.'],
    ]},
  ]},
  { w: 'cloud', p: 'n.', s: [
    { m: '구름', syn: [], ex: [
      ['A dark cloud covered the sun.', '검은 구름이 해를 가렸다.'],
      ['Clouds bring rain.', '구름은 비를 가져온다.'],
      ['The cloud looks like a rabbit.', '그 구름은 토끼처럼 보인다.'],
    ]},
  ]},
  { w: 'cloudy', p: 'adj.', s: [
    { m: '흐린, 구름이 낀', syn: [], ex: [
      ['It is cloudy today.', '오늘은 날이 흐리다.'],
      ['The sky became cloudy in the afternoon.', '오후에 하늘이 흐려졌다.'],
      ['We cannot see the stars on cloudy nights.', '흐린 밤에는 별을 볼 수 없다.'],
    ]},
  ]},
  { w: 'club', p: 'n.', s: [
    { m: '동아리, 클럽', syn: ['group'], ex: [
      ['I joined the music club.', '나는 음악 동아리에 가입했다.'],
      ['Our club meets on Tuesday.', '우리 동아리는 화요일에 모인다.'],
      ['The club has twenty members.', '그 동아리는 회원이 스무 명이다.'],
    ]},
  ]},
  { w: 'coat', p: 'n.', s: [
    { m: '코트, 외투', syn: [], ex: [
      ['Put on your coat before going out.', '나가기 전에 코트를 입어라.'],
      ['Her coat is warm and long.', '그녀의 코트는 따뜻하고 길다.'],
      ['He hung his coat on the door.', '그는 코트를 문에 걸었다.'],
    ]},
  ]},
  { w: 'coffee', p: 'n.', s: [
    { m: '커피', syn: [], ex: [
      ['My father drinks coffee every morning.', '아버지는 매일 아침 커피를 드신다.'],
      ['This coffee is too bitter.', '이 커피는 너무 쓰다.'],
      ['She ordered a cup of coffee.', '그녀는 커피 한 잔을 주문했다.'],
    ]},
  ]},
  { w: 'cold', p: 'adj.', s: [
    { m: '추운, 차가운', syn: ['chilly'], ex: [
      ['The water is very cold.', '물이 아주 차갑다.'],
      ['It gets cold at night.', '밤에는 추워진다.'],
      ['Wear a hat on cold days.', '추운 날에는 모자를 써라.'],
    ]},
  ]},
  { w: 'collect', p: 'v.', s: [
    { m: '모으다, 수집하다', syn: ['gather'], ex: [
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
  { w: 'color', p: 'n.', s: [
    { m: '색, 색깔', syn: [], ex: [
      ['What color do you like?', '어떤 색을 좋아하니?'],
      ['The color of the sky changed.', '하늘 색이 바뀌었다.'],
      ['She used five colors.', '그녀는 다섯 가지 색을 썼다.'],
    ]},
  ]},
  { w: 'colour', p: 'n.', s: [
    { m: '색, 색깔 (영국식)', syn: ['color'], ex: [
      ['This colour is too dark.', '이 색은 너무 어둡다.'],
      ['Choose a bright colour.', '밝은 색을 골라라.'],
      ['The colour of the leaves changed.', '잎의 색이 바뀌었다.'],
    ]},
  ]},
  { w: 'come', p: 'v.', s: [
    { m: '오다', syn: ['arrive'], ex: [
      ['Please come to my house.', '우리 집에 와 주세요.'],
      ['She came home late.', '그녀는 늦게 집에 왔다.'],
      ['Winter is coming soon.', '겨울이 곧 온다.'],
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
    { m: '편안한', syn: ['cozy'], ex: [
      ['This chair is very comfortable.', '이 의자는 아주 편안하다.'],
      ['Wear comfortable shoes for the trip.', '여행에는 편한 신발을 신어라.'],
      ['I felt comfortable with the new teacher.', '나는 새 선생님이 편하게 느껴졌다.'],
    ]},
  ]},
  { w: 'comic', p: 'n.', s: [
    { m: '만화', syn: ['cartoon'], ex: [
      ['He reads comics after school.', '그는 방과 후에 만화를 읽는다.'],
      ['This comic is really funny.', '이 만화는 정말 재미있다.'],
      ['She borrowed three comics.', '그녀는 만화책 세 권을 빌렸다.'],
    ]},
  ]},
  { w: 'company', p: 'n.', s: [
    { m: '회사', syn: ['firm'], ex: [
      ['My mother works for a big company.', '어머니는 큰 회사에서 일하신다.'],
      ['The company makes phones.', '그 회사는 휴대폰을 만든다.'],
      ['He started his own company.', '그는 자기 회사를 차렸다.'],
    ]},
  ]},
  { w: 'compute', p: 'v.', s: [
    { m: '계산하다', syn: ['calculate'], ex: [
      ['Please compute the total cost.', '총 비용을 계산해 주세요.'],
      ['The machine computes very fast.', '그 기계는 아주 빨리 계산한다.'],
      ['She computed the answer in her head.', '그녀는 머릿속으로 답을 계산했다.'],
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
  { w: 'congratulate', p: 'v.', s: [
    { m: '축하하다', syn: [], ex: [
      ['We congratulate you on your win.', '네 승리를 축하해.'],
      ['She congratulated her friend warmly.', '그녀는 친구를 따뜻하게 축하해 주었다.'],
      ['They came to congratulate the winner.', '그들은 우승자를 축하하러 왔다.'],
    ]},
  ]},
  { w: 'control', p: 'v.', s: [
    { m: '통제하다, 조절하다', syn: ['manage'], ex: [
      ['You should control your anger.', '너는 화를 다스려야 한다.'],
      ['He controlled the car well.', '그는 차를 잘 몰았다.'],
      ['This button controls the sound.', '이 버튼이 소리를 조절한다.'],
    ]},
  ]},
  { w: 'cook', p: 'v., n.', s: [
    { m: '요리하다, 요리사', syn: [], ex: [
      ['My father cooks dinner on Sundays.', '아버지는 일요일에 저녁을 요리하신다.'],
      ['She cooked pasta for us.', '그녀는 우리에게 파스타를 만들어 주었다.'],
      ['He is a famous cook.', '그는 유명한 요리사다.'],
    ]},
  ]},
  { w: 'cookie', p: 'n.', s: [
    { m: '쿠키, 과자', syn: ['biscuit'], ex: [
      ['She baked cookies this morning.', '그녀는 오늘 아침 쿠키를 구웠다.'],
      ['The cookie is still warm.', '그 쿠키는 아직 따뜻하다.'],
      ['He ate five cookies.', '그는 쿠키 다섯 개를 먹었다.'],
    ]},
  ]},
  { w: 'cooky', p: 'n.', s: [
    { m: '쿠키, 과자', syn: ['cookie'], ex: [
      ['A cooky fell on the floor.', '쿠키 하나가 바닥에 떨어졌다.'],
      ['She made a big cooky for me.', '그녀는 나를 위해 큰 쿠키를 만들었다.'],
      ['This cooky tastes like butter.', '이 쿠키는 버터 맛이 난다.'],
    ]},
  ]},
  { w: 'cool', p: 'adj.', s: [
    { m: '시원한', syn: [], ex: [
      ['The evening air is cool.', '저녁 공기가 시원하다.'],
      ['Keep the milk in a cool place.', '우유를 시원한 곳에 두어라.'],
    ]},
    { m: '멋진', syn: ['great'], ex: [
      ['That is a cool idea.', '그거 멋진 생각이다.'],
      ['He wore a cool jacket to school.', '그는 멋진 재킷을 입고 학교에 왔다.'],
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
    { m: '(비용이) 들다, 비용', syn: [], ex: [
      ['How much does it cost?', '그것은 얼마입니까?'],
      ['The trip cost too much money.', '그 여행은 돈이 너무 많이 들었다.'],
      ['The total cost was fifty dollars.', '총 비용은 50달러였다.'],
    ]},
  ]},
  { w: 'could', p: 'aux.', s: [
    { m: '~할 수 있었다, ~해 주시겠어요', syn: ['was able to'], ex: [
      ['Could you open the window?', '창문을 열어 주시겠어요?'],
      ['She could swim at age five.', '그녀는 다섯 살에 수영할 수 있었다.'],
      ['We could not find the key.', '우리는 열쇠를 찾을 수 없었다.'],
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
  { w: 'couple', p: 'n.', s: [
    { m: '한 쌍, 두 사람', syn: ['pair'], ex: [
      ['A couple sat on the bench.', '한 쌍이 벤치에 앉아 있었다.'],
      ['I need a couple of pens.', '나는 펜 두 자루가 필요하다.'],
      ['The couple got married in May.', '그 부부는 5월에 결혼했다.'],
    ]},
  ]},
  { w: 'course', p: 'n.', s: [
    { m: '과정, 강좌', syn: ['class'], ex: [
      ['She takes an English course.', '그녀는 영어 강좌를 듣는다.'],
      ['The course lasts six weeks.', '그 과정은 6주 동안 이어진다.'],
      ['This course is for beginners.', '이 강좌는 초보자를 위한 것이다.'],
    ]},
  ]},
  { w: 'court', p: 'n.', s: [
    { m: '경기장, 법정', syn: [], ex: [
      ['We played on the tennis court.', '우리는 테니스 코트에서 경기했다.'],
      ['The court is closed today.', '경기장은 오늘 닫혀 있다.'],
      ['He went to court as a witness.', '그는 증인으로 법정에 갔다.'],
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
    { m: '덮다, 가리다', syn: [], ex: [
      ['Cover the pot with a lid.', '냄비를 뚜껑으로 덮어라.'],
      ['Snow covered the whole town.', '눈이 온 마을을 덮었다.'],
      ['She covered her face with her hands.', '그녀는 손으로 얼굴을 가렸다.'],
    ]},
  ]},
  { w: 'cow', p: 'n.', s: [
    { m: '소, 암소', syn: [], ex: [
      ['Cows give us milk.', '소는 우리에게 우유를 준다.'],
      ['The cow is eating grass.', '소가 풀을 뜯고 있다.'],
      ['They keep ten cows on the farm.', '그들은 농장에서 소 열 마리를 기른다.'],
    ]},
  ]},
  { w: 'crayon', p: 'n.', s: [
    { m: '크레용', syn: [], ex: [
      ['She drew with a red crayon.', '그녀는 빨간 크레용으로 그렸다.'],
      ['The crayon broke in half.', '크레용이 반으로 부러졌다.'],
      ['Children use crayons in art class.', '아이들은 미술 시간에 크레용을 쓴다.'],
    ]},
  ]},
  { w: 'cream', p: 'n.', s: [
    { m: '크림', syn: [], ex: [
      ['She put cream in her coffee.', '그녀는 커피에 크림을 넣었다.'],
      ['The cake has cream inside.', '그 케이크는 안에 크림이 들었다.'],
      ['This cream is very sweet.', '이 크림은 아주 달다.'],
    ]},
  ]},
  { w: 'cross', p: 'v.', s: [
    { m: '건너다', syn: ['go across'], ex: [
      ['Look both ways before you cross.', '건너기 전에 양쪽을 봐라.'],
      ['We crossed the river by boat.', '우리는 배로 강을 건넜다.'],
      ['She is crossing the street now.', '그녀는 지금 길을 건너고 있다.'],
    ]},
  ]},
  { w: 'crowded', p: 'adj.', s: [
    { m: '붐비는, 혼잡한', syn: ['busy'], ex: [
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
    { m: '문화', syn: [], ex: [
      ['I want to learn about Korean culture.', '나는 한국 문화에 대해 배우고 싶다.'],
      ['Food is an important part of culture.', '음식은 문화의 중요한 부분이다.'],
      ['We studied the culture of Japan.', '우리는 일본의 문화를 공부했다.'],
    ]},
  ]},
  { w: 'cup', p: 'n.', s: [
    { m: '컵, 잔', syn: [], ex: [
      ['Pour the milk into the cup.', '컵에 우유를 따라라.'],
      ['She broke my favorite cup.', '그녀는 내가 아끼는 컵을 깼다.'],
      ['I drink two cups of tea a day.', '나는 하루에 차를 두 잔 마신다.'],
    ]},
  ]},
  { w: 'curtain', p: 'n.', s: [
    { m: '커튼', syn: [], ex: [
      ['Please close the curtain.', '커튼을 닫아 주세요.'],
      ['The curtain is blue and long.', '커튼은 파랗고 길다.'],
      ['She opened the curtain in the morning.', '그녀는 아침에 커튼을 열었다.'],
    ]},
  ]},
  { w: 'customer', p: 'n.', s: [
    { m: '손님, 고객', syn: ['client'], ex: [
      ['The shop has many customers.', '그 가게에는 손님이 많다.'],
      ['A customer asked for help.', '한 손님이 도움을 청했다.'],
      ['We treat every customer kindly.', '우리는 모든 고객을 친절히 대한다.'],
    ]},
  ]},
  { w: 'cut', p: 'v.', s: [
    { m: '자르다, 베다', syn: [], ex: [
      ['Cut the paper in half.', '종이를 반으로 잘라라.'],
      ['She cut her finger yesterday.', '그녀는 어제 손가락을 베었다.'],
      ['He is cutting the cake.', '그는 케이크를 자르고 있다.'],
    ]},
  ]},
  { w: 'dance', p: 'v.', s: [
    { m: '춤추다', syn: [], ex: [
      ['They danced all night.', '그들은 밤새 춤을 췄다.'],
      ['She dances very well.', '그녀는 춤을 아주 잘 춘다.'],
      ['We are dancing to the music.', '우리는 음악에 맞춰 춤추고 있다.'],
    ]},
  ]},
  { w: 'danger', p: 'n.', s: [
    { m: '위험', syn: ['risk'], ex: [
      ['The sign warns of danger.', '그 표지판은 위험을 알린다.'],
      ['He saved the child from danger.', '그는 아이를 위험에서 구했다.'],
      ['There is no danger here.', '여기에는 위험이 없다.'],
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
  { w: 'date', p: 'n.', s: [
    { m: '날짜', syn: [], ex: [
      ['What is the date today?', '오늘 날짜가 며칠이니?'],
      ['We set a date for the trip.', '우리는 여행 날짜를 정했다.'],
      ['Write the date at the top.', '맨 위에 날짜를 쓰세요.'],
    ]},
  ]},
  { w: 'daughter', p: 'n.', s: [
    { m: '딸', syn: [], ex: [
      ['Their daughter is ten years old.', '그들의 딸은 열 살이다.'],
      ['She has two daughters.', '그녀는 딸이 둘 있다.'],
      ['My daughter loves reading.', '내 딸은 독서를 좋아한다.'],
    ]},
  ]},
  { w: 'day', p: 'n.', s: [
    { m: '하루, 날', syn: [], ex: [
      ['We waited for three days.', '우리는 사흘을 기다렸다.'],
      ['What a beautiful day!', '정말 아름다운 날이구나!'],
      ['She works eight hours a day.', '그녀는 하루에 여덟 시간 일한다.'],
    ]},
  ]},
  { w: 'dead', p: 'adj.', s: [
    { m: '죽은', syn: ['lifeless'], ex: [
      ['The plant is dead.', '그 식물은 죽었다.'],
      ['We found a dead bird.', '우리는 죽은 새를 발견했다.'],
      ['The phone battery is dead.', '휴대폰 배터리가 다 됐다.'],
    ]},
  ]},
  { w: 'death', p: 'n.', s: [
    { m: '죽음', syn: [], ex: [
      ['The death of the old tree was sad.', '그 늙은 나무의 죽음은 슬펐다.'],
      ['He was sick until his death.', '그는 죽을 때까지 아팠다.'],
      ['The book is about life and death.', '그 책은 삶과 죽음에 관한 것이다.'],
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
  { w: 'design', p: 'n.', s: [
    { m: '디자인, 설계', syn: ['plan'], ex: [
      ['The design of this chair is simple.', '이 의자의 디자인은 단순하다.'],
      ['She studies fashion design.', '그녀는 패션 디자인을 공부한다.'],
      ['We changed the design twice.', '우리는 디자인을 두 번 바꿨다.'],
    ]},
  ]},
  { w: 'desk', p: 'n.', s: [
    { m: '책상', syn: [], ex: [
      ['My desk is by the window.', '내 책상은 창가에 있다.'],
      ['Put the book on the desk.', '책을 책상 위에 놓아라.'],
      ['He cleaned his desk yesterday.', '그는 어제 책상을 정리했다.'],
    ]},
  ]},
  { w: 'dialog', p: 'n.', s: [
    { m: '대화', syn: ['conversation'], ex: [
      ['The dialog between them was short.', '그들 사이의 대화는 짧았다.'],
      ['Read the dialog aloud.', '대화를 소리 내어 읽어라.'],
      ['We practiced a dialog in class.', '우리는 수업에서 대화를 연습했다.'],
    ]},
  ]},
  { w: 'dialogue', p: 'n.', s: [
    { m: '대화', syn: ['conversation'], ex: [
      ['The movie has little dialogue.', '그 영화는 대사가 적다.'],
      ['They started a dialogue about the problem.', '그들은 그 문제에 대해 대화를 시작했다.'],
      ['Write a short dialogue with a friend.', '친구와 짧은 대화를 써 봐라.'],
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
    { m: '차이', syn: ['contrast'], ex: [
      ['What is the difference between them?', '그것들의 차이가 무엇이니?'],
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
  { w: 'dinner', p: 'n.', s: [
    { m: '저녁 식사', syn: ['supper'], ex: [
      ['We have dinner at seven.', '우리는 7시에 저녁을 먹는다.'],
      ['She cooked a nice dinner.', '그녀는 맛있는 저녁을 차렸다.'],
      ['Come to dinner tomorrow.', '내일 저녁 먹으러 와.'],
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
  { w: 'do', p: 'v.', s: [
    { m: '하다', syn: [], ex: [
      ['Do your homework first.', '숙제를 먼저 해라.'],
      ['She did her best.', '그녀는 최선을 다했다.'],
      ['What are you doing now?', '지금 뭐 하고 있니?'],
    ]},
  ]},
  { w: 'doctor', p: 'n.', s: [
    { m: '의사', syn: ['physician'], ex: [
      ['The doctor checked my throat.', '의사가 내 목을 살펴보았다.'],
      ['She wants to be a doctor.', '그녀는 의사가 되고 싶어 한다.'],
      ['Call a doctor right away.', '당장 의사를 불러라.'],
    ]},
  ]},
  { w: 'dog', p: 'n.', s: [
    { m: '개', syn: [], ex: [
      ['My dog runs very fast.', '내 개는 아주 빨리 달린다.'],
      ['The dog barked all night.', '개가 밤새 짖었다.'],
      ['She walks her dog every evening.', '그녀는 매일 저녁 개를 산책시킨다.'],
    ]},
  ]},
  { w: 'doll', p: 'n.', s: [
    { m: '인형', syn: [], ex: [
      ['She sleeps with her doll.', '그녀는 인형을 안고 잔다.'],
      ['The doll has long hair.', '그 인형은 머리가 길다.'],
      ['He made a doll out of cloth.', '그는 천으로 인형을 만들었다.'],
    ]},
  ]},
  { w: 'door', p: 'n.', s: [
    { m: '문', syn: [], ex: [
      ['Please close the door.', '문을 닫아 주세요.'],
      ['Someone is at the door.', '누군가 문 앞에 있다.'],
      ['The door opens to the garden.', '그 문은 정원으로 통한다.'],
    ]},
  ]},
  { w: 'double', p: 'adj.', s: [
    { m: '두 배의, 이중의', syn: [], ex: [
      ['This room is double the size.', '이 방은 두 배 크기다.'],
      ['He ordered a double portion.', '그는 2인분을 주문했다.'],
      ['The price is double now.', '가격이 지금 두 배다.'],
    ]},
  ]},
  { w: 'doughnut', p: 'n.', s: [
    { m: '도넛', syn: ['donut'], ex: [
      ['She bought a box of doughnuts.', '그녀는 도넛 한 상자를 샀다.'],
      ['This doughnut is too sweet.', '이 도넛은 너무 달다.'],
      ['He ate a doughnut for breakfast.', '그는 아침으로 도넛을 먹었다.'],
    ]},
  ]},
  { w: 'down', p: 'adv., prep.', s: [
    { m: '아래로', syn: [], ex: [
      ['Sit down, please.', '앉아 주세요.'],
      ['The temperature went down.', '기온이 내려갔다.'],
      ['She walked down the hill.', '그녀는 언덕을 걸어 내려갔다.'],
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
  { w: 'dress', p: 'n.', s: [
    { m: '드레스, 원피스', syn: [], ex: [
      ['She wore a white dress.', '그녀는 흰 드레스를 입었다.'],
      ['This dress is too long.', '이 원피스는 너무 길다.'],
      ['He bought a dress for his sister.', '그는 여동생에게 원피스를 사 주었다.'],
    ]},
  ]},
  { w: 'drink', p: 'v.', s: [
    { m: '마시다', syn: [], ex: [
      ['Drink more water every day.', '매일 물을 더 마셔라.'],
      ['She drank a glass of milk.', '그녀는 우유 한 잔을 마셨다.'],
      ['He is drinking tea now.', '그는 지금 차를 마시고 있다.'],
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
    { m: '떨어뜨리다, 떨어지다', syn: [], ex: [
      ['Do not drop the glass.', '유리잔을 떨어뜨리지 마라.'],
      ['He dropped his pencil on the floor.', '그는 연필을 바닥에 떨어뜨렸다.'],
      ['The temperature is dropping fast.', '기온이 빠르게 떨어지고 있다.'],
    ]},
  ]},
  { w: 'drum', p: 'n.', s: [
    { m: '드럼, 북', syn: [], ex: [
      ['He plays the drum in a band.', '그는 밴드에서 드럼을 친다.'],
      ['The drum sounds very loud.', '드럼 소리가 아주 크다.'],
      ['She learned the drum last year.', '그녀는 작년에 드럼을 배웠다.'],
    ]},
  ]},
  { w: 'dry', p: 'adj., v.', s: [
    { m: '마른, 건조한, 말리다', syn: [], ex: [
      ['The clothes are dry now.', '옷이 이제 말랐다.'],
      ['The air is very dry in winter.', '겨울에는 공기가 매우 건조하다.'],
      ['She dried her hair with a towel.', '그녀는 수건으로 머리를 말렸다.'],
    ]},
  ]},
  { w: 'duck', p: 'n.', s: [
    { m: '오리', syn: [], ex: [
      ['Ducks swim in the pond.', '오리들이 연못에서 헤엄친다.'],
      ['A duck walked across the road.', '오리 한 마리가 길을 건너갔다.'],
      ['We fed bread to the ducks.', '우리는 오리들에게 빵을 주었다.'],
    ]},
  ]},
  { w: 'during', p: 'prep.', s: [
    { m: '~ 동안', syn: ['throughout'], ex: [
      ['I read many books during vacation.', '나는 방학 동안 책을 많이 읽었다.'],
      ['Please be quiet during the class.', '수업 중에는 조용히 해 주세요.'],
      ['It rained during the night.', '밤 동안 비가 내렸다.'],
    ]},
  ]},
  { w: 'ear', p: 'n.', s: [
    { m: '귀', syn: [], ex: [
      ['Rabbits have long ears.', '토끼는 귀가 길다.'],
      ['My ear hurts a little.', '귀가 조금 아프다.'],
      ['She whispered in my ear.', '그녀는 내 귀에 속삭였다.'],
    ]},
  ]},
  { w: 'early', p: 'adj., adv.', s: [
    { m: '이른, 일찍', syn: [], ex: [
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
  { w: 'east', p: 'n.', s: [
    { m: '동쪽', syn: [], ex: [
      ['The sun rises in the east.', '해는 동쪽에서 뜬다.'],
      ['We drove to the east of the city.', '우리는 도시 동쪽으로 차를 몰았다.'],
      ['My window faces east.', '내 창문은 동쪽을 향한다.'],
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
