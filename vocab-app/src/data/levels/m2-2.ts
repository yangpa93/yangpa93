/**
 * 중학교 2학년 레벨 2 어휘 33개.
 *
 * 선정 기준: 중학교 2학년 검정 교과서 공통 어휘와 중간·기말 서술형에 자주 나오는 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M2_2 = defineLevel('m2-2', [
  { w: 'experience', p: 'n., v.', s: [
    { m: '경험; 경험하다', syn: ['go through'], ex: [
      ['It was a great experience.', '그것은 훌륭한 경험이었다.'],
      ['He has ten years of experience.', '그는 10년의 경력이 있다.'],
      ['We experienced heavy snow last winter.', '우리는 지난겨울 폭설을 경험했다.'],
    ]},
  ]},
  { w: 'explain', p: 'v.', s: [
    { m: '설명하다', syn: ['describe', 'make clear'], ex: [
      ['Can you explain this rule?', '이 규칙을 설명해 줄 수 있니?'],
      ['She explained the problem step by step.', '그녀는 문제를 단계별로 설명했다.'],
      ['Let me explain why I was late.', '내가 왜 늦었는지 설명할게.'],
    ]},
  ]},
  { w: 'express', p: 'v.', s: [
    { m: '표현하다, 나타내다', syn: ['show', 'convey'], ex: [
      ['Music expresses feelings.', '음악은 감정을 표현한다.'],
      ['He expressed his thanks in a letter.', '그는 편지로 감사를 표현했다.'],
      ['It is hard to express this in English.', '이것을 영어로 표현하기 어렵다.'],
    ]},
  ]},
  { w: 'fail', p: 'v.', s: [
    { m: '실패하다', syn: ['not succeed'], ex: [
      ["Don't be afraid to fail.", '실패하는 것을 두려워하지 마라.'],
      ['The plan failed because of rain.', '그 계획은 비 때문에 실패했다.'],
      ['He failed the test but tried again.', '그는 시험에 떨어졌지만 다시 도전했다.'],
    ]},
  ]},
  { w: 'fix', p: 'v.', s: [
    { m: '고치다, 수리하다', syn: ['repair', 'mend'], ex: [
      ['My dad fixed my bike.', '아빠가 내 자전거를 고쳐 주셨다.'],
      ['Can you fix this computer?', '이 컴퓨터를 고칠 수 있니?'],
    ]},
    { m: '(날짜·장소를) 정하다', syn: ['set', 'arrange'], ex: [
      ['We fixed the meeting for Friday.', '우리는 회의를 금요일로 정했다.'],
      ['The price is fixed.', '가격은 정해져 있다.'],
    ]},
  ]},
  { w: 'focus', p: 'v., n.', s: [
    { m: '집중하다; 초점', syn: ['concentrate', 'pay attention'], ex: [
      ['Focus on your work.', '네 일에 집중해라.'],
      ['It is hard to focus when I am tired.', '피곤할 때는 집중하기 어렵다.'],
      ['The focus of the class was grammar.', '그 수업의 초점은 문법이었다.'],
    ]},
  ]},
  { w: 'gather', p: 'v.', s: [
    { m: '모으다, 모이다', syn: ['collect', 'come together'], ex: [
      ['People gathered in the square.', '사람들이 광장에 모였다.'],
      ['We gathered leaves for the art class.', '우리는 미술 시간을 위해 나뭇잎을 모았다.'],
      ['The family gathers every New Year.', '가족은 매년 새해에 모인다.'],
    ]},
  ]},
  { w: 'grow', p: 'v.', s: [
    { m: '자라다, 성장하다', syn: ['get bigger', 'develop'], ex: [
      ['These plants grow fast.', '이 식물들은 빨리 자란다.'],
      ['He grew ten centimeters last year.', '그는 작년에 10센티미터 자랐다.'],
    ]},
    { m: '기르다, 재배하다', syn: ['raise', 'cultivate'], ex: [
      ['My grandmother grows vegetables.', '할머니는 채소를 기르신다.'],
      ['They grow rice in this area.', '이 지역에서는 쌀을 재배한다.'],
    ]},
  ]},
  { w: 'habit', p: 'n.', s: [
    { m: '습관', syn: ['routine', 'practice'], ex: [
      ['Reading is a good habit.', '독서는 좋은 습관이다.'],
      ['He has a habit of biting his nails.', '그는 손톱을 물어뜯는 습관이 있다.'],
      ['It takes time to change a habit.', '습관을 바꾸는 데는 시간이 걸린다.'],
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
  { w: 'imagine', p: 'v.', s: [
    { m: '상상하다', syn: ['picture', 'suppose'], ex: [
      ['Imagine a world without cars.', '자동차 없는 세상을 상상해 보라.'],
      ['I cannot imagine living there.', '나는 그곳에 사는 것을 상상할 수 없다.'],
      ['She imagined herself on stage.', '그녀는 무대 위의 자신을 상상했다.'],
    ]},
  ]},
  { w: 'improve', p: 'v.', s: [
    { m: '향상시키다, 나아지다', syn: ['get better', 'enhance'], ex: [
      ['I want to improve my English.', '나는 영어를 향상시키고 싶다.'],
      ['His health improved after surgery.', '그의 건강은 수술 후 나아졌다.'],
      ['Practice will improve your speed.', '연습하면 속도가 좋아질 것이다.'],
    ]},
  ]},
  { w: 'include', p: 'v.', s: [
    { m: '포함하다', syn: ['contain', 'cover'], ex: [
      ['The price includes breakfast.', '그 가격은 아침 식사를 포함한다.'],
      ['The list includes ten names.', '그 목록에는 열 개의 이름이 들어 있다.'],
      ['Does the tour include lunch?', '그 투어에 점심이 포함되나요?'],
    ]},
  ]},
  { w: 'increase', p: 'v., n.', s: [
    { m: '증가하다, 늘리다', syn: ['rise', 'go up'], ex: [
      ['The number of visitors increased.', '방문객 수가 증가했다.'],
      ['We need to increase our speed.', '우리는 속도를 높여야 한다.'],
      ['There was an increase in sales.', '매출에 증가가 있었다.'],
    ]},
  ]},
  { w: 'information', p: 'n.', s: [
    { m: '정보', syn: ['data', 'facts'], ex: [
      ['I found useful information online.', '나는 온라인에서 유용한 정보를 찾았다.'],
      ['Please give me more information.', '더 많은 정보를 주세요.'],
      ['Not all information on the internet is true.', '인터넷의 모든 정보가 사실은 아니다.'],
    ]},
  ]},
  { w: 'introduce', p: 'v.', s: [
    { m: '소개하다', syn: ['present'], ex: [
      ['Let me introduce my friend.', '내 친구를 소개할게.'],
      ['She introduced herself to the class.', '그녀는 반에 자기소개를 했다.'],
    ]},
    { m: '도입하다, 처음 들여오다', syn: ['bring in'], ex: [
      ['The school introduced a new rule.', '학교는 새 규칙을 도입했다.'],
      ['Potatoes were introduced from America.', '감자는 아메리카에서 들어왔다.'],
    ]},
  ]},
  { w: 'knowledge', p: 'n.', s: [
    { m: '지식', syn: ['understanding', 'learning'], ex: [
      ['He has deep knowledge of history.', '그는 역사에 대한 깊은 지식이 있다.'],
      ['Knowledge grows when you share it.', '지식은 나눌 때 자란다.'],
      ['She has little knowledge of computers.', '그녀는 컴퓨터에 대한 지식이 거의 없다.'],
    ]},
  ]},
  { w: 'local', p: 'adj.', s: [
    { m: '지역의, 현지의', syn: ['nearby', 'regional'], ex: [
      ['We visited a local market.', '우리는 현지 시장을 방문했다.'],
      ['Try the local food.', '현지 음식을 먹어 봐라.'],
      ['The local library opens at nine.', '지역 도서관은 9시에 문을 연다.'],
    ]},
  ]},
  { w: 'manage', p: 'v.', s: [
    { m: '관리하다, 운영하다', syn: ['run', 'handle'], ex: [
      ['She manages her time well.', '그녀는 시간을 잘 관리한다.'],
      ['He manages a small shop.', '그는 작은 가게를 운영한다.'],
    ]},
    { m: '해내다, 용케 ~하다', syn: ['succeed in'], ex: [
      ['We managed to finish on time.', '우리는 제시간에 마치는 데 성공했다.'],
      ['She managed to open the jar.', '그녀는 겨우 병을 열었다.'],
    ]},
  ]},
  { w: 'medicine', p: 'n.', s: [
    { m: '약', syn: ['drug', 'pill'], ex: [
      ['Take this medicine after meals.', '식후에 이 약을 드세요.'],
      ['The medicine tastes bitter.', '그 약은 맛이 쓰다.'],
    ]},
    { m: '의학', syn: [], ex: [
      ['She wants to study medicine.', '그녀는 의학을 공부하고 싶어 한다.'],
      ['Modern medicine has saved many lives.', '현대 의학은 많은 생명을 구했다.'],
    ]},
  ]},
  { w: 'memory', p: 'n.', s: [
    { m: '기억(력)', syn: ['recall'], ex: [
      ['He has a good memory for names.', '그는 이름을 잘 기억한다.'],
      ['Sleep helps memory.', '잠은 기억력에 도움이 된다.'],
    ]},
    { m: '추억', syn: ['remembrance'], ex: [
      ['I have a happy memory of that day.', '나는 그날의 행복한 추억이 있다.'],
      ['These photos bring back memories.', '이 사진들은 추억을 떠올리게 한다.'],
    ]},
  ]},
  { w: 'nature', p: 'n.', s: [
    { m: '자연', syn: ['the natural world'], ex: [
      ['We enjoyed the beauty of nature.', '우리는 자연의 아름다움을 즐겼다.'],
      ['Nature gives us clean air and water.', '자연은 우리에게 깨끗한 공기와 물을 준다.'],
    ]},
    { m: '본성, 성질', syn: ['character'], ex: [
      ['It is human nature to make mistakes.', '실수하는 것은 인간의 본성이다.'],
      ['She has a gentle nature.', '그녀는 온화한 성품을 지녔다.'],
    ]},
  ]},
  { w: 'notice', p: 'v., n.', s: [
    { m: '알아차리다', syn: ['see', 'observe'], ex: [
      ['I noticed a small mistake.', '나는 작은 실수를 알아차렸다.'],
      ['Did you notice her new haircut?', '그녀의 새 머리 모양을 알아챘니?'],
    ]},
    { m: '안내문, 공지', syn: ['announcement'], ex: [
      ['There is a notice on the door.', '문에 안내문이 있다.'],
      ['Please read the notice carefully.', '공지를 주의 깊게 읽어 주세요.'],
    ]},
  ]},
  { w: 'offer', p: 'v., n.', s: [
    { m: '제안하다, 권하다', syn: ['propose', 'give'], ex: [
      ['He offered me a seat.', '그는 나에게 자리를 권했다.'],
      ['She offered to help with the dishes.', '그녀는 설거지를 돕겠다고 했다.'],
      ['They made a good offer.', '그들은 좋은 제안을 했다.'],
    ]},
  ]},
  { w: 'opinion', p: 'n.', s: [
    { m: '의견, 견해', syn: ['view', 'thought'], ex: [
      ['In my opinion, this is better.', '내 생각에는 이것이 더 낫다.'],
      ['Everyone has a different opinion.', '모두 의견이 다르다.'],
      ['What is your opinion about the plan?', '그 계획에 대한 네 의견은 무엇이니?'],
    ]},
  ]},
  { w: 'opportunity', p: 'n.', s: [
    { m: '기회', syn: ['chance'], ex: [
      ["Don't miss this opportunity.", '이 기회를 놓치지 마라.'],
      ['Studying abroad is a great opportunity.', '해외 유학은 좋은 기회이다.'],
      ['She had the opportunity to meet the author.', '그녀는 그 작가를 만날 기회가 있었다.'],
    ]},
  ]},
  { w: 'pollution', p: 'n.', s: [
    { m: '오염', syn: ['contamination'], ex: [
      ['Air pollution is a serious problem.', '대기 오염은 심각한 문제이다.'],
      ['Cars cause a lot of pollution.', '자동차는 많은 오염을 일으킨다.'],
      ['We must reduce water pollution.', '우리는 수질 오염을 줄여야 한다.'],
    ]},
  ]},
  { w: 'prefer', p: 'v.', s: [
    { m: '더 좋아하다, 선호하다', syn: ['like better', 'favor'], ex: [
      ['I prefer tea to coffee.', '나는 커피보다 차를 더 좋아한다.'],
      ['She prefers reading to watching TV.', '그녀는 TV 보기보다 독서를 선호한다.'],
      ['Which one do you prefer?', '어느 것을 더 좋아하니?'],
    ]},
  ]},
  { w: 'protect', p: 'v.', s: [
    { m: '보호하다, 지키다', syn: ['guard', 'keep safe'], ex: [
      ['Sunglasses protect your eyes.', '선글라스는 눈을 보호한다.'],
      ['We should protect wild animals.', '우리는 야생 동물을 보호해야 한다.'],
      ['A helmet protects your head.', '헬멧은 머리를 보호한다.'],
    ]},
  ]},
  { w: 'provide', p: 'v.', s: [
    { m: '제공하다', syn: ['supply', 'give'], ex: [
      ['The school provides free lunch.', '학교는 무료 급식을 제공한다.'],
      ['They provided us with blankets.', '그들은 우리에게 담요를 제공했다.'],
      ['This app provides useful information.', '이 앱은 유용한 정보를 제공한다.'],
    ]},
  ]},
  { w: 'reduce', p: 'v.', s: [
    { m: '줄이다', syn: ['cut down', 'lower'], ex: [
      ['We should reduce plastic waste.', '우리는 플라스틱 쓰레기를 줄여야 한다.'],
      ['The store reduced its prices.', '그 가게는 가격을 낮췄다.'],
      ['Walking can reduce stress.', '걷기는 스트레스를 줄일 수 있다.'],
    ]},
  ]},
  { w: 'regular', p: 'adj.', s: [
    { m: '규칙적인, 정기적인', syn: ['steady', 'routine'], ex: [
      ['Regular exercise keeps you healthy.', '규칙적인 운동은 건강을 지켜 준다.'],
      ['We have regular meetings on Monday.', '우리는 월요일마다 정기 회의를 한다.'],
      ['Try to keep regular sleeping hours.', '규칙적인 수면 시간을 유지하려고 해라.'],
    ]},
  ]},
  { w: 'relationship', p: 'n.', s: [
    { m: '관계, 사이', syn: ['connection', 'bond'], ex: [
      ['They have a good relationship.', '그들은 좋은 관계이다.'],
      ['There is a close relationship between sleep and health.', '수면과 건강 사이에는 밀접한 관계가 있다.'],
      ['A good relationship needs trust.', '좋은 관계에는 신뢰가 필요하다.'],
    ]},
  ]},
], 'curriculum');
