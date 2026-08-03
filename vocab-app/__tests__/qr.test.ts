import { cellSize, qrMatrix, QUIET_ZONE } from '../src/features/qr';
import { buildLinkUrl, parseLinkUrl } from '../src/features/pairing';

const TOKEN = 'ExponentPushToken[AbCd1234_-EfGh5678iJ]';

describe('qrMatrix', () => {
  it('정사각 격자를 만든다', () => {
    const m = qrMatrix('hello');
    expect(m.rows).toHaveLength(m.size);
    for (const row of m.rows) expect(row).toHaveLength(m.size);
  });

  it('QR 규격 크기를 지킨다 — 21부터 4칸씩 커진다', () => {
    const m = qrMatrix('hello');
    expect((m.size - 21) % 4).toBe(0);
    expect(m.size).toBeGreaterThanOrEqual(21);
  });

  it('세 모서리에 위치 표시가 있다', () => {
    /*
     * QR 은 왼쪽 위·오른쪽 위·왼쪽 아래에 7×7 표시를 둔다. 카메라가 이걸로
     * 방향과 크기를 잡는다. 이게 없으면 격자가 아니라 그냥 무늬다.
     *
     * 모양은 '검은 테두리 - 흰 테두리 - 검은 3×3 속' 이다. 모서리 한 칸만
     * 봐서는 데이터 칸과 구별되지 않아 7×7 을 통째로 확인한다.
     */
    const m = qrMatrix('hello');

    const finderAt = (oy: number, ox: number) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const edge = y === 0 || y === 6 || x === 0 || x === 6;
          const inner = y >= 2 && y <= 4 && x >= 2 && x <= 4;
          const want = edge || inner;
          if (m.rows[oy + y][ox + x] !== want) return false;
        }
      }
      return true;
    };

    expect(finderAt(0, 0)).toBe(true);
    expect(finderAt(0, m.size - 7)).toBe(true);
    expect(finderAt(m.size - 7, 0)).toBe(true);
  });

  it('내용이 길수록 격자가 커진다', () => {
    const small = qrMatrix('a');
    const big = qrMatrix(buildLinkUrl(TOKEN, '엄마 폰'));
    expect(big.size).toBeGreaterThan(small.size);
  });

  it('연결 링크를 담을 수 있다', () => {
    // 담다가 넘치면 예외가 난다. 실제로 쓸 길이가 들어가는지 확인한다.
    const url = buildLinkUrl(TOKEN, '엄마 폰');
    expect(() => qrMatrix(url)).not.toThrow();
    expect(qrMatrix(url).size).toBeLessThanOrEqual(57);
  });

  it('이름이 길어도 담긴다', () => {
    const url = buildLinkUrl(TOKEN, '엄마아빠할머니할아버지폰입니다');
    expect(() => qrMatrix(url)).not.toThrow();
  });

  it('같은 값이면 같은 격자가 나온다', () => {
    expect(qrMatrix('hello')).toEqual(qrMatrix('hello'));
  });
});

describe('QR 로 만든 링크를 다시 읽는다', () => {
  it('찍은 값에서 토큰과 이름이 나온다', () => {
    // QR 에 담는 것은 딥링크 문자열이다. 카메라가 읽어 온 그 문자열을
    // 그대로 parseIncoming 에 넘기면 연결에 필요한 값이 나와야 한다.
    const url = buildLinkUrl(TOKEN, '엄마 폰');
    const got = parseLinkUrl(url);
    expect(got?.token).toBe(TOKEN);
    expect(got?.label).toBe('엄마 폰');
  });

  it('엉뚱한 QR 은 걸러진다', () => {
    // 아이가 과자 봉지나 버스 정류장 QR 을 찍어 볼 수 있다.
    expect(parseLinkUrl('https://example.com')).toBeNull();
    expect(parseLinkUrl('그냥 글자')).toBeNull();
    expect(parseLinkUrl('')).toBeNull();
  });

  it('토큰이 빠진 우리 링크도 걸러진다', () => {
    expect(parseLinkUrl('gomtangivoca://link?label=엄마')).toBeNull();
  });

  it('이름이 없으면 기본 이름을 준다', () => {
    const got = parseLinkUrl(`gomtangivoca://link?token=${encodeURIComponent(TOKEN)}`);
    expect(got?.label).toBe('부모님 폰');
  });

  it('이름을 바꾸기 전 스킴으로 만든 QR 도 읽힌다', () => {
    /*
     * 앱 이름을 통일하면서 gomtangvoca → gomtangivoca 로 바뀌었다(i 하나).
     * QR 은 종이에 인쇄되기도 하고 카톡 대화에 남기도 해서, 어제 만든 것이
     * 오늘 "우리 것이 아니다"가 되면 부모는 이유도 모른 채 연결에 실패한다.
     */
    const got = parseLinkUrl(`gomtangvoca://link?token=${encodeURIComponent(TOKEN)}&label=엄마`);
    expect(got?.token).toBe(TOKEN);
    expect(got?.label).toBe('엄마');
  });

  it('새로 만드는 QR 은 늘 새 스킴이다', () => {
    // 옛것을 받아 준다고 새로 만드는 것까지 옛 이름으로 두면 영영 안 바뀐다.
    expect(buildLinkUrl(TOKEN, '엄마').startsWith('gomtangivoca://')).toBe(true);
  });
});

describe('cellSize', () => {
  it('여백까지 상자 안에 들어간다', () => {
    const m = qrMatrix('hello');
    const box = 220;
    const cell = cellSize(m.size, box);
    expect((m.size + QUIET_ZONE * 2) * cell).toBeLessThanOrEqual(box);
  });

  it('정수 픽셀이라야 한다', () => {
    // 소수로 두면 칸마다 반올림이 달라져 줄이 굵었다 얇았다 하고,
    // 그러면 카메라가 못 읽는다.
    const cell = cellSize(qrMatrix('hello').size, 217);
    expect(Number.isInteger(cell)).toBe(true);
  });

  it('상자가 아주 작아도 0이 되지 않는다', () => {
    expect(cellSize(57, 10)).toBeGreaterThanOrEqual(1);
  });
});
