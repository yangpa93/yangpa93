import { fromShortCode, shortCodeError, toShortCode } from '../src/features/pairing';

const TOKEN = 'ExponentPushToken[AbCd1234_-EfGh5678iJ]';

describe('toShortCode', () => {
  it('껍데기를 빼고 안쪽만 보여준다', () => {
    // ExponentPushToken[ ] 은 늘 같으니 아이가 칠 이유가 없다.
    expect(toShortCode(TOKEN)).not.toContain('ExponentPushToken');
  });

  it('넉 자씩 끊어 준다 — 눈이 자리를 잃지 않게', () => {
    const code = toShortCode(TOKEN);
    for (const group of code.split(' ')) {
      expect(group.length).toBeGreaterThan(0);
      expect(group.length).toBeLessThanOrEqual(4);
    }
  });

  it('토큰이 아니면 빈 문자열', () => {
    expect(toShortCode('')).toBe('');
    expect(toShortCode('짧다')).toBe('');
  });
});

describe('fromShortCode', () => {
  it('만든 코드는 원래 토큰으로 되돌아간다', () => {
    expect(fromShortCode(toShortCode(TOKEN))).toBe(TOKEN);
  });

  it('띄어쓰기를 빼고 쳐도 된다', () => {
    const code = toShortCode(TOKEN);
    expect(fromShortCode(code.replace(/ /g, ''))).toBe(TOKEN);
  });

  it('토큰 안의 하이픈은 지우면 안 된다', () => {
    // 푸시 토큰은 base64url 이라 '-' 와 '_' 를 글자로 쓴다. 끊는 자리를
    // 하이픈으로 표시했다가 되돌릴 때 그 글자까지 지워 버린 적이 있다.
    expect(TOKEN).toContain('-');
    expect(fromShortCode(toShortCode(TOKEN))).toBe(TOKEN);
  });

  it('앞뒤 공백을 다듬는다', () => {
    expect(fromShortCode(`  ${toShortCode(TOKEN)}  `)).toBe(TOKEN);
  });

  it('토큰을 통째로 붙여넣어도 받는다', () => {
    // 카톡으로 받은 아이는 그 길을 그대로 쓴다.
    expect(fromShortCode(TOKEN)).toBe(TOKEN);
    expect(fromShortCode(`  ${TOKEN} `)).toBe(TOKEN);
  });

  it('빈 값은 null', () => {
    expect(fromShortCode('')).toBeNull();
    expect(fromShortCode('   ')).toBeNull();
  });
});

describe('한 글자 오타를 잡는다', () => {
  const code = toShortCode(TOKEN);

  it('글자 하나가 바뀌면 안 받는다', () => {
    const body = code.replace(/ /g, '');
    // 첫 글자를 다른 것으로 바꾼다.
    const broken = (body[0] === 'A' ? 'B' : 'A') + body.slice(1);
    expect(fromShortCode(broken)).toBeNull();
  });

  it('두 글자가 자리를 바꿔도 안 받는다', () => {
    // 자리마다 무게를 달리 두는 이유가 이것이다. 그냥 더하기만 하면
    // 자리를 바꾼 오타를 못 잡는다.
    const body = code.replace(/ /g, '');
    const swapped = body[1] + body[0] + body.slice(2);
    if (body[0] !== body[1]) expect(fromShortCode(swapped)).toBeNull();
  });

  it('대소문자를 틀리면 안 받는다', () => {
    // 푸시 토큰은 대소문자를 가린다. 받아 주면 연결이 조용히 실패한다.
    const body = code.replace(/ /g, '');
    expect(fromShortCode(body.toLowerCase())).toBeNull();
  });

  it('한 글자가 빠지면 안 받는다', () => {
    const body = code.replace(/ /g, '');
    expect(fromShortCode(body.slice(0, -2) + body.slice(-1))).toBeNull();
  });
});

describe('shortCodeError', () => {
  it('맞는 코드면 아무 말도 안 한다', () => {
    expect(shortCodeError(toShortCode(TOKEN))).toBe('');
  });

  it('빈 값에는 잔소리하지 않는다 — 아직 안 친 것뿐이다', () => {
    expect(shortCodeError('')).toBe('');
  });

  it('한글이 섞이면 글자를 짚어 준다', () => {
    expect(shortCodeError('가나다라마바사아자차카타파하가나')).toContain('없는 글자');
  });

  it('너무 짧으면 끝까지 치라고 한다', () => {
    expect(shortCodeError('AB12')).toContain('짧아요');
  });

  it('길이는 맞는데 틀리면 대소문자를 짚어 준다', () => {
    const body = toShortCode(TOKEN).replace(/ /g, '');
    expect(shortCodeError(body.toLowerCase())).toContain('대문자와 소문자');
  });
});
