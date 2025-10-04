'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronDown, Sparkles, TrendingUp } from 'lucide-react';
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
          <Search className="absolute left-4 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search for video prompts... (e.g., 'cinematic drone shot', 'portrait of a woman')"
            className="search-input pl-12 pr-32 h-14 text-lg"
          />
          <div className="absolute right-2 flex items-center gap-2">
            <button
              onClick={() => handleSearch()}
              disabled={loading}
              className="btn-primary h-10 px-4 text-sm disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`relative h-10 w-10 rounded-lg border transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400'
              }`}
            >
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-white flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Quick Suggestions */}
        {query.length > 0 && query.length < 3 && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700 z-10">
            <div className="p-3">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Sparkles className="h-4 w-4" />
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
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
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
            <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-lg dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced Filters</h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-1"
                    >
                      <X className="h-4 w-4" />
                      Clear All
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Platform Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Platform
                    </label>
                    <select
                      value={filters.platform || ''}
                      onChange={(e) => handleFilterChange('platform', e.target.value || undefined)}
                      className="search-input"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <select
                      value={filters.category || ''}
                      onChange={(e) => handleFilterChange('category', e.target.value || undefined)}
                      className="search-input"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={filters.difficulty || ''}
                      onChange={(e) => handleFilterChange('difficulty', e.target.value || undefined)}
                      className="search-input"
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
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                        className="search-input w-20"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.1"
                        value={filters.maxQuality || ''}
                        onChange={(e) => handleFilterChange('maxQuality', e.target.value ? parseFloat(e.target.value) : undefined)}
                        placeholder="Max"
                        className="search-input w-20"
                      />
                    </div>
                  </div>

                  {/* Duration Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (seconds)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={filters.minDuration || ''}
                        onChange={(e) => handleFilterChange('minDuration', e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="Min"
                        className="search-input w-20"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="number"
                        min="1"
                        value={filters.maxDuration || ''}
                        onChange={(e) => handleFilterChange('maxDuration', e.target.value ? parseInt(e.target.value) : undefined)}
                        placeholder="Max"
                        className="search-input w-20"
                      />
                    </div>
                  </div>

                  {/* Aspect Ratio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Aspect Ratio
                    </label>
                    <select
                      value={filters.aspectRatio || ''}
                      onChange={(e) => handleFilterChange('aspectRatio', e.target.value || undefined)}
                      className="search-input"
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
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                        className="search-input"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="rating">Rating</option>
                        <option value="createdAt">Newest</option>
                        <option value="usageCount">Most Used</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Sort Order
                      </label>
                      <select
                        value={filters.sortOrder}
                        onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                        className="search-input"
                      >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Featured Toggle */}
                <div className="mt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filters.isFeatured || false}
                      onChange={(e) => handleFilterChange('isFeatured', e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
        <div className="mt-4 flex flex-wrap gap-2">
          {filters.platform && (
            <span className="tag flex items-center gap-1">
              Platform: {filters.platform.replace('_', ' ')}
              <button
                onClick={() => handleFilterChange('platform', undefined)}
                className="ml-1 hover:text-primary"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.category && (
            <span className="tag flex items-center gap-1">
              Category: {filters.category}
              <button
                onClick={() => handleFilterChange('category', undefined)}
                className="ml-1 hover:text-primary"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {filters.difficulty && (
            <span className="tag flex items-center gap-1">
              Level: {filters.difficulty.charAt(0) + filters.difficulty.slice(1).toLowerCase()}
              <button
                onClick={() => handleFilterChange('difficulty', undefined)}
                className="ml-1 hover:text-primary"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}