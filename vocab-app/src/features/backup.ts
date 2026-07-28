/**
 * 학습 기록 내보내기·가져오기.
 *
 * 이 앱은 서버가 없어서 **기록이 그 기기 안에만** 있다. 폰을 바꾸거나 앱을
 * 지우면 1년치가 통째로 사라진다. 그래서 파일 한 장으로 통째로 빼고 넣을
 * 수 있게 했다. 카톡으로 자기에게 보내 두거나 드라이브에 올려 두면 그게
 * 백업이 된다.
 *
 * 여기에는 **파일을 만들고 읽는 순수 로직만** 둔다. 실제 파일 입출력은
 * app/parent-backup.tsx 가 한다. 되돌리기는 한 번 잘못하면 기록이 날아가는
 * 동작이라, 판단하는 부분을 화면과 떼어 놓고 테스트로 묶어 두려는 것이다.
 */

import { AppState, Profile, ProfileData, RewardRequest } from '../types';
import { emptyProfileData } from '../store/storage';

/**
 * 백업 파일 판.
 *
 * 앱의 저장 포맷(STATE_VERSION)과 따로 둔다. 저장 포맷이 올라가도 백업
 * 파일의 겉모양이 그대로면 이 값은 안 올라간다. 반대로 이 값이 올라가면
 * 예전 앱은 그 파일을 못 읽는다는 뜻이다.
 */
export const BACKUP_FORMAT = 1;

export interface BackupFile {
  /** 다른 앱의 json을 잘못 고르는 것을 막는 표시 */
  app: 'urivocab';
  format: number;
  /** 만들 때의 저장 포맷 판. 가져올 때 마이그레이션에 쓴다. */
  stateVersion: number;
  /** 만든 시각 (epoch ms) */
  createdAt: number;
  /** 만든 앱 판 (1.0.0) */
  appVersion: string;
  state: AppState;
  /** 프로필 id → 그 아이의 학습 데이터 */
  data: Record<string, ProfileData>;
}

/* ------------------------------------------------------------------ */
/* 내보내기                                                            */
/* ------------------------------------------------------------------ */

/**
 * 지금 기기의 모든 것을 백업 한 덩어리로 만든다.
 *
 * 부모 PIN은 **빼고** 담는다. 파일이 카톡·드라이브를 돌아다니는데 거기에
 * PIN이 적혀 있으면 아이가 열어 보고 그대로 쓸 수 있다. 되돌린 뒤에는
 * PIN을 다시 정하면 된다.
 */
export function buildBackup(
  state: AppState,
  data: Record<string, ProfileData>,
  appVersion: string,
  now: number,
): BackupFile {
  return {
    app: 'urivocab',
    format: BACKUP_FORMAT,
    stateVersion: state.version,
    createdAt: now,
    appVersion,
    state: {
      ...state,
      parent: { ...state.parent, pin: null },
      // 기기에 매인 것들은 백업에 넣지 않는다. 새 기기에서 그대로 되살리면
      // 남의 폰으로 리포트를 쏘거나, 죽은 토큰으로 계속 실패한다.
      role: 'child',
      parentLink: null,
      myPushToken: null,
      receivedReports: [],
    },
    data,
  };
}

/** `우리영단어-백업-2026-07-28.json` */
export function backupFileName(now: number): string {
  const d = new Date(now);
  const p = (n: number) => String(n).padStart(2, '0');
  return `우리영단어-백업-${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}.json`;
}

export function serializeBackup(backup: BackupFile): string {
  return JSON.stringify(backup);
}

/* ------------------------------------------------------------------ */
/* 읽기                                                                */
/* ------------------------------------------------------------------ */

export type ReadResult =
  | { ok: true; backup: BackupFile }
  | { ok: false; reason: string };

/**
 * 고른 파일이 우리 백업이 맞는지 확인하고 읽는다.
 *
 * 엉뚱한 파일을 덮어쓰기로 밀어 넣으면 기록이 통째로 날아가므로,
 * 의심스러우면 무조건 거절한다.
 */
export function readBackup(text: string, currentFormat: number = BACKUP_FORMAT): ReadResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, reason: '백업 파일이 아니에요. 파일이 깨졌거나 다른 형식이에요.' };
  }

  if (typeof parsed !== 'object' || parsed === null) {
    return { ok: false, reason: '백업 파일이 아니에요.' };
  }

  const b = parsed as Partial<BackupFile>;

  if (b.app !== 'urivocab') {
    return { ok: false, reason: '우리 영단어 백업 파일이 아니에요. 다른 앱의 파일 같아요.' };
  }
  if (typeof b.format !== 'number') {
    return { ok: false, reason: '백업 파일이 손상됐어요.' };
  }
  if (b.format > currentFormat) {
    // 더 새 앱에서 만든 파일이다. 억지로 읽으면 모르는 필드를 버리게 된다.
    return {
      ok: false,
      reason: '더 최신 판에서 만든 백업이에요. 앱을 먼저 업데이트해 주세요.',
    };
  }
  if (!b.state || !Array.isArray(b.state.profiles)) {
    return { ok: false, reason: '백업 파일에 아이 정보가 없어요.' };
  }
  if (!b.data || typeof b.data !== 'object') {
    return { ok: false, reason: '백업 파일에 학습 기록이 없어요.' };
  }

  return { ok: true, backup: b as BackupFile };
}

