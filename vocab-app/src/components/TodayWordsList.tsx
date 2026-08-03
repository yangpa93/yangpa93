import { useMemo } from 'react';
import { View } from 'react-native';
import { Chip, EmptyState, Muted, Row } from './ui';
import { StudiedWordCard } from './StudiedWordCard';
import { useApp } from '../store/AppProvider';
import { ALL_ENTRIES } from '../data';
import { DAILY_ENTRIES } from '../data/daily';
import { KO_ENTRIES } from '../data/korean/levels';
import { studiedToday } from '../features/dayRecord';
import { countByKind, studiedWords, WORD_KIND_LABEL, wrongOnes } from '../features/studiedWords';
import { todayKey } from '../lib/date';
import { spacing } from '../theme';

/*
 * 찾아보기 표는 앱이 뜰 때 한 번만 만든다. 3,690 + 1,287 + 일상 문장을 매번
 * 훑으면 목록을 열 때마다 멈칫한다.
 */
const EN_BY_ID = new Map(ALL_ENTRIES.map((e) => [e.id, e]));
const DAILY_BY_ID = new Map(DAILY_ENTRIES.map((e) => [e.id, e]));
const KO_BY_ID = new Map(KO_ENTRIES.map((e) => [e.id, e]));

/**
 * 오늘 배운 낱말 목록.
 *
 * 단어장의 '오늘 배운 것' 과 오답 노트의 '오늘 틀린 것' 이 같은 것을 본다.
 * 두 화면에 각각 적어 두면 한쪽만 고치게 되어 서로 다른 말을 하게 된다.
 *
 * `wrongOnly` 면 오늘 틀린 것만, 많이 틀린 순서로.
 */
export function TodayWordsList({ wrongOnly = false }: { wrongOnly?: boolean }) {
  const { profile, data } = useApp();
  const today = todayKey();

  const words = useMemo(() => {
    const list = studiedWords(studiedToday(data.days[today]), {
      en: EN_BY_ID,
      daily: DAILY_BY_ID,
      ko: KO_BY_ID,
    });
    return wrongOnly ? wrongOnes(list) : list;
  }, [data.days, today, wrongOnly]);

  if (!profile) return null;

  if (words.length === 0) {
    return wrongOnly ? (
      <EmptyState
        icon="🌟"
        title="오늘은 틀린 것이 없어요"
        hint="아래 '많이 틀린 단어'에서 예전에 틀린 것을 볼 수 있어요."
      />
    ) : (
      <EmptyState
        icon="📖"
        title="오늘은 아직 공부를 안 했어요"
        hint="공부를 시작하면 오늘 만난 낱말이 여기에 모여요."
      />
    );
  }

  return (
    <View>
      {/*
        갈래마다 몇 개인지 한 줄로. 부모는 셋을 섞어 공부하므로 이게 없으면
        목록이 왜 이렇게 긴지 알 수 없다. 0 인 갈래는 아예 안 적는다.
      */}
      <Row style={{ marginTop: spacing.md, gap: spacing.sm, flexWrap: 'wrap' }}>
        {countByKind(words).map(({ kind, n }) => (
          <Chip key={kind} label={`${WORD_KIND_LABEL[kind]} ${n}개`} tone="primary" />
        ))}
      </Row>

      <Muted style={{ marginTop: spacing.sm }}>
        {wrongOnly
          ? '오늘 틀린 것이에요. 눌러서 뜻과 예문을 볼 수 있어요.'
          : '오늘 만난 순서예요. 눌러서 뜻과 예문을 볼 수 있어요.'}
      </Muted>

      <View style={{ marginTop: spacing.md, gap: spacing.sm }}>
        {words.map((w) => (
          <StudiedWordCard key={w.id} word={w} ttsEnabled={profile.settings.ttsEnabled} />
        ))}
      </View>
    </View>
  );
}
