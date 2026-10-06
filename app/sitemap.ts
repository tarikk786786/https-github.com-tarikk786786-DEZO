import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://dezo.in';
  const currentDate = new Date();

  return [
    { url: baseUrl, lastModified: currentDate, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/solutions`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/solutions/build`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solutions/brand`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solutions/marketplace`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/solutions/growth`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/solutions/intelligence`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/locations/odisha`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/locations/bhubaneswar`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/industries`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/marketplace`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/tools`, lastModified: currentDate, changeFrequency: 'daily', priority: 0.95 },
    { url: `${baseUrl}/tools/seo`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/shopify`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/amazon`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/tools/flipkart`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/tools/page-speed`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/tools/cro`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/tools/keywords`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/tools/local-seo`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/work`, lastModified: currentDate, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/start-a-project`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.95 },
    { url: `${baseUrl}/contact`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${baseUrl}/about`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/lab`, lastModified: currentDate, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${baseUrl}/privacy`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/disclaimer`, lastModified: currentDate, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
