import { create } from 'zustand';
import axios from 'axios';

// Types pour les options de thème
export interface ThemeOptions {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textStyle: 'normal' | 'bold' | 'italic' | 'light';
  titleEffect: 'none' | 'glow' | 'shadow' | 'gradient';
  animationSpeed: number;
  darkMode: boolean;
  logoUrl: string | null;
  logoSize: 'small' | 'medium' | 'large';
  // Nouveaux paramètres
  siteName: string;
  buttonStyle: 'default' | 'rounded' | 'pill' | 'gradient';
  categoryTextEffect: 'none' | 'glow' | 'shadow' | 'uppercase';
  productTitleEffect: 'none' | 'glow' | 'shadow' | 'gradient';
  // Arrière-plan
  backgroundUrl: string | null;
  backgroundType: 'none' | 'image' | 'video' | 'gif';
  backgroundOverlay: number; // Transparence de l'overlay (0-100)
  // Barre de recherche
  searchBarEnabled: boolean;
  searchBarPosition: 'top' | 'floating';
  searchBarPlaceholder: string;
  searchBarStyle: 'default' | 'rounded' | 'minimal';
  searchBarAnimation: 'none' | 'fade' | 'slide';
  // Textes descriptifs personnalisés pour les pages
  infoPageDescription: string;
  canalPageDescription: string;
  // Barre de commande dans les détails du produit
  orderBarEnabled: boolean;
  orderBarText: string;
  orderBarLink: string;
  orderBarColor: string;
  orderBarTextColor: string;
  // Textes de la page d'accueil
  homeWelcomeTitle: string;
  homeWelcomeText: string;
  homeActionButtonText: string;
}

// État par défaut
const defaultTheme: ThemeOptions = {
  primaryColor: '#3b82f6',
  secondaryColor: '#1e40af',
  accentColor: '#06b6d4',
  textStyle: 'normal',
  titleEffect: 'none',
  animationSpeed: 100,
  darkMode: true,
  logoUrl: null,
  logoSize: 'medium',
  // Valeurs par défaut pour les nouveaux paramètres
  siteName: '', // Valeur vide pour éviter l'affichage de "GothamAdmin" par défaut
  buttonStyle: 'default',
  categoryTextEffect: 'none',
  productTitleEffect: 'none',
  // Valeurs par défaut pour l'arrière-plan
  backgroundUrl: null,
  backgroundType: 'none',
  backgroundOverlay: 50,
  // Valeurs par défaut pour la barre de recherche
  searchBarEnabled: true,
  searchBarPosition: 'top',
  searchBarPlaceholder: 'Rechercher un produit...',
  searchBarStyle: 'default',
  searchBarAnimation: 'none',
  // Textes descriptifs par défaut pour les pages
  infoPageDescription: 'Découvrez notre sélection exclusive de produits premium',
  canalPageDescription: 'Nos différents canaux de communication pour rester connecté',
  // Valeurs par défaut pour la barre de commande
  orderBarEnabled: true,
  orderBarText: 'Commander maintenant',
  orderBarLink: '',
  orderBarColor: '#ffffff',
  orderBarTextColor: '#000000',
  // Textes par défaut pour la page d'accueil
  homeWelcomeTitle: 'Bienvenue',
  homeWelcomeText: 'Explorez notre sélection de produits premium.',
  homeActionButtonText: 'Découvrir nos produits'
};

interface ThemeState extends ThemeOptions {
  isLoading: boolean;
  setTheme: (theme: Partial<ThemeOptions>) => void;
  updateTheme: (theme: Partial<ThemeOptions>) => Promise<void>;
  loadTheme: () => Promise<void>;
}

