import { router } from 'expo-router';
import { Button, Muted, Screen } from '../src/components/ui';
import { ParentStudyPlan } from '../src/components/ParentStudyPlan';
import { spacing } from '../src/theme';

/**
 * 내 공부 설정 — 부모님 자신이 무엇을 하루 몇 개씩 볼지.
 *
 * ⚙️ 설정 → 내 공부 설정. 옆 칸 '아이들 폰 설정'과 갈라 둔 이유는
 * parent-settings.tsx 에 적어 두었다 — 두 설정은 성격이 완전히 다르고,
 * 섞어 두면 "아이 금액을 고치려는데 내 국어 레벨이 나온다".
 *
 * 화면은 껍데기뿐이다. 실제 고르는 부분은 부품(ParentStudyPlan)이라, 나중에
 * 다른 자리에도 붙일 수 있다.
 */
export default function ParentPlan() {
  return (
    <Screen>
      <Muted style={{ paddingTop: spacing.md }}>
        여기서 정한 것은 <Muted style={{ fontWeight: '800' }}>부모님 자신의 공부</Muted>에만
        적용됩니다. 아이들 것은 ⚙️ 설정 → 아이들 폰 설정 에 있어요.
      </Muted>

      <ParentStudyPlan />

      <Button
        title="다 정했어요"
        variant="parent"
        onPress={() => router.back()}
        style={{ marginTop: spacing.lg }}
      />
    </Screen>
  );
}
