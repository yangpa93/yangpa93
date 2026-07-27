/**
 * 중학교 3학년 레벨 2 어휘 33개.
 *
 * 선정 기준: 중학교 3학년 교과서 공통 어휘와 고교 입학 전 반드시 알아야 할 추상 어휘.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M3_2 = defineLevel('m3-2', [
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
], 'curriculum');
