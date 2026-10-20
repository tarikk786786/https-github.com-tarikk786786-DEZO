/**
 * DEZO Careers & Internship Program Registry
 * Centralized, editable configuration for recruitment, 1-month guided training,
 * career learning tracks, WhatsApp application generators, and hiring standards.
 * Follows PRD specifications with 100% honesty and zero fabricated claims.
 */

export interface CareerTrackItem {
  id: string;
  name: string;
  tagline: string;
  badge: string;
  whatYouWillLearn: string[];
  exampleAssignments: string[];
  requirements: string[];
  relevantTools: string[];
  possibleProgression: string;
  active: boolean;
}

export const CAREERS_CONFIG = {
  headline: "WE'RE ALWAYS HIRING.",
  supportingHeadline: 'Learn digital marketing. Build real skills. Grow your career with DEZO.',
  heroCopy:
    "Want to build a career in digital marketing but don't know where to start? DEZO offers a guided, one-month internship and training opportunity where you learn through practical assignments, expert guidance and feedback. Start from your current skill level, demonstrate what you can do, and earn the opportunity to work with our team.",
  chips: [
    'Work From Home First',
    'One-Month Guided Training',
    'Class 12 or Equivalent',
    'Laptop and Internet Required',
    'Open to All Genders',
  ],
  eligibility: {
    education: 'Class 12 pass or an equivalent qualification',
    ageRange: '23–30 years (configurable per role)',
    gender: 'Open to all genders',
    backgrounds: 'Candidates from any educational or professional background may apply',
    hardware: 'Personal laptop or desktop computer required',
    internet: 'Stable broadband / 4G internet connection required',
    mindset: 'Willingness to learn, accept constructive feedback, and communicate reliably',
    experienceRequired: false,
  },
  workModel: {
    primary: 'Remote-First / Work From Home',
    primaryDesc:
      'The role is designed primarily for Work From Home. Candidates complete suitable assignments remotely from their home using their own laptop and internet connection.',
    occasional: 'Occasional In-Person Collaboration',
    occasionalDesc:
      'Depending on the assignment, selected candidates may be asked to attend the DEZO studio in Patia, Bhubaneswar or visit a client project location. Such tasks will be explained in advance, and candidates will receive relevant training, instructions, travel arrangements, and expense reimbursement before being assigned responsibilities.',
    studioCity: 'Bhubaneswar, Odisha',
    hoursExpectation:
      'Candidates are expected to be reachable during agreed working hours (Monday to Friday standard daytime windows), not available around the clock. Expected working hours and deadlines are communicated before onboarding.',
  },
  compensationPolicy: {
    title: 'Learn First. Demonstrate Your Skills. Grow Through Performance.',
    statement:
      "During the first month, you'll receive guided training and practical assignments. At the end of the period, DEZO will review your progress and discuss whether there is a suitable opportunity to continue.\n\nDepending on your skills, performance and the work available, opportunities may include a salaried role or project-based/task-based engagement. The role, compensation, payment schedule, responsibilities and working arrangements will be explained before you accept an offer.",
    noFeesNote:
      'DEZO never charges any recruitment fee, registration fee, or training fee. You will never be asked to pay money or purchase mandatory courses to apply or work with DEZO.',
    disclaimer:
      'Completing the internship does not guarantee employment. Any employment or task-based engagement will depend on performance, available business requirements, and mutually agreed written terms.',
  },
  whatsappNumber: '919114411026',
  whatsappFormatted: '+91 91144 11026',
};

/**
 * Generate official URL-encoded WhatsApp application link
 */
