import React from 'react';
import { ArrowLeft, Target, ShieldCheck, Zap, Users, Sparkles, CheckCircle2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Reveal } from './components1';
import { ThemeStyles } from './ThemeStyles';

export const AboutUsPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <main className="min-h-screen bg-main-dark text-main-light">
      <ThemeStyles />
      <Helmet>
        <title>About DEZO | Web Development & Digital Marketing Agency India</title>
        <meta name="description" content="Learn about DEZO, a premium web development and digital marketing agency in India. We build websites that attract, convince, and convert visitors into customers." />
        <link rel="canonical" href="https://dezo.in/about" />
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">

        <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-main-muted hover:text-[var(--primary)] smooth-transition mb-12">
          <ArrowLeft size={16} />
          Back to Home
        </a>

        <Reveal>
          <h1 className="clamp-h1 font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">DEZO</span> — Digital Excellence,{' '}
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Zero Ordinary</span>
          </h1>
        </Reveal>

        <Reveal delay={100}>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] rounded-full mb-12"></div>
        </Reveal>

        <Reveal delay={150}>
          <div className="space-y-6 text-lg leading-relaxed text-main-muted mb-16">
            <p className="text-xl font-semibold text-main-light">
              DEZO was created for business owners who are tired of looking average online and losing customers because of weak websites, poor design, slow speed, and digital marketing that does not perform.
            </p>
            <p>
              With 11 years of experience, a strong team of skilled programmers, creative developers, designers, SEO experts, and digital marketing specialists, DEZO is built to deliver websites that do not just look good — they work, attract, convert, and grow businesses.
            </p>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="space-y-6 text-lg leading-relaxed text-main-muted mb-16">
            <p>
              We have worked with businesses across different industries and understand one thing clearly: your website is not just a page on the internet. It is your first impression, your online office, your sales machine, and your 24/7 brand representative.
            </p>
            <p>
              When someone visits your website, they should instantly feel trust, quality, confidence, and a strong reason to choose you instead of your competitors.
            </p>
          </div>
        </Reveal>

        <Reveal delay={250}>
          <div className="space-y-6 text-lg leading-relaxed text-main-muted mb-16">
            <p>
              At DEZO, we build powerful websites and digital marketing systems designed to grab attention, create trust, and turn visitors into real customers.
            </p>
            <p>
              We specialize in premium web development, SEO-ready websites, Meta ads, landing pages, business websites, portfolio websites, branding, lead-generation pages, mobile optimization, fast loading speed, smooth animations, and conversion-focused content.
            </p>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <h2 className="clamp-h2 font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">The DEZO Standard</span>
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-main-muted mb-16">
            <p>
              Every section, button, headline, color, animation, and word is planned with one clear goal: to make your business look stronger, sharper, more professional, and more valuable online.
            </p>
            <p>
              We proudly build and manage hundreds of websites every month, giving us real experience, speed, creativity, and deep understanding of what works in the market. Our team does not depend on random ideas or basic templates. We use tested strategies, modern design standards, clean coding practices, strong SEO structure, responsive layouts, and growth-focused digital systems to make every project feel professional and powerful.
            </p>
          </div>
        </Reveal>

        <Reveal delay={350}>
          <h2 className="clamp-h2 font-black tracking-tight mb-6">Why We Made DEZO</h2>
          <div className="space-y-6 text-lg leading-relaxed text-main-muted mb-16">
            <p>
              We made DEZO because too many businesses are stuck with copied-looking websites, slow pages, weak content, poor mobile design, and marketing that brings no serious results.
            </p>
            <p className="font-semibold text-main-light">
              Your business deserves better than an average online presence.
            </p>
            <p>
              In today's digital world, customers judge your brand before they call you, message you, or visit your store. If your website does not look professional, your competitors will take the attention, the trust, and the customers. DEZO is built to stop that from happening.
            </p>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="clamp-h2 font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Our Promise</span>
            </h2>
            <p className="text-lg leading-relaxed text-main-muted">
              Our promise is simple and serious: we do not create ordinary digital work. We create websites that look premium, feel smooth, load fast, work perfectly on mobile, and guide visitors toward action. We do not just design for beauty — we design for trust, clarity, speed, performance, ranking, leads, and growth. We listen to your business, understand your audience, study your goals, and build a digital presence that connects with people and makes your brand impossible to ignore.
            </p>
          </div>
        </Reveal>

        <Reveal delay={450}>
          <div className="glass-card rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="clamp-h2 font-black tracking-tight mb-6">
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">Our Guarantee</span>
            </h2>
            <p className="text-lg leading-relaxed text-main-muted">
              Our guarantee is bold: your website will look better, feel stronger, and present your business more professionally than before. It will be responsive, SEO-friendly, fast-loading, clean, modern, secure, and ready to represent your brand with confidence. If it does not feel polished, powerful, and worthy of your business, we keep improving it. We do not stop at "okay." We do not accept "average." We refine, upgrade, and perfect until your digital presence feels ready to compete.
            </p>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="space-y-6 text-lg leading-relaxed text-main-muted mb-16">
            <p className="text-xl font-semibold text-main-light">
              DEZO is for businesses that want to grow, stand out, and be remembered. We build websites that do not just sit online — they work, attract, convince, and convert.
            </p>
            <p>
              Backed by 11 years of experience, a strong expert team, and the ability to deliver hundreds of websites every month, we know how to create digital experiences that make brands look serious, trusted, and unstoppable.
            </p>
            <blockquote className="border-l-4 border-[var(--primary)] pl-6 italic text-main-light/80">
              "Your competitors are already fighting for attention. Your customers are already searching online. The question is simple: when they find you, will they trust you instantly or move to someone else?"
            </blockquote>
            <p className="font-semibold text-main-light">
              With DEZO, your brand does not just appear online. It stands out, speaks clearly, builds confidence, and pushes people to take action.
            </p>
          </div>
        </Reveal>

        <Reveal delay={550}>
          <div className="text-center py-12 border-t border-main-light">
            <h3 className="text-2xl font-black mb-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">DEZO — Digital Excellence, Zero Ordinary</h3>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {["11 Years Experience", "Hundreds of Websites/Mo", "Expert Programmers", "Creative Developers", "Powerful Marketing"].map((tag, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted">{tag}</span>
              ))}
            </div>
            <p className="text-main-muted font-bold">
              No weak design &bull;{' '}
              No slow experience &bull;{' '}
              No average presence
            </p>
            <p className="text-main-muted mt-2">
              Only premium websites and digital growth built to make your business look unstoppable.
            </p>
          </div>
        </Reveal>

      </div>
    </main>
  );
};
