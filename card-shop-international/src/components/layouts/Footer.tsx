import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-20 relative overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        {/* メインフッターコンテンツ */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
            
            {/* ブランド情報 */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">シ</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-red-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    シンソク
                  </span>
                  <span className="text-sm text-gray-400 font-medium -mt-1">CARD SHOP</span>
                </div>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                日本最大級のトレーディングカード専門ショップ。PSA鑑定済み高品質カードから最新弾まで、豊富な品揃えでお客様をお迎えします。
              </p>
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
                  <span className="text-white">📧</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
                  <span className="text-white">📱</span>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer">
                  <span className="text-white">📺</span>
                </div>
              </div>
            </div>

            {/* 商品カテゴリー */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                🎯 商品カテゴリー
              </h3>
              <ul className="space-y-3">
                <li><Link href="/category/pokemon" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">🔥 ポケモンカード</Link></li>
                <li><Link href="/category/one-piece" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">⚓ ワンピースカード</Link></li>
                <li><Link href="/category/dragon-ball" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">🐉 ドラゴンボール</Link></li>
                <li><Link href="/category/yu-gi-oh" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">👁️ 遊戯王カード</Link></li>
                <li><Link href="/category/psa-graded" className="flex items-center gap-2 text-gray-300 hover:text-yellow-300 hover:bg-gradient-to-r hover:from-yellow-500/20 hover:to-orange-500/20 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">🏆 PSA鑑定品</Link></li>
              </ul>
            </div>

            {/* サポート情報 */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                🛠️ サポート
              </h3>
              <ul className="space-y-3">
                <li><Link href="/guide" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">📋 ご利用ガイド</Link></li>
                <li><Link href="/contact" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">💬 お問い合わせ</Link></li>
                <li><Link href="/status" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">✅ カード状態表記</Link></li>
                <li><Link href="/buyback" className="flex items-center gap-2 text-gray-300 hover:text-green-300 hover:bg-gradient-to-r hover:from-green-500/20 hover:to-teal-500/20 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">💰 宅配買取サービス</Link></li>
                <li><Link href="/shipping" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">📦 配送について</Link></li>
              </ul>
            </div>

            {/* 会社情報・法的情報 */}
            <div>
              <h3 className="text-lg font-bold mb-4 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                🏢 会社情報
              </h3>
              <ul className="space-y-3">
                <li><Link href="/about" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">🏛️ 会社概要</Link></li>
                <li><Link href="/privacy" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">🔒 プライバシーポリシー</Link></li>
                <li><Link href="/terms" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">📜 利用規約</Link></li>
                <li><Link href="/tokusho" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-300 hover:scale-105">⚖️ 特定商取引法</Link></li>
              </ul>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
                <h4 className="font-bold text-sm mb-2 text-blue-300">📞 お問い合わせ</h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  <span className="block">営業時間: 11:00 - 20:00</span>
                  <span className="block">TEL: 03-1234-5678</span>
                  <span className="block">Email: info@shinsoku-cards.jp</span>
                </p>
              </div>
            </div>
          </div>

          {/* ボトムバー */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
                <span>© {currentYear} シンソクカード</span>
                <span>•</span>
                <span>All Rights Reserved</span>
                <span>•</span>
                <span>Powered by Next.js</span>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  サーバー稼働中
                </span>
                <span>•</span>
                <span>SSL暗号化通信</span>
              </div>
            </div>
          </div>
        </div>

        {/* 装飾的な波 */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      </div>
    </footer>
  );
}