/**
 * 고등학교 1학년 레벨 4 — 수록 22 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장), 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H1_4 = defineLevel('h1-4', [
  { w: 'abandon', p: 'v.', s: [
    { m: '버리다, 포기하다', syn: ['give up', 'desert'], ex: [
      ['They abandoned the old plan.', '그들은 옛 계획을 포기했다.'],
      ['The building was abandoned years ago.', '그 건물은 몇 년 전에 버려졌다.'],
      ['He abandoned his dream of acting.', '그는 연기의 꿈을 포기했다.'],
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
  { w: 'accommodate', p: 'v.', s: [
    { m: '수용하다, 공간을 제공하다', syn: ['hold', 'house'], ex: [
      ['The hall accommodates 300 people.', '그 홀은 300명을 수용한다.'],
      ['The hotel accommodated us for a night.', '그 호텔은 우리를 하룻밤 재워 주었다.'],
    ]},
    { m: '맞추다, 편의를 봐주다', syn: ['adapt to', 'allow for'], ex: [
      ['We accommodated her schedule.', '우리는 그녀의 일정에 맞춰 주었다.'],
      ['The system accommodates different needs.', '그 체계는 다양한 요구를 수용한다.'],
    ]},
  ]},
  { w: 'accountable', p: 'adj.', s: [
    { m: '책임이 있는', syn: ['responsible', 'answerable'], ex: [
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
  { w: 'terrible', p: 'adj.', s: [
    { m: '끔찍한, 심한', syn: ['awful'], ex: [
      ['The weather was terrible yesterday.', '어제 날씨는 끔찍했다.'],
      ['I had a terrible headache.', '나는 심한 두통이 있었다.'],
      ['That was a terrible mistake.', '그것은 끔찍한 실수였다.'],
    ]},
  ]},
  { w: 'thick', p: 'adj.', s: [
    { m: '두꺼운, 굵은', syn: [], ex: [
      ['He read a thick book.', '그는 두꺼운 책을 읽었다.'],
      ['Wear a thick coat today.', '오늘은 두꺼운 코트를 입어라.'],
      ['The ice is thick enough to walk on.', '얼음이 걸어도 될 만큼 두껍다.'],
    ]},
  ]},
  { w: 'thin', p: 'adj.', s: [
    { m: '얇은, 마른', syn: ['slim'], ex: [
      ['The paper is very thin.', '그 종이는 아주 얇다.'],
      ['He is tall and thin.', '그는 키가 크고 말랐다.'],
      ['Cut the bread into thin slices.', '빵을 얇게 잘라라.'],
    ]},
  ]},
  { w: 'threaten', p: 'v.', s: [
    { m: '위협하다', syn: ['endanger', 'menace'], ex: [
      ['Pollution threatens sea life.', '오염이 해양 생물을 위협한다.'],
      ['The storm threatened the village.', '폭풍이 그 마을을 위협했다.'],
      ['He threatened to leave.', '그는 떠나겠다고 위협했다.'],
    ]},
  ]},
  { w: 'throw', p: 'v.', s: [
    { m: '던지다', syn: ['toss'], ex: [
      ['Do not throw trash on the street.', '길에 쓰레기를 던지지 마라.'],
      ['He threw the ball to me.', '그는 나에게 공을 던졌다.'],
      ['She is throwing bread to the birds.', '그녀는 새들에게 빵을 던져 주고 있다.'],
    ]},
  ]},
  { w: 'title', p: 'n.', s: [
    { m: '제목', syn: ['name'], ex: [
      ['What is the title of the book?', '그 책의 제목이 무엇이니?'],
      ['She wrote the title at the top.', '그녀는 맨 위에 제목을 썼다.'],
      ['The title of the song is beautiful.', '그 노래의 제목은 아름답다.'],
    ]},
  ]},
  { w: 'tolerate', p: 'v.', s: [
    { m: '참다, 용인하다', syn: ['put up with', 'endure'], ex: [
      ['I cannot tolerate rudeness.', '나는 무례함을 참을 수 없다.'],
      ['The school does not tolerate bullying.', '학교는 괴롭힘을 용인하지 않는다.'],
      ['These plants tolerate cold weather.', '이 식물들은 추운 날씨를 견딘다.'],
    ]},
  ]},
  { w: 'tool', p: 'n.', s: [
    { m: '도구, 연장', syn: ['instrument'], ex: [
      ['A hammer is a useful tool.', '망치는 유용한 도구다.'],
      ['He put the tools back in the box.', '그는 연장을 상자에 다시 넣었다.'],
      ['The internet is a powerful tool for learning.', '인터넷은 배움에 강력한 도구다.'],
    ]},
  ]},
  { w: 'tradition', p: 'n.', s: [
    { m: '전통', syn: ['custom', 'heritage'], ex: [
      ['Hanbok is part of our tradition.', '한복은 우리 전통의 일부이다.'],
      ['It is a family tradition to eat together.', '함께 식사하는 것은 가족 전통이다.'],
      ['Many traditions are disappearing.', '많은 전통이 사라지고 있다.'],
    ]},
  ]},
  { w: 'trouble', p: 'n.', s: [
    { m: '곤란, 문제, 어려움', syn: ['problem'], ex: [
      ['He is in trouble again.', '그는 또 곤경에 빠졌다.'],
      ['I had trouble finding your house.', '나는 네 집을 찾는 데 어려움이 있었다.'],
      ['Sorry for the trouble.', '번거롭게 해서 죄송합니다.'],
    ]},
  ]},
  { w: 'trust', p: 'v., n.', s: [
    { m: '믿다; 신뢰', syn: ['believe in', 'rely on'], ex: [
      ['I trust my best friend.', '나는 가장 친한 친구를 믿는다.'],
      ['Trust takes years to build.', '신뢰는 쌓는 데 여러 해가 걸린다.'],
      ['You can trust her with anything.', '너는 그녀에게 무엇이든 믿고 맡길 수 있다.'],
    ]},
  ]},
  { w: 'vary', p: 'v.', s: [
    { m: '다르다, 다양하다', syn: ['differ', 'change'], ex: [
      ['Prices vary from shop to shop.', '가격은 가게마다 다르다.'],
      ['Opinions vary widely on this issue.', '이 문제에 대한 의견은 매우 다양하다.'],
      ['The weather varies by season.', '날씨는 계절에 따라 다르다.'],
    ]},
  ]},
  { w: 'volunteer', p: 'n., v.', s: [
    { m: '자원봉사자; 자원봉사하다', syn: ['helper'], ex: [
      ['She volunteers at the shelter.', '그녀는 보호소에서 자원봉사한다.'],
      ['Many volunteers cleaned the beach.', '많은 자원봉사자가 해변을 청소했다.'],
      ['He volunteered to carry the boxes.', '그는 상자를 나르겠다고 자원했다.'],
    ]},
  ]},
  { w: 'waste', p: 'v., n.', s: [
    { m: '낭비하다', syn: ['throw away', 'squander'], ex: [
      ["Don't waste your time.", '시간을 낭비하지 마라.'],
      ['We waste too much food.', '우리는 음식을 너무 많이 낭비한다.'],
    ]},
    { m: '쓰레기, 폐기물', syn: ['garbage', 'trash'], ex: [
      ['Food waste is a big problem.', '음식물 쓰레기는 큰 문제이다.'],
      ['The factory dumped waste into the river.', '그 공장은 폐기물을 강에 버렸다.'],
    ]},
  ]},
  { w: 'worth', p: 'adj.', s: [
    { m: '~할 가치가 있는', syn: ['deserving of'], ex: [
      ['This book is worth reading.', '이 책은 읽을 가치가 있다.'],
      ['The trip was worth the money.', '그 여행은 돈값을 했다.'],
      ['It is worth trying at least once.', '적어도 한 번은 시도해 볼 가치가 있다.'],
    ]},
  ]},
], 'curriculum');
