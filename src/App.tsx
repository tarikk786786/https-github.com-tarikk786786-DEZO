import React, { lazy, Suspense, useState, useEffect, useMemo } from 'react';
import { 
  Menu, X, Search, 
  ArrowUpRight, ArrowUp, Phone, MessageSquare, MapPin, Sparkles,
  Facebook, Instagram, Linkedin
} from 'lucide-react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { ThemeStyles } from './ThemeStyles';
import { portfolioData, categories } from './data';
import { 
  Reveal, AnimatedCounter
} from './components1';
import { 
  RotatingText, FallbackImage, HeroVisual 
} from './components2';
import {
  ServicesSection, AboutSection, ProcessSection, FaqSection,
  MissionTargetSection, WhyChooseUsSection, BlogSection, IndustriesTestimonialsSections
} from './components3';
import { AnimatedFavicon } from './AnimatedFavicon';
import { SeoHead } from './seo';

const AboutUsPage = lazy(async () => {
  const module = await import('./AboutUsPage');
  return { default: module.AboutUsPage };
});

const NotFoundPage = lazy(async () => {
  const module = await import('./NotFoundPage');
  return { default: module.NotFoundPage };
});

const WebDevPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.WebDevPage };
});
const BbsrWebDevPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.BbsrWebDevPage };
});
const DigitalMarketingPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.DigitalMarketingPage };
});
const SeoServicesPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.SeoServicesPage };
});
const MetaAdsPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.MetaAdsPage };
});
const GoogleAdsPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.GoogleAdsPage };
});
const EcommercePage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.EcommercePage };
});
const LandingPagePage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.LandingPagePage };
});
const BlogPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.BlogPage };
});
const ContactPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.ContactPage };
});
const PortfolioPage = lazy(async () => {
  const module = await import('./pages');
  return { default: module.PortfolioPage };
});

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  city: string;
  service: string;
  budget: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactFormData | 'general', string>>;
type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialFormData: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  businessName: '',
  city: '',
  service: '',
  budget: '',
  message: ''
};

