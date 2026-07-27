/**
 * 고등학교 2학년 레벨 4 — 수록 29 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H2_4 = defineLevel('h2-4', [
  { w: 'fluctuate', p: 'v.', s: [
    { m: '변동하다, 오르내리다', syn: ['vary', 'go up and down'], ex: [
      ['Prices fluctuate throughout the year.', '가격은 연중 오르내린다.'],
      ['His mood fluctuates a lot.', '그의 기분은 기복이 심하다.'],
      ['Temperatures fluctuated sharply.', '기온이 급격히 변동했다.'],
    ]},
  ]},
  { w: 'foster', p: 'v.', s: [
    { m: '조성하다, 기르다', syn: ['encourage', 'nurture'], ex: [
      ['Schools should foster creativity.', '학교는 창의성을 길러야 한다.'],
      ['The program fosters teamwork.', '그 프로그램은 협동심을 기른다.'],
      ['They fostered a sense of belonging.', '그들은 소속감을 길러 주었다.'],
    ]},
  ]},
  { w: 'framework', p: 'n.', s: [
    { m: '틀, 체계', syn: ['structure', 'system'], ex: [
      ['We need a legal framework.', '우리는 법적 틀이 필요하다.'],
      ['The theory provides a useful framework.', '그 이론은 유용한 틀을 제공한다.'],
      ['This framework guides our research.', '이 체계가 우리 연구를 이끈다.'],
    ]},
  ]},
  { w: 'fundamental', p: 'adj.', s: [
    { m: '근본적인, 기본적인', syn: ['basic', 'essential'], ex: [
      ['This is a fundamental rule.', '이것은 근본적인 규칙이다.'],
      ['There is a fundamental difference between them.', '그 둘 사이에는 근본적인 차이가 있다.'],
      ['Reading is a fundamental skill.', '읽기는 기본적인 기술이다.'],
    ]},
  ]},
  { w: 'generate', p: 'v.', s: [
    { m: '만들어 내다, 발생시키다', syn: ['produce', 'create'], ex: [
      ['Wind turbines generate power.', '풍력 발전기는 전기를 만들어 낸다.'],
      ['The film generated a lot of interest.', '그 영화는 많은 관심을 불러일으켰다.'],
      ['Solar panels generate clean energy.', '태양광 패널은 청정 에너지를 만든다.'],
    ]},
  ]},
  { w: 'give rise to', p: 'phr.', s: [
    { m: '~을 일으키다, 낳다', syn: ['cause', 'produce'], ex: [
      ['The policy gave rise to protests.', '그 정책은 시위를 일으켰다.'],
      ['New technology gave rise to new jobs.', '새 기술이 새로운 일자리를 낳았다.'],
      ['His remark gave rise to confusion.', '그의 발언은 혼란을 낳았다.'],
    ]},
  ]},
  { w: 'grasp', p: 'v.', s: [
    { m: '이해하다, 파악하다', syn: ['understand', 'comprehend'], ex: [
      ['He quickly grasped the concept.', '그는 그 개념을 빠르게 이해했다.'],
      ['It took me time to grasp the idea.', '나는 그 생각을 이해하는 데 시간이 걸렸다.'],
    ]},
    { m: '움켜쥐다', syn: ['grip', 'seize'], ex: [
      ['She grasped the rope tightly.', '그녀는 밧줄을 꽉 움켜쥐었다.'],
      ['He grasped my hand and smiled.', '그는 내 손을 잡고 미소 지었다.'],
    ]},
  ]},
  { w: 'grateful', p: 'adj.', s: [
    { m: '감사하는, 고마워하는', syn: ['thankful', 'appreciative'], ex: [
      ['I am grateful for your help.', '당신의 도움에 감사드립니다.'],
      ['She felt grateful to her teacher.', '그녀는 선생님께 고마움을 느꼈다.'],
      ['We should be grateful for small things.', '우리는 작은 것에도 감사해야 한다.'],
    ]},
  ]},
  { w: 'hypothesis', p: 'n.', s: [
    { m: '가설', syn: ['theory', 'assumption'], ex: [
      ['The hypothesis was tested twice.', '그 가설은 두 번 검증되었다.'],
      ['Scientists formed a new hypothesis.', '과학자들이 새로운 가설을 세웠다.'],
      ['The data did not support the hypothesis.', '자료는 그 가설을 뒷받침하지 않았다.'],
    ]},
  ]},
  { w: 'imminent', p: 'adj.', s: [
    { m: '임박한', syn: ['approaching', 'near'], ex: [
      ['A storm is imminent.', '폭풍이 임박했다.'],
      ['The company faces imminent collapse.', '그 회사는 임박한 붕괴에 직면해 있다.'],
      ['There was no imminent danger.', '임박한 위험은 없었다.'],
    ]},
  ]},
  { w: 'impact', p: 'n.', s: [
    { m: '영향, 충격', syn: ['effect', 'influence'], ex: [
      ['The news had a big impact.', '그 소식은 큰 영향을 미쳤다.'],
      ['Plastic has a serious impact on the ocean.', '플라스틱은 바다에 심각한 영향을 준다.'],
      ['Her speech made a strong impact on us.', '그녀의 연설은 우리에게 강한 인상을 주었다.'],
    ]},
  ]},
  { w: 'impair', p: 'v.', s: [
    { m: '손상시키다, 약화시키다', syn: ['damage', 'weaken'], ex: [
      ['Loud music can impair hearing.', '큰 음악은 청력을 손상시킬 수 있다.'],
      ['Lack of sleep impairs judgment.', '수면 부족은 판단력을 떨어뜨린다.'],
      ['The injury impaired his movement.', '그 부상은 그의 움직임을 제약했다.'],
    ]},
  ]},
  { w: 'implement', p: 'v.', s: [
    { m: '시행하다, 실행하다', syn: ['carry out', 'put into practice'], ex: [
      ['The city implemented a new policy.', '시는 새 정책을 시행했다.'],
      ['We will implement the plan next month.', '우리는 다음 달에 그 계획을 실행할 것이다.'],
      ['The rules were implemented immediately.', '그 규칙은 즉시 시행되었다.'],
    ]},
  ]},
  { w: 'implication', p: 'n.', s: [
    { m: '함의, 영향', syn: ['consequence', 'significance'], ex: [
      ['The findings have serious implications.', '그 발견은 심각한 함의를 지닌다.'],
      ['Consider the implications before deciding.', '결정하기 전에 그 영향을 생각해 보아라.'],
      ['He understood the implication of her silence.', '그는 그녀의 침묵이 뜻하는 바를 이해했다.'],
    ]},
  ]},
  { w: 'implicit', p: 'adj.', s: [
    { m: '암묵적인, 내포된', syn: ['unspoken', 'implied'], ex: [
      ['There was an implicit agreement.', '암묵적인 합의가 있었다.'],
      ['His approval was implicit in his smile.', '그의 승인은 미소에 담겨 있었다.'],
      ['Implicit bias is hard to notice.', '암묵적 편견은 알아차리기 어렵다.'],
    ]},
  ]},
  { w: 'imply', p: 'v.', s: [
    { m: '암시하다, 함축하다', syn: ['suggest', 'hint'], ex: [
      ['His silence implied disagreement.', '그의 침묵은 반대를 암시했다.'],
      ['What does this sentence imply?', '이 문장은 무엇을 암시하니?'],
      ['She implied that she might leave.', '그녀는 떠날지도 모른다고 암시했다.'],
    ]},
  ]},
  { w: 'impose', p: 'v.', s: [
    { m: '부과하다, 강요하다', syn: ['force', 'place on'], ex: [
      ['The city imposed a new tax.', '시는 새 세금을 부과했다.'],
      ['Do not impose your views on others.', '네 견해를 남에게 강요하지 마라.'],
      ['Strict limits were imposed on visitors.', '방문객에게 엄격한 제한이 부과되었다.'],
    ]},
  ]},
  { w: 'in accordance with', p: 'phr.', s: [
    { m: '~에 따라, ~에 부합하여', syn: ['according to', 'in line with'], ex: [
      ['We acted in accordance with the rules.', '우리는 규칙에 따라 행동했다.'],
      ['The building was designed in accordance with the law.', '그 건물은 법에 맞게 설계되었다.'],
      ['Payment is made in accordance with the contract.', '지급은 계약에 따라 이루어진다.'],
    ]},
  ]},
  { w: 'in light of', p: 'phr.', s: [
    { m: '~을 고려하여', syn: ['considering', 'given'], ex: [
      ['In light of the evidence, we changed our view.', '증거를 고려하여 우리는 견해를 바꿨다.'],
      ['The plan was revised in light of new data.', '새 자료를 고려해 계획이 수정되었다.'],
      ['In light of his age, we were lenient.', '그의 나이를 고려해 우리는 관대했다.'],
    ]},
  ]},
  { w: 'in the long run', p: 'phr.', s: [
    { m: '장기적으로 보면', syn: ['eventually', 'over time'], ex: [
      ['In the long run, honesty pays.', '장기적으로 보면 정직이 이득이다.'],
      ['This costs more in the long run.', '장기적으로는 이것이 더 비싸다.'],
      ['Exercise helps in the long run.', '운동은 장기적으로 도움이 된다.'],
    ]},
  ]},
  { w: 'incentive', p: 'n.', s: [
    { m: '동기, 유인책', syn: ['motivation', 'reward'], ex: [
      ['Money is not the only incentive.', '돈이 유일한 동기는 아니다.'],
      ['The company offers incentives to workers.', '그 회사는 노동자에게 인센티브를 제공한다.'],
      ['There is little incentive to change.', '변화할 유인이 거의 없다.'],
    ]},
  ]},
  { w: 'incline', p: 'v.', s: [
    { m: '~하는 경향이 있다, 마음이 기울다', syn: ['tend', 'lean'], ex: [
      ['I am inclined to agree with her.', '나는 그녀 의견에 기우는 편이다.'],
      ['People are inclined to trust experts.', '사람들은 전문가를 믿는 경향이 있다.'],
      ['He was inclined to stay home.', '그는 집에 있고 싶어 했다.'],
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
  { w: 'inherent', p: 'adj.', s: [
    { m: '내재하는, 본질적인', syn: ['built-in', 'natural'], ex: [
      ['There are inherent risks in the sport.', '그 스포츠에는 내재된 위험이 있다.'],
      ['Curiosity is inherent in children.', '호기심은 아이들에게 본래 있는 것이다.'],
      ['The problem is inherent in the design.', '그 문제는 설계 자체에 내재해 있다.'],
    ]},
  ]},
  { w: 'inhibit', p: 'v.', s: [
    { m: '억제하다, 막다', syn: ['prevent', 'hold back'], ex: [
      ['Fear inhibits creativity.', '두려움은 창의성을 억제한다.'],
      ['The drug inhibits the growth of bacteria.', '그 약은 세균의 증식을 억제한다.'],
      ['Shyness inhibited him from speaking.', '수줍음이 그가 말하는 것을 막았다.'],
    ]},
  ]},
  { w: 'initiate', p: 'v.', s: [
    { m: '시작하다, 착수하다', syn: ['begin', 'launch'], ex: [
      ['They initiated a new program.', '그들은 새 프로그램을 시작했다.'],
      ['She initiated the conversation.', '그녀가 대화를 먼저 시작했다.'],
      ['The government initiated reforms.', '정부가 개혁에 착수했다.'],
    ]},
  ]},
], 'csat');
