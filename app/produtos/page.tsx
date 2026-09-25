'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { Filter, X, ChevronDown } from 'lucide-react';
import { products, categories } from '@/lib/mock-data';

function ProdutosContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('categoria');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'todos');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState('relevance');
  const [showOnlyNew, setShowOnlyNew] = useState(false);
  const [showOnlyDiscount, setShowOnlyDiscount] = useState(false);

  // Get all unique sizes and colors
  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.variants.forEach(v => sizes.add(v.size)));
    return Array.from(sizes).sort();
  }, []);

  const allColors = useMemo(() => {
    const colors = new Map<string, string>();
    products.forEach(p => 
      p.variants.forEach(v => {
        if (v.colorHex) colors.set(v.color, v.colorHex);
      })
    );
    return Array.from(colors.entries());
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(p => p.category.slug === selectedCategory);
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p => 
        p.variants.some(v => selectedSizes.includes(v.size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p =>
        p.variants.some(v => selectedColors.includes(v.color))
      );
    }

    // Price filter
    filtered = filtered.filter(p => 
      p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // New items filter
    if (showOnlyNew) {
      filtered = filtered.filter(p => p.isNew);
    }

    // Discount filter
    if (showOnlyDiscount) {
      filtered = filtered.filter(p => p.compareAtPrice && p.compareAtPrice > p.price);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
    }

    return filtered;
  }, [selectedCategory, selectedSizes, selectedColors, priceRange, sortBy, showOnlyNew, showOnlyDiscount]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('todos');
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 1000]);
    setShowOnlyNew(false);
    setShowOnlyDiscount(false);
  };

  const activeFiltersCount = 
    (selectedCategory !== 'todos' ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    (showOnlyNew ? 1 : 0) +
    (showOnlyDiscount ? 1 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Produtos</h1>
          <p className="text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-black"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categoria</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      checked={selectedCategory === 'todos'}
                      onChange={() => setSelectedCategory('todos')}
                      className="mr-2"
                    />
                    <span className="text-sm">Todos</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedCategory === cat.slug}
                        onChange={() => setSelectedCategory(cat.slug)}
                        className="mr-2"
                      />
                      <span className="text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Tamanho</h3>
                <div className="flex flex-wrap gap-2">
                  {allSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`px-3 py-1 border rounded text-sm ${
                        selectedSizes.includes(size)
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Cor</h3>
                <div className="space-y-2">
                  {allColors.map(([color, hex]) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => toggleColor(color)}
                        className="mr-2"
                      />
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-sm">{color}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quick Filters */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Filtros Rápidos</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showOnlyNew}
                      onChange={(e) => setShowOnlyNew(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Novidades</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showOnlyDiscount}
                      onChange={(e) => setShowOnlyDiscount(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-sm">Em promoção</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Faixa de Preço</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600">
                    Até R$ {priceRange[1].toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg"
              >
                <Filter size={20} />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                >
                  <option value="relevance">Relevância</option>
                  <option value="newest">Mais recentes</option>
                  <option value="popular">Mais populares</option>
                  <option value="price-asc">Menor preço</option>
                  <option value="price-desc">Maior preço</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-4">
                  Nenhum produto encontrado com os filtros selecionados
                </p>
                <button
                  onClick={clearFilters}
                  className="text-black font-medium hover:underline"
                >
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-lg">Filtros</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Same filters as desktop */}
              <div className="space-y-6">
                {/* Category */}
                <div>
                  <h3 className="font-medium mb-3">Categoria</h3>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedCategory === 'todos'}
                        onChange={() => setSelectedCategory('todos')}
                        className="mr-2"
                      />
                      <span className="text-sm">Todos</span>
                    </label>
                    {categories.map(cat => (
                      <label key={cat.id} className="flex items-center">
                        <input
                          type="radio"
                          checked={selectedCategory === cat.slug}
                          onChange={() => setSelectedCategory(cat.slug)}
                          className="mr-2"
                        />
                        <span className="text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <h3 className="font-medium mb-3">Tamanho</h3>
                  <div className="flex flex-wrap gap-2">
                    {allSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 border rounded text-sm ${
                          selectedSizes.includes(size)
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Apply Filters Button */}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-black text-white py-3 rounded-lg font-medium"
                >
                  Ver {filteredProducts.length} produtos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Carregando...</div>}>
      <ProdutosContent />
    </Suspense>
  );
}
