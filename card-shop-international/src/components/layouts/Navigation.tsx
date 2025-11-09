'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { categories } from '@/lib/data/products';
import { cn } from '@/lib/utils';

export default function Navigation() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleMouseEnter = (categoryId: string) => {
    setActiveDropdown(categoryId);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-gray-50 border-b hidden md:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-8">
          {/* All Products Link */}
          <Link
            href="/products"
            className="py-4 text-gray-700 hover:text-red-600 transition-colors font-medium"
          >
            All Products
          </Link>

          {/* Category Dropdowns */}
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={`/category/${category.slug}`}
                className={cn(
                  "flex items-center space-x-1 py-4 text-gray-700 hover:text-red-600 transition-colors font-medium",
                  activeDropdown === category.id && "text-red-600"
                )}
              >
                <span>{category.name}</span>
                {category.subcategories && category.subcategories.length > 0 && (
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    activeDropdown === category.id && "rotate-180"
                  )} />
                )}
              </Link>

              {/* Dropdown Menu */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div
                  className={cn(
                    "absolute left-0 top-full mt-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200 z-50",
                    activeDropdown === category.id
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  )}
                >
                  <div className="py-2">
                    <Link
                      href={`/category/${category.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                    >
                      All {category.name}
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        href={`/category/${category.slug}/${subcategory.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 transition-colors"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Special Categories */}
          <Link
            href="/products?filter=new"
            className="py-4 text-gray-700 hover:text-red-600 transition-colors font-medium"
          >
            New Arrivals
          </Link>
          <Link
            href="/products?filter=sale"
            className="py-4 text-red-600 hover:text-red-700 transition-colors font-medium"
          >
            Sale
          </Link>
        </div>
      </div>
    </nav>
  );
}