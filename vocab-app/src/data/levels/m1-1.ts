/**
 * 중학교 1학년 레벨 1 — 수록 52 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M1_1 = defineLevel('m1-1', [
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
    { m: '능력', syn: ['skill', 'talent'], ex: [
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
  { w: 'add', p: 'v.', s: [
    { m: '더하다, 추가하다', syn: ['put in'], ex: [
      ['Please add some sugar to the tea.', '차에 설탕을 조금 넣어 주세요.'],
      ['He added his name to the list.', '그는 명단에 자기 이름을 추가했다.'],
      ['She is adding water to the soup.', '그녀는 국에 물을 더하고 있다.'],
    ]},
  ]},
  { w: 'address', p: 'n.', s: [
    { m: '주소', syn: ['location'], ex: [
      ['Write your address here.', '여기에 주소를 쓰세요.'],
      ['I forgot her email address.', '나는 그녀의 이메일 주소를 잊어버렸다.'],
      ['This address is wrong.', '이 주소는 틀렸다.'],
    ]},
  ]},
  { w: 'afraid', p: 'adj.', s: [
    { m: '두려워하는, 무서워하는', syn: ['scared', 'frightened'], ex: [
      ['She is afraid of dogs.', '그녀는 개를 무서워한다.'],
      ["Don't be afraid to ask questions.", '질문하기를 두려워하지 마라.'],
      ['I was afraid of the dark as a child.', '나는 어릴 때 어둠을 무서워했다.'],
    ]},
  ]},
  { w: 'afternoon', p: 'n.', s: [
    { m: '오후', syn: [], ex: [
      ['I have a class this afternoon.', '나는 오늘 오후에 수업이 있다.'],
      ['We played soccer in the afternoon.', '우리는 오후에 축구를 했다.'],
      ['The store closes on Sunday afternoon.', '그 가게는 일요일 오후에 문을 닫는다.'],
    ]},
  ]},
  { w: 'agree', p: 'v.', s: [
    { m: '동의하다', syn: ['accept'], ex: [
      ['I agree with your idea.', '나는 네 생각에 동의한다.'],
      ['Everyone agreed to the new plan.', '모두가 새 계획에 동의했다.'],
      ['My parents did not agree at first.', '부모님은 처음에는 동의하지 않으셨다.'],
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
  { w: 'already', p: 'adv.', s: [
    { m: '이미, 벌써', syn: ['by now'], ex: [
      ['The bus has already left.', '버스는 이미 떠났다.'],
      ['I already finished my homework.', '나는 벌써 숙제를 끝냈다.'],
      ['It is already dark outside.', '밖은 벌써 어둡다.'],
    ]},
  ]},
  { w: 'amazing', p: 'adj.', s: [
    { m: '놀라운, 굉장한', syn: ['incredible', 'wonderful'], ex: [
      ['The view was amazing.', '그 경치는 놀라웠다.'],
      ['She did an amazing job.', '그녀는 굉장한 일을 해냈다.'],
      ['It is amazing how fast he runs.', '그가 얼마나 빨리 달리는지 놀랍다.'],
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
  { w: 'apologize', p: 'v.', s: [
    { m: '사과하다', syn: ['say sorry'], ex: [
      ['He apologized for being late.', '그는 늦은 것에 대해 사과했다.'],
      ['You should apologize to your sister.', '너는 여동생에게 사과해야 한다.'],
      ['She apologized and left quietly.', '그녀는 사과하고 조용히 떠났다.'],
    ]},
  ]},
  { w: 'arrive', p: 'v.', s: [
    { m: '도착하다', syn: ['get to', 'reach'], ex: [
      ['We arrived at school early.', '우리는 학교에 일찍 도착했다.'],
      ['The train arrives at six.', '기차는 6시에 도착한다.'],
      ['They arrived in Seoul last night.', '그들은 어젯밤 서울에 도착했다.'],
    ]},
  ]},
  { w: 'artist', p: 'n.', s: [
    { m: '예술가, 화가', syn: ['painter'], ex: [
      ['My sister wants to be an artist.', '내 여동생은 화가가 되고 싶어 한다.'],
      ['The artist painted the sea.', '그 화가는 바다를 그렸다.'],
      ['Many artists live in this town.', '많은 예술가가 이 마을에 산다.'],
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
  { w: 'aunt', p: 'n.', s: [
    { m: '이모, 고모, 숙모', syn: [], ex: [
      ['My aunt lives in Busan.', '우리 이모는 부산에 사신다.'],
      ['I visited my aunt last weekend.', '나는 지난 주말에 이모를 찾아뵈었다.'],
      ['Her aunt is a doctor.', '그녀의 고모는 의사다.'],
    ]},
  ]},
  { w: 'bake', p: 'v.', s: [
    { m: '굽다', syn: ['cook in an oven'], ex: [
      ['Let us bake a cake for her.', '그녀를 위해 케이크를 굽자.'],
      ['My mother baked bread this morning.', '어머니는 오늘 아침에 빵을 구우셨다.'],
      ['She is baking cookies now.', '그녀는 지금 쿠키를 굽고 있다.'],
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
    { m: '~에 관심이 있다', syn: ['care about'], ex: [
      ["I'm interested in science.", '나는 과학에 관심이 있다.'],
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
  { w: 'beautiful', p: 'adj.', s: [
    { m: '아름다운', syn: ['lovely', 'pretty'], ex: [
      ['What a beautiful garden!', '정말 아름다운 정원이구나!'],
      ['She has a beautiful voice.', '그녀는 아름다운 목소리를 가졌다.'],
      ['The sunset was beautiful.', '노을이 아름다웠다.'],
    ]},
  ]},
  { w: 'become', p: 'v.', s: [
    { m: '~이 되다', syn: ['turn into'], ex: [
      ['He wants to become a pilot.', '그는 조종사가 되고 싶어 한다.'],
      ['She became a teacher last year.', '그녀는 작년에 교사가 되었다.'],
      ['The weather became cold suddenly.', '날씨가 갑자기 추워졌다.'],
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
    { m: '행동, 태도', syn: ['conduct', 'manner'], ex: [
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
  { w: 'below', p: 'prep., adv.', s: [
    { m: '~ 아래에', syn: ['under'], ex: [
      ['The temperature is below zero.', '기온이 영하다.'],
      ['Write your name below the line.', '선 아래에 이름을 쓰세요.'],
      ['We saw the town below.', '우리는 아래에 있는 마을을 보았다.'],
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
    { m: '~ 사이에', syn: ['among'], ex: [
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
  { w: 'birthday', p: 'n.', s: [
    { m: '생일', syn: [], ex: [
      ['Today is my birthday.', '오늘은 내 생일이다.'],
      ['We had a birthday party for her.', '우리는 그녀를 위해 생일 파티를 열었다.'],
      ['What do you want for your birthday?', '생일 선물로 무엇을 원하니?'],
    ]},
  ]},
  { w: 'bored', p: 'adj.', s: [
    { m: '지루해하는, 심심한', syn: ['tired of'], ex: [
      ['I am bored with this game.', '나는 이 게임이 지겹다.'],
      ['The children looked bored.', '아이들은 지루해 보였다.'],
      ['He gets bored easily.', '그는 쉽게 지루해한다.'],
    ]},
  ]},
  { w: 'borrow', p: 'v.', s: [
    { m: '빌리다', syn: ['take out'], ex: [
      ['Can I borrow your pencil?', '네 연필을 빌려도 될까?'],
      ['I borrowed two books from the library.', '나는 도서관에서 책 두 권을 빌렸다.'],
      ['He borrowed money from his brother.', '그는 형에게서 돈을 빌렸다.'],
    ]},
  ]},
  { w: 'bottle', p: 'n.', s: [
    { m: '병', syn: [], ex: [
      ['Please pass me the bottle.', '그 병 좀 건네 주세요.'],
      ['She drank a bottle of water.', '그녀는 물 한 병을 마셨다.'],
      ['Put the empty bottles here.', '빈 병들을 여기에 두세요.'],
    ]},
  ]},
  { w: 'brave', p: 'adj.', s: [
    { m: '용감한', syn: ['courageous', 'bold'], ex: [
      ['The brave boy saved a puppy.', '그 용감한 소년이 강아지를 구했다.'],
      ['It was brave of her to speak up.', '그녀가 목소리를 낸 것은 용감했다.'],
      ['Be brave and try again.', '용감하게 다시 시도해라.'],
    ]},
  ]},
  { w: 'break', p: 'v., n.', s: [
    { m: '깨뜨리다, 부수다', syn: ['damage'], ex: [
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
    { m: '밝은, 빛나는', syn: ['shining'], ex: [
      ['The room is very bright.', '그 방은 아주 밝다.'],
      ['The stars were bright last night.', '어젯밤 별들이 밝았다.'],
    ]},
    { m: '똑똑한, 영리한', syn: ['clever'], ex: [
      ['She is a bright student.', '그녀는 똑똑한 학생이다.'],
      ['That is a bright idea.', '그것은 좋은 생각이다.'],
    ]},
  ]},
  { w: 'bring', p: 'v.', s: [
    { m: '가져오다, 데려오다', syn: ['carry', 'take along'], ex: [
      ['Bring your book tomorrow.', '내일 책을 가져와라.'],
      ['She brought her little sister.', '그녀는 여동생을 데려왔다.'],
      ['Can you bring me some water?', '물 좀 가져다줄 수 있니?'],
    ]},
  ]},
  { w: 'brush', p: 'v., n.', s: [
    { m: '(솔로) 닦다, 빗질하다', syn: ['clean with a brush'], ex: [
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
  { w: 'buy', p: 'v.', s: [
    { m: '사다, 구입하다', syn: ['purchase'], ex: [
      ['I want to buy a new bag.', '나는 새 가방을 사고 싶다.'],
      ['She bought some fruit at the market.', '그녀는 시장에서 과일을 좀 샀다.'],
      ['He is buying tickets now.', '그는 지금 표를 사고 있다.'],
    ]},
  ]},
], 'curriculum');
