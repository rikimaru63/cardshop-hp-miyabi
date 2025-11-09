import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      {/* メインフッター */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 会社情報 */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-black">CardShop</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              日本のトレーディングカード専門店です。<br />
              ポケモン、ワンピース、ドラゴンボール、遊戯王、<br />
              デジモンなどを取り扱っております。
            </p>
            <div className="text-sm text-gray-600">
              <p>営業時間：10:00-18:00</p>
              <p>定休日：日曜・祝日</p>
            </div>
          </div>

          {/* サイトリンク */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-black">サイトマップ</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link href="/category/pokemon" className="text-gray-600 hover:text-black transition-colors">
                  ポケモン
                </Link>
              </li>
              <li>
                <Link href="/category/one-piece" className="text-gray-600 hover:text-black transition-colors">
                  ワンピース
                </Link>
              </li>
              <li>
                <Link href="/category/dragon-ball" className="text-gray-600 hover:text-black transition-colors">
                  ドラゴンボール
                </Link>
              </li>
              <li>
                <Link href="/category/yu-gi-oh" className="text-gray-600 hover:text-black transition-colors">
                  遊戯王
                </Link>
              </li>
              <li>
                <Link href="/category/psa-graded" className="text-gray-600 hover:text-black transition-colors">
                  PSA鑑定済み
                </Link>
              </li>
            </ul>
          </div>

          {/* ご利用案内 */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-black">ご利用案内</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guide/payment" className="text-gray-600 hover:text-black transition-colors">
                  お支払い方法
                </Link>
              </li>
              <li>
                <Link href="/guide/shipping" className="text-gray-600 hover:text-black transition-colors">
                  配送・送料について
                </Link>
              </li>
              <li>
                <Link href="/guide/returns" className="text-gray-600 hover:text-black transition-colors">
                  返品・交換について
                </Link>
              </li>
              <li>
                <Link href="/guide/condition" className="text-gray-600 hover:text-black transition-colors">
                  商品の状態について
                </Link>
              </li>
              <li>
                <Link href="/guide/contact" className="text-gray-600 hover:text-black transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ボトムフッター */}
      <div className="border-t border-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-xs text-gray-500">
              © {currentYear} CardShop-Shinsoku. All rights reserved.
            </div>
            <div className="flex space-x-4 text-xs">
              <Link href="/privacy" className="text-gray-500 hover:text-black transition-colors">
                プライバシーポリシー
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-black transition-colors">
                利用規約
              </Link>
              <Link href="/tokusho" className="text-gray-500 hover:text-black transition-colors">
                特定商取引法に基づく表記
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}