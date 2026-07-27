/**
 * 고등학교 3학년(수능 대비) 필수 어휘 100개.
 *
 * 선정 기준: 수능·6월/9월 모의평가 기출 지문의 고빈도 어휘 중,
 * 빈칸 추론·순서 배열처럼 논지 전개를 묻는 문항에서 열쇠가 되는
 * 추상 동사·명사와 논리 연결 표현을 우선 배치했다.
 */

import { defineLevel } from '../define';

export const H3 = defineLevel(
  'h3',
  [
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
  ],
  'csat',
);
