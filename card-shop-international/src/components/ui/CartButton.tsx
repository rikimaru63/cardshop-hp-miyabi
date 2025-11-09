'use client';

import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

interface CartButtonProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showQuantity?: boolean;
}

export default function CartButton({ 
  product, 
  className,
  variant = 'default',
  size = 'md',
  showQuantity = false
}: CartButtonProps) {
  const { items, addItem, updateQuantity, removeItem } = useCartStore();
  
  const cartItem = items.find(item => item.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    addItem(product);
  };

  const handleIncrement = () => {
    if (quantity < product.stock) {
      addItem(product, 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeItem(product.id);
    }
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    default: 'bg-red-600 text-white hover:bg-red-700 border-red-600',
    outline: 'border-red-600 text-red-600 hover:bg-red-50 bg-white',
    ghost: 'text-red-600 hover:bg-red-50'
  };

  if (showQuantity && quantity > 0) {
    return (
      <div className={cn(
        "flex items-center border rounded-lg overflow-hidden",
        variant === 'outline' ? 'border-red-600' : 'border-gray-300',
        className
      )}>
        <button
          onClick={handleDecrement}
          className="p-2 hover:bg-gray-100 transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-4 py-2 border-x min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={handleIncrement}
          disabled={quantity >= product.stock}
          className={cn(
            "p-2 transition-colors",
            quantity >= product.stock
              ? "text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          )}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-medium transition-colors border disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <ShoppingCart className={cn(
        size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'
      )} />
      {isOutOfStock ? 'Out of Stock' : quantity > 0 ? `Add Another (${quantity})` : 'Add to Cart'}
    </button>
  );
}