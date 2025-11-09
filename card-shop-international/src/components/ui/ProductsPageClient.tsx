'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import { products, categories, searchProducts } from '@/lib/data/products';
import { Product, Category } from '@/types/product';

interface ProductsPageClientProps {
  initialProducts?: Product[];
  allCategories?: Category[];
  className?: string;
}

interface FilterState {
  category: string;
  priceRange: { min: number; max: number };
  rarity: string[];
  condition: string[];
  language: string[];
  inStock: boolean;
  onSale: boolean;
}

export default function ProductsPageClient({ 
  initialProducts = products, 
  allCategories = categories,
  className 
}: ProductsPageClientProps) {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    priceRange: { min: 0, max: 5000 },
    rarity: [],
    condition: [],
    language: [],
    inStock: false,
    onSale: false
  });

  // Get search query and filter from URL params
  const searchQuery = searchParams.get('search') || '';
  const filterType = searchParams.get('filter') || '';
  const categoryFilter = searchParams.get('category') || '';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Apply search query
    if (searchQuery) {
      filtered = searchProducts(searchQuery);
    }

    // Apply URL filter
    if (filterType === 'new') {
      filtered = filtered.filter(p => p.isNew);
    } else if (filterType === 'sale') {
      filtered = filtered.filter(p => p.onSale);
    } else if (filterType === 'featured') {
      filtered = filtered.filter(p => p.featured);
    }

    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply local filters
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.inStock) {
      filtered = filtered.filter(p => p.stock > 0);
    }

    if (filters.onSale) {
      filtered = filtered.filter(p => p.onSale);
    }

    // Filter by price range
    filtered = filtered.filter(p => 
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Filter by rarity
    if (filters.rarity.length > 0) {
      filtered = filtered.filter(p => 
        p.rarity && filters.rarity.includes(p.rarity)
      );
    }

    // Filter by condition
    if (filters.condition.length > 0) {
      filtered = filtered.filter(p => 
        p.condition && filters.condition.includes(p.condition)
      );
    }

    // Filter by language
    if (filters.language.length > 0) {
      filtered = filtered.filter(p => 
        p.language && filters.language.includes(p.language)
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [searchQuery, filterType, categoryFilter, filters, sortBy, initialProducts]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCheckboxFilter = (key: string, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [key]: checked 
        ? [...(prev[key as keyof FilterState] as string[]), value]
        : (prev[key as keyof FilterState] as string[]).filter(item => item !== value)
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: { min: 0, max: 5000 },
      rarity: [],
      condition: [],
      language: [],
      inStock: false,
      onSale: false
    });
  };

  const getPageTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (filterType === 'new') return 'New Arrivals';
    if (filterType === 'sale') return 'Sale Items';
    if (filterType === 'featured') return 'Featured Products';
    if (categoryFilter) return `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Cards`;
    return 'All Products';
  };

  return (
    <div className={`container mx-auto px-4 py-8 ${className}`}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{getPageTitle()}</h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {initialProducts.length} products
          </p>
          
          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-red-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="name">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest First</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Filters Sidebar */}
        {showFilters && (
          <div className="w-80 bg-white p-6 rounded-lg border border-gray-200 h-fit">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Categories</option>
                  {allCategories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        min: parseInt(e.target.value) || 0
                      })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handleFilterChange('priceRange', {
                        ...filters.priceRange,
                        max: parseInt(e.target.value) || 5000
                      })}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                  </div>
                </div>
              </div>

              {/* Rarity */}
              <div>
                <h4 className="font-medium mb-3">Rarity</h4>
                <div className="space-y-2">
                  {['Common', 'Rare', 'Super Rare', 'Ultra Rare', 'Secret Rare'].map(rarity => (
                    <label key={rarity} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.rarity.includes(rarity)}
                        onChange={(e) => handleCheckboxFilter('rarity', rarity, e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm">{rarity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Condition */}
              <div>
                <h4 className="font-medium mb-3">Condition</h4>
                <div className="space-y-2">
                  {['Mint', 'Near Mint', 'Lightly Played', 'Moderately Played', 'Heavily Played', 'Damaged'].map(condition => (
                    <label key={condition} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.condition.includes(condition)}
                        onChange={(e) => handleCheckboxFilter('condition', condition, e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <h4 className="font-medium mb-3">Language</h4>
                <div className="space-y-2">
                  {['Japanese', 'English', 'Korean', 'Chinese'].map(language => (
                    <label key={language} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={filters.language.includes(language)}
                        onChange={(e) => handleCheckboxFilter('language', language, e.target.checked)}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Other Filters */}
              <div>
                <h4 className="font-medium mb-3">Other</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm">In Stock Only</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={filters.onSale}
                      onChange={(e) => handleFilterChange('onSale', e.target.checked)}
                      className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm">On Sale</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 mb-4">No products found</p>
              <p className="text-gray-400">Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  className={viewMode === 'list' ? 'flex-row' : ''}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}