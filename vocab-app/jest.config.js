/**
 * 순수 로직(SRS 스케줄러, 세션 구성, 리포트, 데이터 무결성)만 테스트한다.
 * React Native 화면은 기기가 있어야 의미가 있어서 여기서 다루지 않는다.
 */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx', esModuleInterop: true } }],
  },
};
