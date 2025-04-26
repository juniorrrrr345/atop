import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useThemeStore } from '@/lib/themeStore';
import axios from 'axios';

export default function Logo({ 
  size = 'default', 
  isAdmin = false 
}: { 
  size?: 'small' | 'default' | 'large';
  isAdmin?: boolean;
}) {
  // On utilise uniquement le themeStore pour éviter les conflits avec ThemeProvider
  // const { theme } = useTheme();
  const { primaryColor, siteName } = useThemeStore();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fontSize = {
    small: 'text-2xl',
    default: 'text-4xl',
    large: 'text-5xl',
  }[size];
  
  // Récupérer le logo depuis les paramètres du site avec gestion d'erreur améliorée
  useEffect(() => {
    const fetchSiteSettings = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/site-settings');
        if (response.data && response.data.logoUrl) {
          setLogoUrl(response.data.logoUrl);
        }
      } catch (error) {
        console.error('Erreur lors du chargement du logo:', error);
        // En cas d'erreur, on continue avec le logo texte par défaut
        setLogoUrl(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSiteSettings();
  }, []);

  return (
    <Link href="/">
      <div className="logo-container flex flex-col items-center cursor-pointer hover:opacity-90 transition-opacity">
        {isLoading ? (
          // État de chargement
          <div className={`animate-pulse bg-gray-800 rounded-md ${size === 'small' ? 'h-8 w-20' : size === 'large' ? 'h-14 w-32' : 'h-10 w-24'} mb-2`}></div>
        ) : logoUrl ? (
          // Logo image si disponible
          <img 
            src={logoUrl} 
            alt="Logo" 
            className={`h-auto ${size === 'small' ? 'w-12' : size === 'large' ? 'w-24' : 'w-16'} mb-2`}
            onError={() => setLogoUrl(null)} // Si erreur chargement image, retour au texte
          />
        ) : (
          // Logo texte par défaut avec nom du site dynamique
          <h1 className={`font-bold ${fontSize} flex items-center justify-center`}>
            {siteName ? (
              <>
                {/* Séparer le nom en deux parties si des chiffres sont présents */}
                {/\d/.test(siteName) ? (
                  <>
                    <span style={{ color: primaryColor }}>{siteName.split(/\d/)[0]}</span>
                    <span className="text-white">{siteName.substring(siteName.search(/\d/))}</span>
                  </>
                ) : (
                  <span style={{ color: primaryColor }}>{siteName}</span>
                )}
              </>
            ) : (
              <>
                <span style={{ color: primaryColor }}>BROLY</span>
                <span className="text-white">69</span>
              </>
            )}
          </h1>
        )}
        
        {/* Afficher "ADMIN PANEL v2.0" uniquement sur les pages admin */}
        {isAdmin && (
          <p className="text-[#04d361] text-sm font-mono tracking-wider">
            ADMIN PANEL v2.0 <span className="inline-block h-2 w-2 bg-[#04d361] rounded-full ml-1"></span>
          </p>
        )}
      </div>
    </Link>
  );
}