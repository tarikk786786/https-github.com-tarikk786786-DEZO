import { z } from 'zod';

export const campaignInquirySchema = z.object({
  brandName: z.string().min(2, 'Brand or company name is required.'),
  contactName: z.string().min(2, 'Contact person name is required.'),
  email: z.string().email('Enter a valid business email.'),
  phone: z.string().min(10, 'Enter a valid phone / WhatsApp number.'),
  website: z.string().url('Enter a valid website URL.').optional().or(z.literal('')),
  industry: z.string().min(2, 'Industry is required.'),
  productOrService: z.string().min(5, 'Describe the product or service.'),
  targetMarket: z.string().min(2, 'Target market / locations are required.'),
  platforms: z.string().min(2, 'Select or describe preferred platforms.'),
  creatorCategories: z.string().min(2, 'Creator categories are required.'),
  approximateCreators: z.string().min(1, 'Approximate creator count is required.'),
  objective: z.string().min(10, 'Campaign objective must be at least 10 characters.'),
  budgetRange: z.enum([
    'Under ₹50,000',
    '₹50,000 – ₹1,50,000',
    '₹1,50,000 – ₹5,00,000',
    '₹5,00,000+',
    'To be scoped',
  ]),
  collaborationModel: z.enum([
    'Paid collaboration',
    'Barter / product exchange',
    'Free product',
    'Affiliate / commission',
    'Hybrid (fee + commission)',
    'UGC-only',
    'Brand ambassador',
    'Mixed / unsure',
  ]),
  deliverables: z.string().min(5, 'List required deliverables.'),
  timeline: z.string().min(2, 'Campaign timing is required.'),
  shippingRequired: z.enum(['Yes', 'No', 'Not sure']),
  usageRights: z.string().optional(),
  notes: z.string().optional(),
});

export type CampaignInquiryData = z.infer<typeof campaignInquirySchema>;

export function buildCampaignWhatsAppUrl(data: CampaignInquiryData): string {
  const text =
    `Hello DEZO — Campaign inquiry\n\n` +
    `Brand: ${data.brandName}\n` +
    `Contact: ${data.contactName}\n` +
    `Email: ${data.email}\n` +
    `Phone: ${data.phone}\n` +
    `Website: ${data.website || 'N/A'}\n` +
    `Industry: ${data.industry}\n` +
    `Product/Service: ${data.productOrService}\n` +
    `Target market: ${data.targetMarket}\n` +
    `Platforms: ${data.platforms}\n` +
    `Creator categories: ${data.creatorCategories}\n` +
    `Approx. creators: ${data.approximateCreators}\n` +
    `Objective: ${data.objective}\n` +
    `Budget: ${data.budgetRange}\n` +
    `Model: ${data.collaborationModel}\n` +
    `Deliverables: ${data.deliverables}\n` +
    `Timeline: ${data.timeline}\n` +
    `Shipping: ${data.shippingRequired}\n` +
    `Usage rights: ${data.usageRights || 'N/A'}\n` +
    `Notes: ${data.notes || 'N/A'}`;

  return `https://wa.me/919114411026?text=${encodeURIComponent(text)}`;
}
