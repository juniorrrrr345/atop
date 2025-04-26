// Price variant type
export interface ProductPrice {
  id?: number;
  size: string;
  price: string;
  productId?: number;
}

// Product type interface
export interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  description: string;
  media: string | null;
  farm: string;
  externalLink?: string;
  buttonText?: string;
  prices?: ProductPrice[];
}

// Form data type
export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  media: File | null;
  farm: string;
  externalLink?: string;
  buttonText?: string;
  prices?: ProductPrice[];
}

// Social media type
export interface SocialMedia {
  id: number;
  platform: string;
  url: string;
  icon: string;
  displayOrder: number;
  isActive: boolean;
  customName?: string; // Nom personnalisé pour affichage
  customLogo?: string; // Logo personnalisé pour éviter les doublons
}

export interface ThemeSettings {
  logoSize: 'small' | 'medium' | 'large';
  categoryFontSize: 'small' | 'medium' | 'large';
  backgroundTheme: 'default' | 'blue' | 'green' | 'purple' | 'red';
  siteName: string;
}
