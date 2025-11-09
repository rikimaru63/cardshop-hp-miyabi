'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/stores/cartStore';

interface CartAddButtonProps {
  product: Product;
  className?: string;
}

export default function CartAddButton({ product, className }: CartAddButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex border border-gray-300 rounded-lg overflow-hidden w-32">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-full text-center py-2 border-x border-gray-300 focus:outline-none"
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stock}
              className="px-3 py-2 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-base rounded-lg font-medium transition-colors bg-red-600 text-white hover:bg-red-700 border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="h-5 w-5" />
          {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-50">
          <Heart className="h-5 w-5 text-gray-600" />
        </button>
        <button className="border border-gray-300 p-3 rounded-lg hover:bg-gray-50">
          <Share2 className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}