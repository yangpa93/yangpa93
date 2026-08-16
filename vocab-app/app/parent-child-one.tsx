import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Body, Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import { LevelPicker } from '../src/components/LevelPicker';
import { AwardRatesEditor } from '../src/components/AwardRatesEditor';
import { NudgeCard } from '../src/components/NudgeCard';
import { awardRates } from '../src/features/awards';
import { sendSettingsToChild } from '../src/features/push';
import { primaryParent } from '../src/features/parentLinks';
import {
  AwardRates,
  LevelId,
  SUBJECT_LABEL,
  SUBJECT_LONG,
  SUBJECT_ORDER,
  Subject,
  toggleSubject,
} from '../src/types';
import { colors, font, radius, spacing } from '../src/theme';

/**
 * 하루에 새로 배울 개수. 아이 폰의 「내 공부 설정」 과 같은 눈금을 쓴다.
 *
 * 부모 화면과 아이 화면에서 고를 수 있는 숫자가 다르면, 부모가 12 로 보낸
 * 뒤 아이가 제 폰을 열었을 때 12 가 어디에도 안 켜져 있다.
 */
const NEW_PER_DAY = [5, 8, 10, 12, 15, 20];
/** 국어는 한 낱말이 뜻마다 문항으로 갈려서 폭을 좁게 둔다. */
const KO_NEW_PER_DAY = [3, 5, 6, 8, 10];

/** 갈래마다 한 줄 설명. 아이 폰 설정 화면과 같은 말로 적는다. */
const HINT: Record<Subject, string> = {
  en: '교과서 낱말을 뜻·소리·빈칸으로',
  ko: '국어 어휘와 사자성어',
  daily: '자주 쓰는 생활 영어 문장',
};

/**
 * 아이 하나의 설정. **다른 폰을 쓰는 아이용이다.**
 *
 * ── 여기서 정하는 것 ────────────────────────────────────────
 *
 *   영어 레벨 · 국어 레벨 · 이 아이만의 요청권 금액
 *
 * 셋 다 **아이 폰 안에 있던 값**이다. 부모 폰에는 그 아이 프로필이 없어서
 * 고칠 길이 아예 없었다 — 부모가 "중3-1 로 올려 줘야겠다" 고 생각해도 아이
 * 폰을 걷어 와야 했다. 이제 알림으로 보낸다.
 *
 * ── 보내야 바뀐다 ───────────────────────────────────────────
 *
 * 고르는 즉시 아이 폰이 바뀌지는 않는다. **「보내기」 를 눌러야** 간다.
 * 고를 때마다 알림이 날아가면 레벨을 고르다 지나친 값까지 아이 폰에 꽂힌다.
 *
 * ── 보고서는 여기 없다 ──────────────────────────────────────
 *
 * 학습 보고서로 가는 길을 여기 두지 않는다. 보는 자리는 부모 홈의 「아이들
 * 학습 보고서」 하나뿐이다. 두 길로 같은 화면에 닿게 해 놓으면 어디로 가야
 * 하는지 매번 헷갈리고, 실제로 그렇게 흩어져 있어 복잡하다는 말을 들었다.
 */