export function generateCareersWhatsAppUrl(preferredTrack: string = 'Digital Marketing Trainee'): string {
  const messageText = `Hello DEZO Team, I would like to apply for the Work-From-Home Digital Marketing Internship and Training Program.

Name: 
Age: 
Highest qualification: 
Current city and state: 
Preferred learning track: ${preferredTrack}
Laptop available: Yes/No
Stable internet available: Yes/No
Previous experience, if any: 
Availability: 
Portfolio or work sample, if any: 

I would like to share my CV for consideration. Please let me know the next steps.`;

  return `https://wa.me/${CAREERS_CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * 4-Week Internship Training Curriculum
 */
export const INTERNSHIP_TIMELINE = [
  {
    week: 'WEEK 01',
    title: 'Orientation & Commercial Foundations',
    summary: 'Master DEZO operating standards, digital marketing mechanics, and task accountability.',
    deliverables: [
      'Introduction to DEZO commercial workflow, project boards, and client standards',
      'Fundamentals of online business models: Websites, D2C, Amazon, and local search',
      'Task management tools, daily briefing logs, and professional communication',
      'Baseline skills assessment and personalized learning roadmap configuration',
    ],
  },
  {
    week: 'WEEK 02',
    title: 'Guided Practical Assignments',
    summary: 'Apply core concepts to real-world simulated assignments with hands-on mentor feedback.',
    deliverables: [
      'Keyword research and commercial search intent clustering',
      'Google Business Profile audit and local SEO citation fundamentals',
      'Social media content calendar structure and post briefing',
      'Basic advertising concepts: Audience targeting, creative testing, and funnel stages',
      'Website evaluation checklists: Speed, mobile UX, and conversion friction',
    ],
  },
  {
    week: 'WEEK 03',
    title: 'Track Specialization & Skill Building',
    summary: 'Deep-dive into your chosen track with progressively challenging guided tasks.',
    deliverables: [
      'Execution of specialized assignments in your chosen learning track (SEO, Social, Ads, Web, etc.)',
      'Hands-on tool training using free and industry-standard workflows',
      'Iterative feedback loops: Reviewing task quality, accuracy, and execution speed',
      'Understanding commercial deliverables and client reporting dashboards',
    ],
  },
  {
    week: 'WEEK 04',
    title: 'Final Assessment & Next Steps',
    summary: 'Comprehensive evaluation of assignment quality, communication, and mutual suitability.',
    deliverables: [
      'Submission and review of final capstone assignment portfolio',
      'Evaluation of reliability, task completion rate, and openness to feedback',
      'One-on-one exit discussion with DEZO leadership on performance outcomes',
      'Discussion of potential opportunities: Salaried role, project-based engagement, or development plan',
    ],
  },
];

/**
 * Training across DEZO's 7 Core Service Ecosystems
 */
export const SERVICE_TRAINING_AREAS = [
  {
    category: 'Search & SEO',
    topics: [
      'Technical SEO hygiene',
      'On-page & Local SEO',
      'Keyword research & intent',
      'Google Business Profile ranking',
      'Content optimization & Schema',
      'Search Console auditing',
    ],
  },
  {
    category: 'Social Media & Content',
    topics: [
      'Strategic content calendars',
      'Instagram, LinkedIn & YouTube ops',
      'Hook writing & copywriting',
      'Reels & vertical video scripts',
      'Creative briefing & aesthetics',
      'Audience engagement analytics',
    ],
  },
  {
    category: 'Paid Advertising',
    topics: [
      'Google Search & Shopping basics',
      'Meta (FB/IG) Ads fundamentals',
      'Audience targeting & research',
      'Creative angles & split testing',
      'Conversion tracking concepts',
      'ROAS & budget pacing',
    ],
  },
  {
    category: 'Websites & eCommerce',
    topics: [
      'Website QA & responsive testing',
      'Landing page CRO fundamentals',
      'WordPress & Shopify workflows',
      'Product catalog optimization',
      'Mobile checkout friction audits',
      'Core Web Vitals observation',
    ],
  },
  {
    category: 'Lead Generation & CRM',
    topics: [
      'High-intent B2B lead research',
      'Inquiry qualification criteria',
      'WhatsApp Business Cloud flows',
      'Email marketing & newsletters',
      'CRM pipeline management',
      'Automated follow-up cadences',
    ],
  },
  {
    category: 'Design & Multimedia',
    topics: [
      'Social media carousel design',
      'High-contrast banner graphics',
      'Brand typography & color rules',
      'Image sizing & compression',
      'Basic video editing & pacing',
      'Client report visualization',
    ],
  },
  {
    category: 'Analytics, AI & Automation',
    topics: [
      'Google Analytics 4 fundamentals',
      'Search Console performance logs',
      'Marketing KPI dashboards',
      'Responsible AI-assisted research',
      'Workflow automation concepts',
      'Zero-leakage data ethics',
    ],
  },
];

/**
 * 11 Configurable Career Learning Tracks
 */
export const CAREER_TRACKS: CareerTrackItem[] = [
  {
    id: 'digital-marketing-trainee',
    name: 'Digital Marketing Trainee',
    tagline: 'General digital marketing foundation covering search, social, ads, and web operations.',
    badge: 'Flagship Track',
    whatYouWillLearn: [
      'How digital businesses acquire, engage, and convert customers online',
      'Basic search engine optimization, local Google Maps, and social media posting',
      'Introduction to paid advertising campaigns and website conversion tracking',
      'Daily task reporting and professional client communication',
    ],
    exampleAssignments: [
      'Conduct a 20-point digital presence audit for a local retail brand',
      'Build a 14-day multi-channel marketing content calendar',
      'Identify top 5 competitor strengths and weaknesses for an eCommerce product',
    ],
    requirements: ['Class 12 pass', 'Laptop and stable internet', 'Curiosity and reliable communication'],
    relevantTools: ['Google Docs/Sheets', 'Canva', 'Google Search Console', 'Meta Business Suite'],
    possibleProgression: 'Junior Growth Associate / Account Coordinator',
    active: true,
  },
  {
    id: 'seo-trainee',
    name: 'SEO & Search Trainee',
    tagline: 'Master organic search engine ranking, technical hygiene, and local Google Maps.',
    badge: 'High Demand',
    whatYouWillLearn: [
      'Keyword research, search volume analysis, and commercial intent mapping',
      'On-page title tags, meta descriptions, heading structures, and internal linking',
      'Google Business Profile setup, category optimization, and local citation audit',
      'Technical SEO basics: Crawlability, indexation, sitemaps, and robots.txt',
    ],
    exampleAssignments: [
      'Map 30 high-intent commercial keywords for an Odisha dental clinic',
      'Audit a live website for broken links, missing H1s, and duplicate meta tags',
      'Optimize a Google Business Profile listing with geo-relevant photo updates',
    ],
    requirements: ['Analytical mindset', 'Attention to detail', 'Comfort with spreadsheets'],
    relevantTools: ['Google Search Console', 'Screaming Frog (Free)', 'Ahrefs Webmaster Tools', 'Google Sheets'],
    possibleProgression: 'Junior SEO Specialist / Local SEO Executive',
    active: true,
  },
  {
    id: 'social-media-trainee',
    name: 'Social Media Trainee',
    tagline: 'Create strategic content, schedule engaging carousels, and manage brand communities.',
    badge: 'Creative Track',
    whatYouWillLearn: [
      'Monthly content calendar planning based on customer pain points and questions',
      'Writing high-engagement hooks, captions, and call-to-actions',
      'Coordinating with designers and editors for video and graphic publishing',
      'Community management: Responding to comments and triaging direct message leads',
    ],
    exampleAssignments: [
      'Draft 12 Instagram post captions with hooks and relevant hashtag clusters',
      'Design a 5-slide educational carousel for an educational coaching brand',
      'Track 30-day reach and engagement metrics across 3 competitor social pages',
    ],
    requirements: ['Good written communication', 'Understanding of Instagram/LinkedIn dynamics', 'Creative curiosity'],
    relevantTools: ['Meta Business Suite', 'Canva', 'Notion', 'CapCut'],
    possibleProgression: 'Social Media Executive / Community Manager',
    active: true,
  },
  {
    id: 'content-writing-trainee',
    name: 'Content Writing Trainee',
    tagline: 'Write persuasive website copy, informative articles, and commercial ad copy.',
    badge: 'Writing Track',
    whatYouWillLearn: [
      'Commercial copywriting principles: Benefits over features, clear value propositions',
      'SEO content writing: Keyword incorporation without keyword stuffing',
      'Writing engaging email newsletters, landing page headlines, and FAQ answers',
      'Editing and proofreading for clean grammar and brand tone consistency',
    ],
    exampleAssignments: [
      'Write a 800-word informative guide on "How to Choose a CBSE School in Bhubaneswar"',
      'Draft 3 variations of ad headlines and bullet points for a D2C handloom brand',
      'Structure an informative FAQ section for an industrial equipment supplier',
    ],
    requirements: ['Clear written English or Odia/Hindi', 'Research capability', 'Zero tolerance for plagiarism'],
    relevantTools: ['Google Docs', 'Grammarly', 'Hemingway Editor'],
    possibleProgression: 'Junior Copywriter / Content Strategist',
    active: true,
  },
  {
    id: 'graphic-design-trainee',
    name: 'Graphic Design Trainee',
    tagline: 'Design sharp, high-contrast social banners, marketing graphics, and brand assets.',
    badge: 'Design Track',
    whatYouWillLearn: [
      'Color harmony, typographic hierarchy, and whitespace balance',
      'Designing social media carousels, ad creatives, and promotional banners',
      'Image preparation, aspect ratios (1:1, 4:5, 9:16, 16:9), and WebP export optimization',
      'Working within client brand guidelines and design systems',
    ],
    exampleAssignments: [
      'Design 3 variations of a festive discount banner for an ethnic wear store',
      'Create a 6-slide informative carousel using brand fonts and colors',
      'Prepare resized social asset bundles for Instagram, Facebook, and LinkedIn',
    ],
    requirements: ['Visual sense and eye for aesthetics', 'Basic familiarity with Figma or Canva', 'Laptop capable of running design software'],
    relevantTools: ['Figma (Free tier)', 'Canva Pro', 'Photopea / Photoshop'],
    possibleProgression: 'Junior Visual Designer / Creative Associate',
    active: true,
  },
  {
    id: 'video-editing-trainee',
    name: 'Video Editing & Reels Trainee',
    tagline: 'Edit punchy vertical Reels, product walkthroughs, and social video ads.',
    badge: 'Video Track',
    whatYouWillLearn: [
      'Vertical video editing fundamentals (9:16 aspect ratio, mobile pacing)',
      'Hook placement in the first 3 seconds to maximize video retention',
      'Adding dynamic captions, sound effects, transitions, and B-roll cutaways',
      'Exporting optimized video files without quality loss',
    ],
    exampleAssignments: [
      'Edit a 30-second customer testimonial Reel with subtitles and background audio',
      'Create a fast-paced product unboxing video from raw phone footage',
      'Add animated lower-thirds and captions to an interview soundbite',
    ],
    requirements: ['Laptop with decent processing power', 'Basic video editing familiarity', 'Sense of rhythm and pacing'],
    relevantTools: ['CapCut Desktop (Free)', 'DaVinci Resolve / Premiere Pro'],
    possibleProgression: 'Short-Form Video Editor / Multimedia Associate',
    active: true,
  },
  {
    id: 'paid-ads-trainee',
    name: 'Paid Advertising (PPC) Trainee',
    tagline: 'Learn Google Search, Shopping, and Meta Ads campaign structure and pacing.',
    badge: 'Performance Track',
    whatYouWillLearn: [
      'Campaign hierarchy: Campaign, Ad Set/Ad Group, and Ad Creatives',
      'Google Search keyword match types, negative keywords, and quality scores',
      'Meta Ads targeting options, lookalike concepts, and creative rotation',
      'Conversion tracking fundamentals and calculating Return on Ad Spend (ROAS)',
    ],
    exampleAssignments: [
      'Structure a Google Search campaign outline for a local home service contractor',
      'Identify 30 negative keywords to eliminate wasted ad spend for a luxury resort',
      'Analyze a weekly ad spend report to calculate Cost Per Lead (CPL)',
    ],
    requirements: ['Strong numerical sense', 'Interest in data and consumer psychology', 'Disciplined attention to detail'],
    relevantTools: ['Google Ads Simulator', 'Meta Ads Manager', 'Google Sheets'],
    possibleProgression: 'Junior Media Buyer / Performance Marketing Assistant',
    active: true,
  },
  {
    id: 'website-shopify-assistant',
    name: 'Website & Shopify Assistant',
    tagline: 'Support website builds, Shopify catalog uploads, and mobile UX checks.',
    badge: 'Tech & Commerce',
    whatYouWillLearn: [
      'Shopify admin navigation: Adding products, variants, collections, and tags',
      'Website content management: Updating text, images, and blog posts',
      'Mobile QA testing: Checking forms, navigation menus, and page speed benchmarks',
      'Payment gateway checkout testing and Cash on Delivery order verification',
    ],
    exampleAssignments: [
      'Upload a 15-product catalog to a test Shopify store with images, variants, and descriptions',
      'Perform a 30-point responsive layout checklist across phone and desktop viewports',
      'Test order placement and verify automated order confirmation notifications',
    ],
    requirements: ['Basic computer literacy', 'Methodical testing patience', 'Interest in web technologies'],
    relevantTools: ['Shopify Admin', 'WordPress CMS', 'Chrome DevTools', 'Google Sheets'],
    possibleProgression: 'eCommerce Operations Executive / Web QA Associate',
    active: true,
  },
  {
    id: 'ecommerce-marketing-trainee',
    name: 'eCommerce Marketing Trainee',
    tagline: 'Amazon & Flipkart listing operations, catalog health, and festive promotions.',
    badge: 'Marketplaces',
    whatYouWillLearn: [
      'Amazon Seller Central and Flipkart Seller Hub interface navigation',
      'Writing keyword-indexed product titles, bullet points, and search terms',
      'Amazon A+ content layout and Brand Store structure basics',
      'Catalog error remediation and stranded inventory checks',
    ],
    exampleAssignments: [
      'Optimize an Amazon India listing title and 5 bullet points using high-volume search terms',
      'Audit an existing Flipkart catalog for Listing Quality Score (LQS) improvements',
      'Design a multi-panel A+ content wireframe for a packaged spice brand',
    ],
    requirements: ['Interest in online shopping and retail', 'Good writing and organization skills', 'Basic spreadsheet competence'],
    relevantTools: ['Amazon Seller Central', 'Flipkart Seller Hub', 'Excel / Sheets'],
    possibleProgression: 'Marketplace Operations Executive',
    active: true,
  },
  {
    id: 'lead-generation-crm-assistant',
    name: 'Lead Generation & CRM Assistant',
    tagline: 'Research high-intent prospective buyers and manage incoming sales inquiries.',
    badge: 'Sales Operations',
    whatYouWillLearn: [
      'B2B prospective client research using publicly available business registries',
      'Inquiry qualification: Categorizing leads by budget, location, and urgency',
      'CRM pipeline management: Updating deal stages, notes, and follow-up reminders',
      'WhatsApp Business communication workflows and quick-reply management',
    ],
    exampleAssignments: [
      'Research and compile contact profiles for 25 manufacturing suppliers in Odisha',
      'Classify 20 inbound customer inquiries by priority and service interest',
      'Configure automated WhatsApp quick-reply templates for common business inquiries',
    ],
    requirements: ['Organized and prompt communication', 'Ethical data hygiene (no scraped spam)', 'Reliable follow-through'],
    relevantTools: ['Zoho CRM (Free tier)', 'HubSpot CRM', 'WhatsApp Business App', 'Google Sheets'],
    possibleProgression: 'Inbound Sales Development / CRM Coordinator',
    active: true,
  },
  {
    id: 'marketing-automation-trainee',
    name: 'Marketing Automation Trainee',
    tagline: 'Connect web forms, WhatsApp APIs, and automated reporting pipelines.',
    badge: 'Automation Track',
    whatYouWillLearn: [
      'Workflow automation principles: Triggers, actions, filters, and routers',
      'Connecting website form submissions to Google Sheets, email, and WhatsApp via webhooks',
      'Setting up automated email welcome sequences and abandoned cart reminders',
      'Building automated daily or weekly marketing summary briefings',
    ],
    exampleAssignments: [
      'Build a simple automation connecting a website contact form to a Google Sheet and Slack/Email alert',
      'Map an automated 3-step WhatsApp order follow-up workflow',
      'Configure an automated weekly performance summary email template',
    ],
    requirements: ['Logical thinking', 'Basic understanding of if-then logic', 'Curiosity for no-code tools'],
    relevantTools: ['Make / Zapier (Free tier)', 'n8n', 'Google Apps Script', 'Webhooks'],
    possibleProgression: 'Marketing Automation Associate / Workflow Specialist',
    active: true,
  },
];

/**
 * 5-Step Transparent Hiring Process
 */
export const HIRING_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Submit Introduction & CV',
    desc: 'Send your basic details and CV via WhatsApp (+91 9114411026) or the online application form. Tell us which learning track interests you most.',
  },
  {
    step: '02',
    title: 'Screening & Eligibility Review',
    desc: 'Our team reviews your educational qualification (Class 12+), laptop/internet setup, and availability. We look for motivation, not prior mastery.',
  },
  {
    step: '03',
    title: 'Introductory Conversation',
    desc: 'Shortlisted candidates attend a friendly 15-minute phone or video conversation to discuss expectations, working hours, and the training schedule.',
  },
  {
    step: '04',
    title: 'One-Month Guided Internship',
    desc: 'Complete 4 weeks of structured, remote-first training with weekly assignments, tool walk-throughs, and constructive mentor feedback.',
  },
  {
    step: '05',
    title: 'Performance Review & Next Steps',
    desc: 'Discuss your progress and achievements. Top performers may receive offers for salaried roles or project-based engagements based on mutual agreement.',
  },
];

/**
 * Comprehensive FAQs (18 honest questions & answers)
 */
export const CAREERS_FAQS = [
  {
    q: 'Is DEZO really always hiring?',
    a: "Yes. As a growing digital growth company, we are constantly expanding our candidate talent pool. We welcome applications on an ongoing basis from motivated individuals who want to learn digital marketing and build real commercial skills.",
  },
  {
    q: 'Is this a Work From Home opportunity?',
    a: 'Yes, it is designed primarily as remote-first. You can complete suitable training tasks from home using your own laptop and internet connection. However, depending on specific assignments or client projects, occasional in-person visits to our Patia, Bhubaneswar studio or local client sites may be required with prior notice and travel reimbursement.',
  },
  {
    q: 'Do I need previous digital marketing experience to apply?',
    a: 'No. Prior experience is not mandatory for our trainee pathway. We evaluate applicants on their curiosity, reliability, communication, and willingness to learn through practical assignments.',
  },
  {
    q: 'Is a Class 12 qualification sufficient?',
    a: 'Yes. Candidates who have successfully passed Class 12 (or an equivalent diploma/qualification) and possess basic computer and typing skills are fully eligible to apply.',
  },
  {
    q: 'What is the requested age range?',
    a: 'DEZO generally considers applicants aged 23–30 years for this program. However, motivated candidates with strong availability and commitment outside this range are welcome to submit their details for review.',
  },
  {
    q: 'Can candidates of all genders apply?',
    a: 'Yes, absolutely. DEZO encourages applications from candidates of all genders and diverse backgrounds.',
  },
  {
    q: 'Do I need my own laptop and internet?',
    a: 'Yes. Because training tasks involve researching on search engines, writing copy, managing spreadsheets, and testing software tools, a personal laptop or desktop computer with a stable internet connection is essential.',
  },
  {
    q: 'How long does the internship program last?',
    a: 'The guided internship and training program runs for exactly one month (4 weeks).',
  },
  {
    q: 'What happens during the one-month training?',
    a: 'Week 1 covers orientation and foundational digital marketing concepts. Week 2 introduces guided practical assignments. Week 3 focuses on track-specific skill development. Week 4 concludes with a capstone assessment and performance review.',
  },
  {
    q: 'Will DEZO provide mentor guidance and feedback?',
    a: 'Yes. You will receive structured instructions, example templates, and actionable constructive feedback on every assignment to help you improve your practical skills.',
  },
  {
    q: 'Which digital marketing services can I learn?',
    a: 'You will be introduced to SEO, Local Google Maps ranking, paid advertising on Google and Meta, social media management, website and Shopify storefronts, lead generation funnels, and marketing automation.',
  },
  {
    q: 'Is employment guaranteed after completing the one-month internship?',
    a: 'No. Completing the internship does not guarantee automatic employment or a guaranteed salary. Progression depends entirely on your demonstrated performance, task reliability, business requirements, and mutually agreed written terms.',
  },
  {
    q: 'Will the next role be salaried or project-based?',
    a: 'Depending on your demonstrated capabilities and available company projects, opportunities may include a monthly salaried role or a task-based/project-based engagement. All terms are presented and agreed in writing before onboarding.',
  },
  {
    q: 'Will there be mandatory office or client field visits?',
    a: 'The majority of work is remote. However, if a specific client project requires an on-site visit or studio workshop in Bhubaneswar, it will be communicated well in advance, and applicable travel expenses will be reimbursed.',
  },
  {
    q: 'Are there any recruitment, application, or training fees?',
    a: 'ZERO. DEZO never charges any fee from applicants at any stage. Beware of fraudulent agencies asking for registration fees—DEZO is 100% free to apply.',
  },
  {
    q: 'How do I submit my CV through WhatsApp?',
    a: 'Clicking the "Apply on WhatsApp" button opens an official WhatsApp chat with our hiring team (+91 9114411026) with pre-filled details. Once the chat opens, use the WhatsApp attachment icon (paperclip) to attach your PDF or DOCX resume manually before sending.',
  },
  {
    q: 'How will I know whether I have been shortlisted?',
    a: 'Our recruitment team reviews submissions weekly. Shortlisted applicants will receive a direct WhatsApp message or email within 3 to 7 business days to coordinate a 15-minute introductory call.',
  },
  {
    q: 'Can I apply if I do not have a portfolio or prior work samples?',
    a: 'Yes. If you have no past work, simply leave the portfolio field blank or share any college project, writing sample, or social media link you have managed. The internship is designed specifically to help you build your first commercial portfolio.',
  },
];
