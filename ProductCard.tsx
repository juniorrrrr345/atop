import { Product } from '@/lib/types';
import { FaPlayCircle, FaImage, FaTag } from 'react-icons/fa';
import { StyledButton } from '@/components/StyledButton';
import AnimatedTitle from '@/components/AnimatedTitle';
import { useThemeStore } from '@/lib/themeStore';
import SiteTitle from '@/components/SiteTitle';
import VideoMedia from '@/components/VideoMedia';
import ImageMedia from '@/components/ImageMedia';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  // Get theme settings
  const { 
    buttonStyle,
    productTitleEffect,
    primaryColor, 
    secondaryColor 
  } = useThemeStore();
  
  // Helper to determine if media is video or image
  const isVideo = product.media?.toLowerCase().endsWith('.mp4') || 
                  product.media?.toLowerCase().endsWith('.mov');

  // Fonction pour obtenir le prix le plus bas parmi les variantes
  const getLowestPrice = (): string => {
    if (!product.prices || product.prices.length === 0) {
      return product.price;
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
    
    if (priceNumbers.length === 0) return product.price;
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

  return (
    <div 
      className="bg-card/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl border border-gray-800 hover:border-[#2196F3]/40 transition-all duration-300 group cursor-pointer flex flex-col"
      style={{ boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)' }}
      onClick={onClick}
    >
      <div className="relative h-52 overflow-hidden transform transition-all group-hover:scale-105 duration-500">
        {product.media ? (
          isVideo ? (
            // Afficher directement la vidéo au lieu d'utiliser le composant VideoMedia
            <div className="relative w-full h-full">
              <video 
                className="w-full h-full object-cover"
                src={product.media}
                preload="metadata"
                muted
                playsInline
                controls={false}
                poster={`${product.media}#t=0.5`} // Force la génération d'une miniature directement
              />
              {/* Badge vidéo */}
              <div className="absolute top-2 left-2 bg-blue-600/70 text-white px-1.5 py-0.5 rounded text-xs font-medium z-10 flex items-center">
                <svg className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
                Vidéo
              </div>
              {/* Icône de lecture */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full">
                  <FaPlayCircle className="text-white text-2xl" />
                </div>
              </div>
            </div>
          ) : (
            // Afficher directement l'image au lieu d'utiliser le composant ImageMedia
            <div className="relative w-full h-full">
              <img 
                src={product.media} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Badge image */}
              <div className="absolute top-2 left-2 bg-blue-600/70 text-white px-1.5 py-0.5 rounded text-xs font-medium z-10 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Image
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full bg-gray-800/60 backdrop-blur-sm text-blue-500 border border-gray-700 border-dashed">
            <FaImage className="text-4xl mb-2" />
            <p className="text-sm text-gray-400">Aucune image</p>
            {/* Utiliser le composant SiteTitle pour afficher le nom du site */}
            <div className="mt-2">
              <SiteTitle textSize="md" variant="normal" />
            </div>
          </div>
        )}
        
        {/* Farm Badge seulement, le Category Badge est déjà ajouté dans les composants des médias */}
        <div className="absolute top-2 right-2 bg-[#2196F3]/80 text-white text-xs px-2 py-1 rounded-md uppercase">
          {product.farm || 'Unknown'}
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold text-white mb-1 truncate">
          {productTitleEffect === 'none' ? (
            product.name
          ) : (
            <AnimatedTitle>{product.name}</AnimatedTitle>
          )}
        </h3>
        
        <p className="text-gray-400 text-sm mb-3 line-clamp-2 h-10">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="bg-black/90 border border-blue-900/40 rounded-full px-4 py-1.5 flex items-center gap-1.5">
            {product.prices && product.prices.length > 0 ? (
              <div className="flex flex-col">
                <span className="font-bold text-blue-400 text-xs">À partir de</span>
                <span className="font-bold text-blue-400">{formatPrice(getLowestPrice())}</span>
              </div>
            ) : (
              <span className="font-bold text-blue-400">{formatPrice(product.price)}</span>
            )}
          </div>
          
          <StyledButton
            size="sm"
            buttonStyle={buttonStyle}
            onClick={(e) => {
              e.stopPropagation(); // Éviter la propagation pour ne pas déclencher le onClick du parent
              onClick && onClick();
            }}
          >
            Détails
          </StyledButton>
        </div>
      </div>
    </div>
  );
}
