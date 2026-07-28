/**
 * 고등학교 1학년 레벨 4 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장), 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H1_4 = defineLevel('h1-4', [
  { w: 'abandon', p: 'v.', s: [
    { m: '버리다, 포기하다', syn: ['give up'], ex: [
      ['They abandoned the old plan.', '그들은 옛 계획을 포기했다.'],
      ['The building was abandoned years ago.', '그 건물은 몇 년 전에 버려졌다.'],
      ['He abandoned his dream of acting.', '그는 연기의 꿈을 포기했다.'],
    ]},
  ]},
  { w: 'aboard', p: 'adv.', s: [
    { m: '탑승하여', syn: ['on board'], ex: [
      ['All passengers are aboard.', '모든 승객이 탑승했다.'],
      ['Welcome aboard!', '탑승을 환영합니다!'],
      ['He went aboard the ship.', '그는 배에 올랐다.'],
    ]},
  ]},
  { w: 'abort', p: 'v.', s: [
    { m: '중단하다', syn: ['cancel'], ex: [
      ['They aborted the plan.', '그들은 그 계획을 중단했다.'],
      ['The launch was aborted.', '발사가 중단되었다.'],
      ['We had to abort the trip.', '우리는 여행을 접어야 했다.'],
    ]},
  ]},
  { w: 'abound', p: 'v.', s: [
    { m: '많이 있다, 풍부하다', syn: [], ex: [
      ['Fish abound in this river.', '이 강에는 물고기가 많다.'],
      ['Flowers abound in spring.', '봄에는 꽃이 넘쳐난다.'],
      ['Errors abound in this text.', '이 글에는 오류가 많다.'],
    ]},
  ]},
  { w: 'abroad', p: 'adv.', s: [
    { m: '해외에, 외국으로', syn: ['overseas'], ex: [
      ['She studied abroad for a year.', '그녀는 1년 동안 유학했다.'],
      ['He has never been abroad.', '그는 외국에 가 본 적이 없다.'],
      ['They moved abroad last spring.', '그들은 지난봄에 외국으로 갔다.'],
    ]},
  ]},
  { w: 'absent', p: 'adj.', s: [
    { m: '결석한, 없는', syn: [], ex: [
      ['Three students were absent.', '학생 세 명이 결석했다.'],
      ['She was absent from the meeting.', '그녀는 회의에 불참했다.'],
      ['His name is absent from the list.', '그의 이름이 목록에 없다.'],
    ]},
  ]},
  { w: 'absorb', p: 'v.', s: [
    { m: '흡수하다', syn: ['soak up', 'take in'], ex: [
      ['Plants absorb water through roots.', '식물은 뿌리를 통해 물을 흡수한다.'],
      ['This towel absorbs water quickly.', '이 수건은 물을 빨리 흡수한다.'],
      ['Dark colors absorb more heat.', '어두운 색은 열을 더 많이 흡수한다.'],
    ]},
  ]},
  { w: 'abstract', p: 'adj.', s: [
    { m: '추상적인', syn: ['theoretical', 'conceptual'], ex: [
      ['Justice is an abstract idea.', '정의는 추상적인 개념이다.'],
      ['Young children struggle with abstract terms.', '어린아이들은 추상적인 용어를 어려워한다.'],
      ['His painting is completely abstract.', '그의 그림은 완전히 추상적이다.'],
    ]},
  ]},
  { w: 'absurd', p: 'adj.', s: [
    { m: '터무니없는', syn: ['ridiculous'], ex: [
      ['That is an absurd idea.', '그것은 터무니없는 생각이다.'],
      ['The price is absurd.', '그 가격은 말도 안 된다.'],
      ['He made an absurd excuse.', '그는 터무니없는 변명을 했다.'],
    ]},
  ]},
  { w: 'abuse', p: 'n.', s: [
    { m: '남용, 학대', syn: ['misuse'], ex: [
      ['Abuse of power is dangerous.', '권력 남용은 위험하다.'],
      ['Animal abuse must stop.', '동물 학대는 멈춰야 한다.'],
      ['Drug abuse ruins lives.', '약물 남용은 삶을 망친다.'],
    ]},
  ]},
  { w: 'academy', p: 'n.', s: [
    { m: '학원, 학술원', syn: ['institute'], ex: [
      ['She goes to a music academy.', '그녀는 음악 학원에 다닌다.'],
      ['The academy trains young players.', '그 아카데미는 어린 선수들을 훈련한다.'],
      ['He joined a science academy.', '그는 과학 학술원에 들어갔다.'],
    ]},
  ]},
  { w: 'accelerate', p: 'v.', s: [
    { m: '가속하다, 빨라지다', syn: ['speed up'], ex: [
      ['The car accelerated quickly.', '차가 빠르게 가속했다.'],
      ['Growth accelerated last year.', '작년에 성장이 빨라졌다.'],
      ['Heat accelerates the change.', '열이 그 변화를 가속한다.'],
    ]},
  ]},
  { w: 'accommodate', p: 'v.', s: [
    { m: '수용하다, 공간을 제공하다', syn: ['hold'], ex: [
      ['The hall accommodates 300 people.', '그 홀은 300명을 수용한다.'],
      ['The hotel accommodated us for a night.', '그 호텔은 우리를 하룻밤 재워 주었다.'],
    ]},
    { m: '맞추다, 편의를 봐주다', syn: ['adapt to', 'allow for'], ex: [
      ['We accommodated her schedule.', '우리는 그녀의 일정에 맞춰 주었다.'],
      ['The system accommodates different needs.', '그 체계는 다양한 요구를 수용한다.'],
    ]},
  ]},
  { w: 'accompany', p: 'v.', s: [
    { m: '동행하다, 함께 가다', syn: ['go with'], ex: [
      ['She accompanied me to the store.', '그녀는 나와 함께 가게에 갔다.'],
      ['Music accompanied the dance.', '음악이 춤과 함께했다.'],
      ['He accompanied his mother home.', '그는 어머니를 집까지 모셔다드렸다.'],
    ]},
  ]},
  { w: 'accomplish', p: 'v.', s: [
    { m: '이루다, 완수하다', syn: ['achieve'], ex: [
      ['She accomplished her goal.', '그녀는 목표를 이뤘다.'],
      ['We accomplished the task early.', '우리는 과제를 일찍 완수했다.'],
      ['He accomplishes a lot each day.', '그는 매일 많은 것을 해낸다.'],
    ]},
  ]},
  { w: 'accord', p: 'n.', s: [
    { m: '합의, 일치', syn: ['agreement'], ex: [
      ['The two sides reached an accord.', '양측이 합의에 이르렀다.'],
      ['They signed a peace accord.', '그들은 평화 협정에 서명했다.'],
      ['Their views are in accord.', '그들의 견해는 일치한다.'],
    ]},
  ]},
  { w: 'accountable', p: 'adj.', s: [
    { m: '책임이 있는', syn: ['responsible'], ex: [
      ['Leaders must be accountable to the public.', '지도자는 대중에게 책임을 져야 한다.'],
      ['He was held accountable for the loss.', '그는 그 손실에 대한 책임을 졌다.'],
      ['We are accountable for our choices.', '우리는 우리의 선택에 책임이 있다.'],
    ]},
  ]},
  { w: 'accumulate', p: 'v.', s: [
    { m: '축적하다, 모으다', syn: ['build up', 'pile up'], ex: [
      ['Dust accumulated on the shelf.', '선반에 먼지가 쌓였다.'],
      ['He accumulated wealth over decades.', '그는 수십 년에 걸쳐 부를 축적했다.'],
      ['Evidence has accumulated against the theory.', '그 이론에 반하는 증거가 쌓였다.'],
    ]},
  ]},
  { w: 'accurate', p: 'adj.', s: [
    { m: '정확한', syn: ['exact', 'precise'], ex: [
      ['We need accurate data.', '우리는 정확한 자료가 필요하다.'],
      ['His description was surprisingly accurate.', '그의 묘사는 놀라울 만큼 정확했다.'],
      ['The clock is not accurate.', '그 시계는 정확하지 않다.'],
    ]},
  ]},
  { w: 'term', p: 'n.', s: [
    { m: '용어, 학기', syn: [], ex: [
      ['Explain this term, please.', '이 용어를 설명해 주세요.'],
      ['The spring term starts in March.', '봄 학기는 3월에 시작한다.'],
      ['She learned ten new terms today.', '그녀는 오늘 새 용어 열 개를 배웠다.'],
    ]},
  ]},
  { w: 'terrible', p: 'adj.', s: [
    { m: '끔찍한, 심한', syn: ['awful'], ex: [
      ['The weather was terrible yesterday.', '어제 날씨는 끔찍했다.'],
      ['I had a terrible headache.', '나는 심한 두통이 있었다.'],
      ['That was a terrible mistake.', '그것은 끔찍한 실수였다.'],
    ]},
  ]},
  { w: 'text', p: 'n.', s: [
    { m: '글, 본문', syn: [], ex: [
      ['Read the text carefully.', '본문을 꼼꼼히 읽어라.'],
      ['Copy the text into your notebook.', '본문을 공책에 옮겨 적어라.'],
      ['The text is too long.', '그 글은 너무 길다.'],
    ]},
  ]},
  { w: 'theater', p: 'n.', s: [
    { m: '극장', syn: [], ex: [
      ['We met in front of the theater.', '우리는 극장 앞에서 만났다.'],
      ['The theater was full.', '극장이 가득 찼다.'],
      ['She works at a theater.', '그녀는 극장에서 일한다.'],
    ]},
  ]},
  { w: 'theatre', p: 'n.', s: [
    { m: '극장 (영국식)', syn: ['theater'], ex: [
      ['The theatre opened in 1920.', '그 극장은 1920년에 문을 열었다.'],
      ['We booked theatre seats.', '우리는 극장 좌석을 예약했다.'],
      ['The old theatre was rebuilt.', '그 오래된 극장은 다시 지어졌다.'],
    ]},
  ]},
  { w: 'then', p: 'adv.', s: [
    { m: '그때, 그다음에', syn: [], ex: [
      ['We ate, then we left.', '우리는 먹고 나서 떠났다.'],
      ['Back then, life was simpler.', '그때는 삶이 더 단순했다.'],
      ['Study first, then rest.', '먼저 공부하고 그다음에 쉬어라.'],
    ]},
  ]},
  { w: 'theory', p: 'n.', s: [
    { m: '이론', syn: [], ex: [
      ['The theory explains many facts.', '그 이론은 많은 사실을 설명한다.'],
      ['In theory, it should work.', '이론상 그것은 작동해야 한다.'],
      ['She wrote a new theory.', '그녀는 새 이론을 썼다.'],
    ]},
  ]},
  { w: 'therefore', p: 'adv.', s: [
    { m: '그러므로', syn: ['thus'], ex: [
      ['It rained; therefore we stayed in.', '비가 왔다, 그러므로 우리는 안에 있었다.'],
      ['He was late; therefore he missed it.', '그는 늦었고 그래서 놓쳤다.'],
      ['Therefore, we should start now.', '그러므로 우리는 지금 시작해야 한다.'],
    ]},
  ]},
  { w: 'thick', p: 'adj.', s: [
    { m: '두꺼운, 굵은', syn: [], ex: [
      ['He read a thick book.', '그는 두꺼운 책을 읽었다.'],
      ['Wear a thick coat today.', '오늘은 두꺼운 코트를 입어라.'],
      ['The ice is thick enough to walk on.', '얼음이 걸어도 될 만큼 두껍다.'],
    ]},
  ]},
  { w: 'thief', p: 'n.', s: [
    { m: '도둑', syn: [], ex: [
      ['The thief ran away quickly.', '도둑이 빠르게 달아났다.'],
      ['Police caught the thief.', '경찰이 도둑을 잡았다.'],
      ['A thief took my bag.', '도둑이 내 가방을 가져갔다.'],
    ]},
  ]},
  { w: 'thin', p: 'adj.', s: [
    { m: '얇은, 마른', syn: [], ex: [
      ['The paper is very thin.', '그 종이는 아주 얇다.'],
      ['He is tall and thin.', '그는 키가 크고 말랐다.'],
      ['Cut the bread into thin slices.', '빵을 얇게 잘라라.'],
    ]},
  ]},
  { w: 'though', p: 'conj.', s: [
    { m: '비록 ~이지만', syn: ['although'], ex: [
      ['Though it was cold, we went out.', '추웠지만 우리는 나갔다.'],
      ['She smiled, though she was sad.', '그녀는 슬펐지만 미소 지었다.'],
      ['He tried, though he failed.', '그는 실패했지만 시도했다.'],
    ]},
  ]},
  { w: 'thousand', p: 'num.', s: [
    { m: '천, 1000', syn: [], ex: [
      ['A thousand people came.', '천 명이 왔다.'],
      ['The book costs ten thousand won.', '그 책은 만 원이다.'],
      ['She saved a thousand dollars.', '그녀는 천 달러를 모았다.'],
    ]},
  ]},
  { w: 'threat', p: 'n.', s: [
    { m: '위협', syn: [], ex: [
      ['Pollution is a threat to nature.', '오염은 자연에 대한 위협이다.'],
      ['He made a threat and left.', '그는 위협하고 떠났다.'],
      ['The threat was not serious.', '그 위협은 심각하지 않았다.'],
    ]},
  ]},
  { w: 'threaten', p: 'v.', s: [
    { m: '위협하다', syn: [], ex: [
      ['Pollution threatens sea life.', '오염이 해양 생물을 위협한다.'],
      ['The storm threatened the village.', '폭풍이 그 마을을 위협했다.'],
      ['He threatened to leave.', '그는 떠나겠다고 위협했다.'],
    ]},
  ]},
  { w: 'throat', p: 'n.', s: [
    { m: '목, 목구멍', syn: [], ex: [
      ['My throat hurts today.', '오늘 목이 아프다.'],
      ['She cleared her throat.', '그녀는 목을 가다듬었다.'],
      ['Warm tea helps a sore throat.', '따뜻한 차는 아픈 목에 좋다.'],
    ]},
  ]},
  { w: 'through', p: 'prep.', s: [
    { m: '~을 통과하여', syn: [], ex: [
      ['We walked through the park.', '우리는 공원을 지나 걸었다.'],
      ['Light came through the window.', '빛이 창문을 통해 들어왔다.'],
      ['She read through the book.', '그녀는 그 책을 끝까지 읽었다.'],
    ]},
  ]},
  { w: 'throw', p: 'v.', s: [
    { m: '던지다', syn: ['toss'], ex: [
      ['Do not throw trash on the street.', '길에 쓰레기를 던지지 마라.'],
      ['He threw the ball to me.', '그는 나에게 공을 던졌다.'],
      ['She is throwing bread to the birds.', '그녀는 새들에게 빵을 던져 주고 있다.'],
    ]},
  ]},
  { w: 'thus', p: 'adv.', s: [
    { m: '따라서, 이렇게', syn: ['therefore'], ex: [
      ['He studied hard; thus he passed.', '그는 열심히 공부했고 따라서 합격했다.'],
      ['Thus the problem was solved.', '이렇게 문제가 해결되었다.'],
      ['The road was closed; thus we turned back.', '길이 막혔고 따라서 우리는 되돌아갔다.'],
    ]},
  ]},
  { w: 'tide', p: 'n.', s: [
    { m: '조수, 흐름', syn: [], ex: [
      ['The tide comes in at noon.', '조수는 정오에 밀려온다.'],
      ['We waited for the tide.', '우리는 조수를 기다렸다.'],
      ['The tide of opinion changed.', '여론의 흐름이 바뀌었다.'],
    ]},
  ]},
  { w: 'tie', p: 'v.', s: [
    { m: '묶다', syn: ['bind'], ex: [
      ['Tie your shoes first.', '먼저 신발 끈을 묶어라.'],
      ['She tied the box with string.', '그녀는 끈으로 상자를 묶었다.'],
      ['He is tying his tie.', '그는 넥타이를 매고 있다.'],
    ]},
  ]},
  { w: 'tight', p: 'adj.', s: [
    { m: '꽉 끼는, 팽팽한', syn: [], ex: [
      ['These shoes are too tight.', '이 신발은 너무 꽉 낀다.'],
      ['Keep the rope tight.', '밧줄을 팽팽하게 유지해라.'],
      ['Our schedule is tight.', '우리 일정은 빠듯하다.'],
    ]},
  ]},
  { w: 'till', p: 'prep.', s: [
    { m: '~까지', syn: ['until'], ex: [
      ['Wait till tomorrow.', '내일까지 기다려라.'],
      ['She worked till midnight.', '그녀는 자정까지 일했다.'],
      ['Stay here till I return.', '내가 돌아올 때까지 여기 있어라.'],
    ]},
  ]},
  { w: 'tin', p: 'n.', s: [
    { m: '주석, 통조림', syn: [], ex: [
      ['The food came in a tin.', '음식이 통조림에 들어 있었다.'],
      ['Tin does not rust easily.', '주석은 쉽게 녹슬지 않는다.'],
      ['She opened a tin of beans.', '그녀는 콩 통조림을 땄다.'],
    ]},
  ]},
  { w: 'tiny', p: 'adj.', s: [
    { m: '아주 작은', syn: [], ex: [
      ['A tiny bird sat on the wire.', '아주 작은 새가 전선에 앉았다.'],
      ['She wrote in tiny letters.', '그녀는 아주 작은 글씨로 썼다.'],
      ['The room has a tiny window.', '그 방에는 아주 작은 창이 있다.'],
    ]},
  ]},
  { w: 'tip', p: 'n.', s: [
    { m: '끝, 조언, 팁', syn: [], ex: [
      ['The tip of the pencil broke.', '연필 끝이 부러졌다.'],
      ['She gave me a useful tip.', '그녀는 유용한 조언을 해 주었다.'],
      ['He left a tip on the table.', '그는 탁자에 팁을 두고 갔다.'],
    ]},
  ]},
  { w: 'title', p: 'n.', s: [
    { m: '제목', syn: [], ex: [
      ['What is the title of the book?', '그 책의 제목이 무엇이니?'],
      ['She wrote the title at the top.', '그녀는 맨 위에 제목을 썼다.'],
      ['The title of the song is beautiful.', '그 노래의 제목은 아름답다.'],
    ]},
  ]},
  { w: 'toast', p: 'n.', s: [
    { m: '토스트, 건배', syn: [], ex: [
      ['She ate toast for breakfast.', '그녀는 아침으로 토스트를 먹었다.'],
      ['The toast is burned.', '토스트가 탔다.'],
      ['They raised a glass in toast.', '그들은 건배하며 잔을 들었다.'],
    ]},
  ]},
  { w: 'toe', p: 'n.', s: [
    { m: '발가락', syn: [], ex: [
      ['I hurt my toe.', '나는 발가락을 다쳤다.'],
      ['She stood on her toes.', '그녀는 발끝으로 섰다.'],
      ['My toe is cold.', '내 발가락이 시리다.'],
    ]},
  ]},
  { w: 'toilet', p: 'n.', s: [
    { m: '화장실, 변기', syn: ['restroom'], ex: [
      ['Where is the toilet?', '화장실이 어디인가요?'],
      ['The toilet is out of order.', '변기가 고장 났다.'],
      ['Please keep the toilet clean.', '화장실을 깨끗이 써 주세요.'],
    ]},
  ]},
  { w: 'tolerate', p: 'v.', s: [
    { m: '참다, 용인하다', syn: ['put up with', 'endure'], ex: [
      ['I cannot tolerate rudeness.', '나는 무례함을 참을 수 없다.'],
      ['The school does not tolerate bullying.', '학교는 괴롭힘을 용인하지 않는다.'],
      ['These plants tolerate cold weather.', '이 식물들은 추운 날씨를 견딘다.'],
    ]},
  ]},
  { w: 'tone', p: 'n.', s: [
    { m: '어조, 음색', syn: [], ex: [
      ['Her tone was gentle.', '그녀의 어조는 부드러웠다.'],
      ['Do not use that tone with me.', '나에게 그런 말투를 쓰지 마라.'],
      ['The tone of the bell is deep.', '그 종의 음색은 낮다.'],
    ]},
  ]},
  { w: 'tongue', p: 'n.', s: [
    { m: '혀, 언어', syn: [], ex: [
      ['She burned her tongue.', '그녀는 혀를 데었다.'],
      ['Korean is my mother tongue.', '한국어는 내 모국어다.'],
      ['The dog hung out its tongue.', '개가 혀를 내밀었다.'],
    ]},
  ]},
  { w: 'tool', p: 'n.', s: [
    { m: '도구, 연장', syn: [], ex: [
      ['A hammer is a useful tool.', '망치는 유용한 도구다.'],
      ['He put the tools back in the box.', '그는 연장을 상자에 다시 넣었다.'],
      ['The internet is a powerful tool for learning.', '인터넷은 배움에 강력한 도구다.'],
    ]},
  ]},
  { w: 'topic', p: 'n.', s: [
    { m: '주제, 화제', syn: ['subject'], ex: [
      ['Choose a topic for your essay.', '글의 주제를 정해라.'],
      ['The topic was too hard.', '그 주제는 너무 어려웠다.'],
      ['We changed the topic.', '우리는 화제를 바꿨다.'],
    ]},
  ]},
  { w: 'total', p: 'n.', s: [
    { m: '합계, 총계', syn: ['sum'], ex: [
      ['The total is fifty dollars.', '합계는 50달러다.'],
      ['Add the numbers for the total.', '총계를 위해 숫자를 더해라.'],
      ['A total of thirty came.', '총 서른 명이 왔다.'],
    ]},
  ]},
  { w: 'tough', p: 'adj.', s: [
    { m: '힘든, 질긴', syn: [], ex: [
      ['That was a tough question.', '그것은 어려운 문제였다.'],
      ['The meat is tough.', '그 고기는 질기다.'],
      ['She is a tough player.', '그녀는 강인한 선수다.'],
    ]},
  ]},
  { w: 'tour', p: 'n.', s: [
    { m: '여행, 관광', syn: ['trip'], ex: [
      ['We went on a city tour.', '우리는 시내 관광을 했다.'],
      ['The tour takes two hours.', '그 투어는 두 시간 걸린다.'],
      ['She joined a school tour.', '그녀는 학교 견학에 참여했다.'],
    ]},
  ]},
  { w: 'toward', p: 'prep.', s: [
    { m: '~ 쪽으로', syn: [], ex: [
      ['He walked toward the door.', '그는 문 쪽으로 걸어갔다.'],
      ['She turned toward me.', '그녀가 나를 향해 돌아섰다.'],
      ['We moved toward the exit.', '우리는 출구 쪽으로 움직였다.'],
    ]},
  ]},
  { w: 'towards', p: 'prep.', s: [
    { m: '~ 쪽으로 (영국식)', syn: ['toward'], ex: [
      ['She ran towards the gate.', '그녀는 정문 쪽으로 달렸다.'],
      ['He leaned towards the window.', '그는 창 쪽으로 기울었다.'],
      ['Feelings towards him changed.', '그를 향한 감정이 바뀌었다.'],
    ]},
  ]},
  { w: 'towel', p: 'n.', s: [
    { m: '수건', syn: [], ex: [
      ['Dry your hands with a towel.', '수건으로 손을 닦아라.'],
      ['The towel is still wet.', '수건이 아직 젖어 있다.'],
      ['She brought a clean towel.', '그녀는 깨끗한 수건을 가져왔다.'],
    ]},
  ]},
  { w: 'tower', p: 'n.', s: [
    { m: '탑', syn: [], ex: [
      ['The tower is very tall.', '그 탑은 아주 높다.'],
      ['We climbed the old tower.', '우리는 오래된 탑을 올랐다.'],
      ['A clock hangs on the tower.', '시계가 탑에 걸려 있다.'],
    ]},
  ]},
  { w: 'trace', p: 'n.', s: [
    { m: '흔적, 자취', syn: [], ex: [
      ['There was no trace of him.', '그의 흔적은 없었다.'],
      ['A trace of snow remained.', '눈의 자취가 남아 있었다.'],
      ['She found a trace of blood.', '그녀는 핏자국을 발견했다.'],
    ]},
  ]},
  { w: 'trade', p: 'n.', s: [
    { m: '무역, 거래', syn: ['commerce'], ex: [
      ['Trade between the two grew.', '둘 사이의 무역이 늘었다.'],
      ['The two countries signed a trade deal.', '두 나라가 무역 협정을 맺었다.'],
      ['Trade brings goods from far away.', '무역은 먼 곳의 물건을 가져온다.'],
    ]},
  ]},
  { w: 'tradition', p: 'n.', s: [
    { m: '전통', syn: ['custom'], ex: [
      ['Hanbok is part of our tradition.', '한복은 우리 전통의 일부이다.'],
      ['It is a family tradition to eat together.', '함께 식사하는 것은 가족 전통이다.'],
      ['Many traditions are disappearing.', '많은 전통이 사라지고 있다.'],
    ]},
  ]},
  { w: 'traffic', p: 'n.', s: [
    { m: '교통, 차량', syn: [], ex: [
      ['The traffic was heavy today.', '오늘 차가 많이 막혔다.'],
      ['Traffic stopped at the light.', '차량이 신호에서 멈췄다.'],
      ['Avoid traffic in the morning.', '아침 교통 혼잡을 피해라.'],
    ]},
  ]},
  { w: 'transfer', p: 'v.', s: [
    { m: '옮기다, 전학하다', syn: ['move'], ex: [
      ['She transferred to a new school.', '그녀는 새 학교로 전학했다.'],
      ['Transfer the money today.', '오늘 돈을 이체해라.'],
      ['He transferred the files.', '그는 파일을 옮겼다.'],
    ]},
  ]},
  { w: 'transport', p: 'n.', s: [
    { m: '교통, 수송', syn: [], ex: [
      ['Public transport is cheap here.', '여기 대중교통은 싸다.'],
      ['They arranged transport for us.', '그들은 우리 이동 수단을 마련했다.'],
      ['Transport of goods costs money.', '물품 수송에는 돈이 든다.'],
    ]},
  ]},
  { w: 'trap', p: 'n.', s: [
    { m: '덫, 함정', syn: [], ex: [
      ['The mouse fell into a trap.', '쥐가 덫에 걸렸다.'],
      ['It was a clever trap.', '그것은 교묘한 함정이었다.'],
      ['He set a trap in the field.', '그는 들판에 덫을 놓았다.'],
    ]},
  ]},
  { w: 'tray', p: 'n.', s: [
    { m: '쟁반', syn: [], ex: [
      ['She carried a tray of food.', '그녀는 음식 쟁반을 날랐다.'],
      ['Put the cups on the tray.', '컵을 쟁반에 놓아라.'],
      ['The tray is too heavy.', '그 쟁반은 너무 무겁다.'],
    ]},
  ]},
  { w: 'treat', p: 'v.', s: [
    { m: '대하다, 치료하다', syn: [], ex: [
      ['Treat others with respect.', '남을 존중하며 대해라.'],
      ['The doctor treated my wound.', '의사가 내 상처를 치료했다.'],
      ['She treated us to lunch.', '그녀가 우리에게 점심을 샀다.'],
    ]},
  ]},
  { w: 'triangle', p: 'n.', s: [
    { m: '삼각형', syn: [], ex: [
      ['Draw a triangle here.', '여기에 삼각형을 그려라.'],
      ['A triangle has three sides.', '삼각형은 변이 셋이다.'],
      ['The sign is a red triangle.', '그 표지는 빨간 삼각형이다.'],
    ]},
  ]},
  { w: 'trick', p: 'n.', s: [
    { m: '속임수, 묘기', syn: [], ex: [
      ['That was a clever trick.', '그것은 교묘한 속임수였다.'],
      ['He showed us a card trick.', '그는 우리에게 카드 마술을 보여 줬다.'],
      ['Do not fall for the trick.', '그 속임수에 넘어가지 마라.'],
    ]},
  ]},
  { w: 'trouble', p: 'n.', s: [
    { m: '곤란, 문제, 어려움', syn: ['problem'], ex: [
      ['He is in trouble again.', '그는 또 곤경에 빠졌다.'],
      ['I had trouble finding your house.', '나는 네 집을 찾는 데 어려움이 있었다.'],
      ['Sorry for the trouble.', '번거롭게 해서 죄송합니다.'],
    ]},
  ]},
  { w: 'trunk', p: 'n.', s: [
    { m: '나무줄기, 트렁크', syn: [], ex: [
      ['The trunk of the tree is thick.', '그 나무의 줄기는 굵다.'],
      ['Put the bags in the trunk.', '가방을 트렁크에 넣어라.'],
      ['Moss grew on the trunk of the old tree.', '오래된 나무의 줄기에 이끼가 자랐다.'],
    ]},
  ]},
  { w: 'trust', p: 'v., n.', s: [
    { m: '믿다; 신뢰', syn: ['believe in', 'rely on'], ex: [
      ['I trust my best friend.', '나는 가장 친한 친구를 믿는다.'],
      ['Trust takes years to build.', '신뢰는 쌓는 데 여러 해가 걸린다.'],
      ['You can trust her with anything.', '너는 그녀에게 무엇이든 믿고 맡길 수 있다.'],
    ]},
  ]},
  { w: 'truth', p: 'n.', s: [
    { m: '진실', syn: [], ex: [
      ['Tell me the truth.', '나에게 진실을 말해라.'],
      ['Truth is sometimes painful.', '진실은 때로 아프다.'],
      ['She learned the truth later.', '그녀는 나중에 진실을 알았다.'],
    ]},
  ]},
  { w: 'tune', p: 'n.', s: [
    { m: '곡, 선율', syn: ['melody'], ex: [
      ['She hummed a soft tune.', '그녀는 부드러운 곡을 흥얼거렸다.'],
      ['The tune stayed in my head.', '그 선율이 머릿속에 남았다.'],
      ['He played a happy tune.', '그는 밝은 곡을 연주했다.'],
    ]},
  ]},
  { w: 'twin', p: 'n.', s: [
    { m: '쌍둥이', syn: [], ex: [
      ['She has a twin sister.', '그녀에게는 쌍둥이 자매가 있다.'],
      ['The twins look alike.', '그 쌍둥이는 닮았다.'],
      ['My twin lives abroad.', '내 쌍둥이는 외국에 산다.'],
    ]},
  ]},
  { w: 'twist', p: 'v.', s: [
    { m: '비틀다, 꼬다', syn: [], ex: [
      ['Twist the lid to open it.', '뚜껑을 돌려 열어라.'],
      ['She twisted her ankle.', '그녀는 발목을 삐었다.'],
      ['He is twisting the wire.', '그는 철사를 꼬고 있다.'],
    ]},
  ]},
  { w: 'uniform', p: 'n.', s: [
    { m: '제복, 교복', syn: [], ex: [
      ['We wear a school uniform.', '우리는 교복을 입는다.'],
      ['The uniform is blue.', '그 제복은 파란색이다.'],
      ['She ironed her uniform.', '그녀는 교복을 다렸다.'],
    ]},
  ]},
  { w: 'unit', p: 'n.', s: [
    { m: '단위, 단원', syn: [], ex: [
      ['Study unit three today.', '오늘은 3단원을 공부해라.'],
      ['A meter is a unit of length.', '미터는 길이의 단위다.'],
      ['Each unit takes one week.', '각 단원은 일주일 걸린다.'],
    ]},
  ]},
  { w: 'unite', p: 'v.', s: [
    { m: '연합하다, 하나가 되다', syn: ['join'], ex: [
      ['The two teams united.', '두 팀이 하나가 되었다.'],
      ['Music unites people.', '음악은 사람들을 하나로 만든다.'],
      ['They united against the plan.', '그들은 그 계획에 맞서 뭉쳤다.'],
    ]},
  ]},
  { w: 'university', p: 'n.', s: [
    { m: '대학교', syn: ['college'], ex: [
      ['She goes to a university in Seoul.', '그녀는 서울에 있는 대학교에 다닌다.'],
      ['The university is very old.', '그 대학은 아주 오래되었다.'],
      ['He teaches at a university.', '그는 대학에서 가르친다.'],
    ]},
  ]},
  { w: 'unless', p: 'conj.', s: [
    { m: '~하지 않으면', syn: [], ex: [
      ['Unless you hurry, you will be late.', '서두르지 않으면 늦을 것이다.'],
      ['We will go unless it rains.', '비가 오지 않으면 우리는 갈 것이다.'],
      ['She will not come unless invited.', '초대받지 않으면 그녀는 오지 않는다.'],
    ]},
  ]},
  { w: 'until', p: 'prep.', s: [
    { m: '~까지', syn: ['till'], ex: [
      ['Wait until I come back.', '내가 돌아올 때까지 기다려라.'],
      ['The shop is open until nine.', '그 가게는 9시까지 연다.'],
      ['She read until midnight.', '그녀는 자정까지 읽었다.'],
    ]},
  ]},
  { w: 'upon', p: 'prep.', s: [
    { m: '~ 위에', syn: ['on'], ex: [
      ['The book lay upon the table.', '책이 탁자 위에 놓여 있었다.'],
      ['He placed his hand upon her shoulder.', '그는 그녀의 어깨 위에 손을 얹었다.'],
      ['Everything depends upon you.', '모든 것이 너에게 달렸다.'],
    ]},
  ]},
  { w: 'upper', p: 'adj.', s: [
    { m: '위쪽의, 상부의', syn: ['higher'], ex: [
      ['The upper floor is quiet.', '위층은 조용하다.'],
      ['Write on the upper line.', '윗줄에 써라.'],
      ['Her upper arm hurts.', '그녀는 위팔이 아프다.'],
    ]},
  ]},
  { w: 'upset', p: 'adj.', s: [
    { m: '속상한, 화난', syn: [], ex: [
      ['She was upset about the news.', '그녀는 그 소식에 속상했다.'],
      ['Do not be upset with him.', '그에게 화내지 마라.'],
      ['His upset face told us everything.', '그의 속상한 얼굴이 모든 것을 말해 주었다.'],
    ]},
  ]},
  { w: 'valley', p: 'n.', s: [
    { m: '계곡, 골짜기', syn: [], ex: [
      ['A river runs through the valley.', '강이 계곡을 지나 흐른다.'],
      ['The valley is green in spring.', '계곡은 봄에 푸르다.'],
      ['They live in a quiet valley.', '그들은 조용한 골짜기에 산다.'],
    ]},
  ]},
  { w: 'value', p: 'n.', s: [
    { m: '가치', syn: [], ex: [
      ['The value of the house rose.', '그 집의 가치가 올랐다.'],
      ['She knows the value of time.', '그녀는 시간의 가치를 안다.'],
      ['Family has great value.', '가족은 큰 가치를 지닌다.'],
    ]},
  ]},
  { w: 'van', p: 'n.', s: [
    { m: '승합차, 밴', syn: [], ex: [
      ['The van carried our bags.', '승합차가 우리 가방을 실었다.'],
      ['He drives a small van.', '그는 작은 밴을 운전한다.'],
      ['A white van stopped outside.', '흰 승합차가 밖에 섰다.'],
    ]},
  ]},
  { w: 'various', p: 'adj.', s: [
    { m: '다양한, 여러 가지의', syn: ['diverse'], ex: [
      ['We tried various methods.', '우리는 여러 방법을 시도했다.'],
      ['Various people came.', '여러 사람이 왔다.'],
      ['The shop sells various items.', '그 가게는 다양한 물건을 판다.'],
    ]},
  ]},
  { w: 'vary', p: 'v.', s: [
    { m: '다르다, 다양하다', syn: ['differ', 'change'], ex: [
      ['Prices vary from shop to shop.', '가격은 가게마다 다르다.'],
      ['Opinions vary widely on this issue.', '이 문제에 대한 의견은 매우 다양하다.'],
      ['The weather varies by season.', '날씨는 계절에 따라 다르다.'],
    ]},
  ]},
  { w: 'vehicle', p: 'n.', s: [
    { m: '차량, 탈것', syn: [], ex: [
      ['No vehicle can pass here.', '여기는 어떤 차량도 지날 수 없다.'],
      ['The vehicle broke down.', '그 차량이 고장 났다.'],
      ['Electric vehicles are quiet.', '전기차는 조용하다.'],
    ]},
  ]},
  { w: 'version', p: 'n.', s: [
    { m: '판, 버전', syn: ['edition'], ex: [
      ['This is the newest version.', '이것이 최신 버전이다.'],
      ['Her version of the story differs.', '그녀가 말한 이야기는 다르다.'],
      ['The old version was simpler.', '옛 버전이 더 단순했다.'],
    ]},
  ]},
  { w: 'victim', p: 'n.', s: [
    { m: '피해자, 희생자', syn: [], ex: [
      ['The victim was not hurt badly.', '피해자는 크게 다치지 않았다.'],
      ['They helped the flood victims.', '그들은 홍수 피해자들을 도왔다.'],
      ['He became a victim of the lie.', '그는 그 거짓말의 피해자가 되었다.'],
    ]},
  ]},
  { w: 'view', p: 'n.', s: [
    { m: '경치, 견해', syn: [], ex: [
      ['The view from here is great.', '여기서 보는 경치가 훌륭하다.'],
      ['In my view, she is right.', '내 생각에는 그녀가 옳다.'],
      ['The room has a sea view.', '그 방은 바다 전망이다.'],
    ]},
  ]},
  { w: 'villa', p: 'n.', s: [
    { m: '별장', syn: [], ex: [
      ['They own a small villa.', '그들은 작은 별장을 소유하고 있다.'],
      ['The villa stands by the sea.', '그 별장은 바닷가에 서 있다.'],
      ['We rented a villa for a week.', '우리는 일주일 동안 별장을 빌렸다.'],
    ]},
  ]},
  { w: 'village', p: 'n.', s: [
    { m: '마을', syn: [], ex: [
      ['She grew up in a small village.', '그녀는 작은 마을에서 자랐다.'],
      ['The village has one school.', '그 마을에는 학교가 하나 있다.'],
      ['A river runs past the village.', '강이 마을 옆을 흐른다.'],
    ]},
  ]},
  { w: 'violent', p: 'adj.', s: [
    { m: '폭력적인, 격렬한', syn: [], ex: [
      ['A violent storm hit the coast.', '격렬한 폭풍이 해안을 덮쳤다.'],
      ['Violent games worry parents.', '폭력적인 게임은 부모를 걱정시킨다.'],
      ['He has a violent temper.', '그는 성질이 격하다.'],
    ]},
  ]},
  { w: 'vision', p: 'n.', s: [
    { m: '시력, 비전', syn: [], ex: [
      ['Her vision is very good.', '그녀의 시력은 아주 좋다.'],
      ['He had a vision for the future.', '그는 미래에 대한 비전이 있었다.'],
      ['Poor light hurts your vision.', '어두운 빛은 시력에 나쁘다.'],
    ]},
  ]},
  { w: 'volume', p: 'n.', s: [
    { m: '부피, 음량, 권', syn: [], ex: [
      ['Turn the volume down.', '음량을 낮춰라.'],
      ['The volume of water is large.', '물의 부피가 크다.'],
      ['This is volume two.', '이것은 제2권이다.'],
    ]},
  ]},
  { w: 'volunteer', p: 'n., v.', s: [
    { m: '자원봉사자; 자원봉사하다', syn: [], ex: [
      ['She volunteers at the shelter.', '그녀는 보호소에서 자원봉사한다.'],
      ['Many volunteers cleaned the beach.', '많은 자원봉사자가 해변을 청소했다.'],
      ['He volunteered to carry the boxes.', '그는 상자를 나르겠다고 자원했다.'],
    ]},
  ]},
  { w: 'vote', p: 'v.', s: [
    { m: '투표하다', syn: [], ex: [
      ['We vote for a class leader.', '우리는 반장을 뽑는 투표를 한다.'],
      ['She voted for the new plan.', '그녀는 새 계획에 찬성표를 던졌다.'],
      ['People are voting today.', '사람들이 오늘 투표하고 있다.'],
    ]},
  ]},
  { w: 'wage', p: 'n.', s: [
    { m: '임금', syn: ['pay'], ex: [
      ['Their wage is too low.', '그들의 임금은 너무 낮다.'],
      ['He earns a daily wage.', '그는 일당을 받는다.'],
      ['Wages rose this year.', '올해 임금이 올랐다.'],
    ]},
  ]},
  { w: 'warn', p: 'v.', s: [
    { m: '경고하다', syn: [], ex: [
      ['She warned me about the ice.', '그녀는 나에게 빙판을 조심하라고 알렸다.'],
      ['The sign warns of danger.', '그 표지는 위험을 경고한다.'],
      ['He warned us not to go.', '그는 우리에게 가지 말라고 경고했다.'],
    ]},
  ]},
  { w: 'waste', p: 'v., n.', s: [
    { m: '낭비하다', syn: ['throw away', 'squander'], ex: [
      ['Do not waste your time.', '시간을 낭비하지 마라.'],
      ['We waste too much food.', '우리는 음식을 너무 많이 낭비한다.'],
    ]},
    { m: '쓰레기, 폐기물', syn: ['garbage', 'trash'], ex: [
      ['Food waste is a big problem.', '음식물 쓰레기는 큰 문제이다.'],
      ['The factory dumped waste into the river.', '그 공장은 폐기물을 강에 버렸다.'],
    ]},
  ]},
  { w: 'wave', p: 'n.', s: [
    { m: '파도, 물결', syn: [], ex: [
      ['A big wave hit the boat.', '큰 파도가 배를 덮쳤다.'],
      ['Waves broke on the shore.', '파도가 해변에서 부서졌다.'],
      ['Strong waves rocked the small boat.', '거센 파도가 작은 배를 흔들었다.'],
    ]},
  ]},
  { w: 'weak', p: 'adj.', s: [
    { m: '약한', syn: [], ex: [
      ['He felt weak after the illness.', '그는 병을 앓고 나서 기운이 없었다.'],
      ['The bridge is too weak.', '그 다리는 너무 약하다.'],
      ['Her voice was weak.', '그녀의 목소리는 약했다.'],
    ]},
  ]},
  { w: 'weapon', p: 'n.', s: [
    { m: '무기', syn: [], ex: [
      ['A knife can be a weapon.', '칼은 무기가 될 수 있다.'],
      ['They found no weapon.', '그들은 무기를 찾지 못했다.'],
      ['Words are also a weapon.', '말도 하나의 무기다.'],
    ]},
  ]},
  { w: 'weigh', p: 'v.', s: [
    { m: '무게가 나가다, 재다', syn: [], ex: [
      ['The box weighs ten kilos.', '그 상자는 10킬로그램 나간다.'],
      ['She weighed the fruit.', '그녀는 과일 무게를 쟀다.'],
      ['How much do you weigh?', '몸무게가 얼마나 되니?'],
    ]},
  ]},
  { w: 'whale', p: 'n.', s: [
    { m: '고래', syn: [], ex: [
      ['A whale swam past the ship.', '고래가 배 옆을 지나 헤엄쳤다.'],
      ['Whales are the largest animals.', '고래는 가장 큰 동물이다.'],
      ['We saw a whale from the boat.', '우리는 배에서 고래를 봤다.'],
    ]},
  ]},
  { w: 'wheel', p: 'n.', s: [
    { m: '바퀴', syn: [], ex: [
      ['The wheel came off the cart.', '수레에서 바퀴가 빠졌다.'],
      ['A car has four wheels.', '자동차에는 바퀴가 넷 있다.'],
      ['The old cart has wooden wheels.', '그 낡은 수레에는 나무 바퀴가 달려 있다.'],
    ]},
  ]},
  { w: 'whether', p: 'conj.', s: [
    { m: '~인지 아닌지', syn: ['if'], ex: [
      ['I do not know whether she came.', '나는 그녀가 왔는지 모른다.'],
      ['Ask whether it is open.', '문을 열었는지 물어봐라.'],
      ['Whether it rains or not, we go.', '비가 오든 안 오든 우리는 간다.'],
    ]},
  ]},
  { w: 'which', p: 'pron.', s: [
    { m: '어느 것', syn: [], ex: [
      ['Which do you like better?', '어느 쪽이 더 좋니?'],
      ['Tell me which is yours.', '어느 것이 네 것인지 말해 줘.'],
      ['Which way should we go?', '어느 길로 가야 하니?'],
    ]},
  ]},
  { w: 'while', p: 'conj.', s: [
    { m: '~하는 동안', syn: [], ex: [
      ['She read while I cooked.', '내가 요리하는 동안 그녀는 책을 읽었다.'],
      ['Do not use your phone while eating.', '먹는 동안 휴대전화를 쓰지 마라.'],
      ['While it rained, we stayed in.', '비가 오는 동안 우리는 안에 있었다.'],
    ]},
  ]},
  { w: 'whisper', p: 'v.', s: [
    { m: '속삭이다', syn: [], ex: [
      ['She whispered in my ear.', '그녀가 내 귀에 속삭였다.'],
      ['Do not whisper in class.', '수업 중에 속삭이지 마라.'],
      ['They are whispering secrets.', '그들은 비밀을 속삭이고 있다.'],
    ]},
  ]},
  { w: 'whistle', p: 'v.', s: [
    { m: '휘파람을 불다', syn: [], ex: [
      ['He whistled a happy song.', '그는 밝은 노래를 휘파람으로 불었다.'],
      ['He whistled to call his dog.', '그는 개를 부르려고 휘파람을 불었다.'],
      ['She is whistling in the yard.', '그녀는 마당에서 휘파람을 불고 있다.'],
    ]},
  ]},
  { w: 'whole', p: 'adj.', s: [
    { m: '전체의, 온', syn: ['entire'], ex: [
      ['She ate the whole cake.', '그녀는 케이크를 통째로 먹었다.'],
      ['The whole class agreed.', '반 전체가 동의했다.'],
      ['He waited the whole day.', '그는 하루 종일 기다렸다.'],
    ]},
  ]},
  { w: 'wide', p: 'adj.', s: [
    { m: '넓은', syn: ['broad'], ex: [
      ['The river is very wide.', '그 강은 아주 넓다.'],
      ['Open your eyes wide.', '눈을 크게 떠라.'],
      ['This road is wide enough.', '이 길은 충분히 넓다.'],
    ]},
  ]},
  { w: 'wild', p: 'adj.', s: [
    { m: '야생의, 거친', syn: [], ex: [
      ['Wild animals live in the forest.', '야생 동물이 숲에 산다.'],
      ['The sea was wild that night.', '그날 밤 바다는 거칠었다.'],
      ['Wild flowers grow here.', '야생화가 여기 자란다.'],
    ]},
  ]},
  { w: 'wing', p: 'n.', s: [
    { m: '날개', syn: [], ex: [
      ['The bird spread its wings.', '새가 날개를 폈다.'],
      ['A plane has two wings.', '비행기에는 날개가 둘 있다.'],
      ['The wing was broken.', '그 날개는 부러져 있었다.'],
    ]},
  ]},
  { w: 'wipe', p: 'v.', s: [
    { m: '닦다', syn: ['clean'], ex: [
      ['Wipe the table, please.', '탁자를 닦아 주세요.'],
      ['She wiped her tears.', '그녀는 눈물을 닦았다.'],
      ['He is wiping the window.', '그는 창문을 닦고 있다.'],
    ]},
  ]},
  { w: 'wire', p: 'n.', s: [
    { m: '철사, 전선', syn: ['cable'], ex: [
      ['A bird sat on the wire.', '새가 전선에 앉았다.'],
      ['He bent the wire easily.', '그는 철사를 쉽게 구부렸다.'],
      ['The wire is too thin.', '그 전선은 너무 가늘다.'],
    ]},
  ]},
  { w: 'wise', p: 'adj.', s: [
    { m: '현명한', syn: ['sensible'], ex: [
      ['That was a wise choice.', '그것은 현명한 선택이었다.'],
      ['A wise person listens first.', '현명한 사람은 먼저 듣는다.'],
      ['She gave wise advice.', '그녀는 현명한 조언을 했다.'],
    ]},
  ]},
  { w: 'within', p: 'prep.', s: [
    { m: '~ 이내에', syn: [], ex: [
      ['Finish it within an hour.', '한 시간 안에 끝내라.'],
      ['The shop is within walking distance.', '그 가게는 걸어갈 거리에 있다.'],
      ['Answer within three days.', '사흘 이내에 답해라.'],
    ]},
  ]},
  { w: 'without', p: 'prep.', s: [
    { m: '~ 없이', syn: [], ex: [
      ['We cannot live without water.', '우리는 물 없이 살 수 없다.'],
      ['She left without a word.', '그녀는 말없이 떠났다.'],
      ['He went out without a coat.', '그는 코트 없이 나갔다.'],
    ]},
  ]},
  { w: 'wonder', p: 'v.', s: [
    { m: '궁금해하다', syn: [], ex: [
      ['I wonder where she went.', '나는 그녀가 어디 갔는지 궁금하다.'],
      ['She wondered about the answer.', '그녀는 답을 궁금해했다.'],
      ['They wondered why he was late.', '그들은 그가 왜 늦었는지 궁금해했다.'],
    ]},
  ]},
  { w: 'wool', p: 'n.', s: [
    { m: '양털, 양모', syn: [], ex: [
      ['The sweater is made of wool.', '그 스웨터는 양모로 만들어졌다.'],
      ['Wool keeps you warm.', '양모는 몸을 따뜻하게 한다.'],
      ['She bought wool for knitting.', '그녀는 뜨개질용 털실을 샀다.'],
    ]},
  ]},
  { w: 'worth', p: 'adj.', s: [
    { m: '~할 가치가 있는', syn: [], ex: [
      ['This book is worth reading.', '이 책은 읽을 가치가 있다.'],
      ['The trip was worth the money.', '그 여행은 돈값을 했다.'],
      ['It is worth trying at least once.', '적어도 한 번은 시도해 볼 가치가 있다.'],
    ]},
  ]},
  { w: 'would', p: 'v.', s: [
    { m: '~할 것이다, ~하곤 했다', syn: [], ex: [
      ['Would you help me?', '나를 도와주시겠어요?'],
      ['She said she would come.', '그녀는 오겠다고 말했다.'],
      ['We would play here as children.', '우리는 어릴 때 여기서 놀곤 했다.'],
    ]},
  ]},
  { w: 'wound', p: 'n.', s: [
    { m: '상처', syn: ['injury'], ex: [
      ['The wound healed slowly.', '그 상처는 천천히 아물었다.'],
      ['She cleaned the wound.', '그녀는 상처를 소독했다.'],
      ['A deep wound needs care.', '깊은 상처는 관리가 필요하다.'],
    ]},
  ]},
  { w: 'wrap', p: 'v.', s: [
    { m: '싸다, 포장하다', syn: [], ex: [
      ['Wrap the gift in paper.', '선물을 종이로 포장해라.'],
      ['She wrapped a scarf around her neck.', '그녀는 목에 스카프를 둘렀다.'],
      ['He is wrapping the box.', '그는 상자를 포장하고 있다.'],
    ]},
  ]},
  { w: 'yell', p: 'v.', s: [
    { m: '소리치다', syn: ['shout'], ex: [
      ['Do not yell at your sister.', '누나에게 소리 지르지 마라.'],
      ['He yelled for help.', '그는 도와달라고 소리쳤다.'],
      ['She is yelling across the field.', '그녀는 들판 저편에 소리치고 있다.'],
    ]},
  ]},
  { w: 'yet', p: 'adv.', s: [
    { m: '아직, 그러나', syn: [], ex: [
      ['She has not come yet.', '그녀는 아직 오지 않았다.'],
      ['It is small, yet useful.', '그것은 작지만 유용하다.'],
      ['Have you finished yet?', '벌써 끝냈니?'],
    ]},
  ]},
  { w: 'zebra', p: 'n.', s: [
    { m: '얼룩말', syn: [], ex: [
      ['A zebra has black and white stripes.', '얼룩말은 검고 흰 줄무늬가 있다.'],
      ['We saw a zebra at the zoo.', '우리는 동물원에서 얼룩말을 보았다.'],
      ['The zebra ran across the field.', '얼룩말이 들판을 가로질러 달렸다.'],
    ]},
  ]},
  { w: 'zero', p: 'num.', s: [
    { m: '영, 0', syn: [], ex: [
      ['The temperature is below zero.', '기온이 영하이다.'],
      ['She scored zero in that game.', '그녀는 그 경기에서 0점을 냈다.'],
      ['Start counting from zero.', '0부터 세기 시작해라.'],
    ]},
  ]},
], 'curriculum');
