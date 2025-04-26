import { useEffect, useState } from 'react';
import { useThemeStore } from '@/lib/themeStore';
import axios from 'axios';

interface InitialLoadingProps {
  children: React.ReactNode;
}

/**
 * Composant qui affiche un écran de chargement jusqu'à ce que les paramètres de l'application
 * soient complètement chargés depuis le serveur.
 */
export default function InitialLoading({ children }: InitialLoadingProps) {
  const { setTheme } = useThemeStore();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Charger les paramètres du thème directement ici pour avoir plus de contrôle
    const loadAppData = async () => {
      try {
        // Récupérer les paramètres du site
        const response = await axios.get('/api/site-settings');
        
        if (response.data) {
          // Mettre à jour le store avec les données chargées
          setTheme({
            ...response.data,
            isLoading: false
          });
          
          // Attendre un peu plus longtemps pour s'assurer que tout est rendu
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des paramètres:", error);
        // En cas d'erreur, quand même désactiver le chargement après 1 seconde
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    
    loadAppData();
  }, [setTheme]);
  
  // Afficher un écran de chargement tant que les paramètres ne sont pas chargés
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 font-medium">Chargement...</p>
        </div>
      </div>
    );
  }
  
  // Une fois les paramètres chargés, afficher le contenu de l'application
  return <>{children}</>;
}