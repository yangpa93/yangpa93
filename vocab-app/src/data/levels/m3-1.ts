/**
 * 중학교 3학년 레벨 1 — 수록 44 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M3_1 = defineLevel('m3-1', [
  { w: 'challenge', p: 'n., v.', s: [
    { m: '도전, 어려운 일', syn: ['difficulty', 'test'], ex: [
      ['Learning English is a challenge.', '영어를 배우는 것은 도전이다.'],
      ['She enjoys a new challenge.', '그녀는 새로운 도전을 즐긴다.'],
      ['The biggest challenge was time.', '가장 큰 어려움은 시간이었다.'],
    ]},
  ]},
  { w: 'cheer', p: 'v.', s: [
    { m: '응원하다, 환호하다', syn: ['support'], ex: [
      ['We cheered for our team.', '우리는 우리 팀을 응원했다.'],
      ['The crowd cheered loudly.', '관중이 크게 환호했다.'],
      ['Let us cheer him up.', '그를 기운 나게 해 주자.'],
    ]},
  ]},
  { w: 'circumstance', p: 'n.', s: [
    { m: '상황, 환경', syn: ['situation', 'condition'], ex: [
      ['He did well under hard circumstances.', '그는 어려운 상황에서도 잘 해냈다.'],
      ['Under no circumstances should you go alone.', '어떤 경우에도 혼자 가서는 안 된다.'],
      ['The circumstances have changed.', '상황이 바뀌었다.'],
    ]},
  ]},
  { w: 'claim', p: 'v., n.', s: [
    { m: '주장하다; 주장', syn: ['assert', 'state'], ex: [
      ['He claimed he was innocent.', '그는 자신이 결백하다고 주장했다.'],
      ['The company claims its product is safe.', '그 회사는 자사 제품이 안전하다고 주장한다.'],
      ['There is no proof for that claim.', '그 주장에는 증거가 없다.'],
    ]},
  ]},
  { w: 'coach', p: 'n.', s: [
    { m: '코치, 감독', syn: ['trainer'], ex: [
      ['Our coach is very kind.', '우리 코치님은 아주 친절하시다.'],
      ['The coach taught us a new skill.', '코치가 우리에게 새 기술을 가르쳐 주었다.'],
      ['She wants to be a soccer coach.', '그녀는 축구 코치가 되고 싶어 한다.'],
    ]},
  ]},
  { w: 'come up with', p: 'phr.', s: [
    { m: '(생각을) 떠올리다, 내놓다', syn: ['think of', 'produce'], ex: [
      ['She came up with a great idea.', '그녀는 훌륭한 생각을 떠올렸다.'],
      ['Can you come up with a better title?', '더 나은 제목을 생각해 낼 수 있니?'],
      ['They came up with a simple solution.', '그들은 간단한 해결책을 내놓았다.'],
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
  { w: 'compensation', p: 'n.', s: [
    { m: '보상, 배상', syn: ['payment', 'repayment'], ex: [
      ['They received compensation for the damage.', '그들은 피해에 대한 보상을 받았다.'],
      ['She asked for fair compensation.', '그녀는 정당한 보상을 요구했다.'],
      ['No compensation was offered.', '어떤 보상도 제시되지 않았다.'],
    ]},
  ]},
  { w: 'competition', p: 'n.', s: [
    { m: '경쟁', syn: ['rivalry'], ex: [
      ['Competition can raise quality.', '경쟁은 질을 높일 수 있다.'],
      ['There is fierce competition for jobs.', '일자리를 두고 치열한 경쟁이 있다.'],
    ]},
    { m: '대회, 시합', syn: ['contest', 'tournament'], ex: [
      ['She won the singing competition.', '그녀는 노래 대회에서 우승했다.'],
      ['The competition is held every spring.', '그 대회는 매년 봄에 열린다.'],
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
  { w: 'complex', p: 'adj.', s: [
    { m: '복잡한', syn: ['complicated', 'intricate'], ex: [
      ['The problem is more complex than it looks.', '그 문제는 보이는 것보다 복잡하다.'],
      ['The human brain is highly complex.', '인간의 뇌는 매우 복잡하다.'],
      ['She gave a complex explanation.', '그녀는 복잡한 설명을 했다.'],
    ]},
  ]},
  { w: 'concentrate', p: 'v.', s: [
    { m: '집중하다', syn: ['focus', 'pay attention'], ex: [
      ['I cannot concentrate in noise.', '나는 시끄러우면 집중할 수 없다.'],
      ['Concentrate on one thing at a time.', '한 번에 한 가지에 집중해라.'],
      ['She concentrated hard on the puzzle.', '그녀는 퍼즐에 열심히 집중했다.'],
    ]},
  ]},
  { w: 'conflict', p: 'n., v.', s: [
    { m: '갈등, 충돌', syn: ['dispute', 'clash'], ex: [
      ['They solved the conflict by talking.', '그들은 대화로 갈등을 해결했다.'],
      ['There is a conflict between the two rules.', '두 규칙 사이에 충돌이 있다.'],
      ['The war caused years of conflict.', '그 전쟁은 수년간의 갈등을 낳았다.'],
    ]},
  ]},
  { w: 'confuse', p: 'v.', s: [
    { m: '혼란시키다, 헷갈리게 하다', syn: ['puzzle', 'mix up'], ex: [
      ['The map confused me.', '그 지도는 나를 혼란스럽게 했다.'],
      ['People often confuse these two words.', '사람들은 종종 이 두 단어를 헷갈린다.'],
      ['His answer only confused us more.', '그의 대답은 우리를 더 혼란스럽게 했을 뿐이다.'],
    ]},
  ]},
  { w: 'connect', p: 'v.', s: [
    { m: '연결하다, 잇다', syn: ['link', 'join'], ex: [
      ['This bridge connects two towns.', '이 다리는 두 마을을 연결한다.'],
      ['Connect the printer to the computer.', '프린터를 컴퓨터에 연결해라.'],
      ['The internet connects people everywhere.', '인터넷은 어디서든 사람들을 연결한다.'],
    ]},
  ]},
  { w: 'consequence', p: 'n.', s: [
    { m: '결과, 영향', syn: ['result', 'outcome'], ex: [
      ['Every choice has consequences.', '모든 선택에는 결과가 따른다.'],
      ['He faced the consequences of his actions.', '그는 자기 행동의 결과를 감당했다.'],
      ['As a consequence, prices rose.', '그 결과로 가격이 올랐다.'],
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
  { w: 'contain', p: 'v.', s: [
    { m: '포함하다, 담고 있다', syn: ['include', 'hold'], ex: [
      ['This drink contains sugar.', '이 음료는 설탕을 함유하고 있다.'],
      ['The box contained old letters.', '그 상자에는 오래된 편지들이 들어 있었다.'],
      ['Does this food contain nuts?', '이 음식에 견과류가 들어 있나요?'],
    ]},
  ]},
  { w: 'contest', p: 'n.', s: [
    { m: '대회, 시합', syn: ['competition'], ex: [
      ['She won the singing contest.', '그녀는 노래 대회에서 우승했다.'],
      ['I entered a writing contest.', '나는 글쓰기 대회에 참가했다.'],
      ['The contest will be held next week.', '그 대회는 다음 주에 열릴 것이다.'],
    ]},
  ]},
  { w: 'continue', p: 'v.', s: [
    { m: '계속하다, 계속되다', syn: ['keep on', 'go on'], ex: [
      ['The rain continued all night.', '비가 밤새 계속되었다.'],
      ['He continued to study after dinner.', '그는 저녁 후에도 계속 공부했다.'],
      ['The story continues next week.', '이야기는 다음 주에 계속된다.'],
    ]},
  ]},
  { w: 'contribute', p: 'v.', s: [
    { m: '기여하다, 도움이 되다', syn: ['add to', 'help'], ex: [
      ['Exercise contributes to good health.', '운동은 건강에 기여한다.'],
      ['Everyone contributed to the success.', '모두가 성공에 기여했다.'],
    ]},
    { m: '기부하다', syn: ['donate', 'give'], ex: [
      ['They contributed money to the school.', '그들은 학교에 돈을 기부했다.'],
      ['She contributed her time to charity.', '그녀는 자선 활동에 시간을 내주었다.'],
    ]},
  ]},
  { w: 'convenient', p: 'adj.', s: [
    { m: '편리한', syn: ['handy', 'easy to use'], ex: [
      ['Online shopping is convenient.', '온라인 쇼핑은 편리하다.'],
      ['Is Friday convenient for you?', '금요일이 편하신가요?'],
      ['The store is in a convenient location.', '그 가게는 편리한 위치에 있다.'],
    ]},
  ]},
  { w: 'convince', p: 'v.', s: [
    { m: '설득하다, 확신시키다', syn: ['persuade', 'assure'], ex: [
      ['He convinced me to join.', '그는 내가 참여하도록 설득했다.'],
      ['She convinced them that it was safe.', '그녀는 그것이 안전하다고 그들을 납득시켰다.'],
      ['I am not convinced by his argument.', '나는 그의 주장에 설득되지 않는다.'],
    ]},
  ]},
  { w: 'count', p: 'v.', s: [
    { m: '세다, 계산하다', syn: ['add up'], ex: [
      ['Count the students in the room.', '방 안의 학생 수를 세어라.'],
      ['She counted her money twice.', '그녀는 돈을 두 번 세었다.'],
      ['He is counting the days until vacation.', '그는 방학까지 날을 세고 있다.'],
    ]},
  ]},
  { w: 'create', p: 'v.', s: [
    { m: '창조하다, 만들어 내다', syn: ['make', 'produce'], ex: [
      ['Artists create beautiful works.', '예술가들은 아름다운 작품을 만든다.'],
      ['The app was created by students.', '그 앱은 학생들이 만들었다.'],
      ['Music can create a warm mood.', '음악은 따뜻한 분위기를 만들 수 있다.'],
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
  { w: 'curious', p: 'adj.', s: [
    { m: '궁금한, 호기심 많은', syn: ['interested', 'inquisitive'], ex: [
      ["I'm curious about space.", '나는 우주에 대해 궁금하다.'],
      ['Children are naturally curious.', '아이들은 천성적으로 호기심이 많다.'],
      ['She was curious to know the answer.', '그녀는 답이 궁금했다.'],
    ]},
  ]},
  { w: 'cute', p: 'adj.', s: [
    { m: '귀여운', syn: ['lovely'], ex: [
      ['What a cute puppy!', '정말 귀여운 강아지구나!'],
      ['She wore a cute hat.', '그녀는 귀여운 모자를 썼다.'],
      ['The baby looks cute in that photo.', '그 사진 속 아기는 귀여워 보인다.'],
    ]},
  ]},
  { w: 'damage', p: 'n., v.', s: [
    { m: '피해, 손상; 손상시키다', syn: ['harm', 'hurt'], ex: [
      ['The storm caused great damage.', '폭풍이 큰 피해를 입혔다.'],
      ['Sunlight can damage your skin.', '햇빛은 피부를 손상시킬 수 있다.'],
      ['The damage was worse than we thought.', '피해는 생각보다 심했다.'],
    ]},
  ]},
  { w: 'deal with', p: 'phr.', s: [
    { m: '다루다, 처리하다', syn: ['handle', 'cope with'], ex: [
      ['We must deal with this problem.', '우리는 이 문제를 처리해야 한다.'],
      ['How do you deal with stress?', '너는 스트레스를 어떻게 다루니?'],
      ['This book deals with climate change.', '이 책은 기후 변화를 다룬다.'],
    ]},
  ]},
  { w: 'debate', p: 'n., v.', s: [
    { m: '토론; 토론하다', syn: ['discussion', 'argue'], ex: [
      ['We had a debate about school rules.', '우리는 교칙에 대해 토론했다.'],
      ['The debate lasted two hours.', '그 토론은 두 시간 동안 이어졌다.'],
      ['They debated the new policy.', '그들은 새 정책을 놓고 토론했다.'],
    ]},
  ]},
  { w: 'define', p: 'v.', s: [
    { m: '정의하다, 규정하다', syn: ['explain', 'specify'], ex: [
      ['Please define the term clearly.', '그 용어를 명확히 정의해 주세요.'],
      ['How do you define success?', '너는 성공을 어떻게 정의하니?'],
      ['The law defines who may vote.', '그 법은 누가 투표할 수 있는지 규정한다.'],
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
  { w: 'demonstrate', p: 'v.', s: [
    { m: '보여 주다, 입증하다', syn: ['show', 'prove'], ex: [
      ['The data demonstrate a clear trend.', '그 자료는 뚜렷한 경향을 보여 준다.'],
      ['He demonstrated how to use the tool.', '그는 그 도구 사용법을 보여 주었다.'],
      ['Her work demonstrates real talent.', '그녀의 작품은 진짜 재능을 입증한다.'],
    ]},
  ]},
  { w: 'dentist', p: 'n.', s: [
    { m: '치과 의사', syn: [], ex: [
      ['I went to the dentist yesterday.', '나는 어제 치과에 갔다.'],
      ['The dentist checked my teeth.', '치과 의사가 내 이를 살펴보았다.'],
      ['She wants to become a dentist.', '그녀는 치과 의사가 되고 싶어 한다.'],
    ]},
  ]},
  { w: 'deny', p: 'v.', s: [
    { m: '부인하다', syn: ['reject', 'refuse to admit'], ex: [
      ['He denied breaking the window.', '그는 창문을 깼다는 것을 부인했다.'],
      ['She denied that she was there.', '그녀는 그곳에 있었다는 것을 부인했다.'],
      ['You cannot deny the facts.', '너는 사실을 부인할 수 없다.'],
    ]},
  ]},
  { w: 'describe', p: 'v.', s: [
    { m: '묘사하다, 설명하다', syn: ['explain', 'depict'], ex: [
      ['Describe the picture in English.', '그 그림을 영어로 설명해라.'],
      ['She described her hometown to us.', '그녀는 우리에게 고향을 묘사해 주었다.'],
      ['Can you describe what happened?', '무슨 일이 있었는지 설명해 줄 수 있니?'],
    ]},
  ]},
  { w: 'desert', p: 'n.', s: [
    { m: '사막', syn: [], ex: [
      ['Very little rain falls in the desert.', '사막에는 비가 거의 내리지 않는다.'],
      ['They crossed the desert on camels.', '그들은 낙타를 타고 사막을 건넜다.'],
      ['The desert is hot during the day.', '사막은 낮에 덥다.'],
    ]},
  ]},
], 'curriculum');
