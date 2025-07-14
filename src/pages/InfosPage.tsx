import React from 'react';
import { Leaf, Shield, Info, Heart, Brain, Zap, AlertTriangle } from 'lucide-react';

const InfosPage: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Bien-être général",
      description: "Le CBD peut contribuer à un sentiment général de bien-être et de relaxation."
    },
    {
      icon: Brain,
      title: "Équilibre mental",
      description: "Aide à maintenir un équilibre émotionnel et mental au quotidien."
    },
    {
      icon: Zap,
      title: "Récupération",
      description: "Favorise la récupération après l'effort physique et le stress."
    }
  ];

  const categories = [
    {
      name: "Huiles CBD",
      description: "Extraits liquides à consommer sous la langue",
      concentration: "5% à 30%",
      usage: "Sublingual"
    },
    {
      name: "Fleurs CBD",
      description: "Fleurs séchées à vaporiser ou infuser",
      concentration: "8% à 25%",
      usage: "Vaporisation, infusion"
    },
    {
      name: "Résines CBD",
      description: "Concentrés résineux de haute qualité",
      concentration: "15% à 40%",
      usage: "Vaporisation"
    },
    {
      name: "Cosmétiques CBD",
      description: "Produits topiques pour usage externe",
      concentration: "1% à 5%",
      usage: "Application cutanée"
    }
  ];

  const legalInfo = [
    {
      title: "Légalité en France",
      description: "Le CBD est légal en France tant que le taux de THC ne dépasse pas 0,2%."
    },
    {
      title: "Conformité européenne",
      description: "Tous nos produits respectent la réglementation européenne en vigueur."
    },
    {
      title: "Contrôles qualité",
      description: "Chaque lot est testé en laboratoire indépendant pour garantir la conformité."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* Header */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Leaf className="h-12 w-12 text-green-400" />
          <div>
            <h1 className="text-4xl font-bold cbd-text-gradient">Tout savoir sur le CBD</h1>
            <p className="text-xl text-gray-400 mt-2">
              Informations complètes sur nos produits CBD légaux et de qualité
            </p>
          </div>
        </div>
      </section>

      {/* What is CBD */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Qu'est-ce que le CBD ?</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Info className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-bold">Définition</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">
                Le CBD (Cannabidiol) est un composé naturel présent dans le cannabis. 
                Contrairement au THC, le CBD n'a pas d'effet psychoactif et ne provoque 
                pas de sensation d'euphorie ou de "high".
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  Non psychoactif
                </span>
                <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  100% Légal
                </span>
                <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  Naturel
                </span>
                <span className="bg-green-600/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                  Sans addiction
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold">Légalité</h3>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300">
                En France, le CBD est légal si le produit fini contient moins de 0,2% de THC. 
                Cette réglementation garantit l'absence d'effets psychoactifs tout en 
                préservant les bienfaits potentiels du CBD.
              </p>
              <div className="bg-green-900/30 p-4 rounded-lg border border-green-500/30">
                <p className="text-sm font-medium text-green-300">
                  ✓ Conforme à la législation française et européenne
                </p>
                <p className="text-sm text-green-200">
                  ✓ Contrôlé et testé en laboratoire indépendant
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Bienfaits Potentiels</h2>
          <p className="text-gray-400">
            Le CBD est étudié pour ses propriétés potentielles sur le bien-être
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center space-y-4 p-6 bg-gray-800/30 rounded-lg border border-gray-700">
                <Icon className="h-12 w-12 mx-auto text-green-400" />
                <h3 className="font-semibold text-lg">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-400 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-300">Important</h4>
              <p className="text-sm text-amber-200 mt-1">
                Les informations présentées ne constituent pas des conseils médicaux. 
                Consultez votre médecin avant utilisation, notamment si vous prenez 
                des médicaments ou avez des conditions médicales particulières.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Nos Catégories de Produits</h2>
          <p className="text-gray-400">
            Découvrez notre gamme complète de produits CBD
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">{category.name}</h3>
                <span className="bg-green-600/20 text-green-300 px-2 py-1 rounded text-sm border border-green-500/30">
                  {category.concentration}
                </span>
              </div>
              <p className="text-gray-400 mb-3">{category.description}</p>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Mode d'utilisation:</span>
                <span className="text-green-400 font-medium">{category.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Framework */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Cadre Légal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalInfo.map((info, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 text-center">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3">{info.title}</h3>
              <p className="text-sm text-gray-400">{info.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Legal Warnings */}
      <section className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-red-400" />
            <h3 className="font-semibold text-red-300 text-lg">Avertissements et Précautions</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-red-200">
            <p>• Réservé aux adultes de plus de 18 ans</p>
            <p>• Ne pas conduire ou utiliser des machines après consommation</p>
            <p>• Déconseillé aux femmes enceintes et allaitantes</p>
            <p>• Tenir hors de portée des enfants</p>
            <p>• Consultez votre médecin en cas de doute ou de traitement médical</p>
            <p>• Ne pas dépasser les doses recommandées</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InfosPage;