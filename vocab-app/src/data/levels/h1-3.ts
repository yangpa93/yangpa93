/**
 * 고등학교 1학년 레벨 3 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H1_3 = defineLevel('h1-3', [
  { w: 'shelter', p: 'n.', s: [
    { m: '보호소, 대피처', syn: ['refuge'], ex: [
      ['We found shelter from the rain.', '우리는 비를 피할 곳을 찾았다.'],
      ['The dog came from a shelter.', '그 개는 보호소에서 왔다.'],
      ['Trees give shelter to birds.', '나무는 새들에게 은신처가 된다.'],
    ]},
  ]},
  { w: 'shift', p: 'n.', s: [
    { m: '교대, 변화', syn: ['change'], ex: [
      ['She works the night shift.', '그녀는 야간 교대 근무를 한다.'],
      ['There was a shift in opinion.', '의견에 변화가 있었다.'],
      ['The shift ends at six.', '그 교대는 6시에 끝난다.'],
    ]},
  ]},
  { w: 'shine', p: 'v.', s: [
    { m: '빛나다, 비추다', syn: ['glow'], ex: [
      ['The sun is shining brightly.', '해가 밝게 빛나고 있다.'],
      ['Her eyes shone with joy.', '그녀의 눈이 기쁨으로 빛났다.'],
      ['Stars shine at night.', '별은 밤에 빛난다.'],
    ]},
  ]},
  { w: 'shock', p: 'n.', s: [
    { m: '충격', syn: ['jolt'], ex: [
      ['The news was a shock.', '그 소식은 충격이었다.'],
      ['She died of shock.', '그녀는 충격으로 죽었다.'],
      ['His answer gave me a shock.', '그의 답이 나에게 충격을 주었다.'],
    ]},
  ]},
  { w: 'shoot', p: 'v.', s: [
    { m: '쏘다, 슛하다', syn: ['fire'], ex: [
      ['Do not shoot at animals.', '동물에게 쏘지 마라.'],
      ['He shot the ball into the net.', '그는 공을 골대에 넣었다.'],
      ['She is shooting a film.', '그녀는 영화를 촬영하고 있다.'],
    ]},
  ]},
  { w: 'shore', p: 'n.', s: [
    { m: '해안, 물가', syn: ['coast'], ex: [
      ['We walked along the shore.', '우리는 물가를 따라 걸었다.'],
      ['The boat reached the shore.', '배가 해안에 닿았다.'],
      ['Shells lay on the shore.', '조개껍데기가 물가에 있었다.'],
    ]},
  ]},
  { w: 'shoulder', p: 'n.', s: [
    { m: '어깨', syn: ['joint'], ex: [
      ['My shoulder hurts today.', '오늘 어깨가 아프다.'],
      ['He carried the bag on his shoulder.', '그는 가방을 어깨에 멨다.'],
      ['She looked over her shoulder.', '그녀는 어깨 너머로 돌아봤다.'],
    ]},
  ]},
  { w: 'shout', p: 'v.', s: [
    { m: '소리치다, 외치다', syn: ['yell', 'cry out'], ex: [
      ['Do not shout in the classroom.', '교실에서 소리치지 마라.'],
      ['He shouted for help.', '그는 도와달라고 소리쳤다.'],
      ['She is shouting at the players.', '그녀는 선수들에게 외치고 있다.'],
    ]},
  ]},
  { w: 'shower', p: 'n.', s: [
    { m: '샤워, 소나기', syn: ['wash'], ex: [
      ['I take a shower every night.', '나는 매일 밤 샤워한다.'],
      ['A sudden shower soaked us.', '갑작스러운 소나기가 우리를 적셨다.'],
      ['The shower is not working.', '샤워기가 작동하지 않는다.'],
    ]},
  ]},
  { w: 'shut', p: 'v.', s: [
    { m: '닫다', syn: ['close'], ex: [
      ['Shut the door, please.', '문을 닫아 주세요.'],
      ['She shut her eyes tightly.', '그녀는 눈을 꼭 감았다.'],
      ['The shop shuts at nine.', '그 가게는 9시에 닫는다.'],
    ]},
  ]},
  { w: 'sight', p: 'n.', s: [
    { m: '시력, 광경', syn: ['vision'], ex: [
      ['Her sight is getting weak.', '그녀의 시력이 나빠지고 있다.'],
      ['The sight was beautiful.', '그 광경은 아름다웠다.'],
      ['He lost sight of the ship.', '그는 배를 시야에서 놓쳤다.'],
    ]},
  ]},
  { w: 'sign', p: 'n., v.', s: [
    { m: '표지판, 표시', syn: ['mark'], ex: [
      ['The sign says the road is closed.', '표지판에 길이 막혔다고 쓰여 있다.'],
      ['Follow the signs to the exit.', '출구 표지를 따라가라.'],
    ]},
    { m: '서명하다', syn: [], ex: [
      ['Please sign your name here.', '여기에 서명해 주세요.'],
      ['He signed the letter and sent it.', '그는 편지에 서명하고 부쳤다.'],
    ]},
  ]},
  { w: 'significant', p: 'adj.', s: [
    { m: '중요한, 상당한', syn: ['important', 'considerable'], ex: [
      ['There was a significant difference.', '상당한 차이가 있었다.'],
      ['This is a significant discovery.', '이것은 중요한 발견이다.'],
      ['Sales rose by a significant amount.', '매출이 상당한 액수만큼 올랐다.'],
    ]},
  ]},
  { w: 'silly', p: 'adj.', s: [
    { m: '어리석은, 우스운', syn: ['foolish'], ex: [
      ['That was a silly mistake.', '그것은 어리석은 실수였다.'],
      ['Do not be silly.', '바보같이 굴지 마라.'],
      ['He told a silly joke.', '그는 우스운 농담을 했다.'],
    ]},
  ]},
  { w: 'silver', p: 'n.', s: [
    { m: '은', syn: ['precious metal'], ex: [
      ['The ring is made of silver.', '그 반지는 은으로 만들어졌다.'],
      ['She won a silver medal.', '그녀는 은메달을 땄다.'],
      ['Silver turns dark over time.', '은은 시간이 지나면 검어진다.'],
    ]},
  ]},
  { w: 'similar', p: 'adj.', s: [
    { m: '비슷한, 유사한', syn: ['alike', 'like'], ex: [
      ['Our ideas are similar.', '우리 생각은 비슷하다.'],
      ['The twins look very similar.', '그 쌍둥이는 매우 닮았다.'],
      ['This is similar to what we saw before.', '이것은 우리가 전에 본 것과 비슷하다.'],
    ]},
  ]},
  { w: 'simple', p: 'adj.', s: [
    { m: '간단한, 단순한', syn: ['easy', 'plain'], ex: [
      ['The rule is very simple.', '그 규칙은 아주 간단하다.'],
      ['She lives a simple life.', '그녀는 단순한 삶을 산다.'],
      ['Here is a simple way to solve it.', '그것을 푸는 간단한 방법이 있다.'],
    ]},
  ]},
  { w: 'since', p: 'conj.', s: [
    { m: '~ 이후로, ~ 때문에', syn: ['as'], ex: [
      ['I have lived here since 2020.', '나는 2020년부터 여기 살았다.'],
      ['Since it rained, we stayed home.', '비가 와서 우리는 집에 있었다.'],
      ['She has not called since then.', '그녀는 그 후로 전화하지 않았다.'],
    ]},
  ]},
  { w: 'single', p: 'adj.', s: [
    { m: '하나의, 혼자의', syn: ['sole'], ex: [
      ['Not a single person came.', '단 한 사람도 오지 않았다.'],
      ['She lives in a single room.', '그녀는 단칸방에 산다.'],
      ['He is still single.', '그는 아직 미혼이다.'],
    ]},
  ]},
  { w: 'sink', p: 'v.', s: [
    { m: '가라앉다', syn: ['submerge'], ex: [
      ['The boat began to sink.', '배가 가라앉기 시작했다.'],
      ['The coin sank to the bottom.', '동전이 바닥으로 가라앉았다.'],
      ['Wood does not sink in water.', '나무는 물에 가라앉지 않는다.'],
    ]},
  ]},
  { w: 'site', p: 'n.', s: [
    { m: '장소, 부지', syn: ['location'], ex: [
      ['They chose a site for the school.', '그들은 학교 부지를 골랐다.'],
      ['The site is near the river.', '그 부지는 강 근처에 있다.'],
      ['This web site is useful.', '이 웹사이트는 유용하다.'],
    ]},
  ]},
  { w: 'situate', p: 'v.', s: [
    { m: '위치시키다', syn: ['locate'], ex: [
      ['The house is situated on a hill.', '그 집은 언덕에 자리 잡고 있다.'],
      ['They situated the desk by the window.', '그들은 책상을 창가에 두었다.'],
      ['The town is situated near the sea.', '그 마을은 바다 근처에 있다.'],
    ]},
  ]},
  { w: 'skill', p: 'n.', s: [
    { m: '기술, 능력', syn: ['ability', 'technique'], ex: [
      ['Cooking is a useful skill.', '요리는 유용한 기술이다.'],
      ['He has great computer skills.', '그는 뛰어난 컴퓨터 기술을 가지고 있다.'],
      ['Listening is an important language skill.', '듣기는 중요한 언어 기술이다.'],
    ]},
  ]},
  { w: 'slave', p: 'n.', s: [
    { m: '노예', syn: ['servant'], ex: [
      ['Slaves had no freedom.', '노예에게는 자유가 없었다.'],
      ['He worked like a slave.', '그는 노예처럼 일했다.'],
      ['The story is about a slave.', '그 이야기는 한 노예에 관한 것이다.'],
    ]},
  ]},
  { w: 'slide', p: 'v.', s: [
    { m: '미끄러지다', syn: ['glide'], ex: [
      ['The children slide on the ice.', '아이들이 얼음 위에서 미끄러진다.'],
      ['The box slid off the table.', '상자가 탁자에서 미끄러졌다.'],
      ['She is sliding down the hill.', '그녀는 언덕을 미끄러져 내려가고 있다.'],
    ]},
  ]},
  { w: 'slight', p: 'adj.', s: [
    { m: '약간의, 가벼운', syn: ['small'], ex: [
      ['There was a slight change.', '약간의 변화가 있었다.'],
      ['She has a slight cold.', '그녀는 가벼운 감기에 걸렸다.'],
      ['A slight noise woke me.', '작은 소리가 나를 깨웠다.'],
    ]},
  ]},
  { w: 'slip', p: 'v.', s: [
    { m: '미끄러지다, 빠져나가다', syn: ['slide'], ex: [
      ['He slipped on the wet floor.', '그는 젖은 바닥에서 미끄러졌다.'],
      ['The glass slipped from my hand.', '유리잔이 내 손에서 미끄러졌다.'],
      ['Time slips away quickly.', '시간은 빠르게 흘러간다.'],
    ]},
  ]},
  { w: 'smart', p: 'adj.', s: [
    { m: '똑똑한, 영리한', syn: ['clever', 'bright'], ex: [
      ['She is a smart student.', '그녀는 똑똑한 학생이다.'],
      ['That was a smart choice.', '그것은 현명한 선택이었다.'],
      ['Dogs are smart animals.', '개는 영리한 동물이다.'],
    ]},
  ]},
  { w: 'smash', p: 'v.', s: [
    { m: '박살내다, 부수다', syn: ['shatter'], ex: [
      ['He smashed the window.', '그는 창문을 박살냈다.'],
      ['The plate smashed on the floor.', '접시가 바닥에서 산산조각 났다.'],
      ['Waves smash against the rocks.', '파도가 바위에 부딪쳐 부서진다.'],
    ]},
  ]},
  { w: 'smoke', p: 'n.', s: [
    { m: '연기', syn: ['fumes'], ex: [
      ['Smoke rose from the chimney.', '굴뚝에서 연기가 올랐다.'],
      ['The smoke made us cough.', '연기 때문에 우리는 기침했다.'],
      ['Smoke means fire nearby.', '연기는 근처에 불이 있다는 뜻이다.'],
    ]},
  ]},
  { w: 'smooth', p: 'adj.', s: [
    { m: '매끄러운, 순조로운', syn: ['even'], ex: [
      ['The table is smooth.', '그 탁자는 매끄럽다.'],
      ['We had a smooth trip.', '우리는 순조로운 여행을 했다.'],
      ['Her skin feels smooth.', '그녀의 피부는 매끄럽다.'],
    ]},
  ]},
  { w: 'snack', p: 'n.', s: [
    { m: '간식', syn: ['light food'], ex: [
      ['She ate a snack after school.', '그녀는 방과 후 간식을 먹었다.'],
      ['This snack is too salty.', '이 간식은 너무 짜다.'],
      ['We packed snacks for the trip.', '우리는 여행용 간식을 쌌다.'],
    ]},
  ]},
  { w: 'snake', p: 'n.', s: [
    { m: '뱀', syn: ['serpent'], ex: [
      ['A snake crossed the path.', '뱀 한 마리가 길을 건너갔다.'],
      ['Snakes hide under rocks.', '뱀은 바위 밑에 숨는다.'],
      ['She is afraid of snakes.', '그녀는 뱀을 무서워한다.'],
    ]},
  ]},
  { w: 'snap', p: 'v.', s: [
    { m: '딱 부러지다, 찰칵 찍다', syn: ['break'], ex: [
      ['The branch snapped in the wind.', '바람에 나뭇가지가 딱 부러졌다.'],
      ['She snapped a photo quickly.', '그녀는 재빨리 사진을 찍었다.'],
      ['He snapped the pencil in two.', '그는 연필을 두 동강 냈다.'],
    ]},
  ]},
  { w: 'social', p: 'adj.', s: [
    { m: '사회의, 사교적인', syn: ['communal'], ex: [
      ['Social rules differ by country.', '사회 규범은 나라마다 다르다.'],
      ['She is a social person.', '그녀는 사교적인 사람이다.'],
      ['Social media changed everything.', '소셜 미디어가 모든 것을 바꿨다.'],
    ]},
  ]},
  { w: 'society', p: 'n.', s: [
    { m: '사회', syn: ['community', 'the public'], ex: [
      ['Technology changes society.', '기술은 사회를 변화시킨다.'],
      ['Every member of society has a role.', '사회의 모든 구성원은 역할이 있다.'],
      ['Modern society moves very fast.', '현대 사회는 매우 빠르게 움직인다.'],
    ]},
  ]},
  { w: 'soil', p: 'n.', s: [
    { m: '흙, 토양', syn: ['earth'], ex: [
      ['Plants need good soil.', '식물은 좋은 흙이 필요하다.'],
      ['The soil here is dry.', '여기 토양은 건조하다.'],
      ['She dug into the soil.', '그녀는 흙을 팠다.'],
    ]},
  ]},
  { w: 'soldier', p: 'n.', s: [
    { m: '군인, 병사', syn: ['warrior'], ex: [
      ['The soldier stood at the gate.', '군인이 정문에 서 있었다.'],
      ['Soldiers train every day.', '군인들은 매일 훈련한다.'],
      ['He became a soldier at twenty.', '그는 스무 살에 군인이 되었다.'],
    ]},
  ]},
  { w: 'solid', p: 'adj.', s: [
    { m: '단단한, 고체의', syn: ['firm'], ex: [
      ['Ice is solid water.', '얼음은 고체 상태의 물이다.'],
      ['The wall is solid stone.', '그 벽은 단단한 돌이다.'],
      ['We need solid evidence.', '우리는 확실한 증거가 필요하다.'],
    ]},
  ]},
  { w: 'solve', p: 'v.', s: [
    { m: '풀다, 해결하다', syn: ['work out', 'figure out'], ex: [
      ['Can you solve this puzzle?', '이 퍼즐을 풀 수 있니?'],
      ['We solved the problem in ten minutes.', '우리는 10분 만에 그 문제를 풀었다.'],
      ['Talking can solve many problems.', '대화는 많은 문제를 해결할 수 있다.'],
    ]},
  ]},
  { w: 'somewhat', p: 'adv.', s: [
    { m: '다소, 어느 정도', syn: ['rather'], ex: [
      ['The answer is somewhat unclear.', '그 답은 다소 불분명하다.'],
      ['She looked somewhat tired.', '그녀는 다소 피곤해 보였다.'],
      ['Prices rose somewhat this year.', '올해 물가가 다소 올랐다.'],
    ]},
  ]},
  { w: 'soon', p: 'adv.', s: [
    { m: '곧, 빨리', syn: ['shortly'], ex: [
      ['She will arrive soon.', '그녀는 곧 도착할 것이다.'],
      ['Come back as soon as you can.', '가능한 한 빨리 돌아와라.'],
      ['Winter will come soon.', '겨울이 곧 올 것이다.'],
    ]},
  ]},
  { w: 'sore', p: 'adj.', s: [
    { m: '아픈, 쓰린', syn: ['painful'], ex: [
      ['My throat is sore.', '목이 아프다.'],
      ['His legs were sore after the run.', '달린 뒤 그의 다리가 쑤셨다.'],
      ['She has a sore shoulder.', '그녀는 어깨가 결린다.'],
    ]},
  ]},
  { w: 'sort', p: 'n.', s: [
    { m: '종류, 부류', syn: ['kind'], ex: [
      ['What sort of music do you like?', '어떤 종류의 음악을 좋아하니?'],
      ['This sort of problem is common.', '이런 종류의 문제는 흔하다.'],
      ['He is a kind sort of person.', '그는 친절한 부류의 사람이다.'],
    ]},
  ]},
  { w: 'soul', p: 'n.', s: [
    { m: '영혼, 마음', syn: ['spirit'], ex: [
      ['Music touches the soul.', '음악은 영혼을 어루만진다.'],
      ['Not a soul was in the street.', '거리에 사람 하나 없었다.'],
      ['She put her soul into the work.', '그녀는 그 일에 온 마음을 쏟았다.'],
    ]},
  ]},
  { w: 'sour', p: 'adj.', s: [
    { m: '신, 시큼한', syn: ['tart'], ex: [
      ['This lemon is very sour.', '이 레몬은 아주 시다.'],
      ['The milk turned sour.', '우유가 상해서 시어졌다.'],
      ['She made a sour face.', '그녀는 시큰둥한 표정을 지었다.'],
    ]},
  ]},
  { w: 'source', p: 'n.', s: [
    { m: '원천, 근원', syn: ['origin', 'root'], ex: [
      ['The sun is a source of energy.', '태양은 에너지의 원천이다.'],
      ['Stress is a source of many illnesses.', '스트레스는 많은 질병의 근원이다.'],
    ]},
    { m: '출처, 정보원', syn: ['reference'], ex: [
      ['Always check your sources.', '항상 출처를 확인해라.'],
      ['The news came from a reliable source.', '그 소식은 믿을 만한 출처에서 왔다.'],
    ]},
  ]},
  { w: 'spare', p: 'adj.', s: [
    { m: '여분의', syn: ['extra'], ex: [
      ['Bring a spare pen.', '여분의 펜을 가져와라.'],
      ['We have a spare room.', '우리는 남는 방이 하나 있다.'],
      ['He has little spare time.', '그는 여가 시간이 거의 없다.'],
    ]},
  ]},
  { w: 'species', p: 'n.', s: [
    { m: '종', syn: ['kind of living thing'], ex: [
      ['This species is endangered.', '이 종은 멸종 위기다.'],
      ['Many species live in the forest.', '많은 종이 숲에 산다.'],
      ['A new species was found.', '새로운 종이 발견되었다.'],
    ]},
  ]},
  { w: 'specific', p: 'adj.', s: [
    { m: '구체적인', syn: ['detailed', 'precise'], ex: [
      ['Give me a specific example.', '구체적인 예를 들어 줘.'],
      ['Can you be more specific?', '좀 더 구체적으로 말해 줄 수 있니?'],
    ]},
    { m: '특정한', syn: ['particular'], ex: [
      ['This medicine treats a specific disease.', '이 약은 특정 질병을 치료한다.'],
      ['Each student has a specific role.', '각 학생은 특정한 역할이 있다.'],
    ]},
  ]},
  { w: 'speech', p: 'n.', s: [
    { m: '연설, 말', syn: ['talk'], ex: [
      ['She gave a speech at the festival.', '그녀는 축제에서 연설했다.'],
      ['His speech was short but powerful.', '그의 연설은 짧지만 강력했다.'],
      ['I am nervous about my speech.', '나는 연설이 걱정된다.'],
    ]},
  ]},
  { w: 'spell', p: 'v.', s: [
    { m: '철자를 쓰다', syn: [], ex: [
      ['How do you spell your name?', '이름 철자가 어떻게 되나요?'],
      ['She spelled the word correctly.', '그녀는 그 단어의 철자를 바르게 썼다.'],
      ['I always spell this word wrong.', '나는 늘 이 단어의 철자를 틀린다.'],
    ]},
  ]},
  { w: 'spend', p: 'v.', s: [
    { m: '(시간을) 보내다', syn: ['pass'], ex: [
      ['I spend two hours studying.', '나는 공부하는 데 두 시간을 쓴다.'],
      ['We spent the weekend at home.', '우리는 주말을 집에서 보냈다.'],
    ]},
    { m: '(돈을) 쓰다', syn: ['pay out'], ex: [
      ['He spent all his money on books.', '그는 돈을 전부 책에 썼다.'],
      ['Don’t spend too much on snacks.', '간식에 너무 많이 쓰지 마라.'],
    ]},
  ]},
  { w: 'spin', p: 'v.', s: [
    { m: '돌다, 회전하다', syn: ['rotate'], ex: [
      ['The wheel spins fast.', '바퀴가 빠르게 돈다.'],
      ['She spun around once.', '그녀는 한 바퀴 돌았다.'],
      ['The earth is spinning.', '지구는 자전하고 있다.'],
    ]},
  ]},
  { w: 'spirit', p: 'n.', s: [
    { m: '정신, 영혼', syn: ['soul'], ex: [
      ['The team showed great spirit.', '그 팀은 대단한 정신력을 보였다.'],
      ['Her spirit never broke.', '그녀의 정신은 결코 꺾이지 않았다.'],
      ['Spirit matters more than size.', '정신이 몸집보다 중요하다.'],
    ]},
  ]},
  { w: 'spoil', p: 'v.', s: [
    { m: '망치다, 상하다', syn: ['ruin'], ex: [
      ['Rain spoiled the picnic.', '비가 소풍을 망쳤다.'],
      ['The milk spoiled quickly.', '우유가 빨리 상했다.'],
      ['Do not spoil the child.', '아이를 버릇없게 키우지 마라.'],
    ]},
  ]},
  { w: 'sponsor', p: 'n.', s: [
    { m: '후원자', syn: ['backer'], ex: [
      ['The team found a sponsor.', '그 팀은 후원자를 찾았다.'],
      ['A sponsor paid for the trip.', '후원자가 여행 비용을 냈다.'],
      ['She became our sponsor.', '그녀가 우리 후원자가 되었다.'],
    ]},
  ]},
  { w: 'spot', p: 'n.', s: [
    { m: '점, 장소', syn: ['place'], ex: [
      ['There is a spot on my shirt.', '내 셔츠에 얼룩이 있다.'],
      ['This is a good spot to rest.', '여기는 쉬기 좋은 장소다.'],
      ['She found a quiet spot.', '그녀는 조용한 자리를 찾았다.'],
    ]},
  ]},
  { w: 'spray', p: 'v.', s: [
    { m: '뿌리다', syn: ['sprinkle'], ex: [
      ['She sprayed water on the plants.', '그녀는 식물에 물을 뿌렸다.'],
      ['Do not spray it on your face.', '얼굴에 뿌리지 마라.'],
      ['He is spraying paint on the wall.', '그는 벽에 페인트를 뿌리고 있다.'],
    ]},
  ]},
  { w: 'spread', p: 'v.', s: [
    { m: '퍼지다, 확산되다', syn: ['expand', 'scatter'], ex: [
      ['The news spread quickly.', '그 소식은 빠르게 퍼졌다.'],
      ['The fire spread to nearby houses.', '불이 근처 집들로 번졌다.'],
    ]},
    { m: '펼치다, 바르다', syn: ['open out', 'apply'], ex: [
      ['She spread a map on the table.', '그녀는 탁자 위에 지도를 펼쳤다.'],
      ['Spread butter on the bread.', '빵에 버터를 발라라.'],
    ]},
  ]},
  { w: 'spy', p: 'n.', s: [
    { m: '간첩, 스파이', syn: [], ex: [
      ['The story is about a spy.', '그 이야기는 스파이에 관한 것이다.'],
      ['A spy passed the message.', '스파이가 메시지를 전달했다.'],
      ['He worked as a spy.', '그는 첩보원으로 일했다.'],
    ]},
  ]},
  { w: 'square', p: 'n.', s: [
    { m: '정사각형, 광장', syn: ['four-sided figure'], ex: [
      ['Draw a square here.', '여기에 정사각형을 그려라.'],
      ['We met in the town square.', '우리는 마을 광장에서 만났다.'],
      ['The square has four equal sides.', '정사각형은 네 변이 같다.'],
    ]},
  ]},
  { w: 'stable', p: 'adj.', s: [
    { m: '안정된', syn: ['steady', 'secure'], ex: [
      ['Prices have been stable this year.', '올해 물가는 안정적이었다.'],
      ['He is in stable condition.', '그는 상태가 안정적이다.'],
      ['We need a stable internet connection.', '우리는 안정적인 인터넷 연결이 필요하다.'],
    ]},
  ]},
  { w: 'stage', p: 'n.', s: [
    { m: '무대, 단계', syn: ['platform'], ex: [
      ['She stood on the stage.', '그녀는 무대에 섰다.'],
      ['This is the first stage.', '이것이 첫 단계다.'],
      ['The stage was brightly lit.', '무대가 밝게 비춰졌다.'],
    ]},
  ]},
  { w: 'stairs', p: 'n.', s: [
    { m: '계단', syn: ['steps'], ex: [
      ['Be careful on the stairs.', '계단에서 조심해라.'],
      ['She ran up the stairs.', '그녀는 계단을 뛰어 올라갔다.'],
      ['The stairs are very steep.', '그 계단은 아주 가파르다.'],
    ]},
  ]},
  { w: 'stamp', p: 'n.', s: [
    { m: '우표, 도장', syn: ['seal'], ex: [
      ['Put a stamp on the letter.', '편지에 우표를 붙여라.'],
      ['He collects old stamps.', '그는 옛 우표를 모은다.'],
      ['The stamp shows a bird.', '그 우표에는 새가 그려져 있다.'],
    ]},
  ]},
  { w: 'standard', p: 'n.', s: [
    { m: '기준, 수준', syn: ['criterion'], ex: [
      ['The standard is very high.', '그 기준은 아주 높다.'],
      ['We set a new standard.', '우리는 새 기준을 세웠다.'],
      ['Her work meets the standard.', '그녀의 작업은 기준에 맞는다.'],
    ]},
  ]},
  { w: 'stare', p: 'v.', s: [
    { m: '빤히 보다, 응시하다', syn: ['gaze'], ex: [
      ['Do not stare at people.', '사람을 빤히 쳐다보지 마라.'],
      ['She stared at the painting.', '그녀는 그림을 응시했다.'],
      ['He is staring out the window.', '그는 창밖을 응시하고 있다.'],
    ]},
  ]},
  { w: 'state', p: 'n.', s: [
    { m: '상태, 국가', syn: ['condition'], ex: [
      ['The house is in poor state.', '그 집은 상태가 나쁘다.'],
      ['Each state has its own law.', '각 주는 고유한 법이 있다.'],
      ['Her state of mind improved.', '그녀의 마음 상태가 나아졌다.'],
    ]},
  ]},
  { w: 'station', p: 'n.', s: [
    { m: '역, 정거장', syn: [], ex: [
      ['Meet me at the subway station.', '지하철역에서 만나자.'],
      ['The station is crowded in the morning.', '역은 아침에 붐빈다.'],
      ['We got off at the next station.', '우리는 다음 역에서 내렸다.'],
    ]},
  ]},
  { w: 'steady', p: 'adj.', s: [
    { m: '꾸준한, 안정된', syn: ['constant'], ex: [
      ['She made steady progress.', '그녀는 꾸준히 발전했다.'],
      ['Keep the ladder steady.', '사다리를 안정되게 잡아라.'],
      ['A steady rain fell all day.', '하루 종일 꾸준히 비가 내렸다.'],
    ]},
  ]},
  { w: 'steal', p: 'v.', s: [
    { m: '훔치다', syn: ['take without permission'], ex: [
      ['Someone stole my umbrella.', '누군가 내 우산을 훔쳐 갔다.'],
      ['Do not steal other peoples things.', '남의 물건을 훔치지 마라.'],
      ['The thief was stealing from the shop.', '도둑이 가게에서 물건을 훔치고 있었다.'],
    ]},
  ]},
  { w: 'steam', p: 'n.', s: [
    { m: '증기, 김', syn: ['vapor'], ex: [
      ['Steam rose from the pot.', '냄비에서 김이 올랐다.'],
      ['The engine runs on steam.', '그 기관은 증기로 움직인다.'],
      ['Steam fogged the mirror.', '김이 거울을 흐리게 했다.'],
    ]},
  ]},
  { w: 'steel', p: 'n.', s: [
    { m: '강철', syn: ['metal'], ex: [
      ['The bridge is made of steel.', '그 다리는 강철로 만들어졌다.'],
      ['Steel is stronger than iron.', '강철은 철보다 강하다.'],
      ['They produce steel here.', '그들은 여기서 강철을 생산한다.'],
    ]},
  ]},
  { w: 'step', p: 'n.', s: [
    { m: '걸음, 단계', syn: ['stage'], ex: [
      ['Take one step forward.', '한 걸음 앞으로 나오세요.'],
      ['The first step is the hardest.', '첫 단계가 가장 어렵다.'],
      ['Follow these steps carefully.', '이 단계들을 주의 깊게 따라 하세요.'],
    ]},
  ]},
  { w: 'stick', p: 'n.', s: [
    { m: '막대기', syn: ['rod'], ex: [
      ['The dog carried a stick.', '개가 막대기를 물고 갔다.'],
      ['She drew with a stick.', '그녀는 막대기로 그렸다.'],
      ['Pick up that stick.', '저 막대기를 주워라.'],
    ]},
  ]},
  { w: 'still', p: 'adv.', s: [
    { m: '여전히, 아직', syn: ['yet'], ex: [
      ['She is still waiting.', '그녀는 아직 기다리고 있다.'],
      ['It is still raining.', '아직 비가 오고 있다.'],
      ['He still lives here.', '그는 여전히 여기 산다.'],
    ]},
  ]},
  { w: 'stir', p: 'v.', s: [
    { m: '젓다, 휘젓다', syn: ['mix'], ex: [
      ['Stir the soup slowly.', '국을 천천히 저어라.'],
      ['She stirred sugar into the tea.', '그녀는 차에 설탕을 저어 넣었다.'],
      ['He is stirring the pot.', '그는 냄비를 젓고 있다.'],
    ]},
  ]},
  { w: 'stock', p: 'n.', s: [
    { m: '재고, 주식', syn: ['supply'], ex: [
      ['The item is out of stock.', '그 물건은 품절이다.'],
      ['He bought stock in the company.', '그는 그 회사 주식을 샀다.'],
      ['We keep a stock of rice.', '우리는 쌀을 비축해 둔다.'],
    ]},
  ]},
  { w: 'stomach', p: 'n.', s: [
    { m: '위, 배', syn: ['belly'], ex: [
      ['My stomach hurts.', '배가 아프다.'],
      ['Do not swim on a full stomach.', '배부를 때 수영하지 마라.'],
      ['The stomach digests food.', '위는 음식을 소화한다.'],
    ]},
  ]},
  { w: 'storm', p: 'n.', s: [
    { m: '폭풍, 폭풍우', syn: [], ex: [
      ['The storm broke many trees.', '폭풍이 많은 나무를 쓰러뜨렸다.'],
      ['We stayed inside during the storm.', '우리는 폭풍이 부는 동안 안에 있었다.'],
      ['A big storm is coming tonight.', '오늘 밤 큰 폭풍이 온다.'],
    ]},
  ]},
  { w: 'straight', p: 'adj., adv.', s: [
    { m: '곧은, 곧장', syn: ['direct'], ex: [
      ['Go straight and turn left.', '곧장 가다가 왼쪽으로 도세요.'],
      ['Draw a straight line here.', '여기에 직선을 그으세요.'],
      ['He went straight home after school.', '그는 방과 후 곧장 집에 갔다.'],
    ]},
  ]},
  { w: 'strange', p: 'adj.', s: [
    { m: '이상한', syn: ['odd', 'weird'], ex: [
      ['I heard a strange sound.', '나는 이상한 소리를 들었다.'],
      ['It is strange that he did not come.', '그가 오지 않은 것은 이상하다.'],
    ]},
    { m: '낯선', syn: ['unfamiliar'], ex: [
      ['Everything looked strange in the new city.', '새 도시에서는 모든 것이 낯설어 보였다.'],
      ['Do not talk to strange people.', '낯선 사람과 이야기하지 마라.'],
    ]},
  ]},
  { w: 'strategy', p: 'n.', s: [
    { m: '전략', syn: ['plan', 'approach'], ex: [
      ['We need a better strategy.', '우리는 더 나은 전략이 필요하다.'],
      ['Her study strategy really works.', '그녀의 공부 전략은 정말 효과가 있다.'],
      ['The team changed its strategy at halftime.', '그 팀은 하프타임에 전략을 바꿨다.'],
    ]},
  ]},
  { w: 'strawberry', p: 'n.', s: [
    { m: '딸기', syn: [], ex: [
      ['These strawberries are sweet.', '이 딸기들은 달다.'],
      ['She grows strawberry at home.', '그녀는 집에서 딸기를 기른다.'],
      ['He ate a whole strawberry cake.', '그는 딸기 케이크를 통째로 먹었다.'],
    ]},
  ]},
  { w: 'stream', p: 'n.', s: [
    { m: '시내, 흐름', syn: ['brook'], ex: [
      ['A small stream runs here.', '작은 시내가 여기 흐른다.'],
      ['The stream is very clear.', '그 시내는 아주 맑다.'],
      ['A stream of people passed by.', '사람들의 물결이 지나갔다.'],
    ]},
  ]},
  { w: 'stress', p: 'n.', s: [
    { m: '스트레스, 압박', syn: ['pressure'], ex: [
      ['Exercise helps reduce stress.', '운동은 스트레스를 줄이는 데 도움이 된다.'],
      ['She is under a lot of stress.', '그녀는 스트레스를 많이 받고 있다.'],
      ['Too much stress is bad for health.', '스트레스가 너무 많으면 건강에 나쁘다.'],
    ]},
  ]},
  { w: 'stretch', p: 'v.', s: [
    { m: '늘리다, 뻗다', syn: ['extend'], ex: [
      ['Stretch your arms up.', '팔을 위로 뻗어라.'],
      ['She stretched before running.', '그녀는 달리기 전에 스트레칭을 했다.'],
      ['The road stretches for miles.', '그 길은 몇 마일이나 뻗어 있다.'],
    ]},
  ]},
  { w: 'strike', p: 'v.', s: [
    { m: '치다, 부딪치다', syn: ['hit'], ex: [
      ['Lightning struck the tree.', '번개가 나무를 쳤다.'],
      ['The clock struck twelve.', '시계가 열두 시를 쳤다.'],
      ['An idea struck me suddenly.', '갑자기 생각이 떠올랐다.'],
    ]},
  ]},
  { w: 'string', p: 'n.', s: [
    { m: '끈, 줄', syn: ['cord'], ex: [
      ['Tie the box with string.', '끈으로 상자를 묶어라.'],
      ['The guitar string broke.', '기타 줄이 끊어졌다.'],
      ['She cut a piece of string.', '그녀는 끈을 한 조각 잘랐다.'],
    ]},
  ]},
  { w: 'structure', p: 'n.', s: [
    { m: '구조, 건축물', syn: ['framework'], ex: [
      ['The structure of the sentence is simple.', '그 문장의 구조는 단순하다.'],
      ['They built a tall structure.', '그들은 높은 건축물을 지었다.'],
      ['Every story has a structure.', '모든 이야기에는 구조가 있다.'],
    ]},
  ]},
  { w: 'struggle', p: 'v., n.', s: [
    { m: '애쓰다, 고군분투하다', syn: ['strive', 'have trouble'], ex: [
      ['He struggled to finish the race.', '그는 경주를 마치려고 애썼다.'],
      ['She struggles with math.', '그녀는 수학을 힘들어한다.'],
      ['Life was a struggle for them.', '그들에게 삶은 투쟁이었다.'],
    ]},
  ]},
  { w: 'studio', p: 'n.', s: [
    { m: '작업실, 스튜디오', syn: ['workshop'], ex: [
      ['She works in a small studio.', '그녀는 작은 작업실에서 일한다.'],
      ['The studio has good light.', '그 스튜디오는 채광이 좋다.'],
      ['They recorded in a studio.', '그들은 스튜디오에서 녹음했다.'],
    ]},
  ]},
  { w: 'stuff', p: 'n.', s: [
    { m: '물건, 것', syn: ['things'], ex: [
      ['Put your stuff in the box.', '네 물건을 상자에 넣어라.'],
      ['There is too much stuff here.', '여기 물건이 너무 많다.'],
      ['She sold her old stuff.', '그녀는 헌 물건들을 팔았다.'],
    ]},
  ]},
  { w: 'subject', p: 'n.', s: [
    { m: '과목', syn: ['course'], ex: [
      ['English is my favorite subject.', '영어는 내가 제일 좋아하는 과목이다.'],
      ['We study six subjects this year.', '우리는 올해 여섯 과목을 배운다.'],
    ]},
    { m: '주제, 화제', syn: ['topic'], ex: [
      ['Let us change the subject.', '주제를 바꾸자.'],
      ['The subject of the talk was health.', '그 강연의 주제는 건강이었다.'],
    ]},
  ]},
  { w: 'succeed', p: 'v.', s: [
    { m: '성공하다', syn: ['do well', 'make it'], ex: [
      ['She succeeded after many tries.', '그녀는 여러 번 시도한 끝에 성공했다.'],
      ['You will succeed if you keep trying.', '계속 노력하면 성공할 것이다.'],
      ['The plan succeeded beyond our hopes.', '그 계획은 기대 이상으로 성공했다.'],
    ]},
  ]},
  { w: 'success', p: 'n.', s: [
    { m: '성공', syn: ['achievement'], ex: [
      ['Her success surprised no one.', '그녀의 성공에 놀란 사람은 없었다.'],
      ['Success takes hard work.', '성공에는 노력이 필요하다.'],
      ['The show was a big success.', '그 공연은 큰 성공이었다.'],
    ]},
  ]},
  { w: 'such', p: 'adj.', s: [
    { m: '그러한, 그런', syn: ['of that kind'], ex: [
      ['I never saw such a thing.', '나는 그런 것을 본 적이 없다.'],
      ['Such people are rare.', '그런 사람은 드물다.'],
      ['It was such a nice day.', '정말 좋은 날이었다.'],
    ]},
  ]},
  { w: 'sudden', p: 'adj.', s: [
    { m: '갑작스러운', syn: ['abrupt', 'unexpected'], ex: [
      ['There was a sudden noise.', '갑작스러운 소음이 났다.'],
      ['His sudden change surprised us.', '그의 갑작스러운 변화가 우리를 놀라게 했다.'],
      ['All of a sudden, it began to rain.', '갑자기 비가 오기 시작했다.'],
    ]},
  ]},
  { w: 'suffer', p: 'v.', s: [
    { m: '고통받다, 겪다', syn: ['endure'], ex: [
      ['Many people suffered from the flood.', '많은 사람이 홍수로 고통받았다.'],
      ['She suffers from headaches.', '그녀는 두통을 앓는다.'],
      ['The plants suffered in the heat.', '식물이 더위에 시달렸다.'],
    ]},
  ]},
  { w: 'sufficient', p: 'adj.', s: [
    { m: '충분한', syn: ['enough', 'adequate'], ex: [
      ['We have sufficient supplies.', '우리는 충분한 물자를 가지고 있다.'],
      ['Is one hour sufficient?', '한 시간이면 충분하니?'],
      ['There was not sufficient evidence.', '충분한 증거가 없었다.'],
    ]},
  ]},
  { w: 'suggest', p: 'v.', s: [
    { m: '제안하다', syn: ['propose', 'recommend'], ex: [
      ['I suggest starting early.', '나는 일찍 시작할 것을 제안한다.'],
      ['She suggested a different plan.', '그녀는 다른 계획을 제안했다.'],
      ['May I suggest something?', '한 가지 제안해도 될까요?'],
    ]},
  ]},
  { w: 'suit', p: 'v.', s: [
    { m: '어울리다, 맞다', syn: ['fit'], ex: [
      ['That color suits you.', '그 색이 너에게 어울린다.'],
      ['The time does not suit me.', '그 시간은 나에게 맞지 않는다.'],
      ['This job suits her well.', '이 일은 그녀에게 잘 맞는다.'],
    ]},
  ]},
  { w: 'sum', p: 'n.', s: [
    { m: '합계, 금액', syn: ['total'], ex: [
      ['The sum is fifty.', '합계는 50이다.'],
      ['He paid a large sum.', '그는 큰 금액을 냈다.'],
      ['Add the numbers and find the sum.', '숫자를 더해 합을 구해라.'],
    ]},
  ]},
  { w: 'super', p: 'adj.', s: [
    { m: '아주 좋은, 최고의', syn: ['excellent'], ex: [
      ['That was a super idea.', '그것은 아주 좋은 생각이었다.'],
      ['She did a super job.', '그녀는 아주 잘해 냈다.'],
      ['The food was super.', '음식이 아주 좋았다.'],
    ]},
  ]},
  { w: 'supper', p: 'n.', s: [
    { m: '저녁 식사', syn: ['dinner'], ex: [
      ['We had supper at seven.', '우리는 7시에 저녁을 먹었다.'],
      ['Supper is ready now.', '저녁이 준비되었다.'],
      ['She cooked a light supper.', '그녀는 가벼운 저녁을 차렸다.'],
    ]},
  ]},
  { w: 'supply', p: 'n.', s: [
    { m: '공급, 물자', syn: ['provision'], ex: [
      ['The water supply stopped.', '물 공급이 끊겼다.'],
      ['We need more supplies.', '우리는 물자가 더 필요하다.'],
      ['Supply cannot meet demand.', '공급이 수요를 못 따라간다.'],
    ]},
  ]},
  { w: 'support', p: 'v., n.', s: [
    { m: '지지하다, 응원하다', syn: ['back up', 'encourage'], ex: [
      ['My family supports my dream.', '가족은 내 꿈을 지지한다.'],
      ['Thank you for your support.', '응원해 주셔서 감사합니다.'],
    ]},
    { m: '떠받치다', syn: ['hold up'], ex: [
      ['These pillars support the roof.', '이 기둥들이 지붕을 떠받친다.'],
      ['The bridge is supported by steel.', '그 다리는 강철로 지탱된다.'],
    ]},
  ]},
  { w: 'suppose', p: 'v.', s: [
    { m: '가정하다, 생각하다', syn: ['assume'], ex: [
      ['Suppose it rains tomorrow.', '내일 비가 온다고 가정해 보자.'],
      ['I suppose she is right.', '나는 그녀가 옳다고 생각한다.'],
      ['He supposed the door was locked.', '그는 문이 잠겨 있다고 생각했다.'],
    ]},
  ]},
  { w: 'surface', p: 'n.', s: [
    { m: '표면', syn: ['outside', 'top'], ex: [
      ['The surface of the lake was calm.', '호수의 표면은 잔잔했다.'],
      ['Clean the surface before painting.', '칠하기 전에 표면을 닦아라.'],
      ['Most of the earth’s surface is water.', '지구 표면의 대부분은 물이다.'],
    ]},
  ]},
  { w: 'surprise', p: 'n.', s: [
    { m: '놀람, 뜻밖의 일', syn: ['shock'], ex: [
      ['The gift was a surprise.', '그 선물은 뜻밖이었다.'],
      ['Her visit came as a surprise.', '그녀의 방문은 뜻밖이었다.'],
      ['To my surprise, he agreed.', '놀랍게도 그가 동의했다.'],
    ]},
  ]},
  { w: 'surround', p: 'v.', s: [
    { m: '둘러싸다', syn: ['encircle'], ex: [
      ['Trees surround the house.', '나무들이 그 집을 둘러싸고 있다.'],
      ['A fence surrounds the field.', '울타리가 들판을 둘러싸고 있다.'],
      ['People surrounded the singer.', '사람들이 그 가수를 둘러쌌다.'],
    ]},
  ]},
  { w: 'survey', p: 'n.', s: [
    { m: '조사, 설문', syn: ['study'], ex: [
      ['We did a survey of students.', '우리는 학생 설문을 했다.'],
      ['The survey shows a clear result.', '그 조사는 분명한 결과를 보여 준다.'],
      ['She answered the survey online.', '그녀는 온라인으로 설문에 답했다.'],
    ]},
  ]},
  { w: 'survive', p: 'v.', s: [
    { m: '살아남다', syn: ['endure'], ex: [
      ['Few plants survive the cold.', '추위에서 살아남는 식물은 적다.'],
      ['He survived the accident.', '그는 사고에서 살아남았다.'],
      ['They are surviving on little food.', '그들은 적은 음식으로 버티고 있다.'],
    ]},
  ]},
  { w: 'suspect', p: 'v.', s: [
    { m: '의심하다', syn: ['doubt'], ex: [
      ['The police suspect him.', '경찰은 그를 의심한다.'],
      ['She suspected something was wrong.', '그녀는 뭔가 잘못되었다고 의심했다.'],
      ['I suspect it will rain.', '나는 비가 올 것 같다고 생각한다.'],
    ]},
  ]},
  { w: 'swallow', p: 'v.', s: [
    { m: '삼키다', syn: ['gulp'], ex: [
      ['Chew before you swallow.', '삼키기 전에 씹어라.'],
      ['He swallowed the medicine.', '그는 약을 삼켰다.'],
      ['She is swallowing water.', '그녀는 물을 삼키고 있다.'],
    ]},
  ]},
  { w: 'sweater', p: 'n.', s: [
    { m: '스웨터', syn: ['pullover'], ex: [
      ['She knitted a warm sweater.', '그녀는 따뜻한 스웨터를 떴다.'],
      ['My sweater is too small.', '내 스웨터는 너무 작다.'],
      ['He wore a red sweater.', '그는 빨간 스웨터를 입었다.'],
    ]},
  ]},
  { w: 'sweep', p: 'v.', s: [
    { m: '쓸다, 청소하다', syn: ['brush'], ex: [
      ['Sweep the floor, please.', '바닥을 쓸어 주세요.'],
      ['She swept the yard.', '그녀는 마당을 쓸었다.'],
      ['He is sweeping the stairs.', '그는 계단을 쓸고 있다.'],
    ]},
  ]},
  { w: 'sweet', p: 'adj.', s: [
    { m: '달콤한', syn: ['sugary'], ex: [
      ['This apple is very sweet.', '이 사과는 아주 달다.'],
      ['I do not like sweet drinks.', '나는 단 음료를 좋아하지 않는다.'],
      ['The cake tastes sweet.', '그 케이크는 단맛이 난다.'],
    ]},
  ]},
  { w: 'swing', p: 'v.', s: [
    { m: '흔들리다, 그네를 타다', syn: ['sway'], ex: [
      ['The door swings open.', '문이 흔들리며 열린다.'],
      ['Children swing in the park.', '아이들이 공원에서 그네를 탄다.'],
      ['He swung the bat hard.', '그는 배트를 세게 휘둘렀다.'],
    ]},
  ]},
  { w: 'switch', p: 'v.', s: [
    { m: '바꾸다, 전환하다', syn: ['change'], ex: [
      ['Switch off the light.', '불을 꺼라.'],
      ['They switched seats.', '그들은 자리를 바꿨다.'],
      ['She switched to another school.', '그녀는 다른 학교로 옮겼다.'],
    ]},
  ]},
  { w: 'system', p: 'n.', s: [
    { m: '체계, 시스템', syn: ['structure'], ex: [
      ['The school has a good system.', '그 학교는 좋은 체계를 갖췄다.'],
      ['The system broke down.', '시스템이 고장 났다.'],
      ['Our body is a complex system.', '우리 몸은 복잡한 체계다.'],
    ]},
  ]},
  { w: 'take place', p: 'phr.', s: [
    { m: '일어나다, 개최되다', syn: ['happen', 'be held'], ex: [
      ['The festival takes place in May.', '그 축제는 5월에 열린다.'],
      ['The meeting took place last Friday.', '그 회의는 지난 금요일에 열렸다.'],
      ['Great changes took place after the war.', '전쟁 후에 큰 변화가 일어났다.'],
    ]},
  ]},
  { w: 'tale', p: 'n.', s: [
    { m: '이야기, 설화', syn: ['story'], ex: [
      ['Grandmother told an old tale.', '할머니가 옛이야기를 들려주셨다.'],
      ['The tale ends happily.', '그 이야기는 행복하게 끝난다.'],
      ['Every village has its tales.', '마을마다 설화가 있다.'],
    ]},
  ]},
  { w: 'tank', p: 'n.', s: [
    { m: '탱크, 물통', syn: [], ex: [
      ['The water tank is full.', '물탱크가 가득 찼다.'],
      ['He filled the gas tank.', '그는 연료 탱크를 채웠다.'],
      ['Fish swim in the tank.', '물고기가 수조에서 헤엄친다.'],
    ]},
  ]},
  { w: 'tap', p: 'v.', s: [
    { m: '가볍게 두드리다', syn: ['pat'], ex: [
      ['She tapped my shoulder.', '그녀가 내 어깨를 톡 쳤다.'],
      ['He tapped on the window.', '그는 창문을 가볍게 두드렸다.'],
      ['Tap the screen twice.', '화면을 두 번 두드려라.'],
    ]},
  ]},
  { w: 'target', p: 'n.', s: [
    { m: '목표, 표적', syn: ['goal'], ex: [
      ['Our target is one thousand.', '우리 목표는 천 개다.'],
      ['He hit the target exactly.', '그는 표적을 정확히 맞혔다.'],
      ['Set a realistic target.', '현실적인 목표를 세워라.'],
    ]},
  ]},
  { w: 'tax', p: 'n.', s: [
    { m: '세금', syn: ['levy'], ex: [
      ['We pay tax every year.', '우리는 해마다 세금을 낸다.'],
      ['The tax went up again.', '세금이 또 올랐다.'],
      ['Price includes tax.', '가격에 세금이 포함되어 있다.'],
    ]},
  ]},
  { w: 'tea', p: 'n.', s: [
    { m: '차', syn: ['beverage'], ex: [
      ['She drinks tea in the morning.', '그녀는 아침에 차를 마신다.'],
      ['This tea is too hot.', '이 차는 너무 뜨겁다.'],
      ['Green tea is good for health.', '녹차는 건강에 좋다.'],
    ]},
  ]},
  { w: 'tear', p: 'v.', s: [
    { m: '찢다', syn: ['rip'], ex: [
      ['Do not tear the page.', '그 쪽을 찢지 마라.'],
      ['She tore the letter in half.', '그녀는 편지를 반으로 찢었다.'],
      ['He is tearing the paper.', '그는 종이를 찢고 있다.'],
    ]},
  ]},
  { w: 'technic', p: 'n.', s: [
    { m: '기술, 기법', syn: ['technique'], ex: [
      ['His technic improved fast.', '그의 기술은 빠르게 늘었다.'],
      ['Good technic takes practice.', '좋은 기법에는 연습이 필요하다.'],
      ['She learned a new technic.', '그녀는 새 기법을 배웠다.'],
    ]},
  ]},
  { w: 'technique', p: 'n.', s: [
    { m: '기법, 기술', syn: ['method'], ex: [
      ['She learned a new technique.', '그녀는 새 기법을 배웠다.'],
      ['This technique saves time.', '이 기술은 시간을 아껴 준다.'],
      ['His technique is very smooth.', '그의 기술은 아주 매끄럽다.'],
    ]},
  ]},
  { w: 'technology', p: 'n.', s: [
    { m: '기술, 과학 기술', syn: ['applied science'], ex: [
      ['Technology changes quickly.', '기술은 빠르게 변한다.'],
      ['New technology helps farmers.', '새 기술이 농부들을 돕는다.'],
      ['She studies computer technology.', '그녀는 컴퓨터 기술을 공부한다.'],
    ]},
  ]},
  { w: 'teenage', p: 'adj.', s: [
    { m: '십 대의', syn: ['adolescent'], ex: [
      ['My teenage sister loves music.', '내 십 대 여동생은 음악을 좋아한다.'],
      ['Teenage years are not easy.', '십 대 시절은 쉽지 않다.'],
      ['A teenage boy asked for help.', '십 대 소년이 도움을 청했다.'],
    ]},
  ]},
  { w: 'temperature', p: 'n.', s: [
    { m: '온도, 기온, 체온', syn: [], ex: [
      ['The temperature is below zero today.', '오늘 기온은 영하이다.'],
      ['The nurse checked my temperature.', '간호사가 내 체온을 쟀다.'],
      ['Water boils at a high temperature.', '물은 높은 온도에서 끓는다.'],
    ]},
  ]},
  { w: 'tend', p: 'v.', s: [
    { m: '~하는 경향이 있다', syn: ['be likely to', 'have a tendency to'], ex: [
      ['Kids tend to copy adults.', '아이들은 어른을 따라 하는 경향이 있다.'],
      ['Prices tend to rise in winter.', '겨울에는 물가가 오르는 경향이 있다.'],
      ['She tends to speak too fast.', '그녀는 너무 빨리 말하는 경향이 있다.'],
    ]},
  ]},
  { w: 'tense', p: 'adj.', s: [
    { m: '긴장한', syn: ['nervous'], ex: [
      ['She was tense before the test.', '그녀는 시험 전에 긴장했다.'],
      ['The room felt tense.', '방 안이 긴장돼 있었다.'],
      ['His voice sounded tense.', '그의 목소리는 긴장돼 들렸다.'],
    ]},
  ]},
], 'curriculum');
