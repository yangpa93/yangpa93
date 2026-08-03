import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Body, Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { childPlannedCount, DAILY_PER_DAY, KO_PER_DAY } from '../src/srs/childSession';
import {
  moveSubject,
  orderedSubjects,
  SUBJECT_LABEL,
  SUBJECT_LONG,
  SUBJECT_ORDER,
  Subject,
  toggleSubject,
} from '../src/types';
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

  const { subjects, newPerDay, reviewPerDay, rounds } = profile.settings;
  /** 켠 갈래를 푸는 차례. 하나뿐이면 줄 세울 것이 없다. */
  const order = orderedSubjects(profile.settings);

  /**
   * 차례를 한 칸 옮긴다.
   *
   * **켠 것만 옮기고 나머지는 그대로 둔다.** 안 켠 갈래도 저장된 줄에는
   * 남아 있는데(껐다 다시 켰을 때 제자리로 돌아가야 한다), 화면에는 켠 것만
   * 보이므로 화면에서 옮긴 결과를 저장된 줄에 그대로 얹으면 안 켠 것의
   * 자리가 엉킨다. 켠 것들의 자리만 새 차례로 갈아 끼운다.
   */
  function move(one: Subject, dir: -1 | 1) {
    const moved = moveSubject(order, one, dir);
    if (moved === order) return;
    const full = profile!.settings.subjectOrder?.length
      ? [...profile!.settings.subjectOrder]
      : [...SUBJECT_ORDER];
    // 켠 갈래가 놓여 있던 자리들을 새 차례로 채운다.
    const slots = full.map((s, i) => (order.includes(s) ? i : -1)).filter((i) => i >= 0);
    slots.forEach((slot, k) => {
      full[slot] = moved[k];
    });
    updateSettings(profile!.id, { subjectOrder: full });
  }

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
        무엇부터 풀지 아이가 **줄을 세운다.**

        예전에는 '영어 먼저 / 국어 먼저' 둘 중 하나를 고르는 것이었다. 갈래가
        둘일 때는 그것으로 충분했지만, 일상 생활 문장이 들어와 셋이 되면서
        무너졌다 — 셋 중 하나를 골라도 **나머지 둘의 차례**가 안 정해진다.

        위아래 화살표로 한 칸씩 옮긴다. 끌어다 놓기는 아이 손에 어렵고,
        '몇 번째' 를 숫자로 고르게 하면 둘이 같은 번호를 갖는 경우를 또
        다뤄야 한다. 한 칸씩이면 잘못 눌러도 한 칸이라 되돌리기 쉽다.

        하나만 켰으면 안 보인다. 줄 세울 것이 없다.
      */}
      {order.length > 1 ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>무엇부터 풀까요</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            위에 있는 것부터 다 풀고 다음으로 넘어가요. 화살표로 차례를 바꿉니다.
          </Muted>

          <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
            {order.map((sub, i) => (
              <View key={sub} style={s.rank}>
                <Text style={s.rankNo}>{i + 1}</Text>
                {/*
                  testID 는 노트북 확인(e2e)에서 이 줄들만 골라 읽으려는 것이다.
                  글자로 찾으면 위 '무엇을 공부할까요' 카드의 같은 이름이 먼저
                  잡혀서, 차례가 바뀌었는지를 볼 수가 없다.
                */}
                <Text style={s.rankName} testID="rank-name">
                  {SUBJECT_LONG[sub]}
                </Text>
                <Pressable
                  onPress={() => move(sub, -1)}
                  disabled={i === 0}
                  accessibilityRole="button"
                  accessibilityLabel={`${SUBJECT_LABEL[sub]} 위로`}
                  hitSlop={8}
                  style={[s.arrow, i === 0 && s.arrowOff]}
                >
                  <Text style={s.arrowText}>▲</Text>
                </Pressable>
                <Pressable
                  onPress={() => move(sub, 1)}
                  disabled={i === order.length - 1}
                  accessibilityRole="button"
                  accessibilityLabel={`${SUBJECT_LABEL[sub]} 아래로`}
                  hitSlop={8}
                  style={[s.arrow, i === order.length - 1 && s.arrowOff]}
                >
                  <Text style={s.arrowText}>▼</Text>
                </Pressable>
              </View>
            ))}
          </View>
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
  rank: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  /* 몇 번째인지. 회원님이 말씀하신 "1. 영어 2. 국어 3. 일상생활 문장" 이다. */
  rankNo: {
    width: 22,
    textAlign: 'center',
    fontSize: font.body,
    fontWeight: '800',
    color: colors.primary,
  },
  rankName: { flex: 1, fontSize: font.small, fontWeight: '700', color: colors.text },
  arrow: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  arrowOff: { opacity: 0.25 },
  arrowText: { fontSize: 12, color: colors.primary, fontWeight: '800' },
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
