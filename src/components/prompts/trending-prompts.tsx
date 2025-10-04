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
    },
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
    },
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
    },
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
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-16 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
              <Flame className="h-8 w-8 text-orange-500" />
              Trending Now
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              The hottest prompts gaining traction this week
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Updated hourly</div>
            <div className="text-xs text-gray-400 dark:text-gray-500">Based on usage patterns</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {prompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-6 card-hover relative overflow-hidden"
            >
              {/* Trend Badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                {getTrendIcon(prompt.usageCount)}
                {getTrendText(prompt.usageCount)}
              </div>

              {/* Rank Badge */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Rank</span>
                  <span className="text-xs font-semibold text-primary">
                    {prompt.usageCount.toLocaleString()} uses
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 pr-16">
                  {prompt.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                  {prompt.content}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Eye className="h-3 w-3" />
                  <span>{(prompt.usageCount * 1.2).toLocaleString()} views</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{prompt.duration}s duration</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <BarChart3 className="h-3 w-3" />
                  <span>{prompt.rating.toFixed(1)}★ rating</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <span className="px-2 py-1 bg-gray-100 rounded text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    {prompt.platform.name}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {prompt.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-xs bg-gradient-to-r from-primary/5 to-secondary/5 text-primary px-2 py-1 rounded border border-primary/20">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleCopyPrompt(prompt.content, prompt.title)}
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-primary/90 hover:to-primary/70 transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Use Prompt
                </button>
                <button
                  onClick={() => handleLikePrompt(prompt.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    likedPrompts.has(prompt.id)
                      ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${likedPrompts.has(prompt.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Trend Indicator */}
              <div className="absolute -bottom-1 -left-1 w-full h-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
            </motion.div>
          ))}
        </div>

        {/* Trending Categories */}
        <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Categories This Week
          </h3>
          <div className="flex flex-wrap gap-2">
            {['Cinematic', 'AI Portraits', 'Nature', 'Cyberpunk', 'Time Lapse', 'Abstract'].map((category, index) => (
              <span key={category} className="tag flex items-center gap-1">
                {index < 3 && <span className="text-xs">🔥</span>}
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}