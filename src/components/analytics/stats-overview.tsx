'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Eye,
  Heart,
  Copy,
  Star,
  BarChart3,
  Activity,
  Zap,
  Clock,
  Globe,
  Download
} from 'lucide-react';
import { PromptStats } from '@/types';

interface StatsOverviewProps {
  stats?: PromptStats;
  loading?: boolean;
}

const mockStats: PromptStats = {
  totalPrompts: 15100,
  totalCategories: 45,
  totalPlatforms: 16,
  totalTags: 280,
  featuredPrompts: 850,
  averageRating: 4.7,
  mostUsedPlatform: 'RUNWAY' as any,
  topCategories: [
    { category: 'Cinematic', count: 3200 },
    { category: 'Nature', count: 2800 },
    { category: 'Portraits', count: 2100 },
    { category: 'Technology', count: 1900 },
    { category: 'Abstract', count: 1600 }
  ],
  trendingTags: [
    { tag: 'cinematic', count: 4500 },
    { tag: '4K', count: 3800 },
    { tag: 'portrait', count: 3200 },
    { tag: 'nature', count: 2900 },
    { tag: 'AI', count: 2600 }
  ]
};

export function StatsOverview({ stats = mockStats, loading = false }: StatsOverviewProps) {
  const [animatedNumbers, setAnimatedNumbers] = useState({
    prompts: 0,
    categories: 0,
    platforms: 0,
    tags: 0,
    featured: 0,
    users: 0,
    views: 0,
    usage: 0
  });

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;

    const targets = {
      prompts: stats.totalPrompts,
      categories: stats.totalCategories,
      platforms: stats.totalPlatforms,
      tags: stats.totalTags,
      featured: stats.featuredPrompts,
      users: 12500, // Mock user count
      views: 89000, // Mock view count
      usage: 45000 // Mock usage count
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedNumbers({
        prompts: Math.floor(targets.prompts * easeOutQuart),
        categories: Math.floor(targets.categories * easeOutQuart),
        platforms: Math.floor(targets.platforms * easeOutQuart),
        tags: Math.floor(targets.tags * easeOutQuart),
        featured: Math.floor(targets.featured * easeOutQuart),
        users: Math.floor(targets.users * easeOutQuart),
        views: Math.floor(targets.views * easeOutQuart),
        usage: Math.floor(targets.usage * easeOutQuart)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, increment);

    return () => clearInterval(timer);
  }, [stats]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'prompts': return <Copy className="h-5 w-5" />;
      case 'categories': return <BarChart3 className="h-5 w-5" />;
      case 'platforms': return <Globe className="h-5 w-5" />;
      case 'tags': return <Zap className="h-5 w-5" />;
      case 'featured': return <Star className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'views': return <Eye className="h-5 w-5" />;
      case 'usage': return <Activity className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getStatColor = (stat: string) => {
    switch (stat) {
      case 'prompts': return 'from-blue-500 to-cyan-500';
      case 'categories': return 'from-purple-500 to-pink-500';
      case 'platforms': return 'from-green-500 to-emerald-500';
      case 'tags': return 'from-orange-500 to-red-500';
      case 'featured': return 'from-yellow-500 to-orange-500';
      case 'users': return 'from-indigo-500 to-purple-500';
      case 'views': return 'from-teal-500 to-blue-500';
      case 'usage': return 'from-rose-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-8 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Platform Statistics
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Real-time insights into our prompt collection and community usage
        </p>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { key: 'prompts', label: 'Total Prompts', value: animatedNumbers.prompts, suffix: '' },
          { key: 'categories', label: 'Categories', value: animatedNumbers.categories, suffix: '' },
          { key: 'platforms', label: 'Platforms', value: animatedNumbers.platforms, suffix: '' },
          { key: 'tags', label: 'Tags', value: animatedNumbers.tags, suffix: '' },
          { key: 'featured', label: 'Featured', value: animatedNumbers.featured, suffix: '' },
          { key: 'users', label: 'Users', value: formatNumber(animatedNumbers.users), suffix: '' },
          { key: 'views', label: 'Total Views', value: formatNumber(animatedNumbers.views), suffix: '' },
          { key: 'usage', label: 'Usage Count', value: formatNumber(animatedNumbers.usage), suffix: '' }
        ].map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card p-6 text-center card-hover"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${getStatColor(stat.key)} text-white mb-4`}>
              {getStatIcon(stat.key)}
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}{stat.suffix}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Categories */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Top Categories
          </h3>
          <div className="space-y-3">
            {stats.topCategories.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500 w-6">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {category.category}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      style={{ width: `${(category.count / stats.topCategories[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-right">
                    {formatNumber(category.count)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trending Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {stats.trendingTags.map((tag, index) => (
              <span
                key={tag.tag}
                className="tag flex items-center gap-1"
                style={{
                  opacity: 1 - (index * 0.15),
                  transform: `scale(${1 - (index * 0.05)})`
                }}
              >
                <span className="text-xs">#{tag.tag}</span>
                <span className="text-xs text-gray-500">({formatNumber(tag.count)})</span>
              </span>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats.averageRating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700"
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {[
              { icon: Copy, text: 'Prompt copied', time: '2 min ago', count: '234' },
              { icon: Heart, text: 'Prompt liked', time: '5 min ago', count: '189' },
              { icon: Download, text: 'Prompt exported', time: '12 min ago', count: '156' },
              { icon: Eye, text: 'Prompt viewed', time: '18 min ago', count: '1.2K' }
            ].map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {activity.text}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    {activity.count}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Live Updates Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="mt-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-white">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                Live Updates
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                New prompts added every 4 hours • Real-time usage tracking
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              System Active
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}