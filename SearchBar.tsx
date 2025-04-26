import React, { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Search, X } from 'lucide-react';
import { useThemeStore } from '@/lib/themeStore';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  onSearch: (query: string) => void;
  className?: string;
}

export default function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    primaryColor,
    accentColor,
    searchBarEnabled,
    searchBarPosition,
    searchBarPlaceholder,
    searchBarStyle,
    searchBarAnimation
  } = useThemeStore();

  // Si la barre de recherche est désactivée, ne pas l'afficher
  if (!searchBarEnabled) return null;

  // Gérer les animations
  const getAnimationClass = () => {
    switch (searchBarAnimation) {
      case 'fade':
        return 'animate-fade-in';
      case 'slide':
        return 'animate-slide-in-from-top';
      default:
        return '';
    }
  };

  // Gérer les styles
  const getSearchBarStyles = () => {
    // Styles de base
    let styles: React.CSSProperties = {
      border: `1px solid ${primaryColor}30`,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      transition: 'all 0.3s ease'
    };

    // Ajouter des styles spécifiques en fonction du style choisi
    if (searchBarStyle === 'rounded') {
      styles = {
        ...styles,
        borderRadius: '9999px',
      };
    } else if (searchBarStyle === 'minimal') {
      styles = {
        ...styles,
        border: 'none',
        borderBottom: `1px solid ${primaryColor}30`,
        backgroundColor: 'transparent',
      };
    }

    // Ajouter des styles quand l'input est focus
    if (isFocused) {
      styles = {
        ...styles,
        boxShadow: `0 0 0 2px ${primaryColor}40`,
        border: `1px solid ${primaryColor}`,
      };

      // Pour le style minimal, ne pas ajouter de border complète même en focus
      if (searchBarStyle === 'minimal') {
        styles = {
          ...styles,
          boxShadow: 'none',
          border: 'none',
          borderBottom: `1px solid ${primaryColor}`,
        };
      }
    }

    return styles;
  };

  // Gérer les classes CSS en fonction de la position
  const getPositionClass = () => {
    if (searchBarPosition === 'floating') {
      return 'fixed bottom-20 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-md rounded-full shadow-lg';
    } else if (searchBarPosition === 'top') {
      return 'w-full max-w-md mx-auto my-2';
    } else {
      return 'w-full max-w-md mx-auto';
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
    onSearch('');
  };

  return (
    <div 
      className={cn(
        'relative group',
        getPositionClass(),
        getAnimationClass(),
        className
      )}
    >
      <div 
        className="relative flex items-center"
        style={getSearchBarStyles()}
      >
        <Search 
          className="absolute left-3 h-4 w-4 text-gray-400" 
          style={{ color: isFocused ? primaryColor : undefined }}
        />
        
        <Input
          ref={inputRef}
          type="text"
          placeholder={searchBarPlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            'pl-10 pr-10 py-6 h-10 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0',
            searchBarStyle === 'rounded' ? 'rounded-full' : '',
            searchBarStyle === 'minimal' ? 'bg-transparent' : ''
          )}
          style={{ 
            color: 'white',
            caretColor: primaryColor
          }}
        />
        
        {query && (
          <button 
            onClick={handleClear}
            className="absolute right-3 p-1 rounded-full hover:bg-gray-800"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}