'use client';

import Link from 'next/link';
import { categories } from '@/lib/data/products';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8 text-sm">
          {/* Category Links */}
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="py-3 text-black hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-black"
            >
              {category.name}
            </Link>
          ))}
          
          {/* Special Categories */}
          <Link
            href="/category/unopened-carton"
            className="py-3 text-black hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-black"
          >
            未開封カートン
          </Link>
          <Link
            href="/category/box"
            className="py-3 text-black hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-black"
          >
            BOX商品
          </Link>
          <Link
            href="/category/psa-graded"
            className="py-3 text-black hover:text-gray-600 transition-colors border-b-2 border-transparent hover:border-black"
          >
            PSA鑑定済み
          </Link>
        </div>
      </div>
    </nav>
  );
}