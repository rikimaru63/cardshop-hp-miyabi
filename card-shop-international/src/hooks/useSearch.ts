import { useCallback, useEffect, useRef } from 'react';
import { useSearchStore, SearchFilters, SearchResult } from '@/stores/searchStore';
import { GameType, CardCondition } from '@prisma/client';

// Main search hook with comprehensive functionality
export function useSearch() {
  const {
    filters,
    results,
    pagination,
    availableFilters,
    isLoading,
    error,
    searchHistory,
    recentSearches,
    
    // Filter setters
    setQuery,
    setCategory,
    setGameTypes,
    setPriceRange,
    setRarities,
    setConditions,
    setStockStatus,
    setCurrency,
    setSort,
    setPage,
    
    // Filter manipulation
    addGameType,
    removeGameType,
    addRarity,
    removeRarity,
    addCondition,
    removeCondition,
    
    // Actions
    search,
    clearFilters,
    resetToDefaults,
    addToHistory,
    clearHistory,
  } = useSearchStore();

  // Memoized search function to prevent unnecessary re-renders
  const performSearch = useCallback(async (customFilters?: Partial<SearchFilters>) => {
    if (customFilters) {
      // Apply custom filters before searching
      Object.entries(customFilters).forEach(([key, value]) => {
        switch (key) {
          case 'query':
            setQuery(value as string);
            break;
          case 'category':
            setCategory(value as string);
            break;
          case 'gameTypes':
            setGameTypes(value as GameType[]);
            break;
          case 'priceMin':
          case 'priceMax':
            setPriceRange(
              key === 'priceMin' ? value as number : filters.priceMin,
              key === 'priceMax' ? value as number : filters.priceMax
            );
            break;
          case 'rarities':
            setRarities(value as string[]);
            break;
          case 'conditions':
            setConditions(value as CardCondition[]);
            break;
          case 'stockStatus':
            setStockStatus(value as 'in_stock' | 'out_of_stock' | 'all');
            break;
          case 'currency':
            setCurrency(value as 'USD' | 'JPY');
            break;
          case 'sort':
            setSort(value as SearchFilters['sort']);
            break;
        }
      });
      
      // Small delay to ensure state updates are applied
      setTimeout(search, 10);
    } else {
      await search();
    }
  }, [
    filters,
    search,
    setQuery,
    setCategory,
    setGameTypes,
    setPriceRange,
    setRarities,
    setConditions,
    setStockStatus,
    setCurrency,
    setSort,
  ]);

  return {
    // State
    filters,
    results,
    pagination,
    availableFilters,
    isLoading,
    error,
    searchHistory,
    recentSearches,
    
    // Filter setters
    setQuery,
    setCategory,
    setGameTypes,
    setPriceRange,
    setRarities,
    setConditions,
    setStockStatus,
    setCurrency,
    setSort,
    setPage,
    
    // Filter manipulation
    addGameType,
    removeGameType,
    addRarity,
    removeRarity,
    addCondition,
    removeCondition,
    
    // Actions
    search: performSearch,
    clearFilters,
    resetToDefaults,
    addToHistory,
    clearHistory,
    
    // Computed values
    hasActiveFilters: !!(
      filters.query ||
      filters.category ||
      filters.gameTypes.length > 0 ||
      filters.rarities.length > 0 ||
      filters.conditions.length > 0 ||
      filters.priceMin ||
      filters.priceMax ||
      filters.stockStatus !== 'all'
    ),
    
    totalFiltersCount: [
      filters.gameTypes.length,
      filters.rarities.length,
      filters.conditions.length,
      filters.priceMin ? 1 : 0,
      filters.priceMax ? 1 : 0,
      filters.stockStatus !== 'all' ? 1 : 0,
    ].reduce((sum, count) => sum + count, 0),
  };
}

// Hook for real-time search with debouncing
export function useRealtimeSearch(delay: number = 300) {
  const { setQuery, search } = useSearchStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performRealtimeSearch = useCallback((query: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(query);
      search();
    }, delay);
  }, [setQuery, search, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    performRealtimeSearch,
  };
}

// Hook for search suggestions and autocomplete
export function useSearchSuggestions() {
  const { searchHistory, recentSearches } = useSearchStore();

  const getSuggestions = useCallback((query: string, maxResults: number = 10) => {
    if (!query.trim()) return [];

    const queryLower = query.toLowerCase();
    
    // Combine and deduplicate history
    const allSuggestions = [
      ...recentSearches,
      ...searchHistory,
    ];

    const uniqueSuggestions = Array.from(new Set(allSuggestions));
    
    // Filter suggestions that match the query
    const matchingSuggestions = uniqueSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(queryLower) &&
        suggestion.toLowerCase() !== queryLower
      )
      .slice(0, maxResults);

    return matchingSuggestions;
  }, [searchHistory, recentSearches]);

  return {
    getSuggestions,
    searchHistory,
    recentSearches,
  };
}

