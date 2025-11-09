import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-red-600 to-red-700 text-white mt-16 sticky bottom-0 z-40 shadow-lg">
      {/* 2行のリンクボタン配置 */}
      <div className="container mx-auto px-4 py-3 backdrop-blur-sm">
        {/* 第1行 - メインナビゲーション */}
        <div className="flex justify-center space-x-6 mb-2">
          <Link href="/" className="text-xs hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            ホーム
          </Link>
          <Link href="/category/pokemon" className="text-xs hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            ポケモン
          </Link>
          <Link href="/category/one-piece" className="text-xs hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            ワンピース
          </Link>
          <Link href="/category/dragon-ball" className="text-xs hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            ドラゴンボール
          </Link>
          <Link href="/category/yu-gi-oh" className="text-xs hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            遊戯王
          </Link>
          <Link href="/category/psa-graded" className="text-xs hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            PSA鑑定
          </Link>
        </div>
        
        {/* 第2行 - サポートリンク */}
        <div className="flex justify-center space-x-6 text-xs">
          <Link href="/guide" className="hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            ご利用案内
          </Link>
          <Link href="/contact" className="hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            お問い合わせ
          </Link>
          <Link href="/privacy" className="hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            プライバシー
          </Link>
          <Link href="/terms" className="hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            利用規約
          </Link>
          <Link href="/tokusho" className="hover:text-red-200 transition-all duration-200 px-2 py-1 hover:scale-105 hover:bg-white/10 rounded-lg">
            特商法表記
          </Link>
          <span className="text-red-200 px-2 py-1">
            © {currentYear} シンソクカード
          </span>
        </div>
      </div>
    </footer>
  );
}