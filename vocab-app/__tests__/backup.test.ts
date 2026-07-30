/**
 * 백업 내보내기·가져오기.
 *
 * 되돌리기는 한 번 잘못하면 1년치 기록이 날아간다. 그래서 "무엇을 담고
 * 무엇을 안 담는지", "덮어쓸 때 무엇을 지키는지"를 전부 못박아 둔다.
 */

import {
  BACKUP_FORMAT,
  backupFileName,
  buildBackup,
  describeBackup,
  readBackup,
  restoreMerge,
  restoreReplace,
  serializeBackup,
} from '../src/features/backup';
import { emptyProfileData, emptyState } from '../src/store/storage';
import { AppState, CardState, DailyRecord, Profile, ProfileData, RewardRequest } from '../src/types';
import { APP_NAME } from '../src/features/app-name';

function makeProfile(over: Partial<Profile> = {}): Profile {
  return {
    id: 'p1',
    name: '서준',
    avatar: '🦊',
    level: 'm1-1',
    koLevel: 'm1-1',
    settings: {
      newPerDay: 10,
      reviewPerDay: 10,
      rounds: 3,
      subjects: ['en'],
      showTranslation: true,
      ttsEnabled: true,
      hapticsEnabled: true,
    },
    createdAt: 1,
    streak: 3,
    bestStreak: 5,
    lastCompletedDate: '2026-07-27',
    pendingLevelUps: [],
    koPendingLevelUps: [],
    clearedLevels: [],
    koClearedLevels: [],
    claimedMonths: [],
    ...over,
  };
}

function makeCard(id: string): CardState {
  return {
    entryId: id,
    ease: 2.5,
    intervalDays: 7,
    streak: 2,
    correct: 4,
    wrong: 1,
    lapses: 0,
    due: '2026-08-01',
    lastSeen: 1,
    firstSeen: 1,
  };
}

function makeDay(date: string): DailyRecord {
  return {
    date,
    goal: 20,
    studied: 20,
    correct: 18,
    wrong: 2,
    seconds: 600,
    completed: true,
    wrongEntryIds: [],
  };
}

function makeData(over: Partial<ProfileData> = {}): ProfileData {
  return {
    cards: { save: makeCard('save') },
    days: { '2026-07-27': makeDay('2026-07-27') },
    answers: [],
    exams: [],
    ...over,
  };
}

function makeReward(over: Partial<RewardRequest> = {}): RewardRequest {
  return {
    id: 'r1',
    profileId: 'p1',
    kind: 'levelup',
    amount: 20_000,
    baseAmount: 20_000,
    bonus: 0,
    bonusReason: '',
    earnedFrom: 'm1-1',
    month: null,
    reason: '중학교 레벨 하나를 끝냈어요',
    note: '',
    status: 'pending',
    createdAt: 100,
    decidedAt: null,
    parentNote: '',
    origin: 'child',
    ...over,
  };
}

function makeState(over: Partial<AppState> = {}): AppState {
  return {
    ...emptyState(),
    profiles: [makeProfile()],
    activeProfileId: 'p1',
    rewards: [makeReward()],
    ...over,
  };
}

const NOW = Date.UTC(2026, 6, 28, 3, 0, 0);

