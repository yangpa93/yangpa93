/**
 * 부모님이 무엇을 어떻게 공부할지 정하는 부분.
 *
 * **왜 화면이 아니라 부품인가.** 지금은 `/parent-plan`(⚙️ 설정 → 내 공부 설정)
 * 안에만 쓰이지만, 이 자리는 한 번 옮겨 다녔다 — 별도 화면이었다가, 학습 기록
 * 화면 안으로 들어갔다가, 다시 설정 아래로 왔다. 어느 화면에 붙일지는 계속
 * 바뀔 수 있고 고르는 내용 자체는 그대로라, 화면에서 떼어 두면 옮길 때마다
 * 통째로 베끼지 않아도 된다.
 *
 * 세 갈래를 켜고 끄고, 켠 것마다 **어디를 볼지와 하루 몇 개를 볼지**를 고른다.
 * 개수는 5개 아니면 10개다 — 어른의 저녁에 낼 수 있는 시간이 그 언저리이고,
 * 고를 것이 많으면 고르다가 안 한다.
 *
 * **개수는 갈래마다 따로다.** 예전에는 카드 밖에 '하루에 몇 개'가 하나 있었고
 * 그 숫자를 켠 갈래끼리 나눠 가졌다(셋이면 4/3/3). 그런데 홈에 '하루에 10개'
 * 라고만 적히니 그것이 일상 문장 10개인지 셋을 합쳐 10개인지 알 수가 없었다.
 * 숫자 하나가 자기 뜻을 스스로 말하지 못하면 그 숫자는 없는 편이 낫다.
 * 지금은 갈래 카드 안에서 고르고, 고른 숫자가 곧 그 갈래의 개수다.
 */

import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Body, Card, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import { LevelPicker } from './LevelPicker';
import { DAILY_THEME_LIST } from '../data/daily';
import { KO_ENTRIES } from '../data/korean/levels';
import { perTrackCount } from '../srs/parentSession';
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
  const per = perTrackCount(study);

  function toggle(track: ParentTrack) {
    if (!profile) return;
    const on = study.tracks.includes(track);
    updateParentStudy(profile.id, {
      tracks: on ? study.tracks.filter((t) => t !== track) : [...study.tracks, track],
    });
  }

  /**
   * 그 갈래의 하루 개수를 바꾼다.
   *
   * 안 켠 갈래의 값도 그대로 남겨 둔다. 껐다 다시 켰을 때 예전에 고른 값이
   * 살아 있어야 "다시 처음부터 고르라"는 느낌이 안 든다.
   */
  function setCount(track: ParentTrack, n: number) {
    if (!profile) return;
    updateParentStudy(profile.id, { perTrack: { ...study.perTrack, [track]: n } });
  }

  const koCount = KO_ENTRIES.filter((e) => e.level === profile.koLevel).length;

  return (
    <View>
      <Muted style={{ marginTop: spacing.sm }}>
        공부할 것을 고르세요. 갈래마다 하루 몇 개를 볼지 따로 정합니다. 문제 내는 방식과
        복습 간격은 아이들과 똑같아요.
      </Muted>

      {/*
        예전에는 여기 '하루에 몇 개' 카드가 하나 있었고, 그 숫자를 켠 갈래끼리
        나눠 가졌다(셋이면 4/3/3). 그런데 홈에 '하루에 10개'라고만 적히니
        그것이 일상 문장 10개인지 셋을 합쳐 10개인지 알 수가 없었다.
        지금은 갈래마다 카드 안에서 고른다 — 고른 숫자가 그 갈래의 개수다.
      */}

      {/* ① 일상 생활 문장 */}
      <TrackCard
        track="daily"
        on={study.tracks.includes('daily')}
        count={per.daily}
        onToggle={() => toggle('daily')}
        onCount={(n) => setCount('daily', n)}
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
        onCount={(n) => setCount('enWord', n)}
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
        onCount={(n) => setCount('ko', n)}
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
  onCount,
  children,
}: {
  track: ParentTrack;
  on: boolean;
  /** 이 갈래가 오늘 가져가는 개수 */
  count: number;
  hint: string;
  onToggle: () => void;
  onCount: (n: number) => void;
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
          {/*
            개수를 이 카드 안에 둔다. 갈래 밖에 하나만 두면 그 숫자가 어느
            갈래의 것인지 알 수 없다 — 그것 때문에 이 구조로 바꿨다.
          */}
          <Text style={[s.countLabel, { marginTop: spacing.lg }]}>하루에 몇 개</Text>
          <Muted style={{ marginTop: 2 }}>
            새로 만날 개수입니다. 복습은 여기에 얹히니 실제로 푸는 것은 이보다 많아요.
          </Muted>
          <Row style={{ gap: spacing.sm, marginTop: spacing.sm }}>
            {PARENT_NEW_PER_DAY.map((n) => (
              <Pressable
                key={n}
                onPress={() => onCount(n)}
                style={[s.chip, count === n && s.chipOn]}
                accessibilityRole="radio"
                accessibilityState={{ selected: count === n }}
              >
                <Text style={[s.chipText, count === n && s.chipTextOn]}>{n}개</Text>
              </Pressable>
            ))}
          </Row>
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
  countLabel: { fontSize: font.body, fontWeight: '700', color: colors.text },
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
