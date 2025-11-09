import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layouts/Header'
import Sidebar from '@/components/layouts/Sidebar'
import Footer from '@/components/layouts/Footer'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'シンソクカードショップ - トレーディングカード専門店',
  description: 'ポケモン、ワンピース、ドラゴンボールなどの日本のトレーディングカード専門店。PSA鑑定済みカードも豊富に取り揃えています。',
  keywords: 'ポケモンカード, ワンピースカード, ドラゴンボールカード, 遊戯王, デジモンカード, PSA鑑定, BGS鑑定, トレカ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className}`}>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <div className="flex">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <main className="flex-1 min-h-screen bg-white">
              {children}
            </main>
          </div>
          <Footer />
          <CartDrawer />
        </div>
      </body>
    </html>
  )
}