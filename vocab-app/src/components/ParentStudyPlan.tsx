/**
 * 부모님이 무엇을 어떻게 공부할지 정하는 부분.
 *
 * **왜 화면이 아니라 부품인가.** 예전에는 `/parent-plan` 이라는 별도 화면이었고,
 * 부모 홈에는 '내 학습 기록' 타일과 '무엇을 공부할지 바꾸기' 흐린 버튼이
 * 따로 있었다. 그런데 둘이 무엇이 다른지 알 수 없다는 말을 들었다. 부모가
 * 자기 공부에 대해 하는 일은 **보는 것과 고치는 것 둘뿐**이라, 한 화면
 * (`/parent-record`)에 두는 편이 맞다. 그래서 화면을 부품으로 내렸다.
 *
 * 세 갈래를 켜고 끄고, 켠 것마다 어디를 볼지 고른다. 하루 분량은 5개 아니면
 * 10개다 — 어른의 저녁에 낼 수 있는 시간이 그 언저리이고, 고를 것이 많으면
 * 고르다가 안 한다.
 *
 * 갈래를 여러 개 켜면 하루 분량을 **나눠 갖는다**. 셋을 켜고 10개씩 내면
 * 하루 30개가 되어 아무도 못 한다. 지금 어떻게 나뉘는지를 화면에 그대로
 * 적어 둔다 — 골라 놓고 왜 5개만 나오는지 몰라 헤매지 않도록.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { LevelPicker } from './LevelPicker';
import { DAILY_THEME_LIST } from '../data/daily';
import { KO_ENTRIES } from '../data/korean/levels';
import { splitPerTrack } from '../srs/parentSession';
import {
  LEVEL_SHORT,
  LevelId,
  PARENT_NEW_PER_DAY,
  PARENT_TRACK_LABEL,
  ParentTrack,
} from '../types';
import { colors, font, radius, spacing } from '../theme';

export function ParentStudyPlan() {
  const { profile, updateParentStudy, updateProfile } = useApp();

  if (!profile) return null;

  const study = profile.parentStudy;
  const per = splitPerTrack(study);

  function toggle(track: ParentTrack) {
    if (!profile) return;
    const on = study.tracks.includes(track);
    updateParentStudy(profile.id, {
      tracks: on ? study.tracks.filter((t) => t !== track) : [...study.tracks, track],
    });
  }

  const koCount = KO_ENTRIES.filter((e) => e.level === profile.koLevel).length;

  return (
    <View>
      <Muted style={{ marginTop: spacing.sm }}>
        공부할 것을 고르세요. 여러 개를 켜면 하루 분량을 나눠 갖습니다. 문제 내는 방식과
        복습 간격은 아이들과 똑같아요.
      </Muted>

      {/* 하루 분량 */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>하루에 몇 개</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          새로 만날 개수입니다. 복습은 여기에 얹히니 실제로 푸는 것은 이보다 많아요.
        </Muted>
        <Row style={{ gap: spacing.sm, marginTop: spacing.md }}>
          {PARENT_NEW_PER_DAY.map((n) => (
            <Pressable
              key={n}
              onPress={() => updateParentStudy(profile.id, { newPerDay: n })}
              style={[s.chip, study.newPerDay === n && s.chipOn]}
              accessibilityRole="radio"
              accessibilityState={{ selected: study.newPerDay === n }}
            >
              <Text style={[s.chipText, study.newPerDay === n && s.chipTextOn]}>{n}개</Text>
            </Pressable>
          ))}
        </Row>
      </Card>

      {/* ① 일상 생활 문장 */}
      <TrackCard
        track="daily"
        on={study.tracks.includes('daily')}
        count={per.daily}
        onToggle={() => toggle('daily')}
        hint="회의·메일·가벼운 대화에 그대로 쓰는 문장 80개. 주제를 골라 도세요."
      >
        <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
          {DAILY_THEME_LIST.map((t) => {
            const active = study.dailyTheme === t.id;
            return (
              <Pressable
                key={t.id}
                onPress={() => updateParentStudy(profile.id, { dailyTheme: t.id })}
                style={[s.theme, active && s.themeOn]}
                accessibilityRole="radio"
                accessibilityState={{ selected: active }}
              >
                <Text style={[s.themeName, active && s.chipTextOn]}>{t.label}</Text>
                <Text style={[s.themeHint, active && s.chipTextOn]}>
                  {t.hint} · {t.entries.length}문장
                </Text>
              </Pressable>
            );
          })}
        </Row>
      </TrackCard>

      {/* ② 아이들과 같은 영어 단어 */}
      <TrackCard
        track="enWord"
        on={study.tracks.includes('enWord')}
        count={per.enWord}
        onToggle={() => toggle('enWord')}
        hint="아이가 지금 보고 있는 그 단어들입니다. 같은 것을 알면 저녁에 물어볼 말이 생겨요."
      >
        <View style={{ marginTop: spacing.md }}>
          <LevelPicker
            value={profile.level}
            onChange={(l: LevelId) => updateProfile(profile.id, { level: l })}
            tone="parent"
          />
        </View>
      </TrackCard>

      {/* ③ 국어 어휘 */}
      <TrackCard
        track="ko"
        on={study.tracks.includes('ko')}
        count={per.ko}
        onToggle={() => toggle('ko')}
        hint="사자성어 · 개념어 · 고전 · 수능 어휘. 아이와 같은 자료를 같은 방식으로 봅니다."
      >
        <View style={{ marginTop: spacing.md }}>
          <LevelPicker
            value={profile.koLevel}
            onChange={(l: LevelId) => updateProfile(profile.id, { koLevel: l })}
            tone="parent"
            showCounts={false}
          />
          <Muted style={{ marginTop: spacing.sm }}>
            지금 고른 것은 {LEVEL_SHORT[profile.koLevel]} · 낱말 {koCount}개입니다.
          </Muted>
        </View>
      </TrackCard>

      {study.tracks.length === 0 ? (
        <Body style={{ marginTop: spacing.lg, color: colors.wrong, textAlign: 'center' }}>
          하나도 안 고르면 낼 문제가 없어요.
        </Body>
      ) : null}
    </View>
  );
}

