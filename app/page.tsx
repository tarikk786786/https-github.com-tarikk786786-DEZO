import React from 'react';
import Link from 'next/link';
import {
  ArrowUpRight,
  Sparkles,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Code2,
  Layers,
  BarChart3,
  Globe2,
} from 'lucide-react';
import { DezoContainer } from '@/components/dezo/DezoContainer';
import { DezoHeading } from '@/components/dezo/DezoHeading';
import { DezoButton } from '@/components/dezo/DezoButton';
import { DezoSection } from '@/components/dezo/DezoSection';
import { DezoMetric } from '@/components/dezo/DezoMetric';
import { DezoCard } from '@/components/dezo/DezoCard';
import { DezoMarquee } from '@/components/dezo/DezoMarquee';
import { DezoWorkGallery } from '@/components/dezo/DezoWorkGallery';
import { DezoContactForm } from '@/components/dezo/DezoContactForm';
import { DezoReveal } from '@/lib/motion/MotionAdapter';

export default function HomePage() {
  const marqueeItems = [
    'Next.js App Router',
    'Bespoke Ecommerce',
    'Technical SEO Architecture',
    'High-Conversion Funnels',
    'Sub-Second Performance',
    'Meta & Google Ads',
    'Design System Engineering',
    'B2B Growth Engines',
  ];

  return (
    <>
      {/* ── 1. HERO SECTION ── */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36 overflow-hidden">
        {/* Subtle ambient gradient mesh */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-dezo-primary/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-dezo-accent/5 rounded-full blur-[120px] pointer-events-none" />

        <DezoContainer size="wide" className="relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
            {/* Studio Badge */}
            <DezoReveal delay={0.1} direction="up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dezo-surface border border-dezo-border text-dezo-text-primary text-xs font-semibold mb-8">
                <Sparkles size={14} className="text-dezo-accent" />
                <span>Web Development · Ecommerce · SEO · Paid Growth</span>
              </div>
            </DezoReveal>

            {/* Main Editorial Headline */}
            <DezoReveal delay={0.2} direction="up">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-dezo-text-primary mb-6">
                We Build Websites <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-dezo-accent via-blue-400 to-dezo-primary">
                  That Actually Earn
                </span>
              </h1>
            </DezoReveal>

            {/* Value Proposition Subtitle */}
            <DezoReveal delay={0.3} direction="up">
              <p className="text-base sm:text-xl text-dezo-text-secondary leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
                DEZO helps ambitious founders and enterprises engineer ultra-fast websites, high-converting digital storefronts, and performance acquisition funnels that turn traffic into reliable revenue.
              </p>
            </DezoReveal>

            {/* Hero CTAs */}
            <DezoReveal delay={0.4} direction="up">
              <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
                <DezoButton
                  href="/contact"
                  size="lg"
                  magnetic
                  icon={<ArrowUpRight size={18} />}
                >
                  Book Free Growth Call
                </DezoButton>
                <DezoButton
                  href="/work"
                  variant="secondary"
                  size="lg"
                >
                  Explore 100+ Live Projects
                </DezoButton>
              </div>
            </DezoReveal>

            {/* Social Proof Strip */}
            <DezoReveal delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-dezo-text-muted">
                <div className="flex -space-x-2">
                  {['#2563EB', '#38BDF8', '#10B981', '#F59E0B', '#6366F1'].map((color, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-dezo-bg flex items-center justify-center text-[9px] font-bold text-white shadow-sm"
                      style={{ backgroundColor: color }}
                    >
                      ★
                    </div>
                  ))}
                </div>
                <span>
                  Trusted by <strong className="text-dezo-text-primary">50+ businesses</strong> across India and international markets
                </span>
              </div>
            </DezoReveal>
          </div>
        </DezoContainer>
      </section>

      {/* ── 2. LIVE METRICS BAR ── */}
      <DezoSection spacing="compact" borderTop borderBottom className="bg-dezo-surface/50">
        <DezoContainer size="wide">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            <DezoMetric
              value={5000}
              suffix="+"
              label="Completed Projects"
              sublabel="Deployed & Live"
            />
            <DezoMetric
              value={11}
              suffix="+"
              label="Years Experience"
              sublabel="Digital Craftsmanship"
            />
            <DezoMetric
              value={10}
              suffix="+"
              label="Industries Served"
              sublabel="B2B, Retail & D2C"
            />
            <DezoMetric
              value={4.8}
              decimals={1}
              suffix="x"
              label="Average Client ROI"
              sublabel="Measured Performance"
            />
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── 3. MARQUEE STRIP ── */}
      <DezoMarquee items={marqueeItems} speed="normal" className="border-b border-dezo-border" />

      {/* ── 4. WHAT WE DO (CORE SERVICES) ── */}
      <DezoSection id="services" spacing="normal">
        <DezoContainer size="wide">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
            <DezoHeading
              badge="Capabilities"
              as="h2"
              subtitle="We combine clean software engineering with ruthless conversion optimization to deliver measurable commercial outcomes."
            >
              Engineered For Market Dominance
            </DezoHeading>
            <DezoButton href="/services" variant="outline" size="sm">
              All Capabilities
            </DezoButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Service 1 */}
            <DezoCard glow>
              <div className="w-12 h-12 rounded-dezo-md bg-dezo-primary/10 border border-dezo-primary/20 flex items-center justify-center text-dezo-accent mb-6">
                <Code2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-dezo-text-primary mb-3">
                High-Speed Web Development
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                Bespoke Next.js and React architectures built for lightning-quick load times, perfect accessibility, and frictionless user flows.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-dezo-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Sub-second page speeds</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Modular design systems</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Clean, maintainable TypeScript</span>
                </li>
              </ul>
            </DezoCard>

            {/* Service 2 */}
            <DezoCard glow>
              <div className="w-12 h-12 rounded-dezo-md bg-dezo-accent/10 border border-dezo-accent/20 flex items-center justify-center text-dezo-accent mb-6">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-bold text-dezo-text-primary mb-3">
                Ecommerce & D2C Stores
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                Conversion-focused digital retail experiences tailored for high average order value (AOV), seamless checkout, and rapid mobile buying.
              </p>
              <ul className="flex flex-col gap-2 text-xs text-dezo-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Shopify & custom headless stores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>UPI & multi-gateway integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Mobile-first purchase journeys</span>
                </li>
              </ul>
            </DezoCard>

            {/* Service 3 */}
            <DezoCard glow>
              <div className="w-12 h-12 rounded-dezo-md bg-dezo-success/10 border border-dezo-success/20 flex items-center justify-center text-dezo-success mb-6">
                <BarChart3 size={24} />
              </div>
              <h3 className="text-xl font-bold text-dezo-text-primary mb-3">
                SEO & Performance Ads
              </h3>
              <p className="text-sm text-dezo-text-secondary leading-relaxed mb-6">
                Organic search dominance and data-backed Meta and Google advertising campaigns designed to maximize return on ad spend (ROAS).
              </p>
              <ul className="flex flex-col gap-2 text-xs text-dezo-text-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Technical & programmatic SEO</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Laser-targeted paid ad funnels</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-dezo-accent" />
                  <span>Real-time conversion tracking</span>
                </li>
              </ul>
            </DezoCard>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── 5. PORTFOLIO SHOWCASE (REAL WORK) ── */}
      <DezoSection id="work" spacing="normal" borderTop className="bg-dezo-surface/30">
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="Evidence"
              as="h2"
              subtitle="Browse our verified live portfolio across ecommerce, corporate portals, healthcare, real estate, and education."
            >
              100+ Live Client Proofs
            </DezoHeading>
          </div>

          <DezoWorkGallery initialLimit={6} />
        </DezoContainer>
      </DezoSection>

      {/* ── 6. THE DEZO DIFFERENCE / HUMAN RULES ── */}
      <DezoSection spacing="normal" borderTop>
        <DezoContainer size="wide">
          <div className="max-w-3xl mb-16">
            <DezoHeading
              badge="Engineering Philosophy"
              as="h2"
              subtitle="Why ambitious founders choose DEZO over cookie-cutter template agencies and bloated software houses."
            >
              Architected For Longevity
            </DezoHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-black text-dezo-accent font-mono">01</div>
              <h4 className="text-lg font-bold text-dezo-text-primary">
                HTML First, JS When Essential
              </h4>
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                We believe websites must be resilient. If JavaScript is slow or fails, our pages still deliver fast, legible content and work smoothly on any device.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-2xl font-black text-dezo-accent font-mono">02</div>
              <h4 className="text-lg font-bold text-dezo-text-primary">
                Zero AI Neon Fluff
              </h4>
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                No meaningless 3D spinning cubes or eye-straining cyberpunk neon. Every motion, typography choice, and whitespace margin is crafted with purpose.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="text-2xl font-black text-dezo-accent font-mono">03</div>
              <h4 className="text-lg font-bold text-dezo-text-primary">
                Uncompromising Performance
              </h4>
              <p className="text-sm text-dezo-text-secondary leading-relaxed">
                Engineered to pass Google Core Web Vitals with flying colors. Faster sites rank higher, retain users longer, and convert at significantly higher rates.
              </p>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── 7. CLIENT TESTIMONIALS ── */}
      <DezoSection spacing="normal" borderTop className="bg-dezo-surface/40">
        <DezoContainer size="wide">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <DezoHeading
              badge="Endorsements"
              as="h2"
              align="center"
              subtitle="Real feedback from founders and marketing executives who partner with DEZO."
            >
              Trusted by Real Human Businesses
            </DezoHeading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                quote:
                  'DEZO completely transformed our digital presence. The new architecture is not only stunning, but it actually converts visitors into leads. They truly care about the businesses they work with.',
                author: 'Anjali M.',
                role: 'Founder, Retail Boutique',
              },
              {
                quote:
                  'Working with the DEZO team felt smooth and focused. They listened to our constraints and delivered an ecommerce platform that exceeded our expectations in both speed and checkout completion.',
                author: 'Vikram S.',
                role: 'CEO, Consumer Tech Brand',
              },
              {
                quote:
                  'The organic, high-assurance feel of our website elevated our brand identity immediately. Their attention to detail and human-centric approach is rare in this industry.',
                author: 'Priya R.',
                role: 'Director of Growth',
              },
            ].map((testimonial, i) => (
              <DezoCard key={i} interactive={false} className="flex flex-col justify-between">
                <p className="text-sm sm:text-base text-dezo-text-secondary leading-relaxed italic mb-8">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-dezo-border">
                  <div className="w-10 h-10 rounded-full bg-dezo-primary/20 border border-dezo-primary/30 flex items-center justify-center font-bold text-dezo-accent text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-dezo-text-primary">
                      {testimonial.author}
                    </div>
                    <div className="text-xs text-dezo-text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </DezoCard>
            ))}
          </div>
        </DezoContainer>
      </DezoSection>

      {/* ── 8. START A PROJECT (HIGH-ASSURANCE LEAD ENGINE) ── */}
      <DezoSection id="contact" spacing="relaxed" borderTop>
        <DezoContainer size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Contact Context */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <DezoHeading
                  badge="Initiate"
                  as="h2"
                  subtitle="Ready to take your digital presence to the next level? Share your project details and connect directly with our leadership team."
                >
                  Start Growing With DEZO
                </DezoHeading>

                <div className="mt-10 flex flex-col gap-6 text-sm">
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                      Direct Executive Lines
                    </h5>
                    <p className="text-dezo-text-primary font-semibold">
                      Tarik Islam (Director) · Rohan Dinkar Sanap (CEO)
                    </p>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                      Immediate Inquiries
                    </h5>
                    <a
                      href="tel:+919114411026"
                      className="text-dezo-accent hover:underline font-bold"
                    >
                      +91 9114411026
                    </a>
                    <span className="text-dezo-text-muted"> / </span>
                    <a
                      href="mailto:contact@dezo.in"
                      className="text-dezo-accent hover:underline font-bold"
                    >
                      contact@dezo.in
                    </a>
                  </div>

                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-dezo-text-muted mb-1">
                      Studio Headquarters
                    </h5>
                    <p className="text-dezo-text-secondary leading-relaxed">
                      Phase 2, Patia, Bhubaneswar, Odisha 751024, India
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 p-6 rounded-dezo-md bg-dezo-surface border border-dezo-border">
                <p className="text-xs text-dezo-text-secondary leading-relaxed">
                  🔒 <strong>Confidentiality Assured:</strong> All project inquiries and commercial requirements are handled under strict NDA protocols.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-10 rounded-dezo-xl bg-dezo-surface border border-dezo-border shadow-dezo-card">
                <DezoContactForm />
              </div>
            </div>
          </div>
        </DezoContainer>
      </DezoSection>
    </>
  );
}
