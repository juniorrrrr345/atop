import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  logoUrl: text("logo_url"),
  logoSize: text("logo_size").default("medium"),
  siteName: text("site_name").default("CBD Shop Premium"),
  categoryFontSize: text("category_font_size").default("medium"),
  backgroundTheme: text("background_theme").default("default"),
  // Nouveaux champs pour les paramètres de thème
  primaryColor: text("primary_color").default("#3b82f6"),
  secondaryColor: text("secondary_color").default("#1e40af"),
  accentColor: text("accent_color").default("#06b6d4"),
  textStyle: text("text_style").default("normal"),
  titleEffect: text("title_effect").default("none"),
  animationSpeed: integer("animation_speed").default(100),
  darkMode: boolean("dark_mode").default(true),
  // Champs pour les styles de boutons et textes
  buttonStyle: text("button_style").default("default"),
  categoryTextEffect: text("category_text_effect").default("none"),
  productTitleEffect: text("product_title_effect").default("none"),
  // Champs pour l'arrière-plan personnalisé
  backgroundUrl: text("background_url"),
  backgroundType: text("background_type").default("none"),
  backgroundOverlay: integer("background_overlay").default(50),
  // Champs pour la barre de recherche personnalisée
  searchBarEnabled: boolean("search_bar_enabled").default(true),
  searchBarPosition: text("search_bar_position").default("top"), // top, floating
  searchBarPlaceholder: text("search_bar_placeholder").default("Rechercher..."),
  searchBarStyle: text("search_bar_style").default("default"), // default, rounded, minimal
  searchBarAnimation: text("search_bar_animation").default("none"), // none, fade, slide
  // Textes personnalisables pour les différentes pages
  infoPageDescription: text("info_page_description").default("Découvrez notre sélection exclusive de produits premium"),
  canalPageDescription: text("canal_page_description").default("Nos différents canaux de communication pour rester connecté"),
  // Barre de commande dans le menu détails
  orderBarEnabled: boolean("order_bar_enabled").default(true),
  orderBarText: text("order_bar_text").default("Commander maintenant"),
  orderBarLink: text("order_bar_link").default(""),
  orderBarColor: text("order_bar_color").default("#ffffff"),
  orderBarTextColor: text("order_bar_text_color").default("#000000"),
  // Textes de la page d'accueil
  homeWelcomeTitle: text("home_welcome_title").default("Boutique CBD Premium"),
  homeWelcomeText: text("home_welcome_text").default("Découvrez notre sélection de produits CBD de haute qualité, conformes à la législation française"),
  homeActionButtonText: text("home_action_button_text").default("Découvrir nos produits"),
  // Paramètres légaux CBD
  thcLimit: decimal("thc_limit", { precision: 4, scale: 2 }).default("0.20"),
  ageVerification: integer("age_verification").default(18),
  legalNotice: text("legal_notice").default("Nos produits CBD contiennent moins de 0,2% de THC conformément à la législation française."),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  media: text("media"),
  farm: text("farm").default(""),
  externalLink: text("external_link").default(""),
  buttonText: text("button_text").default("Ajouter au panier"),
  // Champs spécifiques CBD
  cbdLevel: decimal("cbd_level", { precision: 4, scale: 2 }).default("0.00"), // % de CBD
  thcLevel: decimal("thc_level", { precision: 4, scale: 2 }).default("0.00"), // % de THC
  cbgLevel: decimal("cbg_level", { precision: 4, scale: 2 }).default("0.00"), // % de CBG
  cbnLevel: decimal("cbn_level", { precision: 4, scale: 2 }).default("0.00"), // % de CBN
  terpenes: text("terpenes"), // Profil terpénique
  cultivation: text("cultivation").default("indoor"), // indoor, outdoor, greenhouse
  genetics: text("genetics"), // Indica, Sativa, Hybrid
  harvest: text("harvest"), // Date/période de récolte
  certification: text("certification"), // Bio, Lab tested, etc.
  origin: text("origin"), // Pays/région d'origine
  // Gestion des stocks
  stock: integer("stock").default(0),
  minStock: integer("min_stock").default(5), // Seuil d'alerte stock
  maxStock: integer("max_stock").default(100),
  unit: text("unit").default("g"), // g, ml, unité
  weight: decimal("weight", { precision: 8, scale: 2 }), // Poids en grammes
  // Statut et visibilité
  status: text("status").default("active"), // active, inactive, out_of_stock
  featured: boolean("featured").default(false), // Produit mis en avant
  // Métadonnées
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Table pour les variantes de prix (par quantité)
export const priceVariants = pgTable("price_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id),
  size: text("size").notNull(), // 1g, 3g, 5g, 10ml, etc.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  stock: integer("stock").default(0),
  isDefault: boolean("is_default").default(false),
});

// Table pour les commandes
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone"),
  customerAddress: text("customer_address"),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).default("0.00"),
  shipping: decimal("shipping", { precision: 10, scale: 2 }).default("0.00"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").default("pending"), // pending, processing, shipped, delivered, cancelled
  paymentStatus: text("payment_status").default("pending"), // pending, paid, failed, refunded
  paymentMethod: text("payment_method"), // card, bank_transfer, crypto, etc.
  notes: text("notes"),
  trackingNumber: text("tracking_number"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Table pour les articles de commande
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  variantId: integer("variant_id").references(() => priceVariants.id),
  productName: text("product_name").notNull(),
  variantSize: text("variant_size"),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
});

