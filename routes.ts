import type { Express, Request, Response, NextFunction } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertSocialMediaSchema, insertDeliveryInfoSchema, insertContactInfoSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import multer from "multer";
import path from "path";
import fs from "fs";
import { comparePasswords, hashPassword } from './auth';
import mime from 'mime-types';

// Import des fonctions de migration
import { addButtonTextColumn } from './migration-button-text';
import { addCustomNameColumn as addDeliveryCustomNameColumn } from './migration-delivery-custom-name';
import { addPageDescriptionColumns } from './migration-page-descriptions';
import { addCustomLogoColumn } from './migration-social-custom-logo';
import { addCustomNameColumn } from './migration-social-custom-name';
import { addOrderBarColumns } from './migration-order-bar';
import { addHomepageTextColumns } from './migration-homepage-texts';

// Fonction pour exécuter toutes les migrations
async function runMigrations() {
  console.log('Starting migration: Add custom_name column to delivery_info table');
  try {
    await Promise.all([
      addButtonTextColumn(),
      addDeliveryCustomNameColumn(),
      addPageDescriptionColumns(),
      addCustomLogoColumn(),
      addCustomNameColumn(),
      addOrderBarColumns(),
      addHomepageTextColumns()
    ]);
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration error:', error);
  }
}

// Configure multer for file uploads
const storage_config = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, cb: Function) {
    const dir = './uploads';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: function (req: Express.Request, file: Express.Multer.File, cb: Function) {
    // Ensure all video files are consistently saved as MP4 for better compatibility
    let ext = path.extname(file.originalname).toLowerCase();
    
    // Change MOV files to MP4 for better mobile compatibility
    if (ext === '.mov' || file.mimetype === 'video/quicktime') {
      ext = '.mp4';
    }
    
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage_config });

