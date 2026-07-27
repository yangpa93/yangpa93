/**
 * 중학교 2학년 필수 어휘 100개.
 *
 * 선정 기준: 교육부 「기본 어휘 목록」 중 중2 교과서 공통 출현 어휘.
 * 중1의 기초 동사·형용사에서 한 단계 올라가 추상 명사와
 * 접두·접미사가 붙은 파생어가 본격적으로 나온다.
 */

import { defineLevel } from '../define';

export const M2 = defineLevel('m2', [
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
]);
