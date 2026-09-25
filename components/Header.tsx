'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { categories } from '@/lib/mock-data';

export default function Header() {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Top Banner */}
      <div className="bg-black text-white text-center py-2 text-sm">
        <p>🔥 Frete grátis em compras acima de R$ 299 | Parcele em até 6x sem juros 🔥</p>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight">
            FREITAS_IMPORTS
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos?categoria=${category.slug}`}
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>

            <Link
              href="/conta"
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Minha conta"
            >
              <User size={20} />
            </Link>

            <Link
              href="/favoritos"
              className="hidden md:block p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Favoritos"
            >
              <Heart size={20} />
            </Link>

            <Link
              href="/carrinho"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              {getCartCount() > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-black transition-colors"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/produtos?categoria=${category.slug}`}
                className="block text-sm font-medium text-gray-700 hover:text-black transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-4 space-y-4">
              <Link
                href="/conta"
                className="block text-sm font-medium text-gray-700 hover:text-black transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Minha Conta
              </Link>
              <Link
                href="/favoritos"
                className="block text-sm font-medium text-gray-700 hover:text-black transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Favoritos
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
