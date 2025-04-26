import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { ThemeSettings } from '@/lib/types';

// Default theme settings
const DEFAULT_THEME: ThemeSettings = {
  logoSize: 'medium',
  categoryFontSize: 'medium',
  backgroundTheme: 'default',
  siteName: 'Broly69'
};

// Context for theme settings
type ThemeContextType = {
  theme: ThemeSettings;
  updateTheme: (newSettings: Partial<ThemeSettings>) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeSettings>(DEFAULT_THEME);
  
  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem('broly69_theme_settings');
    if (storedTheme) {
      try {
        const parsedTheme = JSON.parse(storedTheme);
        setTheme(parsedTheme);
      } catch (error) {
        console.error('Failed to parse theme settings:', error);
      }
    }
    
    // Listen for theme changes from other components
    const handleThemeChange = (event: CustomEvent<ThemeSettings>) => {
      setTheme(event.detail);
    };
    
    window.addEventListener('themeSettingsChanged', handleThemeChange as EventListener);
    
    return () => {
      window.removeEventListener('themeSettingsChanged', handleThemeChange as EventListener);
    };
  }, []);
  
  // Update theme settings
  const updateTheme = (newSettings: Partial<ThemeSettings>) => {
    const updatedTheme = { ...theme, ...newSettings };
    setTheme(updatedTheme);
    localStorage.setItem('broly69_theme_settings', JSON.stringify(updatedTheme));
    
    // Dispatch event for other components
    window.dispatchEvent(
      new CustomEvent('themeSettingsChanged', { detail: updatedTheme })
    );
  };
  
  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      <div className={getBackgroundClass(theme.backgroundTheme)}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// Hook to use theme settings
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Helper functions for applying theme settings
export function getLogoSizeClass(size: string): string {
  switch (size) {
    case 'small': return 'h-16 w-16';
    case 'large': return 'h-36 w-36';
    case 'medium':
    default: return 'h-24 w-24';
  }
}

export function getLogoTextSizeClass(size: string): string {
  switch (size) {
    case 'small': return 'text-xl';
    case 'large': return 'text-5xl';
    case 'medium':
    default: return 'text-3xl';
  }
}

export function getCategoryTextSizeClass(size: string): string {
  switch (size) {
    case 'small': return 'text-xs';
    case 'large': return 'text-base';
    case 'medium':
    default: return 'text-sm';
  }
}

export function getBackgroundClass(theme: string): string {
  switch (theme) {
    case 'blue': return 'bg-gradient-to-br from-blue-900/40 to-black';
    case 'green': return 'bg-gradient-to-br from-green-900/40 to-black';
    case 'purple': return 'bg-gradient-to-br from-purple-900/40 to-black';
    case 'red': return 'bg-gradient-to-br from-red-900/40 to-black';
    case 'default':
    default: return 'bg-black';
  }
}