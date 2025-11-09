import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parentOnly = searchParams.get('parentOnly') === 'true';

    const where = parentOnly ? { parentId: null } : {};

    const categories = await prisma.category.findMany({
      where,
      include: {
        children: true,
        _count: {
          select: { products: true }
        }
      },
      orderBy: {
        sortOrder: 'asc'
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nameEn, nameJa, slug, parentId, sortOrder } = body;

    const category = await prisma.category.create({
      data: {
        nameEn,
        nameJa,
        slug,
        parentId,
        sortOrder: sortOrder || 0
      }
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}