import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-red-600 text-white mt-16 sticky bottom-0 z-40">
      {/* 2行のリンクボタン配置 */}
      <div className="container mx-auto px-4 py-3">
        {/* 第1行 - メインナビゲーション */}
        <div className="flex justify-center space-x-6 mb-2">
          <Link href="/" className="text-xs hover:text-red-200 transition-colors px-2 py-1">
            ホーム
          </Link>
          <Link href="/category/pokemon" className="text-xs hover:text-red-200 transition-colors px-2 py-1">
            ポケモン
          </Link>
          <Link href="/category/one-piece" className="text-xs hover:text-red-200 transition-colors px-2 py-1">
            ワンピース
          </Link>
          <Link href="/category/dragon-ball" className="text-xs hover:text-red-200 transition-colors px-2 py-1">
            ドラゴンボール
          </Link>
          <Link href="/category/yu-gi-oh" className="text-xs hover:text-red-200 transition-colors px-2 py-1">
            遊戯王
          </Link>
          <Link href="/category/psa-graded" className="text-xs hover:text-red-200 transition-colors px-2 py-1">
            PSA鑑定
          </Link>
        </div>
        
        {/* 第2行 - サポートリンク */}
        <div className="flex justify-center space-x-6 text-xs">
          <Link href="/guide" className="hover:text-red-200 transition-colors px-2 py-1">
            ご利用案内
          </Link>
          <Link href="/contact" className="hover:text-red-200 transition-colors px-2 py-1">
            お問い合わせ
          </Link>
          <Link href="/privacy" className="hover:text-red-200 transition-colors px-2 py-1">
            プライバシー
          </Link>
          <Link href="/terms" className="hover:text-red-200 transition-colors px-2 py-1">
            利用規約
          </Link>
          <Link href="/tokusho" className="hover:text-red-200 transition-colors px-2 py-1">
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