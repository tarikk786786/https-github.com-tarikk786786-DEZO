import type { Metadata } from 'next';
import { Syne, Manrope, JetBrains_Mono } from 'next/font/google';
import '@/design-system/globals.css';
import { constructMetadata } from '@/lib/seo/metadata';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/seo/jsonld';
import { SmoothScrollProvider } from '@/lib/motion/SmoothScrollProvider';
import { DezoNavigation } from '@/components/dezo/DezoNavigation';
import { DezoFooter } from '@/components/dezo/DezoFooter';
import { DezoPageShell } from '@/components/dezo/DezoPageShell';

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  weight: ['500', '600', '700', '800'],
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
  weight: ['400', '500', '600'],
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
    <html
      lang="en"
      className={`${syne.variable} ${manrope.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
      </head>
      <body className="min-h-screen bg-dezo-bg text-dezo-text-primary antialiased selection:bg-dezo-primary selection:text-white flex flex-col justify-between font-sans">
        <SmoothScrollProvider>
          <DezoNavigation />
          <main className="flex-1 w-full">
            <DezoPageShell>{children}</DezoPageShell>
          </main>
          <DezoFooter />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
