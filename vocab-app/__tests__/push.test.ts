import {
  buildHelloBody,
  buildLinkUrl,
  buildNudgeBody,
  buildPushBody,
  buildSettingsBody,
  isValidPushToken,
  LINK_SCHEME,
  NUDGE_PRESETS,
  parseHello,
  parseIncoming,
  parseNudge,
  parseSettings,
  pushFailureReason,
  toPayload,
} from '../src/features/pairing';
import { buildDailyReport } from '../src/features/report';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { Profile, ProfileData } from '../src/types';
import appJson from '../app.json';
import { normalizeSubjects } from '../src/store/storage';

const TODAY = '2026-07-27';
const TOKEN = 'ExponentPushToken[abcd1234EFGH5678ijkl]';

function makeProfile(over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '서준',
    kind: 'child',
    avatar: '🦊',
    level: 'm1-1',
    koLevel: 'm1-1',
    settings: {
      newPerDay: 10,
      reviewPerDay: 10,
      rounds: 3,
      subjects: ['en'],
      firstSubject: 'en',
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 0,
    streak: 3,
    bestStreak: 5,
    lastCompletedDate: '2026-07-26',
    pendingLevelUps: [],
    koPendingLevelUps: [],
    clearedLevels: [],
    koClearedLevels: [],
    claimedMonths: [],
    awards: null,
    linkWaived: false,
    parentStudy: { tracks: ['daily'], dailyTheme: 'w', newPerDay: 5 },
    ...over,
  };
}

function makeData(over: Partial<ProfileData> = {}): ProfileData {
  return { cards: {}, days: {}, answers: [], exams: [], ...over };
}

describe('isValidPushToken', () => {
  it('Expo 토큰 형식을 받아들인다', () => {
    expect(isValidPushToken(TOKEN)).toBe(true);
    expect(isValidPushToken('ExpoPushToken[xxxxxxxxxxxxxxxxxxxxxx]')).toBe(true);
  });

  it('앞뒤 공백이 있어도 통과한다', () => {
    // 카톡에서 복사하면 공백이 딸려 오기 쉽다.
    expect(isValidPushToken(`  ${TOKEN}\n`)).toBe(true);
  });

  it('빈 값이나 엉뚱한 문자열은 거른다', () => {
    expect(isValidPushToken('')).toBe(false);
    expect(isValidPushToken('안녕하세요')).toBe(false);
    expect(isValidPushToken('ExponentPushToken[]')).toBe(false);
    expect(isValidPushToken('짧다')).toBe(false);
  });
});

describe('buildLinkUrl', () => {
  it('앱 스킴으로 된 링크를 만든다', () => {
    const url = buildLinkUrl(TOKEN, '엄마 폰');
    // app.json 의 scheme 을 그대로 쓴다. 두 곳에 적어 두면 한쪽만 바뀐다.
    expect(url.startsWith(`${LINK_SCHEME}://link?`)).toBe(true);
  });

  it('한글 이름과 대괄호를 안전하게 인코딩한다', () => {
    const url = buildLinkUrl(TOKEN, '엄마 폰');
    expect(url).not.toContain(' ');
    expect(url).not.toContain('[');

    // 링크를 다시 풀면 원래 값이 나온다.
    const q = new URLSearchParams(url.split('?')[1]);
    expect(q.get('token')).toBe(TOKEN);
    expect(q.get('label')).toBe('엄마 폰');
  });
});

describe('toPayload', () => {
  it('리포트를 전송용으로 바꾼다', () => {
    const pool = entriesOf('m1-1');
    const data = makeData({
      days: {
        [TODAY]: {
          date: TODAY,
          goal: 15,
          studied: 15,
          correct: 13,
          wrong: 2,
          seconds: 600,
          completed: true,
          wrongEntryIds: [pool[0].id],
        },
      },
    });

    const report = buildDailyReport(makeProfile(), data, ALL_ENTRIES, TODAY);
    const payload = toPayload(report);

    expect(payload.childName).toBe('서준');
    expect(payload.date).toBe(TODAY);
    expect(payload.completed).toBe(true);
    // 알림 한 줄 요약에 이름과 결과가 들어간다.
    expect(payload.headline).toContain('서준');
    // 자세한 내용에 틀린 단어가 들어간다.
    expect(payload.detail).toContain(pool[0].word);
  });

  it('학습을 안 한 날도 보낼 수 있다', () => {
    const report = buildDailyReport(makeProfile(), makeData(), ALL_ENTRIES, TODAY);
    const payload = toPayload(report);
    expect(payload.completed).toBe(false);
    expect(payload.headline).toContain('아직');
  });
});

