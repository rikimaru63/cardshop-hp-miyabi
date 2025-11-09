import { Product, Category, GameType, CardCondition } from '@/types/product';

export const categories: Category[] = [
  {
    id: '1',
    name: 'ポケモン',
    slug: 'pokemon',
    description: 'ポケモンカード',
    subcategories: [
      { id: '1-1', name: '基本セット', slug: 'base-set', categoryId: '1' },
      { id: '1-2', name: 'ジムヒーローズ', slug: 'gym-heroes', categoryId: '1' },
      { id: '1-3', name: 'ネオジェネシス', slug: 'neo-genesis', categoryId: '1' },
      { id: '1-4', name: 'モダンセット', slug: 'modern-sets', categoryId: '1' },
    ]
  },
  {
    id: '2',
    name: 'ワンピース',
    slug: 'one-piece',
    description: 'ワンピースカード',
    subcategories: [
      { id: '2-1', name: 'ROMANCE DAWN', slug: 'romance-dawn', categoryId: '2' },
      { id: '2-2', name: '頂上決戦', slug: 'paramount-war', categoryId: '2' },
      { id: '2-3', name: '強大な敵', slug: 'pillars-of-strength', categoryId: '2' },
    ]
  },
  {
    id: '3',
    name: 'ドラゴンボール',
    slug: 'dragon-ball',
    description: 'ドラゴンボール超',
    subcategories: [
      { id: '3-1', name: '銀河パトロール', slug: 'galactic-battle', categoryId: '3' },
      { id: '3-2', name: '合体戦士', slug: 'union-force', categoryId: '3' },
      { id: '3-3', name: '力の大会', slug: 'tournament-of-power', categoryId: '3' },
    ]
  },
  {
    id: '4',
    name: '遊戯王',
    slug: 'yu-gi-oh',
    description: '遊戯王カード',
    subcategories: [
      { id: '4-1', name: '青眼の白龍伝説', slug: 'legend-of-blue-eyes', categoryId: '4' },
      { id: '4-2', name: 'メタル・レイダース', slug: 'metal-raiders', categoryId: '4' },
      { id: '4-3', name: '魔法の支配者', slug: 'spell-ruler', categoryId: '4' },
    ]
  },
  {
    id: '5',
    name: 'デジモン',
    slug: 'digimon',
    description: 'デジモンカードゲーム',
    subcategories: [
      { id: '5-1', name: 'リリース記念', slug: 'release-special', categoryId: '5' },
      { id: '5-2', name: '究極進化', slug: 'ultimate-power', categoryId: '5' },
      { id: '5-3', name: '合体衝撃', slug: 'union-impact', categoryId: '5' },
    ]
  }
];

// Helper function to map category to GameType
const getGameType = (category: string): GameType => {
  const gameTypeMap: Record<string, GameType> = {
    'ポケモン': 'POKEMON',
    'ワンピース': 'ONE_PIECE',
    'ドラゴンボール': 'DRAGON_BALL',
    '遊戯王': 'YUGIOH',
    'デジモン': 'DIGIMON'
  };
  return gameTypeMap[category] || 'OTHER';
};

// Helper to create Product from simplified data
const createProduct = (data: any): Product => {
  return {
    ...data,
    sku: data.id,
    nameEn: data.name,
    nameJa: data.name,
    priceUsd: Math.round(data.price / 150), // Convert JPY to USD
    priceJpy: data.price,
    categoryId: getCategoryId(data.category),
    gameType: getGameType(data.category),
    images: [data.imageUrl],
    stockQuantity: data.stock,
    active: true,
    isNew: data.isNew || false,
    onSale: data.onSale || false
  };
};

// Helper function to get categoryId
const getCategoryId = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'ポケモン': 'pokemon',
    'ワンピース': 'one-piece',
    'ドラゴンボール': 'dragon-ball',
    '遊戯王': 'yu-gi-oh',
    'デジモン': 'digimon'
  };
  return categoryMap[category] || 'other';
};

