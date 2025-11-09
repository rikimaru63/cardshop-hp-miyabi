import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { GameType, CardCondition, Prisma } from '@prisma/client';

interface SearchFilters {
  query?: string;
  category?: string;
  gameTypes?: GameType[];
  priceMin?: number;
  priceMax?: number;
  rarities?: string[];
  conditions?: CardCondition[];
  stockStatus?: 'in_stock' | 'out_of_stock' | 'all';
  currency?: 'USD' | 'JPY';
  sort?: 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc' | 'newest' | 'oldest' | 'stock_asc' | 'stock_desc';
  page?: number;
  limit?: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters: SearchFilters = {
      query: searchParams.get('query') || undefined,
      category: searchParams.get('category') || undefined,
      gameTypes: searchParams.get('gameTypes')?.split(',').filter(Boolean) as GameType[] || undefined,
      priceMin: searchParams.get('priceMin') ? parseFloat(searchParams.get('priceMin')!) : undefined,
      priceMax: searchParams.get('priceMax') ? parseFloat(searchParams.get('priceMax')!) : undefined,
      rarities: searchParams.get('rarities')?.split(',').filter(Boolean) || undefined,
      conditions: searchParams.get('conditions')?.split(',').filter(Boolean) as CardCondition[] || undefined,
      stockStatus: (searchParams.get('stockStatus') as 'in_stock' | 'out_of_stock' | 'all') || 'all',
      currency: (searchParams.get('currency') as 'USD' | 'JPY') || 'USD',
      sort: (searchParams.get('sort') as SearchFilters['sort']) || 'newest',
      page: parseInt(searchParams.get('page') || '1'),
      limit: Math.min(parseInt(searchParams.get('limit') || '20'), 100), // Cap at 100 items per page
    };

    // Build the where clause
    const whereClause: Prisma.ProductWhereInput = {
      active: true,
    };

    // Text search across multiple fields
    if (filters.query) {
      const searchTerm = `%${filters.query}%`;
      whereClause.OR = [
        { nameEn: { contains: filters.query, mode: 'insensitive' } },
        { nameJa: { contains: filters.query, mode: 'insensitive' } },
        { description: { contains: filters.query, mode: 'insensitive' } },
        { cardSet: { contains: filters.query, mode: 'insensitive' } },
        { cardNumber: { contains: filters.query, mode: 'insensitive' } },
        { sku: { contains: filters.query, mode: 'insensitive' } },
      ];
    }

    // Category filter
    if (filters.category) {
      whereClause.category = {
        slug: filters.category
      };
    }

    // Game type filter
    if (filters.gameTypes && filters.gameTypes.length > 0) {
      whereClause.gameType = {
        in: filters.gameTypes
      };
    }

    // Price range filter
    if (filters.priceMin !== undefined || filters.priceMax !== undefined) {
      const priceField = filters.currency === 'JPY' ? 'priceJpy' : 'priceUsd';
      whereClause[priceField] = {};
      
      if (filters.priceMin !== undefined) {
        whereClause[priceField].gte = filters.priceMin;
      }
      
      if (filters.priceMax !== undefined) {
        whereClause[priceField].lte = filters.priceMax;
      }
    }

    // Rarity filter
    if (filters.rarities && filters.rarities.length > 0) {
      whereClause.rarity = {
        in: filters.rarities
      };
    }

    // Condition filter
    if (filters.conditions && filters.conditions.length > 0) {
      whereClause.condition = {
        in: filters.conditions
      };
    }

    // Stock status filter
    if (filters.stockStatus === 'in_stock') {
      whereClause.stockQuantity = { gt: 0 };
    } else if (filters.stockStatus === 'out_of_stock') {
      whereClause.stockQuantity = { lte: 0 };
    }

