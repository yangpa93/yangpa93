/**
 * 고등학교 3학년 레벨 3 — 수록 28 / 계획 136개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H3_3 = defineLevel('h3-3', [
  { w: 'reinforce', p: 'v.', s: [
    { m: '강화하다, 보강하다', syn: ['strengthen', 'support'], ex: [
      ['Repetition reinforces memory.', '반복은 기억을 강화한다.'],
      ['The wall was reinforced with steel.', '그 벽은 강철로 보강되었다.'],
      ['Praise reinforces good behavior.', '칭찬은 바람직한 행동을 강화한다.'],
    ]},
  ]},
  { w: 'reject', p: 'v.', s: [
    { m: '거부하다, 거절하다', syn: ['refuse', 'turn down'], ex: [
      ['They rejected the offer.', '그들은 그 제안을 거절했다.'],
      ['His application was rejected.', '그의 지원서는 거절되었다.'],
      ['She rejected the idea completely.', '그녀는 그 생각을 완전히 거부했다.'],
    ]},
  ]},
  { w: 'relevant', p: 'adj.', s: [
    { m: '관련 있는, 적절한', syn: ['related', 'applicable'], ex: [
      ['Give only relevant examples.', '관련 있는 예만 들어라.'],
      ['That fact is not relevant here.', '그 사실은 여기서 관련이 없다.'],
      ['Please attach all relevant documents.', '관련 서류를 모두 첨부해 주세요.'],
    ]},
  ]},
  { w: 'reluctant', p: 'adj.', s: [
    { m: '꺼리는, 마지못한', syn: ['unwilling', 'hesitant'], ex: [
      ['He was reluctant to speak.', '그는 말하기를 꺼렸다.'],
      ['She gave a reluctant nod.', '그녀는 마지못해 고개를 끄덕였다.'],
      ['They were reluctant to change the plan.', '그들은 계획을 바꾸기를 꺼렸다.'],
    ]},
  ]},
  { w: 'render', p: 'v.', s: [
    { m: '~하게 만들다', syn: ['make', 'cause to be'], ex: [
      ['The injury rendered him unable to walk.', '그 부상은 그를 걷지 못하게 만들었다.'],
      ['New rules rendered the old ones useless.', '새 규칙이 옛 규칙을 무용지물로 만들었다.'],
      ['Fear rendered her speechless.', '두려움이 그녀를 말문 막히게 했다.'],
    ]},
  ]},
  { w: 'resemble', p: 'v.', s: [
    { m: '닮다, 비슷하다', syn: ['look like', 'be similar to'], ex: [
      ['She resembles her mother.', '그녀는 어머니를 닮았다.'],
      ['This fruit resembles an apple.', '이 과일은 사과와 비슷하다.'],
      ['The copy closely resembles the original.', '그 복제품은 원본과 매우 비슷하다.'],
    ]},
  ]},
  { w: 'resilient', p: 'adj.', s: [
    { m: '회복력 있는, 탄력적인', syn: ['tough', 'quick to recover'], ex: [
      ['Children are surprisingly resilient.', '아이들은 놀랍도록 회복력이 강하다.'],
      ['The economy proved resilient.', '경제는 회복력이 있음을 보여 주었다.'],
      ['We need a resilient system.', '우리는 회복력 있는 체계가 필요하다.'],
    ]},
  ]},
  { w: 'restrict', p: 'v.', s: [
    { m: '제한하다', syn: ['limit', 'control'], ex: [
      ['The rule restricts phone use.', '그 규칙은 휴대폰 사용을 제한한다.'],
      ['Access is restricted to members.', '출입은 회원으로 제한된다.'],
      ['They restricted the number of visitors.', '그들은 방문객 수를 제한했다.'],
    ]},
  ]},
  { w: 'retain', p: 'v.', s: [
    { m: '유지하다, 간직하다', syn: ['keep', 'hold on to'], ex: [
      ['We retain what we practice.', '우리는 연습한 것을 기억에 남긴다.'],
      ['The soil retains water well.', '그 흙은 물을 잘 머금는다.'],
      ['She retained her calm throughout.', '그녀는 내내 침착함을 유지했다.'],
    ]},
  ]},
  { w: 'reveal', p: 'v.', s: [
    { m: '드러내다, 밝히다', syn: ['show', 'disclose'], ex: [
      ['The study revealed a surprising fact.', '그 연구는 놀라운 사실을 밝혔다.'],
      ['She refused to reveal her source.', '그녀는 출처 밝히기를 거부했다.'],
      ['The curtain opened to reveal the stage.', '커튼이 열리며 무대가 드러났다.'],
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
  { w: 'scrutiny', p: 'n.', s: [
    { m: '면밀한 조사, 정밀 검토', syn: ['examination', 'inspection'], ex: [
      ['The plan came under close scrutiny.', '그 계획은 면밀한 검토를 받았다.'],
      ['His record did not survive scrutiny.', '그의 기록은 정밀 검토를 견디지 못했다.'],
      ['Public figures face constant scrutiny.', '공인은 끊임없는 감시를 받는다.'],
    ]},
  ]},
  { w: 'sequence', p: 'n.', s: [
    { m: '순서, 연속', syn: ['order', 'series'], ex: [
      ['Put the pictures in the right sequence.', '그림을 올바른 순서로 놓아라.'],
      ['The sequence of events is unclear.', '사건의 순서가 분명하지 않다.'],
      ['He described a sequence of steps.', '그는 일련의 단계를 설명했다.'],
    ]},
  ]},
  { w: 'severe', p: 'adj.', s: [
    { m: '심한, 극심한', syn: ['serious', 'harsh'], ex: [
      ['We had a severe winter.', '우리는 혹독한 겨울을 보냈다.'],
      ['She suffered severe pain.', '그녀는 극심한 통증을 겪었다.'],
      ['The damage was severe.', '피해가 심각했다.'],
    ]},
  ]},
  { w: 'silent', p: 'adj.', s: [
    { m: '조용한, 침묵하는', syn: ['quiet'], ex: [
      ['The class became silent.', '교실이 조용해졌다.'],
      ['He stayed silent for a long time.', '그는 오랫동안 침묵했다.'],
      ['The night was silent and dark.', '밤은 고요하고 어두웠다.'],
    ]},
  ]},
  { w: 'simultaneously', p: 'adv.', s: [
    { m: '동시에', syn: ['at the same time'], ex: [
      ['Both events happened simultaneously.', '두 사건이 동시에 일어났다.'],
      ['She can read and listen simultaneously.', '그녀는 읽기와 듣기를 동시에 할 수 있다.'],
      ['The lights went out simultaneously.', '조명이 동시에 꺼졌다.'],
    ]},
  ]},
  { w: 'skeptical', p: 'adj.', s: [
    { m: '회의적인', syn: ['doubtful', 'unconvinced'], ex: [
      ['Scientists were skeptical at first.', '과학자들은 처음에 회의적이었다.'],
      ['She is skeptical about the claim.', '그녀는 그 주장에 회의적이다.'],
      ['A skeptical mind asks for evidence.', '회의적인 사고는 증거를 요구한다.'],
    ]},
  ]},
  { w: 'stem from', p: 'phr.', s: [
    { m: '~에서 비롯되다', syn: ['come from', 'originate in'], ex: [
      ['The problem stems from poor planning.', '그 문제는 미흡한 계획에서 비롯된다.'],
      ['Her fear stems from a childhood event.', '그녀의 두려움은 어린 시절 사건에서 비롯된다.'],
      ['Most conflicts stem from misunderstanding.', '대부분의 갈등은 오해에서 비롯된다.'],
    ]},
  ]},
  { w: 'stimulate', p: 'v.', s: [
    { m: '자극하다, 촉진하다', syn: ['encourage', 'spur'], ex: [
      ['Reading stimulates the imagination.', '독서는 상상력을 자극한다.'],
      ['The policy stimulated the economy.', '그 정책은 경제를 활성화했다.'],
      ['Good questions stimulate discussion.', '좋은 질문은 토론을 촉진한다.'],
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
], 'csat');
