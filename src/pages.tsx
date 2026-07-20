import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ThemeStyles } from './ThemeStyles';
import { Link } from 'react-router-dom';

const PageLayout = ({ title, h1, meta, children, schemaData, canonicalSlug }: any) => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "DigitalMarketingAgency",
    "name": "DEZO",
    "url": "https://dezo.in/",
    "logo": "https://dezo.in/logo.png",
    "description": "DEZO is a web development and digital marketing agency in India building fast websites, ecommerce stores, landing pages, SEO systems, Meta Ads and Google Ads campaigns for business growth.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bhubaneswar",
      "addressRegion": "Odisha",
      "postalCode": "751024",
      "addressCountry": "IN"
    },
    "telephone": "+917787063088",
    "email": "contact@dezo.in",
    "priceRange": "$$"
  };

  return (
    <main className="min-h-screen bg-main-dark text-main-light">
      <ThemeStyles />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={meta} />
        {canonicalSlug && <link rel="canonical" href={`https://dezo.in/${canonicalSlug}`} />}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={meta} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(orgSchema)}
        </script>
        {schemaData && (
          <script type="application/ld+json">
            {JSON.stringify(schemaData)}
          </script>
        )}
      </Helmet>
      <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
        <h1 className="clamp-h1 font-black tracking-tight mb-8 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">{h1}</h1>
        <div className="prose prose-lg prose-invert max-w-none space-y-6 text-main-muted leading-relaxed">
          {children}
        </div>
        <div className="mt-16 pt-8 border-t border-main-light">
          <h3 className="text-lg font-bold text-main-light mb-4">Explore Our Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link to="/web-development-company-india" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Web Development</Link>
            <Link to="/website-development-bhubaneswar" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Web Dev in Bhubaneswar</Link>
            <Link to="/digital-marketing-agency-india" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Digital Marketing</Link>
            <Link to="/seo-services-india" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">SEO Services</Link>
            <Link to="/meta-ads-agency-india" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Meta Ads</Link>
            <Link to="/google-ads-agency-india" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Google Ads</Link>
            <Link to="/ecommerce-website-development" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Ecommerce</Link>
            <Link to="/landing-page-design-services" className="px-4 py-2 rounded-full border border-main-light text-sm font-bold text-main-muted hover:border-[var(--primary)] hover:text-[var(--primary)] smooth-transition">Landing Pages</Link>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl font-black text-main-light mb-3">Ready to Start Your Project?</h3>
          <p className="text-main-muted mb-6">Get a free website audit or consultation for your digital growth strategy.</p>
          <a href="/" onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)} className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold rounded-full hover:-translate-y-1 shadow-[0_10px_20px_rgba(124,58,237,0.4)] smooth-transition active:scale-95">Get Free Website Audit</a>
        </div>
      </div>
    </main>
  );
};

