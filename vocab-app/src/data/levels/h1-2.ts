/**
 * 고등학교 1학년 레벨 2 — 수록 42 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H1_2 = defineLevel('h1-2', [
  { w: 'purpose', p: 'n.', s: [
    { m: '목적', syn: ['aim', 'goal'], ex: [
      ['What is the purpose of this trip?', '이 여행의 목적은 무엇이니?'],
      ['The purpose of the study was clear.', '그 연구의 목적은 분명했다.'],
      ['He broke it on purpose.', '그는 일부러 그것을 부쉈다.'],
    ]},
  ]},
  { w: 'puzzle', p: 'n.', s: [
    { m: '퍼즐, 수수께끼', syn: ['riddle'], ex: [
      ['She solved the puzzle quickly.', '그녀는 퍼즐을 빨리 풀었다.'],
      ['This puzzle has a thousand pieces.', '이 퍼즐은 천 조각짜리다.'],
      ['The question was a real puzzle.', '그 질문은 정말 수수께끼였다.'],
    ]},
  ]},
  { w: 'quality', p: 'n.', s: [
    { m: '질, 품질', syn: ['standard', 'grade'], ex: [
      ['The quality of the paper is good.', '그 종이의 품질이 좋다.'],
      ['We care about quality, not quantity.', '우리는 양이 아니라 질을 중시한다.'],
    ]},
    { m: '자질, 특성', syn: ['trait', 'feature'], ex: [
      ['Patience is an important quality.', '인내는 중요한 자질이다.'],
      ['She has many good qualities.', '그녀는 좋은 자질을 많이 가지고 있다.'],
    ]},
  ]},
  { w: 'raise', p: 'v.', s: [
    { m: '올리다, 들어 올리다', syn: ['lift'], ex: [
      ['Raise your hand if you know.', '알면 손을 드세요.'],
      ['They raised the flag slowly.', '그들은 깃발을 천천히 올렸다.'],
    ]},
    { m: '기르다, 키우다', syn: ['bring up'], ex: [
      ['She raised three children alone.', '그녀는 혼자 세 아이를 키웠다.'],
      ['They raise cows on the farm.', '그들은 농장에서 소를 기른다.'],
    ]},
  ]},
  { w: 'reach', p: 'v.', s: [
    { m: '도착하다, 이르다', syn: ['arrive at'], ex: [
      ['We reached the top at noon.', '우리는 정오에 정상에 이르렀다.'],
      ['The letter reached her last week.', '편지는 지난주에 그녀에게 도착했다.'],
    ]},
    { m: '손을 뻗다', syn: ['stretch out'], ex: [
      ['He reached for the book on the shelf.', '그는 선반 위의 책에 손을 뻗었다.'],
      ['I cannot reach the top shelf.', '나는 맨 위 선반에 손이 닿지 않는다.'],
    ]},
  ]},
  { w: 'realize', p: 'v.', s: [
    { m: '깨닫다', syn: ['understand', 'become aware'], ex: [
      ['I realized my mistake too late.', '나는 너무 늦게 실수를 깨달았다.'],
      ['She realized that she was wrong.', '그녀는 자신이 틀렸다는 것을 깨달았다.'],
    ]},
    { m: '실현하다', syn: ['achieve', 'fulfill'], ex: [
      ['He finally realized his dream.', '그는 마침내 꿈을 실현했다.'],
      ['The plan was never realized.', '그 계획은 결코 실현되지 않았다.'],
    ]},
  ]},
  { w: 'reason', p: 'n.', s: [
    { m: '이유, 까닭', syn: ['cause'], ex: [
      ['Tell me the reason.', '이유를 말해 줘.'],
      ['There is no reason to worry.', '걱정할 이유가 없다.'],
      ['That is the reason I was late.', '그것이 내가 늦은 이유이다.'],
    ]},
  ]},
  { w: 'receive', p: 'v.', s: [
    { m: '받다', syn: ['get'], ex: [
      ['I received a letter from her.', '나는 그녀에게서 편지를 받았다.'],
      ['She received a prize for her poem.', '그녀는 시로 상을 받았다.'],
      ['He is receiving many messages today.', '그는 오늘 많은 메시지를 받고 있다.'],
    ]},
  ]},
  { w: 'recent', p: 'adj.', s: [
    { m: '최근의', syn: ['latest', 'new'], ex: [
      ['A recent study showed this.', '최근 연구가 이것을 보여 주었다.'],
      ['In recent years, prices have risen.', '최근 몇 년간 물가가 올랐다.'],
      ['Have you seen his recent photos?', '그의 최근 사진을 봤니?'],
    ]},
  ]},
  { w: 'recognize', p: 'v.', s: [
    { m: '알아보다', syn: ['identify', 'know'], ex: [
      ['I recognized her voice.', '나는 그녀의 목소리를 알아들었다.'],
      ['He did not recognize me at first.', '그는 처음에 나를 알아보지 못했다.'],
    ]},
    { m: '인정하다', syn: ['acknowledge', 'admit'], ex: [
      ['We must recognize the problem.', '우리는 그 문제를 인정해야 한다.'],
      ['Her work was recognized worldwide.', '그녀의 작품은 전 세계에서 인정받았다.'],
    ]},
  ]},
  { w: 'record', p: 'v., n.', s: [
    { m: '기록하다, 녹음하다', syn: ['write down'], ex: [
      ['She recorded the song on her phone.', '그녀는 휴대폰으로 그 노래를 녹음했다.'],
      ['Please record the results here.', '여기에 결과를 기록해 주세요.'],
    ]},
    { m: '기록, 최고 기록', syn: ['best score'], ex: [
      ['He broke the school record.', '그는 학교 기록을 깼다.'],
      ['The teacher keeps a record of our grades.', '선생님은 우리 성적 기록을 보관하신다.'],
    ]},
  ]},
  { w: 'reduce', p: 'v.', s: [
    { m: '줄이다', syn: ['cut down', 'lower'], ex: [
      ['We should reduce plastic waste.', '우리는 플라스틱 쓰레기를 줄여야 한다.'],
      ['The store reduced its prices.', '그 가게는 가격을 낮췄다.'],
      ['Walking can reduce stress.', '걷기는 스트레스를 줄일 수 있다.'],
    ]},
  ]},
  { w: 'reflect', p: 'v.', s: [
    { m: '반사하다, 비추다', syn: ['mirror', 'throw back'], ex: [
      ['The lake reflected the mountain.', '호수가 산을 비추었다.'],
      ['Mirrors reflect light.', '거울은 빛을 반사한다.'],
    ]},
    { m: '반영하다, 나타내다', syn: ['show', 'express'], ex: [
      ['His words reflect his true feelings.', '그의 말은 진심을 반영한다.'],
      ['The test reflects what we learned.', '그 시험은 우리가 배운 것을 반영한다.'],
    ]},
  ]},
  { w: 'regular', p: 'adj.', s: [
    { m: '규칙적인, 정기적인', syn: ['steady', 'routine'], ex: [
      ['Regular exercise keeps you healthy.', '규칙적인 운동은 건강을 지켜 준다.'],
      ['We have regular meetings on Monday.', '우리는 월요일마다 정기 회의를 한다.'],
      ['Try to keep regular sleeping hours.', '규칙적인 수면 시간을 유지하려고 해라.'],
    ]},
  ]},
  { w: 'relax', p: 'v.', s: [
    { m: '쉬다, 긴장을 풀다', syn: ['rest'], ex: [
      ['I relax by listening to music.', '나는 음악을 들으며 쉰다.'],
      ['She relaxed on the sofa after work.', '그녀는 일 후에 소파에서 쉬었다.'],
      ['Relax, everything will be fine.', '긴장 풀어, 다 잘될 거야.'],
    ]},
  ]},
  { w: 'rely on', p: 'phr.', s: [
    { m: '~에 의존하다, 믿다', syn: ['depend on', 'count on'], ex: [
      ['We rely on public transport.', '우리는 대중교통에 의존한다.'],
      ['You can rely on her to be honest.', '그녀가 정직할 것이라고 믿어도 된다.'],
      ['Many farmers rely on rain.', '많은 농부가 비에 의존한다.'],
    ]},
  ]},
  { w: 'repair', p: 'v.', s: [
    { m: '수리하다, 고치다', syn: ['fix', 'mend'], ex: [
      ['He repaired my bicycle.', '그는 내 자전거를 고쳐 주었다.'],
      ['The roof needs to be repaired.', '지붕을 수리해야 한다.'],
      ['She is repairing the old chair.', '그녀는 낡은 의자를 고치고 있다.'],
    ]},
  ]},
  { w: 'repeat', p: 'v.', s: [
    { m: '반복하다, 되풀이하다', syn: ['say again', 'do again'], ex: [
      ['Please repeat the sentence.', '그 문장을 반복해 주세요.'],
      ['Do not repeat the same mistake.', '같은 실수를 반복하지 마라.'],
      ['The show repeats every hour.', '그 공연은 매시간 반복된다.'],
    ]},
  ]},
  { w: 'reply', p: 'v., n.', s: [
    { m: '대답하다, 답장하다', syn: ['answer', 'respond'], ex: [
      ['She replied to my email quickly.', '그녀는 내 이메일에 빠르게 답장했다.'],
      ['He did not reply to my question.', '그는 내 질문에 답하지 않았다.'],
      ['I am waiting for her reply.', '나는 그녀의 답장을 기다리고 있다.'],
    ]},
  ]},
  { w: 'report', p: 'n., v.', s: [
    { m: '보고서, 보고하다', syn: ['tell'], ex: [
      ['I have to write a report about animals.', '나는 동물에 관한 보고서를 써야 한다.'],
      ['She reported the accident to the police.', '그녀는 사고를 경찰에 신고했다.'],
      ['The report was five pages long.', '그 보고서는 다섯 쪽 분량이었다.'],
    ]},
  ]},
  { w: 'represent', p: 'v.', s: [
    { m: '나타내다, 상징하다', syn: ['symbolize', 'stand for'], ex: [
      ['This chart represents monthly sales.', '이 도표는 월별 매출을 나타낸다.'],
      ['The dove represents peace.', '비둘기는 평화를 상징한다.'],
    ]},
    { m: '대표하다', syn: ['speak for'], ex: [
      ['She represented our school at the contest.', '그녀는 대회에서 우리 학교를 대표했다.'],
      ['He represents the workers.', '그는 노동자들을 대표한다.'],
    ]},
  ]},
  { w: 'require', p: 'v.', s: [
    { m: '요구하다, 필요로 하다', syn: ['need', 'call for'], ex: [
      ['This job requires patience.', '이 일은 인내를 요구한다.'],
      ['All students are required to wear uniforms.', '모든 학생은 교복을 입어야 한다.'],
      ['Growing plants requires care.', '식물을 기르는 데는 정성이 필요하다.'],
    ]},
  ]},
  { w: 'resource', p: 'n.', s: [
    { m: '자원', syn: ['supply', 'asset'], ex: [
      ['Water is a limited resource.', '물은 한정된 자원이다.'],
      ['The country is rich in natural resources.', '그 나라는 천연자원이 풍부하다.'],
      ['Time is our most valuable resource.', '시간은 우리의 가장 귀한 자원이다.'],
    ]},
  ]},
  { w: 'respect', p: 'v., n.', s: [
    { m: '존중하다; 존중', syn: ['honor', 'look up to'], ex: [
      ['We should respect others.', '우리는 다른 사람을 존중해야 한다.'],
      ['He respects his teacher very much.', '그는 선생님을 매우 존경한다.'],
      ['Treat everyone with respect.', '모두를 존중하는 태도로 대해라.'],
    ]},
  ]},
  { w: 'rest', p: 'n., v.', s: [
    { m: '휴식, 쉬다', syn: ['break'], ex: [
      ['You need some rest.', '너는 휴식이 좀 필요하다.'],
      ['Let us rest for ten minutes.', '10분만 쉬자.'],
    ]},
    { m: '나머지', syn: ['remainder'], ex: [
      ['I will do the rest tomorrow.', '나머지는 내일 할게.'],
      ['The rest of the students went home.', '나머지 학생들은 집에 갔다.'],
    ]},
  ]},
  { w: 'result', p: 'n.', s: [
    { m: '결과', syn: ['outcome', 'effect'], ex: [
      ['The result was better than I thought.', '결과는 생각보다 좋았다.'],
      ['We will announce the results tomorrow.', '우리는 내일 결과를 발표할 것이다.'],
      ['The accident was the result of carelessness.', '그 사고는 부주의의 결과였다.'],
    ]},
  ]},
  { w: 'result in', p: 'phr.', s: [
    { m: '~을 초래하다', syn: ['lead to', 'cause'], ex: [
      ['Careless driving results in accidents.', '부주의한 운전은 사고를 초래한다.'],
      ['The talks resulted in an agreement.', '그 회담은 합의를 낳았다.'],
      ['Too much sugar can result in illness.', '설탕을 너무 많이 먹으면 병이 날 수 있다.'],
    ]},
  ]},
  { w: 'ride', p: 'v.', s: [
    { m: '타다', syn: [], ex: [
      ['I ride the bus to school.', '나는 버스를 타고 학교에 간다.'],
      ['She rode a horse for the first time.', '그녀는 처음으로 말을 탔다.'],
      ['He is riding his bicycle in the park.', '그는 공원에서 자전거를 타고 있다.'],
    ]},
  ]},
  { w: 'roof', p: 'n.', s: [
    { m: '지붕', syn: [], ex: [
      ['The roof of our house is red.', '우리 집 지붕은 빨갛다.'],
      ['Snow covered the roof.', '눈이 지붕을 덮었다.'],
      ['A bird sat on the roof.', '새 한 마리가 지붕에 앉았다.'],
    ]},
  ]},
  { w: 'round', p: 'adj.', s: [
    { m: '둥근', syn: ['circular'], ex: [
      ['The table is round.', '그 탁자는 둥글다.'],
      ['The earth is round.', '지구는 둥글다.'],
      ['She wore round glasses.', '그녀는 둥근 안경을 썼다.'],
    ]},
  ]},
  { w: 'rule', p: 'n.', s: [
    { m: '규칙', syn: ['law', 'regulation'], ex: [
      ['We must follow the school rules.', '우리는 학교 규칙을 지켜야 한다.'],
      ['What are the rules of this game?', '이 게임의 규칙은 무엇이니?'],
      ['Breaking the rule is not allowed.', '규칙을 어기는 것은 허용되지 않는다.'],
    ]},
  ]},
  { w: 'seat', p: 'n.', s: [
    { m: '자리, 좌석', syn: ['place to sit'], ex: [
      ['Please take a seat.', '자리에 앉으세요.'],
      ['There are no seats left.', '남은 자리가 없다.'],
      ['She gave her seat to an old man.', '그녀는 노인에게 자리를 양보했다.'],
    ]},
  ]},
  { w: 'secret', p: 'n., adj.', s: [
    { m: '비밀, 비밀의', syn: ['hidden'], ex: [
      ['Can you keep a secret?', '비밀을 지킬 수 있니?'],
      ['She told me her secret.', '그녀는 나에게 비밀을 말해 주었다.'],
      ['They met in a secret place.', '그들은 비밀 장소에서 만났다.'],
    ]},
  ]},
  { w: 'seek', p: 'v.', s: [
    { m: '찾다, 구하다', syn: ['look for', 'search for'], ex: [
      ['They seek a better life.', '그들은 더 나은 삶을 찾는다.'],
      ['She sought help from her teacher.', '그녀는 선생님께 도움을 구했다.'],
      ['Many young people seek jobs in the city.', '많은 젊은이가 도시에서 일자리를 구한다.'],
    ]},
  ]},
  { w: 'seem', p: 'v.', s: [
    { m: '~인 것 같다, ~해 보이다', syn: ['appear'], ex: [
      ['She seems tired today.', '그녀는 오늘 피곤해 보인다.'],
      ['It seems like a good idea.', '그것은 좋은 생각인 것 같다.'],
      ['He seemed surprised at the news.', '그는 그 소식에 놀란 것 같았다.'],
    ]},
  ]},
  { w: 'sense', p: 'n.', s: [
    { m: '감각', syn: ['feeling'], ex: [
      ['Dogs have a good sense of smell.', '개는 후각이 뛰어나다.'],
      ['She lost her sense of taste.', '그녀는 미각을 잃었다.'],
    ]},
    { m: '의미, 뜻', syn: ['meaning'], ex: [
      ['That does not make sense.', '그것은 말이 되지 않는다.'],
      ['In a sense, you are right.', '어떤 의미에서는 네가 옳다.'],
    ]},
  ]},
  { w: 'sentence', p: 'n.', s: [
    { m: '문장', syn: [], ex: [
      ['Write a sentence with this word.', '이 단어로 문장을 하나 쓰세요.'],
      ['The sentence is too long.', '그 문장은 너무 길다.'],
      ['She read the first sentence aloud.', '그녀는 첫 문장을 소리 내어 읽었다.'],
    ]},
  ]},
  { w: 'serious', p: 'adj.', s: [
    { m: '심각한, 중대한', syn: ['grave', 'severe'], ex: [
      ['This is a serious matter.', '이것은 심각한 문제이다.'],
      ['He had a serious accident.', '그는 심각한 사고를 당했다.'],
    ]},
    { m: '진지한', syn: ['sincere', 'earnest'], ex: [
      ['Are you serious about quitting?', '그만두는 것에 대해 진심이니?'],
      ['She has a serious face.', '그녀는 진지한 표정을 하고 있다.'],
    ]},
  ]},
  { w: 'serve', p: 'v.', s: [
    { m: '(음식을) 내다, 제공하다', syn: ['provide'], ex: [
      ['They serve breakfast until ten.', '그들은 10시까지 아침을 제공한다.'],
      ['She served tea to the guests.', '그녀는 손님들에게 차를 내었다.'],
      ['This restaurant serves Korean food.', '이 식당은 한식을 낸다.'],
    ]},
  ]},
  { w: 'shape', p: 'n.', s: [
    { m: '모양, 형태', syn: ['form'], ex: [
      ['The cloud has a strange shape.', '그 구름은 이상한 모양이다.'],
      ['Draw a shape on the paper.', '종이에 도형을 하나 그려라.'],
      ['The cookies are in the shape of stars.', '쿠키가 별 모양이다.'],
    ]},
  ]},
  { w: 'share', p: 'v.', s: [
    { m: '나누다, 함께 쓰다', syn: ['split', 'divide'], ex: [
      ['I share a room with my brother.', '나는 형과 방을 함께 쓴다.'],
      ['Let’s share the pizza.', '피자를 나눠 먹자.'],
    ]},
    { m: '(생각을) 공유하다', syn: ['tell', 'pass on'], ex: [
      ['She shared her idea with the class.', '그녀는 자기 생각을 반 친구들과 나눴다.'],
      ['He shared the photo online.', '그는 그 사진을 온라인에 공유했다.'],
    ]},
  ]},
  { w: 'sharp', p: 'adj.', s: [
    { m: '날카로운', syn: [], ex: [
      ['Be careful, the knife is sharp.', '조심해, 칼이 날카로워.'],
      ['She cut the paper with a sharp blade.', '그녀는 날카로운 칼날로 종이를 잘랐다.'],
      ['He has sharp eyes.', '그는 눈이 예리하다.'],
    ]},
  ]},
], 'curriculum');
