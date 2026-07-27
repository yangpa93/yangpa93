/**
 * 중학교 3학년 필수 어휘 100개.
 *
 * 선정 기준: 교육부 「기본 어휘 목록」 중 중3 교과서 공통 출현 어휘 +
 * 고등학교 진학 후 바로 쓰이는 연결어·추상 명사. 이 레벨부터
 * 지문 독해에 필요한 어휘가 중심이 된다.
 */

import { defineLevel } from '../define';

export const M3 = defineLevel('m3', [
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
  { w: 'distance', p: 'n.', s: [
    { m: '거리', syn: ['gap', 'space'], ex: [
      ['The distance is about ten kilometers.', '거리는 약 10킬로미터이다.'],
      ['Keep a safe distance from the car ahead.', '앞차와 안전거리를 유지해라.'],
      ['We saw a light in the distance.', '우리는 멀리서 불빛을 보았다.'],
    ]},
  ]},
  { w: 'effective', p: 'adj.', s: [
    { m: '효과적인', syn: ['successful', 'powerful'], ex: [
      ['This method is very effective.', '이 방법은 매우 효과적이다.'],
      ['Washing hands is an effective way to stay healthy.', '손 씻기는 건강을 지키는 효과적인 방법이다.'],
      ['The medicine was effective within hours.', '그 약은 몇 시간 만에 효과가 있었다.'],
    ]},
  ]},
  { w: 'emotion', p: 'n.', s: [
    { m: '감정', syn: ['feeling'], ex: [
      ['She hid her emotions.', '그녀는 감정을 숨겼다.'],
      ['Music can stir strong emotions.', '음악은 강한 감정을 불러일으킬 수 있다.'],
      ['He spoke without showing emotion.', '그는 감정을 드러내지 않고 말했다.'],
    ]},
  ]},
  { w: 'encourage', p: 'v.', s: [
    { m: '격려하다, 장려하다', syn: ['cheer up', 'support'], ex: [
      ['My teacher encouraged me.', '선생님이 나를 격려해 주셨다.'],
      ['The school encourages reading.', '학교는 독서를 장려한다.'],
      ['Her success encouraged others to try.', '그녀의 성공은 다른 이들이 시도하도록 북돋웠다.'],
    ]},
  ]},
  { w: 'equal', p: 'adj.', s: [
    { m: '동등한, 같은', syn: ['same', 'even'], ex: [
      ['Everyone has equal rights.', '모든 사람은 동등한 권리를 가진다.'],
      ['Cut the cake into equal pieces.', '케이크를 같은 크기로 잘라라.'],
      ['Women and men should receive equal pay.', '여성과 남성은 동등한 임금을 받아야 한다.'],
    ]},
  ]},
  { w: 'escape', p: 'v.', s: [
    { m: '탈출하다, 벗어나다', syn: ['get away', 'flee'], ex: [
      ['The cat escaped from the box.', '고양이가 상자에서 탈출했다.'],
      ['They escaped through the back door.', '그들은 뒷문으로 탈출했다.'],
      ['We went to the sea to escape the heat.', '우리는 더위를 피해 바다로 갔다.'],
    ]},
  ]},
  { w: 'exact', p: 'adj.', s: [
    { m: '정확한', syn: ['precise', 'accurate'], ex: [
      ['Tell me the exact time.', '정확한 시간을 말해 줘.'],
      ['I need the exact number.', '나는 정확한 숫자가 필요하다.'],
      ['That is the exact word I was looking for.', '그것이 내가 찾던 바로 그 단어이다.'],
    ]},
  ]},
  { w: 'examine', p: 'v.', s: [
    { m: '조사하다, 검사하다', syn: ['inspect', 'check'], ex: [
      ['The doctor examined my eyes.', '의사가 내 눈을 검사했다.'],
      ['Examine the evidence carefully.', '증거를 주의 깊게 조사해라.'],
      ['They examined the machine for damage.', '그들은 기계에 손상이 있는지 검사했다.'],
    ]},
  ]},
  { w: 'exist', p: 'v.', s: [
    { m: '존재하다', syn: ['be real', 'be present'], ex: [
      ['Do aliens really exist?', '외계인이 정말 존재할까?'],
      ['This custom has existed for centuries.', '이 관습은 수 세기 동안 존재해 왔다.'],
      ['No perfect answer exists.', '완벽한 답은 존재하지 않는다.'],
    ]},
  ]},
  { w: 'familiar', p: 'adj.', s: [
    { m: '익숙한, 친숙한', syn: ['well-known', 'recognizable'], ex: [
      ['That song sounds familiar.', '그 노래는 익숙하게 들린다.'],
      ['His face looked familiar to me.', '그의 얼굴이 나에게 익숙해 보였다.'],
      ['Are you familiar with this program?', '이 프로그램에 익숙하니?'],
    ]},
  ]},
  { w: 'fear', p: 'n., v.', s: [
    { m: '두려움; 두려워하다', syn: ['fright', 'dread'], ex: [
      ['He faced his fear bravely.', '그는 용감하게 두려움에 맞섰다.'],
      ['She has a fear of heights.', '그녀는 높은 곳을 두려워한다.'],
      ['Many people fear speaking in public.', '많은 사람이 대중 앞에서 말하기를 두려워한다.'],
    ]},
  ]},
  { w: 'generation', p: 'n.', s: [
    { m: '세대', syn: ['age group'], ex: [
      ['Each generation has its own music.', '각 세대는 자기만의 음악이 있다.'],
      ['This tradition passed down through generations.', '이 전통은 여러 세대를 거쳐 전해졌다.'],
      ['The younger generation uses new apps.', '젊은 세대는 새로운 앱을 사용한다.'],
    ]},
  ]},
  { w: 'gradually', p: 'adv.', s: [
    { m: '점차, 서서히', syn: ['slowly', 'step by step'], ex: [
      ['The weather gradually got warmer.', '날씨가 점차 따뜻해졌다.'],
      ['She gradually improved her English.', '그녀는 서서히 영어 실력을 키웠다.'],
      ['The noise gradually died away.', '소음이 점차 잦아들었다.'],
    ]},
  ]},
  { w: 'harmful', p: 'adj.', s: [
    { m: '해로운', syn: ['damaging', 'bad for'], ex: [
      ['Too much sugar is harmful.', '너무 많은 설탕은 해롭다.'],
      ['Smoking is harmful to your lungs.', '흡연은 폐에 해롭다.'],
      ['These chemicals are harmful to fish.', '이 화학 물질은 물고기에 해롭다.'],
    ]},
  ]},
  { w: 'honest', p: 'adj.', s: [
    { m: '정직한, 솔직한', syn: ['truthful', 'sincere'], ex: [
      ['Be honest with your parents.', '부모님께 정직해라.'],
      ['To be honest, I did not like it.', '솔직히 말하면 나는 그것이 마음에 들지 않았다.'],
      ['He gave an honest answer.', '그는 솔직한 대답을 했다.'],
    ]},
  ]},
  { w: 'huge', p: 'adj.', s: [
    { m: '거대한, 엄청난', syn: ['enormous', 'massive'], ex: [
      ['They live in a huge house.', '그들은 거대한 집에 산다.'],
      ['The concert drew a huge crowd.', '그 콘서트는 엄청난 인파를 모았다.'],
      ['There is a huge difference between them.', '그 둘 사이에는 엄청난 차이가 있다.'],
    ]},
  ]},
  { w: 'ignore', p: 'v.', s: [
    { m: '무시하다', syn: ['pay no attention to', 'overlook'], ex: [
      ["Don't ignore the warning.", '그 경고를 무시하지 마라.'],
      ['She ignored my message.', '그녀는 내 메시지를 무시했다.'],
      ['We cannot ignore this problem any longer.', '우리는 더 이상 이 문제를 무시할 수 없다.'],
    ]},
  ]},
  { w: 'impact', p: 'n.', s: [
    { m: '영향, 충격', syn: ['effect', 'influence'], ex: [
      ['The news had a big impact.', '그 소식은 큰 영향을 미쳤다.'],
      ['Plastic has a serious impact on the ocean.', '플라스틱은 바다에 심각한 영향을 준다.'],
      ['Her speech made a strong impact on us.', '그녀의 연설은 우리에게 강한 인상을 주었다.'],
    ]},
  ]},
  { w: 'indicate', p: 'v.', s: [
    { m: '나타내다, 가리키다', syn: ['show', 'point to'], ex: [
      ['The sign indicates the exit.', '그 표지판은 출구를 가리킨다.'],
      ['The results indicate a clear trend.', '그 결과는 뚜렷한 경향을 나타낸다.'],
      ['Red usually indicates danger.', '빨간색은 보통 위험을 나타낸다.'],
    ]},
  ]},
  { w: 'influence', p: 'n., v.', s: [
    { m: '영향; 영향을 주다', syn: ['effect', 'affect'], ex: [
      ['Friends influence our choices.', '친구는 우리의 선택에 영향을 준다.'],
      ['His teacher had a great influence on him.', '그의 선생님은 그에게 큰 영향을 주었다.'],
      ['Advertising influences what we buy.', '광고는 우리가 무엇을 사는지에 영향을 미친다.'],
    ]},
  ]},
  { w: 'injure', p: 'v.', s: [
    { m: '부상을 입히다, 다치게 하다', syn: ['hurt', 'wound'], ex: [
      ['He injured his knee.', '그는 무릎을 다쳤다.'],
      ['Two people were injured in the accident.', '그 사고로 두 명이 다쳤다.'],
      ['She injured her hand while cooking.', '그녀는 요리하다가 손을 다쳤다.'],
    ]},
  ]},
  { w: 'judge', p: 'v., n.', s: [
    { m: '판단하다, 평가하다', syn: ['evaluate', 'assess'], ex: [
      ["Don't judge a book by its cover.", '겉모습으로 판단하지 마라.'],
      ['It is hard to judge who is right.', '누가 옳은지 판단하기 어렵다.'],
    ]},
    { m: '판사, 심사위원', syn: ['referee'], ex: [
      ['The judge listened to both sides.', '판사는 양쪽 이야기를 들었다.'],
      ['She was a judge at the contest.', '그녀는 그 대회의 심사위원이었다.'],
    ]},
  ]},
  { w: 'lack', p: 'n., v.', s: [
    { m: '부족; 부족하다', syn: ['shortage', 'be short of'], ex: [
      ['A lack of sleep hurts memory.', '수면 부족은 기억력을 해친다.'],
      ['The plan failed for lack of money.', '그 계획은 돈이 부족해 실패했다.'],
      ['He lacks confidence in himself.', '그는 자신감이 부족하다.'],
    ]},
  ]},
  { w: 'limit', p: 'n., v.', s: [
    { m: '한계, 제한; 제한하다', syn: ['restrict', 'cap'], ex: [
      ['There is a limit to my patience.', '내 인내심에는 한계가 있다.'],
      ['The speed limit here is 50.', '이곳의 제한 속도는 50이다.'],
      ['We should limit screen time.', '우리는 화면 보는 시간을 제한해야 한다.'],
    ]},
  ]},
  { w: 'maintain', p: 'v.', s: [
    { m: '유지하다', syn: ['keep', 'preserve'], ex: [
      ['Try to maintain a healthy diet.', '건강한 식단을 유지하도록 해라.'],
      ['They maintained the old building well.', '그들은 그 오래된 건물을 잘 관리했다.'],
      ['He maintained his position for years.', '그는 여러 해 동안 그 자리를 유지했다.'],
    ]},
  ]},
  { w: 'major', p: 'adj., n.', s: [
    { m: '주요한, 중대한', syn: ['main', 'important'], ex: [
      ['That was a major change.', '그것은 주요한 변화였다.'],
      ['Traffic is a major problem in this city.', '교통은 이 도시의 주요 문제이다.'],
    ]},
    { m: '전공', syn: ['field of study'], ex: [
      ['Her major is biology.', '그녀의 전공은 생물학이다.'],
      ['He wants to major in music.', '그는 음악을 전공하고 싶어 한다.'],
    ]},
  ]},
  { w: 'method', p: 'n.', s: [
    { m: '방법', syn: ['way', 'approach'], ex: [
      ['We used a new teaching method.', '우리는 새 교수법을 사용했다.'],
      ['This method saves a lot of time.', '이 방법은 시간을 많이 절약한다.'],
      ['There are several methods to solve it.', '그것을 푸는 방법은 여러 가지가 있다.'],
    ]},
  ]},
  { w: 'nearly', p: 'adv.', s: [
    { m: '거의', syn: ['almost', 'about'], ex: [
      ['The room was nearly empty.', '그 방은 거의 비어 있었다.'],
      ['I nearly missed the bus.', '나는 버스를 놓칠 뻔했다.'],
      ['Nearly everyone agreed.', '거의 모두가 동의했다.'],
    ]},
  ]},
  { w: 'obvious', p: 'adj.', s: [
    { m: '분명한, 명백한', syn: ['clear', 'plain'], ex: [
      ['The answer is obvious.', '그 답은 명백하다.'],
      ['It was obvious that he was lying.', '그가 거짓말하고 있는 것이 분명했다.'],
      ['There is an obvious difference.', '뚜렷한 차이가 있다.'],
    ]},
  ]},
  { w: 'occur', p: 'v.', s: [
    { m: '일어나다, 발생하다', syn: ['happen', 'take place'], ex: [
      ['The accident occurred at night.', '그 사고는 밤에 일어났다.'],
      ['Earthquakes occur often in that region.', '그 지역에서는 지진이 자주 발생한다.'],
      ['It never occurred to me to ask.', '물어볼 생각이 전혀 나지 않았다.'],
    ]},
  ]},
  { w: 'perform', p: 'v.', s: [
    { m: '공연하다', syn: ['play', 'act'], ex: [
      ['The band performed on stage.', '그 밴드는 무대에서 공연했다.'],
      ['She performed in front of 500 people.', '그녀는 500명 앞에서 공연했다.'],
    ]},
    { m: '수행하다, 해내다', syn: ['carry out', 'do'], ex: [
      ['The doctor performed the operation.', '의사가 수술을 집도했다.'],
      ['Our team performed well this year.', '우리 팀은 올해 잘 해냈다.'],
    ]},
  ]},
  { w: 'permit', p: 'v.', s: [
    { m: '허락하다, 허용하다', syn: ['allow', 'let'], ex: [
      ['Smoking is not permitted here.', '이곳에서는 흡연이 허용되지 않는다.'],
      ['The rules do not permit exceptions.', '규칙은 예외를 허용하지 않는다.'],
      ['Weather permitting, we will go hiking.', '날씨가 허락하면 우리는 등산을 갈 것이다.'],
    ]},
  ]},
  { w: 'personality', p: 'n.', s: [
    { m: '성격, 인성', syn: ['character', 'nature'], ex: [
      ['He has a cheerful personality.', '그는 쾌활한 성격이다.'],
      ['Their personalities are completely different.', '그들의 성격은 완전히 다르다.'],
      ['Personality matters more than looks.', '성격이 외모보다 중요하다.'],
    ]},
  ]},
  { w: 'positive', p: 'adj.', s: [
    { m: '긍정적인', syn: ['hopeful', 'optimistic'], ex: [
      ['Keep a positive mind.', '긍정적인 마음을 유지해라.'],
      ['She got positive feedback.', '그녀는 긍정적인 평가를 받았다.'],
      ['A positive attitude changes everything.', '긍정적인 태도가 모든 것을 바꾼다.'],
    ]},
  ]},
  { w: 'prevent', p: 'v.', s: [
    { m: '막다, 예방하다', syn: ['stop', 'keep from'], ex: [
      ['Washing hands prevents illness.', '손 씻기는 질병을 예방한다.'],
      ['Rain prevented us from going out.', '비 때문에 우리는 나가지 못했다.'],
      ['Seat belts prevent serious injury.', '안전벨트는 심각한 부상을 막는다.'],
    ]},
  ]},
  { w: 'process', p: 'n.', s: [
    { m: '과정, 절차', syn: ['procedure', 'steps'], ex: [
      ['Learning is a slow process.', '배움은 느린 과정이다.'],
      ['The application process takes a week.', '지원 절차는 일주일이 걸린다.'],
      ['Explain the process step by step.', '그 과정을 단계별로 설명해라.'],
    ]},
  ]},
  { w: 'proper', p: 'adj.', s: [
    { m: '적절한, 올바른', syn: ['suitable', 'right'], ex: [
      ['Wear proper shoes for hiking.', '등산에 적절한 신발을 신어라.'],
      ['Use the proper tool for the job.', '그 일에 알맞은 도구를 써라.'],
      ['He did not receive proper training.', '그는 제대로 된 훈련을 받지 못했다.'],
    ]},
  ]},
  { w: 'purpose', p: 'n.', s: [
    { m: '목적', syn: ['aim', 'goal'], ex: [
      ['What is the purpose of this trip?', '이 여행의 목적은 무엇이니?'],
      ['The purpose of the study was clear.', '그 연구의 목적은 분명했다.'],
      ['He broke it on purpose.', '그는 일부러 그것을 부쉈다.'],
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
  { w: 'require', p: 'v.', s: [
    { m: '요구하다, 필요로 하다', syn: ['need', 'call for'], ex: [
      ['This job requires patience.', '이 일은 인내를 요구한다.'],
      ['All students are required to wear uniforms.', '모든 학생은 교복을 입어야 한다.'],
      ['Growing plants requires care.', '식물을 기르는 데는 정성이 필요하다.'],
    ]},
  ]},
  { w: 'seek', p: 'v.', s: [
    { m: '찾다, 구하다', syn: ['look for', 'search for'], ex: [
      ['They seek a better life.', '그들은 더 나은 삶을 찾는다.'],
      ['She sought help from her teacher.', '그녀는 선생님께 도움을 구했다.'],
      ['Many young people seek jobs in the city.', '많은 젊은이가 도시에서 일자리를 구한다.'],
    ]},
  ]},
  { w: 'severe', p: 'adj.', s: [
    { m: '심한, 극심한', syn: ['serious', 'harsh'], ex: [
      ['We had a severe winter.', '우리는 혹독한 겨울을 보냈다.'],
      ['She suffered severe pain.', '그녀는 극심한 통증을 겪었다.'],
      ['The damage was severe.', '피해가 심각했다.'],
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
  { w: 'struggle', p: 'v., n.', s: [
    { m: '애쓰다, 고군분투하다', syn: ['strive', 'have trouble'], ex: [
      ['He struggled to finish the race.', '그는 경주를 마치려고 애썼다.'],
      ['She struggles with math.', '그녀는 수학을 힘들어한다.'],
      ['Life was a struggle for them.', '그들에게 삶은 투쟁이었다.'],
    ]},
  ]},
  { w: 'sudden', p: 'adj.', s: [
    { m: '갑작스러운', syn: ['abrupt', 'unexpected'], ex: [
      ['There was a sudden noise.', '갑작스러운 소음이 났다.'],
      ['His sudden change surprised us.', '그의 갑작스러운 변화가 우리를 놀라게 했다.'],
      ['All of a sudden, it began to rain.', '갑자기 비가 오기 시작했다.'],
    ]},
  ]},
  { w: 'tend', p: 'v.', s: [
    { m: '~하는 경향이 있다', syn: ['be likely to', 'have a tendency to'], ex: [
      ['Kids tend to copy adults.', '아이들은 어른을 따라 하는 경향이 있다.'],
      ['Prices tend to rise in winter.', '겨울에는 물가가 오르는 경향이 있다.'],
      ['She tends to speak too fast.', '그녀는 너무 빨리 말하는 경향이 있다.'],
    ]},
  ]},
  { w: 'threaten', p: 'v.', s: [
    { m: '위협하다', syn: ['endanger', 'menace'], ex: [
      ['Pollution threatens sea life.', '오염이 해양 생물을 위협한다.'],
      ['The storm threatened the village.', '폭풍이 그 마을을 위협했다.'],
      ['He threatened to leave.', '그는 떠나겠다고 위협했다.'],
    ]},
  ]},
  { w: 'unique', p: 'adj.', s: [
    { m: '독특한, 유일한', syn: ['one of a kind', 'special'], ex: [
      ['Every person is unique.', '모든 사람은 저마다 독특하다.'],
      ['This building has a unique shape.', '이 건물은 독특한 모양을 하고 있다.'],
      ['Her voice is truly unique.', '그녀의 목소리는 정말 독특하다.'],
    ]},
  ]},
  { w: 'according to', p: 'phr.', s: [
    { m: '~에 따르면', syn: ['as stated by', 'based on'], ex: [
      ['According to the report, sales rose.', '그 보고서에 따르면 매출이 올랐다.'],
      ['According to her, the test was easy.', '그녀에 따르면 그 시험은 쉬웠다.'],
      ['We acted according to the plan.', '우리는 계획에 따라 행동했다.'],
    ]},
  ]},
  { w: 'as well as', p: 'phr.', s: [
    { m: '~뿐만 아니라', syn: ['in addition to', 'besides'], ex: [
      ['He speaks French as well as English.', '그는 영어뿐만 아니라 프랑스어도 한다.'],
      ['She is kind as well as smart.', '그녀는 똑똑할 뿐만 아니라 친절하다.'],
      ['We need food as well as water.', '우리는 물뿐만 아니라 음식도 필요하다.'],
    ]},
  ]},
  { w: 'be likely to', p: 'phr.', s: [
    { m: '~할 것 같다', syn: ['tend to', 'be expected to'], ex: [
      ['It is likely to rain tonight.', '오늘 밤 비가 올 것 같다.'],
      ['He is likely to be late again.', '그는 또 늦을 것 같다.'],
      ['Prices are likely to fall next year.', '내년에 가격이 내릴 것 같다.'],
    ]},
  ]},
  { w: 'bring about', p: 'phr.', s: [
    { m: '초래하다, 일으키다', syn: ['cause', 'lead to'], ex: [
      ['The law brought about big changes.', '그 법은 큰 변화를 가져왔다.'],
      ['Technology brought about a new lifestyle.', '기술은 새로운 생활 방식을 가져왔다.'],
      ['What brought about this decision?', '무엇이 이 결정을 가져왔니?'],
    ]},
  ]},
  { w: 'come up with', p: 'phr.', s: [
    { m: '(생각을) 떠올리다, 내놓다', syn: ['think of', 'produce'], ex: [
      ['She came up with a great idea.', '그녀는 훌륭한 생각을 떠올렸다.'],
      ['Can you come up with a better title?', '더 나은 제목을 생각해 낼 수 있니?'],
      ['They came up with a simple solution.', '그들은 간단한 해결책을 내놓았다.'],
    ]},
  ]},
  { w: 'deal with', p: 'phr.', s: [
    { m: '다루다, 처리하다', syn: ['handle', 'cope with'], ex: [
      ['We must deal with this problem.', '우리는 이 문제를 처리해야 한다.'],
      ['How do you deal with stress?', '너는 스트레스를 어떻게 다루니?'],
      ['This book deals with climate change.', '이 책은 기후 변화를 다룬다.'],
    ]},
  ]},
  { w: 'make up for', p: 'phr.', s: [
    { m: '만회하다, 보상하다', syn: ['compensate for', 'offset'], ex: [
      ['He studied hard to make up for lost time.', '그는 잃은 시간을 만회하려고 열심히 공부했다.'],
      ['Nothing can make up for her loss.', '어떤 것도 그녀의 상실을 보상할 수 없다.'],
      ['She made up for the mistake with extra work.', '그녀는 추가 작업으로 실수를 만회했다.'],
    ]},
  ]},
  { w: 'result in', p: 'phr.', s: [
    { m: '~을 초래하다', syn: ['lead to', 'cause'], ex: [
      ['Careless driving results in accidents.', '부주의한 운전은 사고를 초래한다.'],
      ['The talks resulted in an agreement.', '그 회담은 합의를 낳았다.'],
      ['Too much sugar can result in illness.', '설탕을 너무 많이 먹으면 병이 날 수 있다.'],
    ]},
  ]},
  { w: 'take place', p: 'phr.', s: [
    { m: '일어나다, 개최되다', syn: ['happen', 'be held'], ex: [
      ['The festival takes place in May.', '그 축제는 5월에 열린다.'],
      ['The meeting took place last Friday.', '그 회의는 지난 금요일에 열렸다.'],
      ['Great changes took place after the war.', '전쟁 후에 큰 변화가 일어났다.'],
    ]},
  ]},
  { w: 'assist', p: 'v.', s: [
    { m: '돕다, 보조하다', syn: ['help', 'aid'], ex: [
      ['She assisted him with the project.', '그녀는 그 과제를 그에게 도와주었다.'],
      ['Volunteers assisted the elderly.', '자원봉사자들이 노인들을 도왔다.'],
      ['This app assists students in studying.', '이 앱은 학생들의 학습을 돕는다.'],
    ]},
  ]},
  { w: 'grateful', p: 'adj.', s: [
    { m: '감사하는, 고마워하는', syn: ['thankful', 'appreciative'], ex: [
      ['I am grateful for your help.', '당신의 도움에 감사드립니다.'],
      ['She felt grateful to her teacher.', '그녀는 선생님께 고마움을 느꼈다.'],
      ['We should be grateful for small things.', '우리는 작은 것에도 감사해야 한다.'],
    ]},
  ]},
  { w: 'in spite of', p: 'phr.', s: [
    { m: '~에도 불구하고', syn: ['despite', 'regardless of'], ex: [
      ['In spite of the rain, we went out.', '비에도 불구하고 우리는 나갔다.'],
      ['He passed in spite of the difficulty.', '그는 어려움에도 불구하고 합격했다.'],
      ['She smiled in spite of her pain.', '그녀는 아픔에도 불구하고 미소 지었다.'],
    ]},
  ]},
]);
