'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { getTotalItems, openCart } = useCartStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const totalItems = getTotalItems();

  return (
    <header className="bg-white border-b border-gray-200">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-black">
            CardShop
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full flex">
              <input
                type="text"
                placeholder="商品名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6 text-sm">
            {/* Cart */}
            <button
              onClick={openCart}
              className="relative text-black hover:text-gray-600 transition-colors flex items-center space-x-1"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>カート</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Login Link */}
            <Link 
              href="/login" 
              className="text-black hover:text-gray-600 transition-colors"
            >
              ログイン
            </Link>

            {/* Register Link */}
            <Link 
              href="/register" 
              className="text-black hover:text-gray-600 transition-colors"
            >
              新規登録
            </Link>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearch}>
            <div className="flex">
              <input
                type="text"
                placeholder="商品名で検索"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 focus:outline-none focus:border-black text-sm"
              />
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 hover:bg-gray-800"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}