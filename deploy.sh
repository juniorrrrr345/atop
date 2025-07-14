#!/bin/bash

# 🚀 Script de Déploiement - Boutique CBD Premium
echo "🌿 Déploiement de la Boutique CBD Premium..."

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire du projet."
    exit 1
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Construire le projet
echo "🔨 Build du projet..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build. Vérifiez les erreurs ci-dessus."
    exit 1
fi

# Initialiser Git si nécessaire
if [ ! -d ".git" ]; then
    echo "🔧 Initialisation de Git..."
    git init
    git branch -M main
fi

# Ajouter tous les fichiers
echo "📁 Ajout des fichiers..."
git add .

# Commit avec timestamp
timestamp=$(date "+%Y-%m-%d %H:%M:%S")
echo "💾 Commit des changements..."
git commit -m "🚀 Déploiement Boutique CBD - $timestamp"

# Demander l'URL du repository GitHub
if [ -z "$(git remote get-url origin 2>/dev/null)" ]; then
    echo ""
    echo "🔗 Veuillez entrer l'URL de votre repository GitHub:"
    echo "   Format: https://github.com/VOTRE-USERNAME/VOTRE-REPO.git"
    read -p "URL: " repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ Repository distant ajouté: $repo_url"
    else
        echo "⚠️  Pas de repository distant configuré. Vous devrez le faire manuellement."
    fi
fi

# Push vers GitHub
echo "🚀 Push vers GitHub..."
if git remote get-url origin >/dev/null 2>&1; then
    git push -u origin main
    if [ $? -eq 0 ]; then
        echo "✅ Push réussi vers GitHub!"
    else
        echo "⚠️  Erreur lors du push. Vérifiez vos permissions GitHub."
    fi
else
    echo "⚠️  Pas de repository distant configuré. Push ignoré."
fi

echo ""
echo "🎉 Déploiement terminé!"
echo ""
echo "📋 Prochaines étapes:"
echo "   1. Allez sur https://vercel.com"
echo "   2. Connectez votre compte GitHub"
echo "   3. Importez votre repository"
echo "   4. Vercel détectera automatiquement Vite"
echo "   5. Déployez en un clic!"
echo ""
echo "🌐 Une fois déployé, votre site sera accessible à:"
echo "   - Accueil: /"
echo "   - Produits: /showcase"
echo "   - Infos: /infos"
echo "   - Réseaux: /reseaux"
echo "   - Admin: /admin"
echo ""
echo "🔧 Personnalisez votre boutique via /admin"
echo ""
echo "Made with ❤️ for CBD enthusiasts 🌿"