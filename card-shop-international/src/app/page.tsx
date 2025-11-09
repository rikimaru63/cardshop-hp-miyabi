import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import { featuredProducts, newProducts, categories } from '@/lib/data/products';

export default function Home() {
  return (
    <div className="bg-white">
      {/* お知らせ・ニュース */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="border border-gray-300 bg-white p-4">
            <h2 className="text-lg font-semibold mb-3 text-black">お知らせ・ニュース</h2>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-gray-500 mr-3">2024.01.15</span>
                <span className="text-black">【重要】年末年始の営業について</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-3">2024.01.10</span>
                <span className="text-black">PSA鑑定済みカードの取り扱いを開始いたします</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-3">2024.01.05</span>
                <span className="text-black">新商品入荷のお知らせ</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* カテゴリーメニュー */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="border border-gray-300 bg-white p-4 text-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm font-medium text-black">
                  {category.name}
                </h3>
              </Link>
            ))}
            <Link
              href="/category/unopened-carton"
              className="border border-gray-300 bg-white p-4 text-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-medium text-black">
                未開封カートン
              </h3>
            </Link>
            <Link
              href="/category/box"
              className="border border-gray-300 bg-white p-4 text-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-medium text-black">
                BOX商品
              </h3>
            </Link>
            <Link
              href="/category/psa-graded"
              className="border border-gray-300 bg-white p-4 text-center hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-medium text-black">
                PSA鑑定済み
              </h3>
            </Link>
          </div>
        </div>
      </section>

      {/* おすすめ商品 */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">おすすめ商品</h2>
            <Link 
              href="/products?filter=featured"
              className="text-sm text-black hover:text-gray-600 transition-colors"
            >
              すべて見る →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 未開封カートン */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">未開封カートン</h2>
            <Link 
              href="/category/unopened-carton"
              className="text-sm text-black hover:text-gray-600 transition-colors"
            >
              すべて見る →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {newProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* BOX商品 */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">BOX商品</h2>
            <Link 
              href="/category/box"
              className="text-sm text-black hover:text-gray-600 transition-colors"
            >
              すべて見る →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {featuredProducts.slice(2, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* PSA鑑定済みカード */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-black">PSA鑑定済みカード</h2>
            <Link 
              href="/category/psa-graded"
              className="text-sm text-black hover:text-gray-600 transition-colors"
            >
              すべて見る →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {newProducts.slice(2, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}