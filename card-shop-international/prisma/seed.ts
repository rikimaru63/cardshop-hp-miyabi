import { PrismaClient, GameType, CardCondition } from '@prisma/client';
import { products as sampleProducts, categories as sampleCategories } from '../src/lib/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✨ Cleared existing data');

  // Create categories
  const categoryMap = new Map();
  
  for (const cat of sampleCategories) {
    const category = await prisma.category.create({
      data: {
        nameEn: cat.name,
        nameJa: cat.name,
        slug: cat.slug,
        sortOrder: parseInt(cat.id)
      }
    });
    categoryMap.set(cat.name, category.id);
    console.log(`📁 Created category: ${cat.name}`);

    // Create subcategories
    if (cat.subcategories) {
      for (const subcat of cat.subcategories) {
        await prisma.category.create({
          data: {
            nameEn: subcat.name,
            nameJa: subcat.name,
            slug: subcat.slug,
            parentId: category.id,
            sortOrder: 0
          }
        });
      }
    }
  }

  // Map game types
  const gameTypeMap: { [key: string]: GameType } = {
    'ポケモン': GameType.POKEMON,
    'ワンピース': GameType.ONE_PIECE,
    'ドラゴンボール': GameType.DRAGON_BALL,
    '遊戯王': GameType.YUGIOH,
    'デジモン': GameType.DIGIMON
  };

  // Map conditions
  const conditionMap: { [key: string]: CardCondition } = {
    'S': CardCondition.MINT,
    'A': CardCondition.NEAR_MINT,
    'B': CardCondition.EXCELLENT,
    'C': CardCondition.GOOD,
    'PSA10': CardCondition.MINT,
    'PSA9': CardCondition.MINT
  };

  // Create products
  for (const product of sampleProducts) {
    const categoryId = categoryMap.get(product.category);
    const gameType = gameTypeMap[product.category] || GameType.OTHER;
    const condition = product.condition ? (conditionMap[product.condition] || CardCondition.NEAR_MINT) : CardCondition.NEAR_MINT;
    
    let psaGrade = null;
    if (product.condition?.includes('PSA')) {
      psaGrade = parseFloat(product.condition.replace('PSA', ''));
    }

    await prisma.product.create({
      data: {
        sku: product.id,
        nameEn: product.name,
        nameJa: product.name,
        categoryId: categoryId,
        gameType: gameType,
        cardSet: product.set,
        cardNumber: product.cardNumber,
        rarity: product.rarity,
        condition: condition,
        psaGrade: psaGrade,
        priceUsd: product.price / 100,
        priceJpy: product.price,
        stockQuantity: product.stock,
        images: [product.imageUrl],
        description: product.description,
        featured: product.featured || false,
        active: true
      }
    });
    console.log(`🎴 Created product: ${product.name}`);
  }

  // Create test user
  const testUser = await prisma.user.create({
    data: {
      email: 'test@cardshop.com',
      name: 'Test User',
      country: 'JP',
      language: 'ja',
      passwordHash: 'hashed_password_here' // In production, use proper hashing
    }
  });
  console.log(`👤 Created test user: ${testUser.email}`);

  console.log('✅ Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });