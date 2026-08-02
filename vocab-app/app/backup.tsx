import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Constants from 'expo-constants';
import { Body, Button, Card, H3, Muted, Row, Screen } from '../src/components/ui';
import { useApp } from '../src/store/AppProvider';
import {
  BackupFile,
  backupFileName,
  buildBackup,
  describeBackup,
  readBackup,
  restoreMerge,
  restoreReplace,
  serializeBackup,
} from '../src/features/backup';
import { LEVEL_SHORT, LevelId } from '../src/types';
import { colors, radius, spacing } from '../src/theme';

/**
 * 학습 기록 내보내기·가져오기.
 *
 * 이 앱은 서버가 없어서 기록이 그 기기 안에만 있다. 폰을 바꾸거나 앱을
 * 지우면 통째로 사라진다. 파일 한 장으로 빼 두면 그게 백업이 된다.
 *
 * 되돌리기는 되돌릴 수 없는 동작이라 두 단계로 나눴다.
 *  1) 파일을 고르면 **무엇이 들어 있는지 먼저 보여준다**
 *  2) 그걸 보고 '통째로' 또는 '아이만'을 고른다
 */
export default function ParentBackup() {
  const { state, replaceAll, readAllProfileData } = useApp();

  const [busy, setBusy] = useState<string | null>(null);
  /** 고른 파일. 아직 되돌리지는 않은 상태 */
  const [picked, setPicked] = useState<BackupFile | null>(null);

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const childCount = state.profiles.length;

  /* ---------------- 내보내기 ---------------- */

  async function exportBackup() {
    if (childCount === 0) {
      Alert.alert('내보낼 것이 없어요', '아이 프로필을 먼저 만들어 주세요.');
      return;
    }
    setBusy('내보내는 중');
    try {
      const data = await readAllProfileData();
      const backup = buildBackup(state, data, appVersion, Date.now());
      const name = backupFileName(backup.createdAt);

      // 캐시에 쓴다. 공유하고 나면 시스템이 알아서 정리한다.
      const file = new File(Paths.cache, name);
      if (file.exists) file.delete();
      file.create();
      file.write(serializeBackup(backup));

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          '공유를 쓸 수 없어요',
          `백업 파일은 만들었어요.\n${file.uri}\n\n파일 앱에서 찾아 옮겨 주세요.`,
        );
        return;
      }

      await Sharing.shareAsync(file.uri, {
        mimeType: 'application/json',
        dialogTitle: '학습 기록 백업 저장하기',
        UTI: 'public.json',
      });
    } catch (e) {
      Alert.alert('내보내지 못했어요', String(e));
    } finally {
      setBusy(null);
    }
  }

  /* ---------------- 파일 고르기 ---------------- */

  async function pickBackup() {
    setBusy('파일을 읽는 중');
    try {
      // json 말고 다른 것도 고를 수 있게 열어 둔다. 카톡·드라이브를
      // 거치면 확장자가 바뀌거나 형식이 octet-stream으로 오기도 한다.
      const result = await File.pickFileAsync({
        mimeTypes: ['application/json', 'text/plain', 'application/octet-stream'],
      });
      if (result.canceled || !result.result) return;

      const text = await result.result.text();
      const parsed = readBackup(text);
      if (!parsed.ok) {
        Alert.alert('읽을 수 없는 파일이에요', parsed.reason);
        return;
      }
      setPicked(parsed.backup);
    } catch (e) {
      Alert.alert('파일을 열지 못했어요', String(e));
    } finally {
      setBusy(null);
    }
  }

  /* ---------------- 되돌리기 ---------------- */

  function confirmReplace(backup: BackupFile) {
    const now = state.profiles.map((p) => p.name).join(', ');
    Alert.alert(
      '통째로 되돌릴까요?',
      childCount > 0
        ? `지금 이 기기의 기록(${now})이 모두 사라지고 백업 내용으로 바뀝니다. 되돌릴 수 없어요.`
        : '백업 내용으로 되돌립니다.',
      [
        { text: '취소', style: 'cancel' },
        {
          text: '되돌리기',
          style: 'destructive',
          onPress: async () => {
            setBusy('되돌리는 중');
            try {
              const next = restoreReplace(backup, state);
              await replaceAll(next.state, next.data);
              setPicked(null);
              Alert.alert('되돌렸어요', '홈 화면에서 확인해 주세요.');
            } catch (e) {
              Alert.alert('되돌리지 못했어요', String(e));
            } finally {
              setBusy(null);
            }
          },
        },
      ],
    );
  }

  async function mergeChildren(backup: BackupFile) {
    setBusy('가져오는 중');
    try {
      const currentData = await readAllProfileData();
      const stamp = Date.now().toString(36);
      const next = restoreMerge(
        backup,
        state,
        currentData,
        (n) => `p_${stamp}_${n}`,
      );
      await replaceAll(next.state, next.data);
      setPicked(null);
      Alert.alert('가져왔어요', '홈 화면에서 아이를 바꿔 확인해 주세요.');
    } catch (e) {
      Alert.alert('가져오지 못했어요', String(e));
    } finally {
      setBusy(null);
    }
  }

  /* ---------------- 화면 ---------------- */

  if (busy) {
    return (
      <Screen>
        <View style={s.center}>
          <ActivityIndicator size="large" color={colors.parent} />
          <Muted style={{ marginTop: spacing.lg }}>{busy}…</Muted>
        </View>
      </Screen>
    );
  }

  // 파일을 고른 뒤 — 무엇이 들어 있는지 먼저 보여준다.
  if (picked) {
    const info = describeBackup(picked);
    const made = new Date(info.createdAt);

    return (
      <Screen>
        <Card style={{ marginTop: spacing.md, borderColor: colors.parent }}>
          <H3>이 백업에 들어 있는 것</H3>
          <Muted style={{ marginTop: spacing.xs }}>
            {made.getFullYear()}년 {made.getMonth() + 1}월 {made.getDate()}일에 만든 백업 · 앱{' '}
            {info.appVersion}
          </Muted>

          {info.children.map((c, i) => (
            <View key={`${c.name}-${i}`} style={s.child}>
              <Row style={{ justifyContent: 'space-between' }}>
                <Text style={s.childName}>{c.name}</Text>
                <Text style={s.childLevel}>{LEVEL_SHORT[c.level as LevelId] ?? c.level}</Text>
              </Row>
              <Muted style={{ marginTop: 2 }}>
                공부한 날 {c.days}일 · 익힌 단어 {c.words}개
              </Muted>
            </View>
          ))}

          {info.children.length === 0 ? (
            <Muted style={{ marginTop: spacing.md }}>아이가 한 명도 없는 백업이에요.</Muted>
          ) : null}
        </Card>

        <Card style={{ marginTop: spacing.md }}>
          <H3>어떻게 할까요?</H3>

          <Text style={[s.label, { marginTop: spacing.lg }]}>통째로 되돌리기</Text>
          <Muted style={{ marginTop: 2 }}>
            폰을 바꿨을 때 씁니다. 지금 이 기기의 기록은 모두 사라지고 백업 내용으로 바뀝니다.
          </Muted>
          <Button
            title="통째로 되돌리기"
            variant="danger"
            onPress={() => confirmReplace(picked)}
            style={{ marginTop: spacing.md }}
          />

          <Text style={[s.label, { marginTop: spacing.xl }]}>아이만 가져오기</Text>
          <Muted style={{ marginTop: 2 }}>
            아이들이 각자 기기를 쓰다가 한 기기에 모을 때 씁니다. 지금 기록은 그대로 두고
            백업의 아이를 더합니다. 같은 아이가 이미 있어도 덮어쓰지 않고 따로 들어옵니다.
          </Muted>
          <Button
            title="아이만 가져오기"
            variant="parent"
            onPress={() => mergeChildren(picked)}
            style={{ marginTop: spacing.md }}
          />

          <Button
            title="취소"
            variant="ghost"
            onPress={() => setPicked(null)}
            style={{ marginTop: spacing.lg }}
          />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <Card style={{ marginTop: spacing.md, backgroundColor: colors.accentSoft, borderColor: colors.accent }}>
        <H3>왜 백업이 필요한가요?</H3>
        <Body style={{ marginTop: spacing.sm, color: colors.subtext }}>
          이 앱은 서버가 없어서 학습 기록이 <Text style={{ fontWeight: '800' }}>이 기기 안에만</Text>{' '}
          있습니다. 폰을 바꾸거나 앱을 지우면 그동안의 기록이 모두 사라집니다.
          {'\n\n'}
          한 달에 한 번쯤 내보내서 카카오톡으로 자기에게 보내 두거나 드라이브에 올려 두세요.
          파일 한 장이면 새 폰에서 그대로 되살아나요.
        </Body>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>내보내기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          이 폰에 있는 {childCount}명의 학습 기록·오답·달력·동기 부여 요청권을 파일 한 장으로 묶어요.
          {'\n'}부모님 PIN 은 담지 않아요. 파일이 돌아다닐 수 있으니까요.
        </Muted>
        <Button title="백업 파일 내보내기" onPress={exportBackup} style={{ marginTop: spacing.md }} />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>가져오기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          백업 파일을 고르면 무엇이 들어 있는지 먼저 보여줘요. 그걸 보고 되돌릴지
          정하면 돼요.
        </Muted>
        <Button title="백업 파일 고르기" variant="secondary" onPress={pickBackup} style={{ marginTop: spacing.md }} />
      </Card>

      <Muted style={{ marginTop: spacing.lg, textAlign: 'center' }}>
        되돌린 뒤에는 부모님 PIN 과 부모님 폰 연결을 다시 정해 주세요.
      </Muted>
    </Screen>
  );
}

const s = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: spacing.xxl },
  label: { fontSize: 16, fontWeight: '700', color: colors.text },
  child: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
  },
  childName: { fontSize: 16, fontWeight: '800', color: colors.text },
  childLevel: { fontSize: 14, fontWeight: '700', color: colors.parent },
});
