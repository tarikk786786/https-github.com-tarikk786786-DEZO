import React from 'react';
import { 
  Megaphone, LayoutTemplate, Target, CheckCircle2, 
  ArrowRight, Users, ChevronDown, Check, Zap, Star, ShieldCheck
} from 'lucide-react';
import { Reveal } from './components1';
import { FallbackImage } from './components2';

export const ServicesSection = ({ nightMode }: { nightMode?: boolean }) => {
  const services = [
    {
      title: "Web Development Services",
      description: "Custom-coded, lightning-fast, and highly converting websites tailored to your brand's unique needs.",
      icon: <Zap size={24} />,
      features: ["React/Next.js Architecture", "Mobile First Design", "Lighthouse Optimized", "CMS Integration"]
    },
    {
      title: "Ecommerce Website Development",
      description: "Scalable online stores with secure checkout, inventory management, and high conversion rates.",
      icon: <LayoutTemplate size={24} />,
      features: ["Shopify & Custom", "Secure Gateway", "Inventory Sync", "Optimized Cart"]
    },
    {
      title: "Landing Page Design",
      description: "High-converting landing pages built for speed, psychological triggers, and ad campaign success.",
      icon: <Target size={24} />,
      features: ["A/B Testing", "Fast Loading", "Conversion UX", "Ad Alignment"]
    },
    {
      title: "SEO Services",
      description: "Data-driven SEO strategies that put you on the first page of Google and keep you there.",
      icon: <Star size={24} />,
      features: ["Technical SEO", "Content Strategy", "Link Building", "Local SEO"]
    },
    {
      title: "Meta Ads Management",
      description: "High-ROI Facebook and Instagram ad campaigns designed to generate quality leads and sales.",
      icon: <Megaphone size={24} />,
      features: ["Creative Design", "Audience Targeting", "Retargeting Funnels", "Pixel Setup"]
    },
    {
      title: "Google Ads Management",
      description: "Capture high-intent search traffic with optimized Search, Display, and Performance Max campaigns.",
      icon: <Users size={24} />,
      features: ["Search Network", "Shopping Ads", "Keyword Strategy", "CPA Optimization"]
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-main-dark">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black tracking-tight text-main-light mb-4">Premium Website Development That Converts</h2>
            <p className="clamp-p text-main-muted max-w-2xl mx-auto">We deliver end-to-end digital solutions that drive measurable growth.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <Reveal key={idx} delay={idx * 80}>
              <div className="glass-card rounded-2xl p-8 hover:-translate-y-2 smooth-transition group h-full">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white mb-6 group-hover:scale-110 smooth-transition shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-main-light mb-3">{service.title}</h3>
                <p className="text-sm text-main-muted mb-6 leading-relaxed">{service.description}</p>
                <div className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-[var(--primary)] shrink-0" />
                      <span className="text-xs font-bold text-main-muted">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const AboutSection = () => {
  return (
    <section className="py-20 md:py-28 bg-main-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div className="relative">
              <div className="glass-card rounded-2xl overflow-hidden aspect-[4/3]">
                <div className="w-full h-full bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/10 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">100+</div>
                    <div className="text-sm font-bold text-main-muted mt-2">Successful Projects</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div>
              <h2 className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest mb-3">About Dezo</h2>
              <h3 className="clamp-h2 font-black tracking-tight text-main-light mb-6">Ecommerce Websites, Landing Pages & Custom Web Solutions</h3>
              <p className="text-main-muted leading-relaxed mb-8">
                At Dezo, we focus on clean design, fast performance, mobile responsiveness, strong SEO structure and measurable digital growth. Whether a business needs a new website, a high-converting landing page, ecommerce development or paid advertising support, our team builds digital systems that look premium and perform in real business conditions.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Award-Winning Design Team",
                  "Data-Driven Marketing Strategies",
                  "Blazing Fast Web Technologies",
                  "Dedicated Support & Maintenance"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-[var(--primary)] mt-0.5 shrink-0" />
                    <span className="text-sm font-bold text-main-muted">{item}</span>
                  </div>
                ))}
              </div>
              <a href="/about" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white font-bold rounded-full hover:-translate-y-0.5 smooth-transition">
                Meet The Team <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const MissionTargetSection = () => {
  return (
    <section className="py-20 md:py-28 bg-main-dark">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black tracking-tight text-main-light mb-4">SEO, Meta Ads & Google Ads for Business Growth</h2>
            <p className="clamp-p text-main-muted max-w-3xl mx-auto">To deliver exceptional digital value and help brands establish their dominance in the digital space through innovation and creativity.</p>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal delay={100}>
            <div className="glass-card rounded-2xl p-8 md:p-10 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white mb-6 shadow-lg">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-black text-main-light mb-4">Local Business Growth</h3>
              <p className="text-main-muted leading-relaxed">
                We aim to become the leading digital partner for forward-thinking enterprises, delivering web solutions that don't just look good but perform exceptionally. Our target is scaling businesses through data-driven digital architecture and establishing long-term partnerships.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <div className="glass-card rounded-2xl p-8 md:p-10 h-full">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white mb-6 shadow-lg">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-black text-main-light mb-4">Transparent Delivery and Support</h3>
              <p className="text-main-muted leading-relaxed">
                To shatter the barriers of digital entry by providing top-tier, enterprise-grade development and design at accessible price points. We believe every business deserves a premium digital presence, and we are here to make that a reality through innovative engineering.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-main-light">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="clamp-h2 font-black tracking-tight text-main-light mb-4">Why Businesses Choose DEZO</h2>
            <p className="clamp-p text-main-muted max-w-2xl mx-auto">Premium quality, fast performance, transparent process, SEO-ready structure, and reliable support after delivery.</p>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Why We Are Different",
              desc: "We don't use bloatware or slow builders. Every line of code is structured using modern frameworks (React, Next.js). We optimize for Core Web Vitals, ensuring fast performance, resulting in better SEO and conversions.",
              icon: <Zap size={24} />
            },
            {
              title: "Transparent & Efficient",
              desc: "By utilizing streamlined agile processes, strategic development workflows, and an efficient tech-stack architecture, we reduce overhead and deliver premium digital assets that genuinely grow your business.",
              icon: <ShieldCheck size={24} />
            },
            {
              title: "Our Commitment",
              desc: "Our commitment is simple: We deliver pixel-perfect, highly scalable web applications and data-driven marketing campaigns. We prioritize transparent communication and long-term partnerships over quick wins.",
              icon: <Star size={24} />
            }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl p-8 h-full hover:-translate-y-2 smooth-transition">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-lg font-black text-main-light mb-3">{item.title}</h3>
                <p className="text-sm text-main-muted leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <div className="glass-card rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-black text-main-light mb-4">Dedicated Support After Delivery</h3>
            <p className="text-main-muted leading-relaxed">
              We stand by our work. Our relationship doesn't end at launch; we provide continuous technical support, SEO monitoring, and infrastructure optimizations to ensure your long-term success.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export const IndustriesTestimonialsSections = () => {
  return (
    <>
      <section className="py-20 md:py-28 bg-main-dark">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="clamp-h2 font-black tracking-tight text-main-light mb-4">Industries We Serve</h2>
              <p className="clamp-p text-main-muted max-w-2xl mx-auto">We deliver specialized digital strategies tailored to your sector's unique audience.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Real Estate & Builders", "Healthcare & Clinics", "Ecommerce & Retail", "Education & EdTech", "Travel & Tourism", "Manufacturing", "B2B SaaS", "Local Services"].map((industry, i) => (
              <Reveal key={i} delay={i * 50}>
                <div className="glass-card rounded-xl p-6 text-center hover:-translate-y-1 smooth-transition">
                  <span className="text-sm font-bold text-main-muted">{industry}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-main-light">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="clamp-h2 font-black tracking-tight text-main-light mb-4">What Our Clients Say</h2>
              <p className="clamp-p text-main-muted max-w-2xl mx-auto">Don't just take our word for it—see how we've helped businesses grow.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "DEZO completely transformed our digital presence. Our new ecommerce site is lightning fast and the Meta Ads campaign doubled our ROAS in just 3 months.", author: "Amit S.", role: "Retail Founder" },
              { text: "The best web development company in India we have worked with. Their attention to detail, SEO-ready structure, and transparent communication is unmatched.", author: "Priya M.", role: "Marketing Director" },
              { text: "We hired DEZO for Google Ads management and landing page design. The conversion rate skyrocketed from 2% to 8%. Absolutely premium quality work.", author: "Rohan K.", role: "B2B SaaS CEO" }
            ].map((testimonial, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="glass-card rounded-2xl p-8 h-full">
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={16} className="text-[var(--gold)] fill-[var(--gold)]" />
                    ))}
                  </div>
                  <p className="text-main-muted leading-relaxed mb-6 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold text-main-light">{testimonial.author}</p>
                    <p className="text-xs text-main-muted">{testimonial.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-main-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal direction="left">
              <div>
                <h2 className="clamp-h2 font-black tracking-tight text-main-light mb-6">Website Development & Digital Marketing Services in Bhubaneswar, Odisha</h2>
                <p className="text-main-muted leading-relaxed mb-6">As a premier digital marketing agency in Bhubaneswar, DEZO empowers local businesses across Odisha. We specialize in building high-performance websites, improving Google search rankings via SEO, and running targeted Meta Ads and Google Ads campaigns tailored for the Indian market.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full border border-main-light text-xs font-bold text-main-muted">website development company in Bhubaneswar</span>
                  <span className="px-3 py-1 rounded-full border border-main-light text-xs font-bold text-main-muted">SEO services in Bhubaneswar</span>
                  <span className="px-3 py-1 rounded-full border border-main-light text-xs font-bold text-main-muted">website design company in Odisha</span>
                  <span className="px-3 py-1 rounded-full border border-main-light text-xs font-bold text-main-muted">Meta Ads agency in Odisha</span>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div className="glass-card rounded-2xl p-8">
                <h3 className="text-xl font-black text-main-light mb-6">Dominate Your Local Market</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" /><span className="font-bold text-main-muted">Local SEO Optimization</span></div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" /><span className="font-bold text-main-muted">Geotargeted Google Ads</span></div>
                  <div className="flex items-center gap-3"><CheckCircle2 size={18} className="text-[var(--primary)] shrink-0" /><span className="font-bold text-main-muted">Hyper-Local Meta Ads</span></div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export const BlogSection = () => {
  const blogs = [
    { title: "The Future of React in 2026: What You Need to Know", date: "May 4, 2026", category: "Development", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop" },
    { title: "Why Minimalist Design is Converting Better Than Ever", date: "April 28, 2026", category: "Design", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop" },
    { title: "Maximizing ROI with Next-Gen Digital Architecture", date: "April 15, 2026", category: "Business", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <section className="py-20 md:py-28 bg-main-light">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest">Our Journal</span>
              <h2 className="clamp-h2 font-black tracking-tight text-main-light mt-2">Latest Website Design & Digital Marketing Projects</h2>
            </div>
            <a href="/blog" className="mt-4 md:mt-0 text-sm font-bold text-[var(--primary)] hover:underline flex items-center gap-1">
              View All Posts <ArrowRight size={14} />
            </a>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="glass-card rounded-2xl overflow-hidden group hover:-translate-y-2 smooth-transition">
                <div className="aspect-video overflow-hidden">
                  <FallbackImage src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 smooth-transition" fallbackInitials={blog.category[0]} />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs text-main-muted">{blog.date}</span>
                  <h3 className="text-lg font-bold text-main-light mt-2 group-hover:text-[var(--primary)] smooth-transition">
                    {blog.title}
                  </h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const ProcessSection = () => {
  const steps = [
    { num: "01", title: "Discovery", desc: "We deep dive into your business goals, target audience, and competitive landscape." },
    { num: "02", title: "Strategy & Design", desc: "Crafting wireframes and high-fidelity designs focused on user experience and conversion." },
    { num: "03", title: "Development", desc: "Building the solution using cutting-edge, scalable, and secure technologies." },
    { num: "04", title: "Launch & Scale", desc: "Rigorous testing, successful deployment, and ongoing optimization for growth." }
  ];

  return (
    <section id="process" className="py-20 md:py-28 bg-main-dark">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[var(--primary)] uppercase tracking-widest">Our Methodology</span>
            <h2 className="clamp-h2 font-black tracking-tight text-main-light mt-3">Our Web Development & Marketing Process</h2>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div className="glass-card rounded-2xl p-8 text-center hover:-translate-y-2 smooth-transition h-full">
                <div className="text-5xl font-black bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-black text-main-light mb-3">{step.title}</h3>
                <p className="text-sm text-main-muted leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FaqSection = ({ openIndex, setOpenIndex }: { openIndex: number | null, setOpenIndex: (i: number | null) => void }) => {
  const faqs = [
    { q: "What does Dezo do?", a: "Dezo is a web development and digital marketing agency in India. We help businesses create fast, mobile-friendly websites, ecommerce stores, and high-converting landing pages. We also provide SEO, Meta Ads, and Google Ads management." },
    { q: "Does Dezo build ecommerce websites?", a: "Yes, we specialize in building fast and scalable ecommerce websites that convert visitors into buyers, featuring secure payment gateways and conversion-focused UI/UX." },
    { q: "Does Dezo provide SEO services?", a: "Yes, we implement technical SEO, on-page optimization, and content strategies to help businesses grow their organic search rankings consistently." },
    { q: "Can Dezo run Meta Ads and Google Ads?", a: "Absolutely. Our performance marketing team builds data-driven Meta Ads and Google Ads campaigns designed to generate quality leads and maximize your ROI." },
    { q: "Is Dezo suitable for small businesses in India?", a: "Yes, we provide affordable, high-quality digital growth solutions tailored to both local small businesses and large enterprises across India." }
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-main-light">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <h2 className="clamp-h2 font-black tracking-tight text-main-light text-center mb-12">Frequently Asked Questions About Dezo</h2>
        </Reveal>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} delay={idx * 50}>
              <div className="glass-card rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-bold text-main-light pr-4">{faq.q}</span>
                  <ChevronDown size={20} className={`text-main-muted shrink-0 smooth-transition ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden smooth-transition ${openIndex === idx ? 'max-h-40 pb-6 px-6' : 'max-h-0'}`}>
                  <p className="text-sm text-main-muted leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
