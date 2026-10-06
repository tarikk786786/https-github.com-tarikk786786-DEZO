/**
 * DEZO Design System Tokens
 * Emerald editorial commerce: cool paper, deep ink, forest emerald.
 * Avoids dark-mode defaults, purple gradients, and cream/terracotta templates.
 */

export const dezoTokens = {
  colors: {
    bg: '#F0F3F5',
    bgWarm: '#E8ECEF',
    surface: '#FFFFFF',
    surfaceHover: '#F7F9FA',
    surfaceElevated: '#FFFFFF',
    border: 'rgba(10, 14, 18, 0.09)',
    borderStrong: 'rgba(10, 14, 18, 0.16)',
    primary: '#0A5C47',
    primaryHover: '#084A39',
    accent: '#0A5C47',
    accentSoft: '#D4EDE4',
    ink: '#0A0E12',
    success: '#0A5C47',
    highlight: '#B8954A',
    text: {
      primary: '#0A0E12',
      secondary: '#3D4756',
      muted: '#6B7585',
      inverse: '#F5F7F9',
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
