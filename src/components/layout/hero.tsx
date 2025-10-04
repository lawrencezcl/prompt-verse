'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, ArrowRight, Play, BarChart3 } from 'lucide-react';

export function Hero() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-secondary/20 to-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4" />
            15,100+ Professional AI Video Prompts
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
          >
            <span className="block">Ultimate AI Video</span>
            <span className="block text-gradient">Prompt Collection</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Discover 15,100+ professionally curated text-to-video prompts for Runway, Pika Labs, Sora,
            Leonardo.ai, and more. Search, filter, and create stunning AI-generated videos with the best prompts.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-primary">15,100+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Prompts</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-secondary">45+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-accent">16</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Platforms</div>
            </div>
            <div className="rounded-lg bg-white/80 p-4 backdrop-blur-sm dark:bg-gray-800/80">
              <div className="text-2xl font-bold text-primary">4.8★</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</div>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <button className="btn-primary group flex items-center gap-2 px-8 py-3 text-lg">
              <Search className="h-5 w-5" />
              Explore Prompts
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="btn-secondary group flex items-center gap-2 px-8 py-3 text-lg">
              <Play className="h-5 w-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Newsletter Signup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <div className="mx-auto max-w-md">
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="search-input flex-1"
                  required
                />
                <button type="submit" className="btn-primary px-6 py-3">
                  Subscribe
                </button>
              </form>
              {isSubscribed && (
                <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                  ✓ Successfully subscribed!
                </p>
              )}
            </div>
          </motion.div>

          {/* Feature highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
          >
            <div className="glass-card p-6 text-left">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Smart Search</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Filter by platform, category, quality, and more
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 text-left">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-secondary/10 p-2">
                  <BarChart3 className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Trending Insights</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Discover what's popular and working best
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 text-left">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-accent/10 p-2">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Expert Curated</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Professional prompts tested and optimized
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}