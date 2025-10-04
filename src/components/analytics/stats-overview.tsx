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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse shadow-sm">
            <div className="h-12 bg-slate-200 rounded-xl w-12 mb-4 mx-auto"></div>
            <div className="h-8 bg-slate-200 rounded w-20 mb-2 mx-auto"></div>
            <div className="h-5 bg-slate-200 rounded w-28 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-50 border border-blue-200">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Analytics</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-slate-900 mb-6"
          >
            Platform Insights
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Real-time insights into our prompt collection and community engagement
          </motion.p>
        </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        {[
          { key: 'prompts', label: 'Total Prompts', value: animatedNumbers.prompts, suffix: '+' },
          { key: 'categories', label: 'Categories', value: animatedNumbers.categories, suffix: '' },
          { key: 'platforms', label: 'Platforms', value: animatedNumbers.platforms, suffix: '' },
          { key: 'tags', label: 'Tags', value: animatedNumbers.tags, suffix: '' },
          { key: 'featured', label: 'Featured', value: animatedNumbers.featured, suffix: '+' },
          { key: 'users', label: 'Users', value: formatNumber(animatedNumbers.users), suffix: '+' },
          { key: 'views', label: 'Total Views', value: formatNumber(animatedNumbers.views), suffix: '+' },
          { key: 'usage', label: 'Usage Count', value: formatNumber(animatedNumbers.usage), suffix: '+' }
        ].map((stat, index) => (
          <motion.div
            key={stat.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-modern hover:shadow-modern-lg hover:border-slate-300 transition-all duration-300 overflow-hidden hover:-translate-y-1"
          >
            {/* Gradient Accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getStatColor(stat.key)} opacity-100 group-hover:opacity-100 transition-opacity duration-300`}></div>

            {/* Icon Background */}
            <div className={`absolute -top-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${getStatColor(stat.key)} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative text-center">
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${getStatColor(stat.key)} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                {getStatIcon(stat.key)}
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm font-medium text-slate-600">
                {stat.label}
              </div>
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
          className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600">
              <BarChart3 className="h-4 w-4" />
            </div>
            Top Categories
          </h3>
          <div className="space-y-4">
            {stats.topCategories.map((category, index) => (
              <div key={category.category} className="group flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm ${
                    index === 0 ? 'bg-amber-100 text-amber-700' :
                    index === 1 ? 'bg-slate-100 text-slate-700' :
                    index === 2 ? 'bg-orange-100 text-orange-700' :
                    'bg-slate-50 text-slate-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                      {category.category}
                    </div>
                    <div className="text-xs text-slate-500">
                      {formatNumber(category.count)} prompts
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(category.count / stats.topCategories[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 w-16 text-right">
                    {Math.round((category.count / stats.topCategories[0].count) * 100)}%
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
          className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-100 text-orange-600">
              <TrendingUp className="h-4 w-4" />
            </div>
            Trending Tags
          </h3>
          <div className="flex flex-wrap gap-3 mb-6">
            {stats.trendingTags.map((tag, index) => (
              <span
                key={tag.tag}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-all duration-300 hover:scale-105 ${
                  index === 0 ? 'bg-orange-50 text-orange-700 border-orange-200 shadow-sm' :
                  index === 1 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                  index === 2 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                  'bg-slate-50 text-slate-600 border-slate-200'
                }`}
                style={{
                  opacity: 1 - (index * 0.12),
                  transform: `scale(${1 - (index * 0.03)})`
                }}
              >
                <span className="font-semibold">#{tag.tag}</span>
                <span className="text-xs opacity-75">({formatNumber(tag.count)})</span>
              </span>
            ))}
          </div>
          <div className="pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-amber-100 text-amber-600">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-500">Average Rating</div>
                  <div className="text-xl font-bold text-slate-900">
                    {stats.averageRating.toFixed(1)}
                    <span className="text-sm text-slate-500 font-normal">/5.0</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-500">Quality Score</div>
                <div className="text-lg font-bold text-emerald-600">
                  {(stats.averageRating * 20).toFixed(0)}%
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600">
              <Activity className="h-4 w-4" />
            </div>
            Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { icon: Copy, text: 'Prompt copied', time: '2 min ago', count: '234', color: 'blue' },
              { icon: Heart, text: 'Prompt liked', time: '5 min ago', count: '189', color: 'red' },
              { icon: Download, text: 'Prompt exported', time: '12 min ago', count: '156', color: 'green' },
              { icon: Eye, text: 'Prompt viewed', time: '18 min ago', count: '1.2K', color: 'purple' }
            ].map((activity, index) => {
              const IconComponent = activity.icon;
              return (
                <div key={index} className="group flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${
                      activity.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      activity.color === 'red' ? 'bg-red-100 text-red-600' :
                      activity.color === 'green' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    } group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                        {activity.text}
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-slate-900">{activity.count}</div>
                    <div className="text-xs text-slate-500">actions</div>
                  </div>
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
        className="mt-12 bg-gradient-to-r from-blue-50 via-white to-emerald-50 rounded-xl p-8 border border-slate-200 shadow-sm"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 text-white shadow-lg">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                Live Updates Active
              </h4>
              <p className="text-sm text-slate-600">
                New prompts added every 4 hours • Real-time usage tracking • Automated quality validation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="text-xs font-medium text-emerald-700 mt-1">LIVE</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-slate-500">Status</div>
              <div className="text-sm font-bold text-emerald-600">Active</div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}