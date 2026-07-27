/**
 * 부모용 리포트 생성.
 *
 * 화면(부모 대시보드), 알림 본문, 공유 텍스트가 모두 이 모듈을 쓴다.
 * 순수 함수라서 테스트가 쉽고, 나중에 서버로 옮길 때도 그대로 재사용된다.
 */

import {
  DailyRecord,
  LEVEL_SHORT,
  Profile,
  ProfileData,
  VocabEntry,
} from '../types';
import { formatKo, lastNDays, todayKey } from '../lib/date';
import { meaningLine } from '../data/entry';
import { levelProgress, troubleWords } from '../srs/progress';

export interface DailyReport {
  date: string;
  profileId: string;
  profileName: string;
  /** 목표를 채웠는지 */
  completed: boolean;
  goal: number;
  studied: number;
  correct: number;
  wrong: number;
  accuracy: number; // 0~1
  minutes: number;
  streak: number;
  levelLabel: string;
  levelRatio: number; // 0~1
  /** 오늘 틀린 단어 (많이 틀린 순) */
  todayMistakes: { word: string; meaning: string; count: number }[];
  /** 누적 기준 자주 틀리는 단어 */
  chronicMistakes: { word: string; meaning: string; wrong: number }[];
}

export function buildDailyReport(
  profile: Profile,
  data: ProfileData,
  entries: VocabEntry[],
  date: string = todayKey(),
): DailyReport {
  const day: DailyRecord | undefined = data.days[date];
  const byId = new Map(entries.map((e) => [e.id, e]));

  const counts = new Map<string, number>();
  for (const id of day?.wrongEntryIds ?? []) {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  }

  const todayMistakes = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .flatMap(([id, count]) => {
      const e = byId.get(id);
      return e ? [{ word: e.word, meaning: meaningLine(e), count }] : [];
    });

  const chronicMistakes = troubleWords(entries, data.cards, 5).map(({ entry, card }) => ({
    word: entry.word,
    meaning: meaningLine(entry),
    wrong: card.wrong,
  }));

  const prog = levelProgress(entries, data.cards, profile.level);
  const answered = (day?.correct ?? 0) + (day?.wrong ?? 0);

  return {
    date,
    profileId: profile.id,
    profileName: profile.name,
    completed: day?.completed ?? false,
    goal: day?.goal ?? profile.settings.dailyGoal,
    studied: day?.studied ?? 0,
    correct: day?.correct ?? 0,
    wrong: day?.wrong ?? 0,
    accuracy: answered === 0 ? 0 : (day?.correct ?? 0) / answered,
    minutes: Math.round((day?.seconds ?? 0) / 60),
    streak: profile.streak,
    levelLabel: LEVEL_SHORT[profile.level],
    levelRatio: prog.ratio,
    todayMistakes,
    chronicMistakes,
  };
}

export interface WeeklySummary {
  days: { date: string; completed: boolean; studied: number; accuracy: number }[];
  completedCount: number;
  totalStudied: number;
  averageAccuracy: number;
}

export function buildWeeklySummary(
  data: ProfileData,
  today: string = todayKey(),
): WeeklySummary {
  const keys = lastNDays(7, today);
  const days = keys.map((date) => {
    const d = data.days[date];
    const answered = (d?.correct ?? 0) + (d?.wrong ?? 0);
    return {
      date,
      completed: d?.completed ?? false,
      studied: d?.studied ?? 0,
      accuracy: answered === 0 ? 0 : (d!.correct ?? 0) / answered,
    };
  });

  const withData = days.filter((d) => d.studied > 0);
  return {
    days,
    completedCount: days.filter((d) => d.completed).length,
    totalStudied: days.reduce((s, d) => s + d.studied, 0),
    averageAccuracy:
      withData.length === 0
        ? 0
        : withData.reduce((s, d) => s + d.accuracy, 0) / withData.length,
  };
}

/** 알림 본문처럼 짧게. 한 줄. */
export function reportHeadline(r: DailyReport): string {
  if (r.studied === 0) {
    return `${r.profileName}(이)가 오늘 아직 학습을 시작하지 않았어요.`;
  }
  if (!r.completed) {
    return `${r.profileName} · 오늘 ${r.studied}/${r.goal}개 (목표 미달) · 정답률 ${pct(r.accuracy)}`;
  }
  return `${r.profileName} · 오늘 목표 완료! ${r.studied}개 · 정답률 ${pct(r.accuracy)} · ${r.streak}일 연속`;
}

/** 카카오톡·문자로 보내기 좋은 전체 리포트 텍스트. */
export function reportText(r: DailyReport, weekly?: WeeklySummary): string {
  const lines: string[] = [];
  lines.push(`📚 ${formatKo(r.date)} ${r.profileName} 영단어 학습 리포트`);
  lines.push('');

  if (r.studied === 0) {
    lines.push('오늘은 아직 학습하지 않았습니다.');
  } else {
    lines.push(`${r.completed ? '✅ 목표 달성' : '⚠️ 목표 미달'}  ${r.studied}/${r.goal}개`);
    lines.push(`정답률 ${pct(r.accuracy)} (맞음 ${r.correct} · 틀림 ${r.wrong})`);
    lines.push(`학습 시간 ${r.minutes}분 · 연속 ${r.streak}일`);
  }

  lines.push(`현재 레벨 ${r.levelLabel} · 진도 ${pct(r.levelRatio)}`);

  if (r.todayMistakes.length > 0) {
    lines.push('');
    lines.push('오늘 틀린 단어');
    for (const m of r.todayMistakes) {
      lines.push(` · ${m.word} — ${m.meaning}${m.count > 1 ? ` (${m.count}번)` : ''}`);
    }
  }

  if (r.chronicMistakes.length > 0) {
    lines.push('');
    lines.push('자주 틀리는 단어');
    for (const m of r.chronicMistakes) {
      lines.push(` · ${m.word} — ${m.meaning} (누적 ${m.wrong}회)`);
    }
  }

  if (weekly) {
    lines.push('');
    lines.push(`최근 7일: ${weekly.completedCount}일 달성 · 총 ${weekly.totalStudied}개 · 평균 정답률 ${pct(weekly.averageAccuracy)}`);
  }

  return lines.join('\n');
}

function pct(v: number): string {
  return `${Math.round(v * 100)}%`;
}
