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
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Explore Categories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Browse our curated collection of AI video prompts organized by theme and style
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                className="relative group"
              >
                <div className={`relative h-48 rounded-2xl bg-gradient-to-br ${category.color} p-6 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M0 0h20v20H0V0zm10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"/%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-white/80 text-sm font-medium">
                          {category.promptCount.toLocaleString()} prompts
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2">
                        {category.name}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-white/80 text-sm line-clamp-2">
                        {category.description}
                      </p>
                      <div className={`w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0`}>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  {hoveredCategory === category.id && (
                    <motion.div
                      layoutId="categoryHover"
                      className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
          >
            <Grid3X3 className="w-4 h-4 mr-2" />
            View All Categories
          </motion.button>
        </div>
      </div>
    </section>
  );
}