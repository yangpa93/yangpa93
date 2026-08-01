/**
 * 중학교 3학년 레벨 2 — 수록 154 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M3_2 = defineLevel('m3-2', [
  { w: 'despite', p: 'prep.', s: [
    { m: '~에도 불구하고', syn: ['in spite of'], ex: [
      ['Despite the rain, we went out.', '비에도 불구하고 우리는 나갔다.'],
      ['She smiled despite the pain.', '그녀는 아픈데도 미소 지었다.'],
      ['Despite his age, he runs fast.', '나이에도 불구하고 그는 빨리 달린다.'],
    ]},
  ]},
  { w: 'destroy', p: 'v.', s: [
    { m: '파괴하다, 망가뜨리다', syn: ['ruin', 'wreck'], ex: [
      ['The fire destroyed the building.', '화재가 그 건물을 파괴했다.'],
      ['War destroys everything.', '전쟁은 모든 것을 파괴한다.'],
      ['The storm destroyed many trees.', '폭풍이 많은 나무를 쓰러뜨렸다.'],
    ]},
  ]},
  { w: 'detail', p: 'n.', s: [
    { m: '세부 사항', syn: [], ex: [
      ['Tell me every detail.', '세부 사항을 하나도 빠짐없이 말해 줘.'],
      ['She explained the plan in detail.', '그녀는 계획을 자세히 설명했다.'],
      ['One small detail was wrong.', '작은 세부 하나가 틀렸다.'],
    ]},
  ]},
  { w: 'detect', p: 'v.', s: [
    { m: '감지하다, 발견하다', syn: ['discover'], ex: [
      ['The machine detects smoke.', '그 기계는 연기를 감지한다.'],
      ['She detected a change in his voice.', '그녀는 그의 목소리 변화를 알아챘다.'],
      ['Doctors detected the illness early.', '의사들이 병을 일찍 발견했다.'],
    ]},
  ]},
  { w: 'determine', p: 'v.', s: [
    { m: '결정하다, 좌우하다', syn: ['decide', 'shape'], ex: [
      ['Your effort determines the result.', '너의 노력이 결과를 결정한다.'],
      ['Price determines what people buy.', '가격이 사람들이 무엇을 사는지를 좌우한다.'],
    ]},
    { m: '알아내다, 밝히다', syn: ['find out', 'work out'], ex: [
      ['Scientists determined the age of the rock.', '과학자들이 그 암석의 나이를 알아냈다.'],
      ['We must determine what went wrong.', '우리는 무엇이 잘못되었는지 밝혀야 한다.'],
    ]},
  ]},
  { w: 'develop', p: 'v.', s: [
    { m: '발전시키다, 개발하다', syn: ['improve', 'build up'], ex: [
      ['Reading develops your mind.', '독서는 사고력을 발전시킨다.'],
      ['The company developed a new game.', '그 회사는 새 게임을 개발했다.'],
      ['She developed a habit of writing daily.', '그녀는 매일 쓰는 습관을 길렀다.'],
    ]},
  ]},
  { w: 'diary', p: 'n.', s: [
    { m: '일기, 일기장', syn: ['journal'], ex: [
      ['She writes in her diary every night.', '그녀는 매일 밤 일기를 쓴다.'],
      ['My diary is private.', '내 일기장은 비밀이다.'],
      ['He found an old diary.', '그는 오래된 일기장을 발견했다.'],
    ]},
  ]},
  { w: 'dictionary', p: 'n.', s: [
    { m: '사전', syn: [], ex: [
      ['Look it up in the dictionary.', '그것을 사전에서 찾아봐라.'],
      ['This dictionary is easy to use.', '이 사전은 사용하기 쉽다.'],
      ['She bought an English dictionary.', '그녀는 영어 사전을 샀다.'],
    ]},
  ]},
  { w: 'diet', p: 'n.', s: [
    { m: '식단, 식이 요법', syn: [], ex: [
      ['A healthy diet is important.', '건강한 식단이 중요하다.'],
      ['She is on a diet.', '그녀는 다이어트 중이다.'],
      ['Their diet is mostly rice.', '그들의 식단은 대부분 쌀이다.'],
    ]},
  ]},
  { w: 'dig', p: 'v.', s: [
    { m: '파다', syn: [], ex: [
      ['The dog digs in the garden.', '개가 정원을 판다.'],
      ['They dug a hole for the tree.', '그들은 나무 심을 구멍을 팠다.'],
      ['He is digging in the sand.', '그는 모래를 파고 있다.'],
    ]},
  ]},
  { w: 'direct', p: 'adj.', s: [
    { m: '직접적인, 곧바른', syn: ['straight'], ex: [
      ['Take the direct road.', '곧바로 난 길로 가라.'],
      ['She gave a direct answer.', '그녀는 직접적으로 답했다.'],
      ['There is a direct flight to Paris.', '파리로 가는 직항이 있다.'],
    ]},
  ]},
  { w: 'dirt', p: 'n.', s: [
    { m: '먼지, 흙', syn: ['soil'], ex: [
      ['Wash the dirt off your hands.', '손에 묻은 흙을 씻어라.'],
      ['The floor is covered with dirt.', '바닥이 먼지로 덮여 있다.'],
      ['Plants grow in dirt.', '식물은 흙에서 자란다.'],
    ]},
  ]},
  { w: 'disappear', p: 'v.', s: [
    { m: '사라지다', syn: ['vanish', 'go away'], ex: [
      ['The bird disappeared into the woods.', '그 새는 숲속으로 사라졌다.'],
      ['My keys disappeared again.', '내 열쇠가 또 사라졌다.'],
      ['Many species are disappearing fast.', '많은 종이 빠르게 사라지고 있다.'],
    ]},
  ]},
  { w: 'disappoint', p: 'v.', s: [
    { m: '실망시키다', syn: ['let down'], ex: [
      ['Do not disappoint your parents.', '부모님을 실망시키지 마라.'],
      ['The result disappointed us.', '그 결과가 우리를 실망시켰다.'],
      ['She was disappointed by the news.', '그녀는 그 소식에 실망했다.'],
    ]},
  ]},
  { w: 'disc', p: 'n.', s: [
    { m: '원반, 디스크', syn: ['disk'], ex: [
      ['The disc spins very fast.', '그 원반은 아주 빨리 돈다.'],
      ['He put the disc in the player.', '그는 디스크를 플레이어에 넣었다.'],
      ['This disc holds many songs.', '이 디스크에는 노래가 많이 들어 있다.'],
    ]},
  ]},
  { w: 'discipline', p: 'n.', s: [
    { m: '규율, 훈련', syn: [], ex: [
      ['Good discipline helps a team.', '좋은 규율은 팀에 도움이 된다.'],
      ['She learned discipline from sports.', '그녀는 운동에서 규율을 배웠다.'],
      ['Discipline is not punishment.', '규율은 벌이 아니다.'],
    ]},
  ]},
  { w: 'disgust', p: 'v.', s: [
    { m: '역겹게 하다', syn: [], ex: [
      ['The smell disgusted everyone.', '그 냄새가 모두를 역겹게 했다.'],
      ['His behavior disgusts me.', '그의 행동은 나를 역겹게 한다.'],
      ['She was disgusted by the dirty room.', '그녀는 더러운 방에 질렸다.'],
    ]},
  ]},
  { w: 'dish', p: 'n.', s: [
    { m: '접시', syn: ['plate'], ex: [
      ['Please wash the dishes.', '설거지 좀 해 주세요.'],
      ['She broke a dish this morning.', '그녀는 오늘 아침에 접시를 깼다.'],
    ]},
    { m: '요리, 음식', syn: [], ex: [
      ['This dish is my favorite.', '이 요리는 내가 제일 좋아하는 것이다.'],
      ['He cooked three dishes for dinner.', '그는 저녁으로 요리 세 가지를 만들었다.'],
    ]},
  ]},
  { w: 'display', p: 'v.', s: [
    { m: '전시하다, 보여주다', syn: ['show'], ex: [
      ['They display paintings in the hall.', '그들은 복도에 그림을 전시한다.'],
      ['The shop displayed new shoes.', '가게가 새 신발을 진열했다.'],
      ['She displayed great courage.', '그녀는 큰 용기를 보여 주었다.'],
    ]},
  ]},
  { w: 'distance', p: 'n.', s: [
    { m: '거리', syn: [], ex: [
      ['The distance is about ten kilometers.', '거리는 약 10킬로미터이다.'],
      ['Keep a safe distance from the car ahead.', '앞차와 안전거리를 유지해라.'],
      ['We saw a light in the distance.', '우리는 멀리서 불빛을 보았다.'],
    ]},
  ]},
  { w: 'district', p: 'n.', s: [
    { m: '지구, 구역', syn: ['area'], ex: [
      ['This district is very quiet.', '이 지구는 아주 조용하다.'],
      ['He lives in the school district.', '그는 학군 안에 산다.'],
      ['The district built a new park.', '그 구역에 새 공원이 생겼다.'],
    ]},
  ]},
  { w: 'disturb', p: 'v.', s: [
    { m: '방해하다', syn: ['bother'], ex: [
      ['Do not disturb her while she studies.', '그녀가 공부할 때 방해하지 마라.'],
      ['The noise disturbed my sleep.', '소음이 내 잠을 방해했다.'],
      ['He is disturbing the whole class.', '그는 반 전체를 방해하고 있다.'],
    ]},
  ]},
  { w: 'dive', p: 'v.', s: [
    { m: '뛰어들다, 잠수하다', syn: ['plunge'], ex: [
      ['He dived into the pool.', '그는 수영장에 뛰어들었다.'],
      ['She loves to dive in the sea.', '그녀는 바다에서 잠수하기를 좋아한다.'],
      ['Birds dive for fish.', '새들이 물고기를 잡으러 다이빙한다.'],
    ]},
  ]},
  { w: 'divide', p: 'v.', s: [
    { m: '나누다', syn: ['split'], ex: [
      ['Divide the cake into six.', '케이크를 여섯으로 나눠라.'],
      ['The river divides the town.', '그 강이 마을을 나눈다.'],
      ['We divided the work equally.', '우리는 일을 똑같이 나눴다.'],
    ]},
  ]},
  { w: 'divorce', p: 'n.', s: [
    { m: '이혼', syn: [], ex: [
      ['Divorce is never easy.', '이혼은 결코 쉽지 않다.'],
      ['They agreed to a divorce.', '그들은 이혼에 합의했다.'],
      ['The divorce changed her life.', '그 이혼이 그녀의 삶을 바꿨다.'],
    ]},
  ]},
  { w: 'document', p: 'n.', s: [
    { m: '문서, 서류', syn: [], ex: [
      ['Sign this document, please.', '이 문서에 서명해 주세요.'],
      ['She saved the document.', '그녀는 그 문서를 저장했다.'],
      ['The document is very old.', '그 서류는 아주 오래되었다.'],
    ]},
  ]},
  { w: 'dolphin', p: 'n.', s: [
    { m: '돌고래', syn: [], ex: [
      ['Dolphins are very smart.', '돌고래는 아주 영리하다.'],
      ['We saw a dolphin from the boat.', '우리는 배에서 돌고래를 보았다.'],
      ['The dolphin jumped high.', '돌고래가 높이 뛰어올랐다.'],
    ]},
  ]},
  { w: 'domestic', p: 'adj.', s: [
    { m: '국내의, 가정의', syn: [], ex: [
      ['Domestic flights are cheaper.', '국내선이 더 싸다.'],
      ['She does domestic work.', '그녀는 집안일을 한다.'],
      ['Cats are domestic animals.', '고양이는 집에서 기르는 동물이다.'],
    ]},
  ]},
  { w: 'donate', p: 'v.', s: [
    { m: '기부하다', syn: ['give'], ex: [
      ['They donated books to the library.', '그들은 도서관에 책을 기부했다.'],
      ['She donates money every year.', '그녀는 해마다 돈을 기부한다.'],
      ['He is donating his old clothes.', '그는 헌 옷을 기부하고 있다.'],
    ]},
  ]},
  { w: 'doubt', p: 'n.', s: [
    { m: '의심', syn: ['uncertainty'], ex: [
      ['I have no doubt about her.', '나는 그녀를 의심하지 않는다.'],
      ['There is some doubt about the plan.', '그 계획에는 다소 의문이 있다.'],
      ['Doubt slowed his decision.', '의심이 그의 결정을 늦췄다.'],
    ]},
  ]},
  { w: 'dozen', p: 'n.', s: [
    { m: '열두 개, 다스', syn: [], ex: [
      ['She bought a dozen eggs.', '그녀는 달걀 한 다스를 샀다.'],
      ['A dozen students came late.', '열두 명의 학생이 늦게 왔다.'],
      ['We ate a dozen cookies.', '우리는 쿠키 열두 개를 먹었다.'],
    ]},
  ]},
  { w: 'drag', p: 'v.', s: [
    { m: '끌다', syn: ['pull'], ex: [
      ['Do not drag the chair.', '의자를 끌지 마라.'],
      ['He dragged the heavy bag.', '그는 무거운 가방을 끌었다.'],
      ['She is dragging a box across the floor.', '그녀는 상자를 바닥으로 끌고 있다.'],
    ]},
  ]},
  { w: 'drama', p: 'n.', s: [
    { m: '드라마, 연극', syn: ['play'], ex: [
      ['She acts in a school drama.', '그녀는 학교 연극에서 연기한다.'],
      ['This drama is very popular.', '이 드라마는 아주 인기가 있다.'],
      ['The drama moved the audience.', '그 연극이 관객을 감동시켰다.'],
    ]},
  ]},
  { w: 'drug', p: 'n.', s: [
    { m: '약, 마약', syn: ['medicine'], ex: [
      ['The doctor gave me a drug.', '의사가 나에게 약을 주었다.'],
      ['Drugs can be dangerous.', '약은 위험할 수 있다.'],
      ['This drug helps with pain.', '이 약은 통증에 도움이 된다.'],
    ]},
  ]},
  { w: 'due', p: 'adj.', s: [
    { m: '예정된, ~ 때문인', syn: ['expected'], ex: [
      ['The report is due tomorrow.', '보고서는 내일까지다.'],
      ['The delay was due to rain.', '지연은 비 때문이었다.'],
      ['Her baby is due in May.', '그녀의 출산 예정일은 5월이다.'],
    ]},
  ]},
  { w: 'dump', p: 'v.', s: [
    { m: '버리다', syn: ['discard'], ex: [
      ['Do not dump trash here.', '여기에 쓰레기를 버리지 마라.'],
      ['They dumped the old furniture.', '그들은 낡은 가구를 버렸다.'],
      ['He is dumping water in the sink.', '그는 싱크대에 물을 버리고 있다.'],
    ]},
  ]},
  { w: 'dust', p: 'n.', s: [
    { m: '먼지', syn: ['dirt'], ex: [
      ['Dust covered the table.', '먼지가 탁자를 덮었다.'],
      ['She wiped the dust away.', '그녀는 먼지를 닦아 냈다.'],
      ['Dust makes me sneeze.', '먼지 때문에 재채기가 난다.'],
    ]},
  ]},
  { w: 'duty', p: 'n.', s: [
    { m: '의무, 임무', syn: ['obligation'], ex: [
      ['It is your duty to help.', '돕는 것이 네 의무다.'],
      ['She did her duty well.', '그녀는 임무를 잘 수행했다.'],
      ['Every citizen has duties.', '모든 시민에게는 의무가 있다.'],
    ]},
  ]},
  { w: 'each', p: 'adj.', s: [
    { m: '각각의', syn: ['every'], ex: [
      ['Each student has a book.', '학생마다 책이 한 권씩 있다.'],
      ['Give one to each child.', '아이마다 하나씩 줘라.'],
      ['Each answer is worth two points.', '각 답은 2점짜리다.'],
    ]},
  ]},
  { w: 'earn', p: 'v.', s: [
    { m: '벌다, 얻다', syn: ['gain'], ex: [
      ['She earns money by teaching.', '그녀는 가르쳐서 돈을 번다.'],
      ['He earned everyone\'s trust.', '그는 모두의 신뢰를 얻었다.'],
      ['They are earning enough to live.', '그들은 살 만큼 벌고 있다.'],
    ]},
  ]},
  { w: 'ease', p: 'n.', s: [
    { m: '쉬움, 편안함', syn: [], ex: [
      ['She solved it with ease.', '그녀는 그것을 쉽게 풀었다.'],
      ['He walked with ease.', '그는 편안하게 걸었다.'],
      ['Ease of use matters most.', '쓰기 쉬운 것이 가장 중요하다.'],
    ]},
  ]},
  { w: 'economy', p: 'n.', s: [
    { m: '경제', syn: [], ex: [
      ['The economy is growing.', '경제가 성장하고 있다.'],
      ['A weak economy hurts everyone.', '약한 경제는 모두를 힘들게 한다.'],
      ['They study the world economy.', '그들은 세계 경제를 연구한다.'],
    ]},
  ]},
  { w: 'edge', p: 'n.', s: [
    { m: '가장자리, 모서리', syn: [], ex: [
      ['Do not sit on the edge.', '가장자리에 앉지 마라.'],
      ['The knife has a sharp edge.', '그 칼은 날이 날카롭다.'],
      ['She stood at the edge of the water.', '그녀는 물가에 섰다.'],
    ]},
  ]},
  { w: 'edit', p: 'v.', s: [
    { m: '편집하다, 고치다', syn: ['revise'], ex: [
      ['She edited my writing.', '그녀가 내 글을 고쳐 주었다.'],
      ['He edits videos for fun.', '그는 취미로 영상을 편집한다.'],
      ['Please edit this before sending.', '보내기 전에 이것을 고쳐 주세요.'],
    ]},
  ]},
  { w: 'educate', p: 'v.', s: [
    { m: '교육하다', syn: ['teach'], ex: [
      ['Schools educate young people.', '학교는 젊은이를 교육한다.'],
      ['She educated her children at home.', '그녀는 아이들을 집에서 교육했다.'],
      ['We must educate everyone about safety.', '우리는 모두에게 안전을 교육해야 한다.'],
    ]},
  ]},
  { w: 'effect', p: 'n.', s: [
    { m: '영향, 결과', syn: ['result'], ex: [
      ['The medicine had a good effect.', '그 약은 좋은 효과가 있었다.'],
      ['Rain had little effect on the game.', '비는 경기에 별 영향을 주지 않았다.'],
      ['Every action has an effect.', '모든 행동에는 결과가 있다.'],
    ]},
  ]},
  { w: 'effective', p: 'adj.', s: [
    { m: '효과적인', syn: ['successful', 'powerful'], ex: [
      ['This method is very effective.', '이 방법은 매우 효과적이다.'],
      ['Washing hands is an effective way to stay healthy.', '손 씻기는 건강을 지키는 효과적인 방법이다.'],
      ['The medicine was effective within hours.', '그 약은 몇 시간 만에 효과가 있었다.'],
    ]},
  ]},
  { w: 'effort', p: 'n.', s: [
    { m: '노력', syn: ['hard work', 'attempt'], ex: [
      ['Success needs effort.', '성공에는 노력이 필요하다.'],
      ['He made an effort to be kind.', '그는 친절하려고 노력했다.'],
      ['Their effort finally paid off.', '그들의 노력이 마침내 결실을 맺었다.'],
    ]},
  ]},
  { w: 'either', p: 'adj., adv.', s: [
    { m: '둘 중 하나의', syn: [], ex: [
      ['Take either book.', '둘 중 아무 책이나 가져가라.'],
      ['Either answer is correct.', '어느 답이든 맞다.'],
      ['She did not come either.', '그녀도 오지 않았다.'],
    ]},
  ]},
  { w: 'elect', p: 'v.', s: [
    { m: '선출하다', syn: ['choose'], ex: [
      ['They elected her as leader.', '그들은 그녀를 대표로 뽑았다.'],
      ['We elect a class president every year.', '우리는 해마다 반장을 뽑는다.'],
      ['He was elected last spring.', '그는 지난봄에 선출되었다.'],
    ]},
  ]},
  { w: 'electric', p: 'adj.', s: [
    { m: '전기의', syn: [], ex: [
      ['This is an electric car.', '이것은 전기차다.'],
      ['The electric light went out.', '전등이 꺼졌다.'],
      ['An electric fan cools the room.', '선풍기가 방을 시원하게 한다.'],
    ]},
  ]},
  { w: 'element', p: 'n.', s: [
    { m: '요소, 성분', syn: ['component'], ex: [
      ['Water has two elements.', '물은 두 원소로 되어 있다.'],
      ['Trust is a key element of friendship.', '신뢰는 우정의 핵심 요소다.'],
      ['Each element plays a role.', '각 요소가 역할을 한다.'],
    ]},
  ]},
  { w: 'else', p: 'adv.', s: [
    { m: '그 밖에, 다른', syn: [], ex: [
      ['Who else is coming?', '또 누가 오니?'],
      ['Is there anything else?', '그 밖에 다른 것이 있나요?'],
      ['Let us try something else.', '다른 것을 시도해 보자.'],
    ]},
  ]},
  { w: 'embarrass', p: 'v.', s: [
    { m: '당황하게 하다', syn: ['shame'], ex: [
      ['Do not embarrass your friend.', '친구를 당황하게 하지 마라.'],
      ['His question embarrassed her.', '그의 질문이 그녀를 당황하게 했다.'],
      ['I was embarrassed by my mistake.', '나는 실수 때문에 창피했다.'],
    ]},
  ]},
  { w: 'emotion', p: 'n.', s: [
    { m: '감정', syn: ['feeling'], ex: [
      ['She hid her emotions.', '그녀는 감정을 숨겼다.'],
      ['Music can stir strong emotions.', '음악은 강한 감정을 불러일으킬 수 있다.'],
      ['He spoke without showing emotion.', '그는 감정을 드러내지 않고 말했다.'],
    ]},
  ]},
  { w: 'emphasize', p: 'v.', s: [
    { m: '강조하다', syn: ['stress', 'highlight'], ex: [
      ['She emphasized the deadline.', '그녀는 마감일을 강조했다.'],
      ['The teacher emphasized reading daily.', '선생님은 매일 읽기를 강조하셨다.'],
      ['He emphasized that safety comes first.', '그는 안전이 우선이라고 강조했다.'],
    ]},
  ]},
  { w: 'empire', p: 'n.', s: [
    { m: '제국', syn: [], ex: [
      ['The empire lasted five hundred years.', '그 제국은 500년 동안 이어졌다.'],
      ['An empire needs strong roads.', '제국은 튼튼한 길이 필요하다.'],
      ['The empire fell suddenly.', '그 제국은 갑자기 무너졌다.'],
    ]},
  ]},
  { w: 'employ', p: 'v.', s: [
    { m: '고용하다', syn: ['hire'], ex: [
      ['The company employs many people.', '그 회사는 많은 사람을 고용한다.'],
      ['They employed her last month.', '그들은 지난달에 그녀를 고용했다.'],
      ['We employ new methods.', '우리는 새 방법을 쓴다.'],
    ]},
  ]},
  { w: 'empty', p: 'adj.', s: [
    { m: '비어 있는', syn: ['vacant'], ex: [
      ['The box is empty.', '그 상자는 비어 있다.'],
      ['There were many empty seats.', '빈자리가 많았다.'],
      ['He drank the glass empty.', '그는 잔을 비웠다.'],
    ]},
  ]},
  { w: 'encourage', p: 'v.', s: [
    { m: '격려하다, 장려하다', syn: [], ex: [
      ['My teacher encouraged me.', '선생님이 나를 격려해 주셨다.'],
      ['The school encourages reading.', '학교는 독서를 장려한다.'],
      ['Her success encouraged others to try.', '그녀의 성공은 다른 이들이 시도하도록 북돋웠다.'],
    ]},
  ]},
  { w: 'enemy', p: 'n.', s: [
    { m: '적', syn: [], ex: [
      ['He has no enemy.', '그에게는 적이 없다.'],
      ['Fear is our worst enemy.', '두려움이 우리의 가장 큰 적이다.'],
      ['The enemy retreated at dawn.', '적이 새벽에 물러났다.'],
    ]},
  ]},
  { w: 'engage', p: 'v.', s: [
    { m: '참여하다, 관여하다', syn: ['take part', 'involve'], ex: [
      ['Students engage in group discussion.', '학생들이 모둠 토론에 참여한다.'],
      ['He rarely engages with strangers.', '그는 낯선 사람과 잘 어울리지 않는다.'],
    ]},
    { m: '(관심을) 사로잡다', syn: ['attract', 'hold'], ex: [
      ['The story engaged my attention.', '그 이야기가 내 주의를 사로잡았다.'],
      ['Good teachers engage their students.', '좋은 교사는 학생들의 흥미를 끈다.'],
    ]},
  ]},
  { w: 'engine', p: 'n.', s: [
    { m: '엔진, 기관', syn: ['motor'], ex: [
      ['The engine makes a strange sound.', '엔진에서 이상한 소리가 난다.'],
      ['He fixed the car engine.', '그는 자동차 엔진을 고쳤다.'],
      ['This engine uses little fuel.', '이 엔진은 연료를 적게 쓴다.'],
    ]},
  ]},
  { w: 'engineer', p: 'n.', s: [
    { m: '기술자, 엔지니어', syn: [], ex: [
      ['She works as an engineer.', '그녀는 엔지니어로 일한다.'],
      ['The engineer designed the bridge.', '그 기술자가 다리를 설계했다.'],
      ['He wants to be an engineer.', '그는 엔지니어가 되고 싶어 한다.'],
    ]},
  ]},
  { w: 'enormous', p: 'adj.', s: [
    { m: '거대한, 막대한', syn: ['huge', 'immense'], ex: [
      ['They spent an enormous amount.', '그들은 막대한 금액을 썼다.'],
      ['The stadium is enormous.', '그 경기장은 거대하다.'],
      ['She showed enormous patience.', '그녀는 엄청난 인내심을 보였다.'],
    ]},
  ]},
  { w: 'entertain', p: 'v.', s: [
    { m: '즐겁게 하다', syn: ['amuse'], ex: [
      ['The clown entertained the children.', '광대가 아이들을 즐겁게 했다.'],
      ['She entertained us with stories.', '그녀는 이야기로 우리를 즐겁게 했다.'],
      ['Music entertains people everywhere.', '음악은 어디서나 사람을 즐겁게 한다.'],
    ]},
  ]},
  { w: 'entire', p: 'adj.', s: [
    { m: '전체의', syn: ['whole'], ex: [
      ['She read the entire book.', '그녀는 책 전체를 읽었다.'],
      ['The entire class agreed.', '반 전체가 동의했다.'],
      ['He spent the entire day outside.', '그는 하루 종일 밖에서 보냈다.'],
    ]},
  ]},
  { w: 'envelope', p: 'n.', s: [
    { m: '봉투', syn: [], ex: [
      ['Put the letter in an envelope.', '편지를 봉투에 넣어라.'],
      ['The envelope was already open.', '봉투가 이미 열려 있었다.'],
      ['She sealed the envelope.', '그녀는 봉투를 봉했다.'],
    ]},
  ]},
  { w: 'equal', p: 'adj.', s: [
    { m: '동등한, 같은', syn: ['same'], ex: [
      ['Everyone has equal rights.', '모든 사람은 동등한 권리를 가진다.'],
      ['Cut the cake into equal pieces.', '케이크를 같은 크기로 잘라라.'],
      ['Women and men should receive equal pay.', '여성과 남성은 동등한 임금을 받아야 한다.'],
    ]},
  ]},
  { w: 'escape', p: 'v.', s: [
    { m: '탈출하다, 벗어나다', syn: ['get away', 'flee'], ex: [
      ['The cat escaped from the box.', '고양이가 상자에서 탈출했다.'],
      ['They escaped through the back door.', '그들은 뒷문으로 탈출했다.'],
      ['We went to the sea to escape the heat.', '우리는 더위를 피해 바다로 갔다.'],
    ]},
  ]},
  { w: 'especial', p: 'adj.', s: [
    { m: '특별한 (문어체)', syn: ['special'], ex: [
      ['He showed especial care.', '그는 특별한 정성을 보였다.'],
      ['This is a matter of especial importance.', '이것은 특별히 중요한 문제다.'],
      ['She has an especial talent for music.', '그녀는 음악에 특별한 재능이 있다.'],
    ]},
  ]},
  { w: 'essay', p: 'n.', s: [
    { m: '수필, 글', syn: ['composition'], ex: [
      ['She wrote a short essay.', '그녀는 짧은 글을 썼다.'],
      ['The essay is due Friday.', '그 글은 금요일까지다.'],
      ['His essay won a prize.', '그의 수필이 상을 받았다.'],
    ]},
  ]},
  { w: 'essential', p: 'adj.', s: [
    { m: '필수적인, 본질적인', syn: ['necessary', 'vital'], ex: [
      ['Water is essential to life.', '물은 생명에 필수적이다.'],
      ['Practice is essential for progress.', '연습은 발전에 필수적이다.'],
      ['It is essential to arrive on time.', '제시간에 도착하는 것이 필수적이다.'],
    ]},
  ]},
  { w: 'establish', p: 'v.', s: [
    { m: '설립하다', syn: ['found', 'set up'], ex: [
      ['The school was established in 1950.', '그 학교는 1950년에 설립되었다.'],
      ['They established a new company.', '그들은 새 회사를 설립했다.'],
    ]},
    { m: '확립하다, 밝히다', syn: ['prove', 'confirm'], ex: [
      ['She established a good reputation.', '그녀는 좋은 평판을 쌓았다.'],
      ['Police established the cause of the fire.', '경찰이 화재 원인을 밝혀냈다.'],
    ]},
  ]},
  { w: 'estimate', p: 'v.', s: [
    { m: '추산하다, 어림하다', syn: ['guess'], ex: [
      ['Estimate the cost first.', '먼저 비용을 어림해 봐라.'],
      ['She estimated the distance.', '그녀는 거리를 어림했다.'],
      ['They estimate the crowd at a thousand.', '그들은 관중을 천 명으로 추산한다.'],
    ]},
  ]},
  { w: 'even', p: 'adv.', s: [
    { m: '~조차, 심지어', syn: [], ex: [
      ['Even a child can do this.', '어린아이조차 이것을 할 수 있다.'],
      ['He did not even say hello.', '그는 인사조차 하지 않았다.'],
      ['She works even on Sundays.', '그녀는 일요일에도 일한다.'],
    ]},
  ]},
  { w: 'event', p: 'n.', s: [
    { m: '사건, 행사', syn: [], ex: [
      ['The school event was fun.', '학교 행사는 재미있었다.'],
      ['A strange event happened.', '이상한 사건이 일어났다.'],
      ['We plan events every month.', '우리는 매달 행사를 계획한다.'],
    ]},
  ]},
  { w: 'ever', p: 'adv.', s: [
    { m: '언젠가, 한 번이라도', syn: [], ex: [
      ['Have you ever been abroad?', '외국에 가 본 적 있니?'],
      ['This is the best day ever.', '역대 최고의 날이다.'],
      ['She rarely ever complains.', '그녀는 거의 불평하지 않는다.'],
    ]},
  ]},
  { w: 'evidence', p: 'n.', s: [
    { m: '증거', syn: ['proof', 'sign'], ex: [
      ['There is no evidence for that claim.', '그 주장에 대한 증거가 없다.'],
      ['New evidence changed the case.', '새 증거가 사건을 바꿔 놓았다.'],
      ['The evidence strongly supports the theory.', '그 증거는 이 이론을 강하게 뒷받침한다.'],
    ]},
  ]},
  { w: 'evil', p: 'adj.', s: [
    { m: '악한, 사악한', syn: ['wicked'], ex: [
      ['The story has an evil king.', '그 이야기에는 사악한 왕이 나온다.'],
      ['Evil deeds bring pain.', '악한 행동은 고통을 부른다.'],
      ['She saw an evil look in his eyes.', '그녀는 그의 눈에서 사악한 기색을 봤다.'],
    ]},
  ]},
  { w: 'exact', p: 'adj.', s: [
    { m: '정확한', syn: ['precise', 'accurate'], ex: [
      ['Tell me the exact time.', '정확한 시간을 말해 줘.'],
      ['I need the exact number.', '나는 정확한 숫자가 필요하다.'],
      ['That is the exact word I was looking for.', '그것이 내가 찾던 바로 그 단어이다.'],
    ]},
  ]},
  { w: 'examine', p: 'v.', s: [
    { m: '조사하다, 검사하다', syn: ['inspect', 'check'], ex: [
      ['The doctor examined my eyes.', '의사가 내 눈을 검사했다.'],
      ['Examine the evidence carefully.', '증거를 주의 깊게 조사해라.'],
      ['They examined the machine for damage.', '그들은 기계에 손상이 있는지 검사했다.'],
    ]},
  ]},
  { w: 'except', p: 'prep.', s: [
    { m: '~을 제외하고', syn: ['apart from'], ex: [
      ['Everyone came except him.', '그를 제외하고 모두 왔다.'],
      ['The shop opens daily except Sunday.', '그 가게는 일요일만 빼고 매일 연다.'],
      ['I like all fruit except lemons.', '나는 레몬 말고는 모든 과일을 좋아한다.'],
    ]},
  ]},
  { w: 'exchange', p: 'v.', s: [
    { m: '교환하다', syn: ['swap'], ex: [
      ['We exchanged gifts.', '우리는 선물을 교환했다.'],
      ['She exchanged the shirt for a bigger one.', '그녀는 셔츠를 더 큰 것으로 바꿨다.'],
      ['They exchange letters every month.', '그들은 매달 편지를 주고받는다.'],
    ]},
  ]},
  { w: 'excite', p: 'v.', s: [
    { m: '흥분시키다, 설레게 하다', syn: ['thrill'], ex: [
      ['The news excited everyone.', '그 소식이 모두를 설레게 했다.'],
      ['Travel excites her.', '여행은 그녀를 설레게 한다.'],
      ['The game excited the crowd.', '그 경기가 관중을 흥분시켰다.'],
    ]},
  ]},
  { w: 'excuse', p: 'n.', s: [
    { m: '변명, 이유', syn: [], ex: [
      ['That is a poor excuse.', '그것은 궁색한 변명이다.'],
      ['She had a good excuse.', '그녀에게는 그럴 만한 이유가 있었다.'],
      ['Do not make an excuse.', '변명하지 마라.'],
    ]},
  ]},
  { w: 'exhaust', p: 'v.', s: [
    { m: '지치게 하다, 다 쓰다', syn: ['tire out'], ex: [
      ['The long walk exhausted us.', '긴 산책이 우리를 지치게 했다.'],
      ['We exhausted our water supply.', '우리는 물을 다 써 버렸다.'],
      ['She looked exhausted after work.', '그녀는 일 후에 지쳐 보였다.'],
    ]},
  ]},
  { w: 'exist', p: 'v.', s: [
    { m: '존재하다', syn: [], ex: [
      ['Do aliens really exist?', '외계인이 정말 존재할까?'],
      ['This custom has existed for centuries.', '이 관습은 수 세기 동안 존재해 왔다.'],
      ['No perfect answer exists.', '완벽한 답은 존재하지 않는다.'],
    ]},
  ]},
  { w: 'exit', p: 'n.', s: [
    { m: '출구', syn: ['way out'], ex: [
      ['Where is the exit?', '출구가 어디인가요?'],
      ['The exit is on your left.', '출구는 왼쪽에 있다.'],
      ['He ran toward the exit.', '그는 출구 쪽으로 달렸다.'],
    ]},
  ]},
  { w: 'expand', p: 'v.', s: [
    { m: '확장하다, 넓히다', syn: ['grow', 'extend'], ex: [
      ['The company expanded overseas.', '그 회사는 해외로 확장했다.'],
      ['Metal expands when heated.', '금속은 가열하면 팽창한다.'],
      ['Reading expands your vocabulary.', '독서는 어휘를 넓혀 준다.'],
    ]},
  ]},
  { w: 'expect', p: 'v.', s: [
    { m: '기대하다, 예상하다', syn: ['anticipate', 'look forward to'], ex: [
      ['I expect good news.', '나는 좋은 소식을 기대한다.'],
      ['We expect rain this weekend.', '이번 주말에 비가 올 것으로 예상한다.'],
      ['She did better than we expected.', '그녀는 우리가 예상한 것보다 잘했다.'],
    ]},
  ]},
  { w: 'expense', p: 'n.', s: [
    { m: '비용, 지출', syn: ['cost'], ex: [
      ['The trip was a big expense.', '그 여행은 큰 비용이었다.'],
      ['We cut our monthly expenses.', '우리는 월 지출을 줄였다.'],
      ['Travel expenses are paid by the school.', '여행 비용은 학교가 낸다.'],
    ]},
  ]},
  { w: 'experience', p: 'n., v.', s: [
    { m: '경험; 경험하다', syn: [], ex: [
      ['It was a great experience.', '그것은 훌륭한 경험이었다.'],
      ['He has ten years of experience.', '그는 10년의 경력이 있다.'],
      ['We experienced heavy snow last winter.', '우리는 지난겨울 폭설을 경험했다.'],
    ]},
  ]},
  { w: 'experiment', p: 'n.', s: [
    { m: '실험', syn: ['test'], ex: [
      ['We did an experiment in class.', '우리는 수업에서 실험을 했다.'],
      ['The experiment failed twice.', '그 실험은 두 번 실패했다.'],
      ['Her experiment proved the idea.', '그녀의 실험이 그 생각을 증명했다.'],
    ]},
  ]},
  { w: 'expert', p: 'n.', s: [
    { m: '전문가', syn: ['specialist'], ex: [
      ['She is an expert on birds.', '그녀는 새 전문가다.'],
      ['Ask an expert for advice.', '전문가에게 조언을 구해라.'],
      ['The expert explained it simply.', '전문가가 그것을 쉽게 설명했다.'],
    ]},
  ]},
  { w: 'explain', p: 'v.', s: [
    { m: '설명하다', syn: ['describe', 'make clear'], ex: [
      ['Can you explain this rule?', '이 규칙을 설명해 줄 수 있니?'],
      ['She explained the problem step by step.', '그녀는 문제를 단계별로 설명했다.'],
      ['Let me explain why I was late.', '내가 왜 늦었는지 설명할게.'],
    ]},
  ]},
  { w: 'expose', p: 'v.', s: [
    { m: '드러내다, 노출시키다', syn: ['reveal'], ex: [
      ['Do not expose your skin to the sun.', '피부를 햇볕에 노출시키지 마라.'],
      ['The report exposed the truth.', '그 보고서가 진실을 드러냈다.'],
      ['Children are exposed to many words.', '아이들은 많은 단어에 노출된다.'],
    ]},
  ]},
  { w: 'express', p: 'v.', s: [
    { m: '표현하다, 나타내다', syn: ['show', 'convey'], ex: [
      ['Music expresses feelings.', '음악은 감정을 표현한다.'],
      ['He expressed his thanks in a letter.', '그는 편지로 감사를 표현했다.'],
      ['It is hard to express this in English.', '이것을 영어로 표현하기 어렵다.'],
    ]},
  ]},
  { w: 'extend', p: 'v.', s: [
    { m: '늘리다, 연장하다', syn: [], ex: [
      ['They extended the deadline.', '그들은 기한을 연장했다.'],
      ['The road extends to the sea.', '그 길은 바다까지 이어진다.'],
      ['She extended her hand to me.', '그녀는 나에게 손을 내밀었다.'],
    ]},
  ]},
  { w: 'extra', p: 'adj.', s: [
    { m: '추가의, 여분의', syn: ['additional'], ex: [
      ['Bring an extra pen.', '여분의 펜을 가져와라.'],
      ['We paid an extra fee.', '우리는 추가 요금을 냈다.'],
      ['She needs extra time.', '그녀는 시간이 더 필요하다.'],
    ]},
  ]},
  { w: 'extreme', p: 'adj.', s: [
    { m: '극단적인, 극심한', syn: ['severe'], ex: [
      ['The extreme cold closed the school.', '극심한 추위로 학교가 문을 닫았다.'],
      ['Do not take extreme measures.', '극단적인 조치를 취하지 마라.'],
      ['Extreme heat is dangerous.', '극심한 더위는 위험하다.'],
    ]},
  ]},
  { w: 'factor', p: 'n.', s: [
    { m: '요인, 요소', syn: ['element', 'cause'], ex: [
      ['Price is an important factor.', '가격은 중요한 요인이다.'],
      ['Several factors caused the delay.', '여러 요인이 지연을 초래했다.'],
      ['Weather was a key factor in the accident.', '날씨가 그 사고의 핵심 요인이었다.'],
    ]},
  ]},
  { w: 'factory', p: 'n.', s: [
    { m: '공장', syn: [], ex: [
      ['He works in a car factory.', '그는 자동차 공장에서 일한다.'],
      ['The factory makes shoes.', '그 공장은 신발을 만든다.'],
      ['A new factory opened here.', '여기에 새 공장이 문을 열었다.'],
    ]},
  ]},
  { w: 'faint', p: 'adj.', s: [
    { m: '희미한', syn: ['weak'], ex: [
      ['I heard a faint sound.', '나는 희미한 소리를 들었다.'],
      ['There was a faint smell of smoke.', '희미한 연기 냄새가 났다.'],
      ['Her voice grew faint.', '그녀의 목소리가 희미해졌다.'],
    ]},
  ]},
  { w: 'fair', p: 'adj.', s: [
    { m: '공정한', syn: ['just'], ex: [
      ['That is not a fair rule.', '그것은 공정한 규칙이 아니다.'],
      ['She is fair to everyone.', '그녀는 모두에게 공정하다.'],
      ['We want a fair chance.', '우리는 공정한 기회를 원한다.'],
    ]},
  ]},
  { w: 'faith', p: 'n.', s: [
    { m: '믿음, 신뢰', syn: ['belief'], ex: [
      ['She has faith in her students.', '그녀는 학생들을 믿는다.'],
      ['Faith kept him going.', '믿음이 그를 버티게 했다.'],
      ['He lost faith in the plan.', '그는 그 계획에 대한 믿음을 잃었다.'],
    ]},
  ]},
  { w: 'familiar', p: 'adj.', s: [
    { m: '익숙한, 친숙한', syn: ['well-known', 'recognizable'], ex: [
      ['That song sounds familiar.', '그 노래는 익숙하게 들린다.'],
      ['His face looked familiar to me.', '그의 얼굴이 나에게 익숙해 보였다.'],
      ['Are you familiar with this program?', '이 프로그램에 익숙하니?'],
    ]},
  ]},
  { w: 'fancy', p: 'adj.', s: [
    { m: '화려한, 고급의', syn: [], ex: [
      ['They ate at a fancy restaurant.', '그들은 고급 식당에서 먹었다.'],
      ['She wore a fancy dress.', '그녀는 화려한 드레스를 입었다.'],
      ['We do not need a fancy plan.', '우리에게 거창한 계획은 필요 없다.'],
    ]},
  ]},
  { w: 'fantastic', p: 'adj.', s: [
    { m: '환상적인, 훌륭한', syn: ['wonderful'], ex: [
      ['The show was fantastic.', '그 공연은 환상적이었다.'],
      ['She did a fantastic job.', '그녀는 훌륭하게 해냈다.'],
      ['We had fantastic weather.', '우리는 아주 좋은 날씨를 만났다.'],
    ]},
  ]},
  { w: 'fascinate', p: 'v.', s: [
    { m: '매혹하다', syn: ['charm'], ex: [
      ['The story fascinated the children.', '그 이야기가 아이들을 매혹했다.'],
      ['Space fascinates him.', '우주는 그를 매혹한다.'],
      ['She was fascinated by the painting.', '그녀는 그 그림에 매료되었다.'],
    ]},
  ]},
  { w: 'fashion', p: 'n.', s: [
    { m: '유행, 패션', syn: ['style'], ex: [
      ['This fashion changes every year.', '이 유행은 해마다 바뀐다.'],
      ['She studies fashion design.', '그녀는 패션 디자인을 공부한다.'],
      ['Long coats are in fashion.', '긴 코트가 유행이다.'],
    ]},
  ]},
  { w: 'fault', p: 'n.', s: [
    { m: '잘못, 결점', syn: ['error'], ex: [
      ['It was my fault.', '그것은 내 잘못이었다.'],
      ['Everyone has faults.', '누구에게나 결점이 있다.'],
      ['The fault was not hers.', '그것은 그녀의 잘못이 아니었다.'],
    ]},
  ]},
  { w: 'favor', p: 'n.', s: [
    { m: '호의, 부탁', syn: [], ex: [
      ['May I ask a favor?', '부탁 하나 해도 될까요?'],
      ['She did me a favor.', '그녀가 나에게 호의를 베풀었다.'],
      ['Return the favor someday.', '언젠가 은혜를 갚아라.'],
    ]},
  ]},
  { w: 'favour', p: 'n.', s: [
    { m: '호의, 부탁 (영국식)', syn: ['favor'], ex: [
      ['He asked for a favour.', '그는 부탁을 하나 했다.'],
      ['She granted my favour.', '그녀는 내 부탁을 들어주었다.'],
      ['Do this favour for me.', '나를 위해 이것 좀 해 줘.'],
    ]},
  ]},
  { w: 'fear', p: 'n., v.', s: [
    { m: '두려움; 두려워하다', syn: ['fright', 'dread'], ex: [
      ['He faced his fear bravely.', '그는 용감하게 두려움에 맞섰다.'],
      ['She has a fear of heights.', '그녀는 높은 곳을 두려워한다.'],
      ['Many people fear speaking in public.', '많은 사람이 대중 앞에서 말하기를 두려워한다.'],
    ]},
  ]},
  { w: 'feature', p: 'n.', s: [
    { m: '특징, 기능', syn: ['characteristic'], ex: [
      ['This phone has a new feature.', '이 휴대폰에는 새 기능이 있다.'],
      ['Her best feature is her smile.', '그녀의 가장 좋은 점은 미소다.'],
      ['The feature makes it useful.', '그 기능이 그것을 유용하게 만든다.'],
    ]},
  ]},
  { w: 'fee', p: 'n.', s: [
    { m: '요금, 수수료', syn: ['charge'], ex: [
      ['The entrance fee is five dollars.', '입장료는 5달러다.'],
      ['We paid a small fee.', '우리는 적은 수수료를 냈다.'],
      ['The fee went up this year.', '올해 요금이 올랐다.'],
    ]},
  ]},
  { w: 'feed', p: 'v.', s: [
    { m: '먹이다', syn: [], ex: [
      ['She feeds the birds every day.', '그녀는 매일 새에게 먹이를 준다.'],
      ['He fed the baby some milk.', '그는 아기에게 우유를 먹였다.'],
      ['They are feeding the cows.', '그들은 소에게 먹이를 주고 있다.'],
    ]},
  ]},
  { w: 'fellow', p: 'n.', s: [
    { m: '친구, 동료', syn: ['companion'], ex: [
      ['He is a nice fellow.', '그는 좋은 사람이다.'],
      ['My fellow students helped me.', '동료 학생들이 나를 도왔다.'],
      ['A fellow asked me the time.', '한 남자가 나에게 시간을 물었다.'],
    ]},
  ]},
  { w: 'female', p: 'adj.', s: [
    { m: '여성의, 암컷의', syn: [], ex: [
      ['A female bird sat on the nest.', '암컷 새가 둥지에 앉았다.'],
      ['The female students won.', '여학생들이 이겼다.'],
      ['This is a female lion.', '이것은 암사자다.'],
    ]},
  ]},
  { w: 'fence', p: 'n.', s: [
    { m: '울타리', syn: ['barrier'], ex: [
      ['A fence surrounds the garden.', '울타리가 정원을 둘러싸고 있다.'],
      ['He jumped over the fence.', '그는 울타리를 뛰어넘었다.'],
      ['The fence needs paint.', '울타리에 페인트를 칠해야 한다.'],
    ]},
  ]},
  { w: 'fever', p: 'n.', s: [
    { m: '열', syn: [], ex: [
      ['She has a high fever.', '그녀는 고열이 있다.'],
      ['The fever went down after the medicine.', '약을 먹은 후 열이 내렸다.'],
      ['He stayed home because of a fever.', '그는 열 때문에 집에 있었다.'],
    ]},
  ]},
  { w: 'few', p: 'adj.', s: [
    { m: '적은, 거의 없는', syn: [], ex: [
      ['Few students came today.', '오늘 온 학생이 거의 없다.'],
      ['She has few friends here.', '그녀는 여기 친구가 거의 없다.'],
      ['Only a few seats are left.', '몇 자리밖에 남지 않았다.'],
    ]},
  ]},
  { w: 'figure', p: 'n.', s: [
    { m: '숫자, 인물, 모습', syn: [], ex: [
      ['Write the figure in the box.', '칸에 숫자를 써라.'],
      ['She is a famous figure in science.', '그녀는 과학계의 유명 인물이다.'],
      ['A dark figure stood at the gate.', '어두운 형체가 정문에 서 있었다.'],
    ]},
  ]},
  { w: 'final', p: 'adj.', s: [
    { m: '마지막의, 최종의', syn: ['last'], ex: [
      ['This is the final question.', '이것이 마지막 문제다.'],
      ['The final score was two to one.', '최종 점수는 2 대 1이었다.'],
      ['She made the final decision.', '그녀가 최종 결정을 내렸다.'],
    ]},
  ]},
  { w: 'finance', p: 'n.', s: [
    { m: '재정, 금융', syn: [], ex: [
      ['She studies finance.', '그녀는 금융을 공부한다.'],
      ['The school\'s finance is tight.', '학교 재정이 빠듯하다.'],
      ['Finance decides the whole plan.', '재정이 계획 전체를 좌우한다.'],
    ]},
  ]},
  { w: 'firm', p: 'adj.', s: [
    { m: '단단한, 확고한', syn: ['solid'], ex: [
      ['The ground is firm here.', '여기 땅은 단단하다.'],
      ['She gave a firm answer.', '그녀는 단호하게 답했다.'],
      ['Keep a firm hold on the rope.', '밧줄을 단단히 잡아라.'],
    ]},
  ]},
  { w: 'fit', p: 'v.', s: [
    { m: '맞다, 어울리다', syn: ['suit'], ex: [
      ['This shirt fits me well.', '이 셔츠는 나에게 잘 맞는다.'],
      ['The key does not fit the lock.', '그 열쇠는 자물쇠에 맞지 않는다.'],
      ['These shoes fit perfectly.', '이 신발은 딱 맞는다.'],
    ]},
  ]},
  { w: 'flag', p: 'n.', s: [
    { m: '깃발', syn: ['banner'], ex: [
      ['The flag waved in the wind.', '깃발이 바람에 나부꼈다.'],
      ['They raised the flag slowly.', '그들은 깃발을 천천히 올렸다.'],
      ['Each country has its own flag.', '나라마다 고유한 국기가 있다.'],
    ]},
  ]},
  { w: 'flame', p: 'n.', s: [
    { m: '불꽃, 불길', syn: [], ex: [
      ['The flame burned brightly.', '불꽃이 밝게 탔다.'],
      ['A small flame grew quickly.', '작은 불길이 빠르게 커졌다.'],
      ['She blew out the flame.', '그녀는 불꽃을 껐다.'],
    ]},
  ]},
  { w: 'flash', p: 'n.', s: [
    { m: '번쩍임, 섬광', syn: [], ex: [
      ['A flash of light woke me.', '번쩍이는 빛이 나를 깨웠다.'],
      ['The camera flash was too bright.', '카메라 플래시가 너무 밝았다.'],
      ['In a flash, he was gone.', '순식간에 그는 사라졌다.'],
    ]},
  ]},
  { w: 'flat', p: 'adj.', s: [
    { m: '평평한', syn: ['level'], ex: [
      ['The land here is flat.', '이곳의 땅은 평평하다.'],
      ['Put the paper on a flat surface.', '종이를 평평한 곳에 놓아라.'],
      ['My bicycle has a flat tire.', '내 자전거는 타이어에 바람이 빠졌다.'],
    ]},
  ]},
  { w: 'flight', p: 'n.', s: [
    { m: '비행, 항공편', syn: [], ex: [
      ['Our flight leaves at noon.', '우리 항공편은 정오에 출발한다.'],
      ['The flight took three hours.', '그 비행은 세 시간 걸렸다.'],
      ['She booked a flight to Jeju.', '그녀는 제주행 비행기를 예약했다.'],
    ]},
  ]},
  { w: 'float', p: 'v.', s: [
    { m: '뜨다, 떠다니다', syn: ['drift'], ex: [
      ['Wood floats on water.', '나무는 물에 뜬다.'],
      ['A leaf floated down the river.', '잎 하나가 강을 따라 떠내려갔다.'],
      ['Clouds are floating in the sky.', '구름이 하늘에 떠 있다.'],
    ]},
  ]},
  { w: 'flood', p: 'n.', s: [
    { m: '홍수', syn: [], ex: [
      ['The flood destroyed many houses.', '홍수가 많은 집을 무너뜨렸다.'],
      ['Heavy rain caused a flood.', '폭우가 홍수를 일으켰다.'],
      ['They escaped the flood safely.', '그들은 홍수에서 안전하게 벗어났다.'],
    ]},
  ]},
  { w: 'flow', p: 'v.', s: [
    { m: '흐르다', syn: ['stream'], ex: [
      ['The river flows to the sea.', '강은 바다로 흐른다.'],
      ['Water flowed from the pipe.', '관에서 물이 흘렀다.'],
      ['Traffic is flowing smoothly.', '차량이 원활히 흐르고 있다.'],
    ]},
  ]},
  { w: 'fog', p: 'n.', s: [
    { m: '안개', syn: ['mist'], ex: [
      ['Thick fog covered the road.', '짙은 안개가 길을 덮었다.'],
      ['The fog cleared by noon.', '안개가 정오쯤 걷혔다.'],
      ['We could not drive in the fog.', '우리는 안개 속에서 운전할 수 없었다.'],
    ]},
  ]},
  { w: 'show up', p: 'phr.', s: [
    { m: '나타나다, 모습을 보이다', syn: ['appear', 'turn up'], ex: [
      ['He did not show up at the party.', '그는 파티에 나타나지 않았다.'],
      ['She showed up an hour late.', '그녀는 한 시간 늦게 나타났다.'],
      ['Only three people showed up.', '세 명만 나타났다.'],
    ]},
  ]},
  { w: 'sign up', p: 'phr.', s: [
    { m: '등록하다, 신청하다', syn: ['register'], ex: [
      ['I signed up for the swimming class.', '나는 수영 강좌에 등록했다.'],
      ['She signed up as a volunteer.', '그녀는 자원봉사자로 신청했다.'],
      ['Sign up before the deadline.', '마감 전에 신청하세요.'],
    ]},
  ]},
  { w: 'sit down', p: 'phr.', s: [
    { m: '앉다', syn: [], ex: [
      ['Please sit down and wait.', '앉아서 기다려 주세요.'],
      ['He sat down on the bench.', '그는 벤치에 앉았다.'],
      ['They sat down to eat together.', '그들은 함께 먹으려고 앉았다.'],
    ]},
  ]},
  { w: 'slow down', p: 'phr.', s: [
    { m: '속도를 늦추다', syn: [], ex: [
      ['Slow down, you are driving too fast.', '속도를 줄여, 너무 빨리 달리고 있어.'],
      ['The train slowed down at the curve.', '기차가 굽은 길에서 속도를 늦췄다.'],
      ['He needs to slow down and rest.', '그는 속도를 늦추고 쉬어야 한다.'],
    ]},
  ]},
  { w: 'some of', p: 'phr.', s: [
    { m: '~ 중 일부', syn: [], ex: [
      ['Some of the students were late.', '학생 중 일부가 늦었다.'],
      ['I read some of the book last night.', '나는 어젯밤 그 책의 일부를 읽었다.'],
      ['Some of these apples are rotten.', '이 사과 중 일부는 썩었다.'],
    ]},
  ]},
  { w: 'stand up', p: 'phr.', s: [
    { m: '일어서다', syn: [], ex: [
      ['Everyone stood up when she entered.', '그녀가 들어오자 모두 일어섰다.'],
      ['Stand up straight, please.', '똑바로 서 주세요.'],
      ['He stood up and left the room.', '그는 일어서서 방을 나갔다.'],
    ]},
  ]},
  { w: 'stay up', p: 'phr.', s: [
    { m: '자지 않고 깨어 있다', syn: [], ex: [
      ['She stayed up to finish her homework.', '그녀는 숙제를 끝내려고 자지 않고 있었다.'],
      ['Do not stay up too late.', '너무 늦게까지 깨어 있지 마라.'],
      ['We stayed up watching the stars.', '우리는 별을 보며 밤을 새웠다.'],
    ]},
  ]},
  { w: 'stop by', p: 'phr.', s: [
    { m: '잠깐 들르다', syn: ['drop by'], ex: [
      ['Stop by my office after lunch.', '점심 후에 내 사무실에 잠깐 들러.'],
      ['She stopped by to say hello.', '그녀는 인사하러 잠깐 들렀다.'],
      ['We stopped by the bakery on the way.', '우리는 가는 길에 빵집에 들렀다.'],
    ]},
  ]},
  { w: 'such as', p: 'phr.', s: [
    { m: '~와 같은, 예를 들면', syn: ['like', 'for example'], ex: [
      ['Fruits such as apples are healthy.', '사과 같은 과일은 건강에 좋다.'],
      ['She plays sports such as tennis and golf.', '그녀는 테니스와 골프 같은 운동을 한다.'],
      ['Bring warm clothes such as a scarf.', '목도리 같은 따뜻한 옷을 가져와라.'],
    ]},
  ]},
  { w: 'take a break', p: 'phr.', s: [
    { m: '잠시 쉬다', syn: [], ex: [
      ['Let\'s take a break for ten minutes.', '10분만 쉬자.'],
      ['She took a break after two hours.', '그녀는 두 시간 뒤에 잠시 쉬었다.'],
      ['You should take a break sometimes.', '가끔은 쉬어야 한다.'],
    ]},
  ]},
  { w: 'take a look', p: 'phr.', s: [
    { m: '한번 보다', syn: [], ex: [
      ['Take a look at this photo.', '이 사진 좀 봐.'],
      ['He took a look inside the box.', '그는 상자 안을 들여다보았다.'],
      ['Let me take a look at your work.', '네 작품을 한번 볼게.'],
    ]},
  ]},
  { w: 'take a picture', p: 'phr.', s: [
    { m: '사진을 찍다', syn: [], ex: [
      ['Can you take a picture of us?', '우리 사진 좀 찍어 줄래?'],
      ['She took a picture of the sunset.', '그녀는 노을 사진을 찍었다.'],
      ['He takes a picture every morning.', '그는 매일 아침 사진을 찍는다.'],
    ]},
  ]},
  { w: 'take a rest', p: 'phr.', s: [
    { m: '쉬다, 휴식을 취하다', syn: [], ex: [
      ['You look tired, take a rest.', '피곤해 보인다, 좀 쉬어라.'],
      ['They took a rest under the tree.', '그들은 나무 아래에서 쉬었다.'],
      ['She took a short rest after lunch.', '그녀는 점심 후 잠시 쉬었다.'],
    ]},
  ]},
  { w: 'take a shower', p: 'phr.', s: [
    { m: '샤워하다', syn: [], ex: [
      ['He takes a shower every morning.', '그는 매일 아침 샤워한다.'],
      ['She took a shower after the game.', '그녀는 경기 후에 샤워했다.'],
      ['I will take a shower before dinner.', '저녁 먹기 전에 샤워할게.'],
    ]},
  ]},
  { w: 'take a trip', p: 'phr.', s: [
    { m: '여행을 가다', syn: [], ex: [
      ['We took a trip to the mountains.', '우리는 산으로 여행을 갔다.'],
      ['They take a trip every summer.', '그들은 여름마다 여행을 간다.'],
      ['She wants to take a trip abroad.', '그녀는 해외여행을 가고 싶어 한다.'],
    ]},
  ]},
  { w: 'take away', p: 'phr.', s: [
    { m: '치우다, 가져가다', syn: ['remove'], ex: [
      ['Please take away these dishes.', '이 접시들을 치워 주세요.'],
      ['The waiter took away the empty plates.', '종업원이 빈 접시를 가져갔다.'],
      ['Nothing can take away that memory.', '그 기억은 무엇도 앗아 갈 수 없다.'],
    ]},
  ]},
  { w: 'take back', p: 'phr.', s: [
    { m: '되돌려 받다; (말을) 취소하다', syn: [], ex: [
      ['I take back what I said.', '내가 한 말을 취소한다.'],
      ['She took back the book she lent me.', '그녀는 나에게 빌려준 책을 되가져갔다.'],
      ['He took the shirt back to the store.', '그는 셔츠를 가게에 반품했다.'],
    ]},
  ]},
], 'curriculum');
