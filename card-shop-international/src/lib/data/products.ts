import { Product, Category } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Pokemon',
    slug: 'pokemon',
    description: 'Pokemon Trading Cards',
    subcategories: [
      { id: '1-1', name: 'Base Set', slug: 'base-set', categoryId: '1' },
      { id: '1-2', name: 'Gym Heroes', slug: 'gym-heroes', categoryId: '1' },
      { id: '1-3', name: 'Neo Genesis', slug: 'neo-genesis', categoryId: '1' },
      { id: '1-4', name: 'Modern Sets', slug: 'modern-sets', categoryId: '1' },
    ]
  },
  {
    id: '2',
    name: 'One Piece',
    slug: 'one-piece',
    description: 'One Piece Trading Cards',
    subcategories: [
      { id: '2-1', name: 'Romance Dawn', slug: 'romance-dawn', categoryId: '2' },
      { id: '2-2', name: 'Paramount War', slug: 'paramount-war', categoryId: '2' },
      { id: '2-3', name: 'Pillars of Strength', slug: 'pillars-of-strength', categoryId: '2' },
    ]
  },
  {
    id: '3',
    name: 'Dragon Ball',
    slug: 'dragon-ball',
    description: 'Dragon Ball Super Cards',
    subcategories: [
      { id: '3-1', name: 'Galactic Battle', slug: 'galactic-battle', categoryId: '3' },
      { id: '3-2', name: 'Union Force', slug: 'union-force', categoryId: '3' },
      { id: '3-3', name: 'The Tournament of Power', slug: 'tournament-of-power', categoryId: '3' },
    ]
  },
  {
    id: '4',
    name: 'Yu-Gi-Oh!',
    slug: 'yu-gi-oh',
    description: 'Yu-Gi-Oh! Trading Cards',
    subcategories: [
      { id: '4-1', name: 'Legend of Blue Eyes', slug: 'legend-of-blue-eyes', categoryId: '4' },
      { id: '4-2', name: 'Metal Raiders', slug: 'metal-raiders', categoryId: '4' },
      { id: '4-3', name: 'Spell Ruler', slug: 'spell-ruler', categoryId: '4' },
    ]
  },
  {
    id: '5',
    name: 'Digimon',
    slug: 'digimon',
    description: 'Digimon Card Game',
    subcategories: [
      { id: '5-1', name: 'Release Special', slug: 'release-special', categoryId: '5' },
      { id: '5-2', name: 'Ultimate Power', slug: 'ultimate-power', categoryId: '5' },
      { id: '5-3', name: 'Union Impact', slug: 'union-impact', categoryId: '5' },
    ]
  }
];

