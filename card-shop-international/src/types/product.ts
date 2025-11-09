import { GameType, CardCondition } from '@prisma/client';

// Re-export types
export { GameType, CardCondition };

export interface Product {
  id: string;
  sku: string;
  name: string;
  nameEn: string;
  nameJa?: string;
  price: number;
  priceUsd: number;
  priceJpy: number;
  originalPrice?: number;
  description?: string;
  category: string;
  categoryId: string;
  subcategory?: string;
  gameType: GameType;
  imageUrl: string;
  images?: string[];
  stock: number;
  stockQuantity: number;
  rarity?: string;
  condition?: CardCondition;
  cardSet?: string;
  set?: string;
  cardNumber?: string;
  language?: 'Japanese' | 'English' | 'Korean' | 'Chinese';
  psaGrade?: number;
  bgsGrade?: number;
  featured?: boolean;
  active?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Enhanced product interface for search results
export interface SearchProduct {
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

// Game type labels for UI
export const gameTypeLabels: Record<GameType, string> = {
  POKEMON: 'Pokémon',
  ONE_PIECE: 'One Piece',
  DRAGON_BALL: 'Dragon Ball',
  YUGIOH: 'Yu-Gi-Oh!',
  MTG: 'Magic: The Gathering',
  DIGIMON: 'Digimon',
  WEISS_SCHWARZ: 'Weiss Schwarz',
  OTHER: 'Other',
};

// Condition labels for UI
export const conditionLabels: Record<CardCondition, string> = {
  MINT: 'Mint',
  NEAR_MINT: 'Near Mint',
  EXCELLENT: 'Excellent',
  GOOD: 'Good',
  LIGHT_PLAYED: 'Lightly Played',
  PLAYED: 'Played',
  POOR: 'Poor',
};

// Rarity options (common across different games)
export const rarityOptions = [
  'Common', 'Uncommon', 'Rare', 'Super Rare', 'Ultra Rare', 'Secret Rare',
  'UR', 'SR', 'R', 'C', 'PR', 'P', 'N', 'SEC', 'HR', 'SSR', 'SP',
  'RRR', 'RR', 'TD', 'OFR', 'L', 'DON'
];

// Language options
export const languageOptions = [
  'Japanese', 'English', 'Korean', 'Chinese', 'French', 'German', 'Italian', 'Spanish'
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

// Enhanced filter options interface
export interface FilterOptions {
  query?: string;
  category?: string;
  subcategory?: string;
  gameTypes?: GameType[];
  priceRange?: {
    min: number;
    max: number;
  };
  priceMin?: number;
  priceMax?: number;
  rarity?: string[];
  rarities?: string[];
  condition?: CardCondition[];
  conditions?: CardCondition[];
  language?: string[];
  languages?: string[];
  stockStatus?: 'in_stock' | 'out_of_stock' | 'all';
  inStock?: boolean;
  onSale?: boolean;
  featured?: boolean;
  currency?: 'USD' | 'JPY';
  psaGradeMin?: number;
  psaGradeMax?: number;
  bgsGradeMin?: number;
  bgsGradeMax?: number;
}

// Enhanced search parameters interface
export interface SearchParams {
  query?: string;
  category?: string;
  subcategory?: string;
  gameTypes?: string; // comma-separated values
  priceMin?: number;
  priceMax?: number;
  rarities?: string; // comma-separated values
  conditions?: string; // comma-separated values
  languages?: string; // comma-separated values
  stockStatus?: 'in_stock' | 'out_of_stock' | 'all';
  currency?: 'USD' | 'JPY';
  sort?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'stock_asc' | 'stock_desc' | 'popularity';
  page?: number;
  limit?: number;
}

// Search response interface
export interface SearchResponse {
  products: SearchProduct[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    applied: FilterOptions;
    available: {
      gameTypes: Array<{ value: string; count: number }>;
      rarities: Array<{ value: string; count: number }>;
      conditions: Array<{ value: string; count: number }>;
      priceRange: {
        min: { usd: number; jpy: number };
        max: { usd: number; jpy: number };
      };
    };
  };
  meta: {
    searchTime: number;
    currency: 'USD' | 'JPY';
  };
}

// Sort options for UI
export const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'name_asc', label: 'Name A-Z' },
  { value: 'name_desc', label: 'Name Z-A' },
  { value: 'price_asc', label: 'Price Low to High' },
  { value: 'price_desc', label: 'Price High to Low' },
  { value: 'stock_asc', label: 'Stock Low to High' },
  { value: 'stock_desc', label: 'Stock High to Low' },
];

// Quick filter presets
export const quickFilters = {
  inStock: { stockStatus: 'in_stock' as const },
  featured: { featured: true },
  highGrade: { psaGradeMin: 9 },
  budget: { priceMax: 50 },
  premium: { priceMin: 100 },
  newArrivals: { sort: 'newest' as const },
};

// Price range presets by currency
export const priceRangePresets = {
  USD: [
    { label: 'Under $10', min: 0, max: 10 },
    { label: '$10 - $50', min: 10, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $500', min: 100, max: 500 },
    { label: 'Over $500', min: 500, max: undefined },
  ],
  JPY: [
    { label: 'Under ¥1,000', min: 0, max: 1000 },
    { label: '¥1,000 - ¥5,000', min: 1000, max: 5000 },
    { label: '¥5,000 - ¥10,000', min: 5000, max: 10000 },
    { label: '¥10,000 - ¥50,000', min: 10000, max: 50000 },
    { label: 'Over ¥50,000', min: 50000, max: undefined },
  ],
};