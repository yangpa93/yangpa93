/**
 * 중학교 3학년 레벨 3 어휘 33개.
 *
 * 선정 기준: 중학교 3학년 교과서 공통 어휘와 고교 입학 전 반드시 알아야 할 추상 어휘.
 *
 * 뜻이 여러 개인 단어는 뜻마다 예문을 나눠 두었다. 같은 단어를 다시 만날 때마다
 * 다른 뜻·다른 문장이 나오도록 하기 위한 것.
 */

import { defineLevel } from '../define';

export const M3_3 = defineLevel('m3-3', [
  { w: 'positive', p: 'adj.', s: [
    { m: '긍정적인', syn: ['hopeful', 'optimistic'], ex: [
      ['Keep a positive mind.', '긍정적인 마음을 유지해라.'],
      ['She got positive feedback.', '그녀는 긍정적인 평가를 받았다.'],
      ['A positive attitude changes everything.', '긍정적인 태도가 모든 것을 바꾼다.'],
    ]},
  ]},
  { w: 'prevent', p: 'v.', s: [
    { m: '막다, 예방하다', syn: ['stop', 'keep from'], ex: [
      ['Washing hands prevents illness.', '손 씻기는 질병을 예방한다.'],
      ['Rain prevented us from going out.', '비 때문에 우리는 나가지 못했다.'],
      ['Seat belts prevent serious injury.', '안전벨트는 심각한 부상을 막는다.'],
    ]},
  ]},
  { w: 'process', p: 'n.', s: [
    { m: '과정, 절차', syn: ['procedure', 'steps'], ex: [
      ['Learning is a slow process.', '배움은 느린 과정이다.'],
      ['The application process takes a week.', '지원 절차는 일주일이 걸린다.'],
      ['Explain the process step by step.', '그 과정을 단계별로 설명해라.'],
    ]},
  ]},
  { w: 'proper', p: 'adj.', s: [
    { m: '적절한, 올바른', syn: ['suitable', 'right'], ex: [
      ['Wear proper shoes for hiking.', '등산에 적절한 신발을 신어라.'],
      ['Use the proper tool for the job.', '그 일에 알맞은 도구를 써라.'],
      ['He did not receive proper training.', '그는 제대로 된 훈련을 받지 못했다.'],
    ]},
  ]},
  { w: 'purpose', p: 'n.', s: [
    { m: '목적', syn: ['aim', 'goal'], ex: [
      ['What is the purpose of this trip?', '이 여행의 목적은 무엇이니?'],
      ['The purpose of the study was clear.', '그 연구의 목적은 분명했다.'],
      ['He broke it on purpose.', '그는 일부러 그것을 부쉈다.'],
    ]},
  ]},
  { w: 'quality', p: 'n.', s: [
    { m: '질, 품질', syn: ['standard', 'grade'], ex: [
      ['The quality of the paper is good.', '그 종이의 품질이 좋다.'],
      ['We care about quality, not quantity.', '우리는 양이 아니라 질을 중시한다.'],
    ]},
    { m: '자질, 특성', syn: ['trait', 'feature'], ex: [
      ['Patience is an important quality.', '인내는 중요한 자질이다.'],
      ['She has many good qualities.', '그녀는 좋은 자질을 많이 가지고 있다.'],
    ]},
  ]},
  { w: 'realize', p: 'v.', s: [
    { m: '깨닫다', syn: ['understand', 'become aware'], ex: [
      ['I realized my mistake too late.', '나는 너무 늦게 실수를 깨달았다.'],
      ['She realized that she was wrong.', '그녀는 자신이 틀렸다는 것을 깨달았다.'],
    ]},
    { m: '실현하다', syn: ['achieve', 'fulfill'], ex: [
      ['He finally realized his dream.', '그는 마침내 꿈을 실현했다.'],
      ['The plan was never realized.', '그 계획은 결코 실현되지 않았다.'],
    ]},
  ]},
  { w: 'recent', p: 'adj.', s: [
    { m: '최근의', syn: ['latest', 'new'], ex: [
      ['A recent study showed this.', '최근 연구가 이것을 보여 주었다.'],
      ['In recent years, prices have risen.', '최근 몇 년간 물가가 올랐다.'],
      ['Have you seen his recent photos?', '그의 최근 사진을 봤니?'],
    ]},
  ]},
  { w: 'recognize', p: 'v.', s: [
    { m: '알아보다', syn: ['identify', 'know'], ex: [
      ['I recognized her voice.', '나는 그녀의 목소리를 알아들었다.'],
      ['He did not recognize me at first.', '그는 처음에 나를 알아보지 못했다.'],
    ]},
    { m: '인정하다', syn: ['acknowledge', 'admit'], ex: [
      ['We must recognize the problem.', '우리는 그 문제를 인정해야 한다.'],
      ['Her work was recognized worldwide.', '그녀의 작품은 전 세계에서 인정받았다.'],
    ]},
  ]},
  { w: 'reflect', p: 'v.', s: [
    { m: '반사하다, 비추다', syn: ['mirror', 'throw back'], ex: [
      ['The lake reflected the mountain.', '호수가 산을 비추었다.'],
      ['Mirrors reflect light.', '거울은 빛을 반사한다.'],
    ]},
    { m: '반영하다, 나타내다', syn: ['show', 'express'], ex: [
      ['His words reflect his true feelings.', '그의 말은 진심을 반영한다.'],
      ['The test reflects what we learned.', '그 시험은 우리가 배운 것을 반영한다.'],
    ]},
  ]},
  { w: 'require', p: 'v.', s: [
    { m: '요구하다, 필요로 하다', syn: ['need', 'call for'], ex: [
      ['This job requires patience.', '이 일은 인내를 요구한다.'],
      ['All students are required to wear uniforms.', '모든 학생은 교복을 입어야 한다.'],
      ['Growing plants requires care.', '식물을 기르는 데는 정성이 필요하다.'],
    ]},
  ]},
  { w: 'seek', p: 'v.', s: [
    { m: '찾다, 구하다', syn: ['look for', 'search for'], ex: [
      ['They seek a better life.', '그들은 더 나은 삶을 찾는다.'],
      ['She sought help from her teacher.', '그녀는 선생님께 도움을 구했다.'],
      ['Many young people seek jobs in the city.', '많은 젊은이가 도시에서 일자리를 구한다.'],
    ]},
  ]},
  { w: 'severe', p: 'adj.', s: [
    { m: '심한, 극심한', syn: ['serious', 'harsh'], ex: [
      ['We had a severe winter.', '우리는 혹독한 겨울을 보냈다.'],
      ['She suffered severe pain.', '그녀는 극심한 통증을 겪었다.'],
      ['The damage was severe.', '피해가 심각했다.'],
    ]},
  ]},
  { w: 'source', p: 'n.', s: [
    { m: '원천, 근원', syn: ['origin', 'root'], ex: [
      ['The sun is a source of energy.', '태양은 에너지의 원천이다.'],
      ['Stress is a source of many illnesses.', '스트레스는 많은 질병의 근원이다.'],
    ]},
    { m: '출처, 정보원', syn: ['reference'], ex: [
      ['Always check your sources.', '항상 출처를 확인해라.'],
      ['The news came from a reliable source.', '그 소식은 믿을 만한 출처에서 왔다.'],
    ]},
  ]},
  { w: 'specific', p: 'adj.', s: [
    { m: '구체적인', syn: ['detailed', 'precise'], ex: [
      ['Give me a specific example.', '구체적인 예를 들어 줘.'],
      ['Can you be more specific?', '좀 더 구체적으로 말해 줄 수 있니?'],
    ]},
    { m: '특정한', syn: ['particular'], ex: [
      ['This medicine treats a specific disease.', '이 약은 특정 질병을 치료한다.'],
      ['Each student has a specific role.', '각 학생은 특정한 역할이 있다.'],
    ]},
  ]},
  { w: 'spread', p: 'v.', s: [
    { m: '퍼지다, 확산되다', syn: ['expand', 'scatter'], ex: [
      ['The news spread quickly.', '그 소식은 빠르게 퍼졌다.'],
      ['The fire spread to nearby houses.', '불이 근처 집들로 번졌다.'],
    ]},
    { m: '펼치다, 바르다', syn: ['open out', 'apply'], ex: [
      ['She spread a map on the table.', '그녀는 탁자 위에 지도를 펼쳤다.'],
      ['Spread butter on the bread.', '빵에 버터를 발라라.'],
    ]},
  ]},
  { w: 'struggle', p: 'v., n.', s: [
    { m: '애쓰다, 고군분투하다', syn: ['strive', 'have trouble'], ex: [
      ['He struggled to finish the race.', '그는 경주를 마치려고 애썼다.'],
      ['She struggles with math.', '그녀는 수학을 힘들어한다.'],
      ['Life was a struggle for them.', '그들에게 삶은 투쟁이었다.'],
    ]},
  ]},
  { w: 'sudden', p: 'adj.', s: [
    { m: '갑작스러운', syn: ['abrupt', 'unexpected'], ex: [
      ['There was a sudden noise.', '갑작스러운 소음이 났다.'],
      ['His sudden change surprised us.', '그의 갑작스러운 변화가 우리를 놀라게 했다.'],
      ['All of a sudden, it began to rain.', '갑자기 비가 오기 시작했다.'],
    ]},
  ]},
  { w: 'tend', p: 'v.', s: [
    { m: '~하는 경향이 있다', syn: ['be likely to', 'have a tendency to'], ex: [
      ['Kids tend to copy adults.', '아이들은 어른을 따라 하는 경향이 있다.'],
      ['Prices tend to rise in winter.', '겨울에는 물가가 오르는 경향이 있다.'],
      ['She tends to speak too fast.', '그녀는 너무 빨리 말하는 경향이 있다.'],
    ]},
  ]},
  { w: 'threaten', p: 'v.', s: [
    { m: '위협하다', syn: ['endanger', 'menace'], ex: [
      ['Pollution threatens sea life.', '오염이 해양 생물을 위협한다.'],
      ['The storm threatened the village.', '폭풍이 그 마을을 위협했다.'],
      ['He threatened to leave.', '그는 떠나겠다고 위협했다.'],
    ]},
  ]},
  { w: 'unique', p: 'adj.', s: [
    { m: '독특한, 유일한', syn: ['one of a kind', 'special'], ex: [
      ['Every person is unique.', '모든 사람은 저마다 독특하다.'],
      ['This building has a unique shape.', '이 건물은 독특한 모양을 하고 있다.'],
      ['Her voice is truly unique.', '그녀의 목소리는 정말 독특하다.'],
    ]},
  ]},
  { w: 'according to', p: 'phr.', s: [
    { m: '~에 따르면', syn: ['as stated by', 'based on'], ex: [
      ['According to the report, sales rose.', '그 보고서에 따르면 매출이 올랐다.'],
      ['According to her, the test was easy.', '그녀에 따르면 그 시험은 쉬웠다.'],
      ['We acted according to the plan.', '우리는 계획에 따라 행동했다.'],
    ]},
  ]},
  { w: 'as well as', p: 'phr.', s: [
    { m: '~뿐만 아니라', syn: ['in addition to', 'besides'], ex: [
      ['He speaks French as well as English.', '그는 영어뿐만 아니라 프랑스어도 한다.'],
      ['She is kind as well as smart.', '그녀는 똑똑할 뿐만 아니라 친절하다.'],
      ['We need food as well as water.', '우리는 물뿐만 아니라 음식도 필요하다.'],
    ]},
  ]},
  { w: 'be likely to', p: 'phr.', s: [
    { m: '~할 것 같다', syn: ['tend to', 'be expected to'], ex: [
      ['It is likely to rain tonight.', '오늘 밤 비가 올 것 같다.'],
      ['He is likely to be late again.', '그는 또 늦을 것 같다.'],
      ['Prices are likely to fall next year.', '내년에 가격이 내릴 것 같다.'],
    ]},
  ]},
  { w: 'bring about', p: 'phr.', s: [
    { m: '초래하다, 일으키다', syn: ['cause', 'lead to'], ex: [
      ['The law brought about big changes.', '그 법은 큰 변화를 가져왔다.'],
      ['Technology brought about a new lifestyle.', '기술은 새로운 생활 방식을 가져왔다.'],
      ['What brought about this decision?', '무엇이 이 결정을 가져왔니?'],
    ]},
  ]},
  { w: 'come up with', p: 'phr.', s: [
    { m: '(생각을) 떠올리다, 내놓다', syn: ['think of', 'produce'], ex: [
      ['She came up with a great idea.', '그녀는 훌륭한 생각을 떠올렸다.'],
      ['Can you come up with a better title?', '더 나은 제목을 생각해 낼 수 있니?'],
      ['They came up with a simple solution.', '그들은 간단한 해결책을 내놓았다.'],
    ]},
  ]},
  { w: 'deal with', p: 'phr.', s: [
    { m: '다루다, 처리하다', syn: ['handle', 'cope with'], ex: [
      ['We must deal with this problem.', '우리는 이 문제를 처리해야 한다.'],
      ['How do you deal with stress?', '너는 스트레스를 어떻게 다루니?'],
      ['This book deals with climate change.', '이 책은 기후 변화를 다룬다.'],
    ]},
  ]},
  { w: 'make up for', p: 'phr.', s: [
    { m: '만회하다, 보상하다', syn: ['compensate for', 'offset'], ex: [
      ['He studied hard to make up for lost time.', '그는 잃은 시간을 만회하려고 열심히 공부했다.'],
      ['Nothing can make up for her loss.', '어떤 것도 그녀의 상실을 보상할 수 없다.'],
      ['She made up for the mistake with extra work.', '그녀는 추가 작업으로 실수를 만회했다.'],
    ]},
  ]},
  { w: 'result in', p: 'phr.', s: [
    { m: '~을 초래하다', syn: ['lead to', 'cause'], ex: [
      ['Careless driving results in accidents.', '부주의한 운전은 사고를 초래한다.'],
      ['The talks resulted in an agreement.', '그 회담은 합의를 낳았다.'],
      ['Too much sugar can result in illness.', '설탕을 너무 많이 먹으면 병이 날 수 있다.'],
    ]},
  ]},
  { w: 'take place', p: 'phr.', s: [
    { m: '일어나다, 개최되다', syn: ['happen', 'be held'], ex: [
      ['The festival takes place in May.', '그 축제는 5월에 열린다.'],
      ['The meeting took place last Friday.', '그 회의는 지난 금요일에 열렸다.'],
      ['Great changes took place after the war.', '전쟁 후에 큰 변화가 일어났다.'],
    ]},
  ]},
  { w: 'assist', p: 'v.', s: [
    { m: '돕다, 보조하다', syn: ['help', 'aid'], ex: [
      ['She assisted him with the project.', '그녀는 그 과제를 그에게 도와주었다.'],
      ['Volunteers assisted the elderly.', '자원봉사자들이 노인들을 도왔다.'],
      ['This app assists students in studying.', '이 앱은 학생들의 학습을 돕는다.'],
    ]},
  ]},
  { w: 'grateful', p: 'adj.', s: [
    { m: '감사하는, 고마워하는', syn: ['thankful', 'appreciative'], ex: [
      ['I am grateful for your help.', '당신의 도움에 감사드립니다.'],
      ['She felt grateful to her teacher.', '그녀는 선생님께 고마움을 느꼈다.'],
      ['We should be grateful for small things.', '우리는 작은 것에도 감사해야 한다.'],
    ]},
  ]},
  { w: 'in spite of', p: 'phr.', s: [
    { m: '~에도 불구하고', syn: ['despite', 'regardless of'], ex: [
      ['In spite of the rain, we went out.', '비에도 불구하고 우리는 나갔다.'],
      ['He passed in spite of the difficulty.', '그는 어려움에도 불구하고 합격했다.'],
      ['She smiled in spite of her pain.', '그녀는 아픔에도 불구하고 미소 지었다.'],
    ]},
  ]},
], 'curriculum');