export const products: Product[] = [
  // Pokemon Cards
  {
    id: 'poke-001',
    name: 'Charizard Base Set Shadowless',
    price: 2500,
    originalPrice: 3000,
    description: 'Iconic Charizard from the original Base Set, shadowless version in excellent condition.',
    category: 'Pokemon',
    subcategory: 'Base Set',
    imageUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Charizard',
    stock: 3,
    rarity: 'Secret Rare',
    condition: 'Near Mint',
    set: 'Base Set',
    cardNumber: '4/102',
    language: 'English',
    featured: true,
    isNew: false,
    onSale: true
  },
  {
    id: 'poke-002',
    name: 'Blastoise Base Set',
    price: 1200,
    description: 'Classic Blastoise from the Base Set, a fan favorite water-type Pokemon.',
    category: 'Pokemon',
    subcategory: 'Base Set',
    imageUrl: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Blastoise',
    stock: 5,
    rarity: 'Ultra Rare',
    condition: 'Mint',
    set: 'Base Set',
    cardNumber: '2/102',
    language: 'English',
    featured: true
  },
  {
    id: 'poke-003',
    name: 'Venusaur Base Set',
    price: 800,
    description: 'Venusaur from the original Base Set, grass-type starter evolution.',
    category: 'Pokemon',
    subcategory: 'Base Set',
    imageUrl: 'https://via.placeholder.com/300x400/95E1D3/FFFFFF?text=Venusaur',
    stock: 7,
    rarity: 'Ultra Rare',
    condition: 'Near Mint',
    set: 'Base Set',
    cardNumber: '15/102',
    language: 'English'
  },
  {
    id: 'poke-004',
    name: 'Pikachu Yellow Cheeks Promo',
    price: 450,
    description: 'Special promotional Pikachu with yellow cheeks variant.',
    category: 'Pokemon',
    subcategory: 'Modern Sets',
    imageUrl: 'https://via.placeholder.com/300x400/FFE66D/FFFFFF?text=Pikachu',
    stock: 12,
    rarity: 'Rare',
    condition: 'Mint',
    set: 'Promo',
    cardNumber: 'PROMO',
    language: 'Japanese',
    isNew: true
  },
  {
    id: 'poke-005',
    name: 'Mewtwo Neo Genesis',
    price: 650,
    description: 'Powerful psychic Pokemon from the Neo Genesis expansion.',
    category: 'Pokemon',
    subcategory: 'Neo Genesis',
    imageUrl: 'https://via.placeholder.com/300x400/B19CD9/FFFFFF?text=Mewtwo',
    stock: 4,
    rarity: 'Super Rare',
    condition: 'Near Mint',
    set: 'Neo Genesis',
    cardNumber: '10/111',
    language: 'English'
  },

  // One Piece Cards
  {
    id: 'op-001',
    name: 'Monkey D. Luffy Leader',
    price: 150,
    description: 'Straw Hat Pirates captain Luffy as a leader card.',
    category: 'One Piece',
    subcategory: 'Romance Dawn',
    imageUrl: 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=Luffy',
    stock: 15,
    rarity: 'Super Rare',
    condition: 'Mint',
    set: 'Romance Dawn',
    cardNumber: 'ST01-001',
    language: 'Japanese',
    featured: true,
    isNew: true
  },
  {
    id: 'op-002',
    name: 'Roronoa Zoro',
    price: 85,
    description: 'Three-sword style master and first mate of the Straw Hats.',
    category: 'One Piece',
    subcategory: 'Romance Dawn',
    imageUrl: 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=Zoro',
    stock: 20,
    rarity: 'Rare',
    condition: 'Mint',
    set: 'Romance Dawn',
    cardNumber: 'ST01-013',
    language: 'Japanese'
  },
  {
    id: 'op-003',
    name: 'Portgas D. Ace',
    price: 320,
    description: 'Fire Fist Ace, Luffy\'s sworn brother with flame powers.',
    category: 'One Piece',
    subcategory: 'Paramount War',
    imageUrl: 'https://via.placeholder.com/300x400/FF8E53/FFFFFF?text=Ace',
    stock: 8,
    rarity: 'Secret Rare',
    condition: 'Near Mint',
    set: 'Paramount War',
    cardNumber: 'OP02-013',
    language: 'Japanese',
    featured: true
  },

  // Dragon Ball Cards
  {
    id: 'db-001',
    name: 'Son Goku Ultra Instinct',
    price: 280,
    description: 'Goku in his ultimate Ultra Instinct form.',
    category: 'Dragon Ball',
    subcategory: 'Tournament of Power',
    imageUrl: 'https://via.placeholder.com/300x400/A8E6CF/FFFFFF?text=Goku+UI',
    stock: 6,
    rarity: 'Secret Rare',
    condition: 'Mint',
    set: 'Tournament of Power',
    cardNumber: 'BT05-132',
    language: 'English',
    featured: true,
    isNew: true
  },
  {
    id: 'db-002',
    name: 'Vegeta Super Saiyan Blue',
    price: 180,
    description: 'Prince of Saiyans in his Blue transformation.',
    category: 'Dragon Ball',
    subcategory: 'Galactic Battle',
    imageUrl: 'https://via.placeholder.com/300x400/6C5CE7/FFFFFF?text=Vegeta+Blue',
    stock: 10,
    rarity: 'Super Rare',
    condition: 'Mint',
    set: 'Galactic Battle',
    cardNumber: 'BT01-030',
    language: 'English'
  },

  // Yu-Gi-Oh! Cards
  {
    id: 'ygo-001',
    name: 'Blue-Eyes White Dragon',
    price: 1800,
    originalPrice: 2200,
    description: 'The legendary Blue-Eyes White Dragon, one of the most powerful monsters.',
    category: 'Yu-Gi-Oh!',
    subcategory: 'Legend of Blue Eyes',
    imageUrl: 'https://via.placeholder.com/300x400/74B9FF/FFFFFF?text=Blue+Eyes',
    stock: 2,
    rarity: 'Ultra Rare',
    condition: 'Near Mint',
    set: 'Legend of Blue Eyes White Dragon',
    cardNumber: 'LOB-001',
    language: 'English',
    featured: true,
    onSale: true
  },
  {
    id: 'ygo-002',
    name: 'Dark Magician',
    price: 950,
    description: 'The ultimate wizard in terms of attack and defense.',
    category: 'Yu-Gi-Oh!',
    subcategory: 'Legend of Blue Eyes',
    imageUrl: 'https://via.placeholder.com/300x400/A29BFE/FFFFFF?text=Dark+Magician',
    stock: 4,
    rarity: 'Ultra Rare',
    condition: 'Mint',
    set: 'Legend of Blue Eyes White Dragon',
    cardNumber: 'LOB-005',
    language: 'English'
  },

  // Digimon Cards
  {
    id: 'digi-001',
    name: 'Omnimon',
    price: 220,
    description: 'The fusion of WarGreymon and MetalGarurumon.',
    category: 'Digimon',
    subcategory: 'Release Special',
    imageUrl: 'https://via.placeholder.com/300x400/FDCB6E/FFFFFF?text=Omnimon',
    stock: 8,
    rarity: 'Secret Rare',
    condition: 'Mint',
    set: 'Release Special Booster',
    cardNumber: 'BT1-084',
    language: 'English',
    isNew: true
  },
  {
    id: 'digi-002',
    name: 'Agumon',
    price: 35,
    description: 'The partner Digimon of Tai, a rookie level reptile Digimon.',
    category: 'Digimon',
    subcategory: 'Release Special',
    imageUrl: 'https://via.placeholder.com/300x400/E17055/FFFFFF?text=Agumon',
    stock: 25,
    rarity: 'Common',
    condition: 'Mint',
    set: 'Release Special Booster',
    cardNumber: 'BT1-010',
    language: 'English'
  },

  // Additional products for variety
  {
    id: 'poke-006',
    name: 'Gyarados Team Rocket',
    price: 380,
    description: 'Dark Gyarados from the Team Rocket expansion set.',
    category: 'Pokemon',
    subcategory: 'Modern Sets',
    imageUrl: 'https://via.placeholder.com/300x400/2D3436/FFFFFF?text=Gyarados',
    stock: 6,
    rarity: 'Rare',
    condition: 'Lightly Played',
    set: 'Team Rocket',
    cardNumber: '8/82',
    language: 'English'
  },
  {
    id: 'op-004',
    name: 'Nami',
    price: 65,
    description: 'Navigator of the Straw Hat Pirates.',
    category: 'One Piece',
    subcategory: 'Romance Dawn',
    imageUrl: 'https://via.placeholder.com/300x400/E84393/FFFFFF?text=Nami',
    stock: 18,
    rarity: 'Rare',
    condition: 'Mint',
    set: 'Romance Dawn',
    cardNumber: 'ST01-007',
    language: 'Japanese'
  },
  {
    id: 'db-003',
    name: 'Frieza Final Form',
    price: 190,
    description: 'The emperor of the universe in his most powerful form.',
    category: 'Dragon Ball',
    subcategory: 'Galactic Battle',
    imageUrl: 'https://via.placeholder.com/300x400/A29BFE/FFFFFF?text=Frieza',
    stock: 7,
    rarity: 'Super Rare',
    condition: 'Near Mint',
    set: 'Galactic Battle',
    cardNumber: 'BT01-080',
    language: 'English'
  }
];

export const featuredProducts = products.filter(p => p.featured);
export const newProducts = products.filter(p => p.isNew);
export const saleProducts = products.filter(p => p.onSale);

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === categorySlug);
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
}