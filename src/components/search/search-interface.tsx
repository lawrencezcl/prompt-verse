'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Sparkles, TrendingUp, Sliders, Zap, Star } from 'lucide-react';
import { PLATFORMS, Difficulty, SearchFilters } from '@/types';

interface SearchInterfaceProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

const platforms = PLATFORMS;
const difficulties = Object.values(Difficulty);
const categories = [
  'Cinematic', 'Nature', 'People', 'Animals', 'Abstract', 'Technology',
  'Fantasy', 'Horror', 'Comedy', 'Documentary', 'Music', 'Sports',
  'Food', 'Fashion', 'Architecture', 'Transportation', 'Space', 'Underwater'
];

const aspectRatios = ['16:9', '9:16', '1:1', '4:3', '21:9'];

export function SearchInterface({ onSearch, loading = false }: SearchInterfaceProps) {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'relevance',
    sortOrder: 'desc',
  });

  const handleSearch = (searchQuery?: string) => {
    const finalFilters = {
      ...filters,
      query: searchQuery || query,
    };
    setFilters(finalFilters);
    onSearch(finalFilters);
    setActiveSuggestion(null);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onSearch(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      query,
      sortBy: 'relevance' as const,
      sortOrder: 'desc' as const,
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const activeFilterCount = Object.keys(filters).filter(key =>
    key !== 'query' &&
    key !== 'sortBy' &&
    key !== 'sortOrder' &&
    filters[key as keyof SearchFilters] !== undefined &&
    filters[key as keyof SearchFilters] !== ''
  ).length;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Main Search Bar */}
      <div className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for video prompts... (e.g., 'cinematic drone shot', 'portrait of a woman')"
            className="w-full h-16 pl-14 pr-40 text-base text-slate-900 bg-white/70 backdrop-blur-md border border-slate-200 rounded-xl shadow-modern placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 focus:bg-white"
          />
          <div className="absolute right-3 flex items-center gap-2">
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="h-11 px-5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-colored hover:from-blue-700 hover:to-blue-800 hover:shadow-modern-lg hover:scale-105 focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative h-11 w-11 rounded-xl border transition-all duration-200 hover:scale-105 ${
                showFilters || activeFilterCount > 0
                  ? 'border-blue-500 bg-blue-50 text-blue-600 shadow-colored'
                  : 'border-slate-200 bg-white/70 backdrop-blur-md text-slate-500 hover:bg-white/90 hover:text-slate-600 shadow-modern'
              }`}
            >
              <Sliders className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center font-medium">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestions */}
        {query.length > 0 && query.length < 3 && (
          <div className="absolute top-full left-0 right-0 mt-3 bg-white rounded-xl border border-slate-200 shadow-lg z-10">
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <Zap className="h-4 w-4" />
                Popular searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['cinematic', 'portrait', 'landscape', 'animation', 'drone'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => {
                      setQuery(suggestion);
                      handleSearch(suggestion);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      activeSuggestion === suggestion
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-white rounded-xl border border-slate-200 shadow-lg">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">Advanced Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      Clear All
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Platform Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Platform
                    </label>
                    <select
                      value={filters.platform || ''}
                      onChange={(e) => handleFilterChange('platform', e.target.value || undefined)}
                      className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">All Platforms</option>
                      {platforms.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform.replace('_', ' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                      className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={filters.difficulty || ''}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value || undefined)}
                      className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">All Levels</option>
                      {difficulties.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quality Range */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Quality Score
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.minQuality || ''}
                        onChange={(e) => handleFilterChange('minQuality', e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="Min"
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                      <span className="text-slate-500 text-sm font-medium">to</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.maxQuality || ''}
                        onChange={(e) => handleFilterChange('maxQuality', e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="Max"
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Duration Range */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Duration (seconds)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={filters.minDuration || ''}
                        onChange={(e) => handleFilterChange('minDuration', e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="Min"
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                      <span className="text-slate-500 text-sm font-medium">to</span>
                      <input
                        type="number"
                        min="1"
                        value={filters.maxDuration || ''}
                        onChange={(e) => handleFilterChange('maxDuration', e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="Max"
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Aspect Ratio
                    </label>
                    <select
                      value={filters.aspectRatio || ''}
                      onChange={(e) => handleFilterChange('aspectRatio', e.target.value || undefined)}
                      className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">All Ratios</option>
                      {aspectRatios.map((ratio) => (
                        <option key={ratio} value={ratio}>
                          {ratio}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sort Options */}
                <div className="mt-8 pt-6 border-t border-slate-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sort By
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="rating">Rating</option>
                        <option value="createdAt">Newest</option>
                        <option value="usageCount">Most Used</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Sort Order
                      </label>
                      <select
                        value={filters.sortOrder}
                        onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                        className="w-full px-3 py-2 text-sm text-slate-900 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters.isFeatured || false}
                      onChange={(e) => handleFilterChange('isFeatured', e.target.checked)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded transition-colors duration-200"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition-colors duration-200">
                      Show only featured prompts
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="mt-6 flex flex-wrap gap-3">
          {filters.platform && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg group">
              <span className="text-sm font-medium">Platform: {filters.platform.replace('_', ' ')}</span>
              <button
                onClick={() => handleFilterChange('platform', undefined)}
                className="hover:text-blue-900 transition-colors duration-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.category && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 border border-purple-200 rounded-lg group">
              <span className="text-sm font-medium">Category: {filters.category}</span>
              <button
                onClick={() => handleFilterChange('category', undefined)}
                className="hover:text-purple-900 transition-colors duration-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          {filters.difficulty && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg group">
              <span className="text-sm font-medium">Level: {filters.difficulty.charAt(0) + filters.difficulty.slice(1).toLowerCase()}</span>
              <button
                onClick={() => handleFilterChange('difficulty', undefined)}
                className="hover:text-green-900 transition-colors duration-200"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}