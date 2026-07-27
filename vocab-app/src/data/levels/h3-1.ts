/**
 * 고등학교 3학년 레벨 1 어휘 34개.
 *
 * 선정 기준: 수능·평가원 모의고사 최빈출 어휘와 고난도 구동사.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const H3_1 = defineLevel('h3-1', [
  { w: 'adverse', p: 'adj.', s: [
    { m: '부정적인, 불리한', syn: ['harmful', 'unfavorable'], ex: [
      ['The drug had adverse effects.', '그 약은 부작용이 있었다.'],
      ['They worked under adverse conditions.', '그들은 불리한 조건에서 일했다.'],
      ['Adverse weather delayed the flight.', '악천후가 항공편을 지연시켰다.'],
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
  { w: 'ambivalent', p: 'adj.', s: [
    { m: '양가적인, 엇갈리는 감정의', syn: ['mixed', 'uncertain'], ex: [
      ['She felt ambivalent about moving.', '그녀는 이사에 대해 마음이 엇갈렸다.'],
      ['The public is ambivalent about the plan.', '대중은 그 계획에 양가적이다.'],
      ['His ambivalent answer confused us.', '그의 애매한 대답이 우리를 혼란스럽게 했다.'],
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
  { w: 'articulate', p: 'v., adj.', s: [
    { m: '분명히 표현하다', syn: ['express clearly', 'state'], ex: [
      ['She articulated her concerns well.', '그녀는 우려를 잘 표현했다.'],
      ['He struggled to articulate his feelings.', '그는 감정을 표현하기 어려워했다.'],
      ['An articulate speaker holds attention.', '말을 조리 있게 하는 사람은 주의를 끈다.'],
    ]},
  ]},
  { w: 'authentic', p: 'adj.', s: [
    { m: '진짜의, 진정한', syn: ['genuine', 'real'], ex: [
      ['This is an authentic Korean dish.', '이것은 진짜 한국 요리이다.'],
      ['The painting turned out to be authentic.', '그 그림은 진품으로 밝혀졌다.'],
      ['Readers value authentic voices.', '독자들은 진정성 있는 목소리를 중요하게 여긴다.'],
    ]},
  ]},
  { w: 'bias', p: 'n.', s: [
    { m: '편견, 편향', syn: ['prejudice', 'one-sidedness'], ex: [
      ['The study showed a clear bias.', '그 연구는 뚜렷한 편향을 보였다.'],
      ['We all have unconscious bias.', '우리 모두는 무의식적 편견을 가지고 있다.'],
      ['Try to report without bias.', '편견 없이 보도하려고 해라.'],
    ]},
  ]},
  { w: 'coincide', p: 'v.', s: [
    { m: '동시에 일어나다, 일치하다', syn: ['happen together', 'match'], ex: [
      ['The two events coincided exactly.', '두 사건이 정확히 겹쳤다.'],
      ['Our views coincide on this issue.', '이 문제에 대한 우리 견해는 일치한다.'],
      ['The festival coincides with the holiday.', '그 축제는 휴일과 겹친다.'],
    ]},
  ]},
  { w: 'compelling', p: 'adj.', s: [
    { m: '설득력 있는, 강력한', syn: ['convincing', 'persuasive'], ex: [
      ['She made a compelling argument.', '그녀는 설득력 있는 주장을 폈다.'],
      ['There is compelling evidence for this.', '이에 대한 강력한 증거가 있다.'],
      ['The story was compelling from page one.', '그 이야기는 첫 쪽부터 흡인력이 있었다.'],
    ]},
  ]},
  { w: 'comprehensive', p: 'adj.', s: [
    { m: '포괄적인, 종합적인', syn: ['thorough', 'complete'], ex: [
      ['We need a comprehensive plan.', '우리는 포괄적인 계획이 필요하다.'],
      ['The report is comprehensive and clear.', '그 보고서는 포괄적이고 명확하다.'],
      ['She did a comprehensive review.', '그녀는 종합적인 검토를 했다.'],
    ]},
  ]},
  { w: 'conceive', p: 'v.', s: [
    { m: '생각해 내다, 상상하다', syn: ['imagine', 'think up'], ex: [
      ['He conceived the idea while walking.', '그는 걷다가 그 아이디어를 떠올렸다.'],
      ['I cannot conceive of such cruelty.', '나는 그런 잔인함을 상상할 수 없다.'],
      ['The project was conceived in 2010.', '그 프로젝트는 2010년에 구상되었다.'],
    ]},
  ]},
  { w: 'confine', p: 'v.', s: [
    { m: '국한하다, 가두다', syn: ['limit', 'restrict'], ex: [
      ['Please confine your answer to one page.', '답을 한 쪽으로 제한해 주세요.'],
      ['The illness confined him to bed.', '그 병은 그를 침대에 가두었다.'],
      ['The problem is not confined to our city.', '그 문제는 우리 도시에만 국한되지 않는다.'],
    ]},
  ]},
  { w: 'confront', p: 'v.', s: [
    { m: '직면하다, 맞서다', syn: ['face', 'stand up to'], ex: [
      ['We must confront the truth.', '우리는 진실에 맞서야 한다.'],
      ['She confronted him about the lie.', '그녀는 그 거짓말에 대해 그와 맞섰다.'],
      ['The country confronts an aging population.', '그 나라는 고령화에 직면해 있다.'],
    ]},
  ]},
  { w: 'consensus', p: 'n.', s: [
    { m: '합의, 의견 일치', syn: ['agreement', 'accord'], ex: [
      ['The group reached a consensus.', '그 모임은 합의에 이르렀다.'],
      ['There is no scientific consensus yet.', '아직 과학적 합의는 없다.'],
      ['We built consensus through discussion.', '우리는 토론을 통해 합의를 이뤘다.'],
    ]},
  ]},
  { w: 'contemplate', p: 'v.', s: [
    { m: '숙고하다, 고려하다', syn: ['consider', 'ponder'], ex: [
      ['He contemplated changing careers.', '그는 직업을 바꿀까 숙고했다.'],
      ['She sat quietly and contemplated.', '그녀는 조용히 앉아 사색했다.'],
      ['We must contemplate the consequences.', '우리는 그 결과를 숙고해야 한다.'],
    ]},
  ]},
  { w: 'contradict', p: 'v.', s: [
    { m: '모순되다, 반박하다', syn: ['oppose', 'go against'], ex: [
      ['The two reports contradict each other.', '두 보고서는 서로 모순된다.'],
      ['His actions contradict his words.', '그의 행동은 말과 모순된다.'],
      ['She politely contradicted the speaker.', '그녀는 정중히 발표자에게 반박했다.'],
    ]},
  ]},
  { w: 'conventional', p: 'adj.', s: [
    { m: '전통적인, 관습적인', syn: ['traditional', 'standard'], ex: [
      ['He prefers conventional methods.', '그는 전통적인 방법을 선호한다.'],
      ['Conventional wisdom is not always right.', '통념이 늘 옳은 것은 아니다.'],
      ['The design breaks conventional rules.', '그 디자인은 관습적 규칙을 깬다.'],
    ]},
  ]},
  { w: 'correlate', p: 'v.', s: [
    { m: '상관관계가 있다', syn: ['be related', 'link'], ex: [
      ['Income correlates with education.', '소득은 교육 수준과 상관관계가 있다.'],
      ['These two factors do not correlate.', '이 두 요인은 상관관계가 없다.'],
      ['Sleep correlates strongly with mood.', '수면은 기분과 강한 상관관계가 있다.'],
    ]},
  ]},
  { w: 'counterpart', p: 'n.', s: [
    { m: '상대방, 대응물', syn: ['equivalent', 'match'], ex: [
      ['She met her Japanese counterpart.', '그녀는 일본 측 상대방을 만났다.'],
      ['Rural schools differ from their urban counterparts.', '시골 학교는 도시의 그것과 다르다.'],
      ['This word has no counterpart in Korean.', '이 단어는 한국어에 대응어가 없다.'],
    ]},
  ]},
  { w: 'deteriorate', p: 'v.', s: [
    { m: '악화되다, 나빠지다', syn: ['worsen', 'decline'], ex: [
      ['His health deteriorated quickly.', '그의 건강이 빠르게 악화되었다.'],
      ['Relations between them deteriorated.', '그들 사이의 관계가 나빠졌다.'],
      ['The building deteriorated over the years.', '그 건물은 세월이 흐르며 낡아 갔다.'],
    ]},
  ]},
  { w: 'devastate', p: 'v.', s: [
    { m: '황폐화하다, 큰 충격을 주다', syn: ['destroy', 'ruin'], ex: [
      ['The flood devastated the village.', '홍수가 그 마을을 황폐화했다.'],
      ['She was devastated by the news.', '그녀는 그 소식에 큰 충격을 받았다.'],
      ['War devastated the entire region.', '전쟁이 그 지역 전체를 파괴했다.'],
    ]},
  ]},
  { w: 'discourse', p: 'n.', s: [
    { m: '담론, 담화', syn: ['discussion', 'dialogue'], ex: [
      ['Public discourse has changed online.', '공적 담론은 온라인에서 변했다.'],
      ['The book studies political discourse.', '그 책은 정치 담론을 연구한다.'],
      ['We need civil discourse, not shouting.', '우리에게는 고함이 아니라 예의 있는 대화가 필요하다.'],
    ]},
  ]},
  { w: 'disperse', p: 'v.', s: [
    { m: '흩어지다, 해산시키다', syn: ['scatter', 'break up'], ex: [
      ['The crowd dispersed after the show.', '공연이 끝나자 군중이 흩어졌다.'],
      ['Wind disperses seeds widely.', '바람은 씨앗을 널리 퍼뜨린다.'],
      ['Police dispersed the protesters.', '경찰이 시위대를 해산시켰다.'],
    ]},
  ]},
  { w: 'disrupt', p: 'v.', s: [
    { m: '방해하다, 지장을 주다', syn: ['interrupt', 'upset'], ex: [
      ['The storm disrupted traffic.', '폭풍이 교통에 지장을 주었다.'],
      ['Do not disrupt the class.', '수업을 방해하지 마라.'],
      ['New technology disrupted the industry.', '새 기술이 그 산업을 뒤흔들었다.'],
    ]},
  ]},
  { w: 'distort', p: 'v.', s: [
    { m: '왜곡하다, 일그러뜨리다', syn: ['twist', 'misrepresent'], ex: [
      ['The media distorted his words.', '언론이 그의 말을 왜곡했다.'],
      ['Fear distorts our judgment.', '두려움은 우리의 판단을 왜곡한다.'],
      ['The mirror distorted her face.', '그 거울은 그녀의 얼굴을 일그러뜨렸다.'],
    ]},
  ]},
  { w: 'diverge', p: 'v.', s: [
    { m: '갈라지다, 달라지다', syn: ['differ', 'branch off'], ex: [
      ['Our opinions diverge on this point.', '이 점에서 우리 의견이 갈린다.'],
      ['The road diverges near the river.', '그 길은 강 근처에서 갈라진다.'],
      ['Their careers diverged after college.', '그들의 진로는 대학 후 갈라졌다.'],
    ]},
  ]},
  { w: 'empirical', p: 'adj.', s: [
    { m: '경험적인, 실증적인', syn: ['observed', 'evidence-based'], ex: [
      ['We need empirical evidence.', '우리는 실증적 증거가 필요하다.'],
      ['The claim lacks empirical support.', '그 주장은 실증적 근거가 부족하다.'],
      ['Empirical studies confirmed the theory.', '실증 연구가 그 이론을 확인했다.'],
    ]},
  ]},
  { w: 'enact', p: 'v.', s: [
    { m: '제정하다, 시행하다', syn: ['pass', 'put into law'], ex: [
      ['The government enacted a new law.', '정부가 새 법을 제정했다.'],
      ['The rule was enacted last year.', '그 규정은 작년에 시행되었다.'],
      ['They enacted reforms step by step.', '그들은 개혁을 단계적으로 시행했다.'],
    ]},
  ]},
  { w: 'entail', p: 'v.', s: [
    { m: '수반하다, 필요로 하다', syn: ['involve', 'require'], ex: [
      ['This job entails long hours.', '이 일은 긴 근무 시간을 수반한다.'],
      ['Freedom entails responsibility.', '자유는 책임을 수반한다.'],
      ['What does the process entail?', '그 과정에는 무엇이 따르나요?'],
    ]},
  ]},
  { w: 'exert', p: 'v.', s: [
    { m: '행사하다, 발휘하다', syn: ['apply', 'use'], ex: [
      ['He exerts great influence on the team.', '그는 팀에 큰 영향력을 행사한다.'],
      ['She exerted all her strength.', '그녀는 온 힘을 다했다.'],
      ['Parents exert pressure without knowing.', '부모는 모르는 사이에 압력을 행사한다.'],
    ]},
  ]},
], 'csat');
