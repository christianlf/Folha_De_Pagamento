'use client';

import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">FASHIONSTORE</h3>
            <p className="text-gray-600 text-sm mb-4">
              Sua loja de moda online com as últimas tendências e os melhores preços.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>contato@fashionstore.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Comprar</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/produtos?categoria=novidades" className="hover:text-black transition-colors">Novidades</Link></li>
              <li><Link href="/produtos?categoria=feminino" className="hover:text-black transition-colors">Feminino</Link></li>
              <li><Link href="/produtos?categoria=masculino" className="hover:text-black transition-colors">Masculino</Link></li>
              <li><Link href="/produtos?categoria=calcados" className="hover:text-black transition-colors">Calçados</Link></li>
              <li><Link href="/produtos?categoria=acessorios" className="hover:text-black transition-colors">Acessórios</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-semibold mb-4">Ajuda</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/conta" className="hover:text-black transition-colors">Minha Conta</Link></li>
              <li><Link href="/rastreamento" className="hover:text-black transition-colors">Rastrear Pedido</Link></li>
              <li><Link href="/trocas" className="hover:text-black transition-colors">Trocas e Devoluções</Link></li>
              <li><Link href="/faq" className="hover:text-black transition-colors">FAQ</Link></li>
              <li><Link href="/contato" className="hover:text-black transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-gray-600 mb-4">
              Receba novidades e promoções exclusivas
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-colors text-sm"
              />
              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} FashionStore. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/privacidade" className="hover:text-black transition-colors">
                Privacidade
              </Link>
              <Link href="/termos" className="hover:text-black transition-colors">
                Termos de Uso
              </Link>
              <Link href="/politica-trocas" className="hover:text-black transition-colors">
                Política de Trocas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
