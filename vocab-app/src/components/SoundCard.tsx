import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { Card, H3, Muted, Row } from './ui';
import { useApp } from '../store/AppProvider';
import {
  englishVoiceChoices,
  englishVoiceId,
  englishVoiceName,
  englishVoiceStatus,
  prepareVoice,
  setEnglishVoice,
  setSpeechRate,
  speak,
  tryVoice,
} from '../lib/feedback';
import { SPEECH_RATES, voiceLabel } from '../lib/voice';
import { colors, font, radius, spacing } from '../theme';

/**
 * 소리 설정 — 켜고 끄기 · 목소리 고르기 · 읽는 속도.
 *
 * ── 왜 따로 떼어 냈나 ────────────────────────────────────────
 *
 * 이 묶음은 아이 설정 화면 안에만 있었다. 그런데 **부모도 영어를 공부한다** —
 * 일상 문장과 영어 단어를 부모 폰에서 읽어 주는데, 부모 설정 어디에도
 * 목소리를 들어 보고 고르는 자리가 없었다. 아이 설정 화면으로는 들어갈 수도
 * 없다(그건 아이 프로필의 설정이다). 부모는 앱이 자동으로 고른 목소리를
 * 그대로 쓸 수밖에 없었던 셈이다.
 *
 * 목소리와 속도는 **프로필마다 따로** 저장된다(settings.voiceId ·
 * settings.speechRate). 그러니 화면만 두 곳에 두면 각자 제 것이 된다.
 * 같은 것을 두 번 적어 두면 한쪽만 고치는 일이 반드시 생기므로 부품으로 뺀다.
 *
 * ── 왜 '들어보기' 가 반드시 있어야 하나 ──────────────────────
 *
 * 목소리는 이름만 봐서는 모른다. 골라 놓고 공부를 시작해 봐야 아는 것이라면
 * 아무도 안 바꾼다. 그래서 줄마다 🔊 을 두고, 고르는 순간에도 한 번 읽어 준다.
 */
