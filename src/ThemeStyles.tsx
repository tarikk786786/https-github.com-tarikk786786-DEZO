import React from 'react';

export const ThemeStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

    :root {
      /* Premium Dark Palette */
      --bg-nav: rgba(10, 14, 20, 0.92);
      --bg-dark: #0A0E14;
      --bg-darker: #060A0F;
      --bg-light: #111827;
      --bg-white: #1A2232;
      --text-dark: #E8EDF5;
      --text-light: #FFFFFF;
      --text-muted: #6B7A99;
      --text-light-muted: #94A3B8;
      --primary: #3B82C4;
      --primary-light: #60A5FA;
      --accent: #F59E6B;
      --accent-light: #FBD38D;
      --gold: #C4A55A;
      --border-light: rgba(255,255,255,0.08);
      --border-dark: rgba(255,255,255,0.04);
      --shadow-soft: 0 25px 60px -15px rgba(59,130,196,0.25);
      --glass-blur: blur(24px);
      --line-height-body: 1.65;
      --tracking-body: 0.01em;
      --hero-bg: linear-gradient(160deg, #0A0E14 0%, #0F1929 50%, #0A0E14 100%);
    }

    *, *::before, *::after { box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: var(--line-height-body);
      letter-spacing: var(--tracking-body);
      background-color: var(--bg-dark);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      color: var(--text-dark);
    }

    /* ─── KEYFRAMES ─── */
    @keyframes float-y {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-14px); }
    }
    @keyframes float-y-slow {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50%       { transform: translateY(-22px) rotate(1deg); }
    }
    @keyframes shimmer-x {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }
    @keyframes bar-grow {
      0%   { transform: scaleY(0); opacity: 0; }
      100% { transform: scaleY(1); opacity: 1; }
    }
    @keyframes fade-up {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes scale-x {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes orbit {
      from { transform: rotate(0deg) translateX(60px) rotate(0deg); }
      to   { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
    }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0 rgba(59,130,196,0.4); }
      70%  { box-shadow: 0 0 0 18px rgba(59,130,196,0); }
      100% { box-shadow: 0 0 0 0 rgba(59,130,196,0); }
    }
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes blob-morph {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    }
    @keyframes draw-line {
      from { stroke-dashoffset: 400; }
      to   { stroke-dashoffset: 0; }
    }
    @keyframes count-up {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes card-lift {
      from { transform: translateY(0) scale(1); box-shadow: 0 4px 20px rgba(0,0,0,0.2); }
      to   { transform: translateY(-8px) scale(1.01); box-shadow: 0 24px 50px rgba(0,0,0,0.4); }
    }
    @keyframes gradient-shift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes ticker-scroll {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.9; }
    }

    /* ─── ANIMATION CLASSES ─── */
    .animate-float         { animation: float-y 7s ease-in-out infinite; }
    .animate-float-delayed { animation: float-y-slow 9s ease-in-out infinite 1.2s; }
    .animate-shimmer       { background-size: 200% auto; animation: shimmer-x 3s linear infinite; }
    .animate-bar-grow      { transform-origin: bottom; animation: bar-grow 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }
    .animate-fade-up       { animation: fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both; }
    .animate-fade-in       { animation: fade-in 0.5s ease both; }
    .animate-spin-slow     { animation: spin-slow 20s linear infinite; }
    .animate-blob          { animation: blob-morph 8s ease-in-out infinite; }
    .animate-pulse-ring    { animation: pulse-ring 2s cubic-bezier(0.455,0.03,0.515,0.955) infinite; }
    .animate-gradient      { background-size: 200% 200%; animation: gradient-shift 6s ease infinite; }
    .animate-ticker        { animation: ticker-scroll 30s linear infinite; }
    .animate-glow          { animation: glow-pulse 3s ease-in-out infinite; }

    /* ─── UTILITY ─── */
    .bg-main-dark    { background-color: var(--bg-dark); }
    .bg-main-light   { background-color: var(--bg-light); }
    .bg-panel-white  { background-color: var(--bg-white); }
    .text-main-dark  { color: var(--text-dark); }
    .text-main-light { color: var(--text-light); }
    .text-main-muted { color: var(--text-muted); }
    .border-main-light { border-color: var(--border-light); }
    .border-main-dark  { border-color: var(--border-dark); }

    .smooth-transition { transition: all 0.5s cubic-bezier(0.22,1,0.36,1); }

    .clamp-h1 { font-size: clamp(2.6rem, 6vw, 4.8rem); line-height: 1.05; letter-spacing: -0.03em; font-weight: 900; }
    .clamp-h2 { font-size: clamp(2rem, 4vw, 3.6rem); line-height: 1.1; letter-spacing: -0.025em; font-weight: 900; }
    .clamp-p  { font-size: clamp(1rem, 2vw, 1.15rem); }

    /* ─── GLASS CARD ─── */
    .glass-card {
      background: rgba(255,255,255,0.03);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.08);
      box-shadow: 0 30px 60px -15px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
    }

    /* Premium button styles */
    .btn-primary {
      background: linear-gradient(135deg, var(--primary) 0%, #2563EB 100%);
      color: #fff;
      font-weight: 800;
      border-radius: 9999px;
      letter-spacing: 0.01em;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
      border-radius: inherit;
    }
    .btn-secondary {
      border: 1.5px solid rgba(255,255,255,0.18);
      color: #fff;
      border-radius: 9999px;
      font-weight: 700;
      backdrop-filter: blur(8px);
    }

    /* ─── HERO GRID ─── */
    .hero-grid {
      background:
        radial-gradient(ellipse 80% 50% at 20% 10%, rgba(59,130,196,0.12) 0%, transparent 70%),
        radial-gradient(ellipse 60% 60% at 80% 80%, rgba(245,158,107,0.10) 0%, transparent 60%),
        repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 81px),
        repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(255,255,255,0.015) 80px, rgba(255,255,255,0.015) 81px);
      position: absolute;
      inset: -50px;
      animation: float-y-slow 18s ease-in-out infinite;
    }

    /* ─── SERVICE CARD ─── */
    .service-card {
      background: var(--bg-white);
      border: 1px solid var(--border-light);
      border-radius: 1.5rem;
      padding: 2.5rem;
      transition: transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s cubic-bezier(0.22,1,0.36,1), border-color 0.4s;
    }
    .service-card:hover {
      transform: translateY(-8px) scale(1.01);
      box-shadow: 0 30px 60px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,196,0.3);
      border-color: rgba(59,130,196,0.3);
    }

    /* ─── SCROLL BAR ─── */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg-darker); }
    ::-webkit-scrollbar-thumb { background: var(--border-light); border-radius: 99px; }
    ::-webkit-scrollbar-thumb:hover { background: var(--text-muted); }

    /* ─── SELECTION ─── */
    ::selection { background: var(--primary); color: #fff; }

    /* ─── HIDE SCROLLBAR ─── */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

    /* ─── INPUT FOCUS ─── */
    a:focus-visible, button:focus-visible, input:focus-visible,
    textarea:focus-visible, select:focus-visible {
      outline: 2px solid var(--primary-light);
      outline-offset: 3px;
    }

    /* Skip link */
    .skip-link {
      position: fixed; top: 12px; left: 12px; z-index: 200;
      padding: 10px 16px; border-radius: 9999px;
      background: var(--primary); color: #fff; font-weight: 700;
      transform: translateY(-200%); transition: transform 0.2s ease;
    }
    .skip-link:focus { transform: translateY(0); }

    /* ─── REDUCED MOTION ─── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
      }
    }

    /* ─── MOBILE PERF ─── */
    @media (max-width: 768px) {
      :root { --anim-dist: 16px; }
      .glass-card, .backdrop-blur-md { backdrop-filter: none !important; }
      .animate-float, .animate-float-delayed, .animate-shimmer,
      .animate-bar-grow, .animate-spin-slow { animation: none !important; }
      .shadow-2xl, .shadow-xl { box-shadow: none !important; }
      section { content-visibility: auto; contain-intrinsic-size: 1px 800px; }
    }
  `}} />
);
