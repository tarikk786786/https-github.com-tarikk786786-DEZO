import { siteConfig } from './metadata';

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteConfig.url}/#organization`,
    name: 'DEZO',
    url: siteConfig.url,
    logo: `${siteConfig.url}/dezo-logo-transparent.png`,
    image: `${siteConfig.url}/dezo-logo-transparent.png`,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.355',
      longitude: '85.818',
    },
    founder: siteConfig.founders.map((f) => ({
      '@type': 'Person',
      name: f.name,
      jobTitle: f.role,
    })),
    priceRange: '₹₹ - ₹₹₹₹',
    sameAs: [
      'https://www.linkedin.com/company/dezo-digital',
      'https://www.instagram.com/dezo.in',
    ],
  };
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.shortName,
    description: siteConfig.description,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

export function generateBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === '/' ? '' : item.path}`,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.url}/locations/bhubaneswar/#localbusiness`,
    name: 'DEZO — Digital Commerce & Growth Studio',
    image: `${siteConfig.url}/dezo-logo-transparent.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: `${siteConfig.url}/locations/bhubaneswar`,
    priceRange: '₹₹ - ₹₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '20.355',
      longitude: '85.818',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '19:30',
      },
    ],
    areaServed: [
      { '@type': 'City', name: 'Bhubaneswar' },
      { '@type': 'City', name: 'Cuttack' },
      { '@type': 'AdministrativeArea', name: 'Odisha' },
      { '@type': 'Country', name: 'India' },
    ],
  };
}

export function generateServiceSchema(serviceName: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    description,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    url: `${siteConfig.url}${path}`,
  };
}

export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateSnapSolveSoftwareSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${siteConfig.url}/snapsolve#software`,
    name: 'SnapSolve',
    applicationCategory: 'EducationalApplication',
    applicationSubCategory: 'BrowserExtension',
    operatingSystem: 'Chrome, Chromium',
    browserRequirements: 'Requires Google Chrome or Chromium with Manifest V3 support',
    description:
      'SnapSolve is a Chrome study companion that captures on-screen questions and answers them with free or connected AI models. Made by Tarik Islam.',
    url: `${siteConfig.url}/snapsolve`,
    downloadUrl:
      'https://github.com/tarikk786786/https-github.com-tarikk786786-DEZO/raw/cursor/snapsolve-ai-extension-f701/snapsolve-ai/snapsolve-ai-extension.zip',
    author: {
      '@type': 'Person',
      name: 'Tarik Islam',
      url: 'https://tarikislam.in',
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        name: 'SnapSolve Free',
        description: 'Free LLMs via OpenRouter, Groq, Hugging Face, and local Ollama. Daily solve limits apply.',
      },
      {
        '@type': 'Offer',
        price: '9',
        priceCurrency: 'USD',
        name: 'SnapSolve Pro',
        description: 'Unlock paid cloud providers, higher limits, verification, and custom endpoints.',
        url: 'https://tarikislam.in/#snapsolve-pro',
      },
    ],
    featureList: [
      'Capture questions from any tab',
      'Default free LLM routing',
      'Connect OpenAI, Gemini, Claude, Groq, and more',
      'Local Ollama and LM Studio support',
      'Privacy-first: keys stay in the extension',
    ],
    isAccessibleForFree: true,
  };
}
