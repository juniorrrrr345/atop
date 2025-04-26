import { db } from './db';
import { users, products, socialMedia, deliveryInfo, contactInfo, siteSettings } from '@shared/schema';
import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString('hex');
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString('hex')}.${salt}`;
}

async function setupDatabase() {
  console.log('Setting up database with initial data...');

  // Vérifier si des utilisateurs existent déjà
  const existingUsers = await db.select().from(users);
  
  if (existingUsers.length === 0) {
    // Créer un utilisateur admin par défaut
    console.log('Creating default admin user...');
    await db.insert(users).values({
      username: 'admin',
      password: await hashPassword('AdminBroly69')
    });
    console.log('Admin user created');
  } else {
    console.log(`${existingUsers.length} users already exist, skipping user creation`);
  }

  // Vérifier si des paramètres de site existent déjà
  const existingSettings = await db.select().from(siteSettings);
  
  if (existingSettings.length === 0) {
    // Créer les paramètres par défaut
    console.log('Creating default site settings...');
    await db.insert(siteSettings).values({
      id: 1,
      logoUrl: null,
      logoSize: 'medium',
      siteName: 'Broly69',
      categoryFontSize: 'medium',
      backgroundTheme: 'default',
      primaryColor: '#6f760a',
      secondaryColor: '#f5ec00',
      accentColor: '#fefb41',
      textStyle: 'normal',
      titleEffect: 'none',
      animationSpeed: 100,
      darkMode: true,
      buttonStyle: 'default',
      categoryTextEffect: 'none',
      productTitleEffect: 'none',
      backgroundUrl: null,
      backgroundType: 'none',
      backgroundOverlay: 50,
      searchBarEnabled: true,
      searchBarPosition: 'top',
      searchBarPlaceholder: 'Rechercher...',
      searchBarStyle: 'default',
      searchBarAnimation: 'none'
    });
    console.log('Default site settings created');
  } else {
    console.log('Site settings already exist, skipping creation');
  }

  // Vérifier si des produits existent déjà
  const existingProducts = await db.select().from(products);
  
  if (existingProducts.length === 0) {
    // Créer des produits de démonstration
    console.log('Creating demo products...');
    
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
      }
    ];
    
    for (const product of demoProducts) {
      await db.insert(products).values(product);
    }
    
    console.log('Demo products created');
  } else {
    console.log(`${existingProducts.length} products already exist, skipping creation`);
  }

  // Vérifier si des réseaux sociaux existent déjà
  const existingSocialMedia = await db.select().from(socialMedia);
  
  if (existingSocialMedia.length === 0) {
    // Créer des réseaux sociaux par défaut
    console.log('Creating default social media entries...');
    
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
      }
    ];
    
    for (const sm of defaultSocialMedia) {
      await db.insert(socialMedia).values(sm);
    }
    
    console.log('Default social media entries created');
  } else {
    console.log(`${existingSocialMedia.length} social media entries already exist, skipping creation`);
  }

  // Vérifier si des informations de contact existent déjà
  const existingContactInfo = await db.select().from(contactInfo);
  
  if (existingContactInfo.length === 0) {
    // Créer des informations de contact par défaut
    console.log('Creating default contact information...');
    
    await db.insert(contactInfo).values({
      email: "contact@broly69.com",
      phone: "+33 1 23 45 67 89",
      address: "69 Rue du Commerce, 75015 Paris",
      hours: "Lun-Sam: 10h-20h, Dim: 12h-18h",
      isActive: true
    });
    
    console.log('Default contact information created');
  } else {
    console.log('Contact information already exists, skipping creation');
  }

  // Vérifier si des informations de livraison existent déjà
  const existingDeliveryInfo = await db.select().from(deliveryInfo);
  
  if (existingDeliveryInfo.length === 0) {
    // Créer des informations de livraison par défaut
    console.log('Creating default delivery information...');
    
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
      }
    ];
    
    for (const info of defaultDeliveryInfo) {
      await db.insert(deliveryInfo).values(info);
    }
    
    console.log('Default delivery information created');
  } else {
    console.log(`${existingDeliveryInfo.length} delivery info entries already exist, skipping creation`);
  }

  console.log('Database setup completed!');
}

// Exécuter le script
setupDatabase()
  .then(() => {
    console.log('Setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error setting up database:', error);
    process.exit(1);
  });