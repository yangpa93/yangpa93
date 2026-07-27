/**
 * 중학교 2학년 레벨 1 — 수록 57 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_1 = defineLevel('m2-1', [
  { w: 'nervous', p: 'adj.', s: [
    { m: '긴장한, 초조한', syn: ['anxious', 'tense'], ex: [
      ['I was nervous before the test.', '나는 시험 전에 긴장했다.'],
      ['She gets nervous when she speaks in front of people.', '그녀는 사람들 앞에서 말할 때 긴장한다.'],
      ['Try not to be nervous.', '긴장하지 않으려고 해 봐.'],
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
  { w: 'office', p: 'n.', s: [
    { m: '사무실', syn: [], ex: [
      ['My mother works in an office.', '어머니는 사무실에서 일하신다.'],
      ['The teachers office is on the first floor.', '교무실은 1층에 있다.'],
      ['He left the office at six.', '그는 6시에 사무실을 나섰다.'],
    ]},
  ]},
  { w: 'often', p: 'adv.', s: [
    { m: '자주, 종종', syn: ['frequently'], ex: [
      ['We often play badminton.', '우리는 자주 배드민턴을 친다.'],
      ['He is often late for school.', '그는 종종 학교에 늦는다.'],
      ['How often do you exercise?', '너는 얼마나 자주 운동하니?'],
    ]},
  ]},
  { w: 'opportunity', p: 'n.', s: [
    { m: '기회', syn: ['chance'], ex: [
      ["Don't miss this opportunity.", '이 기회를 놓치지 마라.'],
      ['Studying abroad is a great opportunity.', '해외 유학은 좋은 기회이다.'],
      ['She had the opportunity to meet the author.', '그녀는 그 작가를 만날 기회가 있었다.'],
    ]},
  ]},
  { w: 'outside', p: 'adv., prep.', s: [
    { m: '밖에, 밖으로', syn: [], ex: [
      ['The children are playing outside.', '아이들이 밖에서 놀고 있다.'],
      ['It is cold outside today.', '오늘 밖은 춥다.'],
      ['He waited outside the door.', '그는 문 밖에서 기다렸다.'],
    ]},
  ]},
  { w: 'paint', p: 'v., n.', s: [
    { m: '(그림물감으로) 그리다, 칠하다', syn: ['color'], ex: [
      ['She painted a picture of the sea.', '그녀는 바다 그림을 그렸다.'],
      ['We painted the wall white.', '우리는 벽을 하얗게 칠했다.'],
      ['The paint is still wet.', '페인트가 아직 젖어 있다.'],
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
  { w: 'pay', p: 'v.', s: [
    { m: '지불하다, 내다', syn: ['spend'], ex: [
      ['I will pay for lunch today.', '오늘 점심은 내가 낼게.'],
      ['She paid ten dollars for the book.', '그녀는 그 책에 10달러를 냈다.'],
      ['You should pay attention in class.', '수업에서 주의를 기울여야 한다.'],
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
  { w: 'pollution', p: 'n.', s: [
    { m: '오염', syn: ['contamination'], ex: [
      ['Air pollution is a serious problem.', '대기 오염은 심각한 문제이다.'],
      ['Cars cause a lot of pollution.', '자동차는 많은 오염을 일으킨다.'],
      ['We must reduce water pollution.', '우리는 수질 오염을 줄여야 한다.'],
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
  { w: 'print', p: 'v.', s: [
    { m: '인쇄하다, 출력하다', syn: [], ex: [
      ['Please print this page.', '이 쪽을 출력해 주세요.'],
      ['She printed her report last night.', '그녀는 어젯밤에 보고서를 출력했다.'],
      ['The machine is printing now.', '기계가 지금 인쇄하고 있다.'],
    ]},
  ]},
  { w: 'problem', p: 'n.', s: [
    { m: '문제, 어려움', syn: ['trouble', 'issue'], ex: [
      ["That's not a big problem.", '그건 큰 문제가 아니다.'],
      ['We solved the problem together.', '우리는 함께 그 문제를 해결했다.'],
      ['There is a problem with my computer.', '내 컴퓨터에 문제가 있다.'],
    ]},
  ]},
  { w: 'push', p: 'v.', s: [
    { m: '밀다, 누르다', syn: ['press'], ex: [
      ['Push this button to start.', '시작하려면 이 버튼을 누르세요.'],
      ['They pushed the car together.', '그들은 함께 차를 밀었다.'],
      ['Do not push in line.', '줄에서 밀지 마라.'],
    ]},
  ]},
  { w: 'put off', p: 'phr.', s: [
    { m: '미루다, 연기하다', syn: ['delay', 'postpone'], ex: [
      ["Don't put off your homework.", '숙제를 미루지 마라.'],
      ['They put off the game because of rain.', '그들은 비 때문에 경기를 연기했다.'],
      ['She keeps putting off the decision.', '그녀는 계속 결정을 미루고 있다.'],
    ]},
  ]},
  { w: 'put on', p: 'phr.', s: [
    { m: '~을 입다, 착용하다', syn: ['wear'], ex: [
      ['Put on your coat before going out.', '나가기 전에 코트를 입어라.'],
      ['She put on her shoes quickly.', '그녀는 신발을 빨리 신었다.'],
      ['He is putting on his glasses.', '그는 안경을 쓰고 있다.'],
    ]},
  ]},
  { w: 'quiet', p: 'adj.', s: [
    { m: '조용한', syn: ['silent', 'calm'], ex: [
      ['Please be quiet in the library.', '도서관에서는 조용히 해 주세요.'],
      ['We live on a quiet street.', '우리는 조용한 거리에 산다.'],
      ['He is a quiet boy.', '그는 조용한 소년이다.'],
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
  { w: 'ready', p: 'adj.', s: [
    { m: '준비가 된', syn: ['prepared'], ex: [
      ['Are you ready to go?', '갈 준비 됐니?'],
      ['Dinner is ready.', '저녁이 준비되었다.'],
      ['She was ready for the test.', '그녀는 시험 준비가 되어 있었다.'],
    ]},
  ]},
  { w: 'relationship', p: 'n.', s: [
    { m: '관계, 사이', syn: ['connection', 'bond'], ex: [
      ['They have a good relationship.', '그들은 좋은 관계이다.'],
      ['There is a close relationship between sleep and health.', '수면과 건강 사이에는 밀접한 관계가 있다.'],
      ['A good relationship needs trust.', '좋은 관계에는 신뢰가 필요하다.'],
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
  { w: 'rich', p: 'adj.', s: [
    { m: '부유한, 부자인', syn: ['wealthy'], ex: [
      ['He became rich after many years.', '그는 여러 해 뒤에 부자가 되었다.'],
      ['Rich or poor, everyone needs friends.', '부자든 가난하든 누구나 친구가 필요하다.'],
    ]},
    { m: '풍부한', syn: ['full of'], ex: [
      ['Milk is rich in calcium.', '우유는 칼슘이 풍부하다.'],
      ['This country is rich in culture.', '이 나라는 문화가 풍부하다.'],
    ]},
  ]},
  { w: 'ring', p: 'v., n.', s: [
    { m: '(종·전화가) 울리다', syn: ['sound'], ex: [
      ['The bell rings at nine.', '종이 9시에 울린다.'],
      ['My phone rang during the class.', '수업 중에 내 전화가 울렸다.'],
    ]},
    { m: '반지', syn: [], ex: [
      ['She wears a silver ring.', '그녀는 은반지를 낀다.'],
      ['He gave her a ring as a gift.', '그는 그녀에게 반지를 선물로 주었다.'],
    ]},
  ]},
  { w: 'river', p: 'n.', s: [
    { m: '강', syn: [], ex: [
      ['The river runs through the city.', '그 강은 도시를 가로질러 흐른다.'],
      ['We swam in the river last summer.', '우리는 지난여름에 강에서 수영했다.'],
      ['This river is very clean.', '이 강은 아주 깨끗하다.'],
    ]},
  ]},
  { w: 'road', p: 'n.', s: [
    { m: '길, 도로', syn: ['street'], ex: [
      ['Be careful when you cross the road.', '길을 건널 때 조심해라.'],
      ['This road leads to the beach.', '이 길은 해변으로 이어진다.'],
      ['The road was wet after the rain.', '비가 온 뒤 도로가 젖어 있었다.'],
    ]},
  ]},
  { w: 'rock', p: 'n.', s: [
    { m: '바위, 돌', syn: ['stone'], ex: [
      ['He sat on a large rock.', '그는 큰 바위에 앉았다.'],
      ['The children threw rocks into the water.', '아이들이 물에 돌을 던졌다.'],
      ['A rock fell from the mountain.', '산에서 바위가 떨어졌다.'],
    ]},
  ]},
  { w: 'run', p: 'v.', s: [
    { m: '달리다, 뛰다', syn: ['dash'], ex: [
      ['He runs every morning.', '그는 매일 아침 달린다.'],
      ['She ran to catch the bus.', '그녀는 버스를 타려고 뛰었다.'],
    ]},
    { m: '운영하다', syn: ['manage'], ex: [
      ['My uncle runs a small shop.', '우리 삼촌은 작은 가게를 운영한다.'],
      ['They run a cooking class on Sundays.', '그들은 일요일에 요리 교실을 운영한다.'],
    ]},
  ]},
  { w: 'run away', p: 'phr.', s: [
    { m: '달아나다, 도망치다', syn: ['escape'], ex: [
      ['The dog ran away from the house.', '개가 집에서 달아났다.'],
      ['Do not run away from your problems.', '문제로부터 도망치지 마라.'],
      ['The thief ran away quickly.', '도둑이 빠르게 도망쳤다.'],
    ]},
  ]},
  { w: 'sad', p: 'adj.', s: [
    { m: '슬픈', syn: ['unhappy'], ex: [
      ['The movie made me sad.', '그 영화는 나를 슬프게 했다.'],
      ['She looked sad this morning.', '그녀는 오늘 아침 슬퍼 보였다.'],
      ['It is a sad story.', '그것은 슬픈 이야기다.'],
    ]},
  ]},
  { w: 'safe', p: 'adj.', s: [
    { m: '안전한', syn: ['secure', 'out of danger'], ex: [
      ['This place is safe for children.', '이곳은 아이들에게 안전하다.'],
      ['Is it safe to swim here?', '여기서 수영해도 안전한가요?'],
      ['Everyone came back safe.', '모두 무사히 돌아왔다.'],
    ]},
  ]},
  { w: 'salt', p: 'n.', s: [
    { m: '소금', syn: [], ex: [
      ['Add a little salt to the soup.', '국에 소금을 조금 넣어라.'],
      ['Too much salt is bad for health.', '소금을 너무 많이 먹으면 건강에 나쁘다.'],
      ['Sea water contains salt.', '바닷물에는 소금이 들어 있다.'],
    ]},
  ]},
  { w: 'sand', p: 'n.', s: [
    { m: '모래', syn: [], ex: [
      ['The children played in the sand.', '아이들이 모래에서 놀았다.'],
      ['The sand was hot under my feet.', '모래가 발밑에서 뜨거웠다.'],
      ['We built a castle out of sand.', '우리는 모래로 성을 만들었다.'],
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
  { w: 'science', p: 'n.', s: [
    { m: '과학', syn: [], ex: [
      ['Science is my favorite subject.', '과학은 내가 제일 좋아하는 과목이다.'],
      ['She wants to study science in college.', '그녀는 대학에서 과학을 공부하고 싶어 한다.'],
      ['Science helps us understand nature.', '과학은 우리가 자연을 이해하도록 돕는다.'],
    ]},
  ]},
  { w: 'score', p: 'n., v.', s: [
    { m: '점수, 득점하다', syn: ['point'], ex: [
      ['My score on the test was high.', '내 시험 점수는 높았다.'],
      ['He scored two goals in the game.', '그는 경기에서 두 골을 넣었다.'],
      ['The final score was three to one.', '최종 점수는 3 대 1이었다.'],
    ]},
  ]},
  { w: 'season', p: 'n.', s: [
    { m: '계절, 철', syn: [], ex: [
      ['Spring is my favorite season.', '봄은 내가 제일 좋아하는 계절이다.'],
      ['Korea has four seasons.', '한국에는 사계절이 있다.'],
      ['This fruit is in season now.', '이 과일은 지금이 제철이다.'],
    ]},
  ]},
  { w: 'sell', p: 'v.', s: [
    { m: '팔다', syn: [], ex: [
      ['They sell fresh bread here.', '그들은 여기서 신선한 빵을 판다.'],
      ['He sold his old bicycle.', '그는 낡은 자전거를 팔았다.'],
      ['The shop is selling winter clothes.', '그 가게는 겨울옷을 팔고 있다.'],
    ]},
  ]},
  { w: 'send', p: 'v.', s: [
    { m: '보내다', syn: ['mail'], ex: [
      ['I will send you a message tonight.', '오늘 밤에 메시지를 보낼게.'],
      ['She sent a card to her teacher.', '그녀는 선생님께 카드를 보냈다.'],
      ['He is sending the package now.', '그는 지금 소포를 보내고 있다.'],
    ]},
  ]},
], 'curriculum');
