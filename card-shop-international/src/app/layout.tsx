import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layouts/Header'
import Navigation from '@/components/layouts/Navigation'
import Footer from '@/components/layouts/Footer'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CardShop-Shinsoku - 新速トレーディングカード専門店',
  description: 'ポケモン、ワンピース、ドラゴンボールなどの日本のトレーディングカード専門店。PSA鑑定済みカードも豊富に取り揃えています。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} ${notoSansJP.className}`}>
        <div className="min-h-screen bg-white">
          <Header />
          <Navigation />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </div>
      </body>
    </html>
  )
}