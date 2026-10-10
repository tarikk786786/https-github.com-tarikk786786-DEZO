/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0e1218",
          900: "#171c24",
          700: "#3a4454",
          500: "#5c6778",
          200: "#d5dbe3",
          50: "#f0f2f5",
        },
        pine: {
          700: "#0b5448",
          600: "#0f6b5c",
          100: "#e3f1ee",
        },
      },
      fontFamily: {
        display: ['"Literata"', "Georgia", "serif"],
        body: ['"Figtree"', '"Segoe UI"', "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "monospace"],
      },
      borderRadius: {
        ss: "8px",
      },
      boxShadow: {
        ss: "0 1px 2px rgba(23, 28, 36, 0.06)",
      },
    },
  },
  plugins: [],
};
