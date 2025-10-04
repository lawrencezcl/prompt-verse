'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, ArrowRight, Film, Camera, Palette, Users, Cpu, Music, Trees, Rocket, Heart, Brain, Zap } from 'lucide-react';
import { Category } from '@/types';

interface CategoryWithIcon extends Category {
  icon: any; // React component
  color: string;
}

interface CategoriesGridProps {
  categories?: CategoryWithIcon[];
  loading?: boolean;
}

const mockCategories: CategoryWithIcon[] = [
  {
    id: '1',
    name: 'Cinematic',
    slug: 'cinematic',
    description: 'Professional film-style prompts with dramatic lighting and composition',
    promptCount: 2500,
    icon: Film,
    color: 'from-purple-500 to-pink-500',
    isActive: true,
    sortOrder: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    name: 'Nature',
    slug: 'nature',
    description: 'Landscapes, wildlife, and natural phenomena',
    promptCount: 1800,
    icon: Trees,
    color: 'from-green-500 to-emerald-500',
    isActive: true,
    sortOrder: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    name: 'Portraits',
    slug: 'portraits',
    description: 'Character studies and people-focused prompts',
    promptCount: 2200,
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    isActive: true,
    sortOrder: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    name: 'Abstract',
    slug: 'abstract',
    description: 'Non-representational and experimental visuals',
    promptCount: 1200,
    icon: Palette,
    color: 'from-orange-500 to-red-500',
    isActive: true,
    sortOrder: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    name: 'Technology',
    slug: 'technology',
    description: 'AI, robotics, and futuristic concepts',
    promptCount: 1600,
    icon: Cpu,
    color: 'from-gray-600 to-gray-800',
    isActive: true,
    sortOrder: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    name: 'Music',
    slug: 'music',
    description: 'Music visualizations and performance prompts',
    promptCount: 900,
    icon: Music,
    color: 'from-indigo-500 to-purple-500',
    isActive: true,
    sortOrder: 6,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '7',
    name: 'Fantasy',
    slug: 'fantasy',
    description: 'Magical and mythical themes',
    promptCount: 1400,
    icon: Rocket,
    color: 'from-pink-500 to-rose-500',
    isActive: true,
    sortOrder: 7,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '8',
    name: 'Emotions',
    slug: 'emotions',
    description: 'Feeling and expression-focused prompts',
    promptCount: 1100,
    icon: Heart,
    color: 'from-red-500 to-pink-500',
    isActive: true,
    sortOrder: 8,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '9',
    name: 'AI Art',
    slug: 'ai-art',
    description: 'AI-specific and generative art prompts',
    promptCount: 1900,
    icon: Brain,
    color: 'from-cyan-500 to-blue-500',
    isActive: true,
    sortOrder: 9,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '10',
    name: 'Action',
    slug: 'action',
    description: 'Dynamic movement and high-energy scenes',
    promptCount: 800,
    icon: Zap,
    color: 'from-yellow-500 to-orange-500',
    isActive: true,
    sortOrder: 10,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export function CategoriesGrid({ categories = mockCategories, loading }: CategoriesGridProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Grid3X3 className="h-5 w-5 text-indigo-600" />
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">Categories</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-slate-900 mb-4"
          >
            Explore by Theme
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Browse our curated collection of AI video prompts organized by style and theme
          </motion.p>
        </div>

          {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredCategory(category.id)}
                onMouseLeave={() => setHoveredCategory(null)}
                className="group"
              >
                <div className="relative h-56 bg-white rounded-xl border border-slate-200 p-6 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-slate-300 hover:-translate-y-1">
                  {/* Gradient Accent */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} opacity-100 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  {/* Icon Background */}
                  <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

                  {/* Content */}
                  <div className="relative h-full flex flex-col">
                    {/* Icon and Count */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-3 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-slate-900">
                          {category.promptCount.toLocaleString()}
                        </div>
                        <div className="text-xs text-slate-500 font-medium">
                          prompts
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-auto">
                      {category.description}
                    </p>

                    {/* Hover Arrow */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                      <div className="text-xs text-slate-400 font-medium">
                        Explore category
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all duration-300 transform translate-x-1 group-hover:translate-x-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

          {/* View All Button */}
        <div className="text-center mt-16">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Grid3X3 className="w-5 h-5" />
            View All Categories
          </motion.button>
        </div>
      </div>
    </section>
  );
}