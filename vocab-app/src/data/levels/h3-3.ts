/**
 * 고등학교 3학년 레벨 3 어휘 33개.
 *
 * 선정 기준: 수능·평가원 모의고사 최빈출 어휘와 고난도 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H3_3 = defineLevel('h3-3', [
  { w: 'skeptical', p: 'adj.', s: [
    { m: '회의적인', syn: ['doubtful', 'unconvinced'], ex: [
      ['Scientists were skeptical at first.', '과학자들은 처음에 회의적이었다.'],
      ['She is skeptical about the claim.', '그녀는 그 주장에 회의적이다.'],
      ['A skeptical mind asks for evidence.', '회의적인 사고는 증거를 요구한다.'],
    ]},
  ]},
  { w: 'stimulate', p: 'v.', s: [
    { m: '자극하다, 촉진하다', syn: ['encourage', 'spur'], ex: [
      ['Reading stimulates the imagination.', '독서는 상상력을 자극한다.'],
      ['The policy stimulated the economy.', '그 정책은 경제를 활성화했다.'],
      ['Good questions stimulate discussion.', '좋은 질문은 토론을 촉진한다.'],
    ]},
  ]},
  { w: 'subtle', p: 'adj.', s: [
    { m: '미묘한, 감지하기 어려운', syn: ['slight', 'delicate'], ex: [
      ['There is a subtle difference between them.', '그 둘 사이에는 미묘한 차이가 있다.'],
      ['She gave a subtle hint.', '그녀는 미묘한 힌트를 주었다.'],
      ['The change was subtle but real.', '그 변화는 미묘했지만 실재했다.'],
    ]},
  ]},
  { w: 'superficial', p: 'adj.', s: [
    { m: '피상적인, 표면적인', syn: ['shallow', 'surface-level'], ex: [
      ['His knowledge is superficial.', '그의 지식은 피상적이다.'],
      ['The damage was only superficial.', '손상은 표면적인 것에 불과했다.'],
      ['Avoid superficial reading.', '피상적인 읽기를 피해라.'],
    ]},
  ]},
  { w: 'supplement', p: 'v., n.', s: [
    { m: '보충하다; 보충물', syn: ['add to', 'complement'], ex: [
      ['He supplements his income by tutoring.', '그는 과외로 수입을 보충한다.'],
      ['Take vitamin supplements if needed.', '필요하면 비타민 보충제를 먹어라.'],
      ['The class supplements the textbook.', '그 수업은 교과서를 보충한다.'],
    ]},
  ]},
  { w: 'suppress', p: 'v.', s: [
    { m: '억누르다, 진압하다', syn: ['hold back', 'put down'], ex: [
      ['She suppressed a laugh.', '그녀는 웃음을 참았다.'],
      ['The government suppressed the report.', '정부가 그 보고서를 덮었다.'],
      ['He could not suppress his anger.', '그는 분노를 억누를 수 없었다.'],
    ]},
  ]},
  { w: 'susceptible', p: 'adj.', s: [
    { m: '~에 취약한, 영향받기 쉬운', syn: ['vulnerable', 'prone'], ex: [
      ['Young children are susceptible to colds.', '어린아이들은 감기에 걸리기 쉽다.'],
      ['The crop is susceptible to disease.', '그 작물은 병에 취약하다.'],
      ['We are all susceptible to advertising.', '우리는 모두 광고에 영향받기 쉽다.'],
    ]},
  ]},
  { w: 'tangible', p: 'adj.', s: [
    { m: '실재하는, 만질 수 있는', syn: ['concrete', 'real'], ex: [
      ['We need tangible results.', '우리는 실질적인 결과가 필요하다.'],
      ['There was no tangible proof.', '만져 볼 수 있는 증거는 없었다.'],
      ['The benefits are tangible and immediate.', '그 이익은 실재하며 즉각적이다.'],
    ]},
  ]},
  { w: 'transcend', p: 'v.', s: [
    { m: '초월하다, 뛰어넘다', syn: ['go beyond', 'rise above'], ex: [
      ['Music transcends language.', '음악은 언어를 초월한다.'],
      ['Her work transcends its genre.', '그녀의 작품은 그 장르를 뛰어넘는다.'],
      ['Great art transcends time.', '위대한 예술은 시대를 초월한다.'],
    ]},
  ]},
  { w: 'underlying', p: 'adj.', s: [
    { m: '근본적인, 기저에 있는', syn: ['basic', 'fundamental'], ex: [
      ['We must find the underlying cause.', '우리는 근본 원인을 찾아야 한다.'],
      ['There is an underlying assumption here.', '여기에는 기저에 깔린 가정이 있다.'],
      ['The underlying problem was money.', '근본적인 문제는 돈이었다.'],
    ]},
  ]},
  { w: 'unprecedented', p: 'adj.', s: [
    { m: '전례 없는', syn: ['unheard-of', 'record-breaking'], ex: [
      ['The heat was unprecedented.', '그 더위는 전례가 없었다.'],
      ['We face unprecedented challenges.', '우리는 전례 없는 도전에 직면해 있다.'],
      ['The film had unprecedented success.', '그 영화는 전례 없는 성공을 거뒀다.'],
    ]},
  ]},
  { w: 'validate', p: 'v.', s: [
    { m: '입증하다, 승인하다', syn: ['confirm', 'verify'], ex: [
      ['The experiment validated the theory.', '그 실험은 이론을 입증했다.'],
      ['We need to validate the data first.', '우리는 먼저 자료를 검증해야 한다.'],
      ['Her success validated years of work.', '그녀의 성공은 수년간의 노력을 입증했다.'],
    ]},
  ]},
  { w: 'versatile', p: 'adj.', s: [
    { m: '다재다능한, 다용도의', syn: ['adaptable', 'all-around'], ex: [
      ['He is a versatile athlete.', '그는 다재다능한 운동선수이다.'],
      ['This tool is highly versatile.', '이 도구는 매우 다용도이다.'],
      ['Eggs are a versatile ingredient.', '달걀은 활용도가 높은 재료이다.'],
    ]},
  ]},
  { w: 'viable', p: 'adj.', s: [
    { m: '실행 가능한, 생존 가능한', syn: ['workable', 'feasible'], ex: [
      ['That is not a viable option.', '그것은 실행 가능한 선택지가 아니다.'],
      ['We need a viable long-term plan.', '우리는 실행 가능한 장기 계획이 필요하다.'],
      ['The business is no longer viable.', '그 사업은 더 이상 존속 가능하지 않다.'],
    ]},
  ]},
  { w: 'vulnerable', p: 'adj.', s: [
    { m: '취약한, 상처받기 쉬운', syn: ['weak', 'exposed'], ex: [
      ['Elderly people are vulnerable to heat.', '노인들은 더위에 취약하다.'],
      ['The system is vulnerable to attack.', '그 시스템은 공격에 취약하다.'],
      ['She felt vulnerable in the new place.', '그녀는 낯선 곳에서 불안함을 느꼈다.'],
    ]},
  ]},
  { w: 'at the expense of', p: 'phr.', s: [
    { m: '~을 희생하여', syn: ['at the cost of'], ex: [
      ['He succeeded at the expense of his health.', '그는 건강을 희생하고 성공했다.'],
      ['Speed came at the expense of accuracy.', '속도는 정확성을 희생한 대가였다.'],
      ['Growth should not come at the expense of nature.', '성장이 자연을 희생해서는 안 된다.'],
    ]},
  ]},
  { w: 'by virtue of', p: 'phr.', s: [
    { m: '~ 덕분에, ~에 의하여', syn: ['because of', 'thanks to'], ex: [
      ['He won by virtue of hard work.', '그는 노력 덕분에 이겼다.'],
      ['She holds the post by virtue of seniority.', '그녀는 연공에 의해 그 자리를 맡고 있다.'],
      ['It survived by virtue of its size.', '그것은 크기 덕분에 살아남았다.'],
    ]},
  ]},
  { w: 'in light of', p: 'phr.', s: [
    { m: '~을 고려하여', syn: ['considering', 'given'], ex: [
      ['In light of the evidence, we changed our view.', '증거를 고려하여 우리는 견해를 바꿨다.'],
      ['The plan was revised in light of new data.', '새 자료를 고려해 계획이 수정되었다.'],
      ['In light of his age, we were lenient.', '그의 나이를 고려해 우리는 관대했다.'],
    ]},
  ]},
  { w: 'on the contrary', p: 'phr.', s: [
    { m: '그와는 반대로', syn: ['in contrast', 'rather'], ex: [
      ['He is not lazy; on the contrary, he works hard.', '그는 게으르지 않다. 오히려 열심히 일한다.'],
      ['On the contrary, sales went up.', '그와는 반대로 매출이 올랐다.'],
      ['I did not dislike it; on the contrary, I loved it.', '나는 그것을 싫어하지 않았다. 오히려 아주 좋아했다.'],
    ]},
  ]},
  { w: 'stem from', p: 'phr.', s: [
    { m: '~에서 비롯되다', syn: ['come from', 'originate in'], ex: [
      ['The problem stems from poor planning.', '그 문제는 미흡한 계획에서 비롯된다.'],
      ['Her fear stems from a childhood event.', '그녀의 두려움은 어린 시절 사건에서 비롯된다.'],
      ['Most conflicts stem from misunderstanding.', '대부분의 갈등은 오해에서 비롯된다.'],
    ]},
  ]},
  { w: 'with regard to', p: 'phr.', s: [
    { m: '~에 관하여', syn: ['concerning', 'about'], ex: [
      ['With regard to your question, I agree.', '당신 질문에 관해서는 동의합니다.'],
      ['Nothing changed with regard to the rules.', '규칙에 관해서는 아무것도 바뀌지 않았다.'],
      ['He wrote with regard to the new policy.', '그는 새 정책에 관해 편지를 썼다.'],
    ]},
  ]},
  { w: 'accountable', p: 'adj.', s: [
    { m: '책임이 있는', syn: ['responsible', 'answerable'], ex: [
      ['Leaders must be accountable to the public.', '지도자는 대중에게 책임을 져야 한다.'],
      ['He was held accountable for the loss.', '그는 그 손실에 대한 책임을 졌다.'],
      ['We are accountable for our choices.', '우리는 우리의 선택에 책임이 있다.'],
    ]},
  ]},
  { w: 'adhere', p: 'v.', s: [
    { m: '고수하다, 지키다', syn: ['stick to', 'follow'], ex: [
      ['They adhere to strict standards.', '그들은 엄격한 기준을 고수한다.'],
      ['Please adhere to the schedule.', '일정을 지켜 주세요.'],
      ['He adhered to his principles.', '그는 자신의 원칙을 고수했다.'],
    ]},
  ]},
  { w: 'arbitrary', p: 'adj.', s: [
    { m: '임의적인, 자의적인', syn: ['random', 'unreasoned'], ex: [
      ['The deadline felt arbitrary.', '그 마감일은 자의적으로 느껴졌다.'],
      ['They made an arbitrary decision.', '그들은 임의적인 결정을 내렸다.'],
      ['The rule seems arbitrary to students.', '그 규칙은 학생들에게 자의적으로 보인다.'],
    ]},
  ]},
  { w: 'ascribe', p: 'v.', s: [
    { m: '~의 탓으로 돌리다', syn: ['attribute', 'credit to'], ex: [
      ['He ascribed his failure to bad luck.', '그는 실패를 불운 탓으로 돌렸다.'],
      ['The poem is ascribed to an unknown writer.', '그 시는 무명 작가의 것으로 여겨진다.'],
      ['She ascribes her health to daily walks.', '그녀는 건강을 매일의 산책 덕분이라고 말한다.'],
    ]},
  ]},
  { w: 'compile', p: 'v.', s: [
    { m: '편집하다, 모아 정리하다', syn: ['gather', 'assemble'], ex: [
      ['They compiled a list of sources.', '그들은 출처 목록을 정리했다.'],
      ['She compiled the data over two years.', '그녀는 2년에 걸쳐 자료를 모았다.'],
      ['The team compiled a detailed report.', '그 팀은 상세한 보고서를 작성했다.'],
    ]},
  ]},
  { w: 'depict', p: 'v.', s: [
    { m: '묘사하다, 그리다', syn: ['portray', 'describe'], ex: [
      ['The novel depicts rural life.', '그 소설은 농촌 생활을 그린다.'],
      ['The painting depicts a winter scene.', '그 그림은 겨울 풍경을 묘사한다.'],
      ['Media often depict teens unfairly.', '언론은 종종 십 대를 부당하게 묘사한다.'],
    ]},
  ]},
  { w: 'endeavor', p: 'n., v.', s: [
    { m: '노력; 노력하다', syn: ['effort', 'strive'], ex: [
      ['Her endeavor finally paid off.', '그녀의 노력이 마침내 결실을 맺었다.'],
      ['We endeavor to improve every year.', '우리는 매년 나아지려고 노력한다.'],
      ['It was a worthwhile endeavor.', '그것은 가치 있는 노력이었다.'],
    ]},
  ]},
  { w: 'evoke', p: 'v.', s: [
    { m: '불러일으키다, 환기하다', syn: ['bring out', 'call up'], ex: [
      ['The song evokes childhood memories.', '그 노래는 어린 시절 기억을 불러일으킨다.'],
      ['His speech evoked strong emotion.', '그의 연설은 강한 감정을 불러일으켰다.'],
      ['The smell evoked her grandmother’s kitchen.', '그 냄새는 할머니의 부엌을 떠올리게 했다.'],
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
  { w: 'incline', p: 'v.', s: [
    { m: '~하는 경향이 있다, 마음이 기울다', syn: ['tend', 'lean'], ex: [
      ['I am inclined to agree with her.', '나는 그녀 의견에 기우는 편이다.'],
      ['People are inclined to trust experts.', '사람들은 전문가를 믿는 경향이 있다.'],
      ['He was inclined to stay home.', '그는 집에 있고 싶어 했다.'],
    ]},
  ]},
  { w: 'perpetuate', p: 'v.', s: [
    { m: '영속시키다, 지속시키다', syn: ['maintain', 'keep alive'], ex: [
      ['Such images perpetuate stereotypes.', '그런 이미지는 고정 관념을 영속시킨다.'],
      ['The system perpetuates inequality.', '그 체계는 불평등을 지속시킨다.'],
      ['We should not perpetuate the myth.', '우리는 그 통념을 계속 이어 가서는 안 된다.'],
    ]},
  ]},
  { w: 'in accordance with', p: 'phr.', s: [
    { m: '~에 따라, ~에 부합하여', syn: ['according to', 'in line with'], ex: [
      ['We acted in accordance with the rules.', '우리는 규칙에 따라 행동했다.'],
      ['The building was designed in accordance with the law.', '그 건물은 법에 맞게 설계되었다.'],
      ['Payment is made in accordance with the contract.', '지급은 계약에 따라 이루어진다.'],
    ]},
  ]},
], 'csat');
