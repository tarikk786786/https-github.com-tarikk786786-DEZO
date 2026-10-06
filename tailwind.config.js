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
          bg: '#F5F3EE',
          'bg-warm': '#EFECE5',
          surface: '#FFFFFF',
          'surface-hover': '#FAF9F6',
          'surface-elevated': '#FFFFFF',
          border: 'rgba(11, 11, 10, 0.10)',
          'border-strong': 'rgba(11, 11, 10, 0.18)',
          primary: '#B08D57',
          'primary-hover': '#9A7A48',
          accent: '#B08D57',
          'accent-soft': 'rgba(176, 141, 87, 0.12)',
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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        'dezo-sm': '0.125rem',
        'dezo-md': '0.25rem',
        'dezo-lg': '0.375rem',
        'dezo-xl': '0.5rem',
        'dezo-pill': '9999px',
      },
      boxShadow: {
        'dezo-card': '0 1px 2px rgba(11, 11, 10, 0.04), 0 8px 24px rgba(11, 11, 10, 0.05)',
        'dezo-soft': '0 16px 40px rgba(11, 11, 10, 0.08)',
      },
      letterSpacing: {
        tightest: '-0.03em',
        widest: '0.14em',
      },
    },
  },
  plugins: [],
};
