/**
 * DEZO Growth Platform — dark premium editorial + tech tokens
 * Source: /cursor/stores/self/docs/growth-platform-architecture.md
 */

export const dezoTokens = {
  colors: {
    bg: '#08090B',
    bgWarm: '#0C0E12',
    surface: '#111318',
    surfaceHover: '#181B22',
    surfaceElevated: '#1A1D26',
    border: 'rgba(245, 245, 242, 0.08)',
    borderStrong: 'rgba(245, 245, 242, 0.16)',
    primary: '#B7FF3C',
    primaryHover: '#A3E635',
    accent: '#B7FF3C',
    accentSoft: 'rgba(183, 255, 60, 0.12)',
    secondary: '#6C63FF',
    ink: '#F5F5F2',
    success: '#B7FF3C',
    highlight: '#B7FF3C',
    text: {
      primary: '#F5F5F2',
      secondary: '#9095A1',
      muted: '#6B7280',
      inverse: '#08090B',
    },
  },
  typography: {
    fontSans: 'var(--font-sans)',
    fontDisplay: 'var(--font-display)',
    fontMono: 'var(--font-mono)',
  },
  motion: {
    duration: {
      fast: 0.15,
      normal: 0.25,
      slow: 0.5,
      cinematic: 0.9,
    },
    ease: {
      standard: [0.22, 1, 0.36, 1],
      smooth: [0.16, 1, 0.3, 1],
      bounce: [0.34, 1.56, 0.64, 1],
    },
  },
} as const;

export type DezoTokens = typeof dezoTokens;
