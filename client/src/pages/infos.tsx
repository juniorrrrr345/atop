import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Leaf, Shield, Info, Heart, Brain, Zap } from "lucide-react";

function InfosPage() {
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

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* En-tête */}
      <section className="text-center space-y-6">
        <div className="flex items-center justify-center gap-4">
          <Leaf className="h-12 w-12 text-green-600" />
          <div>
            <h1 className="text-4xl font-bold">Tout savoir sur le CBD</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Informations complètes sur nos produits CBD légaux et de qualité
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* Qu'est-ce que le CBD */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Qu'est-ce que le CBD ?</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                Définition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Le CBD (Cannabidiol) est un composé naturel présent dans le cannabis. 
                Contrairement au THC, le CBD n'a pas d'effet psychoactif et ne provoque 
                pas de sensation d'euphorie ou de "high".
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600">Non psychoactif</Badge>
                  <Badge variant="outline" className="text-green-600">100% Légal</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-green-600">Naturel</Badge>
                  <Badge variant="outline" className="text-green-600">Sans addiction</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Légalité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                En France, le CBD est légal si le produit fini contient moins de 0,2% de THC. 
                Cette réglementation garantit l'absence d'effets psychoactifs tout en 
                préservant les bienfaits potentiels du CBD.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-green-800">
                  ✓ Conforme à la législation française et européenne
                </p>
                <p className="text-sm text-green-700">
                  ✓ Contrôlé et testé en laboratoire indépendant
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Bienfaits potentiels */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Bienfaits Potentiels</h2>
          <p className="text-muted-foreground">
            Le CBD est étudié pour ses propriétés potentielles sur le bien-être
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <benefit.icon className="h-12 w-12 mx-auto text-green-600" />
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-amber-800">Important</h4>
              <p className="text-sm text-amber-700 mt-1">
                Les informations présentées ne constituent pas des conseils médicaux. 
                Consultez votre médecin avant utilisation, notamment si vous prenez 
                des médicaments ou avez des conditions médicales particulières.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Types de produits */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Nos Catégories de Produits</h2>
          <p className="text-muted-foreground">
            Découvrez notre gamme complète de produits CBD
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <Badge variant="secondary">{category.concentration}</Badge>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mode d'utilisation:</span>
                    <span className="font-medium">{category.usage}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Informations légales */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Cadre Légal</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {legalInfo.map((info, index) => (
            <Card key={index}>
              <CardHeader>
                <Shield className="h-8 w-8 text-green-600" />
                <CardTitle className="text-lg">{info.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{info.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Avertissements */}
      <section className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-red-800 text-lg">Avertissements et Précautions</h3>
          <div className="space-y-2 text-sm text-red-700">
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
}

export default InfosPage;