const RouteFallback = () => (
  <div className="min-h-[40vh] flex items-center justify-center">
    <div className="w-14 h-14 rounded-full border-4 border-main-light border-t-[var(--primary)] animate-spin" aria-label="Loading page" />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const timer1 = setTimeout(() => setIsFadingOut(true), 240);
    const timer2 = setTimeout(() => setIsLoading(false), 440);
    
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors: FormErrors = {};
    if (!formData.name) errors.name = "Please fill in your name.";
    if (!formData.phone) errors.phone = "Please fill in your phone number.";
    if (!formData.email) errors.email = "Please fill in your email address.";
    else if (!/\S+@\S+\.\S+/.test(formData.email.trim())) errors.email = "Invalid email format.";
    if (!formData.service) errors.service = "Please select a service.";
    if (!formData.message) errors.message = "Please write a short message.";
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setFormErrors({});
    setFormStatus('submitting');
    setSubmitMessage('');
    
    // Build a rich WhatsApp message from all form fields
    const textMessage =
      `Hello DEZO Team! 👋\n\nI just filled in your contact form. Here are my details:\n\n` +
      `🧑 *Name:* ${formData.name}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `🏢 *Business Name:* ${formData.businessName || 'N/A'}\n` +
      `📍 *City:* ${formData.city || 'N/A'}\n` +
      `🛠️ *Service Required:* ${formData.service}\n` +
      `💰 *Budget:* ${formData.budget || 'Not specified'}\n\n` +
      `💬 *Message:*\n${formData.message}\n\n` +
      `Please get back to me. Thank you!`;

    const whatsappUrl = `https://wa.me/917787063088?text=${encodeURIComponent(textMessage)}`;
    
    // Open WhatsApp in a new tab automatically — 100% client-side, no server needed
    window.open(whatsappUrl, '_blank');

    // Show success immediately
    setFormStatus('success');
    setSubmitMessage('✅ Opening WhatsApp with your details! Just hit Send in WhatsApp to complete your request.');
    setFormData(initialFormData);
  };

  const filteredPortfolio = useMemo(() => portfolioData.filter(item => {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(normalizedSearch) || item.category.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  }), [activeCategory, searchQuery]);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (item === 'About') {
      navigate('/about');
      window.scrollTo({top: 0});
      return; 
    } 
    const sectionId = item.toLowerCase().replace(' ', '-');
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({top: 0});
    } else {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  };

  if (isLoading) {
    return (
      <div className={`fixed inset-0 z-[200] bg-main-dark flex flex-col items-center justify-center smooth-transition ${isFadingOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
        <ThemeStyles />
        <div className="relative flex flex-col items-center">
          <div className="w-32 h-[3px] bg-[var(--border-dark)] mb-8 overflow-hidden rounded-full shadow-[0_0_20px_rgba(200,121,90,0.5)]">
             <div className="w-full h-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] origin-left animate-[scale-x_0.6s_ease-in-out_forwards]"></div>
          </div>
          <span className="text-main-light font-black tracking-[0.4em] text-5xl mb-3">DEZO</span>
          <span className="text-[var(--accent)] font-bold tracking-[0.2em] text-[10px] uppercase">Digital Excellence</span>
        </div>
        <style dangerouslySetInnerHTML={{__html: `@keyframes scale-x { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }`}} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main-light text-main-dark font-sans scroll-smooth">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <ThemeStyles />
      <SeoHead
        title="Dezo | Web Development & Digital Marketing Agency India"
        description="DEZO is a web development and digital marketing agency in India helping businesses with websites, ecommerce, SEO, Meta Ads, and Google Ads."
        keywords="web development company india, digital marketing agency bhubaneswar, seo services india, ecommerce website development, meta ads agency, google ads expert india"
        path={location.pathname}
        schemaData={{
          "@context": "https://schema.org",
          "@type": "DigitalMarketingAgency",
          "name": "DEZO",
          "url": "https://dezo.in/",
          "telephone": "+917787063088",
          "email": "contact@dezo.in",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Bhubaneswar",
            "addressRegion": "Odisha",
            "postalCode": "751024",
            "addressCountry": "IN"
          }
        }}
      />
      <AnimatedFavicon />

      {/* Scroll To Top */}
      <div className="fixed bottom-6 right-6 z-[70]">
        <button
          aria-label="Scroll to Top"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-xl smooth-transition hover:-translate-y-1 active:scale-90 ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          style={{ background: 'linear-gradient(135deg, var(--primary), #2563EB)' }}
        >
          <ArrowUp size={18} />
        </button>
      </div>

      <header className={`fixed top-0 left-0 right-0 z-[60] smooth-transition ${scrolled ? 'bg-[var(--bg-nav)] backdrop-blur-[var(--glass-blur)] py-3.5 border-b border-[rgba(255,255,255,0.06)]' : 'bg-transparent py-5 lg:py-7'}`}>
        <div className="max-w-[90rem] mx-auto px-5 lg:px-10 flex justify-between items-center">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 z-[70] group" aria-label="Dezo Home" onClick={handleLogoClick}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ background: 'linear-gradient(135deg, var(--primary), #2563EB)' }}>D</div>
            <span className={`font-black text-2xl tracking-[0.15em] smooth-transition text-white`}>DEZO</span>
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Primary" className={`hidden lg:flex items-center gap-8 ${!scrolled ? 'bg-white/[0.06] border border-white/[0.1] backdrop-blur-xl px-9 py-3.5 rounded-full' : ''} smooth-transition`}>
            {['Services', 'Latest Work', 'About', 'Process', 'FAQ'].map((item) => (
              <a
                key={item}
                href={item === 'About' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-[11px] font-bold uppercase tracking-[0.14em] smooth-transition text-white/70 hover:text-white relative group/nav"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] rounded-full bg-[var(--accent)] group-hover/nav:w-full smooth-transition" />
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-full smooth-transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(59,130,196,0.4)] active:scale-95"
              style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #2563EB 100%)' }}
            >
              Start a Project
            </a>
          </div>

          {/* Hamburger */}
          <button aria-label="Toggle Mobile Menu" aria-expanded={mobileMenuOpen} className="lg:hidden p-2 z-[70] smooth-transition active:scale-90" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} className="text-white" /> : <Menu size={26} className="text-white" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        <div className={`fixed inset-0 bg-[var(--bg-dark)] z-[65] lg:hidden flex flex-col justify-center px-8 smooth-transition ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col gap-7 text-center">
            {['Services', 'Latest Work', 'About', 'Process', 'FAQ'].map((item, i) => (
              <a
                key={item}
                href={item === 'About' ? '#' : `#${item.toLowerCase().replace(' ', '-')}`}
                onClick={(e) => handleNavClick(e, item)}
                className="text-2xl font-black text-white/80 hover:text-white smooth-transition"
                style={{ transitionDelay: `${i * 40}ms`, transform: mobileMenuOpen ? 'none' : 'translateY(20px)', opacity: mobileMenuOpen ? 1 : 0 }}
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, 'contact')}
              className="mt-4 px-10 py-4 text-white text-base font-bold rounded-full mx-auto inline-block active:scale-95 smooth-transition"
              style={{ background: 'linear-gradient(135deg, var(--primary), #2563EB)' }}
            >
              Start a Project →
            </a>
          </div>
        </div>
      </header>

      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={
          <main id="main-content">
            {/* ── HERO ── */}
          <section id="home" className="relative pt-36 pb-20 lg:pt-52 lg:pb-36 overflow-hidden" style={{ background: 'var(--hero-bg)' }}>
            {/* Background Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="hero-grid" />
              <div className="absolute top-[-15%] right-[-8%] w-[700px] h-[700px] rounded-full opacity-[0.18] animate-float" style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', filter: 'blur(80px)' }} />
              <div className="absolute bottom-[-15%] left-[-8%] w-[550px] h-[550px] rounded-full opacity-[0.12] animate-float-delayed" style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)', filter: 'blur(80px)' }} />
              <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full opacity-[0.06]" style={{ background: 'var(--gold)', filter: 'blur(60px)' }} />
            </div>

            <div className="max-w-[90rem] mx-auto px-5 lg:px-10 relative z-10 text-center lg:text-left">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                {/* Left: Copy */}
                <div className="lg:col-span-6">
                  <Reveal direction="up" delay={0}>
                    <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-sm">
                      <Sparkles size={13} className="text-[var(--accent)]" aria-hidden />
                      <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/70">Web · SEO · Ads · Ecommerce</span>
                    </div>
                  </Reveal>

                  <Reveal direction="up" delay={80}>
                    <h1 className="clamp-h1 text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
                      We Build Websites
                      <br />
                      <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, var(--primary-light) 0%, var(--accent-light) 100%)' }}>
                        That Actually Earn
                      </span>
                    </h1>
                  </Reveal>

                  <Reveal direction="up" delay={180}>
                    <RotatingText />
                  </Reveal>

                  <Reveal direction="up" delay={280}>
                    <p className="text-base md:text-lg text-white/60 mb-9 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                      DEZO helps Indian founders launch fast websites, high-converting funnels, and performance campaigns — turning traffic into paying customers.
                    </p>
                  </Reveal>

                  <Reveal direction="up" delay={380}>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10">
                      <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-full smooth-transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(59,130,196,0.4)] active:scale-95"
                        style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #1D4ED8 100%)' }}
                      >
                        Book Free Growth Call
                        <ArrowUpRight size={16} />
                      </a>
                      <a
                        href="#latest-work"
                        onClick={(e) => { e.preventDefault(); document.getElementById('latest-work')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white/80 rounded-full border border-white/15 hover:bg-white/8 hover:text-white smooth-transition active:scale-95 backdrop-blur-sm"
                      >
                        See Our Work
                      </a>
                    </div>

                    {/* Social proof strip */}
                    <div className="flex items-center justify-center lg:justify-start gap-5">
                      <div className="flex -space-x-2">
                        {['#3B82C4','#F59E6B','#C4A55A','#60A5FA','#FBD38D'].map((c, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-[var(--bg-dark)] flex items-center justify-center text-[8px] font-black text-white" style={{ background: c, zIndex: 5 - i }}>★</div>
                        ))}
                      </div>
                      <p className="text-xs text-white/50 font-medium">Trusted by <strong className="text-white/80">50+ businesses</strong> across India</p>
                    </div>
                  </Reveal>
                </div>

                {/* Right: Visual */}
                <div className="lg:col-span-6 hidden lg:block h-[580px]">
                  <Reveal direction="left" delay={300} className="w-full h-full">
                    <HeroVisual nightMode={false} />
                  </Reveal>
                </div>
              </div>
            </div>
          </section>

          {/* ── STATS BAR ── */}
          <section className="py-12 lg:py-16" style={{ background: 'var(--bg-white)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
            <div className="max-w-[90rem] mx-auto px-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { num: 50, suffix: '+', label: 'Websites Delivered', icon: '🌐' },
                  { num: 11, suffix: '+', label: 'Years Experience', icon: '⚡' },
                  { num: 10, suffix: '+', label: 'Industries Served', icon: '🏆' },
                  { num: 4, suffix: '.8x', label: 'Average ROI', icon: '📈' },
                ].map((stat, i) => (
                  <Reveal key={i} delay={i * 80} direction="up">
                    <div className="group cursor-default">
                      <div className="text-2xl mb-2">{stat.icon}</div>
                      <div className="text-3xl lg:text-4xl font-black mb-1" style={{ color: 'var(--text-light)' }}>
                        <AnimatedCounter end={stat.num} suffix={stat.suffix} nightMode={false} />
                      </div>
                      <div className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{stat.label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

      <ServicesSection nightMode={false} />
      <AboutSection />
      <MissionTargetSection />
      <WhyChooseUsSection />
      <IndustriesTestimonialsSections />
      <ProcessSection />

      {/* PORTFOLIO */}
      <section id="latest-work" className="py-24 lg:py-32 bg-panel-white border-y border-main-light overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <Reveal direction="up">
            <h2 className="clamp-h2 font-black text-main-dark mb-8 text-center tracking-tight">Latest Website Design & Digital Marketing Projects</h2>
          </Reveal>
          
          <Reveal direction="up" delay={200}>
            <div className="mb-8 space-y-5">
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-main-muted" size={18} />
                <input aria-label="Search project" type="text" placeholder="Search project..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-main-light border border-main-light rounded-full py-4 pl-12 pr-6 text-sm font-bold shadow-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary smooth-transition" />
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-2.5 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-5 py-2.5 rounded-full text-[11px] font-bold tracking-widest uppercase border smooth-transition active:scale-95 ${
                      activeCategory === cat ? 'bg-main-dark text-main-light border-main-dark' : 'bg-main-light text-main-muted border-main-light hover:border-main-muted'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredPortfolio.slice(0, 15).map((project: any, i: number) => (
              <Reveal direction="up" delay={i * 50} key={i}>
                <a href={project.url !== "#" ? project.url : '#'} target={project.url !== "#" ? "_blank" : "_self"} rel={project.url !== "#" ? "noopener noreferrer" : ""} className="block group h-full">
                  <article className="bg-main-light rounded-3xl p-6 border border-main-light h-full flex flex-col justify-between hover:border-brand-primary smooth-transition shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(37,99,235,0.15)] relative overflow-hidden group-hover:-translate-y-1 active:translate-y-0 active:scale-[0.98]">
                    <div>
                      <div className="text-[10px] font-bold text-brand-primary uppercase bg-panel-white px-3 py-1 rounded-full border border-main-light inline-block mb-4 shadow-sm">{project.category}</div>
                      <h4 className="text-xl md:text-2xl font-black text-main-dark group-hover:text-brand-primary mb-2 line-clamp-2">{project.title}</h4>
                      <div className="text-xs text-main-muted font-mono opacity-70 mb-4 truncate">{project.url.replace(/^https?:\/\/(www\.)?/, '')}</div>
                    </div>
                    <div className="mt-auto border-t border-main-light pt-4 flex justify-between items-center group-hover:border-brand-primary/20 smooth-transition">
                      <span className="text-xs font-bold uppercase tracking-widest text-main-dark group-hover:text-brand-primary">Visit Website</span>
                      <div className="w-8 h-8 rounded-full bg-panel-white flex items-center justify-center border border-main-light group-hover:border-brand-primary group-hover:bg-brand-primary smooth-transition shadow-sm">
                        <ArrowUpRight size={16} className="text-main-muted group-hover:text-white smooth-transition"/>
                      </div>
                    </div>
                  </article>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal direction="up" delay={200}>
            <div className="text-center mt-12 bg-[var(--primary)]/5 p-8 rounded-3xl border border-[var(--primary)]/20 shadow-sm">
              <p className="text-2xl font-black text-[var(--primary)] mb-2">+ 174 more projects in this category.</p>
              <p className="text-main-muted font-bold text-sm tracking-widest uppercase">Here 5k website project we have</p>
            </div>
          </Reveal>
        </div>
      </section>

      <FaqSection openIndex={openFaqIndex} setOpenIndex={setOpenFaqIndex} />
      <BlogSection />

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-main-dark overflow-hidden relative">
        <div className="absolute inset-0 bg-[var(--primary)] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <Reveal direction="up">
              <div className="text-xs font-bold text-[var(--primary)] tracking-[0.2em] uppercase mb-4">Client Success</div>
              <h2 className="clamp-h2 font-black text-main-light mb-6">Loved by Real Human Businesses</h2>
              <p className="text-lg text-[var(--text-muted)] font-medium leading-relaxed">
                We don't just build websites; we build partnerships. Here's what some of our amazing clients have to say about working with DEZO.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "DEZO completely transformed our digital presence. The new website is not only stunning, but it actually converts visitors into leads. They truly care about the businesses they work with.",
                name: "Anjali M.",
                role: "Founder, local Boutique"
              },
              {
                quote: "Working with the DEZO team felt incredibly natural. They listened to our needs and delivered an ecommerce platform that exceeded our expectations in both speed and design.",
                name: "Vikram S.",
                role: "CEO, Tech Retail"
              },
              {
                quote: "The organic, premium feel of our new website has elevated our brand identity overnight. Their attention to detail and human-centric approach is unparalleled in the industry.",
                name: "Priya R.",
                role: "Marketing Director"
              }
            ].map((testimonial, i) => (
              <Reveal direction="up" delay={i * 100} key={i}>
                <div className="bg-white/5 backdrop-blur-md p-8 lg:p-10 rounded-3xl border border-white/10 hover:border-[var(--primary)]/30 smooth-transition h-full flex flex-col group relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-[var(--primary)] opacity-20 group-hover:opacity-40 smooth-transition group-hover:scale-110">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>
                  </div>
                  <div className="flex mb-6 gap-1 text-[var(--gold)]">
                    {[1,2,3,4,5].map(star => <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                  </div>
                  <p className="text-[var(--text-dark)] text-lg mb-8 leading-relaxed font-medium flex-grow relative z-10">"{testimonial.quote}"</p>
                  <div className="mt-auto flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[var(--primary)]/20 flex items-center justify-center text-[var(--text-dark)] font-bold text-xl border border-[var(--primary)]/30">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-[var(--text-dark)] font-bold">{testimonial.name}</div>
                      <div className="text-sm text-[var(--text-muted)]">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32 bg-main-light overflow-hidden">
        <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
          <Reveal direction="scale">
            <div className="bg-panel-white rounded-[2.5rem] p-6 lg:p-16 border border-main-light shadow-xl relative overflow-hidden flex flex-col lg:flex-row gap-12 lg:gap-16">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="lg:w-1/3 relative z-10 flex flex-col justify-start pt-4">
                  <h2 className="clamp-h2 font-black text-main-dark mb-4 tracking-tight">Start Growing With Dezo Today</h2>
                  <p className="text-main-muted mb-10 font-medium">Ready to take your digital presence to the next level? Reach out to us today.</p>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">CEO</h4>
                      <p className="text-xl font-black text-[var(--primary)]">Rohan Dinkar Sanap</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">Director</h4>
                      <p className="text-xl font-black text-[var(--primary)]">Tarik Islam</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">Contact Info</h4>
                      <div className="flex flex-col gap-2">
                        <a href="tel:+917787063088" className="text-main-dark font-bold hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
                          <Phone size={16} /> +91 77870 63088
                        </a>
                        <a href="mailto:princetarikislam@gmail.com" className="text-main-dark font-bold hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
                          <MessageSquare size={16} /> princetarikislam@gmail.com
                        </a>
                        <a href="mailto:contact@dezo.in" className="text-main-dark font-bold hover:text-[var(--accent)] smooth-transition flex items-center gap-2">
                          <MessageSquare size={16} /> contact@dezo.in
                        </a>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-main-dark uppercase tracking-[0.2em] mb-2 opacity-50">Address</h4>
                      <div className="flex items-start gap-2">
                        <MapPin size={18} className="text-main-dark mt-1 shrink-0" />
                        <p className="text-main-dark font-bold leading-relaxed">
                          Phase 2, Patia<br/>
                          Bhubaneswar, Odisha<br/>
                          751024, India
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
              
              <div className="lg:w-2/3 relative z-10">
                <form className="space-y-5" onSubmit={handleFormSubmit}>
                {formStatus === 'success' && <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-bold border border-green-200" role="status">{submitMessage || "Form submitted successfully! We'll get back to you shortly."}</div>}
                {formErrors.general && <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold border border-red-200">{formErrors.general}</div>}
                
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nameInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark relative">Name <span className="text-red-500">*</span></label>
                    <input id="nameInput" name="name" type="text" value={formData.name} onChange={handleFormChange} required className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Enter your full name" />
                    {formErrors.name && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="emailInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Email <span className="text-red-500">*</span></label>
                    <input id="emailInput" name="email" type="email" value={formData.email} onChange={handleFormChange} required className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Your email address" />
                    {formErrors.email && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.email}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phoneInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Phone <span className="text-red-500">*</span></label>
                    <input id="phoneInput" name="phone" type="tel" inputMode="tel" value={formData.phone} onChange={handleFormChange} required className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Your phone number" />
                    {formErrors.phone && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label htmlFor="businessInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Business Name</label>
                    <input id="businessInput" name="businessName" type="text" value={formData.businessName} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="Optional" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="cityInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">City</label>
                    <input id="cityInput" name="city" type="text" value={formData.city} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" placeholder="e.g. Bhubaneswar" />
                  </div>
                  <div>
                    <label htmlFor="budgetInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Estimated Budget</label>
                    <select id="budgetInput" name="budget" value={formData.budget} onChange={handleFormChange} className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark appearance-none focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
                      <option value="">Select Budget (Optional)</option>
                      <option value="Under ₹50,000">Under ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                      <option value="₹2,00,000+">₹2,00,000+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="serviceInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Service Needed <span className="text-red-500">*</span></label>
                  <select id="serviceInput" name="service" value={formData.service} onChange={handleFormChange} required className="w-full bg-main-light border border-main-light rounded-xl px-5 min-h-[56px] text-sm text-main-dark appearance-none focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}>
                    <option value="">Select Service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="Ecommerce">Ecommerce</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                  </select>
                  {formErrors.service && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.service}</p>}
                </div>

                <div>
                  <label htmlFor="messageInput" className="text-[10px] font-bold uppercase tracking-widest mb-2 block text-main-dark">Message <span className="text-red-500">*</span></label>
                  <textarea id="messageInput" name="message" value={formData.message} onChange={handleFormChange} rows={4} required className="w-full bg-main-light border border-main-light rounded-xl px-5 py-4 text-sm text-main-dark focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 smooth-transition resize-vertical" placeholder="Tell us about your project..."></textarea>
                  {formErrors.message && <p className="text-red-500 text-xs font-bold mt-1.5">{formErrors.message}</p>}
                </div>
                
                <div className="pt-2">
                  <button type="submit" disabled={formStatus === 'submitting'} className="w-full min-h-[60px] rounded-xl bg-gradient-to-r from-brand-primary to-[var(--accent)] text-white font-black text-lg tracking-wide hover:shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:-translate-y-1 active:translate-y-0 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed smooth-transition">{formStatus === 'submitting' ? 'Submitting...' : 'Submit Request'}</button>
                </div>
                {formStatus !== 'submitting' && (
                  <p className="text-xs text-main-muted text-center pt-1">
                    Need urgent help? <a className="underline hover:text-[var(--primary)]" href={`https://wa.me/917787063088?text=${encodeURIComponent(`Hello Tarik, I am ${formData.name || 'a business owner'} and need help with ${formData.service || 'website/digital marketing'}.`)}`} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>.
                  </p>
                )}
              </form>
            </div>
          </div>
          </Reveal>
        </div>
      </section>
      </main>
        } />
        <Route path="/web-development-company-india" element={<WebDevPage />} />
        <Route path="/website-development-bhubaneswar" element={<BbsrWebDevPage />} />
        <Route path="/digital-marketing-agency-india" element={<DigitalMarketingPage />} />
        <Route path="/seo-services-india" element={<SeoServicesPage />} />
        <Route path="/meta-ads-agency-india" element={<MetaAdsPage />} />
        <Route path="/google-ads-agency-india" element={<GoogleAdsPage />} />
        <Route path="/ecommerce-website-development" element={<EcommercePage />} />
        <Route path="/landing-page-design-services" element={<LandingPagePage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutUsPage onBack={() => { navigate('/'); window.scrollTo({top: 0}); }} />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </Suspense>
      
      {/* FOOTER */}
      <footer className="bg-main-dark pt-20 lg:pt-28 pb-10 border-t border-main-dark">
          <div className="max-w-[90rem] mx-auto px-4 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-black text-3xl tracking-[0.2em] text-main-light mb-4 block">DEZO</span>
                    <p className="text-main-muted text-sm font-medium mb-6">Premium web development and digital marketing agency delivering scalable solutions for brands in India.</p>
                    <div className="flex gap-4 text-main-light/70 text-sm font-bold">
                        <a href="#" aria-label="Facebook" className="hover:text-[var(--primary)] smooth-transition cursor-pointer"><Facebook size={20} /></a>
                        <a href="#" aria-label="Instagram" className="hover:text-[var(--primary)] smooth-transition cursor-pointer"><Instagram size={20} /></a>
                        <a href="#" aria-label="LinkedIn" className="hover:text-[var(--primary)] smooth-transition cursor-pointer"><Linkedin size={20} /></a>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Services</h4>
                    <ul className="space-y-3 text-sm text-main-muted font-medium">
                      <li><Link to="/web-development-company-india" className="hover:text-[var(--primary)] smooth-transition">Web Development</Link></li>
                      <li><Link to="/ecommerce-website-development" className="hover:text-[var(--primary)] smooth-transition">Ecommerce Solutions</Link></li>
                      <li><Link to="/landing-page-design-services" className="hover:text-[var(--primary)] smooth-transition">Landing Page Design</Link></li>
                      <li><Link to="/digital-marketing-agency-india" className="hover:text-[var(--primary)] smooth-transition">Digital Marketing</Link></li>
                      <li><Link to="/seo-services-india" className="hover:text-[var(--primary)] smooth-transition">SEO Services</Link></li>
                      <li><Link to="/meta-ads-agency-india" className="hover:text-[var(--primary)] smooth-transition">Meta Ads Management</Link></li>
                      <li><Link to="/google-ads-agency-india" className="hover:text-[var(--primary)] smooth-transition">Google Ads Management</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Company</h4>
                    <ul className="space-y-3 text-sm text-main-muted font-medium">
                      <li><Link to="/about" className="hover:text-[var(--primary)] smooth-transition">About Us</Link></li>
                      <li><Link to="/portfolio" className="hover:text-[var(--primary)] smooth-transition">Portfolio</Link></li>
                      <li><Link to="/blog" className="hover:text-[var(--primary)] smooth-transition">Blog</Link></li>
                      <li><Link to="/contact" className="hover:text-[var(--primary)] smooth-transition">Contact Us</Link></li>
                      <li><Link to="/website-development-bhubaneswar" className="hover:text-[var(--primary)] smooth-transition">Web Dev in Bhubaneswar</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-xs">Contact</h4>
                    <ul className="space-y-3 text-sm text-main-muted font-medium">
                      <li>+91 77870 63088</li>
                      <li>contact@dezo.in</li>
                      <li>Phase 2, Patia<br/>Bhubaneswar, Odisha<br/>751024, India</li>
                    </ul>
                  </div>
              </div>
              <div className="text-center text-xs font-bold text-main-light/40 border-t border-white/10 pt-8">
                  <p>© {new Date().getFullYear()} DEZO Agency. All rights reserved. Premium Digital Solutions in India.</p>
              </div>
          </div>
      </footer>
    </div>
  );
}
