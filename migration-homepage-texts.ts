import { db, pool } from './db';
import { siteSettings } from '@shared/schema';
import { sql } from 'drizzle-orm';

/**
 * Ajoute les colonnes homeWelcomeTitle, homeWelcomeText et homeActionButtonText 
 * à la table site_settings pour permettre la personnalisation des textes de la page d'accueil
 */
export async function addHomepageTextColumns() {
  console.log('Starting migration: Add homepage text columns to site_settings table');
  
  try {
    // Vérifier si les colonnes existent déjà
    const columnsExist = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'site_settings' 
      AND column_name IN ('home_welcome_title', 'home_welcome_text', 'home_action_button_text')
    `);
    
    // Si toutes les colonnes existent déjà, sortir
    if (columnsExist.rows.length === 3) {
      console.log('Homepage text columns already exist in site_settings table');
      return;
    }
    
    // Ajouter les colonnes manquantes
    await pool.query(`
      ALTER TABLE site_settings 
      ADD COLUMN IF NOT EXISTS home_welcome_title TEXT DEFAULT 'Bienvenue',
      ADD COLUMN IF NOT EXISTS home_welcome_text TEXT DEFAULT 'Explorez notre sélection de produits premium.',
      ADD COLUMN IF NOT EXISTS home_action_button_text TEXT DEFAULT 'Découvrir nos produits'
    `);
    
    console.log('Homepage text columns added successfully to site_settings table');
  } catch (error) {
    console.error('Error adding homepage text columns:', error);
    throw error;
  }
}