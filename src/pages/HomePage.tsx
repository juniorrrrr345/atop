import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, Truck, Clock, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "CBD Oil Premium 10%",
      price: "45.00€",
      category: "Huiles CBD",
      thc: "< 0.2%",
      cbd: "10%",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia Haze",
      price: "12.00€",
      category: "Fleurs CBD",
      thc: "< 0.2%",
      cbd: "18%",
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Résine CBD Hash Premium",
      price: "25.00€",
      category: "Résines CBD",
      thc: "< 0.2%",
      cbd: "22%",
      rating: 4.7,
      reviews: 156
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "100% Légal",
      description: "Tous nos produits respectent la législation française avec THC ≤ 0.2%"
    },
    {
      icon: Leaf,
      title: "Qualité Premium",
      description: "Produits testés en laboratoire, certifiés biologiques"
    },
    {
      icon: Truck,
      title: "Livraison Rapide",
      description: "Expédition sous 24h, livraison discrète partout en France"
    },
    {
      icon: Clock,
      title: "Support 24/7",
      description: "Équipe d'experts disponible pour vous conseiller"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="cbd-text-gradient">Boutique CBD Premium</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez notre sélection de produits CBD de haute qualité, 
            100% légaux et conformes à la réglementation française
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
            <Shield className="inline h-4 w-4 mr-2" />
            THC ≤ 0.2%
          </div>
          <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
            <Leaf className="inline h-4 w-4 mr-2" />
            100% Légal
          </div>
          <div className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/30">
            <Truck className="inline h-4 w-4 mr-2" />
            Livraison France
          </div>
        </div>

        <Link 
          to="/showcase"
          className="inline-block cbd-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg cbd-hover-effect"
        >
          Découvrir nos produits
        </Link>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Produits Vedettes</h2>
          <p className="text-gray-400">Nos meilleures sélections de produits CBD</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="bg-gray-800/50 rounded-lg p-6 cbd-hover-effect border border-gray-700">
              <div className="aspect-square bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg mb-4 flex items-center justify-center">
                <Leaf className="h-16 w-16 text-green-400" />
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-400 text-sm">{product.category}</p>
                  </div>
                  <span className="text-green-400 font-bold text-lg">{product.price}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">THC: {product.thc}</span>
                  <span className="text-green-400 font-medium">CBD: {product.cbd}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({product.reviews} avis)</span>
                </div>
                
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                  Voir les détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Pourquoi nous choisir ?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center space-y-4 p-6 bg-gray-800/30 rounded-lg">
                <Icon className="h-12 w-12 mx-auto text-green-400" />
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Legal Notice */}
      <section className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
        <div className="text-center space-y-2">
          <h3 className="font-semibold text-amber-300">Avertissement Légal</h3>
          <p className="text-sm text-amber-200 max-w-4xl mx-auto">
            Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française. 
            Réservé aux adultes de plus de 18 ans. Ne pas conduire après consommation. 
            Consultez votre médecin avant utilisation si vous êtes enceinte, allaitez ou sous traitement médical.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;