// Hook for search analytics and insights
export function useSearchAnalytics() {
  const { searchHistory, results, filters, pagination } = useSearchStore();

  const analytics = {
    totalSearches: searchHistory.length,
    resultsCount: results.length,
    currentPage: pagination?.page || 1,
    totalPages: pagination?.totalPages || 1,
    totalResults: pagination?.total || 0,
    
    // Popular searches (top 5)
    popularSearches: searchHistory
      .reduce((acc, search) => {
        acc[search] = (acc[search] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    
    // Current search effectiveness
    searchEffectiveness: pagination?.total 
      ? Math.min(100, (results.length / pagination.total) * 100)
      : 0,
    
    // Filter usage
    activeFiltersCount: [
      filters.gameTypes.length,
      filters.rarities.length,
      filters.conditions.length,
      filters.priceMin ? 1 : 0,
      filters.priceMax ? 1 : 0,
      filters.stockStatus !== 'all' ? 1 : 0,
    ].reduce((sum, count) => sum + count, 0),
  };

  return analytics;
}

// Hook for advanced search functionality
export function useAdvancedSearch() {
  const { search } = useSearch();

  const quickFilters = {
    inStock: () => search({ stockStatus: 'in_stock' }),
    onSale: () => {
      // This would require additional sale logic in the future
      console.log('On sale filter not yet implemented');
    },
    newArrivals: () => search({ sort: 'newest' }),
    highToLow: () => search({ sort: 'price_desc' }),
    lowToHigh: () => search({ sort: 'price_asc' }),
  };

  const gameTypeFilters = {
    pokemon: () => search({ gameTypes: ['POKEMON'] }),
    onePiece: () => search({ gameTypes: ['ONE_PIECE'] }),
    dragonBall: () => search({ gameTypes: ['DRAGON_BALL'] }),
    yugioh: () => search({ gameTypes: ['YUGIOH'] }),
    mtg: () => search({ gameTypes: ['MTG'] }),
    digimon: () => search({ gameTypes: ['DIGIMON'] }),
    weissSchwarz: () => search({ gameTypes: ['WEISS_SCHWARZ'] }),
  };

  const conditionFilters = {
    mint: () => search({ conditions: ['MINT'] }),
    nearMint: () => search({ conditions: ['NEAR_MINT'] }),
    excellent: () => search({ conditions: ['EXCELLENT'] }),
    good: () => search({ conditions: ['GOOD'] }),
    played: () => search({ conditions: ['LIGHT_PLAYED', 'PLAYED'] }),
  };

  const priceRanges = {
    under10: () => search({ priceMax: 10 }),
    between10And50: () => search({ priceMin: 10, priceMax: 50 }),
    between50And100: () => search({ priceMin: 50, priceMax: 100 }),
    over100: () => search({ priceMin: 100 }),
  };

  return {
    quickFilters,
    gameTypeFilters,
    conditionFilters,
    priceRanges,
  };
}

// Hook for search keyboard shortcuts
export function useSearchShortcuts() {
  const { setQuery, search, clearFilters } = useSearchStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      }
      
      // Ctrl/Cmd + Enter: Search
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        search();
      }
      
      // Ctrl/Cmd + Backspace: Clear filters
      if ((e.ctrlKey || e.metaKey) && e.key === 'Backspace') {
        e.preventDefault();
        clearFilters();
      }
      
      // Escape: Clear search query
      if (e.key === 'Escape') {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement?.tagName === 'INPUT') {
          setQuery('');
          activeElement.blur();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setQuery, search, clearFilters]);
}

// Hook for search URL management (for sharing and bookmarking)
export function useSearchURL() {
  const { filters } = useSearchStore();

  const getSearchURL = useCallback(() => {
    const params = new URLSearchParams();
    
    if (filters.query) params.set('q', filters.query);
    if (filters.category) params.set('category', filters.category);
    if (filters.gameTypes.length > 0) params.set('gameTypes', filters.gameTypes.join(','));
    if (filters.priceMin) params.set('minPrice', filters.priceMin.toString());
    if (filters.priceMax) params.set('maxPrice', filters.priceMax.toString());
    if (filters.rarities.length > 0) params.set('rarities', filters.rarities.join(','));
    if (filters.conditions.length > 0) params.set('conditions', filters.conditions.join(','));
    if (filters.stockStatus !== 'all') params.set('stock', filters.stockStatus);
    if (filters.currency !== 'USD') params.set('currency', filters.currency);
    if (filters.sort !== 'newest') params.set('sort', filters.sort);

    return params.toString();
  }, [filters]);

  const shareSearchURL = useCallback(() => {
    const url = `${window.location.origin}/search?${getSearchURL()}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Card Shop Search',
        text: `Check out this search: ${filters.query || 'Trading Cards'}`,
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      // You could show a toast notification here
      console.log('Search URL copied to clipboard');
    }
  }, [getSearchURL, filters.query]);

  return {
    getSearchURL,
    shareSearchURL,
  };
}