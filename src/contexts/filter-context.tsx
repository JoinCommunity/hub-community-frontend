'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

import { useDebounce } from '@/hooks/use-debounce';

interface FilterContextType {
  searchTerm: string;
  debouncedSearchTerm: string;
  selectedTags: string[];
  setSearchTerm: (term: string) => void;
  setSelectedTags: (tags: string[]) => void;
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        debouncedSearchTerm,
        selectedTags,
        setSearchTerm,
        setSelectedTags,
        toggleTag,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
