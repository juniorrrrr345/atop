import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useThemeStore } from '@/lib/themeStore';
import { Heart, ShoppingCart, ExternalLink } from 'lucide-react';
import SimpleDrawer from './SimpleDrawer';
import VideoMedia from '@/components/VideoMedia';
import ImageMedia from '@/components/ImageMedia';

interface ProductDrawerProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDrawer({ product, isOpen, onClose }: ProductDrawerProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { primaryColor, secondaryColor, accentColor } = useThemeStore();
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  
  // Détermine si le média est une vidéo
  const isVideo = product?.media?.toLowerCase().endsWith('.mp4') || 
                  product?.media?.toLowerCase().endsWith('.mov');

  // Réinitialiser l'état lorsqu'un nouveau produit est sélectionné
  useEffect(() => {
    if (product) {
      setIsFavorite(false);
      setSelectedPrice(null);
    }
  }, [product]);

  if (!product) return null;

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <SimpleDrawer 
      isOpen={isOpen} 
      onClose={onClose}
      title={product.name}
    >
      <div className="p-4">
        {product.media ? (
          <div className="mb-4 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center" style={{ height: '220px' }}>
            {isVideo ? (
              // Afficher directement la vidéo
              <div className="relative w-full h-full">
                <video 
                  className="w-full h-full object-cover"
                  src={product.media}
                  preload="metadata"
                  muted
                  playsInline
                  controls={true} // Activer les contrôles dans le drawer pour permettre la lecture directe
                  poster={`${product.media}#t=0.5`} // Force la génération d'une miniature directement
                />
              </div>
            ) : (
              // Afficher directement l'image
              <div className="relative w-full h-full">
                <img 
                  src={product.media} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ) : (
          <div 
            className="mb-4 rounded-xl overflow-hidden flex items-center justify-center border border-gray-800"
            style={{ height: '200px', backgroundColor: `${primaryColor}10` }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <svg className="w-16 h-16 mb-3 opacity-40" style={{ color: primaryColor }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4V5h12v10z" clipRule="evenodd"></path>
                <path d="M8.5 7a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm0 5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"></path>
                <path d="M14 7a1 1 0 100 2 1 1 0 000-2zm-7 8a1 1 0 01-1-1v-1h9v1a1 1 0 01-1 1H7z"></path>
              </svg>
              <span className="text-base opacity-50" style={{ color: primaryColor }}>Image non disponible</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <Badge 
                variant="outline" 
                className="mb-1"
                style={{ borderColor: primaryColor + '40', color: primaryColor }}
              >
                {product.category}
              </Badge>
              <h1 className="text-xl font-bold text-white mb-1">{product.name}</h1>
              {product.farm && (
                <div className="text-xs text-gray-400">
                  Provenance: <span className="text-gray-300">{product.farm}</span>
                </div>
              )}
            </div>
            
            <div className="text-xl font-bold" style={{ color: accentColor }}>
              {product.price}
            </div>
          </div>

          {/* Variantes de prix si disponibles */}
          {product.prices && product.prices.length > 0 && (
            <div className="mt-2">
              <h3 className="text-xs font-medium text-gray-400 mb-1">Options</h3>
              <div className="grid grid-cols-2 gap-1.5">
                {product.prices.map((priceVariant, index) => (
                  <Button
                    key={index}
                    variant={selectedPrice === priceVariant.size ? "default" : "outline"}
                    className="justify-start text-left py-1.5 px-2 h-auto text-xs"
                    style={selectedPrice === priceVariant.size ? 
                      { backgroundColor: primaryColor, color: 'white' } : 
                      { borderColor: primaryColor + '30' }
                    }
                    onClick={() => setSelectedPrice(priceVariant.size)}
                  >
                    <div>
                      <div className="font-medium text-xs">{priceVariant.size}</div>
                      <div className="text-xs">{priceVariant.price}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xs font-medium text-gray-400 mb-1">Description</h3>
            <p className="text-gray-300 text-sm line-clamp-3">{product.description}</p>
          </div>

          {product.externalLink && (
            <a 
              href={product.externalLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm hover:underline"
              style={{ color: primaryColor }}
            >
              <ExternalLink className="h-4 w-4" />
              Plus d'informations
            </a>
          )}
        </div>
      </div>

      {/* Barre de commande personnalisable */}
      <div className="p-3 border-t border-gray-800 bg-black/70 backdrop-blur-sm">
        {/* Récupérer les paramètres du site pour la barre de commande */}
        {useThemeStore.getState().orderBarEnabled !== false && (
          <a 
            href={product.externalLink || useThemeStore.getState().orderBarLink || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full"
          >
            <div 
              className="flex items-center justify-center py-3 px-4 rounded-lg cursor-pointer transition-all hover:opacity-90 active:scale-98"
              style={{ 
                backgroundColor: useThemeStore.getState().orderBarColor || '#ffffff',
                color: useThemeStore.getState().orderBarTextColor || '#000000',
              }}
            >
              <span className="font-semibold">
                {useThemeStore.getState().orderBarText || "Commander maintenant"}
              </span>
            </div>
          </a>
        )}
        
        {/* Bouton d'action principal personnalisable - conservé comme solution de secours */}
        {!useThemeStore.getState().orderBarEnabled && (
          <div className="flex items-center gap-2">
            {product.externalLink ? (
              <a 
                href={product.externalLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button
                  className="w-full rounded-full h-10 text-sm flex items-center justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {product.buttonText || "Voir le produit"}
                </Button>
              </a>
            ) : (
              <Button
                className="flex-1 rounded-full h-10 text-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {product.buttonText || "Ajouter au panier"}
              </Button>
            )}
          </div>
        )}
      </div>
    </SimpleDrawer>
  );
}