'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useSearchStore } from '@/stores/searchStore';
import { SearchBar } from '@/components/ui/SearchBar';
import { MobileSearchButton } from '@/components/ui/MobileSearchOverlay';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const { getTotalItems, openCart } = useCartStore();
  const { setQuery, search } = useSearchStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setQuery(searchQuery);
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      search();
      setSearchQuery('');
    }
  };

  const handleAdvancedSearch = () => {
    router.push('/search');
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
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <SearchBar
              placeholder="Search for trading cards, sets, or characters..."
              className="w-full"
              showFilters={true}
              showSuggestions={true}
            />
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
          <MobileSearchButton />
        </div>
      </div>
    </header>
  );
}