import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface CartItem {
  productId: string;
  quantity: number;
}

async function fetchCart(userId: string) {
  const response = await fetch('/api/cart', {
    headers: {
      'x-user-id': userId,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch cart');
  }
  
  return response.json();
}

async function addToCart(userId: string, item: CartItem) {
  const response = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-user-id': userId,
    },
    body: JSON.stringify(item),
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add to cart');
  }
  
  return response.json();
}

async function removeFromCart(userId: string, itemId: string) {
  const response = await fetch(`/api/cart?itemId=${itemId}`, {
    method: 'DELETE',
    headers: {
      'x-user-id': userId,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to remove from cart');
  }
  
  return response.json();
}

export function useCart(userId?: string) {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: () => fetchCart(userId!),
    enabled: !!userId,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, item }: { userId: string; item: CartItem }) => 
      addToCart(userId, item),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart', variables.userId] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, itemId }: { userId: string; itemId: string }) => 
      removeFromCart(userId, itemId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cart', variables.userId] });
    },
  });
}