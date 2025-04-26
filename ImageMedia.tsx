import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn, X } from 'lucide-react';
import { useThemeStore } from '@/lib/themeStore';

interface ImageMediaProps {
  imageUrl: string;
  productName: string;
  thumbnailStyle?: 'card' | 'drawer';
}

export default function ImageMedia({ imageUrl, productName, thumbnailStyle = 'card' }: ImageMediaProps) {
  const [spoilerActive, setSpoilerActive] = useState(false); // Désactivé par défaut
  const [showFullScreen, setShowFullScreen] = useState(false);
  const { primaryColor } = useThemeStore();

  // Fonction pour désactiver le spoiler
  const handleRevealContent = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêcher le clic de propager au parent
    setSpoilerActive(false);
  };

  // Fonction pour afficher l'image en plein écran
  const handleToggleFullScreen = (e: React.MouseEvent) => {
    if (spoilerActive) return;
    if (e) e.stopPropagation();
    setShowFullScreen(!showFullScreen);
  };

  return (
    <div className="relative w-full h-full">
      {/* Image directement visible */}
      <div 
        className="w-full h-full relative overflow-hidden rounded-lg cursor-pointer"
        onClick={handleToggleFullScreen}
      >
        {/* Image */}
        <img 
          src={imageUrl} 
          alt={productName} 
          className="w-full h-full object-cover rounded-lg"
        />
        
        {/* Badge image en haut à gauche */}
        <div className="absolute top-2 left-2 bg-blue-600/70 text-white px-1.5 py-0.5 rounded text-xs font-medium z-10 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Image
        </div>

        {/* Petit indicateur de zoom en bas à droite */}
        <div className="absolute bottom-2 right-2 bg-blue-500/50 p-1 rounded-full">
          <ZoomIn className="w-3 h-3 text-white" />
        </div>
      </div>

      {/* Image en mode plein écran quand activée */}
      {showFullScreen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Bouton fermer */}
          <button
            onClick={handleToggleFullScreen}
            className="absolute top-4 right-4 z-50 p-1.5 rounded-full bg-black/70 text-white hover:bg-black"
            aria-label="Fermer l'image"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Image en plein écran */}
          <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center">
            <img 
              src={imageUrl} 
              alt={productName} 
              className="max-w-full max-h-full object-contain" 
            />
          </div>
        </motion.div>
      )}
    </div>
  );
}