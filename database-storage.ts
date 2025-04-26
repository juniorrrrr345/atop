import { IStorage } from './storage';
import { db } from './db';
import {
  users, products, socialMedia, deliveryInfo, contactInfo, siteSettings,
  type User, type Product, type SocialMedia, type DeliveryInfo, type ContactInfo, type SiteSettings,
  type InsertUser, type InsertProduct, type InsertSocialMedia, type InsertDeliveryInfo, type InsertContactInfo, type InsertSiteSettings
} from '@shared/schema';
import { eq } from 'drizzle-orm';
import { PgSession } from "drizzle-orm/pg-core";
import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import { pool } from './db';

const PostgresSessionStore = connectPgSimple(session);

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true 
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async deleteUser(id: number): Promise<User | undefined> {
    const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();
    return deletedUser;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }

  async updateProduct(id: number, product: InsertProduct): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<Product | undefined> {
    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return deletedProduct;
  }

  // Social Media methods
  async getAllSocialMedia(): Promise<SocialMedia[]> {
    return await db.select().from(socialMedia)
      .orderBy(socialMedia.displayOrder);
  }

  async getSocialMedia(id: number): Promise<SocialMedia | undefined> {
    const [item] = await db.select().from(socialMedia).where(eq(socialMedia.id, id));
    return item;
  }

  async createSocialMedia(item: InsertSocialMedia): Promise<SocialMedia> {
    const [newItem] = await db.insert(socialMedia).values(item).returning();
    return newItem;
  }

  async updateSocialMedia(id: number, item: InsertSocialMedia): Promise<SocialMedia | undefined> {
    const [updatedItem] = await db
      .update(socialMedia)
      .set(item)
      .where(eq(socialMedia.id, id))
      .returning();
    return updatedItem;
  }

  async deleteSocialMedia(id: number): Promise<SocialMedia | undefined> {
    const [deletedItem] = await db
      .delete(socialMedia)
      .where(eq(socialMedia.id, id))
      .returning();
    return deletedItem;
  }

  // Delivery Info methods
  async getAllDeliveryInfo(): Promise<DeliveryInfo[]> {
    return await db.select().from(deliveryInfo);
  }

  async getDeliveryInfo(id: number): Promise<DeliveryInfo | undefined> {
    const [item] = await db.select().from(deliveryInfo).where(eq(deliveryInfo.id, id));
    return item;
  }

  async createDeliveryInfo(item: InsertDeliveryInfo): Promise<DeliveryInfo> {
    const [newItem] = await db.insert(deliveryInfo).values(item).returning();
    return newItem;
  }

  async updateDeliveryInfo(id: number, item: InsertDeliveryInfo): Promise<DeliveryInfo | undefined> {
    const [updatedItem] = await db
      .update(deliveryInfo)
      .set(item)
      .where(eq(deliveryInfo.id, id))
      .returning();
    return updatedItem;
  }

  async deleteDeliveryInfo(id: number): Promise<DeliveryInfo | undefined> {
    const [deletedItem] = await db
      .delete(deliveryInfo)
      .where(eq(deliveryInfo.id, id))
      .returning();
    return deletedItem;
  }

  // Contact Info methods
  async getAllContactInfo(): Promise<ContactInfo[]> {
    return await db.select().from(contactInfo);
  }

  async getContactInfo(id: number): Promise<ContactInfo | undefined> {
    const [item] = await db.select().from(contactInfo).where(eq(contactInfo.id, id));
    return item;
  }

  async createContactInfo(item: InsertContactInfo): Promise<ContactInfo> {
    const [newItem] = await db.insert(contactInfo).values(item).returning();
    return newItem;
  }

  async updateContactInfo(id: number, item: InsertContactInfo): Promise<ContactInfo | undefined> {
    const [updatedItem] = await db
      .update(contactInfo)
      .set(item)
      .where(eq(contactInfo.id, id))
      .returning();
    return updatedItem;
  }

  async deleteContactInfo(id: number): Promise<ContactInfo | undefined> {
    const [deletedItem] = await db
      .delete(contactInfo)
      .where(eq(contactInfo.id, id))
      .returning();
    return deletedItem;
  }

  // Site Settings methods
  async getSiteSettings(): Promise<SiteSettings | undefined> {
    try {
      // Sélectionner tous les champs de la table siteSettings
      const [settings] = await db.query.siteSettings.findMany({
        limit: 1,
      });
      
      return settings;
    } catch (error) {
      console.error("Erreur lors de la récupération des paramètres:", error);
      throw error;
    }
  }

  async updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings> {
    // Vérifier si des paramètres existent déjà
    const existingSettings = await this.getSiteSettings();
    
    if (existingSettings) {
      // Mettre à jour les paramètres existants
      const [updatedSettings] = await db
        .update(siteSettings)
        .set(settings)
        .where(eq(siteSettings.id, existingSettings.id))
        .returning();
      return updatedSettings;
    } else {
      // Créer de nouveaux paramètres
      const [newSettings] = await db
        .insert(siteSettings)
        .values({
          ...settings,
          id: 1 // Utiliser l'ID 1 pour la cohérence
        })
        .returning();
      return newSettings;
    }
  }
}