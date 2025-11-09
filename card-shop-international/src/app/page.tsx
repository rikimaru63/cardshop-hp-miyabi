import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';
import HeroCarousel from '@/components/ui/HeroCarousel';
import { featuredProducts, newProducts, categories, products } from '@/lib/data/products';

export default function Home() {
  // PSA鑑定済み商品を取得
  const psaProducts = products.filter(p => p.psaGrade !== undefined).slice(0, 12);
  const boxProducts = products.filter(p => p.name.includes('BOX') || p.name.includes('カートン')).slice(0, 12);

  return (
    <div className="">
      {/* ヒーローカルーセル */}
      <section className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <HeroCarousel />
        </div>
      </section>

      {/* お知らせ・ニュースセクション（ブルー） */}
      <section className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-blue-600 text-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📢</span>
              <h2 className="text-lg font-bold">重要なお知らせ</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">重要</span>
                <span>【期間限定】全品送料無料キャンペーン実施中！（1月31日まで）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-bold">新着</span>
                <span>PSA鑑定済みカードの取り扱いを大幅拡大しました</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* クイックアクセスボタン */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            <Link
              href="/category/pokemon"
              className="bg-red-50 border border-red-200 rounded-lg p-4 text-center hover:bg-red-100 transition-colors"
            >
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-sm font-medium">ポケモン</div>
            </Link>
            <Link
              href="/category/one-piece"
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors"
            >
              <div className="text-2xl mb-2">⚓</div>
              <div className="text-sm font-medium">ワンピース</div>
            </Link>
            <Link
              href="/category/dragon-ball"
              className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center hover:bg-orange-100 transition-colors"
            >
              <div className="text-2xl mb-2">🐉</div>
              <div className="text-sm font-medium">ドラゴンボール</div>
            </Link>
            <Link
              href="/category/yu-gi-oh"
              className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center hover:bg-purple-100 transition-colors"
            >
              <div className="text-2xl mb-2">👁️</div>
              <div className="text-sm font-medium">遊戯王</div>
            </Link>
            <Link
              href="/category/psa-graded"
              className="bg-green-50 border border-green-200 rounded-lg p-4 text-center hover:bg-green-100 transition-colors"
            >
              <div className="text-2xl mb-2">⭐</div>
              <div className="text-sm font-medium">PSA鑑定</div>
            </Link>
            <Link
              href="/products?filter=new"
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center hover:bg-yellow-100 transition-colors"
            >
              <div className="text-2xl mb-2">🆕</div>
              <div className="text-sm font-medium">新着商品</div>
            </Link>
          </div>
        </div>
      </section>

      {/* おすすめ商品 */}
      <section className="py-6">
        <div className="px-4">
          <div className="bg-white rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <h2 className="text-lg font-bold text-gray-900">おすすめ商品</h2>
              </div>
              <Link 
                href="/products?filter=featured"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                もっと見る →
              </Link>
            </div>
            
            {/* 水平スクロール（5-6カード） */}
            <div className="overflow-x-auto">
              <div className="flex gap-3 pb-2" style={{ width: 'max-content' }}>
                {featuredProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="w-[160px] flex-shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新着商品 */}
      <section className="py-6">
        <div className="px-4">
          <div className="bg-white rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🆕</span>
                <h2 className="text-lg font-bold text-gray-900">新着商品</h2>
              </div>
              <Link 
                href="/products?filter=new"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                もっと見る →
              </Link>
            </div>
            
            {/* 4-5列グリッドレイアウト */}
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-3">
              {newProducts.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOX・カートン商品 */}
      <section className="py-6">
        <div className="px-4">
          <div className="bg-white rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">📦</span>
                <h2 className="text-lg font-bold text-gray-900">BOX・カートン商品</h2>
              </div>
              <Link 
                href="/category/box"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                もっと見る →
              </Link>
            </div>
            
            {/* 4-5列グリッドレイアウト */}
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-3">
              {boxProducts.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PSA鑑定済みカード */}
      <section className="py-6">
        <div className="px-4">
          <div className="bg-white rounded p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">⭐</span>
                <h2 className="text-lg font-bold text-gray-900">PSA鑑定済みカード</h2>
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold">高品質保証</span>
              </div>
              <Link 
                href="/category/psa-graded"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                もっと見る →
              </Link>
            </div>
            
            {/* 4-5列グリッドレイアウト */}
            <div className="grid grid-cols-4 lg:grid-cols-5 gap-3">
              {psaProducts.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ・ニュース */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📢</span>
              <h2 className="text-xl font-bold text-gray-900">お知らせ・ニュース</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded font-medium">重要</span>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">2024.01.15</div>
                  <div className="text-gray-900">年末年始の営業時間変更について</div>
                </div>
              </li>
              <li className="flex items-start gap-3 pb-3 border-b border-gray-100">
                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded font-medium">新着</span>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">2024.01.10</div>
                  <div className="text-gray-900">PSA鑑定済みカードの取り扱いを大幅拡大しました</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded font-medium">入荷</span>
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-1">2024.01.05</div>
                  <div className="text-gray-900">ポケモンカード最新弾が入荷しました</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}