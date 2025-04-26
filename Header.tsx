import { useLocation } from 'wouter';
import { useThemeStore } from '@/lib/themeStore';
import { useEffect } from 'react';
import { useSearchStore } from '@/hooks/useSearchStore';
import TopNav from './TopNav';

interface HeaderProps {
  activeView: 'admin' | 'vitrine';
  onViewToggle?: (view: 'admin' | 'vitrine') => void;
}

export default function Header({ activeView, onViewToggle }: HeaderProps) {
  // Obtenir l'emplacement actuel
  const [location] = useLocation();
  const isHomePage = location === '/';
  
  // Utiliser le store de recherche global
  const { setSearchQuery } = useSearchStore();
  
  // Charger et utiliser le thème
  const { 
    loadTheme,
    searchBarEnabled,
    searchBarPosition
  } = useThemeStore();
  
  // Charger le thème au montage du composant
  useEffect(() => {
    loadTheme();
  }, [loadTheme]);
  
  // Fonction de recherche qui utilise le store global
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Recherche:', query);
  };
  
  // Afficher les valeurs pour le débogage
  console.log('État de recherche:', { 
    searchBarEnabled, 
    searchBarPosition, 
    location, 
    isHomePage,
    activeView,
    showSearchBar: activeView === 'vitrine' && searchBarEnabled
  });
  
  const handleViewChange = (view: 'admin' | 'vitrine') => {
    if (onViewToggle) {
      onViewToggle(view);
    }
  };
  
  return (
    <>
      <header className="mb-2 fixed top-0 left-0 right-0 z-50 bg-black px-4 py-4 border-b border-gray-800/50">
        {/* Utilisation du nouveau composant TopNav pour la navigation supérieure simplifiée */}
        <TopNav activeView={activeView} />
        
        {/* Barre de recherche désactivée */}
      </header>
      
      {/* Barre de recherche désactivée */}
    </>
  );
}
