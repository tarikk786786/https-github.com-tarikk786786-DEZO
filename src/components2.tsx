import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, TrendingUp, CheckCircle, Zap, Users, BarChart2 } from 'lucide-react';

/* ─── Rotating Headline ─── */
export const RotatingText = () => {
  const phrases = [
    "If We Commit, We Deliver.",
    "Clean Website. Clear Communication.",
    "We Build Until It Feels Right.",
    "No Hidden Costs. No Surprises.",
    "We Focus on Quality, Speed & Trust.",
    "We Don't Build Pages — We Build Brands.",
  ];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex(p => (p + 1) % phrases.length); setVisible(true); }, 420);
    }, 3800);
    return () => clearInterval(id);
  }, [phrases.length]);

  return (
    <div className="min-h-[52px] flex items-center justify-center lg:justify-start">
      <p style={{
        color: 'var(--accent-light)', fontSize: 'clamp(1rem,2.5vw,1.35rem)',
        fontWeight: 700, letterSpacing: '-0.01em',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.38s ease, transform 0.38s cubic-bezier(0.22,1,0.36,1)',
      }}>
        {phrases[index]}
      </p>
    </div>
  );
};

/* ─── Fallback Image ─── */
export const FallbackImage = ({ src, alt, className, fallbackInitials }: any) => {
  const [err, setErr] = useState(false);
  if (err) return (
    <div className={`${className} bg-main-dark border border-main-light flex items-center justify-center text-main-light font-black tracking-widest`}>
      {fallbackInitials}
    </div>
  );
  return <img loading="lazy" decoding="async" src={src} alt={alt} className={className} onError={() => setErr(true)} />;
};

/* ─── Spring hook ─── */
function useSpring(target: { x: number; y: number }, stiffness = 0.08) {
  const val = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);
  const [out, setOut] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const tick = () => {
      val.current.x += (target.x - val.current.x) * stiffness;
      val.current.y += (target.y - val.current.y) * stiffness;
      setOut({ x: +val.current.x.toFixed(3), y: +val.current.y.toFixed(3) });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target.x, target.y, stiffness]);

  return out;
}

/* ─── Particle Canvas ─── */
const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let w = canvas.offsetWidth, h = canvas.offsetHeight;
    canvas.width = w; canvas.height = h;

    const resize = () => {
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w; canvas.height = h;
    };
    window.addEventListener('resize', resize);

    const dots = Array.from({ length: 28 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      a: Math.random() * 0.4 + 0.1,
    }));

    let frame: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${d.a})`;
        ctx.fill();
      });
      // Draw lines between close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(59,130,196,${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
};

/* ─── Live Ticker ─── */
const LiveTicker = () => {
  const items = ['Web Dev', 'SEO', 'Meta Ads', 'Google Ads', 'Ecommerce', 'Landing Pages', 'Branding', 'UI/UX'];
  return (
    <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '8px' }}>
      <div className="animate-ticker" style={{ display: 'inline-flex', gap: '32px' }}>
        {[...items, ...items].map((t, i) => (
          <span key={i} style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
            {t} <span style={{ color: 'var(--primary)', opacity: 0.5 }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── Animated Bar Chart ─── */
const BarChart = () => {
  const bars = [28, 44, 38, 62, 48, 76, 72, 100];
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '52px' }}>
      {bars.map((h, i) => (
        <div key={i} style={{ flex: 1, height: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <div style={{
            width: '100%', borderRadius: '3px 3px 0 0',
            background: 'linear-gradient(to top, var(--primary), var(--primary-light))',
            height: mounted ? `${h}%` : '0%',
            opacity: 0.65 + i * 0.04,
            transition: `height 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
          }} />
        </div>
      ))}
    </div>
  );
};

