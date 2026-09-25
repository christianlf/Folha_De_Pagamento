'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Truck, Shield, Repeat, Star, ChevronRight } from 'lucide-react';
import { products } from '@/lib/mock-data';
import { useCart } from '@/context/CartContext';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.slug === params.slug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
        <Link href="/produtos" className="text-black hover:underline">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = hasDiscount ? calculateDiscount(product.price, product.compareAtPrice!) : 0;

  const availableSizes = Array.from(new Set(product.variants.map(v => v.size)));
  const availableColors = Array.from(new Set(product.variants.map(v => v.color)));

  const selectedVariant = product.variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  const canAddToCart = selectedSize && selectedColor && selectedVariant && selectedVariant.stock > 0;

  const handleAddToCart = () => {
    if (canAddToCart && selectedVariant) {
      addToCart(product, selectedVariant, quantity);
      // Show toast notification here
    }
  };

  const relatedProducts = products
    .filter(p => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">Início</Link>
            <ChevronRight size={16} />
            <Link href="/produtos" className="hover:text-black">Produtos</Link>
            <ChevronRight size={16} />
            <Link href={`/produtos?categoria=${product.category.slug}`} className="hover:text-black">
              {product.category.name}
            </Link>
            <ChevronRight size={16} />
            <span className="text-black">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden mb-4">
              <Image
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.isNew && (
                <span className="absolute top-4 left-4 bg-black text-white text-xs font-medium px-3 py-1 rounded">
                  NOVO
                </span>
              )}
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-[3/4] rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-black' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt || `${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <Link
                href={`/produtos?categoria=${product.category.slug}`}
                className="text-sm text-gray-600 hover:text-black"
              >
                {product.category.name}
              </Link>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            {product.averageRating && (
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.averageRating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.averageRating} ({product.reviewCount} avaliações)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline space-x-3">
                <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
                {hasDiscount && (
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.compareAtPrice!)}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ou 6x de {formatPrice(product.price / 6)} sem juros
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <label className="font-medium">Tamanho</label>
                <button className="text-sm text-gray-600 hover:text-black">
                  Guia de tamanhos
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {availableSizes.map(size => {
                  const hasStock = product.variants.some(
                    v => v.size === size && v.stock > 0
                  );
                  return (
                    <button
                      key={size}
                      onClick={() => hasStock && setSelectedSize(size)}
                      disabled={!hasStock}
                      className={`px-6 py-3 border rounded-lg font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : hasStock
                          ? 'bg-white text-gray-900 border-gray-300 hover:border-black'
                          : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed line-through'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="font-medium mb-3 block">Cor</label>
              <div className="flex flex-wrap gap-3">
                {availableColors.map(color => {
                  const variant = product.variants.find(v => v.color === color);
                  const hasStock = product.variants.some(
                    v => v.color === color && v.stock > 0
                  );
                  return (
                    <button
                      key={color}
                      onClick={() => hasStock && setSelectedColor(color)}
                      disabled={!hasStock}
                      className={`flex items-center space-x-2 px-4 py-2 border rounded-lg ${
                        selectedColor === color
                          ? 'border-black bg-gray-50'
                          : hasStock
                          ? 'border-gray-300 hover:border-black'
                          : 'border-gray-200 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{ backgroundColor: variant?.colorHex || '#ccc' }}
                      />
                      <span className="text-sm font-medium">{color}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="font-medium mb-3 block">Quantidade</label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
                {selectedVariant && (
                  <span className="text-sm text-gray-600">
                    {selectedVariant.stock} disponíveis
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                className={`flex-1 py-4 rounded-lg font-semibold text-white flex items-center justify-center space-x-2 ${
                  canAddToCart
                    ? 'bg-black hover:bg-gray-800'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={20} />
                <span>Adicionar ao Carrinho</span>
              </button>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="px-4 border border-gray-300 rounded-lg hover:border-black"
              >
                <Heart
                  size={24}
                  className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
                />
              </button>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-8 p-6 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Truck size={20} />
                <span className="text-sm">Frete grátis acima de R$ 299</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield size={20} />
                <span className="text-sm">Compra 100% segura</span>
              </div>
              <div className="flex items-center space-x-3">
                <Repeat size={20} />
                <span className="text-sm">Primeira troca grátis</span>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="font-semibold text-lg mb-4">Descrição</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Você Também Pode Gostar</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
