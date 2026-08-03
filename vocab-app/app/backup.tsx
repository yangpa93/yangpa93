import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Directory, File, Paths } from 'expo-file-system';
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
import { fileNameFromUrl } from '../src/features/openedFile';
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
  /** 방금 저장한 파일 이름. 화면에 남겨 둔다 — 어디에 뒀는지 잊기 쉽다. */
  const [saved, setSaved] = useState<string | null>(null);
  /** 다른 앱이 넘긴 파일 주소. '다른 앱으로 열기' 로 들어오면 채워진다. */
  const { src } = useLocalSearchParams<{ src?: string }>();

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';
  const childCount = state.profiles.length;

  /* ---------------- 내보내기 ---------------- */

  /** 백업 한 덩어리를 만들어 캐시 파일로 써 둔다. 두 길이 함께 쓴다. */
  async function makeFile(): Promise<{ file: File; name: string; text: string } | null> {
    if (childCount === 0) {
      Alert.alert('내보낼 것이 없어요', '아이 프로필을 먼저 만들어 주세요.');
      return null;
    }
    const data = await readAllProfileData();
    const backup = buildBackup(state, data, appVersion, Date.now());
    const name = backupFileName(backup.createdAt);
    const text = serializeBackup(backup);

    const file = new File(Paths.cache, name);
    if (file.exists) file.delete();
    file.create();
    file.write(text);
    return { file, name, text };
  }

  /**
   * **폴더를 골라 그 자리에 저장한다.** 이게 기본 길이다.
   *
   * 예전에는 공유 창만 띄웠다. 그런데 카톡으로 보냈더니 "파일을 열 수 있는
   * 앱이 없다"며 받는 쪽에서 내려받지 못했다. 카톡은 모르는 형식의 파일을
   * 막는다 — 우리 백업은 json 이라 거기 걸린다.
   *
   * 남에게 보내는 것이 아니라 **내 폰 어딘가에 두는 것**이 백업의 목적이다.
   * 그러면 다른 앱을 거칠 이유가 없다. 폴더를 고르게 하고 거기에 바로 쓴다.
   * 안드로이드는 '다운로드' 를, 아이폰은 '파일' 앱의 아무 곳이나 고르면 된다.
   */
  async function saveToFolder() {
    setBusy('저장할 곳을 고르는 중');
    try {
      const made = await makeFile();
      if (!made) return;

      const dir = await Directory.pickDirectoryAsync();
      const target = new File(dir, made.name);
      if (target.exists) target.delete();
      target.create();
      target.write(made.text);

      setSaved(made.name);
      Alert.alert(
        '저장했어요',
        `${made.name}\n\n고르신 폴더에 들어 있습니다. 폰을 바꾸면 이 파일로 되돌릴 수 있어요.`,
      );
    } catch (e) {
      /*
       * 폴더 고르기를 취소하면 여기로 온다. 취소는 잘못이 아니므로 조용히
       * 넘어간다 — 취소할 때마다 오류 창이 뜨면 다시는 안 누른다.
       */
      const msg = String(e);
      if (/cancel/i.test(msg)) return;
      Alert.alert('저장하지 못했어요', `${msg}\n\n아래 '다른 앱으로 보내기' 로도 빼실 수 있어요.`);
    } finally {
      setBusy(null);
    }
  }

  /** 예전 길. 카톡·메일·드라이브로 보낸다. 카톡은 json 을 막을 수 있다. */
  async function shareBackup() {
    setBusy('내보내는 중');
    try {
      const made = await makeFile();
      if (!made) return;

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert(
          '공유를 쓸 수 없어요',
          `백업 파일은 만들었어요.\n${made.file.uri}\n\n파일 앱에서 찾아 옮겨 주세요.`,
        );
        return;
      }

      await Sharing.shareAsync(made.file.uri, {
        mimeType: 'application/json',
        dialogTitle: '학습 기록 백업 보내기',
        UTI: 'public.json',
      });
    } catch (e) {
      Alert.alert('내보내지 못했어요', String(e));
    } finally {
      setBusy(null);
    }
  }

  /* ---------------- 다른 앱이 넘긴 파일 ---------------- */

  /**
   * 카톡 등에서 **다른 앱으로 열기 → 곰탱이보카** 로 넘어온 파일을 읽는다.
   *
   * 카톡은 json 내려받기를 막는다. 그래서 대화방 안에 갇힌 백업을 꺼내는
   * 길이 이것뿐인 경우가 있다. 파일을 고르는 것과 똑같이 **먼저 보여주고**
   * 되돌릴지는 그다음에 정하게 한다 — 넘겨받았다고 바로 덮어쓰면 되돌릴 수
   * 없는 일이 한 번의 오조작으로 일어난다.
   */
  const openFromUrl = useCallback(async (uri: string) => {
    setBusy('파일을 읽는 중');
    try {
      const text = await new File(uri).text();
      const parsed = readBackup(text);
      if (!parsed.ok) {
        const name = fileNameFromUrl(uri);
        Alert.alert('읽을 수 없는 파일이에요', `${name ? name + '\n\n' : ''}${parsed.reason}`);
        return;
      }
      setPicked(parsed.backup);
    } catch (e) {
      Alert.alert('파일을 열지 못했어요', String(e));
    } finally {
      setBusy(null);
    }
  }, []);

  useEffect(() => {
    if (typeof src === 'string' && src) void openFromUrl(src);
  }, [src, openFromUrl]);

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
      {/*
        '왜 백업이 필요한가요?' 카드를 없앴다.

        같은 말이 이미 여기까지 오는 길에 두 번 나온다 — ⚙️ 설정의 갈래 이름과
        '💾 공부 기록 백업 및 복구' 카드 설명. 이 화면에 들어온 사람은 이미
        왜 하는지 알고 들어온 것이다. 여기서 또 설명하면 정작 눌러야 할 단추가
        한 화면 아래로 밀린다.
      */}
      <Card style={{ marginTop: spacing.md }}>
        <H3>내보내기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          이 폰에 있는 {childCount}명의 학습 기록·오답·달력·동기 부여 요청권을 파일 한 장으로 묶어요.
          {'\n'}부모님 PIN 은 담지 않아요. 파일이 돌아다닐 수 있으니까요.
        </Muted>
        <Button title="💾 파일로 저장하기" onPress={saveToFolder} style={{ marginTop: spacing.md }} />
        <Muted style={{ marginTop: spacing.sm }}>
          저장할 폴더를 고르는 창이 뜹니다. 안드로이드는 ‘다운로드’, 아이폰은 ‘파일’ 앱의
          아무 곳이나 고르시면 돼요.
        </Muted>

        {saved ? (
          <View style={s.savedBox}>
            <Body style={{ fontWeight: '800' }}>저장했어요</Body>
            <Muted style={{ marginTop: 2 }}>{saved}</Muted>
          </View>
        ) : null}

        {/*
          카톡으로 보내는 길은 남겨 두되 아래로 내린다.

          카톡은 모르는 형식의 파일을 막는다. 실제로 백업을 카톡으로 보냈더니
          받는 쪽에서 "파일을 열 수 있는 앱이 없다"며 내려받지 못했다. 그런데
          드라이브나 메일로 보내는 것은 잘 되므로 길 자체를 없애지는 않는다.
        */}
        {/*
          ghost 였던 것을 secondary 로 바꾼다. 바탕도 테두리도 없어서 "버튼인지
          모르겠다" 는 말을 들었다. 카톡이 막는 형식이라 이 길을 권하지는
          않지만, **권하지 않는 것과 안 보이게 두는 것은 다르다.** 위 단추와
          색을 갈라 두어 무엇이 먼저인지는 그대로 보이게 한다.
        */}
        <Button
          title="다른 앱으로 보내기 (드라이브·메일)"
          variant="secondary"
          onPress={shareBackup}
          style={{ marginTop: spacing.md }}
        />
        <Muted style={{ marginTop: spacing.xs }}>
          카카오톡으로는 받는 쪽에서 못 열 수 있어요. 위의 ‘파일로 저장하기’ 를 권합니다.
        </Muted>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <H3>가져오기</H3>
        <Muted style={{ marginTop: spacing.xs }}>
          백업 파일을 고르면 무엇이 들어 있는지 먼저 보여줘요. 그걸 보고 되돌릴지
          정하면 돼요.
        </Muted>
        <Button title="백업 파일 고르기" variant="secondary" onPress={pickBackup} style={{ marginTop: spacing.md }} />
        <Muted style={{ marginTop: spacing.sm }}>
          카카오톡에 있는 백업은 받는 쪽에서 내려받기가 막힙니다. 그때는 그 파일을 길게 눌러
          <Text style={{ fontWeight: '800' }}> 다른 앱으로 열기 → 곰탱이보카</Text> 를 고르시면
          이 화면으로 바로 들어옵니다.
        </Muted>
      </Card>

      <Muted style={{ marginTop: spacing.lg, textAlign: 'center' }}>
        되돌린 뒤에는 부모님 PIN 과 부모님 폰 연결을 다시 정해 주세요.
      </Muted>
    </Screen>
  );
}

const s = StyleSheet.create({
  savedBox: {
    marginTop: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.correct,
  },
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
