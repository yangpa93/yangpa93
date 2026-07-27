/**
 * 고등학교 1학년 레벨 2 — 수록 136 / 계획 137개.
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
  { w: 'quarter', p: 'n.', s: [
    { m: '4분의 1, 15분', syn: ['fourth'], ex: [
      ['Cut the apple into quarters.', '사과를 4등분해라.'],
      ['It is a quarter past three.', '3시 15분이다.'],
      ['A quarter of the class was absent.', '반의 4분의 1이 결석했다.'],
    ]},
  ]},
  { w: 'quit', p: 'v.', s: [
    { m: '그만두다', syn: ['stop'], ex: [
      ['He quit smoking last year.', '그는 작년에 담배를 끊었다.'],
      ['Do not quit so easily.', '그렇게 쉽게 포기하지 마라.'],
      ['She quit her job in May.', '그녀는 5월에 일을 그만뒀다.'],
    ]},
  ]},
  { w: 'quite', p: 'adv.', s: [
    { m: '꽤, 상당히', syn: ['fairly'], ex: [
      ['The test was quite hard.', '시험이 꽤 어려웠다.'],
      ['She is quite tall.', '그녀는 상당히 키가 크다.'],
      ['That is quite enough.', '그거면 충분하다.'],
    ]},
  ]},
  { w: 'quote', p: 'v.', s: [
    { m: '인용하다', syn: ['cite'], ex: [
      ['He quoted a famous poem.', '그는 유명한 시를 인용했다.'],
      ['She quoted her teacher.', '그녀는 선생님 말을 인용했다.'],
      ['Do not quote me on that.', '그 말은 내 말로 인용하지 마라.'],
    ]},
  ]},
  { w: 'rail', p: 'n.', s: [
    { m: '철도, 난간', syn: ['track'], ex: [
      ['We traveled by rail.', '우리는 기차로 여행했다.'],
      ['Hold the rail on the stairs.', '계단에서는 난간을 잡아라.'],
      ['The rail runs along the river.', '철로가 강을 따라 이어진다.'],
    ]},
  ]},
  { w: 'rainbow', p: 'n.', s: [
    { m: '무지개', syn: ['arc of colors'], ex: [
      ['A rainbow appeared after the rain.', '비 온 뒤 무지개가 떴다.'],
      ['The rainbow has seven colors.', '무지개는 일곱 색이다.'],
      ['We saw a rainbow over the hill.', '우리는 언덕 위 무지개를 보았다.'],
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
  { w: 'range', p: 'n.', s: [
    { m: '범위, 산맥', syn: ['scope'], ex: [
      ['The price range is wide.', '가격 범위가 넓다.'],
      ['A mountain range lies to the north.', '산맥이 북쪽에 있다.'],
      ['This shop has a small range of books.', '이 가게는 책 종류가 적다.'],
    ]},
  ]},
  { w: 'rapid', p: 'adj.', s: [
    { m: '빠른, 급속한', syn: ['fast'], ex: [
      ['The change was rapid.', '그 변화는 빨랐다.'],
      ['A rapid river runs here.', '물살 빠른 강이 여기 흐른다.'],
      ['She made rapid progress.', '그녀는 빠르게 발전했다.'],
    ]},
  ]},
  { w: 'rare', p: 'adj.', s: [
    { m: '드문, 희귀한', syn: ['uncommon'], ex: [
      ['This bird is very rare.', '이 새는 아주 희귀하다.'],
      ['Snow is rare in this city.', '이 도시에서 눈은 드물다.'],
      ['A rare chance came to him.', '드문 기회가 그에게 왔다.'],
    ]},
  ]},
  { w: 'rat', p: 'n.', s: [
    { m: '쥐', syn: ['rodent'], ex: [
      ['A rat ran under the box.', '쥐 한 마리가 상자 밑으로 달아났다.'],
      ['Rats live in dark places.', '쥐는 어두운 곳에 산다.'],
      ['The cat caught a rat.', '고양이가 쥐를 잡았다.'],
    ]},
  ]},
  { w: 'rate', p: 'n.', s: [
    { m: '비율, 속도, 요금', syn: ['ratio'], ex: [
      ['The success rate is high.', '성공률이 높다.'],
      ['The hotel rate went up.', '호텔 요금이 올랐다.'],
      ['He works at a fast rate.', '그는 빠른 속도로 일한다.'],
    ]},
  ]},
  { w: 'rather', p: 'adv.', s: [
    { m: '오히려, 다소', syn: ['instead'], ex: [
      ['It is rather cold today.', '오늘은 다소 춥다.'],
      ['I would rather stay home.', '나는 차라리 집에 있겠다.'],
      ['She is rather quiet.', '그녀는 다소 조용하다.'],
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
  { w: 'react', p: 'v.', s: [
    { m: '반응하다', syn: ['respond'], ex: [
      ['How did she react?', '그녀는 어떻게 반응했니?'],
      ['He reacted quickly to the news.', '그는 그 소식에 빠르게 반응했다.'],
      ['Plants react to light.', '식물은 빛에 반응한다.'],
    ]},
  ]},
  { w: 'real', p: 'adj.', s: [
    { m: '진짜의, 실제의', syn: ['genuine'], ex: [
      ['Is this a real diamond?', '이것은 진짜 다이아몬드니?'],
      ['That was a real problem.', '그것은 실제 문제였다.'],
      ['She showed real courage.', '그녀는 진정한 용기를 보였다.'],
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
  { w: 'recipe', p: 'n.', s: [
    { m: '조리법, 요리법', syn: ['formula'], ex: [
      ['She followed the recipe exactly.', '그녀는 조리법을 그대로 따랐다.'],
      ['This recipe is simple.', '이 요리법은 간단하다.'],
      ['He wrote down the recipe.', '그는 조리법을 적어 두었다.'],
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
  { w: 'recommend', p: 'v.', s: [
    { m: '추천하다', syn: ['suggest'], ex: [
      ['I recommend this book.', '나는 이 책을 추천한다.'],
      ['She recommended a good doctor.', '그녀는 좋은 의사를 추천해 주었다.'],
      ['They recommend more rest.', '그들은 휴식을 더 취하라고 권한다.'],
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
  { w: 'recover', p: 'v.', s: [
    { m: '회복하다', syn: ['get better'], ex: [
      ['He recovered from the flu.', '그는 독감에서 회복했다.'],
      ['She is recovering slowly.', '그녀는 천천히 회복하고 있다.'],
      ['They recovered the lost bag.', '그들은 잃어버린 가방을 되찾았다.'],
    ]},
  ]},
  { w: 'reduce', p: 'v.', s: [
    { m: '줄이다', syn: ['cut down', 'lower'], ex: [
      ['We should reduce plastic waste.', '우리는 플라스틱 쓰레기를 줄여야 한다.'],
      ['The store reduced its prices.', '그 가게는 가격을 낮췄다.'],
      ['Walking can reduce stress.', '걷기는 스트레스를 줄일 수 있다.'],
    ]},
  ]},
  { w: 'refer', p: 'v.', s: [
    { m: '언급하다, 참조하다', syn: ['mention'], ex: [
      ['She referred to the map.', '그녀는 지도를 참조했다.'],
      ['He referred to my question.', '그는 내 질문을 언급했다.'],
      ['Refer to page ten.', '10쪽을 참고해라.'],
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
  { w: 'refuse', p: 'v.', s: [
    { m: '거절하다', syn: ['decline'], ex: [
      ['She refused the offer.', '그녀는 그 제안을 거절했다.'],
      ['He refused to answer.', '그는 답하기를 거부했다.'],
      ['They are refusing to leave.', '그들은 떠나기를 거부하고 있다.'],
    ]},
  ]},
  { w: 'regard', p: 'v.', s: [
    { m: '여기다, 간주하다', syn: ['consider'], ex: [
      ['Many regard him as a hero.', '많은 사람이 그를 영웅으로 여긴다.'],
      ['She regards this as important.', '그녀는 이것을 중요하게 여긴다.'],
      ['We regard safety first.', '우리는 안전을 우선으로 여긴다.'],
    ]},
  ]},
  { w: 'region', p: 'n.', s: [
    { m: '지역, 지방', syn: ['area'], ex: [
      ['This region is famous for apples.', '이 지역은 사과로 유명하다.'],
      ['The region has cold winters.', '그 지방은 겨울이 춥다.'],
      ['Each region has its own food.', '지역마다 고유한 음식이 있다.'],
    ]},
  ]},
  { w: 'register', p: 'v.', s: [
    { m: '등록하다', syn: ['enroll'], ex: [
      ['Register for the class today.', '오늘 수업에 등록해라.'],
      ['She registered her name.', '그녀는 이름을 등록했다.'],
      ['He is registering online.', '그는 온라인으로 등록하고 있다.'],
    ]},
  ]},
  { w: 'regular', p: 'adj.', s: [
    { m: '규칙적인, 정기적인', syn: ['steady', 'routine'], ex: [
      ['Regular exercise keeps you healthy.', '규칙적인 운동은 건강을 지켜 준다.'],
      ['We have regular meetings on Monday.', '우리는 월요일마다 정기 회의를 한다.'],
      ['Try to keep regular sleeping hours.', '규칙적인 수면 시간을 유지하려고 해라.'],
    ]},
  ]},
  { w: 'relate', p: 'v.', s: [
    { m: '관련시키다, 이야기하다', syn: ['connect'], ex: [
      ['The two problems relate closely.', '두 문제는 밀접히 관련된다.'],
      ['She related the whole story.', '그녀는 이야기 전부를 들려주었다.'],
      ['This does not relate to us.', '이것은 우리와 관련이 없다.'],
    ]},
  ]},
  { w: 'relax', p: 'v.', s: [
    { m: '쉬다, 긴장을 풀다', syn: ['rest'], ex: [
      ['I relax by listening to music.', '나는 음악을 들으며 쉰다.'],
      ['She relaxed on the sofa after work.', '그녀는 일 후에 소파에서 쉬었다.'],
      ['Relax, everything will be fine.', '긴장 풀어, 다 잘될 거야.'],
    ]},
  ]},
  { w: 'release', p: 'v.', s: [
    { m: '풀어주다, 공개하다', syn: ['free'], ex: [
      ['They released the bird.', '그들은 새를 놓아주었다.'],
      ['The band released a new song.', '그 밴드가 새 노래를 냈다.'],
      ['He was released yesterday.', '그는 어제 풀려났다.'],
    ]},
  ]},
  { w: 'relief', p: 'n.', s: [
    { m: '안도, 구호', syn: ['comfort'], ex: [
      ['Her smile was a relief.', '그녀의 미소가 안도를 주었다.'],
      ['Relief came after the rain stopped.', '비가 그치자 안도가 찾아왔다.'],
      ['They sent relief to the village.', '그들은 마을에 구호품을 보냈다.'],
    ]},
  ]},
  { w: 'rely', p: 'v.', s: [
    { m: '의지하다, 믿다', syn: ['depend'], ex: [
      ['You can rely on her.', '너는 그녀를 믿어도 된다.'],
      ['We rely on the bus.', '우리는 버스에 의존한다.'],
      ['He relied on his brother.', '그는 형에게 의지했다.'],
    ]},
  ]},
  { w: 'rely on', p: 'phr.', s: [
    { m: '~에 의존하다, 믿다', syn: ['depend on', 'count on'], ex: [
      ['We rely on public transport.', '우리는 대중교통에 의존한다.'],
      ['You can rely on her to be honest.', '그녀가 정직할 것이라고 믿어도 된다.'],
      ['Many farmers rely on rain.', '많은 농부가 비에 의존한다.'],
    ]},
  ]},
  { w: 'remain', p: 'v.', s: [
    { m: '남다, 계속 ~이다', syn: ['stay'], ex: [
      ['Few seats remain.', '남은 자리가 거의 없다.'],
      ['She remained silent.', '그녀는 계속 침묵했다.'],
      ['Problems remained after the meeting.', '회의 후에도 문제가 남았다.'],
    ]},
  ]},
  { w: 'remark', p: 'n.', s: [
    { m: '말, 발언', syn: ['comment'], ex: [
      ['His remark surprised us.', '그의 말이 우리를 놀라게 했다.'],
      ['She made a kind remark.', '그녀는 친절한 말을 했다.'],
      ['That remark was unfair.', '그 발언은 부당했다.'],
    ]},
  ]},
  { w: 'remind', p: 'v.', s: [
    { m: '상기시키다', syn: ['prompt'], ex: [
      ['Remind me to call her.', '그녀에게 전화하라고 알려 줘.'],
      ['This song reminds me of home.', '이 노래는 나에게 고향을 떠올리게 한다.'],
      ['She reminded us of the rule.', '그녀는 우리에게 규칙을 상기시켰다.'],
    ]},
  ]},
  { w: 'remove', p: 'v.', s: [
    { m: '없애다, 제거하다', syn: ['take away'], ex: [
      ['Remove your shoes here.', '여기서 신발을 벗어라.'],
      ['She removed the stain.', '그녀는 얼룩을 없앴다.'],
      ['They are removing the old sign.', '그들은 낡은 간판을 떼고 있다.'],
    ]},
  ]},
  { w: 'rent', p: 'v.', s: [
    { m: '빌리다, 임대하다', syn: ['lease'], ex: [
      ['We rented a car for the trip.', '우리는 여행을 위해 차를 빌렸다.'],
      ['They rent a small flat.', '그들은 작은 아파트를 세 얻어 산다.'],
      ['She rents out her room.', '그녀는 자기 방을 세놓는다.'],
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
  { w: 'replace', p: 'v.', s: [
    { m: '대체하다, 교체하다', syn: ['substitute'], ex: [
      ['Replace the old battery.', '낡은 배터리를 교체해라.'],
      ['Nothing can replace family.', '가족을 대신할 것은 없다.'],
      ['They replaced the broken window.', '그들은 깨진 창문을 갈았다.'],
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
  { w: 'request', p: 'n.', s: [
    { m: '요청, 부탁', syn: ['appeal'], ex: [
      ['Her request was simple.', '그녀의 요청은 간단했다.'],
      ['We received many requests.', '우리는 많은 요청을 받았다.'],
      ['He made a polite request.', '그는 정중히 요청했다.'],
    ]},
  ]},
  { w: 'require', p: 'v.', s: [
    { m: '요구하다, 필요로 하다', syn: ['need', 'call for'], ex: [
      ['This job requires patience.', '이 일은 인내를 요구한다.'],
      ['All students are required to wear uniforms.', '모든 학생은 교복을 입어야 한다.'],
      ['Growing plants requires care.', '식물을 기르는 데는 정성이 필요하다.'],
    ]},
  ]},
  { w: 'research', p: 'n.', s: [
    { m: '연구, 조사', syn: ['study'], ex: [
      ['Her research took two years.', '그녀의 연구는 2년이 걸렸다.'],
      ['Research shows a clear pattern.', '연구는 분명한 양상을 보여 준다.'],
      ['He does research on birds.', '그는 새에 관해 연구한다.'],
    ]},
  ]},
  { w: 'reserve', p: 'v.', s: [
    { m: '예약하다, 남겨 두다', syn: ['book'], ex: [
      ['Reserve a table for four.', '네 명 자리를 예약해라.'],
      ['She reserved the seat online.', '그녀는 온라인으로 자리를 예약했다.'],
      ['We reserve this room for guests.', '우리는 이 방을 손님용으로 남겨 둔다.'],
    ]},
  ]},
  { w: 'resist', p: 'v.', s: [
    { m: '저항하다, 참다', syn: ['withstand'], ex: [
      ['She could not resist the cake.', '그녀는 케이크를 참지 못했다.'],
      ['They resisted the change.', '그들은 그 변화에 저항했다.'],
      ['Plants resist cold weather.', '식물은 추운 날씨를 견딘다.'],
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
  { w: 'respond', p: 'v.', s: [
    { m: '응답하다, 반응하다', syn: ['reply'], ex: [
      ['She responded to my email.', '그녀는 내 이메일에 답했다.'],
      ['He did not respond at all.', '그는 전혀 반응하지 않았다.'],
      ['Patients respond to the medicine.', '환자들이 그 약에 반응한다.'],
    ]},
  ]},
  { w: 'responsible', p: 'adj.', s: [
    { m: '책임이 있는', syn: ['accountable'], ex: [
      ['She is responsible for the class.', '그녀가 그 반을 책임진다.'],
      ['Who is responsible for this?', '이것은 누구 책임이니?'],
      ['A responsible person keeps promises.', '책임감 있는 사람은 약속을 지킨다.'],
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
  { w: 'retire', p: 'v.', s: [
    { m: '은퇴하다', syn: ['leave work'], ex: [
      ['My father will retire next year.', '아버지는 내년에 은퇴하신다.'],
      ['She retired at sixty.', '그녀는 예순에 은퇴했다.'],
      ['He retired from the team.', '그는 팀에서 물러났다.'],
    ]},
  ]},
  { w: 'rice', p: 'n.', s: [
    { m: '쌀, 밥', syn: ['grain'], ex: [
      ['We eat rice every day.', '우리는 매일 밥을 먹는다.'],
      ['Rice grows in wet fields.', '쌀은 논에서 자란다.'],
      ['She cooked rice for dinner.', '그녀는 저녁으로 밥을 지었다.'],
    ]},
  ]},
  { w: 'ride', p: 'v.', s: [
    { m: '타다', syn: [], ex: [
      ['I ride the bus to school.', '나는 버스를 타고 학교에 간다.'],
      ['She rode a horse for the first time.', '그녀는 처음으로 말을 탔다.'],
      ['He is riding his bicycle in the park.', '그는 공원에서 자전거를 타고 있다.'],
    ]},
  ]},
  { w: 'rise', p: 'v.', s: [
    { m: '오르다, 뜨다', syn: ['go up'], ex: [
      ['The sun rises in the east.', '해는 동쪽에서 뜬다.'],
      ['Prices rose last month.', '지난달에 물가가 올랐다.'],
      ['Smoke is rising from the roof.', '지붕에서 연기가 오르고 있다.'],
    ]},
  ]},
  { w: 'risk', p: 'n.', s: [
    { m: '위험, 위험 요소', syn: ['danger'], ex: [
      ['There is a risk of rain.', '비 올 위험이 있다.'],
      ['She took a big risk.', '그녀는 큰 위험을 감수했다.'],
      ['Smoking raises health risks.', '흡연은 건강 위험을 높인다.'],
    ]},
  ]},
  { w: 'rob', p: 'v.', s: [
    { m: '털다, 강탈하다', syn: ['steal from'], ex: [
      ['They robbed the bank.', '그들은 은행을 털었다.'],
      ['He was robbed on the street.', '그는 길에서 강도를 당했다.'],
      ['Do not rob others of hope.', '남에게서 희망을 빼앗지 마라.'],
    ]},
  ]},
  { w: 'rocket', p: 'n.', s: [
    { m: '로켓', syn: ['missile'], ex: [
      ['The rocket left the ground.', '로켓이 지면을 떠났다.'],
      ['A rocket carries people to space.', '로켓은 사람을 우주로 나른다.'],
      ['They built a small rocket.', '그들은 작은 로켓을 만들었다.'],
    ]},
  ]},
  { w: 'role', p: 'n.', s: [
    { m: '역할', syn: ['part'], ex: [
      ['She played an important role.', '그녀는 중요한 역할을 했다.'],
      ['Each member has a role.', '각 구성원에게 역할이 있다.'],
      ['His role is to guide us.', '그의 역할은 우리를 이끄는 것이다.'],
    ]},
  ]},
  { w: 'roll', p: 'v.', s: [
    { m: '구르다, 말다', syn: ['turn over'], ex: [
      ['The ball rolled down the hill.', '공이 언덕을 굴러 내려갔다.'],
      ['She rolled the paper up.', '그녀는 종이를 둘둘 말았다.'],
      ['Rocks are rolling down.', '바위가 굴러 내려오고 있다.'],
    ]},
  ]},
  { w: 'roof', p: 'n.', s: [
    { m: '지붕', syn: [], ex: [
      ['The roof of our house is red.', '우리 집 지붕은 빨갛다.'],
      ['Snow covered the roof.', '눈이 지붕을 덮었다.'],
      ['A bird sat on the roof.', '새 한 마리가 지붕에 앉았다.'],
    ]},
  ]},
  { w: 'root', p: 'n.', s: [
    { m: '뿌리, 근원', syn: ['origin'], ex: [
      ['The tree has deep roots.', '그 나무는 뿌리가 깊다.'],
      ['Find the root of the problem.', '문제의 근원을 찾아라.'],
      ['Roots take in water.', '뿌리는 물을 빨아들인다.'],
    ]},
  ]},
  { w: 'rope', p: 'n.', s: [
    { m: '밧줄', syn: ['cord'], ex: [
      ['Pull the rope hard.', '밧줄을 세게 당겨라.'],
      ['The rope is too short.', '그 밧줄은 너무 짧다.'],
      ['They tied the boat with a rope.', '그들은 밧줄로 배를 묶었다.'],
    ]},
  ]},
  { w: 'rough', p: 'adj.', s: [
    { m: '거친, 대략의', syn: ['coarse'], ex: [
      ['The road is rough here.', '여기 길은 거칠다.'],
      ['Give me a rough number.', '대략적인 수치를 알려 줘.'],
      ['His hands are rough from work.', '그의 손은 일 때문에 거칠다.'],
    ]},
  ]},
  { w: 'round', p: 'adj.', s: [
    { m: '둥근', syn: ['circular'], ex: [
      ['The table is round.', '그 탁자는 둥글다.'],
      ['The earth is round.', '지구는 둥글다.'],
      ['She wore round glasses.', '그녀는 둥근 안경을 썼다.'],
    ]},
  ]},
  { w: 'route', p: 'n.', s: [
    { m: '길, 경로', syn: ['path'], ex: [
      ['We took a different route.', '우리는 다른 길로 갔다.'],
      ['The route is closed today.', '그 경로는 오늘 막혀 있다.'],
      ['This bus route is new.', '이 버스 노선은 새로 생겼다.'],
    ]},
  ]},
  { w: 'row', p: 'n.', s: [
    { m: '줄, 열', syn: ['line'], ex: [
      ['She sat in the front row.', '그녀는 앞줄에 앉았다.'],
      ['Plant the seeds in a row.', '씨앗을 한 줄로 심어라.'],
      ['Three books stood in a row.', '책 세 권이 한 줄로 서 있었다.'],
    ]},
  ]},
  { w: 'royal', p: 'adj.', s: [
    { m: '왕실의', syn: ['regal'], ex: [
      ['The royal family lives there.', '왕실 가족이 거기 산다.'],
      ['They visited a royal palace.', '그들은 왕궁을 방문했다.'],
      ['A royal guard stood at the gate.', '왕실 근위병이 정문에 섰다.'],
    ]},
  ]},
  { w: 'rub', p: 'v.', s: [
    { m: '문지르다, 비비다', syn: ['scrub'], ex: [
      ['She rubbed her eyes.', '그녀는 눈을 비볐다.'],
      ['Rub the stain with a cloth.', '천으로 얼룩을 문질러라.'],
      ['He is rubbing his cold hands.', '그는 시린 손을 비비고 있다.'],
    ]},
  ]},
  { w: 'rude', p: 'adj.', s: [
    { m: '무례한', syn: ['impolite'], ex: [
      ['That was a rude answer.', '그것은 무례한 대답이었다.'],
      ['Do not be rude to guests.', '손님에게 무례하게 굴지 마라.'],
      ['His rude words hurt her.', '그의 무례한 말이 그녀를 상처 입혔다.'],
    ]},
  ]},
  { w: 'ruin', p: 'v.', s: [
    { m: '망치다, 파괴하다', syn: ['destroy'], ex: [
      ['Rain ruined our picnic.', '비가 우리 소풍을 망쳤다.'],
      ['One mistake ruined the plan.', '실수 하나가 계획을 망쳤다.'],
      ['The fire ruined the house.', '불이 그 집을 파괴했다.'],
    ]},
  ]},
  { w: 'rule', p: 'n.', s: [
    { m: '규칙', syn: ['law', 'regulation'], ex: [
      ['We must follow the school rules.', '우리는 학교 규칙을 지켜야 한다.'],
      ['What are the rules of this game?', '이 게임의 규칙은 무엇이니?'],
      ['Breaking the rule is not allowed.', '규칙을 어기는 것은 허용되지 않는다.'],
    ]},
  ]},
  { w: 'rush', p: 'v.', s: [
    { m: '서두르다, 돌진하다', syn: ['hurry'], ex: [
      ['Do not rush your work.', '일을 서두르지 마라.'],
      ['She rushed to the station.', '그녀는 역으로 서둘러 갔다.'],
      ['People are rushing home.', '사람들이 집으로 서둘러 가고 있다.'],
    ]},
  ]},
  { w: 'sail', p: 'v.', s: [
    { m: '항해하다', syn: ['navigate'], ex: [
      ['They sailed across the sea.', '그들은 바다를 건너 항해했다.'],
      ['The ship sails at dawn.', '배는 새벽에 출항한다.'],
      ['We are sailing to the island.', '우리는 섬으로 항해하고 있다.'],
    ]},
  ]},
  { w: 'salary', p: 'n.', s: [
    { m: '급여, 월급', syn: ['pay'], ex: [
      ['His salary is not high.', '그의 월급은 높지 않다.'],
      ['She saves half her salary.', '그녀는 월급의 절반을 저축한다.'],
      ['The salary is paid monthly.', '급여는 매달 지급된다.'],
    ]},
  ]},
  { w: 'sample', p: 'n.', s: [
    { m: '표본, 견본', syn: ['specimen'], ex: [
      ['Take a sample of the water.', '물 표본을 채취해라.'],
      ['She gave me a free sample.', '그녀는 나에게 무료 샘플을 주었다.'],
      ['The sample was too small.', '그 표본은 너무 적었다.'],
    ]},
  ]},
  { w: 'satisfy', p: 'v.', s: [
    { m: '만족시키다', syn: ['please'], ex: [
      ['The answer satisfied everyone.', '그 답이 모두를 만족시켰다.'],
      ['Nothing satisfies him.', '그는 무엇에도 만족하지 않는다.'],
      ['She was satisfied with the result.', '그녀는 결과에 만족했다.'],
    ]},
  ]},
  { w: 'sauce', p: 'n.', s: [
    { m: '소스', syn: ['dressing'], ex: [
      ['Add sauce to the noodles.', '국수에 소스를 넣어라.'],
      ['This sauce is too salty.', '이 소스는 너무 짜다.'],
      ['She made a tomato sauce.', '그녀는 토마토 소스를 만들었다.'],
    ]},
  ]},
  { w: 'scale', p: 'n.', s: [
    { m: '규모, 저울', syn: ['size'], ex: [
      ['The project is large in scale.', '그 사업은 규모가 크다.'],
      ['Weigh it on the scale.', '저울에 그것을 달아라.'],
      ['Draw the map to scale.', '지도를 축척에 맞춰 그려라.'],
    ]},
  ]},
  { w: 'scare', p: 'v.', s: [
    { m: '겁주다, 무섭게 하다', syn: ['frighten'], ex: [
      ['The loud sound scared me.', '큰 소리가 나를 놀라게 했다.'],
      ['Do not scare your sister.', '누나를 겁주지 마라.'],
      ['Thunder scares the dog.', '천둥이 개를 무섭게 한다.'],
    ]},
  ]},
  { w: 'scarf', p: 'n.', s: [
    { m: '목도리, 스카프', syn: ['wrap'], ex: [
      ['She wore a warm scarf.', '그녀는 따뜻한 목도리를 했다.'],
      ['The scarf is made of wool.', '그 목도리는 양모로 만들어졌다.'],
      ['He lost his scarf on the bus.', '그는 버스에서 목도리를 잃어버렸다.'],
    ]},
  ]},
  { w: 'scene', p: 'n.', s: [
    { m: '장면, 현장', syn: ['sight'], ex: [
      ['The last scene was moving.', '마지막 장면은 감동적이었다.'],
      ['Police arrived at the scene.', '경찰이 현장에 도착했다.'],
      ['What a beautiful scene!', '정말 아름다운 광경이구나!'],
    ]},
  ]},
  { w: 'schedule', p: 'n.', s: [
    { m: '일정, 시간표', syn: ['timetable'], ex: [
      ['Check the schedule first.', '먼저 일정을 확인해라.'],
      ['Our schedule is very tight.', '우리 일정은 아주 빠듯하다.'],
      ['The train is on schedule.', '기차는 정시 운행 중이다.'],
    ]},
  ]},
  { w: 'scratch', p: 'v.', s: [
    { m: '긁다', syn: ['scrape'], ex: [
      ['Do not scratch the table.', '탁자를 긁지 마라.'],
      ['The cat scratched my hand.', '고양이가 내 손을 할퀴었다.'],
      ['She is scratching her arm.', '그녀는 팔을 긁고 있다.'],
    ]},
  ]},
  { w: 'scream', p: 'v.', s: [
    { m: '비명을 지르다', syn: ['shriek'], ex: [
      ['She screamed in fright.', '그녀는 놀라서 비명을 질렀다.'],
      ['Do not scream indoors.', '실내에서 소리 지르지 마라.'],
      ['The children screamed with joy.', '아이들이 기뻐서 소리쳤다.'],
    ]},
  ]},
  { w: 'screen', p: 'n.', s: [
    { m: '화면, 가리개', syn: ['display'], ex: [
      ['The screen is too bright.', '화면이 너무 밝다.'],
      ['She looked at the screen.', '그녀는 화면을 봤다.'],
      ['A screen blocked the wind.', '가리개가 바람을 막았다.'],
    ]},
  ]},
  { w: 'seal', p: 'v.', s: [
    { m: '봉하다, 밀봉하다', syn: ['close'], ex: [
      ['Seal the envelope, please.', '봉투를 봉해 주세요.'],
      ['She sealed the jar tightly.', '그녀는 병을 꽉 밀봉했다.'],
      ['They sealed the box with tape.', '그들은 상자를 테이프로 봉했다.'],
    ]},
  ]},
  { w: 'search', p: 'v.', s: [
    { m: '찾다, 수색하다', syn: ['look for'], ex: [
      ['They searched the whole house.', '그들은 온 집을 수색했다.'],
      ['She searched for her keys.', '그녀는 열쇠를 찾았다.'],
      ['We are searching online.', '우리는 온라인에서 검색하고 있다.'],
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
  { w: 'secretary', p: 'n.', s: [
    { m: '비서', syn: ['assistant'], ex: [
      ['The secretary answered the phone.', '비서가 전화를 받았다.'],
      ['She works as a secretary.', '그녀는 비서로 일한다.'],
      ['Ask the secretary for the form.', '비서에게 양식을 요청해라.'],
    ]},
  ]},
  { w: 'section', p: 'n.', s: [
    { m: '부분, 구역', syn: ['part'], ex: [
      ['Read the first section.', '첫 부분을 읽어라.'],
      ['This section is for children.', '이 구역은 아이들용이다.'],
      ['The book has five sections.', '그 책은 다섯 부분으로 되어 있다.'],
    ]},
  ]},
  { w: 'secure', p: 'adj.', s: [
    { m: '안전한, 확실한', syn: ['safe'], ex: [
      ['The house is secure now.', '그 집은 이제 안전하다.'],
      ['She has a secure job.', '그녀는 안정된 직업이 있다.'],
      ['Keep your password secure.', '비밀번호를 안전하게 지켜라.'],
    ]},
  ]},
  { w: 'seed', p: 'n.', s: [
    { m: '씨, 씨앗', syn: ['kernel'], ex: [
      ['Plant the seed in spring.', '봄에 씨앗을 심어라.'],
      ['A seed grows into a tree.', '씨앗은 자라서 나무가 된다.'],
      ['She saved seeds from the fruit.', '그녀는 과일에서 씨를 받아 두었다.'],
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
  { w: 'select', p: 'v.', s: [
    { m: '선택하다, 고르다', syn: ['choose'], ex: [
      ['Select one from the list.', '목록에서 하나를 고르세요.'],
      ['She selected a red one.', '그녀는 빨간 것을 골랐다.'],
      ['They selected him as captain.', '그들은 그를 주장으로 뽑았다.'],
    ]},
  ]},
  { w: 'self', p: 'n.', s: [
    { m: '자기 자신', syn: ['oneself'], ex: [
      ['Be true to your self.', '자기 자신에게 진실해라.'],
      ['She lost her sense of self.', '그녀는 자아 감각을 잃었다.'],
      ['Care for your self first.', '먼저 자기 자신을 돌봐라.'],
    ]},
  ]},
  { w: 'senior', p: 'adj.', s: [
    { m: '손위의, 상급의', syn: ['older'], ex: [
      ['He is senior to me.', '그는 나보다 손위다.'],
      ['Senior students help the younger ones.', '상급생이 후배를 돕는다.'],
      ['She holds a senior position.', '그녀는 고위직을 맡고 있다.'],
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
  { w: 'separate', p: 'v.', s: [
    { m: '분리하다, 나누다', syn: ['divide'], ex: [
      ['Separate the trash by type.', '쓰레기를 종류별로 분리해라.'],
      ['They separated the two groups.', '그들은 두 무리를 나눴다.'],
      ['A wall separates the rooms.', '벽이 방들을 나눈다.'],
    ]},
  ]},
  { w: 'series', p: 'n.', s: [
    { m: '연속, 시리즈', syn: ['sequence'], ex: [
      ['We watched the whole series.', '우리는 그 시리즈를 다 봤다.'],
      ['A series of tests followed.', '일련의 검사가 이어졌다.'],
      ['The series has five books.', '그 시리즈는 책 다섯 권이다.'],
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
  { w: 'session', p: 'n.', s: [
    { m: '시간, 기간', syn: ['meeting'], ex: [
      ['The morning session was long.', '오전 시간은 길었다.'],
      ['We had a practice session.', '우리는 연습 시간을 가졌다.'],
      ['The session ended early.', '그 회기는 일찍 끝났다.'],
    ]},
  ]},
  { w: 'settle', p: 'v.', s: [
    { m: '정착하다, 해결하다', syn: ['resolve'], ex: [
      ['They settled in this town.', '그들은 이 마을에 정착했다.'],
      ['We settled the argument.', '우리는 그 다툼을 해결했다.'],
      ['Dust settled on the table.', '먼지가 탁자에 내려앉았다.'],
    ]},
  ]},
  { w: 'several', p: 'adj.', s: [
    { m: '몇몇의', syn: ['a few'], ex: [
      ['Several students were late.', '몇몇 학생이 늦었다.'],
      ['She read several books.', '그녀는 책 몇 권을 읽었다.'],
      ['We waited several hours.', '우리는 몇 시간을 기다렸다.'],
    ]},
  ]},
  { w: 'sew', p: 'v.', s: [
    { m: '바느질하다, 꿰매다', syn: ['stitch'], ex: [
      ['She sewed a button on.', '그녀는 단추를 달았다.'],
      ['My mother sews very well.', '우리 어머니는 바느질을 아주 잘하신다.'],
      ['He is sewing a torn bag.', '그는 찢어진 가방을 꿰매고 있다.'],
    ]},
  ]},
  { w: 'shade', p: 'n.', s: [
    { m: '그늘', syn: ['shadow'], ex: [
      ['We sat in the shade.', '우리는 그늘에 앉았다.'],
      ['The tree gives good shade.', '그 나무는 좋은 그늘을 만든다.'],
      ['Find shade on a hot day.', '더운 날에는 그늘을 찾아라.'],
    ]},
  ]},
  { w: 'shadow', p: 'n.', s: [
    { m: '그림자', syn: ['silhouette'], ex: [
      ['My shadow is long in the evening.', '저녁에는 내 그림자가 길다.'],
      ['A shadow moved on the wall.', '벽에 그림자가 움직였다.'],
      ['The tree cast a shadow.', '나무가 그림자를 드리웠다.'],
    ]},
  ]},
  { w: 'shake', p: 'v.', s: [
    { m: '흔들다, 떨다', syn: ['tremble'], ex: [
      ['Shake the bottle before use.', '쓰기 전에 병을 흔들어라.'],
      ['Her hands shook with cold.', '그녀의 손이 추위로 떨렸다.'],
      ['The ground is shaking.', '땅이 흔들리고 있다.'],
    ]},
  ]},
  { w: 'shall', p: 'v.', s: [
    { m: '~할 것이다, ~할까요', syn: ['will'], ex: [
      ['Shall we go now?', '지금 갈까요?'],
      ['We shall meet again.', '우리는 다시 만날 것이다.'],
      ['Shall I open the window?', '창문을 열까요?'],
    ]},
  ]},
  { w: 'shame', p: 'n.', s: [
    { m: '부끄러움, 수치', syn: ['embarrassment'], ex: [
      ['He felt shame after lying.', '그는 거짓말한 뒤 부끄러움을 느꼈다.'],
      ['What a shame!', '정말 안타깝구나!'],
      ['Shame kept her silent.', '부끄러움이 그녀를 침묵하게 했다.'],
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
  { w: 'shave', p: 'v.', s: [
    { m: '면도하다', syn: ['trim'], ex: [
      ['He shaves every morning.', '그는 매일 아침 면도한다.'],
      ['She shaved the dog\'s fur.', '그녀는 개의 털을 깎았다.'],
      ['He is shaving now.', '그는 지금 면도하고 있다.'],
    ]},
  ]},
  { w: 'sheep', p: 'n.', s: [
    { m: '양', syn: ['woolly animal'], ex: [
      ['Sheep eat grass all day.', '양은 하루 종일 풀을 먹는다.'],
      ['The sheep stayed near the fence.', '양들이 울타리 근처에 있었다.'],
      ['Wool comes from sheep.', '양모는 양에게서 나온다.'],
    ]},
  ]},
  { w: 'sheet', p: 'n.', s: [
    { m: '한 장, 시트', syn: ['leaf'], ex: [
      ['Give me a sheet of paper.', '종이 한 장 주세요.'],
      ['She changed the bed sheet.', '그녀는 침대 시트를 갈았다.'],
      ['The sheet was torn.', '그 장이 찢어져 있었다.'],
    ]},
  ]},
  { w: 'shelf', p: 'n.', s: [
    { m: '선반', syn: ['ledge'], ex: [
      ['The book is on the top shelf.', '책은 맨 위 선반에 있다.'],
      ['She built a wooden shelf.', '그녀는 나무 선반을 만들었다.'],
      ['The shelf is full of books.', '그 선반은 책으로 가득하다.'],
    ]},
  ]},
  { w: 'shell', p: 'n.', s: [
    { m: '껍데기, 껍질', syn: ['casing'], ex: [
      ['We found a shell on the beach.', '우리는 해변에서 조개껍데기를 발견했다.'],
      ['The egg shell cracked.', '달걀 껍데기가 깨졌다.'],
      ['A turtle hides in its shell.', '거북은 등딱지 안에 숨는다.'],
    ]},
  ]},
], 'curriculum');
