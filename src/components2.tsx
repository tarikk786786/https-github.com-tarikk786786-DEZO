import React, { useState, useEffect, useRef } from 'react';
import { Globe, Target, TrendingUp } from 'lucide-react';

export const RotatingText = () => {
  const phrases = [
    "If We Commit, We Deliver.",
    "Clean Website. Clear Communication.",
    "If You Don't Like the First Design, We Improve It.",
    "Your Website Should Look Professional.",
    "We Build Until It Feels Right.",
    "No Confusing Process. No Hidden Drama.",
    "We Focus on Quality, Speed, and Trust.",
    "If Something Needs Fixing, We Help.",
    "Your Business Deserves a Serious Digital Presence.",
    "We Don't Just Build Pages — We Build Trust."
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % phrases.length);
        setFade(true);
      }, 600);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="text-center py-6">
      <p className={`text-lg md:text-xl font-bold text-main-muted italic smooth-transition ${fade ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <span className="text-[var(--primary)]">❝</span>
        {phrases[index]}
        <span className="text-[var(--primary)]">❞</span>
      </p>
    </div>
  );
};

export const FallbackImage = ({ src, alt, className, fallbackInitials }: any) => {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`${className} bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center`}>
        <span className="text-white font-black text-4xl">{fallbackInitials}</span>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} onError={() => setError(true)} loading="lazy" decoding="async" />;
};

export const HeroVisual = ({ nightMode }: any) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: any) => {
    if (nightMode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; 
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setMouse({ x, y });
  };

  const handleMouseLeave = () => setMouse({ x: 0, y: 0 });

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="relative w-full max-w-[600px] mx-auto" style={{ perspective: '1200px' }}>
      <div className="relative" style={{ transform: `rotateY(${mouse.x * 0.3}deg) rotateX(${mouse.y * 0.3}deg)`, transition: 'transform 0.15s ease-out' }}>
        {/* Main Glass 3D Browser Window */}
        <div className="glass-card rounded-2xl overflow-hidden animate-float" style={{ boxShadow: 'var(--shadow-soft)' }}>
          <div className="flex items-center gap-2 px-4 py-3 bg-black/30 border-b border-white/10">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 text-center text-xs text-main-muted font-mono">dezo.agency</div>
          </div>
          <div className="p-6 md:p-8">
            <div className="space-y-4">
              <div className="h-3 w-3/4 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] opacity-80"></div>
              <div className="h-3 w-1/2 rounded-full bg-white/10"></div>
              <div className="h-3 w-5/6 rounded-full bg-white/5"></div>
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="h-20 rounded-xl bg-gradient-to-br from-[var(--primary)]/20 to-transparent border border-white/5"></div>
                <div className="h-20 rounded-xl bg-gradient-to-br from-[var(--accent)]/20 to-transparent border border-white/5"></div>
                <div className="h-20 rounded-xl bg-gradient-to-br from-[var(--gold)]/20 to-transparent border border-white/5"></div>
              </div>
              <div className="flex gap-3 pt-2">
                <div className="h-10 flex-1 rounded-lg bg-[var(--primary)] opacity-60"></div>
                <div className="h-10 w-24 rounded-lg border border-white/20"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Code Editor Panel */}
        <div className="absolute -left-8 md:-left-16 top-1/4 w-56 md:w-64 glass-card rounded-xl overflow-hidden animate-float-delayed" style={{ transform: `translateZ(40px) rotateY(${mouse.x * 0.15}deg)`, boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)' }}>
          <div className="flex items-center gap-2 px-3 py-2 bg-black/40 border-b border-white/10">
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-400/60"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400/60"></div>
              <div className="w-2 h-2 rounded-full bg-green-400/60"></div>
            </div>
            <span className="text-[10px] text-main-muted font-mono">LandingPage.jsx</span>
          </div>
          <div className="p-3 font-mono text-[10px] leading-relaxed">
            <span className="text-[var(--accent)]">import</span> <span className="text-[var(--primary)]">React</span> <span className="text-[var(--accent)]">from</span> <span className="text-green-400">'react'</span><span className="text-main-muted">;</span><br />
            <span className="text-[var(--accent)]">export default function</span> <span className="text-[var(--gold)]">Hero</span> <span className="text-main-muted">() {'{'}</span><br />
            <span className="text-main-muted/50">&nbsp;&nbsp;// Award-winning Indian Agency</span><br />
            <span className="text-[var(--accent)]">&nbsp;&nbsp;return</span> <span className="text-main-muted">(</span><br />
            <span className="text-main-muted">&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className="</span><span className="text-green-400"> premium-growth </span><span className="text-main-muted">"&gt;</span><br />
            <span className="text-main-light">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10x Your Digital Presence</span><br />
            <span className="text-main-muted">&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</span><br />
            <span className="text-main-muted">&nbsp;&nbsp;);</span><br />
            <span className="text-main-muted">{'}'}</span>
          </div>
        </div>

        {/* Advanced SEO Dashboard */}
        <div className="absolute -right-4 md:-right-12 top-[15%] w-44 md:w-52 glass-card rounded-xl p-4 animate-float" style={{ transform: `translateZ(60px) rotateY(${mouse.x * 0.2}deg)`, animationDelay: '0.5s', boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-bold text-main-muted uppercase tracking-wider">Organic Traffic</span>
            <span className="flex items-center gap-1 text-[10px] text-green-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live
            </span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {[30, 45, 40, 60, 50, 80, 75, 100].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-sm bg-gradient-to-t from-[var(--primary)] to-[var(--accent)] animate-bar-grow" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
                <span className="text-[7px] text-main-muted">{h}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Meta Ads Tracker */}
        <div className="absolute -right-2 md:-right-8 bottom-[10%] w-40 md:w-48 glass-card rounded-xl p-4 animate-float-delayed" style={{ transform: `translateZ(50px) rotateY(${mouse.x * 0.15}deg)`, boxShadow: '0 20px 60px -15px rgba(0,0,0,0.5)' }}>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-[var(--accent)] flex items-center justify-center">
              <Target size={12} className="text-white" />
            </div>
            <span className="text-[10px] font-bold text-main-muted uppercase tracking-wider">Meta Ads ROI</span>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">4.8x</div>
            <div className="text-[9px] text-main-muted mt-1">Average Return on Ad Spend</div>
          </div>
          <div className="mt-2 h-1.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-shimmer"></div>
          </div>
        </div>

      </div>
    </div>
  );
};
