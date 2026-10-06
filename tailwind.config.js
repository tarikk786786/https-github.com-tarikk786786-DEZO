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
          bg: '#F0F3F5',
          'bg-warm': '#E8ECEF',
          surface: '#FFFFFF',
          'surface-hover': '#F7F9FA',
          'surface-elevated': '#FFFFFF',
          border: 'rgba(10, 14, 18, 0.09)',
          'border-strong': 'rgba(10, 14, 18, 0.16)',
          primary: '#0A5C47',
          'primary-hover': '#084A39',
          accent: '#0A5C47',
          'accent-soft': '#D4EDE4',
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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'dezo-sm': '0.25rem',
        'dezo-md': '0.5rem',
        'dezo-lg': '0.75rem',
        'dezo-xl': '1rem',
      },
      boxShadow: {
        'dezo-card': '0 1px 2px rgba(10, 14, 18, 0.04), 0 10px 28px rgba(10, 14, 18, 0.05)',
        'dezo-soft': '0 18px 50px rgba(10, 14, 18, 0.09)',
      },
      letterSpacing: {
        tightest: '-0.045em',
        widest: '0.18em',
      },
    },
  },
  plugins: [],
};
