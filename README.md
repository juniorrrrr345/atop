# CBD Shop Premium 🌱

Une boutique en ligne complète pour produits CBD, conçue pour être conforme à la législation française et déployée facilement sur Vercel.

## 🚀 Déploiement sur Vercel

Ce projet est prêt pour un déploiement direct sur Vercel :

1. **Fork ce repository** sur votre compte GitHub
2. **Connectez-vous à Vercel** et importez ce repository
3. **Déployez** - Aucune configuration supplémentaire nécessaire !

Vercel détectera automatiquement la configuration Vite et déploiera votre boutique CBD.

## ✨ Fonctionnalités

### 🏪 Boutique Complète
- **Page d'accueil** avec produits vedettes et présentation
- **Catalogue produits** avec filtres et recherche
- **Gestion CBD spécialisée** (taux THC/CBD, conformité légale)
- **Page informations** complète sur le CBD
- **Formulaire de contact** fonctionnel
- **Page 404** personnalisée

### �‍💼 Panneau d'Administration
- **Dashboard** avec statistiques
- **Gestion des produits CBD** (CRUD complet)
- **Validation THC** (max 0.2% - conforme loi française)
- **Paramètres de conformité** légale
- **Interface intuitive** avec onglets

### 🎨 Design & UX
- **Thème CBD** vert et moderne
- **Design responsive** (mobile-first)
- **Animations fluides** et transitions
- **Dark mode** par défaut
- **Navigation intuitive**

### ⚖️ Conformité Légale
- **Vérification THC** ≤ 0.2%
- **Avertissements légaux** obligatoires
- **Mentions de conformité** française/européenne
- **Restrictions d'âge** (18+)

## 🛠️ Technologies

- **React 18** + TypeScript
- **Vite** (build ultra-rapide)
- **React Router** (navigation SPA)
- **Tailwind CSS** (styling moderne)
- **Lucide React** (icônes)
- **Vercel** (déploiement)

## 📁 Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   └── Layout.tsx      # Layout principal avec navigation
├── pages/              # Pages de l'application
│   ├── HomePage.tsx    # Page d'accueil
│   ├── ShowcasePage.tsx # Catalogue produits
│   ├── AdminPage.tsx   # Administration complète
│   ├── InfosPage.tsx   # Informations CBD
│   ├── ContactPage.tsx # Contact + FAQ
│   └── NotFoundPage.tsx # Page 404
├── index.css          # Styles globaux + thème CBD
├── main.tsx           # Point d'entrée
└── App.tsx            # Composant racine + routing
```

## 🎯 Pages Principales

### 🏠 Accueil (`/`)
- Hero section avec CTA
- Produits vedettes
- Avantages et garanties
- Avertissements légaux

### 📦 Produits (`/showcase`)
- Catalogue complet avec filtres
- Recherche en temps réel
- Tri par prix, note, taux CBD
- Badges de conformité légale

### 🔧 Administration (`/admin`)
- Dashboard avec statistiques
- Gestion produits CBD
- Validation automatique THC
- Paramètres de conformité

### 📖 Infos CBD (`/infos`)
- Guide complet sur le CBD
- Légalité et conformité
- Catégories de produits
- Précautions d'usage

### 📞 Contact (`/contact`)
- Formulaire de contact
- FAQ intégrée
- Informations entreprise
- Support client

## 🚀 Développement Local

```bash
# Installation
npm install

# Développement
npm run dev

# Build de production
npm run build

# Aperçu du build
npm run preview
```

## � Configuration Vercel

Le fichier `vercel.json` est déjà configuré pour :
- ✅ Framework Vite détecté automatiquement
- ✅ Routing SPA avec redirections
- ✅ Build optimisé pour la production
- ✅ Déploiement en un clic

## 🔧 Personnalisation

### Thème et Couleurs
Les couleurs CBD sont définies dans `src/index.css` :
```css
:root {
  --primary: 142 71% 45%;    /* Vert CBD principal */
  --secondary: 142 33% 24%;  /* Vert sombre */
  --accent: 142 71% 45%;     /* Accent vert */
}
```

### Produits Mock
Les données de démonstration sont dans les composants. Pour une vraie boutique, remplacez par :
- Base de données (PostgreSQL, MongoDB...)
- API REST ou GraphQL
- CMS headless (Strapi, Contentful...)

### Conformité Légale
Paramètres modifiables dans l'admin :
- Limite THC (défaut: 0.2%)
- Âge minimum (défaut: 18 ans)
- Textes d'avertissement
- Mentions légales

## 🛡️ Sécurité & Conformité

- ✅ Validation THC côté client
- ✅ Avertissements légaux omniprésents
- ✅ Restrictions d'âge
- ✅ Mentions de conformité RGPD
- ✅ Textes légaux français/européens

## 📱 Responsive Design

- ✅ Mobile-first approach
- ✅ Tablette optimisée
- ✅ Desktop full-width
- ✅ Navigation adaptative
- ✅ Images responsive

## 🎨 Branding

Le design utilise une identité visuelle CBD premium :
- **Couleurs** : Verts naturels et modernes
- **Typographie** : Inter (lisible et moderne)
- **Iconographie** : Lucide (cohérente et élégante)
- **Ton** : Professionnel mais accessible

## � Performance

- ⚡ Vite (build ultra-rapide)
- 📦 Bundle optimisé (~221KB gzippé)
- 🎯 Code splitting automatique
- 🖼️ Images optimisées
- 🔄 Lazy loading des composants

## 🌍 Déploiement Instantané

1. **Fork** ce repository
2. **Connect** à Vercel
3. **Deploy** - C'est tout ! 🚀

Votre boutique CBD sera en ligne en moins de 2 minutes.

## 📞 Support

Pour toute question sur l'implémentation ou la personnalisation, consultez la documentation ou créez une issue.

---

**⚠️ Important** : Ce projet est un template de démonstration. Pour une boutique réelle, assurez-vous de respecter toutes les réglementations locales concernant la vente de produits CBD.