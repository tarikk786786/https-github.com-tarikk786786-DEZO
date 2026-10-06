import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PlatformPageScaffold } from '@/components/platform/PlatformPageScaffold';
import { industries } from '@/content/site';
import { constructMetadata } from '@/lib/seo/metadata';

export function generateStaticParams() {
  return industries.map((i) => ({
    slug: i.href.replace('/industries/', ''),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.href === `/industries/${slug}`);
  if (!ind) return {};
  return constructMetadata({
    title: `${ind.name} — DEZO`,
    description: `Growth systems for ${ind.name.toLowerCase()} — web, marketplaces, ads, and brand.`,
    canonicalUrl: `https://dezo.in/industries/${slug}`,
  });
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ind = industries.find((i) => i.href === `/industries/${slug}`);
  if (!ind) notFound();

  return (
    <PlatformPageScaffold
      badge="Industry"
      title={ind.name}
      subtitle={`Full growth stack for ${ind.name.toLowerCase()}: brand, build, marketplaces, traffic, and conversion — operated as one system.`}
    >
      <p className="text-sm text-dezo-text-secondary leading-relaxed max-w-2xl">
        We tailor Digital Build, Search, Amazon/Flipkart, Paid Growth, Social, and Brand
        systems to how {ind.name.toLowerCase()} actually sell in India.
      </p>
    </PlatformPageScaffold>
  );
}