export const WebDevPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Web Development Services",
      "provider": { "@type": "DigitalMarketingAgency", "name": "DEZO" },
      "areaServed": "India",
      "description": "DEZO creates premium, fast-loading, and mobile-friendly websites designed for maximum conversions."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dezo.in/" },
        { "@type": "ListItem", "position": 2, "name": "Web Development Company in India", "item": "https://dezo.in/web-development-company-india" }
      ]
    }
  ];
  return (
    <PageLayout title="Web Development Company in India | DEZO" h1="Web Development Company in India" meta="DEZO is a leading web development company in India creating premium, fast-loading, mobile-friendly websites designed for maximum conversions." schemaData={schema} canonicalSlug="web-development-company-india">
      <h2 className="text-2xl font-bold text-main-light">Custom Business Website Development</h2>
      <p>As a leading web development company in India, DEZO creates premium, fast-loading, and mobile-friendly websites designed for maximum conversions. We focus on clean code, seamless user experience, and strong technical SEO structures to ensure your brand stands out in the competitive digital landscape.</p>
      <h3 className="text-xl font-bold text-main-light">Our Web Development Services</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>React and Next.js custom applications</li>
        <li>Responsive, mobile-first business websites</li>
        <li>High-performance ecommerce platforms</li>
        <li>Conversion-optimized landing pages</li>
        <li>Website redesign and performance improvements</li>
      </ul>
      <p>We don't just build websites; we build scalable digital systems tailored to your specific business requirements, integrated with modern analytics, and optimized for lead generation. Our development process guarantees premium quality, fast performance, transparent process, SEO-ready structure, and reliable support after delivery.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">How long does it take to develop a custom website?</p><p>A standard business website typically takes 2-4 weeks from design to launch, depending on the complexity and features required.</p></div>
          <div><p className="font-bold text-main-light">Are your websites mobile-friendly and SEO optimized?</p><p>Yes, all our websites are built with a mobile-first approach and include technical SEO best practices out of the box to ensure high visibility on Google.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const BbsrWebDevPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Website Development Bhubaneswar",
      "provider": { "@type": "LocalBusiness", "name": "DEZO" },
      "areaServed": "Bhubaneswar, Odisha",
      "description": "DEZO helps businesses in Bhubaneswar, Odisha build fast websites, improve Google visibility, and generate leads."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dezo.in/" },
        { "@type": "ListItem", "position": 2, "name": "Website Development Bhubaneswar", "item": "https://dezo.in/website-development-bhubaneswar" }
      ]
    }
  ];
  return (
    <PageLayout title="Website Development in Bhubaneswar | DEZO" h1="Website Development in Bhubaneswar" meta="DEZO is a premier website development company in Bhubaneswar, Odisha offering web development, SEO, Meta Ads and Google Ads services." schemaData={schema} canonicalSlug="website-development-bhubaneswar">
      <h2 className="text-2xl font-bold text-main-light">Website Development & Digital Marketing Services in Bhubaneswar, Odisha</h2>
      <p>DEZO helps businesses in Bhubaneswar, Odisha and across India build fast websites, improve Google visibility, generate leads through SEO, and run Meta Ads and Google Ads campaigns. Known as a premier website development company in Bhubaneswar, our mission is to empower local businesses with world-class digital assets.</p>
      <h3 className="text-xl font-bold text-main-light">Leading Digital Marketing Agency in Bhubaneswar</h3>
      <p>Our deep understanding of the local market combined with global development standards makes us the ideal digital marketing agency in Bhubaneswar. We utilize cutting-edge technology to ensure that your website design in Odisha exceeds industry benchmarks and drives tangible business results.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">Do you provide local SEO services in Bhubaneswar?</p><p>Yes, our SEO strategies are highly localized. We help businesses rank on the first page of Google for targeted keywords specific to Bhubaneswar and Odisha.</p></div>
          <div><p className="font-bold text-main-light">Can I meet your team in person?</p><p>Absolutely. If you run a business in Bhubaneswar, our team would be happy to schedule an in-person consultation to discuss your digital strategy.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const DigitalMarketingPage = () => {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Digital Marketing Services",
      "provider": { "@type": "DigitalMarketingAgency", "name": "DEZO" },
      "areaServed": "India",
      "description": "DEZO crafts tailored marketing funnels that target your ideal audience and guide them to conversion."
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dezo.in/" },
        { "@type": "ListItem", "position": 2, "name": "Digital Marketing Agency India", "item": "https://dezo.in/digital-marketing-agency-india" }
      ]
    }
  ];
  return (
    <PageLayout title="Digital Marketing Agency in India | DEZO" h1="Digital Marketing Agency in India" meta="DEZO is a results-driven digital marketing agency in India offering SEO, Meta Ads, Google Ads, and comprehensive growth strategies." schemaData={schema} canonicalSlug="digital-marketing-agency-india">
      <h2 className="text-2xl font-bold text-main-light">Comprehensive Digital Marketing Strategies</h2>
      <p>In today's digital era, having a website is not enough. You need consistent, high-quality traffic. As a results-driven digital marketing agency in India, DEZO crafts tailored marketing funnels that target your ideal audience and guide them to conversion.</p>
      <h3 className="text-xl font-bold text-main-light">Our Approach</h3>
      <p>We analyze your business goals, audit your current digital footprint, and implement data-backed marketing campaigns. Our expertise spans across search engine optimization, pay-per-click advertising, social media management, and robust pixel tracking. We provide premium quality, fast performance, transparent process, SEO-ready structure, and reliable support.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">What digital marketing services do you offer?</p><p>We offer comprehensive 360-degree digital marketing services including SEO, Meta Ads management, Google Ads, content marketing, and conversion rate optimization.</p></div>
          <div><p className="font-bold text-main-light">How do you measure a successful campaign?</p><p>We measure success by ROI/ROAS, cost per lead (CPL), and high-intent traffic metrics via advanced tracking with Google Tag Manager and GA4.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const SeoServicesPage = () => {
  return (
    <PageLayout title="SEO Services in India | DEZO" h1="SEO Services in India" meta="DEZO provides data-driven SEO services in India targeting organic visibility and long-term brand authority." canonicalSlug="seo-services-india">
      <h2 className="text-2xl font-bold text-main-light">Data-Driven SEO for Predictable Growth</h2>
      <p>Ranking on the first page of Google is crucial for long-term success. Our specialized SEO services in India are designed to improve your organic visibility, drive targeted traffic, and establish your brand as an authority.</p>
      <h3 className="text-xl font-bold text-main-light">What We Optimize</h3>
      <p>We focus on all pillars of Search Engine Optimization: Technical SEO to ensure crawlability and fast page speeds; On-Page SEO for structured content and intelligent keyword placement; and Off-Page SEO to build high-quality backlinks and domain authority.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">How long does it take to see SEO results?</p><p>SEO is a medium-to-long-term strategy. You can typically expect to see noticeable improvements in rankings and traffic within 3 to 6 months.</p></div>
          <div><p className="font-bold text-main-light">Do you do local SEO for businesses in my city?</p><p>Yes, our local SEO services help you dominate the local pack and map results for users searching near your business location.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const MetaAdsPage = () => {
  return (
    <PageLayout title="Meta Ads Agency in India | DEZO" h1="Meta Ads Agency in India" meta="DEZO designs, launches, and optimizes Facebook and Instagram ad campaigns that deliver measurable ROAS." canonicalSlug="meta-ads-agency-india">
      <h2 className="text-2xl font-bold text-main-light">High-ROI Paid Social Advertising</h2>
      <p>Social media advertising is one of the fastest ways to scale your business. As an expert Meta Ads agency in India, DEZO designs, launches, and optimizes Facebook and Instagram ad campaigns that deliver measurable return on ad spend (ROAS).</p>
      <h3 className="text-xl font-bold text-main-light">Our Campaign Framework</h3>
      <p>From audience segmentation and compelling ad creatives to rigorous A/B testing and pixel tracking setup, our methodology ensures that every dollar you spend is maximized for lead generation and ecommerce sales. Our process guarantees premium quality, transparent reporting, and continuous performance optimization.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">Do you create the ad graphics and videos?</p><p>Yes, our creative team designs high-converting statics, carousels, and video ad creatives optimized specifically for Meta placements.</p></div>
          <div><p className="font-bold text-main-light">What budget is recommended for Meta Ads?</p><p>We recommend a starting ad spend of at least ₹30,000 to ₹50,000 per month so the algorithm has enough data to optimize efficiently.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const GoogleAdsPage = () => {
  return (
    <PageLayout title="Google Ads Agency in India | DEZO" h1="Google Ads Agency in India" meta="DEZO manages highly targeted Google Ads campaigns designed to minimize wasted spend and maximize conversions." canonicalSlug="google-ads-agency-india">
      <h2 className="text-2xl font-bold text-main-light">Capture High-Intent Search Traffic</h2>
      <p>When customers search for your services on Google, you need to be at the top. DEZO manages highly targeted Google Ads campaigns designed to minimize wasted spend and maximize conversions.</p>
      <h3 className="text-xl font-bold text-main-light">PPC Management Expertise</h3>
      <p>We handle keyword research, negative keyword optimization, compelling ad copy, and landing page alignment to ensure high Quality Scores and lower costs per click. Whether it's Search, Shopping, or Performance Max, we build scalable ad systems with transparent process.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">Do you guarantee leads with Google Ads?</p><p>While we don't use weak terms like "ironclad guarantee", we do promise premium quality setups, rigorous optimization, and transparent reporting to maximize your ROAS and lead generation potential.</p></div>
          <div><p className="font-bold text-main-light">Why are my current Google Ads too expensive?</p><p>High costs often come from bad keyword targeting, low Quality Scores, and poor landing page experiences. We audit and fix all of these to lower your Cost Per Acquisition.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const EcommercePage = () => {
  return (
    <PageLayout title="Ecommerce Website Development | DEZO" h1="Ecommerce Website Development" meta="DEZO provides robust ecommerce website development in India, crafting digital storefronts that turn visitors into loyal buyers." canonicalSlug="ecommerce-website-development">
      <h2 className="text-2xl font-bold text-main-light">Build an Online Store That Sells</h2>
      <p>Fast, secure, and user-friendly ecommerce stores are essential for modern retail. DEZO provides robust ecommerce website development in India, crafting digital storefronts that turn visitors into loyal buyers.</p>
      <h3 className="text-xl font-bold text-main-light">Features We Deliver</h3>
      <ul className="list-disc pl-6 space-y-2">
        <li>Lightning-fast product load times and SEO-ready structure</li>
        <li>Secure payment gateway integrations (Razorpay, Stripe)</li>
        <li>Mobile-optimized checkout flows</li>
        <li>Inventory and order management systems</li>
        <li>Advanced analytics tracking setup</li>
      </ul>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">Which platform is best for my ecommerce store?</p><p>Depending on your scale, we use Next.js for custom headless stores or robust platforms like Shopify and WooCommerce based on your specific operational needs and budget.</p></div>
          <div><p className="font-bold text-main-light">Do you help with payment gateway integration?</p><p>Yes, we provide end-to-end setup including integrating Indian and International payment gateways securely.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const LandingPagePage = () => {
  return (
    <PageLayout title="Landing Page Design Services | DEZO" h1="Landing Page Design Services" meta="DEZO designs high-converting landing pages for ad campaigns, product launches, and lead generation, focusing on speed and user psychology.">
      <h2 className="text-2xl font-bold text-main-light">Convert Clicks Into Customers</h2>
      <p>Traffic is useless if it doesn't convert. Our landing page design services focus on user psychology, compelling copywriting, and frictionless UI/UX to ensure your ad campaigns yield the highest possible conversion rates.</p>
      <h3 className="text-xl font-bold text-main-light">Why Our Landing Pages Win</h3>
      <p>We build perfectly structured, blazing-fast landing pages with clear call-to-actions, social proof injection, and a distraction-free experience. Every element is tested and optimized for one goal: acquiring leads and generating sales. We ensure premium quality and fast performance across all devices.</p>
      <div className="mt-8 glass-card rounded-xl p-6">
        <h3 className="text-xl font-bold text-main-light mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4">
          <div><p className="font-bold text-main-light">What makes a high-converting landing page?</p><p>Fast load speeds, clear messaging, compelling headlines, strong social proof (reviews/testimonials), and a frictionless lead capture form or checkout process.</p></div>
          <div><p className="font-bold text-main-light">Do you integrate tracking tools on the landing page?</p><p>Yes, every landing page comes with complete setup of Google Tag Manager, Google Analytics 4, Meta Pixel and any other required tracking systems so you never lose data.</p></div>
        </div>
      </div>
    </PageLayout>
  );
};

export const ContactPage = () => {
  return (
    <PageLayout title="Contact DEZO" h1="Contact DEZO" meta="Contact DEZO for web development and digital marketing services.">
      <div className="glass-card rounded-xl p-8">
        <h2 className="text-2xl font-bold text-main-light mb-4">Let's Discuss Your Digital Growth</h2>
        <p>Whether you need a new website, a high-converting landing page, or a digital marketing strategy, our team is ready to help.</p>
        <div className="mt-4 space-y-2">
          <p className="font-bold">Phone: +91 77870 63088</p>
          <p className="font-bold">Email: contact@dezo.in</p>
          <p className="font-bold">Address: Phase 2, Patia, Bhubaneswar, Odisha 751024</p>
        </div>
      </div>
      <div className="mt-8 glass-card rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-main-light mb-3">Schedule a Free Consultation</h3>
        <p className="mb-6">We'll review your current digital presence and provide an actionable strategy.</p>
        <a href="/" onClick={() => setTimeout(() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'}), 100)} className="inline-block px-8 py-4 bg-[var(--primary)] text-white font-bold rounded-full hover:-translate-y-1 shadow-md smooth-transition">Open Contact Form</a>
      </div>
    </PageLayout>
  );
};

export const PortfolioPage = () => {
  return (
    <PageLayout title="DEZO Portfolio" h1="DEZO Portfolio" meta="View our latest web development and digital marketing projects.">
      <p>We have partnered with 50+ businesses across 10 industries to deliver premium digital solutions. From blazing fast landing pages to robust ecommerce platforms, view our recent projects.</p>
      <div className="mt-6 text-center">
        <a href="/" onClick={() => setTimeout(() => document.getElementById('latest-work')?.scrollIntoView({behavior:'smooth'}), 100)} className="inline-block px-8 py-4 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white font-bold rounded-full shadow-lg hover:-translate-y-1 smooth-transition">View All Projects</a>
      </div>
    </PageLayout>
  );
};

export const BlogPage = () => (
  <PageLayout title="DEZO Blog" h1="DEZO Blog" meta="Read articles on web development, SEO, Meta Ads, Google Ads, and digital marketing strategies.">
    <div className="grid gap-6">
      {[
        "How to Choose the Best Web Development Company in India",
        "Why Every Business Needs an SEO-Friendly Website",
        "Meta Ads vs Google Ads: Which Is Better for Your Business?",
        "Ecommerce Website Development Checklist for Indian Businesses",
        "How Local SEO Helps Businesses in Bhubaneswar Grow"
      ].map((title, i) => (
        <div key={i} className="glass-card rounded-xl p-6">
          <span className="text-xs font-bold text-[var(--primary)] uppercase tracking-wider">Article</span>
          <h3 className="text-lg font-bold text-main-light mt-2">{title}</h3>
          <a href="#" className="text-sm text-[var(--primary)] font-bold mt-3 inline-block hover:underline">Read More →</a>
        </div>
      ))}
    </div>
  </PageLayout>
);
