import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, Truck, Clock, Star, Eye } from 'lucide-react';

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
      reviews: 124,
      image: "/api/placeholder/300/300"
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia Haze",
      price: "12.00€",
      category: "Fleurs CBD",
      thc: "< 0.2%",
      cbd: "18%",
      rating: 4.9,
      reviews: 89,
      image: "/api/placeholder/300/300"
    },
    {
      id: 3,
      name: "Résine CBD Hash Premium",
      price: "25.00€",
      category: "Résines CBD",
      thc: "< 0.2%",
      cbd: "22%",
      rating: 4.7,
      reviews: 156,
      image: "/api/placeholder/300/300"
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
    <div className="min-h-screen bg-background">
      {/* Navigation mobile */}
      <div className="show-mobile fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-border z-50 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bw-text-gradient">Boutique CBD</h1>
          <Link to="/showcase" className="btn-primary text-sm px-4 py-2">
            Produits
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-20 md:pt-8 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-8 fade-in">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bw-text-gradient">Boutique CBD</span>
              <br />
              <span className="text-2xl md:text-4xl lg:text-5xl font-normal text-muted-foreground">
                Premium & Légal
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Découvrez notre sélection exclusive de produits CBD de haute qualité, 
              100% légaux et conformes à la réglementation française. 
              Une expérience premium pour votre bien-être.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            <div className="bg-card border border-border text-foreground px-4 py-3 rounded-lg flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">THC ≤ 0.2%</span>
            </div>
            <div className="bg-card border border-border text-foreground px-4 py-3 rounded-lg flex items-center space-x-2">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-medium">100% Légal</span>
            </div>
            <div className="bg-card border border-border text-foreground px-4 py-3 rounded-lg flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span className="text-sm font-medium">Livraison France</span>
            </div>
          </div>

          <div className="pt-4">
            <Link to="/showcase" className="btn-primary inline-block">
              Découvrir nos produits
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-10 slide-up">
          <div className="text-center space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold bw-text-gradient">Produits Vedettes</h2>
            <p className="text-muted-foreground text-lg">Nos meilleures sélections de produits CBD</p>
          </div>

          <div className="grid mobile-grid tablet-grid desktop-grid">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="product-card bw-hover-effect fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="aspect-square bg-gradient-to-br from-muted to-card relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Leaf className="h-16 w-16 text-accent" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-xl mb-2">{product.name}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>THC: {product.thc}</span>
                      <span className="text-foreground font-medium">CBD: {product.cbd}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="flex text-accent">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.reviews} avis)</span>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-primary font-bold text-2xl">{product.price}</span>
                    <button className="btn-secondary flex items-center space-x-2">
                      <Eye className="h-4 w-4" />
                      <span className="hide-mobile">Voir détails</span>
                      <span className="show-mobile">Voir</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-6">
            <Link to="/showcase" className="btn-secondary">
              Voir tous nos produits
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="space-y-10 slide-up">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl font-bold bw-text-gradient mb-4">Pourquoi nous choisir ?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="text-center space-y-4 p-6 bg-card border border-border rounded-lg bw-hover-effect fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon className="h-12 w-12 mx-auto text-accent" />
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Legal Notice */}
        <section className="bg-muted border border-border rounded-lg p-6 md:p-8 slide-up">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="h-6 w-6 text-accent" />
              <h3 className="font-semibold text-lg">Avertissement Légal</h3>
            </div>
            <p className="text-sm text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française. 
              Réservé aux adultes de plus de 18 ans. Ne pas conduire après consommation. 
              Consultez votre médecin avant utilisation si vous êtes enceinte, allaitez ou sous traitement médical.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;