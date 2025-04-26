import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  socialMedia, type SocialMedia, type InsertSocialMedia,
  deliveryInfo, type DeliveryInfo, type InsertDeliveryInfo,
  contactInfo, type ContactInfo, type InsertContactInfo,
  siteSettings, type SiteSettings, type InsertSiteSettings
} from "@shared/schema";
import session from "express-session";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  sessionStore: session.Store;

  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  createUser(user: InsertUser): Promise<User>;
  deleteUser(id: number): Promise<User | undefined>;
  
  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<Product | undefined>;
  
  // Social Media methods
  getAllSocialMedia(): Promise<SocialMedia[]>;
  getSocialMedia(id: number): Promise<SocialMedia | undefined>;
  createSocialMedia(socialMedia: InsertSocialMedia): Promise<SocialMedia>;
  updateSocialMedia(id: number, socialMedia: InsertSocialMedia): Promise<SocialMedia | undefined>;
  deleteSocialMedia(id: number): Promise<SocialMedia | undefined>;
  
  // Delivery Info methods
  getAllDeliveryInfo(): Promise<DeliveryInfo[]>;
  getDeliveryInfo(id: number): Promise<DeliveryInfo | undefined>;
  createDeliveryInfo(deliveryInfo: InsertDeliveryInfo): Promise<DeliveryInfo>;
  updateDeliveryInfo(id: number, deliveryInfo: InsertDeliveryInfo): Promise<DeliveryInfo | undefined>;
  deleteDeliveryInfo(id: number): Promise<DeliveryInfo | undefined>;
  
  // Contact Info methods
  getAllContactInfo(): Promise<ContactInfo[]>;
  getContactInfo(id: number): Promise<ContactInfo | undefined>;
  createContactInfo(contactInfo: InsertContactInfo): Promise<ContactInfo>;
  updateContactInfo(id: number, contactInfo: InsertContactInfo): Promise<ContactInfo | undefined>;
  deleteContactInfo(id: number): Promise<ContactInfo | undefined>;
  
  // Site Settings methods
  getSiteSettings(): Promise<SiteSettings | undefined>;
  updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings>;
}

// Import memorystore for session storage
import createMemoryStore from 'memorystore';
const MemoryStore = createMemoryStore(session);

export class MemStorage implements IStorage {
  sessionStore: session.Store;
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private socialMedia: Map<number, SocialMedia>;
  private deliveryInfo: Map<number, DeliveryInfo>;
  private contactInfo: Map<number, ContactInfo>;
  private siteSettings: SiteSettings | undefined;
  currentUserId: number;
  currentProductId: number;
  currentSocialMediaId: number;
  currentDeliveryInfoId: number;
  currentContactInfoId: number;

  constructor() {
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    this.users = new Map();
    this.products = new Map();
    this.socialMedia = new Map();
    this.deliveryInfo = new Map();
    this.contactInfo = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentSocialMediaId = 1;
    this.currentDeliveryInfoId = 1;
    this.currentContactInfoId = 1;
    
    // Initialiser les paramètres du site par défaut
    this.initDefaultSiteSettings();
    
    // Ajouter des produits de démonstration
    this.initDemoProducts();
    
    // Ajouter des réseaux sociaux par défaut
    this.initDefaultSocialMedia();
    
    // Ajouter des informations de livraison par défaut
    this.initDefaultDeliveryInfo();
    
    // Ajouter des informations de contact par défaut
    this.initContactInfoDefaults();
  }
  
  // Initialize default contact information
  // Cette méthode initialise les informations de contact par défaut
  private initContactInfoDefaults() {
    const defaultContact = {
      email: "contact@broly69.com",
      phone: "+33 1 23 45 67 89",
      address: "69 Rue du Commerce, 75015 Paris",
      hours: "Lun-Sam: 10h-20h, Dim: 12h-18h",
      isActive: true
    };
    
    this.createContactInfo(defaultContact);
  }
  
  // Initialize default site settings
  private initDefaultSiteSettings() {
    this.siteSettings = {
      id: 1,
      logoUrl: null,
      logoSize: 'medium',
      siteName: 'Broly69',
      categoryFontSize: 'medium',
      backgroundTheme: 'default',
      // Ajout des nouveaux champs de thème
      primaryColor: '#6f760a',
      secondaryColor: '#f5ec00',
      accentColor: '#fefb41',
      textStyle: 'normal',
      titleEffect: 'none',
      animationSpeed: 100,
      darkMode: true
    };
  }
  
