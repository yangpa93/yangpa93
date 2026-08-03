/**
 * 한 달 성적표.
 *
 * 달력 아래의 요약은 "며칠 했고 몇 개 풀었나"를 본다. 한 달을 마치고 알고
 * 싶은 것은 조금 다르다 — **개근했나, 새 단어를 몇 개 익혔나, 레벨이
 * 올라갔나.** 그 셋이 보상과 진도에 직접 걸리는 것들이다.
 *
 * 개근은 그 달이 끝나야 확정된다. 진행 중인 달에 '개근!'이라고 적어 두면
 * 마지막 날 하루를 빠뜨렸을 때 아이가 배신감을 느낀다. 그래서 남은 날이
 * 있으면 '아직 지키는 중'이라고만 한다.
 */

import { Body, Card, Chip, H3, Muted, Row } from './ui';
import { MonthlyReport } from '../features/monthly';
import { formatMonth } from '../features/calendar';
import { LEVEL_SHORT } from '../types';
import { colors, spacing } from '../theme';

export function MonthlyCard({ report, name }: { report: MonthlyReport; name: string }) {
  const r = report;
  const nothing = r.studiedDays === 0;

  return (
    <Card style={{ marginTop: spacing.md, borderColor: colors.accent }}>
      <Row style={{ justifyContent: 'space-between' }}>
        <H3>📅 {formatMonth(r.month)} 성적표</H3>
        {r.perfect ? (
          <Chip label="개근 🎉" tone="correct" />
        ) : r.perfectAlive && r.elapsedDays > 0 ? (
          <Chip label="개근 지키는 중" tone="primary" />
        ) : null}
      </Row>

      {nothing ? (
        <Muted style={{ marginTop: spacing.md }}>이 달에는 아직 공부한 날이 없어요.</Muted>
      ) : (
        <>
          <Row style={{ justifyContent: 'space-around', marginTop: spacing.lg }}>
            <Stat label="공부한 날" value={`${r.studiedDays}일`} sub={`/ ${r.elapsedDays}일 중`} />
            <Stat label="새로 배운 단어" value={`${r.newWords}개`} />
            <Stat label="완전히 외운 단어" value={`${r.mastered}개`} />
          </Row>

          <Muted style={{ marginTop: spacing.lg }}>
            {`${r.answered}문제 · 정답률 ${Math.round(r.accuracy * 100)}% · ${r.minutes}분`}
            {r.bestStreak > 1 ? ` · 최장 ${r.bestStreak}일 연속` : ''}
          </Muted>

          {r.levelsPassed.length > 0 ? (
            <Row style={{ marginTop: spacing.md, gap: spacing.sm, flexWrap: 'wrap' }}>
              {r.levelsPassed.map((l) => (
                <Chip key={l} label={`🏅 ${LEVEL_SHORT[l]} 통과`} tone="accent" />
              ))}
            </Row>
          ) : null}

          {/* 개근이 아직 살아 있으면 며칠 남았는지 알려 준다. 남은 날을
              알아야 "오늘 하루만 더" 가 된다. */}
          {!r.perfect && r.perfectAlive && r.elapsedDays > 0 ? (
            <Body style={{ marginTop: spacing.md, color: colors.correct }}>
              {`${name}, ${r.totalDays - r.elapsedDays}일만 더 하면 이번 달 개근이에요!`}
            </Body>
          ) : null}
        </>
      )}
    </Card>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Row style={{ flexDirection: 'column', alignItems: 'center' }}>
      <Body style={{ fontWeight: '800', fontSize: 20 }}>{value}</Body>
      <Muted style={{ marginTop: 2 }}>{label}</Muted>
      {sub ? <Muted style={{ fontSize: 11 }}>{sub}</Muted> : null}
    </Row>
  );
}
