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
      {/* メインヒーローセクション - 大きく表示 */}
      <section className="relative overflow-hidden hero-gradient min-h-[60vh]">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 flex items-center min-h-[60vh]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            {/* 左側：テキストコンテンツ */}
            <div className="text-white space-y-6 animate-zoom-in">
              <h1 className="text-5xl lg:text-6xl font-bold neon-text">
                <span className="block text-2xl lg:text-3xl font-normal mb-2 opacity-90">日本最大級の</span>
                トレーディングカード
                <span className="block text-3xl lg:text-4xl mt-2 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  専門ショップ ✨
                </span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-95 leading-relaxed">
                ポケモン・ワンピース・遊戯王・ドラゴンボールなど<br />
                <strong className="text-yellow-300">PSA鑑定済み</strong>高品質カードを豊富に取り揃え
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a 
                  href="#featured-products" 
                  className="btn-primary text-lg px-8 py-4 hover:scale-110 shadow-strong"
                >
                  🔥 今すぐ商品を見る
                </a>
                <a 
                  href="/category/psa-graded" 
                  className="btn-secondary text-lg px-8 py-4 bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                >
                  🏆 PSA鑑定品を見る
                </a>
              </div>
            </div>
            
            {/* 右側：ヒーローカルーセル */}
            <div className="animate-zoom-in">
              <HeroCarousel />
            </div>
          </div>
        </div>
        
        {/* 装飾的な要素 */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-bounce-slow"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-pink-300 rounded-full opacity-20 animate-bounce-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-300 rounded-full opacity-20 animate-bounce-slow" style={{animationDelay: '2s'}}></div>
      </section>

      {/* 特別オファーバナー */}
      <section className="py-8 bg-gradient-to-r from-red-600 via-red-500 to-pink-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="banner-container bg-gradient-to-r from-red-500 to-pink-500 text-white text-center">
            <div className="banner-content">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 animate-bounce-slow">
                🎉 期間限定！送料無料キャンペーン 🎉
              </h2>
              <p className="text-lg lg:text-xl mb-6">
                1月31日まで！全商品送料無料でお届けします
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                  <span className="font-bold text-xl">残り23日と14時間</span>
                </div>
                <a href="/products" className="btn-secondary bg-white text-red-600 hover:bg-gray-100 px-8 py-3">
                  今すぐ購入する 🛒
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ・ニュースセクション（ブルー） */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📢</span>
              <h2 className="text-lg font-bold">重要なお知らせ</h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md animate-pulse">重要</span>
                <span>【期間限定】全品送料無料キャンペーン実施中！（1月31日まで）</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold shadow-md">新着</span>
                <span>PSA鑑定済みカードの取り扱いを大幅拡大しました</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* カテゴリークイックアクセス - より大きく魅力的に */}
      <section className="py-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 gradient-text">
              🎯 人気カテゴリー
            </h2>
            <p className="text-gray-600 text-lg">
              お探しの商品カテゴリーをクリックしてください
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <Link href="/category/pokemon" className="category-btn group">
              <div className="text-5xl mb-3 group-hover:animate-bounce-slow">🔥</div>
              <div className="font-bold text-lg text-gray-800 group-hover:text-red-600 transition-colors">
                ポケモン
              </div>
              <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                最新弾入荷中
              </div>
            </Link>
            
            <Link href="/category/one-piece" className="category-btn group">
              <div className="text-5xl mb-3 group-hover:animate-bounce-slow">⚓</div>
              <div className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                ワンピース
              </div>
              <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                レア多数
              </div>
            </Link>
            
            <Link href="/category/dragon-ball" className="category-btn group">
              <div className="text-5xl mb-3 group-hover:animate-bounce-slow">🐉</div>
              <div className="font-bold text-lg text-gray-800 group-hover:text-orange-600 transition-colors">
                ドラゴンボール
              </div>
              <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                人気急上昇
              </div>
            </Link>
            
            <Link href="/category/yu-gi-oh" className="category-btn group">
              <div className="text-5xl mb-3 group-hover:animate-bounce-slow">👁️</div>
              <div className="font-bold text-lg text-gray-800 group-hover:text-purple-600 transition-colors">
                遊戯王
              </div>
              <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                高額カード有
              </div>
            </Link>
            
            <Link href="/category/psa-graded" className="category-btn group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 to-yellow-200 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-3 group-hover:animate-glow">🏆</div>
                <div className="font-bold text-lg text-gray-800 group-hover:text-yellow-700 transition-colors">
                  PSA鑑定
                </div>
                <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  最高品質保証
                </div>
              </div>
            </Link>
            
            <Link href="/products?filter=new" className="category-btn group">
              <div className="text-5xl mb-3 group-hover:animate-spin-slow">🆕</div>
              <div className="font-bold text-lg text-gray-800 group-hover:text-green-600 transition-colors">
                新着商品
              </div>
              <div className="text-xs text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                毎日更新中
              </div>
            </Link>
          </div>
          
          {/* 注目商品への誘導 */}
          <div className="text-center mt-12">
            <a 
              href="#featured-products" 
              className="inline-flex items-center gap-2 btn-primary px-8 py-4 text-lg hover:scale-110 shadow-strong"
            >
              <span className="animate-bounce-slow">👇</span>
              注目商品をチェック
              <span className="animate-bounce-slow">👇</span>
            </a>
          </div>
        </div>
      </section>

      {/* おすすめ商品 - 特集セクション */}
      <section id="featured-products" className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="card-premium p-8 shadow-strong">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
                🔥 今週のおすすめ商品
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                厳選されたレアカードと人気商品をご紹介。限定品も多数取り揃えています！
              </p>
            </div>
            
            {/* 大きな特集グリッド */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
              {featuredProducts.slice(0, 6).map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-zoom-in" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/products?filter=featured"
                className="btn-primary text-lg px-8 py-4 hover:scale-110 shadow-strong inline-flex items-center gap-2"
              >
                <span>🎯</span>
                全ての特集商品を見る
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 広告バナーエリア */}
      <section className="py-12 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PSA鑑定品の特別バナー */}
            <div className="banner-container bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-center">
              <div className="banner-content">
                <h3 className="text-2xl font-bold mb-3">🏆 PSA鑑定品</h3>
                <p className="mb-4">最高品質保証のカードをお探しの方へ</p>
                <a href="/category/psa-graded" className="btn-secondary bg-white text-orange-600 hover:bg-gray-100 px-6 py-2">
                  PSA商品を見る
                </a>
              </div>
            </div>
            
            {/* 新着商品バナー */}
            <div className="banner-container bg-gradient-to-r from-green-500 to-teal-500 text-white text-center">
              <div className="banner-content">
                <h3 className="text-2xl font-bold mb-3">🆕 新着商品</h3>
                <p className="mb-4">毎日更新される最新のカード商品</p>
                <a href="/products?filter=new" className="btn-secondary bg-white text-teal-600 hover:bg-gray-100 px-6 py-2">
                  新着商品を見る
                </a>
              </div>
            </div>
            
            {/* 宅配買取バナー */}
            <div className="banner-container bg-gradient-to-r from-pink-500 to-red-500 text-white text-center">
              <div className="banner-content">
                <h3 className="text-2xl font-bold mb-3">💰 宅配買取</h3>
                <p className="mb-4">不要なカードを高価買取いたします</p>
                <a href="/buyback" className="btn-secondary bg-white text-red-600 hover:bg-gray-100 px-6 py-2">
                  買取について
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 新着商品 - リニューアル */}
      <section className="py-16 bg-gradient-to-br from-green-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="card-premium p-8 shadow-strong">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                🆕 最新入荷商品
              </h2>
              <p className="text-gray-600 text-lg">
                毎日更新される最新のカード商品をいち早くチェック！
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {newProducts.slice(0, 10).map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-zoom-in" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/products?filter=new"
                className="btn-primary text-lg px-8 py-4 hover:scale-110 shadow-strong inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
              >
                <span>🚀</span>
                全ての新着商品を見る
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BOX・カートン商品 - リニューアル */}
      <section className="py-16 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="card-premium p-8 shadow-strong">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                📦 BOX・カートン商品
              </h2>
              <p className="text-gray-600 text-lg">
                未開封の価値ある商品を多数取り揃えています
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {boxProducts.slice(0, 10).map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-zoom-in" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/category/box"
                className="btn-primary text-lg px-8 py-4 hover:scale-110 shadow-strong inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <span>📦</span>
                全てのBOX商品を見る
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PSA鑑定済みカード - プレミアムセクション */}
      <section className="py-16 bg-gradient-to-br from-yellow-50 via-white to-purple-50 relative overflow-hidden">
        {/* 装飾的な背景要素 */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="card-premium p-8 shadow-strong border-2 border-gradient-to-r from-yellow-200 to-purple-200">
            <div className="text-center mb-8">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-600 via-orange-500 to-purple-600 bg-clip-text text-transparent">
                🏆 PSA鑑定済みカード
              </h2>
              <div className="flex justify-center mb-4">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce-slow border-2 border-yellow-300">
                  ⭐ 最高品質保証 ⭐
                </span>
              </div>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                厳格な品質管理により認定された、コレクター垂涎のプレミアムカード
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
              {psaProducts.slice(0, 10).map((product, index) => (
                <div 
                  key={product.id} 
                  className="animate-zoom-in hover-lift" 
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                href="/category/psa-graded"
                className="btn-primary text-lg px-8 py-4 hover:scale-110 shadow-strong inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-purple-500 hover:from-yellow-600 hover:via-orange-600 hover:to-purple-600 relative overflow-hidden"
              >
                <span className="animate-spin-slow">🏆</span>
                全てのPSA鑑定品を見る
                <span>→</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ・ニュース - モダンリニューアル */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="card-premium p-8 shadow-strong">
            <div className="text-center mb-8">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                📢 お知らせ・ニュース
              </h2>
              <p className="text-gray-600 text-lg">
                最新の情報とお得なキャンペーン情報をチェック
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="notification notification-error hover-lift cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    ⚠️
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm animate-pulse">重要</span>
                      <span className="text-sm text-gray-500">2024.01.15</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">年末年始の営業時間変更について</h3>
                    <p className="text-sm text-gray-600">12月29日〜1月3日の営業時間が変更となります。詳細はお知らせページをご確認ください。</p>
                  </div>
                </div>
              </div>
              
              <div className="notification notification-success hover-lift cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    🆕
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">新着</span>
                      <span className="text-sm text-gray-500">2024.01.10</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">PSA鑑定済みカードの取り扱いを大幅拡大</h3>
                    <p className="text-sm text-gray-600">高品質なPSA鑑定済みカードを新たに300点以上追加いたしました。</p>
                  </div>
                </div>
              </div>
              
              <div className="notification notification-warning hover-lift cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    📦
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">入荷</span>
                      <span className="text-sm text-gray-500">2024.01.05</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-1">ポケモンカード最新弾が入荷</h3>
                    <p className="text-sm text-gray-600">大人気の最新弾パックとBOXが入荷しました。在庫に限りがございます。</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Link 
                href="/news"
                className="btn-secondary px-8 py-3 hover:scale-105 shadow-medium inline-flex items-center gap-2"
              >
                <span>📰</span>
                全てのお知らせを見る
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}