/**
 * 갈래 하나를 켜고 끄는 카드.
 *
 * 꺼져 있으면 안쪽(레벨·주제)을 감춘다. 안 켠 것의 레벨을 고르게 두면
 * 무엇이 켜져 있는지가 화면에서 흐려진다.
 */
function TrackCard({
  track,
  on,
  count,
  hint,
  onToggle,
  children,
}: {
  track: ParentTrack;
  on: boolean;
  /** 이 갈래가 오늘 가져가는 개수 */
  count: number;
  hint: string;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <Card style={[{ marginTop: spacing.md }, on ? s.cardOn : undefined]}>
      <Pressable onPress={onToggle} accessibilityRole="checkbox" accessibilityState={{ checked: on }}>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1, paddingRight: spacing.md }}>
            <Text style={s.trackTitle}>{PARENT_TRACK_LABEL[track]}</Text>
            <Text style={s.trackHint}>{hint}</Text>
          </View>
          <View style={[s.check, on && s.checkOn]}>
            <Text style={[s.checkMark, on && s.chipTextOn]}>{on ? '✓' : ''}</Text>
          </View>
        </Row>
      </Pressable>

      {on ? (
        <>
          <Muted style={{ marginTop: spacing.md }}>오늘 이 갈래에서 새로 {count}개를 만납니다.</Muted>
          {children}
        </>
      ) : null}
    </Card>
  );
}

const s = StyleSheet.create({
  cardOn: { borderColor: colors.parent, borderWidth: 2 },
  trackTitle: { fontSize: font.h3, fontWeight: '800', color: colors.text },
  trackHint: { fontSize: font.small, color: colors.subtext, marginTop: 3, lineHeight: 19 },
  check: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  checkMark: { fontSize: 16, fontWeight: '800', color: colors.muted },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
  theme: {
    flexGrow: 1,
    minWidth: '46%',
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  themeOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  themeName: { fontSize: font.body, fontWeight: '800', color: colors.text },
  themeHint: { fontSize: font.tiny, color: colors.subtext, marginTop: 2, lineHeight: 16 },
});
