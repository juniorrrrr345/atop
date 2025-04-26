import { useThemeStore } from '@/lib/themeStore';

export function PageBackground() {
  const { backgroundUrl, backgroundType, backgroundOverlay } = useThemeStore();

  if (!backgroundUrl) return null;

  // Calculer l'opacité de l'overlay (0 à 1)
  const overlayOpacity = (100 - (backgroundOverlay || 50)) / 100;

  // Ajouter un effet flou et une opacité à l'élément qui contient l'arrière-plan
  const overlayStyle = {
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`, // Plus l'overlayOpacity est élevé, plus l'arrière-plan est visible
  };

  return (
    <div className="fixed inset-0 -z-10 w-full h-full overflow-hidden">
      {backgroundType === 'image' || backgroundType === 'gif' ? (
        <img 
          src={backgroundUrl} 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : backgroundType === 'video' ? (
        <video 
          src={backgroundUrl} 
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay 
          loop 
          muted 
          playsInline
        />
      ) : null}
      
      {/* Overlay pour améliorer le contraste avec le contenu */}
      <div 
        className="absolute inset-0 w-full h-full bg-black backdrop-blur-sm"
        style={overlayStyle}
      ></div>
    </div>
  );
}