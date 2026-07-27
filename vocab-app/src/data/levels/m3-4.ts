/**
 * 중학교 3학년 레벨 4 — 수록 35 / 계획 137개.
 *
 * 난이도 층: 중급(중학 권장)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const M3_4 = defineLevel('m3-4', [
  { w: 'joke', p: 'n., v.', s: [
    { m: '농담, 농담하다', syn: [], ex: [
      ['He told a funny joke.', '그는 재미있는 농담을 했다.'],
      ['Do not take his jokes seriously.', '그의 농담을 진지하게 받아들이지 마라.'],
      ['She was only joking.', '그녀는 그저 농담한 것이었다.'],
    ]},
  ]},
  { w: 'journey', p: 'n.', s: [
    { m: '여행, 여정', syn: ['trip'], ex: [
      ['The journey took three days.', '그 여정은 사흘이 걸렸다.'],
      ['They began a long journey.', '그들은 긴 여행을 시작했다.'],
      ['It was a difficult journey.', '그것은 힘든 여정이었다.'],
    ]},
  ]},
  { w: 'judge', p: 'v., n.', s: [
    { m: '판단하다, 평가하다', syn: ['evaluate', 'assess'], ex: [
      ["Don't judge a book by its cover.", '겉모습으로 판단하지 마라.'],
      ['It is hard to judge who is right.', '누가 옳은지 판단하기 어렵다.'],
    ]},
    { m: '판사, 심사위원', syn: ['referee'], ex: [
      ['The judge listened to both sides.', '판사는 양쪽 이야기를 들었다.'],
      ['She was a judge at the contest.', '그녀는 그 대회의 심사위원이었다.'],
    ]},
  ]},
  { w: 'justify', p: 'v.', s: [
    { m: '정당화하다', syn: ['defend', 'excuse'], ex: [
      ['Nothing can justify cheating.', '어떤 것도 부정행위를 정당화할 수 없다.'],
      ['How do you justify this cost?', '이 비용을 어떻게 정당화하겠니?'],
      ['The results justified our effort.', '결과가 우리 노력을 정당화해 주었다.'],
    ]},
  ]},
  { w: 'knock', p: 'v.', s: [
    { m: '두드리다, 노크하다', syn: ['tap'], ex: [
      ['Please knock before entering.', '들어오기 전에 노크해 주세요.'],
      ['Someone knocked on the door.', '누군가 문을 두드렸다.'],
      ['He is knocking loudly.', '그는 크게 문을 두드리고 있다.'],
    ]},
  ]},
  { w: 'knowledge', p: 'n.', s: [
    { m: '지식', syn: ['understanding', 'learning'], ex: [
      ['He has deep knowledge of history.', '그는 역사에 대한 깊은 지식이 있다.'],
      ['Knowledge grows when you share it.', '지식은 나눌 때 자란다.'],
      ['She has little knowledge of computers.', '그녀는 컴퓨터에 대한 지식이 거의 없다.'],
    ]},
  ]},
  { w: 'lack', p: 'n., v.', s: [
    { m: '부족; 부족하다', syn: ['shortage', 'be short of'], ex: [
      ['A lack of sleep hurts memory.', '수면 부족은 기억력을 해친다.'],
      ['The plan failed for lack of money.', '그 계획은 돈이 부족해 실패했다.'],
      ['He lacks confidence in himself.', '그는 자신감이 부족하다.'],
    ]},
  ]},
  { w: 'laugh', p: 'v.', s: [
    { m: '웃다', syn: ['smile loudly'], ex: [
      ['Everyone laughed at his joke.', '모두가 그의 농담에 웃었다.'],
      ['She could not stop laughing.', '그녀는 웃음을 멈출 수 없었다.'],
      ['Do not laugh at other people.', '남을 비웃지 마라.'],
    ]},
  ]},
  { w: 'lead', p: 'v.', s: [
    { m: '이끌다, 안내하다', syn: ['guide'], ex: [
      ['She leads the school band.', '그녀는 학교 밴드를 이끈다.'],
      ['He led us to the exit.', '그는 우리를 출구로 안내했다.'],
      ['This road leads to the beach.', '이 길은 해변으로 이어진다.'],
    ]},
  ]},
  { w: 'lead to', p: 'phr.', s: [
    { m: '~로 이어지다, 초래하다', syn: ['result in', 'cause'], ex: [
      ['Small habits lead to big changes.', '작은 습관이 큰 변화로 이어진다.'],
      ['Poor sleep can lead to health problems.', '수면 부족은 건강 문제로 이어질 수 있다.'],
      ['This road leads to the beach.', '이 길은 해변으로 이어진다.'],
    ]},
  ]},
  { w: 'leave', p: 'v.', s: [
    { m: '떠나다, 출발하다', syn: ['depart', 'go away'], ex: [
      ['The train leaves at seven.', '기차는 7시에 떠난다.'],
      ['They left for Busan this morning.', '그들은 오늘 아침 부산으로 떠났다.'],
    ]},
    { m: '두고 오다, 남기다', syn: ['forget', 'put'], ex: [
      ['I left my bag in the classroom.', '나는 교실에 가방을 두고 왔다.'],
      ['She left a note on the table.', '그녀는 탁자 위에 쪽지를 남겼다.'],
    ]},
  ]},
  { w: 'lend', p: 'v.', s: [
    { m: '빌려주다', syn: ['loan'], ex: [
      ['Can you lend me your book?', '네 책을 빌려줄 수 있니?'],
      ['He lent me his bike for a day.', '그는 나에게 하루 동안 자전거를 빌려주었다.'],
      ['I never lend money to friends.', '나는 친구에게 돈을 빌려주지 않는다.'],
    ]},
  ]},
  { w: 'limit', p: 'n., v.', s: [
    { m: '한계, 제한; 제한하다', syn: ['restrict', 'cap'], ex: [
      ['There is a limit to my patience.', '내 인내심에는 한계가 있다.'],
      ['The speed limit here is 50.', '이곳의 제한 속도는 50이다.'],
      ['We should limit screen time.', '우리는 화면 보는 시간을 제한해야 한다.'],
    ]},
  ]},
  { w: 'local', p: 'adj.', s: [
    { m: '지역의, 현지의', syn: ['nearby', 'regional'], ex: [
      ['We visited a local market.', '우리는 현지 시장을 방문했다.'],
      ['Try the local food.', '현지 음식을 먹어 봐라.'],
      ['The local library opens at nine.', '지역 도서관은 9시에 문을 연다.'],
    ]},
  ]},
  { w: 'lose', p: 'v.', s: [
    { m: '잃다, 잃어버리다', syn: ['misplace'], ex: [
      ['Do not lose your ticket.', '표를 잃어버리지 마라.'],
      ['She lost her wallet on the bus.', '그녀는 버스에서 지갑을 잃어버렸다.'],
    ]},
    { m: '지다, 패하다', syn: ['be beaten'], ex: [
      ['Our team lost the game.', '우리 팀이 경기에서 졌다.'],
      ['He hates losing.', '그는 지는 것을 싫어한다.'],
    ]},
  ]},
  { w: 'loud', p: 'adj.', s: [
    { m: '(소리가) 큰, 시끄러운', syn: ['noisy'], ex: [
      ['The music is too loud.', '음악이 너무 크다.'],
      ['There was a loud noise outside.', '밖에서 큰 소리가 났다.'],
      ['She spoke in a loud voice.', '그녀는 큰 목소리로 말했다.'],
    ]},
  ]},
  { w: 'machine', p: 'n.', s: [
    { m: '기계', syn: ['device'], ex: [
      ['This machine washes clothes.', '이 기계는 옷을 세탁한다.'],
      ['The machine stopped working suddenly.', '그 기계가 갑자기 멈췄다.'],
      ['A robot is a kind of machine.', '로봇은 일종의 기계이다.'],
    ]},
  ]},
  { w: 'main', p: 'adj.', s: [
    { m: '주요한, 주된', syn: ['chief'], ex: [
      ['What is the main reason?', '주된 이유가 무엇이니?'],
      ['The main gate is closed.', '정문이 닫혀 있다.'],
      ['Rice is the main food in Korea.', '쌀은 한국의 주식이다.'],
    ]},
  ]},
  { w: 'maintain', p: 'v.', s: [
    { m: '유지하다', syn: ['keep', 'preserve'], ex: [
      ['Try to maintain a healthy diet.', '건강한 식단을 유지하도록 해라.'],
      ['They maintained the old building well.', '그들은 그 오래된 건물을 잘 관리했다.'],
      ['He maintained his position for years.', '그는 여러 해 동안 그 자리를 유지했다.'],
    ]},
  ]},
  { w: 'major', p: 'adj., n.', s: [
    { m: '주요한, 중대한', syn: ['main', 'important'], ex: [
      ['That was a major change.', '그것은 주요한 변화였다.'],
      ['Traffic is a major problem in this city.', '교통은 이 도시의 주요 문제이다.'],
    ]},
    { m: '전공', syn: ['field of study'], ex: [
      ['Her major is biology.', '그녀의 전공은 생물학이다.'],
      ['He wants to major in music.', '그는 음악을 전공하고 싶어 한다.'],
    ]},
  ]},
  { w: 'make up for', p: 'phr.', s: [
    { m: '만회하다, 보상하다', syn: ['compensate for', 'offset'], ex: [
      ['He studied hard to make up for lost time.', '그는 잃은 시간을 만회하려고 열심히 공부했다.'],
      ['Nothing can make up for her loss.', '어떤 것도 그녀의 상실을 보상할 수 없다.'],
      ['She made up for the mistake with extra work.', '그녀는 추가 작업으로 실수를 만회했다.'],
    ]},
  ]},
  { w: 'manage', p: 'v.', s: [
    { m: '관리하다, 운영하다', syn: ['run', 'handle'], ex: [
      ['She manages her time well.', '그녀는 시간을 잘 관리한다.'],
      ['He manages a small shop.', '그는 작은 가게를 운영한다.'],
    ]},
    { m: '해내다, 용케 ~하다', syn: ['succeed in'], ex: [
      ['We managed to finish on time.', '우리는 제시간에 마치는 데 성공했다.'],
      ['She managed to open the jar.', '그녀는 겨우 병을 열었다.'],
    ]},
  ]},
  { w: 'matter', p: 'n., v.', s: [
    { m: '문제, 일', syn: ['issue'], ex: [
      ['What is the matter with you?', '무슨 일 있니?'],
      ['This is a serious matter.', '이것은 심각한 문제다.'],
    ]},
    { m: '중요하다', syn: ['be important'], ex: [
      ['Your health matters most.', '네 건강이 가장 중요하다.'],
      ['It does not matter to me.', '그것은 나에게 중요하지 않다.'],
    ]},
  ]},
  { w: 'medicine', p: 'n.', s: [
    { m: '약', syn: ['drug', 'pill'], ex: [
      ['Take this medicine after meals.', '식후에 이 약을 드세요.'],
      ['The medicine tastes bitter.', '그 약은 맛이 쓰다.'],
    ]},
    { m: '의학', syn: [], ex: [
      ['She wants to study medicine.', '그녀는 의학을 공부하고 싶어 한다.'],
      ['Modern medicine has saved many lives.', '현대 의학은 많은 생명을 구했다.'],
    ]},
  ]},
  { w: 'message', p: 'n.', s: [
    { m: '메시지, 전언', syn: ['note'], ex: [
      ['I left a message for her.', '나는 그녀에게 메시지를 남겼다.'],
      ['He sent me a message this morning.', '그는 오늘 아침 나에게 메시지를 보냈다.'],
      ['The message was very short.', '그 메시지는 아주 짧았다.'],
    ]},
  ]},
  { w: 'method', p: 'n.', s: [
    { m: '방법', syn: ['way', 'approach'], ex: [
      ['We used a new teaching method.', '우리는 새 교수법을 사용했다.'],
      ['This method saves a lot of time.', '이 방법은 시간을 많이 절약한다.'],
      ['There are several methods to solve it.', '그것을 푸는 방법은 여러 가지가 있다.'],
    ]},
  ]},
  { w: 'modern', p: 'adj.', s: [
    { m: '현대의, 현대적인', syn: ['up-to-date'], ex: [
      ['This is a modern building.', '이것은 현대적인 건물이다.'],
      ['Modern life is very fast.', '현대 생활은 아주 빠르다.'],
      ['She likes modern art.', '그녀는 현대 미술을 좋아한다.'],
    ]},
  ]},
  { w: 'moment', p: 'n.', s: [
    { m: '순간, 잠깐', syn: ['minute'], ex: [
      ['Please wait a moment.', '잠시만 기다려 주세요.'],
      ['It was the happiest moment of my life.', '그것은 내 인생에서 가장 행복한 순간이었다.'],
      ['He arrived at that moment.', '그는 바로 그 순간에 도착했다.'],
    ]},
  ]},
  { w: 'motivate', p: 'v.', s: [
    { m: '동기를 부여하다', syn: ['inspire', 'encourage'], ex: [
      ['Praise motivates students.', '칭찬은 학생들에게 동기를 부여한다.'],
      ['What motivated you to start?', '무엇이 너를 시작하게 만들었니?'],
      ['A good coach motivates the team.', '좋은 코치는 팀에 동기를 부여한다.'],
    ]},
  ]},
  { w: 'museum', p: 'n.', s: [
    { m: '박물관, 미술관', syn: [], ex: [
      ['We visited the science museum.', '우리는 과학 박물관을 방문했다.'],
      ['The museum is free on Wednesdays.', '그 박물관은 수요일에 무료다.'],
      ['There are old coins in this museum.', '이 박물관에는 옛 동전들이 있다.'],
    ]},
  ]},
  { w: 'narrow', p: 'adj.', s: [
    { m: '좁은', syn: [], ex: [
      ['This road is very narrow.', '이 길은 아주 좁다.'],
      ['We walked down a narrow path.', '우리는 좁은 길을 따라 내려갔다.'],
      ['The door is too narrow for the sofa.', '그 문은 소파가 지나가기에 너무 좁다.'],
    ]},
  ]},
  { w: 'nearly', p: 'adv.', s: [
    { m: '거의', syn: ['almost', 'about'], ex: [
      ['The room was nearly empty.', '그 방은 거의 비어 있었다.'],
      ['I nearly missed the bus.', '나는 버스를 놓칠 뻔했다.'],
      ['Nearly everyone agreed.', '거의 모두가 동의했다.'],
    ]},
  ]},
  { w: 'neighbor', p: 'n.', s: [
    { m: '이웃', syn: [], ex: [
      ['Our neighbor is very kind.', '우리 이웃은 아주 친절하다.'],
      ['She helped her neighbors during the storm.', '그녀는 폭풍 동안 이웃들을 도왔다.'],
      ['A new neighbor moved in yesterday.', '어제 새 이웃이 이사 왔다.'],
    ]},
  ]},
  { w: 'noise', p: 'n.', s: [
    { m: '소음, 시끄러운 소리', syn: ['sound'], ex: [
      ['The noise woke me up.', '소음이 나를 깨웠다.'],
      ['Please do not make noise.', '소음을 내지 마세요.'],
      ['City noise makes it hard to sleep.', '도시 소음 때문에 잠들기 어렵다.'],
    ]},
  ]},
  { w: 'notice', p: 'v., n.', s: [
    { m: '알아차리다', syn: ['see', 'observe'], ex: [
      ['I noticed a small mistake.', '나는 작은 실수를 알아차렸다.'],
      ['Did you notice her new haircut?', '그녀의 새 머리 모양을 알아챘니?'],
    ]},
    { m: '안내문, 공지', syn: ['announcement'], ex: [
      ['There is a notice on the door.', '문에 안내문이 있다.'],
      ['Please read the notice carefully.', '공지를 주의 깊게 읽어 주세요.'],
    ]},
  ]},
], 'curriculum');