export const products: Product[] = [
  // ポケモンカード
  createProduct({
    id: 'poke-001',
    name: 'リザードン 基本セット 無印版',
    price: 298000,
    originalPrice: 358000,
    description: 'ポケモンカード基本セットの看板カード、シャドウレス版の美品です。',
    category: 'ポケモン',
    subcategory: '基本セット',
    imageUrl: '/card-placeholder.svg',
    stock: 3,
    rarity: 'UR',
    condition: 'NEAR_MINT' as CardCondition,
    set: '基本セット',
    cardNumber: '4/102',
    language: 'Japanese',
    featured: true,
    isNew: false,
    onSale: true
  }),
  createProduct({
    id: 'poke-002',
    name: 'カメックス 基本セット',
    price: 148000,
    description: 'ポケモン基本セットの人気みずタイプポケモンです。',
    category: 'ポケモン',
    subcategory: '基本セット',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=カメックス',
    stock: 5,
    rarity: 'R',
    condition: 'MINT' as CardCondition,
    set: '基本セット',
    cardNumber: '2/102',
    language: 'Japanese',
    featured: true
  }),
  createProduct({
    id: 'poke-003',
    name: 'フシギバナ PSA10鑑定品',
    price: 188000,
    description: 'PSA10鑑定済みのフシギバナ、グレード最高品です。',
    category: 'ポケモン',
    subcategory: '基本セット',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/95E1D3/FFFFFF?text=フシギバナ+PSA10',
    stock: 2,
    rarity: 'R',
    condition: 'MINT' as CardCondition,
    set: '基本セット',
    cardNumber: '15/102',
    language: 'Japanese',
    featured: true
  }),
  createProduct({
    id: 'poke-004',
    name: 'ピカチュウ 黄頃プロモ',
    price: 54000,
    description: '黄頃バリエーションの特別なピカチュウプロモカードです。',
    category: 'ポケモン',
    subcategory: 'モダンセット',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/FFE66D/FFFFFF?text=ピカチュウ',
    stock: 12,
    rarity: 'P',
    condition: 'MINT' as CardCondition,
    set: 'プロモ',
    cardNumber: 'PROMO',
    language: 'Japanese',
    isNew: true
  }),
  createProduct({
    id: 'poke-005',
    name: 'ミュウツー ネオジェネシス',
    price: 78000,
    description: 'ネオジェネシス拡張パックの強力なエスパータイプです。',
    category: 'ポケモン',
    subcategory: 'ネオジェネシス',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/B19CD9/FFFFFF?text=ミュウツー',
    stock: 4,
    rarity: 'R',
    condition: 'NEAR_MINT' as CardCondition,
    set: 'ネオジェネシス',
    cardNumber: '10/111',
    language: 'Japanese'
  }),

  // ワンピースカード
  createProduct({
    id: 'op-001',
    name: 'モンキー・D・ルフィ リーダー',
    price: 18000,
    description: '麦わらの一味の船長ルフィのリーダーカードです。',
    category: 'ワンピース',
    subcategory: 'ROMANCE DAWN',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/FF6B6B/FFFFFF?text=ルフィ',
    stock: 15,
    rarity: 'SR',
    condition: 'MINT' as CardCondition,
    set: 'ROMANCE DAWN',
    cardNumber: 'ST01-001',
    language: 'Japanese',
    featured: true,
    isNew: true
  }),
  createProduct({
    id: 'op-002',
    name: 'ロロノア・ゾロ',
    price: 10200,
    description: '三刀流の使い手で麦わらの一味の副船長です。',
    category: 'ワンピース',
    subcategory: 'ROMANCE DAWN',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/4ECDC4/FFFFFF?text=ゾロ',
    stock: 20,
    rarity: 'R',
    condition: 'MINT' as CardCondition,
    set: 'ROMANCE DAWN',
    cardNumber: 'ST01-013',
    language: 'Japanese'
  }),
  createProduct({
    id: 'op-003',
    name: 'ポートガス・D・エース PSA9鑑定品',
    price: 38400,
    description: 'PSA9鑑定済み、火拳のエースでルフィの義兄です。',
    category: 'ワンピース',
    subcategory: '頂上決戦',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/FF8E53/FFFFFF?text=エース+PSA9',
    stock: 3,
    rarity: 'SEC',
    condition: 'NEAR_MINT' as CardCondition,
    set: '頂上決戦',
    cardNumber: 'OP02-013',
    language: 'Japanese',
    featured: true
  }),

  // ドラゴンボールカード
  createProduct({
    id: 'db-001',
    name: '孫悟空 身勝手の極意',
    price: 33600,
    description: '悟空の究極の姿、身勝手の極意です。',
    category: 'ドラゴンボール',
    subcategory: '力の大会',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/A8E6CF/FFFFFF?text=悟空+UI',
    stock: 6,
    rarity: 'SEC',
    condition: 'MINT' as CardCondition,
    set: '力の大会',
    cardNumber: 'BT05-132',
    language: 'Japanese',
    featured: true,
    isNew: true
  }),
  createProduct({
    id: 'db-002',
    name: 'ベジータ スーパーサイヤ人ブルー',
    price: 21600,
    description: 'サイヤ人の王子ベジータのブルー変身です。',
    category: 'ドラゴンボール',
    subcategory: '銀河パトロール',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/6C5CE7/FFFFFF?text=ベジータ+ブルー',
    stock: 10,
    rarity: 'SR',
    condition: 'MINT' as CardCondition,
    set: '銀河パトロール',
    cardNumber: 'BT01-030',
    language: 'Japanese'
  }),

  // 遊戯王カード
  createProduct({
    id: 'ygo-001',
    name: '青眼の白龍',
    price: 216000,
    originalPrice: 264000,
    description: '伝説の青眼の白龍、最強モンスターの一体です。',
    category: '遊戯王',
    subcategory: '青眼の白龍伝説',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/74B9FF/FFFFFF?text=青眼白龍',
    stock: 2,
    rarity: 'UR',
    condition: 'NEAR_MINT' as CardCondition,
    set: '青眼の白龍伝説',
    cardNumber: 'LOB-001',
    language: 'Japanese',
    featured: true,
    onSale: true
  }),
  createProduct({
    id: 'ygo-002',
    name: 'ブラックマジシャン PSA10鑑定品',
    price: 114000,
    description: 'PSA10鑑定済み、攻撃と守備に優れた究極の魔法使いです。',
    category: '遊戯王',
    subcategory: '青眼の白龍伝説',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/A29BFE/FFFFFF?text=ブラマジ+PSA10',
    stock: 1,
    rarity: 'UR',
    condition: 'MINT' as CardCondition,
    set: '青眼の白龍伝説',
    cardNumber: 'LOB-005',
    language: 'Japanese',
    featured: true
  }),

  // デジモンカード
  createProduct({
    id: 'digi-001',
    name: 'オメガモン',
    price: 26400,
    description: 'ウォーグレイモンとメタルガルルモンの合体デジモンです。',
    category: 'デジモン',
    subcategory: 'リリース記念',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/FDCB6E/FFFFFF?text=オメガモン',
    stock: 8,
    rarity: 'SEC',
    condition: 'MINT' as CardCondition,
    set: 'リリース記念ブースター',
    cardNumber: 'BT1-084',
    language: 'Japanese',
    isNew: true
  }),
  createProduct({
    id: 'digi-002',
    name: 'アグモン',
    price: 4200,
    description: '太一のパートナーデジモン、成長期の爬虫類デジモンです。',
    category: 'デジモン',
    subcategory: 'リリース記念',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/E17055/FFFFFF?text=アグモン',
    stock: 25,
    rarity: 'C',
    condition: 'MINT' as CardCondition,
    set: 'リリース記念ブースター',
    cardNumber: 'BT1-010',
    language: 'Japanese'
  }),

  // その他の商品
  createProduct({
    id: 'poke-006',
    name: 'ギャラドス ロケット団',
    price: 45600,
    description: 'ロケット団拡張パックのダークギャラドスです。',
    category: 'ポケモン',
    subcategory: 'モダンセット',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/2D3436/FFFFFF?text=ギャラドス',
    stock: 6,
    rarity: 'R',
    condition: 'GOOD' as CardCondition,
    set: 'ロケット団',
    cardNumber: '8/82',
    language: 'Japanese'
  }),
  createProduct({
    id: 'op-004',
    name: 'ナミ',
    price: 7800,
    description: '麦わらの一味の航海士ナミです。',
    category: 'ワンピース',
    subcategory: 'ROMANCE DAWN',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/E84393/FFFFFF?text=ナミ',
    stock: 18,
    rarity: 'R',
    condition: 'MINT' as CardCondition,
    set: 'ROMANCE DAWN',
    cardNumber: 'ST01-007',
    language: 'Japanese'
  }),
  createProduct({
    id: 'db-003',
    name: 'フリーザ 最終形態',
    price: 22800,
    description: '宇宙皇帝フリーザの最強形態です。',
    category: 'ドラゴンボール',
    subcategory: '銀河パトロール',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/A29BFE/FFFFFF?text=フリーザ',
    stock: 7,
    rarity: 'SR',
    condition: 'NEAR_MINT' as CardCondition,
    set: '銀河パトロール',
    cardNumber: 'BT01-080',
    language: 'Japanese'
  }),
  
  // PSA鑑定済み特別商品
  createProduct({
    id: 'psa-001',
    name: 'ピカチュウ イラストレーター PSA10鑑定品',
    price: 5800000,
    description: '幻のポケモンイラストレーター、PSA10最高グレード鑑定済みです。',
    category: 'ポケモン',
    subcategory: 'モダンセット',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/FFD700/000000?text=ピカチュウイラスト+PSA10',
    stock: 1,
    rarity: 'PR',
    condition: 'MINT' as CardCondition,
    set: 'プロモ',
    cardNumber: 'PROMO',
    language: 'Japanese',
    featured: true,
    isNew: true
  }),
  createProduct({
    id: 'psa-002',
    name: 'ルフィ SEC パラレル PSA10鑑定品',
    price: 128000,
    description: 'ワンピースカード最高レアリティのルフィ、PSA10鑑定済みです。',
    category: 'ワンピース',
    subcategory: 'ROMANCE DAWN',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/DC143C/FFFFFF?text=ルフィSEC+PSA10',
    stock: 2,
    rarity: 'SEC',
    condition: 'MINT' as CardCondition,
    set: 'ROMANCE DAWN',
    cardNumber: 'OP01-121',
    language: 'Japanese',
    featured: true
  }),
  createProduct({
    id: 'psa-003',
    name: 'ブラックマジシャンガール PSA9鑑定品',
    price: 85000,
    description: '人気の高いブラックマジシャンガール、PSA9鑑定済みです。',
    category: '遊戯王',
    subcategory: '青眼の白龍伝説',
    imageUrl: '/card-placeholder.svg', // 'https://via.placeholder.com/300x400/FF69B4/FFFFFF?text=ブラマジガール+PSA9',
    stock: 3,
    rarity: 'UR',
    condition: 'NEAR_MINT' as CardCondition,
    set: 'MAGICIAN\'S FORCE',
    cardNumber: 'MFC-000',
    language: 'Japanese',
    featured: true
  })
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
    (p.description && p.description.toLowerCase().includes(lowercaseQuery)) ||
    p.category.toLowerCase().includes(lowercaseQuery)
  );
}