import React, { useState } from 'react';
import { Search, Filter, Leaf, Star, ShoppingCart } from 'lucide-react';

const ShowcasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'oils', name: 'Huiles CBD' },
    { id: 'flowers', name: 'Fleurs CBD' },
    { id: 'resins', name: 'Résines CBD' },
    { id: 'edibles', name: 'Comestibles' },
    { id: 'cosmetics', name: 'Cosmétiques' }
  ];

  const products = [
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      category: "oils",
      price: 45.00,
      thc: 0.15,
      cbd: 10.0,
      rating: 4.8,
      reviews: 124,
      description: "Huile CBD full spectrum de qualité premium",
      inStock: true,
      image: "/placeholder-product.jpg"
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia Haze",
      category: "flowers",
      price: 12.00,
      thc: 0.18,
      cbd: 18.5,
      rating: 4.9,
      reviews: 89,
      description: "Fleurs CBD indoor Amnesia Haze",
      inStock: true,
      image: "/placeholder-product.jpg"
    },
    {
      id: 3,
      name: "Résine CBD Hash Premium",
      category: "resins",
      price: 25.00,
      thc: 0.20,
      cbd: 22.0,
      rating: 4.7,
      reviews: 156,
      description: "Résine CBD hash de qualité supérieure",
      inStock: true,
      image: "/placeholder-product.jpg"
    },
    {
      id: 4,
      name: "CBD Oil Relax 5%",
      category: "oils",
      price: 29.00,
      thc: 0.12,
      cbd: 5.0,
      rating: 4.6,
      reviews: 67,
      description: "Huile CBD relaxante pour débutants",
      inStock: true,
      image: "/placeholder-product.jpg"
    },
    {
      id: 5,
      name: "Fleurs CBD White Widow",
      category: "flowers",
      price: 15.00,
      thc: 0.19,
      cbd: 16.2,
      rating: 4.5,
      reviews: 92,
      description: "Fleurs CBD White Widow indoor",
      inStock: false,
      image: "/placeholder-product.jpg"
    },
    {
      id: 6,
      name: "Gummies CBD 25mg",
      category: "edibles",
      price: 18.00,
      thc: 0.1,
      cbd: 25.0,
      rating: 4.4,
      reviews: 34,
      description: "Bonbons gélifiés au CBD, saveur fruits",
      inStock: true,
      image: "/placeholder-product.jpg"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'cbd':
        return b.cbd - a.cbd;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold cbd-text-gradient">Nos Produits CBD</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits CBD premium, 
            tous testés en laboratoire et conformes à la législation française
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 appearance-none"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-green-500 appearance-none"
            >
              <option value="name">Trier par nom</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="rating">Note</option>
              <option value="cbd">Taux CBD</option>
            </select>
          </div>

          <div className="text-sm text-gray-400">
            {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700 cbd-hover-effect">
              {/* Product Image */}
              <div className="aspect-square bg-gradient-to-br from-green-900 to-emerald-900 flex items-center justify-center relative">
                <Leaf className="h-16 w-16 text-green-400" />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-red-300 font-semibold">Rupture de stock</span>
                  </div>
                )}
              </div>

              <div className="p-4 space-y-3">
                {/* Product Info */}
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{product.name}</h3>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </div>

                {/* CBD/THC Info */}
                <div className="flex justify-between text-sm">
                  <span className="text-red-300">THC: {product.thc}%</span>
                  <span className="text-green-400 font-medium">CBD: {product.cbd}%</span>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews})</span>
                </div>

                {/* Price and Add to Cart */}
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-bold text-xl">{product.price.toFixed(2)}€</span>
                  <button 
                    disabled={!product.inStock}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                      product.inStock 
                        ? 'bg-green-600 hover:bg-green-700 text-white' 
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{product.inStock ? 'Ajouter' : 'Indisponible'}</span>
                  </button>
                </div>

                {/* Legal Badge */}
                <div className="text-center">
                  <span className="inline-block bg-green-600/20 text-green-300 text-xs px-2 py-1 rounded border border-green-500/30">
                    ✓ THC ≤ 0.2% - Légal en France
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Leaf className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500">Essayez de modifier vos filtres de recherche</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowcasePage;