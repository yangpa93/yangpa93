import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { childPlannedCount, DAILY_PER_DAY, KO_PER_DAY } from '../src/srs/childSession';
import { SUBJECT_LABEL, SUBJECT_LONG, SUBJECT_ORDER, Subject, toggleSubject } from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/** 하루에 새로 만날 영어 단어 수. 아이가 고른다. */
const NEW_PER_DAY = [5, 8, 10, 12, 15, 20];

/**
 * 📚 내 공부 설정 — 무엇을 하루 몇 개씩 볼지.
 *
 * ── 왜 이 화면이 생겼나 ──────────────────────────────────────
 *
 * **아이는 자기 폰에서 국어를 켤 방법이 없었다.**
 *
 * 과목을 고르는 자리는 부모 폰(아이 보고서 · SubjectPicker)에만 있었고, 아이
 * 설정 화면은 그 값을 **읽기만** 했다. 그러니 국어를 해 보고 싶은 아이는
 * 부모를 불러 부모 폰을 켜게 해야 했다. 그 정도 문턱이면 대부분 그냥 안 한다.
 *
 * 하루 분량을 아이가 고르게 둔 것과 같은 생각이다 — 스스로 정한 것이라야
 * "계획보다 빨리 끝냈다" 는 말이 자기 말이 된다. 무엇을 공부할지도 마찬가지다.
 * 복습 개수와 학년·레벨은 진도와 돈이 걸려 있어 부모님 쪽에 그대로 둔다.
 *
 * 일상 생활 문장도 아이가 켤 수 있다. 부모에게만 있던 갈래인데, 문장 80개는
 * 어른 것이라기보다 그냥 자주 쓰는 말이고 아이가 배워서 나쁠 것이 없다.
 */
