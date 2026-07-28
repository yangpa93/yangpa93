/**
 * 고등학교 3학년 레벨 4 — 수록 136 / 계획 136개.
 *
 * 난이도 층: 고급(고등)
 * 어떤 단어가 이 레벨에 들어가는지는 data/plan.ts 가 정한다.
 * 여기에는 그중 뜻과 예문을 적어 둔 것만 들어 있다.
 */

import { defineLevel } from '../define';

export const H3_4 = defineLevel('h3-4', [
  { w: 'surgery', p: 'n.', s: [
    { m: '수술', syn: ['operation'], ex: [
      ['She had surgery on her knee.', '그녀는 무릎 수술을 받았다.'],
      ['The surgery lasted three hours.', '그 수술은 세 시간 걸렸다.'],
      ['He recovered quickly after surgery.', '그는 수술 후 빠르게 회복했다.'],
    ]},
  ]},
  { w: 'surrender', p: 'v.', s: [
    { m: '항복하다, 넘겨주다', syn: ['give up'], ex: [
      ['The soldiers surrendered at dawn.', '군인들은 새벽에 항복했다.'],
      ['Never surrender to fear.', '두려움에 굴복하지 마라.'],
      ['He surrendered his passport at the desk.', '그는 창구에 여권을 넘겼다.'],
    ]},
  ]},
  { w: 'susceptible', p: 'adj.', s: [
    { m: '~에 취약한, 영향받기 쉬운', syn: ['vulnerable', 'prone'], ex: [
      ['Young children are susceptible to colds.', '어린아이들은 감기에 걸리기 쉽다.'],
      ['The crop is susceptible to disease.', '그 작물은 병에 취약하다.'],
      ['We are all susceptible to advertising.', '우리는 모두 광고에 영향받기 쉽다.'],
    ]},
  ]},
  { w: 'suspend', p: 'v.', s: [
    { m: '중단하다, 매달다', syn: ['halt'], ex: [
      ['They suspended the game because of rain.', '비 때문에 경기가 중단되었다.'],
      ['A lamp was suspended from the ceiling.', '등이 천장에 매달려 있었다.'],
      ['The service was suspended for a day.', '그 서비스는 하루 동안 중단되었다.'],
    ]},
  ]},
  { w: 'sustain', p: 'v.', s: [
    { m: '지속하다, 유지하다', syn: ['maintain', 'keep up'], ex: [
      ['He could not sustain the pace.', '그는 그 속도를 유지할 수 없었다.'],
      ['The forest sustains many species.', '그 숲은 많은 종을 지탱한다.'],
      ['Can we sustain this growth?', '우리가 이 성장을 지속할 수 있을까?'],
    ]},
  ]},
  { w: 'swear', p: 'v.', s: [
    { m: '맹세하다, 단언하다', syn: ['promise'], ex: [
      ['I swear I did not touch it.', '나는 그것을 건드리지 않았다고 맹세한다.'],
      ['He swears he saw a fox.', '그는 여우를 봤다고 단언한다.'],
      ['She swears to tell the truth.', '그녀는 진실을 말하겠다고 맹세한다.'],
    ]},
    { m: '욕을 하다', syn: ['curse'], ex: [
      ['Do not swear in class.', '수업 중에 욕하지 마라.'],
      ['He never swears in front of children.', '그는 아이들 앞에서 절대 욕하지 않는다.'],
    ]},
  ]},
  { w: 'sweat', p: 'n.', s: [
    { m: '땀', syn: [], ex: [
      ['Sweat ran down his face.', '땀이 그의 얼굴을 타고 흘렀다.'],
      ['Her shirt was wet with sweat.', '그녀의 셔츠는 땀으로 젖어 있었다.'],
      ['Cold sweat covered my hands.', '식은땀이 내 손을 덮었다.'],
    ]},
  ]},
  { w: 'swell', p: 'v.', s: [
    { m: '붓다, 부풀다', syn: ['expand'], ex: [
      ['My ankle began to swell.', '내 발목이 붓기 시작했다.'],
      ['The river swells after heavy rain.', '큰비가 오면 강물이 불어난다.'],
      ['The crowd swelled to a thousand.', '군중이 천 명으로 불어났다.'],
    ]},
  ]},
  { w: 'swift', p: 'adj.', s: [
    { m: '빠른, 신속한', syn: ['quick'], ex: [
      ['She gave a swift reply.', '그녀는 신속한 답을 주었다.'],
      ['A swift river runs behind the town.', '빠른 강이 마을 뒤로 흐른다.'],
      ['His swift action saved the boy.', '그의 빠른 행동이 그 소년을 구했다.'],
    ]},
  ]},
  { w: 'symbol', p: 'n.', s: [
    { m: '상징, 기호', syn: ['sign'], ex: [
      ['The dove is a symbol of peace.', '비둘기는 평화의 상징이다.'],
      ['Each symbol has a meaning.', '각 기호에는 뜻이 있다.'],
      ['The flag became a symbol of hope.', '그 깃발은 희망의 상징이 되었다.'],
    ]},
  ]},
  { w: 'sympathy', p: 'n.', s: [
    { m: '동정, 공감', syn: ['compassion'], ex: [
      ['She showed sympathy for the lost dog.', '그녀는 길 잃은 개에게 연민을 보였다.'],
      ['I have great sympathy for him.', '나는 그에게 깊이 공감한다.'],
      ['A little sympathy goes a long way.', '작은 공감이 큰 힘이 된다.'],
    ]},
  ]},
  { w: 'symphony', p: 'n.', s: [
    { m: '교향곡', syn: [], ex: [
      ['The symphony has four movements.', '그 교향곡은 네 악장으로 되어 있다.'],
      ['We heard a symphony by Beethoven.', '우리는 베토벤의 교향곡을 들었다.'],
      ['Her favorite symphony is the ninth.', '그녀가 가장 좋아하는 교향곡은 아홉 번째다.'],
    ]},
  ]},
  { w: 'symptom', p: 'n.', s: [
    { m: '증상, 징후', syn: ['sign'], ex: [
      ['A cough is a common symptom.', '기침은 흔한 증상이다.'],
      ['The symptoms went away in a week.', '증상은 일주일 만에 사라졌다.'],
      ['Tiredness can be a symptom of stress.', '피로는 스트레스의 징후일 수 있다.'],
    ]},
  ]},
  { w: 'tackle', p: 'v.', s: [
    { m: '다루다, 맞붙다', syn: ['deal with'], ex: [
      ['We must tackle this problem now.', '우리는 지금 이 문제를 다뤄야 한다.'],
      ['He tackled the homework first.', '그는 숙제부터 해치웠다.'],
      ['She tackled the player near the line.', '그녀는 선 근처에서 그 선수를 막았다.'],
    ]},
  ]},
  { w: 'tag', p: 'n.', s: [
    { m: '꼬리표, 이름표', syn: ['label'], ex: [
      ['The price tag says ten thousand won.', '가격표에 만 원이라고 쓰여 있다.'],
      ['Write your name on the tag.', '이름표에 이름을 써라.'],
      ['The tags fell off the new coat.', '새 외투에서 꼬리표가 떨어졌다.'],
    ]},
  ]},
  { w: 'take into account', p: 'phr.', s: [
    { m: '고려하다, 참작하다', syn: ['consider', 'allow for'], ex: [
      ['Take the weather into account.', '날씨를 고려해라.'],
      ['We took her age into account.', '우리는 그녀의 나이를 참작했다.'],
      ['You must take costs into account.', '너는 비용을 고려해야 한다.'],
    ]},
  ]},
  { w: 'talent', p: 'n.', s: [
    { m: '재능', syn: ['gift', 'ability'], ex: [
      ['She has a talent for music.', '그녀는 음악에 재능이 있다.'],
      ['His talent surprised everyone.', '그의 재능은 모두를 놀라게 했다.'],
      ['Every child has a special talent.', '모든 아이는 특별한 재능이 있다.'],
    ]},
  ]},
  { w: 'tangible', p: 'adj.', s: [
    { m: '실재하는, 만질 수 있는', syn: ['concrete', 'real'], ex: [
      ['We need tangible results.', '우리는 실질적인 결과가 필요하다.'],
      ['There was no tangible proof.', '만져 볼 수 있는 증거는 없었다.'],
      ['The benefits are tangible and immediate.', '그 이익은 실재하며 즉각적이다.'],
    ]},
  ]},
  { w: 'task', p: 'n.', s: [
    { m: '일, 과제', syn: ['job'], ex: [
      ['The task took two hours.', '그 일은 두 시간이 걸렸다.'],
      ['She finished every task on the list.', '그녀는 목록의 모든 과제를 마쳤다.'],
      ['Cleaning is my daily task.', '청소는 나의 매일 하는 일이다.'],
    ]},
  ]},
  { w: 'tease', p: 'v.', s: [
    { m: '놀리다, 장난치다', syn: [], ex: [
      ['Do not tease your sister.', '여동생을 놀리지 마라.'],
      ['They teased him about his hat.', '그들은 그의 모자를 두고 놀렸다.'],
      ['She teases me in a kind way.', '그녀는 다정하게 나를 놀린다.'],
    ]},
  ]},
  { w: 'telegraph', p: 'n.', s: [
    { m: '전신, 전보', syn: [], ex: [
      ['The telegraph changed how news traveled.', '전신은 소식이 전해지는 방식을 바꾸었다.'],
      ['He sent word by telegraph.', '그는 전신으로 소식을 보냈다.'],
      ['The old telegraph sits in a museum.', '그 낡은 전신기는 박물관에 있다.'],
    ]},
  ]},
  { w: 'temple', p: 'n.', s: [
    { m: '사원, 절', syn: [], ex: [
      ['The temple stands on a hill.', '그 절은 언덕 위에 서 있다.'],
      ['We visited an old temple in Gyeongju.', '우리는 경주의 오래된 절을 찾았다.'],
      ['Temples were built of wood and stone.', '사원은 나무와 돌로 지어졌다.'],
    ]},
    { m: '관자놀이', syn: [], ex: [
      ['He rubbed his temple.', '그는 관자놀이를 문질렀다.'],
      ['A headache started at her temple.', '두통이 그녀의 관자놀이에서 시작되었다.'],
    ]},
  ]},
  { w: 'temporary', p: 'adj.', s: [
    { m: '일시적인, 임시의', syn: ['short-term'], ex: [
      ['This is a temporary fix.', '이것은 임시 수리다.'],
      ['She took a temporary job.', '그녀는 임시 일자리를 얻었다.'],
      ['The pain is only temporary.', '그 통증은 일시적일 뿐이다.'],
    ]},
  ]},
  { w: 'tempt', p: 'v.', s: [
    { m: '유혹하다, 부추기다', syn: [], ex: [
      ['The smell tempted me to eat.', '그 냄새가 나를 먹고 싶게 만들었다.'],
      ['Do not tempt him with sweets.', '단것으로 그를 유혹하지 마라.'],
      ['The sunny day tempted us outside.', '맑은 날씨가 우리를 밖으로 이끌었다.'],
    ]},
  ]},
  { w: 'tenant', p: 'n.', s: [
    { m: '세입자, 임차인', syn: ['renter'], ex: [
      ['The tenant pays rent monthly.', '그 세입자는 매달 집세를 낸다.'],
      ['New tenants moved in yesterday.', '새 세입자들이 어제 이사 왔다.'],
      ['The tenant fixed the broken lamp.', '세입자가 깨진 등을 고쳤다.'],
    ]},
  ]},
  { w: 'tender', p: 'adj.', s: [
    { m: '부드러운, 다정한', syn: ['gentle'], ex: [
      ['The meat is tender and juicy.', '그 고기는 부드럽고 육즙이 많다.'],
      ['She spoke in a tender voice.', '그녀는 다정한 목소리로 말했다.'],
      ['His arm is still tender.', '그의 팔은 아직 아프다.'],
    ]},
  ]},
  { w: 'terminal', p: 'n.', s: [
    { m: '터미널, 종점', syn: ['station'], ex: [
      ['We waited at the bus terminal.', '우리는 버스 터미널에서 기다렸다.'],
      ['The airport terminal was crowded.', '공항 터미널은 붐볐다.'],
      ['This is the last terminal on the line.', '여기가 그 노선의 마지막 종점이다.'],
    ]},
  ]},
  { w: 'terminate', p: 'v.', s: [
    { m: '끝내다, 종료하다', syn: ['end'], ex: [
      ['They terminated the contract.', '그들은 계약을 끝냈다.'],
      ['The line terminates at the river.', '그 노선은 강에서 끝난다.'],
      ['We terminated the call politely.', '우리는 정중하게 통화를 끝냈다.'],
    ]},
  ]},
  { w: 'terrace', p: 'n.', s: [
    { m: '테라스, 계단식 밭', syn: [], ex: [
      ['We ate on the terrace.', '우리는 테라스에서 밥을 먹었다.'],
      ['Rice grows on green terraces.', '초록 계단식 밭에서 벼가 자란다.'],
      ['The terrace faces the sea.', '그 테라스는 바다를 향해 있다.'],
    ]},
  ]},
  { w: 'terrific', p: 'adj.', s: [
    { m: '훌륭한, 아주 좋은', syn: ['great'], ex: [
      ['You did a terrific job.', '너는 아주 잘했다.'],
      ['The view was terrific.', '경치가 훌륭했다.'],
      ['We had a terrific time together.', '우리는 함께 아주 좋은 시간을 보냈다.'],
    ]},
  ]},
  { w: 'territory', p: 'n.', s: [
    { m: '영토, 영역', syn: [], ex: [
      ['The bird defends its territory.', '그 새는 자기 영역을 지킨다.'],
      ['The island is national territory.', '그 섬은 국가의 영토다.'],
      ['New territories were added later.', '새 영토가 나중에 더해졌다.'],
    ]},
  ]},
  { w: 'terror', p: 'n.', s: [
    { m: '공포, 두려움', syn: ['fear'], ex: [
      ['The child screamed in terror.', '그 아이는 공포에 질려 소리쳤다.'],
      ['Terror filled the dark hallway.', '어두운 복도에 두려움이 가득했다.'],
      ['She hid her terror well.', '그녀는 두려움을 잘 숨겼다.'],
    ]},
  ]},
  { w: 'theme', p: 'n.', s: [
    { m: '주제, 테마', syn: ['topic'], ex: [
      ['Friendship is the theme of the book.', '우정이 그 책의 주제다.'],
      ['Each room has a different theme.', '방마다 테마가 다르다.'],
      ['The theme of the festival is water.', '그 축제의 주제는 물이다.'],
    ]},
  ]},
  { w: 'therapy', p: 'n.', s: [
    { m: '치료, 요법', syn: ['treatment'], ex: [
      ['Music therapy helps many patients.', '음악 치료는 많은 환자를 돕는다.'],
      ['She began therapy after the injury.', '그녀는 부상 후 치료를 시작했다.'],
      ['Therapy takes time and patience.', '치료에는 시간과 인내가 필요하다.'],
    ]},
  ]},
  { w: 'thorough', p: 'adj.', s: [
    { m: '철저한, 꼼꼼한', syn: ['complete'], ex: [
      ['She gave the room a thorough clean.', '그녀는 방을 철저히 청소했다.'],
      ['We need a thorough check.', '우리는 꼼꼼한 점검이 필요하다.'],
      ['His thorough notes helped everyone.', '그의 꼼꼼한 필기가 모두에게 도움이 되었다.'],
    ]},
  ]},
  { w: 'thread', p: 'n.', s: [
    { m: '실, 가닥', syn: [], ex: [
      ['Cut the thread with scissors.', '가위로 실을 잘라라.'],
      ['A red thread hung from the sleeve.', '빨간 실이 소매에 늘어져 있었다.'],
      ['She followed the thread of the story.', '그녀는 이야기의 흐름을 따라갔다.'],
    ]},
  ]},
  { w: 'thrill', p: 'n.', s: [
    { m: '전율, 짜릿함', syn: ['excitement'], ex: [
      ['The ride gave us a thrill.', '그 놀이기구는 우리에게 짜릿함을 주었다.'],
      ['He felt a thrill of joy.', '그는 기쁨의 전율을 느꼈다.'],
      ['Thrills are part of the sport.', '짜릿함은 그 운동의 일부다.'],
    ]},
  ]},
  { w: 'thrive', p: 'v.', s: [
    { m: '번영하다, 잘 자라다', syn: ['flourish', 'prosper'], ex: [
      ['These plants thrive in sunlight.', '이 식물들은 햇빛에서 잘 자란다.'],
      ['The business thrived for ten years.', '그 사업은 10년간 번창했다.'],
      ['Some children thrive under pressure.', '어떤 아이들은 압박 속에서 더 잘한다.'],
    ]},
  ]},
  { w: 'thumb', p: 'n.', s: [
    { m: '엄지손가락', syn: [], ex: [
      ['He hurt his thumb.', '그는 엄지손가락을 다쳤다.'],
      ['She held the pen between finger and thumb.', '그녀는 검지와 엄지 사이에 펜을 쥐었다.'],
      ['Both thumbs went up.', '엄지 두 개가 모두 올라갔다.'],
    ]},
  ]},
  { w: 'tick', p: 'v.', s: [
    { m: '똑딱거리다', syn: [], ex: [
      ['The clock ticks all night.', '시계가 밤새 똑딱거린다.'],
      ['My watch ticked softly.', '내 손목시계가 조용히 똑딱거렸다.'],
      ['Something ticked inside the box.', '상자 안에서 무언가 똑딱거렸다.'],
    ]},
    { m: '표시하다, 체크하다 (영국식. 미국식은 check)', syn: ['mark'], ex: [
      ['Tick the correct answer.', '맞는 답에 표시해라.'],
      ['She ticked each item on the list.', '그녀는 목록의 항목마다 표시했다.'],
    ]},
  ]},
  { w: 'timber', p: 'n.', s: [
    { m: '목재', syn: ['wood'], ex: [
      ['The house is built of timber.', '그 집은 목재로 지어졌다.'],
      ['They cut timber in the forest.', '그들은 숲에서 목재를 벤다.'],
      ['Good timber lasts for centuries.', '좋은 목재는 수백 년 간다.'],
    ]},
  ]},
  { w: 'tissue', p: 'n.', s: [
    { m: '조직, 화장지', syn: [], ex: [
      ['Pass me a tissue, please.', '화장지 한 장 건네주세요.'],
      ['Muscle tissue repairs itself.', '근육 조직은 스스로 회복한다.'],
      ['Tissues were scattered on the desk.', '화장지가 책상에 흩어져 있었다.'],
    ]},
  ]},
  { w: 'to some extent', p: 'phr.', s: [
    { m: '어느 정도는', syn: ['partly', 'in part'], ex: [
      ['To some extent, I agree with you.', '어느 정도는 네 말에 동의한다.'],
      ['The rumor is true to some extent.', '그 소문은 어느 정도 사실이다.'],
      ['Success depends on luck to some extent.', '성공은 어느 정도 운에 달려 있다.'],
    ]},
  ]},
  { w: 'torture', p: 'n.', s: [
    { m: '고통, 고문', syn: [], ex: [
      ['Waiting for the result was torture.', '결과를 기다리는 일은 고통이었다.'],
      ['The long heat felt like torture.', '긴 더위는 고통 같았다.'],
      ['Torture is banned by law.', '고문은 법으로 금지되어 있다.'],
    ]},
  ]},
  { w: 'toss', p: 'v.', s: [
    { m: '던지다, 뒤척이다', syn: ['throw'], ex: [
      ['Toss the ball to me.', '공을 나에게 던져라.'],
      ['He tossed the paper into the bin.', '그는 종이를 쓰레기통에 던졌다.'],
      ['She tossed in bed all night.', '그녀는 밤새 뒤척였다.'],
    ]},
  ]},
  { w: 'toxic', p: 'adj.', s: [
    { m: '유독한, 독성의', syn: ['poisonous'], ex: [
      ['Some plants are toxic.', '어떤 식물은 독성이 있다.'],
      ['Toxic smoke filled the room.', '유독한 연기가 방을 채웠다.'],
      ['The paint is not toxic.', '그 물감은 독성이 없다.'],
    ]},
  ]},
  { w: 'tragic', p: 'adj.', s: [
    { m: '비극적인, 참담한', syn: [], ex: [
      ['The accident was tragic.', '그 사고는 비극적이었다.'],
      ['The play has a tragic ending.', '그 연극은 비극적인 결말을 지녔다.'],
      ['It is tragic to waste such talent.', '그런 재능을 버리는 것은 안타깝다.'],
    ]},
  ]},
  { w: 'trail', p: 'n.', s: [
    { m: '오솔길, 자취', syn: ['path'], ex: [
      ['We walked a mountain trail.', '우리는 산길을 걸었다.'],
      ['The trail leads to a small lake.', '그 길은 작은 호수로 이어진다.'],
      ['Footprints left a trail in the snow.', '발자국이 눈 위에 자취를 남겼다.'],
    ]},
    { m: '뒤쫓다, 끌다', syn: ['follow'], ex: [
      ['The dog trailed the scent.', '그 개는 냄새를 뒤쫓았다.'],
      ['Her scarf trailed behind her.', '그녀의 목도리가 뒤로 끌렸다.'],
    ]},
  ]},
  { w: 'transact', p: 'v.', s: [
    { m: '거래하다, 처리하다', syn: [], ex: [
      ['Banks transact business online.', '은행은 온라인으로 거래를 처리한다.'],
      ['They transacted the deal quickly.', '그들은 그 거래를 빠르게 처리했다.'],
      ['We transact with many suppliers.', '우리는 여러 공급자와 거래한다.'],
    ]},
  ]},
  { w: 'transcend', p: 'v.', s: [
    { m: '초월하다, 뛰어넘다', syn: ['go beyond', 'rise above'], ex: [
      ['Music transcends language.', '음악은 언어를 초월한다.'],
      ['Her work transcends its genre.', '그녀의 작품은 그 장르를 뛰어넘는다.'],
      ['Great art transcends time.', '위대한 예술은 시대를 초월한다.'],
    ]},
  ]},
  { w: 'transform', p: 'v.', s: [
    { m: '완전히 바꾸다, 변형시키다', syn: ['change', 'convert'], ex: [
      ['The internet transformed learning.', '인터넷은 학습을 완전히 바꿔 놓았다.'],
      ['The old factory was transformed into a museum.', '그 낡은 공장은 박물관으로 바뀌었다.'],
      ['Exercise transformed his health.', '운동이 그의 건강을 바꿔 놓았다.'],
    ]},
  ]},
  { w: 'transition', p: 'n.', s: [
    { m: '전환, 이행', syn: ['change'], ex: [
      ['The transition to high school was hard.', '고등학교로의 전환은 힘들었다.'],
      ['Autumn is a gentle transition.', '가을은 부드러운 전환기다.'],
      ['The transition took two years.', '그 이행에는 두 해가 걸렸다.'],
    ]},
  ]},
  { w: 'translate', p: 'v.', s: [
    { m: '번역하다, 옮기다', syn: ['interpret'], ex: [
      ['She translated the poem into Korean.', '그녀는 그 시를 한국어로 번역했다.'],
      ['Can you translate this sentence?', '이 문장을 번역해 줄 수 있니?'],
      ['Words do not always translate well.', '말이 늘 잘 옮겨지지는 않는다.'],
    ]},
  ]},
  { w: 'transmit', p: 'v.', s: [
    { m: '전달하다, 전송하다', syn: ['send'], ex: [
      ['Radios transmit sound waves.', '라디오는 음파를 전송한다.'],
      ['The disease transmits through water.', '그 병은 물을 통해 전해진다.'],
      ['The station transmitted the news live.', '그 방송국은 소식을 생중계로 내보냈다.'],
    ]},
  ]},
  { w: 'treasure', p: 'n.', s: [
    { m: '보물, 귀중한 것', syn: [], ex: [
      ['They found treasure in the cave.', '그들은 동굴에서 보물을 발견했다.'],
      ['Old letters are her treasure.', '오래된 편지가 그녀의 보물이다.'],
      ['The museum keeps national treasures.', '그 박물관은 국보를 보관한다.'],
    ]},
  ]},
  { w: 'treaty', p: 'n.', s: [
    { m: '조약, 협정', syn: ['agreement'], ex: [
      ['The two countries signed a treaty.', '두 나라가 조약에 서명했다.'],
      ['The treaty ended the long war.', '그 조약이 긴 전쟁을 끝냈다.'],
      ['Treaties must be kept.', '조약은 지켜져야 한다.'],
    ]},
  ]},
  { w: 'tremendous', p: 'adj.', s: [
    { m: '엄청난, 굉장한', syn: ['huge'], ex: [
      ['She made a tremendous effort.', '그녀는 엄청난 노력을 했다.'],
      ['The noise was tremendous.', '그 소음은 굉장했다.'],
      ['He has tremendous energy.', '그는 엄청난 기운을 가지고 있다.'],
    ]},
  ]},
  { w: 'trend', p: 'n.', s: [
    { m: '경향, 유행', syn: ['tendency'], ex: [
      ['The trend is toward smaller cars.', '경향은 더 작은 차 쪽으로 가고 있다.'],
      ['She follows fashion trends.', '그녀는 유행을 따른다.'],
      ['Trends change every season.', '유행은 철마다 바뀐다.'],
    ]},
  ]},
  { w: 'tribe', p: 'n.', s: [
    { m: '부족, 종족', syn: [], ex: [
      ['The tribe lives near the river.', '그 부족은 강 근처에 산다.'],
      ['Each tribe has its own songs.', '부족마다 고유한 노래가 있다.'],
      ['Ancient tribes traded salt.', '옛 부족들은 소금을 거래했다.'],
    ]},
  ]},
  { w: 'trigger', p: 'v., n.', s: [
    { m: '촉발하다, 유발하다', syn: ['set off', 'cause'], ex: [
      ['The news triggered a debate.', '그 소식은 논쟁을 촉발했다.'],
      ['Dust can trigger allergies.', '먼지는 알레르기를 유발할 수 있다.'],
      ['What triggered the argument?', '무엇이 그 말다툼을 촉발했니?'],
    ]},
  ]},
  { w: 'trim', p: 'v.', s: [
    { m: '다듬다, 손질하다', syn: ['cut'], ex: [
      ['He trimmed the hedge.', '그는 울타리 나무를 다듬었다.'],
      ['She trims her bangs herself.', '그녀는 앞머리를 스스로 다듬는다.'],
      ['Trim the extra paper off.', '남는 종이를 잘라 내라.'],
    ]},
  ]},
  { w: 'triumph', p: 'n.', s: [
    { m: '승리, 큰 성공', syn: ['victory'], ex: [
      ['The concert was a triumph.', '그 연주회는 큰 성공이었다.'],
      ['She raised her arms in triumph.', '그녀는 승리에 두 팔을 들었다.'],
      ['Small triumphs build confidence.', '작은 승리가 자신감을 쌓는다.'],
    ]},
  ]},
  { w: 'troop', p: 'n.', s: [
    { m: '군대, 무리', syn: [], ex: [
      ['The troops marched at dawn.', '군대가 새벽에 행군했다.'],
      ['A troop of monkeys crossed the road.', '원숭이 무리가 길을 건넜다.'],
      ['Troops returned home in spring.', '군대가 봄에 집으로 돌아왔다.'],
    ]},
  ]},
  { w: 'tube', p: 'n.', s: [
    { m: '관, 튜브', syn: ['pipe'], ex: [
      ['Water flows through the tube.', '물이 그 관을 통해 흐른다.'],
      ['Squeeze the tube of paint.', '물감 튜브를 짜라.'],
      ['The tubes were made of glass.', '그 관들은 유리로 만들어졌다.'],
    ]},
  ]},
  { w: 'tunnel', p: 'n.', s: [
    { m: '터널, 굴', syn: ['passage'], ex: [
      ['The train entered a long tunnel.', '기차가 긴 터널로 들어갔다.'],
      ['Ants dig tunnels underground.', '개미는 땅속에 굴을 판다.'],
      ['The tunnel took ten years to build.', '그 터널을 짓는 데 십 년이 걸렸다.'],
    ]},
  ]},
  { w: 'turnover', p: 'n.', s: [
    { m: '매출액, 이직률', syn: [], ex: [
      ['The shop has a high turnover.', '그 가게는 매출이 높다.'],
      ['Staff turnover is a problem here.', '여기서는 직원 이직률이 문제다.'],
      ['Their yearly turnover doubled.', '그들의 연 매출이 두 배가 되었다.'],
    ]},
  ]},
  { w: 'ultimate', p: 'adj.', s: [
    { m: '궁극적인, 최고의', syn: ['final'], ex: [
      ['Her ultimate goal is medicine.', '그녀의 궁극적인 목표는 의학이다.'],
      ['This is the ultimate test.', '이것이 최종 시험이다.'],
      ['Health is the ultimate reward.', '건강이 최고의 보상이다.'],
    ]},
  ]},
  { w: 'undergo', p: 'v.', s: [
    { m: '겪다, 받다', syn: ['go through', 'experience'], ex: [
      ['The city underwent great change.', '그 도시는 큰 변화를 겪었다.'],
      ['He underwent surgery last week.', '그는 지난주에 수술을 받았다.'],
      ['Materials undergo testing before sale.', '재료는 판매 전에 시험을 거친다.'],
    ]},
  ]},
  { w: 'underlie', p: 'v.', s: [
    { m: '기저에 있다, 근거가 되다', syn: [], ex: [
      ['Trust underlies every friendship.', '신뢰가 모든 우정의 바탕에 있다.'],
      ['Simple rules underlie the game.', '단순한 규칙이 그 놀이의 바탕이다.'],
      ['Fear can underlie anger.', '두려움이 분노의 밑바탕일 수 있다.'],
    ]},
  ]},
  { w: 'underlying', p: 'adj.', s: [
    { m: '근본적인, 기저에 있는', syn: ['basic', 'fundamental'], ex: [
      ['We must find the underlying cause.', '우리는 근본 원인을 찾아야 한다.'],
      ['There is an underlying assumption here.', '여기에는 기저에 깔린 가정이 있다.'],
      ['The underlying problem was money.', '근본적인 문제는 돈이었다.'],
    ]},
  ]},
  { w: 'undermine', p: 'v.', s: [
    { m: '약화시키다, 훼손하다', syn: ['weaken', 'damage'], ex: [
      ['Constant criticism undermines confidence.', '끊임없는 비판은 자신감을 약화시킨다.'],
      ['The scandal undermined public trust.', '그 추문은 대중의 신뢰를 훼손했다.'],
      ['Lack of sleep undermines your health.', '수면 부족은 건강을 해친다.'],
    ]},
  ]},
  { w: 'undertake', p: 'v.', s: [
    { m: '착수하다, 맡다', syn: ['take on'], ex: [
      ['They will undertake the repair today.', '그들은 오늘 수리에 착수할 것이다.'],
      ['She undertakes difficult tasks gladly.', '그녀는 어려운 일을 기꺼이 맡는다.'],
      ['We are undertaking a new study.', '우리는 새 연구에 착수하고 있다.'],
    ]},
  ]},
  { w: 'unify', p: 'v.', s: [
    { m: '통합하다, 하나로 만들다', syn: ['unite'], ex: [
      ['The song unified the crowd.', '그 노래가 관중을 하나로 만들었다.'],
      ['They unified the two teams.', '그들은 두 팀을 통합했다.'],
      ['A common goal unifies people.', '공통의 목표가 사람들을 하나로 묶는다.'],
    ]},
  ]},
  { w: 'unique', p: 'adj.', s: [
    { m: '독특한, 유일한', syn: ['special'], ex: [
      ['Every person is unique.', '모든 사람은 저마다 독특하다.'],
      ['This building has a unique shape.', '이 건물은 독특한 모양을 하고 있다.'],
      ['Her voice is truly unique.', '그녀의 목소리는 정말 독특하다.'],
    ]},
  ]},
  { w: 'universe', p: 'n.', s: [
    { m: '우주, 세계', syn: [], ex: [
      ['The universe is still growing.', '우주는 여전히 팽창하고 있다.'],
      ['Stars fill the universe.', '별들이 우주를 채운다.'],
      ['Books opened a new universe to her.', '책은 그녀에게 새로운 세계를 열어 주었다.'],
    ]},
  ]},
  { w: 'unprecedented', p: 'adj.', s: [
    { m: '전례 없는', syn: [], ex: [
      ['The heat was unprecedented.', '그 더위는 전례가 없었다.'],
      ['We face unprecedented challenges.', '우리는 전례 없는 도전에 직면해 있다.'],
      ['The film had unprecedented success.', '그 영화는 전례 없는 성공을 거뒀다.'],
    ]},
  ]},
  { w: 'update', p: 'v.', s: [
    { m: '갱신하다, 최신으로 하다', syn: ['refresh'], ex: [
      ['Please update the app.', '앱을 갱신해 주세요.'],
      ['She updated the list this morning.', '그녀는 오늘 아침에 목록을 갱신했다.'],
      ['We update the notice every Monday.', '우리는 매주 월요일에 공지를 갱신한다.'],
    ]},
  ]},
  { w: 'upward', p: 'adj.', s: [
    { m: '위쪽의, 상승하는', syn: ['rising'], ex: [
      ['Prices show an upward trend.', '가격이 상승 추세를 보인다.'],
      ['He made an upward move in the company.', '그는 회사에서 위로 올라섰다.'],
      ['The upward path was steep.', '위로 난 길은 가팔랐다.'],
    ]},
  ]},
  { w: 'upwards', p: 'adv.', s: [
    { m: '위쪽으로 (영국식. 미국식은 upward)', syn: [], ex: [
      ['Smoke drifted upwards.', '연기가 위로 떠올랐다.'],
      ['She looked upwards at the stars.', '그녀는 별을 보려고 위를 올려다보았다.'],
      ['The balloon rose upwards slowly.', '풍선이 천천히 위로 올라갔다.'],
    ]},
  ]},
  { w: 'urban', p: 'adj.', s: [
    { m: '도시의', syn: [], ex: [
      ['Urban life can be noisy.', '도시 생활은 시끄러울 수 있다.'],
      ['Urban parks give people rest.', '도시 공원은 사람들에게 쉼을 준다.'],
      ['She studies urban planning.', '그녀는 도시 계획을 공부한다.'],
    ]},
  ]},
  { w: 'urge', p: 'v.', s: [
    { m: '촉구하다, 강력히 권하다', syn: ['encourage'], ex: [
      ['Doctors urge us to walk daily.', '의사들은 우리에게 매일 걸으라고 권한다.'],
      ['She urged him to apply.', '그녀는 그에게 지원하라고 권했다.'],
      ['I urge you to read this book.', '나는 네가 이 책을 읽기를 강력히 권한다.'],
    ]},
  ]},
  { w: 'utilise', p: 'v.', s: [
    { m: '활용하다, 이용하다 (utilize 의 영국식 철자)', syn: ['use'], ex: [
      ['We utilise every empty room.', '우리는 빈 방을 모두 활용한다.'],
      ['She utilised her free time well.', '그녀는 여가를 잘 활용했다.'],
      ['The school utilises online tools.', '그 학교는 온라인 도구를 활용한다.'],
    ]},
  ]},
  { w: 'utilize', p: 'v.', s: [
    { m: '활용하다, 이용하다', syn: ['use', 'make use of'], ex: [
      ['We should utilize every resource.', '우리는 모든 자원을 활용해야 한다.'],
      ['The app utilizes your location.', '그 앱은 너의 위치 정보를 이용한다.'],
      ['Farmers utilize modern machines.', '농부들은 현대적 기계를 활용한다.'],
    ]},
  ]},
  { w: 'utter', p: 'v.', s: [
    { m: '말하다, 소리를 내다', syn: ['speak'], ex: [
      ['He did not utter a word.', '그는 한마디도 하지 않았다.'],
      ['She uttered a soft cry.', '그녀는 나직한 소리를 냈다.'],
      ['Nobody uttered a sound.', '아무도 소리를 내지 않았다.'],
    ]},
  ]},
  { w: 'vacate', p: 'v.', s: [
    { m: '비우다, 떠나다', syn: ['leave'], ex: [
      ['Please vacate the room by noon.', '정오까지 방을 비워 주세요.'],
      ['They vacated the old office.', '그들은 낡은 사무실을 비웠다.'],
      ['Guests vacate the hall after lunch.', '손님들은 점심 후 강당을 비운다.'],
    ]},
  ]},
  { w: 'vaccine', p: 'n.', s: [
    { m: '백신', syn: [], ex: [
      ['The vaccine protects against the flu.', '그 백신은 독감을 막아 준다.'],
      ['A new vaccine was approved.', '새 백신이 승인되었다.'],
      ['Vaccines saved millions of lives.', '백신은 수백만 명의 생명을 구했다.'],
    ]},
  ]},
  { w: 'vacuum', p: 'n.', s: [
    { m: '진공, 진공청소기', syn: [], ex: [
      ['Sound cannot travel in a vacuum.', '소리는 진공에서 전달될 수 없다.'],
      ['She ran the vacuum in the hall.', '그녀는 복도에서 청소기를 돌렸다.'],
      ['The jar keeps a vacuum inside.', '그 병은 안에 진공을 유지한다.'],
    ]},
  ]},
  { w: 'vague', p: 'adj.', s: [
    { m: '모호한, 희미한', syn: ['unclear'], ex: [
      ['His answer was vague.', '그의 답은 모호했다.'],
      ['I have a vague memory of that day.', '나는 그날의 희미한 기억이 있다.'],
      ['Vague plans lead to trouble.', '모호한 계획은 문제를 낳는다.'],
    ]},
  ]},
  { w: 'valid', p: 'adj.', s: [
    { m: '타당한, 유효한', syn: ['sound', 'legitimate'], ex: [
      ['That is a valid point.', '그것은 타당한 지적이다.'],
      ['The ticket is valid for one month.', '그 표는 한 달간 유효하다.'],
      ['His excuse was not valid.', '그의 변명은 타당하지 않았다.'],
    ]},
  ]},
  { w: 'validate', p: 'v.', s: [
    { m: '입증하다, 승인하다', syn: ['confirm', 'verify'], ex: [
      ['The experiment validated the theory.', '그 실험은 이론을 입증했다.'],
      ['We need to validate the data first.', '우리는 먼저 자료를 검증해야 한다.'],
      ['Her success validated years of work.', '그녀의 성공은 수년간의 노력을 입증했다.'],
    ]},
  ]},
  { w: 'vanish', p: 'v.', s: [
    { m: '사라지다', syn: ['disappear'], ex: [
      ['The bird vanished into the sky.', '그 새는 하늘로 사라졌다.'],
      ['My keys vanished this morning.', '내 열쇠가 오늘 아침 사라졌다.'],
      ['Fog vanishes when the sun rises.', '해가 뜨면 안개가 사라진다.'],
    ]},
  ]},
  { w: 'vast', p: 'adj.', s: [
    { m: '거대한, 광대한', syn: ['huge'], ex: [
      ['A vast desert lay ahead.', '광대한 사막이 앞에 펼쳐졌다.'],
      ['She has vast knowledge of birds.', '그녀는 새에 대해 방대한 지식이 있다.'],
      ['The vast hall was empty.', '그 거대한 강당은 비어 있었다.'],
    ]},
  ]},
  { w: 'venture', p: 'n.', s: [
    { m: '모험, 새로운 사업', syn: [], ex: [
      ['The trip was a bold venture.', '그 여행은 대담한 모험이었다.'],
      ['Their venture succeeded at last.', '그들의 사업은 마침내 성공했다.'],
      ['Every venture carries risk.', '모든 새 사업에는 위험이 따른다.'],
    ]},
  ]},
  { w: 'verb', p: 'n.', s: [
    { m: '동사', syn: [], ex: [
      ['Find the verb in this sentence.', '이 문장에서 동사를 찾아라.'],
      ['English verbs change form.', '영어 동사는 형태가 변한다.'],
      ['A verb tells what someone does.', '동사는 누가 무엇을 하는지 알려 준다.'],
    ]},
  ]},
  { w: 'versatile', p: 'adj.', s: [
    { m: '다재다능한, 다용도의', syn: ['adaptable'], ex: [
      ['He is a versatile athlete.', '그는 다재다능한 운동선수이다.'],
      ['This tool is highly versatile.', '이 도구는 매우 다용도이다.'],
      ['Eggs are a versatile ingredient.', '달걀은 활용도가 높은 재료이다.'],
    ]},
  ]},
  { w: 'verse', p: 'n.', s: [
    { m: '운문, 시구', syn: ['poetry'], ex: [
      ['She wrote the song in verse.', '그녀는 그 노래를 운문으로 썼다.'],
      ['Read the second verse aloud.', '둘째 절을 소리 내어 읽어라.'],
      ['Old verses are easy to remember.', '옛 시구는 기억하기 쉽다.'],
    ]},
  ]},
  { w: 'versus', p: 'prep.', s: [
    { m: '~ 대, ~에 맞서', syn: ['against'], ex: [
      ['It is Korea versus Japan tonight.', '오늘 밤은 한국 대 일본이다.'],
      ['The case was Smith versus the city.', '그 사건은 스미스 대 시의 소송이었다.'],
      ['Speed versus safety is the question.', '속도냐 안전이냐가 문제다.'],
    ]},
  ]},
  { w: 'vertical', p: 'adj.', s: [
    { m: '수직의', syn: ['upright'], ex: [
      ['Draw a vertical line here.', '여기에 수직선을 그어라.'],
      ['The cliff is almost vertical.', '그 절벽은 거의 수직이다.'],
      ['Vertical bars hold the gate.', '수직 막대들이 문을 지탱한다.'],
    ]},
  ]},
  { w: 'vessel', p: 'n.', s: [
    { m: '배, 그릇, 혈관', syn: [], ex: [
      ['A large vessel entered the port.', '큰 배가 항구로 들어왔다.'],
      ['Blood vessels carry oxygen.', '혈관은 산소를 나른다.'],
      ['The clay vessel holds water.', '그 흙 그릇은 물을 담는다.'],
    ]},
  ]},
  { w: 'veterinarian', p: 'n.', s: [
    { m: '수의사', syn: [], ex: [
      ['The veterinarian checked our cat.', '수의사가 우리 고양이를 진찰했다.'],
      ['She wants to be a veterinarian.', '그녀는 수의사가 되고 싶어 한다.'],
      ['Veterinarians treat farm animals too.', '수의사는 가축도 치료한다.'],
    ]},
  ]},
  { w: 'via', p: 'prep.', s: [
    { m: '~를 거쳐, ~를 통해', syn: ['through'], ex: [
      ['We flew to Rome via Paris.', '우리는 파리를 거쳐 로마로 갔다.'],
      ['Send the file via email.', '그 파일을 전자우편으로 보내라.'],
      ['He came home via the park.', '그는 공원을 거쳐 집에 왔다.'],
    ]},
  ]},
  { w: 'viable', p: 'adj.', s: [
    { m: '실행 가능한, 생존 가능한', syn: ['workable', 'feasible'], ex: [
      ['That is not a viable option.', '그것은 실행 가능한 선택지가 아니다.'],
      ['We need a viable long-term plan.', '우리는 실행 가능한 장기 계획이 필요하다.'],
      ['The business is no longer viable.', '그 사업은 더 이상 존속 가능하지 않다.'],
    ]},
  ]},
  { w: 'vice', p: 'n.', s: [
    { m: '악덕, 나쁜 버릇', syn: [], ex: [
      ['Smoking was his only vice.', '흡연이 그의 유일한 나쁜 버릇이었다.'],
      ['Greed is a common vice.', '탐욕은 흔한 악덕이다.'],
      ['The story warns against vice.', '그 이야기는 악덕을 경계한다.'],
    ]},
  ]},
  { w: 'victory', p: 'n.', s: [
    { m: '승리', syn: ['win'], ex: [
      ['The team celebrated its victory.', '그 팀은 승리를 축하했다.'],
      ['Victory came after long practice.', '긴 연습 끝에 승리가 왔다.'],
      ['Small victories matter too.', '작은 승리도 중요하다.'],
    ]},
  ]},
  { w: 'vigor', p: 'n.', s: [
    { m: '활력, 힘', syn: ['energy'], ex: [
      ['He works with great vigor.', '그는 대단한 활력으로 일한다.'],
      ['Her vigor surprised everyone.', '그녀의 기운이 모두를 놀라게 했다.'],
      ['Exercise restores vigor.', '운동은 활력을 되찾아 준다.'],
    ]},
  ]},
  { w: 'virgin', p: 'adj.', s: [
    { m: '손대지 않은, 처음 그대로의', syn: ['untouched'], ex: [
      ['Virgin forest covers the island.', '원시림이 그 섬을 덮고 있다.'],
      ['They walked on virgin snow.', '그들은 아무도 밟지 않은 눈 위를 걸었다.'],
      ['Virgin land was hard to farm.', '개간되지 않은 땅은 농사짓기 어려웠다.'],
    ]},
  ]},
  { w: 'virtue', p: 'n.', s: [
    { m: '미덕, 장점', syn: ['goodness'], ex: [
      ['Patience is a virtue.', '인내는 미덕이다.'],
      ['Her chief virtue is honesty.', '그녀의 큰 장점은 정직이다.'],
      ['The plan has one clear virtue.', '그 계획에는 분명한 장점이 하나 있다.'],
    ]},
  ]},
  { w: 'virus', p: 'n.', s: [
    { m: '바이러스', syn: [], ex: [
      ['A virus caused the illness.', '바이러스가 그 병을 일으켰다.'],
      ['Wash your hands to stop viruses.', '바이러스를 막으려면 손을 씻어라.'],
      ['The computer virus spread fast.', '그 컴퓨터 바이러스는 빠르게 퍼졌다.'],
    ]},
  ]},
  { w: 'visible', p: 'adj.', s: [
    { m: '눈에 보이는, 뚜렷한', syn: [], ex: [
      ['The moon is visible tonight.', '오늘 밤에는 달이 보인다.'],
      ['There was a visible change.', '뚜렷한 변화가 있었다.'],
      ['The sign is visible from far away.', '그 표지판은 멀리서도 보인다.'],
    ]},
  ]},
  { w: 'visual', p: 'adj.', s: [
    { m: '시각의, 시각적인', syn: [], ex: [
      ['Charts give visual help.', '도표는 시각적인 도움을 준다.'],
      ['She has a strong visual memory.', '그녀는 시각 기억력이 좋다.'],
      ['Visual art fills the hall.', '시각 예술이 그 홀을 채우고 있다.'],
    ]},
  ]},
  { w: 'vital', p: 'adj.', s: [
    { m: '필수적인, 매우 중요한', syn: ['essential', 'crucial'], ex: [
      ['Sleep is vital for health.', '잠은 건강에 필수적이다.'],
      ['She played a vital role in the team.', '그녀는 팀에서 매우 중요한 역할을 했다.'],
      ['Clean water is vital to survival.', '깨끗한 물은 생존에 필수적이다.'],
    ]},
  ]},
  { w: 'vivid', p: 'adj.', s: [
    { m: '생생한, 선명한', syn: ['bright'], ex: [
      ['She has a vivid imagination.', '그녀는 상상력이 풍부하다.'],
      ['The painting uses vivid colors.', '그 그림은 선명한 색을 쓴다.'],
      ['I have a vivid memory of that day.', '나는 그날을 생생하게 기억한다.'],
    ]},
  ]},
  { w: 'vocabulary', p: 'n.', s: [
    { m: '어휘, 단어', syn: [], ex: [
      ['Reading builds vocabulary.', '독서는 어휘를 늘린다.'],
      ['Her English vocabulary is wide.', '그녀의 영어 어휘는 폭넓다.'],
      ['We learn new vocabulary each week.', '우리는 매주 새 어휘를 익힌다.'],
    ]},
  ]},
  { w: 'vocation', p: 'n.', s: [
    { m: '천직, 소명', syn: ['calling'], ex: [
      ['Teaching is her vocation.', '가르치는 일은 그녀의 천직이다.'],
      ['He found his vocation late.', '그는 늦게 천직을 찾았다.'],
      ['Nursing is a demanding vocation.', '간호는 힘든 소명이다.'],
    ]},
  ]},
  { w: 'vulnerable', p: 'adj.', s: [
    { m: '취약한, 상처받기 쉬운', syn: ['weak', 'exposed'], ex: [
      ['Elderly people are vulnerable to heat.', '노인들은 더위에 취약하다.'],
      ['The system is vulnerable to attack.', '그 시스템은 공격에 취약하다.'],
      ['She felt vulnerable in the new place.', '그녀는 낯선 곳에서 불안함을 느꼈다.'],
    ]},
  ]},
  { w: 'wander', p: 'v.', s: [
    { m: '거닐다, 헤매다', syn: ['roam'], ex: [
      ['We wandered through the market.', '우리는 시장을 거닐었다.'],
      ['The child wandered away from home.', '그 아이는 집에서 멀리 벗어나 돌아다녔다.'],
      ['My mind wanders during long talks.', '긴 이야기 중에는 내 정신이 딴 데로 간다.'],
    ]},
  ]},
  { w: 'warehouse', p: 'n.', s: [
    { m: '창고', syn: ['storehouse'], ex: [
      ['Boxes filled the warehouse.', '상자들이 창고를 채웠다.'],
      ['The warehouse is near the port.', '그 창고는 항구 근처에 있다.'],
      ['They rented a small warehouse.', '그들은 작은 창고를 빌렸다.'],
    ]},
  ]},
  { w: 'warrant', p: 'n.', s: [
    { m: '영장, 근거', syn: ['authorization'], ex: [
      ['Police need a warrant to enter.', '경찰은 들어가려면 영장이 필요하다.'],
      ['There is no warrant for that claim.', '그 주장에는 근거가 없다.'],
      ['The judge signed the warrant.', '판사가 영장에 서명했다.'],
    ]},
  ]},
  { w: 'wealth', p: 'n.', s: [
    { m: '부, 재산', syn: [], ex: [
      ['He gave much of his wealth away.', '그는 재산의 많은 부분을 나눠 주었다.'],
      ['Wealth does not buy happiness.', '부가 행복을 사 주지는 않는다.'],
      ['The country has great natural wealth.', '그 나라는 천연자원이 풍부하다.'],
    ]},
  ]},
  { w: 'weave', p: 'v.', s: [
    { m: '짜다, 엮다', syn: [], ex: [
      ['They weave cloth by hand.', '그들은 손으로 천을 짠다.'],
      ['She weaves baskets from grass.', '그녀는 풀로 바구니를 엮는다.'],
      ['The writer weaves two stories together.', '그 작가는 두 이야기를 엮는다.'],
    ]},
  ]},
  { w: 'weed', p: 'n.', s: [
    { m: '잡초', syn: [], ex: [
      ['Pull the weeds from the garden.', '정원에서 잡초를 뽑아라.'],
      ['Weeds grow fast after rain.', '비가 오면 잡초가 빨리 자란다.'],
      ['One weed hid among the flowers.', '잡초 하나가 꽃 사이에 숨어 있었다.'],
    ]},
  ]},
  { w: 'weird', p: 'adj.', s: [
    { m: '기이한, 이상한', syn: ['strange'], ex: [
      ['That was a weird dream.', '그것은 기이한 꿈이었다.'],
      ['The machine makes a weird sound.', '그 기계는 이상한 소리를 낸다.'],
      ['It feels weird to be back.', '돌아오니 기분이 묘하다.'],
    ]},
  ]},
  { w: 'welfare', p: 'n.', s: [
    { m: '복지, 안녕', syn: ['well-being'], ex: [
      ['The school cares about student welfare.', '그 학교는 학생 복지를 신경 쓴다.'],
      ['Animal welfare matters to her.', '동물 복지는 그녀에게 중요하다.'],
      ['Welfare programs help poor families.', '복지 제도는 가난한 가정을 돕는다.'],
    ]},
  ]},
  { w: 'wheat', p: 'n.', s: [
    { m: '밀', syn: [], ex: [
      ['Bread is made from wheat.', '빵은 밀로 만든다.'],
      ['Wheat fields turned golden.', '밀밭이 황금빛으로 변했다.'],
      ['They harvest wheat in July.', '그들은 칠월에 밀을 수확한다.'],
    ]},
  ]},
  { w: 'whereas', p: 'conj.', s: [
    { m: '~인 반면에', syn: ['while'], ex: [
      ['He likes tea, whereas I prefer coffee.', '그는 차를 좋아하는 반면 나는 커피를 더 좋아한다.'],
      ['Whereas summer is hot, winter is dry.', '여름은 더운 반면 겨울은 건조하다.'],
      ['She reads slowly, whereas her brother reads fast.', '그녀는 천천히 읽는 반면 남동생은 빨리 읽는다.'],
    ]},
  ]},
  { w: 'whip', p: 'n.', s: [
    { m: '채찍', syn: [], ex: [
      ['The rider carried a whip.', '그 기수는 채찍을 들고 있었다.'],
      ['A whip cracked in the air.', '채찍이 공중에서 소리를 냈다.'],
      ['The old whip hangs on the wall.', '낡은 채찍이 벽에 걸려 있다.'],
    ]},
  ]},
  { w: 'wicked', p: 'adj.', s: [
    { m: '사악한, 짓궂은', syn: ['evil'], ex: [
      ['The wicked king lost his throne.', '그 사악한 왕은 왕좌를 잃었다.'],
      ['She gave a wicked grin.', '그녀는 짓궂은 미소를 지었다.'],
      ['Wicked deeds never stay hidden.', '악행은 결코 숨겨지지 않는다.'],
    ]},
  ]},
  { w: 'widespread', p: 'adj.', s: [
    { m: '널리 퍼진, 광범위한', syn: ['common', 'extensive'], ex: [
      ['The belief is widespread.', '그 믿음은 널리 퍼져 있다.'],
      ['There was widespread damage after the storm.', '폭풍 후 광범위한 피해가 있었다.'],
      ['Smartphone use is widespread among teens.', '스마트폰 사용은 십 대 사이에 널리 퍼져 있다.'],
    ]},
  ]},
  { w: 'wit', p: 'n.', s: [
    { m: '재치, 기지', syn: [], ex: [
      ['Her wit made us laugh.', '그녀의 재치가 우리를 웃게 했다.'],
      ['He answered with quick wit.', '그는 재빠른 기지로 답했다.'],
      ['Wit helps in hard moments.', '재치는 힘든 순간에 도움이 된다.'],
    ]},
  ]},
  { w: 'with regard to', p: 'phr.', s: [
    { m: '~에 관하여', syn: ['concerning', 'about'], ex: [
      ['With regard to your question, I agree.', '당신 질문에 관해서는 동의합니다.'],
      ['Nothing changed with regard to the rules.', '규칙에 관해서는 아무것도 바뀌지 않았다.'],
      ['He wrote with regard to the new policy.', '그는 새 정책에 관해 편지를 썼다.'],
    ]},
  ]},
  { w: 'withdraw', p: 'v.', s: [
    { m: '철회하다, 인출하다', syn: [], ex: [
      ['I withdraw my question.', '나는 내 질문을 철회한다.'],
      ['She withdraws money every Friday.', '그녀는 금요일마다 돈을 찾는다.'],
      ['They withdraw support if rules break.', '규칙이 깨지면 그들은 지원을 거둔다.'],
    ]},
  ]},
  { w: 'witness', p: 'n.', s: [
    { m: '목격자, 증인', syn: ['observer'], ex: [
      ['The witness told the truth.', '그 목격자는 사실대로 말했다.'],
      ['Two witnesses saw the accident.', '목격자 두 명이 그 사고를 보았다.'],
      ['She was a witness at the wedding.', '그녀는 결혼식의 증인이었다.'],
    ]},
  ]},
  { w: 'worship', p: 'v.', s: [
    { m: '숭배하다, 예배하다', syn: [], ex: [
      ['They worship at the temple.', '그들은 그 절에서 예배한다.'],
      ['Fans worship the singer like a hero.', '팬들은 그 가수를 영웅처럼 떠받든다.'],
      ['People worshipped the sun long ago.', '옛날 사람들은 해를 숭배했다.'],
    ]},
  ]},
  { w: 'wreck', p: 'n.', s: [
    { m: '난파선, 잔해', syn: ['ruin'], ex: [
      ['Divers found an old wreck.', '잠수부들이 오래된 난파선을 찾았다.'],
      ['The wreck of the car was towed away.', '그 차의 잔해가 견인되었다.'],
      ['Storms leave wrecks on the shore.', '폭풍은 해안에 잔해를 남긴다.'],
    ]},
  ]},
  { w: 'yield', p: 'v.', s: [
    { m: '양보하다, 굴복하다', syn: ['give way'], ex: [
      ['Yield to cars on the main road.', '큰길의 차에 양보해라.'],
      ['He never yields to pressure.', '그는 결코 압박에 굴하지 않는다.'],
      ['The old door yielded to a push.', '낡은 문이 밀자 열렸다.'],
    ]},
    { m: '생산하다, 내다', syn: ['produce'], ex: [
      ['The field yields good rice.', '그 밭은 좋은 쌀을 낸다.'],
      ['The study yielded clear results.', '그 연구는 분명한 결과를 냈다.'],
    ]},
  ]},
  { w: 'zone', p: 'n.', s: [
    { m: '구역, 지대', syn: ['area'], ex: [
      ['This is a quiet zone.', '여기는 조용한 구역이다.'],
      ['Drivers must slow down in the school zone.', '운전자는 학교 구역에서 속도를 줄여야 한다.'],
      ['The city set up green zones.', '그 도시는 녹지 구역을 만들었다.'],
    ]},
  ]},
], 'csat');
