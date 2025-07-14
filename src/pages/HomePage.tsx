import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Phone, Mail, MapPin, Menu, X } from 'lucide-react';

const HomePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const featuredProducts = [
    {
      id: 1,
      name: "Produit Premium 1",
      price: "45.00€",
      category: "Catégorie 1",
      description: "Description détaillée du produit premium avec des caractéristiques exceptionnelles.",
      rating: 4.8,
      reviews: 124,
      image: "/placeholder-product.jpg"
    },
    {
      id: 2,
      name: "Produit Premium 2",
      price: "32.00€",
      category: "Catégorie 2",
      description: "Un produit de qualité supérieure avec des avantages uniques pour nos clients.",
      rating: 4.9,
      reviews: 89,
      image: "/placeholder-product.jpg"
    },
    {
      id: 3,
      name: "Produit Premium 3",
      price: "28.00€",
      category: "Catégorie 3",
      description: "Excellente qualité et prix compétitif pour ce produit très demandé.",
      rating: 4.7,
      reviews: 156,
      image: "/placeholder-product.jpg"
    }
  ];

  const benefits = [
    {
      icon: ShoppingBag,
      title: "Qualité Premium",
      description: "Tous nos produits sont sélectionnés avec soin pour garantir la meilleure qualité."
    },
    {
      icon: Star,
      title: "Service Client",
      description: "Notre équipe est disponible pour vous accompagner dans vos choix."
    },
    {
      icon: Phone,
      title: "Contact Direct",
      description: "Contactez-nous directement pour vos commandes et questions."
    },
    {
      icon: MapPin,
      title: "Livraison",
      description: "Service de livraison rapide et sécurisé partout en France."
    }
  ];

  return (
    <div className="boutique-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            BOUTIQUE
          </div>
          
          {/* Navigation Desktop */}
          <nav className="nav-menu">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/showcase" className="nav-link">Produits</Link>
            <Link to="/infos" className="nav-link">Informations</Link>
            <Link to="/canal" className="nav-link">Contact</Link>
          </nav>

          {/* Menu Mobile */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-t border-white/10">
            <nav className="flex flex-col p-4 space-y-4">
              <Link to="/" className="nav-link py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Accueil
              </Link>
              <Link to="/showcase" className="nav-link py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Produits
              </Link>
              <Link to="/infos" className="nav-link py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Informations
              </Link>
              <Link to="/canal" className="nav-link py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title fade-in-up">
            BOUTIQUE PREMIUM
          </h1>
          <p className="hero-subtitle fade-in-up">
            Découvrez notre sélection de produits de qualité supérieure, 
            soigneusement choisis pour répondre à vos besoins.
          </p>
          <div className="hero-buttons fade-in-up">
            <Link to="/showcase" className="hero-btn hero-btn-primary">
              Découvrir nos produits
            </Link>
            <Link to="/canal" className="hero-btn hero-btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Produits Vedettes
          </h2>
          <p className="text-white/70 text-lg">
            Nos meilleures sélections pour vous
          </p>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product, index) => (
            <div key={product.id} className="product-card fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="product-media">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDMyMCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMjQwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjE2MCIgeT0iMTIwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2U8L3RleHQ+Cjwvc3ZnPgo=';
                  }}
                />
              </div>
              
              <div className="product-content">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-sm text-white/60 ml-2">({product.reviews} avis)</span>
                </div>
                
                <div className="product-price">{product.price}</div>
                
                <div className="product-actions">
                  <button className="btn-primary flex-1">
                    Voir détails
                  </button>
                  <button className="btn-secondary">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Pourquoi nous choisir ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <Icon className="h-12 w-12 mx-auto text-white mb-4" />
                <h3 className="font-semibold text-lg text-white mb-2">{benefit.title}</h3>
                <p className="text-white/70 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Contactez-nous
          </h2>
          <p className="text-white/70 text-lg">
            Nous sommes là pour vous aider
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 fade-in-up">
            <Phone className="h-8 w-8 mx-auto text-white mb-4" />
            <h3 className="font-semibold text-white mb-2">Téléphone</h3>
            <p className="text-white/70">+33 1 23 45 67 89</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 fade-in-up">
            <Mail className="h-8 w-8 mx-auto text-white mb-4" />
            <h3 className="font-semibold text-white mb-2">Email</h3>
            <p className="text-white/70">contact@boutique.com</p>
          </div>
          
          <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 fade-in-up">
            <MapPin className="h-8 w-8 mx-auto text-white mb-4" />
            <h3 className="font-semibold text-white mb-2">Adresse</h3>
            <p className="text-white/70">123 Rue de la Boutique<br />75001 Paris, France</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-grid">
            <div className="footer-section">
              <h3>Boutique Premium</h3>
              <p>Votre partenaire de confiance pour des produits de qualité.</p>
            </div>
            
            <div className="footer-section">
              <h3>Liens rapides</h3>
              <div className="space-y-2">
                <Link to="/" className="block">Accueil</Link>
                <Link to="/showcase" className="block">Produits</Link>
                <Link to="/infos" className="block">Informations</Link>
                <Link to="/canal" className="block">Contact</Link>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Contact</h3>
              <div className="space-y-2">
                <p>+33 1 23 45 67 89</p>
                <p>contact@boutique.com</p>
                <p>123 Rue de la Boutique<br />75001 Paris, France</p>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Horaires</h3>
              <div className="space-y-2">
                <p>Lundi - Vendredi: 9h - 18h</p>
                <p>Samedi: 10h - 16h</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-white/60">
              © 2024 Boutique Premium. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;