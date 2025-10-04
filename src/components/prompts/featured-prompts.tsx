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
    if (score >= 9) return 'text-emerald-700 bg-emerald-50 border border-emerald-200';
    if (score >= 8) return 'text-blue-700 bg-blue-50 border border-blue-200';
    if (score >= 7) return 'text-amber-700 bg-amber-50 border border-amber-200';
    return 'text-slate-600 bg-slate-50 border border-slate-200';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'INTERMEDIATE': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'ADVANCED': return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'EXPERT': return 'bg-red-50 text-red-700 border border-red-200';
      default: return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse shadow-sm">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-20 bg-slate-200 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 bg-slate-200 rounded w-20"></div>
              <div className="h-4 bg-slate-200 rounded w-16"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600 uppercase tracking-wide">Featured Collection</span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Curated Excellence
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Hand-picked prompts that deliver stunning results across all major AI video platforms
          </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {prompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden"
            >
              {/* Gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                      {prompt.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getQualityColor(prompt.qualityScore)}`}>
                        <Star className="inline h-3 w-3 mr-1" />
                        {prompt.qualityScore.toFixed(1)}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getDifficultyColor(prompt.difficulty)}`}>
                        {prompt.difficulty.charAt(0) + prompt.difficulty.slice(1).toLowerCase()}
                      </span>
                      <span className="text-xs px-3 py-1 bg-slate-100 text-slate-600 rounded-full font-medium">
                        {prompt.platform.name}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleLikePrompt(prompt.id)}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      likedPrompts.has(prompt.id)
                        ? 'bg-red-50 text-red-600 hover:bg-red-100'
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedPrompts.has(prompt.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Content Preview */}
                <div className="mb-5">
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
                    {prompt.content}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-5 text-xs text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      {prompt.duration}s
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BarChart3 className="h-3 w-3" />
                      {prompt.usageCount.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Star className="h-3 w-3 fill-current text-amber-500" />
                      {prompt.rating.toFixed(1)}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 bg-slate-300 rounded-full"></div>
                      {prompt.aspectRatio}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {prompt.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-xs bg-slate-50 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                      #{tag}
                    </span>
                  ))}
                  {prompt.tags.length > 3 && (
                    <span className="text-xs text-slate-400 px-2.5 py-1 rounded-md bg-slate-50">
                      +{prompt.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleCopyPrompt(prompt.content, prompt.title)}
                    className="flex-1 h-10 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy Prompt
                  </button>
                  <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200">
                    <Play className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 text-base font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200">
            Explore All Featured Prompts
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}