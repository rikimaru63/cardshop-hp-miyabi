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
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      {/* Tagline Bar - 24px height */}
      <div className="bg-blue-600 text-white text-xs h-6 flex items-center justify-center">
        <span>トレーディングカード専門店 - 全国送料無料キャンペーン実施中！</span>
      </div>
      
      {/* Top Bar */}
      <div className="bg-gray-900 text-white text-xs py-1">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>営業時間: 11:00 - 20:00</span>
            <span>｜</span>
            <span>TEL: 03-1234-5678</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/guide" className="hover:text-gray-300">
              ご利用ガイド
            </Link>
            <Link href="/contact" className="hover:text-gray-300">
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
          <Link href="/" className="flex items-center">
            <div className="w-[150px] h-[40px] flex items-center text-xl font-bold">
              <span className="text-red-600">シンソク</span>
              <span className="text-gray-900 text-sm ml-2">CARD SHOP</span>
            </div>
          </Link>

          {/* Search Bar - 300-350px width */}
          <div className="hidden lg:flex mx-8">
            <form onSubmit={handleSearch} className="w-[325px] flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="カード名・商品名で検索"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-gray-500 text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-r-md hover:bg-gray-700 transition-colors"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Navigation Buttons */}
          <div className="hidden lg:flex items-center space-x-4 ml-8">
            <Link
              href="/category"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              カテゴリ
            </Link>
            <Link
              href="/guide"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              ご利用案内
            </Link>
            <Link
              href="/status"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              状態表記
            </Link>
            <Link
              href="/buyback"
              className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded transition-colors"
            >
              宅配買取
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Account */}
            <Link
              href="/account"
              className="hidden lg:flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <User className="h-5 w-5" />
              <span className="text-sm">マイページ</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center space-x-1 text-gray-700 hover:text-gray-900"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm hidden lg:inline">カート</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden pb-3">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="カード名・商品名で検索"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-gray-500 text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gray-800 text-white rounded-r-md"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}