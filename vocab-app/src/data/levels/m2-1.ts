/**
 * 중학교 2학년 레벨 1 어휘 34개.
 *
 * 선정 기준: 중학교 2학년 검정 교과서 공통 어휘와 중간·기말 서술형에 자주 나오는 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M2_1 = defineLevel('m2-1', [
  { w: 'ability', p: 'n.', s: [
    { m: '능력', syn: ['skill', 'talent'], ex: [
      ['She has the ability to lead.', '그녀는 이끄는 능력이 있다.'],
      ['Birds have the ability to fly long distances.', '새는 먼 거리를 나는 능력이 있다.'],
      ['Reading improves your thinking ability.', '독서는 사고 능력을 향상시킨다.'],
    ]},
  ]},
  { w: 'accept', p: 'v.', s: [
    { m: '받아들이다, 수락하다', syn: ['take', 'agree to'], ex: [
      ['He accepted my apology.', '그는 내 사과를 받아들였다.'],
      ['She accepted the job offer.', '그녀는 그 일자리 제안을 수락했다.'],
      ['We must accept the result.', '우리는 그 결과를 받아들여야 한다.'],
    ]},
  ]},
  { w: 'achieve', p: 'v.', s: [
    { m: '성취하다, 이루다', syn: ['accomplish', 'reach'], ex: [
      ['She achieved her goal.', '그녀는 목표를 이루었다.'],
      ['You can achieve anything with effort.', '노력하면 무엇이든 이룰 수 있다.'],
      ['The team achieved great results.', '그 팀은 훌륭한 성과를 거두었다.'],
    ]},
  ]},
  { w: 'advice', p: 'n.', s: [
    { m: '조언, 충고', syn: ['tip', 'guidance'], ex: [
      ['Thank you for your advice.', '조언해 주셔서 감사합니다.'],
      ['He gave me good advice about studying.', '그는 공부에 대해 좋은 조언을 해 주었다.'],
      ['I need some advice from a teacher.', '나는 선생님의 조언이 필요하다.'],
    ]},
  ]},
  { w: 'allow', p: 'v.', s: [
    { m: '허락하다', syn: ['let', 'permit'], ex: [
      ['My parents allow me to play outside.', '부모님은 내가 밖에서 노는 것을 허락하신다.'],
      ['Pets are not allowed in this park.', '이 공원에는 반려동물이 허용되지 않는다.'],
      ['Allow me to explain.', '설명하게 해 주세요.'],
    ]},
  ]},
  { w: 'amazing', p: 'adj.', s: [
    { m: '놀라운, 굉장한', syn: ['incredible', 'wonderful'], ex: [
      ['The view was amazing.', '그 경치는 놀라웠다.'],
      ['She did an amazing job.', '그녀는 굉장한 일을 해냈다.'],
      ['It is amazing how fast he runs.', '그가 얼마나 빨리 달리는지 놀랍다.'],
    ]},
  ]},
  { w: 'appear', p: 'v.', s: [
    { m: '나타나다', syn: ['show up', 'come out'], ex: [
      ['A rainbow appeared in the sky.', '하늘에 무지개가 나타났다.'],
      ['The actor appeared on stage.', '그 배우가 무대에 나타났다.'],
    ]},
    { m: '~처럼 보이다', syn: ['seem', 'look'], ex: [
      ['He appears tired today.', '그는 오늘 피곤해 보인다.'],
      ['It appears that she forgot.', '그녀가 잊은 것 같다.'],
    ]},
  ]},
  { w: 'attention', p: 'n.', s: [
    { m: '주의, 관심', syn: ['notice', 'focus'], ex: [
      ['Pay attention to the sign.', '표지판에 주의를 기울여라.'],
      ['The movie got a lot of attention.', '그 영화는 많은 관심을 받았다.'],
      ['May I have your attention, please?', '주목해 주시겠습니까?'],
    ]},
  ]},
  { w: 'avoid', p: 'v.', s: [
    { m: '피하다', syn: ['stay away from', 'keep away from'], ex: [
      ['Try to avoid junk food.', '정크푸드를 피하려고 노력해라.'],
      ['We left early to avoid traffic.', '우리는 교통 체증을 피하려고 일찍 떠났다.'],
      ['He avoided answering my question.', '그는 내 질문에 답하기를 피했다.'],
    ]},
  ]},
  { w: 'balance', p: 'n., v.', s: [
    { m: '균형; 균형을 잡다', syn: ['stability'], ex: [
      ['Keep a balance between study and rest.', '공부와 휴식 사이에 균형을 유지해라.'],
      ['She lost her balance and fell.', '그녀는 균형을 잃고 넘어졌다.'],
      ['It is hard to balance work and family.', '일과 가정의 균형을 맞추기는 어렵다.'],
    ]},
  ]},
  { w: 'behavior', p: 'n.', s: [
    { m: '행동, 태도', syn: ['conduct', 'manner'], ex: [
      ['His behavior surprised us.', '그의 행동은 우리를 놀라게 했다.'],
      ['Good behavior is rewarded here.', '이곳에서는 바른 행동에 상을 준다.'],
      ['Scientists study animal behavior.', '과학자들은 동물의 행동을 연구한다.'],
    ]},
  ]},
  { w: 'benefit', p: 'n., v.', s: [
    { m: '이익, 혜택', syn: ['advantage', 'gain'], ex: [
      ['Exercise has many benefits.', '운동은 많은 이점이 있다.'],
      ['The main benefit is saving time.', '주된 이점은 시간을 아끼는 것이다.'],
      ['Everyone benefits from clean air.', '깨끗한 공기는 모두에게 이롭다.'],
    ]},
  ]},
  { w: 'brave', p: 'adj.', s: [
    { m: '용감한', syn: ['courageous', 'bold'], ex: [
      ['The brave boy saved a puppy.', '그 용감한 소년이 강아지를 구했다.'],
      ['It was brave of her to speak up.', '그녀가 목소리를 낸 것은 용감했다.'],
      ['Be brave and try again.', '용감하게 다시 시도해라.'],
    ]},
  ]},
  { w: 'challenge', p: 'n., v.', s: [
    { m: '도전, 어려운 일', syn: ['difficulty', 'test'], ex: [
      ['Learning English is a challenge.', '영어를 배우는 것은 도전이다.'],
      ['She enjoys a new challenge.', '그녀는 새로운 도전을 즐긴다.'],
      ['The biggest challenge was time.', '가장 큰 어려움은 시간이었다.'],
    ]},
  ]},
  { w: 'communicate', p: 'v.', s: [
    { m: '의사소통하다', syn: ['talk', 'get in touch'], ex: [
      ['We communicate by text message.', '우리는 문자로 의사소통한다.'],
      ['Dolphins communicate with sounds.', '돌고래는 소리로 의사소통한다.'],
      ['It is hard to communicate without a common language.', '공통 언어 없이 소통하기는 어렵다.'],
    ]},
  ]},
  { w: 'community', p: 'n.', s: [
    { m: '지역 사회, 공동체', syn: ['neighborhood'], ex: [
      ['Our community held a festival.', '우리 지역 사회는 축제를 열었다.'],
      ['He works for the local community.', '그는 지역 사회를 위해 일한다.'],
      ['A school is the heart of a community.', '학교는 공동체의 중심이다.'],
    ]},
  ]},
  { w: 'compare', p: 'v.', s: [
    { m: '비교하다', syn: ['contrast', 'weigh against'], ex: [
      ["Don't compare yourself with others.", '너 자신을 남과 비교하지 마라.'],
      ['Compare the two pictures carefully.', '두 그림을 주의 깊게 비교해라.'],
      ['Prices are low compared to last year.', '작년에 비하면 가격이 낮다.'],
    ]},
  ]},
  { w: 'complete', p: 'v., adj.', s: [
    { m: '완성하다, 끝마치다', syn: ['finish', 'accomplish'], ex: [
      ['He completed the project.', '그는 그 과제를 완성했다.'],
      ['Please complete the form.', '양식을 작성해 주세요.'],
    ]},
    { m: '완전한, 전부의', syn: ['whole', 'total'], ex: [
      ['We need a complete list of names.', '우리는 이름 전체 목록이 필요하다.'],
      ['It was a complete surprise.', '그것은 완전한 놀라움이었다.'],
    ]},
  ]},
  { w: 'condition', p: 'n.', s: [
    { m: '상태', syn: ['state', 'shape'], ex: [
      ['The bike is in good condition.', '그 자전거는 상태가 좋다.'],
      ['The building is in poor condition.', '그 건물은 상태가 나쁘다.'],
    ]},
    { m: '조건', syn: ['requirement', 'term'], ex: [
      ['You can go on one condition.', '한 가지 조건으로 갈 수 있다.'],
      ['Working conditions have improved.', '근무 조건이 개선되었다.'],
    ]},
  ]},
  { w: 'confident', p: 'adj.', s: [
    { m: '자신 있는, 확신하는', syn: ['sure', 'certain'], ex: [
      ['She is confident about the test.', '그녀는 시험에 자신 있다.'],
      ['He spoke in a confident voice.', '그는 자신 있는 목소리로 말했다.'],
      ['I am confident that we can win.', '나는 우리가 이길 수 있다고 확신한다.'],
    ]},
  ]},
  { w: 'connect', p: 'v.', s: [
    { m: '연결하다, 잇다', syn: ['link', 'join'], ex: [
      ['This bridge connects two towns.', '이 다리는 두 마을을 연결한다.'],
      ['Connect the printer to the computer.', '프린터를 컴퓨터에 연결해라.'],
      ['The internet connects people everywhere.', '인터넷은 어디서든 사람들을 연결한다.'],
    ]},
  ]},
  { w: 'consider', p: 'v.', s: [
    { m: '고려하다, 생각해 보다', syn: ['think about', 'take into account'], ex: [
      ['Please consider my idea.', '제 생각을 고려해 주세요.'],
      ['We are considering moving to Busan.', '우리는 부산으로 이사하는 것을 고려 중이다.'],
    ]},
    { m: '~라고 여기다', syn: ['regard', 'see as'], ex: [
      ['Many consider him the best player.', '많은 사람이 그를 최고의 선수로 여긴다.'],
      ['She considers it a great honor.', '그녀는 그것을 큰 영광으로 여긴다.'],
    ]},
  ]},
  { w: 'continue', p: 'v.', s: [
    { m: '계속하다, 계속되다', syn: ['keep on', 'go on'], ex: [
      ['The rain continued all night.', '비가 밤새 계속되었다.'],
      ['He continued to study after dinner.', '그는 저녁 후에도 계속 공부했다.'],
      ['The story continues next week.', '이야기는 다음 주에 계속된다.'],
    ]},
  ]},
  { w: 'create', p: 'v.', s: [
    { m: '창조하다, 만들어 내다', syn: ['make', 'produce'], ex: [
      ['Artists create beautiful works.', '예술가들은 아름다운 작품을 만든다.'],
      ['The app was created by students.', '그 앱은 학생들이 만들었다.'],
      ['Music can create a warm mood.', '음악은 따뜻한 분위기를 만들 수 있다.'],
    ]},
  ]},
  { w: 'curious', p: 'adj.', s: [
    { m: '궁금한, 호기심 많은', syn: ['interested', 'inquisitive'], ex: [
      ["I'm curious about space.", '나는 우주에 대해 궁금하다.'],
      ['Children are naturally curious.', '아이들은 천성적으로 호기심이 많다.'],
      ['She was curious to know the answer.', '그녀는 답이 궁금했다.'],
    ]},
  ]},
  { w: 'damage', p: 'n., v.', s: [
    { m: '피해, 손상; 손상시키다', syn: ['harm', 'hurt'], ex: [
      ['The storm caused great damage.', '폭풍이 큰 피해를 입혔다.'],
      ['Sunlight can damage your skin.', '햇빛은 피부를 손상시킬 수 있다.'],
      ['The damage was worse than we thought.', '피해는 생각보다 심했다.'],
    ]},
  ]},
  { w: 'describe', p: 'v.', s: [
    { m: '묘사하다, 설명하다', syn: ['explain', 'depict'], ex: [
      ['Describe the picture in English.', '그 그림을 영어로 설명해라.'],
      ['She described her hometown to us.', '그녀는 우리에게 고향을 묘사해 주었다.'],
      ['Can you describe what happened?', '무슨 일이 있었는지 설명해 줄 수 있니?'],
    ]},
  ]},
  { w: 'develop', p: 'v.', s: [
    { m: '발전시키다, 개발하다', syn: ['improve', 'build up'], ex: [
      ['Reading develops your mind.', '독서는 사고력을 발전시킨다.'],
      ['The company developed a new game.', '그 회사는 새 게임을 개발했다.'],
      ['She developed a habit of writing daily.', '그녀는 매일 쓰는 습관을 길렀다.'],
    ]},
  ]},
  { w: 'difference', p: 'n.', s: [
    { m: '차이', syn: ['gap', 'contrast'], ex: [
      ["What's the difference between them?", '그것들의 차이가 무엇이니?'],
      ['There is a big difference in price.', '가격에 큰 차이가 있다.'],
      ['One person can make a difference.', '한 사람이 변화를 만들 수 있다.'],
    ]},
  ]},
  { w: 'discover', p: 'v.', s: [
    { m: '발견하다, 알아내다', syn: ['find', 'find out'], ex: [
      ['Scientists discovered a new planet.', '과학자들이 새 행성을 발견했다.'],
      ['I discovered that I liked cooking.', '나는 요리를 좋아한다는 것을 알게 되었다.'],
      ['The cave was discovered in 1940.', '그 동굴은 1940년에 발견되었다.'],
    ]},
  ]},
  { w: 'effort', p: 'n.', s: [
    { m: '노력', syn: ['hard work', 'attempt'], ex: [
      ['Success needs effort.', '성공에는 노력이 필요하다.'],
      ['He made an effort to be kind.', '그는 친절하려고 노력했다.'],
      ['Their effort finally paid off.', '그들의 노력이 마침내 결실을 맺었다.'],
    ]},
  ]},
  { w: 'environment', p: 'n.', s: [
    { m: '(자연) 환경', syn: ['nature'], ex: [
      ['We must protect the environment.', '우리는 환경을 보호해야 한다.'],
      ['Plastic harms the environment.', '플라스틱은 환경을 해친다.'],
    ]},
    { m: '(주변) 환경, 분위기', syn: ['surroundings'], ex: [
      ['A quiet environment helps me study.', '조용한 환경은 내가 공부하는 데 도움이 된다.'],
      ['Children need a safe environment.', '아이들은 안전한 환경이 필요하다.'],
    ]},
  ]},
  { w: 'especially', p: 'adv.', s: [
    { m: '특히', syn: ['particularly', 'above all'], ex: [
      ['I like fruit, especially apples.', '나는 과일, 특히 사과를 좋아한다.'],
      ['It is cold, especially at night.', '춥다, 특히 밤에는.'],
      ['This rule is important, especially for beginners.', '이 규칙은 특히 초보자에게 중요하다.'],
    ]},
  ]},
  { w: 'expect', p: 'v.', s: [
    { m: '기대하다, 예상하다', syn: ['anticipate', 'look forward to'], ex: [
      ['I expect good news.', '나는 좋은 소식을 기대한다.'],
      ['We expect rain this weekend.', '이번 주말에 비가 올 것으로 예상한다.'],
      ['She did better than we expected.', '그녀는 우리가 예상한 것보다 잘했다.'],
    ]},
  ]},
], 'curriculum');