/* ─── Main HeroVisual ─── */
export const HeroVisual = ({ nightMode }: { nightMode?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rawMouse, setRawMouse] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handlePointer = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = (clientX - rect.left) / rect.width - 0.5;
    const ny = (clientY - rect.top) / rect.height - 0.5;
    setRawMouse({ x: nx * 18, y: -ny * 14 });
  }, []);

  const handleMouse = useCallback((e: React.MouseEvent) => handlePointer(e.clientX, e.clientY), [handlePointer]);
  const handleTouch = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) handlePointer(t.clientX, t.clientY);
  }, [handlePointer]);
  const handleLeave = useCallback(() => setRawMouse({ x: 0, y: 0 }), []);

  const spring = useSpring(rawMouse, 0.07);
  const skip3d = nightMode || isMobile;

  const cardStyle = (z: number, extraX = 0, extraY = 0): React.CSSProperties => ({
    transform: skip3d
      ? 'none'
      : `translateZ(${z}px) translateX(${-spring.x * z * 0.003 + extraX}px) translateY(${-spring.y * z * 0.003 + extraY}px)`,
    transition: 'transform 60ms linear',
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouch}
      onTouchEnd={handleLeave}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1400px', perspectiveOrigin: '50% 50%' }}
    >
      {/* Particle layer */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: '2rem', overflow: 'hidden', pointerEvents: 'none' }}>
        <ParticleCanvas />
      </div>

      {/* 3D scene wrapper */}
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        transformStyle: 'preserve-3d',
        transform: skip3d ? 'none' : `rotateY(${spring.x}deg) rotateX(${spring.y}deg)`,
        transition: 'transform 60ms linear',
      }}>

        {/* ── Main Browser Window ── */}
        <div className="glass-card animate-float" style={{
          position: 'absolute', right: 0, top: '2%',
          width: '96%', height: '68%',
          borderRadius: '1.6rem', overflow: 'hidden',
          ...cardStyle(10),
        }}>
          {/* Browser bar */}
          <div style={{ height: '38px', background: 'var(--bg-darker)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 14px', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,95,87,0.8)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(255,189,46,0.8)' }} />
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'rgba(39,201,63,0.8)' }} />
            </div>
            <div style={{ margin: '0 auto', width: '44%', height: '22px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(74,222,128,0.8)' }} />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.06em', fontWeight: 600 }}>dezo.agency</span>
            </div>
          </div>

          {/* Page skeleton */}
          <div style={{ padding: '18px', height: 'calc(100% - 38px)', background: 'var(--bg-darker)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: '200px', height: '200px', background: 'var(--primary)', opacity: 0.1, filter: 'blur(60px)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '150px', height: '150px', background: 'var(--accent)', opacity: 0.08, filter: 'blur(50px)', borderRadius: '50%', pointerEvents: 'none' }} />

            {/* Nav skeleton */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', alignItems: 'center' }}>
              <div style={{ height: 16, width: 64, background: 'rgba(255,255,255,0.12)', borderRadius: 99 }} />
              {[40, 36, 48].map((w, i) => <div key={i} style={{ height: 14, width: w, background: 'rgba(255,255,255,0.05)', borderRadius: 99 }} />)}
              <div style={{ marginLeft: 'auto', height: 16, width: 52, background: 'var(--primary)', opacity: 0.45, borderRadius: 99 }} />
            </div>

            {/* Hero skeleton */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ height: 8, width: 80, background: 'rgba(245,158,107,0.3)', borderRadius: 99, marginBottom: 10 }} />
              <div style={{ height: 18, width: '72%', background: 'rgba(255,255,255,0.14)', borderRadius: 8, marginBottom: 7 }} />
              <div style={{ height: 16, width: '54%', background: 'rgba(255,255,255,0.08)', borderRadius: 8, marginBottom: 14 }} />
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ height: 26, width: 80, background: 'rgba(59,130,196,0.5)', borderRadius: 99 }} />
                <div style={{ height: 26, width: 66, background: 'rgba(255,255,255,0.08)', borderRadius: 99, border: '1px solid rgba(255,255,255,0.1)' }} />
              </div>
            </div>

            {/* Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
              {[
                { c: 'var(--primary)', l: 'Leads', v: '+247%' },
                { c: 'var(--accent)', l: 'Sales', v: '4.8x ROI' },
                { c: 'var(--gold)', l: 'Traffic', v: '+180%' },
              ].map((m, i) => (
                <div key={i} style={{ borderRadius: 10, padding: '8px', border: '1px solid rgba(255,255,255,0.06)', background: `${m.c}12` }}>
                  <div style={{ fontSize: 8, color: 'rgba(255,255,255,0.35)', marginBottom: 3 }}>{m.l}</div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: m.c }}>{m.v}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '12px' }}><LiveTicker /></div>
          </div>
        </div>

        {/* ── Analytics Card ── */}
        <div className="glass-card animate-float-delayed" style={{
          position: 'absolute', right: '-2%', bottom: '10%',
          width: '50%', borderRadius: '1.2rem', padding: '16px',
          ...cardStyle(90),
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', fontWeight: 700, color: '#fff' }}>
              <Globe size={11} style={{ color: 'var(--accent)' }} />
              Organic Traffic
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', padding: '2px 7px', borderRadius: 99 }}>
              <div className="animate-pulse" style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80' }} />
              <span style={{ fontSize: 7, color: '#4ade80', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Live</span>
            </div>
          </div>
          <BarChart />
          <div style={{ fontSize: 8, color: 'var(--text-muted)', textAlign: 'center', marginTop: 4 }}>Last 8 months</div>
        </div>

        {/* ── Strategy Card ── */}
        <div className="glass-card animate-float" style={{
          position: 'absolute', left: '-6%', top: '26%',
          width: '50%', borderRadius: '1.2rem', padding: '16px',
          ...cardStyle(65),
          animationDelay: '0.6s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '10px' }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'rgba(59,130,196,0.15)', border: '1px solid rgba(59,130,196,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle size={11} style={{ color: 'var(--primary)' }} />
            </div>
            <span style={{ fontSize: 8, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Performance</span>
          </div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.88)', lineHeight: 1.5, fontStyle: 'italic', marginBottom: '10px' }}>
            "Revenue-ready websites that actually convert."
          </p>
          <div style={{ display: 'flex', gap: '5px' }}>
            {['SEO', 'Ads', 'Design'].map(t => (
              <span key={t} style={{ fontSize: 8, fontWeight: 700, padding: '3px 8px', borderRadius: 99, border: '1px solid rgba(59,130,196,0.25)', color: 'var(--primary-light)', background: 'rgba(59,130,196,0.1)' }}>{t}</span>
            ))}
          </div>
        </div>

        {/* ── ROI Badge ── */}
        <div className="animate-float-delayed" style={{
          position: 'absolute', left: '10%', bottom: '0%',
          width: '34%', borderRadius: '1.2rem', padding: '14px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #1D4ED8 100%)',
          overflow: 'hidden',
          ...cardStyle(130),
          animationDelay: '1s',
        }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.08, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '4px' }}>
              <TrendingUp size={11} style={{ color: 'rgba(255,255,255,0.7)' }} />
              <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.65)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Avg ROI</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1 }}>4.8x</div>
            <div style={{ marginTop: '7px', height: 3, width: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '82%', background: '#fff', borderRadius: 99, animation: 'scale-x 2.8s cubic-bezier(0.22,1,0.36,1) forwards' }} />
            </div>
          </div>
        </div>

        {/* ── Notification pop ── */}
        <div className="animate-fade-up" style={{
          position: 'absolute', right: '2%', top: '-4%',
          background: 'rgba(16,22,34,0.92)', backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '10px',
          animationDelay: '1.2s', animationFillMode: 'both',
          ...cardStyle(50),
        }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary),#1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={13} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: '#fff', marginBottom: 1 }}>New Lead Captured</div>
            <div style={{ fontSize: 8, color: 'var(--text-muted)' }}>+1 inquiry via WhatsApp</div>
          </div>
          <div className="animate-pulse" style={{ width: 7, height: 7, borderRadius: '50%', background: '#4ade80', marginLeft: 4 }} />
        </div>

        {/* ── Client count ── */}
        <div className="glass-card" style={{
          position: 'absolute', left: '-2%', bottom: '34%',
          borderRadius: '1rem', padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: '10px',
          ...cardStyle(100),
        }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(245,158,107,0.15)', border: '1px solid rgba(245,158,107,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={12} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 900, color: '#fff', lineHeight: 1 }}>50+</div>
            <div style={{ fontSize: 8, color: 'var(--text-muted)', marginTop: 2, fontWeight: 600 }}>Happy Clients</div>
          </div>
        </div>

      </div>
    </div>
  );
};
