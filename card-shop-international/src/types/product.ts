export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  category: string;
  subcategory?: string;
  imageUrl: string;
  images?: string[];
  stock: number;
  rarity?: 'Common' | 'Rare' | 'Super Rare' | 'Ultra Rare' | 'Secret Rare';
  condition?: 'Mint' | 'Near Mint' | 'Lightly Played' | 'Moderately Played' | 'Heavily Played' | 'Damaged';
  set?: string;
  cardNumber?: string;
  language?: 'Japanese' | 'English' | 'Korean' | 'Chinese';
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
}

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

export interface FilterOptions {
  category?: string;
  subcategory?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rarity?: string[];
  condition?: string[];
  language?: string[];
  inStock?: boolean;
  onSale?: boolean;
}

export interface SearchParams {
  query?: string;
  category?: string;
  subcategory?: string;
  sort?: 'name' | 'price-asc' | 'price-desc' | 'newest' | 'popularity';
  page?: number;
  limit?: number;
}