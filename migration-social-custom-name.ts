import { pool } from './db';

/**
 * Adds a custom_name column to the social_media table to allow for custom display names
 */
export async function addCustomNameColumn() {
  try {
    // Check if column exists first to avoid errors
    const checkResult = await pool.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'social_media' AND column_name = 'custom_name'
    `);

    // If column doesn't exist, add it
    if (checkResult.rows.length === 0) {
      await pool.query(`
        ALTER TABLE social_media
        ADD COLUMN custom_name TEXT DEFAULT ''
      `);
      console.log('Custom name column added to social_media table');
    } else {
      console.log('Custom name column already exists in social_media table');
    }
  } catch (error) {
    console.error('Error adding custom_name column to social_media table:', error);
  }
}