    // Build order by clause
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: 'desc' };
    
    switch (filters.sort) {
      case 'name_asc':
        orderBy = { nameEn: 'asc' };
        break;
      case 'name_desc':
        orderBy = { nameEn: 'desc' };
        break;
      case 'price_asc':
        orderBy = filters.currency === 'JPY' ? { priceJpy: 'asc' } : { priceUsd: 'asc' };
        break;
      case 'price_desc':
        orderBy = filters.currency === 'JPY' ? { priceJpy: 'desc' } : { priceUsd: 'desc' };
        break;
      case 'oldest':
        orderBy = { createdAt: 'asc' };
        break;
      case 'stock_asc':
        orderBy = { stockQuantity: 'asc' };
        break;
      case 'stock_desc':
        orderBy = { stockQuantity: 'desc' };
        break;
      default:
        orderBy = { createdAt: 'desc' };
    }

    // Calculate pagination
    const skip = (filters.page! - 1) * filters.limit!;

    // Execute queries in parallel
    const [products, total, aggregations] = await Promise.all([
      prisma.product.findMany({
        where: whereClause,
        include: {
          category: true,
        },
        skip,
        take: filters.limit,
        orderBy,
      }),
      prisma.product.count({ where: whereClause }),
      // Get aggregation data for filter counts and price ranges
      prisma.product.aggregate({
        where: whereClause,
        _min: {
          priceUsd: true,
          priceJpy: true,
        },
        _max: {
          priceUsd: true,
          priceJpy: true,
        },
      }),
    ]);

    // Get filter options for the current search
    const [availableGameTypes, availableRarities, availableConditions] = await Promise.all([
      prisma.product.groupBy({
        by: ['gameType'],
        where: whereClause,
        _count: { gameType: true },
      }),
      prisma.product.groupBy({
        by: ['rarity'],
        where: { ...whereClause, rarity: { not: null } },
        _count: { rarity: true },
      }),
      prisma.product.groupBy({
        by: ['condition'],
        where: whereClause,
        _count: { condition: true },
      }),
    ]);

    const response = {
      products: products.map(product => ({
        ...product,
        priceUsd: Number(product.priceUsd),
        priceJpy: Number(product.priceJpy),
        psaGrade: product.psaGrade ? Number(product.psaGrade) : null,
        bgsGrade: product.bgsGrade ? Number(product.bgsGrade) : null,
      })),
      pagination: {
        page: filters.page!,
        limit: filters.limit!,
        total,
        totalPages: Math.ceil(total / filters.limit!),
        hasNextPage: skip + filters.limit! < total,
        hasPreviousPage: filters.page! > 1,
      },
      filters: {
        applied: filters,
        available: {
          gameTypes: availableGameTypes.map(item => ({
            value: item.gameType,
            count: item._count.gameType,
          })),
          rarities: availableRarities
            .filter(item => item.rarity)
            .map(item => ({
              value: item.rarity!,
              count: item._count.rarity,
            })),
          conditions: availableConditions.map(item => ({
            value: item.condition,
            count: item._count.condition,
          })),
          priceRange: {
            min: {
              usd: Number(aggregations._min.priceUsd) || 0,
              jpy: Number(aggregations._min.priceJpy) || 0,
            },
            max: {
              usd: Number(aggregations._max.priceUsd) || 0,
              jpy: Number(aggregations._max.priceJpy) || 0,
            },
          },
        },
      },
      meta: {
        searchTime: Date.now(),
        currency: filters.currency,
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search products',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Support for advanced search with body payload
    const filters: SearchFilters = {
      ...body,
      page: body.page || 1,
      limit: Math.min(body.limit || 20, 100),
    };

    // Use the same logic as GET but with body filters
    const { searchParams } = new URL(request.url);
    
    // Convert body filters to search params format for reuse
    const mockSearchParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          mockSearchParams.set(key, value.join(','));
        } else {
          mockSearchParams.set(key, String(value));
        }
      }
    });

    // Create a mock request with the body filters as search params
    const mockUrl = new URL(request.url);
    mockUrl.search = mockSearchParams.toString();
    
    const mockRequest = new Request(mockUrl);
    
    // Reuse the GET logic
    return GET(mockRequest as NextRequest);
  } catch (error) {
    console.error('Advanced search API error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to perform advanced search',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}