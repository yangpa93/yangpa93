/**
 * 중학교 3학년 레벨 2 — 수록 34 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M3_2 = defineLevel('m3-2', [
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
  { w: 'develop', p: 'v.', s: [
    { m: '발전시키다, 개발하다', syn: ['improve', 'build up'], ex: [
      ['Reading develops your mind.', '독서는 사고력을 발전시킨다.'],
      ['The company developed a new game.', '그 회사는 새 게임을 개발했다.'],
      ['She developed a habit of writing daily.', '그녀는 매일 쓰는 습관을 길렀다.'],
    ]},
  ]},
  { w: 'dictionary', p: 'n.', s: [
    { m: '사전', syn: [], ex: [
      ['Look it up in the dictionary.', '그것을 사전에서 찾아봐라.'],
      ['This dictionary is easy to use.', '이 사전은 사용하기 쉽다.'],
      ['She bought an English dictionary.', '그녀는 영어 사전을 샀다.'],
    ]},
  ]},
  { w: 'disappear', p: 'v.', s: [
    { m: '사라지다', syn: ['vanish', 'go away'], ex: [
      ['The bird disappeared into the woods.', '그 새는 숲속으로 사라졌다.'],
      ['My keys disappeared again.', '내 열쇠가 또 사라졌다.'],
      ['Many species are disappearing fast.', '많은 종이 빠르게 사라지고 있다.'],
    ]},
  ]},
  { w: 'dish', p: 'n.', s: [
    { m: '접시', syn: ['plate'], ex: [
      ['Please wash the dishes.', '설거지 좀 해 주세요.'],
      ['She broke a dish this morning.', '그녀는 오늘 아침에 접시를 깼다.'],
    ]},
    { m: '요리, 음식', syn: ['food'], ex: [
      ['This dish is my favorite.', '이 요리는 내가 제일 좋아하는 것이다.'],
      ['He cooked three dishes for dinner.', '그는 저녁으로 요리 세 가지를 만들었다.'],
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
  { w: 'effort', p: 'n.', s: [
    { m: '노력', syn: ['hard work', 'attempt'], ex: [
      ['Success needs effort.', '성공에는 노력이 필요하다.'],
      ['He made an effort to be kind.', '그는 친절하려고 노력했다.'],
      ['Their effort finally paid off.', '그들의 노력이 마침내 결실을 맺었다.'],
    ]},
  ]},
  { w: 'emotion', p: 'n.', s: [
    { m: '감정', syn: ['feeling'], ex: [
      ['She hid her emotions.', '그녀는 감정을 숨겼다.'],
      ['Music can stir strong emotions.', '음악은 강한 감정을 불러일으킬 수 있다.'],
      ['He spoke without showing emotion.', '그는 감정을 드러내지 않고 말했다.'],
    ]},
  ]},
  { w: 'emphasize', p: 'v.', s: [
    { m: '강조하다', syn: ['stress', 'highlight'], ex: [
      ['She emphasized the deadline.', '그녀는 마감일을 강조했다.'],
      ['The teacher emphasized reading daily.', '선생님은 매일 읽기를 강조하셨다.'],
      ['He emphasized that safety comes first.', '그는 안전이 우선이라고 강조했다.'],
    ]},
  ]},
  { w: 'empty', p: 'adj.', s: [
    { m: '비어 있는', syn: ['vacant'], ex: [
      ['The box is empty.', '그 상자는 비어 있다.'],
      ['There were many empty seats.', '빈자리가 많았다.'],
      ['He drank the glass empty.', '그는 잔을 비웠다.'],
    ]},
  ]},
  { w: 'encourage', p: 'v.', s: [
    { m: '격려하다, 장려하다', syn: ['cheer up', 'support'], ex: [
      ['My teacher encouraged me.', '선생님이 나를 격려해 주셨다.'],
      ['The school encourages reading.', '학교는 독서를 장려한다.'],
      ['Her success encouraged others to try.', '그녀의 성공은 다른 이들이 시도하도록 북돋웠다.'],
    ]},
  ]},
  { w: 'engage', p: 'v.', s: [
    { m: '참여하다, 관여하다', syn: ['take part', 'involve'], ex: [
      ['Students engage in group discussion.', '학생들이 모둠 토론에 참여한다.'],
      ['He rarely engages with strangers.', '그는 낯선 사람과 잘 어울리지 않는다.'],
    ]},
    { m: '(관심을) 사로잡다', syn: ['attract', 'hold'], ex: [
      ['The story engaged my attention.', '그 이야기가 내 주의를 사로잡았다.'],
      ['Good teachers engage their students.', '좋은 교사는 학생들의 흥미를 끈다.'],
    ]},
  ]},
  { w: 'enormous', p: 'adj.', s: [
    { m: '거대한, 막대한', syn: ['huge', 'immense'], ex: [
      ['They spent an enormous amount.', '그들은 막대한 금액을 썼다.'],
      ['The stadium is enormous.', '그 경기장은 거대하다.'],
      ['She showed enormous patience.', '그녀는 엄청난 인내심을 보였다.'],
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
  { w: 'essential', p: 'adj.', s: [
    { m: '필수적인, 본질적인', syn: ['necessary', 'vital'], ex: [
      ['Water is essential to life.', '물은 생명에 필수적이다.'],
      ['Practice is essential for progress.', '연습은 발전에 필수적이다.'],
      ['It is essential to arrive on time.', '제시간에 도착하는 것이 필수적이다.'],
    ]},
  ]},
  { w: 'establish', p: 'v.', s: [
    { m: '설립하다', syn: ['found', 'set up'], ex: [
      ['The school was established in 1950.', '그 학교는 1950년에 설립되었다.'],
      ['They established a new company.', '그들은 새 회사를 설립했다.'],
    ]},
    { m: '확립하다, 밝히다', syn: ['prove', 'confirm'], ex: [
      ['She established a good reputation.', '그녀는 좋은 평판을 쌓았다.'],
      ['Police established the cause of the fire.', '경찰이 화재 원인을 밝혀냈다.'],
    ]},
  ]},
  { w: 'even', p: 'adv.', s: [
    { m: '~조차, 심지어', syn: ['also'], ex: [
      ['Even a child can do this.', '어린아이조차 이것을 할 수 있다.'],
      ['He did not even say hello.', '그는 인사조차 하지 않았다.'],
      ['She works even on Sundays.', '그녀는 일요일에도 일한다.'],
    ]},
  ]},
  { w: 'evidence', p: 'n.', s: [
    { m: '증거', syn: ['proof', 'sign'], ex: [
      ['There is no evidence for that claim.', '그 주장에 대한 증거가 없다.'],
      ['New evidence changed the case.', '새 증거가 사건을 바꿔 놓았다.'],
      ['The evidence strongly supports the theory.', '그 증거는 이 이론을 강하게 뒷받침한다.'],
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
  { w: 'expand', p: 'v.', s: [
    { m: '확장하다, 넓히다', syn: ['grow', 'extend'], ex: [
      ['The company expanded overseas.', '그 회사는 해외로 확장했다.'],
      ['Metal expands when heated.', '금속은 가열하면 팽창한다.'],
      ['Reading expands your vocabulary.', '독서는 어휘를 넓혀 준다.'],
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
  { w: 'factor', p: 'n.', s: [
    { m: '요인, 요소', syn: ['element', 'cause'], ex: [
      ['Price is an important factor.', '가격은 중요한 요인이다.'],
      ['Several factors caused the delay.', '여러 요인이 지연을 초래했다.'],
      ['Weather was a key factor in the accident.', '날씨가 그 사고의 핵심 요인이었다.'],
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
  { w: 'fever', p: 'n.', s: [
    { m: '열', syn: [], ex: [
      ['She has a high fever.', '그녀는 고열이 있다.'],
      ['The fever went down after the medicine.', '약을 먹은 후 열이 내렸다.'],
      ['He stayed home because of a fever.', '그는 열 때문에 집에 있었다.'],
    ]},
  ]},
  { w: 'flat', p: 'adj.', s: [
    { m: '평평한', syn: ['level'], ex: [
      ['The land here is flat.', '이곳의 땅은 평평하다.'],
      ['Put the paper on a flat surface.', '종이를 평평한 곳에 놓아라.'],
      ['My bicycle has a flat tire.', '내 자전거는 타이어에 바람이 빠졌다.'],
    ]},
  ]},
], 'curriculum');
