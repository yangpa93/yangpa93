/**
 * 아이가 띄우는 QR 을 **기계로 도로 읽어 본다.**
 *
 * ── 여태 확인이 반만 되어 있었다 ────────────────────────────
 *
 * `qr.test.ts` 는 격자가 만들어지는지까지만 봤다. `check-link.mjs` 는 진짜로
 * 되읽어 보지만, 거기서 읽는 것은 **qrcode 라이브러리가 직접 그린 PNG** 다.
 * 앱 화면에 뜨는 것은 그게 아니다 — 앱은 `qrMatrix()` 가 돌려준 켜고 끈 칸의
 * 표를 받아 `QrCode.tsx` 가 네모를 쌓아 그린다. **그 길은 아무도 되읽어 본
 * 적이 없었다.**
 *
 * 격자를 픽셀로 옮기는 자리는 조용히 틀리기 좋은 곳이다. 행과 열이 뒤바뀌거나
 * 테두리 여백을 빼먹으면 격자는 그럴듯하게 생겼는데 카메라가 못 읽는다.
 * 그러면 "찍었는데 아무 일도 안 일어난다" 가 되고, 그건 지금 이 앱이 겪은 바로
 * 그 증상이다.
 *
 * 그래서 여기서는 **앱이 쓰는 그 함수**의 결과를 픽셀로 풀어 jsQR 에 넣고,
 * 넣은 주소가 한 글자도 안 틀리고 나오는지 본다. 폰이 없어도 확인된다.
 */

import jsQR from 'jsqr';
import { buildChildLinkUrl, buildLinkUrl, previewPushToken } from '../src/features/pairing';
import { cellSize, qrMatrix, QUIET_ZONE } from '../src/features/qr';

/* 진짜 Expo 주소와 같은 길이·모양. 짧은 가짜로 시험하면 격자가 작게 나와서
 * 정작 실제 상황에서 안 읽히는 것을 못 잡는다. */
const TOKEN = 'ExponentPushToken[AbCdEfGhIjKlMnOpQrStUv]';

/**
 * `QrCode.tsx` 가 그리는 것과 **같은 규칙으로** 픽셀을 만든다.
 *
 *   · 한 칸을 cell 픽셀 정사각형으로
 *   · 사방에 테두리 여백(QUIET_ZONE) 네 칸
 *   · 검은 칸은 검게, 나머지는 희게
 *
 * 화면 쪽 코드를 그대로 부르지는 못한다(react-native 가 딸려 온다). 대신
 * 화면이 쓰는 값인 `qrMatrix` · `cellSize` · `QUIET_ZONE` 을 그대로 쓴다 —
 * 그 셋이 어긋나면 여기서 걸린다.
 */
function raster(text: string, boxPx = 230) {
  const m = qrMatrix(text);
  const cell = cellSize(m.size, boxPx);
  const side = (m.size + QUIET_ZONE * 2) * cell;

  // RGBA 네 칸씩. 처음에는 전부 흰색으로 채워 테두리 여백까지 한 번에 만든다.
  const data = new Uint8ClampedArray(side * side * 4).fill(255);

  for (let y = 0; y < m.size; y++) {
    for (let x = 0; x < m.size; x++) {
      if (!m.rows[y][x]) continue;
      const x0 = (x + QUIET_ZONE) * cell;
      const y0 = (y + QUIET_ZONE) * cell;
      for (let dy = 0; dy < cell; dy++) {
        for (let dx = 0; dx < cell; dx++) {
          const i = ((y0 + dy) * side + (x0 + dx)) * 4;
          data[i] = 0;
          data[i + 1] = 0;
          data[i + 2] = 0;
        }
      }
    }
  }

  return { data, side };
}

function decode(text: string, boxPx = 230): string | null {
  const { data, side } = raster(text, boxPx);
  return jsQR(data, side, side)?.data ?? null;
}

describe('아이 QR 을 도로 읽어 본다', () => {
  it('넣은 주소가 한 글자도 안 틀리고 나온다', () => {
    const url = buildChildLinkUrl(TOKEN, '서준');
    expect(decode(url)).toBe(url);
  });

  /*
   * 이름이 길면 담을 글자가 늘어 격자가 커진다. 격자가 커지면 상자 크기가
   * 그대로일 때 칸 하나가 작아지고, 어느 선을 넘으면 못 읽는다. 화면에서
   * 쓰는 크기(230)에서 긴 이름까지 버티는지 본다.
   */
  it('이름이 길어도 읽힌다', () => {
    const url = buildChildLinkUrl(TOKEN, '김서준박지호이하늘');
    expect(decode(url)).toBe(url);
  });

  it('미리보기용 가짜 주소로 만든 QR 도 읽힌다', () => {
    const url = buildChildLinkUrl(previewPushToken('web')!, '서준');
    expect(decode(url)).toBe(url);
  });

  /*
   * 옛 판이 만든 부모 QR 도 읽히는지. 지금은 이 방향을 안 쓰지만, 찍혔을 때
   * "이건 부모 폰 QR 이에요" 라고 말해 주려면 읽기는 해야 한다.
   */
  it('부모 QR 도 읽힌다', () => {
    const url = buildLinkUrl(TOKEN, '엄마 폰');
    expect(decode(url)).toBe(url);
  });

  /*
   * 상자를 줄이면 칸이 작아진다. 아이 폰 화면이 좁을 때를 생각한 것인데,
   * 어디까지 버티는지 알아 두면 나중에 크기를 줄일 때 근거가 된다.
   */
  it('상자를 180까지 줄여도 읽힌다', () => {
    const url = buildChildLinkUrl(TOKEN, '서준');
    expect(decode(url, 180)).toBe(url);
  });

  /*
   * **칸이 정수 픽셀이라야 한다.** 소수로 두면 칸마다 반올림이 달라 줄이
   * 굵었다 얇았다 하고, 그러면 카메라가 못 읽는다. cellSize 가 그것을
   * 지키는지 여기서 함께 못박는다 — 그 규칙이 깨지면 위 시험들도 같이
   * 무너지지만, 무엇이 깨졌는지는 이 줄이 말해 준다.
   */
  it('한 칸은 정수 픽셀이다', () => {
    const m = qrMatrix(buildChildLinkUrl(TOKEN, '서준'));
    const cell = cellSize(m.size, 230);
    expect(Number.isInteger(cell)).toBe(true);
    expect(cell).toBeGreaterThanOrEqual(1);
    // 테두리 여백까지 넣어도 상자를 넘지 않는다.
    expect((m.size + QUIET_ZONE * 2) * cell).toBeLessThanOrEqual(230);
  });
});
