/**
 * QR 코드를 화면에 그린다.
 *
 * `react-native-svg` 같은 그림 라이브러리를 새로 들이지 않고 네모(View)만
 * 쌓아 그린다. 격자가 21~33칸이면 칸이 수백 개인데, 그 정도는 그냥 그려도
 * 느리지 않고 새 의존성을 하나 줄이는 편이 낫다.
 *
 * 한 줄을 View 하나로 묶고 그 안에 칸을 늘어놓는다. 이어진 검은 칸은 하나로
 * 합쳐 그린다 — 칸마다 View 를 만들면 개수가 세 배로 뛴다.
 */

import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { cellSize, qrMatrix, QUIET_ZONE } from '../features/qr';

export function QrCode({ value, size = 220 }: { value: string; size?: number }) {
  const { matrix, cell } = useMemo(() => {
    const m = qrMatrix(value);
    return { matrix: m, cell: cellSize(m.size, size) };
  }, [value, size]);

  const side = (matrix.size + QUIET_ZONE * 2) * cell;

  return (
    <View style={[s.frame, { width: side, height: side, padding: QUIET_ZONE * cell }]}>
      {matrix.rows.map((row, y) => (
        <View key={y} style={{ flexDirection: 'row', height: cell }}>
          {runsOf(row).map((run, i) => (
            <View
              key={i}
              style={{
                width: run.length * cell,
                height: cell,
                backgroundColor: run.on ? '#000' : 'transparent',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

/** 한 줄을 '같은 색이 이어지는 토막'으로 묶는다. */
function runsOf(row: boolean[]): { on: boolean; length: number }[] {
  const out: { on: boolean; length: number }[] = [];
  for (const on of row) {
    const last = out[out.length - 1];
    if (last && last.on === on) last.length += 1;
    else out.push({ on, length: 1 });
  }
  return out;
}

const s = StyleSheet.create({
  // 바탕은 반드시 흰색이어야 한다. 앱 배경(연회색) 위에 그대로 얹으면
  // 대비가 모자라 카메라가 못 읽는다.
  frame: { backgroundColor: '#FFFFFF', alignSelf: 'center' },
});
