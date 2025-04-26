import { pool } from './db';

/**
 * Ajoute les colonnes pour la personnalisation de la barre de commande
 * dans la table site_settings
 */
export async function addOrderBarColumns() {
  try {
    // Vérifier si les colonnes existent déjà
    const checkQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'site_settings' AND column_name = 'order_bar_enabled';
    `;
    
    const checkResult = await pool.query(checkQuery);
    
    // Si la colonne n'existe pas, l'ajouter
    if (checkResult.rowCount === 0) {
      console.log('Ajout des colonnes de la barre de commande...');
      
      const alterTableQuery = `
        ALTER TABLE site_settings
        ADD COLUMN IF NOT EXISTS order_bar_enabled BOOLEAN DEFAULT true,
        ADD COLUMN IF NOT EXISTS order_bar_text TEXT DEFAULT 'Commander maintenant',
        ADD COLUMN IF NOT EXISTS order_bar_link TEXT DEFAULT '',
        ADD COLUMN IF NOT EXISTS order_bar_color TEXT DEFAULT '#ffffff',
        ADD COLUMN IF NOT EXISTS order_bar_text_color TEXT DEFAULT '#000000';
      `;
      
      await pool.query(alterTableQuery);
      console.log('Colonnes de la barre de commande ajoutées avec succès !');
    } else {
      console.log('Les colonnes de la barre de commande existent déjà.');
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout des colonnes de la barre de commande:', error);
  }
}