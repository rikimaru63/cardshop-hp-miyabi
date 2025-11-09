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
  const isPSAGraded = product.psaGrade !== undefined;
  const isBGSGraded = product.bgsGrade !== undefined;

  return (
    <div className={cn("card-premium group w-[165px] animate-zoom-in", className)}>
      <Link href={`/products/${product.id}`} className="block">
        {/* 商品画像 */}
        <div className="product-image-container relative aspect-square border-b border-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-30"></div>
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 relative z-10"
          />
          
          {/* 光る効果 */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
          
          {/* バッジ */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-20">
            {product.isNew && (
              <span className="inline-block px-2 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full shadow-lg animate-bounce-slow neon-text">
                ✨ NEW
              </span>
            )}
            {isPSAGraded && (
              <span className="inline-block px-2 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 rounded-full shadow-lg animate-glow">
                🏆 PSA{product.psaGrade}
              </span>
            )}
            {isBGSGraded && (
              <span className="inline-block px-2 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 rounded-full shadow-lg animate-glow">
                💎 BGS{product.bgsGrade}
              </span>
            )}
            {product.onSale && (
              <span className="inline-block px-2 py-1 text-[10px] font-bold text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full shadow-lg animate-pulse neon-text">
                🔥 SALE
              </span>
            )}
          </div>

          {/* 右上の価格バッジ */}
          <div className="absolute top-2 right-2 z-20">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
              ¥{product.price.toLocaleString()}
            </div>
          </div>

          {/* 在庫状態 */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-gray-900/60 backdrop-blur-sm flex items-center justify-center z-30">
              <div className="bg-red-600 text-white font-bold text-sm px-3 py-2 rounded-lg shadow-lg transform -rotate-12 border-2 border-red-400">
                SOLD OUT
              </div>
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div className="p-3 bg-gradient-to-b from-white to-gray-50">
          {/* カテゴリー */}
          <div className="flex items-center gap-1 mb-2">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 px-2 py-0.5 rounded-full text-[9px] font-medium">
              {product.category}
            </div>
            {product.set && (
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-[9px] font-medium">
                {product.set}
              </div>
            )}
          </div>

          {/* 商品名 */}
          <h3 className="text-xs font-semibold text-gray-900 line-clamp-2 min-h-[2rem] mb-2 group-hover:text-blue-800 transition-colors">
            {product.name}
          </h3>

          {/* レアリティと状態 */}
          {(product.rarity || (product.condition && !isPSAGraded && !isBGSGraded)) && (
            <div className="flex flex-wrap gap-1 mb-2">
              {product.rarity && (
                <span className="inline-block px-2 py-0.5 text-[9px] bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 rounded-full font-medium border border-yellow-300">
                  ⭐ {product.rarity}
                </span>
              )}
              {product.condition && !isPSAGraded && !isBGSGraded && (
                <span className="inline-block px-2 py-0.5 text-[9px] bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full font-medium border border-green-300">
                  ✨ {product.condition}
                </span>
              )}
            </div>
          )}

          {/* 価格 */}
          <div className="mb-3">
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[10px] text-gray-500 line-through mb-1">
                {formatYenPrice(product.originalPrice)}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-baseline">
                <span className="text-lg font-bold price-highlight">
                  ¥{product.price.toLocaleString()}
                </span>
                <span className="text-[9px] text-gray-500 ml-1">税込</span>
              </div>
              <div className="text-[9px] font-medium">
                {isOutOfStock ? (
                  <span className="text-red-600 bg-red-100 px-2 py-1 rounded-full animate-pulse">在庫切れ</span>
                ) : product.stock <= 3 ? (
                  <span className="text-orange-600 bg-orange-100 px-2 py-1 rounded-full animate-bounce-slow">残り{product.stock}点</span>
                ) : (
                  <span className="text-green-600 bg-green-100 px-2 py-1 rounded-full">在庫あり</span>
                )}
              </div>
            </div>
          </div>

          {/* カートボタン */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "w-full py-2 px-3 text-[11px] font-bold rounded-xl transition-all duration-300 transform shadow-medium relative overflow-hidden",
              isOutOfStock
                ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-pink-600 hover:scale-110 active:scale-95 hover:shadow-strong interactive-element"
            )}
          >
            <span className="relative z-10 flex items-center justify-center gap-1">
              {isOutOfStock ? (
                <>❌ 在庫切れ</>
              ) : (
                <>🛒 カートに入れる</>
              )}
            </span>
            {!isOutOfStock && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            )}
          </button>
        </div>
      </Link>
    </div>
  );
}