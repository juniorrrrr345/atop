import React, { useState } from 'react';
import { Search, Filter, Leaf, Star, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

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
      image: "/api/placeholder/400/400"
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
      image: "/api/placeholder/400/400"
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
      image: "/api/placeholder/400/400"
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
      image: "/api/placeholder/400/400"
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
      image: "/api/placeholder/400/400"
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
      image: "/api/placeholder/400/400"
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
    <div className="min-h-screen bg-background">
      {/* Navigation mobile */}
      <div className="show-mobile fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 p-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Retour</span>
          </Link>
          <h1 className="text-lg font-bold bw-text-gradient">Nos Produits</h1>
          <div className="w-16"></div> {/* Spacer for centering */}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-6 fade-in">
            <div className="hide-mobile">
              <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft className="h-4 w-4" />
                <span>Retour à l'accueil</span>
              </Link>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold bw-text-gradient">Nos Produits CBD</h1>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
              Découvrez notre gamme complète de produits CBD premium, 
              tous testés en laboratoire et conformes à la législation française
            </p>
          </div>

          {/* Filters */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-6 space-y-4 slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none"
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
                className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none"
              >
                <option value="name">Trier par nom</option>
                <option value="price-low">Prix croissant</option>
                <option value="price-high">Prix décroissant</option>
                <option value="rating">Note</option>
                <option value="cbd">Taux CBD</option>
              </select>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
              </span>
              <span className="text-xs bg-muted px-2 py-1 rounded-full">
                ✓ Tous légaux THC ≤ 0.2%
              </span>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid mobile-grid tablet-grid desktop-grid lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
            {sortedProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card bw-hover-effect fade-in relative group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Product Image */}
                <div className="aspect-square bg-gradient-to-br from-muted to-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="h-12 w-12 md:h-16 md:w-16 text-accent" />
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
                      {categories.find(c => c.id === product.category)?.name.replace('CBD', '').trim()}
                    </span>
                  </div>
                  
                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <span className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md font-medium text-sm">
                        Rupture de stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4 md:p-5 space-y-3">
                  {/* Product Info */}
                  <div>
                    <h3 className="font-semibold text-base md:text-lg leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{product.description}</p>
                  </div>

                  {/* CBD/THC Info */}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">THC: {product.thc}%</span>
                    <span className="text-foreground font-medium">CBD: {product.cbd}%</span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-3 w-3 md:h-4 md:w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground">({product.reviews})</span>
                  </div>

                  {/* Price and View Button */}
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-primary font-bold text-lg md:text-xl">{product.price.toFixed(2)}€</span>
                    <button 
                      disabled={!product.inStock}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                        product.inStock 
                          ? 'btn-secondary' 
                          : 'bg-muted text-muted-foreground cursor-not-allowed'
                      }`}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hide-mobile">{product.inStock ? 'Voir détails' : 'Indisponible'}</span>
                      <span className="show-mobile">{product.inStock ? 'Voir' : 'N/A'}</span>
                    </button>
                  </div>

                  {/* Legal Badge */}
                  <div className="text-center pt-2">
                    <span className="inline-block bg-card border border-accent/30 text-accent text-xs px-3 py-1 rounded-full">
                      ✓ Légal en France
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-16 fade-in">
              <Leaf className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-3">Aucun produit trouvé</h3>
              <p className="text-muted-foreground mb-6">Essayez de modifier vos filtres de recherche</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('name');
                }}
                className="btn-secondary"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Back to Home */}
          <div className="text-center pt-8 fade-in">
            <Link to="/" className="btn-primary">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcasePage;