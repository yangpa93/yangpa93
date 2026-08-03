/**
 * 고등학교 3학년 레벨 2 — 수록 153 / 계획 137개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H3_2 = defineLevel('h3-2', [
  { w: 'in need of', p: 'phr.', s: [
    { m: '~을 필요로 하는', syn: [], ex: [
      ['The house is in need of repair.', '그 집은 수리가 필요하다.'],
      ['Many families are in need of help.', '많은 가정이 도움을 필요로 한다.'],
      ['She was in need of rest.', '그녀는 휴식이 필요했다.'],
    ]},
  ]},
  { w: 'in other words', p: 'phr.', s: [
    { m: '다시 말해, 즉', syn: [], ex: [
      ['In other words, we must start over.', '다시 말해, 우리는 처음부터 시작해야 한다.'],
      ['He refused; in other words, he said no.', '그는 거절했다, 즉 안 된다고 한 것이다.'],
      ['In other words, the plan failed.', '다시 말해 그 계획은 실패했다.'],
    ]},
  ]},
  { w: 'in place of', p: 'phr.', s: [
    { m: '~ 대신에', syn: ['instead of'], ex: [
      ['Use honey in place of sugar.', '설탕 대신 꿀을 쓰세요.'],
      ['She spoke in place of the director.', '그녀가 원장 대신 발언했다.'],
      ['We used cloth in place of paper.', '우리는 종이 대신 천을 썼다.'],
    ]},
  ]},
  { w: 'in proportion to', p: 'phr.', s: [
    { m: '~에 비례하여', syn: [], ex: [
      ['Pay rises in proportion to experience.', '급여는 경력에 비례해 오른다.'],
      ['The cost grows in proportion to size.', '비용은 크기에 비례해 늘어난다.'],
      ['Rewards were given in proportion to effort.', '보상은 노력에 비례해 주어졌다.'],
    ]},
  ]},
  { w: 'in public', p: 'phr.', s: [
    { m: '사람들 앞에서, 공개적으로', syn: [], ex: [
      ['She rarely speaks in public.', '그녀는 사람들 앞에서 좀처럼 말하지 않는다.'],
      ['He apologized in public.', '그는 공개적으로 사과했다.'],
      ['Do not argue in public.', '사람들 앞에서 다투지 마라.'],
    ]},
  ]},
  { w: 'in pursuit of', p: 'phr.', s: [
    { m: '~을 좇아, 추구하여', syn: [], ex: [
      ['He left home in pursuit of a dream.', '그는 꿈을 좇아 집을 떠났다.'],
      ['They traveled in pursuit of knowledge.', '그들은 지식을 찾아 여행했다.'],
      ['She works hard in pursuit of her goal.', '그녀는 목표를 좇아 열심히 일한다.'],
    ]},
  ]},
  { w: 'in response to', p: 'phr.', s: [
    { m: '~에 대응하여, 답하여', syn: [], ex: [
      ['In response to the letter, she called.', '그 편지에 답하여 그녀는 전화했다.'],
      ['Prices fell in response to demand.', '수요에 대응해 가격이 떨어졌다.'],
      ['The city acted in response to the flood.', '그 도시는 홍수에 대응해 조치를 취했다.'],
    ]},
  ]},
  { w: 'in return for', p: 'phr.', s: [
    { m: '~에 대한 보답으로', syn: [], ex: [
      ['He gave her flowers in return for her help.', '그는 도움에 대한 보답으로 그녀에게 꽃을 주었다.'],
      ['She asked nothing in return for her kindness.', '그녀는 친절의 대가로 아무것도 바라지 않았다.'],
      ['They offered land in return for peace.', '그들은 평화의 대가로 땅을 내주었다.'],
    ]},
  ]},
  { w: 'in short', p: 'phr.', s: [
    { m: '요컨대, 간단히 말해', syn: [], ex: [
      ['In short, the plan will not work.', '요컨대 그 계획은 통하지 않을 것이다.'],
      ['In short, we need more time.', '간단히 말해 우리는 시간이 더 필요하다.'],
      ['In short, she was right all along.', '요컨대 그녀가 처음부터 옳았다.'],
    ]},
  ]},
  { w: 'in the course of', p: 'phr.', s: [
    { m: '~하는 동안에', syn: [], ex: [
      ['In the course of the year, much changed.', '그해 동안 많은 것이 바뀌었다.'],
      ['In the course of the talk, he mentioned it.', '이야기하는 동안 그는 그것을 언급했다.'],
      ['Many trees fell in the course of the storm.', '폭풍이 부는 동안 많은 나무가 쓰러졌다.'],
    ]},
  ]},
  { w: 'in the face of', p: 'phr.', s: [
    { m: '~에 직면하여, ~에도 불구하고', syn: [], ex: [
      ['She stayed calm in the face of danger.', '그녀는 위험에 직면해서도 침착했다.'],
      ['They kept working in the face of criticism.', '그들은 비판에도 불구하고 계속 일했다.'],
      ['He showed courage in the face of loss.', '그는 상실 앞에서 용기를 보였다.'],
    ]},
  ]},
  { w: 'in the wake of', p: 'phr.', s: [
    { m: '~의 여파로, ~에 뒤이어', syn: [], ex: [
      ['The city rebuilt in the wake of the fire.', '그 도시는 화재의 여파로 다시 지어졌다.'],
      ['Prices rose in the wake of the storm.', '폭풍의 여파로 물가가 올랐다.'],
      ['New rules came in the wake of the accident.', '그 사고에 뒤이어 새 규칙이 생겼다.'],
    ]},
  ]},
  { w: 'in view of', p: 'phr.', s: [
    { m: '~을 고려하여', syn: [], ex: [
      ['In view of the weather, we stayed home.', '날씨를 고려해 우리는 집에 있었다.'],
      ['In view of his age, that is remarkable.', '그의 나이를 고려하면 그것은 놀랍다.'],
      ['In view of the cost, we chose another way.', '비용을 고려해 우리는 다른 길을 택했다.'],
    ]},
  ]},
  { w: 'keep abreast of', p: 'phr.', s: [
    { m: '~에 뒤지지 않고 알고 있다', syn: [], ex: [
      ['She keeps abreast of the news.', '그녀는 소식에 뒤지지 않고 있다.'],
      ['Doctors must keep abreast of research.', '의사는 연구를 계속 따라가야 한다.'],
      ['He keeps abreast of the latest trends.', '그는 최신 흐름을 계속 파악한다.'],
    ]},
  ]},
  { w: 'lay off', p: 'phr.', s: [
    { m: '(직원을) 해고하다', syn: [], ex: [
      ['The factory laid off fifty workers.', '그 공장은 노동자 쉰 명을 해고했다.'],
      ['He was laid off last winter.', '그는 지난겨울에 해고되었다.'],
      ['They laid off staff to cut costs.', '그들은 비용을 줄이려 직원을 해고했다.'],
    ]},
  ]},
  { w: 'live up to', p: 'phr.', s: [
    { m: '(기대에) 부응하다', syn: [], ex: [
      ['The film lived up to its reputation.', '그 영화는 명성에 부응했다.'],
      ['She lived up to her promise.', '그녀는 약속을 지켰다.'],
      ['He tried to live up to their hopes.', '그는 그들의 기대에 부응하려 애썼다.'],
    ]},
  ]},
  { w: 'obsess', p: 'v.', s: [
    { m: '사로잡다, 집착하게 하다', syn: ['preoccupy'], ex: [
      ['He is obsessed with soccer.', '그는 축구에 푹 빠져 있다.'],
      ['The idea obsessed her for years.', '그 생각이 여러 해 동안 그녀를 사로잡았다.'],
      ['Do not obsess over small mistakes.', '작은 실수에 집착하지 마라.'],
    ]},
  ]},
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
  { w: 'occupy', p: 'v.', s: [
    { m: '차지하다, 사용하다', syn: ['take up'], ex: [
      ['The sofa occupies half the room.', '소파가 방의 절반을 차지한다.'],
      ['All the seats were occupied.', '모든 좌석이 차 있었다.'],
      ['Homework occupied my whole evening.', '숙제가 내 저녁 시간을 다 차지했다.'],
    ]},
  ]},
  { w: 'offend', p: 'v.', s: [
    { m: '기분을 상하게 하다', syn: ['upset'], ex: [
      ['I did not mean to offend you.', '너의 기분을 상하게 할 생각은 아니었다.'],
      ['His joke offended some students.', '그의 농담은 몇몇 학생의 기분을 상하게 했다.'],
      ['She was offended by the remark.', '그녀는 그 말에 기분이 상했다.'],
    ]},
  ]},
  { w: 'on the contrary', p: 'phr.', s: [
    { m: '그와는 반대로', syn: [], ex: [
      ['He is not lazy; on the contrary, he works hard.', '그는 게으르지 않다. 오히려 열심히 일한다.'],
      ['On the contrary, sales went up.', '그와는 반대로 매출이 올랐다.'],
      ['I did not dislike it; on the contrary, I loved it.', '나는 그것을 싫어하지 않았다. 오히려 아주 좋아했다.'],
    ]},
  ]},
  { w: 'opportune', p: 'adj.', s: [
    { m: '시의적절한, 알맞은', syn: ['timely'], ex: [
      ['He arrived at an opportune moment.', '그는 알맞은 순간에 도착했다.'],
      ['This is an opportune time to ask.', '지금이 물어보기 좋은 때다.'],
      ['The letter came at an opportune time.', '그 편지는 시의적절하게 도착했다.'],
    ]},
  ]},
  { w: 'opt', p: 'v.', s: [
    { m: '선택하다', syn: ['choose'], ex: [
      ['She opted for the shorter course.', '그녀는 더 짧은 과정을 선택했다.'],
      ['Many students opt to study abroad.', '많은 학생이 유학을 택한다.'],
      ['We opted out of the trip.', '우리는 그 여행에 참여하지 않기로 했다.'],
    ]},
  ]},
  { w: 'optimist', p: 'n.', s: [
    { m: '낙관주의자', syn: [], ex: [
      ['My father is a true optimist.', '우리 아버지는 진정한 낙관주의자다.'],
      ['An optimist sees the bright side.', '낙관주의자는 밝은 면을 본다.'],
      ['Optimists recover from failure faster.', '낙관하는 사람은 실패에서 더 빨리 회복한다.'],
    ]},
  ]},
  { w: 'optimistic', p: 'adj.', s: [
    { m: '낙관적인', syn: ['hopeful', 'positive'], ex: [
      ['She is optimistic about the future.', '그녀는 미래에 대해 낙관적이다.'],
      ['We remain optimistic despite the loss.', '패배에도 우리는 낙관적이다.'],
      ['His optimistic view encouraged us.', '그의 낙관적인 시각이 우리를 북돋았다.'],
    ]},
  ]},
  { w: 'oral', p: 'adj.', s: [
    { m: '구두의, 입의', syn: ['spoken'], ex: [
      ['We had an oral test today.', '우리는 오늘 구술 시험을 봤다.'],
      ['Oral health matters a lot.', '구강 건강은 아주 중요하다.'],
      ['She gave an oral report to the class.', '그녀는 반 앞에서 구두로 발표했다.'],
    ]},
  ]},
  { w: 'orbit', p: 'n.', s: [
    { m: '궤도', syn: [], ex: [
      ['The moon moves in orbit around the earth.', '달은 지구 둘레의 궤도를 돈다.'],
      ['The satellite reached orbit safely.', '그 위성은 무사히 궤도에 올랐다.'],
      ['Its orbit takes one year.', '그 궤도를 도는 데 일 년이 걸린다.'],
    ]},
  ]},
  { w: 'orchestra', p: 'n.', s: [
    { m: '관현악단, 오케스트라', syn: [], ex: [
      ['The orchestra played a waltz.', '관현악단이 왈츠를 연주했다.'],
      ['She joined the school orchestra.', '그녀는 학교 오케스트라에 들어갔다.'],
      ['A large orchestra filled the stage.', '큰 관현악단이 무대를 채웠다.'],
    ]},
  ]},
  { w: 'organ', p: 'n.', s: [
    { m: '장기, 기관', syn: [], ex: [
      ['The heart is a vital organ.', '심장은 중요한 장기다.'],
      ['Each organ has its own job.', '각 기관은 저마다 역할이 있다.'],
      ['Smoking damages several organs.', '흡연은 여러 장기를 해친다.'],
    ]},
    { m: '오르간', syn: [], ex: [
      ['The church has an old organ.', '그 교회에는 오래된 오르간이 있다.'],
      ['He played the organ at the wedding.', '그는 결혼식에서 오르간을 연주했다.'],
    ]},
  ]},
  { w: 'organize', p: 'v.', s: [
    { m: '조직하다, 정리하다', syn: ['arrange'], ex: [
      ['We organized a book fair.', '우리는 도서 축제를 열었다.'],
      ['She organized her desk neatly.', '그녀는 책상을 깔끔하게 정리했다.'],
      ['Students organized a school festival.', '학생들이 학교 축제를 준비했다.'],
    ]},
  ]},
  { w: 'orient', p: 'v.', s: [
    { m: '맞추다, 방향을 잡다', syn: [], ex: [
      ['The course is oriented toward beginners.', '그 강좌는 초보자에게 맞춰져 있다.'],
      ['He oriented the map to the north.', '그는 지도를 북쪽으로 맞췄다.'],
      ['New workers orient themselves in a week.', '새 직원들은 일주일이면 적응한다.'],
    ]},
  ]},
  { w: 'origin', p: 'n.', s: [
    { m: '기원, 출신', syn: ['beginning'], ex: [
      ['The origin of the word is Latin.', '그 단어의 기원은 라틴어다.'],
      ['Nobody knows the origin of the fire.', '아무도 그 화재의 원인을 모른다.'],
      ['Her family origins are in Busan.', '그녀의 가족은 부산 출신이다.'],
    ]},
  ]},
  { w: 'outcome', p: 'n.', s: [
    { m: '결과', syn: ['result'], ex: [
      ['The outcome surprised everyone.', '그 결과는 모두를 놀라게 했다.'],
      ['We waited for the outcome of the vote.', '우리는 투표 결과를 기다렸다.'],
      ['A good plan improves the outcome.', '좋은 계획은 결과를 낫게 한다.'],
    ]},
  ]},
  { w: 'outline', p: 'n.', s: [
    { m: '개요, 윤곽', syn: [], ex: [
      ['Write an outline before the essay.', '글을 쓰기 전에 개요를 써라.'],
      ['She drew the outline of a house.', '그녀는 집의 윤곽을 그렸다.'],
      ['The outline covers three main points.', '그 개요는 세 가지 요점을 담고 있다.'],
    ]},
  ]},
  { w: 'output', p: 'n.', s: [
    { m: '생산량, 산출', syn: ['production'], ex: [
      ['The factory doubled its output.', '그 공장은 생산량을 두 배로 늘렸다.'],
      ['Our output rose last month.', '지난달 우리 산출량이 올랐다.'],
      ['Higher output means more work.', '생산량이 늘면 일도 늘어난다.'],
    ]},
  ]},
  { w: 'outrage', p: 'n.', s: [
    { m: '분노, 격분', syn: [], ex: [
      ['The news caused public outrage.', '그 소식은 대중의 분노를 불러왔다.'],
      ['She expressed outrage at the decision.', '그녀는 그 결정에 분노를 드러냈다.'],
      ['His outrage faded after a day.', '그의 분노는 하루가 지나자 가라앉았다.'],
    ]},
  ]},
  { w: 'outstanding', p: 'adj.', s: [
    { m: '뛰어난, 눈에 띄는', syn: ['excellent'], ex: [
      ['Her grades are outstanding.', '그녀의 성적은 뛰어나다.'],
      ['He gave an outstanding performance.', '그는 뛰어난 연기를 보여 주었다.'],
      ['The team had an outstanding season.', '그 팀은 눈부신 시즌을 보냈다.'],
    ]},
  ]},
  { w: 'overcome', p: 'v.', s: [
    { m: '극복하다, 이겨 내다', syn: ['get over', 'conquer'], ex: [
      ['She overcame her fear of water.', '그녀는 물에 대한 두려움을 극복했다.'],
      ['They overcame many difficulties.', '그들은 많은 어려움을 이겨 냈다.'],
      ['Hard work can overcome bad luck.', '노력은 불운을 이겨 낼 수 있다.'],
    ]},
  ]},
  { w: 'overhead', p: 'adv.', s: [
    { m: '머리 위로', syn: ['above'], ex: [
      ['A plane flew overhead.', '비행기가 머리 위로 날아갔다.'],
      ['Clouds gathered overhead.', '구름이 머리 위에 모였다.'],
      ['The lamp hangs overhead.', '등이 머리 위에 걸려 있다.'],
    ]},
  ]},
  { w: 'overlap', p: 'v.', s: [
    { m: '겹치다', syn: ['coincide'], ex: [
      ['The two classes overlap on Friday.', '두 수업이 금요일에 겹친다.'],
      ['Their duties overlapped a little.', '그들의 업무는 조금 겹쳤다.'],
      ['Do not let the papers overlap.', '종이가 겹치지 않게 해라.'],
    ]},
  ]},
  { w: 'overlook', p: 'v.', s: [
    { m: '간과하다, 내려다보다', syn: [], ex: [
      ['Do not overlook this detail.', '이 세부 사항을 놓치지 마라.'],
      ['The room overlooks the sea.', '그 방은 바다를 내려다본다.'],
      ['He overlooked one small error.', '그는 작은 실수 하나를 지나쳤다.'],
    ]},
  ]},
  { w: 'overnight', p: 'adv.', s: [
    { m: '하룻밤 사이에, 밤새', syn: [], ex: [
      ['The snow melted overnight.', '눈이 밤사이에 녹았다.'],
      ['We stayed overnight at her house.', '우리는 그녀의 집에서 하룻밤을 묵었다.'],
      ['He became famous overnight.', '그는 하룻밤 사이에 유명해졌다.'],
    ]},
  ]},
  { w: 'oversea', p: 'adj.', s: [
    { m: '해외의 (보통 overseas 를 쓴다)', syn: [], ex: [
      ['The company opened an oversea office.', '그 회사는 해외 사무소를 열었다.'],
      ['Oversea trade grew quickly.', '해외 무역이 빠르게 늘었다.'],
      ['They handle oversea orders.', '그들은 해외 주문을 처리한다.'],
    ]},
  ]},
  { w: 'overseas', p: 'adv.', s: [
    { m: '해외로, 해외에서', syn: ['abroad'], ex: [
      ['She works overseas now.', '그녀는 지금 해외에서 일한다.'],
      ['He moved overseas last spring.', '그는 지난봄에 해외로 떠났다.'],
      ['Many products are sent overseas.', '많은 제품이 해외로 보내진다.'],
    ]},
  ]},
  { w: 'overwhelm', p: 'v.', s: [
    { m: '압도하다, 벅차게 하다', syn: ['overpower'], ex: [
      ['The work overwhelmed him.', '그 일은 그를 벅차게 했다.'],
      ['She was overwhelmed by kindness.', '그녀는 친절에 감동해 어쩔 줄 몰랐다.'],
      ['Waves overwhelmed the small boat.', '파도가 작은 배를 덮쳤다.'],
    ]},
  ]},
  { w: 'owe', p: 'v.', s: [
    { m: '빚지다, 신세지다', syn: [], ex: [
      ['I owe you five thousand won.', '나는 너에게 오천 원을 빚졌다.'],
      ['She owes her success to her teacher.', '그녀는 성공을 선생님 덕으로 돌린다.'],
      ['He owed money to the shop.', '그는 그 가게에 돈을 빚졌다.'],
    ]},
  ]},
  { w: 'pace', p: 'n.', s: [
    { m: '속도, 걸음', syn: ['speed'], ex: [
      ['He walked at a slow pace.', '그는 느린 속도로 걸었다.'],
      ['The pace of the game increased.', '경기의 속도가 빨라졌다.'],
      ['Keep your own pace while studying.', '공부할 때는 네 속도를 지켜라.'],
    ]},
  ]},
  { w: 'pad', p: 'n.', s: [
    { m: '패드, 깔개', syn: ['cushion'], ex: [
      ['Put a pad under the vase.', '꽃병 아래에 받침을 깔아라.'],
      ['The chair has a soft pad.', '그 의자에는 부드러운 방석이 있다.'],
      ['He wore knee pads while skating.', '그는 스케이트를 타며 무릎 보호대를 착용했다.'],
    ]},
  ]},
  { w: 'pale', p: 'adj.', s: [
    { m: '창백한, 옅은', syn: [], ex: [
      ['She looked pale this morning.', '그녀는 오늘 아침 창백해 보였다.'],
      ['The wall is pale blue.', '그 벽은 옅은 파란색이다.'],
      ['He turned pale at the news.', '그는 그 소식에 얼굴이 하얘졌다.'],
    ]},
  ]},
  { w: 'palm', p: 'n.', s: [
    { m: '손바닥', syn: [], ex: [
      ['He held the coin in his palm.', '그는 동전을 손바닥에 쥐었다.'],
      ['Her palms were wet with sweat.', '그녀의 손바닥은 땀으로 젖어 있었다.'],
      ['The bird sat on my open palm.', '새가 내 펼친 손바닥에 앉았다.'],
    ]},
    { m: '야자나무', syn: [], ex: [
      ['Tall palms lined the beach.', '키 큰 야자나무가 해변에 늘어서 있었다.'],
      ['A palm gives good shade.', '야자나무는 좋은 그늘을 준다.'],
    ]},
  ]},
  { w: 'panel', p: 'n.', s: [
    { m: '판, 위원단', syn: [], ex: [
      ['The door has a glass panel.', '그 문에는 유리판이 있다.'],
      ['A panel of judges chose the winner.', '심사위원단이 우승자를 뽑았다.'],
      ['Solar panels cover the roof.', '태양광 판이 지붕을 덮고 있다.'],
    ]},
  ]},
  { w: 'paradigm', p: 'n.', s: [
    { m: '패러다임, 인식 틀', syn: ['model', 'framework'], ex: [
      ['The discovery caused a paradigm shift.', '그 발견은 패러다임 전환을 가져왔다.'],
      ['We work within an old paradigm.', '우리는 낡은 인식 틀 안에서 일한다.'],
      ['A new paradigm replaced the old one.', '새 패러다임이 옛것을 대체했다.'],
    ]},
  ]},
  { w: 'parallel', p: 'adj.', s: [
    { m: '평행한, 나란한', syn: [], ex: [
      ['The two lines are parallel.', '그 두 선은 평행하다.'],
      ['Parallel roads run along the river.', '나란한 길들이 강을 따라 이어진다.'],
      ['Her story is parallel to mine.', '그녀의 이야기는 내 것과 비슷하다.'],
    ]},
  ]},
  { w: 'parliament', p: 'n.', s: [
    { m: '의회, 국회', syn: ['congress'], ex: [
      ['Parliament passed the new law.', '의회가 새 법을 통과시켰다.'],
      ['She was elected to parliament.', '그녀는 의회에 선출되었다.'],
      ['The parliament building is very old.', '그 의회 건물은 아주 오래되었다.'],
    ]},
  ]},
  { w: 'participate', p: 'v.', s: [
    { m: '참여하다', syn: ['take part', 'join in'], ex: [
      ['All students participated actively.', '모든 학생이 적극적으로 참여했다.'],
      ['She participated in the debate.', '그녀는 그 토론에 참여했다.'],
      ['Everyone is welcome to participate.', '누구나 참여할 수 있다.'],
    ]},
  ]},
  { w: 'particle', p: 'n.', s: [
    { m: '입자, 아주 작은 조각', syn: [], ex: [
      ['Dust particles floated in the light.', '먼지 입자가 빛 속에 떠 있었다.'],
      ['A particle of food stuck in my teeth.', '음식 조각이 이에 끼었다.'],
      ['Scientists study tiny particles.', '과학자들은 아주 작은 입자를 연구한다.'],
    ]},
  ]},
  { w: 'passage', p: 'n.', s: [
    { m: '구절, 통로', syn: [], ex: [
      ['Read the passage twice.', '그 구절을 두 번 읽어라.'],
      ['A narrow passage led to the yard.', '좁은 통로가 마당으로 이어졌다.'],
      ['The passage is hard to understand.', '그 구절은 이해하기 어렵다.'],
    ]},
  ]},
  { w: 'passenger', p: 'n.', s: [
    { m: '승객', syn: [], ex: [
      ['The passenger left his bag.', '그 승객은 가방을 두고 내렸다.'],
      ['Passengers waited on the platform.', '승객들이 승강장에서 기다렸다.'],
      ['The bus carried thirty passengers.', '그 버스는 승객 서른 명을 태웠다.'],
    ]},
  ]},
  { w: 'passion', p: 'n.', s: [
    { m: '열정', syn: ['enthusiasm'], ex: [
      ['She has a passion for music.', '그녀는 음악에 열정을 가지고 있다.'],
      ['His passion for cooking never fades.', '요리를 향한 그의 열정은 식지 않는다.'],
      ['Passion helps you keep going.', '열정은 네가 계속 나아가게 돕는다.'],
    ]},
  ]},
  { w: 'passport', p: 'n.', s: [
    { m: '여권', syn: [], ex: [
      ['Do not lose your passport.', '여권을 잃어버리지 마라.'],
      ['Her passport expires next year.', '그녀의 여권은 내년에 만료된다.'],
      ['Show your passport at the gate.', '탑승구에서 여권을 보여 주세요.'],
    ]},
  ]},
  { w: 'pat', p: 'v.', s: [
    { m: '가볍게 두드리다', syn: ['tap'], ex: [
      ['She patted the dog gently.', '그녀는 개를 부드럽게 토닥였다.'],
      ['He patted my shoulder.', '그는 내 어깨를 가볍게 두드렸다.'],
      ['Pat the dough into a circle.', '반죽을 두드려 둥글게 만들어라.'],
    ]},
  ]},
  { w: 'patch', p: 'n.', s: [
    { m: '조각, 헝겊', syn: [], ex: [
      ['There is a patch of grass here.', '여기에 풀밭 한 조각이 있다.'],
      ['She sewed a patch on the jeans.', '그녀는 청바지에 헝겊을 덧대어 꿰맸다.'],
      ['Patches of snow lay on the hill.', '언덕에 눈이 군데군데 남아 있었다.'],
    ]},
  ]},
  { w: 'patent', p: 'n.', s: [
    { m: '특허', syn: [], ex: [
      ['He filed a patent for the tool.', '그는 그 도구의 특허를 냈다.'],
      ['The patent lasts twenty years.', '그 특허는 이십 년 동안 유효하다.'],
      ['Their patent protects the design.', '그들의 특허가 그 디자인을 보호한다.'],
    ]},
  ]},
  { w: 'pave', p: 'v.', s: [
    { m: '포장하다, 길을 닦다', syn: [], ex: [
      ['They paved the road last summer.', '그들은 지난여름에 그 길을 포장했다.'],
      ['Her work paved the way for others.', '그녀의 일이 다른 사람들의 길을 열었다.'],
      ['Workers pave the yard with stone.', '인부들이 마당을 돌로 포장한다.'],
    ]},
  ]},
  { w: 'peak', p: 'n.', s: [
    { m: '정상, 절정', syn: ['top'], ex: [
      ['Snow covers the peak all year.', '눈이 일 년 내내 그 정상을 덮는다.'],
      ['Traffic reaches its peak at six.', '교통량은 여섯 시에 절정에 이른다.'],
      ['We climbed to the peak by noon.', '우리는 정오까지 정상에 올랐다.'],
    ]},
  ]},
  { w: 'peasant', p: 'n.', s: [
    { m: '농민, 소작농', syn: [], ex: [
      ['The peasant worked from dawn.', '그 농민은 새벽부터 일했다.'],
      ['Peasants owned little land.', '소작농들은 땅이 거의 없었다.'],
      ['A peasant family lived in the hut.', '농민 가족이 그 오두막에 살았다.'],
    ]},
  ]},
  { w: 'peel', p: 'v.', s: [
    { m: '껍질을 벗기다', syn: [], ex: [
      ['Peel the apple before eating.', '먹기 전에 사과 껍질을 벗겨라.'],
      ['She peeled the potatoes quickly.', '그녀는 감자 껍질을 빨리 벗겼다.'],
      ['My skin peels after sunburn.', '햇볕에 타면 피부가 벗겨진다.'],
    ]},
  ]},
  { w: 'peer', p: 'n., v.', s: [
    { m: '또래, 동료', syn: [], ex: [
      ['Her peers respect her.', '또래들이 그녀를 존중한다.'],
      ['Teenagers care about peer opinion.', '십 대는 또래의 의견을 신경 쓴다.'],
      ['He works well with his peers.', '그는 동료들과 잘 지낸다.'],
    ]},
    { m: '유심히 들여다보다', syn: ['stare'], ex: [
      ['She peered into the dark room.', '그녀는 어두운 방을 유심히 들여다보았다.'],
      ['He peered through the window.', '그는 창문 너머를 자세히 살폈다.'],
    ]},
  ]},
  { w: 'penalty', p: 'n.', s: [
    { m: '벌, 벌칙', syn: ['punishment'], ex: [
      ['Late work carries a penalty.', '늦게 낸 과제에는 벌점이 있다.'],
      ['The team lost by a penalty kick.', '그 팀은 페널티 킥으로 졌다.'],
      ['Penalties for speeding are heavy.', '과속에 대한 벌은 무겁다.'],
    ]},
  ]},
  { w: 'perceive', p: 'v.', s: [
    { m: '인식하다, 지각하다', syn: ['notice', 'see'], ex: [
      ['People perceive colors differently.', '사람들은 색을 다르게 인식한다.'],
      ['He perceived a change in her voice.', '그는 그녀의 목소리 변화를 알아챘다.'],
      ['Risk is often perceived as larger than it is.', '위험은 종종 실제보다 크게 인식된다.'],
    ]},
  ]},
  { w: 'permanent', p: 'adj.', s: [
    { m: '영구적인, 변하지 않는', syn: ['lasting'], ex: [
      ['He found a permanent job.', '그는 정규직을 구했다.'],
      ['The stain is permanent.', '그 얼룩은 지워지지 않는다.'],
      ['Nothing here is permanent.', '여기 어떤 것도 영원하지 않다.'],
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
    { m: '영속시키다, 지속시키다', syn: ['keep alive'], ex: [
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
  { w: 'persuade', p: 'v.', s: [
    { m: '설득하다', syn: ['convince'], ex: [
      ['She persuaded me to join.', '그녀는 나를 설득해 함께하게 했다.'],
      ['He could not persuade his parents.', '그는 부모님을 설득하지 못했다.'],
      ['Good facts persuade people.', '좋은 사실은 사람을 설득한다.'],
    ]},
  ]},
  { w: 'petrol', p: 'n.', s: [
    { m: '휘발유 (영국식)', syn: ['gasoline'], ex: [
      ['The car needs petrol.', '그 차는 휘발유가 필요하다.'],
      ['Petrol prices rose again.', '휘발유 값이 또 올랐다.'],
      ['We filled the tank with petrol.', '우리는 연료통을 휘발유로 채웠다.'],
    ]},
  ]},
  { w: 'phase', p: 'n.', s: [
    { m: '단계, 시기', syn: ['stage'], ex: [
      ['The project entered a new phase.', '그 사업은 새 단계에 들어섰다.'],
      ['This phase will last two months.', '이 단계는 두 달 동안 이어진다.'],
      ['Every child goes through this phase.', '모든 아이가 이 시기를 거친다.'],
    ]},
  ]},
  { w: 'phenomenon', p: 'n.', s: [
    { m: '현상', syn: ['event'], ex: [
      ['This is a common phenomenon.', '이것은 흔한 현상이다.'],
      ['Scientists cannot explain the phenomenon.', '과학자들은 그 현상을 설명하지 못한다.'],
      ['Social media is a global phenomenon.', '소셜 미디어는 세계적인 현상이다.'],
    ]},
  ]},
  { w: 'philosophy', p: 'n.', s: [
    { m: '철학', syn: [], ex: [
      ['She studies philosophy at college.', '그녀는 대학에서 철학을 공부한다.'],
      ['His philosophy is simple and kind.', '그의 철학은 단순하고 따뜻하다.'],
      ['Greek philosophy still matters today.', '그리스 철학은 오늘날에도 중요하다.'],
    ]},
  ]},
  { w: 'phrase', p: 'n.', s: [
    { m: '구절, 표현', syn: ['expression'], ex: [
      ['Learn this useful phrase.', '이 유용한 표현을 익혀라.'],
      ['The phrase means good luck.', '그 구절은 행운을 뜻한다.'],
      ['She repeated the phrase slowly.', '그녀는 그 표현을 천천히 되풀이했다.'],
    ]},
  ]},
  { w: 'physics', p: 'n.', s: [
    { m: '물리학', syn: [], ex: [
      ['Physics explains how things move.', '물리학은 사물이 어떻게 움직이는지 설명한다.'],
      ['He teaches physics at our school.', '그는 우리 학교에서 물리를 가르친다.'],
      ['Physics was my favorite subject.', '물리학은 내가 가장 좋아한 과목이었다.'],
    ]},
  ]},
  { w: 'pill', p: 'n.', s: [
    { m: '알약', syn: ['tablet'], ex: [
      ['Take one pill after meals.', '식후에 알약 한 알을 드세요.'],
      ['The pills are in the drawer.', '알약은 서랍에 있다.'],
      ['He swallowed the pill with water.', '그는 물과 함께 알약을 삼켰다.'],
    ]},
  ]},
  { w: 'pinch', p: 'v.', s: [
    { m: '꼬집다, 집다', syn: [], ex: [
      ['Do not pinch your brother.', '동생을 꼬집지 마라.'],
      ['She pinched the dough to seal it.', '그녀는 반죽을 집어 눌러 붙였다.'],
      ['The tight shoes pinched my toes.', '꽉 끼는 신발이 발가락을 조였다.'],
    ]},
  ]},
  { w: 'pioneer', p: 'n.', s: [
    { m: '개척자, 선구자', syn: [], ex: [
      ['She was a pioneer in medicine.', '그녀는 의학의 선구자였다.'],
      ['Pioneers crossed the wide plains.', '개척자들이 넓은 평원을 건넜다.'],
      ['He is a pioneer of green energy.', '그는 친환경 에너지의 개척자다.'],
    ]},
  ]},
  { w: 'platform', p: 'n.', s: [
    { m: '승강장, 연단', syn: [], ex: [
      ['Wait on platform three.', '삼 번 승강장에서 기다리세요.'],
      ['She stood on the platform to speak.', '그녀는 연단에 서서 말했다.'],
      ['The platform was crowded at eight.', '여덟 시에 승강장은 붐볐다.'],
    ]},
  ]},
  { w: 'plausible', p: 'adj.', s: [
    { m: '그럴듯한, 타당해 보이는', syn: ['believable', 'reasonable'], ex: [
      ['That is a plausible explanation.', '그것은 그럴듯한 설명이다.'],
      ['His excuse sounded plausible.', '그의 변명은 그럴듯하게 들렸다.'],
      ['We need a more plausible theory.', '우리는 더 타당한 이론이 필요하다.'],
    ]},
  ]},
  { w: 'plot', p: 'n.', s: [
    { m: '줄거리', syn: [], ex: [
      ['The plot of the film is simple.', '그 영화의 줄거리는 단순하다.'],
      ['I could not follow the plot.', '나는 그 줄거리를 따라가지 못했다.'],
      ['A good plot keeps readers awake.', '좋은 줄거리는 독자를 깨어 있게 한다.'],
    ]},
    { m: '음모, 계략', syn: ['scheme'], ex: [
      ['They discovered a secret plot.', '그들은 비밀 음모를 알아냈다.'],
      ['The plot against the king failed.', '왕을 겨눈 음모는 실패했다.'],
    ]},
  ]},
  { w: 'polish', p: 'v.', s: [
    { m: '닦다, 광을 내다', syn: [], ex: [
      ['Polish your shoes before school.', '학교 가기 전에 신발을 닦아라.'],
      ['He polished the table until it shone.', '그는 탁자가 빛날 때까지 닦았다.'],
      ['She polished her speech twice.', '그녀는 연설문을 두 번 다듬었다.'],
    ]},
  ]},
  { w: 'poll', p: 'n.', s: [
    { m: '여론 조사, 투표', syn: ['survey'], ex: [
      ['A poll showed strong support.', '여론 조사는 강한 지지를 보여 주었다.'],
      ['We ran a poll in our class.', '우리는 반에서 설문을 했다.'],
      ['The poll closes at six.', '투표는 여섯 시에 끝난다.'],
    ]},
  ]},
  { w: 'pond', p: 'n.', s: [
    { m: '연못', syn: [], ex: [
      ['Ducks swim in the pond.', '오리들이 연못에서 헤엄친다.'],
      ['The pond froze in January.', '그 연못은 일월에 얼었다.'],
      ['We fed the fish in the pond.', '우리는 연못의 물고기에게 먹이를 주었다.'],
    ]},
  ]},
  { w: 'populate', p: 'v.', s: [
    { m: '살다, 거주하게 하다', syn: ['inhabit'], ex: [
      ['Fish populate the whole river.', '물고기가 강 전체에 산다.'],
      ['The island is thinly populated.', '그 섬은 인구가 적다.'],
      ['Farmers populated the valley long ago.', '농부들이 오래전에 그 골짜기에 자리를 잡았다.'],
    ]},
  ]},
  { w: 'portion', p: 'n.', s: [
    { m: '부분, 몫', syn: ['part'], ex: [
      ['A large portion of the cake is left.', '케이크의 큰 부분이 남았다.'],
      ['Each child got an equal portion.', '아이마다 똑같은 몫을 받았다.'],
      ['She saves a portion of her pay.', '그녀는 급여의 일부를 저축한다.'],
    ]},
  ]},
  { w: 'portrait', p: 'n.', s: [
    { m: '초상화', syn: [], ex: [
      ['The portrait hangs in the hall.', '그 초상화는 복도에 걸려 있다.'],
      ['He painted a portrait of his mother.', '그는 어머니의 초상화를 그렸다.'],
      ['Old portraits filled the museum.', '오래된 초상화들이 박물관을 채웠다.'],
    ]},
  ]},
  { w: 'pose', p: 'v.', s: [
    { m: '자세를 취하다', syn: [], ex: [
      ['They posed for a photo.', '그들은 사진을 찍으려 자세를 취했다.'],
      ['She posed beside the statue.', '그녀는 조각상 옆에서 자세를 잡았다.'],
      ['Pose naturally and smile.', '자연스럽게 서서 웃으세요.'],
    ]},
    { m: '제기하다, 일으키다', syn: ['present'], ex: [
      ['The plan poses a real problem.', '그 계획은 실제 문제를 일으킨다.'],
      ['Heavy rain posed a danger.', '폭우가 위험을 낳았다.'],
    ]},
  ]},
  { w: 'posit', p: 'v.', s: [
    { m: '가정하다, 상정하다', syn: ['assume'], ex: [
      ['Scientists posit that life began in water.', '과학자들은 생명이 물에서 시작되었다고 본다.'],
      ['He posited a simple answer.', '그는 단순한 답을 내놓았다.'],
      ['The theory posits two causes.', '그 이론은 두 가지 원인을 상정한다.'],
    ]},
  ]},
  { w: 'praise', p: 'v.', s: [
    { m: '칭찬하다', syn: ['compliment'], ex: [
      ['The teacher praised my work.', '선생님이 내 과제를 칭찬했다.'],
      ['She praises her children often.', '그녀는 아이들을 자주 칭찬한다.'],
      ['He was praised for his honesty.', '그는 정직함으로 칭찬받았다.'],
    ]},
  ]},
  { w: 'preach', p: 'v.', s: [
    { m: '설교하다, 훈계하다', syn: [], ex: [
      ['The priest preached about peace.', '그 신부는 평화에 대해 설교했다.'],
      ['Do not preach to me.', '나에게 훈계하지 마라.'],
      ['She preaches kindness every day.', '그녀는 매일 친절을 강조한다.'],
    ]},
  ]},
  { w: 'precede', p: 'v.', s: [
    { m: '앞서다, 먼저 오다', syn: ['come before'], ex: [
      ['A short talk preceded the film.', '짧은 강연이 영화에 앞섰다.'],
      ['Thunder precedes the rain here.', '여기서는 천둥이 비보다 먼저 온다.'],
      ['The letter A precedes B.', '글자 A는 B보다 앞선다.'],
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
  { w: 'predator', p: 'n.', s: [
    { m: '포식자, 천적', syn: [], ex: [
      ['The lion is a strong predator.', '사자는 강한 포식자다.'],
      ['Small birds hide from predators.', '작은 새들은 천적을 피해 숨는다.'],
      ['Predators keep the balance of nature.', '포식자는 자연의 균형을 지킨다.'],
    ]},
  ]},
  { w: 'predict', p: 'v.', s: [
    { m: '예측하다', syn: ['forecast'], ex: [
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
  { w: 'prejudice', p: 'n.', s: [
    { m: '편견', syn: ['bias'], ex: [
      ['Prejudice hurts everyone.', '편견은 모두를 다치게 한다.'],
      ['She fought against prejudice.', '그녀는 편견과 싸웠다.'],
      ['We must judge without prejudice.', '우리는 편견 없이 판단해야 한다.'],
    ]},
  ]},
  { w: 'premium', p: 'n.', s: [
    { m: '추가 요금, 할증금', syn: [], ex: [
      ['You pay a premium for speed.', '빠른 배송에는 추가 요금을 낸다.'],
      ['The premium seats sold out.', '상급 좌석은 매진되었다.'],
      ['Insurance premiums went up.', '보험료가 올랐다.'],
    ]},
  ]},
  { w: 'prescribe', p: 'v.', s: [
    { m: '처방하다, 규정하다', syn: ['order'], ex: [
      ['The doctor prescribed rest.', '의사는 휴식을 처방했다.'],
      ['She prescribed a simple medicine.', '그녀는 간단한 약을 처방했다.'],
      ['The rules prescribe what to wear.', '규정이 무엇을 입을지 정한다.'],
    ]},
  ]},
  { w: 'preserve', p: 'v.', s: [
    { m: '보존하다, 지키다', syn: ['protect', 'conserve'], ex: [
      ['We must preserve our forests.', '우리는 숲을 보존해야 한다.'],
      ['Salt was used to preserve food.', '소금은 음식을 보존하는 데 쓰였다.'],
      ['They preserved the old temple.', '그들은 그 오래된 사찰을 보존했다.'],
    ]},
  ]},
  { w: 'preside', p: 'v.', s: [
    { m: '주재하다, 사회를 보다', syn: [], ex: [
      ['The principal presided over the meeting.', '교장 선생님이 회의를 주재했다.'],
      ['She presides at every ceremony.', '그녀는 모든 행사에서 사회를 본다.'],
      ['He presided calmly through the debate.', '그는 토론 내내 침착하게 진행했다.'],
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
    { m: '만연하다, 우세하다', syn: ['dominate'], ex: [
      ['That custom still prevails in the region.', '그 관습은 그 지역에서 여전히 만연하다.'],
      ['Common sense finally prevailed.', '결국 상식이 이겼다.'],
      ['Silence prevailed in the room.', '방 안에는 침묵이 감돌았다.'],
    ]},
  ]},
  { w: 'prey', p: 'n.', s: [
    { m: '먹이, 사냥감', syn: [], ex: [
      ['The eagle spotted its prey.', '독수리가 먹잇감을 발견했다.'],
      ['Rabbits are prey for foxes.', '토끼는 여우의 먹이다.'],
      ['The prey escaped into the grass.', '사냥감이 풀숲으로 달아났다.'],
    ]},
  ]},
  { w: 'priest', p: 'n.', s: [
    { m: '사제, 성직자', syn: [], ex: [
      ['The priest welcomed the visitors.', '사제가 방문객들을 맞이했다.'],
      ['A young priest led the service.', '젊은 사제가 예배를 이끌었다.'],
      ['Priests lived beside the temple.', '성직자들은 사원 옆에 살았다.'],
    ]},
  ]},
  { w: 'primitive', p: 'adj.', s: [
    { m: '원시의, 초기의', syn: [], ex: [
      ['Primitive tools were made of stone.', '원시 도구는 돌로 만들어졌다.'],
      ['The village looks primitive but works well.', '그 마을은 원시적으로 보이지만 잘 돌아간다.'],
      ['Primitive people painted on cave walls.', '원시인들은 동굴 벽에 그림을 그렸다.'],
    ]},
  ]},
  { w: 'principal', p: 'n., adj.', s: [
    { m: '교장', syn: [], ex: [
      ['Our principal spoke at the ceremony.', '우리 교장 선생님이 행사에서 말씀하셨다.'],
      ['The principal knows every student.', '교장 선생님은 모든 학생을 안다.'],
      ['She became principal last year.', '그녀는 작년에 교장이 되었다.'],
    ]},
    { m: '주요한, 주된', syn: ['main'], ex: [
      ['Rice is their principal food.', '쌀은 그들의 주식이다.'],
      ['The principal reason is money.', '주된 이유는 돈이다.'],
    ]},
  ]},
  { w: 'prior', p: 'adj.', s: [
    { m: '이전의, 사전의', syn: ['previous'], ex: [
      ['You need prior permission.', '너는 사전 허락이 필요하다.'],
      ['He had no prior experience.', '그는 이전 경험이 없었다.'],
      ['A prior meeting decided this.', '앞선 회의에서 이것이 결정되었다.'],
    ]},
  ]},
  { w: 'privilege', p: 'n.', s: [
    { m: '특권, 특별한 기회', syn: ['advantage'], ex: [
      ['Education is a privilege.', '교육은 특권이다.'],
      ['It was a privilege to meet her.', '그녀를 만난 것은 영광이었다.'],
      ['Some students enjoy special privileges.', '일부 학생은 특별한 혜택을 누린다.'],
    ]},
  ]},
  { w: 'professor', p: 'n.', s: [
    { m: '교수', syn: [], ex: [
      ['The professor explained it twice.', '교수님이 그것을 두 번 설명했다.'],
      ['She became a professor at thirty.', '그녀는 서른에 교수가 되었다.'],
      ['Professors met to discuss the plan.', '교수들이 그 계획을 논의하려 모였다.'],
    ]},
  ]},
  { w: 'profile', p: 'n.', s: [
    { m: '옆모습, 개요', syn: [], ex: [
      ['Her profile appeared on the coin.', '그녀의 옆모습이 동전에 새겨졌다.'],
      ['Fill in your profile online.', '온라인에 네 소개를 채워라.'],
      ['The article gives a short profile of him.', '그 기사는 그의 짧은 소개를 담고 있다.'],
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
  { w: 'prompt', p: 'v., adj.', s: [
    { m: '촉발하다, 하게 만들다', syn: ['cause'], ex: [
      ['The photo prompted many questions.', '그 사진은 많은 질문을 불러왔다.'],
      ['Her words prompted him to act.', '그녀의 말이 그를 움직이게 했다.'],
      ['Rain prompted us to go home.', '비 때문에 우리는 집으로 갔다.'],
    ]},
    { m: '즉각적인, 신속한', syn: ['quick'], ex: [
      ['Thank you for your prompt reply.', '신속한 답장 고맙습니다.'],
      ['Prompt action saved the tree.', '즉각적인 조치가 그 나무를 살렸다.'],
    ]},
  ]},
  { w: 'proof', p: 'n.', s: [
    { m: '증거', syn: ['evidence'], ex: [
      ['We have no proof yet.', '우리에게는 아직 증거가 없다.'],
      ['The photo is clear proof.', '그 사진은 확실한 증거다.'],
      ['He asked for proof of payment.', '그는 결제 증거를 요구했다.'],
    ]},
  ]},
  { w: 'proportion', p: 'n.', s: [
    { m: '비율, 부분', syn: ['ratio', 'share'], ex: [
      ['A large proportion of students walk.', '많은 비율의 학생이 걸어 다닌다.'],
      ['The proportion of women rose sharply.', '여성의 비율이 급격히 올랐다.'],
      ['Keep the ingredients in proportion.', '재료를 비율에 맞게 유지해라.'],
    ]},
  ]},
  { w: 'prospect', p: 'n.', s: [
    { m: '전망, 가능성', syn: ['outlook'], ex: [
      ['The prospect of rain worried us.', '비가 올 전망이 우리를 걱정시켰다.'],
      ['Job prospects are good this year.', '올해 취업 전망이 좋다.'],
      ['There is little prospect of change.', '변화의 가능성은 거의 없다.'],
    ]},
  ]},
  { w: 'prosper', p: 'v.', s: [
    { m: '번영하다, 잘 되다', syn: ['thrive'], ex: [
      ['The town prospered after the road opened.', '도로가 뚫린 뒤 그 마을은 번영했다.'],
      ['Small shops prosper in this street.', '이 거리에서는 작은 가게들이 잘 된다.'],
      ['Her business prospered for ten years.', '그녀의 사업은 십 년 동안 번창했다.'],
    ]},
  ]},
  { w: 'protein', p: 'n.', s: [
    { m: '단백질', syn: [], ex: [
      ['Beans are full of protein.', '콩에는 단백질이 가득하다.'],
      ['Athletes need enough protein.', '운동선수는 충분한 단백질이 필요하다.'],
      ['Protein helps muscles grow.', '단백질은 근육이 자라도록 돕는다.'],
    ]},
  ]},
  { w: 'province', p: 'n.', s: [
    { m: '지방, 도', syn: [], ex: [
      ['She grew up in a northern province.', '그녀는 북쪽 지방에서 자랐다.'],
      ['Each province has its own food.', '지방마다 고유한 음식이 있다.'],
      ['The province held an election.', '그 도는 선거를 치렀다.'],
    ]},
  ]},
  { w: 'provoke', p: 'v.', s: [
    { m: '자극하다, 화나게 하다', syn: ['irritate'], ex: [
      ['Do not provoke the dog.', '그 개를 자극하지 마라.'],
      ['His words provoked laughter.', '그의 말은 웃음을 자아냈다.'],
      ['The article provoked a long debate.', '그 기사는 긴 논쟁을 불러왔다.'],
    ]},
  ]},
  { w: 'psychology', p: 'n.', s: [
    { m: '심리학, 심리', syn: [], ex: [
      ['She majors in psychology.', '그녀는 심리학을 전공한다.'],
      ['Psychology explains why we forget.', '심리학은 우리가 왜 잊는지 설명한다.'],
      ['Team psychology matters in sports.', '운동에서는 팀의 심리가 중요하다.'],
    ]},
  ]},
  { w: 'publish', p: 'v.', s: [
    { m: '출판하다, 발표하다', syn: [], ex: [
      ['They published the book in May.', '그들은 오월에 그 책을 출판했다.'],
      ['She published her results online.', '그녀는 결과를 온라인에 발표했다.'],
      ['The school publishes a newsletter.', '그 학교는 소식지를 낸다.'],
    ]},
  ]},
  { w: 'pupil', p: 'n.', s: [
    { m: '학생', syn: ['student'], ex: [
      ['Every pupil wore a name tag.', '학생마다 이름표를 달았다.'],
      ['The pupils lined up quietly.', '학생들이 조용히 줄을 섰다.'],
      ['She was my best pupil.', '그녀는 내 최고의 학생이었다.'],
    ]},
    { m: '눈동자, 동공', syn: [], ex: [
      ['The pupil grows wide in the dark.', '동공은 어두우면 커진다.'],
      ['Light makes the pupil smaller.', '빛은 동공을 작아지게 한다.'],
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
  { w: 'questionnaire', p: 'n.', s: [
    { m: '설문지', syn: [], ex: [
      ['Please fill in the questionnaire.', '설문지를 작성해 주세요.'],
      ['The questionnaire had ten items.', '그 설문지에는 열 문항이 있었다.'],
      ['We collected two hundred questionnaires.', '우리는 설문지 이백 장을 모았다.'],
    ]},
  ]},
  { w: 'rage', p: 'n.', s: [
    { m: '분노, 격노', syn: ['fury'], ex: [
      ['He shook with rage.', '그는 분노로 떨었다.'],
      ['Her rage passed quickly.', '그녀의 분노는 금방 지나갔다.'],
      ['The storm hit with great rage.', '폭풍이 거세게 몰아쳤다.'],
    ]},
  ]},
  { w: 'rally', p: 'n.', s: [
    { m: '집회, 대회', syn: ['gathering'], ex: [
      ['A rally was held in the square.', '광장에서 집회가 열렸다.'],
      ['Students joined the peace rally.', '학생들이 평화 집회에 참여했다.'],
      ['The rally lasted two hours.', '그 집회는 두 시간 동안 이어졌다.'],
    ]},
  ]},
  { w: 'random', p: 'adj.', s: [
    { m: '무작위의, 임의의', syn: [], ex: [
      ['We chose a random number.', '우리는 무작위로 숫자를 골랐다.'],
      ['The order was completely random.', '그 순서는 완전히 무작위였다.'],
      ['She asked a random question.', '그녀는 뜬금없는 질문을 했다.'],
    ]},
  ]},
  { w: 'rank', p: 'n.', s: [
    { m: '순위, 계급', syn: ['position'], ex: [
      ['He rose to a higher rank.', '그는 더 높은 계급으로 올라갔다.'],
      ['Our team holds second rank.', '우리 팀은 2위를 차지하고 있다.'],
      ['Ranks are decided by score.', '순위는 점수로 정해진다.'],
    ]},
  ]},
  { w: 'rational', p: 'adj.', s: [
    { m: '이성적인, 합리적인', syn: ['reasonable'], ex: [
      ['Try to stay rational.', '이성적으로 있으려고 해라.'],
      ['She made a rational choice.', '그녀는 합리적인 선택을 했다.'],
      ['A rational plan needs facts.', '합리적인 계획에는 사실이 필요하다.'],
    ]},
  ]},
  { w: 'raw', p: 'adj.', s: [
    { m: '날것의, 가공하지 않은', syn: ['uncooked'], ex: [
      ['Do not eat raw eggs.', '날달걀을 먹지 마라.'],
      ['The factory buys raw cotton.', '그 공장은 가공하지 않은 목화를 산다.'],
      ['Raw fish is popular here.', '여기서는 회가 인기 있다.'],
    ]},
  ]},
  { w: 'rear', p: 'n., v.', s: [
    { m: '뒤쪽', syn: ['back'], ex: [
      ['The kitchen is at the rear.', '부엌은 뒤쪽에 있다.'],
      ['He sat in the rear of the bus.', '그는 버스 뒤쪽에 앉았다.'],
      ['A garden lies at the rear of the house.', '집 뒤쪽에 정원이 있다.'],
    ]},
    { m: '기르다, 양육하다', syn: ['raise'], ex: [
      ['They reared three children.', '그들은 세 아이를 길렀다.'],
      ['The farmer rears sheep.', '그 농부는 양을 기른다.'],
    ]},
  ]},
  { w: 'rebel', p: 'v.', s: [
    { m: '반항하다, 반란을 일으키다', syn: ['revolt'], ex: [
      ['Teenagers sometimes rebel against rules.', '십 대는 때때로 규칙에 반항한다.'],
      ['The soldiers rebelled in winter.', '군인들은 겨울에 반란을 일으켰다.'],
      ['He rebels whenever he is bored.', '그는 지루할 때마다 반항한다.'],
    ]},
  ]},
  { w: 'receipt', p: 'n.', s: [
    { m: '영수증', syn: [], ex: [
      ['Keep the receipt, please.', '영수증을 보관해 주세요.'],
      ['She lost the receipt.', '그녀는 영수증을 잃어버렸다.'],
      ['Show the receipt to get a refund.', '환불받으려면 영수증을 보여 주세요.'],
    ]},
  ]},
  { w: 'recruit', p: 'v.', s: [
    { m: '모집하다, 뽑다', syn: ['hire'], ex: [
      ['The club recruits new members.', '그 동아리는 새 회원을 모집한다.'],
      ['They recruited ten workers.', '그들은 인부 열 명을 뽑았다.'],
      ['We must recruit a goalkeeper.', '우리는 골키퍼를 뽑아야 한다.'],
    ]},
  ]},
  { w: 'refine', p: 'v.', s: [
    { m: '정제하다, 다듬다', syn: [], ex: [
      ['They refine oil at the plant.', '그들은 그 공장에서 기름을 정제한다.'],
      ['She refined her writing style.', '그녀는 자신의 글쓰기를 다듬었다.'],
      ['We refined the plan after the test.', '우리는 시험 후 계획을 다듬었다.'],
    ]},
  ]},
  { w: 'reform', p: 'v.', s: [
    { m: '개혁하다, 고치다', syn: [], ex: [
      ['The city reformed its bus system.', '그 도시는 버스 체계를 개혁했다.'],
      ['They want to reform the old law.', '그들은 낡은 법을 고치고 싶어 한다.'],
      ['School rules were reformed last year.', '학교 규칙은 작년에 개정되었다.'],
    ]},
  ]},
  { w: 'refrigerate', p: 'v.', s: [
    { m: '냉장하다', syn: [], ex: [
      ['Refrigerate the milk at once.', '우유를 바로 냉장하세요.'],
      ['The meat must be refrigerated.', '그 고기는 냉장해야 한다.'],
      ['She refrigerated the leftovers.', '그녀는 남은 음식을 냉장했다.'],
    ]},
  ]},
  { w: 'refute', p: 'v.', s: [
    { m: '반박하다, 논박하다', syn: ['disprove'], ex: [
      ['The evidence refutes his claim.', '그 증거는 그의 주장을 반박한다.'],
      ['She refuted every point.', '그녀는 모든 논점을 반박했다.'],
      ['No one could refute the argument.', '아무도 그 논증을 반박할 수 없었다.'],
    ]},
  ]},
  { w: 'regardless of', p: 'phr.', s: [
    { m: '~과 관계없이', syn: ['in spite of'], ex: [
      ['Everyone is welcome regardless of age.', '나이와 관계없이 누구나 환영이다.'],
      ['We will go regardless of the weather.', '날씨와 상관없이 우리는 갈 것이다.'],
      ['She spoke up regardless of the risk.', '그녀는 위험과 관계없이 목소리를 냈다.'],
    ]},
  ]},
  { w: 'regret', p: 'v.', s: [
    { m: '후회하다', syn: [], ex: [
      ['I regret nothing.', '나는 아무것도 후회하지 않는다.'],
      ['She regretted her hasty words.', '그녀는 성급한 말을 후회했다.'],
      ['He regrets leaving so early.', '그는 그렇게 일찍 떠난 것을 후회한다.'],
    ]},
  ]},
], 'csat');
