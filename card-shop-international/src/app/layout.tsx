import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import Header from '@/components/layouts/Header'
import Navigation from '@/components/layouts/Navigation'
import Footer from '@/components/layouts/Footer'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Card Shop International - Premium Trading Cards Worldwide',
  description: 'Shop premium trading cards from Japan. Pokemon, One Piece, Dragon Ball and more. International shipping available.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
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