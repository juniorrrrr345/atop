# 🌿 CBD Shop Premium - Boutique E-commerce CBD

Une application web complète pour gérer une boutique de produits CBD avec panneau d'administration intégré.

## 🚀 Fonctionnalités

### 📱 Interface Client
- **Page d'accueil** avec présentation des produits vedettes
- **Catalogue produits** avec filtres et recherche avancée
- **Fiches produits détaillées** avec informations CBD/THC
- **Panier d'achat** avec gestion des quantités
- **Pages d'information** sur le CBD et la légalité
- **Canaux de communication** et support client
- **Design responsive** pour mobile et desktop

### 🛠️ Panneau d'Administration
- **Dashboard** avec statistiques de ventes
- **Gestion des produits CBD** (ajout, modification, suppression)
- **Gestion des commandes** et suivi des livraisons
- **Gestion des clients** et historique d'achats
- **Paramètres de conformité légale** (limites THC, vérifications d'âge)
- **Gestion des stocks** avec alertes de réapprovisionnement
- **Personnalisation du site** (thèmes, couleurs, logos)

### 🧬 Spécificités CBD
- **Gestion des taux de cannabinoïdes** (CBD, THC, CBG, CBN)
- **Informations légales** et conformité française/européenne
- **Certifications** et traçabilité des produits
- **Profils terpéniques** et informations de culture
- **Vérification d'âge** automatique
- **Avertissements légaux** obligatoires

## 🏗️ Architecture Technique

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et le développement
- **Tailwind CSS** pour le styling
- **shadcn/ui** pour les composants UI
- **Wouter** pour le routing
- **React Query** pour la gestion des données
- **Zustand** pour le state management

### Backend
- **Node.js** avec Express.js
- **PostgreSQL** avec Drizzle ORM
- **Authentification** avec sessions
- **Upload de fichiers** avec Multer
- **API REST** complète

### Base de données
- **Tables produits** avec champs CBD spécifiques
- **Gestion des commandes** et articles
- **Système de clients** avec vérification d'âge
- **Variantes de prix** par quantité
- **Catégories** et coupons de réduction
- **Paramètres** de configuration du site

## 📦 Installation

### Prérequis
- Node.js (version 18 ou supérieure)
- PostgreSQL (version 13 ou supérieure)
- Git

### 1. Cloner le projet
```bash
git clone <url-du-repo>
cd cbd-shop-premium
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configuration de la base de données

Créer un fichier `.env` à la racine :
```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/cbd_shop"

# Session
SESSION_SECRET="votre_secret_session_ultra_securise"

# Environnement
NODE_ENV="development"
PORT=3000
```

Initialiser la base de données :
```bash
npm run db:push
```

### 4. Démarrer l'application

Mode développement :
```bash
npm run dev
```

Mode production :
```bash
npm run build
npm start
```

L'application sera accessible sur `http://localhost:3000`

## 🎯 Configuration Initiale

### 1. Accès Administrateur

Première connexion au panneau admin (`/admin`) :
- **Username** : admin
- **Password** : admin123

⚠️ **Important** : Changez immédiatement le mot de passe par défaut !

### 2. Configuration de base

Dans le panneau admin, configurez :

#### Paramètres généraux
- Nom de la boutique
- Logo et couleurs
- Devise et taux de TVA

#### Conformité légale CBD
- Limite THC (défaut : 0.2%)
- Âge minimum (défaut : 18 ans)
- Avertissement légal obligatoire

#### Informations de contact
- Adresse email et téléphone
- Adresse physique
- Horaires d'ouverture
- Réseaux sociaux

### 3. Ajouter des produits CBD

Pour chaque produit, renseignez :
- **Informations de base** : nom, description, prix, catégorie
- **Taux de cannabinoïdes** : CBD, THC, CBG, CBN (en %)
- **Informations culture** : indoor/outdoor, génétique, origine
- **Stock et variantes** : quantités disponibles, tailles/formats
- **Certifications** : Bio, tests laboratoire, conformité
- **Médias** : photos haute qualité

## 📊 Utilisation

### Interface Client

#### Navigation
- **Accueil** (`/`) : Présentation et produits vedettes
- **Catalogue** (`/showcase`) : Tous les produits avec filtres
- **Informations** (`/infos`) : Guide complet sur le CBD
- **Contact** (`/canal`) : Moyens de communication

#### Fonctionnalités produits
- Recherche par nom, catégorie, taux CBD/THC
- Filtres avancés (prix, type de culture, certifications)
- Détails complets avec informations légales
- Sélection de variantes (quantités, formats)
- Ajout au panier avec gestion des stocks

### Panneau d'Administration

#### Dashboard
- Statistiques de ventes en temps réel
- Graphiques de performance
- Commandes récentes
- Produits populaires
- Alertes de stock faible

#### Gestion des produits
- **CRUD complet** : Créer, lire, modifier, supprimer
- **Gestion des médias** : Upload d'images/vidéos
- **Variantes de prix** : Différents formats et quantités
- **Statuts** : Actif, inactif, rupture de stock
- **Produits vedettes** : Mise en avant sur l'accueil

#### Gestion des commandes
- **Suivi complet** : De la création à la livraison
- **Statuts** : En attente, traitement, expédié, livré
- **Informations client** : Coordonnées et historique
- **Gestion des paiements** : Statut et méthodes
- **Numéros de suivi** : Livraisons

#### Gestion des clients
- **Base client** : Informations et préférences
- **Historique d'achats** : Commandes et montants
- **Vérification d'âge** : Statut de validation
- **Newsletter** : Abonnements marketing

## 🔒 Conformité Légale CBD

### Réglementation française
- **Taux THC** : ≤ 0.2% obligatoire
- **Vérification d'âge** : 18 ans minimum
- **Avertissements** : Mentions légales obligatoires
- **Traçabilité** : Origine et certifications

### Fonctionnalités de conformité
- **Contrôle automatique** des taux THC lors de l'ajout de produits
- **Vérification d'âge** à l'inscription
- **Avertissements légaux** sur toutes les pages produits
- **Mentions obligatoires** sur les effets et précautions

### Tests et certifications
- **Tests laboratoire** : Validation des taux annoncés
- **Certifications Bio** : Traçabilité des modes de culture
- **Conformité européenne** : Respect des normes EU

## 🛡️ Sécurité

### Protection des données
- **Chiffrement** des mots de passe
- **Sessions sécurisées** avec expiration
- **Validation** de toutes les entrées utilisateur
- **Protection CSRF** sur les formulaires

### Accès administrateur
- **Authentification** obligatoire pour l'admin
- **Rôles et permissions** pour les utilisateurs
- **Logs d'activité** pour la traçabilité

## 📱 Responsive Design

L'application est optimisée pour :
- **Mobile** : Navigation tactile, menus adaptés
- **Tablette** : Affichage optimisé pour l'écran moyen
- **Desktop** : Interface complète avec toutes les fonctionnalités

## 🔧 Développement

### Structure du projet
```
cbd-shop-premium/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── lib/           # Utilitaires et configuration
│   │   └── hooks/         # Hooks React personnalisés
├── server/                # Backend Express
│   ├── routes/           # Routes API
│   ├── middleware/       # Middlewares Express
│   └── utils/           # Utilitaires serveur
├── shared/               # Code partagé
└── uploads/             # Fichiers uploadés
```

### Commandes utiles
```bash
# Développement
npm run dev              # Démarrer en mode dev
npm run check           # Vérification TypeScript
npm run db:push         # Synchroniser la DB

# Production
npm run build           # Build pour production
npm start              # Démarrer en production

# Base de données
npm run db:push         # Appliquer le schéma
npm run db:studio       # Interface graphique DB (si installé)
```

### Ajout de nouvelles fonctionnalités

#### Nouveaux composants UI
Les composants sont basés sur shadcn/ui et se trouvent dans `client/src/components/ui/`

#### Nouvelles pages
Ajouter dans `client/src/pages/` et mettre à jour le routing dans `App.tsx`

#### Nouvelles tables DB
Modifier `schema.ts` et exécuter `npm run db:push`

#### Nouvelles routes API
Ajouter dans `server/routes/` et intégrer dans `server/index.ts`

## 🚀 Déploiement

### Prérequis production
- Serveur Node.js
- Base PostgreSQL
- Domaine SSL (HTTPS obligatoire pour les paiements)

### Variables d'environnement production
```env
NODE_ENV=production
DATABASE_URL=postgresql://...
SESSION_SECRET=secret_ultra_securise_production
PORT=3000
```

### Serveurs recommandés
- **VPS** : OVH, DigitalOcean, AWS EC2
- **Hébergement managé** : Vercel, Railway, Render
- **Base de données** : Neon, Supabase, AWS RDS

## 📞 Support

### Documentation
- **README.md** : Instructions générales
- **Code commenté** : Explications in-line
- **Types TypeScript** : Documentation automatique

### Contact développeur
- Email : dev@cbdshop-premium.fr
- Issues GitHub : Pour les bugs et améliorations

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. Commit les changements (`git commit -m 'Ajout nouvelle fonctionnalité'`)
4. Push la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. Ouvrir une Pull Request

## ⚖️ Avertissement Légal

Cette application est un outil de gestion e-commerce. L'utilisateur est responsable de :
- La conformité légale des produits vendus
- Le respect de la réglementation locale sur le CBD
- La vérification de l'âge des clients
- L'affichage des mentions légales obligatoires

Les développeurs ne sont pas responsables de l'usage commercial de cette application.

---

🌿 **CBD Shop Premium** - Votre solution complète pour la vente de CBD en ligne