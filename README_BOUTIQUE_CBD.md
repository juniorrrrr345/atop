# 🌿 CBD Store Premium v3.0

Une boutique CBD moderne et élégante en **noir et blanc**, entièrement **responsive** avec un **panel admin** complet pour la gestion des contenus.

## ✨ Nouvelles Fonctionnalités v3.0

### 🎨 Design Noir & Blanc
- **Thème épuré** : Interface moderne en noir et blanc
- **Animations fluides** : Transitions et effets hover élégants
- **Typographie premium** : Police Inter pour une lecture optimale

### 📱 Responsive Design
- **Mobile First** : Optimisé pour smartphone, tablette et desktop
- **Navigation adaptative** : Menu burger sur mobile, navigation fixe sur desktop
- **Grilles flexibles** : Affichage optimal sur toutes les tailles d'écran

### 🛒 Suppression du Panier
- **Expérience simplifiée** : Focus sur la découverte des produits
- **Boutons "Voir détails"** : Remplace les boutons d'ajout au panier
- **Navigation fluide** : Parcours utilisateur optimisé

### ⚙️ Panel Admin Complet
- **Gestion des textes** : Modification de tous les contenus depuis l'interface
- **Gestion des produits** : Ajout, modification, suppression des produits
- **Upload de médias** : Support pour images et vidéos des produits
- **Dashboard** : Statistiques et aperçu des données

### 🖼️ Gestion des Médias
- **Images produits** : Upload multiple d'images
- **Vidéos produits** : Support des vidéos de présentation
- **Logo personnalisable** : Upload et gestion du logo de la boutique

## 🚀 Déploiement sur Vercel

### Prérequis
- Node.js 18+ 
- Compte Vercel
- Git

### Installation locale
```bash
# Cloner le projet
git clone <votre-repo>
cd cbd-store-premium

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

### Déploiement Vercel

#### Option 1 : Via l'interface web
1. Connectez votre repo GitHub à Vercel
2. Vercel détecte automatiquement la configuration Vite
3. Déployez en un clic !

#### Option 2 : Via CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour déployer en production
vercel --prod
```

### Variables d'environnement
Créez un fichier `.env.local` pour les variables d'environnement :
```env
VITE_API_URL=https://votre-api.com
VITE_APP_NAME=CBD Store Premium
```

## 📱 Fonctionnalités Responsive

### 📱 Mobile (< 768px)
- Navigation hamburger
- Grille single-column pour les produits
- Interface tactile optimisée
- Textes et boutons adaptés

### 📱 Tablette (768px - 1024px)
- Grille 2 colonnes pour les produits
- Navigation mixte desktop/mobile
- Interface optimisée pour le tactile

### 🖥️ Desktop (> 1024px)
- Navigation complète en header
- Grille 3-4 colonnes pour les produits
- Effets hover avancés
- Interface souris optimisée

## 🎨 Thème Noir & Blanc

### Palette de couleurs
```css
:root {
  --primary: 0 0% 100%;      /* Blanc pur */
  --background: 0 0% 4%;     /* Noir profond */
  --card: 0 0% 8%;          /* Gris très foncé */
  --accent: 0 0% 85%;       /* Gris clair */
  --muted: 0 0% 8%;         /* Noir doux */
  --border: 0 0% 20%;       /* Gris pour bordures */
}
```

### Classes CSS personnalisées
- `.bw-gradient` : Dégradé blanc
- `.bw-text-gradient` : Texte avec dégradé
- `.bw-hover-effect` : Effet hover élégant
- `.btn-primary` / `.btn-secondary` : Boutons stylisés

## 🔧 Panel Admin

### Accès
- URL : `/admin`
- Interface moderne avec sidebar
- Navigation par onglets

### Fonctionnalités disponibles

#### 📊 Dashboard
- Statistiques des produits
- Aperçu des commandes
- Produits récents
- Métriques clés

#### 📦 Gestion des Produits
- Liste complète des produits
- Ajout de nouveaux produits
- Modification des produits existants
- Upload d'images et vidéos
- Gestion des taux CBD/THC

