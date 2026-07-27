/** 색·간격 토큰. 화면에서 하드코딩된 색을 쓰지 않도록 여기로 모은다. */

export const colors = {
  bg: '#F6F7FB',
  card: '#FFFFFF',
  text: '#14162B',
  subtext: '#6B7089',
  muted: '#9AA0B4',
  border: '#E6E8F0',

  primary: '#4F46E5',
  primarySoft: '#EEF0FF',
  accent: '#F59E0B',
  accentSoft: '#FEF3C7',

  correct: '#16A34A',
  correctSoft: '#DCFCE7',
  wrong: '#DC2626',
  wrongSoft: '#FEE2E2',

  parent: '#0F766E',
  parentSoft: '#CCFBF1',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const font = {
  h1: 28,
  h2: 22,
  h3: 18,
  body: 15,
  small: 13,
  tiny: 11,
} as const;
