/**
 * 중학교 1학년 레벨 1 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_1 = defineLevel('m1-1', [
  { w: 'a', p: 'art.', s: [
    { m: '하나의, 한', syn: ['one'], ex: [
      ['I have a dog.', '나는 개 한 마리를 기른다.'],
      ['She bought a new bag.', '그녀는 새 가방을 하나 샀다.'],
      ['A boy is waiting outside.', '한 소년이 밖에서 기다리고 있다.'],
    ]},
  ]},
  { w: 'a few', p: 'phr.', s: [
    { m: '조금, 약간의 (몇 개의)', syn: ['some'], ex: [
      ['I have a few questions.', '나는 질문이 몇 개 있다.'],
      ['A few students were absent today.', '오늘 몇몇 학생이 결석했다.'],
      ['We stayed there for a few days.', '우리는 그곳에 며칠 머물렀다.'],
    ]},
  ]},
  { w: 'a lot of', p: 'phr.', s: [
    { m: '많은', syn: ['many', 'much', 'lots of'], ex: [
      ['There are a lot of books here.', '여기에 책이 많이 있다.'],
      ['She has a lot of homework today.', '그녀는 오늘 숙제가 많다.'],
      ['A lot of people came to the festival.', '많은 사람들이 축제에 왔다.'],
    ]},
  ]},
  { w: 'ability', p: 'n.', s: [
    { m: '능력', syn: ['skill'], ex: [
      ['She has the ability to lead.', '그녀는 이끄는 능력이 있다.'],
      ['Birds have the ability to fly long distances.', '새는 먼 거리를 나는 능력이 있다.'],
      ['Reading improves your thinking ability.', '독서는 사고 능력을 향상시킨다.'],
    ]},
  ]},
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
  { w: 'above', p: 'prep.', s: [
    { m: '~ 위에', syn: ['over'], ex: [
      ['The lamp hangs above the table.', '등이 탁자 위에 걸려 있다.'],
      ['Birds flew above the trees.', '새들이 나무 위로 날아갔다.'],
      ['My room is above the kitchen.', '내 방은 부엌 위에 있다.'],
    ]},
  ]},
  { w: 'across', p: 'prep.', s: [
    { m: '~을 가로질러, 건너서', syn: ['over'], ex: [
      ['We walked across the bridge.', '우리는 다리를 건너 걸었다.'],
      ['The bank is across the street.', '은행은 길 건너에 있다.'],
      ['She swam across the river.', '그녀는 강을 헤엄쳐 건넜다.'],
    ]},
  ]},
  { w: 'act', p: 'v.', s: [
    { m: '행동하다', syn: ['behave'], ex: [
      ['You should act quickly.', '너는 빨리 행동해야 한다.'],
      ['He acted like a grown-up.', '그는 어른처럼 행동했다.'],
    ]},
    { m: '연기하다', syn: ['perform'], ex: [
      ['She acts in a school play.', '그녀는 학교 연극에서 연기한다.'],
      ['He acted the part of a king.', '그는 왕 역을 연기했다.'],
    ]},
  ]},
  { w: 'add', p: 'v.', s: [
    { m: '더하다, 추가하다', syn: ['put in'], ex: [
      ['Please add some sugar to the tea.', '차에 설탕을 조금 넣어 주세요.'],
      ['He added his name to the list.', '그는 명단에 자기 이름을 추가했다.'],
      ['She is adding water to the soup.', '그녀는 국에 물을 더하고 있다.'],
    ]},
  ]},
  { w: 'address', p: 'n.', s: [
    { m: '주소', syn: [], ex: [
      ['Write your address here.', '여기에 주소를 쓰세요.'],
      ['I forgot her email address.', '나는 그녀의 이메일 주소를 잊어버렸다.'],
      ['This address is wrong.', '이 주소는 틀렸다.'],
    ]},
  ]},
  { w: 'adult', p: 'n.', s: [
    { m: '어른, 성인', syn: ['grown-up'], ex: [
      ['Adults pay ten dollars.', '어른은 10달러를 낸다.'],
      ['An adult should help the child.', '어른이 그 아이를 도와야 한다.'],
      ['She became an adult last year.', '그녀는 작년에 성인이 되었다.'],
    ]},
  ]},
  { w: 'aeroplane', p: 'n.', s: [
    { m: '비행기', syn: ['plane'], ex: [
      ['The aeroplane landed safely.', '비행기가 안전하게 착륙했다.'],
      ['We watched an aeroplane in the sky.', '우리는 하늘의 비행기를 보았다.'],
      ['This aeroplane flies to London.', '이 비행기는 런던으로 간다.'],
    ]},
  ]},
  { w: 'afraid', p: 'adj.', s: [
    { m: '두려워하는, 무서워하는', syn: ['scared', 'frightened'], ex: [
      ['The little boy looked afraid.', '어린 소년은 무서워 보였다.'],
      ['Do not be afraid to ask questions.', '질문하기를 두려워하지 마라.'],
      ['I was afraid of the dark as a child.', '나는 어릴 때 어둠을 무서워했다.'],
    ]},
  ]},
  { w: 'after', p: 'prep.', s: [
    { m: '~ 뒤에, ~ 후에', syn: ['following'], ex: [
      ['We play soccer after school.', '우리는 방과 후에 축구를 한다.'],
      ['He came home after dinner.', '그는 저녁 후에 집에 왔다.'],
      ['Wash your hands after work.', '일이 끝나면 손을 씻어라.'],
    ]},
  ]},
  { w: 'afternoon', p: 'n.', s: [
    { m: '오후', syn: [], ex: [
      ['I have a class this afternoon.', '나는 오늘 오후에 수업이 있다.'],
      ['We played soccer in the afternoon.', '우리는 오후에 축구를 했다.'],
      ['The store closes on Sunday afternoon.', '그 가게는 일요일 오후에 문을 닫는다.'],
    ]},
  ]},
  { w: 'again', p: 'adv.', s: [
    { m: '다시, 또', syn: ['once more'], ex: [
      ['Please say it again.', '다시 한 번 말해 주세요.'],
      ['She read the letter again.', '그녀는 편지를 다시 읽었다.'],
      ['Try again tomorrow morning.', '내일 아침에 다시 해 봐라.'],
    ]},
  ]},
  { w: 'against', p: 'prep.', s: [
    { m: '~에 반대하여, ~에 맞서', syn: ['opposed to'], ex: [
      ['We played against a strong team.', '우리는 강한 팀과 맞붙었다.'],
      ['She is against the new rule.', '그녀는 새 규칙에 반대한다.'],
      ['Many people voted against the plan.', '많은 사람이 그 계획에 반대했다.'],
    ]},
  ]},
  { w: 'age', p: 'n.', s: [
    { m: '나이', syn: [], ex: [
      ['What is your age?', '나이가 어떻게 되나요?'],
      ['Children of the same age play together.', '같은 나이의 아이들이 함께 논다.'],
      ['He started school at the age of six.', '그는 여섯 살에 학교에 들어갔다.'],
    ]},
  ]},
  { w: 'ago', p: 'adv.', s: [
    { m: '~ 전에', syn: [], ex: [
      ['I met her two years ago.', '나는 2년 전에 그녀를 만났다.'],
      ['He left a moment ago.', '그는 조금 전에 떠났다.'],
      ['We moved here long ago.', '우리는 오래전에 여기로 이사했다.'],
    ]},
  ]},
  { w: 'agree', p: 'v.', s: [
    { m: '동의하다', syn: ['accept'], ex: [
      ['I agree with your idea.', '나는 네 생각에 동의한다.'],
      ['Everyone agreed to the new plan.', '모두가 새 계획에 동의했다.'],
      ['My parents did not agree at first.', '부모님은 처음에는 동의하지 않으셨다.'],
    ]},
  ]},
  { w: 'ahead', p: 'adv.', s: [
    { m: '앞으로, 앞에', syn: [], ex: [
      ['The car ahead stopped suddenly.', '앞에 있는 차가 갑자기 멈췄다.'],
      ['The bus stop is just ahead.', '버스 정류장은 바로 앞이다.'],
      ['She looked ahead and smiled.', '그녀는 앞을 보고 미소 지었다.'],
    ]},
  ]},
  { w: 'air', p: 'n.', s: [
    { m: '공기', syn: ['atmosphere'], ex: [
      ['The air is fresh in the morning.', '아침에는 공기가 신선하다.'],
      ['Open the window for fresh air.', '신선한 공기를 위해 창문을 열어라.'],
      ['Plants clean the air.', '식물은 공기를 깨끗하게 한다.'],
    ]},
  ]},
  { w: 'airplane', p: 'n.', s: [
    { m: '비행기', syn: ['plane'], ex: [
      ['The airplane takes off at noon.', '비행기는 정오에 이륙한다.'],
      ['I have never taken an airplane.', '나는 비행기를 타 본 적이 없다.'],
      ['An airplane is faster than a train.', '비행기는 기차보다 빠르다.'],
    ]},
  ]},
  { w: 'album', p: 'n.', s: [
    { m: '앨범, 사진첩', syn: [], ex: [
      ['She showed me her photo album.', '그녀는 나에게 사진첩을 보여 주었다.'],
      ['The band released a new album.', '그 밴드는 새 앨범을 냈다.'],
      ['I keep old pictures in this album.', '나는 이 앨범에 옛 사진을 보관한다.'],
    ]},
  ]},
  { w: 'all', p: 'adj.', s: [
    { m: '모든, 전부의', syn: [], ex: [
      ['All students must come.', '모든 학생이 와야 한다.'],
      ['She ate all the bread.', '그녀는 빵을 전부 먹었다.'],
      ['We waited all day.', '우리는 하루 종일 기다렸다.'],
    ]},
  ]},
  { w: 'almost', p: 'adv.', s: [
    { m: '거의', syn: ['nearly'], ex: [
      ['I almost missed the bus.', '나는 버스를 놓칠 뻔했다.'],
      ['The work is almost done.', '그 일은 거의 끝났다.'],
      ['Almost every student came.', '거의 모든 학생이 왔다.'],
    ]},
  ]},
  { w: 'alone', p: 'adj., adv.', s: [
    { m: '혼자, 홀로', syn: ['by oneself'], ex: [
      ['She lives alone in Seoul.', '그녀는 서울에서 혼자 산다.'],
      ['I do not like eating alone.', '나는 혼자 먹는 것을 좋아하지 않는다.'],
      ['He walked home alone.', '그는 혼자 집으로 걸어갔다.'],
    ]},
  ]},
  { w: 'along', p: 'prep.', s: [
    { m: '~을 따라', syn: [], ex: [
      ['We walked along the river.', '우리는 강을 따라 걸었다.'],
      ['Trees grow along the road.', '나무들이 길을 따라 자란다.'],
      ['She ran along the beach.', '그녀는 해변을 따라 달렸다.'],
    ]},
  ]},
  { w: 'already', p: 'adv.', s: [
    { m: '이미, 벌써', syn: [], ex: [
      ['The bus has already left.', '버스는 이미 떠났다.'],
      ['I already finished my homework.', '나는 벌써 숙제를 끝냈다.'],
      ['It is already dark outside.', '밖은 벌써 어둡다.'],
    ]},
  ]},
  { w: 'alright', p: 'adj.', s: [
    { m: '괜찮은', syn: ['okay'], ex: [
      ['Are you alright?', '너 괜찮니?'],
      ['Everything will be alright.', '모든 것이 괜찮아질 거야.'],
      ['The food was alright, not great.', '음식은 괜찮았지만 훌륭하지는 않았다.'],
    ]},
  ]},
  { w: 'also', p: 'adv.', s: [
    { m: '또한, ~도', syn: ['too'], ex: [
      ['She also likes music.', '그녀도 음악을 좋아한다.'],
      ['We also visited the museum.', '우리는 박물관도 방문했다.'],
      ['He can also speak Chinese.', '그는 중국어도 할 수 있다.'],
    ]},
  ]},
  { w: 'always', p: 'adv.', s: [
    { m: '항상, 언제나', syn: ['all the time'], ex: [
      ['He always gets up early.', '그는 항상 일찍 일어난다.'],
      ['She is always kind to me.', '그녀는 나에게 언제나 친절하다.'],
      ['I always take the same bus.', '나는 늘 같은 버스를 탄다.'],
    ]},
  ]},
  { w: 'amazing', p: 'adj.', s: [
    { m: '놀라운, 굉장한', syn: ['incredible', 'wonderful'], ex: [
      ['The view was amazing.', '그 경치는 놀라웠다.'],
      ['She did an amazing job.', '그녀는 굉장한 일을 해냈다.'],
      ['It is amazing how fast he runs.', '그가 얼마나 빨리 달리는지 놀랍다.'],
    ]},
  ]},
  { w: 'and', p: 'conj.', s: [
    { m: '그리고, ~와', syn: [], ex: [
      ['I like apples and pears.', '나는 사과와 배를 좋아한다.'],
      ['She sang and danced.', '그녀는 노래하고 춤췄다.'],
      ['Bring a pen and a notebook.', '펜과 공책을 가져와라.'],
    ]},
  ]},
  { w: 'angry', p: 'adj.', s: [
    { m: '화난', syn: ['mad', 'upset'], ex: [
      ['My father was angry at me.', '아버지는 나에게 화가 나셨다.'],
      ['She looked angry after the game.', '그녀는 경기 후에 화나 보였다.'],
      ['He gets angry very easily.', '그는 아주 쉽게 화를 낸다.'],
    ]},
  ]},
  { w: 'animal', p: 'n.', s: [
    { m: '동물', syn: ['creature'], ex: [
      ['Many animals live in the forest.', '많은 동물이 숲에 산다.'],
      ['My favorite animal is a fox.', '내가 제일 좋아하는 동물은 여우다.'],
      ['We should protect wild animals.', '우리는 야생 동물을 보호해야 한다.'],
    ]},
  ]},
  { w: 'another', p: 'adj.', s: [
    { m: '또 하나의, 다른', syn: ['one more'], ex: [
      ['Give me another chance.', '기회를 한 번 더 주세요.'],
      ['She bought another notebook.', '그녀는 공책을 하나 더 샀다.'],
      ['Let us try another way.', '다른 방법을 시도해 보자.'],
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
  { w: 'any', p: 'adj.', s: [
    { m: '어떤, 조금도', syn: [], ex: [
      ['Do you have any questions?', '질문이 있나요?'],
      ['There is not any milk left.', '남은 우유가 없다.'],
      ['Take any book you like.', '마음에 드는 아무 책이나 가져가라.'],
    ]},
  ]},
  { w: 'apartment', p: 'n.', s: [
    { m: '아파트', syn: ['flat'], ex: [
      ['We live in a small apartment.', '우리는 작은 아파트에 산다.'],
      ['Her apartment is on the fifth floor.', '그녀의 아파트는 5층에 있다.'],
      ['They moved to a new apartment.', '그들은 새 아파트로 이사했다.'],
    ]},
  ]},
  { w: 'apologize', p: 'v.', s: [
    { m: '사과하다', syn: ['say sorry'], ex: [
      ['He apologized for being late.', '그는 늦은 것에 대해 사과했다.'],
      ['You should apologize to your sister.', '너는 여동생에게 사과해야 한다.'],
      ['She apologized and left quietly.', '그녀는 사과하고 조용히 떠났다.'],
    ]},
  ]},
  { w: 'apple', p: 'n.', s: [
    { m: '사과', syn: [], ex: [
      ['I eat an apple every morning.', '나는 매일 아침 사과를 먹는다.'],
      ['This apple tastes sweet.', '이 사과는 달다.'],
      ['She picked apples on the farm.', '그녀는 농장에서 사과를 땄다.'],
    ]},
  ]},
  { w: 'area', p: 'n.', s: [
    { m: '지역, 구역', syn: ['region'], ex: [
      ['This area is very quiet.', '이 지역은 아주 조용하다.'],
      ['Children play in that area.', '아이들이 저 구역에서 논다.'],
      ['The area around the lake is beautiful.', '호수 주변 지역은 아름답다.'],
    ]},
  ]},
  { w: 'arm', p: 'n.', s: [
    { m: '팔', syn: [], ex: [
      ['My arm hurts after the game.', '경기가 끝나고 팔이 아프다.'],
      ['She held the baby in her arms.', '그녀는 아기를 팔에 안았다.'],
      ['Raise your right arm.', '오른팔을 들어라.'],
    ]},
  ]},
  { w: 'around', p: 'prep.', s: [
    { m: '~ 주위에, ~ 둘레에', syn: [], ex: [
      ['We sat around the table.', '우리는 탁자 둘레에 앉았다.'],
      ['The earth moves around the sun.', '지구는 태양 주위를 돈다.'],
      ['She looked around the room.', '그녀는 방 안을 둘러보았다.'],
    ]},
  ]},
  { w: 'arrive', p: 'v.', s: [
    { m: '도착하다', syn: ['get to', 'reach'], ex: [
      ['We arrived at school early.', '우리는 학교에 일찍 도착했다.'],
      ['The train arrives at six.', '기차는 6시에 도착한다.'],
      ['They arrived in Seoul last night.', '그들은 어젯밤 서울에 도착했다.'],
    ]},
  ]},
  { w: 'art', p: 'n.', s: [
    { m: '미술, 예술', syn: ['fine arts'], ex: [
      ['Art is my favorite subject.', '미술은 내가 제일 좋아하는 과목이다.'],
      ['We saw modern art at the museum.', '우리는 박물관에서 현대 미술을 보았다.'],
      ['She studies art in college.', '그녀는 대학에서 미술을 공부한다.'],
    ]},
  ]},
  { w: 'artist', p: 'n.', s: [
    { m: '예술가, 화가', syn: ['painter'], ex: [
      ['My sister wants to be an artist.', '내 여동생은 예술가가 되고 싶어 한다.'],
      ['The artist painted the sea.', '그 예술가는 바다를 그렸다.'],
      ['Many artists live in this town.', '많은 예술가가 이 마을에 산다.'],
    ]},
  ]},
  { w: 'as', p: 'conj., prep.', s: [
    { m: '~처럼, ~로서', syn: [], ex: [
      ['Do as I say.', '내가 말한 대로 해라.'],
      ['He works as a teacher.', '그는 교사로 일한다.'],
      ['She is as tall as her sister.', '그녀는 언니만큼 키가 크다.'],
    ]},
  ]},
  { w: 'as soon as', p: 'phr.', s: [
    { m: '~하자마자', syn: ['immediately after'], ex: [
      ['Call me as soon as you arrive.', '도착하자마자 전화해.'],
      ['As soon as it stopped raining, we went out.', '비가 그치자마자 우리는 나갔다.'],
      ['She left as soon as the class ended.', '그녀는 수업이 끝나자마자 떠났다.'],
    ]},
  ]},
  { w: 'ask', p: 'v.', s: [
    { m: '묻다, 질문하다', syn: ['question'], ex: [
      ['May I ask you something?', '뭐 좀 물어봐도 될까요?'],
      ['She asked me about my family.', '그녀는 내 가족에 대해 물었다.'],
    ]},
    { m: '부탁하다, 요청하다', syn: ['request'], ex: [
      ['He asked me for help.', '그는 나에게 도움을 청했다.'],
      ['I will ask her to come early.', '나는 그녀에게 일찍 오라고 부탁할 것이다.'],
    ]},
  ]},
  { w: 'at', p: 'prep.', s: [
    { m: '~에서, ~에', syn: [], ex: [
      ['We meet at the station.', '우리는 역에서 만난다.'],
      ['The class starts at nine.', '수업은 9시에 시작한다.'],
      ['She is at home now.', '그녀는 지금 집에 있다.'],
    ]},
  ]},
  { w: 'aunt', p: 'n.', s: [
    { m: '이모, 고모, 숙모', syn: [], ex: [
      ['My aunt lives in Busan.', '우리 이모는 부산에 사신다.'],
      ['I visited my aunt last weekend.', '나는 지난 주말에 이모를 찾아뵈었다.'],
      ['Her aunt is a doctor.', '그녀의 고모는 의사다.'],
    ]},
  ]},
  { w: 'autumn', p: 'n.', s: [
    { m: '가을', syn: ['fall'], ex: [
      ['Leaves turn red in autumn.', '가을에는 잎이 붉게 물든다.'],
      ['We go hiking every autumn.', '우리는 매년 가을에 등산을 간다.'],
      ['Autumn is cool and dry.', '가을은 시원하고 건조하다.'],
    ]},
  ]},
  { w: 'away', p: 'adv.', s: [
    { m: '떨어져, 멀리', syn: [], ex: [
      ['The school is two blocks away.', '학교는 두 블록 떨어져 있다.'],
      ['He walked away without a word.', '그는 말없이 걸어가 버렸다.'],
      ['The lake is ten kilometers away.', '그 호수는 10킬로미터 떨어져 있다.'],
    ]},
  ]},
  { w: 'baby', p: 'n.', s: [
    { m: '아기', syn: ['infant'], ex: [
      ['The baby is sleeping now.', '아기가 지금 자고 있다.'],
      ['She held the baby carefully.', '그녀는 아기를 조심스럽게 안았다.'],
      ['Babies cry when they are hungry.', '아기들은 배가 고프면 운다.'],
    ]},
  ]},
  { w: 'back', p: 'n.', s: [
    { m: '등, 뒤', syn: [], ex: [
      ['My back hurts today.', '오늘 등이 아프다.'],
      ['He sat in the back of the bus.', '그는 버스 뒤쪽에 앉았다.'],
      ['Write your name on the back.', '뒷면에 이름을 쓰세요.'],
    ]},
  ]},
  { w: 'bad', p: 'adj.', s: [
    { m: '나쁜', syn: ['poor'], ex: [
      ['Smoking is bad for health.', '흡연은 건강에 나쁘다.'],
      ['The weather was bad yesterday.', '어제 날씨가 나빴다.'],
      ['He got a bad score on the test.', '그는 시험에서 나쁜 점수를 받았다.'],
    ]},
  ]},
  { w: 'badminton', p: 'n.', s: [
    { m: '배드민턴', syn: [], ex: [
      ['We play badminton after school.', '우리는 방과 후에 배드민턴을 친다.'],
      ['She is good at badminton.', '그녀는 배드민턴을 잘한다.'],
      ['The badminton court is over there.', '배드민턴 경기장은 저쪽에 있다.'],
    ]},
  ]},
  { w: 'bag', p: 'n.', s: [
    { m: '가방, 봉지', syn: ['sack'], ex: [
      ['My bag is very heavy.', '내 가방은 아주 무겁다.'],
      ['She put the book in her bag.', '그녀는 책을 가방에 넣었다.'],
      ['Bring a paper bag for the fruit.', '과일 담을 종이봉투를 가져와라.'],
    ]},
  ]},
  { w: 'bake', p: 'v.', s: [
    { m: '굽다', syn: [], ex: [
      ['Let us bake a cake for her.', '그녀를 위해 케이크를 굽자.'],
      ['My mother baked bread this morning.', '어머니는 오늘 아침에 빵을 구우셨다.'],
      ['She is baking cookies now.', '그녀는 지금 쿠키를 굽고 있다.'],
    ]},
  ]},
  { w: 'ball', p: 'n.', s: [
    { m: '공', syn: [], ex: [
      ['He threw the ball to me.', '그는 나에게 공을 던졌다.'],
      ['The ball rolled under the desk.', '공이 책상 밑으로 굴러갔다.'],
      ['We need a new ball for the game.', '경기를 하려면 새 공이 필요하다.'],
    ]},
  ]},
  { w: 'banana', p: 'n.', s: [
    { m: '바나나', syn: [], ex: [
      ['Monkeys love bananas.', '원숭이는 바나나를 아주 좋아한다.'],
      ['I ate a banana for breakfast.', '나는 아침으로 바나나를 먹었다.'],
      ['This banana is not ripe yet.', '이 바나나는 아직 익지 않았다.'],
    ]},
  ]},
  { w: 'bank', p: 'n.', s: [
    { m: '은행', syn: [], ex: [
      ['She works at a bank.', '그녀는 은행에서 일한다.'],
      ['The bank closes at four.', '은행은 4시에 문을 닫는다.'],
    ]},
    { m: '둑, 강가', syn: ['shore'], ex: [
      ['We sat on the bank of the river.', '우리는 강둑에 앉았다.'],
      ['Flowers grow along the bank.', '둑을 따라 꽃이 자란다.'],
    ]},
  ]},
  { w: 'base', p: 'n.', s: [
    { m: '기초, 바탕', syn: ['foundation'], ex: [
      ['Rice is the base of many dishes.', '쌀은 많은 요리의 바탕이다.'],
      ['The base of the tower is very wide.', '탑의 기초는 아주 넓다.'],
      ['A strong base makes a strong building.', '튼튼한 기초가 튼튼한 건물을 만든다.'],
    ]},
  ]},
  { w: 'baseball', p: 'n.', s: [
    { m: '야구', syn: [], ex: [
      ['We played baseball in the park.', '우리는 공원에서 야구를 했다.'],
      ['Baseball is popular in Korea.', '야구는 한국에서 인기가 있다.'],
      ['He wants to be a baseball player.', '그는 야구 선수가 되고 싶어 한다.'],
    ]},
  ]},
  { w: 'basket', p: 'n.', s: [
    { m: '바구니', syn: [], ex: [
      ['She filled the basket with apples.', '그녀는 바구니를 사과로 채웠다.'],
      ['Put the fruit in this basket.', '과일을 이 바구니에 넣어라.'],
      ['The basket is made of wood.', '그 바구니는 나무로 만들어졌다.'],
    ]},
  ]},
  { w: 'basketball', p: 'n.', s: [
    { m: '농구', syn: [], ex: [
      ['They play basketball every Friday.', '그들은 금요일마다 농구를 한다.'],
      ['Basketball players are usually tall.', '농구 선수는 보통 키가 크다.'],
      ['He joined the basketball team.', '그는 농구팀에 들어갔다.'],
    ]},
  ]},
  { w: 'bat', p: 'n.', s: [
    { m: '방망이, 배트', syn: [], ex: [
      ['He hit the ball with a bat.', '그는 방망이로 공을 쳤다.'],
      ['The bat is made of wood.', '그 방망이는 나무로 만들어졌다.'],
    ]},
    { m: '박쥐', syn: [], ex: [
      ['Bats sleep during the day.', '박쥐는 낮에 잔다.'],
      ['A bat flew out of the cave.', '박쥐 한 마리가 동굴에서 날아 나왔다.'],
    ]},
  ]},
  { w: 'bath', p: 'n.', s: [
    { m: '목욕', syn: [], ex: [
      ['I take a bath every evening.', '나는 매일 저녁 목욕을 한다.'],
      ['The baby enjoys a warm bath.', '아기는 따뜻한 목욕을 좋아한다.'],
      ['She had a bath before bed.', '그녀는 자기 전에 목욕을 했다.'],
    ]},
  ]},
  { w: 'be', p: 'v.', s: [
    { m: '~이다, ~에 있다', syn: [], ex: [
      ['I want to be a doctor.', '나는 의사가 되고 싶다.'],
      ['She is my best friend.', '그녀는 내 가장 친한 친구다.'],
      ['The keys were on the table.', '열쇠는 탁자 위에 있었다.'],
    ]},
  ]},
  { w: 'be able to', p: 'phr.', s: [
    { m: '~할 수 있다', syn: ['can', 'be capable of'], ex: [
      ['She is able to swim well.', '그녀는 수영을 잘할 수 있다.'],
      ['I was not able to come yesterday.', '나는 어제 올 수 없었다.'],
      ['Will you be able to help me?', '나를 도와줄 수 있겠니?'],
    ]},
  ]},
  { w: 'be afraid of', p: 'phr.', s: [
    { m: '~을 두려워하다', syn: ['be scared of'], ex: [
      ['I am afraid of high places.', '나는 높은 곳을 무서워한다.'],
      ['She is afraid of dogs.', '그녀는 개를 무서워한다.'],
      ['Do not be afraid of making mistakes.', '실수하는 것을 두려워하지 마라.'],
    ]},
  ]},
  { w: 'be full of', p: 'phr.', s: [
    { m: '~로 가득 차다', syn: ['be filled with'], ex: [
      ['The box is full of toys.', '그 상자는 장난감으로 가득 차 있다.'],
      ['His room is full of books.', '그의 방은 책으로 가득하다.'],
      ['The street was full of people.', '거리는 사람들로 가득했다.'],
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
    { m: '~에 관심이 있다', syn: ['have an interest in'], ex: [
      ['I am interested in science.', '나는 과학에 관심이 있다.'],
      ['She is interested in learning Spanish.', '그녀는 스페인어 배우는 데 관심이 있다.'],
      ['Are you interested in joining our club?', '우리 동아리에 들어올 생각 있니?'],
    ]},
  ]},
  { w: 'beach', p: 'n.', s: [
    { m: '해변, 바닷가', syn: ['shore'], ex: [
      ['We walked along the beach.', '우리는 해변을 따라 걸었다.'],
      ['The beach was very crowded.', '해변은 몹시 붐볐다.'],
      ['They played on the beach all day.', '그들은 하루 종일 바닷가에서 놀았다.'],
    ]},
  ]},
  { w: 'bear', p: 'n.', s: [
    { m: '곰', syn: [], ex: [
      ['Bears sleep through the winter.', '곰은 겨울 내내 잠을 잔다.'],
      ['We saw a bear in the forest.', '우리는 숲에서 곰을 보았다.'],
      ['The bear caught a fish.', '곰이 물고기를 잡았다.'],
    ]},
  ]},
  { w: 'beautiful', p: 'adj.', s: [
    { m: '아름다운', syn: ['lovely', 'pretty'], ex: [
      ['What a beautiful garden!', '정말 아름다운 정원이구나!'],
      ['She has a beautiful voice.', '그녀는 아름다운 목소리를 가졌다.'],
      ['The sunset was beautiful.', '노을이 아름다웠다.'],
    ]},
  ]},
  { w: 'beauty', p: 'n.', s: [
    { m: '아름다움', syn: ['loveliness'], ex: [
      ['The beauty of the lake surprised us.', '호수의 아름다움이 우리를 놀라게 했다.'],
      ['She writes about the beauty of nature.', '그녀는 자연의 아름다움에 대해 글을 쓴다.'],
      ['Beauty is not only in the face.', '아름다움은 얼굴에만 있는 것이 아니다.'],
    ]},
  ]},
  { w: 'because', p: 'conj.', s: [
    { m: '~ 때문에', syn: ['since'], ex: [
      ['We stayed home because it rained.', '비가 와서 우리는 집에 있었다.'],
      ['He was late because of the traffic.', '그는 차가 막혀서 늦었다.'],
      ['She smiled because she was happy.', '그녀는 행복해서 미소 지었다.'],
    ]},
  ]},
  { w: 'become', p: 'v.', s: [
    { m: '~이 되다', syn: [], ex: [
      ['He wants to become a pilot.', '그는 조종사가 되고 싶어 한다.'],
      ['She became a teacher last year.', '그녀는 작년에 교사가 되었다.'],
      ['The weather became cold suddenly.', '날씨가 갑자기 추워졌다.'],
    ]},
  ]},
  { w: 'bed', p: 'n.', s: [
    { m: '침대', syn: [], ex: [
      ['My bed is next to the window.', '내 침대는 창문 옆에 있다.'],
      ['He lay on the bed and read.', '그는 침대에 누워 책을 읽었다.'],
      ['Make your bed before breakfast.', '아침 먹기 전에 이불을 정리해라.'],
    ]},
  ]},
  { w: 'bee', p: 'n.', s: [
    { m: '벌', syn: [], ex: [
      ['Bees make honey from flowers.', '벌은 꽃에서 꿀을 만든다.'],
      ['A bee flew into the room.', '벌 한 마리가 방으로 날아 들어왔다.'],
      ['Do not touch the bee.', '벌을 만지지 마라.'],
    ]},
  ]},
  { w: 'beef', p: 'n.', s: [
    { m: '소고기', syn: [], ex: [
      ['We had beef for dinner.', '우리는 저녁으로 소고기를 먹었다.'],
      ['This beef is very tender.', '이 소고기는 아주 부드럽다.'],
      ['She does not eat beef.', '그녀는 소고기를 먹지 않는다.'],
    ]},
  ]},
  { w: 'before', p: 'prep.', s: [
    { m: '~ 전에', syn: ['prior to'], ex: [
      ['Wash your hands before dinner.', '저녁 먹기 전에 손을 씻어라.'],
      ['He arrived before me.', '그는 나보다 먼저 도착했다.'],
      ['Read the question before you answer.', '답하기 전에 문제를 읽어라.'],
    ]},
  ]},
  { w: 'begin', p: 'v.', s: [
    { m: '시작하다', syn: ['start'], ex: [
      ['The class begins at nine.', '수업은 9시에 시작한다.'],
      ['We began the game without him.', '우리는 그 없이 경기를 시작했다.'],
      ['It is beginning to rain.', '비가 오기 시작하고 있다.'],
    ]},
  ]},
  { w: 'behavior', p: 'n.', s: [
    { m: '행동, 태도', syn: ['conduct'], ex: [
      ['His behavior surprised us.', '그의 행동은 우리를 놀라게 했다.'],
      ['Good behavior is rewarded here.', '이곳에서는 바른 행동에 상을 준다.'],
      ['Scientists study animal behavior.', '과학자들은 동물의 행동을 연구한다.'],
    ]},
  ]},
  { w: 'behind', p: 'prep.', s: [
    { m: '~ 뒤에', syn: ['in back of'], ex: [
      ['The cat is behind the door.', '고양이가 문 뒤에 있다.'],
      ['He sat behind me in class.', '그는 수업에서 내 뒤에 앉았다.'],
      ['There is a park behind our school.', '우리 학교 뒤에 공원이 있다.'],
    ]},
  ]},
  { w: 'believe', p: 'v.', s: [
    { m: '믿다', syn: ['trust'], ex: [
      ['I believe you are right.', '나는 네가 옳다고 믿는다.'],
      ['She believed his story.', '그녀는 그의 이야기를 믿었다.'],
      ['Believe in yourself.', '너 자신을 믿어라.'],
    ]},
  ]},
  { w: 'bell', p: 'n.', s: [
    { m: '종, 벨', syn: ['chime'], ex: [
      ['The bell rings at nine.', '종이 9시에 울린다.'],
      ['She pushed the door bell.', '그녀는 초인종을 눌렀다.'],
      ['We heard a church bell.', '우리는 교회 종소리를 들었다.'],
    ]},
  ]},
  { w: 'below', p: 'prep., adv.', s: [
    { m: '~ 아래에', syn: ['under'], ex: [
      ['The temperature is below zero.', '기온이 영하이다.'],
      ['Write your name below the line.', '선 아래에 이름을 쓰세요.'],
      ['We saw the town below.', '우리는 아래에 있는 마을을 보았다.'],
    ]},
  ]},
  { w: 'belt', p: 'n.', s: [
    { m: '벨트, 허리띠', syn: ['band'], ex: [
      ['Fasten your seat belt.', '안전벨트를 매세요.'],
      ['He bought a leather belt.', '그는 가죽 벨트를 샀다.'],
      ['This belt is too long for me.', '이 벨트는 나에게 너무 길다.'],
    ]},
  ]},
  { w: 'beside', p: 'prep.', s: [
    { m: '~ 옆에', syn: ['next to'], ex: [
      ['She sat beside her mother.', '그녀는 어머니 옆에 앉았다.'],
      ['The bank is beside the post office.', '은행은 우체국 옆에 있다.'],
      ['Put the box beside the table.', '상자를 탁자 옆에 두세요.'],
    ]},
  ]},
  { w: 'between', p: 'prep.', s: [
    { m: '~ 사이에', syn: [], ex: [
      ['The store is between the bank and the park.', '그 가게는 은행과 공원 사이에 있다.'],
      ['There is a big difference between them.', '그들 사이에는 큰 차이가 있다.'],
      ['I sat between my parents.', '나는 부모님 사이에 앉았다.'],
    ]},
  ]},
  { w: 'bicycle', p: 'n.', s: [
    { m: '자전거', syn: ['bike'], ex: [
      ['He rides a bicycle to school.', '그는 자전거를 타고 학교에 간다.'],
      ['My bicycle is broken.', '내 자전거가 고장 났다.'],
      ['She bought a new bicycle.', '그녀는 새 자전거를 샀다.'],
    ]},
  ]},
  { w: 'big', p: 'adj.', s: [
    { m: '큰', syn: ['large'], ex: [
      ['They live in a big house.', '그들은 큰 집에 산다.'],
      ['That is a big problem.', '그것은 큰 문제다.'],
      ['She has a big smile.', '그녀는 활짝 웃는다.'],
    ]},
  ]},
  { w: 'bike', p: 'n.', s: [
    { m: '자전거', syn: ['bicycle'], ex: [
      ['He rides his bike to school.', '그는 자전거를 타고 학교에 간다.'],
      ['My bike has a flat tire.', '내 자전거는 타이어에 바람이 빠졌다.'],
      ['We left our bikes at the gate.', '우리는 자전거를 정문에 두었다.'],
    ]},
  ]},
  { w: 'bill', p: 'n.', s: [
    { m: '계산서, 청구서', syn: ['check'], ex: [
      ['Please bring me the bill.', '계산서를 가져다 주세요.'],
      ['The electricity bill was high.', '전기 요금이 많이 나왔다.'],
      ['He paid the bill in cash.', '그는 계산서를 현금으로 냈다.'],
    ]},
  ]},
  { w: 'bird', p: 'n.', s: [
    { m: '새', syn: [], ex: [
      ['Birds sing in the morning.', '새들은 아침에 노래한다.'],
      ['A bird built a nest in the tree.', '새가 나무에 둥지를 지었다.'],
      ['That bird flies very fast.', '저 새는 아주 빨리 난다.'],
    ]},
  ]},
  { w: 'birth', p: 'n.', s: [
    { m: '출생, 탄생', syn: [], ex: [
      ['The birth of a baby is a happy event.', '아기의 탄생은 기쁜 일이다.'],
      ['What is your date of birth?', '생년월일이 어떻게 되나요?'],
      ['She has lived here since birth.', '그녀는 태어날 때부터 여기 살았다.'],
    ]},
  ]},
  { w: 'birthday', p: 'n.', s: [
    { m: '생일', syn: [], ex: [
      ['Today is my birthday.', '오늘은 내 생일이다.'],
      ['We had a birthday party for her.', '우리는 그녀를 위해 생일 파티를 열었다.'],
      ['What do you want for your birthday?', '생일 선물로 무엇을 원하니?'],
    ]},
  ]},
  { w: 'biscuit', p: 'n.', s: [
    { m: '비스킷, 과자', syn: ['cookie'], ex: [
      ['She ate a biscuit with tea.', '그녀는 차와 함께 비스킷을 먹었다.'],
      ['These biscuits are too sweet.', '이 비스킷은 너무 달다.'],
      ['He bought a box of biscuits.', '그는 비스킷 한 상자를 샀다.'],
    ]},
  ]},
  { w: 'black', p: 'adj.', s: [
    { m: '검은', syn: [], ex: [
      ['She wore a black coat.', '그녀는 검은 코트를 입었다.'],
      ['The sky turned black before the storm.', '폭풍 전에 하늘이 새까매졌다.'],
      ['He has black hair.', '그는 검은 머리를 가졌다.'],
    ]},
  ]},
  { w: 'blood', p: 'n.', s: [
    { m: '피, 혈액', syn: [], ex: [
      ['Blood carries oxygen in the body.', '피는 몸에서 산소를 나른다.'],
      ['There was blood on his knee.', '그의 무릎에 피가 났다.'],
      ['She gave blood at the hospital.', '그녀는 병원에서 헌혈을 했다.'],
    ]},
  ]},
  { w: 'blue', p: 'adj.', s: [
    { m: '파란', syn: [], ex: [
      ['The sky is blue today.', '오늘 하늘이 파랗다.'],
      ['She painted the wall blue.', '그녀는 벽을 파랗게 칠했다.'],
      ['He wore a blue shirt.', '그는 파란 셔츠를 입었다.'],
    ]},
  ]},
  { w: 'board', p: 'n.', s: [
    { m: '칠판, 판', syn: ['blackboard'], ex: [
      ['The teacher wrote on the board.', '선생님이 칠판에 썼다.'],
      ['Look at the board, please.', '칠판을 봐 주세요.'],
      ['He put a photo on the board.', '그는 칠판에 사진을 붙였다.'],
    ]},
  ]},
  { w: 'boat', p: 'n.', s: [
    { m: '배, 보트', syn: [], ex: [
      ['We crossed the lake by boat.', '우리는 배로 호수를 건넜다.'],
      ['The boat is tied to the dock.', '배가 부두에 묶여 있다.'],
      ['Small boats filled the harbor.', '작은 배들이 항구를 채웠다.'],
    ]},
  ]},
  { w: 'body', p: 'n.', s: [
    { m: '몸, 신체', syn: [], ex: [
      ['Exercise keeps the body strong.', '운동은 몸을 튼튼하게 한다.'],
      ['Water makes up most of our body.', '물이 우리 몸의 대부분을 이룬다.'],
      ['He washed his whole body.', '그는 온몸을 씻었다.'],
    ]},
  ]},
  { w: 'bone', p: 'n.', s: [
    { m: '뼈', syn: [], ex: [
      ['Milk makes your bones strong.', '우유는 뼈를 튼튼하게 한다.'],
      ['The dog buried a bone.', '개가 뼈를 묻었다.'],
      ['He broke a bone in his foot.', '그는 발뼈가 부러졌다.'],
    ]},
  ]},
  { w: 'book', p: 'n.', s: [
    { m: '책', syn: [], ex: [
      ['I read a book every week.', '나는 매주 책을 한 권 읽는다.'],
      ['This book is about animals.', '이 책은 동물에 관한 것이다.'],
      ['She borrowed three books.', '그녀는 책 세 권을 빌렸다.'],
    ]},
  ]},
  { w: 'bored', p: 'adj.', s: [
    { m: '지루해하는, 심심한', syn: [], ex: [
      ['I am bored with this game.', '나는 이 게임이 지겹다.'],
      ['The children looked bored.', '아이들은 지루해 보였다.'],
      ['He gets bored easily.', '그는 쉽게 지루해한다.'],
    ]},
  ]},
  { w: 'borrow', p: 'v.', s: [
    { m: '빌리다', syn: [], ex: [
      ['Can I borrow your pencil?', '네 연필을 빌려도 될까?'],
      ['I borrowed two books from the library.', '나는 도서관에서 책 두 권을 빌렸다.'],
      ['He borrowed money from his brother.', '그는 형에게서 돈을 빌렸다.'],
    ]},
  ]},
  { w: 'both', p: 'adj.', s: [
    { m: '둘 다의', syn: [], ex: [
      ['Both children are studying.', '두 아이 모두 공부하고 있다.'],
      ['I like both colors.', '나는 두 색깔 다 좋아한다.'],
      ['Both of my parents are teachers.', '우리 부모님은 두 분 다 교사다.'],
    ]},
  ]},
  { w: 'bottle', p: 'n.', s: [
    { m: '병', syn: [], ex: [
      ['Please pass me the bottle.', '그 병 좀 건네 주세요.'],
      ['She drank a bottle of water.', '그녀는 물 한 병을 마셨다.'],
      ['Put the empty bottles here.', '빈 병들을 여기에 두세요.'],
    ]},
  ]},
  { w: 'bottom', p: 'n.', s: [
    { m: '바닥, 맨 아래', syn: ['base'], ex: [
      ['The coin sank to the bottom.', '동전이 바닥으로 가라앉았다.'],
      ['Write your name at the bottom.', '맨 아래에 이름을 쓰세요.'],
      ['The bottom of the box is wet.', '상자 바닥이 젖어 있다.'],
    ]},
  ]},
  { w: 'box', p: 'n.', s: [
    { m: '상자', syn: [], ex: [
      ['Put the toys in this box.', '장난감을 이 상자에 넣어라.'],
      ['The box is too heavy to lift.', '그 상자는 들기에 너무 무겁다.'],
      ['She opened the box slowly.', '그녀는 상자를 천천히 열었다.'],
    ]},
  ]},
  { w: 'boy', p: 'n.', s: [
    { m: '소년, 남자아이', syn: [], ex: [
      ['The boy is playing outside.', '남자아이가 밖에서 놀고 있다.'],
      ['Two boys ran to the gate.', '두 소년이 정문으로 달려갔다.'],
      ['That boy is my brother.', '저 소년은 내 남동생이다.'],
    ]},
  ]},
  { w: 'brave', p: 'adj.', s: [
    { m: '용감한', syn: ['courageous', 'bold'], ex: [
      ['The brave boy saved a puppy.', '그 용감한 소년이 강아지를 구했다.'],
      ['It was brave of her to speak up.', '그녀가 목소리를 낸 것은 용감했다.'],
      ['Be brave and try again.', '용감하게 다시 시도해라.'],
    ]},
  ]},
  { w: 'bread', p: 'n.', s: [
    { m: '빵', syn: [], ex: [
      ['She bakes bread every morning.', '그녀는 매일 아침 빵을 굽는다.'],
      ['I ate bread and milk.', '나는 빵과 우유를 먹었다.'],
      ['This bread is still warm.', '이 빵은 아직 따뜻하다.'],
    ]},
  ]},
  { w: 'break', p: 'v., n.', s: [
    { m: '깨뜨리다, 부수다', syn: [], ex: [
      ['Do not break the window.', '창문을 깨지 마라.'],
      ['He broke his arm last week.', '그는 지난주에 팔이 부러졌다.'],
    ]},
    { m: '쉬는 시간, 휴식', syn: ['rest'], ex: [
      ['Let us take a short break.', '잠깐 쉬자.'],
      ['We talked during the break.', '우리는 쉬는 시간에 이야기했다.'],
    ]},
  ]},
  { w: 'breakfast', p: 'n.', s: [
    { m: '아침 식사', syn: [], ex: [
      ['I eat breakfast at seven.', '나는 7시에 아침을 먹는다.'],
      ['She made breakfast for her family.', '그녀는 가족을 위해 아침을 차렸다.'],
      ['Do not skip breakfast.', '아침을 거르지 마라.'],
    ]},
  ]},
  { w: 'bridge', p: 'n.', s: [
    { m: '다리, 교량', syn: [], ex: [
      ['We crossed the bridge slowly.', '우리는 다리를 천천히 건넜다.'],
      ['The bridge is very long.', '그 다리는 아주 길다.'],
      ['They built a new bridge here.', '그들은 여기에 새 다리를 놓았다.'],
    ]},
  ]},
  { w: 'bright', p: 'adj.', s: [
    { m: '밝은, 빛나는', syn: [], ex: [
      ['The room is very bright.', '그 방은 아주 밝다.'],
      ['The stars were bright last night.', '어젯밤 별들이 밝았다.'],
    ]},
    { m: '똑똑한, 영리한', syn: ['clever'], ex: [
      ['She is a bright student.', '그녀는 똑똑한 학생이다.'],
      ['That is a bright idea.', '그것은 기발한 생각이다.'],
    ]},
  ]},
  { w: 'bring', p: 'v.', s: [
    { m: '가져오다, 데려오다', syn: ['take along'], ex: [
      ['Bring your book tomorrow.', '내일 책을 가져와라.'],
      ['She brought her little sister.', '그녀는 여동생을 데려왔다.'],
      ['Can you bring me some water?', '물 좀 가져다줄 수 있니?'],
    ]},
  ]},
  { w: 'brother', p: 'n.', s: [
    { m: '형, 오빠, 남동생', syn: [], ex: [
      ['My brother is two years older.', '내 형은 두 살 많다.'],
      ['She has three brothers.', '그녀는 남자 형제가 셋이다.'],
      ['His brother plays the guitar.', '그의 동생은 기타를 친다.'],
    ]},
  ]},
  { w: 'brown', p: 'adj.', s: [
    { m: '갈색의', syn: [], ex: [
      ['She has brown eyes.', '그녀는 갈색 눈을 가졌다.'],
      ['The leaves turned brown.', '잎이 갈색으로 변했다.'],
      ['He wore brown shoes.', '그는 갈색 신발을 신었다.'],
    ]},
  ]},
  { w: 'brush', p: 'v.', s: [
    { m: '(솔로) 닦다, 빗질하다', syn: [], ex: [
      ['Brush your teeth before bed.', '자기 전에 이를 닦아라.'],
      ['She brushed her hair quickly.', '그녀는 머리를 빠르게 빗었다.'],
      ['He is brushing his shoes.', '그는 신발을 솔질하고 있다.'],
    ]},
  ]},
  { w: 'build', p: 'v.', s: [
    { m: '짓다, 세우다', syn: ['construct', 'put up'], ex: [
      ['They will build a new library.', '그들은 새 도서관을 지을 것이다.'],
      ['The bridge was built in 1998.', '그 다리는 1998년에 지어졌다.'],
      ['We built a snowman together.', '우리는 함께 눈사람을 만들었다.'],
    ]},
  ]},
  { w: 'burn', p: 'v.', s: [
    { m: '타다, 태우다', syn: [], ex: [
      ['Paper burns quickly.', '종이는 빨리 탄다.'],
      ['The candle burned all night.', '초가 밤새 탔다.'],
      ['Be careful not to burn the bread.', '빵을 태우지 않도록 조심해라.'],
    ]},
  ]},
  { w: 'bus', p: 'n.', s: [
    { m: '버스', syn: [], ex: [
      ['I take the bus to school.', '나는 버스를 타고 학교에 간다.'],
      ['The bus stops in front of the bank.', '버스는 은행 앞에 선다.'],
      ['We waited for the bus in the rain.', '우리는 빗속에서 버스를 기다렸다.'],
    ]},
  ]},
  { w: 'business', p: 'n.', s: [
    { m: '사업, 일', syn: [], ex: [
      ['He started a small business.', '그는 작은 사업을 시작했다.'],
      ['My father is away on business.', '아버지는 일 때문에 출장 중이다.'],
      ['Business is good this year.', '올해는 사업이 잘된다.'],
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
  { w: 'but', p: 'conj.', s: [
    { m: '그러나, 하지만', syn: ['yet'], ex: [
      ['It is small but useful.', '그것은 작지만 쓸모 있다.'],
      ['I called her, but she did not answer.', '나는 그녀에게 전화했지만 받지 않았다.'],
      ['He is tired but happy.', '그는 피곤하지만 행복하다.'],
    ]},
  ]},
  { w: 'butter', p: 'n.', s: [
    { m: '버터', syn: [], ex: [
      ['She put butter on the bread.', '그녀는 빵에 버터를 발랐다.'],
      ['This cake needs more butter.', '이 케이크는 버터가 더 필요하다.'],
      ['Keep the butter in the fridge.', '버터를 냉장고에 보관해라.'],
    ]},
  ]},
  { w: 'button', p: 'n.', s: [
    { m: '단추, 버튼', syn: [], ex: [
      ['Push this button to start.', '시작하려면 이 버튼을 눌러라.'],
      ['A button fell off my coat.', '내 코트에서 단추가 떨어졌다.'],
      ['She pressed the wrong button.', '그녀는 잘못된 버튼을 눌렀다.'],
    ]},
  ]},
  { w: 'buy', p: 'v.', s: [
    { m: '사다, 구입하다', syn: ['purchase'], ex: [
      ['I want to buy a new bag.', '나는 새 가방을 사고 싶다.'],
      ['She bought some fruit at the market.', '그녀는 시장에서 과일을 좀 샀다.'],
      ['He is buying tickets now.', '그는 지금 표를 사고 있다.'],
    ]},
  ]},
], 'curriculum');
