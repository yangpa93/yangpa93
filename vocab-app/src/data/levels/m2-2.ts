/**
 * 중학교 2학년 레벨 2 — 수록 136 / 계획 137개.
 *
 * 난이도 층: 기초(초등 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M2_2 = defineLevel('m2-2', [
  { w: 'service', p: 'n.', s: [
    { m: '서비스, 봉사', syn: ['assistance'], ex: [
      ['The service at that shop is good.', '그 가게는 서비스가 좋다.'],
      ['She does volunteer service on weekends.', '그녀는 주말에 봉사 활동을 한다.'],
      ['The bus service stops at ten.', '버스 운행은 10시에 끝난다.'],
    ]},
  ]},
  { w: 'set', p: 'v.', s: [
    { m: '놓다, 차리다, 정하다', syn: ['put'], ex: [
      ['Please set the table for dinner.', '저녁 식탁을 차려 주세요.'],
      ['She set the box on the floor.', '그녀는 상자를 바닥에 놓았다.'],
      ['We set a date for the meeting.', '우리는 회의 날짜를 정했다.'],
    ]},
  ]},
  { w: 'seven', p: 'num.', s: [
    { m: '일곱, 7', syn: ['7'], ex: [
      ['There are seven days in a week.', '일주일은 7일이다.'],
      ['The train leaves at seven.', '기차는 7시에 떠난다.'],
      ['She has seven cousins.', '그녀는 사촌이 일곱 명이다.'],
    ]},
  ]},
  { w: 'she', p: 'pron.', s: [
    { m: '그녀', syn: ['her'], ex: [
      ['She is my sister.', '그녀는 내 여동생이다.'],
      ['She runs every morning.', '그녀는 매일 아침 달린다.'],
      ['She said nothing to me.', '그녀는 나에게 아무 말도 하지 않았다.'],
    ]},
  ]},
  { w: 'ship', p: 'n.', s: [
    { m: '배, 선박', syn: ['boat'], ex: [
      ['The ship left the port at dawn.', '배는 새벽에 항구를 떠났다.'],
      ['We traveled by ship.', '우리는 배로 여행했다.'],
      ['That ship carries cars.', '저 배는 자동차를 실어 나른다.'],
    ]},
  ]},
  { w: 'shirt', p: 'n.', s: [
    { m: '셔츠', syn: ['top'], ex: [
      ['He wore a white shirt.', '그는 흰 셔츠를 입었다.'],
      ['This shirt is too tight.', '이 셔츠는 너무 조인다.'],
      ['She washed my shirt.', '그녀가 내 셔츠를 빨아 주었다.'],
    ]},
  ]},
  { w: 'shoe', p: 'n.', s: [
    { m: '신발', syn: ['footwear'], ex: [
      ['My shoe is too small.', '내 신발이 너무 작다.'],
      ['Take off your shoes at the door.', '문에서 신발을 벗어라.'],
      ['She bought new shoes.', '그녀는 새 신발을 샀다.'],
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
  { w: 'should', p: 'v.', s: [
    { m: '~해야 한다', syn: ['ought to'], ex: [
      ['You should sleep early.', '너는 일찍 자야 한다.'],
      ['We should help each other.', '우리는 서로 도와야 한다.'],
      ['She should be here by now.', '그녀는 지금쯤 와 있어야 한다.'],
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
  { w: 'side', p: 'n.', s: [
    { m: '쪽, 옆', syn: ['edge'], ex: [
      ['The shop is on the left side.', '가게는 왼쪽에 있다.'],
      ['He sat by my side.', '그는 내 옆에 앉았다.'],
      ['Write on both sides of the paper.', '종이 양면에 써라.'],
    ]},
  ]},
  { w: 'sing', p: 'v.', s: [
    { m: '노래하다', syn: [], ex: [
      ['She sings very well.', '그녀는 노래를 아주 잘한다.'],
      ['We sang a song together.', '우리는 함께 노래를 불렀다.'],
      ['Birds are singing in the tree.', '새들이 나무에서 노래하고 있다.'],
    ]},
  ]},
  { w: 'sister', p: 'n.', s: [
    { m: '언니, 누나, 여동생', syn: ['sibling'], ex: [
      ['My sister is a teacher.', '내 언니는 교사다.'],
      ['She has two sisters.', '그녀는 여자 형제가 둘이다.'],
      ['His sister plays the piano.', '그의 누나는 피아노를 친다.'],
    ]},
  ]},
  { w: 'sit', p: 'v.', s: [
    { m: '앉다', syn: ['take a seat'], ex: [
      ['Please sit next to me.', '내 옆에 앉아 주세요.'],
      ['He sat quietly in the corner.', '그는 구석에 조용히 앉아 있었다.'],
      ['She is sitting on the bench.', '그녀는 벤치에 앉아 있다.'],
    ]},
  ]},
  { w: 'six', p: 'num.', s: [
    { m: '여섯, 6', syn: ['6'], ex: [
      ['I get up at six.', '나는 6시에 일어난다.'],
      ['Six students were absent.', '학생 여섯 명이 결석했다.'],
      ['The box holds six eggs.', '그 상자에는 달걀 여섯 개가 들어간다.'],
    ]},
  ]},
  { w: 'size', p: 'n.', s: [
    { m: '크기, 치수', syn: [], ex: [
      ['What size do you wear?', '어떤 치수를 입으시나요?'],
      ['The two rooms are the same size.', '두 방은 크기가 같다.'],
      ['This shirt is the wrong size.', '이 셔츠는 치수가 안 맞는다.'],
    ]},
  ]},
  { w: 'skate', p: 'v.', s: [
    { m: '스케이트를 타다', syn: ['glide'], ex: [
      ['We skate on the ice in winter.', '우리는 겨울에 얼음 위에서 스케이트를 탄다.'],
      ['She skated very well.', '그녀는 스케이트를 아주 잘 탔다.'],
      ['They are skating in the park.', '그들은 공원에서 스케이트를 타고 있다.'],
    ]},
  ]},
  { w: 'ski', p: 'v.', s: [
    { m: '스키를 타다', syn: ['glide on snow'], ex: [
      ['We ski every winter.', '우리는 매년 겨울에 스키를 탄다.'],
      ['He skied down the hill.', '그는 언덕을 스키로 내려왔다.'],
      ['She is skiing for the first time.', '그녀는 처음으로 스키를 타고 있다.'],
    ]},
  ]},
  { w: 'skin', p: 'n.', s: [
    { m: '피부, 껍질', syn: ['hide'], ex: [
      ['The sun is bad for your skin.', '햇볕은 피부에 나쁘다.'],
      ['Peel the skin off the apple.', '사과 껍질을 벗겨라.'],
      ['Her skin is very soft.', '그녀의 피부는 아주 부드럽다.'],
    ]},
  ]},
  { w: 'skirt', p: 'n.', s: [
    { m: '치마', syn: ['dress'], ex: [
      ['She wore a long skirt.', '그녀는 긴 치마를 입었다.'],
      ['This skirt is too short.', '이 치마는 너무 짧다.'],
      ['The skirt has a pocket.', '그 치마에는 주머니가 있다.'],
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
  { w: 'small', p: 'adj.', s: [
    { m: '작은', syn: ['little'], ex: [
      ['We live in a small house.', '우리는 작은 집에 산다.'],
      ['This shirt is too small.', '이 셔츠는 너무 작다.'],
      ['She has a small dog.', '그녀는 작은 개를 기른다.'],
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
  { w: 'so', p: 'adv.', s: [
    { m: '그래서, 그렇게', syn: ['therefore'], ex: [
      ['It rained, so we stayed home.', '비가 와서 우리는 집에 있었다.'],
      ['She was so tired.', '그녀는 무척 피곤했다.'],
      ['Do not talk so loudly.', '그렇게 크게 말하지 마라.'],
    ]},
  ]},
  { w: 'soccer', p: 'n.', s: [
    { m: '축구', syn: ['football'], ex: [
      ['We play soccer after school.', '우리는 방과 후에 축구를 한다.'],
      ['Soccer is popular in Korea.', '축구는 한국에서 인기가 있다.'],
      ['He joined the soccer team.', '그는 축구팀에 들어갔다.'],
    ]},
  ]},
  { w: 'sock', p: 'n.', s: [
    { m: '양말', syn: ['hosiery'], ex: [
      ['My sock has a hole.', '내 양말에 구멍이 났다.'],
      ['She bought three pairs of socks.', '그녀는 양말 세 켤레를 샀다.'],
      ['Wear warm socks in winter.', '겨울에는 따뜻한 양말을 신어라.'],
    ]},
  ]},
  { w: 'soft', p: 'adj.', s: [
    { m: '부드러운', syn: ['gentle'], ex: [
      ['This pillow is very soft.', '이 베개는 아주 부드럽다.'],
      ['She spoke in a soft voice.', '그녀는 부드러운 목소리로 말했다.'],
      ['The cat has soft fur.', '그 고양이는 부드러운 털을 가졌다.'],
    ]},
  ]},
  { w: 'software', p: 'n.', s: [
    { m: '소프트웨어', syn: ['program'], ex: [
      ['This software is free.', '이 소프트웨어는 무료다.'],
      ['He writes software for a living.', '그는 소프트웨어를 만들어 먹고산다.'],
      ['The software needs an update.', '그 소프트웨어는 업데이트가 필요하다.'],
    ]},
  ]},
  { w: 'some', p: 'adj.', s: [
    { m: '약간의, 몇몇의', syn: ['a few'], ex: [
      ['Add some sugar, please.', '설탕을 조금 넣어 주세요.'],
      ['Some students went home early.', '몇몇 학생은 일찍 집에 갔다.'],
      ['I need some help.', '나는 도움이 좀 필요하다.'],
    ]},
  ]},
  { w: 'sometimes', p: 'adv.', s: [
    { m: '가끔, 때때로', syn: ['occasionally', 'at times'], ex: [
      ['Sometimes I walk to school.', '나는 가끔 학교에 걸어간다.'],
      ['She sometimes helps in the kitchen.', '그녀는 가끔 부엌일을 돕는다.'],
      ['Sometimes it snows in April.', '가끔 4월에 눈이 온다.'],
    ]},
  ]},
  { w: 'son', p: 'n.', s: [
    { m: '아들', syn: ['male child'], ex: [
      ['Their son is ten years old.', '그들의 아들은 열 살이다.'],
      ['She has one son.', '그녀는 아들이 하나 있다.'],
      ['My son loves soccer.', '내 아들은 축구를 좋아한다.'],
    ]},
  ]},
  { w: 'song', p: 'n.', s: [
    { m: '노래', syn: ['tune'], ex: [
      ['She sang a beautiful song.', '그녀는 아름다운 노래를 불렀다.'],
      ['This song is very popular.', '이 노래는 아주 인기가 있다.'],
      ['We learned a new song.', '우리는 새 노래를 배웠다.'],
    ]},
  ]},
  { w: 'sorry', p: 'adj.', s: [
    { m: '미안한', syn: ['apologetic'], ex: [
      ['I am sorry for being late.', '늦어서 미안합니다.'],
      ['She felt sorry for the dog.', '그녀는 그 개가 안쓰러웠다.'],
      ['He said sorry and left.', '그는 미안하다고 하고 떠났다.'],
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
  { w: 'soup', p: 'n.', s: [
    { m: '국, 수프', syn: ['broth'], ex: [
      ['The soup is too hot.', '국이 너무 뜨겁다.'],
      ['She made chicken soup.', '그녀는 닭고기 수프를 만들었다.'],
      ['Eat the soup with a spoon.', '숟가락으로 국을 떠 먹어라.'],
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
  { w: 'spaghetti', p: 'n.', s: [
    { m: '스파게티', syn: ['pasta'], ex: [
      ['We had spaghetti for dinner.', '우리는 저녁으로 스파게티를 먹었다.'],
      ['This spaghetti tastes great.', '이 스파게티는 아주 맛있다.'],
      ['She cooked spaghetti for us.', '그녀는 우리에게 스파게티를 만들어 주었다.'],
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
  { w: 'spoon', p: 'n.', s: [
    { m: '숟가락', syn: ['utensil'], ex: [
      ['Eat the soup with a spoon.', '숟가락으로 국을 떠 먹어라.'],
      ['The spoon fell on the floor.', '숟가락이 바닥에 떨어졌다.'],
      ['Put the spoon next to the bowl.', '숟가락을 그릇 옆에 놓아라.'],
    ]},
  ]},
  { w: 'sport', p: 'n.', s: [
    { m: '운동, 스포츠', syn: ['athletics'], ex: [
      ['Soccer is my favorite sport.', '축구는 내가 제일 좋아하는 운동이다.'],
      ['Sport keeps you healthy.', '운동은 건강을 지켜 준다.'],
      ['She plays two sports.', '그녀는 운동 두 종목을 한다.'],
    ]},
  ]},
  { w: 'spring', p: 'n.', s: [
    { m: '봄', syn: [], ex: [
      ['Flowers bloom in spring.', '봄에 꽃이 핀다.'],
      ['We plant trees every spring.', '우리는 매년 봄에 나무를 심는다.'],
      ['Spring is warm and bright.', '봄은 따뜻하고 밝다.'],
    ]},
  ]},
  { w: 'staff', p: 'n.', s: [
    { m: '직원', syn: ['employees'], ex: [
      ['The staff was very kind.', '직원들이 아주 친절했다.'],
      ['Our school has twenty staff.', '우리 학교에는 직원이 스무 명 있다.'],
      ['He joined the staff last year.', '그는 작년에 직원이 되었다.'],
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
  { w: 'steak', p: 'n.', s: [
    { m: '스테이크', syn: ['beef cut'], ex: [
      ['He ordered a steak.', '그는 스테이크를 주문했다.'],
      ['The steak was well cooked.', '스테이크가 잘 익었다.'],
      ['She does not eat steak.', '그녀는 스테이크를 먹지 않는다.'],
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
  { w: 'study', p: 'v.', s: [
    { m: '공부하다', syn: ['learn'], ex: [
      ['I study English every day.', '나는 매일 영어를 공부한다.'],
      ['She studied all night.', '그녀는 밤새 공부했다.'],
      ['He is studying in his room.', '그는 방에서 공부하고 있다.'],
    ]},
  ]},
  { w: 'style', p: 'n.', s: [
    { m: '스타일, 방식', syn: ['manner'], ex: [
      ['I like her writing style.', '나는 그녀의 글 스타일을 좋아한다.'],
      ['This style of hat is popular.', '이런 스타일의 모자가 인기다.'],
      ['He changed his hair style.', '그는 머리 스타일을 바꿨다.'],
    ]},
  ]},
  { w: 'subway', p: 'n.', s: [
    { m: '지하철', syn: ['metro'], ex: [
      ['I take the subway to school.', '나는 지하철로 학교에 간다.'],
      ['The subway is crowded in the morning.', '지하철은 아침에 붐빈다.'],
      ['The subway station is near here.', '지하철역이 이 근처에 있다.'],
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
  { w: 'sun', p: 'n.', s: [
    { m: '해, 태양', syn: ['star'], ex: [
      ['The sun rises in the east.', '해는 동쪽에서 뜬다.'],
      ['The sun is very bright today.', '오늘 햇빛이 아주 밝다.'],
      ['Plants need the sun to grow.', '식물은 자라려면 해가 필요하다.'],
    ]},
  ]},
  { w: 'sunny', p: 'adj.', s: [
    { m: '화창한, 햇볕이 잘 드는', syn: [], ex: [
      ['It is sunny and warm today.', '오늘은 화창하고 따뜻하다.'],
      ['We had a sunny day at the beach.', '우리는 해변에서 화창한 하루를 보냈다.'],
      ['Her room is bright and sunny.', '그녀의 방은 밝고 햇볕이 잘 든다.'],
    ]},
  ]},
  { w: 'sure', p: 'adj.', s: [
    { m: '확신하는', syn: ['certain'], ex: [
      ['Are you sure about that?', '그것에 대해 확신하니?'],
      ['I am sure she will come.', '나는 그녀가 올 거라고 확신한다.'],
      ['He was not sure of the answer.', '그는 답에 확신이 없었다.'],
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
  { w: 'table', p: 'n.', s: [
    { m: '탁자, 식탁', syn: ['desk'], ex: [
      ['Put the plate on the table.', '접시를 식탁에 놓아라.'],
      ['The table is made of wood.', '그 탁자는 나무로 만들어졌다.'],
      ['We sat around the table.', '우리는 탁자 둘레에 앉았다.'],
    ]},
  ]},
  { w: 'tail', p: 'n.', s: [
    { m: '꼬리', syn: ['rear end'], ex: [
      ['The dog wagged its tail.', '개가 꼬리를 흔들었다.'],
      ['A fox has a long tail.', '여우는 꼬리가 길다.'],
      ['The cat\'s tail is black.', '그 고양이의 꼬리는 검다.'],
    ]},
  ]},
  { w: 'take', p: 'v.', s: [
    { m: '가져가다, 타다', syn: ['carry'], ex: [
      ['Take an umbrella with you.', '우산을 가져가라.'],
      ['She took the bus to work.', '그녀는 버스를 타고 출근했다.'],
      ['He is taking a picture.', '그는 사진을 찍고 있다.'],
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
  { w: 'tall', p: 'adj.', s: [
    { m: '키가 큰', syn: ['high'], ex: [
      ['He is taller than me.', '그는 나보다 키가 크다.'],
      ['The building is very tall.', '그 건물은 아주 높다.'],
      ['She is a tall girl.', '그녀는 키가 큰 소녀다.'],
    ]},
  ]},
  { w: 'tape', p: 'n.', s: [
    { m: '테이프', syn: ['adhesive strip'], ex: [
      ['Stick it with tape.', '테이프로 붙여라.'],
      ['The tape is not strong enough.', '그 테이프는 충분히 튼튼하지 않다.'],
      ['She cut the tape with scissors.', '그녀는 가위로 테이프를 잘랐다.'],
    ]},
  ]},
  { w: 'taste', p: 'v., n.', s: [
    { m: '맛이 나다, 맛', syn: ['flavor'], ex: [
      ['This soup tastes salty.', '이 국은 짠맛이 난다.'],
      ['Would you like to taste it?', '맛을 보시겠어요?'],
      ['The taste of this fruit is new to me.', '이 과일의 맛은 나에게 낯설다.'],
    ]},
  ]},
  { w: 'taxi', p: 'n.', s: [
    { m: '택시', syn: ['cab'], ex: [
      ['We took a taxi home.', '우리는 택시를 타고 집에 갔다.'],
      ['The taxi stopped in front of us.', '택시가 우리 앞에 섰다.'],
      ['A taxi costs more than a bus.', '택시는 버스보다 비싸다.'],
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
  { w: 'telephone', p: 'n.', s: [
    { m: '전화', syn: ['phone'], ex: [
      ['The telephone rang twice.', '전화가 두 번 울렸다.'],
      ['She answered the telephone.', '그녀가 전화를 받았다.'],
      ['Write your telephone number here.', '여기에 전화번호를 쓰세요.'],
    ]},
  ]},
  { w: 'television', p: 'n.', s: [
    { m: '텔레비전', syn: ['TV'], ex: [
      ['We watch television after dinner.', '우리는 저녁 후에 텔레비전을 본다.'],
      ['Turn off the television.', '텔레비전을 꺼라.'],
      ['The television is too loud.', '텔레비전 소리가 너무 크다.'],
    ]},
  ]},
  { w: 'tell', p: 'v.', s: [
    { m: '말하다, 알려주다', syn: ['inform'], ex: [
      ['Tell me the truth.', '나에게 진실을 말해라.'],
      ['She told us a funny story.', '그녀는 우리에게 재미있는 이야기를 해 주었다.'],
      ['He is telling his plan.', '그는 자기 계획을 말하고 있다.'],
    ]},
  ]},
  { w: 'ten', p: 'num.', s: [
    { m: '열, 10', syn: ['10'], ex: [
      ['I have ten fingers.', '나는 손가락이 열 개다.'],
      ['The class ends at ten.', '수업은 10시에 끝난다.'],
      ['She read ten books.', '그녀는 책 열 권을 읽었다.'],
    ]},
  ]},
  { w: 'tennis', p: 'n.', s: [
    { m: '테니스', syn: ['racket sport'], ex: [
      ['They play tennis on Sunday.', '그들은 일요일에 테니스를 친다.'],
      ['Tennis needs a racket and a ball.', '테니스는 라켓과 공이 필요하다.'],
      ['She won the tennis match.', '그녀는 테니스 경기에서 이겼다.'],
    ]},
  ]},
  { w: 'tent', p: 'n.', s: [
    { m: '텐트', syn: ['shelter'], ex: [
      ['We put up a tent by the river.', '우리는 강가에 텐트를 쳤다.'],
      ['The tent is big enough for four.', '그 텐트는 네 명이 쓸 만큼 크다.'],
      ['Rain came into the tent.', '텐트 안으로 비가 들어왔다.'],
    ]},
  ]},
  { w: 'test', p: 'n., v.', s: [
    { m: '시험, 검사하다', syn: ['exam'], ex: [
      ['We have a math test tomorrow.', '우리는 내일 수학 시험이 있다.'],
      ['She passed the test easily.', '그녀는 시험에 쉽게 합격했다.'],
      ['They tested the new machine.', '그들은 새 기계를 시험했다.'],
    ]},
  ]},
  { w: 'textbook', p: 'n.', s: [
    { m: '교과서', syn: ['schoolbook'], ex: [
      ['Open your textbook to page ten.', '교과서 10쪽을 펴라.'],
      ['This textbook is easy to read.', '이 교과서는 읽기 쉽다.'],
      ['She left her textbook at home.', '그녀는 교과서를 집에 두고 왔다.'],
    ]},
  ]},
  { w: 'than', p: 'conj.', s: [
    { m: '~보다', syn: ['compared to'], ex: [
      ['He is taller than his brother.', '그는 형보다 키가 크다.'],
      ['This book is better than that one.', '이 책이 저 책보다 낫다.'],
      ['She works harder than me.', '그녀는 나보다 열심히 일한다.'],
    ]},
  ]},
  { w: 'thank', p: 'v.', s: [
    { m: '감사하다', syn: ['be grateful'], ex: [
      ['I thank you for your help.', '도와주셔서 감사합니다.'],
      ['She thanked her teacher.', '그녀는 선생님께 감사드렸다.'],
      ['He thanked us with a smile.', '그는 미소로 우리에게 고마움을 표했다.'],
    ]},
  ]},
  { w: 'thanks to', p: 'phr.', s: [
    { m: '~ 덕분에', syn: ['because of', 'owing to'], ex: [
      ['Thanks to her, we finished early.', '그녀 덕분에 우리는 일찍 끝냈다.'],
      ['Thanks to the map, we did not get lost.', '지도 덕분에 우리는 길을 잃지 않았다.'],
      ['He passed thanks to hard work.', '그는 노력 덕분에 합격했다.'],
    ]},
  ]},
  { w: 'that', p: 'pron.', s: [
    { m: '저것, 그것', syn: ['it'], ex: [
      ['That is my bag.', '저것은 내 가방이다.'],
      ['I know that he is honest.', '나는 그가 정직하다는 것을 안다.'],
      ['Give me that book.', '그 책을 나에게 줘.'],
    ]},
  ]},
  { w: 'the', p: 'art.', s: [
    { m: '그 (정관사)', syn: ['this one'], ex: [
      ['The book on the desk is mine.', '책상 위의 책은 내 것이다.'],
      ['Close the door, please.', '문을 닫아 주세요.'],
      ['The sun is bright today.', '오늘 해가 밝다.'],
    ]},
  ]},
  { w: 'there', p: 'adv.', s: [
    { m: '거기에', syn: ['at that place'], ex: [
      ['Put the box over there.', '상자를 저기에 놓아라.'],
      ['She has been there before.', '그녀는 전에 거기 가 본 적이 있다.'],
      ['There is a park near here.', '이 근처에 공원이 있다.'],
    ]},
  ]},
  { w: 'they', p: 'pron.', s: [
    { m: '그들', syn: ['them'], ex: [
      ['They are my classmates.', '그들은 내 반 친구들이다.'],
      ['They went home early.', '그들은 일찍 집에 갔다.'],
      ['They will come tomorrow.', '그들은 내일 올 것이다.'],
    ]},
  ]},
  { w: 'thing', p: 'n.', s: [
    { m: '것, 물건', syn: ['object'], ex: [
      ['Put your things in the bag.', '네 물건을 가방에 넣어라.'],
      ['That is a strange thing.', '그것은 이상한 것이다.'],
      ['Many things changed this year.', '올해 많은 것이 바뀌었다.'],
    ]},
  ]},
  { w: 'think', p: 'v.', s: [
    { m: '생각하다', syn: ['believe'], ex: [
      ['I think she is right.', '나는 그녀가 옳다고 생각한다.'],
      ['He thought about it all night.', '그는 밤새 그것을 생각했다.'],
      ['What are you thinking about?', '무슨 생각을 하고 있니?'],
    ]},
  ]},
  { w: 'think of', p: 'phr.', s: [
    { m: '~을 생각하다, 떠올리다', syn: ['think about'], ex: [
      ['I cannot think of his name.', '나는 그의 이름이 떠오르지 않는다.'],
      ['What do you think of this plan?', '이 계획을 어떻게 생각하니?'],
      ['She often thinks of her old school.', '그녀는 종종 옛 학교를 생각한다.'],
    ]},
  ]},
  { w: 'third', p: 'adj.', s: [
    { m: '세 번째의', syn: ['3rd'], ex: [
      ['She finished in third place.', '그녀는 3등으로 들어왔다.'],
      ['Our class is on the third floor.', '우리 교실은 3층에 있다.'],
      ['This is my third try.', '이번이 세 번째 시도다.'],
    ]},
  ]},
  { w: 'thirst', p: 'n.', s: [
    { m: '목마름, 갈증', syn: ['dryness'], ex: [
      ['Water is the best cure for thirst.', '물은 갈증에 가장 좋다.'],
      ['He felt a strong thirst.', '그는 심한 갈증을 느꼈다.'],
      ['Thirst made him stop walking.', '갈증 때문에 그는 걸음을 멈췄다.'],
    ]},
  ]},
  { w: 'thirsty', p: 'adj.', s: [
    { m: '목마른', syn: ['dry'], ex: [
      ["I'm thirsty. May I have water?", '목이 말라요. 물 좀 주시겠어요?'],
      ['Running makes me thirsty.', '달리면 목이 마르다.'],
      ['The plants look thirsty.', '식물들이 물이 필요해 보인다.'],
    ]},
  ]},
  { w: 'thirteen', p: 'num.', s: [
    { m: '열셋, 13', syn: ['13'], ex: [
      ['She is thirteen years old.', '그녀는 열세 살이다.'],
      ['Thirteen people came today.', '오늘 열세 명이 왔다.'],
      ['The box has thirteen apples.', '그 상자에는 사과가 열세 개 있다.'],
    ]},
  ]},
  { w: 'thirty', p: 'num.', s: [
    { m: '서른, 30', syn: ['30'], ex: [
      ['The class has thirty students.', '그 반은 학생이 서른 명이다.'],
      ['He is thirty years old.', '그는 서른 살이다.'],
      ['We waited thirty minutes.', '우리는 30분을 기다렸다.'],
    ]},
  ]},
  { w: 'this', p: 'pron.', s: [
    { m: '이것', syn: ['this one'], ex: [
      ['This is my notebook.', '이것은 내 공책이다.'],
      ['Read this before you go.', '가기 전에 이것을 읽어라.'],
      ['This tastes very good.', '이것은 아주 맛있다.'],
    ]},
  ]},
  { w: 'three', p: 'num.', s: [
    { m: '셋, 3', syn: ['3'], ex: [
      ['I have three brothers.', '나는 남자 형제가 셋이다.'],
      ['The movie is three hours long.', '그 영화는 세 시간짜리다.'],
      ['Three birds sat on the wire.', '새 세 마리가 전선에 앉았다.'],
    ]},
  ]},
  { w: 'ticket', p: 'n.', s: [
    { m: '표, 입장권', syn: ['pass'], ex: [
      ['I bought two tickets.', '나는 표 두 장을 샀다.'],
      ['The ticket costs ten dollars.', '표는 10달러다.'],
      ['Show your ticket at the gate.', '입구에서 표를 보여 주세요.'],
    ]},
  ]},
  { w: 'tiger', p: 'n.', s: [
    { m: '호랑이', syn: ['big cat'], ex: [
      ['The tiger is a strong animal.', '호랑이는 힘센 동물이다.'],
      ['We saw a tiger at the zoo.', '우리는 동물원에서 호랑이를 보았다.'],
      ['Tigers hunt alone.', '호랑이는 혼자 사냥한다.'],
    ]},
  ]},
  { w: 'time', p: 'n.', s: [
    { m: '시간, 때', syn: ['hour'], ex: [
      ['What time is it now?', '지금 몇 시니?'],
      ['We do not have much time.', '우리는 시간이 많지 않다.'],
      ['This is a good time to start.', '지금이 시작하기 좋은 때다.'],
    ]},
  ]},
  { w: 'tire', p: 'n.', s: [
    { m: '타이어', syn: ['wheel'], ex: [
      ['My bike has a flat tire.', '내 자전거는 타이어에 바람이 빠졌다.'],
      ['He changed the tire himself.', '그는 직접 타이어를 갈았다.'],
      ['The tire is worn out.', '타이어가 다 닳았다.'],
    ]},
  ]},
  { w: 'tired', p: 'adj.', s: [
    { m: '피곤한, 지친', syn: ['exhausted'], ex: [
      ['I am too tired to study.', '나는 너무 피곤해서 공부할 수 없다.'],
      ['She looked tired after the trip.', '그녀는 여행 후에 지쳐 보였다.'],
      ['He gets tired easily these days.', '그는 요즘 쉽게 피곤해진다.'],
    ]},
  ]},
  { w: 'to', p: 'prep.', s: [
    { m: '~로, ~에게', syn: ['toward'], ex: [
      ['I go to school by bus.', '나는 버스로 학교에 간다.'],
      ['Give this to your teacher.', '이것을 선생님께 드려라.'],
      ['She walked to the station.', '그녀는 역까지 걸어갔다.'],
    ]},
  ]},
  { w: 'today', p: 'n.', s: [
    { m: '오늘', syn: ['this day'], ex: [
      ['Today is my birthday.', '오늘은 내 생일이다.'],
      ['We have a test today.', '우리는 오늘 시험이 있다.'],
      ['Today feels warmer than yesterday.', '오늘은 어제보다 따뜻하다.'],
    ]},
  ]},
  { w: 'together', p: 'adv.', s: [
    { m: '함께, 같이', syn: [], ex: [
      ['We studied together last night.', '우리는 어젯밤에 함께 공부했다.'],
      ['Let us go to the museum together.', '함께 박물관에 가자.'],
      ['They worked together on the project.', '그들은 과제를 함께 했다.'],
    ]},
  ]},
  { w: 'tomato', p: 'n.', s: [
    { m: '토마토', syn: ['vegetable'], ex: [
      ['She cut the tomato in half.', '그녀는 토마토를 반으로 잘랐다.'],
      ['This tomato is very red.', '이 토마토는 아주 빨갛다.'],
      ['We grow tomatoes in the garden.', '우리는 정원에서 토마토를 기른다.'],
    ]},
  ]},
  { w: 'tomorrow', p: 'n.', s: [
    { m: '내일', syn: ['next day'], ex: [
      ['See you tomorrow.', '내일 보자.'],
      ['Tomorrow will be sunny.', '내일은 맑을 것이다.'],
      ['The test is tomorrow morning.', '시험은 내일 아침이다.'],
    ]},
  ]},
  { w: 'tonight', p: 'n.', s: [
    { m: '오늘 밤', syn: ['this night'], ex: [
      ['Let us watch a movie tonight.', '오늘 밤 영화를 보자.'],
      ['Tonight is very cold.', '오늘 밤은 아주 춥다.'],
      ['She will call me tonight.', '그녀가 오늘 밤 전화할 것이다.'],
    ]},
  ]},
  { w: 'too', p: 'adv.', s: [
    { m: '너무, ~도', syn: ['also'], ex: [
      ['This bag is too heavy.', '이 가방은 너무 무겁다.'],
      ['She came too.', '그녀도 왔다.'],
      ['It is too late to go out.', '나가기에는 너무 늦었다.'],
    ]},
  ]},
  { w: 'tooth', p: 'n.', s: [
    { m: '이, 치아', syn: ['teeth'], ex: [
      ['Brush your tooth carefully.', '이를 꼼꼼히 닦아라.'],
      ['My tooth hurts today.', '오늘 이가 아프다.'],
      ['The child lost a tooth.', '그 아이는 이가 하나 빠졌다.'],
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
  { w: 'toy', p: 'n.', s: [
    { m: '장난감', syn: ['plaything'], ex: [
      ['The baby likes this toy.', '아기는 이 장난감을 좋아한다.'],
      ['Put your toys in the box.', '장난감을 상자에 넣어라.'],
      ['He bought a new toy.', '그는 새 장난감을 샀다.'],
    ]},
  ]},
  { w: 'track', p: 'n.', s: [
    { m: '길, 트랙', syn: ['path'], ex: [
      ['They ran around the track.', '그들은 트랙을 돌며 달렸다.'],
      ['The train left the track.', '기차가 선로를 벗어났다.'],
      ['We followed the track into the woods.', '우리는 그 길을 따라 숲으로 들어갔다.'],
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
  { w: 'truck', p: 'n.', s: [
    { m: '트럭', syn: ['lorry'], ex: [
      ['A truck carried the boxes.', '트럭이 상자들을 실어 날랐다.'],
      ['The truck is too big for this road.', '그 트럭은 이 길에 너무 크다.'],
      ['He drives a truck for work.', '그는 일로 트럭을 운전한다.'],
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
