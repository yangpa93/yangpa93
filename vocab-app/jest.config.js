/**
 * 순수 로직(SRS 스케줄러, 세션 구성, 리포트, 데이터 무결성)만 테스트한다.
 * React Native 화면은 기기가 있어야 의미가 있어서 여기서 다루지 않는다.
 *
 * ── 시험 파일을 roots 로 찾는 까닭 ─────────────────────────────
 *
 * 예전에는 testMatch 에 `<rootDir>` 로 시작하는 절대 glob 을 적었는데,
 * 워크트리(`.claude/worktrees/…`) 안에서는 **시험을 하나도 못 찾았다.**
 * `<rootDir>` 은 윈도에서 역슬래시 경로로 바뀌고, glob 은 역슬래시를
 * 이스케이프 기호로 읽는다. 경로에 그렇게 먹히는 마디가 하나라도 있으면
 * 패턴이 통째로 어긋난다. 본 저장소 경로는 마침 안 걸려서 멀쩡했다.
 *
 * 그렇다고 앞을 별표로 열어 둔 상대 glob 으로 바꾸면, 이번엔 본 저장소가
 * 워크트리 셋 안의 시험까지 끌어와 108개를 돌린다.
 *
 * `roots` 는 glob 이 아니라 경로 목록이라 역슬래시를 그대로 쓴다. 훑는 자리도
 * `__tests__` 하나로 좁아져 어느 쪽에서 돌리든 36묶음 그대로다.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx', esModuleInterop: true } }],
  },
};
