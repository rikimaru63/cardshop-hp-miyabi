'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { Product } from '@/types/product';
import { cn, getDiscountPercentage } from '@/lib/utils';

interface ProductImageGalleryProps {
  product: Product;
  className?: string;
}

export default function ProductImageGallery({ product, className }: ProductImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = product.images || [product.imageUrl];
  const isOutOfStock = product.stock <= 0;
  const discountPercentage = product.originalPrice 
    ? getDiscountPercentage(product.originalPrice, product.price) 
    : 0;

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <div className="relative aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden group">
        <Image
          src={images[selectedImageIndex]}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn className="h-5 w-5 text-gray-600" />
        </button>
        
        {/* Image Navigation */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </>
        )}

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              NEW
            </span>
          )}
          {product.onSale && discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              -{discountPercentage}% OFF
            </span>
          )}
          {isOutOfStock && (
            <span className="bg-gray-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              OUT OF STOCK
            </span>
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={cn(
                "flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2",
                selectedImageIndex === index
                  ? "border-red-500"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              <Image
                src={image}
                alt={`${product.name} ${index + 1}`}
                width={80}
                height={96}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}