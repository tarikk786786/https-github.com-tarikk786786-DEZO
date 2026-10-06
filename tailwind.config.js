export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './design-system/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dezo: {
          bg: '#F3F5F7',
          'bg-warm': '#EEF1F4',
          surface: '#FFFFFF',
          'surface-hover': '#F8FAFB',
          'surface-elevated': '#FFFFFF',
          border: 'rgba(16, 19, 26, 0.10)',
          'border-strong': 'rgba(16, 19, 26, 0.18)',
          primary: '#0B6B52',
          'primary-hover': '#095C46',
          accent: '#0B6B52',
          'accent-soft': '#D8F0E8',
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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'dezo-sm': '0.375rem',
        'dezo-md': '0.625rem',
        'dezo-lg': '0.875rem',
        'dezo-xl': '1.25rem',
      },
      boxShadow: {
        'dezo-card': '0 1px 2px rgba(16, 19, 26, 0.04), 0 8px 24px rgba(16, 19, 26, 0.06)',
        'dezo-soft': '0 12px 40px rgba(16, 19, 26, 0.08)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
};
