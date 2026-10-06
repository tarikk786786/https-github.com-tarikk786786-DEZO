/**
 * DEZO Design System Tokens
 * Human-crafted design standards: editorial clarity, high contrast, restrained palettes.
 */

export const dezoTokens = {
  colors: {
    bg: '#0A0B0E',
    surface: '#111318',
    surfaceHover: '#161920',
    surfaceElevated: '#1C2029',
    border: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.16)',
    primary: '#2563EB',
    primaryHover: '#1D4ED8',
    accent: '#38BDF8',
    success: '#10B981',
    text: {
      primary: '#F8FAFC',
      secondary: '#94A3B8',
      muted: '#64748B',
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
      standard: [0.22, 1, 0.36, 1], // Custom DEZO cubic bezier
      smooth: [0.16, 1, 0.3, 1],
      bounce: [0.34, 1.56, 0.64, 1],
    },
  },
} as const;

export type DezoTokens = typeof dezoTokens;
