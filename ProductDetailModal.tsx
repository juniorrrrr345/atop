import { useState, useEffect } from 'react';
import { Product } from '@/lib/types';
import { X, ShoppingCart, ExternalLink, Play } from 'lucide-react';
import { FaPhone, FaEnvelope, FaPlayCircle } from 'react-icons/fa';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  visible: boolean;
}

export default function ProductDetailModal({ product, onClose, visible }: ProductDetailModalProps) {
  const [orderMethod, setOrderMethod] = useState<'phone' | 'email' | null>(null);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  
  // Reset video playback state when modal closes
  useEffect(() => {
    if (!visible) {
      setIsPlayingVideo(false);
    }
  }, [visible]);
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  // Helper to determine if media is video or image
  const isVideo = product?.media?.toLowerCase().endsWith('.mp4') || 
                  product?.media?.toLowerCase().endsWith('.mov');
  
  // Fonction pour obtenir le prix le plus bas parmi les variantes
  const getLowestPrice = (): string => {
    if (!product || !product.prices || product.prices.length === 0) {
      return product?.price || "0";
    }
    
    // Si prix est un nombre simple, l'extraire
    const priceNumbers = [
      ...product.prices.map(p => {
        // Extraire le nombre du prix (au cas où il contient du texte comme "10 le g")
        const match = p.price.toString().match(/^(\d+(?:\.\d+)?)/);
        return match ? parseFloat(match[1]) : NaN;
      })
    ].filter(p => !isNaN(p));
    
    // Si le prix principal contient un nombre, l'ajouter à la liste
    const mainPriceMatch = product.price.toString().match(/^(\d+(?:\.\d+)?)/);
    if (mainPriceMatch) {
      priceNumbers.push(parseFloat(mainPriceMatch[1]));
    }
    
    if (priceNumbers.length === 0) return product?.price || "0";
    return Math.min(...priceNumbers).toString();
  };
  
  // Fonction pour formater correctement le prix
  const formatPrice = (price: string): React.ReactNode => {
    // Pour les formats spéciaux comme "10 le g"
    if (typeof price === 'string' && price.includes(' le ')) {
      const [value, unit] = price.split(' le ');
      return (
        <span className="whitespace-nowrap">
          {value}<span className="text-xs">€ le {unit}</span>
        </span>
      );
    }
    
    // Pour les formats "X les 10g"
    if (typeof price === 'string' && price.includes(' les ')) {
      const [value, unit] = price.split(' les ');
      return (
        <span className="whitespace-nowrap">
          {value}<span className="text-xs">€ les {unit}</span>
        </span>
      );
    }
    
    // Format standard
    return `${price}€`;
  };
  
  // Helper function to get emoji for category
  const getCategoryEmoji = (category: string): string => {
    const emojiMap: Record<string, string> = {
      'Véhicules': '🚗',
      'Armes': '⚔️',
      'Gadgets': '🔧',
      'Armure': '🛡️',
      'Accessoires': '👓',
      'Fresh Frozen': '❄️ 🧊',
      'FROZEN SIFT': '🧊 🧪',
      'JAUNE MOUSSEUX': '💛 🧁',
      'CALIFORNIENNE NL': '🌴 🇳🇱',
      'DRY-SIFT': '🔥 🔥',
      'WEED NL': '🌷 🇳🇱',
      'DRY PREMIUM': '🏆 🏆',
      'CALI USA EXOTIC': '⚡ 🇺🇸',
      'DRYSIFT USA': '🇺🇸',
      'CALI CANADA': '🇨🇦 🇺🇸',
      'L.A MOUSSE': '💛 🇺🇸',
      'EXTRACTION USA': '🇺🇸'
    };
    
    return emojiMap[category] || '📦';
  };
  
  // Helper function to get emoji for farm
  const getFarmEmoji = (farm: string): string => {
    const emojiMap: Record<string, string> = {
      'Wayne Enterprises': '🦇',
      'Ace Chemicals': '⚗️',
      'Queen Industries': '👑',
      'LexCorp': '💼',
      'LVMH Farm': '🌿 🌿',
      'VVS TANGER 2025': '💎 💎',
      'No Farm': '🚫',
      'Top-Shelf': '🚀 🚀',
      'La Squadra Farmz': '🇮🇹',
      'Coffeeshop': '☕ ☕',
      'CaliPlates': '🏆 🇺🇸',
      'Whole Melt': '💦 🇺🇸',
      'Ted Budz Loose': '🏆'
    };
    
    return emojiMap[farm] || '🏭';
  };
  
  if (!product || !visible) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-gray-900 rounded-xl w-full max-w-md overflow-hidden border border-gray-800 shadow-2xl shadow-blue-900/20">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 z-10 bg-black/50 rounded-full p-1 text-gray-400 hover:text-white"
        >
          <X size={16} />
        </button>
        
        {/* Product media - image or video */}
        <div className="w-full aspect-square bg-gray-800 relative">
          {product.media ? (
            isVideo ? (
              isPlayingVideo ? (
                // Vidéo active quand l'utilisateur a cliqué sur play
                <div className="relative w-full h-full">
                  <video 
                    src={product.media} 
                    className="w-full h-full object-contain" 
                    controls
                    autoPlay
                    onError={() => setIsPlayingVideo(false)}
                  />
                </div>
              ) : (
                // Miniature avec bouton play pour éviter les problèmes de performance
                <div 
                  className="w-full h-full flex items-center justify-center bg-gray-900 cursor-pointer"
                  onClick={() => setIsPlayingVideo(true)}
                >
                  <FaPlayCircle className="text-6xl text-blue-400" />
                  <div className="absolute bottom-0 right-0 bg-black/60 text-white p-1 rounded-tl-md text-xs">
                    Vidéo disponible
                  </div>
                </div>
              )
            ) : (
              // Image standard
              <img 
                src={product.media} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            )
          ) : (
            // Pas de média
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
              <span className="text-4xl opacity-20 font-bold">BROLY69</span>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full">
              {product.category} {getCategoryEmoji(product.category)}
            </div>
          </div>
          
          {/* Farm badge */}
          {product.farm && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-black/80 text-white text-xs px-2 py-1 rounded-full">
                {product.farm} {getFarmEmoji(product.farm)}
              </div>
            </div>
          )}
        </div>
        
        {/* Product details */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-white mb-1">{product.name}</h2>
          <div className="flex justify-between items-center mb-3">
            <div className="px-4 py-2 bg-black/90 border border-blue-900/40 rounded-full text-lg font-bold text-blue-400">
              {product.prices && product.prices.length > 0 ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 uppercase">Prix min</span>
                  <span>{formatPrice(getLowestPrice())}</span>
                </div>
              ) : (
                <span>{formatPrice(product.price)}</span>
              )}
            </div>
          </div>
          
          {/* Styled price variants like in reference */}
          {product.prices && product.prices.length > 0 && (
            <div className="mb-4">
              <div className="text-xs text-gray-400 uppercase mb-2 ml-1">Tarifs spéciaux</div>
              {product.prices.map((priceItem, idx) => (
                <div 
                  key={idx} 
                  className="w-full bg-black/90 rounded-full border border-blue-900/40 py-2 px-4 flex justify-between items-center mb-2"
                >
                  <div className="text-sm text-gray-300">{priceItem.size}</div>
                  <div className="text-blue-400 font-bold">{formatPrice(priceItem.price)}</div>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-gray-300 text-sm mb-4">
            {product.description}
          </p>
          
          {/* External link if available */}
          {product.externalLink && (
            <a 
              href={product.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-400 text-sm mb-4 hover:underline"
            >
              <ExternalLink size={14} /> 
              Plus de détails
            </a>
          )}
          
          {/* Order options */}
          {!orderMethod ? (
            <div>
              <div className="text-center text-white font-medium mb-2">
                Commander ce produit
              </div>
              <div className="flex gap-2">
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
                  onClick={() => setOrderMethod('phone')}
                >
                  <FaPhone /> Téléphone
                </button>
                <button 
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                  onClick={() => setOrderMethod('email')}
                >
                  <FaEnvelope /> Email
                </button>
              </div>
            </div>
          ) : orderMethod === 'phone' ? (
            <div className="bg-blue-900/30 rounded-md p-3 border border-blue-900">
              <div className="text-center text-white font-medium mb-2">
                Commander par téléphone
              </div>
              <p className="text-gray-300 text-sm text-center mb-2">
                Appelez-nous au numéro ci-dessous pour commander ce produit
              </p>
              <div className="text-center text-xl text-white font-bold mb-2">
                +33 7 12 34 56 78
              </div>
              <button 
                className="w-full py-1 text-sm text-gray-400 hover:text-white"
                onClick={() => setOrderMethod(null)}
              >
                Retour
              </button>
            </div>
          ) : (
            <div className="bg-green-900/30 rounded-md p-3 border border-green-900">
              <div className="text-center text-white font-medium mb-2">
                Commander par email
              </div>
              <p className="text-gray-300 text-sm text-center mb-2">
                Envoyez un email à l'adresse ci-dessous pour commander ce produit
              </p>
              <div className="text-center text-lg text-white font-bold mb-2">
                contact@broly69.com
              </div>
              <button 
                className="w-full py-1 text-sm text-gray-400 hover:text-white"
                onClick={() => setOrderMethod(null)}
              >
                Retour
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}