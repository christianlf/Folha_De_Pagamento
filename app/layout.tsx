import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Freitas Imports - Moda Online',
  description: 'Loja de moda online com as últimas tendências em roupas, calçados e acessórios. Frete grátis e parcele sem juros.',
  keywords: ['moda', 'roupas', 'calçados', 'acessórios', 'tendências', 'fashion', 'imports'],
  authors: [{ name: 'Freitas Imports' }],
  openGraph: {
    title: 'Freitas Imports - Moda Online',
    description: 'As últimas tendências em moda com os melhores preços',
    type: 'website',
    locale: 'pt_BR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
