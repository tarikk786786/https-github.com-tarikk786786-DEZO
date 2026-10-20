import { MetadataRoute } from 'next';
import { getAllServiceSlugs } from '@/content/services-catalog';
import { getAllIndustrySlugs } from '@/content/industries-catalog';
import { getAllLocationSlugs } from '@/content/locations-catalog';

const TOOL_SLUGS = [
  'seo',
  'shopify',
  'amazon',
  'flipkart',
  'page-speed',
  'cro',
  'keywords',
  'local-seo',
  'security',
  'accessibility',
  'brand',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dezo.in';
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/industries`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/locations`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/growth-lab`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/marketplace`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/promise`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/results`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/start-a-project`, lastModified: now, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/badges`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/solutions`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/book-strategy-call`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const services = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const industries = getAllIndustrySlugs().map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  const locations = getAllLocationSlugs().map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  const tools = [
    ...TOOL_SLUGS.map((slug) => ({
      url: `${baseUrl}/tools/${slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/tools/backlinks`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const solutions = ['build', 'brand', 'marketplace', 'growth', 'intelligence'].map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...core, ...services, ...industries, ...locations, ...tools, ...solutions];
}
