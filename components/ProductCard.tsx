'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const mainImage = product.images[imageIndex] || product.images[0];
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discount = hasDiscount
    ? calculateDiscount(product.price, product.compareAtPrice!)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    const firstAvailableVariant = product.variants.find((v) => v.stock > 0);
    if (firstAvailableVariant) {
      addToCart(product, firstAvailableVariant, 1);
    }
  };

  return (
    <Link href={`/produto/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-gray-100 rounded-lg mb-4 aspect-[3/4]">
        <Image
          src={mainImage.url}
          alt={mainImage.alt || product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-xs font-medium px-2 py-1 rounded">
              NOVO
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          aria-label="Adicionar aos favoritos"
        >
          <Heart
            size={18}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Quick Add Button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-3 left-3 right-3 bg-white text-black py-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm flex items-center justify-center space-x-2"
        >
          <ShoppingBag size={16} />
          <span>Adicionar ao Carrinho</span>
        </button>

        {/* Image Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  setImageIndex(index);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  index === imageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Ver imagem ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <h3 className="font-medium text-sm text-gray-900 group-hover:underline">
          {product.name}
        </h3>

        <p className="text-xs text-gray-500">{product.category.name}</p>

        <div className="flex items-center space-x-2">
          <span className="font-semibold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xs ${
                    i < Math.floor(product.averageRating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Available Colors */}
        {product.variants.length > 0 && (
          <div className="flex space-x-1 pt-1">
            {Array.from(new Set(product.variants.map((v) => v.colorHex)))
              .filter(Boolean)
              .slice(0, 4)
              .map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color || '#ccc' }}
                />
              ))}
            {Array.from(new Set(product.variants.map((v) => v.color))).length > 4 && (
              <span className="text-xs text-gray-500 ml-1">
                +{Array.from(new Set(product.variants.map((v) => v.color))).length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
