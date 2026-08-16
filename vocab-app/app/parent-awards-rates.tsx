import { Card, H3, Muted, Screen } from '../src/components/ui';
import { AwardRatesEditor } from '../src/components/AwardRatesEditor';
import { useApp } from '../src/store/AppProvider';
import { awardRates } from '../src/features/awards';
import { spacing } from '../src/theme';

/**
 * 🎟️ 기본 동기 부여 요청권 금액.
 *
 * ── 왜 화면을 따로 뺐나 ─────────────────────────────────────
 *
 * 「아이들 폰 설정」 한 장에 알림·연결·금액·백업·PIN 이 모두 쌓여 있었다.
 * 그러다 보니 금액을 고치려면 화면을 한참 굴려야 했고, 무엇보다 **연결하기와
 * 아이별 설정이 같은 화면에 섞여** 어느 것을 누르면 무엇이 나오는지 알기
 * 어려웠다. 이제 그 화면은 갈 곳을 고르는 세 단추만 두고, 실제 설정은
 * 저마다 제 화면에서 한다.
 *
 * 아이마다 금액을 달리 하려면 아이별 설정에서 그 아이를 눌러 고친다.
 * 여기서 정하는 것은 **아무것도 안 정했을 때 쓰는 값**이다.
 */
export default function ParentAwardRates() {
  const { state, updateParent } = useApp();
  const rates = awardRates(state.parent.awards);

  return (
    <Screen>
      <Card style={{ marginTop: spacing.md }}>
        <H3>기본 동기 부여 요청권 금액</H3>
        {/*
          「한 달을 개근하면」 이라고 적혀 있었다. 그 방식을 없앤 뒤에도 이 줄만
          남아, 화면 아래에는 없는 것을 위에서 말하고 있었다. 설명도 넉 줄에서
          한 줄로 줄였다 — 길면 정작 고칠 금액 단추가 화면 밖으로 밀린다.
        */}
        <Muted style={{ marginTop: spacing.xs }}>
          아이마다 다르게 하시려면 「아이별 설정」에서 그 아이를 눌러 고치세요.
        </Muted>

        <AwardRatesEditor rates={rates} onChange={(next) => updateParent({ awards: next })} />
      </Card>
    </Screen>
  );
}
