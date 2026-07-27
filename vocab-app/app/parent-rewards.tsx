import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { LEVEL_SHORT, RewardRequest } from '../src/types';
import { colors, radius, spacing } from '../src/theme';

/** 아이가 레벨업으로 올린 보상 요청을 승인·거절한다. */
export default function ParentRewards() {
  const { state, decideReward } = useApp();
  const [notes, setNotes] = useState<Record<string, string>>({});

  const pending = state.rewards.filter((r) => r.status === 'pending');
  const done = state.rewards.filter((r) => r.status !== 'pending');

  function nameOf(r: RewardRequest): string {
    const p = state.profiles.find((x) => x.id === r.profileId);
    return p ? `${p.avatar} ${p.name}` : '알 수 없음';
  }

  if (state.rewards.length === 0) {
    return (
      <Screen>
        <EmptyState
          icon="🎁"
          title="아직 보상 요청이 없어요"
          hint="아이가 한 학년의 단어를 모두 익히면 갖고 싶은 것을 요청할 수 있어요."
        />
      </Screen>
    );
  }

  return (
    <Screen>
      {pending.length > 0 ? (
        <>
          <H3 style={{ paddingTop: spacing.md }}>확인이 필요한 요청</H3>
          {pending.map((r) => (
            <Card key={r.id} style={{ marginTop: spacing.md, borderColor: colors.accent }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Muted>{nameOf(r)}</Muted>
                <Chip label={`${LEVEL_SHORT[r.earnedFrom]} 완료`} tone="accent" />
              </Row>

              <Text style={s.wish}>{r.wish}</Text>
              {r.note ? <Muted style={{ marginTop: spacing.sm }}>“{r.note}”</Muted> : null}

              <TextInput
                value={notes[r.id] ?? ''}
                onChangeText={(v) => setNotes((n) => ({ ...n, [r.id]: v }))}
                placeholder="아이에게 한마디 (선택)"
                placeholderTextColor={colors.muted}
                style={s.input}
                maxLength={100}
              />

              <Row style={{ gap: spacing.sm, marginTop: spacing.md }}>
                <Button
                  title="들어주기"
                  onPress={() => decideReward(r.id, 'approved', (notes[r.id] ?? '').trim())}
                  style={{ flex: 1 }}
                />
                <Button
                  title="다음 기회에"
                  variant="secondary"
                  onPress={() => decideReward(r.id, 'rejected', (notes[r.id] ?? '').trim())}
                  style={{ flex: 1 }}
                />
              </Row>
            </Card>
          ))}
        </>
      ) : null}

      {done.length > 0 ? (
        <>
          <H3 style={{ marginTop: spacing.xl }}>지난 요청</H3>
          {done.map((r) => (
            <Card key={r.id} style={{ marginTop: spacing.md }}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Muted>{nameOf(r)}</Muted>
                <Chip
                  label={
                    r.status === 'approved' ? '승인' : r.status === 'fulfilled' ? '완료' : '보류'
                  }
                  tone={r.status === 'rejected' ? 'wrong' : 'correct'}
                />
              </Row>
              <Body style={{ marginTop: spacing.sm, fontWeight: '700' }}>{r.wish}</Body>
              {r.parentNote ? <Muted style={{ marginTop: spacing.xs }}>“{r.parentNote}”</Muted> : null}
              {r.status === 'approved' ? (
                <Button
                  title="약속 지켰어요"
                  variant="ghost"
                  onPress={() => decideReward(r.id, 'fulfilled', r.parentNote)}
                  style={{ marginTop: spacing.sm }}
                />
              ) : null}
            </Card>
          ))}
        </>
      ) : null}
    </Screen>
  );
}

const s = StyleSheet.create({
  wish: { fontSize: 22, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  input: {
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: 15,
    color: colors.text,
    backgroundColor: colors.bg,
  },
});