export async function registerRoutes(app: Express): Promise<Server> {
  // Exécuter les migrations
  await runMigrations();
  // Serve static files from the uploads directory with proper content type handling for videos
  app.use('/uploads', fs.existsSync('./uploads') 
    ? express.static(path.join(process.cwd(), 'uploads'), {
        setHeaders: (res, filepath) => {
          // Ensure videos are served with the correct Content-Type header
          if (filepath.endsWith('.mp4')) {
            res.setHeader('Content-Type', 'video/mp4');
          } else if (filepath.endsWith('.mov')) {
            // Serve MOV files as MP4 for better compatibility
            res.setHeader('Content-Type', 'video/mp4');
          } else if (filepath.endsWith('.webm')) {
            res.setHeader('Content-Type', 'video/webm');
          } else {
            // Use MIME library for accurate content type detection
            const mimeType = mime.lookup(filepath);
            if (mimeType) {
              res.setHeader('Content-Type', mimeType);
            }
          }
        }
      })
    : (req: Request, res: Response, next: NextFunction) => next()
  );

  // Get all products
  app.get('/api/products', async (req: Request, res: Response) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get product by ID
  app.get('/api/products/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await storage.getProduct(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new product
  app.post('/api/products', upload.single('media'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      const media = req.file ? `/uploads/${req.file.filename}` : null;
      const { name, category, price, description, farm, externalLink, buttonText, prices: pricesJSON } = req.body;

      // Parse prices if they exist
      let prices = [];
      if (pricesJSON) {
        try {
          prices = JSON.parse(pricesJSON);
          console.log('Parsed prices:', prices);
        } catch (err) {
          console.error('Failed to parse prices:', err);
        }
      }

      // Validate the request body
      const productData: any = {
        name,
        category,
        price,
        description,
        farm: farm || '',
        media: media,
        externalLink: externalLink || '',
        buttonText: buttonText || 'Ajouter au panier',
        prices: prices
      };

      const result = insertProductSchema.safeParse(productData);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid product data', 
          errors: result.error.errors 
        });
      }

      const product = await storage.createProduct(productData);
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a product
  app.put('/api/products/:id', upload.single('media'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const existingProduct = await storage.getProduct(id);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // If there's a new file, use it; otherwise, keep the existing media
      const media = req.file 
        ? `/uploads/${req.file.filename}` 
        : (req.body.media || existingProduct.media);

      const { name, category, price, description, farm, externalLink, buttonText, prices: pricesJSON } = req.body;

      // Parse prices if they exist
      // @ts-ignore - prices might not be in type definition
      let prices = existingProduct.prices || [];
      if (pricesJSON) {
        try {
          prices = JSON.parse(pricesJSON);
          console.log('Update - Parsed prices:', prices);
        } catch (err) {
          console.error('Update - Failed to parse prices:', err);
        }
      }

      // Validate the request body
      const productData: any = {
        name: name || existingProduct.name,
        category: category || existingProduct.category,
        price: price || existingProduct.price,
        description: description || existingProduct.description,
        farm: farm || existingProduct.farm || '',
        media: media,
        // @ts-ignore - externalLink might not be in the existing product type yet
        externalLink: externalLink || existingProduct.externalLink || '',
        // @ts-ignore - buttonText might not be in the existing product type yet
        buttonText: buttonText || existingProduct.buttonText || 'Ajouter au panier',
        prices: prices
      };

      const result = insertProductSchema.safeParse(productData);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid product data', 
          errors: result.error.errors 
        });
      }

      const updatedProduct = await storage.updateProduct(id, productData);
      res.json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete a product
  app.delete('/api/products/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product ID' });
      }

      const product = await storage.deleteProduct(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product deleted', product });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Social Media Routes
  // Get all social media
  app.get('/api/social-media', async (req: Request, res: Response) => {
    try {
      const socialMedia = await storage.getAllSocialMedia();
      res.json(socialMedia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get social media by ID
  app.get('/api/social-media/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid social media ID' });
      }

      const socialMedia = await storage.getSocialMedia(id);
      if (!socialMedia) {
        return res.status(404).json({ message: 'Social media not found' });
      }

      res.json(socialMedia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new social media
  app.post('/api/social-media', async (req: Request, res: Response) => {
    try {
      const { platform, url, icon, displayOrder, isActive, customName, customLogo } = req.body;

      // Validate the request body
      const socialMediaData = {
        platform,
        url,
        icon,
        displayOrder: displayOrder || 999,
        isActive: isActive === undefined ? true : isActive,
        customName: customName || "",
        customLogo: customLogo || ""
      };

      const result = insertSocialMediaSchema.safeParse(socialMediaData);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid social media data', 
          errors: result.error.errors 
        });
      }

      const socialMedia = await storage.createSocialMedia(socialMediaData);
      res.status(201).json(socialMedia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a social media
  app.put('/api/social-media/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid social media ID' });
      }

      const existingSocialMedia = await storage.getSocialMedia(id);
      if (!existingSocialMedia) {
        return res.status(404).json({ message: 'Social media not found' });
      }

      const { platform, url, icon, displayOrder, isActive, customName, customLogo } = req.body;

      // Validate the request body
      const socialMediaData = {
        platform: platform || existingSocialMedia.platform,
        url: url || existingSocialMedia.url,
        icon: icon || existingSocialMedia.icon,
        displayOrder: displayOrder !== undefined ? displayOrder : existingSocialMedia.displayOrder,
        isActive: isActive !== undefined ? isActive : existingSocialMedia.isActive,
        customName: customName !== undefined ? customName : existingSocialMedia.customName,
        customLogo: customLogo !== undefined ? customLogo : existingSocialMedia.customLogo
      };

      const result = insertSocialMediaSchema.safeParse(socialMediaData);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid social media data', 
          errors: result.error.errors 
        });
      }

      const updatedSocialMedia = await storage.updateSocialMedia(id, socialMediaData);
      res.json(updatedSocialMedia);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete a social media
  app.delete('/api/social-media/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid social media ID' });
      }

      const socialMedia = await storage.deleteSocialMedia(id);
      if (!socialMedia) {
        return res.status(404).json({ message: 'Social media not found' });
      }

      res.json({ message: 'Social media deleted', socialMedia });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delivery Info Routes
  // Get all delivery info
  app.get('/api/delivery-info', async (req: Request, res: Response) => {
    try {
      const deliveryInfo = await storage.getAllDeliveryInfo();
      res.json(deliveryInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get delivery info by ID
  app.get('/api/delivery-info/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid delivery info ID' });
      }

      const deliveryInfo = await storage.getDeliveryInfo(id);
      if (!deliveryInfo) {
        return res.status(404).json({ message: 'Delivery info not found' });
      }

      res.json(deliveryInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new delivery info
  app.post('/api/delivery-info', async (req: Request, res: Response) => {
    try {
      const { title, description, type, isActive, customName } = req.body;

      // Validate the request body
      const deliveryInfoData = {
        title,
        description,
        type,
        isActive: isActive === undefined ? true : isActive,
        customName: customName || ""
      };

      const result = insertDeliveryInfoSchema.safeParse(deliveryInfoData);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid delivery info data', 
          errors: result.error.errors 
        });
      }

      const deliveryInfo = await storage.createDeliveryInfo(deliveryInfoData);
      res.status(201).json(deliveryInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update a delivery info
  app.put('/api/delivery-info/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid delivery info ID' });
      }

      const existingDeliveryInfo = await storage.getDeliveryInfo(id);
      if (!existingDeliveryInfo) {
        return res.status(404).json({ message: 'Delivery info not found' });
      }

      const { title, description, type, isActive, customName } = req.body;

      // Validate the request body
      const deliveryInfoData = {
        title: title || existingDeliveryInfo.title,
        description: description || existingDeliveryInfo.description,
        type: type || existingDeliveryInfo.type,
        isActive: isActive !== undefined ? isActive : existingDeliveryInfo.isActive,
        customName: customName !== undefined ? customName : existingDeliveryInfo.customName
      };

      const result = insertDeliveryInfoSchema.safeParse(deliveryInfoData);
      if (!result.success) {
        return res.status(400).json({ 
          message: 'Invalid delivery info data', 
          errors: result.error.errors 
        });
      }

      const updatedDeliveryInfo = await storage.updateDeliveryInfo(id, deliveryInfoData);
      res.json(updatedDeliveryInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete a delivery info
  app.delete('/api/delivery-info/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid delivery info ID' });
      }

      const deliveryInfo = await storage.deleteDeliveryInfo(id);
      if (!deliveryInfo) {
        return res.status(404).json({ message: 'Delivery info not found' });
      }

      res.json({ message: 'Delivery info deleted', deliveryInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Routes pour gérer les informations de contact
  app.get('/api/contact-info', async (req: Request, res: Response) => {
    try {
      const contactInfo = await storage.getAllContactInfo();
      res.json(contactInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Get contact info by ID
  app.get('/api/contact-info/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid contact info ID' });
      }

      const contactInfo = await storage.getContactInfo(id);
      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }

      res.json(contactInfo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new contact info
  app.post('/api/contact-info', async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactInfoSchema.parse(req.body);
      const contactInfo = await storage.createContactInfo(validatedData);
      res.status(201).json(contactInfo);
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Update contact info
  app.put('/api/contact-info/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid contact info ID' });
      }

      const validatedData = insertContactInfoSchema.parse(req.body);
      const contactInfo = await storage.updateContactInfo(id, validatedData);
      
      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }
      
      res.json(contactInfo);
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: 'Validation failed', 
          errors: fromZodError(error).message 
        });
      }
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete contact info
  app.delete('/api/contact-info/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid contact info ID' });
      }

      const contactInfo = await storage.deleteContactInfo(id);
      
      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }

      res.json({ message: 'Contact info deleted', contactInfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Routes pour gérer les paramètres du site
  app.get('/api/site-settings', async (req: Request, res: Response) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings || {});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.put('/api/site-settings', upload.single('logo'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      // Si un fichier logo a été envoyé, on l'utilise
      const logoUrl = req.file 
        ? `/uploads/${req.file.filename}` 
        : req.body.logoUrl || null;
      
      // Préparation des données avec tous les paramètres de thème
      const settingsData = {
        ...req.body,
        logoUrl: logoUrl,
        // Convertir les valeurs numériques (car elles arrivent comme des strings depuis le formulaire)
        animationSpeed: req.body.animationSpeed ? parseInt(req.body.animationSpeed) : undefined,
        backgroundOverlay: req.body.backgroundOverlay ? parseInt(req.body.backgroundOverlay) : undefined,
        darkMode: req.body.darkMode === 'true' ? true : req.body.darkMode === 'false' ? false : req.body.darkMode,
      };
      
      // Récupérer les paramètres actuels
      const currentSettings = await storage.getSiteSettings();
      
      // Fusionner les paramètres actuels avec les nouveaux
      const mergedSettings = {
        ...currentSettings,
        ...settingsData
      };
      
      console.log('Mise à jour des paramètres:', mergedSettings);
      
      // Mise à jour des paramètres
      const settings = await storage.updateSiteSettings(mergedSettings);
      
      res.json(settings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Route générique pour l'upload de médias (logos, images, etc.)
  app.post('/api/upload', upload.single('media'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const fileUrl = `/uploads/${req.file.filename}`;
      
      // Ne plus mettre à jour automatiquement les paramètres du site
      // Cette route est maintenant générique pour tout type d'upload
      
      res.status(201).json({
        message: 'File uploaded successfully',
        url: fileUrl
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Route spécifique pour l'upload d'arrière-plan (image, gif ou vidéo)
  app.put('/api/site-settings/background', upload.single('background'), async (req: Request & { file?: Express.Multer.File }, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      
      const backgroundUrl = `/uploads/${req.file.filename}`;
      const backgroundType = req.body.backgroundType || 'image';
      
      // Vérifier le type d'arrière-plan
      if (!['image', 'video', 'gif'].includes(backgroundType)) {
        return res.status(400).json({ message: 'Invalid background type. Must be "image", "video", or "gif".' });
      }
      
      // Mise à jour des paramètres du site avec le nouvel arrière-plan
      // On doit récupérer les paramètres actuels pour éviter de perdre des valeurs
      const currentSettings = await storage.getSiteSettings();
      
      const updatedSettings = await storage.updateSiteSettings({
        ...currentSettings,
        backgroundUrl,
        backgroundType
      });
      
      res.status(200).json({
        message: 'Background uploaded successfully',
        backgroundUrl,
        backgroundType,
        settings: updatedSettings
      });
    } catch (error) {
      console.error('Error uploading background:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // ========== Routes pour la gestion des utilisateurs ==========
  
  // Get all users
  app.get('/api/users', async (req: Request, res: Response) => {
    try {
      // On va créer un utilisateur par défaut si aucun n'existe
      const adminExists = await storage.getUserByUsername("admin");
      
      if (!adminExists) {
        const userData = {
          username: "admin",
          password: "AdminBroly69"
        };
        await storage.createUser(userData);
      }

      // Récupérer tous les utilisateurs avec la méthode getAllUsers
      const users = await storage.getAllUsers();
      
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

//

  // Login user
  app.post('/api/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      // Vérifier si l'utilisateur existe
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // Vérifier si le mot de passe correspond en utilisant comparePasswords
      const passwordMatch = await comparePasswords(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // L'utilisateur est authentifié
      // Renvoyer l'utilisateur sans le mot de passe
      const { password: _, ...userWithoutPassword } = user;
      res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
      
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Create a new user
  app.post('/api/users', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }
      
      if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
      }
      
      // Vérifier si l'utilisateur existe déjà
      const existingUser = await storage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      
      // Hacher le mot de passe avant de créer l'utilisateur
      const hashedPassword = await hashPassword(password);
      
      // Créer le nouvel utilisateur avec le mot de passe haché
      const userData = {
        username,
        password: hashedPassword
      };
      
      const newUser = await storage.createUser(userData);
      
      res.status(200).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // Delete a user
  app.delete('/api/users/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }
      
      // Protection contre la suppression de l'admin principal
      if (id === 1) {
        return res.status(403).json({ message: 'Cannot delete main admin user' });
      }
      
      // Utiliser la méthode deleteUser
      const deletedUser = await storage.deleteUser(id);
      
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      res.json({ message: 'User deleted successfully', user: deletedUser });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