// Table pour les clients
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  postalCode: text("postal_code"),
  country: text("country").default("France"),
  dateOfBirth: text("date_of_birth"), // Pour vérification d'âge
  ageVerified: boolean("age_verified").default(false),
  newsletter: boolean("newsletter").default(false),
  totalOrders: integer("total_orders").default(0),
  totalSpent: decimal("total_spent", { precision: 10, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  lastOrderAt: timestamp("last_order_at"),
});

// Table pour les catégories de produits
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
  image: text("image"),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

// Table pour les coupons de réduction
export const coupons = pgTable("coupons", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  description: text("description"),
  type: text("type").notNull(), // percentage, fixed_amount, free_shipping
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  minOrderAmount: decimal("min_order_amount", { precision: 10, scale: 2 }),
  maxUses: integer("max_uses"),
  usedCount: integer("used_count").default(0),
  isActive: boolean("is_active").default(true),
  validFrom: timestamp("valid_from"),
  validTo: timestamp("valid_to"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Define price variant type
export const priceVariantSchema = z.object({
  id: z.number().optional(),
  size: z.string(),
  price: z.string(),
  productId: z.number().optional()
});

export const socialMedia = pgTable("social_media", {
  id: serial("id").primaryKey(),
  platform: text("platform").notNull(),  // e.g., "Twitter", "Instagram", etc.
  url: text("url").notNull(),
  icon: text("icon").notNull(),  // Icon name from react-icons
  displayOrder: integer("display_order").default(0),
  isActive: boolean("is_active").default(true),
  customName: text("custom_name").default(""),  // Nom personnalisé pour le réseau social
  customLogo: text("custom_logo").default(""),  // Logo personnalisé pour le réseau social
});

export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  hours: text("hours").notNull(),
  isActive: boolean("is_active").default(true),
});

export const deliveryInfo = pgTable("delivery_info", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),  // 'delivery', 'meetup', 'hours', 'notice'
  isActive: boolean("is_active").default(true),
  customName: text("custom_name").default(""),  // Nom personnalisé pour le type (ex: "Retrait en boutique" au lieu de "meetup")
});

// Schemas pour la validation des données
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  category: true,
  price: true,
  description: true,
  media: true,
  farm: true,
  externalLink: true,
  cbdLevel: true,
  thcLevel: true,
  cbgLevel: true,
  cbnLevel: true,
  terpenes: true,
  cultivation: true,
  genetics: true,
  harvest: true,
  certification: true,
  origin: true,
  stock: true,
  minStock: true,
  maxStock: true,
  unit: true,
  weight: true,
  status: true,
  featured: true,
}).extend({
  prices: z.array(priceVariantSchema).optional()
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  customerName: true,
  customerEmail: true,
  customerPhone: true,
  customerAddress: true,
  subtotal: true,
  tax: true,
  shipping: true,
  total: true,
  status: true,
  paymentStatus: true,
  paymentMethod: true,
  notes: true,
});

export const insertCustomerSchema = createInsertSchema(customers).pick({
  name: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  postalCode: true,
  country: true,
  dateOfBirth: true,
  ageVerified: true,
  newsletter: true,
});

export const insertSocialMediaSchema = createInsertSchema(socialMedia).pick({
  platform: true,
  url: true,
  icon: true,
  displayOrder: true,
  isActive: true,
  customName: true,
  customLogo: true,
});

export const insertDeliveryInfoSchema = createInsertSchema(deliveryInfo).pick({
  title: true,
  description: true,
  type: true,
  isActive: true,
  customName: true,
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).pick({
  email: true,
  phone: true,
  address: true,
  hours: true,
  isActive: true,
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettings).pick({
  logoUrl: true,
  logoSize: true,
  siteName: true,
  categoryFontSize: true,
  backgroundTheme: true,
  // Champs de thème
  primaryColor: true,
  secondaryColor: true,
  accentColor: true,
  textStyle: true,
  titleEffect: true,
  animationSpeed: true,
  darkMode: true,
  // Nouveaux champs pour les styles et effets
  buttonStyle: true,
  categoryTextEffect: true,
  productTitleEffect: true,
  // Champs pour l'arrière-plan personnalisé
  backgroundUrl: true,
  backgroundType: true,
  backgroundOverlay: true,
  // Champs pour la barre de recherche personnalisée
  searchBarEnabled: true,
  searchBarPosition: true,
  searchBarPlaceholder: true,
  searchBarStyle: true,
  searchBarAnimation: true,
  // Textes personnalisables pour les différentes pages
  infoPageDescription: true,
  canalPageDescription: true,
  // Barre de commande dans le menu détails
  orderBarEnabled: true,
  orderBarText: true,
  orderBarLink: true,
  orderBarColor: true,
  orderBarTextColor: true,
  // Textes de la page d'accueil
  homeWelcomeTitle: true,
  homeWelcomeText: true,
  homeActionButtonText: true,
  // Paramètres légaux CBD
  thcLimit: true,
  ageVerification: true,
  legalNotice: true,
});

// Types TypeScript
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect & {
  prices?: z.infer<typeof priceVariantSchema>[];
};

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

export type PriceVariant = typeof priceVariants.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Coupon = typeof coupons.$inferSelect;

export type InsertSocialMedia = z.infer<typeof insertSocialMediaSchema>;
export type SocialMedia = typeof socialMedia.$inferSelect;

export type InsertDeliveryInfo = z.infer<typeof insertDeliveryInfoSchema>;
export type DeliveryInfo = typeof deliveryInfo.$inferSelect;

export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;

export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;
