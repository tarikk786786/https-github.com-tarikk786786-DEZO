import { z } from 'zod';

export const creatorRegisterSchema = z.object({
  displayName: z.string().min(2, 'Display name is required.'),
  email: z.string().email('Enter a valid email.'),
  phone: z.string().min(10, 'Enter a valid phone / WhatsApp number.'),
  city: z.string().min(2, 'City is required.'),
  state: z.string().min(2, 'State is required.'),
  languages: z.string().min(2, 'List languages you create in.'),
  niches: z.string().min(2, 'List content niches.'),
  platforms: z.string().min(2, 'List platforms (Instagram, YouTube, etc.).'),
  audienceSize: z.string().min(1, 'Audience size range is required.'),
  collaborationTypes: z.string().min(2, 'Select collaboration types you accept.'),
  portfolioUrl: z.string().url('Enter a valid portfolio or profile URL.').optional().or(z.literal('')),
  primaryProfileUrl: z.string().url('Enter a valid primary social profile URL.'),
  minRate: z.string().optional(),
  availability: z.string().optional(),
  notes: z.string().optional(),
  acceptTerms: z.boolean().refine((v) => v === true, {
    message: 'You must accept the creator terms to register.',
  }),
});

export type CreatorRegisterData = z.infer<typeof creatorRegisterSchema>;

export function buildCreatorWhatsAppUrl(data: CreatorRegisterData): string {
  const text =
    `Hello DEZO — Creator registration\n\n` +
    `Name: ${data.displayName}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n` +
    `Location: ${data.city}, ${data.state}\n` +
    `Languages: ${data.languages}\n` +
    `Niches: ${data.niches}\n` +
    `Platforms: ${data.platforms}\n` +
    `Audience: ${data.audienceSize}\n` +
    `Collaboration types: ${data.collaborationTypes}\n` +
    `Primary profile: ${data.primaryProfileUrl}\n` +
    `Portfolio: ${data.portfolioUrl || 'N/A'}\n` +
    `Min rate: ${data.minRate || 'To discuss'}\n` +
    `Availability: ${data.availability || 'N/A'}\n` +
    `Notes: ${data.notes || 'N/A'}`;

  return `https://wa.me/919114411026?text=${encodeURIComponent(text)}`;
}