export default function ChildSettingsStudy() {
  const { profile, data, updateSettings } = useApp();
  const [note, setNote] = useState('');

  const planned = useMemo(
    () => (profile ? childPlannedCount({ profile, cards: data.cards }) : 0),
    [profile, data.cards],
  );

  if (!profile) return null;

  const { subjects, firstSubject, newPerDay, reviewPerDay, rounds } = profile.settings;
  // 두 과목을 다 켠 아이에게만 순서를 묻는다. 하나뿐이면 고를 것이 없다.
  const bothSubjects = subjects.includes('en') && subjects.includes('ko');

  // 오늘 몇 문제를 풀게 되는지. 개수만 보면 감이 안 와서 시간까지 적는다.
  const questions = planned * rounds;
  const minutes = Math.max(1, Math.round((questions * 10) / 60));

  function toggle(one: Subject) {
    const next = toggleSubject(subjects, one);
    if (!next) {
      // 마지막 하나는 못 끈다. 조용히 아무 일도 안 하면 고장인 줄 안다.
      setNote(`${SUBJECT_LABEL[one]}까지 끄면 오늘 풀 게 하나도 없어요. 하나는 켜 두어야 해요.`);
      return;
    }
    setNote('');
    updateSettings(profile!.id, { subjects: next });
  }

  return (
    <Screen>
      <Card style={{ marginTop: spacing.md }}>
        <H3>무엇을 공부할까요</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          눌러서 켜고 끕니다. 켠 것을 차례대로 다 풀면 오늘 공부가 끝나요.
        </Muted>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {SUBJECT_ORDER.map((sub) => {
            const on = subjects.includes(sub);
            return (
              <Pressable
                key={sub}
                onPress={() => toggle(sub)}
                style={[s.pick, on && s.pickOn]}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: on }}
              >
                <Text style={s.pickMark}>{on ? '✅' : '⬜'}</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[s.pickTitle, on && s.pickTitleOn]}>{SUBJECT_LONG[sub]}</Text>
                  <Text style={s.pickHint}>{HINT[sub]}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        {note ? (
          <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{note}</Body>
        ) : null}
      </Card>

      {/*
        무엇을 먼저 풀지 아이가 고른다.

        머리가 맑을 때 어려운 쪽을 먼저 하고 싶은 아이가 있고, 쉬운 쪽으로
        몸을 풀고 싶은 아이가 있다. 어느 쪽이 어려운지는 아이마다 달라서
        어른이 정해 줄 일이 아니다.

        일상 문장은 여기 없다. 영어 낱말 옆에 붙어 다니므로 따로 자리를 정할
        것이 없고, 고를 것을 하나 더 늘리면 거기서 멈추는 아이가 생긴다.
      */}
      {bothSubjects ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>무엇부터 풀까요</H3>
          <Muted style={{ marginTop: spacing.xs }}>고른 쪽을 먼저 다 풀고 나머지로 넘어가요.</Muted>
          <Row style={{ gap: spacing.sm, marginTop: spacing.md }}>
            {(['en', 'ko'] as const).map((sub) => (
              <Pressable
                key={sub}
                onPress={() => updateSettings(profile.id, { firstSubject: sub })}
                style={[s.chip, firstSubject === sub && s.chipOn]}
                accessibilityRole="radio"
                accessibilityState={{ selected: firstSubject === sub }}
              >
                <Text style={[s.chipText, firstSubject === sub && s.chipTextOn]}>
                  {SUBJECT_LABEL[sub]} 먼저
                </Text>
              </Pressable>
            ))}
          </Row>
        </Card>
      ) : null}

      {/*
        하루 분량을 아이가 고른다. 스스로 정한 속도라야 "계획보다 빨리 끝냈다"는
        말이 자기 말이 된다. 부모가 정해 준 숫자를 앞당긴 것과는 기분이 다르다.

        **이 숫자는 영어 낱말에만 걸린다.** 국어와 일상 문장은 자료가 적어
        하루 개수를 앱이 정해 둔다 — 영어와 같은 속도로 내면 금세 동난다.
        그 사실을 적어 두지 않으면 "10개로 해 뒀는데 왜 더 나오지" 가 된다.
      */}
      {subjects.includes('en') ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>하루에 새로 배울 영어 단어</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            5개부터 20개까지 고를 수 있어요. 많이 고르면 빨리 끝나지만 하루가 길어져요.
          </Muted>
          <Row style={{ gap: spacing.sm, marginTop: spacing.md, flexWrap: 'wrap' }}>
            {NEW_PER_DAY.map((n) => (
              <Pressable
                key={n}
                onPress={() => updateSettings(profile.id, { newPerDay: n })}
                style={[s.chip, newPerDay === n && s.chipOn]}
                accessibilityRole="button"
                accessibilityState={{ selected: newPerDay === n }}
              >
                <Text style={[s.chipText, newPerDay === n && s.chipTextOn]}>{n}개</Text>
              </Pressable>
            ))}
          </Row>
        </Card>
      ) : null}

      <Card style={{ marginTop: spacing.md, backgroundColor: colors.bg }}>
        <H3>오늘은 이만큼이에요</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          켠 것을 다 합쳐 낱말 {planned}개를 {rounds}번씩 —{' '}
          <Text style={{ fontWeight: '800', color: colors.text }}>
            오늘 {questions}문제, 약 {minutes}분
          </Text>
        </Muted>
        <Muted style={{ marginTop: spacing.sm, fontSize: font.tiny }}>
          영어는 새 단어 {newPerDay}개 + 복습 {reviewPerDay}개까지, 국어는 하루 {KO_PER_DAY}개,
          일상 문장은 하루 {DAILY_PER_DAY}개예요. 복습할 것이 적은 날은 더 적게 나와요.
        </Muted>
      </Card>

      <Muted style={{ marginTop: spacing.lg, textAlign: 'center' }}>
        복습 개수와 학년·레벨은 부모님이 정해요.
      </Muted>

      <Button
        title="돌아가기"
        variant="secondary"
        onPress={() => router.back()}
        style={{ marginTop: spacing.md }}
      />
    </Screen>
  );
}

/** 갈래마다 무엇인지 한 줄로. 이름만으로는 국어와 일상 문장이 안 갈린다. */
const HINT: Record<Subject, string> = {
  en: '교과서에 나오는 영어 낱말과 숙어예요',
  ko: '국어 시간에 만나는 어휘와 한자예요',
  daily: '어른들이 자주 쓰는 영어 문장이에요',
};

const s = StyleSheet.create({
  pick: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickOn: { borderColor: colors.primary, borderWidth: 2 },
  pickMark: { fontSize: 20 },
  pickTitle: { fontSize: font.body, fontWeight: '700', color: colors.subtext },
  pickTitleOn: { color: colors.text, fontWeight: '800' },
  pickHint: { fontSize: font.tiny, color: colors.subtext, marginTop: 2 },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
