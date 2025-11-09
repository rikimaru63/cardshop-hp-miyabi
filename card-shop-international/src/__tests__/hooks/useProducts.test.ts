import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProducts, useProduct } from '@/hooks/useProducts';
import React from 'react';

// Mock fetch
global.fetch = jest.fn();

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    React.createElement(QueryClientProvider, { client: queryClient }, children)
  );
};

describe('useProducts hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useProducts', () => {
    it('should fetch products successfully', async () => {
      const mockProducts = {
        products: [
          { id: '1', nameEn: 'Card 1', priceUsd: '10.00' },
          { id: '2', nameEn: 'Card 2', priceUsd: '20.00' },
        ],
        pagination: { page: 1, limit: 20, total: 2, totalPages: 1 },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const { result } = renderHook(() => useProducts(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProducts);
      expect(fetch).toHaveBeenCalledWith('/api/products?');
    });

    it('should fetch products with filters', async () => {
      const mockProducts = {
        products: [{ id: '1', nameEn: 'Pokemon Card', category: 'pokemon' }],
        pagination: { page: 1, limit: 10, total: 1, totalPages: 1 },
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProducts,
      });

      const { result } = renderHook(
        () => useProducts({ category: 'pokemon', featured: true, page: 1, limit: 10 }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(fetch).toHaveBeenCalledWith(
        '/api/products?page=1&limit=10&category=pokemon&featured=true'
      );
    });

    it('should handle fetch errors', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ error: 'Server error' }),
      });

      const { result } = renderHook(() => useProducts(), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isError).toBe(true));

      expect(result.current.error).toEqual(new Error('Failed to fetch products'));
    });
  });

  describe('useProduct', () => {
    it('should fetch a single product', async () => {
      const mockProduct = {
        id: '1',
        nameEn: 'Test Card',
        priceUsd: '100.00',
        description: 'A test card',
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockProduct,
      });

      const { result } = renderHook(() => useProduct('1'), {
        wrapper: createWrapper(),
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockProduct);
      expect(fetch).toHaveBeenCalledWith('/api/products/1');
    });

    it('should not fetch if id is not provided', () => {
      const { result } = renderHook(() => useProduct(''), {
        wrapper: createWrapper(),
      });

      expect(result.current.isIdle).toBe(true);
      expect(fetch).not.toHaveBeenCalled();
    });
  });
});