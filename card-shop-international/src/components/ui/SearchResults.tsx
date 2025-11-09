'use client';

import React from 'react';
import { Grid, List, ChevronLeft, ChevronRight, ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';
import { useSearchStore } from '@/stores/searchStore';
import { ProductCard } from './ProductCard';
import { Button } from './Button';
import { Select } from './Select';
import { cn } from '@/lib/utils';

interface SearchResultsProps {
  className?: string;
  showViewToggle?: boolean;
  showSort?: boolean;
  showPagination?: boolean;
  defaultView?: 'grid' | 'list';
}

export function SearchResults({ 
  className,
  showViewToggle = true,
  showSort = true,
  showPagination = true,
  defaultView = 'grid'
}: SearchResultsProps) {
  const {
    results,
    pagination,
    filters,
    isLoading,
    error,
    setSort,
    setPage,
    search,
  } = useSearchStore();

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>(defaultView);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name_asc', label: 'Name A-Z' },
    { value: 'name_desc', label: 'Name Z-A' },
    { value: 'price_asc', label: 'Price Low to High' },
    { value: 'price_desc', label: 'Price High to Low' },
    { value: 'stock_asc', label: 'Stock Low to High' },
    { value: 'stock_desc', label: 'Stock High to Low' },
  ];

  const handleSortChange = (newSort: string) => {
    setSort(newSort as any);
    search();
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    search();
  };

  // Generate page numbers for pagination
  const generatePageNumbers = () => {
    if (!pagination) return [];
    
    const { page, totalPages } = pagination;
    const pages = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (page >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = page - 1; i <= page + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-lg animate-pulse"
              style={{ height: '320px' }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={cn("w-full p-8 text-center", className)}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Search Error
          </h3>
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={search} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // No results state
  if (!results.length && !isLoading) {
    return (
      <div className={cn("w-full p-8 text-center", className)}>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
          <div className="text-gray-400 mb-4">
            <Grid className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search criteria or filters to find what you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button
              onClick={() => {
                // Clear search filters but keep query
                const currentQuery = filters.query;
                // Implementation would call clearFilters and restore query
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
            <Button onClick={search}>
              Search Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      {/* Results header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {pagination && (
              <>
                Showing <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span>-
                <span className="font-medium">{Math.min(pagination.page * pagination.limit, pagination.total)}</span> of{' '}
                <span className="font-medium">{pagination.total}</span> products
              </>
            )}
          </div>
          
          {filters.query && (
            <div className="text-sm text-gray-500">
              for "<span className="font-medium">{filters.query}</span>"
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sort dropdown */}
          {showSort && (
            <Select
              value={filters.sort}
              onValueChange={handleSortChange}
              className="w-48"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          )}

          {/* View toggle */}
          {showViewToggle && (
            <div className="flex items-center border border-gray-200 rounded-md">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={cn(
                  "p-2 rounded-l-md transition-colors",
                  viewMode === 'grid'
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={cn(
                  "p-2 rounded-r-md transition-colors",
                  viewMode === 'list'
                    ? "bg-blue-500 text-white"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Results grid/list */}
      <div className={cn(
        viewMode === 'grid'
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          : "space-y-4"
      )}>
        {results.map((product) => (
          <ProductCard
            key={product.id}
            product={{
              id: product.id,
              name: product.nameEn,
              price: filters.currency === 'USD' ? product.priceUsd : product.priceJpy,
              description: product.description || '',
              category: product.category.nameEn,
              imageUrl: Array.isArray(product.images) && product.images.length > 0 
                ? product.images[0] 
                : '/placeholder-card.jpg',
              images: Array.isArray(product.images) ? product.images : [],
              stock: product.stockQuantity,
              rarity: product.rarity as any,
              condition: product.condition as any,
              set: product.cardSet,
              cardNumber: product.cardNumber,
              featured: product.featured,
            }}
            variant={viewMode === 'list' ? 'horizontal' : 'vertical'}
            showQuickView
            currency={filters.currency}
          />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={!pagination.hasPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-1">
            {generatePageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 py-1 text-gray-500">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page as number)}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm font-medium transition-colors",
                    page === pagination.page
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={!pagination.hasNextPage}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Results footer info */}
      {pagination && (
        <div className="text-center text-sm text-gray-500 pt-4">
          Page {pagination.page} of {pagination.totalPages}
        </div>
      )}
    </div>
  );
}

// Search results summary component
export function SearchResultsSummary() {
  const { filters, pagination, isLoading } = useSearchStore();

  if (isLoading || !pagination) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="font-medium">{pagination.total}</span>
        <span className="text-gray-600">products found</span>
        
        {filters.query && (
          <>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              matching "<span className="font-medium">{filters.query}</span>"
            </span>
          </>
        )}
        
        {filters.category && (
          <>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              in <span className="font-medium">{filters.category}</span>
            </span>
          </>
        )}
        
        {filters.gameTypes.length > 0 && (
          <>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              {filters.gameTypes.length} game type{filters.gameTypes.length !== 1 ? 's' : ''} selected
            </span>
          </>
        )}
        
        {(filters.priceMin || filters.priceMax) && (
          <>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">
              {filters.currency === 'USD' ? '$' : '¥'}{filters.priceMin || '0'} - 
              {filters.currency === 'USD' ? '$' : '¥'}{filters.priceMax || '∞'}
            </span>
          </>
        )}
      </div>
    </div>
  );
}