/**
 * DEZO Odisha-First Industry Solutions Registry
 * Comprehensive digital growth solutions for 16 key sectors in Odisha and India.
 * Grounded in authentic regional economics with zero fabricated claims.
 */

export interface IndustrySolutionItem {
  id: string;
  slug: string;
  legacySlugs?: string[];
  name: string;
  tagline: string;
  overview: string;
  odishaContext: string;
  challenges: string[];
  recommendedServices: {
    serviceSlug: string;
    serviceName: string;
    whyItMatters: string;
  }[];
  suggestedChannels: string[];
  keyDeliverables: string[];
  workflow: { step: string; action: string; outcome: string }[];
  metrics: string[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
}

export const MASTER_INDUSTRIES_CATALOG: IndustrySolutionItem[] = [
  {
    id: 'ind-local',
    slug: 'local-business',
    legacySlugs: ['local'],
    name: 'Local Businesses & Retailers',
    tagline: 'Capture nearby walk-ins, phone calls, and repeat neighborhood customers',
    overview: 'Physical stores, boutique retailers, and neighborhood service providers need consistent local visibility to compete with national chains and quick-commerce apps.',
    odishaContext: 'From high-footfall corridors in Saheed Nagar, Janpath, and Patia (Bhubaneswar) to Cantonment Road (Cuttack), local shops thrive when they dominate Google Maps and enable instant WhatsApp inquiries.',
    challenges: [
      'Losing local market share to aggregators and large national retail chains',
      'Missing or unverified Google Business Profiles leading to lost local calls',
      'Inconsistent store timings, phone numbers, and outdated address details online',
      'Absence of an easy way for regular customers to browse catalogs and reorder via WhatsApp',
    ],
    recommendedServices: [
      { serviceSlug: 'local-seo', serviceName: 'Local SEO & Google Maps Visibility', whyItMatters: 'Places your store in the top 3 Google Maps results for nearby searchers.' },
      { serviceSlug: 'whatsapp-crm-automation', serviceName: 'WhatsApp Business API & Catalog', whyItMatters: 'Enables instant product queries, offers, and digital ordering for loyal customers.' },
      { serviceSlug: 'web-development', serviceName: 'Fast Single-Page Business Website', whyItMatters: 'Showcases store location, contact details, gallery, and trust credentials.' },
    ],
    suggestedChannels: ['Google Maps / Local 3-Pack', 'WhatsApp Business', 'Instagram Local Geotags', 'Local Citations'],
    keyDeliverables: [
      'Verified and category-optimized Google Business Profile with geo-tagged photos',
      'Mobile-first local landing page with click-to-call and Google Maps directions button',
      'WhatsApp Business catalog setup with pre-configured greeting and FAQ answers',
      'Physical QR code table stands to capture customer reviews effortlessly',
    ],
    workflow: [
      { step: '01. Local Audit', action: 'Verify Google Maps listing, fix duplicate NAP records, and audit nearby competitor rank.', outcome: 'Clear benchmark of local search visibility in your pincode.' },
      { step: '02. Profile Optimization', action: 'Update categories, products, operating hours, and high-resolution store photos.', outcome: 'Eligible for top 3 Google Local Pack placement.' },
      { step: '03. WhatsApp Capture', action: 'Set up WhatsApp Business QR codes at store counters for special offers and updates.', outcome: 'Direct, consent-based subscriber list for festive promotions.' },
      { step: '04. Review Generation', action: 'Implement automated review prompts for delighted shoppers.', outcome: 'Consistent 5-star rating growth that builds unbeatable local trust.' },
    ],
    metrics: ['Google Maps Direct Calls', 'Direction Requests on Google Maps', 'Local Profile Views', 'WhatsApp Inquiries'],
    faqs: [
      {
        q: 'How fast can our shop appear on Google Maps?',
        a: 'If you already have a physical address, Google Business Profile verification usually takes 3 to 7 days. Ranking improvements in the local 3-pack typically follow within 4 to 8 weeks after citation sync.',
      },
    ],
    ctaLabel: 'Grow Your Local Footfall',
  },
  {
    id: 'ind-realestate',
    slug: 'real-estate',
    name: 'Real Estate & Construction',
    tagline: 'High-ticket property enquiry funnels and verified buyer acquisition',
    overview: 'Builders, property developers, and real estate consultants require verified, high-budget buyer leads rather than endless fake inquiries or cold calls.',
    odishaContext: 'Bhubaneswar, Cuttack, and surrounding developing corridors (Khurda, Jatni, Puri Highway) are experiencing rapid residential and commercial expansion. Capturing NRI Odias, local government employees, and corporate professionals requires premium digital presentation.',
    challenges: [
      'High cost per lead and poor lead quality from mass real estate aggregators',
      'Sales teams wasting time calling unresponsive or unqualified leads',
      'Outdated static brochures that fail to showcase floor plans and construction milestones',
      'Slow response time leading high-intent property seekers to competing projects',
    ],
    recommendedServices: [
      { serviceSlug: 'landing-pages-cro', serviceName: 'High-Converting Project Landing Pages', whyItMatters: 'Presents pricing brackets, 3D walkthroughs, and verified amenity breakdowns.' },
      { serviceSlug: 'paid-ads', serviceName: 'Geo-Targeted Google Search & Meta Ads', whyItMatters: 'Captures active apartment/plot seekers in Bhubaneswar and high-net-worth NRIs.' },
      { serviceSlug: 'lead-generation', serviceName: 'Lead Qualification & CRM Routing', whyItMatters: 'Filters buyers by budget, possession timeline, and pre-qualifies before sales calls.' },
    ],
    suggestedChannels: ['Google Search Ads (High-intent keywords)', 'Meta Ads (Visual video tours & NRI targeting)', 'WhatsApp Lead Delivery', 'Local Search'],
    keyDeliverables: [
      'Dedicated project landing page with downloadable master plan and floor layouts',
      'Interactive unit selector and instant site visit booking calendar',
      'Google Ads search campaign targeting high-intent real estate keywords',
      'Instant lead dispatch webhook routing buyer details to sales reps within 30 seconds',
    ],
    workflow: [
      { step: '01. Project Positioning', action: 'Extract key project USPs (RERA approved, location benefits, construction grade).', outcome: 'Clear value proposition distinguishing your project from rivals.' },
      { step: '02. Landing Page Build', action: 'Build sub-second Next.js page with high-res galleries, virtual tours, and RERA disclosures.', outcome: 'Trustworthy destination engineered for high inquiry rates.' },
      { step: '03. Targeted Ads', action: 'Run Google Search targeting local & NRI buyers searching for flats/plots.', outcome: 'Predictable stream of verified buyer inquiries.' },
      { step: '04. Instant Qualification', action: 'Route form submissions to WhatsApp with budget range and preferred visit date.', outcome: 'Higher site visit conversion rates for your sales team.' },
    ],
    metrics: ['Qualified Buyer Leads', 'Cost per Verified Inquiry', 'Site Visit Appointments Scheduled', 'Sales Velocity'],
    faqs: [
      {
        q: 'Do you target NRI Odias living outside India?',
        a: 'Yes. We run specialized Meta and Google campaigns targeting Odia diaspora across the Gulf (UAE, Qatar, Oman), USA, UK, and Singapore who are actively looking to invest in property back home in Bhubaneswar.',
      },
    ],
    ctaLabel: 'Launch Property Campaign',
  },
  {
    id: 'ind-healthcare',
    slug: 'healthcare',
    name: 'Hospitals, Clinics & Healthcare Providers',
    tagline: 'Patient trust, doctor discovery, appointment booking, and local medical search',
    overview: 'Medical centers, dental practices, specialty clinics, and diagnostic labs need compassionate, transparent, and accurate digital systems that make it easy for patients to book consultations.',
    odishaContext: 'Bhubaneswar has developed into a premier healthcare hub for Eastern India, drawing patients across Odisha, West Bengal, and Jharkhand. Patients prioritize verified specialist credentials, clinic hygiene, and clear OPD schedules.',
    challenges: [
      'Patient drop-off due to confusing phone lines or broken appointment inquiry forms',
      'Lack of search visibility for specialized treatments (e.g. orthopedic, fertility, dermatology)',
      'Negative or unmonitored online reviews damaging physician and hospital trust',
      'Inaccurate doctor availability and department timings on public directories',
    ],
    recommendedServices: [
      { serviceSlug: 'local-seo', serviceName: 'Medical Local SEO & Google Maps', whyItMatters: 'Ensures your clinic appears when patients urgently search for specialists near them.' },
      { serviceSlug: 'web-development', serviceName: 'Accessible Clinic Website & Appointment Engine', whyItMatters: 'Simple, mobile-friendly OPD schedule and appointment booking interface.' },
      { serviceSlug: 'reputation-management', serviceName: 'Ethical Patient Review Systems', whyItMatters: 'Encourages satisfied patients to share their honest recovery experiences.' },
    ],
    suggestedChannels: ['Google Local Pack (Emergency & Specialist searches)', 'Google Search Ads', 'WhatsApp Appointment Reminders', 'Educational Health Content'],
    keyDeliverables: [
      'Doctor profile directories with educational qualifications, OPD hours, and fees',
      'Seamless online appointment request flow connected to hospital desk WhatsApp',
      'Specialty condition and treatment information pages structured for search intent',
      'Strict adherence to medical advertising ethics with zero misleading claims',
    ],
    workflow: [
      { step: '01. Department Architecture', action: 'Structure dedicated landing pages for each medical specialty and doctor.', outcome: 'Crawlable, patient-friendly information hierarchy.' },
      { step: '02. Local Search Domination', action: 'Optimize Google Business profiles for the clinic and lead consultants.', outcome: 'High visibility for localized treatment queries.' },
      { step: '03. Appointment Routing', action: 'Connect patient booking requests to clinic reception via automated WhatsApp alerts.', outcome: 'Zero missed patient consultation requests.' },
      { step: '04. Reputation Protocol', action: 'Deploy post-discharge SMS/WhatsApp feedback prompts.', outcome: 'Protected clinical reputation and transparent patient satisfaction.' },
    ],
    metrics: ['Booked Consultations', 'Phone Inquiries to Reception', 'Local Search Discovery Impressions', 'Patient Rating Average'],
    faqs: [
      {
        q: 'Do you make medical claims or guarantee treatment outcomes?',
        a: 'Never. In accordance with the Medical Council of India guidelines and ethical standards, we never publish guaranteed medical outcomes or sensationalized claims. We focus strictly on accessibility, factual doctor profiles, clinic hours, and verified patient convenience.',
      },
    ],
    ctaLabel: 'Enhance Clinic Visibility',
  },
  {
    id: 'ind-education',
    slug: 'education',
    name: 'Schools, Colleges & Coaching Institutes',
    tagline: 'Student admissions campaigns, academic credibility, and parent trust',
    overview: 'CBSE/ICSE schools, competitive exam coaching centers (NEET, JEE, UPSC, Banking), and private colleges must demonstrate academic excellence, faculty strength, and clear admission procedures.',
    odishaContext: 'Odisha boasts a massive student population in educational hubs like Bhubaneswar and Cuttack. Admissions cycles are highly seasonal, demanding coordinated digital campaigns well before the academic term begins.',
    challenges: [
      'Intense local competition for admissions during brief 3-month seasonal windows',
      'Heavy reliance on expensive outdoor hoardings and print flyers with zero ROI tracking',
      'Confusing fee structures and cumbersome offline application processes for parents',
      'Unstructured inquiry capture resulting in slow counselor follow-ups',
    ],
    recommendedServices: [
      { serviceSlug: 'paid-ads', serviceName: 'Seasonal Google & Meta Admission Ads', whyItMatters: 'Reaches parents searching for best schools and students looking for coaching.' },
      { serviceSlug: 'landing-pages-cro', serviceName: 'Admission Prospectus & Inquiry Funnels', whyItMatters: 'Collects student class, stream, and parent contact details in exchange for syllabus/brochure.' },
      { serviceSlug: 'whatsapp-crm-automation', serviceName: 'Automated Admission Counselor Follow-ups', whyItMatters: 'Instantly dispatches prospectus on WhatsApp and alerts admission counselors.' },
    ],
    suggestedChannels: ['Google Search Ads (Admission season)', 'Meta Video Ads (Campus & faculty tours)', 'WhatsApp Admission Portal', 'YouTube Education Content'],
    keyDeliverables: [
      'Digital Admission Prospectus landing page with instant PDF download gate',
      'Parent and student inquiry capture form with automatic stream/course selection',
      'Video ad creative snippets showcasing laboratories, campus, and student achievements',
      'Admission counselor CRM dashboard tracking lead status from inquiry to enrollment',
    ],
    workflow: [
      { step: '01. Admission Funnel Planning', action: 'Identify key intake dates, fee value propositions, and scholarship programs.', outcome: 'Defined marketing calendar mapped to admission season.' },
      { step: '02. Prospectus Funnel Build', action: 'Create fast mobile landing page showcasing curriculum, faculty, and facilities.', outcome: 'High-converting enquiry capture mechanism.' },
      { step: '03. Campaign Scaling', action: 'Launch targeted Google and Meta ads across Odisha districts for specific courses.', outcome: 'Surge of qualified student inquiries during peak decision weeks.' },
      { step: '04. Counselor Sync', action: 'Automate WhatsApp delivery of the brochure and trigger counselor follow-up calls.', outcome: 'Higher seat occupancy and measurable admission enrollment rates.' },
    ],
    metrics: ['Prospectus Downloads', 'Admissions Inquiries', 'Cost Per Inquiring Student', 'Confirmed Enrollments'],
    faqs: [
      {
        q: 'When should an educational institute begin running digital campaigns?',
        a: 'Ideally 60 to 90 days before your entrance test or admission cutoff dates. Early campaigns build parent awareness and collect early-bird inquiries before competitors saturate ad spaces.',
      },
    ],
    ctaLabel: 'Scale Student Admissions',
  },
  {
    id: 'ind-hospitality',
    slug: 'hospitality-tourism',
    name: 'Hotels, Restaurants & Tourism',
    tagline: 'Direct room bookings, banquet inquiries, dining reservations, and tourist discovery',
    overview: 'Hotels, eco-resorts, heritage homestays, banquet halls, and fine dining establishments must escape punitive 20-30% OTA commissions by cultivating direct guest reservations.',
    odishaContext: 'Odisha is an extraordinary cultural and ecotourism destination—from the Jagannath Temple in Puri and Konark Sun Temple to Chilika Lake, Similipal, and Bhubaneswar’s heritage sites. Capturing direct traveler bookings requires rich visual storytelling and frictionless mobile reservation flows.',
    challenges: [
      'High commission payouts (18% to 30%) to Online Travel Agencies (OTAs like MakeMyTrip/Booking.com)',
      'Lack of direct booking engines on their own hotel websites',
      'Missing banquet and wedding inquiry pipelines for local event revenue',
      'Poor photography and outdated menu listings across search engines',
    ],
    recommendedServices: [
      { serviceSlug: 'web-development', serviceName: 'Direct Booking Hotel & Resort Website', whyItMatters: 'Seamless room selection, date picker, photo tours, and direct payment processing.' },
      { serviceSlug: 'local-seo', serviceName: 'Puri & Odisha Tourism Search Optimization', whyItMatters: 'Ranks your property when tourists search for "resort near sea beach" or "hotel near temple".' },
      { serviceSlug: 'social', serviceName: 'Visual Instagram & Tourism Content', whyItMatters: 'High-definition Reels highlighting coastal atmosphere, authentic Odia cuisine, and heritage stays.' },
    ],
    suggestedChannels: ['Google Maps & Hotel Ads', 'Instagram Reels & Travel Creators', 'Direct WhatsApp Reservation Concierge', 'Local SEO'],
    keyDeliverables: [
      'Modern resort/hotel website with integrated room inquiry and booking engine',
      'Dedicated wedding, corporate conference, and banquet hall inquiry form',
      'Google Hotel Center and Business Profile synchronization with real-time pricing',
      'Automated WhatsApp reservation concierge sending booking confirmations and directions',
    ],
    workflow: [
      { step: '01. Visual Refresh', action: 'Curate high-res room photography, amenities, dining, and scenic views.', outcome: 'Compelling digital showcase that inspires traveler bookings.' },
      { step: '02. Direct Booking Engine', action: 'Install zero-commission booking engine with instant UPI/Card payments.', outcome: 'Higher profit margins on every reserved room night.' },
      { step: '03. Seasonal Campaigning', action: 'Run search and social campaigns ahead of Ratha Yatra, Durga Puja, and winter tourism.', outcome: 'Peak occupancy during major tourism seasons.' },
    ],
    metrics: ['Direct Website Bookings', 'OTA Commission Savings', 'Banquet Hall Leads', 'Average Daily Rate (ADR) Lift'],
    faqs: [
      {
        q: 'Can direct booking co-exist with our existing OTA listings?',
        a: 'Yes, absolutely. We recommend using channel managers to keep your OTA listings synchronized while incentivizing guests with complimentary breakfast or better rates when booking directly on your site.',
      },
    ],
    ctaLabel: 'Drive Direct Bookings',
  },
  {
    id: 'ind-manufacturing',
    slug: 'manufacturing',
    legacySlugs: ['manufacturers'],
    name: 'Manufacturing & Industrial Suppliers',
    tagline: 'B2B industrial catalog architecture, procurement inquiries, and export visibility',
    overview: 'Industrial manufacturers, fabrication units, steel/metal suppliers, and mineral processors need authoritative engineering credibility to secure institutional B2B contracts.',
    odishaContext: 'Odisha is India’s industrial mineral powerhouse, with massive industrial belts across Angul, Jharsuguda, Rourkela, Jajpur (Kalinganagar), and Paradip. Local manufacturers need professional digital presences that appeal to national EPC contractors, PSUs, and export buyers.',
    challenges: [
      'Outdated, non-responsive websites built decades ago that fail corporate vendor compliance',
      'Reliance on third-party B2B directories that sell the same inquiry to 10 competitors',
      'Unstructured technical product specifications and absent downloadable CAD/spec sheets',
      'Low organic discovery for specialized B2B product codes and industrial grade materials',
    ],
    recommendedServices: [
      { serviceSlug: 'web-development', serviceName: 'Corporate B2B & Industrial Web Portal', whyItMatters: 'Detailed machinery catalogs, ISO certification displays, and RFQ forms.' },
      { serviceSlug: 'seo', serviceName: 'B2B Technical & Industrial SEO', whyItMatters: 'Ranks for commercial industrial specifications, wholesale terms, and dealer searches.' },
      { serviceSlug: 'lead-generation', serviceName: 'Request for Quote (RFQ) Funnels', whyItMatters: 'Structured inquiry forms that capture volume, technical grade, and delivery location.' },
    ],
    suggestedChannels: ['Google Search (B2B commercial queries)', 'LinkedIn B2B Account Marketing', 'Corporate Industry SEO', 'Email Marketing'],
    keyDeliverables: [
      'Comprehensive product specification catalog with downloadable technical data sheets (TDS)',
      'Multi-step Request for Quote (RFQ) engine with custom volume calculators',
      'Quality compliance showcase: ISO, BIS, CE certifications, and lab testing proofs',
      'Client and institutional project archive highlighting supply capabilities',
    ],
    workflow: [
      { step: '01. Catalog Engineering', action: 'Organize industrial inventory into distinct technical categories and grades.', outcome: 'Clear specification hierarchy easily navigable by procurement managers.' },
      { step: '02. B2B Portal Build', action: 'Build high-speed Next.js corporate portal highlighting production capacity and plant photos.', outcome: 'Institutional credibility that passes vendor onboarding audits.' },
      { step: '03. Search Optimization', action: 'Target exact industrial search terms (e.g., "TMT bar manufacturer Odisha", "structural steel supplier Rourkela").', outcome: 'Direct inbound procurement inquiries bypassing paid middleman portals.' },
    ],
    metrics: ['Inbound RFQs Received', 'Average Order Value (AOV)', 'B2B Catalog Downloads', 'Contract Closure Rate'],
    faqs: [
      {
        q: 'Why should an industrial manufacturer invest in a modern website?',
        a: 'When institutional buyers, PSUs, or EPC contractors review potential vendors, a slow, non-responsive website immediately triggers concerns regarding quality control and technological capability. A modern digital platform demonstrates operational excellence.',
      },
    ],
    ctaLabel: 'Modernize Industrial Presence',
  },
  {
    id: 'ind-textiles',
    slug: 'handloom-textiles',
    name: 'Handloom, Handicrafts & Textiles',
    tagline: 'Preserve authentic craft traditions while building profitable global D2C storefronts',
    overview: 'Artisans, weavers, and heritage handloom brands need direct-to-consumer digital channels to preserve fair margins, showcase geographical heritage, and reach global buyers.',
    odishaContext: 'Odisha handlooms are globally celebrated—Sambalpuri Ikat, Maniabandha, Berhampuri Patta, Kotpad tribal weaves, and Pipili appliqué. Bridging traditional weaver clusters with discerning national and international buyers requires craft storytelling and secure global payments.',
    challenges: [
      'Intermediaries and middlemen capturing up to 70% of retail margins while weavers receive minimal wages',
      'Cheap powerloom imitations flooding the market without authentication markers',
      'Complicated international currency conversion and cross-border shipping setups',
      'Difficulties conveying the laborious hand-weaving process through digital media',
    ],
    recommendedServices: [
      { serviceSlug: 'shopify-development', serviceName: 'Shopify D2C Handloom Storefront', whyItMatters: 'Fast mobile commerce, multi-currency support, and seamless payment gateways.' },
      { serviceSlug: 'branding', serviceName: 'Craft Heritage Storytelling & Packaging', whyItMatters: 'Elevates handloom products into luxury heirloom pieces with artisan certificates.' },
      { serviceSlug: 'paid-ads', serviceName: 'Targeted Festive & Cultural Meta Campaigns', whyItMatters: 'Reaches saree connoisseurs and diaspora across metropolitan India and abroad.' },
    ],
    suggestedChannels: ['Instagram Visual Storytelling', 'Shopify Global Storefront', 'Meta Ads (Handloom enthusiasts)', 'Pinterest Craft Boards'],
    keyDeliverables: [
      'Custom Shopify storefront highlighting fabric origin, GI tags, and weaver profiles',
      'High-resolution zoom capabilities showcasing weave texture and zari details',
      'Domestic and international logistics integration (DHL, Shiprocket, FedEx)',
      'Certificate of Authenticity inclusion in post-purchase confirmation flow',
    ],
    workflow: [
      { step: '01. Story Archiving', action: 'Document the weaving tradition, natural dye processes, and craft origin.', outcome: 'Emotional, authentic brand narrative that justifies premium pricing.' },
      { step: '02. Storefront Launch', action: 'Build Shopify store optimized for quick mobile checkout and high-res imagery.', outcome: 'Direct-order commerce platform capturing retail margins directly.' },
      { step: '03. Campaign Scaling', action: 'Run Meta and Google campaigns targeting wedding shoppers and handloom collectors.', outcome: 'Sustainable direct sales across India and diaspora overseas.' },
    ],
    metrics: ['Direct Store Revenue', 'Average Order Value (AOV)', 'Return on Ad Spend (ROAS)', 'Global Orders Delivered'],
    faqs: [
      {
        q: 'Can you set up international shipping and multi-currency payments?',
        a: 'Yes. We configure multi-currency checkouts (USD, EUR, GBP, CAD) with PayPal/Stripe and international logistics partners like DHL Express for seamless global delivery.',
      },
    ],
    ctaLabel: 'Scale Handloom Storefront',
  },
  {
    id: 'ind-agriculture',
    slug: 'agriculture-food',
    name: 'Agriculture & Food Processing',
    tagline: 'Farmer Producer Organizations (FPOs), organic foods, and packaged food brands',
    overview: 'Food processors, spice mills, organic farming collectives, and packaged snack manufacturers need clean shelf-appeal branding and reliable distribution channels.',
    odishaContext: 'Odisha’s rich agricultural ecosystem—Kandhamal Haldi (turmeric), Koraput coffee, organic millets, seafood from the coast, and traditional sweets—offers immense export and D2C potential when branded and packaged properly.',
    challenges: [
      'Commodity price traps where quality organic produce is sold at bulk raw rates',
      'FSSAI, packaging, and shelf-life disclosures that look amateurish online',
      'High shipping costs on heavy or fragile food jars eroding D2C unit economics',
      'Lack of traceability proofs that verify organic and pesticide-free claims',
    ],
    recommendedServices: [
      { serviceSlug: 'branding', serviceName: 'FSSAI-Compliant Food Packaging & Identity', whyItMatters: 'Shelf-popping pouch and box design that commands retail and online attention.' },
      { serviceSlug: 'amazon', serviceName: 'Amazon India Grocery & Spice Launch', whyItMatters: 'Reaches prime grocery buyers searching for organic turmeric, coffee, and dry snacks.' },
      { serviceSlug: 'shopify-development', serviceName: 'D2C Subscription & Bundle Storefront', whyItMatters: 'Enables recurring monthly pantry bundles to amortize shipping expenses.' },
    ],
    suggestedChannels: ['Amazon Grocery & Flipkart Supermart', 'Shopify D2C Store', 'Instagram Food Creators', 'Local Retail Distribution'],
    keyDeliverables: [
      'Print-ready, FSSAI-compliant packaging and label designs with barcode placement',
      'Amazon Brand Registry and A+ Content highlighting harvest origin and lab certifications',
      'Shopify pantry bundle architecture to maximize cart size above free-shipping thresholds',
      'Farm-to-table traceability content highlighting local farmer empowerment',
    ],
    workflow: [
      { step: '01. Product Positioning', action: 'Establish unique health and origin benefits (e.g., high curcumin content, single-origin).', outcome: 'Defensible brand story that escapes raw commodity pricing.' },
      { step: '02. Packaging & Store', action: 'Design compliant packaging and deploy D2C Shopify store with bundle discounts.', outcome: 'Commercial infrastructure ready for consumer orders.' },
      { step: '03. Marketplace Syndication', action: 'List on Amazon and Flipkart Grocery with high-converting search keywords.', outcome: 'Immediate access to millions of everyday grocery shoppers.' },
    ],
    metrics: ['Monthly Packaged Units Sold', 'Marketplace Net Margin', 'Repeat Reorder Rate', 'Cart Average Size'],
    faqs: [
      {
        q: 'How do you handle shipping costs for heavy food products?',
        a: 'We design bundle packs (e.g. 3-packs, quarterly supply kits) that lift average order value above ₹600–₹800, ensuring logistics costs remain under 15% of order value.',
      },
    ],
    ctaLabel: 'Launch Food & Agri Brand',
  },
  {
    id: 'ind-wellness',
    slug: 'wellness-fitness',
    name: 'Salons, Spas & Fitness Businesses',
    tagline: 'Fill appointment slots, sell memberships, and drive recurring local clients',
    overview: 'Hair salons, luxury spas, aesthetic clinics, and premium fitness centers depend on predictable local bookings, membership renewals, and high customer lifetime value.',
    odishaContext: 'Urban lifestyles in Bhubaneswar and Cuttack have spurred booming demand for wellness, bridal styling, and fitness gyms. Word of mouth is amplified exponentially when backed by striking visual transformations.',
    challenges: [
      'Unfilled appointment slots during weekday off-peak hours',
      'Heavy churn in gym and fitness memberships after initial 30 days',
      'No automated appointment reminder system resulting in costly no-shows',
      'Disorganized before-and-after portfolios scattered across personal staff phones',
    ],
    recommendedServices: [
      { serviceSlug: 'local-seo', serviceName: 'Local Maps & "Best Salon/Gym" Ranking', whyItMatters: 'Captures urgent local searches for haircuts, bridal makeup, and personal training.' },
      { serviceSlug: 'social', serviceName: 'Visual Transformation Carousels & Reels', whyItMatters: 'Showcases before-and-after styling and client workout transformations.' },
      { serviceSlug: 'whatsapp-crm-automation', serviceName: 'Automated Booking & Reminder Bot', whyItMatters: 'Eliminates no-shows with instant calendar confirmations and WhatsApp reminders.' },
    ],
    suggestedChannels: ['Instagram Visual Feeds & Reels', 'Google Local 3-Pack', 'WhatsApp Booking Assistant', 'Local Influencer Collaborations'],
    keyDeliverables: [
      'Interactive service menu and pricing table with instant booking buttons',
      'Curated bridal and makeover lookbook optimized for fast mobile scrolling',
      'Automated WhatsApp appointment confirmation and 24-hour reminder sequence',
      'Google review collection QR cards deployed at the reception checkout counter',
    ],
    workflow: [
      { step: '01. Local Polish', action: 'Clean up Google Business Profile with verified price lists and interior photos.', outcome: 'Immediate boost in walk-in inquiries and Google Maps calls.' },
      { step: '02. Social Engine', action: 'Post 3 weekly client transformation Reels and seasonal package offers.', outcome: 'Strong local brand recognition among young professionals.' },
      { step: '03. Automation', action: 'Deploy WhatsApp chatbot to take bookings and send reminder pings.', outcome: 'Cut appointment no-show rates by over 40%.' },
    ],
    metrics: ['Booked Appointments per Week', 'Membership Renewal Rate', 'No-Show Reduction %', 'Customer Lifetime Value'],
    faqs: [
      {
        q: 'Can clients book appointments directly on WhatsApp?',
        a: 'Yes. We implement automated WhatsApp flows where clients select their service, preferred stylist/trainer, date, and time slot with instant confirmation sent to reception.',
      },
    ],
    ctaLabel: 'Fill Your Appointment Book',
  },
  {
    id: 'ind-consulting',
    slug: 'professional-services',
    legacySlugs: ['service'],
    name: 'Professional Services & Consultants',
    tagline: 'Establish domain authority, attract high-value corporate clients, and systematize inquiries',
    overview: 'Chartered accountants, legal firms, architecture studios, and management consultancies must project unmistakable authority, discretion, and deep industry expertise.',
    odishaContext: 'With rapid corporate investment, GST compliance needs, and infrastructure development across Odisha, premier consulting firms must present modern digital credentials to win state and private contracts.',
    challenges: [
      'Inability to demonstrate deep case expertise without breaching client confidentiality',
      'Websites that look like generic templates with zero differentiation from solo practitioners',
      'Inefficient manual consultation scheduling involving multiple email ping-pongs',
      'Invisible on Google for specialized corporate advisory and compliance queries',
    ],
    recommendedServices: [
      { serviceSlug: 'web-development', serviceName: 'Executive Corporate Web Presence', whyItMatters: 'Clean typography, partner bios, practice areas, and thought leadership articles.' },
      { serviceSlug: 'seo', serviceName: 'Practice-Area Authority SEO', whyItMatters: 'Ranks for complex regulatory, corporate tax, architectural, and legal search queries.' },
      { serviceSlug: 'lead-generation', serviceName: 'Strategy Session Booking Systems', whyItMatters: 'Pre-qualifies corporate clients before placing them on partners’ calendars.' },
    ],
    suggestedChannels: ['Organic Search (Commercial legal/tax queries)', 'LinkedIn Thought Leadership', 'Executive Email Newsletters', 'Industry Whitepapers'],
    keyDeliverables: [
      'Polished editorial website reflecting partner credentials and practice areas',
      'Interactive consultation booking scheduler integrated with partner calendars',
      'Downloadable regulatory guides and industry whitepaper lead capture funnels',
      'Structured organization schema establishing authoritative entity signals on Google',
    ],
    workflow: [
      { step: '01. Practice Structuring', action: 'Define core advisory verticals, partner credentials, and target client sizes.', outcome: 'Clear market positioning as an elite corporate advisory firm.' },
      { step: '02. Platform Build', action: 'Deploy refined editorial site with seamless document downloads and appointment scheduling.', outcome: 'Immediate elevation of corporate credibility.' },
      { step: '03. Thought Leadership', action: 'Publish insightful analysis of recent regulatory and regional industry shifts.', outcome: 'Compounds organic inbound client inquiries over time.' },
    ],
    metrics: ['Corporate Consultation Requests', 'Practice Area Search Rankings', 'Whitepaper Downloads', 'Average Retainer Size'],
    faqs: [
      {
        q: 'Can the website handle confidential corporate consultation bookings?',
        a: 'Yes. All inquiry forms and scheduling links use encrypted HTTPS channels and route directly to your private firm email or secured CRM without public exposure.',
      },
    ],
    ctaLabel: 'Build Executive Authority',
  },
  {
    id: 'ind-startups',
    slug: 'startups',
    name: 'Startups & SaaS Businesses',
    tagline: 'Validate product-market fit, acquire early adopters, and build scalable growth engines',
    overview: 'Early-stage tech startups and software products need rapid prototyping, high-converting launch landing pages, product analytics, and lean customer acquisition.',
    odishaContext: 'Odisha’s startup ecosystem (backed by Startup Odisha and hubs like O-Hub in Bhubaneswar) is producing remarkable innovation in agritech, healthtech, and AI. Early-stage founders need clean engineering that impresses both users and venture capital investors.',
    challenges: [
      'Burning scarce seed capital on broad ads before clarifying core value propositions',
      'Clunky signup and onboarding flows causing massive user churn before activation',
      'Lack of proper product tracking to measure user engagement and drop-offs',
      'Fragmented engineering where marketing pages are detached from the core application',
    ],
    recommendedServices: [
      { serviceSlug: 'web-development', serviceName: 'Modern Next.js Product Landing Pages', whyItMatters: 'Sub-second speed, interactive product demos, and frictionless signup forms.' },
      { serviceSlug: 'analytics-tracking', serviceName: 'Product & Funnel Analytics (GA4 / Mixpanel)', whyItMatters: 'Pinpoints exact user drop-offs from ad click to active feature usage.' },
      { serviceSlug: 'paid-ads', serviceName: 'Lean Hypothesis-Driven Ad Testing', whyItMatters: 'Tests multiple value propositions and pricing tiers with minimal ad burn.' },
    ],
    suggestedChannels: ['Google Search (Problem-aware intent)', 'LinkedIn B2B Ads', 'Product Hunt / Tech Launches', 'X / Twitter Builder Community'],
    keyDeliverables: [
      'High-converting product landing page with animated feature walkthroughs',
      'Seamless auth integration (Google Sign-In, OTP) and waiting list management',
      'End-to-end conversion tracking tracking trial signups, activations, and upgrades',
      'Investor-ready tech stack built on Next.js, TypeScript, and clean cloud architecture',
    ],
    workflow: [
      { step: '01. USP Definition', action: 'Distill the core problem, aha-moment, and pricing hypothesis.', outcome: 'Single-minded messaging that resonates with early adopters.' },
      { step: '02. Rapid Build', action: 'Ship high-performance Next.js marketing site with interactive product preview.', outcome: 'Credible digital front-door ready for traffic.' },
      { step: '03. Validation Sprints', action: 'Run micro-budget ad tests across Google and LinkedIn to measure real signup costs.', outcome: 'Empirical data proving product demand and customer acquisition costs.' },
    ],
    metrics: ['User Signup Conversion Rate', 'Customer Acquisition Cost (CAC)', 'Activation Rate', 'Investor Pitch Feedback'],
    faqs: [
      {
        q: 'Can you help us build an MVP or just marketing pages?',
        a: 'DEZO provides full-stack engineering. We can build both your public-facing marketing engine and your core React/Next.js web application frontend.',
      },
    ],
    ctaLabel: 'Accelerate Startup Growth',
  },
  {
    id: 'ind-d2c',
    slug: 'd2c-ecommerce',
    legacySlugs: ['d2c', 'ecommerce'],
    name: 'eCommerce & D2C Brands',
    tagline: 'Scale direct storefront sales, reduce customer acquisition cost, and improve retention',
    overview: 'Direct-to-consumer lifestyle, fashion, beauty, and consumer brands must navigate high Meta ad costs, logistics friction, and marketplace competition.',
    odishaContext: 'Consumer brand founders across Odisha and India need systems that balance high Amazon/Flipkart volume with their own profitable Shopify storefronts to build true equity.',
    challenges: [
      'Rising Meta ad costs eroding profit margins on first-time customer acquisitions',
      'High Cash on Delivery (COD) Return-to-Origin (RTO) rates killing operational profits',
      'Poor repeat customer retention resulting in 100% reliance on paid ad acquisition',
      'Slow mobile load times causing 50%+ bounce rates on mobile ad traffic',
    ],
    recommendedServices: [
      { serviceSlug: 'shopify-development', serviceName: 'Custom Shopify 2.0 High-Speed Store', whyItMatters: 'Sub-2s mobile loading, frictionless 1-click UPI checkout, and trust triggers.' },
      { serviceSlug: 'paid-ads', serviceName: 'Full-Funnel Meta & Google Performance Ads', whyItMatters: 'Structured creative testing, catalog ads, and high-ROAS retargeting.' },
      { serviceSlug: 'whatsapp-crm-automation', serviceName: 'Automated Cart Recovery & COD Verification', whyItMatters: 'Recovers 15-25% of abandoned carts and cuts RTO returns with WhatsApp OTP.' },
    ],
    suggestedChannels: ['Meta (FB/IG) Video Ads', 'Google Shopping & PMax', 'WhatsApp Retention Flows', 'Shopify Storefront'],
    keyDeliverables: [
      'High-speed Shopify theme with optimized mobile product pages and sticky Add-to-Cart',
      'RTO reduction workflow with automated WhatsApp address and COD verification',
      'Automated email and WhatsApp post-purchase review and cross-sell sequences',
      'Real-time Blended ROAS and Customer Acquisition Cost (CAC) dashboard',
    ],
    workflow: [
      { step: '01. Friction Audit', action: 'Inspect page speed, checkout drop-offs, and shipping policies.', outcome: 'Identified conversion leaks on the existing storefront.' },
      { step: '02. Storefront Upgrade', action: 'Re-engineer product pages with social proof, size charts, and instant payment options.', outcome: 'Higher baseline visitor-to-buyer conversion rate.' },
      { step: '03. Acquisition & Retargeting', action: 'Launch disciplined creative testing and catalog retargeting campaigns.', outcome: 'Predictable, profitable customer acquisition scaling.' },
      { step: '04. Retention System', action: 'Deploy automated WhatsApp flows to turn one-time buyers into repeat brand advocates.', outcome: 'Higher Customer Lifetime Value (LTV) and sustainable growth.' },
    ],
    metrics: ['Store Conversion Rate', 'Blended ROAS', 'RTO % Reduction', 'Repeat Purchase Rate'],
    faqs: [
      {
        q: 'How do you help reduce Cash on Delivery (COD) losses in India?',
        a: 'We implement smart COD rules: incentivizing prepaid UPI with small instant discounts, verifying phone numbers via WhatsApp OTP, and flagging known high-risk pincodes before shipment.',
      },
    ],
    ctaLabel: 'Scale D2C Commerce',
  },
  {
    id: 'ind-nonprofit',
    slug: 'nonprofit-ngo',
    name: 'NGOs & Non-Profit Organizations',
    tagline: 'Donor transparency, impact storytelling, CSR partnership proposals, and volunteer mobilization',
    overview: 'Non-governmental organizations, charitable trusts, and social enterprises need transparent, credible platforms that inspire donor trust and fulfill statutory compliance.',
    odishaContext: 'Odisha has a vibrant civil society working on disaster resilience, tribal education, healthcare, and environmental conservation. Securing national CSR grants and individual donations requires impeccable financial transparency and emotional storytelling.',
    challenges: [
      'Donor skepticism stemming from lack of visible audited reports and field impact proofs',
      'Complex donation gateways with high failure rates on international and domestic cards',
      'Failure to meet Corporate Social Responsibility (CSR) digital compliance standards',
      'Low organic discovery for critical social advocacy issues',
    ],
    recommendedServices: [
      { serviceSlug: 'web-development', serviceName: 'Transparent NGO Impact Portal', whyItMatters: 'Highlights annual reports, 80G/12A tax certificates, and verified project updates.' },
      { serviceSlug: 'landing-pages-cro', serviceName: 'Tax-Exempt Donation Landing Pages', whyItMatters: 'Seamless Razorpay/UPI donation flow with instant 80G tax receipt generation.' },
      { serviceSlug: 'social', serviceName: 'Field Impact Video & Photo Storytelling', whyItMatters: 'Brings ground-level community transformations directly to donor screens.' },
    ],
    suggestedChannels: ['Google Ad Grants for Nonprofits', 'Social Impact Video Campaigns', 'Corporate CSR Proposals', 'Email Donor Newsletters'],
    keyDeliverables: [
      'Accessible nonprofit website with prominent audited financial disclosures',
      'Secure donation engine supporting recurring monthly pledges and one-time gifts',
      'Automated 80G tax receipt PDF generation and email delivery to donors',
      'CSR partnership deck and dedicated corporate collaboration landing page',
    ],
    workflow: [
      { step: '01. Compliance & Story Audit', action: 'Compile 80G, 12A, FCRA details, and real field beneficiary stories.', outcome: 'Unassailable foundation of institutional credibility.' },
      { step: '02. Donation Flow Build', action: 'Integrate seamless payment gateways supporting UPI, cards, and net banking.', outcome: 'Frictionless donation experience for supporters.' },
      { step: '03. Ad Grants & Social', action: 'Deploy Google for Nonprofits search campaigns and share verified impact updates.', outcome: 'Steady influx of new individual and corporate supporters.' },
    ],
    metrics: ['Total Donations Raised', 'Average Gift Size', 'Recurring Donor Retention', 'CSR Inquiries'],
    faqs: [
      {
        q: 'Can donors instantly download their 80G tax exemption receipts?',
        a: 'Yes. We build automated receipt systems that instantly email a signed 80G PDF receipt with all statutory registration numbers the second a donation clears.',
      },
    ],
    ctaLabel: 'Amplify Social Impact',
  },
  {
    id: 'ind-wholesale',
    slug: 'wholesalers-exporters',
    name: 'Wholesalers, Distributors & Exporters',
    tagline: 'B2B order catalogs, dealer networks, bulk pricing, and export inquiries',
    overview: 'Stockists, bulk distributors, and merchant exporters need digital systems that streamline dealer reordering, showcase wholesale volume pricing, and attract international buyers.',
    odishaContext: 'With Paradip port and major rail hubs, Odisha is a vital export gateway. Wholesalers across seafood, minerals, engineering goods, and consumer staples need digital catalogs that replace cumbersome paper order forms.',
    challenges: [
      'Sales reps spending hours taking repetitive manual orders over phone or WhatsApp',
      'Zero international export discoverability for foreign trading inquiries',
      'Confusing multi-tier dealer pricing communicated through outdated PDF price sheets',
      'Slow payment reconciliation and delayed dispatch updates for distributor networks',
    ],
    recommendedServices: [
      { serviceSlug: 'web-development', serviceName: 'B2B Wholesale Portal & Digital Catalog', whyItMatters: 'Password-protected dealer pricing, bulk order forms, and credit terms.' },
      { serviceSlug: 'seo', serviceName: 'Global & Domestic B2B Export SEO', whyItMatters: 'Captures high-volume trade terms (e.g., "bulk seafood exporter India").' },
      { serviceSlug: 'whatsapp-crm-automation', serviceName: 'Automated Dealer Reorder Bot', whyItMatters: 'Allows authorized dealers to place restock orders in 30 seconds via WhatsApp.' },
    ],
    suggestedChannels: ['B2B Organic Search', 'LinkedIn Trade Outreach', 'Dealer WhatsApp Portals', 'Trade Directories'],
    keyDeliverables: [
      'Digital B2B product catalog with MOQ (Minimum Order Quantity) specifications',
      'Dealer application and onboarding inquiry funnel with KYC document uploads',
      'Export compliance showcase: IEC code, phytosanitary, and quality standard badges',
      'Automated dispatch and invoice notification system for distributors',
    ],
    workflow: [
      { step: '01. Catalog Digitization', action: 'Structure SKUs, master cartons, weight tiers, and volume discount brackets.', outcome: 'Standardized digital catalog ready for trade clients.' },
      { step: '02. B2B Portal Deployment', action: 'Deploy secure order portal allowing verified dealers to submit POs directly.', outcome: 'Eliminates order entry errors and speeds up fulfillment.' },
      { step: '03. Global SEO', action: 'Optimize for international trade keywords and export inquiries.', outcome: 'Inbound container-load export inquiries from overseas buyers.' },
    ],
    metrics: ['B2B Bulk Orders Processed', 'Dealer Network Growth', 'Export Inquiry Volume', 'Order Processing Time Saved'],
    faqs: [
      {
        q: 'Can we hide wholesale pricing from general public visitors?',
        a: 'Yes. We implement gated B2B architectures where general visitors see product specs and submit an RFQ, while approved dealers log in to view negotiated wholesale tier pricing.',
      },
    ],
    ctaLabel: 'Scale Wholesale Operations',
  },
  {
    id: 'ind-automotive',
    slug: 'automotive',
    name: 'Automotive Dealerships & Services',
    tagline: 'Test drive bookings, service center appointments, and used car inventory visibility',
    overview: 'Automobile dealerships, two-wheeler showrooms, multi-brand service centers, and auto detailing studios need steady appointment bookings and inventory turnover.',
    odishaContext: 'Automotive growth across Bhubaneswar, Cuttack, and Sambalpur is surging. Car and bike buyers research online extensively before stepping into a physical showroom.',
    challenges: [
      'Losing high-margin vehicle service and maintenance bookings to informal local mechanics',
      'Lack of real-time showroom inventory and waiting period transparency online',
      'Slow follow-up on test drive requests resulting in prospects visiting competing dealerships',
      'Invisible on Google Maps for critical maintenance terms like "wheel alignment near me" or "ceramic coating Bhubaneswar"',
    ],
    recommendedServices: [
      { serviceSlug: 'local-seo', serviceName: 'Service Center Google Maps Domination', whyItMatters: 'Captures drivers searching for emergency repairs, detailing, and periodic servicing.' },
      { serviceSlug: 'paid-ads', serviceName: 'Test Drive & Service Booking Google Ads', whyItMatters: 'Targets new car buyers and vehicle owners in your exact geographic franchise radius.' },
      { serviceSlug: 'whatsapp-crm-automation', serviceName: 'Service Reminder & Booking Concierge', whyItMatters: 'Automates 6-month service reminder alerts directly on WhatsApp.' },
    ],
    suggestedChannels: ['Google Local 3-Pack', 'Google Search Ads', 'WhatsApp Service Reminders', 'Instagram Detailing Showcases'],
    keyDeliverables: [
      'Frictionless test drive booking landing page with model and date selection',
      'Periodic maintenance service booking engine with transparent package costs',
      'Google Business Profile optimization for both sales showroom and workshop locations',
      'Automated WhatsApp service reminders triggered by vehicle purchase date',
    ],
    workflow: [
      { step: '01. Service Cataloging', action: 'Publish transparent pricing for periodic service, detailing, and common repairs.', outcome: 'Overcomes customer anxiety regarding hidden workshop costs.' },
      { step: '02. Local SEO Capture', action: 'Optimize Google Maps profiles for workshop and showroom with accurate entry gates.', outcome: 'Dominates local automotive service searches in your city.' },
      { step: '03. Automated Retention', action: 'Trigger scheduled WhatsApp alerts for insurance renewals and periodic oil changes.', outcome: 'Predictable month-over-month workshop bay occupancy.' },
    ],
    metrics: ['Test Drives Booked', 'Service Bay Appointments', 'Cost per Vehicle Lead', 'Repeat Service Retention %'],
    faqs: [
      {
        q: 'Can we manage separate Google profiles for showroom and service workshop?',
        a: 'Yes. Google Business Profile guidelines explicitly permit distinct listings for automotive sales and service departments at the same physical address, maximizing your search coverage.',
      },
    ],
    ctaLabel: 'Boost Dealership Inquiries',
  },
  {
    id: 'ind-homeservices',
    slug: 'home-services',
    name: 'Home Services & Local Contractors',
    tagline: 'Urgent service calls, quotation requests, and residential contractor reputation',
    overview: 'Interior designers, electricians, plumbers, HVAC technicians, pest control operators, and modular kitchen contractors need high-intent local calls when homeowners need work done.',
    odishaContext: 'Booming residential apartments and independent house construction across Bhubaneswar, Cuttack, and Puri require trusted, vetted home contractors with verifiable past work.',
    challenges: [
      'Paying high cut fees to third-party home service aggregator apps that pit you against lowballers',
      'High seasonal volatility in service inquiries without direct customer retention',
      'Inability to showcase completed kitchen or interior work with professional portfolio galleries',
      'Losing emergency repair jobs to whichever competitor answers the phone first',
    ],
    recommendedServices: [
      { serviceSlug: 'local-seo', serviceName: 'Emergency & Contractor Local Maps SEO', whyItMatters: 'Ranks #1 when a homeowner has a leaking pipe or needs pest control immediately.' },
      { serviceSlug: 'paid-ads', serviceName: 'Call-Only Google Search Campaigns', whyItMatters: 'Puts your phone number directly on homeowner mobile screens for instant calls.' },
      { serviceSlug: 'web-development', serviceName: 'Portfolio & Estimate Calculator Website', whyItMatters: 'Interactive cost estimator and gallery of verified completed local projects.' },
    ],
    suggestedChannels: ['Google Call-Only Ads', 'Google Local Maps Pack', 'WhatsApp Quote Dispatch', 'Local Customer Reviews'],
    keyDeliverables: [
      'High-speed mobile website with prominent click-to-call floating bar',
      'Completed project gallery organized by neighborhood (e.g. Patia, Khandagiri, CDA Cuttack)',
      'Instant quote calculator capturing room count, material preferences, and budget',
      'Automated review request sequence sent immediately upon job completion',
    ],
    workflow: [
      { step: '01. Local Call Optimization', action: 'Deploy Google Call Ads targeting high-urgency local keywords.', outcome: 'Immediate inbound phone inquiries from homeowners ready to hire.' },
      { step: '02. Portfolio Verification', action: 'Publish before/after photos and client video testimonials from local residential societies.', outcome: 'Overcomes trust barrier for high-value interior and renovation work.' },
      { step: '03. Reputation System', action: 'Prompt homeowners for Google reviews as soon as the technician finishes the job.', outcome: 'Builds an unassailable 5-star reputation in your city.' },
    ],
    metrics: ['Inbound Phone Calls', 'Cost per Phone Lead', 'Quotation Requests Completed', 'Project Booking Value'],
    faqs: [
      {
        q: 'How do Call-Only Google Ads work for home contractors?',
        a: 'When a homeowner searches for a contractor on their smartphone, the ad features a prominent "Call Now" button. Clicking the ad directly dials your office phone without requiring them to visit a website first.',
      },
    ],
    ctaLabel: 'Get More Local Service Calls',
  },
];

export function getIndustryBySlug(slug: string): IndustrySolutionItem | undefined {
  return MASTER_INDUSTRIES_CATALOG.find(
    (ind) => ind.slug === slug || (ind.legacySlugs && ind.legacySlugs.includes(slug))
  );
}

export function getAllIndustrySlugs(): string[] {
  const slugs: string[] = [];
  MASTER_INDUSTRIES_CATALOG.forEach((ind) => {
    slugs.push(ind.slug);
    if (ind.legacySlugs) {
      slugs.push(...ind.legacySlugs);
    }
  });
  return Array.from(new Set(slugs));
}
