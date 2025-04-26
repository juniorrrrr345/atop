import { useEffect } from 'react';
import { useThemeStore } from '@/lib/themeStore';

interface SiteTitleProps {
  className?: string;
  variant?: 'normal' | 'colored';
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export default function SiteTitle({ 
  className = '',
  variant = 'colored',
  textSize = '3xl'
}: SiteTitleProps) {
  const { siteName, isLoading, loadTheme } = useThemeStore();
  
  // Charger le thème uniquement au montage du composant
  useEffect(() => {
    loadTheme();
    // Plus d'intervalle de rafraîchissement automatique
  }, [loadTheme]);
  
  // Ne rien afficher pendant le chargement initial
  if (isLoading) {
    return null;
  }
  
  // Utiliser le nom du site s'il existe, ou une valeur par défaut (mais jamais "GothamAdmin")
  const displayName = siteName && siteName !== '' && siteName !== 'GothamAdmin' 
    ? siteName 
    : 'Mon Site';
  
  // Déterminer si le nom contient Admin pour le diviser
  let firstPart = '';
  let secondPart = '';
  
  if (displayName.includes('Admin')) {
    const parts = displayName.split('Admin');
    firstPart = parts[0];
    secondPart = 'Admin' + (parts[1] || '');
  } else {
    firstPart = displayName;
    secondPart = '';
  }

  const sizes = {
    'sm': 'text-sm',
    'md': 'text-base',
    'lg': 'text-lg',
    'xl': 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };
  
  const sizeClass = sizes[textSize] || 'text-3xl';
  
  return (
    <h1 className={`font-bold tracking-wide ${sizeClass} ${className}`}>
      {variant === 'colored' ? (
        <>
          {secondPart ? (
            <>
              <span className="text-gray-500">{firstPart}</span>
              <span className="text-white">{secondPart}</span>
            </>
          ) : (
            <span className="text-white">{firstPart}</span>
          )}
        </>
      ) : (
        <span className="text-white">{displayName}</span>
      )}
    </h1>
  );
}