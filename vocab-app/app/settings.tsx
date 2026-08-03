import { router } from 'expo-router';
import { Button, Muted, Screen, SettingsTile } from '../src/components/ui';
import { VersionButton } from '../src/components/VersionButton';
import { useApp } from '../src/store/AppProvider';
import { SUBJECT_LABEL, SUBJECT_ORDER } from '../src/types';
import { labelOf } from '../src/components/AvatarPicker';
import { soundSummary } from '../src/lib/voice';
import { englishVoiceName, prepareVoice } from '../src/lib/feedback';
import { useEffect, useState } from 'react';
import { colors, spacing } from '../src/theme';

/**
 * ⚙️ 설정 — 세 갈래로 나누는 자리. **부모 설정과 같은 모양이다.**
 *
 * ── 왜 한 겹을 더 두는가 ─────────────────────────────────────
 *
 * 예전에는 이 화면이 곧 설정 내용이었다. 하루 분량 · 무엇부터 풀까 · 소리 ·
 * 진동 · 캐릭터 · 부모님 연결 · 백업 · 문의 · 판 정보 · 부모님 모드가 한 줄로
 * 죽 이어져 있었다. 찾으려면 굴려야 하고, 굴리다 보면 무엇을 찾으려 했는지
 * 잊는다.
 *
 * 부모 쪽은 이미 갈래를 나눠 두었다. 아이 쪽만 안 나눠 두면 같은 앱인데 두
 * 사람이 서로 다른 모양을 쓰게 되고, 부모가 아이에게 길을 알려 줄 수가 없다.
 * 그래서 같은 부품(SettingsTile)으로 같은 모양을 만든다.
 *
 * ── 무엇이 어디로 갔나 ───────────────────────────────────────
 *
 *   ⚙️ 설정        내 캐릭터 · 부모님과 연결 · 백업 · 문의
 *   📚 내 공부 설정  무엇을 공부할지 · 하루 몇 개 · 무엇부터
 *   🔊 목소리 설정   목소리 · 읽는 속도 · 진동
 *
 * **가장 큰 것은 📚 안에 새로 생긴 것이다.** 여태 아이는 자기 폰에서 국어를
 * 켤 방법이 아예 없었다 — 과목을 고르는 자리가 부모 폰(parent-children)에만
 * 있었고, 아이 설정 화면은 그 값을 읽기만 했다. 국어를 하고 싶은 아이는
 * 부모를 불러 부모 폰을 켜게 해야 했던 것이다.
 */
export default function ChildSettings() {
  const { profile } = useApp();

  /*
   * 목소리 이름은 기기 음성 목록을 다 읽어야 나온다. 앱이 뜰 때 한 번 정해지지만
   * 이 화면에 먼저 닿았을 수 있어 한 번 더 부른다(이미 정해졌으면 그냥 돌아온다).
   * 부모 설정과 같은 이유로 같은 모양이다.
   */
  const [voiceName, setVoiceName] = useState(englishVoiceName() ?? '');
  useEffect(() => {
    let cancelled = false;
    void prepareVoice().then(() => {
      if (!cancelled) setVoiceName(englishVoiceName() ?? '');
    });
    return () => {
      cancelled = true;
    };
  }, [profile?.settings.voiceId]);

  if (!profile) return null;

  const { subjects, newPerDay, reviewPerDay, rounds } = profile.settings;

  /*
   * 지금 무엇을 켜 두었는지 눌러 보지 않아도 알 수 있게 한다. 자리를 만들어
   * 놓고도 들어가 봐야 알 수 있으면 없는 것과 크게 다르지 않다.
   */
  const on = SUBJECT_ORDER.filter((s) => subjects.includes(s)).map((s) => SUBJECT_LABEL[s]);
  const questions = (newPerDay + reviewPerDay) * rounds;

  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>무엇을 고치려는지 먼저 고르세요.</Muted>

      <SettingsTile
        icon="⚙️"
        title="설정"
        hint={`내 캐릭터(${profile.avatar} ${labelOf(profile.avatar)}) · 부모님과 연결하기 · 공부 기록 백업 및 복구 · 앱 담당자에게 문의하기`}
        onPress={() => router.push('/settings-me')}
      />

      <SettingsTile
        icon="📚"
        title="내 공부 설정"
        hint={
          on.length === 0
            ? '무엇을 공부할지 정합니다'
            : `${on.join(' · ')} · 하루 ${questions}문제`
        }
        onPress={() => router.push('/settings-study')}
      />

      <SettingsTile
        icon="🔊"
        title="목소리 설정"
        hint={soundSummary({
          ttsEnabled: profile.settings.ttsEnabled,
          voiceName,
          speechRate: profile.settings.speechRate,
        })}
        onPress={() => router.push('/settings-sound')}
      />

      {/*
        지금 어느 앱을 쓰고 있는지 아이 스스로 말할 수 있어야 한다. 고쳐서 새로
        올렸는데 아직 옛 앱을 쓰고 있는 경우가 흔한데, 그때 이 줄을 읽어 주면
        바로 가려진다. 부모님 모드 안에만 있으면 물어볼 때마다 부모를 거쳐야 한다.

        **위 셋과 같은 모양으로 둔다.** 예전에는 가운데 정렬한 흐린 글자 두 줄이라
        누를 것으로 보이지 않았다. 같은 화면 안에서 어떤 것은 눌리고 어떤 것은
        안 눌리는데 생긴 것이 다르면, 무엇이 눌리는지 매번 시험해 봐야 한다.
      */}
      <VersionButton tone="primary" style={{ marginTop: spacing.xl }} />

      {/*
        부모님 모드로 들어가는 문. 눈에 잘 안 띄는 맨 아래에 한 줄로 남긴다 —
        아이 폰 홈에 있던 것을 여기로 옮겼고, 뒤에 PIN 이 있어 아이가 눌러도
        들어가지 못한다. 아주 막아 버리면 이 폰에 부모 프로필을 만들어 둔 집이
        자기 화면으로 돌아갈 수 없다.
      */}
      <Button
        title="👨‍👩‍👧 부모님 모드"
        variant="ghost"
        onPress={() => router.push('/parent')}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}