describe('buildBackup', () => {
  it('아이와 학습 기록을 모두 담는다', () => {
    const state = makeState();
    const data = { p1: makeData() };
    const b = buildBackup(state, data, '1.0.0', NOW);

    expect(b.app).toBe('urivocab');
    expect(b.format).toBe(BACKUP_FORMAT);
    expect(b.state.profiles).toHaveLength(1);
    expect(b.data.p1.cards.save).toBeDefined();
    expect(b.state.rewards).toHaveLength(1);
  });

  it('부모 PIN은 담지 않는다', () => {
    // 파일이 카톡·드라이브를 돌아다니는데 PIN이 적혀 있으면
    // 아이가 열어 보고 그대로 쓸 수 있다.
    const state = makeState({ parent: { ...emptyState().parent, pin: '1234' } });
    const b = buildBackup(state, { p1: makeData() }, '1.0.0', NOW);
    expect(b.state.parent.pin).toBeNull();
    expect(serializeBackup(b)).not.toContain('1234');
  });

  it('기기에 매인 것은 담지 않는다', () => {
    // 새 기기에서 그대로 되살리면 남의 폰으로 리포트를 쏘거나
    // 죽은 토큰으로 계속 실패한다.
    const state = makeState({
      role: 'parent',
      parentLink: { token: 'ExponentPushToken[x]', label: '엄마 폰', linkedAt: 1, lastSentDate: null },
      myPushToken: 'ExponentPushToken[me]',
      receivedReports: [
        { id: 'x', childName: '서준', date: '2026-07-27', headline: 'h', detail: 'd', completed: true, receivedAt: 1 },
      ],
    });
    const b = buildBackup(state, { p1: makeData() }, '1.0.0', NOW);

    expect(b.state.role).toBe('child');
    expect(b.state.parentLink).toBeNull();
    expect(b.state.myPushToken).toBeNull();
    expect(b.state.receivedReports).toEqual([]);
  });

  it('보상 금액 설정은 담는다', () => {
    const state = makeState({
      parent: { ...emptyState().parent, awards: { middleLevel: 5_000, highLevel: 7_000, koreanLevel: 4_000, perfectMonth: 0, bonus: 3_000 } },
    });
    const b = buildBackup(state, { p1: makeData() }, '1.0.0', NOW);
    expect(b.state.parent.awards.middleLevel).toBe(5_000);
    expect(b.state.parent.awards.koreanLevel).toBe(4_000);
    expect(b.state.parent.awards.perfectMonth).toBe(0);
  });
});

describe('backupFileName', () => {
  it('만든 날짜가 이름에 들어간다', () => {
    // 파일이 여러 개 쌓였을 때 어느 것이 최신인지 보여야 한다.
    const name = backupFileName(new Date(2026, 6, 5).getTime());
    expect(name).toBe('가가Voca-백업-2026-07-05.json');
  });
});

describe('readBackup', () => {
  const good = serializeBackup(buildBackup(makeState(), { p1: makeData() }, '1.0.0', NOW));

  it('우리 백업 파일을 읽는다', () => {
    const r = readBackup(good);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.backup.state.profiles[0].name).toBe('서준');
  });

  it('json이 아니면 거절한다', () => {
    const r = readBackup('이건 그냥 글입니다');
    expect(r.ok).toBe(false);
  });

  it('다른 앱의 json은 거절한다', () => {
    // 엉뚱한 파일을 덮어쓰기로 밀어 넣으면 기록이 통째로 날아간다.
    const r = readBackup(JSON.stringify({ hello: 'world' }));
    expect(r.ok).toBe(false);
    // 앱 이름은 app.json 하나에서 온다. 여기에 이름을 박아 두면
    // 이름을 바꿀 때마다 테스트가 깨진다.
    if (!r.ok) expect(r.reason).toContain(APP_NAME);
  });

  it('더 새 판에서 만든 백업은 거절한다', () => {
    // 억지로 읽으면 모르는 필드를 조용히 버리게 된다.
    const newer = JSON.stringify({ ...JSON.parse(good), format: BACKUP_FORMAT + 1 });
    const r = readBackup(newer);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.reason).toContain('업데이트');
  });

  it('예전 판에서 만든 백업은 읽는다', () => {
    const older = JSON.stringify({ ...JSON.parse(good), format: BACKUP_FORMAT });
    expect(readBackup(older, BACKUP_FORMAT + 1).ok).toBe(true);
  });

  it('아이 정보가 빠졌으면 거절한다', () => {
    const broken = JSON.stringify({ app: 'urivocab', format: BACKUP_FORMAT, data: {} });
    expect(readBackup(broken).ok).toBe(false);
  });

  it('학습 기록이 빠졌으면 거절한다', () => {
    const broken = JSON.stringify({ app: 'urivocab', format: BACKUP_FORMAT, state: { profiles: [] } });
    expect(readBackup(broken).ok).toBe(false);
  });
});