// Création du store
export const useThemeStore = create<ThemeState>((set, get) => {
  // Fonction pour rafraîchir les données du thème et mettre à jour le cache
  const refreshThemeData = async () => {
    try {
      const response = await axios.get('/api/site-settings');
      if (response.data) {
        // Créer un objet avec toutes les données à stocker
        const dataToStore = {
          primaryColor: response.data.primaryColor || defaultTheme.primaryColor,
          secondaryColor: response.data.secondaryColor || defaultTheme.secondaryColor,
          accentColor: response.data.accentColor || defaultTheme.accentColor,
          textStyle: response.data.textStyle || defaultTheme.textStyle,
          titleEffect: response.data.titleEffect || defaultTheme.titleEffect,
          animationSpeed: response.data.animationSpeed || defaultTheme.animationSpeed,
          darkMode: response.data.darkMode !== undefined ? response.data.darkMode : defaultTheme.darkMode,
          logoUrl: response.data.logoUrl || defaultTheme.logoUrl,
          logoSize: response.data.logoSize || defaultTheme.logoSize,
          // Nouveaux paramètres
          siteName: response.data.siteName || defaultTheme.siteName,
          buttonStyle: response.data.buttonStyle || defaultTheme.buttonStyle,
          categoryTextEffect: response.data.categoryTextEffect || defaultTheme.categoryTextEffect,
          productTitleEffect: response.data.productTitleEffect || defaultTheme.productTitleEffect,
          // Arrière-plan
          backgroundUrl: response.data.backgroundUrl || defaultTheme.backgroundUrl,
          backgroundType: response.data.backgroundType || defaultTheme.backgroundType,
          backgroundOverlay: response.data.backgroundOverlay !== undefined ? 
            response.data.backgroundOverlay : defaultTheme.backgroundOverlay,
          // Barre de recherche
          searchBarEnabled: response.data.searchBarEnabled !== undefined ? 
            response.data.searchBarEnabled : defaultTheme.searchBarEnabled,
          searchBarPosition: response.data.searchBarPosition || defaultTheme.searchBarPosition,
          searchBarPlaceholder: response.data.searchBarPlaceholder || defaultTheme.searchBarPlaceholder,
          searchBarStyle: response.data.searchBarStyle || defaultTheme.searchBarStyle,
          searchBarAnimation: response.data.searchBarAnimation || defaultTheme.searchBarAnimation,
          // Textes descriptifs des pages
          infoPageDescription: response.data.infoPageDescription || defaultTheme.infoPageDescription,
          canalPageDescription: response.data.canalPageDescription || defaultTheme.canalPageDescription,
          // Barre de commande
          orderBarEnabled: response.data.orderBarEnabled !== undefined ? 
            response.data.orderBarEnabled : defaultTheme.orderBarEnabled,
          orderBarText: response.data.orderBarText || defaultTheme.orderBarText,
          orderBarLink: response.data.orderBarLink || defaultTheme.orderBarLink,
          orderBarColor: response.data.orderBarColor || defaultTheme.orderBarColor,
          orderBarTextColor: response.data.orderBarTextColor || defaultTheme.orderBarTextColor,
          // Textes de la page d'accueil
          homeWelcomeTitle: response.data.homeWelcomeTitle || defaultTheme.homeWelcomeTitle,
          homeWelcomeText: response.data.homeWelcomeText || defaultTheme.homeWelcomeText,
          homeActionButtonText: response.data.homeActionButtonText || defaultTheme.homeActionButtonText,
        };
        
        // Mettre à jour le store
        set({
          ...dataToStore,
          isLoading: false
        });
        
        // Mettre à jour le cache
        localStorage.setItem('theme_cache', JSON.stringify(dataToStore));
        localStorage.setItem('theme_cache_timestamp', new Date().getTime().toString());
      }
    } catch (error) {
      console.error('Erreur lors du chargement du thème:', error);
      set({ isLoading: false });
    }
  };

  return {
    ...defaultTheme,
    isLoading: true,

    // Mettre à jour l'état local
    setTheme: (theme) => set({ ...theme }),

    // Charger le thème depuis l'API avec mise en cache
    loadTheme: async () => {
      // Vérifier si nous avons déjà les données en cache et si elles sont récentes
      const cachedData = localStorage.getItem('theme_cache');
      const cacheTimestamp = localStorage.getItem('theme_cache_timestamp');
      const currentTime = new Date().getTime();
      
      // Utiliser le cache si disponible et récent (moins de 5 minutes)
      const CACHE_TTL = 5 * 60 * 1000; // 5 minutes en millisecondes
      
      if (cachedData && cacheTimestamp && (currentTime - parseInt(cacheTimestamp)) < CACHE_TTL) {
        try {
          const parsedData = JSON.parse(cachedData);
          
          // Ne pas montrer l'état de chargement si nous utilisons des données en cache
          // mais mettre quand même à jour l'état avec les données du cache
          set({
            ...parsedData,
            isLoading: false
          });
          
          // Charger les données fraîches en arrière-plan sans bloquer l'interface
          setTimeout(() => refreshThemeData(), 0);
          
          return;
        } catch (e) {
          // En cas d'erreur de parsing, ignorer le cache
          console.warn('Erreur avec les données de cache du thème:', e);
        }
      }
      
      // Si pas de cache valide, charger normalement
      set({ isLoading: true });
      await refreshThemeData();
    },

    // Mettre à jour le thème via l'API et localement
    updateTheme: async (theme) => {
      const currentTheme = get();
      const updatedTheme = { ...currentTheme, ...theme };
      
      try {
        const response = await axios.put('/api/site-settings', updatedTheme);
        if (response.data) {
          const newTheme = {
            primaryColor: response.data.primaryColor || currentTheme.primaryColor,
            secondaryColor: response.data.secondaryColor || currentTheme.secondaryColor,
            accentColor: response.data.accentColor || currentTheme.accentColor,
            textStyle: response.data.textStyle || currentTheme.textStyle,
            titleEffect: response.data.titleEffect || currentTheme.titleEffect, 
            animationSpeed: response.data.animationSpeed || currentTheme.animationSpeed,
            darkMode: response.data.darkMode !== undefined ? response.data.darkMode : currentTheme.darkMode,
            logoUrl: response.data.logoUrl || currentTheme.logoUrl,
            logoSize: response.data.logoSize || currentTheme.logoSize,
            // Nouveaux paramètres
            siteName: response.data.siteName || currentTheme.siteName,
            buttonStyle: response.data.buttonStyle || currentTheme.buttonStyle,
            categoryTextEffect: response.data.categoryTextEffect || currentTheme.categoryTextEffect,
            productTitleEffect: response.data.productTitleEffect || currentTheme.productTitleEffect,
            // Arrière-plan
            backgroundUrl: response.data.backgroundUrl || currentTheme.backgroundUrl,
            backgroundType: response.data.backgroundType || currentTheme.backgroundType,
            backgroundOverlay: response.data.backgroundOverlay !== undefined ? 
              response.data.backgroundOverlay : currentTheme.backgroundOverlay,
            // Barre de recherche
            searchBarEnabled: response.data.searchBarEnabled !== undefined ? 
              response.data.searchBarEnabled : currentTheme.searchBarEnabled,
            searchBarPosition: response.data.searchBarPosition || currentTheme.searchBarPosition,
            searchBarPlaceholder: response.data.searchBarPlaceholder || currentTheme.searchBarPlaceholder,
            searchBarStyle: response.data.searchBarStyle || currentTheme.searchBarStyle,
            searchBarAnimation: response.data.searchBarAnimation || currentTheme.searchBarAnimation,
            // Textes descriptifs des pages
            infoPageDescription: response.data.infoPageDescription || currentTheme.infoPageDescription,
            canalPageDescription: response.data.canalPageDescription || currentTheme.canalPageDescription,
            // Barre de commande
            orderBarEnabled: response.data.orderBarEnabled !== undefined ? 
              response.data.orderBarEnabled : currentTheme.orderBarEnabled,
            orderBarText: response.data.orderBarText || currentTheme.orderBarText,
            orderBarLink: response.data.orderBarLink || currentTheme.orderBarLink,
            orderBarColor: response.data.orderBarColor || currentTheme.orderBarColor,
            orderBarTextColor: response.data.orderBarTextColor || currentTheme.orderBarTextColor,
            // Textes de la page d'accueil
            homeWelcomeTitle: response.data.homeWelcomeTitle || currentTheme.homeWelcomeTitle,
            homeWelcomeText: response.data.homeWelcomeText || currentTheme.homeWelcomeText,
            homeActionButtonText: response.data.homeActionButtonText || currentTheme.homeActionButtonText
          };
          
          set(newTheme);
          
          // Mettre à jour le cache
          localStorage.setItem('theme_cache', JSON.stringify(newTheme));
          localStorage.setItem('theme_cache_timestamp', new Date().getTime().toString());
          
          console.log('Thème mis à jour avec succès:', response.data);
          return response.data;
        }
      } catch (error) {
        console.error('Erreur lors de la mise à jour du thème:', error);
        throw error;
      }
    }
  };
});

// Initialiser le chargement du thème au démarrage de l'application
useThemeStore.getState().loadTheme();