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
    <div className={cn("border border-gray-200 bg-white hover:shadow-lg transition-shadow", className)}>
      <Link href={`/products/${product.id}`} className="block">
        {/* 商品画像 */}
        <div className="relative aspect-[3/4] bg-gray-50 border-b border-gray-200">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2"
          />
          
          {/* バッジ */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-red-500 rounded">
                NEW
              </span>
            )}
            {isPSAGraded && (
              <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-blue-600 rounded">
                PSA {product.psaGrade}
              </span>
            )}
            {isBGSGraded && (
              <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-purple-600 rounded">
                BGS {product.bgsGrade}
              </span>
            )}
            {product.onSale && (
              <span className="inline-block px-2 py-1 text-xs font-bold text-white bg-orange-500 rounded">
                SALE
              </span>
            )}
          </div>

          {/* 在庫状態 */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-bold text-lg">SOLD OUT</span>
            </div>
          )}
        </div>

        {/* 商品情報 */}
        <div className="p-3">
          {/* カテゴリー */}
          <div className="text-xs text-gray-500 mb-1">
            {product.category}
            {product.set && ` / ${product.set}`}
          </div>

          {/* 商品名 */}
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] mb-2">
            {product.name}
          </h3>

          {/* レアリティと状態 */}
          <div className="flex items-center gap-2 mb-2">
            {product.rarity && (
              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                {product.rarity}
              </span>
            )}
            {product.condition && !isPSAGraded && !isBGSGraded && (
              <span className="inline-block px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded">
                {product.condition}
              </span>
            )}
          </div>

          {/* 価格 */}
          <div className="mb-3">
            {product.originalPrice && product.originalPrice > product.price && (
              <div className="text-xs text-gray-500 line-through">
                {formatYenPrice(product.originalPrice)}
              </div>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-red-600">
                {formatYenPrice(product.price)}
              </span>
              <span className="text-xs text-gray-500">（税込）</span>
            </div>
          </div>

          {/* 在庫表示 */}
          <div className="text-xs mb-3">
            {isOutOfStock ? (
              <span className="text-red-600 font-medium">在庫切れ</span>
            ) : product.stock <= 3 ? (
              <span className="text-orange-600 font-medium">残り{product.stock}点</span>
            ) : (
              <span className="text-green-600 font-medium">在庫あり</span>
            )}
          </div>

          {/* カートボタン */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className={cn(
              "w-full py-2 px-3 text-xs font-medium rounded transition-colors",
              isOutOfStock
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700"
            )}
          >
            {isOutOfStock ? "在庫切れ" : "カートに入れる"}
          </button>
        </div>
      </Link>
    </div>
  );
}