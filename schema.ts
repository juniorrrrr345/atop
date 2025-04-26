import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
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
  siteName: text("site_name").default("Broly69"),
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
  homeWelcomeTitle: text("home_welcome_title").default("Bienvenue"),
  homeWelcomeText: text("home_welcome_text").default("Explorez notre sélection de produits premium."),
  homeActionButtonText: text("home_action_button_text").default("Découvrir nos produits"),
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
}).extend({
  prices: z.array(priceVariantSchema).optional()
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
  homeActionButtonText: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect & {
  prices?: z.infer<typeof priceVariantSchema>[];
};

export type InsertSocialMedia = z.infer<typeof insertSocialMediaSchema>;
export type SocialMedia = typeof socialMedia.$inferSelect;

export type InsertDeliveryInfo = z.infer<typeof insertDeliveryInfoSchema>;
export type DeliveryInfo = typeof deliveryInfo.$inferSelect;

export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;

export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;
