/**
 * 고등학교 3학년 레벨 2 — 수록 29 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H3_2 = defineLevel('h3-2', [
  { w: 'obstacle', p: 'n.', s: [
    { m: '장애물, 방해물', syn: ['barrier', 'hurdle'], ex: [
      ['Fear is the biggest obstacle.', '두려움이 가장 큰 장애물이다.'],
      ['They overcame many obstacles.', '그들은 많은 장애물을 극복했다.'],
      ['An obstacle blocked the road.', '장애물이 도로를 막았다.'],
    ]},
  ]},
  { w: 'obtain', p: 'v.', s: [
    { m: '얻다, 획득하다', syn: ['get', 'acquire'], ex: [
      ['She obtained a scholarship.', '그녀는 장학금을 받았다.'],
      ['You must obtain permission first.', '먼저 허가를 받아야 한다.'],
      ['The data were obtained from a survey.', '그 자료는 설문 조사에서 얻었다.'],
    ]},
  ]},
  { w: 'on the contrary', p: 'phr.', s: [
    { m: '그와는 반대로', syn: ['in contrast', 'rather'], ex: [
      ['He is not lazy; on the contrary, he works hard.', '그는 게으르지 않다. 오히려 열심히 일한다.'],
      ['On the contrary, sales went up.', '그와는 반대로 매출이 올랐다.'],
      ['I did not dislike it; on the contrary, I loved it.', '나는 그것을 싫어하지 않았다. 오히려 아주 좋아했다.'],
    ]},
  ]},
  { w: 'optimistic', p: 'adj.', s: [
    { m: '낙관적인', syn: ['hopeful', 'positive'], ex: [
      ['She is optimistic about the future.', '그녀는 미래에 대해 낙관적이다.'],
      ['We remain optimistic despite the loss.', '패배에도 우리는 낙관적이다.'],
      ['His optimistic view encouraged us.', '그의 낙관적인 시각이 우리를 북돋았다.'],
    ]},
  ]},
  { w: 'overcome', p: 'v.', s: [
    { m: '극복하다, 이겨 내다', syn: ['get over', 'conquer'], ex: [
      ['She overcame her fear of water.', '그녀는 물에 대한 두려움을 극복했다.'],
      ['They overcame many difficulties.', '그들은 많은 어려움을 이겨 냈다.'],
      ['Hard work can overcome bad luck.', '노력은 불운을 이겨 낼 수 있다.'],
    ]},
  ]},
  { w: 'paradigm', p: 'n.', s: [
    { m: '패러다임, 인식 틀', syn: ['model', 'framework'], ex: [
      ['The discovery caused a paradigm shift.', '그 발견은 패러다임 전환을 가져왔다.'],
      ['We work within an old paradigm.', '우리는 낡은 인식 틀 안에서 일한다.'],
      ['A new paradigm replaced the old one.', '새 패러다임이 옛것을 대체했다.'],
    ]},
  ]},
  { w: 'participate', p: 'v.', s: [
    { m: '참여하다', syn: ['take part', 'join in'], ex: [
      ['All students participated actively.', '모든 학생이 적극적으로 참여했다.'],
      ['She participated in the debate.', '그녀는 그 토론에 참여했다.'],
      ['Everyone is welcome to participate.', '누구나 참여할 수 있다.'],
    ]},
  ]},
  { w: 'perceive', p: 'v.', s: [
    { m: '인식하다, 지각하다', syn: ['notice', 'see'], ex: [
      ['People perceive colors differently.', '사람들은 색을 다르게 인식한다.'],
      ['He perceived a change in her voice.', '그는 그녀의 목소리 변화를 알아챘다.'],
      ['Risk is often perceived as larger than it is.', '위험은 종종 실제보다 크게 인식된다.'],
    ]},
  ]},
  { w: 'permit', p: 'v.', s: [
    { m: '허락하다, 허용하다', syn: ['allow', 'let'], ex: [
      ['Smoking is not permitted here.', '이곳에서는 흡연이 허용되지 않는다.'],
      ['The rules do not permit exceptions.', '규칙은 예외를 허용하지 않는다.'],
      ['Weather permitting, we will go hiking.', '날씨가 허락하면 우리는 등산을 갈 것이다.'],
    ]},
  ]},
  { w: 'perpetuate', p: 'v.', s: [
    { m: '영속시키다, 지속시키다', syn: ['maintain', 'keep alive'], ex: [
      ['Such images perpetuate stereotypes.', '그런 이미지는 고정 관념을 영속시킨다.'],
      ['The system perpetuates inequality.', '그 체계는 불평등을 지속시킨다.'],
      ['We should not perpetuate the myth.', '우리는 그 통념을 계속 이어 가서는 안 된다.'],
    ]},
  ]},
  { w: 'persist', p: 'v.', s: [
    { m: '계속되다, 지속하다', syn: ['continue', 'keep on'], ex: [
      ['The problem persists despite repairs.', '수리에도 그 문제는 계속된다.'],
      ['She persisted until she succeeded.', '그녀는 성공할 때까지 계속했다.'],
      ['The rain persisted all week.', '비가 일주일 내내 계속되었다.'],
    ]},
  ]},
  { w: 'perspective', p: 'n.', s: [
    { m: '관점, 시각', syn: ['viewpoint', 'point of view'], ex: [
      ['Try to see it from her perspective.', '그것을 그녀의 관점에서 보려고 해라.'],
      ['Travel gives you a new perspective.', '여행은 새로운 시각을 준다.'],
      ['From a historical perspective, this is normal.', '역사적 관점에서 이것은 정상이다.'],
    ]},
  ]},
  { w: 'phenomenon', p: 'n.', s: [
    { m: '현상', syn: ['occurrence', 'event'], ex: [
      ['This is a common phenomenon.', '이것은 흔한 현상이다.'],
      ['Scientists cannot explain the phenomenon.', '과학자들은 그 현상을 설명하지 못한다.'],
      ['Social media is a global phenomenon.', '소셜 미디어는 세계적인 현상이다.'],
    ]},
  ]},
  { w: 'plausible', p: 'adj.', s: [
    { m: '그럴듯한, 타당해 보이는', syn: ['believable', 'reasonable'], ex: [
      ['That is a plausible explanation.', '그것은 그럴듯한 설명이다.'],
      ['His excuse sounded plausible.', '그의 변명은 그럴듯하게 들렸다.'],
      ['We need a more plausible theory.', '우리는 더 타당한 이론이 필요하다.'],
    ]},
  ]},
  { w: 'precise', p: 'adj.', s: [
    { m: '정확한, 정밀한', syn: ['exact', 'accurate'], ex: [
      ['Give me the precise figure.', '정확한 수치를 알려 줘.'],
      ['The instrument makes precise measurements.', '그 기구는 정밀한 측정을 한다.'],
      ['To be precise, it took 42 minutes.', '정확히 말하면 42분 걸렸다.'],
    ]},
  ]},
  { w: 'preclude', p: 'v.', s: [
    { m: '막다, 불가능하게 하다', syn: ['prevent', 'rule out'], ex: [
      ['The rule precludes any exception.', '그 규칙은 어떤 예외도 배제한다.'],
      ['Bad weather precluded the flight.', '악천후로 비행이 불가능해졌다.'],
      ['This does not preclude further study.', '이것이 추가 연구를 막는 것은 아니다.'],
    ]},
  ]},
  { w: 'predict', p: 'v.', s: [
    { m: '예측하다', syn: ['forecast', 'foretell'], ex: [
      ['No one can predict the future.', '아무도 미래를 예측할 수 없다.'],
      ['Experts predict a cold winter.', '전문가들은 추운 겨울을 예측한다.'],
      ['The model predicted the result well.', '그 모형은 결과를 잘 예측했다.'],
    ]},
  ]},
  { w: 'predominant', p: 'adj.', s: [
    { m: '지배적인, 두드러진', syn: ['main', 'leading'], ex: [
      ['English is the predominant language here.', '이곳에서는 영어가 지배적인 언어이다.'],
      ['The predominant color is blue.', '주된 색은 파란색이다.'],
      ['That view was predominant at the time.', '그 견해가 당시 지배적이었다.'],
    ]},
  ]},
  { w: 'preserve', p: 'v.', s: [
    { m: '보존하다, 지키다', syn: ['protect', 'conserve'], ex: [
      ['We must preserve our forests.', '우리는 숲을 보존해야 한다.'],
      ['Salt was used to preserve food.', '소금은 음식을 보존하는 데 쓰였다.'],
      ['They preserved the old temple.', '그들은 그 오래된 사찰을 보존했다.'],
    ]},
  ]},
  { w: 'presume', p: 'v.', s: [
    { m: '추정하다, 가정하다', syn: ['assume', 'suppose'], ex: [
      ['I presume you have read the book.', '나는 네가 그 책을 읽었다고 추정한다.'],
      ['The missing hiker is presumed safe.', '실종된 등산객은 무사한 것으로 추정된다.'],
      ['We should not presume guilt.', '우리는 유죄를 추정해서는 안 된다.'],
    ]},
  ]},
  { w: 'prevail', p: 'v.', s: [
    { m: '만연하다, 우세하다', syn: ['dominate', 'be widespread'], ex: [
      ['That custom still prevails in the region.', '그 관습은 그 지역에서 여전히 만연하다.'],
      ['Common sense finally prevailed.', '결국 상식이 이겼다.'],
      ['Silence prevailed in the room.', '방 안에는 침묵이 감돌았다.'],
    ]},
  ]},
  { w: 'profound', p: 'adj.', s: [
    { m: '깊은, 심오한', syn: ['deep', 'far-reaching'], ex: [
      ['The book had a profound effect on me.', '그 책은 나에게 깊은 영향을 주었다.'],
      ['She showed profound understanding.', '그녀는 깊은 이해를 보여 주었다.'],
      ['The change was profound and lasting.', '그 변화는 깊고 오래갔다.'],
    ]},
  ]},
  { w: 'prohibit', p: 'v.', s: [
    { m: '금지하다', syn: ['ban', 'forbid'], ex: [
      ['Smoking is prohibited in the building.', '건물 내 흡연은 금지되어 있다.'],
      ['The law prohibits such advertising.', '법은 그런 광고를 금지한다.'],
      ['Parents prohibited late-night gaming.', '부모님은 밤늦은 게임을 금지하셨다.'],
    ]},
  ]},
  { w: 'prominent', p: 'adj.', s: [
    { m: '두드러진, 저명한', syn: ['notable', 'well-known'], ex: [
      ['She is a prominent scientist.', '그녀는 저명한 과학자이다.'],
      ['The tower is a prominent landmark.', '그 탑은 눈에 띄는 랜드마크이다.'],
      ['He played a prominent role in the project.', '그는 그 프로젝트에서 두드러진 역할을 했다.'],
    ]},
  ]},
  { w: 'proportion', p: 'n.', s: [
    { m: '비율, 부분', syn: ['ratio', 'share'], ex: [
      ['A large proportion of students walk.', '많은 비율의 학생이 걸어 다닌다.'],
      ['The proportion of women rose sharply.', '여성의 비율이 급격히 올랐다.'],
      ['Keep the ingredients in proportion.', '재료를 비율에 맞게 유지해라.'],
    ]},
  ]},
  { w: 'pursue', p: 'v.', s: [
    { m: '추구하다', syn: ['seek', 'go after'], ex: [
      ['She decided to pursue medicine.', '그녀는 의학을 공부하기로 했다.'],
      ['He pursued his dream for ten years.', '그는 10년 동안 꿈을 좇았다.'],
    ]},
    { m: '뒤쫓다', syn: ['chase', 'follow'], ex: [
      ['The police pursued the car.', '경찰이 그 차를 뒤쫓았다.'],
      ['The dog pursued the rabbit.', '개가 토끼를 쫓았다.'],
    ]},
  ]},
  { w: 'quantity', p: 'n.', s: [
    { m: '양, 수량', syn: ['amount', 'number'], ex: [
      ['A small quantity of salt is enough.', '적은 양의 소금이면 충분하다.'],
      ['Quality matters more than quantity.', '양보다 질이 중요하다.'],
      ['They bought a large quantity of paper.', '그들은 많은 양의 종이를 샀다.'],
    ]},
  ]},
  { w: 'refute', p: 'v.', s: [
    { m: '반박하다, 논박하다', syn: ['disprove', 'rebut'], ex: [
      ['The evidence refutes his claim.', '그 증거는 그의 주장을 반박한다.'],
      ['She refuted every point.', '그녀는 모든 논점을 반박했다.'],
      ['No one could refute the argument.', '아무도 그 논증을 반박할 수 없었다.'],
    ]},
  ]},
  { w: 'regardless of', p: 'phr.', s: [
    { m: '~과 관계없이', syn: ['no matter', 'in spite of'], ex: [
      ['Everyone is welcome regardless of age.', '나이와 관계없이 누구나 환영이다.'],
      ['We will go regardless of the weather.', '날씨와 상관없이 우리는 갈 것이다.'],
      ['She spoke up regardless of the risk.', '그녀는 위험과 관계없이 목소리를 냈다.'],
    ]},
  ]},
], 'csat');
