'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductDetailsTabsProps {
  product: Product;
  className?: string;
}

export default function ProductDetailsTabs({ product, className }: ProductDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className={`mb-12 ${className}`}>
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "py-2 px-1 border-b-2 font-medium text-sm",
                activeTab === tab
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="prose max-w-none">
        {activeTab === 'description' && (
          <div>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
            <div className="mt-6 space-y-4">
              <h4 className="font-semibold">Product Highlights:</h4>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Authentic trading card from official distributors</li>
                <li>Carefully packaged to prevent damage during shipping</li>
                <li>Perfect for collectors and players alike</li>
                <li>Includes certificate of authenticity when applicable</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-4">Card Details</h4>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-gray-600">Category:</dt>
                  <dd className="font-medium">{product.category}</dd>
                </div>
                {product.set && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Set:</dt>
                    <dd className="font-medium">{product.set}</dd>
                  </div>
                )}
                {product.cardNumber && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Card Number:</dt>
                    <dd className="font-medium">#{product.cardNumber}</dd>
                  </div>
                )}
                {product.rarity && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Rarity:</dt>
                    <dd className="font-medium">{product.rarity}</dd>
                  </div>
                )}
                {product.condition && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Condition:</dt>
                    <dd className="font-medium">{product.condition}</dd>
                  </div>
                )}
                {product.language && (
                  <div className="flex justify-between">
                    <dt className="text-gray-600">Language:</dt>
                    <dd className="font-medium">{product.language}</dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-current text-yellow-400" />
                  ))}
                </div>
                <span className="text-2xl font-bold">4.5</span>
              </div>
              <p className="text-gray-600">Based on 24 reviews</p>
            </div>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <span className="font-medium">Sarah M.</span>
                  <span className="text-gray-500 text-sm">• 2 days ago</span>
                </div>
                <p className="text-gray-600">Perfect condition and fast shipping! Exactly as described.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Shipping Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h5 className="font-medium mb-2">Standard Shipping (Free over $100)</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Delivery: 5-7 business days</li>
                    <li>• Cost: $9.99 (Free over $100)</li>
                    <li>• Tracking included</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Express Shipping</h5>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Delivery: 2-3 business days</li>
                    <li>• Cost: $19.99</li>
                    <li>• Priority handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}