describe('describeBackup', () => {
  it('되돌리기 전에 무엇이 들어 있는지 보여준다', () => {
    const state = makeState({ profiles: [makeProfile(), makeProfile({ id: 'p2', name: '지호', level: 'm2-1' })] });
    const b = buildBackup(state, { p1: makeData(), p2: makeData({ cards: {} }) }, '1.0.0', NOW);
    const info = describeBackup(b);

    expect(info.names).toEqual(['서준', '지호']);
    expect(info.children[0]).toEqual({ name: '서준', level: 'm1-1', days: 1, words: 1 });
    expect(info.children[1].words).toBe(0);
  });

  it('학습 데이터가 없는 아이도 빠뜨리지 않는다', () => {
    const b = buildBackup(makeState(), {}, '1.0.0', NOW);
    expect(describeBackup(b).children).toEqual([{ name: '서준', level: 'm1-1', days: 0, words: 0 }]);
  });
});

describe('restoreReplace — 통째로 되돌리기', () => {
  const backup = buildBackup(
    makeState({ profiles: [makeProfile({ name: '옛날서준', streak: 9 })] }),
    { p1: makeData() },
    '1.0.0',
    NOW,
  );

  it('백업의 아이와 기록으로 바뀐다', () => {
    const current = makeState({ profiles: [makeProfile({ name: '지금서준' })] });
    const r = restoreReplace(backup, current);

    expect(r.state.profiles[0].name).toBe('옛날서준');
    expect(r.state.profiles[0].streak).toBe(9);
    expect(r.data.p1.cards.save).toBeDefined();
  });

  it('지금 기기의 PIN은 지킨다', () => {
    // 백업에는 PIN이 없다. 그대로 쓰면 부모 모드가 풀려 버린다.
    const current = makeState({ parent: { ...emptyState().parent, pin: '9999' } });
    const r = restoreReplace(backup, current);
    expect(r.state.parent.pin).toBe('9999');
  });

  it('지금 기기의 역할과 부모 폰 연결은 지킨다', () => {
    // 새 폰에서 되돌리는 상황이다. 연결은 그 폰에서 이미 해 둔 것이 맞다.
    const link = { token: 'ExponentPushToken[now]', label: '엄마 폰', linkedAt: 2, lastSentDate: null };
    const current = makeState({ role: 'parent', parentLink: link, myPushToken: 'me' });
    const r = restoreReplace(backup, current);

    expect(r.state.role).toBe('parent');
    expect(r.state.parentLink).toEqual(link);
    expect(r.state.myPushToken).toBe('me');
  });

  it('저장 포맷 판은 지금 앱 것으로 둔다', () => {
    const current = makeState();
    const old = { ...backup, state: { ...backup.state, version: 1 } };
    expect(restoreReplace(old, current).state.version).toBe(current.version);
  });
});

