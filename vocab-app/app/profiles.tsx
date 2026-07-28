import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Card, H3, Muted, ProgressBar, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { ALL_ENTRIES } from '../src/data';
import { levelProgress } from '../src/srs/progress';
import { LEVEL_SHORT } from '../src/types';
import { colors, radius, spacing } from '../src/theme';
import { useEffect, useState } from 'react';
import { loadProfileData } from '../src/store/storage';

export default function Profiles() {
  const { state, selectProfile, data } = useApp();
  const [ratios, setRatios] = useState<Record<string, number>>({});

  // 다른 아이들 진도는 각자 저장소에서 따로 읽어와야 한다.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const out: Record<string, number> = {};
      for (const p of state.profiles) {
        const d = p.id === state.activeProfileId ? data : await loadProfileData(p.id);
        out[p.id] = levelProgress(ALL_ENTRIES, d.cards, p.level).ratio;
      }
      if (!cancelled) setRatios(out);
    })();
    return () => {
      cancelled = true;
    };
  }, [state.profiles, state.activeProfileId, data]);

  async function pick(id: string) {
    await selectProfile(id);
    router.replace('/home');
  }

  return (
    <Screen>
      <View style={{ paddingTop: spacing.md, gap: spacing.md }}>
        {state.profiles.map((p) => {
          const active = p.id === state.activeProfileId;
          return (
            <Pressable key={p.id} onPress={() => pick(p.id)} accessibilityRole="button">
              <Card style={active ? s.activeCard : undefined}>
                <Row>
                  <Text style={{ fontSize: 40 }}>{p.avatar}</Text>
                  <View style={{ marginLeft: spacing.md, flex: 1 }}>
                    <Row style={{ justifyContent: 'space-between' }}>
                      <H3>{p.name}</H3>
                      {active ? <Text style={s.badge}>학습 중</Text> : null}
                    </Row>
                    <Muted>
                      {LEVEL_SHORT[p.level]} · 🔥 {p.streak}일 연속
                    </Muted>
                    <View style={{ marginTop: spacing.sm }}>
                      <ProgressBar value={ratios[p.id] ?? 0} height={6} color={colors.accent} />
                    </View>
                  </View>
                </Row>
              </Card>
            </Pressable>
          );
        })}
      </View>

      <Button
        title="+ 아이 추가하기"
        variant="secondary"
        onPress={() => router.push('/onboarding')}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}

const s = StyleSheet.create({
  activeCard: { borderColor: colors.primary, borderWidth: 2 },
  badge: {
    fontSize: 11,
    fontWeight: '800',
    color: colors.primary,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
});
