'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  subcategories?: CategoryItem[];
}

const sidebarCategories: CategoryItem[] = [
  {
    id: 'pokemon',
    name: 'ポケモンカード',
    slug: 'pokemon',
    subcategories: [
      { id: 'pokemon-unopened', name: '未開封BOX・パック', slug: 'pokemon-unopened' },
      { id: 'pokemon-singles', name: 'シングルカード', slug: 'pokemon-singles' },
      { id: 'pokemon-psa', name: 'PSA鑑定済み', slug: 'pokemon-psa' },
      { id: 'pokemon-deck', name: 'デッキ・スタートセット', slug: 'pokemon-deck' },
      { id: 'pokemon-supplies', name: 'サプライ', slug: 'pokemon-supplies' },
    ],
  },
  {
    id: 'onepiece',
    name: 'ワンピースカード',
    slug: 'one-piece',
    subcategories: [
      { id: 'op-unopened', name: '未開封BOX・パック', slug: 'op-unopened' },
      { id: 'op-singles', name: 'シングルカード', slug: 'op-singles' },
      { id: 'op-psa', name: 'PSA鑑定済み', slug: 'op-psa' },
      { id: 'op-deck', name: 'スタートデッキ', slug: 'op-deck' },
    ],
  },
  {
    id: 'dragonball',
    name: 'ドラゴンボールカード',
    slug: 'dragon-ball',
    subcategories: [
      { id: 'db-unopened', name: '未開封BOX・パック', slug: 'db-unopened' },
      { id: 'db-singles', name: 'シングルカード', slug: 'db-singles' },
      { id: 'db-psa', name: 'PSA鑑定済み', slug: 'db-psa' },
    ],
  },
  {
    id: 'yugioh',
    name: '遊戯王',
    slug: 'yu-gi-oh',
    subcategories: [
      { id: 'ygo-unopened', name: '未開封BOX・パック', slug: 'ygo-unopened' },
      { id: 'ygo-singles', name: 'シングルカード', slug: 'ygo-singles' },
      { id: 'ygo-psa', name: 'PSA鑑定済み', slug: 'ygo-psa' },
      { id: 'ygo-deck', name: 'ストラクチャーデッキ', slug: 'ygo-deck' },
    ],
  },
  {
    id: 'digimon',
    name: 'デジモンカード',
    slug: 'digimon',
    subcategories: [
      { id: 'digi-unopened', name: '未開封BOX・パック', slug: 'digi-unopened' },
      { id: 'digi-singles', name: 'シングルカード', slug: 'digi-singles' },
    ],
  },
  {
    id: 'unionarena',
    name: 'ユニオンアリーナ',
    slug: 'union-arena',
    subcategories: [
      { id: 'ua-unopened', name: '未開封BOX・パック', slug: 'ua-unopened' },
      { id: 'ua-singles', name: 'シングルカード', slug: 'ua-singles' },
    ],
  },
];

const otherCategories = [
  { id: 'carton', name: '未開封カートン', slug: 'unopened-carton' },
  { id: 'box', name: 'BOX商品', slug: 'box' },
  { id: 'psa-all', name: 'PSA鑑定済み（全種）', slug: 'psa-graded' },
  { id: 'bgs', name: 'BGS鑑定済み', slug: 'bgs-graded' },
  { id: 'new-arrival', name: '新着商品', slug: 'new-arrivals' },
  { id: 'sale', name: 'セール商品', slug: 'sale' },
];

export default function Sidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['pokemon']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <aside className="w-60 bg-white border-r border-gray-200 min-h-screen sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto">
      <div className="p-3">
        {/* メインカテゴリ */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-3 px-2">カテゴリー</h3>
          <nav className="space-y-1">
            {sidebarCategories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-2 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <span className="font-medium">{category.name}</span>
                  {category.subcategories && (
                    expandedCategories.includes(category.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )
                  )}
                </button>
                {category.subcategories && expandedCategories.includes(category.id) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/category/${category.slug}/${sub.slug}`}
                        className="block px-2 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* その他のカテゴリ */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-3 px-2">商品カテゴリー</h3>
          <nav className="space-y-1">
            {otherCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="block px-2 py-2 text-sm text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* 店舗情報 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-3 px-2">店舗情報</h3>
          <div className="px-2 space-y-2 text-xs text-gray-600">
            <p>営業時間: 11:00 - 20:00</p>
            <p>定休日: 年中無休</p>
            <p>TEL: 03-1234-5678</p>
          </div>
        </div>

        {/* SNSリンク */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-700 uppercase mb-3 px-2">フォローする</h3>
          <div className="px-2 space-y-2">
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-blue-600 hover:text-blue-800"
            >
              Twitter
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-pink-600 hover:text-pink-800"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}