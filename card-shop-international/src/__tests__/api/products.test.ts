import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/products/route';
import { prisma } from '@/lib/db';

jest.mock('@/lib/db');

describe('/api/products', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('should return products with pagination', async () => {
      const mockProducts = [
        {
          id: '1',
          sku: 'CARD-001',
          nameEn: 'Test Card',
          nameJa: 'テストカード',
          priceUsd: '100.00',
          priceJpy: '15000',
          stockQuantity: 10,
          category: { id: '1', nameEn: 'Pokemon' },
        },
      ];

      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
      (prisma.product.count as jest.Mock).mockResolvedValue(1);

      const request = new NextRequest('http://localhost:3000/api/products?page=1&limit=20');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.products).toEqual(mockProducts);
      expect(data.pagination).toEqual({
        page: 1,
        limit: 20,
        total: 1,
        totalPages: 1,
      });
    });

    it('should filter by category', async () => {
      const mockProducts = [
        {
          id: '1',
          sku: 'POKE-001',
          nameEn: 'Pikachu',
          category: { id: '1', nameEn: 'Pokemon', slug: 'pokemon' },
        },
      ];

      (prisma.product.findMany as jest.Mock).mockResolvedValue(mockProducts);
      (prisma.product.count as jest.Mock).mockResolvedValue(1);

      const request = new NextRequest('http://localhost:3000/api/products?category=pokemon');
      await GET(request);

      expect(prisma.product.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            active: true,
            category: { slug: 'pokemon' },
          }),
        })
      );
    });

    it('should handle errors gracefully', async () => {
      (prisma.product.findMany as jest.Mock).mockRejectedValue(new Error('Database error'));

      const request = new NextRequest('http://localhost:3000/api/products');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to fetch products');
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const newProduct = {
        sku: 'NEW-001',
        nameEn: 'New Card',
        nameJa: '新しいカード',
        categoryId: '1',
        gameType: 'POKEMON',
        priceUsd: 50,
        priceJpy: 7500,
        stockQuantity: 5,
        description: 'A new test card',
        featured: true,
      };

      const createdProduct = {
        id: '123',
        ...newProduct,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (prisma.product.create as jest.Mock).mockResolvedValue(createdProduct);

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(newProduct),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(201);
      expect(data).toMatchObject(createdProduct);
    });

    it('should handle validation errors', async () => {
      const invalidProduct = {
        // Missing required fields
        nameEn: 'Invalid Product',
      };

      const request = new NextRequest('http://localhost:3000/api/products', {
        method: 'POST',
        body: JSON.stringify(invalidProduct),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('Failed to create product');
    });
  });
});