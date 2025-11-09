'use client';

import { useState, useMemo } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

interface CategoryPageClientProps {
  products: Product[];
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string;
    subcategories?: { id: string; name: string }[];
  };
  className?: string;
}

interface FilterState {
  subcategory: string;
  priceRange: { min: number; max: number };
  rarity: string[];
  condition: string[];
  language: string[];
  inStock: boolean;
  onSale: boolean;
}

export default function CategoryPageClient({ products, category, className }: CategoryPageClientProps) {
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<FilterState>({
    subcategory: '',
    priceRange: { min: 0, max: 5000 },
    rarity: [],
    condition: [],
    language: [],
    inStock: false,
    onSale: false
  });

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply subcategory filter
    if (filters.subcategory) {
      filtered = filtered.filter(p => p.subcategory === filters.subcategory);
    }

    // Apply other filters
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
  }, [products, filters, sortBy]);

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
      subcategory: '',
      priceRange: { min: 0, max: 5000 },
      rarity: [],
      condition: [],
      language: [],
      inStock: false,
      onSale: false
    });
  };

  return (
    <div className={className}>
      {/* Subcategories */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => handleFilterChange('subcategory', '')}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              !filters.subcategory
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'
            }`}
          >
            All {category.name}
          </button>
          {category.subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => handleFilterChange('subcategory', 
                filters.subcategory === subcategory.name ? '' : subcategory.name
              )}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                filters.subcategory === subcategory.name
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-red-600 hover:text-red-600'
              }`}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <p className="text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>
        
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
              <p className="text-gray-400">Try adjusting your filters</p>
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