/**
 * 중학교 3학년 레벨 1 어휘 34개.
 *
 * 선정 기준: 중학교 3학년 교과서 공통 어휘와 고교 입학 전 반드시 알아야 할 추상 어휘.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M3_1 = defineLevel('m3-1', [
  { w: 'absorb', p: 'v.', s: [
    { m: '흡수하다', syn: ['soak up', 'take in'], ex: [
      ['Plants absorb water through roots.', '식물은 뿌리를 통해 물을 흡수한다.'],
      ['This towel absorbs water quickly.', '이 수건은 물을 빨리 흡수한다.'],
      ['Dark colors absorb more heat.', '어두운 색은 열을 더 많이 흡수한다.'],
    ]},
  ]},
  { w: 'adapt', p: 'v.', s: [
    { m: '적응하다', syn: ['adjust', 'get used to'], ex: [
      ['Animals adapt to their environment.', '동물은 환경에 적응한다.'],
      ['It took him a month to adapt to the new school.', '그가 새 학교에 적응하는 데 한 달이 걸렸다.'],
    ]},
    { m: '각색하다, 고쳐 쓰다', syn: ['modify', 'rewrite'], ex: [
      ['The novel was adapted into a film.', '그 소설은 영화로 각색되었다.'],
      ['We adapted the recipe for children.', '우리는 아이들에 맞게 조리법을 고쳤다.'],
    ]},
  ]},
  { w: 'advantage', p: 'n.', s: [
    { m: '이점, 장점', syn: ['benefit', 'strength'], ex: [
      ['Small size is an advantage here.', '작은 크기가 여기서는 장점이다.'],
      ['Speaking two languages is a big advantage.', '두 언어를 하는 것은 큰 이점이다.'],
      ['Each method has its advantages.', '각 방법에는 나름의 장점이 있다.'],
    ]},
  ]},
  { w: 'affect', p: 'v.', s: [
    { m: '영향을 미치다', syn: ['influence', 'have an effect on'], ex: [
      ['Sleep affects your mood.', '잠은 기분에 영향을 미친다.'],
      ['The weather affected our plans.', '날씨가 우리 계획에 영향을 미쳤다.'],
      ['Noise affects how well we study.', '소음은 우리가 얼마나 잘 공부하는지에 영향을 준다.'],
    ]},
  ]},
  { w: 'amount', p: 'n.', s: [
    { m: '양, 액수', syn: ['quantity', 'sum'], ex: [
      ['A large amount of data was lost.', '많은 양의 데이터가 사라졌다.'],
      ['Reduce the amount of salt you eat.', '먹는 소금의 양을 줄여라.'],
      ['The amount of homework doubled.', '숙제의 양이 두 배가 되었다.'],
    ]},
  ]},
  { w: 'ancient', p: 'adj.', s: [
    { m: '고대의, 아주 오래된', syn: ['very old', 'antique'], ex: [
      ['We studied ancient Egypt.', '우리는 고대 이집트를 공부했다.'],
      ['These ancient walls are still standing.', '이 오래된 성벽은 아직 서 있다.'],
      ['Ancient people used stone tools.', '고대 사람들은 석기를 사용했다.'],
    ]},
  ]},
  { w: 'announce', p: 'v.', s: [
    { m: '발표하다, 알리다', syn: ['declare', 'make known'], ex: [
      ['They announced the winner.', '그들은 우승자를 발표했다.'],
      ['The school announced a new schedule.', '학교는 새 일정을 발표했다.'],
      ['She announced her decision to everyone.', '그녀는 모두에게 자신의 결정을 알렸다.'],
    ]},
  ]},
  { w: 'appreciate', p: 'v.', s: [
    { m: '감사하다', syn: ['be grateful for', 'thank'], ex: [
      ['I appreciate your help.', '당신의 도움에 감사합니다.'],
      ['We appreciate everything you did.', '해 주신 모든 것에 감사드립니다.'],
    ]},
    { m: '진가를 알아보다, 감상하다', syn: ['value', 'enjoy'], ex: [
      ['You will appreciate this music later.', '너는 나중에 이 음악의 진가를 알게 될 것이다.'],
      ['He appreciates good art.', '그는 좋은 예술 작품을 감상할 줄 안다.'],
    ]},
  ]},
  { w: 'approach', p: 'v., n.', s: [
    { m: '다가가다, 접근하다', syn: ['come near', 'get close to'], ex: [
      ['A dog approached us slowly.', '개 한 마리가 천천히 우리에게 다가왔다.'],
      ['Winter is approaching.', '겨울이 다가오고 있다.'],
    ]},
    { m: '접근법, 방식', syn: ['method', 'way'], ex: [
      ['We tried a new approach.', '우리는 새로운 접근법을 시도했다.'],
      ['His approach to learning is unusual.', '학습에 대한 그의 방식은 특이하다.'],
    ]},
  ]},
  { w: 'argue', p: 'v.', s: [
    { m: '다투다, 언쟁하다', syn: ['quarrel', 'fight'], ex: [
      ['They argued about the rules.', '그들은 규칙에 대해 다투었다.'],
      ['Stop arguing with your brother.', '동생과 그만 다퉈라.'],
    ]},
    { m: '주장하다', syn: ['claim', 'insist'], ex: [
      ['She argued that the test was unfair.', '그녀는 그 시험이 불공평하다고 주장했다.'],
      ['Some argue that homework is useless.', '어떤 이들은 숙제가 쓸모없다고 주장한다.'],
    ]},
  ]},
  { w: 'attitude', p: 'n.', s: [
    { m: '태도, 자세', syn: ['manner', 'outlook'], ex: [
      ['A positive attitude helps a lot.', '긍정적인 태도는 큰 도움이 된다.'],
      ['His attitude toward study changed.', '공부에 대한 그의 태도가 바뀌었다.'],
      ['I like her cheerful attitude.', '나는 그녀의 밝은 태도가 좋다.'],
    ]},
  ]},
  { w: 'attract', p: 'v.', s: [
    { m: '끌어당기다, 매혹하다', syn: ['draw', 'appeal to'], ex: [
      ['The show attracted many people.', '그 공연은 많은 사람을 끌어들였다.'],
      ['Flowers attract bees.', '꽃은 벌을 끌어들인다.'],
      ['The city attracts tourists all year.', '그 도시는 일 년 내내 관광객을 끌어들인다.'],
    ]},
  ]},
  { w: 'aware', p: 'adj.', s: [
    { m: '알고 있는, 인식하는', syn: ['conscious', 'mindful'], ex: [
      ['Be aware of the danger.', '위험을 인식하고 있어라.'],
      ['I was not aware of the change.', '나는 그 변화를 알지 못했다.'],
      ['Are you aware that the shop is closed?', '그 가게가 문을 닫은 것을 알고 있니?'],
    ]},
  ]},
  { w: 'blame', p: 'v.', s: [
    { m: '비난하다, ~의 탓으로 돌리다', syn: ['accuse', 'fault'], ex: [
      ["Don't blame others for your mistake.", '네 실수를 남 탓하지 마라.'],
      ['She blamed the weather for the delay.', '그녀는 지연을 날씨 탓으로 돌렸다.'],
      ['Nobody blamed him for the loss.', '아무도 그를 패배의 탓으로 비난하지 않았다.'],
    ]},
  ]},
  { w: 'capable', p: 'adj.', s: [
    { m: '~할 수 있는, 유능한', syn: ['able', 'competent'], ex: [
      ['She is capable of solving it.', '그녀는 그것을 해결할 수 있다.'],
      ['He is a capable leader.', '그는 유능한 지도자이다.'],
      ['This machine is capable of great speed.', '이 기계는 대단한 속도를 낼 수 있다.'],
    ]},
  ]},
  { w: 'cause', p: 'v., n.', s: [
    { m: '초래하다, 일으키다', syn: ['bring about', 'lead to'], ex: [
      ['Smoking causes many diseases.', '흡연은 많은 질병을 유발한다.'],
      ['The heavy rain caused a flood.', '폭우가 홍수를 일으켰다.'],
    ]},
    { m: '원인, 이유', syn: ['reason', 'source'], ex: [
      ['We do not know the cause of the fire.', '우리는 화재의 원인을 모른다.'],
      ['Stress is a common cause of headaches.', '스트레스는 두통의 흔한 원인이다.'],
    ]},
  ]},
  { w: 'certain', p: 'adj.', s: [
    { m: '확실한, 확신하는', syn: ['sure', 'confident'], ex: [
      ["I'm certain he will come.", '나는 그가 올 것이라고 확신한다.'],
      ['It is certain that prices will rise.', '가격이 오를 것은 확실하다.'],
    ]},
    { m: '어떤, 특정한', syn: ['particular', 'specific'], ex: [
      ['Certain foods can cause allergies.', '어떤 음식은 알레르기를 일으킬 수 있다.'],
      ['You may enter only at certain times.', '특정 시간에만 들어갈 수 있다.'],
    ]},
  ]},
  { w: 'claim', p: 'v., n.', s: [
    { m: '주장하다; 주장', syn: ['assert', 'state'], ex: [
      ['He claimed he was innocent.', '그는 자신이 결백하다고 주장했다.'],
      ['The company claims its product is safe.', '그 회사는 자사 제품이 안전하다고 주장한다.'],
      ['There is no proof for that claim.', '그 주장에는 증거가 없다.'],
    ]},
  ]},
  { w: 'comfort', p: 'n., v.', s: [
    { m: '위로; 위로하다', syn: ['console', 'soothe'], ex: [
      ['Her words gave me comfort.', '그녀의 말은 나에게 위로가 되었다.'],
      ['He comforted the crying child.', '그는 우는 아이를 위로했다.'],
      ['Music is a comfort when I am sad.', '음악은 내가 슬플 때 위안이 된다.'],
    ]},
  ]},
  { w: 'common', p: 'adj.', s: [
    { m: '흔한, 자주 있는', syn: ['usual', 'ordinary'], ex: [
      ['This is a common mistake.', '이것은 흔한 실수이다.'],
      ['Colds are common in winter.', '감기는 겨울에 흔하다.'],
    ]},
    { m: '공통의', syn: ['shared', 'mutual'], ex: [
      ['We have a common interest in music.', '우리는 음악이라는 공통 관심사가 있다.'],
      ['English is a common language in business.', '영어는 비즈니스의 공통 언어이다.'],
    ]},
  ]},
  { w: 'concentrate', p: 'v.', s: [
    { m: '집중하다', syn: ['focus', 'pay attention'], ex: [
      ['I cannot concentrate in noise.', '나는 시끄러우면 집중할 수 없다.'],
      ['Concentrate on one thing at a time.', '한 번에 한 가지에 집중해라.'],
      ['She concentrated hard on the puzzle.', '그녀는 퍼즐에 열심히 집중했다.'],
    ]},
  ]},
  { w: 'confuse', p: 'v.', s: [
    { m: '혼란시키다, 헷갈리게 하다', syn: ['puzzle', 'mix up'], ex: [
      ['The map confused me.', '그 지도는 나를 혼란스럽게 했다.'],
      ['People often confuse these two words.', '사람들은 종종 이 두 단어를 헷갈린다.'],
      ['His answer only confused us more.', '그의 대답은 우리를 더 혼란스럽게 했을 뿐이다.'],
    ]},
  ]},
  { w: 'contain', p: 'v.', s: [
    { m: '포함하다, 담고 있다', syn: ['include', 'hold'], ex: [
      ['This drink contains sugar.', '이 음료는 설탕을 함유하고 있다.'],
      ['The box contained old letters.', '그 상자에는 오래된 편지들이 들어 있었다.'],
      ['Does this food contain nuts?', '이 음식에 견과류가 들어 있나요?'],
    ]},
  ]},
  { w: 'contrast', p: 'n., v.', s: [
    { m: '대조, 차이; 대조하다', syn: ['difference', 'compare'], ex: [
      ['There is a sharp contrast between them.', '그 둘 사이에는 뚜렷한 대조가 있다.'],
      ['In contrast, the second plan is cheaper.', '반면에 두 번째 계획은 더 싸다.'],
      ['Contrast the two characters in the story.', '이야기 속 두 인물을 대조해 보아라.'],
    ]},
  ]},
  { w: 'convenient', p: 'adj.', s: [
    { m: '편리한', syn: ['handy', 'easy to use'], ex: [
      ['Online shopping is convenient.', '온라인 쇼핑은 편리하다.'],
      ['Is Friday convenient for you?', '금요일이 편하신가요?'],
      ['The store is in a convenient location.', '그 가게는 편리한 위치에 있다.'],
    ]},
  ]},
  { w: 'crowd', p: 'n.', s: [
    { m: '군중, 무리', syn: ['group', 'mass of people'], ex: [
      ['A crowd gathered at the gate.', '군중이 문 앞에 모였다.'],
      ['He disappeared into the crowd.', '그는 군중 속으로 사라졌다.'],
      ['The crowd cheered loudly.', '군중은 크게 환호했다.'],
    ]},
  ]},
  { w: 'cure', p: 'v., n.', s: [
    { m: '치료하다; 치료법', syn: ['heal', 'treat'], ex: [
      ['Doctors cured the disease.', '의사들이 그 병을 치료했다.'],
      ['There is still no cure for the common cold.', '감기에는 아직 치료법이 없다.'],
      ['Rest can cure a mild headache.', '휴식은 가벼운 두통을 낫게 할 수 있다.'],
    ]},
  ]},
  { w: 'decrease', p: 'v., n.', s: [
    { m: '감소하다, 줄다', syn: ['fall', 'go down'], ex: [
      ['The population decreased slowly.', '인구가 서서히 감소했다.'],
      ['Sales decreased by ten percent.', '매출이 10퍼센트 감소했다.'],
      ['There was a decrease in accidents.', '사고가 줄어들었다.'],
    ]},
  ]},
  { w: 'deliver', p: 'v.', s: [
    { m: '배달하다, 전달하다', syn: ['bring', 'send'], ex: [
      ['They deliver food at night.', '그들은 밤에 음식을 배달한다.'],
      ['The package was delivered yesterday.', '그 소포는 어제 배달되었다.'],
      ['Please deliver this message to her.', '이 메시지를 그녀에게 전해 주세요.'],
    ]},
  ]},
  { w: 'demand', p: 'n., v.', s: [
    { m: '수요', syn: ['need'], ex: [
      ['Demand for masks increased.', '마스크 수요가 증가했다.'],
      ['Supply cannot meet demand.', '공급이 수요를 따라가지 못한다.'],
    ]},
    { m: '요구하다', syn: ['ask for', 'insist on'], ex: [
      ['They demanded an apology.', '그들은 사과를 요구했다.'],
      ['The job demands great patience.', '그 일은 대단한 인내를 요구한다.'],
    ]},
  ]},
  { w: 'deny', p: 'v.', s: [
    { m: '부인하다', syn: ['reject', 'refuse to admit'], ex: [
      ['He denied breaking the window.', '그는 창문을 깼다는 것을 부인했다.'],
      ['She denied that she was there.', '그녀는 그곳에 있었다는 것을 부인했다.'],
      ['You cannot deny the facts.', '너는 사실을 부인할 수 없다.'],
    ]},
  ]},
  { w: 'destroy', p: 'v.', s: [
    { m: '파괴하다, 망가뜨리다', syn: ['ruin', 'wreck'], ex: [
      ['The fire destroyed the building.', '화재가 그 건물을 파괴했다.'],
      ['War destroys everything.', '전쟁은 모든 것을 파괴한다.'],
      ['The storm destroyed many trees.', '폭풍이 많은 나무를 쓰러뜨렸다.'],
    ]},
  ]},
  { w: 'determine', p: 'v.', s: [
    { m: '결정하다, 좌우하다', syn: ['decide', 'shape'], ex: [
      ['Your effort determines the result.', '너의 노력이 결과를 결정한다.'],
      ['Price determines what people buy.', '가격이 사람들이 무엇을 사는지를 좌우한다.'],
    ]},
    { m: '알아내다, 밝히다', syn: ['find out', 'work out'], ex: [
      ['Scientists determined the age of the rock.', '과학자들이 그 암석의 나이를 알아냈다.'],
      ['We must determine what went wrong.', '우리는 무엇이 잘못되었는지 밝혀야 한다.'],
    ]},
  ]},
  { w: 'disappear', p: 'v.', s: [
    { m: '사라지다', syn: ['vanish', 'go away'], ex: [
      ['The bird disappeared into the woods.', '그 새는 숲속으로 사라졌다.'],
      ['My keys disappeared again.', '내 열쇠가 또 사라졌다.'],
      ['Many species are disappearing fast.', '많은 종이 빠르게 사라지고 있다.'],
    ]},
  ]},
], 'curriculum');