describe('restoreMerge — 아이만 가져오기', () => {
  it('지금 아이는 그대로 두고 백업의 아이를 더한다', () => {
    const current = makeState({ profiles: [makeProfile({ id: 'a', name: '큰딸' })], rewards: [] });
    const backup = buildBackup(
      makeState({ profiles: [makeProfile({ id: 'b', name: '작은딸' })], rewards: [] }),
      { b: makeData() },
      '1.0.0',
      NOW,
    );

    const r = restoreMerge(backup, current, { a: makeData() });

    expect(r.state.profiles.map((p) => p.name)).toEqual(['큰딸', '작은딸']);
    expect(r.data.a).toBeDefined();
    expect(r.data.b).toBeDefined();
  });

  it('id가 겹치면 덮어쓰지 않고 새 id로 들여온다', () => {
    // 덮어쓰면 이름만 같은 다른 아이의 1년치가 조용히 사라진다.
    const current = makeState({
      profiles: [makeProfile({ id: 'p1', name: '이 기기 서준' })],
      rewards: [],
    });
    const currentData = { p1: makeData({ days: { '2026-01-01': makeDay('2026-01-01') } }) };
    const backup = buildBackup(
      makeState({ profiles: [makeProfile({ id: 'p1', name: '다른 기기 서준' })], rewards: [] }),
      { p1: makeData({ days: { '2026-06-01': makeDay('2026-06-01') } }) },
      '1.0.0',
      NOW,
    );

    const r = restoreMerge(backup, current, currentData, (n) => `new${n}`);

    expect(r.state.profiles).toHaveLength(2);
    expect(r.state.profiles[1].id).toBe('new0');
    // 원래 아이의 기록이 그대로 남아 있어야 한다.
    expect(Object.keys(r.data.p1.days)).toEqual(['2026-01-01']);
    expect(Object.keys(r.data.new0.days)).toEqual(['2026-06-01']);
  });

  it('보상 요청도 새 id를 따라간다', () => {
    // 안 따라가면 부모 화면에 '알 수 없음'으로 남는다.
    const current = makeState({ profiles: [makeProfile({ id: 'p1' })], rewards: [] });
    const backup = buildBackup(
      makeState({
        profiles: [makeProfile({ id: 'p1', name: '들여온 아이' })],
        rewards: [makeReward({ id: 'r9', profileId: 'p1' })],
      }),
      { p1: makeData() },
      '1.0.0',
      NOW,
    );

    const r = restoreMerge(backup, current, { p1: makeData() }, () => 'fresh');
    const moved = r.state.rewards.find((x) => x.id === 'r9')!;
    expect(moved.profileId).toBe('fresh');
  });

  it('이미 있는 보상 요청을 두 번 넣지 않는다', () => {
    // 같은 백업을 두 번 가져와도 안전해야 한다.
    const reward = makeReward({ id: 'same', profileId: 'p1' });
    const current = makeState({ profiles: [], rewards: [reward] });
    const backup = buildBackup(
      makeState({ profiles: [makeProfile({ id: 'p1' })], rewards: [reward] }),
      { p1: makeData() },
      '1.0.0',
      NOW,
    );

    const r = restoreMerge(backup, current, {});
    expect(r.state.rewards.filter((x) => x.id === 'same')).toHaveLength(1);
  });

  it('보고 있던 아이는 바뀌지 않는다', () => {
    // 가져오기를 했다고 화면이 갑자기 다른 아이로 바뀌면 무슨 일이
    // 일어났는지 알 수 없다.
    const current = makeState({ profiles: [makeProfile({ id: 'a' })], activeProfileId: 'a', rewards: [] });
    const backup = buildBackup(
      makeState({ profiles: [makeProfile({ id: 'b' })], rewards: [] }),
      { b: makeData() },
      '1.0.0',
      NOW,
    );

    expect(restoreMerge(backup, current, { a: makeData() }).state.activeProfileId).toBe('a');
  });

  it('아이가 없던 기기에 가져오면 그 아이를 보게 된다', () => {
    const current = makeState({ profiles: [], activeProfileId: null, rewards: [] });
    const backup = buildBackup(
      makeState({ profiles: [makeProfile({ id: 'b', name: '작은딸' })], rewards: [] }),
      { b: makeData() },
      '1.0.0',
      NOW,
    );

    const r = restoreMerge(backup, current, {});
    expect(r.state.activeProfileId).toBe('b');
  });
});

describe('내보내고 다시 가져오기', () => {
  it('한 바퀴 돌아도 학습 기록이 그대로다', () => {
    const state = makeState({
      profiles: [makeProfile({ id: 'p1', name: '큰딸' }), makeProfile({ id: 'p2', name: '작은딸', level: 'm2-3' })],
    });
    const data = {
      p1: makeData({ cards: { save: makeCard('save'), increase: makeCard('increase') } }),
      p2: makeData({ days: { '2026-07-01': makeDay('2026-07-01'), '2026-07-02': makeDay('2026-07-02') } }),
    };

    const text = serializeBackup(buildBackup(state, data, '1.0.0', NOW));
    const parsed = readBackup(text);
    expect(parsed.ok).toBe(true);
    if (!parsed.ok) return;

    const restored = restoreReplace(parsed.backup, emptyState());

    expect(restored.state.profiles.map((p) => p.name)).toEqual(['큰딸', '작은딸']);
    expect(restored.state.profiles[1].level).toBe('m2-3');
    expect(Object.keys(restored.data.p1.cards).sort()).toEqual(['increase', 'save']);
    expect(Object.keys(restored.data.p2.days)).toHaveLength(2);
  });

  it('아이가 한 명도 없어도 내보내고 가져올 수 있다', () => {
    const text = serializeBackup(buildBackup(emptyState(), {}, '1.0.0', NOW));
    const parsed = readBackup(text);
    expect(parsed.ok).toBe(true);
    if (parsed.ok) expect(restoreReplace(parsed.backup, emptyState()).state.profiles).toEqual([]);
  });
});
