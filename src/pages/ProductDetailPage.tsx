import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Shield, 
  Leaf, 
  Package, 
  Truck, 
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Minus,
  Info
} from 'lucide-react';

interface ProductDetailProps {
  productId: number;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailProps> = ({ productId, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - en production, ceci viendrait d'une API
  const product = {
    id: productId,
    name: "CBD Oil Premium 10%",
    category: "Huiles CBD",
    description: "Notre huile CBD Premium 10% est extraite à partir de chanvre biologique cultivé en Europe. Cette huile de haute qualité offre une concentration optimale de cannabidiol pour un usage quotidien. Parfaite pour les débutants et les utilisateurs expérimentés.",
    longDescription: "Cette huile CBD Premium est produite selon les plus hauts standards de qualité. Nos plants de chanvre sont cultivés sans pesticides ni herbicides, dans des conditions optimales. L'extraction se fait par CO2 supercritique, préservant ainsi tous les composés bénéfiques de la plante. Chaque lot est testé en laboratoire pour garantir la pureté et la concentration.",
    price: 45.00,
    originalPrice: 55.00,
    cbd: 10.0,
    thc: 0.15,
    cbg: 0.8,
    cbn: 0.3,
    stock: 25,
    rating: 4.8,
    reviewCount: 234,
    images: [
      "https://images.unsplash.com/photo-1612220701450-9c2a9565f1d5?w=600",
      "https://images.unsplash.com/photo-1615486505002-e5a6a0c0c4a1?w=600",
      "https://images.unsplash.com/photo-1609733278304-13b6c8d17a08?w=600"
    ],
    sizes: [
      { size: "10ml", price: 45.00 },
      { size: "20ml", price: 75.00 },
      { size: "30ml", price: 95.00 }
    ],
    benefits: [
      "Relaxation naturelle",
      "Amélioration du sommeil", 
      "Réduction du stress",
      "Soutien du bien-être général"
    ],
    certifications: [
      "Agriculture biologique",
      "Test laboratoire",
      "THC < 0.2%",
      "Sans OGM"
    ],
    farm: "Green Valley Farm",
    origin: "Suisse",
    extraction: "CO2 supercritique",
    bottle: "Verre ambré UV"
  };

  useEffect(() => {
    if (product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0].size);
    }
  }, [product.sizes, selectedSize]);

  const getCurrentPrice = () => {
    if (selectedSize) {
      const sizeOption = product.sizes.find(s => s.size === selectedSize);
      return sizeOption ? sizeOption.price : product.price;
    }
    return product.price;
  };

  const handleAddToCart = () => {
    console.log('Ajout au panier:', {
      productId: product.id,
      quantity,
      size: selectedSize,
      price: getCurrentPrice()
    });
    alert(`${product.name} (${selectedSize}) ajouté au panier !`);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papiers !');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header avec retour */}
        <div className="flex items-center mb-8">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Retour aux produits</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images du produit */}
          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-lg overflow-hidden border border-gray-700">
              <img 
                src={product.images[activeImageIndex]} 
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      activeImageIndex === index 
                        ? 'border-green-400' 
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            {/* En-tête produit */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 text-sm font-medium">{product.category}</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-2 rounded-lg transition-colors ${
                      isFavorite ? 'text-red-400 bg-red-400/10' : 'text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={shareProduct}
                    className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`} 
                    />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">
                    {product.rating} ({product.reviewCount} avis)
                  </span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{product.description}</p>
            </div>

            {/* Cannabinoïdes */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <Leaf className="h-5 w-5 mr-2 text-green-400" />
                Profil cannabinoïde
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{product.cbd}%</div>
                  <div className="text-sm text-gray-400">CBD</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{product.thc}%</div>
                  <div className="text-sm text-gray-400">THC</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">{product.cbg}%</div>
                  <div className="text-sm text-gray-400">CBG</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">{product.cbn}%</div>
                  <div className="text-sm text-gray-400">CBN</div>
                </div>
              </div>
            </div>

            {/* Prix et options */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl font-bold text-green-400">{getCurrentPrice()}€</span>
                {product.originalPrice > getCurrentPrice() && (
                  <span className="text-lg text-gray-500 line-through">{product.originalPrice}€</span>
                )}
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                  -{Math.round((1 - getCurrentPrice() / product.originalPrice) * 100)}%
                </span>
              </div>

              {/* Sélection de taille */}
              {product.sizes.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Taille</label>
                  <div className="flex space-x-2">
                    {product.sizes.map((sizeOption) => (
                      <button
                        key={sizeOption.size}
                        onClick={() => setSelectedSize(sizeOption.size)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          selectedSize === sizeOption.size
                            ? 'border-green-400 bg-green-400/10 text-green-400'
                            : 'border-gray-600 hover:border-gray-500'
                        }`}
                      >
                        {sizeOption.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantité */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantité</label>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-gray-400">Stock: {product.stock}</span>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="space-y-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Ajouter au panier - {(getCurrentPrice() * quantity).toFixed(2)}€</span>
                </button>
                
                <button className="w-full border border-green-600 text-green-400 hover:bg-green-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Acheter maintenant
                </button>
              </div>
            </div>

            {/* Informations de livraison */}
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-400" />
                <div>
                  <div className="font-medium">Livraison gratuite</div>
                  <div className="text-sm text-gray-400">Dès 50€ d'achat • Livraison en 24-48h</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sections détaillées */}
        <div className="mt-16 space-y-12">
          {/* Description détaillée */}
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3 text-green-400" />
              Description détaillée
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg">{product.longDescription}</p>
          </div>

          {/* Informations techniques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Bienfaits */}
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-green-400">Bienfaits</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-green-400">Certifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Informations de production */}
          <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-6 text-green-400">Informations de production</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="font-medium text-gray-300">Ferme</div>
                <div className="text-green-400">{product.farm}</div>
              </div>
              <div>
                <div className="font-medium text-gray-300">Origine</div>
                <div className="text-green-400">{product.origin}</div>
              </div>
              <div>
                <div className="font-medium text-gray-300">Extraction</div>
                <div className="text-green-400">{product.extraction}</div>
              </div>
              <div>
                <div className="font-medium text-gray-300">Conditionnement</div>
                <div className="text-green-400">{product.bottle}</div>
              </div>
            </div>
          </div>

          {/* Avertissement légal */}
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-amber-300 mb-2">Avertissement légal</h4>
                <p className="text-sm text-amber-200">
                  Ce produit contient moins de 0,2% de THC conformément à la législation française. 
                  Réservé aux adultes. Ne pas conduire après utilisation. Tenir hors de portée des enfants.
                  Les déclarations n'ont pas été évaluées par l'ANSM et ne sont pas destinées à diagnostiquer, 
                  traiter, guérir ou prévenir une maladie.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;