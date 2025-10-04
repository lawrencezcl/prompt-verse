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
      case 'beginner': return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'intermediate': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'advanced': return 'bg-orange-50 text-orange-700 border border-orange-200';
      case 'expert': return 'bg-red-50 text-red-700 border border-red-200';
      default: return 'bg-slate-50 text-slate-600 border border-slate-200';
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
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse shadow-sm">
            <div className="h-12 bg-slate-200 rounded-xl w-12 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-3 bg-slate-200 rounded w-16"></div>
              <div className="h-3 bg-slate-200 rounded w-20"></div>
            </div>
            <div className="h-8 bg-slate-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Play className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Platforms</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            AI Video Platforms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Professional prompts optimized for all major AI video generation platforms
          </motion.p>
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
              <div className="relative h-full bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden group">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${platform.color} opacity-100 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Platform Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      {platform.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                        {platform.name}
                      </h3>
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1.5">
                          <Star className="h-4 w-4 text-amber-500 fill-current" />
                          <span className="font-semibold">{platform.rating}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                        <span>{platform.promptCount.toLocaleString()} prompts</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1.5 rounded-full font-medium border ${getDifficultyColor(platform.difficulty)}`}>
                    {platform.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-2">
                  {platform.description}
                </p>

                {/* Key Features */}
                <div className="mb-5">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Key Features</div>
                  <div className="flex flex-wrap gap-2">
                    {platform.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="flex items-center gap-1.5 text-xs bg-slate-50 text-slate-700 px-3 py-2 rounded-lg border border-slate-200">
                        {getFeatureIcon(feature)}
                        {feature}
                      </span>
                    ))}
                    {platform.features.length > 3 && (
                      <span className="text-xs text-slate-400 px-3 py-2 rounded-lg bg-slate-50">
                        +{platform.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 mb-5">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-500" />
                    <div>
                      <div className="font-semibold text-slate-900">{platform.maxDuration}s</div>
                      <div className="text-xs text-slate-500">Max Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-emerald-500" />
                    <div>
                      <div className="font-semibold text-slate-900">
                        {platform.apiAvailable ? 'Available' : 'Limited'}
                      </div>
                      <div className="text-xs text-slate-500">API Access</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                  <button className="flex-1 h-11 px-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md">
                    <Play className="h-4 w-4" />
                    Try Prompts
                  </button>
                  {platform.website && (
                    <a
                      href={platform.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 w-11 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-all duration-200"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform Comparison */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
              <Play className="h-4 w-4" />
            </div>
            Platform Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Platform</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Max Duration</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">API Access</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Quality</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900">Best For</th>
                </tr>
              </thead>
              <tbody>
                {platforms.slice(0, 4).map((platform) => (
                  <tr key={platform.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors duration-150">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${platform.color} flex items-center justify-center text-white text-sm font-bold shadow-sm`}>
                          {platform.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{platform.name}</div>
                          <div className="text-xs text-slate-500">{platform.promptCount.toLocaleString()} prompts</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-blue-500" />
                        <span className="font-medium text-slate-900">{platform.maxDuration}s</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {platform.apiAvailable ? (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium text-emerald-700">Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-slate-400" />
                          <span className="font-medium text-slate-500">Limited</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          <span className="text-amber-500">{'★'.repeat(Math.floor(platform.rating))}</span>
                          <span className="text-slate-300">{'☆'.repeat(5 - Math.floor(platform.rating))}</span>
                        </div>
                        <span className="font-semibold text-slate-900">{platform.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 bg-slate-50 text-slate-700 rounded-lg border border-slate-200 text-xs font-medium">
                        {platform.features[0]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Play className="w-5 h-5" />
            View All Platform Guides
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}