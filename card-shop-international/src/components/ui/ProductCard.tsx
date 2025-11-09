'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

// 価格をカンマ区切りに変換し、円記号を追加
function formatYenPrice(price: number): string {
  return `¥${price.toLocaleString()}`;
}

export default function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const isOutOfStock = product.stock <= 0;
  const isPSAGraded = product.condition?.startsWith('PSA');

  return (
    <div className={cn("card-minimal", className)}>
      <Link href={`/products/${product.id}`} className="block">
        {/* 商品画像 */}
        <div className="relative aspect-square bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
          
          {/* バッジ */}
          {(product.isNew || isPSAGraded) && (
            <div className="absolute top-1 left-1">
              {product.isNew && (
                <span className="condition-badge bg-green-500 text-white">
                  NEW
                </span>
              )}
              {isPSAGraded && (
                <span className="psa-badge">
                  {product.condition}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div className="p-3 space-y-2">
          {/* 商品名 */}
          <h3 className="text-sm font-medium text-black line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* 価格 */}
          <div className="space-y-1">
            <div className="price-yen text-base">
              {formatYenPrice(product.price)}
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through ml-2">
                  {formatYenPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600">税込</div>
          </div>

          {/* 状態とレアリティ */}
          <div className="flex items-center justify-between text-xs">
            {product.condition && !isPSAGraded && (
              <span className="condition-badge">
                状態: {product.condition}
              </span>
            )}
            {product.rarity && (
              <span className="condition-badge">
                {product.rarity}
              </span>
            )}
          </div>

          {/* 在庫数 */}
          <div className="stock-info">
            {isOutOfStock ? (
              <span className="text-red-600">在庫切れ</span>
            ) : product.stock <= 5 ? (
              <span className="text-orange-600">残り{product.stock}点</span>
            ) : (
              <span className="text-green-600">在庫あり</span>
            )}
          </div>

          {/* カートボタン */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "w-full flex items-center justify-center gap-2 button-minimal",
              isOutOfStock && "opacity-50 cursor-not-allowed"
            )}
          >
            <ShoppingCart className="h-4 w-4" />
            {isOutOfStock ? "在庫切れ" : "カートに入れる"}
          </button>
        </div>
      </Link>
    </div>
  );
}