  private initDemoProducts() {
    const demoProducts = [
      {
        name: "Batmobile Miniature",
        category: "Véhicules",
        price: "159.99",
        description: "Modèle réduit de la Batmobile utilisée par Batman pour combattre le crime à Gotham. Fabriqué à partir de matériaux de haute qualité.",
        farm: "Wayne Enterprises",
        media: null
      },
      {
        name: "Batarang Pro",
        category: "Armes",
        price: "49.99",
        description: "Réplique fonctionnelle du célèbre batarang utilisé par le Chevalier Noir. Design ergonomique et équilibré pour une précision maximale.",
        farm: "Wayne Enterprises",
        media: null
      },
      {
        name: "Masque du Joker",
        category: "Accessoires",
        price: "79.99",
        description: "Réplique du masque utilisé par le Joker lors du braquage de la banque de Gotham. Édition limitée, pièce de collection.",
        farm: "Ace Chemicals",
        media: null
      },
      {
        name: "Venin de Bane",
        category: "Gadgets",
        price: "199.99",
        description: "Formule améliorée du sérum qui a donné à Bane sa force surhumaine. À utiliser avec précaution, effets secondaires possibles.",
        farm: "Ace Chemicals",
        media: null
      },
      {
        name: "Cape de Batman",
        category: "Armure",
        price: "299.99",
        description: "Réplique de la cape utilisée par Batman, fabriquée en matériau composite avancé. Résistante aux déchirures et semi-rigide en vol.",
        farm: "Wayne Enterprises",
        media: null
      },
      {
        name: "Antidote Poison Ivy",
        category: "Gadgets",
        price: "129.99",
        description: "Antidote développé par Lucius Fox contre les toxines de Poison Ivy. Efficace contre la plupart des poisons botaniques.",
        farm: "Queen Industries",
        media: null
      },
      {
        name: "Kryptonite Synthétique",
        category: "Armes",
        price: "999.99",
        description: "Échantillon de kryptonite synthétique développé par LexCorp. Émet une radiation similaire à la kryptonite véritable.",
        farm: "LexCorp",
        media: null
      },
      {
        name: "Lex-Armor Mark III",
        category: "Armure",
        price: "599.99",
        description: "Armure de combat avancée conçue par Lex Luthor pour affronter Superman. Augmente significativement la force et la résistance.",
        farm: "LexCorp",
        media: null
      }
    ];
    
    demoProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async deleteUser(id: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
    }
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    // Ensure all fields are properly typed
    const product: Product = { 
      id,
      name: insertProduct.name,
      category: insertProduct.category,
      price: insertProduct.price,
      description: insertProduct.description,
      media: insertProduct.media ?? null,
      farm: insertProduct.farm ?? null,
      externalLink: insertProduct.externalLink ?? null,
      prices: insertProduct.prices
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, insertProduct: InsertProduct): Promise<Product | undefined> {
    if (!this.products.has(id)) {
      return undefined;
    }
    // Ensure all fields are properly typed
    const product: Product = { 
      id,
      name: insertProduct.name,
      category: insertProduct.category,
      price: insertProduct.price,
      description: insertProduct.description,
      media: insertProduct.media ?? null,
      farm: insertProduct.farm ?? null,
      externalLink: insertProduct.externalLink ?? null,
      prices: insertProduct.prices
    };
    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: number): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (product) {
      this.products.delete(id);
    }
    return product;
  }
  
  // Initialize default social media accounts
  private initDefaultSocialMedia() {
    const defaultSocialMedia = [
      {
        platform: "Twitter",
        url: "https://twitter.com/gotham",
        icon: "FaTwitter",
        displayOrder: 1,
        isActive: true,
        customName: null
      },
      {
        platform: "Instagram",
        url: "https://instagram.com/gotham",
        icon: "FaInstagram",
        displayOrder: 2,
        isActive: true,
        customName: null
      },
      {
        platform: "Facebook",
        url: "https://facebook.com/gotham",
        icon: "FaFacebook",
        displayOrder: 3,
        isActive: true,
        customName: null
      },
      {
        platform: "YouTube",
        url: "https://youtube.com/gotham",
        icon: "FaYoutube",
        displayOrder: 4,
        isActive: true,
        customName: null
      },
      {
        platform: "GitHub",
        url: "https://github.com/gotham",
        icon: "FaGithub",
        displayOrder: 5,
        isActive: true,
        customName: null
      },
      {
        platform: "Snapchat",
        url: "https://snapchat.com/add/gotham",
        icon: "FaSnapchat",
        displayOrder: 6,
        isActive: true,
        customName: null
      }
    ];
    
    defaultSocialMedia.forEach(sm => {
      this.createSocialMedia(sm);
    });
  }
  
