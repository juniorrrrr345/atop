import { pool } from "./db";

/**
 * Adds a custom_name column to the delivery_info table to allow for custom display names
 */
export async function addCustomNameColumn() {
  console.log("Starting migration: Add custom_name column to delivery_info table");
  
  try {
    // Check if the column already exists
    const checkColumnQuery = `
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'delivery_info' AND column_name = 'custom_name';
    `;
    const columnCheckResult = await pool.query(checkColumnQuery);
    
    if (columnCheckResult.rows.length === 0) {
      // Column doesn't exist, add it
      const addColumnQuery = `
        ALTER TABLE delivery_info 
        ADD COLUMN custom_name TEXT DEFAULT '';
      `;
      await pool.query(addColumnQuery);
      console.log("Successfully added custom_name column to delivery_info table");
    } else {
      console.log("custom_name column already exists in delivery_info table");
    }
    
    return true;
  } catch (error) {
    console.error("Error adding custom_name column to delivery_info table:", error);
    return false;
  }
}