export default function ParentChildOne() {
  const { state, rememberChildSettings } = useApp();
  const params = useLocalSearchParams<{ name?: string }>();
  const name = typeof params.name === 'string' ? params.name : '';

  const known = (state.knownChildren ?? []).find((c) => c.name === name);

  /** 화면에서 고른 값. 「보내기」 를 눌러야 아이 폰으로 간다. */
  const [level, setLevel] = useState<LevelId | null>(known?.sentLevel ?? null);
  const [koLevel, setKoLevel] = useState<LevelId | null>(known?.sentKoLevel ?? null);
  const [rates, setRates] = useState<AwardRates | null>(known?.rates ?? null);
  /*
   * 갈래와 하루 분량.
   *
   * **안 고쳤으면 null 이다.** 레벨·금액과 같은 규칙인데, 갈래는 하나 더
   * 조심할 것이 있다 — 보내는 규격이 갈래를 반드시 담게 되어 있어서(옛 판
   * 아이 폰도 읽어야 한다) null 일 때 무엇을 실어 보낼지 정해야 한다.
   * 그때는 지금 화면에 보이는 것, 즉 마지막으로 보낸 것이나 셋 다 켠 것을
   * 그대로 다시 보낸다. 줄이는 쪽으로 짐작하면 아이가 하던 갈래가 조용히
   * 꺼진다.
   */
  const [subjects, setSubjects] = useState<Subject[] | null>(known?.sentSubjects ?? null);
  const [newPerDay, setNewPerDay] = useState<number | null>(known?.sentNewPerDay ?? null);
  const [koNewPerDay, setKoNewPerDay] = useState<number | null>(known?.sentKoNewPerDay ?? null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState('');

  if (!known) {
    return (
      <Screen>
        <Muted style={{ paddingTop: spacing.lg }}>
          그 아이를 찾을 수 없습니다. 연결이 끊겼을 수 있어요.
        </Muted>
        <Button
          title="돌아가기"
          variant="ghost"
          onPress={() => router.back()}
          style={{ marginTop: spacing.md }}
        />
      </Screen>
    );
  }

  /** 아무것도 안 고쳤으면 보낼 것이 없다. */
  const changed =
    level !== null ||
    koLevel !== null ||
    rates !== null ||
    subjects !== null ||
    newPerDay !== null ||
    koNewPerDay !== null;

  /** 화면에 켜져 보이는 갈래. 안 고쳤으면 마지막으로 보낸 것, 그것도 없으면 셋 다. */
  const shownSubjects: Subject[] = subjects ?? known.sentSubjects ?? ['en', 'ko', 'daily'];

  function toggle(one: Subject) {
    const next = toggleSubject(shownSubjects, one);
    if (!next) {
      // 마지막 하나는 못 끈다. 조용히 아무 일도 안 하면 고장인 줄 안다.
      setNote(`${SUBJECT_LABEL[one]}까지 끄면 풀 것이 하나도 없어요. 하나는 켜 두어야 해요.`);
      return;
    }
    setNote('');
    setSubjects(next);
  }

  async function send() {
    if (!known) return;
    setBusy(true);
    setResult('');
    const res = await sendSettingsToChild(known.token, {
      from: primaryParent(state.parentLinks)?.label ?? '부모님',
      subjects: shownSubjects,
      ...(level ? { level } : {}),
      ...(koLevel ? { koLevel } : {}),
      ...(rates ? { rates: rates as unknown as Record<string, number> } : {}),
      ...(newPerDay ? { newPerDay } : {}),
      ...(koNewPerDay ? { koNewPerDay } : {}),
    });
    setBusy(false);
    if (res.ok) {
      // 보낸 것을 적어 둔다. 다시 들어왔을 때 화면이 빈 채로 돌아가면 안 된다.
      rememberChildSettings(name, {
        ...(level ? { sentLevel: level } : {}),
        ...(koLevel ? { sentKoLevel: koLevel } : {}),
        ...(rates ? { rates } : {}),
        sentSubjects: shownSubjects,
        ...(newPerDay ? { sentNewPerDay: newPerDay } : {}),
        ...(koNewPerDay ? { sentKoNewPerDay: koNewPerDay } : {}),
      });
      setResult('보냈어요. 아이 폰이 켜지면 바로 바뀝니다.');
    } else {
      setResult(`보내지 못했어요. ${res.error ?? ''}`.trim());
    }
  }

  return (
    <Screen>
      <Row style={{ gap: spacing.sm, paddingTop: spacing.md, alignItems: 'center' }}>
        <Text style={{ fontSize: 22 }}>📲</Text>
        <H3>{name}</H3>
      </Row>
      <Muted style={{ marginTop: spacing.xs }}>
        이 아이는 제 폰을 씁니다. 여기서 고른 것은 「보내기」 를 눌러야 그 폰으로 갑니다.
      </Muted>

      {/*
        **무엇을 공부할지가 레벨보다 먼저다.**
        국어를 안 켠 아이에게 국어 레벨부터 물으면 순서가 뒤집힌다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>무엇을 공부할까요</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          눌러서 켜고 끕니다. 아이도 제 폰에서 바꿀 수 있어요.
        </Muted>

        <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
          {SUBJECT_ORDER.map((sub) => {
            const on = shownSubjects.includes(sub);
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

        {note ? <Body style={{ color: colors.wrong, marginTop: spacing.md }}>{note}</Body> : null}
      </Card>

      {/*
        하루 분량. **켠 갈래의 것만 보인다.**

        국어를 껐는데 「하루에 새로 배울 국어 어휘」 를 물으면 안 쓸 값을
        고르게 하는 셈이다. 일상 문장은 자료가 적어 앱이 개수를 정해 둔다.
      */}
      {shownSubjects.includes('en') || shownSubjects.includes('ko') ? (
        <Card style={{ marginTop: spacing.md }}>
          <H3>하루에 새로 배울 개수</H3>

          {shownSubjects.includes('en') ? (
            <>
              <Text style={s.small}>영어 단어</Text>
              <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
                {NEW_PER_DAY.map((n) => {
                  const on = (newPerDay ?? known.sentNewPerDay ?? 10) === n;
                  return (
                    <Pressable
                      key={n}
                      onPress={() => setNewPerDay(n)}
                      style={[s.chip, on && s.chipOn]}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: on }}
                    >
                      <Text style={[s.chipText, on && s.chipTextOn]}>{n}개</Text>
                    </Pressable>
                  );
                })}
              </Row>
            </>
          ) : null}

          {shownSubjects.includes('ko') ? (
            <>
              <Text style={[s.small, { marginTop: spacing.md }]}>국어 어휘</Text>
              <Row style={{ gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' }}>
                {KO_NEW_PER_DAY.map((n) => {
                  const on = (koNewPerDay ?? known.sentKoNewPerDay ?? 5) === n;
                  return (
                    <Pressable
                      key={n}
                      onPress={() => setKoNewPerDay(n)}
                      style={[s.chip, on && s.chipOn]}
                      accessibilityRole="radio"
                      accessibilityState={{ selected: on }}
                    >
                      <Text style={[s.chipText, on && s.chipTextOn]}>{n}개</Text>
                    </Pressable>
                  );
                })}
              </Row>
              <Muted style={{ marginTop: spacing.sm }}>
                국어는 한 낱말에 뜻이 여럿이라 문제가 더 나옵니다. 적게 잡아도 괜찮아요.
              </Muted>
            </>
          ) : null}
        </Card>
      ) : null}

      {shownSubjects.includes('en') ? (
      <Card style={{ marginTop: spacing.md }}>
        <H3>영어 레벨</H3>
        {known.sentLevel && !level ? (
          <Muted style={{ marginTop: spacing.xs }}>
            마지막으로 보낸 것 — {known.sentLevel}
          </Muted>
        ) : null}
        <LevelPicker value={level ?? known.sentLevel ?? 'm1-1'} onChange={setLevel} />
      </Card>
      ) : null}

      {shownSubjects.includes('ko') ? (
      <Card style={{ marginTop: spacing.md }}>
        <H3>국어 레벨</H3>
        {known.sentKoLevel && !koLevel ? (
          <Muted style={{ marginTop: spacing.xs }}>
            마지막으로 보낸 것 — {known.sentKoLevel}
          </Muted>
        ) : null}
        <LevelPicker value={koLevel ?? known.sentKoLevel ?? 'm1-1'} onChange={setKoLevel} />
      </Card>
      ) : null}

      <Card style={{ marginTop: spacing.md }}>
        <H3>{name}의 동기 부여 요청권 금액</H3>
        {/*
          **여기서 고치면 이것이 앞선다.** 공통(기기 기본값)은 아무것도 안 정한
          아이에게 쓰는 값이고, 이 아이에게는 여기 값이 간다.
        */}
        <Muted style={{ marginTop: spacing.xs }}>
          {known.rates
            ? '이 아이만의 금액을 쓰고 있습니다.'
            : '지금은 공통 금액을 그대로 씁니다. 하나라도 바꾸면 이 아이만의 금액이 됩니다.'}
        </Muted>
        <AwardRatesEditor
          rates={rates ?? known.rates ?? awardRates(state.parent.awards)}
          onChange={setRates}
        />
      </Card>

      <Button
        title={busy ? '보내는 중…' : `📤 ${name} 폰으로 보내기`}
        variant="parent"
        disabled={!changed || busy}
        loading={busy}
        onPress={send}
        style={{ marginTop: spacing.lg }}
      />
      {!changed ? (
        <Muted style={{ marginTop: spacing.xs, textAlign: 'center' }}>
          바꾼 것이 있으면 단추가 켜집니다.
        </Muted>
      ) : null}
      {result ? (
        <Body style={{ marginTop: spacing.md, textAlign: 'center' }}>{result}</Body>
      ) : null}

      {/*
        「공부하세요」 는 **이 아이 것이 바로 펼쳐진다.** 이미 그 아이로 들어와
        있는데 이름을 한 번 더 눌러 펼치게 하면 같은 일을 두 번 시키는 것이다.
      */}
      <View style={{ marginTop: spacing.lg }}>
        <NudgeCard only={name} openAlways />
      </View>
    </Screen>
  );
}

const s = StyleSheet.create({
  pick: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  pickOn: { borderColor: colors.parent, borderWidth: 2, backgroundColor: colors.card },
  pickMark: { fontSize: 18 },
  pickTitle: { fontSize: font.body, fontWeight: '700', color: colors.subtext },
  pickTitleOn: { color: colors.text },
  pickHint: { fontSize: font.tiny, color: colors.subtext, marginTop: 2 },
  small: { fontSize: font.small, fontWeight: '700', color: colors.text, marginTop: spacing.md },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  chipOn: { backgroundColor: colors.parent, borderColor: colors.parent },
  chipText: { fontSize: font.small, fontWeight: '700', color: colors.subtext },
  chipTextOn: { color: '#fff' },
});