export function SoundCard({ title, note }: { title?: string; note?: string }) {
  const { profile, updateSettings } = useApp();

  /*
   * 목소리는 앱이 뜰 때 정해지지만, 이 화면에 바로 들어왔을 때 아직 안
   * 끝났을 수 있다. 한 번 더 부르고(이미 정해졌으면 그냥 돌아온다) 결과를
   * 화면에 반영한다.
   */
  const [voice, setVoice] = useState(englishVoiceStatus());
  /** 목록과 지금 고른 것. 바꾸면 화면이 따라와야 해서 state 로 들고 있는다. */
  const [choices, setChoices] = useState(englishVoiceChoices());
  const [pickedId, setPickedId] = useState(englishVoiceId());
  const voiceName = englishVoiceName() ?? '';

  useEffect(() => {
    let cancelled = false;
    void prepareVoice().then(() => {
      if (cancelled) return;
      setVoice(englishVoiceStatus());
      setChoices(englishVoiceChoices());
      setPickedId(englishVoiceId());
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!profile) return null;
  const { ttsEnabled } = profile.settings;

  return (
    <Card style={{ marginTop: spacing.md }}>
      <H3>{title ?? '🔊 소리와 목소리'}</H3>
      {note ? <Muted style={{ marginTop: spacing.xs }}>{note}</Muted> : null}

      <Row style={{ justifyContent: 'space-between', marginTop: spacing.md }}>
        <View style={{ flex: 1, paddingRight: spacing.md }}>
          <Text style={s.label}>🔊 소리로 읽어주기</Text>
          <Muted style={{ marginTop: 2 }}>
            {voice === 'ready'
              ? `영어 문장을 소리로 들려줘요. (${voiceName})`
              : '영어 문장을 소리로 들려줘요.'}
          </Muted>
        </View>
        <Switch
          value={ttsEnabled}
          onValueChange={(v) => {
            updateSettings(profile.id, { ttsEnabled: v });
            // 켠 순간 한 번 읽어 준다. 켜졌는지 확인하러 공부를
            // 시작해 볼 필요가 없다.
            if (v) speak('Hello! Nice to meet you.', true);
          }}
        />
      </Row>

      {/*
        영어 목소리가 없으면 왜 조용한지 알려 준다.

        이게 없으면 스위치를 켰는데 소리가 안 난다고만 여긴다. 더 나쁜 것은
        예전 판이었다 — 영어 목소리가 없으면 한국어 엔진이 영어 글자를 읽어서
        'beautiful' 이 '베아우티풀' 로 나왔다. 오류도 안 나고 소리는 나오니
        고장인 줄도 모르고 그 발음을 배웠다. 지금은 그런 소리를 내느니 조용히
        있고, 대신 여기서 길을 알려 준다.
      */}
      {ttsEnabled && voice === 'missing' ? (
        <View style={s.voiceWarn}>
          <Text style={s.voiceWarnTitle}>영어 목소리가 이 기기에 없어요</Text>
          <Muted style={{ marginTop: spacing.xs }}>
            그래서 영어는 소리로 안 읽어 줍니다. 한국어 목소리로 영어를 읽으면
            발음이 잘못 들려서, 차라리 조용히 두었어요.
            {'\n\n'}
            안드로이드 : 설정 → 일반 → 접근성 → 텍스트 음성 변환 →
            기본 엔진 설정 → 음성 데이터 설치 → <Text style={{ fontWeight: '700' }}>English</Text>
            {'\n'}
            아이폰 : 설정 → 손쉬운 사용 → 음성 콘텐츠 → 음성 →
            <Text style={{ fontWeight: '700' }}> English</Text>
            {'\n\n'}
            받은 뒤 앱을 껐다 켜면 바로 읽어 줍니다.
          </Muted>
        </View>
      ) : null}

      {/*
        목소리를 직접 고른다.

        **왜 필요한가.** 노트북에서는 발음이 자연스러웠는데 폰에서는 어색하다는
        말을 들었다. 기기마다 깔린 음성이 다르고, 앱이 자동으로 고른 것이 늘
        제일 나은 것은 아니다. 무엇보다 **들어 봐야 아는 일**이라, 하나씩
        들어 보고 고르게 둔다.
      */}
      {ttsEnabled && choices.length > 1 ? (
        <View style={{ marginTop: spacing.lg }}>
          <Text style={s.label}>어떤 목소리로 읽을까요</Text>
          <Muted style={{ marginTop: 2 }}>
            들어 보고 마음에 드는 것을 고르세요. 위에 있는 것이 보통 더 자연스러워요.
          </Muted>
          <View style={{ marginTop: spacing.sm, gap: spacing.sm }}>
            {choices.slice(0, 8).map((v) => {
              const on = v.identifier === pickedId;
              return (
                <Row key={v.identifier} style={{ gap: spacing.sm, alignItems: 'center' }}>
                  <Pressable
                    onPress={() => {
                      setEnglishVoice(v.identifier);
                      updateSettings(profile.id, { voiceId: v.identifier });
                      setPickedId(englishVoiceId());
                      tryVoice(v.identifier);
                    }}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: on }}
                    style={[s.voiceRow, on && s.voiceRowOn]}
                  >
                    <Text style={s.voiceName} numberOfLines={1}>
                      {v.name}
                    </Text>
                    <Text style={s.voiceHint}>{voiceLabel(v)}</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => tryVoice(v.identifier)}
                    accessibilityRole="button"
                    accessibilityLabel={`${v.name} 들어보기`}
                    style={s.tryBtn}
                  >
                    <Text style={s.tryBtnText}>🔊</Text>
                  </Pressable>
                </Row>
              );
            })}
          </View>
          <Muted style={{ marginTop: spacing.sm }}>
            ‘인터넷 필요’ 라고 적힌 목소리는 와이파이나 데이터가 있어야 소리가 납니다.
            보통 그 목소리가 가장 자연스러워요.
          </Muted>
        </View>
      ) : null}

      {/*
        읽는 속도. **폰 설정이 아니라 여기서 정해야 먹는다.**

        안드로이드 설정에도 '말하는 속도' 가 있지만 우리 앱에는 안 먹는다 —
        앱이 읽을 때마다 속도를 직접 넘겨서 시스템 값이 덮이기 때문이다.
        폰 설정의 미리듣기에서는 바뀌는데 앱에서는 그대로라, 됐는 줄 알고
        넘어가기 딱 좋다. 그래서 같은 자리에 둔다.
      */}
      {ttsEnabled ? (
        <View style={{ marginTop: spacing.lg }}>
          <Text style={s.label}>읽는 속도</Text>
          <Muted style={{ marginTop: 2 }}>
            폰 설정이 아니라 여기서 정합니다. 고르면 바로 들려줘요.
          </Muted>
          <Row style={{ gap: spacing.sm, marginTop: spacing.sm }}>
            {SPEECH_RATES.map((r) => {
              const on = (profile.settings.speechRate ?? SPEECH_RATES[1].value) === r.value;
              return (
                <Pressable
                  key={r.label}
                  onPress={() => {
                    setSpeechRate(r.value);
                    updateSettings(profile.id, { speechRate: r.value });
                    speak('Hello! Nice to meet you.', true);
                  }}
                  style={[s.chip, on && s.chipOn]}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: on }}
                >
                  <Text style={[s.chipText, on && s.chipTextOn]}>{r.label}</Text>
                </Pressable>
              );
            })}
          </Row>
        </View>
      ) : null}
    </Card>
  );
}

const s = StyleSheet.create({
  label: { fontSize: font.body, fontWeight: '600', color: colors.text },
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
  voiceWarn: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.accentSoft,
    borderWidth: 1,
    borderColor: colors.accent,
  },
  voiceWarnTitle: { fontSize: font.body, fontWeight: '800', color: '#B45309' },
  voiceRow: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  voiceRowOn: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primarySoft },
  voiceName: { fontSize: font.small, fontWeight: '700', color: colors.text },
  voiceHint: { fontSize: font.tiny, color: colors.subtext, marginTop: 2 },
  tryBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
  },
  tryBtnText: { fontSize: 18 },
});
