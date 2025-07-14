import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Leaf, Shield, Star, ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  const [ageVerified, setAgeVerified] = useState(false);

  const featuredProducts = [
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
      inStock: true
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
      inStock: true
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
      inStock: true
    }
  ];

  if (!ageVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 max-w-md mx-4">
          <div className="text-center">
            <Leaf className="h-16 w-16 text-green-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-4">Vérification d'âge</h2>
            <p className="text-gray-300 mb-6">
              Vous devez avoir 18 ans ou plus pour accéder à ce site.
              Nos produits CBD sont réservés aux adultes.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setAgeVerified(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                J'ai 18 ans ou plus
              </button>
              <button
                onClick={() => window.history.back()}
                className="w-full border border-gray-600 text-gray-300 hover:bg-gray-700 py-3 px-6 rounded-lg font-medium transition-colors"
              >
                Je n'ai pas 18 ans
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              CBD Shop Premium
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Découvrez nos produits CBD de qualité premium, 
              cultivés en Europe selon les plus hauts standards
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/showcase"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Voir nos produits</span>
              </Link>
              <Link
                to="/infos"
                className="border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors inline-flex items-center justify-center space-x-2"
              >
                <Leaf className="h-5 w-5" />
                <span>En savoir plus</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualité Garantie</h3>
              <p className="text-gray-400">
                Produits testés en laboratoire, conformes à la législation française (THC &lt; 0,2%)
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">100% Naturel</h3>
              <p className="text-gray-400">
                Cultivé sans pesticides ni herbicides, extraction CO2 supercritique
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Service Premium</h3>
              <p className="text-gray-400">
                Livraison rapide, conseils personnalisés et support client réactif
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Produits vedettes</h2>
            <p className="text-gray-400 text-lg">
              Découvrez notre sélection de produits CBD les plus populaires
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
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
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-center">
                      <div className="text-green-400 font-bold">{product.cbd}%</div>
                      <div className="text-xs text-gray-400">CBD</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400 font-bold">{product.thc}%</div>
                      <div className="text-xs text-gray-400">THC</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-400">{product.price}€</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 line-through">{product.originalPrice}€</span>
                      )}
                    </div>
                    <span className={`text-sm px-2 py-1 rounded ${
                      product.inStock ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'
                    }`}>
                      {product.inStock ? 'En stock' : 'Rupture'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors inline-flex items-center justify-center space-x-2"
                    >
                      <span>Voir détails</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/showcase"
              className="inline-flex items-center space-x-2 text-green-400 hover:text-green-300 font-medium text-lg"
            >
              <span>Voir tous nos produits</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Notice */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-300 mb-2">Informations légales</h4>
                <p className="text-sm text-amber-200">
                  Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française. 
                  Réservé aux adultes (18+). Ne pas conduire après utilisation. 
                  Ces produits ne sont pas destinés à diagnostiquer, traiter, guérir ou prévenir une maladie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;