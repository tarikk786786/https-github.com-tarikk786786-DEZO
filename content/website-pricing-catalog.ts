/**
 * DEZO Centralized Website Service & Pricing Catalog
 * Master data models for 30+ website types, 5 structured packages, custom budget bands, and 10 delivery guarantees.
 * Strictly adheres to PRD rules: all prices framed as "Starting from", zero hidden charges, transparent warranty terms.
 */

export interface WebsiteTypeItem {
  id: string;
  name: string;
  slug: string;
  category:
    | 'business'
    | 'personal'
    | 'landing-pages'
    | 'ecommerce'
    | 'booking'
    | 'education'
    | 'industry'
    | 'content'
    | 'marketplaces'
    | 'custom-apps'
    | 'maintenance';
  categoryLabel: string;
  startingPrice: number;
  startingPriceFormatted: string;
  typicalTimeline: string;
  idealFor: string;
  recommendedPlatforms: string[];
  minimumScope: string;
  includedDeliverables: string[];
  exclusions: string[];
  warrantyDays: number;
  popular?: boolean;
}

export const WEBSITE_PRICING_CATALOG: WebsiteTypeItem[] = [
  // --- A. Business & Corporate Websites ---
  {
    id: 'simple-business-site',
    name: 'Simple Business Website (up to 5 pages)',
    slug: 'simple-business-website',
    category: 'business',
    categoryLabel: 'Business & Corporate',
    startingPrice: 14999,
    startingPriceFormatted: '₹14,999',
    typicalTimeline: '7 to 10 business days',
    idealFor: 'Small businesses, service providers, local shops, and independent professionals',
    recommendedPlatforms: ['Next.js', 'WordPress', 'HTML5/Tailwind'],
    minimumScope: 'Up to 5 custom-designed pages (Home, About, Services, Gallery/Portfolio, Contact with Enquiry Form)',
    includedDeliverables: [
      '5 mobile-responsive pages with modern typography and branding',
      'Contact form with email notifications and direct WhatsApp chat link',
      'Google Maps embed, click-to-call, and social media links',
      'Basic on-page SEO: title tags, meta descriptions, and XML sitemap',
      'Launch deployment to Netlify/Vercel or client cPanel hosting',
    ],
    exclusions: ['Domain and annual hosting fees', 'Commercial copy generation (client provides text)', 'Paid stock photography licenses'],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: 'freelancer-professional-site',
    name: 'Freelancer or Professional Website',
    slug: 'freelancer-professional-website',
    category: 'business',
    categoryLabel: 'Business & Corporate',
    startingPrice: 14999,
    startingPriceFormatted: '₹14,999',
    typicalTimeline: '5 to 8 business days',
    idealFor: 'Consultants, lawyers, accountants, architects, and remote freelancers',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: 'Up to 4 pages: Bio/About, Services/Fees, Case Studies/Testimonials, and Contact/Booking link',
    includedDeliverables: [
      'Editorial personal branding layout with professional bio presentation',
      'Service pricing/packaging cards with inquiry buttons',
      'Client testimonials and project work showcase gallery',
      'Direct WhatsApp and Cal.com / Calendly appointment scheduling integration',
      'Fast-loading mobile-first responsive layout',
    ],
    exclusions: ['Domain registration', 'Paid booking software subscriptions'],
    warrantyDays: 30,
  },
  {
    id: 'corporate-website',
    name: 'Corporate Website (up to 10-12 pages)',
    slug: 'corporate-website',
    category: 'business',
    categoryLabel: 'Business & Corporate',
    startingPrice: 29999,
    startingPriceFormatted: '₹29,999',
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'Mid-sized companies, manufacturing units, industrial firms, and corporate enterprises',
    recommendedPlatforms: ['Next.js', 'Headless CMS', 'WordPress'],
    minimumScope: 'Up to 10-12 custom pages: Company Overview, Leadership, Service Pillars, Careers, Infrastructure, Contact',
    includedDeliverables: [
      'Bespoke corporate UI/UX matching brand guidelines and color tokens',
      'Modular service and sector landing pages with structured hierarchy',
      'Leadership bios, client logo marquee, and corporate profile PDF download gate',
      'Interactive location map, multi-department contact forms, and career listing section',
      'Technical SEO schema: Organization, LocalBusiness, and BreadcrumbList',
    ],
    exclusions: ['Custom video production', 'Copywriting for 10+ pages (can be added as an optional add-on)'],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: 'wordpress-business-site',
    name: 'WordPress Business Website',
    slug: 'wordpress-business-website',
    category: 'business',
    categoryLabel: 'Business & Corporate',
    startingPrice: 19999,
    startingPriceFormatted: '₹19,999',
    typicalTimeline: '10 to 14 business days',
    idealFor: 'Businesses wanting easy visual editing (Elementor/Gutenberg) to update text and blogs independently',
    recommendedPlatforms: ['WordPress', 'Gutenberg Blocks', 'Elementor Pro'],
    minimumScope: '6 to 8 pages with easy drag-and-drop backend admin access',
    includedDeliverables: [
      'Lightweight, high-speed custom WordPress theme build',
      'Visual block editor setup with pre-styled brand sections',
      'Blog/News publishing module with category taxonomy and author bios',
      'Security hardening (Wordfence/Two-Factor) and automated daily backup plugin setup',
      'Admin training documentation and 1-on-1 video walkthrough',
    ],
    exclusions: ['Paid premium theme or plugin renewal licenses (client owns license)'],
    warrantyDays: 30,
  },

  // --- B. Personal & Creative Portfolios ---
  {
    id: 'personal-portfolio',
    name: 'Personal Portfolio Website',
    slug: 'personal-portfolio',
    category: 'personal',
    categoryLabel: 'Personal & Creative',
    startingPrice: 9999,
    startingPriceFormatted: '₹9,999',
    typicalTimeline: '4 to 6 business days',
    idealFor: 'Designers, photographers, software developers, artists, and creators',
    recommendedPlatforms: ['Next.js', 'Tailwind CSS', 'Static HTML'],
    minimumScope: 'Single-page or 3-page interactive portfolio showcase with project modals',
    includedDeliverables: [
      'High-impact hero with bio, personal philosophy, and social proof links',
      'Interactive project grid with image zoom, tags, and external live links',
      'Downloadable resume / CV button and direct contact/WhatsApp action',
      'Sub-second load speed hosted on high-performance CDN (Vercel/Netlify)',
    ],
    exclusions: ['Domain purchase', 'Creating client project assets (mockups provided by client)'],
    warrantyDays: 30,
  },

  // --- C. Landing Pages & Lead-Gen ---
  {
    id: 'basic-landing-page',
    name: 'High-Converting Campaign Landing Page',
    slug: 'campaign-landing-page',
    category: 'landing-pages',
    categoryLabel: 'Landing Pages & CRO',
    startingPrice: 7999,
    startingPriceFormatted: '₹7,999',
    typicalTimeline: '3 to 5 business days',
    idealFor: 'Product launches, Google/Meta Ads campaigns, webinars, single services, and event registrations',
    recommendedPlatforms: ['Next.js', 'Tailwind CSS', 'Unbounce/WordPress'],
    minimumScope: 'Single dedicated long-form landing page engineered for maximum conversion',
    includedDeliverables: [
      'Psychological hierarchy: Hook hero, problem breakdown, benefit stack, social proof, and FAQs',
      'Sticky navigation with high-intent Call to Action (Call / WhatsApp / Form)',
      'Instant lead notification to email and sales team WhatsApp',
      'Integration of Google Tag Manager, Meta Pixel, and Conversion Event tracking',
      'Sub-second mobile loading speed to reduce bounce rates from paid clicks',
    ],
    exclusions: ['Google/Meta ad budget (paid directly to platforms)', 'Third-party SMS/WhatsApp API gateway fees'],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: 'local-service-lead-gen',
    name: 'Local Service & Lead-Generation Website',
    slug: 'local-service-lead-gen',
    category: 'landing-pages',
    categoryLabel: 'Landing Pages & CRO',
    startingPrice: 19999,
    startingPriceFormatted: '₹19,999',
    typicalTimeline: '10 to 12 business days',
    idealFor: 'Plumbers, electricians, interior designers, pest control, car rentals, and home repair services',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: '5 to 7 pages: Localized services, neighborhood coverage zones, price calculator, enquiry form',
    includedDeliverables: [
      'Click-to-call mobile buttons prominent on every screen',
      'Multi-step quotation request form that filters serious buyers from tyre-kickers',
      'Neighborhood service area landing pages optimized for local Google searches',
      'Google Business Profile integration and Google Maps driving direction links',
    ],
    exclusions: ['Paid directory listing fees', 'Google Local Services Ads spend'],
    warrantyDays: 30,
  },

  // --- D. eCommerce & Online Stores ---
  {
    id: 'shopify-starter-store',
    name: 'Shopify Starter D2C Store',
    slug: 'shopify-starter-store',
    category: 'ecommerce',
    categoryLabel: 'eCommerce & Online Stores',
    startingPrice: 29999,
    startingPriceFormatted: '₹29,999',
    typicalTimeline: '10 to 14 business days',
    idealFor: 'New D2C brands, emerging labels, and physical retailers expanding to pan-India shipping',
    recommendedPlatforms: ['Shopify 2.0'],
    minimumScope: 'Up to 20 products setup, 4 collections, custom homepage, policy pages, and payment/shipping sync',
    includedDeliverables: [
      'Custom Shopify 2.0 theme styling aligned with brand visual identity',
      'Setup of up to 20 initial products with variants (size, color) and tags',
      'Indian payment gateway setup: Razorpay, Cashfree, or PhonePe (UPI, Cards, Net Banking)',
      'Cash on Delivery (COD) setup with OTP verification app integration',
      'Logistics synchronization with Shiprocket or Delhivery for automated airway bills',
      'Standard eCommerce policy pages: Shipping, Returns, Privacy, and Terms',
    ],
    exclusions: ['Shopify monthly subscription ($29/mo or ₹1,999/mo)', 'Payment gateway transaction charges (approx. 2%)', 'Product photography'],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: 'woocommerce-online-store',
    name: 'WooCommerce Online Store',
    slug: 'woocommerce-online-store',
    category: 'ecommerce',
    categoryLabel: 'eCommerce & Online Stores',
    startingPrice: 34999,
    startingPriceFormatted: '₹34,999',
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'Businesses wanting complete self-hosted store ownership with zero monthly platform subscriptions',
    recommendedPlatforms: ['WordPress', 'WooCommerce'],
    minimumScope: 'Full eCommerce store setup with up to 30 products, discount coupon system, and customer account dashboard',
    includedDeliverables: [
      'High-speed WooCommerce setup with Redis object cache compatibility',
      'Custom product archive filters (price, category, attributes)',
      'Checkout optimization: 1-page checkout to reduce cart abandonment',
      'Payment gateway setup (Razorpay/PayU) supporting instant UPI',
      'Automated customer order confirmation and invoice PDF generation',
    ],
    exclusions: ['High-speed hosting (Cloudways/VPS recommended, billed separately)', 'Paid commercial plugins'],
    warrantyDays: 30,
  },
  {
    id: 'standard-ecommerce-website',
    name: 'Standard eCommerce Website (Next.js or Shopify)',
    slug: 'standard-ecommerce-website',
    category: 'ecommerce',
    categoryLabel: 'eCommerce & Online Stores',
    startingPrice: 34999,
    startingPriceFormatted: '₹34,999',
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'Fashion, handloom, cosmetics, specialty grocery, and electronics retailers',
    recommendedPlatforms: ['Shopify Plus', 'Next.js Commerce', 'WooCommerce'],
    minimumScope: 'Up to 50 products, category filtering, customer reviews app, wishlist, and abandoned cart flows',
    includedDeliverables: [
      'Bespoke storefront layout with collection banners and curated product carousels',
      'Customer review display integration with photo upload support',
      'Wishlist functionality and quick add-to-cart drawer',
      'Automated abandoned cart email/WhatsApp recovery sequence setup',
      'Full technical SEO: Product structured schema, Open Graph tags, and product sitemap',
    ],
    exclusions: ['Mass catalog data entry exceeding 50 SKUs (quoted per 100 SKUs)', 'Paid third-party apps'],
    warrantyDays: 30,
  },
  {
    id: 'advanced-custom-ecommerce',
    name: 'Advanced Custom eCommerce / Headless Store',
    slug: 'advanced-custom-ecommerce',
    category: 'ecommerce',
    categoryLabel: 'eCommerce & Online Stores',
    startingPrice: 79999,
    startingPriceFormatted: '₹79,999',
    typicalTimeline: '4 to 6 weeks',
    idealFor: 'High-volume brands requiring sub-second edge speeds, custom product configurators, or complex B2B pricing tiers',
    recommendedPlatforms: ['Next.js', 'Shopify Storefront API', 'Supabase', 'Node.js'],
    minimumScope: 'Headless Next.js storefront powered by Shopify or custom database with custom UX workflows',
    includedDeliverables: [
      'Sub-second mobile load time with Next.js Server Components and edge caching',
      'Custom interactive product customizer (e.g., custom engraving, custom size builder)',
      'Multi-currency and international checkout routing',
      'Custom B2B wholesale pricing tiers and GST invoice generation',
      'Deep analytics: Server-side Meta Conversions API (CAPI) and GA4 purchase telemetry',
    ],
    exclusions: ['Third-party enterprise ERP connector licensing'],
    warrantyDays: 60,
  },

  // --- E. Booking & Appointments ---
  {
    id: 'appointment-booking-site',
    name: 'Appointment & Booking Website',
    slug: 'appointment-booking-website',
    category: 'booking',
    categoryLabel: 'Booking, Appointment & Reservations',
    startingPrice: 29999,
    startingPriceFormatted: '₹29,999',
    typicalTimeline: '10 to 14 business days',
    idealFor: 'Doctors, dental clinics, salons, spas, consultants, and diagnostic centers',
    recommendedPlatforms: ['Next.js', 'WordPress', 'Cal.com API'],
    minimumScope: 'Up to 6 pages with interactive calendar slot selector, doctor/staff profiles, and automated SMS/WhatsApp alerts',
    includedDeliverables: [
      'Interactive time-slot booking engine with doctor/specialist selection',
      'Optional token payment or advance consultation fee collection via UPI/Razorpay',
      'Automated appointment confirmation email and WhatsApp alert to client & clinic',
      'Admin dashboard to manage doctor availability schedules, holidays, and appointment lists',
      'Patient/client intake questionnaire form before slot confirmation',
    ],
    exclusions: ['Third-party SMS gateway per-message balance charges (e.g., Fast2SMS/Twilio)'],
    warrantyDays: 30,
  },
  {
    id: 'hotel-restaurant-booking',
    name: 'Restaurant or Small Hotel Website',
    slug: 'restaurant-hotel-website',
    category: 'booking',
    categoryLabel: 'Booking, Appointment & Reservations',
    startingPrice: 19999,
    startingPriceFormatted: '₹19,999',
    typicalTimeline: '8 to 12 business days',
    idealFor: 'Restaurants, cafés, boutique resorts, homestays, and tour operators in Odisha & India',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: 'Digital food menu with dietary tags, room showcase with amenities, table reservation or room enquiry form',
    includedDeliverables: [
      'Mobile-optimized digital menu (dine-in QR code compatible)',
      'High-resolution photo gallery for dining halls, resort rooms, and amenities',
      'Table reservation / room booking enquiry form connected directly to manager’s WhatsApp',
      'Google Maps driving directions and local review badge integration',
    ],
    exclusions: ['Custom channel manager API integration for live OTA room sync (quoted separately)'],
    warrantyDays: 30,
  },

  // --- F. Education & Membership ---
  {
    id: 'coaching-institute-site',
    name: 'Coaching Institute & Education Website',
    slug: 'coaching-institute-website',
    category: 'education',
    categoryLabel: 'Education, Coaching & Membership',
    startingPrice: 24999,
    startingPriceFormatted: '₹24,999',
    typicalTimeline: '10 to 14 business days',
    idealFor: 'Competitive exam coaching institutes (IIT-JEE, NEET, OPSC/UPSC), computer training, and schools',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: 'Course catalog, faculty profiles, past topper results gallery, student enquiry and demo class registration',
    includedDeliverables: [
      'Structured course detail pages with curriculum syllabus PDF download gates',
      'Topper results hall-of-fame gallery with student testimonial videos',
      'Free demo class registration funnel with instant WhatsApp alerts to counselors',
      'Downloadable study material / notice board section for existing students',
    ],
    exclusions: ['Commercial video hosting bandwidth (Vimeo/AWS S3 costs if hosting private videos)'],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: 'school-college-site',
    name: 'School or Educational Institution Website',
    slug: 'school-educational-website',
    category: 'education',
    categoryLabel: 'Education, Coaching & Membership',
    startingPrice: 29999,
    startingPriceFormatted: '₹29,999',
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'K-12 schools, degree colleges, CBSE/ICSE institutions, and vocational training centers',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: 'Institutional profile, admission enquiry form, mandatory public disclosures, photo gallery, event calendar',
    includedDeliverables: [
      'Academic curriculum overview, fee structure transparency, and prospectus download',
      'Online admission enquiry / registration form with document upload support',
      'Mandatory CBSE/ICSE regulatory disclosure documents portal',
      'School events, sports day gallery, and annual academic calendar',
    ],
    exclusions: ['Full student grading ERP system (can be scoped under Custom Web Applications)'],
    warrantyDays: 30,
  },
  {
    id: 'lms-learning-platform',
    name: 'Learning Management System (LMS) or Course Platform',
    slug: 'lms-course-platform',
    category: 'education',
    categoryLabel: 'Education, Coaching & Membership',
    startingPrice: 59999,
    startingPriceFormatted: '₹59,999',
    typicalTimeline: '3 to 5 weeks',
    idealFor: 'Independent educators, online tutors, and training academies selling recorded or live courses',
    recommendedPlatforms: ['WordPress LearnDash', 'Next.js + Supabase'],
    minimumScope: 'Video course modules, student login portal, course purchase gateway, quizzes, and completion certificates',
    includedDeliverables: [
      'Student registration, login, and secure course progress tracking',
      'Paywalled video lesson player with chapter navigation and quiz checkpoints',
      'Integrated payment checkout (Razorpay) for one-time course fees or bundle passes',
      'Automated branded completion certificate generator (PDF) upon 100% course completion',
      'Instructor dashboard to review enrolled students, quiz scores, and course revenue',
    ],
    exclusions: ['Cloud video storage and CDN streaming fees (BunnyCDN/Vimeo/Cloudflare Stream)'],
    warrantyDays: 45,
  },

  // --- G. Industry-Specific ---
  {
    id: 'real-estate-listing-site',
    name: 'Real Estate & Property Listing Website',
    slug: 'real-estate-website',
    category: 'industry',
    categoryLabel: 'Industry-Specific Solutions',
    startingPrice: 39999,
    startingPriceFormatted: '₹39,999',
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'Real estate builders, developers, property consultants, and residential project launches in Odisha & India',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: 'Property project showcase, floor plan viewer, location advantages, brochure download, and site visit booking',
    includedDeliverables: [
      'Project master layout with 2BHK/3BHK floor plan tabs and specification cards',
      'Brochure PDF download gate requiring user phone and email',
      'Schedule a Site Visit booking form with direct WhatsApp lead forwarding',
      'Construction progress photo gallery and interactive Google Maps landmark radius',
      'RERA registration number and legal disclaimer prominently placed',
    ],
    exclusions: ['Interactive 3D architectural virtual tours (CAD files provided by client)'],
    warrantyDays: 30,
    popular: true,
  },
  {
    id: 'healthcare-hospital-site',
    name: 'Hospital & Healthcare Clinic Website',
    slug: 'healthcare-hospital-website',
    category: 'industry',
    categoryLabel: 'Industry-Specific Solutions',
    startingPrice: 34999,
    startingPriceFormatted: '₹34,999',
    typicalTimeline: '2 to 3 weeks',
    idealFor: 'Multi-speciality hospitals, diagnostic labs, maternity homes, and specialized clinics',
    recommendedPlatforms: ['Next.js', 'WordPress'],
    minimumScope: 'Doctor directory with OPD timings, department specialties, patient bed enquiry, lab test booking',
    includedDeliverables: [
      'Doctor profiles searchable by department, OPD days, and clinical qualifications',
      'Online appointment request and 24/7 emergency phone click-to-call banner',
      'Diagnostic lab test directory with home sample collection request form',
      'Patient health blog section with schema markup for medical organization',
    ],
    exclusions: ['Full Hospital Information Management System (HIMS) integration with Electronic Health Records (EHR)'],
    warrantyDays: 30,
  },

  // --- H. Content, Publishing & Directory ---
  {
    id: 'blog-content-website',
    name: 'Blog, News & Publishing Website',
    slug: 'blog-content-website',
    category: 'content',
    categoryLabel: 'Content, Media & Directories',
    startingPrice: 19999,
    startingPriceFormatted: '₹19,999',
    typicalTimeline: '8 to 12 business days',
    idealFor: 'Journalists, niche publishers, travel bloggers, and regional news portals',
    recommendedPlatforms: ['Next.js (Static)', 'WordPress'],
    minimumScope: 'Article publishing layout, category taxonomy, newsletter subscription, and ad banner placement slots',
    includedDeliverables: [
      'High-readability editorial typography optimized for long-form reading',
      'Category navigation, featured article carousel, and related articles grid',
      'Social share buttons, author bio boxes, and reading time indicator',
      'Google AdSense or custom sponsor banner slots ready for monetization',
      'Full NewsArticle schema markup for Google Discover and Google News',
    ],
    exclusions: ['Writing article content (client publishes articles)'],
    warrantyDays: 30,
  },
  {
    id: 'directory-classified-site',
    name: 'Directory or Classified Listing Website',
    slug: 'directory-classified-website',
    category: 'content',
    categoryLabel: 'Content, Media & Directories',
    startingPrice: 59999,
    startingPriceFormatted: '₹59,999',
    typicalTimeline: '3 to 5 weeks',
    idealFor: 'City business directories, vendor listings, rental directories, and specialized classified portals',
    recommendedPlatforms: ['Next.js + Supabase', 'WordPress Directory'],
    minimumScope: 'Search and filter listings by category/location, vendor profile creation, and claim-listing feature',
    includedDeliverables: [
      'Faceted search by city/pincode, category, rating, and keyword',
      'Vendor listing submission frontend form with photo upload and contact info',
      'Featured / Sponsored listing monetization badge system for paid vendors',
      'Admin moderation queue to approve, reject, or edit submitted listings',
    ],
    exclusions: ['Third-party database scraping or populating thousands of initial unverified listings'],
    warrantyDays: 45,
  },

  // --- I. Advanced Marketplaces & Custom Platforms ---
  {
    id: 'multi-vendor-marketplace',
    name: 'Multi-Vendor Marketplace Platform (Initial MVP)',
    slug: 'multi-vendor-marketplace',
    category: 'marketplaces',
    categoryLabel: 'Marketplaces & Multi-User Portals',
    startingPrice: 149999,
    startingPriceFormatted: '₹1,49,999',
    typicalTimeline: '6 to 10 weeks',
    idealFor: 'Aggregators, niche retail marketplaces, and multi-seller regional commerce platforms',
    recommendedPlatforms: ['Next.js + Node.js/PostgreSQL', 'Shopify Plus Multi-Vendor'],
    minimumScope: 'Vendor onboarding, individual vendor dashboards, split commission checkout, and centralized admin catalog approval',
    includedDeliverables: [
      'Vendor registration and onboarding workflow with KYC/GST document upload',
      'Vendor dashboard to manage own products, orders, inventory, and payout statements',
      'Central customer shopping cart supporting products from multiple vendors in one checkout',
      'Platform admin control panel to set commission rates, approve products, and manage payouts',
      'Automated email notifications to respective vendors upon order placement',
    ],
    exclusions: ['Mature enterprise marketplace automation (reverse auction, automated escrow banking APIs)'],
    warrantyDays: 60,
  },

  // --- J. Custom SaaS & Web Applications ---
  {
    id: 'custom-saas-mvp',
    name: 'Custom SaaS Minimum Viable Product (MVP)',
    slug: 'custom-saas-mvp',
    category: 'custom-apps',
    categoryLabel: 'Custom SaaS & Web Applications',
    startingPrice: 149999,
    startingPriceFormatted: '₹1,49,999',
    typicalTimeline: '6 to 8 weeks',
    idealFor: 'Tech founders, startups, and businesses automating internal customer-facing workflows',
    recommendedPlatforms: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL / Supabase', 'Tailwind'],
    minimumScope: 'User authentication (Email/Google), subscription billing (Stripe/Razorpay), core CRUD tool, and user dashboard',
    includedDeliverables: [
      'Production-grade Next.js App Router architecture with secure server actions',
      'Authentication: Sign up, Sign in, Password reset, and Google OAuth via Supabase/NextAuth',
      'Tiered subscription plan integration with webhook-driven access provisioning',
      'Core functional workflow (e.g. data calculator, PDF generator, or reporting dashboard)',
      'Clean database schema with Row Level Security (RLS) and automated migrations',
    ],
    exclusions: ['Complex AI model training (uses standard LLM API keys billed to client)'],
    warrantyDays: 60,
    popular: true,
  },
  {
    id: 'custom-business-webapp',
    name: 'Custom Business Web Application / Admin Portal',
    slug: 'custom-business-webapp',
    category: 'custom-apps',
    categoryLabel: 'Custom SaaS & Web Applications',
    startingPrice: 149999,
    startingPriceFormatted: '₹1,49,999',
    typicalTimeline: '6 to 8 weeks',
    idealFor: 'Businesses needing private internal operational software, dealer portals, or custom inventory tracking',
    recommendedPlatforms: ['Next.js', 'TypeScript', 'Supabase / PostgreSQL'],
    minimumScope: 'Role-based access control (Admin, Manager, Staff), custom data tables, export to Excel, and workflow approval stages',
    includedDeliverables: [
      'Role-based permissions: Granular views and write permissions by employee role',
      'High-speed searchable data tables with column sorting, date filters, and CSV/Excel exports',
      'Audit log tracking which user modified records and timestamps',
      'Responsive design working smoothly on warehouse tablets, laptops, and mobile phones',
    ],
    exclusions: ['Legacy on-premise mainframe hardware integration'],
    warrantyDays: 60,
  },

  // --- K. Website Redesign & Maintenance ---
  {
    id: 'website-redesign',
    name: 'Complete Website Redesign & Modernization',
    slug: 'website-redesign',
    category: 'maintenance',
    categoryLabel: 'Website Redesign, Speed & Maintenance',
    startingPrice: 14999,
    startingPriceFormatted: '₹14,999',
    typicalTimeline: '7 to 12 business days',
    idealFor: 'Businesses with outdated websites looking for modern aesthetic, mobile responsiveness, and higher conversion',
    recommendedPlatforms: ['Next.js', 'WordPress', 'Shopify'],
    minimumScope: 'Full visual and structural overhaul of existing site while preserving current URLs and SEO rankings',
    includedDeliverables: [
      'Modern, high-contrast visual design replacing outdated layouts and clunky elements',
      '301 URL redirect map ensuring zero broken links or lost Google rankings',
      'Asset optimization: Converting heavy PNGs/JPEGs to modern WebP formats',
      'Form modernization with spam protection (Turnstile/reCAPTCHA) and WhatsApp links',
    ],
    exclusions: ['Rewriting client content unless specifically added to scope'],
    warrantyDays: 30,
  },
  {
    id: 'website-speed-optimization',
    name: 'Core Web Vitals & Speed Optimization',
    slug: 'website-speed-optimization',
    category: 'maintenance',
    categoryLabel: 'Website Redesign, Speed & Maintenance',
    startingPrice: 4999,
    startingPriceFormatted: '₹4,999',
    typicalTimeline: '3 to 5 business days',
    idealFor: 'Slow WordPress or Shopify sites failing Google PageSpeed / Core Web Vitals checks',
    recommendedPlatforms: ['WordPress', 'Shopify', 'Next.js'],
    minimumScope: 'Diagnostic audit, code cleanup, image compression, script deferral, and server caching setup',
    includedDeliverables: [
      'Comprehensive before-and-after Core Web Vitals performance report (LCP, FID/INP, CLS)',
      'Aggressive lossless image compression and modern format delivery',
      'Elimination of render-blocking JavaScript and unused CSS bloat',
      'Server-level caching and CDN setup (Cloudflare free/pro tier)',
    ],
    exclusions: ['Guaranteeing 100/100 score on unoptimized slow shared hosting (hosting upgrade may be recommended)'],
    warrantyDays: 30,
  },
  {
    id: 'monthly-website-maintenance',
    name: 'Monthly Website Maintenance & Security Retainer',
    slug: 'website-maintenance-retainer',
    category: 'maintenance',
    categoryLabel: 'Website Redesign, Speed & Maintenance',
    startingPrice: 2999,
    startingPriceFormatted: '₹2,999 / month',
    typicalTimeline: 'Ongoing monthly cadence',
    idealFor: 'Businesses needing peace of mind: zero downtime, regular security updates, backups, and small content edits',
    recommendedPlatforms: ['WordPress', 'Shopify', 'Next.js'],
    minimumScope: 'Weekly plugin/theme updates, daily cloud backups, 24/7 uptime monitoring, and up to 2 hours of content edits monthly',
    includedDeliverables: [
      'Weekly core, theme, and plugin updates performed safely on staging first',
      'Daily automated off-site cloud backups with 1-click restore guarantee',
      '24/7 uptime monitoring with immediate notification if hosting goes down',
      'Up to 2 hours of priority developer time each month for text, banner, or price updates',
      'Monthly technical health and security scan report',
    ],
    exclusions: ['Major new feature development exceeding allocated monthly retainer hours'],
    warrantyDays: 30,
  },
];

// --- 5 STRUCTURED PACKAGES (PRD SECTION 5) ---

export interface WebsitePackage {
  id: string;
  name: string;
  badge: string;
  startingPrice: string;
  startingPriceNumeric: number;
  bestFor: string;
  includedScope: string;
  keyFeatures: string[];
  revisions: string;
  warranty: string;
  handover: string;
  exclusions: string[];
  popular?: boolean;
}

export const WEBSITE_PACKAGES: WebsitePackage[] = [
  {
    id: 'pkg-launch',
    name: 'LAUNCH',
    badge: 'Entry / Fast Start',
    startingPrice: 'From ₹7,999',
    startingPriceNumeric: 7999,
    bestFor: 'Individuals, freelancers, single-service professionals, and new ventures needing an immediate web footprint.',
    includedScope: 'Single-page landing page or focused 3-page site with contact capture.',
    keyFeatures: [
      'Sub-second mobile-responsive layout (Next.js or HTML5/Tailwind)',
      'Clear hero section with direct Call to Action and phone click-to-call',
      'Direct WhatsApp click-to-chat integration (+91 9114411026)',
      'Lead contact form with instant email alerts',
      'Basic metadata, favicon, and Google Maps embed',
      'Production deployment to Vercel/Netlify with free SSL',
    ],
    revisions: '2 structured feedback rounds before launch',
    warranty: '30-day post-launch covered-defect fix warranty',
    handover: '100% source-code ownership transferred to client',
    exclusions: ['Domain and hosting purchase fees', 'Copywriting (client provides raw text)'],
  },
  {
    id: 'pkg-business',
    name: 'BUSINESS',
    badge: 'Most Popular for SMBs',
    startingPrice: 'From ₹14,999',
    startingPriceNumeric: 14999,
    bestFor: 'Local businesses, corporate service providers, clinics, schools, and retailers establishing market authority.',
    includedScope: 'Up to 5 custom-designed pages (Home, About, Services, Gallery/Work, Contact).',
    keyFeatures: [
      'Full bespoke brand visual styling matching typography and color tokens',
      'Modular service pages detailing core offerings and local advantages',
      'Testimonial showcase and past client work gallery',
      'Multi-field quotation/enquiry form with anti-spam protection',
      'Technical SEO foundations: Page titles, descriptions, and LocalBusiness schema',
      'Google Analytics 4 and Google Search Console integration',
    ],
    revisions: '3 structured feedback rounds before final sign-off',
    warranty: '30-day post-launch covered-defect fix warranty',
    handover: 'Complete source-code and deployment access handover',
    exclusions: ['Paid stock photography licenses', 'Third-party commercial APIs'],
    popular: true,
  },
  {
    id: 'pkg-grow',
    name: 'GROW',
    badge: 'Growth & Lead Engine',
    startingPrice: 'From ₹24,999',
    startingPriceNumeric: 24999,
    bestFor: 'Established businesses running paid ads (Google/Meta), needing multi-service pages, or content publishing.',
    includedScope: 'Up to 10 agreed pages with content management system (CMS) or blog.',
    keyFeatures: [
      'Full Next.js or WordPress architecture with visual editor for staff',
      'Dedicated high-converting landing pages for specific ad campaigns',
      'Blog / Resource publishing engine with category taxonomy and author bios',
      'Lead magnet download gates (e.g., PDF brochure requiring phone/email)',
      'Conversion tracking: Meta Pixel, Google Ads Tag, and custom button events',
      'Performance audit: Sub-2 second load speed optimization and accessibility check',
    ],
    revisions: 'Unlimited minor tweaks during staging sprint + 3 major revision checkpoints',
    warranty: '30-day post-launch covered-defect fix warranty',
    handover: 'Full code repository + CMS admin training video walkthrough',
    exclusions: ['Paid advertising budget (paid directly to Google/Meta)'],
  },
  {
    id: 'pkg-commerce',
    name: 'COMMERCE',
    badge: 'Online Store & D2C',
    startingPrice: 'From ₹29,999',
    startingPriceNumeric: 29999,
    bestFor: 'Brands and retailers selling physical or digital products online across Odisha and pan-India.',
    includedScope: 'Complete Shopify 2.0 or WooCommerce storefront with payment and shipping integration.',
    keyFeatures: [
      'Custom storefront design with high-converting mobile product detail pages',
      'Setup of up to 25 initial products with variants (size, color, pack size)',
      'Indian payment gateway: Razorpay, Cashfree, or PhonePe (instant UPI & cards)',
      'Cash on Delivery (COD) configuration with automated OTP fraud defense',
      'Logistics integration with Shiprocket / Delhivery for automated shipping labels',
      'Abandoned cart recovery sequence via email and WhatsApp prompts',
      'Product structured schema markup for Google Shopping organic results',
    ],
    revisions: 'Full staging review + 3 revision rounds prior to live product launch',
    warranty: '30-day post-launch covered-defect fix warranty',
    handover: 'Store ownership transfer + staff order management training guide',
    exclusions: ['Shopify platform monthly plan', 'Payment gateway 2% transaction fee'],
    popular: true,
  },
  {
    id: 'pkg-custom',
    name: 'CUSTOM',
    badge: 'Enterprise & SaaS MVP',
    startingPrice: 'From ₹99,999',
    startingPriceNumeric: 99999,
    bestFor: 'Tech startups, multi-vendor marketplaces, booking platforms, custom SaaS MVPs, and enterprise business portals.',
    includedScope: 'Bespoke full-stack engineering with approved Technical Specification Document.',
    keyFeatures: [
      'Custom architecture: Next.js App Router, TypeScript, Node.js, and PostgreSQL/Supabase',
      'Role-based access control (Admin, Vendor, Customer, Staff) with secure auth',
      'Custom business workflows, dynamic database schema, and custom APIs',
      'Subscription billing (Stripe/Razorpay Subscriptions) or split-payout logic',
      'High-security implementation: Row-Level Security (RLS) and encrypted secrets',
      'Staging review environment with automated deployment pipelines (CI/CD)',
    ],
    revisions: 'Iterative bi-weekly agile sprint reviews with documented milestone sign-offs',
    warranty: '60-day post-launch covered-defect warranty + priority bug triage',
    handover: 'Clean Git repository, comprehensive documentation, and architectural schema',
    exclusions: ['Enterprise cloud server bandwidth beyond included limits (AWS/Vercel fees billed directly)'],
  },
];

// --- CUSTOM BUDGET BANDS (PRD SECTION 7) ---

export interface BudgetBandItem {
  id: string;
  rangeLabel: string;
  recommendedBuild: string;
  practicalScope: string;
  technologyStack: string;
  deliverables: string[];
  phasedPath: string;
}

export const BUDGET_BANDS: BudgetBandItem[] = [
  {
    id: 'band-under-10k',
    rangeLabel: 'Under ₹10,000',
    recommendedBuild: 'High-Impact Single Landing Page or Personal Portfolio',
    practicalScope: 'Perfect for launching a focused offer, professional portfolio, or single-service local landing page without wasted complexity.',
    technologyStack: 'Next.js, Static HTML5, Tailwind CSS, Vercel/Netlify (Free tier hosting)',
    deliverables: [
      'Sub-second single-page design with hero, services, and clear CTA',
      'Contact capture form connected to your email and WhatsApp',
      'Mobile-first responsive layout tested across modern smartphones',
      'Basic metadata and free SSL certificate',
    ],
    phasedPath: 'Launch fast to generate initial leads, then add dedicated service pages once cash flow is established.',
  },
  {
    id: 'band-10k-20k',
    rangeLabel: '₹10,000 – ₹20,000',
    recommendedBuild: 'Professional 3 to 5-Page Small Business Website',
    practicalScope: 'The sweet spot for local clinics, contractors, consultants, and retail stores establishing credible market authority.',
    technologyStack: 'Next.js or Lightweight Custom WordPress',
    deliverables: [
      'Up to 5 structured pages: Home, About, Services, Gallery, and Contact',
      'Google Maps directions embed and click-to-call mobile buttons',
      'LocalBusiness SEO schema and Google Search Console registration',
      'Social media integration and inquiry notification workflow',
    ],
    phasedPath: 'Add a blog or booking system in Phase 2 as your digital marketing expands.',
  },
  {
    id: 'band-20k-40k',
    rangeLabel: '₹20,000 – ₹40,000',
    recommendedBuild: 'Corporate Multi-Page Site or Starter Shopify D2C Store',
    practicalScope: 'Ideal for mid-sized companies, coaching institutes, schools, and direct-to-consumer eCommerce brands.',
    technologyStack: 'Shopify 2.0 or Next.js App Router with CMS',
    deliverables: [
      'Up to 10 custom pages or full online store with 20 products setup',
      'Indian payment gateway setup (Razorpay/UPI) and COD verification',
      'Logistics shipping integration (Shiprocket) or lead-magnet download gates',
      'Google Tag Manager and Meta Pixel conversion event setup',
    ],
    phasedPath: 'Layer on performance marketing (Google/Meta Ads) to scale traffic to the live store.',
  },
  {
    id: 'band-40k-75k',
    rangeLabel: '₹40,000 – ₹75,000',
    recommendedBuild: 'Real Estate Portal, Appointment Platform, or WooCommerce Store',
    practicalScope: 'For businesses requiring dynamic listings, floor plans, slot booking engines, or extensive eCommerce catalogs.',
    technologyStack: 'Next.js with Headless CMS or Advanced WooCommerce',
    deliverables: [
      'Faceted search filters by category, price, or location',
      'Interactive time-slot booking or floor plan document download gates',
      'Automated customer SMS/WhatsApp confirmation workflows',
      'Speed optimization engineered for sub-2 second load times',
    ],
    phasedPath: 'Expand into multi-location branch routing or automated dealer portal features.',
  },
  {
    id: 'band-75k-150k',
    rangeLabel: '₹75,000 – ₹1,50,000',
    recommendedBuild: 'Membership Portal, Learning LMS, or Advanced Custom eCommerce',
    practicalScope: 'For educational academies, paid community platforms, or high-volume eCommerce brands needing custom checkouts.',
    technologyStack: 'Next.js, Supabase, TypeScript, Node.js API, Stripe/Razorpay',
    deliverables: [
      'User authentication, student/member dashboards, and paywalled content',
      'Automated PDF certificate generation or custom product configurator',
      'Server-side conversion tracking (Meta CAPI) and advanced revenue analytics',
      'Automated daily off-site cloud backups and staging review environment',
    ],
    phasedPath: 'Iterate based on student/customer telemetry; add live streaming or mobile PWA.',
  },
  {
    id: 'band-150k-plus',
    rangeLabel: '₹1,50,000+',
    recommendedBuild: 'Multi-Vendor Marketplace, SaaS MVP, or Custom Enterprise Web App',
    practicalScope: 'For technology startups, multi-vendor aggregators, and enterprises replacing paper processes with bespoke software.',
    technologyStack: 'Full-stack Next.js, Node.js, PostgreSQL/Supabase, Redis, Docker',
    deliverables: [
      'Role-based permissions (Admin, Vendor, Customer, Dispatcher)',
      'Custom database schema with Row Level Security (RLS) and automated migrations',
      'Split-commission marketplace checkout or recurring subscription billing',
      'Comprehensive Technical Architecture Documentation and full Git repository handover',
    ],
    phasedPath: 'Deploy core MVP to early adopter cohorts; iterate features through bi-weekly development sprints.',
  },
];

