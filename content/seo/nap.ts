/**
 * NAP (Name, Address, Phone) — single source of truth.
 * Only publish what matches content/site.ts contact + company facts.
 */

import { brand, contact } from '@/content/site';

export const napCanonical = {
  name: brand.name,
  legalDisplay: 'DEZO',
  phone: contact.phone,
  phoneFormatted: contact.phoneFormatted,
  phoneAlt: contact.phoneAlt,
  email: contact.email,
  street: contact.address.street,
  city: contact.address.city,
  region: contact.address.region,
  postalCode: contact.address.postalCode,
  country: contact.address.country,
  countryName: 'India',
  fullAddress: `${contact.address.street}, ${contact.address.city}, ${contact.address.region} ${contact.address.postalCode}, India`,
  mapsQuery: `${contact.address.street}, ${contact.address.city}, Odisha ${contact.address.postalCode}`,
  /** Approximate studio coordinates — refine if GBP provides verified pin */
  geo: { lat: 20.355, lng: 85.818 },
  hoursNote: 'Mon–Sat 09:30–19:30 IST (by appointment for studio visits)',
} as const;

export const napSurfaces = [
  { surface: 'Website footer', path: 'components/dezo/DezoFooter.tsx', status: 'aligned' },
  { surface: 'Contact page', path: 'app/contact', status: 'verify-on-change' },
  { surface: 'Bhubaneswar location', path: 'app/locations/bhubaneswar', status: 'aligned' },
  { surface: 'Odisha location', path: 'app/locations/odisha', status: 'aligned' },
  { surface: 'Organization JSON-LD', path: 'lib/seo/jsonld.ts', status: 'aligned' },
  { surface: 'LocalBusiness JSON-LD', path: 'lib/seo/jsonld.ts', status: 'aligned' },
  { surface: 'Google Business Profile', path: 'external', status: 'manual-audit-required' },
] as const;
