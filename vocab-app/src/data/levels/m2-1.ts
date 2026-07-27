/**
 * 중학교 2학년 레벨 1 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_1 = defineLevel('m2-1', [
  { w: 'neck', p: 'n.', s: [
    { m: '목', syn: ['throat'], ex: [
      ['My neck hurts this morning.', '오늘 아침 목이 아프다.'],
      ['She wore a scarf around her neck.', '그녀는 목에 스카프를 둘렀다.'],
      ['Giraffes have very long necks.', '기린은 목이 아주 길다.'],
    ]},
  ]},
  { w: 'need', p: 'v.', s: [
    { m: '필요하다', syn: ['require'], ex: [
      ['I need more time.', '나는 시간이 더 필요하다.'],
      ['Plants need water and light.', '식물은 물과 빛이 필요하다.'],
      ['She needed help with her bag.', '그녀는 가방 드는 것을 도와줄 사람이 필요했다.'],
    ]},
  ]},
  { w: 'nervous', p: 'adj.', s: [
    { m: '긴장한, 초조한', syn: ['anxious', 'tense'], ex: [
      ['I was nervous before the test.', '나는 시험 전에 긴장했다.'],
      ['She gets nervous when she speaks in front of people.', '그녀는 사람들 앞에서 말할 때 긴장한다.'],
      ['Try not to be nervous.', '긴장하지 않으려고 해 봐.'],
    ]},
  ]},
  { w: 'never', p: 'adv.', s: [
    { m: '결코 ~ 않다', syn: ['not ever'], ex: [
      ['I never eat breakfast.', '나는 결코 아침을 먹지 않는다.'],
      ['She never tells a lie.', '그녀는 절대 거짓말하지 않는다.'],
      ['He has never been abroad.', '그는 외국에 가 본 적이 없다.'],
    ]},
  ]},
  { w: 'new', p: 'adj.', s: [
    { m: '새로운', syn: ['fresh'], ex: [
      ['She bought a new bag.', '그녀는 새 가방을 샀다.'],
      ['We have a new teacher.', '우리에게 새 선생님이 오셨다.'],
      ['This is a new way to learn.', '이것은 새로운 학습 방법이다.'],
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
  { w: 'next', p: 'adj.', s: [
    { m: '다음의', syn: ['following'], ex: [
      ['See you next week.', '다음 주에 보자.'],
      ['The next bus comes at six.', '다음 버스는 6시에 온다.'],
      ['Who is next in line?', '줄에서 다음은 누구니?'],
    ]},
  ]},
  { w: 'nice', p: 'adj.', s: [
    { m: '좋은, 친절한', syn: ['kind'], ex: [
      ['She is a nice person.', '그녀는 좋은 사람이다.'],
      ['We had a nice time together.', '우리는 함께 좋은 시간을 보냈다.'],
      ['That is a nice hat.', '그거 멋진 모자다.'],
    ]},
  ]},
  { w: 'night', p: 'n.', s: [
    { m: '밤', syn: ['nighttime'], ex: [
      ['The stars shine at night.', '별은 밤에 빛난다.'],
      ['He worked late into the night.', '그는 밤늦게까지 일했다.'],
      ['It was a cold night.', '추운 밤이었다.'],
    ]},
  ]},
  { w: 'nine', p: 'num.', s: [
    { m: '아홉, 9', syn: ['9'], ex: [
      ['The class begins at nine.', '수업은 9시에 시작한다.'],
      ['She has nine cousins.', '그녀는 사촌이 아홉 명이다.'],
      ['Nine students joined the club.', '학생 아홉 명이 동아리에 들어왔다.'],
    ]},
  ]},
  { w: 'no', p: 'adv.', s: [
    { m: '아니오, 아니', syn: ['not'], ex: [
      ['No, I do not agree.', '아니요, 저는 동의하지 않습니다.'],
      ['There is no milk left.', '남은 우유가 없다.'],
      ['She said no to the offer.', '그녀는 그 제안을 거절했다.'],
    ]},
  ]},
  { w: 'nope', p: 'adv.', s: [
    { m: '아니 (구어)', syn: ['no'], ex: [
      ['Nope, I have not seen him.', '아니, 그를 못 봤어.'],
      ['She just answered nope.', '그녀는 그냥 아니라고 답했다.'],
      ['Nope, that is not mine.', '아니, 그건 내 것이 아니야.'],
    ]},
  ]},
  { w: 'north', p: 'n., adj.', s: [
    { m: '북쪽', syn: [], ex: [
      ['The wind is blowing from the north.', '바람이 북쪽에서 불고 있다.'],
      ['They traveled to the north of the country.', '그들은 그 나라의 북쪽으로 여행했다.'],
      ['My room faces north.', '내 방은 북쪽을 향해 있다.'],
    ]},
  ]},
  { w: 'nose', p: 'n.', s: [
    { m: '코', syn: ['snout'], ex: [
      ['The elephant has a long nose.', '코끼리는 코가 길다.'],
      ['My nose is running today.', '오늘 콧물이 난다.'],
      ['She touched her nose.', '그녀는 코를 만졌다.'],
    ]},
  ]},
  { w: 'not', p: 'adv.', s: [
    { m: '~ 아니다', syn: ['no'], ex: [
      ['She is not at home.', '그녀는 집에 없다.'],
      ['Do not open the window.', '창문을 열지 마라.'],
      ['I am not hungry now.', '나는 지금 배고프지 않다.'],
    ]},
  ]},
  { w: 'note', p: 'n., v.', s: [
    { m: '메모, 쪽지, 적다', syn: ['memo'], ex: [
      ['She left a note on the desk.', '그녀는 책상 위에 쪽지를 남겼다.'],
      ['Take notes during the class.', '수업 중에 필기해라.'],
      ['He noted the time carefully.', '그는 시간을 조심스럽게 적었다.'],
    ]},
  ]},
  { w: 'notebook', p: 'n.', s: [
    { m: '공책, 노트', syn: ['writing book'], ex: [
      ['Write it in your notebook.', '공책에 그것을 써라.'],
      ['My notebook is full.', '내 공책이 다 찼다.'],
      ['She bought three notebooks.', '그녀는 공책 세 권을 샀다.'],
    ]},
  ]},
  { w: 'nothing', p: 'pron.', s: [
    { m: '아무것도 ~ 아니다', syn: ['not anything'], ex: [
      ['There is nothing in the box.', '상자에 아무것도 없다.'],
      ['He said nothing at all.', '그는 아무 말도 하지 않았다.'],
      ['Nothing is impossible.', '불가능한 것은 없다.'],
    ]},
  ]},
  { w: 'now', p: 'adv.', s: [
    { m: '지금', syn: ['at present'], ex: [
      ['She is sleeping now.', '그녀는 지금 자고 있다.'],
      ['We must leave now.', '우리는 지금 떠나야 한다.'],
      ['Now is a good time to start.', '지금이 시작하기 좋은 때다.'],
    ]},
  ]},
  { w: 'number', p: 'n.', s: [
    { m: '숫자, 번호', syn: ['figure'], ex: [
      ['Write the number on the board.', '칠판에 숫자를 써라.'],
      ['What is your phone number?', '전화번호가 어떻게 되나요?'],
      ['The number of students grew.', '학생 수가 늘었다.'],
    ]},
  ]},
  { w: 'nurse', p: 'n.', s: [
    { m: '간호사', syn: [], ex: [
      ['The nurse gave me some medicine.', '간호사가 나에게 약을 주었다.'],
      ['She works as a nurse at the hospital.', '그녀는 병원에서 간호사로 일한다.'],
      ['Nurses take care of sick people.', '간호사는 아픈 사람들을 돌본다.'],
    ]},
  ]},
  { w: 'of', p: 'prep.', s: [
    { m: '~의', syn: ['belonging to'], ex: [
      ['The color of the sky is blue.', '하늘의 색은 파랗다.'],
      ['He is a friend of mine.', '그는 내 친구다.'],
      ['Drink a glass of water.', '물 한 잔을 마셔라.'],
    ]},
  ]},
  { w: 'off', p: 'adv.', s: [
    { m: '떨어져, 꺼진', syn: ['away'], ex: [
      ['Turn off the light.', '불을 꺼라.'],
      ['He took off his hat.', '그는 모자를 벗었다.'],
      ['The button fell off.', '단추가 떨어졌다.'],
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
  { w: 'oil', p: 'n.', s: [
    { m: '기름, 석유', syn: ['fat'], ex: [
      ['Cook the fish in oil.', '기름에 생선을 요리해라.'],
      ['This country sells oil.', '이 나라는 석유를 판다.'],
      ['Add a little oil to the pan.', '팬에 기름을 조금 둘러라.'],
    ]},
  ]},
  { w: 'okay', p: 'adj.', s: [
    { m: '괜찮은', syn: ['fine'], ex: [
      ['Are you okay?', '너 괜찮니?'],
      ['The movie was okay.', '영화는 그런대로 괜찮았다.'],
      ['It is okay to make mistakes.', '실수해도 괜찮다.'],
    ]},
  ]},
  { w: 'okey', p: 'adj.', s: [
    { m: '괜찮은', syn: ['okay'], ex: [
      ['Everything looks okey now.', '이제 다 괜찮아 보인다.'],
      ['She said okey and smiled.', '그녀는 괜찮다고 하며 미소 지었다.'],
      ['Is this seat okey?', '이 자리 괜찮나요?'],
    ]},
  ]},
  { w: 'old', p: 'adj.', s: [
    { m: '늙은, 오래된', syn: ['aged'], ex: [
      ['My grandfather is very old.', '우리 할아버지는 아주 연세가 많으시다.'],
      ['This is an old book.', '이것은 오래된 책이다.'],
      ['How old are you?', '몇 살이니?'],
    ]},
  ]},
  { w: 'on', p: 'prep.', s: [
    { m: '~ 위에', syn: ['upon'], ex: [
      ['The book is on the desk.', '책이 책상 위에 있다.'],
      ['We meet on Monday.', '우리는 월요일에 만난다.'],
      ['Put your hand on your heart.', '손을 가슴에 얹어라.'],
    ]},
  ]},
  { w: 'one', p: 'num.', s: [
    { m: '하나, 1', syn: ['1'], ex: [
      ['I have only one pen.', '나는 펜이 하나뿐이다.'],
      ['One student was absent.', '학생 한 명이 결석했다.'],
      ['Choose one of these books.', '이 책들 중 하나를 골라라.'],
    ]},
  ]},
  { w: 'only', p: 'adv.', s: [
    { m: '오직, 단지', syn: ['just'], ex: [
      ['I have only two dollars.', '나는 2달러밖에 없다.'],
      ['Only she knows the answer.', '그녀만 답을 안다.'],
      ['This is only a test.', '이것은 시험일 뿐이다.'],
    ]},
  ]},
  { w: 'open', p: 'v.', s: [
    { m: '열다', syn: ['unlock'], ex: [
      ['Please open the window.', '창문을 열어 주세요.'],
      ['She opened the box slowly.', '그녀는 상자를 천천히 열었다.'],
      ['The shop opens at nine.', '그 가게는 9시에 문을 연다.'],
    ]},
  ]},
  { w: 'opportunity', p: 'n.', s: [
    { m: '기회', syn: ['chance'], ex: [
      ["Don't miss this opportunity.", '이 기회를 놓치지 마라.'],
      ['Studying abroad is a great opportunity.', '해외 유학은 좋은 기회이다.'],
      ['She had the opportunity to meet the author.', '그녀는 그 작가를 만날 기회가 있었다.'],
    ]},
  ]},
  { w: 'or', p: 'conj.', s: [
    { m: '또는, 혹은', syn: ['either'], ex: [
      ['Tea or coffee?', '차 드릴까요, 커피 드릴까요?'],
      ['Hurry, or you will be late.', '서둘러, 안 그러면 늦을 거야.'],
      ['Choose red or blue.', '빨강이나 파랑을 골라라.'],
    ]},
  ]},
  { w: 'orange', p: 'n.', s: [
    { m: '오렌지, 주황색', syn: ['citrus'], ex: [
      ['I drink orange juice daily.', '나는 매일 오렌지 주스를 마신다.'],
      ['She peeled an orange.', '그녀는 오렌지 껍질을 벗겼다.'],
      ['The wall is painted orange.', '벽이 주황색으로 칠해져 있다.'],
    ]},
  ]},
  { w: 'out', p: 'adv.', s: [
    { m: '밖으로', syn: ['outside'], ex: [
      ['He went out for a walk.', '그는 산책하러 나갔다.'],
      ['Take the books out of the bag.', '가방에서 책을 꺼내라.'],
      ['The fire went out.', '불이 꺼졌다.'],
    ]},
  ]},
  { w: 'outside', p: 'adv., prep.', s: [
    { m: '밖에, 밖으로', syn: [], ex: [
      ['The children are playing outside.', '아이들이 밖에서 놀고 있다.'],
      ['It is cold outside today.', '오늘 밖은 춥다.'],
      ['He waited outside the door.', '그는 문 밖에서 기다렸다.'],
    ]},
  ]},
  { w: 'over', p: 'prep.', s: [
    { m: '~ 위로, ~ 너머', syn: ['above'], ex: [
      ['The plane flew over the city.', '비행기가 도시 위를 날았다.'],
      ['She jumped over the fence.', '그녀는 울타리를 뛰어넘었다.'],
      ['The game is over now.', '경기가 이제 끝났다.'],
    ]},
  ]},
  { w: 'page', p: 'n.', s: [
    { m: '쪽, 페이지', syn: ['leaf'], ex: [
      ['Open your book to page ten.', '책 10쪽을 펴라.'],
      ['This page is missing.', '이 쪽이 빠져 있다.'],
      ['She wrote two pages.', '그녀는 두 쪽을 썼다.'],
    ]},
  ]},
  { w: 'paint', p: 'v., n.', s: [
    { m: '(그림물감으로) 그리다, 칠하다', syn: ['color'], ex: [
      ['She painted a picture of the sea.', '그녀는 바다 그림을 그렸다.'],
      ['We painted the wall white.', '우리는 벽을 하얗게 칠했다.'],
      ['The paint is still wet.', '페인트가 아직 젖어 있다.'],
    ]},
  ]},
  { w: 'pants', p: 'n.', s: [
    { m: '바지', syn: ['trousers'], ex: [
      ['These pants are too long.', '이 바지는 너무 길다.'],
      ['He bought new pants.', '그는 새 바지를 샀다.'],
      ['Wash the pants in cold water.', '바지를 찬물에 빨아라.'],
    ]},
  ]},
  { w: 'paper', p: 'n.', s: [
    { m: '종이', syn: [], ex: [
      ['Write your answer on this paper.', '이 종이에 답을 쓰세요.'],
      ['We should not waste paper.', '우리는 종이를 낭비하면 안 된다.'],
      ['She folded the paper carefully.', '그녀는 종이를 조심스럽게 접었다.'],
    ]},
  ]},
  { w: 'parent', p: 'n.', s: [
    { m: '부모', syn: ['mother or father'], ex: [
      ['My parents are teachers.', '우리 부모님은 교사시다.'],
      ['Every parent loves their child.', '모든 부모는 자기 아이를 사랑한다.'],
      ['She lives with her parents.', '그녀는 부모님과 함께 산다.'],
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
  { w: 'partner', p: 'n.', s: [
    { m: '짝, 동료', syn: ['teammate'], ex: [
      ['Work with your partner.', '짝과 함께 하세요.'],
      ['He is my business partner.', '그는 내 사업 동료다.'],
      ['She chose me as her partner.', '그녀는 나를 짝으로 골랐다.'],
    ]},
  ]},
  { w: 'party', p: 'n.', s: [
    { m: '파티', syn: ['celebration'], ex: [
      ['We had a birthday party.', '우리는 생일 파티를 열었다.'],
      ['The party starts at six.', '파티는 6시에 시작한다.'],
      ['She invited me to her party.', '그녀는 나를 파티에 초대했다.'],
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
  { w: 'pen', p: 'n.', s: [
    { m: '펜', syn: ['writing tool'], ex: [
      ['May I borrow your pen?', '펜 좀 빌릴 수 있을까?'],
      ['This pen does not write.', '이 펜은 안 나온다.'],
      ['She signed with a blue pen.', '그녀는 파란 펜으로 서명했다.'],
    ]},
  ]},
  { w: 'pencil', p: 'n.', s: [
    { m: '연필', syn: ['writing tool'], ex: [
      ['Sharpen your pencil, please.', '연필을 깎아 주세요.'],
      ['He dropped his pencil.', '그는 연필을 떨어뜨렸다.'],
      ['Write it in pencil first.', '먼저 연필로 써라.'],
    ]},
  ]},
  { w: 'people', p: 'n.', s: [
    { m: '사람들', syn: ['persons'], ex: [
      ['Many people came to the festival.', '많은 사람이 축제에 왔다.'],
      ['People need water to live.', '사람은 살기 위해 물이 필요하다.'],
      ['Some people prefer tea.', '어떤 사람들은 차를 더 좋아한다.'],
    ]},
  ]},
  { w: 'phone', p: 'n.', s: [
    { m: '전화, 휴대폰', syn: ['telephone'], ex: [
      ['My phone is out of battery.', '내 휴대폰은 배터리가 없다.'],
      ['She left her phone at home.', '그녀는 휴대폰을 집에 두고 왔다.'],
      ['Answer the phone, please.', '전화를 받아 주세요.'],
    ]},
  ]},
  { w: 'piano', p: 'n.', s: [
    { m: '피아노', syn: ['instrument'], ex: [
      ['She plays the piano well.', '그녀는 피아노를 잘 친다.'],
      ['The piano is very old.', '그 피아노는 아주 낡았다.'],
      ['He learned the piano at five.', '그는 다섯 살에 피아노를 배웠다.'],
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
  { w: 'pig', p: 'n.', s: [
    { m: '돼지', syn: ['hog'], ex: [
      ['Pigs live on the farm.', '돼지는 농장에 산다.'],
      ['The pig is eating.', '돼지가 먹고 있다.'],
      ['We saw three pigs there.', '우리는 거기서 돼지 세 마리를 보았다.'],
    ]},
  ]},
  { w: 'pilot', p: 'n.', s: [
    { m: '조종사', syn: ['aviator'], ex: [
      ['He wants to be a pilot.', '그는 조종사가 되고 싶어 한다.'],
      ['The pilot landed the plane safely.', '조종사가 비행기를 안전하게 착륙시켰다.'],
      ['A pilot needs good eyes.', '조종사는 좋은 시력이 필요하다.'],
    ]},
  ]},
  { w: 'pink', p: 'adj.', s: [
    { m: '분홍색의', syn: ['rose'], ex: [
      ['She wore a pink dress.', '그녀는 분홍 원피스를 입었다.'],
      ['The flowers are pink.', '그 꽃들은 분홍색이다.'],
      ['He painted the wall pink.', '그는 벽을 분홍으로 칠했다.'],
    ]},
  ]},
  { w: 'pizza', p: 'n.', s: [
    { m: '피자', syn: ['dish'], ex: [
      ['We ordered two pizzas.', '우리는 피자 두 판을 주문했다.'],
      ['This pizza is still hot.', '이 피자는 아직 뜨겁다.'],
      ['She made pizza at home.', '그녀는 집에서 피자를 만들었다.'],
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
  { w: 'plastic', p: 'n.', s: [
    { m: '플라스틱', syn: ['synthetic'], ex: [
      ['This chair is made of plastic.', '이 의자는 플라스틱으로 만들어졌다.'],
      ['We should use less plastic.', '우리는 플라스틱을 덜 써야 한다.'],
      ['Plastic bags harm the sea.', '비닐봉지는 바다를 해친다.'],
    ]},
  ]},
  { w: 'play', p: 'v.', s: [
    { m: '놀다, 연주하다', syn: ['have fun'], ex: [
      ['Children play in the park.', '아이들이 공원에서 논다.'],
      ['She plays the violin.', '그녀는 바이올린을 연주한다.'],
      ['They played soccer yesterday.', '그들은 어제 축구를 했다.'],
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
  { w: 'police', p: 'n.', s: [
    { m: '경찰', syn: ['law officers'], ex: [
      ['Call the police right away.', '당장 경찰을 불러라.'],
      ['The police found the lost dog.', '경찰이 잃어버린 개를 찾았다.'],
      ['A police car passed by.', '경찰차가 지나갔다.'],
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
  { w: 'potato', p: 'n.', s: [
    { m: '감자', syn: ['vegetable'], ex: [
      ['We boiled some potatoes.', '우리는 감자를 좀 삶았다.'],
      ['This potato is too small.', '이 감자는 너무 작다.'],
      ['Potatoes grow under the ground.', '감자는 땅속에서 자란다.'],
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
  { w: 'pretty', p: 'adj.', s: [
    { m: '예쁜', syn: ['lovely'], ex: [
      ['She has a pretty smile.', '그녀는 예쁜 미소를 가졌다.'],
      ['That is a pretty flower.', '그거 예쁜 꽃이다.'],
      ['The garden looks pretty in spring.', '정원은 봄에 예뻐 보인다.'],
    ]},
  ]},
  { w: 'prince', p: 'n.', s: [
    { m: '왕자', syn: ['royal son'], ex: [
      ['The prince lived in a castle.', '왕자는 성에 살았다.'],
      ['She read a story about a prince.', '그녀는 왕자 이야기를 읽었다.'],
      ['The prince helped the poor.', '왕자는 가난한 사람들을 도왔다.'],
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
  { w: 'program', p: 'n.', s: [
    { m: '프로그램', syn: ['show'], ex: [
      ['I watched a TV program.', '나는 TV 프로그램을 봤다.'],
      ['The program starts at eight.', '프로그램은 8시에 시작한다.'],
      ['She joined a summer program.', '그녀는 여름 프로그램에 참여했다.'],
    ]},
  ]},
  { w: 'programme', p: 'n.', s: [
    { m: '프로그램 (영국식)', syn: ['program'], ex: [
      ['The programme was very useful.', '그 프로그램은 아주 유용했다.'],
      ['We watched a nature programme.', '우리는 자연 프로그램을 봤다.'],
      ['She wrote the programme for the show.', '그녀는 공연 순서지를 만들었다.'],
    ]},
  ]},
  { w: 'project', p: 'n.', s: [
    { m: '과제, 계획', syn: ['assignment'], ex: [
      ['We finished the science project.', '우리는 과학 과제를 끝냈다.'],
      ['This project takes two weeks.', '이 과제는 2주가 걸린다.'],
      ['She leads a new project.', '그녀는 새 프로젝트를 이끈다.'],
    ]},
  ]},
  { w: 'puppy', p: 'n.', s: [
    { m: '강아지', syn: ['young dog'], ex: [
      ['The puppy is very cute.', '그 강아지는 아주 귀엽다.'],
      ['She got a puppy for her birthday.', '그녀는 생일에 강아지를 얻었다.'],
      ['Puppies sleep a lot.', '강아지는 잠을 많이 잔다.'],
    ]},
  ]},
  { w: 'push', p: 'v.', s: [
    { m: '밀다, 누르다', syn: ['press'], ex: [
      ['Push this button to start.', '시작하려면 이 버튼을 누르세요.'],
      ['They pushed the car together.', '그들은 함께 차를 밀었다.'],
      ['Do not push in line.', '줄에서 밀지 마라.'],
    ]},
  ]},
  { w: 'put', p: 'v.', s: [
    { m: '놓다, 두다', syn: ['place'], ex: [
      ['Put the book on the shelf.', '책을 선반에 놓아라.'],
      ['She put her bag down.', '그녀는 가방을 내려놓았다.'],
      ['He is putting on his shoes.', '그는 신발을 신고 있다.'],
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
  { w: 'queen', p: 'n.', s: [
    { m: '여왕', syn: ['female ruler'], ex: [
      ['The queen visited the school.', '여왕이 학교를 방문했다.'],
      ['She played the queen in the play.', '그녀는 연극에서 여왕 역을 맡았다.'],
      ['A queen ruled the country then.', '그때는 여왕이 나라를 다스렸다.'],
    ]},
  ]},
  { w: 'question', p: 'n.', s: [
    { m: '질문, 문제', syn: ['query'], ex: [
      ['May I ask a question?', '질문해도 될까요?'],
      ['This question is too hard.', '이 문제는 너무 어렵다.'],
      ['She answered every question.', '그녀는 모든 질문에 답했다.'],
    ]},
  ]},
  { w: 'quick', p: 'adj.', s: [
    { m: '빠른', syn: ['fast'], ex: [
      ['She gave a quick answer.', '그녀는 빠르게 답했다.'],
      ['Take a quick look at this.', '이것을 빨리 한번 봐라.'],
      ['He is quick at math.', '그는 수학이 빠르다.'],
    ]},
  ]},
  { w: 'quiet', p: 'adj.', s: [
    { m: '조용한', syn: ['silent', 'calm'], ex: [
      ['Please be quiet in the library.', '도서관에서는 조용히 해 주세요.'],
      ['We live on a quiet street.', '우리는 조용한 거리에 산다.'],
      ['He is a quiet boy.', '그는 조용한 소년이다.'],
    ]},
  ]},
  { w: 'quiz', p: 'n.', s: [
    { m: '퀴즈, 쪽지 시험', syn: ['short test'], ex: [
      ['We had a quiz today.', '우리는 오늘 쪽지 시험을 봤다.'],
      ['The quiz has ten questions.', '그 퀴즈는 열 문제다.'],
      ['She got a perfect quiz score.', '그녀는 퀴즈에서 만점을 받았다.'],
    ]},
  ]},
  { w: 'rabbit', p: 'n.', s: [
    { m: '토끼', syn: ['bunny'], ex: [
      ['Rabbits eat carrots.', '토끼는 당근을 먹는다.'],
      ['A rabbit ran into the bush.', '토끼가 덤불로 뛰어들었다.'],
      ['The rabbit has long ears.', '그 토끼는 귀가 길다.'],
    ]},
  ]},
  { w: 'race', p: 'n.', s: [
    { m: '경주, 달리기 시합', syn: ['competition'], ex: [
      ['He won the race yesterday.', '그는 어제 경주에서 우승했다.'],
      ['The race starts at ten.', '경주는 10시에 시작한다.'],
      ['She ran her first race last year.', '그녀는 작년에 첫 경주를 뛰었다.'],
    ]},
  ]},
  { w: 'radio', p: 'n.', s: [
    { m: '라디오', syn: ['receiver'], ex: [
      ['Turn on the radio, please.', '라디오를 켜 주세요.'],
      ['She listens to the radio in the car.', '그녀는 차에서 라디오를 듣는다.'],
      ['The radio is too loud.', '라디오 소리가 너무 크다.'],
    ]},
  ]},
  { w: 'rain', p: 'n., v.', s: [
    { m: '비, 비가 오다', syn: [], ex: [
      ['The rain stopped in the afternoon.', '비가 오후에 그쳤다.'],
      ['It rained all night.', '밤새 비가 왔다.'],
      ['Take an umbrella; it is raining.', '우산을 가져가, 비가 오고 있어.'],
    ]},
  ]},
  { w: 'read', p: 'v.', s: [
    { m: '읽다', syn: ['peruse'], ex: [
      ['I read a book every night.', '나는 매일 밤 책을 읽는다.'],
      ['She read the letter twice.', '그녀는 편지를 두 번 읽었다.'],
      ['He is reading the newspaper.', '그는 신문을 읽고 있다.'],
    ]},
  ]},
  { w: 'ready', p: 'adj.', s: [
    { m: '준비가 된', syn: ['prepared'], ex: [
      ['Are you ready to go?', '갈 준비 됐니?'],
      ['Dinner is ready.', '저녁이 준비되었다.'],
      ['She was ready for the test.', '그녀는 시험 준비가 되어 있었다.'],
    ]},
  ]},
  { w: 'recreation', p: 'n.', s: [
    { m: '여가, 오락', syn: ['leisure'], ex: [
      ['Sports are good recreation.', '운동은 좋은 여가 활동이다.'],
      ['We need time for recreation.', '우리는 여가 시간이 필요하다.'],
      ['The park is used for recreation.', '그 공원은 여가용으로 쓰인다.'],
    ]},
  ]},
  { w: 'red', p: 'adj.', s: [
    { m: '빨간', syn: ['crimson'], ex: [
      ['She wore a red hat.', '그녀는 빨간 모자를 썼다.'],
      ['The apple is red and sweet.', '그 사과는 빨갛고 달다.'],
      ['His face turned red.', '그의 얼굴이 빨개졌다.'],
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
  { w: 'restroom', p: 'n.', s: [
    { m: '화장실', syn: ['toilet'], ex: [
      ['Where is the restroom?', '화장실이 어디인가요?'],
      ['The restroom is down the hall.', '화장실은 복도 끝에 있다.'],
      ['Please keep the restroom clean.', '화장실을 깨끗이 써 주세요.'],
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
  { w: 'ribbon', p: 'n.', s: [
    { m: '리본', syn: ['band'], ex: [
      ['She tied her hair with a ribbon.', '그녀는 리본으로 머리를 묶었다.'],
      ['The gift has a red ribbon.', '선물에 빨간 리본이 달려 있다.'],
      ['He cut the ribbon at the opening.', '그는 개막식에서 리본을 잘랐다.'],
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
  { w: 'right', p: 'adj.', s: [
    { m: '옳은, 오른쪽의', syn: ['correct'], ex: [
      ['Your answer is right.', '네 답이 맞다.'],
      ['Turn right at the corner.', '모퉁이에서 오른쪽으로 도세요.'],
      ['She writes with her right hand.', '그녀는 오른손으로 글을 쓴다.'],
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
  { w: 'robot', p: 'n.', s: [
    { m: '로봇', syn: ['machine'], ex: [
      ['The robot cleans the floor.', '그 로봇은 바닥을 청소한다.'],
      ['He built a small robot.', '그는 작은 로봇을 만들었다.'],
      ['Robots help people at work.', '로봇은 사람들의 일을 돕는다.'],
    ]},
  ]},
  { w: 'rock', p: 'n.', s: [
    { m: '바위, 돌', syn: ['stone'], ex: [
      ['He sat on a large rock.', '그는 큰 바위에 앉았다.'],
      ['The children threw rocks into the water.', '아이들이 물에 돌을 던졌다.'],
      ['A rock fell from the mountain.', '산에서 바위가 떨어졌다.'],
    ]},
  ]},
  { w: 'room', p: 'n.', s: [
    { m: '방', syn: ['chamber'], ex: [
      ['My room is on the second floor.', '내 방은 2층에 있다.'],
      ['Clean your room, please.', '방을 치워 주세요.'],
      ['The room is bright and warm.', '그 방은 밝고 따뜻하다.'],
    ]},
  ]},
  { w: 'rose', p: 'n.', s: [
    { m: '장미', syn: ['flower'], ex: [
      ['He gave her a red rose.', '그는 그녀에게 빨간 장미를 주었다.'],
      ['Roses smell wonderful.', '장미는 향이 좋다.'],
      ['The rose has sharp thorns.', '장미에는 날카로운 가시가 있다.'],
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
  { w: 'salad', p: 'n.', s: [
    { m: '샐러드', syn: ['dish'], ex: [
      ['She made a fresh salad.', '그녀는 신선한 샐러드를 만들었다.'],
      ['I eat salad for lunch.', '나는 점심으로 샐러드를 먹는다.'],
      ['This salad needs more salt.', '이 샐러드는 소금이 더 필요하다.'],
    ]},
  ]},
  { w: 'sale', p: 'n.', s: [
    { m: '판매, 할인', syn: ['selling'], ex: [
      ['The shop has a big sale.', '그 가게는 큰 할인 행사를 한다.'],
      ['These shoes are on sale.', '이 신발은 할인 중이다.'],
      ['The sale ends on Sunday.', '할인은 일요일에 끝난다.'],
    ]},
  ]},
  { w: 'salt', p: 'n.', s: [
    { m: '소금', syn: [], ex: [
      ['Add a little salt to the soup.', '국에 소금을 조금 넣어라.'],
      ['Too much salt is bad for health.', '소금을 너무 많이 먹으면 건강에 나쁘다.'],
      ['Sea water contains salt.', '바닷물에는 소금이 들어 있다.'],
    ]},
  ]},
  { w: 'same', p: 'adj.', s: [
    { m: '같은', syn: ['identical'], ex: [
      ['We are in the same class.', '우리는 같은 반이다.'],
      ['She wore the same dress.', '그녀는 같은 원피스를 입었다.'],
      ['The answer is the same.', '답이 같다.'],
    ]},
  ]},
  { w: 'sand', p: 'n.', s: [
    { m: '모래', syn: [], ex: [
      ['The children played in the sand.', '아이들이 모래에서 놀았다.'],
      ['The sand was hot under my feet.', '모래가 발밑에서 뜨거웠다.'],
      ['We built a castle out of sand.', '우리는 모래로 성을 만들었다.'],
    ]},
  ]},
  { w: 'sandwich', p: 'n.', s: [
    { m: '샌드위치', syn: ['snack'], ex: [
      ['She made a cheese sandwich.', '그녀는 치즈 샌드위치를 만들었다.'],
      ['I ate a sandwich for lunch.', '나는 점심으로 샌드위치를 먹었다.'],
      ['This sandwich is too big.', '이 샌드위치는 너무 크다.'],
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
  { w: 'say', p: 'v.', s: [
    { m: '말하다', syn: ['tell'], ex: [
      ['Say it again, please.', '다시 말해 주세요.'],
      ['She said nothing.', '그녀는 아무 말도 하지 않았다.'],
      ['He is saying goodbye.', '그는 작별 인사를 하고 있다.'],
    ]},
  ]},
  { w: 'scared', p: 'adj.', s: [
    { m: '겁먹은, 무서워하는', syn: ['afraid', 'frightened'], ex: [
      ['The child looked scared.', '그 아이는 겁먹은 것처럼 보였다.'],
      ['I am scared of high places.', '나는 높은 곳을 무서워한다.'],
      ['She was scared by the loud noise.', '그녀는 큰 소리에 놀랐다.'],
    ]},
  ]},
  { w: 'school', p: 'n.', s: [
    { m: '학교', syn: ['academy'], ex: [
      ['I go to school by bus.', '나는 버스로 학교에 간다.'],
      ['The school has a big playground.', '그 학교에는 큰 운동장이 있다.'],
      ['School starts in March.', '학교는 3월에 시작한다.'],
    ]},
  ]},
  { w: 'science', p: 'n.', s: [
    { m: '과학', syn: [], ex: [
      ['Science is my favorite subject.', '과학은 내가 제일 좋아하는 과목이다.'],
      ['She wants to study science in college.', '그녀는 대학에서 과학을 공부하고 싶어 한다.'],
      ['Science helps us understand nature.', '과학은 우리가 자연을 이해하도록 돕는다.'],
    ]},
  ]},
  { w: 'scissors', p: 'n.', s: [
    { m: '가위', syn: ['shears'], ex: [
      ['Cut the paper with scissors.', '가위로 종이를 잘라라.'],
      ['The scissors are on the desk.', '가위는 책상 위에 있다.'],
      ['Be careful with the scissors.', '가위를 조심해라.'],
    ]},
  ]},
  { w: 'score', p: 'n., v.', s: [
    { m: '점수, 득점하다', syn: ['point'], ex: [
      ['My score on the test was high.', '내 시험 점수는 높았다.'],
      ['He scored two goals in the game.', '그는 경기에서 두 골을 넣었다.'],
      ['The final score was three to one.', '최종 점수는 3 대 1이었다.'],
    ]},
  ]},
  { w: 'sea', p: 'n.', s: [
    { m: '바다', syn: ['ocean'], ex: [
      ['We swam in the sea.', '우리는 바다에서 수영했다.'],
      ['The sea is calm today.', '오늘 바다가 잔잔하다.'],
      ['Many fish live in the sea.', '많은 물고기가 바다에 산다.'],
    ]},
  ]},
  { w: 'season', p: 'n.', s: [
    { m: '계절, 철', syn: [], ex: [
      ['Spring is my favorite season.', '봄은 내가 제일 좋아하는 계절이다.'],
      ['Korea has four seasons.', '한국에는 사계절이 있다.'],
      ['This fruit is in season now.', '이 과일은 지금이 제철이다.'],
    ]},
  ]},
  { w: 'second', p: 'adj.', s: [
    { m: '두 번째의', syn: ['2nd'], ex: [
      ['She won second place.', '그녀는 2등을 했다.'],
      ['This is my second visit.', '이번이 두 번째 방문이다.'],
      ['Read the second sentence.', '두 번째 문장을 읽어라.'],
    ]},
  ]},
  { w: 'see', p: 'v.', s: [
    { m: '보다', syn: ['watch'], ex: [
      ['I can see the mountain.', '나는 산이 보인다.'],
      ['She saw him at the store.', '그녀는 가게에서 그를 봤다.'],
      ['We are seeing a movie tonight.', '우리는 오늘 밤 영화를 본다.'],
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
