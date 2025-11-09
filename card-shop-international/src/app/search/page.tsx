'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SearchBar } from '@/components/ui/SearchBar';
import { FilterSidebar, MobileFilterButton } from '@/components/ui/FilterSidebar';
import { SearchResults, SearchResultsSummary } from '@/components/ui/SearchResults';
import { useSearch, useSearchShortcuts } from '@/hooks/useSearch';
import { Button } from '@/components/ui/Button';
import { GameType, CardCondition } from '@prisma/client';
import { ArrowLeft, X } from 'lucide-react';

// Search page content component
function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    filters,
    results,
    pagination,
    isLoading,
    error,
    hasActiveFilters,
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
    clearFilters,
  } = useSearch();

  // Enable search shortcuts
  useSearchShortcuts();

  // Initialize search from URL parameters
  useEffect(() => {
    const urlQuery = searchParams.get('q') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlGameTypes = searchParams.get('gameTypes')?.split(',').filter(Boolean) as GameType[] || [];
    const urlPriceMin = searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const urlPriceMax = searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;
    const urlRarities = searchParams.get('rarities')?.split(',').filter(Boolean) || [];
    const urlConditions = searchParams.get('conditions')?.split(',').filter(Boolean) as CardCondition[] || [];
    const urlStockStatus = (searchParams.get('stock') as 'in_stock' | 'out_of_stock' | 'all') || 'all';
    const urlCurrency = (searchParams.get('currency') as 'USD' | 'JPY') || 'USD';
    const urlSort = (searchParams.get('sort') as any) || 'newest';

    // Apply URL parameters to store
    if (urlQuery !== filters.query) setQuery(urlQuery);
    if (urlCategory !== filters.category) setCategory(urlCategory);
    if (JSON.stringify(urlGameTypes) !== JSON.stringify(filters.gameTypes)) setGameTypes(urlGameTypes);
    if (urlPriceMin !== filters.priceMin || urlPriceMax !== filters.priceMax) {
      setPriceRange(urlPriceMin, urlPriceMax);
    }
    if (JSON.stringify(urlRarities) !== JSON.stringify(filters.rarities)) setRarities(urlRarities);
    if (JSON.stringify(urlConditions) !== JSON.stringify(filters.conditions)) setConditions(urlConditions);
    if (urlStockStatus !== filters.stockStatus) setStockStatus(urlStockStatus);
    if (urlCurrency !== filters.currency) setCurrency(urlCurrency);
    if (urlSort !== filters.sort) setSort(urlSort);

    // Perform initial search if there are parameters
    if (urlQuery || urlCategory || urlGameTypes.length > 0 || hasActiveFilters) {
      search();
    }
  }, [searchParams]); // Only depend on searchParams to avoid infinite loops

  // Update URL when filters change
  useEffect(() => {
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

    const newUrl = params.toString() ? `/search?${params.toString()}` : '/search';
    
    // Only update URL if it's different to avoid infinite loops
    if (window.location.pathname + window.location.search !== newUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [filters, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4 lg:mb-0">
            {/* Back button for mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="lg:hidden"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            {/* Search bar */}
            <div className="flex-1">
              <SearchBar
                placeholder="Search for trading cards, sets, or characters..."
                className="w-full"
                showFilters={false} // We'll use a separate filter button
              />
            </div>
            
            {/* Mobile filter button */}
            <MobileFilterButton />
          </div>
          
          {/* Active filters row */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap mt-4">
              <span className="text-sm text-gray-600">Active filters:</span>
              
              {filters.query && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  <span>"{filters.query}"</span>
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.category && (
                <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
                  <span>Category: {filters.category}</span>
                  <button
                    type="button"
                    onClick={() => setCategory('')}
                    className="text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.gameTypes.map((gameType) => (
                <div
                  key={gameType}
                  className="flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-sm"
                >
                  <span>{gameType}</span>
                  <button
                    type="button"
                    onClick={() => setGameTypes(filters.gameTypes.filter(gt => gt !== gameType))}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              
              {(filters.priceMin || filters.priceMax) && (
                <div className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-md text-sm">
                  <span>
                    Price: {filters.currency === 'USD' ? '$' : '¥'}{filters.priceMin || '0'} - 
                    {filters.currency === 'USD' ? '$' : '¥'}{filters.priceMax || '∞'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPriceRange(undefined, undefined)}
                    className="text-orange-600 hover:text-orange-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {filters.stockStatus !== 'all' && (
                <div className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm">
                  <span>
                    {filters.stockStatus === 'in_stock' ? 'In Stock' : 'Out of Stock'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setStockStatus('all')}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear All
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Hidden on mobile, shown in overlay */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            {/* Results summary */}
            <SearchResultsSummary />
            
            {/* Search results */}
            <SearchResults
              className="mt-6"
              showViewToggle={true}
              showSort={true}
              showPagination={true}
            />
          </div>
        </div>
      </div>

      {/* Filter sidebar overlay for mobile */}
      <FilterSidebar />
      
      {/* SEO and meta information */}
      <div className="hidden">
        <h1>
          {filters.query 
            ? `Search results for "${filters.query}" - Trading Card Shop`
            : 'Search Trading Cards - Card Shop International'
          }
        </h1>
        <p>
          Find the best trading cards from Pokemon, One Piece, Dragon Ball, Yu-Gi-Oh!, Magic: The Gathering, and more. 
          Search by game type, rarity, condition, and price range.
        </p>
      </div>
    </div>
  );
}

// Search page wrapper with suspense
export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">Loading search page...</p>
          </div>
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}

// Note: Metadata cannot be exported from client components
// Move metadata to a separate layout or server component if needed