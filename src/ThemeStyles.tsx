import React from 'react';

export const ThemeStyles = () => (
  <style>{`
    :root {
      --bg-nav: rgba(10, 10, 22, 0.85);
      --bg-dark: #0A0A16;
      --bg-darker: #030308;
      --bg-light: #12101F;
      --bg-white: #1B182E;
      --text-dark: #F8FAFC;
      --text-light: #FFFFFF;
      --text-muted: #A1A1AA;
      --text-light-muted: #D4D4D8;
      --primary: #8B5CF6;
      --accent: #F472B6;
      --gold: #FBBF24;
      --border-light: #27273F;
      --border-dark: #373752;
      --glow-opacity: 1;
      --anim-speed: 0.8s;
      --anim-dist: 40px;
      --shadow-soft: 0 20px 40px -15px rgba(139, 92, 246, 0.4);
      --glass-blur: blur(20px);
      --hero-bg: radial-gradient(circle at top center, #1E1242 0%, #0A0A16 100%);
    }
  `}</style>
);
