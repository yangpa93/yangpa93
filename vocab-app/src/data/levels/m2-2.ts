/**
 * 중학교 2학년 레벨 2 — 수록 62 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_2 = defineLevel('m2-2', [
  { w: 'set', p: 'v.', s: [
    { m: '놓다, 차리다, 정하다', syn: ['put'], ex: [
      ['Please set the table for dinner.', '저녁 식탁을 차려 주세요.'],
      ['She set the box on the floor.', '그녀는 상자를 바닥에 놓았다.'],
      ['We set a date for the meeting.', '우리는 회의 날짜를 정했다.'],
    ]},
  ]},
  { w: 'ship', p: 'n.', s: [
    { m: '배, 선박', syn: ['boat'], ex: [
      ['The ship left the port at dawn.', '배는 새벽에 항구를 떠났다.'],
      ['We traveled by ship.', '우리는 배로 여행했다.'],
      ['That ship carries cars.', '저 배는 자동차를 실어 나른다.'],
    ]},
  ]},
  { w: 'shop', p: 'n., v.', s: [
    { m: '가게, 쇼핑하다', syn: ['store'], ex: [
      ['There is a flower shop near here.', '이 근처에 꽃 가게가 있다.'],
      ['She shops online every weekend.', '그녀는 주말마다 온라인에서 쇼핑한다.'],
      ['The shop opens at nine.', '그 가게는 9시에 문을 연다.'],
    ]},
  ]},
  { w: 'short', p: 'adj.', s: [
    { m: '짧은', syn: ['brief'], ex: [
      ['She has short hair.', '그녀는 머리가 짧다.'],
      ['We took a short break.', '우리는 짧게 쉬었다.'],
      ['The meeting was short.', '회의는 짧았다.'],
    ]},
  ]},
  { w: 'show', p: 'v., n.', s: [
    { m: '보여 주다', syn: ['display'], ex: [
      ['Show me your notebook.', '네 공책을 보여 줘.'],
      ['He showed us the way to the station.', '그는 우리에게 역으로 가는 길을 알려 주었다.'],
    ]},
    { m: '공연, 프로그램', syn: ['program'], ex: [
      ['The show starts at seven.', '공연은 7시에 시작한다.'],
      ['We watched a magic show.', '우리는 마술 공연을 보았다.'],
    ]},
  ]},
  { w: 'shy', p: 'adj.', s: [
    { m: '수줍은, 부끄러워하는', syn: ['timid'], ex: [
      ['He is too shy to speak in class.', '그는 너무 수줍어서 수업에서 말을 못 한다.'],
      ['She was shy at first.', '그녀는 처음에는 수줍어했다.'],
      ['The shy boy stood behind his mother.', '수줍은 소년은 어머니 뒤에 서 있었다.'],
    ]},
  ]},
  { w: 'sick', p: 'adj.', s: [
    { m: '아픈, 병든', syn: ['ill', 'unwell'], ex: [
      ['He was sick yesterday.', '그는 어제 아팠다.'],
      ['She stayed home because she was sick.', '그녀는 아파서 집에 있었다.'],
      ['My dog got sick last week.', '내 개가 지난주에 아팠다.'],
    ]},
  ]},
  { w: 'sing', p: 'v.', s: [
    { m: '노래하다', syn: [], ex: [
      ['She sings very well.', '그녀는 노래를 아주 잘한다.'],
      ['We sang a song together.', '우리는 함께 노래를 불렀다.'],
      ['Birds are singing in the tree.', '새들이 나무에서 노래하고 있다.'],
    ]},
  ]},
  { w: 'sit', p: 'v.', s: [
    { m: '앉다', syn: ['take a seat'], ex: [
      ['Please sit next to me.', '내 옆에 앉아 주세요.'],
      ['He sat quietly in the corner.', '그는 구석에 조용히 앉아 있었다.'],
      ['She is sitting on the bench.', '그녀는 벤치에 앉아 있다.'],
    ]},
  ]},
  { w: 'size', p: 'n.', s: [
    { m: '크기, 치수', syn: [], ex: [
      ['What size do you wear?', '어떤 치수를 입으시나요?'],
      ['The two rooms are the same size.', '두 방은 크기가 같다.'],
      ['This shirt is the wrong size.', '이 셔츠는 치수가 안 맞는다.'],
    ]},
  ]},
  { w: 'sky', p: 'n.', s: [
    { m: '하늘', syn: [], ex: [
      ['The sky is clear today.', '오늘 하늘이 맑다.'],
      ['Birds flew across the sky.', '새들이 하늘을 가로질러 날았다.'],
      ['The sky turned dark before the storm.', '폭풍 전에 하늘이 어두워졌다.'],
    ]},
  ]},
  { w: 'sleep', p: 'v., n.', s: [
    { m: '자다, 잠', syn: ['rest'], ex: [
      ['I sleep eight hours every night.', '나는 매일 밤 여덟 시간 잔다.'],
      ['He slept well last night.', '그는 어젯밤에 잘 잤다.'],
      ['The baby is sleeping now.', '아기가 지금 자고 있다.'],
    ]},
  ]},
  { w: 'slow', p: 'adj.', s: [
    { m: '느린', syn: [], ex: [
      ['This computer is very slow.', '이 컴퓨터는 아주 느리다.'],
      ['He is a slow reader.', '그는 읽는 속도가 느리다.'],
      ['The bus was slow because of traffic.', '차가 막혀서 버스가 느렸다.'],
    ]},
  ]},
  { w: 'smell', p: 'v., n.', s: [
    { m: '냄새가 나다, 냄새', syn: ['scent'], ex: [
      ['The flowers smell sweet.', '그 꽃들은 향기롭다.'],
      ['I smell something burning.', '뭔가 타는 냄새가 난다.'],
      ['The smell of bread filled the kitchen.', '빵 냄새가 부엌에 가득했다.'],
    ]},
  ]},
  { w: 'smile', p: 'v., n.', s: [
    { m: '미소 짓다, 미소', syn: [], ex: [
      ['She smiled at me kindly.', '그녀는 나에게 상냥하게 미소 지었다.'],
      ['He has a warm smile.', '그는 따뜻한 미소를 가졌다.'],
      ['The baby is smiling.', '아기가 미소 짓고 있다.'],
    ]},
  ]},
  { w: 'snow', p: 'n., v.', s: [
    { m: '눈, 눈이 오다', syn: [], ex: [
      ['The snow covered the whole town.', '눈이 온 마을을 덮었다.'],
      ['It snowed heavily last night.', '어젯밤에 눈이 많이 왔다.'],
      ['Children love playing in the snow.', '아이들은 눈에서 노는 것을 좋아한다.'],
    ]},
  ]},
  { w: 'soft', p: 'adj.', s: [
    { m: '부드러운', syn: ['gentle'], ex: [
      ['This pillow is very soft.', '이 베개는 아주 부드럽다.'],
      ['She spoke in a soft voice.', '그녀는 부드러운 목소리로 말했다.'],
      ['The cat has soft fur.', '그 고양이는 부드러운 털을 가졌다.'],
    ]},
  ]},
  { w: 'sometimes', p: 'adv.', s: [
    { m: '가끔, 때때로', syn: ['occasionally', 'at times'], ex: [
      ['Sometimes I walk to school.', '나는 가끔 학교에 걸어간다.'],
      ['She sometimes helps in the kitchen.', '그녀는 가끔 부엌일을 돕는다.'],
      ['Sometimes it snows in April.', '가끔 4월에 눈이 온다.'],
    ]},
  ]},
  { w: 'sound', p: 'n., v.', s: [
    { m: '소리', syn: ['noise'], ex: [
      ['I heard a strange sound.', '나는 이상한 소리를 들었다.'],
      ['The sound of rain is nice.', '빗소리는 좋다.'],
    ]},
    { m: '~처럼 들리다', syn: ['seem'], ex: [
      ['That sounds like a good plan.', '그것은 좋은 계획처럼 들린다.'],
      ['She sounded tired on the phone.', '그녀는 전화로 피곤한 목소리였다.'],
    ]},
  ]},
  { w: 'south', p: 'n., adj.', s: [
    { m: '남쪽', syn: [], ex: [
      ['Birds fly south in winter.', '새들은 겨울에 남쪽으로 날아간다.'],
      ['The town is in the south of the country.', '그 마을은 나라의 남쪽에 있다.'],
      ['My window faces south.', '내 창문은 남쪽을 향해 있다.'],
    ]},
  ]},
  { w: 'space', p: 'n.', s: [
    { m: '공간, 자리', syn: ['room'], ex: [
      ['There is not enough space in this box.', '이 상자에는 공간이 충분하지 않다.'],
      ['We need more space for the desks.', '책상을 놓을 자리가 더 필요하다.'],
    ]},
    { m: '우주', syn: ['the universe'], ex: [
      ['He dreams of traveling in space.', '그는 우주 여행을 꿈꾼다.'],
      ['There is no air in space.', '우주에는 공기가 없다.'],
    ]},
  ]},
  { w: 'speak', p: 'v.', s: [
    { m: '말하다', syn: ['talk'], ex: [
      ['She speaks three languages.', '그녀는 세 개 언어를 한다.'],
      ['He spoke slowly and clearly.', '그는 천천히 또렷하게 말했다.'],
      ['Please speak louder.', '더 크게 말해 주세요.'],
    ]},
  ]},
  { w: 'special', p: 'adj.', s: [
    { m: '특별한', syn: ['unusual', 'unique'], ex: [
      ['Today is a special day.', '오늘은 특별한 날이다.'],
      ['She has a special talent for music.', '그녀는 음악에 특별한 재능이 있다.'],
      ['We ate something special for dinner.', '우리는 저녁으로 특별한 것을 먹었다.'],
    ]},
  ]},
  { w: 'speed', p: 'n.', s: [
    { m: '속도', syn: ['rate'], ex: [
      ['The car increased its speed.', '차가 속도를 높였다.'],
      ['Please reduce your speed here.', '여기서는 속도를 줄여 주세요.'],
      ['He ran at full speed.', '그는 전속력으로 달렸다.'],
    ]},
  ]},
  { w: 'spring', p: 'n.', s: [
    { m: '봄', syn: [], ex: [
      ['Flowers bloom in spring.', '봄에 꽃이 핀다.'],
      ['We plant trees every spring.', '우리는 매년 봄에 나무를 심는다.'],
      ['Spring is warm and bright.', '봄은 따뜻하고 밝다.'],
    ]},
  ]},
  { w: 'stand', p: 'v.', s: [
    { m: '서다, 서 있다', syn: ['get up'], ex: [
      ['Please stand up.', '일어서 주세요.'],
      ['He stood by the window.', '그는 창가에 서 있었다.'],
      ['She is standing in line.', '그녀는 줄을 서 있다.'],
    ]},
  ]},
  { w: 'star', p: 'n.', s: [
    { m: '별', syn: [], ex: [
      ['We counted the stars last night.', '우리는 어젯밤 별을 세었다.'],
      ['The star is very far away.', '그 별은 아주 멀리 있다.'],
      ['Stars are hard to see in the city.', '도시에서는 별을 보기 어렵다.'],
    ]},
  ]},
  { w: 'start', p: 'v.', s: [
    { m: '시작하다', syn: ['begin'], ex: [
      ['The class starts at nine.', '수업은 9시에 시작한다.'],
      ['She started learning Chinese.', '그녀는 중국어를 배우기 시작했다.'],
      ['It is starting to rain.', '비가 오기 시작하고 있다.'],
    ]},
  ]},
  { w: 'stay', p: 'v.', s: [
    { m: '머무르다, 있다', syn: ['remain'], ex: [
      ['We stayed at a hotel near the beach.', '우리는 해변 근처 호텔에 묵었다.'],
      ['Please stay here until I come back.', '내가 돌아올 때까지 여기 있어 줘.'],
      ['He is staying with his grandmother.', '그는 할머니 댁에 머물고 있다.'],
    ]},
  ]},
  { w: 'stone', p: 'n.', s: [
    { m: '돌', syn: ['rock'], ex: [
      ['The wall is made of stone.', '그 벽은 돌로 만들어졌다.'],
      ['He threw a stone into the river.', '그는 강에 돌을 던졌다.'],
      ['There are small stones on the path.', '길에 작은 돌들이 있다.'],
    ]},
  ]},
  { w: 'stop', p: 'v.', s: [
    { m: '멈추다, 그만두다', syn: ['halt', 'quit'], ex: [
      ['The bus stopped in front of the school.', '버스가 학교 앞에 멈췄다.'],
      ['Please stop talking.', '그만 이야기해 주세요.'],
      ['The rain is stopping now.', '비가 지금 그치고 있다.'],
    ]},
  ]},
  { w: 'store', p: 'n., v.', s: [
    { m: '가게, 상점', syn: ['shop'], ex: [
      ['I bought milk at the store.', '나는 가게에서 우유를 샀다.'],
      ['The store closes at ten.', '그 가게는 10시에 문을 닫는다.'],
    ]},
    { m: '보관하다, 저장하다', syn: ['keep'], ex: [
      ['We store rice in this room.', '우리는 이 방에 쌀을 보관한다.'],
      ['She stored the photos on her computer.', '그녀는 사진을 컴퓨터에 저장했다.'],
    ]},
  ]},
  { w: 'story', p: 'n.', s: [
    { m: '이야기', syn: ['tale'], ex: [
      ['Grandmother told us a story.', '할머니가 우리에게 이야기를 들려주셨다.'],
      ['This story is about a brave girl.', '이 이야기는 용감한 소녀에 관한 것이다.'],
      ['I read three stories last night.', '나는 어젯밤에 이야기 세 편을 읽었다.'],
    ]},
  ]},
  { w: 'street', p: 'n.', s: [
    { m: '거리, 길', syn: ['road'], ex: [
      ['The street was full of people.', '거리가 사람들로 가득했다.'],
      ['Do not play in the street.', '길에서 놀지 마라.'],
      ['She lives on this street.', '그녀는 이 거리에 산다.'],
    ]},
  ]},
  { w: 'strong', p: 'adj.', s: [
    { m: '강한, 튼튼한', syn: ['powerful', 'tough'], ex: [
      ['He has strong arms.', '그는 팔이 튼튼하다.'],
      ['A strong wind blew all night.', '강한 바람이 밤새 불었다.'],
      ['She has a strong will.', '그녀는 강한 의지를 가지고 있다.'],
    ]},
  ]},
  { w: 'sugar', p: 'n.', s: [
    { m: '설탕', syn: [], ex: [
      ['Do not put too much sugar in the tea.', '차에 설탕을 너무 많이 넣지 마라.'],
      ['This cake has a lot of sugar.', '이 케이크에는 설탕이 많이 들어 있다.'],
      ['She drinks coffee without sugar.', '그녀는 설탕 없이 커피를 마신다.'],
    ]},
  ]},
  { w: 'summer', p: 'n.', s: [
    { m: '여름', syn: [], ex: [
      ['We swim in the sea every summer.', '우리는 매년 여름 바다에서 수영한다.'],
      ['Summer in Korea is hot and wet.', '한국의 여름은 덥고 습하다.'],
      ['She visited Europe last summer.', '그녀는 지난여름 유럽을 방문했다.'],
    ]},
  ]},
  { w: 'sunny', p: 'adj.', s: [
    { m: '화창한, 햇볕이 잘 드는', syn: [], ex: [
      ['It is sunny and warm today.', '오늘은 화창하고 따뜻하다.'],
      ['We had a sunny day at the beach.', '우리는 해변에서 화창한 하루를 보냈다.'],
      ['Her room is bright and sunny.', '그녀의 방은 밝고 햇볕이 잘 든다.'],
    ]},
  ]},
  { w: 'surprised', p: 'adj.', s: [
    { m: '놀란', syn: ['amazed', 'shocked'], ex: [
      ['I was surprised at the news.', '나는 그 소식에 놀랐다.'],
      ['She looked surprised to see me.', '그녀는 나를 보고 놀란 듯했다.'],
      ['We were surprised by his answer.', '우리는 그의 대답에 놀랐다.'],
    ]},
  ]},
  { w: 'swim', p: 'v.', s: [
    { m: '수영하다, 헤엄치다', syn: [], ex: [
      ['I swim twice a week.', '나는 일주일에 두 번 수영한다.'],
      ['She swam across the river.', '그녀는 강을 헤엄쳐 건넜다.'],
      ['Fish are swimming in the pond.', '물고기들이 연못에서 헤엄치고 있다.'],
    ]},
  ]},
  { w: 'take a walk', p: 'phr.', s: [
    { m: '산책하다', syn: ['go for a walk'], ex: [
      ['We take a walk after dinner.', '우리는 저녁 후에 산책한다.'],
      ['Let’s take a walk in the park.', '공원에서 산책하자.'],
      ['She took a walk to clear her mind.', '그녀는 머리를 식히려고 산책했다.'],
    ]},
  ]},
  { w: 'take care of', p: 'phr.', s: [
    { m: '~을 돌보다', syn: ['look after', 'care for'], ex: [
      ['She takes care of her cat.', '그녀는 고양이를 돌본다.'],
      ['Please take care of yourself.', '몸 조심하세요.'],
      ['He took care of his sister all day.', '그는 하루 종일 여동생을 돌봤다.'],
    ]},
  ]},
  { w: 'take off', p: 'phr.', s: [
    { m: '(옷을) 벗다', syn: ['remove'], ex: [
      ['Take off your shoes at the door.', '문에서 신발을 벗어라.'],
      ['He took off his hat politely.', '그는 정중히 모자를 벗었다.'],
    ]},
    { m: '이륙하다', syn: ['leave the ground'], ex: [
      ['The plane took off on time.', '비행기는 정시에 이륙했다.'],
      ['Our plane takes off at noon.', '우리 비행기는 정오에 이륙한다.'],
    ]},
  ]},
  { w: 'take part in', p: 'phr.', s: [
    { m: '~에 참여하다', syn: ['join', 'participate in'], ex: [
      ['I took part in the contest.', '나는 그 대회에 참가했다.'],
      ['Many students took part in the event.', '많은 학생이 그 행사에 참여했다.'],
      ['Will you take part in the discussion?', '토론에 참여할 거니?'],
    ]},
  ]},
  { w: 'talk', p: 'v.', s: [
    { m: '말하다, 이야기하다', syn: ['speak', 'chat'], ex: [
      ['Let us talk about it later.', '나중에 그것에 대해 이야기하자.'],
      ['They talked for two hours.', '그들은 두 시간 동안 이야기했다.'],
      ['She is talking with her friend.', '그녀는 친구와 이야기하고 있다.'],
    ]},
  ]},
  { w: 'taste', p: 'v., n.', s: [
    { m: '맛이 나다, 맛', syn: ['flavor'], ex: [
      ['This soup tastes salty.', '이 국은 짠맛이 난다.'],
      ['Would you like to taste it?', '맛을 보시겠어요?'],
      ['The taste of this fruit is new to me.', '이 과일의 맛은 나에게 낯설다.'],
    ]},
  ]},
  { w: 'teach', p: 'v.', s: [
    { m: '가르치다', syn: ['show', 'instruct'], ex: [
      ['She teaches math.', '그녀는 수학을 가르친다.'],
      ['My father taught me to ride a bike.', '아버지가 나에게 자전거 타는 법을 가르쳐 주셨다.'],
      ['This story teaches an important lesson.', '이 이야기는 중요한 교훈을 가르쳐 준다.'],
    ]},
  ]},
  { w: 'team', p: 'n.', s: [
    { m: '팀, 단체', syn: ['group'], ex: [
      ['Our team won the game.', '우리 팀이 경기에서 이겼다.'],
      ['She joined the swimming team.', '그녀는 수영팀에 들어갔다.'],
      ['The team practices every day.', '그 팀은 매일 연습한다.'],
    ]},
  ]},
  { w: 'test', p: 'n., v.', s: [
    { m: '시험, 검사하다', syn: ['exam'], ex: [
      ['We have a math test tomorrow.', '우리는 내일 수학 시험이 있다.'],
      ['She passed the test easily.', '그녀는 시험에 쉽게 합격했다.'],
      ['They tested the new machine.', '그들은 새 기계를 시험했다.'],
    ]},
  ]},
  { w: 'thanks to', p: 'phr.', s: [
    { m: '~ 덕분에', syn: ['because of', 'owing to'], ex: [
      ['Thanks to her, we finished early.', '그녀 덕분에 우리는 일찍 끝냈다.'],
      ['Thanks to the map, we did not get lost.', '지도 덕분에 우리는 길을 잃지 않았다.'],
      ['He passed thanks to hard work.', '그는 노력 덕분에 합격했다.'],
    ]},
  ]},
  { w: 'think of', p: 'phr.', s: [
    { m: '~을 생각하다, 떠올리다', syn: ['think about'], ex: [
      ['I cannot think of his name.', '나는 그의 이름이 떠오르지 않는다.'],
      ['What do you think of this plan?', '이 계획을 어떻게 생각하니?'],
      ['She often thinks of her old school.', '그녀는 종종 옛 학교를 생각한다.'],
    ]},
  ]},
  { w: 'thirsty', p: 'adj.', s: [
    { m: '목마른', syn: ['dry'], ex: [
      ["I'm thirsty. May I have water?", '목이 말라요. 물 좀 주시겠어요?'],
      ['Running makes me thirsty.', '달리면 목이 마르다.'],
      ['The plants look thirsty.', '식물들이 물이 필요해 보인다.'],
    ]},
  ]},
  { w: 'tired', p: 'adj.', s: [
    { m: '피곤한, 지친', syn: ['exhausted'], ex: [
      ['I am too tired to study.', '나는 너무 피곤해서 공부할 수 없다.'],
      ['She looked tired after the trip.', '그녀는 여행 후에 지쳐 보였다.'],
      ['He gets tired easily these days.', '그는 요즘 쉽게 피곤해진다.'],
    ]},
  ]},
  { w: 'together', p: 'adv.', s: [
    { m: '함께, 같이', syn: [], ex: [
      ['We studied together last night.', '우리는 어젯밤에 함께 공부했다.'],
      ['Let us go to the museum together.', '함께 박물관에 가자.'],
      ['They worked together on the project.', '그들은 과제를 함께 했다.'],
    ]},
  ]},
  { w: 'touch', p: 'v.', s: [
    { m: '만지다, 닿다', syn: ['feel'], ex: [
      ['Do not touch the hot pot.', '뜨거운 냄비를 만지지 마라.'],
      ['She touched the soft blanket.', '그녀는 부드러운 담요를 만졌다.'],
      ['His hand touched mine.', '그의 손이 내 손에 닿았다.'],
    ]},
  ]},
  { w: 'town', p: 'n.', s: [
    { m: '마을, 도시', syn: ['village'], ex: [
      ['I grew up in a small town.', '나는 작은 마을에서 자랐다.'],
      ['The town has only one school.', '그 마을에는 학교가 하나뿐이다.'],
      ['Many people left the town.', '많은 사람이 그 마을을 떠났다.'],
    ]},
  ]},
  { w: 'train', p: 'n., v.', s: [
    { m: '기차, 열차', syn: [], ex: [
      ['We took the train to Busan.', '우리는 부산행 기차를 탔다.'],
      ['The train leaves at eight.', '기차는 8시에 떠난다.'],
    ]},
    { m: '훈련하다, 훈련시키다', syn: ['practice'], ex: [
      ['He trains every day for the race.', '그는 경주를 위해 매일 훈련한다.'],
      ['She trained her dog well.', '그녀는 개를 잘 훈련시켰다.'],
    ]},
  ]},
  { w: 'trash', p: 'n.', s: [
    { m: '쓰레기', syn: ['garbage'], ex: [
      ['Please put the trash in the bin.', '쓰레기는 통에 넣어 주세요.'],
      ['Do not leave trash on the beach.', '해변에 쓰레기를 버리지 마라.'],
      ['We take out the trash every Monday.', '우리는 매주 월요일에 쓰레기를 내놓는다.'],
    ]},
  ]},
  { w: 'travel', p: 'v., n.', s: [
    { m: '여행하다; 여행', syn: ['journey', 'trip'], ex: [
      ['They travel every summer.', '그들은 여름마다 여행한다.'],
      ['I want to travel around the world.', '나는 세계 일주를 하고 싶다.'],
      ['Air travel is fast but expensive.', '항공 여행은 빠르지만 비싸다.'],
    ]},
  ]},
  { w: 'tree', p: 'n.', s: [
    { m: '나무', syn: [], ex: [
      ['We planted a tree in the garden.', '우리는 정원에 나무를 심었다.'],
      ['Birds are singing in the tree.', '새들이 나무에서 노래하고 있다.'],
      ['The old tree fell in the storm.', '그 오래된 나무가 폭풍에 쓰러졌다.'],
    ]},
  ]},
  { w: 'trip', p: 'n.', s: [
    { m: '여행', syn: ['journey'], ex: [
      ['We went on a school trip last week.', '우리는 지난주에 수학여행을 갔다.'],
      ['The trip to Jeju was wonderful.', '제주 여행은 훌륭했다.'],
      ['She is planning a trip to Europe.', '그녀는 유럽 여행을 계획하고 있다.'],
    ]},
  ]},
  { w: 'true', p: 'adj.', s: [
    { m: '사실인, 진짜의', syn: ['real'], ex: [
      ['Is that story true?', '그 이야기가 사실이니?'],
      ['A true friend helps you in bad times.', '진정한 친구는 힘들 때 도와준다.'],
      ['His dream came true.', '그의 꿈이 이루어졌다.'],
    ]},
  ]},
], 'curriculum');
