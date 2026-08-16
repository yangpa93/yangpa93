import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Muted, Screen, SettingsTile } from '../src/components/ui';
import { VersionButton } from '../src/components/VersionButton';
import { useApp } from '../src/store/AppProvider';
import { englishVoiceName, prepareVoice } from '../src/lib/feedback';
import { soundSummary } from '../src/lib/voice';
import { PARENT_TRACK_SHORT } from '../src/types';
import { perTrackCount, TRACK_ORDER } from '../src/srs/parentSession';
import { colors, spacing } from '../src/theme';

/**
 * ⚙️ 설정 — 갈 곳을 고르는 자리. **다섯이다.**
 *
 * ── 왜 다시 짰나 ────────────────────────────────────────────
 *
 * "설정이 여기저기 흩어져 있으니 너무 복잡합니다" 라는 말을 들었다. 맞는
 * 말이었다. 「아이들 폰 설정」 한 장에 매일 리포트 알림과 아이 폰 연결과
 * 기본 금액과 백업과 PIN 이 다 쌓여 있었고, 「아이별 설정」 은 또 따로 있었다.
 * 성격이 다른 것들이 한 이름 아래 묶여 있으니, 무엇을 고치려면 어디로 가야
 * 하는지 이름만 보고는 알 수 없었다.
 *
 *   ① 아이들 기본 설정  — 아이에 대한 것 (알림 · 금액 · 아이마다 공부할 것)
 *   ② 내 공부 설정      — 나 자신에 대한 것
 *   ③ 소리와 목소리     — 어떻게 들릴지
 *   ④ 아이들 폰 연결    — QR 로 잇고 끊기
 *   ⑤ 백업 및 PIN 설정  — 기록을 지키고 잠그기
 *
 * 가르는 기준은 **무엇에 대한 설정인가** 다. 아이냐 나냐 기기냐. 이 셋이
 * 섞이면 "아이 금액을 고치려는데 내 국어 레벨이 나오는" 일이 다시 생긴다.
 */
export default function ParentSettings() {
  const { state, profile } = useApp();

  /*
   * 목소리 이름은 기기 음성 목록을 다 읽어야 나온다. 앱이 뜰 때 한 번
   * 정해지지만 이 화면에 먼저 닿았을 수 있어 한 번 더 부른다(이미 정해졌으면
   * 그냥 돌아온다). 목록에 이름을 적으려면 여기서도 알아야 한다.
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

  const childProfiles = state.profiles.filter((p) => p.kind === 'child');
  const remoteNames = (state.knownChildren ?? []).map((c) => c.name);
  const childCount = new Set([...childProfiles.map((p) => p.name), ...remoteNames]).size;

  /*
   * 지금 무엇을 하루 몇 개씩 하기로 해 두었는지 한 줄로. 눌러 보지 않아도
   * 알 수 있게 한다. 개수를 갈래마다 붙이는 이유는 홈 카드와 같다 —
   * 숫자 하나만 떼어 두면 그것이 어느 갈래의 것인지 알 수 없다.
   */
  const per = profile ? perTrackCount(profile.parentStudy) : null;
  const tracks = per
    ? TRACK_ORDER.filter((t) => per[t] > 0).map((t) => `${PARENT_TRACK_SHORT[t]} ${per[t]}개`)
    : [];

  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>
        무엇을 고치시려는지 먼저 고르세요.
      </Muted>

      {/*
        ① 아이에 대한 것을 맨 위에. 부모가 설정에 들어오는 까닭은 대개 아이
        쪽을 고치려는 것이다. 그 안에서 다시 「공통」 과 「아이마다」 로 갈린다.
      */}
      <SettingsTile
        icon="🧒"
        title="아이들 기본 설정"
        hint={
          childCount === 0
            ? '매일 리포트 알림 · 기본 요청권 금액'
            : `아이 ${childCount}명 · 매일 리포트 알림 · 기본 요청권 금액 · 아이마다 공부할 것`
        }
        onPress={() => router.push('/parent-child-basics')}
      />

      <SettingsTile
        icon="📚"
        title="내 공부 설정"
        hint={
          tracks.length === 0
            ? '아직 아무것도 안 골랐어요. 무엇을 하루 몇 개씩 볼지 정합니다'
            : tracks.join(' · ')
        }
        onPress={() => router.push('/parent-plan')}
      />

      {/*
        소리는 세 번째 갈래로 둔다.

        "부모 설정에는 목소리를 확인하고 읽어보는 부분이 없다" — 맞는 말이었다.
        목소리 고르기는 아이 설정 화면 안에만 있었는데 부모는 거기 못 들어간다.
        부모도 일상 문장·영어 단어를 소리로 듣는데 바꿀 자리가 없었던 것이다.

        '내 공부 설정' 안에 넣을까 하다가 따로 뒀다. 그쪽은 **무엇을 몇 개**
        볼지이고 이쪽은 **어떻게 들릴지**라, 섞으면 다시 "어디 있더라"가 된다.

        지금 무엇으로 읽는지는 눌러 보지 않아도 여기 적혀 있다. 자리를 만들어
        놓고도 들어가 봐야 알 수 있으면 없는 것과 크게 다르지 않다.
      */}
      <SettingsTile
        icon="🔊"
        title="소리와 목소리"
        hint={soundSummary({
          ttsEnabled: profile?.settings.ttsEnabled ?? true,
          voiceName: voiceName,
          speechRate: profile?.settings.speechRate,
        })}
        onPress={() => router.push('/parent-sound')}
      />

      {/*
        ④ 연결. 예전에는 「아이들 폰 설정」 안에 들어 있었는데, 그것은 아이에
        대한 설정이 아니라 **기기끼리 잇는 일**이다. 한 번 해 두면 다시 올 일이
        거의 없는 자리라 아래쪽에 둔다.
      */}
      <SettingsTile
        icon="📱"
        title="아이들 폰 연결"
        hint={
          childCount === 0
            ? '아이 폰의 QR 을 찍어 연결합니다'
            : `${childCount}명 연결됨 · 새 아이 잇기 · 연결 끊기`
        }
        onPress={() => router.push('/parent-link')}
      />

      {/*
        ⑤ 기록을 지키고 잠그는 일. 이것도 아이 설정이 아니라 기기 설정이다.
        기록은 이 폰 안에만 있어서, 폰을 바꾸기 전에 반드시 들르는 자리다.
      */}
      <SettingsTile
        icon="🔒"
        title="백업 및 PIN 설정"
        hint="학습 기록 내보내기·가져오기 · 부모님 모드 PIN 바꾸기"
        onPress={() => router.push('/parent-backup-pin')}
      />

      {/*
        판도 **위 다섯과 같은 모양으로** 둔다. 칩 하나로 두었더니 그것이
        버튼인지 그냥 적어 둔 것인지 알 수 없다는 말을 들었다. 같은 화면에서
        어떤 것은 눌리고 어떤 것은 안 눌리는데 생긴 것이 다르면 매번 시험해
        봐야 한다.
      */}
      <VersionButton tone="parent" style={{ marginTop: spacing.xl }} />
    </Screen>
  );
}

