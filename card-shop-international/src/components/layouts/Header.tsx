'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Menu, User } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { useSearchStore } from '@/stores/searchStore';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const totalItems = getTotalItems();

  return (
    <header className="bg-white sticky top-0 z-50 shadow-lg backdrop-blur-md bg-white/95">
      {/* Tagline Bar - 24px height */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs h-6 flex items-center justify-center shadow-sm">
        <span>トレーディングカード専門店 - 全国送料無料キャンペーン実施中！</span>
      </div>
      
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-xs py-1 shadow-md">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>営業時間: 11:00 - 20:00</span>
            <span>｜</span>
            <span>TEL: 03-1234-5678</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/guide" className="hover:text-blue-200 transition-all duration-200 hover:scale-105">
              ご利用ガイド
            </Link>
            <Link href="/contact" className="hover:text-blue-200 transition-all duration-200 hover:scale-105">
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo - 150x40px */}
          <Link href="/" className="flex items-center group">
            <div className="w-[150px] h-[40px] flex items-center text-xl font-bold transition-all duration-200 group-hover:scale-105">
              <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">シンソク</span>
              <span className="text-gray-900 text-sm ml-2">CARD SHOP</span>
            </div>
          </Link>

          {/* Search Bar - 300-350px width */}
          <div className="hidden lg:flex mx-8">
            <form onSubmit={handleSearch} className="w-[325px] flex shadow-lg rounded-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="カード名・商品名で検索"
                className="flex-1 px-4 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-gray-50 focus:bg-white transition-all duration-200"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ml-8">
            <Link
              href="/category"
              className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              カテゴリ
            </Link>
            <Link
              href="/guide"
              className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              ご利用案内
            </Link>
            <Link
              href="/status"
              className="px-3 py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              状態表記
            </Link>
            <Link
              href="/buyback"
              className="px-3 py-2 text-sm text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              宅配買取
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <Link
              href="/account"
              className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              <User className="h-5 w-5" />
              <span className="text-sm">マイページ</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-orange-600 hover:bg-orange-50 px-3 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm hidden lg:inline">カート</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-md animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <form onSubmit={handleSearch} className="flex shadow-lg rounded-lg overflow-hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="カード名・商品名で検索"
              className="flex-1 px-3 py-2 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-gray-50 focus:bg-white transition-all duration-200"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-200 active:scale-95 shadow-md"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}