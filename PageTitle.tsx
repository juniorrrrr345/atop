import { useEffect } from 'react';
import { useThemeStore } from '@/lib/themeStore';

interface PageTitleProps {
  suffix?: string;
}

/**
 * Composant qui définit dynamiquement le titre de la page en fonction du nom du site
 * Ce composant ne rend rien visuellement, il met à jour uniquement le titre de l'onglet du navigateur
 */
export default function PageTitle({ suffix }: PageTitleProps) {
  const { siteName, isLoading } = useThemeStore();
  
  useEffect(() => {
    // Ne mettre à jour le titre de la page que lorsque les données sont chargées
    if (!isLoading) {
      // Si le siteName est défini, l'utiliser, sinon un titre générique
      const baseTitle = siteName || 'Mon Site';
      // Si un suffixe est fourni, l'ajouter au titre
      document.title = suffix ? `${baseTitle} | ${suffix}` : baseTitle;
    }
  }, [siteName, suffix, isLoading]);
  
  // Ce composant ne rend rien visuellement
  return null;
}