/**
 * 고등학교 3학년 레벨 2 어휘 33개.
 *
 * 선정 기준: 수능·평가원 모의고사 최빈출 어휘와 고난도 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H3_2 = defineLevel('h3-2', [
  { w: 'explicit', p: 'adj.', s: [
    { m: '명시적인, 분명한', syn: ['clear', 'direct'], ex: [
      ['She gave explicit instructions.', '그녀는 명시적인 지시를 내렸다.'],
      ['The rule is explicit about this.', '그 규칙은 이에 대해 분명하다.'],
      ['He made his position explicit.', '그는 자기 입장을 분명히 밝혔다.'],
    ]},
  ]},
  { w: 'feasible', p: 'adj.', s: [
    { m: '실현 가능한', syn: ['possible', 'workable'], ex: [
      ['Is this plan feasible?', '이 계획이 실현 가능한가?'],
      ['It is not feasible in one week.', '일주일 안에는 실현 불가능하다.'],
      ['They chose the most feasible option.', '그들은 가장 실현 가능한 선택지를 골랐다.'],
    ]},
  ]},
  { w: 'fluctuate', p: 'v.', s: [
    { m: '변동하다, 오르내리다', syn: ['vary', 'go up and down'], ex: [
      ['Prices fluctuate throughout the year.', '가격은 연중 오르내린다.'],
      ['His mood fluctuates a lot.', '그의 기분은 기복이 심하다.'],
      ['Temperatures fluctuated sharply.', '기온이 급격히 변동했다.'],
    ]},
  ]},
  { w: 'imminent', p: 'adj.', s: [
    { m: '임박한', syn: ['approaching', 'near'], ex: [
      ['A storm is imminent.', '폭풍이 임박했다.'],
      ['The company faces imminent collapse.', '그 회사는 임박한 붕괴에 직면해 있다.'],
      ['There was no imminent danger.', '임박한 위험은 없었다.'],
    ]},
  ]},
  { w: 'impair', p: 'v.', s: [
    { m: '손상시키다, 약화시키다', syn: ['damage', 'weaken'], ex: [
      ['Loud music can impair hearing.', '큰 음악은 청력을 손상시킬 수 있다.'],
      ['Lack of sleep impairs judgment.', '수면 부족은 판단력을 떨어뜨린다.'],
      ['The injury impaired his movement.', '그 부상은 그의 움직임을 제약했다.'],
    ]},
  ]},
  { w: 'implicit', p: 'adj.', s: [
    { m: '암묵적인, 내포된', syn: ['unspoken', 'implied'], ex: [
      ['There was an implicit agreement.', '암묵적인 합의가 있었다.'],
      ['His approval was implicit in his smile.', '그의 승인은 미소에 담겨 있었다.'],
      ['Implicit bias is hard to notice.', '암묵적 편견은 알아차리기 어렵다.'],
    ]},
  ]},
  { w: 'incentive', p: 'n.', s: [
    { m: '동기, 유인책', syn: ['motivation', 'reward'], ex: [
      ['Money is not the only incentive.', '돈이 유일한 동기는 아니다.'],
      ['The company offers incentives to workers.', '그 회사는 노동자에게 인센티브를 제공한다.'],
      ['There is little incentive to change.', '변화할 유인이 거의 없다.'],
    ]},
  ]},
  { w: 'indispensable', p: 'adj.', s: [
    { m: '없어서는 안 될, 필수적인', syn: ['essential', 'vital'], ex: [
      ['She is indispensable to the team.', '그녀는 그 팀에 없어서는 안 될 존재이다.'],
      ['Water is indispensable for life.', '물은 생명에 필수적이다.'],
      ['This tool has become indispensable.', '이 도구는 필수품이 되었다.'],
    ]},
  ]},
  { w: 'induce', p: 'v.', s: [
    { m: '유발하다, 유도하다', syn: ['cause', 'bring on'], ex: [
      ['The drug induces sleep.', '그 약은 잠을 유도한다.'],
      ['Nothing could induce him to change.', '어떤 것도 그를 바꾸도록 설득하지 못했다.'],
      ['Stress can induce headaches.', '스트레스는 두통을 유발할 수 있다.'],
    ]},
  ]},
  { w: 'inference', p: 'n.', s: [
    { m: '추론', syn: ['conclusion', 'deduction'], ex: [
      ['That is a reasonable inference.', '그것은 합리적인 추론이다.'],
      ['Draw an inference from the passage.', '그 지문에서 추론을 이끌어 내라.'],
      ['His inference proved wrong.', '그의 추론은 틀린 것으로 드러났다.'],
    ]},
  ]},
  { w: 'ingenious', p: 'adj.', s: [
    { m: '기발한, 독창적인', syn: ['clever', 'inventive'], ex: [
      ['It was an ingenious solution.', '그것은 기발한 해결책이었다.'],
      ['She has an ingenious mind.', '그녀는 독창적인 사고를 지녔다.'],
      ['The device is simple yet ingenious.', '그 장치는 단순하지만 기발하다.'],
    ]},
  ]},
  { w: 'inhibit', p: 'v.', s: [
    { m: '억제하다, 막다', syn: ['prevent', 'hold back'], ex: [
      ['Fear inhibits creativity.', '두려움은 창의성을 억제한다.'],
      ['The drug inhibits the growth of bacteria.', '그 약은 세균의 증식을 억제한다.'],
      ['Shyness inhibited him from speaking.', '수줍음이 그가 말하는 것을 막았다.'],
    ]},
  ]},
  { w: 'intricate', p: 'adj.', s: [
    { m: '복잡한, 정교한', syn: ['complex', 'elaborate'], ex: [
      ['The clock has an intricate design.', '그 시계는 정교한 디자인을 갖고 있다.'],
      ['They studied the intricate relationship.', '그들은 복잡한 관계를 연구했다.'],
      ['She wove an intricate pattern.', '그녀는 정교한 무늬를 짰다.'],
    ]},
  ]},
  { w: 'intrinsic', p: 'adj.', s: [
    { m: '본질적인, 내재적인', syn: ['inherent', 'built-in'], ex: [
      ['Learning has intrinsic value.', '배움은 본질적 가치가 있다.'],
      ['Intrinsic motivation lasts longer.', '내재적 동기가 더 오래간다.'],
      ['Curiosity is intrinsic to science.', '호기심은 과학에 본질적인 것이다.'],
    ]},
  ]},
  { w: 'irrelevant', p: 'adj.', s: [
    { m: '무관한, 관련 없는', syn: ['unrelated', 'beside the point'], ex: [
      ['That fact is irrelevant here.', '그 사실은 여기서 무관하다.'],
      ['He raised an irrelevant issue.', '그는 관련 없는 문제를 꺼냈다.'],
      ['Age is irrelevant to this job.', '나이는 이 일과 관련이 없다.'],
    ]},
  ]},
  { w: 'legacy', p: 'n.', s: [
    { m: '유산', syn: ['heritage', 'inheritance'], ex: [
      ['She left a lasting legacy.', '그녀는 오래 남을 유산을 남겼다.'],
      ['The war left a painful legacy.', '전쟁은 고통스러운 유산을 남겼다.'],
      ['His legacy still shapes the field.', '그의 유산은 여전히 그 분야를 형성한다.'],
    ]},
  ]},
  { w: 'magnitude', p: 'n.', s: [
    { m: '규모, 크기', syn: ['scale', 'size'], ex: [
      ['We underestimated the magnitude of the task.', '우리는 그 일의 규모를 과소평가했다.'],
      ['The earthquake had a magnitude of 6.5.', '그 지진은 규모 6.5였다.'],
      ['The magnitude of the change surprised us.', '변화의 규모가 우리를 놀라게 했다.'],
    ]},
  ]},
  { w: 'mitigate', p: 'v.', s: [
    { m: '완화하다, 줄이다', syn: ['reduce', 'ease'], ex: [
      ['Trees mitigate the heat in cities.', '나무는 도시의 열기를 완화한다.'],
      ['We took steps to mitigate the damage.', '우리는 피해를 줄이기 위한 조치를 취했다.'],
      ['Nothing could mitigate her sorrow.', '어떤 것도 그녀의 슬픔을 덜어 주지 못했다.'],
    ]},
  ]},
  { w: 'notion', p: 'n.', s: [
    { m: '개념, 생각', syn: ['idea', 'concept'], ex: [
      ['He rejected the notion entirely.', '그는 그 생각을 완전히 거부했다.'],
      ['The notion of fairness varies.', '공정함의 개념은 저마다 다르다.'],
      ['She had no notion of the danger.', '그녀는 그 위험을 전혀 몰랐다.'],
    ]},
  ]},
  { w: 'nurture', p: 'v.', s: [
    { m: '양육하다, 기르다', syn: ['raise', 'foster'], ex: [
      ['Parents nurture their children.', '부모는 자녀를 양육한다.'],
      ['We should nurture young talent.', '우리는 젊은 인재를 길러야 한다.'],
      ['She nurtured the idea for years.', '그녀는 그 생각을 여러 해 키워 왔다.'],
    ]},
  ]},
  { w: 'obscure', p: 'adj., v.', s: [
    { m: '잘 알려지지 않은, 모호한', syn: ['unclear', 'little-known'], ex: [
      ['He quoted an obscure poet.', '그는 잘 알려지지 않은 시인을 인용했다.'],
      ['The meaning remains obscure.', '그 의미는 여전히 모호하다.'],
    ]},
    { m: '가리다, 흐리게 하다', syn: ['hide', 'block'], ex: [
      ['Clouds obscured the moon.', '구름이 달을 가렸다.'],
      ['Jargon obscures the real message.', '전문 용어가 진짜 메시지를 가린다.'],
    ]},
  ]},
  { w: 'paradigm', p: 'n.', s: [
    { m: '패러다임, 인식 틀', syn: ['model', 'framework'], ex: [
      ['The discovery caused a paradigm shift.', '그 발견은 패러다임 전환을 가져왔다.'],
      ['We work within an old paradigm.', '우리는 낡은 인식 틀 안에서 일한다.'],
      ['A new paradigm replaced the old one.', '새 패러다임이 옛것을 대체했다.'],
    ]},
  ]},
  { w: 'plausible', p: 'adj.', s: [
    { m: '그럴듯한, 타당해 보이는', syn: ['believable', 'reasonable'], ex: [
      ['That is a plausible explanation.', '그것은 그럴듯한 설명이다.'],
      ['His excuse sounded plausible.', '그의 변명은 그럴듯하게 들렸다.'],
      ['We need a more plausible theory.', '우리는 더 타당한 이론이 필요하다.'],
    ]},
  ]},
  { w: 'preclude', p: 'v.', s: [
    { m: '막다, 불가능하게 하다', syn: ['prevent', 'rule out'], ex: [
      ['The rule precludes any exception.', '그 규칙은 어떤 예외도 배제한다.'],
      ['Bad weather precluded the flight.', '악천후로 비행이 불가능해졌다.'],
      ['This does not preclude further study.', '이것이 추가 연구를 막는 것은 아니다.'],
    ]},
  ]},
  { w: 'predominant', p: 'adj.', s: [
    { m: '지배적인, 두드러진', syn: ['main', 'leading'], ex: [
      ['English is the predominant language here.', '이곳에서는 영어가 지배적인 언어이다.'],
      ['The predominant color is blue.', '주된 색은 파란색이다.'],
      ['That view was predominant at the time.', '그 견해가 당시 지배적이었다.'],
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
  { w: 'proportion', p: 'n.', s: [
    { m: '비율, 부분', syn: ['ratio', 'share'], ex: [
      ['A large proportion of students walk.', '많은 비율의 학생이 걸어 다닌다.'],
      ['The proportion of women rose sharply.', '여성의 비율이 급격히 올랐다.'],
      ['Keep the ingredients in proportion.', '재료를 비율에 맞게 유지해라.'],
    ]},
  ]},
  { w: 'refute', p: 'v.', s: [
    { m: '반박하다, 논박하다', syn: ['disprove', 'rebut'], ex: [
      ['The evidence refutes his claim.', '그 증거는 그의 주장을 반박한다.'],
      ['She refuted every point.', '그녀는 모든 논점을 반박했다.'],
      ['No one could refute the argument.', '아무도 그 논증을 반박할 수 없었다.'],
    ]},
  ]},
  { w: 'render', p: 'v.', s: [
    { m: '~하게 만들다', syn: ['make', 'cause to be'], ex: [
      ['The injury rendered him unable to walk.', '그 부상은 그를 걷지 못하게 만들었다.'],
      ['New rules rendered the old ones useless.', '새 규칙이 옛 규칙을 무용지물로 만들었다.'],
      ['Fear rendered her speechless.', '두려움이 그녀를 말문 막히게 했다.'],
    ]},
  ]},
  { w: 'resilient', p: 'adj.', s: [
    { m: '회복력 있는, 탄력적인', syn: ['tough', 'quick to recover'], ex: [
      ['Children are surprisingly resilient.', '아이들은 놀랍도록 회복력이 강하다.'],
      ['The economy proved resilient.', '경제는 회복력이 있음을 보여 주었다.'],
      ['We need a resilient system.', '우리는 회복력 있는 체계가 필요하다.'],
    ]},
  ]},
  { w: 'scrutiny', p: 'n.', s: [
    { m: '면밀한 조사, 정밀 검토', syn: ['examination', 'inspection'], ex: [
      ['The plan came under close scrutiny.', '그 계획은 면밀한 검토를 받았다.'],
      ['His record did not survive scrutiny.', '그의 기록은 정밀 검토를 견디지 못했다.'],
      ['Public figures face constant scrutiny.', '공인은 끊임없는 감시를 받는다.'],
    ]},
  ]},
], 'csat');
