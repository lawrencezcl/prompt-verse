'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Copy, ExternalLink, Play, Clock, BarChart3 } from 'lucide-react';
import { Prompt } from '@/types';
import { toast } from 'react-hot-toast';

interface FeaturedPromptsProps {
  prompts?: Prompt[];
  loading?: boolean;
}

const mockFeaturedPrompts: Prompt[] = [
  {
    id: '1',
    title: 'Cinematic Drone Shot',
    content: 'Epic aerial drone footage sweeping over majestic mountain peaks at golden hour, dramatic shadows, 4K resolution, cinematic color grading',
    category: 'Cinematic',
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
    qualityScore: 9.5,
    difficulty: 'INTERMEDIATE' as any,
    duration: 8,
    aspectRatio: '16:9',
    tags: ['drone', 'cinematic', 'mountains', 'golden hour'],
    source: 'curated',
    isJson: false,
    rating: 4.9,
    usageCount: 1250,
    isFeatured: true,
    isActive: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    tagIds: []
  },
  {
    id: '2',
    title: 'Cyberpunk Cityscape',
    content: 'Futuristic cyberpunk cityscape at night, neon lights reflecting on wet streets, flying vehicles, holographic advertisements, Blade Runner aesthetic',
    category: 'Sci-Fi',
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
    qualityScore: 9.2,
    difficulty: 'ADVANCED' as any,
    duration: 10,
    aspectRatio: '21:9',
    tags: ['cyberpunk', 'neon', 'futuristic', 'night'],
    source: 'curated',
    isJson: false,
    rating: 4.8,
    usageCount: 980,
    isFeatured: true,
    isActive: true,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    tagIds: []
  },
  {
    id: '3',
    title: 'Serene Japanese Garden',
    content: 'Peaceful Japanese garden in spring, cherry blossoms gently falling, koi pond with ripples, traditional architecture, soft natural lighting',
    category: 'Nature',
    platform: {
      id: 'SORA',
      name: 'Sora (OpenAI)',
      slug: 'sora',
      description: 'Cutting-edge text-to-video with unprecedented quality',
      website: 'https://openai.com/sora',
      apiAvailable: false,
      promptCount: 1900,
      logoUrl: '/platforms/sora.svg',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    } as any,
    qualityScore: 9.7,
    difficulty: 'BEGINNER' as any,
    duration: 6,
    aspectRatio: '16:9',
    tags: ['japanese', 'garden', 'cherry blossoms', 'peaceful'],
    source: 'curated',
    isJson: false,
    rating: 4.9,
    usageCount: 1100,
    isFeatured: true,
    isActive: true,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    tagIds: []
  }
];

export function FeaturedPrompts({ prompts = mockFeaturedPrompts, loading = false }: FeaturedPromptsProps) {
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

  const getQualityColor = (score: number) => {
    if (score >= 9) return 'text-green-500 bg-green-50 dark:bg-green-900/20';
    if (score >= 8) return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    if (score >= 7) return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
    return 'text-gray-500 bg-gray-50 dark:bg-gray-900/20';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'INTERMEDIATE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'ADVANCED': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'EXPERT': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-20 bg-gray-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Prompts
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Hand-picked prompts that deliver stunning results across all major AI video platforms
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 card-hover group"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {prompt.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getQualityColor(prompt.qualityScore)}`}>
                    {prompt.qualityScore.toFixed(1)}★
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(prompt.difficulty)}`}>
                    {prompt.difficulty.charAt(0) + prompt.difficulty.slice(1).toLowerCase()}
                  </span>
                  <span className="tag text-xs">
                    {prompt.platform.name}
                  </span>
                </div>
              </div>
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

            {/* Content Preview */}
            <div className="mb-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-3">
                {prompt.content}
              </p>

              {/* Metadata */}
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {prompt.duration}s
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 className="h-3 w-3" />
                  {prompt.usageCount.toLocaleString()} uses
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {prompt.rating.toFixed(1)}
                </div>
                <span className="text-gray-400">
                  {prompt.aspectRatio}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {prompt.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded dark:bg-gray-800 dark:text-gray-400">
                  #{tag}
                </span>
              ))}
              {prompt.tags.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{prompt.tags.length - 3} more
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleCopyPrompt(prompt.content, prompt.title)}
                className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2"
              >
                <Copy className="h-3 w-3" />
                Copy Prompt
              </button>
              <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
                <Play className="h-4 w-4" />
              </button>
              <button className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-8">
        <button className="btn-secondary px-8 py-3">
          View All Featured Prompts
        </button>
      </div>
    </section>
  );
}