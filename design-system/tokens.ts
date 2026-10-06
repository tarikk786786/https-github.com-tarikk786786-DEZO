/**
 * DEZO Design System Tokens
 * Editorial commerce aesthetic: cool paper, deep ink, emerald accent.
 * Avoids dark-mode defaults, purple gradients, and cream/terracotta templates.
 */

export const dezoTokens = {
  colors: {
    bg: '#F3F5F7',
    bgWarm: '#EEF1F4',
    surface: '#FFFFFF',
    surfaceHover: '#F8FAFB',
    surfaceElevated: '#FFFFFF',
    border: 'rgba(16, 19, 26, 0.10)',
    borderStrong: 'rgba(16, 19, 26, 0.18)',
    primary: '#0B6B52',
    primaryHover: '#095C46',
    accent: '#0B6B52',
    accentSoft: '#D8F0E8',
    ink: '#10131A',
    success: '#0B6B52',
    highlight: '#C4A35A',
    text: {
      primary: '#10131A',
      secondary: '#4A5568',
      muted: '#6B7280',
      inverse: '#F8FAFC',
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
      cinematic: 0.8,
    },
    ease: {
      standard: [0.22, 1, 0.36, 1],
      smooth: [0.16, 1, 0.3, 1],
      bounce: [0.34, 1.56, 0.64, 1],
    },
  },
} as const;

export type DezoTokens = typeof dezoTokens;
