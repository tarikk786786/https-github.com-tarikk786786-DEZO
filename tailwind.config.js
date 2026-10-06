export default {
  darkMode: ['class'],
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
          bg: '#0A0B0E',
          surface: '#111318',
          'surface-hover': '#161920',
          'surface-elevated': '#1C2029',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-strong': 'rgba(255, 255, 255, 0.15)',
          primary: '#2563EB',
          'primary-hover': '#1D4ED8',
          accent: '#38BDF8',
          success: '#10B981',
          text: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            muted: '#64748B',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'dezo-sm': '0.5rem',
        'dezo-md': '0.875rem',
        'dezo-lg': '1.25rem',
        'dezo-xl': '2rem',
      },
      boxShadow: {
        'dezo-card': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
        'dezo-glow': '0 0 35px -5px rgba(37, 99, 235, 0.25)',
        'dezo-glow-accent': '0 0 35px -5px rgba(56, 189, 248, 0.25)',
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.15em',
      },
    },
  },
  plugins: [],
};
