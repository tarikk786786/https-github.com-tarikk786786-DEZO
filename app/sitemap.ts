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

  const core: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/industries`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/locations`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/work`, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/growth-lab`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/marketplace`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/promise`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/results`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/start-a-project`, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/badges`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/careers`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/resources`, changeFrequency: 'weekly', priority: 0.75 },
    { url: `${baseUrl}/solutions`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/book-strategy-call`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const services = getAllServiceSlugs().map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const industries = getAllIndustrySlugs().map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  const locations = getAllLocationSlugs().map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.88,
  }));

  const tools = [
    ...TOOL_SLUGS.map((slug) => ({
      url: `${baseUrl}/tools/${slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/tools/backlinks`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  const solutions = ['build', 'brand', 'marketplace', 'growth', 'intelligence'].map((slug) => ({
    url: `${baseUrl}/solutions/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  return [...core, ...services, ...industries, ...locations, ...tools, ...solutions];
}
