'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Copy, Heart, Eye, Clock, BarChart3, Flame } from 'lucide-react';
import { Prompt } from '@/types';
import { toast } from 'react-hot-toast';

interface TrendingPromptsProps {
  prompts?: Prompt[];
  loading?: boolean;
}

const mockTrendingPrompts: Prompt[] = [
  {
    id: '4',
    title: 'AI Robot Portrait',
    content: 'Close-up portrait of an advanced AI robot with expressive blue eyes, metallic details, soft studio lighting, shallow depth of field, photorealistic',
    category: 'Technology',
    platform: {
      id: 'LEONARDO_AI',
      name: 'Leonardo.Ai',
      slug: 'leonardo-ai',
      description: 'Creative AI platform with video generation and artistic control',
      website: 'https://leonardo.ai',
      apiAvailable: true,
      promptCount: 2100,
      logoUrl: '/platforms/leonardo.svg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any,
    qualityScore: 8.9,
    difficulty: 'INTERMEDIATE' as any,
    duration: 5,
    aspectRatio: '9:16',
    tags: ['AI', 'robot', 'portrait', 'future'],
    source: 'trending',
    isJson: false,
    rating: 4.7,
    usageCount: 2500,
    isFeatured: false,
    isActive: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    tagIds: []
  },
  {
    id: '5',
    title: 'Ocean Underwater Scene',
    content: 'Underwater ocean scene with sea turtles swimming through coral reefs, sunbeams penetrating water, marine life, National Geographic documentary style',
    category: 'Nature',
    platform: {
      id: 'RUNWAY',
      name: 'Runway Gen-2',
      slug: 'runway-gen-2',
      description: 'Advanced AI video generation with cinematic quality',
      website: 'https://runwayml.com',
      apiAvailable: true,
      promptCount: 3200,
      logoUrl: '/platforms/runway.svg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any,
    qualityScore: 9.1,
    difficulty: 'ADVANCED' as any,
    duration: 12,
    aspectRatio: '16:9',
    tags: ['underwater', 'ocean', 'coral', 'turtles'],
    source: 'trending',
    isJson: false,
    rating: 4.8,
    usageCount: 2100,
    isFeatured: false,
    isActive: true,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    tagIds: []
  },
  {
    id: '6',
    title: 'Time Lapse City Traffic',
    content: 'Time-lapse of city traffic at night, light trails from cars, bustling metropolis, neon signs, dynamic urban energy, Tokyo street style',
    category: 'Urban',
    platform: {
      id: 'PIKA_LABS',
      name: 'Pika Labs',
      slug: 'pika-labs',
      description: 'User-friendly video generation with artistic styles',
      website: 'https://pika.art',
      apiAvailable: true,
      promptCount: 2800,
      logoUrl: '/platforms/pika.svg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any,
    qualityScore: 8.7,
    difficulty: 'BEGINNER' as any,
    duration: 8,
    aspectRatio: '16:9',
    tags: ['timelapse', 'city', 'traffic', 'night'],
    source: 'trending',
    isJson: false,
    rating: 4.6,
    usageCount: 1800,
    isFeatured: false,
    isActive: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
    tagIds: []
  }
];

export function TrendingPrompts({ prompts = mockTrendingPrompts, loading = false }: TrendingPromptsProps) {
  const [likedPrompts, setLikedPrompts] = useState<Set<string>>(new Set());

  const handleCopyPrompt = async (content: string, title: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`Copied "${title}" to clipboard!`);
    } catch (err) {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleLikePrompt = (promptId: string) => {
    setLikedPrompts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(promptId)) {
        newSet.delete(promptId);
        toast.success('Removed from favorites');
      } else {
        newSet.add(promptId);
        toast.success('Added to favorites!');
      }
      return newSet;
    });
  };

  const getTrendIcon = (usageCount: number) => {
    if (usageCount > 2000) return <Flame className="h-4 w-4 text-orange-500" />;
    if (usageCount > 1500) return <TrendingUp className="h-4 w-4 text-red-500" />;
    return <ArrowUpRight className="h-4 w-4 text-green-500" />;
  };

  const getTrendText = (usageCount: number) => {
    if (usageCount > 2000) return '🔥 Hot';
    if (usageCount > 1500) return '📈 Rising';
    return '⬆️ Trending';
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 bg-slate-200 rounded w-20"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-16 bg-slate-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded w-24"></div>
              <div className="h-8 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="text-sm font-semibold text-orange-600 uppercase tracking-wide">Trending Now</span>
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-orange-500" />
              Hottest Prompts This Week
            </h2>
            <p className="text-lg text-slate-600">
              Discover the most popular prompts gaining traction in our community
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-slate-500 flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Updated hourly
            </div>
            <div className="text-xs text-slate-400">Based on real usage patterns</div>
          </div>
        </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {prompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all duration-300 overflow-hidden"
            >
              {/* Trend Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                  {getTrendIcon(prompt.usageCount)}
                  <span>{getTrendText(prompt.usageCount)}</span>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="relative">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-sm shadow-md">
                      {index + 1}
                    </div>
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">Rank #{index + 1}</span>
                    <div className="text-sm font-semibold text-slate-900">
                      {prompt.usageCount.toLocaleString()} uses
                    </div>
                  </div>
                </div>

                            {/* Content */}
                <div className="mb-5">
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 pr-20 group-hover:text-orange-600 transition-colors duration-200">
                    {prompt.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                    {prompt.content}
                  </p>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Eye className="h-3.5 w-3.5" />
                    <span>{(prompt.usageCount * 1.2).toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{prompt.duration}s duration</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <BarChart3 className="h-3.5 w-3.5" />
                    <span>{prompt.rating.toFixed(1)}★ rating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 bg-orange-50 text-orange-700 rounded-md border border-orange-200 font-medium">
                      {prompt.platform.name}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {prompt.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyPrompt(prompt.content, prompt.title)}
                    className="flex-1 h-10 px-4 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Use Prompt
                  </button>
                  <button
                    onClick={() => handleLikePrompt(prompt.id)}
                    className={`h-10 w-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                      likedPrompts.has(prompt.id)
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedPrompts.has(prompt.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Trend Indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Trending Categories */}
        <div className="mt-12 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-xl font-semibold text-slate-900 mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            Trending Categories This Week
          </h3>
          <div className="flex flex-wrap gap-3">
            {['Cinematic', 'AI Portraits', 'Nature', 'Cyberpunk', 'Time Lapse', 'Abstract'].map((category, index) => (
              <span
                key={category}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  index < 3
                    ? 'bg-gradient-to-r from-orange-50 to-red-50 text-orange-700 border border-orange-200'
                    : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {index < 3 && <Flame className="h-3.5 w-3.5" />}
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}