import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Truck, Shield, Repeat } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, trends } from '@/lib/mock-data';

export default function Home() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920"
          alt="Nova Coleção"
          fill
          className="object-cover opacity-70"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-3xl px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              NEW COLLECTION
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              As tendências que definem a temporada
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/produtos"
                className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Comprar Agora</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/produtos?categoria=novidades"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors"
              >
                Ver Coleção
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <Truck size={24} />
              </div>
              <h3 className="font-semibold mb-2">Frete Grátis</h3>
              <p className="text-sm text-gray-600">
                Em compras acima de R$ 299
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <Shield size={24} />
              </div>
              <h3 className="font-semibold mb-2">Compra Segura</h3>
              <p className="text-sm text-gray-600">
                Pagamento 100% protegido
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <Repeat size={24} />
              </div>
              <h3 className="font-semibold mb-2">Troca Fácil</h3>
              <p className="text-sm text-gray-600">
                Primeira troca grátis
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Destaques da Temporada</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Peças selecionadas especialmente para você estar sempre na moda
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Tendências</h2>
            <p className="text-gray-600">Descubra os estilos que estão em alta</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trends.slice(0, 3).map((trend) => (
              <Link
                key={trend.id}
                href={`/tendencias/${trend.slug}`}
                className="group relative h-96 rounded-lg overflow-hidden"
              >
                <Image
                  src={trend.image || ''}
                  alt={trend.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{trend.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{trend.description}</p>
                    <span className="inline-flex items-center space-x-2 text-sm font-medium">
                      <span>Explorar</span>
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-2">Novidades</h2>
              <p className="text-gray-600">Recém chegados na loja</p>
            </div>
            <Link
              href="/produtos?categoria=novidades"
              className="hidden md:inline-flex items-center space-x-2 font-medium hover:underline"
            >
              <span>Ver Todos</span>
              <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/produtos?categoria=novidades"
              className="inline-flex items-center space-x-2 font-medium hover:underline"
            >
              <span>Ver Todos</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="relative h-96 bg-gray-900">
        <Image
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920"
          alt="Promoção"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Até 50% OFF
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Em peças selecionadas da coleção anterior
            </p>
            <Link
              href="/produtos?ofertas=true"
              className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Aproveitar Ofertas
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fique por Dentro
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Inscreva-se na nossa newsletter e receba novidades, promoções exclusivas
            e tendências direto no seu e-mail
          </p>
          <form className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Inscrever
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
