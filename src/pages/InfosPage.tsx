import React from 'react';
import { Leaf, Shield, Heart, Brain, Beaker, CheckCircle } from 'lucide-react';

const InfosPage: React.FC = () => {
  const benefits = [
    {
      icon: Heart,
      title: "Bien-être général",
      description: "Le CBD peut contribuer à une sensation de bien-être et de relaxation naturelle."
    },
    {
      icon: Brain,
      title: "Équilibre mental",
      description: "Aide à maintenir l'équilibre mental et peut favoriser un état d'esprit calme."
    },
    {
      icon: Shield,
      title: "Propriétés antioxydantes",
      description: "Le CBD possède des propriétés antioxydantes qui peuvent protéger les cellules."
    }
  ];

  const qualityPoints = [
    "Extraction par CO2 supercritique",
    "Tests en laboratoire tiers",
    "Certificats d'analyse disponibles",
    "Conformité THC < 0,2%",
    "Agriculture biologique certifiée",
    "Traçabilité complète"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Tout savoir sur le CBD
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez les propriétés du cannabidiol, ses bienfaits potentiels et 
            pourquoi nos produits respectent les plus hauts standards de qualité
          </p>
        </div>

        {/* Qu'est-ce que le CBD */}
        <section className="mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <Leaf className="h-8 w-8 text-green-400 mr-3" />
              <h2 className="text-3xl font-bold">Qu'est-ce que le CBD ?</h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Le <strong className="text-green-400">cannabidiol (CBD)</strong> est un composé naturel présent dans la plante de cannabis. 
                Contrairement au THC, le CBD n'est pas psychoactif et ne provoque pas d'effet "planant". 
                Il fait partie des cannabinoïdes, des molécules qui interagissent avec le système endocannabinoïde de notre corps.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Le CBD est légal en France lorsque le taux de THC des produits ne dépasse pas 0,2%. 
                Nos produits respectent scrupuleusement cette réglementation et sont régulièrement testés 
                pour garantir leur conformité.
              </p>
            </div>
          </div>
        </section>

        {/* Bienfaits potentiels */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bienfaits potentiels du CBD</h2>
            <p className="text-gray-400 text-lg">
              Le CBD fait l'objet de nombreuses recherches pour ses propriétés thérapeutiques potentielles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 text-center">
                  <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-8 bg-blue-900/20 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Beaker className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-blue-300 mb-2">Recherche en cours</h4>
                <p className="text-sm text-blue-200">
                  Les effets du CBD font l'objet de recherches scientifiques continues. Les informations présentées 
                  ne constituent pas des allégations médicales et ne remplacent pas l'avis d'un professionnel de santé.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Notre qualité */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Shield className="h-8 w-8 text-green-400 mr-3" />
                Notre engagement qualité
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Nous nous engageons à vous proposer des produits CBD de la plus haute qualité. 
                Chaque étape de notre processus, de la culture à la vente, est rigoureusement contrôlée.
              </p>
              <div className="space-y-3">
                {qualityPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-6 text-green-400">Processus de production</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold mb-2">1. Culture biologique</h4>
                  <p className="text-gray-300 text-sm">
                    Nos plantes de chanvre sont cultivées sans pesticides ni herbicides, 
                    dans des conditions optimales en Europe.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">2. Extraction CO2</h4>
                  <p className="text-gray-300 text-sm">
                    L'extraction par CO2 supercritique préserve tous les composés bénéfiques 
                    sans solvants chimiques.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2">3. Tests laboratoire</h4>
                  <p className="text-gray-300 text-sm">
                    Chaque lot est analysé par un laboratoire indépendant pour garantir 
                    pureté et concentration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Légalité */}
        <section className="mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6 flex items-center">
              <Shield className="h-8 w-8 text-green-400 mr-3" />
              Légalité en France
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Réglementation actuelle</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>CBD autorisé avec THC ≤ 0,2%</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Vente libre aux adultes (+18 ans)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Produits dérivés légaux</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Contrôles qualité obligatoires</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Nos garanties</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Tous nos produits sont conformes</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Certificats d'analyse disponibles</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Traçabilité complète</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>Support client expert</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Conseils d'utilisation */}
        <section className="mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold mb-6">Conseils d'utilisation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Pour commencer</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Commencez par de faibles doses</li>
                  <li>• Augmentez progressivement si nécessaire</li>
                  <li>• Respectez les dosages recommandés</li>
                  <li>• Consultez votre médecin si vous prenez des médicaments</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Conservation</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>• Conserver dans un endroit frais et sec</li>
                  <li>• À l'abri de la lumière directe</li>
                  <li>• Tenir hors de portée des enfants</li>
                  <li>• Vérifier les dates de péremption</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Avertissement légal */}
        <section>
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-300 mb-2">Avertissement important</h4>
                <p className="text-sm text-amber-200">
                  Ces informations sont fournies à titre éducatif uniquement. Les produits CBD ne sont pas destinés 
                  à diagnostiquer, traiter, guérir ou prévenir une maladie. Les femmes enceintes ou allaitantes 
                  et les personnes sous traitement médical doivent consulter leur médecin avant utilisation. 
                  Ne pas conduire après consommation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default InfosPage;