  // Social Media methods
  async getAllSocialMedia(): Promise<SocialMedia[]> {
    return Array.from(this.socialMedia.values())
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }
  
  async getSocialMedia(id: number): Promise<SocialMedia | undefined> {
    return this.socialMedia.get(id);
  }
  
  async createSocialMedia(insertSocialMedia: InsertSocialMedia): Promise<SocialMedia> {
    const id = this.currentSocialMediaId++;
    const socialMediaItem: SocialMedia = { 
      id,
      platform: insertSocialMedia.platform,
      url: insertSocialMedia.url,
      icon: insertSocialMedia.icon,
      isActive: insertSocialMedia.isActive ?? true,
      displayOrder: insertSocialMedia.displayOrder ?? 999,
      customName: insertSocialMedia.customName ?? null
    };
    this.socialMedia.set(id, socialMediaItem);
    return socialMediaItem;
  }
  
  async updateSocialMedia(id: number, insertSocialMedia: InsertSocialMedia): Promise<SocialMedia | undefined> {
    if (!this.socialMedia.has(id)) {
      return undefined;
    }
    
    const socialMediaItem: SocialMedia = { 
      id,
      platform: insertSocialMedia.platform,
      url: insertSocialMedia.url,
      icon: insertSocialMedia.icon,
      isActive: insertSocialMedia.isActive ?? true,
      displayOrder: insertSocialMedia.displayOrder ?? 999,
      customName: insertSocialMedia.customName ?? null
    };
    this.socialMedia.set(id, socialMediaItem);
    return socialMediaItem;
  }
  
  async deleteSocialMedia(id: number): Promise<SocialMedia | undefined> {
    const socialMedia = this.socialMedia.get(id);
    if (socialMedia) {
      this.socialMedia.delete(id);
    }
    return socialMedia;
  }
  
  // Initialize default delivery info
  private initDefaultDeliveryInfo() {
    const defaultDeliveryInfo = [
      {
        title: 'Livraisons',
        description: 'Livraison disponible 7j/7 sur Paris et banlieue. Commandez avant 20h pour une livraison le jour même.',
        type: 'delivery',
        isActive: true
      },
      {
        title: 'Meetup',
        description: 'Rencontres possibles sur rendez-vous uniquement. Zones sécurisées à Paris et banlieue proche.',
        type: 'meetup',
        isActive: true
      },
      {
        title: 'Horaires',
        description: 'Disponible de 10h à 23h du lundi au dimanche. Commandes de nuit possibles avec supplément.',
        type: 'hours',
        isActive: true
      },
      {
        title: 'Informations',
        description: 'Contactez-nous pour toute demande particulière. Livraisons hors zone sur devis.',
        type: 'notice',
        isActive: true
      }
    ];
    
    defaultDeliveryInfo.forEach(item => {
      this.createDeliveryInfo(item);
    });
  }
  
  // Delivery Info methods
  async getAllDeliveryInfo(): Promise<DeliveryInfo[]> {
    return Array.from(this.deliveryInfo.values());
  }
  
  async getDeliveryInfo(id: number): Promise<DeliveryInfo | undefined> {
    return this.deliveryInfo.get(id);
  }
  
  async createDeliveryInfo(insertDeliveryInfo: InsertDeliveryInfo): Promise<DeliveryInfo> {
    const id = this.currentDeliveryInfoId++;
    const deliveryInfoItem: DeliveryInfo = { 
      ...insertDeliveryInfo, 
      id,
      isActive: insertDeliveryInfo.isActive ?? true
    };
    this.deliveryInfo.set(id, deliveryInfoItem);
    return deliveryInfoItem;
  }
  
  async updateDeliveryInfo(id: number, insertDeliveryInfo: InsertDeliveryInfo): Promise<DeliveryInfo | undefined> {
    if (!this.deliveryInfo.has(id)) {
      return undefined;
    }
    
    const deliveryInfoItem: DeliveryInfo = { 
      ...insertDeliveryInfo, 
      id,
      isActive: insertDeliveryInfo.isActive ?? true
    };
    this.deliveryInfo.set(id, deliveryInfoItem);
    return deliveryInfoItem;
  }
  
