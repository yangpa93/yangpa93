/**
 * 고등학교 2학년 레벨 3 어휘 33개.
 *
 * 선정 기준: 고2 모의고사·수능 기출에서 반복되는 어휘와 독해 지문의 핵심 추상 어휘.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H2_3 = defineLevel('h2-3', [
  { w: 'resemble', p: 'v.', s: [
    { m: '닮다, 비슷하다', syn: ['look like', 'be similar to'], ex: [
      ['She resembles her mother.', '그녀는 어머니를 닮았다.'],
      ['This fruit resembles an apple.', '이 과일은 사과와 비슷하다.'],
      ['The copy closely resembles the original.', '그 복제품은 원본과 매우 비슷하다.'],
    ]},
  ]},
  { w: 'retain', p: 'v.', s: [
    { m: '유지하다, 간직하다', syn: ['keep', 'hold on to'], ex: [
      ['We retain what we practice.', '우리는 연습한 것을 기억에 남긴다.'],
      ['The soil retains water well.', '그 흙은 물을 잘 머금는다.'],
      ['She retained her calm throughout.', '그녀는 내내 침착함을 유지했다.'],
    ]},
  ]},
  { w: 'reverse', p: 'v., adj.', s: [
    { m: '뒤집다, 반대로 하다', syn: ['turn around', 'undo'], ex: [
      ['The court reversed the decision.', '법원은 그 결정을 뒤집었다.'],
      ['We cannot reverse what happened.', '우리는 일어난 일을 되돌릴 수 없다.'],
      ['Read the list in reverse order.', '목록을 역순으로 읽어라.'],
    ]},
  ]},
  { w: 'rigid', p: 'adj.', s: [
    { m: '엄격한, 융통성 없는', syn: ['strict', 'inflexible'], ex: [
      ['The school has rigid rules.', '그 학교는 엄격한 규칙이 있다.'],
      ['His thinking is too rigid.', '그의 사고는 너무 경직되어 있다.'],
    ]},
    { m: '딱딱한, 뻣뻣한', syn: ['stiff', 'hard'], ex: [
      ['The frame is made of rigid plastic.', '그 틀은 단단한 플라스틱으로 만들어졌다.'],
      ['His body went rigid with fear.', '그의 몸은 두려움으로 굳어졌다.'],
    ]},
  ]},
  { w: 'sacrifice', p: 'v., n.', s: [
    { m: '희생하다; 희생', syn: ['give up', 'surrender'], ex: [
      ['She sacrificed sleep to study.', '그녀는 공부하려고 잠을 희생했다.'],
      ['Their sacrifice will be remembered.', '그들의 희생은 기억될 것이다.'],
      ['He sacrificed his weekend for the team.', '그는 팀을 위해 주말을 희생했다.'],
    ]},
  ]},
  { w: 'scarce', p: 'adj.', s: [
    { m: '부족한, 드문', syn: ['rare', 'in short supply'], ex: [
      ['Water is scarce in this region.', '이 지역은 물이 부족하다.'],
      ['Jobs were scarce that year.', '그해에는 일자리가 드물었다.'],
      ['Good teachers are scarce here.', '이곳에는 좋은 교사가 드물다.'],
    ]},
  ]},
  { w: 'sequence', p: 'n.', s: [
    { m: '순서, 연속', syn: ['order', 'series'], ex: [
      ['Put the pictures in the right sequence.', '그림을 올바른 순서로 놓아라.'],
      ['The sequence of events is unclear.', '사건의 순서가 분명하지 않다.'],
      ['He described a sequence of steps.', '그는 일련의 단계를 설명했다.'],
    ]},
  ]},
  { w: 'simultaneously', p: 'adv.', s: [
    { m: '동시에', syn: ['at the same time'], ex: [
      ['Both events happened simultaneously.', '두 사건이 동시에 일어났다.'],
      ['She can read and listen simultaneously.', '그녀는 읽기와 듣기를 동시에 할 수 있다.'],
      ['The lights went out simultaneously.', '조명이 동시에 꺼졌다.'],
    ]},
  ]},
  { w: 'stable', p: 'adj.', s: [
    { m: '안정된', syn: ['steady', 'secure'], ex: [
      ['Prices have been stable this year.', '올해 물가는 안정적이었다.'],
      ['He is in stable condition.', '그는 상태가 안정적이다.'],
      ['We need a stable internet connection.', '우리는 안정적인 인터넷 연결이 필요하다.'],
    ]},
  ]},
  { w: 'subsequent', p: 'adj.', s: [
    { m: '그 이후의, 다음의', syn: ['following', 'later'], ex: [
      ['Subsequent tests confirmed the result.', '이후의 검사가 그 결과를 확인해 주었다.'],
      ['In subsequent years, sales grew.', '이후 몇 년간 매출이 늘었다.'],
      ['The subsequent chapter explains why.', '다음 장이 그 이유를 설명한다.'],
    ]},
  ]},
  { w: 'substantial', p: 'adj.', s: [
    { m: '상당한, 실질적인', syn: ['considerable', 'large'], ex: [
      ['They made a substantial profit.', '그들은 상당한 이익을 냈다.'],
      ['There is substantial evidence for it.', '그것에 대한 상당한 증거가 있다.'],
      ['She made substantial progress.', '그녀는 상당한 진전을 이뤘다.'],
    ]},
  ]},
  { w: 'sustain', p: 'v.', s: [
    { m: '지속하다, 유지하다', syn: ['maintain', 'keep up'], ex: [
      ['He could not sustain the pace.', '그는 그 속도를 유지할 수 없었다.'],
      ['The forest sustains many species.', '그 숲은 많은 종을 지탱한다.'],
      ['Can we sustain this growth?', '우리가 이 성장을 지속할 수 있을까?'],
    ]},
  ]},
  { w: 'thrive', p: 'v.', s: [
    { m: '번영하다, 잘 자라다', syn: ['flourish', 'prosper'], ex: [
      ['These plants thrive in sunlight.', '이 식물들은 햇빛에서 잘 자란다.'],
      ['The business thrived for ten years.', '그 사업은 10년간 번창했다.'],
      ['Some children thrive under pressure.', '어떤 아이들은 압박 속에서 더 잘한다.'],
    ]},
  ]},
  { w: 'trigger', p: 'v., n.', s: [
    { m: '촉발하다, 유발하다', syn: ['set off', 'cause'], ex: [
      ['The news triggered a debate.', '그 소식은 논쟁을 촉발했다.'],
      ['Dust can trigger allergies.', '먼지는 알레르기를 유발할 수 있다.'],
      ['What triggered the argument?', '무엇이 그 말다툼을 촉발했니?'],
    ]},
  ]},
  { w: 'undergo', p: 'v.', s: [
    { m: '겪다, 받다', syn: ['go through', 'experience'], ex: [
      ['The city underwent great change.', '그 도시는 큰 변화를 겪었다.'],
      ['He underwent surgery last week.', '그는 지난주에 수술을 받았다.'],
      ['Materials undergo testing before sale.', '재료는 판매 전에 시험을 거친다.'],
    ]},
  ]},
  { w: 'undermine', p: 'v.', s: [
    { m: '약화시키다, 훼손하다', syn: ['weaken', 'damage'], ex: [
      ['Constant criticism undermines confidence.', '끊임없는 비판은 자신감을 약화시킨다.'],
      ['The scandal undermined public trust.', '그 추문은 대중의 신뢰를 훼손했다.'],
      ['Lack of sleep undermines your health.', '수면 부족은 건강을 해친다.'],
    ]},
  ]},
  { w: 'utilize', p: 'v.', s: [
    { m: '활용하다, 이용하다', syn: ['use', 'make use of'], ex: [
      ['We should utilize every resource.', '우리는 모든 자원을 활용해야 한다.'],
      ['The app utilizes your location.', '그 앱은 너의 위치 정보를 이용한다.'],
      ['Farmers utilize modern machines.', '농부들은 현대적 기계를 활용한다.'],
    ]},
  ]},
  { w: 'valid', p: 'adj.', s: [
    { m: '타당한, 유효한', syn: ['sound', 'legitimate'], ex: [
      ['That is a valid point.', '그것은 타당한 지적이다.'],
      ['The ticket is valid for one month.', '그 표는 한 달간 유효하다.'],
      ['His excuse was not valid.', '그의 변명은 타당하지 않았다.'],
    ]},
  ]},
  { w: 'vary', p: 'v.', s: [
    { m: '다르다, 다양하다', syn: ['differ', 'change'], ex: [
      ['Prices vary from shop to shop.', '가격은 가게마다 다르다.'],
      ['Opinions vary widely on this issue.', '이 문제에 대한 의견은 매우 다양하다.'],
      ['The weather varies by season.', '날씨는 계절에 따라 다르다.'],
    ]},
  ]},
  { w: 'vital', p: 'adj.', s: [
    { m: '필수적인, 매우 중요한', syn: ['essential', 'crucial'], ex: [
      ['Sleep is vital for health.', '잠은 건강에 필수적이다.'],
      ['She played a vital role in the team.', '그녀는 팀에서 매우 중요한 역할을 했다.'],
      ['Clean water is vital to survival.', '깨끗한 물은 생존에 필수적이다.'],
    ]},
  ]},
  { w: 'widespread', p: 'adj.', s: [
    { m: '널리 퍼진, 광범위한', syn: ['common', 'extensive'], ex: [
      ['The belief is widespread.', '그 믿음은 널리 퍼져 있다.'],
      ['There was widespread damage after the storm.', '폭풍 후 광범위한 피해가 있었다.'],
      ['Smartphone use is widespread among teens.', '스마트폰 사용은 십 대 사이에 널리 퍼져 있다.'],
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
  { w: 'give rise to', p: 'phr.', s: [
    { m: '~을 일으키다, 낳다', syn: ['cause', 'produce'], ex: [
      ['The policy gave rise to protests.', '그 정책은 시위를 일으켰다.'],
      ['New technology gave rise to new jobs.', '새 기술이 새로운 일자리를 낳았다.'],
      ['His remark gave rise to confusion.', '그의 발언은 혼란을 낳았다.'],
    ]},
  ]},
  { w: 'in the long run', p: 'phr.', s: [
    { m: '장기적으로 보면', syn: ['eventually', 'over time'], ex: [
      ['In the long run, honesty pays.', '장기적으로 보면 정직이 이득이다.'],
      ['This costs more in the long run.', '장기적으로는 이것이 더 비싸다.'],
      ['Exercise helps in the long run.', '운동은 장기적으로 도움이 된다.'],
    ]},
  ]},
  { w: 'take into account', p: 'phr.', s: [
    { m: '고려하다, 참작하다', syn: ['consider', 'allow for'], ex: [
      ['Take the weather into account.', '날씨를 고려해라.'],
      ['We took her age into account.', '우리는 그녀의 나이를 참작했다.'],
      ['You must take costs into account.', '너는 비용을 고려해야 한다.'],
    ]},
  ]},
  { w: 'to some extent', p: 'phr.', s: [
    { m: '어느 정도는', syn: ['partly', 'in part'], ex: [
      ['To some extent, I agree with you.', '어느 정도는 네 말에 동의한다.'],
      ['The rumor is true to some extent.', '그 소문은 어느 정도 사실이다.'],
      ['Success depends on luck to some extent.', '성공은 어느 정도 운에 달려 있다.'],
    ]},
  ]},
  { w: 'abstract', p: 'adj.', s: [
    { m: '추상적인', syn: ['theoretical', 'conceptual'], ex: [
      ['Justice is an abstract idea.', '정의는 추상적인 개념이다.'],
      ['Young children struggle with abstract terms.', '어린아이들은 추상적인 용어를 어려워한다.'],
      ['His painting is completely abstract.', '그의 그림은 완전히 추상적이다.'],
    ]},
  ]},
  { w: 'accommodate', p: 'v.', s: [
    { m: '수용하다, 공간을 제공하다', syn: ['hold', 'house'], ex: [
      ['The hall accommodates 300 people.', '그 홀은 300명을 수용한다.'],
      ['The hotel accommodated us for a night.', '그 호텔은 우리를 하룻밤 재워 주었다.'],
    ]},
    { m: '맞추다, 편의를 봐주다', syn: ['adapt to', 'allow for'], ex: [
      ['We accommodated her schedule.', '우리는 그녀의 일정에 맞춰 주었다.'],
      ['The system accommodates different needs.', '그 체계는 다양한 요구를 수용한다.'],
    ]},
  ]},
  { w: 'component', p: 'n.', s: [
    { m: '구성 요소, 부품', syn: ['part', 'element'], ex: [
      ['Each component must be tested.', '각 부품은 검사되어야 한다.'],
      ['Trust is a key component of teamwork.', '신뢰는 협동의 핵심 요소이다.'],
      ['The engine has many small components.', '그 엔진은 작은 부품이 많다.'],
    ]},
  ]},
  { w: 'implication', p: 'n.', s: [
    { m: '함의, 영향', syn: ['consequence', 'significance'], ex: [
      ['The findings have serious implications.', '그 발견은 심각한 함의를 지닌다.'],
      ['Consider the implications before deciding.', '결정하기 전에 그 영향을 생각해 보아라.'],
      ['He understood the implication of her silence.', '그는 그녀의 침묵이 뜻하는 바를 이해했다.'],
    ]},
  ]},
  { w: 'proceed', p: 'v.', s: [
    { m: '진행하다, 계속하다', syn: ['continue', 'go ahead'], ex: [
      ['Please proceed with your presentation.', '발표를 계속해 주세요.'],
      ['The work proceeded without delay.', '작업은 지체 없이 진행되었다.'],
      ['We proceeded to the next question.', '우리는 다음 질문으로 넘어갔다.'],
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