// --- 10 CONFIDENCE PROMISES (PRD SECTION 8) ---

export interface ConfidencePromiseItem {
  number: string;
  title: string;
  badge: string;
  summary: string;
  concreteCommitment: string;
  whatItMeansForYou: string;
}

export const WEBSITE_CONFIDENCE_PROMISES: ConfidencePromiseItem[] = [
  {
    number: '01',
    title: 'Scope Lock Promise',
    badge: 'Zero Surprise Bills',
    summary: 'Before a single line of code is written, we document every agreed page, feature, deliverable, and price.',
    concreteCommitment: 'Once approved, your scope and fixed price are locked. We will never introduce surprise charges or alter agreed costs mid-project.',
    whatItMeansForYou: 'You know your exact financial commitment upfront. Any requested scope additions require a separate written change request approved by you.',
  },
  {
    number: '02',
    title: 'No Hidden Scope Charges',
    badge: '100% Commercial Clarity',
    summary: 'We itemize all third-party dependencies clearly so you never encounter undisclosed fees.',
    concreteCommitment: 'Third-party hosting, domain registration, payment gateway fees, and optional paid plugin licenses are transparently listed before kickoff.',
    whatItMeansForYou: 'You receive honest, transparent invoices. We never mark up third-party fees or hide surprise operational costs in fine print.',
  },
  {
    number: '03',
    title: 'Preview Before Launch',
    badge: 'Working Staging Review',
    summary: 'You review and test your live website on a private staging link before it ever goes public.',
    concreteCommitment: 'We deploy your build to an interactive review environment where you test links, forms, and mobile layouts with structured feedback rounds.',
    whatItMeansForYou: 'Nothing goes live until you personally verify the design, copy, and functionality and give written sign-off.',
  },
  {
    number: '04',
    title: '10-Point Website Quality Assurance (QA)',
    badge: 'Rigorous Pre-Flight Audit',
    summary: 'Every website undergoes our rigorous 10-point technical checklist before deployment.',
    concreteCommitment: 'We verify: (1) Mobile responsiveness, (2) Broken links, (3) Form submission & email alerts, (4) WhatsApp triggers, (5) Checkout journeys, (6) Basic accessibility, (7) Cross-browser rendering, (8) SSL/Security headers, (9) SEO title & meta tags, (10) 404 page & error logging.',
    whatItMeansForYou: 'You receive a finished, tested digital product rather than an unverified draft with broken buttons or failing forms.',
  },
  {
    number: '05',
    title: '30-Day Covered-Defect Warranty',
    badge: 'Documented Bug-Fix Guarantee',
    summary: 'A written 30-calendar-day warranty covering reproducible defects in the agreed implementation.',
    concreteCommitment: 'If any feature in your agreed project scope fails or malfunctions due to an implementation defect within 30 days of launch, we fix it promptly with zero additional developer fees.',
    whatItMeansForYou: 'Peace of mind knowing that we stand behind our code. (Excludes client-made code edits, third-party hosting outages, or new feature additions).',
  },
  {
    number: '06',
    title: '100% Ownership & Zero Vendor Lock-In',
    badge: 'You Own Your Digital Asset',
    summary: 'On final milestone payment, full ownership of your code, design assets, and content transfers to you.',
    concreteCommitment: 'We provide complete Git repository access or full exported project files. Domains and hosting accounts are registered under your business name.',
    whatItMeansForYou: 'You are never held hostage. You have full freedom to host anywhere, manage in-house, or work with any future developer.',
  },
  {
    number: '07',
    title: 'Delivery Transparency & Milestone Roadmap',
    badge: 'Clear Status Updates',
    summary: 'Predictable progress tracking so you always know where your project stands.',
    concreteCommitment: 'We establish clear milestones: Wireframe Approval → Design Sign-Off → Technical Build → Staging Review → Final Launch.',
    whatItMeansForYou: 'No disappearing acts or wondering if work is happening. You receive structured status updates and clear delivery deadlines.',
  },
  {
    number: '08',
    title: 'Performance & Speed Honesty',
    badge: 'Sub-Second Optimization',
    summary: 'We build with clean, semantic markup, optimized WebP imagery, and modern edge hosting.',
    concreteCommitment: 'We optimize Core Web Vitals (LCP, FID/INP, CLS) for fast loading across 4G and smartphone networks. We do not make false promises of 100/100 scores on congested shared servers.',
    whatItMeansForYou: 'Visitors enjoy an immediate, responsive experience that minimizes bounce rates and maximizes Google organic crawl efficiency.',
  },
  {
    number: '09',
    title: 'Launch Readiness & DNS Safety',
    badge: 'Zero Downtime Cutover',
    summary: 'Carefully planned DNS switch and domain connection protocols.',
    concreteCommitment: 'We configure DNS records, SSL certificates, 301 URL redirects, and MX email records with safety buffers to prevent email disruption or site downtime.',
    whatItMeansForYou: 'Your existing business emails and Google search rankings remain uninterrupted during the transition.',
  },
  {
    number: '10',
    title: 'Clear Communication & Dedicated Lead',
    badge: 'Bhubaneswar Studio Team',
    summary: 'Direct communication with real engineers and designers—not an outsourced call center.',
    concreteCommitment: 'You have a dedicated project lead based at our Bhubaneswar studio accessible via WhatsApp, email, and scheduled video/phone calls during standard business hours.',
    whatItMeansForYou: 'Fast, articulate answers to questions and transparent discussions regarding your business goals.',
  },
];
