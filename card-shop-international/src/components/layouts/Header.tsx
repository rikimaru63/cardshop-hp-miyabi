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
    <header className="bg-white sticky top-0 z-50 shadow-strong backdrop-blur-md bg-white/95">
      {/* Premium Tagline Bar with Animation */}
      <div className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white text-xs h-8 flex items-center justify-center shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <span className="relative z-10 font-medium animate-pulse">
          ✨ トレーディングカード専門店 - 期間限定！全国送料無料キャンペーン実施中！ ✨
        </span>
      </div>
      
      {/* Enhanced Top Bar */}
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white text-sm py-2 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2">
              <span className="text-green-400">🕐</span>
              <span className="font-medium">営業時間: 11:00 - 20:00</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-blue-400">📞</span>
              <span className="font-medium">TEL: 03-1234-5678</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/guide" className="flex items-center gap-1 hover:text-blue-300 transition-all duration-200 hover:scale-105 px-2 py-1 rounded hover:bg-white/10">
              <span>📖</span>
              <span>ご利用ガイド</span>
            </Link>
            <Link href="/contact" className="flex items-center gap-1 hover:text-green-300 transition-all duration-200 hover:scale-105 px-2 py-1 rounded hover:bg-white/10">
              <span>💬</span>
              <span>お問い合わせ</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-110"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center group">
            <div className="flex items-center space-x-3 transition-all duration-300 group-hover:scale-110">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:rotate-12 transition-all duration-300">
                <span className="text-white font-bold text-xl">シ</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  シンソク
                </span>
                <span className="text-sm text-gray-600 font-medium -mt-1">CARD SHOP</span>
              </div>
            </div>
          </Link>

          {/* Enhanced Search Bar */}
          <div className="hidden lg:flex mx-8">
            <form onSubmit={handleSearch} className="w-[400px] flex shadow-strong rounded-2xl overflow-hidden bg-white border border-gray-200">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="🔍 カード名・商品名で検索..."
                  className="w-full px-6 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-transparent placeholder-gray-500 transition-all duration-200"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-medium font-medium"
              >
                検索
              </button>
            </form>
          </div>

          {/* Enhanced Navigation Buttons */}
          <div className="hidden lg:flex items-center space-x-2 ml-8">
            <Link
              href="/category"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-105"
            >
              <span>🏷️</span>
              カテゴリ
            </Link>
            <Link
              href="/guide"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-105"
            >
              <span>📋</span>
              ご利用案内
            </Link>
            <Link
              href="/status"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-105"
            >
              <span>✅</span>
              状態表記
            </Link>
            <Link
              href="/buyback"
              className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-xl transition-all duration-300 hover:shadow-strong hover:scale-105"
            >
              <span>💰</span>
              宅配買取
            </Link>
          </div>

          {/* Enhanced Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Account */}
            <Link
              href="/account"
              className="hidden lg:flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-medium hover:scale-105"
            >
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">マイページ</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-2 text-white bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 px-4 py-2 rounded-xl transition-all duration-300 hover:shadow-strong hover:scale-110 active:scale-95 font-medium"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm hidden lg:inline">カート</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold shadow-lg animate-bounce-slow border-2 border-white">
                  {totalItems}
                </span>
              )}
              {totalItems === 0 && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full hover:translate-x-full transition-transform duration-700"></div>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Search */}
        <div className="lg:hidden pb-4">
          <form onSubmit={handleSearch} className="flex shadow-strong rounded-2xl overflow-hidden bg-white border border-gray-200">
            <div className="flex-1 relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="🔍 カード名・商品名で検索..."
                className="w-full px-4 py-3 border-0 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm bg-transparent placeholder-gray-500 transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-medium font-medium"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}