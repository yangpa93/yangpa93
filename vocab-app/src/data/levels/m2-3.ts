/**
 * 중학교 2학년 레벨 3 어휘 33개.
 *
 * 선정 기준: 중학교 2학년 검정 교과서 공통 어휘와 중간·기말 서술형에 자주 나오는 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M2_3 = defineLevel('m2-3', [
  { w: 'repeat', p: 'v.', s: [
    { m: '반복하다, 되풀이하다', syn: ['say again', 'do again'], ex: [
      ['Please repeat the sentence.', '그 문장을 반복해 주세요.'],
      ['Do not repeat the same mistake.', '같은 실수를 반복하지 마라.'],
      ['The show repeats every hour.', '그 공연은 매시간 반복된다.'],
    ]},
  ]},
  { w: 'respect', p: 'v., n.', s: [
    { m: '존중하다; 존중', syn: ['honor', 'look up to'], ex: [
      ['We should respect others.', '우리는 다른 사람을 존중해야 한다.'],
      ['He respects his teacher very much.', '그는 선생님을 매우 존경한다.'],
      ['Treat everyone with respect.', '모두를 존중하는 태도로 대해라.'],
    ]},
  ]},
  { w: 'result', p: 'n.', s: [
    { m: '결과', syn: ['outcome', 'effect'], ex: [
      ['The result was better than I thought.', '결과는 생각보다 좋았다.'],
      ['We will announce the results tomorrow.', '우리는 내일 결과를 발표할 것이다.'],
      ['The accident was the result of carelessness.', '그 사고는 부주의의 결과였다.'],
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
  { w: 'similar', p: 'adj.', s: [
    { m: '비슷한, 유사한', syn: ['alike', 'like'], ex: [
      ['Our ideas are similar.', '우리 생각은 비슷하다.'],
      ['The twins look very similar.', '그 쌍둥이는 매우 닮았다.'],
      ['This is similar to what we saw before.', '이것은 우리가 전에 본 것과 비슷하다.'],
    ]},
  ]},
  { w: 'skill', p: 'n.', s: [
    { m: '기술, 능력', syn: ['ability', 'technique'], ex: [
      ['Cooking is a useful skill.', '요리는 유용한 기술이다.'],
      ['He has great computer skills.', '그는 뛰어난 컴퓨터 기술을 가지고 있다.'],
      ['Listening is an important language skill.', '듣기는 중요한 언어 기술이다.'],
    ]},
  ]},
  { w: 'society', p: 'n.', s: [
    { m: '사회', syn: ['community', 'the public'], ex: [
      ['Technology changes society.', '기술은 사회를 변화시킨다.'],
      ['Every member of society has a role.', '사회의 모든 구성원은 역할이 있다.'],
      ['Modern society moves very fast.', '현대 사회는 매우 빠르게 움직인다.'],
    ]},
  ]},
  { w: 'succeed', p: 'v.', s: [
    { m: '성공하다', syn: ['do well', 'make it'], ex: [
      ['She succeeded after many tries.', '그녀는 여러 번 시도한 끝에 성공했다.'],
      ['You will succeed if you keep trying.', '계속 노력하면 성공할 것이다.'],
      ['The plan succeeded beyond our hopes.', '그 계획은 기대 이상으로 성공했다.'],
    ]},
  ]},
  { w: 'suggest', p: 'v.', s: [
    { m: '제안하다', syn: ['propose', 'recommend'], ex: [
      ['I suggest starting early.', '나는 일찍 시작할 것을 제안한다.'],
      ['She suggested a different plan.', '그녀는 다른 계획을 제안했다.'],
      ['May I suggest something?', '한 가지 제안해도 될까요?'],
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
  { w: 'surface', p: 'n.', s: [
    { m: '표면', syn: ['outside', 'top'], ex: [
      ['The surface of the lake was calm.', '호수의 표면은 잔잔했다.'],
      ['Clean the surface before painting.', '칠하기 전에 표면을 닦아라.'],
      ['Most of the earth’s surface is water.', '지구 표면의 대부분은 물이다.'],
    ]},
  ]},
  { w: 'tradition', p: 'n.', s: [
    { m: '전통', syn: ['custom', 'heritage'], ex: [
      ['Hanbok is part of our tradition.', '한복은 우리 전통의 일부이다.'],
      ['It is a family tradition to eat together.', '함께 식사하는 것은 가족 전통이다.'],
      ['Many traditions are disappearing.', '많은 전통이 사라지고 있다.'],
    ]},
  ]},
  { w: 'trust', p: 'v., n.', s: [
    { m: '믿다; 신뢰', syn: ['believe in', 'rely on'], ex: [
      ['I trust my best friend.', '나는 가장 친한 친구를 믿는다.'],
      ['Trust takes years to build.', '신뢰는 쌓는 데 여러 해가 걸린다.'],
      ['You can trust her with anything.', '너는 그녀에게 무엇이든 믿고 맡길 수 있다.'],
    ]},
  ]},
  { w: 'useful', p: 'adj.', s: [
    { m: '유용한, 쓸모 있는', syn: ['helpful', 'handy'], ex: [
      ['This app is very useful.', '이 앱은 매우 유용하다.'],
      ['She gave me useful advice.', '그녀는 나에게 유용한 조언을 해 주었다.'],
      ['A dictionary is useful when reading.', '사전은 읽을 때 유용하다.'],
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
  { w: 'weight', p: 'n.', s: [
    { m: '무게, 체중', syn: ['heaviness'], ex: [
      ['He lost some weight.', '그는 체중을 조금 줄였다.'],
      ['What is the weight of this box?', '이 상자의 무게는 얼마니?'],
      ['The bridge can hold a lot of weight.', '그 다리는 큰 무게를 견딜 수 있다.'],
    ]},
  ]},
  { w: 'worth', p: 'adj.', s: [
    { m: '~할 가치가 있는', syn: ['deserving of'], ex: [
      ['This book is worth reading.', '이 책은 읽을 가치가 있다.'],
      ['The trip was worth the money.', '그 여행은 돈값을 했다.'],
      ['It is worth trying at least once.', '적어도 한 번은 시도해 볼 가치가 있다.'],
    ]},
  ]},
  { w: 'be able to', p: 'phr.', s: [
    { m: '~할 수 있다', syn: ['can', 'be capable of'], ex: [
      ['She is able to swim well.', '그녀는 수영을 잘할 수 있다.'],
      ['I was not able to come yesterday.', '나는 어제 올 수 없었다.'],
      ['Will you be able to help me?', '나를 도와줄 수 있겠니?'],
    ]},
  ]},
  { w: 'be full of', p: 'phr.', s: [
    { m: '~로 가득 차다', syn: ['be filled with'], ex: [
      ['The box is full of toys.', '그 상자는 장난감으로 가득 차 있다.'],
      ['His room is full of books.', '그의 방은 책으로 가득하다.'],
      ['The street was full of people.', '거리는 사람들로 가득했다.'],
    ]},
  ]},
  { w: 'depend on', p: 'phr.', s: [
    { m: '~에 달려 있다', syn: ['rely on', 'be up to'], ex: [
      ['It depends on the weather.', '그것은 날씨에 달려 있다.'],
      ['Our plan depends on his answer.', '우리 계획은 그의 대답에 달려 있다.'],
    ]},
    { m: '~에 의존하다', syn: ['count on'], ex: [
      ['Children depend on their parents.', '아이들은 부모에게 의존한다.'],
      ['You can depend on me.', '나에게 의지해도 된다.'],
    ]},
  ]},
  { w: 'find out', p: 'phr.', s: [
    { m: '알아내다, 알게 되다', syn: ['discover', 'learn'], ex: [
      ['I found out the truth.', '나는 진실을 알아냈다.'],
      ['Let’s find out who won.', '누가 이겼는지 알아보자.'],
      ['She found out about the party too late.', '그녀는 파티에 대해 너무 늦게 알았다.'],
    ]},
  ]},
  { w: 'give up', p: 'phr.', s: [
    { m: '포기하다', syn: ['quit', 'stop trying'], ex: [
      ['Never give up your dream.', '결코 꿈을 포기하지 마라.'],
      ['He gave up after three tries.', '그는 세 번 시도한 후 포기했다.'],
      ['Do not give up so easily.', '그렇게 쉽게 포기하지 마라.'],
    ]},
  ]},
  { w: 'in order to', p: 'phr.', s: [
    { m: '~하기 위하여', syn: ['so as to', 'to'], ex: [
      ['He studies hard in order to pass.', '그는 합격하기 위해 열심히 공부한다.'],
      ['She woke up early in order to catch the train.', '그녀는 기차를 타려고 일찍 일어났다.'],
      ['We saved money in order to travel.', '우리는 여행하려고 돈을 모았다.'],
    ]},
  ]},
  { w: 'instead of', p: 'phr.', s: [
    { m: '~ 대신에', syn: ['rather than', 'in place of'], ex: [
      ['I drank water instead of soda.', '나는 탄산음료 대신 물을 마셨다.'],
      ['Walk instead of taking the bus.', '버스를 타는 대신 걸어라.'],
      ['She sent an email instead of calling.', '그녀는 전화 대신 이메일을 보냈다.'],
    ]},
  ]},
  { w: 'look after', p: 'phr.', s: [
    { m: '~을 돌보다', syn: ['take care of', 'care for'], ex: [
      ['She looks after her sister.', '그녀는 여동생을 돌본다.'],
      ['Who looks after your dog?', '누가 네 개를 돌보니?'],
      ['He looked after the plants while we were away.', '그는 우리가 없는 동안 식물을 돌봤다.'],
    ]},
  ]},
  { w: 'put off', p: 'phr.', s: [
    { m: '미루다, 연기하다', syn: ['delay', 'postpone'], ex: [
      ["Don't put off your homework.", '숙제를 미루지 마라.'],
      ['They put off the game because of rain.', '그들은 비 때문에 경기를 연기했다.'],
      ['She keeps putting off the decision.', '그녀는 계속 결정을 미루고 있다.'],
    ]},
  ]},
  { w: 'take part in', p: 'phr.', s: [
    { m: '~에 참여하다', syn: ['join', 'participate in'], ex: [
      ['I took part in the contest.', '나는 그 대회에 참가했다.'],
      ['Many students took part in the event.', '많은 학생이 그 행사에 참여했다.'],
      ['Will you take part in the discussion?', '토론에 참여할 거니?'],
    ]},
  ]},
  { w: 'thanks to', p: 'phr.', s: [
    { m: '~ 덕분에', syn: ['because of', 'owing to'], ex: [
      ['Thanks to her, we finished early.', '그녀 덕분에 우리는 일찍 끝냈다.'],
      ['Thanks to the map, we did not get lost.', '지도 덕분에 우리는 길을 잃지 않았다.'],
      ['He passed thanks to hard work.', '그는 노력 덕분에 합격했다.'],
    ]},
  ]},
  { w: 'used to', p: 'phr.', s: [
    { m: '~하곤 했다', syn: ['would often'], ex: [
      ['I used to play the violin.', '나는 바이올린을 켜곤 했다.'],
      ['There used to be a park here.', '여기에 공원이 있었다.'],
      ['She used to live in Daegu.', '그녀는 대구에 살았었다.'],
    ]},
  ]},
  { w: 'apologize', p: 'v.', s: [
    { m: '사과하다', syn: ['say sorry'], ex: [
      ['He apologized for being late.', '그는 늦은 것에 대해 사과했다.'],
      ['You should apologize to your sister.', '너는 여동생에게 사과해야 한다.'],
      ['She apologized and left quietly.', '그녀는 사과하고 조용히 떠났다.'],
    ]},
  ]},
  { w: 'attend', p: 'v.', s: [
    { m: '참석하다, 다니다', syn: ['go to', 'be present at'], ex: [
      ['She attends a middle school nearby.', '그녀는 근처 중학교에 다닌다.'],
      ['Many parents attended the meeting.', '많은 학부모가 그 모임에 참석했다.'],
      ['He could not attend the ceremony.', '그는 그 행사에 참석하지 못했다.'],
    ]},
  ]},
], 'curriculum');
