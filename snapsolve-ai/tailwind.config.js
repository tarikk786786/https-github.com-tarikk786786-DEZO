/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070b16",
          900: "#0b1224",
          800: "#121a2f",
          700: "#1a2540",
          600: "#243156",
        },
        accent: {
          violet: "#8b5cf6",
          cyan: "#22d3ee",
          mint: "#34d399",
        },
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        body: ['"IBM Plex Sans"', "system-ui", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        glass: "0 8px 32px rgba(7, 11, 22, 0.35)",
        glow: "0 0 24px rgba(34, 211, 238, 0.18)",
      },
      animation: {
        "pulse-soft": "pulse-soft 1.8s ease-in-out infinite",
        "fade-up": "fade-up 0.35s ease-out",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
