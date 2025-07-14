import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter, Search, Leaf, ArrowRight } from 'lucide-react';

const ShowcasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const products = [
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      category: "Huiles CBD",
      price: 45.00,
      originalPrice: 55.00,
      cbd: 10.0,
      thc: 0.15,
      image: "https://images.unsplash.com/photo-1612220701450-9c2a9565f1d5?w=400",
      rating: 4.8,
      inStock: true,
      description: "Huile CBD premium extraite par CO2 supercritique"
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia",
      category: "Fleurs CBD",
      price: 12.00,
      cbd: 18.5,
      thc: 0.18,
      image: "https://images.unsplash.com/photo-1615486505002-e5a6a0c0c4a1?w=400",
      rating: 4.9,
      inStock: true,
      description: "Fleurs CBD Amnesia de qualité premium"
    },
    {
      id: 3,
      name: "Résine CBD Hash",
      category: "Résines CBD",
      price: 25.00,
      cbd: 22.0,
      thc: 0.20,
      image: "https://images.unsplash.com/photo-1609733278304-13b6c8d17a08?w=400",
      rating: 4.7,
      inStock: true,
      description: "Résine CBD artisanale de haute qualité"
    },
    {
      id: 4,
      name: "CBD Gummies 25mg",
      category: "Comestibles",
      price: 18.00,
      cbd: 25.0,
      thc: 0.10,
      image: "https://images.unsplash.com/photo-1582391177775-65c16cf5d3e6?w=400",
      rating: 4.6,
      inStock: true,
      description: "Bonbons CBD aux fruits naturels"
    },
    {
      id: 5,
      name: "Crème CBD Apaisant",
      category: "Cosmétiques",
      price: 32.00,
      cbd: 15.0,
      thc: 0.05,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
      rating: 4.5,
      inStock: false,
      description: "Crème apaisante au CBD pour la peau"
    },
    {
      id: 6,
      name: "E-liquide CBD Menthe",
      category: "E-liquides",
      price: 22.00,
      cbd: 20.0,
      thc: 0.12,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400",
      rating: 4.4,
      inStock: true,
      description: "E-liquide CBD saveur menthe fraîche"
    }
  ];

  const categories = [
    { value: 'all', label: 'Toutes les catégories' },
    { value: 'Huiles CBD', label: 'Huiles CBD' },
    { value: 'Fleurs CBD', label: 'Fleurs CBD' },
    { value: 'Résines CBD', label: 'Résines CBD' },
    { value: 'Comestibles', label: 'Comestibles' },
    { value: 'Cosmétiques', label: 'Cosmétiques' },
    { value: 'E-liquides', label: 'E-liquides' }
  ];

  const filteredProducts = products
    .filter(product => 
      selectedCategory === 'all' || product.category === selectedCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Nos Produits CBD
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez notre gamme complète de produits CBD de qualité premium, 
            tous testés en laboratoire et conformes à la législation française
          </p>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Catégorie */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Tri */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                <option value="name">Trier par nom</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Meilleures notes</option>
                <option value="cbd">Taux CBD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-400">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
            {selectedCategory !== 'all' && ` dans "${selectedCategory}"`}
          </p>
        </div>

        {/* Grille des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-sm font-medium">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-medium">
                    Rupture
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-green-400 text-sm font-medium">{product.category}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-400">{product.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-center">
                    <div className="text-green-400 font-bold">{product.cbd}%</div>
                    <div className="text-xs text-gray-400">CBD</div>
                  </div>
                  <div className="text-center">
                    <div className="text-orange-400 font-bold">{product.thc}%</div>
                    <div className="text-xs text-gray-400">THC</div>
                  </div>
                  <div className="flex-1 text-right">
                    <span className={`text-sm px-2 py-1 rounded ${
                      product.inStock ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                    }`}>
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-400">{product.price}€</span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through">{product.originalPrice}€</span>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Link
                    to={`/product/${product.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
                  >
                    <span>Voir détails</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <button 
                    disabled={!product.inStock}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>{product.inStock ? 'Ajouter au panier' : 'Indisponible'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message si aucun produit */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <Leaf className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-500 mb-6">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Informations légales */}
        <div className="mt-16 bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Leaf className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-amber-300 mb-2">Information importante</h4>
              <p className="text-sm text-amber-200">
                Tous nos produits CBD respectent la législation française avec un taux de THC inférieur à 0,2%. 
                Réservé aux adultes de plus de 18 ans. Consultez votre médecin avant utilisation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcasePage;