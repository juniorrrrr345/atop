import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export default function SimpleDrawer({ isOpen, onClose, title, children }: SimpleDrawerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Empêcher le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsFullscreen(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Gestion des événements tactiles
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!dragging) return;
    setDragging(false);
    
    // Si l'utilisateur a swipé vers le haut suffisamment, agrandir le drawer
    if (startY - currentY > 50) {
      setIsFullscreen(true);
    } 
    // Si l'utilisateur a swipé vers le bas suffisamment, réduire le drawer ou fermer
    else if (currentY - startY > 50) {
      if (isFullscreen) {
        setIsFullscreen(false);
      } else if (currentY - startY > 100) {
        onClose();
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;
  
  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-gray-950 border-t border-gray-800 rounded-t-xl 
          ${isFullscreen ? 'h-[95vh]' : 'max-h-[80vh]'} 
          overflow-hidden flex flex-col animate-slide-up transition-all duration-300`}
      >
        {/* Header avec zone draggable */}
        <div 
          className="p-3 bg-gray-900/80 backdrop-blur-sm rounded-t-[10px] sticky top-0 z-10 flex items-center justify-between cursor-grab"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={toggleFullscreen}
        >
          <div className="flex-1 flex justify-center items-center relative">
            {/* Indicateur de swipe */}
            <div className="w-12 h-1.5 bg-gray-700 rounded-full absolute -top-1" />
            
            {/* Titre */}
            <h2 className="text-base font-semibold text-white">{title}</h2>
            
            {/* Bouton de fermeture */}
            <Button 
              variant="ghost" 
              className="rounded-full p-1.5 h-8 w-8 absolute right-0"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Contenu */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
}