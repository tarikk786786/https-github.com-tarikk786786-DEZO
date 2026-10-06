import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid 10-digit phone number.' }),
  businessName: z.string().optional(),
  city: z.string().optional(),
  service: z.enum([
    'Website Development',
    'Ecommerce Architecture',
    'SEO & Organic Growth',
    'Meta & Google Ads',
    'AI & Automation',
    'Bespoke Engineering',
  ], {
    message: 'Please select a service.',
  }),
  budget: z.enum([
    'Under ₹50,000',
    '₹50,000 - ₹1,00,000',
    '₹1,00,000 - ₹2,50,000',
    '₹2,50,000+',
    'Undisclosed',
  ]).optional(),
  message: z.string().min(10, { message: 'Please write a message of at least 10 characters.' }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

/**
 * Generates the direct executive WhatsApp URL with formatted pre-filled message.
 * Executive Phone: +91 9114411026
 */
export function buildWhatsAppLeadUrl(data: ContactFormData): string {
  const textMessage =
    `Hello DEZO Team! 👋\n\n` +
    `I would like to discuss a project. Here are my details:\n\n` +
    `🧑 *Name:* ${data.name}\n` +
    `📧 *Email:* ${data.email}\n` +
    `📞 *Phone:* ${data.phone}\n` +
    `🏢 *Business:* ${data.businessName || 'N/A'}\n` +
    `📍 *City:* ${data.city || 'N/A'}\n` +
    `🛠️ *Service Needed:* ${data.service}\n` +
    `💰 *Budget Range:* ${data.budget || 'To be discussed'}\n\n` +
    `💬 *Brief:* \n${data.message}\n\n` +
    `Looking forward to hearing from you!`;

  return `https://wa.me/919114411026?text=${encodeURIComponent(textMessage)}`;
}
