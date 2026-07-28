/**
 * 고등학교 2학년 레벨 1 — 수록 137 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H2_1 = defineLevel('h2-1', [
  { w: 'ache', p: 'n.', s: [
    { m: '아픔, 통증', syn: ['pain'], ex: [
      ['I have an ache in my back.', '등에 통증이 있다.'],
      ['The ache went away slowly.', '통증이 천천히 가셨다.'],
      ['A dull ache kept him awake.', '둔한 통증이 그를 깨어 있게 했다.'],
    ]},
  ]},
  { w: 'acid', p: 'n.', s: [
    { m: '산', syn: ['corrosive'], ex: [
      ['Acid can burn your skin.', '산은 피부를 태울 수 있다.'],
      ['Lemon juice contains acid.', '레몬즙에는 산이 들어 있다.'],
      ['The acid ate through the metal.', '산이 금속을 삭혔다.'],
    ]},
  ]},
  { w: 'acknowledge', p: 'v.', s: [
    { m: '인정하다', syn: ['admit'], ex: [
      ['He acknowledged his error.', '그는 자기 잘못을 인정했다.'],
      ['She acknowledged the gift with thanks.', '그녀는 감사히 선물을 받았다고 알렸다.'],
      ['They acknowledge the problem now.', '그들은 이제 그 문제를 인정한다.'],
    ]},
  ]},
  { w: 'acquire', p: 'v.', s: [
    { m: '얻다, 습득하다', syn: ['gain', 'obtain'], ex: [
      ['Children acquire language naturally.', '아이들은 언어를 자연스럽게 습득한다.'],
      ['He acquired new skills at work.', '그는 직장에서 새로운 기술을 습득했다.'],
      ['The museum acquired a rare painting.', '그 박물관은 희귀한 그림을 입수했다.'],
    ]},
  ]},
  { w: 'acquisition', p: 'n.', s: [
    { m: '습득, 획득', syn: ['gaining'], ex: [
      ['Language acquisition begins early.', '언어 습득은 일찍 시작된다.'],
      ['The acquisition took two years.', '그 인수는 2년이 걸렸다.'],
      ['Knowledge acquisition needs practice.', '지식 습득에는 연습이 필요하다.'],
    ]},
  ]},
  { w: 'addict', p: 'n.', s: [
    { m: '중독자', syn: ['habitual user'], ex: [
      ['He became a game addict.', '그는 게임 중독자가 되었다.'],
      ['An addict needs real help.', '중독자는 실질적인 도움이 필요하다.'],
      ['She is a coffee addict.', '그녀는 커피 중독자다.'],
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
  { w: 'administer', p: 'v.', s: [
    { m: '관리하다, 집행하다', syn: ['manage'], ex: [
      ['She administers the whole program.', '그녀가 그 프로그램 전체를 관리한다.'],
      ['The nurse administered the medicine.', '간호사가 약을 투여했다.'],
      ['They administer the school fund.', '그들은 학교 기금을 관리한다.'],
    ]},
  ]},
  { w: 'adolescent', p: 'n.', s: [
    { m: '청소년', syn: ['teenager'], ex: [
      ['Adolescents need enough sleep.', '청소년은 충분한 잠이 필요하다.'],
      ['An adolescent changes quickly.', '청소년은 빠르게 변한다.'],
      ['She works with adolescents.', '그녀는 청소년들과 함께 일한다.'],
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
  { w: 'agency', p: 'n.', s: [
    { m: '기관, 대행사', syn: ['bureau'], ex: [
      ['She works at a travel agency.', '그녀는 여행사에서 일한다.'],
      ['The agency helps new workers.', '그 기관은 신입 근로자를 돕는다.'],
      ['A news agency reported it.', '한 통신사가 그것을 보도했다.'],
    ]},
  ]},
  { w: 'agenda', p: 'n.', s: [
    { m: '안건, 의제', syn: ['program'], ex: [
      ['What is on the agenda today?', '오늘 안건이 무엇인가요?'],
      ['The agenda has three items.', '의제는 세 가지다.'],
      ['She set the agenda for the meeting.', '그녀가 회의 안건을 정했다.'],
    ]},
  ]},
  { w: 'aggregate', p: 'v., n.', s: [
    { m: '종합하다; 총합', syn: ['combine', 'total'], ex: [
      ['The site aggregates news from many sources.', '그 사이트는 여러 출처의 뉴스를 모은다.'],
      ['In aggregate, the results are positive.', '전체적으로 보면 결과는 긍정적이다.'],
      ['They aggregated the survey data.', '그들은 설문 자료를 종합했다.'],
    ]},
  ]},
  { w: 'aggress', p: 'v.', s: [
    { m: '공격하다, 시비를 걸다', syn: ['attack'], ex: [
      ['Do not aggress against others.', '남에게 시비를 걸지 마라.'],
      ['The dog aggressed at strangers.', '그 개는 낯선 사람에게 달려들었다.'],
      ['He never aggresses first.', '그는 결코 먼저 공격하지 않는다.'],
    ]},
  ]},
  { w: 'agriculture', p: 'n.', s: [
    { m: '농업', syn: ['farming'], ex: [
      ['Agriculture feeds the world.', '농업이 세계를 먹여 살린다.'],
      ['This region depends on agriculture.', '이 지역은 농업에 의존한다.'],
      ['Agriculture changed with machines.', '농업은 기계로 달라졌다.'],
    ]},
  ]},
  { w: 'alert', p: 'adj.', s: [
    { m: '경계하는, 기민한', syn: ['watchful'], ex: [
      ['Stay alert while driving.', '운전 중에는 경계해라.'],
      ['The guard was alert all night.', '경비원은 밤새 기민했다.'],
      ['An alert student noticed it.', '한 기민한 학생이 그것을 알아챘다.'],
    ]},
  ]},
  { w: 'alien', p: 'n.', s: [
    { m: '외계인, 외국인', syn: ['foreigner'], ex: [
      ['The film is about an alien.', '그 영화는 외계인에 관한 것이다.'],
      ['An alien needs a visa.', '외국인은 비자가 필요하다.'],
      ['The idea felt alien to me.', '그 생각은 나에게 낯설었다.'],
    ]},
  ]},
  { w: 'align', p: 'v.', s: [
    { m: '일치시키다, 나란히 하다', syn: ['line up', 'match'], ex: [
      ['Our goals align with yours.', '우리 목표는 당신들의 것과 일치한다.'],
      ['Align the text to the left.', '텍스트를 왼쪽으로 정렬해라.'],
      ['The policy aligns with public opinion.', '그 정책은 여론과 일치한다.'],
    ]},
  ]},
  { w: 'alike', p: 'adj.', s: [
    { m: '비슷한, 같은', syn: ['similar'], ex: [
      ['The twins look alike.', '쌍둥이는 서로 닮았다.'],
      ['They dress alike.', '그들은 비슷하게 입는다.'],
      ['Young and old alike enjoyed it.', '젊은이나 노인이나 다 즐겼다.'],
    ]},
  ]},
  { w: 'allocate', p: 'v.', s: [
    { m: '할당하다, 배분하다', syn: ['assign', 'distribute'], ex: [
      ['They allocated funds to each school.', '그들은 각 학교에 자금을 배분했다.'],
      ['Allocate more time to reading.', '읽기에 더 많은 시간을 배정해라.'],
      ['Resources were allocated unevenly.', '자원이 고르지 않게 배분되었다.'],
    ]},
  ]},
  { w: 'ally', p: 'n.', s: [
    { m: '동맹, 협력자', syn: ['partner'], ex: [
      ['She is my closest ally.', '그녀는 내 가장 가까운 협력자다.'],
      ['The two nations became allies.', '두 나라는 동맹이 되었다.'],
      ['An ally helps in hard times.', '협력자는 힘든 때에 돕는다.'],
    ]},
  ]},
  { w: 'alongside', p: 'prep.', s: [
    { m: '~ 옆에, ~와 함께', syn: ['beside'], ex: [
      ['She walked alongside me.', '그녀는 내 옆에서 걸었다.'],
      ['The boat stopped alongside the dock.', '배가 부두 옆에 멈췄다.'],
      ['He works alongside his father.', '그는 아버지와 함께 일한다.'],
    ]},
  ]},
  { w: 'alternate', p: 'v.', s: [
    { m: '번갈아 하다', syn: ['take turns'], ex: [
      ['We alternate cooking duties.', '우리는 요리를 번갈아 한다.'],
      ['Rain and sun alternated all day.', '비와 해가 하루 종일 번갈아 들었다.'],
      ['They alternate every week.', '그들은 매주 교대한다.'],
    ]},
  ]},
  { w: 'alternative', p: 'n., adj.', s: [
    { m: '대안; 대체의', syn: ['option', 'substitute'], ex: [
      ['We had no alternative but to wait.', '우리는 기다리는 것 말고는 대안이 없었다.'],
      ['Solar power is an alternative energy source.', '태양광은 대체 에너지원이다.'],
      ['Is there an alternative route?', '다른 경로가 있나요?'],
    ]},
  ]},
  { w: 'ambassador', p: 'n.', s: [
    { m: '대사', syn: ['envoy'], ex: [
      ['The ambassador visited the school.', '대사가 학교를 방문했다.'],
      ['She became an ambassador.', '그녀는 대사가 되었다.'],
      ['An ambassador speaks for a country.', '대사는 나라를 대변한다.'],
    ]},
  ]},
  { w: 'ambiguous', p: 'adj.', s: [
    { m: '모호한, 애매한', syn: ['unclear', 'vague'], ex: [
      ['His answer was ambiguous.', '그의 대답은 모호했다.'],
      ['The wording of the rule is ambiguous.', '그 규칙의 표현은 애매하다.'],
      ['Avoid ambiguous sentences in your essay.', '글에서 모호한 문장을 피해라.'],
    ]},
  ]},
  { w: 'ambition', p: 'n.', s: [
    { m: '야망, 포부', syn: ['aspiration'], ex: [
      ['Her ambition is to be a doctor.', '그녀의 포부는 의사가 되는 것이다.'],
      ['Ambition drove him forward.', '야망이 그를 앞으로 이끌었다.'],
      ['He has no ambition at all.', '그는 야망이 전혀 없다.'],
    ]},
  ]},
  { w: 'ambivalent', p: 'adj.', s: [
    { m: '양가적인, 엇갈리는 감정의', syn: ['mixed', 'uncertain'], ex: [
      ['She felt ambivalent about moving.', '그녀는 이사에 대해 마음이 엇갈렸다.'],
      ['The public is ambivalent about the plan.', '대중은 그 계획에 양가적이다.'],
      ['His ambivalent answer confused us.', '그의 애매한 대답이 우리를 혼란스럽게 했다.'],
    ]},
  ]},
  { w: 'analyse', p: 'v.', s: [
    { m: '분석하다 (영국식)', syn: ['analyze'], ex: [
      ['Analyse the data carefully.', '자료를 꼼꼼히 분석해라.'],
      ['She analysed the result.', '그녀는 결과를 분석했다.'],
      ['We analyse errors every week.', '우리는 매주 오류를 분석한다.'],
    ]},
  ]},
  { w: 'analyze', p: 'v.', s: [
    { m: '분석하다', syn: ['examine', 'study'], ex: [
      ['Scientists analyzed the samples.', '과학자들이 표본을 분석했다.'],
      ['Let us analyze the data together.', '자료를 함께 분석해 보자.'],
      ['She analyzed the poem line by line.', '그녀는 그 시를 한 행씩 분석했다.'],
    ]},
  ]},
  { w: 'anchor', p: 'n.', s: [
    { m: '닻', syn: ['mooring'], ex: [
      ['The ship dropped anchor.', '배가 닻을 내렸다.'],
      ['The anchor is very heavy.', '그 닻은 아주 무겁다.'],
      ['Family is my anchor.', '가족이 나의 버팀목이다.'],
    ]},
  ]},
  { w: 'ancient', p: 'adj.', s: [
    { m: '고대의, 아주 오래된', syn: ['very old', 'antique'], ex: [
      ['We studied ancient Egypt.', '우리는 고대 이집트를 공부했다.'],
      ['These ancient walls are still standing.', '이 오래된 성벽은 아직 서 있다.'],
      ['Ancient people used stone tools.', '고대 사람들은 석기를 사용했다.'],
    ]},
  ]},
  { w: 'angle', p: 'n.', s: [
    { m: '각, 각도', syn: ['corner'], ex: [
      ['Measure the angle first.', '먼저 각도를 재라.'],
      ['Look at it from another angle.', '다른 각도에서 봐라.'],
      ['A right angle is ninety degrees.', '직각은 90도다.'],
    ]},
  ]},
  { w: 'anniversary', p: 'n.', s: [
    { m: '기념일', syn: ['commemoration'], ex: [
      ['Today is our anniversary.', '오늘은 우리 기념일이다.'],
      ['They celebrated the tenth anniversary.', '그들은 10주년을 기념했다.'],
      ['The anniversary falls on Sunday.', '그 기념일은 일요일이다.'],
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
  { w: 'apology', p: 'n.', s: [
    { m: '사과', syn: ['regret'], ex: [
      ['She offered a sincere apology.', '그녀는 진심으로 사과했다.'],
      ['His apology came too late.', '그의 사과는 너무 늦었다.'],
      ['An apology costs nothing.', '사과는 아무것도 들지 않는다.'],
    ]},
  ]},
  { w: 'apparent', p: 'adj.', s: [
    { m: '분명한, 명백한', syn: ['obvious', 'evident'], ex: [
      ['It became apparent that he lied.', '그가 거짓말했다는 것이 분명해졌다.'],
      ['The reason was apparent to everyone.', '그 이유는 모두에게 분명했다.'],
      ['There was no apparent damage.', '눈에 띄는 손상은 없었다.'],
    ]},
  ]},
  { w: 'approve', p: 'v.', s: [
    { m: '승인하다, 찬성하다', syn: ['accept'], ex: [
      ['The teacher approved our plan.', '선생님이 우리 계획을 승인했다.'],
      ['She does not approve of smoking.', '그녀는 흡연에 찬성하지 않는다.'],
      ['They approved the budget.', '그들은 예산을 승인했다.'],
    ]},
  ]},
  { w: 'approximate', p: 'adj.', s: [
    { m: '대략의', syn: ['rough'], ex: [
      ['Give an approximate number.', '대략적인 숫자를 말해 줘.'],
      ['The approximate cost is fifty.', '대략적인 비용은 50이다.'],
      ['These are approximate figures.', '이것은 대략적인 수치다.'],
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
  { w: 'architect', p: 'n.', s: [
    { m: '건축가', syn: ['designer'], ex: [
      ['The architect drew the plan.', '건축가가 설계도를 그렸다.'],
      ['She wants to be an architect.', '그녀는 건축가가 되고 싶어 한다.'],
      ['A famous architect designed it.', '유명한 건축가가 그것을 설계했다.'],
    ]},
  ]},
  { w: 'arise', p: 'v.', s: [
    { m: '생기다, 일어나다', syn: ['occur'], ex: [
      ['Problems arise every day.', '문제는 매일 생긴다.'],
      ['A question arose in class.', '수업에서 의문이 하나 생겼다.'],
      ['New chances are arising.', '새 기회가 생기고 있다.'],
    ]},
  ]},
  { w: 'arrow', p: 'n.', s: [
    { m: '화살, 화살표', syn: ['dart'], ex: [
      ['Follow the arrow on the sign.', '표지판의 화살표를 따라가라.'],
      ['He shot an arrow at the target.', '그는 표적에 화살을 쐈다.'],
      ['The arrow points left.', '화살표는 왼쪽을 가리킨다.'],
    ]},
  ]},
  { w: 'articulate', p: 'v., adj.', s: [
    { m: '분명히 표현하다', syn: ['express clearly', 'state'], ex: [
      ['She articulated her concerns well.', '그녀는 우려를 잘 표현했다.'],
      ['He struggled to articulate his feelings.', '그는 감정을 표현하기 어려워했다.'],
      ['An articulate speaker holds attention.', '말을 조리 있게 하는 사람은 주의를 끈다.'],
    ]},
  ]},
  { w: 'artifice', p: 'n.', s: [
    { m: '기교, 술책', syn: ['trickery'], ex: [
      ['The painting shows great artifice.', '그 그림은 뛰어난 기교를 보여 준다.'],
      ['He won by artifice, not skill.', '그는 실력이 아니라 술책으로 이겼다.'],
      ['Artifice cannot replace honesty.', '술책은 정직을 대신할 수 없다.'],
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
  { w: 'aspire', p: 'v.', s: [
    { m: '열망하다, 갈망하다', syn: ['long for'], ex: [
      ['She aspires to be a writer.', '그녀는 작가가 되기를 열망한다.'],
      ['Young people aspire to great things.', '젊은이들은 큰일을 갈망한다.'],
      ['He aspired to lead the team.', '그는 팀을 이끌기를 열망했다.'],
    ]},
  ]},
  { w: 'assault', p: 'n.', s: [
    { m: '폭행, 공격', syn: ['attack'], ex: [
      ['The assault happened at night.', '그 폭행은 밤에 일어났다.'],
      ['They planned an assault on the wall.', '그들은 성벽 공격을 계획했다.'],
      ['An assault is a serious crime.', '폭행은 중대한 범죄다.'],
    ]},
  ]},
  { w: 'assemble', p: 'v.', s: [
    { m: '모으다, 조립하다', syn: ['gather'], ex: [
      ['Students assembled in the hall.', '학생들이 강당에 모였다.'],
      ['He assembled the desk himself.', '그는 직접 책상을 조립했다.'],
      ['We are assembling the parts.', '우리는 부품을 조립하고 있다.'],
    ]},
  ]},
  { w: 'assert', p: 'v.', s: [
    { m: '주장하다', syn: ['declare'], ex: [
      ['She asserted her opinion clearly.', '그녀는 자기 의견을 분명히 주장했다.'],
      ['He asserts that he is innocent.', '그는 자기가 무죄라고 주장한다.'],
      ['They asserted their rights.', '그들은 자기 권리를 주장했다.'],
    ]},
  ]},
  { w: 'asset', p: 'n.', s: [
    { m: '자산, 재산', syn: ['resource'], ex: [
      ['Health is your greatest asset.', '건강이 가장 큰 자산이다.'],
      ['The company sold its assets.', '그 회사는 자산을 팔았다.'],
      ['She is an asset to our team.', '그녀는 우리 팀의 자산이다.'],
    ]},
  ]},
  { w: 'assure', p: 'v.', s: [
    { m: '확신시키다, 보장하다', syn: ['guarantee'], ex: [
      ['I assure you it is safe.', '안전하다고 장담합니다.'],
      ['She assured us of her help.', '그녀는 도와주겠다고 확언했다.'],
      ['He assured me it would work.', '그는 그것이 될 거라고 확신시켰다.'],
    ]},
  ]},
  { w: 'astonish', p: 'v.', s: [
    { m: '깜짝 놀라게 하다', syn: ['amaze'], ex: [
      ['Her skill astonished us.', '그녀의 솜씨가 우리를 깜짝 놀라게 했다.'],
      ['The result astonished everyone.', '그 결과가 모두를 놀라게 했다.'],
      ['It astonishes me every time.', '그것은 매번 나를 놀라게 한다.'],
    ]},
  ]},
  { w: 'at the expense of', p: 'phr.', s: [
    { m: '~을 희생하여', syn: ['at the cost of'], ex: [
      ['He succeeded at the expense of his health.', '그는 건강을 희생하고 성공했다.'],
      ['Speed came at the expense of accuracy.', '속도는 정확성을 희생한 대가였다.'],
      ['Growth should not come at the expense of nature.', '성장이 자연을 희생해서는 안 된다.'],
    ]},
  ]},
  { w: 'athlete', p: 'n.', s: [
    { m: '운동선수', syn: ['sportsperson'], ex: [
      ['She is a famous athlete.', '그녀는 유명한 운동선수다.'],
      ['Athletes train every day.', '운동선수는 매일 훈련한다.'],
      ['The athlete broke a record.', '그 선수는 기록을 깼다.'],
    ]},
  ]},
  { w: 'atom', p: 'n.', s: [
    { m: '원자', syn: ['particle'], ex: [
      ['Everything is made of atoms.', '모든 것은 원자로 이루어져 있다.'],
      ['An atom is very small.', '원자는 아주 작다.'],
      ['Two atoms joined together.', '두 원자가 결합했다.'],
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
  { w: 'auction', p: 'n.', s: [
    { m: '경매', syn: ['sale'], ex: [
      ['The painting sold at auction.', '그 그림은 경매로 팔렸다.'],
      ['An auction begins at noon.', '경매는 정오에 시작한다.'],
      ['She bought it at an auction.', '그녀는 경매에서 그것을 샀다.'],
    ]},
  ]},
  { w: 'authentic', p: 'adj.', s: [
    { m: '진짜의, 진정한', syn: ['genuine', 'real'], ex: [
      ['This is an authentic Korean dish.', '이것은 진짜 한국 요리이다.'],
      ['The painting turned out to be authentic.', '그 그림은 진품으로 밝혀졌다.'],
      ['Readers value authentic voices.', '독자들은 진정성 있는 목소리를 중요하게 여긴다.'],
    ]},
  ]},
  { w: 'author', p: 'n.', s: [
    { m: '작가, 저자', syn: ['writer'], ex: [
      ['The author wrote ten books.', '그 작가는 책 열 권을 썼다.'],
      ['Who is the author of this?', '이것의 저자는 누구니?'],
      ['She became a famous author.', '그녀는 유명한 작가가 되었다.'],
    ]},
  ]},
  { w: 'avail', p: 'v.', s: [
    { m: '도움이 되다, 이용하다', syn: ['help'], ex: [
      ['His effort did not avail.', '그의 노력은 소용이 없었다.'],
      ['Avail yourself of the chance.', '그 기회를 이용해라.'],
      ['Nothing availed against the storm.', '폭풍 앞에서는 아무것도 소용없었다.'],
    ]},
  ]},
  { w: 'await', p: 'v.', s: [
    { m: '기다리다', syn: ['wait for'], ex: [
      ['We await your answer.', '우리는 당신의 답을 기다립니다.'],
      ['A surprise awaits her.', '뜻밖의 일이 그녀를 기다리고 있다.'],
      ['They awaited the result quietly.', '그들은 조용히 결과를 기다렸다.'],
    ]},
  ]},
  { w: 'awe', p: 'n.', s: [
    { m: '경외, 경탄', syn: ['wonder'], ex: [
      ['We stood in awe of the view.', '우리는 그 경치에 경탄하며 섰다.'],
      ['The child looked with awe.', '아이는 경외의 눈으로 보았다.'],
      ['Awe filled the whole room.', '경외감이 방 전체를 채웠다.'],
    ]},
  ]},
  { w: 'ban', p: 'v.', s: [
    { m: '금지하다', syn: ['forbid'], ex: [
      ['The school banned phones.', '학교가 휴대폰을 금지했다.'],
      ['They banned smoking here.', '그들은 여기서 흡연을 금지했다.'],
      ['The book was banned long ago.', '그 책은 오래전에 금지되었다.'],
    ]},
  ]},
  { w: 'bankrupt', p: 'adj.', s: [
    { m: '파산한', syn: ['insolvent'], ex: [
      ['The company went bankrupt.', '그 회사는 파산했다.'],
      ['He was bankrupt after the fire.', '그는 화재 뒤 파산했다.'],
      ['A bankrupt shop closed here.', '파산한 가게가 여기서 문을 닫았다.'],
    ]},
  ]},
  { w: 'bargain', p: 'n.', s: [
    { m: '싼 물건, 흥정', syn: ['deal'], ex: [
      ['This coat is a real bargain.', '이 코트는 정말 싸다.'],
      ['They made a bargain quickly.', '그들은 빠르게 흥정했다.'],
      ['A good bargain pleases both sides.', '좋은 거래는 양쪽 다 만족시킨다.'],
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
  { w: 'beam', p: 'n.', s: [
    { m: '광선, 빔', syn: ['ray'], ex: [
      ['A beam of light entered.', '한 줄기 빛이 들어왔다.'],
      ['The beam holds up the roof.', '그 들보가 지붕을 받친다.'],
      ['She saw a beam in the dark.', '그녀는 어둠 속 광선을 보았다.'],
    ]},
  ]},
  { w: 'beard', p: 'n.', s: [
    { m: '턱수염', syn: ['facial hair'], ex: [
      ['He grew a long beard.', '그는 긴 턱수염을 길렀다.'],
      ['His beard turned white.', '그의 수염이 하얗게 세었다.'],
      ['She touched his beard.', '그녀는 그의 수염을 만졌다.'],
    ]},
  ]},
  { w: 'beast', p: 'n.', s: [
    { m: '짐승', syn: ['animal'], ex: [
      ['A wild beast lives here.', '야생 짐승이 여기 산다.'],
      ['The beast ran into the woods.', '그 짐승은 숲으로 달아났다.'],
      ['Do not act like a beast.', '짐승처럼 굴지 마라.'],
    ]},
  ]},
  { w: 'behalf', p: 'n.', s: [
    { m: '이익, 대신', syn: ['interest'], ex: [
      ['She spoke on my behalf.', '그녀가 나를 대신해 말했다.'],
      ['He accepted the prize on her behalf.', '그가 그녀를 대신해 상을 받았다.'],
      ['They worked on behalf of the poor.', '그들은 가난한 이들을 위해 일했다.'],
    ]},
  ]},
  { w: 'behave', p: 'v.', s: [
    { m: '행동하다', syn: ['act'], ex: [
      ['Please behave in class.', '수업 중에 바르게 행동해라.'],
      ['He behaved very well.', '그는 아주 잘 행동했다.'],
      ['Children behave differently at home.', '아이들은 집에서 다르게 행동한다.'],
    ]},
  ]},
  { w: 'betray', p: 'v.', s: [
    { m: '배신하다', syn: ['deceive'], ex: [
      ['Never betray a friend.', '친구를 절대 배신하지 마라.'],
      ['He betrayed their trust.', '그는 그들의 신뢰를 저버렸다.'],
      ['Her face betrayed her fear.', '그녀의 얼굴이 두려움을 드러냈다.'],
    ]},
  ]},
  { w: 'bias', p: 'n.', s: [
    { m: '편견, 편향', syn: ['prejudice', 'one-sidedness'], ex: [
      ['The study showed a clear bias.', '그 연구는 뚜렷한 편향을 보였다.'],
      ['We all have unconscious bias.', '우리 모두는 무의식적 편견을 가지고 있다.'],
      ['Try to report without bias.', '편견 없이 보도하려고 해라.'],
    ]},
  ]},
  { w: 'biography', p: 'n.', s: [
    { m: '전기, 일대기', syn: ['life story'], ex: [
      ['She read a biography of a scientist.', '그녀는 어느 과학자의 전기를 읽었다.'],
      ['The biography is very long.', '그 전기는 아주 길다.'],
      ['He wrote his own biography.', '그는 자기 전기를 썼다.'],
    ]},
  ]},
  { w: 'biology', p: 'n.', s: [
    { m: '생물학', syn: ['life science'], ex: [
      ['Biology is my favorite subject.', '생물학은 내가 제일 좋아하는 과목이다.'],
      ['She studies biology at college.', '그녀는 대학에서 생물학을 공부한다.'],
      ['Biology explains how life works.', '생물학은 생명의 원리를 설명한다.'],
    ]},
  ]},
  { w: 'blast', p: 'n.', s: [
    { m: '폭발, 강한 바람', syn: ['explosion'], ex: [
      ['A blast shook the building.', '폭발이 건물을 흔들었다.'],
      ['A blast of cold air came in.', '찬 바람이 훅 들어왔다.'],
      ['The blast was heard far away.', '그 폭발음이 멀리서도 들렸다.'],
    ]},
  ]},
  { w: 'blend', p: 'v.', s: [
    { m: '섞다, 어울리다', syn: ['mix'], ex: [
      ['Blend the milk and eggs.', '우유와 달걀을 섞어라.'],
      ['The colors blend well.', '그 색들은 잘 어울린다.'],
      ['She blended into the crowd.', '그녀는 군중 속에 섞였다.'],
    ]},
  ]},
  { w: 'blink', p: 'v.', s: [
    { m: '눈을 깜박이다', syn: ['wink'], ex: [
      ['She blinked in the bright light.', '그녀는 밝은 빛에 눈을 깜박였다.'],
      ['Do not blink so often.', '그렇게 자주 깜박이지 마라.'],
      ['The light is blinking.', '불빛이 깜박이고 있다.'],
    ]},
  ]},
  { w: 'blossom', p: 'v.', s: [
    { m: '꽃을 피우다', syn: ['bloom'], ex: [
      ['Cherry trees blossom in spring.', '벚나무는 봄에 꽃을 피운다.'],
      ['The garden blossomed early.', '정원이 일찍 꽃을 피웠다.'],
      ['Her talent blossomed at school.', '그녀의 재능이 학교에서 꽃피었다.'],
    ]},
  ]},
  { w: 'bold', p: 'adj.', s: [
    { m: '대담한, 굵은', syn: ['brave'], ex: [
      ['That was a bold decision.', '그것은 대담한 결정이었다.'],
      ['Write the title in bold letters.', '제목을 굵은 글씨로 써라.'],
      ['She is bold and honest.', '그녀는 대담하고 정직하다.'],
    ]},
  ]},
  { w: 'boost', p: 'v.', s: [
    { m: '끌어올리다, 북돋우다', syn: ['raise'], ex: [
      ['Exercise boosts your energy.', '운동은 활력을 북돋운다.'],
      ['The win boosted our spirit.', '그 승리가 우리 사기를 올렸다.'],
      ['They boosted sales this year.', '그들은 올해 매출을 끌어올렸다.'],
    ]},
  ]},
  { w: 'border', p: 'n.', s: [
    { m: '국경, 경계', syn: ['boundary'], ex: [
      ['We crossed the border at noon.', '우리는 정오에 국경을 넘었다.'],
      ['The border is closed today.', '국경은 오늘 닫혀 있다.'],
      ['Flowers grow along the border.', '경계를 따라 꽃이 자란다.'],
    ]},
  ]},
  { w: 'boundary', p: 'n.', s: [
    { m: '경계, 한계', syn: ['limit'], ex: [
      ['The river forms a boundary.', '그 강이 경계를 이룬다.'],
      ['He pushed the boundary of science.', '그는 과학의 한계를 밀어붙였다.'],
      ['Know your own boundary.', '자기 한계를 알아라.'],
    ]},
  ]},
  { w: 'breed', p: 'v.', s: [
    { m: '기르다, 번식하다', syn: ['raise'], ex: [
      ['They breed horses on the farm.', '그들은 농장에서 말을 기른다.'],
      ['Rabbits breed quickly.', '토끼는 빨리 번식한다.'],
      ['Fear breeds more fear.', '두려움은 더 큰 두려움을 낳는다.'],
    ]},
  ]},
  { w: 'breeze', p: 'n.', s: [
    { m: '산들바람', syn: ['light wind'], ex: [
      ['A cool breeze blew in.', '시원한 산들바람이 불어왔다.'],
      ['The breeze moved the curtain.', '산들바람이 커튼을 움직였다.'],
      ['We enjoyed the evening breeze.', '우리는 저녁 산들바람을 즐겼다.'],
    ]},
  ]},
  { w: 'broadcast', p: 'v.', s: [
    { m: '방송하다', syn: ['air'], ex: [
      ['They broadcast the game live.', '그들은 그 경기를 생중계했다.'],
      ['The news was broadcast at nine.', '뉴스는 9시에 방송되었다.'],
      ['She broadcasts every morning.', '그녀는 매일 아침 방송한다.'],
    ]},
  ]},
  { w: 'brute', p: 'n.', s: [
    { m: '짐승 같은 사람', syn: ['beast'], ex: [
      ['He acted like a brute.', '그는 짐승처럼 굴었다.'],
      ['The brute showed no mercy.', '그 짐승 같은 자는 자비가 없었다.'],
      ['Do not use brute force.', '완력을 쓰지 마라.'],
    ]},
  ]},
  { w: 'bulk', p: 'n.', s: [
    { m: '큰 규모, 대부분', syn: ['mass'], ex: [
      ['The bulk of the work is done.', '일의 대부분이 끝났다.'],
      ['They buy rice in bulk.', '그들은 쌀을 대량으로 산다.'],
      ['The bulk of the box is huge.', '그 상자의 부피가 크다.'],
    ]},
  ]},
  { w: 'bull', p: 'n.', s: [
    { m: '황소', syn: ['male cattle'], ex: [
      ['A bull stood in the field.', '황소 한 마리가 들판에 서 있었다.'],
      ['The bull is very strong.', '그 황소는 아주 힘이 세다.'],
      ['Do not go near the bull.', '황소 가까이 가지 마라.'],
    ]},
  ]},
  { w: 'bully', p: 'v.', s: [
    { m: '괴롭히다', syn: ['pick on'], ex: [
      ['Do not bully other children.', '다른 아이를 괴롭히지 마라.'],
      ['He bullied his classmates.', '그는 반 친구들을 괴롭혔다.'],
      ['She was bullied last year.', '그녀는 작년에 괴롭힘을 당했다.'],
    ]},
  ]},
  { w: 'bundle', p: 'n.', s: [
    { m: '묶음, 꾸러미', syn: ['package'], ex: [
      ['She carried a bundle of clothes.', '그녀는 옷 꾸러미를 들었다.'],
      ['Tie the sticks into a bundle.', '막대를 한 묶음으로 묶어라.'],
      ['A bundle of letters arrived.', '편지 한 묶음이 도착했다.'],
    ]},
  ]},
  { w: 'burden', p: 'n.', s: [
    { m: '짐, 부담', syn: ['load'], ex: [
      ['The work was a heavy burden.', '그 일은 큰 부담이었다.'],
      ['She carried the burden alone.', '그녀는 그 짐을 혼자 졌다.'],
      ['Do not be a burden to others.', '남에게 짐이 되지 마라.'],
    ]},
  ]},
  { w: 'butcher', p: 'n.', s: [
    { m: '정육점 주인', syn: ['meat seller'], ex: [
      ['The butcher cut the meat.', '정육점 주인이 고기를 잘랐다.'],
      ['She bought beef from the butcher.', '그녀는 정육점에서 소고기를 샀다.'],
      ['A butcher works with sharp knives.', '정육점 주인은 날카로운 칼을 쓴다.'],
    ]},
  ]},
  { w: 'buzz', p: 'n.', s: [
    { m: '윙윙 소리', syn: ['hum'], ex: [
      ['I heard the buzz of a bee.', '나는 벌의 윙윙 소리를 들었다.'],
      ['The room filled with buzz.', '방이 웅성거림으로 찼다.'],
      ['A buzz came from the phone.', '전화에서 진동 소리가 났다.'],
    ]},
  ]},
  { w: 'by virtue of', p: 'phr.', s: [
    { m: '~ 덕분에, ~에 의하여', syn: ['because of', 'thanks to'], ex: [
      ['He won by virtue of hard work.', '그는 노력 덕분에 이겼다.'],
      ['She holds the post by virtue of seniority.', '그녀는 연공에 의해 그 자리를 맡고 있다.'],
      ['It survived by virtue of its size.', '그것은 크기 덕분에 살아남았다.'],
    ]},
  ]},
  { w: 'cancel', p: 'v.', s: [
    { m: '취소하다', syn: ['call off'], ex: [
      ['They cancelled the game.', '그들은 경기를 취소했다.'],
      ['She cancelled her order.', '그녀는 주문을 취소했다.'],
      ['Rain cancelled our picnic.', '비가 우리 소풍을 취소시켰다.'],
    ]},
  ]},
  { w: 'cancer', p: 'n.', s: [
    { m: '암', syn: [], ex: [
      ['Cancer is a serious illness.', '암은 심각한 병이다.'],
      ['Early tests can find cancer.', '조기 검사가 암을 발견할 수 있다.'],
      ['He recovered from cancer.', '그는 암에서 회복했다.'],
    ]},
  ]},
  { w: 'candidate', p: 'n.', s: [
    { m: '후보자, 지원자', syn: ['applicant'], ex: [
      ['She is a strong candidate.', '그녀는 유력한 후보다.'],
      ['Three candidates gave speeches.', '후보 세 명이 연설했다.'],
      ['The candidate answered honestly.', '그 지원자는 정직하게 답했다.'],
    ]},
  ]},
  { w: 'canvas', p: 'n.', s: [
    { m: '캔버스, 천', syn: ['cloth'], ex: [
      ['The artist painted on canvas.', '화가는 캔버스에 그렸다.'],
      ['The tent is made of canvas.', '그 텐트는 천으로 만들어졌다.'],
      ['A blank canvas waited for her.', '빈 캔버스가 그녀를 기다렸다.'],
    ]},
  ]},
  { w: 'capture', p: 'v.', s: [
    { m: '붙잡다, 포착하다', syn: ['catch'], ex: [
      ['The police captured the thief.', '경찰이 도둑을 붙잡았다.'],
      ['The photo captured the moment.', '그 사진이 그 순간을 담았다.'],
      ['They captured the castle.', '그들은 성을 함락했다.'],
    ]},
  ]},
  { w: 'carve', p: 'v.', s: [
    { m: '조각하다, 새기다', syn: ['cut'], ex: [
      ['He carved a bird from wood.', '그는 나무로 새를 조각했다.'],
      ['She carved her name on the desk.', '그녀는 책상에 이름을 새겼다.'],
      ['They are carving stone.', '그들은 돌을 조각하고 있다.'],
    ]},
  ]},
  { w: 'cater', p: 'v.', s: [
    { m: '음식을 공급하다, 맞추다', syn: ['serve'], ex: [
      ['They cater for large parties.', '그들은 큰 파티에 음식을 공급한다.'],
      ['The shop caters to students.', '그 가게는 학생들에 맞춘다.'],
      ['She catered the wedding.', '그녀가 결혼식 음식을 맡았다.'],
    ]},
  ]},
  { w: 'cattle', p: 'n.', s: [
    { m: '소, 가축', syn: [], ex: [
      ['They raise cattle on the farm.', '그들은 농장에서 소를 기른다.'],
      ['The cattle drank from the stream.', '소들이 시내에서 물을 마셨다.'],
      ['Cattle need wide fields.', '소는 넓은 들판이 필요하다.'],
    ]},
  ]},
  { w: 'caution', p: 'n.', s: [
    { m: '주의, 조심', syn: ['care'], ex: [
      ['Handle the glass with caution.', '유리를 조심해서 다뤄라.'],
      ['The sign says caution.', '표지판에 주의라고 쓰여 있다.'],
      ['Caution saved him from harm.', '조심함이 그를 화에서 구했다.'],
    ]},
  ]},
  { w: 'cave', p: 'n.', s: [
    { m: '동굴', syn: ['cavern'], ex: [
      ['They found a dark cave.', '그들은 어두운 동굴을 발견했다.'],
      ['Bats live in the cave.', '박쥐가 그 동굴에 산다.'],
      ['The cave is deep and cold.', '그 동굴은 깊고 춥다.'],
    ]},
  ]},
  { w: 'cease', p: 'v.', s: [
    { m: '그치다, 중단하다', syn: ['stop'], ex: [
      ['The rain ceased at noon.', '비가 정오에 그쳤다.'],
      ['They ceased all work.', '그들은 모든 작업을 중단했다.'],
      ['The noise never ceases here.', '여기서는 소음이 그치지 않는다.'],
    ]},
  ]},
  { w: 'celebrate', p: 'v.', s: [
    { m: '기념하다, 축하하다', syn: ['honor'], ex: [
      ['We celebrate her birthday today.', '우리는 오늘 그녀의 생일을 축하한다.'],
      ['They celebrated the victory.', '그들은 승리를 기념했다.'],
      ['Families celebrate together.', '가족들이 함께 기념한다.'],
    ]},
  ]},
  { w: 'celebrity', p: 'n.', s: [
    { m: '유명 인사', syn: ['famous person'], ex: [
      ['A celebrity visited our school.', '유명 인사가 우리 학교를 방문했다.'],
      ['She became a celebrity overnight.', '그녀는 하룻밤 사이에 유명해졌다.'],
      ['Celebrity life is not easy.', '유명인의 삶은 쉽지 않다.'],
    ]},
  ]},
  { w: 'censor', p: 'v.', s: [
    { m: '검열하다', syn: ['edit out'], ex: [
      ['They censored the article.', '그들은 그 기사를 검열했다.'],
      ['Some words were censored.', '일부 단어가 검열되었다.'],
      ['Do not censor honest opinions.', '정직한 의견을 검열하지 마라.'],
    ]},
  ]},
  { w: 'certificate', p: 'n.', s: [
    { m: '증명서, 자격증', syn: ['document'], ex: [
      ['She received a certificate.', '그녀는 증명서를 받았다.'],
      ['The certificate proves his skill.', '그 자격증이 그의 실력을 증명한다.'],
      ['Keep the certificate safe.', '증명서를 잘 보관해라.'],
    ]},
  ]},
  { w: 'chamber', p: 'n.', s: [
    { m: '방, 실', syn: ['room'], ex: [
      ['The chamber was cold and dark.', '그 방은 춥고 어두웠다.'],
      ['They met in the council chamber.', '그들은 의사당에서 만났다.'],
      ['The heart has four chambers.', '심장에는 방이 넷 있다.'],
    ]},
  ]},
  { w: 'chaos', p: 'n.', s: [
    { m: '혼란, 무질서', syn: ['disorder'], ex: [
      ['The room was in chaos.', '방은 엉망이었다.'],
      ['Chaos followed the storm.', '폭풍 뒤에 혼란이 이어졌다.'],
      ['Out of chaos came order.', '혼란에서 질서가 나왔다.'],
    ]},
  ]},
  { w: 'charity', p: 'n.', s: [
    { m: '자선, 자선 단체', syn: ['aid'], ex: [
      ['She gives to charity every month.', '그녀는 매달 자선 단체에 기부한다.'],
      ['The charity helps children.', '그 자선 단체는 아이들을 돕는다.'],
      ['Charity begins at home.', '자선은 가정에서 시작한다.'],
    ]},
  ]},
  { w: 'chef', p: 'n.', s: [
    { m: '요리사, 주방장', syn: ['cook'], ex: [
      ['The chef made a fine meal.', '주방장이 훌륭한 식사를 만들었다.'],
      ['She trained as a chef.', '그녀는 요리사로 훈련받았다.'],
      ['A chef works long hours.', '요리사는 오래 일한다.'],
    ]},
  ]},
  { w: 'chemical', p: 'n.', s: [
    { m: '화학 물질', syn: [], ex: [
      ['Some chemicals are dangerous.', '어떤 화학 물질은 위험하다.'],
      ['The chemical smells strong.', '그 화학 물질은 냄새가 강하다.'],
      ['Do not mix these chemicals.', '이 화학 물질들을 섞지 마라.'],
    ]},
  ]},
  { w: 'chill', p: 'n.', s: [
    { m: '한기, 냉기', syn: ['cold'], ex: [
      ['A chill ran through the room.', '방 안에 한기가 돌았다.'],
      ['She felt a chill outside.', '그녀는 밖에서 한기를 느꼈다.'],
      ['The evening chill came early.', '저녁 냉기가 일찍 찾아왔다.'],
    ]},
  ]},
  { w: 'chin', p: 'n.', s: [
    { m: '턱', syn: ['jaw'], ex: [
      ['He rested his chin on his hand.', '그는 손에 턱을 괴었다.'],
      ['Keep your chin up.', '기운 내라.'],
      ['She touched her chin lightly.', '그녀는 턱을 가볍게 만졌다.'],
    ]},
  ]},
  { w: 'choir', p: 'n.', s: [
    { m: '합창단', syn: ['chorus'], ex: [
      ['She sings in the school choir.', '그녀는 학교 합창단에서 노래한다.'],
      ['The choir sang beautifully.', '합창단이 아름답게 노래했다.'],
      ['A choir practices every week.', '합창단은 매주 연습한다.'],
    ]},
  ]},
  { w: 'chorus', p: 'n.', s: [
    { m: '합창, 후렴', syn: ['refrain'], ex: [
      ['Everyone sang the chorus.', '모두가 후렴을 불렀다.'],
      ['The chorus is easy to remember.', '그 후렴은 기억하기 쉽다.'],
      ['A chorus of voices answered.', '여러 목소리가 한꺼번에 답했다.'],
    ]},
  ]},
  { w: 'chronic', p: 'adj.', s: [
    { m: '만성의', syn: ['long-lasting'], ex: [
      ['He has a chronic illness.', '그는 만성 질환이 있다.'],
      ['Chronic pain is hard to bear.', '만성 통증은 견디기 힘들다.'],
      ['The problem became chronic.', '그 문제는 만성이 되었다.'],
    ]},
  ]},
  { w: 'circulate', p: 'v.', s: [
    { m: '순환하다, 돌다', syn: ['flow'], ex: [
      ['Blood circulates in the body.', '피는 몸에서 순환한다.'],
      ['The rumor circulated quickly.', '소문이 빠르게 돌았다.'],
      ['Air circulates through the room.', '공기가 방 안을 순환한다.'],
    ]},
  ]},
  { w: 'cite', p: 'v.', s: [
    { m: '인용하다, 언급하다', syn: ['quote'], ex: [
      ['She cited three studies.', '그녀는 연구 세 편을 인용했다.'],
      ['He cited his teacher\'s words.', '그는 선생님의 말을 인용했다.'],
      ['Cite your source clearly.', '출처를 분명히 밝혀라.'],
    ]},
  ]},
  { w: 'clap', p: 'v.', s: [
    { m: '박수치다', syn: ['applaud'], ex: [
      ['The audience clapped loudly.', '관객이 크게 박수쳤다.'],
      ['She clapped for her friend.', '그녀는 친구에게 박수를 보냈다.'],
      ['They are clapping now.', '그들은 지금 박수치고 있다.'],
    ]},
  ]},
  { w: 'clash', p: 'v.', s: [
    { m: '충돌하다', syn: ['conflict'], ex: [
      ['The two groups clashed.', '두 무리가 충돌했다.'],
      ['Their opinions clash often.', '그들의 의견은 자주 부딪친다.'],
      ['These colors clash badly.', '이 색들은 서로 안 어울린다.'],
    ]},
  ]},
  { w: 'clause', p: 'n.', s: [
    { m: '절, 조항', syn: ['provision'], ex: [
      ['The contract has a strange clause.', '그 계약에는 이상한 조항이 있다.'],
      ['This clause explains the rule.', '이 조항이 규칙을 설명한다.'],
      ['A sentence may have two clauses.', '한 문장에 절이 둘 있을 수 있다.'],
    ]},
  ]},
], 'csat');
