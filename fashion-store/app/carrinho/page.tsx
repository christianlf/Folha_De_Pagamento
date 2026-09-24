'use client';

import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

export default function CarrinhoPage() {
  const { cart, removeFromCart, updateQuantity, getCartSubtotal, getCartCount } = useCart();

  const subtotal = getCartSubtotal();
  const shipping = subtotal >= 299 ? 0 : 29.90;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-6" />
          <h1 className="text-3xl font-bold mb-4">Seu carrinho está vazio</h1>
          <p className="text-gray-600 mb-8">
            Adicione produtos ao carrinho para continuar comprando
          </p>
          <Link
            href="/produtos"
            className="inline-flex items-center space-x-2 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            <span>Descobrir Produtos</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 md:p-6 flex flex-col md:flex-row gap-4"
              >
                {/* Product Image */}
                <Link
                  href={`/produto/${item.product.slug}`}
                  className="relative w-full md:w-32 h-40 md:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 128px"
                  />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Link
                        href={`/produto/${item.product.slug}`}
                        className="font-semibold text-lg hover:underline"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-600">{item.product.category.name}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className="w-6 h-6 rounded-full border border-gray-300"
                      style={{ backgroundColor: item.variant.colorHex || '#ccc' }}
                    />
                    <span className="text-sm text-gray-600">{item.variant.color}</span>
                    <span className="text-sm text-gray-400">|</span>
                    <span className="text-sm text-gray-600">Tamanho: {item.variant.size}</span>
                  </div>

                  <div className="flex justify-between items-end mt-auto">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-2 hover:bg-gray-50 transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 font-medium min-w-[3rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.variant.stock}
                        className="px-3 py-2 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-bold text-xl">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatPrice(item.product.price)} cada
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link
              href="/produtos"
              className="block text-center py-4 text-black font-medium hover:underline"
            >
              ← Continuar Comprando
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <h2 className="font-bold text-xl mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getCartCount()} {getCartCount() === 1 ? 'item' : 'itens'})</span>
                  <span className="font-medium text-black">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span className={shipping === 0 ? 'text-green-600 font-semibold' : 'font-medium text-black'}>
                    {shipping === 0 ? 'GRÁTIS' : formatPrice(shipping)}
                  </span>
                </div>

                {shipping > 0 && subtotal < 299 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      Faltam <strong>{formatPrice(299 - subtotal)}</strong> para ganhar frete grátis!
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  ou 6x de {formatPrice(total / 6)} sem juros
                </p>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full bg-black text-white text-center py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3"
              >
                Finalizar Compra
              </Link>

              {/* Security Badges */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-sm font-semibold mb-3">Compra 100% Segura</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      🔒
                    </div>
                    <span>SSL</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      💳
                    </div>
                    <span>Stripe</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                      🔐
                    </div>
                    <span>Seguro</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="border-t border-gray-200 pt-6 mt-6 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Frete grátis acima de R$ 299</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Primeira troca grátis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>✓</span>
                  <span>Parcele em até 6x sem juros</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Saved for Later (Placeholder) */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Salvos para Depois</h2>
          <div className="bg-white rounded-lg p-12 text-center text-gray-500">
            <Heart size={48} className="mx-auto mb-4 text-gray-300" />
            <p>Nenhum item salvo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
