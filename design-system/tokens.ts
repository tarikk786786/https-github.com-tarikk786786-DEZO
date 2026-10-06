/**
 * DEZO Design Tokens — professional editorial business
 * Warm paper, charcoal ink, single gold accent. No neon.
 */

export const dezoTokens = {
  colors: {
    bg: '#F5F3EE',
    bgWarm: '#EFECE5',
    surface: '#FFFFFF',
    surfaceHover: '#FAF9F6',
    surfaceElevated: '#FFFFFF',
    border: 'rgba(11, 11, 10, 0.10)',
    borderStrong: 'rgba(11, 11, 10, 0.18)',
    primary: '#B08D57',
    primaryHover: '#9A7A48',
    accent: '#B08D57',
    accentSoft: 'rgba(176, 141, 87, 0.12)',
    secondary: '#161616',
    ink: '#0B0B0A',
    success: '#3D6B4F',
    highlight: '#B08D57',
    text: {
      primary: '#0B0B0A',
      secondary: '#4A4A46',
      muted: '#7A7A74',
      inverse: '#F5F3EE',
    },
  },
  typography: {
    fontSans: 'var(--font-sans)',
    fontDisplay: 'var(--font-display)',
    fontMono: 'var(--font-mono)',
  },
  motion: {
    duration: {
      fast: 0.2,
      normal: 0.3,
      slow: 0.4,
      cinematic: 0.5,
    },
    ease: {
      standard: [0.22, 1, 0.36, 1],
      smooth: [0.16, 1, 0.3, 1],
      bounce: [0.34, 1.56, 0.64, 1],
    },
  },
} as const;

export type DezoTokens = typeof dezoTokens;