describe('parseIncoming', () => {
  it('우리가 보낸 리포트를 알아본다', () => {
    const sent = {
      kind: 'daily-report',
      childName: '서준',
      date: TODAY,
      headline: '오늘 목표 완료!',
      detail: '자세한 내용',
      completed: true,
    };
    expect(parseIncoming(sent)).toEqual({
      childName: '서준',
      date: TODAY,
      headline: '오늘 목표 완료!',
      detail: '자세한 내용',
      completed: true,
    });
  });

  it('다른 종류의 알림은 무시한다', () => {
    // 부모 기기에는 '리포트가 안 왔어요' 같은 자체 알림도 뜬다.
    expect(parseIncoming({ kind: 'missing-report' })).toBeNull();
    expect(parseIncoming({ route: '/parent/rewards' })).toBeNull();
  });

  it('깨진 값이 와도 터지지 않는다', () => {
    expect(parseIncoming(null)).toBeNull();
    expect(parseIncoming(undefined)).toBeNull();
    expect(parseIncoming('문자열')).toBeNull();
    expect(parseIncoming({ kind: 'daily-report' })).toBeNull();
    expect(parseIncoming({ kind: 'daily-report', childName: 1, date: TODAY })).toBeNull();
  });

  it('빠진 필드는 안전한 기본값으로 채운다', () => {
    const r = parseIncoming({ kind: 'daily-report', childName: '지호', date: TODAY });
    expect(r).toEqual({ childName: '지호', date: TODAY, headline: '', detail: '', completed: false });
  });
});

describe('푸시 토큰 실패 이유', () => {
  it('FCM 설정이 없으면 그것을 짚어 준다', () => {
    // 안드로이드에서 가장 흔한 원인이다. 예전에는 이것도 "Expo Go" 라고 했다.
    const r = pushFailureReason(new Error('Default FirebaseApp is not initialized'));
    expect(r).toContain('FCM');
    expect(r).not.toContain('Expo Go');
  });

  it('원래 오류를 반드시 함께 남긴다', () => {
    // 짐작이 틀렸을 때 원래 오류가 없으면 더 볼 것이 없어진다.
    for (const msg of ['something odd', 'network request failed', 'FCM missing']) {
      expect(pushFailureReason(new Error(msg))).toContain(msg);
    }
  });

  it('Error 가 아닌 것이 와도 견딘다', () => {
    expect(pushFailureReason('그냥 문자열')).toContain('그냥 문자열');
    expect(pushFailureReason(undefined)).toBeTruthy();
  });

  it('Expo Go 일 때만 Expo Go 를 탓한다', () => {
    expect(pushFailureReason(new Error('아무거나'), true)).toContain('Expo Go');
    expect(pushFailureReason(new Error('아무거나'), false)).not.toContain('Expo Go');
  });
});

describe('부모 → 아이 부르기', () => {
  it('부르는 알림은 아이 기기로 간다', () => {
    const body = buildNudgeBody(TOKEN, { from: '엄마 폰', message: '오늘 공부 시작!' });
    expect(body.to).toBe(TOKEN);
    expect(body.title).toContain('엄마 폰');
    expect(body.body).toBe('오늘 공부 시작!');
    expect(body.data.kind).toBe('nudge');
  });

  it('리포트와 부르기를 서로 헷갈리지 않는다', () => {
    // 같은 통로로 오가므로 kind 로 갈라야 한다. 섞이면 아이 폰이 자기
    // 리포트를 받아 쌓거나, 부모 폰이 공부 화면으로 끌려간다.
    const nudge = buildNudgeBody(TOKEN, { from: '엄마', message: '하자' }).data;
    const hello = buildHelloBody(TOKEN, { childName: '가가', childToken: TOKEN }).data;

    expect(parseNudge(nudge)).not.toBeNull();
    expect(parseIncoming(nudge)).toBeNull();
    expect(parseHello(nudge)).toBeNull();

    expect(parseHello(hello)).not.toBeNull();
    expect(parseNudge(hello)).toBeNull();
    expect(parseIncoming(hello)).toBeNull();
  });

  it('빈 메시지는 부르기로 보지 않는다', () => {
    expect(parseNudge({ kind: 'nudge', from: '엄마', message: '' })).toBeNull();
    expect(parseNudge({ kind: 'nudge', from: '엄마' })).toBeNull();
  });

  it('보낸 사람 이름이 없으면 부모님으로 둔다', () => {
    expect(parseNudge({ kind: 'nudge', message: '하자' })?.from).toBe('부모님');
  });

  it('고를 수 있는 문구가 준비돼 있다', () => {
    expect(NUDGE_PRESETS.length).toBeGreaterThanOrEqual(3);
    for (const m of NUDGE_PRESETS) expect(m.length).toBeGreaterThan(0);
  });
});

