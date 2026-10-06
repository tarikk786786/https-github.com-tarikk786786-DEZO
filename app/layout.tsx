import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/design-system/globals.css';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/jsonld';
import { SmoothScrollProvider } from '@/lib/motion/SmoothScrollProvider';
import { DezoNavigation } from '@/components/dezo/DezoNavigation';
import { DezoFooter } from '@/components/dezo/DezoFooter';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Organization & WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-dezo-bg text-dezo-text-primary antialiased selection:bg-dezo-primary selection:text-white flex flex-col justify-between">
        <SmoothScrollProvider>
          <DezoNavigation />
          <main className="flex-1 w-full">{children}</main>
          <DezoFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
