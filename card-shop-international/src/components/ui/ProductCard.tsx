'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/stores/cartStore';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const discountPercentage = product.originalPrice 
    ? getDiscountPercentage(product.originalPrice, product.price) 
    : 0;

  const isOutOfStock = product.stock <= 0;

  return (
    <div className={cn(
      "bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 group overflow-hidden",
      className
    )}>
      <Link href={`/products/${product.id}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                NEW
              </span>
            )}
            {product.onSale && discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                -{discountPercentage}%
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                OUT OF STOCK
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
            <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium text-sm transition-colors",
                isOutOfStock
                  ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          {/* Category & Rarity */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-500 font-medium">{product.category}</span>
            {product.rarity && (
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                {
                  'bg-gray-100 text-gray-600': product.rarity === 'Common',
                  'bg-blue-100 text-blue-600': product.rarity === 'Rare',
                  'bg-purple-100 text-purple-600': product.rarity === 'Super Rare',
                  'bg-yellow-100 text-yellow-600': product.rarity === 'Ultra Rare',
                  'bg-red-100 text-red-600': product.rarity === 'Secret Rare',
                }
              )}>
                {product.rarity}
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Set & Card Number */}
          {(product.set || product.cardNumber) && (
            <div className="text-xs text-gray-500">
              {product.set && <span>{product.set}</span>}
              {product.set && product.cardNumber && <span> • </span>}
              {product.cardNumber && <span>#{product.cardNumber}</span>}
            </div>
          )}

          {/* Condition & Language */}
          <div className="flex items-center gap-2 text-xs">
            {product.condition && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {product.condition}
              </span>
            )}
            {product.language && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {product.language}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>
            
            {/* Stock Indicator */}
            <div className="text-xs text-gray-500">
              {product.stock > 10 ? (
                <span className="text-green-600">In Stock</span>
              ) : product.stock > 0 ? (
                <span className="text-yellow-600">Only {product.stock} left</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>
          </div>

          {/* Rating (placeholder) */}
          <div className="flex items-center gap-1 pt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-current text-yellow-400" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(4.5)</span>
          </div>
        </div>
      </Link>
    </div>
  );
}