  async deleteDeliveryInfo(id: number): Promise<DeliveryInfo | undefined> {
    const deliveryInfo = this.deliveryInfo.get(id);
    if (deliveryInfo) {
      this.deliveryInfo.delete(id);
    }
    return deliveryInfo;
  }
  
  // Contact Info methods
  async getAllContactInfo(): Promise<ContactInfo[]> {
    return Array.from(this.contactInfo.values());
  }
  
  async getContactInfo(id: number): Promise<ContactInfo | undefined> {
    return this.contactInfo.get(id);
  }
  
  async createContactInfo(insertContactInfo: InsertContactInfo): Promise<ContactInfo> {
    const id = this.currentContactInfoId++;
    const contactInfoItem: ContactInfo = { 
      ...insertContactInfo, 
      id,
      isActive: insertContactInfo.isActive ?? true
    };
    this.contactInfo.set(id, contactInfoItem);
    return contactInfoItem;
  }
  
  async updateContactInfo(id: number, insertContactInfo: InsertContactInfo): Promise<ContactInfo | undefined> {
    if (!this.contactInfo.has(id)) {
      return undefined;
    }
    
    const contactInfoItem: ContactInfo = { 
      ...insertContactInfo, 
      id,
      isActive: insertContactInfo.isActive ?? true
    };
    this.contactInfo.set(id, contactInfoItem);
    return contactInfoItem;
  }
  
  async deleteContactInfo(id: number): Promise<ContactInfo | undefined> {
    const contactInfo = this.contactInfo.get(id);
    if (contactInfo) {
      this.contactInfo.delete(id);
    }
    return contactInfo;
  }
  
  // Site Settings methods
  async getSiteSettings(): Promise<SiteSettings | undefined> {
    return this.siteSettings;
  }
  
  async updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings> {
    if (!this.siteSettings) {
      this.siteSettings = {
        id: 1,
        logoUrl: settings.logoUrl ?? null,
        logoSize: settings.logoSize ?? 'medium',
        siteName: settings.siteName ?? 'Broly69',
        categoryFontSize: settings.categoryFontSize ?? 'medium',
        backgroundTheme: settings.backgroundTheme ?? 'default',
        // Ajout des nouveaux paramètres de thème
        primaryColor: settings.primaryColor ?? '#3b82f6',
        secondaryColor: settings.secondaryColor ?? '#1e40af',
        accentColor: settings.accentColor ?? '#06b6d4',
        textStyle: settings.textStyle ?? 'normal',
        titleEffect: settings.titleEffect ?? 'none',
        animationSpeed: settings.animationSpeed ?? 100,
        darkMode: settings.darkMode ?? true
      };
    } else {
      this.siteSettings = {
        ...this.siteSettings,
        logoUrl: settings.logoUrl ?? this.siteSettings.logoUrl,
        logoSize: settings.logoSize ?? this.siteSettings.logoSize,
        siteName: settings.siteName ?? this.siteSettings.siteName,
        categoryFontSize: settings.categoryFontSize ?? this.siteSettings.categoryFontSize,
        backgroundTheme: settings.backgroundTheme ?? this.siteSettings.backgroundTheme,
        // Mise à jour des nouveaux paramètres de thème
        primaryColor: settings.primaryColor ?? this.siteSettings.primaryColor ?? '#3b82f6',
        secondaryColor: settings.secondaryColor ?? this.siteSettings.secondaryColor ?? '#1e40af',
        accentColor: settings.accentColor ?? this.siteSettings.accentColor ?? '#06b6d4',
        textStyle: settings.textStyle ?? this.siteSettings.textStyle ?? 'normal',
        titleEffect: settings.titleEffect ?? this.siteSettings.titleEffect ?? 'none',
        animationSpeed: settings.animationSpeed ?? this.siteSettings.animationSpeed ?? 100,
        darkMode: settings.darkMode ?? this.siteSettings.darkMode ?? true
      };
    }
    
    console.log('Settings updated:', this.siteSettings);
    return this.siteSettings;
  }
}

// Import the DatabaseStorage class
import { DatabaseStorage } from './database-storage';

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();
