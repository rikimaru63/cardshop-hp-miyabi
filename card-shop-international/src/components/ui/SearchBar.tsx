'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Clock, TrendingUp, Filter } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { Button } from './Button';
import { Input } from './Input';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showFilters?: boolean;
  showSuggestions?: boolean;
  onSearchFocus?: () => void;
  onSearchBlur?: () => void;
}

export function SearchBar({ 
  placeholder = "Search for cards, sets, or characters...",
  className,
  showFilters = true,
  showSuggestions = true,
  onSearchFocus,
  onSearchBlur,
}: SearchBarProps) {
  const {
    filters,
    searchHistory,
    recentSearches,
    isLoading,
    setQuery,
    search,
    clearHistory,
    toggleFilterSidebar,
    addToHistory,
  } = useSearchStore();

  const [localQuery, setLocalQuery] = useState(filters.query);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Real-time search with debouncing
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (localQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        setQuery(localQuery);
        search();
      }, 300); // 300ms debounce
    } else if (localQuery === '') {
      setQuery('');
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [localQuery, setQuery, search]);

  // Handle input focus
  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(showSuggestions && (recentSearches.length > 0 || searchHistory.length > 0));
    onSearchFocus?.();
  };

  // Handle input blur
  const handleBlur = (e: React.FocusEvent) => {
    // Delay blur to allow clicking on dropdown items
    setTimeout(() => {
      if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
        setShowDropdown(false);
        onSearchBlur?.();
      }
    }, 150);
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);
    
    if (value.trim() && showSuggestions) {
      setShowDropdown(true);
    } else if (!value.trim()) {
      setShowDropdown(showSuggestions && (recentSearches.length > 0 || searchHistory.length > 0));
    }
  };

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localQuery.trim()) {
      setQuery(localQuery);
      addToHistory(localQuery);
      search();
      setShowDropdown(false);
      inputRef.current?.blur();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setLocalQuery(suggestion);
    setQuery(suggestion);
    addToHistory(suggestion);
    search();
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  // Clear search
  const handleClear = () => {
    setLocalQuery('');
    setQuery('');
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  // Filter relevant search history based on current query
  const filteredHistory = searchHistory.filter(item =>
    item.toLowerCase().includes(localQuery.toLowerCase()) && item !== localQuery
  ).slice(0, 5);

  const filteredRecent = recentSearches.filter(item =>
    item.toLowerCase().includes(localQuery.toLowerCase()) && item !== localQuery
  ).slice(0, 3);

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              ref={inputRef}
              type="text"
              value={localQuery}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              className={cn(
                "w-full pl-10 pr-10 py-3 text-base",
                "border-2 border-gray-200 rounded-lg",
                "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
                "transition-all duration-200",
                isFocused && "ring-2 ring-blue-500/20"
              )}
            />
            
            {/* Clear button */}
            {localQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent" />
              </div>
            )}
          </div>

          {/* Filter toggle button */}
          {showFilters && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={toggleFilterSidebar}
              className="ml-2 h-12 w-12"
              aria-label="Toggle filters"
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Search suggestions dropdown */}
        {showDropdown && (
          <div
            ref={dropdownRef}
            className={cn(
              "absolute top-full left-0 right-0 mt-1 z-50",
              "bg-white border border-gray-200 rounded-lg shadow-lg",
              "max-h-80 overflow-y-auto"
            )}
          >
            {/* Recent searches */}
            {filteredRecent.length > 0 && (
              <div className="p-3 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
                  <Clock className="h-4 w-4" />
                  Recent Searches
                </div>
                <div className="space-y-1">
                  {filteredRecent.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-50 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Search history */}
            {filteredHistory.length > 0 && (
              <div className="p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <TrendingUp className="h-4 w-4" />
                    Search History
                  </div>
                  <button
                    type="button"
                    onClick={clearHistory}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="space-y-1">
                  {filteredHistory.map((item, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="w-full text-left px-2 py-1 text-sm rounded hover:bg-gray-50 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* No suggestions message */}
            {filteredRecent.length === 0 && filteredHistory.length === 0 && (
              <div className="p-4 text-center text-sm text-gray-500">
                {localQuery.trim() ? 'No recent searches found' : 'Start typing to search'}
              </div>
            )}
          </div>
        )}
      </form>

      {/* Search shortcuts help text */}
      {isFocused && !showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 p-2 text-xs text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <span>Press Enter to search</span>
            <span className="text-gray-400">Ctrl+K for quick access</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Keyboard shortcut hook for global search access
export function useSearchShortcut() {
  const { openFilterSidebar } = useSearchStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Focus search input if available, otherwise open filter sidebar
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        } else {
          openFilterSidebar();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [openFilterSidebar]);
}