/** 되돌리기 전에 "무엇이 들어 있는지" 보여줄 요약. */
export interface BackupSummary {
  createdAt: number;
  appVersion: string;
  /** 아이 이름들 */
  names: string[];
  /** 아이별 요약 */
  children: { name: string; level: string; days: number; words: number }[];
}

export function describeBackup(backup: BackupFile): BackupSummary {
  const children = backup.state.profiles.map((p) => {
    const d = backup.data[p.id] ?? emptyProfileData();
    return {
      name: p.name,
      level: p.level,
      days: Object.keys(d.days ?? {}).length,
      words: Object.keys(d.cards ?? {}).length,
    };
  });

  return {
    createdAt: backup.createdAt,
    appVersion: backup.appVersion ?? '?',
    names: children.map((c) => c.name),
    children,
  };
}

/* ------------------------------------------------------------------ */
/* 되돌리기                                                            */
/* ------------------------------------------------------------------ */

export interface RestoreResult {
  state: AppState;
  data: Record<string, ProfileData>;
}

/**
 * 통째로 되돌리기 — 지금 기기의 기록을 버리고 백업으로 바꾼다.
 *
 * 폰을 바꿨을 때 쓴다. 기기에 매인 것(역할·부모 폰 연결·푸시 토큰)은
 * **지금 기기 것을 그대로 둔다.** 백업에 담지도 않았고, 새 기기에서
 * 다시 연결하는 편이 맞기 때문이다. PIN도 지금 기기 것을 지킨다 —
 * 백업에는 PIN이 없어서 그대로 쓰면 부모 모드가 풀려 버린다.
 */
export function restoreReplace(backup: BackupFile, current: AppState): RestoreResult {
  const state: AppState = {
    ...backup.state,
    version: current.version,
    parent: {
      ...backup.state.parent,
      pin: current.parent.pin,
    },
    role: current.role,
    parentLink: current.parentLink,
    myPushToken: current.myPushToken,
    receivedReports: current.receivedReports,
  };

  return { state, data: { ...backup.data } };
}

/**
 * 아이만 가져오기 — 지금 기록은 그대로 두고 백업의 아이들을 더한다.
 *
 * 두 딸이 각자 기기를 쓰다가 한 기기에 모을 때 쓴다. 같은 id가 이미
 * 있으면 **덮어쓰지 않고 새 id로 들여온다.** 덮어쓰면 이름만 같은 다른
 * 아이의 1년치가 조용히 사라진다. 보상 요청도 새 id를 따라간다.
 */
export function restoreMerge(
  backup: BackupFile,
  current: AppState,
  currentData: Record<string, ProfileData>,
  newId: (seed: number) => string = (n) => `p_imported_${n}`,
): RestoreResult {
  const taken = new Set(current.profiles.map((p) => p.id));
  /** 백업 안의 id → 이 기기에서 쓸 id */
  const remap = new Map<string, string>();

  const added: Profile[] = [];
  const data: Record<string, ProfileData> = { ...currentData };

  backup.state.profiles.forEach((p, i) => {
    const id = taken.has(p.id) ? newId(i) : p.id;
    taken.add(id);
    remap.set(p.id, id);
    added.push({ ...p, id });
    data[id] = backup.data[p.id] ?? emptyProfileData();
  });

  // 들여온 아이의 보상 요청도 같이 옮긴다. 안 옮기면 아이 이름이 안 붙은
  // 요청이 부모 화면에 '알 수 없음'으로 남는다.
  const rewards: RewardRequest[] = backup.state.rewards
    .filter((r) => remap.has(r.profileId))
    .map((r) => ({ ...r, profileId: remap.get(r.profileId)! }));

  const seen = new Set(current.rewards.map((r) => r.id));
  const mergedRewards = [
    ...current.rewards,
    ...rewards.filter((r) => !seen.has(r.id)),
  ].sort((a, b) => b.createdAt - a.createdAt);

  return {
    state: {
      ...current,
      profiles: [...current.profiles, ...added],
      // 지금 보고 있던 아이는 그대로 둔다. 가져오기를 했다고 화면이
      // 갑자기 다른 아이로 바뀌면 무엇이 일어났는지 알 수 없다.
      activeProfileId: current.activeProfileId ?? added[0]?.id ?? null,
      rewards: mergedRewards,
    },
    data,
  };
}
