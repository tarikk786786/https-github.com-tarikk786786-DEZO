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
          bg: '#08090B',
          'bg-warm': '#0C0E12',
          surface: '#111318',
          'surface-hover': '#181B22',
          'surface-elevated': '#1A1D26',
          border: 'rgba(245, 245, 242, 0.08)',
          'border-strong': 'rgba(245, 245, 242, 0.16)',
          primary: '#B7FF3C',
          'primary-hover': '#A3E635',
          accent: '#B7FF3C',
          'accent-soft': 'rgba(183, 255, 60, 0.12)',
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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'dezo-sm': '0.375rem',
        'dezo-md': '0.625rem',
        'dezo-lg': '1rem',
        'dezo-xl': '1.5rem',
        'dezo-pill': '9999px',
      },
      boxShadow: {
        'dezo-card': '0 0 0 1px rgba(245,245,242,0.06), 0 20px 50px rgba(0,0,0,0.45)',
        'dezo-soft': '0 24px 64px rgba(0,0,0,0.5)',
        'dezo-glow': '0 0 40px rgba(183, 255, 60, 0.15)',
      },
      letterSpacing: {
        tightest: '-0.05em',
        widest: '0.2em',
      },
    },
  },
  plugins: [],
};
