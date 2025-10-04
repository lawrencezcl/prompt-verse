import { Metadata } from 'next';
import { Suspense } from 'react';
import { Hero } from '@/components/layout/hero';
import { FeaturedPrompts } from '@/components/prompts/featured-prompts';
import { SearchClient } from '@/components/search/search-client';
import { TrendingPrompts } from '@/components/prompts/trending-prompts';
import { CategoriesGrid } from '@/components/categories/categories-grid';
import { PlatformsShowcase } from '@/components/platforms/platforms-showcase';
import { StatsOverview } from '@/components/analytics/stats-overview';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export const metadata: Metadata = {
  title: 'PromptVerse - Ultimate AI Video Generation Prompts Collection | Updated Oct 2025',
  description: 'Discover 15,000+ professionally curated AI video generation prompts. Search, filter, and use the best prompts for Runway, Pika Labs, Sora, and more.',
  keywords: ['AI video prompts', 'text to video', 'AI video generation', 'Runway prompts', 'Pika Labs prompts', 'Sora prompts'],
  authors: [{ name: 'PromptVerse Team' }],
  creator: 'prompt-verse',
  publisher: 'PromptVerse',
  openGraph: {
    title: 'PromptVerse - Ultimate AI Video Generation Prompts Collection',
    description: 'Discover 15,000+ professionally curated AI video generation prompts. Search, filter, and use the best prompts for Runway, Pika Labs, Sora, and more.',
    url: 'https://prompt-verse.vercel.app',
    siteName: 'PromptVerse',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PromptVerse - AI Video Generation Prompts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PromptVerse - Ultimate AI Video Generation Prompts Collection',
    description: 'Discover 15,000+ professionally curated AI video generation prompts. Search, filter, and use the best prompts for Runway, Pika Labs, Sora, and more.',
    images: ['/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Hero />

        {/* Stats Overview */}
        <Suspense fallback={<LoadingSpinner />}>
          <StatsOverview />
        </Suspense>

        {/* Search Interface */}
        <Suspense fallback={<LoadingSpinner />}>
          <SearchClient />
        </Suspense>

        {/* Featured Prompts */}
        <div className="mb-12">
          <Suspense fallback={<LoadingSpinner />}>
            <FeaturedPrompts />
          </Suspense>
        </div>

        {/* Trending Prompts */}
        <div className="mb-12">
          <Suspense fallback={<LoadingSpinner />}>
            <TrendingPrompts />
          </Suspense>
        </div>

        {/* Categories Grid */}
        <div className="mb-12">
          <Suspense fallback={<LoadingSpinner />}>
            <CategoriesGrid />
          </Suspense>
        </div>

        {/* Platforms Showcase */}
        <div className="mb-12">
          <Suspense fallback={<LoadingSpinner />}>
            <PlatformsShowcase />
          </Suspense>
        </div>
      </div>
    </div>
  );
}