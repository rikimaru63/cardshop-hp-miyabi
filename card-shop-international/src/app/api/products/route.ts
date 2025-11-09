import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { Decimal } from '@prisma/client/runtime/library';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const gameType = searchParams.get('gameType');
    const featured = searchParams.get('featured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    const where: any = {
      active: true,
    };

    if (category) {
      where.category = {
        slug: category
      };
    }

    if (gameType) {
      where.gameType = gameType;
    }

    if (featured === 'true') {
      where.featured = true;
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.product.count({ where })
    ]);

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      sku,
      nameEn,
      nameJa,
      categoryId,
      gameType,
      cardSet,
      cardNumber,
      rarity,
      condition,
      psaGrade,
      bgsGrade,
      priceUsd,
      priceJpy,
      stockQuantity,
      images,
      description,
      featured
    } = body;

    const product = await prisma.product.create({
      data: {
        sku,
        nameEn,
        nameJa,
        categoryId,
        gameType,
        cardSet,
        cardNumber,
        rarity,
        condition,
        psaGrade,
        bgsGrade,
        priceUsd: new Decimal(priceUsd),
        priceJpy: new Decimal(priceJpy),
        stockQuantity,
        images: images || [],
        description,
        featured
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}