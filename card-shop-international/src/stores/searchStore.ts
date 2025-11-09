import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GameType, CardCondition } from '@prisma/client';

export interface SearchFilters {
  query: string;
  category: string;
  gameTypes: GameType[];
  priceMin?: number;
  priceMax?: number;
  rarities: string[];
  conditions: CardCondition[];
  stockStatus: 'in_stock' | 'out_of_stock' | 'all';
  currency: 'USD' | 'JPY';
  sort: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'stock_asc' | 'stock_desc';
}

export interface SearchResult {
  id: string;
  sku: string;
  nameEn: string;
  nameJa?: string;
  categoryId: string;
  category: {
    id: string;
    nameEn: string;
    nameJa?: string;
    slug: string;
  };
  gameType: GameType;
  cardSet?: string;
  cardNumber?: string;
  rarity?: string;
  condition: CardCondition;
  psaGrade?: number;
  bgsGrade?: number;
  priceUsd: number;
  priceJpy: number;
  stockQuantity: number;
  images: string[];
  description?: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOption {
  value: string;
  count: number;
}

export interface AvailableFilters {
  gameTypes: FilterOption[];
  rarities: FilterOption[];
  conditions: FilterOption[];
  priceRange: {
    min: { usd: number; jpy: number };
    max: { usd: number; jpy: number };
  };
}

export interface SearchPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SearchState {
  // Search state
  filters: SearchFilters;
  results: SearchResult[];
  pagination: SearchPagination | null;
  availableFilters: AvailableFilters | null;
  
  // UI state
  isLoading: boolean;
  isFilterSidebarOpen: boolean;
  error: string | null;
  searchHistory: string[];
  recentSearches: string[];
  
  // Actions
  setQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setGameTypes: (gameTypes: GameType[]) => void;
  setPriceRange: (min?: number, max?: number) => void;
  setRarities: (rarities: string[]) => void;
  setConditions: (conditions: CardCondition[]) => void;
  setStockStatus: (status: 'in_stock' | 'out_of_stock' | 'all') => void;
  setCurrency: (currency: 'USD' | 'JPY') => void;
  setSort: (sort: SearchFilters['sort']) => void;
  setPage: (page: number) => void;
  
  // Filter actions
  addGameType: (gameType: GameType) => void;
  removeGameType: (gameType: GameType) => void;
  addRarity: (rarity: string) => void;
  removeRarity: (rarity: string) => void;
  addCondition: (condition: CardCondition) => void;
  removeCondition: (condition: CardCondition) => void;
  
  // Search actions
  search: () => Promise<void>;
  clearFilters: () => void;
  resetToDefaults: () => void;
  
  // UI actions
  toggleFilterSidebar: () => void;
  openFilterSidebar: () => void;
  closeFilterSidebar: () => void;
  
  // History actions
  addToHistory: (query: string) => void;
  clearHistory: () => void;
  
  // Results actions
  setResults: (results: SearchResult[]) => void;
  setPagination: (pagination: SearchPagination) => void;
  setAvailableFilters: (filters: AvailableFilters) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const defaultFilters: SearchFilters = {
  query: '',
  category: '',
  gameTypes: [],
  priceMin: undefined,
  priceMax: undefined,
  rarities: [],
  conditions: [],
  stockStatus: 'all',
  currency: 'USD',
  sort: 'newest',
};

export const useSearchStore = create<SearchState>()(
  persist(
    (set, get) => ({
      // Initial state
      filters: defaultFilters,
      results: [],
      pagination: null,
      availableFilters: null,
      isLoading: false,
      isFilterSidebarOpen: false,
      error: null,
      searchHistory: [],
      recentSearches: [],

      // Filter setters
      setQuery: (query: string) => {
        set((state) => ({
          filters: { ...state.filters, query },
          error: null,
        }));
      },

      setCategory: (category: string) => {
        set((state) => ({
          filters: { ...state.filters, category },
          error: null,
        }));
      },

      setGameTypes: (gameTypes: GameType[]) => {
        set((state) => ({
          filters: { ...state.filters, gameTypes },
          error: null,
        }));
      },

      setPriceRange: (min?: number, max?: number) => {
        set((state) => ({
          filters: { 
            ...state.filters, 
            priceMin: min, 
            priceMax: max 
          },
          error: null,
        }));
      },

      setRarities: (rarities: string[]) => {
        set((state) => ({
          filters: { ...state.filters, rarities },
          error: null,
        }));
      },

      setConditions: (conditions: CardCondition[]) => {
        set((state) => ({
          filters: { ...state.filters, conditions },
          error: null,
        }));
      },

      setStockStatus: (stockStatus: 'in_stock' | 'out_of_stock' | 'all') => {
        set((state) => ({
          filters: { ...state.filters, stockStatus },
          error: null,
        }));
      },

      setCurrency: (currency: 'USD' | 'JPY') => {
        set((state) => ({
          filters: { ...state.filters, currency },
          error: null,
        }));
      },

      setSort: (sort: SearchFilters['sort']) => {
        set((state) => ({
          filters: { ...state.filters, sort },
          error: null,
        }));
      },

      setPage: (page: number) => {
        set((state) => ({
          pagination: state.pagination ? { ...state.pagination, page } : null,
          error: null,
        }));
      },

      // Filter manipulation
      addGameType: (gameType: GameType) => {
        set((state) => ({
          filters: {
            ...state.filters,
            gameTypes: [...state.filters.gameTypes, gameType],
          },
          error: null,
        }));
      },

      removeGameType: (gameType: GameType) => {
        set((state) => ({
          filters: {
            ...state.filters,
            gameTypes: state.filters.gameTypes.filter(gt => gt !== gameType),
          },
          error: null,
        }));
      },

      addRarity: (rarity: string) => {
        set((state) => ({
          filters: {
            ...state.filters,
            rarities: [...state.filters.rarities, rarity],
          },
          error: null,
        }));
      },

      removeRarity: (rarity: string) => {
        set((state) => ({
          filters: {
            ...state.filters,
            rarities: state.filters.rarities.filter(r => r !== rarity),
          },
          error: null,
        }));
      },

      addCondition: (condition: CardCondition) => {
        set((state) => ({
          filters: {
            ...state.filters,
            conditions: [...state.filters.conditions, condition],
          },
          error: null,
        }));
      },

      removeCondition: (condition: CardCondition) => {
        set((state) => ({
          filters: {
            ...state.filters,
            conditions: state.filters.conditions.filter(c => c !== condition),
          },
          error: null,
        }));
      },

      // Search action
      search: async () => {
        const state = get();
        set({ isLoading: true, error: null });

        try {
          const params = new URLSearchParams();
          
          if (state.filters.query) params.set('query', state.filters.query);
          if (state.filters.category) params.set('category', state.filters.category);
          if (state.filters.gameTypes.length > 0) params.set('gameTypes', state.filters.gameTypes.join(','));
          if (state.filters.priceMin !== undefined) params.set('priceMin', state.filters.priceMin.toString());
          if (state.filters.priceMax !== undefined) params.set('priceMax', state.filters.priceMax.toString());
          if (state.filters.rarities.length > 0) params.set('rarities', state.filters.rarities.join(','));
          if (state.filters.conditions.length > 0) params.set('conditions', state.filters.conditions.join(','));
          if (state.filters.stockStatus !== 'all') params.set('stockStatus', state.filters.stockStatus);
          params.set('currency', state.filters.currency);
          params.set('sort', state.filters.sort);
          params.set('page', (state.pagination?.page || 1).toString());
          params.set('limit', '20');

          // Import products data locally instead of API call
          const { products, categories } = await import('@/lib/data/products');
          
          // Apply filters locally
          let filteredProducts = [...products];
          
          // Filter by query
          if (state.filters.query) {
            const query = state.filters.query.toLowerCase();
            filteredProducts = filteredProducts.filter(p => 
              p.name.toLowerCase().includes(query) ||
              (p.description && p.description.toLowerCase().includes(query))
            );
          }
          
          // Filter by category
          if (state.filters.category) {
            filteredProducts = filteredProducts.filter(p => 
              p.categoryId === state.filters.category
            );
          }
          
          // Filter by game types
          if (state.filters.gameTypes.length > 0) {
            filteredProducts = filteredProducts.filter(p => 
              state.filters.gameTypes.includes(p.gameType)
            );
          }
          
          // Filter by conditions
          if (state.filters.conditions.length > 0) {
            filteredProducts = filteredProducts.filter(p => 
              p.condition && state.filters.conditions.includes(p.condition)
            );
          }
          
          // Filter by rarities
          if (state.filters.rarities.length > 0) {
            filteredProducts = filteredProducts.filter(p => 
              p.rarity && state.filters.rarities.includes(p.rarity)
            );
          }
          
          // Filter by price range
          const currency = state.filters.currency;
          const priceField = currency === 'USD' ? 'priceUsd' : 'priceJpy';
          if (state.filters.priceMin !== undefined) {
            filteredProducts = filteredProducts.filter(p => 
              p[priceField] >= state.filters.priceMin!
            );
          }
          if (state.filters.priceMax !== undefined) {
            filteredProducts = filteredProducts.filter(p => 
              p[priceField] <= state.filters.priceMax!
            );
          }
          
          // Filter by stock status
          if (state.filters.stockStatus === 'in_stock') {
            filteredProducts = filteredProducts.filter(p => p.stockQuantity > 0);
          } else if (state.filters.stockStatus === 'out_of_stock') {
            filteredProducts = filteredProducts.filter(p => p.stockQuantity === 0);
          }
          
          // Apply sorting
          const sortedProducts = [...filteredProducts];
          switch (state.filters.sort) {
            case 'name_asc':
              sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'name_desc':
              sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
              break;
            case 'price_asc':
              sortedProducts.sort((a, b) => a[priceField] - b[priceField]);
              break;
            case 'price_desc':
              sortedProducts.sort((a, b) => b[priceField] - a[priceField]);
              break;
            case 'stock_asc':
              sortedProducts.sort((a, b) => a.stockQuantity - b.stockQuantity);
              break;
            case 'stock_desc':
              sortedProducts.sort((a, b) => b.stockQuantity - a.stockQuantity);
              break;
            case 'newest':
              sortedProducts.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
              break;
            case 'oldest':
              sortedProducts.sort((a, b) => (a.createdAt || '').localeCompare(b.createdAt || ''));
              break;
          }
          
          // Create response data with transformed products
          const page = state.pagination?.page || 1;
          const limit = 20;
          const startIndex = (page - 1) * limit;
          const paginatedProducts = sortedProducts.slice(startIndex, startIndex + limit);
          
          // Transform Product to SearchResult
          const searchResults: SearchResult[] = paginatedProducts.map(p => {
            // Find category info
            const categoryInfo = categories.find(c => c.slug === p.categoryId) || {
              id: p.categoryId,
              name: p.category,
              slug: p.categoryId,
            };
            
            return {
              id: p.id,
              sku: p.sku,
              nameEn: p.nameEn,
              nameJa: p.nameJa,
              categoryId: p.categoryId,
              category: {
                id: categoryInfo.id,
                nameEn: categoryInfo.name,
                nameJa: categoryInfo.name,
                slug: categoryInfo.slug,
              },
              gameType: p.gameType,
              cardSet: p.set || p.cardSet,
              cardNumber: p.cardNumber,
              rarity: p.rarity,
              condition: p.condition || 'MINT' as CardCondition,
              psaGrade: p.psaGrade,
              bgsGrade: p.bgsGrade,
              priceUsd: p.priceUsd,
              priceJpy: p.priceJpy,
              stockQuantity: p.stockQuantity,
              images: p.images || [p.imageUrl],
              description: p.description,
              featured: p.featured || false,
              active: p.active || true,
              createdAt: p.createdAt || new Date().toISOString(),
              updatedAt: p.updatedAt || new Date().toISOString(),
            };
          });
          
          const data = {
            results: searchResults,
            pagination: {
              page,
              limit,
              total: filteredProducts.length,
              totalPages: Math.ceil(filteredProducts.length / limit),
              hasNextPage: startIndex + limit < filteredProducts.length,
              hasPreviousPage: page > 1,
            },
            filters: {
              available: {
                gameTypes: [],
                rarities: [],
                conditions: [],
                priceRange: {
                  min: { usd: 0, jpy: 0 },
                  max: { usd: 10000, jpy: 1000000 },
                },
              },
            },
          };
          
          set({
            results: data.results,
            pagination: data.pagination,
            availableFilters: data.filters.available,
            isLoading: false,
            error: null,
          });

          // Add to search history if there's a query
          if (state.filters.query) {
            get().addToHistory(state.filters.query);
          }
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Search failed',
            results: [],
            pagination: null,
          });
        }
      },

      // Utility actions
      clearFilters: () => {
        set((state) => ({
          filters: { ...defaultFilters, currency: state.filters.currency },
          error: null,
        }));
      },

      resetToDefaults: () => {
        set({
          filters: defaultFilters,
          results: [],
          pagination: null,
          error: null,
        });
      },

      // UI actions
      toggleFilterSidebar: () => {
        set((state) => ({
          isFilterSidebarOpen: !state.isFilterSidebarOpen,
        }));
      },

      openFilterSidebar: () => {
        set({ isFilterSidebarOpen: true });
      },

      closeFilterSidebar: () => {
        set({ isFilterSidebarOpen: false });
      },

      // History actions
      addToHistory: (query: string) => {
        if (!query.trim()) return;
        
        set((state) => {
          const newHistory = [
            query,
            ...state.searchHistory.filter(h => h !== query),
          ].slice(0, 10); // Keep only last 10 searches

          const newRecent = [
            query,
            ...state.recentSearches.filter(r => r !== query),
          ].slice(0, 5); // Keep only last 5 recent searches

          return {
            searchHistory: newHistory,
            recentSearches: newRecent,
          };
        });
      },

      clearHistory: () => {
        set({
          searchHistory: [],
          recentSearches: [],
        });
      },

      // Direct setters for external use
      setResults: (results: SearchResult[]) => {
        set({ results });
      },

      setPagination: (pagination: SearchPagination) => {
        set({ pagination });
      },

      setAvailableFilters: (availableFilters: AvailableFilters) => {
        set({ availableFilters });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },

      setError: (error: string | null) => {
        set({ error });
      },
    }),
    {
      name: 'search-storage',
      partialize: (state) => ({
        filters: {
          ...state.filters,
          query: '', // Don't persist query
        },
        searchHistory: state.searchHistory,
        recentSearches: state.recentSearches,
      }),
    }
  )
);