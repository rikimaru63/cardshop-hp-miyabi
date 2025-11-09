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
    <div className={cn("border border-gray-200 bg-white hover:shadow-xl hover:scale-105 transition-all duration-300 group w-[165px] rounded-xl overflow-hidden backdrop-blur-sm bg-white/95", className)}>
      <Link href={`/products/${product.id}`} className="block">
        {/* 商品画像 */}
        <div className="relative aspect-square bg-white border-b border-gray-200 overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-1 group-hover:scale-105 transition-transform"
          />
          
          {/* バッジ */}
          <div className="absolute top-1 left-1 flex flex-col gap-0.5">
            {product.isNew && (
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-md animate-pulse">
                NEW
              </span>
            )}
            {isPSAGraded && (
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-md">
                PSA{product.psaGrade}
              </span>
            )}
            {isBGSGraded && (
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg shadow-md">
                BGS{product.bgsGrade}
              </span>
            )}
            {product.onSale && (
              <span className="inline-block px-1.5 py-0.5 text-[10px] font-bold text-white bg-gradient-to-r from-red-500 to-orange-500 rounded-lg shadow-md animate-pulse">
                SALE
              </span>
            )}
          </div>

          {/* 在庫状態 */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-sm">SOLD OUT</span>
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div className="p-2">
          {/* カテゴリー */}
          <div className="text-[10px] text-gray-500 truncate">
            {product.category}
            {product.set && ` / ${product.set}`}
          </div>

          {/* 商品名 */}
          <h3 className="text-xs font-medium text-gray-900 line-clamp-2 min-h-[2rem] mt-1">
            {product.name}
          </h3>

          {/* レアリティと状態 */}
          {(product.rarity || (product.condition && !isPSAGraded && !isBGSGraded)) && (
            <div className="flex flex-wrap gap-1 mt-1">
              {product.rarity && (
                <span className="inline-block px-1 py-0.5 text-[9px] bg-gray-100 text-gray-700 rounded">
                  {product.rarity}
                </span>
              )}
              {product.condition && !isPSAGraded && !isBGSGraded && (
                <span className="inline-block px-1 py-0.5 text-[9px] bg-gray-100 text-gray-700 rounded">
                  {product.condition}
                </span>
              )}
            </div>
          )}

          {/* 価格 */}
          <div className="mt-2">
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-[10px] text-gray-500 line-through">
                {formatYenPrice(product.originalPrice)}
              </div>
            )}
            <div className="flex items-baseline">
              <span className="text-sm font-bold text-red-600">
                {formatYenPrice(product.price)}
              </span>
              <span className="text-[9px] text-gray-500 ml-0.5">税込</span>
            </div>
          </div>

          {/* 在庫表示 */}
          <div className="text-[10px] mt-1">
            {isOutOfStock ? (
              <span className="text-red-600 font-medium">在庫切れ</span>
            ) : product.stock <= 3 ? (
              <span className="text-orange-600 font-medium animate-pulse">残り{product.stock}点</span>
            ) : (
              <span className="text-green-600 font-medium">在庫あり</span>
            )}
          </div>

          {/* カートボタン */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "w-full py-1.5 px-2 text-[10px] font-medium rounded-lg mt-2 transition-all duration-200 transform shadow-md",
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105 active:scale-95 hover:shadow-lg"
            )}
          >
            {isOutOfStock ? "在庫切れ" : "カートに入れる"}
          </button>
        </div>
      </Link>
    </div>
  );
}