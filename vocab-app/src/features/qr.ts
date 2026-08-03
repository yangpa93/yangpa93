/**
 * QR 코드 격자를 만든다. 화면과 분리해 둔 순수 로직이다.
 *
 * 그림을 그리지 않고 **켜고 끈 칸의 표**만 돌려준다. 실제로 칠하는 일은
 * `components/QrCode.tsx` 가 한다. 이렇게 나눠 두면 격자가 제대로 나오는지를
 * react-native 없이 시험할 수 있다.
 *
 * QR 을 쓰는 이유는 아이 기기에 아무것도 안 깔려 있어도 되기 때문이다.
 * 카톡으로 링크를 보내려면 카톡이 있어야 하고, 코드를 옮겨 적으려면 스물몇
 * 글자를 대소문자까지 맞춰 쳐야 한다. QR 은 두 기기를 마주 보게만 하면 된다.
 */

import QRCode from 'qrcode';

export interface QrMatrix {
  /** 한 변의 칸 수. 담는 글자가 길수록 커진다. */
  size: number;
  /** `rows[y][x]` 가 true 면 검은 칸 */
  rows: boolean[][];
}

/**
 * 문자열을 QR 격자로.
 *
 * 오류 정정 수준은 M(약 15%)을 쓴다. 화면을 카메라로 찍는 상황이라 손떨림과
 * 화면 반사로 일부가 뭉개진다. L 은 그 여유가 너무 적고, H 로 올리면 같은
 * 내용에 격자가 커져 칸 하나가 작아진다 — 오히려 못 읽는다.
 */
export function qrMatrix(text: string): QrMatrix {
  const data = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const size = data.modules.size;
  const bits = data.modules.data;

  const rows: boolean[][] = [];
  for (let y = 0; y < size; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < size; x++) row.push(bits[y * size + x] === 1);
    rows.push(row);
  }

  return { size, rows };
}

/**
 * 한 칸을 몇 픽셀로 그릴지.
 *
 * 격자를 상자에 꽉 채우되 칸은 정수 픽셀이라야 한다. 소수로 두면 칸마다
 * 반올림이 달라져 줄이 굵었다 얇았다 하고, 그러면 카메라가 못 읽는다.
 *
 * 테두리 여백(quiet zone)은 QR 규격이 네 칸을 요구한다. 이걸 빼먹으면
 * 배경과 격자가 붙어 인식률이 크게 떨어진다.
 */
export const QUIET_ZONE = 4;

export function cellSize(matrixSize: number, boxPx: number): number {
  const total = matrixSize + QUIET_ZONE * 2;
  return Math.max(1, Math.floor(boxPx / total));
}