#### ✏️ Gestion des Textes
- **Page d'accueil** : Titre, sous-titre, description
- **Produits vedettes** : Titre et description
- **Informations légales** : Avertissement et texte légal
- **Contact** : Email, téléphone, infos livraison

#### 🖼️ Gestion des Médias
- Upload d'images pour les produits
- Support vidéo pour les démonstrations
- Gestion du logo de la boutique

#### ⚙️ Paramètres
- Configuration générale
- Paramètres de la boutique
- Conformité légale CBD

### Interface Admin

```typescript
// Exemple de modification de texte
const [siteTexts, setSiteTexts] = useState({
  heroTitle: 'Boutique CBD',
  heroSubtitle: 'Premium & Légal',
  heroDescription: 'Votre description...',
  // ... autres textes
});
```

## 🌿 Conformité CBD

### Réglementation française
- **THC ≤ 0.2%** : Respect de la limite légale
- **Âge minimum** : Réservé aux adultes de +18 ans
- **Avertissements** : Mentions légales obligatoires
- **Traçabilité** : Produits testés en laboratoire

### Affichage légal
- Badges de conformité sur chaque produit
- Avertissement en footer
- Taux CBD/THC clairement affichés
- Mentions légales complètes

## 🛠️ Technologies Utilisées

### Frontend
- **React 18** : Framework JavaScript moderne
- **TypeScript** : Typage statique
- **Tailwind CSS** : Framework CSS utility-first
- **React Router** : Navigation SPA
- **Lucide React** : Icônes modernes

### Build & Déploiement
- **Vite** : Build tool ultra-rapide
- **Vercel** : Hébergement serverless
- **ESLint** : Linting du code
- **PostCSS** : Processing CSS

### Architecture
```
src/
├── components/        # Composants réutilisables
├── pages/            # Pages de l'application
├── styles/           # Styles CSS personnalisés
├── types/            # Types TypeScript
└── utils/            # Utilitaires
```

## 📈 Performance

### Optimisations
- **Lazy loading** : Chargement différé des images
- **Code splitting** : Division du code en chunks
- **Tree shaking** : Suppression du code mort
- **Compression** : Minification CSS/JS

### Métriques cibles
- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Time to Interactive** : < 3s
- **Cumulative Layout Shift** : < 0.1

## 🔒 Sécurité

### Headers de sécurité
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### Bonnes pratiques
- Validation côté client et serveur
- Sanitisation des entrées utilisateur
- HTTPS obligatoire en production
- Gestion sécurisée des tokens

## 🚀 Déploiement

### URL de démo
Votre boutique sera accessible à : `https://votre-projet.vercel.app`

### Fonctionnalités testables
1. **Navigation responsive** : Testez sur mobile/desktop
2. **Catalogue produits** : Parcourez les produits CBD
3. **Panel admin** : Accédez à `/admin` pour tester la gestion
4. **Modification textes** : Changez les contenus en temps réel

## 📞 Support

### Modification des textes
1. Accédez au panel admin (`/admin`)
2. Onglet "Textes"
3. Modifiez les contenus souhaités
4. Cliquez sur "Sauvegarder"

### Ajout de produits
1. Panel admin > Onglet "Produits"
2. Bouton "Ajouter un produit"
3. Remplissez le formulaire
4. Uploadez images/vidéos
5. Validez la création

### Personnalisation du logo
1. Panel admin > Onglet "Médias"
2. Section "Logo"
3. Upload de votre fichier
4. Ajustement des paramètres

## 🎯 Fonctionnalités à venir

### Phase 2
- [ ] Système de favoris
- [ ] Comparateur de produits
- [ ] Chat en ligne
- [ ] Newsletter

### Phase 3
- [ ] App mobile native
- [ ] PWA (Progressive Web App)
- [ ] Système de reviews
- [ ] Programme fidélité

---

**© 2024 CBD Store Premium** - Boutique moderne et légale  
**Version 3.0** - Sans panier • Responsive • Admin complet