# 🚀 Guide de Déploiement Rapide - Vercel

## ⚡ Déploiement en 3 minutes

### 1️⃣ Prérequis
- Compte GitHub
- Compte Vercel (gratuit)
- Votre code pushé sur GitHub

### 2️⃣ Étapes de déploiement

#### Option A : Interface Web (Recommandée)
1. **Connectez-vous à [vercel.com](https://vercel.com)**
2. **Cliquez sur "New Project"**
3. **Importez votre repo GitHub**
4. **Vercel détecte automatiquement Vite**
5. **Cliquez sur "Deploy"** ✅

#### Option B : CLI
```bash
# Installer Vercel CLI
npm i -g vercel

# Dans votre projet
vercel

# Suivre les instructions
# Votre site sera déployé automatiquement !
```

### 3️⃣ Configuration automatique
Vercel détecte automatiquement :
- ✅ Framework : Vite
- ✅ Build Command : `npm run build`
- ✅ Output Directory : `dist`
- ✅ Install Command : `npm install`

### 4️⃣ URL de votre boutique
Après déploiement, votre boutique sera disponible à :
```
https://votre-projet-nom.vercel.app
```

## 🎯 Fonctionnalités testables

### Navigation
- ✅ Page d'accueil responsive
- ✅ Navigation mobile/desktop
- ✅ Catalogue produits

### Panel Admin
- ✅ Accédez à `/admin`
- ✅ Modifiez les textes en temps réel
- ✅ Ajoutez des produits

### Design
- ✅ Thème noir et blanc
- ✅ Animations fluides
- ✅ Responsive sur tous écrans

## 🔧 Variables d'environnement (Optionnel)

Si vous avez des variables d'environnement :

1. **Dans Vercel Dashboard** → Votre projet → Settings → Environment Variables
2. **Ajoutez vos variables** :
   ```
   VITE_API_URL=https://votre-api.com
   VITE_APP_NAME=CBD Store Premium
   ```

## 🔄 Déploiement automatique

Vercel redéploie automatiquement à chaque push sur `main` !

### Workflow typique :
```bash
# Modifier votre code
git add .
git commit -m "Amélioration boutique"
git push origin main

# Vercel redéploie automatiquement ✨
```

## 📱 Test Mobile

Testez votre boutique sur mobile avec l'URL Vercel :
- Navigation hamburger
- Grille responsive
- Boutons tactiles

## 🎨 Personnalisation

### Modifier les textes :
1. Allez sur `votre-url.vercel.app/admin`
2. Onglet "Textes"
3. Modifiez et sauvegardez

### Modifier les couleurs :
Éditez `src/index.css` → Variables CSS :
```css
:root {
  --primary: 0 0% 100%;    /* Blanc */
  --background: 0 0% 4%;   /* Noir */
  --accent: 0 0% 85%;      /* Gris */
}
```

## 🛠️ Résolution de problèmes

### Build échoue ?
```bash
# Tester en local
npm run build

# Si erreur TypeScript
npm run lint
```

### Page blanche ?
- Vérifiez les erreurs dans la console
- Assurez-vous que `dist/index.html` existe après build

### Routing ne fonctionne pas ?
- `vercel.json` est configuré pour React Router
- Toutes les routes redirigent vers `index.html`

## 📊 Performance Vercel

### Métriques automatiques :
- ✅ **Lighthouse Score** : Analyse automatique
- ✅ **Core Web Vitals** : Monitoring en temps réel
- ✅ **Analytics** : Trafic et performance

### CDN Global :
- ✅ **Edge Network** : Plus de 100 locations
- ✅ **Cache intelligent** : Assets optimisés
- ✅ **Compression** : Gzip/Brotli automatique

## 🎯 Next Steps

### Après déploiement :
1. **Testez toutes les pages**
2. **Vérifiez le responsive**
3. **Testez le panel admin**
4. **Partagez l'URL !**

### Améliorations futures :
- Custom domain
- Analytics avancées
- Optimisations performance

## 📞 Support

### Issues communes :

**Q: Build timeout ?**  
A: Le plan gratuit Vercel a une limite de 10min de build

**Q: Domaine custom ?**  
A: Settings → Domains → Add domain

**Q: HTTPS automatique ?**  
A: ✅ Activé par défaut sur Vercel

---

🎉 **Félicitations !** Votre boutique CBD est maintenant en ligne sur Vercel !

**URL d'exemple** : `https://cbd-store-premium.vercel.app`