/**
 * 고등학교 2학년 레벨 1 — 수록 33 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H2_1 = defineLevel('h2-1', [
  { w: 'acquire', p: 'v.', s: [
    { m: '얻다, 습득하다', syn: ['gain', 'obtain'], ex: [
      ['Children acquire language naturally.', '아이들은 언어를 자연스럽게 습득한다.'],
      ['He acquired new skills at work.', '그는 직장에서 새로운 기술을 습득했다.'],
      ['The museum acquired a rare painting.', '그 박물관은 희귀한 그림을 입수했다.'],
    ]},
  ]},
  { w: 'adequate', p: 'adj.', s: [
    { m: '적절한, 충분한', syn: ['sufficient', 'enough'], ex: [
      ['The room has adequate light.', '그 방은 충분한 빛이 든다.'],
      ['His answer was adequate but not impressive.', '그의 대답은 무난했지만 인상적이지는 않았다.'],
      ['We lack adequate funding.', '우리는 충분한 자금이 부족하다.'],
    ]},
  ]},
  { w: 'adhere', p: 'v.', s: [
    { m: '고수하다, 지키다', syn: ['stick to', 'follow'], ex: [
      ['They adhere to strict standards.', '그들은 엄격한 기준을 고수한다.'],
      ['Please adhere to the schedule.', '일정을 지켜 주세요.'],
      ['He adhered to his principles.', '그는 자신의 원칙을 고수했다.'],
    ]},
  ]},
  { w: 'adjust', p: 'v.', s: [
    { m: '조정하다, 맞추다', syn: ['modify', 'set'], ex: [
      ['He adjusted the seat height.', '그는 좌석 높이를 조정했다.'],
      ['Adjust the volume, please.', '음량을 조절해 주세요.'],
    ]},
    { m: '적응하다', syn: ['adapt', 'get used to'], ex: [
      ['It takes time to adjust to a new school.', '새 학교에 적응하는 데는 시간이 걸린다.'],
      ['Your eyes adjust to the dark slowly.', '눈은 어둠에 서서히 적응한다.'],
    ]},
  ]},
  { w: 'adverse', p: 'adj.', s: [
    { m: '부정적인, 불리한', syn: ['harmful', 'unfavorable'], ex: [
      ['The drug had adverse effects.', '그 약은 부작용이 있었다.'],
      ['They worked under adverse conditions.', '그들은 불리한 조건에서 일했다.'],
      ['Adverse weather delayed the flight.', '악천후가 항공편을 지연시켰다.'],
    ]},
  ]},
  { w: 'advocate', p: 'v., n.', s: [
    { m: '옹호하다, 지지하다', syn: ['support', 'promote'], ex: [
      ['She advocates free education.', '그녀는 무상 교육을 옹호한다.'],
      ['Many scientists advocate stronger action.', '많은 과학자가 더 강한 조치를 지지한다.'],
      ['He is an advocate for animal rights.', '그는 동물권 옹호자이다.'],
    ]},
  ]},
  { w: 'aesthetic', p: 'adj.', s: [
    { m: '미적인, 심미적인', syn: ['artistic', 'visual'], ex: [
      ['The design has aesthetic value.', '그 디자인은 미적 가치가 있다.'],
      ['His choice was purely aesthetic.', '그의 선택은 순전히 미적인 것이었다.'],
      ['Aesthetic judgment varies by culture.', '미적 판단은 문화마다 다르다.'],
    ]},
  ]},
  { w: 'affluent', p: 'adj.', s: [
    { m: '부유한', syn: ['wealthy', 'rich'], ex: [
      ['They live in an affluent area.', '그들은 부유한 지역에 산다.'],
      ['Affluent countries consume more energy.', '부유한 나라들이 에너지를 더 소비한다.'],
      ['He grew up in an affluent family.', '그는 부유한 가정에서 자랐다.'],
    ]},
  ]},
  { w: 'aggregate', p: 'v., n.', s: [
    { m: '종합하다; 총합', syn: ['combine', 'total'], ex: [
      ['The site aggregates news from many sources.', '그 사이트는 여러 출처의 뉴스를 모은다.'],
      ['In aggregate, the results are positive.', '전체적으로 보면 결과는 긍정적이다.'],
      ['They aggregated the survey data.', '그들은 설문 자료를 종합했다.'],
    ]},
  ]},
  { w: 'align', p: 'v.', s: [
    { m: '일치시키다, 나란히 하다', syn: ['line up', 'match'], ex: [
      ['Our goals align with yours.', '우리 목표는 당신들의 것과 일치한다.'],
      ['Align the text to the left.', '텍스트를 왼쪽으로 정렬해라.'],
      ['The policy aligns with public opinion.', '그 정책은 여론과 일치한다.'],
    ]},
  ]},
  { w: 'allocate', p: 'v.', s: [
    { m: '할당하다, 배분하다', syn: ['assign', 'distribute'], ex: [
      ['They allocated funds to each school.', '그들은 각 학교에 자금을 배분했다.'],
      ['Allocate more time to reading.', '읽기에 더 많은 시간을 배정해라.'],
      ['Resources were allocated unevenly.', '자원이 고르지 않게 배분되었다.'],
    ]},
  ]},
  { w: 'alternative', p: 'n., adj.', s: [
    { m: '대안; 대체의', syn: ['option', 'substitute'], ex: [
      ['We had no alternative but to wait.', '우리는 기다리는 것 말고는 대안이 없었다.'],
      ['Solar power is an alternative energy source.', '태양광은 대체 에너지원이다.'],
      ['Is there an alternative route?', '다른 경로가 있나요?'],
    ]},
  ]},
  { w: 'ambiguous', p: 'adj.', s: [
    { m: '모호한, 애매한', syn: ['unclear', 'vague'], ex: [
      ['His answer was ambiguous.', '그의 대답은 모호했다.'],
      ['The wording of the rule is ambiguous.', '그 규칙의 표현은 애매하다.'],
      ['Avoid ambiguous sentences in your essay.', '글에서 모호한 문장을 피해라.'],
    ]},
  ]},
  { w: 'ambivalent', p: 'adj.', s: [
    { m: '양가적인, 엇갈리는 감정의', syn: ['mixed', 'uncertain'], ex: [
      ['She felt ambivalent about moving.', '그녀는 이사에 대해 마음이 엇갈렸다.'],
      ['The public is ambivalent about the plan.', '대중은 그 계획에 양가적이다.'],
      ['His ambivalent answer confused us.', '그의 애매한 대답이 우리를 혼란스럽게 했다.'],
    ]},
  ]},
  { w: 'analyze', p: 'v.', s: [
    { m: '분석하다', syn: ['examine', 'study'], ex: [
      ['Scientists analyzed the samples.', '과학자들이 표본을 분석했다.'],
      ['Let us analyze the data together.', '자료를 함께 분석해 보자.'],
      ['She analyzed the poem line by line.', '그녀는 그 시를 한 행씩 분석했다.'],
    ]},
  ]},
  { w: 'ancient', p: 'adj.', s: [
    { m: '고대의, 아주 오래된', syn: ['very old', 'antique'], ex: [
      ['We studied ancient Egypt.', '우리는 고대 이집트를 공부했다.'],
      ['These ancient walls are still standing.', '이 오래된 성벽은 아직 서 있다.'],
      ['Ancient people used stone tools.', '고대 사람들은 석기를 사용했다.'],
    ]},
  ]},
  { w: 'anticipate', p: 'v.', s: [
    { m: '예상하다, 기대하다', syn: ['expect', 'foresee'], ex: [
      ['We anticipate heavy traffic tonight.', '우리는 오늘 밤 극심한 교통 체증을 예상한다.'],
      ['She anticipated the question and prepared.', '그녀는 그 질문을 예상하고 준비했다.'],
      ['Nobody anticipated such a result.', '아무도 그런 결과를 예상하지 못했다.'],
    ]},
  ]},
  { w: 'anxiety', p: 'n.', s: [
    { m: '불안, 걱정', syn: ['worry', 'nervousness'], ex: [
      ['Exams often cause anxiety.', '시험은 종종 불안을 유발한다.'],
      ['She felt anxiety before the interview.', '그녀는 면접 전에 불안을 느꼈다.'],
      ['Deep breathing can reduce anxiety.', '심호흡은 불안을 줄일 수 있다.'],
    ]},
  ]},
  { w: 'apparent', p: 'adj.', s: [
    { m: '분명한, 명백한', syn: ['obvious', 'evident'], ex: [
      ['It became apparent that he lied.', '그가 거짓말했다는 것이 분명해졌다.'],
      ['The reason was apparent to everyone.', '그 이유는 모두에게 분명했다.'],
      ['There was no apparent damage.', '눈에 띄는 손상은 없었다.'],
    ]},
  ]},
  { w: 'apt', p: 'adj.', s: [
    { m: '~하기 쉬운, ~하는 경향이 있는', syn: ['likely', 'inclined'], ex: [
      ['He is apt to forget names.', '그는 이름을 잘 잊는다.'],
      ['Children are apt to imitate adults.', '아이들은 어른을 흉내 내기 쉽다.'],
    ]},
    { m: '적절한', syn: ['fitting', 'suitable'], ex: [
      ['That was an apt comparison.', '그것은 적절한 비유였다.'],
      ['She chose an apt title.', '그녀는 적절한 제목을 골랐다.'],
    ]},
  ]},
  { w: 'arbitrary', p: 'adj.', s: [
    { m: '임의적인, 자의적인', syn: ['random', 'unreasoned'], ex: [
      ['The deadline felt arbitrary.', '그 마감일은 자의적으로 느껴졌다.'],
      ['They made an arbitrary decision.', '그들은 임의적인 결정을 내렸다.'],
      ['The rule seems arbitrary to students.', '그 규칙은 학생들에게 자의적으로 보인다.'],
    ]},
  ]},
  { w: 'articulate', p: 'v., adj.', s: [
    { m: '분명히 표현하다', syn: ['express clearly', 'state'], ex: [
      ['She articulated her concerns well.', '그녀는 우려를 잘 표현했다.'],
      ['He struggled to articulate his feelings.', '그는 감정을 표현하기 어려워했다.'],
      ['An articulate speaker holds attention.', '말을 조리 있게 하는 사람은 주의를 끈다.'],
    ]},
  ]},
  { w: 'ascribe', p: 'v.', s: [
    { m: '~의 탓으로 돌리다', syn: ['attribute', 'credit to'], ex: [
      ['He ascribed his failure to bad luck.', '그는 실패를 불운 탓으로 돌렸다.'],
      ['The poem is ascribed to an unknown writer.', '그 시는 무명 작가의 것으로 여겨진다.'],
      ['She ascribes her health to daily walks.', '그녀는 건강을 매일의 산책 덕분이라고 말한다.'],
    ]},
  ]},
  { w: 'aspect', p: 'n.', s: [
    { m: '측면, 양상', syn: ['side', 'feature'], ex: [
      ['Consider every aspect of the issue.', '그 문제의 모든 측면을 고려해라.'],
      ['The best aspect of the job is the people.', '그 일의 가장 좋은 면은 사람들이다.'],
      ['We studied economic aspects of the war.', '우리는 전쟁의 경제적 측면을 공부했다.'],
    ]},
  ]},
  { w: 'at the expense of', p: 'phr.', s: [
    { m: '~을 희생하여', syn: ['at the cost of'], ex: [
      ['He succeeded at the expense of his health.', '그는 건강을 희생하고 성공했다.'],
      ['Speed came at the expense of accuracy.', '속도는 정확성을 희생한 대가였다.'],
      ['Growth should not come at the expense of nature.', '성장이 자연을 희생해서는 안 된다.'],
    ]},
  ]},
  { w: 'attain', p: 'v.', s: [
    { m: '달성하다, 이르다', syn: ['achieve', 'reach'], ex: [
      ['She attained her goal at last.', '그녀는 마침내 목표를 달성했다.'],
      ['Few runners attain that speed.', '그 속도에 이르는 주자는 드물다.'],
      ['He attained a high position young.', '그는 젊은 나이에 높은 지위에 올랐다.'],
    ]},
  ]},
  { w: 'attribute', p: 'v., n.', s: [
    { m: '~의 탓으로 돌리다', syn: ['credit to', 'ascribe'], ex: [
      ['She attributes her success to luck.', '그녀는 자신의 성공을 운 덕분이라고 말한다.'],
      ['The delay was attributed to bad weather.', '그 지연은 악천후 탓으로 여겨졌다.'],
    ]},
    { m: '속성, 자질', syn: ['quality', 'characteristic'], ex: [
      ['Patience is a valuable attribute.', '인내는 귀중한 자질이다.'],
      ['Each material has its own attributes.', '각 재료는 고유한 속성을 가진다.'],
    ]},
  ]},
  { w: 'authentic', p: 'adj.', s: [
    { m: '진짜의, 진정한', syn: ['genuine', 'real'], ex: [
      ['This is an authentic Korean dish.', '이것은 진짜 한국 요리이다.'],
      ['The painting turned out to be authentic.', '그 그림은 진품으로 밝혀졌다.'],
      ['Readers value authentic voices.', '독자들은 진정성 있는 목소리를 중요하게 여긴다.'],
    ]},
  ]},
  { w: 'barrier', p: 'n.', s: [
    { m: '장벽, 장애물', syn: ['obstacle', 'block'], ex: [
      ['Language can be a barrier.', '언어는 장벽이 될 수 있다.'],
      ['They removed the barrier from the road.', '그들은 도로에서 장애물을 치웠다.'],
      ['Cost is the biggest barrier for students.', '비용은 학생들에게 가장 큰 장벽이다.'],
    ]},
  ]},
  { w: 'be attributed to', p: 'phr.', s: [
    { m: '~의 탓으로 여겨지다', syn: ['be caused by'], ex: [
      ['The growth is attributed to new policy.', '그 성장은 새 정책 덕분으로 여겨진다.'],
      ['The delay was attributed to heavy snow.', '그 지연은 폭설 탓으로 여겨졌다.'],
      ['His success is attributed to persistence.', '그의 성공은 끈기 덕분으로 여겨진다.'],
    ]},
  ]},
  { w: 'be exposed to', p: 'phr.', s: [
    { m: '~에 노출되다', syn: ['come into contact with'], ex: [
      ['Children are exposed to too many ads.', '아이들은 너무 많은 광고에 노출된다.'],
      ['Workers were exposed to loud noise.', '노동자들은 큰 소음에 노출되었다.'],
      ['Being exposed to English daily helps a lot.', '매일 영어에 노출되는 것은 큰 도움이 된다.'],
    ]},
  ]},
  { w: 'bias', p: 'n.', s: [
    { m: '편견, 편향', syn: ['prejudice', 'one-sidedness'], ex: [
      ['The study showed a clear bias.', '그 연구는 뚜렷한 편향을 보였다.'],
      ['We all have unconscious bias.', '우리 모두는 무의식적 편견을 가지고 있다.'],
      ['Try to report without bias.', '편견 없이 보도하려고 해라.'],
    ]},
  ]},
  { w: 'by virtue of', p: 'phr.', s: [
    { m: '~ 덕분에, ~에 의하여', syn: ['because of', 'thanks to'], ex: [
      ['He won by virtue of hard work.', '그는 노력 덕분에 이겼다.'],
      ['She holds the post by virtue of seniority.', '그녀는 연공에 의해 그 자리를 맡고 있다.'],
      ['It survived by virtue of its size.', '그것은 크기 덕분에 살아남았다.'],
    ]},
  ]},
], 'csat');
