'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, CheckCircle, ArrowRight, Star, Zap, Shield } from 'lucide-react';
import { Platform } from '@/types';

interface PlatformWithDetails extends Platform {
  features: string[];
  rating: number;
  difficulty: string;
  color: string;
}

interface PlatformsShowcaseProps {
  platforms?: PlatformWithDetails[];
  loading?: boolean;
}

const platformData: PlatformWithDetails[] = [
  {
    id: 'RUNWAY',
    name: 'Runway Gen-2',
    slug: 'runway-gen-2',
    description: 'Advanced AI video generation with cinematic quality and motion control',
    website: 'https://runwayml.com',
    maxDuration: 30,
    supportedFormats: ['mp4', 'gif'],
    apiAvailable: true,
    promptCount: 3200,
    logoUrl: '/platforms/runway.svg',
    isActive: true,
    features: ['Cinematic quality', 'Motion brush', 'Camera controls', '4K output'],
    rating: 4.8,
    difficulty: 'Intermediate',
    color: 'from-blue-500 to-purple-500',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'PIKA_LABS',
    name: 'Pika Labs',
    slug: 'pika-labs',
    description: 'User-friendly video generation with artistic styles and animations',
    website: 'https://pika.art',
    maxDuration: 12,
    supportedFormats: ['mp4', 'gif'],
    apiAvailable: true,
    promptCount: 2800,
    logoUrl: '/platforms/pika.svg',
    isActive: true,
    features: ['Artistic styles', 'Lip sync', 'Image-to-video', 'Animation modes'],
    rating: 4.6,
    difficulty: 'Beginner',
    color: 'from-pink-500 to-rose-500',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'SORA',
    name: 'Sora (OpenAI)',
    slug: 'sora',
    description: 'Cutting-edge text-to-video with unprecedented quality and coherence',
    website: 'https://openai.com/sora',
    maxDuration: 60,
    supportedFormats: ['mp4'],
    apiAvailable: false,
    promptCount: 1900,
    logoUrl: '/platforms/sora.svg',
    isActive: true,
    features: ['60s videos', 'Physical accuracy', 'Multi-shot scenes', 'High resolution'],
    rating: 4.9,
    difficulty: 'Expert',
    color: 'from-green-500 to-emerald-500',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'LEONARDO_AI',
    name: 'Leonardo.Ai',
    slug: 'leonardo-ai',
    description: 'Creative AI platform with video generation and artistic control',
    website: 'https://leonardo.ai',
    maxDuration: 8,
    supportedFormats: ['mp4', 'gif'],
    apiAvailable: true,
    promptCount: 2100,
    logoUrl: '/platforms/leonardo.svg',
    isActive: true,
    features: ['Artistic models', 'Fine-tuning', 'Community prompts', 'Creative tools'],
    rating: 4.7,
    difficulty: 'Intermediate',
    color: 'from-orange-500 to-red-500',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'PIXVERSE',
    name: 'PixVerse AI',
    slug: 'pixverse',
    description: 'Professional video generation with advanced prompt engineering',
    website: 'https://pixverse.ai',
    maxDuration: 10,
    supportedFormats: ['mp4'],
    apiAvailable: true,
    promptCount: 1500,
    logoUrl: '/platforms/pixverse.svg',
    isActive: true,
    features: ['API access', 'Batch generation', 'Commercial license', 'Priority queue'],
    rating: 4.5,
    difficulty: 'Advanced',
    color: 'from-indigo-500 to-blue-500',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'HEYGEN',
    name: 'HeyGen',
    slug: 'heygen',
    description: 'AI video generation focusing on avatar and talking head content',
    website: 'https://heygen.com',
    maxDuration: 300,
    supportedFormats: ['mp4'],
    apiAvailable: true,
    promptCount: 800,
    logoUrl: '/platforms/heygen.svg',
    isActive: true,
    features: ['Talking avatars', 'Voice cloning', 'Multi-language', 'Lip sync'],
    rating: 4.4,
    difficulty: 'Beginner',
    color: 'from-purple-500 to-pink-500',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function PlatformsShowcase({ platforms = platformData, loading = false }: PlatformsShowcaseProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'expert': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('api') || feature.toLowerCase().includes('access')) return <Zap className="h-4 w-4" />;
    if (feature.toLowerCase().includes('commercial') || feature.toLowerCase().includes('license')) return <Shield className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-12 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-3 bg-gray-200 rounded w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Supported Platforms
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Professional prompts optimized for all major AI video generation platforms
          </p>
        </div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
              onMouseEnter={() => setSelectedPlatform(platform.id)}
              onMouseLeave={() => setSelectedPlatform(null)}
            >
              <div className={`glass-card p-6 h-full card-hover relative overflow-hidden ${
                selectedPlatform === platform.id ? 'ring-2 ring-primary/50' : ''
              }`}>
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-5 rounded-lg transition-opacity duration-300`}></div>

                {/* Platform Header */}
                <div className="flex items-start justify-between mb-4 relative">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {platform.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" />
                          {platform.rating}
                        </span>
                        <span>•</span>
                        <span>{platform.promptCount.toLocaleString()} prompts</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(platform.difficulty)}`}>
                    {platform.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {platform.description}
                </p>

                {/* Key Features */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Key Features</div>
                  <div className="flex flex-wrap gap-1">
                    {platform.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded dark:bg-gray-800 dark:text-gray-300">
                        {getFeatureIcon(feature)}
                        {feature}
                      </span>
                    ))}
                    {platform.features.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{platform.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 dark:text-gray-400 mb-4">
                  <div>
                    <span className="font-medium">Max Duration:</span> {platform.maxDuration}s
                  </div>
                  <div>
                    <span className="font-medium">API:</span> {platform.apiAvailable ? '✅ Available' : '❌ Unavailable'}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button className="flex-1 btn-primary text-sm py-2 flex items-center justify-center gap-2">
                    <Play className="h-3 w-3" />
                    Try Prompts
                  </button>
                  {platform.website && (
                    <a
                      href={platform.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>

                {/* Hover Effect */}
                {selectedPlatform === platform.id && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg pointer-events-none"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform Comparison */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Platform Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Platform</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Max Duration</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">API Access</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Quality</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">Best For</th>
                </tr>
              </thead>
              <tbody>
                {platforms.slice(0, 4).map((platform) => (
                  <tr key={platform.id} className="border-b border-gray-100 dark:border-gray-700">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-xs font-bold`}>
                          {platform.name.charAt(0)}
                        </div>
                        <span className="font-medium">{platform.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{platform.maxDuration}s</td>
                    <td className="py-3 px-4">
                      {platform.apiAvailable ? (
                        <span className="text-green-600 dark:text-green-400">✅ Available</span>
                      ) : (
                        <span className="text-gray-400">❌ Limited</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">{'★'.repeat(Math.floor(platform.rating))}</span>
                        <span className="text-gray-400">{'☆'.repeat(5 - Math.floor(platform.rating))}</span>
                        <span className="text-xs text-gray-500 ml-1">{platform.rating}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                      {platform.features[0]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button className="btn-primary px-8 py-3 flex items-center gap-2 mx-auto">
            View All Platform Guides
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}