import { db } from './db';
import { siteSettings } from '@shared/schema';
import { sql } from 'drizzle-orm';

/**
 * Ajoute les colonnes infoPageDescription et canalPageDescription à la table site_settings
 * pour permettre la personnalisation des textes descriptifs sur les pages Infos et Canal
 */
export async function addPageDescriptionColumns() {
  try {
    // Vérifie si la colonne info_page_description existe déjà
    const infoColumnExists = await db.execute(sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'site_settings'
      AND column_name = 'info_page_description'
    `);
    
    // Ajoute la colonne info_page_description si elle n'existe pas
    if (infoColumnExists.rowCount === 0) {
      console.log('Ajout de la colonne info_page_description à la table site_settings...');
      await db.execute(sql`
        ALTER TABLE site_settings
        ADD COLUMN info_page_description TEXT DEFAULT 'Découvrez notre sélection exclusive de produits premium'
      `);
      console.log('Colonne info_page_description ajoutée avec succès');
    } else {
      console.log('La colonne info_page_description existe déjà');
    }
    
    // Vérifie si la colonne canal_page_description existe déjà
    const canalColumnExists = await db.execute(sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'site_settings'
      AND column_name = 'canal_page_description'
    `);
    
    // Ajoute la colonne canal_page_description si elle n'existe pas
    if (canalColumnExists.rowCount === 0) {
      console.log('Ajout de la colonne canal_page_description à la table site_settings...');
      await db.execute(sql`
        ALTER TABLE site_settings
        ADD COLUMN canal_page_description TEXT DEFAULT 'Nos différents canaux de communication pour rester connecté'
      `);
      console.log('Colonne canal_page_description ajoutée avec succès');
    } else {
      console.log('La colonne canal_page_description existe déjà');
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'ajout des colonnes page_description:', error);
    return false;
  }
}