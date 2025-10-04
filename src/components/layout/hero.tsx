'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Play, BarChart3, Zap, Filter, Star } from 'lucide-react';

export function Hero() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Modern subtle background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-purple-100/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-64 w-64 rounded-full bg-pink-100/20 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center">
          {/* Modern badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 backdrop-blur-sm shadow-sm"
          >
            <Sparkles className="h-4 w-4 text-blue-600" />
            15,100+ Professional AI Video Prompts
            <span className="ml-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">New</span>
          </motion.div>

          {/* Modern typography */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
          >
            <span className="block text-slate-900">Create Stunning</span>
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Videos
            </span>
            <span className="block text-slate-900">with Perfect Prompts</span>
          </motion.h1>

          {/* Enhanced description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-3xl text-xl text-slate-600 leading-relaxed sm:text-2xl"
          >
            Access the world's largest collection of professionally curated AI video prompts.
            Transform your ideas into breathtaking videos with prompts that actually work.
          </motion.p>

          {/* Modern stats cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-6"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-100 mb-3 mx-auto">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">15,100+</div>
                <div className="text-sm text-slate-600 font-medium">Premium Prompts</div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-100 mb-3 mx-auto">
                  <Filter className="h-6 w-6 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">45+</div>
                <div className="text-sm text-slate-600 font-medium">Categories</div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-100 mb-3 mx-auto">
                  <Star className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">16</div>
                <div className="text-sm text-slate-600 font-medium">Platforms</div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-orange-200">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 mb-3 mx-auto">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-slate-900">4.8★</div>
                <div className="text-sm text-slate-600 font-medium">Avg Rating</div>
              </div>
            </div>
          </motion.div>

          {/* Modern CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/25">
              <Search className="h-5 w-5" />
              Explore Prompts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="group inline-flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-8 py-4 text-lg font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-400 hover:bg-slate-50 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-slate-500/25">
              <Play className="h-5 w-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Modern newsletter signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12"
          >
            <div className="mx-auto max-w-xl">
              <form onSubmit={handleSubscribe} className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for weekly prompt updates"
                  className="flex-1 rounded-full border border-slate-300 bg-white/80 px-6 py-4 text-slate-900 placeholder-slate-500 backdrop-blur-sm shadow-sm transition-all duration-300 focus:border-blue-500 focus:bg-white focus:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/25"
                  required
                />
                <button type="submit" className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/25">
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 text-sm font-medium text-green-600"
                >
                  ✓ Successfully subscribed! Check your email for confirmation.
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Enhanced feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3 lg:gap-8"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-blue-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 mb-4 mx-auto">
                  <Search className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Smart Search</h3>
                <p className="text-slate-600 leading-relaxed">
                  Advanced filtering by platform, category, quality score, and more. Find exactly what you need in seconds.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-purple-200">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-100 mb-4 mx-auto">
                  <BarChart3 className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Trending Insights</h3>
                <p className="text-slate-600 leading-relaxed">
                  Real-time analytics showing what's popular and working best. Stay ahead with trending prompts and techniques.
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-green-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 mb-4 mx-auto">
                  <Sparkles className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Expert Curated</h3>
                <p className="text-slate-600 leading-relaxed">
                  Every prompt is professionally tested and optimized. Get consistent, high-quality results every time.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}