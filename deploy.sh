#!/bin/bash

# Script de déploiement pour Vercel
echo "🚀 Déploiement de la boutique sur Vercel..."

# Vérifier que Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Veuillez l'installer d'abord."
    exit 1
fi

# Vérifier que Vercel CLI est installé
if ! command -v vercel &> /dev/null; then
    echo "📦 Installation de Vercel CLI..."
    npm install -g vercel
fi

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Build du projet
echo "🔨 Build du projet..."
npm run build

# Vérifier que le build a réussi
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors du build. Veuillez corriger les erreurs avant de redéployer."
    exit 1
fi

# Déployer sur Vercel
echo "🚀 Déploiement sur Vercel..."
vercel --prod

echo "✅ Déploiement terminé !"
echo "🌐 Votre boutique est maintenant en ligne sur Vercel !"