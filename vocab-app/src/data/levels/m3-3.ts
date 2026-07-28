/**
 * 중학교 3학년 레벨 3 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M3_3 = defineLevel('m3-3', [
  { w: 'fold', p: 'v.', s: [
    { m: '접다', syn: ['bend over'], ex: [
      ['Fold the paper in half.', '종이를 반으로 접어라.'],
      ['She folded the clothes neatly.', '그녀는 옷을 가지런히 갰다.'],
      ['He is folding the map.', '그는 지도를 접고 있다.'],
    ]},
  ]},
  { w: 'folk', p: 'n.', s: [
    { m: '사람들, 민속', syn: ['people'], ex: [
      ['Country folk are friendly.', '시골 사람들은 다정하다.'],
      ['She sings folk songs.', '그녀는 민요를 부른다.'],
      ['Old folk remember the war.', '나이 든 사람들은 전쟁을 기억한다.'],
    ]},
  ]},
  { w: 'follow', p: 'v.', s: [
    { m: '따라가다', syn: ['come after', 'go after'], ex: [
      ['Follow me, please.', '저를 따라오세요.'],
      ['The dog followed him home.', '개가 그를 따라 집까지 왔다.'],
    ]},
    { m: '(규칙을) 따르다, 지키다', syn: ['obey'], ex: [
      ['We must follow the rules.', '우리는 규칙을 지켜야 한다.'],
      ['Follow the directions carefully.', '지시를 주의 깊게 따라라.'],
    ]},
  ]},
  { w: 'force', p: 'n.', s: [
    { m: '힘, 무력', syn: ['power'], ex: [
      ['The force of the wind broke the tree.', '바람의 힘이 나무를 부러뜨렸다.'],
      ['He opened the door by force.', '그는 힘으로 문을 열었다.'],
      ['Use words, not force.', '힘이 아니라 말을 써라.'],
    ]},
  ]},
  { w: 'foreign', p: 'adj.', s: [
    { m: '외국의', syn: [], ex: [
      ['She speaks two foreign languages.', '그녀는 외국어를 두 개 한다.'],
      ['Many foreign students study here.', '많은 외국 학생이 여기서 공부한다.'],
      ['He works for a foreign company.', '그는 외국 회사에서 일한다.'],
    ]},
  ]},
  { w: 'forever', p: 'adv.', s: [
    { m: '영원히', syn: ['eternally'], ex: [
      ['I will remember this forever.', '나는 이것을 영원히 기억할 것이다.'],
      ['Nothing lasts forever.', '영원한 것은 없다.'],
      ['She waited forever for the bus.', '그녀는 버스를 하염없이 기다렸다.'],
    ]},
  ]},
  { w: 'forgive', p: 'v.', s: [
    { m: '용서하다', syn: ['pardon'], ex: [
      ['Please forgive my mistake.', '제 실수를 용서해 주세요.'],
      ['She forgave him at last.', '그녀는 마침내 그를 용서했다.'],
      ['It is hard to forgive sometimes.', '때로는 용서하기 어렵다.'],
    ]},
  ]},
  { w: 'forth', p: 'adv.', s: [
    { m: '앞으로, 밖으로', syn: ['forward'], ex: [
      ['He walked back and forth.', '그는 앞뒤로 오갔다.'],
      ['She brought forth a new idea.', '그녀는 새 생각을 내놓았다.'],
      ['From that day forth, he changed.', '그날부터 그는 달라졌다.'],
    ]},
  ]},
  { w: 'fortunate', p: 'adj.', s: [
    { m: '운이 좋은', syn: ['lucky'], ex: [
      ['We were fortunate to meet her.', '우리는 그녀를 만나서 운이 좋았다.'],
      ['He is fortunate to have such friends.', '그는 그런 친구들이 있어 운이 좋다.'],
      ['A fortunate change saved us.', '운 좋은 변화가 우리를 구했다.'],
    ]},
  ]},
  { w: 'fortune', p: 'n.', s: [
    { m: '운, 재산', syn: ['luck'], ex: [
      ['Good fortune followed her.', '행운이 그녀를 따랐다.'],
      ['He made a fortune in business.', '그는 사업으로 큰돈을 벌었다.'],
      ['Fortune changes quickly.', '운은 빨리 바뀐다.'],
    ]},
  ]},
  { w: 'forward', p: 'adv.', s: [
    { m: '앞으로', syn: ['ahead'], ex: [
      ['Step forward, please.', '앞으로 나와 주세요.'],
      ['The plan moved forward.', '그 계획이 앞으로 나아갔다.'],
      ['She leaned forward to listen.', '그녀는 들으려고 몸을 앞으로 숙였다.'],
    ]},
  ]},
  { w: 'found', p: 'v.', s: [
    { m: '설립하다', syn: ['establish'], ex: [
      ['They founded the school in 1950.', '그들은 1950년에 그 학교를 세웠다.'],
      ['She founded a small company.', '그녀는 작은 회사를 설립했다.'],
      ['The city was founded long ago.', '그 도시는 오래전에 세워졌다.'],
    ]},
  ]},
  { w: 'frame', p: 'n.', s: [
    { m: '틀, 액자', syn: ['border'], ex: [
      ['The photo is in a wooden frame.', '사진이 나무 액자에 들어 있다.'],
      ['The frame of the bike is light.', '그 자전거의 프레임은 가볍다.'],
      ['She fixed the broken frame.', '그녀는 부서진 틀을 고쳤다.'],
    ]},
  ]},
  { w: 'frankly', p: 'adv.', s: [
    { m: '솔직히', syn: ['honestly'], ex: [
      ['Frankly, I do not agree.', '솔직히 나는 동의하지 않는다.'],
      ['She spoke frankly about her fears.', '그녀는 두려움을 솔직히 말했다.'],
      ['Tell me frankly what you think.', '생각을 솔직히 말해 줘.'],
    ]},
  ]},
  { w: 'freeze', p: 'v.', s: [
    { m: '얼다, 얼리다', syn: ['ice over'], ex: [
      ['Water freezes at zero degrees.', '물은 0도에서 언다.'],
      ['The lake froze last night.', '호수가 어젯밤에 얼었다.'],
      ['She is freezing the meat.', '그녀는 고기를 얼리고 있다.'],
    ]},
  ]},
  { w: 'fright', p: 'n.', s: [
    { m: '놀람, 공포', syn: ['fear'], ex: [
      ['The noise gave me a fright.', '그 소리에 나는 깜짝 놀랐다.'],
      ['She cried out in fright.', '그녀는 놀라서 소리쳤다.'],
      ['His face showed fright.', '그의 얼굴에 공포가 드러났다.'],
    ]},
  ]},
  { w: 'frog', p: 'n.', s: [
    { m: '개구리', syn: ['amphibian'], ex: [
      ['A frog jumped into the pond.', '개구리가 연못으로 뛰어들었다.'],
      ['Frogs live near water.', '개구리는 물 근처에 산다.'],
      ['The frog made a loud sound.', '그 개구리가 큰 소리를 냈다.'],
    ]},
  ]},
  { w: 'frustrate', p: 'v.', s: [
    { m: '좌절시키다', syn: ['discourage'], ex: [
      ['The delay frustrated everyone.', '그 지연이 모두를 좌절시켰다.'],
      ['Do not let failure frustrate you.', '실패가 너를 좌절시키게 두지 마라.'],
      ['She was frustrated by the rules.', '그녀는 그 규칙에 답답해했다.'],
    ]},
  ]},
  { w: 'fry', p: 'v.', s: [
    { m: '튀기다, 부치다', syn: ['cook in oil'], ex: [
      ['She fried an egg.', '그녀는 달걀을 부쳤다.'],
      ['Fry the fish for five minutes.', '생선을 5분 동안 튀겨라.'],
      ['He is frying potatoes.', '그는 감자를 튀기고 있다.'],
    ]},
  ]},
  { w: 'function', p: 'n.', s: [
    { m: '기능, 역할', syn: ['role'], ex: [
      ['The heart has an important function.', '심장은 중요한 기능이 있다.'],
      ['This button has two functions.', '이 버튼에는 기능이 두 가지 있다.'],
      ['Explain the function of the part.', '그 부품의 역할을 설명해라.'],
    ]},
  ]},
  { w: 'fund', p: 'n.', s: [
    { m: '기금, 자금', syn: ['money'], ex: [
      ['They raised a fund for the school.', '그들은 학교를 위해 기금을 모았다.'],
      ['The fund helps poor students.', '그 기금은 가난한 학생을 돕는다.'],
      ['We need more funds.', '우리는 자금이 더 필요하다.'],
    ]},
  ]},
  { w: 'fur', p: 'n.', s: [
    { m: '털, 모피', syn: ['coat of animal'], ex: [
      ['The cat has soft fur.', '그 고양이는 부드러운 털을 가졌다.'],
      ['Fur keeps animals warm.', '털은 동물을 따뜻하게 한다.'],
      ['She never wears fur.', '그녀는 모피를 절대 입지 않는다.'],
    ]},
  ]},
  { w: 'furniture', p: 'n.', s: [
    { m: '가구', syn: ['furnishings'], ex: [
      ['We bought new furniture.', '우리는 새 가구를 샀다.'],
      ['The furniture is made of wood.', '그 가구는 나무로 만들어졌다.'],
      ['Move the furniture to the wall.', '가구를 벽 쪽으로 옮겨라.'],
    ]},
  ]},
  { w: 'gain', p: 'v.', s: [
    { m: '얻다, 늘리다', syn: ['obtain'], ex: [
      ['She gained a lot of experience.', '그녀는 많은 경험을 얻었다.'],
      ['He gained weight this winter.', '그는 이번 겨울에 살이 쪘다.'],
      ['We are gaining speed.', '우리는 속도를 내고 있다.'],
    ]},
  ]},
  { w: 'garage', p: 'n.', s: [
    { m: '차고, 정비소', syn: ['car shed'], ex: [
      ['The car is in the garage.', '차가 차고에 있다.'],
      ['He fixed the bike in the garage.', '그는 차고에서 자전거를 고쳤다.'],
      ['Our garage is very small.', '우리 차고는 아주 작다.'],
    ]},
  ]},
  { w: 'gate', p: 'n.', s: [
    { m: '문, 출입구', syn: ['entrance'], ex: [
      ['Meet me at the school gate.', '학교 정문에서 만나자.'],
      ['The gate was already closed.', '문은 이미 닫혀 있었다.'],
      ['He opened the gate for us.', '그는 우리를 위해 문을 열어 주었다.'],
    ]},
  ]},
  { w: 'gather', p: 'v.', s: [
    { m: '모으다, 모이다', syn: ['collect', 'come together'], ex: [
      ['People gathered in the square.', '사람들이 광장에 모였다.'],
      ['We gathered leaves for the art class.', '우리는 미술 시간을 위해 나뭇잎을 모았다.'],
      ['The family gathers every New Year.', '가족은 매년 새해에 모인다.'],
    ]},
  ]},
  { w: 'gear', p: 'n.', s: [
    { m: '장비, 기어', syn: ['equipment'], ex: [
      ['Bring your camping gear.', '캠핑 장비를 가져와라.'],
      ['Change the gear on the hill.', '언덕에서는 기어를 바꿔라.'],
      ['The gear was too heavy to carry.', '장비가 너무 무거워 들 수 없었다.'],
    ]},
  ]},
  { w: 'general', p: 'adj.', s: [
    { m: '일반적인, 전반적인', syn: ['common'], ex: [
      ['This is a general rule.', '이것은 일반적인 규칙이다.'],
      ['The general opinion was positive.', '전반적인 의견은 긍정적이었다.'],
      ['In general, she is right.', '대체로 그녀가 옳다.'],
    ]},
  ]},
  { w: 'generation', p: 'n.', s: [
    { m: '세대', syn: ['age group'], ex: [
      ['Each generation has its own music.', '각 세대는 자기만의 음악이 있다.'],
      ['This tradition passed down through generations.', '이 전통은 여러 세대를 거쳐 전해졌다.'],
      ['The younger generation uses new apps.', '젊은 세대는 새로운 앱을 사용한다.'],
    ]},
  ]},
  { w: 'genetic', p: 'adj.', s: [
    { m: '유전의, 유전학의', syn: ['inherited'], ex: [
      ['Eye color is genetic.', '눈 색깔은 유전이다.'],
      ['The disease has a genetic cause.', '그 병은 유전적 원인이 있다.'],
      ['Genetic research has advanced quickly.', '유전 연구는 빠르게 발전했다.'],
    ]},
  ]},
  { w: 'gentle', p: 'adj.', s: [
    { m: '부드러운, 온화한', syn: ['mild'], ex: [
      ['She has a gentle voice.', '그녀는 부드러운 목소리를 가졌다.'],
      ['A gentle wind blew.', '부드러운 바람이 불었다.'],
      ['Be gentle with the baby.', '아기를 조심스럽게 다뤄라.'],
    ]},
  ]},
  { w: 'gesture', p: 'n.', s: [
    { m: '몸짓, 표시', syn: ['motion'], ex: [
      ['He made a gesture with his hand.', '그는 손으로 몸짓을 했다.'],
      ['Her gift was a kind gesture.', '그녀의 선물은 따뜻한 표시였다.'],
      ['A small gesture can mean a lot.', '작은 몸짓이 큰 뜻을 가질 수 있다.'],
    ]},
  ]},
  { w: 'ghost', p: 'n.', s: [
    { m: '유령', syn: ['spirit'], ex: [
      ['She is afraid of ghosts.', '그녀는 유령을 무서워한다.'],
      ['The old house has a ghost story.', '그 낡은 집에는 유령 이야기가 있다.'],
      ['No one has seen a ghost.', '아무도 유령을 본 적이 없다.'],
    ]},
  ]},
  { w: 'giant', p: 'adj.', s: [
    { m: '거대한', syn: ['huge'], ex: [
      ['A giant tree stood there.', '거대한 나무가 거기 서 있었다.'],
      ['They built a giant statue.', '그들은 거대한 조각상을 세웠다.'],
      ['The giant wave hit the shore.', '거대한 파도가 해안을 덮쳤다.'],
    ]},
  ]},
  { w: 'gift', p: 'n.', s: [
    { m: '선물', syn: ['present'], ex: [
      ['This is a gift for you.', '이것은 너를 위한 선물이야.'],
      ['She got many gifts on her birthday.', '그녀는 생일에 선물을 많이 받았다.'],
      ['I wrapped the gift in blue paper.', '나는 선물을 파란 종이로 포장했다.'],
    ]},
  ]},
  { w: 'giraffe', p: 'n.', s: [
    { m: '기린', syn: ['animal'], ex: [
      ['The giraffe has a long neck.', '기린은 목이 길다.'],
      ['We saw a giraffe at the zoo.', '우리는 동물원에서 기린을 보았다.'],
      ['Giraffes eat leaves from tall trees.', '기린은 높은 나무의 잎을 먹는다.'],
    ]},
  ]},
  { w: 'glance', p: 'v.', s: [
    { m: '힐끗 보다', syn: ['peek'], ex: [
      ['She glanced at the clock.', '그녀는 시계를 힐끗 봤다.'],
      ['He glanced over his shoulder.', '그는 어깨 너머로 흘깃 봤다.'],
      ['I glanced at the paper quickly.', '나는 종이를 빠르게 훑어봤다.'],
    ]},
  ]},
  { w: 'glory', p: 'n.', s: [
    { m: '영광', syn: ['honor'], ex: [
      ['The team won glory that day.', '그 팀은 그날 영광을 얻었다.'],
      ['Glory does not last forever.', '영광은 영원하지 않다.'],
      ['He fought for glory.', '그는 영광을 위해 싸웠다.'],
    ]},
  ]},
  { w: 'glove', p: 'n.', s: [
    { m: '장갑', syn: ['hand cover'], ex: [
      ['Wear gloves in the cold.', '추울 때는 장갑을 껴라.'],
      ['She lost one glove.', '그녀는 장갑 한 짝을 잃어버렸다.'],
      ['The glove is made of leather.', '그 장갑은 가죽으로 만들어졌다.'],
    ]},
  ]},
  { w: 'glue', p: 'n.', s: [
    { m: '풀, 접착제', syn: ['adhesive'], ex: [
      ['Stick it with glue.', '풀로 그것을 붙여라.'],
      ['The glue dried quickly.', '풀이 빨리 말랐다.'],
      ['She used glue to fix the book.', '그녀는 책을 고치는 데 풀을 썼다.'],
    ]},
  ]},
  { w: 'golf', p: 'n.', s: [
    { m: '골프', syn: [], ex: [
      ['My father plays golf.', '우리 아버지는 골프를 치신다.'],
      ['Golf takes a lot of time.', '골프는 시간이 많이 걸린다.'],
      ['They built a golf course here.', '그들은 여기에 골프장을 지었다.'],
    ]},
  ]},
  { w: 'gorgeous', p: 'adj.', s: [
    { m: '아주 멋진, 화려한', syn: ['beautiful'], ex: [
      ['The view was gorgeous.', '경치가 아주 멋졌다.'],
      ['She wore a gorgeous dress.', '그녀는 화려한 드레스를 입었다.'],
      ['What a gorgeous morning!', '정말 멋진 아침이구나!'],
    ]},
  ]},
  { w: 'govern', p: 'v.', s: [
    { m: '다스리다, 통치하다', syn: ['rule'], ex: [
      ['A king governed the land.', '왕이 그 땅을 다스렸다.'],
      ['Laws govern our behavior.', '법이 우리의 행동을 다스린다.'],
      ['She governs the company well.', '그녀는 회사를 잘 운영한다.'],
    ]},
  ]},
  { w: 'grab', p: 'v.', s: [
    { m: '붙잡다, 움켜쥐다', syn: ['seize'], ex: [
      ['He grabbed my arm.', '그는 내 팔을 붙잡았다.'],
      ['She grabbed her bag and ran.', '그녀는 가방을 움켜쥐고 달렸다.'],
      ['Do not grab the food.', '음식을 함부로 집지 마라.'],
    ]},
  ]},
  { w: 'grace', p: 'n.', s: [
    { m: '우아함, 은혜', syn: ['elegance'], ex: [
      ['She danced with grace.', '그녀는 우아하게 춤췄다.'],
      ['He accepted defeat with grace.', '그는 패배를 품위 있게 받아들였다.'],
      ['Grace made her movements beautiful.', '우아함이 그녀의 동작을 아름답게 했다.'],
    ]},
  ]},
  { w: 'grade', p: 'n.', s: [
    { m: '학년', syn: ['year'], ex: [
      ['I am in the first grade of middle school.', '나는 중학교 1학년이다.'],
      ['She teaches second grade students.', '그녀는 2학년 학생들을 가르친다.'],
    ]},
    { m: '성적, 점수', syn: ['score'], ex: [
      ['He got a good grade on the test.', '그는 시험에서 좋은 성적을 받았다.'],
      ['My grades are getting better.', '내 성적이 좋아지고 있다.'],
    ]},
  ]},
  { w: 'gradually', p: 'adv.', s: [
    { m: '점차, 서서히', syn: ['slowly', 'step by step'], ex: [
      ['The weather gradually got warmer.', '날씨가 점차 따뜻해졌다.'],
      ['She gradually improved her English.', '그녀는 서서히 영어 실력을 키웠다.'],
      ['The noise gradually died away.', '소음이 점차 잦아들었다.'],
    ]},
  ]},
  { w: 'grand', p: 'adj.', s: [
    { m: '웅장한, 대단한', syn: ['magnificent'], ex: [
      ['The hall looks grand.', '그 홀은 웅장해 보인다.'],
      ['They had a grand opening.', '그들은 성대한 개막식을 열었다.'],
      ['It was a grand idea.', '그것은 대단한 생각이었다.'],
    ]},
  ]},
  { w: 'grant', p: 'v.', s: [
    { m: '주다, 허락하다', syn: ['allow'], ex: [
      ['The teacher granted permission.', '선생님이 허락해 주셨다.'],
      ['They granted her request.', '그들은 그녀의 요청을 들어주었다.'],
      ['He was granted more time.', '그는 시간을 더 받았다.'],
    ]},
  ]},
  { w: 'graph', p: 'n.', s: [
    { m: '그래프', syn: ['chart'], ex: [
      ['The graph shows monthly rain.', '그 그래프는 월별 강수량을 보여 준다.'],
      ['Draw a graph of the results.', '결과를 그래프로 그려라.'],
      ['This graph is easy to read.', '이 그래프는 읽기 쉽다.'],
    ]},
  ]},
  { w: 'greet', p: 'v.', s: [
    { m: '인사하다, 맞이하다', syn: ['welcome'], ex: [
      ['She greeted us at the door.', '그녀는 문에서 우리를 맞이했다.'],
      ['He greets everyone with a smile.', '그는 모두에게 미소로 인사한다.'],
      ['They greeted the new student warmly.', '그들은 새 학생을 따뜻하게 맞았다.'],
    ]},
  ]},
  { w: 'grocery', p: 'n.', s: [
    { m: '식료품, 식료품점', syn: ['food store'], ex: [
      ['She went to the grocery store.', '그녀는 식료품점에 갔다.'],
      ['We buy grocery items weekly.', '우리는 주마다 식료품을 산다.'],
      ['The grocery is closed today.', '그 식료품점은 오늘 문을 닫았다.'],
    ]},
  ]},
  { w: 'guarantee', p: 'v., n.', s: [
    { m: '보장하다; 보장', syn: ['promise', 'ensure'], ex: [
      ['Hard work does not guarantee success.', '노력이 성공을 보장하지는 않는다.'],
      ['The product comes with a two-year guarantee.', '그 제품은 2년 보증이 따른다.'],
      ['I guarantee you will enjoy it.', '네가 즐길 것이라고 장담한다.'],
    ]},
  ]},
  { w: 'guard', p: 'v.', s: [
    { m: '지키다, 보호하다', syn: ['protect'], ex: [
      ['A dog guards the house.', '개가 집을 지킨다.'],
      ['Soldiers guarded the gate.', '군인들이 정문을 지켰다.'],
      ['She is guarding the door.', '그녀는 문을 지키고 있다.'],
    ]},
  ]},
  { w: 'guest', p: 'n.', s: [
    { m: '손님', syn: ['visitor'], ex: [
      ['We have a guest tonight.', '오늘 밤 손님이 온다.'],
      ['The guests arrived at six.', '손님들이 6시에 도착했다.'],
      ['She welcomed her guests warmly.', '그녀는 손님들을 따뜻하게 맞이했다.'],
    ]},
  ]},
  { w: 'guide', p: 'n., v.', s: [
    { m: '안내자, 안내하다', syn: ['lead'], ex: [
      ['Our guide showed us the old temple.', '안내인이 우리에게 옛 절을 보여 주었다.'],
      ['She guided us through the museum.', '그녀는 우리를 박물관 안으로 안내했다.'],
      ['This book is a good guide for beginners.', '이 책은 초보자를 위한 좋은 안내서다.'],
    ]},
  ]},
  { w: 'guilt', p: 'n.', s: [
    { m: '죄책감, 유죄', syn: ['shame'], ex: [
      ['He felt guilt about the lie.', '그는 거짓말에 죄책감을 느꼈다.'],
      ['Guilt kept her awake.', '죄책감에 그녀는 잠들지 못했다.'],
      ['The court proved his guilt.', '법원이 그의 유죄를 밝혔다.'],
    ]},
  ]},
  { w: 'gun', p: 'n.', s: [
    { m: '총', syn: ['firearm'], ex: [
      ['The police carry a gun.', '경찰은 총을 지닌다.'],
      ['He never touched a gun.', '그는 총을 만져 본 적이 없다.'],
      ['A gun is dangerous.', '총은 위험하다.'],
    ]},
  ]},
  { w: 'half', p: 'n.', s: [
    { m: '절반', syn: ['one of two parts'], ex: [
      ['Cut the apple in half.', '사과를 반으로 잘라라.'],
      ['Half the class was absent.', '반 학생의 절반이 결석했다.'],
      ['She ate half of the cake.', '그녀는 케이크의 절반을 먹었다.'],
    ]},
  ]},
  { w: 'hall', p: 'n.', s: [
    { m: '복도, 회관, 강당', syn: ['corridor'], ex: [
      ['Do not run in the hall.', '복도에서 뛰지 마라.'],
      ['The concert was held in the city hall.', '콘서트는 시민 회관에서 열렸다.'],
      ['Students gathered in the hall.', '학생들이 강당에 모였다.'],
    ]},
  ]},
  { w: 'handle', p: 'v.', s: [
    { m: '다루다, 처리하다', syn: ['manage'], ex: [
      ['She handled the problem well.', '그녀는 그 문제를 잘 처리했다.'],
      ['Handle the glass carefully.', '유리를 조심해서 다뤄라.'],
      ['He is handling too much work.', '그는 너무 많은 일을 감당하고 있다.'],
    ]},
  ]},
  { w: 'handsome', p: 'adj.', s: [
    { m: '잘생긴', syn: ['good-looking'], ex: [
      ['He is a handsome young man.', '그는 잘생긴 청년이다.'],
      ['The actor looks handsome.', '그 배우는 잘생겨 보인다.'],
      ['She married a handsome man.', '그녀는 잘생긴 남자와 결혼했다.'],
    ]},
  ]},
  { w: 'happen', p: 'v.', s: [
    { m: '일어나다, 발생하다', syn: ['occur', 'take place'], ex: [
      ['What happened to your leg?', '다리에 무슨 일이 있었니?'],
      ['The accident happened last night.', '그 사고는 어젯밤에 일어났다.'],
      ['Strange things are happening here.', '이곳에서 이상한 일들이 일어나고 있다.'],
    ]},
  ]},
  { w: 'harm', p: 'n.', s: [
    { m: '해, 피해', syn: ['damage'], ex: [
      ['Smoking does great harm.', '흡연은 큰 해를 끼친다.'],
      ['No harm was done.', '피해는 없었다.'],
      ['Protect the trees from harm.', '나무를 피해로부터 지켜라.'],
    ]},
  ]},
  { w: 'harmful', p: 'adj.', s: [
    { m: '해로운', syn: ['damaging', 'bad for'], ex: [
      ['Too much sugar is harmful.', '너무 많은 설탕은 해롭다.'],
      ['Smoking is harmful to your lungs.', '흡연은 폐에 해롭다.'],
      ['These chemicals are harmful to fish.', '이 화학 물질은 물고기에 해롭다.'],
    ]},
  ]},
  { w: 'health', p: 'n.', s: [
    { m: '건강', syn: ['well-being'], ex: [
      ['Exercise is good for your health.', '운동은 건강에 좋다.'],
      ['My grandfather is in good health.', '할아버지는 건강하시다.'],
      ['Too much sugar harms your health.', '설탕을 너무 많이 먹으면 건강을 해친다.'],
    ]},
  ]},
  { w: 'hear', p: 'v.', s: [
    { m: '듣다', syn: ['listen to'], ex: [
      ['I hear a strange sound.', '나는 이상한 소리를 듣는다.'],
      ['She heard the news yesterday.', '그녀는 어제 그 소식을 들었다.'],
      ['He is hearing the same story again.', '그는 같은 이야기를 또 듣고 있다.'],
    ]},
  ]},
  { w: 'heaven', p: 'n.', s: [
    { m: '하늘, 천국', syn: ['sky'], ex: [
      ['Stars filled the heaven.', '별들이 하늘을 채웠다.'],
      ['They believe in heaven.', '그들은 천국을 믿는다.'],
      ['This place feels like heaven.', '이곳은 천국 같다.'],
    ]},
  ]},
  { w: 'height', p: 'n.', s: [
    { m: '높이, 키', syn: ['tallness'], ex: [
      ['What is your height?', '키가 얼마인가요?'],
      ['The height of the tower is fifty meters.', '그 탑의 높이는 50미터다.'],
      ['She is afraid of heights.', '그녀는 높은 곳을 무서워한다.'],
    ]},
  ]},
  { w: 'helicopter', p: 'n.', s: [
    { m: '헬리콥터', syn: ['chopper'], ex: [
      ['A helicopter flew overhead.', '헬리콥터가 머리 위로 날아갔다.'],
      ['The helicopter landed on the roof.', '헬리콥터가 지붕에 착륙했다.'],
      ['They sent a helicopter to help.', '그들은 도우려고 헬리콥터를 보냈다.'],
    ]},
  ]},
  { w: 'hell', p: 'n.', s: [
    { m: '지옥', syn: ['underworld'], ex: [
      ['The heat was like hell.', '더위가 지옥 같았다.'],
      ['Some stories describe hell.', '어떤 이야기는 지옥을 묘사한다.'],
      ['War is hell for everyone.', '전쟁은 누구에게나 지옥이다.'],
    ]},
  ]},
  { w: 'hesitate', p: 'v.', s: [
    { m: '주저하다, 망설이다', syn: ['pause'], ex: [
      ['Do not hesitate to ask.', '망설이지 말고 물어봐라.'],
      ['She hesitated before answering.', '그녀는 답하기 전에 망설였다.'],
      ['He is hesitating at the door.', '그는 문 앞에서 망설이고 있다.'],
    ]},
  ]},
  { w: 'hide', p: 'v.', s: [
    { m: '숨다, 숨기다', syn: ['conceal'], ex: [
      ['The cat hid under the bed.', '고양이가 침대 밑에 숨었다.'],
      ['Do not hide the truth from me.', '나에게 진실을 숨기지 마라.'],
      ['He is hiding behind the tree.', '그는 나무 뒤에 숨어 있다.'],
    ]},
  ]},
  { w: 'highway', p: 'n.', s: [
    { m: '고속도로', syn: ['expressway'], ex: [
      ['We drove on the highway.', '우리는 고속도로에서 운전했다.'],
      ['The highway was busy today.', '오늘 고속도로가 붐볐다.'],
      ['A new highway opened last month.', '지난달 새 고속도로가 열렸다.'],
    ]},
  ]},
  { w: 'hint', p: 'n.', s: [
    { m: '힌트, 암시', syn: ['clue'], ex: [
      ['Give me a hint, please.', '힌트 좀 주세요.'],
      ['Her smile was a hint.', '그녀의 미소가 암시였다.'],
      ['The teacher dropped a hint.', '선생님이 힌트를 흘렸다.'],
    ]},
  ]},
  { w: 'hire', p: 'v.', s: [
    { m: '고용하다, 빌리다', syn: ['employ'], ex: [
      ['They hired a new teacher.', '그들은 새 교사를 채용했다.'],
      ['We hired a car for the trip.', '우리는 여행을 위해 차를 빌렸다.'],
      ['She is hiring more workers.', '그녀는 일꾼을 더 뽑고 있다.'],
    ]},
  ]},
  { w: 'hole', p: 'n.', s: [
    { m: '구멍', syn: [], ex: [
      ['There is a hole in my sock.', '내 양말에 구멍이 났다.'],
      ['The dog dug a hole in the garden.', '개가 정원에 구멍을 팠다.'],
      ['Water came through the hole.', '구멍으로 물이 들어왔다.'],
    ]},
  ]},
  { w: 'honey', p: 'n.', s: [
    { m: '꿀', syn: ['sweet syrup'], ex: [
      ['Bees make honey.', '벌은 꿀을 만든다.'],
      ['She put honey in her tea.', '그녀는 차에 꿀을 넣었다.'],
      ['This honey tastes wonderful.', '이 꿀은 아주 맛있다.'],
    ]},
  ]},
  { w: 'honor', p: 'n.', s: [
    { m: '명예, 영광', syn: ['respect'], ex: [
      ['It is an honor to meet you.', '만나 뵙게 되어 영광입니다.'],
      ['He fought for his honor.', '그는 명예를 위해 싸웠다.'],
      ['She received an honor at school.', '그녀는 학교에서 표창을 받았다.'],
    ]},
  ]},
  { w: 'honour', p: 'n.', s: [
    { m: '명예, 영광 (영국식)', syn: ['honor'], ex: [
      ['We accept the honour with thanks.', '우리는 그 영광을 감사히 받습니다.'],
      ['His honour was never in doubt.', '그의 명예는 의심받은 적이 없다.'],
      ['She spoke in his honour.', '그녀는 그를 기려 연설했다.'],
    ]},
  ]},
  { w: 'hotel', p: 'n.', s: [
    { m: '호텔', syn: ['inn'], ex: [
      ['We stayed at a small hotel.', '우리는 작은 호텔에 묵었다.'],
      ['The hotel is near the beach.', '그 호텔은 해변 근처에 있다.'],
      ['He booked a hotel room.', '그는 호텔 방을 예약했다.'],
    ]},
  ]},
  { w: 'hug', p: 'v.', s: [
    { m: '껴안다', syn: ['embrace'], ex: [
      ['She hugged her mother.', '그녀는 어머니를 껴안았다.'],
      ['He hugged the puppy gently.', '그는 강아지를 부드럽게 안았다.'],
      ['They are hugging goodbye.', '그들은 작별의 포옹을 하고 있다.'],
    ]},
  ]},
  { w: 'huge', p: 'adj.', s: [
    { m: '거대한, 엄청난', syn: ['enormous', 'massive'], ex: [
      ['They live in a huge house.', '그들은 거대한 집에 산다.'],
      ['The concert drew a huge crowd.', '그 콘서트는 엄청난 인파를 모았다.'],
      ['There is a huge difference between them.', '그 둘 사이에는 엄청난 차이가 있다.'],
    ]},
  ]},
  { w: 'humor', p: 'n.', s: [
    { m: '유머, 익살', syn: ['wit'], ex: [
      ['He has a good sense of humor.', '그는 유머 감각이 좋다.'],
      ['Humor makes a class fun.', '유머는 수업을 재미있게 한다.'],
      ['Her humor cheered us up.', '그녀의 유머가 우리를 기운 나게 했다.'],
    ]},
  ]},
  { w: 'humour', p: 'n.', s: [
    { m: '유머 (영국식)', syn: ['humor'], ex: [
      ['British humour is famous.', '영국식 유머는 유명하다.'],
      ['He kept his humour to the end.', '그는 끝까지 유머를 잃지 않았다.'],
      ['Her humour lightened the room.', '그녀의 유머가 분위기를 밝게 했다.'],
    ]},
  ]},
  { w: 'hunger', p: 'n.', s: [
    { m: '배고픔, 굶주림', syn: ['starvation'], ex: [
      ['Hunger is a serious problem.', '굶주림은 심각한 문제다.'],
      ['He felt hunger after the walk.', '그는 산책 후에 배고픔을 느꼈다.'],
      ['Hunger drove them to the city.', '굶주림이 그들을 도시로 몰았다.'],
    ]},
  ]},
  { w: 'hurt', p: 'v.', s: [
    { m: '아프다, 다치게 하다', syn: ['injure', 'ache'], ex: [
      ['My leg hurts a lot.', '다리가 많이 아프다.'],
      ['He hurt his hand while cooking.', '그는 요리하다가 손을 다쳤다.'],
    ]},
    { m: '(마음을) 상하게 하다', syn: ['upset', 'offend'], ex: [
      ['Your words hurt her feelings.', '네 말이 그녀의 기분을 상하게 했다.'],
      ['I did not mean to hurt anyone.', '나는 누구도 상처 주려던 것이 아니었다.'],
    ]},
  ]},
  { w: 'identify', p: 'v.', s: [
    { m: '확인하다, 알아보다', syn: ['recognize', 'spot'], ex: [
      ['Can you identify the problem?', '문제를 파악할 수 있니?'],
      ['She identified the bird by its song.', '그녀는 새를 울음소리로 알아봤다.'],
      ['Police identified the driver.', '경찰이 운전자의 신원을 확인했다.'],
    ]},
  ]},
  { w: 'identity', p: 'n.', s: [
    { m: '신원, 정체성', syn: ['who one is'], ex: [
      ['The police checked his identity.', '경찰이 그의 신원을 확인했다.'],
      ['Language is part of identity.', '언어는 정체성의 일부다.'],
      ['She kept her identity secret.', '그녀는 신원을 비밀로 했다.'],
    ]},
  ]},
  { w: 'ignore', p: 'v.', s: [
    { m: '무시하다', syn: ['pay no attention to', 'overlook'], ex: [
      ["Don't ignore the warning.", '그 경고를 무시하지 마라.'],
      ['She ignored my message.', '그녀는 내 메시지를 무시했다.'],
      ['We cannot ignore this problem any longer.', '우리는 더 이상 이 문제를 무시할 수 없다.'],
    ]},
  ]},
  { w: 'ill', p: 'adj.', s: [
    { m: '아픈, 병든', syn: ['sick'], ex: [
      ['He was ill for a week.', '그는 일주일 동안 아팠다.'],
      ['She looks ill today.', '그녀는 오늘 아파 보인다.'],
      ['My grandfather became ill last winter.', '할아버지는 지난겨울에 병이 나셨다.'],
    ]},
  ]},
  { w: 'illustrate', p: 'v.', s: [
    { m: '설명하다, 예시하다', syn: ['show', 'demonstrate'], ex: [
      ['This example illustrates the point.', '이 예가 그 요점을 잘 보여 준다.'],
      ['Let me illustrate with a story.', '이야기로 설명해 볼게.'],
      ['The graph illustrates the change well.', '그 그래프는 변화를 잘 보여 준다.'],
    ]},
  ]},
  { w: 'imagine', p: 'v.', s: [
    { m: '상상하다', syn: ['picture', 'suppose'], ex: [
      ['Imagine a world without cars.', '자동차 없는 세상을 상상해 보라.'],
      ['I cannot imagine living there.', '나는 그곳에 사는 것을 상상할 수 없다.'],
      ['She imagined herself on stage.', '그녀는 무대 위의 자신을 상상했다.'],
    ]},
  ]},
  { w: 'immediate', p: 'adj.', s: [
    { m: '즉각적인', syn: ['instant'], ex: [
      ['We need an immediate answer.', '우리는 즉각적인 답이 필요하다.'],
      ['The medicine had an immediate effect.', '그 약은 즉각 효과가 있었다.'],
      ['Her immediate reaction was surprise.', '그녀의 즉각적인 반응은 놀람이었다.'],
    ]},
  ]},
  { w: 'impress', p: 'v.', s: [
    { m: '감명을 주다', syn: ['move'], ex: [
      ['Her speech impressed everyone.', '그녀의 연설이 모두에게 감명을 주었다.'],
      ['He impressed the judges.', '그는 심사위원들을 감동시켰다.'],
      ['I was impressed by his effort.', '나는 그의 노력에 감명받았다.'],
    ]},
  ]},
  { w: 'improve', p: 'v.', s: [
    { m: '향상시키다, 나아지다', syn: ['get better', 'enhance'], ex: [
      ['I want to improve my English.', '나는 영어를 향상시키고 싶다.'],
      ['His health improved after surgery.', '그의 건강은 수술 후 나아졌다.'],
      ['Practice will improve your speed.', '연습하면 속도가 좋아질 것이다.'],
    ]},
  ]},
  { w: 'in addition to', p: 'phr.', s: [
    { m: '~에 더하여, ~뿐만 아니라', syn: ['besides', 'as well as'], ex: [
      ['In addition to math, she teaches science.', '수학뿐만 아니라 그녀는 과학도 가르친다.'],
      ['In addition to the fee, there is a tax.', '수수료에 더해 세금이 있다.'],
      ['He speaks Chinese in addition to English.', '그는 영어에 더해 중국어도 한다.'],
    ]},
  ]},
  { w: 'in spite of', p: 'phr.', s: [
    { m: '~에도 불구하고', syn: ['despite', 'regardless of'], ex: [
      ['In spite of the rain, we went out.', '비에도 불구하고 우리는 나갔다.'],
      ['He passed in spite of the difficulty.', '그는 어려움에도 불구하고 합격했다.'],
      ['She smiled in spite of her pain.', '그녀는 아픔에도 불구하고 미소 지었다.'],
    ]},
  ]},
  { w: 'in terms of', p: 'phr.', s: [
    { m: '~의 관점에서, ~ 면에서', syn: ['regarding', 'with respect to'], ex: [
      ['In terms of cost, it is better.', '비용의 관점에서 그것이 더 낫다.'],
      ['In terms of size, they are similar.', '크기 면에서 그들은 비슷하다.'],
      ['Think in terms of long-term results.', '장기적인 결과의 관점에서 생각해라.'],
    ]},
  ]},
  { w: 'include', p: 'v.', s: [
    { m: '포함하다', syn: ['contain', 'cover'], ex: [
      ['The price includes breakfast.', '그 가격은 아침 식사를 포함한다.'],
      ['The list includes ten names.', '그 목록에는 열 개의 이름이 들어 있다.'],
      ['Does the tour include lunch?', '그 투어에 점심이 포함되나요?'],
    ]},
  ]},
  { w: 'income', p: 'n.', s: [
    { m: '수입, 소득', syn: ['earnings'], ex: [
      ['Their income is not high.', '그들의 수입은 높지 않다.'],
      ['She saves part of her income.', '그녀는 수입의 일부를 저축한다.'],
      ['Income changes every month.', '수입은 매달 달라진다.'],
    ]},
  ]},
  { w: 'increase', p: 'v., n.', s: [
    { m: '증가하다, 늘리다', syn: ['rise', 'go up'], ex: [
      ['The number of visitors increased.', '방문객 수가 증가했다.'],
      ['We need to increase our speed.', '우리는 속도를 높여야 한다.'],
      ['There was an increase in sales.', '매출에 증가가 있었다.'],
    ]},
  ]},
  { w: 'indeed', p: 'adv.', s: [
    { m: '정말로, 참으로', syn: ['truly'], ex: [
      ['That is indeed a good idea.', '그것은 정말 좋은 생각이다.'],
      ['She was indeed surprised.', '그녀는 정말로 놀랐다.'],
      ['Indeed, we should start now.', '정말이지 우리는 지금 시작해야 한다.'],
    ]},
  ]},
  { w: 'indicate', p: 'v.', s: [
    { m: '나타내다, 가리키다', syn: ['show', 'point to'], ex: [
      ['The sign indicates the exit.', '그 표지판은 출구를 가리킨다.'],
      ['The results indicate a clear trend.', '그 결과는 뚜렷한 경향을 나타낸다.'],
      ['Red usually indicates danger.', '빨간색은 보통 위험을 나타낸다.'],
    ]},
  ]},
  { w: 'individual', p: 'n., adj.', s: [
    { m: '개인; 개별의', syn: ['person', 'single'], ex: [
      ['Each individual has a role.', '각 개인은 역할이 있다.'],
      ['We respect individual differences.', '우리는 개인차를 존중한다.'],
      ['Every student gets individual attention.', '모든 학생이 개별적인 관심을 받는다.'],
    ]},
  ]},
  { w: 'industry', p: 'n.', s: [
    { m: '산업, 공업', syn: ['business sector'], ex: [
      ['The car industry is growing.', '자동차 산업이 성장하고 있다.'],
      ['Industry changed this city.', '산업이 이 도시를 바꿨다.'],
      ['She works in the film industry.', '그녀는 영화 산업에서 일한다.'],
    ]},
  ]},
  { w: 'inevitable', p: 'adj.', s: [
    { m: '불가피한, 피할 수 없는', syn: ['unavoidable', 'certain'], ex: [
      ['Change is inevitable.', '변화는 불가피하다.'],
      ['An accident was inevitable at that speed.', '그 속도에서는 사고가 불가피했다.'],
      ['Aging is an inevitable part of life.', '노화는 삶의 피할 수 없는 부분이다.'],
    ]},
  ]},
  { w: 'influence', p: 'n., v.', s: [
    { m: '영향; 영향을 주다', syn: ['effect', 'affect'], ex: [
      ['Friends influence our choices.', '친구는 우리의 선택에 영향을 준다.'],
      ['His teacher had a great influence on him.', '그의 선생님은 그에게 큰 영향을 주었다.'],
      ['Advertising influences what we buy.', '광고는 우리가 무엇을 사는지에 영향을 미친다.'],
    ]},
  ]},
  { w: 'inform', p: 'v.', s: [
    { m: '알리다', syn: ['notify'], ex: [
      ['Please inform me of the change.', '변경 사항을 알려 주세요.'],
      ['She informed the class about the test.', '그녀는 반에 시험을 알렸다.'],
      ['We were informed too late.', '우리는 너무 늦게 통보받았다.'],
    ]},
  ]},
  { w: 'injure', p: 'v.', s: [
    { m: '부상을 입히다, 다치게 하다', syn: ['hurt', 'wound'], ex: [
      ['He injured his knee.', '그는 무릎을 다쳤다.'],
      ['Two people were injured in the accident.', '그 사고로 두 명이 다쳤다.'],
      ['She injured her hand while cooking.', '그녀는 요리하다가 손을 다쳤다.'],
    ]},
  ]},
  { w: 'innocent', p: 'adj.', s: [
    { m: '무죄의, 순수한', syn: ['not guilty'], ex: [
      ['He is innocent of the crime.', '그는 그 죄가 없다.'],
      ['An innocent child smiled at us.', '순수한 아이가 우리에게 미소 지었다.'],
      ['The court found her innocent.', '법원은 그녀가 무죄라고 판단했다.'],
    ]},
  ]},
  { w: 'innovation', p: 'n.', s: [
    { m: '혁신', syn: ['new idea', 'breakthrough'], ex: [
      ['Innovation drives the economy.', '혁신이 경제를 이끈다.'],
      ['The company is known for innovation.', '그 회사는 혁신으로 유명하다.'],
      ['This invention was a great innovation.', '이 발명은 대단한 혁신이었다.'],
    ]},
  ]},
  { w: 'insist', p: 'v.', s: [
    { m: '주장하다, 고집하다', syn: ['demand'], ex: [
      ['She insisted on paying.', '그녀는 자기가 내겠다고 고집했다.'],
      ['He insists that he is right.', '그는 자기가 옳다고 주장한다.'],
      ['They insisted on the truth.', '그들은 진실을 주장했다.'],
    ]},
  ]},
  { w: 'inspect', p: 'v.', s: [
    { m: '검사하다, 점검하다', syn: ['examine'], ex: [
      ['They inspect the bus every month.', '그들은 매달 버스를 점검한다.'],
      ['She inspected the room carefully.', '그녀는 방을 꼼꼼히 살폈다.'],
      ['The teacher inspected our notebooks.', '선생님이 우리 공책을 점검하셨다.'],
    ]},
  ]},
  { w: 'instance', p: 'n.', s: [
    { m: '사례, 경우', syn: ['example'], ex: [
      ['Give me one instance.', '한 가지 사례를 들어 줘.'],
      ['For instance, look at this word.', '예를 들어 이 단어를 봐라.'],
      ['That instance proves the rule.', '그 사례가 규칙을 증명한다.'],
    ]},
  ]},
  { w: 'instant', p: 'adj.', s: [
    { m: '즉각적인, 즉석의', syn: ['immediate'], ex: [
      ['She made instant noodles.', '그녀는 즉석 라면을 끓였다.'],
      ['The reply was instant.', '답이 즉각적이었다.'],
      ['He felt instant relief.', '그는 즉시 안도했다.'],
    ]},
  ]},
  { w: 'instead', p: 'adv.', s: [
    { m: '대신에', syn: ['in place of'], ex: [
      ['She drank tea instead.', '그녀는 대신 차를 마셨다.'],
      ['We walked instead of taking a bus.', '우리는 버스 대신 걸었다.'],
      ['He stayed home instead.', '그는 대신 집에 있었다.'],
    ]},
  ]},
  { w: 'institution', p: 'n.', s: [
    { m: '기관, 단체', syn: ['organization', 'establishment'], ex: [
      ['Schools are social institutions.', '학교는 사회적 기관이다.'],
      ['He works at a research institution.', '그는 연구 기관에서 일한다.'],
      ['Financial institutions lend money.', '금융 기관은 돈을 빌려준다.'],
    ]},
  ]},
  { w: 'instruct', p: 'v.', s: [
    { m: '가르치다, 지시하다', syn: ['teach'], ex: [
      ['She instructed us to wait.', '그녀는 우리에게 기다리라고 지시했다.'],
      ['He instructs young swimmers.', '그는 어린 수영 선수들을 가르친다.'],
      ['The manual instructs us clearly.', '설명서가 우리에게 분명히 알려 준다.'],
    ]},
  ]},
  { w: 'instrument', p: 'n.', s: [
    { m: '악기, 도구', syn: ['tool'], ex: [
      ['The violin is a lovely instrument.', '바이올린은 사랑스러운 악기다.'],
      ['Doctors use fine instruments.', '의사들은 정교한 도구를 쓴다.'],
      ['She plays two instruments.', '그녀는 악기를 두 개 다룬다.'],
    ]},
  ]},
  { w: 'insure', p: 'v.', s: [
    { m: '보험에 들다', syn: ['cover'], ex: [
      ['They insured the new car.', '그들은 새 차에 보험을 들었다.'],
      ['We should insure the house.', '우리는 집에 보험을 들어야 한다.'],
      ['The company insures workers.', '그 회사는 근로자에게 보험을 들어 준다.'],
    ]},
  ]},
  { w: 'intend', p: 'v.', s: [
    { m: '의도하다, ~할 작정이다', syn: ['plan'], ex: [
      ['I intend to study abroad.', '나는 유학할 작정이다.'],
      ['She intended no harm.', '그녀는 해칠 뜻이 없었다.'],
      ['They intend to leave early.', '그들은 일찍 떠날 생각이다.'],
    ]},
  ]},
  { w: 'intense', p: 'adj.', s: [
    { m: '강렬한, 극심한', syn: ['extreme', 'strong'], ex: [
      ['The heat was intense.', '더위가 극심했다.'],
      ['She felt intense pressure before the final.', '그녀는 결승 전에 극심한 압박을 느꼈다.'],
      ['The competition was intense.', '경쟁이 치열했다.'],
    ]},
  ]},
  { w: 'intent', p: 'n.', s: [
    { m: '의도, 목적', syn: ['purpose'], ex: [
      ['His intent was good.', '그의 의도는 좋았다.'],
      ['The intent of the rule is safety.', '그 규칙의 목적은 안전이다.'],
      ['She acted with clear intent.', '그녀는 분명한 의도로 행동했다.'],
    ]},
  ]},
  { w: 'interest', p: 'n.', s: [
    { m: '관심, 흥미', syn: ['curiosity'], ex: [
      ['She has an interest in science.', '그녀는 과학에 관심이 있다.'],
      ['The book lost my interest.', '그 책은 내 흥미를 잃게 했다.'],
      ['Interest in the club is growing.', '그 동아리에 대한 관심이 커지고 있다.'],
    ]},
  ]},
  { w: 'internal', p: 'adj.', s: [
    { m: '내부의', syn: ['inner'], ex: [
      ['The internal walls are white.', '내부 벽은 흰색이다.'],
      ['This is an internal matter.', '이것은 내부 문제다.'],
      ['Internal damage is hard to see.', '내부 손상은 보기 어렵다.'],
    ]},
  ]},
  { w: 'interrupt', p: 'v.', s: [
    { m: '방해하다, 끼어들다', syn: ['break in'], ex: [
      ['Do not interrupt the speaker.', '발표자를 방해하지 마라.'],
      ['She interrupted our conversation.', '그녀가 우리 대화에 끼어들었다.'],
      ['Rain interrupted the game.', '비가 경기를 중단시켰다.'],
    ]},
  ]},
  { w: 'invent', p: 'v.', s: [
    { m: '발명하다', syn: ['create'], ex: [
      ['He invented a useful machine.', '그는 유용한 기계를 발명했다.'],
      ['Who invented the telephone?', '누가 전화를 발명했니?'],
      ['She invented a new game.', '그녀는 새 게임을 만들어 냈다.'],
    ]},
  ]},
  { w: 'invest', p: 'v.', s: [
    { m: '투자하다', syn: ['put money in'], ex: [
      ['They invested in a small shop.', '그들은 작은 가게에 투자했다.'],
      ['She invests time in reading.', '그녀는 독서에 시간을 투자한다.'],
      ['He invested all his savings.', '그는 저축을 다 투자했다.'],
    ]},
  ]},
  { w: 'investigate', p: 'v.', s: [
    { m: '조사하다, 수사하다', syn: ['examine', 'look into'], ex: [
      ['Police investigated the case.', '경찰이 그 사건을 조사했다.'],
      ['Scientists are investigating the cause.', '과학자들이 원인을 조사하고 있다.'],
      ['We should investigate this further.', '우리는 이것을 더 조사해야 한다.'],
    ]},
  ]},
  { w: 'involve', p: 'v.', s: [
    { m: '포함하다, 관련시키다', syn: ['include'], ex: [
      ['The job involves travel.', '그 일은 출장을 포함한다.'],
      ['Do not involve her in this.', '그녀를 이 일에 끌어들이지 마라.'],
      ['The plan involves three steps.', '그 계획은 세 단계를 포함한다.'],
    ]},
  ]},
  { w: 'iron', p: 'n.', s: [
    { m: '철, 다리미', syn: ['metal'], ex: [
      ['The gate is made of iron.', '그 문은 철로 만들어졌다.'],
      ['She used an iron on the shirt.', '그녀는 셔츠를 다리미로 다렸다.'],
      ['Iron is a strong metal.', '철은 강한 금속이다.'],
    ]},
  ]},
  { w: 'island', p: 'n.', s: [
    { m: '섬', syn: [], ex: [
      ['Jeju is a beautiful island.', '제주는 아름다운 섬이다.'],
      ['We took a boat to the island.', '우리는 배를 타고 섬에 갔다.'],
      ['Many birds live on that island.', '많은 새가 그 섬에 산다.'],
    ]},
  ]},
  { w: 'item', p: 'n.', s: [
    { m: '항목, 물품', syn: ['article'], ex: [
      ['Check each item on the list.', '목록의 각 항목을 확인해라.'],
      ['This item is out of stock.', '이 물품은 품절이다.'],
      ['She bought three items.', '그녀는 물품 세 개를 샀다.'],
    ]},
  ]},
  { w: 'jaw', p: 'n.', s: [
    { m: '턱', syn: ['lower face'], ex: [
      ['His jaw hurt after the fall.', '넘어진 뒤 그의 턱이 아팠다.'],
      ['The dog opened its jaw wide.', '개가 턱을 크게 벌렸다.'],
      ['She rested her jaw on her hand.', '그녀는 손에 턱을 괴었다.'],
    ]},
  ]},
  { w: 'jeans', p: 'n.', s: [
    { m: '청바지', syn: ['denim pants'], ex: [
      ['She wore blue jeans.', '그녀는 청바지를 입었다.'],
      ['My jeans are too tight.', '내 청바지가 너무 조인다.'],
      ['He bought new jeans.', '그는 새 청바지를 샀다.'],
    ]},
  ]},
], 'curriculum');
