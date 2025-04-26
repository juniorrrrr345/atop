import { db } from './db';
import { siteSettings } from '@shared/schema';
import { eq } from 'drizzle-orm';

/**
 * Ce script met à jour le nom du site dans la base de données pour remplacer la valeur par défaut
 * "GothamAdmin" par "Mon Site" s'il est encore utilisé.
 */
async function updateDefaultSiteName() {
  try {
    console.log('Mise à jour du nom de site par défaut...');
    
    // Récupérer les paramètres du site
    const [settings] = await db.select().from(siteSettings).where(eq(siteSettings.id, 1));
    
    // Vérifier si le nom du site est "GothamAdmin" ou si le siteName est vide
    if (!settings || !settings.siteName || settings.siteName === 'GothamAdmin') {
      // Mettre à jour avec une nouvelle valeur par défaut
      await db.update(siteSettings)
        .set({ siteName: 'Mon Site' })
        .where(eq(siteSettings.id, 1));
      
      console.log('Le nom du site a été mis à jour de "GothamAdmin" à "Mon Site".');
    } else {
      console.log(`Le nom du site est déjà personnalisé: "${settings.siteName}". Aucune mise à jour nécessaire.`);
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du nom du site:', error);
  }
}

// Exécuter la fonction
updateDefaultSiteName().then(() => {
  console.log('Script terminé.');
  process.exit(0);
}).catch(err => {
  console.error('Erreur lors de l\'exécution du script:', err);
  process.exit(1);
});