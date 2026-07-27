import { buildLinkUrl, isValidPushToken, parseIncoming, toPayload } from '../src/features/pairing';
import { buildDailyReport } from '../src/features/report';
import { ALL_ENTRIES, entriesOf } from '../src/data';
import { Profile, ProfileData } from '../src/types';

const TODAY = '2026-07-27';
const TOKEN = 'ExponentPushToken[abcd1234EFGH5678ijkl]';

function makeProfile(over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '서준',
    avatar: '🦊',
    level: 'm1-1',
    settings: {
      dailyGoal: 15,
      rounds: 3,
      reviewRatio: 70,
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 0,
    streak: 3,
    bestStreak: 5,
    lastCompletedDate: '2026-07-26',
    pendingLevelUps: [],
    clearedLevels: [],
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
    expect(url.startsWith('urivocab://link?')).toBe(true);
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
