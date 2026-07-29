/**
 * 연결된 아이들과 오늘 상태.
 *
 * 부모님이 PIN 을 누르고 들어와서 **가장 먼저 알고 싶은 것**은 "오늘 했나"다.
 * 예전에는 받은 리포트가 날짜별로 쌓여 있기만 해서, 아이가 둘이면 누가
 * 했고 누가 안 했는지를 눈으로 훑어 찾아야 했다.
 *
 * 아이 목록은 `knownChildren` 에서 온다. 연결할 때 아이 기기가 자기 주소를
 * 보내 오므로, **리포트가 한 번도 안 와도 이름이 보인다.** 정작 궁금한 것이
 * "아직 안 한 아이"이기 때문에 이 편이 맞다.
 */

import { Body, Card, Chip, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { todayKey } from '../lib/date';
import { colors, spacing } from '../theme';

export function LinkedChildren() {
  const { state } = useApp();
  const today = todayKey();
  const children = state.knownChildren ?? [];

  if (children.length === 0) {
    return (
      <Card style={{ marginTop: spacing.md }}>
        <H3>👧 연결된 아이</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          아직 연결된 기기가 없어요. 설정에서 아이에게 연결 요청을 보내고,
          아이 폰에서 링크를 한 번 누르면 여기에 나타납니다.
        </Muted>
      </Card>
    );
  }

  return (
    <Card style={{ marginTop: spacing.md }}>
      <H3>👧 연결된 아이</H3>
      <Muted style={{ marginTop: spacing.xs }}>오늘 공부했는지 한눈에 보여줍니다.</Muted>

      {children.map((c) => {
        const todayReport = state.receivedReports.find(
          (r) => r.childName === c.name && r.date === today,
        );
        const latest = state.receivedReports.find((r) => r.childName === c.name);

        return (
          <Card key={c.token} style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
            <Row style={{ justifyContent: 'space-between' }}>
              <Body style={{ fontWeight: '800' }}>{c.name}</Body>
              {todayReport ? (
                <Chip
                  label={todayReport.completed ? '오늘 다 했어요' : '오늘 하는 중'}
                  tone={todayReport.completed ? 'correct' : 'primary'}
                />
              ) : (
                <Chip label="오늘 아직" tone="default" />
              )}
            </Row>

            <Muted style={{ marginTop: spacing.xs }}>
              {todayReport
                ? todayReport.headline
                : latest
                  ? `마지막 소식: ${latest.date} · ${latest.headline}`
                  : '아직 받은 리포트가 없어요.'}
            </Muted>
          </Card>
        );
      })}
    </Card>
  );
}
