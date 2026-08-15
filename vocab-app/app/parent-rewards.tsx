import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Body, Button, Card, Chip, EmptyState, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { awardRates, formatWon, parseWon } from '../src/features/awards';
import { LEVEL_SHORT, RewardRequest } from '../src/types';
import { colors, radius, spacing } from '../src/theme';

/**
 * 아이가 올린 동기 부여 요청권 신청을 승인·보류한다.
 *
 * 금액은 아이가 정하는 것이 아니라 조건에 따라 이미 정해져 있다.
 *   중학교 레벨업 2만원 · 고등학교 레벨업 3만원 · 한 달 개근 2만원
 */
export default function ParentRewards() {
  const { state, decideReward } = useApp();
  const [notes, setNotes] = useState<Record<string, string>>({});
  /*
   * 달 정산에 얹어 줄 금액. 아직 안 건드린 요청은 여기 키가 없고, 그때는
   * 신청에 담겨 온 제안값을 쓴다.
   */
  const [efforts, setEfforts] = useState<Record<string, string>>({});

  const pending = state.rewards.filter((r) => r.status === 'pending');
  const done = state.rewards.filter((r) => r.status !== 'pending');

  function nameOf(r: RewardRequest): string {
    const p = state.profiles.find((x) => x.id === r.profileId);
    return p ? `${p.avatar} ${p.name}` : '알 수 없음';
  }

  function badgeOf(r: RewardRequest): string {
    if (r.kind === 'perfectMonth') {
      return r.month ? `${Number(r.month.slice(5))}월 개근` : '한 달 개근';
    }
    if (r.kind === 'dailyDone') return '오늘 공부 끝';
    if (r.kind === 'monthlyPurse') {
      return r.month ? `${Number(r.month.slice(5))}월치 모아 받기` : '한 달치 모아 받기';
    }
    return r.earnedFrom ? `${LEVEL_SHORT[r.earnedFrom]} 완료` : '레벨업';
  }

  /**
   * 공로금을 얹어 승인하는 자리에 적힌 금액.
   *
   * 부모가 칸을 안 건드렸으면 **제안값을 그대로** 쓴다. 매번 같은 숫자를 손으로
   * 다시 적게 하면 결국 아무도 안 얹는다.
   */
  function effortOf(r: RewardRequest): number {
    const typed = efforts[r.id];
    if (typed === undefined) return r.effortSuggestion ?? 0;
    return parseWon(typed) ?? 0;
  }

  if (state.rewards.length === 0) {
    const r = awardRates(state.parent.awards);
    return (
      <Screen>
        <EmptyState
          icon="🎁"
          title="아직 보상 요청이 없어요"
          hint={
            '하루치를 다 마치거나 레벨 시험에 통과하면 요청이 올라옵니다.\n' +
            `오늘 공부 끝 ${formatWon(r.dailyDone)} · 중학교 레벨업 ${formatWon(r.middleLevel)} · ` +
            `고등학교 레벨업 ${formatWon(r.highLevel)}\n` +
            '매일 쌓인 것은 달이 바뀌면 아이가 모아서 청구합니다. ' +
            `그달에 ${25}일을 넘겼으면 그때 얹어 주실 수 있어요.\n` +
            '금액은 설정에서 바꿀 수 있습니다.'
          }
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
                <Chip label={badgeOf(r)} tone="accent" />
              </Row>

              <Text style={s.amount}>{formatWon(r.amount)}</Text>
              <Muted style={{ marginTop: spacing.xs }}>{r.reason}</Muted>

              {r.bonus > 0 ? (
                <View style={s.bonusBox}>
                  <Row style={{ justifyContent: 'space-between' }}>
                    <Text style={s.bonusLabel}>⭐️ 아이가 더 요구했어요</Text>
                    <Text style={s.bonusAmount}>
                      {formatWon(r.baseAmount)} + {formatWon(r.bonus)}
                    </Text>
                  </Row>
                  <Muted style={{ marginTop: spacing.xs }}>
                    {r.bonusReason ? `“${r.bonusReason}”` : '이유는 적지 않았어요.'}
                  </Muted>
                </View>
              ) : null}

              {r.note ? <Muted style={{ marginTop: spacing.sm }}>“{r.note}”</Muted> : null}

              {/*
                **스무닷새를 넘긴 달에만 얹는 칸을 낸다.**

                한 달을 꾸준히 한 것은 숫자만으로 다 말해지지 않아서, 마지막
                판단을 부모에게 남긴다. 늘 내면 그것이 정가가 되어 안 얹는 달에
                아이가 깎였다고 느끼므로, 조건을 넘긴 달에만 열린다.
              */}
              {(r.effortSuggestion ?? 0) > 0 ? (
                <View style={s.bonusBox}>
                  <Text style={s.bonusLabel}>🏅 이 달은 스무닷새를 넘겼어요</Text>
                  <Muted style={{ marginTop: spacing.xs }}>
                    쌓인 {formatWon(r.amount)} 에 얹어 주실 금액을 적으세요. 0 으로 두셔도 됩니다.
                  </Muted>
                  <TextInput
                    value={efforts[r.id] ?? String(r.effortSuggestion ?? 0)}
                    onChangeText={(v) => setEfforts((n) => ({ ...n, [r.id]: v }))}
                    placeholder="예: 5000"
                    placeholderTextColor={colors.muted}
                    keyboardType="number-pad"
                    style={s.input}
                    maxLength={9}
                  />
                  <Text style={s.bonusAmount}>
                    모두 {formatWon(r.amount + effortOf(r))}
                  </Text>
                </View>
              ) : null}

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
                  title={
                    (r.effortSuggestion ?? 0) > 0
                      ? `${formatWon(r.amount + effortOf(r))} 주기`
                      : r.bonus > 0
                        ? `${formatWon(r.amount)} 주기`
                        : '주기로 하기'
                  }
                  onPress={() =>
                    decideReward(
                      r.id,
                      'approved',
                      (notes[r.id] ?? '').trim(),
                      // 얹은 금액이 있으면 총액으로 승인한다.
                      (r.effortSuggestion ?? 0) > 0 ? r.amount + effortOf(r) : undefined,
                    )
                  }
                  style={{ flex: 1 }}
                />
                <Button
                  title="다음 기회에"
                  variant="secondary"
                  onPress={() => decideReward(r.id, 'rejected', (notes[r.id] ?? '').trim())}
                  style={{ flex: 1 }}
                />
              </Row>

              {/*
                얹은 금액만 빼고 승인하는 길. 아이의 요구를 통째로 거절하지
                않고 "잘하긴 했지만 기본 금액으로 하자"고 말할 수 있어야 한다.
              */}
              {r.bonus > 0 ? (
                <Button
                  title={`기본 ${formatWon(r.baseAmount)}만 주기`}
                  variant="ghost"
                  onPress={() =>
                    decideReward(r.id, 'approved', (notes[r.id] ?? '').trim(), r.baseAmount)
                  }
                  style={{ marginTop: spacing.sm }}
                />
              ) : null}
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
              <Row style={{ marginTop: spacing.sm, gap: spacing.sm }}>
                <Body style={{ fontWeight: '800' }}>{formatWon(r.amount)}</Body>
                <Muted style={{ flex: 1 }}>{r.reason}</Muted>
              </Row>
              {/* 아이가 신청한 것과 부모가 먼저 준 것은 성격이 다르다. */}
              {r.origin === 'parent' ? (
                <Muted style={{ marginTop: spacing.xs }}>부모님이 먼저 주셨어요</Muted>
              ) : null}
              {r.parentNote ? <Muted style={{ marginTop: spacing.xs }}>“{r.parentNote}”</Muted> : null}
              {r.status === 'approved' ? (
                <Button
                  title="줬어요"
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
  amount: { fontSize: 32, fontWeight: '800', color: colors.text, marginTop: spacing.md },
  bonusBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  bonusLabel: { fontSize: 14, fontWeight: '800', color: '#B45309' },
  bonusAmount: { fontSize: 14, fontWeight: '800', color: '#B45309' },
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
