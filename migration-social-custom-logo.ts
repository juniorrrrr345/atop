import { pool } from './db';

/**
 * Adds a custom_logo column to the social_media table to allow for custom logos
 */
export async function addCustomLogoColumn() {
  try {
    // Check if column exists first to avoid errors
    const checkResult = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'social_media' AND column_name = 'custom_logo'
    `);

    // If column doesn't exist, add it
    if (checkResult.rows.length === 0) {
      await pool.query(`
        ALTER TABLE social_media
        ADD COLUMN custom_logo TEXT DEFAULT ''
      `);
      console.log('Custom logo column added to social_media table');
    } else {
      console.log('Custom logo column already exists in social_media table');
    }
  } catch (error) {
    console.error('Error adding custom_logo column to social_media table:', error);
  }
}