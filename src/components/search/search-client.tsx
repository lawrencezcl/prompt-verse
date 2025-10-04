'use client';

import { useState } from 'react';
import { SearchInterface } from '@/components/search/search-interface';
import { SearchFilters } from '@/types';

interface SearchClientProps {
  onSearch?: (filters: SearchFilters) => void;
}

export function SearchClient({ onSearch }: SearchClientProps) {
  const handleSearch = (filters: SearchFilters) => {
    console.log('Search filters:', filters);
    if (onSearch) {
      onSearch(filters);
    }
    // TODO: Implement navigation to search results page
  };

  return (
    <div className="mb-12">
      <SearchInterface onSearch={handleSearch} />
    </div>
  );
}