describe('연결 인사 — 아이 주소 알리기', () => {
  it('아이 이름과 주소를 함께 보낸다', () => {
    // 부모가 부르려면 주소가 있어야 하는데, 리포트를 기다릴 수는 없다.
    // 부르고 싶은 때가 바로 리포트가 안 온 날이기 때문이다.
    const p = parseHello(buildHelloBody('X', { childName: '가가', childToken: TOKEN }).data);
    expect(p).toEqual({ childName: '가가', childToken: TOKEN });
  });

  it('한쪽이라도 비면 받아들이지 않는다', () => {
    expect(parseHello({ kind: 'hello', childName: '', childToken: TOKEN })).toBeNull();
    expect(parseHello({ kind: 'hello', childName: '가가', childToken: '' })).toBeNull();
    expect(parseHello({ kind: 'hello', childName: '가가' })).toBeNull();
  });
});

describe('리포트에 아이 주소 싣기', () => {
  it('주소를 주면 함께 실리고, 안 주면 아예 없다', () => {
    const report = buildDailyReport(makeProfile(), makeData(), ALL_ENTRIES, TODAY);
    expect(toPayload(report, undefined, TOKEN).childToken).toBe(TOKEN);
    expect(toPayload(report).childToken).toBeUndefined();
    // 빈 문자열은 주소가 아니다. 실어 보내면 부모가 그 주소로 보내려 한다.
    expect(toPayload(report, undefined, '').childToken).toBeUndefined();
  });

  it('실어 보낸 주소가 반대편에서 그대로 나온다', () => {
    const report = buildDailyReport(makeProfile(), makeData(), ALL_ENTRIES, TODAY);
    const body = buildPushBody('부모주소', toPayload(report, undefined, TOKEN));
    expect(parseIncoming(body.data)?.childToken).toBe(TOKEN);
  });
});

describe('딥링크 스킴', () => {
  it('app.json 의 scheme 과 같다', () => {
    // 두 곳에 따로 적어 두면 한쪽만 바꿨을 때 링크가 조용히 안 열린다.
    // 앱은 멀쩡히 뜨고 아무 일도 안 일어나서 원인을 찾기 어렵다.
    expect(LINK_SCHEME).toBe(appJson.expo.scheme);
    expect(LINK_SCHEME.length).toBeGreaterThan(0);
  });

  it('링크가 그 스킴으로 시작한다', () => {
    expect(buildLinkUrl(TOKEN, '엄마 폰').startsWith(`${LINK_SCHEME}://`)).toBe(true);
  });
});

describe('부모 → 아이 과목 설정', () => {
  it('고른 과목이 그대로 건너간다', () => {
    const body = buildSettingsBody(TOKEN, { from: '엄마 폰', subjects: ['en', 'ko'] });
    expect(body.to).toBe(TOKEN);
    expect(parseSettings(body.data)).toEqual({ from: '엄마 폰', subjects: ['en', 'ko'] });
  });

  it('빈 과목은 받아들이지 않는다', () => {
    // 빈 과목으로 덮어쓰면 아이 화면에 낼 문제가 없어져 고장으로 보인다.
    expect(parseSettings({ kind: 'settings', from: '엄마', subjects: [] })).toBeNull();
    expect(parseSettings({ kind: 'settings', from: '엄마' })).toBeNull();
  });

  it('모르는 과목은 걸러 내고, 남는 게 없으면 받아들이지 않는다', () => {
    expect(parseSettings({ kind: 'settings', subjects: ['en', '수학'] })?.subjects).toEqual(['en']);
    expect(parseSettings({ kind: 'settings', subjects: ['수학'] })).toBeNull();
  });

  it('순서가 뒤집혀 와도 정해진 차례로 돌려준다', () => {
    expect(parseSettings({ kind: 'settings', subjects: ['ko', 'en'] })?.subjects).toEqual([
      'en',
      'ko',
    ]);
  });

  it('네 가지가 서로를 넘보지 않는다', () => {
    // 리포트·연결 인사·부르기·설정이 같은 통로로 오간다. kind 로 갈라야 한다.
    const settings = buildSettingsBody(TOKEN, { from: '엄마', subjects: ['ko'] }).data;
    expect(parseSettings(settings)).not.toBeNull();
    expect(parseNudge(settings)).toBeNull();
    expect(parseHello(settings)).toBeNull();
    expect(parseIncoming(settings)).toBeNull();

    const nudge = buildNudgeBody(TOKEN, { from: '엄마', message: '하자' }).data;
    expect(parseSettings(nudge)).toBeNull();
  });
});

describe('과목 설정 다듬기', () => {
  it('비었거나 깨진 값은 영어로 되돌린다', () => {
    // 하나도 안 고른 상태로 두면 낼 문제가 없어 학습 화면이 빈 채로 뜬다.
    expect(normalizeSubjects(undefined)).toEqual(['en']);
    expect(normalizeSubjects([])).toEqual(['en']);
    expect(normalizeSubjects('영어')).toEqual(['en']);
    expect(normalizeSubjects(['수학'])).toEqual(['en']);
  });

  it('제대로 된 값은 그대로 둔다', () => {
    expect(normalizeSubjects(['ko'])).toEqual(['ko']);
    expect(normalizeSubjects(['en', 'ko'])).toEqual(['en', 'ko']);
  });
});
